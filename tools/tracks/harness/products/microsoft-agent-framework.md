---
id: microsoft-agent-framework
track: harness
tasks: ["build-agent"]
family: orchestration
name: Microsoft Agent Framework
vendor: Microsoft
homepage: https://learn.microsoft.com/en-us/agent-framework/
mark: MA
accent: "#0078D4"
stars: 14007
license: MIT
latest_version: python-1.20.0
language: Python（主）/ C#/.NET

# 支持哪些模型 provider（本站第一决策点）
providers:
  - Microsoft Foundry（FoundryChatClient / FoundryAgent，含 Foundry Local 本地推理）
  - Azure OpenAI 与 Azure AI（官方 overview 原文点名）
  - OpenAI（Responses 与 Chat Completions 两类客户端）
  - Anthropic Claude（AnthropicClient / ClaudeAgent）
  - Google Gemini（含内置代码执行）
  - AWS Bedrock（BedrockChatClient）
  - Mistral（embedding）
  - Ollama 本地模型（OllamaChatClient）
  - GitHub Copilot（GitHubCopilotAgent）与 Microsoft Copilot Studio
  - 自建 provider：继承 BaseAgent / BaseChatClient 自行扩展

layer_position: >-
  **它是 AutoGen 与 Semantic Kernel 两条微软产品线的合并继任。**

  本站编排家族里「血缘最复杂」的一个。

  官方 overview 页原文把这句话写得最直白：

  "It brings together and extends ideas from **Semantic Kernel and AutoGen** projects... Built by the same teams, it is the **unified foundation** for building AI agents going forward."

  官方公告页进一步盖章：

  "Microsoft Agent Framework **doesn't replace** Semantic Kernel and AutoGen — it **builds on them**"

  公告页还给出对照表：它同时支持 **Agent Orchestration**（LLM 驱动）
  与 **Workflow Orchestration**（业务逻辑驱动的确定性工作流）。

  **与本站 [Google ADK](./google-adk.md) 的关系**：同为「图/工作流编排」这一层。

  - ADK 用 Workflow Runtime 的节点与路由。
  - MAF 用 WorkflowBuilder 的 executor 与 edge。
  - 两者都用 superstep 执行模型与 checkpoint 落盘，属同类问题的两种厂商答案。

  **与 [AG2](./ag2.md) 的关系是本站最该讲清的一条。**

  AutoGen 原仓库停更后，社区转向 AG2（`ag2ai/ag2`）。
  微软官方则把 AutoGen 与 Semantic Kernel 合并成 MAF。

  即 **AG2 是 AutoGen 的社区延续，MAF 是微软官方线**。
  两者都自称 AutoGen 血脉，但互不隶属。

  MAF 还自带两份迁移指南（from Semantic Kernel / from AutoGen），
  进一步坐实「继任」定位。

