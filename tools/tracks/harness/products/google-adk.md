---
id: google-adk
track: harness
tasks: ["build-agent"]
family: orchestration
name: Google ADK（Agent Development Kit）
vendor: Google
homepage: https://google.github.io/adk-docs/
mark: GA
accent: "#4285F4"
stars: 21688
license: Apache-2.0
latest_version: 2.10.0
language: Python（主）/ TypeScript（1,426★）

# 支持哪些模型 provider（本站第一决策点）
providers:
  - 优化对象是 Gemini。README 原文 "While optimized for Gemini"
  - 官方称 model-agnostic。README 原文 "ADK is model-agnostic, deployment-agnostic"
  - 非 Gemini 模型走官方 LiteLLM 适配层（`LiteLlm` 包装类），覆盖第三方 provider（2026-10-08 核验）
  - ⚠ "optimized for Gemini" 具体优化了什么，官方未说明
  - ⚠ 非 Gemini 模型下的工具调用 / structured output 可靠性，官方未给出对比

layer_position: >-
  **它是本站收录的第一个真正的编排框架（orchestration 家族）。**

    前三个对象（OpenAI Agents SDK / Deep Agents / Claude Agent SDK / Codex SDK）
    给的都是「怎么跑一个 agent」，ADK 给的是
    「怎么把多个 agent 组织成一个有分支、有循环、有人工介入的流程」。

  **关键词是 deterministic（确定性）。**

    它要解决的不是「agent 能不能干活」，而是
    「多个 agent 组成的流程在多次运行之间是否可重复、可预期」。

  证据是它 README 的第一项特性 **Workflow Runtime** 原文：

  > "A graph-based execution engine for composing
  > **deterministic execution flows** for agentic apps,
  > with support for routing, fan-out/fan-in,
  > **loops**, **retry**, **state management**,
  > **dynamic nodes**, **human-in-the-loop**,
  > and **nested workflows**."

  **这与本站反复讲的分野直接对应。**

    图执行引擎管的是控制流（状态）。长上下文压缩是另一件事。

    ADK 在 1.16+ 给出 Context Compaction
    —— 滑动窗口机制，2026-10-08 核验。

  ⚠ **同厂还有 TypeScript 版。** `google/adk-js`（Apache-2.0，1,426★，独立仓，核验 2026-10-01）。

  按本站「一个对象 = 一套决策依据」的粒度，本档只收录 Python 主体。

  另有样例仓 `google/adk-recipes`（10,404★）。README 里叫 adk-recipes，
  仓库实际名`adk-recipes` → 显示为 `google/adk-recipes`。

