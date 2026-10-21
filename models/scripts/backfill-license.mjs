// 回填量化变体的许可：量化产物继承基座模型的许可。
//
// 为什么可以这样处理（2026-10-01）：
//   量化是对权重做数学变换（舍入 / 缩放 / imatrix 重要性矩阵加权），
//   不新增也不删除任何原始权重内容 —— 派生物的著作权与原作同一，
//   因此许可必然继承基座。MIT / Apache-2.0 的条款也明确写了派生物同许可。
//
// 为什么需要这个脚本：
//   实测 10 个 HF 量化仓的 model card 里**没有 license 字段**
//   （bartowski / AtomicChat / AesSedai / ddh0 / bullerwins 各自的 GGUF 仓）。
//   不是采集失败 —— 是这些仓确实没写。bartowski 是本站 PRIMARY 量化者、
//   Qwen3.8-27B 那个仓下载 48万，缺许可会让「只索引可确认许可的权重」这条承诺破掉。
//
// 回填后必须留痕：
//   licenseInherited: true + licenseFrom: '<基座 repo>'
//   页面照旧显示许可徽章，并额外标注「继承自基座，量化仓未单独声明」，
//   读者仍能点回量化仓与基座两个链接自行核对 —— 不代替读者下法律结论。
//
// 用法：node backfill-license.mjs [--dry]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'data', 'series');
const DRY = process.argv.includes('--dry');

let filled = 0;
let skipped = 0;
const touched = [];

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const p = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  let dirty = false;

  for (const m of j.members || []) {
    if (!m.license) continue;               // 基座自己缺许可 → 不能继承，跳过
    for (const v of m.variants || []) {
      if (v.license) { skipped++; continue; }
      v.license = m.license;
      v.licenseInherited = true;
      v.licenseFrom = m.repo;
      filled++;
      dirty = true;
    }
  }

  if (dirty) {
    touched.push(f);
    if (!DRY) fs.writeFileSync(p, JSON.stringify(j, null, 1));
  }
}

console.log(DRY ? '═══ 试运行（未写盘）═══' : '═══ 回填完成 ═══');
console.log(`回填 ${filled} 个变体的许可（继承自基座）| 已有许可跳过 ${skipped} | 涉及 ${touched.length} 个系列文件`);
for (const t of touched) console.log('  ' + t);