axes:
  model_access: >-
    **它的 provider 很全，而且每种都能在官方样例目录里逐个核到。**

    **官方给的是「provider 灵活 + 多语言一致 API」的组合。**

    官方 overview 页原文：

    **官方原文**："Agents support model providers including **Azure OpenAI, OpenAI, and Azure AI**."

    README 首段补充生态：

    **官方原文**："supports a broad ecosystem including **Microsoft Foundry, Azure OpenAI, OpenAI, and the GitHub Copilot SDK**"

    完整 provider 清单已核到（官方样例目录 README）：

    `python/samples/02-agents/providers`

    - Anthropic —— `AnthropicClient` / `ClaudeAgent`
    - AWS Bedrock —— `BedrockChatClient`
    - Azure OpenAI —— `OpenAIChatCompletionClient`
    - Copilot Studio
    - Microsoft Foundry 与 Foundry Local —— `FoundryChatClient`
    - Google Gemini
    - GitHub Copilot —— `GitHubCopilotAgent`
    - Mistral —— embedding
    - **Ollama 本地模型** —— `OllamaChatClient`，官方标注为推荐用法
    - OpenAI

    自建 provider 继承 `BaseAgent` / `BaseChatClient`。

    **⚠ 未知：换 provider 后 tool calling / structured output 的可靠性对比，官方未说明。**
    （已查 overview 页与 providers 样例 README。）

  runtime: >-
    **它是双语言的库（SDK），但官方额外配了三条「托管与持久化」通道。**

    安装形态两条：

    - Python：`pip install agent-framework --pre`（README，注意 `--pre`）
    - .NET：`dotnet add package Microsoft.Agents.AI`

    官方 overview 明确标注：

    **官方原文**："Microsoft Agent Framework is currently in public preview."

    三条托管/运行通道已核到：

    **① Foundry Hosted Agents**（官方托管）—— 官方称：

    **官方原文**："Deploy and host your agents to **Foundry-hosted infrastructure** with just 2 additional lines of code"

    **② Durable Task 扩展** —— 落在 Azure Functions（serverless，可 scale-to-zero），
    或 bring-your-own-compute / 自托管（容器、K8s、常驻 worker）。

    **③ 本地开发**用 DevUI（交互式开发调试台）与 VS Code AI Toolkit。

    **责任边界**：框架本身不运营 agent loop。托管要么交给 Foundry，要么自己部署。

    这与 CrewAI 同为「库」，但 MAF 的官方托管路径写得比 CrewAI 更靠前。

  local_files: >-
    **框架核心不内置文件读写工具，文件能力来自 provider 与工具层。**

    **默认边界官方未系统化定义。**

    官方 overview 只把 agent 描述成**「调用工具与 MCP server 执行动作」**。

    它没把「读写本地文件」列为内建能力，也没描述默认文件访问边界。

    目前唯一能核到的具体表述，在官方 providers 样例 README。

    GitHub Copilot 样例演示了这条：

    **官方原文**："**permission-scoped shell/file/url access**"

    即文件/命令/网络的权限范围由该 provider 的权限模型决定，不是框架统一提供。

    另有一组安全样例（`python/samples/02-agents/security`）演示三件事：
    prompt injection 防御、MCP 工具代理、跨工具数据外泄防护。

    这属「用中间件自己加固」，不是文件沙箱。

    **⚠ 未知：框架级的默认文件系统权限模型与进程/容器沙箱，官方未说明。**
    （已查 overview 页与 providers 样例 README 两页。）

  background: >-
    **「关机后还能跑」在本站是靠官方 Durable 扩展兑现的，粒度是 superstep。**

    **① 状态落盘**（官方 `workflows/checkpoints` 页原文）：

    **官方原文**："workflows are executed in **supersteps**... Checkpoints are created at the **end of each superstep**, after all executors in that superstep have completed"

    一次 checkpoint 捕获四样东西：

    - 所有 executor 状态
    - 待处理消息
    - pending 请求/响应
    - 共享状态

    **② 落盘后端三档已核到**：

    - `InMemoryCheckpointStorage` —— 进程内
    - `FileCheckpointStorage` —— 本地磁盘，`storage_path` 必填、无默认目录
    - `CosmosCheckpointStorage` —— Azure Cosmos DB，分布式跨进程，推荐托管身份/RBAC 认证

    **Python 1.13.0 起还增加 entry checkpoint。**

    **整轮运行因此「replayable」。**

    **③ 真后台**：官方 Durable Task 扩展提供持久会话、崩溃/重启后恢复，
    以及 Azure Functions 的 scale-to-zero 与 session TTL。

    **官方原文**（等待人工时）："Pause for human input or external events **without consuming compute or model tokens**"

    **纯 SDK 不托管后台**：不接 Durable 扩展，就必须自己让进程常驻。

  tools: >-
    **工具生态是它对标 ADK 的强项：MCP 与 A2A 都是官方点名的一等能力。**

    官方公告页「**Four Pillars**」第一条列出三项开放标准。

    **官方原文**（MCP）："Agents can dynamically discover and invoke external tools or data servers exposed over MCP"

    **官方原文**（A2A）："Agents can collaborate across runtimes using structured, protocol-driven messaging"

    **官方原文**（OpenAPI）："Any REST API with an OpenAPI specification can be imported as a callable tool instantly"

    overview 页原文也确认 agent 能调用工具与 MCP server：

    **官方原文**：agent "call **tools and MCP servers** to perform actions"

    **A2A 侧已核到实现包**（官方 `integrations/a2a` 页）：

    `Microsoft.Agents.AI.Hosting.A2A.AspNetCore`

    它用于把 agent 以 A2A 协议对外暴露，含 AgentCard 配置。

    此外还有三项：

    - **中间件** —— 请求/响应处理、异常处理、自定义管线
    - **Agent Skills** —— 从文件/内联代码/类库构建领域知识库
    - **Declarative Agents** —— 用 YAML/JSON 声明 agent

    以及实验包 **AF Labs**。

    **⚠ 未知：MCP/A2A 的传输矩阵细节，官方文档未集中给出。**
    （已查 overview 与 a2a 两页。）

  context: >-
    **官方把「会话状态」与「记忆」拆成两组原语。**

    **workflow 另有 superstep 级 checkpoint。**

    这两件事正好对应本站「状态 ≠ 上下文」的主张。

    overview 页原文列出基础积木：

    **官方原文**："an **agent session for state management**, **context providers for agent memory**, middleware..., and **MCP clients** for tool integration."

    公告页给出记忆的可插拔后端：

    **官方原文**："Developers can choose Redis, Pinecone, Qdrant, Weaviate, Elasticsearch, Postgres, or their own store for conversational memory. Agent Framework provides the abstraction; you decide the backend."

    **这一层是本站说的「上下文/记忆」。**

    **workflow checkpoint 是另一回事。**

    它落盘的是 executor 状态与待处理消息。

    这属「流程状态」，见 background 轴。

    **两套机制官方分节描述，不可混为一谈。**

    **⚠ 未知：长历史如何压缩进窗口，官方未在概览层给出统一机制。**
    （已查 overview 页与 checkpoints 页，未见类似 ADK Context Compaction 的专章。）

  permissions: >-
    **官方明确的机制是「HITL 请求/响应 + 工具级人工审批」。**

    两者都属拦执行，不是边界划定。

    **① 工作流层 HITL**（官方 `workflows/human-in-the-loop` 页）：

    **官方原文**：HITL "is achieved through the **request and response** handling mechanism"

    .NET 用 `RequestPort`（发 `RequestInfoEvent`）。
    Python 用 `ctx.request_info()` 配 `@response_handler`。

    checkpoint 会一并保存 pending 请求，恢复时重新发出。

    **② 工具级审批**（官方公告页原文）：

    **官方原文**："tools can be marked as **requiring human approval**. Agent Framework automatically emits a **pending approval request** that can be routed to a UI or queue, then continues or denies execution accordingly."

    **③ 安全样例**（官方 `02-agents/security`）：

    - `SecureAgentConfig` + `quarantined_llm` 防 prompt injection
    - `SecureMCPToolProxy` 加固外部 MCP 工具
    - 跨工具机密数据外泄防护

    **⚠ 未知：框架级的进程/容器沙箱默认值，官方未说明。**
    （已查 overview、checkpoints、a2a 三页。）

  fit: >-
    **它是「图工作流」式的编排框架，适合五类场景。**

    - 要把多 agent 组织成有分支、有人工介入、可 checkpoint 恢复的**确定性图工作流**
    - 需要 .NET 与 Python 一致 API 双语言落地
    - 团队在 Azure / Microsoft Foundry 生态内
    - 要求可观测性（内建 OpenTelemetry）、durability、governance 与 provider 灵活性
    - 需要 MCP 与 A2A 跨运行时互通，或要从 Semantic Kernel / AutoGen 迁移

    **不适合四类场景。**

    - 只跑单个 agent、不需要图结构 —— 用 OpenAI Agents SDK 更轻
    - 要求框架内置文件/进程级沙箱边界 —— 官方未提供，默认权限取决于所选 provider
    - 想避开 Azure 依赖的纯本地栈 —— 虽有 Ollama 与 Foundry Local，官方托管路径仍以 Azure 为主
    - 要求稳定 GA API —— 官方当前是 **public preview**，升级可能有破坏性变更

