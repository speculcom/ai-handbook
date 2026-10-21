---
id: warp
track: cli
tasks: ["write-code"]
name: Warp
vendor: Warp
homepage: https://www.warp.dev
mark: W

axes:
  model_access: >-
    **能做：多模型 + BYOK，官方明确「pick a model per conversation」。**

    **官方原文**："Pick a model per conversation, bring your own provider API keys, and track credit usage"

    定价页 Build 档的模型来源是：

    **官方原文**："frontier and open-source models from OpenAI, Anthropic, z.ai, and more"

    **BYOK 有档位边界。**

    官方定价表把**「Bring your own API key」**与**「Custom inference endpoint」**
    标注为：

    **官方原文**："Individuals and orgs up to 10 people"

    也就是说，个人与 10 人以内组织可用。

    Enterprise 档另有 **BYOLLM**：

    **官方原文**："Route inference through your own cloud (BYOLLM)"

    （意思是：推理走你自己的云。）

    **换模型**：CLI 侧可逐会话选模型。
    执行 profile 里也能设 `base_model` 覆盖。

    **未核验：官方未在定价页列全模型清单**

    （已查 pricing 与 agents/cli 两页。）
  runtime: >-
    **能做：同一 agent 有三种运行面，CLI 优先。**

    官方文档原文：

    **官方原文**："Warp is an open-source Agentic Development Environment"

    三种入口共用同一 **Warp Agent**：

    **官方原文**："In the Warp app"

    **官方原文**："In any terminal, with the Warp Agent CLI"

    **官方原文**："In the cloud, as a cloud agent"

    **CLI 是独立终端程序。**

    **官方原文**："a standalone terminal program that runs the Warp Agent"

    它本身是：

    **官方原文**："a native terminal multiplexer"

    自带 PTY，所以可在任意终端模拟器中运行，**包括通过 SSH**。

    启动命令是 `warp`（云侧另有 `oz` 命令）。

    **账号、规则、技能与模型访问跨三种入口一致。**
    官方注明 CLI 不要求安装 Warp 桌面 app。

    本条目记录 CLI 形态。
    桌面 app 与云 agent 的差异以官方页面为准。
  local_files: >-
    **能做：在本地 checkout 内工作，改动以 diff 呈现。**

    官方 CLI 页的「Project context」写明：agent 会自动读取项目规则
    （如 `AGENTS.md`）、skills 与 MCP 配置。

    文件改动以 diff 呈现。
    默认 `apply_code_diffs` 为 `agent_decides`。

    **但编辑文件仍每次提示。**

    **官方原文**："you always review a diff before it's applied"

    **目录授权**：执行 profile 有 `directory_allowlist`，控制

    **官方原文**："Directories the agent may read without approval"

    **代码库索引按档给上限**（定价页）：

    - Free 3 个代码库 / 每库 3,000 文件
    - Build 与 Max 40 个 / 每库 100,000 文件
    - Business 80 个
    - Enterprise 定制

    **未核验：索引算法与首次建索引耗时（官方未说明）**

    （已查 pricing 与 agents/cli 两页。）
  background: >-
    **能做：云端后台形态官方明确，属「真后台」。**

    终端 agent 绑定会话。
    但官方文档把 **Automation Platform** 与 **cloud agents** 单列：

    **官方原文**："Run background agent work in the cloud"

    它可由 triggers、schedules、integrations 与 API 触发。
    官方点名用途含 issue triage、pull request review、周期性维护。

    **Warp Factories** 更进一步：一组挂在仓库上的云 agent。
    它从 Slack / GitHub / Linear / Jira 取活，走 triage → spec → implement → review，
    产出通常是 PR。

    CLI 侧还有 **cloud handoff**。
    它可把会话交给云 agent，也可把云 run 拉回终端继续。

    **云 agent 的并发与算力按档给**（定价页）：

    - Free 有限
    - Build 20 并发 / 2 vCPU 4 GiB
    - Max 20 / 4 vCPU 8 GiB
    - Business 80 / 8 vCPU 16 GiB
    - Enterprise 定制
  tools: >-
    **能做：终端内 agent + MCP 支持完整（本地与云端两套）。**

    内置能力围绕终端：

    - 自然语言提示
    - **agent 会话转录**（流式响应、Markdown、文件 diff、工具调用、计划与任务列表）
    - 在同一输入里跑 shell 命令
    - 云 handoff 与多 agent 协调

    Warp Drive 提供 Workflows / Notebooks / Prompts / 环境变量等可复用对象。

    **MCP（本地 agent）**：官方原文支持

    **官方原文**："Streamable HTTP and SSE"

    以及 CLI（Command）本地 server。

    配置分项目级 `.warp/.mcp.json` 与全局 `~/.warp/.mcp.json`。
    **还能读取第三方 agent 的 MCP 配置**（Claude Code、Codex 等）。
    另有内置技能 `/agent-add-mcp`。
    认证支持环境变量、OAuth 一键安装与自定义 Header。
    安全上：

    **官方原文**："Project-scoped servers never auto-spawn"

    **MCP（云 agent）**：支持三种引用方式。

    - `command`/`args`（stdio）
    - `url`（Streamable HTTP / SSE）
    - `warp_id`（引用已授权的托管 server）

    OAuth 走 managed MCP installation。
  context: >-
    **能做：会话持久化到账号，可退出续接与切换。**

    官方 CLI 页原文：

    **官方原文**："Conversations save to your Warp account, so you can exit and resume later or switch between them"

    交互侧 `/status` 可看当前会话名与 ID。

    **项目上下文自动注入**：agent 自动读取项目规则（如 `AGENTS.md`）、
    skills 与 MCP server。

    Warp Drive 里保存的 prompt 登录后可用。

    **但官方明确 CLI 内仅 prompt 类对象可用。**

    **官方原文**："other Warp Drive object types aren't available in the CLI"

    **跨 agent 记忆**列为 Enterprise 的：

    **官方原文**："Cross-harness agent memory (Research Preview)"

    **未核验：上下文压缩策略与跨项目记忆边界（官方未说明）**

    （已查 agents/cli 与 warp-drive 两页。）
  permissions: >-
    **能做：执行 profile + 三档值 + auto-approve 的终端内审批模型。**

    官方原文：

    **官方原文**："Every action the agent proposes ... is checked against your active execution profile"

    权限值三档：

    - **`agent_decides`** —— 自信则自走，不确定才问
    - **`always_ask`** —— 每次都问
    - **`always_allow`** —— 不问

    默认下 shell 命令、文件编辑、文件读取、MCP 工具调用
    均为 `agent_decides`。
    **文件编辑的 `agent_decides` 仍每次提示**，以保证：

    **官方原文**："always review a diff before it's applied"

    另有这几项：

    - `command_allowlist` / `command_denylist`（denylist 即使 `always_allow` 也要批准）
    - `directory_allowlist`
    - `write_to_pty`
    - `run_agents`
    - `ask_user_question`

    **Auto-approve**（`/auto-approve` 或 `Ctrl+Shift+I`）给全自主。
    作用域限单会话，新会话默认关闭。
    默认会绕过 command denylist（可关掉）。
    但团队管理员在 Admin Panel 设的 denylist 永不被绕过。

    执行 profile 仅存本地，不同步到云端。
  fit: >-
    **适合：在终端里同时做命令执行与编码 agent 工作、并希望团队协作与云自动化的用户。**

    **特别适合**：

    - 想把终端工作流标准化为 Workflows / Notebooks 的团队
    - 想把 issue triage / PR review 等后台活交给云 agent 的团队
    - 需要 SSO / 数据治理 / 自托管云 agent 的企业

    **不适合**：

    - 完全不碰终端 agent、只要一个经典终端的用户

    Free 档虽可当现代终端用。
    但云 agent、Warp Drive 协作与代码库索引都有额度上限。

