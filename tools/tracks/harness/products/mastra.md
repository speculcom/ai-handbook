---
id: mastra
track: harness
tasks: ["build-agent"]
family: orchestration
name: Mastra
vendor: Mastra AI
homepage: https://mastra.ai
mark: MA
stars: 28639
license: 核心 Apache-2.0 + ee/ 目录 Mastra Enterprise License（仓库 license API 返回 NOASSERTION）
latest_version: 1.75.0
language: TypeScript

# 支持哪些模型 provider（本站第一决策点）
providers:
  - 官方 model routing：`provider/model` 字符串，官方 /models 目录页称覆盖 7815 个模型 / 213 家 provider
  - 官方点名 OpenAI / Anthropic / Google / xAI，以及 OpenRouter 等网关
  - 本地模型：需自建 OpenAI 兼容服务，官方点名推荐 LMStudio（`id: "lmstudio/..."`）

layer_position: >-
  **TypeScript 生态里「batteries included」程度最高的编排框架之一，也是 LangGraph 的 TS 常见对照物。**

  官方自述（README 首段）：

  > "Mastra is a framework for building AI-powered applications and agents
  > with a **modern TypeScript stack**. It includes **everything you need** to go from early
  > prototypes to production-ready applications."

  **与 LangGraph 的层级差异是本站要给读者看的第一张对照。**
  LangGraph 自称 low-level 编排框架、不预置工具与文件系统。
  Mastra 走的是**全栈打包**：Agents、Workflows（图工作流引擎）、Memory、RAG、Evals/Scorers、
  MCP 客户端与服务端、内置 server（Hono）、Studio 与 observability 全在一个包里。
  官方 README 用 "out-of-the-box" 描述这批能力。

  **它同时是一条 YC W25 的商业线**（README 顶部 Y Combinator badge，batch W25）。
  核心框架 Apache-2.0；平台产品（Studio / Observability / Server）单独计费，并带 `ee/` 企业目录。
  **「框架免费」与「平台付费」必须分开记**，否则会把商业能力误当开源自带。

  与 CrewAI 的另一处差别：**CrewAI 用 Crew/Flow 的业务比喻，Mastra 用的是更工程的
  agents + graph workflows 词汇**（官方 workflow 语法 `.then()` / `.branch()` / `.parallel()`）。

