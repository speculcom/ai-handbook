---
id: codex-ide
track: ide
tasks: ["write-code"]
name: Codex IDE 扩展
nameEn: Codex (IDE extension)
vendor: OpenAI
homepage: https://developers.openai.com/codex/ide
mark: C
accent: "#10A37F"

axes:
  model_access: >-
    **用的是 CLI 那套 agent 和配置，模型可以换。**

    **官方 IDE 页原文**："It uses the same agent as the Codex CLI and shares the same configuration"

    官方定价页列出的可用模型：

    - GPT-5.5
    - GPT-5.4
    - GPT-5.4 mini
    - Pro 另有 GPT-5.3-Codex-Spark（research preview）

    聊天输入框下有 **模型切换器**，可以调 reasoning effort（`low` / `medium` / `high`）。

    **默认模型在共享的 `config.toml` 里设**（`model = "..."`），IDE 与 CLI 共用，
    所以自定义 provider 也走同一套 `model_providers` 配置（见 CLI / SDK 档案）。

    **BYOK 可用**：官方支持用 API key 登录；JetBrains 集成还可走 JetBrains AI 订阅。
    API key 路径下，模型可用范围跟随该 key 的 API 模型。

  runtime: >-
    **它是扩展，不是独立编辑器。**

    **官方 README 原文**："If you want Codex in your code editor (VS Code, Cursor, Windsurf), install in your IDE."

    也就是**装进 VS Code / Cursor / Windsurf 这类已有编辑器**。

    这和 Zed（独立编辑器）、Cline Desktop（原生应用）是不同形态。

  local_files: >-
    通过宿主编辑器访问工作区文件。

    上下文来自打开的文件、选区与 `@file` 引用。
    另有 **Auto Context**：自动带入最近文件与 IDE 上下文
    （见 `/auto-context`）。

    官方口径：工作区 = 当前目录加临时目录（如 `/tmp`），写入默认限工作区。

    Windows 上可以原生运行（走 Windows 沙箱），也可以改用 WSL2
    （设置项 `chatgpt.runCodexInWindowsSubsystemForLinux`）。

    **官方 IDE 文档没有描述独立语义索引** ——
    本地文件检索由同一 agent 的工具完成。

    **核验**：已查官方 features 与 settings 两页。

  background: >-
    **有云端形态：官方称可以从 IDE 委派任务到 Codex Cloud。**

    **IDE 页原文**："delegate tasks to Codex Cloud"
    
    **功能页原文**："Offload longer jobs to a cloud environment"

    用 `/cloud` 与 `/local` 切换。

    云任务在 **OpenAI 托管的容器**里后台运行（含并行），
    所以**本地编辑器关掉之后云任务还会继续**。
    **本地任务依赖宿主编辑器进程，关掉就停。**

    云任务与本地消息共享套餐用量（官方定价页称共用 5 小时窗口）。

  tools: >-
    **内置第一方工具与命令都已核验。**

    工具：

    - 网页搜索 —— 官方称默认启用，走 OpenAI 维护的搜索缓存，可配 `web_search = "live" | "disabled"`
    - 图像生成 —— `$imagegen`，模型 `gpt-image-2`，计入用量且更快耗尽额度
    - 代码审查 —— `/review`
    - 编辑器上下文 —— `@file`、选区、拖拽图片

    命令面板命令：`chatgpt.newChat` / `addToThread` / `addFileToThread` / `implementTodo`，
    另有 TODO CodeLens。

    **MCP 官方明确支持 IDE 扩展。**

    支持 STDIO 与 Streamable HTTP；CLI 与 IDE 共享 `config.toml` 里的
    `[mcp_servers.<name>]`（含 `enabled_tools`，以及逐 server、逐 tool 的 `approval_mode`）。

    **原文**："Codex supports MCP servers in both the CLI and the IDE extension"

  context: >-
    **app server 架构仍是关键设计** —— 线程可以启动、续接与恢复，
    IDE 与 CLI 共享同一套会话机制和同一份配置。

    官方另外补了三点：

    - 从本地会话发起云任务会记住会话上下文（云任务转回本地续聊也保留上下文）
    - `/status` 显示 thread ID、上下文用量与速率限额
    - `/goal` 可设持久目标

    **上下文窗口的具体数值与自动压缩策略，官方未在 IDE 文档单列。**

    压缩在 CLI / SDK 侧经 `compact_prompt` 等配置项；

    **核验**：已查官方 features 与 slash-commands 两页。

  permissions: >-
    **IDE 与 CLI 共用同一套沙箱与审批。**

    **官方 settings 页原文**："The Codex IDE extension uses the Codex CLI"
    
    **同页**：审批与沙箱在共享的 `~/.codex/config.toml` 里配置。

    UI 侧有三档审批模式：`Chat` / `Agent` / `Agent (Full Access)`。

    - 默认 `Agent` —— 在工作目录内自动读写并执行命令，**工作目录外或联网仍需审批**
    - 只有 `Full Access` 才免审批联网

    官方安全页口径（含 IDE extension）：
    默认 **无网络 + 写入限当前工作区**；`.git` / `.agents` / `.codex` 递归只读。

    审批与沙箱键同 CLI：`approval_policy` / `sandbox_mode` /
    `[sandbox_workspace_write] network_access` 与 `network_proxy` 域名清单。
    Windows 原生沙箱默认 `elevated`。

  fit: >-
    适合两类人：

    - 已在用 VS Code / Cursor / Windsurf 等编辑器，希望在同一环境里用 Codex 而不切换工具的人
    - 需要 IDE 与 CLI 共享会话的人（app server 架构）

