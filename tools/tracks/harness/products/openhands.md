---
id: openhands
track: harness
tasks: ["long-task"]
family: general-harness
name: OpenHands Agent Canvas
vendor: OpenHands（All-Hands-AI）
homepage: https://openhands.dev
mark: OH
accent: "#F97316"
stars: 89675
license: MIT
latest_version: 1.24.0
language: TypeScript（前端/编排） + Python（Agent Server）

# 支持哪些模型 provider（本站第一决策点）
providers:
  - 官方称「Bring your own model — Use with any LLM」（README 特性表原文）
  - 支持 LLM profiles 多配置并存（官方文档 llm-settings#llm-profiles）
  - 具体清单（官方 llm-settings 页，2026-10-08）：原文 "any model that is supported by litellm"，本地模型经 LiteLLM 接

layer_position: >-
  **它是本站收录的第一个「平台型」对象：一个带 Web UI 的自托管控制中心，不是 SDK。**

  官方 README 现在把标题叫 **Agent Canvas**。
  它能跑的不只是 OpenHands 自己的 agent —— 这是它最容易被看错的地方。

  **它位于别的 agent 之上，做调度。** 你说的 Codex SDK、Claude Agent SDK，
  它都声明能跑，所以它不是它们的竞品。

  按本站三种形态分类，它属于**第 3 类：自带完整运行时**（含 Web UI、REST API、多后端调度）。

  **真正的编程入口不在本仓。** 架构上是三个仓协作，本仓只是前端控制中心：

  - `OpenHands/OpenHands`（本仓）= 前端控制中心 + 后端选择 + 本地栈编排
  - `OpenHands/software-agent-sdk`（Python，MIT，1,190★）= Agent Server、agents、
    tools、conversations

  - `OpenHands/automation`（Python，MIT，32★）= 定时与 webhook 分发

  **本站收录主仓**（星数与社区在这），但**主仓的星数不是 SDK 的星数** —— 见下方 pitfalls。

  > README 首屏标题原文："The self-hosted developer control center for coding agents and automations."
  >
  > README 原文："Run OpenHands, Claude Code, Codex, Gemini, or **any ACP-compatible agent**
  > across local, remote, and cloud backends."
  >
  > ⚠ 认知落差：仓库名与 description 仍是 OpenHands / "AI-Driven Development"，
  > 但 README 首屏标题已改成 Agent Canvas。选型时容易踩。
  >
  > Repository boundaries 表由官方 README 原文列出，本档逐字记录。

