// 决策页生成器：对照页 / 任务手册中心 / 成本总表 / 选型器。
// 由 tools build 在清空 HTML 之后调用，避免手工产物被下一次构建删掉。
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { COMPARISONS } from './content/index.mjs';

const SITE = 'https://tools.specul.com';
const TODAY = '2026-11-25';

const CAT_LABEL = {
  coding: '编程', chat: '对话', research: '搜索/研究', office: '办公', audio: '音频',
  image: '图像', video: '视频', automation: '自动化', framework: '框架', mcp: 'MCP',
  runner: '本地运行', safety: '安全', skills: '技能', models: '模型',
};

const GROUP_DEFS = [
  ['meetings', '会议与沟通', '开会、访谈、客户通话'],
  ['docs', '文档与写作', '写、改、审、发'],
  ['data', '表格与数据', 'PDF、表格、清洗与对账'],
  ['research', '研究与检索', '找资料、读文献、做 brief'],
  ['code', '编程与排错', '改代码、修 bug、评审'],
  ['local', '本地与隐私', '本地模型、离线、敏感数据'],
  ['service', '客服与业务', '客服、销售、工单'],
  ['ops', '团队与流程', '落地、培训、90 天计划'],
  ['media', '图像与视频', '出图、短视频、素材'],
  ['methods', '方法与工具书', '通用方法、评估、护栏'],
];

const GUIDE_GROUP_RULES = [
  [/^playbook-meeting|meeting-notes|meeting-actions|meeting/i, 'meetings'],
  [/^playbook-document|doc-review|document-review|email|writing|draft/i, 'docs'],
  [/^playbook-pdf|playbook-table|pdf-table|table-merge|table|sheet|csv|data/i, 'data'],
  [/^playbook-research|research-brief|search|source|citation|literature/i, 'research'],
  [/^playbook-fix|fix-a-bug|bug|code-review|refactor|test|code/i, 'code'],
  [/^playbook-local|local-model|local|privacy|offline|quant/i, 'local'],
  [/^playbook-service|service-agent|customer|sales|support|ticket/i, 'service'],
  [/^playbook-team|team-90|rollout|training|adoption/i, 'ops'],
  [/^playbook-60|video|image|media|shot|storyboard/i, 'media'],
  [/^compare-|evaluation|guardrails|toolkit|method|how-to|prompt-guide/i, 'methods'],
];

function groupOf(g) {
  for (const [re, key] of GUIDE_GROUP_RULES) if (re.test(g.id) || re.test(g.topic || '')) return key;
  return g.kind === 'compare' ? 'methods' : 'methods';
}

function pageShell({ shell, out, rel, title, desc, canonical, body, jsonLd, extraCss = true }) {
  const prefix = rel.includes('/') ? '../' : '';
  const headExtra = extraCss ? `<link rel="stylesheet" href="${prefix}decision.css">` : '';
  const pageScripts = rel === 'finder/index.html'
    ? `<script src="${prefix}finder-data.js"></script><script src="${prefix}finder.js"></script>`
    : rel === 'costs/index.html'
      ? `<script src="${prefix}costs.js"></script>`
      : rel === 'guides/index.html'
        ? `<script src="${prefix}guides.js"></script>`
        : '';
  return shell({
    current: 'agent',
    assetPrefix: prefix,
    title,
    desc,
    canonical,
    accent: '#22d3c5',
    body: body + pageScripts,
    repo: 'https://github.com/speculcom/ai-handbook',
    jsonLd,
    headExtra,
  });
}

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function link(href, label, cls = '') {
  return `<a${cls ? ` class="${cls}"` : ''} href="${esc(href)}">${label}</a>`;
}

