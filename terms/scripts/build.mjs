/**
 * 学 AI 站构建器：terms/*.md + meta.js → data/terms.all.js
 *
 * 这个仓的真相源是 terms/*.md（GitHub 上可读可改），
 * data/terms.all.js 是**产物**（跟 .gitignore 走，不手改）。
 *
 * 为什么要做这个脚本而不是手写 JS
 *   手写JS 时正文里的 ** 和引号要手动转义，改一个词要在代码里找位置；
 *   有了 md 源，改词就是改一个文件，GitHub 上能直接 diff、能提 PR。
 *
 * frontmatter 用的是**自研极简解析器**，不是完整 YAML。原因：
 *   词条字段是固定的 10 个（zh/en/alias/purpose/def/why/refs/domain/purposeTag/level），
 *   全部是标量或标量数组，没有嵌套、没有多行块——用完整 YAML 只会多背一个依赖。
 *   但要小心两个陷阱（都已处理，见 parseValue）：
 *   1. 值里含 ** 、" : # 时必须走双引号串并转义 \ 与 "
 *   2. refs 是对象数组（[标签, 链接] 对），要单独按行解析，不能当标量读
 *
 * 验收（硬门禁）：构建产物与旧的 terms.all.js **逐字段等价**。
 *   等价不等就报错退出，不许写出半成品——见 main()末尾的 diff。
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
/* S9（2026-10-21）：三内容仓合并为 ai-handbook（D8）。本文件现住在
 * ai-handbook/terms/scripts/ —— 仓根是上一级，共享品牌核心在 shared/brand/（宪章 3：仓内只有一份）。 */
const handbookRoot = path.resolve(repoRoot, '..');
const workspaceRoot = path.resolve(handbookRoot, '..', '..');
const termsDir = path.join(repoRoot, 'terms');
const metaPath = path.join(repoRoot, 'meta.js');

/* 外壳（顶栏/抽屉/页脚/tab bar）—— 共享 shell 的 vendored 副本（2026-10-10）。
 * 此前 learn 在本文件里手抄了 87 行外壳模板，是全站第四份副本；
 * 副本已经跟丢过（body 漏 has-tabbar、nav-tools 留在 <nav> 内部）。
 * 现在六站共用 _sites/_template/shell.mjs 一处实现，
 * 改一处全站生效 —— 用户要的「统一管理」。 */
const SHELL_PATH = path.join(handbookRoot, 'shared', 'brand', 'shell.mjs');
if (!fs.existsSync(SHELL_PATH)) {
  throw new Error(
    `glossary 仓缺少 vendored 外壳：${SHELL_PATH}\n` +
    `主仓执行 node _tmp/vendor-brand.mjs 可补齐；本仓单独构建时它必须随仓库提交。`
  );
}
const SHELL = await import(pathToFileURL(SHELL_PATH).href);
/* 词条释义英文（2026-10-04 起分批补），键 = md 文件名（不含扩展名）。
 * 缺键 → 页面英文态回退中文（可接受降级）。 */
let TERMS_EN = {};
try {
  TERMS_EN = JSON.parse(fs.readFileSync(path.join(repoRoot, 'terms.en.json'), 'utf8'));
} catch (e) {
  console.warn('  ! terms.en.json 读不到，词条释义保持中文：' + e.message);
}

const outFile = path.join(repoRoot, 'site', 'data', 'terms.all.js');
const outDir = path.dirname(outFile);

/* ---------- frontmatter 解析 ---------- */

/** 解析双引号串的值（含 \\ 和 \" 转义）。返回原始字符串，不含两侧引号。 */
function readQuoted(s, i) {
  let out = '';
  i++; // 跳过起始引号
  while (i < s.length) {
    const c = s[i];
    if (c === '\\' && (s[i + 1] === '"' || s[i + 1] === '\\')) { out += s[i + 1]; i += 2; continue; }
    if (c === '"') return { val: out, end: i + 1 };
    out += c; i++;
  }
  throw new Error('未闭合的引号');
}

/** 解析行内数组 ["a", "b"]。元素必须是双引号串。 */
function parseInlineArray(raw) {
  const s = raw.trim();
  if (s === '[]') return [];
  if (s[0] !== '[' || s[s.length - 1] !== ']') throw new Error('不是行内数组: ' + raw);
  const inner = s.slice(1, -1).trim();
  if (!inner) return [];
  const out = [];
  let i = 0;
  while (i < inner.length) {
    while (i < inner.length && /\s/.test(inner[i])) i++;
    if (i >= inner.length) break;
    if (inner[i] === ',') { i++; continue; }
    if (inner[i] !== '"') throw new Error('数组元素必须是双引号串: ' + inner.slice(i, i + 20));
    const r = readQuoted(inner, i);
    out.push(r.val);
    i = r.end;
  }
  return out;
}

/** 解析一行 key: value。value 是双引号串则去引号，其余按原样。 */
function parseValue(raw) {
  const s = raw.trim();
  if (!s) return '';
  if (s[0] === '"') return readQuoted(s, 0).val;
  if (s[0] === '[') return parseInlineArray(s);
  // 非引号值：本仓不会产出（导出脚本全加引号），但容错处理
  return s;
}

function parseFmRaw(text, file) {
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
  if (!m) throw new Error(file + ': 缺 frontmatter');
  const fmRaw = m[1];
  const lines = fmRaw.split('\n');
  const t = {};
  let curKey = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    // 对象数组元素：'  - ["x", "y"]'
    const asArrItem = /^\s+-\s+(.*)$/.exec(line);
    if (asArrItem && curKey === 'refs') {
      const v = parseInlineArray(asArrItem[1]);
      (t.refs ||= []).push(v);
      continue;
    }
    const kv = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!kv) throw new Error(file + ': 第' + (i + 1) + '行无法解析: ' + line);
    curKey = kv[1];
    if (kv[2].trim() === '') { t[curKey] = []; continue; }  // 形如 'refs:' 的块头
    t[curKey] = parseValue(kv[2]);
  }
  return t;
}

function parseTermFile(text, file) {
  const t = parseFmRaw(text, file);
  t.level = Number(t.level);
  t.ord = Number(t.ord);
  if (!t.zh) throw new Error(file + ': 缺 zh');
  if (!t.layer) throw new Error(file + ': 缺 layer（源文件所属物理层，见导出脚本注释）');
  if (!Number.isFinite(t.ord)) throw new Error(file + ': 缺 ord（同层内编排顺序，见导出脚本注释）');
  // 归一化：可选字段缺失时给空数组，保证与产物结构一致
  if (!t.alias) t.alias = [];
  if (!t.def) t.def = [];
  if (!t.refs) t.refs = [];
  /* 记住源文件名，供注入英文字段时按名索引 terms.en.json。
   * 用 **不可枚举** 属性 —— JSON.stringify 会跳过它，所以它不会进产物，
   * 「逐字段等价」门禁与产物结构都不受影响。用 __ 前缀 + 普通赋值会把它写进 terms.all.js。 */
  Object.defineProperty(t, '__file', { value: file, enumerable: false, writable: true });
  return t;
}

/* ---------- 层定义来自 meta.js（页面唯一真相源） ---------- */
function loadLevels() {
  const ctx = { module: { exports: {} }, console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(metaPath, 'utf8'), ctx);
  return ctx.META.levels;
}

/* ---------- 主流程 ---------- */
const levels = loadLevels();
const files = fs.readdirSync(termsDir).filter(f => f.endsWith('.md') && f !== 'INDEX.md').sort();

const parsed = [];
for (const f of files) {
  const t = parseTermFile(fs.readFileSync(path.join(termsDir, f), 'utf8'), f);
  parsed.push(t);
}

/* ---------- 组装成分层结构 ----------
 * **按 frontmatter 的 layer 分层、按 ord 排序**——
 * 不能按 level 分层：实测 level 字段与源文件的物理分层不一致
 * （第 3 层物理位置里有词的 level 是 2 或 4）。
 * 两者用途不同：level 给页面分组（groupsOf('level')），layer 定产物顺序。
 * 分层错会让等价门禁拿A 层比 B 层，报出一堆假差异。
 *
 * 层标题与描述来自 meta.js——**页面渲染读的就是 LEVELS**，
 * terms.all.js 里那 6 条 desc 是死数据（且已与 meta.js 漂移）。
 */
const layers = Object.keys(levels).map(Number).sort((a, b) => a - b);
const NUM2KEY = {};           // 一 → 1
Object.keys(levels).forEach(k => { NUM2KEY[levels[k].name] = Number(k); });

const byLayerNum = {};         // 一..六 → 词[]
for (const t of parsed) {
  const n = NUM2KEY[t.layer];
  if (!n) throw new Error(`未知 layer: ${t.layer}（${t.zh}）`);
  (byLayerNum[t.layer] ||= []).push(t);
}

/* 注入英文字段（2026-10-04）。
 * 键 = md 文件名（不含扩展名），见 terms.en.json。
 * **不改那10 个中文字段** —— 构建末尾的「逐字段等价」门禁以它们为基准
 * （见下方 FIELDS），加新字段不影响那条门禁。
 * 缺键时不写该字段 → 页面英文态回退中文（可接受降级）。 */
