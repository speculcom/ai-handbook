// ============================================================================
// 建站：把 data/series/*.json + data/quantizers/*.md 渲染成静态站
// ----------------------------------------------------------------------------
// 设计：复用 _sites/_template/shell.mjs（品牌唯一真相源），不另起一套 header/footer。
// 产物：site/index.html（系列总览）+ site/series/<code>.html（六区块详情页）
// 时间：秒级（纯本地渲染）
// ============================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERIES, QUANTIZER_NOTES, COMPANION, COMPANION_URL_PREFIX } from '../config.js';
import {syncEditorial} from './sync-editorial.mjs';
import {capacityWorkbench} from './capacity-workbench.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SITE = path.join(ROOT, 'site');
/* 主题回链（2026-11-09）：topics.json 由 _audit/gen-topic-links.mjs 生成在本仓根（R3）。 */
const TOPIC_LINKS = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'topics.json'), 'utf8')); } catch (_) { return {}; }
})();
const topicsLine = (url) => {
  const list = TOPIC_LINKS[url];
  if (!list || !list.length) return '';
  return `    <p class="t-sm dim">${bi('这页出现在主题：', 'This page appears in: ')}${list
    .map((x) => `<a href="https://specul.com/topic-${x.id}.html">${bi(x.zh, x.en)}</a>`)
    .join(' · ')}</p>\n`;
};
/* 品牌 shell 来源（铁律 R3）。
 * 原来无条件读 <工作区>/_sites/_template/shell.mjs —— 那是**主仓**的路径，
 * 克隆 ai-quantized-llm 的人根本没有它，于是构建第一步就 ERR_MODULE_NOT_FOUND。
 * 现在优先用共享核心的 vendored 副本（一致性由 _audit/brand-sync.mjs 守着），
 * 找不到才回退到主仓，保持本地开发的原有行为。
 * S9（2026-10-21）：三仓合并 ai-handbook——共享核心只有一份在仓根 shared/brand/（宪章 3）。 */
const HANDBOOK = path.resolve(ROOT, '..');
const WORKSPACE = path.resolve(ROOT, '..', '..', '..');
const VENDORED = path.join(HANDBOOK, 'shared', 'brand');
const SHELL_SRC = fs.existsSync(path.join(VENDORED, 'shell.mjs'))
  ? path.join(VENDORED, 'shell.mjs')
  : path.join(WORKSPACE, '_sites', '_template', 'shell.mjs');
const { shell, esc, nativeOption } = await import(
  'file:///' + SHELL_SRC.replace(/\\/g, '/')
);

/* ⚠ 2026-10-10：原 '#22d3c5'（青色 accent）已取消 —— 分站专属色不再使用。
   * 改为 null：--accent 落回 brand.css 的 var(--brand)，六站统一为品牌紫 ✓
   * 保留 ACCENT 这个名字是为了 shell() 的调用点不必改（两处传值）。 */
const ACCENT = null;
/* 双语节点（2026-10-04）。
 * models 是静态站点：语言切换只切 <html lang> / data-lang，**DOM 不重渲染**
 * → 构建期不能判断语言，必须同时给出中英，由 brand.css 的 [data-lang] 选显。
 * ⚠ 不做 HTML 转义：这些文本含 <b> / <code> / <a>（强调位置是判断的一部分）。
 *   它们是源码里的常量，无注入风险；外部数据（模型名等）仍走 esc()。 */
function bi(zh, en) {
  return `<span data-zh>${zh}</span><span data-en>${en}</span>`;
}

/* 数据层枚举的英文（positions / tier / tierDesc / params）—— 2026-10-04。
 * 这些是**封闭枚举**（可穷举），与自由文本（summary / 各变体的 what / why）不同。
 * 缺键时回退中文（可接受降级），构建时 warn 报缺失数。*/
let ENUMS_EN = {};
try {
  /* HERE = <root>/_data/handbook/models/scripts →到 <root>/_audit 需要三级 .. */
  ENUMS_EN = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'enums.en.json'), 'utf8'));
} catch (e) {
  throw new Error('枚举英文读不到：' + e.message);
}

/* 成员备注的英文（2026-10-04）。键 = `<seriesCode>|<repo 名>`。
 * 这批含**法律判断**（"许可为 other，须读发布页原文"）→ 强度必须保留，
 * 软化成 note 会让读者以为可以直接用。 */
/* 系列简介的英文（2026-10-04）。键 = 系列 code。 */
let SUMMARY_EN = {};
try {
  SUMMARY_EN = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'summaries.en.json'), 'utf8'));
} catch (e) {
  console.warn('  ! _models-summaries.en.json 读不到，系列简介保持中文：' + e.message);
}
const sumKeys = Object.keys(SUMMARY_EN).filter(k => !k.startsWith('_'));
if (sumKeys.length) console.log(`  · 系列简介英文：${sumKeys.length} 条已加载`);

let NOTE_EN = {};
try {
  NOTE_EN = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'member-notes.en.json'), 'utf8'));
} catch (e) {
  console.warn('  ! _member-notes.en.json 读不到，成员备注保持中文：' + e.message);
}
const noteEnKeys = Object.keys(NOTE_EN).filter(k => !k.startsWith('_'));
if (noteEnKeys.length) console.log(`  · 成员备注英文：${noteEnKeys.length} 条已加载`);
/* 取枚举的英文；缺键回退中文原值 */
function EN(group, value) {
  const g = ENUMS_EN[group];
  if (!g || value == null) return value == null ? '' : String(value);
  const en = g[String(value)];
  return en === undefined ? String(value) : en;
}

/* 词级映射：数据值里混着中文词（如'27.8B 密集'）时，整串查表必然查不到
 * —— 映射表按「词」建，所以要逐词替换。 */
const EN_WORDS = {
  '密集': 'dense',
  '稀疏': 'sparse',
  '总参': 'total params',
  '激活数未公开': 'activation count not disclosed',
  '激活': 'active',
  '约': 'approx. ',
};
function ENWords(s) {
  let out = String(s == null ? '' : s);
  for (const zh of Object.keys(EN_WORDS)) {
    if (out.indexOf(zh) >= 0) out = out.split(zh).join(EN_WORDS[zh]);
  }
  return out;
}

/* 量化档名的词级英文（C0-19，2026-10-26）。档名里混着本站起的中文描述
 * （「作者标注 3.49bpw」= 量化者没写 bpw、按文件名推导口径；「其他」= 未识别档），
 * 与 params 的 EN_WORDS 同型：数据层不动（中文态原样），渲染层英文槽替换。 */
const QEN_WORDS = { '作者标注': 'author-stated', '其他': 'other' };
function QEN(s) {
  let out = String(s == null ? '' : s);
  for (const zh of Object.keys(QEN_WORDS)) {
    if (out.indexOf(zh) >= 0) out = out.split(zh).join(QEN_WORDS[zh]);
  }
  return out;
}

const DOMAIN = 'https://models.specul.com/';

// ── 读数据 ──────────────────────────────────────────────────────────────
console.log(`  · 编辑文案同步：${syncEditorial()} 份快照（不改变采集字段与日期）`);
const seriesList = fs.readdirSync(path.join(ROOT, 'data', 'series'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'series', f), 'utf8')));

/* v7 S51：家族谱系卡（「开放权重该怎么选」的第一层：选家族/代次/尺寸/许可）。
 * 与 series（第二层：量化版）平行。真相源 data/families/*.json。 */
const familyList = (fs.existsSync(path.join(ROOT, 'data', 'families'))
  ? fs.readdirSync(path.join(ROOT, 'data', 'families')).filter((f) => f.endsWith('.json'))
  : []
).map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'families', f), 'utf8')));

/* v7 S54：闭源谱系卡（data/closed/*.json）。本站主体仍是开放权重选型，
 * 闭源卡回答的是对照面的问题：这家 API 现在哪一代、官方规格声明是什么、
 * 我们上次核验是什么时候——每条事实挂官方出处，每张卡带复核到期日。
 * ⚠ D9：卡内不采价格数字，只放官方定价页链接。 */
const closedList = (fs.existsSync(path.join(ROOT, 'data', 'closed'))
  ? fs.readdirSync(path.join(ROOT, 'data', 'closed')).filter((f) => f.endsWith('.json'))
  : []
).map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'closed', f), 'utf8')));

/* v7 S55：做模型专题（guides/*.md · 训练四阶段等方法论文章）。
 * 格式对齐 agent 仓 SCHEMA §十；正文节标题写 `## [中文|English]`，渲染成 bi 双节点。
 * frontmatter 是刻意简单的 YAML 子集（validate.mjs 第 8 节按同一子集校验，两边口径一致）。 */
const guideList = (() => {
  const dir = path.join(ROOT, 'guides');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort().map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!fm) return null;
    const get = (k) => {
      const m = fm[1].match(new RegExp('^' + k + ':[ \\t]*(\\S.*)$', 'm'));
      return m ? m[1].trim().replace(/^"|"$/g, '') : '';
    };
    const sources = [];
    const srcBlock = fm[1].match(/^sources:\r?\n((?:(?:[ \t]+.*)\r?\n?)*)/m);
    if (srcBlock) {
      let cur = null;
      for (const line of srcBlock[1].split(/\r?\n/)) {
        if (/^[ \t]*-[ \t]+label:/.test(line)) { cur = { label: line.replace(/^[ \t]*-[ \t]+label:[ \t]*/, '').trim() }; sources.push(cur); continue; }
        const m2 = /^[ \t]+(url|kind):[ \t]*(\S.*)$/.exec(line);
        if (m2 && cur) cur[m2[1]] = m2[2].trim();
      }
    }
    const body = raw.slice(fm[0].length);
    const sections = [];
    for (const part of body.split(/^## /m).slice(body.startsWith('## ') ? 1 : 0)) {
      const nl = part.indexOf('\n');
      if (nl < 0) continue;
      sections.push({ head: part.slice(0, nl).trim(), text: part.slice(nl + 1).trim() });
    }
    return {
      id: get('id'), stage: get('stage'), title: get('title'), titleEn: get('titleEn'),
      summary: get('summary'), summaryEn: get('summaryEn'),
      lastVerified: get('last_verified'), confidence: get('confidence'),
      sources, sections,
    };
  }).filter(Boolean);
})();

/* C0-18（2026-10-26）：guides 正文英译 —— i18n/guides/<id>.en.json（本仓内，铁律 R3）。
 * 机制对齐 tools 仓 bodies：sections 按 frontmatter 之后 `## ` 节**索引**对齐，
 * sources 按 frontmatter sources **索引**对齐；缺文件/缺键诚实降级中文（宁缺勿错配）。
 * 节标题本身在 md 里已是 [zh|en] 双语，不在译文文件。数量不一致 → 整节回退中文。 */
const GUIDE_EN = {};
{
  const gdir = path.join(HERE, '..', 'i18n', 'guides');
  if (fs.existsSync(gdir)) {
    for (const f of fs.readdirSync(gdir).filter((x) => x.endsWith('.en.json'))) {
      try {
        GUIDE_EN[f.replace(/\.en\.json$/, '')] = JSON.parse(fs.readFileSync(path.join(gdir, f), 'utf8'));
      } catch (e) {
        console.warn('  ! guides 译文读不到，该篇保持中文：' + f + ' —— ' + e.message);
      }
    }
  }
  const n = Object.keys(GUIDE_EN).length;
  if (n) console.log(`  · guides 正文英文：${n} 篇已加载`);
}

const quantizerDocs = {};
const qDir = path.join(ROOT, 'data', 'quantizers');
if (fs.existsSync(qDir)) {
  for (const f of fs.readdirSync(qDir).filter((x) => x.endsWith('.md'))) {
    quantizerDocs[f.replace(/\.md$/, '')] = fs.readFileSync(path.join(qDir, f), 'utf8');
  }
}

/* 量化者说明的英文版（2026-10-04）—— i18n/_quantizers.en.md（本仓内，铁律 R3）。
 * 这批文档含**判断与立场标记**（「这是我们的口径，不是实测结论」「不适合谁」），
 * 翻译时必须保留这些标记 —— 它们是本站的诚实边界。
 * 缺文档时回退中文（可接受降级），构建时 warn 报缺了几份。 */
const quantizerDocsEn = {};
try {
  const qEn = fs.readFileSync(path.join(HERE, '..', 'i18n', '_quantizers.en.md'), 'utf8');
  // 按 `## <name>` 切分 —— 文件是 markdown，用二级标题分节
  const parts = qEn.split(/^## /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const name = part.slice(0, nl).trim();
    if (name) quantizerDocsEn[name] = part.slice(nl + 1).trim();
  }
} catch (e) {
  console.warn('  ! _quantizers.en.md 读不到，量化者说明保持中文：' + e.message);
}
const qEnKeys = Object.keys(quantizerDocsEn);
if (qEnKeys.length) console.log(`  · 量化者说明英文：${qEnKeys.length} 份已加载`);

// ── 许可显示 ────────────────────────────────────────────────────────────
const LOOSE = /^(apache-2\.0|mit|bsd-3-clause|bsd-2-clause|isc|0bsd|cc0-1\.0|unlicense)$/i;
// asSpan=true 时输出 <span> 而非 <a> —— 用于「外层已是 <a>」的场景。
// 嵌套 <a> 是非法 HTML：浏览器解析到内层 </a> 就会关闭外层 <a>，
// 导致它后面的兄弟节点全部被移出卡片（实测 .scard-lic / .scard-go 直接从 DOM 消失）。
function licBadge(lic, { asSpan = false } = {}) {
  if (!lic) return `<span class="lic lic-unknown">${bi('许可缺失', 'no licence stated')}</span>`;
  const loose = LOOSE.test(lic);
  const cls = `lic ${loose ? 'lic-loose' : 'lic-tight'}`;
  if (asSpan) return `<span class="${cls}">${esc(lic)}</span>`;
  return `<a class="${cls}" href="https://huggingface.co/search?license=${encodeURIComponent(lic)}" target="_blank" rel="noopener">${esc(lic)}</a>`;
}
const NEEDS_REVIEW = /^(other|unknown|cc-by|gpl|agpl|openrail|bigscience|noassertion)/i;

// ── 中文生态透镜（v7 S52 · 2026-10-20）────────────────────────────────
// 「国产 / 国内可直接用 / 备案状态」——总纲 §1.7 缺口 #2，models 与 tools 共用同一字段口径。
// 版式复用 brand.css 的 .t-tag / .t-state（宪章 1：不新造组件）。
// 数据纪律见 validate.mjs 第 6 节：枚举封闭、filed 必带编号、not-filed 必带检索口径 note。
const CN_ORIGIN_LABEL = { domestic: ['国产', 'domestic'], foreign: ['国外出品', 'foreign-made'] };
const CN_DIRECT_LABEL = { yes: ['国内可直连', 'direct OK'], no: ['直连不可达', 'direct blocked'], unknown: ['直连未核验', 'direct unknown'] };
const CN_FILING_LABEL = { filed: ['已备案', 'filed'], 'not-filed': ['未见于备案名单', 'not in filing list'], unknown: ['备案未核验', 'filing unknown'] };
function cnChips(cn) {
  if (!cn) return '';
  const out = [];
  if (CN_ORIGIN_LABEL[cn.origin]) out.push(`<span class="t-tag${cn.origin === 'domestic' ? '' : ' is-cyan'}">${bi(CN_ORIGIN_LABEL[cn.origin][0], CN_ORIGIN_LABEL[cn.origin][1])}</span>`);
  if (CN_DIRECT_LABEL[cn.direct]) out.push(`<span class="t-tag${cn.direct === 'yes' ? ' is-cyan' : ''}">${bi(CN_DIRECT_LABEL[cn.direct][0], CN_DIRECT_LABEL[cn.direct][1])}</span>`);
  if (cn.filing && CN_FILING_LABEL[cn.filing.status]) {
    const dot = cn.filing.status === 'filed' ? ' is-ok' : (cn.filing.status === 'unknown' ? ' is-warn' : '');
    out.push(`<span class="t-state${dot}">${bi(CN_FILING_LABEL[cn.filing.status][0], CN_FILING_LABEL[cn.filing.status][1])}</span>`);
  }
  return out.join(' ');
}
/* 详情页的「中文生态」节：三行判断 + 依据 + 出处 + 快照日。
 * 每行都回答「这个结论怎么来的」——备案抄公示原文编号，直连写实测日期与渠道。 */
function cnSection(cn) {
  if (!cn) return '';
  const f = cn.filing || {};
  const filingRow = f.status === 'filed'
    ? `${bi('已备案', 'Filed')}：<code>${esc(f.no || '')}</code>　${bi('公示名称', 'listed as')}<span lang="zh-CN" data-source-name>「${esc(f.name || '')}」</span>　·　${bi('备案时间', 'filed')} ${esc(f.date || '')}${f.note ? `　·　${bi(esc(f.note), esc(f.noteEn || f.note))}` : ''}`
    : `${bi(CN_FILING_LABEL[f.status] ? CN_FILING_LABEL[f.status][0] : '备案未核验', CN_FILING_LABEL[f.status] ? CN_FILING_LABEL[f.status][1] : 'filing unknown')}${f.note ? `：${bi(esc(f.note), esc(f.noteEn || f.note))}` : ''}`;
  const mirrorRow = cn.mirror
    ? `　·　<a href="${esc(cn.mirror)}" target="_blank" rel="noopener">${bi('国内镜像入口', 'domestic mirror')}</a>`
    : '';
  return `
    <section class="fam-sec cn-sec">
      <h2>${bi('中文生态', 'China availability')} <small>${bi('国产 / 国内可直接用 / 备案状态 · 快照', 'domestic / direct access / CAC filing · snapshot')} ${esc(cn.last_verified || '')}</small></h2>
      <ul class="fam-claims cn-rows">
        <li><b>${bi('出品属地', 'Origin')}</b>　${bi(CN_ORIGIN_LABEL[cn.origin] ? CN_ORIGIN_LABEL[cn.origin][0] : '?', CN_ORIGIN_LABEL[cn.origin] ? CN_ORIGIN_LABEL[cn.origin][1] : '?')}　${bi(esc(cn.originNote || ''), esc(cn.originNoteEn || cn.originNote || ''))}</li>
        <li><b>${bi('国内下载', 'Direct access')}</b>　${bi(CN_DIRECT_LABEL[cn.direct] ? CN_DIRECT_LABEL[cn.direct][0] : '?', CN_DIRECT_LABEL[cn.direct] ? CN_DIRECT_LABEL[cn.direct][1] : '?')}　${bi(esc(cn.directNote || ''), esc(cn.directNoteEn || cn.directNote || ''))}${mirrorRow}</li>
        <li><b>${bi('备案状态', 'CAC filing')}</b>　${filingRow}</li>
      </ul>
      <p class="fam-claims-note">${bi('备案信息以网信办《生成式人工智能服务已备案信息》公示名单为准（按批次滚动更新，本站只抄编号不解读）；「国内可直连」是本站探测环境中的可达性记录，不是厂商承诺。', 'Filing status is quoted from the CAC public registry (updated batch by batch; this site copies the number and does not interpret it). "Direct access" is this site\'s own reachability measurement from a mainland network, not a vendor promise.')}</p>
      <ul class="fam-src-list cn-srcs">${(cn.sources || []).map((s) => `<li>${bi(esc(s.label) + '：', esc(s.labelEn || s.label) + ': ')}<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a></li>`).join('')}</ul>
    </section>`;
}

// 量化仓自己没写 license 字段时，backfill-license.mjs 会继承基座许可并打上这两个标记。
// 继承在著作权上是必然的（量化只是对权重做舍入/缩放/imatrix 加权的数学变换，不新增也不删除
// 原始表达），但「谁做的量化、用的什么 imatrix」是量化者自己的行为 —— 所以标注出来，
// 让读者知道这个许可值是推断来的、且需要自己去读基座原文。
function licInheritedNote(v, { small = true } = {}) {
  if (!v || !v.licenseInherited) return '';
  const cls = small ? 'warn-inline small' : 'warn-inline';
  return `<br><span class="${cls}">${bi('继承自基座', 'Inherited from base')} <code>${esc(v.licenseFrom || '?')}</code>${bi('　·　量化仓未单独声明许可', ' · the quant repo declares no licence of its own')}</span>`;
}

// ── 数字格式 ────────────────────────────────────────────────────────────
const fmtGB = (n) => (n >= 10 ? n.toFixed(0) : n.toFixed(1)) + ' GB';
const fmtNum = (n) => {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'k';
  return String(n);
};
const fmtDate = (iso) => (iso ? iso.slice(0, 10) : '—');
// 参数量：按人类习惯选单位（2780 亿 → 2.78T），不出现「2779.93B」这种别扭写法。
const fmtB = (n) => {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(0) + 'M';
  return fmtNum(n);
};
// 显存估算（B 级推导）：权重体积 + KV cache
// KV ≈ 2 (K+V) × layers × kvDim × ctx × bytesPerElem；MoE 需总参，架构差异大 → 只给区间
function vramRange(f) {
  const w = f.sizeGB;
  return bi(`初筛约 ${Math.ceil(w * 1.15)} GB（文件 × 1.15；缓存另算）`, `Filter: about ${Math.ceil(w * 1.15)} GB (file × 1.15; cache separate)`);
}

const TIER_ORDER = ['近似无损', '保守档', '平衡档', '长上下文优先', '极限压缩', '未识别'];
function tierOf(t) { return TIER_ORDER.indexOf(t); }

// ═════════════════════════════════════════════════════════════════════════
// 组件
// ═════════════════════════════════════════════════════════════════════════