axes:
  model_access: >-
    **官方口径：任何 LiteLLM 支持的模型都能接，它自己带 LiteLLM 网关层（已核验）。**

    **已验证可用的 provider**（Basic 设置下拉里能选）：

    - OpenHands provider
    - Anthropic
    - OpenAI
    - Mistral AI

    **Custom Model 怎么写**：用 provider 前缀指定，遵循 LiteLLM 的 provider 规范；
    另有 `Base URL` 可自定义，本地与自托管模型由此接入。
    官方说保存 local LLM profile 时会先向后端校验。

    **LLM profiles**：最多 10 套配置并存。可在会话中或 `/model` 切换。
    也可由内置 `SwitchLLMTool` 让 agent 动态选型。

    ⚠ **两处官方未给出**。一是完整 provider 名单。二是「any LLM」的对齐度数据。
    即它在工具调用与 structured output 上是否对齐。核验范围：llm-settings 页。

    **这一项对该对象尤其重要**：它同时是别人的调度层。
    **「Codex / Claude Code 跑在它上面」**这一情况比较特殊。能用哪些模型由那个 agent 决定。

    **官方 LLM settings 页原文**："This can be any model that is supported by litellm"
  runtime: >-
    **它有四种官方部署形态**。这是本对象最有实用价值的部分。README 四个 Option 全核验。

    - **Option 1 无沙箱本地跑**：`npm install -g @openhands/agent-canvas` 然后
      `agent-canvas`，起完整本地栈，**要 Node.js 24+ 与 uv**；
      可用 `--frontend-only` / `--backend-only` 拆开跑

    - **Option 2 Docker 沙箱**：`docker run` 官方镜像，
      需预先准备 `PROJECTS_PATH` 宿主目录，agent 可访问该目录下的项目

    - **Option 3 每会话独立容器**：`OH_CONVERSATION_RUNTIME=docker agent-canvas`，
      每次新会话起自己的容器与 Agent Server，适合并发跑多个 agent

    - **Option 4 从源码跑**：clone + `npm install` + `npm run dev`

    **入口地址**：`http://localhost:8000`（Docker 镜像是 `/canvas`）。

    **后端可以远程切换**，这是它作为调度层的核心能力：官方说 Agent Server
    可跑在笔记本 / Mac Mini / 云上 VM / OpenHands Cloud，
    Canvas 前端可以在多个 Server 之间切换。

    关于 Option 3 的官方说明。容器会挂载会话的 workspace 与持久化状态。
    **容器替换后文件与对话历史仍在**。
  local_files: >-
    **本地文件能碰多少，取决于你选哪种部署形态 —— 官方把这个变量讲得很清楚。**

    - **无沙箱形态**：agent 对文件系统有全量访问权限，官方两次打 WARNING
    - **Docker 形态**：访问范围收敛到 `PROJECTS_PATH` 挂载的目录
    - **每会话容器形态**：官方提示**共享同一宿主工作区的会话仍会共用同一批文件**，
      建议用独立目录或 worktree 避免冲突编辑

    - **后端远程时**（云上 VM / Cloud backend）：agent 在远端 workspace 里跑，
      SDK 用 `Workspace(host=..., working_dir="workspace/project")` 指定远端工作目录，
      文件与命令操作都在服务端执行

    **官方未说明「把本地仓库自动同步到远程后端」的机制**（已查 agent-server 与 runtime 页）——
    仓库需先位于远端，或自行搬运。

    **官方 WARNING 原文**："This runs the agent-server directly on the machine you're installing on —
    **the agent will have full access to your filesystem!**"
  background: >-
    **后台任务是它最突出的强项，也是它与其他 harness 站对象最大的差别。**

    把 agent 跑在云上服务器的最大好处有两个。一是关掉笔记本它还在跑。
    二是更容易被第三方服务触发。比如 Slack、GitHub 或 Datadog。

    配套是独立仓 `OpenHands/automation`，提供两种触发方式：

    - 定时（schedule）
    - webhook 事件

    官方特性表列了可集成的第三方。它们是 Slack、GitHub、Linear 与 Notion。

    **对比本站其余对象**：OpenAI Agents SDK、Deep Agents、Codex SDK 的 thread 状态
    都在自己进程 / 自己机器上，关了就没了。
    把「关掉笔记本后 agent 仍在跑」当卖点做的，只有这一个。

    **官方 README 原文**：it "allows your agents to **continue running even when your laptop is shut**"
    
    同一页亦点名 Slack、GitHub、Datadog 是更容易接入的触发渠道。
    
    核验 `OpenHands/automation`（2026-10-01）：Python，MIT，32★，活跃。
  tools: >-
    **它有两条接入线：自身工具集 + MCP；另有 ACP 用来调度第三方 agent。**

    ① **自带 agent（CodeAct / software-agent-sdk）的默认工具集**，
    官方 start-conversation API 示例列出：

    - `terminal`
    - `file_editor`
    - `task_tracker`
    - `browser_tool_set`（`cli_mode` 可关掉浏览器工具）

    ② **MCP 支持已核验**，官方有 MCP Servers 专页：

    - CLI 用 `openhands mcp`，Canvas 用 `Customize > MCP Servers`
    - 传输覆盖 http / sse / stdio
    - 认证支持 Bearer / API Key / OAuth
    - SDK 侧由 `mcp_config`（FastMCP 格式）注入 `mcpServers`

    ③ 通过 **ACP（Agent Client Protocol）** 调度第三方 agent
    （Claude Code、Codex、Gemini 等）。

    **⚠ 修正上一版档案**：本对象**并非只走 ACP** —— MCP 同样是官方能力。
  context: >-
    **上下文这一点，官方有明确机制：context condenser**。本维度证据已补齐。

    默认实现是 `LLMSummarizingCondenser`（继承 `RollingCondenser`），
    参数 `max_size` / `keep_first`。它超阈值时**保留最近的消息不动，只摘要较早的内容**。

    Canvas 侧的入口在 `Settings > Condenser`；
    LLM settings 页有 "Enable memory condensation" 与
    **"Memory condenser max history size"** 两个开关。

    官方还说明。配了 condenser 之后，超窗改为发 condensation 请求事件。
    而不再抛 `LLMContextWindowExceedError`。agent 摘要旧历史后继续。

    **⚠ 按本站「状态 ≠ 上下文」的口径**。run history 与容器可替换后的持久化属于状态侧。
    上面的 condenser 才是上下文侧的官方手段。两者分开算。

    **官方 SDK 指南原文**：context condenser "intelligently summarizing older
    parts of the conversation while preserving essential information"；
    超阈值时 "Keeps recent messages intact"、"Summarizes older content"。
  permissions: >-
    **这一块官方做得最细，也是最需要认真读的部分。**

    **沙箱**：官方给了两种收敛手段（见 local_files）。一是 Docker 沙箱，二是每会话独立容器。
    但官方同时明确提供无沙箱形态，并两次挂 WARNING。

    **认证用的是 API key，不是用户体系**：

    - 生成 key：`openssl rand -base64 32`，赋给 `LOCAL_BACKEND_API_KEY`
    - `--public` 模式下 **key 不烘进前端**，用户首次打开 UI 要手动粘贴 key 才能用；
      之后每个 `/api/*` 请求都要带 `X-Session-API-Key` 头

    - **默认绑定 loopback-only**（127.0.0.1）。官方说明这是为了让自动注入的 session key
      不被局域网其他机器拿到

    - 要监听 `0.0.0.0` 时 key 不再注入，改用同样的 API-key 输入界面
    - 官方提醒用 `export` 而不是命令行参数传 key，
      避免出现在 `ps aux` 进程列表里

    - **暴露到公网时官方另有防火墙要求**（Cloud Firewall / AWS Security Group / GCP firewall rule）

    **⚠ 多用户与权限分级，官方把这一档划给 Enterprise。**
    官方部署对比表明示 Open Source 档「Users = 1」，
    **Multi-user RBAC 与 SSO/SAML 只有 Enterprise 有**（OSS 栏为「—」）。

    因此 OSS 自托管不含用户 / 角色 / 审计体系。上面那把会话 key 就是全部。
    需要多用户分级与审计，须上 Enterprise。

    `docs/SELF_HOSTING.md`（核验 286 行）给的就是这套 API key 机制。
    
    **核验**：已查 enterprise 页与部署对比表。
  fit: >-
    **能做的事**：

    - 把 agent 放到自己服务器上 7×24 跑
    - 定时或 webhook 触发（Slack / GitHub / Linear / Notion）
    - 用一个界面统管多种 agent（含 Codex、Claude Code、Gemini 等 ACP 兼容的）
    - 需要 per-conversation 隔离容器
    - 团队里前端 / 平台与 agent 运行时分离部署
    - 长会话需要官方 condenser 控制上下文成本

    **不适合做的事**：

    - 只想要一个轻量库，把 agent 嵌进自己的 Python 进程
      （那种需求请用 software-agent-sdk 或 OpenAI Agents SDK）

    - 单机临时用一下 —— 它是一整套栈，不是库
    - 需要多用户与细粒度权限分级 —— 官方把 Multi-user RBAC 划给 Enterprise，
      OSS 自托管只有单 key

