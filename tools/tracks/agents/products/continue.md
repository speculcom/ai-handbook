---
id: continue
track: ide
tasks: ["write-code"]
name: Continue
vendor: Continue
homepage: https://continue.dev
mark: Co

axes:
  model_access: >-
    **模型完全自配，这是它最核心的定位。**

    官方 model providers 页列出的 provider：

    - Anthropic
    - Azure AI Foundry
    - Amazon Bedrock
    - DeepSeek
    - Gemini
    - Mistral
    - **Ollama（本地模型）**
    - OpenAI
    - Vertex AI
    - xAI

    该页还指向「More（30 items）」。

    配置写在 `config.yaml` 的 `models`，字段为 `provider` + `model` + `apiBase`。

    可设 `roles`（chat / autocomplete / embed / rerank / edit / apply / summarize），
    以及 `capabilities`（`tool_use` 为 Agent 模式必需，另有 `image_input`）。

    与 `./cursor.md` 对照：Cursor 只能用其目录内模型，Continue 可指任意 provider。

    **各家 provider 换用后的 tool calling 质量，
    官方页面未给出对比。**
  runtime: >-
    **IDE 扩展形态，不是独立编辑器。**

    官方列出的形态有 VS Code 扩展、JetBrains 插件，
    另有 **CLI（`cn`）**。

    **官方文档首句**："Open source AI code assistant for VS Code and JetBrains"

    **仓库 README 原文建议**："We recommend using the Continue CLI instead of the JetBrains plugin"

    三条形态共享同一 agent 核心。**官方 CLI 页原文**："the same agent that powers the Continue IDE extensions"。CLI 需 Node.js 20+ 或自带运行时。

    **本条目只写扩展形态**，终端形态的能力见 tools 与 background。
  local_files: >-
    **在 IDE 工作区内读写，改动以 diff 形式呈现。**

    **上下文靠显式引用，不靠隐式全量索引。**
    官方 Chat 上下文页列出 `@Files`、`@Terminal`、`@Git Diff` 等 context providers，
    以及高亮代码（VS Code `cmd/ctrl+L`、JetBrains `cmd/ctrl+J`）与当前活动文件。

    两个配置目录：MCP 为 `.continue/mcpServers/`，规则为 `.continue/rules`。

    **代码库语义索引的实现方式官方未说明**
    （已查 docs.continue.dev 首页与 Chat 上下文选择两页）。
  background: >-
    **扩展形态无「关机续跑」能力。**

    它就是编辑器 / IDE 插件，随 IDE 进程存活，IDE 关掉即结束。

    官方文档也未描述云端执行面（**核验**：已查 docs.continue.dev 首页、
    Agent quick-start、CLI quickstart 三页）

    **唯一异步形态是 CLI 的 headless。**
    `cn -p "..."` 单次跑完输出到 stdout。

    **官方原文**："Use this in scripts, CI/CD, and git hooks"
  tools: >-
    **工具面是「三档模式 + MCP」。**

    官方 Agent 页写模式切换下有三个选项：

    - Chat（无工具）
    - Plan（只读工具）
    - Agent（全部工具）

    `Cmd/Ctrl + .` 循环切换。

    **MCP 官方支持**（官方 MCP 深潜页）：在 config 的 `mcpServers` 配置，
    可放 `.continue/mcpServers/` 目录，传输支持三种：

    - `stdio`
    - `sse`
    - `streamable-http`

    **可直接复用 Claude / Cursor / Cline 的 JSON MCP 配置。**

    **官方强调**："MCP can only be used in the **agent** mode"

    CLI 侧另有 `--mcp <slug>`、`--agent <slug>`、`--rule`。
    扩展机制还有 context providers、rules 与自定义 prompt。
  context: >-
    **上下文是显式选择式，不是自动索引式**（见 local_files）。

    会话层面：CLI 支持 `--resume` 重放，
    官方 CLI headless 页写 `cn -p --resume` 会

    **官方原文**："replays the previous session's history"

    **跨会话长期记忆**由 rules、context providers 与 assistant 配置承载；
    `config.yaml` 有 `data` 字段。

    **上下文窗口大小跟随所选模型**，官方在已查页面未给出统一数字
    （已查 Agent quick-start 与 config.yaml 参考两页）。
  permissions: >-
    **默认逐工具询问，可策略化放开。**

    IDE 侧，**官方 Agent quick-start 原文**："By default, Agent mode will ask permission when it wants to use a tool"

    **tool policies** 可把特定工具设为自动或排除。
    IDE 里可点 `Continue` 放行，或点 `Cancel` 拒绝。

    CLI 侧口径不同。**官方 headless 页原文**："tools that would normally prompt for approval (`ask` permission) are automatically excluded"；
    要写文件必须显式 `--allow Write --allow Edit`（或 `--allow "*"`），
    另有 `--readonly`（Plan）、`--auto`、`--exclude`。

    **telemetry**：仓库 README 写最终 2.0.0 版「removing anonymous telemetry」。

    **数据是否用于训练，官方已查页面未说明。**
  fit: >-
    **适合三类人：**

    - 需要模型自由（多 provider，含 Ollama 本地模型）而不想被单一厂商锁定的人。
    - 已在 VS Code / JetBrains 里工作、希望用开源可审计扩展的人。
    - 需要把同一 agent 用到终端与 CI（`cn -p`）的人。

    **不适合**需要持续维护与长期演进的场景 —— 上游仓库已 read-only，
    公司被 Cursor 收购，后续只以「代码仍可自由使用」的形态存在。

    也不适合依赖官方支持与持续修复的人。

