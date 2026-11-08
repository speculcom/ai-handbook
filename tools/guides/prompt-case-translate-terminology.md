---
id: prompt-case-translate-terminology
topic: prompts
kind: prompt-case
task: 按术语表翻译并保留一致译名。
title: 术语一致翻译
titleEn: Terminology-consistent translation
summary: 输出译文与术语对照；未收录术语标待审，不随意造词。
summaryEn: Output translation and term mapping; unlisted terms are marked for review rather than coined freely.
sources:
  - label: OpenAI Cookbook · GPT-4.1 Prompting Guide（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

按术语表翻译并保留一致译名。
输入：原文、目标语言、术语表。

## [提示词本体|The prompt]

```text
把原文译成 {language}。术语必须按术语表 {glossary} 统一翻译；术语表未收录的专业词保留原文并加译注，列入 review_terms[]。输出 translation 与 term_map[]。不得改变数字与日期。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

translation、term_map[]、review_terms[]。

## [检查点|Checkpoints]

- 术语表内词译名一致。
- 数字日期与原文一致。
- review_terms 都有原文位置。

## [失败分支|Failure branches]

- 译名漂移：锁定术语表后重跑。
- 漏译注：补保留原文与说明。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