let enCovered = 0, enTotal = 0;
for (const t of parsed) {
  enTotal++;
  const base = path.basename(t.__file || '').replace(/\.md$/, '');
  const en = TERMS_EN[base];
  if (!en) continue;
  enCovered++;
  if (en.purpose) t.purposeEn = en.purpose;
  if (en.def) t.defEn = en.def;
  if (en.why) t.whyEn = en.why;
  if (en.alias) t.aliasEn = en.alias;
}

/* B1（2026-10-09）：给每个词条加 `slug` —— 独立页的 URL 段，取自 **md 文件名**。
 * 为什么不能用 `zh` 推：实测 9 个词条的 zh 与文件名不同（文件名用 `-`、zh 用 `/`，
 *   如 `API - 接口调用.md` 的 zh 是「API / 接口调用」）—— 用 zh 拼 URL 会 404。
 * 为什么会进产物：页面（learn.specul/index.html）要靠它生成「独立页面」链接，
 *   而 `__file` 是不可枚举的（刻意不进产物），页面拿不到 —— 所以必须显式写一个字段。
 * 逐字段等价门禁只比 FIELDS 里那 10 个中文字段，**新增字段不影响它**（见上方注释）。 */
for (const t of parsed) {
  const base = path.basename(t.__file || '').replace(/\.md$/, '');
  if (!base) throw new Error(`词条缺少文件名，无法定 slug：${t.zh}`);
  t.slug = base;
}
{
  const seen = new Set();
  for (const t of parsed) {
    if (seen.has(t.slug)) throw new Error(`slug 重复：${t.slug}（会出现两个同 URL 的词条页）`);
    seen.add(t.slug);
  }
}

const out = layers.map(n => {
  const key = String(n);
  const lv = levels[key];
  const terms = (byLayerNum[lv.name] || []).slice().sort((a, b) => a.ord - b.ord);
  return { num: lv.name, name: lv.short, desc: lv.desc, terms };
});

const enRate = enTotal ? Math.round(enCovered / enTotal * 100) : 0;
console.log(`  · 词条英文覆盖：${enRate}%（${enCovered} / ${enTotal} 条）`);

const total = out.reduce((a, L) => a + L.terms.length, 0);

/* ---------- 扁平顺序 + slug（S23 起提到主流程，词条页与路径页共用） ---------- */
// out 已按 layer 排序、层内按 ord 排序 → 直接铺平就是「有序路径」
const flat = [];
for (const L of out) for (const t of L.terms) flat.push({ t, layer: L });
const slugOf = (t) => t.slug || path.basename(t.__file || '').replace(/\.md$/, '');

/* ═══ S23（2026-10-19）· 学习路径 ═══
 * 真相源：`paths/*.json` —— 一条路径一个文件，steps 是**有序 slug 数组**。
 * 为什么用 slug 而不是 zh：slug 是 URL 身份（见上方 B1 注释：9 个词条的 zh 与文件名不同）。
 * 为什么是 JSON 而不是 md：路径没有正文散文，只有「顺序 + 检查点」——
 *   它是数据，不是文章。顺序就是它的全部内容，所以顺序必须写在数组里、由门禁校验。
 * 构建期校验（门禁 path-check 在产物层再查一遍）：
 *   · 每个 step 必须是真实存在的 slug —— 防「路径链到不存在的词条」（anchor-check 的同类）
 *   · steps 不得重复 —— 同一条路径里同一个词出现两次是编排错误
 *   · id 唯一、双语字段齐（R2）、检查点中英各 3 条
 */
const pathsDir = path.join(repoRoot, 'paths');
const slugSet = new Set(flat.map(({ t }) => slugOf(t)));
const PATHS = [];
if (fs.existsSync(pathsDir)) {
  for (const f of fs.readdirSync(pathsDir).filter((f) => f.endsWith('.json')).sort()) {
    let p;
    try { p = JSON.parse(fs.readFileSync(path.join(pathsDir, f), 'utf8')); }
    catch (e) { throw new Error(`paths/${f} 不是合法 JSON：${e.message}`); }
    const tag = `paths/${f}`;
    if (!p.id) throw new Error(`${tag}: 缺 id`);
    if (!Array.isArray(p.steps) || p.steps.length < 3) throw new Error(`${tag}: steps 必须是 ≥3 项的数组`);
    for (const [k, v] of [['zh', p.zh], ['en', p.en]]) if (!v) throw new Error(`${tag}: 缺 ${k}（R2 双语）`);
    for (const k of ['lead', 'span']) if (!p[k] || !p[k].zh || !p[k].en) throw new Error(`${tag}: ${k} 必须中英齐`);
    if (!p.checkpoint || !Array.isArray(p.checkpoint.zh) || !Array.isArray(p.checkpoint.en)) throw new Error(`${tag}: checkpoint 必须有中英两组`);
    if (p.checkpoint.zh.length !== p.checkpoint.en.length) throw new Error(`${tag}: 检查点中英条数不等`);
    const seen = new Set();
    p.steps.forEach((s, i) => {
      if (!slugSet.has(s)) throw new Error(`${tag}: 第 ${i + 1} 步「${s}」不是任何词条的 slug（路径会链到不存在的页面）`);
      if (seen.has(s)) throw new Error(`${tag}: 第 ${i + 1} 步「${s}」重复`);
      seen.add(s);
    });
    PATHS.push(p);
  }
  PATHS.sort((a, b) => (a.ord || 0) - (b.ord || 0) || a.id.localeCompare(b.id));
  const idSeen = new Set();
  for (const p of PATHS) {
    if (idSeen.has(p.id)) throw new Error(`路径 id 重复：${p.id}`);
    idSeen.add(p.id);
  }
}
console.log(`  · 学习路径：${PATHS.length} 条（${PATHS.map((p) => `${p.zh} ${p.steps.length} 步`).join(' · ')}）`);

/* ═══ S24（2026-10-19）· 微型指南 guides/*.md 加载 + 构建期校验 ═══
 * 与词条同一套路：frontmatter 是页面渲染的真相源，正文只给 GitHub 上直接阅读的人。
 * 英文正文在 guides.en.json（R2，与 terms.en.json 同一键规则）。
 * 结构纪律的完整校验在 scripts/validate.mjs（扩类）；这里做**构建必需**的那部分：
 * 缺了它页面会渲染出残缺（空 points / 链到不存在的词条），所以构建期也要拦。 */
const guidesDir = path.join(repoRoot, 'guides');
const GUIDES = [];
if (fs.existsSync(guidesDir)) {
  const enGuides = fs.existsSync(path.join(repoRoot, 'guides.en.json'))
    ? JSON.parse(fs.readFileSync(path.join(repoRoot, 'guides.en.json'), 'utf8')) : {};
  for (const f of fs.readdirSync(guidesDir).filter((f) => f.endsWith('.md')).sort()) {
    const g = parseFmRaw(fs.readFileSync(path.join(guidesDir, f), 'utf8'), `guides/${f}`);
    const tag = `guides/${f}`;
    const kind = g.kind;
    if (kind !== 'guide' && kind !== 'myth') throw new Error(`${tag}: kind 必须是 guide 或 myth`);
    const station = Number(g.station);
    if (!Number.isInteger(station) || station < 1 || station > 6) throw new Error(`${tag}: station 必须是 1-6 的整数（指南挂在第几站）`);
    if (!g.lead) throw new Error(`${tag}: 缺 lead`);
    if (kind === 'guide' && (!Array.isArray(g.points) || g.points.length < 3)) throw new Error(`${tag}: guide 类必须有 ≥3 条 points`);
    if (kind === 'myth' && (!g.myth || !g.fact)) throw new Error(`${tag}: myth 类必须有 myth 与 fact 两段`);
    if (!Array.isArray(g.refs) || !g.refs.length) throw new Error(`${tag}: refs 不能为空（R5）`);
    for (const s of g.terms || []) {
      if (!slugSet.has(s)) throw new Error(`${tag}: terms 互链「${s}」不是任何词条的 slug（会链到不存在的页面）`);
    }
    const slug = path.basename(f).replace(/\.md$/, '');
    const en = enGuides[slug];   // 键 = 文件名（与 guides.en.json / validate 同一口径），不是 zh
    if (!en || !en.lead) throw new Error(`${tag}: guides.en.json 缺「${slug}」的英文 lead（R2 中英同步）`);
    g.leadEn = en.lead;
    g.pointsEn = en.points || null;
    g.mythEn = en.myth || null;
    g.factEn = en.fact || null;
    Object.defineProperty(g, '__file', { value: f, enumerable: false, writable: true });
    GUIDES.push(g);
  }
  GUIDES.sort((a, b) => Number(a.station) - Number(b.station) || a.kind.localeCompare(b.kind) || Number(a.ord) - Number(b.ord));
  const gSeen = new Set();
  for (const g of GUIDES) {
    const key = `${g.zh}`;
    if (gSeen.has(key)) throw new Error(`指南标题重复：${key}`);
    gSeen.add(key);
  }
}
if (GUIDES.length) console.log(`  · 微型指南：${GUIDES.length} 篇（${GUIDES.map((g) => `${g.zh}·第${g.station}站`).join(' · ')}）`);

