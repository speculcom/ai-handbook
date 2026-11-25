// 模型站许可证速查页。数据来自 tools/decision/decision-data.json（由 build-data.mjs 生成）。
// 只做“字段翻译 + 筛选”，不替用户判断法律结论。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell } from '../../shared/brand/shell.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE_DIR = path.resolve(HERE, '..', 'site');
const DATA_FILE = path.resolve(HERE, '..', '..', 'tools', 'decision', 'decision-data.json');
const DOMAIN = 'https://models.specul.com/license.html';
const TODAY = '2026-11-25';

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function statusText(license) {
  if (license.commercial === 'yes') {
    if (license.id === 'agpl-3.0') return ['可商用，但有开源义务', 'ok'];
    return ['明确允许商用', 'ok'];
  }
  if (license.commercial === 'no') return ['明确禁止商用', 'no'];
  if (license.id === 'openmdw-1.1') return ['需法律确认', 'warn'];
  return ['未说明 / 需读原文', 'warn'];
}

function attrText(license) {
  if (license.attribution === 'yes') return '需要署名/保留声明';
  if (license.attribution === 'no') return '不需要署名';
  return '署名要求未核验';
}

function renderCard(rec) {
  const l = rec.license || {};
  const [label, tone] = statusText(l);
  const typeLabel = rec.type === 'model' ? '模型权重' : '工具/服务';
  return `<article class="license-card" data-type="${esc(rec.type)}" data-commercial="${esc(l.commercial)}" data-attribution="${esc(l.attribution)}" data-distill="${esc(l.distillation)}" data-text="${esc((rec.name + ' ' + rec.vendor + ' ' + l.name).toLowerCase())}">
    <div class="license-top">
      <span class="license-type">${typeLabel}</span>
      <span class="license-status status-${tone}">${esc(label)}</span>
    </div>
    <h3>${esc(rec.name)}</h3>
    <p class="license-vendor">${esc(rec.vendor)} · <span class="license-id">${esc(l.name || l.id || '未标注')}</span></p>
    <dl class="license-facts">
      <dt>商用</dt><dd>${esc(label)}</dd>
      <dt>署名</dt><dd>${attrText(l)}</dd>
      <dt>MAU 门槛</dt><dd>${l.mau === 'none' ? '未见用户规模门槛' : '未核验'}</dd>
      <dt>蒸馏/衍生</dt><dd>${l.distillation === 'allowed' ? '许可允许衍生（仍受署名等条款）' : '未核验，先读原文'}</dd>
    </dl>
    <blockquote class="license-quote">${esc(l.quote || '许可原文未摘录；请回源核对。')}</blockquote>
    <div class="license-links">
      ${l.url ? `<a href="${esc(l.url)}" target="_blank" rel="noopener">许可原文</a>` : ''}
      <a href="${esc(l.source || rec.url)}" target="_blank" rel="noopener">发布页/来源</a>
      <a href="${esc(rec.url)}">本站档案</a>
    </div>
    <p class="license-checked">核验 ${esc(rec.checked || l.checked || '—')}</p>
  </article>`;
}

