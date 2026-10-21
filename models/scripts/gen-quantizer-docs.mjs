// 从实测数据为每个量化者生成档案底稿。
//
// 为什么需要：站上有 41 个量化者，手写档案只覆盖 8 个。缺档案的卡当前会
// 复用 official.md（内容张冠李戴——说 ggml-org 的事，却挂在个人玩家名下）。
//
// 原则：**客观特征全部来自实测，人物判断单独标注**。
//   实测可得：覆盖的模型与档位范围、是否用 imatrix、命名风格、体积取舍、更新节奏、下载量
//   实测不可得：质量高低、速度快慢（本站不跑 benchmark，所以不写）
//
// 产物：data/quantizers/<name>.md —— 已有手写档案的**不覆盖**（人工稿优先）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SERIES_DIR = path.join(ROOT, 'data', 'series');
const OUT_DIR = path.join(ROOT, 'data', 'quantizers');
fs.mkdirSync(OUT_DIR, { recursive: true });

const fmtNum = (n) => {
  if (!n && n !== 0) return '—';
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e3 ? 0 : 1) + 'k';
  return String(n);
};
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

// ── 汇总每个量化者的实测特征 ────────────────────────────────────────────
const P = new Map();
for (const f of fs.readdirSync(SERIES_DIR).filter((x) => x.endsWith('.json'))) {
  const j = JSON.parse(fs.readFileSync(path.join(SERIES_DIR, f), 'utf8'));
  for (const m of j.members) {
    for (const v of m.variants) {
      const q = v.quantizer;
      if (!P.has(q)) {
        P.set(q, {
          name: q, repos: [], variants: [], imatrix: 0, coverage: 0,
          quants: new Set(), udCount: 0, files: 0, dl: 0, likes: 0,
          baseRepo: m.repo, lastMods: [], official: false,
        });
      }
      const p = P.get(q);
      p.repos.push({ series: j.name.zh, base: m.repo, url: v.url, dl: v.downloads || 0 });
      p.variants.push(v);
      p.files += v.coverage;
      p.dl += v.downloads || 0;
      p.likes += v.likes || 0;
      if (v.imatrix) p.imatrix++;
      p.coverage++;
      for (const gf of v.files) {
        p.quants.add(gf.quant);
        if (gf.quant.startsWith('UD-')) p.udCount++;
      }
      if (v.isOfficial) p.official = true;
      if (v.lastModified) p.lastMods.push(v.lastModified);
    }
  }
}

// ── 命名风格判定（实测得出，不猜）─────────────────────────────────────
function styleOf(p) {
  const q = [...p.quants];
  const hasUD = p.udCount > 0;
  const hasLegacy = q.some((x) => /_L$/.test(x));
  const hasIQ = q.some((x) => /^IQ/.test(x));
  const hasK = q.some((x) => /^Q\d_K/.test(x));
  const hasPlain = q.some((x) => /^Q\d_0$/.test(x));
  const bits = [];
  if (hasUD) bits.push('提供 `UD-` 动态量化（用重要性矩阵动态调整缩放，体积略大但质量通常更稳）');
  if (hasK) bits.push('主推 k-quant 系列（`Q4_K_M` 一类）');
  if (hasIQ) bits.push('主推 i-quant 系列（`IQ4_XS` 一类）');
  if (hasLegacy) bits.push('含 legacy 布局变体（`_L` 后缀，权重排布与新版不同）');
  if (hasPlain) bits.push('含 `Q4_0` 一类旧式非 k-quant 档');
  if (!bits.length) bits.push('档位命名以标准 Q/IQ 档为主');
  return bits;
}

// ── 体积取舍（实测：同档位下与同系列其他量化者的体积差）────────────────
function sizeTendencyOf(p) {
  if (p.coverage < 2) return null;
  // 取该量化者覆盖最多的档位中位 bpw，与全站同档中位比
  const allByQuant = new Map();
  for (const fp of fs.readdirSync(SERIES_DIR).filter((x) => x.endsWith('.json'))) {
    const j = JSON.parse(fs.readFileSync(path.join(SERIES_DIR, fp), 'utf8'));
    for (const m of j.members) for (const v of m.variants) for (const gf of v.files) {
      if (!gf.bitsPerWeight) continue;
      if (!allByQuant.has(gf.quant)) allByQuant.set(gf.quant, []);
      allByQuant.get(gf.quant).push(gf.bitsPerWeight);
    }
  }
  const common = [...p.quants].filter((x) => (allByQuant.get(x) || []).length >= 8);
  if (!common.length) return null;
  const devs = common.map((x) => {
    const mine = [];
    for (const v of p.variants) for (const gf of v.files) if (gf.quant === x && gf.bitsPerWeight) mine.push(gf.bitsPerWeight);
    if (!mine.length) return null;
    const all = allByQuant.get(x).slice().sort((a, b) => a - b);
    const allMed = all[Math.floor(all.length / 2)];
    const myMed = mine.sort((a, b) => a - b)[Math.floor(mine.length / 2)];
    return { x, d: ((myMed - allMed) / allMed) * 100 };
  }).filter(Boolean);
  if (!devs.length) return null;
  const avg = devs.reduce((s, d) => s + d.d, 0) / devs.length;
  if (avg > 4) return `同一档位下体积比全站中位**高约 ${Math.round(avg)}%**——换来的是质量优先，选它等于多花显存换稳定`;
  if (avg < -4) return `同一档位下体积比全站中位**低约 ${Math.round(-avg)}%**——适合显存吃紧的场景`;
  return '同一档位下体积与全站中位基本一致，没有明显的「胖瘦」取向';
}