pitfalls:
  - 以为是 Python SDK —— **主仓是 TypeScript 的 Web 控制中心**；编程入口在 `OpenHands/software-agent-sdk`（另 1,190★）
  - 看仓库名与 description 以为是「AI 驱动的软件开发工具」 —— **README 首屏标题已是 Agent Canvas**，定位是控制中心
  - 以为它是 Codex SDK / Claude Agent SDK 的竞品 —— **它是它们的调度层**（README 明确说能跑这些 agent）
  - 直接跑 Option 1 就上线 —— 官方在该选项上打 WARNING：agent 对你的文件系统有全量访问权限
  - 把 `--public` 模式理解成「更方便」—— 它是**不把 key 烘进前端**的防护手段，用于非本机访问
  - 以为「有 run history」就等于「有上下文管理」—— 前者是状态；后者有独立机制（LLMSummarizingCondenser / RollingCondenser）
  - 以为它只用 ACP、不支持 MCP —— 官方 MCP Servers 专页写明 CLI 与 Canvas 均可配（http / sse / stdio + Bearer / API Key / OAuth）；ACP 是调度第三方 agent 的另一条线

tags: [TypeScript, Python, 开源, MIT, 自托管, 平台型, WebUI, 调度层, ACP, 沙箱, 定时任务, webhook, 多后端]
related: [opencode, filesystem]

