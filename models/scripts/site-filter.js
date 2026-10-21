/* 挑对量化版 · 本地部署模型图谱 · 客户端筛选（B2，2026-10-09）
 *
 * 为什么单独一个文件而不是塞进 build.mjs 的模板字符串：
 *   build.mjs 生成页面用的是模板字符串，脚本里任何反引号或 ${} 都会**提前截断/插值**。
 *   本会话已因「模板字符串里写反引号」踩过三次。独立 .js 文件从根上避开。
 *
 * 作用域（两处，各自独立）：
 *   .vwrap  —— 系列页里每个成员一个「量化仓详解」区块：搜索 + 量化者 / 建议档位 / 许可
 *   .sfilter —— 索引页的系列列表：搜索 + 许可
 *
 * URL 可还原（B2 验收「筛选后 URL 可复制还原状态」）：
 *   参数写在地址栏（history.replaceState），打开带参 URL 即刻还原同一状态。
 *
 * 无依赖、无内联事件；两个作用域都不存在时本脚本什么都不做（所以可以全站注入）。
 */
(function () {
  'use strict';

  /* 与页面内联脚本同口径：语言由 <html lang> 决定（brand.js 只切属性，DOM 不重渲染）。
   * 本文件里凡是要拼进 innerHTML 的动态文本，都必须在**当前语言**下重新生成一次。 */
  function IS_EN() { return document.documentElement.lang === 'en'; }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function param(name) {
    try { return new URLSearchParams(location.search).get(name) || ''; } catch (e) { return ''; }
  }

  function writeUrl(pairs) {
    try {
      var u = new URL(location.href);
      Object.keys(pairs).forEach(function (k) {
        if (pairs[k]) u.searchParams.set(k, pairs[k]);
        else u.searchParams.delete(k);
      });
      history.replaceState(null, '', u.toString());
    } catch (e) { /* file:// 等场景下静默降级：功能可用，只是地址栏不同步 */ }
  }

  /* ── 系列页：量化仓筛选 ── */
  var wraps = Array.prototype.slice.call(document.querySelectorAll('.vwrap'));
  wraps.forEach(function (wrap) {
    var q = wrap.querySelector('.vq');
    var sels = Array.prototype.slice.call(wrap.querySelectorAll('.vsel'));
    var count = wrap.querySelector('.vcount');
    var cards = Array.prototype.slice.call(wrap.querySelectorAll('.vcard'));
    if (!q || !cards.length) return;

    function apply() {
      var term = (q.value || '').trim().toLowerCase();
      var want = {};
      sels.forEach(function (s) { want[s.getAttribute('data-dim')] = s.value; });
      var shown = 0;
      cards.forEach(function (c) {
        /* 搜索用 data-blob（量化者 + 仓库名 + 许可）这个**窄口径**，
         * 不是整张卡的文字 —— 卡里正文会提到别的量化者，用全文搜「unsloth」会命中每一张
         * （实测 26/26，探针跑出来才发现）。 */
        var okQ = !term || (c.getAttribute('data-blob') || '').indexOf(term) !== -1;
        var okQuant = !want.q || c.getAttribute('data-q') === want.q;
        /* 档位是「**该仓包含**这一档」而不是「推荐档等于它」：
         * 推荐档实测 118/130 都是「平衡档」，拿它筛等于没筛。 */
        var okTier = !want.tier || (c.getAttribute('data-tiers') || '').split(' ').indexOf(want.tier) !== -1;
        var okLic = !want.lic || c.getAttribute('data-lic') === want.lic;
        var on = okQ && okQuant && okTier && okLic;
        c.hidden = !on;
        if (on) shown++;
      });
      if (count) {
        count.textContent = shown + ' / ' + cards.length;
        count.setAttribute('data-zh', shown + ' / ' + cards.length + ' 个量化仓');
        count.setAttribute('data-en', shown + ' / ' + cards.length + ' quant repos');
      }
    }

    function sync(push) {
      var vals = { q: q.value.trim() };
      sels.forEach(function (s) { vals[s.getAttribute('data-dim') === 'q' ? 'quant' : s.getAttribute('data-dim') === 'tier' ? 'tier' : 'lic'] = s.value; });
      writeUrl(vals);
    }

    // 首次：用 URL 参数还原
    q.value = param('q');
    sels.forEach(function (s) {
      var dim = s.getAttribute('data-dim');
      var v = param(dim === 'q' ? 'quant' : dim === 'tier' ? 'tier' : 'lic');
      if (!v) return;
      /* ⚠ 不能直接 s.value = v：`<select>` 遇到**选项里没有的值**会**静默忽略**，
       *   于是「?quant=某人」被当成「没筛选」→ 列出全部。实测阴性对照跑出 26/26 才发现。
       *   这里把 URL 里的值补成一个选项：筛出来就是 0 条，计数会显示「0 / N」——
       *   读者看到的是「这个量化者在本系列没有仓」（如实），而不是「我要的筛选被无视了」。
       *   （nav 站的 ?cat= 不同：那是「切到某个分区」的语义，未知值回退到「全部」是对的；
       *     这里是「在一张表里筛行」，未知值的正确表现是没有行。） */
      if (!Array.prototype.some.call(s.options, function (o) { return o.value === v; })) {
        var extra = document.createElement('option');
        extra.value = v;
        extra.textContent = v;
        s.appendChild(extra);
      }
      s.value = v;
    });

    q.addEventListener('input', function () { apply(); sync(); });
    sels.forEach(function (s) { s.addEventListener('change', function () { apply(); sync(); }); });
    apply();
  });

  /* ═══ B4（2026-10-09）· 显存倒推决策工具 ═══
   * 按真实实测体积算能装下哪些档位：可装 = sizeGB × 1.15 ≤ 显存。
   * 15% 余量是页面自己声明的口径（运行时 + KV cache），与静态速查表一致。
   * 每个答案都带来源（量化者 + HF 发布页链接）—— B4 的验收是「可溯源到具体数据行」。
   * `?vram=12` 可分享（与 B2 的筛选参数同一套路）。 */
  var vt = document.querySelector('.vramtool');
  if (vt) {
    var vtIn = vt.querySelector('.vt-in');
    var vtOut = vt.querySelector('.vt-out');
    var vtDataEl = vt.querySelector('.vt-data');
    var DATA = [];
    try { DATA = JSON.parse(vtDataEl.textContent) || []; } catch (e) { DATA = []; }
    var MARGIN = 1.15;

    function renderVram() {
      var gb = Number(vtIn.value);
      if (!gb || gb <= 0 || !DATA.length) { vtOut.innerHTML = ''; return; }
      var fits = DATA.filter(function (x) { return x.g * MARGIN <= gb; });
      var need = function (x) { return Math.ceil(x.g * MARGIN); };
      if (!fits.length) {
        var smallest = DATA[0];
        vtOut.innerHTML = '<p class="vt-none">' + esc(IS_EN()
          ? 'No tier fits. The smallest here is ' + smallest.q + ' at ' + smallest.g + ' GB, needing about ' + need(smallest) + ' GB with headroom. Below that, use -ngl to keep only some layers on the GPU (see the table below).'
          : '装不下任何档。本成员最小的档是 ' + smallest.q + '（' + smallest.g + ' GB），加余量约需 ' + need(smallest) + ' GB 显存。再少就只能用 -ngl 只把部分层放显存（见下方替代路径）。') + '</p>';
        return;
      }
      var best = fits[fits.length - 1];
      var rest = fits.slice(0, -1).reverse();
      var link = function (x) {
        return '<a href="' + esc(x.u) + '" target="_blank" rel="noopener">' + esc(x.q) + '</a>'
          + ' <span class="vt-meta">' + x.g + ' GB · ' + esc(x.t) + ' · ' + esc(x.b) + '</span>';
      };
      var h = '<p class="vt-best"><b>' + (IS_EN() ? 'Recommended: ' : '建议：') + '</b>' + link(best)
        + ' <span class="vt-meta">' + (IS_EN() ? 'needs about ' : '加余量约需 ') + need(best) + ' GB</span></p>';
      if (rest.length) {
        h += '<p class="vt-rest"><span class="vt-dim">' + (IS_EN() ? 'Also fit (smaller): ' : '也装得下（更省）：') + '</span>'
          + rest.map(link).join(' · ') + '</p>';
      }
      h += '<p class="vt-note">' + (IS_EN()
        ? 'Sizes are measured from the release page file listing; the tier shown is the smallest file of that name in this member. Headroom is 15%. Each name links to its Hugging Face page — check it yourself.'
        : '体积是发布页文件列表的实测值；档位取该名称在本成员下的最省文件。余量 15%。每个档名都链到对应的 Hugging Face 发布页，可自行核对。') + '</p>';
      vtOut.innerHTML = h;
    }

    function syncVram() {
      try {
        var u = new URL(location.href);
        if (vtIn.value) u.searchParams.set('vram', vtIn.value); else u.searchParams.delete('vram');
        history.replaceState(null, '', u.toString());
      } catch (e) { /* 静默降级：功能可用，地址栏不同步 */ }
    }

    vtIn.value = param('vram');
    vtIn.addEventListener('input', function () { renderVram(); syncVram(); });
    Array.prototype.forEach.call(vt.querySelectorAll('.vt-preset'), function (b) {
      b.addEventListener('click', function () { vtIn.value = b.getAttribute('data-gb'); renderVram(); syncVram(); });
    });
    renderVram();
    /* 语言切换后要重渲染：工具输出是拼字符串生成的（不是 data-zh/data-en 双节点），
     * 不重渲染的话切到英文仍显示中文（而其余部分会切走，看起来像坏了）。 */
    new MutationObserver(function () { renderVram(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  /* ── 索引页：系列筛选 ── */
  var sf = document.querySelector('.sfilter');  if (sf) {
    var sq = sf.querySelector('.sq');
    var ssel = sf.querySelector('.ssel');
    /* v7 S52：中文生态三个共用筛选（出品属地 / 国内直连 / 备案状态）。
     * 与许可同一个作用域、同一套 URL 还原逻辑——一套筛选体系，不另造。 */
    var cnSels = [
      { el: sf.querySelector('.ssel-cnorigin'), attr: 'data-cn-origin', key: 'cnorigin' },
      { el: sf.querySelector('.ssel-cndirect'), attr: 'data-cn-direct', key: 'cndirect' },
      { el: sf.querySelector('.ssel-cnfiling'), attr: 'data-cn-filing', key: 'cnfiling' },
    ].filter(function (x) { return x.el; });
    var scount = sf.querySelector('.vcount');
    var scards = Array.prototype.slice.call(document.querySelectorAll('.scard'));
    if (sq && scards.length) {
      var applyS = function () {
        var term = (sq.value || '').trim().toLowerCase();
        var lic = ssel ? ssel.value : '';
        var shown = 0;
        scards.forEach(function (c) {
          var okQ = !term || (c.getAttribute('data-blob') || '').indexOf(term) !== -1 || (c.textContent || '').toLowerCase().indexOf(term) !== -1;
          var okL = !lic || (c.getAttribute('data-lic') || '').split(' ').indexOf(lic) !== -1;
          var okCn = cnSels.every(function (x) {
            return !x.el.value || (c.getAttribute(x.attr) || '') === x.el.value;
          });
          var on = okQ && okL && okCn;
          c.hidden = !on;
          if (on) shown++;
        });
        if (scount) {
          scount.textContent = shown + ' / ' + scards.length;
          scount.setAttribute('data-zh', shown + ' / ' + scards.length + ' 个系列');
          scount.setAttribute('data-en', shown + ' / ' + scards.length + ' series');
        }
      };
      var syncS = function () {
        var pairs = { q: sq.value.trim(), lic: ssel ? ssel.value : '' };
        cnSels.forEach(function (x) { pairs[x.key] = x.el.value; });
        writeUrl(pairs);
      };
      sq.value = param('q');
      if (ssel && param('lic')) ssel.value = param('lic');
      cnSels.forEach(function (x) {
        var v = param(x.key);
        if (!v) return;
        /* 同 .vsel 的教训：select 对选项外的值会静默忽略 → 补成选项，筛出 0 条如实显示。 */
        if (!Array.prototype.some.call(x.el.options, function (o) { return o.value === v; })) {
          var extra = document.createElement('option');
          extra.value = v; extra.textContent = v;
          x.el.appendChild(extra);
        }
        x.el.value = v;
      });
      sq.addEventListener('input', function () { applyS(); syncS(); });
      if (ssel) ssel.addEventListener('change', function () { applyS(); syncS(); });
      cnSels.forEach(function (x) { x.el.addEventListener('change', function () { applyS(); syncS(); }); });
      applyS();
    }
  }
})();
