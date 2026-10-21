import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// 后处理：给「作者在文件名里标了 bpw」的变体补标档位
// 起因：DeepSeek-V4-Flash-MTP-3.93bpw.gguf 这类文件名不认标准档名，
// 但作者自己标了每权重比特数 → 采信作者标注（仍标为推导，说明来源是文件名而非标准表）

const DIR = path.resolve(HERE, '..', 'data', 'series');

const TIERS = [
  { max: 3.0, tier: '极限压缩' },
  { max: 3.7, tier: '长上下文优先' },
  { max: 5.0, tier: '平衡档' },
  { max: 7.0, tier: '保守档' },
  { max: 99, tier: '近似无损' },
];
const tierOf = (b) => (b == null ? '未识别' : (TIERS.find((t) => b <= t.max) || TIERS[4]).tier);

let fixed = 0, fixedFiles = 0;
const remaining = [];

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const p = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  let touched = false;

  for (const m of j.members || []) {
    for (const v of m.variants || []) {
      for (const gf of v.files || []) {
        if (gf.quant !== '其他') continue;
        const bpwM = (gf.name || '').match(/(\d+(?:\.\d+)?)\s*bpw/i);
        if (!bpwM) { remaining.push({ repo: v.repo, file: gf.name }); continue; }
        const bpw = parseFloat(bpwM[1]);
        gf.quant = `自定义 ${bpwM[1]} bpw（作者标注）`;
        gf.bitsPerWeight = bpw;
        gf.tier = tierOf(bpw);
        gf.tierDesc = '量化者在文件名中直接标注了每权重比特数';
        gf.authorLabeled = true;
        touched = true; fixed++;
      }
    }
  }

  if (touched) { fs.writeFileSync(p, JSON.stringify(j, null, 2)); fixedFiles++; }
}

console.log(`补标完成：${fixedFiles} 个文件，共 ${fixed} 个档位`);
console.log(`仍未识别：${remaining.length}`);
const byFile = {};
for (const r of remaining) (byFile[r.file] ||= []).push(r.repo);
for (const [file, repos] of Object.entries(byFile).slice(0, 12)) {
  console.log(`  ${file}  ← ${repos[0]}${repos.length > 1 ? ` 等 ${repos.length} 仓` : ''}`);
}