axes:
  model_access: >-
    **它的答案是 model routing，规格写得最狠。** 官方 /models 目录页原文：

    "giving you access to **7815 models from 213 providers** through a single API."

    用法是 `provider/model` 字符串。官方示例：
    `openai/gpt-5.6-sol`、`anthropic/claude-sonnet-4-6`、`openrouter/anthropic/claude-haiku-4.5`。

    缺 key 时，运行时错误会明确指出缺哪个变量。

    **官方原文**："Mastra reads the relevant environment variable (e.g. `ANTHROPIC_API_KEY`) and routes requests to the provider."

    **官方支持 model fallbacks。**

    也可按任务 mix-and-match 不同模型。
    还能用 `requestContext` 动态选模型。

    **官方原文**："If a provider experiences an outage, Mastra can automatically switch to another provider at the application level"

    **本地模型是官方明确支持的。** /models 页有专节：

    **官方原文**："Use local models with Mastra"

    **官方原文**："Mastra also supports local models like `gpt-oss`, `Qwen3`, `DeepSeek` ... that you run on your own hardware"

    前提是本地要提供 **OpenAI 兼容** API server。官方**推荐 LMStudio**。

    **本地示例**：

    - `id: "lmstudio/qwen/qwen3-30b-a3b-2507"`
    - `url: "http://localhost:1234/v1"`

    ⚠ **一处官方自身数字打架**：README 亮点段写的是 "Connect to **40+ providers**"，
    而 /models 目录页写 "213 providers / 7815 models"。

    **旧口径**：本站以目录页为准，README 的 40+ 视为旧口径。

    **换 provider 后各家 tool calling / structured output 的对齐度，官方未说明**（已查 /models 页）。
  runtime: >-
    **纯库起步，但官方把「独立 server」和「托管平台」两条路都铺好了。**

    形态是 npm 包（`@mastra/core`，官方 `.npmrc` 要求 Node.js `>=22.13.0`）。

    **官方原文**："Mastra applications can be deployed to any Node.js-compatible environment."

    运行时支持 Node.js v22.13.0+、Bun、Deno、Cloudflare。

    它**内置一个基于 Hono 的 server**。可用 `mastra build` 打出后部署到任意 VM / 容器 / PaaS，
    或作为 standalone server 独立运行；也能嵌进 Next.js / React / Node 应用。

    **本地开发**：用 `mastra dev`，Studio 起在 `http://localhost:4111`。

    **谁运营 agent loop**：默认是你自己（自托管）。要托管可选 Mastra 平台 Server ——
    **官方原文**："A production deployment target that runs your Mastra application as an API server"。

    **多 agent 并发调度**：走 workflows（内置执行引擎），或部署到 Inngest 等 workflow runner。
    生产可用独立 worker 进程跑编排与 cron（官方 Workers 页）。

    即「代码在哪」= 你的进程；「要不要托管」= 可选平台。
  local_files: >-
    **核心框架不内置文件系统，文件能力要显式加装。**

    Mastra 的定位是 AI 应用/agent 框架。官方文档**没有把文件读写当成默认 agent 能力**。

    **工具面**：README 与 agents 页讲的工具面是两样。一是 `createTool()` 自定义工具，二是 MCP。

    **官方给的三条文件路径**（已查 harness 页与 platform 页）：

    ① 自己用 `createTool()` 提供文件工具。

    ② 走 Harness 的 **`createCodingAgent()`**（官方 harness 表）。**官方原文**："Give an agent files, a shell, and the defaults a coding agent needs → `createCodingAgent()`"

    它 "Build a standard agent with a **workspace**, task tracking, and retries already configured"。

    ③ 用 Mastra 平台的 **Workspace**（官方称每个 environment 会得到一个 managed Workspace）：

    "gives agents **a filesystem and sandbox** with no manual configuration"

    **核心框架自身的文件访问默认边界（是否限制在项目目录、越界是否拦截），官方未说明。**

    **核验**：已查 agents 页、harness 页、deployment 页。宿主权限模型落在平台 Workspace 那侧，不在 OSS 核心。
  background: >-
    **这是它非常强的一维：durable agents + 可跨重启的 snapshot 都是可查证的核心机制。** 官方 suspend-and-resume 页原文：

    "Suspension saves the current execution state as a **snapshot**. Later, resume from a specific step ID to restore the exact captured state. Snapshots are stored in your configured storage provider and **persist across deployments and application restarts**."

    机制细节：

    - `suspend()` 在某个 step 内暂停，并把状态标为 `suspended`
    - workflow 级 `.sleep()/.sleepUntil()` 标 `waiting`
    - `resume({ step, resumeData })` 从暂停处继续；只给 `runId` 时需先 `createRun({ runId })`
    - `suspendData` 可在恢复时取回当初传给 `suspend()` 的数据
    - `workflow.getWorkflowRunById()` + `createWorkflowStateReader()` 可从存储中恢复悬挂的 run

    **Harness 层还有**：

    - Durable Agents："Persist run state and let clients reconnect to its stream"
    - Background Tasks："Run slow tools, workflows, or subagents without blocking"
    - Schedules：cron 定时起 run

    **托管后台**：Mastra 平台 Server 提供 24/7 常驻（Persistent Server 按项目计费，单价见官方页）。
    OSS 自托管则是「你自己把进程跑起来」，关了就停。
  tools: >-
    **工具面是三件套：自定义工具 + MCP 一等支持 + 可作 MCP server。官方文档给得很全。**

    自定义工具必须用 `createTool()`。

    官方 agents 页明确警告：plain object 工具会 **静默失败**。

    **官方原文**："silently fail to execute" —— 需 `id` / `description` / `inputSchema` / `execute()`。

    **MCP 是独立包 `@mastra/mcp`**，官方给两个类：

    - **`MCPClient`**：连一个或多个 MCP server
    - **`MCPServer`**：把 Mastra 的 agents / tools / workflows / prompts / resources 暴露成 MCP server

    传输方式官方示例覆盖 **stdio（`command: npx ...`）与远程 HTTP(S)（`url: new URL(...)`）**。
    并给了 Klavis AI、mcp.run、Composio、Smithery、Ampersand 等**注册表接入**示例。

    还区分两类工具：**静态工具（`getTools()`，配置固定）** 与
    **动态工具（`getToolsets()`）**：按用户/请求带凭据。对多租户 SaaS 很有用。

    另有 **A2A**（`@mastra/core` 暴露 `./a2a` 子路径）与 **skills**（`./skills`）子模块。
    子代理/多 agent 委派官方称 supervisor + subagents（见 memory 页的 delegation 说明）。
  context: >-
    **它把「记忆」拆成多层，且有「状态 ≠ 上下文」的两套机制。**

    官方 memory 页：默认存 **message history**，可另开三样：

    - **Observational Memory（推荐）**："Uses background agents to maintain a dense observation log
      that **replaces raw message history as it grows**. This keeps the context window small while
      preserving long-term memory."

    - **Working memory**：存结构化的用户数据（名字、偏好、目标）
    - **Semantic recall**：按语义而非关键词召回历史消息

    超限时用 **memory processors** filter / trim / prioritize。
    作用域用两个 ID 划分：`resource`（用户/实体）和 `thread`（会话）。
    多 agent 间可共享或隔离（`scope: 'resource' | 'thread'`）。

    **状态那一套**是 workflow 的 snapshot（suspend/resume，见 background 轴）—— 与 memory 分离。

    **RAG 是独立系统**（`@mastra/rag`）：MDocument 切块（recursive / sliding window）、embedding，
    再落向量库（官方点名 **pgvector、Pinecone、Qdrant、MongoDB**）。

    即：snapshot 存流程状态。memory 存对话与用户长期信息。RAG 存外部知识。三者用途不同。
  permissions: >-
    **认证是「可选、多 provider」，HITL 是完整的暂停/恢复，沙箱只落在平台侧。** 官方 auth 页原文：

    "**Authentication is optional.** If no auth is configured, all routes and Studio are **publicly accessible**."

    配置后可同时锁住 **Studio UI**（登录 + RBAC）与 **API 路由**。
    自定义路由可用 `requiresAuth: false` 单开。

    - **内置**：Simple Auth / JWT
    - **第三方**：Auth0、Better Auth、Clerk、Firebase、Google、Okta、Supabase、WorkOS
    - **其他**：Composite / 自定义 provider

    **已查**：auth 页与定价页。

    **人工介入**：用 workflow 的 suspend/resume 做审批（见 background 轴）。
    官方另有 human-in-the-loop 页与 AgentController（会话内审批、排队跟进、停止 run）。

    **沙箱**：OSS 核心是否提供进程/容器级沙箱，**官方未说明**。
    沙箱能力落在平台 **Workspace** 与 `createCodingAgent()`。

    **企业级权限**（RBAC、SSO、IAM、network policy）属 `ee/` 企业许可
    （官方定价页 Self-Hosted Enterprise 卖点）。

    **核心框架的网络访问控制机制，官方未说明**（已查 auth 页与定价页）。
  fit: >-
    **适合**：

    - **TypeScript / Node 团队**要一套「开箱即用」的 agent 框架 ——
      Agents + 图 Workflows + Memory + RAG + Evals + MCP + 内置 server + Studio 全在一个包里

    - 需要材料化的 **suspend/resume 与 durable run**（snapshot 存在你自己的存储、跨重启可恢复）
    - 要接大量模型 provider 与本地模型（官方推荐 LMStudio）
    - 需要把 agent/workflow 用 MCP 暴露出去，或当 MCP 客户端
    - 想把 agent 嵌进 Next.js / React 应用

    **不适合**：

    - **Python 栈**（该看 [LangGraph](./langgraph.md) / [Pydantic AI](./pydantic-ai.md)）
    - 想要 low-level、自己掌控图引擎与工具面（Mastra 抽象更高、包更大、约定更多）
    - 坚持完全不用任何商业组件（平台 Studio/观测/托管部署是单独的付费产品，`ee/` 目录需企业许可）
    - 需要框架自带进程级沙箱与网络策略（那部分不在 OSS 核心）

