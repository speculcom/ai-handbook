// 审计：逐条目列出 confidence、lifecycle 与标了未知的维度
//
// ⚠ 2026-10-08：数字口径已统一到 scripts/completeness.mjs（铁律 R4）。
// 本文件**不再自己算**补齐率 —— 过去这里算出 174/315，而站点写死 69/99，
// 独立测量又是 193/315，同一件事三个数字。
// 现在本文件只做「人可读的明细打印」，真值一律来自 completeness.mjs。
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { computeCompleteness, TRACKS } from './completeness.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const only = process.argv.slice(2).length ? process.argv.slice(2) : TRACKS;

console.log('\n（未知维度 = 该维度正文里仍有「未核验/未知/未声明」字样；已补齐 = 该维度内容完整）\n');

const c = computeCompleteness({ tracks: only, root: ROOT });
const pct = c.total ? Math.round(c.done / c.total * 100) : 0;
console.log('分赛道：');
for (const [t, v] of Object.entries(c.byTrack)) {
  const p = v.total ? Math.round(v.done / v.total * 100) : 0;
  console.log(`  ${t.padEnd(9)} ${v.done}/${v.total} = ${p}%`);
}
console.log(`\n全赛道维度补齐率：${c.done}/${c.total} = ${pct}%  （未核验 ${c.unknown}）`);
if (pct >= 60) console.log('  → 已过半，继续补齐可显著提升 confidence 分布');
if (c.missing.length) {
  console.log(`\n⚠ ${c.missing.length} 个维度在 frontmatter 里找不到对应键（分母已计入、内容算未核验）：`);
  console.log('  ' + c.missing.slice(0, 10).join('\n  '));
}

console.log('（逐条明细见各赛道页的「完整度」区块；补内容后重跑本脚本）');