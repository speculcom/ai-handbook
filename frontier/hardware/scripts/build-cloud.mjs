import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell } from '../../../../../_sites/_template/shell.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const site = path.join(root, 'site');
const cloudDir = path.join(root, 'cloud');
const sectionsCss = path.resolve(here, '../../../../../_sites/_template/sections.css');
const PROVIDER_EN = { aliyun: 'Alibaba Cloud', 'tencent-cloud': 'Tencent Cloud', 'huawei-cloud': 'Huawei Cloud', volcengine: 'Volcano Engine' };
const GUIDE_EN = {
  'billing-modes': 'Per-second, monthly, reserved: choosing a billing model',
  'compare-gpu-price': 'Comparing cloud GPUs: align the units first',
  'compliance-residency': 'Compliance and data residency: decide where data may go',
  'storage-egress': 'Storage and egress: the two costs people forget',
};
const bi = (zh, en) => `<span data-zh>${zh}</span><span data-en>${en}</span>`;

fs.mkdirSync(path.join(site, 'cloud', 'guides'), { recursive: true });

const providers = JSON.parse(fs.readFileSync(path.join(cloudDir, 'cloud.json'), 'utf8'));
const guides = JSON.parse(fs.readFileSync(path.join(cloudDir, 'guides.json'), 'utf8')).guides;

const CATS = {
  general: { zh: '通用云', en: 'General clouds', desc: '大厂公有云，卡型多、区域广、合规体系完整；常按整机起租。' },
  'gpu-specialist': { zh: 'GPU 专营', en: 'GPU specialists', desc: '以 GPU 容量为主，按卡/按小时或合同报价；适合训练与大规模推理。' },
  serverless: { zh: 'Serverless / 托管推理', en: 'Serverless & hosted inference', desc: '按秒或按 token 计费，冷启动与并发要实测；适合突发与 API 化。' },
  china: { zh: '国内云', en: 'China clouds', desc: '境内区域、等保与网络延迟优势；卡型与库存变化快，逐区确认。' }
};
const CAT_ORDER = Object.keys(CATS);

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const url = (p) => `https://hardware.specul.com/${p}`;
const prefixFor = (depth) => '../'.repeat(depth);

function page({ title, desc, canonical, body, depth = 1 }) {
  const prefix = prefixFor(depth);
  return shell({
    current: 'hardware',
    title,
    desc,
    canonical,
    accent: '#f59e0b',
    assetPrefix: prefix,
    headExtra: `<link rel="stylesheet" href="${prefix}sections.css" />`,
    body
  });
}

function card(p) {
  return `<article class="sec-card">
  <div class="sec-card-top"><span class="sec-tag">${esc(CATS[p.category].zh)}</span><span class="sec-badge">${esc(p.gpuTypes.split('；')[0].split('/')[0])}</span></div>
  <h3><a href="${esc(p.id)}.html">${esc(p.provider)}</a></h3>
  <p>${esc(p.gpuTypes)}</p>
  <dl class="sec-facts">
    <div><dt>计费</dt><dd>${esc(p.billing)}</dd></div>
    <div><dt>区域</dt><dd>${esc(p.regions)}</dd></div>
    <div><dt>最低消费</dt><dd>${esc(p.minSpend)}</dd></div>
    <div><dt>核验</dt><dd>${esc(p.verifiedAt)}</dd></div>
  </dl>
  <p class="sec-caveat">${esc(p.priceNote)}</p>
  <a class="sec-link" href="${esc(p.id)}.html">看服务商卡 →</a>
</article>`;
}

