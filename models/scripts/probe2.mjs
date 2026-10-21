import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// 探针 2：文件大小从哪来 + bartowski 仓库名核对
const MIRROR = 'https://hf-mirror.com';

// 1) tree API 能否拿到 size
const t = await fetch(`${MIRROR}/api/models/unsloth/Qwen3-30B-A3B-GGUF/tree/main?recursive=1`);
console.log('tree status', t.status);
if (t.ok) {
  const arr = await t.json();
  const ggufs = arr.filter((x) => x.path.endsWith('.gguf') && x.type === 'file');
  console.log('gguf count', ggufs.length);
  for (const g of ggufs.slice(0, 6)) console.log('  ', g.path, (g.size / 1e9).toFixed(2) + 'GB', 'lfs' in g ? 'has-lfs' : 'no-lfs');
  fs.writeFileSync(path.resolve(HERE, '..', 'docs', 'probe-tree.json'), JSON.stringify(ggufs, null, 2));
}

// 2) bartowski 到底叫什么
for (const q of ['Qwen3-30B-A3B-GGUF', 'Qwen3-30B-A3B']) {
  const r = await fetch(`${MIRROR}/api/models?search=${encodeURIComponent(q)}&author=bartowski&limit=5`);
  const j = r.ok ? await r.json() : [];
  console.log('bartowski search', q, '->', j.map((x) => x.id).join(' | '));
}

// 3) 搜索接口能否按 quantizer 名过滤 + GGUF 库标签
const r3 = await fetch(`${MIRROR}/api/models?search=Qwen3-30B-A3B&filter=gguf&limit=20`);
const j3 = r3.ok ? await r3.json() : [];
console.log('filter=gguf ->', j3.map((x) => x.id).join(' | '));
