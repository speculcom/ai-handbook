---
id: codex-cli
track: cli
tasks: ["write-code"]
name: Codex CLI
vendor: OpenAI
homepage: https://github.com/openai/codex
mark: C
accent: "#10A37F"

axes:
  model_access: >-
    **默认可跑 OpenAI 自家模型，架构上也允许换成别的 provider。**

    官方 config-basic 的「Default model」示例是 `model = "gpt-5.5"`。
    CLI 另有 `--model` / `-m` 可以覆盖（示例给的是 `gpt-5.4`）。

    配套的模型开关有三个：

    - `model_context_window`
    - `model_reasoning_effort`
    - `model_catalog_json`（或用 `codex debug models` 查看模型目录）

    **自定义 provider 是官方明确支持的**（config-advanced「Custom model providers」）。

    配置方式：顶层写 `model` + `model_provider`，再配 `[model_providers.<id>]`。

    可用的字段有五个：`base_url` / `env_key` / `wire_api` / `http_headers` / `auth.command`。

    内置的 provider ID 保留名有三个：`openai`、`ollama`、`lmstudio`。

    另有内置 `amazon-bedrock`。官方示例直接给：

    **官方示例**：`[model_providers.mistral] base_url="https://api.mistral.ai/v1"`

    本地模型走 **OSS 模式**：`--oss` + `oss_provider = "ollama" | "lmstudio"`。
    想改内置 OpenAI provider 的地址，用 `openai_base_url`。

    **换成第三方模型之后，tool calling 的质量官方没给量化结论。**
  runtime: >-
    **它是一个本地跑着的终端进程。**

    代码用 Rust 写。releases 的版本标签是 `rust-v*`。

    生命周期绑在终端会话上：退出即结束。
  local_files: >-
    **它在你的工作目录里动手，默认只写工作区，而且要求那里是 Git 仓库。**

    官方 agent-approvals-security 的原文是下面这一句：

    **官方原文**："no network access and write permissions limited to the active workspace"

    **这句的意思是：没有网络访问，写权限只限当前工作区。**

    这里的「工作区」含当前目录与 `/tmp`，用 `/status` 可以查看工作区目录。

    沙箱默认档位分两种：

    - 版本控制目录默认 `workspace-write`
    - 非版本控制目录默认 `read-only`

    `workspace-write` 之下，`.git` / `.agents` / `.codex` 是递归只读的。

    可调的几项：`--add-dir` 追加可写目录、`-C/--cd` 指定工作目录、
    `project_root_markers` 自定义项目根识别（默认含 `.git`）。

    **一条硬约束**：非交互的 `codex exec` 要求工作目录是 Git 仓库。官方原文是：

    **官方原文**："Codex requires commands to run inside a Git repository"

    想跳过这条检查，用 `--skip-git-repo-check`。
  background: >-
    **本地这个终端进程随会话结束，但官方还另有一层云端任务形态，已核到。**

    官方 Codex cloud 页原文说，Codex cloud 让 Codex 在自己的云环境里干活：

    **官方原文**："work on tasks in the background (including in parallel) using its own cloud environment"

    这些任务跑在隔离的 OpenAI 托管容器里：

    **官方原文**："isolated OpenAI-managed containers"

    它不访问你的宿主机，也不碰无关数据。

    CLI 这一侧有两个入口：

    - `codex cloud` 子命令（实验性，别名 `codex cloud-tasks`）
    - `codex apply` —— 把云任务的 diff 应用到本地工作树

    云端按 ChatGPT 套餐提供（Plus / Pro / Business / Edu / Enterprise）。

    **云端任务的并发与时长额度官方没给具体数值，只写随套餐。**
  tools: >-
    **内置工具面和 MCP 都已核到。**

    内置能力分散在 config 的能力开关里，一共六类：

    - `shell` —— 执行命令，开关是 `features.shell_tool`
    - `unified_exec` —— PTY 执行
    - web search —— `web_search = cached | live | disabled`
    - undo、git commit
    - **multi-agent 协作** —— 开关是 `features.multi_agent`，工具是 `spawn_agent`
    - 协作工具还有 `send_input` / `resume_agent` / `wait_agent` / `close_agent`
    - memories

    非交互侧的事件流也能看到这些动作：`codex exec --json` 的事件类型含
    command executions、file changes、MCP tool calls、web searches、plan updates。

    扩展机制有三种：**Hooks**（PreToolUse / PostToolUse / PreCompact 等）、
    **Skills**（`SKILL.md`，可打包为 plugins）与 **plugin marketplace**。

    **MCP 官方支持完整。** 官方 MCP 页原话是：

    "Codex supports MCP servers in both the CLI and the IDE extension"

    传输支持 STDIO 与 Streamable HTTP（Bearer / OAuth，登录用 `codex mcp login`）。

    配置两处都行：`codex mcp` CLI，或 `[mcp_servers.<name>]`。

    工具级开关有 `enabled_tools` / `disabled_tools` 与 per-tool `approval_mode`。

    反过来也行：`codex mcp-server` 能把 Codex 本身当 MCP server 暴露给别的 agent。
  context: >-
    **会话续接 + 自动压缩 + 可选 memories，三轮机制都已核到。**

    **续接**：交互式用 `codex resume`，非交互用 `codex exec resume`
    （`--last` 或 `<SESSION_ID>`）。`codex fork` 能把会话分叉成新线程。

    app server 架构让线程可启动、续接与恢复。

    **压缩**：官方配置键是 `compact_prompt`（内联覆盖压缩提示词）与
    `experimental_compact_prompt_file`；另有 `PreCompact` / `PostCompact`
    hook 事件。

    上下文窗口可用 `model_context_window` 显式设置（示例 128000）。

    **记忆需要显式开启**：打开 `[features] memories = true` 之后，
    Codex 会把既往会话提炼成本地记忆文件（默认放 `~/.codex/memories/`）。

    TUI 里用 `/memories` 按线程控制，参数走 `memories.*`。
    官方称 memories 会 "redacts secrets"。

    **注意 memories 默认关闭。**
  permissions: >-
    沙箱与审批边界跟随运行环境。

    **API key 计费与订阅不是同一额度**（此点已在官方用量说明中确认）。

    **审批与沙箱模式已核验完成**：官方口径（agent-approvals-security /
    config-advanced / config-reference）与 SDK 源码一致。

    审批策略用顶层 `approval_policy`：

    - `untrusted` / `on-request` / `never` / `granular`
    - `on-failure`（已弃用）

    复核人用 `approvals_reviewer`，取 `user` 或 `auto_review`。

    沙箱模式用 `sandbox_mode`，取 `read-only` / `workspace-write` / `danger-full-access`；
    另有命名 profile `:read-only` / `:workspace` / `:danger-full-access`。

    **本地默认是 `workspace-write`，而且网络关闭。**

    非版本控制目录默认 `read-only`。

    `workspace-write` 下 `.git` / `.agents` / `.codex` 递归只读。
    网络另有 `features.network_proxy` 域名 allowlist + DNS 重绑定防护。

    TUI 里还有三个开关：

    - `/permissions` —— 切 read-only
    - `--ask-for-approval never` —— 关审批
    - `--dangerously-bypass-approvals-and-sandbox`（别名 `--yolo`）—— 全放开

    **Windows 另有专属档位**：`[windows] sandbox = "elevated" | "unelevated"`。
    `codex sandbox` 子命令可在 macOS / Linux / Windows 提供沙箱。

    但**逐平台的实现细节官方没按平台分别展开**（已查 config-basic 与
    agent-approvals-security 两页，未分平台列出）。

    详见 [Codex SDK 档案](../../harness/products/codex-sdk.md)。
  fit: >-
    **适合在终端里做工程任务，要接 CI 或要自建客户端的场景。**

    它有个别人少有的证据：**非交互模式有官方文档支持**。
    `docs/exec.md` 的标题就是 Non-interactive mode（正文为外链）。

    这使它是本站 CLI 分区里除 Gemini CLI 外唯一有非交互证据的对象。

    已有仓库的续接与恢复是它的架构重点。

