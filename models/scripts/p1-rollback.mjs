import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// 回滚 P1 的错误插入，并正确重做
// 错误：models 链接被插到 nav-links（顶部）两次，foot-links（页脚）0 次
// 正确：nav-links 1 次 + foot-links 1 次 = 2 次，但位置要对

const ROOT = path.resolve(HERE, '..', '..', '..');

function htmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.html')).map((f) => path.join(dir, f));
}
const TARGETS = [
  ...htmlFiles(path.join(ROOT, '_sites', 'ide')),
  ...htmlFiles(path.join(ROOT, '_sites', 'cli')),
  ...htmlFiles(path.join(ROOT, '_sites', 'mcp')),
  ...htmlFiles(path.join(ROOT, 'www.specul')),
];

const NAV_ITEM  = `<a href="https://models.specul.com/"><span data-zh>Models 图谱</span><span data-en>Models</span></a>`;
const FOOT_ITEM = `<a href="https://models.specul.com/">Models 图谱</a>`;

// 两种可能的缩进（第一种错误版用了锚点缩进，第二版会复用行内缩进）
const lineRe = (item) => new RegExp(`[ \\t]*${item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\r?\\n`, 'g');

let step1 = 0, step2 = 0;
const log = [];

for (const file of TARGETS) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;

  // ── 第一步：把已插入的 models 链接全部移除（不管对错，先清干净） ──
  html = html.replace(lineRe(NAV_ITEM), '');
  html = html.replace(lineRe(FOOT_ITEM), '');
  // 清理可能残留的空行
  html = html.replace(/([ \t]*<a href="https:\/\/mcp\.specul\.com[^>]*>[\s\S]*?<\/a>)\n\s*\n/g, '$1\n');
  const afterClean = html;

  // ── 第二步：在正确的两个区块各插一次 ──
  const sections = [
    { cls: 'nav-links',  item: NAV_ITEM },
    { cls: 'foot-links', item: FOOT_ITEM },
  ];
  const notes = [];

  for (const s of sections) {
    const openRe = new RegExp(`<nav class="${s.cls}"[^>]*>`);
    const om = html.match(openRe);
    if (!om) { notes.push(`${s.cls}:无区块`); continue; }
    const start = om.index;
    const end = html.indexOf('</nav>', start);
    if (end === -1) { notes.push(`${s.cls}:未闭合`); continue; }

    const section = html.slice(start, end + 6);
    if (/models\.specul\.com/.test(section)) { notes.push(`${s.cls}:已有`); continue; }

    // 只在本区块内找 mcp 锚点
    const am = section.match(/<a href="https:\/\/mcp\.specul\.com\/?[\/]?"[^>]*>[\s\S]*?<\/a>/);
    if (!am) { notes.push(`${s.cls}:无mcp`); continue; }

    const insertAt = start + am.index + am[0].length;

    // 缩进 = mcp 锚点那一行的前导空白
    const tagAbs = start + am.index;
    const lineStart = html.lastIndexOf('\n', tagAbs) + 1;
    const indent = html.slice(lineStart, tagAbs).match(/^\s*/)[0];

    html = html.slice(0, insertAt) + '\n' + indent + s.item + html.slice(insertAt);
    notes.push(`${s.cls}:插入`);
  }

  if (html !== orig) fs.writeFileSync(file, html);
  if (afterClean !== orig) step1++;
  if (html !== afterClean) step2++;
  log.push(`${rel}  [${notes.join(' / ')}]`);
}

console.log('═══ 回滚 + 重做完成 ═══');
console.log('清理过的文件', step1, '| 重新插入的文件', step2);
console.log(log.join('\n'));

// ── 逐区块验证 ──
console.log('\n═══ 逐区块验证 ═══');
let bad = 0;
for (const file of TARGETS) {
  const html = fs.readFileSync(file, 'utf8');
  const total = (html.match(/models\.specul\.com/g) || []).length;
  const counts = {};
  for (const cls of ['nav-links', 'foot-links']) {
    const om = html.match(new RegExp(`<nav class="${cls}"[^>]*>`));
    if (!om) { counts[cls] = '缺'; continue; }
    const start = om.index;
    const end = html.indexOf('</nav>', start);
    const sec = html.slice(start, end === -1 ? undefined : end);
    counts[cls] = (sec.match(/models\.specul\.com/g) || []).length;
  }
  const ok = counts['nav-links'] === 1 && counts['foot-links'] === 1 && total === 2;
  if (!ok) { bad++; console.log(`  ⚠ ${path.relative(ROOT, file).replace(/\\/g, '/')}  nav=${counts['nav-links']} foot=${counts['foot-links']} total=${total}`); }
}
console.log(bad === 0 ? '  ✓ 全部文件：nav-links 1 处 + foot-links 1 处 = 2 处，位置正确' : `  ✗ ${bad} 个文件仍异常`);
