// ============================================================================
// 系列名单 —— 当前 11 个系列
// ----------------------------------------------------------------------------
// 选型标准：
//   1. 是该厂商的当前最新代（老代不采，如 Qwen3-30B-A3B / Llama-3 / Gemma-3）
//   2. 有 GGUF 量化生态且下载量够大（说明本地部署圈真在用）
//      门槛：该模型的 GGUF 生态总量约 30 万（第一方 + 第三方合并看，不单看第三方）
//   3. 规模本地可跑（7~35B 密集，或 MoE）；实践口径是「有人真的在本地量化跑它」
//   4. 许可可核验（apache-2.0 / mit 优先；other 需标注原文链接）
//
// 「主流」不等于「有量化版可用」。响亮的大厂新系列量化采用常常很薄，
// 过线的是 Ornith-1.5 / Muse-Glimmer-30B / KAT-Coder-V2.5 / Laguna-XS-2.1 这一批。
// ============================================================================

export const SERIES = [
  {
    code: 'qwen3-8',
    name: { zh: '千问 3.8', en: 'Qwen3.8' },
    vendor: { zh: '阿里 · 通义千问', en: 'Alibaba Qwen' },
    family: 'qwen',
    released: '2026-08-05',
    summary: '阿里千问系列，本站收录 27B 密集模型与 Flash-Next 的量化信息；收录不代表性能排名。',
    positions: ['通用对话', '工具调用', '长上下文', '中文强项'],
    // 一个系列可有多个规格（各规格独立一节）
    members: [
      {
        repo: 'Qwen/Qwen3.8-27B',
        label: { zh: 'Qwen3.8 27B（密集）', en: 'Qwen3.8 27B (Dense)' },
        params: '27.8B 密集',
        role: { zh: '主力通用', en: 'Flagship general' },
        note: 'apache-2.0，702 万下载。本站量化对比的基准型号。',
      },
      {
        repo: 'Qwen/Qwen3.8-Flash-Next',
        label: { zh: 'Qwen3.8 Flash-Next', en: 'Qwen3.8 Flash-Next' },
        params: '180B 总参（MoE，激活数未公开）',
        role: { zh: '轻量 / 端侧', en: 'Lightweight' },
        note: '许可为 other，使用前须读发布页许可原文。',
      },
    ],
    sources: { official: 'https://huggingface.co/Qwen/Qwen3.8-27B' },
  },

  {
    code: 'gemma-4',
    name: { zh: 'Gemma 4', en: 'Gemma 4' },
    vendor: { zh: 'Google', en: 'Google' },
    family: 'gemma',
    released: '2026-06',
    summary: 'Google 开放权重系列，本站收录的三种规格各自都有量化覆盖。',
    positions: ['通用对话', 'MoE 稀疏', '小尺寸可跑'],
    members: [
      {
        repo: 'google/gemma-4-26B-A4B-it',
        label: { zh: 'Gemma 4 26B-A4B（MoE）', en: 'Gemma 4 26B-A4B (MoE)' },
        params: '25.8B 总参 / 4B 激活',
        role: { zh: '稀疏激活 MoE', en: 'Sparsely activated MoE' },
        note: 'MoE：总参约 26B，每 token 激活约 4B。激活参数不等于全部权重的内存需求，也不能单独推断延迟；还需核对硬件、量化与运行器。',
      },
      {
        repo: 'google/gemma-4-31B-it',
        label: { zh: 'Gemma 4 31B（密集）', en: 'Gemma 4 31B (Dense)' },
        params: '31.3B 密集',
        role: { zh: '31B 密集规格', en: '31B dense variant' },
        note: '同系列里最重的规格。',
      },
      {
        repo: 'google/gemma-4-E4B-it',
        label: { zh: 'Gemma 4 E4B（高效）', en: 'Gemma 4 E4B (Efficient)' },
        params: '8B 总参 / 4B 激活（E4B = 激活 4B）',
        role: { zh: '较小规格', en: 'Smaller variant' },
        note: '量化覆盖 34 家；实际内存占用还包括上下文缓存与运行器开销，不能只看名称中的 4B。',
      },
    ],
    sources: { official: 'https://huggingface.co/google/gemma-4-26B-A4B-it' },
  },

  {
    code: 'glm-5',
    name: { zh: 'GLM 5', en: 'GLM 5' },
    vendor: { zh: '智谱 AI', en: 'Zhipu AI' },
    family: 'glm',
    released: '2026-08-25',
    summary: '智谱开放权重系列；不同规格的许可分别标注，部署前核对对应版本与容量需求。',
    positions: ['通用对话', '工具调用', 'MIT 许可'],
    members: [
      {
        repo: 'zai-org/GLM-5.3',
        label: { zh: 'GLM 5.3（完整版）', en: 'GLM 5.3 (Full)' },
        params: '754B 总参（MoE，激活数未公开）',
        role: { zh: '旗舰', en: 'Flagship' },
        note: '许可为 other，须读发布页原文。',
      },
      {
        repo: 'zai-org/GLM-5.3-Flash',
        label: { zh: 'GLM 5.3 Flash', en: 'GLM 5.3 Flash' },
        params: '321B 总参（MoE，激活数未公开）',
        role: { zh: '轻量主力', en: 'Lightweight main' },
        note: '模型卡标注 MIT 许可；部署前仍需核对对应版本的许可原文、依赖与使用范围。',
      },
    ],
    sources: { official: 'https://huggingface.co/zai-org/GLM-5.3' },
  },

  {
    code: 'deepseek-v4',
    name: { zh: 'DeepSeek V4', en: 'DeepSeek V4' },
    vendor: { zh: 'DeepSeek', en: 'DeepSeek' },
    family: 'deepseek',
    released: '2026-09-10',
    summary: 'MIT 许可，量化生态活跃，antirez（Redis 作者、llama.cpp 生态参与者）维护量化版。',
    positions: ['通用对话', 'MIT 许可', '推理'],
    members: [
      {
        // 修正：原指向 `DeepSeek-V4-Flash`（2026-04-22），但 `released` 写的是 07-31，
        //   而 HF 上同一条线已有 `DeepSeek-V4-Flash-0731` 与更新的 `DeepSeek-V4.1-Flash`（2026-09-10）。
        //   「声明的最新代」与「实际取的仓」不一致，已改为最新代。
        repo: 'deepseek-ai/DeepSeek-V4.1-Flash',
        label: { zh: 'DeepSeek V4.1 Flash', en: 'DeepSeek V4.1 Flash' },
        params: '763B 总参（MoE，激活数未公开）',
        role: { zh: '通用主力', en: 'General' },
        note: 'MIT 许可，20 个第三方量化仓，antirez 一家 124 万下载（2026-10-30 复测）。',
      },
    ],
    sources: { official: 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash' },
  },

  {
    code: 'gpt-oss',
    name: { zh: 'gpt-oss', en: 'gpt-oss' },
    vendor: { zh: 'OpenAI', en: 'OpenAI' },
    family: 'gpt-oss',
    released: '2025-08-04',
    summary: 'OpenAI 开放权重系列，本站索引 20B 规格的量化信息；是否适合单卡取决于可用内存、量化和上下文配置。',
    positions: ['推理', 'MoE 稀疏', 'apache-2.0'],
    members: [
      {
        repo: 'openai/gpt-oss-20b',
        label: { zh: 'gpt-oss 20B', en: 'gpt-oss 20B' },
        params: '20B（MoE，约 3.6B 激活）',
        role: { zh: '20B MoE 规格', en: '20B MoE variant' },
        note: '模型卡标注 apache-2.0。量化覆盖与许可分别核对；下载量不代表质量或适用性。',
      },
    ],
    sources: { official: 'https://huggingface.co/openai/gpt-oss-20b' },
  },

  {
    code: 'kimi-k3',
    name: { zh: 'Kimi K3', en: 'Kimi K3' },
    vendor: { zh: '月之暗面', en: 'Moonshot AI' },
    family: 'kimi',
    released: '2026-06-13',
    summary: '月之暗面开放权重系列，快照收录 41 家量化仓；数量不代表模型质量或运行兼容性。',
    positions: ['通用对话', '长上下文'],
    members: [
      {
        repo: 'moonshotai/Kimi-K3',
        label: { zh: 'Kimi K3', en: 'Kimi K3' },
        params: '2780B 总参（MoE，激活数未公开）',
        role: { zh: '通用', en: 'General' },
        note: '许可为 other，须读发布页原文。',
      },
    ],
    sources: { official: 'https://huggingface.co/moonshotai/Kimi-K3' },
  },

  {
    code: 'minicpm5',
    name: { zh: 'MiniCPM 5', en: 'MiniCPM 5' },
    vendor: { zh: '面壁智能 · OpenBMB', en: 'OpenBMB' },
    family: 'minicpm',
    released: '2026-08-27',
    summary: '国产小尺寸代表，2B 规模适合低显存与端侧。',
    positions: ['端侧', '小尺寸', '中文强项'],
    members: [
      {
        repo: 'openbmb/MiniCPM5-2B',
        label: { zh: 'MiniCPM5 2B', en: 'MiniCPM5 2B' },
        params: '2.5B 密集',
        role: { zh: '端侧候选', en: 'On-device candidate' },
        note: '官方自己也出 GGUF（openbmb 249k 下载）。',
      },
    ],
    sources: { official: 'https://huggingface.co/openbmb/MiniCPM5-2B' },
  },

  // ── 以下 4 个系列按同一标准选出：GGUF 生态下载 + 许可可核验 + 厂商当前最新代 ──

  {
    code: 'ornith-1-5',
    name: { zh: 'Ornith 1.5', en: 'Ornith 1.5' },
    vendor: { zh: 'Ornith AI', en: 'Ornith AI' },
    family: 'ornith',
    released: '2026-08-18',
    summary: '模型卡标注 MIT 许可，两个规格都有 GGUF 量化覆盖；具体文件与版本见下表。',
    positions: ['通用对话', 'MIT 许可', 'MoE 稀疏'],
    members: [
      {
        repo: 'ornith-ai/Ornith-1.5-35B-A3B',
        label: { zh: 'Ornith 1.5 35B-A3B（MoE）', en: 'Ornith 1.5 35B-A3B (MoE)' },
        params: '35.95B 总参（MoE，激活数未公开）',
        role: { zh: '主力通用', en: 'Flagship general' },
        note: 'MIT 许可，59 个 GGUF 仓（第三方 58），官方自己也出 GGUF。',
      },
      {
        repo: 'ornith-ai/Ornith-1.5-9B',
        label: { zh: 'Ornith 1.5 9B（密集）', en: 'Ornith 1.5 9B (Dense)' },
        params: '9.65B 密集',
        role: { zh: '单卡可跑', en: 'Single-GPU' },
        note: 'MIT 许可，快照收录 43 个 GGUF 仓；第一方 GGUF 下载量为快照统计，不代表质量结论。',
      },
    ],
    sources: { official: 'https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B' },
  },

  {
    code: 'muse-glimmer',
    name: { zh: 'Muse Glimmer', en: 'Muse Glimmer' },
    vendor: { zh: 'Meta', en: 'Meta' },
    family: 'muse',
    released: '2026-08-09',
    summary: 'Meta 的开放权重系列，apache-2.0，量化覆盖横跨多家主力量化者。',
    positions: ['通用对话', 'apache-2.0'],
    members: [
      {
        repo: 'meta-models/Muse-Glimmer-30B',
        label: { zh: 'Muse Glimmer 30B', en: 'Muse Glimmer 30B' },
        params: '29.78B 总参',
        role: { zh: '通用主力', en: 'General' },
        note: 'apache-2.0，61 个 GGUF 仓（第三方 60），unsloth / LM Studio / bartowski 三家主力量化者都覆盖。',
      },
    ],
    sources: { official: 'https://huggingface.co/meta-models/Muse-Glimmer-30B' },
  },

  {
    code: 'kat-coder',
    name: { zh: 'KAT Coder V2.5', en: 'KAT Coder V2.5' },
    vendor: { zh: 'Kwaipilot', en: 'Kwaipilot' },
    family: 'kat',
    released: '2026-07-23',
    summary: '面向代码的开放权重系列，apache-2.0，34 个第三方量化仓。',
    positions: ['工具调用', '长上下文', 'apache-2.0'],
    members: [
      {
        repo: 'Kwaipilot/KAT-Coder-V2.5-Dev',
        label: { zh: 'KAT Coder V2.5 Dev', en: 'KAT Coder V2.5 Dev' },
        params: '34.66B 总参',
        role: { zh: '代码专用', en: 'Coding' },
        note: 'apache-2.0，34 个第三方量化仓（mudler 805k（APEX 仓，原 Dev-GGUF 仓已下架）/ bartowski 279k）。基准仓自身下载量不高，但量化采用集中。',
      },
    ],
    sources: { official: 'https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev' },
  },

  {
    code: 'laguna',
    name: { zh: 'Laguna 2.1', en: 'Laguna 2.1' },
    vendor: { zh: 'Poolside', en: 'Poolside' },
    family: 'laguna',
    released: '2026-06-20',
    summary: '代码方向的开放权重系列，许可为 OpenMDW-1.1（使用前须读原文）。',
    positions: ['工具调用', '长上下文'],
    members: [
      {
        // ⚠ 只收 XS：同代的 `Laguna-S-2.1` 总参 117.6B，本站按「有人真的在本地量化跑它」的口径，
        //   取量化采用更高的 XS（33.4B，19 个第三方仓 / 1.84M 第三方下载）。
        repo: 'poolside/Laguna-XS-2.1',
        label: { zh: 'Laguna XS 2.1', en: 'Laguna XS 2.1' },
        params: '33.44B 总参',
        role: { zh: '代码 / 工具调用', en: 'Coding & tool use' },
        note: '许可 OpenMDW-1.1（非 apache/mit），使用前须读发布页许可原文；20 个 GGUF 仓，官方自己也出 GGUF。',
      },
    ],
    sources: { official: 'https://huggingface.co/poolside/Laguna-XS-2.1' },
  },
];

/** 量化者档案（内容配置，站点会引用） */
export const QUANTIZER_NOTES = {
  unsloth: {
    zh: 'Unsloth', en: 'Unsloth',
    oneLine: { zh: '第三方量化发布者，具体覆盖与下载量见快照', en: 'Third-party quantiser; see snapshot coverage and downloads' },
  },
  'lmstudio-community': {
    zh: 'LM Studio Community', en: 'LM Studio Community',
    oneLine: { zh: 'LM Studio 官方社区组织，为其 GUI 客户端供包', en: 'Powers the LM Studio GUI' },
  },
  'ggml-org': {
    zh: 'ggml-org', en: 'ggml-org',
    oneLine: { zh: 'llama.cpp 所属组织的官方量化发布', en: 'Official quant builds from the llama.cpp org' },
  },
  bartowski: {
    zh: 'bartowski', en: 'bartowski',
    oneLine: { zh: '第三方量化发布者，档位与方法以仓库说明为准', en: 'Third-party quantiser; check repository notes for tiers and methods' },
  },
  mradermacher: {
    zh: 'mradermacher', en: 'mradermacher',
    oneLine: { zh: '发布低比特量化，具体方法与来源见仓库说明', en: 'Publishes low-bit quants; check repository methods and provenance' },
  },
  antirez: {
    zh: 'antirez', en: 'antirez',
    oneLine: { zh: 'Redis 作者 / llama.cpp 生态参与者，亲自发量化版', en: 'Redis author and llama.cpp ecosystem participant; ships his own quants' },
  },
  'ISTA-DASLab': {
    zh: 'ISTA-DASLab', en: 'ISTA-DASLab',
    oneLine: { zh: '研究机构出品，GSQ / RCO 等量化方法', en: 'Research lab; GSQ / RCO quant methods' },
  },
  openbmb: {
    zh: '面壁智能官方', en: 'OpenBMB official',
    oneLine: { zh: '模型方发布的 GGUF，仍需核对版本与运行器支持', en: 'Published by the model authors themselves' },
  },
  google: {
    zh: 'Google 官方', en: 'Google official',
    oneLine: { zh: '模型方自己出的 GGUF', en: 'Published by the model authors themselves' },
  },
};

/** 已知降权的量化者（微调衍生仓占比过高 / 个人玩家，与「纯量化对比」目标不符） */
export const SECONDARY_QUANTIZERS = new Set([
  // 微调衍生为主
  'cdiamond', 'JonathanColetti', 'HauhauCS', 'DavidAU', '0bserverx', 'peculiar-ragdoll',
  'OBLITERATUS', 'esatapedico', 'z-lab', 'byteshape', 'empero-ai', 'ukisai', 'orcarouter',
  'chimingw', 'philbert440', 'cyjin-yl', 'nerkyor', 'Bucoid', 'llmfan46', 'agentionai',
  'zerodigest', 'bottlecapai', 'outsourc-e', 'AtomicChat', 'julianmb', 'KVCache-ai', 'straino',
  'continuum-ai', 'deucebucket', '1bit-MONSTER', 'yuseiito', 'meshllm', 'ReadyArt', 'mudler',
  'Mungert', 'AesSedai', 'AetherKelly00', 'apetersson', '0ppxnhximxr', 'abenzerps',
  'jjx', 'prithivMLmods', 'sokann', 'amphither', 'Earendil-Workshop', 'Igor',
  // 个人玩家 / 随手发布（真实数据：首轮采集 53 位量化者里过半是这类）
  'Kuberwastaken', 'vcruz305', '6block', 'CoboSan', 'Hagwell', 'ddh0', 'backpack-run',
  'batiai', 'Riyan200324200324', 'stressthismess', 'hudabey', 'GrEarl', 'qtum',
  'zurichquants',   'lausannequants', 'aria220', 'Amynnnn', 'giladgd', 'gooseyai',
  'ngquocvinh', 'saidutta69', 'eaddario', 'NANI-Nithin', 'Abiray', 'WhiskyAKM',
  'L-Alchemyst', 'Coder40-95', 'muzzy', 'Guile', 'grapeV-ai', 'indiansatoshi',
  'teamblobfish', 'bullerwins', 'Preyazz', 'aj9o9', 'tarruda',
  // 第二轮采集新发现的个人玩家
  'Nil626yhh', 'lazywold', 'Serpen', 'Cash4lyfe101', 'Yaspas', 'peasantsmith',
  'iTQm', 'NeverSleep', 'slaren', 'dphn', 'Apertus', 'OwlMaster',
]);

/** 主量化者：优先展示（有社区影响力 / 档位覆盖广 / 有 imatrix） */
export const PRIMARY_QUANTIZERS = new Set([
  'unsloth', 'bartowski', 'mradermacher', 'lmstudio-community', 'ggml-org',
  'antirez', 'ISTA-DASLab', 'openbmb', 'google', 'Qwen', 'lmstudio', 'nightmedia',
]);

// ============================================================================
// B3（2026-10-09）· 站间骨架：下好模型之后用什么把它跑起来
// ----------------------------------------------------------------------------
// 读者在这里选完量化档，下一个问题一定是「拿什么跑」。agent 站的若干条目**自己**
// 写明了本地模型支持（Ollama / vLLM / llama.cpp / LM Studio），那就是天然的下一跳。
//
// ⚠ 为什么这份清单写在**本仓**而不是构建时去读 agent 仓：
//   R3 要求本仓能**独立 clone 后构建**（`_audit/clone-build.mjs` 真的会克隆单仓再构建）。
//   跨仓读目录会直接破坏这条。所以清单是本仓的一份**策展数据**，
//   由 `_audit/companion-check.mjs` 去核对「每个 id 仍在 agent 仓里、且仍写着本地模型支持」——
//   那种「跨仓副本必须被核对」的做法与本仓既有的 brand-sync 是同一套路。
//
// evidence 字段是**核对用的关键词**（必须在对方条目的正文里能找到），不是给人看的文案。
// ============================================================================
// ⚠ **URL 路径因大类而异，不能一律拼到根**：
//   v8 T7 起 `part` = 内容仓的**大类目录**（10 大类制：coding / framework / …），
//   `_audit/companion-check.mjs` 拿它核对内容仓里文件真的在那个目录。
//   但**产物 URL 段**是另一回事：T30（站点层重写）之前 tools 站产物还是旧结构
//   （agents 在根、harness 在子目录），所以 URL 段走 `COMPANION_URL_PREFIX` 映射，
//   与内容仓目录解耦——T30 换产物结构时只改这张映射表，不动清单本体。
//   （历史教训：第一版一律拼到根，pydantic-ai / smolagents 上线即 404，被 site-check 抓到。）
export const COMPANION = [
  { id: 'crush', part: 'coding', label: { zh: 'Crush', en: 'Crush' }, evidence: /llamacpp|lmstudio|ollama/i,
    why: { zh: '官方支持 llamacpp / lmstudio / ollama —— 直接吃掉本地 GGUF', en: 'Officially supports llamacpp / lmstudio / ollama — it takes local GGUF directly' } },
  { id: 'goose', part: 'coding', label: { zh: 'Goose', en: 'Goose' }, evidence: /Ollama|LM Studio|Ramalama/i,
    why: { zh: '可完全走本地模型（Ollama / LM Studio / Ramalama），无 API 费用', en: 'Can run entirely on local models (Ollama / LM Studio / Ramalama), no API bill' } },
  { id: 'pydantic-ai', part: 'framework', label: { zh: 'Pydantic AI', en: 'Pydantic AI' }, evidence: /Ollama|vLLM|LiteLLM/i,
    why: { zh: '官方文档给了 Ollama / vLLM / LiteLLM 三种自托管接法', en: 'Docs cover three self-hosted routes: Ollama / vLLM / LiteLLM' } },
  { id: 'smolagents', part: 'framework', label: { zh: 'smolagents', en: 'smolagents' }, evidence: /Ollama|vLLM|mlx-lm/i,
    why: { zh: '本地推理支持 Transformers / mlx-lm / Ollama / vLLM', en: 'Local inference via Transformers / mlx-lm / Ollama / vLLM' } },
  { id: 'cline', part: 'coding', label: { zh: 'Cline', en: 'Cline' }, evidence: /Ollama/i,
    why: { zh: '编辑器内直接接 Ollama 本地模型', en: 'Hooks up to Ollama local models from inside the editor' } },
  { id: 'aider-cli', part: 'coding', label: { zh: 'Aider', en: 'Aider' }, evidence: /本地 ?LLM|local LLM/i,
    why: { zh: '命令行里可切本地 LLM，不绑厂商', en: 'Switches to a local LLM from the terminal, no vendor lock-in' } },
];

// 大类 → tools 站产物 URL 段。v8 T30（2026-10-22）：站点换 10 大类同名目录，
// 前缀 = 大类名 + '/'（旧落点 coding 在根、framework 在 harness/ 已退役，旧 URL 走跳转桩）。
export const COMPANION_URL_PREFIX = { coding: 'coding/', framework: 'framework/' };

