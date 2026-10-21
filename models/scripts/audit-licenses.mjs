import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// ============================================================================
// 审计：建站前的强制校验
// ----------------------------------------------------------------------------
// 站点的合规承诺是「只索引、只引述、不托管、不解读许可、不给法律意见」。
// 这条脚本就是把承诺变成会失败的检查：任何一条不满足，退出码非 0，构建中止。
//
// 检查项：
//   A. 每条 variants[] 必须有 license（非空）—— 否则等于在展示无法确认许可的权重
//   B. 每条 variants[] 必须有可点回的 HF 发布页 URL
//   C. license 为 other / unknown 时，必须在报告里显式列出（页面要显示「以发布页原文为准」）
//   D. 不得出现任何指向权重文件的直接下载链接（本站不托管权重）
//   E. 每个系列至少 1 个成员、每个成员至少 1 个量化变体
//   F. 所有量化档位必须能被 QUANT_MAP 识别（未识别档位说明命名标准变了，需人工核对）
// ============================================================================

const OUT = path.resolve(HERE, '..');
const DIR = `${OUT}/data/series`;

const problems = [];
const warnings = [];
const needManualLicense = [];
const unrecognized = [];
const stats = {
  series: 0, members: 0, variants: 0, files: 0, quantizers: new Set(),
  byLicense: {}, byTier: {},
};

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const s = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  stats.series++;

  if (!s.members || s.members.length === 0) {
    problems.push(`[E] ${f}: 没有任何成员`);
    continue;
  }

  for (const m of s.members) {
    stats.members++;
    if (!m.license) {
      problems.push(`[A] ${m.repo}: 基础模型缺 license`);
      needManualLicense.push({ repo: m.repo, level: 'base', license: null });
    } else {
      stats.byLicense[m.license] = (stats.byLicense[m.license] || 0) + 1;
    }

    if (!m.variants || m.variants.length === 0) {
      problems.push(`[E] ${m.repo}: 没有任何量化变体`);
      continue;
    }

    for (const v of m.variants) {
      stats.variants++;
      stats.quantizers.add(v.quantizer);

      // A. 许可
      if (!v.license) {
        problems.push(`[A] ${v.repo}: 量化变体缺 license`);
        needManualLicense.push({ repo: v.repo, level: 'variant', license: null });
      } else {
        stats.byLicense[v.license] = (stats.byLicense[v.license] || 0) + 1;
      }

      // B. 可点回发布页
      if (!v.url || !/^https:\/\/huggingface\.co\/.+/.test(v.url)) {
        problems.push(`[B] ${v.repo}: URL 缺失或非 HF 发布页 → ${v.url}`);
      }

      // C. 需人工核对许可的
      if (v.license && /^(other|unknown|unclear|noassertion|cc-by-4\.0|cc-by-sa|cc-by-nc|cc-by-nc-sa|gpl|agpl|openrail|bigscience-openrail-m)$/i.test(v.license)) {
        needManualLicense.push({ repo: v.repo, level: 'variant', license: v.license });
      }

      // D. 不得有直接下载权重链接
      // 正确做法：检查 path 是不是 URL（我们的 path 是仓库内相对路径，如 BF16/xxx.gguf）
      // 早期版本误把「所有 .gguf 路径」都当成下载链接，导致 3485 条假警报 —— 检查规则本身是错的。
      for (const gf of v.files || []) {
        if (/^https?:\/\//i.test(gf.path || '')) {
          problems.push(`[D] ${v.repo}: 文件路径是完整 URL，疑似直接下载链接 → ${gf.path}`);
        }
      }

      // F. 档位可识别
      for (const gf of v.files || []) {
        stats.files++;
        if (gf.quant === '其他') unrecognized.push({ repo: v.repo, file: gf.name });
        stats.byTier[gf.tier] = (stats.byTier[gf.tier] || 0) + 1;
      }
    }
  }
}

if (unrecognized.length) {
  warnings.push(`[F] ${unrecognized.length} 个文件名未匹配到量化档位（命名标准可能已变，需人工核对）`);
}

// ── 报告 ────────────────────────────────────────────────────────────────
const report = {
  auditedAt: new Date().toISOString(),
  pass: problems.length === 0,
  stats: {
    series: stats.series, members: stats.members, variants: stats.variants,
    files: stats.files, quantizers: [...stats.quantizers].sort(),
    byLicense: stats.byLicense, byTier: stats.byTier,
  },
  problems,
  warnings,
  needManualLicense,
  unrecognizedQuants: unrecognized.slice(0, 40),
};
fs.writeFileSync(`${OUT}/docs/audit-report.json`, JSON.stringify(report, null, 2));

console.log('══════════ 审计报告 ══════════');
console.log('系列', stats.series, '| 成员', stats.members, '| 量化仓', stats.variants, '| GGUF 文件', stats.files);
console.log('许可分布:', JSON.stringify(stats.byLicense));
console.log('档位分布:', JSON.stringify(stats.byTier));
console.log('量化者(' + stats.quantizers.size + '):', [...stats.quantizers].sort().join(' '));
console.log('');
if (needManualLicense.length) {
  console.log(`需人工核对许可（${needManualLicense.length}）— 页面须显示「以发布页原文为准」:`);
  const byLic = {};
  for (const x of needManualLicense) (byLic[x.license || '(缺失)'] ||= []).push(x.repo);
  for (const [lic, repos] of Object.entries(byLic)) {
    console.log(`  [${lic}] ${repos.length} 个：`);
    for (const r of repos.slice(0, 8)) console.log('      ', r);
    if (repos.length > 8) console.log(`       … 另 ${repos.length - 8} 个`);
  }
  console.log('');
}
if (unrecognized.length) {
  console.log(`未识别档位（前 10）:`);
  for (const u of unrecognized.slice(0, 10)) console.log('   ', u.file, '←', u.repo);
  console.log('');
}
if (warnings.length) warnings.forEach((w) => console.log('⚠', w));
if (problems.length) {
  console.log(`\n✗ ${problems.length} 项不合规：`);
  for (const p of problems.slice(0, 30)) console.log('   ', p);
  console.log('\n审计未通过 → 中止建站');
  process.exit(1);
}
console.log('\n✓ 审计通过，可以建站');
