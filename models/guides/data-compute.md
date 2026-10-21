---
id: data-compute
stage: 5
title: 数据与算力：做模型的两大开销
titleEn: Data and compute: the two big bills of making a model
summary: 语料从哪来、怎么洗到万亿 token；算力怎么用 GPU-hours 与 MFU 记账；成本量级怎么估——只讲构成方法，不存任何单价。从业者视角；词条版在学 AI 站，互链不重复。
summaryEn: Where corpora come from and how they get washed down to trillions of tokens; how compute is booked in GPU-hours and MFU; how to estimate cost magnitude — method only, no unit prices stored. Practitioner view; the term pages live on the Learn site, cross-linked, not duplicated.
sources:
  - label: Common Crawl 官网（免费开放网页存档的非营利组织，2026-10-21 直抓 200）
    url: https://commoncrawl.org
    kind: docs
  - label: FineWeb 技术报告（arXiv 2406.17557，15T token 开放语料与逐步消融，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/2406.17557
    kind: paper
  - label: DCLM 技术报告（arXiv 2406.11794，240T token 标准化语料与筛选对照，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/2406.11794
    kind: paper
  - label: Dolma 技术报告（arXiv 2402.00159，AI2 官方 3T token 研究语料，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/2402.00159
    kind: paper
  - label: Chinchilla 论文（arXiv 2203.15556，算力最优配比，2026-10-21 复核摘要页）
    url: https://arxiv.org/abs/2203.15556
    kind: paper
  - label: DeepSeek-V3 论文（arXiv 2412.19437，自报 2.788M H800 GPU 小时与 14.8T token，2026-10-21 直抓摘要页）
    url: https://arxiv.org/abs/2412.19437
    kind: paper
  - label: Llama 3 论文（arXiv 2407.21783，自报 16K H100、15.6T token、MFU 38–43%、419 次意外中断，2026-10-21 直抓全文）
    url: https://arxiv.org/abs/2407.21783
    kind: paper
  - label: PaLM 论文（arXiv 2204.02311，自报 6144 块 TPU v4 与训练 FLOPs 表，2026-10-21 直抓全文）
    url: https://arxiv.org/abs/2204.02311
    kind: paper
  - label: GLaM 论文（arXiv 2112.06905，MoE 训练能耗约为 GPT-3 的三分之一，2026-10-21 经检索核实摘要口径）
    url: https://arxiv.org/abs/2112.06905
    kind: paper
last_verified: 2026-10-21
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**做模型的钱主要花在两处：数据与算力。**
这一篇讲从业者怎么给这两笔开销记账：语料从哪来、洗到什么规模；
算力用什么单位自报、利用率实际有多高；成本量级怎么估。

本站不实测，也不收录任何具体价格。
所有数字都是论文或官方报告自报的口径，出处列在文末。

## [语料从哪来：Common Crawl 与清洗管线|Where corpora come from: Common Crawl and the washing pipeline]

预训练语料的主力来源是 Common Crawl——
一家非营利组织维护的免费开放网页存档，每月发布一批 dump。

原始网页是脏的。同一篇文章在几十个站点上有几十个副本。
导航栏、模板文本、机器生成内容混在正文里。
清洗管线大致是：抽正文、按语言筛、启发式过滤、去重。

去重是整条管线里最贵的步骤之一。
Common Crawl 各批 dump 之间互相重叠。
跨批去重要在几十万亿 token 上做相似度匹配。
FineWeb 报告把每一步的取舍都做了消融，公开可查。

## [开放语料三件套：FineWeb、DCLM、Dolma|Three open corpora: FineWeb, DCLM, Dolma]

头部模型的语料配方多数不公开。公开语料的价值就在这里：
让没预算攒数据的人也能训出能用的模型。

FineWeb（Hugging Face）：15T token，来自 96 批 Common Crawl 存档。
另附教育向子集 FineWeb-Edu，1.3T token。

DCLM（普林斯顿）：语料标准化到 240T token，训练预算固定。
参与者只比一项：数据筛选方法。结论直白：多喂不如喂对。

Dolma（AI2）：3T token 英文研究语料，明确定位是给科研用的对照底座。

三家都把清洗代码一起放出。选开放语料时看许可与清洗记录，
别只看 token 总数——总数大、洗得糙，训出来照样差。

## [算力怎么记账：GPU-hours 与 MFU|Booking compute: GPU-hours and MFU]

训练算力通行的记账单位是「卡时」：一张加速卡跑一小时。
论文自报口径各不相同，比较前先看清是什么卡。

DeepSeek-V3 论文自报：完整训练用了 2.788M 个 H800 卡时。
Llama 3 论文自报：405B 模型最多用 16K 块 H100 训练。
PaLM 论文自报：6144 块 TPU v4，训练 FLOPs 约 2.56×10²⁴。
三篇论文的编号都在文末出处清单里。

卡与卡不同代、不同厂商，卡时不能直接互比。
跨硬件比较用 FLOPs（浮点运算次数）更公平，但论文未必都报。

MFU（模型算力利用率）是另一个关键口径：
模型真正用到的运算，除以硬件理论峰值。
Llama 3 论文自报 MFU 38–43%。
也就是说，一半以上硬件时间花在通信、重算与故障恢复上。
看别人晒的「卡数」时，先问 MFU，不然会严重低估真实开销。

## [规模之外：故障也是成本|Beyond scale: failures are a cost too]

千卡级训练里，硬件故障不是意外，是日常。
Llama 3 论文自报：预训练 54 天快照期内共 466 次任务中断，
其中 419 次是意外中断，约 78% 归因于硬件问题；
即便如此，有效训练时间仍超过 90%。

这意味着算力账单里含一大块「白烧」：
故障回滚掉的重训、检查点保存、为稳定性预留的冗余。
DeepSeek-V3 摘要自报：全程没有不可恢复的 loss spike，也没有回滚。
这句话被当成卖点写进摘要，说明它在业界是稀缺事件。

架构选择也能改这笔账。GLaM 论文自报：
模型 1.2 万亿参数，训练能耗约为 GPT-3 的三分之一，推理 FLOPs 约一半。
稀疏激活省的是「每个 token 激活的参数量」，不是参数量本身。

## [成本量级怎么估：讲方法，不存单价|Estimating cost magnitude: method, not unit prices]

训练成本的构成是一条乘法链：
卡时数 × 每卡每小时的租用价格 ≈ 训练成本。

第一项论文会自报（见上节）；第二项随市场每月波动，
本站按纪律不收录任何具体单价，也不做「训一个模型要多少钱」的报价。

能诚实给出的是量级判断方法：
先查同规模模型的自报卡时；再按 Chinchilla 口径核对训练量，
即每参数约 20 个 token；最后用 MFU 修正硬件利用率。
三步走完，你至少知道这笔账是十万卡时级还是千万卡时级。
这已经足够支撑「要不要自己做模型」的判断。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [训练语料](https://learn.specul.com/term/%E8%AE%AD%E7%BB%83%E8%AF%AD%E6%96%99/)、
[训练算力](https://learn.specul.com/term/%E8%AE%AD%E7%BB%83%E7%AE%97%E5%8A%9B/) 与
[AI 芯片](https://learn.specul.com/term/AI%20%E8%8A%AF%E7%89%87/) 是使用者视角的一页科普；
这一篇讲从业者怎么记账：语料管线、自报口径、利用率与故障成本。

同一个概念在两处深度不同，互链不重复。
把并行训练落地的开源工具链见本站「开源训练栈」篇。