axes:
  model_access: >-
    **官方口径：为 Gemini 优化，但它同时是 model-agnostic。**

      README **原文**："While optimized for Gemini, ADK is **model-agnostic**,
      deployment-agnostic, and compatible with
      other frameworks."

    **所以非 Gemini 模型能接。** 官方「Models for Agents」页给出三条接入机制：

    - **① 直接字符串 / 注册表** —— Gemini、Claude、Agent Platform 托管模型
    - **② model connectors** —— `LiteLlm` / `ApigeeLlm` 包装类
    - **③ 模型路由** —— 运行时动态选型 + 出错自动切换

    **官方原文**："providing a standardized, OpenAI-compatible interface to over 100+ LLMs"

    本地 / 自托管模型有官方专页：Ollama、vLLM、LiteRT-LM。

    ⚠ **官方未说明**："optimized for Gemini" 优化了什么。

    ⚠ 也未给出非 Gemini 模型下工具调用与
    structured output 的可靠性对比。
    **已查** Models 页与 LiteLLM 页。

  runtime: >-
    **四种运行形态，全部由 `adk` CLI 或容器提供（README 核验）。**

    - **① 交互式 CLI** —— `adk run <agent-folder>`
    - **② 内建 Web UI** —— `adk web <agent-folder>`。官方说明支持
      multi-agent directories 或直接指向单个 agent 文件夹

    - **③ Development UI** —— 内建的开发调试台
    - **④ 容器化部署** —— `adk deploy docker --with_ui <agent-folder>`

    **官方原文**："A built-in development UI to help you test, evaluate, debug, and showcase your agent(s)"

    ⚠ 这四种都是**你本地或你的云上进程**。ADK 本身不提供托管服务。

    托管要靠 Vertex AI Agent Engine 或 Cloud Run
    —— 那是 Google 的产品，不是本框架的。
  local_files: >-
    **官方对「文件」的答案是抽象层 Artifacts，不是裸文件系统（本轮已核验）。**
    换句话说，它自己不读写磁盘。

    官方 Artifacts 页 **原文**：

    **官方原文**：Artifacts "represent a crucial mechanism for managing named, versioned binary data associated either with a specific user interaction session or persistently with a user"

    **落盘位置由你选的 ArtifactService 决定。** **官方原文**："Their storage and retrieval are managed by a dedicated Artifact Service"

    两个后端：

    - `InMemoryArtifactService` —— 重启即丢
    - `GcsArtifactService` —— 持久、带版本

    **ADK 是库，不内置 Read/Write/Bash 这类文件工具。**
    磁盘访问要靠自己写 function tool，或接 MCP。
    官方 MCP 页示例正是 filesystem MCP server。

    ⚠ **官方未提供**沙箱机制或文件系统权限模型（已查 Artifacts、tools、deploy 各页）。
    默认访问边界取决于你自己接的工具。
  background: >-
    **它不托管后台。官方有两条明确证据：会话 / 状态持久化，以及中断续跑（Resume）。**

    **① 持久化** —— SessionService 分三档：

    - `InMemorySessionService` —— **官方原文**：
      "All conversation data is lost if the application restarts"

    - `DatabaseSessionService` —— "Data survives application restarts"
    - `VertexAiSessionService` —— 托管

    MemoryService 另有 InMemory 与
    Vertex AI Memory Bank 两档。

    **② 续跑** —— ADK Python 1.16+ 可给 App 配
    `ResumabilityConfig(is_resumable=True)`。

    官方 **原文**：

    **官方原文**："allows an agent workflow to pick up where it left off"

    用 Invocation ID 恢复。
    经 `/run_sse` 或 `runner.run_async` 都可以。

    **ADK 本身是库、不托管。** 真后台要靠部署到 Cloud Run /
    Vertex AI Agent Engine —— 那是你的云资源。

    ⚠ 官方两条边界：

    - Resume 目前 "not currently supported" 从 Web UI / CLI 触发
    - 工具可能被重复执行（官方提醒有副作用的工具要自己防重）
  tools: >-
    **工具生态是它最强调的部分，MCP 在官方文档里是一等能力。**

    README **原文**：

    "Utilize pre-built tools, custom functions,
    **OpenAPI specs**, **MCP tools** or
    integrate existing tools"

    官方另有专门的 MCP tools 文档页。
    它给出 `McpToolset` 类，且是**双向**的：

    - 让 ADK 作 MCP 客户端，接外部 MCP server
      （示例含 filesystem / Google Maps MCP server）

    - 也能把 ADK 工具包成 MCP server 对外暴露
    - 传输覆盖 stdio 与 Streamable HTTP

    **工具级人工确认（HITL）** **官方原文**："a tool confirmation flow (HITL) that can guard tool execution with explicit confirmation and custom input"

    对应文档 `tools/confirmation`。
    机制细节见 permissions 轴。

    **这是本站已收录对象里少见的「工具级人工确认」。**
    它与 OpenAI Agents SDK 的 input/output guardrail
    是不同层次的东西。
  context: >-
    **官方对 session / memory 有清晰区分，且有专门的上下文压缩特性。**

    官方 sessions 页三句 **官方原文**：`Session` 是 "single, ongoing interaction"，
    `State` 是 "data within the current conversation"，
    `Memory` 是 "searchable, cross-session information"

    前两者由 `SessionService` 管。
    长期知识由 `MemoryService` 管。

    **压缩**：ADK Python 1.16.0+ 提供 Context Compaction。**官方原文**："reduce the size of context as an agent is running by summarizing older parts of the agent workflow event history"

    机制是**滑动窗口**：

    - 配 `EventsCompactionConfig(compaction_interval, overlap_size)`
    - 到阈值即摘要更早的 event
    - `summarizer` 可换模型

    ⚠ 按本站「状态 ≠ 上下文」：`state` 管流程数据。
    Compaction 管历史压缩。这是两套机制，官方也分开描述。
  permissions: >-
    **官方明确的机制是「工具级人工确认」Tool Confirmation（HITL）。**

    文档 `tools/confirmation`（v1.14.0 起，标注 **Experimental**）**官方原文**："allows an ADK Tool to pause its execution and interact with a user or other system for confirmation"

    **两种用法已核验。**

    - **① 简单确认** —— `FunctionTool(..., require_confirmation=True)` 要一次 yes/no；
      也可传入返回布尔值的函数（如"金额 > 1000 才问"）

    - **② 高级确认** —— `tool_context.request_confirmation(hint, payload)`。
      可暂停工具、收集结构化数据（如审批天数）后再续跑

    无 UI 时可以用 ADK server 的 `/run` 或
    `/run_sse` REST 端点远程确认。

    **这只是「执行前问一下」，不是边界划定。**
    官方未提供沙箱或文件系统权限模型。
    **已查** confirmation、Artifacts、deploy 各页。

    ⚠ 官方已知限制：DatabaseSessionService 与
    VertexAiSessionService 不支持该特性。
  fit: >-
    **适合这些情况。**

    - 要把多个 agent 组织成**有分支、有循环、有人工介入的确定性流程**
    - 要用代码优先（code-first）定义 agent 与工具，便于测试与版本管理
    - 团队在 Google 生态内（Cloud Run / Vertex / Gemini）
    - 需要内建 eval 与开发 UI
    - 希望用同一套框架覆盖 Python 与 TypeScript
    - 需要工具级人工确认、会话持久化与中断续跑

    **不适合这些情况。**

    - 只跑单个 agent、不需要图结构 —— 用 OpenAI Agents SDK 或 Deep Agents 更轻
    - 需要框架内置的文件 / 网络沙箱边界 —— **官方未提供**。
      文件访问靠 Artifacts 抽象或自接工具

    - 想开箱即用接自托管权重，又不愿经 LiteLLM 适配层