// ── 更新节奏（实测）────────────────────────────────────────────────────
function cadenceOf(p) {
  if (!p.lastMods.length) return null;
  const sorted = p.lastMods.slice().sort();
  const latest = sorted[sorted.length - 1];
  const days = Math.round((Date.now() - Date.parse(latest)) / 86400000);
  const span = Math.round((Date.parse(latest) - Date.parse(sorted[0])) / 86400000);
  if (days <= 60 && p.coverage >= 3) return `最近一次更新在 ${days} 天前，${p.coverage} 个仓分散在 ${span} 天内——**跟进节奏正常**`;
  if (days <= 180) return `最近一次更新在 ${days} 天前——属于跟得上但不快`;
  return `最近一次更新在 ${days} 天前（${Math.round(days / 30)} 个月）——**基础模型升版后可能不同步**，只适合追旧版本`;
}

// ── 生成 ───────────────────────────────────────────────────────────────
let made = 0, kept = 0;
for (const p of P.values()) {
  const file = path.join(OUT_DIR, `${p.name}.md`);
  if (fs.existsSync(file)) { kept++; continue; }

  const modelList = [...new Set(p.repos.map((r) => r.series))].join('、');
  const latest = p.lastMods.slice().sort().pop();
  const tq = p.quants.size;
  const imaxRate = pct(p.imatrix, p.coverage);

  const lines = [];
  lines.push(`# ${p.name}`);
  lines.push('');
  lines.push('> ⚠ **本档案由实测数据自动生成**（`scripts/gen-quantizer-docs.mjs`），');
  lines.push('> 内容只描述可从 Hugging Face 公开数据算出的客观特征，不含质量或速度评价。');
  lines.push('');
  lines.push('## 实测特征');
  lines.push('');
  lines.push(`- **覆盖范围**：${p.coverage} 个量化仓 / ${modelList}，共 ${tq} 个不同档位、${p.files} 个 GGUF 文件`);
  lines.push(`- **下载量**：合计 ${fmtNum(p.dl)} 次，点赞 ${fmtNum(p.likes)}`);
  lines.push(`- **imatrix 使用**：${p.imatrix}/${p.coverage} 个仓带重要性矩阵（${imaxRate}%）`);
  lines.push(`- **最近更新**：${(latest || '').slice(0, 10)}`);

  const cad = cadenceOf(p);
  if (cad) lines.push(`- **跟进节奏**：${cad}`);

  const sz = sizeTendencyOf(p);
  if (sz) lines.push(`- **体积取向**：${sz}`);

  lines.push('');
  lines.push('## 档位与命名风格');
  lines.push('');
  for (const b of styleOf(p)) lines.push(`- ${b}`);
  lines.push('');
  lines.push('覆盖的档位：' + [...p.quants].sort().map((q) => `\`${q}\``).join(' '));
  lines.push('');

  lines.push('## 什么时候选它 / 什么时候别选');
  lines.push('');
  const pros = [];
  const cons = [];
  if (p.coverage >= 5) pros.push(`在本项目已收录的 ${modelList} 上都有量化，选择空间大`);
  else if (p.coverage >= 2) pros.push(`覆盖了 ${modelList}，其中一部分可选`);
  if (imaxRate >= 80) pros.push('绝大多数仓带 imatrix，量化质量通常比纯 RTN 稳');
  else if (imaxRate > 0) pros.push(`有 ${p.imatrix} 个仓带 imatrix，可挑带 imatrix 的版本`);
  if (p.udCount > 0) pros.push('提供 `UD-` 动态量化，质量优先时可选');
  if (p.dl >= 5e5) pros.push(`下载量 ${fmtNum(p.dl)}，是本项目里被实际用得最多的那一批`);

  if (p.coverage <= 1) cons.push('只覆盖 1 个模型，**换模型就得换人**，没有可比对象');
  if (imaxRate === 0) cons.push('所有仓都不带 imatrix，量化质量缺少重要性矩阵校准');
  if (p.udCount === 0 && p.coverage >= 2) cons.push('没有 `UD-` 动态量化，想在同档位再压质量只能换人');
  const c2 = cadenceOf(p);
  if (c2 && c2.includes('不同步')) cons.push('更新节奏慢，基础模型升版后可能长时间缺档');
  if (tq <= 4) cons.push(`只有 ${tq} 个档位，档位选择空间小`);

  if (pros.length) { lines.push('**适合：**'); pros.forEach((x) => lines.push(`- ${x}`)); lines.push(''); }
  if (cons.length) { lines.push('**不适合：**'); cons.forEach((x) => lines.push(`- ${x}`)); lines.push(''); }
  if (!pros.length && !cons.length) lines.push('样本不足，暂不给出选择建议。\n');

  lines.push('## 官方发布页');
  lines.push('');
  const first = p.repos[0];
  lines.push(`- 用户主页：<https://huggingface.co/${p.name}>`);
  if (first) lines.push(`- 本站收录的发布页：${p.repos.map((r) => `<${r.url}>`).join(' · ')}`);
  lines.push('');

  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  made++;
  console.log(`  新建 ${p.name}.md  (${p.coverage} 仓 / ${tq} 档 / imatrix ${imaxRate}%)`);
}

console.log(`\n═══ 完成 ═══\n新建 ${made} 份 | 保留手写 ${kept} 份 | 共 ${P.size} 个量化者`);
