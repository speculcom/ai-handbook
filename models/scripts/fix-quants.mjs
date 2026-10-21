// 后处理：把 quant-rules.mjs 的最新规则重新应用到已采集的数据。
//
// 为什么需要它：改档名规则不该等一次 5 分钟的全量重采（还容易被限流打断）。
// 本脚本对已落盘的 series/*.json 做三件事，结果与重采一致：
//   1. 删掉非权重文件（mmproj / mtp / imatrix / tokenizer）
//   2. 重新解析每个文件的档名与 bpw
//   3. 重算变体的 coverage / totalFileSize / totalGB 与 recommended 推荐档
//
// 用法：node fix-quants.mjs [--dry]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseQuant, tierOf, TIER_RULES } from './quant-rules.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'data', 'series');
const DRY = process.argv.includes('--dry');

/** 单个文件的推荐档：优先取覆盖该变体最多的平衡档；无平衡档则取最接近 5bpw 的。 */
function recommend(files) {
  const bal = files.filter((f) => f.tier === '平衡档');
  const pool = bal.length ? bal : files.filter((f) => f.tier !== '未识别');
  if (!pool.length) return null;
  // 同档内取体积最大的（分片已合并，代表该档完整权重）
  return pool.reduce((a, b) => (b.sizeGB > a.sizeGB ? b : a));
}

let stat = { filesIn: 0, removed: 0, requant: 0, retier: 0, reco: 0, series: 0 };

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const p = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  let touched = false;

  for (const m of j.members || []) {
    for (const v of m.variants || []) {
      const before = v.files.length;
      const kept = [];
      for (const gf of v.files || []) {
        stat.filesIn++;
        const r = parseQuant(gf.name);
        if (r.notWeight) { stat.removed++; continue; }
        if (gf.quant !== r.quant) stat.requant++;
        const t = tierOf(r.bitsPerWeight).tier;
        if (gf.tier !== t) stat.retier++;
        kept.push({
          ...gf,
          quant: r.quant,
          bitsPerWeight: r.bitsPerWeight,
          tier: t,
          authorLabeled: !!r.declared,
        });
      }
      //脏标记必须覆盖「聚合值/ recommended 变了」，不能只看文件数 ——
      // 早先只判 kept.length !== before，导致文件数没变但 recommended 是脏数据时
      // 不写盘，修不干净。当前数据里 ggml-org 有 4 个 variant 的 recommended
      // 被fix-draft-models.mjs 写成了字符串（'覆盖 N 档'），构建时直接 TypeError。
      const prevRec = v.recommended;
      const prevCov = v.coverage;
      const prevGB = v.totalGB;
      v.files = kept;
      v.variantCount = kept.length;
      // 重算聚合值
      const size = kept.reduce((s, x) => s + (x.sizeBytes || 0), 0);
      const total = size;
      v.totalFileSize = total;
      v.totalGB = +(total / 1073741824).toFixed(1);
      v.coverage = new Set(kept.map((x) => x.quant)).size;
      const rec = recommend(kept);
      v.recommended = rec
        ? { quant: rec.quant, sizeGB: rec.sizeGB, tier: rec.tier, name: rec.name }
        : null;
      const recChanged = JSON.stringify(prevRec) !== JSON.stringify(v.recommended);
      if (kept.length !== before || recChanged || prevCov !== v.coverage || prevGB !== v.totalGB) {
        touched = true;
      }
    }
  }

  j.collectedAt = j.collectedAt || null;
  stat.series++;
  if (touched && !DRY) fs.writeFileSync(p, JSON.stringify(j, null, 1));
}

console.log(DRY ? '═══ 试运行（未写盘）═══' : '═══ 重新套用档名规则完成 ═══');
console.log(`系列 ${stat.series} | 原文件 ${stat.filesIn} | 删除非权重 ${stat.removed} | 改档名 ${stat.requant} | 改档位 ${stat.retier}`);
console.log('剩余文件', stat.filesIn - stat.removed);
console.log('档位表:', TIER_RULES.map((t) => `${t.tier}≤${t.max}`).join('  '));
