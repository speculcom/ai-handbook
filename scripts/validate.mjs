#!/usr/bin/env node
/**
 * validate.mjs —— ai-quantized-llm（本地模型站内容仓）的 schema 与中英一致性校验器
 *
 * ## 与 `audit-licenses.mjs` 的分工（不要重复造）
 *   `audit-licenses.mjs` 管**法律硬约束**（每条变体必须能追到许可、不得托管权重）—— 建站前强制。
 *   本文件管**结构与我方口径**：config.js 字段齐不齐、枚举对不对、采集产物与名单是否对齐、
 *   三个翻译文件覆盖不覆盖（R2）。
 *   两者互补，都要跑。
 *
 * ## 本仓自足（R3）
 * 只读本仓：`config.js` · `data/series/*.json` · `data/quantizers/*.md` · `enums/summaries/member-notes.en.json`。
 *
 * ## 错误 vs 警告
 *   错误 = 会让页面出错或口径不一致（缺字段 / 枚举非法 / 产物与名单不对齐 / 缺翻译）
 *   警告 = 覆盖度问题（某量化者没有专属档案）——不拦提交，但要看得见
 *
 * 用法：node scripts/validate.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));

const errors = [];
const warnings = [];

const { SERIES, PRIMARY_QUANTIZERS, SECONDARY_QUANTIZERS } = await import(pathToFileURL(path.join(ROOT, 'config.js')).href);
const enums = JSON.parse(read('enums.en.json'));
const summariesEn = JSON.parse(read('summaries.en.json'));
const memberNotesEn = JSON.parse(read('member-notes.en.json'));

const POSITIONS = Object.keys(enums.positions);
const seriesByCode = new Map();
const memberPairs = [];   // `<code>|<repo名>`

/* ── 1. config.js 的 SERIES ── */
for (const s of SERIES) {
  const where = `config.js/${s.code || '(缺 code)'}`;
  if (!s.code) { errors.push(`${where} · 缺 code`); continue; }
  if (seriesByCode.has(s.code)) errors.push(`${where} · code 重复`);
  seriesByCode.set(s.code, s);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.code)) errors.push(`${where} · code 必须是 slug（小写+连字符）`);
  for (const k of ['family', 'released', 'summary']) if (!s[k]) errors.push(`${where} · 缺字段 ${k}`);
  for (const k of ['zh', 'en']) {
    if (!s.name?.[k]) errors.push(`${where} · 缺 name.${k}`);
    if (!s.vendor?.[k]) errors.push(`${where} · 缺 vendor.${k}`);
  }
  if (s.released && !/^\d{4}-\d{2}(-\d{2})?$/.test(s.released)) errors.push(`${where} · released 格式应为 YYYY-MM 或 YYYY-MM-DD`);
  if (!/^https:\/\//.test(s.sources?.official || '')) errors.push(`${where} · sources.official 必须是 https 地址`);

  // positions 是**封闭枚举**（enums.en.json 的键）—— 新值必须同时进词表，否则英文态露中文
  if (!Array.isArray(s.positions) || !s.positions.length) errors.push(`${where} · positions 必须是非空数组`);
  else for (const p of s.positions) {
    if (!POSITIONS.includes(p)) errors.push(`${where} · positions 含词表外的值「${p}」（封闭枚举，需先加进 enums.en.json）`);
  }
  // 去重（同一标签写两遍会渲染成两个 li）
  if (Array.isArray(s.positions) && new Set(s.positions).size !== s.positions.length) {
    warnings.push(`${where} · positions 有重复项`);
  }

  if (!Array.isArray(s.members) || !s.members.length) { errors.push(`${where} · members 必须是非空数组`); continue; }
  for (const m of s.members) {
    const mw = `${where}/${m.repo || '(缺 repo)'}`;
    if (!m.repo) { errors.push(`${mw} · 缺 repo`); continue; }
    if (!/^[\w.-]+\/[\w.-]+$/.test(m.repo)) errors.push(`${mw} · repo 必须是 owner/name 形式`);
    for (const k of ['params']) if (!m[k]) errors.push(`${mw} · 缺字段 ${k}`);
    for (const k of ['zh', 'en']) {
      if (!m.label?.[k]) errors.push(`${mw} · 缺 label.${k}`);
      if (!m.role?.[k]) errors.push(`${mw} · 缺 role.${k}`);
    }
    if (!m.note) errors.push(`${mw} · 缺 note（页面上的成员备注）`);
    memberPairs.push({ code: s.code, repo: m.repo.split('/')[1], pair: `${s.code}|${m.repo.split('/')[1]}` });
  }
}

