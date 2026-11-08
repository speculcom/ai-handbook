---
id: prompt-case-bug-repro
topic: prompts
kind: prompt-case
task: 把 bug 描述整理成最小复现步骤。
title: Bug 复现步骤
titleEn: Minimal bug reproduction
summary: 输出环境、步骤、预期/实际与缺失信息；不猜测根因。
summaryEn: Output environment, steps, expected/actual and missing information; do not guess the root cause.
sources:
  - label: OpenAI Cookbook · GPT-4.1 Prompting Guide（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

把 bug 描述整理成最小复现步骤。
输入：bug 描述、日志片段、环境信息。

## [提示词本体|The prompt]

```text
把 bug 整理成最小复现。输出 environment、steps[]、expected、actual、missing[]。steps 必须可执行且来自描述；描述未给的版本/配置列入 missing，不得补默认值。不要给根因结论。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

environment、steps[]、expected、actual、missing[]。

## [检查点|Checkpoints]

- 每步能由描述支持。
- missing 项明确。
- 无根因断言。

## [失败分支|Failure branches]

- 步骤不可执行：补 missing 后重跑。
- 日志不足：只保留可核对片段。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