/** 顶部：可信度分级说明（每页都带，这是本站的差异化） */
function trustBanner() {
  return `    <section class="trust">
      <h2>${bi('先说清楚：这个站的数据怎么来的', "First, where this site's data comes from")}</h2>
      <div class="trust-grid">
        <div class="trust-item t-a">
          <span class="trust-tag">✅ ${bi('实测字段','Measured fields')}</span>
          <p>${bi('直接从 Hugging Face 公开 API 读取的客观数据：文件体积（字节）、上下文长度、架构、许可、下载量、更新时间。', 'Objective data read straight from the Hugging Face public API: file sizes in bytes, context length, architecture, licence, downloads, last updated.')}</p>
        </div>
        <div class="trust-item t-b">
          <span class="trust-tag">✅ ${bi('推导','Derived')}</span>
          <p>${bi('由采集字段按公开规则算出：每权重比特数（依 llama.cpp 命名标准）、档位归属、显存需求区间。推导规则在', 'Computed from the collected fields by published rules: bits per weight (per the llama.cpp naming convention), tier assignment, VRAM requirement range. The rules are fully published in')} <code>METHODOLOGY.md</code>${bi(' 完整公开，任何人可复算。',' — anyone can recompute them.')}</p>
        </div>
        <div class="trust-item t-c">
          <span class="trust-tag">❌ ${bi('我们不说的','What we do not claim')}</span>
          <p>${bi('<b>哪个量化质量更高、哪个更快、哪个模型更强</b>——这些需要实测，本站不跑 benchmark，所以不装作知道。凡我们给出的主观判断，一律显式标注「我们的口径」。', '<b>Which quantisation is higher quality, which is faster, which model is stronger</b> — these need measurement. This site does not run benchmarks, so it does not pretend to know. Every subjective judgement we do offer is explicitly marked as our own reading.')}</p>
        </div>
      </div>
      <p class="trust-foot">
        ${bi('本站','This site does')} <b>${bi('不下载、不托管任何模型权重文件','not download or host any model weight files')}</b>${bi('。所有数字都来自公开元数据，点击即可回到发布页核对。','. Every figure comes from public metadata, and clicking it takes you back to the release page to verify.')}
        ${bi('采集时间','Collected')}: <code>${esc(seriesList[0]?.collectedAt?.slice(0, 10) || '')}</code>${bi('（数据快照，非实时）',' (a snapshot, not live)')}
      </p>
    </section>`;
}

/**
 * 架构 / 上下文长度实际存在**变体级**（各量化仓独立申报，同一模型不同仓可能不同），
 * 成员级没有这两个字段。A 区要展示的是「这个模型的情况」，
 * 所以：取值域唯一就直接显示，出现分歧就列出全部并标注分歧。
 */
function memberField(m, key) {
  const vals = [...new Set((m.variants || []).map((v) => v[key]).filter(Boolean))];
  return { vals, single: vals.length === 1 ? vals[0] : null, conflict: vals.length > 1 };
}

/** 系列页 · A 区块：基础模型卡 */
function blockA(s, m) {
  const arch = memberField(m, 'architecture');
  const ctx = memberField(m, 'contextLength');
  const archCell = arch.single
    ? `<code>${esc(arch.single)}</code>`
    : arch.conflict
      ? `${arch.vals.map((v) => `<code>${esc(v)}</code>`).join(' / ')} ${bi('（各量化仓申报不一）',' (quant repos declare this differently)')}`
      : '<span class="muted">— ' + bi('未申报', 'not declared') + '</span>';
  const ctxCell = ctx.single
    ? `<code>${Number(ctx.single).toLocaleString('en-US')}</code> tokens`
    : ctx.conflict
      ? `${ctx.vals.map((v) => `<code>${Number(v).toLocaleString('en-US')}</code>`).join(' / ')} tokens ${bi('<span class="muted small">（各量化仓申报不一）</span>', '<span class="muted small"> (quant repos declare this differently)</span>')}`
      : '<span class="muted">— ' + bi('未申报', 'not declared') + '</span>';

  // ── 参数量：三个独立来源并排，让用户自己判断信哪个 ──
  // 官网标注（人工核过发布页）/ HF 官方 API 申报（safetensors 张量计数）/
  // 实测反推（GGUF 文件字节 ÷ 该档 bpw）。三者一致时可信度最高。
  const dp = m.declaredParams || null;
  const dv = m.derivedParams || null;
  const paramRows = [
    [bi('官网标注', 'Vendor states'), `<b>${bi(esc(m.params || '—'), esc(m.paramsEn || ENWords(m.params || '—')))}</b>`],
    [bi('官方 API 申报', 'Official API'), dp ? `${fmtB(dp)} ${bi('<span class="muted small">（按 safetensors 张量逐个计数）</span>', '<span class="muted small"> (counted per safetensors tensor)</span>')}` : '<span class="muted">—</span>'],
    [bi('本站实测反推', 'This site, measured'), dv ? `${fmtB(dv)} ${bi('<span class="muted small">（GGUF 字节 ÷ 该档 bpw，取最密集簇中位）</span>', '<span class="muted small"> (GGUF bytes ÷ tier bpw, median of the densest cluster)</span>')}` : '<span class="muted">—</span>'],
  ];
  // 两来源偏差 > 4% 时明确提示：反推受 bpw 表误差与未训练张量影响，官方申报为准。
  const dvDelta = dp && dv ? ((dv - dp) / dp) * 100 : null;
  const paramNote = dvDelta === null ? '' :
    Math.abs(dvDelta) < 4
      ? `${bi(`<p class="param-ok">✓ 官方申报与实测反推一致（偏差 ${dvDelta.toFixed(1)}%），参数量可信。</p>`, `<p class="param-ok">✓ Vendor figure and our reverse-derived figure agree (${dvDelta.toFixed(1)}% apart) — the parameter count is trustworthy.</p>`)}`
      : `${bi(`<p class="warn-inline">⚠ 实测反推与官方申报差 ${Math.abs(dvDelta).toFixed(0)}%（反推${dvDelta > 0 ? '偏大' : '偏小'}）。原因是 bpw 表为标称值、且部分张量（嵌入层、视觉塔）不按主档位量化。<b>以官方申报为准</b>。</p>`,
             `<p class="warn-inline">⚠ Our reverse-derived figure differs from the vendor figure by ${Math.abs(dvDelta).toFixed(0)}% (ours ${dvDelta > 0 ? 'runs high' : 'runs low'}). Reason: the bpw table is nominal, and some tensors (embeddings, vision towers) are not quantised at the main tier. <b>The vendor figure is authoritative.</b></p>`)}`;

  const paramCell = `<table class="kv kv-nested">
        <tbody>
${paramRows.map(([k, v]) => `          <tr><th>${k}</th><td>${v}</td></tr>`).join('\n')}
        </tbody>
      </table>${paramNote}`;

  // ── 权重精度构成：官方 API 按张量精度分类的计数 ──
  // 这个字段信息量很大：MoE 专家常原生就存 U8/I8，与主档位无关。
  const bd = m.declaredBreakdown?.parameters;
  const bdCell = bd && Object.keys(bd).length
    ? `<table class="prec"><tbody>${Object.entries(bd)
        .sort((a, b) => b[1] - a[1])
        .map(([p, n]) => {
          const tot = Object.values(bd).reduce((x, y) => x + y, 0);
          const pct = ((n / tot) * 100).toFixed(1);
          return `<tr><td><code>${esc(p)}</code></td><td class="prec-bar"><span style="width:${Math.max(0.6, (n / tot) * 100).toFixed(1)}%"></span></td><td>${fmtB(n)}　<span class="muted small">${pct}%</span></td></tr>`;
        }).join('')}</tbody></table>`
    : '<span class="muted">—</span>';

  // ── 标签：过滤后只留下有决策价值的（许可/论文/任务类型/推理框架） ──
  const tagCell = (m.tags || []).length
    ? (m.tags || []).map((t) => {
        let cls = 'tag';
        if (/^license:/.test(t)) cls += ' tag-lic';
        else if (/^arXiv:/.test(t)) cls += ' tag-paper';
        else if (/^(vllm|llama\.cpp|mlx|onnx|openvino|tgi|webgpu|webnn|candle|sgml|compressed-tensors)$/i.test(t)) cls += ' tag-rt';
        const href = /^arxiv:/i.test(t)
          ? `https://arxiv.org/abs/${t.slice(6)}`
          : /^license:apache-2\.0$/i.test(t) ? 'https://www.apache.org/licenses/LICENSE-2.0'
            : /^license:mit$/i.test(t) ? 'https://opensource.org/license/mit'
              : null;
        return href ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${esc(t)}</a>` : `<span class="${cls}">${esc(t)}</span>`;
      }).join(' ')
    : '<span class="muted">—</span>';

  // 访问门槛：gated 模型要先申请、同意才能下载，这是选型时的硬约束。
  const accessCell = m.gated
    ? bi('<b class="warn-inline">🔒 需申请授权</b>　<span class="muted">Hugging Face 上该仓为 gated，下载前需登录并获得发布方授权。</span>',
         '<b class="warn-inline">🔒 Approval required</b>　<span class="muted">This repo is gated on Hugging Face — sign in and obtain the publisher\'s approval before downloading.</span>')
    : bi('✅ 公开下载　<span class="muted">无需申请</span>',
         '✅ Public download　<span class="muted">no application needed</span>');

  // 基座：微调版要说明它是从哪个基座来的
  const baseModel = m.baseModel
    ? (Array.isArray(m.baseModel) ? m.baseModel : [m.baseModel]).filter(Boolean)
        .map((b) => `<code>${esc(String(b).split('/').pop())}</code>`).join(' / ')
    : (m.isBase ? bi('<span class="muted">本仓即基座（不是微调版）</span>', '<span class="muted">this repo is the base model, not a fine-tune</span>') : '<span class="muted">—</span>');

  const storage = m.usedStorage
    ? `${bi(`<b>${fmtGB(m.usedStorage / 1e9)}</b>　<span class="muted small">该仓全部文件合计，含各精度原始权重</span>`, `<b>${fmtGB(m.usedStorage / 1e9)}</b>　<span class="muted small">all files in the repo combined, including original weights at every precision</span>`)}`
    : '<span class="muted">—</span>';

  const capCell = (key) => {
    const c = m.caps?.[key];
    if (!c) return '<span class="muted">— ' + bi('未核实', 'not verified') + '</span>';
    const mark = c.v === 'yes'
      ? bi('<b>✓ 支持</b>', '<b>✓ Supported</b>')
      : c.v === 'no'
        ? bi('<b>✗ 不支持</b>', '<b>✗ Not supported</b>')
        : bi('<b>未知</b>', '<b>Unknown</b>');
    const src = c.url
      ? ` <a class="lic-src" href="${esc(c.url)}" target="_blank" rel="noopener">${bi('出处 ↗', 'source ↗')}</a>`
      : '';
    const meta = ` <span class="muted small">${c.src === 'model-card' ? bi('模型卡', 'model card') : esc(c.src)}${c.date ? ' · ' + esc(c.date) : ''}</span>`;
    const note = c.note?.zh ? `<br><span class="muted small">${bi(esc(c.note.zh), esc(c.note.en || c.note.zh))}</span>` : '';
    return `${mark}${src}${meta}${note}`;
  };
  const rows = [
    [bi('官方发布页', 'Official release page'), `<a href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.repo)} ↗</a><br><span class="muted small">${esc(m.modelType ? 'HF model_type：' + m.modelType : '')}${m.hfArch?.length ? '　·　' + esc(m.hfArch.join(' / ')) : ''}</span>`],
    [bi('许可', 'Licence'), `${licBadge(m.license)}${m.licenseName ? ` <code>${esc(m.licenseName)}</code>` : ''}${m.licenseLink ? ` <a class="lic-src" href="${esc(m.licenseLink)}" target="_blank" rel="noopener">${bi('许可原文 ↗', 'licence text ↗')}</a>` : ''}${NEEDS_REVIEW.test(m.license || '') ? bi('<p class="warn-inline">⚠ 非宽松许可，<b>以发布页原文为准</b>。本站不解读许可条款，也不给法律意见。</p>', '<p class="warn-inline">⚠ Non-permissive licence — <b>the release page is authoritative</b>. This site does not interpret licence terms or give legal advice.</p>') : ''}`],
    [bi('访问门槛', 'Access'), accessCell],
    [bi('规模', 'Scale'), paramCell],
    [bi('权重精度构成', 'Precision breakdown'), bdCell],
    [bi('架构', 'Architecture'), archCell],
    [bi('上下文长度', 'Context length'), ctxCell],
    [bi('基座', 'Base model'), baseModel],
    [bi('任务类型', 'Task type'), m.pipelineTag ? `<code>${esc(m.pipelineTag)}</code>` : '<span class="muted">—</span>'],
    [bi('输入模态', 'Input modality'), capCell('modality')],
    [bi('工具调用', 'Tool calling'), capCell('tools')],
    [bi('定位', 'Role'), bi(esc(m.role?.zh || ''), esc(m.role?.en || m.role?.zh || ''))],
    [bi('标签', 'Tags'), tagCell],
    [bi('官方下载量', 'Downloads'), `<b>${fmtNum(m.downloads)}</b>　<span class="muted">${bi('点赞','likes')} ${fmtNum(m.likes)}</span>`],
    [bi('发布日', 'Released'), m.createdAt ? fmtDate(m.createdAt) : '<span class="muted">—</span>'],
    [bi('最近更新', 'Last updated'), fmtDate(m.lastModified)],
    [bi('发布页体积', 'Release-page size'), storage],
  ];
  return `      <table class="kv">
${rows.map(([k, v]) => `        <tr><th>${k}</th><td>${v}</td></tr>`).join('\n')}
      </table>
      ${m.note ? `      <p class="member-note">${bi(esc(m.note), esc(NOTE_EN[s.code + '|' + m.repo.split('/').pop()] || m.note))}</p>` : ''}`;

}

/** 系列页 · B 区块：该选哪个（决策区） */
function blockB(s, m) {
  // 汇总所有变体里各档位的最小体积 → 给出「按你的显存选哪档」。
  //
  // 取最小值的前提是「同名档位的体积差异只来自不同量化者的实现差异」。
  //
  // ⚠ 2026-11-03 硬伤修复：投机解码草稿模型（dflash / eagle3 / medusa / draft / DSpark）
  // 是**辅助网络**，不是主权重。它们的文件名带 Q8_0 / MXFP4 等档位词，体积只有主模型的
  // 几十分之一；若不排除，B 区会把它当成同档位最小体积推荐给用户
  // （实测：Qwen3.8-27B 的 dflash-Q8_0 2.06 GB 被推荐进 12 GB 显存档；
  // DeepSeek-V4.1-Flash 的 DSpark-MXFP4 7.97 GB 被推荐进 12 GB 档）。
  // 数据层已由 fix-draft-models.mjs 剔除；这里再加一道防线，防止重新采集后回灌。
  const AUX_FILE = /^(?:dflash[-_]|eagle\d?[-_]|medusa[-_]|draft[-_]|dspark[-_])|(?:[-_])(?:dflash|eagle\d?|medusa|draftmodel|dspark)(?:[-_.]|$)/i;
  const isAux = (f) => AUX_FILE.test(String(f.name || '').replace(/\.gguf$/i, ''));
  // 实测（Qwen3.8-27B / gemma-4-E4B 等）同档名确实会带出不同的权重布局：
  //   -AD-<bpw>- 前缀（all-density 混合精度，bpw 更低 → 体积更小）
  //   -PLEQ4_0 后缀（动态上下文扩展附加）
  //   -DENSE 后缀（Kimi-K3-UD-IQ1_S_DENSE 320GB vs 非 DENSE 594GB）
  //   bf16_q8_0 / f16_q8_0（精度标注变体，通常更大）
  // 取最小值 = 「最省的可行方案」，这与「按显存选档」的目的（找能装下的最轻档）一致；
  // 但必须把「该档存在多个变体、体积跨度多少」如实标出来，否则用户会以为
  // 同一档名的所有文件都长这样。变体数与跨度记在 n / span 上，在展开表里显示。
  const byQuant = new Map();
  for (const v of m.variants) {
    for (const f of v.files) {
      // 注意：isSharded 的文件在采集阶段已按「去掉 -NNNNN-of-NNNNN 后缀」聚合成一条记录，
      // sizeGB 是全部分片之和 —— 所以**不能**因为 isSharded 就排除，否则 Kimi-K3
      // （全部成员都是分片）这类大模型的显存选档表会整张空掉。
      if (f.tier === '未识别') continue;
      if (isAux(f)) continue;
      if (!f.sizeGB || f.sizeGB <= 0) continue;
      const cur = byQuant.get(f.quant);
      if (!cur) {
        byQuant.set(f.quant, {
          ...f, by: v.quantizer, repo: v.repo, url: v.url,
          n: 1, maxGB: f.sizeGB,
        });
      } else {
        cur.n += 1;
        if (f.sizeGB < cur.sizeGB) {
          // 换成了更小的代表：把来源信息一起带走，并保留此前的最大值
          const keepMax = Math.max(cur.maxGB, f.sizeGB);
          Object.assign(cur, f, { by: v.quantizer, repo: v.repo, url: v.url, maxGB: keepMax });
        } else if (f.sizeGB > cur.maxGB) {
          cur.maxGB = f.sizeGB;
        }
      }
    }
  }
  const rows = [...byQuant.values()].sort((a, b) => a.bitsPerWeight - b.bitsPerWeight);

  // 运行方式分档。为什么要分两类：
  // 「显存档」是单卡全量装得下（llama.cpp 会把权重全放 GPU，推理最快）；
  // 「内存 / 多卡档」是显存的替代路径 —— llama.cpp 的 `-ngl` 可以只把部分层放显存，
  // 剩下的落系统内存（纯 CPU 运行），或跨多卡切分（张量并行）。
  // 不区分这两类会给用户错误建议：Kimi-K3 最小档 540 GB 在任何单卡上都不存在，
  // 但它并不是「不能跑」，而是「要按 CPU 卸载或多卡的方式跑」。
  const GPU_BUDGETS = [{"gb": 8, "label": "8 GB 示例容量", "labelEn": "8 GB illustrative capacity", "note": "示例容量档；不是硬件型号推荐，需另算缓存与运行时。", "noteEn": "Illustrative capacity; not a hardware recommendation. Budget cache/runtime separately."}, {"gb": 12, "label": "12 GB 示例容量", "labelEn": "12 GB illustrative capacity", "note": "示例容量档；不是硬件型号推荐，需另算缓存与运行时。", "noteEn": "Illustrative capacity; not a hardware recommendation. Budget cache/runtime separately."}, {"gb": 16, "label": "16 GB 示例容量", "labelEn": "16 GB illustrative capacity", "note": "示例容量档；不是硬件型号推荐，需另算缓存与运行时。", "noteEn": "Illustrative capacity; not a hardware recommendation. Budget cache/runtime separately."}, {"gb": 24, "label": "24 GB 示例容量", "labelEn": "24 GB illustrative capacity", "note": "示例容量档；不是硬件型号推荐，需另算缓存与运行时。", "noteEn": "Illustrative capacity; not a hardware recommendation. Budget cache/runtime separately."}, {"gb": 48, "label": "48 GB 示例容量", "labelEn": "48 GB illustrative capacity", "note": "示例容量档；不是硬件型号推荐，需另算缓存与运行时。", "noteEn": "Illustrative capacity; not a hardware recommendation. Budget cache/runtime separately."}, {"gb": 80, "label": "80 GB 示例容量", "labelEn": "80 GB illustrative capacity", "note": "示例容量档；不是硬件型号推荐，需另算缓存与运行时。", "noteEn": "Illustrative capacity; not a hardware recommendation. Budget cache/runtime separately."}];
  const RAM_BUDGETS = [{"gb": 64, "label": "64 GB 合计容量示例", "labelEn": "64 GB aggregate-capacity example", "kind": "cpu", "note": "示例合计容量；不是单进程可用量，多卡/系统内存不能直接等同一块显存。", "noteEn": "Illustrative aggregate capacity, not process-available memory. Multiple devices/RAM are not one VRAM pool."}, {"gb": 128, "label": "128 GB 合计容量示例", "labelEn": "128 GB aggregate-capacity example", "kind": "cpu", "note": "示例合计容量；不是单进程可用量，多卡/系统内存不能直接等同一块显存。", "noteEn": "Illustrative aggregate capacity, not process-available memory. Multiple devices/RAM are not one VRAM pool."}, {"gb": 256, "label": "256 GB 合计容量示例", "labelEn": "256 GB aggregate-capacity example", "kind": "cpu", "note": "示例合计容量；不是单进程可用量，多卡/系统内存不能直接等同一块显存。", "noteEn": "Illustrative aggregate capacity, not process-available memory. Multiple devices/RAM are not one VRAM pool."}, {"gb": 640, "label": "640 GB 合计容量示例", "labelEn": "640 GB aggregate-capacity example", "kind": "cpu", "note": "示例合计容量；不是单进程可用量，多卡/系统内存不能直接等同一块显存。", "noteEn": "Illustrative aggregate capacity, not process-available memory. Multiple devices/RAM are not one VRAM pool."}];

  const fitRows = (list, kind) => list.map((b) => {
    const fits = rows.filter((r) => r.sizeGB * 1.15 <= b.gb);
    if (fits.length === 0) {
      const why = kind === 'cpu'
        ? bi('此示意筛选没有候选', 'No candidate under this illustrative filter')
        : bi('此示意筛选没有候选', 'No candidate under this illustrative filter');
      return `        <tr><th>${bi(esc(b.label), esc(b.labelEn || b.label))}</th><td class="no-fit">${why}${bi(`（最小 ${rows[0] ? rows[0].sizeGB.toFixed(1) + ' GB' : '—'}）`, ` (smallest tier ${rows[0] ? rows[0].sizeGB.toFixed(1) + ' GB' : '—'})`)}<br><span class="muted">${bi(esc(b.note), esc(b.noteEn || b.note))}</span></td></tr>`;
    }
    const best = fits.reduce((a, c) => (tierOf(c.tier) < tierOf(a.tier) ? c : a));
    // 「更省」必须体积严格小于 best。原写法是fits.filter(≠best).slice(-2)，
    // 只保证 bpw 更大 —— 但不同量化者的 imatrix / 量化方法不同，
    // 更大 bpw 的档体积反而可能更大（实测Kimi-K3 里出现「更省: TQ2_0 551 GB」
    // 而推荐档只有 540 GB），标成「更省」却更大是错的。
    const also = fits
      .filter((f) => f.quant !== best.quant && f.sizeGB < best.sizeGB)
      .sort((a, c) => c.sizeGB - a.sizeGB)
      .slice(0, 2);
    const extra = '';
    return `        <tr>
          <th>${bi(esc(b.label), esc(b.labelEn || b.label))}</th>
          <td>
            <b>${bi(esc(best.quant), esc(QEN(best.quant)))}</b>（${fmtGB(best.sizeGB)} · ${bi(esc(best.tier), esc(EN('tier', best.tier)))}）
            ${also.length ? `<br><span class="muted">${bi('更省：', 'Smaller: ')}${also.map((a) => `${bi(esc(a.quant), esc(QEN(a.quant)))} ${fmtGB(a.sizeGB)}`).join(' / ')}</span>` : ''}
            <br><span class="muted">${bi(esc(b.note), esc(b.noteEn || b.note))}</span>${extra}
          </td>
        </tr>`;
  }).join('\n');

  const minSize = rows.length ? rows[0].sizeGB : null;
  const maxSize = rows.length ? rows[rows.length - 1].sizeGB : null;
  // 超大 MoE 提示：最小档就超过单卡上限时，必须显式说明「不是不能跑，是要换运行方式」
  const hugeNote = minSize && minSize > 80 ? `<p class="warn-note">${bi('本成员最小发布文件已超过上面的 80 GB 示例容量。先核对可用容量、分配方式与运行器支持，不能从文件大小断言运行方式。','The smallest published file exceeds the 80 GB example. Check available capacity, allocation and runtime support; file size does not establish an execution configuration.')}</p>` : '';

  /* B4（2026-10-09）：显存倒推**决策工具**。
   * 静态速查表只给 8/12/16/24… 这些档位，而读者的卡常常是 11 GB、20 GB。
   * 工具按**真实实测体积**算：能装下的档位 = sizeGB × 1.15 ≤ 输入显存。
   * 每一条都带来源（量化者 + 指向 HF 发布页的链接）——「每个答案可溯源到具体数据行」是 B4 的验收。
   * 数据内嵌为 JSON（不是再渲染一张表），这样前端算的就是库里的原始数字。 */
  const vtData = [...byQuant.values()]
    .filter((r) => r.tier && r.tier !== '未识别' && r.sizeGB > 0)
    .map((r) => ({ q: r.quant, qe: QEN(r.quant), g: +Number(r.sizeGB).toFixed(2), t: r.tier, te: EN('tier', r.tier), u: r.url, b: r.by, rp: r.repo }))
    .sort((a, b) => a.g - b.g);
  const vramTool = `      <div class="vramtool">
        <div class="vt-row">
          <label class="vt-f"><span class="vt-h">${bi('你的显存（GB）', 'Your VRAM (GB)')}</span>
            <input type="number" class="vt-in" min="1" max="1024" step="1" inputmode="numeric" placeholder="12"></label>
          <span class="vt-quick">${[4, 8, 12, 16, 24, 48, 80].map((g) => `<button type="button" class="vt-preset" data-gb="${g}">${g}</button>`).join('')}</span>
        </div>
        <div class="vt-out" aria-live="polite"></div>
        <script type="application/json" class="vt-data">${JSON.stringify(vtData)}</script>
      </div>`;

  return `      <p class="block-lead">${bi('下面按发布文件体积 × 1.15 做<b>示意筛选</b>。文件大小来自发布页列表，不是运行内存实测；15% 只是固定练习假设，<b>不能代替随上下文、架构和并发变化的缓存预算</b>。先筛候选，再用容量工具核对。', 'An <b>illustrative filter</b> uses published file size × 1.15. Sizes come from release listings, not measured resident memory. The fixed 15% teaching assumption <b>does not replace a context-, architecture- and concurrency-dependent cache budget</b>. Filter candidates, then check capacity.')}</p>
      ${hugeNote}
${vramTool}
      <p><a href="../../guides/gpu-cost-math.html#capacity-workbench">${bi('填写上下文、并发与驻留容量预算','Budget context, concurrency and resident memory')}</a></p>
      <h3 class="budget-h">${bi('按文件体积初筛候选', 'Initial candidates by file size')}</h3>
      <table class="budget">
        <caption>${bi('示例容量 → 文件体积候选（不证明可运行）','Illustrative capacity → file-size candidates (not execution validation)')}</caption>
        <tbody>
${fitRows(GPU_BUDGETS, 'gpu')}
        </tbody>
      </table>
      <h3 class="budget-h">${bi('系统内存与多设备：单独核对','System RAM and multiple devices: check separately')}</h3>
      <p class="muted small">${bi('分层加载、CPU 卸载和多设备分配取决于运行器、模型与后端版本。合计容量不等于单进程可用显存；不能仅凭表格保证能运行或推断速度。','Layer loading, CPU offload and multi-device allocation depend on runtime, model and backend version. Aggregate capacity is not process-available VRAM; this table establishes neither execution nor speed.')}</p>
      <table class="budget">
        <caption>${bi('合计容量示例 → 文件体积候选','Aggregate-capacity examples → file-size candidates')}</caption>
        <tbody>
${fitRows(RAM_BUDGETS, 'cpu')}
        </tbody>
      </table>
      ${maxSize ? `${bi(`<p class="muted small">本系列档位体积跨度 ${fmtGB(minSize)} → ${fmtGB(maxSize)}。`, `<p class="muted small">Tier sizes in this series span ${fmtGB(minSize)} → ${fmtGB(maxSize)}.`)}
        跨度过大说明同一系列的量化选择空间很宽，这正是量化选型的主要收益所在。</p>` : ''}
      <details class="all-quants">
        <summary>${bi('展开：发布文件体积','Expand: published file sizes')}（${rows.length} ${bi('档','tiers')}）</summary>
        <table class="quant-list">
          <thead><tr><th>${bi('量化档','Quant')}</th><th>${bi('最小体积','Min size')}</th><th>${bi('每权重比特','bpw')}</th><th>${bi('档位','Tier')}</th><th>${bi('这档意味着什么','What this tier means')}</th><th>${bi('该档文件数 / 体积跨度', 'Files in tier / size range')}</th><th>最小体积来源</th></tr></thead>
          <tbody>
${rows.map((r) => `            <tr>
              <td><code>${bi(esc(r.quant), esc(QEN(r.quant)))}</code></td>
              <td><b>${fmtGB(r.sizeGB)}</b></td>
              <td>${r.bitsPerWeight?.toFixed(2) ?? '—'}<span class="muted"> bpw</span></td>
              <td><span class="tier tier-${TIER_ORDER.indexOf(r.tier)}">${bi(esc(r.tier), esc(EN('tier', r.tier)))}</span></td>
              <td class="muted small">${r.tierDesc ? bi(esc(r.tierDesc), esc(EN('tierDesc', r.tierDesc))) : '<span class="muted">—</span>'}</td>
              <td class="muted small">${r.n} ${bi('个','')}${r.maxGB > r.sizeGB * 1.05 ? ` · ${fmtGB(r.sizeGB)}~${fmtGB(r.maxGB)}` : ''}</td>
              <td class="muted"><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.by)}</a></td>
            </tr>`).join('\n')}
          </tbody>
        </table>
        <p class="muted small">${bi('「每权重比特」是按 llama.cpp 公开命名标准从文件名推导的，同一档位在不同模型上的真实值会略有差异。这是', "Bits per weight is derived from the filename by llama.cpp’s published naming convention; the real value varies slightly between models at the same tier. This is")} <b>${bi('B 级推导','grade-B derived')}</b>${bi('，不是实测值。',' — not a measured value.')}</p>
        <p class="muted small">${bi('<b>关于「最小体积」与「变体」：</b>','<b>On "smallest size" and "variants":</b>')}同名档位下可能有多个不同文件
          （不同量化者的实现差异，或带 <code>-AD-</code> 混合精度、<code>-PLEQ4_0</code> 上下文扩展、
          <code>-DENSE</code> 等后缀的特殊变体）。上表取的是该档<b>最省的可行体积</b>，
          「体积跨度」列给出该档实际的体积范围——跨度大说明该档内部差异明显，
          选具体文件时请以跨度上界为准。</p>
      </details>`;
}

/** 系列页 · C 区块：量化版本总表 */
function blockC(s, m) {
  const trs = m.variants.map((v) => {
    const rec = v.recommended;
    const ctx = v.contextLength ? Number(v.contextLength).toLocaleString('en-US') : '—';
    return `          <tr>
            <td>
              ${v.isOfficial ? bi('<span class="badge badge-off">官方</span> ', '<span class="badge badge-off">official</span> ') : ''}<a href="${esc(v.url)}" target="_blank" rel="noopener"><code>${esc(v.quantizer)}</code></a>
              ${v.imatrix ? bi('<span class="badge badge-im" title="带重要性矩阵，量化质量通常更稳">imatrix</span>', '<span class="badge badge-im" title="Ships an importance matrix, so quality is usually steadier">imatrix</span>') : ''}
              ${v.architecture ? `<br><span class="muted small"><code>${esc(v.architecture)}</code></span>` : ''}
            </td>
            <td>${licBadge(v.license)}${NEEDS_REVIEW.test(v.license || '') ? bi('<br><span class="warn-inline small">须读原文</span>', '<br><span class="warn-inline small">read the original</span>') : ''}${licInheritedNote(v)}</td>
            <td class="num">${v.coverage}</td>
            <td class="num">${fmtGB(v.totalGB)}</td>
            <td class="num">${ctx}</td>
            <td>${rec ? `<code>${bi(esc(rec.quant), esc(QEN(rec.quant)))}</code><br><span class="muted small">${fmtGB(rec.sizeGB)}</span>` : '—'}</td>
            <td class="num">${fmtNum(v.downloads)}</td>
            <td class="muted small">${fmtDate(v.lastModified)}</td>
          </tr>`;
  }).join('\n');

  return `      <table class="variants">
        <thead>
          <tr>
            <th>${bi('量化者','Quantiser')}</th><th>${bi('许可','Licence')}</th><th class="num">${bi('档数','Tiers')}</th><th class="num">${bi('总体积','Total size')}</th>
            <th class="num">${bi('上下文','Context')}</th><th>${bi('建议档','Recommended')}</th><th class="num">${bi('下载量','Downloads')}</th><th>${bi('更新','Updated')}</th>
          </tr>
        </thead>
        <tbody>
${trs}
        </tbody>
      </table>
      <p class="tier-legend" role="list" aria-label="量化档色阶图例" data-ui-aria-label-zh="量化档色阶图例" data-ui-aria-label-en="Quantisation tier colour scale">
        <span class="tier-legend-h">${bi('卡片左侧色条 = 推荐档位','Colour bar on the left = recommended tier')}</span>
        <span class="tier-legend-i tier-0">${bi('近似无损','Near lossless')}</span>
        <span class="tier-legend-i tier-1">${bi('保守','Conservative')}</span>
        <span class="tier-legend-i tier-2">${bi('平衡','Balanced')}</span>
        <span class="tier-legend-i tier-3">${bi('长上下文','Long context')}</span>
        <span class="tier-legend-i tier-4">${bi('极限压缩','Extreme compression')}</span>
      </p>
      <p class="muted small">${bi('「建议档」是本站按<b>体积最小且落在平衡档</b>的规则自动选出的，不是质量排名。官方量化排在最前；带 <span class="badge badge-im">imatrix</span> 标记的仓库带重要性矩阵数据。', 'The recommended tier is picked by rule — smallest size that still lands in the balanced tier — not by a quality ranking. Official quantisations are listed first; repos marked <span class="badge badge-im">imatrix</span> ship an importance matrix.')}</p>`;
}

/* B2（2026-10-09）：筛选脚本与样式。脚本读**独立文件**，不写进模板字符串 ——
 * 本会话因「模板字符串里写反引号」踩过三次，独立文件从根上避开。
 * 必须定义在页面写盘（约 L913）之前：const 在 TDZ 里，晚定义会 ReferenceError。 */
const FILTER_SCRIPT = fs.readFileSync(path.join(HERE, 'site-filter.js'), 'utf8');
/* ⚠ 字号必须是**整数 px 落点**（设计系统的硬规则，`_design-audit.mjs` 守着）：
 *   .74rem=11.84px / .82rem=13.12px / .86rem=13.76px 都会被判「非整数字号」。
 *   所以统一用 .75rem=12px · .8125rem=13px · .875rem=14px。 */
const FILTER_CSS = `
.vfilter{display:flex;flex-wrap:wrap;gap:.7rem;align-items:flex-end;margin:1.2rem 0 1.6rem;padding:.9rem 1rem;border:1px solid var(--line);border-radius:var(--r-sm,10px)}
.vfilter .vf-f{display:flex;flex-direction:column;gap:.25rem;min-width:9rem}
.vfilter .vh{font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;opacity:.6}
.vfilter input,.vfilter select{font:inherit;font-size:.875rem;padding:.34rem .5rem;border:1px solid var(--line);border-radius:6px;background:transparent;color:inherit}
.vfilter .vf-f:first-child{min-width:13rem;flex:1 1 13rem}
.vcount{margin-left:auto;font-size:.8125rem;opacity:.7;white-space:nowrap}
.sfilter{display:flex;flex-wrap:wrap;gap:.7rem;align-items:flex-end;margin:1.2rem 0 1.4rem;padding:.9rem 1rem;border:1px solid var(--line);border-radius:var(--r-sm,10px)}
.sfilter .vf-f{display:flex;flex-direction:column;gap:.25rem;min-width:9rem}
.sfilter .vh{font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;opacity:.6}
.sfilter input,.sfilter select{font:inherit;font-size:.875rem;padding:.34rem .5rem;border:1px solid var(--line);border-radius:6px;background:transparent;color:inherit}
.sfilter .vf-f:first-child{min-width:13rem;flex:1 1 13rem}
@media(max-width:560px){.vfilter,.sfilter{flex-direction:column;align-items:stretch}.vcount{margin-left:0}}
/* B3：companion 块（下好之后用什么跑）。字号一律整数 px —— 见上方 FILTER_CSS 的说明。 */
.companion{margin:2.6rem 0 1rem}
.comp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(230px,100%),1fr));gap:.8rem;margin:1rem 0}
.comp-card{display:flex;flex-direction:column;gap:.3rem;padding:.85rem 1rem;border:1px solid var(--line);border-radius:var(--r-sm,8px);text-decoration:none;background:var(--bg-raise,rgba(127,127,127,.05))}
.comp-card b{font-size:.9375rem}
.comp-card span{font-size:.8125rem;opacity:.75;line-height:1.6}
.comp-card:hover{border-color:var(--accent,currentColor)}
/* B4：显存倒推工具。字号一律整数 px（.75rem=12 / .8125rem=13 / .875rem=14 / 1rem=16）。 */
.vramtool{margin:1.2rem 0 1.6rem;padding:.9rem 1rem;border:1px solid var(--line);border-radius:var(--r-sm,10px);background:var(--bg-raise,rgba(127,127,127,.04))}
.vt-row{display:flex;flex-wrap:wrap;gap:.7rem;align-items:flex-end}
.vt-f{display:flex;flex-direction:column;gap:.25rem}
.vt-h{font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;opacity:.6}
.vt-in{font:inherit;font-size:.875rem;padding:.34rem .5rem;width:7rem;border:1px solid var(--line);border-radius:6px;background:transparent;color:inherit}
.vt-quick{display:flex;flex-wrap:wrap;gap:.3rem}
.vt-preset{font:inherit;font-size:.8125rem;padding:.3rem .6rem;border:1px solid var(--line);border-radius:999px;background:transparent;color:inherit;cursor:pointer}
.vt-preset:hover{border-color:var(--accent,currentColor)}
.vt-out{margin-top:.9rem}
.vt-out p{margin:.4rem 0;line-height:1.7;font-size:.875rem}
.vt-best b{opacity:.7}
.vt-best a{font-size:1rem}
.vt-meta{font-size:.8125rem;opacity:.65}
.vt-dim{font-size:.8125rem;opacity:.65}
.vt-rest a{font-size:.875rem}
.vt-note{font-size:.8125rem;opacity:.6}
.vt-none{font-size:.875rem;opacity:.85}
@media(max-width:560px){.vt-in{width:100%}}
`;

/* B3（2026-10-09）：站间骨架 —— 「下好之后用什么跑」。
 * 清单是**本仓的策展数据**（见 config.js 的 COMPANION 注释：R3 要求单仓能独立构建，
 * 所以不能构建时跨仓读 agent 的目录）。正确性由 `_audit/companion-check.mjs` 核对：
 * 每个 id 在 agent 仓里仍存在、正文仍写着本地模型支持、页面真的渲染了。
 * 链接指向 agent 的**详情页**（不是分区页）—— 读者要的是「这个工具怎么接本地模型」。 */
function companionBlock() {
  return `    <section class="companion">
      <h2>${bi('下好之后用什么跑', 'What runs it')}</h2>
      <p class="block-lead">${bi('本站只负责「该下哪一档」。跑起来是另一件事 —— 下面这几个工具<b>自己的文档里写明了支持本地模型</b>（Ollama / vLLM / llama.cpp / LM Studio），点进去看具体怎么接。', 'This site only answers which tier to download. Running it is a different problem — the tools below <b>document local-model support in their own docs</b> (Ollama / vLLM / llama.cpp / LM Studio). Follow the link to see how.')}</p>
      <div class="comp-grid">