pitfalls:
  - 以为它是「又一个新框架」—— 官方定位是 Semantic Kernel + AutoGen 的合并继任（direct successor），同团队出品
  - 以为只支持 .NET —— 官方是 Python 与 C#/.NET 双语言一致 API，另有独立 Go 仓 microsoft/agent-framework-go
  - 以为已是正式版 —— 官方 overview 明标 public preview，Python 安装要加 --pre
  - 以为 AutoGen / AG2 代码能原样升级 —— 官方另给迁移指南，agent 模型与 API 都变了，不是 drop-in
  - 把 workflow checkpoint 当成上下文压缩 —— checkpoint 落盘的是 superstep 级流程状态，与会话记忆是两套机制

tags: [编排框架, Python, 开源, MIT, 图执行, 工作流, checkpoint, superstep, 持久化, 状态管理, HITL, human-in-the-loop, 多Agent, MCP, A2A, 多后端]
related: [copilot]

sources:
  - label: microsoft/agent-framework · 仓库（14,007★，MIT，pushed_at 2026-10-08，核验 2026-10-08）
    url: https://github.com/microsoft/agent-framework
    kind: repo

  - label: 主 README（Key Features 十一项、双语言安装、A2A/Go 仓、Foundry Hosted Agents、Declarative Agents、Agent Skills）
    url: https://github.com/microsoft/agent-framework/blob/main/README.md
    kind: docs

  - label: 官方文档 · Overview（Semantic Kernel + AutoGen 继任、Agent/Workflow 两类 API、public preview、session/context providers/middleware/MCP clients）
    url: https://learn.microsoft.com/en-us/agent-framework/overview/agent-framework-overview
    kind: docs

  - label: 官方文档 · Migration from AutoGen（模型客户端、单/多 agent 特性映射、可观测性）
    url: https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen
    kind: migration

  - label: 官方文档 · Workflows Checkpoints（superstep 末落盘、InMemory/File/Cosmos 三档存储、allowed_checkpoint_types 安全项）
    url: https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints
    kind: docs

  - label: 官方文档 · Human-in-the-loop（RequestPort / ctx.request_info()、响应处理器、checkpoint 保存 pending 请求）
    url: https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop
    kind: docs

  - label: 官方文档 · A2A Integration（Microsoft.Agents.AI.Hosting.A2A.AspNetCore、AgentCard 配置）
    url: https://learn.microsoft.com/en-us/agent-framework/integrations/a2a
    kind: docs

  - label: 官方文档 · Durable Extension（持久会话、崩溃恢复、Azure Functions / 自托管、等待人工不耗算力、session TTL）
    url: https://learn.microsoft.com/en-us/agent-framework/integrations/durable-extension
    kind: docs

  - label: 官方 providers 样例目录 README（Anthropic/Bedrock/Azure/Gemini/GitHub Copilot/Mistral/Ollama/OpenAI/Foundry 清单、GitHub Copilot 权限范围示例）
    url: https://github.com/microsoft/agent-framework/tree/main/python/samples/02-agents/providers
    kind: docs

  - label: Microsoft Foundry Blog · Introducing Microsoft Agent Framework（2025-10-01：继任定位、Four Pillars、MCP/A2A/OpenAPI、Magentic 等编排模式、工具级人工审批）
    url: https://devblogs.microsoft.com/foundry/introducing-microsoft-agent-framework-the-open-source-engine-for-agentic-ai-apps/
    kind: engineering

  - label: Releases（最新 python-1.20.0 @ 2026-10-02）
    url: https://github.com/microsoft/agent-framework/releases
    kind: changelog

  - label: microsoft/agent-framework-go · Go SDK 独立仓（README 点名的第三语言）
    url: https://github.com/microsoft/agent-framework-go
    kind: repo

