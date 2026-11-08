---
id: prompt-case-literature-screen
topic: prompts
kind: prompt-case
task: 按纳入排除标准筛选文献。
title: 文献筛选
titleEn: Literature screening
summary: 输出筛选表与理由；只依据标题摘要，不编全文结论。
summaryEn: Output a screening table with reasons; use titles/abstracts only and do not invent full-text conclusions.
sources:
  - label: OpenAI Cookbook · Building resilient prompts using an evaluation flywheel（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

按纳入排除标准筛选文献。
输入：文献标题摘要、纳入标准、排除标准。

## [提示词本体|The prompt]

```text
按标准筛选文献。输出 decisions[]：id、decision(include/exclude/uncertain)、criterion、quote。quote 来自标题/摘要；uncertain 必须写缺什么信息。不得依据未提供的全文下结论。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

decisions[]，含标准与逐字依据。

## [检查点|Checkpoints]

- 每条 decision 有 criterion。
- quote 在摘要/标题中。
- uncertain 写缺失信息。

## [失败分支|Failure branches]

- 标准模糊：先写可判定条件。
- 摘要不够：标 uncertain 待全文。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