${COMPANION.map((c) => `        <a class="comp-card" href="https://tools.specul.com/${esc(COMPANION_URL_PREFIX[c.part] ?? '')}${esc(c.id)}.html">
          <b>${bi(esc(c.label.zh), esc(c.label.en))}</b>
          <span>${bi(esc(c.why.zh), esc(c.why.en))}</span>
        </a>`).join('\n')}
      </div>
      <p class="muted small">${bi('这些条目的本地模型支持情况由它们自己的官方文档佐证；本站不实测。', 'Local-model support for each entry is evidenced by that project official documentation. This site runs no measurements.')}</p>
    </section>

`;
}

/** 系列页 · D 区块：每个变体详解（七字段） */
function blockD(s, m) {
  const cards = m.variants.map((v) => {
    const rec = v.recommended;
    const f = (label, body) => `        <div class="vf"><span class="vf-k">${label}</span><span class="vf-v">${body}</span></div>`;

    // 字段 1 · 它是什么
    const what = bi(
    `<a href="${esc(v.url)}" target="_blank" rel="noopener"><code>${esc(v.repo)}</code> ↗</a>，提供 <b>${v.coverage}</b> 个 GGUF 量化档，合计 ${fmtGB(v.totalGB)}。${v.isOfficial ? '<b>这是模型方自己发布的</b>，不是第三方。' : `由 <code>${esc(v.quantizer)}</code> 发布。`}`,
    `<a href="${esc(v.url)}" target="_blank" rel="noopener"><code>${esc(v.repo)}</code> ↗</a>, providing <b>${v.coverage}</b> GGUF tiers totalling ${fmtGB(v.totalGB)}. ${v.isOfficial ? '<b>Published by the model authors themselves</b>, not a third party.' : `Published by <code>${esc(v.quantizer)}</code>.`}`);

    // 字段 2 · 量化者做了什么
    const did = [];
    if (v.isOfficial) did.push(bi('模型作者自行量化，只有覆盖不到的档位才需要考虑第三方', 'Quantised by the model author; third parties are only worth considering for tiers this does not cover'));
    if (v.imatrix) did.push(bi(`带重要性矩阵（imatrix：<code>${esc(v.imatrixFile || 'imatrix.dat')}</code>），用激活数据统计各层重要性后再量化，通常比纯 RTN 稳`, `Ships an importance matrix (imatrix: <code>${esc(v.imatrixFile || 'imatrix.dat')}</code>) — quantises after scoring each layer by activation statistics, usually steadier than plain RTN`));
    else did.push(bi('未提供重要性矩阵（imatrix），走的是纯权重量化路线', 'No importance matrix (imatrix); this is pure weight quantisation'));
    if (v.architecture) did.push(bi(`声明架构 <code>${esc(v.architecture)}</code>，需核对运行器版本支持`, `Declares <code>${esc(v.architecture)}</code>; check support in your runtime version`));
    if (v.contextLength) did.push(bi(`声明上下文 ${Number(v.contextLength).toLocaleString('en-US')} tokens`, `Declared context ${Number(v.contextLength).toLocaleString('en-US')} tokens`));
    if (v.declaredBase) did.push(bi(`发布页声明溯源到 <code>${esc(Array.isArray(v.declaredBase) ? v.declaredBase[0] : v.declaredBase)}</code>`, `The release page traces this back to <code>${esc(Array.isArray(v.declaredBase) ? v.declaredBase[0] : v.declaredBase)}</code>`));
    if (v.totalFileSize) did.push(bi(`权重总字节 ${(v.totalFileSize / 1e9).toFixed(1)} GB（发布页 <code>gguf.total</code> 字段）`, `Total weight bytes ${(v.totalFileSize / 1e9).toFixed(1)} GB (the release page's <code>gguf.total</code> field)`));

    // 字段 3 · 与同系列其他变体的区别
    const peers = m.variants.filter((x) => x.quantizer !== v.quantizer);
    const diff = peers.length === 0
      ? bi('本系列目前只有这一个量化来源，无横向可比。',
           'This series currently has only this one quantisation source, so there is nothing to compare against.')
      : bi(`同系列另有 ${peers.length} 个量化来源（${peers.slice(0, 4).map((p) => `<code>${esc(p.quantizer)}</code> ${p.coverage} ${bi('档', 'tiers')}`).join('、')}${peers.length > 4 ? ' 等' : ''}）。`,
           `The series has ${peers.length} other quantisation sources (${peers.slice(0, 4).map((p) => `<code>${esc(p.quantizer)}</code> ${p.coverage} tiers`).join(', ')}${peers.length > 4 ? ', among others' : ''}).`);
    const cov = m.variants.map((x) => x.coverage).sort((a, b) => a - b);
    const covNote = cov.length > 1
      ? bi(` 本仓 ${v.coverage} 档，${v.coverage === cov[cov.length - 1] ? '覆盖最全' : v.coverage === cov[0] ? '覆盖最少' : '覆盖中等'}。`,
           ` This repo has ${v.coverage} tiers — ${v.coverage === cov[cov.length - 1] ? 'the broadest coverage' : v.coverage === cov[0] ? 'the narrowest' : 'middling'} coverage in this series.`)
      : '';

    // 字段 4 · 存在的意义
    const why = v.isOfficial
      ? bi('由模型发布方提供，便于回查发布说明与来源。官方身份不保证每个任务的质量、速度或兼容性。',
           'Published by the model author, allowing its release notes and provenance to be checked. Official status does not establish quality, speed or compatibility for every task.')
      : bi(`提供 ${rec ? esc(rec.quant) : '—'} 等量化候选。请核对基座版本、量化说明、校验值与运行器支持；第三方身份本身不说明质量高低。`,
           `Provides quantisation candidates such as ${rec ? esc(QEN(rec.quant)) : '—'}. Check base version, method, checksums and runtime support; third-party status alone does not determine quality.`);

    // 字段 5 · 优势
    const adv = [];
    if (v.coverage >= 20) adv.push(bi(`快照识别 ${v.coverage} 个档位，可按体积与运行器支持筛选`, `The snapshot identifies ${v.coverage} tiers; filter by size and runtime support`));
    if (v.imatrix) adv.push(bi('元数据记录了 imatrix；质量仍需结合校准资料与任务评估', 'Metadata records an imatrix; quality still requires calibration details and task evaluation'));
    if (v.isOfficial) adv.push(bi('发布来源为模型方，具体支持范围以发布说明为准', 'Published by the model author; consult its release notes for support scope'));
    if (v.downloads >= 1e6) adv.push(bi(`快照下载量 ${fmtNum(v.downloads)}；不代表独立用户数、成功运行或质量验证`, `Snapshot downloads: ${fmtNum(v.downloads)}; not a count of unique users, successful runs or quality validations`));
    if (rec) adv.push(bi(`规则候选为 <code>${esc(rec.quant)}</code>（${fmtGB(rec.sizeGB)}），不构成性能结论`, `Rule-based candidate: <code>${esc(QEN(rec.quant))}</code> (${fmtGB(rec.sizeGB)}), not a performance finding`));
    if (adv.length === 0) adv.push(bi('按文件体积与版本信息逐项核对；本站没有该版本的运行结果', 'Check file size and version details; this site has no execution results for this build'));

    // 字段 6 · 为什么选它 / 目的
    const purpose = rec
      ? bi(`文件体积候选为 <code>${esc(rec.quant)}</code>（${fmtGB(rec.sizeGB)}，${esc(rec.tier)}）。先用<a href="../../guides/gpu-cost-math.html">容量预算</a>核对缓存、并发与系统开销，再查发布说明中的版本兼容性。`,
           `File-size candidate: <code>${esc(QEN(rec.quant))}</code> (${fmtGB(rec.sizeGB)}, ${esc(EN('tier', rec.tier))}). Check cache, concurrency and system overhead with the <a href="../../guides/gpu-cost-math.html">capacity budget</a>, then verify version compatibility in the release notes.`)
      : bi('该仓无可用档位。', 'This repo has no usable tier.');

    // 字段 7 · 已知取舍
    const cost = [];
    if (v.coverage <= 3) cost.push(bi(`快照仅识别 ${v.coverage} 个档位；不合预算时需再查其他发布源`, `The snapshot identifies only ${v.coverage} tiers; inspect other sources if none fits your budget`));
    if (!v.imatrix && !v.isOfficial) cost.push(bi('未记录 imatrix，需另查发布说明；该字段缺失不能单独判定质量', 'No imatrix recorded; inspect release notes. This missing field alone does not determine quality'));
    if (v.totalGB > 200) cost.push(bi(`全仓 ${fmtGB(v.totalGB)}，硬盘紧张的话建议只下需要的 1~2 个档位`, `${fmtGB(v.totalGB)} for the whole repo — if disk is tight, download only the one or two tiers you need`));
    if (NEEDS_REVIEW.test(v.license || '')) cost.push(bi(`许可是 <code>${esc(v.license)}</code>，<b>必须自己读发布页原文</b>再决定能不能用`, `The licence is <code>${esc(v.license)}</code> — <b>read the release page yourself</b> before deciding whether you may use it`));
    if (v.licenseInherited) cost.push(bi(`量化仓<b>未填写许可元数据字段</b>。此处 <code>${esc(v.license)}</code> 来自基座 <code>${esc(v.licenseFrom || '?')}</code> 的推断，不是量化者明确授权；请同时核对基座许可、量化仓文件与再分发条件`, `The quant repo <b>does not fill the licence metadata field</b>. The displayed <code>${esc(v.license)}</code> is inferred from base <code>${esc(v.licenseFrom || '?')}</code>, not an explicit grant by the quantiser. Check the base licence, quantisation-repo files and redistribution conditions together.`));
    if (v.lastModified && (Date.now() - new Date(v.lastModified)) / 86400000 > 180) cost.push(bi(`已 ${Math.round((Date.now() - new Date(v.lastModified)) / 86400000)} 天未更新，基础模型若有新版可能已不同步`, `Not updated for ${Math.round((Date.now() - new Date(v.lastModified)) / 86400000)} days, so it may no longer track a newer base model`));
    if (cost.length === 0) cost.push(bi('本站未评估该版本的质量、吞吐与全部兼容性；元数据完整不等于适合你的任务', 'This build’s quality, throughput and complete compatibility have not been evaluated here; complete metadata does not establish suitability for your task'));

    // data-tier 让 CSS 能按「推荐档」给卡片左侧上色 ——
    // 2026-10-03：原先只用 .vcard-off 区分官方/第三方，两类都用同一个 --vio 色，
    // 而 --vio 是站点 accent 的别名 → 官方与非官方看起来一样。
    // 变体卡是 models 站的主体内容，分色价值最大。
    // ⚠ 变量是 v.recommended（本函数的局部变量 `best` 只存在于另一个函数里，
    //   2026-10-03 首次写错报 ReferenceError: best is not defined）。
    const tierIdx = v.recommended ? TIER_ORDER.indexOf(v.recommended.tier) : -1;
    /* B2（2026-10-09）：筛选要按「量化者 / 档位 / 许可」过滤，所以把这三样挂到卡片上。
     * data-tier 早已存在（CSS 用它上色）；这里补 data-q / data-lic / data-tiers / data-blob。
     * ⚠ 档位维度**不能用「推荐档位」**（data-tiername 的旧做法）：实测 130 个变体里
     *   118 个的推荐档都是「平衡档」—— 拿它筛等于没筛（探针跑出 26/26 才发现）。
     *   改成「**该仓提供哪些档位**」（files[].tier 的去重集合），这才是读者会问的
     *   「我只想要带近似无损档的仓」。未识别不算档位，排除。
     * ⚠ data-blob 是**搜索的窄口径**：只放量化者 + 仓库名 + 许可。
     *   不能拿整张卡的文字当搜索目标 —— 每张卡的正文都会提到别的量化者，
     *   搜 unsloth 会命中全部 26 张（探针跑出 26/26 才发现）。 */
    const tiersCovered = [...new Set((v.files || []).map((x) => x.tier).filter((x) => x && x !== '未识别'))];
    const blob = [v.quantizer, v.repo, v.license || ''].join(' ').toLowerCase();
    return `        <article class="vcard${v.isOfficial ? ' vcard-off' : ''}"${tierIdx >= 0 ? ` data-tier="${tierIdx}"` : ''} data-q="${esc(v.quantizer)}" data-lic="${esc(v.license || '')}" data-tiers="${esc(tiersCovered.join(' '))}" data-blob="${esc(blob)}">
          <header class="vcard-h">
            <h4>${v.isOfficial ? bi('<span class="badge badge-off">官方</span> ', '<span class="badge badge-off">official</span> ') : ''}<code>${esc(v.quantizer)}</code></h4>
            <div class="vcard-meta">
              ${licBadge(v.license)}
              ${v.licenseInherited ? bi(`<br><span class="warn-inline small">继承自基座 <code>${esc(v.licenseFrom || '?')}</code>，量化仓未单独声明</span>`, `<br><span class="warn-inline small">Inherited from base <code>${esc(v.licenseFrom || '?')}</code> — the quant repo declares none of its own</span>`) : ''}
              <span class="muted small">${bi(`${v.coverage} 档`, `${v.coverage} tiers`)} · ${fmtGB(v.totalGB)} · ${bi(`${fmtNum(v.downloads)} 下载`, `${fmtNum(v.downloads)} downloads`)}</span>
            </div>
          </header>
${f(bi('它是什么', 'What it is'), what)}
${f(bi('量化者做了什么', 'What the quantiser did'), did.join('；') + '。')}
${f(bi('与同系列其他变体的区别', 'How it differs from other variants in this series'), diff + covNote)}
${f(bi('存在的意义', 'Why it exists'), why)}
${f(bi('优势', 'Strengths'), adv.map((a) => '· ' + a).join('<br>'))}
${f(bi('为什么选它 / 目的', 'Why you would pick it / its purpose'), purpose)}
${f(bi('已知取舍', 'Known trade-offs'), cost.map((c) => '· ' + c).join('<br>'))}
        </article>`;
  }).join('\n');

  /* B2（2026-10-09）：这一区块的筛选栏。
   * 三个维度（量化者 / 建议档位 / 许可）+ 搜索框；同系列里**每个成员一个 D 区块**，
   * 各有各的筛选栏 —— 所以脚本按「最近的 .vwrap」定作用域，不用 id（id 会随成员数变化）。
   * ⚠ 输入框**不写 placeholder 文案**：placeholder 是属性，塞不进 bi() 的双 span 双语。
   *   用旁边的双语 label 说明用途，placeholder 只放与语言无关的值示例。 */
  const qList = [...new Set(m.variants.map((v) => v.quantizer))].sort();
  const licList = [...new Set(m.variants.map((v) => v.license || ''))].filter(Boolean).sort();
  /* 档位选项 = 本成员所有变体的**文件档位并集**（不是推荐档位 —— 那个几乎全是「平衡档」） */
  const tierList = [...new Set(m.variants.flatMap((v) => (v.files || []).map((x) => x.tier)))]
    .filter((t) => t && t !== '未识别')
    .sort();
  /* ⚠ `<option>` 里**不能放 HTML**（浏览器的 option 只按纯文本渲染）——
   *   把 bi() 的双 span 塞进去会直接露出标记文字。所以下拉标签一律用
   *   「中文 / English」的语言中立写法，不依赖 data-lang 切换。 */
  const opt = (vals, label) => nativeOption('', '全部', 'All') +
    vals.map((x) => nativeOption(x, x, label ? label(x) : x)).join('');
  const filterBar = `      <div class="vfilter" role="search">
        <label class="vf-f"><span class="vh">${bi('筛选量化仓', 'Filter quant repos')}</span>
          <input type="search" class="vq" autocomplete="off" placeholder="unsloth · bartowski · ggml-org"></label>
        <label class="vf-f"><span class="vh">${bi('量化者', 'Quantiser')}</span><select class="vsel" data-dim="q">${opt(qList)}</select></label>
        <label class="vf-f"><span class="vh">${bi('包含档位', 'Includes tier')}</span><select class="vsel" data-dim="tier">${opt(tierList, (t) => EN('tier', t) || t)}</select></label>
        <label class="vf-f"><span class="vh">${bi('许可', 'Licence')}</span><select class="vsel" data-dim="lic">${opt(licList)}</select></label>
        <span class="vcount" aria-live="polite"></span>
      </div>`;

  return `      <p class="block-lead">${bi('每个变体按七个字段展开：它是什么 → 量化者做了什么 → 与同系列其他变体的区别 → 存在的意义 → 优势 → 为什么选它 → 已知取舍。<b>最后一项是本站唯一会写主观判断的地方，且都标注了「我们的口径」。</b>', 'Each variant expands along seven fields: what it is → what the quantiser did → how it differs from other variants in this series → why it exists → strengths → why you would pick it → known trade-offs.<b>The last field is the only place this site offers a subjective judgement, and every item is marked as our own reading.</b>')}</p>
      <div class="vwrap">
${filterBar}
${cards}
      </div>`;
}

