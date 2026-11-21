/* 生成每个 tools 类目的「收录对象」清单（2026-11-21）
 * ----------------------------------------------------------------------------
 * 之前 `_category.md` 的清单是手写的：video 写 3 份、实际 14 份；coding 写 27、
 * 实际 41。声明与档案漂移后，读者与构建器看到的是两套事实。
 * 这个脚本只改「## 收录对象」这一节：标题里的数量、表格、生成说明都从真实档案算。
 * 其余人工写的边界、判据、形态归属一概不动。
 * 运行：node _data/handbook/tools/scripts/gen-category-docs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from './yaml.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const TRACKS = path.join(ROOT, 'tracks');

const FORM = {
  ide: 'IDE / 编辑器', cli: 'CLI', cloud: '厂商云', mcp: 'MCP',
  web: '网页服务', app: '桌面 / 移动应用', 'local-app': '本机应用', harness: '框架 / SDK',
};
const EVIDENCE = { verified: '8 项已核', partial: '有未核项', stale: '需复核' };
const LIFE = { active: '活跃', maintenance: '更新放缓', archived: '已归档', unknown: '状态未知' };
const LIFE_ORDER = { active: 0, maintenance: 1, unknown: 2, archived: 3 };

let totalChanged = 0;
for (const track of fs.readdirSync(TRACKS)) {
  const dir = path.join(TRACKS, track, 'products');
  const doc = path.join(TRACKS, track, '_category.md');
  if (!fs.existsSync(dir) || !fs.existsSync(doc)) continue;
  const rows = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const fm = parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf8'));
    return {
      id: fm.id || f.replace(/\.md$/, ''),
      name: fm.name || f.replace(/\.md$/, ''),
      vendor: fm.vendor || '—',
      form: FORM[fm.form] || fm.form || '—',
      conf: EVIDENCE[fm.confidence] || fm.confidence || '—',
      life: LIFE[fm.lifecycle] || fm.lifecycle || '—',
      order: LIFE_ORDER[fm.lifecycle] ?? 9,
    };
  }).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'zh'));

  const table = [
    '| id | 名称 | 厂商 | 形态 | 状态 |',
    '|---|---|---|---|---|',
    ...rows.map((r) => `| \`${r.id}\` | ${r.name.replace(/\|/g, '\\|')} | ${String(r.vendor).replace(/\|/g, '\\|')} | ${r.form} | ${r.conf} · ${r.life} |`),
    '',
    `> 共 **${rows.length}** 份。本清单由 \`scripts/gen-category-docs.mjs\` 从 \`products/*.md\` 自动生成；改档案后重跑脚本，不要手改表格。`,
    '',
    '> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。',
      '',
  ].join('\n');

  const raw = fs.readFileSync(doc, 'utf8');
  const start = raw.search(/^##\s+收录对象/m);
  if (start === -1) { console.error(`跳过 ${track}：找不到「## 收录对象」`); continue; }
  const before = raw.slice(0, start);
  // 收录对象通常是最后一节；若后面还有二级标题，保留后续内容。
  const nextHeading = raw.indexOf('\n## ', start + 5);
  const rest = nextHeading === -1 ? '' : raw.slice(nextHeading + 1);
  const next = `${before}## 收录对象（${rows.length} 份）\n\n${table}${rest ? `\n${rest}` : ''}`;
  if (next !== raw) {
    fs.writeFileSync(doc, next, 'utf8');
    console.log(`${track}: ${rows.length} 份`);
    totalChanged++;
  }
}
console.log(`\n更新 ${totalChanged} 个类目声明`);
