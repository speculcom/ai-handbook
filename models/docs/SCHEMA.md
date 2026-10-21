# Models 站数据 Schema

> 唯一真相源：`data/series/*.json` 由 `scripts/collect-models.mjs` 生成，**不要手改**。
> 人工补充内容放 `data/quantizers/*.md`（量化者档案）。

## 一句话定位

**本站只回答一个问题：这个基础模型，我该下载哪个量化版、为什么。**

不是模型评测站，不跑 benchmark，不给主观优劣排名。所有条目都必须能点回发布页核对。

## 三级可信度（页面上必须标出来）

| 级别 | 含义 | 例子 | 标记 |
|---|---|---|---|
| A 客观事实 | 从 HF API 直接读到的字段 | 文件体积、上下文长度、许可、架构 | ✅ 实测字段 |
| B 参数推导 | 由 A 按明确规则算出 | 量化位数↔体积档位、显存需求区间 | ✅ 推导 |
| C 主观优劣 | 我们的判断 | 「更稳」「更慢」「适合长文」 | ❌ 我们的口径 |

C 级内容必须写成「我们的口径」并说明依据，不允许伪装成 A。

## series/*.json

```jsonc
{
  "code": "qwen3",                 // 短码，用于 URL /series/qwen3/
  "name": { "zh": "千问 3", "en": "Qwen3" },
  "vendor": { "zh": "阿里通义", "en": "Alibaba" },
  "family": "qwen3",              // 用于跨系列聚合
  "released": "2025-04-28",       // 首次发布日
  "summary": "…",                 // 一句话定位（≤60 字）
  "positions": ["通用对话", "长上下文", "MoE 稀疏"],  // 定位标签
  "sources": {
    "official": "https://huggingface.co/Qwen/Qwen3-30B-A3B",
    "paper":    "https://arxiv.org/abs/2505.09388",
    "api":      "https://hf-mirror.com/api/models/Qwen/Qwen3-30B-A3B"
  },

  // 基础模型本体（官方仓）
  "base": {
    "repo": "Qwen/Qwen3-30B-A3B",
    "url":  "https://huggingface.co/Qwen/Qwen3-30B-A3B",
    "license": "apache-2.0",
    "licenseUrl": "https://huggingface.co/Qwen/Qwen3-30B-A3B/blob/main/LICENSE",
    "pipeline": "text-generation",
    "downloads": 123456,
    "likes": 890,
    "lastModified": "2026-08-01T…",
    "params": "30.5B (MoE, 3.3B 激活)",
    "contextLength": 40960,          // 若 API 未给则 null
    "architecture": "qwen3moe"
  },

  // 官方直出的 GGUF（若有）—— 与第三方量化严格分开
  "officialGguf": {
    "repo": "Qwen/Qwen3-30B-A3B-GGUF",
    "url": "https://huggingface.co/Qwen/Qwen3-30B-A3B-GGUF",
    "note": "官方出品，仅 Q8_0 / Q4_K_M 等少数几档"
  },

  // 第三方量化变体（核心）
  "variants": [
    {
      "quantizer": "unsloth",              // → data/quantizers/unsloth.md
      "repo": "unsloth/Qwen3-30B-A3B-GGUF",
      "url": "https://huggingface.co/unsloth/Qwen3-30B-A3B-GGUF",
      "license": "apache-2.0",
      "licenseNote": "继承基础模型许可；量化产物本身由量化者发布",
      "downloads": 456789,
      "likes": 1234,
      "lastModified": "2026-07-11T…",
      "contextLength": 40960,              // 来自 gguf.context_length
      "architecture": "qwen3moe",
      "imatrix": true,                     // 是否带 importance matrix
      "imatrixFile": "imatrix_unsloth.dat",
      "chatTemplate": "qwen3",             // 推断，供 llama.cpp 用户参考
      "files": [
        {
          "name": "Qwen3-30B-A3B-Q4_K_M.gguf",
          "sizeBytes": 18310000000,
          "sizeGB": 17.1,
          "quant": "Q4_K_M",               // 归一化后的量化标签
          "bitsPerWeight": 4.83,            // B 级：按 llama.cpp 命名标准推算
          "tier": "主力档",
          "isSharded": false,
          "note": "多数人第一次下载的档位"
        }
      ],
      "coverage": 27,                      // 该仓提供多少个量化档
      "totalGB": 210.4                     // 该仓全部 gguf 总体积
    }
  ],

  "collectedAt": "2026-09-30T12:00:00Z",   // 采集时间戳（页脚显示）
  "schemaVersion": 1
}
```