pitfalls:
  - 以为是「Google 版 OpenAI Agents SDK」—— **它是编排框架**，核心资产是 Workflow Runtime 的图执行引擎，不是单 agent 原语
  - 把 `state management` 读成「有上下文管理」—— 前者是流程状态；后者是独立的 Context Compaction 机制（1.16+）
  - 把 MCP 当成它的核心依赖 —— README 只把 MCP 列为工具来源之一，与 OpenAI Agents SDK 把 `mcp>=1.19.0` 放进 `dependencies` 不是一回事
  - 以为 Tool Confirmation 等于沙箱 —— 它是「执行前问一句」，不是边界划定
  - 以为开源免费等于零成本 —— Cloud Run / Vertex Agent Engine 的云费用自理，且有 `GOOGLE_GENAI_USE_ENTERPRISE` 开关
  - 以为只有 Python —— 还有独立的 TypeScript 仓（`google/adk-js`，1,426★），本站按粒度只收录 Python 主体
  - 搞混仓库名 —— 样例仓显示为 `google/adk-recipes`，描述里写的是 adk-samples

tags: [Python, TypeScript, 开源, Apache-2.0, 编排框架, 图执行, 工作流, 多Agent, HITL, 工具确认, eval, CloudRun, MCP]
related: [gemini-cli]

