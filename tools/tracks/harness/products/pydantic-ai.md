---
id: pydantic-ai
track: harness
tasks: ["build-agent"]
family: coding-base
name: Pydantic AI
vendor: Pydantic
homepage: https://ai.pydantic.dev
mark: PA
stars: 12978
license: MIT
latest_version: 2.54.0
language: Python

# 支持哪些模型 provider（本站第一决策点）
providers:
  - 模型开发商：OpenAI / Anthropic / Google(Gemini) / DeepSeek / Mistral / Cohere / xAI / Moonshot(Kimi) / Z.AI
  - 云平台：AWS Bedrock / Google Cloud(Vertex AI) / Azure Foundry / Alibaba Cloud / Snowflake Cortex / Heroku
  - 本地与自托管：Ollama / vLLM / LiteLLM
  - 推理平台与网关：Groq / Cerebras / Hugging Face / Together / Fireworks / OpenRouter / Vercel AI Gateway / Pydantic AI Gateway

layer_position: >-
  **「给你 agent loop 的 Python 库」这一档里，把「类型安全」和「durable execution」做到最深的那个。**

  官方自述：

  > **Pydantic AI** is the Python AI SDK: a **typed**, extensible **agent loop**
  > with every model a string swap away.

  （以上为 README 首页原文。）

  **与 [OpenAI Agents SDK](./openai-agents-sdk.md) 的对照是本站要给读者的第一张表。**
  两者同为「薄 agent loop 库」，但 Pydantic AI 的差异点是硬的：

  - **类型安全**：结构化输出、typed 依赖注入、typed tools 全部走 Pydantic。
  - **durable execution**：官方列出八种引擎 —— Temporal、DBOS、Prefect、Restate、AWS Lambda、
    Kitaru、Airflow、Absurd。前五个与厂商团队共维护。

  **但它已经不是「纯 primitives」了。** 官方另发 **Pydantic AI Harness**，
  把 memory、guardrails、sub-agents、planning、context management、persistence 打包成 **capabilities**，
  还有现成的 Coder / Researcher 完整 agent。

  所以它今天的形态介于「薄 harness」与「batteries-included」之间。
  **本站仍按 family: coding-base 归档**：它的核心入口是一个类型安全的 agent loop 原语
  （`Agent` + `run()`），Harness 是可选的上层能力库。

  同厂的 Graph（`pydantic-graph`，可独立于 pydantic-ai 使用）与 Evals 是**独立包**。
  另有商业线：Pydantic Logfire（观测）与 Pydantic AI Gateway（一个 key 路由所有模型）。

