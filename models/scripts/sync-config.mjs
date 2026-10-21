// 把 config.js 里的人工字段（label / params / role / note / released / summary …）
// 同步进 data/series/*.json。
//
// 为什么需要：config.js 是人工撰写的真相源（文案、定位、措辞），
// series/*.json 是采集脚本产出的数据层。人工改文案只该动 config.js，
// 不该手改 7 个 JSON —— 之前改 params 就踩过：改了 config 忘了同步，
// 站点还显示旧值。
//
// 同步方向单向且保守：只覆盖「人工字段」，绝不碰采集来的量化数据
// （files / totalGB / coverage / downloads …）。采集层永远是数据源。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERIES } from '../config.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(HERE, '..', 'data', 'series');

// 人工字段白名单。改 config.js 里的其他键不会自动同步，
// 需要时往这里加一行 —— 宁可漏同步，也不要误覆盖采集数据。
const MANUAL = ['label', 'params', 'role', 'note'];

let changed = 0;
const diffs = [];

for (const s of SERIES) {
  const fp = path.join(DIR, s.code + '.json');
  if (!fs.existsSync(fp)) { console.log('  ! 缺文件 ' + s.code + '.json'); continue; }
  const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
  let dirty = false;

  // 系列级人工字段
  for (const k of ['released', 'summary', 'positions', 'name', 'vendor', 'family']) {
    if (s[k] === undefined) continue;
    if (JSON.stringify(j[k]) !== JSON.stringify(s[k])) {
      diffs.push(`${s.code}.${k}: ${JSON.stringify(j[k])} → ${JSON.stringify(s[k])}`);
      j[k] = s[k];
      dirty = true;
    }
  }
  if (s.sources) { j.sources = { ...j.sources, ...s.sources }; }

  // 成员级人工字段：按 repo 匹配
  for (const m of s.members) {
    const t = j.members.find((x) => x.repo === m.repo);
    if (!t) { console.log(`  ! ${s.code} 中找不到成员 ${m.repo}`); continue; }
    for (const k of MANUAL) {
      if (m[k] === undefined) continue;
      if (JSON.stringify(t[k]) === JSON.stringify(m[k])) continue;
      diffs.push(`${m.repo}.${k}: ${JSON.stringify(t[k])} → ${JSON.stringify(m[k])}`);
      t[k] = m[k];
      dirty = true;
    }
  }

  if (dirty) {
    fs.writeFileSync(fp, JSON.stringify(j, null, 1), 'utf8');
    changed++;
    console.log('  ✓ ' + s.code + '.json');
  }
}

console.log(`\n同步 ${changed} 个系列文件，共 ${diffs.length} 处字段更新`);
for (const d of diffs) console.log('  · ' + d);
if (!diffs.length) console.log('  （无差异，config.js 与数据层已一致）');
