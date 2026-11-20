import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell } from '../../../../_sites/_template/shell.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const site = path.join(root, 'site');
const dataDir = path.join(root, 'data');
const sectionsCss = path.resolve(here, '../../../../_sites/_template/sections.css');

fs.mkdirSync(path.join(site, 'data', 'guides'), { recursive: true });
fs.mkdirSync(path.join(site, 'evals', 'guides'), { recursive: true });

const datasets = JSON.parse(fs.readFileSync(path.join(dataDir, 'datasets.json'), 'utf8'));
const evals = JSON.parse(fs.readFileSync(path.join(dataDir, 'evals.json'), 'utf8'));
const guideData = JSON.parse(fs.readFileSync(path.join(dataDir, 'guides.json'), 'utf8'));
const guides = guideData['data-guides'] || guideData.dataGuides || [];
const evalGuides = guideData['eval-guides'] || [];

const CATS = {
  pretrain: { zh: '预训练语料', en: 'Pretraining corpora', desc: '从网页、书籍、代码里洗出来的底座语料；先看许可、去重与语言分布。', descEn: 'Base corpora washed from web pages, books and code; check licence, deduplication and language mix first.' },
  sft: { zh: '指令与 SFT', en: 'Instruction & SFT', desc: '把任务写成指令-回答对，用来教模型按格式做事。', descEn: 'Task demonstrations written as instruction–answer pairs, teaching the model to follow a format.' },
  preference: { zh: '偏好与 RLHF', en: 'Preference & RLHF', desc: '人类或模型对回答排序，用来做偏好对齐与 DPO。', descEn: 'Humans or models rank answers; used for preference alignment and DPO.' },
  eval: { zh: '评测集', en: 'Evaluation sets', desc: '用来量分数的题集；注意污染与版本，不要混进训练。', descEn: 'Question sets used to measure scores; watch contamination and versions, and keep them out of training.' },
  rag: { zh: 'RAG 文档', en: 'RAG corpora', desc: '检索问答的证据库；质量、更新与权限比 chunk size 更重要。', descEn: 'Evidence libraries for retrieval QA; quality, freshness and permissions matter more than chunk size.' },
  multimodal: { zh: '多模态', en: 'Multimodal', desc: '图文、视频与音频对；图像版权随源站，不能默认可商用。', descEn: 'Image–text, video and audio pairs; image copyright follows the source site and is not automatically commercial-use.' },
  'code-domain': { zh: '代码与领域', en: 'Code & domain', desc: '代码、医学、法律等专业语料；逐仓/逐篇核对许可。', descEn: 'Code, medical, legal and other specialist corpora; verify the licence repo by repo, paper by paper.' },
  synthetic: { zh: '合成数据', en: 'Synthetic data', desc: '模型生成或改写的样本；补长尾，但会放大模型风格与错误。', descEn: 'Model-generated or rewritten samples; they fill long tails but amplify model style and errors.' }
};
const CAT_ORDER = Object.keys(CATS);

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const bi = (zh, en) => `<span data-zh>${esc(zh)}</span><span data-en>${esc(en)}</span>`;
const url = (p) => `https://models.specul.com/${p.replace(/^/, '')}`;
const prefixFor = (depth) => '../'.repeat(depth);

function page({ title, desc, canonical, body, depth = 1 }) {
  const prefix = prefixFor(depth);
  return shell({
    current: 'models',
    title,
    desc,
    canonical,
    assetPrefix: prefix,
    headExtra: `<link rel="stylesheet" href="${prefix}sections.css" />`,
    body
  });
}

function card({ href, tag, title, desc, facts = [], caveat = '', more = '看详情 →' }) {
  const factHtml = facts.length
    ? `<dl class="sec-facts">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`
    : '';
  return `<article class="sec-card">
  <div class="sec-card-top"><span class="sec-tag">${esc(tag)}</span></div>
  <h3><a href="${esc(href)}">${esc(title)}</a></h3>
  <p>${esc(desc)}</p>
  ${factHtml}
  ${caveat ? `<p class="sec-caveat">${esc(caveat)}</p>` : ''}
  <a class="sec-link" href="${esc(href)}">${esc(more)}</a>
</article>`;
}

