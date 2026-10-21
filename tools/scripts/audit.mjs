// 内部一致性审计：_track 声明 vs 实际文件 / 标签池 / 链接
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 用法：node scripts/audit.mjs [--plan]
// 默认检查一致性；--plan 额外把「声明但缺文件」当正常（Phase 2 建设期）
const PLAN_MODE = process.argv.includes('--plan');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const R = (p) => path.join(ROOT, p);

// v4 赛道目录（2026-10-03）。此前写死 ['ide','cli','mcp']，而那三个目录已在
// v4 合成 agent 分区时被删 —— 脚本直接崩在 readFileSync，读不到文件就抛异常。
// 注意：赛道**目录**是 agents/harness/tools，而档案里的 `track:` 字段仍是
// ide/cli/cloud/harness/mcp（那是「形态」标记，build.mjs 用 owns 映射到分区），
// 两者刻意不同，改任何一边都要同步另一边。
const TRACKS = ['agents', 'harness', 'tools'];

// 赛道目录必须能读到档案 —— 扫到 0 个文件时**必须报错而不是通过**。
// 2026-10-03 实测：quality.mjs 扫 0 个文件却输出「有问题条目: 0 / 0」并退出 0，
// 看起来一切正常，实际什么都没检查。这是最危险的一种失效。
function requireArchives(track, dir) {
  const n = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).length
    : 0;
  if (n === 0) {
    console.error(`  ❌ ${track}: products 目录里 0 份档案 —— 检查路径是否变了（本脚本扫不到东西等于没检查）`);
    process.exitCode = 1;
  }
  return n;
}

console.log('=== 1. 赛道声明 vs 实际文件 ===');
for (const t of TRACKS) {
  const txt = fs.readFileSync(R(`tracks/${t}/_track.md`), 'utf8');
  // 只认「至少 3 列」的表格行才算档案声明 —— `tracks/agents/_track.md` 里有一张
  // 2 列的「形态判据表」（| `ide` | 主要交互在图形界面… |），那是 track 取值的说明，
  // 不是档案。第一版不过滤列数，于是把 ide / cli 当成两个「声明但缺文件」的档案。
  const ids = [...txt.matchAll(/^\| `([a-z0-9-]+)`\s*\|[^|]*\|[^|]*\|/gm)].map((m) => m[1]);
  const dir = R(`tracks/${t}/products`);
  const have = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''))
    : [];
  requireArchives(t, dir);
  const missing = ids.filter((i) => !have.includes(i));
  const extra = have.filter((h) => !ids.includes(h));
  console.log(`\n[${t}] 声明 ${ids.length} / 现有 ${have.length}`);
  console.log('  已建: ' + (have.join(', ') || '(无)'));
  if (missing.length) {
    const label = PLAN_MODE ? '⏳ 待建' : '❌ 声明但缺文件';
    console.log(`  ${label} (${missing.length}): ` + missing.join(', '));
  }
  if (extra.length) console.log('  ⚠️ 存在但未声明: ' + extra.join(', '));
  // 重复声明
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) console.log('  ❌ 声明重复: ' + [...new Set(dup)].join(', '));
}

console.log('\n=== 2. 标签池一致性 ===');
const schema = fs.readFileSync(R('SCHEMA.md'), 'utf8');
const secIdx = schema.indexOf('## 六、标签池');
const poolSection = secIdx >= 0 ? schema.slice(secIdx, schema.indexOf('## 七、', secIdx)) : '';
const pools = {};
let cur = null;
for (const l of poolSection.split('\n')) {
  const h = l.match(/^###\s*(.+)$/);
  if (h) { cur = h[1]; pools[cur] = []; continue; }
  // 池内容行：形如 "编程 · 办公 · 研究"
  if (cur && l.trim() && l.includes('·') && !l.trim().startsWith('#') && !l.includes('|')) {
    pools[cur].push(...l.trim().split('·').map((s) => s.trim()).filter(Boolean));
  }
}
const allPoolTags = new Set(Object.values(pools).flat());
console.log('  池: ' + (Object.keys(pools).join(' / ') || '(未解析到)'));
console.log('  池内标签数: ' + allPoolTags.size);
if (allPoolTags.size === 0) {
  console.log('  ⚠️ 标签池解析失败，检查 SCHEMA.md 第六节格式');
}

const tagIssues = [];
for (const t of TRACKS) {
  const dir = R(`tracks/${t}/products`);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const txt = fs.readFileSync(path.join(dir, f), 'utf8');
    const m = /^tags:\s*\[(.*)\]$/m.exec(txt.split('\n---\n')[0] || txt);
    if (!m) continue;
    const tags = m[1].split(',').map((s) => s.trim()).filter(Boolean);
    const outside = tags.filter((x) => !allPoolTags.has(x));
    if (outside.length) tagIssues.push(`${t}/${f}: ${outside.join(', ')}`);
  }
}
if (tagIssues.length) {
  console.log('  ❌ 池外标签:');
  tagIssues.forEach((i) => console.log('     ' + i));
} else {
  console.log('  ✅ 所有条目标签都在池内');
}

console.log('\n=== 3. 赛道文件引用的 taxonomy 路径 ===');
// v4：MCP 维度定义随赛道改名 mcp → tools，所以这里扫 tracks/tools/_track.md。
// 保留 track 变量名 mcpTrack 只是历史叫法，实际读的是 tools。
const mcpTrack = fs.readFileSync(R('tracks/tools/_track.md'), 'utf8');
for (const m of mcpTrack.matchAll(/\]\((\.\/[^)]+)\)/g)) {
  const tp = path.join(R('tracks/tools'), m[1]);
  console.log(`  ${fs.existsSync(tp) ? 'OK  ' : 'MISS'} ${m[1]}`);
}

console.log('\n=== 4. SOURCES.md 域名清单 ===');
const src = fs.readFileSync(R('SOURCES.md'), 'utf8');
const doms = [...new Set([...src.matchAll(/https:\/\/([a-z0-9.-]+)\//g)].map((m) => m[1]))].sort();
console.log('  ' + doms.join('\n  '));

console.log('\n=== 5. 各条目 sources 域名 ===');
for (const t of TRACKS) {
  const dir = R(`tracks/${t}/products`);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const txt = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = (txt.split('\n---\n')[0] || txt);
    const us = [...fm.matchAll(/url:\s*(https:\/\/[^\s]+)/g)].map((m) => m[1]);
    const ds = [...new Set(us.map((u) => { try { return new URL(u).hostname; } catch { return '?'; } }))];
    console.log(`  [${t}/${f.replace('.md', '')}] ${ds.join(', ')}`);
  }
}