/* ═══ S39（2026-10-19）· 编年史与版图 atlas/atlas.json 加载 + 构建期校验 ═══
 * 真相源是一份 JSON（不是 md）：这一页没有「正文」概念，整页都是结构化条目。
 * 构建期校验照 guides 的套路做**构建必需**的那部分：
 *   · 三段式 ref（R5 的载体，缺了页面就出现无出处的论断）
 *   · links 必须命中既有词条 slug（缺了会链到不存在的页面）
 *   · 中英字段成对（R2，同一份 JSON 里并存，不需要独立英文文件） */
const atlasFile = path.join(repoRoot, 'atlas', 'atlas.json');
let ATLAS = null;
if (fs.existsSync(atlasFile)) {
  ATLAS = JSON.parse(fs.readFileSync(atlasFile, 'utf8'));
  const aTag = 'atlas/atlas.json';
  if (!ATLAS.zh || !ATLAS.en || !ATLAS.lead || !ATLAS.lead.zh || !ATLAS.lead.en) throw new Error(`${aTag}: 缺 zh/en 标题或 lead（R2 中英同步）`);
  for (const key of ['timeline', 'orgs', 'terms']) {
    if (!Array.isArray(ATLAS[key]) || !ATLAS[key].length) throw new Error(`${aTag}: ${key} 不能为空`);
  }
  const checkRef = (r, where) => {
    if (!Array.isArray(r) || r.length !== 3 || !r[0] || !/^https?:\/\//.test(r[1]) || !r[2]) {
      throw new Error(`${aTag}: ${where} 的 ref 必须是三段式 [中文标签, URL, 英文标签]（R5）`);
    }
  };
  for (const [i, ev] of ATLAS.timeline.entries()) {
    if (!ev.date || !ev.zh || !ev.en || !ev.note || !ev.note.zh || !ev.note.en) throw new Error(`${aTag}: timeline[${i}] 缺 date/zh/en/note 字段`);
    checkRef(ev.ref, `timeline[${i}]（${ev.zh}）`);
  }
  for (const [i, o] of ATLAS.orgs.entries()) {
    if (!o.name || !Number.isInteger(o.founded) || !/^https?:\/\//.test(o.url || '') || !o.zh || !o.en) throw new Error(`${aTag}: orgs[${i}] 缺 name/founded/url/zh/en 字段`);
  }
  for (const [i, tm] of ATLAS.terms.entries()) {
    if (!tm.zh || !tm.en || !tm.note || !tm.note.zh || !tm.note.en) throw new Error(`${aTag}: terms[${i}] 缺 zh/en/note 字段`);
    checkRef(tm.ref, `terms[${i}]（${tm.zh}）`);
  }
  if (!Array.isArray(ATLAS.links) || !ATLAS.links.length) throw new Error(`${aTag}: links 不能为空（版图页要链回词条）`);
  for (const s of ATLAS.links) {
    if (!slugSet.has(s)) throw new Error(`${aTag}: links「${s}」不是任何词条的 slug（会链到不存在的页面）`);
  }
  console.log(`  · 编年史与版图：时间线 ${ATLAS.timeline.length} 条 · 公司 ${ATLAS.orgs.length} 家 · 术语演变 ${ATLAS.terms.length} 条 · 互链 ${ATLAS.links.length} 个`);
}

/* ---------- 等价校验（硬门禁） ----------
 * 拿旧产物作基准逐字段比。**不等就退出，不写文件**——
 * 写出一个字段有差的产物，页面会静默少词或丢 refs，比构建失败更难查。
 *
 * **比对时统一补齐可选字段**（alias/def/refs 缺失视作[]）：
 * 旧产物里并非每个词都有refs 键（只有 54/116 个有），
 * 而解析器会给每个词补 refs: []。若直接比JSON 会因为「键是否存在」
 * 而报 95 处假差异——内容其实完全一样。
 */
/* `--accept` = 承认这次字段变化是**有意的**，把新产物刷成新基准。
 * 为什么需要它：门禁的默认职责是拦住「少词 / 丢 refs」这类静默损坏，
 * 但它同样会拦住**故意**改字段（比如 2026-10-08 把 3 个词的 level 与所在层对齐）。
 * 以前只能手改/删 .baseline.terms.all.js 绕过——那等于把门禁永久关掉，
 * 下一次真正的意外损坏也就拦不住了。显式开关把这个决定留在命令行里。
 */
const ACCEPT = process.argv.includes('--accept');

const oldFile = path.join(repoRoot, '.baseline.terms.all.js');
if (ACCEPT) {
  console.log('--accept：跳过等价校验，构建后将刷新基准');
} else if (fs.existsSync(oldFile)) {
  const ctx = { module: { exports: {} }, console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(oldFile, 'utf8'), ctx);
  const old = ctx.TERMS;

  // 归一化：只保留有语义的字段，可选数组一律补齐
  const FIELDS = ['zh', 'en', 'alias', 'purpose', 'def', 'why', 'refs', 'domain', 'purposeTag', 'level'];
  /*层级的 num / name / desc **故意不参与比对**。
   * 原因：页面的分层标题与描述来自 meta.js 的 LEVELS（见 groupsOf('level')），
   * 而旧 terms.all.js 里那 6 条 desc 是**死数据——页面从不读它**，
   * 且已与 meta.js 漂移（第三层「看完这层，」vs「看完能」；第六层少了「也是下一站」）。
   * 所以层的真相源是 meta.js，产物里的 desc 由 levels 重新生成即可，
   * 拿死数据当基准比对只会报假差异。真正的门禁是**词条字段全等+ 顺序一致**（116 词）。
   */
  const norm = list => list.map(L => ({
    terms: L.terms.map(t => {
      const o = { level: Number(t.level) };
      FIELDS.forEach(k => {
        o[k] = (k === 'alias' || k === 'def' || k === 'refs')
          ? (t[k] || [])
          : (t[k] || '');
      });
      return o;
    })
  }));
  /* 顺序敏感、不排序：门禁要验的正是「编排顺序没被打乱」，
   * 排序后再比等于把最该验的那件事放过了。 */
  const a = JSON.stringify(norm(old)), b = JSON.stringify(norm(out));

  if (a !== b) {
    // 逐词定位，给出可执行的错误信息
    const pick = list => { const m = {}; list.forEach(L => L.terms.forEach(t => {
      const o = {}; FIELDS.forEach(k => o[k] = (k === 'alias' || k === 'def' || k === 'refs') ? (t[k] || []) : (t[k] || ''));
      o.level = Number(t.level); m[t.zh] = o;
    })); return m; };
    const oldByZh = pick(old), newByZh = pick(out);
    const diffs = [];
    Object.keys(oldByZh).forEach(zh => {
      if (!newByZh[zh]) { diffs.push('缺失词: ' + zh); return; }
      FIELDS.concat(['level']).forEach(k => {
        const x = JSON.stringify(oldByZh[zh][k]), y = JSON.stringify(newByZh[zh][k]);
        if (x !== y) diffs.push(`字段 ${k} 变化: ${zh}  旧=${String(x).slice(0, 60)}  新=${String(y).slice(0, 60)}`);
      });
    });
    Object.keys(newByZh).forEach(zh => { if (!oldByZh[zh]) diffs.push('新增词: ' + zh); });
    // 顺序差异单独报：按 zh 查字典查不出顺序问题，必须逐层比对词序
    const seqOf = list => list.map(L => L.terms.map(t => t.zh));
    seqOf(old).forEach((seq, i) => {
      const s2 = seqOf(out)[i] || [];
      const n = Math.max(seq.length, s2.length);
      for (let k = 0; k < n; k++) {
        if (seq[k] !== s2[k]) {
          diffs.push(`第 ${i + 1} 层第 ${k + 1} 位不同：旧=「${seq[k] || '(无)'}」新=「${s2[k] || '(无)'}」`);
          break;
        }
      }
    });
    console.error('等价校验失败，未写出产物：');
    diffs.slice(0, 20).forEach(d => console.error('  ' + d));
    if (diffs.length > 20) console.error('  ...另 ' + (diffs.length - 20) + ' 处');
    process.exit(1);
  }
  console.log('等价校验通过（对照 .baseline.terms.all.js）');
} else {
  console.log('无基准文件，跳过等价校验（首次构建）');
}

/* ---------- 写产物 ---------- */
const header = `/* AI 名词地图 · 词条数据
 *
 * **这是产物，不要手改。** 源在 terms/*.md。
 * 改词：编辑 terms/<slug>.md，然后跑 node scripts/build.mjs。
 *
 * 结构：6 层，每层 { num, name, desc, terms[] }
 * 每词字段：zh / en / alias / purpose / def / why / refs / domain / purposeTag / level
 */
var TERMS = `;
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, header + JSON.stringify(out, null, 1) + ';\n', 'utf8');

/* S23：路径产物（首页导览条读它；路径页本身已由 build 直接渲染成静态 HTML）。
 * 与 terms.all.js 同理：这是产物，不手改；真相源是 paths/*.json。 */
