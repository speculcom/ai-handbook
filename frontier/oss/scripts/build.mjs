import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { shell } from '../../../../../_sites/_template/shell.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const site = path.join(root, 'site');
const ep = path.resolve(here, '../../../../../www.specul');
const cssVersion = createHash('sha1').update(fs.readFileSync(path.join(root, 'oss.css'))).digest('hex').slice(0, 8);

fs.mkdirSync(path.join(site, 'scenes'), { recursive: true });
fs.mkdirSync(path.join(site, 'repos'), { recursive: true });

const repoDoc = JSON.parse(fs.readFileSync(path.join(root, 'repos.json'), 'utf8'));
const scenes = JSON.parse(fs.readFileSync(path.join(root, 'scenes.json'), 'utf8')).sort((a, b) => a.order - b.order);
const snapshots = JSON.parse(fs.readFileSync(path.join(root, 'snapshots', '2026-11-20.json'), 'utf8'));

const TIER = {
  start: { zh: '先试这个', en: 'Start here' },
  prod: { zh: '生产可用', en: 'Production' },
  local: { zh: '本地优先', en: 'Local-first' },
  scale: { zh: '规模 / 性能', en: 'Scale / performance' },
  niche: { zh: '特定场景', en: 'Niche' },
  light: { zh: '轻量', en: 'Lightweight' }
};

const sceneById = Object.fromEntries(scenes.map((s) => [s.id, s]));

