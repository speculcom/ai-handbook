/* demos.specul.com · 可运行作品演示站。
 *
 * 结构：
 *   index.html                 全部作品（用途 / 模型筛选）
 *   works/<id>.html            每件作品的独立页（站内播放 + 来源/源码/prompt/仓库）
 *   play.html?id=<demo>        旧通用播放器，保留为兼容入口
 *   compare.html               任意两件作品并排（同题时明确标注，不同题只作风格对照）
 *   prompts.html               提示词索引（只链原始 prompt，不复制全文）
 *
 * 口径：每件作品本身就是内容页；模型是筛选维度，来源只在该作品页标注。
 * 不再按来源组生成聚合页，也不在首页单列来源组。不排名；无 LICENSE 的仓只外链。
 */
import fs from 'node:fs';
import path from 'node:path';
import { shell, esc } from '../../../../../_sites/_template/shell.mjs';
import { bi, catLabels } from '../../../../../_sites/_template/mini-site-build.mjs';
import { vizFor } from '../../../shared/viz.mjs';

const ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..');
const SRC = path.join(ROOT, '_data/handbook/frontier/demos');
const OUT = path.join(SRC, 'site');
const entries = JSON.parse(fs.readFileSync(path.join(SRC, 'entries.json'), 'utf8'));
const CAT_ORDER = ['互动体验', '数据可视化', '内容与视觉', '工具与界面', '模型演示'];
const allCats = [...new Set(entries.map((e) => e.category))];
const cats = [...CAT_ORDER.filter((k) => allCats.includes(k)), ...allCats.filter((k) => !CAT_ORDER.includes(k))];
const seqById = new Map(entries.map((e, i) => [e.id, String(i + 1).padStart(3, '0')]));
const seq = (e) => seqById.get(e.id);
const modelKey = (name) => String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
/* 模型筛选按「完整模型名」分组；不再按来源组分组。
   Claude Fable 5.2 的 76 件与另一个来源子集的 10 件仍是同一个模型，合并为 86 件。 */
const modelGroups = (() => {
  const seen = new Map();
  for (const e of entries) {
    const name = e.model?.name || '—';
    if (!seen.has(name)) seen.set(name, { key: modelKey(name), name, nameZh: e.model?.nameZh || name, nameEn: e.model?.nameEn || name, count: 0 });
    seen.get(name).count++;
  }
  return [...seen.values()];
})();
const modelOf = (e) => modelGroups.find((m) => m.key === modelKey(e.model?.name)) || { key: modelKey(e.model?.name), name: e.model?.name || '—', nameZh: e.model?.nameZh || e.model?.name || '—', nameEn: e.model?.nameEn || e.model?.name || '—' };
/* 首页默认按模型轮换展示：每轮每个模型各取一件，避免单一来源的 100 件连续占满前几屏。
   编号与数据顺序不变，筛选、对比和作品页也不受影响。 */
const displayEntries = (() => {
  const buckets = modelGroups.map((m) => entries.filter((e) => modelKey(e.model?.name) === m.key));
  const out = [];
  let more = true;
  while (more) {
    more = false;
    for (const b of buckets) if (b.length) { out.push(b.shift()); more = true; }
  }
  return out;
})();
const samePrompt = [...new Set(entries.map((e) => e.promptHash))].filter((h) => entries.filter((e) => e.promptHash === h).length > 1).length;

