import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// P1：把 models 站加入现有各站的导航（ide / cli / mcp / keel / www）
//
// 教训（写在这里防止重犯）：
//   第一版用正则全局匹配 mcp 锚点，结果 nav-links 和 foot-links 都命中同一段，
//   导致顶部插了两次、页脚一次没插，但日志却报「已插入」——
//   **逐区块切分后再处理，不要用全局正则跨区块匹配。**
// 第二版改为：先用 <nav class="...">…</nav> 把每个区块切出来，各自在自己的区块内找锚点。
//
// 幂等：区块内已有 models 则跳过。

const ROOT = path.resolve(HERE, '..', '..', '..');

function htmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => path.join(dir, f));
}

const TARGETS = [
  ...htmlFiles(path.join(ROOT, '_sites', 'ide')),
  ...htmlFiles(path.join(ROOT, '_sites', 'cli')),
  ...htmlFiles(path.join(ROOT, '_sites', 'mcp')),
  ...htmlFiles(path.join(ROOT, 'www.specul')),
];

// 每个区块：class 名 → 插入项模板
const BLOCKS = [
  { cls: 'nav-links',   item: `<a href="https://models.specul.com/"><span data-zh>Models 图谱</span><span data-en>Models</span></a>` },
  { cls: 'foot-links',  item: `<a href="https://models.specul.com/">Models 图谱</a>` },
];

let changed = 0;
const log = [];

for (const file of TARGETS) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  const notes = [];

  for (const blk of BLOCKS) {
    // 用区间切分定位这个 <nav class="...">…</nav>（非全局正则，避免跨区块误命中）
    const openRe = new RegExp(`<nav class="${blk.cls}"[^>]*>`, 'g');
    let m;
    let handled = false;

    while ((m = openRe.exec(html)) !== null && !handled) {
      const start = m.index;
      const closeIdx = html.indexOf('</nav>', start);
      if (closeIdx === -1) break;
      const end = closeIdx + '</nav>'.length;
      const section = html.slice(start, end);

      // 幂等：这个区块里已经有 models 就跳过
      if (/models\.specul\.com/.test(section)) { notes.push(`${blk.cls}:已有`); handled = true; break; }

      // 在本区块内找 mcp 锚点（只在此区块内找！）
      const anchorM = section.match(/<a href="https:\/\/mcp\.specul\.com\/?[\/]?"[^>]*>[\s\S]*?<\/a>/);
      if (!anchorM) { notes.push(`${blk.cls}:无mcp锚点`); handled = true; break; }

      const aIdx = anchorM.index + anchorM[0].length;

      // 缩进跟随锚点所在行
      const anchorAbs = start + aIdx;
      const anchorTagStart = start + anchorM.index;
      const lineStart = html.lastIndexOf('\n', anchorTagStart) + 1;
      const indent = html.slice(lineStart, anchorTagStart).match(/^\s*/)[0];

      const newSection = section.slice(0, aIdx) + '\n' + indent + blk.item + section.slice(aIdx);
      html = html.slice(0, start) + newSection + html.slice(end);
      notes.push(`${blk.cls}:已插入`);
      handled = true;
    }
    if (!handled) notes.push(`${blk.cls}:未找到区块`);
  }

  if (html !== orig) { fs.writeFileSync(file, html); changed++; }
  log.push(`${rel}  [${notes.join(' / ')}]`);
}

console.log('═══ P1 导航插入 ═══');
console.log('改动', changed, '/', TARGETS.length);
console.log(log.join('\n'));

// ── 验证：models 出现次数应为 nav-links 1 次 + foot-links 1 次（=2） ──
console.log('\n═══ 验证 models 链接出现次数（期望 =2）═══');
let bad = 0;
for (const file of TARGETS) {
  const html = fs.readFileSync(file, 'utf8');
  const n = (html.match(/models\.specul\.com/g) || []).length;
  if (n !== 2) { console.log(`  ⚠ ${path.relative(ROOT, file).replace(/\\/g, '/')} → ${n} 处`); bad++; }
}
console.log(bad === 0 ? '  ✓ 全部 2 处，位置正确' : `  ✗ ${bad} 个文件异常`);
