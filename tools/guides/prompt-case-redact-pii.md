---
id: prompt-case-redact-pii
topic: prompts
kind: prompt-case
task: 识别并脱敏敏感字段，保留可审计记录。
title: 敏感字段脱敏
titleEn: Redact sensitive fields
summary: 输出脱敏文本与字段日志；不猜测未明确字段。
summaryEn: Output redacted text and a field log; do not guess unlisted fields.
sources:
  - label: OpenAI Cookbook · How to use guardrails（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/How_to_use_guardrails.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

识别并脱敏敏感字段，保留可审计记录。
输入：原文、敏感字段清单、脱敏格式。

## [提示词本体|The prompt]

```text
按清单 {fields} 脱敏原文。输出 redacted_text 与 redactions[]：field、location、replacement。只处理清单内字段；疑似但不在清单的字段列 review[]，不自行脱敏。replacement 使用 {format}，不得保留可逆原始值。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

redacted_text、redactions[]、review[]。

## [检查点|Checkpoints]

- 清单字段全部替换且不可逆。
- review 项未被擅自处理。
- location 可回连原文。

## [失败分支|Failure branches]

- 漏脱敏：补字段清单重跑。
- 过度脱敏：把非清单项移回 review。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