axes:
  model_access: >-
    **能接的模型 provider 最多，官方给了完整目录，换模型就是一个字符串。**

    官方第一卖点就是 model-agnostic。**官方 overview 原文**：

    **Model-agnostic**: Supports **virtually every** model and provider:
    OpenAI, Anthropic, Gemini, DeepSeek, Grok, Cohere, Mistral, and Perplexity;
    Azure AI Foundry, Amazon Bedrock, Google Cloud, **Ollama**, LiteLLM, Groq, OpenRouter,
    Together AI, Fireworks AI, Cerebras, Hugging Face, GitHub, Heroku, Vercel, Nebius,
    OVHcloud, Alibaba Cloud, and SambaNova.

    官方还补了一句，给自研模型留了口子。**官方原文**：

    **官方原文**："If your favorite model or provider is not listed, you can easily implement a custom model."

    官方目录把 provider 分四类。

    - **模型开发商 9 家** —— OpenAI、Anthropic、Google(Gemini)、DeepSeek、Mistral
      另有 Cohere / xAI / Moonshot(Kimi) / Z.AI

    - **云平台 6 家** —— AWS Bedrock、Google Cloud(Vertex AI)、Azure Foundry、
      Alibaba Cloud、Snowflake Cortex、Heroku

    - **本地与自托管 3 个** —— Ollama（`ollama:`）、vLLM（`vllm:`）、LiteLLM（`litellm:`）
    - **推理平台与网关 8 个** —— Groq、Cerebras、Hugging Face、Together、Fireworks、OpenRouter
      这六个是推理平台，Vercel AI Gateway 与 Pydantic AI Gateway 是两个网关

    用法是 `<provider>:<model>` 前缀字符串，例如 `Agent('openai:gpt-5.2')`。
    官方 models/overview 页给出 **provider 目录表**。
    每个 provider 在表里附服务类型与选择语法。

    另有 **fallback model** 与 **ModelProfile** 可用。
    后者标记 `supports_tools`、`supports_json_schema_output` 等能力。

    ⚠ **一处官方自己划的边界**：能力**不保证跨 provider 等价**。

    **官方原文**："Feature support depends on the model and API you select, even when two services use the same
    API format."

    换 provider 后行为完全等价，官方未给出此保证。
    官方口径是同一个 agent 可移植，但各家行为一致性需实测。
  runtime: >-
    **纯 Python 库，不是一个服务** —— 安装后由你自己决定把它跑在哪。

    安装是 `uv add pydantic-ai`（或 slim 变体）。它**不启动 server**。
    官方口径是「同一个 agent 到处运行」。**官方 README 原文**：

    "The same agent **runs everywhere you need it**: behind a web frontend, in the
    terminal, on a voice call, on a **durable background queue**, in GitHub Actions, or as a plain
    object you call `run()` on."

    运行面由你决定，官方给了这些入口：

    - 嵌进 Web 前端（AG-UI / Vercel AI 事件流）
    - 终端（官方 CLI `clai`）
    - 端侧语音会话
    - 丢进 durable background queue（那一路要把 engine 接上，见 background 轴）

    **谁运营 agent loop**：你自己。
    官方另给两个可选组件 —— **Pydantic AI Gateway**（可自托管）做模型路由，
    **Logfire** 做观测。
    两者可选，不改变「库由你运营」这个事实。

    官方还提供 GitHub Agentic Workflows，无头跑在 issues / PR 上。
    另有内置 web chat 入口。两者都建立在同一个库之上。
  local_files: >-
    **核心 agent 不带文件系统；官方 Harness 给了成套的本地文件能力。**

    普通 `Agent` 没有本地工作区概念。
    文件能力在 **Pydantic AI Harness** 里。**官方 README 原文**（Coding agent 段）：

    "A complete coding agent in your terminal: **workspace-rooted
    file access**, **allowlisted shell**, repo orientation, planning, and **context management** that
    survives long sessions."

    实现是一组可拆的 **capabilities**：

    - `FileSystem('.')`
    - `Shell(cwd='.')`
    - `RepoContext()`
    - `SubAgents(...)`
    - `ClearToolResults()`
    - `ToolOutputLimits()`

    官方强调 Coder 只是把它们组合起来。**官方原文**：

    **官方原文**："use it whole, or use the blocks it bundles directly; the two are equivalent"

    **关键边界官方写明了**：文件访问是 **workspace-rooted**（限定工作区），
    shell 是 **allowlisted**（白名单）。

    另有 **Monty**，官方称其为 "a sandboxed Python interpreter that runs model-written code"。
    它用来跑模型写出的代码。

    **未知：核心 SDK 层面的文件访问默认边界（不经 Harness 时），官方未说明**
    **核验：**overview 与 harness 页已查。
  background: >-
    **这是它最硬的差异点：durable execution 官方列出八种引擎，**
    且「每个模型与工具调用都成为一个 **durable** 单元」。

    **官方 durable execution 页原文**：

    "Pydantic AI allows you to build **durable agents** that can **preserve their progress across
    transient API failures and application errors or restarts**,
    and handle long-running, asynchronous, and human-in-the-loop workflows with production-grade reliability."

    机制见**官方原文**：

    "Each engine wraps **every model request and tool call as its own durable unit**"

    官方 README 列举引擎为 **Temporal、DBOS、Prefect、Restate、AWS Lambda、Kitaru、Airflow、Absurd**，
    其中 "the **first five co-maintained** with the vendor teams"。
    第三方还有一种 **durable execution backend builder**，可以自接引擎。

    接法示例：`TemporalDurability()` capability + `PydanticAIWorkflow`，官方称：

    "a run working through a background queue **survives restarts, failures, and long waits**"

    ⚠ **边界要读出来**：官方专设一句 ——

    "**Durability is not storage**"

    意思是：durable engine 只保证一次 run 跨崩溃存活。
    它**不替你存对话线程**，那是另设的 Persistence。

    另外两条限制：`run_sync()` / `run_stream_sync()` 不能在工具内使用，须 `async def`。
    **每个 agent 只能挂一个 durable engine**，挂第二个会抛 `UserError`。

  tools: >-
    **工具面有「函数工具 + MCP + A2A + capabilities 组合」四层。MCP 是核心能力。**

    函数工具用 `@agent.tool` 注册。**官方原文**：

    **官方原文**："the rest of its signature and its docstring become the tool schema, arguments are validated before your code runs"

    参数错误会回传给 LLM 重试。

    **MCP 官方支持两种方向**（mcp/overview 页）：

    - ① agent 连 MCP server，用它的工具
    - ② agent 被放进 MCP server

    推荐做法是 **`MCP` capability**。官方称：

    "It **runs the MCP server locally by default** — keeping credentials, hooks, and tracing under your control"

    并可用一个 `native=True` 开关选择走模型 provider 的原生 MCP（不支持时回落本地）。
    低层用 `MCPToolset`（`toolsets=[...]`）。
    **本地 MCP 默认**这点对凭据可控性很重要。

    ⚠ **A2A 已在退场**。官方 integrations/a2a 页明确：

    - `Agent.to_a2a()` 与 `pydantic-ai-slim[a2a]` "**deprecated and will be removed in 2.0**"
    - `fasta2a` 已迁到 `datalayer/fasta2a`，并附带 Pydantic AI bridge

    **UI/接口**：AG-UI、Vercel AI 事件流、CLI、内置 web chat、voice。
    另有 **capabilities** 组合机制。
    还有 **YAML/JSON agent specs**，可以无代码定义 agent。

  context: >-
    **它把「持久化」和「durability」明确分成两件事，这是本维度的核心口径。**

    **官方 durable execution 页原文**：

    "**Durability is not storage** — A durable engine keeps one run
    alive across crashes and restarts. It **does not store your chat threads**: saving a conversation
    and picking it up later is a different problem ... laid out in **Persistence**."

    即：durable engine 管 run 的存活。
    **Persistence** 管对话线程的保存与恢复，是另设模块。

    **Harness 另给上下文管理**：官方 capabilities 列表含 **memory**、
    **context management**（compaction）、**persistence**。**官方 README 原文**称 Harness：

    **官方原文**："has everything an agent needs for complex, long-running work, snapped on as capabilities"

    所以本站的「状态 ≠ 上下文」在这里被官方拆成三块：
    durable run（引擎）、chat thread（Persistence）、上下文压缩（compaction）。

    **未知：compaction 的具体裁剪策略与阈值，官方文档未给出默认值**
    **核验：**README 与 durable 页已查。

  permissions: >-
    **人工介入是「工具级审批」，沙箱在 Harness / Monty，凭据默认本地。**

    **HITL 工具审批**是官方 overview 第 8 条：

    "**Human-in-the-Loop Tool Approval**: Easily lets you flag
    that certain tool calls **require approval** before they can proceed, **possibly depending on tool
    call arguments, conversation history, or user preferences**."

    这一条出自 deferred tools 页。
    它与本站其它对象的层次不同：**它拦的是「这次工具调用能不能跑」，
    且可依据参数与历史动态判定。**

    **guardrails** 也随 Harness 提供（官方 Harness 能力列表含 guardrails）。

    **沙箱**：官方 **Monty** 是 "a sandboxed Python interpreter that runs model-written code"。
    Harness 的 `Shell` 是 **allowlisted**，`FileSystem` 是 **workspace-rooted**。

    **凭据**：MCP 默认本地运行，官方称 "keeping credentials, hooks, and tracing under your control"。

    **未知：核心 SDK 是否有进程/网络级沙箱、以及内置认证/权限边界，官方未说明**
    **核验：**overview、durable、mcp 三页已查。
    企业级权限与审计由 Logfire / Gateway 那侧承担。
  fit: >-
    **适合：需要类型安全的 Python 团队，以及要把 agent run 变成 durable 的人。**

    - **Python 团队**要做「类型安全的结构化输出 + 依赖注入」的 agent
    - 需要把 agent run 变成 **durable**（跨重启、长等待、HITL），
      且想用自己已有的引擎，如 Temporal / DBOS / Prefect

    - 要做多 agent（agent delegation / hand-off / graph）
    - 需要 MCP 一等支持，且希望 MCP **本地运行以控制凭据**
    - 既要薄 agent loop，又想要官方现成的 Harness（Coder / Researcher / memory / guardrails）
    - 想要 Pydantic 验证从数据层一路贯穿到 agent 输出

    **不适合：非 Python 栈、极简主义者，以及需要核心 SDK 自带沙箱的人。**

    - TypeScript / Node 团队（该看 [Mastra](./mastra.md)）
    - 追求最小依赖、不想引入 Pydantic 与可选能力包（它的世界观是 typed end to end）
    - 想完全避免任何商业组件 —— Logfire 与 Gateway 是官方推荐但**可选**，
      官方声明 OTel 与自托管都支持

    - 需要框架开箱自带进程级沙箱与网络策略 —— 沙箱在 Harness / Monty，非核心 SDK

