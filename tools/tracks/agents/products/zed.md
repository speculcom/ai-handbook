---
id: zed
track: ide
tasks: ["write-code"]
name: Zed
vendor: Zed Industries
homepage: https://zed.dev
mark: Z
accent: "#3AB7FF"

axes:
  model_access: >-
    **官方列出 5 条模型接入路径**（docs/src/ai/llm-providers.md）：

    - Zed-Hosted Models —— 经 Zed 计费
    - API Access —— 用自己的 provider 额度，含 Anthropic 兼容与 OpenAI 兼容两种
    - Existing Subscription —— 复用已付费的 ChatGPT / Claude / Copilot 等
    - Gateway —— 经 OpenRouter / Bedrock / Vercel 等网关路由
    - **Local Model** —— 本地运行或自托管

    **路径选择由用户决定，不是绑定的单一供应商。** `llm-providers.md` 逐条列明这五条。
  runtime: >-
    **本地桌面应用，用 Rust 写。**

    官方自述来自 Atom 与 Tree-sitter 的创造者，主打性能与多人协作。

    **核验记录**：文档含 `dev-containers.md`（开发容器）。
    另有 `toolchains.md`（工具链管理）一页。

    关闭应用即停止。
  local_files: >-
    直接读写工作区，**支持多根目录（multi-root）**。

    也可经 SSH / WSL 打开远端文件夹，即 remote development。

    文件树扫描由 `file_scan_exclusions` 与 `project_panel.hide_gitignore` 控制。
    符号能力来自 Tree-sitter 解析与语言服务器（LSP）。
    编辑预测另有独立 provider。

    Agent 内置检索是四种：grep（正则）、find_path（glob）、list_directory、read_file。

    **官方未见代码库向量化语义索引**（已查 Tools 页）。

    **大仓库的限制官方有明说**：
    一次打开 >100,000 文件的超大目录表现不佳。
    官方建议只开具体项目或子目录（remote development 页）。
  background: >-
    本地桌面应用。agent 线程在本地进程内跑。
    远端主机可以是自建的 SSH / WSL 主机。

    **绑定客户端在线。**
    线程运行时，Zed 会请求系统不要休眠。
    这样可以保住长回合（`agent.prevent_idle_sleep`）。

    remote development 把语言服务器、任务与终端放到**你自己的远端服务器**。
    官方注明 **v0.157 起不再经 Zed 服务器中转**。

    **官方未见「关机后续跑 / 厂商托管后台任务」类能力**（已查 Agent Panel 页）。
  tools: >-
    **明确支持 MCP。**

    官方文档 `mcp.md` 列明当前支持 **Tools 与 Prompts** 两类特性。
    Discovery / Sampling / Elicitation 尚未覆盖，官方欢迎贡献。

    另处理 `notifications/tools/list_changed`——server 运行时增删改工具时，
    Zed 自动重载列表，无需重启 server。

    MCP 有两种接入方式：

    - 作为 extension 安装
    - 在 Settings → AI → MCP Servers 里添加本地 / 远程 server

    官方列出的热门 extension server：Context7、GitHub、Puppeteer、Gem、
    Brave Search、Framelink Figma、Resend 等。
  context: >-
    **Zed Agent 的上下文由 instructions + skills + MCP 组合而成**（见 agents.md 的 Zed Agent 行）。

    **压缩策略**：官方称线程接近阈值时自动 compact。
    默认 90% 触发（`agent.auto_compact`）。
    它把较早消息摘要后替换进模型上下文。
    线程显示 "Context Compacted"，可展开。

    也可 `/compact` 手动压缩。
    阈值可配：百分比 / 正 token / 负剩余 token。

    模型窗口太小（<80000 tokens）时自动压缩失效。
    官方提示用 New From Summary 新开线程。

    @-mention 可加文件、目录、符号、历史线程、skills、diagnostics、分支 diff 与 URL。

    另支持并行多线程（各自上下文窗口）与 Checkpoints 逐消息回滚。
  permissions: >-
    **工具权限由 Zed 官方配置控制**（`tool-permissions` 页，v0.224.0+ 起由
    `agent.tool_permissions.default` 控制）。

    三档取值是 `"allow"` / `"deny"` / `"confirm"`，default 默认 confirm。
    可按工具配正则模式：`always_allow` / `always_deny` / `always_confirm`。

    优先级：always_deny > always_confirm > always_allow > 工具 default > 全局 default。

    另有硬编码安全规则（`rm -rf /`、`rm -rf ~` 等），**不可覆盖**。

    受管控工具含：

    - terminal、edit_file、write_file
    - delete_path、move_path、copy_path、create_directory
    - fetch、search_web、skill
    - MCP（`mcp:<server>:<tool>`）

    **另有 OS 级沙箱**（`sandboxing` 页）：仅 Zed Agent，覆盖 `terminal` 与 `fetch`，
    默认限制项目外写入与出网。

    **权限边界跟随 agent path**（agents.md）：

    - Zed Agent —— 用 Zed 配置的 provider 与原生工具
    - External Agents —— 用 ACP agent 进程自己的 auth/config
    - Terminal Threads —— 用原生 CLI 的 auth/config

    隐私：官方称 Zed 不存 prompt 与代码上下文，遥测可关。
  fit: >-
    适合重视编辑器性能（Rust）、解析准确度（Tree-sitter）与多人协作的场景。

    **也适合想在一个编辑器里混用多种 CLI Agent 的用户**
    —— Claude / Codex / OpenCode / Copilot / Cursor 都能挂。

    这是 Zed 最独特的价值：它是 agent 的**编排层**，不是单一 agent。

    不适合把「编辑器自带 AI」当唯一卖点去找的用户 —— Zed 的定位是编排层。

    也不适合需要实测才知道大仓库表现的人 —— 索引策略官方未公开说明。

