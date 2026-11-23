import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell } from '../../../../_sites/_template/shell.mjs';
import { parseFrontmatter } from '../scripts/yaml.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const out = path.join(root, '../../_sites/agent.specul');
const dataDir = path.join(here, '../skills');
const guidesDir = path.join(here, '../guides');
const sectionsCss = path.resolve(here, '../../../../_sites/_template/sections.css');

fs.mkdirSync(path.join(out, 'skills'), { recursive: true });
fs.mkdirSync(path.join(out, 'prompts'), { recursive: true });

const skills = JSON.parse(fs.readFileSync(path.join(dataDir, 'skills.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(dataDir, 'pages.json'), 'utf8')).pages;

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const url = (p) => `https://tools.specul.com/${p}`;

function page({ title, desc, canonical, body, depth = 1 }) {
  const prefix = '../'.repeat(depth);
  return shell({
    current: 'agent',
    title,
    desc,
    canonical,
    assetPrefix: prefix,
    headExtra: `<link rel="stylesheet" href="${prefix}sections.css" />`,
    body
  });
}

function skillCard(s) {
  return `<article class="sec-card">
  <div class="sec-card-top"><span class="sec-tag">${s.official ? '官方' : '社区'}</span><span class="sec-badge">${s.official ? 'Anthropic' : '第三方'}</span></div>
  <h3><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></h3>
  <p>${esc(s.what)}</p>
  <dl class="sec-facts">
    <div><dt>来源</dt><dd>${esc(s.source)}</dd></div>
    <div><dt>许可</dt><dd>${esc(s.license)}</dd></div>
    <div><dt>权限</dt><dd>${esc(s.permissions)}</dd></div>
    <div><dt>兼容</dt><dd>${esc(s.compatibility)}</dd></div>
  </dl>
  <p class="sec-caveat">${esc(s.risk)}</p>
  <a class="sec-link" href="${esc(s.url)}" target="_blank" rel="noopener">看源码 / SKILL.md →</a>
</article>`;
}

const TITLE_EN = {
  'what-is': 'What Skills are: capability packages, not prompts',
  structure: 'Anatomy of a Skill: SKILL.md, scripts, resources, triggers',
  'build-test': 'How to build and test: start from the smallest runnable version',
  review: 'Reviewing a third-party Skill: start with what it touches',
};
const biText = (zh, en) => `<span data-zh>${zh}</span><span data-en>${en}</span>`;
const pageTitle = (p) => biText(esc(p.title), esc(TITLE_EN[p.id] || p.title));

function skillNav(current) {
  return `<nav class="sec-nav" aria-label="Skills pages">
  <a href="index.html"${current === 'index' ? ' aria-current="page"' : ''}>${biText('是什么', 'What')}</a>
  <a href="structure.html"${current === 'structure' ? ' aria-current="page"' : ''}>${biText('结构', 'Structure')}</a>
  <a href="build-test.html"${current === 'build-test' ? ' aria-current="page"' : ''}>${biText('怎么写 / 怎么测', 'Build &amp; test')}</a>
  <a href="review.html"${current === 'review' ? ' aria-current="page"' : ''}>${biText('审第三方', 'Review')}</a>
  <a href="../index.html">${biText('回工具站', 'Tools home')}</a>
</nav>`;
}

function renderPage(p, current) {
  return `<div class="container">
<header class="sec-head">
  <p class="eyebrow">Tools · Skills</p>
  <h1>${pageTitle(p)}</h1>
  <p class="lede">${esc(p.lede)}</p>
</header>
${skillNav(current)}
<div class="sec-body">
${p.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((x) => `<p>${x}</p>`).join('')}`).join('\n')}
</div>
<div class="sec-sources">参考：${p.sources.map(([label, href]) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`).join(' · ')}</div>
</div>`;
}

// Skills 首页 = 是什么 + 12 条清单
{
  const what = pages.find((p) => p.id === 'what-is');
  const body = `<div class="container">
<header class="sec-head">
  <p class="eyebrow">Tools · Skills</p>
  <h1>${pageTitle(what)}</h1>
  <p class="lede">${esc(what.lede)}</p>
</header>
${skillNav('index')}
<div class="sec-note"><b>先分清：</b>Skill 是能力包，不是更长的提示词；MCP 是工具接口，agent 是执行主体。Skill 可以调用 MCP，也可以被 agent 加载。下面 12 条只做索引，不执行仓库脚本，也不背书安全与许可。</div>
<div class="sec-body">
${what.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((x) => `<p>${x}</p>`).join('')}`).join('\n')}
</div>
<h2>首批 12 条：6 条官方 + 6 条社区</h2>
<p>点进仓库看 SKILL.md、脚本、权限与许可；先按「怎么审第三方 Skill」走一遍，再决定装不装。</p>
<div class="sec-grid">${skills.map(skillCard).join('')}</div>
<div class="sec-sources">参考：${what.sources.map(([label, href]) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`).join(' · ')}</div>
</div>`;
  fs.writeFileSync(path.join(out, 'skills', 'index.html'), page({
    title: 'Skills：能力包，不是提示词 · AI 工具',
    desc: 'Skills 是什么、和 prompt / MCP / agent 的分界；首批 12 条官方与社区技能索引，含来源、许可、权限与风险提示。',
    canonical: url('skills/'),
    body
  }));
}

// 其余三页
for (const p of pages.filter((x) => x.id !== 'what-is')) {
  fs.writeFileSync(path.join(out, 'skills', `${p.slug}.html`), page({
    title: `${p.title} · Skills · AI 工具`,
    desc: `${p.lede} 含步骤、检查点与失败分支。`,
    canonical: url(`skills/${p.slug}.html`),
    body: renderPage(p, p.slug)
  }));
}

// 提示词 hub
{
  const all = fs.readdirSync(guidesDir).filter((f) => f.startsWith('prompt-') && f.endsWith('.md'));
  const items = all.map((f) => {
    const fm = parseFrontmatter(fs.readFileSync(path.join(guidesDir, f), 'utf8'));
    return { file: f, id: fm.id || f.replace(/\.md$/, ''), title: fm.title || f, summary: fm.summary || '', kind: fm.kind || 'prompt-case' };
  });
  const guides = items.filter((x) => x.kind === 'prompt-guide').sort((a, b) => a.title.localeCompare(b.title, 'zh'));
  const cases = items.filter((x) => x.kind !== 'prompt-guide').sort((a, b) => a.title.localeCompare(b.title, 'zh'));

  const itemCard = (x) => `<article class="sec-card">
  <div class="sec-card-top"><span class="sec-tag">${x.kind === 'prompt-guide' ? '指南' : '案例'}</span></div>
  <h3><a href="../mcp/guides/${esc(x.id)}.html">${esc(x.title)}</a></h3>
  <p>${esc(x.summary)}</p>
  <a class="sec-link" href="../mcp/guides/${esc(x.id)}.html">打开 →</a>
</article>`;

  const body = `<div class="container">
<header class="sec-head">
  <p class="eyebrow">Tools · Prompts</p>
  <h1>${biText('提示词：6 篇指南 + 24 个案例', 'Prompts: 6 guides + 24 cases')}</h1>
  <p class="lede">先学结构，再照着做。6 篇指南讲角色、上下文、结构化输出、评测、迭代与安全；24 个案例给出完整 prompt、预期输出、检查点与失败分支。案例标注“效果未实测”，照抄前先用你的真实输入跑一遍。</p>
</header>
<div class="sec-nav"><a href="../index.html">← 回工具站</a><a href="../skills/index.html">Skills →</a></div>
<div class="home-stats">
  <div><b>${guides.length}</b><span>篇方法指南</span></div>
  <div><b>${cases.length}</b><span>个可抄案例</span></div>
  <div><b>0</b><span>个“万能模板”</span></div>
</div>
<h2>方法：先读这 6 篇</h2>
<div class="sec-grid">${guides.map(itemCard).join('')}</div>
<h2>案例：按任务找</h2>
<p>24 个案例覆盖代码、文档、数据、会议、研究、翻译、安全与表格。每个案例都写清输入、prompt、预期输出、检查点和失败分支；没有实测，不承诺效果。</p>
<div class="sec-grid">${cases.map(itemCard).join('')}</div>
<div class="sec-sources">说明：案例页在 <a href="../mcp/">工具站 MCP 板块</a> 的指南目录下；本页只做汇总，不复制正文。Prompt 方法的长文在 <a href="https://learn.specul.com/" target="_blank" rel="noopener">学 AI 站</a>。</div>
</div>`;
  fs.writeFileSync(path.join(out, 'prompts', 'index.html'), page({
    title: '提示词指南与案例 · AI 工具',
    desc: '6 篇提示词方法指南 + 24 个可抄案例：完整 prompt、预期输出、检查点、失败分支；标注效果未实测，照抄前先跑真实输入。',
    canonical: url('prompts/'),
    body
  }));
}

// 工具首页入口 + sections.css
{
  const indexFile = path.join(out, 'index.html');
  let html = fs.readFileSync(indexFile, 'utf8');
  const block = `<!-- sec-tools:start -->
<div class="container">
<div class="sec-doors">
  <a class="sec-door" href="skills/index.html">
    <span class="k">Tools · Skills</span>
    <h2>Skills：装一套能力包</h2>
    <p>12 条官方与社区技能索引；先看权限、脚本、来源与许可，再决定装不装。</p>
    <span class="more">看 Skills →</span>
  </a>
  <a class="sec-door" href="prompts/index.html">
    <span class="k">Tools · Prompts</span>
    <h2>提示词：6 篇指南 + 24 个案例</h2>
    <p>从结构到评测，再到代码、文档、会议、表格等任务；每个案例都有检查点与失败分支。</p>
    <span class="more">看提示词 →</span>
  </a>
</div>
</div>
<!-- sec-tools:end -->
`;
  if (html.includes('<!-- sec-tools:start -->')) {
    html = html.replace(/<!-- sec-tools:start -->[\s\S]*?<!-- sec-tools:end -->\n?/, '');
  }
  /* 2026-11-19：两张入口卡原本插在 <main> 最前面，把首页 H1 顶到了第二屏。
     现在放到 hero 之后：先看「先看你手里的活，再挑工具」，再决定走 Skills / 提示词。 */
  if (/<section class="hero">/.test(html)) {
    html = html.replace(/(<section class="hero">[\s\S]*?<\/section>\n?)/, `$1\n${block}`);
  } else {
    html = html.replace('<main id="main">', `<main id="main">\n${block}`);
  }
  if (!html.includes('href="sections.css"')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="sections.css" />\n</head>');
  }
  fs.writeFileSync(indexFile, html);
}

// 2026-11-23：两张手工页从 special/ 复制，不参与模板渲染。
// 主构建会清空 OUT 后只写生成页；不在这里补，2026.html 首页入口会 404，
// 404.html 也会丢。2026.html 进 sitemap；404.html 自带 noindex，不进。
for (const name of ['2026.html', '404.html']) {
  const src = path.join(here, '..', 'special', name);
  if (!fs.existsSync(src)) throw new Error(`缺少手工页：${src}`);
  fs.copyFileSync(src, path.join(out, name));
}

// sitemap / llms
{
  const urls = [url('skills/'), url('skills/structure.html'), url('skills/build-test.html'), url('skills/review.html'), url('prompts/')];
  const sitemapFile = path.join(out, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const newUrls = urls.filter((u) => !sitemap.includes(`<loc>${u}</loc>`));
  if (newUrls.length) {
    sitemap = sitemap.replace('</urlset>', newUrls.map((u) => `  <url><loc>${u}</loc><lastmod>2026-11-19</lastmod></url>`).join('\n') + '\n</urlset>');
    fs.writeFileSync(sitemapFile, sitemap);
  }
  if (!sitemap.includes(`<loc>${url('2026.html')}</loc>`)) {
    sitemap = sitemap.replace('</urlset>', `  <url><loc>${url('2026.html')}</loc><priority>0.6</priority></url>\n</urlset>`);
    fs.writeFileSync(sitemapFile, sitemap);
  }

  const llmsFile = path.join(out, 'llms.txt');
  let llms = fs.readFileSync(llmsFile, 'utf8');
  if (!llms.includes('## Skills 与提示词')) {
    llms += `\n\n## Skills 与提示词\n- [Skills](${url('skills/')}) — 是什么、结构、怎么写怎么测、怎么审第三方；12 条精选索引。\n- [提示词](${url('prompts/')}) — 6 篇方法指南 + 24 个可抄案例，含检查点与失败分支。\n`;
    fs.writeFileSync(llmsFile, llms);
  }
  const llmsEnFile = path.join(out, 'llms.en.txt');
  let llmsEn = fs.readFileSync(llmsEnFile, 'utf8');
  if (!llmsEn.includes('## Skills and prompts')) {
    llmsEn += `\n\n## Skills and prompts\n- [Skills](${url('skills/')}) — what they are, structure, build/test, review; 12 curated entries.\n- [Prompts](${url('prompts/')}) — 6 method guides + 24 copyable cases with checkpoints and failure branches.\n`;
    fs.writeFileSync(llmsEnFile, llmsEn);
  }
}

fs.copyFileSync(sectionsCss, path.join(out, 'sections.css'));
console.log(`tools extras built: ${skills.length} skills, ${pages.length} skill pages, prompts hub`);