pitfalls:
  - 以为它是「纯薄 harness」—— 官方今另有 Pydantic AI Harness，把 memory/guardrails/sub-agents/上下文管理打包成 capabilities，还附完整 Coder
  - 把「durability」当成「存对话」—— 官方明文 "Durability is not storage"：durable engine 只保证 run 存活，线程持久化是另一模块
  - 以为 evals / 观测必须用 Pydantic Logfire —— 官方声明是标准 OpenTelemetry，任何 OTLP 后端都能接
  - 以为 A2A 是长期内建能力 —— 官方已把 `to_a2a()` 标为 1.x 弃用、2.0 移除，`fasta2a` 迁到 datalayer/fasta2a

tags: [Python, 开源, MIT, 编程底座, 通用harness, 类型安全, MCP, A2A, durable-execution, 持久化, 状态管理, 图执行, 子代理, 多Agent, eval, HITL, human-in-the-loop, 沙箱, 集成生态]
related: [filesystem]

sources:
  - label: pydantic/pydantic-ai · 仓库（12,978★，MIT，Python，核验 2026-10-08）
    url: https://github.com/pydantic/pydantic-ai
    kind: repo

  - label: 主 README（"Python AI SDK / typed agent loop"、model-agnostic 清单、durable execution 八引擎、Harness、Coder）
    url: https://github.com/pydantic/pydantic-ai
    kind: docs

  - label: 官方文档 · Overview（Why use Pydantic AI 十二条、类型安全、MCP/A2A、HITL、durable execution）
    url: https://pydantic.dev/docs/ai/overview/
    kind: docs

  - label: 官方文档 · Models and Providers（provider 目录表、`<provider>:<model>`、ModelProfile、fallback model、本地/网关）
    url: https://pydantic.dev/docs/ai/models/overview/
    kind: docs

  - label: 官方文档 · Durable Execution（八引擎、每个模型/工具调用为 durable 单元、"Durability is not storage"）
    url: https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/
    kind: docs

  - label: 官方文档 · Graphs（pydantic-graph，可独立于 pydantic-ai 使用；类型化状态机）
    url: https://pydantic.dev/docs/ai/graph/graph/
    kind: docs

  - label: 官方文档 · Pydantic Evals（code-first 评估、datasets/cases/evaluators、trajectory 评估）
    url: https://pydantic.dev/docs/ai/evals/evals/
    kind: docs

  - label: 官方文档 · MCP（连 MCP server、被暴露为 MCP server、MCP capability 默认本地运行、native=True）
    url: https://pydantic.dev/docs/ai/mcp/overview/
    kind: docs

  - label: 官方文档 · Dependencies（类型安全依赖注入、RunContext、可覆盖以便测试）
    url: https://pydantic.dev/docs/ai/core-concepts/dependencies/
    kind: docs

  - label: 官方文档 · Multi-agent Applications（五个复杂度层级：单 agent、delegation、hand-off、graph、Deep Agents）
    url: https://pydantic.dev/docs/ai/guides/multi-agent-applications/
    kind: docs

  - label: 官方文档 · Agent2Agent (A2A)（to_a2a 1.x 弃用、2.0 移除；fasta2a 迁至 datalayer/fasta2a）
    url: https://pydantic.dev/docs/ai/integrations/a2a/
    kind: docs

  - label: 官方定价页（核验 2026-10-08：Pydantic 库永久 MIT 免费；Logfire 免费档含 1,000 万 spans/月、另有 Pro 档；报价按 D9 口径不存）
    url: https://pydantic.dev/pricing/
    kind: pricing

  - label: Releases（v2.54.0 @ 2026-10-02）
    url: https://github.com/pydantic/pydantic-ai/releases
    kind: changelog

