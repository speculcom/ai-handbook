// 补采 A 区缺失字段（不改主采集脚本，避免重跑 5 分钟限流）。
//
// 为什么要补：首轮 collect-models.mjs 只抓了 license / downloads / likes /
// lastModified / pipeline，漏掉了 HF API 其实全都返回的字段：
//   createdAt（发布日）、library_name、tags、gated、safetensors（官方申报总参）、
//   config.architectures、inference（推理可用性）。
// 另有 4 个成员缺 licenseLink —— cardData.license_link 这条路走不通
// （HF 只在极少数仓写），改用「SPDX 许可 id → 官方文本 URL」映射补齐。
//
// 产物：data/meta-cache.json（原始快照，可重复使用，不再打网络）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SERIES_DIR = path.join(ROOT, 'data', 'series');
const CACHE = path.join(ROOT, 'data', 'meta-cache.json');

const HOST = 'https://hf-mirror.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

// SPDX 许可 id → 官方文本 URL。HF 的 cardData.license_link 绝大多数仓不填，
// 但用户要看「许可原文」时必须有个稳定去处，不能指向搜索结果。
const LICENSE_URL = {
  'apache-2.0': 'https://www.apache.org/licenses/LICENSE-2.0',
  'mit': 'https://opensource.org/license/mit',
  'bsd-3-clause': 'https://opensource.org/license/bsd-3-clause',
  'bsd-2-clause': 'https://opensource.org/license/bsd-2-clause',
  'cc-by-4.0': 'https://creativecommons.org/licenses/by/4.0/legalcode',
  'cc-by-sa-4.0': 'https://creativecommons.org/licenses/by-sa/4.0/legalcode',
  'cc-by-nc-4.0': 'https://creativecommons.org/licenses/by-nc/4.0/legalcode',
  'cc0-1.0': 'https://creativecommons.org/publicdomain/zero/1.0/legalcode',
  'llama3.3': 'https://llama.meta.com/llama3_3/license/',
  'llama3.2': 'https://llama.meta.com/llama3_2/license/',
  'llama3.1': 'https://llama.meta.com/llama3_1/license/',
  'gemma': 'https://ai.google.dev/gemma/terms',
  'qwen': 'https://huggingface.co/Qwen/Qwen3.8-27B/blob/main/LICENSE',
  'mit-0': 'https://github.com/aws/mit-0',
  'openrail': 'https://www.licenses.ai/',
  'mulan-2.0': 'https://license.modelscope.cn/Mulan-2.0',
  'other': null,
  'unknown': null,
};

// tags 里绝大多数是框架/格式噪声（transformers、region:us…）。只留下对
// 「本地部署要下载哪个量化版」真正有决策价值的几类。
//
// 注意 base_model：HF tags 里是裸的 `base_model:`（冒号后为空），
// 真正的基座名在 cardData.base_model。所以 base_model 走独立通道，不走 tags。
const TAG_DROP = /^(?:base_model|region|license_)/;

const TAG_PATTERNS = [
  /^license:(.+)$/,                                  // 许可（权威来源是 cardData，这里只留个交叉核对）
  /^arxiv:(\d{4}\.\d{4,5})$/,                        // 论文编号
  /^(?:text-generation|text-to-image|image-text-to-text|automatic-speech-recognition|token-classification|fill-mask|question-answering|summarization|translation|feature-extraction|sentence-similarity|zero-shot-classification|reranking|tabular|object-detection|image-classification|image-segmentation|depth-estimation|image-to-image|text-to-speech|video-text-to-text|conversational)$/,
  /^(?:vllm|llama\.cpp|mlx|onnx|openvino|safetensors|gguf|text-generation-inference|tgi|transformers\.js|webgpu|webnn|openvino_genai|candle|sgml|deepspeed|peft|trl|bitsandbytes|compressed-tensors|quanto|autoawq|gptq|awq|marlin)$/i,
];

