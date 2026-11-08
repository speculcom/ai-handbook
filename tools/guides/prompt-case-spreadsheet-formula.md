---
id: prompt-case-spreadsheet-formula
topic: prompts
kind: prompt-case
task: 生成表格公式并给校验样例。
title: 表格公式
titleEn: Spreadsheet formula
summary: 输出公式、假设与手算样例；不假装已运行表格。
summaryEn: Output formula, assumptions and a hand-check example; do not pretend the sheet was run.
sources:
  - label: OpenAI Cookbook · Introduction to Structured Outputs（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

生成表格公式并给校验样例。
输入：列定义、计算目标、边界条件。

## [提示词本体|The prompt]

```text
为电子表格写公式。列定义：{columns}。目标：{goal}。输出 formula、assumptions[]、hand_check（输入与预期结果）、edge_cases[]。公式只能引用给定列；空值与除零必须处理。声明未在实际表格运行。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

formula、assumptions、hand_check、edge_cases。

## [检查点|Checkpoints]

- 手算样例可独立复核。
- 空值/除零有处理。
- 引用列都在定义内。

## [失败分支|Failure branches]

- 公式依赖隐藏列：补列定义或改写。
- 边界结果不确定：标 edge_case 待人工核。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