link:
  url: https://ai.pydantic.dev
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
  direct_note: 官网直连实测 200；PyPI 实测可达。
  direct_note_en: official site measured 200 direct; PyPI measured reachable.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**Pydantic AI 是 Pydantic 出的 Python agent 库。**

主打类型安全。官方自述把两个关键词并在一起 ——

> **Pydantic AI** is the Python AI SDK: a **typed**, extensible **agent loop**
> with every model a string swap away.

「typed」是它的世界观：Pydantic 原生贯穿数据层到 agent 输出。
「agent loop」是它的形态：**给原语，不给你一个成品**。

它与 [OpenAI Agents SDK](./openai-agents-sdk.md) 同属这一档。
但它把「类型安全」和「durable execution」两点做到明显更深。

## 与 OpenAI Agents SDK 的对照：本站最该给读者看的一张表

两者都是「给你 agent loop 的 Python 库」，风格相近。差异点很具体：

| | OpenAI Agents SDK | **Pydantic AI** |
|---|---|---|
| 类型体系 | 可选 dataclass / Pydantic 输出 | **Pydantic 原生**：typed 输出 + typed 依赖注入 + typed tools |
| 非 OpenAI 模型 | litellm / any-llm 适配器 | **provider 目录原生**：`<provider>:<model>` 字符串切换，含本地 Ollama/vLLM |
| durable execution | 无独立引擎（自建） | **官方八种引擎**（Temporal/DBOS/Prefect/Restate/AWS Lambda/Kitaru/Airflow/Absurd） |
| 上层能力 | primitives-only | **另有 Pydantic AI Harness**（memory/guardrails/sub-agents/compaction + 现成 Coder） |
| 观测 | Traces 默认上报 OpenAI 后端 | **标准 OpenTelemetry**，任何 OTLP 后端；Logfire 可选 |