sources:
  - label: google/adk-python · 仓库（21,688★，Apache-2.0，核验 2026-10-01）
    url: https://github.com/google/adk-python
    kind: repo

  - label: 主 README（Workflow Runtime / Task API / Tool Confirmation / 部署方式 / eval）
    url: https://github.com/google/adk-python/blob/main/README.md
    kind: docs

  - label: 官方文档首页
    url: https://google.github.io/adk-docs/
    kind: docs

  - label: 官方文档 · Tool Confirmation（HITL）（require_confirmation / request_confirmation 机制、Experimental、已知限制，核验 2026-10-08）
    url: https://google.github.io/adk-docs/tools/confirmation/
    kind: docs

  - label: 官方文档 · Models for Agents（三条模型接入机制：直接注册表 / model connectors / 模型路由，核验 2026-10-08）
    url: https://google.github.io/adk-docs/agents/models/
    kind: docs

  - label: 官方文档 · LiteLLM connector（`LiteLlm` 包装类，OpenAI-compatible，over 100+ LLMs，核验 2026-10-08）
    url: https://google.github.io/adk-docs/agents/models/litellm/
    kind: docs

  - label: 官方文档 · Sessions & Memory（Session/State/Memory 区分、SessionService 三档持久化，核验 2026-10-08）
    url: https://google.github.io/adk-docs/sessions/
    kind: docs

  - label: 官方文档 · Context Compaction（滑动窗口摘要，v1.16.0+，核验 2026-10-08）
    url: https://google.github.io/adk-docs/context/compaction/
    kind: docs

  - label: 官方文档 · Artifacts（ArtifactService、InMemory/GCS 落盘，核验 2026-10-08）
    url: https://google.github.io/adk-docs/artifacts/
    kind: docs

  - label: 官方文档 · Resume stopped agents（ResumabilityConfig、Invocation ID 续跑，核验 2026-10-08）
    url: https://google.github.io/adk-docs/runtime/resume/
    kind: docs

  - label: 官方文档 · MCP tools（McpToolset、ADK 作 MCP 客户端 / ADK 工具暴露为 MCP server，核验 2026-10-08）
    url: https://google.github.io/adk-docs/tools/mcp-tools/
    kind: docs

  - label: 官方文档 · Agent Config（不写代码建agent）
    url: https://google.github.io/adk-docs/agents/config/
    kind: docs

  - label: Google 官方 codelab · Building AI Agents with ADK: The Foundation（**`GOOGLE_GENAI_USE_ENTERPRISE` / `GOOGLE_CLOUD_PROJECT` / `GOOGLE_CLOUD_LOCATION` 三个变量的官方逐条说明，含 "enable billing" 表述**，核验 2026-10-01）
    url: https://codelabs.developers.google.com/devsite/codelabs/build-agents-with-adk-foundation
    kind: docs

  - label: Google Cloud 文档 · Manage sessions with Agent Development Kit（同一组三变量的另一种取值写法 TRUE / True，核验 2026-10-01）
    url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-adk
    kind: docs

  - label: google/adk-js · TypeScript 版（1,426★，Apache-2.0）
    url: https://github.com/google/adk-js
    kind: repo

  - label: google/adk-recipes · 样例集（10,404★）
    url: https://github.com/google/adk-recipes
    kind: repo

  - label: Releases（v2.10.0 @ 2026-09-25）
    url: https://github.com/google/adk-python/releases
    kind: changelog

link:
  url: https://google.github.io/adk-docs/
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
  direct_note: 官网 adk.dev 直连实测 200。
  direct_note_en: adk.dev measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**一句话说清它是什么**：

Google ADK 是「**code-first** 的 agent 编排框架，核心资产是一个图执行引擎」。
它的作用是把多个 agent 组织成一条流程，不替你跑单个 agent。

**官方 README 的第一项特性就说明了它的身份：**

