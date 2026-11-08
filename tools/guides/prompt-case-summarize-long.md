---
id: prompt-case-summarize-long
topic: prompts
kind: prompt-case
task: 把长文摘要成层级要点并保留出处。
title: 长文分层摘要
titleEn: Layered long-document summary
summary: 输出总述、分节要点与未解决问题；每条要点带段落定位。
summaryEn: Output an overview, section points and open questions; each point carries a paragraph locator.
sources:
  - label: OpenAI Cookbook · GPT-4.1 Prompting Guide（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

把长文摘要成层级要点并保留出处。
输入：长文原文、章节结构、摘要长度上限。

## [提示词本体|The prompt]

```text
总结原文。输出 overview、sections[]（heading、points[]、locator）、open_questions[]。每个 point 必须来自对应段落，locator 写章节/段号。不得把作者未来工作写成已完成结论。总长度不超过 {limit}。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

overview、sections[]、open_questions[]。

## [检查点|Checkpoints]

- 每条 point 有 locator 且可回连。
- 未来工作仍在 open_questions。
- 长度不超上限。

## [失败分支|Failure branches]

- 摘要混入观点：删除评价句。
- 定位缺失：补段号或重分节。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
