#!/usr/bin/env node
// ============================================================================
// agent-guide → 三分区站点构建脚本
// ----------------------------------------------------------------------------
// 数据源：tracks/{agents,harness,tools}/products/*.md（frontmatter + 正文）
// 输出：  _sites/agent.specul/index.html + _sites/agent.specul/<id>.html + assets
//
// 用法：
//   node sites/build.mjs                    # 构建三个分区站
//   node sites/build.mjs agents             # 只构建一个分区
//   node sites/build.mjs --check            # 只校验数据，不出站
//
// 设计约束（来自品牌壳与数据层约定）：
//   1. 顶栏/页脚/基础 token 一律走 brand.css，页面不另起一套
//   2. 内容层只用 --accent 做分色，不改 --bg/--ink/--line 等基础色
//   3. 8 维度顺序固定，来自 axes/ 的定义顺序
//   4. 数据有缺口就不出站（校验失败即中止）
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell as buildShell } from './shell.mjs';
import { computeCompleteness } from '../scripts/completeness.mjs';
import { parseFrontmatter, parseSources, bodyAfter } from '../scripts/yaml.mjs';

// 路径解析优先级：环境变量 > 向上查找仓库根 > 脚本位置推导
//
// 三种用法都要支持：
//   1. 本地开发：脚本在 <repo>/_sites/_template/，数据在 <repo>/_data/ai-compare
//      → 脚本上溯两级是 repo，向下拼 _data/ai-compare
//   2. CI 构建：脚本在 <data-repo>/sites/，数据同仓库
//      → 脚本上一级就是数据仓库，tracks/ 与之平级
//   3. 显式指定：DATA_DIR / OUT_DIR / BRAND_DIR 环境变量
const HERE = path.dirname(fileURLToPath(import.meta.url));


/* 英文内容在本仓内 i18n/（铁律 R3）。
 * 原先这 7 个文件住在主仓 _audit/，构建脚本用 '../../../_audit/...' 去读 ——
 * 于是 `git clone speculcom/ai-agent-guide` 之后构建直接 ENOENT，英文站产不出来，
 * 而该仓 README 声称自己是唯一数据源。2026-10-08 迁入本仓。 */
const I18N_DIR = path.join(HERE, '..', 'i18n');