> **Workflow Runtime**: A graph-based execution engine for composing **deterministic
> execution flows** for agentic apps, with support for routing, fan-out/fan-in,
> **loops**, **retry**, **state management**, **dynamic nodes**, **human-in-the-loop**,
> and **nested workflows**.

## 为什么把它归到 orchestration，而不是 coding-base

本站前四个编程底座是 OpenAI Agents SDK、Deep Agents、
Claude Agent SDK、Codex SDK。

它们回答的都是同一个问题：

> 怎么跑一个 agent？

ADK 回答的是另一个问题：

> 怎么把多个 agent 组织成一个有分支、有循环、有人工介入的流程？

**关键词是 deterministic**：它要解决的不是「agent 能不能干活」。
（deterministic 就是「确定性」。）

它要解决的是「多个 **agent** 组成的流程，在多次运行之间是否可重复、可预期」。

这也直接落到本站关心的分野上：

| 本站关注的面 | ADK 给的 |
|---|---|
| **状态**（流程控制） | ✅ 图执行引擎：routing / loops / retry / state management / nested workflows |
| **上下文**（长任务压缩） | ✅ 1.16+ 的 Context Compaction：滑动窗口摘要更早 event（`EventsCompactionConfig(compaction_interval, overlap_size)`），`summarizer` 可换模型 |

⚠ **不要把 `state management` 读成「有上下文管理」。**
这正是本站反复强调的那条分野。

## 工具生态：MCP 是其中一员，但量级要注意

**README 原文：**

> Utilize pre-built tools, custom functions, **OpenAPI specs**, **MCP tools** or integrate existing tools to give agents diverse capabilities, all for tight integration with the Google ecosystem.

⚠ **本站的判断（推断，未核验实现）**：README 把 MCP 与 OpenAPI specs **并列**。

这说明它接 MCP 的方式是「把 MCP 当作一种工具来源」。

这与 [OpenAI Agents SDK](./openai-agents-sdk.md) 不同。

那个把 `mcp>=1.19.0,<3` 直接放在 `dependencies` 里。
那是框架级依赖。

**两者不是同一量级的一等公民。**

### 一项值得单独看的官方能力：Tool Confirmation（HITL）

> A tool confirmation flow (HITL) that can **guard tool execution with explicit confirmation and custom input**.

文档在 `tools/confirmation`。

**这是本站已收录对象里少见的「工具级人工确认」。**
input/output guardrail 与它是不同层次的东西：

- guardrail 是**校验内容**（这个输入 / 输出合不合规）
- tool confirmation 是**拦执行**（这个工具要不要真跑，可以附带自定义输入）

## 部署：四条命令，从本地到 Google 云

**README 给的四种运行 / 部署形态全部核验：**

```bash
adk run<agent-folder>              # 交互式 CLI
adk web                <agent-folder>       # 内建 Web UI
adk deploy docker   --with_ui <agent-folder>         # 容器化
adk deploy cloud_run --with_ui <agent-folder>        # Cloud Run
```

**另有两个本站认为值得注意的点。**

**① 内建开发 UI 与内建 eval。**

**官方原文**：

> A built-in development UI to help you **test, evaluate, debug, and showcase** your agent(s)

**另有** `adk eval <agent-folder> <evalset.json>` 命令与 `.evalset.json` 配置格式。

**这是本站已收录对象里唯一把「评估」做成框架内建命令的。**
对「不要实测」的铁律来说，这类能力值得记一笔：它让用户能自己跑评测。

**② 有个部署级开关要注意，而且它本质上是「计费路径开关」。**

**README 的 Cloud Run 示例里出现了** `GOOGLE_GENAI_USE_ENTERPRISE=1`。

**本轮已核验清楚（2026-10-01，Google 官方 codelab 与 Cloud 文档）**：
它**不是「解锁企业功能」的开关**。

