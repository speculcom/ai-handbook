---
id: evaluation
topic: evaluation
title: agent 评测
titleEn: Evaluating agents
summary: 没有评测就没有迭代：上线前用数据集测回归，上线后盯住真实流量，以及评测器自己会犯的坑。
summaryEn: No evaluation, no iteration — offline regression testing, live monitoring, and the pitfalls of evaluators themselves.
sources:
  - label: LangSmith 官方文档 · Evaluation（2026-10-20 直抓 200）
    url: https://docs.langchain.com/langsmith/evaluation
    kind: docs
  - label: Anthropic 工程博客 · Building effective agents（2026-10-20 WebFetch 核验官方页）
    url: https://www.anthropic.com/engineering/building-effective-agents
    kind: docs
  - label: Reflexion 论文（arXiv 2303.11366，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2303.11366
    kind: paper
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**agent 评测就是用数据集和评分器量化「改完是变好还是变坏」。**
没有它，「优化提示词」只是手感；有了它，每次改动才有账可查。
评测分两个战场：上线前测回归，上线后盯真实流量。

## [两个战场|Two battlefields]

LangSmith 官方文档把评测按运行时机分成两类。

**离线评测**：在开发时用整理好的数据集跑，
目的是比较版本、基准测试、抓回归。
**官方一句话**："Test before you ship"。

**在线评测**：对生产环境的真实交互实时评分，
做安全筛查、格式校验、质量启发式检测。
**官方一句话**："Monitor in production"。

两者的数据是通着的：线上看到的失败，
应该能沉淀成数据集里的一条用例。
**LangSmith 官方原文**："Add failing production traces to your dataset, create targeted evaluators, validate fixes with offline experiments, and redeploy."
这个回环是评测体系能长期活着的关键。

## [四类评分器|Four kinds of evaluators]

官方列出四类评分方式：

| 评分器 | 怎么工作 | 适合 |
|---|---|---|
| 人工评审 | 人直接看 | 高质量金标准，贵 |
| 代码规则 | 正则、断言、确定性检查 | 格式、必含字段 |
| LLM 当裁判 | 用模型给输出打分 | 主观质量，规模化 |
| 两两对比 | 同一个问题比两个版本 | 二选一的迭代 |

代码规则最便宜也最可信——能算出来就别问模型。
LLM 当裁判放主观维度，但裁判自己也会错，
它的评分标准要写成可复用的指令，不能每次现编。

## [一次完整评测长什么样|One full workflow]

官方给出的四步：

1. 建数据集：手工用例、历史 trace、或合成生成。
2. 定评分器：按上面四类选。
3. 跑实验：整个应用在数据集上跑一遍，可配置重复次数和并发。
4. 分析结果：比较实验，做基准、单测、回归、回测。

agent 的评测比单轮问答多一层：**过程也要查**。
最终答案对了，中间是不是调错了工具、绕了十圈，成本完全不同。
这也是 trace（轨迹记录）在 agent 评测里必不可少的原因。

## [评测自己的坑|Pitfalls of evaluation]

1. 数据集漂移：用例停留在三个月前的场景，线上早就没人那么问了。
2. 裁判偏见：LLM 偏好长答案、偏好自己熟悉的格式，
   用 LLM 评 LLM 要定期和人工抽检对齐。
3. 过拟合数据集：为刷分优化，泛化反而降——留一份从没用来调过参数的数据。
4. 只看通过率：80% 到 85% 可能全挤在简单用例上，要看分类目、分难度的细分。

Reflexion 论文展示的是另一个方向：**用反馈信号本身当评测**。
它的 verbal reinforcement 把环境反馈转成语言反思存起来，
本质上是被动反馈驱动、自我执行的评测循环。
思路可借，但报告的数字（91% pass@1）是特定基准上的结果，
换任务不保证复现。

**Anthropic 官方原文**："optimizing single LLM calls with retrieval and in-context examples is usually enough"——
先确认简单方案真的到顶了，再上复杂评测基建。
