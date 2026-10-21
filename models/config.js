// ============================================================================
// 系列定稿 —— 由 select-v2.mjs / select-v3.mjs 的实测数据决定；A6.5（2026-10-09）扩到 11 系列
// ----------------------------------------------------------------------------
// 选型标准（不是拍脑袋）：
//   1. 是该厂商的当前最新代（老代一律不采，如 Qwen3-30B-A3B / Llama-3 / Gemma-3）
//   2. 有 GGUF 量化生态且**下载量够大**（说明本地部署圈真在用）
//      ⚠ A6.5 修正口径：原注释写「第三方 GGUF 下载 > 30 万」，但实测现役里最薄的
//        MiniCPM5 是「第一方 277k + 第三方 134k」才过线 —— 实际门槛是**该模型的 GGUF 生态总量**约 30 万。
//        两个数在 docs/A6.5-inventory.md 里并列给出，不合并成一个数。
//   3. 规模本地可跑（7~35B 密集，或 MoE）
//      ⚠ 实测口径：本表实际收过 292B / 754B / 2780B 的 MoE，所以这一条在实践里是
//        「**有人真的在本地量化跑它**」（GGUF 生态存在）而不是参数量上限。参数量如实写进 `params`。
//   4. 许可可核验（apache-2.0 / mit 优先；other 需标注原文链接）
//
// 数据来源：docs/final-candidates.json + docs/A6.5-inventory.md（后者是 A6.5 的盘点，
//   用 HF 的 `cardData.base_model` 字段聚合 GGUF 榜，方法与局限见该文档）
//
// A6.5 盘点结论（值得记住的一条）：
//   **「主流」不等于「有量化版可用」。** 响亮的大厂新系列量化采用都很薄 ——
//   NVIDIA Nemotron 3 Nano 4B（第三方 73k）· IBM Granite 4.1 3B（253k）· AI2 Olmo 3 7B（72k）·
//   HF SmolLM3 3B（85k）· 腾讯 Hunyuan Hy3（**0 个 GGUF 仓**）—— 全部落选。
//   过线的是 Ornith-1.5 / Muse-Glimmer-30B / KAT-Coder-V2.5 / Laguna-XS-2.1 这一批。
//
// 落选（量化热度过低，冷到没必要上站）：
//   Mistral-Small-4-119B  35k ｜ Llama-4-Scout  38k ｜ MiniMax-M3  17k ｜ Intern-S2  8k
//   （A6.5 追加）：Nemotron-3-Nano-4B 73k ｜ Granite-4.1-3B 253k ｜ Olmo-3-7B 72k ｜ SmolLM3-3B 85k
//   ｜ MiniMax-M2.7 31k ｜ Step-3.5-Flash 21k ｜ Hunyuan-Hy3 0 ｜ LFM2.5-2.6B 第三方仅 51k
//   ｜ Spark-X2.5-4B（采用集中在降权量化者）｜ Inkling-Small（总参 266B，本地可跑性存疑，待定）
// ============================================================================