fs.writeFileSync(path.join(outDir, 'paths.js'),
  `/* AI 名词地图 · 学习路径（S23）\n * **这是产物，不要手改。** 源在 paths/*.json。\n` +
  ` * 每条：id / ord / zh / en / span / lead / steps（有序 slug）/ checkpoint。\n */\n` +
  `var PATHS = ` + JSON.stringify(PATHS, null, 1) + ';\n', 'utf8');

/* S24：指南产物（首页导览条读它；指南页本身已由 build 直接渲染成静态 HTML）。
 * 只导出渲染需要的字段，正文（body）不进产物 —— 页面从 frontmatter 渲染。 */
if (GUIDES.length) {
  fs.writeFileSync(path.join(outDir, 'guides.js'),
    `/* AI 名词地图 · 微型指南（S24）\n * **这是产物，不要手改。** 源在 guides/*.md 的 frontmatter。\n` +
    ` * 每篇：id（slug=文件名）/ zh / en / kind / station / ord / span / lead / points / myth / fact。\n */\n` +
    `var GUIDES = ` + JSON.stringify(GUIDES.map((g) => ({
      id: path.basename(g.__file).replace(/\.md$/, ''),
      zh: g.zh, en: g.en, kind: g.kind, station: Number(g.station), ord: Number(g.ord), span: Number(g.span),
      lead: { zh: g.lead, en: g.leadEn },
      points: g.points || null, pointsEn: g.pointsEn || null,
      myth: g.myth || null, mythEn: g.mythEn || null,
      fact: g.fact || null, factEn: g.factEn || null,
    })), null, 1) + ';\n', 'utf8');
}

console.log('构建完成：' + total + ' 词 / ' + out.length + ' 层 → ' + path.relative(repoRoot, outFile));

if (ACCEPT) {
  fs.writeFileSync(oldFile, header + JSON.stringify(out, null, 1) + ';\n', 'utf8');
  console.log('已刷新基准 → ' + path.relative(repoRoot, oldFile) + '（下次构建恢复逐字段门禁）');
}

/* ---------- 同步到部署目录 ----------
 * 为什么必须在这里做（2026-10-03 发现）：
 *   站点真正的部署目录是仓库外的 `learn.specul/`（GitHub Pages 从那儿取文件），
 *   而本脚本只写 `_data/handbook/terms/site/data/` —— 中间隔着一次**手工复制**。
 *   后果：改完词跑完 build，脚本报「构建完成」，但线上还是旧词，
 *   而且**没有任何检查会报错**（这跟 agent 站的「静默丢内容」是同一类问题）。
 *   把同步收进构建流程之后，「改词 → build → 站点到位」才是一条命令。
 */
const deployDir = path.join(workspaceRoot, 'learn.specul', 'data');
/* B5（2026-10-09）：learn 站的 brand.css / brand.js 也纳入同步。
 * 起因：改品牌 token 做对比度达标时发现 `learn.specul/brand.css` 是**旧版**——
 *   它既不在 `_tmp/vendor-brand.mjs` 的列表里，也不在 `_audit/brand-sync.mjs` 的守卫里，
 *   于是四个 `_data/` 仓都同步了，只有 learn 站在**静默漂移**（35.3KB vs 36.4KB）。
 *   现在：本仓 `brand/` 存 vendored 副本（有 MANIFEST 哈希），构建时同步到部署目录，
 *   守卫覆盖本仓 —— 与其他四仓同一套路。
 * S9（2026-10-21）：品牌副本搬到 ai-handbook/shared/brand/（仓内只有一份）。 */
const brandDir = path.join(workspaceRoot, 'learn.specul');
if (fs.existsSync(path.dirname(deployDir))) {
  fs.mkdirSync(deployDir, { recursive: true });
  for (const f of ['brand.css', 'brand.js']) {
    const from = path.join(handbookRoot, 'shared', 'brand', f);
    const to = path.join(brandDir, f);
    if (!fs.existsSync(from)) { console.log('跳过同步（仓内缺 vendored 副本）：brand/' + f); continue; }
    const a = fs.readFileSync(from);
    const b = fs.existsSync(to) ? fs.readFileSync(to) : null;
    if (b && b.equals(a)) { console.log(`  品牌 ${f}（未变）`); continue; }
    fs.writeFileSync(to, a);
    console.log(`  品牌 ${f} 已同步 → learn.specul/`);
  }
  const copies = [
    ['terms.all.js', outFile],                 // 词条：产物 → 部署
    ['meta.js', path.join(repoRoot, 'meta.js')], // 元信息：仓内源 → 部署
    // dims.js 的真相源就是仓内这份（2026-10-03 从「两份无源手写副本」升为有源）。
    ['dims.js', path.join(repoRoot, 'dims.js')],
    // S23：学习路径（paths/*.json 校验后合并成一份产物，首页导览条消费）
    ['paths.js', path.join(outDir, 'paths.js')],
    // S24：微型指南（guides/*.md frontmatter 校验后合并成一份产物，首页导览条消费）
    ['guides.js', path.join(outDir, 'guides.js')],
  ];
  const synced = [];
  let changed = 0;
  for (const [name, from] of copies) {
    if (!fs.existsSync(from)) {
      console.log('跳过同步（源不存在）：' + path.relative(repoRoot, from));
      continue;
    }
    const to = path.join(deployDir, name);
    const a = fs.readFileSync(from);
    const b = fs.existsSync(to) ? fs.readFileSync(to) : null;
    if (b && b.equals(a)) { synced.push(name + '（未变）'); continue; }
    fs.writeFileSync(to, a);
    synced.push(name + (b ? '（已更新）' : '（新建）'));
    changed++;
  }
  console.log('同步到 learn.specul/data/：' + synced.join('、'));
  // 2026-10-03：原先这里还会把 dims.js 同步到 `_sites/_preview/data`，
  // 给learn 站前身的那份演示页喂数据。那份演示页连同数据已归档到
  // `_tmp-scripts/_retired-2026-10-03/`，所以这段一并去掉 ——
  // 留着就是「给一个归档物持续供给」的下一个人，照样会把它当输入。
  if (!changed) console.log('（部署目录已是最新，无需改动）');
}

/* ═══════════════════════════════════════════════════════════════════════
 * B1 · 让内容可寻址：生成 116 个词条独立页 + 重写 sitemap（2026-10-09）
 *
 * 为什么 slug 用**文件名**而不是 `zh` 字段：
 *   实测 9 个词条的 zh 与文件名不同（文件名用 `-`，zh 用 `/`，如
 *   `API - 接口调用.md` 的 zh 是「API / 接口调用」）。文件名是 URL 的稳定身份，
 *   zh 是可变的展示名 —— 所以 slug 取文件名，并且**不断言两者相等**（它们本来就不等）。
 *
 * URL 约定沿用 vg 站：中文 slug 原样作目录名，sitemap 里百分号编码
 *   （实测 vg 的 `ai-生成内容的版权.html` 在 sitemap 里就是 `ai-%E7%94%9F…`）。
 *   路径：`learn.specul/term/<slug>/index.html`
 *
 * 双语：与站上一致，用 `data-zh` / `data-en` 双 span（brand.js 负责切换），
 *   所以词条页**不需要**额外的翻译文件（R2 在同一份产物里满足）。
 * ═══════════════════════════════════════════════════════════════════════ */