// 云算力首页
{
  const body = `<div class="container">
<header class="sec-head">
  <p class="eyebrow">Compute · Cloud</p>
  <h1>${bi('云算力', 'Cloud compute')}</h1>
  <p class="lede">租 GPU 不是只看“每卡每小时”。整机起租、存储、出网、冷启动、可用性与合同期，都会改变真实单价。这里收 ${providers.length} 家服务商，按通用云、GPU 专营、Serverless、国内云四类放；价格只写口径与核验入口，不写死数字。</p>
</header>
<div class="sec-nav"><a href="../index.html">← 回硬件站</a><a href="../path.html">硬件选型路径 →</a></div>
<div class="home-stats">
  <div><b>${providers.length}</b><span>家服务商</span></div>
  <div><b>${CAT_ORDER.length}</b><span>个类别</span></div>
  <div><b>${guides.length}</b><span>篇比价指南</span></div>
</div>
<div class="sec-note"><b>先统一口径：</b>按卡小时、整机小时、按 token、按月/合同，四种报价不能直接横比。把存储、出网、冷启动、重跑与合规加进总成本，再决定按需还是预留。</div>
${CAT_ORDER.map((cat) => `<h2>${esc(CATS[cat].zh)}</h2><p>${esc(CATS[cat].desc)}</p><div class="sec-grid">${providers.filter((p) => p.category === cat).map(card).join('')}</div>`).join('\n')}
<h2>怎么比价</h2>
<div class="sec-grid">${guides.map((g) => `<article class="sec-card"><div class="sec-card-top"><span class="sec-tag">指南</span></div><h3><a href="guides/${esc(g.id)}.html">${esc(g.title)}</a></h3><p>${esc(g.lede)}</p><a class="sec-link" href="guides/${esc(g.id)}.html">读指南 →</a></article>`).join('')}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'cloud', 'index.html'), page({
    title: '云算力 · 硬件算力',
    desc: `${providers.length} 家云 GPU 服务商：AWS、GCP、Azure、CoreWeave、Lambda、RunPod、Vast.ai、Modal、阿里云、腾讯云、华为云、火山引擎等；按四类整理，写清计费、区域、存储出网与合规。`,
    canonical: url('cloud/'),
    body
  }));
}

// 分类页
for (const cat of CAT_ORDER) {
  const list = providers.filter((p) => p.category === cat);
  const body = `<div class="container">
<header class="sec-head">
  <p class="eyebrow">Compute · Cloud · ${esc(CATS[cat].en)}</p>
  <h1>${bi(CATS[cat].zh, CATS[cat].en)}</h1>
  <p class="lede">${esc(CATS[cat].desc)} 这一页收 ${list.length} 家；点进单卡看计费、区域、存储出网、合规与核验入口。</p>
</header>
<div class="sec-nav"><a href="index.html">← 全部云算力</a><a href="../index.html">硬件站</a></div>
<div class="sec-grid">${list.map(card).join('')}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'cloud', `${cat}.html`), page({
    title: `${CATS[cat].zh} · 云算力 · 硬件算力`,
    desc: `${CATS[cat].zh} GPU 服务商，共 ${list.length} 家：${list.slice(0, 4).map((p) => p.provider).join('、')}${list.length > 4 ? ' 等' : ''}。写清计费、区域、存储出网与合规；按需、包月与整机起租的差别写在单卡页。`,
    canonical: url(`cloud/${cat}.html`),
    body
  }));
}

// 服务商单卡
for (const p of providers) {
  const body = `<div class="container">
<header class="sec-detail">
  <p class="eyebrow">Compute · Cloud · ${bi(CATS[p.category].zh, CATS[p.category].en)}</p>
  <h1>${bi(p.provider, PROVIDER_EN[p.id] || p.provider)}</h1>
  <p class="sub">${esc(p.gpuTypes)}</p>
</header>
<div class="sec-nav"><a href="index.html">${bi('← 全部云算力', '← All cloud compute')}</a><a href="${esc(p.category)}.html">${bi(CATS[p.category].zh, CATS[p.category].en)}</a><a href="../index.html">${bi('硬件站', 'Compute')}</a></div>
<table class="sec-table">
  <tr><th>卡型</th><td>${esc(p.gpuTypes)}</td></tr>
  <tr><th>计费</th><td>${esc(p.billing)}</td></tr>
  <tr><th>价格口径</th><td>${esc(p.priceNote)}</td></tr>
  <tr><th>区域</th><td>${esc(p.regions)}</td></tr>
  <tr><th>存储 / 出网</th><td>${esc(p.storageEgress)}</td></tr>
  <tr><th>合规</th><td>${esc(p.compliance)}</td></tr>
  <tr><th>最低消费</th><td>${esc(p.minSpend)}</td></tr>
  <tr><th>核验日</th><td>${esc(p.verifiedAt)}</td></tr>
</table>
<div class="sec-body">
  <h2>怎么用这张卡</h2>
  <p>${esc(p.notes)}</p>
  <h2>下一步</h2>
  <ul>
    <li>打开官方价格页，按你的任务算“总成本”：卡时 + 存储 + 出网 + 冷启动 + 重跑。</li>
    <li>先用目标卡型跑一轮真实负载，再决定按需、包月还是预留。</li>
    <li>读 <a href="guides/compare-gpu-price.html">云 GPU 怎么比价</a> / <a href="guides/storage-egress.html">存储与出网</a>。</li>
  </ul>
</div>
<div class="sec-sources">价格与规格入口：<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.url)}</a> · 文档：<a href="${esc(p.docs)}" target="_blank" rel="noopener">${esc(p.docs)}</a> · 核验日 ${esc(p.verifiedAt)}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'cloud', `${p.id}.html`), page({
    title: `${p.provider} · 云算力 · 硬件算力`,
    desc: `${p.provider} 云 GPU：${p.gpuTypes}；${p.billing}；${p.regions}。${p.priceNote}`,
    canonical: url(`cloud/${p.id}.html`),
    body
  }));
}

// 指南
for (const g of guides) {
  const body = `<div class="container">
<header class="sec-detail">
  <p class="eyebrow">Compute · Cloud · ${bi('指南', 'Guide')}</p>
  <h1>${bi(g.title, GUIDE_EN[g.id] || g.title)}</h1>
  <p class="sub">${esc(g.lede)}</p>
</header>
<div class="sec-nav"><a href="../index.html">← 全部云算力</a><a href="../../index.html">硬件站</a></div>
<div class="sec-body">
${g.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((x) => `<p>${x}</p>`).join('')}`).join('\n')}
</div>
<div class="sec-sources">参考：${g.sources.map(([label, href]) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`).join(' · ')}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'cloud', 'guides', `${g.id}.html`), page({
    title: `${g.title} · 云算力指南 · 硬件算力`,
    desc: `${g.lede} 页内给出核对清单、常见误区与适用边界。`,
    canonical: url(`cloud/guides/${g.id}.html`),
    depth: 2,
    body
  }));
}