## families/*.json（v7 S51 · 家族谱系卡）

家族卡是「第一层选型」：出品方 / 代次 / 尺寸档 / 许可 / 官方能力声明带出处 / 定位。
与 `series/*.json`（第二层：量化版）平行——卡上的 `onSite.series` 指向本站已收录的系列 code，
互链成「选家族 → 看这代的量化对比」路径；该家族没有过量化门槛时 `series` 为空 +
`onSite.zh/en` 写清原因（诚实口径，不造空壳链接）。

```jsonc
{
  "schemaVersion": 1,
  "code": "qwen",                    // 文件名 = code，URL /families/qwen/
  "name": { "zh": "千问 Qwen", "en": "Qwen" },
  "vendor": { "zh": "阿里巴巴 · 通义千问", "en": "Alibaba · Qwen" },
  "currentGen": { "zh": "Qwen3.8", "en": "Qwen3.8" },
  "currentGenDate": "2026-08",       // YYYY-MM
  "generations": [{                  // 代次沿革（新→旧），每条带官方 URL
    "gen": "Qwen3.8", "date": "2026-08",
    "zh": "…", "en": "…", "url": "https://huggingface.co/Qwen/Qwen3.8-27B"
  }],
  "sizeTiers":  [{ "zh": "小杯 0.6B–9B…", "en": "…" }],
  "licenses":   [{ "id": "apache-2.0", "zh": "…", "en": "…", "url": "许可原文" }],
  "claims":     [{ "zh": "官方声明…", "en": "…", "url": "出处" }],  // 官方能力声明，逐条挂 URL
  "positioning": { "zh": "…", "en": "…" },
  "derived": {                       // 可选（v7 S53）：官方模型卡声明 base_model 的家族才写
    "base": "Qwen3.6-35B-A3B",       // 基座名（照官方 cardData.base_model 抄）
    "zh": "…", "en": "…", "url": "声明所在页"
  },
  "onSite": { "series": ["qwen3-8"], "zh": "…", "en": "…" },   // series 空 = 本站未收量化对比
  "sources":    [{ "label": "…（2026-10-20 直抓 200）", "url": "…", "kind": "docs" }],
  "last_verified": "2026-10-20",
  "confidence": "verified"
}
```

纪律（与 series 同一套 R5 口径）：

1. `claims` 是**厂商官方声明**的转述，不是本站结论——涉及横评的必须点名是厂商自评基准（GLM-5.3 的 Code Bench 就是这样标的）；
2. 官方页抓不到的内容写「官方未说明」（Llama-4 的上下文长度即此处理：README 门控 + llama.com 有身份确认，不转述未核验数字）；
3. 许可按档位如实分列（Mistral 的 Small 4 = Apache-2.0、Medium 3.5 = Modified MIT；GLM 的大杯 other、Flash 杯 MIT）；
4. `last_verified` 是核验快照日；换链接前先实测新 URL。
5. **派生标记（S53）**：只有官方模型卡自己声明 `base_model` 的家族才写 `derived`（A6.5 口径——这是量化仓/模型仓自报的溯源字段，本站不猜谱系）。写了就必须带 url 出处；索引页卡上会渲染「派生自 X」chip。家族 code 与系列 code 同名是允许的（gpt-oss / laguna），validate 的「onSite 不指家族卡」守卫按在册系列放行。

## closed/*.json（v7 S54 · 闭源谱系卡）

闭源卡是**对照面**：本站主体仍是开放权重选型，闭源卡只记三件事——
当前代、官方规格事实（每条挂官方出处）、核验快照与复核周期。
URL `/closed/<code>/`。它回答的是「选型绕不开的 API 对照面现在是什么状态」，
不是「闭源模型怎么部署」（那不存在——没有权重就没有量化选型）。

