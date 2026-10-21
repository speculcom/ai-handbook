---
id: goose
track: cli
tasks: ["write-code"]
name: Goose
vendor: Agentic AI Foundation
homepage: https://github.com/aaif-goose/goose
mark: G

axes:
  model_access: >-
    **能用多家模型，也能接本地模型。**

    官方 README 列了 15+ 家 provider：

    **"15+ providers — Anthropic, OpenAI, Google, Ollama, OpenRouter, Azure, Bedrock, and more"**

    接入方式有三种：

    - 直接用 API Key
    - 用本地模型
    - 经 ACP 接已有的 Claude / ChatGPT / Gemini 订阅

    本地与自托管这条路是完整的。

    Ollama、Ollama Cloud、LM Studio 都能用。
    Docker Model Runner 与 Ramalama 也能用。
    Ramalama 走 Ollama provider。

    任何 OpenAI 兼容端点也能接。
    `OPENAI_HOST` 可指向自建的 vLLM / KServe。

    订阅接入分两类：

    - CLI Provider：`cursor-agent`
    - ACP Provider：`claude-acp` / `codex-acp`
      后者把 goose 的 extensions 作为 MCP 传给对方

    选模型有两个入口。
    一个是 Desktop 的 Models 标签，一个是 `goose configure`。

    官方提示一件事：`goose configure` 不支持输入自定义模型名。
    这种情况要改 `GOOSE_MODEL`，或者走 Desktop。

    官方另称，tool calling 目前以 Claude 4 表现最好。
    官方还推荐参考 BFCL 榜单。
  runtime: >-
    **本地优先，三种形态都有。**

    - 桌面应用：macOS / Linux / Windows
    - 完整 CLI：面向终端工作流
    - 可嵌入的 API：GDK / SDK

    官方 README 原文：

    "A native desktop app for macOS, Linux, and Windows. A full CLI for terminal workflows. An API to embed it anywhere. **Built in Rust** for performance and portability."

    代码在本机跑。

    模型请求要么出网，要么打到本地模型端点。

    另有 `goose serve`。
    Desktop 默认在后台起它，它是个本地 ACP server。

    也可以把 `goose serve` 单独跑在远程 VM 上，再让 Desktop 连过去。
  local_files: >-
    **靠内置的 Developer 扩展读写文件、执行命令，默认权限很宽。**

    Developer 扩展页列出的工具：

    - `shell` —— 执行命令，官方标注 High 风险
    - `write` —— 创建 / 覆盖文件，High
    - `edit` —— 精确替换文本，High
    - `tree` —— 列目录树，Low
    - `read_image` —— 看图，Low

    官方原文说得很直白：

    "goose can run system commands with your user privileges and edit any accessible file **without your approval**"

    另外两点：

    - MCP Roots 会把当前工作目录共享给支持 roots 的扩展
    - 可以在 Docker 容器里跑扩展（`--container` 与 goose-in-docker 教程）

    还有独立的 Analyze 扩展，做**语义分析与调用图**。
  background: >-
    **本地进程，不支持关机续跑。**

    CLI 会话随终端结束。

    模型请求在本机发起。

    **非交互不是后台**：`goose run` 只是脚本化执行。
    它一次跑完就退出，仍占用本机进程（详见 tools 轴）。

    **有定时与远程入口，但都依赖本机在线**：

    - Recipes 的定时调度（schedules）
    - `goose serve` ACP server
    - 把 Desktop 指向远程 goose server
    - Roaming Agents（从另一台机器连到正在运行的 goose）

    主机一关机，任务即中断。
  tools: >-
    **MCP 是一等公民**：extensions 就是 MCP server。

    官方 README 原文：

    "Connect to **70+ extensions** via the Model Context Protocol (MCP) open standard"

    **传输方式已核到两种**：

    - stdio：`--with-extension`，可带 ENV=val 与显式名字
    - Streamable HTTP：`--with-streamable-http-extension <url>`

    另有 `--with-builtin`。

    **内置扩展**（官方 Browse Extensions 页）：

    - Developer
    - Computer Controller
    - Memory
    - Auto Visualiser（MCP-UI）
    - Code Mode（用 JS 调 MCP 工具）
    - Summon（加载技能并派发子代理）
    - Top of Mind
    - Analyze 等

    **扩展白名单**（Extension Allowlist）可限制企业内可装的 MCP server。
    并支持 MCP Elicitation、MCP Roots 与 MCP Apps。

    **非交互命令 `goose run`** 的参数：

    - `-t "text"` / `-i file` / `-i -`（stdin）
    - `--output-format json|stream-json`
    - `--no-session`
    - `-s` 转交互
  context: >-
    **会话落本地 SQLite，可续接、可分叉。**

    官方 CLI Commands 页记了一条变化：

    自 1.10.0 起，会话存于 SQLite 数据库 sessions.db，不再是单个 .jsonl

    会话操作命令：

    - `goose session -r` —— 续接
    - `--fork` —— 复制历史，开新会话
    - `--edit` —— 用编辑器改对话
    - `session list / rename / remove / export` —— 可导出 markdown / json / yaml

    **压缩**：官方 changelog 提到过这一条。

    压缩发生在 unrolled agent loop 的工具边界。

    **记忆**：内置 Memory 扩展提供持久上下文。
    也就是跨会话的信息存储。

    Top of Mind 每轮注入持久指令。
    官方另有 goosehints 一类的上下文工程手段。
  permissions: >-
    **默认就是最宽松的一档，值得单独记。**

    官方 Developer 扩展页原文：

    "goose runs in **Autonomous permission mode by default**"

    也就是不经审批即可执行 shell 命令、改任意可访问的文件。

    **四档权限模式**（`GOOSE_MODE` 或会话内 `/mode`）：

    - `auto` —— 无需审批
    - `approve` —— 每次动作都要审
    - `smart_approve` —— AI 判断哪些要审
    - `chat` —— 禁用全部工具

    **工具级权限**也可以单独设。

    在 approve / smart_approve 下，每个扩展工具有三种策略可选：

    - Always allow
    - Ask before
    - Never allow

    **数据面**：官方 Usage Data 页说明了两件事。

    收集匿名用量数据需**首次征得同意**。
    同意与否可随时更改。

    诊断包 `goose session diagnostics` 会包含会话消息与配置。
    官方提示分享前先检查。

    **模型推理的数据流向取决于你选的 provider**。
    goose 本体是 Apache-2.0 的本地程序。
  fit: >-
    四类人适合用：

    - 想要一个**本地优先、可换任意 provider（含本地模型）的通用 agent**，而不止写代码的人
    - 需要桌面应用 + CLI 双形态的人
    - 需要以 MCP 扩展能力为中心、可白名单管控的企业
    - 需要把 agent 接进脚本或 CI 的人（`goose run --output-format json`）