pitfalls:
  - 把 Free 当成能无限用 agent，官方写的是 Limited cloud agents access
  - 以为 auto-approve 也绕过禁用命令，团队在 Admin Panel 设的 denylist 不会被绕过
  - 以为开源就等于全免费，客户端开源但云 agent / Warp Drive 按档计费

tags: [编程, 终端, 多模型, 协作, 云端, 开源]
related: [filesystem]

sources:
  - label: Warp · 官方定价页（Free / Build / Max / Business / Enterprise 五档结构与 credit 说明；2026-10-08 核验）
    url: https://www.warp.dev/pricing
    kind: pricing

  - label: Warp · 官方文档 · Getting started（Agentic Development Environment 定位、三种入口）
    url: https://docs.warp.dev/
    kind: docs

  - label: Warp · 官方文档 · Warp Agent CLI overview（独立终端程序、PTY、SSH、模型与 BYOK）
    url: https://docs.warp.dev/agents/cli
    kind: docs

  - label: Warp · 官方文档 · 权限与执行 profile（三档值、auto-approve、命令名单）
    url: https://docs.warp.dev/agents/cli/permissions-and-profiles/
    kind: docs

  - label: Warp · 官方文档 · MCP（本地 agent；Streamable HTTP / SSE、文件式配置、安全缓解）
    url: https://docs.warp.dev/agents/capabilities/mcp/
    kind: docs

  - label: Warp · 官方文档 · 云 agent 的 MCP server（stdio / url / warp_id、OAuth 托管安装）
    url: https://docs.warp.dev/platform/mcp/
    kind: docs

  - label: Warp · 官方文档 · Warp Drive overview（Workflows / Notebooks / Prompts / 环境变量）
    url: https://docs.warp.dev/knowledge-and-collaboration/warp-drive/
    kind: docs

  - label: Warp · 官方 Changelog（按周更新，通常在周四；含 2026 分年页）
    url: https://docs.warp.dev/changelog
    kind: changelog

  - label: Warp · 官方仓库（开源客户端）
    url: https://github.com/warpdotdev/warp
    kind: repo

