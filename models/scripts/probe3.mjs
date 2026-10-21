// 探针 3：确认 Qwen 当前最新的 27B 级模型到底叫什么（不靠记忆，不猜）
const MIRROR = 'https://hf-mirror.com';

async function list(q, extra = '') {
  const r = await fetch(`${MIRROR}/api/models?search=${encodeURIComponent(q)}&author=Qwen&limit=50&sort=lastModified&direction=-1${extra}`);
  if (!r.ok) return [];
  return r.json();
}

const queries = ['Qwen3.8', 'Qwen3.5', 'Qwen3-Next', 'Qwen3-27B', 'Qwen3-32B', 'Qwen'];
for (const q of queries) {
  const j = await list(q);
  console.log('===', q, '->', j.length);
  for (const m of j.slice(0, 14)) {
    console.log('   ', m.id.padEnd(52), 'dl=' + String(m.downloads).padStart(8), m.createdAt?.slice(0, 10));
  }
}
