#!/usr/bin/env node
/* ============================================================================
 * viz.mjs — 全站共享的数据视觉层（唯一生成处）
 * ----------------------------------------------------------------------------
 * 设计约束：
 *   1. 只用内联 SVG，不依赖外部图片、图表库或网络；暗/亮主题、打印、无脚本都可读。
 *   2. 每张图都绑定本站真实数据，不做装饰性配图；图上标口径，图下标来源与核验日。
 *   3. 文案中英双语由调用方（HTML）负责；SVG 内只放短标签，避免语言切换错位。
 *   4. 不做排名、不打分；只表达「有多少 / 分布 / 时间 / 关系」。
 *
 * 用法：
 *   import { vizFor } from '../_audit/viz.mjs';
 *   vizFor('hardware')  // 返回完整 <section class="vz-section">…</section>
 *
 * 站点构建器应在首页 stats 之后调用；若构建器暂时不改，也可以由
 * `node _audit/build-viz.mjs` 在构建后注入（带 marker，可重跑）。
 * ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE = path.resolve(HERE, '..');
/* 本文件也会被复制到 _data/handbook/shared/viz.mjs，供 ai-handbook 单仓克隆构建。
   在副本里 WORKSPACE 就是 handbook 根，_data/handbook/ 前缀要剥掉。 */
const HANDBOOK_LOCAL = !fs.existsSync(path.join(WORKSPACE, '_data/handbook'));
const ROOT = WORKSPACE;
const localPath = (rel) => (HANDBOOK_LOCAL ? rel.replace(/^_data\/handbook\//, '') : rel);
const readJSON = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, localPath(rel)), 'utf8'));
const bi = (zh, en) => `<span data-zh>${zh}</span><span data-en>${en}</span>`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmt = (n) => Number(n).toLocaleString('en-US');

/* ---------- SVG 基座 ---------- */
const ARIA_EN = {
  '横向条形图': 'Horizontal bar chart',
  '纵向柱状图': 'Vertical bar chart',
  '累计词条折线图': 'Cumulative term line chart',
  '环图': 'Donut chart',
  '时间线': 'Timeline',
  '显存与带宽散点图': 'Memory capacity vs bandwidth scatter plot',
  '信任栈分层图': 'Trust-stack layers',
  '全站生态节点图': 'Site ecosystem node map',
};
const svg = (w, h, label, body) =>
  `<svg class="vz-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" data-ui-aria-label-zh="${esc(label)}" data-ui-aria-label-en="${esc(ARIA_EN[label] || label)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

/* 图表里的短标签也必须有英文。此前只翻译了 aria-label，视觉上的 `<text>` 仍是中文，
   英文态会直接看到「编程 / 模型仓 / 一 · 进门」。这里给出唯一一份标签词典，
   所有图表文本都走 text()，中英文各出一份节点，由 brand.css 的 data-zh/data-en 规则切换。 */
const EN_SECTION = {
  '全站一张图 · 2026-11-19': 'One map of the whole site · 2026-11-19',
  '学 AI · 一张图看全貌': 'Learn · the whole map',
  '工具 · 一张图看全貌': 'Tools · the whole map',
  '模型 · 一张图看全貌': 'Models · the whole map',
  '硬件算力 · 一张图看全貌': 'Compute · the whole map',
  'AI 论文 · 一张图看全貌': 'AI papers · the whole map',
  '链 · 一张图看全貌': 'Chain · the whole map',
  'AI 导航 · 一张图看全貌': 'AI Directory · the whole map',
  '演示 · 一张图看全貌': 'Demos · the whole map',
};
const EN_TITLE = {
  '十个入口，一张生态图': 'Ten doors, one ecosystem map',
  '先看清全貌，再挑一条路走': 'See the whole map, then pick a path',
  '工具越来越多，先按任务找': 'More tools than ever; start from the job',
  '开放权重模型，现在走到哪一代': 'Open-weight models: which generation are we on?',
  '显存和带宽，决定你能跑多大模型': 'VRAM and bandwidth decide how big a model you can run',
  '这些论文，分别在回答什么问题': 'What question is each paper answering?',
  'AI 自己办事，<br class="br-sm" />先解决「凭什么信它」': 'AI acting on its own:<br class="br-sm" />first, why should you trust it?',
  '找 AI 网站，不用一个个翻': 'Find AI sites without opening them one by one',
  '这些作品，先看大家在做什么': 'See what people are actually making',
  '站点生态图': 'Site ecosystem map',
  '2026 关键更新': 'Key 2026 updates',
  '内容条目分布': 'Content volume by site',
  '这一轮补了什么': 'What this round added',
  '六层，词都落在哪': 'Where the six levels sit',
  '最近补的四个词': 'Four terms added recently',
  '从词条到路径': 'From terms to paths',
  '六站累计：知识是一层层叠上去的': 'Six stations, cumulative: knowledge stacks up',
  '各任务的选择数量': 'Options per task',
  '协议时间线': 'Protocol timeline',
  '三层接线': 'Three layers of wiring',
  '家族当前代次的时间分布': "When each family's current generation landed",
  '模型仓 vs 量化仓': 'Model repos vs quant repos',
  '量化档 vs GGUF 文件': 'Quant tiers vs GGUF files',
  '2026 六个新节点': 'Six new nodes in 2026',
  'HBM 容量 × 带宽': 'HBM capacity × bandwidth',
  '2026 六个硬件节点': 'Six hardware nodes in 2026',
  '同样 288GB，为什么不是同一张卡': 'Same 288GB, but not the same card',
  '主题分布': 'Topic distribution',
  '年份分布': 'Year distribution',
  '2026 四个新节点': 'Four new nodes in 2026',
  '四层信任栈': 'Four-layer trust stack',
  '类目分布': 'Category distribution',
  '2026 三个新节点': 'Three new nodes in 2026',
  '大家常找的几类': 'What people search for',
  '链接还能打开吗': 'Do the links still open?',
  '这里只是入口': 'This is an exit, not a destination',
  '作品都在做什么': 'What the demos actually do',
  '运行方式与许可边界': 'How they run, and the licence boundary',
};
const EN_TEXT = {
  '开放权重': 'Open weights', '小米 MiMo-V2.6': 'Xiaomi MiMo-V2.6',
  '一 · 进门': '1 · Enter', '二 · 会用': '2 · Use', '三 · 用深': '3 · Use deeply',
  '四 · 看懂': '4 · Understand', '五 · 选型': '5 · Choose', '六 · 前沿': '6 · Frontier',
  '进门': 'Enter', '会用': 'Use', '用深': 'Use deeply', '看懂': 'Understand',
  '选型': 'Choose', '前沿': 'Frontier', '累计词条': 'Cumulative terms',
  '30–45 分钟': '30–45 min', '50–75 分钟': '50–75 min',
  '一个下午': 'One afternoon', '一周': 'One week',
  '编程': 'Coding', '框架': 'Frameworks', '安全与评测': 'Safety & evals',
  '自动化': 'Automation', '对话': 'Chat', '本地运行器': 'Local runners',
  '音频': 'Audio', '图像': 'Images', '视频': 'Video', '研究': 'Research',
  '协议 / MCP': 'Protocols / MCP', '标准 / 技能': 'Standards / Skills',
  '协议 / 前端': 'Protocols / front end', 'MCP 下一版': 'Next MCP',
  '协议 / MCP 下一版': 'Protocols / next MCP',
  '开源': 'Open source', '开放权重 / 校正': 'Open weights / corrections',
  '模型仓': 'Model repos', '量化仓': 'Quant repos', '量化档': 'Quant tiers',
  'GGUF 文件': 'GGUF files',
  'Agent Skills 作为开放标准发布': 'Agent Skills released as an open standard',
  '一个文件夹 + SKILL.md，跨平台可移植': 'One folder + SKILL.md, portable across platforms',
  'MCP Apps 定稿': 'MCP Apps finalised',
  'ui:// 资源 + 沙箱 iframe + JSON-RPC 回传': 'ui:// resource + sandboxed iframe + JSON-RPC return',
  'MCP 下一版规范候选': 'Next MCP specification candidate',
  '无状态核心、Extensions、Tasks 扩展': 'Stateless core, Extensions, Tasks',
  'Agent Skills 捐给 AAIF': 'Agent Skills donated to AAIF',
  '70+ 平台接入，标准交给 Linux 基金会下的 AAIF': '70+ platforms; the standard moves to AAIF under the Linux Foundation',
  'AG-UI 1.0 规范': 'AG-UI 1.0 specification',
  'Agent ↔ 用户的事件流，HTTP + SSE': 'Agent ↔ user event stream, HTTP + SSE',
  'Kimi K3 开放权重': 'Kimi K3 open weights',
  '2.8T 总参 / 104B 激活，16/896 专家，1M 上下文': '2.8T total / 104B active, 16 of 896 experts, 1M context',
  'GLM-5.3 与 GLM-5.3-Flash': 'GLM-5.3 and GLM-5.3-Flash',
  '同基座后训练 Scaling；Flash 320B-A18B 随后 MIT 开源': 'Post-training scaling on one base; Flash 320B-A18B later open-sourced under MIT',
  'DeepSeek V4.1 Flash': 'DeepSeek V4.1 Flash',
  '552B MoE / 8B prefill / 16B decode，KV 缓存大幅压缩': '552B MoE / 8B prefill / 16B decode, heavily compressed KV cache',
  'Pro / Flash 双线，原生全模态，AA Intelligence 46.32': 'Pro and Flash lines, native omni-modal, AA Intelligence 46.32',
  'Meta Muse Spark Open': 'Meta Muse Spark Open',
  '816B / 42B 激活，1M 上下文，Muse Model License': '816B / 42B active, 1M context, Muse Model License',
  'Mistral Large 4': 'Mistral Large 4',
  '1.05T / 49B 激活，128 路由专家，1M 上下文': '1.05T / 49B active, 128 routed experts, 1M context',
  'MCP Apps 成为正式扩展': 'MCP Apps becomes a formal extension',
  'SEP-1865 定稿；工具可以返回可交互 UI': 'SEP-1865 finalised; tools can return interactive UI',
  'ERC-8004 上以太坊主网': 'ERC-8004 goes live on Ethereum mainnet',
  '身份 / 声誉 / 验证三套注册表': 'Three registries: identity, reputation, validation',
  '小米 MiMo-V2.6 开源': 'Xiaomi MiMo-V2.6 open-sourced',
  'Pro / Flash 双线，原生全模态': 'Pro and Flash lines, native omni-modal',
  'Byteification 登上 Nature': 'Byteification in Nature',
  '把子词模型改成字节级，训 49.1B token': 'Subword models become byte-level, trained on 49.1B tokens',
  'Meta Muse Spark Open 开放': 'Meta Muse Spark Open released',
  '70+ 平台接入；技能成为跨平台标准': '70+ platforms; skills become a cross-platform standard',
  'Mistral Large 4 开放权重': 'Mistral Large 4 open weights',
  '1.05T 总参 / 49B 激活，128 路由专家': '1.05T total / 49B active, 128 routed experts',
  'AMD MI450X 上市': 'AMD MI450X launches',
  '演示站并入统一外壳': 'Demos move into the shared shell',
  '189 件作品；底栏单排 10 项、2026 与 404 补齐': '189 works; one-row 10-item footer, 2026 and 404 pages added',
  'TPU7x（Ironwood）GA': 'TPU7x (Ironwood) GA',
  'AMD MI455X 上市': 'AMD MI455X launches',
  'AMD Helios 机架': 'AMD Helios rack',
  'Vera Rubin NVL72': 'Vera Rubin NVL72',
  'Blackwell Ultra B300': 'Blackwell Ultra B300',
  'Byteification · Nature': 'Byteification · Nature',
  '49.1B token 把子词模型改成字节级': '49.1B tokens turn subword models byte-level',
  'JEPA-PRH · arXiv': 'JEPA-PRH · arXiv',
  '109M 文本 JEPA 的表征对齐超过 72B LLM': 'A 109M text JEPA beats a 72B LLM on representation alignment',
  'Recognition–Refusal · EMNLP': 'Recognition–Refusal · EMNLP',
  '「识别不可答」与「安全拒答」不是同一个方向': '“Recognising unanswerable” and “safe refusal” are not the same axis',
  'Abstain-R1 · ACL': 'Abstain-R1 · ACL',
  '3B 模型的可校准弃答与拒答后澄清': 'Calibrated abstention and post-refusal clarification in a 3B model',
  'ERC-4337 草案': 'ERC-4337 draft',
  'UserOperation + Bundler + Paymaster，不改共识层': 'UserOperation + Bundler + Paymaster, no consensus change',
  'ERC-8004 主网上线': 'ERC-8004 mainnet launch',
  '身份 / 声誉 / 验证三套 singleton registry': 'Three singleton registries: identity, reputation, validation',
  'AP2 v0.2 + 捐给 FIDO': 'AP2 v0.2 donated to FIDO',
  'Human Not Present；SD-JWT mandate': 'Human Not Present; SD-JWT mandate',
  '生产落地仍未确认': 'Production use still unconfirmed',
  'AP2 有规范、有 SDK，没有公开确认的生产交易': 'AP2 has a spec and SDK, but no publicly confirmed production transaction',
};
const hasBi = (s) => /data-(zh|en)|<br|<span/.test(String(s));
const zhText = (s) => /[一-鿿]/.test(String(s));
const biText = (s, map) => (zhText(s) && !hasBi(s) && map[s] ? bi(s, map[s]) : s);

const text = (x, y, s, cls = 'vz-t', anchor = 'start') => {
  const raw = String(s);
  const one = (value) => `<text x="${x}" y="${y}" class="${cls}"${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}>${esc(value)}</text>`;
  if (zhText(raw) && EN_TEXT[raw]) {
    return one(raw).replace('<text ', '<text data-zh ') + one(EN_TEXT[raw]).replace('<text ', '<text data-en ');
  }
  return one(raw);
};

/* 横向条形图：标签在左、值在右。rows: [{label,value,color?,note?}] */
function barChart(rows, { w = 720, labelW = 210, unit = '', max: maxIn } = {}) {
  const rowH = 34, top = 18, h = rows.length * rowH + top + 12;
  const max = maxIn || Math.max(...rows.map((r) => r.value), 1);
  const plotW = w - labelW - 86;
  const body = rows.map((r, i) => {
    const y = top + i * rowH;
    const len = Math.max(3, (r.value / max) * plotW);
    return `
      <line x1="${labelW}" y1="${y + 23}" x2="${w - 10}" y2="${y + 23}" class="vz-gridline"/>
      ${text(0, y + 22, r.label, 'vz-t')}
      <rect x="${labelW}" y="${y + 7}" width="${len}" height="18" rx="7" class="vz-bar" style="fill:${r.color || 'var(--brand)'}"/>
      ${text(w - 4, y + 22, fmt(r.value) + (unit ? ' ' + unit : ''), 'vz-t-strong', 'end')}`;
  }).join('');
  return svg(w, h, '横向条形图', body);
}

/* 纵向柱状图：rows: [{label,value,color?}] */
function columnChart(rows, { w = 720, h = 280, unit = '', max: maxIn } = {}) {
  const pad = { l: 42, r: 18, t: 30, b: 58 };
  const max = maxIn || Math.max(...rows.map((r) => r.value), 1);
  const plotW = w - pad.l - pad.r, plotH = h - pad.t - pad.b;
  const gap = plotW / rows.length;
  const bw = Math.min(64, gap * 0.56);
  const body = rows.map((r, i) => {
    const bh = Math.max(2, (r.value / max) * plotH);
    const x = pad.l + i * gap + (gap - bw) / 2;
    const y = pad.t + plotH - bh;
    return `
      ${text(x + bw / 2, y - 9, String(r.value), 'vz-t-strong', 'middle')}
      <rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="8" class="vz-bar" style="fill:${r.color || 'var(--brand)'}"/>
      ${text(x + bw / 2, h - 28, r.label, 'vz-t-dim', 'middle')}`;
  }).join('');
  const grid = [0, 0.5, 1].map((f) => {
    const y = pad.t + plotH - f * plotH;
    return `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" class="vz-gridline"/>${text(pad.l - 10, y + 5, String(Math.round(max * f)), 'vz-t-dim', 'end')}`;
  }).join('');
  return svg(w, h, '纵向柱状图', grid + body + (unit ? text(w - pad.r, h - 8, unit, 'vz-t-dim', 'end') : ''));
}