function evalCardBi(e) {
  return `<article class="sec-card">
  <div class="sec-card-top"><span class="sec-tag">${bi('基准', 'Benchmark')}</span></div>
  <h3><a href="${esc(e.id)}.html">${bi(e.name, e.nameEn)}</a></h3>
  <p>${bi(e.measures, e.measuresEn)}</p>
  <dl class="sec-facts">
    <div><dt>${bi('指标', 'Metric')}</dt><dd>${bi(e.metric, e.metricEn)}</dd></div>
    <div><dt>${bi('成本', 'Cost')}</dt><dd>${bi(e.cost, e.costEn)}</dd></div>
    <div><dt>${bi('快照', 'Snapshot')}</dt><dd>${esc(e.snapshot)}</dd></div>
  </dl>
  <p class="sec-caveat">${bi(e.contamination, e.contaminationEn)}</p>
  <a class="sec-link" href="${esc(e.id)}.html">${bi('看基准卡 →', 'Open benchmark card →')}</a>
</article>`;
}

const TITLE_EN = {
  'license-commercial': 'Dataset licences and commercial use: separate three layers of rights',
  'rag-corpus': 'Choosing a RAG corpus: define the question before the documents',
  'read-dataset-card': 'How to read a dataset card',
  'read-leaderboard': 'How to read a leaderboard: what it measures, then who runs it',
  'sft-data-mix': 'Mixing SFT data: define behaviour before volume',
  'agent-eval': 'Evaluating agents and tool calls: environment, tools, steps, scoring',
  'eval-contamination': 'Checking benchmark contamination: dataset dates, then retrieval',
  'multimodal-eval': 'Reading multimodal evals: images, video and documents are three different things',
};
function chips(items, current = '') {
  return `<nav class="sec-nav" aria-label="数据分类" data-ui-aria-label-zh="数据分类" data-ui-aria-label-en="Dataset categories">${items.map(([href, label, labelEn]) => `<a href="${esc(href)}"${label === current ? ' aria-current="page"' : ''}>${bi(label, labelEn || label)}</a>`).join('')}</nav>`;
}

function categoryHref(id) { return `${id}.html`; }
function datasetHref(id) { return `${id}.html`; }

