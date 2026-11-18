/* demos.specul.com · 可运行作品演示站。
 *
 * 结构：
 *   index.html                 两套模型合集 + 全部作品（搜索/类目/模型筛选）
 *   model-<collection>.html    单个模型合集
 *   play.html?id=<demo>        站内播放器（原始 GitHub Pages iframe，不复制源文件）
 *   compare.html               双模型并排（不同题时明确标注，不假装同题）
 *   prompts.html               提示词索引（只链原始 prompt，不复制全文）
 *
 * 口径：不排名；模型名是仓库自述；无 LICENSE 的仓不复制 HTML/截图，只外链。
 */
import fs from 'node:fs';
import path from 'node:path';
import { shell, esc } from '../../../../../_sites/_template/shell.mjs';
import { bi, catLabels } from '../../../../../_sites/_template/mini-site-build.mjs';

const ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..');
const SRC = path.join(ROOT, '_data/handbook/frontier/demos');
const OUT = path.join(SRC, 'site');
const entries = JSON.parse(fs.readFileSync(path.join(SRC, 'entries.json'), 'utf8'));
const collections = JSON.parse(fs.readFileSync(path.join(SRC, 'collections.json'), 'utf8'));
const byCollection = Object.fromEntries(collections.map((c) => [c.id, { ...c, entries: entries.filter((e) => e.collection === c.id) }]));
const cats = [...new Set(entries.map((e) => e.category))];
const catCount = (c) => entries.filter((e) => e.category === c).length;
const modelCount = (id) => entries.filter((e) => e.collection === id).length;
const samePrompt = [...new Set(entries.map((e) => e.promptHash))].filter((h) => entries.filter((e) => e.promptHash === h).length > 1).length;
const checked = entries.map((e) => e.verifiedAt).filter(Boolean).sort().slice(-1)[0] || '—';

const playHref = (e) => `play.html?id=${encodeURIComponent(e.id)}`;
const modelHref = (c) => `model-${c.id}.html`;
const repoOf = (c) => (String(c.repo || '').startsWith('http') ? c.repo : `https://github.com/${c.repo}`);
const short = (s, n = 120) => (String(s || '').length > n ? `${String(s).slice(0, n - 1)}…` : String(s || ''));
const cat = (e) => catLabels(e.category || '');
const modelOf = (e) => collections.find((c) => c.id === e.collection) || { name: e.model?.name || '—', short: e.model?.name || '—' };

function card(e, opts = {}) {
  const c = modelOf(e);
  const L = cat(e);
  const thumb = opts.thumb === false ? '' : `<a class="dm-thumb" href="${esc(playHref(e))}" aria-label="Run ${esc(e.title.en || e.title.zh)}"><img src="${esc(e.thumbUrl)}" alt="${esc(e.title.zh)}" loading="lazy" referrerpolicy="no-referrer" /></a>`;
  return `<article class="fx-card dm-card" id="${esc(e.id)}" data-cat="${esc(e.category)}" data-model="${esc(e.collection)}" data-search="${esc(`${e.title.zh} ${e.title.en} ${(e.tags || []).join(' ')} ${short(e.notes.zh, 80)} ${short(e.notes.en, 80)}`.toLowerCase())}">
    ${thumb}
    <div class="fx-top"><span class="fx-badge dm-model-badge">${esc(c.short)}</span><span class="fx-badge">${bi(esc(L.zh), esc(L.en))}</span><span class="fx-meta"><span>${esc(e.num)}</span></span></div>
    <h3><a href="${esc(playHref(e))}">${esc(e.title.zh)}</a></h3>
    <p>${bi(esc(short(e.notes.zh, 100)), esc(short(e.notes.en, 100)))}</p>
    <div class="fx-meta"><span><span class="fx-key">${bi('来源', 'Source')}</span> ${esc(e.model.name)}</span><span class="fx-sep"></span><span><span class="fx-key">${bi('许可', 'Licence')}</span> ${bi('未声明 · 仅外链', 'none · link only')}</span></div>
    <div class="fx-card-links"><a class="fx-source" href="${esc(playHref(e))}"><span data-zh>运行</span><span data-en>Run</span> &rarr;</a><a class="fx-source" href="${esc(e.sourceUrl)}" rel="noopener"><span data-zh>源码</span><span data-en>Source</span> &nearr;</a><a class="fx-source" href="${esc(e.promptUrl)}" rel="noopener"><span data-zh>prompt</span><span data-en>Prompt</span> &nearr;</a></div>
  </article>`;
}

