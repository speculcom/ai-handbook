#!/usr/bin/env node
/**
 * validate.mjs —— ai-glossary（学 AI 站内容仓）的必填字段与不变量校验器
 *
 * ## 为什么现在才有
 * `terms/INDEX.md` 里一直写着「改完跑 `node scripts/build.mjs` 重新构建，
 * 再跑 `node scripts/validate.mjs` 校验」—— **但那个脚本从来没被创建过**。
 * 本文件就是兑现 INDEX.md 里那句承诺（A7.2）。
 *
 * ## 定位
 * **本仓自足**（R3）：只读本仓文件，不依赖 specul 工作区的其他目录。
 *
 * ## 错误 vs 警告
 *   错误 = 结构缺失 / 枚举非法 / 不变量被破坏 → exit 1，拦住提交
 *   警告 = 可疑但不拦（例如 alias 不是数组）
 *
 * ## 有意不在此处校验
 *   · 英文正文质量（`terms.en.json` 的译文好坏）—— 那是翻译评审的事，机器只查**有无**
 *   · 正文内容真伪 —— 人工核验
 *   · refs 链接是否可达 —— 那是 `_audit/refs-check.mjs`（要联网，属于探针组而非本仓校验）
 *
 * 用法：node scripts/validate.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const TERMS = path.join(ROOT, 'terms');

const errors = [];
const warnings = [];

/* ── 封闭枚举（与页面/构建器共用同一套取值）── */
const DOMAINS = ['concept', 'model', 'agent', 'dev', 'infra', 'media', 'data', 'choice'];
const PURPOSE_TAGS = ['learn', 'apply', 'judge', 'guard'];
const LAYERS = ['一', '二', '三', '四', '五', '六'];
const LAYER_OF_LEVEL = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' };
const REQUIRED = ['zh', 'en', 'purpose', 'def', 'why', 'refs', 'domain', 'purposeTag', 'level', 'layer', 'ord'];

const files = fs.readdirSync(TERMS).filter((f) => f.endsWith('.md') && f !== 'INDEX.md').sort();
if (!files.length) { console.error('✗ terms/ 里没有词条 —— 本脚本等于没运行。'); process.exit(2); }

/* ── frontmatter 极简解析（只取本校验需要的形状）── */
function parse(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const raw = m[1];
  const scalars = {};
  for (const mm of raw.matchAll(/^([a-zA-Z_]+):\s*(.*)$/gm)) scalars[mm[1]] = mm[2].trim();
  const inlineArr = (k) => {
    const mm = raw.match(new RegExp(`^${k}:\\s*\\[(.*)\\]\\s*$`, 'm'));
    return mm ? mm[1].split(',').map((s) => s.trim().replace(/^"|"$/g, '')).filter(Boolean) : null;
  };
  const refs = [...raw.matchAll(/^\s+- \[(.*)\]\s*$/gm)].map((mm) => mm[1]);
  return { raw, scalars, inlineArr, refs, body: text.slice(m[0].length) };
}
const unq = (s) => (s == null ? s : s.replace(/^"|"$/g, ''));

const byLayer = {};
const seen = new Set();