function inferLicense(tags = []) {
  const list = ['MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'GPL-3.0', 'AGPL-3.0', 'LGPL-3.0', 'MPL-2.0', 'ISC', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'ODC-By', 'ODbL'];
  for (const x of list) if (tags.includes(x)) return x;
  return '见仓库';
}
function licenseClass(license) {
  const l = String(license || '').toLowerCase();
  if (l.includes('agpl') || l.includes('gpl-3') || l.includes('gpl3')) return 'strong';
  if (l.includes('lgpl') || l.includes('mpl') || l.includes('cc-by-sa') || l.includes('odbl')) return 'weak';
  if (l.includes('mit') || l.includes('apache') || l.includes('bsd') || l.includes('isc') || l.includes('cc-by') || l.includes('odc-by')) return 'permissive';
  return 'other';
}
function fmtStars(n) {
  if (n == null) return '—';
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
/* 详情页 description 要落在 50–160 字符；摘要偏长时保留许可/语言/stars 这些硬信息，
   只在摘要尾部收断，避免整段被搜索引擎截掉。 */
function repoDesc(r) {
  const prefix = `${r.name}：`;
  const tail = ` 许可 ${r.license}，${r.language}，${fmtStars(r.stars)} stars（2026-11-20 快照）。`;
  const room = 160 - prefix.length - tail.length;
  let summary = String(r.summary || '').trim();
  if (summary.length > room) {
    let cut = summary.slice(0, Math.max(1, room - 1));
    cut = cut.replace(/\s+\S*$/, '').replace(/[A-Za-z0-9_./-]+$/, '').replace(/[，。；、,;：:\s]+$/, '');
    summary = `${cut}…`;
  }
  return prefix + summary + tail;
}
function dateOnly(d) { return d ? String(d).slice(0, 10) : '—'; }

const repos = repoDoc.repos.map((r) => {
  const meta = snapshots[`${r.owner}/${r.repo}`] || {};
  const license = meta.license || inferLicense(r.tags) || '见仓库';
  return {
    ...r,
    stars: meta.stars ?? null,
    forks: meta.forks ?? null,
    language: meta.language || '—',
    license,
    pushed: dateOnly(meta.pushed_at),
    archived: meta.archived === true,
    sceneTitle: sceneById[r.scene]?.title || r.scene,
    sceneTitleEn: sceneById[r.scene]?.titleEn || r.scene,
    tierLabel: TIER[r.tier]?.zh || r.tier,
    tierLabelEn: TIER[r.tier]?.en || r.tier
  };
});
const byId = Object.fromEntries(repos.map((r) => [r.id, r]));

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const bi = (zh, en) => `<span data-zh>${esc(zh)}</span><span data-en>${esc(en || zh)}</span>`;
const url = (p) => `https://oss.specul.com/${p}`;
const prefixFor = (depth) => '../'.repeat(depth);

function page({ title, desc, canonical, body, depth = 0, noindex = false }) {
  const prefix = prefixFor(depth);
  return shell({
    current: 'oss',
    title,
    desc,
    canonical,
    assetPrefix: prefix,
    headExtra: `<link rel="stylesheet" href="${prefix}oss.css?v=${cssVersion}" />${noindex ? '<meta name="robots" content="noindex" />' : ''}`,
    body
  });
}

function tierBadge(r) {
  return `<span class="badge tier-${esc(r.tier)}">${r.tierLabelEn ? bi(r.tierLabel, r.tierLabelEn) : esc(r.tierLabel)}</span>`;
}
function sceneBadge(r) {
  return `<span class="badge">${r.sceneTitleEn ? bi(r.sceneTitle, r.sceneTitleEn) : esc(r.sceneTitle)}</span>`;
}

function repoCard(r, prefix = '') {
  return `<article class="repo-card" data-id="${esc(r.id)}" data-scene="${esc(r.scene)}" data-lang="${esc(r.language)}" data-license="${esc(licenseClass(r.license))}" data-tier="${esc(r.tier)}" data-search="${esc((r.name + ' ' + r.summary + ' ' + r.tags.join(' ')).toLowerCase())}">
  <div class="repo-top">${sceneBadge(r)}${tierBadge(r)}</div>
  <h3 class="repo-name"><a href="${prefix}repos/${esc(r.id)}.html">${esc(r.name)}</a></h3>
  <p class="repo-owner">${esc(r.owner)} / ${esc(r.repo)}</p>
  <p>${r.summaryEn ? bi(r.summary, r.summaryEn) : esc(r.summary)}</p>
  <dl class="repo-facts">
    <div><dt>语言</dt><dd>${esc(r.language)}</dd></div>
    <div><dt>许可</dt><dd>${esc(r.license)}</dd></div>
    <div><dt>Stars</dt><dd>${esc(fmtStars(r.stars))}</dd></div>
    <div><dt>最近推送</dt><dd>${esc(r.pushed)}</dd></div>
  </dl>
  <a class="repo-link" href="${prefix}repos/${esc(r.id)}.html">看仓库卡 →</a>
</article>`;
}

function sceneCard(s) {
  const n = repos.filter((r) => r.scene === s.id && !r.catalogOnly).length;
  return `<a class="scene-card scene-${s.order}" href="scenes/${esc(s.id)}.html">
  <span class="no">0${s.order} · ${n} ${s.leadEn ? bi('个仓库', 'repos') : '个仓库'}</span>
  <h3>${s.leadEn ? bi(s.title, s.titleEn) : esc(s.title)}</h3>
  <p>${s.leadEn ? bi(s.lead, s.leadEn) : esc(s.lead)}</p>
  <span class="more">${s.leadEn ? bi('进入场景 →', 'Open scene →') : '进入场景 →'}</span>
</a>`;
}

// 首页
{
  const featuredIds = ['crewai', 'ragflow', 'ollama', 'comfyui', 'whisper', 'langfuse'];
  const featured = featuredIds.map((id) => byId[id]).filter(Boolean);
  const freshIds = ['openclaw', 'deepseek-harness', 'codex-cli', 'firecrawl'];
  const fresh = freshIds.map((id) => byId[id]).filter(Boolean);
  const body = `<div class="container">
<header class="site-hero">
  <h1>${bi('开源 AI', 'Open-source AI')}</h1>
  <p class="site-hero-deck">${bi(`${repos.length} 个仓库，按场景、许可和能不能自己跑筛。`, `${repos.length} repositories, filtered by scene, licence and whether you can run it yourself.`)}</p>
</header>
<form class="oss-search" action="all.html" method="get">
  <input type="search" name="q" placeholder="搜仓库：RAG、视频、语音、评测……" data-ui-placeholder-zh="搜仓库：RAG、视频、语音、评测……" data-ui-placeholder-en="Search repos: RAG, video, speech, evals…" aria-label="搜索开源仓库" data-ui-aria-label-zh="搜索开源仓库" data-ui-aria-label-en="Search open-source repositories" />
  <button type="submit">${bi('搜索', 'Search')}</button>
</form>
<div class="hero-actions">
  <a class="btn primary" href="all.html">看全部仓库 →</a>
  <a class="btn" href="compare.html">并排对比</a>
  <a class="btn" href="about.html">怎么挑仓库</a>
</div>
<div class="section-head"><h2>按场景找</h2><span class="sub">七个场景，挑一个你手上的活</span></div>
<div class="scene-grid">${scenes.map(sceneCard).join('')}</div>
<div class="section-head"><h2>先试这几个</h2><a href="all.html">看全部 →</a></div>
<div class="repo-grid">${featured.map((r) => repoCard(r)).join('')}</div>
<div class="section-head"><h2>2026 新上架</h2><span class="sub">star 多不等于适合你，先看权限与许可</span></div>
<div class="repo-grid">${fresh.map((r) => repoCard(r)).join('')}</div>
<div class="section-head"><h2>怎么用这个站</h2></div>
<div class="note"><b>1. 先看“不适合”：</b>每张卡都写它不做什么。比“为什么选”更能帮你排除。<br><b>2. 再看许可与依赖：</b>开源不等于可商用；GPL / AGPL 有传染性，模型与代码的许可要分开看。<br><b>3. 最后看活跃度：</b>star 是快照，不是质量保证；看最近推送、issue、release 与维护者。</div>
<div class="note"><b>说明：</b>GitHub 信息更新到 2026-11-20；许可以仓库 LICENSE 为准，商用前自己再读一遍。</div>
</div>`;
  fs.writeFileSync(path.join(site, 'index.html'), page({
    title: '开源 AI 工具库 — 自己拿下来跑 · Specul',
    desc: `${repos.length} 个 AI 开源仓库，按 Agent、RAG、本地推理、多模态、语音、评测、训练与微调 7 个场景整理；写清许可、活跃度、依赖、上手成本与“不适合”。`,
    canonical: url(''),
    body
  }));
}

// 全部
{
  const data = repos.map((r) => ({
    id: r.id, name: r.name, owner: r.owner, repo: r.repo, summary: r.summary,
    scene: r.scene, sceneTitle: r.sceneTitle, tier: r.tier, tierLabel: r.tierLabel,
    language: r.language, license: r.license, stars: r.stars, pushed: r.pushed,
    catalogOnly: r.catalogOnly, tags: r.tags
  }));
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  const langs = [...new Set(repos.map((r) => r.language).filter((x) => x && x !== '—'))].sort();
  const body = `<div class="container">
<header class="page-head">
  <p class="eyebrow">OSS · All repos</p>
  <h1>${bi('全部仓库', 'All repositories')}</h1>
  <p class="lede">${bi(`${repos.length} 个仓库，按场景、语言、许可与上手层筛。默认按场景顺序排，不按 star 排；star 只是快照。`, `${repos.length} repositories, filtered by scene, language, licence and onboarding level. Sorted by scene, not by stars; stars are only a snapshot.`)}</p>
</header>
<div class="filters">
  <input id="q" type="search" placeholder="搜名称、用途、标签" data-ui-placeholder-zh="搜名称、用途、标签" data-ui-placeholder-en="Search name, use or tag" aria-label="搜索" data-ui-aria-label-zh="搜索" data-ui-aria-label-en="Search" />
  <select id="scene" aria-label="场景" data-ui-aria-label-zh="场景" data-ui-aria-label-en="Scene"><option value="" data-ui-text-zh="全部场景" data-ui-text-en="All scenes">全部场景</option>${scenes.map((s) => `<option value="${esc(s.id)}" data-ui-text-zh="${esc(s.title)}" data-ui-text-en="${esc(s.titleEn)}">${esc(s.title)}</option>`).join('')}</select>
  <select id="lang" aria-label="语言" data-ui-aria-label-zh="语言" data-ui-aria-label-en="Language"><option value="" data-ui-text-zh="全部语言" data-ui-text-en="All languages">全部语言</option>${langs.map((l) => `<option value="${esc(l)}">${esc(l)}</option>`).join('')}</select>
  <select id="license" aria-label="许可" data-ui-aria-label-zh="许可" data-ui-aria-label-en="Licence"><option value="" data-ui-text-zh="全部许可" data-ui-text-en="All licences">全部许可</option><option value="permissive" data-ui-text-zh="宽松（MIT / Apache / BSD）" data-ui-text-en="Permissive (MIT / Apache / BSD)">宽松（MIT / Apache / BSD）</option><option value="weak" data-ui-text-zh="弱 copyleft（LGPL / MPL / CC-BY-SA）" data-ui-text-en="Weak copyleft (LGPL / MPL / CC-BY-SA)">弱 copyleft（LGPL / MPL / CC-BY-SA）</option><option value="strong" data-ui-text-zh="强 copyleft（GPL / AGPL）" data-ui-text-en="Strong copyleft (GPL / AGPL)">强 copyleft（GPL / AGPL）</option><option value="other" data-ui-text-zh="其他 / 见仓库" data-ui-text-en="Other / see repository">其他 / 见仓库</option></select>
  <select id="tier" aria-label="上手层" data-ui-aria-label-zh="上手层" data-ui-aria-label-en="Onboarding level"><option value="" data-ui-text-zh="全部上手层" data-ui-text-en="All onboarding levels">全部上手层</option>${Object.entries(TIER).map(([k, v]) => `<option value="${esc(k)}" data-ui-text-zh="${esc(v.zh)}" data-ui-text-en="${esc(v.en)}">${esc(v.zh)}</option>`).join('')}</select>
  <span class="count" id="count">${bi(`${repos.length} 个`, `${repos.length} repos`)}</span>
</div>
<div class="repo-grid" id="grid">${repos.map((r) => repoCard(r)).join('')}</div>
<div class="empty" id="empty" hidden>${bi('没有匹配的仓库。换个关键词，或清掉筛选。', 'No matching repositories. Try another keyword or clear the filters.')}</div>
</div>
<script>window.OSS_DATA=${json};</script>
<script>
(function(){
  const data=window.OSS_DATA;
  const q=document.getElementById('q'), scene=document.getElementById('scene'), lang=document.getElementById('lang'), license=document.getElementById('license'), tier=document.getElementById('tier');
  const count=document.getElementById('count'), grid=document.getElementById('grid'), empty=document.getElementById('empty');
  const params=new URLSearchParams(location.search);
  q.value=params.get('q')||''; scene.value=params.get('scene')||'';
  function apply(){
    const term=q.value.trim().toLowerCase(); let n=0;
    for(const el of grid.children){
      const ok=(!term||el.dataset.search.includes(term))&&(!scene.value||el.dataset.scene===scene.value)&&(!lang.value||el.dataset.lang===lang.value)&&(!license.value||el.dataset.license===license.value)&&(!tier.value||el.dataset.tier===tier.value);
      el.hidden=!ok; if(ok)n++;
    }
    count.textContent=n+' 个'; empty.hidden=n>0;
  }
  [q,scene,lang,license,tier].forEach(x=>x.addEventListener('input',apply));
  apply();
})();
</script>`;
  fs.writeFileSync(path.join(site, 'all.html'), page({
    title: '全部开源仓库 · 开源 AI 工具库',
    desc: `${repos.length} 个 AI 开源仓库，按场景、语言、许可与上手层筛选；不按 star 排名，每张卡写清适用与不适合。`,
    canonical: url('all.html'),
    body
  }));
}

// 场景页
for (const s of scenes) {
  const list = repos.filter((r) => r.scene === s.id && !r.catalogOnly).sort((a, b) => a.order - b.order);
  const isBi = !!s.leadEn;
  const body = `<div class="container">
<header class="page-head">
  <p class="eyebrow">OSS · Scene 0${s.order}</p>
  <h1>${isBi ? bi(s.title, s.titleEn) : esc(s.title)}</h1>
  <p class="lede">${isBi ? bi(s.lead, s.leadEn) : esc(s.lead)}</p>
</header>
<div class="hero-actions">
  <a class="btn primary" href="../all.html?scene=${esc(s.id)}">${isBi ? bi('看这个场景的全部 →', 'See all in this scene →') : '看这个场景的全部 →'}</a>
  <a class="btn" href="../compare.html?ids=${esc(list.slice(0, 3).map((r) => r.id).join(','))}">${isBi ? bi('并排对比前 3 个', 'Compare first 3') : '并排对比前 3 个'}</a>
  <a class="btn" href="../index.html">${isBi ? bi('回首页', 'Home') : '回首页'}</a>
</div>
<div class="stats"><div><b>${list.length}</b><span>${isBi ? bi('个场景精选', 'selected repos') : '个场景精选'}</span></div><div><b>${isBi ? bi(s.who, s.whoEn) : esc(s.who)}</b><span>${isBi ? bi('适合谁', 'Who it is for') : '适合谁'}</span></div></div>
<div class="section-head"><h2>${isBi ? bi('怎么选', 'How to choose') : '怎么选'}</h2></div>
<div class="note">${s.choose.map((x, i) => `• ${isBi ? bi(x, s.chooseEn?.[i]) : esc(x)}`).join('<br>')}<br><b>${isBi ? bi('不适合：', 'Not for: ') : '不适合：'}</b>${isBi ? bi(s.notFor, s.notForEn) : esc(s.notFor)}</div>
<div class="section-head"><h2>${list.length} ${isBi ? bi('个仓库', 'repos') : '个仓库'}</h2><span class="sub">${isBi ? bi('按上手顺序，不是按 star', 'Ordered by onboarding, not stars') : '按上手顺序，不是按 star'}</span></div>
<div class="repo-grid">${list.map((r) => repoCard(r, '../')).join('')}</div>
<div class="section-head"><h2>并排看</h2><span class="sub">许可、语言、活跃度、适合 / 不适合</span></div>
<div class="compare-wrap"><table class="compare-table"><thead><tr><th>字段</th>${list.map((r) => `<th><a href="../repos/${esc(r.id)}.html">${esc(r.name)}</a></th>`).join('')}</tr></thead><tbody>
<tr><td>上手层</td>${list.map((r) => `<td>${esc(r.tierLabel)}</td>`).join('')}</tr>
<tr><td>语言</td>${list.map((r) => `<td>${esc(r.language)}</td>`).join('')}</tr>
<tr><td>许可</td>${list.map((r) => `<td>${esc(r.license)}</td>`).join('')}</tr>
<tr><td>Stars</td>${list.map((r) => `<td>${esc(fmtStars(r.stars))}</td>`).join('')}</tr>
<tr><td>最近推送</td>${list.map((r) => `<td>${esc(r.pushed)}</td>`).join('')}</tr>
<tr><td>适合</td>${list.map((r) => `<td>${esc(r.why[0] || '')}</td>`).join('')}</tr>
<tr><td>不适合</td>${list.map((r) => `<td>${esc(r.notFor[0] || '')}</td>`).join('')}</tr>
</tbody></table></div>
</div>`;
  fs.writeFileSync(path.join(site, 'scenes', `${s.id}.html`), page({
    title: `${s.title} · 开源 AI 工具库`,
    desc: `${s.title}：${s.lead} 收录 ${list.length} 个开源仓库，写清许可、活跃度、适合与不适合。`,
    canonical: url(`scenes/${s.id}.html`),
    depth: 1,
    body
  }));
}

// 仓库详情
for (const r of repos) {
  const alt = (r.alternatives || []).map((id) => byId[id]).filter(Boolean);
  if (r.summaryEn) {
    const body = `<div class="container">
<header class="detail-hero">
  <div class="top">${sceneBadge(r)}${tierBadge(r)}</div>
  <h1>${esc(r.name)}</h1>
  <p class="owner">${esc(r.owner)} / ${esc(r.repo)}</p>
  <p class="sub">${bi(r.summary, r.summaryEn)}</p>
</header>
<div class="factbar">
  <span><b>${esc(fmtStars(r.stars))}</b> stars</span>
  <span><b>${esc(r.forks == null ? '—' : r.forks)}</b> forks</span>
  <span><b>${esc(r.language)}</b> ${bi('语言', 'Language')}</span>
  <span><b>${esc(r.license)}</b> ${bi('许可', 'License')}</span>
  <span>${bi('最近推送', 'Last push')} <b>${esc(r.pushed)}</b></span>
</div>
<div class="detail-body">
  <h2>${bi('为什么选', 'Why choose it')}</h2>
  <ul>${r.why.map((x, i) => `<li>${bi(x, r.whyEn?.[i])}</li>`).join('')}</ul>
  <h2>${bi('不适合', 'Not for')}</h2>
  <p class="warn">${r.notFor.map((x, i) => bi(x, r.notForEn?.[i])).join('<br>')}</p>
  <h2>${bi('最小上手', 'Minimum setup')}</h2>
  <ol>${(r.firstRun || []).map((x, i) => `<li>${bi(x, r.firstRunEn?.[i])}</li>`).join('')}</ol>
  <h2>${bi('依赖与成本', 'Dependencies and cost')}</h2>
  <p>${bi(r.deps || '按 README 核对运行时、模型权重与外部服务依赖。', r.depsEn || 'Check runtime, model weights and external service dependencies in the README.')}</p>
  <h2>${bi('许可与使用边界', 'License and usage boundaries')}</h2>
  <p>${bi(r.licenseNote || `代码许可为 ${r.license}；模型权重、训练数据与生成内容可能另有条款，商用前逐项核对。`, r.licenseNoteEn || `Code is ${r.license}; model weights, training data and generated content may have separate terms — check each before commercial use.`)}</p>
  <p>${bi('开源不等于可商用：GPL / AGPL 有传染性；代码许可、模型许可、生成内容许可要分开看。上线前读仓库 LICENSE 与模型卡，必要时让法务确认。', 'Open source is not automatically commercial-use friendly: GPL / AGPL are copyleft; code, model and output licenses are separate. Read the LICENSE and model card before launch, and involve legal when needed.')}</p>
  <h2>${bi('替代与相邻', 'Alternatives and neighbors')}</h2>
  ${alt.length ? `<ul>${alt.map((a) => `<li><a href="../repos/${esc(a.id)}.html">${esc(a.name)}</a> — ${a.tierLabelEn ? bi(a.tierLabel, a.tierLabelEn) : esc(a.tierLabel)}，${a.summaryEn ? bi(a.summary, a.summaryEn) : esc(a.summary)}</li>`).join('')}</ul>` : `<p>${bi('暂无同场景替代卡。', 'No alternative cards in this scene yet.')}</p>`}
  <h2>${bi('下一步', 'Next steps')}</h2>
  <ul>
    <li>${bi('打开 GitHub，先读 README、LICENSE、最近 release 与 issue。', 'Open GitHub and read the README, LICENSE, latest release and issues first.')}</li>
    <li>${bi('按“部署依赖 / 显存 / 数据 / 网络 / 权限”列一张上手清单。', 'Make an onboarding checklist for deployment dependencies, VRAM, data, network and permissions.')}</li>
    <li>${bi('用一个小样本跑通，再决定是否进生产；不要直接上生产数据。', 'Run a small sample first, then decide on production; never start with production data.')}</li>
  </ul>
  <p><a class="btn" href="${esc(r.url)}" target="_blank" rel="noopener">${bi('GitHub 仓库 ↗', 'GitHub repository ↗')}</a> <a class="btn" href="${esc(r.docs)}" target="_blank" rel="noopener">${bi('文档 ↗', 'Docs ↗')}</a> <a class="btn" href="../compare.html?ids=${esc(r.id)}">${bi('加入对比', 'Add to compare')}</a></p>
</div>
<div class="note">${bi('快照口径：stars / forks / language / license / pushed_at 来自 GitHub API 2026-11-20 快照；之后的变化没有回写。标签与“适合 / 不适合”是编辑判断，不是 GitHub 元数据。', 'Snapshot: stars / forks / language / license / pushed_at come from the GitHub API snapshot on 2026-11-20; later changes are not written back. Tags and “fit / not fit” are editorial judgments, not GitHub metadata.')}</div>
<div class="note">${bi('不背书：本站只做索引与风险提示，不审计代码、不保证安全、不替你做许可判断。仓库脚本与模型权重请自行审查。', 'No endorsement: this site only indexes and flags risks; it does not audit code, guarantee security or make license decisions for you. Review repository scripts and model weights yourself.')}</div>
</div>`;
    fs.writeFileSync(path.join(site, 'repos', `${r.id}.html`), page({
      title: `${r.name} · 开源 AI 工具库`,
      desc: repoDesc(r),
      canonical: url(`repos/${r.id}.html`),
      depth: 1,
      body
    }));
    continue;
  }
  const body = `<div class="container">
<header class="detail-hero">
  <div class="top">${sceneBadge(r)}${tierBadge(r)}${r.catalogOnly ? '<span class="badge">目录补充</span>' : ''}${r.archived ? '<span class="badge">已归档</span>' : ''}</div>
  <h1>${esc(r.name)}</h1>
  <p class="owner">${esc(r.owner)} / ${esc(r.repo)}</p>
  <p class="sub">${esc(r.summary)}</p>
</header>
<div class="factbar">
  <span><b>${esc(fmtStars(r.stars))}</b> stars</span>
  <span><b>${esc(r.forks == null ? '—' : r.forks)}</b> forks</span>
  <span><b>${esc(r.language)}</b> 语言</span>
  <span><b>${esc(r.license)}</b> 许可</span>
  <span>最近推送 <b>${esc(r.pushed)}</b></span>
</div>
<div class="detail-body">
  <h2>为什么选</h2>
  <ul>${r.why.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
  <h2>不适合</h2>
  <p class="warn">${r.notFor.map((x) => esc(x)).join('<br>')}</p>
  <h2>最小上手</h2>
  <ol>${(r.firstRun || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ol>
  <h2>依赖与成本</h2>
  <p>${esc(r.deps || '按 README 核对运行时、模型权重与外部服务依赖。')}</p>
  <h2>许可与使用边界</h2>
  <p>${esc(r.licenseNote || `代码许可为 ${r.license}；模型权重、训练数据与生成内容可能另有条款，商用前逐项核对。`)}</p>
  <p>开源不等于可商用：GPL / AGPL 有传染性；代码许可、模型许可、生成内容许可要分开看。上线前读仓库 LICENSE 与模型卡，必要时让法务确认。</p>
  <h2>替代与相邻</h2>
  ${alt.length ? `<ul>${alt.map((a) => `<li><a href="../repos/${esc(a.id)}.html">${esc(a.name)}</a> — ${esc(a.tierLabel)}，${esc(a.summary)}</li>`).join('')}</ul>` : '<p>暂无同场景替代卡。</p>'}
  <h2>下一步</h2>
  <ul>
    <li>打开 GitHub，先读 README、LICENSE、最近 release 与 issue。</li>
    <li>按“部署依赖 / 显存 / 数据 / 网络 / 权限”列一张上手清单。</li>
    <li>用一个小样本跑通，再决定是否进生产；不要直接上生产数据。</li>
  </ul>
  <p><a class="btn" href="${esc(r.url)}" target="_blank" rel="noopener">GitHub 仓库 ↗</a> <a class="btn" href="${esc(r.docs)}" target="_blank" rel="noopener">文档 ↗</a> <a class="btn" href="../compare.html?ids=${esc(r.id)}">加入对比</a></p>
</div>
<div class="note"><b>快照口径：</b>stars / forks / language / license / pushed_at 来自 GitHub API 2026-11-20 快照；之后的变化没有回写。标签与“适合 / 不适合”是编辑判断，不是 GitHub 元数据。</div>
<div class="note"><b>不背书：</b>本站只做索引与风险提示，不审计代码、不保证安全、不替你做许可判断。仓库脚本与模型权重请自行审查。</div>
</div>`;
  fs.writeFileSync(path.join(site, 'repos', `${r.id}.html`), page({
    title: `${r.name} · 开源 AI 工具库`,
    desc: `${r.name}：${r.summary} 许可 ${r.license}，${r.language}，${fmtStars(r.stars)} stars（2026-11-20 快照）。`,
    canonical: url(`repos/${r.id}.html`),
    depth: 1,
    body
  }));
}

// 对比页
{
  const defaultIds = ['langgraph', 'ragflow', 'ollama'];
  const defaultRepos = defaultIds.map((id) => byId[id]);
  const table = (list) => `<div class="compare-wrap"><table class="compare-table"><thead><tr><th>字段</th>${list.map((r) => `<th><a href="repos/${esc(r.id)}.html">${esc(r.name)}</a></th>`).join('')}</tr></thead><tbody>
<tr><td>场景</td>${list.map((r) => `<td>${esc(r.sceneTitle)}</td>`).join('')}</tr>
<tr><td>上手层</td>${list.map((r) => `<td>${esc(r.tierLabel)}</td>`).join('')}</tr>
<tr><td>语言</td>${list.map((r) => `<td>${esc(r.language)}</td>`).join('')}</tr>
<tr><td>许可</td>${list.map((r) => `<td>${esc(r.license)}</td>`).join('')}</tr>
<tr><td>Stars</td>${list.map((r) => `<td>${esc(fmtStars(r.stars))}</td>`).join('')}</tr>
<tr><td>最近推送</td>${list.map((r) => `<td>${esc(r.pushed)}</td>`).join('')}</tr>
<tr><td>适合</td>${list.map((r) => `<td>${esc(r.why[0] || '')}</td>`).join('')}</tr>
<tr><td>不适合</td>${list.map((r) => `<td>${esc(r.notFor[0] || '')}</td>`).join('')}</tr>
</tbody></table></div>`;
  const body = `<div class="container">
<header class="page-head">
  <p class="eyebrow">OSS · Compare</p>
  <h1>${bi('并排对比', 'Compare side by side')}</h1>
  <p class="lede">${bi('选 2–7 个仓库，并排看场景、上手层、语言、许可、活跃度、适合与不适合。对比不生成总分，也不推荐“最佳”。', 'Choose 2–7 repositories and compare scene, onboarding level, language, licence, activity, fit and non-fit. No total score and no “best” recommendation.')}</p>
</header>
<div class="compare-controls" id="controls">
${Array.from({ length: 7 }, (_, i) => `<label>${bi(`位置 ${i + 1}`, `Slot ${i + 1}`)}<select data-slot="${i}"><option value="" data-ui-text-zh="不选" data-ui-text-en="None">不选</option>${repos.map((r) => `<option value="${esc(r.id)}"${defaultIds[i] === r.id ? ' selected' : ''} data-ui-text-zh="${esc(r.name)} · ${esc(r.sceneTitle)}" data-ui-text-en="${esc(r.name)} · ${esc(sceneById[r.scene]?.titleEn || r.sceneTitle)}">${esc(r.name)} · ${esc(r.sceneTitle)}</option>`).join('')}</select></label>`).join('')}
</div>
<div id="compare-table">${table(defaultRepos)}</div>
<div class="empty" id="compare-empty" hidden>${bi('至少选 2 个仓库，最多 7 个。', 'Choose at least 2 and at most 7 repositories.')}</div>
<div class="note"><b>${bi('怎么读：', 'How to read: ')}</b>${bi('先排除“不适合”与许可不合适的；再比上手层与依赖；最后看最近推送。star 只是快照，不是质量保证。', 'First exclude options whose “not for” or licence does not fit; then compare onboarding level and dependencies; finally check recent pushes. Stars are a snapshot, not a quality guarantee.')}</div>
</div>
<script>
(function(){
  const REPOS=${JSON.stringify(repos.map((r) => ({ id: r.id, name: r.name, sceneTitle: r.sceneTitle, tierLabel: r.tierLabel, language: r.language, license: r.license, stars: r.stars == null ? null : r.stars, pushed: r.pushed, why: r.why[0] || '', notFor: r.notFor[0] || '' }))).replace(/</g, '\\u003c')};
  const selects=[...document.querySelectorAll('#controls select')];
  const table=document.getElementById('compare-table'), empty=document.getElementById('compare-empty');
  const params=new URLSearchParams(location.search); const ids=(params.get('ids')||'').split(',').filter(Boolean).slice(0,7);
  ids.forEach((id,i)=>{ if(selects[i]) selects[i].value=id; });
  function fmt(n){ if(n==null) return '—'; return n>=1000?(n/1000).toFixed(1)+'k':String(n); }
  function render(){
    const list=selects.map(s=>REPOS.find(r=>r.id===s.value)).filter(Boolean);
    empty.hidden=list.length>=2;
    if(list.length<2){ table.innerHTML=''; return; }
    const rows=[['场景',r=>r.sceneTitle],['上手层',r=>r.tierLabel],['语言',r=>r.language],['许可',r=>r.license],['Stars',r=>fmt(r.stars)],['最近推送',r=>r.pushed],['适合',r=>r.why],['不适合',r=>r.notFor]];
    table.innerHTML='<div class="compare-wrap"><table class="compare-table"><thead><tr><th>字段</th>'+list.map(r=>'<th><a href="repos/'+r.id+'.html">'+r.name+'</a></th>').join('')+'</tr></thead><tbody>'+rows.map(([label,fn])=>'<tr><td>'+label+'</td>'+list.map(r=>'<td>'+String(fn(r)).replace(/</g,'&lt;')+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  }
  selects.forEach(s=>s.addEventListener('change',render));
  render();
})();
</script>`;
  fs.writeFileSync(path.join(site, 'compare.html'), page({
    title: '并排对比 · 开源 AI 工具库',
    desc: '选 2–7 个开源仓库并排对比：场景、上手层、语言、许可、活跃度、适合与不适合；不生成总分，每个字段都标来源与核验日。',
    canonical: url('compare.html'),
    body
  }));
}

// About
{
  const body = `<div class="container">
<header class="page-head">
  <p class="eyebrow">OSS · About</p>
  <h1>${bi('怎么挑这里面的仓库', 'How to choose a repository here')}</h1>
  <p class="lede">这个站帮你判断一个仓库能不能拿下来、读得懂、跑得动、改得动。至于“哪个最强”，这里不回答，也回答不了。</p>
</header>
<div class="detail-body">
  <h2>这里都是什么仓库</h2>
  <p>公开 GitHub、AI 相关、有明确用途，拿下来能读、能改、能部署。优先收文档齐全、许可清楚、最近一年有维护的。只有宣传页没有代码的、许可不清的、纯模型权重的、商业 SaaS 的，不在这里。</p>
  <h2>卡片上的字段怎么看</h2>
  <p>star / fork / 语言 / 许可 / 最近推送来自 GitHub。star 是快照，能说明关注度，不能说明质量；许可以仓库 LICENSE 为准；“适合 / 不适合”是编辑判断，不是 GitHub 元数据。</p>
  <h2>开源不等于随便用</h2>
  <p>GPL / AGPL 有传染性，模型权重和代码可能用不同许可；商用、再分发前请自己读许可原文。代码、脚本、权重也有安全风险，本站只做索引和提示，不审计代码。</p>
  <h2>和工具站怎么分</h2>
  <p>工具站写“别人帮你跑的服务怎么用”：价格、权限、能力、限制。OSS 写“你自己拿下来跑”：许可、活跃度、依赖、上手成本、能不能改。同一个项目可以两站各一张卡，但正文不复制，互相链一次。</p>
  <h2>发现错误</h2>
  <p>写清哪个仓库、哪个字段、证据链接，发到 <a href="https://specul.com/correct.html">纠错页</a>。</p>
</div>
<div class="note"><b>English index:</b> see <a href="llms.en.txt">llms.en.txt</a> for a short English map of this site.</div>
</div>`;
  fs.writeFileSync(path.join(site, 'about.html'), page({
    title: '怎么挑仓库 · 开源 AI 工具库',
    desc: 'OSS 站里都是什么仓库、卡片字段怎么看、开源许可与安全边界，以及和工具站的分工；读完能判断一个仓库值不值得拿下来跑。',
    canonical: url('about.html'),
    body
  }));
}

// 404
{
  const body = `<div class="container"><header class="page-head"><p class="eyebrow">404</p><h1>${bi('这个仓库页不存在', 'This repository page does not exist')}</h1><p class="lede"><span data-zh>可能是链接旧了，或这个仓库还没收。回 <a href="index.html">首页</a>，或去 <a href="all.html">全部仓库</a> 搜。</span><span data-en>The link may be old, or this repository is not listed yet. Go back to the <a href="index.html">home page</a>, or search <a href="all.html">all repositories</a>.</span></p></header></div>`;
  fs.writeFileSync(path.join(site, '404.html'), page({
    title: '404 · 开源 AI 工具库',
    desc: '页面不存在。回首页或全部仓库。',
    canonical: url('404.html'),
    body,
    noindex: true
  }));
}

// sitemap / llms / robots / CNAME / README
{
  const urls = [url(''), url('all.html'), url('compare.html'), url('about.html'), ...scenes.map((s) => url(`scenes/${s.id}.html`)), ...repos.map((r) => url(`repos/${r.id}.html`))];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>2026-11-20</lastmod></url>`).join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(site, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(site, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url('sitemap.xml')}\n`);

  const lines = [
    '# 开源 AI 工具库',
    '',
    `> ${repos.length} 个 AI 开源仓库，按 7 个场景整理；写清许可、活跃度、依赖、上手成本与“不适合”。不排名、不背书安全。`,
    '',
    `- [首页](${url('')})`,
    `- [全部仓库](${url('all.html')})`,
    `- [并排对比](${url('compare.html')})`,
    `- [收录方法](${url('about.html')})`,
    '',
    '## 场景'
  ];
  for (const s of scenes) lines.push(`- [${s.title}](${url(`scenes/${s.id}.html`)}) — ${s.lead}`);
  lines.push('', '## 仓库');
  for (const r of repos) lines.push(`- [${r.name}](${url(`repos/${r.id}.html`)}) — ${r.summary} 许可 ${r.license}。`);
  fs.writeFileSync(path.join(site, 'llms.txt'), lines.join('\n') + '\n');

  const en = [
    '# Specul OSS — Open-source AI tool library',
    '',
    `> ${repos.length} AI open-source repositories in 7 scenes: agent frameworks, RAG, local inference, multimodal, speech, evaluation, training and fine-tuning. Licence, activity, dependencies, onboarding cost and "not for" are stated. No ranking, no security endorsement.`,
    '',
    `- [Home](${url('')})`,
    `- [All repositories](${url('all.html')})`,
    `- [Compare](${url('compare.html')})`,
    `- [Method](${url('about.html')})`,
    ''
  ];
  for (const s of scenes) en.push(`- [${s.titleEn}](${url(`scenes/${s.id}.html`)})`);
  en.push('', '## Repositories');
  for (const r of repos) en.push(`- [${r.name}](${url(`repos/${r.id}.html`)}) — ${r.summary} Licence: ${r.license}.`);
  fs.writeFileSync(path.join(site, 'llms.en.txt'), en.join('\n') + '\n');

  fs.writeFileSync(path.join(site, 'CNAME'), 'oss.specul.com\n');
  fs.writeFileSync(path.join(site, '.nojekyll'), '');
  fs.writeFileSync(path.join(site, 'README.md'), `# oss.specul.com\n\n内容源：\`_data/handbook/frontier/oss/repos.json\`、\`scenes.json\`、\`snapshots/2026-11-20.json\`。\n\n构建：\`node _data/handbook/frontier/oss/scripts/build.mjs\`\n\n发布：\`speculcom/oss\`（CNAME=oss.specul.com）。内容仓仍是 \`speculcom/ai-handbook\`。\n`);
}

// 静态资源
fs.copyFileSync(path.join(ep, 'brand.css'), path.join(site, 'brand.css'));
fs.copyFileSync(path.join(ep, 'brand.js'), path.join(site, 'brand.js'));
fs.copyFileSync(path.join(root, 'site.css'), path.join(site, 'site.css'));
fs.copyFileSync(path.join(root, 'oss.css'), path.join(site, 'oss.css'));

console.log(`oss built: ${repos.length} repos, ${scenes.length} scenes`);
