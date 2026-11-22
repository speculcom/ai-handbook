---
id: long-context
stage: 6
title: 长上下文：窗口、有效利用与成本
titleEn: Long context: window size, effective use and cost
summary: 「支持 128K」只是上限，不等于能在中间找到信息。长上下文选型要同时看位置鲁棒性、注意力成本、KV cache 显存和任务验收。
summaryEn: “Supports 128K” is an upper bound, not a guarantee that information in the middle will be found. Long-context selection must consider position robustness, attention cost, KV-cache memory and task-level acceptance.
sources:
  - label: Lost in the Middle（arXiv 2307.03172，相关信息位于中部时性能下降，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2307.03172
    kind: paper
  - label: RoFormer / RoPE（arXiv 2104.09864，旋转位置编码与外推性质，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2104.09864
    kind: paper
  - label: Mixtral of Experts（arXiv 2401.04088，32K 训练上下文，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2401.04088
    kind: paper
last_verified: 2026-11-17
confidence: verified
---

## [窗口不等于会用|A window is not effective use]

Lost in the Middle 的实验很直接。相关内容放开头或结尾，模型表现最好。模型表现最好。
放到中间，性能显著下降，即使模型宣称支持长上下文。
所以「窗口多大」只是准入条件，「中间能不能找到」要在你的任务上单独测。

## [位置编码决定能不能外推|Position encoding decides extrapolation]

主流模型用 RoPE：把绝对位置写成旋转矩阵，同时在注意力里保留相对位置依赖。
RoPE 的序列长度灵活性是外推的基础，但超出训练长度仍会退化；
常见做法是位置插值、频率缩放或在更长数据上继续训练。

看到「支持 1M」时，先问训练长度是多少、用了哪种外推方法、在什么任务上验证过。

## [注意力成本与预填充|Attention cost and prefill]

标准注意力的计算随序列长度呈二次增长，长输入的预填充阶段最贵。
解码阶段每生成一个 token 都要读历史 KV，长上下文会把带宽压力放大。

工程上会用分块预填充、FlashAttention、前缀缓存来摊薄。但这些优化不改变「中间信息难找」这个模型问题。

## [KV cache 的显存账|The KV-cache bill]

KV cache 随一串因子增长。包括层数、头数、头维度、序列长度、批量和字节。
上下文翻倍，KV cache 也大致翻倍；这往往比权重更早撞墙。
估算顺序：先算权重，再算目标上下文与批量下的 KV cache，最后留运行时余量。

长上下文服务要按「并发 × 长度」定价，而不是按单次请求定价。

## [长上下文还是 RAG|Long context or RAG]

**依据：** 资料总量小、需要整体推理、且能接受预填充成本时，长上下文更简单。
资料量大、更新频繁、需要引用定位时，RAG 更可控。
两者可以叠加：先用检索把候选缩到几十 K，再让模型在窗口内做跨段推理。

## [验收方法|How to accept it]

1. 位置测试：同一关键信息放开头、中间、结尾，各测 20 次，记录命中率。
2. 干扰测试：加入大量相似但无关的段落，看是否被带偏。
3. 成本测试：目标长度与并发下的首字延迟、吞吐、显存峰值。
4. 任务测试：用真实合同、日志或代码库，不用「大海捞针」一根针代替全部能力。

**边界**

论文结论来自特定模型与任务。不同模型、不同外推方法与不同推理框架的表现不能直接移植。

**先补概念**

[上下文窗口](https://learn.specul.com/term/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3/) 与 [长上下文](https://learn.specul.com/term/%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87/) 是学 AI 站的相关科普。