**一句口诀**：要 Python 的「类型安全 + durable」选 Pydantic AI；
要极简、要 guardrails 内建、认 OpenAI 生态选 OpenAI Agents SDK。

## model-agnostic：provider 目录是官方的第一卖点

**官方 overview 原文**：

> **Model-agnostic**: Supports **virtually every** model and provider:
> OpenAI, Anthropic, Gemini, DeepSeek, Grok, Cohere, Mistral, and Perplexity;
> Azure AI Foundry, Amazon Bedrock, Google Cloud, **Ollama**, LiteLLM, Groq, OpenRouter,
> Together AI, Fireworks AI, Cerebras, Hugging Face, GitHub, Heroku, Vercel, Nebius,
> OVHcloud, Alibaba Cloud, and SambaNova.

用法是前缀字符串 `Agent('openai:gpt-5.2')`。
换模型是 "a string swap away"，也就是改一个字符串。

官方 models/overview 页有完整的 **provider 目录表**。
**Ollama / vLLM / LiteLLM 这些本地与自托管路径都在其中。**

⚠ **一处官方自己划的边界**：能力**不保证跨 provider 等价**。

> "Feature support depends on the model and API you select, even when two services use the same API format."

## durable execution：官方八引擎，且「每个模型与工具调用都成为 durable 单元」