// 数据首页
{
  const allCards = CAT_ORDER.map((cat) => {
    const list = datasets.filter((d) => d.category === cat);
    return `<h2>${esc(CATS[cat].zh)} <span class="sec-tag">${list.length}</span></h2>
<p>${esc(CATS[cat].desc)}</p>
<div class="sec-grid">${list.map((d) => card({
      href: datasetHref(d.id),
      tag: CATS[cat].zh,
      title: d.name,
      desc: d.quality,
      facts: [['规模', d.size], ['许可', d.license], ['获取', d.access]],
      caveat: d.caveat,
      more: '看数据卡 →'
    })).join('')}</div>`;
  }).join('\n');

  const body = `<div class="container">
<header class="sec-head">
  <p class="eyebrow">Models · Data</p>
  <h1>${bi('数据与训练语料', 'Data and training corpora')}</h1>
  <p class="lede">数据集不是越大越好。先看许可与商用边界，再看规模口径、语言、质量与任务适配；这里收 ${datasets.length} 张数据卡，按 ${CAT_ORDER.length} 类放，每张都写清“能做什么、不能做什么”。</p>
</header>
<div class="sec-nav"><a href="../index.html">← 回模型站</a><a href="../evals/index.html">评测与榜单 →</a></div>
<div class="home-stats">
  <div><b>${datasets.length}</b><span>张数据卡</span></div>
  <div><b>${CAT_ORDER.length}</b><span>个类别</span></div>
  <div><b>${guides.length}</b><span>篇选数据指南</span></div>
</div>
<div class="sec-note"><b>使用前先做三件事：</b>核对许可与商用边界；确认规模口径（token / 样本 / 原始网页）；把评测集从训练集里剔除。数据卡只做索引与风险提示，不代替法务意见。</div>
${allCards}
<h2>怎么选数据</h2>
<div class="sec-grid">${guides.map((g) => card({
    href: `guides/${g.id}.html`,
    tag: '指南',
    title: g.title,
    desc: g.lede,
    more: '读指南 →'
  })).join('')}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'data', 'index.html'), page({
    title: '数据与训练语料 · AI 模型',
    desc: `${datasets.length} 张数据集卡，按预训练、SFT、偏好、评测、RAG、多模态、代码领域、合成数据八类整理；每张写清许可、规模、获取方式与使用边界。`,
    canonical: url('data/'),
    body
  }));
}

// 数据分类页
for (const cat of CAT_ORDER) {
  const list = datasets.filter((d) => d.category === cat);
  const nav = chips(CAT_ORDER.map((c) => [categoryHref(c), CATS[c].zh, CATS[c].en]), CATS[cat].zh);
  const body = `<div class="container">
<header class="sec-head">
  <p class="eyebrow">Models · Data · ${bi(CATS[cat].zh, CATS[cat].en)}</p>
  <h1>${bi(CATS[cat].zh, CATS[cat].en)}</h1>
  <p class="lede">${bi(`${CATS[cat].desc} 这一页收 ${list.length} 张卡；点进单卡看许可、规模、任务适配与使用边界。`, `${CATS[cat].descEn} This page lists ${list.length} dataset cards; open a card for licence, size, task fit and use boundaries.`)}</p>
</header>
<div class="sec-nav"><a href="index.html">← 全部数据</a><a href="../index.html">模型站</a></div>
${nav}
<div class="sec-grid">${list.map((d) => card({
    href: datasetHref(d.id),
    tag: CATS[cat].zh,
    title: d.name,
    desc: d.quality,
    facts: [['规模', d.size], ['许可', d.license], ['获取', d.access]],
    caveat: d.caveat,
    more: '看数据卡 →'
  })).join('')}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'data', categoryHref(cat)), page({
    title: `${CATS[cat].zh} · 数据 · AI 模型`,
    desc: `${CATS[cat].zh}数据集索引：${list.map((d) => d.name).join('、')}。每张卡写清许可、规模、获取方式与使用边界。`,
    canonical: url(`data/${categoryHref(cat)}`),
    body
  }));
}