link:
  url: https://learn.microsoft.com/en-us/agent-framework/
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
  direct_note: learn.microsoft.com 直连实测 200。
  direct_note_en: learn.microsoft.com measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**它是什么**：「Semantic Kernel 与 AutoGen 合并后的微软官方 agent 底座」。

全名 **Microsoft Agent Framework**（本站下称 MAF）。

官方公告页把这层血缘关系写得最清楚：

> Microsoft Agent Framework **doesn't replace** Semantic Kernel and AutoGen — it **builds on them.**

官方 overview 页同样直白（原文）：

> "It brings together and extends ideas from **Semantic Kernel and AutoGen** projects... Built by the same teams, it is the **unified foundation** for building AI agents going forward."

**理解它只需要记住一件事。**

**它不是「又一个新框架」，而是微软把两条产品线收编成了一条。**

## 两类 API：Agent 与 Workflow

官方 overview 页把能力分成两类。

| 类别 | 官方定义 | 对应本站维度 |
|---|---|---|
| **AI agents** | "Individual agents that use LLMs to process user inputs, call tools and MCP servers to perform actions" | 单 agent 原语 |
| **Workflows** | "Graph-based workflows... connecting multiple agents and functions to perform complex, multi-step tasks"，支持 type-based routing、nesting、**checkpointing**、request/response（HITL） | 图编排 / 状态持久化 |

