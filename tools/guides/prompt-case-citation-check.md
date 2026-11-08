---
id: prompt-case-citation-check
topic: prompts
kind: prompt-case
task: 核对每个断言是否有对应引用支持。
title: 引用逐条核对
titleEn: Check citations one by one
summary: 输出断言-引用核对表；不支持或错位引用标红。
summaryEn: Output a claim-citation check table; unsupported or misplaced citations are flagged.
sources:
  - label: OpenAI Cookbook · Building resilient prompts using an evaluation flywheel（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

核对每个断言是否有对应引用支持。
输入：带引用文本、引用来源片段。

## [提示词本体|The prompt]

```text
逐句核对文本。输出 checks[]：claim、citation、source_excerpt、verdict(supported/unsupported/misplaced)、reason。source_excerpt 必须来自给定来源片段；找不到对应片段则 verdict=unsupported。不得用常识补证。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

checks[]，每条含判定与理由。

## [检查点|Checkpoints]

- 每个 verdict 有 source_excerpt 或明确缺失。
- misplaced 指出正确来源应是什么。
- 不引入外部常识。

## [失败分支|Failure branches]

- 来源片段不足：补片段再核。
- 断言过宽：拆成可核对子句。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
