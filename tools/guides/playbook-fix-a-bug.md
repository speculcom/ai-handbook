---
id: playbook-fix-a-bug
topic: planning
title: 任务：用编码 Agent 修一个真实 bug
titleEn: Playbook: fixing a real bug with a coding agent
summary: 从仓库上下文、复现、计划、改动、测试到审查的六步流程；含权限设置、成本算式、失败模式与验收单。
summaryEn: A six-step flow from repo context and reproduction through planning, editing and testing to review, with permission settings, a cost formula, failure modes and an acceptance list.
sources:
  - label: Anthropic · Claude Code 仓库（权限与 CHANGELOG；2026-10 快照）
    url: https://github.com/anthropics/claude-code
    kind: repo
  - label: OpenAI · Codex CLI 仓库（线程续接与 app server；2026-10 快照）
    url: https://github.com/openai/codex
    kind: repo
  - label: Google · Gemini CLI 仓库（非交互脚本模式、MCP；2026-10 快照）
    url: https://github.com/google-gemini/gemini-cli
    kind: repo
  - label: Anthropic · Claude Code 官方文档（权限与工作流；2026-10 快照）
    url: https://code.claude.com/docs/en/overview
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [准备：先把范围钉死|Prepare: fix the scope]

1. **选一个可复现的 bug**：有明确复现步骤、预期行为与实际行为。
2. **给仓库边界**：只开这个仓库，不开家目录；密钥文件排除在工具可读范围外。
3. **写清不许做什么**：不许改无关模块、不许升级依赖、不许动 CI 配置。
4. **先跑一次基线测试**：记录失败用例与通过用例，作为改动后的对照。

**决策点**：改动范围超过 3 个文件，先停下来拆任务；不要一边改一边扩大范围。

## [复现：让 Agent 先看到失败|Reproduce first]

- 把复现命令、日志、相关文件路径贴给 Agent。
- 要求它先输出「失败原因假设 + 验证方法」，不要直接改代码。
- 有两个以上假设时，让它按成本排序，先验最便宜的那个。

**失败模式**：Agent 跳过复现，直接给「可能的修复」。这种改动能通过代码审查，却可能没修到根因。

## [计划：三段式|Plan in three parts]

要求输出三段：

| 段 | 内容 | 验收 |
|---|---|---|
| 根因 | 哪个文件、哪一行、为什么错 | 能被复现命令证实 |
| 改法 | 改什么、不改什么、影响面 | 列出受影响测试 |
| 回滚 | 出问题怎么退回 | 有明确命令或补丁 |

计划里出现「重构一下」「顺手优化」就删掉；修 bug 不是重构。

## [改动：小步与权限|Edit with permissions]

- **终端 Agent**：用权限确认模式，逐条看它要跑的命令；能白名单就白名单到具体命令，不要整个 shell。
- **IDE Agent**：用内联 diff，逐块接受；不要一次接受整文件。
- **云端 Agent**：让它产出草稿 PR，人在本地接管后再跑测试。

**权限红线**：删除文件、改数据库、推远端、装全局包，四类操作必须人工确认。

## [测试：三段证据|Three pieces of evidence]

1. **复现用例转绿**：原来失败的测试现在通过。
2. **回归测试不红**：原有测试集合仍通过。
3. **手工验收**：按 bug 报告的步骤再走一遍。

只交「单元测试通过」不够；缺回归与手工验收，等于没验。

## [审查：让另一个视角看|Review with a second pass]

- 让 Agent 生成「改动摘要 + 风险点 + 未覆盖场景」，人再审 diff。
- 重点看：错误处理、边界条件、日志与隐私、是否引入新依赖。
- 大改动拆成两个 PR：一个修根因，一个清理；不要把清理混进修复。

## [成本算式|Cost formula]

不写单价，只给算式（单价查官方定价页）：

```
总成本 ≈ (输入 tokens × 输入单价) + (输出 tokens × 输出单价) + 工具调用费
输入 tokens ≈ 仓库上下文 + 日志 + 对话历史
```

控制成本的三条：只开必要文件、限制日志长度、把长对话拆成新会话。订阅档位与配额以官方定价页为准。

## [核验事实与限额|Dated facts and limits]

1. Claude Code CLI 有独立 CHANGELOG 与 Atom feed，权限粒度可配置；源码可见但 All rights reserved（仓库，2026-10 快照）。
2. Codex CLI 为 Rust 实现，强调 app server 与线程续接（仓库与 releases，2026-10 快照）。
3. Gemini CLI 支持非交互脚本模式与 MCP，适合把修复流程放进 CI（仓库，2026-10 快照）。
4. 三家的上下文窗口与单次任务限额随档位变化，以官方文档当日为准；不要把某次界面快照当承诺。

## [验收单|Acceptance checklist]

- [ ] 复现步骤已记录，改动前能稳定失败
- [ ] 根因写在计划里，且被复现命令证实
- [ ] 改动只触及计划内文件
- [ ] 复现用例转绿，回归测试全绿
- [ ] 手工按原步骤验收通过
- [ ] 无新增密钥、无无关依赖、无 CI 配置改动
- [ ] diff 已由第二视角审查，风险点有记录
- [ ] 回滚方式写在 PR 描述里

## [常见失败模式|Failure modes]

- **范围蔓延**：修 A 顺手改 B，review 成本翻倍。
- **假复现**：Agent 没跑失败用例，直接给修复。
- **测试替换**：改测试让它通过，而不是修代码。
- **权限过宽**：整个 shell 白名单，命令注入面变大。
- **上下文污染**：把密钥、生产日志贴进对话。
