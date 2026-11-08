---
id: prompt-case-json-schema
topic: prompts
kind: prompt-case
task: 生成结构化输出并校验字段。
title: JSON 字段校验
titleEn: JSON field validation
summary: 输出 schema 与校验报告；格式合法不等于事实正确。
summaryEn: Output schema and validation report; valid format does not mean factual correctness.
sources:
  - label: OpenAI Cookbook · Introduction to Structured Outputs（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

生成结构化输出并校验字段。
输入：字段需求、样例 JSON、事实来源。

## [提示词本体|The prompt]

```text
生成 JSON Schema 并校验样例。输出 schema、validation[]：field、valid、reason、fact_check。valid 只判格式/类型/必填；fact_check 单独回连来源，无依据标 unsupported。不得把 valid=true 写成内容正确。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

schema 与 validation[]。

## [检查点|Checkpoints]

- 格式与事实分开判定。
- unsupported 明确。
- schema 字段来自需求。

## [失败分支|Failure branches]

- 样例缺字段：标 required 缺失。
- 事实无来源：标 unsupported。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
