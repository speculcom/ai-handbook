// 诊断：MiniCPM5-2B 为什么 0 个量化仓 + 验证 base_model 锚定法
const MIRROR = 'https://hf-mirror.com';
const get = async (p) => { try { const r = await fetch(MIRROR + p, { signal: AbortSignal.timeout(20000) }); return r.ok ? await r.json() : null; } catch { return null; } };

console.log('--- 1) MiniCPM5-2B 搜索结果 raw');
const s = await get('/api/models?search=MiniCPM5-2B&filter=gguf&limit=30&sort=downloads&direction=-1');
for (const m of s || []) console.log('   ', m.id, m.downloads);

console.log('\n--- 2) 官方 openbmb/MiniCPM5-2B-GGUF 详情');
const d = await get('/api/models/openbmb/MiniCPM5-2B-GGUF');
console.log('   ', d ? d.id : 'null', '| base_model =', JSON.stringify(d?.cardData?.base_model));
console.log('    gguf =', JSON.stringify(d?.gguf));

console.log('\n--- 3) tree 拿文件');
const t = await get('/api/models/openbmb/MiniCPM5-2B-GGUF/tree/main?recursive=1');
console.log('   ', t ? Array.isArray(t) ? t.length + ' entries' : typeof t : 'null');
if (Array.isArray(t)) for (const f of t.slice(0, 8)) console.log('     ', f.type, f.path, f.size);

console.log('\n--- 4) 验证 base_model 锚定：搜 Qwen3.8-27B 候选仓，看谁的 base_model 精确等于 Qwen/Qwen3.8-27B');
const q = await get('/api/models?search=Qwen3.8-27B&filter=gguf&limit=30&sort=downloads&direction=-1');
let hit = 0, miss = 0;
for (const m of (q || []).slice(0, 12)) {
  const md = await get('/api/models/' + m.id);
  const bm = md?.cardData?.base_model;
  const raw = JSON.stringify(bm);
  const ok = raw && raw.includes('Qwen/Qwen3.8-27B') && !raw.includes('Distill');
  if (ok) hit++; else miss++;
  console.log('   ', ok ? '✓' : '✗', m.id.slice(0, 48).padEnd(48), '→', raw?.slice(0, 70));
}
console.log(`   命中 ${hit} / 误配 ${miss}`);