function modelCard(c) {
  const es = c.entries || [];
  return `<a class="dm-model-card" href="${esc(modelHref(c))}">
    <span class="dm-model-kicker">${bi('模型合集', 'Model collection')}</span>
    <h2>${esc(c.name)}</h2>
    <p>${bi(`${es.length} 个 HTML 视觉研究；逐条给出原始 prompt、源码与发布页的外链。`, `${es.length} HTML visual studies, each with links to its original prompt, source and publication page.`)}</p>
    <div class="dm-model-strip">${es.slice(0, 4).map((e) => `<img src="${esc(e.thumbUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer" />`).join('')}</div>
    <span class="dm-model-go">${bi('打开合集', 'Open collection')} &rarr;</span>
  </a>`;
}

const filterUI = (prefix, showModels = true) => `<section class="dm-filter" aria-labelledby="${prefix}-title">
  <div class="dm-filter-head"><span id="${prefix}-title">${bi('筛选', 'Filter')}</span><span class="t-sm"><b id="${prefix}-count">${entries.length}</b> ${bi('条可见', 'shown')}</span></div>
  <label class="dm-search"><input id="${prefix}-q" type="search" aria-label="Search title, description or tags" placeholder="Search title, description or tags" autocomplete="off" /></label>
  <div class="dm-chips" id="${prefix}-cats" role="group" aria-label="Filter by type"><button type="button" class="dm-chip" data-v="all" aria-pressed="true">${bi('全部', 'All')}</button>${cats.map((k) => `<button type="button" class="dm-chip" data-v="${esc(k)}" aria-pressed="false">${bi(esc(catLabels(k).zh), esc(catLabels(k).en))}<em>${catCount(k)}</em></button>`).join('')}</div>
  ${showModels ? `<div class="dm-chips" id="${prefix}-models" role="group" aria-label="Filter by model"><button type="button" class="dm-chip" data-v="all" aria-pressed="true">${bi('两套合集', 'Both collections')}</button>${collections.map((c) => `<button type="button" class="dm-chip" data-v="${esc(c.id)}" aria-pressed="false">${esc(c.short)}<em>${modelCount(c.id)}</em></button>`).join('')}</div>` : ''}
</section>`;

const filterScript = (prefix, gridSel, withModel = true) => `<script>(function(){
var q=document.getElementById('${prefix}-q');var grid=document.querySelector('${gridSel}');if(!grid)return;
var cards=grid.querySelectorAll('.fx-card');var count=document.getElementById('${prefix}-count');
var catBox=document.getElementById('${prefix}-cats');var modelBox=document.getElementById('${prefix}-models');
var st={cat:'all',model:'all',q:''};
function setGroup(box,val){if(!box)return;var bs=box.querySelectorAll('.dm-chip');for(var i=0;i<bs.length;i++){bs[i].setAttribute('aria-pressed',bs[i].getAttribute('data-v')===val?'true':'false');}}
function apply(){var n=0;for(var i=0;i<cards.length;i++){var c=cards[i];var ok=(st.cat==='all'||c.getAttribute('data-cat')===st.cat)&&(st.model==='all'||c.getAttribute('data-model')===st.model)&&(!st.q||c.getAttribute('data-search').indexOf(st.q)>=0);c.hidden=!ok;if(ok)n++;}if(count)count.textContent=String(n);}
if(q){q.addEventListener('input',function(){st.q=this.value.toLowerCase().trim();apply();});}
function bind(box,key){if(!box)return;box.addEventListener('click',function(ev){var t=ev.target.closest?ev.target.closest('.dm-chip'):null;if(!t)return;st[key]=t.getAttribute('data-v');setGroup(box,st[key]);apply();});}
bind(catBox,'cat');bind(modelBox,'model');apply();
})();</script>`;

