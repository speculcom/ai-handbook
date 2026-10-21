import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// ============================================================================
// 选型方法 v1 —— 从「实际被下载的 GGUF 量化仓」反推最热门的基础模型
// ----------------------------------------------------------------------------
// 为什么这么做：手工挑模型 = 拍脑袋。HF 的 downloads 字段是真实下载次数，
// 而 filter=gguf&sort=downloads 返回的就是「本地部署圈真正在用的量化版」TOP N。
// 从这些仓名反推基础模型，得到的是实测热度而非印象。
//
// 四个维度（全部可复现、可核验）：
//   D1 量化热度  头部量化仓 downloads 之和的 log 值     权重 40
//   D2 量化广度  有多少家量化者做了它（竞争充分度）      权重 25
//   D3 规模可及性 是否存在单卡可跑的密集档（7~35B）        权重 20
//   D4 基础新鲜度 官方仓 lastModified 距今                权重 15
//
// 输出：_data/models/docs/selection-report.json
// 时间预算：约 60~90 秒（受 HF 响应速度影响）
// ============================================================================

const MIRROR = 'https://hf-mirror.com';
const OUT = path.resolve(HERE, '..');
const NOW = new Date('2026-09-30');

const log10 = (n) => Math.log10(Math.max(1, n));
const daysSince = (iso) => (iso ? (NOW - new Date(iso)) / 86400000 : 9999);

async function api(p, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(MIRROR + p, { signal: AbortSignal.timeout(20000) });
      if (r.ok) return await r.json();
      if (r.status === 429 || r.status >= 500) { await sleep(1500); continue; }
      return null;
    } catch (e) {
      if (i === tries - 1) return null;
      await sleep(1200);
    }
  }
  return null;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── D1/D2：拉全局最热门的 GGUF 量化仓（三页，覆盖足够多的量化者） ──────────
console.log('[1/3] 拉取 GGUF 量化仓 TOP 榜（按 downloads）…');
const ggufRepos = [];
for (const p of [0, 50, 100]) {
  const j = await api(`/api/models?filter=gguf&sort=downloads&direction=-1&limit=50&skip=${p}&full=false`);
  if (j) ggufRepos.push(...j);
  await sleep(300);
}
console.log(`      取到 ${ggufRepos.length} 个量化仓`);

// ── 归组：仓名 → 基础模型 key ────────────────────────────────────────────
// 规则：取 owner 后第一段为 "Org_Model"，否则取 model 段去掉后缀修饰
const GROUP_NOISE = /(gguf|fp8|int4|awq|gptq|q4_0|q4_k_m|q4_k_s|q5_k_m|q6_k|q8_0|iq4|ud-q|uncensored|heretic|abliterated|imatrix|nsfw|roleplay)/i;

function baseKey(repoId) {
  const [owner, ...restParts] = repoId.split('/');
  let name = restParts.join('/');
  // "Qwen_Qwen3.8-27B-GGUF" → "Qwen3.8-27B"
  if (owner.toLowerCase() === 'bartowski' || owner.toLowerCase() === 'mradermacher') {
    name = name.replace(/^[A-Za-z0-9\.]+?_/, '');
  }
  name = name.replace(/[-_]GGUF$/i, '');
  // 去掉尾部量化档位标记
  const parts = name.split('-');
  while (parts.length > 1 && GROUP_NOISE.test(parts[parts.length - 1])) parts.pop();
  return parts.join('-');
}

// 找官方基础仓：只认已知厂商 owner
const VENDOR_OWNERS = new Set([
  'Qwen', 'meta-llama', 'deepseek-ai', 'zai-org', 'mistralai', 'google', 'openai',
  'microsoft', 'openbmb', 'internlm', 'moonshotai', 'nvidia', 'allenai', 'ibm-granite',
  'tiiuae', 'CohereLabs', 'HuggingFaceTB', 'unsloth', 'NousResearch', 'LiquidAI',
]);

const groups = new Map();
for (const r of ggufRepos) {
  const key = baseKey(r.id);
  if (!key) continue;
  if (!groups.has(key)) groups.set(key, { key, repos: [] });
  groups.get(key).repos.push(r);
}
console.log(`      归组为 ${groups.size} 个基础模型`);

// ── 查官方仓（拿 license / 架构 / 上下文 / 新鲜度） ──────────────────────
console.log('[2/3] 解析各组的基础模型仓（核 license / 架构 / 上下文）…');
const candidates = [];
const topGroups = [...groups.values()]
  .sort((a, b) => b.repos.reduce((s, r) => s + (r.downloads || 0), 0) -
                    a.repos.reduce((s, r) => s + (r.downloads || 0), 0))
  .slice(0, 30);