function findDataDir() {
  if (process.env.DATA_DIR) return path.resolve(process.env.DATA_DIR);
  // 从脚本位置向上找带 tracks/ 的目录（即数据仓库根）
  let dir = HERE;
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(dir, 'tracks'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  // 回退：按本地开发布局推断（2026-10-02 起内容仓改名为 _data/agent-guide）
  return path.resolve(HERE, '..', '..', '_data', 'agent-guide');
}

function findOutDir(dataDir) {
  if (process.env.OUT_DIR) return path.resolve(process.env.OUT_DIR);
  /* 判定依据是「脚本是否落在 monorepo 的 _data/<内容仓>/sites/ 下」，
   * 而不是「_sites 目录是否存在」——后者会误判：CI 里上溯路径可能是任意位置，
   * 恰好存在 _sites 就被当成本地布局。
   *
   * 上溯层数别数错：脚本在 <repo>/_data/agent-guide/sites/ 下，
   * 要上溯 **三层** 才到 <repo>（sites → agent-guide → _data → repo）。
   * 数成两层会拿到 <repo>/_data，然后去比 _data/_data/agent-guide —— 永远不成立，
   * 于是本地构建悄悄落到 <内容仓>/dist/ 而不是 _sites/（2026-10-02 实际踩到）。
   */
  const repoRoot = path.resolve(HERE, '..', '..', '..');
  const isLocalLayout = dataDir === path.join(repoRoot, '_data', 'agent-guide');
  return isLocalLayout
    ? path.join(repoRoot, '_sites', 'agent.specul')
    : path.join(dataDir, 'dist');
}

function findBrandDir() {
  if (process.env.BRAND_DIR) return path.resolve(process.env.BRAND_DIR);
  /* 1. 本仓 vendored 副本（铁律 R3）。
   * 之前只有两种来源：本机 <repo>/www.specul/，或 CI 约定的 .build/。
   * 克隆者两个都没有 → 构建在 copyFileSync('.build/brand.css') 处 ENOENT 直接挂。
   * 副本与真相源的一致性由 _audit/brand-sync.mjs 守着（brand/MANIFEST.json 记哈希）。 */
  const vendored = path.resolve(HERE, '..', 'brand');
  if (fs.existsSync(path.join(vendored, 'brand.css'))) return vendored;
  // 本地布局：品牌壳在 <repo>/www.specul/（上溯三层到 repo，见 findOutDir）
  const repoGuess = path.resolve(HERE, '..', '..', '..', 'www.specul');
  if (fs.existsSync(path.join(repoGuess, 'brand.css'))) return repoGuess;
  return '.build'; // CI 约定
}

const DATA = findDataDir();
const OUT = findOutDir(DATA);
const BRAND_DIR = findBrandDir();
const BRAND = path.join(BRAND_DIR, 'brand.css');
const BRANDJS = path.join(BRAND_DIR, 'brand.js');

/* 维度 = [key, 中文名, 英文名]（2026-10-04 加第三项）。
 * ⚠ **key 不可改** —— 它参与数据索引（e.axes[k]），改了全盘失效。
 * 渲染处用 bi(name, nameEn) 输出双节点。*/
/* 维度 = [key, 中文名]（2026-10-04 改回二元组）。
 * 英文名**不在这里取** —— AXES_EN 的加载在文件更下方，而 const 有暂时性死区（TDZ），
 * 在这里引用会 ReferenceError。改为渲染处按 key 查 AXES_EN。
 * ⚠ **key 不可改** —— 它参与数据索引（e.axes[k]）。*/
const AXES = [
  ['model_access', '模型与开放条件'],
  ['runtime', '运行位置'],
  ['local_files', '本地文件'],
  ['background', '关机后的任务'],
  ['tools', '工具与扩展'],
  ['context', '上下文与记忆'],
  ['permissions', '权限与限制'],
  ['fit', '适合什么任务'],
];
const MCP_AXES = [
  ['transport', '传输方式'],
  ['auth', '认证机制'],
  ['scope', '权限范围'],
];

// 每个维度「问的是什么」—— 首页展示用，让读者一眼理解坐标系
/* 维度提问 —— 2026-10-04 补英文侧（*En 键）。
 * 原键保留中文（渲染处按语言选），新增 En 键存英文。
 * 这些提问含判断（「远程控制不等于云端执行」），翻译要保留这种语气。*/
const AXIS_DESC_EN = {
  model_access: 'Whose model does it use? Can you switch to a third party? How is multi-model routing configured?',
  runtime: 'Local, cloud or hybrid? Is the index local or remote? Remote control is not the same as cloud execution.',
  local_files: 'How wide an area can it reach? How does it read large files you have not opened? How capable is it at the symbol level?',
  background: 'Does it keep running once the computer is off? This is the most common misconception about local forms.',
  tools: 'How wide is the toolchain: MCP · LSP · plugins · hooks · custom instructions?',
  context: 'Indexing algorithm, context window, session resume and fork, and the boundary of cross-session memory.',
  permissions: 'Sandbox and approval boundaries, credential handling, whether data leaves your machine, and how quota is charged.',
  fit: 'What tasks is it best at? When should you not use it?',
  transport: 'How the client connects to it: stdio / SSE / Streamable HTTP / remote.',
  auth: 'How identity is proved. Note that authentication is not authorisation: the former is who you are, the latter is what you may do.',
  scope: 'How much can it reach? Can it modify? Delete? Be tightened? This is the first priority in the MCP track.',
};
const AXIS_DESC = {
  model_access: '用谁的模型？能不能换第三方？多模型路由怎么配？',
  runtime: '本地 / 云端 / 混合？索引在本地还是云端？远程控制不等于云端执行。',
  local_files: '能访问多大范围？未打开的大文件怎么读？符号级能力如何？',
  background: '电脑关了还能继续跑吗？这是本地形态最常见的误解来源。',
  tools: '工具链有多宽：MCP · LSP · 插件 · Hooks · 自定义指令。',
  context: '索引算法、上下文窗口、会话恢复与分叉、跨会话记忆边界。',
  permissions: '沙箱与审批边界、凭据管理、数据是否出境、额度如何计算。',
  fit: '最擅长什么任务？什么情况下别用它？',
  transport: '客户端怎么连上它：stdio / SSE / Streamable HTTP / 远程。',
  auth: '怎么证明身份。注意认证 ≠ 授权，前者是「你是谁」，后者是「你能做什么」。',
  scope: '能碰到多少东西？能改吗？能删吗？能收紧吗？这是 MCP 分区第一优先级。',
};

/* ============================================================
 * 站点 + 分区配置：agent.specul.com 一个站，三个分区
 * ============================================================
 * 2026-10-02 重构：原来 ide/cli/mcp/harness 四个独立站（四个域名），
 * 合成**一站三分区**。理由：
 *   - 「IDE vs CLI」这个轴 2026 年已失效（Claude Code / Copilot / Cursor
 *     三者全部有 CLI、全部 agent 式执行代码、全部支持 MCP）
 *   - 四站分散会让「同一个产品的两种装法」看起来像两个产品在竞争
 *
 * **三个分区不能合成一张表**（这是本页最重要的渲染约束）：
 *   agents  关心「装在哪、连什么模型、沙箱边界」—— 8 个通用维度
 *   harness 关心「状态持久化 vs 上下文压缩」—— 同8 维但核心分野在 family
 *   tools   关心「缺什么能力 → 装哪个」—— 坐标系是 MCP 三维，不是八维
 *
 * ── URL 与CNAME 的分工（曾踩过的坑）────────────────────────────────
 * `domain` 一律是**根域名**，不带路径：CNAME 文件只接受域名，
 * 写 `agent.specul.com/harness/` 会让 Pages 绑定失败。
 * 分区路径由 `dir` 单独表达（'' 表示落在根）。
 */
/* 双语节点。
 * ⚠ **不做 HTML 转义** —— GUIDE 的 title/lede/steps/foot 里含<strong> 与 <a> 等
 *   标记（强调位置 = 哪些是判断，是原文的一部分），转义会把它们变成字面文本。
 *   这些字符串是**构建期写死在源码里的常量**，不是外部输入，没有注入风险。
 *   需要转义的地方（产品名等外部数据）仍走 esc()。*/
const bi = (zh, en) => `<span data-zh>${zh}</span><span data-en>${en}</span>`;

function biLabel(pair, fallback) {
  return Array.isArray(pair) ? bi(pair[0], pair[1]) : esc(pair || fallback);
}

/* ── S52 中文生态透镜（2026-10-20）──────────────────────────────────
 * 「国产 / 国内可直接用 / 备案状态」——与 models 站共用同一字段口径与同一组
 * 版式（brand.css 的 .t-tag / .t-state，宪章 1：不新造组件）。
 * 数据在档案 frontmatter cn: 与 light.json 的 cn（validate 强制必填 + 枚举）。 */
const CN_ORIGIN_LABEL = { domestic: ['国产', 'domestic'], foreign: ['国外出品', 'foreign-made'] };
const CN_DIRECT_LABEL = { yes: ['大陆可直连', 'direct OK'], no: ['直连不可达', 'direct blocked'], unknown: ['直连未核验', 'direct unknown'] };
const CN_FILING_LABEL = { filed: ['已备案', 'filed'], 'not-filed': ['未见于备案名单', 'not in filing list'], unknown: ['备案未核验', 'filing unknown'] };
function cnChips(cn) {
  if (!cn) return '';
  const out = [];
  if (CN_ORIGIN_LABEL[cn.origin]) out.push(`<span class="t-tag${cn.origin === 'domestic' ? '' : ' is-cyan'}">${bi(CN_ORIGIN_LABEL[cn.origin][0], CN_ORIGIN_LABEL[cn.origin][1])}</span>`);
  if (CN_DIRECT_LABEL[cn.direct]) out.push(`<span class="t-tag${cn.direct === 'yes' ? ' is-cyan' : ''}">${bi(CN_DIRECT_LABEL[cn.direct][0], CN_DIRECT_LABEL[cn.direct][1])}</span>`);
  if (CN_FILING_LABEL[cn.filing]) {
    const dot = cn.filing === 'filed' ? ' is-ok' : (cn.filing === 'unknown' ? ' is-warn' : '');
    out.push(`<span class="t-state${dot}">${bi(CN_FILING_LABEL[cn.filing][0], CN_FILING_LABEL[cn.filing][1])}</span>`);
  }
  return out.join(' ');
}
/* 详情页的「中文生态」面板：三行判断 + 依据 + 快照日。
 * 与 models 站 cnSection 同一口径：备案抄公示编号，直连写实测日期与渠道。 */
function cnPanel(cn) {
  if (!cn) return '';
  const filingRow = cn.filing === 'filed'
    ? `${bi('已备案', 'Filed')}：<code>${esc(cn.filing_no || '')}</code>${cn.filing_name ? `　${bi('公示名称', 'listed as')}「${esc(cn.filing_name)}」` : ''}${cn.filing_date ? `　·　${bi('备案时间', 'filed')} ${esc(cn.filing_date)}` : ''}${cn.filing_note ? `　·　${bi(esc(cn.filing_note), esc(cn.filing_note_en || cn.filing_note))}` : ''}`
    : `${bi(CN_FILING_LABEL[cn.filing] ? CN_FILING_LABEL[cn.filing][0] : '备案未核验', CN_FILING_LABEL[cn.filing] ? CN_FILING_LABEL[cn.filing][1] : 'filing unknown')}${cn.filing_note ? `：${bi(esc(cn.filing_note), esc(cn.filing_note_en || cn.filing_note))}` : ''}`;
  return `      <div class="panel">
        <h2>${bi('中文生态', 'China availability')} <span class="panel-note">${bi('国产 / 国内可直接用 / 备案状态 · 快照', 'domestic / direct access / CAC filing · snapshot')} ${esc(cn.verified || '')}</span></h2>
        <dl class="cn-rows">
          <dt>${bi('出品属地', 'Origin')}</dt><dd>${bi(CN_ORIGIN_LABEL[cn.origin] ? CN_ORIGIN_LABEL[cn.origin][0] : '?', CN_ORIGIN_LABEL[cn.origin] ? CN_ORIGIN_LABEL[cn.origin][1] : '?')}　${bi(esc(cn.origin_note || ''), esc(cn.origin_note_en || cn.origin_note || ''))}</dd>
          <dt>${bi('国内使用', 'Direct access')}</dt><dd>${bi(CN_DIRECT_LABEL[cn.direct] ? CN_DIRECT_LABEL[cn.direct][0] : '?', CN_DIRECT_LABEL[cn.direct] ? CN_DIRECT_LABEL[cn.direct][1] : '?')}　${bi(esc(cn.direct_note || ''), esc(cn.direct_note_en || cn.direct_note || ''))}</dd>
          <dt>${bi('备案状态', 'CAC filing')}</dt><dd>${filingRow}</dd>
        </dl>
        <p class="cn-foot">${bi('备案信息以网信办《生成式人工智能服务已备案信息》公示名单为准（按批次滚动更新，本站只抄编号不解读）；「大陆可直连」是本站从大陆网络直连实测的结果，不是厂商承诺。GitHub 类站点当日实测有波动，口径写在依据里。', 'Filing status is quoted from the CAC public registry (updated batch by batch; this site copies the number and does not interpret it). "Direct access" is this site\'s own reachability measurement from a mainland network, not a vendor promise. GitHub-hosted sites fluctuated on the measurement day — the note says so.')}</p>
      </div>\n`;
}

const SITE = {
  domain: 'agent.specul.com',
  name: 'Agent 图谱',
  /* 站名与 desc 的英文（2026-10-04）—— 首页 kicker 走 t-site.name、hero 走 desc，
   * 之前都是纯中文，英文态下这两处露中文。desc 改成双节点字符串。 */
  nameEn: 'Agent Atlas',
  tagline: '让 AI 替你干活 —— 装在哪、连什么、边界在哪',
  desc: bi('按角色分三层：自己跑的成品 agent、自己搭的运行时与 SDK、给 agent 装的 MCP 工具。三层的坐标系不同，不做横向排名。',
    'Three layers by role: finished agents you run yourself, runtimes and SDKs you assemble yourself, and MCP tools you install for an agent. The three layers use different coordinate systems, so this site does not rank across them.'),
  repo: 'https://github.com/speculcom/ai-agent-guide',
  // 站内分区导航（跨站导航在 shell.mjs 的 NAV 里，那是全站唯一定义处）
  partitions: ['agents', 'harness', 'tools'],
};

/* ── 双语辅助（2026-10-04）────────────────────────────────────────
 * 必须声明在 SITES 之前 —— SITES 的 tagline 直接调用 bi()，
 * 而 const 有暂时性死区（TDZ），定义在使用点之后会 ReferenceError。
 * ⚠ bi() 不做 HTML 转义：GUIDE 与 lede 里含 <strong>/<a> 标记，
 *   转义会把它们变成字面文本。这些是源码里的常量，无注入风险。
 * ────────────────────────────────────────────────────────────── */
/* README 是 Markdown（不是 HTML）→ 只能用纯文本，取中文侧。*/
/* 取双节点里的纯文本（用于 <title> / meta description）。
 * tagline 现在是 bi() 的产物（带标签），直接塞进 title 会变成源码。*/
function plainTagline(node) {
  const s = String(node || '');
  const m = s.match(/<span data-zh>([\s\S]*?)<\/span>/);
  return (m ? m[1] : s).replace(/<[^>]+>/g, '');
}

const FORM_LABEL_MD = (track, family) =>
  (FORM_LABEL[track] || FAMILY_SHORT[family] || [track])[0];

const SITES = {
  agents: {
    key: 'agents',
    navKey: 'agent',   // 跨站导航的 key：三分区共用一个导航项
    dir: '',              // 落站点根：导航「Agent」指的就是它，不该让访客多点一次
    domain: SITE.domain,
    name: '成品 Agent',
    nameEn: 'Finished agents',
    short: 'Agents',
    accent: '#8b7cf8',
    tagline: bi('装在编辑器、终端，或厂商云里','Installed in an editor, a terminal, or a vendor cloud'),
    // desc 只说「本分区比较什么维度」，不逐个列对象名——
    // 逐个列会在档案分期补齐时与实际数量不一致（曾出现「3 个对象」却列了 10 个名字）
    desc: bi('自己能跑的成品 AI agent，共用八维（模型接入 / 运行位置 / 本地文件 / 关机后任务 / 工具扩展 / 上下文 / 权限 / 适合场景）。按形态分三列——IDE 形态、CLI 形态、厂商云形态。前两者是同一产品的不同装法、不是竞争关系；厂商云形态则是另一个方向：不需要自己装，工作在别人的机器上做。',
      'Finished AI agents you can run yourself, compared on eight shared dimensions (model access / where it runs / local files / tasks after shutdown / tools and extensions / context / permissions / best fit). Grouped into three forms — IDE, CLI and vendor cloud. The first two are different install forms of the same product, not competitors; vendor cloud is a different direction entirely: nothing to install, the work happens on someone else\'s machine.'),
    // cloud 是 2026-10-03 新增的第三种形态（OpenAI Dot / Meta Muse / xAI Grok Bot）。
    // 它们既不是 IDE 也不是终端 CLI —— 装在厂商的云上，本机不装任何东西。
    // 归agents 分区是因为它们和 ide/cli 共享同一套八维坐标系；
    // **不新开分区**是因为新开分区会让「八维对比」这件事跨站分裂。
    owns: ['ide', 'cli', 'cloud'],
    // agents 分区额外按形态分三组呈现（ide/cli/cloud）——因为三组产品各有两份档案，不能合成一张表
    splitBy: 'form',
  },
  harness: {
    key: 'harness',
    navKey: 'agent',   // 跨站导航的 key：三分区共用一个导航项
    dir: 'harness',
    domain: SITE.domain,
    name: '自己搭的底座',
    nameEn: 'Runtimes & SDKs',
    short: 'Harness',
    accent: '#3b82f6',
    tagline: bi('运行时、编排框架、SDK','Runtimes, orchestration frameworks, SDKs'),
    /* desc 原来只给中文 —— 分区页的 .lede 直读它，英文态整段露中文（2026-10-08 修）。 */
    desc: bi('Agent 运行时 / 编排框架 / SDK 的责任边界、状态持久化能力与权限模型。收录标准：提供 Agent 运行时或编排层、有官方文档可回溯、近 30 天有实质更新。',
      'The responsibility boundaries of agent runtimes, orchestration frameworks and SDKs, plus state persistence and permission models. Admission criteria: provides an agent runtime or orchestration layer, has official documentation that can be traced back, and has substantive updates within the last 30 days.'),
    owns: ['harness'],
    splitBy: 'family',   // 按抽象层分组：原语型 / 编排型 / 开箱型
  },
  tools: {
    key: 'tools',
    navKey: 'agent',   // 跨站导航的 key：三分区共用一个导航项
    dir: 'tools',
    domain: SITE.domain,
    name: '给 agent 装的工具',
    nameEn: 'MCP tools',
    short: 'Tools',
    accent: '#22d3c5',
    // 「你装，它调」——用户动作是装不是调，这是这站正确的表述
    tagline: bi('缺什么，装什么 —— 给 agent 装的 MCP 工具','Fill the gap — MCP tools an agent can install'),
    desc: bi('MCP server 的权限范围、传输方式与输出可用性。收录标准：已发布为可安装的 MCP server、有官方仓库或文档可回溯、近 30 天有实质更新。这里是能力缺口查表，不是选型对比。',
      'The permission scope, transport and output usability of MCP servers. Admission criteria: released as an installable MCP server, has an official repository or documentation that can be traced back, and has substantive updates within the last 30 days. This is a capability-gap reference table, not a selection comparison.'),
    owns: ['mcp'],
    splitBy: null,
  },
};

const args = process.argv.slice(2);
const CHECK_ONLY = args.includes('--check');
const only = args.filter(a => !a.startsWith('--'));
const targets = only.length ? only : Object.keys(SITES);

// ── frontmatter 解析 ────────────────────────────
// 解析逻辑住在 scripts/yaml.mjs（唯一真相源，2026-10-15 从本文件与
// scripts/validate.mjs 两份「同源」副本抽出）。两份无机制保证同步，
// 2026-10-09 踩过：validate 修了数组判别、这里忘了，构建仍报「缺维度 axes.*」。
// 守卫：_audit/yaml-single-source.mjs。

// 数据完整度快照：来自数据层 `node scripts/audit-gaps.mjs` 的输出。
// 写死而非运行时计算，有两个原因：
//   1. 站点构建不必再跑一次解析
//   2. 这个数字本身就是「上一次人工核验的快照」，带 last_verified 语义，
//      动态计算反而会掩盖「数据多久没动了」
// 更新方式：跑 audit-gaps 后同步这里。
/* ⚠ 2026-10-08 改为**实时计算**（铁律 R4）。
 * 原来这里是写死的快照：`COVERAGE = {done:120, total:211}` 加按旧赛道名
 * （ide / cli / mcp）索引的 COVERAGE_BY_TRACK。数据模型早已从 ide/cli/mcp
 * 合并成 agents / harness / tools，于是：
 *   1. 写死的 120/211 与真实值对不上（真实值见下）
 *   2. COVERAGE_ROWS.harness 是**空数组** —— harness 的完整度整块不显示，
 *      用户从来没看到过它是全站最低的那一档（40%）
 * 现在统一从 scripts/completeness.mjs 取值，谁都不许再手写数字。 */
const COMPLETENESS = computeCompleteness();
const COVERAGE = { done: COMPLETENESS.done, total: COMPLETENESS.total };

/* B2（2026-10-09）：**按产品**的完整度（维度补齐数），供索引页筛选后的排序用。
 * 明细与统计来自同一次解析（`detail` 里每个 (产品, 维度) 都有一条，含 absent），
 * 所以这里只是把 detail 按产品归并 —— 不另算一套，避免「三个数字」重演。 */
const PRODUCT_COMPLETENESS = {};
for (const d of COMPLETENESS.detail) {
  const k = d.obj;
  if (!PRODUCT_COMPLETENESS[k]) PRODUCT_COMPLETENESS[k] = { done: 0, total: 0 };
  PRODUCT_COMPLETENESS[k].total++;
  if (d.status === 'done') PRODUCT_COMPLETENESS[k].done++;
}

/* B2：筛选脚本读独立文件（agent 的 build 也是模板字符串，脚本里写反引号会截断）。
 * ⚠ 筛选样式**不在这里** —— 本仓的 site.css 是**原样复制**到产物的（不是构建生成的），
 *   所以样式写进 `sites/site.css` 源文件本身。CSS 与 JS 分开放，各归其位。 */

/* S43（2026-10-19）任务化入口：任务元信息来自 sites/tasks.json。
 * 真相源分工：档案 frontmatter 的 tasks: 决定「谁属于哪个任务」；
 * 这里只管任务的名字与导语。条数一律从 entries 现算（R4），不写死。 */
const TASKS = JSON.parse(fs.readFileSync(path.join(HERE, 'tasks.json'), 'utf8')).tasks;
const AGENT_FILTER_JS = fs.readFileSync(path.join(HERE, 'agent-filter.js'), 'utf8');
/** 每个赛道一行；说明文字保留旧的手写语境（那是解读，不是数字） */
const COVERAGE_BY_TRACK = Object.fromEntries(
  Object.entries(COMPLETENESS.byTrack).map(([t, v]) => [t, { done: v.done, total: v.total }]),
);
/* 每个分区展示哪些赛道行。现在分区与赛道一一对应，直接用自己那一行。 */
const COVERAGE_ROWS = { agents: ['agents'], harness: ['harness'], tools: ['tools'] };
/* TRACK_LABEL 现在是 [zh, en] 数组，取用时包一层双节点。
 * agent 是静态站点 → 双节点由 CSS 按 [data-lang] 选显。*/
function TRACK_LABEL_BI(track) {
  const p = TRACK_LABEL[track];
  return Array.isArray(p) ? bi(p[0], p[1]) : esc(p || track);
}

const TRACK_LABEL = {
  mcp: ['MCP 服务器', 'MCP server'],
  cli: ['CLI 形态', 'CLI form'],
  ide: ['IDE 形态', 'IDE form'],
};

// ── 读取一个赛道 ───────────────────────────────────────────────────────────
/* 站点 → 赛道目录的映射。
 * 2026-10-02 重构：4 站（ide/cli/mcp/harness）合成 1 站 3 分区。
 * 但**档案的 track: 字段没变**（仍是 ide/cli/mcp/harness 四种取值）——
 * 它是内容分类，validate 与 familyGroups 都依赖它，不要改成 agents/tools。
 * 这里只解决「文件在哪」的问题：
 *   agents 分区 ← tracks/agents（内含 track:ide 8 份 + track:cli 6 份）
 *   harness 分区 ← tracks/harness（track:harness 10 份）
 *   tools  分区 ← tracks/tools（track:mcp 9 份）
 */
/* 档案 pitfalls（头号误解）的英文 —— 键 = 档案 id，值为字符串数组。
 * ⚠ 这是全站最敏感的一段：每条都在纠正对产品的**错误理解**，
 *   很多直接关系到会不会误用（权限、沙箱、默认行为）。翻译时判断强度必须完全保留，
 *   未核验标记也保留。
 * ⚠ 必须声明在**顶层**（这里，loadTrack() 之前）：之前它被插进 loadTrack() 函数体内部，
 *   结果 renderDetail() 访问不到（ReferenceError: PITFALLS_EN is not defined）。
 *   「插到某个锚点前」不可靠 —— 必须确认插入点不在任何块作用域内。 */
const PITFALLS_EN = {};
try {
  for (const f of ['_pitfalls-a.en.json', '_pitfalls-b.en.json']) {
    Object.assign(PITFALLS_EN, JSON.parse(fs.readFileSync(path.join(I18N_DIR, f), 'utf8')));
  }
} catch (e) {
  throw new Error('pitfalls 英文读不到：' + e.message);
}
{
  const ks = Object.keys(PITFALLS_EN).filter(k => !k.startsWith('_'));
  console.log(`  · 头号误解英文：${ks.length} 份档案、${ks.reduce((n, k) => n + PITFALLS_EN[k].length, 0)} 条已加载`);
}

const TRACK_DIRS = { agents: 'agents', harness: 'harness', tools: 'tools' };

function loadTrack(partKey) {
  /* 按分区读档案。ide 与 cli 的档案现在同处 tracks/agents/，
   * 但 track: 值不同 —— 不能只按目录过滤，否则会丢三组里各一份的一半。
   * 做法：读该分区目录下的products，用 frontmatter 的 track 判归属
   *（SITES[partKey].owns），目录外的档案自然不会被读到。 */
  const site = SITES[partKey];
  const dir = path.join(DATA, 'tracks', TRACK_DIRS[partKey], 'products');
  if (!fs.existsSync(dir)) return { entries: [], errors: [`目录不存在: ${dir}`] };
  const entries = [];
  const errors = [];
  const seen = new Set();
  // 归属：分区 → 它收哪些 track 值的档案
  const OWNED = site.owns;

  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md')).sort()) {
    const abs = path.join(dir, f);
    const raw = fs.readFileSync(abs, 'utf8');
    const fm = parseFrontmatter(raw);
    const rel = path.relative(DATA, abs).replace(/\\/g, '/');
    if (!fm) { errors.push(`${rel} · frontmatter 解析失败`); continue; }
    if (OWNED && !OWNED.includes(fm.track)) continue;

    const id = fm.id || f.replace('.md', '');
    if (f.replace('.md', '') !== id) errors.push(`${rel} · 文件名与 id 不符`);
    if (seen.has(id)) errors.push(`${rel} · id 重复: ${id}`);
    seen.add(id);
    // 断言改成「track 值必须属于该分区收的集合」——
    // 原来比的是 `fm.track !== track`，那时 track 恰好等于 track 值；
    // 一站三分区后 track 是分区名（agents/tools），直接比会全库报错。
    if (!OWNED.includes(fm.track)) errors.push(`${rel} · track 字段(${fm.track})不属于分区 ${partKey}`);

    const need = ['id','name','vendor','homepage','last_verified','confidence','lifecycle'];
    for (const k of need) if (!fm[k]) errors.push(`${rel} · 缺必填 ${k}`);

    const axes = fm.axes || {};
    // MCP 档案另有 3 个特有维度，在 mcp: 块下（见 SCHEMA 2.4）
    const mcpBlock = fm.mcp || {};
    const mcpKeys = OWNED.includes('mcp') ? MCP_AXES.map(x => x[0]) : [];
    for (const k of AXES.map(x => x[0])) {
      if (!axes[k]) errors.push(`${rel} · 缺维度 axes.${k}`);
    }
    for (const k of mcpKeys) {
      if (!mcpBlock[k]) errors.push(`${rel} · 缺 MCP 维度 mcp.${k}`);
    }

    const srcs = Array.isArray(fm.sources) ? fm.sources : [];
    if (srcs.length < 2) errors.push(`${rel} · sources 少于 2 条`);

    // sources 是 frontmatter 里的对象数组，统一走 yaml.mjs 的 parseSources
    const sources = parseSources(raw);

    // 正文：frontmatter 之后
    const body = bodyAfter(raw);
    /* 章节正文要匹配到**下一个二级标题或文件真正末尾**。这里有两种写法都会静默丢内容：
     *  ① 收尾 `|\s*$` —— `\s` 含 `\n\n`，匹配到**第一个空行**就停；
     *  ② 收尾 `|$` 配非贪婪 `[\s\S]*?` —— m 模式下 `$` 匹配**每个行尾**，
     *     于是非贪婪在第一行末就满足条件。
     * 两者都让「适合与不适合」这类多段章节只剩首段，**而且不报错** ——
     * 页面照常渲染，只是内容悄悄少了一半。copilot.md 等既有档案同样中招，
     * 说明这个 bug 存在整个仓库生命周期，只是没人核对章节完整性
     * （2026-10-03 补云上agent 档案、核对渲染结果时才发现）。
     * EOF 用「后面什么都没有」的否定前瞻 `(?!\s*\z)` 才准确。 */
/* ↓ 翻译数据必须在**解析档案之前**加载 —— 顺序错了不报错，只是取到空值。
 *2026-10-04：ONELINES_EN / FIT_EN 曾加载在解析之后（444 行解析 vs 529 行加载），
 * 所有 onelineEn / fitEn 都是空字符串，翻译「看起来没生效」且零报错。 */
/* 档案正文首段的英文（2026-10-04）—— 键 = 档案 id。
 * 加载**必须在 sec 解析之前**：否则解析时拿到空对象，所有 leadEn 为空字符串，
 * 翻译「看起来没生效」且零报错（这个坑踩过一次）。 */
let LEADS_EN = {};
try {
  LEADS_EN = JSON.parse(fs.readFileSync(path.join(I18N_DIR, '_leads.en.json'), 'utf8'));
} catch (e) {
  throw new Error('档案首段英文读不到：' + e.message);
}
console.log(`  · 档案首段英文：${Object.keys(LEADS_EN).filter(k => !k.startsWith('_')).length} 条已加载`);

/* 36 份产品档案的「一句话定位」英文。人工翻译（原文含定位判断与比较级）。
 * 同样**加载失败抛错**。*/
const ONELINES_EN_PATH = path.join(I18N_DIR, '_onelines.en.json');
let ONELINES_EN = {};
try {
  ONELINES_EN = JSON.parse(fs.readFileSync(ONELINES_EN_PATH, 'utf8'));
} catch (e) {
  throw new Error('一句话定位英文读不到：' + ONELINES_EN_PATH + ' —— ' + e.message);
}
console.log(`  · 一句话定位英文：${Object.keys(ONELINES_EN).filter(k => !k.startsWith('_')).length} 条已加载`);

/* 「适合与不适合」的英文（36 条选型判断）—— 单独一份，与 oneline 分开。
 * 这批是**核心选型判断**（什么适合 / 什么不适合），译错会直接误导用户，
 * 所以单独成文件便于逐条校对。键= 档案 id。*/
let FIT_EN = {};
try {
  FIT_EN = JSON.parse(fs.readFileSync(path.join(I18N_DIR, '_fits.en.json'), 'utf8'));
} catch (e) {
  /* 不抛错：fit 缺英文时回退中文仍可用（oneline 已覆盖主要阅读需求）。
   * 与 ONELINES_EN 的差别：oneline 是「这是什么」，缺了就完全读不到对象；
   * fit 是「何时用」，缺了主体内容仍在。*/
  console.warn('  ! _fits.en.json 读不到，「适合与不适合」保持中文：' + e.message);
}
    const section = (name) => {
      const m = new RegExp(`^##\\s+${name}\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n##\\s|$(?![\\s\\S]))`, 'm').exec(body);
      return m ? m[1].trim() : '';
    };
    /* ⚠ **正文其余小节的兜底**（2026-10-09 加）。
     *   实测：**546 个小节里 463 个的正文在产物里根本不存在** ✗ —— 模板只渲染 5 个具名面板
     *   （一句话定位 / 适合与不适合 / 实测记录 / 未知项清单 / 相关条目），
     *   其余 `## 安装方式` / `## 架构关键` / `## 三种形态` / `## 核验说明` … 全被丢掉 ✗✗。
     *   **这是「探针读源文件、读者看页面」这一类问题里最严重的一次** ——
     *   我前几轮改写的正文，大部分读者一个字都看不到；而所有探针都读源文件，所以一路全绿 ✗。
     *   （我先前验过「每篇正文的**最后**一个小节在不在产物里」→ 52/52 ✓ —— 那个检查是**空洞的** ✗，
     *    因为最后一个恰好总是会被渲染的 `未知项清单` ✓。）
     *
     *   这里把除那 5 个之外的小节**按原顺序**收进 `extraSections`，模板里依次渲染。 */
    const NAMED = ['一句话定位', '适合与不适合', '实测记录', '未知项清单', '相关条目'];
    const extraSections = [];
    {
      const re = /^##\s+(.+?)\s*\r?\n([\s\S]*?)(?=\r?\n##\s|$(?![\s\S]))/gm;
      let m;
      while ((m = re.exec(body))) {
        const title = m[1].trim();
        if (NAMED.includes(title)) continue;
        const content = m[2].trim();
        if (content) extraSections.push({ title, content });
      }
    }

    entries.push({
      id, name: fm.name, nameEn: fm.nameEn || '', vendor: fm.vendor, homepage: fm.homepage,
      mark: fm.mark || '', accent: fm.accent || '',
      tagline: fm.tagline || '', summary: fm.summary || '',
      tags: fm.tags || [], related: fm.related || [],
      /* D9（2026-10-20）：pricing / pricing_pitfalls 字段族已退役，不再读取 */
      axes, mcp: mcpBlock, sources, extraSections,
      pitfalls: fm.pitfalls || [],
      lastVerified: fm.last_verified, lastUpdated: fm.last_updated,
      lifecycle: fm.lifecycle, confidence: fm.confidence,
      family: fm.family || '',  // harness 分层；validate 强制必填，页面需按它分组呈现
      track: fm.track,// 仍是内容分类四取值（ide/cli/harness/mcp），首页按它分形态
      tasks: Array.isArray(fm.tasks) ? fm.tasks : [], // S43 任务入口（validate 强制 ≥1）
      cn: fm.cn || null, // S52 中文生态透镜（validate 强制必填，页面按它渲染 chip + 筛选）
      axesKeys: [...AXES.map(x => x[0]), ...mcpKeys],
      body,
      sec: {
        /* onelineEn / fitEn 来自 _onelines.en.json（键 = 档案 id）—— 2026-10-04。
         * 缺键时回退中文（可接受降级），不报错。 */
        oneline: section('一句话定位'),
        /* leadEn：正文首段的英文（来自 _leads.en.json）。页面渲染详情页顶部的
         * panel-lead 时用它；缺键时回退中文（可接受降级）。*/
        leadEn: LEADS_EN[id] || '',
        onelineEn: ONELINES_EN[id] || '',
        fit: section('适合与不适合'),
        fitEn: (FIT_EN[id] || ''),
        runs: section('实测记录'),
        unknowns: section('未知项清单'),
        related: section('相关条目'),
      },
      url: fm.link && fm.link.url,
      linkKind: fm.link && fm.link.kind,
    });
  }
  return { entries, errors };
}

