import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// 探针 5：定稿名单核对 —— 各厂商「最新代 + 本地可跑规模(7~35B 或 MoE 激活小)」
const MIRROR = 'https://hf-mirror.com';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(p) { try { const r = await fetch(MIRROR + p, { signal: AbortSignal.timeout(20000) }); return r.ok ? await r.json() : null; } catch { return null; } }

// 候选：厂商 + 我从 v2 榜看到的最新代代表
const CAND = [
  ['Qwen',       'Qwen3.8-27B'],
  ['Qwen',       'Qwen3.8-Flash-Next'],
  ['google',     'gemma-4-26B-A4B-it'],
  ['google',     'gemma-4-31B-it'],
  ['google',     'gemma-4-E4B-it'],
  ['zai-org',    'GLM-5.3'],
  ['zai-org',    'GLM-5.3-Flash'],
  ['deepseek-ai','DeepSeek-V4-Flash'],
  ['mistralai',  'Mistral-Small-4-119B-2603'],
  ['meta-llama', 'Llama-4-Scout-17B-16E-Instruct'],
  ['openai',     'gpt-oss-20b'],
  ['moonshotai', 'Kimi-K3'],
  ['MiniMaxAI',  'MiniMax-M3'],
  ['openbmb',    'MiniCPM5-2B'],
  ['internlm',   'Intern-S2-397B'],
];

const rows = [];
for (const [owner, name] of CAND) {
  const id = `${owner}/${name}`;
  const meta = await api(`/api/models/${id}`);
  await sleep(150);
  if (!meta) { console.log('!! 404/受限', id); continue; }
  const gq = await api(`/api/models?search=${encodeURIComponent(name)}&filter=gguf&limit=60&sort=downloads&direction=-1`);
  await sleep(150);
  const quant = (gq || []).filter((m) => !/abliterated|uncensored|heretic|roleplay|tavern/i.test(m.id));
  const byQ = {};
  for (const q of quant) { const o = q.id.split('/')[0]; byQ[o] = (byQ[o] || 0) + (q.downloads || 0); }
  const topQ = Object.entries(byQ).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const row = {
    id, downloads: meta.downloads, likes: meta.likes,
    lastModified: meta.lastModified, createdAt: meta.createdAt,
    license: meta.cardData?.license || null,
    base_model: meta.cardData?.base_model || null,
    pipeline: meta.pipeline_tag,
    arch: meta.gguf?.architecture || null,
    ctx: meta.gguf?.context_length || null,
    ggufRepoCount: quant.length,
    ggufDl: quant.reduce((s, q) => s + (q.downloads || 0), 0),
    quantizers: topQ,
    officialGguf: quant.filter((q) => q.id.split('/')[0] === owner).map((q) => q.id),
  };
  rows.push(row);
  console.log(
    id.padEnd(42),
    'ctx=' + String(row.ctx || '—').padStart(7),
    'arch=' + String(row.arch || '—').padEnd(14),
    'lic=' + String(row.license || '—').padEnd(11),
    'gguf仓=' + String(row.ggufRepoCount).padStart(3),
    'gguf下载=' + String(Math.round(row.ggufDl / 1000) + 'k').padStart(7),
    '官方GGUF=' + row.officialGguf.length
  );
  console.log('        量化者:', topQ.map(([o, d]) => `${o}(${Math.round(d / 1000)}k)`).join(' '));
}

fs.writeFileSync(path.resolve(HERE, '..', 'docs', 'final-candidates.json'), JSON.stringify(rows, null, 2));