for (const f of files) {
  const rel = `terms/${f}`;
  const p = parse(fs.readFileSync(path.join(TERMS, f), 'utf8'));
  if (!p) { errors.push(`${rel} · 缺少 frontmatter`); continue; }

  for (const k of REQUIRED) {
    if (!p.scalars[k] || p.scalars[k] === '') errors.push(`${rel} · 缺必填字段 ${k}`);
  }

  // 枚举
  const domain = unq(p.scalars.domain);
  if (domain && !DOMAINS.includes(domain)) errors.push(`${rel} · domain 枚举非法: ${domain}（允许 ${DOMAINS.join(' / ')}）`);
  const pt = unq(p.scalars.purposeTag);
  if (pt && !PURPOSE_TAGS.includes(pt)) errors.push(`${rel} · purposeTag 枚举非法: ${pt}（允许 ${PURPOSE_TAGS.join(' / ')}）`);
  const layer = unq(p.scalars.layer);
  if (layer && !LAYERS.includes(layer)) errors.push(`${rel} · layer 必须是「${LAYERS.join('')}」之一，现为 ${layer}`);

  // level ↔ layer 一一对应
  const level = Number(p.scalars.level);
  if (!Number.isInteger(level) || level < 1 || level > 6) {
    errors.push(`${rel} · level 必须是 1-6 的整数，现为 ${p.scalars.level}`);
  } else if (layer && LAYER_OF_LEVEL[level] !== layer) {
    errors.push(`${rel} · level=${level} 与 layer=「${layer}」不对应（应为一↔1 … 六↔6）`);
  }

  // ord：**层内**序号，且必须 1..n 连续（页面的学习路径顺序就靠它）
  const ord = Number(p.scalars.ord);
  if (!Number.isInteger(ord) || ord < 1) errors.push(`${rel} · ord 必须是正整数，现为 ${p.scalars.ord}`);
  else if (layer) (byLayer[layer] ||= []).push({ ord, rel });

  // def 必须是行内数组且至少一条
  const def = p.inlineArr('def');
  if (!def || !def.length) errors.push(`${rel} · def 必须是非空的行内数组（def: ["…", "…"]）`);

  // refs：非空，且每条必须是**三段式** ["中文标签", "url", "英文标签"]
  if (!p.refs.length) errors.push(`${rel} · refs 不能为空（A3 要求每个词条都有出处与实例）`);
  p.refs.forEach((line, i) => {
    const parts = line.match(/"(?:[^"\\]|\\.)*"/g) || [];
    if (parts.length !== 3) {
      errors.push(`${rel} · refs 第 ${i + 1} 条不是三段式（现有 ${parts.length} 段）：[${line}]`);
      return;
    }
    const url = parts[1].slice(1, -1);
    if (!/^https?:\/\//.test(url)) errors.push(`${rel} · refs 第 ${i + 1} 条的 url 不是 http(s): ${url}`);
  });

  // alias 可选，但出现时必须是行内数组
  if (p.scalars.alias !== undefined && p.inlineArr('alias') === null) {
    warnings.push(`${rel} · alias 不是行内数组，建议写成 alias: ["a", "b"]`);
  }

  /* 正文骨架（实测 116/116 一致）。
   * ⚠ learn 的词条**不用 `##` 标题** —— 正文是给 GitHub 上直接阅读的人看的固定骨架：
   *     `# 词条名（English）` + `**解决什么问题**：` + def 段落 + `**为什么需要知道**：` + 可选 `**看具体例子**：`
   *   站点页面其实是从 **frontmatter** 渲染的（build.mjs 不读 body），所以正文只做「人读得懂」的检查。
   *   `**看具体例子**` 实测 62/116 缺失（可选项），**不要求**。 */
  if (!/^#\s+\S/m.test(p.body)) errors.push(`${rel} · 正文缺一级标题（骨架要求 # 词条名）`);
  for (const mark of ['**解决什么问题**', '**为什么需要知道**']) {
    if (!p.body.includes(mark)) errors.push(`${rel} · 正文缺骨架标记 ${mark}`);
  }

  seen.add(f.replace(/\.md$/, ''));
}

/* ── ord 层内连续性（强不变量）── */
for (const [layer, arr] of Object.entries(byLayer)) {
  const ords = arr.map((x) => x.ord).sort((a, b) => a - b);
  const dup = ords.filter((v, i) => i > 0 && v === ords[i - 1]);
  if (dup.length) errors.push(`layer「${layer}」· ord 重复: ${[...new Set(dup)].join(', ')}`);
  const max = ords[ords.length - 1];
  if (max !== ords.length) {
    const missing = [];
    for (let i = 1; i <= max; i++) if (!ords.includes(i)) missing.push(i);
    const show = missing.slice(0, 10).join(', ') + (missing.length > 10 ? ` …（共 ${missing.length} 个）` : '');
    errors.push(`layer「${layer}」· ord 必须是 1..${max} 连续，缺 ${show}（页面顺序按它排）`);
  }
}

/* ── 英文文件覆盖（R2：中英同步）── */
const enPath = path.join(ROOT, 'terms.en.json');
if (!fs.existsSync(enPath)) {
  errors.push('缺 terms.en.json —— 英文正文无处可放（违反 R2 中英同步）');
} else {
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const enKeys = Object.keys(en).filter((k) => !k.startsWith('_'));   // `_` 开头是元数据键
  const missing = [...seen].filter((k) => !enKeys.includes(k));
  const stale = enKeys.filter((k) => !seen.has(k));
  if (missing.length) errors.push(`terms.en.json 缺 ${missing.length} 个词条的英文: ${missing.slice(0, 8).join(' ')}`);
  if (stale.length) warnings.push(`terms.en.json 有 ${stale.length} 个已不存在的词条键（陈旧翻译）: ${stale.slice(0, 8).join(' ')}`);
}

/* ══ S24（2026-10-19）· 微型指南 guides/ 扩类校验 ══
 * 与词条同一套 frontmatter 纪律，但字段不同（指南没有 def/why/ord 层内全局序）。
 * kind=myth 是「常见误区」子类型（S25）：用 myth/fact 两段代替 points —— 不另起炉灶。
 * ord 按「站 × kind」分别 1..n 连续（写误区不会挪动 guide 的序号）。 */
const GUIDES = path.join(ROOT, 'guides');
const GUIDE_KINDS = ['guide', 'myth'];
const GUIDE_REQUIRED = { guide: ['zh', 'en', 'kind', 'station', 'ord', 'span', 'lead', 'points', 'refs'], myth: ['zh', 'en', 'kind', 'station', 'ord', 'span', 'lead', 'myth', 'fact', 'refs'] };
const guideFiles = fs.existsSync(GUIDES) ? fs.readdirSync(GUIDES).filter((f) => f.endsWith('.md')).sort() : [];
const guideSeen = new Set();
const guideOrd = {};   // `${station}:${kind}` → [ord…]
if (guideFiles.length) {
  for (const f of guideFiles) {
    const rel = `guides/${f}`;
    const g = parse(fs.readFileSync(path.join(GUIDES, f), 'utf8'));
    if (!g) { errors.push(`${rel} · 缺少 frontmatter`); continue; }
    const kind = unq(g.scalars.kind);
    if (!GUIDE_KINDS.includes(kind)) { errors.push(`${rel} · kind 枚举非法: ${kind}（允许 ${GUIDE_KINDS.join(' / ')}）`); continue; }
    for (const k of GUIDE_REQUIRED[kind]) {
      if (!g.scalars[k] || g.scalars[k] === '') errors.push(`${rel} · 缺必填字段 ${k}（${kind} 类要求）`);
    }
    const station = Number(g.scalars.station);
    if (!Number.isInteger(station) || station < 1 || station > 6) errors.push(`${rel} · station 必须是 1-6 的整数，现为 ${g.scalars.station}`);
    const span = Number(g.scalars.span);
    if (!Number.isInteger(span) || span < 1 || span > 15) errors.push(`${rel} · span 必须是 1-15 的整数（分钟），现为 ${g.scalars.span}`);
    const ord = Number(g.scalars.ord);
    if (!Number.isInteger(ord) || ord < 1) errors.push(`${rel} · ord 必须是正整数，现为 ${g.scalars.ord}`);
    else (guideOrd[`${station}:${kind}`] ||= []).push({ ord, rel });
    const points = kind === 'guide' ? g.inlineArr('points') : null;
    if (kind === 'guide' && (!points || points.length < 3 || points.length > 7)) {
      errors.push(`${rel} · points 必须是 3-7 条的行内数组（现有 ${points ? points.length : 0}）`);
    }
    if (!g.refs.length) errors.push(`${rel} · refs 不能为空（R5：每条论断都要有可核对出处）`);
    g.refs.forEach((line, i) => {
      const parts = line.match(/"(?:[^"\\]|\\.)*"/g) || [];
      if (parts.length !== 3) { errors.push(`${rel} · refs 第 ${i + 1} 条不是三段式（现有 ${parts.length} 段）：[${line}]`); return; }
      const url = parts[1].slice(1, -1);
      if (!/^https?:\/\//.test(url)) errors.push(`${rel} · refs 第 ${i + 1} 条的 url 不是 http(s): ${url}`);
    });
    // terms 互链（可选，但出现时必须是行内数组，且每个 slug 必须真实存在）
    const linked = g.inlineArr('terms');
    if (g.scalars.terms !== undefined && linked === null) warnings.push(`${rel} · terms 不是行内数组，建议写成 terms: ["a", "b"]`);
    if (linked) for (const s of linked) if (!seen.has(s)) errors.push(`${rel} · terms 互链「${s}」不是任何词条的 slug（会链到不存在的页面）`);
    if (!/^#\s+\S/m.test(g.body)) errors.push(`${rel} · 正文缺一级标题`);
    guideSeen.add(f.replace(/\.md$/, ''));
  }
  for (const [key, arr] of Object.entries(guideOrd)) {
    const ords = arr.map((x) => x.ord).sort((a, b) => a - b);
    const dup = ords.filter((v, i) => i > 0 && v === ords[i - 1]);
    if (dup.length) errors.push(`guides ${key} · ord 重复: ${[...new Set(dup)].join(', ')}`);
    const max = ords[ords.length - 1];
    if (max !== ords.length) {
      const missing = [];
      for (let i = 1; i <= max; i++) if (!ords.includes(i)) missing.push(i);
      errors.push(`guides ${key} · ord 必须是 1..${max} 连续，缺 ${missing.join(', ')}`);
    }
  }
  /* 英文覆盖（R2）：guides.en.json 与 guides/*.md 一一对应 */
  const genPath = path.join(ROOT, 'guides.en.json');
  if (!fs.existsSync(genPath)) {
    errors.push('缺 guides.en.json —— 指南的英文正文无处可放（违反 R2 中英同步）');
  } else {
    const gen = JSON.parse(fs.readFileSync(genPath, 'utf8'));
    const genKeys = Object.keys(gen).filter((k) => !k.startsWith('_'));
    const missing = [...guideSeen].filter((k) => !genKeys.includes(k));
    const stale = genKeys.filter((k) => !guideSeen.has(k));
    if (missing.length) errors.push(`guides.en.json 缺 ${missing.length} 篇指南的英文: ${missing.slice(0, 8).join(' ')}`);
    if (stale.length) warnings.push(`guides.en.json 有 ${stale.length} 个已不存在的指南键（陈旧翻译）: ${stale.slice(0, 8).join(' ')}`);
    for (const k of genKeys) {
      if (!guideSeen.has(k)) continue;
      const v = gen[k];
      if (!v || !v.lead) errors.push(`guides.en.json · 「${k}」缺英文 lead`);
    }
  }
}

/* ── 输出 ── */
const total = files.length;
const layerStat = LAYERS.map((l) => `${l} ${(byLayer[l] || []).length}`).join(' · ');
console.log(`\n词条 ${total} · 分层 ${layerStat}` + (guideFiles.length ? ` · 指南 ${guideFiles.length} 篇` : ''));
if (errors.length) { console.log(`\n错误 ${errors.length} 项：`); errors.forEach((e) => console.log('  ✗ ' + e)); }
if (warnings.length) { console.log(`\n警告 ${warnings.length} 项：`); warnings.forEach((w) => console.log('  ! ' + w)); }
console.log(`\n错误: ${errors.length}  警告: ${warnings.length}`);
console.log(errors.length ? '结果: ❌ 未通过\n' : '结果: ✅ 通过\n');
process.exit(errors.length ? 1 : 0);