/* ── 2. 采集产物与名单对齐 ── */
const dir = path.join(ROOT, 'data', 'series');
const dataFiles = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')) : [];
if (!dataFiles.length) errors.push('data/series 里没有采集产物 —— 先跑 collect-models.mjs');

for (const s of SERIES) {
  if (!s.code) continue;
  if (!dataFiles.includes(`${s.code}.json`)) { errors.push(`data/series/${s.code}.json 缺失（名单里有、产物里没有）`); continue; }
  const j = JSON.parse(read(`data/series/${s.code}.json`));
  if (!j.collectedAt) errors.push(`${s.code}.json · 缺 collectedAt（页脚要显示采集时间）`);
  if (j.schemaVersion === undefined) errors.push(`${s.code}.json · 缺 schemaVersion`);
  const got = (j.members || []).map((m) => m.repo);
  const want = s.members.map((m) => m.repo);
  for (const r of want) if (!got.includes(r)) errors.push(`${s.code}.json · 名单里的成员 ${r} 不在产物里`);
  for (const r of got) if (!want.includes(r)) warnings.push(`${s.code}.json · 产物里有名单外的成员 ${r}`);

  for (const m of j.members || []) {
    if (!(m.variants || []).length) warnings.push(`${s.code}.json · ${m.repo} 没有任何量化变体`);
    for (const v of m.variants || []) {
      const vw = `${s.code}/${m.repo.split('/')[1]}`;
      if (!v.quantizer) errors.push(`${vw} · 有变体缺 quantizer`);
      if (!/^https:\/\//.test(v.url || '')) errors.push(`${vw} · 变体 ${v.repo || '?'} 的 url 不是 https`);
      if (!v.license) warnings.push(`${vw} · 变体 ${v.repo || '?'} 缺 license（跑 backfill-license.mjs 回填）`);
    }
  }
}
const codes = new Set(SERIES.map((s) => s.code));
for (const f of dataFiles) {
  const code = f.replace(/\.json$/, '');
  if (!codes.has(code)) warnings.push(`data/series/${f} 不在 config.js 名单里（孤儿产物）`);
}

/* ── 3. 中英同步（R2）：三个翻译文件必须覆盖 ── */
for (const s of SERIES) {
  if (s.code && !(s.code in summariesEn)) errors.push(`summaries.en.json 缺系列「${s.code}」的英文`);
}
for (const { code, pair } of memberPairs) {
  if (!(pair in memberNotesEn)) errors.push(`member-notes.en.json 缺成员「${pair}」的英文备注（键=code|repo 名）`);
}
for (const p of POSITIONS) {
  if (!enums.positions[p]) errors.push(`enums.en.json 的 positions.${p} 英文为空`);
}

/* ── 4. 量化者档案覆盖（警告级：是覆盖度，不是硬约束）── */
const used = new Set();
const firstPartyOwners = new Set(SERIES.flatMap((s) => (s.members || []).map((m) => m.repo.split('/')[0])));
for (const f of dataFiles) {
  const j = JSON.parse(read(`data/series/${f}`));
  for (const m of j.members || []) for (const v of m.variants || []) if (v.quantizer) used.add(v.quantizer);
}
const docDir = path.join(ROOT, 'data', 'quantizers');
const docs = fs.existsSync(docDir) ? fs.readdirSync(docDir).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)) : [];
const noDoc = [...used].filter((q) => !docs.includes(q));
const primaryNoDoc = noDoc.filter((q) => PRIMARY_QUANTIZERS.has(q));
if (primaryNoDoc.length) warnings.push(`主力量化者缺专属档案 ${primaryNoDoc.length} 位: ${primaryNoDoc.join(', ')}`);

/* ── 5. 家族谱系卡（v7 S51 · data/families/*.json）──
 * 家族卡是「谱系视角」：出品方 / 代次 / 尺寸档 / 许可 / 官方能力声明带出处 / 定位。
 * 与 series（量化视角）平行、互链——卡上的 onSite.series 必须指向真实在册系列，
 * 否则页面会出现死链；没有收录的家族（llama / mistral）写空数组 + honest note。 */
