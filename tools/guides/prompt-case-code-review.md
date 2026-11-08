---
id: prompt-case-code-review
topic: prompts
kind: prompt-case
task: 按清单审查 diff 并标出证据位置。
title: 代码审查清单
titleEn: Code review checklist
summary: 输出问题清单；每条挂 diff 行号，不写风格偏好排名。
summaryEn: Output an issue list; each item cites diff lines and avoids style-preference ranking.
sources:
  - label: Anthropic 官方教程 · Separating Data and Instructions（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/04_Separating_Data_and_Instructions.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

按清单审查 diff 并标出证据位置。
输入：diff、审查清单、项目约束。

## [提示词本体|The prompt]

```text
审查 diff。输出 issues[]：category、file、lines、evidence、suggestion、severity_reason。evidence 必须引用 diff 原文；只按 {checklist} 与 {constraints} 判断，不写个人风格偏好。无法确认标 unclear。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

issues[]，含行号与逐字证据。

## [检查点|Checkpoints]

- 每条 evidence 在 diff 中。
- severity_reason 可核对。
- 无清单外主观偏好。

## [失败分支|Failure branches]

- 误报过多：缩小清单到本次约束。
- 行号错位：重新定位 diff hunk。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