```jsonc
{
  "schemaVersion": 1,
  "code": "gpt",                      // 文件名 = code，URL /closed/gpt/
  "name": { "zh": "GPT（闭源 API）", "en": "GPT (closed API)" },
  "vendor": { "zh": "OpenAI", "en": "OpenAI" },
  "access": { "zh": "怎么用得到…", "en": "…" },   // API/产品入口一句话（读者最关心的第一问）
  "currentGen": { "zh": "…", "en": "…" },
  "currentGenDate": "2026-06",        // YYYY-MM
  "review_interval_days": 30,         // 复核周期（≥7 整数）：last_verified + 它 = 复核到期日
  "generations": [{ "gen": "…", "date": "…", "zh": "…", "en": "…", "url": "官方页" }],
  "facts": [{                         // 官方规格事实（上下文/输出/模态/思考模式等）
    "k": { "zh": "上下文窗口", "en": "Context window" },
    "v": { "zh": "…", "en": "…" },
    "url": "https://…"                // 每条必填 https 官方出处——无出处的「事实」不收
  }],
  "positioning": { "zh": "…", "en": "…" },
  "onSite": { "zh": "与开放权重侧/工具站的分工", "en": "…" },  // 防读者混线（kimi 双轨就是例子）
  "sources": [{ "label": "…（2026-10-20 直抓 200）", "url": "…", "kind": "docs" }],
  "last_verified": "2026-10-20",
  "confidence": "verified",           // verified | partial | stale
  "cn": { … }                         // S52 共用透镜（origin/direct/filing），checkCn 校验
}
```

纪律（S54 特有，叠加 R5 通用口径）：

1. **D9 反向守卫**：卡内不采价格数字。validate 拦两样——价格类**字段名**（price/cost/pricing/fee/rate/monthly/per_*_token 等 key）与值里的**价格数字模式**（¥3.5、$5、6元/百万、USD 10）；「prices may change」这类定性口径放行。定价只放官方定价页链接。
2. **stale 是状态不是错误**：`review_interval_days` + `last_verified` 算复核到期日。到期 → validate 发卡内警告 + 渲染层必须出 `.stale-banner` 横幅（models-check 断言兑现：到期必有横幅、未到期不许有）。闭源厂商改规格不通知任何人——过期可见胜过装作最新。
3. `facts` 每条必须挂官方出处（官方文档/发布页 > 官方定价页链接），禁二手转述；抓不到的写「官方未说明」，不编数字。
4. 官方页自称与常识不符时**如实记录原文**（先例：Grok 官方页自称 SpaceXSI，卡上照记并标注出处口径）。
5. `onSite` 必填双语：说清与开放权重侧（kimi 双轨）、工具站（对话产品轻档案）的分工，防读者把两条线混成一条。

## guides/*.md（v7 S55 · 做模型专题）

方法论文章（训练四阶段、数据与算力、跑起来深水），格式对齐 agent 仓 SCHEMA §十，
但 **models 仓双语必填**：`titleEn` / `summaryEn` 缺失是硬失败（不是警告）。

frontmatter 字段：`id`（= 文件名 slug）、`title/titleEn`、`summary/summaryEn`、
`sources[]`（label+url https+kind，≥1）、`last_verified`（YYYY-MM-DD）、
`confidence`（verified/partial/stale）。

正文纪律：

1. 节标题写 `## [中文标题|English heading]`——渲染层按它出 bi 双节点，**至少一节必须这样写**（validate 硬校验）；
2. 关键事实挂论文/官方模型卡出处（frontmatter sources 或正文内联链接）；官方没写的写「官方未说明」；
3. **不排名、不裁决路线之争**（不排名宪章）：写机制、写代价、写口径变化，优劣留给读者；
4. **与学 AI 站互链不重复**（总纲 §1.4 边界）：每篇正文必须链向至少一个 learn 词条（content-freshness 1d 节机器验「互链」；「不重复」人工对读）；
5. plain-language 门禁适用（CORPORA 已加 `models-guide`）：句 P90 ≤40、段 P90 ≤120、开场判据；
6. 渲染落点 `/guides/<id>.html`（单文件页，一级深 → assetPrefix `'../'`——注意与 families/closed 的两级不同构）。