sources:
  - label: OpenHands/OpenHands · 仓库（Agent Canvas 控制中心，89,675★，MIT，核验 2026-10-01）
    url: https://github.com/OpenHands/OpenHands
    kind: repo

  - label: 主README（Agent Canvas 定位、四种部署形态、ACP 接入、Repository boundaries 表）
    url: https://github.com/OpenHands/OpenHands/blob/main/README.md
    kind: docs

  - label: docs/SELF_HOSTING.md（API key、--public 模式、loopback 默认、防火墙要求）
    url: https://github.com/OpenHands/OpenHands/blob/main/docs/SELF_HOSTING.md
    kind: docs

  - label: 官方定价页（核验 2026-10-01：Open Source 与 Cloud Individual 均为免费档、Enterprise 定制；**Individual Max Daily Conversations = 10** 而 Open Source 为 Unlimited；BYOK 与 "at cost, with no markup"；Enterprise 可部署客户自有 VPC、SAML/SSO、RBAC、每用户无限并发）
    url: https://www.all-hands.dev/pricing
    kind: pricing

  - label: OpenHands/software-agent-sdk · 仓库（Python SDK 与 Agent Server 的真实所在，1,190★，MIT）
    url: https://github.com/OpenHands/software-agent-sdk
    kind: repo

  - label: OpenHands/automation · 仓库（定时与 webhook 分发，32★，MIT）
    url: https://github.com/OpenHands/automation
    kind: repo

  - label: Releases（v1.24.0 @ 2026-09-25）
    url: https://github.com/OpenHands/OpenHands/releases
    kind: changelog

  - label: 官方文档 · LLM settings / LLM profiles（any model supported by litellm、已验证 provider、最多 10 profiles、memory condensation，核验 2026-10-08）
    url: https://docs.openhands.dev/openhands/usage/settings/llm-settings
    kind: docs

  - label: 官方文档 · Context Condenser（SDK 指南：LLMSummarizingCondenser / RollingCondenser，核验 2026-10-08）
    url: https://docs.openhands.dev/sdk/guides/context-condenser
    kind: docs

  - label: 官方文档 · Runtime Architecture（Docker 沙箱、volume mounts、RemoteRuntime，核验 2026-10-08）
    url: https://docs.openhands.dev/openhands/usage/architecture/runtime
    kind: docs

  - label: 官方文档 · MCP Servers（CLI/Canvas 配置、http/sse/stdio 传输与认证，核验 2026-10-08）
    url: https://docs.openhands.dev/openhands/usage/cli/mcp-servers
    kind: docs

  - label: 官方文档 · Agent Server Package（远程 workspace、working_dir、session API key，核验 2026-10-08）
    url: https://docs.openhands.dev/sdk/arch/agent-server
    kind: docs

  - label: 官方文档 · OpenHands Enterprise vs OSS 部署对比表（Multi-user RBAC / SSO-SAML 仅 Enterprise，OSS Users = 1，核验 2026-10-08）
    url: https://docs.openhands.dev/enterprise
    kind: docs

  - label: 官方文档 · ACP Agents（README 指向）
    url: https://docs.openhands.dev/openhands/usage/agent-canvas/acp-agents
    kind: docs

  - label: npm 包@openhands/agent-canvas（README 安装入口）
    url: https://www.npmjs.com/package/@openhands/agent-canvas
    kind: repo

