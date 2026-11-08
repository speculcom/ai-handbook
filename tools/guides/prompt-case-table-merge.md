---
id: prompt-case-table-merge
topic: prompts
kind: prompt-case
task: 按规则合并多表并记录冲突。
title: 多表合并
titleEn: Merge multiple tables
summary: 输出合并表与冲突日志；冲突不静默覆盖。
summaryEn: Output a merged table and conflict log; conflicts are not silently overwritten.
sources:
  - label: OpenAI Cookbook · Introduction to Structured Outputs（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

按规则合并多表并记录冲突。
输入：多个表格、主键、合并规则、优先级。

## [提示词本体|The prompt]

```text
按主键 {key} 合并表格。规则：{rules}。输出 merged[] 与 conflicts[]。同主键字段不一致时保留所有候选值并在 conflicts 写来源表与字段；不得按优先级静默覆盖，除非规则明确授权。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

merged[] 与 conflicts[]，冲突含来源与候选值。

## [检查点|Checkpoints]

- 主键唯一或冲突已记录。
- 每个覆盖都有规则授权。
- 行数等于输入主键并集。

## [失败分支|Failure branches]

- 主键选错：先核对字段含义。
- 冲突过多：人工定规则后再跑。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