const playHref = (e) => `play.html?id=${encodeURIComponent(e.id)}`;
const workHref = (e) => `works/${encodeURIComponent(e.id)}.html`;
const short = (s, n = 120) => (String(s || '').length > n ? `${String(s).slice(0, n - 1)}…` : String(s || ''));
const cat = (e) => catLabels(e.category || '');
const absUrl = (u) => (/^https?:\/\//i.test(String(u || '')) ? String(u) : `https://demos.specul.com/${String(u || '').replace(/^\/+/, '')}`);
const licenseSummary = (e) => {
  const text = e.license?.text || {};
  if (text.zh || text.en) return bi(esc(text.zh || ''), esc(text.en || ''));
  if (e.license?.kind === 'free-share') return bi('原素材免费使用、免费转发；禁止包装成付费课程或付费产品出售。', 'Free to use and share; selling it as a paid course or product is prohibited.');
  if (e.license?.kind === 'unknown-external-link') return bi('未逐件确认可再分发许可；本站只链回原作者页面，不复制文件。', 'Reuse permission has not been confirmed piece by piece; this site only links to the author’s page and does not copy files.');
  return bi('仓库未声明 LICENSE；作品只在原作者发布页运行，本站不复制文件。', 'The repository declares no licence; the work runs on the publisher’s page and is not copied here.');
};
const sourceLabel = (e) => ({ zh: e.sourceLabel?.zh || '原始 HTML', en: e.sourceLabel?.en || 'Original HTML' });
const promptLabel = (e) => ({ zh: e.promptLabel?.zh || '原始 prompt', en: e.promptLabel?.en || 'Original prompt' });
const repoLabel = (e) => ({ zh: e.repoLabel?.zh || '原仓库', en: e.repoLabel?.en || 'Source repository' });

function card(e) {
  const m = modelOf(e);
  const L = cat(e);
  const thumb = String(e.thumbUrl || '').replace(/^\/+/, '');
  return `<article class="fx-card dm-card" id="${esc(e.id)}" data-cat="${esc(e.category)}" data-model="${esc(m.key)}" data-summary-zh="${esc(short(e.notes.zh, 160))}" data-summary-en="${esc(short(e.notes.en, 160))}" data-search="${esc(`${e.title.zh} ${e.title.en} ${(e.tags || []).join(' ')} ${short(e.notes.zh, 80)} ${short(e.notes.en, 80)}`.toLowerCase())}">
    <a class="dm-thumb" href="${esc(workHref(e))}" aria-label="Open ${esc(e.title.en || e.title.zh)}"><img src="${esc(thumb)}" alt="${esc(e.title.zh)}" loading="lazy" referrerpolicy="no-referrer" /></a>
    <div class="dm-card-body">
      <div class="dm-card-meta"><span class="dm-card-cat">${bi(esc(L.zh), esc(L.en))}</span><span class="dm-card-num">${esc(seq(e))}</span></div>
      <h3><a href="${esc(workHref(e))}">${esc(e.title.zh)}</a></h3>
      <p class="dm-card-source">${bi(`模型：${m.nameZh || m.name}`, `Model: ${m.nameEn || m.name}`)}</p>
      <div class="dm-card-actions"><a class="dm-card-open" href="${esc(workHref(e))}">${bi('打开', 'Open')} <span aria-hidden="true">&rarr;</span></a><a href="${esc(e.sourceUrl)}" rel="noopener">${bi(esc(sourceLabel(e).zh), esc(sourceLabel(e).en))} &nearr;</a><a href="${esc(e.promptUrl)}" rel="noopener">${bi(esc(promptLabel(e).zh), esc(promptLabel(e).en))} &nearr;</a></div>
    </div>
  </article>`;
}

function filterUI(prefix, list, showModels = true) {
  const listCats = cats.filter((k) => list.some((e) => e.category === k));
  const total = list.length;
  const listModels = modelGroups
    .map((m) => ({ ...m, count: list.filter((e) => modelKey(e.model?.name) === m.key).length }))
    .filter((m) => m.count > 0);
  const scopeZh = showModels ? '按用途和模型筛选' : '按用途筛选';
  const scopeEn = showModels ? 'Filter by use and model' : 'Filter by use';
  return `<section class="dm-explore" aria-label="${scopeZh}" data-ui-aria-label-zh="${scopeZh}" data-ui-aria-label-en="${scopeEn}">
    <div class="dm-explore-top">
      <label class="dm-search"><input id="${prefix}-q" type="search" aria-label="搜索作品" data-ui-aria-label-zh="搜索作品" data-ui-aria-label-en="Search pieces" placeholder="搜索标题、标签或描述" data-ui-placeholder-zh="搜索标题、标签或描述" data-ui-placeholder-en="Search title, tags or description" autocomplete="off" /></label>
      <span class="dm-visible"><b id="${prefix}-count">${total}</b>${bi(' 件', ' items')}</span>
    </div>
    <div class="dm-filter-row"><span class="dm-filter-label">${bi('用途', 'Use')}</span><div class="dm-chips" id="${prefix}-cats" role="group" aria-label="按用途筛选" data-ui-aria-label-zh="按用途筛选" data-ui-aria-label-en="Filter by use"><button type="button" class="dm-chip" data-v="all" aria-pressed="true">${bi('全部', 'All')}<em>${total}</em></button>${listCats.map((k) => `<button type="button" class="dm-chip" data-v="${esc(k)}" aria-pressed="false">${bi(esc(catLabels(k).zh), esc(catLabels(k).en))}<em>${list.filter((e) => e.category === k).length}</em></button>`).join('')}</div></div>
    ${showModels ? `<div class="dm-filter-row"><span class="dm-filter-label">${bi('模型', 'Model')}</span><div class="dm-chips" id="${prefix}-models" role="group" aria-label="按模型筛选" data-ui-aria-label-zh="按模型筛选" data-ui-aria-label-en="Filter by model"><button type="button" class="dm-chip" data-v="all" aria-pressed="true">${bi('全部', 'All')}<em>${total}</em></button>${listModels.map((m) => `<button type="button" class="dm-chip" data-v="${esc(m.key)}" aria-pressed="false">${bi(esc(m.nameZh || m.name), esc(m.nameEn || m.name))}<em>${m.count}</em></button>`).join('')}</div></div><p class="dm-filter-note">${bi('模型按完整名称分组；每件作品的具体来源在作品页标注。', 'Models are grouped by full name; each piece’s source is noted on its own page.')}</p>` : ''}
  </section>`;
}

const filterScript = (prefix, gridSel, withModel = true) => `<script>(function(){
var q=document.getElementById('${prefix}-q');var grid=document.querySelector('${gridSel}');if(!grid)return;
var cards=grid.querySelectorAll('.fx-card');var count=document.getElementById('${prefix}-count');
var catBox=document.getElementById('${prefix}-cats');var modelBox=document.getElementById('${prefix}-models');
var st={cat:'all',model:'all',q:''};
function setGroup(box,val){if(!box)return;var bs=box.querySelectorAll('.dm-chip');for(var i=0;i<bs.length;i++){bs[i].setAttribute('aria-pressed',bs[i].getAttribute('data-v')===val?'true':'false');}}
function apply(){var n=0;for(var i=0;i<cards.length;i++){var c=cards[i];var ok=(st.cat==='all'||c.getAttribute('data-cat')===st.cat)&&(st.model==='all'||c.getAttribute('data-model')===st.model)&&(!st.q||c.getAttribute('data-search').indexOf(st.q)>=0);c.hidden=!ok;if(ok)n++;}if(count)count.textContent=String(n);}
if(q){q.addEventListener('input',function(){st.q=this.value.toLowerCase().trim();apply();});}
function bind(box,key){if(!box)return;box.addEventListener('click',function(ev){var t=ev.target.closest?ev.target.closest('.dm-chip'):null;if(!t)return;st[key]=t.getAttribute('data-v');setGroup(box,st[key]);apply();});}
bind(catBox,'cat');if(${withModel ? 'true' : 'false'})bind(modelBox,'model');apply();
})();</script>`;

const indexBody = `<div class="container demos-page">
  <header class="dm-hero">
    <p class="kicker">${bi('演示 · 网页作品', 'Playground · web pieces')}</p>
    <h1>${bi('这些网页作品，点开就能玩', 'Web pieces you can open and play')}</h1>
    <p class="dm-lead">${bi('能站内打开的直接看，不能嵌入的链回原作者。每件作品的模型、作者、原帖与源码都写在作品页上。', 'Play the ones that run here; the rest link back to the author. Each piece’s model, author, original post and source are noted on its own page.')}</p>
    <div class="dm-collection-links dm-hero-tools"><a class="dm-collection-link dm-collection-tool" href="compare.html">${bi('并排对照', 'Compare')} <span aria-hidden="true">&rarr;</span></a><a class="dm-collection-link dm-collection-tool" href="prompts.html">${bi('提示词索引', 'Prompts')} <span aria-hidden="true">&rarr;</span></a><a class="dm-collection-link dm-collection-tool" href="2026.html">${bi('2026 增补', '2026 patch')} <span aria-hidden="true">&rarr;</span></a></div>
  </header>
</div>
${vizFor('demos')}
<div class="container demos-page demos-results">
  ${filterUI('dm', entries)}
  <div class="fx-grid dm-grid" id="dm-grid">${displayEntries.map((e) => card(e)).join('\n')}</div>
  <p class="dm-footnote">${bi('默认顺序按模型轮换，让每个模型都出现在前面；编号仍是原始数据顺序。能在站内打开的就在站内看，不能嵌入的，链回原作者页面。未声明许可的作品不复制文件。', 'The default order rotates across models so every model appears near the front; the numbering still follows the source data. Playable pieces run here; pieces that cannot be embedded link back to the author. Unlicensed files are never copied.')}</p>
</div>
${filterScript('dm', '#dm-grid')}`;

const playBody = `<div class="container demos-page dm-play">
  <p class="kicker"><a href="index.html">${bi('← 全部作品', '← All pieces')}</a> <span class="dm-sep">/</span> <span>${bi('原页面运行', 'runs on the original page')}</span></p>
  <div class="dm-play-head"><div><h1 id="dm-play-title">${bi('打开作品', 'Open a piece')}</h1><p id="dm-play-sub" class="dm-lead">${bi('正在载入作品信息…', 'Loading piece information…')}</p></div><div class="dm-play-actions"><a id="dm-open" class="dm-btn" href="#" rel="noopener">${bi('全屏打开原页', 'Open original')} &nearr;</a><button id="dm-random" class="dm-btn dm-btn-ghost" type="button">${bi('随便看一个', 'Random piece')}</button></div></div>
  <div class="dm-player"><iframe id="dm-frame" title="Run the piece" sandbox="allow-scripts" referrerpolicy="no-referrer" loading="eager"></iframe></div>
  <div class="dm-play-info">
    <div><h2>${bi('这件作品', 'About this piece')}</h2><p id="dm-desc"></p><div id="dm-tags" class="dm-tags"></div></div>
    <div><h2>${bi('源码与 prompt', 'Source & prompt')}</h2><p id="dm-licence" class="t-sm"></p><ul class="dm-links"><li><a id="dm-source" href="#" rel="noopener">${bi('原始 HTML', 'Original HTML')} &nearr;</a></li><li><a id="dm-prompt" href="#" rel="noopener">${bi('原始 prompt', 'Original prompt')} &nearr;</a></li><li><a id="dm-repo" href="#" rel="noopener">${bi('原仓库', 'Source repository')} &nearr;</a></li></ul></div>
  </div>
  <p class="dm-note-line">${bi('作品在原作者的页面运行。如果画面空白，通常是对方禁止嵌入，点“全屏打开原页”。', 'The piece runs on the original author’s page. If it appears blank, embedding is likely blocked; use “Open original”.')}</p>
</div>
<script>(function(){
var qs=new URLSearchParams(location.search);var id=qs.get('id');
fetch('demos-data.json').then(function(r){if(!r.ok)throw new Error('data');return r.json();}).then(function(data){
var map={};data.forEach(function(x){map[x.id]=x;});var e=map[id]||data[Math.floor(Math.random()*data.length)];
document.getElementById('dm-frame').src=e.demoUrl;document.getElementById('dm-play-title').textContent=e.title.zh;document.getElementById('dm-play-sub').textContent=e.title.en+' · '+e.model.name;document.title=e.title.zh+' · 打开作品 · Specul';
document.getElementById('dm-open').href=e.demoUrl;document.getElementById('dm-source').href=e.sourceUrl;document.getElementById('dm-prompt').href=e.promptUrl;document.getElementById('dm-repo').href=e.repoUrl;
document.getElementById('dm-desc').textContent=e.notes.zh;document.getElementById('dm-licence').textContent=e.license&&e.license.text&&e.license.text.zh?e.license.text.zh:'许可信息见作品页。';
document.getElementById('dm-tags').innerHTML=(e.tags||[]).map(function(t){return '<span class="dm-tag">'+t+'</span>';}).join('');
document.getElementById('dm-random').onclick=function(){var n=data[Math.floor(Math.random()*data.length)];location.href='works/'+encodeURIComponent(n.id)+'.html';};
}).catch(function(){document.getElementById('dm-play-sub').textContent='载入失败：请通过本地静态服务器打开本页。';});
})();</script>`;

const workBody = (e) => {
  const m = modelOf(e);
  const L = cat(e);
  const index = seq(e);
  const localDemo = /^https?:\/\//i.test(String(e.demoUrl || '')) ? e.demoUrl : `../${String(e.demoUrl || '').replace(/^\/+/, '')}`;
  const openLabel = e.run?.status === 'embedded'
    ? bi('全屏打开作品', 'Open full screen')
    : bi('全屏打开原页', 'Open original');
  return `<div class="container demos-page dm-play dm-work">
  <p class="kicker"><a href="../index.html">${bi('← 全部作品', '← All pieces')}</a> <span class="dm-sep">/</span> <span>${bi(esc(L.zh), esc(L.en))}</span> <span class="dm-sep">/</span> <span>${esc(index)}</span></p>
  <div class="dm-play-head">
    <div>
      <div class="dm-card-meta"><span class="dm-card-cat">${bi(esc(L.zh), esc(L.en))}</span><span class="dm-card-num">${esc(index)} / ${entries.length}</span></div>
      <h1>${bi(esc(e.title.zh), esc(e.title.en))}</h1>
      <p class="dm-lead">${bi(`模型：${esc(m.nameZh || m.name)}。原始发布页、源码、prompt 与许可都在下方。`, `Model: ${esc(m.nameEn || m.name)}. Original publisher page, source, prompt and licence are below.`)}</p>
    </div>
    <div class="dm-play-actions">
      <a class="dm-btn" href="${esc(localDemo)}" rel="noopener">${openLabel} &nearr;</a>
      <a class="dm-btn dm-btn-ghost" href="../compare.html?left=${encodeURIComponent(e.id)}">${bi('并排看', 'Compare')} &rarr;</a>
    </div>
  </div>
  <div class="dm-player"><iframe title="${esc(e.title.en || e.title.zh)}" src="${esc(localDemo)}" sandbox="allow-scripts" referrerpolicy="no-referrer" loading="eager"></iframe></div>
  <p class="dm-note-line">${e.run?.status === 'embedded'
    ? bi('作品按原仓库许可由本站托管，在受限 iframe 中运行。', 'Hosted here under the source repository’s licence and running in a restricted iframe.')
    : bi('作品在原作者的页面运行。如果画面空白，通常是对方禁止嵌入，点“全屏打开原页”。', 'The piece runs on the original author’s page. If it appears blank, embedding is likely blocked; use “Open original”.')}</p>
  <div class="dm-play-info">
    <div><h2>${bi('这件作品', 'About this piece')}</h2><p>${bi(esc(e.notes.zh), esc(e.notes.en))}</p></div>
    <div><h2>${bi('来源与 prompt', 'Source & prompt')}</h2><p class="t-sm">${licenseSummary(e)}</p><ul class="dm-links"><li><a href="${esc(e.sourceUrl)}" rel="noopener">${bi(esc(sourceLabel(e).zh), esc(sourceLabel(e).en))} &nearr;</a></li><li><a href="${esc(e.promptUrl)}" rel="noopener">${bi(esc(promptLabel(e).zh), esc(promptLabel(e).en))} &nearr;</a></li><li><a href="${esc(e.repoUrl)}" rel="noopener">${bi(esc(repoLabel(e).zh), esc(repoLabel(e).en))} &nearr;</a></li></ul></div>
  </div>
</div>`;
};

const compareBody = `<div class="container demos-page">
  <p class="kicker"><a href="index.html">${bi('← 全部作品', '← All pieces')}</a> <span class="dm-sep">/</span> <span>${bi('并排对照', 'side by side')}</span></p>
  <h1>${bi('并排看两个作品', 'Two pieces, side by side')}</h1>
  <p class="dm-lead">${bi('左右各选一件。题目一样，就是同题对照；题目不一样，就只看两种处理方式。', 'Pick one piece on each side. Same brief means a controlled pair; different briefs mean a style comparison only.')}</p>
  <div class="dm-compare-controls"><label>${bi('左边', 'Left')}<select id="dm-left"></select></label><button id="dm-swap" class="dm-btn dm-btn-ghost" type="button">${bi('交换', 'Swap')}</button><label>${bi('右边', 'Right')}<select id="dm-right"></select></label><span id="dm-same" class="dm-same"></span></div>
  <div class="dm-compare"><section class="dm-pane"><div class="dm-pane-head"><div><b id="dm-l-title"></b><small id="dm-l-sub"></small></div><a id="dm-l-open" href="#" rel="noopener"><span data-zh>全屏</span><span data-en>Full</span> &nearr;</a></div><iframe id="dm-l-frame" title="Left piece" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe><div class="dm-pane-links"><a id="dm-l-work" href="#"><span data-zh>作品页</span><span data-en>Page</span></a><a id="dm-l-source" href="#" rel="noopener"><span data-zh>源码</span><span data-en>Source</span></a><a id="dm-l-prompt" href="#" rel="noopener"><span data-zh>prompt</span><span data-en>Prompt</span></a></div></section><section class="dm-pane"><div class="dm-pane-head"><div><b id="dm-r-title"></b><small id="dm-r-sub"></small></div><a id="dm-r-open" href="#" rel="noopener"><span data-zh>全屏</span><span data-en>Full</span> &nearr;</a></div><iframe id="dm-r-frame" title="Right piece" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe><div class="dm-pane-links"><a id="dm-r-work" href="#"><span data-zh>作品页</span><span data-en>Page</span></a><a id="dm-r-source" href="#" rel="noopener"><span data-zh>源码</span><span data-en>Source</span></a><a id="dm-r-prompt" href="#" rel="noopener"><span data-zh>prompt</span><span data-en>Prompt</span></a></div></section></div>
  <p class="dm-note-line">${bi('“同题”按 prompt 文本哈希判断；不同题并排时，差异可能来自题目本身，不能当作模型能力结论。', '“Same brief” is determined by the prompt-text hash. When briefs differ, the difference may come from the brief itself and is not a model-capability conclusion.')}</p>
</div>
<script>(function(){
var left=document.getElementById('dm-left'),right=document.getElementById('dm-right');var state={left:null,right:null,data:null};
function opt(e){return '<option value="'+e.id+'">'+e.seq+' · '+e.title.zh.replace(/</g,'&lt;')+' · '+e.model.name+'</option>';}
function pane(side,e){var cap=side==='left'?'l':'r';document.getElementById('dm-'+cap+'-title').textContent=e.title.zh;document.getElementById('dm-'+cap+'-sub').textContent=e.title.en+' · '+e.model.name+' · '+e.category;document.getElementById('dm-'+cap+'-frame').src=e.demoUrl;document.getElementById('dm-'+cap+'-open').href=e.demoUrl;document.getElementById('dm-'+cap+'-work').href='works/'+encodeURIComponent(e.id)+'.html';document.getElementById('dm-'+cap+'-source').href=e.sourceUrl;document.getElementById('dm-'+cap+'-prompt').href=e.promptUrl;state[side]=e;var a=state.left,b=state.right;var box=document.getElementById('dm-same');if(a&&b){box.textContent=a.promptHash===b.promptHash?'同题 · 可作受控对照':'不同题 · 仅作风格对照';box.className='dm-same '+(a.promptHash===b.promptHash?'is-same':'is-diff');}}
fetch('demos-data.json').then(function(r){return r.json();}).then(function(data){state.data=data;left.innerHTML=data.map(opt).join('');right.innerHTML=data.map(opt).join('');var qs=new URLSearchParams(location.search);var l=qs.get('left')||data[0].id;var r=qs.get('right')||data.find(function(x){return x.model&&x.model.name!==data[0].model.name;}).id;left.value=l;right.value=r;left.onchange=function(){pane('left',data.find(function(x){return x.id===left.value;}));};right.onchange=function(){pane('right',data.find(function(x){return x.id===right.value;}));};document.getElementById('dm-swap').onclick=function(){var a=left.value,b=right.value;left.value=b;right.value=a;pane('left',data.find(function(x){return x.id===b;}));pane('right',data.find(function(x){return x.id===a;}));};pane('left',data.find(function(x){return x.id===l;}));pane('right',data.find(function(x){return x.id===r;}));}).catch(function(){document.getElementById('dm-same').textContent='载入失败：请通过本地静态服务器打开本页。';});
})();</script>`;

const promptsBody = `<div class="container demos-page">
  <p class="kicker"><a href="index.html">${bi('← 全部作品', '← All pieces')}</a> <span class="dm-sep">/</span> <span>${bi('提示词索引', 'prompt index')}</span></p>
  <h1>${bi('提示词索引', 'Prompt index')}</h1>
  <p class="dm-lead">${bi(`${entries.length} 条题目的标题、用途和原始 prompt 链接。想复跑，打开原仓库的 txt。方法指南与 24 个可抄案例在 <a href="https://tools.specul.com/prompts/">工具站提示词库</a>。`, `${entries.length} briefs with title, use and a link to the original prompt. To reproduce, open the txt in the source repo. Method guides and 24 copyable cases live in the <a href="https://tools.specul.com/prompts/">tools prompt hub</a>.`)}</p>
  ${filterUI('dm-prompt', entries, false)}
  <div class="dm-prompt-list" id="dm-prompt-grid">${entries.map((e) => `<article class="dm-prompt-card fx-card" data-cat="${esc(e.category)}" data-model="${esc(modelKey(e.model?.name))}" data-search="${esc(`${e.title.zh} ${e.title.en} ${(e.tags || []).join(' ')} ${short(e.notes.zh, 90)} ${short(e.notes.en, 90)}`.toLowerCase())}"><div class="fx-top"><span class="fx-badge dm-model-badge">${esc(e.model.name)}</span><span class="fx-badge">${bi(esc(cat(e).zh), esc(cat(e).en))}</span><span class="fx-meta">${esc(seq(e))}</span></div><h3>${esc(e.title.zh)}</h3><div class="fx-card-links"><a class="fx-source" href="${esc(e.promptUrl)}" rel="noopener">${bi('原始 prompt', 'Original prompt')} &nearr;</a><a class="fx-source" href="${esc(workHref(e))}">${bi('打开', 'Open')} &rarr;</a><a class="fx-source" href="${esc(e.sourceUrl)}" rel="noopener">${bi('源码', 'Source')} &nearr;</a></div></article>`).join('')}</div>
  <p class="dm-footnote">${bi('这里只放题目索引和外链，不复制 prompt 全文。', 'This is an index and link list; full prompts are not copied here.')}</p>
</div>
${filterScript('dm-prompt', '#dm-prompt-grid', false)}`;

const pages = [
  ['index.html', '作品演示 · Specul', `${entries.length} 个 HTML 视觉研究：点开就能在站内看，附带原始 prompt、源码与发布页链接；按用途和模型筛选。`, indexBody],
  ['compare.html', '并排看两个作品 · Specul', '把两件 HTML 作品并排打开，左右各选一件；同题按 prompt 哈希判定，不同题明确标注为风格对照，不当作模型能力结论。', compareBody],
  ['prompts.html', '提示词索引 · Specul', `${entries.length} 个 HTML 视觉研究的题目索引：标题、用途与原始 prompt 外链；本站不复制 prompt 全文。`, promptsBody],
  ['play.html', '打开作品 · Specul', '站内播放器：用受限 iframe 打开原始 GitHub Pages 上的 HTML 作品，并列出源码、prompt、仓库与许可状态。', playBody],
];

fs.mkdirSync(OUT, { recursive: true });
/* 旧版按来源组生成的 <id>-<count>-html.html 已废弃；源数据可以留着，
   但这些聚合页不再属于站点。每次构建清掉，避免重新出现。 */
for (const f of fs.readdirSync(OUT)) {
  if (/-\d+-html\.html$/.test(f)) fs.unlinkSync(path.join(OUT, f));
}
for (const [file, title, desc, body] of pages) {
  const canonical = file === 'index.html' ? 'https://demos.specul.com/' : `https://demos.specul.com/${file}`;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description: desc, url: canonical, isPartOf: { '@type': 'WebSite', name: 'Specul', url: 'https://specul.com/' } };
  fs.writeFileSync(path.join(OUT, file), shell({ current: 'demos', title, desc, canonical, body, repo: 'https://github.com/speculcom/ai-handbook', jsonLd, headExtra: '  <link rel="stylesheet" href="demos.css" />' }), 'utf8');
}
const workDir = path.join(OUT, 'works');
fs.rmSync(workDir, { recursive: true, force: true });
fs.mkdirSync(workDir, { recursive: true });
for (const e of entries) {
  const m = modelOf(e);
  const file = workHref(e);
  const canonical = `https://demos.specul.com/${file}`;
  const title = `${short(e.title.zh, 56)} · Specul`;
  const desc = short(`${e.title.zh}：${e.notes.zh}`, 150);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: e.title.zh,
    alternateName: e.title.en,
    description: e.notes.zh,
    url: canonical,
    image: absUrl(e.thumbUrl),
    genre: e.category,
    creator: { '@type': 'Organization', name: m.name },
    isPartOf: { '@type': 'WebSite', name: 'Specul Playground', url: 'https://demos.specul.com/' },
    isAccessibleForFree: true,
  };
  fs.writeFileSync(path.join(OUT, file), shell({
    current: 'demos',
    title,
    desc,
    canonical,
    body: workBody(e),
    repo: 'https://github.com/speculcom/ai-handbook',
    jsonLd,
    headExtra: '  <link rel="stylesheet" href="../demos.css" />',
    assetPrefix: '../',
  }), 'utf8');
}
for (const f of ['releases.html', 'model-gpt-6-2-sol.html', 'model-claude-fable-5-2.html']) {
  const old = path.join(OUT, f);
  if (fs.existsSync(old)) fs.unlinkSync(old);
}
const compactEntries = entries.map((e) => ({
  id: e.id, seq: seq(e), collection: e.collection, num: e.num, slug: e.slug, title: e.title, notes: e.notes,
  category: e.category, tags: e.tags, promptHash: e.promptHash, promptUrl: e.promptUrl,
  sourceUrl: e.sourceUrl, demoUrl: /^https?:\/\//i.test(String(e.demoUrl || '')) ? e.demoUrl : String(e.demoUrl || '').replace(/^\/+/, ''), thumbUrl: String(e.thumbUrl || '').replace(/^\/+/, ''), repoUrl: e.repoUrl, model: e.model,
  sourceLabel: e.sourceLabel, promptLabel: e.promptLabel, license: e.license, run: e.run,
  workPath: workHref(e), workUrl: `https://demos.specul.com/${workHref(e)}`,
}));
fs.writeFileSync(path.join(OUT, 'demos-data.json'), JSON.stringify(compactEntries, null, 2), 'utf8');
fs.copyFileSync(path.join(SRC, 'css/demos.css'), path.join(OUT, 'demos.css'));
fs.copyFileSync(path.join(ROOT, '_sites/_template/site.css'), path.join(OUT, 'site.css'));
fs.writeFileSync(path.join(OUT, 'CNAME'), 'demos.specul.com\n');
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://demos.specul.com/sitemap.xml\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([f]) => `  <url><loc>https://demos.specul.com/${f === 'index.html' ? '' : f}</loc></url>`).join('\n')}\n  <url><loc>https://demos.specul.com/2026.html</loc></url>\n${entries.map((e) => `  <url><loc>https://demos.specul.com/${workHref(e)}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'llms.txt'), `# Specul 作品演示\n\n> ${entries.length} 个可打开的网页作品，来自 ${modelGroups.length} 个模型、${cats.length} 类用途；按原许可可托管的在站内运行，其余嵌入原发布页，未获许可的完整作品不复制。每件作品的来源、作者、原帖与源码只在该作品页标注。\n\n- [作品演示](https://demos.specul.com/)\n- [并排对照](https://demos.specul.com/compare.html)\n- [提示词索引](https://demos.specul.com/prompts.html)\n- [2026 增补](https://demos.specul.com/2026.html)\n`);
fs.writeFileSync(path.join(OUT, 'llms.en.txt'), `# Specul Playground\n\n> ${entries.length} openable web pieces from ${modelGroups.length} models and ${cats.length} uses. Pieces that can be hosted under their licence run here; the rest are iframed from the original page. Unlicensed full works are not copied. Each piece’s source, author, original post and source code are noted only on its own page.\n\n- [Playground](https://demos.specul.com/)\n- [Compare](https://demos.specul.com/compare.html)\n- [Prompt index](https://demos.specul.com/prompts.html)\n- [2026 patch](https://demos.specul.com/2026.html)\n`);
console.log(`demos 构建：${entries.length} 条 · ${modelGroups.length} 个模型 · ${pages.length} 个站页 + ${entries.length} 个作品页 · 同题 ${samePrompt} 组`);