function keepTags(tags) {
  const out = [];
  for (const t of tags || []) {
    if (TAG_DROP.test(t)) continue;
    if (t === 'safetensors') continue;                 // 每个仓都有，等于没信息
    const hit = TAG_PATTERNS.find((re) => re.test(t));
    if (!hit) continue;
    let v = t;
    if (hit === TAG_PATTERNS[0]) v = 'license:' + t.slice(8);       // license:xxx → 规范写法
    if (hit === TAG_PATTERNS[1]) v = 'arXiv:' + t.slice(6);         // arxiv:2606.19348 → arXiv:2606.19348
    if (!out.includes(v)) out.push(v);
  }
  return out;
}

// 自定义许可（license=other）没有统一官方文本，但多数发布方在自己的
// model card 或官方站点给了专有条款。这类必须能点到原文，否则
// 「以发布页原文为准」这句话对用户没有落脚点。
function customLicenseUrl(b) {
  const name = String(b.cardData?.license_name || '').toLowerCase();
  const org = String(b.id || '').split('/')[0].toLowerCase();
  const id = String(b.id || '').toLowerCase();
  if (/qwen/.test(name) || /qwen/.test(org)) return `https://huggingface.co/${b.id}/blob/main/LICENSE`;
  if (/kimi/.test(name) || /kimi/.test(org)) return `https://huggingface.co/${b.id}/blob/main/LICENSE`;
  if (/glm/.test(name) || /zai/.test(org) || /zhipu/.test(org)) return `https://huggingface.co/${b.id}/blob/main/LICENSE`;
  // 其余回落到 model card 本身（#license 锚点直接跳到许可段）
  if (id) return `https://huggingface.co/${b.id}#license`;
  return null;
}

async function getModel(id) {
  const url = `${HOST}/api/models/${id}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 30000);
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: ctl.signal });
      clearTimeout(timer);
      if (res.status === 429) { await new Promise((r) => setTimeout(r, 3000 * attempt)); continue; }
      if (!res.ok) return { ok: false, status: res.status };
      return { ok: true, data: await res.json() };
    } catch (e) {
      if (attempt === 3) return { ok: false, err: String(e.message || e) };
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  return { ok: false, err: 'retry-exhausted' };
}

const files = fs.readdirSync(SERIES_DIR).filter((f) => f.endsWith('.json')).sort();
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};

console.log('补采 ' + files.length + ' 个系列的成员元数据\n');
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(SERIES_DIR, f), 'utf8'));
  for (const m of j.members) {
    if (cache[m.repo] && !cache[m.repo]._fail) { console.log(`  · ${m.repo} 已缓存`); continue; }
    process.stdout.write(`  → ${m.repo} ... `);
    const r = await getModel(m.repo);
    if (!r.ok) { console.log('✗ ' + (r.status || r.err)); cache[m.repo] = { _fail: r.status || r.err }; continue; }
    const b = r.data;
    const sf = b.safetensors || null;
    const st = sf && sf.total ? sf.total : null;
    cache[m.repo] = {
      createdAt: b.createdAt || null,
      libraryName: b.library_name || null,
      pipelineTag: b.pipeline_tag || null,
      tagsRaw: b.tags || [],
      tags: keepTags(b.tags),
      gated: b.gated ?? null,
      private: b.private ?? null,
      disabled: b.disabled ?? null,
      inference: b.inference || null,
      usedStorage: b.usedStorage ?? null,
      license: b.cardData?.license || null,
      licenseName: b.cardData?.license_name || null,
      licenseLinkRaw: b.cardData?.license_link || null,
      licenseUrl: LICENSE_URL[String(b.cardData?.license || '').toLowerCase()] ?? customLicenseUrl(b),
      configArch: b.config?.architectures || null,
      configModelType: b.config?.model_type || null,
      safetensorsTotal: st,
      safetensorsBreakdown: sf ? Object.fromEntries(Object.entries(sf).filter(([k]) => k !== 'total')) : null,
      baseModelField: b.cardData?.base_model || null,
      modelIndexName: b['model-index']?.name?.[0] || null,
      sha: b.sha || null,
    };
    console.log(`✓ 创建=${(cache[m.repo].createdAt || '').slice(0, 10)} 官方总参=${st ? (st / 1e9).toFixed(2) + 'B' : '—'} tags=${cache[m.repo].tags.length}`);
  }
}

fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1), 'utf8');
console.log('\n已写入 ' + CACHE);
