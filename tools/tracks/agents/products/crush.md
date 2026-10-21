---
id: crush
track: cli
tasks: ["write-code"]
name: Crush
vendor: Charm
homepage: https://github.com/charmbracelet/crush
mark: CR
accent: "#F26D9D"

axes:
  model_access: >-
    **它自己不带模型，模型全要你自备（BYOK），但可接的 provider 很多。**

    官方 README 给了完整清单与多种换法。其中包括官方自营的订阅方案 **Hyper**。

    官方 README 原文：

    **官方原文**："Hyper, from Charm, is the official Crush provider. It's subscription-based"

    官方 README 另提到 Hyper 有免费层，以及零数据留存（ZDR）。

    除 Hyper，官方 README 点名的 provider 有：

    - Anthropic、OpenAI、Gemini、OpenRouter

    - Vercel AI Gateway、Z.ai、MiniMax、Synthetic

    - Hugging Face、Cerebras、io.net、Alibaba

    - Groq、Avian、OpenCode Zen & Go

    - Google Cloud VertexAI、Amazon Bedrock（Claude）

    - Azure OpenAI、Moonshot

    每家都有对应环境变量（如 `ANTHROPIC_API_KEY`）。

    换法有三种：

    - 接任意兼容端点：命令是 `provider add`，参数依次是 provider id、`--type`、`--base-url`、`--api-key`，其中 `--type` 只能填 `openai-compat` 或 `anthropic`

    - 注册模型：用 `model add <provider>/<id> --context-window …` 注册，并声明该模型能用多长的上下文

    - 设默认模型：`model large` / `model small` 分别设默认大、小模型

    默认清单来自官方维护的 Catwalk 仓库，并自动更新。

    **本地模型**：官方支持 llamacpp、omlx、lmstudio、litellm、ollama，并自动发现模型。

    官方 README 给的本地接法是：

    `provider add ollama --type ollama --base-url http://localhost:11434/v1/`
  runtime: >-
    **本地进程，在终端里跑，用 Charm 的终端库做 TUI。**

    安装方式有 Homebrew、NPM、Arch Linux 等。

    **多个客户端可以共享同一个 workspace。**
    指向同一工作目录的第二个客户端会附着到已存在的 workspace，
    共享会话列表、消息历史、权限队列、LSP 与 MCP 状态。

    **但每次新调用都会启动新进程。**
    所以 first-wins 规则会影响共享 workspace 的配置。
  local_files: >-
    **默认只在项目工作区读写，没有全量语义索引。**
    范围靠两样东西界定：LSP，以及忽略规则。

    **忽略边界**：官方 README 原文「Crush respects `.gitignore` files by default」。
    另可用同语法的 `.crushignore` 追加排除，放项目根或子目录都行。

    **初始化**：`crush init` 会分析代码库并生成一份上下文文件。
    默认名 `AGENTS.md`，可用 `initialize-as` 改名或改路径。

    **符号级能力取决于外接 LSP。**

    官方 README 原文：

    **官方原文**："LSP-Enhanced: Crush uses LSPs for additional context"

    可 `lsp add go --command gopls` 手动配置，或让 `auto-lsp` 自动配置。

    **上下文文件**：全局 `~/.config/crush/CRUSH.md`（Crush 专用）与
    `~/.config/AGENTS.md`（跨工具通用）自动注入，
    路径可用 `global-context-path` 追加。

    **未知**：索引算法与大仓库的耗时，官方未说明。
    （已查 README 与 docs/config 两处。）
  background: >-
    **它不能关机续跑。** 这是本地 CLI 的形态边界，不是缺陷。

    **多客户端共享 workspace 不等于后台。**
    官方 README 说明：运行 `crush serve` 会暴露本地后端，
    多个 TUI 客户端按 `--cwd` 并入同一 workspace。
    但 workspace 的生命周期跟着客户端流走。

    官方 README 原文：

    **官方原文**："A workspace lives as long as at least one client has an SSE event stream open against it. When the last stream disconnects, the workspace is torn down."

    即最后一条流断开，workspace 就被拆除。

    **执行环境归你的本地机器。** `crush serve` 也是本机后端。
    官方 README 与 docs/config 都没有厂商托管的表述。也没有「关机后继续」的说法。

    **中断可恢复**：会话按项目保存。可经会话选择器 resume，退出横幅也提示 resume。
    但进程本身不常驻。
  tools: >-
    **明确支持 MCP，三种传输方式全支持，而且标得最全。**

    官方 README 写明支持 `http`、`stdio` 和 `sse` 三种。
    这是本分区里把 MCP 传输方式写清楚的少数几个之一。

    另支持自定义配置文件 `~/.config/crush/crushrc`
    （Windows 为 `%USERPROFILE%\.config\crush\crushrc`），
    且**可按机器条件覆盖配置**（示例里用 `$HOSTNAME` 判断）。

    **模型可手动添加，并可显式声明上下文窗口。**
    官方 README 给的命令是
    `model add ollama/llama3.3 --name "Llama 3.3" --context-window 128000`。
  context: >-
    **上下文机制分三段：会话、全局上下文文件、LSP。**

    **会话**：官方 README 原文「Session-Based: maintain multiple work sessions and contexts per project」
    —— 按项目维护多个工作会话与上下文，可切换、可 resume。

    **跨模型保留上下文**：官方 README 原文「Flexible: switch LLMs mid-session while preserving context」
    —— 即官方明确换模型不丢上下文。

    **上下文文件**：全局 `~/.config/crush/CRUSH.md` 与 `~/.config/AGENTS.md`
    自动注入；项目侧由 `crush init` 生成 `AGENTS.md`；
    可用 `context-path` / `global-context-path` 追加。

    **压缩策略已核到。** docs/config 的 `auto-summarize` 布尔项，官方说明为：

    **官方原文**："automatically summarize long conversations"

    命令面板另有 "Summarize Session" 可手动压缩当前会话。

    **LSP 提供额外上下文**（见 local_files）。
  permissions: >-
    **默认每次工具调用都询问。** 官方 README 原文：

    **官方原文**："By default, Crush will ask you for permission before running tool calls"

    可在配置里 `permissions allow view edit` 免确认特定工具。

    官方对免确认模式的提醒是 `Use this with care`，意思是谨慎使用。

    **另有 `--yolo` 开关可整体放宽审批。**
    但该 flag 遵循「first-wins」规则。同一 cwd 下，首个客户端的设置会锁定后续客户端的行为。
    不一致时会打一行 debug 日志记录这种不匹配。
    **多客户端同时接入同一目录时需注意这个规则。**

    凭据配置也支持按机器分叉（可用 `$HOSTNAME` 条件覆盖）。
  fit: >-
    适合这几类人：

    - 喜欢 Charm 生态的终端体验（TUI 审美与交互）

    - 需要在多个 provider 间切换，或想用官方订阅方案 Hyper

    - **想中途换模型且不丢上下文的人**（官方 README 明确承诺）

    - 想用本地模型并显式声明其上下文窗口的人

    - 需要 MCP 三种传输都支持的人

    **不适合**需要明确开源许可做二次分发的场景 ——
    GitHub 识别为 NOASSERTION，条款未核验。

