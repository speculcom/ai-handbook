/* 可填写工作表的客户端行为：复制成 markdown / 打印 / 清空。
 * 表单本身是原生 HTML，禁用脚本也能填与打印；这里只做三件需要脚本的便利动作。
 * 不写 localStorage、不发请求：填的内容离开不了这一页。
 */
(function () {
  var zh = document.documentElement.lang !== 'en';
  var status = document.getElementById('ws-status');
  var blocks = Array.prototype.slice.call(document.querySelectorAll('[data-ws-block]'));

  function say(msg) { if (status) status.textContent = msg; }

  function titleOf(block) {
    var h = block.querySelector('h3');
    if (!h) return '';
    var span = h.querySelector(zh ? '[data-zh]' : '[data-en]');
    return (span || h).textContent.trim();
  }

  function labelOf(node) {
    if (!node) return '';
    var span = node.querySelector(zh ? '[data-zh]' : '[data-en]');
    return (span || node).textContent.trim();
  }

  function buildMarkdown() {
    var out = [];
    blocks.forEach(function (block) {
      out.push('## ' + titleOf(block));
      Array.prototype.forEach.call(block.querySelectorAll('.ws-item'), function (li) {
        var box = li.querySelector('input[type=checkbox]');
        var note = li.querySelector('input.ws-note');
        var label = labelOf(li.querySelector('label'));
        out.push('- [' + (box && box.checked ? 'x' : ' ') + '] ' + label + (note && note.value.trim() ? ' — ' + note.value.trim() : ''));
      });
      var table = block.querySelector('.ws-table');
      if (table) {
        var rows = table.querySelectorAll('tr');
        var head = Array.prototype.map.call(rows[0].querySelectorAll('th'), labelOf);
        out.push('');
        out.push('| ' + head.join(' | ') + ' |');
        out.push('|' + head.map(function () { return ' --- |'; }).join(''));
        Array.prototype.forEach.call(rows, function (tr, i) {
          if (i === 0) return;
          var cells = [labelOf(tr.querySelector('th'))];
          Array.prototype.forEach.call(tr.querySelectorAll('input.ws-cell'), function (inp) {
            cells.push(inp.value.trim() || (zh ? '未填' : 'blank'));
          });
          out.push('| ' + cells.join(' | ') + ' |');
        });
      }
      out.push('');
    });
    return out.join('\n').trim() + '\n';
  }

  function copy() {
    var text = buildMarkdown();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        say(zh ? '已复制到剪贴板（本页未上传任何内容）。' : 'Copied to your clipboard. Nothing left this page.');
      }, function () {
        say(zh ? '复制被浏览器拒绝：请手动全选下方表格与勾选项。' : 'The browser blocked copying: select the fields by hand instead.');
      });
    } else {
      say(zh ? '此浏览器不支持一键复制，请手动填写后打印留档。' : 'No clipboard support here; fill by hand and print for your records.');
    }
  }

  function clear() {
    Array.prototype.forEach.call(document.querySelectorAll('.ws-workbench input'), function (i) {
      if (i.type === 'checkbox') i.checked = false; else i.value = '';
    });
    say(zh ? '已清空本页填写。' : 'Cleared the fields on this page.');
  }

  var c = document.getElementById('ws-copy');
  var p = document.getElementById('ws-print');
  var x = document.getElementById('ws-clear');
  if (c) c.addEventListener('click', copy);
  if (p) p.addEventListener('click', function () { window.print(); });
  if (x) x.addEventListener('click', clear);
})();
