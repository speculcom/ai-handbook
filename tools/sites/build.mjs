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
  // 回退：按本地开发布局推断（2026-10-21 S9：三内容仓合并为 ai-handbook，本仓是 tools/ 子树）
  return path.resolve(HERE, '..', '..', '..', '_data', 'handbook', 'tools');
}

function findOutDir(dataDir) {
  if (process.env.OUT_DIR) return path.resolve(process.env.OUT_DIR);
  /* 判定依据是「脚本是否落在 monorepo 的 _data/handbook/tools/sites/ 下」，
   * 而不是「_sites 目录是否存在」——后者会误判：CI 里上溯路径可能是任意位置，
   * 恰好存在 _sites 就被当成本地布局。
   *
   * 上溯层数别数错（S9 后）：脚本在 <repo>/_data/handbook/tools/sites/ 下，
   * 要上溯 **四层** 才到 <repo>（sites → tools → handbook → _data → repo）。
   */
  const repoRoot = path.resolve(HERE, '..', '..', '..', '..');
  const isLocalLayout = dataDir === path.join(repoRoot, '_data', 'handbook', 'tools');
  return isLocalLayout
    ? path.join(repoRoot, '_sites', 'agent.specul')
    : path.join(dataDir, 'dist');
}

function findBrandDir() {
  if (process.env.BRAND_DIR) return path.resolve(process.env.BRAND_DIR);
  /* 1. 共享品牌核心（S9 · 2026-10-21：ai-handbook/shared/brand/，仓内只有一份，宪章 3）。
   * 之前只有两种来源：本机 <repo>/www.specul/，或 CI 约定的 .build/。
   * 克隆者两个都没有 → 构建在 copyFileSync('.build/brand.css') 处 ENOENT 直接挂。
   * 副本与真相源的一致性由 _audit/brand-sync.mjs 守着（shared/brand/MANIFEST.json 记哈希）。 */
  const vendored = path.resolve(HERE, '..', '..', 'shared', 'brand');
  if (fs.existsSync(path.join(vendored, 'brand.css'))) return vendored;
  // 旧布局兼容：子树内 brand/（合并前形态）
  const legacy = path.resolve(HERE, '..', 'brand');
  if (fs.existsSync(path.join(legacy, 'brand.css'))) return legacy;
  // 本地布局：品牌壳在 <repo>/www.specul/（上溯四层到 repo，见 findOutDir）
  const repoGuess = path.resolve(HERE, '..', '..', '..', '..', 'www.specul');
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
 * 站点 + 分区配置：tools.specul.com 一个站，三个分区
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
 * 写 `tools.specul.com/harness/` 会让 Pages 绑定失败。
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

/* vendor 英文态映射（与 _audit/repo-indexes.mjs 的 VENDOR_EN 同一口径）：
 * 档案 vendor 保持官方语境名（中文合法），渲染英文态时在这里换。
 * 未收录的 vendor 走原样回退——渲染探针会把它报成「英文态中文残留」，
 * 这就是发现新国产厂商的机制（先建档、探针报警、补键）。 */
const VENDOR_EN = {
  '腾讯云': 'Tencent Cloud', '腾讯': 'Tencent', '字节跳动': 'ByteDance',
  '阿里巴巴（魔搭社区）': 'Alibaba (ModelScope)', '阿里巴巴': 'Alibaba',
  'Princeton / Stanford（学术团队）': 'Princeton / Stanford (academic teams)',
  'Google（Chrome DevTools 团队）': 'Google (Chrome DevTools team)',
  'Amp Frontier Corporation（原 Sourcegraph，2025-12 分拆独立）': 'Amp Frontier Corporation (spun out of Sourcegraph, Dec 2025)',
  '深度求索': 'DeepSeek', '智谱 AI': 'Zhipu AI', '百度': 'Baidu',
  '科大讯飞': 'iFlytek', '月之暗面 Moonshot AI': 'Moonshot AI',
  'MiniMax': 'MiniMax', '阶跃星辰': 'StepFun', 'Manus AI（Monica 团队）': 'Manus AI (Monica team)',
  '微软': 'Microsoft', '字节跳动（剪映团队）': 'ByteDance (Jianying/CapCut team)',
  'Jasper（原 InitML，2023 并入 Stability AI，2024-02 售予 Jasper）': 'Jasper (formerly InitML; via Stability AI 2023, sold to Jasper Feb 2024)',
  'Leonardo（2024-07 被 Canva 收购）': 'Leonardo (acquired by Canva, Jul 2024)',
  '海艺（成都海艺互娱）': 'Haiyi (Chengdu Haiyi Huyu)',
  'MiniMax（稀宇科技）': 'MiniMax (Xiyu Jizhi)', '生数科技（清华系）': 'Shengshu Technology (Tsinghua-linked)',
  '爱诗科技': 'Aishi Technology', 'OpenAI（开源）': 'OpenAI (open source)', '出门问问': 'Mobvoi',
  '秘塔科技（上海秘塔网络科技）': 'Metaso (Shanghai Metaso Network Technology)', '昆仑万维': 'Kunlun Tech',
};
const vendorBi = (v) => {
  const en = VENDOR_EN[v];
  return en ? bi(esc(v), esc(en)) : esc(v);
};
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
  // v7 S16（2026-10-21）改名：Agent 图谱→AI 工具（域名切换 tools.specul.com 在 S20）
  domain: 'tools.specul.com',
  name: 'AI 工具',
  /* 站名与 desc 的英文（2026-10-04）—— 首页 kicker 走 t-site.name、hero 走 desc，
   * 之前都是纯中文，英文态下这两处露中文。desc 改成双节点字符串。 */
  nameEn: 'AI Tools',
  tagline: '让 AI 替你干活 —— 装在哪、连什么、边界在哪',
  desc: bi('按任务分 10 大类，归三族：找现成的（编程 / 对话 / 图像 / 视频 / 音频 / 研究）、自己搭（自动化 / 框架）、接上与跑起来（MCP 工具 / 本地运行器）。各族坐标系不同，不做横向排名。',
    'Ten categories grouped into three families by task: ready-made (coding / chat / image / video / audio / research), build-your-own (automation / frameworks), and plug-in-and-run (MCP tools / local runners). The families use different coordinate systems, so this site does not rank across them.'),
  repo: 'https://github.com/speculcom/ai-handbook',
  // 站内分区导航（跨站导航在 shell.mjs 的 NAV 里，那是全站唯一定义处）
  // v8 T30：10 大类页全部上线（旧三页退役，旧 URL 走跳转桩）。
  partitions: ['coding', 'chat', 'image', 'video', 'audio', 'research', 'automation', 'framework', 'mcp', 'runner'],
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

/* v8 T7：SITES 键 = 大类名（与内容仓 tracks/<大类>/ 同名）。
 * T30 前产物落点仍走旧三页（dir 保留 ''/harness/tools），
 * T30 重写时 dir 改成大类同名、并给旧 URL 生成跳转桩。 */
/* v8 T30（2026-10-22）：站点层换轨——10 张大类页，dir = 大类同名（URL /<category>/<id>.html）。
 * 旧落点（coding 落根、framework 落 harness/、mcp 落 tools/）退役，
 * 旧 URL 由主流程末尾的跳转桩接管（meta-refresh + noindex）。
 * desc 只说「本大类比较什么维度」，不逐个列对象名——逐个列会在档案分期补齐时
 * 与实际数量不一致（曾出现「3 个对象」却列了 10 个名字）。
 * accent 只用于大类标识（part-bar 当前页色 / 卡片色条）；页面主 accent 仍是全站品牌色。 */
const SITES = {
  coding: {
    key: 'coding', navKey: 'agent', dir: 'coding', domain: SITE.domain,
    name: 'AI 编程', nameEn: 'AI coding', short: 'Coding', accent: '#8b7cf8',
    tagline: bi('装在编辑器、终端，或厂商云里', 'Installed in an editor, a terminal, or a vendor cloud'),
    desc: bi('自己能跑的成品 AI 编程工具，共用八维（模型接入 / 运行位置 / 本地文件 / 关机后任务 / 工具扩展 / 上下文 / 权限 / 适合场景）。按形态分三列——IDE 形态、CLI 形态、厂商云形态。前两者是同一产品的不同装法、不是竞争关系；厂商云形态则是另一个方向：不需要自己装，工作在别人的机器上做。',
      'Finished AI coding tools you can run yourself, compared on eight shared dimensions (model access / where it runs / local files / tasks after shutdown / tools and extensions / context / permissions / best fit). Grouped into three forms — IDE, CLI and vendor cloud. The first two are different install forms of the same product, not competitors; vendor cloud is a different direction entirely: nothing to install, the work happens on someone else\'s machine.'),
    owns: ['ide', 'cli', 'cloud'],
    splitBy: 'form',   // 按形态分三组呈现（ide/cli/cloud）——三组产品各有同产品两装法，不能合成一张表
  },
  chat: {
    key: 'chat', navKey: 'agent', dir: 'chat', domain: SITE.domain,
    name: 'AI 对话助手', nameEn: 'Chat assistants', short: 'Chat', accent: '#f5c542',
    tagline: bi('通用对话产品，含国产', 'General-purpose chat products, Chinese ones included'),
    desc: bi('通用 AI 对话助手——网页入口的多模型对话产品，国产与国际阵营都收。八维按消费级读法：背后模型是否披露、能不能选档、历史与记忆机制、账户数据用途与训练开关、产物商用条款。',
      'General AI chat assistants — multi-model web chat products, Chinese and international alike. The eight axes are read the consumer way: whether the model behind it is disclosed, whether you can pick tiers, how history and memory work, what your account data is used for, and what the terms say about commercial use.'),
    owns: ['web'],
    splitBy: null,
  },
  image: {
    key: 'image', navKey: 'agent', dir: 'image', domain: SITE.domain,
    name: 'AI 图像创作', nameEn: 'AI image creation', short: 'Image', accent: '#f472b6',
    tagline: bi('文生图与图像工作台', 'Text-to-image and image workbenches'),
    desc: bi('图像生成产品：文生图、编辑工作台、聚合模型入口。八维按消费级读法；permissions 维必答产物商用授权与训练用途——「能生成」≠「能商用」。',
      'Image-generation products: text-to-image, editing workbenches, aggregated-model front ends. The eight axes are read the consumer way; the permissions axis must answer commercial use and training consent — "you can generate it" is not "you can sell it".'),
    owns: ['web', 'cloud'],
    splitBy: null,
  },
  video: {
    key: 'video', navKey: 'agent', dir: 'video', domain: SITE.domain,
    name: 'AI 视频创作', nameEn: 'AI video creation', short: 'Video', accent: '#fb923c',
    tagline: bi('文生视频与数字人', 'Text-to-video and digital humans'),
    desc: bi('视频生成产品：文生视频、图生视频、数字人视频。数字人线（造人说话）与生成线（造世界）是两种产品，档案里互链写清差别。国产阵营的备案号口径逐家挂公示编号。',
      'Video-generation products: text-to-video, image-to-video, digital-human video. The digital-human line (making a person talk) and the generative line (making a world) are different products — the entries cross-link and spell out the difference. For Chinese products, the CAC filing number is quoted from the public registry, one by one.'),
    owns: ['web', 'cloud'],
    splitBy: null,
  },
  audio: {
    key: 'audio', navKey: 'agent', dir: 'audio', domain: SITE.domain,
    name: 'AI 音频与语音', nameEn: 'AI audio & voice', short: 'Audio', accent: '#34d399',
    tagline: bi('音乐生成、语音合成与转写', 'Music generation, TTS and transcription'),
    desc: bi('音频生成与转写产品：音乐生成、语音合成（TTS）、语音转写。声音克隆涉及人格权，permissions 维必须写清官方授权要求；开源模型（如 Whisper）按「模型不是产品」口径建档。',
      'Audio generation and transcription products: music, TTS, speech-to-text. Voice cloning touches personality rights, so the permissions axis must state the official consent requirements; open-source models (Whisper, say) are filed under the "a model is not a product" rule.'),
    owns: ['web', 'cloud', 'local-app'],
    splitBy: null,
  },
  research: {
    key: 'research', navKey: 'agent', dir: 'research', domain: SITE.domain,
    name: 'AI 搜索与研究', nameEn: 'AI search & research', short: 'Research', accent: '#38bdf8',
    tagline: bi('AI 搜索、学术检索与研究工作台', 'AI search, academic retrieval, research workbenches'),
    desc: bi('联网搜索问答、学术检索、AI 笔记/研究工作台——「帮你找答案、读文献、整理笔记」的产品。各家「深度研究」模式不单独立档（对象归 chat 档案的 capabilities 维）；纯检索 API 基础设施归 nav。',
      'Web-search Q&A, academic retrieval, and AI-native research/notebook workbenches — products that "find answers, read papers, organize notes". Each vendor\'s "deep research" mode is not filed separately (it lives in the chat entry\'s capability axes); pure retrieval-API infrastructure goes to the nav site.'),
    owns: ['web'],
    splitBy: null,
  },
  automation: {
    key: 'automation', navKey: 'agent', dir: 'automation', domain: SITE.domain,
    name: 'AI 自动化与工作流', nameEn: 'AI automation & workflows', short: 'Automation', accent: '#a3e635',
    tagline: bi('可视化搭 AI 工作流与 agent', 'Visual AI workflows and agents'),
    desc: bi('可视化/低代码搭 AI 工作流与 agent 的产品——交付物是「搭出来的应用/流程」，运行在平台的运行时上。给程序用的编排 SDK 归 framework；传统 RPA（无 LLM 主轴）归 nav。',
      'Visual / low-code platforms for building AI workflows and agents — the deliverable is the app or flow you assemble, running on the platform\'s runtime. SDKs for programmers go to frameworks; classic RPA without an LLM core goes to the nav site.'),
    owns: ['web'],
    splitBy: null,
  },
  framework: {
    key: 'framework', navKey: 'agent', dir: 'framework', domain: SITE.domain,
    name: '框架与运行时', nameEn: 'Frameworks & runtimes', short: 'Frameworks', accent: '#3b82f6',
    tagline: bi('运行时、编排框架、SDK', 'Runtimes, orchestration frameworks, SDKs'),
    desc: bi('Agent 运行时 / 编排框架 / SDK 的责任边界、状态持久化能力与权限模型。收录标准：提供 Agent 运行时或编排层、有官方文档可回溯、近 30 天有实质更新。',
      'The responsibility boundaries of agent runtimes, orchestration frameworks and SDKs, plus state persistence and permission models. Admission criteria: provides an agent runtime or orchestration layer, has official documentation that can be traced back, and has substantive updates within the last 30 days.'),
    owns: ['harness'],
    splitBy: 'family',   // 按抽象层分组：原语型 / 编排型 / 开箱型
  },
  mcp: {
    key: 'mcp', navKey: 'agent', dir: 'mcp', domain: SITE.domain,
    name: 'MCP 工具', nameEn: 'MCP tools', short: 'MCP', accent: '#22d3c5',
    // 「你装，它调」——用户动作是装不是调，这是这站正确的表述
    tagline: bi('缺什么，装什么 —— 给 agent 装的 MCP 工具', 'Fill the gap — MCP tools an agent can install'),
    desc: bi('MCP server 的权限范围、传输方式与输出可用性。收录标准：已发布为可安装的 MCP server、有官方仓库或文档可回溯、近 30 天有实质更新。这里是能力缺口查表，不是选型对比。',
      'The permission scope, transport and output usability of MCP servers. Admission criteria: released as an installable MCP server, has an official repository or documentation that can be traced back, and has substantive updates within the last 30 days. This is a capability-gap reference table, not a selection comparison.'),
    owns: ['mcp'],
    splitBy: null,
  },
  runner: {
    key: 'runner', navKey: 'agent', dir: 'runner', domain: SITE.domain,
    name: '本地模型运行器', nameEn: 'Local model runners', short: 'Runners', accent: '#94a3b8',
    tagline: bi('在自己机器上跑开源模型', 'Run open-weight models on your own machine'),
    desc: bi('本地模型运行器：把开源权重模型跑在自己的机器上——Ollama / LM Studio / llama.cpp / vLLM 这类。档案的 model_access / runtime 维写「格式 × 量化档」口径，具体量化数据在 models 站，两边互链不重复。',
      'Local model runners — open-weight models running on your own machine (Ollama / LM Studio / llama.cpp / vLLM class). The model_access / runtime axes are written in "format × quant tier" terms; the per-tier numbers live on the models site, cross-linked rather than duplicated.'),
    owns: ['local-app', 'cli'],
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

/* v8 T7（2026-10-21）：S43 任务化入口退役——D2 定案任务入口取消，
 * sites/tasks.json 已删、档案 tasks: 字段回灌即硬失败（validate 守卫）。
 * 任务卡与 ?task= 筛选随之下线（T30 重写站点层时不再回来）。 */
const AGENT_FILTER_JS = fs.readFileSync(path.join(HERE, 'agent-filter.js'), 'utf8');
/** 每个赛道一行；说明文字保留旧的手写语境（那是解读，不是数字） */
const COVERAGE_BY_TRACK = Object.fromEntries(
  Object.entries(COMPLETENESS.byTrack).map(([t, v]) => [t, { done: v.done, total: v.total }]),
);
/** v8 T30：10 大类固定顺序（categories.md §2.1 的编号序）。 */
const TRACK_KEYS_10 = ['coding', 'chat', 'image', 'video', 'audio', 'research', 'automation', 'framework', 'mcp', 'runner'];
/* v8 T7：完整度行按 10 大类（completeness.mjs 的 byTrack 键已换大类名）。
 * v8 T30：10 张大类页全部上线——每个大类页展示自己那一行。 */
const COVERAGE_ROWS = Object.fromEntries(TRACK_KEYS_10.map((k) => [k, [k]]));
/* 每个赛道的说明文字（那是解读，不是数字——手写但要如实反映该大类的核验现实）。 */
const COVERAGE_NOTE = {
  coding: bi('多为闭源产品，索引策略等细节官方不公开；CLI 类官方文档相对完整', 'Mostly closed-source, so details like indexing strategy are not disclosed; CLI entries have better official docs'),
  framework: bi('编排框架的版本演进快、接口变化多，逐条核验成本最高 —— 也是全站最低的一档', 'Orchestration frameworks move fast and change APIs often, so these are the most expensive to verify — and the lowest fill rate on the site'),
  mcp: bi('官方 README 信息充分，绝大多数维度可直接引述', 'Official READMEs cover most of it, so most dimensions can be quoted directly'),
  chat: bi('消费级对话产品对模型路由、记忆机制披露少；帮助中心与官方公告是最可核验的渠道', 'Consumer chat products disclose little about model routing or memory internals; help centers and official announcements are the most verifiable channels'),
  image: bi('创作产品的条款密度高（商用与训练授权是重点），模型与数据细节常不公开', 'Creation products have dense terms (commercial and training licensing matter most); model and data details often stay undisclosed'),
  video: bi('同上，另加国产阵营的备案编号口径——逐家挂公示批次', 'Same as above, plus CAC filing numbers for Chinese products — quoted batch by batch from the public registry'),
  audio: bi('声音克隆的授权条款必须逐家读原文；开源模型（Whisper 等）文档反而最全', 'Voice-clone consent terms have to be read one by one; open-source models (Whisper and friends) actually have the fullest docs'),
  research: bi('检索与排序机制大多不公开；备案号、官方公告与条款页是最可核验的部分', 'Retrieval and ranking internals are mostly undisclosed; filing numbers, official announcements and terms pages are the verifiable parts'),
  automation: bi('平台产品的功能文档充分，运行时内部与额度计费细节变动频繁', 'Platform feature docs are solid; runtime internals and quota mechanics change often'),
  runner: bi('开源项目文档最完整，但版本演进快 —— 核验快照最容易过期', 'Open-source projects document the most, but they release fast — these snapshots go stale first'),
};
/* v8 T7：大类名（中英）——完整度表与分区导航共用。 */
const CAT_LABEL = {
  coding: ['AI 编程', 'AI coding'],
  chat: ['通用对话', 'General chat'],
  image: ['图像生成', 'Image generation'],
  video: ['视频生成', 'Video generation'],
  audio: ['音频生成', 'Audio generation'],
  research: ['深度研究', 'Deep research'],
  automation: ['自动化编排', 'Automation'],
  framework: ['框架与运行时', 'Frameworks & runtimes'],
  mcp: ['MCP 工具', 'MCP tools'],
  runner: ['本地运行器', 'Local runners'],
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

/* v8 T7：目录 = 大类（tracks/coding、tracks/framework、tracks/mcp）。
 * 旧 TRACK_DIRS（agents/harness/tools）退役。 */

function loadTrack(partKey) {
  /* 按大类读档案。ide 与 cli 的档案同处 tracks/coding/，
   * 但 form: 值不同 —— 不能只按目录过滤，否则会丢三组里各一份的一半。
   * 做法：读该大类目录下的products，用 frontmatter 的 form 判归属
   *（SITES[partKey].owns），目录外的档案自然不会被读到。 */
  const site = SITES[partKey];
  const dir = path.join(DATA, 'tracks', partKey, 'products');
  if (!fs.existsSync(dir)) return { entries: [], errors: [`目录不存在: ${dir}`] };
  const entries = [];
  const errors = [];
  const seen = new Set();
  // 归属：大类 → 它收哪些 form 值的档案
  const OWNED = site.owns;

  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md')).sort()) {
    const abs = path.join(dir, f);
    const raw = fs.readFileSync(abs, 'utf8');
    const fm = parseFrontmatter(raw);
    const rel = path.relative(DATA, abs).replace(/\\/g, '/');
    if (!fm) { errors.push(`${rel} · frontmatter 解析失败`); continue; }
    if (OWNED && !OWNED.includes(fm.form)) continue;

    const id = fm.id || f.replace('.md', '');
    if (f.replace('.md', '') !== id) errors.push(`${rel} · 文件名与 id 不符`);
    if (seen.has(id)) errors.push(`${rel} · id 重复: ${id}`);
    seen.add(id);
    // 断言：form 值必须属于该大类收的集合（v8 T7：track: 字段已退役，form: 是唯一形态字段）
    if (!OWNED.includes(fm.form)) errors.push(`${rel} · form 字段(${fm.form})不属于大类 ${partKey}`);

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
      family: fm.family || '',  // framework 分层；validate 强制必填，页面需按它分组呈现
      form: fm.form, // v8 T7：形态 8 值枚举（ide/cli/cloud/harness/mcp/web/app/local-app），首页按它分形态
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
  /* v8 T7：当前目录名 = 10 大类（tracks/{coding,chat,image,video,audio,research,automation,framework,mcp,runner}） */
  coding: 'coding', chat: 'chat', image: 'image', video: 'video', audio: 'audio',
  research: 'research', automation: 'automation', framework: 'framework', mcp: 'mcp', runner: 'runner',
  /* 旧目录名（v4 三分区时代 tracks/{agents,harness,tools} 与更早的 ide/cli）——
   * 存量正文里还有，正则必须同时认；两种写法都要能重写到正确的大类落点。
   * ⚠ T30 前只有 coding/framework/mcp 三页有产物，其余大类的档案还没有产物页——
   *   存量正文目前也没有链向它们的链接（已扫），T30 后自然对。 */
  agents: 'coding', ide: 'coding', cli: 'coding',
  harness: 'framework',
  tools: 'mcp',
};
/* v8 T30：渲染上下文。mdLinks()/rewriteInternal() 是各处共用的，
 * 但「裸 ../_category.md 指哪个大类首页」取决于**发起页当前在哪个大类**——
 * 每个渲染函数入口处设 CTX.partKey，mdLinks 按它解析裸写法。
 * ⚠ 单线程构建（顺序渲染），不存在竞态；漏设时回退 coding 会**静默指错**，
 *   所以每个 render* 入口都必须设。 */
const CTX = { partKey: 'coding' };
function rewriteInternal(href) {
  // 1. 跨大类：指向另一个大类的档案
  let m = /^(?:\.\.\/)+(coding|chat|image|video|audio|research|automation|framework|mcp|runner|agents|harness|tools|ide|cli)\/products\/([A-Za-z0-9._-]+)\.md$/.exec(href);
  if (m) {
    // v8 T30：10 大类全部有产物页（旧「T30 前无产物 → 原样输出」兜底退役，
    // 原样输出 .md 只会把死链漏到站上）。TRACK_TO_PART 的旧目录名键全部映射到 10 大类。
    const s = SITES[TRACK_TO_PART[m[1]]];
    return `/${s.dir}/${m[2]}.html`;
  }
  // 2. 同大类互引：./x.md 与裸 x.md 两种写法都见过
  m = /^(?:\.\/)?([A-Za-z0-9._-]+)\.md$/.exec(href);
  if (m) return `./${m[1]}.html`;
  /* 3. v8 T7：实测协议文档 —— 站内没有，链到内容仓的**当前路径**。
   *    ⚠ ai-handbook 仓里 tools 子树在 `tools/` 下（v7 合并后），
   *    旧代码写的 `blob/main/tracks/agents/tasks/...` 是合并前的旧仓布局残留，
   *    在现仓里是 404 —— 一并修正为 `tools/protocols/<大类>/_protocol.md`。 */
  m = /^(?:\.\.\/)+protocols\/([a-z-]+)\/(_protocol\.md)$/.exec(href);
  if (m) return `${SITE.repo}/blob/main/tools/protocols/${m[1]}/${m[2]}`;
  /* ⚠ **大类索引 `_category.md`** 要映射到**站点自己的大类首页**（v8 T7 接管旧 `_track.md` 规则）。
   *   `_category.md` 只存在于内容仓，但它的**语义目标**正是站上的大类列表页 ✓：
   *     `../_category.md`          → 当前大类首页（v8 T30：大类名从发起页所在目录推）
   *     `../../mcp/_category.md`   → `/mcp/index.html`
   *   ⚠ 判据要**先**匹配带大类名的形态，再匹配裸 `_category.md` ——
   *   否则 `../../mcp/_category.md` 会被后一条吃掉、当成当前大类 ✗。
   * ⚠ v8 T30：裸 `_category.md` 的落点**不再固定 /index.html**——coding 不再落站点根，
   *   站点根现在是首页（三族 10 卡）。裸写法只能从**发起页所在的大类目录**推，
   *   所以 mdLinks() 要把当前大类传进来（CTX.partKey），否则跨大类正文里的
   *   `../_category.md` 会全指到 coding 页 ✗（zed.md 实测有一处）。 */
  m = /^(?:\.\.\/)+([a-z-]+)\/_category\.md$/.exec(href);
  if (m && TRACK_TO_PART[m[1]]) {
    const s = SITES[TRACK_TO_PART[m[1]]];
    return `/${s.dir}/index.html`;
  }
  m = /^(?:\.\.\/)+_category\.md$/.exec(href);
  if (m) return `/${SITES[CTX.partKey].dir}/index.html`;
  /* 旧 `_track.md` 形态（存量正文可能还有）—— 同义映射到当前大类首页。 */
  m = /^(?:\.\.\/)+([A-Za-z]+)\/_track\.md$/.exec(href);
  if (m && TRACK_TO_PART[m[1]]) {
    const s = SITES[TRACK_TO_PART[m[1]]];
    return `/${s.dir}/index.html`;
  }
  m = /^(?:\.\.\/)+_track\.md$/.exec(href);
  if (m) return `/${SITES[CTX.partKey].dir}/index.html`;
  /* `METHODOLOGY.md` 同样只在内容仓里（实测 `windsurf.html -> ../METHODOLOGY.md`）✗ → 链回内容仓 ✓。
   * v8 T7 修正：ai-handbook 仓里它在 `tools/METHODOLOGY.md`（旧代码写 tracks/ 是合并前布局）。 */
  m = /^(?:\.\.\/)+METHODOLOGY\.md$/.exec(href);
  if (m) return `${SITE.repo}/blob/main/tools/METHODOLOGY.md`;
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
  /* coding 大类的引导由原ide + cli 两份合并而成（v8 T7：键随大类改名）。
   * 合并的关键：**分类轴从「形态」换成「你要它替你干多少事」**——
   * 原来 ide 站按形态分、cli 站按权限确认粒度分，两套轴放在一个站里会打架。
   * 新轴的好处：IDE 形态与 CLI 形态都能落进去，且回答的是访客真正在问的问题。 */
  coding: {
    title: '先回答一件事：你要它替你干多少事',
    lede: '这一大类 32 份档案，<strong>分三个方向</strong>：26 份是装在自己机器上的（IDE 形态 14 + CLI 形态 12，其中<strong>五组是同一个产品的两种装法</strong>——Aider、Claude Code、Codex、Copilot、Cursor 各有一份 IDE 形态和一份 CLI 形态，它们不是竞品，差别在<strong>装在哪、怎么被唤起、能不能塞进脚本</strong>）；另 6 份是<strong>厂商云形态</strong>——本机什么都不装，工作在别人的机器上做。',
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
  mcp: {
    title: '先回答一件事：你到底缺什么能力',
    lede: 'MCP 不是「让 AI 更聪明」，是<strong>给 AI 接上它本来够不到的东西</strong>。如果你要的只是聊天和写代码，你不需要它。<strong>你装，它调</strong>——这一大类收的 server 分四种出身：MCP 官方 reference server、由各自官方团队维护的（Playwright / Context7）、厂商官方自营的（GitHub 自己的 github-mcp-server），以及本站按收录标准纳入的社区 server。每份档案的出身与权限范围写在 scope 维里。',
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
  framework: {
    title: '先回答一件事：你要不要自己搭',
    lede: '这是本大类存在的唯一理由。<strong>如果现成产品已经够用，正确答案是「不要搭」</strong>——那就去看 <a href="/coding/">AI 编程</a> 那一类，不用往下看。真要自己搭，第一步是认清你要的抽象层。',
    steps: [
      ['我要最细的控制权，文件系统我自己管', '<strong>原语型</strong>（primitives-only）', '只给你 agent loop 的原语，不替你决定文件系统 / 规划 / 记忆怎么做 —— OpenAI Agents SDK 是这一类。'],
      ['我要一个成熟 CLI 直接变成 API 对象', '<strong>包装既有 CLI</strong>', 'Claude Agent SDK 捆绑完整 CLI，默认给全工具无沙箱 —— 你省了造轮子，但权限模型是继承来的。'],
      ['我要开箱即跑的通用长任务助手', '<strong>batteries-included</strong>', 'Deep Agents 官方自述 opinionated：预置更多东西，也替你做了更多决定。'],
      ['流程要图、要能中断恢复、要多 Agent 协作', '<strong>编排框架</strong>：LangGraph / Google ADK / CrewAI', 'LangGraph 的落盘粒度最明确（每 superstep 存一次图状态），ADK 的图执行引擎最完整，CrewAI 用「角色分工 + 事件流程」两套抽象。'],
      ['我要它常驻、跨平台、能定时跑', '<strong>平台型 / 常驻型</strong>：OpenHands / Hermes Agent', 'OpenHands 是带 Web UI 的自托管控制中心；Hermes 更进一步——能挂 Telegram/Discord/Slack/WhatsApp/Signal/Email 六平台，还能 cron 无人值守。'],
      ['我只想要个工具用，不想维护', '不该来这个大类', '这属于「不自建」那一侧，见 <a href="/coding/">AI 编程</a>。'],
    ],
    foot: '⚠ 三个最容易踩的坑：<strong>「状态」和「上下文」不是一回事</strong>——压缩上下文会丢信息，状态持久化才是长期可靠运行的前提（各家在这两层的完备程度差别很大）；<strong>「provider 无关」不等于「本地模型可用」</strong>（Claude Agent SDK 只支持 Claude，CrewAI 则点名支持 Ollama）；<strong>编排框架不给沙箱</strong>——权限边界要自己确认。',
  },
};

/* S44（2026-10-20）边界声明三句 → v8 T7 换口径：
 * D2/D3 定案后「纯聊天不走八维」已经不成立——chat/image/video/audio 也是八维档案。
 * 三句改答：收什么（10 大类）/ 怎么组织（大类=目录，形态=form）/ 什么格式（核验快照）。
 * 设计定案不变：三张分区索引页**同一份文案**（本项目头号疾病是同一件事两个口径）。
 *  - 版式走 brand.css 的 .t-boundary（宪章 1）。 */
function boundarySection(partKey) {
  const LINES = [
    [
      '<strong>本站按 10 大类收录 AI 产品。</strong>编程、对话、图像、视频、音频、研究、自动化、框架、MCP 工具、本地运行器——每类都有明确的收录标准，写在各大类的目录页里。',
      '<strong>This site files AI products into 10 categories.</strong> Coding, chat, image, video, audio, research, automation, frameworks, MCP tools and local runners — each with explicit admission criteria, written on the category page itself.',
    ],
    [
      '<strong>大类看目录，形态看字段。</strong>一个产品属于哪一类由收录边界决定；它怎么装进你的工作流（IDE / CLI / 厂商云 / 框架 / MCP…）是另一根独立的轴。',
      '<strong>Category comes from the shelf, form from a field.</strong> Which category a product belongs to is decided by admission boundaries; how it installs into your workflow (IDE / CLI / vendor cloud / framework / MCP…) is a separate axis.',
    ],
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

/* v8 T7：S43 任务化入口（taskSection）整体退役——D2 定案取消任务入口。 */

/* v8 T7：S45 轻档案区（lightSection）整体退役——D3 定案全部升八维，
 * light/light.json 已删（备份 _archive/v8-evidence/light-2026-10-20.json），
 * 对话/创作产品都是八维档案，不再有「三要素卡」这一层。 */

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
  if (partKey !== 'mcp' || !guides.length) return '';   // v8 T7：guides 落 mcp 大类（产物仍 /tools/guides/，T30 换）
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
  CTX.partKey = site.key;   // v8 T30：正文里的 .md 链接按当前大类解析
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
    canonical: `https://${SITE.domain}/mcp/guides/${g.id}.html`,
    /* ⚠ assetPrefix 是 **两级**：guide 详情页落在 /mcp/guides/<id>.html（v8 T30：
     * 落点随大类改名 tools/→mcp/），比 mcp/ 下的档案页深一层 —— '../' 会指向 /mcp/
     * 这个不存在 brand.css 的目录（2026-10-20 deadlink 实测抓到：6 页全部样式全掉）。
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
  /* v8 T30：10 张大类页。一行放 10 项带 tagline 会撑爆——tagline 移到 title 提示，
   * 视觉只留大类名（short）。配色仍走 --pa token（每大类一份，两套主题各一值）。 */
  return `    <nav class="part-bar" aria-label="站内大类">
      <div class="container">
${SITE.partitions.map(k => {
    const s = SITES[k];
    const cur = k === current ? ' aria-current="page"' : '';
    /* tagline 是 bi() 双节点，进 title 属性要取中文纯文本（属性里放 HTML 是垃圾）。 */
    const tip = plainTagline(s.tagline);
    return `        <a href="/${pfx(s)}"${cur} title="${esc(tip)}" style="--pa:var(--pa-${s.key})"><b>${esc(s.short)}</b></a>`;
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
  /* v8 T7：form 8 值枚举补齐（chat/image/video/audio 等新大类档案用这三个） */
  web:   ['网页服务', 'Web service'],
  app:   ['桌面/移动应用', 'Desktop / mobile app'],
  'local-app': ['本机应用', 'Local app'],
  harness: ['框架 / SDK', 'Framework / SDK'],
};
const FAMILY_SHORT = {
  'coding-base':     ['编程底座', 'Coding base'],
  orchestration:    ['编排框架', 'Orchestration'],
  'general-harness': ['通用 Harness', 'General harness'],
};

function renderIndex(site, partKey, entries) {
  CTX.partKey = partKey;   // v8 T30：正文里的 .md 链接按当前大类解析
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
    return `        <article class="card" style="--card-accent:${esc(e.accent || site.accent)}" data-track="${esc(e.form || '')}" data-family="${esc(e.family || '')}" data-conf="${esc(e.confidence || '')}" data-cn-origin="${esc((e.cn || {}).origin || '')}" data-cn-direct="${esc((e.cn || {}).direct || '')}" data-cn-filing="${esc((e.cn || {}).filing || '')}" data-done="${pc.done}" data-total="${pc.total}" data-name="${esc(e.name)}" data-blob="${esc(blob)}">
          <div class="card-top">
            <div class="mark" aria-hidden="true">${esc(e.mark || e.name.slice(0,2))}</div>
            <div class="card-id">
              <h3><a href="./${esc(e.id)}.html">${bi(esc(e.name), esc(e.nameEn || e.name))}</a></h3>
              <div class="vendor">${vendorBi(e.vendor)}</div>
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
    const pick = (e) => (splitBy === 'form' ? e.form : e.family);
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
    /* v8 T7：splitAttr 是**卡片 HTML 属性名**（data-track，筛选脚本按它比对）；
     * entries 里的字段名已随 frontmatter 改名（track→form）——两个名字必须分开，
     * 否则 splitVals 取不到值、分组下拉整个不渲染（agent-filter 实测抓到）。 */
    const splitAttr = splitBy === 'form' ? 'track' : splitBy === 'family' ? 'family' : null;
    const splitField = splitBy === 'form' ? 'form' : splitBy === 'family' ? 'family' : null;
    const splitVals = splitField ? new Set(entries.map((e) => e[splitField]).filter(Boolean)) : new Set();
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
    /* v8 T7：任务筛选（S43）退役——tasks.json 已删、tasks: 字段回灌即硬失败。 */
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

  // 完整度表按大类取自己那一行；说明文字是解读（顶层 COVERAGE_NOTE），数字来自实时计算
  const covRows = (COVERAGE_ROWS[partKey] || []).filter((t) => COVERAGE_BY_TRACK[t]);
  const covTable = covRows.length ? `          <table class="src is-flush mb-3">
            <thead><tr><th>${bi('大类','Category')}</th><th>${bi('已补齐','Filled')}</th><th>${bi('说明','Meaning')}</th></tr></thead>
            <tbody>
${covRows.map(t => {
    const c = COVERAGE_BY_TRACK[t];
    const lbl = CAT_LABEL[t] || [t, t];
    return `              <tr><td class="nw">${bi(lbl[0], lbl[1])}</td>
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
                <td class="td-vendor">${biLabel(FORM_LABEL[e.form], e.form) || biLabel(FAMILY_SHORT[e.family], e.family)}</td>
                <td class="td-vendor">${vendorBi(e.vendor)}</td>
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
            <li>${bi('<strong>不同族不混排。</strong>找现成的、自己搭的、接上与跑起来的是三种角色，坐标系不同；硬合成一张总表只会制造假的可比性。', '<strong>Families are not mixed.</strong> Ready-made tools, things you build yourself, and plug-in-and-run components are three different roles with different coordinate systems; forcing them into one master table would manufacture false comparability.')}</li>
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
            下表实时计算（本页档案最后核验日 ${latestVerified}）：
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
          <p>${bi('全部数据来自开源仓库', 'All data comes from the open-source repository')} <a href="${SITE.repo}" target="_blank" rel="noopener" class="link-brand">speculcom/ai-handbook</a>（CC BY 4.0）。</p>
          <p>${bi('每个条目都是纯 Markdown + frontmatter，含维度记录、证据链', 'Every entry is plain Markdown plus frontmatter, carrying dimension records and an evidence chain')}接、核验日与可信度标记。仓库内含：</p>
          <ul>
            <li><code>tools/METHODOLOGY.md</code> —— 方法论总纲与核心规则</li>
            <li><code>tools/axes/</code> —— 每个维度的定义与判定标准（含正反例）</li>
            <li><code>tools/SCHEMA.md</code> —— 数据格式规范与构建校验规则</li>
            <li><code>tools/protocols/&lt;大类&gt;/_protocol.md</code> —— 实测协议(${bi('<strong>尚未执行</strong>', '<strong>not yet run</strong>')}${bi('，故本站暂无实测结论', ', so this site has no measured conclusions')})</li>
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
    // v8 T30：10 大类全部落一级子目录（/<cat>/），assetPrefix 恒为 '../'
    assetPrefix: '../',
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
  CTX.partKey = partKey;   // v8 T30：正文里的 .md 链接按当前大类解析
  const base = pfx(site);
  const isTools = site.owns.includes('mcp');
  // 8 维度读 axes 块；MCP 特有 3 维度读 mcp 块
  const axisKeys = AXES.map(([k, label]) => ({ k, label, v: e.axes[k] }));
  if (isTools) {
    for (const [k, label] of MCP_AXES) axisKeys.push({ k, label, v: e.mcp[k] });
  }
  /* v8 T30：axes 块里的**可选附加维**也要渲染——`name_history`（改名史，wenxin 首例）
   * 此前「采集了从不渲染」（本仓第 4 次同病）。structure-fidelity 按块数对账，
   * 源侧数了它、产物侧没有 → 报「结构不保真」。判据反过来用：
   * axes 里出现八维之外的键，就必须在这里有落点。 */
  const EXTRA_AXES = { name_history: ['改名史', 'Name history'] };
  for (const [k, label] of Object.entries(EXTRA_AXES)) {
    if (e.axes[k]) axisKeys.push({ k, label: label[0], labelEn: label[1], v: e.axes[k] });
  }
  /* 一个维度单元格的正文渲染（2026-10-09 加）。
   * 为什么需要它：解析器修好之后（保留空行，见 parseFrontmatter 里 folded 的注释），
   * 维度正文里出现了「空行分段的段落」与「`- ` 开头的清单」两种结构。
   * 直接丢给 mdLinks() 会把它们压成一段流水文字 —— 清单就退化成正文里的「- xxx - yyy」，
   * 而这正是 _plan/文风规范-说人话.md 第 2 条要消灭的形态。
   * 这里用**最小**的块级规则（段落 / 无序清单 / 引用块 / 空行），不引入完整 markdown 解析。*/

  const axesHtml = axisKeys.map(({ label, labelEn, k, v }) => {
    return `        <div class="axis">
          <dt>${bi(label, labelEn || AXES_EN[k]?.name || label)}</dt>
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
    // ⚠ v8 T7：嵌套子清单（`  - 补充行`）与续行必须并入上一项的 reason ——
    //   原写法只认「带链接的行」，llamaindex/ag2 的对照补充整段被丢
    //   （_render-parity 实测 47%/72%——真截断，不是守卫误报）。
    const items = [];
    for (const l of (e.sec.related || '').split(/\r?\n/)) {
      const m = /^\s*[-*]\s*(\[[^\]]+\]\([^)]+\.md\))\s*—\s*(.+)$/.exec(l);
      if (m) { items.push(m); continue; }
      if (items.length && l.trim()) {
        // 续行/嵌套行：并进上一项的理由（用空格连接，mdLinks 会渲染其中的标记）
        items[items.length - 1][2] += ' ' + l.replace(/^\s*[-*]\s*/, '').trim();
      }
    }

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

  // 面包屑：站 → 大类 → 本页。
  // 大类链接写绝对路径（/coding/），因为本页在二级目录里。
  // v8 T30：10 大类都在 part-bar 里横向可达，面包屑只纵向摆「站 → 本大类 → 本页」三级——
  // 把 10 个大类全塞进面包屑既挤又没信息量（当前页之外的 9 个不是这条路径的祖先）。
  const crumb = `      <nav class="crumbs" aria-label="面包屑">
        <a href="https://${SITE.domain}/">${esc(SITE.name)}</a>
        <span aria-current="page">${esc(site.short)}</span>
      </nav>`;

  const body = `    <div class="container detail">
${crumb}
      <a class="back" href="./">← ${esc(site.short)}</a>

      <div class="detail-head">
        <div class="mark" style="--card-accent:${esc(e.accent || site.accent)}" aria-hidden="true">${esc(e.mark || e.name.slice(0,2))}</div>
        <div>
          <h1>${bi(esc(e.name), esc(e.nameEn || e.name))}</h1>
          <div class="vendor is-caps">${vendorBi(e.vendor)}</div>
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
        ${(() => {
          /* v8 T7：清单前的**引导段与引用块**也要渲染。
           * 原渲染器只出 <ul>——windsurf 的「以下各项本次未核验，confidence 因此是
           * partial 而非 verified：」与 everything 的「A6.2 已核对…升回 verified」
           * 整段消失（_render-parity 实测 59%/37%——这是真截断，不是守卫误报）。
           * 做法：非列表行按原顺序合成前置块走 blockMd，列表行进 <ul>。 */
          const lead = [];
          const items = [];
          for (const raw of e.sec.unknowns.split(/\r?\n/)) {
            const li = /^\s*[-*]\s+(.*)$/.exec(raw);
            if (li) { items.push(li[1]); continue; }
            if (items.length && raw.trim()) { items[items.length - 1] += ' ' + raw.trim(); continue; }
            lead.push(raw);
          }
          const leadHtml = lead.join('\n').trim() ? blockMd(lead.join('\n')) : '';
          return `${leadHtml}\n        <ul>\n${items.map(t => `          <li>${mdLinks(t)}</li>`).join('\n')}\n        </ul>`;
        })()}
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
        ${bi('本页由', 'This page is generated from the')} <a href="${SITE.repo}" target="_blank" rel="noopener" class="link-brand">ai-handbook</a> ${bi('数据层生成（CC BY 4.0）。', 'data layer (CC BY 4.0).')}
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
    // v8 T30：详情页全部落一级子目录（/<cat>/<id>.html），assetPrefix 恒为 '../'
    assetPrefix: '../',
  });
}

/* ── v8 T30：站点首页（三族 10 卡）──────────────────────────────────────
 * 首页不是「第 11 个索引页」，是**目录页**：读者先选族（找现成的 / 自己搭 /
 * 接上与跑起来），再进大类。三族表照 categories.md「三族分组」一节——
 * 那是设计真相源，这里只是投影（R4：卡上的对象数/verified 数全部从 loaded 算）。
 * ⚠ 十张大类卡必须进 <main>：cross-site-links 的孤岛判定只算正文入链，
 *   大类页若只活在 part-bar（导航区）里，10 页全算孤岛 → 孤岛率爆线。 */
const FAMILIES = [
  { key: 'ready', name: '找现成的', nameEn: 'Ready-made',
    ask: '「有没有能直接用的？」', askEn: '"Is there something I can use directly?"',
    cats: ['coding', 'chat', 'image', 'video', 'audio', 'research'] },
  { key: 'build', name: '自己搭', nameEn: 'Build your own',
    ask: '「我想自己搭一个？」', askEn: '"I want to build one myself?"',
    cats: ['automation', 'framework'] },
  { key: 'plug', name: '接上与跑起来', nameEn: 'Plug in and run',
    ask: '「怎么给它接工具 / 在自己机器上跑模型？」', askEn: '"How do I hook tools into an agent, or run models on my own machine?"',
    cats: ['mcp', 'runner'] },
];
/* 大类卡的 mark 字符（单字比两个拉丁字母辨识度高；mcp 保留协议名）。 */
const CAT_MARK = { coding: '编', chat: '话', image: '图', video: '视', audio: '音', research: '搜', automation: '流', framework: '框', mcp: 'MCP', runner: '跑' };

function renderHome(loaded) {
  CTX.partKey = 'coding';   // 首页正文没有 .md 链接，仅为一致性设
  const byKey = Object.fromEntries(loaded.map((x) => [x.partKey, x]));
  const total = loaded.reduce((n, x) => n + x.entries.length, 0);
  const verified = loaded.reduce((n, x) => n + x.entries.filter((e) => e.confidence === 'verified').length, 0);
  const latestVerified = loaded
    .flatMap((x) => x.entries.map((e) => e.lastVerified).filter(Boolean))
    .sort().pop() || '未标注';

  const catCard = (k) => {
    const s = SITES[k];
    const { entries } = byKey[k];
    const v = entries.filter((e) => e.confidence === 'verified').length;
    return `          <article class="card" style="--card-accent:${esc(s.accent)}" data-cat="${k}">
            <div class="card-top">
              <div class="mark" aria-hidden="true">${esc(CAT_MARK[k] || s.short.slice(0, 2))}</div>
              <div class="card-id">
                <h3><a href="/${s.dir}/">${bi(esc(s.name), esc(s.nameEn))}</a></h3>
                <!-- tagline 本身就是 bi() 双节点（源码常量，无注入风险），直接透传 -->
                <div class="vendor">${s.tagline}</div>
              </div>
            </div>
            <p class="tagline">${bi(`${entries.length} 份档案 · ${v} 份已完整核验`, `${entries.length} entries · ${v} fully verified`)}</p>
            <div class="card-foot">
              <span class="t-state ${v === entries.length ? 'is-ok' : 'is-warn'}">${bi('核验快照', 'Snapshot')}</span>
              <a class="more" href="/${s.dir}/" aria-label="${esc(s.name)}">${bi('进入 →', 'Browse →')}</a>
            </div>
          </article>`;
  };

  const famBlocks = FAMILIES.map((f) => {
    const n = f.cats.reduce((s, k) => s + byKey[k].entries.length, 0);
    return `        <div class="fam-block" data-family="${f.key}">
          <div class="fam-head">
            <h3>${bi(f.name, f.nameEn)} <span class="fam-n">${n}</span></h3>
            <p>${bi(f.ask, f.askEn)}</p>
          </div>
          <div class="grid">
${f.cats.map(catCard).join('\n')}
          </div>
        </div>`;
  }).join('\n');

  const body = `    <section class="hero">
      <div class="container">
        <p class="kicker">${bi(esc(SITE.name), esc(SITE.nameEn))}</p>
        <h1 class="t-hero">${bi(esc(SITE.name), esc(SITE.nameEn))}</h1>
        <p class="lede">${SITE.desc}</p>
        <div class="hero-meta">
          <span><b>${total}</b> ${bi('个对象','objects')}</span>
          <span><b>${SITE.partitions.length}</b> ${bi('个大类','categories')}</span>
          <span><b>${verified}</b> ${bi('个已完整核验','fully verified')}</span>
          <span>${bi('最后核验','Last checked')} <b>${latestVerified}</b></span>
        </div>
      </div>
    </section>

${partitionBar('')}

    ${boundarySection('home')}

    <section class="section">
      <div class="container">
        <h2>${bi('先说你在找什么','Start with what you are looking for')}</h2>
        <p class="section-desc">${bi('三族 = 三种读者的问题。族不是目录层——目录是 10 个大类；族只是首页的摆法，让你先对上自己的那一问。', 'Three families = three reader questions. The families are not a directory layer — the directories are the 10 categories; they are just how the home page is arranged, so you can find your question first.')}</p>
${famBlocks}
      </div>
    </section>

    <section class="section status-band">
      <div class="container">
        <div class="status-inner">
          <div class="status-mark" aria-hidden="true">!</div>
          <div>
            <h2>${bi('本站是「核验快照」，不是实测榜单', 'This site is a verification snapshot, not a benchmark chart')}</h2>
            <p>${bi('每份档案的每个字段都能回到官方一手源核对，附来源类型与核验日期。但<strong>我们还没有在同一批任务上实测过这些工具</strong>——所以本站给的是<strong>能力边界与证据</strong>，不给总分排名。', 'Every field of every entry traces back to an official first-hand source, with source kind and checked date. But <strong>we have not yet run these tools on the same batch of tasks</strong> — so this site gives <strong>capability boundaries and evidence</strong>, not an overall ranking.')}</p>
            <p class="t-sm">${bi('「未知」是合法答案——查不到就写未知并说明原因，不用推测填充。', '"Unknown" is a legitimate answer — if it cannot be found, we say so and explain why, instead of filling the gap with guesses.')}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>${bi('八个维度，每格都能回溯', 'Eight dimensions, every cell traceable')}</h2>
        <p class="section-desc">${bi('档案都在同一坐标系下被描述（MCP 大类另有 3 个特有维度）。点开任一对象，每一格下面都有官方源链接与核验日期——不认同可以自己回去查。', 'Entries are described on one coordinate system (MCP servers carry 3 additional dimensions). Open any object and every cell carries an official source link and a checked date — disagree and verify it yourself.')}</p>
        <div class="t-mesh axis-mesh">
${AXES.map(([k, label], i) => `          <div class="axis-cell">
            <span class="t-index">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="axis-name">${bi(label, AXES_EN[k]?.name || label)}</h3>
            <p class="axis-ask">${bi(AXIS_DESC[k] || '', AXIS_DESC_EN[k] || AXIS_DESC[k] || '')}</p>
          </div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="panel">
          <h2>${bi('数据来源与复核方式','Sources and how to re-check them')}</h2>
          <p>${bi('全部数据来自开源仓库', 'All data comes from the open-source repository')} <a href="${SITE.repo}" target="_blank" rel="noopener" class="link-brand">speculcom/ai-handbook</a>（CC BY 4.0）。</p>
          <p>${bi('每个条目都是纯 Markdown + frontmatter，含维度记录、证据链、核验日与可信度标记。仓库内含 METHODOLOGY.md（方法论）、axes/（维度定义）、SCHEMA.md（数据规范）。', 'Every entry is plain Markdown plus frontmatter carrying dimension records, an evidence chain, checked dates and a confidence mark. The repository includes METHODOLOGY.md, axes/ (dimension definitions) and SCHEMA.md (data format).')}</p>
          <p class="t-sm">${bi('发现错误或有新证据，欢迎提 Issue 或 PR——每条修正都会注明依据与影响范围。', 'Found an error or have new evidence? Open an issue or a PR — each correction notes its basis and blast radius.')}</p>
        </div>
      </div>
    </section>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    // SITE.desc 是 bi() 双节点——JSON-LD/meta 只取中文侧（plainTagline），
    // 直接 plain() 会把英文 span 的 HTML 标签也卷进来。
    description: plain(plainTagline(SITE.desc), 300),
    url: `https://${SITE.domain}/`,
    inLanguage: ['zh-CN', 'en'],
    publisher: { '@type': 'Organization', name: 'Specul', url: 'https://specul.com/' },
  };

  return buildShell({
    current: 'agent',
    repo: SITE.repo,
    title: `${SITE.name} — ${plainTagline(SITE.tagline)} | 投机取巧`,
    desc: metaDesc(plainTagline(SITE.desc)),
    body,
    jsonLd,
    canonical: `https://${SITE.domain}/`,
    assetPrefix: '',
  });
}

/* ── v8 T30：旧 URL 跳转桩 ──────────────────────────────────────────────
 * D1 定案「目录按大类重排」= URL 全变。旧 URL 曾从 learn 深链、nav 条目、
 * 搜索引擎索引里进来（learn 的 terms.all.js 里有 13 条 tools.specul.com 深链），
 * 直接 404 等于把老读者的入口拆掉。桩的口径：
 *   · meta refresh（0 秒）+ 一个可见的 <a>（无脚本环境也能走）；
 *   · noindex——桩不是内容页，不该被索引，也不进 sitemap；
 *   · canonical 指向新页——把旧 URL 攒下的权重让给新页；
 *   · 不进 sitemap（sitemap 只收真页）。
 * ⚠ seo-basics 会扫全部 .html——桩没有 h1/JSON-LD，会被判违规。
 *   探针按「noindex 页不参与 SEO 断言」跳过（语义正确：搜索引擎根本不索引它）。 */
function renderStub(toPath, titleZh) {
  const href = toPath;
  // canonical 写**绝对 URL**（相对 canonical 各家搜索引擎处理不一，
  // 而这里的目的就是把权重让给新页——写全才稳）。
  const canon = `https://${SITE.domain}${href}`;
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=${href}" />
  <link rel="canonical" href="${canon}" />
  <meta name="robots" content="noindex" />
  <title>${esc(titleZh)} — 页面已移动 | 投机取巧</title>
  <meta name="description" content="此页面已移动到站内新位置，正在自动跳转；若没有自动跳转，请点击页面上的链接。" />
</head>
<body>
  <p>${esc(titleZh)}${'——此页面已移动到 '}<a href="${href}">${esc(href)}</a>。</p>
</body>
</html>
`;
}

// ── 主流程 ───────────────────────────────────────────────────────────────
/* 输出布局（v8 T30：一站十分区 = 10 大类）：
 *   OUT/                ← 站点根 = tools.specul.com
 *     index.html        ← 首页（三族 10 卡，不是任何大类的索引）
 *     <大类>/index.html + <大类>/<id>.html   ← 10 个大类各一目录（目录名=大类名）
 *     mcp/guides/<id>.html                   ← 深水指南（落 mcp 大类下）
 *     旧 URL 跳转桩：根级 <id>.html、harness/、tools/、tools/guides/
 *       （meta refresh + noindex，不进 sitemap）
 *
 * 为什么大类不再有一个落根：v7 前 coding 落根是「三分区时代默认落点」的惯性；
 * 10 大类里任何一家落根都偏袒，且首页（目录页）才是根的正确住户。
 *
 * **CNAME 只写一次、只写根域名**（曾差点写成 tools.specul.com/harness/）：
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

/* ── v8 T30：先清旧产物结构 ────────────────────────────────────────────
 * 旧结构 = 根级 .html（coding 落根）+ harness/ + tools/（含 tools/guides/）。
 * 新结构 = 10 个大类目录 + 首页 + 旧 URL 桩。桩恰好落在旧路径上，
 * 所以「清旧」与「写桩」是同一批位置先清后写——不先清会留孤儿页
 * （旧结构里有、新映射里没有的 id 页会永远留在产物里）。
 * ⚠ 只清 .html 与旧 README.md，不动 brand 壳 / CNAME / .nojekyll。 */
{
  const rmHtml = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) rmHtml(p);
      else if (f.name.endsWith('.html')) fs.unlinkSync(p);
    }
  };
  rmHtml(OUT);   // 全树 .html（含根、harness/、tools/、tools/guides/）
  for (const f of ['harness/README.md', 'tools/README.md']) {
    const p = path.join(OUT, f);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
}

/* ── 10 张大类页 + 详情页 + guides ───────────────────────────────────── */
for (const { partKey, site, entries } of loaded) {
  const dir = path.join(OUT, site.dir);
  fs.mkdirSync(dir, { recursive: true });

  const base = pfx(site);
  fs.writeFileSync(path.join(dir, 'index.html'), renderIndex(site, partKey, entries), 'utf8');
  allPages.push({ loc: `https://${SITE.domain}/${base}`, pri: '0.9' });

  for (const e of entries) {
    fs.writeFileSync(path.join(dir, `${e.id}.html`), renderDetail(site, partKey, e), 'utf8');
    allPages.push({ loc: `https://${SITE.domain}/${base}${e.id}.html`, pri: '0.7' });
  }

  /* S48 深水指南详情页：落 mcp 大类（v8 T30：/mcp/guides/<id>.html）。
   * 先清旧目录（guides 清空时不留孤儿页），再按需写。 */
  if (partKey === 'mcp') {
    const gdir = path.join(dir, 'guides');
    if (fs.existsSync(gdir)) {
      for (const f of fs.readdirSync(gdir).filter((x) => x.endsWith('.html'))) fs.unlinkSync(path.join(gdir, f));
    }
    if (GUIDES.length) {
      fs.mkdirSync(gdir, { recursive: true });
      for (const g of GUIDES) {
        fs.writeFileSync(path.join(gdir, `${g.id}.html`), renderGuidePage(g, site), 'utf8');
        allPages.push({ loc: `https://${SITE.domain}/mcp/guides/${g.id}.html`, pri: '0.7' });
      }
    }
  }

  // 仓库 README（GitHub 落地页，说明这个大类是什么、数据从哪来）
  const isTools = site.owns.includes('mcp');
  const axisNames = (isTools ? [...AXES, ...MCP_AXES] : AXES).map(x => x[1]);
  const verifiedCount = entries.filter(e => e.confidence === 'verified').length;
  fs.writeFileSync(path.join(dir, 'README.md'),
`# ${SITE.name} · ${site.name}

> ${plainTagline(site.tagline)}

**${SITE.domain}/${base}** · 独立信息项目（非厂商官方榜单）

${plainTagline(site.desc)}

本站共 ${SITE.partitions.length} 个大类（\`${SITE.partitions.join('` / `')}\`），本 README 描述「${site.name}」这一个。

## 这个大类提供什么

- **${entries.length} 个对象**，按固定 ${axisNames.length} 个维度记录${isTools ? '（8 个通用维度 + 3 个 MCP 特有维度）' : ''}
- 每个维度都能回溯到官方一手源，附来源类型与核验日期
- **不给总分排名**——缺少跨工具的统一实测，排名会误导
- **「未知」是合法答案**——查不到就写未知并说明原因，不用推测填充

## 收录对象

| 对象 | 形态 | 厂商 | 可信度 | 核验日 |
|---|---|---|---|---|
${entries.map(e => `| [${e.name}](./${e.id}.html) | ${FORM_LABEL_MD(e.form, e.family)} | ${esc(e.vendor)} | ${e.confidence} | ${e.lastVerified} |`).join('\n')}

## 可信度标记

| 标记 | 含义 |
|---|---|
| \`verified\` | all ${axisNames.length} dimensions backed by official sources, checked within 90 days |
| \`partial\` | some dimensions unknown, or official docs unreachable, or checked over 90 days ago |
| \`stale\` | 官方已发布重大变化，本站尚未核验 |

当前 ${entries.length} 个对象中，**${verifiedCount} 个为 verified**。

## 数据来源

全部数据来自 **[speculcom/ai-handbook](https://github.com/speculcom/ai-handbook)**（CC BY 4.0），
由 \`tools/sites/build.mjs\` 从该仓库的 Markdown + frontmatter 构建，本仓库只存产物。

发现错误或有新证据，欢迎去数据仓库提 Issue 或 PR。

## 站内大类

| 大类 | 主题 | 对象数 |
|---|---|---|
${SITE.partitions.map(k => {
    const s = SITES[k];
    const n = k === partKey ? entries.length : (loaded.find(x => x.partKey === k)?.entries.length ?? '—');
    return `| [${s.name}](/${s.dir}/) | ${plainTagline(s.tagline)} | ${n} |`;
  }).join('\n')}

---

© 2026 Specul · 投机 · 推演
`, 'utf8');

  const v = verifiedCount;
  summary.push(`[${partKey}] ${entries.length} 个对象（${v} verified）→ ${site.dir}/`);
}

/* ── 站点首页（三族 10 卡）：站点根 index.html ───────────────────────── */
fs.writeFileSync(path.join(OUT, 'index.html'), renderHome(loaded), 'utf8');
allPages.unshift({ loc: `https://${SITE.domain}/`, pri: '1.0' });

/* ── v8 T30：旧 URL 跳转桩 ─────────────────────────────────────────────
 * 旧落点（v7 及以前）：coding 落根、framework 落 harness/、mcp 落 tools/。
 * 桩的映射从**现行数据**机器生成（BY_ID 里有每个 id 的大类归属）——
 * 不手写清单，手写会在档案增删时漂移。
 * learn 深链清单（terms.all.js 里 13 条）全部落在桩覆盖范围内：
 *   /tools/{context7,filesystem,fetch,memory}.html → /mcp/…
 *   /harness/{openhands,llamaindex,crewai,langgraph,google-adk,openai-agents-sdk,hermes-agent}.html → /framework/…
 *   /opencode.html → /coding/opencode.html；/tools/index.html → /mcp/
 * ⚠ 桩不进 allPages（sitemap 只收真页）。 */
let stubCount = 0;
{
  const OLD_DIR_OF = { coding: '', framework: 'harness', mcp: 'tools' };
  const writeStub = (relPath, toPath, title) => {
    const abs = path.join(OUT, relPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, renderStub(toPath, title), 'utf8');
    stubCount++;
  };
  for (const [id, { entry, partKey }] of BY_ID) {
    const oldDir = OLD_DIR_OF[partKey];
    if (oldDir === undefined) continue;   // 新大类（chat/image/…）没有旧页，无需桩
    const s = SITES[partKey];
    writeStub(
      oldDir ? `${oldDir}/${id}.html` : `${id}.html`,
      `/${s.dir}/${id}.html`,
      entry.name,
    );
  }
  // 旧索引页 → 新大类页（根 index.html 不桩——它现在是首页，同一 URL 换内容）
  writeStub('harness/index.html', '/framework/', '框架与运行时（旧 harness 索引）');
  writeStub('tools/index.html', '/mcp/', 'MCP 工具（旧 tools 索引）');
  // 旧 guides 页 → /mcp/guides/（guides 落点随大类改名）
  for (const g of GUIDES) writeStub(`tools/guides/${g.id}.html`, `/mcp/guides/${g.id}.html`, g.title);
}

// sitemap：一个站一份——首页 + 10 大类索引 + 全部详情 + guides（桩不进）
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

// 站点根 README：介绍整站 10 大类
fs.writeFileSync(path.join(OUT, 'README.md'),
`# ${SITE.name}

> ${SITE.tagline}

**${SITE.domain}** · 独立信息项目（非厂商官方榜单）

${plainTagline(SITE.desc)}

## 10 个大类，归三族

| 大类 | 主题 | 对象数 | 主要坐标系 |
|---|---|---|---|
${loaded.map(({ partKey, site, entries }) => {
    const isT = site.owns.includes('mcp');
    return `| [${site.name}](./${site.dir}/) | ${plainTagline(site.tagline)} | ${entries.length} | ${isT ? '8 通用 + 3 MCP 特有' : '8 通用维度'}${site.splitBy === 'form' ? '，按形态分组' : site.splitBy === 'family' ? '，按抽象层分组' : ''} |`;
  }).join('\n')}

**为什么不把所有对象塞进一张总表**：三族的坐标系不同，混排会制造假的可比性。
成品工具与自己搭的底座都能进同一个八维坐标系，但它们解决的不是同一个问题；
MCP 工具层用的是另外三个维度（传输 / 认证 / 权限范围），八维套不上去。

## 方法

- **不给总分排名**——缺少跨工具的统一实测，排名会误导
- **「未知」是合法答案**——查不到就写未知并说明原因，不用推测填充
- **不同族不混排**——铁律都写在数据仓 \`METHODOLOGY.md\` 里

## 数据来源

全部数据来自 **[speculcom/ai-handbook](https://github.com/speculcom/ai-handbook)**（CC BY 4.0），
由 \`tools/sites/build.mjs\` 构建，本仓库只存产物。

---

© 2026 Specul · 投机 · 推演
`, 'utf8');

summary.forEach(s => console.log(s));
console.log(`\n共 ${allPages.length} 个真页 + ${stubCount} 个旧 URL 跳转桩 → ${path.basename(OUT)}/（含 brand.css / brand.js / site.css）`);