const stats = `<div class="dm-stats"><div><strong>${entries.length}</strong>${bi('个可运行作品', 'runnable pieces')}</div><div><strong>${collections.length}</strong>${bi('套模型合集', 'model collections')}</div><div><strong>${samePrompt}</strong>${bi('组严格同题', 'same-prompt pairs')}</div><div><strong class="fx-date">${esc(checked)}</strong>${bi('最近核验', 'latest check')}</div></div>`;

const indexBody = `<div class="container demos-page">
  <p class="kicker">${bi('能在本站打开 · 能看源码 · 能看原始 prompt', 'Runs here · source viewable · original prompt linked')}</p>
  <h1>${bi('作品演示', 'Playground')}</h1>
  <p class="dm-lead">${bi(`收录 ${entries.length} 个由不同模型生成的 HTML 视觉作品。每个都能在这里直接打开，旁边给出原始 prompt、源码和发布页的外链；不复制无许可文件，不排名，不把模型名当成已核验事实。`, `${entries.length} HTML visual studies generated by different models. Each opens here, with links to its original prompt, source and publication page; unlicensed files are not copied, nothing is ranked, and model names stay source-stated rather than independently verified.`)}</p>
  ${stats}
  <section class="dm-models" aria-labelledby="dm-models-title"><div class="dm-section-head"><h2 id="dm-models-title">${bi('按模型看', 'By model')}</h2><span class="t-sm">${bi('两套题不同；不要把它们当成同一题的两种答案', 'The prompt sets differ; do not read them as two answers to one prompt')}</span></div><div class="dm-model-grid">${collections.map((c) => modelCard(byCollection[c.id])).join('')}</div></section>
  <section class="dm-compare-cta"><div><h2>${bi('并排看两个模型', 'Put two models side by side')}</h2><p>${bi(`当前 ${samePrompt} 组严格同题。不同题时并排只作风格对照，页面会明确标注，不冒充同题。`, `${samePrompt} strict same-prompt pairs. When prompts differ, the side-by-side is a style comparison and the page says so; it never pretends to be a controlled pair.`)}</p></div><a class="dm-btn" href="compare.html">${bi('打开对照', 'Open comparison')} &rarr;</a></section>
  ${filterUI('dm')}
  <div class="fx-grid dm-grid" id="dm-grid">${entries.map((e) => card(e)).join('\n')}</div>
  <noscript><p class="t-sm">${bi('未开启脚本：筛选不可用，全部作品已在上方列出。', 'Without JavaScript the filter is unavailable; all pieces are listed above.')}</p></noscript>
  <section class="dm-note"><h2>${bi('这里说的“运行”是什么意思', 'What “run” means here')}</h2><p>${bi('HTML 在原始 GitHub Pages 上执行，本站播放器只负责把它放进一个受限的 iframe，不复制文件。源码按钮打开原始 HTML，prompt 按钮打开原始 txt；许可按钮会明确写“未声明”。', 'The HTML executes on the original GitHub Pages. Our player only places it in a restricted iframe and does not copy the file. Source opens the original HTML, prompt opens the original txt, and the licence label says “not declared”.')}</p></section>
</div>
${filterScript('dm', '#dm-grid')}`;

const modelBody = (c) => {
  const es = c.entries || [];
  return `<div class="container demos-page">
  <p class="kicker"><a href="index.html">${bi('← 返回作品演示', '← Back to Playground')}</a></p>
  <h1>${esc(c.name)}</h1>
  <p class="dm-lead">${bi(`${es.length} 个 HTML 视觉研究。模型名来自合集标题；本站没有独立核验模型版本，也没有复制源文件。`, `${es.length} HTML visual studies. The model name comes from the collection title; this site has not independently verified the model version and has not copied the source files.`)} <a href="${esc(repoOf(c))}" rel="noopener">${bi('原仓库', 'source repo')} &nearr;</a></p>
  <div class="dm-stats"><div><strong>${es.length}</strong>${bi('个作品', 'pieces')}</div><div><strong>${new Set(es.map((e) => e.category)).size}</strong>${bi('个类型', 'types')}</div><div><strong>${es.filter((e) => !e.license?.spdx).length}</strong>${bi('条未声明许可', 'no declared licence')}</div><div><strong class="fx-date">${esc(checked)}</strong>${bi('最近核验', 'latest check')}</div></div>
  <div class="fx-grid dm-grid">${es.map((e) => card(e)).join('\n')}</div>
</div>`;
};

