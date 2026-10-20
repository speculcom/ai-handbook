---
id: sft
stage: 2
title: SFT：让续写机器学会「好好回答」
titleEn: SFT: teaching a completion machine to answer well
summary: 监督微调在预训练之后做什么——指令数据从哪来、质量为什么压过数量、LoRA 这类省显存做法的边界。从业者视角深版；一页科普在学 AI 站。
summaryEn: What supervised fine-tuning adds after pre-training — where instruction data comes from, why quality beats quantity, and the limits of memory-savers like LoRA. Practitioner depth; the one-page explainer lives on the Learn site.
sources:
  - label: InstructGPT 论文（arXiv 2203.02155，SFT→奖励模型→RL 三阶段的原始流程，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2203.02155
    kind: paper
  - label: LLaMA 2 论文（arXiv 2307.09288，SFT 数据量与蒸馏（SFT 自举）做法，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2307.09288
    kind: paper
  - label: FLAN 论文（arXiv 2109.01652，指令模板池化训练，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2109.01652
    kind: paper
  - label: LIMA 论文（arXiv 2305.11206，「1000 条精选样本」的少数据 SFT 实验，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2305.11206
    kind: paper
  - label: LoRA 论文（arXiv 2106.09685，低秩适配的原始方法，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2106.09685
    kind: paper
  - label: QLoRA 论文（arXiv 2305.14314，4-bit 基座 + LoRA 的微调路线，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2305.14314
    kind: paper
  - label: OpenAI Cookbook · Finetuning 指南（官方微调教程与数据格式，2026-10-20 直抓 200）
    url: https://cookbook.openai.com/examples/openai_llm_cookbook
    kind: docs
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**SFT 就是拿「问题 → 好回答」的示范对，继续训练预训练模型。**

预训练模型会续写，但不会对话：你问它问题，
它可能把问题续写成「这个问题有以下几种答案……」而不是直接回答。
SFT 教的是形式与分寸：按对话格式答、别瞎编、该拒就拒。

## [数据从哪来：人写、模型写、混合|Where the data comes from]

InstructGPT（arXiv 2203.02155）的路线是外包标注员写示范回答，
成本高、规模小（SFT 阶段约一万多条）。

FLAN（arXiv 2109.01652）走另一路：
把上百个传统 NLP 数据集改写成指令模板，让模型见遍任务形态。

LLaMA 2（arXiv 2307.09288）混合两者，并加入自举：
用自家模型生成候选、人工筛，扩大数据量。

现在开放权重家族的 SFT 配方多数只公开数量不公开来源明细，
本站按官方写明的部分转述；没写明的不猜。

## [质量压过数量：LIMA 一役|Quality beats quantity: the LIMA result]

LIMA（arXiv 2305.11206）只用 1000 条人工精选样本做 SFT，
输出质量接近数万条的流水线数据。

结论不是「1000 条就够」，而是：SFT 主要教形式，知识在预训练里已经有了。
示范对里的知识含量不重要，回答的风格、结构、边界才是它学的东西。

从业者推论：SFT 数据里混进错误事实，模型学到的不是那条事实，
是「这种错误说法是合格回答」的风格。数据审核的重点在示范质量，不在条数。

## [省显存微调：LoRA 与 QLoRA|Memory-savers: LoRA and QLoRA]

全参数微调要存全部梯度和优化器状态，显存翻倍不止。

LoRA（arXiv 2106.09685）冻结基座权重，只训注入的低秩小矩阵。
可训参数降到千分之几，产物只有几十 MB，可以热插拔换装。

QLoRA（arXiv 2305.14314）把基座压到 4-bit 再挂 LoRA，
单卡微调 30B/65B 成为可能——本站收录的不少社区微调模型走的就是这条路。

边界要如实说：LoRA 改「表达与风格」效率高，往模型里灌新知识的效果弱于全参训练。
低秩增量装不下多少新事实。「用 LoRA 把私有知识库训进模型」通常是错的工具，
检索（RAG）才是常规解。

## [SFT 之后：对齐另有一步|What comes after SFT]

SFT 教了形式，但「哪个回答更好」它只会模仿示范，不会判断。
判断好坏交给下一步——奖励模型与偏好优化（RLHF/DPO），见下一篇。

学 AI 站的 [训练三阶段](https://learn.specul.com/term/训练三阶段/) 词条
把三步的科普版一页讲完；这一篇是每步的从业者深版。

## [和学 AI 站的分工|How this differs from the Learn site]

使用者视角的一页科普：学 AI 站的 [监督学习](https://learn.specul.com/term/监督学习/)
与 [训练三阶段](https://learn.specul.com/term/训练三阶段/)。

本篇讲数据路线的取舍、LIMA 的口径变化、LoRA 的适用边界——
同一个词，两处深度不同，互链不重复。
