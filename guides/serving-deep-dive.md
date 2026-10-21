---
id: serving-deep-dive
stage: 7
title: 跑起来深水：KV 缓存、批处理与推理引擎
titleEn: Serving deep dive: KV cache, batching, and inference engines
summary: 推理吞吐的瓶颈为什么在 KV 缓存显存；PagedAttention、连续批处理、RadixAttention 各解决什么；vLLM 与 SGLang 站在哪。从业者视角；一页科普在学 AI 站，互链不重复。
summaryEn: Why serving throughput is bottlenecked by KV-cache memory; what PagedAttention, continuous batching and RadixAttention each solve; where vLLM and SGLang sit. Practitioner view; the one-page explainers live on the Learn site, cross-linked, not duplicated.
sources:
  - label: vLLM 官方文档首页（2026-10-21 直抓 200）
    url: https://docs.vllm.ai/en/latest/
    kind: docs
  - label: vLLM 架构总览（官方文档设计节，2026-10-21 直抓 200）
    url: https://docs.vllm.ai/en/latest/design/arch_overview.html
    kind: docs
  - label: vLLM PagedAttention 设计文档（官方文档设计节，2026-10-21 直抓 200）
    url: https://docs.vllm.ai/en/latest/design/paged_attention.html
    kind: docs
  - label: PagedAttention 论文（arXiv 2309.06180，自报吞吐 2–4 倍提升，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/2309.06180
    kind: paper
  - label: SGLang 官方文档首页（2026-10-21 直抓 200）
    url: https://docs.sglang.ai/
    kind: docs
  - label: SGLang 官方仓库（自述：LLM 与多模态模型的高性能服务框架，2026-10-21 直抓 200）
    url: https://github.com/sgl-project/sglang
    kind: docs
  - label: SGLang 论文（arXiv 2312.07104，RadixAttention 与结构化输出，自报最高 6.4 倍吞吐，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/2312.07104
    kind: paper
  - label: llama.cpp 官方仓库（本地推理的代表实现，2026-10-21 直抓 200）
    url: https://github.com/ggml-org/llama.cpp
    kind: docs
last_verified: 2026-10-21
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**模型跑起来之后，吞吐的瓶颈多半不在算力，在显存里的 KV 缓存。**
这一篇讲推理引擎围绕这块显存做的三件事：怎么存、怎么批、怎么复用。

本站不实测。所有倍数都是论文自报口径，出处列在文末；
引擎能力一律以官方文档为准。

## [KV 缓存：推理的第一本账|The KV cache: the first bill of inference]

自回归生成每产出一个 token，都要回看前文。
为避免重复计算，前文的 key/value 张量被缓存下来，这就是 KV 缓存。

它的显存随「上下文长度 × 并发请求数」线性增长，而且动态伸缩。
PagedAttention 论文指出：低效管理下，碎片与冗余复制会显著浪费这块显存，
反过来限制批大小——吞吐上不去，往往不是算不动，是塞不进。

判断依据：同一张卡，长上下文与高并发同时上来时吞吐骤降，
多半就是 KV 缓存显存先到顶。

## [PagedAttention 与连续批处理|PagedAttention and continuous batching]

PagedAttention 借操作系统虚拟内存的分页思路：
KV 缓存按固定大小的块分配，不要求连续。论文自报近零浪费。
vLLM 在其上构建，论文自报同等延迟下吞吐提升 2–4 倍——注意这是论文实验口径。

连续批处理解决另一件事：请求到达时间不齐。
静态批要等最慢的完成才能换下一批；连续批让完成的请求随时退出、新请求随时补位。
vLLM 官方文档把两者作为吞吐来源并列描述。

分块预填充是配套的第三件：长提示的预填充阶段会独占 GPU，
把它切成块与解码步交替，延迟曲线更平。

## [vLLM 与 SGLang：各站在哪|Where vLLM and SGLang sit]

**vLLM**：通用 LLM 服务引擎，PagedAttention 的官方落地，
文档覆盖量化、并行、多机部署。开放权重部署讨论里的默认名字。

**SGLang**：面向「多调用程序」的服务框架——代理循环、推理链、结构化输出这类负载。
论文自报两项机制：RadixAttention 复用跨调用共享前缀的 KV 缓存；
压缩有限状态机加速结构化输出解码。论文自报此类任务上最高 6.4 倍吞吐。

两者不是排名关系，负载画像不同：
单轮问答、批量离线生成，vLLM 路线成熟；
多轮代理、共享长前缀、严格格式输出，SGLang 的复用机制对症。
本站不裁决，论文口径都在文末。

本地单机跑 GGUF 是另一条线：llama.cpp 一类实现不追求并发吞吐，
追求在有限显存里把模型装下。选型先问「几个并发」，再问引擎。

## [投机解码：用算力换延迟|Speculative decoding: trading compute for latency]

解码每步只产一个 token，GPU 算力大量闲置。
投机解码让小模型先猜几个 token，大模型一次并行验证；猜对即白赚。

它改的是单请求延迟，不是吞吐账；猜错率高的负载收益缩水。
vLLM 与 SGLang 官方文档都提供该选项，收益取决于草稿模型与任务匹配度。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [KV 缓存](https://learn.specul.com/term/KV%20%E7%BC%93%E5%AD%98/)、
[PagedAttention](https://learn.specul.com/term/PagedAttention/)、
[连续批处理](https://learn.specul.com/term/%E8%BF%9E%E7%BB%AD%E6%89%B9%E5%A4%84%E7%90%86/) 与
[投机解码](https://learn.specul.com/term/%E6%8A%95%E6%9C%BA%E8%A7%A3%E7%A0%81/) 是使用者视角的一页科普；
这一篇讲从业者怎么给推理记账、怎么按负载画像选引擎。

同一个概念在两处深度不同，互链不重复。
硬件事实与成本数学见下一篇「GPU 事实与成本数学」。