const playBody = `<div class="container demos-page dm-play">
  <p class="kicker"><a href="index.html">${bi('← 返回作品演示', '← Back to Playground')}</a> <span class="dm-sep">/</span> <span>${bi('外部运行', 'external run')}</span></p>
  <div class="dm-play-head"><div><h1 id="dm-play-title">${bi('运行演示', 'Run a piece')}</h1><p id="dm-play-sub" class="dm-lead">${bi('正在载入作品信息…', 'Loading piece information…')}</p></div><div class="dm-play-actions"><a id="dm-open" class="dm-btn" href="#" rel="noopener">${bi('全屏打开原页', 'Open original')} &nearr;</a><button id="dm-random" class="dm-btn dm-btn-ghost" type="button">${bi('随便看一个', 'Random piece')}</button></div></div>
  <div class="dm-player"><iframe id="dm-frame" title="Run the piece" sandbox="allow-scripts" referrerpolicy="no-referrer" loading="eager"></iframe></div>
  <div class="dm-play-info">
    <div><h2>${bi('这是什么', 'What this is')}</h2><p id="dm-desc"></p><div id="dm-tags" class="dm-tags"></div></div>
    <div><h2>${bi('来源与权利', 'Source & rights')}</h2><p id="dm-licence" class="t-sm"></p><ul class="dm-links"><li><a id="dm-source" href="#" rel="noopener">${bi('原始 HTML', 'Original HTML')} &nearr;</a></li><li><a id="dm-prompt" href="#" rel="noopener">${bi('原始 prompt', 'Original prompt')} &nearr;</a></li><li><a id="dm-repo" href="#" rel="noopener">${bi('原仓库', 'Source repository')} &nearr;</a></li></ul></div>
  </div>
  <p class="dm-note-line">${bi('iframe 只允许 allow-scripts，不允许 same-origin、顶层跳转或读取本站 Cookie。页面若空白，通常是原作者页面禁止嵌入，请用“全屏打开原页”。', 'The iframe allows only allow-scripts: no same-origin, no top navigation, no access to this site’s cookies. If the page is blank, the original may block embedding; use “Open original”.')}</p>
</div>
<script>(function(){
var qs=new URLSearchParams(location.search);var id=qs.get('id');
fetch('demos-data.json').then(function(r){if(!r.ok)throw new Error('data');return r.json();}).then(function(data){
var map={};data.forEach(function(x){map[x.id]=x;});var e=map[id]||data[Math.floor(Math.random()*data.length)];
document.getElementById('dm-frame').src=e.demoUrl;document.getElementById('dm-play-title').textContent=e.title.zh;document.getElementById('dm-play-sub').textContent=e.title.en+' · '+e.model.name;document.title=e.title.zh+' · 运行演示 · Specul';
document.getElementById('dm-open').href=e.demoUrl;document.getElementById('dm-source').href=e.sourceUrl;document.getElementById('dm-prompt').href=e.promptUrl;document.getElementById('dm-repo').href=e.repoUrl;
document.getElementById('dm-desc').textContent=e.notes.zh;document.getElementById('dm-licence').textContent='许可：仓库未声明 LICENSE；页面仅在原始发布页运行，本站不复制文件。';
document.getElementById('dm-tags').innerHTML=(e.tags||[]).map(function(t){return '<span class="dm-tag">'+t+'</span>';}).join('');
document.getElementById('dm-random').onclick=function(){var n=data[Math.floor(Math.random()*data.length)];location.href='play.html?id='+encodeURIComponent(n.id);};
}).catch(function(){document.getElementById('dm-play-sub').textContent='载入失败：请通过本地静态服务器打开本页。';});
})();</script>`;