pitfalls:
  - 以为 Mastra 全是 Apache-2.0 免费 —— `ee/` 目录是 source-available，生产用需企业许可，仓库 license API 返回 NOASSERTION
  - 把 Mastra Studio / 观测 / 托管部署当成框架自带 —— 那些是 Mastra 平台产品，按 Starter / Teams / Enterprise 分档计费
  - 把 README 的「40+ providers」当作上限 —— 官方 /models 目录页写的是 213 providers / 7815 models
  - 以为本地模型要改代码 —— 官方支持 OpenAI 兼容端点，推荐 LMStudio，属配置项（`id` + `url`）

tags: [TypeScript, 开源, Apache-2.0, 编排框架, 工作流, 图执行, 事件驱动, 多Agent, 状态管理, 持久化, 自托管, MCP, RAG, 检索, eval, 上下文压缩, 集成生态, 商业平台]
related: [filesystem]

sources:
  - label: mastra-ai/mastra · 仓库（28,639★，NOASSERTION 双许可，核验 2026-10-08）
    url: https://github.com/mastra-ai/mastra
    kind: repo

  - label: 仓库 README（TypeScript 定位、model routing 40+、agents/workflows/HITL/memory/RAG/evals/MCP 亮点、Licensing 双许可段）
    url: https://github.com/mastra-ai/mastra
    kind: docs

  - label: 官方文档 · Model Providers（7815 models / 213 providers、`provider/model`、fallbacks、本地模型与 LMStudio）
    url: https://mastra.ai/models
    kind: docs

  - label: 官方文档 · Provider 目录（OpenAI/Anthropic/Google/xAI 等 provider 与模型数）
    url: https://mastra.ai/models/providers
    kind: docs

  - label: 官方文档 · Suspend and resume（snapshot 存 storage、跨重启恢复、resume/suspendData、state reader）
    url: https://mastra.ai/docs/workflows/suspend-and-resume
    kind: docs

  - label: 官方文档 · Workflows（createStep/createWorkflow、标准 JSON Schema、内置执行引擎）
    url: https://mastra.ai/docs/workflows/overview
    kind: docs

  - label: 官方文档 · Memory（message history、Observational Memory、working memory、semantic recall、processors）
    url: https://mastra.ai/docs/memory/overview
    kind: docs

  - label: 官方文档 · RAG（MDocument 切块、embedding、pgvector/Pinecone/Qdrant/MongoDB 向量库）
    url: https://mastra.ai/docs/rag/overview
    kind: docs

  - label: 官方文档 · Evals（Scorers：model-graded / rule-based / statistical，返回 0-1 分数）
    url: https://mastra.ai/docs/evals/overview
    kind: docs

  - label: 官方文档 · MCP Overview（MCPClient / MCPServer、stdio 与远程 HTTP、注册表接入、静态/动态工具）
    url: https://mastra.ai/docs/tools-mcp/mcp-overview
    kind: docs

  - label: 官方文档 · Deploy（Node/Bun/Deno/Cloudflare、Hono server、Mastra 平台、workflow runners、workers）
    url: https://mastra.ai/docs/deployment/overview
    kind: docs

  - label: 官方文档 · Mastra 平台（Observability / Studio / Server、托管 Workspace 带 filesystem 与 sandbox）
    url: https://mastra.ai/docs/mastra-platform/overview
    kind: docs

  - label: 官方文档 · Harness（Durable Agents、Background Tasks、Schedules、createCodingAgent）
    url: https://mastra.ai/docs/harness/overview
    kind: docs

  - label: 官方文档 · Auth（认证可选、默认公开、JWT/SSO/RBAC、Studio 与 API 一起保护）
    url: https://mastra.ai/docs/auth/overview
    kind: docs

  - label: 官方定价页（核验 2026-10-08：Platform 三档 Starter/Teams/Enterprise；Self-Hosted Free 与 Enterprise；Persistent Server 按项目计费；Gateway 有加价费率）
    url: https://mastra.ai/pricing
    kind: pricing

  - label: Releases（@mastra/core 1.75.0 @ 2026-10-07）
    url: https://github.com/mastra-ai/mastra/releases
    kind: changelog