link:
  url: https://openhands.dev
  kind: official

last_verified: 2026-10-01
last_updated: 2026-10-01
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

**它是个自托管的 agent 控制中心**。官方 README 现在管它叫 **Agent Canvas**。

它带的是一整套栈：Web GUI、Terminal UI、CLI、REST API 都在里面。
它管的 agent 不止自家那一个。Codex、Claude Code、Gemini 都能挂上去跑。

> 官方定位原文：The self-hosted developer control center for coding agents and automations.
> Run OpenHands, Claude Code, Codex, Gemini, or **any ACP-compatible agent**
> across local, remote, and cloud backends.

## 形态澄清：这不是 SDK，是平台，而且它在别人之上

本站三种编程底座形态里，它属于第 3 类 **自带完整运行时**，
而且是其中**唯一带 Web UI 的一个**。

### 三个容易踩的认知落差

**① 主品牌已改成 Agent Canvas，但仓库名没变。**

它现在的定位是 **control center（控制中心）**。它不再写作「一个开发工具」。
仓库 description 却还是老样子。

> 仓库 description 原文："🙌 OpenHands: AI-Driven Development"；
> README 首屏标题已是 Agent Canvas。

**② 它能跑的不只是 OpenHands 自己的 agent。**

官方列了四种，并留了一个开放条件。

> README 原文："OpenHands, Claude Code, Codex, Gemini, or any ACP-compatible agent"

**它不是本站收录的 Codex SDK 或 Claude Agent SDK 的竞品**。它们是调度层与被调度者的关系。

所以选型问题不是「选它还是选 Codex」，而是「要不要一个界面来统管
Codex / Claude Code / Gemini」。

**③ 真正的编程入口在另一个仓。**

下面是官方给出的三仓分工，来源是这张表：

> 官方有一张 Repository boundaries 表，本档逐字记录。

| 仓库 | 职责 | 核验（2026-10-01） |
|---|---|---|
| `OpenHands/OpenHands` | 前端控制中心、后端选择、本地栈编排 | 89,675★ · MIT · TypeScript |
| `OpenHands/software-agent-sdk` | **Python SDK、Agent Server、agents、tools、conversations、workspaces、events** | 1,190★ · MIT · Python |
| `OpenHands/automation` | 定时调度、webhook、run history、分发 | 32★ · MIT · Python |

> ⚠ **89,675★ 是控制中心的星数，不是 SDK 的星数**。
> 如果你要的是「嵌进自己 Python 进程的 SDK」，那对象是 `software-agent-sdk`（1,190★），
> 不是本条目。
> **本站本次未单独收录它** —— 见下方实测建议第 1 条。

## 档位：三档里两档是免费档，但「免费」有个硬上限

2026-10-01 核验官方定价页，结论可能与预期不同：**没有「付费个人档」。**
（报价按 D9 口径不存，见官方定价页。）

| 档位 | 部署 | 用户 | 每日对话 |
|---|---|---|---|
| **Open Source**（免费） | 本地 | 1 | **Unlimited** |
| **SaaS Individual**（免费） | 云端 | 1 | **10** |
| **Enterprise**（定制，Contact Us） | SaaS 或**客户自有 VPC** | Unlimited | Unlimited |