/** 系列页 · E 区块：量化者档案 */
function blockE(s, m) {
  const owners = [...new Set(m.variants.map((v) => v.quantizer))];
  const cards = owners.map((o) => {
/* ⚠ 2026-10-08 修（R5 准确性优先于丰富度）：
   * 原来这里写着 `quantizerDocs[o] || quantizerDocs['official']` ——
   * 没有专属档案的量化者**借用官方仓的说明**，于是 41 个量化者里 36 个（87.8%）
   * 的卡片都渲染成 official.md 的内容，等于把个人玩家的库说成「代表某厂商」，
   * 还引用了已下架的 Qwen3-30B-A3B。
   * 现在没有专属档案就**如实说明没有**，不借用别人的档案去冒充。 */
    const note = QUANTIZER_NOTES[o];
    const doc = quantizerDocs[o] || null;
    const docEn = quantizerDocsEn[o] || null;
    const mine = m.variants.filter((v) => v.quantizer === o);
    const dl = mine.reduce((s, v) => s + v.downloads, 0);
    /* 正文取英文优先（2026-10-04）。双语化后用两个 <div> 各带 data-zh/data-en，
     * 由 CSS 按 [data-lang] 选显 —— 不能用 esc 也不需要（内容是 md 原文）。
     * 英文缺失时只剩中文 div，英文态会显示空白 → 所以缺文档时中文侧也要保留。
     * ⚠ 2026-10-08：缺文档时的兜底文案改成**如实说明「该发布者未提供说明」**，
     *   原来写「暂无档案」，容易被读成「我们没查」，而实际是「对方没写」。*/
    const stripTitle = (s) => s.replace(/^# .*\n+/, '').trim();
    /* ⚠ 不要在这里再套 bi()：外层 <div class="qcard-body"> 已经用 bi(zh, en) 包了一层。
     * 嵌套 bi 会让英文态仍然渲染出中文节点 —— _i18n-render-audit 抓到过这个
     * （models 详情页 7 处 .P 中文残留）。所以中英各自写成纯文本。 */
    const NO_DOC_ZH = '<p class="muted">该发布者未提供说明。以下为该仓库的客观元数据（规格、许可、文件体积、更新时间），不含本站的主观解读。</p>';
    const NO_DOC_EN = '<p class="muted">This publisher ships no description. What follows is the repo’s own metadata (size, licence, file size, last updated) — no editorialising from us.</p>';
    const bodyZh = doc ? stripTitle(doc) : (note?.oneLine?.zh ? `<p>${esc(note.oneLine.zh)}</p>${NO_DOC_ZH}` : NO_DOC_ZH);
    const bodyEn = docEn ? stripTitle(docEn) : (note?.oneLine?.en ? `<p>${esc(note.oneLine.en)}</p>${NO_DOC_EN}` : NO_DOC_EN);
    return `        <article class="qcard">
          <h4><code>${esc(o)}</code>${note ? ` <span class="muted small">${bi(esc(note.oneLine.zh), esc(note.oneLine.en || note.oneLine.zh))}</span>` : ''}</h4>
          <p class="qcard-scope">${bi(`在本系列：${mine.length} 个仓 · ${dl ? fmtNum(dl) + ' 下载' : '—'}`, `In this series: ${mine.length} repos · ${dl ? fmtNum(dl) + ' downloads' : '—'}`)}${mine.some((v) => v.isOfficial) ? bi(' · <b>含官方仓</b>', ' · <b>includes the official repo</b>') : ''}</p>
          <div class="qcard-body">${bi(mdLite(bodyZh), mdLite(bodyEn))}</div>
          <a class="qcard-link" href="https://huggingface.co/${esc(o)}" target="_blank" rel="noopener">${bi('发布页 ↗','release page ↗')}</a>
        </article>`;
  }).join('\n');
  return `      <p class="block-lead">${bi('量化者决定了这个包的<b>档位覆盖、命名规范、是否带 imatrix、什么时候跟进新模型</b>。这一区块说明「选这个量化者的量化意味着什么」。', "The quantiser decides this build's <b>tier coverage, naming convention, whether it ships imatrix, and how fast it follows new models</b>. This section spells out what choosing that quantiser means.")}</p>
${cards}`;
}

/** 系列页 · F 区块：更新记录 */
function blockF(s, m) {
  const items = m.variants
    .slice()
    .sort((a, b) => String(b.lastModified).localeCompare(String(a.lastModified)))
    .map((v) => `        <li>
          <span class="log-date">${fmtDate(v.lastModified)}</span>
          <a href="${esc(v.url)}" target="_blank" rel="noopener"><code>${esc(v.quantizer)}</code></a>
          <span class="muted">${bi(`更新了 ${v.coverage} 个档位`, `updated ${v.coverage} tiers`)}${v.imatrix ? bi(' · 含 imatrix', ' · with imatrix') : ''}</span>
        </li>`).join('\n');
  return `      <p class="block-lead">${bi('按更新时间倒序。更新频繁说明该量化者在跟进新版本；长期不更新则基础模型升版后可能不同步。', 'Sorted by most recent update. Frequent updates mean the quantiser is tracking new releases; a long silence means it may have fallen behind the base model.')}</p>
      <ul class="log">
${items}
      </ul>
      <p class="muted small">${bi('基础模型','Base model')} <code>${esc(m.repo)}</code> ${bi('最近更新：','last updated:')} ${fmtDate(m.lastModified)}　·　${bi('本站采集时间：','collected:')} ${esc((s.collectedAt || '').slice(0, 10))}</p>`;
}

/** 极简 Markdown → HTML（只处理粗体/代码/列表/段落） */
function mdLite(md) {
  return md
    .split(/\n{2,}/)
    .map((blk) => {
      if (/^[-*] /m.test(blk) || /^\d+\. /m.test(blk)) {
        const items = blk.split('\n').filter((l) => l.trim()).map((l) =>
          `  <li>${inline(l.replace(/^\s*[-*]\s+/, '').replace(/^\s*\d+\.\s+/, ''))}</li>`).join('\n');
        return `<ul>\n${items}\n</ul>`;
      }
      return `<p>${inline(blk).replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');
}
function inline(t) {
  return esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

// ═════════════════════════════════════════════════════════════════════════
// 页面
// ═════════════════════════════════════════════════════════════════════════

function seriesPage(s) {
  const memberNav = s.members.map((m, i) =>
    `<a href="#m${i}">${bi(esc(m.label.zh), esc(m.label.en || m.label.zh))}</a>`).join('');

  const sections = s.members.map((m, i) => `      <section class="member" id="m${i}">
        <h3><span class="member-idx">${bi('成员','Member')} ${i + 1}</span>${bi(esc(m.label.zh), esc(m.label.en || ENWords(m.label.zh)))}</h3>
        <p class="member-meta">${bi(esc(EN('params', m.params || '')), esc(m.paramsEn || ENWords(m.params || '')))}　·　${bi(esc(m.role?.zh || ''), esc(m.role?.en || ENWords(m.role?.zh || '')))}　·　${bi(`${m.variantCount} 个量化来源`, `${m.variantCount} quant sources`)}</p>
        <div class="block" id="a${i}">
          <h4><span class="blk">A</span>${bi('基础模型卡','Base model card')} <small>${bi('规格 · 许可 · 访问门槛 · 参数量三来源交叉核对','specs · licence · access · parameter count cross-checked across three sources')}</small></h4>
${blockA(s, m)}
        </div>
        <div class="block" id="b${i}">
          <h4><span class="blk">B</span>${bi('该选哪个','Which one to pick')} <small>${bi('按你的显存倒推','work backwards from your VRAM')}</small></h4>
${blockB(s, m)}
        </div>
        <div class="block" id="c${i}">
          <h4><span class="blk">C</span>${bi('量化版本总表','Quantisation versions')} <small>${bi('横向对比','side by side')}</small></h4>
${blockC(s, m)}
        </div>
        <div class="block" id="d${i}">
          <h4><span class="blk">D</span>${bi('每个变体详解','Every variant in detail')} <small>${bi('七字段','seven fields')}</small></h4>
${blockD(s, m)}
        </div>
        <div class="block" id="e${i}">
          <h4><span class="blk">E</span>${bi('量化者档案','Quantiser profiles')} <small>${bi('选量化者意味着什么','what choosing a quantiser means')}</small></h4>
${blockE(s, m)}
        </div>
        <div class="block" id="f${i}">
          <h4><span class="blk">F</span>${bi('更新记录','Update history')} <small>${bi('谁在跟进','who is keeping up')}</small></h4>
${blockF(s, m)}
        </div>
      </section>`).join('\n');

  const body = `  <div class="container">
    <nav class="crumbs"><a href="${DOMAIN}">← ${bi('全部系列','All series')}</a></nav>
    <header class="page-head">
      <p class="eyebrow"><span data-zh>${esc(s.vendor.zh)}</span><span data-en>${esc(s.vendor.en)}</span>　·　${bi('发布于','released')} ${esc(s.released)}</p>
      <h1><span data-zh>${esc(s.name.zh)}</span><span data-en>${esc(s.name.en)}</span></h1>
      <p class="lede">${bi(esc(s.summary), esc(SUMMARY_EN[s.code] || s.summary))}</p>
      <ul class="pos">${s.positions.map((p) => `<li>${bi(esc(p), esc(EN('positions', p)))}</li>`).join('')}</ul>
      <nav class="member-nav">${memberNav}</nav>
    </header>
${trustBanner()}
${cnSection(s.cn)}
${sections}
${companionBlock()}
    <section class="legal-note">
      <h3>${bi('关于数据与许可', 'Data and licensing')}</h3>
      <p>${bi('本站数据全部来自','All data here comes from the')} <a href="https://huggingface.co" target="_blank" rel="noopener">Hugging Face</a> ${bi('公开 API，采集时间','public API, collected')} <code>${esc((s.collectedAt || '').slice(0, 10))}</code>${bi("，为快照数据。", "; this is a snapshot.")}</p>
      <p>${bi('本站','This site does')} <b>${bi('不下载、不托管任何模型权重文件','not download or host any model weight files')}</b>${bi('，只提供发布页链接。许可字段原样引自发布页，',' — it only links to release pages. Licence fields are quoted verbatim from them,')} <b>${bi('本站不解读许可条款、不构成法律意见','this site does not interpret licence terms or give legal advice')}</b>${bi('，一切以',' and everything is governed by')}<a href="https://specul.com/legal.html" target="_blank" rel="noopener">${bi('发布页原文', 'the legal page')}</a>${bi('为准。', '.')}</p>
      <p>${bi('模型名称均为各自权利人的商标，此处仅作描述性使用。本站与上述厂商无隶属或合作关系。', 'Model names are trademarks of their respective owners and are used here only descriptively. This site is not affiliated with or endorsed by any of the vendors above.')}</p>
    </section>
  </div>
  <!-- B2：量化仓筛选（脚本在 site-filter.js，读 .vwrap 作用域） -->
  <script>${FILTER_SCRIPT}</script>`;

  return shell({
    current: 'models',
    // 子页在 /series/<code>/（两級深），品牌资源在站点根 → 需要 ../../ 才回到根。
    // 深度算错的表现是子页静默丢样式（本地服务 404，但不报错，最容易漏）。
    assetPrefix: '../../',
    title: `${s.name.zh} 量化版 · 本地部署`,
    desc: `${s.name.zh}（${s.vendor.zh}）的第三方 GGUF 量化版本对比：${s.members.length} 个规格、${s.members.reduce((n, m) => n + m.variantCount, 0)} 个量化来源，含实测文件体积、许可、上下文长度与选档建议。`,
    canonical: `${DOMAIN}series/${s.code}/`,
    accent: ACCENT,
    body,
repo: 'https://github.com/speculcom/ai-handbook',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Dataset',
      name: `${s.name.zh} GGUF 量化版本索引`,
      description: s.summary,
      url: `${DOMAIN}series/${s.code}/`,
      isAccessibleForFree: true,
      /* 许可：models 仓内无 LICENSE，legal.html 明确「未授权、仅引用链接」。
       * 2026-11-03 删除原 CC0 1.0 声明 —— 与 legal 自相矛盾。 */
      temporalCoverage: (s.collectedAt || '').slice(0, 10),
    },
  });
}

/* ═════════════════════════════════════════════════════════════════════════
 * v7 S51：家族谱系卡详情页（/families/<code>/）
 * 回答「这类开放权重模型是什么来头、现在哪一代、各档什么许可、官方声明过什么」。
 * 与 series 页的关系：家族卡管「选哪个模型」，series 页管「选哪个量化版」。
 * ⚠ 版式走 css/models.css 的 .m-fam 组件（宪章 1：models 站内一处定义、全家页消费）。
 * ═════════════════════════════════════════════════════════════════════════ */
function familyPage(f) {
  const gens = f.generations.map((g) => `
        <li class="fam-gen">
          <div class="fam-gen-head"><b>${bi(esc(g.gen), esc(g.genEn || g.gen))}</b><span class="fam-gen-date">${esc(g.date)}</span>${g.gen === f.currentGen.zh || g.gen === f.currentGen.en ? `<span class="fam-gen-cur">${bi('当前代','current')}</span>` : ''}</div>
          <p>${bi(esc(g.zh), esc(g.en || g.zh))}</p>
          ${g.url ? `<a class="fam-src" href="${esc(g.url)}" target="_blank" rel="noopener">${bi('官方页面 ↗','official page ↗')}</a>` : ''}
        </li>`).join('');

  const tiers = f.sizeTiers.map((t) => `<li>${bi(esc(t.zh), esc(t.en || t.zh))}</li>`).join('');

  const lics = f.licenses.map((L2) => `<li>${licBadge(L2.id)}<span class="fam-lic-txt">${bi(esc(L2.zh), esc(L2.en || L2.zh))}</span>${L2.url ? ` <a class="fam-src" href="${esc(L2.url)}" target="_blank" rel="noopener">${bi('许可原文 ↗','licence text ↗')}</a>` : ''}</li>`).join('');

  const claims = f.claims.map((c) => `
        <li>${bi(esc(c.zh), esc(c.en || c.zh))}<a class="fam-src" href="${esc(c.url)}" target="_blank" rel="noopener">${bi('出处 ↗','source ↗')}</a></li>`).join('');

  /* onSite：已收录 → 链到本站系列页（量化对比）；未收录 → 诚实说明（不造空壳链接）。 */
  const onSiteHtml = (f.onSite?.series || []).length
    ? `<p class="fam-onsite">${bi('本站已收录该家族的量化对比：', 'This site covers this family\'s quantisations: ')}${(f.onSite.series || []).map((sc) => {
        const s = seriesList.find((x) => x.code === sc);
        return s ? `<a href="../series/${sc}/">${bi(esc(s.name.zh), esc(s.name.en || s.name.zh))}</a>` : '';
      }).join(' ')}</p>`
    : `<p class="fam-onsite fam-onsite-no">${bi(esc(f.onSite?.zh || ''), esc(f.onSite?.en || ''))}</p>`;

  /* S53 派生标记（A6.5 base_model 口径）：官方模型卡声明 base_model 的家族，
   * 把「权重谱系从哪来」写进卡页——派生不是贬义，选它=选基座谱系+该厂商后训练。 */
  const derivedHtml = f.derived ? `
    <section class="fam-sec">
      <h2>${bi('派生标记', 'Derived from')} <small>${bi('按官方模型卡 base_model 声明', 'per the official model-card base_model declaration')}</small></h2>
      <p class="fam-derived">${bi(esc(f.derived.zh), esc(f.derived.en))}　${bi('基座', 'base')}：<code>${esc(f.derived.base)}</code>　<a class="fam-src" href="${esc(f.derived.url)}" target="_blank" rel="noopener">${bi('出处 ↗','source ↗')}</a></p>
    </section>` : '';

  const body = `  <div class="container">
    <nav class="crumbs"><a href="${DOMAIN}">← ${bi('全部家族','All families')}</a></nav>
    <header class="page-head">
      <p class="eyebrow"><span data-zh>${esc(f.vendor.zh)}</span><span data-en>${esc(f.vendor.en)}</span>　·　${bi('当前代','current generation')} ${bi(esc(f.currentGen.zh), esc(f.currentGen.en))}（${esc(f.currentGenDate)}）</p>
      <h1><span data-zh>${esc(f.name.zh)}</span><span data-en>${esc(f.name.en)}</span><span class="sub">${bi('模型家族谱系卡','model family lineage card')}</span></h1>
      <p class="lede">${bi(esc(f.positioning.zh), esc(f.positioning.en))}</p>
      ${onSiteHtml}
    </header>
${trustBanner()}
${cnSection(f.cn)}

    <section class="fam-sec">
      <h2>${bi('代次','Generations')}</h2>
      <ul class="fam-gens">${gens}
      </ul>
    </section>
${derivedHtml}

    <section class="fam-sec">
      <h2>${bi('尺寸档','Size tiers')}</h2>
      <ul class="fam-tiers">${tiers}</ul>
    </section>

    <section class="fam-sec">
      <h2>${bi('许可','Licences')}</h2>
      <ul class="fam-lics">${lics}</ul>
    </section>

    <section class="fam-sec">
      <h2>${bi('官方能力声明（带出处）','Official capability claims (with sources)')}</h2>
      <ul class="fam-claims">${claims}
      </ul>
      <p class="fam-claims-note">${bi('以上均为厂商官方页面原文或官方自评基准的转述；涉及横评结论的，本站不背书——本站不跑 benchmark。', 'The above are quotations of official pages or transcriptions of vendor-run benchmarks; this site does not endorse cross-model conclusions — it runs no benchmarks.')}</p>
    </section>

    <section class="fam-sec fam-sources">
      <h2>${bi('出处','Sources')}</h2>
      <ul class="fam-src-list">${f.sources.map((s) => `<li>${bi(esc(s.label) + '：', esc(s.labelEn || s.label) + ': ')}<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a></li>`).join('')}
      </ul>
      <p class="fam-foot">${bi(`核验快照：${f.last_verified} · 本站不实测、不排名，未知就写未知。`, `Verification snapshot: ${f.last_verified} · no benchmarks, no rankings — unknown stays unknown.`)}</p>
    </section>
  </div>`;

  return shell({
    current: 'models',
    /* 子页在 /families/<code>/（两级深），品牌资源在站点根 → ../../（同 series 页）。
     * 深度算错的表现是子页静默丢样式（本地服务 404 但不报错，最容易漏）。 */
    assetPrefix: '../../',
    title: `${f.name.zh} 家族 · 开放权重谱系`,
    desc: `${f.name.zh}（${f.vendor.zh}）的家族谱系卡：当前代 ${f.currentGen.zh}、代次沿革、尺寸档、许可与官方能力声明，全部带官方出处。核验于 ${f.last_verified}。`,
    canonical: `${DOMAIN}families/${f.code}/`,
    accent: ACCENT,
    body,
    repo: 'https://github.com/speculcom/ai-handbook',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: `${f.name.zh} 家族谱系卡`,
      description: f.positioning.zh,
      url: `${DOMAIN}families/${f.code}/`,
      dateModified: f.last_verified,
    },
  });
}

/* ═════════════════════════════════════════════════════════════════════════
 * v7 S54：闭源谱系卡详情页（/closed/<code>/）
 * 闭源事实会腐烂——stale 机制的核心是「复核到期必须可见」：
 * 到期 → 页顶金色横幅（不是静默放行）；未到期 → 页脚写明下次复核日。
 * validate.mjs 第 7 节对到期发卡内警告，本渲染层兑现横幅，models-check 验证兑现。
 * ═════════════════════════════════════════════════════════════════════════ */
function staleState(c) {
  const due = new Date(c.last_verified);
  due.setDate(due.getDate() + c.review_interval_days);
  const overdue = due < new Date();
  return { due: due.toISOString().slice(0, 10), overdue };
}

function closedPage(c) {
  const st = staleState(c);
  const staleBanner = st.overdue
    ? `    <section class="stale-banner" role="alert">
      <b>${bi('复核已到期', 'Review overdue')}</b>　${bi(`这张卡上次核验是 ${esc(c.last_verified)}，按 ${c.review_interval_days} 天复核周期应在 ${esc(st.due)} 前复核。闭源厂商改规格不通知任何人——下面的内容截至核验日可信，之后可能已变，请以官方页为准。`, `Last verified ${esc(c.last_verified)}; per the ${c.review_interval_days}-day review cycle it should have been re-checked by ${esc(st.due)}. Closed vendors change specs without notice — everything below was true as of the verification date and may have changed since. Check the official pages.`)}
    </section>`
    : '';

  const gens = c.generations.map((g) => `
        <li class="fam-gen">
          <div class="fam-gen-head"><b>${bi(esc(g.gen), esc(g.genEn || g.gen))}</b><span class="fam-gen-date">${esc(g.date)}</span>${g.date === c.currentGenDate && (c.currentGen.zh.includes(g.gen) || c.currentGen.en.includes(g.gen)) ? `<span class="fam-gen-cur">${bi('当前代','current')}</span>` : ''}</div>
          <p>${bi(esc(g.zh), esc(g.en || g.zh))}</p>
          ${g.url ? `<a class="fam-src" href="${esc(g.url)}" target="_blank" rel="noopener">${bi('官方页面 ↗','official page ↗')}</a>` : ''}
        </li>`).join('');

  const factRows = c.facts.map((fct) => `
        <li><b>${bi(esc(fct.k.zh), esc(fct.k.en))}</b>　${bi(esc(fct.v.zh), esc(fct.v.en))}<a class="fam-src" href="${esc(fct.url)}" target="_blank" rel="noopener">${bi('出处 ↗','source ↗')}</a></li>`).join('');

  const onSiteHtml = (c.onSite?.zh || c.onSite?.en)
    ? `<p class="fam-onsite">${bi(esc(c.onSite.zh), esc(c.onSite.en))}</p>`
    : '';

  const body = `  <div class="container">
    <nav class="crumbs"><a href="${DOMAIN}">← ${bi('回开放权重图谱','Back to the open-weight map')}</a></nav>
    <header class="page-head">
      <p class="eyebrow"><span data-zh>${esc(c.vendor.zh)}</span><span data-en>${esc(c.vendor.en)}</span>　·　${bi('闭源谱系卡','closed model lineage card')}　·　${bi('当前代','current generation')} ${bi(esc(c.currentGen.zh), esc(c.currentGen.en))}（${esc(c.currentGenDate)}）</p>
      <h1><span data-zh>${esc(c.name.zh)}</span><span data-en>${esc(c.name.en)}</span><span class="sub">${bi('闭源模型 · 官方规格快照 · 带复核周期','closed model · official spec snapshot · with review cycle')}</span></h1>
      <p class="lede">${bi(esc(c.positioning.zh), esc(c.positioning.en))}</p>
      <p class="closed-access"><b>${bi('怎么用得到', 'How you can use it')}：</b>${bi(esc(c.access.zh), esc(c.access.en))}</p>
      ${onSiteHtml}
    </header>
${staleBanner}
${cnSection(c.cn)}

    <section class="fam-sec">
      <h2>${bi('代次','Generations')} <small>${bi('按官方发布/文档页记录', 'as recorded by official releases and docs')}</small></h2>
      <ul class="fam-gens">${gens}
      </ul>
    </section>

    <section class="fam-sec">
      <h2>${bi('官方规格事实（每条挂出处）','Official spec facts (each with a source)')} <small>${bi('截至核验日', 'as of the verification date')}</small></h2>
      <ul class="fam-claims cn-rows">${factRows}
      </ul>
      <p class="fam-claims-note">${bi('以上均为官方文档/发布页原文的转述，核验日之后厂商可能已改规格；本站不实测、不排名、不背书厂商自评，也不收录价格数字——定价请直接看官方定价页（出处节有链接）。', 'The above transcribe official docs/release pages as of the verification date; vendors may have changed specs since. This site runs no benchmarks, ranks nothing, endorses no vendor self-assessments, and records no price figures — for pricing go to the official pricing page (linked in Sources).')}</p>
    </section>

    <section class="fam-sec fam-sources">
      <h2>${bi('出处','Sources')}</h2>
      <ul class="fam-src-list">${c.sources.map((s) => `<li>${bi(esc(s.label) + '：', esc(s.labelEn || s.label) + ': ')}<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a></li>`).join('')}
      </ul>
      <p class="fam-foot">${bi(`核验快照：${c.last_verified} · 复核周期 ${c.review_interval_days} 天，下次应在 ${esc(st.due)} 前复核${st.overdue ? '（已到期——见页顶横幅）' : ''}。本站不实测、不排名，未知就写未知。`, `Verification snapshot: ${c.last_verified} · ${c.review_interval_days}-day review cycle, next re-check due by ${esc(st.due)}${st.overdue ? ' (overdue — see the banner above)' : ''}. No benchmarks, no rankings — unknown stays unknown.`)}</p>
    </section>
  </div>`;

  return shell({
    current: 'models',
    /* /closed/<code>/ 也是两级深 → 品牌资源 ../../（S50 教训：深度错=子页静默丢样式） */
    assetPrefix: '../../',
    title: `${c.name.zh} · 闭源谱系卡`,
    desc: `${c.name.zh}（${c.vendor.zh}）的闭源谱系卡：当前代 ${c.currentGen.zh}、官方规格事实全部挂出处、${c.review_interval_days} 天复核周期。核验于 ${c.last_verified}。`,
    canonical: `${DOMAIN}closed/${c.code}/`,
    accent: ACCENT,
    body,
    repo: 'https://github.com/speculcom/ai-handbook',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: `${c.name.zh} 闭源谱系卡`,
      description: c.positioning.zh,
      url: `${DOMAIN}closed/${c.code}/`,
      dateModified: c.last_verified,
    },
  });
}

/* ═════════════════════════════════════════════════════════════════════════
 * v7 S55：做模型专题详情页（/guides/<id>.html）
 * 方法论文章：节标题 `## [中文|English]` → bi 双节点；正文 markdown 链接
 * （含跨站链向 learn 词条）渲染成真链接。版式复用 .fam-sec（宪章 1）。
 * ═════════════════════════════════════════════════════════════════════════ */
function guideInline(t) {
  return esc(t)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}
function guideBlockMd(md) {
  return md.split(/\n{2,}/).map((blk) => {
    const lines = blk.split('\n').filter((l) => l.trim());
    if (lines.every((l) => /^\s*(?:[-*]|\d+\.)\s+/.test(l))) {
      return `<ul>\n${lines.map((l) => `  <li>${guideInline(l.replace(/^\s*(?:[-*]|\d+\.)\s+/, ''))}</li>`).join('\n')}\n</ul>`;
    }
    return `<p>${lines.map(guideInline).join('<br>')}</p>`;
  }).join('\n');
}

function guidePage(g) {
  /* C0-18：正文译文按节索引对齐（i18n/guides/<id>.en.json）。
   * 数量不一致或缺文件 → 该节/该条诚实回退中文（宁缺勿错配，同 tools bodies 口径）。 */
  const en = GUIDE_EN[g.id];
  /* ⚠ guideList 解析会把首个 `## ` 之前的空段也收进来（既有行为，渲染成空节）——
   * 译文按**有标题的真节**索引对齐，空段不参与。 */
  const realIdx = g.sections.map((s) => s.head !== '').reduce((a, v, i) => (v ? a.concat(i) : a), []);
  const secsOk = !!(en && Array.isArray(en.sections) && en.sections.length === realIdx.length);
  const srcOk = !!(en && Array.isArray(en.sources) && en.sources.length === g.sources.length);
  let ri = -1;
  const secs = g.sections.map((s, i) => {
    const bm = s.head.match(/^\[(.+)\|(.+)\]$/);
    const head = bm ? bi(esc(bm[1]), esc(bm[2])) : guideInline(s.head);
    const zhHtml = guideBlockMd(s.text);
    if (s.head !== '') ri++;
    const bodyHtml = secsOk && s.head !== '' ? bi(zhHtml, guideBlockMd(en.sections[ri])) : zhHtml;
    return `    <section class="fam-sec" id="guide-section-${i}">
      <h2>${head}</h2>
${bodyHtml}
    </section>`;
  }).join('\n');
  const srcRows = g.sources.map((s, i) => {
    const labelHtml = srcOk ? bi(guideInline(s.label || ''), guideInline(en.sources[i] || '')) : guideInline(s.label || '');
    return `        <li>${labelHtml}：<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a></li>`;
  }).join('\n');
  /* .guide-body：文章页的排印作用域（models.css 的正文规则限定在它内部，
   * 防裸 `.fam-sec ul` 之类把家族页的无点列表带偏）。 */
  const body = `  <div class="container guide-body">
    <nav class="crumbs"><a href="${DOMAIN}">← ${bi('回开放权重图谱','Back to the open-weight map')}</a></nav>
    <header class="page-head">
      <p class="eyebrow">${bi('做模型专题','How models are made')}${g.stage ? `　<span class="t-tag">${bi(`训练管线 · 第 ${g.stage} 站`, `training pipeline · stage ${g.stage}`)}</span>` : ''}</p>
      <h1><span data-zh>${esc(g.title)}</span><span data-en>${esc(g.titleEn)}</span><span class="sub">${bi('从业者视角的方法论 · 关键事实挂官方出处','practitioner-perspective methodology · key facts carry official sources')}</span></h1>
      <p class="lede">${bi(esc(g.summary), esc(g.summaryEn))}</p>
    </header>

    <nav class="fam-sec" aria-label="文章目录" data-ui-aria-label-zh="文章目录" data-ui-aria-label-en="Article contents"><p>${bi('按问题阅读', 'On this page')}</p><ul>${g.sections.map((section,i)=>{const m=section.head.match(/^\[(.+)\|(.+)\]$/);return section.head?`<li><a href="#guide-section-${i}">${m?bi(esc(m[1]),esc(m[2])):esc(section.head)}</a></li>`:'';}).join('')}</ul></nav>
${secs}
${g.id === 'gpu-cost-math' ? capacityWorkbench() : ''}
    <nav class="fam-sec" aria-label="下一步" data-ui-aria-label-zh="下一步" data-ui-aria-label-en="Next steps">
      <h2>${bi('继续做什么','What to do next')}</h2>
      <ul><li><a href="${g.id === 'gpu-cost-math' ? 'task-models.html' : 'gpu-cost-math.html#capacity-workbench'}">${g.id === 'gpu-cost-math' ? bi('按输入输出区分任务模型','Distinguish task models by input and output') : bi('填写上下文与并发容量假设','Budget context and concurrency')}</a></li>
      <li><a href="https://learn.specul.com/guide/怎么验证%20AI%20的输出/">${bi('检查输出是否有依据','Verify evidence for the output')}</a></li>
      <li><a href="https://tools.specul.com/mcp/guides/failure-library.html#by-symptom">${bi('按症状排查','Troubleshoot by symptom')}</a></li></ul>
    </nav>

    <section class="fam-sec fam-sources">
      <h2>${bi('出处','Sources')}</h2>
      <ul class="fam-src-list">
${srcRows}
      </ul>
      <p class="fam-foot">${bi(`基础来源快照：${g.lastVerified}；单项补充与核验范围见正文和来源标签。请回原始说明核对规格、方法与适用条件。`, `Base source snapshot: ${g.lastVerified}; item-specific additions and check scope appear in the text and source labels. Check original specifications, methods and conditions.`)}</p>
    </section>
${topicsLine(`https://models.specul.com/guides/${g.id}.html`)}  </div>`;
  return shell({
    current: 'models',
    /* /guides/<id>.html 是一级深（与 /families/<code>/ 不同构）→ assetPrefix '../'。
     * ⚠ 深度按页面实际层级传（S50 教训：错一级 = 子页静默丢样式）。 */
    assetPrefix: '../',
    title: `${g.title} · 做模型专题`,
    desc: `${g.summary}（核验于 ${g.lastVerified}，关键事实挂官方出处）`,
    canonical: `${DOMAIN}guides/${g.id}.html`,
    accent: ACCENT,
    body,
    repo: 'https://github.com/speculcom/ai-handbook',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: g.titleEn || g.title,
      description: g.summaryEn || g.summary,
      url: `${DOMAIN}guides/${g.id}.html`,
      dateModified: g.lastVerified,
    },
  });
}

function indexPage() {
  /* v7 S51：家族卡网格。卡面信息：家族名 + 厂商 · 当前代（日期）+ 定位一句话
   * + 尺寸档数 / 代次数 + 许可徽标 + 本站收录入口（或诚实说明未收录原因）。 */
  const familyCards = familyList.map((f) => {
    const onSite = (f.onSite?.series || []).map((sc) => seriesList.find((x) => x.code === sc)).filter(Boolean);
    const cn = f.cn || {};
    return `        <a class="m-famcard" href="families/${f.code}/" data-lic="${esc(f.licenses.map((L2) => L2.id).join(' '))}" data-cn-origin="${esc(cn.origin || '')}" data-cn-direct="${esc(cn.direct || '')}" data-cn-filing="${esc((cn.filing || {}).status || '')}">
          <div class="m-famcard-h">
            <h3>${bi(esc(f.name.zh), esc(f.name.en))}</h3>
            <span class="m-famcard-vendor">${bi(esc(f.vendor.zh), esc(f.vendor.en || f.vendor.zh))}</span>
          </div>
          <p class="m-famcard-cur">${bi('当前代','current')} <b>${bi(esc(f.currentGen.zh), esc(f.currentGen.en))}</b> · ${esc(f.currentGenDate)}${f.derived ? `　<span class="t-tag">${bi(`派生自 ${esc(f.derived.base)}`, `derived from ${esc(f.derived.base)}`)}</span>` : ''}</p>
          <p class="m-famcard-sum">${bi(esc(f.positioning.zh), esc(f.positioning.en))}</p>
          <div class="m-famcard-meta">
            <span><b>${f.generations.length}</b> ${bi('代','generations')}</span>
            <span><b>${f.sizeTiers.length}</b> ${bi('个尺寸档','size tiers')}</span>
            <span>${f.licenses.map((L2) => licBadge(L2.id, { asSpan: true })).join(' ')}</span>
          </div>
          <div class="m-famcard-cn">${cnChips(cn)}</div>
          <p class="m-famcard-go">${onSite.length
            ? bi(`看量化对比（${onSite.map((s) => s.name.zh).join(' / ')}）→`, `Quantisation coverage (${onSite.map((s) => s.name.en || s.name.zh).join(' / ')}) →`)
            : bi('未收量化对比，卡内说明原因 →', 'No quantisation coverage — see the card →')}</p>
        </a>`;
  }).join('\n');

  /* v7 S54：闭源谱系卡网格（复用 .m-famcard 版式，宪章 1：一套 UI 一处定义）。
   * 卡面多一行「复核状态」——到期与否是可见状态，不装作永远最新。 */
  const closedCards = closedList.map((c) => {
    const cn = c.cn || {};
    const st = staleState(c);
    return `        <a class="m-famcard" href="closed/${c.code}/" data-cn-origin="${esc(cn.origin || '')}" data-cn-direct="${esc(cn.direct || '')}" data-cn-filing="${esc((cn.filing || {}).status || '')}">
          <div class="m-famcard-h">
            <h3>${bi(esc(c.name.zh), esc(c.name.en))}</h3>
            <span class="m-famcard-vendor">${bi(esc(c.vendor.zh), esc(c.vendor.en || c.vendor.zh))}</span>
          </div>
          <p class="m-famcard-cur">${bi('当前代','current')} <b>${bi(esc(c.currentGen.zh), esc(c.currentGen.en))}</b> · ${esc(c.currentGenDate)}</p>
          <p class="m-famcard-sum">${bi(esc(c.positioning.zh), esc(c.positioning.en))}</p>
          <div class="m-famcard-meta">
            <span><b>${c.generations.length}</b> ${bi('代','generations')}</span>
            <span><b>${c.facts.length}</b> ${bi('条官方事实','official facts')}</span>
            <span class="t-state${st.overdue ? ' is-warn' : ' is-ok'}">${st.overdue ? bi(`复核已到期（${esc(st.due)}）`, `review overdue (${esc(st.due)})`) : bi(`核验 ${esc(c.last_verified)}`, `verified ${esc(c.last_verified)}`)}</span>
          </div>
          <div class="m-famcard-cn">${cnChips(cn)}</div>
          <p class="m-famcard-go">${bi('看官方规格快照 →', 'Official spec snapshot →')}</p>
        </a>`;
  }).join('\n');

  /* v7 S55：做模型专题卡（复用 .m-famcard 版式）。
   * 卡序按 frontmatter 的 stage（训练管线站序）走，不是字母序——读者按流程读。 */
  const ordered = [...guideList].sort((a, b) => (Number(a.stage) || 99) - (Number(b.stage) || 99));
  const guideCards = ordered.map((g) => `        <a class="m-famcard" href="guides/${g.id}.html">
          <div class="m-famcard-h">
            <h3>${bi(esc(g.title), esc(g.titleEn))}</h3>
            <span class="m-famcard-vendor">${bi('做模型专题','how models are made')}</span>
          </div>
          <p class="m-famcard-cur">${g.stage ? `<span class="t-tag">${bi(`训练管线 · 第 ${esc(g.stage)} 站`, `pipeline · stage ${esc(g.stage)}`)}</span>` : ''}</p>
          <p class="m-famcard-sum">${bi(esc(g.summary), esc(g.summaryEn))}</p>
          <div class="m-famcard-meta">
            <span><b>${g.sections.length}</b> ${bi('节','sections')}</span>
            <span><b>${g.sources.length}</b> ${bi('条官方出处','official sources')}</span>
            <span class="t-state is-ok">${bi(`核验 ${esc(g.lastVerified)}`, `verified ${esc(g.lastVerified)}`)}</span>
          </div>
          <p class="m-famcard-go">${bi('读这一篇 →', 'Read this guide →')}</p>
        </a>`).join('\n');

  const cards = seriesList.map((s) => {
    const vTotal = s.members.reduce((n, m) => n + m.variantCount, 0);
    const fTotal = s.members.reduce((n, m) => n + m.variants.reduce((k, v) => k + v.coverage, 0), 0);
    const owners = [...new Set(s.members.flatMap((m) => m.variants.map((v) => v.quantizer)))];
    const loose = s.members.every((m) => LOOSE.test(m.license || ''));
    /* B2：索引页的筛选按「系列名 / 厂商 / 简介」搜 + 按「许可」筛。
     * 许可挂成 data-lic（空格分隔，因为一个系列可能有多个许可），搜索文本挂 data-blob。 */
    const licSet = [...new Set(s.members.map((m) => m.license || ''))].filter(Boolean);
    const blob = [s.name.zh, s.name.en, s.vendor.zh, s.vendor.en, s.summary, ...s.positions].join(' ').toLowerCase();
    const cn = s.cn || {};
    return `        <a class="scard${loose ? ' scard-loose' : ''}" href="series/${s.code}/" data-lic="${esc(licSet.join(' '))}" data-cn-origin="${esc(cn.origin || '')}" data-cn-direct="${esc(cn.direct || '')}" data-cn-filing="${esc((cn.filing || {}).status || '')}" data-blob="${esc(blob)}">
          <div class="scard-h">
            <h3>${bi(esc(s.name.zh), esc(s.name.en))}</h3>
            <span class="scard-vendor">${bi(esc(s.vendor.zh), esc(s.vendor.en || s.vendor.zh))}</span>
          </div>
          <p class="scard-sum">${bi(esc(s.summary), esc(SUMMARY_EN[s.code] || s.summary))}</p>
          <ul class="scard-pos">${s.positions.map((p) => `<li>${bi(esc(p), esc(EN('positions', p)))}</li>`).join('')}</ul>
          <div class="scard-stats">
            <span><b>${s.members.length}</b> ${bi('规格','sizes')}</span>
            <span><b>${vTotal}</b> ${bi('量化源','quant repos')}</span>
            <span><b>${fTotal}</b> ${bi('档位','tiers')}</span>
            <span><b>${owners.length}</b> ${bi('量化者','quantisers')}</span>
          </div>
          <div class="scard-lic">${s.members.map((m) => licBadge(m.license, { asSpan: true })).join(' ')} ${cnChips(cn)}</div>
          <p class="scard-go">${bi('看该选哪一档 →','Which tier to pick →')}</p>
        </a>`;
  }).join('\n');

  /* ⚠ 这些数字过去互相贴错标签（2026-10-08 由 content-freshness 抓出一次，
   * 2026-11-03 内容审计又抓到 still 混用）。现在四个口径分开算，标签一一对应：
   *   totalRepo    = 模型仓（member）数
   *   totalQuantRepo = 量化仓（variant）数 —— 每个第三方/官方 GGUF 仓算一个
   *   totalTier    = 量化档数（sum(variant.coverage)，按去分片后的档名去重）
   *   totalFile    = GGUF 文件数（sum(variant.files.length)，分片已聚合）
   * 首页大字与 desc 都用这组变量，不再出现「129 量化档 / 1270 GGUF」这种错位。*/
  const totalRepo = seriesList.reduce((n, s) => n + s.members.length, 0);
  const totalQuantRepo = seriesList.reduce((n, s) => n + s.members.reduce((k, m) => k + m.variants.length, 0), 0);
  const totalTier = seriesList.reduce((n, s) => n + s.members.reduce((k, m) => k + m.variants.reduce((j, v) => j + v.coverage, 0), 0), 0);
  const totalFile = seriesList.reduce((n, s) => n + s.members.reduce((k, m) => k + m.variants.reduce((j, v) => j + v.files.length, 0), 0), 0);
  const allOwners = [...new Set(seriesList.flatMap((s) => s.members.flatMap((m) => m.variants.map((v) => v.quantizer))))].sort();

  /* v7 S52：中文生态三个筛选下拉的选项（只列数据里真实出现的值——
   * 空选项不会变成「选了等于没选」的死控件，与 agent 站 asel-* 同一原则）。 */
  const cnOpts = (dim) => {
    const labelMap = dim === 'origin' ? CN_ORIGIN_LABEL : dim === 'direct' ? CN_DIRECT_LABEL : CN_FILING_LABEL;
    const vals = [...new Set(seriesList.map((s) => (dim === 'filing' ? (s.cn || {}).filing?.status : (s.cn || {})[dim])).filter(Boolean))];
    return nativeOption('', '全部', 'All') + vals.map((v) => {
      const L2 = labelMap[v] || [v, v];
      return nativeOption(v, L2[0], L2[1]);
    }).join('');
  };

  const body = `  <div class="container">
    <header class="page-head home-head">
      <p class="eyebrow">${bi('开放权重 · 怎么选','Open weights · how to choose')}</p>
      <h1><span class="grad-title">${bi('开放权重，该怎么选','How to choose open-weight models')}</span><span class="sub">${bi('先选家族与规格，再选量化版——两步都有出处','Pick the family and size first, the quantisation second — both steps carry sources')}</span></h1>
      <p class="lede">${bi('你想在<b>自己电脑上</b>跑一个大模型。问题分两层：<b>第一层</b>，开放权重的家族、代次、尺寸档、许可各不相同，该选哪个；<b>第二层</b>，同一个模型有几十个量化版，该下哪一个。本站把两层分开答：<b>家族谱系卡</b>讲第一层（出品方 / 代次 / 尺寸 / 许可 / 官方声明），<b>系列页</b>讲第二层（你的显存能跑哪档、该下多大体积）。不评模型强弱，也不排名。', 'You want to run a large model <b>on your own machine</b>. The question has two layers: <b>first</b>, which family, generation, size tier and licence; <b>second</b>, which of dozens of quantisations to download. This site answers them separately: <b>family lineage cards</b> cover layer one (vendor / generations / sizes / licences / official claims), and <b>series pages</b> cover layer two (which tier fits your VRAM, how big the download is). It does not rank models against each other.')}</p>
      <p class="lede lede-sub">${bi('<b>收录范围：开放权重（含蒸馏）——可本地部署的模型都收</b>，无论它是原生训练还是从别家模型蒸馏而来（HF 上有公开权重的 MoE 与 dense 模型）。闭源 / API-only 模型不在量化收录范围内——它们没有量化产物，下载和选型的问题不存在。本站另设<b>闭源谱系卡</b>做对照：只记官方规格快照与复核周期，不采价格、不排名。', '<b>Scope: open weights (distillation included) — any model you can run locally</b>, whether trained from scratch or distilled from another model (MoE and dense models with public weights on HF). Closed-source / API-only models are out of the quantisation scope — they have no quantisations, so the download and selection questions do not arise. The site keeps a separate set of <b>closed-model lineage cards</b> for contrast: official spec snapshots with a review cycle, no prices, no rankings.')}</p>
      <div class="home-stats">
<div><b>${familyList.length}</b><span>${bi('个家族','families')}</span></div>
<div><b>${seriesList.length}</b><span>${bi('个系列','series')}</span></div>
<div><b>${totalRepo}</b><span>${bi('个模型仓','model repos')}</span></div>
<div><b>${totalQuantRepo}</b><span>${bi('个量化仓','quant repos')}</span></div>
<div><b>${totalTier}</b><span>${bi('个量化档','quantised builds')}</span></div>
<div><b>${allOwners.length}</b><span>${bi('位量化者','quantisers')}</span></div>
<div><b>${totalFile}</b><span>${bi('个 GGUF 文件','GGUF files')}</span></div>
<div><b>${closedList.length}</b><span>${bi('张闭源谱系卡','closed cards')}</span></div>
      </div>
    </header>

${trustBanner()}

    <section class="family-list">
      <h2>${bi('家族谱系','Model families')} <small>${bi('第一层：出品方 · 代次 · 尺寸档 · 许可 · 官方声明','layer one: vendor · generations · size tiers · licences · official claims')}</small></h2>
      <p class="sec-desc">${bi('每个开放权重家族一张卡：它是什么来头、现在哪一代、有哪些尺寸档、许可能不能商用、官方声明过什么能力（声明全部挂官方出处）。家族内哪一代有本站量化对比，卡上直接给出入口。', 'One card per open-weight family: where it comes from, which generation is current, what size tiers exist, whether the licence allows commercial use, and what the vendor officially claims (every claim links to its official source). Where a generation has quantisation coverage on this site, the card links straight to it.')}</p>
      <div class="famcards">
${familyCards}
      </div>
    </section>

    <section class="closed-list">
      <h2>${bi('闭源谱系卡','Closed-model cards')} <small>${bi('对照面：官方规格快照 · 每条挂出处 · 带复核到期日', 'the contrast set: official spec snapshots · every fact sourced · with review due dates')}</small></h2>
      <p class="sec-desc">${bi('本站主体是开放权重选型，但选型绕不开闭源 API 对照。每张闭源卡只记三件事：现在哪一代、官方声明过什么规格（每条挂官方出处）、我们上次核验是什么时候。闭源厂商改规格不通知任何人——所以每张卡带复核周期，到期会在页顶挂横幅，不装作永远最新。不采价格数字（D9），定价看官方定价页链接。', 'This site is about open-weight selection, but that choice always sits next to the closed API alternative. Each closed card records exactly three things: which generation is current, what specs the vendor officially claims (every fact linked to its official source), and when we last verified it. Closed vendors change specs without notice — so every card carries a review cycle, and an overdue card shows a banner at the top instead of pretending to be current. No price figures (rule D9); pricing lives at the linked official pricing page.')}</p>
      <div class="famcards">
${closedCards}
      </div>
    </section>

    <section class="guide-list">
      <h2>${bi('做模型专题','How models are made')} <small>${bi('从业者视角：训练四阶段 · 数据与算力 · 跑起来','practitioner view: the four training stages · data & compute · serving')}</small></h2>
      <p class="sec-desc">${bi('这一栏回答「模型是怎么被造出来、又是怎么跑起来的」。它与学 AI 站互链不重复：学 AI 教使用者视角的一页科普，这里是从业者视角的深版——讲决定、讲代价、讲口径变化。关键事实全部挂论文或官方模型卡出处；本站不实测、不裁决路线之争。', 'This section answers "how models are built and how they run". It cross-links with the Learn site without duplicating it: Learn gives user-perspective one-page explainers; this is the practitioner-depth version — decisions, costs, and how the consensus changed. Key facts carry paper or official model-card sources; the site runs no benchmarks and adjudicates no route disputes.')}</p>
      <div class="famcards">
${guideCards}
      </div>
    </section>

    <section class="howto">
      <h2>${bi('怎么用这个站','How to use this site')}</h2>
      <ol class="steps">
        <li>${bi('<b>先看你有多少显存。</b>这是唯一的硬约束，8GB 和 24GB 能跑的档位完全不同。显存撑不下时看同一张表的「系统内存 / 多卡」两栏——纯 CPU 或多卡张量并行也是可行路线。', '<b>Start with how much VRAM you have.</b> It is the only hard constraint — the tiers that fit in 8GB and 24GB are entirely different. If VRAM is the limit, look at the "system memory / multi-GPU" columns in the same table — CPU-only or multi-GPU tensor parallel are viable routes.')}</li>
        <li>${bi('<b>在 B 区块初筛文件体积候选。</b>再核对缓存、并发和运行时；表格不保证能运行。', '<b>Use block B to filter file-size candidates.</b> Then budget cache, concurrency and runtime; it is not an execution guarantee.')}</li>
        <li>${bi('<b>在 C 区块横向对比量化者。</b>看谁档位全、谁带 imatrix、谁在跟进更新。', '<b>Compare quantisers side by side in block C.</b> See who covers the most tiers, who ships imatrix, and who is keeping up with releases.')}</li>
        <li>${bi('<b>在 D 区块看单档详解。</b>七个字段说清每个变体是什么、差在哪、什么时候该选它。', '<b>Read the per-tier detail in block D.</b> Seven fields spell out what each variant is, how it differs, and when to pick it.')}</li>
        <li>${bi('<b>下载前先读许可。</b>非宽松许可的，页面会标出来；量化仓没单独声明许可的，页面会写明「继承自基座」，原文链接就在旁边。', '<b>Read the licence before downloading.</b> Non-permissive licences are flagged; where a quant repo declares none, the page says "inherited from base" with the original link right beside it.')}</li>
      </ol>
    </section>

    <section class="series-list">
      <h2>${bi('已收录系列','Series covered')} <small>${bi('第二层：同一模型该下哪个量化版','layer two: which quantisation of the same model')} · ${bi('按 GGUF 量化实际下载量排序','ranked by measured GGUF download volume')}</small></h2>
      <!-- B2：系列筛选（搜索 + 许可）。选项来自数据，许可用全站并集。 -->
      <div class="sfilter" role="search">
        <label class="vf-f"><span class="vh">${bi('筛选系列', 'Filter series')}</span>
          <input type="search" class="sq" autocomplete="off" placeholder="Qwen · gemma · GLM · DeepSeek"></label>
        <label class="vf-f"><span class="vh">${bi('许可', 'Licence')}</span><select class="ssel">${
          nativeOption('', '全部', 'All') +
          [...new Set(seriesList.flatMap((s) => s.members.map((m) => m.license || '')))].filter(Boolean).sort()
            .map((L2) => `<option value="${esc(L2)}">${esc(L2)}</option>`).join('')
        }</select></label>
        <label class="vf-f"><span class="vh">${bi('出品属地', 'Origin')}</span><select class="ssel-cnorigin">${cnOpts('origin')}</select></label>
        <label class="vf-f"><span class="vh">${bi('国内下载', 'Direct access')}</span><select class="ssel-cndirect">${cnOpts('direct')}</select></label>
        <label class="vf-f"><span class="vh">${bi('备案状态', 'CAC filing')}</span><select class="ssel-cnfiling">${cnOpts('filing')}</select></label>
        <span class="vcount" aria-live="polite"></span>
      </div>
      <div class="scards">
${cards}
      </div>
    </section>

    <section class="quantizer-index">
      <h2>${bi('收录的量化者','Quantisers covered')} <small>${allOwners.length} ${bi('位','of them')}</small></h2>
      <div class="qchips">
${allOwners.map((o) => `        <a class="qchip" href="series/qwen3-8/#e0"><code>${esc(o)}</code>${QUANTIZER_NOTES[o] ? bi(esc(QUANTIZER_NOTES[o].oneLine.zh), esc(QUANTIZER_NOTES[o].oneLine.en || QUANTIZER_NOTES[o].oneLine.zh)) : ''}</a>`).join('\n')}
      </div>
    </section>

    <section class="legal-note">
      <h3>${bi('数据来源与法律立场','Sources and legal position')}</h3>
      <p>${bi('数据来自','Data comes from the')} <a href="https://huggingface.co" target="_blank" rel="noopener">Hugging Face</a> ${bi('公开 API（模型元数据 + 文件体积），采集','public API (model metadata + file sizes), collected')}${bi('时间', 'at')} <code>${esc((seriesList[0]?.collectedAt || '').slice(0, 10))}</code>${bi("，为快照数据而非实时。", "; this is a snapshot, not live data.")}</p>
      <p>${bi('<b>本站不跑 benchmark，不给质量与速度结论。</b>凡涉及主观判断处均标注「我们的口径」。', '<b>This site does not run benchmarks and does not draw quality or speed conclusions.</b> Every place we offer a judgement is marked as our own reading.')}</p>
      <p><b>${bi('不下载、不托管任何权重文件','No weight files are downloaded or hosted here')}</b>${bi('；许可原样引自发布页，本站不解读许可、不构成法律意见，一切以','; licences are quoted verbatim from release pages, this site does not interpret them or give legal advice, and everything is governed by')}<a href="https://specul.com/legal.html" target="_blank" rel="noopener">${bi('发布页原文', 'the legal page')}</a>${bi('为准。', '.')}</p>
      <p>${bi('系列选择依据四维打分（量化热度 40 / 量化广度 25 / 规模可及性 20 / 新鲜度 15），方法与落选名单见 ', 'Series selection uses a four-factor score (quantisation heat 40 / coverage 25 / size reachability 20 / freshness 15); the method and the rejected candidates are documented in ')}<a href="https://github.com/speculcom/ai-handbook" target="_blank" rel="noopener">${bi('数据仓 METHODOLOGY.md ↗', 'the data repo\'s METHODOLOGY.md ↗')}</a>${bi('。', '.')}</p>
    </section>
  </div>
  <!-- B2：系列筛选（脚本在 site-filter.js，读 .sfilter 作用域） -->
  <script>${FILTER_SCRIPT}</script>`;

  return shell({
    current: 'models',
    title: '开放权重该怎么选 · AI 模型',
    desc: `想在本地跑大模型？两步都有出处：先看家族谱系卡选家族/代次/尺寸/许可，再看系列页选量化版（${seriesList.length} 个系列、${totalRepo} 个模型仓、${totalQuantRepo} 个量化仓、${totalTier} 个量化档、${allOwners.length} 位量化者、${totalFile} 个 GGUF 文件）。不跑 benchmark，不托管权重。`,
    canonical: DOMAIN,
    accent: ACCENT,
    body,
repo: 'https://github.com/speculcom/ai-handbook',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: '开放权重该怎么选 · AI 模型',
      url: DOMAIN,
      description: '开放权重两步选型：家族谱系卡（出品方/代次/尺寸/许可/官方声明）+ 系列页（显存倒推量化版）。不评模型强弱，不排名。',
    },
  });
}

// ═════════════════════════════════════════════════════════════════════════
// 输出
// ═════════════════════════════════════════════════════════════════════════
fs.mkdirSync(path.join(SITE, 'series'), { recursive: true });
/* v7 S51：家族卡页 /families/<code>/（与 series 同构：目录形式，尾斜杠与无尾斜杠都命中）。 */
fs.mkdirSync(path.join(SITE, 'families'), { recursive: true });
/* v7 S54：闭源谱系卡页 /closed/<code>/（同构：目录形式）。 */
fs.mkdirSync(path.join(SITE, 'closed'), { recursive: true });

const idx = indexPage();
fs.writeFileSync(path.join(SITE, 'index.html'), idx);
for (const s of seriesList) {
  // 产出 series/<code>/index.html 而不是 series/<code>.html。
  // 原因：GitHub Pages 对「无扩展名路径」只在**不带尾斜杠**时 301 到 .html；
  // 一旦访客（或站内链接）写成 /series/<code>/ 就会 404。
  // 目录形式让 /series/<code>/ 与 /series/<code> 都命中同一个 index.html。
  const dir = path.join(SITE, 'series', s.code);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), seriesPage(s));
}
for (const f of familyList) {
  const dir = path.join(SITE, 'families', f.code);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), familyPage(f));
}
for (const c of closedList) {
  const dir = path.join(SITE, 'closed', c.code);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), closedPage(c));
}
/* v7 S55：guides 是单文件页（guides/<id>.html），不是目录页——
 * 文章没有可参数化的子层，目录形式反而多一层重定向。 */