pitfalls:
  - 把它当成独立 IDE，其实质是装进已有编辑器的扩展
  - 以为 IDE 扩展与 CLI 是两套独立系统，app server 架构让它们共享会话
  - 以为 IDE 扩展的权限体系与 CLI 不同——两者共用 config.toml，沙箱与审批一致

tags: [编程, IDE, 本地]
related: [codex-sdk]

sources:
  - label: OpenAI · Codex IDE 文档（扩展形态、云委派总览）
    url: https://developers.openai.com/codex/ide
    kind: docs

  - label: OpenAI · Codex IDE Features（模型切换、审批模式、云委派、web search、图像生成）
    url: https://developers.openai.com/codex/ide/features
    kind: docs

  - label: OpenAI · Codex IDE Settings（共享 config.toml、Windows/WSL 设置）
    url: https://developers.openai.com/codex/ide/settings
    kind: docs

  - label: OpenAI · Codex IDE Slash commands（/cloud /local /status /goal）
    url: https://developers.openai.com/codex/ide/slash-commands
    kind: docs

  - label: OpenAI · Codex Cloud（云任务后台运行、@codex、PR）
    url: https://developers.openai.com/codex/cloud
    kind: docs

  - label: OpenAI · Codex Cloud environments（托管容器、setup/agent 两阶段）
    url: https://developers.openai.com/codex/cloud/environments
    kind: docs

  - label: OpenAI · Codex Agent approvals & security（沙箱默认、审批策略、受保护路径）
    url: https://developers.openai.com/codex/agent-approvals-security
    kind: docs

  - label: OpenAI · Codex MCP（CLI 与 IDE extension 支持 STDIO/Streamable HTTP）
    url: https://developers.openai.com/codex/mcp
    kind: docs

  - label: OpenAI · Codex Config basics（默认模型、approval_policy、sandbox_mode）
    url: https://developers.openai.com/codex/config-basic
    kind: docs

  - label: OpenAI · Codex Pricing（可用模型与套餐）
    url: https://developers.openai.com/codex/pricing
    kind: pricing

  - label: OpenAI · Codex 仓库 README（含 IDE 安装说明）
    url: https://github.com/openai/codex
    kind: repo

  - label: OpenAI · Codex CLI Releases
    url: https://github.com/openai/codex/releases
    kind: changelog