## 字段来源对照

| 字段 | 来源 | 级别 |
|---|---|---|
| `files[].sizeBytes` | `GET /api/models/{id}/tree/main?recursive=1` → `size` | A |
| `contextLength` | `GET /api/models/{id}` → `gguf.context_length` | A |
| `architecture` | 同上 → `gguf.architecture` | A |
| `imatrix` | 同上 → `gguf.quantize_imatrix_file` | A |
| `license` | 同上 → `cardData.license` | A |
| `base_model` | 同上 → `cardData.base_model`（溯源到基础模型） | A |
| `downloads` / `likes` | 同上顶层字段 | A |
| `files[].name` | tree API 的 `path` | A |
| `bitsPerWeight` | 由文件名量化标签按 llama.cpp 公开命名标准推算 | B |
| `tier` | 由 `bitsPerWeight` 落档（见下） | B |
| `quantizer` | 仓库 owner 名 | A |

## 量化档位 tier 规则（B 级，可复现）

| tier | bitsPerWeight | 含义 |
|---|---|---|
| 极限压缩 | < 3.0 | 能跑就行，质量明显掉 |
| 长上下文优先 | 3.0–3.7 | KV 也吃紧时的选择 |
| 平衡档 | 3.7–5.0 | 默认推荐 |
| 保守档 | 5.0–7.0 | 几乎无质量损失 |
| 近似无损 | > 7.0 | 体积与 BF16 接近 |

## 命名归一化

不同量化者命名不一致，统一映射：

| 原始 | 归一 |
|---|---|
| `Q4_K_M` / `q4_k_m` | `Q4_K_M` |
| `IQ4_XS` | `IQ4_XS` |
| `BF16` / `F16` 分片 | `BF16`（isSharded=true） |
| `UD-Q4_K_XL` | `UD-Q4_K_XL`（unsloth 动态量化） |

## 硬约束（audit-licenses.mjs 强制）

1. 每条 `variants[]` 必须有非空 `license`，否则构建失败
2. 每条 `variants[]` 必须有 `url`，指向 HF 发布页
3. 每条必须能通过 `url` 反查到 `repo`
4. 不下载、不托管任何权重文件
5. gated 仓库（401/403）**跳过并记录**，不尝试绕过

---

## 两个校验器（分工不同，都要跑）

| 脚本 | 管什么 |
|---|---|
| [`scripts/audit-licenses.mjs`](../scripts/audit-licenses.mjs) | **法律硬约束**（上面 5 条）+ 生成 `docs/audit-report.json` |
| [`scripts/validate.mjs`](../scripts/validate.mjs) | **结构与我方口径**：`config.js` 必填字段、`positions` 封闭枚举、采集产物与名单对齐、三个翻译文件覆盖（R2）|

```bash
node scripts/validate.mjs        # 结构 + 中英一致性
node scripts/audit-licenses.mjs  # 法律硬约束（建站前强制）
```

## 采集管线的**完整**顺序（中间两步容易漏，README 曾漏写）

```bash
node scripts/collect-models.mjs     # ① 采集（hf-mirror，11 系列约 3~5 分钟）
node scripts/fix-quants.mjs         # ② 重套档名规则 + 删非权重文件（mmproj/tokenizer/imatrix）
                                    #    实测新采数据里混进过 210 个非权重文件；漏了这步，
                                    #    页面会建议「直接下 非权重文件（0.0 GB，未识别）」
node scripts/backfill-license.mjs   # ③ 量化变体继承基座许可（写 licenseInherited/licenseFrom 留痕）
                                    #    多数 HF 量化仓的 model card 里本来就没有 license 字段
node scripts/validate.mjs           # ④ 结构与我方口径
node scripts/audit-licenses.mjs     # ⑤ 法律硬约束（不合规则 exit 1，中止建站）
node scripts/build.mjs              # ⑥ 建站
```