function sourceLink(url, label) {
  if (!url) return esc(label);
  return `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
}

function renderQuick(items) {
  return `<div class="decision-quick">${items.map((q, i) => `
    <article class="quick-card">
      <span class="quick-num">${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(q.label)}</h3>
      <p>${q.text}</p>
    </article>`).join('')}</div>`;
}

function renderTable(t) {
  return `<div class="decision-table-wrap"><table class="decision-table">
    <caption>${esc(t.caption)}</caption>
    <thead><tr>${t.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${t.rows.map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="decision-name"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function renderCandidates(items) {
  return `<div class="candidate-grid">${items.map((c) => `
    <article class="candidate-card">
      <div class="candidate-head">
        <h3>${esc(c.name)}</h3>
        <span class="candidate-links">${link(c.url, '本站档案 →')}${c.official ? ` · ${sourceLink(c.official, '官方页')}` : ''}</span>
      </div>
      <dl class="candidate-facts">
        <dt>最适合</dt><dd>${c.best}</dd>
        <dt>要花多少</dt><dd>${c.cost}</dd>
        <dt>国内可用</dt><dd>${c.china}</dd>
        <dt>先记住</dt><dd>${c.note}</dd>
        <dt>主要代价</dt><dd class="candidate-limit">${c.limit}</dd>
      </dl>
    </article>`).join('')}</div>`;
}

function renderOfficial(items) {
  return `<div class="evidence-list">${items.map((x) => `
    <article class="evidence-card">
      <div class="evidence-top"><span class="evidence-kind">官方</span><span class="evidence-date">核验 ${esc(x.checked)}</span></div>
      <h3>${esc(x.title)}</h3>
      <p>${x.body}</p>
      <p class="evidence-source">${sourceLink(x.source, x.sourceLabel)}</p>
    </article>`).join('')}</div>`;
}

function renderThird(items) {
  return `<div class="evidence-list">${items.map((x) => `
    <article class="evidence-card evidence-third">
      <div class="evidence-top"><span class="evidence-kind">${esc(x.kind)}</span><span class="evidence-date">${esc(x.checked)}</span></div>
      <h3>${esc(x.title)}</h3>
      <p>${x.body}</p>
      <dl class="evidence-method">
        <dt>方法</dt><dd>${esc(x.method)}</dd>
        <dt>局限</dt><dd>${esc(x.limit)}</dd>
      </dl>
      <p class="evidence-source">${sourceLink(x.source, x.sourceLabel)}</p>
    </article>`).join('')}</div>`;
}

function renderVerdict(items) {
  return `<div class="verdict-table-wrap"><table class="decision-table verdict-table">
    <thead><tr><th>你的情况</th><th>先选</th><th>为什么</th></tr></thead>
    <tbody>${items.map((v) => `<tr><td>${esc(v.when)}</td><td class="decision-name">${esc(v.pick)}</td><td>${esc(v.why)}</td></tr>`).join('')}</tbody>
  </table></div>`;
}

function renderComparison(p, shell, out) {
  const rel = `compare/${p.slug}.html`;
  const body = `
<section class="decision-hero">
  <div class="container">
    <p class="kicker">决策页 · 多源对照</p>
    <h1>${esc(p.title)}</h1>
    <p class="lede">${esc(p.lede)}</p>
    <div class="decision-meta">
      <span><b>${p.candidates.length}</b> 个候选</span>
      <span>公开价/条款核验 <b>${esc(p.checked)}</b></span>
      <span>第三方证据 <b>${p.third.length}</b> 条</span>
      <span class="meta-warn">不是实测排名</span>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">先看结论</p>
    <h2>四种情况，四种选法</h2>
    ${renderQuick(p.quick)}
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <p class="kicker">横向摊开</p>
    <h2>一张表先排掉不合适的</h2>
    <p class="section-desc">价格、免费额度与“国内直连”会变；表里只写本次能回源的快照。下单前回官方页再确认一次。</p>
    ${renderTable(p.table)}
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">逐个看</p>
    <h2>每个候选的“适合 / 代价”</h2>
    ${renderCandidates(p.candidates)}
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <p class="kicker">官方怎么说</p>
    <h2>价格与能力，只引官方页</h2>
    <p class="section-desc">官方页能证明“它这么卖、它这么描述自己”，不能证明“它在你任务上一定好用”。</p>
    ${renderOfficial(p.official)}
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">第三方证据</p>
    <h2>谁测过，测了什么，不能推到哪</h2>
    <p class="section-desc">独立研究、厂商自测、个人体验分开标。厂商有利益关系的，不装成独立。</p>
    ${renderThird(p.third)}
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <div class="gap-box">
      <p class="kicker">缺口</p>
      <h2>${esc(p.gap.title)}</h2>
      <p>${esc(p.gap.body)}</p>
    </div>
    <p class="kicker">还不知道</p>
    <h2>这些结论，本页没有证据</h2>
    <ul class="unknown-list">${p.unknown.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">按你的情况选</p>
    <h2>决策表：先选，再验证</h2>
    ${renderVerdict(p.verdict)}
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <p class="kicker">下一步</p>
    <h2>别停在“看完”，去做一次小测</h2>
    <div class="next-grid">${p.next.map((n) => `<article class="next-card"><h3>${link(n.href, esc(n.label))}</h3><p>${esc(n.note)}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">来源</p>
    <h2>本页所有外链</h2>
    <div class="source-list">${p.sources.map((s) => `<div class="source-row"><span class="source-kind">${esc(s.kind)}</span>${sourceLink(s.url, s.label)}</div>`).join('')}</div>
    <p class="decision-disclaimer">本页是资料对照，不是法律、投资或采购建议。价格与许可可能随时调整；关键决定前回官方原文与合同核对。</p>
  </div>
</section>`;

  const html = pageShell({
    shell, out, rel,
    title: `${p.title} | 工具决策`,
    desc: p.desc,
    canonical: `${SITE}/${rel}`,
    body,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: p.title, description: p.desc,
      url: `${SITE}/${rel}`, dateModified: p.checked,
      author: { '@type': 'Organization', name: '投机取巧' },
    },
  });
  fs.mkdirSync(path.join(out, 'compare'), { recursive: true });
  fs.writeFileSync(path.join(out, rel), html, 'utf8');
  return `${SITE}/${rel}`;
}

function renderGuidesHub(guides, shell, out) {
  const groups = GROUP_DEFS.map(([key, name, desc]) => ({ key, name, desc, items: [] }));
  const byKey = Object.fromEntries(groups.map((g) => [g.key, g]));
  for (const g of guides) byKey[groupOf(g)].items.push(g);
  for (const g of groups) {
    g.items.sort((a, b) => (b.lastVerified || '').localeCompare(a.lastVerified || '') || a.id.localeCompare(b.id));
  }
  const count = guides.length;
  const body = `
<section class="decision-hero">
  <div class="container">
    <p class="kicker">任务手册中心</p>
    <h1>先说你手里的活，再给你步骤</h1>
    <p class="lede">这里不是“文章列表”。按会议、文档、表格、研究、编程、本地部署、客服、团队落地分组；每篇都带输入、步骤、验收和失败样例。${count} 篇，全部可直接打开。</p>
    <div class="decision-meta"><span><b>${count}</b> 篇任务手册</span><span><b>${groups.filter((g) => g.items.length).length}</b> 个任务组</span><span class="meta-warn">参考结果 ≠ 产品实测</span></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">按任务挑</p>
    <h2>你现在要做哪件事？</h2>
    <div class="guide-filters" id="guide-filters">
      <button type="button" class="chip is-on" data-g="all">全部 ${count}</button>
      ${groups.filter((g) => g.items.length).map((g) => `<button type="button" class="chip" data-g="${g.key}">${esc(g.name)} ${g.items.length}</button>`).join('')}
    </div>
    <p class="section-desc">点分组只看相关篇目；再点一篇，按里面的输入/验收自己跑一遍。</p>
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <div class="guide-groups">
${groups.filter((g) => g.items.length).map((g) => `
      <div class="guide-group" data-group="${g.key}">
        <div class="guide-group-head"><h2>${esc(g.name)}</h2><p>${esc(g.desc)} · ${g.items.length} 篇</p></div>
        <div class="guide-grid">
${g.items.map((x) => `
          <article class="guide-card">
            <div class="guide-top"><span class="guide-kind">${esc(x.kind || '指南')}</span><span class="guide-date">${esc(x.lastVerified || '')}</span></div>
            <h3>${link(`/mcp/guides/${x.id}.html`, esc(x.title || x.id))}</h3>
            <p>${esc(x.summary || '')}</p>
            <div class="guide-foot"><span>${esc(x.topic || '')}</span><span>打开 →</span></div>
          </article>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">怎么用</p>
    <h2>三件事，让手册不变成“看过”</h2>
    <div class="next-grid">
      <article class="next-card"><h3>1. 先处理输入</h3><p>用虚构样例或脱敏文件，别拿客户原始数据开局。</p></article>
      <article class="next-card"><h3>2. 对照验收</h3><p>每篇都有“什么算过、什么算没过”；先定标准再看结果。</p></article>
      <article class="next-card"><h3>3. 记失败样例</h3><p>把模型漏掉的行、编造的引用、错归属的人名存下来，下一轮先测这些。</p></article>
    </div>
  </div>
</section>`;

  const rel = 'guides/index.html';
  const html = pageShell({
    shell, out, rel,
    title: `任务手册中心：${count} 篇按任务分的 AI 操作指南 | 工具`,
    desc: `按会议、文档、表格、研究、编程、本地、客服、团队分组的 ${count} 篇 AI 任务手册，每篇带输入、步骤、验收与失败样例。`,
    canonical: `${SITE}/guides/`,
    body,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: '任务手册中心', url: `${SITE}/guides/`, description: '按任务分组的 AI 操作手册' },
  });
  fs.mkdirSync(path.join(out, 'guides'), { recursive: true });
  fs.writeFileSync(path.join(out, rel), html, 'utf8');
  return `${SITE}/guides/`;
}

const COST_IDS = [
  'cursor', 'claude-code', 'copilot', 'perplexity', 'kagi', 'otter', 'fireflies-ai',
  'tldv', 'feishu-ai', 'chatgpt', 'notebooklm', 'elicit', 'metaso', 'tiangong', 'qoder-cn',
  'whisper', 'ollama', 'llama-cpp', 'vllm',
];

function money(t) {
  const p = t.pricing || {};
  if (p.entry === 0) return '免费（自备算力）';
  if (typeof p.entry === 'number') {
    const cur = p.currency === 'CNY' ? '¥' : '$';
    const unit = p.unit === 'seat/month' ? '/席/月' : p.unit === 'local' ? '' : '';
    return `${cur}${p.entry}${unit}`;
  }
  return '未核验';
}

function renderCosts(data, shell, out) {
  const tools = data.tools.filter((t) => COST_IDS.includes(t.id));
  const rows = tools.map((t) => {
    const p = t.pricing || {};
    const free = t.limits?.free || '未核验';
    const china = t.cn?.direct === 'yes' ? '是' : t.cn?.direct === 'no' ? '否' : '未核验';
    return `<tr data-cat="${esc(t.category)}" data-cn="${esc(t.cn?.direct || 'unknown')}" data-text="${esc((t.name + ' ' + t.vendor + ' ' + t.category).toLowerCase())}">
      <td class="decision-name"><a href="${esc(t.url)}">${esc(t.name)}</a><br><span class="cell-sub">${esc(CAT_LABEL[t.category] || t.category)}</span></td>
      <td>${esc(free)}</td>
      <td>${esc(p.label || money(t))}</td>
      <td>${esc(p.note || '价格未核验')}</td>
      <td>${esc(china)}</td>
      <td>${esc(t.limits?.data_training || '未核验')}</td>
      <td class="cell-nowrap">${esc(p.checked || '—')}</td>
    </tr>`;
  }).join('');

  const body = `
<section class="decision-hero">
  <div class="container">
    <p class="kicker">成本总表</p>
    <h1>先把“月费”拆成五笔账</h1>
    <p class="lede">订阅费只是第一笔。席位、模型调用、超额 credits、存储/分钟数、人工复核时间，才是账单真正变大的地方。这张表把能看到的价格摊开；看不到的写“未核验”。</p>
    <div class="decision-meta"><span><b>${tools.length}</b> 个产品快照</span><span>价格核验 <b>${TODAY}</b></span><span class="meta-warn">不是报价单</span></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">先排雷</p>
    <h2>五笔账，少算一笔就会低估</h2>
    <div class="cost-grid">
      <article class="cost-card"><span>01</span><h3>席位费</h3><p>按人/月，不是按“用量”。团队先算活跃席位，别按全员买。</p></article>
      <article class="cost-card"><span>02</span><h3>模型/用量</h3><p>第三方模型、API token、AI credits、按分钟转写，通常另计。</p></article>
      <article class="cost-card"><span>03</span><h3>超额</h3><p>超出套餐后的单价往往比套餐贵；先找“overage”那一行。</p></article>
      <article class="cost-card"><span>04</span><h3>存储/保留</h3><p>会议录音、云端产物、日志的存储与保留期，可能单独收费。</p></article>
      <article class="cost-card"><span>05</span><h3>人工复核</h3><p>转写错、引用错、代码改错，都要人再花时间；这也是成本。</p></article>
    </div>
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <p class="kicker">订阅快照</p>
    <h2>公开价目表里能对上的档位</h2>
    <p class="section-desc">免费档只写官方页能确认的额度；价格只写官方页能对上的数字。第三方价格另标。汇率、税、最小席位与年付折扣未折算。</p>
    <div class="cost-filters" id="cost-filters">
      <button type="button" class="chip is-on" data-c="all">全部</button>
      <button type="button" class="chip" data-c="coding">编程</button>
      <button type="button" class="chip" data-c="research">搜索/研究</button>
      <button type="button" class="chip" data-c="office">办公/会议</button>
      <button type="button" class="chip" data-c="runner">本地</button>
      <button type="button" class="chip" data-c="chat">对话</button>
    </div>
    <div class="decision-table-wrap"><table class="decision-table cost-table" id="cost-table">
      <thead><tr><th>产品</th><th>免费档</th><th>起步价</th><th>计费口径 / 备注</th><th>国内直连</th><th>数据训练/边界</th><th>核验</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">按量单价</p>
    <h2>API 与检索：单价是“每百万 token / 每千次请求”</h2>
    <p class="section-desc">订阅页上的“无限”通常只覆盖产品内用量；API 是另一张价目表。下面只列能回源的单价，计算器里可手动填入。</p>
    <div class="decision-table-wrap"><table class="decision-table">
      <thead><tr><th>项目</th><th>单价</th><th>说明</th><th>来源</th></tr></thead>
      <tbody>
        <tr><td class="decision-name">Claude Sonnet 5（入门价）</td><td>$2 / $10 每百万 token</td><td>输入 / 输出；2026-08-31 前；缓存写入 $2.50，缓存读取 $0.20</td><td><a href="https://claude.com/pricing" target="_blank" rel="noopener">Claude 官方</a></td></tr>
        <tr><td class="decision-name">Claude Sonnet 5（标准价）</td><td>$3 / $15 每百万 token</td><td>输入 / 输出；入门期后</td><td><a href="https://claude.com/pricing" target="_blank" rel="noopener">Claude 官方</a></td></tr>
        <tr><td class="decision-name">Kagi API Search</td><td>$12 / 1,000 requests</td><td>搜索请求；Extract $4 / 1,000 pages</td><td><a href="https://kagi.com/api/pricing" target="_blank" rel="noopener">Kagi 官方</a></td></tr>
        <tr><td class="decision-name">Cursor 第三方模型</td><td>按 API list price</td><td>不含在 Cursor 套餐额度内；按被路由到的模型计费</td><td><a href="https://cursor.com/docs/models-and-pricing" target="_blank" rel="noopener">Cursor 官方</a></td></tr>
      </tbody>
    </table></div>
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <p class="kicker">算自己的账</p>
    <h2>订阅还是 API？先找盈亏平衡点</h2>
    <p class="section-desc">粗略规则：把“每月 API 调用费”和“席位订阅费 + 超额”放在同一张表；如果 API 费低于订阅费的 60%，先按量；如果接近或超过，订阅更省心。真正的平衡点取决于你的调用量、缓存命中率与人工复核时间。</p>
    <ul class="reading-actions">
      <li><a href="/mcp/guides/cost-calculator.html#cost-workbench">打开成本工作台（API / 团队 / 本地 / 视频四组）</a></li>
      <li><a href="/mcp/guides/cost-calculator.html#cost-breakeven">用“本地 vs API”盈亏平衡小算器</a></li>
      <li><a href="/mcp/guides/cost-control.html">读成本控制指南：哪些费用常被漏算</a></li>
    </ul>
    <div class="gap-box">
      <p class="kicker">未包含</p>
      <h2>这张表不替你做决定</h2>
      <p>税、汇率、年付折扣、最低席位、企业合同价、模型路由的实际单价、存储/导出费用、网络与合规成本、人工复核时间——都没有打进上面的数字。它们会让“看起来便宜”的方案变贵。</p>
    </div>
  </div>
</section>`;

  const rel = 'costs/index.html';
  const html = pageShell({
    shell, out, rel,
    title: 'AI 工具成本总表：订阅、API、超额与未包含项 | 工具',
    desc: '20 个 AI 产品的公开价格快照：免费档、起步价、超额、国内直连与数据边界；另附 API 单价与盈亏平衡方法。',
    canonical: `${SITE}/costs/`,
    body,
    jsonLd: { '@context': 'https://schema.org', '@type': 'Dataset', name: 'AI 工具成本总表', url: `${SITE}/costs/`, dateModified: TODAY, description: '公开价格快照与未包含项' },
  });
  fs.mkdirSync(path.join(out, 'costs'), { recursive: true });
  fs.writeFileSync(path.join(out, rel), html, 'utf8');
  return `${SITE}/costs/`;
}

function renderFinder(data, shell, out) {
  const body = `
<section class="decision-hero">
  <div class="container">
    <p class="kicker">AI 选型器</p>
    <h1>说三件事，先排掉一半</h1>
    <p class="lede">选型不是“选冠军”，是“哪个不违背你的硬条件”。勾任务、预算、国内可用、本地/隐私，下面给 3 个候选和“为什么”。结果由规则算，不联网、不存你的输入。</p>
    <div class="decision-meta"><span><b>${data.tools.length}</b> 个工具档案</span><span><b>${data.models.length}</b> 个模型记录</span><span class="meta-warn">规则筛选，不是测评</span></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <form class="finder-form" id="finder-form">
      <fieldset>
        <legend>1. 你要它干什么？<span>可多选</span></legend>
        <div class="chip-grid" id="task-chips">
          ${[
            ['research', '找资料/做研究'], ['coding', '写代码/改代码'], ['meeting', '会议记录'],
            ['writing', '写文档/改稿'], ['tables', '表格/数据'], ['image', '图像'],
            ['video', '视频'], ['local', '本地跑模型'], ['transcription', '语音转写'],
            ['automation', '搭工作流'], ['chat', '通用问答'], ['privacy', '隐私/离线'],
          ].map(([k, l]) => `<label class="chip-check"><input type="checkbox" name="task" value="${k}"><span>${l}</span></label>`).join('')}
        </div>
      </fieldset>

      <fieldset>
        <legend>2. 你每月能花多少？<span>按公开起步价粗筛</span></legend>
        <div class="chip-grid">
          <label class="chip-check"><input type="radio" name="budget" value="free" checked><span>只接受免费</span></label>
          <label class="chip-check"><input type="radio" name="budget" value="under50"><span>≤ $50 / 月</span></label>
          <label class="chip-check"><input type="radio" name="budget" value="under150"><span>≤ $150 / 月</span></label>
          <label class="chip-check"><input type="radio" name="budget" value="any"><span>先看能力，不限价</span></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>3. 有哪些硬条件？</legend>
        <div class="chip-grid">
          <label class="chip-check"><input type="checkbox" name="cn"><span>必须国内直连</span></label>
          <label class="chip-check"><input type="checkbox" name="local"><span>必须本地运行</span></label>
          <label class="chip-check"><input type="checkbox" name="cite"><span>必须给引用/来源</span></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>4. 数据有多敏感？</legend>
        <div class="chip-grid">
          <label class="chip-check"><input type="radio" name="sensitive" value="public" checked><span>公开资料</span></label>
          <label class="chip-check"><input type="radio" name="sensitive" value="internal"><span>内部资料</span></label>
          <label class="chip-check"><input type="radio" name="sensitive" value="confidential"><span>机密/不能出机器</span></label>
        </div>
      </fieldset>

      <div class="finder-actions">
        <button type="submit" class="btn-primary">给我 3 个候选</button>
        <p>不会上传任何输入；刷新即清空。结果只是筛选建议，价格/许可仍要回官方页核对。</p>
      </div>
    </form>
  </div>
</section>

<section class="section section-inset" id="finder-results-section">
  <div class="container">
    <p class="kicker">结果</p>
    <h2 id="finder-title">等你选任务</h2>
    <div id="finder-results" class="finder-results">
      <p class="finder-empty">先在上面的“要它干什么”里至少选一项。</p>
    </div>
    <div class="finder-legend">
      <span class="legend-strong">强匹配</span>：任务与硬条件都对上，但没实测。
      <span class="legend-ok">可考虑</span>：主要条件对上，有一项未知。
      <span class="legend-warn">需确认</span>：价格/许可/数据边界有未知，先问再买。
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">为什么这样筛</p>
    <h2>规则只有四条，你可以自己复核</h2>
    <div class="next-grid">
      <article class="next-card"><h3>任务优先</h3><p>先看档案里的任务标签；一个工具不干这件事，再便宜也不进结果。</p></article>
      <article class="next-card"><h3>硬条件一票否决</h3><p>国内直连、本地运行、只接受免费——违反就排除，不拿“以后会支持”当理由。</p></article>
      <article class="next-card"><h3>未知不装懂</h3><p>价格/训练口径/许可未知时，结果里标“需确认”，不编一个数字。</p></article>
    </div>
    <p class="decision-disclaimer">这个工具不替你做采购决定，也不给“最佳”排名。它的价值是把 282 份档案收窄到 3 个可继续核对的候选。</p>
  </div>
</section>`;

  const rel = 'finder/index.html';
  const html = pageShell({
    shell, out, rel,
    title: 'AI 选型器：按任务、预算、国内可用与本地运行筛 3 个候选 | 工具',
    desc: '纯前端规则筛选：选任务、预算、国内直连、本地运行与数据敏感度，从 282 个工具档案里收窄到 3 个候选，并说明为什么。',
    canonical: `${SITE}/finder/`,
    body,
    jsonLd: { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'AI 选型器', url: `${SITE}/finder/`, applicationCategory: 'BusinessApplication', operatingSystem: 'Web' },
  });
  fs.mkdirSync(path.join(out, 'finder'), { recursive: true });
  fs.writeFileSync(path.join(out, rel), html, 'utf8');
  return `${SITE}/finder/`;
}

function copyAssets(out, here) {
  for (const f of ['decision.css', 'guides.js', 'costs.js', 'finder.js']) {
    const src = path.join(here, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(out, f));
  }
}

export function buildDecisionPages({ shell, out, guides, here }) {
  // 先重建决策数据，避免价格/档案更新后页面还吃旧 JSON。
  execFileSync(process.execPath, [path.join(here, 'build-data.mjs')], { stdio: 'inherit' });
  const data = JSON.parse(fs.readFileSync(path.join(here, 'decision-data.json'), 'utf8'));

  const urls = [];
  for (const p of COMPARISONS) urls.push(renderComparison(p, shell, out));
  urls.push(renderGuidesHub(guides, shell, out));
  urls.push(renderCosts(data, shell, out));
  urls.push(renderFinder(data, shell, out));

  // 选型器数据：压缩成一行，页面只读本地文件。
  const finderData = {
    generated_at: data.generated_at,
    counts: data.counts,
    tools: data.tools.map((t) => ({
      id: t.id, type: t.type, name: t.name, nameEn: t.nameEn, vendor: t.vendor,
      category: t.category, url: t.url, summary: t.summary,
      tasks: t.tasks, outputs: t.outputs, pricing: t.pricing,
      limits: { data_training: t.limits?.data_training || 'unknown', free: t.limits?.free || 'unknown' },
      cn: { direct: t.cn?.direct || 'unknown', filing: t.cn?.filing || 'unknown' },
      hardware: t.hardware, license: t.license?.name || t.license || 'unknown',
      last_verified: t.last_verified,
    })),
    models: data.models.map((m) => ({
      id: m.id, type: m.type, name: m.name, nameEn: m.nameEn, vendor: m.vendor,
      category: m.category, url: m.url, summary: m.summary,
      tasks: m.tasks, outputs: m.outputs, pricing: m.pricing,
      limits: { data_training: m.limits?.data_training || 'unknown', free: m.limits?.free || 'unknown' },
      cn: { direct: m.cn?.direct || 'unknown', filing: m.cn?.filing || 'unknown' },
      hardware: m.hardware, license: m.license?.name || m.license || 'unknown',
      last_verified: m.last_verified,
    })),
  };
  fs.writeFileSync(path.join(out, 'finder-data.js'), `window.SPECUL_DECISION_DATA=${JSON.stringify(finderData)};\n`, 'utf8');

  copyAssets(out, here);
  return urls;
}
