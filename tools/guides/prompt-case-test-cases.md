---
id: prompt-case-test-cases
topic: prompts
kind: prompt-case
task: 从需求生成测试用例与边界条件。
title: 测试用例生成
titleEn: Generate test cases
summary: 输出用例表；覆盖正常、边界、错误输入，不声称已运行。
summaryEn: Output a test-case table covering normal, boundary and error inputs; do not claim execution.
sources:
  - label: OpenAI Cookbook · Introduction to Structured Outputs（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

从需求生成测试用例与边界条件。
输入：需求说明、输入域、已有测试。

## [提示词本体|The prompt]

```text
为需求 {requirement} 生成测试用例。输出 cases[]：id、type(normal/boundary/error)、input、expected、rationale。expected 必须能从需求推出；需求未定义的行为标 undefined_behavior，不猜。列出 coverage_gaps[]。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

cases[] 与 coverage_gaps[]。

## [检查点|Checkpoints]

- 三类 type 都有或说明缺因。
- expected 可回连需求。
- 未定义行为不填猜测。

## [失败分支|Failure branches]

- 用例重复：按输入域合并。
- 需求模糊：标 undefined_behavior。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
