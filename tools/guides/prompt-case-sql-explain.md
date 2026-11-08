---
id: prompt-case-sql-explain
topic: prompts
kind: prompt-case
task: 解释 SQL 并核对索引与边界。
title: SQL 解释
titleEn: Explain SQL
summary: 输出语义解释、索引核对项与风险；不假装跑过 EXPLAIN。
summaryEn: Output semantic explanation, index checks and risks; do not pretend EXPLAIN was run.
sources:
  - label: OpenAI Cookbook · Introduction to Structured Outputs（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

解释 SQL 并核对索引与边界。
输入：SQL、表结构、索引定义。

## [提示词本体|The prompt]

```text
解释 SQL。输出 meaning、joins[]、filters[]、index_checks[]、risks[]。index_checks 只依据给定索引定义判断可能使用/缺失；没有 EXPLAIN 输出就写未执行计划核对。不得编造行数或耗时。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

meaning、 joins/filters、index_checks、risks。

## [检查点|Checkpoints]

- 索引判断有定义依据。
- 无编造统计数字。
- 风险含 NULL/重复键边界。

## [失败分支|Failure branches]

- 表结构缺失：标 missing_schema。
- 解释过度：只保留 SQL 语义。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