**它是一条路由开关：把请求从 Gemini Developer API 切到 Google Cloud 企业平台
（Gemini Enterprise Agent Platform / Vertex AI），计费口径随之改变。**

换句话说，改的是请求去向，不是功能权限。

**官方 codelab 对三个变量的说明原文：**

| 变量 | 官方含义 |
|---|---|
| `GOOGLE_GENAI_USE_ENTERPRISE` | "This tells the ADK that you intend to use Google's **Gemini Enterprise Agent Platform** service for your Generative AI operations." |
| `GOOGLE_CLOUD_PROJECT` | "ADK needs this to correctly associate your agent with your cloud resources and **enable billing**." |
| `GOOGLE_CLOUD_LOCATION` | 地域，如 `global` |

**最关键的一条。**

官方把 "enable billing" 明确写在
`GOOGLE_CLOUD_PROJECT` 上。

**那三个变量成组设上，agent 就落进你的 Google Cloud 项目并开始计费。**
不设则走 Gemini Developer API 那条路（它有另一套免费层与配额）。

**另外两点值得记**：

- **三个变量必须成组出现** —— 官方所有示例（README、codelab、Cloud 文档的
  Live API 指南）都是三个一起设，没有只设其一的写法

- **取值不统一** —— README 与 codelab 的 `.env` 写 `1`，
  Cloud 文档写 `TRUE` 或 `True`。按布尔语义皆真，但官方自己不一致这点值得注意

> ⚠ 仍未核验：Gemini 的具体单价。
> 以及 Vertex AI Agent Engine 与 Cloud Run 的实际费率。

## 本地文件与沙箱：本站最大的证据缺口

**README 讲工具生态时列的是** pre-built tools、custom functions、
OpenAPI specs、MCP tools。

那全是「怎么把工具接进来」。

它**没有把「读写本地文件」列为一项能力**。

它**也没有描述默认的文件访问边界**。

对比本站其它对象在这块的做法：

- **OpenHands** 给了明确的 Docker 沙箱形态与 API key 机制，
  且在无沙箱安装选项上挂 WARNING

- **Codex SDK** 源码里有三档 `SandboxMode` 枚举
- **ADK 这边本站没有拿到任何沙箱或权限边界的官方表述**

⚠ **官方未提供**：默认沙箱机制、文件系统权限模型、网络访问控制。
**如果你选它，容器隔离要自己确认。**

## 同厂双版本 + 样例仓

| 仓库 | 用途 | 核验（2026-10-01） |
|---|---|---|
| `google/adk-python` | Python 主体（本档收录） | 21,688★ · Apache-2.0 |
| `google/adk-js` | TypeScript 版 | 1,426★ · Apache-2.0 |
| `google/adk-recipes` | 样例集（描述里写 adk-samples） | 10,404★ |

⚠ 按本站「一个对象 = 一套决策依据」的粒度，**只收录 Python 主体**。

## 适合与不适合

**适合：**

- 要把多个 agent 组织成有分支、有循环、有人工介入的确定性流程
- 要 code-first 定义逻辑，便于测试与版本管理
- 团队在 Google 生态内
- 需要内建 eval 与开发 UI

**不适合：**

- 只跑单个 agent、不需要图结构 —— 用 OpenAI Agents SDK 更轻
- 需要文件级 / 网络级沙箱边界，但不想自己实现 —— 官方未提供沙箱
- 长上下文压缩依赖 1.16+ 的 Context Compaction（滑动窗口）

## 核验说明

`confidence: partial` 的依据。

**为什么不是 verified。** 三维本轮已核到官方机制：

- `local_files` —— Artifacts 抽象
- `context` —— 1.16+ 的 Context Compaction
- `permissions` —— Tool Confirmation

但 `permissions` 只有「执行前确认」。
官方未提供沙箱或文件系统权限模型。

其余缺口集中在**费率与部署语义**：

- Gemini 单价与 Vertex AI Agent Engine / Cloud Run 的实际费率
- 跨进程跨机续跑语义
- 分布式状态存储

