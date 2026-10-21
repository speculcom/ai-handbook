// 探针：看清 hf-mirror /api/models/{id} 返回里我们真正要用的字段
// 目的：确定 data/series/*.json 的 schema，不靠猜字段名
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MIRROR = 'https://hf-mirror.com';

const ids = [
  'Qwen/Qwen3-30B-A3B',
  'unsloth/Qwen3-30B-A3B-GGUF',
  'bartowski/Qwen3-30B-A3B-GGUF',
];

for (const id of ids) {
  const r = await fetch(`${MIRROR}/api/models/${id}`);
  console.log('---', id, r.status);
  if (!r.ok) { console.log('  skip'); continue; }
  const j = await r.json();
  const out = {
    id: j.id,
    downloads: j.downloads,
    likes: j.likes,
    lastModified: j.lastModified,
    pipeline_tag: j.pipeline_tag,
    library_name: j.library_name,
    tags: j.tags,
    cardData: j.cardData,
    gguf: j.gguf,
    siblings_count: (j.siblings || []).length,
    siblings_sample: (j.siblings || []).slice(0, 5).map((s) => s.rfilename),
  };
  fs.writeFileSync(
    path.join(HERE, '..', 'docs', `probe-${id.replace(/[/]/g, '_')}.json`),
    JSON.stringify(out, null, 2)
  );
  console.log('  gguf:', JSON.stringify(j.gguf));
  console.log('  cardData:', JSON.stringify(j.cardData).slice(0, 400));
  console.log('  siblings:', out.siblings_count, out.siblings_sample.join(' | '));
}