let done = 0;
for (const g of topGroups) {
  // 官方仓候选：owner 在厂商列表里
  const officialRepo = g.repos.find((r) => VENDOR_OWNERS.has(r.id.split('/')[0]) && !/GGUF$/i.test(r.id.split('/')[1] || ''))
    || g.repos.find((r) => r.id.split('/')[0] === 'Qwen' || r.id.split('/')[0] === 'unsloth');
  let meta = null;
  if (officialRepo) {
    const id = officialRepo.id;
    const isGgufOfficial = /GGUF$/i.test(id);
    const target = isGgufOfficial ? id.replace(/-GGUF$/i, '') : id;
    meta = await api(`/api/models/${target}`);
    if (!meta && isGgufOfficial) meta = await api(`/api/models/${id}`);
    await sleep(250);
  }
  done++;
  process.stdout.write(`\r      ${done}/${topGroups.length}`);

  const dlSum = g.repos.reduce((s, r) => s + (r.downloads || 0), 0);
  const quantizerSet = new Set(g.repos.map((r) => r.id.split('/')[0]));
  candidates.push({
    key: g.key,
    officialRepo: meta ? meta.id : null,
    baseModelField: meta?.cardData?.base_model || meta?.cardData?.base_model?.[0] || null,
    license: meta?.cardData?.license || null,
    pipeline: meta?.pipeline_tag || null,
    architecture: meta?.gguf?.architecture || null,
    contextLength: meta?.gguf?.context_length || null,
    baseDownloads: meta?.downloads || officialRepo?.downloads || 0,
    baseLikes: meta?.likes || 0,
    baseLastModified: meta?.lastModified || officialRepo?.lastModified || null,
    ggufTotalDownloads: dlSum,
    ggufRepoCount: g.repos.length,
    quantizers: [...quantizerSet],
    topRepos: g.repos.slice(0, 6).map((r) => ({ id: r.id, downloads: r.downloads, likes: r.likes })),
  });
}
process.stdout.write('\n');

// ── D3：规模可及性（从仓名解析参数量，判断有无单卡档） ────────────────────
function parseParams(s) {
  const m = String(s).match(/(\d+(?:\.\d+)?)\s*B\b/i);
  return m ? parseFloat(m[1]) : null;
}
function sizeAccessible(key) {
  // 找 key 里的最大参数量标记（B / A##B）
  const b = parseParams(key);
  if (b) return b >= 6 && b <= 40 ? 1 : b > 40 ? 0.4 : 0.8;
  // MoE 形式 A##B：A3B 激活小，也算可及
  const moe = key.match(/(\d+)A(\d+)B/i);
  if (moe) return 0.9;
  return 0.5;
}

// ── 打分 ─────────────────────────────────────────────────────────────────
const maxDl = Math.max(...candidates.map((c) => Math.log10(c.ggufTotalDownloads + 1)));
for (const c of candidates) {
  c.score = {
    D1: (log10(c.ggufTotalDownloads + 1) / maxDl) * 40,
    D2: Math.min(1, c.ggufRepoCount / 8) * 25,
    D3: sizeAccessible(c.key) * 20,
    D4: Math.max(0, 1 - daysSince(c.baseLastModified) / 540) * 15,
  };
  c.total = +(c.score.D1 + c.score.D2 + c.score.D3 + c.score.D4).toFixed(1);
}

candidates.sort((a, b) => b.total - a.total);

const report = {
  generatedAt: new Date().toISOString(),
  method: {
    source: `${MIRROR}/api/models?filter=gguf&sort=downloads&direction=-1`,
    dimensions: { D1: '量化热度 40', D2: '量化广度 25', D3: '规模可及性 20', D4: '基础新鲜度 15' },
    note: 'downloads 为 HF 公开字段，本站不下载任何权重文件。',
  },
  candidates,
};
fs.mkdirSync(`${OUT}/docs`, { recursive: true });
fs.writeFileSync(`${OUT}/docs/selection-report.json`, JSON.stringify(report, null, 2));

// ── 打印榜单 ─────────────────────────────────────────────────────────────
console.log('\n名次  分数  D1   D2   D3   D4   基础模型(官方仓)                 许可        量化仓数 下载量        天数');
console.log('─'.repeat(118));
candidates.slice(0, 25).forEach((c, i) => {
  const official = c.officialRepo || '(未解析)';
  console.log(
    String(i + 1).padStart(3) + '  ' +
    String(c.total).padStart(5) + ' ' +
    c.score.D1.toFixed(1).padStart(4) + ' ' +
    c.score.D2.toFixed(1).padStart(4) + ' ' +
    c.score.D3.toFixed(1).padStart(4) + ' ' +
    c.score.D4.toFixed(1).padStart(4) + '  ' +
    official.slice(0, 34).padEnd(34) + ' ' +
    String(c.license || '—').slice(0, 12).padEnd(12) + ' ' +
    String(c.ggufRepoCount).padStart(4) + '  ' +
    String(c.ggufTotalDownloads).padStart(10) + '  ' +
    String(Math.round(daysSince(c.baseLastModified))).padStart(5)
  );
});