const learnDir = path.join(workspaceRoot, 'learn.specul');
if (fs.existsSync(learnDir)) {
  /* 展示名映射来自 meta.js（与页面同一个真相源）——**不要在这里重抄一份中文名**，
   * 那正是「两处口径并存」的老毛病。 */
  const metaCtx = { module: { exports: {} }, console };
  vm.createContext(metaCtx);
  vm.runInContext(fs.readFileSync(metaPath, 'utf8'), metaCtx);
  const META = metaCtx.META;

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  /* 双 span 双语（与站上一致，brand.js 负责切换）。参数已是纯文本，用 esc。 */
  const bi = (zh, en) => `<span data-zh>${esc(zh)}</span><span data-en>${esc(en == null || en === '' ? zh : en)}</span>`;
  /* 与 learn 首页的 escMd 同规则：先 esc，再把 **粗体** 变成 <strong> */
  const escMd = (s) => {
    const slots = [];
    let out = esc(s).replace(/\*\*([^*]+)\*\*/g, (_, inner) => {
      slots.push(inner);
      return '\u0000' + (slots.length - 1) + '\u0000';
    });
    out = out.replace(/\u0000(\d+)\u0000/g, (_, i) => '<strong>' + slots[Number(i)] + '</strong>');
    return out;
  };
  const ENC = (s) => encodeURIComponent(s);

  /* B5（2026-10-09）：meta description 与 JSON-LD。
   * 描述原先只取 purpose —— 实测大量词条的 purpose 短于 50 字符（「让不同厂商的 AI 编码工具能挂进同一个编辑器。」
   * 只有 24 字），搜索结果里等于没写。现在按 purpose → def[0] → why 依次拼到够长为止，
   * 仍然只写词条自己已有的内容，不堆关键词。
   * ⚠ 截断要按**转义之后**的长度算：`&` → `&amp;` 会变长（agent 那边就因此从 150 变 170）。 */
  const plainTxt = (s) => String(s == null ? '' : s).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
  const metaDesc = (t) => {
    const parts = [plainTxt(t.purpose), plainTxt((t.def || [])[0]), plainTxt(t.why)];
    let out = '';
    for (const p of parts) {
      if (!p) continue;
      out = out ? out + ' ' + p : p;
      if (esc(out).length >= 70) break;          // 够长就停，不硬塞
    }
    if (esc(out).length < 50) out = (out + ' —— 学 AI 词条：它是什么、为什么需要知道、原始出处。').trim();
    let n = out.length;
    while (n > 0 && esc(out.slice(0, n) + '…').length > 158) n -= Math.max(1, esc(out.slice(0, n) + '…').length - 158);
    return n < out.length ? out.slice(0, n).replace(/[\s,，、;；:：\-—]+$/, '') + '…' : out;
  };

  /* JSON-LD：词条页用 DefinedTerm（schema.org 里就是为「术语表条目」定义的），
   * 并指回 isPartOf（词条集）与同层词条集。中英两个名字都写进 alternateName。 */
  const termJsonLd = (t, slug, layerName) => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.zh,
    alternateName: t.en || undefined,
    description: plainTxt(t.purpose),
    url: `https://learn.specul.com/term/${ENC(slug)}/`,
    inLanguage: 'zh-Hans',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: `学 AI · 第${t.layer}站（${layerName}）`,
      url: `https://learn.specul.com/#layer-${t.level}`,
    },
    isPartOf: { '@type': 'WebSite', name: '学 AI', url: 'https://learn.specul.com/' },
  });

  // 扁平顺序 flat / slugOf 已在主流程定义（S23 起词条页与路径页共用，不再各存一份）

  /* ═══ B3（2026-10-09）· 站间骨架 ═══
   * 每个词条页加两节：
   *   「现在能做什么」—— 一条**跨站**动作（去哪个站、能拿到什么）+ 一条站内动作（同层其他词）
   *   「相关词条」    —— 3 个邻近词条（先同 domain、再同层，按邻近度取），站内互链
   *
   * 跨站目标怎么定（R4/R5：从内容推，不靠手感，也不人工逐条拍）：
   *   ① 词条自己的 refs 里已经指向本站群的 → **优先用作者自己写的那条**（最准）
   *   ② 否则按 purpose + def + why + alias 的关键词规则（依据是「那个站真的能回答
   *      这个词引出的下一步问题」，不是「词里出现了某个字」）
   *   ③ 都推不出 → 指向 specul.com 看站群分工（诚实但价值最低，实测只有 9 个词条落到这里）
   * 推不出来的**不硬凑**：宁可少一条，也不指一个对不上的站。 */
  const SITE_ACTION = {
    models: { href: 'https://models.specul.com/', zh: '去 Models 图谱：看这个模型有哪些量化版、按你的显存该下哪一档', en: 'Models atlas: which quantisations exist and which tier fits your VRAM' },
    agent: { href: 'https://agent.specul.com/', zh: '去 Agent 图谱：看有哪些装得上的客户端、运行时与工具', en: 'Agent atlas: which clients, runtimes and tools you can install' },
    vg: { href: 'https://vg.specul.com/', zh: '去「AI 做游戏」：看这一步在真实项目里会卡在哪', en: 'AI for games: where this step breaks down in a real project' },
    nav: { href: 'https://nav.specul.com/', zh: '去导航：找现成的工具、平台、评测与学习资源', en: 'Directory: ready-made tools, platforms, benchmarks and courses' },
    www: { href: 'https://specul.com/', zh: '看站群怎么分工：这一站回答「是什么」，其他站回答「选哪个」', en: 'How the site family divides the work' },
  };
  const HOST2SITE = { 'agent.specul.com': 'agent', 'models.specul.com': 'models', 'vg.specul.com': 'vg', 'nav.specul.com': 'nav', 'specul.com': 'www' };
  const CROSS_RULES = [
    ['models', /量化|显存|bpw|gguf|权重|参数量|推理成本|调用成本|缓存|kv ?缓存|上下文窗口|长上下文|分词|token|词表|微调|蒸馏|预训练|训练|卸载|吞吐|并发|路由|gpu|芯片|算力/i],
    ['agent', /agent|智能体|工具调用|mcp|提示词|编码助手|代码补全|仓库级|终端|ide|cli|编排|工作流|人机协作|可观测|监控|服务中断|迭代速度|退出成本|迁移/i],
    ['vg', /游戏|引擎|帧率|手感|素材|玩法|关卡/i],
    ['nav', /网站|导航|平台|服务商|开源项目|数据集|评测|基准|benchmark|课程|论文|社区|资讯/i],
  ];
  const DOMAIN_FALLBACK = { infra: 'models', model: 'models', agent: 'agent', dev: 'agent', media: 'nav', concept: 'www', choice: 'www', data: 'www' };
  function crossTarget(t) {
    for (const r of t.refs || []) {
      const m = String(r[1] || '').match(/^https?:\/\/([^/]+)/i);
      if (m) { const s = HOST2SITE[m[1].replace(/^www\./, '')]; if (s) return s; }
    }
    const text = [t.purpose, (t.def || []).join(' '), t.why, (t.alias || []).join(' ')].join(' ');
    for (const [s, re] of CROSS_RULES) if (re.test(text)) return s;
    return DOMAIN_FALLBACK[t.domain] || 'www';
  }

  const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%238b7cf8'/%3E%3Cstop offset='1' stop-color='%2322d3c5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='48' height='48' rx='12' fill='%2305080f'/%3E%3Cpath d='M14 32 L24 12 L34 32' fill='none' stroke='url(%23g)' stroke-width='2.4' stroke-linejoin='round'/%3E%3Ccircle cx='24' cy='27' r='2.4' fill='%2322d3c5'/%3E%3C/svg%3E";

  /* 顶栏 + 抽屉：共享实现。learn 的词条页在 term/xxx/ 子目录，
     资源相对路径由 shell() 的 assetPrefix 处理，这里只用标记部分。 */
  const HEADER = (cur) => `  <a class="t-skip" href="#main"><span data-zh>跳到主要内容</span><span data-en>Skip to main content</span></a>
${SHELL.header(cur)}
${SHELL.drawer(cur)}`;

  /* 页脚：共享实现，只传「内容仓地址」与「开源」文案。
     learn 的内容仓是 ai-glossary（markdown 原文），不是部署仓 speculcom/learn。 */
  const FOOTER = SHELL.footer('https://github.com/speculcom/ai-glossary', SHELL.OPEN_SOURCE_LABEL);

/* 底部 tab bar —— 手机端「像 App 一样」的固定导航（2026-10-10 用户要求：分站也要有）。
   与共享 shell.mjs / www 首页同一份标记；样式在 brand.css（默认 none，≤768px 显示），
   行为在 brand.js（它已监听 .nav-tabbar [aria-controls] 当「更多」按钮），此处不需要新脚本。
   ⚠ 本份与 _sites/_template/shell.mjs 的 tabbar() 是同一实现的两个副本 ——
     learn 的外壳不走共享 shell（词条页要按 ../../ 相对路径引资源），只能各存一份。 */
/* 底部 tab bar / 顶栏 / 页脚 / 抽屉 —— 全部改用**共享 shell**。
   ⚠ 2026-10-10：此前这里是 87 行手抄的模板串（HEADER 48 行 + FOOTER 25 行 + TABBAR 7 行），
     是共享 shell 的第四份副本。副本意味着「改骨架要跟四次」，
     而且已经跟丢过：learn 的 <body> 迟迟没加 has-tabbar（页脚被 tab bar 盖住），
     nav-tools 也曾长时间留在 <nav> 内部。
     现在 learn 与其余五站共用 _sites/_template/shell.mjs 一处实现。 */