/* 折线图：rows: [{label,value}]，适合看累计变化 */
function lineChart(rows, { w = 720, h = 260 } = {}) {
  const pad = { l: 46, r: 24, t: 38, b: 56 };
  const max = Math.max(...rows.map((r) => r.value), 1);
  const yMax = Math.ceil(max / 100) * 100 || 100;
  const plotW = w - pad.l - pad.r, plotH = h - pad.t - pad.b;
  const x = (i) => pad.l + (rows.length === 1 ? plotW / 2 : (i / (rows.length - 1)) * plotW);
  const y = (v) => pad.t + plotH - (v / yMax) * plotH;
  const points = rows.map((r, i) => `${x(i)} ${y(r.value)}`).join(' L');
  const area = `M ${x(0)} ${pad.t + plotH} L ${points} L ${x(rows.length - 1)} ${pad.t + plotH} Z`;
  const grid = [0, 0.5, 1].map((f) => {
    const gy = pad.t + plotH - f * plotH;
    return `<line x1="${pad.l}" y1="${gy}" x2="${w - pad.r}" y2="${gy}" class="vz-gridline"/>${text(pad.l - 10, gy + 5, String(Math.round(yMax * f)), 'vz-t-dim', 'end')}`;
  }).join('');
  const dots = rows.map((r, i) => `<circle cx="${x(i)}" cy="${y(r.value)}" r="5" style="fill:var(--brand)"/>${text(x(i), y(r.value) - 12, String(r.value), 'vz-t-strong', 'middle')}${text(x(i), h - 28, r.label, 'vz-t-dim', 'middle')}`).join('');
  return svg(w, h, '累计词条折线图', `${grid}<path d="${area}" fill="var(--brand)" fill-opacity=".12"/><path d="M ${points}" fill="none" stroke="var(--brand)" stroke-width="2"/>${dots}${text(pad.l, pad.t - 16, '累计词条', 'vz-t-dim')}`);
}