const famSeen = new Set();
{
  const famDir = path.join(ROOT, 'data', 'families');
  const famFiles = fs.existsSync(famDir) ? fs.readdirSync(famDir).filter((f) => f.endsWith('.json')) : [];
  if (!famFiles.length) warnings.push('data/families 为空（v7 S51：家族谱系卡尚未灌内容）');
  for (const f of famFiles) {
    const tag = `families/${f}`;
    const j = JSON.parse(read(`data/families/${f}`));
    const base = f.replace(/\.json$/, '');
    if (j.code !== base) errors.push(`${tag} · 文件名(${base}) != code(${j.code})`);
    if (famSeen.has(j.code)) errors.push(`${tag} · code 重复`);
    famSeen.add(j.code);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(j.code || '')) errors.push(`${tag} · code 必须是 slug（小写+连字符）`);
    for (const k of ['name', 'vendor', 'currentGen', 'positioning']) {
      for (const l of ['zh', 'en']) if (!j[k]?.[l]) errors.push(`${tag} · 缺 ${k}.${l}（R2 中英同步）`);
    }
    if (!j.currentGenDate || !/^\d{4}-\d{2}$/.test(j.currentGenDate)) errors.push(`${tag} · currentGenDate 应为 YYYY-MM`);
    if (!Array.isArray(j.generations) || !j.generations.length) errors.push(`${tag} · generations 必须是非空数组（代次）`);
    else for (const [i, g] of j.generations.entries()) {
      const gw = `${tag}/generations[${i}]`;
      for (const l of ['zh', 'en']) if (!g[l]) errors.push(`${gw} · 缺 ${l}（R2）`);
      if (!g.gen || !g.date) errors.push(`${gw} · 缺 gen 或 date`);
      if (g.url && !/^https:\/\//.test(g.url)) errors.push(`${gw} · url 必须是 https`);
    }
    if (!Array.isArray(j.sizeTiers) || !j.sizeTiers.length) errors.push(`${tag} · sizeTiers 必须是非空数组（尺寸档）`);
    else for (const [i, t] of j.sizeTiers.entries()) {
      for (const l of ['zh', 'en']) if (!t[l]) errors.push(`${tag} · sizeTiers[${i}] 缺 ${l}（R2）`);
    }
    if (!Array.isArray(j.licenses) || !j.licenses.length) errors.push(`${tag} · licenses 必须是非空数组`);
    else for (const [i, L2] of j.licenses.entries()) {
      if (!L2.id) errors.push(`${tag} · licenses[${i}] 缺 id`);
      for (const l of ['zh', 'en']) if (!L2[l]) errors.push(`${tag} · licenses[${i}] 缺 ${l}（R2）`);
      if (L2.url && !/^https:\/\//.test(L2.url)) errors.push(`${tag} · licenses[${i}] 的 url 必须是 https`);
    }
    if (!Array.isArray(j.claims) || !j.claims.length) errors.push(`${tag} · claims 必须是非空数组（官方能力声明带出处）`);
    else for (const [i, c] of j.claims.entries()) {
      const cw = `${tag}/claims[${i}]`;
      for (const l of ['zh', 'en']) if (!c[l]) errors.push(`${cw} 缺 ${l}（R2）`);
      if (!/^https:\/\//.test(c.url || '')) errors.push(`${cw} · url 必须是 https（R5：声明挂官方出处）`);
    }
    /* onSite.series 必须指向 config.js 在册系列（防页面死链）；
     * 空数组 + 已写 note 是合法终态（未过量化门槛的家族）。 */
    const on = j.onSite || {};
    if (on.series && !Array.isArray(on.series)) errors.push(`${tag} · onSite.series 必须是数组`);
    for (const sc of on.series || []) {
      if (!codes.has(sc)) errors.push(`${tag} · onSite.series 指向不在册的系列「${sc}」（页面会出死链）`);
    }
    if (!(on.series || []).length && !on.zh) errors.push(`${tag} · 未收录本站系列时必须写 onSite.zh 说明原因（诚实口径）`);
    /* S53 派生标记（A6.5 base_model 口径）：可选字段，出现就必须完整。
     * 派生不是贬义——KAT 官方自己声明 base_model；标记的价值是把
     * 「权重谱系从哪来」写清楚。缺 url 出处的派生声明 = 无出处断言（R5）。 */
    if (j.derived) {
      const d = j.derived;
      if (!d.base) errors.push(`${tag} · derived 缺 base（基座名）`);
      for (const l of ['zh', 'en']) if (!d[l]) errors.push(`${tag} · derived 缺 ${l}（R2）`);
      if (!/^https:\/\//.test(d.url || '')) errors.push(`${tag} · derived.url 必须是 https（派生声明挂官方出处）`);
    }
    const srcs = j.sources || [];
    if (!srcs.length) errors.push(`${tag} · sources 为空（R5）`);
    for (const [i, s] of srcs.entries()) {
      if (!/^https:\/\//.test(s.url || '')) errors.push(`${tag} · sources[${i}] 的 url 必须是 https`);
      if (!s.label) errors.push(`${tag} · sources[${i}] 缺 label`);
    }
    if (!j.last_verified) errors.push(`${tag} · 缺 last_verified（核验快照语义）`);
    if (!['verified', 'partial', 'stale'].includes(j.confidence)) errors.push(`${tag} · confidence 越枚举: ${j.confidence}`);
  }
  const famCodes = new Set([...famSeen]);
  for (const f of famFiles) {
    const j = JSON.parse(read(`data/families/${f}`));
    for (const sc of (j.onSite || {}).series || []) {
      /* ⚠ 家族 code 与系列 code 可能同名（gpt-oss / laguna 家族 = 系列）。
       * 守卫的初衷是防「onSite.series 误指家族卡造成死链」——
       * 渲染层按 seriesList 解析，只要 sc 在册系列里就不是死链，不报。 */
      if (famCodes.has(sc) && !codes.has(sc)) errors.push(`families/${f} · onSite.series 指向另一个家族卡「${sc}」（应是系列 code）`);
    }
  }
}

/* ── 6. 中文生态透镜（v7 S52 · series/families 的 cn 块）──
 * 「国产 / 国内可直接用 / 备案状态」是 models 与 tools 两栏共用的透镜字段（总纲 §1.7 缺口 #2）。
 * 纪律：
 *   - 每个系列与家族都必须有 cn（透镜是全站口径，不是可选项）；
 *   - origin / direct / filing.status 是封闭枚举，未知就说 unknown；
 *   - filing.status=filed 必须带 name + no（备案编号原样抄公示）+ date；
 *   - filing.status=not-filed 必须带 note 说明检索过程（「本站查过没查到」要可证）；
 *   - cn.sources ≥1 且 https（备案以官方公示为准，镜像/直连以实测出处为准）；
 *   - last_verified 必填（备案名单按批次滚动更新，快照日期就是有效期）。 */
const CN_ORIGIN = ['domestic', 'foreign'];
const CN_DIRECT = ['yes', 'no', 'unknown'];
const CN_FILING = ['filed', 'not-filed', 'unknown'];
function checkCn(j, tag) {
  const c = j.cn;
  if (!c) { errors.push(`${tag} · 缺 cn 块（v7 S52：中文生态透镜是必填字段）`); return; }
  if (!CN_ORIGIN.includes(c.origin)) errors.push(`${tag} · cn.origin 越枚举: ${c.origin}（应为 ${CN_ORIGIN.join('/')}）`);
  if (!CN_DIRECT.includes(c.direct)) errors.push(`${tag} · cn.direct 越枚举: ${c.direct}（应为 ${CN_DIRECT.join('/')}）`);
  for (const l of ['originNote', 'directNote']) if (!c[l]) errors.push(`${tag} · cn.${l} 为空（判断要给出依据）`);
  const f = c.filing;
  if (!f || !CN_FILING.includes(f.status)) errors.push(`${tag} · cn.filing.status 越枚举: ${f && f.status}`);
  else if (f.status === 'filed') {
    if (!f.name) errors.push(`${tag} · cn.filing 已备案但缺 name（公示名单里的模型名称）`);
    if (!f.no) errors.push(`${tag} · cn.filing 已备案但缺 no（备案编号原样抄公示）`);
    if (!f.date || !/^\d{4}-\d{2}(-\d{2})?$/.test(f.date)) errors.push(`${tag} · cn.filing.date 应为 YYYY-MM 或 YYYY-MM-DD`);
  } else if (f.status === 'not-filed' && !f.note) {
    errors.push(`${tag} · cn.filing 未备案必须写 note 说明检索口径（「本站查过没查到」要可证）`);
  }
  const srcs = c.sources || [];
  if (!srcs.length) errors.push(`${tag} · cn.sources 为空（R5：备案以官方公示为准、镜像/直连以实测出处为准）`);
  for (const [i, s] of srcs.entries()) {
    if (!/^https:\/\//.test(s.url || '')) errors.push(`${tag} · cn.sources[${i}] 的 url 必须是 https`);
    if (!s.label) errors.push(`${tag} · cn.sources[${i}] 缺 label`);
  }
  if (!c.last_verified) errors.push(`${tag} · cn.last_verified 缺（备案名单按批次滚动，快照日期即有效期）`);
}
for (const f of dataFiles) checkCn(JSON.parse(read(`data/series/${f}`)), `series/${f}`);
for (const f of (fs.existsSync(path.join(ROOT, 'data', 'families')) ? fs.readdirSync(path.join(ROOT, 'data', 'families')).filter((x) => x.endsWith('.json')) : [])) {
  checkCn(JSON.parse(read(`data/families/${f}`)), `families/${f}`);
}

/* ── 7. 闭源谱系卡（v7 S54 · data/closed/*.json）──
 * 闭源事实月月腐烂（R7），所以这一节比 families 多两件事：
 *   1) 每条事实必须挂官方出处（facts[].url https）——没有权重仓可查，出处就是全部；
 *   2) stale 机制：review_interval_days + last_verified 算出「复核到期日」，
 *      过期不是数据错误而是**必须可见的状态**——validate 发警告点名，
 *      构建器必须在页面上渲染过期横幅（models-check 探针验渲染兑现）。
 * D9：本类数据不存价格数字（出现 price/cost 字段直接硬失败）。 */
const closedSeen = new Set();
{
  const dir = path.join(ROOT, 'data', 'closed');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')) : [];
  for (const f of files) {
    const tag = `closed/${f}`;
    const j = JSON.parse(read(`data/closed/${f}`));
    const base = f.replace(/\.json$/, '');
    if (j.code !== base) errors.push(`${tag} · 文件名(${base}) != code(${j.code})`);
    if (closedSeen.has(j.code)) errors.push(`${tag} · code 重复`);
    closedSeen.add(j.code);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(j.code || '')) errors.push(`${tag} · code 必须是 slug`);
    for (const k of ['name', 'vendor', 'access', 'currentGen', 'positioning']) {
      for (const l of ['zh', 'en']) if (!j[k]?.[l]) errors.push(`${tag} · 缺 ${k}.${l}（R2 中英同步）`);
    }
    if (!j.currentGenDate || !/^\d{4}-\d{2}$/.test(j.currentGenDate)) errors.push(`${tag} · currentGenDate 应为 YYYY-MM`);
    if (!Number.isInteger(j.review_interval_days) || j.review_interval_days < 7) errors.push(`${tag} · review_interval_days 应为 ≥7 的整数（闭源复核周期，S54 stale 机制）`);
    if (!Array.isArray(j.generations) || !j.generations.length) errors.push(`${tag} · generations 必须非空`);
    else for (const [i, g] of j.generations.entries()) {
      for (const l of ['zh', 'en']) if (!g[l]) errors.push(`${tag}/generations[${i}] 缺 ${l}（R2）`);
      if (!g.gen || !g.date) errors.push(`${tag}/generations[${i}] 缺 gen 或 date`);
      if (g.url && !/^https:\/\//.test(g.url)) errors.push(`${tag}/generations[${i}] url 必须 https`);
    }
    if (!Array.isArray(j.facts) || !j.facts.length) errors.push(`${tag} · facts 必须非空（闭源卡的事实对照）`);
    else for (const [i, fa] of j.facts.entries()) {
      for (const kk of ['k', 'v']) for (const l of ['zh', 'en']) if (!fa[kk]?.[l]) errors.push(`${tag}/facts[${i}] 缺 ${kk}.${l}（R2）`);
      if (!/^https:\/\//.test(fa.url || '')) errors.push(`${tag}/facts[${i}] url 必须 https（R5：闭源事实挂官方出处）`);
    }
    const srcs = j.sources || [];
    if (!srcs.length) errors.push(`${tag} · sources 为空（R5）`);
    for (const [i, s] of srcs.entries()) {
      if (!/^https:\/\//.test(s.url || '')) errors.push(`${tag} · sources[${i}] url 必须 https`);
      if (!s.label) errors.push(`${tag} · sources[${i}] 缺 label`);
    }
    if (!j.last_verified || !/^\d{4}-\d{2}-\d{2}$/.test(j.last_verified)) errors.push(`${tag} · last_verified 应为 YYYY-MM-DD（核验快照）`);
    if (!['verified', 'partial', 'stale'].includes(j.confidence)) errors.push(`${tag} · confidence 越枚举: ${j.confidence}`);
    if (!j.onSite?.zh || !j.onSite?.en) errors.push(`${tag} · onSite.zh/en 必填（与开放权重侧/工具站的分工说明，防读者混线）`);
    /* D9 反向守卫：闭源卡最容易顺手写价格。拦两样——
     * ① 价格类**字段名**（key 叫 price/cost/pricing 之类，出现即硬失败）；
     * ② 值里的**价格数字模式**（¥3.5、$5、6元/百万、USD 10、10美元 等）。
     * ⚠ 不拦「price/cost/monthly」这类单词——「prices may change」「monthly churn」
     *   是定性口径，D9 本来就允许；只有数字才是 D9 要拦的。 */
    const d9KeyHits = [];
    (function walk(o, path) {
      if (o == null) return;
      if (Array.isArray(o)) { o.forEach((v, i) => walk(v, `${path}[${i}]`)); return; }
      if (typeof o === 'object') {
        for (const [k, v] of Object.entries(o)) {
          if (/^(price|cost|pricing|fee|rate|monthly|per_[a-z_]*(token|call|request))$/i.test(k)) d9KeyHits.push(`${path}.${k}`);
          walk(v, `${path}.${k}`);
        }
      }
    })(j, '');
    if (d9KeyHits.length) errors.push(`${tag} · 出现价格类字段名（D9：闭源卡不采价格，只放官方定价页链接）: ${d9KeyHits.join(', ')}`);
    const d9NumHits = [];
    const d9NumRe = /[¥￥]\s*\d|\$\s*\d|\d+(?:\.\d+)?\s*(?:元|美元|USD|CNY|RMB)|(?:USD|CNY|RMB)\s*\d/i;
    (function walkVals(o, path) {
      if (o == null) return;
      if (typeof o === 'string') { if (d9NumRe.test(o)) d9NumHits.push(path); return; }
      if (Array.isArray(o)) { o.forEach((v, i) => walkVals(v, `${path}[${i}]`)); return; }
      if (typeof o === 'object') for (const [k, v] of Object.entries(o)) walkVals(v, `${path}.${k}`);
    })(j, '');
    if (d9NumHits.length) errors.push(`${tag} · 值里出现价格数字（D9：不采价格数字，只放官方定价页链接）: ${d9NumHits.join(', ')}`);
    checkCn(j, tag);
    /* stale 计算：到期不是错误，是状态——警告点名，渲染层必须兑现横幅 */
    if (j.last_verified && Number.isInteger(j.review_interval_days)) {
      const due = new Date(j.last_verified); due.setDate(due.getDate() + j.review_interval_days);
      if (due < new Date()) warnings.push(`${tag} · 复核已到期（核验 ${j.last_verified} + ${j.review_interval_days} 天）——页面上必须显示过期横幅，尽快复核`);
    }
  }
}

/* ── 8. 做模型专题（v7 S55 · guides/*.md）──
 * 方法论文章（训练四阶段等），格式对齐 agent 仓 SCHEMA §十（深水指南），
 * 但 models 仓双语纪律更严：titleEn/summaryEn **必填**（R2，不是警告）。
 * 正文纪律（出处挂法、不排名、D9）由 plain-language + refs 人工过 + 本节 sources 校验合起来守。 */
{
  const dir = path.join(ROOT, 'guides');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')) : [];
  if (!files.length) warnings.push('缺 guides/ 目录或为空（S55：做模型专题真相源）');
  const guideSeen = new Set();
  for (const f of files) {
    const tag = `guides/${f}`;
    const raw = read(`guides/${f}`);
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) { errors.push(`${tag} · 缺 frontmatter`); continue; }
    const get = (k) => {
      const m = fm[1].match(new RegExp('^' + k + ':[ \\t]*(\\S.*)$', 'm'));
      return m ? m[1].trim().replace(/^"|"$/g, '') : '';
    };
    const id = get('id');
    const base = f.replace(/\.md$/, '');
    if (!id) errors.push(`${tag} · 缺 id`);
    if (id !== base) errors.push(`${tag} · 文件名(${base}) != id(${id})`);
    if (guideSeen.has(id)) errors.push(`${tag} · id 重复`);
    guideSeen.add(id);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) errors.push(`${tag} · id 必须是 slug`);
    for (const k of ['title', 'titleEn', 'summary', 'summaryEn']) {
      if (!get(k)) errors.push(`${tag} · 缺 ${k}（R2 中英同步：models 仓双语必填）`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(get('last_verified'))) errors.push(`${tag} · last_verified 应为 YYYY-MM-DD`);
    if (get('stage') && !/^[1-9]$/.test(get('stage'))) errors.push(`${tag} · stage（训练管线站序）若写应为 1–9 的整数`);
    if (!['verified', 'partial', 'stale'].includes(get('confidence'))) errors.push(`${tag} · confidence 越枚举: ${get('confidence')}`);
    const srcUrls = [...fm[1].matchAll(/^\s+url:[ \t]*(\S+)/gm)].map((m) => m[1]);
    if (!srcUrls.length) errors.push(`${tag} · sources 为空（R5：关键事实挂官方出处）`);
    for (const u of srcUrls) if (!/^https:\/\//.test(u)) errors.push(`${tag} · sources url 必须 https: ${u}`);
    const srcLabels = [...fm[1].matchAll(/^\s*-?\s*label:[ \t]*(\S.*)$/gm)];
    if (srcLabels.length !== srcUrls.length) errors.push(`${tag} · sources 的 label(${srcLabels.length}) 与 url(${srcUrls.length}) 条数不齐`);
    /* 正文必须有节（## 开头），且双语节标题写法 `## [中|英]` 至少出现一次（R2 渲染层依赖） */
    const body = raw.slice(fm[0].length);
    if (!/^## /m.test(body)) errors.push(`${tag} · 正文没有 ## 节标题`);
    if (!/^## \[.+\|.+\]/m.test(body)) errors.push(`${tag} · 正文没有 [中文|English] 双语节标题（渲染层按它出双节点）`);
  }
}

/* ── 输出 ── */
const known = (q) => PRIMARY_QUANTIZERS.has(q) ? '主力' : (SECONDARY_QUANTIZERS.has(q) ? '次级' : '名单外');
const cnCount = dataFiles.filter((f) => JSON.parse(read(`data/series/${f}`)).cn).length;
console.log(`\n系列 ${SERIES.length} · 成员 ${memberPairs.length} · 采集产物 ${dataFiles.length} 个系列文件 · 家族卡 ${famSeen.size} 张 · 中文生态透镜 cn ${cnCount}/${dataFiles.length}`);
console.log(`量化者 ${used.size} 位（主力 ${[...used].filter((q) => PRIMARY_QUANTIZERS.has(q)).length} · 其他 ${[...used].filter((q) => !PRIMARY_QUANTIZERS.has(q)).length}）· 有专属档案 ${docs.length} 位`);
/* 「名单外」要排掉**第一方**：base model 的 owner 自己发 GGUF（poolside / meta-models / openbmb …），
 * 他们在数据里也占 `quantizer` 字段（= 仓 owner），但语义上不是「第三方量化者」。
 * 把他们算进「名单外」会误导读者以为名单漏了人。 */
const unknownQ = [...used].filter((q) => known(q) === '名单外' && !firstPartyOwners.has(q));
const firstPartyQ = [...used].filter((q) => firstPartyOwners.has(q));
console.log(`第一方自发 GGUF ${firstPartyQ.length} 位（不计入量化者名单）: ${firstPartyQ.join(' ')}`);
if (unknownQ.length) console.log(`名单外量化者 ${unknownQ.length} 位（PRIMARY/SECONDARY 都没列，且不是第一方）: ${unknownQ.slice(0, 12).join(' ')}`);
if (errors.length) { console.log(`\n错误 ${errors.length} 项：`); errors.forEach((e) => console.log('  ✗ ' + e)); }
if (warnings.length) { console.log(`\n警告 ${warnings.length} 项：`); warnings.forEach((w) => console.log('  ! ' + w)); }
console.log(`\n错误: ${errors.length}  警告: ${warnings.length}`);
console.log(errors.length ? '结果: ❌ 未通过\n' : '结果: ✅ 通过\n');
process.exit(errors.length ? 1 : 0);