pitfalls:
  - 以为许可证明确可商用，GitHub 识别为 NOASSERTION，条款未核验
  - 以为只能用自己的模型，实际上可以接 Anthropic / OpenAI 等
  - 以为每个终端窗口独立配置，其实同 workspace 下 first-wins 会锁定设置

tags: [编程, 终端, 本地]
related: [context7]

sources:
  - label: Charm · Crush 仓库 README
    url: https://github.com/charmbracelet/crush
    kind: repo

  - label: Charm · Crush 官方配置文档（docs/config：Bash 配置、permissions allow/deny、
    auto-summarize、context-path、provider/model add、本地模型）
    url: https://github.com/charmbracelet/crush/blob/main/docs/config/README.md
    kind: docs

  - label: Charm · Catwalk 官方 provider/model 目录（README 指明的默认清单来源）
    url: https://github.com/charmbracelet/catwalk
    kind: repo

  - label: Charm · Crush Releases
    url: https://github.com/charmbracelet/crush/releases
    kind: changelog

  - label: Charm · Crush Commits
    url: https://github.com/charmbracelet/crush/commits/main
    kind: changelog

  - label: Charm · Crush 官网
    url: https://charm.land/crush/
    kind: docs

link:
  url: https://github.com/charmbracelet/crush
  kind: official

