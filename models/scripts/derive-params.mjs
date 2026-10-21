// 从实测 GGUF 体积反推真实参数量。
//
// 为什么不用 API 声明的参数量：
//   1. HF 的 safetensors.total 对 MoE 只给「总参」，而用户真正关心的是「激活参」
//      （Kimi-K3 总参 2780B，实际每个 token 只激活一小部分）；
//   2. config.num_parameters 在这些新模型上普遍缺失；
//   3. 声明值可能与权重实际不符。
//
// 做法：同一个变体里，权重文件体积 ÷ 该档的 bpw = 参数量。
//   体积来自 HF tree 接口实测的字节数，bpw 来自 llama.cpp 公开量化类型表。
//   同一档位下所有文件算出的参数量应当一致（可作交叉校验）；
//   不同档位之间也应当一致，若不一致说明 bpw 表有偏差 → 直接报出来。
//
// 输出：写回每个成员的 derivedParams（实测反推），并与官方申报总参
// （merge-meta.mjs 从 safetensors 抓的 declaredParams）交叉校验。
// 两个来源独立：一个来自 API 声明，一个来自文件实测字节数。
// 差异大时以实测为准并标出 —— 声明值可能包含未训练/未激活的张量。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(HERE, '..', 'data', 'series');

const fmt = (x) => (x >= 100 ? Math.round(x) : x >= 10 ? +x.toFixed(1) : +x.toFixed(2));

let warned = 0;

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const fp = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
  console.log(`\n═══ ${j.name.zh} ═══`);
  let dirty = false;

  for (const m of j.members) {
    const ests = [];
    for (const v of m.variants) {
      for (const gf of v.files) {
        // 排除 mmproj 之类已剔除；这里只要求 bpw 有值
        if (!gf.bitsPerWeight || !gf.sizeBytes) continue;
        ests.push({ n: gf.sizeBytes * 8 / gf.bitsPerWeight, quant: gf.quant, repo: v.quantizer });
      }
    }
    if (!ests.length) { console.log(`  ${m.repo}  无可用样本`); continue; }

    // 离散度大是因为样本里混了「不是全权重」的文件：BF16 的 mmproj 投影层、
    // 某些仓只发 MTP 头、部分量化者只放单独张量等。这些文件会严重拉偏均值。
    // 取法：按参数量排序后找最密集的簇（相邻差 < 3% 视为同簇），用簇内中位。
    ests.sort((a, b) => a.n - b.n);
    let best = [ests[0]];
    let cur = [ests[0]];
    for (let i = 1; i < ests.length; i++) {
      if (ests[i].n - cur[cur.length - 1].n < cur[cur.length - 1].n * 0.03) cur.push(ests[i]);
      else { if (cur.length > best.length) best = cur; cur = [ests[i]]; }
    }
    if (cur.length > best.length) best = cur;
    const n = best[Math.floor(best.length / 2)].n;
    const spread = ((best[best.length - 1].n - best[0].n) / n) * 100;
    const lo = best[0], hi = best[best.length - 1];

    const declared = m.params || '（config 未填）';
    const claimed = parseFloat(String(declared));

    // 官方申报总参（safetensors.total，merge-meta.mjs 抓的）。这是独立第二来源。
    const off = m.declaredParams || null;
    const offDiff = off ? ((off - n) / n) * 100 : null;
    // 差异判定：<4% 视为一致（反推本身有 bpw 表误差 + 未训练张量影响）。
    const verdict = offDiff === null ? '—' : Math.abs(offDiff) < 4 ? '一致' : offDiff > 0 ? `实测少 ${offDiff.toFixed(0)}%` : `实测多 ${(-offDiff).toFixed(0)}%`;
    const agree = !Number.isNaN(claimed)
      ? Math.abs((n / 1e9 - claimed) / claimed) * 100 < 12 ? '一致' : '差 ' + Math.abs((n / 1e9 - claimed) / claimed * 100).toFixed(0) + '%'
      : '—';

    // 写回数据：留痕用，A 区会把两个来源并排显示给用户看。
    m.derivedParams = Math.round(n);
    m.derivedSpread = +spread.toFixed(1);
    m.derivedSamples = { cluster: best.length, total: ests.length, from: lo.quant, to: hi.quant };
    if (off) m.declaredVsDerived = +offDiff.toFixed(1);
    dirty = true;

    console.log(`  ${m.repo}`);
    console.log(`    官网标注 ${declared}   官方API总参 ${off ? fmt(off / 1e9) + 'B' : '—'}   实测反推 ${fmt(n / 1e9)}B`);
    console.log(`    官网标注vs反推 ${agree}   官方API vs 反推 ${verdict}`);
    console.log(`    主簇 ${best.length}/${ests.length} 个文件   簇内离散 ${spread.toFixed(1)}%   参考档 ${lo.quant}~${hi.quant}`);
    if (best.length < ests.length * 0.3) console.log(`    ⚠ 主簇只占 ${(100 * best.length / ests.length).toFixed(0)}%，样本质量存疑`);
    if (verdict !== '一致' && verdict !== '—') { warned++; console.log(`    ⚠ 两来源不一致，以实测为准 → config.js 的 params 需按实测修正`); }
  }
  if (dirty) fs.writeFileSync(fp, JSON.stringify(j, null, 1), 'utf8');
}
console.log(`\n写回完成。${warned} 个成员两来源不一致，需人工核对 params。`);
