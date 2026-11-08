---
id: prompt-case-refactor-plan
topic: prompts
kind: prompt-case
task: 生成分步重构计划与回滚点。
title: 重构计划
titleEn: Refactoring plan
summary: 输出步骤、验证点与回滚条件；不承诺性能提升。
summaryEn: Output steps, verification points and rollback conditions; do not promise performance gains.
sources:
  - label: OpenAI Cookbook · GPT-4.1 Prompting Guide（官方仓库 raw，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb
    kind: docs
last_verified: 2026-11-07
confidence: partial
---

## [任务与输入|Task and inputs]

生成分步重构计划与回滚点。
输入：代码结构描述、目标、约束。

## [提示词本体|The prompt]

```text
制定重构计划。输出 steps[]：change、verify、rollback。每步必须小且可独立验证；verify 写可观察判据，rollback 写触发条件。不得写提升 X% 或最好方案；不确定影响标 risk。
```

占位符用 {字段} 标注，运行前替换为本次输入。

## [预期输出形态|Expected output shape]

steps[]，每步含验证与回滚。

## [检查点|Checkpoints]

- 每步有 verify 与 rollback。
- 无未验证性能承诺。
- risk 项明确。

## [失败分支|Failure branches]

- 步骤过大：拆成可回滚小步。
- 验证不可观察：改成测试或检查命令。

## [出处与边界|Sources and limits]

提示词效果未实测。机制依据见出处；换模型、版本或输入会改变结果。
