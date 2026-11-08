---
id: prompt-case-email-draft
topic: prompts
kind: prompt-case
task: 按事实与语气约束起草邮件。
title: 邮件起草
titleEn: Draft an email
summary: 生成邮件草稿；不得添加输入外事实，语气由参数控制。
summaryEn: Generate an email draft; add no facts beyond the input and control tone by parameter.
sources:
  - label: Anthropic 官方教程 · Basic Prompt Structure（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/01_Basic_Prompt_Structure.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

按事实与语气约束起草邮件。
输入：收件人角色、事实要点、语气、禁止事项。

## [提示词本体|The prompt]

```text
写一封邮件。收件人：{recipient}。事实要点：{facts}。语气：{tone}。禁止：添加事实外信息、承诺未授权事项、使用夸张营销词。输出 subject 与 body；不确定处用 [待确认] 标记。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

subject 与 body，待确认处显式标记。

## [检查点|Checkpoints]

- 每个事实句能回连 facts。
- 没有未授权承诺。
- 语气与 {tone} 一致。

## [失败分支|Failure branches]

- 过度礼貌导致冗长：压缩句子但保留事实。
- 出现新事实：删除并标 [待确认]。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
