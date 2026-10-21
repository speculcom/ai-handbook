/**
 * completeness.mjs —— agent 站「维度补齐率」的**唯一计算入口**（铁律 R4）
 *
 * ## 为什么有这个文件
 * 同一件事曾经有三个数字：
 *   - `audit-gaps.mjs` 算出 174/315 = 55%
 *   - 独立测量得到 193/315 = 61.3%
 *   - 站点上**写死** mcp 69/99、ide 29/64、`COVERAGE = {done:120, total:211}`
 * 而数据模型早已从 ide/cli/mcp 合并成 agents/harness/tools —— 写死的键名都是旧的，
 * `COVERAGE_ROWS.harness` 是空数组，**harness 的完整度用户从来没看到过**。
 *
 * 所以：算一次，所有人用同一个函数。谁都不许再手写数字。
 *
 * ## 判据：字段值里还有没有「未核验」字样
 * 判定用的正则集中在这里定义（原先散在 audit-gaps.mjs 里，
 * 而站点自己又用另一套理解 —— 这就是数字对不上的根因）。
 *
 * ## 分段为什么要按位置排序
 * 原实现：`fm.slice(mi, pi)` 取 `mcp:` 到 `pitfalls:` 之间的正文。
 * 但 YAML 键的**出现顺序不保证**，一旦 `pitfalls:` 写在 `mcp:` 前面，
 * `slice(起点 > 终点)` 返回**空串**，那三个维度就被静默跳过 ——
 * 分母变小、分子少算，数字看起来还挺合理，就这么烂过去了。
 * 现在改成：先收集所有顶层键的位置，再按位置排序后切片，与书写顺序无关。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const TRACKS = ['agents', 'harness', 'tools'];
export const AXES = ['model_access', 'runtime', 'local_files', 'background', 'tools', 'context', 'permissions', 'fit'];
export const MCP_AXES = ['transport', 'auth', 'scope'];

/** 「这个维度还没核验」的判据 —— 唯一定义处，改这里等于改全站口径 */
export const UNVERIFIED = /(未核验|未知|未声明|未逐条|本次未能|未能逐)/;

const frontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
};

/**
 * 按顶层键的位置切片，返回 key → 正文 的映射。
 * ⚠ 与书写顺序无关 —— 这正是原实现漏掉 harness 数据的那个坑。
 */
function segments(fm) {
  /* 顶层键 = 行首无空格的 `key:` （两空格缩进的是子字段） */
  const marks = [];
  const re = /^([A-Za-z_][A-Za-z0-9_]*):/gm;
  let m;
  while ((m = re.exec(fm))) marks.push({ key: m[1], at: m.index });
  const out = {};
  for (let i = 0; i < marks.length; i++) {
    const start = marks[i].at + marks[i].key.length + 1;
    const end = i + 1 < marks.length ? marks[i + 1].at : fm.length;
    out[marks[i].key] = fm.slice(start, end);
  }
  return out;
}

/** 取出某个维度键的值正文（两个空格缩进的那个子字段） */
function axisBody(seg, key) {
  if (!seg) return null;
  const i = seg.search(new RegExp(`^\\s{2}${key}:`, 'm'));
  if (i < 0) return null;
  const after = seg.slice(i);
  const next = after.slice(1).search(/\n\s{2}[A-Za-z_]+:/);
  return (next >= 0 ? after.slice(0, next + 1) : after).replace(new RegExp(`^\\s{2}${key}:\\s*`), '').trim();
}

/**
 * 统计维度补齐率。
 * @returns {{total:number, done:number, unknown:number, byTrack:Record<string,{done:number,total:number}>, missing:Array}}
 */
export function computeCompleteness({ tracks = TRACKS, root = ROOT } = {}) {
  let total = 0, done = 0;
  const byTrack = {};
  const missing = [];
  /* 逐维度明细（2026-10-08 A6.2 新增）：{track, obj, axis, status}
   * status: done | unverified（有值但含「未核验」类字样）| absent（frontmatter 里没这个键）
   * ⚠ 明细与统计必须来自同一次解析 —— 分开写就是「三个数字」教训的重演。 */
  const detail = [];

  for (const t of tracks) {
    const dir = path.join(root, 'tracks', t, 'products');
    if (!fs.existsSync(dir)) continue;
    let tDone = 0, tTotal = 0;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
      const fm = frontmatter(fs.readFileSync(path.join(dir, f), 'utf8'));
      const seg = segments(fm);
      const isMcp = /^track:\s*mcp/m.test(fm);
      const keys = isMcp ? [...AXES, ...MCP_AXES] : AXES;
      const obj = f.replace('.md', '');
      for (const k of keys) {
        tTotal++; total++;
        const body = axisBody(seg.axes, k) ?? axisBody(seg.mcp, k);
        if (body === null) { missing.push(`${t}/${obj}:${k}`); detail.push({ track: t, obj, axis: k, status: 'absent' }); continue; }
        if (UNVERIFIED.test(body)) { detail.push({ track: t, obj, axis: k, status: 'unverified' }); } else { done++; tDone++; detail.push({ track: t, obj, axis: k, status: 'done' }); }
      }
    }
    byTrack[t] = { done: tDone, total: tTotal };
  }
  return { total, done, unknown: total - done, byTrack, missing, detail };
}

/** 给页面用的一行文本 */
export function format(c) {
  const pct = c.total ? Math.round(c.done / c.total * 100) : 0;
  return `${c.done}/${c.total} = ${pct}%`;
}

/* 直接运行时打印（便于手工核对） */
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const c = computeCompleteness();
  console.log(`\n全赛道维度补齐率：${format(c)}  （未核验 ${c.unknown}）`);
  for (const [t, v] of Object.entries(c.byTrack)) {
    console.log(`  ${t.padEnd(9)} ${v.done}/${v.total} = ${v.total ? Math.round(v.done / v.total * 100) : 0}%`);
  }
  if (c.missing.length) {
    console.log(`\n⚠ ${c.missing.length} 个维度在 frontmatter 里根本找不到对应键：`);
    console.log('  ' + c.missing.slice(0, 12).join('\n  ') + (c.missing.length > 12 ? '\n  …' : ''));
  }
}