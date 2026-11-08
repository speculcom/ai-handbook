---
id: prompt-case-eval-rubric
topic: prompts
kind: prompt-case
task: 设计可观察评测量规，不打分排名。
title: 评测量规
titleEn: Evaluation rubric
summary: 输出维度与可观察判据；禁止总分排行。
summaryEn: Output dimensions and observable criteria; no total-score ranking.
sources:
  - label: OpenAI Cookbook · Building resilient prompts using an evaluation flywheel（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

设计可观察评测量规，不打分排名。
输入：评测目标、任务样本、约束。

## [提示词本体|The prompt]

```text
设计量规。输出 dimensions[]：name、observable_criteria[]、evidence_required、failure_examples。判据必须可观察、可复核；不得给权重总分或排名。若需模型评判，写明位置偏差与人工抽检口径。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

dimensions[]，无总分排行。

## [检查点|Checkpoints]

- 判据可观察。
- 无权重总分。
- 模型评判有偏差口径。

## [失败分支|Failure branches]

- 判据空泛：改成可核对动作。
- 维度重叠：合并或拆清。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