// 数据单卡
for (const d of datasets) {
  const cat = CATS[d.category];
  const body = `<div class="container">
<header class="sec-detail">
  <p class="eyebrow">Models · Data · ${bi(cat.zh, cat.en)}</p>
  <h1>${esc(d.name)}</h1>
  <p class="sub">${esc(d.quality)}</p>
</header>
<div class="sec-nav"><a href="index.html">${bi('← 全部数据', '← All data')}</a><a href="${esc(datasetHref(d.category))}">${bi(cat.zh, cat.en)}</a><a href="../index.html">${bi('模型站', 'Models')}</a></div>
<table class="sec-table">
  <tr><th>来源</th><td>${esc(d.source)}</td></tr>
  <tr><th>规模</th><td>${esc(d.size)}</td></tr>
  <tr><th>语言</th><td>${esc(d.languages)}</td></tr>
  <tr><th>格式</th><td>${esc(d.format)}</td></tr>
  <tr><th>许可</th><td>${esc(d.license)}</td></tr>
  <tr><th>商用</th><td>${esc(d.commercial)}</td></tr>
  <tr><th>获取</th><td>${esc(d.access)}</td></tr>
  <tr><th>任务适配</th><td>${esc((d.tasks || []).join(' / '))}</td></tr>
  <tr><th>核验日</th><td>${esc(d.verifiedAt)}</td></tr>
</table>
<div class="sec-body">
  <h2>质量与偏差</h2>
  <p>${esc(d.quality)}</p>
  <h2>使用边界</h2>
  <p class="sec-caveat">${esc(d.caveat)}</p>
${d.firstUse ? `<h2>第一次使用</h2>\n  <p>${esc(d.firstUse)}</p>` : ''}
${d.pitfalls ? `<h2>常见坑</h2>\n  <p>${esc(d.pitfalls)}</p>` : ''}
${d.cost ? `<h2>成本</h2>\n  <p>${esc(d.cost)}</p>` : ''}
${d.notFor ? `<h2>不适合</h2>\n  <p>${esc(d.notFor)}</p>` : ''}
${d.compare ? `<h2>对比与替代</h2>\n  <p>${esc(d.compare)}</p>` : ''}
${d.verify ? `<h2>怎么验证</h2>\n  <p>${esc(d.verify)}</p>` : ''}
  <h2>下一步</h2>
  <ul>
    <li>打开来源页，下载数据集卡与许可原文，确认版本与获取条件。</li>
    <li>先抽 100–500 条样本做质量、语言与敏感内容抽检，再决定是否进训练管线。</li>
    <li>如果用于 RAG 或 SFT，先读 <a href="guides/rag-corpus.html">RAG 语料怎么选</a> / <a href="guides/sft-data-mix.html">SFT 数据怎么配比</a>。</li>
  </ul>
</div>
<div class="sec-sources">来源：<a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.url)}</a> · 核验日 ${esc(d.verifiedAt)} · 许可以来源页为准</div>
</div>`;
  fs.writeFileSync(path.join(site, 'data', datasetHref(d.id)), page({
    title: `${d.name} · 数据卡 · AI 模型`,
    desc: `${d.name} 数据集卡：${d.size}，${d.languages}，${d.license}。${d.caveat}`,
    canonical: url(`data/${datasetHref(d.id)}`),
    body
  }));
}

// 数据指南
for (const g of guides) {
  const body = `<div class="container">
<header class="sec-detail">
  <p class="eyebrow">Models · Data · ${bi('指南', 'Guide')}</p>
  <h1>${bi(g.title, TITLE_EN[g.id] || g.title)}</h1>
  <p class="sub">${esc(g.lede)}</p>
</header>
<div class="sec-nav"><a href="../index.html">← 全部数据</a><a href="../../index.html">模型站</a></div>
<div class="sec-body">
${g.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((p) => `<p>${p}</p>`).join('')}`).join('\n')}
</div>
<div class="sec-sources">参考：${g.sources.map(([label, href]) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`).join(' · ')}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'data', 'guides', `${g.id}.html`), page({
    title: `${g.title} · 数据指南 · AI 模型`,
    desc: g.lede,
    canonical: url(`data/guides/${g.id}.html`),
    depth: 2,
    body
  }));
}

// 评测首页
{
  const body = `<div class="container">
<header class="sec-head">
  <p class="eyebrow">Models · Evals</p>
  <h1>${bi('评测与榜单', 'Benchmarks and evaluations')}</h1>
  <p class="lede">榜单不是模型排行榜。先看它测什么、题集什么时候发布、评委是谁、分数怎么算，再决定这个分数对你的选型有没有意义。这里收 ${evals.length} 个常用基准，只写“测什么、怎么读”，不做总分与“最强”排名。</p>
</header>
<div class="sec-nav"><a href="../index.html">← 回模型站</a><a href="../data/index.html">数据与语料 →</a></div>
<div class="home-stats">
  <div><b>${evals.length}</b><span>个基准卡</span></div>
  <div><b>${evalGuides.length}</b><span>篇读榜 / 评测指南</span></div>
  <div><b>0</b><span>个总分排名</span></div>
</div>
<div class="sec-note"><b>读榜四问：</b>测的是知识、推理还是任务完成？题目有没有被训练集见过？评委是谁、分数怎么算？能不能复现、成本多少？四问缺一，分数只能当参考。</div>
<div class="sec-grid">${evals.map((e) => e.nameEn ? evalCardBi(e) : card({
    href: `${e.id}.html`,
    tag: '基准',
    title: e.name,
    desc: e.measures,
    facts: [['指标', e.metric], ['成本', e.cost], ['快照', e.snapshot]],
    caveat: e.contamination,
    more: '看基准卡 →'
  })).join('')}</div>
<div class="sec-grid">${evalGuides.map((g) => card({
    href: `guides/${g.id}.html`,
    tag: '指南',
    title: g.title,
    desc: g.lede,
    more: '读指南 →'
  })).join('')}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'evals', 'index.html'), page({
    title: '评测与榜单 · AI 模型',
    desc: `${evals.length} 个常用 AI 评测基准：MMLU、GPQA、SWE-bench、LiveCodeBench、Chatbot Arena 等；写清测什么、污染风险、复现条件与成本，不做总分排名。`,
    canonical: url('evals/'),
    body
  }));
}

