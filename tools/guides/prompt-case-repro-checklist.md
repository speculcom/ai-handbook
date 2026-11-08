---
id: prompt-case-repro-checklist
topic: prompts
kind: prompt-case
task: 为论文复现准备核对清单。
title: 复现核对清单
titleEn: Reproduction checklist
summary: 输出数据、代码、环境、指标核对项；未复现写未复现。
summaryEn: Output data, code, environment and metric checks; state not reproduced when applicable.
sources:
  - label: Judging LLM-as-a-Judge 论文（arXiv 2306.05685，2026-11-07 直抓摘要页）
    url: https://arxiv.org/abs/2306.05685
    kind: paper
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

为论文复现准备核对清单。
输入：论文摘要、官方仓库、实验设置。

## [提示词本体|The prompt]

```text
生成复现核对清单。输出 checks[]：item、source、status(verified/missing/unknown)、note。source 指向论文/仓库原文；没有实际运行则所有运行项 status=unknown 并写未复现。不得把读代码当成复现。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

checks[]，含来源与状态。

## [检查点|Checkpoints]

- 运行项未跑则 unknown。
- source 可回连。
- 明确未复现声明。

## [失败分支|Failure branches]

- 仓库缺：标 missing。
- 指标口径不清：列 unknown。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