pitfalls:
  - 把 Zed 当成又一个 AI 编码工具，它实际是「三种 agent path 的编排层」，能用 Claude / Codex / OpenCode / Cursor
  - 以为模型是绑定的，实际有 5 条接入路径，含本地模型与复用现有订阅
  - 选了 External Agent 后以为权限由 Zed 管，实际由那个 agent 自己的 auth/config 决定

tags: [编程, IDE, 本地, 协作]
related: [filesystem]

sources:
  - label: Zed · LLM Providers（五条模型接入路径）
    url: https://zed.dev/docs/ai/llm-providers
    kind: docs

  - label: Zed · Agents（三类 agent path 对比）
    url: https://zed.dev/docs/ai/agents
    kind: docs

  - label: Zed · MCP（支持的协议特性与三种 agent path 的 MCP 行为）
    url: https://zed.dev/docs/ai/mcp
    kind: docs

  - label: Zed · Releases（v1.21.0 @ 2026-09-23）
    url: https://github.com/zed-industries/zed/releases
    kind: changelog

  - label: Zed · 仓库
    url: https://github.com/zed-industries/zed
    kind: repo

  - label: Zed · 文档站
    url: https://zed.dev/docs
    kind: docs

  - label: Zed · Agent Panel（线程、checkpoints、自动压缩、@-mention、token 用量）
    url: https://zed.dev/docs/ai/agent-panel
    kind: docs

  - label: Zed · Tool Permissions（allow/deny/confirm、正则模式、内置安全规则）
    url: https://zed.dev/docs/ai/tool-permissions
    kind: docs

  - label: Zed · Agent Sandboxing（仅 Zed Agent、terminal/fetch、默认项目外写入与出网受限）
    url: https://zed.dev/docs/ai/sandboxing
    kind: docs

  - label: Zed · Tools（内置 read/search/edit/terminal 工具清单）
    url: https://zed.dev/docs/ai/tools
    kind: docs

  - label: Zed · Remote Development（远端 SSH server、v0.157 起不经 Zed 中转、大目录限制）
    url: https://zed.dev/docs/remote-development
    kind: docs

link:
  url: https://zed.dev
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

**不是「又一个 AI 编码工具」，而是三种 agent path 的编排层** —— 能在同一个编辑器里用 Zed 原生 Agent，也能挂 Claude / Codex / OpenCode / Copilot / Cursor。

## 最重要的发现：Zed 自己就用「harness」这个词

**官方 `agents.md` 把「agent path」和「harness」当成同一件事。**

**官方原文**："An agent path is sometimes called **a harness**. It is the way agentic work is started, displayed, configured, and controlled in Zed."

**这句话把 AgentClash 的「Harness 章节」落到了产品文档里。**
Agent 产品对比和 Harness 对比不是两件事。
AgentClash 区分它们，是因为它们落在不同的层。
而 Zed 明确说**「agent path 有时也叫 harness」**。

## 三类 agent path（官方表格原文）

| Agent path | 运行在 | 用什么 | 适合 |
|---|---|---|---|
| **Zed Agent** | Agent Panel + Threads 侧栏 | Zed 配置的 LLM provider、原生工具、skills、instructions、MCP | 想要 Zed 的原生集成 |
| **External Agents** | Agent Panel + Threads 侧栏 | **ACP agent 进程及其自己的 auth/config** | 想用 Claude、Codex、OpenCode、Copilot、Cursor、Pi 等 |
| **Terminal Threads** | Threads 侧栏 + 终端 | **原生 CLI / TUI 的 auth/config** | 想保留该工具的命令行体验 |

**这张表的信息量很大**：

