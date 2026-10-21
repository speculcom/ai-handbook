#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { tierOf } from './quant-rules.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/**
 * 补齐 14 种档位缺失的 tierDesc（2026-10-05）
 *
 * ⚠ 根因：`tierOf()` 后来才加 desc 字段，但数据是它加之前采集的
 *   —— 所以 14 种档位有 tier（分类）却没有 desc（说明）。
 *   ⚠ 数据里 bpw 是有效值（4.83 / 1.65 / 32…），tier 也正确，只有 desc 是空的。
 *
 * 做法：**不重采**（那是几百次网络请求），直接用现行的 tierOf() 补 desc。
 * ⚠ 只填 desc 为空的那��，**不覆盖已有的**。
 */

const DIR = path.resolve(HERE, '..', 'data', 'series');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));

let fixed = 0, fixedFiles = 0;
const detail = [];

for (const f of files) {
  const p = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  let touched = false;

  for (const m of j.members || []) {
    for (const v of m.variants || []) {
      for (const gf of v.files || []) {
        // ⚠ 只补 desc 为空且bpw 有效的
        if (gf.tierDesc) continue;
        if (gf.bitsPerWeight == null) continue;
        const { tier, desc } = tierOf(gf.bitsPerWeight);
        if (!desc) continue;              // 算不出就不填
        gf.tier = tier;                   // 顺便对齐（应该一致，但保险）
        gf.tierDesc = desc;
        fixed++; touched = true;
        detail.push({ file: f, quant: gf.quant, bpw: gf.bitsPerWeight, tier, desc });
      }
      // recommended 里也可能有 desc 缺失
      if (v.recommended && !v.recommended.tierDesc && v.recommended.quant) {
        const hit = v.files.find(x => x.quant === v.recommended.quant);
        if (hit && hit.tierDesc) {
          v.recommended.tierDesc = hit.tierDesc;
          v.recommended.tier = hit.tier;
          touched = true;
        }
      }
    }
  }

  if (touched) {
    fs.writeFileSync(p, JSON.stringify(j, null, 2), 'utf8');
    fixedFiles++;
  }
}

console.log(`\n补齐完成：${fixedFiles} 个系列文件，共 ${fixed} 个档位 desc\n`);

const byQuant = new Map();
for (const d of detail) {
  if (!byQuant.has(d.quant)) byQuant.set(d.quant, d);
}
console.log('按档位汇总：');
console.log('档位'.padEnd(16) + '位宽'.padEnd(9) + '档位分类  说明');
console.log('─'.repeat(70));
for (const d of [...byQuant.values()].sort((a, b) => a.bpw - b.bpw)) {
  console.log(d.quant.padEnd(16) + (d.bpw + 'bpw').padEnd(9) + d.tier.padEnd(10) + d.desc);
}

/* 验证：再扫一遍，还有没有空的 */
console.log('\n═══ 复验 ═══\n');
let still = 0;
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  for (const m of j.members || []) {
    for (const v of m.variants || []) {
      for (const gf of v.files || []) {
        if (!gf.tierDesc && gf.bitsPerWeight != null) {
          if (still < 5) console.log(`  ✗ ${f} ${gf.quant} bpw=${gf.bitsPerWeight}`);
          still++;
        }
      }
    }
  }
}
console.log(still === 0 ? '  ✓ 有 bpw 的档位全部有 desc' : `  ⚠ 仍有 ${still} 个`);
console.log('');