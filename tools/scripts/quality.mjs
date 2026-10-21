// 质量审计：逐条检查维度完整度、pitfalls 质量、正文结构
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const R = (p) => path.join(ROOT, p);

const AXES = ['model_access','runtime','local_files','background','tools','context','permissions','fit'];
const MCP_AXES = ['transport','auth','scope'];

// v4 赛道目录（此前写死 ['ide','cli','mcp']，v4 合成 agent 分区后那三个目录已删）
const TRACKS = ['agents', 'harness', 'tools'];

const files = [];
for (const t of TRACKS) {
  const d = R(`tracks/${t}/products`);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter(x => x.endsWith('.md'))) files.push({ track: t, name: f });
}

// ⚠ **扫到 0 份档案时必须报错** —— 这是最危险的静默失效：
// 2026-10-03 实测本脚本扫 0 个文件，却输出「有问题条目: 0 / 0」并以 0 退出，
// 看起来一切正常，实际**什么都没检查**。目录名一变就静默失效。
if (files.length === 0) {
  console.error(`❌ 扫到 0 份档案（TRACKS = ${TRACKS.join(', ')}）—— 路径已失效，本脚本等于没运行`);
  process.exit(1);
}

console.log('条目数:', files.length);
console.log('');
console.log('id'.padEnd(20), 'dim', ' minDim', ' pits', ' body', ' conf', ' life', ' | 标记');
console.log('-'.repeat(88));

const issues = [];