**① 最关键的一条落差：云端免费档每天只有 10 轮对话。**

官方对比表同一栏：Open Source = **Unlimited**，Individual = **10**，Enterprise = Unlimited。
**「免费」不等于「不限量」**。想不限量只有两条路：本地跑，或者上 Enterprise。

**② Individual 支持自带 key（BYOK）。**

没有 key 时可用 OpenHands LLM provider，可在 Settings > API 生成 API key，
供 CLI / Local Web UI / Software Agent SDK 使用。
官方强调它按成本价、零加价、按量付费。

**官方没有公开实际单价表**，只能确认官方声明不加价（本站按 D9 口径也不存报价）。

> 官方 FAQ 原文：Open Source 与 Cloud 各档都支持自带 LLM key；
> 无 key 时走 OpenHands provider，官方强调 "**at cost, with no markup**"。

**③ Individual 还有一批 OSS 档没有的东西**。
它们包括云端访问（桌面 + 移动端）与 Cloud API（用于自动化与脚本）。
还有 Jira 与 Slack 集成、Secrets、组织支持。

**④ Enterprise 实际是另一套东西，不是「多几个用户」**：

- 可部署在**客户自有 VPC**
- Enterprise SAML/SSO、多用户 RBAC
- 集中团队账单
- **每用户无限并发会话**
- Large Codebase SDK
- **Named Customer Engineer + 共享 Slack 频道 + 优先支持**

报价需联系销售。

## 四种部署形态：这是本对象最实用的部分

四个 Option 全部核验：

> 核验来源：官方 README 的 Quickstart 四个 Option。

| 形态 | 命令要点 | 沙箱 | 要Node 24+/uv？ |
|---|---|---|---|
| **① 无沙箱本地** | `npm i -g @openhands/agent-canvas` → `agent-canvas` | ❌ 无 | 是 |
| **② Docker 沙箱** | `docker run ... ghcr.io/openhands/agent-canvas:1.24.0` | ✅收敛到 `PROJECTS_PATH` | 否 |
| **③ 每会话独立容器** | `OH_CONVERSATION_RUNTIME=docker agent-canvas` | ✅每会话隔离 | 是 + Docker |
| **④ 从源码** | clone → `npm install` → `npm run dev` | ❌ 无 | 是 |

**① 和 ④ 官方都挂了同一条 WARNING。**

> This runs the agent-server directly on the machine you're installing on —
> **the agent will have full access to your filesystem!**

**③ 适合并发**：每次新会话起自己的容器与 Agent Server。
官方特别说明容器会挂载会话的 workspace 与持久化状态。**容器替换后文件与对话历史仍在**。
这对本站关心的「可靠长期运行」是正面证据。

但官方也提醒：**用同一宿主工作区的会话仍会共用同一批文件**，
建议用独立目录或 worktree 避免冲突编辑。

## 背景任务：这是它最突出的强项

官方的说法很直接：
> The most powerful way to run OpenHands is on a server in the cloud.
> This allows your agents to **continue running even when your laptop is shut**,
> and makes it easier to trigger your agents through third-party services like
> Slack, GitHub, and Datadog.
配套是独立仓 `OpenHands/automation`。它提供两种触发方式：**定时**与 **webhook**。
官方特性表列了可集成的第三方。它们是 **Slack、GitHub、Linear、Notion**。

**对照本站其他对象**：OpenAI Agents SDK 的 session、Codex SDK 的 thread
都活在你自己进程 / 自己机器上，关掉就没了。
**把「关掉笔记本后 agent 仍在跑」当卖点做的，只有这个对象。**

> 核验 `OpenHands/automation`（2026-10-01）：Python · MIT · 32★ · 活跃。

## 权限与安全：官方做得细，但你要选对形态

关键设计是**API key 而非用户体系**。