pitfalls:
  - 以为默认有人工审批——默认 Autonomous 模式，不确认即可执行命令、改文件
  - 以为它只写代码——官方定位是通用 agent（研究、写作、自动化、数据分析）
  - 以为装上就能用——首次使用必须先配置 LLM provider（goose configure）

tags: [编程, 终端, 本地, 开源, 多模型]
related: [filesystem]

sources:
  - label: Goose · 官方仓库 README（Apache-2.0、Rust、15+ providers，2026-10-08 取到）
    url: https://github.com/aaif-goose/goose
    kind: repo

  - label: Goose · Releases（v1.53.0 @ 2026-10-02）
    url: https://github.com/aaif-goose/goose/releases
    kind: changelog

  - label: Goose Docs · Supported LLM Providers（15+ provider、Ollama、ACP、CLI Provider）
    url: https://goose-docs.ai/docs/getting-started/providers
    kind: docs

  - label: Goose Docs · Run Tasks（goose run 非交互、-t/-i、--output-format json）
    url: https://goose-docs.ai/docs/guides/running-tasks
    kind: docs

  - label: Goose Docs · CLI Commands（session resume/fork/edit/export、run 选项）
    url: https://goose-docs.ai/docs/guides/goose-cli-commands
    kind: docs

  - label: Goose Docs · Developer Extension（工具清单、默认 Autonomous、权限模式）
    url: https://goose-docs.ai/docs/mcp/developer-mcp
    kind: docs

  - label: Goose Docs · Browse Extensions（内置扩展与 MCP 生态）
    url: https://goose-docs.ai/extensions
    kind: docs

  - label: Goose Docs · Usage Data（匿名用量数据需首次同意）
    url: https://goose-docs.ai/docs/guides/usage-data
    kind: docs

