#!/usr/bin/env node
// agent-guide schema 校验器
// 用法：node scripts/validate.mjs [--strict]
// 任一硬失败即退出码 1。软规则失败只警告（--strict 时升级为失败）。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter, parseSources, bodyAfter } from './yaml.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');

const AXES = [
  'model_access', 'runtime', 'local_files', 'background',
  'tools', 'context', 'permissions', 'fit',
];
const AXES_FILE = {
  model_access: 'model-access', runtime: 'runtime',
  local_files: 'local-files', background: 'background',
  tools: 'tools', context: 'context',
  permissions: 'permissions', fit: 'fit',
};
const MCP_AXES = ['transport', 'auth', 'scope'];
const CONFIDENCE = ['verified', 'partial', 'stale'];
const LIFECYCLE = ['active', 'maintenance', 'archived', 'unknown'];
/* PRICING_MODEL 已随 D9（2026-10-20 价格口径退役）删除 */

const errors = [];
const warnings = [];
const stats = { tracks: {}, files: 0 };

// ── frontmatter 解析 ────────────────────────────
// 解析逻辑住在 scripts/yaml.mjs（唯一真相源，2026-10-15 从 validate.mjs 与
// sites/build.mjs 两份「同源」副本抽出）。历史上两份无机制保证同步，2026-10-09
// 踩过：修了 validate 的数组判别、忘了 build，构建仍报「缺维度 axes.*」。
// 守卫：_audit/yaml-single-source.mjs（全文只许一份定义，消费者必须 import）。

// ── 校验 ─────────────────────────────────────────
function collect(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap(f => {
    const p = path.join(dir, f);
    return fs.statSync(p).isDirectory() ? collect(p) : [p];
  });
}

