// 把 meta-cache.json 的字段合并进 data/series/*.json 的成员对象。
// 与 backfill-meta.mjs 分开：那个只管抓，这个只管写。改字段口径时重跑这个即可。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SERIES_DIR = path.join(ROOT, 'data', 'series');
const CACHE = path.join(ROOT, 'data', 'meta-cache.json');

const cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
const files = fs.readdirSync(SERIES_DIR).filter((f) => f.endsWith('.json')).sort();

let touched = 0;
const problems = [];

for (const f of files) {
  const fp = path.join(SERIES_DIR, f);
  const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
  let dirty = false;

  for (const m of j.members) {
    const c = cache[m.repo];
    if (!c) { problems.push(`${m.repo} 无缓存`); continue; }
    if (c._fail) { problems.push(`${m.repo} 采集失败 ${c._fail}`); continue; }

    // 官方申报总参：与 derive-params.mjs 的实测反推互为交叉验证。
    // MoE 只给总参，激活数仍不可得 —— 保持诚实标注，不猜。
    if (c.safetensorsTotal) m.declaredParams = c.safetensorsTotal;
    if (c.safetensorsBreakdown) m.declaredBreakdown = c.safetensorsBreakdown;
    if (c.createdAt) m.createdAt = c.createdAt;
    if (c.libraryName) m.libraryName = c.libraryName;
    if (c.pipelineTag) m.pipelineTag = c.pipelineTag;
    if (c.tags?.length) m.tags = c.tags;
    if (c.configArch?.length) m.hfArch = c.configArch;
    if (c.configModelType) m.modelType = c.configModelType;
    if (c.inference) m.inference = c.inference;
    if (c.usedStorage) m.usedStorage = c.usedStorage;
    if (c.gated !== null) m.gated = c.gated;
    if (c.license) {
      // 只在原值缺失时补，不覆盖已有的真实值
      if (!m.license) m.license = c.license;
      if (!m.licenseName && c.licenseName) m.licenseName = c.licenseName;
      if (!m.licenseLink && c.licenseUrl) m.licenseLink = c.licenseUrl;
    }
    if (c.baseModelField) m.baseModel = c.baseModelField;
    dirty = true;
  }

  if (dirty) {
    fs.writeFileSync(fp, JSON.stringify(j, null, 1), 'utf8');
    touched++;
    console.log('  ✓ ' + f);
  }
}

console.log(`\n更新 ${touched} 个系列文件`);
if (problems.length) {
  console.log('问题 ' + problems.length + ' 处：');
  for (const p of problems) console.log('  ! ' + p);
}

// 合并后自检：还有哪些成员缺关键字段
const MUST = ['params', 'license', 'licenseLink', 'createdAt', 'role', 'architecture', 'contextLength', 'downloads', 'lastModified', 'hfArch'];
console.log('\n合并后自检：');
let bad = 0;
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(SERIES_DIR, f), 'utf8'));
  for (const m of j.members) {
    const vArch = [...new Set((m.variants || []).map((v) => v.architecture).filter(Boolean))];
    const vCtx = [...new Set((m.variants || []).map((v) => v.contextLength).filter(Boolean))];
    const miss = MUST.filter((k) => {
      if (k === 'architecture') return !m.architecture && !vArch.length;
      if (k === 'contextLength') return !m.contextLength && !vCtx.length;
      const x = m[k];
      return x === undefined || x === null || x === '' || (Array.isArray(x) && !x.length);
    });
    if (miss.length) { bad++; console.log(`  ✗ ${m.repo} 缺 ${miss.join(', ')}`); }
  }
}
console.log(bad === 0 ? '  ✓ 11 个成员关键字段全部齐备' : `  仍缺 ${bad} 个成员`);