const compareBody = `<div class="container demos-page">
  <p class="kicker"><a href="index.html">${bi('← 返回作品演示', '← Back to Playground')}</a> <span class="dm-sep">/</span> <span>${bi('双模型对照', 'two-model comparison')}</span></p>
  <h1>${bi('并排看两个模型', 'Two models, side by side')}</h1>
  <p class="dm-lead">${bi(`两套合集一共 ${entries.length} 个作品；严格同题只有 ${samePrompt} 组。选任意两个作品并排，下面会说明它们是“同题”还是“不同题、只作风格对照”。`, `${entries.length} pieces across two collections; only ${samePrompt} strict same-prompt pairs. Pick any two pieces; the line below says whether they share a prompt or are a style comparison only.`)}</p>
  <div class="dm-compare-controls"><label>${bi('左边', 'Left')}<select id="dm-left"></select></label><button id="dm-swap" class="dm-btn dm-btn-ghost" type="button">${bi('交换', 'Swap')}</button><label>${bi('右边', 'Right')}<select id="dm-right"></select></label><span id="dm-same" class="dm-same"></span></div>
  <div class="dm-compare"><section class="dm-pane"><div class="dm-pane-head"><div><b id="dm-l-title"></b><small id="dm-l-sub"></small></div><a id="dm-l-open" href="#" rel="noopener"><span data-zh>全屏</span><span data-en>Full</span> &nearr;</a></div><iframe id="dm-l-frame" title="Left piece" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe><div class="dm-pane-links"><a id="dm-l-source" href="#" rel="noopener"><span data-zh>源码</span><span data-en>Source</span></a><a id="dm-l-prompt" href="#" rel="noopener"><span data-zh>prompt</span><span data-en>Prompt</span></a></div></section><section class="dm-pane"><div class="dm-pane-head"><div><b id="dm-r-title"></b><small id="dm-r-sub"></small></div><a id="dm-r-open" href="#" rel="noopener"><span data-zh>全屏</span><span data-en>Full</span> &nearr;</a></div><iframe id="dm-r-frame" title="Right piece" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe><div class="dm-pane-links"><a id="dm-r-source" href="#" rel="noopener"><span data-zh>源码</span><span data-en>Source</span></a><a id="dm-r-prompt" href="#" rel="noopener"><span data-zh>prompt</span><span data-en>Prompt</span></a></div></section></div>
  <p class="dm-note-line">${bi('“同题”按 prompt 文本哈希判断；不同题并排时，差异可能来自题目本身，不能当作模型能力结论。', '“Same prompt” is determined by the prompt-text hash. When prompts differ, the difference may come from the brief itself and cannot be read as a model-capability conclusion.')}</p>
</div>
<script>(function(){
var left=document.getElementById('dm-left'),right=document.getElementById('dm-right');var state={left:null,right:null,data:null};
function opt(e){return '<option value="'+e.id+'">'+e.model.name+' · '+e.num+' · '+e.title.zh.replace(/</g,'&lt;')+'</option>';}
function pane(side,e){var cap=side==='left'?'l':'r';document.getElementById('dm-'+cap+'-title').textContent=e.title.zh;document.getElementById('dm-'+cap+'-sub').textContent=e.title.en+' · '+e.model.name+' · '+e.category;document.getElementById('dm-'+cap+'-frame').src=e.demoUrl;document.getElementById('dm-'+cap+'-open').href=e.demoUrl;document.getElementById('dm-'+cap+'-source').href=e.sourceUrl;document.getElementById('dm-'+cap+'-prompt').href=e.promptUrl;state[side]=e;var a=state.left,b=state.right;var box=document.getElementById('dm-same');if(a&&b){box.textContent=a.promptHash===b.promptHash?'同题 · 可作受控对照':'不同题 · 仅作风格对照';box.className='dm-same '+(a.promptHash===b.promptHash?'is-same':'is-diff');}}
fetch('demos-data.json').then(function(r){return r.json();}).then(function(data){state.data=data;left.innerHTML=data.map(opt).join('');right.innerHTML=data.map(opt).join('');var qs=new URLSearchParams(location.search);var l=qs.get('left')||data[0].id;var r=qs.get('right')||data.find(function(x){return x.collection!==data[0].collection;}).id;left.value=l;right.value=r;left.onchange=function(){pane('left',data.find(function(x){return x.id===left.value;}));};right.onchange=function(){pane('right',data.find(function(x){return x.id===right.value;}));};document.getElementById('dm-swap').onclick=function(){var a=left.value,b=right.value;left.value=b;right.value=a;pane('left',data.find(function(x){return x.id===b;}));pane('right',data.find(function(x){return x.id===a;}));};pane('left',data.find(function(x){return x.id===l;}));pane('right',data.find(function(x){return x.id===r;}));}).catch(function(){document.getElementById('dm-same').textContent='载入失败：请通过本地静态服务器打开本页。';});
})();</script>`;