export function buildLicensePage() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const records = data.licenses || [];
  const body = `
<section class="decision-hero">
  <div class="container">
    <p class="kicker">许可证速查</p>
    <h1>开源 ≠ 随便用：先看四个问题</h1>
    <p class="lede">这份速查把模型权重与常用工具的许可拆成四栏：能不能商用、要不要署名、有没有用户规模门槛、允不允许蒸馏/衍生。只做字段翻译与原文摘录，不替你做法律判断。</p>
    <div class="decision-meta"><span><b>${records.length}</b> 条许可记录</span><span>核验 <b>${TODAY}</b></span><span class="meta-warn">不是法律意见</span></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">先看这四个问题</p>
    <h2>“商用”只是第一关</h2>
    <div class="license-grid">
      <article class="license-help"><h3>1. 能不能商用</h3><p>Apache/MIT 通常允许；AGPL 允许但有开源义务；厂商自定义许可（other/OpenMDW）必须读原文。</p></article>
      <article class="license-help"><h3>2. 要不要署名</h3><p>MIT/Apache 要保留版权与许可声明；有的厂商还要求用户文档署名。删掉声明再商用，是最常见的坑。</p></article>
      <article class="license-help"><h3>3. 有没有用户规模门槛</h3><p>有些“开放”许可在超过 MAU/收入门槛后要另签商业许可。本页没看到门槛的，写“未见”，不写“没有”。</p></article>
      <article class="license-help"><h3>4. 能不能蒸馏/衍生</h3><p>许可允许改代码，不等于允许用输出训练另一个模型。蒸馏条款要单独读；本页不替厂商扩大许可。</p></article>
    </div>
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <p class="kicker">筛选</p>
    <h2>按你的用法收窄</h2>
    <div class="license-filters">
      <label for="lic-search">搜索</label>
      <input id="lic-search" type="search" placeholder="模型/厂商/许可名" autocomplete="off">
      <label for="lic-usage">用法</label>
      <select id="lic-usage">
        <option value="any">不限</option>
        <option value="internal">公司内部使用</option>
        <option value="client">交付给客户</option>
        <option value="redistribute">再分发/对外开源</option>
      </select>
      <label for="lic-type">类型</label>
      <select id="lic-type"><option value="all">全部</option><option value="model">模型权重</option><option value="tool">工具/服务</option></select>
      <label class="lic-check"><input id="lic-strict" type="checkbox"> 只看“明确允许商用”</label>
    </div>
    <p class="section-desc" id="lic-count">共 ${records.length} 条。筛选不会改变排序；未知的许可保留在结果里并标“需确认”，不替你删掉。</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="license-card-grid" id="license-grid">
      ${records.map(renderCard).join('')}
    </div>
  </div>
</section>

<section class="section section-inset">
  <div class="container">
    <p class="kicker">三条边界</p>
    <h2>别把三件事混成一件</h2>
    <div class="next-grid">
      <article class="next-card"><h3>权重许可 ≠ 服务条款</h3><p>下载权重看模型卡许可；调用厂商 API/网页产品看服务条款。两者可以完全不同。</p></article>
      <article class="next-card"><h3>基座许可 ≠ 量化仓许可</h3><p>第三方 GGUF 量化仓通常继承基座许可，但量化者可能加自己的声明；发布页要一起看。</p></article>
      <article class="next-card"><h3>许可允许 ≠ 境内合规</h3><p>模型能商用，不代表能在境内公开提供生成服务；备案、安全评估、内容标识是另一套要求。</p></article>
    </div>
    <p class="decision-disclaimer">本页不是法律意见。关键商用/再分发/蒸馏决定，请让法务读许可原文与合同；本页只帮你把问题问对。</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="kicker">继续查</p>
    <h2>把许可放回模型选型里</h2>
    <ul class="reading-actions">
      <li><a href="matrix.html">回 20 个开放权重家族横向矩阵</a></li>
      <li><a href="https://tools.specul.com/finder/">用选型器按任务/预算/本地筛</a></li>
      <li><a href="https://tools.specul.com/costs/">看成本总表：许可之外的账单</a></li>
    </ul>
  </div>
</section>`;

  const html = shell({
    current: 'models',
    assetPrefix: '',
    title: '许可证速查：商用、署名、MAU、蒸馏 | 模型',
    desc: '把模型权重与常用工具的许可拆成四栏：能不能商用、要不要署名、有没有用户规模门槛、允不允许蒸馏。只做字段翻译与原文摘录，不构成法律意见。',
    canonical: DOMAIN,
    accent: '#8b7cf8',
    body,
    repo: 'https://github.com/speculcom/ai-handbook',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'WebPage',
      name: '许可证速查', url: DOMAIN, dateModified: TODAY,
      description: '模型与工具许可证的四栏速查',
    },
    headExtra: '<link rel="stylesheet" href="license.css"><script src="license.js" defer></script>',
  });

  fs.writeFileSync(path.join(SITE_DIR, 'license.html'), html, 'utf8');
  const filterSrc = path.join(HERE, 'license-filter.js');
  if (fs.existsSync(filterSrc)) fs.copyFileSync(filterSrc, path.join(SITE_DIR, 'license.js'));
  console.log(`license page: ${records.length} records -> ${path.join(SITE_DIR, 'license.html')}`);
  return DOMAIN;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildLicensePage();
}
