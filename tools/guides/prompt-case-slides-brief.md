---
id: prompt-case-slides-brief
topic: prompts
kind: prompt-case
task: 把材料转成幻灯片简报与核对点。
title: 幻灯片简报
titleEn: Slide brief
summary: 输出每页标题、要点、来源与检查点；不夸大效果。
summaryEn: Output per-slide title, points, source and checks; do not exaggerate effects.
sources:
  - label: OpenAI Cookbook · GPT-4.1 Prompting Guide（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

把材料转成幻灯片简报与核对点。
输入：主题、材料、页数上限、听众。

## [提示词本体|The prompt]

```text
生成不超过 {slides} 页的简报。每页输出 title、points[]、source、check。points 必须来自 {materials}；check 写读者如何核对该页。不得写最好/最强/百分比提升，除非材料原文给出并标注口径。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

slides[]，每页含来源与核对方式。

## [检查点|Checkpoints]

- 每页 points 有 source。
- 无未标注口径的比较词。
- 页数不超上限。

## [失败分支|Failure branches]

- 要点过密：拆页或删次要项。
- 来源缺失：标 gap 或删该页。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