官方对「什么时候别用 agent」也给了诚实结论。

**能写成函数就用函数。**

> "If you can write a function to handle the task, do that instead of using an AI agent."

## 编排模式：五种，含研究血统的 Magentic

公告页列出一套内置编排模式：Sequential、Concurrent、Group chat、Handoff、Magentic。

**Magentic 有明确研究出处**（官方文档原文）：

> "Magentic orchestration is designed based on the **Magentic-One** system invented by AutoGen."

即 AutoGen 研究线的模式，被收编成了生产可用的编排。

checkpoints 页也确认这五类内置编排的默认 `name`：

- `Concurrent`
- `Sequential`
- `GroupChat`
- `Handoff`
- `Magentic`

## 状态与持久化：superstep 级 checkpoint

这是本站最关心的维度之一。

官方给得很细（`workflows/checkpoints` 页）。

**粒度**：workflows 按 **supersteps** 执行。

**每个 superstep 结束时落一次 checkpoint**（官方原文）：

> "workflows are executed in **supersteps**... Checkpoints are created at the **end of each superstep**, after all executors in that superstep have completed"

一次 checkpoint 捕获四样东西：

- 全部 executor 状态
- 待处理消息
- pending 请求/响应
- 共享状态

**后端三档**可互换，走同一个 `CheckpointStorage` 协议：

| Provider | 持久性 | 适合 |
|---|---|---|
| `InMemoryCheckpointStorage` | 进程内 | 测试 / demo / 短流程 |
| `FileCheckpointStorage` | 本地磁盘 | 单机、本地开发（`storage_path` 必填） |
| `CosmosCheckpointStorage` | Azure Cosmos DB | 生产、分布式、跨进程 |

**Python 1.13.0 起增加 entry checkpoint。**

**整轮运行因此可重放。**

**「电脑关了还能跑」由 Durable 扩展兑现**（官方原文）：

> pause for human input "**without consuming compute or model tokens**"

配 Azure Functions 即可 scale-to-zero。

## 工具：MCP、A2A、OpenAPI 三条开放标准

公告页「**Four Pillars**」第一条就是开放标准。

- **MCP**：动态发现并调用外部 MCP 工具/数据 server。
- **A2A**：跨运行时、协议驱动的 agent 协作（官方 `Hosting.A2A.AspNetCore` 包负责对外暴露）。
- **OpenAPI**：任何带 OpenAPI 描述的 REST API 都可一键导入为可调用工具。

另有一组值得记的设计：

- **中间件**：请求/响应处理、异常处理、自定义管线。
- **Agent Skills**：从文件/类库建知识库。
- **Declarative Agents**：用 YAML/JSON 声明式定义 agent，可版本化。

## 权限：HITL 与工具级人工审批

官方两种机制都属「拦执行」。

**工作流层**用 `RequestPort`（.NET）或 `ctx.request_info()`（Python）。
checkpoint 会一并保存 pending 请求，恢复时重新发出。

**工具层**的官方原文：

> tools "can be marked as **requiring human approval**"

框架自动发出 **pending approval request**，路由到 UI 或队列。
然后决定继续还是拒绝。

**注意：这只是「执行前问一句」，不是沙箱。**

**框架级的进程/容器沙箱默认值，官方未说明**（已查 overview、checkpoints、a2a 三页）。

## 适合与不适合

**适合这些场景。**

要把多 agent 组织成确定性的图工作流。

要能分支、要能人工介入、要能从 checkpoint 恢复。

需要 .NET 与 Python 一致 API 双语言落地。

团队已在 Azure / Microsoft Foundry 生态内。

要求可观测性（内建 OpenTelemetry）、durability、governance 与 provider 灵活性。

需要 MCP 与 A2A 跨运行时互通。

要从 Semantic Kernel 或 AutoGen 迁移。