if (guideList.length) {
  fs.mkdirSync(path.join(SITE, 'guides'), { recursive: true });
  for (const g of guideList) fs.writeFileSync(path.join(SITE, 'guides', `${g.id}.html`), guidePage(g));
}

console.log('══════════ 建站完成 ══════════');
console.log('index.html           ', (idx.length / 1024).toFixed(0) + ' KB');
for (const f of familyList) {
  const h = fs.statSync(path.join(SITE, 'families', f.code, 'index.html')).size;
  console.log(`families/${f.code}/`.padEnd(24), (h / 1024).toFixed(0) + ' KB  ', f.name.zh, '—', f.currentGen.zh);
}
for (const c of closedList) {
  const h = fs.statSync(path.join(SITE, 'closed', c.code, 'index.html')).size;
  const st = staleState(c);
  console.log(`closed/${c.code}/`.padEnd(24), (h / 1024).toFixed(0) + ' KB  ', c.name.zh, '—', c.currentGen.zh, st.overdue ? '⚠ 复核已到期' : `（复核应在 ${st.due} 前）`);
}
for (const s of seriesList) {
  const h = fs.statSync(path.join(SITE, 'series', s.code, 'index.html')).size;
  console.log(`series/${s.code}/`.padEnd(24), (h / 1024).toFixed(0) + ' KB  ', s.name.zh, '—', s.members.length, '成员');
}

