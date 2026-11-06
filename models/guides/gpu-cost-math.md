---
id: gpu-cost-math
stage: 8
title: GPU 事实与成本数学：跑模型的硬件账
titleEn: GPU facts and cost math: the hardware bill for running a model
summary: 从可用内存拆解驻留权重、上下文缓存、并发与运行时；区分理想化带宽算式和实际吞吐，附可填写预算，不存单价或购卡建议。
summaryEn: Separate resident weights, context cache, concurrency and runtime; distinguish idealized bandwidth arithmetic from actual throughput, with an editable budget and no stored prices or purchase advice.
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
  - label: Transformers · 缓存张量结构（2026-11-04 单项核验）
    url: https://huggingface.co/docs/transformers/cache_explanation
    kind: docs
  - label: vLLM · 内存控制（2026-11-04 单项核验）
    url: https://docs.vllm.ai/en/latest/configuration/conserving_memory/
    kind: docs
last_verified: 2026-10-21
confidence: partial
---

## [这一篇讲什么|What this guide covers]

预算先拆成驻留权重、缓存、运行时与预留，再和任务实际可用内存比较。文件能下载不等于能加载；小于预算也不等于运行器支持或输出合格。

本站不存卡价、租用单价或购卡建议。原硬件来源日期保留为 2026-10-21；2026-11-04 仅新增缓存方法说明与本地预算算式，未重新核验旧硬件规格。

## [核对容量、带宽与可用量|Check capacity, bandwidth and available memory]

硬件官方规格页可用于核对容量、带宽和型号，但不能直接给出某个任务的速度或可用内存。驱动、后端、共享内存、系统占用和模型布局都需另外核对。

下列来源保留原快照日期。本文不把某张卡或某台机器的标称总容量当作当前任务可用量，也不把两张卡的容量简单视作一个连续内存池。使用预算工具时填写已核对的可用 GiB；十进制 GB 先换单位。

## [带宽算式的假设与边界|Assumptions and limits of bandwidth arithmetic]

对简化的稠密模型单请求 decode，可用峰值内存带宽 ÷ 每步需从该层级读取的字节量做理想化估计。只有在假设每步从该内存层级完整读取权重时，才能把权重体积放进分母；MoE 激活专家、缓存复用、批处理和卸载会改变口径。

例如假设每步需读 16 GB、带宽为 3.35 TB/s，忽略其他开销时约为 209 次读取/秒。这是教学算式，不是 token/s 测试结果。减小权重文件不保证速度按相同比例增加。

prefill 和 decode 的瓶颈会随批量、序列长度、算子实现与硬件变化，不能一概写成“一个只看算力，另一个只看带宽”。

## [成本数学：讲构成，不存单价|Cost math: composition, not unit prices]

每 token 硬件分摊成本 = 同一统计期间内计入的硬件费用 ÷ 同期间实际产出的 tokens。写清输入/输出口径、缓存、空闲、失败重试和服务量，避免拿峰值理论吞吐当实际交付。

容量预算回答“按这些假设占多少内存”，不回答“每小时能产多少”。吞吐需在自己的授权环境按固定任务观察；本站没有运行模型测试或保存单价。需要记录费用构成，使用 [成本计算器](https://tools.specul.com/mcp/guides/cost-calculator.html)。

## [和本站其他资产的关系|How this fits the rest of the site]

系列页 B 区按发布文件体积 × 1.15 初筛候选。该固定示意比例不是 KV 缓存估算，也不保证能运行。用本文下方的工具把缓存长度、并发和运行时预留分别列出；编码器、MLA、混合或滑动窗口模型另查架构方法。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [显存](https://learn.specul.com/term/%E6%98%BE%E5%AD%98/) 与
[量化](https://learn.specul.com/term/%E9%87%8F%E5%8C%96/) 是使用者视角的一页科普；
这一篇给硬件事实表与成本数学的构成方法。

同一个概念在两处深度不同，互链不重复。
KV 缓存与批处理机制见上一篇「跑起来深水」。

## [完整例子：10 GiB 预算如何分配|Worked example: allocating a 10 GiB budget]

下面是假设的容量练习，不对应具体模型，也不是本站运行结果。GiB 按 2 的 30 次方字节计算；不要把十进制 GB 直接当成相同数值的 GiB。

设可用于任务的预算为 10 GiB，候选权重占 6 GiB。先按 2 GiB 缓存、1 GiB 运行时占用估算，合计 9 GiB，另留 1 GiB 余量。这些缓存与运行时数字只是练习假设；真实数值随模型、精度、上下文和并发变化。

接着核对文件体积、运行器支持和实际可用内存。用短输入启动后记录占用，再增加上下文。若缓存超过预算，可以缩短输入、调整并发或评估其他档位；卸载能力需查运行器文档。

容量预算不能预测生成速度，也不能证明质量足够。对比方案时，再用相同任务记录耗时、错误和用量；本例不给出性能承诺或硬件购买建议。

接着看 [本地运行完整流程](https://tools.specul.com/mcp/guides/playbook-local-model.html)，或回到 [量化概念](https://learn.specul.com/term/%E9%87%8F%E5%8C%96/) 核对位宽与质量的区别。