// ── 校验 ─────────────────────────────────────────────────────────────────
function validate(partKey, entries, errors) {
  const errs = [...errors];
  const seen = new Set();
  for (const e of entries) {
    if (seen.has(e.id)) errs.push(`${partKey}/${e.id} · id 重复`);
    seen.add(e.id);
    if (!e.sec.oneline) errs.push(`${partKey}/${e.id} · 正文缺「一句话定位」`);
    if (!e.sec.fit) errs.push(`${partKey}/${e.id} · 正文缺「适合与不适合」`);
    if (!e.sec.runs) errs.push(`${partKey}/${e.id} · 正文缺「实测记录」`);
    if (!e.sec.unknowns) errs.push(`${partKey}/${e.id} · 正文缺「未知项清单」`);
    if (e.confidence === 'verified' && e.lifecycle !== 'active') {
      errs.push(`${partKey}/${e.id} · confidence=verified 但 lifecycle=${e.lifecycle}`);
    }
  }
  return errs;
}

// ── HTML 工具 ────────────────────────────────────────────────────────────
const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/* 双语节点（2026-10-04）。
 * agent 是静态站点：语言切换只切 <html lang> / data-lang，**DOM 不重渲染**
 * → 构建期不能判断语言，必须同时给出中英，由 brand.css 的 [data-lang] 选显。
 * 与 nav 同一套路；learn 是 JS 运行时渲染，用的是 IS_EN()，别混。 */
/* 分区引导英文（2026-10-04）。人工翻译（原文含判断与安全警告，不用机译）。
 * 路径要点：**用 HERE**（由 fileURLToPath(import.meta.url) 得到）——
 * 本文件是 ESM（.mjs），**__dirname 不存在**，用它会静默走 catch。
 * 英文文件路径见上方 I18N_DIR（已在本仓内，不再需要三级 ..）。
 * ⚠ 加载失败**抛错而不是 warn**：静默降级会让「英文页面全是中文」看起来像
 *   「翻译没做」，而真实原因是文件读不到 —— 这个 bug 藏了很久就是这么来的。*/
const GUIDE_EN_PATH = path.join(I18N_DIR, '_guide.en.json');
let GUIDE_EN = {};
try {
  GUIDE_EN = JSON.parse(fs.readFileSync(GUIDE_EN_PATH, 'utf8'));
} catch (e) {
  throw new Error('分区引导英文读不到：' + GUIDE_EN_PATH + ' —— ' + e.message);
}
console.log(`  · 分区引导英文：${Object.keys(GUIDE_EN).length} 个分区已加载`);

/* 11 个维度的英文（名称 + 提问）。同样**加载失败抛错** —— 维度名缺失会让
 * 表头露出中文，而页面照常生成。*/
const AXES_EN_PATH = path.join(I18N_DIR, '_axes.en.json');
let AXES_EN = {};
try {
  AXES_EN = JSON.parse(fs.readFileSync(AXES_EN_PATH, 'utf8'));
} catch (e) {
  throw new Error('维度英文读不到：' + AXES_EN_PATH + ' —— ' + e.message);
}
console.log(`  · 维度英文：${Object.keys(AXES_EN).length} 个维度已加载`);





// 保留 Markdown 里的 **加粗** 与 `代码`
function mdInline(s) {
  /* ⚠ **先把代码段挖出来保护**（2026-10-09 修，第 15 次「渲染器与内容谁该改」）。
   *   原写法是「先转加粗、后认反引号」✗ —— 加粗的正则先跑，反引号后认，
   *   于是**反引号里的两个星号已经被转成 strong** ✗，产出**非法嵌套**：
   *     `<code>~/projects/personal/<strong></code>`（`<code>` 里套 `<strong>`）。
   *   实测六个站产物共 **20 处**（continue / crush / cursor-cli / factory-droid / …），
   *   典型是命令行里的 glob 与参数。
   *
   *   ⚠ **第一版修法是错的，记在这里免得再犯**：我改成「按反引号 split 成段，奇数段当代码」✗ ——
   *   那会**切断跨代码段的加粗** ✗：`**由 `--map-tokens` 控制。**` 的两个星号落在不同段里，
   *   配对失败 → 页面上直接露出字面 `**` ✗（实测全站 **145 处** ✗）。
   *   正确做法是**占位符**：把代码段换成不会出现在正文里的私有区字符，
   *   让加粗正则看到**完整的一行**，替换完再把占位符换回 `<code>` ✓。
   *
   *   规程上这属于**渲染器的错**，不是内容的错 ✓ —— 按本站规矩「规则跟着渲染器走，
   *   先改渲染器而不是把内容绕开」✓，所以在这里修，不在文章里绕。
   *   ⚠ 写这条注释时注意：正文里不要出现「星号 + 斜杠」连着写，那会提前闭合块注释 ✗（我踩过两次）。 */
  const codes = [];
  const withPlaceholders = String(s ?? '').replace(/`([^`]+)`/g, (_, inner) => {
    codes.push(inner);
    return `\uE000${codes.length - 1}\uE001`;      // 私有区占位符，正文里不会自然出现
  });
  const rendered = esc(withPlaceholders)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/&gt;(.+?)&lt;/g, '<strong>$1</strong>');
  return rendered.replace(/\uE000(\d+)\uE001/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
}

/* 档案正文里的相对链接是按**内容仓**的目录关系写的，站点里没有这些目录，
 * 直接搬过去必然死链。渲染时按三种形态重写（前两种只有在一站三分区后
 * 才可能做对——原先四站各管一个目录，跨分区根本指不到）：
 *   ../../<track>/products/<id>.md  →  站内详情页 /<分区>/<id>.html（跨分区）
 *   ./<id>.md 或 <id>.md            →  同分区详情页 ./<id>.html（同分区互引）
 *   ../tasks/_protocol.md          →  内容仓 GitHub 链接（协议文档不是站点内容）
 * 前缀有 ../../ 和 ../ 两种写法（取决于链接发起方所在的赛道目录），正则不能只认一种。
 *
 * ⚠ A6.3（2026-10-09）修：原先 <track> 只认旧目录名 `ide|cli|harness|mcp`，
 * 而文件早已搬到 `tracks/{agents,harness,tools}`。后果是**两个方向都错**：
 *   · 新写 `../../tools/...`、`../../agents/...` 不匹配 → 原样输出成 `.md` 链接 → 站上 404；
 *   · 存量 `../../ide/...` 站上能跳（靠映射表），但**内容仓里那个路径不存在** → GitHub 上死链。
 * 现在两种写法都认，且存量链接已归一化成当前目录名（仓与站同时对）。
 */
const TRACK_TO_PART = {
  /* 当前目录名（v4 三站迁移后：tracks/{agents,harness,tools}）—— A6.3 起是新写链接的标准写法 */
  agents: 'agents', harness: 'harness', tools: 'tools',
  /* 旧目录名（迁移前 ide/cli 两站合并成 agents，mcp 降为 tools）—— 存量正文里还有，
   * 正则必须同时认；两种写法都要能重写到正确的分区落点。*/
  ide: 'agents', cli: 'agents', mcp: 'tools',
};
function rewriteInternal(href) {
  // 1. 跨分区：指向另一个赛道的档案
  let m = /^(?:\.\.\/)+(agents|harness|tools|ide|cli|mcp)\/products\/([A-Za-z0-9._-]+)\.md$/.exec(href);
  if (m) {
    const s = SITES[TRACK_TO_PART[m[1]]];
    return s.dir ? `/${s.dir}/${m[2]}.html` : `/${m[2]}.html`;
  }
  // 2. 同分区互引：./x.md 与裸 x.md 两种写法都见过
  m = /^(?:\.\/)?([A-Za-z0-9._-]+)\.md$/.exec(href);
  if (m) return `./${m[1]}.html`;
  // 3. 实测协议文档 —— 站内没有，链到内容仓
  m = /^(?:\.\.\/)+tasks\/(_protocol\.md)$/.exec(href);
  if (m) return `${SITE.repo}/blob/main/tracks/agents/tasks/${m[1]}`;
  /* ⚠ **分区索引 `_track.md`** 要映射到**站点自己的分区首页**（2026-10-09 补，修 3 条死链）。
   *   实测 `zed.html -> ../_track.md` 与 `-> ../../tools/_track.md` 是站上真死链 ✗ ——
   *   因为 `_track.md` 只存在于内容仓。但它的**语义目标**正是站上的分区列表页 ✓：
   *     `../_track.md`          → 当前分区首页（agents 是根 → `/index.html`）
   *     `../../tools/_track.md` → `/tools/index.html`
   *   所以这不是「外链到 GitHub」了事，而是把读者送到他真正想去的那一页 ✓。
   *   ⚠ 判据要**先**匹配带分区名的形态，再匹配裸 `_track.md` ——
   *   否则 `../../tools/_track.md` 会被后一条吃掉、当成当前分区 ✗。 */
  m = /^(?:\.\.\/)+([A-Za-z]+)\/_track\.md$/.exec(href);
  if (m && TRACK_TO_PART[m[1]]) {
    const s = SITES[TRACK_TO_PART[m[1]]];
    return s.dir ? `/${s.dir}/index.html` : '/index.html';
  }
  m = /^(?:\.\.\/)+_track\.md$/.exec(href);
  if (m) return '/index.html';
  /* `METHODOLOGY.md` 同样只在内容仓里（实测 `windsurf.html -> ../METHODOLOGY.md`）✗ → 链回内容仓 ✓。 */
  m = /^(?:\.\.\/)+METHODOLOGY\.md$/.exec(href);
  if (m) return `${SITE.repo}/blob/main/tracks/METHODOLOGY.md`;
  return href;
}

// 把段落里的 Markdown 链接转成 a（先转义再处理，避免注入）
function mdLinks(s, base = '') {
  let out = mdInline(s);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, rawHref) => {
    const href = rewriteInternal(rawHref);
    if (/^https?:/.test(href)) return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
    return `<a href="${href}">${text}</a>`;
  });
  return out;
}

function blockMd(s) {
    const out = [];
    let mode = null;                       // 'p' 段落 · 'ul' 清单 · 'bq' 引用块 · 'tbl' 表格
    let buf = [];                          // 当前块累积的行
    let items = [];                        // 清单项（每项是若干行的数组）
    let rows = [];                         // 表格行（原始 | 行）
    const flush = () => {
      if (mode === 'p' && buf.length) out.push(`<p>${mdLinks(buf.join(' '))}</p>`);
      else if (mode === 'bq' && buf.length) out.push(`<blockquote>${mdLinks(buf.join(' '))}</blockquote>`);
      else if (mode === 'ul' && items.length) {
        /* 清单项内的换行用空格接起来 —— 那是排版折行，不是新的一句。
         * 但**一行的正文折行**同理，所以段落也是 join(' ')。*/
        out.push(`<ul>${items.map((it) => `<li>${mdLinks(it.join(' '))}</li>`).join('')}</ul>`);
      }
      else if (mode === 'tbl' && rows.length) {
        /* ⚠ **markdown 表格**（2026-10-09 加）。
         *   起因：48 篇文章的正文里有 markdown 表格（主要是「实测记录」），
         *   而渲染路径只走 `mdLinks()`（行内）→ 表格在页面上变成
         *   「| # | 测什么 | 为什么值得测 | |:--:|---|---| | 1 | …」**一整行竖线文本** ✗。
         *   实测 agent 站 **23 页 / 143 处**表格流（www / learn / nav 都是 0 ✓）。
         *   规则：第一个 `|` 行是表头；形如 `|---|:--:|` 的**分隔行**丢掉（它只定义对齐）；
         *   其余每行一格。不做对齐方式解析（`<td>` 默认左对齐，够用）。 */
        const cells = (r) => r.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
        const sep = /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(rows[1] || '') && /-/.test(rows[1] || '');
        const head = cells(rows[0]);
        const bodyRows = rows.slice(sep ? 2 : 1);
        /* ⚠ 表格要包一层**可横向滚动的容器**（2026-10-09 补，修 `responsive-overflow` 的 3 处失败）。
         *   门禁实测 `grok-bot.html` 在 320 / 375 / 390px 下页面宽度被撑到 402–405 ✗，
         *   越界元素就是 `TABLE` / `THEAD` / `TR` ✓ —— 宽表格在窄屏上把**整页**顶出横向滚动条 ✗。
         *   这是**渲染层的错**（表格天生会宽 ✓，不该让读者为它横滚整页 ✓），
         *   所以在这里包容器 + 在 site.css 里给它 `overflow-x:auto` ✓ ——
         *   表格在**自己的框里**滚，页面不动 ✓。 */
        out.push('<div class="tbl-wrap"><table><thead><tr>' + head.map((h) => `<th>${mdLinks(h)}</th>`).join('') + '</tr></thead><tbody>'
          + bodyRows.map((r) => '<tr>' + cells(r).map((c) => `<td>${mdLinks(c)}</td>`).join('') + '</tr>').join('')
          + '</tbody></table></div>');
      }
      mode = null; buf = []; items = []; rows = [];
    };
    for (const line of String(s || '').split('\n')) {
      const t = line.trim();
      if (!t) { flush(); continue; }                     // 空行 = 块边界
      const isLi = /^[-*]\s+/.test(t);
      const isBq = /^>\s?/.test(t);
      /* ⚠ **小标题**（`### …` / `#### …`）必须渲染成标题（2026-10-09 加）。
       *   正文按 `## ` 切小节之后，节**内部**还能有 `###` / `####` ——
       *   而 `blockMd` 原先不认它们 ✗，于是它们掉进 `p` 分支、变成**字面文本**：
       *   页面上直接显示 `<p>### 记忆是明文的…</p>` ✗。实测 **15 页 / 33 处**。
       *   这是「探针读源文件 ≠ 读者看页面」的第 14 次 ✓（源文件里是标题、页面里是井号）。 */
      if (/^#{3,4}\s+\S/.test(t)) {
        flush();
        const lvl = t.startsWith('####') ? 4 : 3;
        const text = t.replace(/^#{3,4}\s+/, '').replace(/\s*#+\s*$/, '');
        out.push(`<h${lvl} class="sub-h">${mdLinks(text)}</h${lvl}>`);
        continue;
      }
      /* ⚠ **清单项的续行**（2026-10-09 修，第二次）。
       *   折叠标量里段落分隔**必须**有空行；没有空行就说明「还在同一段里」。
       *   所以：正在渲染 `<ul>`、而本行既不是新清单项也不是引用块 → 它是上一项的后半段 ✓。
       *
       *   旧写法只认「上一项最后一行以 `、` `/` `·` 收尾」✗ —— 判据太窄，
       *   于是**以句号 / 引号 / 括号收尾的续行被甩出 `<ul>`，变成独立 `<p>`** ✗，
       *   清单结构在页面上碎掉。实测 `openai-agents-sdk` 的 `axes.model_access` 就中招：
       *   「与 `any-llm`（…）」「（示例 `MultiProvider…`）」三行全变成独立段落。
       *   **而 7 项检查全绿** —— 因为没有任何一项验渲染产物（见 _audit/structure-fidelity.mjs）。 */
      const isTbl = /^\|/.test(t);
      /* 表格里的续行统一按「行」处理，不做续行合并 */
      if (isTbl) { if (mode !== 'tbl') flush(); mode = 'tbl'; rows.push(t); continue; }
      const isListCont = mode === 'ul' && !isLi && !isBq && items.length > 0;
      if (isListCont) { items[items.length - 1].push(t); continue; }
      const next = isLi ? 'ul' : isBq ? 'bq' : 'p';
      if (next === 'ul') {
        if (mode !== 'ul') flush();
        mode = 'ul';
        items.push([t.replace(/^[-*]\s+/, '')]);
      } else {
        if (mode !== next) flush();
        mode = next;
        buf.push(t.replace(/^>\s?/, ''));
      }
    }
    flush();
    return out.join('\n            ');
}