link:
  url: https://goose-docs.ai/docs/getting-started/installation
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

**本地优先的开源通用 agent**：桌面应用 + CLI + 可嵌入 API 三种形态都能跑。

由 Block 创建，现属 **Agentic AI Foundation（Linux Foundation）**。

provider 可换成 Ollama 等本地模型。

扩展面以 MCP extensions 为核心。

## 适合与不适合

**适合四类人。**

- 想要一个**本地优先、可换任意 provider（含本地模型）的通用 agent**，而不止写代码的人
- 需要桌面应用 + CLI 双形态的人
- 需要以 MCP 扩展能力为中心、可白名单管控的企业
- 需要把 agent 接进脚本或 CI 的人（`goose run --output-format json`）

**不适合**需要「关机后任务继续跑」的场景。

goose 是本地进程。

`goose run` 的非交互模式只是脚本化执行，电脑一关就中断。

## 核验说明

`confidence: partial` 的原因：能力面已经核到，细节还缺。

**已核到的能力面**：多形态、provider、MCP 扩展、会话、权限模式、非交互执行。

**还缺的细节**：各扩展的默认权限档位、定时调度的额度上限。

这些官方未逐项列出，所以不给 `verified`。

**一处必须记录的变化（2026-10-08 核到）**：旧仓库地址换了。

本条目采集起点是 `github.com/block/goose`。

该地址现已重定向到 `github.com/aaif-goose/goose`。

> 官方博客（2026-04-07）原文："Block has donated goose to the **Agentic AI Foundation (AAIF)** at the Linux Foundation"

> README 原文："goose is part of the **Agentic AI Foundation (AAIF)** at the Linux Foundation"

`vendor` 记的是**当前托管方** Agentic AI Foundation。

记法与本站 Windsurf→Cognition 一致：都记当前归属。
Block 是创建方，写在正文里。

`homepage` 指向**当前权威仓库**。

它写的是 `github.com/aaif-goose/goose`。
这样不会收进重定向地址。

文档站也已迁到 `goose-docs.ai`（旧 docs 链接会重定向）。

> 本轮核到的官方页：仓库 README、Releases（v1.53.0）、Supported LLM Providers、Run Tasks、CLI Commands、Developer Extension、Browse Extensions、Usage Data

## 实测记录

本站尚未完成实测。

测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点验三处。

- 默认 Autonomous 权限模式下，改文件 / 跑命令的实际边界
- `goose run --output-format json` 在 CI（无 TTY）里的可用性与退出码
- 把 provider 换成 Ollama 本地模型后的 tool calling 质量

## 未知项清单

- 各内置扩展的**默认权限档位**：官方未说明每个扩展的默认审批级别（已查 Browse Extensions 与 Developer Extension 两页）
- 定时调度（schedules / recipes）的并发与时长上限：官方文档未给数字
- 桌面应用与 CLI 在权限默认值上是否完全一致：官方未说明（已查 CLI Commands 与 Developer Extension 两页）
- `goose serve` 远程形态的认证与网络边界：官方文档给了入口，未展开安全细节

## 相关条目

- [Codex CLI](./codex-cli.md) — 同为终端 agent，可对照 provider 面与权限默认值
- [Gemini CLI](./gemini-cli.md) — 同为开源 CLI，对照 MCP 支持与额度口径
- [Amp](./amp.md) — 同为 CLI 形态，对照「纯本地」与「云端 orb」两种运行面
