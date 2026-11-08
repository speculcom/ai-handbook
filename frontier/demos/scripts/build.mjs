/* demos.specul.com 构建器：策展目录 + 事实维度对照 + 模型发布轨。
 * 真相源：_data/handbook/frontier/demos/entries.json 与 ledger.json。页面数字一律由数据算。
 * 口径：不排名、不打分；截图/嵌入必须有 ledger 依据；嵌入只 sandbox="allow-scripts"。
 */
import fs from 'node:fs';
import path from 'node:path';
import { shell, esc, nativeOption } from '../../../../../_sites/_template/shell.mjs';

const ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..');
const SRC = path.join(ROOT, '_data/handbook/frontier/demos');
const OUT = path.join(SRC, 'site');
const bi = (zh, en) => `<span data-zh>${zh}</span><span data-en>${en}</span>`;

const entries = JSON.parse(fs.readFileSync(path.join(SRC, 'entries.json'), 'utf8'));
const ledger = JSON.parse(fs.readFileSync(path.join(SRC, 'ledger.json'), 'utf8'));
const shotBy = Object.fromEntries((ledger.shots || []).map((s) => [s.entry, s]));
const embedBy = Object.fromEntries((ledger.embeds || []).map((s) => [s.entry, s]));

const CATS = [...new Set(entries.map((e) => e.category))];
const catEn = { 游戏: 'Games', 'Web 应用': 'Web apps', 数据可视化: 'Data viz', 内容与媒体: 'Media', 自动化: 'Automation', 模型演示: 'Model demos' };

function card(e) {
  const shot = shotBy[e.id];
  const embed = embedBy[e.id];
  const media = shot
    ? `<figure class="dm-shot"><img src="shots/${esc(shot.file)}" alt="${esc(e.title.zh)} 截图" loading="lazy" /><figcaption>${bi('截图依据见许可台账', 'Screenshot basis in the licence ledger')} · ${esc(shot.checkedAt)}</figcaption></figure>`
    : '';
  const embedHtml = embed
    ? `<div class="dm-embed"><iframe src="${esc(embed.url)}" sandbox="allow-scripts" loading="lazy" title="${esc(e.title.en)}"></iframe><p class="t-sm"><a href="${esc(e.url)}">${bi('嵌入加载失败？打开原址', 'Embed failed? Open the original')}</a></p></div>`
    : '';
  return `      <article class="dm-card" data-cat="${esc(e.category)}">
        <h3><a href="${esc(e.url)}" rel="noopener">${esc(e.title.zh)}<span class="t-sm"> / ${esc(e.title.en)}</span></a></h3>
        <p class="t-sm">${bi(esc(e.category), esc(catEn[e.category] || e.category))} · ${bi('许可', 'Licence')}: ${esc(e.license.spdx || e.license.kind)} · ${bi('核验', 'Checked')} ${esc(e.verifiedAt)}</p>
        ${media}${embedHtml}
        <p>${bi(esc(e.notes.zh), esc(e.notes.en))}</p>
        <p class="t-sm">${bi('AI 用在哪', 'AI scope')}: ${esc(e.aiScope.join(' / '))} · ${bi('本站运行', 'Site run')}: ${e.run.status === 'ran' ? `${bi('跑过', 'ran')} ${esc(e.run.date)}（${esc(e.run.env)}）` : bi('未跑', 'not run')}</p>
      </article>`;
}

const indexBody = `<div class="container demos-page">
  <p class="kicker">${bi('别人做的公开作品，逐条核验', 'Other people’s public work, checked entry by entry')}</p>
  <h1>${bi('作品库', 'Demos')}</h1>
  <p>${bi(`收录 ${entries.length} 条有可核验 AI 参与痕迹的公开作品与模型演示。只给事实字段与维度对照，不排名、不打分；截图与嵌入逐条登记许可依据。`, `${entries.length} public works and model demos with verifiable AI involvement. Fact fields and dimension comparisons only — no ranking, no scores; screenshots and embeds carry a per-entry licence basis.`)}</p>
  <form class="dm-filter"><label for="dm-cat">${bi('类目', 'Category')}<select id="dm-cat">${nativeOption('all', '全部', 'All')}${CATS.map((c) => nativeOption(c, c, catEn[c] || c)).join('')}</select></label></form>
  <div class="dm-grid" id="dm-grid">
${entries.map(card).join('\n')}
  </div>
  <noscript><p class="t-sm">${bi('未开启脚本：类目筛选不可用，全部条目已在上方列出。', 'Without JavaScript the category filter is unavailable; all entries are listed above.')}</p></noscript>
  <p><a href="compare.html">${bi('看维度对照（不排名）', 'See the dimension comparison (no ranking)')}</a> · <a href="releases.html">${bi('看模型发布轨', 'See the model-release track')}</a></p>
</div>
<script>
(function(){var s=document.getElementById('dm-cat');if(!s)return;s.addEventListener('change',function(){var v=s.value;document.querySelectorAll('.dm-card').forEach(function(c){c.hidden=(v!=='all'&&c.getAttribute('data-cat')!==v);});});})();
</script>`;

