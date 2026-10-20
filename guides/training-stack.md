---
id: training-stack
stage: 6
title: 开源训练栈：多卡训练的工具链
titleEn: The open training stack: the toolchain behind multi-GPU training
summary: 一张卡装不下大模型之后，数据并行、ZeRO、张量并行、流水线并行怎么组合；DeepSpeed、Megatron-LM、torchtitan、nanotron、TRL 各站在哪一层。从业者视角的选型地图；词条版在学 AI 站，互链不重复。
summaryEn: Once a model stops fitting on one GPU: how data parallelism, ZeRO, tensor and pipeline parallelism compose, and which layer DeepSpeed, Megatron-LM, torchtitan, nanotron and TRL each sit at. A practitioner's selection map; term pages live on the Learn site, cross-linked, not duplicated.
sources:
  - label: ZeRO 论文（arXiv 1910.02054，消除数据并行里的显存冗余，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/1910.02054
    kind: paper
  - label: Megatron-LM 论文（arXiv 1909.08053，张量并行的原始方法，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/1909.08053
    kind: paper
  - label: FSDP 论文（arXiv 2304.11277，PyTorch 官方全分片数据并行经验，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/2304.11277
    kind: paper
  - label: DeepSpeed 官方仓库（微软官方：分布式训练与推理优化库，2026-10-21 直抓 200）
    url: https://github.com/deepspeedai/DeepSpeed
    kind: docs
  - label: Megatron-LM 官方仓库（NVIDIA 官方：规模化 transformer 训练研究框架，2026-10-21 直抓 200）
    url: https://github.com/NVIDIA/Megatron-LM
    kind: docs
  - label: torchtitan 官方仓库（PyTorch 官方：原生训练生成式模型的平台，2026-10-21 直抓 200）
    url: https://github.com/pytorch/torchtitan
    kind: docs
  - label: nanotron 官方仓库（Hugging Face 官方：极简 LLM 3D 并行训练，2026-10-21 直抓 200）
    url: https://github.com/huggingface/nanotron
    kind: docs
  - label: TRL 官方仓库（Hugging Face 官方：用强化学习训练 transformer，2026-10-21 直抓 200）
    url: https://github.com/huggingface/trl
    kind: docs
last_verified: 2026-10-21
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**模型一大，第一道坎不是算法，是装不下。**
一张显存装不下参数、梯度和优化器状态，训练就必须拆到很多张卡上。

这一篇讲拆法的分类学，以及开源工具链各站在哪一层。
本站不实测，工具能力一律以官方仓库自述与论文口径为准，出处列在文末。

## [三种拆法：数据、张量、流水线|Three ways to split: data, tensor, pipeline]

**数据并行**：每张卡都有完整模型，各吃一批数据，梯度汇总。
简单，但模型本身必须装得下——这是天花板。

**ZeRO 及其后代（FSDP）**：模型仍按数据并行跑，
但把优化器状态、梯度、参数分片到各卡，用时再取回。
ZeRO 论文（arXiv 1910.02054）的核心洞察：数据并行的显存浪费是冗余，不是必需。
PyTorch 的 FSDP 是这条思路的官方实现（arXiv 2304.11277）。

**张量并行**：把单层矩阵乘法切给多张卡同时算。
通信最密，一般只在单机内 NVLink 互联的卡之间用。
原始方法是 Megatron-LM 论文（arXiv 1909.08053）。

**流水线并行**：按层切段，前向像流水线一样逐段传递。
通信少，但要注意「气泡」——流水线空转的时段。

大模型训练实际是三者叠加（业界俗称 3D 并行），
再按集群拓扑调各维度的大小。Llama 3 论文自报的并行配置就是这种组合。

## [工具链地图：谁在哪一层|The toolchain map: who sits at which layer]

**DeepSpeed**（微软官方仓库）：通用分布式训练优化库，ZeRO 系列的落地处。

**Megatron-LM**（NVIDIA 官方仓库）：规模化 transformer 训练框架，
张量并行的参考实现，大量开放权重模型的训练底座。

**torchtitan**（PyTorch 官方仓库）：PyTorch 原生的训练平台，
把 FSDP、张量并行、流水线并行作为原生组合提供。

**nanotron**（Hugging Face 官方仓库）：极简的 3D 并行训练库，
官方自述就是「minimalistic」，读代码学并行策略的入口。

**TRL**（Hugging Face 官方仓库）：站在后训练层——SFT、奖励模型、
DPO、RLHF 的工具链，接在预训练框架之后用。

选型判断依据（不是排名）：想读懂并行原理，从 nanotron 或 torchtitan 入手；
要复现大模型训练，看目标模型的官方训练说明用了什么；
只做后训练微调，TRL 加 FSDP 通常够——预训练级并行根本用不上。

## [常见的坑|Common traps]

**把框架当配方。** 同一个框架换个并行配置，MFU 能差出几倍。
框架解决「能不能跑」，调优决定「跑得多贵」。

**低估通信。** 张量并行跨机跑，带宽墙会吃掉论文里看不到的性能。
各家论文自报的并行维度分配（哪些维度在机内、哪些跨机）值得照抄结构、不照抄数字。

**把训练栈与推理栈混为一谈。** 训练框架管「怎么造」，
vLLM 这类推理引擎管「怎么跑」，优化目标完全不同。

**拿开源栈的数字对标闭源大厂。** 大厂集群的网络拓扑、故障恢复、
检查点策略都是自研的。开源栈给你的是同量级的方法，不是同量级的利用率。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [张量并行](https://learn.specul.com/term/%E5%BC%A0%E9%87%8F%E5%B9%B6%E8%A1%8C/) 与
[流水线并行](https://learn.specul.com/term/%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%B9%B6%E8%A1%8C/) 是使用者视角的一页科普；
这一篇是从业者的选型地图：各工具站在哪一层、坑在哪。

同一个概念在两处深度不同，互链不重复。
语料与算力的记账方法见上一篇「数据与算力」。