const promptsBody = `<div class="container demos-page">
  <p class="kicker"><a href="index.html">${bi('← 返回作品演示', '← Back to Playground')}</a> <span class="dm-sep">/</span> <span>${bi('提示词索引', 'prompt index')}</span></p>
  <h1>${bi('提示词索引', 'Prompt index')}</h1>
  <p class="dm-lead">${bi(`这里只放 ${entries.length} 条作品的题目索引：标题、模型、类型、作者自述，以及原始 prompt 的外链。本站不复制 prompt 全文；要复跑，请打开原仓的 txt。`, `${entries.length} briefs: title, model, type, author description and a link to the original prompt. This site does not copy the full prompt; open the txt in the source repo to reproduce.`)}</p>
  <section class="dm-filter" aria-labelledby="dm-prompt-title"><div class="dm-filter-head"><span id="dm-prompt-title">${bi('筛选题目', 'Filter briefs')}</span><span class="t-sm"><b id="dm-prompt-count">${entries.length}</b> ${bi('条可见', 'shown')}</span></div><label class="dm-search"><input id="dm-prompt-q" type="search" aria-label="Search briefs" placeholder="Search title, description or tags" autocomplete="off" /></label><div class="dm-chips" id="dm-prompt-cats" role="group">${['all'].concat(cats).map((k) => `<button type="button" class="dm-chip" data-v="${esc(k)}" aria-pressed="${k === 'all' ? 'true' : 'false'}">${k === 'all' ? bi('全部', 'All') : bi(esc(catLabels(k).zh), esc(catLabels(k).en))}<em>${k === 'all' ? entries.length : catCount(k)}</em></button>`).join('')}</div></section>
  <div class="dm-prompt-list" id="dm-prompt-grid">${entries.map((e) => `<article class="dm-prompt-card fx-card" data-cat="${esc(e.category)}" data-model="${esc(e.collection)}" data-search="${esc(`${e.title.zh} ${e.title.en} ${(e.tags || []).join(' ')} ${short(e.notes.zh, 90)} ${short(e.notes.en, 90)}`.toLowerCase())}"><div class="fx-top"><span class="fx-badge dm-model-badge">${esc(e.model.name)}</span><span class="fx-badge">${bi(esc(cat(e).zh), esc(cat(e).en))}</span></div><h3>${esc(e.title.zh)}</h3><p>${esc(short(e.notes.zh, 150))}</p><div class="fx-card-links"><a class="fx-source" href="${esc(e.promptUrl)}" rel="noopener">${bi('原始 prompt', 'Original prompt')} &nearr;</a><a class="fx-source" href="${esc(playHref(e))}">${bi('运行', 'Run')} &rarr;</a><a class="fx-source" href="${esc(e.sourceUrl)}" rel="noopener">${bi('源码', 'Source')} &nearr;</a></div></article>`).join('')}</div>
</div>
<script>(function(){var q=document.getElementById('dm-prompt-q');var box=document.getElementById('dm-prompt-cats');var grid=document.getElementById('dm-prompt-grid');var cards=grid.querySelectorAll('.fx-card');var count=document.getElementById('dm-prompt-count');var st={cat:'all',q:''};function apply(){var n=0;for(var i=0;i<cards.length;i++){var c=cards[i];var ok=(st.cat==='all'||c.getAttribute('data-cat')===st.cat)&&(!st.q||c.getAttribute('data-search').indexOf(st.q)>=0);c.hidden=!ok;if(ok)n++;}count.textContent=String(n);}if(q){q.oninput=function(){st.q=this.value.toLowerCase().trim();apply();};}if(box){box.onclick=function(ev){var t=ev.target.closest?ev.target.closest('.dm-chip'):null;if(!t)return;st.cat=t.getAttribute('data-v');var bs=box.querySelectorAll('.dm-chip');for(var i=0;i<bs.length;i++){bs[i].setAttribute('aria-pressed',bs[i].getAttribute('data-v')===st.cat?'true':'false');}apply();};}apply();})();</script>`;