pitfalls:
  - 以为 Continue 仍在持续维护 —— 仓库 README 已标 no longer actively maintained and is read-only
  - 以为 Hub 商业线旧价目仍有效 —— 官网已被收购公告替换，原定价页 continue.dev/pricing 已 404
  - 以为模型自带额度 —— 扩展本身免费开源，模型费要自备 provider 或本地 Ollama

tags: [编程, 开源, 多模型, VSCode]
related: [filesystem]

sources:
  - label: Continue · 仓库 README（三形态、Apache-2.0、read-only 公告）
    url: https://github.com/continuedev/continue
    kind: repo

  - label: Continue · Releases（最终 2.0.0 与 v2.1.0-vscode，2026-10-08 取到）
    url: https://github.com/continuedev/continue/releases
    kind: changelog

  - label: Continue · 官网（被 Cursor 收购公告）
    url: https://continue.dev
    kind: docs

  - label: Continue · 文档站首页（开源、VS Code / JetBrains、CLI cn）
    url: https://docs.continue.dev
    kind: docs

  - label: Continue Docs · MCP 深潜（三种传输、仅 agent 模式）
    url: https://docs.continue.dev/customize/deep-dives/mcp
    kind: docs

  - label: Continue Docs · Model providers（含 Ollama 本地模型与 30+ provider）
    url: https://docs.continue.dev/customize/model-providers
    kind: docs

  - label: Continue Docs · Agent quick-start（默认逐工具询问权限）
    url: https://docs.continue.dev/ide-extensions/agent/quick-start
    kind: docs

  - label: Continue Docs · CLI quickstart（cn 安装、headless、--auto / --readonly）
    url: https://docs.continue.dev/cli/quickstart
    kind: docs

  - label: Continue Docs · CLI headless（ask 权限自动排除、--allow）
    url: https://docs.continue.dev/cli/headless-mode
    kind: docs

  - label: Continue · 商业线定价页 hub.continue.dev/pricing（现 Continuous AI）
    url: https://hub.continue.dev/pricing
    kind: pricing

link:
  url: https://continue.dev
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: archived
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官网直连实测 200。
  direct_note_en: official site measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**开源、模型完全自配的 IDE 扩展**。
但它已停更：Continue 被 Cursor 收购，上游仓库转入 read-only，
官网只剩收购公告 —— **代码仍可自由使用，后续不会再有更新**。

## ⚠ 当前状态（最重要的前提）

继续用没问题，别再等更新。官网 continue.dev 现为收购公告，原文：

> Continue has been acquired by Cursor... our open-source codebase remains
> freely available as a foundation for others.

仓库 README 顶部原文：

> Note: The `continuedev/continue` repository is no longer actively maintained
> and is read-only for all users.

发布的最终版本是 VS Code 扩展、CLI 与 JetBrains 插件的
「final 2.0.0 release」（releases 里可见 `v2.0.0-vscode`、`v2.1.0-vscode`）。

从 release note 看，最终版移除了 CLI 安装横幅与「Hub slug」，
并加了 deprecation 提示；同时按 README 口径**「removing anonymous telemetry」**。

| 问题 | 结论 |
|---|---|
| 还能用吗 | 能，Apache-2.0 代码仍公开（仓库 read-only，归档日期官方未给出） |
| 还会有更新吗 | 不会——README 明示「no longer actively maintained」 |
| 商业线还在吗 | 原 Hub 定价页已 404；continue.dev 域名下现为 Continuous AI |

## 三种形态（README 与文档列出）

| 形态 | 关键能力 |
|---|---|
| **VS Code 扩展** | Agent / Chat / Edit / Autocomplete 模式，工具需逐次批准 |
| **JetBrains 插件** | 同上；README 建议改用 CLI |
| **CLI（`cn`）** | 终端 agent，TUI 与 headless 双模式，可进 CI / git hooks |

