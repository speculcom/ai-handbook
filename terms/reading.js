/* Route navigation and explicit reading progress. No account or network storage. */
(() => {
  'use strict';
  const routes = typeof PATHS === 'undefined' ? [] : PATHS;
  const key = 'specul-reading-v1';
  const enc = encodeURIComponent;
  const en = () => document.documentElement.lang.startsWith('en');
  const tr = (zh, english) => en() ? english : zh;
  const el = (tag, text, cls) => { const n = document.createElement(tag); if (text) n.textContent = text; if (cls) n.className = cls; return n; };
  let memory = {}, persistent = true;
  try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); if (saved && typeof saved === 'object' && !Array.isArray(saved)) memory = saved; } catch { persistent = false; }
  const save = () => { try { localStorage.setItem(key, JSON.stringify(memory)); } catch { persistent = false; } };
  const state = p => {
    const old = memory[p.id] || {};
    return { done: Array.isArray(old.done) ? old.done.filter(s => p.steps.includes(s)) : [], last: p.steps.includes(old.last) ? old.last : p.steps[0] };
  };
  const link = (text, href) => { const a = el('a', text); a.href = href; return a; };
  const button = (text, fn) => { const b = el('button', text, 'reading-button'); b.type = 'button'; b.addEventListener('click', fn); return b; };
  const prefix = location.pathname.startsWith('/learn.specul/') ? '/learn.specul' : '';
  const page = decodeURIComponent(location.pathname.slice(prefix.length)).match(/^\/(term|guide|path)\/([^/]+)\//);
  const current = page && page[1] !== 'path' ? page[2] : null;
  const requested = new URLSearchParams(location.search).get('path');
  const route = routes.find(p => p.id === (page?.[1] === 'path' ? page[2] : requested) && (!current || p.steps.includes(current)));
  const routeHref = p => prefix + '/path/' + enc(p.id) + '/';
  const stepHref = (p, i) => {
    // Static route pages provide the canonical term/guide distinction.
    const raw = p.stepUrls?.[i];
    return raw ? prefix + raw + '?path=' + enc(p.id) : routeHref(p);
  };
  let host;
  function render() {
    if (host) host.remove();
    if (route) renderRoute(route);
    else if (current) renderChoices();
    else if (!page) renderStart();
  }
  function renderRoute(p) {
    const article = document.querySelector('article'); if (!article) return;
    const s = state(p), i = p.steps.indexOf(current);
    host = el('section', '', 'reading-panel'); host.setAttribute('aria-label', tr('当前学习路径', 'Current learning route'));
    host.append(el('h2', current ? (en() ? p.en : p.zh) : tr('阅读进度', 'Reading progress')));
    const status = el('p', current ? tr(`第 ${i + 1}/${p.steps.length} 步 · 已标记完成 ${s.done.length} 步`, `Step ${i + 1}/${p.steps.length} · ${s.done.length} marked complete`) : tr(`已标记完成 ${s.done.length}/${p.steps.length} 步`, `${s.done.length}/${p.steps.length} steps marked complete`));
    status.setAttribute('aria-live', 'polite'); host.append(status);
    const nav = el('nav', '', 'reading-actions'); nav.setAttribute('aria-label', tr('沿当前路径阅读', 'Follow this route'));
    if (current) {
      nav.append(link(tr('返回路线', 'Route overview'), routeHref(p)));
      if (i > 0) nav.append(link(tr('上一步', 'Previous step'), stepHref(p, i - 1)));
      nav.append(button(s.done.includes(current) ? tr('取消完成标记', 'Unmark complete') : tr('标记本步完成', 'Mark this step complete'), () => {
        const v = state(p); v.done = v.done.includes(current) ? v.done.filter(x => x !== current) : [...v.done, current]; memory[p.id] = {...v,updated:Date.now()}; save(); render(); host.querySelector('button')?.focus();
      }));
      nav.append(link(i + 1 < p.steps.length ? tr('下一步', 'Next step') : tr('回路线做自测', 'Return to the checkpoint'), i + 1 < p.steps.length ? stepHref(p, i + 1) : routeHref(p) + '#checkpoint'));
      const globalNav = article.querySelector('.tp-pn'); if (globalNav) globalNav.hidden = true;
    } else {
      nav.append(link(memory[p.id]?.last ? tr('从上次位置继续', 'Resume reading') : tr('开始第一步', 'Start with step one'), stepHref(p, p.steps.indexOf(s.last))));
      if (memory[p.id]) nav.append(button(tr('清除这条路线的记录', 'Reset this route'), () => { delete memory[p.id]; save(); render(); }));
      article.querySelectorAll('.t-pathsteps a').forEach((a, idx) => {
        a.href = stepHref(p, idx);
        const label = a.querySelector(en() ? '[data-en]' : '[data-zh]')?.textContent.trim() || a.textContent.trim();
        a.setAttribute('aria-label', label + (s.done.includes(p.steps[idx]) ? tr('，已标记完成', ', marked complete') : ''));
        a.classList.toggle('reading-done', s.done.includes(p.steps[idx]));
      });
    }
    host.append(nav, el('p', persistent ? tr('进度只保存在当前浏览器。打开一页不会自动算作完成。', 'Progress stays in this browser. Opening a page does not mark it complete.') : tr('浏览器未允许保存记录，进度只在当前页面内有效。', 'Browser storage is unavailable; progress lasts only on this page.'), 't-sm'));
    article.querySelector('h1').after(host);
  }
  function renderChoices() {
    const matches = routes.filter(p => p.steps.includes(current)); if (!matches.length) return;
    host = el('section', '', 'reading-panel'); host.append(el('h2', tr('把这页放进一条路线', 'Read this page as part of a route')));
    const nav = el('nav', '', 'reading-actions');
    matches.forEach(p => nav.append(link(en() ? p.en : p.zh, stepHref(p, p.steps.indexOf(current)))));
    host.append(nav); document.querySelector('article h1')?.after(host);
  }
  function renderStart() {
    const anchor = document.querySelector('#reading-start'); if (!anchor) return;
    const fallback = anchor.querySelector(':scope > p'); if (fallback) fallback.hidden = true;
    host = el('div', '', 'reading-panel start-panel');
    host.append(el('p', tr('先不用管名词，挑一个最像你的情况', 'Skip the glossary for a second — pick what sounds like you'), 'start-kicker'));
    host.append(el('h2', tr('你现在最想解决哪件事？', 'What do you want to solve right now?')));
    host.append(el('p', tr('选一张卡，下面会告诉你这条路大概花多久、学完能做什么。不用按顺序从头读到尾。', 'Pick a card and you will see how long it takes and what you can do afterwards. No need to read everything in order.'), 'start-deck'));
    const choices = [
      ['quick-start', '第一次了解 AI', 'New to AI', '先弄懂 10 个常用词，分清 AI 能做什么、不能做什么。', 'Ten common terms to see what AI can and cannot do.'],
      ['for-consumers', '日常用 AI 少踩坑', 'Everyday AI without the traps', '提问、隐私、假消息，先把日常使用最容易踩的坑避开。', 'Questions, privacy and fake news: avoid the everyday traps first.'],
      ['for-builders', '写代码 / 做应用', 'Code and build apps', '从提示词到 Agent，边看边改，能跑起来。', 'From prompts to agents, with enough to build and run something.'],
      ['for-creators', '做图 / 视频 / 音频', 'Images, video and audio', '知道工具怎么选，效果怎么调，哪里会翻车。', 'Choose tools, tune results and see where generation fails.'],
      ['for-writers', '写作 / 查资料', 'Writing and research', '把 AI 当研究助理，查资料、写初稿、核对来源。', 'Use AI as a research assistant, not a ghostwriter.'],
      ['for-managers', '给团队选工具', 'Choose tools for a team', '看成本、权限、供应商，把选型做成能签字的决定。', 'Cost, permissions and vendors: turn a shortlist into a decision.'],
      ['for-researchers', '看懂原理 / 论文', 'Methods and papers', '从 Transformer 到评测，知道它为什么这样表现。', 'From Transformers to evaluation, understand why models behave this way.'],
      ['for-operators', '部署 / 运维', 'Deploy and operate', '显存、吞吐、上线，把模型跑稳。', 'VRAM, throughput and launch: keep it running.'],
    ];
    let chosen = anchor.dataset.choice || 'quick-start';
    if (!choices.some(([id]) => id === chosen)) chosen = 'quick-start';
    const grid = el('div', '', 'goal-grid');
    choices.forEach(([id, zh, english, blurbZh, blurbEn]) => {
      const p = routes.find(x => x.id === id);
      if (!p) return;
      const card = el('button', '', 'goal-card');
      card.type = 'button';
      card.dataset.goal = id;
      card.setAttribute('aria-pressed', id === chosen ? 'true' : 'false');
      const top = el('span', '', 'gc-top');
      top.append(el('b', tr(zh, english), 'gc-title'), el('span', p.span[en() ? 'en' : 'zh'], 'gc-time'));
      card.append(top, el('span', tr(blurbZh, blurbEn), 'gc-blurb'), el('span', p.steps.length + tr(' 步', ' steps'), 'gc-meta'));
      grid.append(card);
    });
    host.append(grid);
    const result = el('div', '', 'goal-result');
    const recommend = () => {
      anchor.dataset.choice = chosen;
      Array.from(grid.querySelectorAll('.goal-card')).forEach((card) => {
        card.setAttribute('aria-pressed', card.dataset.goal === chosen ? 'true' : 'false');
      });
      const p = routes.find(x => x.id === chosen); if (!p) return;
      result.replaceChildren(
        el('p', tr('这条路：', 'This route: ') + (en() ? p.lead.en : p.lead.zh), 'goal-result-lead'),
        link(tr('开始这条路 →', 'Open this route →'), routeHref(p))
      );
    };
    grid.addEventListener('click', (event) => {
      const card = event.target.closest('.goal-card');
      if (!card) return;
      chosen = card.dataset.goal;
      recommend();
    });
    recommend(); host.append(result);
    const latest = routes.filter(p => memory[p.id]?.last).sort((a,b) => (memory[b.id].updated || 0) - (memory[a.id].updated || 0))[0];
    if (latest) { const s = state(latest); host.append(el('p', tr('上次读到：', 'Last visited: ')), link((en() ? latest.en : latest.zh) + tr(' · 继续阅读', ' · Resume'), stepHref(latest, latest.steps.indexOf(s.last)))); }
    anchor.append(host);
  }
  if (route && current) { memory[route.id] = { ...state(route), last: current, updated: Date.now() }; save(); }
  render();
  document.addEventListener('specul:preferences', render);
  window.addEventListener('storage', e => { if (e.key !== key) return; try { memory = JSON.parse(e.newValue || '{}') || {}; } catch { memory = {}; } render(); });
})();
