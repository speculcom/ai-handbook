---
id: prompt-case-api-contract
topic: prompts
kind: prompt-case
task: 整理 API 契约与错误分支。
title: API 契约
titleEn: API contract
summary: 输出请求/响应 schema 与错误表；未定义项标未知。
summaryEn: Output request/response schemas and an error table; mark undefined items unknown.
sources:
  - label: OpenAI Cookbook · Introduction to Structured Outputs（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

整理 API 契约与错误分支。
输入：API 描述、示例请求响应、错误码。

## [提示词本体|The prompt]

```text
整理 API 契约。输出 endpoint、request_schema、response_schema、errors[]：code、condition、client_action。schema 字段只能来自描述/示例；未定义字段标 undefined。errors 不得编造未给出的错误码。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

endpoint、schemas、errors[]。

## [检查点|Checkpoints]

- 字段有示例或描述依据。
- 错误码来自输入。
- undefined 项明确。

## [失败分支|Failure branches]

- 示例不足：标 undefined，不猜类型。
- 错误分支缺：列 gap。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
