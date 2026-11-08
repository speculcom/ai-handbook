---
id: prompt-case-meeting-actions
topic: prompts
kind: prompt-case
task: 从会议记录提取负责人、期限与待确认项。
title: 会议行动项
titleEn: Meeting action items
summary: 输出行动项表；没有明确负责人或期限的项标为待确认。
summaryEn: Output an action table; items without a clear owner or deadline are marked pending confirmation.
sources:
  - label: OpenAI Cookbook · GPT-4.1 Prompting Guide（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

从会议记录提取负责人、期限与待确认项。
输入：会议记录原文、参会人名单、时区。

## [提示词本体|The prompt]

```text
从会议记录提取行动项。输出 JSON actions[]：action、owner、due、evidence。owner 必须是参会人名单中的人；记录未指派则 owner=null。due 必须来自原文日期，不得推算。另列 open_questions[]。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

actions[] 与 open_questions[]，每条带原文 evidence。

## [检查点|Checkpoints]

- owner 都在名单内或为 null。
- due 不晚于/早于原文日期且有时区口径。
- 每个 action 有 evidence 句。

## [失败分支|Failure branches]

- 把讨论当决定：回到原文标 open_question。
- 期限模糊：保留原文短语，不转成具体日期。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