// ═════════════════════════════════════════════════════════════════════════
const CSS = `/* Models 图谱 · 站点样式（品牌 token 来自 brand.css） */

/* ─────────────────────────────────────────────────────────────
   站点强调色 · models 本地模型 — 金（算力、量化）
   暗色金配深色前景 10.6:1；亮色金配白字 3.8:1。
   ⚠ 下面所有强调色都用 var(--brand)，**不用 var(--brand)**。
     原来这里硬编码 --cyan（23 处），而站点 accent 已改成金色 ——
     青 + 金两个主色同时出现会互相抢。现已全部改为跟随 --brand。
   ⚠ 容器宽度继承 brand.css 的 .container（--container: min(1120px, 90vw)）。
     原来这里硬编码 max-width:1180px + padding:0 20px → 正文 1080px，
     而顶栏是 1120px，左右各差 20px，视觉上像没对齐（用户报「宽度和其他站都不一样」）。
   ⚠ 排版尺度用 brand.css 的 --display-sub / --section-pad，
     不再各自写 clamp —— 「大气」靠区块留白，不只靠字号。
   ───────────────────────────────────────────────────────────── */
html:not([data-theme="light"]) {
  --brand: #8b7cf8;
  --brand-on:#fff;
  --brand-soft:rgba(139, 124, 248, .14);
  --brand-line:rgba(139, 124, 248, .34);
}
html[data-theme="light"] {
  /* B6（2026-10-09）：--brand 从 #a97a08 压深到 #906807。
     它们当**填充色**没问题，但当**正文文字色**（12px 标签、链接）在亮底上只有 3.84:1，
     达不到 AA 的 4.5。这与共享 brand.css 的既有约定一致：亮色主题用深一档的品牌色。
     新值是按「白底 + 各自柔和底」双条件算出来的（5.06 / 4.54）。 */
  --brand: #6d4fd6;
  --brand-on:#fff;
  --brand-soft:rgba(109, 79, 214, .08);
  --brand-line:rgba(109, 79, 214, .28);
}

.page-head{margin-bottom:var(--section-pad-sm)}
.eyebrow{color:var(--brand);font-size:var(--fs-xs);letter-spacing:.08em;margin:0 0 .4em}
.page-head h1{font-size:var(--display-sub);margin:0 0 .3em;line-height:1.14;letter-spacing:-.015em}
.page-head h1 .sub{display:block;font-size:var(--fs-xs);color:var(--ink-dim);font-weight:400;letter-spacing:0;margin-top:.5em}
.lede{color:var(--text-dim);font-size:var(--fs-sm);line-height:1.75;max-width:var(--measure)}
.home-head{margin-bottom:2em}
.home-head .lede b{color:var(--text)}
.lede-sub{margin-top:.9em;padding:.7em .9em;border-left:3px solid var(--brand);background:var(--bg-soft);border-radius:0 6px 6px 0;font-size:var(--fs-xs)}

.home-stats{display:flex;flex-wrap:wrap;gap:1.6rem;margin:1.5em 0 0;padding:1.1em 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.home-stats>div{display:flex;flex-direction:column}
.home-stats b{font-size:24px;color:var(--brand);font-variant-numeric:tabular-nums;line-height:1.1}
.home-stats span{font-size:var(--fs-xs);color:var(--muted)}

.crumbs{margin:1.6em 0 0;font-size:var(--fs-xs)}
.crumbs a{color:var(--muted);text-decoration:none}
.crumbs a:hover{color:var(--brand)}

.pos{list-style:none;display:flex;flex-wrap:wrap;gap:.45em;padding:0;margin:1.1em 0}
.pos li{font-size:var(--fs-xs);padding:.24em .7em;border:1px solid var(--line);border-radius:999px;color:var(--text-dim)}

.member-nav{display:flex;flex-wrap:wrap;gap:.5em;margin-top:1.2em}
.member-nav a{font-size:var(--fs-xs);padding:.35em .85em;border:1px solid var(--line);border-radius:var(--r-sm);text-decoration:none;color:var(--text-dim)}
.member-nav a:hover{border-color:var(--brand);color:var(--brand)}

/* ── 可信度横幅 ── */
.trust{margin:2.4em 0;padding:1.4em 1.5em;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--panel)}
.trust h2{font-size:var(--fs-sm);margin:0 0 1em}
.trust-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1em}
.trust-item{padding:.9em 1em;border-radius:var(--r-sm);background:var(--bg-soft);border-left:3px solid var(--line)}
.trust-item p{margin:.5em 0 0;font-size:var(--fs-xs);line-height:1.7;color:var(--text-dim)}
.trust-item.t-a{border-left-color:var(--brand)}
.trust-item.t-b{border-left-color:var(--vio)}
.trust-item.t-c{border-left-color:var(--gold)}
.trust-tag{font-size:var(--fs-xs);font-weight:600;letter-spacing:.03em}
.t-a .trust-tag{color:var(--brand)} .t-b .trust-tag{color:var(--vio)} .t-c .trust-tag{color:var(--gold)}
.trust-foot{margin:1.2em 0 0;font-size:var(--fs-xs);color:var(--muted);line-height:1.7}

/* ── 区块 ── */
.howto{margin:2.4em 0}
.howto h2,.series-list h2,.quantizer-index h2{font-size:18px;margin:0 0 .9em}
.howto h2 small,.series-list h2 small,.quantizer-index h2 small{font-weight:400;color:var(--muted);font-size:var(--fs-xs);margin-left:.5em}
.steps{counter-reset:st;list-style:none;padding:0;margin:0;display:grid;gap:.7em}
.steps li{counter-increment:st;position:relative;padding-left:2.2em;font-size:var(--fs-xs);line-height:1.75;color:var(--text-dim)}
.steps li::before{content:counter(st);position:absolute;left:0;top:.1em;width:1.6em;height:1.6em;display:grid;place-items:center;border-radius:50%;background:var(--bg-soft);border:1px solid var(--line);color:var(--brand);font-size:var(--fs-xs)}
.steps b{color:var(--text)}

.member{margin:3em 0}
.member>h3{margin:0 0 .3em;font-size:18px;display:flex;align-items:baseline;gap:.6em;flex-wrap:wrap}
.member-idx{font-size:var(--fs-xs);font-weight:400;color:var(--muted);padding:.15em .55em;border:1px solid var(--line);border-radius:var(--r-xs);letter-spacing:.04em}
.member-meta{margin:0 0 1.2em;font-size:var(--fs-xs);color:var(--muted)}
.member-note{margin:.7em 0 0;font-size:var(--fs-xs);color:var(--text-dim);padding:.6em .9em;background:var(--bg-soft);border-radius:var(--r-sm);border-left:2px solid var(--vio)}

.block{margin:1.6em 0;padding-top:1.2em;border-top:1px dashed var(--line)}
.block>h4{margin:0 0 .9em;font-size:var(--fs-sm);display:flex;align-items:baseline;gap:.6em;flex-wrap:wrap}
.block>h4 small{font-weight:400;color:var(--muted);font-size:var(--fs-xs)}
.blk{display:inline-grid;place-items:center;width:1.55em;height:1.55em;border-radius:var(--r-xs);background:var(--bg-soft);border:1px solid var(--line);color:var(--brand);font-size:var(--fs-xs);font-weight:600}
.block-lead{margin:0 0 1em;font-size:var(--fs-xs);color:var(--text-dim);line-height:1.75}
.block-lead b{color:var(--text)}

/* ── 表格 ── */
table{width:100%;border-collapse:collapse;font-size:var(--fs-xs);margin:.4em 0}
th,td{padding:.55em .7em;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
thead th{font-size:var(--fs-xs);color:var(--muted);font-weight:600;letter-spacing:.03em;border-bottom:1px solid var(--line-strong);white-space:nowrap}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.kv{max-width:none}
.kv th{width:9.5em;font-size:var(--fs-xs);color:var(--muted);font-weight:500;white-space:nowrap}
caption{caption-side:top;text-align:left;font-size:var(--fs-xs);color:var(--muted);padding:0 0 .5em}
.no-fit{color:var(--gold)}
.muted{color:var(--muted)}
.small{font-size:var(--fs-xs)}
/* HF model_type / hfArch 这类标识符（Qwen3_5ForConditionalGeneration）本身是
   一个不可分的词，但窄屏必须能换行，否则整页横向溢出 */
.muted{overflow-wrap:anywhere}
code{font-family:var(--mono);font-size:var(--fs-xs);background:var(--bg-soft);padding:.1em .38em;border-radius:var(--r-xs);overflow-wrap:anywhere}

.budget th{width:9em}
/* 超大MoE 的前置提醒：最小档超过单卡上限时，必须在选档表之前就说清「不是不能跑，是要换运行方式」 */
.warn-note{margin:0 0 1.4em;padding:.85em 1em;border-left:3px solid var(--gold);background:var(--bg-soft);border-radius:0 6px 6px 0;font-size:var(--fs-xs);line-height:1.8;color:var(--text-dim)}
.warn-note b{color:var(--text)}
.budget-h{margin:1.6em 0 .5em;font-size:var(--fs-xs);color:var(--text);font-weight:600}
.nowrap{white-space:nowrap}
.budget td b{color:var(--brand)}

/* ── A 区扩展：参数量三来源 / 精度构成 / 标签 ── */
.kv-nested{margin:.1em 0 .4em;border-left:2px solid var(--line);padding-left:.8em}
.kv-nested th{width:8em;font-size:var(--fs-xs);padding:.25em .5em .25em 0}
.kv-nested td{padding:.25em 0;font-size:var(--fs-xs)}
.param-ok{font-size:var(--fs-xs);color:var(--brand);margin:.2em 0 0}
.prec{width:100%;font-size:var(--fs-xs)}
.prec td{padding:.2em .4em .2em 0;border:none;white-space:nowrap}
.prec td:first-child{width:5.5em}
.prec-bar{width:34%;min-width:60px}
.prec-bar span{display:block;height:.55em;border-radius:var(--r-xs);background:linear-gradient(90deg,var(--vio),var(--brand));opacity:.75}
.prec td:last-child{text-align:right;font-variant-numeric:tabular-nums}
/* white-space 不能用 nowrap —— tag 里装的是 org/repo 这类长串（如
   zai-org/GLM-5.3、Qwen/Qwen3.8-Flash-Next），320~390px 下 nowrap 会直接把
   容器撑破（实测 kimi-k3 页在 320px 溢出到 603px）。改用 overflow-wrap 让长串
   在必要时断行，短标签仍然看起来是完整的。 */
.tag{display:inline-block;font-size:var(--fs-xs);padding:.14em .5em;margin:.1em .2em .1em 0;border-radius:var(--r-xs);border:1px solid var(--line);color:var(--muted);background:var(--bg-soft);text-decoration:none;overflow-wrap:anywhere;word-break:break-word;max-width:100%}
a.tag:hover{border-color:var(--vio);color:var(--vio)}
.tag-lic{color:var(--gold);border-color:rgba(245,197,66,.3);background:rgba(245,197,66,.07)}
.tag-paper{color:var(--vio);border-color:rgba(139,124,248,.3);background:rgba(139,124,248,.07)}
.tag-rt{color:var(--brand);border-color:rgba(34,211,197,.3);background:rgba(34,211,197,.07)}

details.all-quants{margin-top:1em;border:1px solid var(--line);border-radius:var(--r-sm);padding:.7em 1em;background:var(--panel)}
details.all-quants summary{cursor:pointer;font-size:var(--fs-xs);color:var(--brand)}
.quant-list{margin-top:.8em}

/* ── 徽章 ── */
/* 同 .tag：许可徽章里会出现 license:apache-2.0 这类长串，nowrap 会撑破窄屏 */
.lic{display:inline-block;font-size:var(--fs-xs);padding:.12em .5em;border-radius:var(--r-xs);text-decoration:none;border:1px solid;overflow-wrap:anywhere;word-break:break-word;max-width:100%}
.lic-loose{color:var(--brand);border-color:rgba(139,124,248,.35);background:rgba(139,124,248,.06)}
.lic-tight{color:var(--gold);border-color:rgba(245,197,66,.35);background:rgba(245,197,66,.08)}
.lic-unknown{color:var(--gold);border-color:rgba(245,197,66,.35)}
.lic-src{font-size:var(--fs-xs);margin-left:.4em;color:var(--muted)}
.warn-inline{margin:.4em 0 0;font-size:var(--fs-xs);color:var(--gold);line-height:1.6}

.badge{display:inline-block;font-size:var(--fs-xs);padding:.1em .42em;border-radius:var(--r-xs);letter-spacing:.03em;vertical-align:middle}
.badge-off{background:rgba(139,124,248,.16);color:var(--vio);border:1px solid rgba(139,124,248,.4)}
.badge-im{background:rgba(34,211,197,.12);color:var(--brand);border:1px solid rgba(34,211,197,.3);margin-left:.3em}

/* 量化档标签 —— 2026-10-03 改用 brand.css 的 --q-* 色阶。
   原值是硬编码的（#7dd3fc / #fbbf72 / #fca5a5），有两个问题：
     1. 与站点 accent 无关 —— 换主题时这四个色不变，不跟随
     2. **亮色主题下不可读**：#7dd3fc 对亮底只有约 1.9:1
   现在全部引用 --q-*（有序色阶，冷→暖 = 高质量→高压缩），
   亮色值按 WCAG 加深到 ≥4.5:1（tier 标签 0.7rem 属正文级）。 */
.tier{display:inline-block;font-size:var(--fs-xs);padding:.1em .45em;border-radius:var(--r-xs);white-space:nowrap;font-weight:500}
.tier-0{color:var(--q-lossless);background:var(--q-lossless-soft)}
.tier-1{color:var(--q-conserv); background:var(--q-conserv-soft)}
.tier-2{color:var(--q-balance); background:var(--q-balance-soft)}
.tier-3{color:var(--q-ctx);     background:var(--q-ctx-soft)}
.tier-4{color:var(--q-extreme); background:var(--q-extreme-soft)}
.tier-5{color:var(--ink-faint); background:var(--bg-soft)}

/* ── 变体卡 ── */
.vcard{margin:1.2em 0;padding:1.1em 1.3em;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--panel)}
/* 变体卡左侧色条 = 推荐档的量化色阶（--q-*）。
   .vcard-off（官方量化）另给一条实线边，区分「官方」与「档位」两个维度。 */
/* 档位图例 —— 颜色必须有文字说明，否则「按颜色区分」等于没有信息。
   无障碍：颜色**永不单独承载信息**，每个色块都带文字标签。 */
.tier-legend{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin:0 0 var(--sp-3);
  font-size:var(--fs-micro);color:var(--ink-dim)}
.tier-legend-h{color:var(--ink-mid);margin-right:.2rem;font-weight:500}
.tier-legend-i{display:inline-flex;align-items:center;gap:.3rem;padding:.15em .5em;border-radius:999px;font-weight:500}
.tier-legend-i::before{content:"";width:8px;height:8px;border-radius:var(--r-xs);background:currentColor;flex-shrink:0}

.vcard{border-left:3px solid var(--line-strong)}
.vcard[data-tier="0"]{border-left-color:var(--q-lossless)}
.vcard[data-tier="1"]{border-left-color:var(--q-conserv)}
.vcard[data-tier="2"]{border-left-color:var(--q-balance)}
.vcard[data-tier="3"]{border-left-color:var(--q-ctx)}
.vcard[data-tier="4"]{border-left-color:var(--q-extreme)}
.vcard-off{border-left-style:solid;box-shadow:inset 2px 0 0 var(--brand)}
.vcard-h{display:flex;justify-content:space-between;align-items:baseline;gap:1em;flex-wrap:wrap;margin-bottom:.9em;padding-bottom:.7em;border-bottom:1px solid var(--line)}
.vcard-h h4{margin:0;font-size:var(--fs-sm);display:flex;align-items:center;gap:.3em;flex-wrap:wrap}
.vcard-meta{display:flex;align-items:center;gap:.6em;flex-wrap:wrap}
.vf{display:grid;grid-template-columns:8.5em 1fr;gap:.9em;padding:.5em 0;border-bottom:1px dotted var(--line)}
.vf:last-child{border-bottom:none}
.vf-k{font-size:var(--fs-xs);color:var(--muted);line-height:1.6}
.vf-v{font-size:var(--fs-xs);line-height:1.75;color:var(--text-dim);overflow-wrap:anywhere}
.vf-v b{color:var(--text)}

/* ── 量化者卡 ── */
.qcard{margin:1.1em 0;padding:1.1em 1.3em;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--panel)}
.qcard h4{margin:0 0 .3em;font-size:var(--fs-sm);display:flex;align-items:baseline;gap:.6em;flex-wrap:wrap}
.qcard-scope{margin:0 0 .8em;font-size:var(--fs-xs);color:var(--muted)}
.qcard-body{font-size:var(--fs-xs);line-height:1.8;color:var(--text-dim)}
.qcard-body p{margin:.5em 0}
.qcard-body ul{margin:.5em 0;padding-left:1.3em}
.qcard-body li{margin:.25em 0}
.qcard-body b{color:var(--text)}
.qcard-link{display:inline-block;margin-top:.7em;font-size:var(--fs-xs);color:var(--brand);text-decoration:none}

/* ── 系列卡 ── */
.scards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(290px,100%),1fr));gap:1em}
/* min-width:0 —— grid item 默认 min-width:auto，长内容（许可串、repo 名）会把
   整列撑到内容宽度，突破 auto-fill 的 minmax(...,1fr) 约束 */
.scard{display:block;padding:1.15em 1.25em;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--panel);text-decoration:none;color:inherit;transition:border-color .15s,transform .15s;min-width:0}
.scard:hover{border-color:var(--brand);transform:translateY(-2px)}
.scard-h{display:flex;justify-content:space-between;align-items:baseline;gap:.6em;flex-wrap:wrap}
.scard-h h3{margin:0;font-size:18px;color:var(--text)}
.scard-vendor{font-size:var(--fs-xs);color:var(--muted)}
.scard-sum{margin:.6em 0 .8em;font-size:var(--fs-xs);line-height:1.7;color:var(--text-dim)}
.scard-pos{list-style:none;padding:0;margin:0 0 .9em;display:flex;flex-wrap:wrap;gap:.35em}
.scard-pos li{font-size:var(--fs-xs);padding:.18em .5em;border-radius:var(--r-xs);background:var(--bg-soft);color:var(--muted)}
.scard-stats{display:flex;gap:1em;flex-wrap:wrap;padding:.7em 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:var(--fs-xs);color:var(--muted)}
.scard-stats b{color:var(--brand);font-variant-numeric:tabular-nums}
.scard-lic{margin:.7em 0 .6em;display:flex;gap:.35em;flex-wrap:wrap;min-width:0}
.scard-lic>*{min-width:0}
.scard-go{margin:0;font-size:var(--fs-xs);color:var(--brand)}

/* ── 量化者 chips ── */
.qchips{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(230px,100%),1fr));gap:.6em}
.qchip{display:block;padding:.7em .85em;border:1px solid var(--line);border-radius:var(--r-sm);text-decoration:none;background:var(--panel)}
.qchip:hover{border-color:var(--vio)}
.qchip code{background:none;padding:0;color:var(--vio);font-weight:600;font-size:var(--fs-xs)}
.qchip span{display:block;margin-top:.25em;font-size:var(--fs-xs);color:var(--muted);line-height:1.5}

/* ── 更新日志 ── */
.log{list-style:none;padding:0;margin:.4em 0}
.log li{display:flex;gap:.9em;align-items:baseline;padding:.42em 0;border-bottom:1px dotted var(--line);font-size:var(--fs-xs);flex-wrap:wrap}
.log-date{color:var(--muted);font-variant-numeric:tabular-nums;font-size:var(--fs-xs);min-width:5.5em}

/* ── 法务 ── */
.legal-note{margin:3em 0 2em;padding:1.3em 1.4em;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--panel)}
.legal-note h3{margin:0 0 .8em;font-size:var(--fs-sm)}
.legal-note p{margin:.55em 0;font-size:var(--fs-xs);line-height:1.8;color:var(--text-dim)}
.legal-note b{color:var(--text)}
.legal-note a{color:var(--brand)}

/* ── 窄屏：表格转卡片 ── */
@media(max-width:760px){
  .vf{grid-template-columns:1fr;gap:.2em}
  .vf-k{color:var(--brand);font-size:var(--fs-xs)}
  .home-stats{gap:1.1em}
  .home-stats b{font-size:18px}
  table.kv th{width:auto}
  .vcard-h{flex-direction:column;align-items:flex-start}
}
/* ⚠ 表格→卡片的降级断点从 560 提到 900（2026-10-09 修 responsive-overflow）。
 *   起因：字号统一到共享档位后（11/12px → 14/16px），768px 下 table.quant-list 开始溢出 ✗
 *   （门禁报 5 处，全在 models 的 series 页 @768 ✓ —— scrollWidth 正常但**元素越界** ✓）。
 *   560 以下那套卡片布局是**已经设计好的**降级形态 ✓，只是断点太窄、够不到 768 ✗。
 *   抬到 900 ✓：复用既有设计 ✓，窄屏反而更好读 ✓ —— 这是「提高亲和力」的方向 ✓。
 *   ⚠ 这段注释**在 CSS 模板字符串里**：正文**不能出现反引号**，否则会提前终止模板 ✗（我踩过一次）。 */
@media(max-width:900px){
  table.variants,table.budget,table.quant-list,table.kv:not(.kv-nested){display:block}
  table.variants thead,table.budget thead,table.quant-list thead{display:none}
  table.variants tbody,table.budget tbody,table.quant-list tbody,table.kv:not(.kv-nested) tbody{display:block}
  table.variants tr,table.budget tr,table.quant-list tr,table.kv:not(.kv-nested) tr{display:block;margin-bottom:1em;padding:.6em .8em;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--panel)}
  table.variants td,table.budget td,table.quant-list td,table.kv:not(.kv-nested) td{display:flex;justify-content:space-between;gap:1em;border:none;padding:.3em 0;text-align:left}
  table.variants td::before,table.budget td::before,table.quant-list td::before,table.kv:not(.kv-nested) td::before{content:attr(data-label);color:var(--muted);font-size:var(--fs-xs);flex:0 0 auto}
  table.kv:not(.kv-nested) td::before{content:none}
  table.kv:not(.kv-nested) th{display:block;width:auto;padding:.4em 0 .1em;border:none}
  table.kv:not(.kv-nested) tr{display:block;background:none;border:none;margin-bottom:.4em}
  /* budget 表只有「档位 / 推荐」两列，且推荐格里塞了多个 <br> 分隔的说明块。
     上面的通用规则把 td 变成 flex，导致每个 <br> 与 <span> 都成了独立 flex item
     —— 整块文字被压成一条窄带（实测 320px 下溢出到 348px）。这里改回普通块级流。 */
  table.budget td{display:block}
  /* model_type / hfArch（Qwen3_5ForConditionalGeneration 这类）本身不该断在
     字符中间，但窄屏必须允许换行 —— 统一给窄屏表格里的行内 code 加 anywhere。 */
  table.variants td code,table.budget td code,table.quant-list td code,table.kv:not(.kv-nested) td code{overflow-wrap:anywhere;word-break:break-word}
  table.variants td>*,table.quant-list td>*{min-width:0}
  /* A 区嵌套表在窄屏不能跟着 kv 一起卡片化，否则套娃很难读：保持表格形态但压缩留白 */
  .kv-nested{border-left:0;padding-left:0;margin-left:0}
  .kv-nested th{width:6.5em;font-size:var(--fs-xs);padding:.25em .4em .25em 0}
  .kv-nested td{font-size:var(--fs-xs)}
  .prec-bar{width:auto;min-width:40px}
  .prec{font-size:var(--fs-xs)}
  .prec td{padding:.18em .3em .18em 0}
  .prec td:last-child{text-align:left}
  td.num{text-align:right}
}

/* ══════════════════════════════════════════════════════════════════════
   统一区块节奏 —— 必须放在本文件**末尾**
   原因：这些区块各自有 margin: 2.4em 0 这类规则，写在前面会被后面覆盖
   （同特异性时后写的赢）。之前插在 .page-head 后面，实测留白仍是 22px。
   实测对比：www 108px / agent 80px / nav 52px / learn 54px / **models 22px**
   —— models 靠零散 margin 制造留白，节奏与全站脱节，这就是「不像一套」的根源。
   ══════════════════════════════════════════════════════════════════════ */
.page-head{margin-bottom:var(--section-pad-sm)}
.trust, .howto, .legal-note, .member-nav, .budget, .pick, .faq, .specs,
.members, .params, .quant, .pick-table, .series-body{
  margin-block: var(--section-pad-sm);
}
.page-head + .home-stats, .home-head + .home-stats{margin-top:var(--section-pad-sm)}
`;