// 首页入口
{
  const indexFile = path.join(site, 'index.html');
  const html = fs.readFileSync(indexFile, 'utf8');
  const block = `<!-- sec-cloud:start -->
<div class="container">
<div class="sec-doors">
  <a class="sec-door" href="cloud/index.html">
    <span class="k">Compute · Cloud</span>
    <h2>云算力：租 GPU 还是买卡</h2>
    <p>${providers.length} 家服务商，按通用云、GPU 专营、Serverless、国内云四类。先算总成本，再选按需、包月或预留。</p>
    <span class="more">看云算力 →</span>
  </a>
  <a class="sec-door" href="path.html">
    <span class="k">Compute · Path</span>
    <h2>硬件选型路径：先定预算与模型</h2>
    <p>从模型大小、上下文、并发与预算倒推整机或云实例；按步骤核对显存、带宽、功耗与总拥有成本。</p>
    <span class="more">走选型路径 →</span>
  </a>
</div>
</div>
<!-- sec-cloud:end -->
`;
  let next;
  if (html.includes('<!-- sec-cloud:start -->')) {
    next = html.replace(/<!-- sec-cloud:start -->[\s\S]*?<!-- sec-cloud:end -->\n?/, block);
  } else {
    next = html.replace('<section class="vz-section" id="silicon">', `${block}<section class="vz-section" id="silicon">`);
  }
  if (!next.includes('href="sections.css"')) {
    next = next.replace('</head>', '  <link rel="stylesheet" href="sections.css" />\n</head>');
  }
  fs.writeFileSync(indexFile, next);
}

// sitemap / llms
{
  const urls = [url('cloud/'), url('cloud/index.html')];
  for (const c of CAT_ORDER) urls.push(url(`cloud/${c}.html`));
  for (const p of providers) urls.push(url(`cloud/${p.id}.html`));
  for (const g of guides) urls.push(url(`cloud/guides/${g.id}.html`));

  const sitemapFile = path.join(site, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const newUrls = urls.filter((u) => !sitemap.includes(`<loc>${u}</loc>`));
  if (newUrls.length) {
    sitemap = sitemap.replace('</urlset>', newUrls.map((u) => `  <url><loc>${u}</loc><lastmod>2026-11-19</lastmod></url>`).join('\n') + '\n</urlset>');
    fs.writeFileSync(sitemapFile, sitemap);
  }

  const llmsFile = path.join(site, 'llms.txt');
  let llms = fs.readFileSync(llmsFile, 'utf8');
  if (!llms.includes('## 云算力')) {
    llms += `\n\n## 云算力\n- [云算力](${url('cloud/')}) — ${providers.length} 家云 GPU 服务商，四类；计费、区域、存储出网、合规与核验入口。\n`;
    fs.writeFileSync(llmsFile, llms);
  }
  const llmsEnFile = path.join(site, 'llms.en.txt');
  let llmsEn = fs.readFileSync(llmsEnFile, 'utf8');
  if (!llmsEn.includes('## Cloud compute')) {
    llmsEn += `\n\n## Cloud compute\n- [Cloud compute](${url('cloud/')}) — ${providers.length} cloud GPU providers in four categories; billing, regions, storage/egress, compliance and check date.\n`;
    fs.writeFileSync(llmsEnFile, llmsEn);
  }
}

fs.copyFileSync(sectionsCss, path.join(site, 'sections.css'));
console.log(`hardware cloud built: ${providers.length} providers, ${guides.length} guides`);