function renderList(items, cls = '') {
  if (!items || !items.length) return '';
  return `<ul class="${cls}">${items.map(i => `<li>${mdInline(i)}</li>`).join('')}</ul>`;
}

// ── 「从这里开始」引导区 ─────────────────────────────────────────────
// 为什么要它：访客落地后第一眼看到的是一张 8~11 行的密集表格，
// 没有任何「我该从哪看起」的指引 —— 数据再准，读者不知道用途就等于没用。
// 每站回答该赛道客户最关心的那个问题，并给出明确的下一跳。
// 分赛道写，因为「客户来这个站要解决什么」本来就不同。
const GUIDE = {
  /* agents 分区的引导由原ide + cli 两份合并而成。
   * 合并的关键：**分类轴从「形态」换成「你要它替你干多少事」**——
   * 原来 ide 站按形态分、cli 站按权限确认粒度分，两套轴放在一个站里会打架。
   * 新轴的好处：IDE 形态与 CLI 形态都能落进去，且回答的是访客真正在问的问题。 */
  agents: {
    title: '先回答一件事：你要它替你干多少事',
    lede: '这一分区 27 份档案，<strong>分三个方向</strong>：23 份是装在自己机器上的（IDE 形态 11 + CLI 形态 12，其中<strong>五组是同一个产品的两种装法</strong>——Aider、Claude Code、Codex、Copilot、Cursor 各有一份 IDE 形态和一份 CLI 形态，它们不是竞品，差别在<strong>装在哪、怎么被唤起、能不能塞进脚本</strong>）；另 4 份是<strong>厂商云形态</strong>——本机什么都不装，工作在别人的机器上做。',
    steps: [
      ['我要一个自己能开的编辑器', '看 <strong>IDE · 独立编辑器</strong>', 'Cursor、已改称 Devin Desktop 的 Windsurf、Zed、AWS 的 Kiro 都在这一类。'],
      ['我已经在用 VS Code / Cursor 了', '看 <strong>IDE · 扩展形态</strong>', 'Claude Code、Codex、Copilot、Cline、JetBrains 的 Junie、Continue 都是在既有编辑器里装。注意其中 <strong>Claude Code / Codex / Copilot 另有 CLI 形态</strong>，别当成两个产品比。'],
      ['我不想换编辑器，也不想装插件', '看 Aider（Watch 模式）', '它不是编辑器插件而是后台常驻进程，你在任意编辑器里加 AI 注释它就响应。'],
      ['我要它每一步都问我', '看<strong>默认逐次确认</strong>的那几个 CLI', 'Crush 默认每次工具调用都问；Aider 有自动提交但沙箱机制未核验。'],
      ['我要它在指定范围内自己跑', '看<strong>有明确沙箱 / 可信目录</strong>的那几个', 'Gemini CLI 的沙箱与 Trusted Folders 都有独立官方文档；Claude Code CLI 的权限粒度最细，还有「允许这一次」。'],
      ['我要它能塞进 CI / 脚本里跑', '<strong>有一整批有官方证据的落点</strong>', 'Gemini CLI、Codex CLI 之外，2026-10 收录的一批也都给了非交互文档：Cursor CLI（headless）、Copilot CLI（<code>-p</code>）、Continue（<code>cn -p</code>）、goose（<code>goose run</code>）、Droid（<code>droid exec</code>）、Kiro CLI（<code>--no-interactive</code>）。'],
      ['我要<strong>关掉客户端后它还在干活</strong>', '主看<strong>厂商云形态那 4 份</strong>', '那一层是「整台机器都在云上」：Dot / Muse / Grok Bot / Jules，差别在<strong>审批与异步流程怎么设计</strong>——Muse 有独立的 Sentinel agent，Dot 是自动审核，Grok Bot 官方页<strong>没写</strong>，Jules 以「批准计划」为节点（API 可跳过）。本地形态里也有一批给<strong>特定任务</strong>提供云端执行（Cursor 的云端 Agent、Kiro 的 Cloud Session、Amp 的 orb、Copilot 的 coding agent），所以「关机后能不能跑」要按对象的 <code>background</code> 维度逐个看，别按形态一刀切。'],
      ['我要数据完全不离开本机', '<strong>这一层也没有合适的</strong>', '厂商云形态的机器在别人那里（Dot 默认与本机隔离、授权后才碰）；本地形态里只有 sandbox / 可信目录那一档能限制写入范围。'],
    ],
    foot: '⚠ 两个最容易踩的误解：<strong>「AI 原生编辑器」不等于「模型可自选」</strong>——形态看 <code>runtime</code>，模型接入看 <code>model_access</code>，两个维度是分开的；<strong>Codex CLI 的审批模式与沙箱档位在 CLI 文档里查不到，在它 SDK 的源码里有</strong>——四种审批 × 三档沙箱（read-only / workspace-write / danger-full-access），还能按路径 deny 掉读 <code>.env</code>，跨平台差异仍未核验。',
  },
  tools: {
    title: '先回答一件事：你到底缺什么能力',
    lede: 'MCP 不是「让 AI 更聪明」，是<strong>给 AI 接上它本来够不到的东西</strong>。如果你要的只是聊天和写代码，你不需要它。<strong>你装，它调</strong>——10 个条目：7 个是 MCP 官方 reference server，2 个由各自的官方团队维护（Playwright / Context7），1 个是厂商官方（GitHub 自己的 github-mcp-server）。',
    steps: [
      ['我要读写本地文件 / 操作 Git', 'filesystem、git', '两个都是读写权限，git 那一类值得先看 scope 里能限制到哪些目录。'],
      ['我要它记住东西、跨会话召回', 'memory', '这是最容易被误解的一类——<strong>它不是「模型记忆」</strong>，是外部知识图谱存储。'],
      ['我要让 AI 上网拿资料', 'context7、fetch', '风险最高的一类是 fetch：档案里引了官方警告——<strong>可访问本地与内网 IP，无地址白名单、无审批机制</strong>。'],
      ['我要控制真实浏览器', 'playwright', '注意官方<strong>明确声明来源限制不是安全边界</strong>，需要真隔离得用 <code>--isolated</code> 或容器化网络策略。'],
      ['我要点时间 / 拆解推理 / 跨平台搜文件', 'time、sequential-thinking、everything', '三个都是只读，风险最低。'],
      ['我要操作 GitHub（仓库 / Issue / PR / Actions）', '看 <strong>github-mcp</strong>', 'GitHub 官方自营的 MCP server，与归档的旧参考 server 不是同一条线；权限由 GitHub token 决定，可收紧到只读。'],
    ],
    foot: '⚠ 一个容易忽略的维度：<strong>数据出境</strong>。Context7 默认以远程服务交付，查询内容会发到 Upstash 服务器；GitHub MCP Server 提供远程托管与本地 Docker 两种形态；其余八个都是本地 stdio 进程。另外——<strong>装 MCP 需要你手动做，调用不需要</strong>：server 启动后自动把工具清单报给你的客户端，之后调不调、什么时候调，由 agent 自己判断，你只在审批环节介入。',
  },
  harness: {
    title: '先回答一件事：你要不要自己搭',
    lede: '这是本分区存在的唯一理由。<strong>如果现成产品已经够用，正确答案是「不要搭」</strong>——那就去 <a href="/">成品 Agent</a>，不用往下看。真要自己搭，第一步是认清你要的抽象层。',
    steps: [
      ['我要最细的控制权，文件系统我自己管', '<strong>原语型</strong>（primitives-only）', '只给你 agent loop 的原语，不替你决定文件系统 / 规划 / 记忆怎么做 —— OpenAI Agents SDK 是这一类。'],
      ['我要一个成熟 CLI 直接变成 API 对象', '<strong>包装既有 CLI</strong>', 'Claude Agent SDK 捆绑完整 CLI，默认给全工具无沙箱 —— 你省了造轮子，但权限模型是继承来的。'],
      ['我要开箱即跑的通用长任务助手', '<strong>batteries-included</strong>', 'Deep Agents 官方自述 opinionated：预置更多东西，也替你做了更多决定。'],
      ['流程要图、要能中断恢复、要多 Agent 协作', '<strong>编排框架</strong>：LangGraph / Google ADK / CrewAI', 'LangGraph 的落盘粒度最明确（每 superstep 存一次图状态），ADK 的图执行引擎最完整，CrewAI 用「角色分工 + 事件流程」两套抽象。'],
      ['我要它常驻、跨平台、能定时跑', '<strong>平台型 / 常驻型</strong>：OpenHands / Hermes Agent', 'OpenHands 是带 Web UI 的自托管控制中心；Hermes 更进一步——能挂 Telegram/Discord/Slack/WhatsApp/Signal/Email 六平台，还能 cron 无人值守。'],
      ['我只想要个工具用，不想维护', '不该来这个分区', '这属于「不自建」那一侧，见 <a href="/">成品 Agent</a>。'],
    ],
    foot: '⚠ 三个最容易踩的坑：<strong>「状态」和「上下文」不是一回事</strong>——压缩上下文会丢信息，状态持久化才是长期可靠运行的前提（各家在这两层的完备程度差别很大）；<strong>「provider 无关」不等于「本地模型可用」</strong>（Claude Agent SDK 只支持 Claude，CrewAI 则点名支持 Ollama）；<strong>编排框架不给沙箱</strong>——权限边界要自己确认。',
  },
};

/* S44（2026-10-20）边界声明三句（D4 定案：「这里收录能接任务、能装、能连你数据的产品」）。
 * 设计定案：
 *  - 三张分区索引页**同一份文案**（不各写一套 —— 本项目头号疾病是同一件事两个口径）。
 *  - 三句各答一个问题：收什么 / 不收什么（纯对话问答去哪）/ 用什么格式。
 *  - 措辞诚实：对话问答的「轻档案」是 S46 的活，**现在还不存在**，
 *    所以只说「去 AI 导航」这条现在就能兑现的路，不承诺本站已有。
 *    S46 更新（2026-10-20）：本站轻档案已落地 → 第二句补上「本页上方的三要素轻档案」，
 *  - 版式走 brand.css 的 .t-boundary（宪章 1）。 */
function boundarySection(partKey) {
  /* 第二句按分区分口径（S46 · 2026-10-20）：
   * agents 页下方真的渲染对话问答轻档案 → 指本站；
   * harness / tools 页不渲染对话轻档案 → 只指 AI 导航（可兑现才写）。 */
  const chatLine = partKey === 'agents'
    ? [
        '<strong>纯聊天工具不走八维坐标系。</strong>它们没有「安装形态 / 工具清单」这些维度，硬套只会产出一堆「不适用」——本站给它们的是本页下方的三要素轻档案；更全的对话产品目录在 <a href="https://nav.specul.com/">AI 导航</a>。',
        '<strong>Plain chat products are not on the 8-axis grid.</strong> They lack dimensions like install form or tool inventory, and forcing them would produce a wall of "not applicable" — this site covers them with the three-essentials light entries below; a fuller directory of chat products lives in the <a href="https://nav.specul.com/">AI Directory</a>.',
      ]
    : [
        '<strong>纯聊天工具不在这里。</strong>如果你只想找一个对话问答的网页，去 <a href="https://nav.specul.com/">AI 导航</a>，ChatGPT、豆包、Kimi 这些都在那里。',
        '<strong>Plain chat products are not here.</strong> If you just want a chat webpage, go to the <a href="https://nav.specul.com/">AI Directory</a> — ChatGPT, Doubao and Kimi are listed there.',
      ];
  const LINES = [
    [
      '<strong>这里收录能接任务的产品。</strong>它要么在编辑器或终端里替你写代码，要么能被你装进自己的程序，要么能连上你的文件和账号。',
      '<strong>This site lists products that take on tasks.</strong> They either write code for you in your editor or terminal, or can be installed into your own program, or connect to your files and accounts.',
    ],
    chatLine,
    [
      '<strong>每条档案都是核验快照。</strong>字段逐条挂官方出处与核验日期，本站不实测、不排名，未知就写未知。',
      '<strong>Every entry is a verification snapshot.</strong> Each field carries an official source and a checked date; we run no benchmarks, publish no rankings, and write "unknown" when it is unknown.',
    ],
  ];
  return `    <section class="section">
      <div class="container">
        <div class="t-boundary">
          <ol>
${LINES.map(([zh, en]) => `            <li>${bi(zh, en)}</li>`).join('\n')}
          </ol>
        </div>
      </div>
    </section>
`;
}

/* S43（2026-10-19）任务化入口：「我想让 AI 替我写代码 / 自己搭 agent / …」。
 * 设计定案：
 *  - 任务卡渲染在**各分区索引页**，只列「本页至少有一份该任务档案」的任务 ——
 *    跨页任务（如 long-task 同时有 agents 的 cloud 与 harness 的 general-harness）
 *    在两页各出现一次，各自显示本页的条数。点卡 = 本页按 ?task= 现筛（复用 B2 的
 *    URL 筛选体系，不另造一套）。这样卡片上的每个数字都是本页可兑现的，
 *    不会出现「写着 7 个、点进去只有 3 个」的假承诺。
 *  - 条数从 entries 现算（R4）。validate.mjs 双向对账保证任务不空、引用不悬空。
 *  - 版式走 brand.css 的 .t-taskcard（宪章 1：共享层定义一次）。 */
function taskSection(partKey, site, entries) {
  const cards = [];
  for (const t of TASKS) {
    const n = entries.filter((e) => (e.tasks || []).includes(t.id)).length;
    if (!n) continue;
    cards.push(`        <article class="t-taskcard">
          <h3><a href="./?task=${encodeURIComponent(t.id)}">${bi(esc(t.zh), esc(t.en))}</a> <span class="t-taskn">${n}</span></h3>
          <p class="t-tasklead">${bi(esc(t.lead), esc(t.leadEn))}</p>
          <a class="t-taskgo" href="./?task=${encodeURIComponent(t.id)}">${bi('只看这一类 →', 'Show only these →')}</a>
        </article>`);
  }
  if (!cards.length) return '';
  return `
    <section class="section">
      <div class="container">
        <h2>${bi('按任务找', 'Find by task')}</h2>
        <p class="section-desc">${bi(`这一页有 ${entries.length} 个对象。下面的数字是本页真正收录的条数——点进去就是筛选后的结果，不是跨站的总数。`, `This page holds ${entries.length} objects. The numbers below are what this page actually carries — clicking filters right here, not a site-wide total.`)}</p>
        <div class="grid">
${cards.join('\n')}
        </div>
      </div>
    </section>`;
}

/* S45（2026-10-20）轻档案区（D4 定案：对话问答 / 创作工具走三要素卡，不上八维）。
 * 设计定案：
 *  - 真相源 light/light.json（SCHEMA §9.2 校验：三要素任一空 / 出现 cost 字段 /
 *    sources 空 / kind 越枚举都硬失败）。validate 阴性对照实测：注入坏条目必报错。
 *  - D9（2026-10-20 用户定案）：价格不进数据层——卡上「多少钱」一行只放
 *    pricing_url（缺省回落 homepage）的官方定价页链接，本站不存报价数字。
 *  - 版式走 brand.css 的 .t-lightcard（宪章 1）。
 *  - items 为空时整区不渲染（S46/S47 填条目后自动出现）——
 *    不渲染空壳区，也不提前承诺「本站有轻档案」。
 *  - 每张卡带「轻档案 · 不上八维」标注：防读者拿它和八维档案横向比。 */
const LIGHT = (() => {
  const p = path.join(HERE, '..', 'light', 'light.json');
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf8')).items || [];
})();
const LIGHT_KIND = {
  chat: ['对话问答', 'Chat products'],
  /* 区名对齐总纲 §1.7「陪你创作」区（S47） */
  creation: ['陪你创作', 'Create with AI'],
};
function lightSection(partKey) {
  /* 落点（总纲 §1.4 落点表 + D4）：对话问答 → agents 分区（成品那一侧，
   * 读者搜 ChatGPT 进来不能看不到）；创作工具 → tools 分区（「陪你创作」区）。
   * harness 分区不渲染 —— 它是「自己搭」，与两类轻档案都不同层。 */
  const want = partKey === 'agents' ? 'chat' : partKey === 'tools' ? 'creation' : null;
  if (!want) return '';
  const items = LIGHT.filter((it) => it.kind === want);
  if (!items.length) return '';
  const kindLabel = want === 'chat' ? LIGHT_KIND.chat : LIGHT_KIND.creation;
  const cards = items.map((it) => `        <article class="t-lightcard">
          <h3><a href="${esc(it.homepage)}" rel="noopener">${bi(esc(it.name), esc(it.nameEn || it.name))}</a></h3>
          <p class="t-lightvendor">${esc(it.vendor)} · ${bi('轻档案 · 不上八维', 'light entry · not on the 8-axis grid')}</p>
          ${it.cn ? `<p class="m-famcard-cn">${cnChips(it.cn)}</p>` : ''}
          <dl>
            <dt>${bi('能做什么', 'What it does')}</dt><dd>${bi(esc(it.what), esc(it.whatEn || it.what))}</dd>
            <dt>${bi('数据去哪', 'Where your data goes')}</dt><dd>${bi(esc(it.data), esc(it.dataEn || it.data))}</dd>
            <dt>${bi('适合谁', 'Who it suits')}</dt><dd>${bi(esc(it.who), esc(it.whoEn || it.who))}</dd>
            ${it.license ? `<dt>${bi('商用许可', 'Commercial use')}</dt><dd>${bi(esc(it.license), esc(it.licenseEn || it.license))}</dd>` : ''}
          </dl>
          <p class="t-lightnote">${bi(`多少钱：价格常变，本站不存报价，请看 <a href="${esc(it.pricing_url || it.homepage)}" rel="noopener">官方定价页</a>。`, `Price: prices change often; this site stores no quotes — see the <a href="${esc(it.pricing_url || it.homepage)}" rel="noopener">official pricing page</a>.`)}</p>
          <p class="t-lightsrc">${bi(`出处：${(it.sources || []).length} 条官方链接 · 核验 ${esc(it.last_verified || '未标注')} · ${esc(it.confidence)}`, `Sources: ${(it.sources || []).length} official links · checked ${esc(it.last_verified || 'n/a')} · ${esc(it.confidence)}`)}</p>
        </article>`);
  return `
    <section class="section">
      <div class="container">
        <h2>${bi(kindLabel[0], kindLabel[1])}</h2>
        <p class="section-desc">${want === 'creation'
          ? bi('这些工具不走八维坐标系——它们没有「安装形态 / 工具清单」这些维度，硬套只会产出一堆「不适用」。创作工具真正可比的是「能做什么 / 数据去哪 / 适合谁 / 输出物能不能商用」；<strong>商用许可逐条抄官方条款</strong>（许可稳定，值得存），价格常变，本站不存报价，一律看官方定价页。', 'These tools are not on the 8-axis grid — they lack dimensions like install form or tool inventory, and forcing them would produce a wall of "not applicable". What is genuinely comparable for creation tools is what they do, where your inputs go, who they suit, and whether the output may be used commercially. <strong>Commercial licensing is quoted line by line from the official terms</strong> (licences are stable, worth storing); prices change often, so this site stores no quotes and always points to the official pricing page.')
          : bi('这些产品不走八维坐标系——它们没有「安装形态 / 工具清单」这些维度，硬套只会产出一堆「不适用」。三要素是它们真正可比的地方；价格常变，本站不存报价，一律看官方定价页。', 'These products are not on the 8-axis grid — they lack dimensions like install form or tool inventory, and forcing them would produce a wall of "not applicable". The three essentials are where they are genuinely comparable; prices change often, so this site stores no quotes and always points to the official pricing page.')}
        </p>
        <div class="grid">
${cards.join('\n')}
        </div>
      </div>
    </section>`;
}