这是它区别于 OpenAI Agents SDK 的核心。
**官方 durable execution 页原文**：

> Pydantic AI allows you to build **durable agents** that can **preserve their progress across
> transient API failures and application errors or restarts** ...
> Each engine wraps **every model request and tool call as its own durable unit**.

引擎清单（README 原文）：**Temporal、DBOS、Prefect、Restate、AWS Lambda、Kitaru、Airflow、Absurd**。
前五个 "co-maintained with the vendor teams"。
第三方还可走 **backend builder**，自接引擎。

⚠ **必须读出来的一条边界**：官方专设一句 ——

> **Durability is not storage.** A durable engine keeps one run alive across crashes and restarts.
> It **does not store your chat threads**: saving a conversation and picking it up later is
> a different problem ... laid out in **Persistence**.

即：**durable run 与对话线程持久化是两件事**，正是本站「状态 ≠ 上下文」的同构表达。

## MCP：两个方向都支持，且默认本地运行以控制凭据

官方 mcp/overview 页写了两个方向：

- ① agent 连 MCP server，用它的工具
- ② agent 被放进 MCP server

推荐做法是 **`MCP` capability**。官方称：

> It **runs the MCP server locally by default** — keeping credentials, hooks, and tracing
> **under your control** — and lets you opt into the model provider's **native MCP support**
> with a single `native=True` flag.

低层可用 `MCPToolset`（`toolsets=[...]`）。
**「默认本地」这点对凭据可控性很有价值**。
与**「把凭据交给 provider 原生 MCP」**相比，这是一个可选取舍。

## A2A：官方已开始退场，注意时点

这一条要写清，否则会误判为长期内建能力。
官方 integrations/a2a 页大标题就是：

> **Deprecated in 1.x, removed in 2.0**

- `Agent.to_a2a()` 与 `pydantic-ai-slim[a2a]` 已弃用，2.0 移除。
- `fasta2a` 现由 **datalayer/fasta2a** 维护。
  自 v0.6.1 起附带 Pydantic AI bridge（`agent_to_a2a`）。

所以「Pydantic AI 支持 A2A」这句话，要补上**版本时点**才准确。

## Harness 与 Graph 是两个独立上层

- **Pydantic AI Harness**：官方称把 memory、guardrails、sub-agents、planning、
  context management（compaction）、persistence 打包成 **capabilities**，
  并附现成的 **Coder / Researcher** 完整 agent。

  官方也强调 Coder 不是黑盒。**官方原文**："use it whole, or use the blocks it bundles directly; the two are equivalent"。

- **`pydantic-graph`**：官方 graphs 页称它**可独立于 pydantic-ai 使用** ——
  "it has **no dependency on `pydantic-ai`** and can be considered as a pure graph-based state machine library"。
  官方还幽默地提醒：图是 nail gun，不是所有任务的正确工具。

  结论：**这两块都是从核心库上长出来的可选层**，这也是本站仍按 coding-base 归档的理由。

## 适合与不适合

**适合**这几种情况：

- Python 团队要「类型安全的结构化输出 + 依赖注入」
- 要把 agent run 变成 durable，用自己已有的引擎
- 做多 agent（delegation / hand-off / graph）
- 要 MCP 一等支持，且希望默认本地运行
- 既要薄 agent loop，又想要官方现成 Harness

**不适合**这几种情况：

- TypeScript / Node 团队（看 [Mastra](./mastra.md)）
- 追求最小依赖、不想引入 Pydantic 世界观
- 想完全避开任何商业组件（Logfire / Gateway 官方推荐但可选）
- 需要核心 SDK 自带进程级沙箱与网络策略

