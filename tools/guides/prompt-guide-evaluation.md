---
id: prompt-guide-evaluation
topic: prompts
kind: prompt-guide
title: 先定义失败再谈改进
titleEn: Define failure before improving
summary: 评测飞轮三步：人工标注失败模式、建自动评分器、校准 LLM 裁判，让每次提示词改动可比较。
summaryEn: The evaluation flywheel in three steps — annotate failures by hand, build automatic graders, calibrate the LLM judge — so every prompt change is comparable.
sources:
  - label: OpenAI Cookbook · Building resilient prompts using an evaluation flywheel（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md
    kind: docs
  - label: OpenAI Cookbook · Getting Started with OpenAI Evals（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Getting_Started_with_OpenAI_Evals.ipynb
    kind: docs
  - label: Judging LLM-as-a-Judge 论文（arXiv 2306.05685，2026-11-07 直抓摘要页）
    url: https://arxiv.org/abs/2306.05685
    kind: paper
last_verified: 2026-11-07
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**评测回答一个问题：这次改动，比上次好还是坏。**
OpenAI 给「有韧性的提示词」下了定义：
"one that provides high-quality responses across the full breadth of possible inputs"。
要靠评测而不是感觉达到它。官方推荐的路径叫评测飞轮：
分析（Analyze）→ 测量（Measure）→ 改进（Improve），循环往复。
效果未实测；以下机制均出自官方教程与论文。

## [第一步：人工看失败|Step one: examine failures by hand]

飞轮从定性分析起步：人工检查错误样本并标注。
官方教程给了两步标注法：
开放编码：读约 50 条失败轨迹，给每个错误贴描述性标签，先求发现不求体系；
轴向编码：把标签归并成高层类别，得到失败分布的量化图景。
哪类失败占大头，改进就先打哪里。

为什么不能直接上自动指标？官方说得很直：
自动指标能跟踪进度，但回答不了「为什么失败」。
标注把散乱的错误变成可行动的路线图。

## [第二步：建自动评分器|Step two: build automatic graders]

把失败模式变成测试集和评分器（grader），测量才能规模化。
OpenAI Evals 教程分两类评分：
代码逻辑判分——字符串匹配、JSON 可否解析，简单可靠；
模型判分——让模型按标准检查答案，覆盖开放式输出。

教程举的评分器例子：格式评分器看输出是否符合格式，
准确性评分器对照数据集里的真值列。
此后每次改动——换提示词、调参数、加边缘案例——都跑一遍。
官方建议把评分器接进 CI/CD，部署前先过线。

## [LLM 裁判与偏差|LLM judges and their biases]

模型判分能规模化，但裁判本身要审。
论文系统检查了 LLM 裁判的偏差：位置偏差、冗长偏差、自我增强偏差，
以及推理能力不足。强裁判与人类偏好的一致性可达人类之间的水平（论文报告）。

官方教程给了校准裁判的流程：
用领域专家的标注当金标准；测试集通常不平衡，总准确率会骗人——
一个永远判「过」的裁判也能拿高准确率，却抓不到任何失败。
要看 TPR（抓失败的能力）和 TNR（放行正确的能力）两个指标。
数据分三份：训练集给裁判提示词当示例，验证集用来调裁判，
测试集只在最后跑一次，防止过拟合。

## [测试数据从哪来|Where test data comes from]

首选生产日志里的真实输入输出。
数据不够时用合成数据，但别只说「生成 N 个例子」——官方提醒这样会同质化。
结构化做法：定义查询的关键维度（如渠道 × 意图 × 角色），
按维度组合生成，覆盖更广。
再加扰动：掺无关信息、故意写错、换口语说法，逼出边缘行为。

## [失败模式|Failure modes]

1. prompt-and-pray：改完就上线，祈祷不出事。官方用这个词形容无评测迭代。
2. 裁判失真：不校准就信分数，偏差和盲区一起进了结论。
3. 测试集泄漏：拿测试集调裁判或调提示词，最后的分数不再可信。
4. 只看通过率：不知道失败集中在哪类，改进没有优先级。
5. 以为飞轮会停：旧失败修好，更隐蔽的新失败冒出来，循环重新开始。

评测的产出不是分数，是「下一次改哪里」的路线图。

## [出处|Sources]

- [OpenAI Cookbook · Building resilient prompts using an evaluation flywheel](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md)
- [OpenAI Cookbook · Getting Started with OpenAI Evals](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Getting_Started_with_OpenAI_Evals.ipynb)
- [Judging LLM-as-a-Judge（arXiv 2306.05685）](https://arxiv.org/abs/2306.05685)

核验日 2026-11-07，三条均直抓成功。
OpenAI 文档主站本次网络不可达，官方内容取自其官方仓库 raw 文件。