function guideSection(partKey, site, entries) {
  const g = GUIDE[partKey];
  if (!g) return '';
  /* 英文版（2026-10-04）。缺键时 gEn 为空对象 → 回退中文。
   * ⚠ steps 是数组，英文版可能条数不同（不该发生，但要防御）——
   *   长度不一致时按中文的长度取英文，越界则退中文项。*/
  const gEn = GUIDE_EN[partKey] || {};
  const steps = g.steps.map((s, i) => {
    const en = (gEn.steps && gEn.steps[i]) || s;
    return [
      bi(s[0], en[0]),
      bi(s[1], en[1]),
      bi(s[2], en[2]),
    ];
  });
  return `
    <section class="section guide-band">
      <div class="container">
        <h2>${bi(g.title, gEn.title || g.title)}</h2>
        <p class="section-desc">${bi(g.lede, gEn.lede || g.lede)}</p>
        <ol class="guide-list">
${steps
  .map(
    ([when, what, why], i) => `          <li class="guide-step">
            <div class="guide-q"><span class="guide-n">${i + 1}</span>${when}</div>
            <div class="guide-a"><strong>${what}</strong><span class="guide-why">${why}</span></div>
          </li>`,
  )
  .join('\n')}
        </ol>
        <p class="guide-foot">${bi(g.foot, gEn.foot || g.foot)}</p>
      </div>
    </section>`;
}

/* ── S48 深水指南（guides/*.md · SCHEMA §十 · 2026-10-20）──────────────
 * 方法论内容（编排/记忆/规划/评测/成本/护栏），不是产品档案——
 * 真相源在 guides/（不在 tracks/，档案扫描只认 products/）。
 * 落点：tools 分区「深水指南」区 + guides/<id>.html 详情页。
 * guides 为空时整区不渲染（不造空壳，同 lightSection 口径）。 */
const TOPIC_LABEL = {
  orchestration: ['多 agent 编排', 'Multi-agent orchestration'],
  memory:        ['记忆系统', 'Agent memory'],
  planning:      ['规划', 'Planning'],
  evaluation:    ['评测', 'Evaluation'],
  cost:          ['成本控制', 'Cost control'],
  guardrails:    ['护栏与安全', 'Guardrails & safety'],
};

function loadGuides() {
  const dir = path.join(DATA, 'guides');
  if (!fs.existsSync(dir)) return [];
  const guides = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = parseFrontmatter(text);
    if (!fm) continue; // validate.mjs 会报「缺 frontmatter」，这里不重复报错
    const body = bodyAfter(text);
    /* 正文按 `## ` 切节：`## 标题` 行本身进 HTML（双语靠 `## [中文|English]` 写法），
     * 节正文走 blockMd（段落/清单/引用/表格/### 小标题全认）。 */
    const sections = [];
    let cur = null;
    for (const line of body.split('\n')) {
      const m = line.match(/^##\s+(.*)$/);
      if (m) { cur = { head: m[1].trim(), lines: [] }; sections.push(cur); continue; }
      if (cur) cur.lines.push(line);
    }
    guides.push({
      id: fm.id, topic: fm.topic,
      title: fm.title || '', titleEn: fm.titleEn || fm.title || '',
      summary: fm.summary || '', summaryEn: fm.summaryEn || fm.summary || '',
      /* sources 走 yaml.mjs 的 parseSources（与档案/validate 同一正则口径：
       * 对象数组每项是 label / url / kind 三行，parseFrontmatter 不解析对象数组）。
       * ⚠ 注释里不要出现 sources 正则的指纹字样——yaml-single-source 门禁按
       * 全文指纹计数，注释引用也算一份副本（2026-10-20 踩过）。 */
      sources: parseSources(text),
      lastVerified: fm.last_verified || '', confidence: fm.confidence || '',
      sections,
    });
  }
  return guides;
}

function deepGuidesSection(partKey, guides) {
  if (partKey !== 'tools' || !guides.length) return '';
  const cards = guides.map((g) => {
    const t = TOPIC_LABEL[g.topic] || [g.topic, g.topic];
    return `          <a class="t-guidecard" href="guides/${g.id}.html">
            <span class="t-guidespan">${bi(t[0], t[1])}</span>
            <h3>${bi(esc(g.title), esc(g.titleEn))}</h3>
            <p class="t-guidelead">${bi(esc(g.summary), esc(g.summaryEn))}</p>
          </a>`;
  }).join('\n');
  return `
    <section class="section">
      <div class="container">
        <h2>${bi('深水指南', 'Deep guides')}</h2>
        <p class="section-desc">${bi('产品档案回答「这个工具是什么」；深水指南回答「这类工程问题怎么办」。六篇各管一件事：编排、记忆、规划、评测、成本、护栏——讲机制与取舍，不做框架排名。每篇的关键事实都挂官方文档或论文出处。', 'Product entries answer "what is this tool"; the deep guides answer "how do you handle this class of engineering problem". Six guides, one topic each — orchestration, memory, planning, evaluation, cost, guardrails — covering mechanisms and trade-offs, with no framework rankings. Every key fact carries an official-doc or paper source.')}</p>
        <div class="grid">
${cards}
        </div>
      </div>
    </section>`;
}

function renderGuidePage(g, site) {
  const t = TOPIC_LABEL[g.topic] || [g.topic, g.topic];
  const secs = g.sections.map((s) => {
    /* 双语节标题写法：`## [中文标题|English heading]` → 渲染成 bi 双节点 */
    const bm = s.head.match(/^\[(.+)\|(.+)\]$/);
    const head = bm ? bi(esc(bm[1]), esc(bm[2])) : mdLinks(s.head);
    return `      <div class="panel is-slim">
        <h2>${head}</h2>
        ${blockMd(s.lines.join('\n'))}
      </div>`;
  }).join('\n');
  const srcRows = g.sources.map((s) => `          <tr><td>${mdLinks(s.label || '')}</td><td><a href="${s.url}" target="_blank" rel="noopener">${esc(s.url)}</a></td></tr>`).join('\n');
  const body = `    <div class="container detail">
      <a class="back" href="../">← ${esc('深水指南')}</a>
      <div class="detail-head">
        <div>
          <h1>${bi(esc(g.title), esc(g.titleEn))}</h1>
          <div class="vendor is-caps">${bi(t[0], t[1])}</div>
        </div>
      </div>
      <div class="panel-lead">${bi(blockMd(g.summary), blockMd(g.summaryEn))}</div>
${secs}
      <div class="panel is-slim">
        <h2>${bi('出处', 'Sources')}</h2>
        <div class="tbl-wrap"><table><thead><tr><th>${bi('来源', 'Source')}</th><th>${bi('链接', 'URL')}</th></tr></thead><tbody>
${srcRows}
        </tbody></table></div>
        <p class="guide-foot">${bi(`核验快照：${g.lastVerified} · 本站不实测、不排名，未知就写未知。`, `Verification snapshot: ${g.lastVerified} · no benchmarks, no rankings — unknown stays unknown.`)}</p>
      </div>
    </div>`;
  return buildShell({
    current: site.navKey,
    repo: SITE.repo,
    title: `${g.titleEn || g.title} — 深水指南 | 投机取巧`,
    desc: metaDesc(plain(`${g.title}：${g.summary}`)),
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.titleEn || g.title,
      description: plain(g.summaryEn || g.summary, 300),
      dateModified: g.lastVerified,
    },
    canonical: `https://${SITE.domain}/tools/guides/${g.id}.html`,
    /* ⚠ assetPrefix 是 **两级**：guide 详情页落在 /tools/guides/<id>.html，
     * 比 tools/ 下的档案页深一层 —— '../' 会指向 /tools/ 这个不存在 brand.css 的
     * 目录（2026-10-20 deadlink 实测抓到：6 页全部 poster 404 样式全掉）。
     * shell 的 depth() 只做透传，深度由调用方按页面实际层级传。 */
    assetPrefix: '../../',
  });
}

// header / footer / page 骨架统一由 shell.mjs 提供（全站唯一真相源）。
// 品牌名、品牌英文名、导航项全部在 shell.mjs 里，本文件**不再重复定义**——
// 之前这里有一份 BRAND_ZH / BRAND_EN 副本，其中 BRAND_EN 还停留在旧的
// 「Speculation · Craft」，与shell.mjs 的「Speculative Speculation」分叉。
// 已删除：品牌文案有两份定义就一定会漂移。

// 内容层样式已抽到 site.css（与 brand.css 分开：前者是站点特有结构，后者是全站设计系统）
// 见 _template/site.css —— 那里用 var(--brand)/var(--accent)/var(--fs-*) 引用 brand.css 的 token
const SITE_CSS = '';

// ── 渲染 ─────────────────────────────────────────────────────────────────
// 站内分区导航
// 三分区在一站之内，跨站导航（shell.mjs 的 NAV）只解决「去别的站」，
// 这里解决「在本站换层」。两条导航各管一件事，不要合并。
//
// **链接必须用绝对路径**（/harness/）：分区首页分布在不同深度
// （agents 在根、harness/ 与 tools/ 在子目录），相对路径在子目录页面上会指错。
function partitionBar(current) {
  return `    <nav class="part-bar" aria-label="站内分区">
      <div class="container">
${SITE.partitions.map(k => {
    const s = SITES[k];
    const cur = k === current ? ' aria-current="page"' : '';
    /* tagline 已是 bi() 产出的双节点（<span data-zh>/<span data-en>），
     * **不能走 esc** —— 转义会把标签变成字面文本，实测英文态显示
     * 「<span data-zh>装在编辑器…</span>」这种源码。 */
    return `        <a href="/${pfx(s)}"${cur} style="--pa:var(--pa-${s.key})"><b>${esc(s.short)}</b><span>${s.tagline}</span></a>`;
  }).join('\n')}
      </div>
    </nav>`;
}

// 分区路径前缀：agents 分区落在站点根（''），其余为 'harness/'、'tools/'
function pfx(site) { return site.dir ? site.dir + '/' : ''; }

// 横向表里的「形态」列：agents 分区用 track 值，harness 用 family 值，tools 无形态概念
/* 形态与家族标签（2026-10-04 改双语）。
 * 英文态实测露出「CLI 形态」等中文（19 处）。agent 是静态站点
 * → 用 bi() 输出双节点，不要在构建期判断语言。*/
const FORM_LABEL = {
  ide:   ['IDE 形态', 'IDE form'],
  cli:   ['CLI 形态', 'CLI form'],
  cloud: ['厂商云形态', 'Vendor cloud'],
  mcp:   ['MCP', 'MCP'],
};
const FAMILY_SHORT = {
  'coding-base':     ['编程底座', 'Coding base'],
  orchestration:    ['编排框架', 'Orchestration'],
  'general-harness': ['通用 Harness', 'General harness'],
};