// ── 产物写盘（必须在 CSS/HTML 模板常量声明之后）────────────────────
// 品牌资源：从共享核心 shared/brand/ 复制（S9 · D8：仓内只有一份，哈希由 brand-sync 守）
for (const f of ['brand.css', 'brand.js']) {
  const src = path.join(VENDORED, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(SITE, f));
  else console.log('⚠ 缺品牌文件', f);
}
fs.copyFileSync(path.join(HERE, 'capacity-calculator.js'), path.join(SITE, 'capacity-calculator.js'));
/* ⚠ 2026-10-10：site.css 的**真相源改为真实文件** `css/models.css`。
 *
 * 原先 CSS 是本文件里的两个模板字符串（`const CSS = \`…\`` + `const FILTER_CSS = \`…\``），
 * 后果是：改样式要动 .mjs、CSS 门禁扫不到它、`site/` 既是产物又像源（看着能改，实际会被覆盖）。
 * 抽取时已验证：CSS 内容与抽取前**逐字符相同**，产物差异仅为新增的一行分节注释 ✓
 * （零模板插值，是纯静态文本；`node _tmp/verify-models-css-extract.mjs` 可复验）。
 *
 * R3（内容库自足）：本仓单独 clone 后仍要能构建，所以源文件放在**仓内** `css/models.css`，
 * 随仓一起走 —— 不能放工作区，那会让 clone-build 门禁挂掉。 */