function validateEntry(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const text = fs.readFileSync(file, 'utf8');
  const fm = parseFrontmatter(text);
  if (!fm) { errors.push(`${rel} · 缺少 frontmatter`); return null; }

  const fail = (m) => errors.push(`${rel} · ${m}`);
  const warn = (m) => warnings.push(`${rel} · ${m}`);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.id || '')) fail(`id 格式非法: ${fm.id}`);
  const base = path.basename(file, '.md');
  if (fm.id !== base) fail(`文件名(${base}) != id(${fm.id})`);

  for (const k of ['id', 'track', 'name', 'vendor', 'homepage']) {
    if (!fm[k]) fail(`缺必填字段: ${k}`);
  }
  // cloud = 厂商云形态（2026-10-03 新增）：OpenAI Dot / Meta Muse / xAI Grok Bot 这类
  // 本机不装任何东西、在厂商云上持续工作的成品 agent。
  // 它归agents 分区（不是新分区）—— 与 ide/cli 共享同一套八维坐标系，
  // 拆到新分区会让「八维对比」跨站分裂。
  if (fm.track && !['ide', 'cli', 'cloud', 'mcp', 'harness'].includes(fm.track)) fail(`track 枚举非法: ${fm.track}`);

  /* D9（2026-10-20 用户定案）：价格口径退役——pricing 字段族已删。
   * 反向守卫：档案里再出现 pricing / pricing_pitfalls → 硬失败（防旧口径回灌）。 */
  if (fm.pricing) fail('出现已退役的 pricing 字段（D9：价格不进数据层）');
  if (fm.pricing_pitfalls) fail('出现已退役的 pricing_pitfalls 字段（D9）');

  const ax = fm.axes || {};
  for (const a of AXES) {
    const v = ax[a];
    if (v === undefined || v === null || v === '') fail(`缺维度: axes.${a}`);
    else if (String(v).length < 10) warn(`axes.${a} 过短(<10字)，可能没查清`);
  }

  if (fm.track === 'mcp') {
    const m = fm.mcp || {};
    for (const a of MCP_AXES) {
      const v = m[a];
      if (v === undefined || v === null || v === '') fail(`缺 MCP 维度: mcp.${a}`);
    }
  } else if (fm.mcp) {
    // 非 MCP 赛道的对象不是 server，不该有 mcp 字段
    fail(`track=${fm.track} 的条目不应有 mcp 字段（只有 track=mcp 的 server 才有）`);
  }

  if (fm.track === 'harness') {
    // harness 站的四条硬约束（v3 计划 §7.1）：
    //  1. family 必填且是四个分层之一 —— 它决定首页矩阵怎么分组
    //  2. provider 必填 —— 「支持哪些模型」是本站第一决策点
    //  3. sources 至少 1 条 official —— 竞品研究不可作数据来源（v3 §0.2）
    //  4. 必须有 decide_how —— 「要不要自己搭」是本站存在理由
    const FAMILIES = ['coding-base', 'general-harness', 'orchestration'];
    if (!fm.family) fail('harness 条目缺 family');
    else if (!FAMILIES.includes(fm.family)) {
      fail(`harness family 非法: ${fm.family}（允许 ${FAMILIES.join(' / ')}）`);
    }
    if (!fm.providers) fail('harness 条目缺 providers（支持哪些模型 provider 是第一决策点）');
    // sources 是 frontmatter 里的对象数组，YAML 子集解析器读不出嵌套结构
    // （build.mjs 也是用正则单独解析的），所以这里复用同样的方式。
    const rawText = fs.readFileSync(file, 'utf8');
    // sources 解析统一走 yaml.mjs 的 parseSources（与构建器同一正则）。
    // 旧本文件的正则不处理反引号标签 —— 8 份档案的 label 会带上字面反引号。
    const parsedSrc = parseSources(rawText);
    if (!parsedSrc.some((s) => s.kind === 'repo' || s.kind === 'docs')) {
      fail('harness 条目 sources 至少 1 条 kind: repo 或 docs（官方源）');
    }
  }

  const pits = Array.isArray(fm.pitfalls) ? fm.pitfalls : [];
  if (pits.length === 0) fail('pitfalls 为空（至少 1 条）');

  const list = Array.isArray(fm.sources) ? fm.sources : [];
  if (list.length < 2) fail(`sources 不足 2 条（实际 ${list.length}）`);
  // changelog 或 repo(带 releases/commits 链接) 至少其一，后者视为等价变更记录
  const srcStr = JSON.stringify(list);
  const hasChangeLog = srcStr.includes('changelog');
  const hasRepo = srcStr.includes('repo');
  if (!hasChangeLog && !hasRepo) {
    fail('sources 缺少变更记录（需 kind: changelog，或 repo + releases/commits 链接）');
  }
  if (hasRepo && !hasChangeLog) {
    // 无独立 changelog 页时，必须补一条指向 releases / commits 的 changelog 记录
    const hasHistory = /releases|commits/i.test(srcStr);
    if (!hasHistory) {
      warn('用了 repo 作变更记录，建议补一条指向 releases 或 commits 的 changelog 条目');
    }
  }

  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  for (const k of ['last_verified', 'last_updated']) {
    if (!fm[k]) fail(`缺 ${k}`);
    else if (!dateRe.test(String(fm[k]))) fail(`${k} 格式非法: ${fm[k]}（需 YYYY-MM-DD）`);
  }

  if (!CONFIDENCE.includes(fm.confidence)) fail(`confidence 枚举非法: ${fm.confidence}`);
  if (!LIFECYCLE.includes(fm.lifecycle)) fail(`lifecycle 枚举非法: ${fm.lifecycle}（需 active/maintenance/archived/unknown）`);

  // lifecycle × confidence 组合约束
  if (fm.lifecycle === 'archived' && fm.confidence === 'verified') {
    fail('lifecycle=archived 时 confidence 不得为 verified（最高 partial）');
  }
  if (fm.lifecycle === 'unknown' && fm.confidence === 'verified') {
    fail('lifecycle=unknown 时 confidence 不得为 verified（最高 partial）');
  }

  if (fm.confidence === 'verified') {
    const all = AXES.map(a => String(ax[a] || '')).join(' ');
    if (all.includes('未知')) warn('confidence=verified 但维度里有「未知」');
    if (fm.last_verified && dateRe.test(String(fm.last_verified))) {
      const age = (Date.now() - new Date(fm.last_verified).getTime()) / 86400000;
      if (age > 90) warn(`核验日距今 ${Math.round(age)} 天，verified 应降级为 partial`);
    }
  }
  // 归档状态：仅当**条目自身**归档时降级 confidence。
  // 注意：正文提到「其他对象已归档」不应触发本规则——
  // 例如 git.md 正文会说明 github server 已归档，但 git 本身是 active。
  // 判定方式：看 lifecycle 字段，以及正文开头是否声明本对象归档。
  const head400 = text.slice(text.indexOf('\n---\n', 4) + 5, text.indexOf('\n---\n', 4) + 405);
  const selfArchived = fm.lifecycle === 'archived'
    || /^#{1,3}\s*.*(本 (server|对象|条目).*(已归档|已停止)|已归档\s*→)/m.test(head400)
    || /^(>|\s)*(已归档|Archived)\s*$/m.test(head400);
  if (selfArchived && fm.confidence === 'verified') {
    fail('本对象声明已归档，confidence 不得为 verified（最高 partial）');
  }

  if (fm.link && fm.link.kind === 'invitation' && !fm.link.incentive) {
    fail('link.kind=invitation 时必须有 incentive');
  }

  // 正文必备小节（见 SCHEMA 第三节）
  const body = bodyAfter(text);
  // 正文里不得再用 --- 作分隔线（会与 frontmatter 结束标记混淆）
  if (/^\s*---\s*$/m.test(body)) {
    fail('正文里出现 `---` 分隔线，与 frontmatter 结束标记同形，会干扰解析（见 SCHEMA 第三节）');
  }
  for (const sec of ['一句话定位', '适合与不适合', '实测记录', '未知项清单', '相关条目']) {
    if (!new RegExp(`^##\\s+${sec}\\s*$`, 'm').test(body)) {
      fail(`正文缺必备小节: ## ${sec}`);
    }
  }
  // 「适合与不适合」不应是空壳
  const lines = body.split(/\r?\n/);
  const fitStart = lines.findIndex(l => /^##\s+适合与不适合\s*$/.test(l));
  if (fitStart >= 0) {
    let content = '';
    for (let i = fitStart + 1; i < lines.length; i++) {
      if (/^##\s+/.test(lines[i])) break;
      content += lines[i];
    }
    const c = content.replace(/\s+/g, '');
    if (c.length < 30) {
      warn(`正文「适合与不适合」内容过短(${c.length}字)，可能只是占位`);
    }
  }

  stats.tracks[fm.track] = (stats.tracks[fm.track] || 0) + 1;
  stats.files++;
  return fm;
}

function crossCheck(entries) {
  const byId = new Map();
  for (const [rel, fm] of entries) {
    if (!fm.id) continue;
    if (byId.has(fm.id)) errors.push(`id 重复: ${fm.id} (${byId.get(fm.id)} vs ${rel})`);
    else byId.set(fm.id, rel);
  }
  // 同名对象跨赛道：vendor + name 相同则 homepage 必须一致。
  // 注意：同一 vendor 下的**不同对象**（如 MCP servers 仓库里的多个 server）
  // 本来就该有不同 homepage，不做一致性要求。
  const byName = new Map();
  for (const [rel, fm] of entries) {
    if (!fm.vendor || !fm.name) continue;
    const key = `${fm.vendor}::${fm.name}`;
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push({ rel, fm });
  }
  for (const [key, list] of byName) {
    if (list.length < 2) continue;
    const homes = new Set(list.map(x => x.fm.homepage));
    if (homes.size > 1) {
      errors.push(`同名对象 ${key} 的 homepage 不一致：${[...homes].join(' / ')}`);
    }
  }
  // 同一底层仓库被多个条目引用属正常（如多个 MCP server 共用 servers 仓库），
  // 仅提示，不计入 strict 模式的失败条件。
  const repoRoots = new Map();
  for (const [, fm] of entries) {
    const m = /^https:\/\/github\.com\/([^/]+)\/([^/]+)/.exec(fm.homepage || '');
    if (!m) continue;
    const repo = `${m[1]}/${m[2]}`;
    if (!repoRoots.has(repo)) repoRoots.set(repo, []);
    repoRoots.get(repo).push(fm.id);
  }
  const INFO_ONLY = /被 \d+ 个条目引用/;
  for (const [repo, ids] of repoRoots) {
    if (ids.length > 1) {
      const msg = `仓库 ${repo} 被 ${ids.length} 个条目引用：${ids.join(', ')}`;
      if (INFO_ONLY.test(msg)) console.log(`  i ${msg}`);
      else warnings.push(msg);
    }
  }
}

// ── 主流程 ───────────────────────────────────────
const entries = [];
if (fs.existsSync(path.join(ROOT, 'tracks'))) {
  for (const f of collect(path.join(ROOT, 'tracks'))) {
    if (!/\.md$/.test(f)) continue;
    if (path.basename(f).startsWith('_')) continue;
    const norm = f.replace(/\\/g, '/');
    if (/\/tasks\//.test(norm) || /\/runs\//.test(norm) || /\/taxonomy\//.test(norm)) continue;
    const fm = validateEntry(f);
    if (fm) entries.push([path.relative(ROOT, f).replace(/\\/g, '/'), fm]);
  }
}
crossCheck(entries);

/* ── S43 任务化入口：tasks 字段校验（2026-10-19）──────────────────
 * 真相源：档案 frontmatter 的 tasks:（行内数组）+ sites/tasks.json（任务元信息）。
 * 规则：① 每份档案 tasks ≥1 且全部落在 tasks.json 的 id 集合内；
 *       ② tasks.json 里每个任务至少被 1 份档案引用（空任务 = 假入口）。
 * 双向对账：档案→任务（枚举）+ 任务→档案（覆盖）。 */
{
  const TASKS_FILE = path.join(ROOT, 'sites', 'tasks.json');
  if (!fs.existsSync(TASKS_FILE)) {
    errors.push('缺任务定义: sites/tasks.json');
  } else {
    const taskDefs = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8')).tasks || [];
    const taskIds = new Set(taskDefs.map((t) => t.id));
    const used = new Map(taskDefs.map((t) => [t.id, 0]));
    for (const [rel, fm] of entries) {
      const ts = fm.tasks;
      if (!Array.isArray(ts) || ts.length === 0) {
        errors.push(`${rel} · 缺 tasks 字段（S43：每份档案必须至少挂一个任务入口）`);
        continue;
      }
      for (const t of ts) {
        if (!taskIds.has(t)) errors.push(`${rel} · tasks 引用未知任务 id: ${t}`);
        else used.set(t, used.get(t) + 1);
      }
    }
    for (const [id, n] of used) {
      if (n === 0) errors.push(`sites/tasks.json · 任务 ${id} 没有任何档案引用（假入口）`);
    }
  }
}

/* ── S45 轻档案：light/light.json 校验（2026-10-20 · D9 修订）─────────
 * 对话问答类 / 创作工具类不走八维（D4 定案），走三要素卡。
 * 规则（SCHEMA §9.2）：kind 枚举 · 三要素任一为空硬失败 · 出现 cost 字段硬失败（D9 价格退役）·
 * sources ≥1 · last_verified 在 · confidence 枚举 · id 不与档案撞 · 英文缺 → 警告（R2）。 */
{
  const LIGHT_FILE = path.join(ROOT, 'light', 'light.json');
  if (!fs.existsSync(LIGHT_FILE)) {
    errors.push('缺轻档案真相源: light/light.json（S45）');
  } else {
    const light = JSON.parse(fs.readFileSync(LIGHT_FILE, 'utf8'));
    const KINDS = new Set(light.kindEnum || ['chat', 'creation']);
    const entryIds = new Set(entries.map(([rel, fm]) => fm.id || rel));
    const seen = new Set();
    for (const it of light.items || []) {
      const tag = `light.json · ${it.id || '(无 id)'}`;
      if (!it.id) { errors.push(`${tag} · 缺 id`); continue; }
      if (seen.has(it.id)) errors.push(`${tag} · id 重复`);
      seen.add(it.id);
      if (entryIds.has(it.id)) errors.push(`${tag} · id 与八维档案撞`);
      if (!KINDS.has(it.kind)) errors.push(`${tag} · kind 不在枚举: ${it.kind}`);
      for (const k of ['name', 'vendor', 'homepage']) {
        if (!it[k]) errors.push(`${tag} · 缺 ${k}`);
      }
      for (const k of ['what', 'data', 'who']) {
        if (!it[k] || !String(it[k]).trim()) errors.push(`${tag} · 缺三要素之一: ${k}（缺一个就不是轻档案）`);
      }
      /* D9（2026-10-20 用户定案）：价格字段退役——出现即硬失败，防旧口径回灌 */
      if (it.cost !== undefined || it.costEn !== undefined) errors.push(`${tag} · 出现已退役的 cost 字段（D9：价格不进数据层，只许 pricing_url 指针）`);
      if (it.pricing_url !== undefined && !/^https?:\/\//.test(it.pricing_url)) errors.push(`${tag} · pricing_url 必须是 http(s) URL（只许指针，不许文字报价）`);
      /* S47（2026-10-20）：创作类必须有「商用许可」主打列——许可逐条抄官方，不许缺 */
      if (it.kind === 'creation' && (!it.license || !String(it.license).trim())) {
        errors.push(`${tag} · 创作类缺 license（S47：商用许可是创作区主打列，逐条挂官方条款）`);
      }
      if (!Array.isArray(it.sources) || it.sources.length === 0) errors.push(`${tag} · sources 为空（R5：每条挂官方出处）`);
      if (!it.last_verified) errors.push(`${tag} · 缺 last_verified（核验快照语义）`);
      if (!CONFIDENCE.includes(it.confidence)) errors.push(`${tag} · confidence 不在枚举: ${it.confidence}`);
      for (const k of ['nameEn', 'whatEn', 'dataEn', 'whoEn', ...(it.kind === 'creation' ? ['licenseEn'] : [])]) {
        if (!it[k]) warnings.push(`${tag} · 缺 ${k}（R2 中英同步）`);
      }
    }
  }
}

/* ── S48 深水指南：guides/*.md 校验（2026-10-20 · SCHEMA §十）─────────
 * 方法论内容，不是产品档案——不走八维，也不进 tracks/（tracks 扫描只认
 * products/，混进去会被误检）。规则：id/topic/title/summary 必填 ·
 * topic 枚举 · sources ≥1 · last_verified 在 · confidence 枚举 ·
 * 文件名=id · id 不与档案或轻档案撞 · 英文缺 → 警告（R2）。 */
{
  const GUIDES_DIR = path.join(ROOT, 'guides');
  const TOPICS = new Set(['orchestration', 'memory', 'planning', 'evaluation', 'cost', 'guardrails']);
  if (!fs.existsSync(GUIDES_DIR)) {
    warnings.push('缺 guides/ 目录（S48：深水指南真相源，允许先建格式后灌内容）');
  } else {
    const lightIds = new Set(
      fs.existsSync(path.join(ROOT, 'light', 'light.json'))
        ? (JSON.parse(fs.readFileSync(path.join(ROOT, 'light', 'light.json'), 'utf8')).items || []).map((i) => i.id)
        : []
    );
    const entryIds = new Set(entries.map(([rel, fm]) => fm.id || rel));
    const seen = new Set();
    for (const f of collect(GUIDES_DIR)) {
      if (!f.endsWith('.md')) continue;
      const rel = path.relative(ROOT, f).replace(/\\/g, '/');
      const tag = `guides · ${path.basename(f)}`;
      const text = fs.readFileSync(f, 'utf8');
      const fm = parseFrontmatter(text);
      if (!fm) { errors.push(`${tag} · 缺少 frontmatter`); continue; }
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.id || '')) errors.push(`${tag} · id 格式非法: ${fm.id}`);
      const base = path.basename(f, '.md');
      if (fm.id !== base) errors.push(`${tag} · 文件名(${base}) != id(${fm.id})`);
      if (seen.has(fm.id)) errors.push(`${tag} · id 重复`);
      seen.add(fm.id);
      if (entryIds.has(fm.id)) errors.push(`${tag} · id 与八维档案撞`);
      if (lightIds.has(fm.id)) errors.push(`${tag} · id 与轻档案撞`);
      if (!TOPICS.has(fm.topic)) errors.push(`${tag} · topic 不在枚举: ${fm.topic}`);
      for (const k of ['title', 'summary']) {
        if (!fm[k] || !String(fm[k]).trim()) errors.push(`${tag} · 缺 ${k}`);
      }
      /* sources 走 parseSources（与档案/构建器同一正则口径）——
       * parseFrontmatter 不解析对象数组，fm.sources 永远是 undefined。 */
      const parsedSrc = parseSources(text);
      if (parsedSrc.length === 0) errors.push(`${tag} · sources 为空（R5：关键事实挂官方出处）`);
      if (!parsedSrc.some((s) => s.kind === 'docs' || s.kind === 'paper' || s.kind === 'spec')) errors.push(`${tag} · sources 至少 1 条 kind: docs / paper / spec（官方源）`);
      if (!fm.last_verified) errors.push(`${tag} · 缺 last_verified（核验快照语义）`);
      if (!CONFIDENCE.includes(fm.confidence)) errors.push(`${tag} · confidence 不在枚举: ${fm.confidence}`);
      for (const k of ['titleEn', 'summaryEn']) {
        if (!fm[k]) warnings.push(`${tag} · 缺 ${k}（R2 中英同步）`);
      }
    }
  }
}

/* ── S52 中文生态透镜：cn 块校验（2026-10-20）─────────────────────────
 * 「国产 / 国内可直接用 / 备案状态」——与 models 站共用同一字段口径（总纲 §1.7 缺口 #2）。
 * 档案 frontmatter 的 cn 是两级嵌套 map（parseFrontmatter 支持），轻档案的 cn 是 JSON 对象。
 * 纪律：origin/direct/filing 封闭枚举 · 每个判断带依据 note（中英）· filed 必带编号 ·
 *       not-filed 必带检索口径 note · verified 快照日必填。未知就说 unknown。 */
const CN_ORIGIN = ['domestic', 'foreign'];
const CN_DIRECT = ['yes', 'no', 'unknown'];
const CN_FILING = ['filed', 'not-filed', 'unknown'];
function checkCn(cn, tag, push) {
  if (!cn || typeof cn !== 'object') { push('error', `${tag} · 缺 cn 块（v7 S52：中文生态透镜必填）`); return; }
  if (!CN_ORIGIN.includes(cn.origin)) push('error', `${tag} · cn.origin 越枚举: ${cn.origin}`);
  if (!CN_DIRECT.includes(cn.direct)) push('error', `${tag} · cn.direct 越枚举: ${cn.direct}`);
  if (!CN_FILING.includes(cn.filing)) push('error', `${tag} · cn.filing 越枚举: ${cn.filing}`);
  for (const k of ['origin_note', 'direct_note']) if (!cn[k]) push('error', `${tag} · cn.${k} 为空（判断要给出依据）`);
  if (cn.filing === 'filed' && !cn.filing_no) push('error', `${tag} · cn.filing=filed 但缺 filing_no（备案编号原样抄公示）`);
  if (cn.filing === 'not-filed' && !cn.filing_note) push('error', `${tag} · cn.filing=not-filed 必须写 filing_note 说明检索口径`);
  if (!cn.verified) push('error', `${tag} · cn.verified 缺（直连/备案都是快照，日期即有效期）`);
  for (const k of ['origin_note_en', 'direct_note_en', 'filing_note_en']) if (!cn[k]) push('warn', `${tag} · cn.${k} 缺（R2 中英同步）`);
}
for (const [rel, fm] of entries) {
  checkCn(fm.cn, `档案 ${rel}`, (lvl, msg) => (lvl === 'error' ? errors : warnings).push(msg));
}
{
  const LIGHT_FILE = path.join(ROOT, 'light', 'light.json');
  if (fs.existsSync(LIGHT_FILE)) {
    const light = JSON.parse(fs.readFileSync(LIGHT_FILE, 'utf8'));
    for (const it of light.items || []) checkCn(it.cn, `light.json · ${it.id}`, (lvl, msg) => (lvl === 'error' ? errors : warnings).push(msg));
  }
}

for (const req of ['README.md', 'METHODOLOGY.md', 'SCHEMA.md', 'CONTRIBUTING.md', 'SOURCES.md', 'LICENSE']) {
  if (!fs.existsSync(path.join(ROOT, req))) errors.push(`缺必需文档: ${req}`);
}
for (const a of AXES) {
  const f = `${AXES_FILE[a]}.md`;
  if (!fs.existsSync(path.join(ROOT, 'axes', f))) errors.push(`缺维度定义: axes/${f}`);
}
/* 分区目录 → 分区定义的映射。
 * 2026-10-02 重构：ide + cli 合并为 agents 分区（档案仍按 track: ide/cli 分类，
 * **不合并档案**——三组产品各有两份，runtime/permissions 等维度取值不同）。
 * 所以「分区目录」是三个（agents/harness/tools），而「track 形态枚举」是五个
 * （ide/cli/cloud/harness/mcp，见下方 154 行的枚举校验；cloud 是 2026-10-03 新增）。
 * 两级命名别混：**分区由目录决定，形态由 frontmatter 决定** —— SCHEMA §2.5.1。*/
const TRACK_DIRS = {
  agents: '_track.md',
  harness: '_track.md',
  tools: '_track.md',
};
for (const [d, f] of Object.entries(TRACK_DIRS)) {
  if (!fs.existsSync(path.join(ROOT, 'tracks', d, f))) errors.push(`缺赛道定义: tracks/${d}/${f}`);
}

console.log('=== ai-compare schema 校验 ===');
console.log(`条目数: ${stats.files}`);
console.log(`分赛道: ${JSON.stringify(stats.tracks)}`);
console.log(`错误: ${errors.length}  警告: ${warnings.length}`);
if (errors.length) {
  console.log('\n--- 错误 ---');
  errors.forEach(e => console.log('  ✗ ' + e));
}
if (warnings.length) {
  console.log('\n--- 警告 ---');
  warnings.slice(0, 40).forEach(w => console.log('  ! ' + w));
  if (warnings.length > 40) console.log(`  ... 还有 ${warnings.length - 40} 条`);
}
const hardFail = errors.length > 0;
const softFail = STRICT && warnings.length > 0;
console.log(`\n结果: ${hardFail ? '❌ 失败' : softFail ? '⚠️ 严格模式失败' : '✅ 通过'}`);
process.exit(hardFail || softFail ? 1 : 0);