function renderIndex(site, partKey, entries) {
  const base = pfx(site);
  const isTools = site.owns.includes('mcp');
  const axisKeys = isTools ? [...AXES, ...MCP_AXES] : AXES;
  const axisNames = axisKeys.map(x => x[1]);
  /* 英文句子里的维度名也要英文 —— 原先直接插 axisNames（中文），
   * 于是 tools 分区那句英文说明里嵌了一串「模型与开放条件 / 运行位置 / …」。*/
  const axisNamesEn = axisKeys.map(x => (AXES_EN[x[0]] || {}).name || x[1]);
  const verified = entries.filter(e => e.confidence === 'verified').length;
  // 「最后核验日」从数据算出，不能硬编码 —— 硬编码会在每次核验后变成过期信息
  const latestVerified = entries
    .map(e => e.lastVerified)
    .filter(Boolean)
    .sort()
    .pop() || '未标注';

  // 卡片信息刻意精简：标识 + 名称/厂商 + 一句定位 + 状态 + 入口。
  // 原设计有 tagline / summary / 标签 / 状态 / 链接 五块，视觉上糊成一片；
  // 标签信息价值低（详情页有完整标签），首页不需要重复。
  const cardFor = (e) => {
    /* 定位句（.tagline）—— 2026-10-04 接英文。
     * 用 bi() 输出双语节点而不是构建期选值：agent 是静态站点，
     * 语言切换只切<html lang>，DOM 不重渲染。
     * 截断沿用 plain() 的 62 字上限，中英同限。*/
    const lineRaw = e.tagline || e.sec.oneline || '';
    const line = bi(plain(lineRaw, 62), plain(e.sec.onelineEn || lineRaw, 62));
    /* B2（2026-10-09）：筛选/排序需要的属性。
     *  - data-track / data-family 分别落两个属性（不合并成 data-form）：
     *    分组的轴因分区而异（agents 按形态 track、harness 按抽象层 family），
     *    由筛选栏的 select 用 data-attr 指明要比哪一个 —— 这样 cardFor 不必知道 splitBy，
     *    也就不受「splitBy 在本函数之后才定义」的作用域限制。
     *  - data-done / data-total 是**该产品**的维度补齐数（来自上面归并的 PRODUCT_COMPLETENESS）。
     *  - data-blob 是搜索口径：名称 + 厂商 + 定位句（不含正文 —— 正文会提到别的产品）。 */
    const pc = PRODUCT_COMPLETENESS[e.id] || { done: 0, total: 0 };
    const blob = [e.name, e.nameEn, e.vendor, lineRaw].filter(Boolean).join(' ').toLowerCase();
    return `        <article class="card" style="--card-accent:${esc(e.accent || site.accent)}" data-track="${esc(e.track || '')}" data-family="${esc(e.family || '')}" data-task="${esc((e.tasks || []).join(' '))}" data-conf="${esc(e.confidence || '')}" data-cn-origin="${esc((e.cn || {}).origin || '')}" data-cn-direct="${esc((e.cn || {}).direct || '')}" data-cn-filing="${esc((e.cn || {}).filing || '')}" data-done="${pc.done}" data-total="${pc.total}" data-name="${esc(e.name)}" data-blob="${esc(blob)}">
          <div class="card-top">
            <div class="mark" aria-hidden="true">${esc(e.mark || e.name.slice(0,2))}</div>
            <div class="card-id">
              <h3><a href="./${esc(e.id)}.html">${bi(esc(e.name), esc(e.nameEn || e.name))}</a></h3>
              <div class="vendor">${esc(e.vendor)}</div>
            </div>
          </div>
          <p class="tagline">${line}</p>   // line 已是双节点，勿走 esc -->
          <div class="card-foot">
            <span class="t-state ${e.confidence === 'verified' ? 'is-ok' : e.confidence === 'stale' ? 'is-stop' : 'is-warn'}">${bi(e.confidence === 'verified' ? '已核验' : e.confidence === 'stale' ? '待复核' : '部分核验', e.confidence === 'verified' ? 'Verified' : e.confidence === 'stale' ? 'Needs review' : 'Partly verified')}</span>
            <a class="more" href="./${esc(e.id)}.html" aria-label="${esc(e.name)} 详情">${bi('详情 →', 'Details →')}</a>
          </div>
        </article>`;
  };

  /* 分组渲染：三个分区的分组轴不同，所以做成一张映射表而不是一堆 if。
   *   agents → 按形态（track: ide/cli/cloud）分。**必须分**，因为三组产品各有两份
   *            档案（Aider / Claude Code / Codex），混在一张表里会让人
   *            以为「Aider」和「Aider Watch 模式」是两个产品在竞争。
   *   harness→ 按抽象层（family）分，validate 把它列为必填枚举，
   *            不渲染就等于这个字段只活在数据层。
   *   tools  → 不分组。9 份是能力缺口查表，再切一层反而增加认知成本。 */
  /* SPLIT_META（分组说明）—— 2026-10-04 改双语。
   * 每条补 nameEn / descEn，渲染处走 bi()。这些是人写的判断
   * （含<strong> 强调哪些是差别），逐条人工翻译。*/
  const SPLIT_META = {
    form: [
      { key: 'ide', name: 'IDE 形态', nameEn: 'IDE form',
        desc: '装进编辑器，或本身就是独立编辑器。看得见界面，权限多在对话里给。',
        descEn: 'Installed into an editor, or an editor in its own right. You see a UI, and permissions are mostly granted in conversation.' },
      { key: 'cli', name: 'CLI 形态', nameEn: 'CLI form',
        desc: '在终端里跑。能进脚本与 CI，权限确认粒度是最细的一层。',
        descEn: 'Runs in the terminal. Drops into scripts and CI, with the finest granularity of permission confirmation.' },
      // cloud 组是 2026-10-03 新增。第三组必须写清「与前两组的差别在装在哪」——
      // 前两组你本机装东西，这一组你什么都不装、工作在厂商的机器上做，
      // 这个差别直接决定了 permissions 维度的可比性。
      { key: 'cloud', name: '厂商云形态', nameEn: 'Vendor cloud',
        desc: '本机不装任何东西，在厂商的云端机器上持续工作（OpenAI Dot / Meta Muse / xAI Grok Bot）。差别不在功能多寡，而在<strong>机器归谁</strong> —— 代价是本地文件与离线能力基本让出，收益是关机后仍在跑。',
        descEn: 'Nothing installs locally; the work happens on the vendor\'s cloud machine (OpenAI Dot / Meta Muse / xAI Grok Bot). The difference is not how many features you get but <strong>whose machine it runs on</strong> — the cost is giving up local files and offline capability, the benefit is that it keeps running after shutdown.' },
    ],
    family: [
      {
        key: 'coding-base',
        name: '编程底座',
        nameEn: 'Coding base',
        desc: '给你 agent loop 或现成 CLI 的编程接口。这层的差别不在功能多少，而在<strong>它替你做多少决定</strong> —— 一个只给原语，一个把整套 CLI 连权限模型一起打包给你。',
        descEn: 'A programming interface giving you an agent loop or an existing CLI. The difference here is not how much it does but <strong>how many decisions it makes for you</strong> — one hands you primitives, the other packages the whole CLI along with its permission model.',
      },
      {
        key: 'orchestration',
        name: '编排框架',
        nameEn: 'Orchestration',
        desc: '把多步骤、多 Agent、要中断恢复的流程显式建成图。给的是控制力，代价是接线与状态管理都归你。',
        descEn: 'Makes multi-step, multi-agent flows with resumable state explicit graphs. It gives you control; the cost is that wiring and state management are yours.',
      },
      {
        key: 'general-harness',
        name: '通用 Harness',
        nameEn: 'General harness',
        desc: '预置了规划、文件系统、记忆等一整套，面向通用长任务。开箱程度最高，可改性最低。',
        descEn: 'Presets planning, filesystem, memory and the rest, aimed at general long-running tasks. Most ready out of the box, least modifiable.',
      },
    ],
  };

  const splitBy = site.splitBy;
  const groupBlocks = () => {
    if (!splitBy) {
      return `        <div class="grid">
${entries.map(cardFor).join('\n')}
        </div>`;
    }
    const meta = SPLIT_META[splitBy];
    const pick = (e) => (splitBy === 'form' ? e.track : e.family);
    const blocks = [];
    for (const m of meta) {
      const inG = entries.filter(e => pick(e) === m.key);
      if (!inG.length) continue;
      // data-family 驱动 CSS 里的分组配色（--fam-c / --fam-soft）。
      // 2026-10-03：原先分组只靠 margin 一道留白区分，色彩不承担识别 ——
      // 「留白多 + 颜色只用于站点」的组合就是空间浪费的直接原因。
      // m.key 本身就是 validate 定的枚举（primitive / orchestration / turnkey / ide / cli / cloud），
      // 所以直接透传即可，不要另造映射表。
      blocks.push(`        <div class="fam-block" data-family="${m.key}">
          <div class="fam-head">
            <h3>${bi(m.name, m.nameEn || m.name)} <span class="fam-n">${inG.length}</span></h3>
            <span class="fam-badge">${bi(m.short || m.name, m.nameEn || m.name)}</span>
            <p>${bi(m.desc, m.descEn || m.desc)}</p>
          </div>
          <div class="grid">
${inG.map(cardFor).join('\n')}
          </div>
        </div>`);
    }
    // 兜底：分组轴上没有落点的档案也要显示出来，不能静默丢
    const known = new Set(meta.map(m => m.key));
    const orphan = entries.filter(e => !known.has(pick(e)));
    if (orphan.length) {
      blocks.push(`        <div class="fam-block">
          <div class="grid">
${orphan.map(cardFor).join('\n')}
          </div>
        </div>`);
    }
    return blocks.join('\n');
  };

  /* B2（2026-10-09）：三张索引页的筛选栏。
   * ⚠ `<option>` 里**不能放 HTML**（浏览器只按纯文本渲染 option），
   *   所以下拉标签一律写「中文 / English」的语言中立形式，不用 bi()。
   * ⚠ **只在真有区分度时才渲染该维度** —— 这是 B2 实测出来的原则：
   *   · agents 页 27 份**全是 partial** → 核验下拉的每个选项结果都一样，且「已核验」是**死选项**（选它 0 条）
   *   · A6.2 把 446/446 个维度补齐后，**所有产品完整度都是 100%** → 按完整度排序是空操作
   *   提供不产生任何变化的控件 = 假承诺（而且会让人以为「这里应该有差别」）。
   *   所以：维度值 < 2 种就不出这个下拉；完整度无差异就不出完整度排序，改为**如实说明**。 */
  const filterBar = () => {
    const bySplit = splitBy ? SPLIT_META[splitBy] : null;
    const splitAttr = splitBy === 'form' ? 'track' : splitBy === 'family' ? 'family' : null;
    const splitVals = splitAttr ? new Set(entries.map((e) => e[splitAttr]).filter(Boolean)) : new Set();
    const confVals = new Set(entries.map((e) => e.confidence).filter(Boolean));
    const ratios = new Set(entries.map((e) => {
      const pc = PRODUCT_COMPLETENESS[e.id] || { done: 0, total: 0 };
      return pc.total ? (pc.done / pc.total).toFixed(3) : '0';
    }));
    const ratiosVary = ratios.size > 1;

    const opt = (arr) => '<option value="">全部 / All</option>' +
      arr.map((o) => `<option value="${esc(o.key)}">${esc(o.label)}</option>`).join('');
    const CONF_LABEL = { verified: '已核验 / Verified', partial: '部分核验 / Partly verified', stale: '待复核 / Needs review' };

    const parts = [`          <label class="af-f"><span class="af-h">${bi('筛选档案', 'Filter entries')}</span>
            <input type="search" class="aq" autocomplete="off" placeholder="Cursor · Claude · Aider"></label>`];

    if (bySplit && splitVals.size > 1) {
      const opts = bySplit.filter((m) => splitVals.has(m.key)).map((m) => ({ key: m.key, label: `${m.name} / ${m.nameEn || m.name}` }));
      parts.push(`          <label class="af-f"><span class="af-h">${splitBy === 'form' ? bi('形态', 'Form') : bi('抽象层', 'Layer')}</span>
            <select class="asel-form" data-attr="${splitAttr}">${opt(opts)}</select></label>`);
    }
    if (confVals.size > 1) {
      parts.push(`          <label class="af-f"><span class="af-h">${bi('核验状态', 'Verification')}</span>
            <select class="asel-conf">${opt([...confVals].map((k) => ({ key: k, label: CONF_LABEL[k] || k })))}</select></label>`);
    }
    /* S43 任务筛选：下拉只列本页有档案的任务（与任务卡同一口径）。
     * 任务卡链来的 ?task=<id> 会落到这个 select 上 —— 一套筛选体系，不另造。 */
    const taskVals = TASKS.filter((t) => entries.some((e) => (e.tasks || []).includes(t.id)));
    if (taskVals.length > 1) {
      parts.push(`          <label class="af-f"><span class="af-h">${bi('任务', 'Task')}</span>
            <select class="asel-task">${opt(taskVals.map((t) => ({ key: t.id, label: `${t.zh} / ${t.en}` })))}</select></label>`);
    }
    /* S52 中文生态筛选：与 models 站同一套字段口径（origin/direct/filing）。
     * 下拉只列本页档案里真实出现的取值（B2 原则：取值唯一则不出控件）。 */
    const cnOpts = (dim, labels) => {
      const vals = [...new Set(entries.map((e) => (e.cn || {})[dim]).filter(Boolean))];
      if (vals.length < 2) return null;
      return { key: `cn${dim}`, attr: `data-cn-${dim}`, label: bi(dim === 'origin' ? '出品属地' : dim === 'direct' ? '国内直连' : '备案状态', dim === 'origin' ? 'Origin' : dim === 'direct' ? 'Direct access' : 'Filing'),
        opts: vals.map((k) => ({ key: k, label: labels[k] ? `${labels[k][0]} / ${labels[k][1]}` : k })) };
    };
    for (const c of [cnOpts('origin', CN_ORIGIN_LABEL), cnOpts('direct', CN_DIRECT_LABEL), cnOpts('filing', CN_FILING_LABEL)]) {
      if (c) parts.push(`          <label class="af-f"><span class="af-h">${c.label}</span>
            <select class="asel-${c.key}" data-attr="${c.attr}">${opt(c.opts)}</select></label>`);
    }
    if (ratiosVary) {
      parts.push(`          <label class="af-f"><span class="af-h">${bi('排序', 'Sort')}</span>
            <select class="asel-sort"><option value="">默认 / Default</option><option value="done-desc">完整度 高 → 低 / Completeness high–low</option><option value="done-asc">完整度 低 → 高 / Completeness low–high</option></select></label>`);
    } else {
      parts.push(`          <span class="af-note">${bi(`完整度：全部 ${entries.length} 份均 100%（无差异，故不提供排序）`, `Completeness: all ${entries.length} entries are at 100% (no variation, so no sort)`)}</span>`);
    }
    parts.push(`          <span class="acount" aria-live="polite"></span>`);
    return `        <div class="afilter" role="search">
${parts.join('\n')}
        </div>`;
  };

  const groupHeading = {
    form: [bi('按装法分','By install form'), bi('同一产品常有 IDE 与 CLI 两种装法，<strong>它们不是竞品</strong>——装在哪、怎么被唤起、能不能进脚本都不同。选你实际要用的那个。','A product often has both an IDE and a CLI form. <strong>They are not competitors</strong> — they differ in where they install, how they are invoked, and whether they drop into scripts. Pick the one you will actually use.')],
    family: [bi('按抽象层分组','By abstraction layer'), bi('同一层里也能差很远 —— 两个「编程底座」一个是纯原语、一个是全托管包装 CLI，所以先按抽象层分，再看具体对象。','Even within a layer the gap is wide — of two "coding bases", one is pure primitives and one is a fully managed CLI wrapper. So group by abstraction first, then look at the object.')],
  }[splitBy] || [bi('全部对象','All objects'), bi(`按统一坐标系排列。点开任一对象可看到 ${axisNames.join(' / ')} 的完整记录、证据链接与未知项清单。`,
    `Everything on one coordinate system. Open any object to see its full record across ${axisNamesEn.join(' / ')}, with source links and a list of unknowns.`)];

  // 完整度表按分区取对应赛道行；说明文字是解读，数字来自实时计算
  const COVERAGE_NOTE = {
    agents: bi('多为闭源产品，索引策略等细节官方不公开；CLI 类官方文档相对完整', 'Mostly closed-source, so details like indexing strategy are not disclosed; CLI entries have better official docs'),
    harness: bi('编排框架的版本演进快、接口变化多，逐条核验成本最高 —— 也是全站最低的一档', 'Orchestration frameworks move fast and change APIs often, so these are the most expensive to verify — and the lowest fill rate on the site'),
    tools: bi('官方 README 信息充分，绝大多数维度可直接引述', 'Official READMEs cover most of it, so most dimensions can be quoted directly'),
  };
  const covRows = (COVERAGE_ROWS[partKey] || []).filter((t) => COVERAGE_BY_TRACK[t]);
  const covTable = covRows.length ? `          <table class="src is-flush mb-3">
            <thead><tr><th>${bi('形态','Form')}</th><th>${bi('已补齐','Filled')}</th><th>${bi('说明','Meaning')}</th></tr></thead>
            <tbody>
${covRows.map(t => {
    const c = COVERAGE_BY_TRACK[t];
    return `              <tr><td class="nw">${TRACK_LABEL_BI(t)}</td>
                <td class="nw"><strong>${c.done}/${c.total}</strong></td>
                <td class="td-vendor">${COVERAGE_NOTE[t] || ''}</td></tr>`;
  }).join('\n')}
            </tbody>
          </table>
` : '';

  const body = `    <section class="hero">
      <div class="container">
        <p class="kicker">${bi(esc(SITE.name), esc(SITE.nameEn || SITE.name))} · ${esc(site.short)}</p>
        <h1 class="t-hero">${bi(esc(site.name), esc(site.nameEn || site.name))}</h1>
        <p class="lede">${site.desc}</p>
        <div class="hero-meta">
          <span><b>${entries.length}</b> ${bi('个对象','objects')}</span>
          <span><b>${axisNames.length}</b> ${bi('个固定维度','fixed dimensions')}</span>
          <span><b>${verified}</b> ${bi('个已完整核验','fully verified')}</span>
          <span>${bi('最后核验','Last checked')} <b>${latestVerified}</b></span>
        </div>
      </div>
    </section>

${partitionBar(partKey)}

    ${boundarySection(partKey)}

    ${taskSection(partKey, site, entries)}

    ${lightSection(partKey)}

    ${deepGuidesSection(partKey, GUIDES)}

    ${guideSection(partKey, site, entries)}

    <section class="section">
      <div class="container">
        <h2>${groupHeading[0]}</h2>
        <p class="section-desc">${groupHeading[1]}</p>
        ${filterBar()}
${groupBlocks()}
      </div>
    </section>

    <section class="section status-band">
      <div class="container">
        <div class="status-inner">
          <div class="status-mark" aria-hidden="true">!</div>
          <div>
            <h2>${bi('本站目前是「核验快照」，还没有实测数据', 'This site is currently a verification snapshot — no measured runs yet')}</h2>
            <p>
              ${isTools
                ? bi('下面每个 server 的权限范围、传输方式与工具清单都能回到官方 README 核对，但<strong>我们还没有在真实客户端里跑过它们</strong>。',
      'Every server\'s permission scope, transport and tool list below can be traced back to its official README, but <strong>we have not yet run them inside a real client</strong>.')
                : bi('下面每一个字段都能回到官方原文核对，但<strong>我们还没有在同一批任务上跑过这些工具</strong>。',
      'Every field below can be traced back to the official source, but <strong>we have not yet run these tools on the same batch of tasks</strong>.')}
              ${bi('实测协议已经写好（统一任务、统一验收、记录人工介入与返工次数），任务清单也已就绪，', 'The measurement protocol is written (shared tasks, shared acceptance criteria, recording human interventions and rework counts) and the task list is ready, but it is ')}
              ${bi('<strong>尚未执行</strong>。', '<strong>not yet run</strong>.')}
            </p>
            <p class="t-sm">
              ${isTools
                ? bi('MCP server 的风险不在「能不能干活」，而在<strong>权限边界是否清楚、越界是否被拒</strong>。',
      'The risk in an MCP server is not whether it works, but whether <strong>the permission boundary is clear and overreach is refused</strong>.')
                : bi('所以本站给的是<strong>能力边界与证据</strong>，不是「哪个更好用」的结论。',
      'So what this site gives you is <strong>capability boundaries and evidence</strong>, not a verdict on which is better to use.')}
              ${bi('真正的选型请用你自己的输入、预算与验收标准跑一遍。', 'For an actual choice, run them yourself against your own inputs, budget and acceptance criteria.')}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>${bi(`${axisNames.length} 个维度，每格都能回溯`, `${axisNames.length} dimensions, every cell traceable`)}</h2>
        <p class="section-desc">
          ${bi('所有对象在同一坐标系下被描述'+(isTools ? '（MCP 服务器另有 3 个特有维度）' : '')+'。','All objects are described on the same coordinate system'+(isTools ? ' (MCP servers have 3 additional dimensions)' : '')+'.')}
          ${bi('点开任一对象，每一格下面都有官方源链接与核验日期——不认同可以自己回去查。','Open any object and every cell carries an official source link and a checked date — disagree and verify it yourself.')}
        </p>
        <div class="t-mesh axis-mesh">
${axisKeys.map(([k, label], i) => `          <div class="axis-cell">
            <span class="t-index">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="axis-name">${bi(label, AXES_EN[k]?.name || label)}</h3>
            <p class="axis-ask">${bi(AXIS_DESC[k] || '', AXIS_DESC_EN[k] || AXIS_DESC[k] || '')}</p>
          </div>`).join('\n')}
        </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>${bi('全部数据一览','All data at a glance')}</h2>
        <p class="section-desc">${bi('同一张表横向对比。点对象名进详情页看逐格证据。','The same table side by side. Click an object name to see per-cell evidence.')}</p>
        <div class="table-wrap">
          <table class="cmp">
            <thead>
              <tr>
                <th>${bi('对象','Object')}</th><th>${bi('形态','Form')}</th><th>${bi('厂商','Vendor')}</th><th>${bi('适合','Best for')}</th><th>${bi('核验日','Checked')}</th><th>${bi('状态','Status')}</th>
              </tr>
            </thead>
            <tbody>
${entries.map(e => `              <tr>
                <td><a href="./${esc(e.id)}.html"><span class="td-mark" style="--card-accent:${esc(e.accent || site.accent)}">${esc(e.mark || e.name.slice(0, 2))}</span>${bi(esc(e.name), esc(e.nameEn || e.name))}</a></td>
                <td class="td-vendor">${biLabel(FORM_LABEL[e.track], e.track) || biLabel(FAMILY_SHORT[e.family], e.family)}</td>
                <td class="td-vendor">${esc(e.vendor)}</td>
                <td class="td-fit">${(e.fit || e.axes.fit)
                  ? bi(
                      plain(e.fit || e.axes.fit, 70),
                      plain((e.sec && e.sec.fitEn) || e.fit || e.axes.fit, 70))
                  : ''}</td>
                <td class="td-date">${esc(e.lastVerified)}</td>
                <td><span class="td-conf ${esc(e.confidence)}">${esc(e.confidence)}</span></td>
              </tr>`).join('\n')}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>${bi('为什么这里不给总分排名','Why there is no overall ranking')}</h2>
        <p class="section-desc">${bi('这不是省略，是方法上的明确取舍。','This is not an omission but a deliberate methodological choice.')}</p>
        <div class="panel">
          <ul>
            <li>${bi('<strong>缺统一实测，就不给分。</strong>跨工具的跑分口径不同——题目、预算、执行环境都不一样，A 的 90 分和 B 的 88 分不可比。', '<strong>No shared measurement, no score.</strong> Benchmarks across tools use different rules — different questions, budgets and environments. A 90 and a B 88 are not comparable.')}</li>
            <li>${bi('<strong>「未知」是合法答案。</strong>','<strong>"Unknown" is a legitimate answer.</strong>')}查不到就写「未知」并说明为什么，不用推测填充。缺信息本身也是信息。</li>
            <li>${bi('来源链接、类型与核验日都在详情页里，可以逐条回去复核。', 'The source link, its kind and the checked date are all on the detail page, so you can walk any of them back and re-check.')}</li>
            <li>${bi('<strong>lifecycle 单独标注。</strong>核验日新不等于数据有效——上游归档后数据会失效，所以单独标 <code>active</code> / <code>maintenance</code> / <code>archived</code>。', '<strong>lifecycle is marked separately.</strong> A recent check date does not mean the data is still valid — it goes stale when upstream archives the repo, so <code>active</code> / <code>maintenance</code> / <code>archived</code> are tracked separately.')}</li>
            <li>${bi('<strong>不同层不混排。</strong>成品 agent、自己搭的底座、给 agent 装的工具是三种角色，坐标系不同；硬合成一张 33 行的表只会制造假的可比性。', '<strong>Layers are not mixed.</strong> Finished agents, bases you assemble yourself, and tools you install for an agent are three different roles with different coordinate systems; forcing them into one 33-row table would manufacture false comparability.')}</li>
          </ul>
        </div>
        <div class="panel">
          <h2>${bi('可信度标记怎么读','How to read the confidence marks')}</h2>
          <p class="t-sm mb-3">${bi('详情页与上表都带','Both the detail pages and the table above carry')} <code>confidence</code>${bi('，它反映',', which reflects')} <strong>${bi('本站数据的完整度',"how complete this site's data is")}</strong>${bi('，不是对产品的评价。',', not a judgement of the product.')}</p>
          <table class="src is-flush">
            <tbody>
              <tr><th class="w-24"><span class="td-conf verified">verified</span></th><td>${bi(`${axisNames.length} 个维度均有官方源支撑，且核验日在 90 天内`, `all ${axisNames.length} dimensions have official sources and were checked within 90 days`)}</td></tr>
              <tr><th><span class="td-conf partial">partial</span></th><td>${bi('部分维度标为未知，或官方文档不可访问，或核验日超过 90 天', 'some dimensions are marked unknown, or the official docs were unreachable, or checked over 90 days ago')}</td></tr>
              <tr><th><span class="td-conf stale">stale</span></th><td>${bi('官方已发布重大变化，本站尚未核验', 'the vendor has shipped a significant change that this site has not re-checked')}</td></tr>
            </tbody>
          </table>
        </div>
        <div class="panel">
          <h2>${bi('本站当前的完整度','Current completeness on this site')}</h2>
          <p class="t-sm mb-2">
            数据层用 <code>node scripts/audit-gaps.mjs</code> 可随时复核这个数字。
            以下是最近一次核验的快照（核验日 2026-09-29）：
          </p>
${covTable}          <p><strong class="em">${bi(`全站合计 ${COVERAGE.done}/${COVERAGE.total} 维度已补齐`, `Site-wide ${COVERAGE.done}/${COVERAGE.total} dimensions filled`)}（${Math.round(COVERAGE.done / COVERAGE.total * 100)}%）</strong></p>
          <p class="t-sm">
            ${bi('剩余未补齐项分三类：<strong>官方未公开</strong>（索引算法、沙箱实现细节本就不对外说明）、<strong>需实测才能确定</strong>（大仓库表现、CI 无 TTY 行为）、<strong>客观渠道不可达</strong>。', 'The remaining gaps fall into three kinds: <strong>not disclosed by the vendor</strong> (indexing algorithms, sandbox internals are simply not documented), <strong>requires measurement</strong> (behaviour on very large repositories, CI without a TTY), and <strong>unreachable through objective channels</strong>.')}
          </p>
          <p class="t-sm">
            ${bi('我们选择留白而不是填「已支持」——错误的成本最终由使用者承担。', 'We chose to leave a blank rather than fill in "supported" — the cost of an error is ultimately borne by whoever uses it.')}
          </p>
        </div>
        <div class="panel">
          <h2>${bi('数据来源与复核方式','Sources and how to re-check them')}</h2>
          <p>${bi('全部数据来自开源仓库', 'All data comes from the open-source repository')} <a href="${SITE.repo}" target="_blank" rel="noopener" class="link-brand">speculcom/ai-agent-guide</a>（CC BY 4.0）。</p>
          <p>${bi('每个条目都是纯 Markdown + frontmatter，含 8 个维度、证据链', 'Every entry is plain Markdown plus frontmatter, carrying 8 dimensions and an evidence chain')}接、核验日与可信度标记。仓库内含：</p>
          <ul>
            <li><code>METHODOLOGY.md</code> —— 方法论总纲与四条核心规则</li>
            <li><code>axes/</code> —— 每个维度的定义与判定标准（含正反例）</li>
            <li><code>SCHEMA.md</code> —— 数据格式规范与构建校验规则</li>
            <li><code>tracks/*/tasks/_protocol.md</code> —— 实测协议(${bi('<strong>尚未执行</strong>', '<strong>not yet run</strong>')}${bi('，故本站暂无实测结论', ', so this site has no measured conclusions')})</li>
          </ul>
          <p class="t-sm">${bi('发现错误或有新证据，欢迎提 Issue 或 PR——每条修正都会注明依据与影响范围。', 'Found an error or have new evidence? Open an issue or a PR — each correction notes its basis and blast radius.')}</p>
        </div>
      </div>
    </section>
    <!-- B2：索引页筛选与排序（脚本读独立文件 agent-filter.js，作用域 .afilter） -->
    <script>${AGENT_FILTER_JS}</script>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: site.name,
    description: site.desc,
    url: `https://${site.domain}/${base}`,
    isPartOf: { '@type': 'WebSite', name: 'Specul', url: 'https://specul.com/' },
    about: entries.map(e => ({
      '@type': 'SoftwareApplication',
      name: e.name,
      applicationCategory: 'DeveloperApplication',
      ...(e.url ? { url: e.url } : {}),
    })),
  };

  return buildShell({
    current: site.navKey,
    title: `${site.name} — ${plainTagline(site.tagline)} | 投机取巧`,
    desc: metaDesc(plainTagline(site.desc)),
    body,
    jsonLd,
    canonical: `https://${site.domain}/${base}`,
    assetPrefix: site.dir ? '../' : '',
  });
}