link:
  url: https://mastra.ai
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

**Mastra 是「TypeScript 生态的全栈式 agent 框架」。**

装一个包，Agents、图工作流、Memory、RAG、Evals、MCP、内置 server 与 Studio 就都在里面。

官方自述很直白：

> Mastra is a framework for building AI-powered applications and agents with a **modern TypeScript stack**.
> It includes **everything you need** to go from early prototypes to production-ready applications.

关键词是 **everything**。**它与 [LangGraph](./langgraph.md) 的差别，正好是本站反复强调的那条分野：**
LangGraph 自认 low-level、不预置工具与文件系统；Mastra 走 batteries included 的厚路线。

## TypeScript 生态里的「batteries included」一极

本站 harness 分区里，Python 侧已经有一批对象：LangGraph / CrewAI / OpenAI Agents SDK / Pydantic AI。

**Mastra 就是把同一件事翻译到 TypeScript 世界的那一个**。而且它的抽象层次更高：

| | LangGraph | **Mastra** |
|---|---|---|
| 语言 | Python（另有 langgraphjs） | **TypeScript（主业）** |
| 自述 | low-level 编排框架 | "**everything you need**"，out-of-the-box |
| 图工作流 | 显式 graph / superstep | `createWorkflow()` + `.then()/.branch()/.parallel()` |
| 预置能力 | 不管工具/文件系统 | **Memory / RAG / Evals / MCP / server / Studio 全预置** |
| 商业线 | LangSmith Deployment | **Mastra 平台**（Observability / Studio / Server，YC W25） |

