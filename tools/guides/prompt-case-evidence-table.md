---
id: prompt-case-evidence-table
topic: prompts
kind: prompt-case
task: 把主张与来源逐条对齐成证据表。
title: 证据表
titleEn: Evidence table
summary: 输出主张-证据-条件表；无来源主张标 unsupported。
summaryEn: Output a claim-evidence-conditions table; unsupported claims are marked.
sources:
  - label: OpenAI Cookbook · Building resilient prompts using an evaluation flywheel（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

把主张与来源逐条对齐成证据表。
输入：主张清单、来源片段、核验口径。

## [提示词本体|The prompt]

```text
建证据表。输出 rows[]：claim、source、quote、conditions、status(supported/unsupported/unclear)。quote 必须逐字来自来源；conditions 写适用范围。找不到来源则 status=unsupported，不得用常识补。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

rows[]，含状态与条件。

## [检查点|Checkpoints]

- quote 逐字命中。
- unsupported 明确。
- conditions 不空泛。

## [失败分支|Failure branches]

- 来源片段缺：补片段再核。
- 主张过宽：拆子主张。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