// meta / JSON-LD 用纯文本：去掉 Markdown 标记，避免 ** ` [x](y) 漏进搜索结果
function plain(s, max = 160) {
  return String(s ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')   // [text](url) → text
    .replace(/\*\*([^*]+)\*\*/g, '$1')          // **bold** → bold
    .replace(/`([^`]+)`/g, '$1')                // `code` → code
    /* ⚠ **行首的块级标记也要剥**（2026-10-09 加）。
     *   卡片摘要用 `tagline || oneline`，而这两处现在可能有 markdown 列表 / 引用块
     *   （正文小节上页后才暴露）—— 不剥就会在列表页上显示成
     *   「适合四类情况： - 要把 Codex 塞进自己的 Node 应用 - 需要非交互执行 …」✗
     *   实测 agent 站列表页 100 处。摘要本来就该是**纯散文** ✓。 */
    .replace(/^[-*]\s+/gm, '')                  // 行首清单标记
    .replace(/^>\s?/gm, '')                     // 行首引用标记
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

/* meta description 专用：返回**原文**（shell() 会自己 esc），但保证**转义之后**不超长。
 * ⚠ 为什么不能先转义再返回：shell.mjs 里是 `${esc(desc)}`，返回已转义的串会被二次转义
 *   （`&amp;` → `&amp;amp;`）。shell 是 vendored 品牌文件（brand-sync 守着），不动它。
 * ⚠ 为什么不能只按原文字数截断：`&` 转义成 `&amp;` 每个多 4 字符 ——
 *   实测 ag2 因此从 150 变成 170，超过常见 160 的截断线。所以按**转义后**的长度收敛。
 * ⚠ partition 索引页原先直接把 `site.desc`（bi() 双 span 的 HTML）塞进 content，
 *   转义后搜索结果里显示 `&lt;span data-zh&gt;…` —— 实测 674 字符的标记垃圾。
 *   这里用 plainTagline 取中文纯文本，两个问题一起解决。 */
function metaDesc(s, max = 158) {
  const raw = String(s ?? '').replace(/\s+/g, ' ').trim();
  if (esc(raw).length <= max) return raw;
  let n = raw.length;
  while (n > 0) {
    const cand = raw.slice(0, n).replace(/[\s,，、;；:：\-—]+$/, '');
    if (esc(cand + '…').length <= max) return cand + '…';
    n -= Math.max(1, esc(cand + '…').length - max);
  }
  return '';
}

function renderDetail(site, partKey, e) {
  const base = pfx(site);
  const isTools = site.owns.includes('mcp');
  // 8 维度读 axes 块；MCP 特有 3 维度读 mcp 块
  const axisKeys = AXES.map(([k, label]) => ({ k, label, v: e.axes[k] }));
  if (isTools) {
    for (const [k, label] of MCP_AXES) axisKeys.push({ k, label, v: e.mcp[k] });
  }
  /* 一个维度单元格的正文渲染（2026-10-09 加）。
   * 为什么需要它：解析器修好之后（保留空行，见 parseFrontmatter 里 folded 的注释），
   * 维度正文里出现了「空行分段的段落」与「`- ` 开头的清单」两种结构。
   * 直接丢给 mdLinks() 会把它们压成一段流水文字 —— 清单就退化成正文里的「- xxx - yyy」，
   * 而这正是 _plan/文风规范-说人话.md 第 2 条要消灭的形态。
   * 这里用**最小**的块级规则（段落 / 无序清单 / 引用块 / 空行），不引入完整 markdown 解析。*/

  const axesHtml = axisKeys.map(({ label, k, v }) => {
    return `        <div class="axis">
          <dt>${bi(label, AXES_EN[k]?.name || label)}</dt>
          <dd>${blockMd(v)}</dd>
        </div>`;
  }).join('\n');

  /* ⚠ `label` 走 `mdLinks` 而不是 `esc`（2026-10-09 改）。
   *   出处表的备注列里常写 `**补上审批必审动作清单**` 这类加粗说明 ✗ ——
   *   用 `esc` 是**原样转义**，于是星号直接显示给读者 ✗（实测 grok-bot / llamaindex /
   *   openhands / context7 等页共 5 处）。
   *   `mdLinks` 同样会做转义（它内部处理），只是额外认链接 / 加粗 / 代码 ✓。 */
  const srcRows = e.sources.map(s =>
    `            <tr><td>${esc(s.kind)}</td><td>${mdLinks(s.label)}</td><td><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a></td></tr>`
  ).join('\n');

  /* D9（2026-10-20 用户定案）：价格面板（priceRows）整体删除。
   *   原先这里渲染 monthly_label / monthly_usd / annual_label / note 四行 +
   *   「不同币种不做折算…」脚注。价格高频变动、本站不采不存（见总纲 D9），
   *   档案页的「多少钱」指引由 sources 表里 kind: pricing 的官方页链接承担。 */

  /* 「相关条目」渲染 —— 36 份档案全都有这一章，是访客在同一赛道横向对比的入口。
   *
   * 这一章**曾经采集了却从不渲染**（第二个「静默丢内容」）：
   * 数据层 section('相关条目') 一直在跑，模板里却没有它的位置，
   * 于是36 份档案的横向互引全部不出现在页面上 —— 不报错、构建成功、只是没人看见。
   *
   * 格式：`- [显示名](./x.md 或 ../../<track>/products/x.md) — 一句话说清为什么值得对照`
   * 末段的破折号是关键 —— 只给名字等于让访客自己再点一次，
   * 写清「哪一维不同」才构成对照（同赛道的相似度越高，这句话越重要）。
   * mdLinks() 里的 rewriteInternal 会把两种 .md 写法都转成站内 .html 绝对路径。
   *
   * ── A6.3（2026-10-09）加第二路来源：frontmatter `related` ──────────────
   * `related` 是 schema 里写了两遍的字段，却**采集了从不渲染**（e.related 只赋值、
   * 没人读），52 份档案 0 份用它 —— 与上面那个「静默丢内容」是同一类毛病。
   * 现在两路合并到同一个列表：
   *   · 正文 `## 相关条目`：人工写的同分区对照，带「哪一维不同」的理由；
   *   · frontmatter `related`：跨分区互链，理由由构建器给（「另一分区 · <分区名>」），
   *     因为跨层不需要理由 —— 需要的是**让访客知道自己在看哪一层**。
   * 按目标 id 去重：正文已经链到的对象不再由 `related` 重复一遍。*/
  const relatedHtml = (() => {
    // 捕获完整的 `[名](href)` —— mdLinks() 要靠 href 才能经 rewriteInternal 转成站内 .html，
    // 只把显示名传进去会得到一段没有链接的纯文本（第一版就这么写错了）。
    const items = (e.sec.related || '').split(/\r?\n/)
      .map(l => /^\s*[-*]\s*(\[[^\]]+\]\([^)]+\.md\))\s*—\s*(.+)$/.exec(l))
      .filter(Boolean);

    // 正文已链到的目标 id（正文里的 href 一定以 `<id>.md` 结尾）
    const linkedIds = new Set();
    for (const m of items) {
      const href = /\]\(([^)]+)\)/.exec(m[1]);
      const idOnly = href && /(?:^|\/)([A-Za-z0-9._-]+)\.md$/.exec(href[1]);
      if (idOnly) linkedIds.add(idOnly[1]);
    }

    const auto = (e.related || [])
      .filter(id => typeof id === 'string' && id && !linkedIds.has(id))
      .map(id => {
        const t = BY_ID.get(id);
        // 指向不存在的 id：构建期就报出来，不让它变成页面上的死链（探针会二次确认）
        if (!t) { console.warn(`  ! ${e.id} 的 related 指向不存在的 id：${id}`); return null; }
        const href = rewriteInternal(`../../${t.partKey}/products/${id}.md`);
        const label = bi(esc(t.entry.name), esc(t.entry.nameEn || t.entry.name));
        const reason = t.partKey === partKey
          ? bi('同分区对照', 'Same layer')
          : bi(`另一层 · ${SITES[t.partKey].name}`, `Other layer · ${SITES[t.partKey].nameEn}`);
        return { href, label, reason };
      })
      .filter(Boolean);

    if (!items.length && !auto.length) return '';
    // 显示名进 <a>、理由进 <span> —— 不能把整行塞进 <a>：
    // 嵌套 <a> 会被 HTML 解析器静默吞掉后续兄弟节点（这坑全站踩过）。
    const lis = [
      ...items.map(m => `          <li><span class="rel-t">${mdLinks(m[1])}</span><span class="rel-n">${mdLinks(m[2])}</span></li>`),
      ...auto.map(a => `          <li><span class="rel-t"><a href="${a.href}">${a.label}</a></span><span class="rel-n">${a.reason}</span></li>`),
    ].join('\n');
    return `      <div class="panel is-slim">
        <h2>${bi('相关条目','Related entries')}</h2>
        <ul class="rel-list">
${lis}
        </ul>
      </div>\n`;
  })();

  // 面包屑：站 → 分区 → 本页。
  // 分区链接写绝对路径（/harness/），因为本页可能在子目录里。
  // 注意 agents 的 dir 是空串，拼接必须走 pfx() —— 直接写 `/${s.dir}/`
  // 会拼出 `//`，而 `//` 在页面里是协议相对URL，会指到站外的 evil.com。
  const crumb = `      <nav class="crumbs" aria-label="面包屑">
        <a href="https://${SITE.domain}/">${esc(SITE.name)}</a>
${SITE.partitions.map(k => {
    const s = SITES[k];
    return k === partKey
      ? `        <span aria-current="page">${esc(s.short)}</span>`
      : `        <a href="/${pfx(s)}">${esc(s.short)}</a>`;
  }).join('\n')}
      </nav>`;

  const body = `    <div class="container detail">
${crumb}
      <a class="back" href="./">← ${esc(site.short)}</a>

      <div class="detail-head">
        <div class="mark" style="--card-accent:${esc(e.accent || site.accent)}" aria-hidden="true">${esc(e.mark || e.name.slice(0,2))}</div>
        <div>
          <h1>${bi(esc(e.name), esc(e.nameEn || e.name))}</h1>
          <div class="vendor is-caps">${esc(e.vendor)}</div>
        </div>
      </div>

      <div class="badges">
        ${(e.tags || []).map(t => `<span class="tag on">${esc(t)}</span>`).join('\n        ')}
        <span class="badge accent">${esc(e.confidence)}</span>
        <span class="badge">lifecycle: ${esc(e.lifecycle)}</span>
        <span class="badge">${bi('核验','Checked')} ${esc(e.lastVerified)}</span>
      </div>

      ${e.sec.oneline
        /* 首段面板（2026-10-08 修槽位错放）：data-zh 必须是**中文** oneline；
         * leadEn 是它「更完整」的英文版（带官方引用），放 data-en。
         * ⚠ 原为 bi(leadEn||oneline, onelineEn||oneline) —— leadEn 被放进了中文槽，
         *   36 个详情页的中文首段都显示英文；而探针只查英文态中文残留，一直是绿的。
         *   `_i18n-render-audit.mjs` 已补「中文态槽位必须含中文」的反向检查守这类错位。*/
        /* ⚠ 引言也走 `blockMd`（2026-10-09 改）。
         *   原先只有 `mdLinks`（行内）✗ —— 而「一句话定位」小节里现在可能有 markdown 清单，
         *   于是引言的清单会显示成字面「- a - b - c」✗（实测占 agent 站残留的绝大部分：
         *   `llamaindex` 的「…但编排能力没有离开 OSS： - README 把 Workflows…」就是它）。
         *   改成 `<div>` 而不是 `<p>` —— `blockMd` 会产出 `<ul>` / `<p>`，塞进 `<p>` 是非法 HTML ✗。 */
        ? `      <div class="panel-lead">${bi(blockMd(e.sec.oneline), blockMd(e.sec.leadEn || e.sec.onelineEn || e.sec.oneline))}</div>\n`
        : ''}
      ${e.sec.fit ? (() => {
        /* 「适合与不适合」双语（2026-10-04）。
         * ⚠ 这段是全站最敏感的内容 —— 直接告诉用户什么该用、什么不该用。
         *   英文侧**保留强度**：「直接排除」→ rules that out outright、
         *   「未核验」→ not verified（见 _fits.en.json 的 _rules）。
         * 段落以空行分隔；「不适合」段用警示色 —— 英文侧同样要识别
         * "Not a fit"，否则警示色丢失、语气被磨平。*/
        /* ⚠ 段落 / 清单 / 引用都要走 blockMd（2026-10-09 修）。
         *   旧写法把每个「空行分隔的块」都包成 `<p>${mdLinks(p)}</p>` ✗ ——
         *   而 `mdLinks` 是**行内**渲染器（只处理链接 / 加粗 / 代码 / 转义），
         *   不认行首 `- `，于是 `fit` 里的清单在页面上变成
         *   「- 任务能被表述成… - 需要业务逻辑留在…」**一行流水文字** ✗
         *   —— 正是文风规范第 2 条要消灭的形态。
         *   `axes` 侧走 `blockMd()`（见 L1298）所以没事，`fit` 侧漏了。
         *   实测受影响：`crewai`（已改好的范例）等所有在 `fit` 里写 `- ` 的档案。
         *
         *   警示色仍按「块首」判定 ✓（`renderFit` 的第一行判据不变）。 */
        const renderFit = (txt, warnRe) => {
          const paras = String(txt).split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
          return paras.map(p => {
            const isWarn = warnRe.test(p);
            const cls = isWarn ? ' class="warn-p"' : '';
            return `        <div${cls}>${blockMd(p)}</div>`;
          }).join('\n');
        };
        /* ⚠ 警示色判据要容忍「也 / Also」这类连接词（2026-10-09 补）。
         *   子代理报回：把「适合与不适合」拆段之后，第二段写的是
         *   `也不适合需要真正网络隔离的场景：…` ✗ —— 而原判据是 `/^(\*\*)?不适合/`，
         *   匹配不到「也不适合」，于是**那一整段丢了警示色** ✗（拆段是好事，却带来视觉副作用）。
         *   现在允许开头有个「也 / 而 / 另外」。 */
        const zh = renderFit(e.sec.fit, /^\s*(\*\*)?(也|而|另外)?不适合/);
        const en = e.sec.fitEn ? renderFit(e.sec.fitEn, /^\s*(\*\*)?(also |and |otherwise )?not a fit/i) : '';
        const body = en
          ? `<span data-zh>${zh}</span><span data-en>${en}</span>`
          : zh;
        return `      <div class="panel is-slim">
        <h2>${bi('适合与不适合', 'When to use it, when not to')}</h2>
