import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// ============================================================================
// 选型 v2 —— 厂商定向摸底 + 降噪
// ----------------------------------------------------------------------------
// v1 的问题：TOP150 量化仓里 Qwen3.8-27B 的 abliterated/uncensored 二次发布仓
// 下载量极高，把榜单占满，且它们不是「基础模型的量化版」，是别人微调后的再发布。
// v2 做法：
//   a) 降噪：排除微调衍生仓（abliterated/uncensored/heretic/roleplay/RPO/TAVERN…）
//   b) 厂商定向：对每个厂商查最新代基础模型，再查它有没有 GGUF 量化覆盖
//   c) 只保留「有第三方 GGUF 量化」的系列——没量化就没必要上站
// ============================================================================

const MIRROR = 'https://hf-mirror.com';
const OUT = path.resolve(HERE, '..');
const NOW = new Date('2026-09-30');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const days = (iso) => (iso ? (NOW - new Date(iso)) / 86400000 : 9999);

async function api(p, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(MIRROR + p, { signal: AbortSignal.timeout(20000) });
      if (r.ok) return await r.json();
      if (r.status === 429 || r.status >= 500) { await sleep(1500); continue; }
      return null;
    } catch { if (i === tries - 1) return null; await sleep(1200); }
  }
  return null;
}

// 微调衍生仓特征：这些是「别人拿别人家权重再训/再剪」的再发布，不是量化版本
const DERIVED = /(abliterated|uncensored|heretic|roleplay|tavern|snexus|rori|abliterate|EfficientThink|GSQ-RCO|OrcaRouter|Swift-|Cerebellum|neo-max|twistturbo|obliterat)/i;

const VENDORS = [
  { key: 'qwen',    owner: 'Qwen',        label: '阿里 · 千问' },
  { key: 'gemma',   owner: 'google',      label: 'Google · Gemma' },
  { key: 'glm',     owner: 'zai-org',     label: '智谱 · GLM' },
  { key: 'deepseek',owner: 'deepseek-ai', label: 'DeepSeek' },
  { key: 'mistral', owner: 'mistralai',   label: 'Mistral' },
  { key: 'llama',   owner: 'meta-llama',  label: 'Meta · Llama' },
  { key: 'gptoss',  owner: 'openai',      label: 'OpenAI · gpt-oss' },
  { key: 'minicpm', owner: 'openbmb',     label: 'OpenBMB · MiniCPM' },
  { key: 'kimi',    owner: 'moonshotai',  label: '月之暗面 · Kimi' },
  { key: 'minimax', owner: 'MiniMaxAI',   label: 'MiniMax' },
  { key: 'internlm',owner: 'internlm',    label: '书生 · InternLM' },
  { key: 'gpt_oss_note', owner: 'ggml-org', label: 'ggml-org（llama.cpp 官方组织）' },
];

const results = [];
for (const v of VENDORS) {
  // 1) 该厂商全部仓，按下载排序
  const all = await api(`/api/models?author=${v.owner}&limit=200&sort=downloads&direction=-1`);
  if (!all) { console.log('!!', v.key, '列表失败'); continue; }

  // 2) 筛出「基础模型」：排除量化后缀、排除衍生微调、排除非文本生成
  const bases = all.filter((m) => {
    const n = m.id.split('/')[1] || '';
    if (DERIVED.test(n)) return false;
    if (/-(GGUF|FP8|FP4|GPTQ|AWQ|GPTQ-Int4|INT4|INT8|BNB|NVFP4|W4A16|BF16|AQLM)$/i.test(n)) return false;
    if (/SAE-Res|eagle|privacy|guard|safeguard|prompt-|colipri|timesfm|gnm|tipsv|classifier|Base\b|Bench|Tiny|preview|-IT-/i.test(n)) return false;
    if (m.pipeline_tag && !/text-generation|text-to-text|chat|fill-mask/.test(m.pipeline_tag)) return false;
    return true;
  });

  // 3) 对前 6 个高下载基础仓，查各自有没有 GGUF 量化覆盖
  const picked = [];
  for (const b of bases.slice(0, 6)) {
    const key = b.id.split('/')[1];
    const gq = await api(`/api/models?search=${encodeURIComponent(key)}&filter=gguf&limit=50&sort=downloads&direction=-1`);
    await sleep(200);
    const quant = (gq || []).filter((m) => {
      const owner = m.id.split('/')[0];
      const nm = m.id.split('/')[1] || '';
      if (DERIVED.test(nm)) return false;
      return owner !== v.owner || true; // 官方 GGUF 也算
    });
    if (quant.length === 0) continue;

    // 量化者分布
    const byQ = {};
    for (const q of quant) {
      const o = q.id.split('/')[0];
      byQ[o] = (byQ[o] || 0) + (q.downloads || 0);
    }
    const topQ = Object.entries(byQ).sort((a, b) => b[1] - a[1]).slice(0, 6);

    // 官方仓详情
    const meta = await api(`/api/models/${b.id}`);
    await sleep(200);

    const dlSum = quant.reduce((s, q) => s + (q.downloads || 0), 0);
    picked.push({
      vendor: v.key, vendorLabel: v.label,
      repo: b.id, url: `https://huggingface.co/${b.id}`,
      params: (key.match(/(\d+(?:\.\d+)?)B/i) || [])[1] ? (key.match(/(\d+(?:\.\d+)?)B/i)[1] + 'B') : null,
      denseOrMoE: /A\d+B/i.test(key) ? 'MoE' : 'Dense',
      license: meta?.cardData?.license || null,
      licenseLink: meta?.cardData?.license_link || null,
      pipeline: b.pipeline_tag,
      downloads: b.downloads, likes: b.likes,
      lastModified: b.lastModified, daysOld: Math.round(days(b.lastModified)),
      baseModelField: meta?.cardData?.base_model || null,
      ggufRepoCount: quant.length,
      ggufTotalDownloads: dlSum,
      quantizers: topQ.map(([o, d]) => ({ owner: o, downloads: d })),
      quantRepoSamples: quant.slice(0, 8).map((q) => q.id),
    });
  }
  results.push(...picked);
  const line = picked.map((p) => `${p.repo.split('/')[1]}(${p.ggufRepoCount}仓/${Math.round(p.ggufTotalDownloads / 1000)}k)`).join('  ');
  console.log(`[${v.label}] ${picked.length} 个可上站系列 → ${line || '（无 GGUF 覆盖）'}`);
}

results.sort((a, b) => b.ggufTotalDownloads - a.ggufTotalDownloads);
fs.writeFileSync(`${OUT}/docs/selection-v2.json`, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));

console.log('\n\n═══ 综合榜（按 GGUF 量化总下载量）═══');
console.log('下载量(k)  天数  规模      许可         系列');
console.log('─'.repeat(104));
for (const r of results.slice(0, 30)) {
  console.log(
    String(Math.round(r.ggufTotalDownloads / 1000)).padStart(8) + '  ' +
    String(r.daysOld).padStart(4) + '  ' +
    String(r.params || '—').padStart(7) + ' ' + r.denseOrMoE.padEnd(6) + ' ' +
    String(r.license || '—').slice(0, 12).padEnd(12) + ' ' +
    r.repo.split('/')[1]
  );
}
