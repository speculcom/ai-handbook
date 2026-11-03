---
id: api-vs-local
topic: planning
title: API 还是本地跑
titleEn: API or local inference
summary: 四条轴决定：成本结构、数据与合规、延迟与吞吐、模型能力与更新；用一张决策表缩小到一条路线。
summaryEn: Four axes decide it — cost structure, data and compliance, latency and throughput, model capability and updates. A decision table narrows it to one route.
sources:
  - label: OpenAI · API Pricing（按 token 计价的官方入口）
    url: https://openai.com/api/pricing/
    kind: pricing
  - label: Anthropic · Pricing（按 token 计价的官方入口）
    url: https://www.anthropic.com/pricing
    kind: pricing
  - label: vLLM 官方文档（本地/自托管推理引擎）
    url: https://docs.vllm.ai/
    kind: docs
  - label: llama.cpp 官方仓库（本地 GGUF 推理）
    url: https://github.com/ggml-org/llama.cpp
    kind: docs
  - label: Ollama 官方文档（本地模型运行器）
    url: https://docs.ollama.com/
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [这一篇讲什么|What this guide covers]

「API 还是本地跑」不是技术偏好，是四个约束的取舍：**成本结构、数据与合规、延迟与吞吐、模型能力与更新**。
四条轴里只要有一条是硬约束，路线基本就定了。
本篇不报具体价格；token 单价与硬件价格以官方页为准。

<!-- EN -->
> "API or local" is not a technical preference but a trade-off across four constraints: **cost structure, data and compliance, latency and throughput, model capability and updates**.
> If any one of them is a hard constraint, the route is largely decided.
> This guide quotes no specific prices; per-token and hardware prices follow the official pages.

## [第一条：成本结构|One: cost structure]

| 路线 | 主要成本 | 什么情况下更省 |
|---|---|---|
| API | 按 token / 按次计费，随用量线性增长 | 低频、波动大、不想买卡 |
| 本地 | 显卡 / 内存 / 电费 / 运维，前期固定 | 高频、长期、已有硬件 |
| 混合 | 本地兜底 + API 峰值 | 有明显波峰波谷，且数据可分流 |

**判断方法**：把「每月输入 token + 输出 token」估出来，乘官方单价；再和「显卡折旧 + 电费 + 运维时间」比。
不要只比单价，要把闲置率算进去——本地显卡在低负载时也在折旧。

<!-- EN -->
> | Route | Main cost | Cheaper when |
> |---|---|---|
> | API | per token / per call, linear with usage | low or spiky volume; no GPU purchase |
> | Local | GPU / memory / power / operations, fixed upfront | high long-term volume; hardware already owned |
> | Hybrid | local baseline + API for peaks | clear peaks and troughs, with data that can be split |
>
> **Method**: estimate monthly input + output tokens, multiply by official unit prices, then compare with GPU depreciation + power + operations time.
> Do not compare unit prices alone — include idle time; a local GPU depreciates even when idle.

## [第二条：数据与合规|Two: data and compliance]

- **数据不出域**：本地或私有部署是唯一能承诺「原始数据不离开」的路线。
- **API 的数据条款**：要读训练用途、留存周期、跨境传输与子处理者清单，不只看「不训练」一句。
- **合规义务**：面向公众提供服务时，备案、内容标识、生成内容安全评估可能是独立义务；本地跑不等于免除。

<!-- EN -->
> - **Data stays in-domain**: local or private deployment is the only route that can promise raw data never leaves.
> - **API data terms**: read training use, retention, cross-border transfer and sub-processor lists, not just the "no training" line.
> - **Compliance duties**: serving the public may trigger filing, content labelling and safety evaluation duties; running locally does not exempt you.

## [第三条：延迟与吞吐|Three: latency and throughput]

- **API**：延迟由网络与供应商排队决定；高峰期可能限流。
- **本地**：延迟由显卡、量化档与并发决定；吞吐可以用批处理与张量并行提高。
- **交互式**：首 token 延迟比总吞吐更重要。
- **批处理**：总吞吐与单位成本更重要，可以排队。

<!-- EN -->
> - **API**: latency depends on the network and provider queues; peak hours may be rate-limited.
> - **Local**: latency depends on the GPU, quantisation tier and concurrency; throughput improves with batching and tensor parallelism.
> - **Interactive**: time-to-first-token matters more than total throughput.
> - **Batch**: total throughput and unit cost matter more; queuing is acceptable.

## [第四条：模型能力与更新|Four: model capability and updates]

- **前沿能力**：闭源 API 通常先拿到新模型与新产品面（Deep Research、Agent、图像线等）。
- **可控与可复现**：本地权重可以固定版本、固定量化档，适合回归测试与离线环境。
- **更新成本**：API 升级通常无感；本地升级要重新下载、重新量化、重新测显存。

<!-- EN -->
> - **Frontier capability**: closed APIs usually get new models and product surfaces first (Deep Research, agents, image lines).
> - **Control and reproducibility**: local weights can pin a version and quantisation tier, which suits regression tests and offline environments.
> - **Upgrade cost**: API upgrades are usually invisible; local upgrades mean re-downloading, re-quantising and re-testing VRAM.

## [决策表|Decision table]

| 你的硬约束 | 选 |
|---|---|
| 原始数据绝不能出内网 | 本地 / 私有部署 |
| 要最新前沿能力、不想买卡 | API |
| 高频长期、已有显卡 | 本地 |
| 有明显波峰、数据可分流 | 混合 |
| 要固定版本做回归 | 本地 |
| 团队没有运维 | API 优先 |

<!-- EN -->
> | Your hard constraint | Choose |
> |---|---|
> | Raw data must never leave the intranet | local / private deployment |
> | Need the newest frontier capability without buying GPUs | API |
> | High long-term volume with GPUs already owned | local |
> | Clear peaks with splittable data | hybrid |
> | Need pinned versions for regression | local |
> | No operations team | API first |

## [常见误判|Common misreads]

- **把「本地」当成「便宜」**：低频场景下，显卡折旧与运维通常比 API 贵。
- **把「API 不训练」当成「数据不出境」**：训练与跨境传输是两条条款。
- **把「能跑」当成「能扛并发」**：单机 demo 与生产吞吐是两件事。
- **忽略量化损失**：本地为了装下显卡常降档，质量与上下文长度都会变。

<!-- EN -->
> - **Mistaking "local" for "cheap"**: at low volume, GPU depreciation and operations usually cost more than API calls.
> - **Mistaking "API does not train" for "data does not leave the country"**: training and cross-border transfer are separate clauses.
> - **Mistaking "it runs" for "it handles concurrency"**: a single-machine demo and production throughput are different things.
> - **Ignoring quantisation loss**: local deployments often drop tiers to fit VRAM, changing quality and context length.
