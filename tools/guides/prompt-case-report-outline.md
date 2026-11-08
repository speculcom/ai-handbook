---
id: prompt-case-report-outline
topic: prompts
kind: prompt-case
task: 生成带证据占位的报告大纲。
title: 报告大纲
titleEn: Report outline
summary: 输出大纲与每节所需证据；不填未经来源支持的内容。
summaryEn: Output an outline and required evidence per section; do not fill unsupported content.
sources:
  - label: OpenAI Cookbook · Building resilient prompts using an evaluation flywheel（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

生成带证据占位的报告大纲。
输入：报告目标、读者、已有材料清单。

## [提示词本体|The prompt]

```text
为报告 {goal} 生成大纲。输出 sections[]：title、question、evidence_needed、source_candidate。evidence_needed 写可核对材料类型；source_candidate 只能从 {materials} 选，缺材料标 gap。不要写正文结论。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

sections[]，含问题、证据需求与材料缺口。

## [检查点|Checkpoints]

- 每节有可核对 evidence_needed。
- source_candidate 不超出材料清单。
- gap 项明确列出。

## [失败分支|Failure branches]

- 大纲变成结论：删断言改问题。
- 材料不足：标 gap，不编来源。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
