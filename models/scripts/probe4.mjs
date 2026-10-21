// 探针 4：Qwen3.8-27B 的量化仓库覆盖 + 其他候选最新模型摸底
const MIRROR = 'https://hf-mirror.com';
const get = async (p) => { const r = await fetch(MIRROR + p); return r.ok ? await r.json() : null; };

// 1) Qwen3.8-27B 的所有 GGUF 量化仓库
const q = await get('/api/models?search=Qwen3.8-27B&filter=gguf&limit=40&sort=downloads&direction=-1');
console.log('=== Qwen3.8-27B GGUF 量化仓库', q?.length);
for (const m of q || []) console.log('   ', m.id.padEnd(56), 'dl=' + String(m.downloads).padStart(8), 'likes=' + m.likes);

// 2) 其他厂商最新代摸底（只看 dense 中等规模 + 最新）
const cands = [
  ['meta-llama', 'Llama'], ['deepseek-ai', 'DeepSeek'], ['zai-org', 'GLM'],
  ['mistralai', 'Mistral'], ['google', 'Gemma'], ['openai', 'gpt-oss'],
  ['microsoft', 'Phi'], ['openbmb', 'MiniCPM'], ['internlm', 'InternLM'],
  ['moonshotai', 'Kimi'], ['nvidia', 'Nemotron'], ['allenai', 'OLMo'],
];
for (const [au, label] of cands) {
  const r = await fetch(`${MIRROR}/api/models?author=${au}&limit=60&sort=lastModified&direction=-1`);
  if (!r.ok) { console.log('===', label, au, 'HTTP', r.status); continue; }
  const arr = await r.json();
  const base = arr.filter((m) => !/-(GGUF|FP8|GPTQ|AWQ|awq|INT4|int4|int8|BNB|NVFP4|W4A16)$/.test(m.id) && !/SAE-Res|Tiny|test|-IT-|preview/i.test(m.id));
  console.log('===', label, '(' + au + ')', 'total', arr.length, '→ 非量化近期:');
  for (const m of base.slice(0, 8)) console.log('   ', m.id.padEnd(50), 'dl=' + String(m.downloads).padStart(8), m.createdAt?.slice(0, 10));
}
