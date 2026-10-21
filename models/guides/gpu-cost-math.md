---
id: gpu-cost-math
stage: 8
title: GPU 事实与成本数学：跑模型的硬件账
titleEn: GPU facts and cost math: the hardware bill for running a model
summary: 推理卡的关键事实（显存容量与带宽，只录官方规格页口径）；decode 为什么是带宽瓶颈；吞吐与成本怎么按构成方法估——不存任何单价、不做购卡推荐。
summaryEn: Key facts for inference hardware (memory capacity and bandwidth, official spec pages only); why decode is bandwidth-bound; how to estimate throughput and cost by composition method — no unit prices stored, no purchase advice.
sources:
  - label: NVIDIA H100 官方规格页（SXM 80GB / NVL 94GB 与带宽口径，2026-10-21 直抓）
    url: https://www.nvidia.com/en-us/data-center/h100/
    kind: docs
  - label: NVIDIA A100 官方规格页（80GB HBM2e 与带宽口径，2026-10-21 直抓）
    url: https://www.nvidia.com/en-us/data-center/a100/
    kind: docs
  - label: NVIDIA RTX 4090 官方规格页（24GB GDDR6X，2026-10-21 直抓）
    url: https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/
    kind: docs
  - label: Apple MacBook Pro 官方规格页（统一内存容量口径，2026-10-21 直抓）
    url: https://www.apple.com/macbook-pro/specs/
    kind: docs
  - label: PagedAttention 论文（arXiv 2309.06180，KV 缓存显存与吞吐关系，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/2309.06180
    kind: paper
  - label: llama.cpp 官方仓库（GGUF 本地推理实现，2026-10-21 直抓 200）
    url: https://github.com/ggml-org/llama.cpp
    kind: docs
last_verified: 2026-10-21
confidence: partial
---

## [这一篇讲什么|What this guide covers]

**「我的硬件能跑多大的模型」是一道可以手算的题。**
这一篇给出硬件侧的关键事实（只录官方规格页写明的数字），
再给出成本数学的构成方法。

本站按纪律不收录任何卡价与租用单价，也不做购卡推荐。
数字随厂商改版会变，复核日期见页脚。

## [硬件事实表：只录官方规格页口径|Hardware facts: official spec pages only]

判断「能不能跑」看两个数：显存容量决定装得下多大的模型，
显存带宽决定 decode 阶段每秒能吐多少 token。

- NVIDIA H100 SXM：显存 80GB，带宽 3.35TB/s（官方规格页）。
- NVIDIA H100 NVL：显存 94GB，带宽 3.9TB/s（同一页两列对照）。
- NVIDIA A100 80GB：HBM2e，带宽 1,935 GB/s（PCIe）/ 2,039 GB/s（SXM）。
- NVIDIA RTX 4090：24GB GDDR6X（消费卡，官方页未标带宽数值）。
- Apple MacBook Pro（M5 系列）：统一内存 16/24/32GB 起配，
  高配可到 128GB——CPU 与 GPU 共享同一块内存（官方规格页）。

诚实口径：AMD 消费卡规格页本次未能核验（站点不可达），
本站就不录 AMD 数字——未知就说未知，不抄二手参数表。
各卡功耗、互联、FP8 支持等细节以官方页为准，此处不展开。

## [decode 是带宽题，prefill 是算力题|Decode is a bandwidth problem, prefill is compute]

生成阶段每产出一个 token，都要把模型权重完整读一遍。
单请求 decode 的每秒 token 数上限 ≈ 显存带宽 ÷ 每 token 需读的字节数。

一个 8B 模型的 FP16 权重约 16GB。在 3.35TB/s 带宽上，
理论上限约 200 token/秒——这是「上限」，实际还要扣 KV 缓存读取与开销。
量化到 4bit 后权重约 4GB，同一张卡上限约四倍。这就是量化的吞吐账。

预填充（读入长提示）相反：一次前向处理多个 token，算力受限。
所以「首 token 延迟」与「每 token 延迟」由两种硬件属性分别决定，
调优方向完全不同。

## [成本数学：讲构成，不存单价|Cost math: composition, not unit prices]

线上推理成本的构成链是：

1. 每 token 成本 = 硬件每小时成本 ÷ 该硬件每小时产出的 token 数。
2. 每小时产出由上节的带宽账与并发批处理决定——批越大，权重读取摊薄越多。
3. 硬件每小时价格随市场每月波动，本站按纪律不收录。

能自己算的是中间项。给定模型大小与量化档，再给定并发数，
用带宽账估吞吐，用吞吐除单价。厂商报价页与云厂商价格页是公开入口，
本站只教这条链怎么搭，不替你抄当下的数。

选型判断依据（不是推荐）：并发高、上下文长时，瓶颈在 KV 缓存显存，要看带宽与容量。
单机个人用则相反，瓶颈在「装不装得下」，主要看容量与量化档。

## [和本站其他资产的关系|How this fits the rest of the site]

本站系列页的「显存倒推」表按实测文件体积给出「你的显存能下哪一档」，
是使用者入口；这一篇给的是硬件侧事实与换算方法，是从业者口径。
两边口径一致：都用「权重字节数 + KV 缓存」这本账。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [显存](https://learn.specul.com/term/%E6%98%BE%E5%AD%98/) 与
[量化](https://learn.specul.com/term/%E9%87%8F%E5%8C%96/) 是使用者视角的一页科普；
这一篇给硬件事实表与成本数学的构成方法。

同一个概念在两处深度不同，互链不重复。
KV 缓存与批处理机制见上一篇「跑起来深水」。
