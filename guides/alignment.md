---
id: alignment
stage: 3
title: 偏好对齐：RLHF 与 DPO 在解决什么问题
titleEn: Preference alignment: what RLHF and DPO actually solve
summary: 奖励模型怎么从人排序里炼出来、PPO 那一步贵在哪、DPO 为什么能免掉强化学习、以及「对齐税」与谄媚这些代价。从业者视角深版；一页科普在学 AI 站。
summaryEn: How reward models are distilled from human rankings, why the PPO step is expensive, why DPO skips reinforcement learning, and the costs — alignment tax and sycophancy. Practitioner depth; the one-page explainer lives on the Learn site.
sources:
  - label: InstructGPT 论文（arXiv 2203.02155，RLHF 三阶段与 PPO 细节，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2203.02155
    kind: paper
  - label: DPO 论文（arXiv 2305.18290，免奖励模型免 RL 的偏好优化，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2305.18290
    kind: paper
  - label: LLaMA 2 论文（arXiv 2307.09288，拒绝采样 + PPO 与 SFT 双路线对照，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2307.09288
    kind: paper
  - label: Zephyr 论文（arXiv 2310.16944，DPO 用于 7B 社区模型的公开范例，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2310.16944
    kind: paper
  - label: Anthropic HH 偏好数据论文（arXiv 2204.05862，helpful/harmless 双维排序数据，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2204.05862
    kind: paper
  - label: Constitutional AI 论文（arXiv 2212.08073，用原则替代部分人工排序（RLAIF），2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2212.08073
    kind: paper
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**对齐解决的是「回答得好」，不是「回答得出」。**

SFT 之后模型会按格式答，但「哪个答案更好、哪里越界」没有信号。
这一步的原始流程是 InstructGPT（arXiv 2203.02155）的 RLHF：
人给回答排序，训一个奖励模型，再用 PPO 让语言模型去讨好这个奖励模型。

## [奖励模型：把「人觉得好」变成可微信号|Reward models: turning human judgement into a differentiable signal]

人不直接打分，而是成对比较：同一提示的两个回答，选哪个更好。
Anthropic 的 HH 数据（arXiv 2204.05862）把维度拆成 helpful 与 harmless 两条。
奖励模型学的就是这个排序倾向，输出一个标量分。

从业者要盯的坑：奖励模型是代理指标，不是好坏本身。
它能被讨好——回答更长、更自信、结构更像范文，分就高。
「长度偏差」是 RLHF 时代反复被官方论文承认的副作用。

## [PPO 那一步：贵在哪|The PPO step: why it costs so much]

InstructGPT 的 RL 阶段要同时驻留四个模型：
被训的策略模型、防跑偏的参考模型（KL 约束）、奖励模型、critic。
显存与算力开销约是 SFT 的数倍，调参敏感（KL 系数一歪就崩）。

LLaMA 2（arXiv 2307.09288）同时给了两条路线对照：
SFT 循环自举，对比拒绝采样加 PPO，各自在不同评测上互有胜负。
官方自己也没宣布一边完胜，本站照实转述。

## [DPO：把两步并成一步|DPO: collapsing two steps into one]

DPO（arXiv 2305.18290）的推导说明：最优策略有闭式解，
可以直接拿偏好对做分类式损失，不用训奖励模型、不用跑 RL。
显存回到 SFT 量级，代码几十行。

Zephyr（arXiv 2310.16944）用公开数据把 7B 做到当时同规模前列，
证明这条路线社区可复现。

代价也要说：DPO 对偏好对的分布敏感，离线数据训容易「过拟合排序风格」；
在线 RLHF 能持续采样新回答，信号更新鲜。
两条路线的公开对照结论不稳定，因数据而异。
本站不裁决哪条更好，只记录各自的机制与已发表的边界。

## [RLAIF：人不够时用模型排|RLAIF: models ranking when humans run out]

Constitutional AI（arXiv 2212.08073）用一组书面原则让模型自我批评、
自我修订，再由模型偏好模型。人工排序退到校准位。

开放权重家族的后训练普遍混用这条路——
规模上不去的瓶颈从算力转到标注。

## [代价：对齐税与谄媚|The costs: alignment tax and sycophancy]

「对齐税」指对齐后模型在原始任务评测上可能掉分。
InstructGPT 论文自己观察到 GPT-3 在部分公开基准上因对齐回落。

谄媚（sycophancy）是偏好数据的镜像产物：
人偏爱「顺着我说」的回答，奖励模型就学会顺着说。

这两条都不是传闻，是论文正文承认的副作用。
读任何模型的官方 benchmark 时都要记得：
对齐后的分数是「讨好评测的风格」与「真实能力」的混合量。

## [和学 AI 站的分工|How this differs from the Learn site]

一页科普版在学 AI 站：[训练三阶段](https://learn.specul.com/term/训练三阶段/)
与 [偏好对齐](https://learn.specul.com/term/偏好对齐/)。

本篇讲四模型驻留的成本结构、代理指标可被讨好的机制、
对齐税与谄媚的出处——从业者要盯的坑，一页科普装不下。