const compareRows = entries.map((e) => `      <tr><th scope="row"><a href="${esc(e.url)}">${esc(e.title.zh)}</a></th><td>${esc(e.compare.runtime)}</td><td>${esc(e.compare.hardware)}</td><td>${esc(e.license.spdx || e.license.kind)}</td><td>${esc(e.compare.reproducibility)}</td><td>${esc(e.compare.maintenance)}</td><td>${e.model ? esc(`${e.model.name} ${e.model.version || ''}`) : '—'}</td><td>${e.run.status === 'ran' ? esc(e.run.date) : bi('未跑', 'not run')}</td></tr>`).join('\n');
const compareBody = `<div class="container demos-page">
  <h1>${bi('维度对照', 'Dimension comparison')}</h1>
  <p>${bi('同一行里只放事实：怎么跑、要什么硬件、许可能不能商用、能不能复现、还维护吗、对应哪个模型、本站跑过没有。不给总分，不排先后。', 'Each row carries facts only: how it runs, hardware needed, commercial licence, reproducibility, maintenance, which model it pairs with, and whether this site ran it. No total score, no ordering.')}</p>
  <div class="dm-table-wrap"><table class="dm-table">
    <thead><tr><th>${bi('作品', 'Work')}</th><th>${bi('运行方式', 'Runtime')}</th><th>${bi('硬件门槛', 'Hardware')}</th><th>${bi('许可', 'Licence')}</th><th>${bi('可复现性', 'Reproducibility')}</th><th>${bi('维护状态', 'Maintenance')}</th><th>${bi('对应模型', 'Model')}</th><th>${bi('本站运行', 'Site run')}</th></tr></thead>
    <tbody>
${compareRows}
    </tbody>
  </table></div>
</div>`;

const relEntries = entries.filter((e) => e.model);
const releasesBody = `<div class="container demos-page">
  <h1>${bi('模型发布轨', 'Model-release track')}</h1>
  <p>${bi('只收官方 model card、Hugging Face Spaces 或仓库 releases 里点名的演示；挂官方发布日与本站核验日。新模型发布触发一轮收录，季度复核存活。', 'Only demos named by an official model card, Hugging Face Space or repository release; each carries the official release date and our check date. A new model release triggers an intake round; liveness is re-checked quarterly.')}</p>
  <ul class="dm-rel">
${relEntries.map((e) => `    <li><b>${esc(e.model.name)} ${esc(e.model.version || '')}</b> · ${bi('官方发布', 'official release')} ${esc(e.model.releaseDate)} · <a href="${esc(e.model.releaseUrl)}">${bi('发布来源', 'release source')}</a> → <a href="${esc(e.url)}">${esc(e.title.zh)}</a>（${bi('核验', 'checked')} ${esc(e.verifiedAt)}）</li>`).join('\n') || `    <li>${bi('暂无条目', 'No entries yet')}</li>`}
  </ul>
</div>`;

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
for (const s of ledger.shots || []) {
  const from = path.join(SRC, 'shots', s.file);
  if (fs.existsSync(from)) fs.copyFileSync(from, path.join(OUT, 'shots', s.file));
}
const pages = [
  ['index.html', '作品库 · Specul', '别人做的公开作品与模型演示的策展目录：按运行方式、硬件门槛、许可、可复现性与维护状态逐条登记事实维度，不排名、不打分，截图与嵌入另有逐条许可台账。', indexBody],
  ['compare.html', '维度对照 · Specul', '作品库的事实维度对照表：把运行方式、硬件门槛、许可与商用范围、可复现性、维护状态、对应模型版本并列展示，只给可核验字段，不给总分或推荐排名。', compareBody],
  ['releases.html', '模型发布轨 · Specul', '随官方模型发布收录的演示清单：每条挂官方 model card、Spaces 或 releases 的发布日期与本站核验日，新模型发布触发一轮收录，季度复核链接存活。', releasesBody],
];
for (const [file, title, desc, body] of pages) {
  const canonical = file === 'index.html' ? 'https://demos.specul.com/' : `https://demos.specul.com/${file}`;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: canonical, description: desc, isPartOf: { '@type': 'WebSite', url: 'https://demos.specul.com/' } };
  fs.writeFileSync(path.join(OUT, file), shell({ current: 'demos', title, desc, canonical, body, repo: 'https://github.com/speculcom/ai-handbook', jsonLd, headExtra: '  <link rel="stylesheet" href="demos.css" />' }));
}
fs.copyFileSync(path.join(SRC, 'css/demos.css'), path.join(OUT, 'demos.css'));
fs.copyFileSync(path.join(ROOT, '_sites/_template/site.css'), path.join(OUT, 'site.css'));
fs.writeFileSync(path.join(OUT, 'CNAME'), 'demos.specul.com\n');
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://demos.specul.com/sitemap.xml\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([f]) => `  <url><loc>https://demos.specul.com/${f}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'llms.txt'), `# Specul Demos\n\n> 别人做的公开作品与模型演示的策展目录。\n\n收录 ${entries.length} 条；不排名、不打分；截图与嵌入逐条登记许可依据。\n\n- [作品库](https://demos.specul.com/index.html)\n- [维度对照](https://demos.specul.com/compare.html)\n- [模型发布轨](https://demos.specul.com/releases.html)\n`);
fs.writeFileSync(path.join(OUT, 'llms.en.txt'), `# Specul Demos\n\n> A curated directory of other people's public work and model demos.\n\n${entries.length} entries; no ranking, no scores; screenshots and embeds carry a per-entry licence basis.\n\n- [Demos](https://demos.specul.com/index.html)\n- [Comparison](https://demos.specul.com/compare.html)\n- [Release track](https://demos.specul.com/releases.html)\n`);
console.log(`demos 构建：${entries.length} 条 · ${pages.length} 页 · 截图 ${(ledger.shots || []).length} · 嵌入 ${(ledger.embeds || []).length}`);