**一句口诀**：想自己画流程、要最低层 → LangGraph。想少接线、要开箱就全 → Mastra。

## 模型路由：为第一决策点给出的最完整答案

**它的第一决策点答案是 model routing，而且规格写得最完整：一个 `provider/model` 字符串就能换 provider。** 官方 /models 目录页原文：

> giving you access to **7815 models from 213 providers** through a single API.

用法就是 `provider/model` 字符串。Mastra 自己读对应环境变量并路由。官方还给三种选法：

- **model fallbacks**：provider 挂了自动切
- 按任务 mix-and-match 不同模型
- 用 `requestContext` 动态选模型

**本地模型是官方明确支持的。** /models 页有专节 "Use local models with Mastra"：

> Mastra also supports local models like `gpt-oss`, `Qwen3`, `DeepSeek` ... that you run on your own hardware

本地服务需提供 **OpenAI 兼容** API。官方**推荐 LMStudio**。

**本地示例**：

- `id: "lmstudio/qwen/qwen3-30b-a3b-2507"`
- `url: "http://localhost:1234/v1"`

> ⚠ **一处要替读者校准的官方数字**：仓库 README 亮点段写 "Connect to **40+ providers**"，
> 而 /models 目录页写 **213 providers / 7815 models** —— 两者差得远。本站以目录页为准，
> README 的 40+ 视为旧口径。

**未知**：换 provider 后各家 tool calling / structured output 的对齐度，官方未说明。

## 状态 ≠ 上下文：它两套机制都给了

**Mastra 把「流程状态」和「对话记忆」分得很清，这是它最值得记的一处设计。**

- **流程状态** = workflow 的 **snapshot**，粒度到 step。官方 suspend-and-resume 页原文：

  > Suspension saves the current execution state as a **snapshot** ... stored in your configured
  > storage provider and **persist across deployments and application restarts**.

  这就是本站要找的「可跨进程恢复的状态持久化」。

- **对话/长期记忆** = memory 的多层：
  - message history（默认）
  - **Observational Memory**：后台 agent 把旧消息压成 observation，官方推荐
  - **working memory**：结构化用户数据
  - **semantic recall**：语义召回

  超限时用 **memory processors** 裁剪。

- **外部知识** = RAG（`@mastra/rag` + 向量库）。

**三者用途不同、存储也可分开配置**。这正是本站主张的「状态 ≠ 上下文」的落地形态。

## 工具与 MCP：既能当客户端，也能当 server

**工具面是三件套：自定义工具、MCP 客户端、MCP server。** 官方给两个类（独立包 `@mastra/mcp`）：

- **`MCPClient`**：连一个或多个 MCP server —— stdio（`command: npx ...`）或远程 HTTP（`url`）。
- **`MCPServer`**：把你自己的 agents / tools / workflows / prompts / resources 暴露成 MCP server。

还区分两类工具：

- **静态工具 `getTools()`**：配置固定
- **动态工具 `getToolsets()`**：按用户/请求带凭据

官方给了 Klavis AI、mcp.run、Composio、Smithery、Ampersand 等注册表接入示例。

自定义工具必须走 `createTool()`。官方 agents 页明确警告：plain object 工具会 **静默失败**。

## 许可与商业线：必须分开读

**结论先说：核心框架 Apache-2.0。`ee/` 目录 source-available。生产用需企业许可。**

仓库 README 的 Licensing 段说得很清楚，是**双许可**：

> **Apache License 2.0**: The core framework and the vast majority of this codebase is open source under Apache-2.0.
> **Mastra Enterprise License**: Code in any directory named `ee/` ... is source-available ... require a valid enterprise license for production use.

GitHub 的 license API 对整仓返回 **NOASSERTION**。
它与这段双许可声明一致：不是「无许可」，是「非标准双许可」。

另一条线是 **Mastra 平台**（YC W25）。官方定价页（核验 2026-10-08）分两处：

- **平台三档**：Starter（免费档）、Teams（付费档）、Enterprise（定制）
- **自托管两档**：Free 与 Enterprise

**Studio、Observability、托管 Server 与 24/7 常驻都是平台产品**（常驻托管按项目计费，单价见官方页）。它们不是框架自带。报价按 D9 口径不存。