link:
  url: https://app.warp.dev/get_warp
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: active
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

**开源的终端 agent 环境。**

官方自称：

> 「Agentic Development Environment」

它把现代终端、编码 agent、Warp Drive 协作与云 agent / Factories
合成一个产品。

## 变更记录说明

本对象有独立 changelog，且是本站少见的**高频发布**。

| 面 | 节奏 | 入口 |
|---|---|---|
| 产品更新 | 通常每周四 | `docs.warp.dev/changelog`（另有 2021–2026 分年页） |

**没有单一版本号。**

Warp 按「周」而非按 semver 发布。
所以引用变更时要写日期，而不是版本号。

这与 Codex `rust-v*`、Crush `nightly` 的坑类似。

## 三种入口，一个 agent

官方明确把同一个 **Warp Agent** 摆在三个运行面上：

```
In the Warp app · In any terminal (Warp Agent CLI) · In the cloud (cloud agent)
```

**这意味着额度、账号、规则与技能是同一套。**

CLI 侧还额外强调它是**「a native terminal multiplexer」**——自带 PTY。
所以它能和 agent 共用同一个终端跑交互式命令，**并且能在 SSH 里用**。

这一点把「终端 agent」和「GUI 终端模拟器」区分开了。

## Warp Drive 是它的协作底座

Warp Drive 把 Workflows（参数化命令）、Notebooks（可交互 runbook）、
Prompts 与环境变量做成**实时同步的团队对象**。

这是它区别于纯 CLI agent 的组织面。

**但注意 CLI 里只支持 prompt 类对象。**

其他 Drive 对象类型（Workflow / Notebook）在 CLI 中不可用。
官方页面已明确这一点。

团队共享与 Session Sharing 是 Business 起的功能。

## 权限设计：三档值 + auto-approve

它把每一步操作按类型独立设权限：

| 值 | 含义 |
|---|---|
| `agent_decides` | 自信则自走，不确定才问 |
| `always_ask` | 每次都问 |
| `always_allow` | 不问 |

**最值得记录的是默认组合。**
文件编辑默认虽是 `agent_decides`。
但官方说它**仍会每次提示**，以保证 review diff。

而 auto-approve 默认**会绕过命令 denylist**。
想保留 denylist 得手动关掉。

但**团队在 Admin Panel 里设的 denylist 永远不被绕过**。

「个人能绕过、管理员不能绕过」这个不对称要记清。

## 核验说明

`confidence: partial` 的原因有两条。

- ✅ 已核验：五档档位结构与 credit 制、三种入口与开源客户端、
  本地 / 云端两套 MCP 支持、执行 profile 三档值与 auto-approve 行为、
  Warp Drive 对象类型、代码库索引与云 agent 的档位上限

- ❌ 官方未说明：上下文压缩策略与跨项目记忆边界、索引算法与首次建索引耗时、
  Warp Factories 的普遍可用时间与最终计费（见「未知项清单」）

**引用本条目时请只使用已核验部分。**

## 适合与不适合

在终端里同时做命令执行与编码 agent 工作、并希望团队协作与云自动化的用户。

把终端工作流标准化为 Workflows / Notebooks，或把 issue triage、
PR review 等后台活交给云 agent，是它的重点场景。

**不适合**完全不碰终端 agent、只要一个经典终端的用户。

Free 档可以当现代终端用。
但云 agent、Warp Drive 协作与代码库索引都受限。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测**auto-approve 与命令 denylist 的实际交互**。

默认绕过 denylist 这一条，在真实 CI / 自动化里最容易出预期外的行为。

## 未知项清单

- 上下文压缩策略与跨项目记忆边界（官方未说明，已查 agents/cli 与 warp-drive 两页）
- 代码库索引的算法与首次建索引耗时（官方未说明，已查 pricing 与 agents/cli）
- Warp Factories 的普遍可用时间与最终计费口径（官方标注 Early Access）
- Enterprise 的档位内容（官方页只写「Contact Sales」）

## 相关条目

- [Crush](./crush.md) — 同为终端内 agent，可对照 TUI 形态与 MCP 传输标注
- [OpenCode](./opencode.md) — 同为终端 agent，可对照开源多 provider 的权限设计
- [Gemini CLI](./gemini-cli.md) — 同类终端 agent，工程化更完整、可脚本化