// 评测单卡
for (const e of evals) {
  if (e.nameEn) {
    const body = `<div class="container">
<header class="sec-detail">
  <p class="eyebrow">Models · Evals</p>
  <h1>${bi(e.name, e.nameEn)}</h1>
  <p class="sub">${bi(e.measures, e.measuresEn)}</p>
</header>
<div class="sec-nav"><a href="index.html">${bi('← 全部评测', '← All evals')}</a><a href="../index.html">${bi('模型站', 'Models')}</a></div>
<table class="sec-table">
  <tr><th>${bi('测什么', 'What it measures')}</th><td>${bi(e.measures, e.measuresEn)}</td></tr>
  <tr><th>${bi('任务与数据', 'Tasks and data')}</th><td>${bi(e.tasks, e.tasksEn)}</td></tr>
  <tr><th>${bi('指标', 'Metric')}</th><td>${bi(e.metric, e.metricEn)}</td></tr>
  <tr><th>${bi('污染风险', 'Contamination risk')}</th><td>${bi(e.contamination, e.contaminationEn)}</td></tr>
  <tr><th>${bi('复现', 'Reproduction')}</th><td>${bi(e.reproduction, e.reproductionEn)}</td></tr>
  <tr><th>${bi('成本', 'Cost')}</th><td>${bi(e.cost, e.costEn)}</td></tr>
  <tr><th>${bi('快照日', 'Snapshot')}</th><td>${esc(e.snapshot)}</td></tr>
  <tr><th>${bi('核验日', 'Verified')}</th><td>${esc(e.verifiedAt)}</td></tr>
</table>
<div class="sec-body">
  <h2>${bi('怎么读', 'How to read it')}</h2>
  <p>${bi(e.note, e.noteEn)}</p>
  <h2>${bi('下一步', 'Next steps')}</h2>
  <ul>
    <li>${bi('打开榜单或论文页，确认题集版本、评分脚本与提交日期。', 'Open the leaderboard or paper and confirm the task-set version, scoring script and submission date.')}</li>
    <li>${bi('把它和你关心的业务任务做对照；找不到对应任务，就自己建 50–100 条内部评测。', 'Compare it with the business task you care about; if there is no match, build 50–100 internal cases.')}</li>
    <li>${bi('读《怎么读榜单》，把“分数”写成“条件 + 参考价值”。', 'Read “How to read a leaderboard” and write scores as “conditions plus reference value”.')}</li>
  </ul>
</div>
<div class="sec-sources">${bi('榜单 / 来源', 'Leaderboard / source')}：<a href="${esc(e.leaderboard)}" target="_blank" rel="noopener">${esc(e.leaderboard)}</a> · ${bi('快照', 'Snapshot')} ${esc(e.snapshot)}</div>
</div>`;
    fs.writeFileSync(path.join(site, 'evals', `${e.id}.html`), page({
      title: `${e.name} / ${e.nameEn} · 评测基准 · AI 模型`,
      desc: `${e.name} / ${e.nameEn}：${e.measures}；指标 ${e.metric}；污染风险、复现条件、成本与适用边界都在页内写清，读完能判断这个分数能不能直接引用。`,
      canonical: url(`evals/${e.id}.html`),
      body
    }));
    continue;
  }
  const body = `<div class="container">
<header class="sec-detail">
  <p class="eyebrow">Models · Evals</p>
  <h1>${esc(e.name)}</h1>
  <p class="sub">${esc(e.measures)}</p>
</header>
<div class="sec-nav"><a href="index.html">← 全部评测</a><a href="../index.html">模型站</a></div>
<table class="sec-table">
  <tr><th>测什么</th><td>${esc(e.measures)}</td></tr>
  <tr><th>任务与数据</th><td>${esc(e.tasks)}</td></tr>
  <tr><th>指标</th><td>${esc(e.metric)}</td></tr>
  <tr><th>污染风险</th><td>${esc(e.contamination)}</td></tr>
  <tr><th>复现</th><td>${esc(e.reproduction)}</td></tr>
  <tr><th>成本</th><td>${esc(e.cost)}</td></tr>
  <tr><th>快照日</th><td>${esc(e.snapshot)}</td></tr>
  <tr><th>核验日</th><td>${esc(e.verifiedAt)}</td></tr>
</table>
<div class="sec-body">
  <h2>怎么读</h2>
  <p>${esc(e.note)}</p>
${e.firstUse ? `<h2>第一次使用</h2>\n  <p>${esc(e.firstUse)}</p>` : ''}
${e.pitfalls ? `<h2>常见坑</h2>\n  <p>${esc(e.pitfalls)}</p>` : ''}
${e.notFor ? `<h2>不适合</h2>\n  <p>${esc(e.notFor)}</p>` : ''}
${e.compare ? `<h2>对比与替代</h2>\n  <p>${esc(e.compare)}</p>` : ''}
${e.verify ? `<h2>怎么验证</h2>\n  <p>${esc(e.verify)}</p>` : ''}
  <h2>下一步</h2>
  <ul>
    <li>打开榜单或论文页，确认题集版本、评分脚本与提交日期。</li>
    <li>把它和你关心的业务任务做对照；找不到对应任务，就自己建 50–100 条内部评测。</li>
    <li>读 <a href="guides/read-leaderboard.html">怎么读榜单</a>，把“分数”写成“条件 + 参考价值”。</li>
  </ul>
</div>
<div class="sec-sources">榜单 / 来源：<a href="${esc(e.leaderboard)}" target="_blank" rel="noopener">${esc(e.leaderboard)}</a> · 快照 ${esc(e.snapshot)}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'evals', `${e.id}.html`), page({
    title: `${e.name} · 评测基准 · AI 模型`,
    desc: `${e.name}：${e.measures}；指标 ${e.metric}；污染风险、复现条件、成本与适用边界都在页内写清，读完能判断这个分数能不能直接引用。`,
    canonical: url(`evals/${e.id}.html`),
    body
  }));
}

// 评测指南
for (const g of evalGuides) {
  const body = `<div class="container">
<header class="sec-detail">
  <p class="eyebrow">Models · Evals · ${bi('指南', 'Guide')}</p>
  <h1>${bi(g.title, TITLE_EN[g.id] || g.title)}</h1>
  <p class="sub">${esc(g.lede)}</p>
</header>
<div class="sec-nav"><a href="../index.html">← 全部评测</a><a href="../../index.html">模型站</a></div>
<div class="sec-body">
${g.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((p) => `<p>${p}</p>`).join('')}`).join('\n')}
</div>
<div class="sec-sources">参考：${g.sources.map(([label, href]) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`).join(' · ')}</div>
</div>`;
  fs.writeFileSync(path.join(site, 'evals', 'guides', `${g.id}.html`), page({
    title: `${g.title} · 评测指南 · AI 模型`,
    desc: `${g.lede} 页内给出可复现的检查步骤与适用边界。`,
    canonical: url(`evals/guides/${g.id}.html`),
    depth: 2,
    body
  }));
}

// 首页入口块
{
  const indexFile = path.join(site, 'index.html');
  const html = fs.readFileSync(indexFile, 'utf8');
  const block = `<!-- sec-doors:start -->
