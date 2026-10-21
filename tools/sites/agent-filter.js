/* Agent 图谱 · 客户端筛选与排序（B2，2026-10-09）
 *
 * 为什么单独一个文件：agent 的 build.mjs 用模板字符串生成页面，
 * 脚本里任何反引号或 ${} 都会提前截断/插值（本会话已踩三次）。独立文件从根上避开。
 *
 * 作用域：`.afilter`（三个分区页各一份）
 *   搜索   —— data-blob（名称 + 厂商 + 定位句）
 *   分组   —— data-form（agents 页=形态 track / harness 页=抽象层 family / tools 页无此项）
 *   核验   —— data-conf（verified / partial / stale）
 *   任务   —— data-task（S43：空格分隔多值，卡片可挂多个任务；任务卡链 ?task=<id> 到此）
 *   中文生态 —— data-cn-origin / data-cn-direct / data-cn-filing（S52：与 models 站同一套字段口径）
 *   排序   —— data-done & data-total（**按产品**的维度补齐数），在各自 .grid 内重排
 *
 * ⚠ 排序只在**同一个 .grid 内**进行：页面按形态/抽象层分了组，
 *   跨组重排会把分组打散（而分组本身是本站的一条判断，不能因为排序就没了）。
 *
 * URL 可还原：?q=&form=&conf=&task=&cnorigin=&cndirect=&cnfiling=&sort= 写进地址栏。
 */
(function () {
  'use strict';

  var box = document.querySelector('.afilter');
  if (!box) return;

  var q = box.querySelector('.aq');
  var selForm = box.querySelector('.asel-form');
  var selConf = box.querySelector('.asel-conf');
  var selTask = box.querySelector('.asel-task');
  var selSort = box.querySelector('.asel-sort');
  /* S52 中文生态三选：与 models 站 .ssel-cn* 同一套口径。
   * 控件由构建器按「本页真有区分度」才渲染，所以这里对 null 要防御。 */
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
      var vals = { q: q ? q.value.trim() : '', form: selForm ? selForm.value : '', conf: selConf ? selConf.value : '', task: selTask ? selTask.value : '', sort: selSort ? selSort.value : '' };
      cnSels.forEach(function (x) { vals[x.key] = x.el.value; });
      Object.keys(vals).forEach(function (k) { if (vals[k]) u.searchParams.set(k, vals[k]); else u.searchParams.delete(k); });
      history.replaceState(null, '', u.toString());
    } catch (e) { /* file:// 等场景静默降级：功能可用，地址栏不同步 */ }
  }

  function ratio(c) {
    var d = Number(c.getAttribute('data-done') || 0);
    var t = Number(c.getAttribute('data-total') || 0);
    return t ? d / t : 0;
  }

  function apply() {
    var term = q ? q.value.trim().toLowerCase() : '';
    var form = selForm ? selForm.value : '';
    /* 分组轴因分区而异（agents=形态 track / harness=抽象层 family），
     * 由 select 的 data-attr 指明比哪个属性 —— 卡片上两个属性都有。 */
    var formAttr = selForm ? (selForm.getAttribute('data-attr') || 'track') : 'track';
    var conf = selConf ? selConf.value : '';
    var task = selTask ? selTask.value : '';
    var shown = 0;
    allCards.forEach(function (c) {
      var okQ = !term || (c.getAttribute('data-blob') || '').indexOf(term) !== -1;
      var okForm = !form || c.getAttribute('data-' + formAttr) === form;
      var okConf = !conf || c.getAttribute('data-conf') === conf;
      /* data-task 是空格分隔多值（一份档案可挂多个任务），按 token 匹配。 */
      var okTask = !task || (c.getAttribute('data-task') || '').split(/\s+/).indexOf(task) !== -1;
      /* S52：cn 三维各是单值属性；卡片没这维度时属性为空串，
       * 任何指名筛选都不该匹配它（空 ≠ 该值），未指名则放行。 */
      var okCn = cnSels.every(function (x) { return !x.el.value || (c.getAttribute(x.attr) || '') === x.el.value; });
      var on = okQ && okForm && okConf && okTask && okCn;
      c.hidden = !on;
      if (on) shown++;
    });
    // 空分组（全部卡片被筛掉）连标题一起藏起来，否则会留下一个孤零零的组标题
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
        // 同分时按原名排序，保证**结果确定**（否则每次打开顺序可能不同）
        return d || (a.getAttribute('data-name') || '').localeCompare(b.getAttribute('data-name') || '', 'zh');
      });
      cards.forEach(function (c) { g.appendChild(c); });
    });
  }

  // 首次：用 URL 参数还原
  if (q) q.value = param('q');
  [[selForm, 'form'], [selConf, 'conf'], [selTask, 'task'], [selSort, 'sort']].forEach(function (pair) {
    var el = pair[0]; var v = param(pair[1]);
    if (!el || !v) return;
    /* `<select>` 遇到选项里没有的值会**静默忽略** —— 那就成了「指名筛选却被无视」。
     * 把未知值补成一个选项：筛出来 0 条，计数会如实显示「0 / N」。 */
    var found = Array.prototype.some.call(el.options, function (o) { return o.value === v; });
    if (!found) {
      var extra = document.createElement('option');
      extra.value = v; extra.textContent = v;
      el.appendChild(extra);
    }
    el.value = v;
  });
  cnSels.forEach(function (x) {
    var v = param(x.key);
    if (!v) return;
    var found = Array.prototype.some.call(x.el.options, function (o) { return o.value === v; });
    if (!found) {
      var extra = document.createElement('option');
      extra.value = v; extra.textContent = v;
      x.el.appendChild(extra);
    }
    x.el.value = v;
  });

  if (q) q.addEventListener('input', function () { apply(); writeUrl(); });
  [selForm, selConf, selTask].forEach(function (s) { if (s) s.addEventListener('change', function () { apply(); writeUrl(); }); });
  cnSels.forEach(function (x) { x.el.addEventListener('change', function () { apply(); writeUrl(); }); });
  if (selSort) selSort.addEventListener('change', function () { sort(); writeUrl(); });

  sort();
  apply();
})();