- External Agents 明确支持 **Claude、Codex、OpenCode、Copilot、Cursor** —— 都是本仓库收录的对象
- **权限由谁决定，看第二、三列** —— 选了 External Agent，auth/config 就是那个 agent 的
- Zed 把自己定位成「怎么启动、显示、配置、控制 agent」的那一层

## 五条模型接入路径（这个分区独一份）

| 路径 | 适合 | 真相源 |
|---|---|---|
| **Zed-Hosted Models** | 想让 Zed 代计费 | Account & Billing |
| **API Access** | 已有 provider 额度 | 含 Anthropic 兼容 / OpenAI 兼容 |
| **Existing Subscription** | **已经付了 ChatGPT / Claude / Copilot** | 复用订阅 |
| **Gateway** | 经 OpenRouter / Bedrock / Vercel 路由 | 网关配置 |
| **Local Model** | **本地跑或自托管** | 本地配置 |

**第 3 条和第 5 条是差异化**：

- 复用已有订阅 = 边际成本可以是 0
- 本地模型 = 数据完全不出机器

**另一条重要区分，官方明确**：

**官方原文**："Model access paths do not configure External Agents or Terminal Threads. External Agents and Terminal Threads usually own their own model access, auth, and configuration."

**即：Zed 的模型设置管不到外部 agent。** 这是很容易误解的点。

## MCP 支持的确切范围

| 项目 | 状态 |
|---|---|
| **Tools** | ✅ 支持 |
| **Prompts** | ✅ 支持 |
| Discovery / Sampling / Elicitation | ❌ 尚未覆盖（官方欢迎贡献） |
| `notifications/tools/list_changed` | ✅ 处理——server 运行时改工具列表会**自动重载，无需重启** |

**两种接入方式**：

1. 作为 **extension** 安装（官方列了 Context7 / GitHub / Puppeteer / Gem / Brave Search / Figma / Resend 等）
2. 在 **Settings → AI → MCP Servers** 里添加本地或远程 server

**三种 agent path 的 MCP 行为不同**：

| agent path | MCP 行为 |
|---|---|
| Zed Agent | 直接用 Zed 配置的 MCP server |
| External Agents | Zed **可通过 ACP 转发**已配置的 server；agent 也可读自己的原生 MCP 配置 |
| Terminal Threads | **原生 CLI/TUI 读自己的 MCP 配置** |

## 适合与不适合

**适合**重视编辑器性能（Rust）、解析准确度（Tree-sitter）与多人协作的场景。

**也适合**想在一个编辑器里混用原生 Agent 与外部 CLI Agent 的用户。
这是它最独特的价值。

**不适合**把「编辑器自带 AI」当唯一卖点去找的用户。
Zed 的定位是 agent 的编排层，不是「我自带一个模型」。

也**不适合**需要实测才知道大仓库表现的人 —— 索引策略官方未公开说明。

## 与本站其他站点的关系

Zed 的 External Agents 直接涉及本仓库收录的多个对象：

| Zed 里的 agent path | 对应本仓库条目 |
|---|---|
| External Agents 列表 | [Claude Code](./claude-code.md) · [Codex IDE](./codex-ide.md) · [Cline](./cline.md) · [Copilot](./copilot.md) · [Cursor](./cursor.md) |
| Terminal Threads | 本仓库 [agents 分区](../_track.md) 的 CLI 形态对象 |
| MCP 扩展 | [tools 分区](../../tools/_track.md) |

**这意味着 Zed 是本仓库的交叉点。**
agents 分区两种形态（IDE 扩展 / 终端）与 tools 分区（MCP 扩展）的边界，它画得最清。

## 采集限制（诚实说明）

**本次从 `zed-industries/zed` 仓库的 `docs/src/ai/` 逐篇读取官方文档。**
八维已全部核到官方机制。
含模型接入 5 路径、工具权限与 OS 级沙箱、自动压缩、MCP、多根与远端开发。

**仍未核验**（官方未给或需实测）：

- 三类 agent path 在「客户端关闭后」的实际行为

Zed Agent 已知绑定客户端在线。
External / Terminal 取决于所挂 agent 自己的配置。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：这个工具的实测重点应是**混合 agent 场景**。
比如在 Zed 里挂 Claude Code 做 T01 任务，与直接用 Claude Code CLI 对比。
要验证的是：「编排层 + 外部 agent」是否比纯 CLI 更顺手，还是只多一层壳。

## 未知项清单

- 三类 agent path 在「客户端关闭后」的实际行为

Zed Agent 已知绑定客户端在线。
External / Terminal 取决于所挂 agent。

## 相关条目

- [Cline](./cline.md) — 同为三形态覆盖，但形态是 Zed Agent / 外部 / 终端而非编辑器扩展
- [Claude Code](./claude-code.md) — 可作为 Zed 的 External Agent 运行
- [Aider](./aider.md) — 同属「编辑器外挂 watch 模式」思路