const SITE_CSS_SRC = path.join(ROOT, 'css', 'models.css');
if (!fs.existsSync(SITE_CSS_SRC)) {
  console.error('✗ 缺 ' + SITE_CSS_SRC + ' —— 样式源文件丢了，构建中止');
  process.exit(1);
}
fs.writeFileSync(path.join(SITE, 'site.css'), fs.readFileSync(SITE_CSS_SRC, 'utf8'));
fs.writeFileSync(path.join(SITE, 'CNAME'), 'models.specul.com\n');
fs.writeFileSync(path.join(SITE, '.nojekyll'), '');
fs.writeFileSync(path.join(SITE, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://models.specul.com/sitemap.xml\n');
{
  const lines = [
    '# 开放权重该怎么选 · 本地部署模型图谱',
    '> 两步选型：先看家族谱系卡（出品方/代次/尺寸档/许可/官方声明），再看系列页选量化版。',
    '> 不跑 benchmark，不给质量与速度结论，不托管任何模型权重文件。',
    '',
    '## 收录范围',
    '',
    '**只收开放权重、可本地部署的开源模型。** 具体指：Hugging Face 上有公开权重文件、且第三方能做出',
    'GGUF 量化的模型（MoE 与 dense 都在内）。',
    '',
    '闭源 / API-only 模型不在量化收录范围内——它们没有量化产物，「该下载哪个量化版」这个问题对它们不成立。',
    '本站另设「闭源谱系卡」做对照：只记官方规格快照与复核周期，不采价格、不排名（见下节）。',
    '本站也不做模型能力横评（那属于另一个问题，且需要实测）。',
    '',
    '## 家族谱系卡',
    '',
  ];
  for (const f of familyList) {
    lines.push(`- [${f.name.zh}](${DOMAIN}families/${f.code}/): ${f.positioning.zh}`);
    lines.push(`  ${f.vendor.zh}　当前代 ${f.currentGen.zh}（${f.currentGenDate}）　${f.generations.length} 代　许可 ${f.licenses.map((L2) => L2.id).join(', ')}${(f.onSite?.series || []).length ? `　本站量化对比：${(f.onSite.series || []).join(', ')}` : '　本站未收录其量化对比'}`);
  }
  lines.push('');
  lines.push('## 闭源谱系卡');
  lines.push('');
  lines.push('对照面：只记当前代、官方规格事实（每条挂官方出处）、核验快照与复核周期。不采价格数字，不排名。复核到期的卡页顶有横幅。');
  lines.push('');
  for (const c of closedList) {
    lines.push(`- [${c.name.zh}](${DOMAIN}closed/${c.code}/): ${c.positioning.zh}`);
    lines.push(`  ${c.vendor.zh}　当前代 ${c.currentGen.zh}（${c.currentGenDate}）　${c.facts.length} 条官方事实　核验 ${c.last_verified}　复核周期 ${c.review_interval_days} 天`);
  }
  lines.push('');
  lines.push('## 做模型专题');
  lines.push('');
  lines.push('从业者视角的方法论文章（与学 AI 站互链不重复）。关键事实挂论文/官方模型卡出处；不实测、不排名、不裁决路线之争。');
  lines.push('');
  for (const g of guideList) {
    lines.push(`- [${g.title}](${DOMAIN}guides/${g.id}.html): ${g.summary}`);
    lines.push(`  ${g.sections.length} 节 · ${g.sources.length} 条官方出处 · 核验 ${g.last_verified || g.lastVerified}`);
  }
  lines.push('');
  lines.push('## 已收录系列');
  lines.push('');
  for (const s of seriesList) {
    const vTotal = s.members.reduce((n, m) => n + m.variantCount, 0);
    const fTotal = s.members.reduce((n, m) => n + m.variants.reduce((k, v) => k + v.coverage, 0), 0);
    lines.push(`- [${s.name.zh}](${DOMAIN}series/${s.code}/): ${s.summary}`);
    lines.push(`  ${s.vendor.zh}　发布 ${s.released}　${s.members.length} 个模型仓 / ${vTotal} 个量化档 / ${fTotal} 个 GGUF 文件　许可 ${s.members.map((m) => m.license).filter(Boolean).join(', ')}`);
  }
  lines.push('');
  lines.push('## 每个系列页包含六个区块');
  lines.push('');
  lines.push('- **A 基础模型卡** —— 许可、规模、架构、上下文长度、官方下载量（全部为 HF 公开字段）');
  lines.push('- **B 该选哪个** —— 按显存 8/12/16/24/48 GB 倒推该用哪一档，体积为实测值并加 15% 运行时余量');
  lines.push('- **C 量化版本总表** —— 横向对比所有量化者：档数、总体积、上下文、许可、更新时间');
  lines.push('- **D 每个变体详解** —— 七字段：它是什么 / 量化者做了什么 / 与同系列其他变体的区别 / 存在的意义 / 优势 / 为什么选它 / 已知取舍');
  lines.push('- **E 量化者档案** —— 每个量化者做了什么、适合谁、什么时候别选');
  lines.push('- **F 更新记录** —— 谁在跟进新版本，谁长期没更新');
  lines.push('');
  lines.push('## 数据可信度分级');
  lines.push('');
  lines.push('- ✅ **实测字段** —— 直接从 Hugging Face 公开 API 读取：文件体积、上下文长度、架构、许可、下载量');
  lines.push('- ✅ **推导** —— 由采集字段按公开规则算出：每权重比特数（依 llama.cpp 命名标准）、档位归属、显存区间');
  lines.push('- ❌ **我们不说的** —— 哪个量化质量更高、哪个更快、哪个模型更强。这些需要实测，本站不跑 benchmark，所以不装作知道');
  lines.push('');
  lines.push('## 数据来源');
  lines.push('');
  lines.push('- 采集接口：`hf-mirror.com/api/models`（HF 国内镜像）与 `hf-mirror.com/api/models/{id}/tree/main`');
  lines.push('- 原始来源：<https://huggingface.co>');
  lines.push(`- 采集时间：${(seriesList[0]?.collectedAt || '').slice(0, 10)}（快照数据，非实时）`);
  lines.push('- 选型方法：<https://github.com/speculcom/ai-handbook/blob/main/docs/METHODOLOGY.md>');
  lines.push('');
  lines.push('## 法律立场');
  lines.push('');
  lines.push('**只索引、只引述、不托管、不解读许可、不给法律意见。**');
  lines.push('许可字段原样引自各发布页，非宽松许可已标注「以发布页原文为准」。');
  lines.push('');
  lines.push('### 关于「继承自基座」的许可');
  lines.push('');
  lines.push('部分量化仓没有在自己的 HF 页面写 license 字段。此时本站填入基座模型的许可，并标注');
  lines.push('「继承自基座，量化仓未单独声明」。依据是：量化是对权重的数学变换（舍入 / 缩放 / imatrix 加权），');
  lines.push('不新增也不删除原始表达，派生物的著作权与原作同一，许可不可能脱离基座。');
  lines.push('');
  lines.push('但这**只是著作权层面的必然推断，不是对量化仓 redistribution 条款的确认**——量化者是否另有');
  lines.push('附加约定（例如要求额外署名、二次分发限制），需自行阅读基座许可原文判断。站内每处继承标注都');
  lines.push('同时给出基座仓库名，便于回溯。');
  lines.push('模型名称均为各自权利人的商标，此处仅作描述性使用。');
  lines.push('详见 <https://specul.com/legal.html>');
  lines.push('');
  lines.push('## 站点群');
  lines.push('');
  lines.push('- 首页 <https://specul.com/>　学 AI <https://learn.specul.com/>　工具 <https://tools.specul.com/>');
  lines.push('- 模型 <https://models.specul.com/>　作品库 <https://demos.specul.com/>　硬件算力 <https://hardware.specul.com/>');
  lines.push('- AI 论文 <https://papers.specul.com/>　链 <https://chain.specul.com/>　外部站点 <https://nav.specul.com/>');
  lines.push('- （v3 时代的 ide / cli / mcp / harness 四个独立子域已于 2026-10-04 并入 tools.specul.com；');
  lines.push('  做游戏子域 vg.specul.com 已于 2026-11-07 撤站，游戏内容并入主站主题页，不再存在）');
  lines.push('');
  lines.push(`--- 最后更新：${(seriesList[0]?.collectedAt || '').slice(0, 10)}`);
  lines.push('');
  fs.writeFileSync(path.join(SITE, 'llms.txt'), lines.join('\n'));

  /* 英文版（2026-11-09 新增）：此前只写中文，线上 /llms.en.txt 缺失，
     而其余 8 个站都有中英两份。英文版按同一批字段生成，不另写口径。 */
  const en = [
    '# Choosing open-weight models · local deployment map',
    '> Two steps: read the family lineage card (vendor / generation / sizes / licence / official claims), then pick a quantisation on the series page.',
    '> No benchmarks, no verdicts on quality or speed, and no model weights are hosted here.',
    '',
    '## Scope',
    '',
    'Open-weight models that can be deployed locally: public weight files on Hugging Face plus third-party GGUF quantisations.',
    'Closed / API-only models are not part of the quantisation catalogue — "which quantisation should I download" does not apply to them.',
    'They get a separate lineage card that records official spec facts and a review cycle only: no prices, no ranking.',
    '',
    '## Series',
    '',
  ];
  for (const s of seriesList) {
    const vTotal = s.members.reduce((n, m) => n + m.variantCount, 0);
    const fTotal = s.members.reduce((n, m) => n + m.variants.reduce((k, v) => k + v.coverage, 0), 0);
    en.push(`- [${s.name.en || s.name.zh}](${DOMAIN}series/${s.code}/): ${s.summaryEn || s.summary}`);
    en.push(`  ${s.vendor.en || s.vendor.zh} · released ${s.released} · ${s.members.length} repos / ${vTotal} quantisations / ${fTotal} GGUF files · licences ${s.members.map((m) => m.license).filter(Boolean).join(', ')}`);
  }
  en.push('');
  en.push('## Closed-model cards');
  en.push('');
  for (const c of closedList) {
    en.push(`- [${c.name.en || c.name.zh}](${DOMAIN}closed/${c.code}/): official spec snapshot, ${c.facts.length} sourced facts, reviewed ${c.last_verified}, review cycle ${c.review_interval_days} days`);
  }
  en.push('');
  en.push('## Page types');
  en.push('');
  en.push('- `/` — entry and selection method');
  en.push('- `/families/<code>/` — lineage card: vendor, generations, sizes, licences');
  en.push('- `/series/<code>/` — six blocks: base model card, which size fits which VRAM, quantisation table, per-variant notes, quantiser profiles, update log');
  en.push('- `/guides/<id>.html` — methodology notes for practitioners');
  en.push('');
  en.push('## Provenance');
  en.push('');
  en.push('- Collection API: `hf-mirror.com/api/models` and `hf-mirror.com/api/models/{id}/tree/main`');
  en.push('- Upstream: <https://huggingface.co>');
  en.push(`- Snapshot: ${(seriesList[0]?.collectedAt || '').slice(0, 10)} (not live)`);
  en.push('- Method: <https://github.com/speculcom/ai-handbook/blob/main/docs/METHODOLOGY.md>');
  en.push('');
  en.push('## Legal stance');
  en.push('');
  en.push('Index and quote only. No hosting, no licence interpretation, no legal advice. Licence fields are quoted from each release page;');
  en.push('derived licences for quantisation repos are marked as inherited from the base model.');
  en.push('');
  en.push('## Site group');
  en.push('');
  en.push('- Home <https://specul.com/> · Learn <https://learn.specul.com/> · Tools <https://tools.specul.com/>');
  en.push('- Models <https://models.specul.com/> · Demos <https://demos.specul.com/> · Hardware <https://hardware.specul.com/>');
  en.push('- Papers <https://papers.specul.com/> · Chain <https://chain.specul.com/> · Directory <https://nav.specul.com/>');
  en.push('');
  en.push(`--- Last updated: ${(seriesList[0]?.collectedAt || '').slice(0, 10)}`);
  en.push('');
  fs.writeFileSync(path.join(SITE, 'llms.en.txt'), en.join('\n'));
}

fs.writeFileSync(path.join(SITE, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${DOMAIN}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${familyList.map((f) => `  <url><loc>${DOMAIN}families/${f.code}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n')}
${closedList.map((c) => `  <url><loc>${DOMAIN}closed/${c.code}/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n')}
${guideList.map((g) => `  <url><loc>${DOMAIN}guides/${g.id}.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n')}
${seriesList.map((s) => `  <url><loc>${DOMAIN}series/${s.code}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>
`);