export const SERIES = [
  {
    code: 'qwen3-8',
    name: { zh: '千问 3.8', en: 'Qwen3.8' },
    vendor: { zh: '阿里 · 通义千问', en: 'Alibaba Qwen' },
    family: 'qwen',
    released: '2026-08-05',
    summary: '阿里当前最新一代，27B 密集模型是本地部署圈热度最高的一个。',
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
    summary: 'Google 开放权重最新一代，三种规格各自都有量化覆盖。',
    positions: ['通用对话', 'MoE 稀疏', '小尺寸可跑'],
    members: [
      {
        repo: 'google/gemma-4-26B-A4B-it',
        label: { zh: 'Gemma 4 26B-A4B（MoE）', en: 'Gemma 4 26B-A4B (MoE)' },
        params: '25.8B 总参 / 4B 激活',
        role: { zh: '低延迟 MoE', en: 'Low-latency MoE' },
        note: 'MoE：总参 26B 但每 token 只激活约 4B，速度接近 4B 稠密。',
      },
      {
        repo: 'google/gemma-4-31B-it',
        label: { zh: 'Gemma 4 31B（密集）', en: 'Gemma 4 31B (Dense)' },
        params: '31.3B 密集',
        role: { zh: '质量优先', en: 'Quality first' },
        note: '同系列里最重的规格。',
      },
      {
        repo: 'google/gemma-4-E4B-it',
        label: { zh: 'Gemma 4 E4B（高效）', en: 'Gemma 4 E4B (Efficient)' },
        params: '8B 总参 / 4B 激活（E4B = 激活 4B）',
        role: { zh: '小显存首选', en: 'Low VRAM' },
        note: '小规格，量化覆盖 34 家，是入门本地部署最省资源的一档。',
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
    summary: '智谱当前最新一代，MIT 许可的 Flash 版对本地部署最友好。',
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
        note: 'MIT 许可，本地部署法律上最干净的 GLM 选项。',
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
    summary: 'MIT 许可，量化生态活跃，antirez（llama.cpp 作者）亲自维护量化版。',
    positions: ['通用对话', 'MIT 许可', '推理'],
    members: [
      {
        // ⚠ A6.5 修正：原指向 `DeepSeek-V4-Flash`（2026-04-22），但 `released` 写的是 07-31，
        //   而 HF 上同一条线已有 `DeepSeek-V4-Flash-0731` 与更新的 `DeepSeek-V4.1-Flash`（2026-09-10）。
        //   「声明的最新代」与「实际取的仓」不一致，已改为最新代。
        repo: 'deepseek-ai/DeepSeek-V4.1-Flash',
        label: { zh: 'DeepSeek V4.1 Flash', en: 'DeepSeek V4.1 Flash' },
        params: '763B 总参（MoE，激活数未公开）',
        role: { zh: '通用主力', en: 'General' },
        note: 'MIT 许可，20 个第三方量化仓，antirez 一家 1.67M 下载。',
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
    summary: 'OpenAI 唯一开放权重系列，20B 版是单卡本地部署的甜点。',
    positions: ['推理', 'MoE 稀疏', 'apache-2.0'],
    members: [
      {
        repo: 'openai/gpt-oss-20b',
        label: { zh: 'gpt-oss 20B', en: 'gpt-oss 20B' },
        params: '20B（MoE，约 3.6B 激活）',
        role: { zh: '单卡甜点', en: 'Single-GPU sweet spot' },
        note: 'apache-2.0，674 万下载。虽非最新代，但量化生态成熟且许可最干净。',
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
    summary: '月之暗面当前最新一代，41 家量化仓但整体热度中等。',
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
        role: { zh: '端侧首选', en: 'On-device' },
        note: '官方自己也出 GGUF（openbmb 249k 下载）。',
      },
    ],
    sources: { official: 'https://huggingface.co/openbmb/MiniCPM5-2B' },
  },

  // ── A6.5（2026-10-09）新增：以下 4 个系列由 docs/A6.5-inventory.md 的盘点数据选出 ──
  //    依据：GGUF 生态下载（第三方/第一方分别标注）+ 许可可核验 + 是该厂商当前最新代。

  {
    code: 'ornith-1-5',
    name: { zh: 'Ornith 1.5', en: 'Ornith 1.5' },
    vendor: { zh: 'Ornith AI', en: 'Ornith AI' },
    family: 'ornith',
    released: '2026-08-18',
    summary: 'MIT 许可，两个规格的 GGUF 生态总量是本次盘点里最高的。',
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
        note: 'MIT 许可，43 个 GGUF 仓；第一方 GGUF 下载 5.15M，是本站收录系列里最高的一个仓。',
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
        note: 'apache-2.0，34 个第三方量化仓（mudler 974k / bartowski 279k）。基准仓自身下载量不高，但量化采用集中。',
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
        note: '许可 **OpenMDW-1.1**（非 apache/mit），使用前须读发布页许可原文；20 个 GGUF 仓，官方自己也出 GGUF。',
      },
    ],
    sources: { official: 'https://huggingface.co/poolside/Laguna-XS-2.1' },
  },
];

/** 量化者档案（人工撰写，站点会引用） */
export const QUANTIZER_NOTES = {
  unsloth: {
    zh: 'Unsloth', en: 'Unsloth',
    oneLine: { zh: '量化覆盖面最广、下载量最高的第三方量化者', en: 'Broadest coverage, highest downloads' },
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
    oneLine: { zh: '老牌量化者，档位命名规范、说明文档最完整', en: 'Veteran quantizer, best-documented naming' },
  },
  mradermacher: {
    zh: 'mradermacher', en: 'mradermacher',
    oneLine: { zh: 'Mirostat 作者，长期做低比特实验性量化', en: 'Known for experimental low-bit quants' },
  },
  antirez: {
    zh: 'antirez', en: 'antirez',
    oneLine: { zh: 'Redis 作者 / llama.cpp 主要作者，亲自发量化版', en: 'Redis & llama.cpp author, ships his own quants' },
  },
  'ISTA-DASLab': {
    zh: 'ISTA-DASLab', en: 'ISTA-DASLab',
    oneLine: { zh: '研究机构出品，GSQ / RCO 等量化方法', en: 'Research lab; GSQ / RCO quant methods' },
  },
  openbmb: {
    zh: '面壁智能官方', en: 'OpenBMB official',
    oneLine: { zh: '模型方自己出的 GGUF（最可信的一档）', en: 'Published by the model authors themselves' },
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
// ⚠ **URL 路径因分区而异，不能一律拼到根**：
//   agents 分区的详情页在站点根（/crush.html），harness / tools 分区在各自子目录下
//   （/harness/pydantic-ai.html）。第一版一律写成 `agent.specul.com/<id>.html`，
//   于是 pydantic-ai / smolagents 两个链接**上线会 404** —— 被 `site-check` 的同域死链核查抓到。
//   `part` 字段就是为此存在的，且 `_audit/companion-check.mjs` 会核对产物文件真的在那个路径。
export const COMPANION = [
  { id: 'crush', part: 'agents', label: { zh: 'Crush', en: 'Crush' }, evidence: /llamacpp|lmstudio|ollama/i,
    why: { zh: '官方支持 llamacpp / lmstudio / ollama —— 直接吃掉本地 GGUF', en: 'Officially supports llamacpp / lmstudio / ollama — it takes local GGUF directly' } },
  { id: 'goose', part: 'agents', label: { zh: 'Goose', en: 'Goose' }, evidence: /Ollama|LM Studio|Ramalama/i,
    why: { zh: '可完全走本地模型（Ollama / LM Studio / Ramalama），无 API 费用', en: 'Can run entirely on local models (Ollama / LM Studio / Ramalama), no API bill' } },
  { id: 'pydantic-ai', part: 'harness', label: { zh: 'Pydantic AI', en: 'Pydantic AI' }, evidence: /Ollama|vLLM|LiteLLM/i,
    why: { zh: '官方文档给了 Ollama / vLLM / LiteLLM 三种自托管接法', en: 'Docs cover three self-hosted routes: Ollama / vLLM / LiteLLM' } },
  { id: 'smolagents', part: 'harness', label: { zh: 'smolagents', en: 'smolagents' }, evidence: /Ollama|vLLM|mlx-lm/i,
    why: { zh: '本地推理支持 Transformers / mlx-lm / Ollama / vLLM', en: 'Local inference via Transformers / mlx-lm / Ollama / vLLM' } },
  { id: 'cline', part: 'agents', label: { zh: 'Cline', en: 'Cline' }, evidence: /Ollama/i,
    why: { zh: '编辑器内直接接 Ollama 本地模型', en: 'Hooks up to Ollama local models from inside the editor' } },
  { id: 'aider-cli', part: 'agents', label: { zh: 'Aider', en: 'Aider' }, evidence: /本地 ?LLM|local LLM/i,
    why: { zh: '命令行里可切本地 LLM，不绑厂商', en: 'Switches to a local LLM from the terminal, no vendor lock-in' } },
];