const TABBAR = SHELL.tabbar('learn');

  /* ⚠ S26（2026-10-19）：词条页版式 TP_CSS 已整体搬入 learn.specul/learn.css（站级真相源）。
   * 原来它以内联 <style> 出现在 209 个产物页里（约 328KB），而 ui-core 只扫首页内联——
   * 词条页/指南页里的它不在任何尺子管辖内；路径页用了 .tp-* 类却连内联都没有，
   * 一直是**裸渲染**（类名有、样式无）。搬进站级 CSS 后产物页版式内联归零、
   * 三种页型（词条/路径/指南）共用同一份定义，改一处全站生效。
   * 这里不再写任何版式样式；页面里只剩 :root{--accent} 的值注入（不是版式）。 */

  const DEPLOY_TERM = path.join(learnDir, 'term');
  let pageChanged = 0, pageTotal = 0;
  const wantSlugs = new Set();

  for (let i = 0; i < flat.length; i++) {
    const { t, layer } = flat[i];
    const slug = slugOf(t);
    if (!slug) throw new Error(`词条缺少文件名，无法定 slug：${t.zh}`);
    if (wantSlugs.has(slug)) throw new Error(`slug 重复：${slug}`);
    wantSlugs.add(slug);
    pageTotal++;

    const prev = flat[i - 1], next = flat[i + 1];
    const lv = META.levels[String(t.level)] || {};
    /* v7 §1.3（2026-10-18）：六层→六站。layer.name 读的就是 meta.js 的 short（站名）。
     * ⚠ 锚点 id 仍是 layer-N（anchor-check 守它 + 200 个页面的出链），名字改、锚点不改。
     * 英文态保留 "Layer N"：v7 的更名是中文叙事命名，英文用 Layer 更自然（meta.js 注释同口径）。 */
    const tagZh = `第${t.layer || layer.num}站 · ${layer.name}`;
    const tagEn = `Station ${t.level} · ${lv.shortEn || lv.nameEn || layer.name}`;

    const refs = (t.refs || []).map((r) => {
      const lab = bi(r[0], r[2]);
      return `      <li>${lab} <a href="${esc(r[1])}" target="_blank" rel="noopener">↗</a></li>`;
    }).join('\n');

    const defList = (t.def || []).map((d) => `      <p class="tp-li">${escMd(d)}</p>`).join('\n');
    const defListEn = (t.defEn && t.defEn.length ? t.defEn : t.def).map((d) => `      <p class="tp-li" data-en>${escMd(d)}</p>`).join('\n');

    const aliasZh = (t.alias && t.alias.length)
      ? `      <div class="tp-sec"><div class="tp-lab">别名</div><p class="tp-p"><span data-zh>${esc(t.alias.join(' · '))}</span></p></div>\n`
      : '';

    /* B3：跨站动作（一条）+ 站内动作（同层其他词）。
     * 跨站那条的措辞是「去哪个站**能拿到什么**」，不是一个光秃秃的站名。 */
    const target = crossTarget(t);
    const act = SITE_ACTION[target];
    const layerCount = layer.terms.length;
    const crossLink = `      <div class="tp-sec">
        <div class="tp-lab">${bi('现在能做什么', 'What you can do now')}</div>
        <p class="tp-p"><a href="${esc(act.href)}">${bi(act.zh, act.en)} ↗</a></p>
        <p class="tp-p"><a href="../../#layer-${esc(String(t.level))}">${bi(`回到名词地图看第${t.level}站的其他 ${layerCount - 1} 个词 →`, `Back to the map: the other ${layerCount - 1} terms in station ${t.level} →`)}</a></p>
      </div>
`;

    /* B3：相关词条 —— 3 个邻近词条（先同 domain 优先，再按层级/序号邻近度）。
     * 排序必须**确定**（同分按 slug），否则每次构建产物都不同、diff 全是噪声。 */
    const near = flat
      .filter((x) => x.t !== t)
      .map((x) => ({
        x,
        sameDomain: x.t.domain === t.domain ? 0 : 1,
        dLayer: Math.abs(Number(x.t.level) - Number(t.level)),
        dOrd: Math.abs(Number(x.t.ord) - Number(t.ord)),
      }))
      .sort((a, b) => (a.sameDomain - b.sameDomain) || (a.dLayer - b.dLayer) || (a.dOrd - b.dOrd) || slugOf(a.x.t).localeCompare(slugOf(b.x.t), 'zh'))
      .slice(0, 3);
    const related = `      <div class="tp-sec">
        <div class="tp-lab">${bi('相关词条', 'Related terms')}</div>
        <p class="tp-p">${near.map(({ x }) => `<a href="../${ENC(slugOf(x.t))}/">${esc(x.t.zh)}</a>`).join(' · ')}</p>
      </div>
`;

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(t.zh)} · 学 AI | 投机取巧</title>
  <meta name="description" content="${esc(metaDesc(t))}" />
  <link rel="canonical" href="https://learn.specul.com/term/${ENC(slug)}/" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="学 AI" />
  <meta property="og:url" content="https://learn.specul.com/term/${ENC(slug)}/" />
  <meta property="og:title" content="${esc(t.zh)} · 学 AI" />
  <meta property="og:description" content="${esc(metaDesc(t))}" />
  <meta name="theme-color" content="#16121f" />
  <link rel="icon" type="image/svg+xml" href="${FAVICON}" />
  <link rel="stylesheet" href="../../brand.css" />
  <link rel="stylesheet" href="../../learn.css" />
  <style>:root { --accent: var(--cyan); }</style>
  <!-- B5：词条页的结构性数据（DefinedTerm） -->
  <script type="application/ld+json">${termJsonLd(t, slug, layer.name)}</script>
</head>
<body class="brand-ambient has-tabbar" style="--accent:var(--cyan)">
${HEADER('learn')}
  <main id="main">
    <div class="container">
      <article class="tp tp-wrap">
        <nav class="tp-crumbs" aria-label="面包屑">
          <a href="../../"><span data-zh>← 名词地图</span><span data-en>← Term map</span></a>
          <span aria-hidden="true">·</span>
          <a href="../../#layer-${esc(String(t.level))}">${bi(layer.name, lv.shortEn || lv.nameEn || layer.name)}</a>
        </nav>
        <h1>${esc(t.zh)}</h1>
        <p class="tp-en">${esc(t.en || '')}</p>
        <ul class="tp-tags">
          <li class="tp-tag">${bi((META.domains[t.domain] || {}).name || t.domain, (META.domains[t.domain] || {}).nameEn || t.domain)}</li>
          <li class="tp-tag">${bi(tagZh, tagEn)}</li>
        </ul>

        <div class="tp-sec">
          <div class="tp-lab">${bi('解决什么问题', 'What problem it solves')}</div>
          <p class="tp-p"><span data-zh>${escMd(t.purpose)}</span><span data-en>${escMd(t.purposeEn || t.purpose)}</span></p>
        </div>

        <div class="tp-sec">
          <div class="tp-lab">${bi('这是什么', 'What it is')}</div>
<span data-zh>
${defList}
</span>
<span data-en>
${defListEn}
</span>
        </div>

        <div class="tp-sec">
          <div class="tp-lab">${bi('为什么需要知道', 'Why it matters')}</div>
          <p class="tp-p"><span data-zh>${escMd(t.why)}</span><span data-en>${escMd(t.whyEn || t.why)}</span></p>
        </div>
${aliasZh}
${related}
${crossLink}
        <div class="tp-sec">
          <div class="tp-lab">${bi('出处', 'Sources')}</div>
          <ul class="tp-refs">
${refs || '        <li class="tp-p">—</li>'}
          </ul>
        </div>

        <nav class="tp-pn" aria-label="上下篇">
${prev ? `          <a href="../${ENC(slugOf(prev.t))}/"><span class="tp-ph">${bi('上一篇', 'Previous')}</span>${esc(prev.t.zh)}</a>` : '          <span></span>'}
${next ? `          <a href="../${ENC(slugOf(next.t))}/" style="text-align:right"><span class="tp-ph">${bi('下一篇', 'Next')}</span>${esc(next.t.zh)}</a>` : '          <span></span>'}
        </nav>
      </article>
    </div>
  </main>
${FOOTER}
${TABBAR}
  <script src="../../brand.js"></script>
</body>
</html>
`;

    const dir = path.join(DEPLOY_TERM, slug);
    const file = path.join(dir, 'index.html');
    const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    if (old === html) continue;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, html, 'utf8');
    pageChanged++;
  }

  /* 清掉不再存在的词条页（改名/删除词条留下的孤儿目录） */
  let removed = 0;
  if (fs.existsSync(DEPLOY_TERM)) {
    for (const e of fs.readdirSync(DEPLOY_TERM, { withFileTypes: true })) {
      if (!e.isDirectory() || wantSlugs.has(e.name)) continue;
      fs.rmSync(path.join(DEPLOY_TERM, e.name), { recursive: true, force: true });
      removed++;
    }
  }

  /* ═══ S23（2026-10-19）· 路径页：learn.specul/path/<id>/index.html ═══
   * 一条路径一个静态页（可分享、可被搜索引擎收录），步骤链到既有词条页。
   * 版式类全部走共享层 brand.css 的 .t-path* / .t-check（宪章 1）——
   * 本文件不写任何路径专属样式；路径页复用的 .tp-* 骨架类住在 learn.css（S26 起）。
   * ⚠ 孤儿清理与词条页同理：paths/ 删了一条，产物页必须一起删，
   *   否则 sitemap 与门禁都会继续看见一条已退役的路径。 */
  const DEPLOY_PATH = path.join(learnDir, 'path');
  const wantPathIds = new Set();
  let pathPages = 0;
  /* 路径页的 meta description：与词条页的 metaDesc 同一套路 ——
   * 把路径**自己已有的内容**（lead → 步数 → 第一条检查点）拼到够长为止，
   * 不堆关键词。第一版只放 lead，实测 42–47 字符，被 seo-basics 判「过短」。 */
  const pathDesc = (p) => {
    let out = plainTxt(p.lead.zh);
    const parts = [`${p.steps.length} 个词 · ${p.span.zh}`, plainTxt(p.checkpoint.zh[0])];
    for (const x of parts) { if (!x) continue; out += ' ' + x; if (esc(out).length >= 70) break; }
    if (esc(out).length > 158) out = out.slice(0, 120).replace(/[\s,，、;；:：\-—]+$/, '') + '…';
    return out;
  };
  for (const p of PATHS) {
    wantPathIds.add(p.id);
    const stepsHtml = p.steps.map((s, i) => {
      const t = flat.find((x) => slugOf(x.t) === s).t;
      return `        <li><a href="../../term/${ENC(slugOf(t))}/">${esc(t.zh)}</a></li>`;
    }).join('\n');
    const ckZh = p.checkpoint.zh.map((c) => `          <li>${esc(c)}</li>`).join('\n');
    const ckEn = p.checkpoint.en.map((c) => `          <li>${esc(c)}</li>`).join('\n');
    const otherPaths = PATHS.filter((q) => q.id !== p.id)
      .map((q) => `<a href="../${q.id}/">${bi(q.zh, q.en)}</a>`).join(' · ');
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(p.zh)} · 学 AI 学习路径 | 投机取巧</title>
  <meta name="description" content="${esc(pathDesc(p))}" />
  <link rel="canonical" href="https://learn.specul.com/path/${p.id}/" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="学 AI" />
  <meta property="og:url" content="https://learn.specul.com/path/${p.id}/" />
  <meta property="og:title" content="${esc(p.zh)} · 学 AI 学习路径" />
  <meta property="og:description" content="${esc(pathDesc(p))}" />
  <meta name="theme-color" content="#16121f" />
  <link rel="icon" type="image/svg+xml" href="${FAVICON}" />
  <link rel="stylesheet" href="../../brand.css" />
  <link rel="stylesheet" href="../../learn.css" />
  <style>:root { --accent: var(--cyan); }</style>
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: p.zh,
    description: plainTxt(p.lead.zh),
    url: `https://learn.specul.com/path/${p.id}/`,
    inLanguage: 'zh-Hans',
    itemListOrder: 'ItemListOrderAscending',
    numberOfItems: p.steps.length,
    itemListElement: p.steps.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://learn.specul.com/term/${ENC(s)}/`,
    })),
  })}</script>
