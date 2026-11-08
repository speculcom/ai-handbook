---
id: prompt-guide-iteration
topic: prompts
kind: prompt-guide
title: 提示词迭代的方法
titleEn: How to iterate on prompts
summary: 改提示词要有基线和测量：人工对比、元提示、自动搜索、生成-评估循环，四条路各讲机制与代价。
summaryEn: Prompt changes need baselines and measurement — manual comparison, meta-prompting, automated search, and generate-evaluate loops, with mechanisms and costs.
sources:
  - label: OpenAI Cookbook · Meta Prompting（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Enhance_your_prompts_with_meta_prompting.ipynb
    kind: docs
  - label: Anthropic Cookbook · Evaluator-Optimizer（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/anthropics/anthropic-cookbook/main/patterns/agents/evaluator_optimizer.ipynb
    kind: docs
  - label: APE 论文（arXiv 2211.01910，2026-11-07 直抓摘要页）
    url: https://arxiv.org/abs/2211.01910
    kind: paper
last_verified: 2026-11-07
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**改提示词而不测量，只是换种方式碰运气。**
迭代有四条路：人工对比、元提示、自动搜索、运行时生成-评估循环。
自动化程度递增，人的判断逐渐从「改措辞」移到「定标准」。
效果未实测；以下机制均出自官方教程与论文。

## [人工迭代：基线对比|Manual iteration: baseline comparison]

OpenAI 的元提示教程演示了完整流程：
先写一条简单提示词当基线，再生成增强版，
两者在同一数据集上各跑一遍，按预定义标准逐项评分。
对比的关键是控制变量：输入与评分标准不变，差异才能归因到提示词。

教程用的评分方式是 LLM 裁判：
让模型按准确性、清晰度、相关性等标准比较两份输出。
没有这一步，「感觉更好」只是印象，不是结论。

## [元提示：让模型改提示词|Meta-prompting: let the model rewrite the prompt]

元提示的定义：用 LLM 生成或改进提示词。
OpenAI 教程的典型配置：更强的模型为较弱的模型优化提示词。
给优化器的输入要包含上下文与目标，它才能产出有针对性的增强版。

一个省力的细节：评分用的裁判提示词，本身也可以元提示优化。
也就是说，迭代方法可以套用在自己身上。
代价：优化器加了一跳调用，且增强版是否更好仍要跑对比才知道。

## [自动搜索：APE|Automated search: APE]

APE 论文把指令当作「程序」来做合成：
LLM 提出一批候选指令，搜索在其中最大化选定的评分函数，
再用另一个 LLM 的零样本表现评估选中的指令。
论文报告：在 24 个 NLP 任务上，自动生成的指令大幅超过零样本基线，
其中 19 个任务达到或超过人工标注的指令（论文自述，非本站实测）。

机制上的要点：评分函数决定搜索方向。
分数定义偏了，选出的指令就偏了——标准要先于搜索想清楚。

## [运行时循环：生成器与评估器|Runtime loop: generator and evaluator]

Anthropic 的 evaluator-optimizer 模式把迭代搬到运行时：
生成器产出答案，评估器只评不解，给出 PASS / NEEDS_IMPROVEMENT / FAIL 与反馈；
未通过时，生成器带着历史尝试和反馈重新生成，直到通过。
参考实现里，评估器被明确要求「只评估，不尝试解题」，
输出走 XML 标签，方便程序分支。

注意：参考实现循环到 PASS 为止，没有步数上限。
生产环境要自设步数上限与兜底出口（本站观点）。

## [失败模式|Failure modes]

1. 无基线：改完觉得好了，其实没比较过。先跑基线再谈改进。
2. 标准错位：评分函数或裁判标准没对齐真实目标，越优化越偏。
3. 同盲区：评估器与生成器是同类模型时，可能共享同一盲区（本站观点）。
4. 不收敛：生成-评估循环没有上限，token 烧完仍未通过。
5. 小样本过拟合：只对几个例子优化，提示词会记住例子而不是学会任务（本站观点）。

四条路的共同前提：先定义什么叫「好」，再让任何机制去逼近它。

## [出处|Sources]

- [OpenAI Cookbook · Meta Prompting](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Enhance_your_prompts_with_meta_prompting.ipynb)
- [Anthropic Cookbook · Evaluator-Optimizer](https://raw.githubusercontent.com/anthropics/anthropic-cookbook/main/patterns/agents/evaluator_optimizer.ipynb)
- [APE 论文（arXiv 2211.01910）](https://arxiv.org/abs/2211.01910)

核验日 2026-11-07，三条均直抓成功。
OpenAI 与 Anthropic 的文档主站本次网络不可达，官方内容取自两家官方仓库的 raw 文件。