| 机制 | 官方原文 / 参数 | 作用 |
|---|---|---|
| key 生成 | `openssl rand -base64 32` → `LOCAL_BACKEND_API_KEY` | 256 位 |
| `--public` 模式 | key **不烘进前端**，用户首次打开 UI 要粘贴 key | 防止 key 被前端代码泄露 |
| 请求头 | 每个 `/api/*` 都要带 `X-Session-API-Key` | 会话级鉴权 |
| 默认绑定 | **loopback-only（127.0.0.1）** | 官方说明：为了不让自动注入的 session key 被局域网其他机器拿到 |
| 监听全网卡 | `--host 0.0.0.0` 或 `OH_BIND_HOST` | 此时 key 不再注入，改用同样的输入界面 |
| 传 key 的姿势 | 用 `export` 而非命令行参数 | **避免出现在 `ps aux` 进程列表里** |
| 公网暴露 | 官方要求另配防火墙（Cloud Firewall / AWS SG / GCP firewall rule） | |

**多用户与权限分级已核（2026-10-08）**：正式的 RBAC / SSO 在 Enterprise 档，
OSS 档默认单用户、单会话 key。
**团队级使用需上 Enterprise，或自行在反代层做鉴权。**

> `docs/SELF_HOSTING.md`（核验 286 行）只覆盖「保护单个 key」；
> 官方 enterprise 页给出 RBAC / SSO 的归档。

## 上下文维度：官方给了 condenser（2026-10-08 更新）

这档对象持久化做得很好 —— run history、容器可替换后历史仍在。
**对话上下文长了之后的处理，也有官方机制**。它在 SDK 侧：context condenser。

按本站主张「**状态 ≠ 上下文**」：

- **状态** ✅ 有官方证据（定时/webhook 触发、run history、容器可替换后历史保留）
- **上下文** ✅ 有官方机制（condenser）；实际压缩效果待实测

**持久化 ≠ 上下文管理** —— 两者仍是两件事；但本对象现在能给出后者。

> 官方 sdk/guides 页给出 `LLMSummarizingCondenser` / `RollingCondenser`。

## 协议：MCP 与 ACP 各管一条线

两条线已核清（2026-10-08）。

**① MCP** —— 官方有 MCP Servers 专页：

- CLI 用 `openhands mcp`，Canvas 里也能配
- 传输覆盖 http / sse / stdio
- 认证支持 Bearer / API Key / OAuth
- 已有的 MCP server 生态可直接复用

**② ACP（Agent Client Protocol）** —— README 用它来调度第三方 agent
（"Run OpenHands, Claude Code, Codex, Gemini, or any ACP-compatible agent"）。

**修正上一版档案**：本对象并非只走 ACP，MCP 同样是官方能力。

## 适合与不适合

**适合**：agent 要放自己服务器 7×24 跑；需要定时/webhook 触发（Slack / GitHub / Linear / Notion）；
想一个界面统管 Codex / Claude Code / Gemini 等多种 agent；需要 per-conversation 容器隔离；
前端与运行时分离部署。

**不适合**：只想把 agent 嵌进自己的 Python 进程（用 software-agent-sdk 或 OpenAI Agents SDK）；
单机临时用一下（它是一整套栈）。需要细粒度多用户权限的也不行。RBAC / SSO 仅 Enterprise，OSS 档单用户。

## 核验说明

`confidence: partial` 的依据：

**为什么不是 verified**：并非缺轴。八维本轮均已核到官方机制（`context` 侧有官方
condenser，见 axes.context）。仍留 partial 是因为还存在**官方确实没写、或需实测**的项：

- context 压缩的端到端效果
- 本地→远端工作区的同步机制（官方未说明）
- ACP 与 MCP 的定位边界
- Enterprise 档的具体内容（官方只写 Custom pricing / Contact Us）

按 v3 铁律「未知就说未知」，故仍标 partial。

**已核验（这部分扎实）**：