link:
  url: https://developers.openai.com/codex/ide
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: no
  direct_note: developers.openai.com 大陆直连被拦（403），走代理 200——拦截发生在网络层，不是反爬。
  direct_note_en: developers.openai.com returns 403 direct from mainland but 200 via proxy — the block is at the network layer, not anti-bot.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**Codex IDE 扩展是装进 VS Code / Cursor / Windsurf 的扩展，不是独立 IDE** —— 它通过 app server 与 CLI 共享同一套会话机制。

## 形态澄清（这一条最容易被误解）

它明确列出支持的三种宿主编辑器。

> 官方 README 原文："If you want Codex in your code editor (VS Code, Cursor, Windsurf), install in your IDE."

**关键信息**：这说明 **Codex IDE 形态是「扩展」而不是「编辑器」**。

### IDE 形态三种对比

| 形态 | 代表 | 含义 |
|---|---|---|
| **独立编辑器** | Zed | 自带完整编辑器，AI 是其中一部分 |
| **原生桌面应用** | Cline Desktop | 不依附于任何编辑器 |
| **编辑器扩展** | **Codex IDE**、Copilot、Cline 扩展 | 装进已有编辑器 |

**这个区分很重要**：

- 扩展形态的「索引策略」「上下文构建」往往由宿主编辑器决定，而不是由这个工具自己决定
- 所以本条目与 [Zed](./zed.md) 不完全可比 —— 一个是独立编辑器，一个是扩展

## 与 CLI 形态的关系

两个条目，不同分区，但共享后端：

| | [CLI 形态](../../agents/products/codex-cli.md) | IDE 形态（本条目） |
|---|---|---|
| 形态 | 终端进程 | 编辑器扩展 |
| 授权 | 随 ChatGPT 订阅 | **同一授权** |
| 后端 | app server | **同一个 app server** |

**app server 架构的实际意义**：线程可启动、续接与恢复。

所以**在 IDE 里开的会话可以在 CLI 里续上**，反过来也一样。

**这是本工具最有价值的架构特点**，也是 CLI 与 IDE 两个条目必须交叉引用的原因。

## 适合与不适合

适合两类人：

- 已在用 VS Code / Cursor / Windsurf 等编辑器，希望在同一环境里用 Codex 而不切换工具的人
- 需要 IDE 与 CLI 共享会话的人（app server 架构）

**不适合**需要独立编辑器的人 —— 本形态必须依附已有编辑器，无法单独使用。

另需注意：本地任务依赖编辑器进程常驻。

要「关机后继续跑」，须改用云委派（Codex Cloud）。

## 采集限制

本次（2026-10-08）已取到官方 IDE 文档站正文
`developers.openai.com/codex/ide` 及其
features / settings / slash-commands 子页，
并交叉核对了 cloud、config-basic、安全与 MCP 页。

> 此前一度取不到，属取证故障，非官方缺页。

**已核验**：

- 工具集（web search、图像生成、code review、编辑器上下文）与 MCP 支持
- 三档审批模式（Chat / Agent / Agent Full Access）与沙箱默认值
- 云委派（Codex Cloud）与本地 / 云端会话上下文保留
- 模型切换器、可用模型清单与 API key 登录
- 授权随 ChatGPT 订阅；许可证 Apache-2.0

**官方未说明**：

- IDE 与 CLI 沙箱的逐平台实现差异（官方只说 OS 级强制）

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测 **app server 的会话续接** ——
在 IDE 开会话、切到 CLI 继续，看状态是否完整保留。

这是它架构上最有价值也最需要验证的点。

## 未知项清单

- 沙箱在 Windows / macOS / Linux 的逐平台实现差异
- 上下文窗口的具体数值与自动压缩触发阈值
- app server 的并发写与跨机迁移语义
- 换用非 OpenAI provider 后工具调用的质量对齐度

## 相关条目

- [Claude Code](./claude-code.md) — 同为「扩展 + CLI」双形态架构
- [Zed](./zed.md) — 同分区的另一端：独立编辑器
- [Cline](./cline.md) — 三形态全覆盖的另一实现