## 适合与不适合

**适合 TypeScript / Node 团队。** 理由：

- 要一套开箱即用的 agent 框架（Agents + 图 Workflows + Memory + RAG + Evals + MCP + server + Studio）
- 需要 suspend/resume 与 durable run
- 要接大量 provider 与本地模型
- 要把 agent/workflow 用 MCP 暴露出去
- 要嵌进 Next.js / React

**不适合四类情况：**

- Python 栈（看 LangGraph / Pydantic AI）
- 想要 lowest-level、自己掌控图引擎与工具面
- 坚持不用任何商业组件（平台与 `ee/` 是单独授权）
- 需要框架自带进程级沙箱与网络策略

## 核验说明

`confidence: partial` 的依据：

**为什么仍是 partial**：八维已全部从官方页核到结论。但仍有若干处**官方确实没写**、
只能记「官方未说明」的项。**共四处**：

- 换 provider 后各家 tool calling / structured output 的对齐度
- 核心框架自身的文件访问默认边界
- OSS 核心的网络访问控制机制
- `ee/` 与开源的功能分界

这些不是「没查到」，是官方文档本身没给，故不足以升到 verified。

> 本轮核到的官方页：仓库 README（定位、亮点、Licensing 双许可段）、
> `/models`（provider 与本地模型）、`/models/providers`、`docs/workflows/overview`、
> `docs/workflows/suspend-and-resume`、`docs/memory/overview`、`docs/rag/overview`、
> `docs/evals/overview`、`docs/tools-mcp/mcp-overview`、`docs/deployment/overview`、
> `docs/mastra-platform/overview`、`docs/harness/overview`、`docs/auth/overview`、
> `docs/agents/overview`、官方定价页 `mastra.ai/pricing`、
> releases（`@mastra/core@1.75.0` @ 2026-10-07）、npm registry（`@mastra/core` engines Node `>=22.13.0`）。
> **核验方法**：WebFetch 打开各官方页与 GitHub API（仓库元数据、releases）。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按编排框架 + TS 生态维度定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 一个最小 agent + workflow 要几个文件、多少行 | 量化「everything you need」的真实上手成本 |
| 2 | workflow 跑到一半 kill 进程，靠 snapshot 能否真从暂停 step 恢复 | 官方承诺 persist across restarts，须验证 |
| 3 | 用 LMStudio 接本地模型跑通一个 workflow | 官方点名推荐，验证真实可行性 |
| 4 | 同一任务分别用 agent 与 workflow 实现，代码量差多少 | 验证「明确流程用 workflow」的官方建议 |
| 5 | Observational Memory 压缩后的信息损失与额外 LLM 成本 | 官方推荐默认开，代价未实测 |
| 6 | OSS 自托管走 `mastra build` 部署到自有容器的最小路径 | 验证「纯库也能上生产」的程度 |

## 未知项清单

- 换 provider 后各家 tool calling / structured output 的能力对齐度（官方未说明）
- 核心框架自身的文件访问默认边界（官方未说明，已查 agents 页、harness 页、deployment 页）
- OSS 核心是否有网络访问控制的官方机制（官方未说明）
- `ee/` 目录之外还有哪些功能属企业许可范围（官方 README 只给目录示例，未给完整功能清单）
- 跨进程 / 多实例并发 resume 同一 snapshot 的冲突语义（官方未说明）
- Observational Memory 压缩后的信息损失与成本（本站未实测）
- Mastra 平台各档的实际吞吐与超量计费在真实负载下的表现（官方只给计费口径）

## 相关条目

- [LangGraph](./langgraph.md) — **TS vs Python 的正面照**：LangGraph 是 low-level 图引擎（不预置工具/文件系统），Mastra 是 TypeScript 的 batteries-included 全栈框架。要底座还是要开箱，这是第一张对照表。
- [Pydantic AI](./pydantic-ai.md) — 另一语言的对位：Pydantic AI 用 Python 的类型安全做结构化输出与 durable execution，Mastra 用 TypeScript 的 model routing 与全栈能力。两边的「第一决策点」答案不同。
- [CrewAI](./crewai.md) — 同为 batteries-included 编排框架：CrewAI 走 Crew/Flow 业务比喻（Python），Mastra 走 agents + graph workflows 工程词汇（TypeScript）。
- [OpenAI Agents SDK](./openai-agents-sdk.md) — 反面对照：那个是 primitives-only 的薄 harness，Mastra 是把 memory/RAG/evals/MCP/server 都预置的厚框架。