- 仓库存在与星数（89,675）、许可（MIT，经 license API）
- 最近推送（2026-10-01，仍活跃）、最新版 **v1.24.0**（releases @ 2026-09-25）
- README 全文九节（定位、四项特性表、Quickstart 四种 Option、Architecture 与
  Repository boundaries 表、More documentation）

- `docs/SELF_HOSTING.md` 286 行的安全机制要点
- 仓库顶层目录结构（`helm/`、`vercel.json`、`electron-builder.config.mjs`、
  `.openhands/`、`docker/` 等）

- `software-agent-sdk` 与 `automation` 两仓元数据

> `software-agent-sdk`（1,190★ · MIT · Python）、`automation`（32★ · MIT · Python）。

**未核验**：

- 对话上下文压缩的实测效果
- 本地→远端工作区的同步机制（官方未说明）
- `software-agent-sdk` 的 API 形态
- LLM profiles 的完整配置格式（官方页有，细节未逐条录入）

**本轮（2026-10-01）补上的**：官方定价页三档已核实 ——
Open Source 与 Cloud Individual 均为免费档、Enterprise 定制；
**Individual 每日 10 轮对话上限**（对照 Open Source 的 Unlimited）；
Individual 支持 BYOK、无 key 时走 OpenHands provider 且官方声明 **at cost, no markup**；
Enterprise 可部署客户自有 VPC。还有 SAML/SSO、RBAC、每用户无限并发。
Enterprise 档的具体内容仍未核验（按 D9 口径本站也不存任何报价数字）。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按本对象形态定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | `software-agent-sdk` 单独用（不启 Canvas）能不能跑最小 agent | 决定你到底需不需要这一整套栈 |
| 2 | 长任务（跨天）condenser 的压缩效果与成本变化 | 机制已知（LLMSummarizingCondenser），压缩率需实测 |
| 3 | 每会话容器模式的**真实隔离强度**（同宿主工作区会共用文件这条要实测） | 官方已提示冲突风险 |
| 4 | Docker 形态下 agent 能否绕过 `PROJECTS_PATH` 触达宿主其他路径 | 沙箱有效性是选型前提 |
| 5 | 挂 Claude Code / Codex 作为 ACP agent 的实际接入成本 | 它最独特的卖点，值不值得取决于这个 |
| 6 | webhook 触发的幂等性与重复触发处理 | 定时/webhook 是它的主打场景 |

## 未知项清单

- 「any LLM」的 provider 能力对齐度（清单已核：原文 "any model that is supported by litellm"）
- 对话上下文压缩的端到端效果（机制已有官方 condenser，压缩率待实测）
- OSS 档多用户方式（正式 RBAC / SSO 在 Enterprise，OSS 默认单用户）
- ACP 与 MCP 的定位差异（两者都可用；边界官方未系统对比）
- **Enterprise 档的具体内容**（官方仅标 Custom pricing / Contact Us；报价按 D9 口径本站不采）
- Individual 每日 10 轮之外，超出后的行为（停用 / 提示升级 / 其它，官方页未写）
- 后端远程部署时本地代码库的同步机制
- `software-agent-sdk` 的 API 形态与版本独立节奏
- 每会话容器在并发压测下的资源与稳定性

## 相关条目

- [Codex SDK](./codex-sdk.md) — **调度关系，不是竞争关系**：README 明确 Agent Canvas 能跑 Codex。
  本档案讲的是「谁给你调度」，codex-sdk 讲的是「被调度的是什么」。

- [Claude Agent SDK](./claude-agent-sdk.md) — 同上，Claude Code 也是它声明可调度的 agent 之一。
- [Deep Agents](./deepagents.md) — 都是 batteries-included 那一档，
  但 deepagents 是一个库、OpenHands 是一整套带 Web UI 的栈。

- [LangGraph](./langgraph.md) — 若要的是「用代码定义流程」而非「用界面调度 agent」，
  编排框架才是对应层。