<div class="container">
<div class="sec-doors">
  <a class="sec-door" href="data/index.html">
    <span class="k">Models · Data</span>
    <h2>数据与训练语料</h2>
    <p>${datasets.length} 张数据集卡，按 ${CAT_ORDER.length} 类整理。先看许可与商用边界，再看规模、语言与任务适配。</p>
    <span class="more">看数据卡 →</span>
  </a>
  <a class="sec-door" href="evals/index.html">
    <span class="k">Models · Evals</span>
    <h2>评测与榜单</h2>
    <p>${evals.length} 个常用基准，只写“测什么、怎么读”，不做总分与“最强”排名。</p>
    <span class="more">看基准卡 →</span>
  </a>
</div>
</div>
<!-- sec-doors:end -->
`;
  let next;
  if (html.includes('<!-- sec-doors:start -->')) {
    next = html.replace(/<!-- sec-doors:start -->[\s\S]*?<!-- sec-doors:end -->\n?/, block);
  } else {
    next = html.replace('<section class="vz-section" id="lineage">', `${block}<section class="vz-section" id="lineage">`);
  }
  if (!next.includes('href="sections.css"')) {
    next = next.replace('</head>', '  <link rel="stylesheet" href="sections.css" />\n</head>');
  }
  fs.writeFileSync(indexFile, next);
}

// sitemap / llms
{
  const urls = [];
  urls.push(url('data/'), url('data/index.html'), url('evals/'), url('evals/index.html'));
  for (const c of CAT_ORDER) urls.push(url(`data/${categoryHref(c)}`));
  for (const d of datasets) urls.push(url(`data/${datasetHref(d.id)}`));
  for (const g of guides) urls.push(url(`data/guides/${g.id}.html`));
  for (const e of evals) urls.push(url(`evals/${e.id}.html`));
  for (const g of evalGuides) urls.push(url(`evals/guides/${g.id}.html`));

  const sitemapFile = path.join(site, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const newUrls = urls.filter((u) => !sitemap.includes(`<loc>${u}</loc>`));
  if (newUrls.length) {
    sitemap = sitemap.replace('</urlset>', newUrls.map((u) => `  <url><loc>${u}</loc><lastmod>2026-11-19</lastmod></url>`).join('\n') + '\n</urlset>');
    fs.writeFileSync(sitemapFile, sitemap);
  }

  const llmsFile = path.join(site, 'llms.txt');
  let llms = fs.readFileSync(llmsFile, 'utf8');
  if (!llms.includes('## 数据与评测')) {
    llms += `\n\n## 数据与评测\n- [数据与训练语料](${url('data/')}) — ${datasets.length} 张数据集卡，${CAT_ORDER.length} 类；许可、规模、获取方式与使用边界。\n- [评测与榜单](${url('evals/')}) — ${evals.length} 个基准，只写测什么与怎么读，不做总分排名。\n`;
    fs.writeFileSync(llmsFile, llms);
  }
  const llmsEnFile = path.join(site, 'llms.en.txt');
  let llmsEn = fs.readFileSync(llmsEnFile, 'utf8');
  if (!llmsEn.includes('## Data and evals')) {
    llmsEn += `\n\n## Data and evals\n- [Data and training corpora](${url('data/')}) — ${datasets.length} dataset cards in ${CAT_ORDER.length} categories; licence, size, access and boundaries.\n- [Evals and leaderboards](${url('evals/')}) — ${evals.length} benchmarks; what they measure and how to read them, no composite ranking.\n`;
    fs.writeFileSync(llmsEnFile, llmsEn);
  }
}

fs.copyFileSync(sectionsCss, path.join(site, 'sections.css'));
console.log(`models sections built: ${datasets.length} datasets, ${evals.length} evals, ${guides.length} guides`);
