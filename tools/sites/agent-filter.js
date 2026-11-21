/* 工具站客户端筛选与排序（2026-11-21 扩展）
 *
 * 作用域：`.afilter`
 *   搜索     data-blob
 *   分组     data-attr（形态 / 抽象层；tools 页没有这一项）
 *   证据     data-conf
 *   用途     data-job（空格分隔多值，按 token 匹配）
 *   部署     data-deploy（单值）
 *   许可     data-license（单值）
 *   费用     data-cost（单值）
 *   中文生态 data-cn-origin / data-cn-direct / data-cn-filing
 *   排序     data-done & data-total（只在同一 .grid 内重排）
 *
 * URL 可还原：?q=&form=&conf=&life=&job=&deploy=&license=&cost=&cnorigin=&cndirect=&cnfiling=&sort=
 */
(function () {
  'use strict';

  var box = document.querySelector('.afilter');
  if (!box) return;

  var q = box.querySelector('.aq');
  var selForm = box.querySelector('.asel-form');
  var selConf = box.querySelector('.asel-conf');
  var selLife = box.querySelector('.asel-life');
  var selSort = box.querySelector('.asel-sort');
  var facetSels = [
    { el: box.querySelector('.asel-job'), attr: 'data-job', key: 'job', multi: true },
    { el: box.querySelector('.asel-deploy'), attr: 'data-deploy', key: 'deploy', multi: false },
    { el: box.querySelector('.asel-license'), attr: 'data-license', key: 'license', multi: false },
    { el: box.querySelector('.asel-cost'), attr: 'data-cost', key: 'cost', multi: false },
  ].filter(function (x) { return x.el; });
  var cnSels = [
    { el: box.querySelector('.asel-cnorigin'), attr: 'data-cn-origin', key: 'cnorigin' },
    { el: box.querySelector('.asel-cndirect'), attr: 'data-cn-direct', key: 'cndirect' },
    { el: box.querySelector('.asel-cnfiling'), attr: 'data-cn-filing', key: 'cnfiling' },
  ].filter(function (x) { return x.el; });
  var count = box.querySelector('.acount');
  var allCards = Array.prototype.slice.call(document.querySelectorAll('.grid > .card'));
  if (!allCards.length) return;

  function param(n) {
    try { return new URLSearchParams(location.search).get(n) || ''; } catch (e) { return ''; }
  }
  function writeUrl() {
    try {
      var u = new URL(location.href);
      var vals = {
        q: q ? q.value.trim() : '',
        form: selForm ? selForm.value : '',
        conf: selConf ? selConf.value : '',
        life: selLife ? selLife.value : '',
        sort: selSort ? selSort.value : ''
      };
      facetSels.forEach(function (x) { vals[x.key] = x.el.value; });
      cnSels.forEach(function (x) { vals[x.key] = x.el.value; });
      Object.keys(vals).forEach(function (k) {
        if (vals[k]) u.searchParams.set(k, vals[k]); else u.searchParams.delete(k);
      });
      history.replaceState(null, '', u.toString());
    } catch (e) { /* file:// 等场景静默降级：功能可用，地址栏不同步 */ }
  }

  function ratio(c) {
    var d = Number(c.getAttribute('data-done') || 0);
    var t = Number(c.getAttribute('data-total') || 0);
    return t ? d / t : 0;
  }

  function matchFacet(c, x) {
    var want = x.el.value;
    if (!want) return true;
    var have = c.getAttribute(x.attr) || '';
    if (x.multi) return have.split(/\s+/).indexOf(want) !== -1;
    return have === want;
  }

  function apply() {
    var term = q ? q.value.trim().toLowerCase() : '';
    var form = selForm ? selForm.value : '';
    var formAttr = selForm ? (selForm.getAttribute('data-attr') || 'track') : 'track';
    var conf = selConf ? selConf.value : '';
    var life = selLife ? selLife.value : '';
    var shown = 0;
    allCards.forEach(function (c) {
      var okQ = !term || (c.getAttribute('data-blob') || '').indexOf(term) !== -1;
      var okForm = !form || c.getAttribute('data-' + formAttr) === form;
      var okConf = !conf || c.getAttribute('data-conf') === conf;
      var okLife = !life || c.getAttribute('data-lifecycle') === life;
      var okFacet = facetSels.every(function (x) { return matchFacet(c, x); });
      var okCn = cnSels.every(function (x) {
        return !x.el.value || (c.getAttribute(x.attr) || '') === x.el.value;
      });
      var on = okQ && okForm && okConf && okLife && okFacet && okCn;
      c.hidden = !on;
      if (on) shown++;
    });
    Array.prototype.slice.call(document.querySelectorAll('.fam-block')).forEach(function (b) {
      var vis = Array.prototype.slice.call(b.querySelectorAll('.card')).some(function (c) { return !c.hidden; });
      b.hidden = !vis;
    });
    if (count) {
      count.textContent = shown + ' / ' + allCards.length;
      count.setAttribute('data-zh', shown + ' / ' + allCards.length + ' 份档案');
      count.setAttribute('data-en', shown + ' / ' + allCards.length + ' entries');
    }
  }

  function sort() {
    var mode = selSort ? selSort.value : '';
    if (!mode) return;
    Array.prototype.slice.call(document.querySelectorAll('.grid')).forEach(function (g) {
      var cards = Array.prototype.slice.call(g.children).filter(function (c) { return c.classList.contains('card'); });
      if (cards.length < 2) return;
      cards.sort(function (a, b) {
        var d = ratio(b) - ratio(a);
        if (mode.indexOf('asc') !== -1) d = -d;
        return d || (a.getAttribute('data-name') || '').localeCompare(b.getAttribute('data-name') || '', 'zh');
      });
      cards.forEach(function (c) { g.appendChild(c); });
    });
  }

  function restore(el, key) {
    if (!el) return;
    var v = param(key);
    if (!v) return;
    var found = Array.prototype.some.call(el.options, function (o) { return o.value === v; });
    if (!found) {
      var extra = document.createElement('option');
      extra.value = v; extra.textContent = v;
      el.appendChild(extra);
    }
    el.value = v;
  }

  if (q) q.value = param('q');
  restore(selForm, 'form');
  restore(selConf, 'conf');
  restore(selLife, 'life');
  restore(selSort, 'sort');
  facetSels.forEach(function (x) { restore(x.el, x.key); });
  cnSels.forEach(function (x) { restore(x.el, x.key); });

  if (q) q.addEventListener('input', function () { apply(); writeUrl(); });
  if (selForm) selForm.addEventListener('change', function () { apply(); writeUrl(); });
  if (selConf) selConf.addEventListener('change', function () { apply(); writeUrl(); });
  if (selLife) selLife.addEventListener('change', function () { apply(); writeUrl(); });
  facetSels.forEach(function (x) { x.el.addEventListener('change', function () { apply(); writeUrl(); }); });
  cnSels.forEach(function (x) { x.el.addEventListener('change', function () { apply(); writeUrl(); }); });
  if (selSort) selSort.addEventListener('change', function () { sort(); writeUrl(); });

  sort();
  apply();
})();