## 模型自配（官方列 30+ provider）

官方 model providers 页列出的 provider 覆盖：

- Anthropic
- Azure AI Foundry
- Amazon Bedrock
- DeepSeek
- Gemini
- Mistral
- **Ollama（本地模型）**
- OpenAI
- Vertex AI
- xAI

该页还指向「More（30 items）」。

配置即 `config.yaml` 里的 `models`，每条写 `provider` + `model`（+ 可选 `apiBase`），
可指定 `roles` 与 `capabilities`（`tool_use` 是 Agent 模式的前提）。

**这与 `./cursor.md` 的差别最根本**：Cursor 用其目录内模型，
Continue 可以指任意 provider，包括完全本地跑。

## MCP 与权限

MCP 官方支持三种传输：`stdio`、`sse`、`streamable-http`；
配置放在 `.continue/mcpServers/`，**且可直接把 Claude / Cursor / Cline 的
JSON MCP 配置复制进来**。官方一句硬限制要注意：
"MCP can only be used in the **agent** mode"。

权限口径分两侧：

- **IDE**：官方原文 "By default, Agent mode will ask permission when it wants
  to use a tool"，可用 tool policies 设为自动或排除；

- **CLI headless**：官方原文「tools that would normally prompt for approval
  (`ask` permission) are automatically excluded」，要写文件必须显式
  `--allow Write`（或 `--allow "*"`）。

## 商业线：Continuous AI（与开源扩展分开读）

hub.continue.dev（2026-10-08 取到）现为 **Continuous AI** 的商业线，三档：

| 档位 | 要点 |
|---|---|
| Starter | 按量计费（pay-as-you-go）：创建并运行 agent，接 Slack / Sentry / Snyk |
| Team | 按席位订阅（含每席 credits）：团队内共享私有 agent，Gmail/GitHub SSO |
| Company | 定制：SAML/OIDC、BYOK、承诺用量 / 发票 / SLA |

报价数字按 D9 口径不存，见 hub.continue.dev/pricing。

**注意这不是 IDE 扩展的订阅** —— 扩展本身免费开源。

这一商业线已转向 PR 检查为主的 Continuous AI，
不再是「Continue Hub」。

## 核验说明

这份条目标为 `confidence: partial`，原因有三条：

- **已取到官方正文的**：形态、模型自配、MCP、权限、许可与商业线结构。
- **已停止维护**：上游仓库 read-only、官网被收购公告替换，未来不会再更新。
- **已无法从官方页取证的**：Hub 旧价目、账户/订阅的去向等历史能力。

本轮核到的官方页：仓库 README 与 Releases、官网 continue.dev（含 www 变体）、
文档站首页、MCP 深潜、Model providers、Agent quick-start、
CLI quickstart 与 CLI headless、商业线定价页 hub.continue.dev/pricing。

## 适合与不适合

- 需要模型自由（多 provider，含 Ollama 本地模型）而不想被单一厂商锁定的人。
- 已在 VS Code / JetBrains 里工作、希望用开源可审计扩展的人。
- 需要把同一 agent 用到终端与 CI（`cn -p`）的人。

**不适合**需要持续维护与长期演进的场景 ——
上游仓库已 read-only，公司被 Cursor 收购，后续只会以「代码仍可自由使用」的形态存在。
也不适合依赖官方支持与持续修复的人。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测两点。

- **同一 `config.yaml` 在 IDE 扩展与 CLI（`cn`）两形态下的行为一致性**
- **headless 模式对 `ask` 权限工具自动排除的边界** ——
  官方明确「没人批准就自动排除」，这是最容易被脚本化用户踩到的一点。

## 未知项清单

以下五项都是官方未给出的，不是没查：

- 仓库归档的具体日期与收购完成时间 —— 官方未给出确切日期（已查仓库 README、官网公告与 Releases）
- 原 Continue 账户 / 订阅的去向与数据处理 —— 官网 FAQ 仅列出问题，答案官方未公开
- 代码库语义索引的实现方式 —— 官方未说明（已查 docs.continue.dev 首页与 Chat 上下文选择两页）
- 数据是否用于模型训练 —— 官方已查页面未说明（已查仓库 README 与文档站首页）
- 各 provider 换用后 tool calling 质量的官方对比

## 相关条目

- [Cursor](./cursor.md) — 收购方；两者在「模型自配 vs 目录内模型」上正好对立，值得并排看
- [Cline](./cline.md) — 同为开源 IDE 扩展，Cline 仍在活跃维护，是 Continue 停更后的直接替代参照
- [Codex IDE 扩展](./codex-ide.md) — 同为「扩展而非独立编辑器」，可对照宿主与权限模型