pitfalls:
  - 把 API 额度当成订阅额度的一部分，两者独立计费
  - 以为 CLI 本身就是全部，实际还有 app server 供自建客户端接入
  - 以为文档站能直接 curl 抓取，可能被 CDN 拦截

tags: [编程, 终端, 本地]
related: [codex-sdk, filesystem]

sources:
  - label: OpenAI · Codex CLI 仓库
    url: https://github.com/openai/codex
    kind: repo

  - label: OpenAI · Codex CLI Releases（rust-v0.158.0 @ 2026-09-28）
    url: https://github.com/openai/codex/releases
    kind: changelog

  - label: OpenAI · Codex CLI Commits
    url: https://github.com/openai/codex/commits/main
    kind: changelog

  - label: OpenAI · Codex 文档
    url: https://developers.openai.com/codex/cli
    kind: docs

  - label: OpenAI · Config basics（默认模型 gpt-5.5、sandbox_mode、Windows sandbox）
    url: https://developers.openai.com/codex/config-basic
    kind: docs

  - label: OpenAI · Advanced Configuration（自定义 provider / OSS / hooks）
    url: https://developers.openai.com/codex/config-advanced
    kind: docs

  - label: OpenAI · Configuration Reference（approval_policy 等配置键）
    url: https://developers.openai.com/codex/config-reference
    kind: docs

  - label: OpenAI · Agent approvals & security（沙箱 / 审批默认 / 网络）
    url: https://developers.openai.com/codex/agent-approvals-security
    kind: docs

  - label: OpenAI · Non-interactive mode（codex exec / Git 仓库要求）
    url: https://developers.openai.com/codex/noninteractive
    kind: docs

  - label: OpenAI · MCP（STDIO / Streamable HTTP、per-tool approval_mode）
    url: https://developers.openai.com/codex/mcp
    kind: docs

  - label: OpenAI · CLI 参考（--model / --sandbox / codex cloud / exec）
    url: https://developers.openai.com/codex/cli/reference
    kind: docs

  - label: OpenAI · Codex cloud / web（云任务跑在 OpenAI 托管容器）
    url: https://developers.openai.com/codex/cloud
    kind: docs

  - label: OpenAI · Memories（跨会话记忆，默认关闭）
    url: https://developers.openai.com/codex/memories
    kind: docs

  - label: OpenAI · Customization（AGENTS.md / Skills / MCP / Subagents）
    url: https://developers.openai.com/codex/concepts/customization
    kind: docs