const pages = [
  ['index.html', '作品演示 · Specul', '可运行的 AI 作品演示场：两套模型合集、176 个 HTML 视觉研究；站内直接打开，原始 prompt、源码与发布页并列，不排名、不复制无许可文件。', indexBody],
  ['compare.html', '双模型对照 · Specul', '把两套模型合集里的任意两个 HTML 作品并排打开；同题按 prompt 哈希判定，不同题明确标注为风格对照，不冒充模型能力结论。', compareBody],
  ['prompts.html', '提示词索引 · Specul', '176 个 HTML 视觉研究的题目索引：标题、模型、类型、作者自述与原始 prompt 外链；本站不复制 prompt 全文。', promptsBody],
  ['play.html', '运行演示 · Specul', '站内播放器：用受限 iframe 打开原始 GitHub Pages 上的 HTML 作品，并列出源码、prompt、仓库与许可状态。', playBody],
];
for (const c of collections) pages.push([modelHref(c), `${c.name} 合集 · Specul`, `${c.name} 的 ${modelCount(c.id)} 个 HTML 视觉研究合集：站内打开、源码与 prompt 外链；模型名来自合集自述，未独立核验。`, modelBody(byCollection[c.id])]);

fs.mkdirSync(OUT, { recursive: true });
for (const [file, title, desc, body] of pages) {
  const canonical = file === 'index.html' ? 'https://demos.specul.com/' : `https://demos.specul.com/${file}`;
  const jsonLd = { '@context': 'https://schema.org', '@type': file === 'play.html' ? 'WebPage' : 'CollectionPage', name: title, description: desc, url: canonical, isPartOf: { '@type': 'WebSite', name: 'Specul', url: 'https://specul.com/' } };
  fs.writeFileSync(path.join(OUT, file), shell({ current: 'demos', title, desc, canonical, body, repo: 'https://github.com/speculcom/ai-handbook', jsonLd, headExtra: '  <link rel="stylesheet" href="demos.css" />' }), 'utf8');
}
const compactEntries = entries.map((e) => ({
  id: e.id, collection: e.collection, num: e.num, slug: e.slug, title: e.title, notes: e.notes,
  category: e.category, tags: e.tags, promptHash: e.promptHash, promptUrl: e.promptUrl,
  sourceUrl: e.sourceUrl, demoUrl: e.demoUrl, thumbUrl: e.thumbUrl, repoUrl: e.repoUrl, model: e.model,
}));
fs.writeFileSync(path.join(OUT, 'demos-data.json'), JSON.stringify(compactEntries, null, 2), 'utf8');
fs.copyFileSync(path.join(SRC, 'css/demos.css'), path.join(OUT, 'demos.css'));
fs.copyFileSync(path.join(ROOT, '_sites/_template/site.css'), path.join(OUT, 'site.css'));
fs.writeFileSync(path.join(OUT, 'CNAME'), 'demos.specul.com\n');
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://demos.specul.com/sitemap.xml\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([f]) => `  <url><loc>https://demos.specul.com/${f === 'index.html' ? '' : f}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'llms.txt'), `# Specul 作品演示\n\n> 可运行的 AI 作品演示场；${entries.length} 个 HTML 作品，${collections.length} 套模型合集；站内只嵌入原发布页，不复制无许可文件。\n\n- [作品演示](https://demos.specul.com/)\n- [双模型对照](https://demos.specul.com/compare.html)\n- [提示词索引](https://demos.specul.com/prompts.html)\n${collections.map((c) => `- [${c.name} 合集](https://demos.specul.com/${modelHref(c)}) — ${modelCount(c.id)} 个作品`).join('\n')}\n`);
fs.writeFileSync(path.join(OUT, 'llms.en.txt'), `# Specul Playground\n\n> A runnable AI work playground: ${entries.length} HTML pieces across ${collections.length} model collections; the site embeds the original publication pages and does not copy unlicensed files.\n\n- [Playground](https://demos.specul.com/)\n- [Two-model comparison](https://demos.specul.com/compare.html)\n- [Prompt index](https://demos.specul.com/prompts.html)\n${collections.map((c) => `- [${c.name} collection](https://demos.specul.com/${modelHref(c)}) — ${modelCount(c.id)} pieces`).join('\n')}\n`);
console.log(`demos 构建：${entries.length} 条 · ${collections.length} 套合集 · ${pages.length} 页 · 同题 ${samePrompt} 组`);
