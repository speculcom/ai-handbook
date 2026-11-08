---
id: prompt-case-log-triage
topic: prompts
kind: prompt-case
task: 把日志按症状分流并给下一步核对。
title: 日志分流
titleEn: Log triage
summary: 输出分流表与证据行；不直接断言根因。
summaryEn: Output a triage table with evidence lines; do not assert root cause directly.
sources:
  - label: OpenAI Cookbook · GPT-4.1 Prompting Guide（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

把日志按症状分流并给下一步核对。
输入：日志片段、服务清单、时间窗口。

## [提示词本体|The prompt]

```text
分流日志。输出 groups[]：symptom、service、evidence_lines、next_check。evidence_lines 必须逐字来自日志；next_check 写可执行核对动作。根因只能列 hypothesis，不得写成结论。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

groups[] 与 hypotheses[]。

## [检查点|Checkpoints]

- 证据行逐字命中。
- next_check 可执行。
- 根因在 hypotheses。

## [失败分支|Failure branches]

- 日志太多：按时间窗口缩小。
- 症状混在一起：按服务拆分。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