**不适合这些场景。**

只跑单个 agent、不需要图结构。

这种场景用 OpenAI Agents SDK 更轻。

要求框架内置文件/进程级沙箱边界。

官方未提供，默认权限取决于所选 provider。

想避开 Azure 依赖的纯本地栈。

虽有 Ollama 与 Foundry Local，官方托管路径仍以 Azure 为主。

要求稳定 GA API。

官方当前是 **public preview**，升级可能有破坏性变更。

## 核验说明

`confidence: partial` 的依据如下。

**为什么不是 verified**：本轮已核到不少机制。

- 血缘定位
- Agent / Workflow 两类 API
- superstep 级 checkpoint 与三档存储后端
- HITL 请求/响应机制
- MCP / A2A / OpenAPI 三标准
- 五种编排模式与 provider 清单

但仍有三处**官方确实没给**的项：

- 框架级默认文件系统权限模型与进程/容器沙箱
- 换 provider 后 tool calling / structured output 的可靠性对比
- 三层费用（框架/托管/模型）的具体价目表

**官方自标 public preview**，API 仍可能变动。

因此不足以升到 verified。

**本轮核到的官方页**：

- 仓库与 README
- `overview/agent-framework-overview`
- `migration-guide/from-autogen`
- `workflows/checkpoints`
- `workflows/human-in-the-loop`
- `integrations/a2a`
- `integrations/durable-extension`
- providers 样例目录 README
- Foundry Blog 公告页
- releases 页

**已核验元数据**：

- 仓库存在、★14,007、许可 MIT（经 license API）
- 最近推送 2026-10-08（仍活跃）
- 最新版 **python-1.20.0**（releases @ 2026-10-02）

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按编排框架 + 双语言维度定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 同一工作流用 Python 与 .NET 各写一遍，API 一致性如何 | 官方承诺 consistent APIs，需验证 |
| 2 | 用 FileCheckpointStorage 中途 kill 进程后 resume，是否真跳过已完成 superstep | 官方述 superstep 落盘，需验证真实表现 |
| 3 | 接 Ollama 本地模型跑完一个 Magentic 编排 | 官方点名 Ollama，验证本地可行性 |
| 4 | 工具级人工审批在长流程里的打断频率与恢复行为 | 机制已知（pending approval），体验需实测 |
| 5 | 从 AutoGen / AG2 迁一份现成代码到 MAF 的改动量 | 官方给了迁移指南，验证真实成本 |
| 6 | public preview 期间的版本升级破坏性变更频率 | 官方标 preview，选型风险需量化 |

## 未知项清单

- 框架级默认文件系统权限模型与进程/容器沙箱（官方未说明，已查 overview 页与 providers 样例 README）
- 换 provider 后 tool calling / structured output 的可靠性对比（官方未说明，已查 overview 页与 providers 样例 README）
- 框架/托管/模型三层的具体价目表（官方未说明，已查 overview 页与 README）
- MCP / A2A 的传输矩阵细节（官方未集中给出，已查 overview 页与 a2a 页）
- 长历史的统一上下文压缩机制（官方概览层未给专章，已查 overview 页与 checkpoints 页）
- public preview 期间的 API 稳定性与 GA 时间表（官方仅标 public preview）
- A2A 协议规范本身（外部协议，不在本站研究范围）
- 与 Microsoft 365 Agents SDK 融合的落地进度（公告仅述方向）

## 相关条目

- [Google ADK](./google-adk.md) — **同类图编排对照**：ADK 用 Workflow Runtime 的节点/路由，MAF 用 WorkflowBuilder 的 executor/edge；两者都走 superstep + checkpoint，且都内建 HITL，是同一问题的两种厂商答案。
- [AG2](./ag2.md) — **AutoGen 血脉的两条分野**：AG2 是社区延续（`ag2ai/ag2`），MAF 是微软官方把 AutoGen 与 Semantic Kernel 合并的继任线，官方另给迁移指南。两者互不隶属。
- [CrewAI](./crewai.md) — **抽象层次对照**：CrewAI 用 Crew（角色协作）/ Flow（事件驱动）两套业务抽象，MAF 用统一的图工作流 + 五种内置编排模式；CrewAI 更「业务化」，MAF 更「系统化 + 企业级」。