link:
  url: https://github.com/openai/codex
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
  direct_note: 官网仓库在 GitHub，大陆直连波动（同日实测 200/000 混合）；npm / PyPI 安装源实测稳定可达。
  direct_note_en: Hosted on GitHub — direct reachability from mainland fluctuates (200/000 mixed on the same day); npm / PyPI install routes measured stable.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

OpenAI 官方的终端编码 agent，**Rust 实现**，架构上强调 app server 与线程续接。

## 变更记录说明

本对象有独立 releases：

| 版本 | 日期 |
|---|---|
| `rust-v0.158.0` | 2026-09-28 |

**注意版本号前缀是 `rust-v`**，说明仓库同时包含其他语言的实现，
引用版本号时要完整写前缀。

## 安装方式

README 提供两种：

- npm 安装
- Homebrew 安装（`--cask`）

授权方式明确：README 有独立章节 **"Using Codex with your ChatGPT plan"**，
即授权随 ChatGPT 订阅。

## 架构关键：app server

Codex 的设计重点不是 CLI 本身，而是**它背后的 app server**。

- 自定义客户端通过 app server 接入
- 线程可启动、续接与恢复
- Python SDK 基于 app-server JSON-RPC

**这意味着它可以脱离终端单独使用** ——
如果你要自建集成，CLI 只是其中一个客户端。

## 核验限制（A6.2 已解除）

**初版采集时**这条目多个维度标为未知，原因是官方文档站
`developers.openai.com` 当时对 curl 返回 **403**（CDN 拦截），
仓库 README 又极简，拿不到「沙箱档位、工具清单、模型映射、审批模式」。

**A6.2（2026-10-08）改用浏览器直取官方文档后已全部补齐。**

本轮取到正文的官方页：

- `config-basic` / `config-advanced` / `config-reference`
- `agent-approvals-security` / `noninteractive` / `mcp` / `cli/reference`
- `cloud` / `memories`

这些页的逐条结论见上方 axes。

## 权限定级说明

`confidence: partial` 的原因：

- ✅ 已核验（每条都能回到官方页）：仓库存在、许可（Apache-2.0）、
  最新版本、发布日期、star 数（126,978）、安装方式、ChatGPT 订阅授权

- ✅ 已核验（默认模型与 provider 配置面、沙箱档位与默认值、审批策略枚举、
  工具清单与 MCP、上下文压缩与 memories、云端任务形态）

- ❌ 未核验（三档沙箱的**逐平台**实现细节）：官方只说 OS 级强制 +
  Windows `elevated`/`unelevated` 档位，未按平台分列

- ❌ 未核验（换 provider 后 tool calling 质量、云端任务的并发与时长具体数值）

**引用本条目时请只使用已核验部分。**

## 适合与不适合

在终端做工程任务，需要接入 CI 或自建客户端的场景。
已有仓库的续接与恢复是它的架构重点。

**不适合**需要「沙箱逐平台实现逐条明确」的场景 ——
官方只说明 OS 级强制与 Windows 的 `elevated` / `unelevated` 档位，
未按 macOS / Linux / Windows 分别列出实现细节，采购前仍建议实测。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

## 未知项清单

- 三档沙箱在 macOS / Linux / Windows 的**逐平台**实现细节
  （官方只说 OS 级强制 + Windows `elevated` / `unelevated`，未分平台展开）

- 换第三方 provider 后 tool calling 的质量对齐
- 云端任务的并发数与时长具体数值（官方只说随套餐）

> 原「默认模型 / 沙箱档位 / 工具清单 / 上下文策略 / 审批模式 / 云端任务入口」
> 六项已由官方 developers.openai.com/codex（config-basic、config-advanced、
> agent-approvals-security、noninteractive、mcp、cli/reference、cloud）核到，
> 见上方 axes。

## 相关条目

- [Claude Code CLI](./claude-code-cli.md) — 同为终端编码 agent
- [Gemini CLI](./gemini-cli.md) — Google 官方同类