</head>
<body class="brand-ambient has-tabbar" style="--accent:var(--cyan)">
${HEADER('learn')}
  <main id="main">
    <div class="container">
      <article class="tp tp-wrap">
        <nav class="tp-crumbs" aria-label="面包屑">
          <a href="../../"><span data-zh>← 名词地图</span><span data-en>← Term map</span></a>
          <span aria-hidden="true">·</span>
          <span>${bi('学习路径', 'Learning paths')}</span>
        </nav>
        <h1>${bi(p.zh, p.en)}</h1>
        <p class="tp-en">${bi(p.span.zh, p.span.en)}</p>
        <p class="tp-p"><span data-zh>${esc(p.lead.zh)}</span><span data-en>${esc(p.lead.en)}</span></p>

        <div class="tp-sec">
          <div class="tp-lab">${bi('按这个顺序读', 'Read in this order')}</div>
          <ol class="t-pathsteps">
${stepsHtml}
          </ol>
        </div>

        <div class="t-check">
          <div class="t-check-h">${bi('学完自测', 'Checkpoint')}</div>
<span data-zh>
          <ol>
${ckZh}
          </ol>
</span>
<span data-en>
          <ol>
${ckEn}
          </ol>
</span>
        </div>

        <div class="tp-sec">
          <div class="tp-lab">${bi('其他路径', 'Other paths')}</div>
          <p class="tp-p">${otherPaths}</p>
        </div>
      </article>
    </div>
  </main>
${FOOTER}
${TABBAR}
  <script src="../../brand.js"></script>
</body>
</html>
`;
    const dir = path.join(DEPLOY_PATH, p.id);
    const file = path.join(dir, 'index.html');
    const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    if (old !== html) { fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(file, html, 'utf8'); pathPages++; }
  }
  let pathRemoved = 0;
  if (fs.existsSync(DEPLOY_PATH)) {
    for (const e of fs.readdirSync(DEPLOY_PATH, { withFileTypes: true })) {
      if (!e.isDirectory() || wantPathIds.has(e.name)) continue;
      fs.rmSync(path.join(DEPLOY_PATH, e.name), { recursive: true, force: true });
      pathRemoved++;
    }
  }

  /* ═══ S24（2026-10-19）· 指南页：learn.specul/guide/<slug>/index.html ═══
   * slug 与词条同一规则 = 文件名去 .md（URL 稳定身份，zh 是展示名）。
   * 版式：文章骨架复用词条页既有的 tp-* 内联样式（learn 既有模式，不新写第二套）；
   * 指南**新**的版式件（卡片 .t-guidecard、误区块 .t-myth）全部在共享层 brand.css
   * （宪章 1）——本文件不写任何指南专属样式。 */
  const DEPLOY_GUIDE = path.join(learnDir, 'guide');
  const wantGuideSlugs = new Set();
  let guidePages = 0;
  /* meta description 与 pathDesc 同一套路：lead → 第一条要点/结论 → 站名，拼到够长为止。
     myth 类拼 fact 而不是 myth：搜索摘要该说本页的结论，不该把误区原文当成本站主张。 */
  const guideDesc = (g) => {
    let out = plainTxt(g.lead);
    const first = g.kind === 'guide' ? (g.points[0] || '') : plainTxt(g.fact);
    const parts = [first, `学 AI 第${g.station}站微型指南`];
    for (const x of parts) { if (!x) continue; out += ' ' + x; if (esc(out).length >= 70) break; }
    if (esc(out).length > 158) out = out.slice(0, 120).replace(/[\s,，、;；:：\-—]+$/, '') + '…';
    return out;
  };
  const guideJsonLd = (g, slug) => g.kind === 'guide' ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: g.zh,
    description: plainTxt(g.lead),
    url: `https://learn.specul.com/guide/${ENC(slug)}/`,
    inLanguage: 'zh-Hans',
    step: g.points.map((p, i) => ({ '@type': 'HowToStep', position: i + 1, name: plainTxt(p) })),
  }) : JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: g.zh,
    description: plainTxt(g.lead),
    url: `https://learn.specul.com/guide/${ENC(slug)}/`,
    inLanguage: 'zh-Hans',
  });
  for (const g of GUIDES) {
    const slug = path.basename(g.__file).replace(/\.md$/, '');
    wantGuideSlugs.add(slug);
    const lv = META.levels[String(g.station)] || {};
    const refs = (g.refs || []).map((r) =>
      `      <li>${bi(r[0], r[2])} <a href="${esc(r[1])}" target="_blank" rel="noopener">↗</a></li>`).join('\n');
    let bodySec = '';
    if (g.kind === 'guide') {
      const liZh = g.points.map((p) => `      <p class="tp-li">${escMd(p)}</p>`).join('\n');
      const liEn = (g.pointsEn && g.pointsEn.length ? g.pointsEn : g.points).map((p) => `      <p class="tp-li" data-en>${escMd(p)}</p>`).join('\n');
      bodySec = `        <div class="tp-sec">
          <div class="tp-lab">${bi('怎么做', 'How to')}</div>
<span data-zh>
${liZh}
</span>
<span data-en>
${liEn}
</span>
        </div>`;
    } else {
      bodySec = `        <div class="t-myth">
          <p class="t-myth-said">${bi(g.myth, g.mythEn || g.myth)}</p>
          <p class="t-myth-fact">${bi(g.fact, g.factEn || g.fact)}</p>
        </div>`;
    }
    const linked = (g.terms || []).length
      ? `        <div class="tp-sec">
          <div class="tp-lab">${bi('先懂这几个词', 'Terms behind this')}</div>
          <p class="tp-p">${g.terms.map((s) => `<a class="t-guidechip" href="../../term/${ENC(s)}/">${esc(s)}</a>`).join(' ')}</p>
        </div>\n`
      : '';
    const otherGuides = GUIDES.filter((q) => q !== g)
      .map((q) => `<a href="../${path.basename(q.__file).replace(/\.md$/, '')}/">${bi(q.zh, q.en)}</a>`).join(' · ');
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(g.zh)} · 学 AI 微型指南 | 投机取巧</title>
  <meta name="description" content="${esc(guideDesc(g))}" />
  <link rel="canonical" href="https://learn.specul.com/guide/${ENC(slug)}/" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="学 AI" />
  <meta property="og:url" content="https://learn.specul.com/guide/${ENC(slug)}/" />
  <meta property="og:title" content="${esc(g.zh)} · 学 AI 微型指南" />
  <meta property="og:description" content="${esc(guideDesc(g))}" />
  <meta name="theme-color" content="#16121f" />
  <link rel="icon" type="image/svg+xml" href="${FAVICON}" />
  <link rel="stylesheet" href="../../brand.css" />
  <link rel="stylesheet" href="../../learn.css" />
  <style>:root { --accent: var(--gold); }</style>
  <script type="application/ld+json">${guideJsonLd(g, slug)}</script>
