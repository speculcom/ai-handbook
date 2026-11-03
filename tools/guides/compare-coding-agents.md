---
id: compare-coding-agents
topic: planning
title: 写代码：终端 / IDE / 云端 Agent 怎么选
titleEn: Coding agents: terminal vs IDE vs cloud
summary: 先定执行面（终端 / IDE / 云端），再比权限模型、后台续跑与仓库上下文；给每个候选写明适用条件与一句「什么情况下选另一个」。
summaryEn: Fix the execution surface first (terminal, IDE, cloud), then compare permission models, background continuation and repo context; each candidate gets its conditions and one line on when to pick another.
sources:
  - label: Anthropic · Claude Code 仓库与 CHANGELOG（源码可见、All rights reserved；2026-10 快照）
    url: https://github.com/anthropics/claude-code
    kind: repo
  - label: OpenAI · Codex CLI 仓库与 releases（Rust 实现、app server；2026-10 快照）
    url: https://github.com/openai/codex
    kind: repo
  - label: Google · Gemini CLI 仓库（Apache-2.0、npx 启动、MCP；2026-10 快照）
    url: https://github.com/google-gemini/gemini-cli
    kind: repo
  - label: Cursor · 官方文档（云端 Agent、自托管 2026-09-02）
    url: https://cursor.com/docs
    kind: docs
  - label: Devin · 官方文档（云端工作区、工单到草稿 PR）
    url: https://docs.devin.ai
    kind: docs
  - label: Google Antigravity · 官方站（桌面/CLI/IDE/SDK 四面共用 harness，2026-10-13 核验）
    url: https://antigravity.google
    kind: official
last_verified: 2026-11-03
confidence: partial
---

## [先定执行面，再挑产品|Pick the surface first]

写代码的 Agent 先分三类执行面，价格和模型都不是第一决策点：

| 执行面 | 代表 | 运行位置 | 适合的活 |
|---|---|---|---|
| 终端 | Claude Code CLI、Codex CLI、Gemini CLI | 你的 shell 与仓库 | 已有仓库、要脚本化、要看清每条命令 |
| IDE | Cursor、GitHub Copilot、Antigravity | 编辑器进程或厂商云 | 边写边看、要补全与内联 diff |
| 云端 | Devin、Cursor 云端 Agent | 厂商工作区 | 工单批量委派、合上笔记本还要继续跑 |

**先问一句：改动是在你机器上跑，还是交给厂商云跑？** 这一步会直接排除一半候选。

## [六项对照|Six dimensions]

| 维度 | Claude Code CLI | Codex CLI | Gemini CLI | Cursor | Devin | Antigravity |
|---|---|---|---|---|---|---|
| 执行面 | 终端 | 终端 | 终端 | IDE + 云端 | 云端工作区 | 桌面 / CLI / IDE / SDK |
| 权限控制 | 权限粒度可配置（官方文档与 CHANGELOG 记录） | 命令执行需确认，app server 架构 | 非交互脚本模式，适合 CI | 编辑器内确认 + 云端 | 云端沙箱，工单派单 | 官方三档命令执行策略 |
| 后台续跑 | 本地进程 | 线程续接 | 脚本模式 | 合上笔记本仍继续（官方 2026 架构更新） | 原生异步 | harness 常驻 |
| 模型选择 | Anthropic 模型线 | OpenAI 模型线 | Gemini 模型线 | 多模型可切 | 厂商托管 | Gemini 线 |
| 许可/源代码 | 源码可见，All rights reserved | 仓库可见 | Apache-2.0 | 闭源 | 闭源 | 闭源 |
| 价格档位 | 订阅或 API，档位见官方定价页 | ChatGPT 档位或 API key | 免费配额 + 付费 API | Hobby / Pro / Teams / Enterprise | 团队报价 | 随 Google AI 计划 |

价格不写数字（本站纪律 D9）；档位名与配额以各官方定价页为准。

## [每个候选的适用条件|When each fits]

**Claude Code CLI**：适合已有仓库、想把每一步命令摊在终端里看的人；权限粒度是它最细的一面。能力边界是模型线固定在 Anthropic，要多模型得另配。**什么情况下选另一个**：要 IDE 内联补全就选 Cursor 或 Copilot；要完全开源可改的 CLI 就选 Gemini CLI。

**Codex CLI**：适合 OpenAI 生态、要线程续接与脚本化的人；Rust 实现、app server 是它的架构特征。**什么情况下选另一个**：团队已经押注 Anthropic，就选 Claude Code CLI。

**Gemini CLI**：Apache-2.0、npx 免安装、支持 MCP 与非交互脚本，适合 CI 与教学。**什么情况下选另一个**：要最强的权限控制与变更记录，就选 Claude Code CLI。

**Cursor**：适合要 IDE 体验、又要云端 Agent 续跑的人；2026-09-02 官方加入自托管，代码不出网是它的差异点。**什么情况下选另一个**：只要终端、不想装编辑器，就选三家 CLI 之一。

**Devin**：适合把工单批量丢给云端、拿草稿 PR 再接管的人；Slack / Linear / Jira 可直接派单。**什么情况下选另一个**：改动必须在你本机、不能出网，就选终端或 IDE。

**Antigravity**：适合要在桌面指挥中心、CLI、IDE 扩展与 Python SDK 之间共用一套 harness 的团队；官方给了三档命令执行策略。**什么情况下选另一个**：只想要一个成熟 IDE，Cursor 更直接。

## [核验事实|Dated facts]

1. Gemini CLI 采用 Apache-2.0，支持 `npx` 启动与 MCP（仓库 README，2026-10 快照）。
2. Cursor 官方在 2026-09-02 发布自托管能力；云端 Agent 可在地器关闭后继续运行（官方文档）。
3. Antigravity 的命令执行策略为官方显式三档（2026-10-13 release notes 核验）。
4. Claude Code CLI 有独立 CHANGELOG 与 Atom feed；源码可见但许可证为 All rights reserved（仓库页）。
5. Codex CLI 为 Rust 实现，架构以 app server 与线程续接为核心（仓库与 releases）。

以上日期均为本站档案的核验快照日，不是厂商发布日；发布日以各仓库 releases 为准。

## [常见误判|Common misreads]

- 把「能跑终端」当成「能安全跑终端」：权限模型不同，默认确认与白名单是两回事。
- 把「云端续跑」当成「不用看」：草稿 PR 仍要人审，云端只省等待时间。
- 把「开源 CLI」当成「模型也开源」：CLI 的许可证与模型权重许可是两份文件。
- 把「支持 MCP」当成「工具即插即用」：server 的权限与数据范围仍要逐条看。