> **已核验**：仓库存在与星数（21,688）、许可（Apache-2.0，经 license API）、
> 最近推送（2026-10-01，仍活跃）、最新版 **v2.10.0**（releases @ 2026-09-25）、
> README 全文的六项特性列表与四类运行形态、两种 `adk deploy` 命令与
> `GOOGLE_GENAI_USE_ENTERPRISE` 环境变量、`adk eval` 命令与 `.evalset.json` 格式、
> `google/adk-js`（1,426★ · Apache-2.0）与 `google/adk-recipes`（10,404★）两仓元数据

> **本轮（2026-10-01）补上的**：`GOOGLE_GENAI_USE_ENTERPRISE` 的确切含义。
> 它是**计费路径开关**（切到 Gemini Enterprise Agent Platform / Vertex AI），
> 不是企业功能开关。官方把 "enable billing" 挂在 `GOOGLE_CLOUD_PROJECT` 上，
> 三个变量须成组设置。来源为 Google 官方 codelab 与 Cloud 文档。

> **未核验**：非 Gemini 模型下的工具调用与 structured output 可靠性（对齐度）、
> 默认沙箱与文件权限模型、网络访问控制、
> 跨进程/跨机续跑语义、分布式状态存储、
> MCP 接入的实现层次（框架级依赖 vs 工具来源）、
> Gemini 单价与 Vertex AI Agent Engine / Cloud Run 的实际费率

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按编排框架维度定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 容器部署后的默认文件与网络权限边界 | 补上本站最大的缺口，也是选型前提 |
| 2 | 跑 `adk eval` 的最小完整案例 | 它是唯一内建 eval 的对象，值得看真实成本 |
| 3 | 流程中途 kill 进程后的恢复语义 | 官方有 retry / state management，但恢复粒度未核验 |
| 4 | Tool Confirmation 在长循环里的人工打断频率 | 官方说可 guard，但要测实际打断次数 |
| 5 | 换成非 Gemini 模型后工具调用与 structured output 的可靠性 | 官方说 model-agnostic，验证代价 |
| 6 | Python 版与 TS 版的能力差距 | 两个独立仓，官方没说是否对齐 |

## 未知项清单

- 默认沙箱机制、文件系统权限模型、网络访问控制
- 跨进程、跨机的任务续跑与恢复粒度
- 分布式部署下的状态存储方案
- MCP 接入的实现层次（框架级依赖 vs 工具来源）
- Python 与 TypeScript 版的能力对齐度
- Vertex AI Agent Engine 部署时状态的托管方式
- Gemini 单价与 Vertex AI Agent Engine / Cloud Run 的实际费率
  （`GOOGLE_GENAI_USE_ENTERPRISE` 的**含义**已核验，**费率**未核验）

- "optimized for Gemini" 具体优化了什么（官方未说明，已查 Models 页与 LiteLLM 页）
- 非 Gemini 模型下工具调用与 structured output 的可靠性对比（官方未给出）

## 相关条目

- [LangGraph](./langgraph.md) — **本站最该对照的一对**：同为图执行编排框架，且langgraph 的 checkpointer / interrupt 机制与 ADK 的 state management + HITL 是同类问题的两种答案。收录后者后本站才能给出编排框架内部的对照。
- [CrewAI](./crewai.md) — 同为编排框架，但 crewai 以「角色/任务/流程」的抽象为中心，ADK 以「图节点」为中心 —— 抽象层次不同。
- [OpenAI Agents SDK](./openai-agents-sdk.md) — 同为厂商系框架但形态相反：那个是单 agent 原语（primitives-only），ADK 是多 agent 编排。
- [OpenHands](./openhands.md) — 反面对照：OpenHands 是带 Web UI 的调度平台、也可接第三方 agent；ADK 是 code-first 的库。两者都能编排，但一个面向界面、一个面向代码。