</head>
<body class="brand-ambient has-tabbar" style="--accent:var(--gold)">
${HEADER('learn')}
  <main id="main">
    <div class="container">
      <article class="tp tp-wrap">
        <nav class="tp-crumbs" aria-label="面包屑">
          <a href="../../"><span data-zh>← 名词地图</span><span data-en>← Term map</span></a>
          <span aria-hidden="true">·</span>
          <a href="../../#layer-${esc(String(g.station))}">${bi(`第${g.station}站 · ${lv.name || ''}`, `Station ${g.station} · ${lv.shortEn || lv.nameEn || ''}`)}</a>
          <span aria-hidden="true">·</span>
          <span>${bi('微型指南', 'Guide')}</span>
        </nav>
        <h1>${bi(g.zh, g.en)}</h1>
        <p class="tp-en">${bi(`微型指南 · 约 ${g.span} 分钟`, `Guide · about ${g.span} min`)}</p>
        <p class="tp-p"><span data-zh>${escMd(g.lead)}</span><span data-en>${escMd(g.leadEn)}</span></p>
${bodySec}
${linked}
        <div class="tp-sec">
          <div class="tp-lab">${bi('出处', 'Sources')}</div>
          <ul class="tp-refs">
${refs}
          </ul>
        </div>
        <div class="tp-sec">
          <div class="tp-lab">${bi('其他指南', 'Other guides')}</div>
          <p class="tp-p">${otherGuides || '—'}</p>
        </div>
      </article>
    </div>
  </main>
${FOOTER}
${TABBAR}
  <script src="../../brand.js"></script>
</body>
</html>
`;
    const dir = path.join(DEPLOY_GUIDE, slug);
    const file = path.join(dir, 'index.html');
    const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    if (old !== html) { fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(file, html, 'utf8'); guidePages++; }
  }
  let guideRemoved = 0;
  if (fs.existsSync(DEPLOY_GUIDE)) {
    for (const e of fs.readdirSync(DEPLOY_GUIDE, { withFileTypes: true })) {
      if (!e.isDirectory() || wantGuideSlugs.has(e.name)) continue;
      fs.rmSync(path.join(DEPLOY_GUIDE, e.name), { recursive: true, force: true });
      guideRemoved++;
    }
  }

  /* ═══ S39（2026-10-19）· 编年史与版图页：learn.specul/atlas/index.html ═══
   * 一页三栏：时间线 / 公司版图 / 术语演变。数据全部来自 atlas/atlas.json（真相源）。
   * 版式：文章骨架复用 .tp-*（住 learn.css）；版图页**新**的版式件
   * （.t-atlas-tl / .t-atlas-org 等）全部在共享层 brand.css（宪章 1）——
   * 本文件不写任何版图专属样式。术语演变借用 .t-atlas-tl：左槽放英文名。 */
  let atlasWritten = 0;
  if (ATLAS) {
    const atlasDesc = (() => {
      let out = plainTxt(ATLAS.lead.zh);
      const parts = [
        `时间线 ${ATLAS.timeline.length} 条 · 公司 ${ATLAS.orgs.length} 家 · 术语演变 ${ATLAS.terms.length} 条`,
        '学 AI 编年史与版图',
      ];
      for (const x of parts) { if (!x) continue; out += ' ' + x; if (esc(out).length >= 70) break; }
      if (esc(out).length > 158) out = out.slice(0, 120).replace(/[\s,，、;；:：\-—]+$/, '') + '…';
      return out;
    })();
    const tlItem = (dateSlot, titleZh, titleEn, noteZh, noteEn, ref) =>
      `        <li>${dateSlot ? `<span class="t-atlas-date">${esc(dateSlot)}</span>` : ''}<div class="t-atlas-ev">` +
      `<h3>${bi(titleZh, titleEn)}</h3><p>${bi(noteZh, noteEn)} ` +
      `<a href="${esc(ref[1])}" target="_blank" rel="noopener">${bi(ref[0], ref[2])} ↗</a></p></div></li>`;
    const timelineHtml = ATLAS.timeline.map((ev) => tlItem(ev.date, ev.zh, ev.en, ev.note.zh, ev.note.en, ev.ref)).join('\n');
    const termsHtml = ATLAS.terms.map((tm) => tlItem(null, tm.zh, tm.en, tm.note.zh, tm.note.en, tm.ref)).join('\n');
    const orgsHtml = ATLAS.orgs.map((o) =>
      `        <div class="t-atlas-org"><h3>${esc(o.name)}</h3>` +
      `<span class="t-atlas-founded">${bi(`创立 ${o.founded}`, `founded ${o.founded}`)}</span>` +
      `<p>${bi(o.zh, o.en)} <a href="${esc(o.url)}" target="_blank" rel="noopener">官网 ↗</a></p></div>`).join('\n');
    const chipsHtml = ATLAS.links.map((s) => `<a class="t-guidechip" href="../term/${ENC(s)}/">${esc(s)}</a>`).join(' ');
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(ATLAS.zh)} | 投机取巧</title>
  <meta name="description" content="${esc(atlasDesc)}" />
  <link rel="canonical" href="https://learn.specul.com/atlas/" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="学 AI" />
  <meta property="og:url" content="https://learn.specul.com/atlas/" />
  <meta property="og:title" content="${esc(ATLAS.zh)}" />
  <meta property="og:description" content="${esc(atlasDesc)}" />
  <meta name="theme-color" content="#16121f" />
  <link rel="icon" type="image/svg+xml" href="${FAVICON}" />
  <link rel="stylesheet" href="../brand.css" />
  <link rel="stylesheet" href="../learn.css" />
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: ATLAS.zh,
    alternateName: ATLAS.en,
    description: plainTxt(ATLAS.lead.zh),
    url: 'https://learn.specul.com/atlas/',
    inLanguage: 'zh-Hans',
  })}</script>
</head>
<body class="brand-ambient has-tabbar">
${HEADER('learn')}
  <main id="main">
    <div class="container">
      <article class="tp tp-wrap">
        <nav class="tp-crumbs" aria-label="面包屑">
          <a href="../"><span data-zh>← 名词地图</span><span data-en>← Term map</span></a>
          <span aria-hidden="true">·</span>
          <span>${bi('编年史与版图', 'Chronicle & atlas')}</span>
        </nav>
        <h1>${bi(ATLAS.zh, ATLAS.en)}</h1>
        <p class="tp-p"><span data-zh>${escMd(ATLAS.lead.zh)}</span><span data-en>${escMd(ATLAS.lead.en)}</span></p>
        <div class="tp-sec">
          <div class="tp-lab">${bi('关键模型时间线', 'Timeline of key models')}</div>
          <ol class="t-atlas-tl">
${timelineHtml}
          </ol>
        </div>
        <div class="tp-sec">
          <div class="tp-lab">${bi('公司版图', 'Company map')}</div>
          <div class="t-grid t-grid-3">
${orgsHtml}
          </div>
        </div>
        <div class="tp-sec">
          <div class="tp-lab">${bi('术语演变', 'How the vocabulary changed')}</div>
          <ol class="t-atlas-tl">
${termsHtml}
          </ol>
        </div>
        <div class="tp-sec">
          <div class="tp-lab">${bi('先懂这几个词', 'Terms behind this')}</div>
          <p class="tp-p">${chipsHtml}</p>
        </div>
      </article>
    </div>
  </main>
${FOOTER}
${TABBAR}
  <script src="../brand.js"></script>
</body>
</html>
`;
    const atlasDir = path.join(learnDir, 'atlas');
    const atlasFile2 = path.join(atlasDir, 'index.html');
    const atlasOld = fs.existsSync(atlasFile2) ? fs.readFileSync(atlasFile2, 'utf8') : null;
    if (atlasOld !== html) { fs.mkdirSync(atlasDir, { recursive: true }); fs.writeFileSync(atlasFile2, html, 'utf8'); atlasWritten = 1; }
  }

  /* sitemap：1（地图）+ 词条页 + 路径页 + 指南页 + 版图页（S39）。
   * ⚠ 不写 lastmod —— 它推不出来（与 www/llms.txt 同一个理由：不能从内容推导的日期
   *   会让「产物 == 数据」这类比对失去意义）。changefreq / priority 是声明性字段，可以写。 */
  const urls = ['https://learn.specul.com/'];
  for (const { t } of flat) urls.push(`https://learn.specul.com/term/${ENC(slugOf(t))}/`);
  for (const p of PATHS) urls.push(`https://learn.specul.com/path/${p.id}/`);
  for (const slug of wantGuideSlugs) urls.push(`https://learn.specul.com/guide/${ENC(slug)}/`);
  if (ATLAS) urls.push('https://learn.specul.com/atlas/');
  const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u, i) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${i === 0 ? '1.0' : '0.7'}</priority></url>`).join('\n')}
</urlset>
`;
  const smFile = path.join(learnDir, 'sitemap.xml');
  const smOld = fs.existsSync(smFile) ? fs.readFileSync(smFile, 'utf8') : null;
  if (smOld !== sm) { fs.writeFileSync(smFile, sm, 'utf8'); }
  console.log(`词条页：${pageTotal} 个（写入 ${pageChanged} · 清理孤儿 ${removed}）· 路径页：${PATHS.length} 个（写入 ${pathPages} · 清理孤儿 ${pathRemoved}）· 指南页：${GUIDES.length} 个（写入 ${guidePages} · 清理孤儿 ${guideRemoved}）· 版图页：${ATLAS ? 1 : 0} 个（写入 ${atlasWritten}）· sitemap ${urls.length} 条${smOld === sm ? '（未变）' : '（已更新）'}`);
}
