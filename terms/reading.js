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
    host = el('div', '', 'reading-panel'); host.append(el('h2', tr('先选一个你想做的事', 'Start with what you want to do')));
    const choices = [['quick-start','第一次了解 AI','New to AI'],['for-consumers','日常使用','Everyday use'],['for-builders','写代码或做应用','Build software'],['for-creators','做图像、视频、音频','Create media'],['for-writers','写作与研究资料','Write and gather sources'],['for-managers','为团队选工具','Choose tools for a team'],['for-researchers','理解原理和论文','Study methods and papers'],['for-operators','部署与运维','Deploy and operate']];
    const label = el('label', tr('我的目标：', 'My goal: ')); const select = el('select'); select.id = 'reading-goal';
    const chosen = anchor.dataset.choice || 'quick-start';
    choices.forEach(([id,zh,english]) => { const o = el('option', tr(zh,english)); o.value = id; select.append(o); }); select.value = chosen;
    label.append(select); host.append(label);
    const result = el('div');
    const recommend = () => {
      anchor.dataset.choice = select.value;
      const p = routes.find(x => x.id === select.value); if (!p) return;
      result.replaceChildren(el('p', (en() ? p.lead.en : p.lead.zh) + ' · ' + (en() ? p.span.en : p.span.zh)), link(tr('打开路线 →', 'Open route →'), routeHref(p)));
    };
    select.addEventListener('change', recommend); recommend(); host.append(result);
    const latest = routes.filter(p => memory[p.id]?.last).sort((a,b) => (memory[b.id].updated || 0) - (memory[a.id].updated || 0))[0];
    if (latest) { const s = state(latest); host.append(el('p', tr('上次读到：', 'Last visited: ')), link((en() ? latest.en : latest.zh) + tr(' · 继续阅读', ' · Resume'), stepHref(latest, latest.steps.indexOf(s.last)))); }
    anchor.append(host);
  }
  if (route && current) { memory[route.id] = { ...state(route), last: current, updated: Date.now() }; save(); }
  render();
  document.addEventListener('specul:preferences', render);
  window.addEventListener('storage', e => { if (e.key !== key) return; try { memory = JSON.parse(e.newValue || '{}') || {}; } catch { memory = {}; } render(); });
})();