## 核验说明

`confidence: partial` 的依据：

**为什么仍是 partial**：八维已从官方页核到结论。
但仍有若干处**官方确实没写**、只能记「官方未说明」的项：

- 核心 SDK 不经 Harness 时的文件访问默认边界
- 核心 SDK 是否有进程/网络级沙箱与内置权限边界
- compaction 的默认裁剪策略
- Gateway 的加价费率
- 八种 durable 引擎之间的功能对齐度

这些不是「没查到」，是官方文档本身未给，故不足以升到 verified。

**本轮核到的官方页**：

- 仓库 README（定位、model-agnostic 清单、durable 八引擎、Harness、Coder 示例）
- `docs/ai/overview`（Why use 十二条 + bank support 示例）
- `docs/ai/models/overview`（provider 目录表、ModelProfile、fallback）
- `docs/ai/capabilities/durable_execution/overview`
- `docs/ai/graph/graph`
- `docs/ai/evals/evals`
- `docs/ai/mcp/overview`
- `docs/ai/core-concepts/dependencies`
- `docs/ai/guides/multi-agent-applications`
- `docs/ai/integrations/a2a`
- 官方定价页 `pydantic.dev/pricing`
- releases（`v2.54.0` @ 2026-10-02）

**核验方法**：WebFetch 打开各官方页与 GitHub API（仓库元数据、releases）。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按编程底座 + 类型安全 / durable 维度定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 最小 hello agent 要几个文件、多少行 | 量化「薄 agent loop」的真实上手成本 |
| 2 | 给一个 Pydantic 输出模型，验证 run 必返回该类型 | 官方卖点是 typed end to end，要验证「返库即类型」 |
| 3 | 接 Ollama 本地模型跑通一个带工具与结构化输出的 agent | 官方目录单列 Ollama，验证真实可行性 |
| 4 | 用 TemporalDurability 跑一个长任务，kill 进程后续跑 | 官方 durable 承诺的核心，必须验证 |
| 5 | agent delegation / hand-off / graph 三种多 agent 写法代码量对比 | 官方给五种复杂度层级，验证选型建议 |
| 6 | MCP capability 默认本地 vs `native=True` 的凭据与行为差异 | 官方强调默认本地保凭据可控，值得验证 |

## 未知项清单

- 核心 SDK 不经 Harness 时的文件访问默认边界（官方未说明，已查 overview 与 harness 页）
- 核心 SDK 是否有进程/网络级沙箱与内置权限边界（官方未说明，沙箱在 Harness / Monty）
- Harness compaction 的默认裁剪策略与阈值（官方未说明）
- Pydantic AI Gateway 的计费细节（官方定价页未单列；费率按 D9 口径本站不采）
- 八种 durable 引擎之间的功能对齐度（官方未说明）
- 不同 provider 之间行为完全等价性（官方已声明「取决于所选模型与 API」）
- A2A 移除后官方在 2.0 的替代路线（官方指向 datalayer/fasta2a）

## 相关条目

- [OpenAI Agents SDK](./openai-agents-sdk.md) — **本站最该对照的一对**：同为 Python 的薄 agent loop 库；Pydantic AI 的差异点是 Pydantic 原生类型安全 + 官方八引擎 durable execution。
- [Mastra](./mastra.md) — 另一语言的对位：TypeScript 的 batteries-included 全栈框架 vs Python 的类型安全 agent loop，两边的「第一决策点」答案不同。
- [LangGraph](./langgraph.md) — 编排层对照：LangGraph 每 superstep 落盘、HITL 改状态；Pydantic AI 的 `pydantic-graph` 走类型化状态机，durable execution 交给外部引擎。
- [Deep Agents](./deepagents.md) — 官方 multi-agent 页把 Deep Agents 列为第五种（最自治）多 agent 形态；Pydantic AI 自己也有 Harness，两者都在「自治 + 文件 + 子代理」这一侧。
