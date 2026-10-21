// 剔除「投机解码草稿模型（draft model）」文件。
//
// 为什么必须剔：草稿模型不是主模型权重，而是给投机解码用的辅助网络 ——
// 必须与主模型配对才能工作，单独下载没有意义。实测案例：
//   ggml-org/gemma-4-26B-A4B-it-GGUF 里有
//     dflash-gemma-4-26B-A4B-it-Q8_0.gguf   0.47 GB   ← 草稿模型
//     gemma-4-26B-A4B-it-Q8_0.gguf          26.86 GB  ← 主模型
//   B 区「按显存选档」取同档位最小体积，于是把 0.47 GB 当成 Q8_0 档推荐给用户，
//   显存 8 GB 的人会被告知「装 Q8_0 即可」—— 严重错误建议。
//
// 为什么按文件名识别而不是按体积：体积没有通用阈值（不同规模的草稿模型大小差异极大），
// 而投机解码方案有明确的命名约定：DFlash / EAGLE / EAGLE-3 / Medusa / Draft。
//
// 已核实来源：
//   DFlash  = z-lab 的块扩散投机解码方案，arXiv:2602.06036，tags 含
//             speculative-decoding / draft-model / block-diffusion
//   EAGLE-3 = 微软的投机解码方案
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(HERE, '..', 'data', 'series');

// 命名即语义：这些前缀/词出现即代表「辅助网络」而非主权重。
const DRAFT = /^(?:dflash[-_]|eagle\d?[-_]|medusa[-_]|draft[-_])|(?:[-_])(?:dflash|eagle\d?|medusa|draftmodel)[-_]/i;
// 兜底：文件名任意位置出现这些词（排除 .gguf 之外的后缀误伤）
const DRAFT_LOOSE = /(?:^|[-_])(dflash|eagle3?|medusa|draft[-_]?model)(?:[-_.]|$)/i;

function isDraft(name) {
  const base = name.replace(/\.gguf$/i, '');
  return DRAFT.test(base) || DRAFT_LOOSE.test(base);
}

let removed = 0;
let touched = 0;
const log = [];

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const fp = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
  let dirty = false;

  for (const m of j.members) {
    for (const v of m.variants) {
      const before = v.files.length;
      const keep = [];
      for (const gf of v.files) {
        if (isDraft(gf.name)) {
          removed++;
          log.push(`${m.repo}  ${v.quantizer}  ${gf.name}  ${gf.sizeGB} GB`);
          continue;
        }
        keep.push(gf);
      }
      if (keep.length !== before) {
        v.files = keep;
        v.variantCount = keep.length;
        // 体积统计必须跟着重算，否则 coverage / totalGB 仍含被剔文件
        const totalBytes = keep.reduce((a, f2) => a + (f2.sizeBytes || 0), 0);
        v.totalFileSize = totalBytes;
        v.totalGB = +(totalBytes / 1e9).toFixed(2);
        v.coverage = [...new Set(keep.map((f2) => f2.quant).filter((x) => x && x !== '未识别'))].length;
        // recommended 必须是对象（collect-models.mjs / fix-quants.mjs 都写对象）。
        // 早先这里写的是字符串（'覆盖 N 档'），导致 build.mjs 读 rec.sizeGB 时 TypeError
        // —— 构建整个站直接崩。选档规则与 fix-quants.mjs 的 recommend() 保持一致。
        const bal = keep.filter((f2) => f2.tier === '平衡档');
        const pool = bal.length ? bal : keep.filter((f2) => f2.tier && f2.tier !== '未识别' && f2.sizeGB > 0);
        const rec = pool.length
          ? pool.reduce((a, b) => (b.sizeGB > a.sizeGB ? b : a))
          : null;
        v.recommended = rec
          ? { quant: rec.quant, sizeGB: rec.sizeGB, tier: rec.tier, name: rec.name }
          : null;
        dirty = true;
      }
    }
  }

  if (dirty) {
    fs.writeFileSync(fp, JSON.stringify(j, null, 1), 'utf8');
    touched++;
    console.log('  ✓ ' + f);
  }
}

console.log(`\n剔除 ${removed} 个草稿模型文件，涉及 ${touched} 个系列文件：`);
for (const l of log) console.log('  − ' + l);

// 复核：确认没有漏网的
console.log('\n复核：');
let left = 0;
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  for (const m of j.members) for (const v of m.variants) for (const gf of v.files) {
    if (isDraft(gf.name)) { left++; console.log('  ! 仍存在 ' + gf.name); }
  }
}
console.log(left === 0 ? '  ✓ 无残留' : `  ✗ 仍残留 ${left} 个`);

// 复核：各成员最小 Q8/BF16 是否合理（粗 sanity：主模型权重不应小于 100 MB）
console.log('\n各成员最小非分片权重体积：');
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json')).sort()) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  for (const m of j.members) {
    let min = null;
    for (const v of m.variants) for (const gf of v.files) {
      if (gf.isSharded || gf.notWeight) continue;
      if (!min || gf.sizeGB < min.sizeGB) min = gf;
    }
    console.log(`  ${m.repo.padEnd(34)} 最小 ${min ? min.sizeGB + ' GB (' + min.quant + ')' : '—'}`);
  }
}