last_verified: 2026-09-29
last_updated: 2026-09-29
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

**crush 是 Charm 生态出品的 TUI 编码 agent，在终端里跑。**
它的 MCP 三种传输方式标注最完整，并带一个官方订阅方案 Hyper。

## 变更记录说明

| 版本 | 日期 |
|---|---|
| `nightly` | 2026-09-29 |

**它和 Gemini CLI 一样，采用 nightly 滚动发布。**
引用版本号时要注意：nightly 的内容每天都在变。

## 官方 provider：Hyper

官方 README 原文：

> "Hyper, from Charm, is the official Crush provider. It's subscription-based"

**这是本分区唯一有厂商自营订阅方案的条目。**
其他工具要么只给自家模型，要么纯 BYOK。

所以成本模型有两种并存：

| 方式 | 说明 |
|---|---|
| Hyper 订阅 | Charm 官方运营，按订阅计费（报价见官方页，本站按 D9 口径不存） |
| 自带 key | 接 Anthropic / OpenAI 等，费用自付 |

**未知**：Hyper 官方称带免费层，但其档位与额度数值本次未核验，记为未知。

## MCP：三种传输方式写清楚了

官方 README 原文：

> "Extensible: add capabilities via MCPs (http, stdio, and sse)"

**这一条值得单独记一笔。**
多数工具只写「支持 MCP」，Crush 直接列出了三种传输方式。

对照工具分区自己的观察：不少 reference server **只支持 stdio**。它们不支持远程传输。
所以一个明确支持 http 的 CLI 工具，扩展兼容面实际上比想象中大。

## 许可状态需要提醒

GitHub API 返回的许可证字段是 **`NOASSERTION`**，也就是无法识别。
它不是 MIT，也不是 Apache-2.0。

**这意味着：**

- 不能假设可以商用
- 不能假设可以闭源分发
- 引用前须自行查看仓库内的 LICENSE 文件确认

**这属于「未知」，按本站方法论必须标注。**

## 权限定级说明

本条目 `confidence: partial` 的原因：

- ✅ 已核验：仓库、star 数（28,350）、最新 release（nightly）与日期、MCP 三种传输、
  Hyper 官方 provider、自定义 provider 方式、安装方式；**A6.2 本轮补**：
  完整 provider 清单与本地模型、LSP 与上下文文件机制、auto-summarize、
  权限 allow/deny 与 `--yolo`、`crush serve` 本地后端边界

- ❌ 未核验：**许可证具体条款**、Hyper 免费层的具体额度

## 适合与不适合

这几类人适合用它：

- 喜欢 Charm 生态终端体验（TUI 审美与交互）的用户
- 需要明确 MCP 传输方式（http / stdio / sse 三种都支持）的人
- 想在官方订阅方案 Hyper 与自带 key 之间切换的人
- 想中途换模型又不丢上下文的人

**不适合**需要明确开源许可做二次分发的场景 ——
GitHub 识别为 NOASSERTION，条款未核验。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测**非 TTY 环境下的表现**。
这类 TUI 形态的终端工具在 CI 里常出问题。

## 未知项清单

- **许可证具体条款** —— GitHub 识别为 `NOASSERTION`
- Hyper 免费层的具体额度（报价见官方页，本站按 D9 口径不存）
- 索引算法与大仓库首次索引耗时（官方未说明，已查 README 与 docs/config）

## 相关条目

- [OpenCode](./opencode.md) — 同类多 provider 工具，也支持 MCP
- [Gemini CLI](./gemini-cli.md) — 同类工具，工程化更完整
