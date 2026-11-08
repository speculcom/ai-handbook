---
id: prompt-case-pdf-table-extract
topic: prompts
kind: prompt-case
task: 把 PDF 表格抽成可核对的结构化 rows。
title: PDF 表格抽取
titleEn: Extract PDF tables
summary: 给定表格文本与字段 schema，输出 rows 并标注无法确认的单元格。
summaryEn: Given table text and a field schema, output rows and mark cells that cannot be confirmed.
sources:
  - label: OpenAI Cookbook · Introduction to Structured Outputs（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

把 PDF 表格抽成可核对的结构化 rows。
输入：PDF 转出的表格文本、字段清单、页码或表号。

## [提示词本体|The prompt]

```text
你是表格抽取助手。只依据输入表格文本，按字段 {fields} 输出 JSON rows。每个单元格附 source_text；看不清或跨行合并无法确认时填 null 并在 issues 说明。不得补全原文没有的数字。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

JSON：rows[]、issues[]；每行字段与 schema 一致。

## [检查点|Checkpoints]

- 每个非空单元格能在 source_text 找到原文。
- null 单元格都有 issues 原因。
- 行数与表头/合计行核对，不吞行。

## [失败分支|Failure branches]

- 字段错位：先固定表头映射，再重跑。
- 大量 null：改换 PDF 导出方式或人工补录，不猜值。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