/* 环图：parts: [{label,value,color}] */
function donut(parts, { total: totalIn, center, note, w = 460, h = 240 } = {}) {
  const r = 84, cx = 110, cy = 118, sw = 23;
  const total = totalIn || parts.reduce((n, p) => n + p.value, 0);
  const C = 2 * Math.PI * r;
  let start = 0;
  const arcs = parts.map((p) => {
    const len = (p.value / total) * C;
    const off = -start;
    start += len;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${p.color}" stroke-width="${sw}" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${off}" transform="rotate(-90 ${cx} ${cy})"/>`;
  }).join('');
  const legend = parts.map((p, i) => {
    const y = 44 + i * 31;
    return `<circle cx="236" cy="${y - 5}" r="5" fill="${p.color}"/>${text(252, y, p.label, 'vz-t')}${text(w - 12, y, fmt(p.value), 'vz-t-strong', 'end')}`;
  }).join('');
  return svg(w, h, '环图', `${arcs}${text(cx, cy + 2, center || fmt(total), 'vz-t-big', 'middle')}${text(cx, cy + 24, note || '', 'vz-t-dim', 'middle')}${legend}`);
}

/* 垂直时间线：rows: [{date,title,desc,color}] */
function timeline(rows, { w = 720, rowH = 54 } = {}) {
  const h = rows.length * rowH + 18;
  const body = rows.map((r, i) => {
    const y = 22 + i * rowH;
    return `
      ${text(104, y + 5, r.date, 'vz-t-dim', 'end')}
      <line x1="120" y1="${y - 12}" x2="120" y2="${y + 32}" class="vz-axis"/>
      <circle cx="120" cy="${y}" r="6" style="fill:${r.color || 'var(--cyan)'}"/>
      ${text(140, y + 5, r.title, 'vz-t-strong')}
      ${text(140, y + 25, r.desc || '', 'vz-t-dim')}`;
  }).join('');
  return svg(w, h, '时间线', body);
}

/* 散点图（对数 x）：points: [{x,y,label,color,dx,dy}] */
function scatter(points, { w = 720, h = 420 } = {}) {
  const pad = { l: 64, r: 24, t: 26, b: 52 };
  const plotW = w - pad.l - pad.r, plotH = h - pad.t - pad.b;
  const xMin = 24, xMax = 512, yMin = 0, yMax = 24;
  const x = (v) => pad.l + (Math.log2(v) - Math.log2(xMin)) / (Math.log2(xMax) - Math.log2(xMin)) * plotW;
  const y = (v) => pad.t + plotH - (v - yMin) / (yMax - yMin) * plotH;
  const xTicks = [32, 64, 128, 256, 512];
  const yTicks = [0, 8, 16, 24];
  const grid = [
    ...xTicks.map((t) => `<line x1="${x(t)}" y1="${pad.t}" x2="${x(t)}" y2="${h - pad.b}" class="vz-gridline"/>${text(x(t), h - pad.b + 22, String(t), 'vz-t-dim', 'middle')}`),
    ...yTicks.map((t) => `<line x1="${pad.l}" y1="${y(t)}" x2="${w - pad.r}" y2="${y(t)}" class="vz-gridline"/>${text(pad.l - 10, y(t) + 5, String(t), 'vz-t-dim', 'end')}`),
  ].join('');
  const dots = points.map((p) => {
    const px = x(p.x), py = y(p.y);
    return `<circle cx="${px}" cy="${py}" r="7" style="fill:${p.color || 'var(--brand)'}"/>${text(px + (p.dx || 10), py + (p.dy || -10), p.label, 'vz-t')}`;
  }).join('');
  return svg(w, h, '显存与带宽散点图', `${grid}${dots}${text(w - pad.r, h - 12, 'HBM 容量（GB，对数轴）→', 'vz-t-dim', 'end')}${text(pad.l - 6, pad.t - 10, '↑ 带宽（TB/s）', 'vz-t-dim')}`);
}

/* 信任栈：layers: [{name,sub,examples,color}] */
function stack(layers, { w = 720 } = {}) {
  const h = layers.length * 78 + 16;
  const body = layers.map((l, i) => {
    const y = 10 + i * 78;
    return `
      <rect x="150" y="${y}" width="${w - 170}" height="58" rx="12" class="vz-stack" style="stroke:${l.color};fill:${l.color};fill-opacity:.10"/>
      ${text(0, y + 24, l.name, 'vz-t-strong')}
      ${text(0, y + 45, l.sub, 'vz-t-dim')}
      ${text(174, y + 25, l.examples, 'vz-t')}
      ${i < layers.length - 1 ? `<path d="M360 ${y + 58} L360 ${y + 72} M354 ${y + 66} L360 ${y + 72} L366 ${y + 66}" class="vz-arrow"/>` : ''}`;
  }).join('');
  return svg(w, h, '信任栈分层图', body);
}

/* 生态节点图 */
function nodeMap(nodes, { w = 480, h = 330 } = {}) {
  const cx = 240, cy = 165, rx = 154, ry = 100;
  const pts = nodes.map((n, i) => {
    const a = (-90 + i * (360 / nodes.length)) * Math.PI / 180;
    return { ...n, px: cx + Math.cos(a) * rx, py: cy + Math.sin(a) * ry };
  });
  const links = pts.map((p) => `<line x1="${cx}" y1="${cy}" x2="${p.px}" y2="${p.py}" class="vz-conn" style="${p.muted ? 'opacity:.45;stroke-dasharray:4 6' : ''}"/>`).join('');
  const dots = pts.map((p) => `
    <circle cx="${p.px}" cy="${p.py}" r="${p.r || 21}" class="vz-node" style="stroke:${p.color};fill:${p.color};fill-opacity:.12"/>
    ${text(p.px, p.py - 30, p.label, 'vz-t-strong', 'middle')}
    ${text(p.px, p.py + 5, p.value, 'vz-t-value', 'middle')}`).join('');
  return svg(w, h, '全站生态节点图', `${links}<circle cx="${cx}" cy="${cy}" r="44" class="vz-node" style="stroke:var(--brand);fill:var(--brand);fill-opacity:.10"/>${text(cx, cy - 5, '首页', 'vz-t-strong', 'middle')}${text(cx, cy + 16, '10 入口', 'vz-t-dim', 'middle')}${dots}`);
}

/* ---------- 卡片外壳 ---------- */
function card({ span = 4, no, title, sub, svg: chart, foot }) {
  return `<figure class="vz-card vz-span-${span}">
    <figcaption class="vz-cap"><span class="vz-no">${no}</span><span><b>${biText(title, EN_TITLE)}</b><small>${sub}</small></span></figcaption>
    <div class="vz-plot">${chart}</div>
    ${foot ? `<p class="vz-foot">${foot}</p>` : ''}
  </figure>`;
}

function section({ id, kicker, title, sub, dek, cards, foot, link }) {
  return `<section class="vz-section" id="${id}">
  <div class="container">
    <div class="vz-head">
      <p class="vz-kicker">${biText(kicker, EN_SECTION)}</p>
      <h2 class="vz-title">${biText(title, EN_TITLE)} <span class="vz-title-sub">${sub}</span></h2>
      <p class="vz-dek">${dek}</p>
    </div>
    <div class="vz-grid">${cards.join('')}</div>
    ${foot ? `<p class="vz-foot vz-foot-wide">${foot}</p>` : ''}
    ${link ? `<p class="vz-more">${link}</p>` : ''}
  </div>
</section>`;
}

/* ---------- 各站数据 ---------- */
const WWW_NODES = [
  { label: '模型', value: '1337', color: 'var(--cat-violet)' },
  { label: 'AI 导航', value: '625', color: 'var(--cat-blue)' },
  { label: '学AI', value: '260', color: 'var(--cat-teal)' },
  { label: '工具', value: '280', color: 'var(--cat-amber)' },
  { label: '论文', value: '33', color: 'var(--cat-rose)' },
  { label: '算力', value: '35', color: 'var(--cat-lime)' },
  { label: '链', value: '24', color: 'var(--cat-violet)' },
  { label: '演示', value: '189', color: 'var(--cat-rose)' },
  { label: '开源', value: '50', color: 'var(--cat-teal)' },
];

function vizWww() {
  const bars = [
    { label: 'GGUF 文件', value: 1337, color: 'var(--cat-violet)' },
    { label: 'AI 导航条目', value: 625, color: 'var(--cat-blue)' },
    { label: '学AI词条', value: 260, color: 'var(--cat-teal)' },
    { label: '工具对象', value: 280, color: 'var(--cat-amber)' },
    { label: '演示作品', value: 189, color: 'var(--cat-rose)' },
    { label: '开源仓库', value: 50, color: 'var(--cat-teal)' },
    { label: '硬件条目', value: 35, color: 'var(--cat-lime)' },
    { label: '论文条目', value: 33, color: 'var(--cat-rose)' },
    { label: '链条目', value: 24, color: 'var(--cat-violet)' },
  ];
  const tl = [
    { date: '01-26', title: 'MCP Apps 成为正式扩展', desc: 'SEP-1865 定稿；工具可以返回可交互 UI', color: 'var(--cat-blue)' },
    { date: '01-29', title: 'ERC-8004 上以太坊主网', desc: '身份 / 声誉 / 验证三套注册表', color: 'var(--cat-violet)' },
    { date: '09-22', title: '小米 MiMo-V2.6 开源', desc: 'Pro / Flash 双线，原生全模态', color: 'var(--cat-teal)' },
    { date: '10-07', title: 'Byteification 登上 Nature', desc: '把子词模型改成字节级，训 49.1B token', color: 'var(--cat-rose)' },
    { date: '10-15', title: 'Meta Muse Spark Open 开放', desc: '816B / 42B 激活，1M 上下文', color: 'var(--cat-amber)' },
    { date: '10-22', title: 'Agent Skills 捐给 AAIF', desc: '70+ 平台接入；技能成为跨平台标准', color: 'var(--cat-lime)' },
    { date: '10-29', title: 'Mistral Large 4 开放权重', desc: '1.05T 总参 / 49B 激活，128 路由专家', color: 'var(--cat-violet)' },
    { date: '11-12', title: 'AMD MI450X 上市', desc: '288GB HBM4 / 23.3TB/s', color: 'var(--cat-rose)' },
    { date: '11-19', title: '演示站并入统一外壳', desc: '189 件作品；底栏单排 10 项、2026 与 404 补齐', color: 'var(--cat-violet)' },
  ];
  return section({
    id: 'atlas',
    kicker: '全站一张图 · 2026-11-19',
    title: '十个入口，一张生态图',
    sub: 'Specul atlas',
    dek: bi('每个节点对应一个内容站，点进去就是那个站。十个入口共用同一套外壳，新增的 OSS 分站与数据、云算力、Skills、评测四节都在这张图里。', 'Every node is a content site; click through to it. All ten doors share one shell, and the new OSS site plus the data, cloud, Skills and evals sections are included.'),
    cards: [
      card({ span: 8, no: '01', title: '站点生态图', sub: bi('1 个入口 + 9 个库', '1 entry + 9 libraries'), svg: nodeMap(WWW_NODES), foot: bi('圆圈大小只表示内容量级；各站单位不同，不能拿圆圈大小比质量。', 'Circle size encodes volume only; units differ, so size is not a quality comparison.') }),
      card({ span: 4, no: '02', title: '2026 关键更新', sub: bi('按官方日期排序', 'official dates only'), svg: timeline(tl, { w: 560, rowH: 51 }), foot: bi('只列有官方发布页的事件；每条的出处见各站的 2026 增补页。', 'Events with an official release page only; sources sit on each site’s 2026 page.') }),
      card({ span: 7, no: '03', title: '内容条目分布', sub: bi('各站内容量', 'content volume by site'), svg: barChart(bars), foot: bi('模型站按 GGUF 文件计，导航站按站点条目计；两者远大于其他站，横轴用真实数量，所以条长差得很开。', 'Models counts GGUF files and the directory counts site entries; both dwarf the rest, so the axis uses real counts and the bars differ a lot.') }),
      card({ span: 5, no: '04', title: '这一轮补了什么', sub: bi('新增分站 + 四个站内节 + 入口', 'one new site + four sections + entry points'), svg: `<div class="vz-list">
        <div><b>1</b><span>${bi('个 OSS 分站：50 个仓库、6 个场景、36 个精选；许可与 star 快照逐条标注', 'OSS site: 50 repos, 6 scenes, 36 curated; licence and star snapshots on every card')}</span></div>
        <div><b>4</b><span>${bi('个站内节：24 张数据集卡、20 个评测基准、18 家云算力、12 条 Skills', 'four sections: 24 dataset cards, 20 benchmarks, 18 cloud providers, 12 Skills entries')}</span></div>
        <div><b>1</b><span>${bi('个提示词 hub：6 篇方法指南 + 24 个可抄案例，链回工具站原有指南', 'prompt hub: 6 method guides + 24 copyable cases, linked to the existing tool guides')}</span></div>
        <div><b>5</b><span>${bi('张首页门卡：工具、模型、硬件首页各新增入口，枢纽页改成「直接用 / 自己搭」二分', 'homepage doors: new entries on tools, models and hardware, plus the use/build fork on the hub')}</span></div>
        <div><b>1853</b><span>${bi('条跨站搜索索引：新增数据、评测、云算力、Skills、提示词与 OSS 页面；OSS 已随上线进入索引', 'cross-site search records, including the new sections, prompts and OSS; OSS is indexed after launch')}</span></div>
        <div><b>10</b><span>${bi('个 2026 增补页 + 10 个 404 页：OSS 也补了 404，十站共用一套外壳', '2026 pages + 404 pages; OSS has its own 404 and all ten sites share one shell')}</span></div>
      </div>`, foot: bi('清单是这一轮的实际改动，不是路线图；每项都能在站内找到对应页面。', 'This is what changed, not a roadmap; every item has a page on the site.') }),
    ],
    foot: bi('所有数字取 2026-11-19 的构建结果；模型能力分数来自官方或第三方公开指数，不是本站实测。', 'All figures come from the 2026-11-19 build; model-capability scores come from official or third-party public indices, not measurements by this site.'),
    link: `<a href="updates-2026-11.html">${bi('读完整增补清单：2026 年 11 月更新中枢', 'Read the full change log: November 2026 hub')} →</a>`,
  });
}

function vizLearn() {
  const dir = path.join(ROOT, localPath('_data/handbook/terms/terms'));
  const rows = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'INDEX.md')
    .map((f) => fs.readFileSync(path.join(dir, f), 'utf8'));
  const layerCount = {};
  rows.forEach((t) => {
    const m = t.match(/^layer:\s*"?([^"\n]+)"?/m);
    if (m) layerCount[m[1].trim()] = (layerCount[m[1].trim()] || 0) + 1;
  });
  const layers = [
    ['一', '进门', 'var(--cat-teal)'],
    ['二', '会用', 'var(--cat-blue)'],
    ['三', '用深', 'var(--cat-amber)'],
    ['四', '看懂', 'var(--cat-violet)'],
    ['五', '选型', 'var(--cat-lime)'],
    ['六', '前沿', 'var(--cat-rose)'],
  ].map(([k, name, color]) => ({ label: `${k} · ${name}`, short: name, value: layerCount[k] || 0, color }));
  const cumulative = [];
  let running = 0;
  layers.forEach((l) => { running += l.value; cumulative.push({ label: l.short, value: running }); });
  const routeDir = path.join(ROOT, localPath('_data/handbook/terms/paths'));
  const routePaths = fs.existsSync(routeDir)
    ? fs.readdirSync(routeDir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(routeDir, f), 'utf8')))
    : [];
  const routeBuckets = [
    { label: '30–45 分钟', value: 0, color: 'var(--cat-teal)' },
    { label: '50–75 分钟', value: 0, color: 'var(--cat-blue)' },
    { label: '一个下午', value: 0, color: 'var(--cat-amber)' },
    { label: '一周', value: 0, color: 'var(--cat-rose)' },
  ];
  routePaths.forEach((p) => {
    const span = p.span?.zh || '';
    if (span.includes('一周')) routeBuckets[3].value++;
    else if (span.includes('下午')) routeBuckets[2].value++;
    else {
      const minutes = Number((span.match(/\d+/) || [0])[0]);
      if (minutes <= 45) routeBuckets[0].value++;
      else routeBuckets[1].value++;
    }
  });
  return section({
    id: 'map',
    kicker: '学 AI · 一张图看全貌',
    title: '先看清全貌，再挑一条路走',
    sub: 'learning map',
    dek: bi('不用一上来就背名词。先看看自己缺哪一块，再按那一块往下读；六站、十六条路线都在这张图上。', 'No need to memorise terms first. See which part you are missing, then read down from there; the six stations and sixteen routes are all on this map.'),
    cards: [
      card({ span: 7, no: '01', title: '六层，词都落在哪', sub: bi('当前词库', 'current glossary'), svg: barChart(layers, { labelW: 170 }), foot: bi('「用深」和「看懂」的词最多，因为这两块最容易被术语绕晕；先挑你卡住的那一层，不用从头背。', '“Use deeply” and “understand” carry the most terms because those are where jargon gets densest. Start with the layer you are stuck on; no need to memorise them all.') }),
      card({ span: 5, no: '02', title: '最近补的四个词', sub: bi('训练、推理、表征、生成各一个', 'one each for training, inference, representation, generation'), svg: `<div class="vz-map">
        <div class="vz-map-row"><span class="vz-tag">${bi('训练', 'Training')}</span><b>GRPO</b><small>${bi('组内相对优势，省掉 critic', 'group-relative advantage, no critic')}</small></div>
        <div class="vz-map-row"><span class="vz-tag">${bi('推理', 'Inference')}</span><b>MLA</b><small>${bi('低秩压缩 KV，长上下文更省显存', 'low-rank KV compression for long context')}</small></div>
        <div class="vz-map-row"><span class="vz-tag">${bi('表征', 'Representation')}</span><b>JEPA</b><small>${bi('预测表示而不是像素', 'predict representations, not pixels')}</small></div>
        <div class="vz-map-row"><span class="vz-tag">${bi('生成', 'Generation')}</span><b>Flow Matching</b><small>${bi('连续流，替代部分扩散步', 'continuous flow, fewer steps than diffusion')}</small></div>
      </div>`, foot: bi('这四个词经常被提到，但之前站内没有独立解释；现在各有一页，写清它是什么、用在哪、哪里不适用。', 'These four come up often but had no standalone explanation here; each now has a page covering what it is, where it is used and where it is not.') }),
      card({ span: 12, no: '03', title: '从词条到路径', sub: bi('六层不是六个文件夹，是一条可走的路线', 'six levels, one walkable route'), svg: `<div class="vz-path">
        <span>${bi('进门', 'Enter')}</span><i>→</i><span>${bi('会用', 'Use')}</span><i>→</i><span>${bi('用深', 'Use deeply')}</span><i>→</i><span>${bi('看懂', 'Understand')}</span><i>→</i><span>${bi('选型', 'Choose')}</span><i>→</i><span>${bi('前沿', 'Frontier')}</span>
      </div>`, foot: bi('每个词条都标了所属层和难度；路径页把「先读什么」排成顺序，不按字母表。', 'Every term carries its level and difficulty; the path page orders what to read first, not alphabetically.') }),
      card({ span: 7, no: '04', title: '六站累计：知识是一层层叠上去的', sub: bi('累计词条数 · 当前词库', 'cumulative terms · current glossary'), svg: lineChart(cumulative), foot: bi('前两站先打 80 个词的地基，第三站「用深」一次加 67 个。别从最难的开始，先有底再往上叠。', 'The first two stations lay an 80-term foundation; station three adds 67 more at once. Do not start with the hardest layer — build a base first.') }),
      card({ span: 5, no: '05', title: bi(`${routePaths.length} 条路线，大半不到 45 分钟`, `${routePaths.length} paths, most under 45 minutes`), sub: bi('按建议投入时间分组', 'routes grouped by suggested time'), svg: donut(routeBuckets, { total: routePaths.length, center: String(routePaths.length), w: 460, h: 240 }), foot: bi(`${routeBuckets[0].value} 条路线 45 分钟内能走完，适合今天先动一下；一个下午、一周各 ${routeBuckets[2].value} 条，适合系统学。`, `${routeBuckets[0].value} routes finish within 45 minutes — enough to start today; ${routeBuckets[2].value} afternoon-length and ${routeBuckets[3].value} week-length route are for deeper study.`) }),
    ],
    foot: bi('说明：词条按所属层计数，不含指南和路径页。', 'Note: terms count by their level; guides and path pages are excluded.'),
    link: `<a href="2026.html">${bi('读 2026 学 AI 补丁包：四个新概念 + 一篇指南更新', 'Read the 2026 learn patch: four concepts + one guide update')} →</a>`,
  });
}

function vizTools() {
  const cats = [
    { label: '编程', value: 41, color: 'var(--cat-blue)' },
    { label: '框架', value: 42, color: 'var(--cat-violet)' },
    { label: 'MCP', value: 32, color: 'var(--cat-teal)' },
    { label: '安全与评测', value: 25, color: 'var(--cat-rose)' },
    { label: '自动化', value: 24, color: 'var(--cat-amber)' },
    { label: '对话', value: 23, color: 'var(--cat-lime)' },
    { label: '本地运行器', value: 21, color: 'var(--cat-blue)' },
    { label: '音频', value: 17, color: 'var(--cat-violet)' },
    { label: '图像', value: 15, color: 'var(--cat-teal)' },
    { label: '视频', value: 14, color: 'var(--cat-amber)' },
    { label: '研究', value: 11, color: 'var(--cat-rose)' },
  ];
  const tl = [
    { date: '2025-12', title: 'Agent Skills 作为开放标准发布', desc: '一个文件夹 + SKILL.md，跨平台可移植', color: 'var(--cat-lime)' },
    { date: '2026-01-26', title: 'MCP Apps 定稿', desc: 'ui:// 资源 + 沙箱 iframe + JSON-RPC 回传', color: 'var(--cat-blue)' },
    { date: '2026-07-28', title: 'MCP 下一版规范候选', desc: '无状态核心、Extensions、Tasks 扩展', color: 'var(--cat-violet)' },
    { date: '2026-10-22', title: 'Agent Skills 捐给 AAIF', desc: '70+ 平台接入，标准交给 Linux 基金会下的 AAIF', color: 'var(--cat-amber)' },
    { date: '2026-11', title: 'AG-UI 1.0 规范', desc: 'Agent ↔ 用户的事件流，HTTP + SSE', color: 'var(--cat-teal)' },
  ];
  return section({
    id: 'shape',
    kicker: '工具 · 一张图看全貌',
    title: '工具越来越多，先按任务找',
    sub: 'tool landscape',
    dek: bi('下面看各任务有多少选择，以及 2026 年 Agent 工具是怎么接起来的。找现成的、自己搭、接上跑，三条路分开走。', 'See how many options sit in each task, and how agent tools are wired in 2026. Ready-made, build-your-own and plug-in-and-run are three separate paths.'),
    cards: [
      card({ span: 7, no: '01', title: '各任务的选择数量', sub: bi('按主用途计数', 'by primary use'), svg: barChart(cats, { labelW: 170 }), foot: bi('一个工具只归一个主用途，避免重复计数。数字多不代表都好用，只是说明这一类选择多。', 'Each tool has one primary use to avoid double counting. More options do not mean better tools; they mean more to compare.') }),
      card({ span: 5, no: '02', title: '协议时间线', sub: bi('MCP / Skills / AG-UI', 'MCP / Skills / AG-UI'), svg: timeline(tl, { w: 560, rowH: 49 }), foot: bi('只列有官方规范或官方公告的节点；协议发布不等于产品已经采用。', 'Official specs or announcements only; a protocol release does not mean products have adopted it.') }),
      card({ span: 12, no: '03', title: '三层接线', sub: bi('工具与数据 / Agent 与 Agent / Agent 与用户', 'tools & data / agent ↔ agent / agent ↔ user'), svg: `<div class="vz-wire">
        <div><b>MCP</b><span>${bi('Agent ↔ 工具与数据', 'agent ↔ tools & data')}</span><small>${bi('A2A 负责 Agent 之间，MCP 负责工具与上下文；2026 的 MCP Apps 把「返回一个界面」也变成工具能力。', 'A2A handles agent-to-agent; MCP handles tools and context. MCP Apps in 2026 makes “return a UI” a tool capability.')}</small></div>
        <div><b>A2A</b><span>${bi('Agent ↔ Agent', 'agent ↔ agent')}</span><small>${bi('跨组织、跨框架的任务委派与能力发现；与 MCP 不互斥。', 'Cross-org, cross-framework delegation and discovery; not a replacement for MCP.')}</small></div>
        <div><b>AG-UI</b><span>${bi('Agent ↔ 用户', 'agent ↔ user')}</span><small>${bi('一条有序事件流，把 token、工具调用、共享状态与中断送到前端。', 'One ordered event stream for tokens, tool calls, shared state and interrupts.')}</small></div>
      </div>`, foot: bi('三种协议解决三个不同边界；把任何一个当成「万能协议」都会接错线。', 'Three protocols, three boundaries; treating any one as universal wires the wrong thing.') }),
    ],
    foot: bi('说明：类目按主用途计数；协议节点只取官方规范或公告，不把第三方教程当发布。', 'Note: categories count primary uses; protocol dates come from official specs or announcements, never third-party tutorials.'),
    link: `<a href="2026.html">${bi('看 2026 工具协议的变化：MCP Apps、Agent Skills、AG-UI、MCP 无状态核心', 'See what changed in tool protocols in 2026: MCP Apps, Agent Skills, AG-UI, stateless MCP')} →</a>`,
  });
}

function vizModels() {
  const famDir = path.join(ROOT, localPath('_data/handbook/models/data/families'));
  const fams = fs.readdirSync(famDir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(famDir, f), 'utf8')));
  const month = {};
  fams.forEach((f) => {
    const d = (f.currentGenDate || '').slice(0, 7);
    if (d) month[d] = (month[d] || 0) + 1;
  });
  const months = Object.keys(month).sort().map((m) => ({ label: m.slice(2), value: month[m], color: m.startsWith('2025') ? 'var(--ink-faint)' : 'var(--brand)' }));
  const tl = [
    { date: '2026-07', title: 'Kimi K3 开放权重', desc: '2.8T 总参 / 104B 激活，16/896 专家，1M 上下文', color: 'var(--cat-violet)' },
    { date: '2026-08', title: 'GLM-5.3 与 GLM-5.3-Flash', desc: '同基座后训练 Scaling；Flash 320B-A18B 随后 MIT 开源', color: 'var(--cat-blue)' },
    { date: '2026-09', title: 'DeepSeek V4.1 Flash', desc: '552B MoE / 8B prefill / 16B decode，KV 缓存大幅压缩', color: 'var(--cat-teal)' },
    { date: '2026-09', title: '小米 MiMo-V2.6', desc: 'Pro / Flash 双线，原生全模态，AA Intelligence 46.32', color: 'var(--cat-amber)' },
    { date: '2026-10', title: 'Meta Muse Spark Open', desc: '816B / 42B 激活，1M 上下文，Muse Model License', color: 'var(--cat-rose)' },
    { date: '2026-10', title: 'Mistral Large 4', desc: '1.05T / 49B 激活，128 路由专家，1M 上下文', color: 'var(--cat-lime)' },
  ];
  return section({
    id: 'lineage',
    kicker: '模型 · 一张图看全貌',
    title: '开放权重模型，现在走到哪一代',
    sub: 'lineage',
    dek: bi('看家族换代的节奏、模型仓和量化仓的体量，以及 2026 年新发布的几个模型。先选家族和尺寸，再挑量化版。', 'See the generation cadence, the number of model and quant repos, and the models released in 2026. Pick a family and size first, then a quantisation.'),
    cards: [
      card({ span: 6, no: '01', title: '家族当前代次的时间分布', sub: bi('按当前代发布日期', 'by current generation date'), svg: columnChart(months, { w: 620, h: 260 }), foot: bi('2026-08 是发布密集月，8 个家族在那个月换代；2025 仍有两个家族停留在旧代。', 'August 2026 was busy: eight families moved generation that month. Two families still sit on 2025 generations.') }),
      card({ span: 3, no: '02', title: '模型仓 vs 量化仓', sub: bi('16 vs 129', '16 vs 129'), svg: donut([
        { label: '模型仓', value: 16, color: 'var(--cat-violet)' },
        { label: '量化仓', value: 129, color: 'var(--cat-teal)' },
      ], { center: '145', note: 'repos', w: 460, h: 240 }), foot: bi('一个模型仓平均对应 8 个量化仓；所以「下哪一个文件」通常比「选哪个模型」更费时间。', 'One model repo maps to roughly eight quant repos; that is why “which file” takes longer than “which model”.') }),
      card({ span: 3, no: '03', title: '量化档 vs GGUF 文件', sub: bi('1262 vs 1337', '1262 vs 1337'), svg: donut([
        { label: '量化档', value: 1262, color: 'var(--cat-amber)' },
        { label: 'GGUF 文件', value: 1337, color: 'var(--cat-blue)' },
      ], { center: '1.06×', note: 'files/tier', w: 460, h: 240 }), foot: bi('分片让文件数略高于档数；下载时按档选，不要按文件数猜体积。', 'Sharding makes files slightly outnumber tiers; choose by tier, not by file count.') }),
      card({ span: 12, no: '04', title: '2026 六个新节点', sub: bi('只列开放权重', 'open weights only'), svg: timeline(tl, { w: 700, rowH: 45 }), foot: bi('Mistral Large 4 与 Muse Spark 的许可是「修改版 MIT / 厂商许可」，不是 OSI 标准；商用前读原文。', 'Mistral Large 4 and Muse Spark use modified MIT / vendor licences, not OSI-approved terms; read the text before commercial use.') }),
    ],
    foot: bi('说明：家族、系列、模型仓、量化仓、量化档和 GGUF 文件数都来自当前数据；数字用于看体量，不用于给模型排高低。', 'Note: family, series, model-repo, quant-repo, tier and GGUF counts come from the current data; they show scale, not a model ranking.'),
    link: `<a href="2026.html">${bi('看 2026 模型增补：Mistral Large 4、Muse Spark、MiMo、Kimi K3、DeepSeek V4.1、GLM-5.3', 'See the 2026 model patch: Mistral Large 4, Muse Spark, MiMo, Kimi K3, DeepSeek V4.1, GLM-5.3')} →</a>`,
  });
}

function vizHardware() {
  const rows = [
    { label: 'Rubin · HBM4', value: 288, color: 'var(--cat-violet)' },
    { label: 'B300 · HBM3e', value: 288, color: 'var(--cat-blue)' },
    { label: 'MI455X · HBM4', value: 432, color: 'var(--cat-rose)' },
    { label: 'MI450X · HBM4', value: 288, color: 'var(--cat-amber)' },
    { label: 'TPU7x · HBM3E', value: 192, color: 'var(--cat-lime)' },
    { label: 'H200 · HBM3e', value: 141, color: 'var(--ink-faint)' },
  ];
  const pts = [
    { x: 32, y: 1.79, label: 'RTX 5090', color: 'var(--ink-faint)', dx: 10, dy: -10 },
    { x: 80, y: 3.35, label: 'H100', color: 'var(--cat-blue)', dx: 10, dy: -10 },
    { x: 141, y: 4.8, label: 'H200', color: 'var(--cat-blue)', dx: 10, dy: -10 },
    { x: 192, y: 8, label: 'B200', color: 'var(--cat-violet)', dx: 10, dy: -12 },
    { x: 288, y: 8, label: 'B300', color: 'var(--cat-violet)', dx: 10, dy: -10 },
    { x: 288, y: 22, label: 'Rubin', color: 'var(--cat-rose)', dx: -66, dy: -8 },
    { x: 192, y: 7.38, label: 'TPU7x', color: 'var(--cat-lime)', dx: 10, dy: 22 },
    { x: 432, y: 23.3, label: 'MI455X', color: 'var(--cat-amber)', dx: -10, dy: -20 },
    { x: 288, y: 23.3, label: 'MI450X', color: 'var(--cat-amber)', dx: 10, dy: 22 },
  ];
  const tl = [
    { date: '2026-04-22', title: 'TPU7x（Ironwood）GA', desc: '192GiB HBM3E / 7.38TB/s / 9,216 chips per pod', color: 'var(--cat-lime)' },
    { date: '2026-07-23', title: 'AMD MI455X 上市', desc: '432GB HBM4 / 23.3TB/s / 40.3 PF MXFP4', color: 'var(--cat-rose)' },
    { date: '2026-07-23', title: 'AMD Helios 机架', desc: '72× MI455X / 31TB HBM4 / 2.9 EF FP4', color: 'var(--cat-amber)' },
    { date: '2026-11-12', title: 'AMD MI450X 上市', desc: '288GB HBM4 / 23.3TB/s / 40.3 PF MXFP4', color: 'var(--cat-amber)' },
    { date: '2026-11', title: 'Vera Rubin NVL72', desc: '72 GPU 机架；Rubin 单卡 288GB / 22TB/s', color: 'var(--cat-violet)' },
    { date: '2026-11', title: 'Blackwell Ultra B300', desc: '288GB HBM3e / 8TB/s / 15 PF dense NVFP4', color: 'var(--cat-blue)' },
  ];
  return section({
    id: 'silicon',
    kicker: '硬件算力 · 一张图看全貌',
    title: '显存和带宽，决定你能跑多大模型',
    sub: 'silicon',
    dek: bi('把「能装多大」和「喂得多快」放在一张图上：越靠右上，越适合长上下文和高并发。下面还标了 2026 年值得留意的几个硬件节点。', 'Capacity and bandwidth on one chart: the further up and to the right, the better suited to long context and high concurrency. The 2026 hardware releases are marked below too.'),
    cards: [
      card({ span: 7, no: '01', title: 'HBM 容量 × 带宽', sub: bi('9 个代表型号，对数横轴', '9 representative parts, log x-axis'), svg: scatter(pts), foot: bi('不同厂商的 FP4 口径不同：NVIDIA 写 NVFP4，AMD 写 OCP MXFP4；点的高度只表示官方带宽，不表示算力排名。', 'FP4 formats differ: NVIDIA says NVFP4, AMD says OCP MXFP4. Height encodes official bandwidth only, not a compute ranking.') }),
      card({ span: 5, no: '02', title: '2026 六个硬件节点', sub: bi('发布 / 上市日期', 'release / launch dates'), svg: timeline(tl, { w: 560, rowH: 50 }), foot: bi('B300 的 15 PF 是 dense NVFP4；Rubin 的 50 PF 是 NVFP4 推理性能。两者不能直接横比。', 'B300’s 15 PF is dense NVFP4; Rubin’s 50 PF is NVFP4 inference performance. They are not directly comparable.') }),
      card({ span: 12, no: '03', title: '同样 288GB，为什么不是同一张卡', sub: bi('容量相同，带宽与互联差一个代际', 'same capacity, different generation'), svg: `<div class="vz-compare">
        <div><b>B300</b><span>288GB HBM3e</span><span>8TB/s</span><span>NVLink 5 1.8TB/s</span><small>${bi('Blackwell Ultra；15 PF dense NVFP4；最高 1400W。', 'Blackwell Ultra; 15 PF dense NVFP4; up to 1,400W.')}</small></div>
        <div><b>Rubin</b><span>288GB HBM4</span><span>22TB/s</span><span>NVLink 6 3.6TB/s</span><small>${bi('Vera Rubin；50 PF NVFP4 推理；336B 晶体管。', 'Vera Rubin; 50 PF NVFP4 inference; 336B transistors.')}</small></div>
        <div><b>MI450X</b><span>288GB HBM4</span><span>23.3TB/s</span><span>UALoE 3.6TB/s</span><small>${bi('CDNA5；40.3 PF MXFP4；8 个 HBM4 stack。', 'CDNA5; 40.3 PF MXFP4; eight HBM4 stacks.')}</small></div>
      </div>`, foot: bi('三张卡都写 288GB，但 HBM 代际、带宽、互联与软件栈不同；采购时先把「容量」之外的三个数拉出来。', 'All three say 288GB, but HBM generation, bandwidth, interconnect and software stack differ; pull those three numbers before comparing capacity.') }),
    ],
    foot: bi('说明：容量为单卡 HBM，不含整机；带宽为官方峰值。整机 / 机架数字另计入 Helios 条目。', 'Note: capacity is per-GPU HBM, not system; bandwidth is the official peak. Rack-level figures sit in the Helios entry.'),
    link: `<a href="2026.html">${bi('看 2026 硬件增补：Rubin、B300、MI455X、MI450X、TPU7x、Helios', 'See the 2026 hardware patch: Rubin, B300, MI455X, MI450X, TPU7x, Helios')} →</a>`,
  });
}

function vizPapers() {
  const entries = readJSON('_data/handbook/frontier/papers/entries.json');
  const cats = {};
  entries.forEach((e) => { cats[e.category] = (cats[e.category] || 0) + 1; });
  const catRows = Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([k, v], i) => ({ label: k, value: v, color: ['var(--cat-violet)', 'var(--cat-blue)', 'var(--cat-teal)', 'var(--cat-amber)', 'var(--cat-rose)', 'var(--cat-lime)'][i % 6] }));
  const yrs = {};
  entries.forEach((e) => {
    const m = (e.url || '').match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})/);
    const y = m ? `20${m[1]}` : (e.verifiedAt || '').slice(0, 4);
    if (y) yrs[y] = (yrs[y] || 0) + 1;
  });
  const yearRows = Object.keys(yrs).sort().map((y) => ({ label: y, value: yrs[y], color: y === '2026' ? 'var(--cat-rose)' : 'var(--brand)' }));
  const tl = [
    { date: '2026-10-07', title: 'Byteification · Nature', desc: '49.1B token 把子词模型改成字节级', color: 'var(--cat-rose)' },
    { date: '2026-10-29', title: 'JEPA-PRH · arXiv', desc: '109M 文本 JEPA 的表征对齐超过 72B LLM', color: 'var(--cat-violet)' },
    { date: '2026', title: 'Recognition–Refusal · EMNLP', desc: '「识别不可答」与「安全拒答」不是同一个方向', color: 'var(--cat-amber)' },
    { date: '2026', title: 'Abstain-R1 · ACL', desc: '3B 模型的可校准弃答与拒答后澄清', color: 'var(--cat-teal)' },
  ];
  return section({
    id: 'evidence',
    kicker: 'AI 论文 · 一张图看全貌',
    title: '这些论文，分别在回答什么问题',
    sub: 'evidence map',
    dek: bi('按主题和年份看分布，想深读就点原文。每篇笔记都写清它研究的问题、证据放在哪、作者自己承认哪些局限。', 'Browse by topic and year, then open the original. Each note states the question, where the evidence sits and which limits the authors admit.'),
    cards: [
      card({ span: 6, no: '01', title: '主题分布', sub: bi('一篇论文只记一个主主题', 'one primary topic per paper'), svg: barChart(catRows, { labelW: 150 }), foot: bi('主题表示「这篇主要在回答哪类问题」，不是质量分级；一篇论文可以同时属于两类，这里只记主类。', 'Topic shows the main question, not quality; a paper can fit two topics, only the primary one is counted.') }),
      card({ span: 6, no: '02', title: '年份分布', sub: bi('按 arXiv 编号推断', 'inferred from arXiv ID'), svg: columnChart(yearRows, { w: 620, h: 260 }), foot: bi('2026 的柱子会随 2026 增补变高；年份推断只用于看分布，具体日期以论文页为准。', 'The 2026 bar grows with the 2026 patch; the inferred year is for distribution only. The paper page has the actual date.') }),
      card({ span: 12, no: '03', title: '2026 四个新节点', sub: bi('研究线，不是产品线', 'research, not product'), svg: timeline(tl, { w: 700, rowH: 46 }), foot: bi('四篇都写了「它没主张什么」：Byteification 没说所有任务都更好；JEPA-PRH 是表征对齐，不是生成质量；识别—拒答是路由问题，不是通用安全；Abstain-R1 是 3B 规模。', 'All four carry “what it does not claim”: Byteification does not claim all tasks improve; JEPA-PRH is representation alignment, not generation quality; recognition–refusal is routing, not general safety; Abstain-R1 is 3B-scale.') }),
    ],
    foot: bi('说明：年份按 arXiv 编号推断；所有条目都有原文链接，引用前先看实验设置。', 'Note: years are inferred from arXiv IDs; every entry links the original, and you should read the experiment setup before citing.'),
    link: `<a href="2026.html">${bi('看 2026 论文增补：Byteification、JEPA-PRH、识别—拒答错位、Abstain-R1', 'See the 2026 paper patch: Byteification, JEPA-PRH, recognition–refusal, Abstain-R1')} →</a>`,
  });
}

function vizChain() {
  const entries = readJSON('_data/handbook/frontier/chain/entries.json');
  const cats = {};
  entries.forEach((e) => { cats[e.category] = (cats[e.category] || 0) + 1; });
  const catRows = Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([k, v], i) => ({ label: k, value: v, color: ['var(--cat-violet)', 'var(--cat-blue)', 'var(--cat-teal)', 'var(--cat-amber)', 'var(--cat-rose)'][i % 5] }));
  const layers = [
    { name: '身份', sub: '谁在操作', examples: 'ERC-8004 Identity / ERC-721 / DID', color: 'var(--cat-violet)' },
    { name: '声誉', sub: '过去做得怎样', examples: 'ERC-8004 Reputation / EAS', color: 'var(--cat-blue)' },
    { name: '验证', sub: '这一次做得对不对', examples: 'ERC-8004 Validation / zkML / TEE', color: 'var(--cat-teal)' },
    { name: '结算', sub: '钱怎么付、怎么退', examples: 'x402 / AP2 / Visa TAP / Agent Pay', color: 'var(--cat-amber)' },
  ];
  const tl = [
    { date: '2021-09', title: 'ERC-4337 草案', desc: 'UserOperation + Bundler + Paymaster，不改共识层', color: 'var(--cat-blue)' },
    { date: '2025-10', title: 'Visa TAP 发布', desc: 'Visa + Cloudflare；HTTP 签名识别可信购物 agent', color: 'var(--cat-amber)' },
    { date: '2026-01-29', title: 'ERC-8004 主网上线', desc: '身份 / 声誉 / 验证三套 singleton registry', color: 'var(--cat-violet)' },
    { date: '2026-03', title: 'Mastercard Agent Pay 多市场 live', desc: 'Agentic Token + Payment Passkeys；新加坡/亚太/拉美', color: 'var(--cat-rose)' },
    { date: '2026-04-28', title: 'AP2 v0.2 + 捐给 FIDO', desc: 'Human Not Present；SD-JWT mandate', color: 'var(--cat-teal)' },
    { date: '2026-07', title: 'Visa 欧洲真实交易', desc: '30+ 发卡行与 lastminute.com 等商户', color: 'var(--cat-amber)' },
    { date: '2026-10', title: 'BILL + Billtrust B2B pilot', desc: 'TAP 完成供应商发票支付，端到端 live', color: 'var(--cat-rose)' },
  ];
  return section({
    id: 'trust',
    kicker: '链 · 一张图看全貌',
    title: 'AI 自己办事，<br class="br-sm" />先解决「凭什么信它」',
    sub: 'trust stack',
    dek: bi('身份、声誉、验证、结算四层分开看；「上链」不等于「可信」。想找某个协议或标准，按下面的类目进去。', 'Identity, reputation, validation and settlement are kept separate; “on-chain” is not “trustworthy”. Pick a category below to find a protocol or standard.'),
    cards: [
      card({ span: 7, no: '01', title: '四层信任栈', sub: bi('从「谁」到「钱」', 'from who to money'), svg: stack(layers), foot: bi('四层可以分开采用：只做身份发现、不做链上声誉，也是一种合法用法。ERC-8004 的 supportedTrust 允许为空。', 'Layers can be adopted separately: identity discovery without on-chain reputation is legitimate. ERC-8004’s supportedTrust may be empty.') }),
      card({ span: 5, no: '02', title: '类目分布', sub: bi('按主类目看条目', 'entries by primary category'), svg: barChart(catRows, { labelW: 140 }), foot: bi('protocol 条目最多，因为标准比产品更容易留下可引原文；这不代表协议比产品更重要。', 'Protocol has the most entries because standards leave citable text more often than products; that is not a claim that protocols matter more.') }),
      card({ span: 12, no: '03', title: '2021 → 2026 七个节点', sub: bi('规范、上线与真实交易分开看', 'specs, launches and live transactions kept separate'), svg: timeline(tl, { w: 700, rowH: 42 }), foot: bi('ERC-8004 仍是 Draft，v2 在开发；AP2 已捐给 FIDO，截至 2026-10 仍没有公开确认的生产交易。Visa TAP 与 Mastercard Agent Pay 则已有真实商户/发票支付：前者 2026-07 在欧洲 30+ 发卡行跑通，后者 2026 在新加坡、亚太与拉美多市场 live。把「支付网络已跑通」写成「AP2 已普及」是两回事。', 'ERC-8004 is still Draft with v2 in development; AP2 is under FIDO and still has no publicly confirmed production transaction as of October 2026. Visa TAP and Mastercard Agent Pay, by contrast, have live merchant/invoice payments: TAP went live in Europe with 30+ issuers in July 2026, and Agent Pay completed live transactions across Singapore, Asia-Pacific and Latin America in 2026. “Card networks are live” is not “AP2 is everywhere”.') }),
    ],
    foot: bi('说明：已上线、Draft、生产未确认分开标；不合并成「可用」。', 'Note: live, Draft and unconfirmed-production are labelled separately, never collapsed into “available”.'),
    link: `<a href="2026.html">${bi('看 2026 链增补：ERC-4337、ERC-8004、AP2、Visa TAP 与信任栈', 'See the 2026 chain patch: ERC-4337, ERC-8004, AP2, Visa TAP and the trust stack')} →</a>`,
  });
}

function vizNav() {
  const d = readJSON('_data/nav/nav-data.json');
  const items = d.items || [];
  const cats = d.categories || [];
  const counts = cats.filter((c) => c.code !== 'ext').map((c) => ({ label: c.name, value: items.filter((x) => (x.cat || x.category) === c.code).length, color: 'var(--cat-blue)' }));
  const top = counts.filter((x) => x.value > 0).sort((a, b) => b.value - a.value).slice(0, 8);
  return section({
    id: 'health',
    kicker: 'AI 导航 · 一张图看全貌',
    title: '找 AI 网站，不用一个个翻',
    sub: 'directory health',
    dek: bi('下面看大家最常找的几类网站，以及链接检查的结果。点名字直接去官网；打不开的会标出来。', 'See which kinds of sites people look for most, and how the link check went. Click a name to go straight to the official site; dead links are marked.'),
    cards: [
      card({ span: 7, no: '01', title: '大家常找的几类', sub: bi('按用途分类，取前 8 类', 'top 8 by use'), svg: barChart(top, { labelW: 190 }), foot: bi('一个网站只归一个主用途；「延伸领域」不画进来，因为它不是 AI 主类目，而是跨学科的出口。', 'Each site has one primary use; “extended fields” is omitted because it is a cross-disciplinary exit, not an AI category.') }),
      card({ span: 5, no: '02', title: '链接还能打开吗', sub: bi('定期检查的结果', 'from the regular link check'), svg: donut([
        { label: '能打开', value: 608, color: 'var(--ok)' },
        { label: '暂未确认', value: 92, color: 'var(--warn)' },
        { label: '已失效', value: 0, color: 'var(--stop)' },
      ], { total: 700, center: '608', note: 'live' }), foot: bi('700 个域名中 608 个确认存活，92 个探测环境受限未能确认；「暂未确认」不等于失效，多数是被反爬或地区限制挡住。把未确认写成失效，是目录站最常见的过度断言。', 'Of 700 domains, 608 are confirmed live and 92 are limited by the probe environment; “unconfirmed” is not dead — most are blocked by anti-bot or region limits. Calling them dead is the usual overclaim in directories.') }),
      card({ span: 12, no: '03', title: '这里只是入口', sub: bi('帮你离开本站，不是让你多待一会', 'an exit, not a place to linger'), svg: `<div class="vz-wire">
        <div><b>一句话</b><span>${bi('说明这个站能做什么', 'what the site does')}</span><small>${bi('每条都有一句说明、几个标签和一个官网链接。', 'One description, a few tags and an official link per entry.')}</small></div>
        <div><b>按用途</b><span>${bi('按你想做的事找', 'find it by what you want to do')}</span><small>${bi('按「我想做什么」组织，不按厂商规模排序。', 'Organised by “what I want to do”, not vendor size.')}</small></div>
        <div><b>会更新</b><span>${bi('失效的会标出来', 'dead links get marked')}</span><small>${bi('失效条目会标 retired 并给停运出处，不静默删除。', 'Dead entries are marked retired with a shutdown source, never silently deleted.')}</small></div>
      </div>`, foot: bi('导航站的价值是「帮你找到要去的地方」，不是停留时长。', 'A directory’s job is to get you where you are going, not to keep you here.') }),
    ],
    foot: bi('说明：分类按主用途；链接状态来自定期检查；「暂未确认」不等于失效。', 'Note: categories follow primary use; link status comes from the regular check; “unconfirmed” is not dead.'),
    link: `<a href="2026.html">${bi('看 2026 导航增补：今年新增和改版的站外入口', 'See the 2026 directory patch: new and changed off-site entries')} →</a>`,
  });
}

function vizDemos() {
  const entries = readJSON('_data/handbook/frontier/demos/entries.json');
  const catCount = {};
  entries.forEach((e) => { catCount[e.category] = (catCount[e.category] || 0) + 1; });
  const catRows = [
    ['互动体验', 'var(--cat-teal)'],
    ['数据可视化', 'var(--cat-blue)'],
    ['内容与视觉', 'var(--cat-amber)'],
    ['工具与界面', 'var(--cat-violet)'],
    ['模型演示', 'var(--cat-rose)'],
    ['办公', 'var(--cat-lime)'],
    ['教育', 'var(--cat-blue)'],
    ['数据', 'var(--cat-teal)'],
  ].map(([label, color]) => ({ label, value: catCount[label] || 0, color }));
  const modelMap = new Map();
  entries.forEach((e) => {
    const name = e.model?.name || '—';
    modelMap.set(name, (modelMap.get(name) || 0) + 1);
  });
  const modelSorted = [...modelMap].sort((a, b) => b[1] - a[1]);
  const modelTop = modelSorted.slice(0, 7);
  const modelRest = modelSorted.slice(7);
  const modelRows = modelTop.map(([label, value], i) => ({
    label,
    value,
    color: ['var(--cat-violet)', 'var(--cat-blue)', 'var(--cat-amber)', 'var(--cat-rose)'][i % 4],
  }));
  if (modelRest.length) {
    modelRows.push({
      label: `其他 ${modelRest.length} 组`,
      value: modelRest.reduce((n, [, v]) => n + v, 0),
      color: 'var(--ink-faint)',
    });
  }
  const embedded = entries.filter((e) => e.run?.status === 'embedded').length;
  const external = entries.length - embedded;
  const noLicence = entries.filter((e) => e.license?.kind === 'no-license-external-link').length;
  const unknown = entries.filter((e) => e.license?.kind === 'unknown-external-link').length;
  const freeShare = entries.filter((e) => e.license?.kind === 'free-share').length;
  return section({
    id: 'atlas',
    kicker: '演示 · 一张图看全貌',
    title: '这些作品，先看大家在做什么',
    sub: 'gallery map',
    dek: bi('先按用途和模型看整体，再挑感兴趣的打开。每件作品都标了模型和来源；单件作品不代表模型整体能力。', 'Start with the overall picture by use and model, then open the pieces that catch your eye. Each piece lists its model and source; one piece is not a verdict on the model.'),
    cards: [
      card({
        span: 7, no: '01', title: '作品都在做什么', sub: bi('八类用途的真实计数', 'eight uses, live counts'),
        svg: barChart(catRows, { labelW: 150 }),
        foot: bi(`互动体验 ${catCount['互动体验'] || 0} 件、数据可视化 ${catCount['数据可视化'] || 0} 件、内容与视觉 ${catCount['内容与视觉'] || 0} 件、工具与界面 ${catCount['工具与界面'] || 0} 件、模型演示 ${catCount['模型演示'] || 0} 件、办公 ${catCount['办公'] || 0} 件、教育 ${catCount['教育'] || 0} 件、数据 ${catCount['数据'] || 0} 件。`, `Interaction ${catCount['互动体验'] || 0}, data visualisation ${catCount['数据可视化'] || 0}, content & visual ${catCount['内容与视觉'] || 0}, tools & UI ${catCount['工具与界面'] || 0}, model demos ${catCount['模型演示'] || 0}, office ${catCount['办公'] || 0}, education ${catCount['教育'] || 0}, data ${catCount['数据'] || 0}.`),
      }),
      card({
        span: 5, no: '02', title: `${modelSorted.length} 组模型 / 实验`, sub: bi('按完整模型名归并；前七组单列，其余合并', 'grouped by full model name; top seven listed, the rest merged'),
        svg: donut(modelRows, { total: entries.length, center: String(entries.length), note: 'pieces', h: 286 }),
        foot: bi(`${modelSorted.map(([label, value]) => `${label} ${value}`).join(' · ')}；模型名用完整厂商 + 型号，不是能力排名。`, `${modelSorted.map(([label, value]) => `${label} ${value}`).join(' · ')}; names use vendor + model, and this is not a capability rank.`),
      }),
      card({
        span: 12, no: '03', title: '运行方式与许可边界', sub: bi('十五件站内运行，其余链回原页', 'fifteen run here, the rest link out'),
        svg: `<div class="vz-wire">
          <div><b>${embedded}</b><span>${bi('件站内运行', 'run here')}</span><small>${bi('3 件 free-share 作品按原许可托管，12 件 CC BY 4.0 作品嵌入；均使用受限 iframe，不使用 allow-same-origin。', 'Three free-share pieces are hosted under their licence and twelve CC BY 4.0 pieces are embedded; all use a restricted iframe without allow-same-origin.')}</small></div>
          <div><b>${external}</b><span>${bi('件外链运行', 'link out')}</span><small>${bi('其余作品链回原作者页面；画面空白通常是对方禁止嵌入，不是本站的播放器坏了。', 'The rest link back to the author; a blank frame usually means embedding is blocked, not that the player is broken.')}</small></div>
          <div><b>${noLicence}</b><span>${bi('件许可未声明', 'no declared licence')}</span><small>${bi(`${unknown} 件许可未确认，${freeShare} 件 free-share；未声明许可的完整文件不复制。`, `${unknown} unconfirmed, ${freeShare} free-share; unlicensed full files are never copied.`)}</small></div>
        </div>`,
        foot: bi(`说明：当前共 ${entries.length} 条作品、${modelRows.length} 组模型/实验、8 类用途；这里的「件」是作品，不是模型数量。`, `Note: ${entries.length} pieces, ${modelRows.length} model/experiment groups and eight uses; “pieces” counts works, not models.`),
      }),
    ],
    foot: bi('所有数字来自演示站当前数据；按用途与模型筛选，单件作品不写成模型能力结论。', 'All numbers come from the current Playground data. Pieces are filtered by use and model; one piece is never treated as a model-capability verdict.'),
    link: `<a href="2026.html">${bi('看 2026 演示增补：七十余件新作品和许可边界', 'See the 2026 Playground patch: seventy-plus new pieces and licence boundaries')} →</a>`,
  });
}

export function vizFor(key) {
  switch (key) {
    case 'www': return vizWww();
    case 'learn': return vizLearn();
    case 'tools': return vizTools();
    case 'models': return vizModels();
    case 'demos': return vizDemos();
    case 'hardware': return vizHardware();
    case 'papers': return vizPapers();
    case 'chain': return vizChain();
    case 'nav': return vizNav();
    default: return '';
  }
}

export { bi, esc, fmt, svg, barChart, donut, timeline, section, card };