for (const { track, name } of files) {
  const fp = R(`tracks/${track}/products/${name}`);
  const txt = fs.readFileSync(fp, 'utf8');
  const parts = txt.split('\n---\n');
  const fm = parts[0];
  const body = parts[1] || '';
  const id = name.replace('.md','');

  // axes 段
  const ai = fm.indexOf('\naxes:');
  const pi = fm.indexOf('\npitfalls:');
  const seg = ai >= 0 ? fm.slice(ai, pi > ai ? pi : undefined) : '';
  const dims = [...seg.matchAll(/^  ([a-z_]+):/gm)].map(x => x[1]);
  const mcpSeg = (() => {
    const mi = fm.indexOf('\nmcp:');
    if (mi < 0) return '';
    const nxt = fm.slice(mi + 1).search(/\n[a-z_]+:/);
    return nxt < 0 ? fm.slice(mi) : fm.slice(mi, mi + 1 + nxt);
  })();
  const mcpDims = [...mcpSeg.matchAll(/^  ([a-z_]+):/gm)].map(x => x[1]);

  // 每个维度的字数
  const dimLens = {};
  for (const d of [...dims, ...mcpDims]) {
    const idx = seg.indexOf(`  ${d}:`) >= 0 ? seg : mcpSeg;
    const start = idx.indexOf(`  ${d}:`);
    if (start < 0) continue;
    const after = idx.slice(start + `  ${d}:`.length);
    // 到下一个同缩进 key 或更浅缩进 key
    const m = after.match(/\n(  [a-z_]+:|\w+:)/);
    const chunk = m ? after.slice(0, m.index) : after;
    dimLens[d] = chunk.replace(/\s+/g, '').length;
  }

  const allDims = track === 'tools' ? MCP_AXES : AXES;  // v4: tools 分区用 MCP 三维（块名仍是 mcp:）
  const missing = allDims.filter(d => dimLens[d] === undefined);
  const minLens = Math.min(...Object.values(dimLens).filter(v => v > 0));
  

  const pits = (/pitfalls:\n((?:\s*-\s.*\n?)+)/.exec(fm) || [])[1] || '';
  const pitList = pits.split('\n').filter(x => /^\s*-\s+/.test(x)).map(x => x.replace(/^\s*-\s+/, ''));
  const bodyLen = body.replace(/\s/g, '').length;
  const conf = (/^confidence:\s*(\S+)/m.exec(fm) || [])[1];
  const life = (/^lifecycle:\s*(\S+)/m.exec(fm) || [])[1];

  const flags = [];
  if (missing.length) flags.push(`缺维度:${missing.join(',')}`);

  // 维度过薄要分三类：
  //   A) 零能力（如「无任何文件访问能力」）→ 正常，不算问题
  //   B) 部分核验（stdio 已确认 + HTTP 未声明）→ 正常，但需看是否说明了边界
  //   C) 全是「未核验」→ 问题：采集深度不够
  const ZERO_PAT = /(无(任何|实质|独立)?[^\n]{0,14}(能力|访问|支持|记忆)|不涉及|不支持|无状态|不保留|无跨会话)/;
  const PARTIAL_PAT = /(未核验|未声明|未知)/;
  const thinReal = [], thinZero = [], thinPartial = [], thinUnknown = [];
  for (const [k, v] of Object.entries(dimLens)) {
    if (v === 0 || v >= 40) continue;
    const idx = seg.indexOf(`  ${k}:`) >= 0 ? seg : mcpSeg;
    const start = idx.indexOf(`  ${k}:`);
    const after = idx.slice(start + `  ${k}:`.length);
    const m = after.match(/\n(  [a-z_]+:|\w+:)/);
    const content = (m ? after.slice(0, m.index) : after).replace(/\s+/g, '');
    if (ZERO_PAT.test(content)) thinZero.push(`${k}(${v})`);
    else if (PARTIAL_PAT.test(content)) {
      // 若「未核验」之外还有实质内容，算部分核验
      const substantive = content.replace(/(本次)?未核验|记为未知|未声明|未知/g, '').length;
      if (substantive < 15) thinUnknown.push(`${k}(${v})`);
      else thinPartial.push(`${k}(${v})`);
    }
    else thinReal.push(`${k}(${v})`);
  }
  if (thinReal.length) flags.push(`维度过薄:${thinReal.join(',')}`);
  if (thinUnknown.length) flags.push(`⚠全未核验:${thinUnknown.join(',')}`);
  if (thinZero.length) flags.push(`零能力(ok):${thinZero.join(',')}`);
  if (thinPartial.length) flags.push(`部分核验(ok):${thinPartial.join(',')}`);

  if (pitList.length === 0) flags.push('无pitfalls');
  // 上限从 70 放宽到 130（2026-10-03）。理由：pitfalls 里价值最高的一类是
  // 「以为 X —— 其实是 Y（官方原话）」这种单行纠偏，天然带出处引用，
  // 70 字会把它们全判成超长。判据该问「是否说清一件事」，不是问字数。
  // 真正的啰嗦（同一句里反复铺陈）仍会超130 被抓到。
  if (pitList.some(p => p.length > 130)) flags.push('pitfall超长');
  if (bodyLen < 300) flags.push(`正文过短(${bodyLen})`);
  if (conf === 'verified' && life !== 'active') flags.push(`verified+${life}`);
  // 正文必须有的小节（与 SCHEMA 第三节一致；旧「适合」/「注意」已废弃）
  for (const sec of ['一句话定位','适合与不适合','实测记录','未知项清单']) {
    if (!body.includes(sec)) flags.push(`缺正文:${sec}`);
  }

  console.log(
    id.padEnd(20),
    String(allDims.length - missing.length).padStart(3),
    String(minLens).padStart(7),
    String(pitList.length).padStart(5),
    String(bodyLen).padStart(5),
    (conf || '-').padEnd(8),
    (life || '-').padEnd(7),
    ' | ' + (flags.length ? flags.join('; ') : 'OK')
  );

  if (flags.length) issues.push({ id, track, flags });
}

console.log('');
console.log('=== 汇总 ===');
console.log('有问题条目:', issues.length, '/', files.length);
const allFlags = new Map();
for (const it of issues) for (const f of it.flags) {
  const key = f.split(':')[0];
  allFlags.set(key, (allFlags.get(key) || 0) + 1);
}
if (allFlags.size) {
  console.log('问题类型分布:');
  [...allFlags.entries()].sort((a,b)=>b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));
}
