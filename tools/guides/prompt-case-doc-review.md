---
id: prompt-case-doc-review
topic: prompts
kind: prompt-case
task: 按清单审查文档条款并标出缺失与风险。
title: 文档条款审查
titleEn: Document clause review
summary: 输出条款核对表；只标原文支持的问题，不给法律结论。
summaryEn: Output a clause checklist; flag only source-supported issues and give no legal conclusion.
sources:
  - label: Anthropic 官方教程 · Separating Data and Instructions（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/04_Separating_Data_and_Instructions.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

按清单审查文档条款并标出缺失与风险。
输入：文档原文、审查清单、适用范围说明。

## [提示词本体|The prompt]

```text
按清单 {checklist} 审查文档。输出 items[]：clause、status(present/missing/unclear)、quote、risk_note。quote 必须逐字来自文档；risk_note 只描述条件与后果，不写合法/违法结论。文档外的清单项标 missing。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

条款核对表 items[]，含状态、逐字引文和风险备注。

## [检查点|Checkpoints]

- quote 能逐字回连文档。
- missing 项确实不在文档中。
- risk_note 不含法律定性。

## [失败分支|Failure branches]

- 引文改写：改为逐字摘录或标 unclear。
- 清单过宽：缩小到本次文档类型。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