${body}
      </div>\n`;      })() : ''}
      ${cnPanel(e.cn)}

      <div class="block-head">
        <h2 class="t-h2">${bi('固定坐标系','Fixed coordinate system')}</h2>
        <p class="t-section-lead">${axisKeys.length} ${bi('个维度','dimensions')}, ${bi('与同分区其他对象逐项可比','each comparable item by item against others in the same section')}.</p>
      </div>
      <dl class="axes">
${axesHtml}
      </dl>

      ${e.pitfalls.length ? `      <div class="panel warn">
        <h2 class="warn">${bi('头号误解','Top misconception')}</h2>
        <ul>
${/* pitfalls 的英文按索引对齐；数量不一致时整段回退中文（宁可不译不错配）*/ ''}
${(() => {
            const en = PITFALLS_EN[e.id];
            if (!en || en.length !== e.pitfalls.length) {
              return e.pitfalls.map(p => `          <li>${mdLinks(p)}</li>`).join('\n');
            }
            return e.pitfalls.map((p, i) => `          <li>${bi(mdLinks(p), mdLinks(en[i]))}</li>`).join('\n');
          })()}
        </ul>
      </div>\n` : ''}

      ${e.sec.unknowns && /^\s*[-*]/m.test(e.sec.unknowns) ? `      <div class="panel is-slim">
        <h2>${bi('未知项清单','Known unknowns')}</h2>
        <ul>
${(() => {
          /* 列表项的**缩进续行**必须并入上一项。
           * 原写法 `filter(l => /^\s*[-*]/.test(l))`只留列表行、丢掉所有续行 ——
           * 像「未知项清单」这种「一句结论 + 缩进补充条件」的写法（本次实测 google-adk
           * 命中：`- Gemini 单价…的实际费率`后面跟着缩进行
           * `（GOOGLE_GENAI_USE_ENTERPRISE 的含义已核验，费率未核验）`），
           * 那句补充就整段消失，**页面照常渲染、不报错**。
           * 判据用「有没有 `- ` 前缀」而不是「有没有缩进」——
           * 缩进续行与顶层列表项的缩进层级不一定一致（嵌套列表也会缩进）。*/
          const items = [];
          for (const raw of e.sec.unknowns.split(/\r?\n/)) {
            const li = /^\s*[-*]\s+(.*)$/.exec(raw);
            if (li) { items.push(li[1]); continue; }
            if (items.length && raw.trim()) items[items.length - 1] += ' ' + raw.trim();
          }
          return items.map(t => `          <li>${mdLinks(t)}</li>`).join('\n');
        })()}
        </ul>
      </div>\n` : ''}

      <div class="panel">
        <h2>${bi('证据来源','Evidence sources')}</h2>
        <p class="t-sm">${bi('判断可回到以下一手源复核。本站核验日', 'Every judgement can be rechecked against the primary sources below. Verified on')} ${esc(e.lastVerified)}，${bi('内容更新日','content updated on')} ${esc(e.lastUpdated)}。</p>
        <table class="src">
          <thead><tr><th class="w-20">${bi('类型','Type')}</th><th class="w-52">${bi('名称','Name')}</th><th>${bi('链接','Link')}</th></tr></thead>
          <tbody>
${srcRows}
          </tbody>
        </table>
      </div>

      ${e.sec.runs ? `      <div class="panel is-slim">
        <h2>${bi('实测记录','Measured runs')}</h2>
        ${blockMd(e.sec.runs)}
      </div>\n` : ''}

      ${(e.extraSections || []).map((s) => `      <div class="panel is-slim">
        <h2>${mdLinks(s.title)}</h2>
        ${blockMd(s.content)}
      </div>`).join('\n')}

      ${relatedHtml}

      <p class="fine mt-6">
        ${bi('本页由', 'This page is generated from the')} <a href="${SITE.repo}" target="_blank" rel="noopener" class="link-brand">ai-agent-guide</a> ${bi('数据层生成（CC BY 4.0）。', 'data layer (CC BY 4.0).')}
        方法论与坐标系定义见仓库内 <code>METHODOLOGY.md</code>。
      </p>
    </div>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: e.name,
    applicationCategory: 'DeveloperApplication',
    ...(e.url ? { url: e.url } : {}),
    ...(e.homepage ? { sameAs: e.homepage } : {}),
    description: plain(e.tagline || e.sec.oneline, 300),
    dateModified: e.lastVerified,
    /* D9：JSON-LD 的 offers（价格声明）已删除——本站不存价格数字 */
  };

  return buildShell({
    current: site.navKey,
    repo: SITE.repo,
      title: `${e.name} — ${site.short} | 投机取巧`,
    desc: metaDesc(plain(`${e.name}（${e.vendor}）：${e.tagline || e.sec.oneline}`)),
    body,
    jsonLd,
    canonical: `https://${site.domain}/${base}${e.id}.html`,
    assetPrefix: site.dir ? '../' : '',
  });
}

// ── 主流程 ───────────────────────────────────────────────────────────────
/* 输出布局（一站三分区）：
 *   OUT/                ← 站点根 = agent.specul.com，CNAME / robots / sitemap 都在这里
 *     index.html        ← agents 分区（17 份档案的首页 + 详情）
 *     brand.css brand.js site.css
 *     harness/index.html + 10 份详情
 *     tools/index.html   + 9 份详情
 *
 * 为什么 agents 分区落在根而不是 /agents/：
 *   它是本站默认落点（导航「Agent」指的就是它），也是三者里唯一
 *   不该让访客多点一次的。其余两个分区作为子目录，天然是「次级内容」。
 *
 * **CNAME 只写一次、只写根域名**（曾差点写成 agent.specul.com/harness/）：
 *   Pages 的自定义域名绑定只接受域名，带路径会让绑定失败。
 */
function copyBrand(dir) {
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(BRAND, path.join(dir, 'brand.css'));
  fs.copyFileSync(BRANDJS, path.join(dir, 'brand.js'));
  // 内容层样式（与 brand.css 分开：前者是站点特有结构，后者是全站设计系统）
  fs.copyFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'site.css'), path.join(dir, 'site.css'));
}

let totalErr = 0;
const summary = [];
const allPages = [];   // 汇总给站点级sitemap 用

// 先把所有分区都读一遍+ 校验，任何一个分区出错就不出站（避免半成品上线）
const GUIDES = loadGuides();
const loaded = [];
for (const partKey of targets) {
  const site = SITES[partKey];
  if (!site) { console.error(`未知分区: ${partKey}`); process.exit(1); }
  const { entries, errors } = loadTrack(partKey);
  const errs = validate(partKey, entries, errors);
  loaded.push({ partKey, site, entries, errs });
  totalErr += errs.length;
}

for (const { partKey, site, entries, errs } of loaded) {
  if (errs.length) {
    console.error(`\n[${partKey}] 校验失败 ${errs.length} 项，未出站：`);
    errs.forEach(e => console.error('  ✗ ' + e));
  }
}
if (totalErr) { console.error(`\n共 ${totalErr} 项校验错误，未出站。`); process.exit(1); }

/* 全局 id → { entry, partKey }：跨分区互链（A6.3）按 id 找目标条目的
 * 显示名与分区落点。SCHEMA §七 要求 id **跨分区唯一** —— 重复时会让
 * 「跨赛道引用指向错误对象」，所以构建期直接硬失败，不留给页面去串位。*/
const BY_ID = new Map();
{
  const dup = [];
  for (const { partKey, entries } of loaded) {
    for (const e of entries) {
      if (BY_ID.has(e.id)) dup.push(e.id);
      else BY_ID.set(e.id, { entry: e, partKey });
    }
  }
  if (dup.length) {
    console.error(`id 跨分区重复（SCHEMA §七 要求全局唯一）：${[...new Set(dup)].join(', ')}`);
    process.exit(1);
  }
}

if (CHECK_ONLY) {
  for (const { partKey, entries } of loaded) {
    const v = entries.filter(e => e.confidence === 'verified').length;
    summary.push(`[${partKey}] ${entries.length} 个对象（${v} verified），校验通过（未出站）`);
  }
  summary.forEach(s => console.log(s));
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });
copyBrand(OUT);

// CNAME：只写一次，只写根域名
fs.writeFileSync(path.join(OUT, 'CNAME'), SITE.domain + '\n', 'utf8');

// .nojekyll：让 GitHub Pages 跳过 Jekyll 处理，直接原样发布静态文件。
// 缺它时 Jekyll 会把带下划线开头或方括号的内容当 Liquid 模板解析，构建报
// "Page build failed."（2026-09-30 在 cli 站实际踩到：连续 3 次构建 errored，
//  而线上还能访问 —— 因为服务的是上一次成功的旧产物）。
fs.writeFileSync(path.join(OUT, '.nojekyll'), '', 'utf8');

for (const { partKey, site, entries } of loaded) {
  const dir = site.dir ? path.join(OUT, site.dir) : OUT;
  fs.mkdirSync(dir, { recursive: true });
  // 清旧页面（只清 .html，不动 brand 壳与 .nojekyll）
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) fs.unlinkSync(path.join(dir, f));

  const base = pfx(site);
  fs.writeFileSync(path.join(dir, 'index.html'), renderIndex(site, partKey, entries), 'utf8');
  allPages.push({ loc: `https://${SITE.domain}/${base}`, pri: partKey === 'agents' ? '1.0' : '0.9' });

  for (const e of entries) {
    fs.writeFileSync(path.join(dir, `${e.id}.html`), renderDetail(site, partKey, e), 'utf8');
    allPages.push({ loc: `https://${SITE.domain}/${base}${e.id}.html`, pri: '0.7' });
  }

  /* S48 深水指南详情页：只落 tools 分区（guides 的落点）。
   * 先清旧目录（guides 清空时不留孤儿页），再按需写。 */
  if (partKey === 'tools') {
    const gdir = path.join(dir, 'guides');
    if (fs.existsSync(gdir)) {
      for (const f of fs.readdirSync(gdir).filter((x) => x.endsWith('.html'))) fs.unlinkSync(path.join(gdir, f));
    }
    if (GUIDES.length) {
      fs.mkdirSync(gdir, { recursive: true });
      for (const g of GUIDES) {
        fs.writeFileSync(path.join(gdir, `${g.id}.html`), renderGuidePage(g, site), 'utf8');
        allPages.push({ loc: `https://${SITE.domain}/tools/guides/${g.id}.html`, pri: '0.7' });
      }
    }
  }

  // 仓库 README（GitHub 落地页，说明这个分区是什么、数据从哪来）
  const isTools = site.owns.includes('mcp');
  const axisNames = (isTools ? [...AXES, ...MCP_AXES] : AXES).map(x => x[1]);
  const verifiedCount = entries.filter(e => e.confidence === 'verified').length;
  fs.writeFileSync(path.join(dir, 'README.md'),
`# ${SITE.name} · ${site.name}

> ${site.tagline}

**${SITE.domain}/${base}** · 独立信息项目（非厂商官方榜单）

${site.desc}

本站共 ${SITE.partitions.length} 个分区（\`${SITE.partitions.join('` / `')}\`），本 README 描述「${site.short}」这一个。

## 这个分区提供什么

- **${entries.length} 个对象**，按固定 ${axisNames.length} 个维度记录${isTools ? '（8 个通用维度 + 3 个 MCP 特有维度）' : ''}
- 每个维度都能回溯到官方一手源，附来源类型与核验日期
- **不给总分排名**——缺少跨工具的统一实测，排名会误导
- **「未知」是合法答案**——查不到就写未知并说明原因，不用推测填充

## 收录对象

| 对象 | 形态 | 厂商 | 可信度 | 核验日 |
|---|---|---|---|---|
${entries.map(e => `| [${e.name}](./${e.id}.html) | ${FORM_LABEL_MD(e.track, e.family)} | ${esc(e.vendor)} | ${e.confidence} | ${e.lastVerified} |`).join('\n')}

## 可信度标记

| 标记 | 含义 |
|---|---|
| \`verified\` | all ${axisNames.length} dimensions backed by official sources, checked within 90 days |
| \`partial\` | some dimensions unknown, or official docs unreachable, or checked over 90 days ago |
| \`stale\` | 官方已发布重大变化，本站尚未核验 |

当前 ${entries.length} 个对象中，**${verifiedCount} 个为 verified**。

## 数据来源

全部数据来自 **[speculcom/ai-agent-guide](https://github.com/speculcom/ai-agent-guide)**（CC BY 4.0），
由 \`sites/build.mjs\` 从该仓库的 Markdown + frontmatter 构建，本仓库只存产物。

发现错误或有新证据，欢迎去数据仓库提 Issue 或 PR。

## 站内分区

| 分区 | 主题 | 对象数 |
|---|---|---|
${SITE.partitions.map(k => {
    const s = SITES[k];
    const n = k === partKey ? entries.length : (loaded.find(x => x.partKey === k)?.entries.length ?? '—');
    return `| [${s.short}](/${s.dir ? s.dir + '/' : ''}) | ${s.tagline} | ${n} |`;
  }).join('\n')}

---

© 2026 Specul · 投机 · 推演
`, 'utf8');

  const v = verifiedCount;
  summary.push(`[${partKey}] ${entries.length} 个对象（${v} verified）→ ${site.dir ? site.dir + '/' : '(站点根)'}`);
}

// sitemap：一个站一份，覆盖三个分区（原先是每站一份）
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url><loc>${p.loc}</loc><priority>${p.pri}</priority></url>`).join('\n')}
</urlset>
`, 'utf8');

// robots：允许索引
fs.writeFileSync(path.join(OUT, 'robots.txt'),
`User-agent: *
Allow: /

Sitemap: https://${SITE.domain}/sitemap.xml
`, 'utf8');

// 站点根 README：介绍整站三分区
fs.writeFileSync(path.join(OUT, 'README.md'),
`# ${SITE.name}

> ${SITE.tagline}

**${SITE.domain}** · 独立信息项目（非厂商官方榜单）

${SITE.desc}

## 三个分区，坐标系不同

| 分区 | 主题 | 对象数 | 主要坐标系 |
|---|---|---|---|
${loaded.map(({ partKey, site, entries }) => {
    const isT = site.owns.includes('mcp');
    return `| [${site.short}](${partKey === 'agents' ? './' : './' + site.dir + '/'}) | ${site.tagline} | ${entries.length} | ${isT ? '8 通用 + 3 MCP 特有' : '8 通用维度'}${site.splitBy === 'form' ? '，按形态分组' : site.splitBy === 'family' ? '，按抽象层分组' : ''} |`;
  }).join('\n')}

**为什么不给一张 33 行的总表**：三层的坐标系不同，混排会制造假的可比性。
成品 agent 与自己搭的底座都能进同一个八维坐标系，但它们解决的不是同一个问题；
MCP 工具层用的是另外三个维度（传输 / 认证 / 权限范围），八维套不上去。

## 方法

- **不给总分排名**——缺少跨工具的统一实测，排名会误导
- **「未知」是合法答案**——查不到就写未知并说明原因，不用推测填充
- **不同层不混排**——三条铁律都写在数据仓 \`METHODOLOGY.md\` 里

## 数据来源

全部数据来自 **[speculcom/ai-agent-guide](https://github.com/speculcom/ai-agent-guide)**（CC BY 4.0），
由 \`sites/build.mjs\` 构建，本仓库只存产物。

---

© 2026 Specul · 投机 · 推演
`, 'utf8');

summary.forEach(s => console.log(s));
console.log(`\n共 ${allPages.length} 个页面 → ${path.basename(OUT)}/（含 brand.css / brand.js / site.css）`);
