---
id: crewai
track: harness
tasks: ["build-agent"]
family: orchestration
name: CrewAI
vendor: CrewAI Inc
homepage: https://crewai.com
mark: CA
accent: "#EB6658"
stars: 59246
license: MIT
latest_version: 1.15.23
language: Python

# 支持哪些模型 provider（本站第一决策点）
providers:
  - 默认走 OpenAI API（README 明示）
  - 可接本地模型：官方点名 Ollama 工具（README 明示），LM Studio 亦可（README FAQ）
  - 原生 SDK 接入 5 家（OpenAI / Anthropic / Google Gemini / Azure / AWS Bedrock），
    其余走 LiteLLM 兜底（官方 Connect CrewAI to LLMs 页，本轮已核）

  - ⚠ 换 provider 之后 tool calling 与 structured output 的可靠性，官方未说明

layer_position: >-
  **本站三个编排框架里抽象层次最「业务化」的一个。**

  另两个（Google ADK、LangGraph）都用图/节点/状态这类系统词汇，
  CrewAI 用的是 **Crew（角色/目标/任务）与 Flow（事件驱动流程）** 这套业务比喻。

  官方自述：

  > Framework for orchestrating **role-playing**, autonomous AI agents.

  **它最独特的设计是双抽象并存**（README Key Features 前两条原文）：

  > **Crews for autonomy**: Model teams of specialized AI agents with **roles, goals, tools, and tasks**.

  > **Flows for control**: Build event-driven workflows with **state, branching, routing**, and production logic.

  官方对两者分工的说明很直白（README FAQ 原句）：

  > Crews provide **autonomous agent collaboration**, ideal for tasks requiring flexible decision-making and dynamic interaction.
  > Flows offer **precise, event-driven control**, ideal for managing detailed execution paths and **secure state management**.
  > You can **seamlessly combine both**.

  **这构成本站编排家族里最好用的一张对照轴**：

  | | Crew（自治） | Flow（控制） |
  |---|---|---|
  | 抽象 | 角色/目标/任务 | 事件、状态、分支、路由 |
  | 适合 | 需要灵活决策的协作 | 需要精确执行路径 |
  | 官方类比 | 团队协作 | 业务流程|

  **与本站「状态≠ 上下文」主张的关系**：Flow 明确管 state management。

  checklist 里把 **checkpointing** 与 memory 并列为「as your system grows」才需要加的能力 ——
  即**官方自己把它们定位成进阶项，不是默认机制**。这点与其他对象不同，值得单独记。

axes:
  model_access: >-
    **它的模型接入路径最具体。默认走 OpenAI API，本地模型官方点名了 Ollama 工具。**

    README 按这个顺序写。默认 OpenAI，另有多种连接方式，例如本地模型走 Ollama 工具。

    "CrewAI supports using various LLMs through a variety of connection options.
    By default your agents will use the **OpenAI API** when querying the model.
    However, there are several other ways to allow your agents to connect to models.
    For example, you can configure your agents to use a **local model via the Ollama tool**."

    FAQ 还补了一句：**LM Studio** 也能接。

    **官方原文**："Tools like Ollama and LM Studio allow seamless integration"

    **这条对本站读者特别有价值**：本地量化模型在这三个编排框架里，
    只有 CrewAI 在 README 首屏级别点名了具体工具。

    **完整 provider 清单已核到**（官方 `learn/llm-connections` 页），分两类：

    - **原生 SDK 接入 5 家** —— OpenAI、Anthropic、Google Gemini、Azure、AWS Bedrock
    - **其余走 LiteLLM 兜底**，装法 `uv add 'crewai[litellm]'`。官方另点名单列：
      Ollama、Mistral、Groq、Cohere、Hugging Face、Replicate、Together AI、
      Cloudflare Workers AI、DeepInfra、SambaNova、Nebius、NVIDIA NIMs。

      这条清单以 "And many more!" 结尾，指向 LiteLLM Providers 文档取全量列表

    另外，**官方页原文也给了默认模型**：

    **官方原文**："By default, CrewAI uses the `gpt-4o-mini` model."

    它由 `OPENAI_MODEL_NAME` 决定，未设即 gpt-4o-mini。换法两种：
    传字符串标识符（`llm='claude-2'`），或用 `LLM` 类配 model / base_url / api_key。
    本地片段官方写全：

    **官方示例**：`LLM(model="ollama/llama3.2", base_url="http://localhost:11434")`

    **未知：换 provider 后 tool calling / structured output 的可靠性，官方未说明。**
    （已查 `learn/llm-connections` 与 `concepts/llms` 两页，无 provider 间可靠性对比。）
  runtime: >-
    **它是纯库，官方口径是「从原型到生产不用换框架」。**

    安装是 pip 包（README Getting Started 走 pip install + crewai CLI），没有托管服务。

    "Move from experiment to production **without changing frameworks**."

    **状态持久化官方定位成「随系统成长再加」**，README 两处原文都带这个限定语：

    "Add tools, memory, **checkpointing**, and async execution **as your system grows**"

    "Add deterministic steps, human input, structured outputs, and **checkpointing as your system grows**"

    那是 README 的定位话术。

    **机制本身官方文档给得很细**。见官方 `concepts/checkpointing` 页：

    - **粒度**：事件驱动，默认 `on_events=["task_completed"]`，
      即**每完成一个 task 落一次盘**；`CheckpointConfig` 可改频率与上限

    - **落盘后端两个**：`JsonProvider`（每次一个文件，默认，写在 `./.checkpoints/`）、
      `SqliteProvider`（单个 SQLite 库，开 WAL，适合高频）

    - **开关**：`Crew` / `Flow` / `Agent` 都可传 `checkpoint`；子级默认继承父级，
      也可传 `False` 退出

    粒度是「每个完成的 task / method」，这正是本站要找的落盘粒度。
  local_files: >-
    **框架本身不内置文件系统能力，文件读写靠工具提供 —— 但工具的默认边界清楚。**

    **默认边界已核到**（官方 FileReadTool 页）。运行时传入的路径**必须落在 `base_dir` 内**。
    `base_dir` 默认是当前工作目录。`..` 与符号链接都会先解析再校验，

    so they cannot be used to escape

    两个例外：

    - 构造函数里写死的 `file_path` 属开发者声明，**可越过该限制**，但只放行这一个文件
    - 放开更大范围须显式 `base_dir='/data'`

    两个环境变量管逃生与锁死：

    - 逃生阀 `CREWAI_TOOLS_ALLOW_UNSAFE_PATHS=true` —— 进程级。

      官方称它会同时关掉所有 crewai-tools 的 SSRF 防护，不建议

    - 托管 worker 应用用 `CREWAI_TOOLS_FORCE_SAFE_PATHS=true` 锁死

    另有一组**多模态文件输入**（`crewai[file-processing]` extra，`Files` 页，**early access**）。
    可传图片 / PDF / 音频 / 视频 / 文本。

    **未知：容器部署时的默认权限，官方未说明。**（已查 Files 页与 FileReadTool 页。）
  background: >-
    **它不托管后台。** 库本身不提供厂商托管的执行环境 —— 要「电脑关了还能跑」，
    得自己把进程跑在自有服务器 / VPC 上。AMP 商业侧另给 Cron scheduling。

    **Flow 的 state management 是官方明文。** README 把 Flow 描述成
    "event-driven workflows with **state, branching, routing**"，
    FAQ 说 Flow 适合 "detailed execution paths and **secure state management**"。

    **state 是显式、结构化的**（README「Using Crews and Flows Together」段示例代码）。

    `class MarketState(BaseModel)`，Flow[MarketState] 里直接读写
    `self.state.sentiment` 等字段，并按 `self.state.confidence` 的数值阈值分支。

    **这就是本站要找的「状态」**：显式、结构化、可分支判断。

    **落盘与跨进程恢复已核到**（官方 `concepts/checkpointing`、`concepts/flows` 页）：

    - **Flow 的 `@persist` 装饰器**：官方称 "automatically persists all flow method states"，
      默认后端 `SQLiteFlowPersistence`

    - **续跑**：`kickoff(inputs={"id": <uuid>})` —— 同一 `flow_uuid` 续写历史
    - **分叉**：`kickoff(restore_from_state_id=<uuid>)` —— 换新 `state.id`，原历史不动
    - **checkpoint 恢复**：crew / flow / agent 的 checkpoint 可从 `./.checkpoints/` 恢复，
      CLI `crewai checkpoint` 提供 resume / fork
  tools: >-
    **官方明确列了 MCP 与 A2A 两项，这是它的一个强项。**

    "Use tools, **memory, knowledge, checkpointing**, async execution,
    and **MCP/A2A support** for more capable production agents."

    **MCP 是核心依赖，不是可选 extra。** 官方 `lib/crewai/pyproject.toml` 的
    `[project] dependencies` 里直接写死 `mcp~=1.28.1`。

    **A2A 才是可选 extra**：`a2a = ["a2a-sdk~=0.3.10", ...]`。
    这与 OpenAI Agents SDK 把 `mcp>=1.19.0` 放进 `dependencies` 一致，属核心能力。

    MCP 的接入面：

    - **传输三种**：stdio / SSE / Streamable HTTP（各一页）
    - **DSL 字段** `mcps=`；多 server 聚合用 `MCPServerAdapter`
    - 另有 MCP security 专页
    - **内置工具**是 `crewai-tools`（官方称 75+ OSS catalog，装 `crewai[tools]`）

    另外，CrewAI 自己托管了一个文档 MCP server（`docs.crewai.com/mcp`），
    可供 AI 编程助手查询它的 API 细节（README「Build with AI」段提到的 `ask-docs`）。

    **A2A（Agent-to-Agent）的规范与生态仍属外部协议**：本站只记
    **「官方有 `a2a` extra 与一批 A2A 事件」**，协议规范不在本站研究范围。
  context: >-
    **它给了一套统一 memory 系统，外加独立的 knowledge。机制已核到。**

    README 里与记忆相关的表述有两处：

    - Key Features 的 "memory, **knowledge**, checkpointing"
    - 「Build with AI」段的 agent 配置项清单
      "Configuring agents — role, goal, backstory, tools, LLMs, **memory**, guardrails"

    **机制已核到，且推翻旧判断**（官方 `concepts/memory` 页）。官方现有**统一 `Memory` 类**。

    **官方原文**："a single `Memory` class that replaces separate short-term, long-term,
    entity, and external memory types with one intelligent API"

    即**旧档案「官方不区分工作记忆 / 长期记忆」的说法已过时**。

    具体机制：

    - **作用域**：分层 scope 树（类文件系统，如 `/agent/researcher`）。Crew 级默认共享。
      agent 可用 `memory.scope("/agent/x")` 取私有子树。另有 `slice()` 做跨分支只读 / 读写视图

    - **存储后端**：默认平台目录下的向量库，默认 ChromaDB，路径可由 `CREWAI_STORAGE_DIR` 改。

      知识存储官方称 "uses the same storage system as memory"

    - **裁剪不是简单截断**：检索用 `semantic + recency + importance` 复合打分。
      写入走 LLM 抽取原子事实 + consolidation/dedup
      （相似度过阈值时由 LLM 决定 keep / update / delete）

    - **knowledge 与 memory 的关系**：knowledge 是 RAG 事实库（独立 collection，agent/crew 两级）。
      memory 是跨任务的统一记录库。两者共用向量存储，用途不同。

  permissions: >-
    **guardrails 是「任务输出校验」，不是权限边界 —— 这一点与旧判断不同。**

    官方 `concepts/tasks` 页「Task Guardrails」原文：

    **官方原文**："validate and transform task outputs before they are passed to the next task"

    两类实现：

    - **函数式** —— 传 `guardrail=` 回调，返回 `(bool, result)`，确定性校验
    - **LLM 式** —— 传字符串描述，自动建 `LLMGuardrail`，用该 task 的 agent 的 LLM 判
    - **相关字段** —— `guardrail` / `guardrails` / `guardrail_max_retries`（**默认 3 次**）

    **关键判定：它只拦输出**（task 产出），**不是**双向校验，也**不改状态**：

    - **不是** OpenAI Agents SDK 那种 input + output 双向校验
    - **不是** ADK 的 Tool Confirmation 执行前确认
    - **不是** LangGraph 的 interrupts 改状态

    所以对照表里 CrewAI 应写作「校验 task 输出、失败重试」。

    **沙箱：OSS 无进程 / 容器级沙箱。** 边界来自工具本身 ——
    文件工具默认把路径限制在 `base_dir`。默认是 cwd，见 local_files 轴。
    MCP 安全官方明说是「信任」问题、不提供内置防护。

    **未知：网络访问控制官方无机制**（已查 tasks 页与 `mcp/security` 页）。
    RBAC / SSO / PII redaction 属 AMP 商业侧，开源版没有。
  fit: >-
    **适合三类场景。**

    - 任务能被表述成「一支有角色分工的团队」（Crews）
    - 需要业务逻辑留在普通 Python 里、并显式控制执行路径（Flows）
    - 想在本地模型上跑（官方点名 Ollama / LM Studio）；需要 MCP 与 A2A 接入；Python 栈

    **不适合三类场景。** 都写在同一张否定的清单里：

    - 需要进程 / 容器级沙箱或网络访问控制 —— 官方无此机制；
      guardrails 只校验 task 输出，文件工具只限 `base_dir`

    - 需要把「工作记忆」与「跨会话长期记忆」分开管理 —— CrewAI 已统一成一个 Memory 类，
      不再分型，与 LangGraph 的分型路线相反

    - 需要厂商托管的真后台 —— 纯库，得自己部署到自有服务器 / VPC

pitfalls:
  - 以为是「角色扮演玩具」—— 官方定位是 production-grade，README 明写 Move from experiment to production without changing frameworks
  - 把 Crew Control Plane 的能力当成开源版自带 —— tracing / 集中管控 / 企业安全 / 24×7 支持 /本地与云部署都是 CrewAI AMP 的卖点
  - 把 guardrails 当权限护栏 —— 官方明文它只校验 task 输出，不管输入、也无沙箱
  - 以为 memory 和 knowledge 是两套记忆 —— knowledge 是 RAG 事实库，memory 是统一记录库
  - 以为 checkpointing 是「以后再说」—— 官方已给 Json/Sqlite 后端与恢复 CLI，可按需启用
  - 以为有 Flow 就有厂商托管后台 —— Flow 给的是 state management，进程仍跑在你自己机器上

tags: [Python, 开源, MIT, 编排框架, 多Agent, Crew, Flow, 事件驱动, 状态管理, MCP, A2A, Ollama, 本地模型, 角色分工]
related: [filesystem]

sources:
  - label: crewAIInc/crewAI · 仓库（59,246★，MIT，核验 2026-10-01）
    url: https://github.com/crewAIInc/crewAI
    kind: repo

  - label: 主 README（Crews/Flows 双抽象、七项 Key Features、Crew Control Plane 商业段、模型接入、FAQ）
    url: https://github.com/crewAIInc/crewAI/blob/main/README.md
    kind: docs

  - label: 官方文档 · Connect CrewAI to LLMs（完整 provider 清单；原生 5 家 + LiteLLM 兜底；默认 gpt-4o-mini）
    url: https://docs.crewai.com/en/learn/llm-connections
    kind: docs

  - label: 官方文档 · Checkpointing（事件驱动、默认每 task 完成落盘、Json/Sqlite 后端、resume/fork、CLI）
    url: https://docs.crewai.com/en/concepts/checkpointing
    kind: docs

  - label: 官方文档 · Flows（state management、@persist、SQLiteFlowPersistence、续跑/分叉语义）
    url: https://docs.crewai.com/en/concepts/flows
    kind: docs

  - label: 官方文档 · Memory（统一 Memory 类、scope/slice、复合打分、consolidation）
    url: https://docs.crewai.com/en/concepts/memory
    kind: docs

  - label: 官方文档 · Tasks（Task Guardrails：函数式/LLM 式，只校验任务输出，默认重试 3 次）
    url: https://docs.crewai.com/en/concepts/tasks
    kind: docs

  - label: 官方文档 · Knowledge（存储与 memory 同系统，默认 ChromaDB，独立 collection）
    url: https://docs.crewai.com/en/concepts/knowledge
    kind: docs

  - label: 官方文档 · MCP 安全（信任模型、无内置防护、风险清单）
    url: https://docs.crewai.com/en/mcp/security
    kind: docs

  - label: 官方文档 · FileReadTool（base_dir 路径沙箱，默认 cwd，越界逃生阀环境变量）
    url: https://docs.crewai.com/en/tools/file-document/filereadtool
    kind: docs

  - label: 官方文档 · Agent Capabilities（Tools/MCPs/Apps/Skills/Knowledge 五类能力）
    url: https://docs.crewai.com/en/concepts/agent-capabilities
    kind: docs

  - label: lib/crewai/pyproject.toml（核心依赖含 mcp~=1.28.1；a2a 为可选 extra）
    url: https://github.com/crewAIInc/crewAI/blob/main/lib/crewai/pyproject.toml
    kind: repo

  - label: CrewAI AMP（商业控制面，本次未取到页面）
    url: https://crewai.com
    kind: docs

  - label: CrewAI 官方定价页（核验 2026-10-01：**只有 Basic 与 Enterprise 两档**、
    Basic 50 次/月硬上限且加购栏为「—」、Enterprise 可部署在客户自有 VPC/基础设施、
    45 天 onboarding、SSO/RBAC/PII redaction 等 Enterprise 专属项；第三方站的六档均不存在）
    url: https://crewai.com/pricing
    kind: pricing

  - label: Releases（1.15.23 @ 2026-09-28）
    url: https://github.com/crewAIInc/crewAI/releases
    kind: changelog

  - label: crewAI-examples · 官方示例集
    url: https://github.com/crewAIInc/crewAI-examples
    kind: repo

  - label: CrewAI 文档 MCP server（README「Build with AI」段提到）
    url: https://docs.crewai.com/mcp
    kind: docs

link:
  url: https://crewai.com
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

**CrewAI 是一个 Python 框架。它用「角色分工」和「业务流程」两套比喻来编排多 agent。**
官方自述是 "Framework for orchestrating **role-playing**, autonomous AI agents."

**「role-playing」这个词容易让人低估它。** 同一份 README 里也写着 production-grade，
并明确承诺：

> "Move from experiment to production **without changing frameworks**."

## 双抽象是它最好用的一张对照轴

README 的 Key Features 前两条就是这个对照：

| 官方原句 | 抽象 | 适合 |
|---|---|---|
| **Crews for autonomy**: Model teams of specialized AI agents with **roles, goals, tools, and tasks** | 角色/目标/任务 | 需要灵活决策的协作 |
| **Flows for control**: Build event-driven workflows with **state, branching, routing** | 事件/状态/分支/路由 | 需要精确控制执行路径 |

FAQ 里官方把分工讲得更直白：

> Crews provide **autonomous agent collaboration**, ideal for tasks requiring flexible
> decision-making and dynamic interaction. Flows offer **precise, event-driven control**,
> ideal for managing detailed execution paths and **secure state management**.
> You can seamlessly combine both.

**这一段是本站编排家族里最好用的一句话** —— 「需要弹性用 Crew，需要精确用 Flow，可以混用」，
比「它是什么框架」的回答更能帮人做决定。

## 状态：Flow 的 state management 是显式且结构化的

README 示例代码（`Using Crews and Flows Together` 段）把状态做成了 Pydantic 模型：

```python
class MarketState(BaseModel):
    ...

class AdvancedAnalysisFlow(Flow[MarketState]):
    def run(self):
        self.state.sentiment = "analyzing"
        if self.state.confidence > 0.8:
            ...
        elif self.state.confidence > 0.5:
            ...
```

**这就是本站要找的「状态」** —— 显式、结构化、可按数值阈值分支。

**落盘与跨进程恢复本轮已核到**（官方 `concepts/checkpointing`、`concepts/flows` 页）。
README 把 checkpointing 写成**按需添加**。两处原话都加了限定语：

- "Add tools, memory, **checkpointing**, and async execution **as your system grows**"
- "Add deterministic steps, human input, structured outputs, and **checkpointing as your system grows**"

那是 README 的定位话术；**机制本身官方文档给得很细**：

- **落盘粒度**：事件驱动，默认 `on_events=["task_completed"]`，即**每完成一个 task 落一次盘**。
- **持久化后端**：`JsonProvider`（每次一文件，默认）或 `SqliteProvider`（单库、开 WAL）。
- **跨进程恢复**：可从 `./.checkpoints/` 或 SQLite 库恢复；Flow 另有 `@persist`
  （默认 `SQLiteFlowPersistence`），`kickoff(inputs={"id": ...})` 续跑、
  `restore_from_state_id=` 分叉。

- **CLI**：`crewai checkpoint` 提供 resume / fork 的 TUI。

**这与 [LangGraph](./langgraph.md) 形成本站编排家族里最值得看的一组对照**：

| | LangGraph | CrewAI |
|---|---|---|
| 状态落盘 | ✅ **每 superstep 落盘**（官方明文：save graph state at every superstep） | ✅ 每 task 完成落盘（事件驱动，默认 `task_completed`） |
| 落盘粒度 | superstep（图的一个步进） | task（或自定义事件，如 `method_execution_finished`） |
| 持久化后端 | 有独立子包（SQLite / Postgres） | `JsonProvider` / `SqliteProvider`，Flow 用 `SQLiteFlowPersistence` |
| 跨进程恢复 | 官方承诺 "resuming from exactly where they left off" | 从 checkpoint 恢复 / fork，CLI 可 resume |

## 模型接入：三个编排框架里对本地模型最友好的一个

**默认走 OpenAI API，本地模型走 Ollama 工具。** README「Connecting Your Crew to a Model」原文：

> By default your agents will use the **OpenAI API** when querying the model. However,
> there are several other ways... For example, you can configure your agents to use a
> **local model via the Ollama tool**.

FAQ 补充 **LM Studio** 也能接。

**这一点对本站读者有实际价值**：要拿本地量化模型跑编排框架，
CrewAI 是三个编排对象里唯一在 README 首屏级别点名具体工具的。

**完整 provider 清单本轮已核到**（官方 `learn/llm-connections` 页）：

- **原生 SDK 接入 5 家** —— OpenAI、Anthropic、Google Gemini、Azure、AWS Bedrock
- **其余走 LiteLLM 兜底**（`uv add 'crewai[litellm]'`）。官方另点名单列：Ollama、
  Mistral、Groq、Cohere、Hugging Face、Replicate、Together AI、Cloudflare、
  DeepInfra、SambaNova、Nebius、NVIDIA NIMs，以 "And many more!" 结尾指向全量列表

**默认模型**：页原文 "By default, CrewAI uses the `gpt-4o-mini` model."
（由 `OPENAI_MODEL_NAME` 决定）。换法：字符串标识符或用 `LLM` 类。

**未知：换 provider 后 tool calling / structured output 的可靠性，官方未说明。**

## 工具：MCP 与 A2A 都写了

Key Features 一条原文：

> Use tools, **memory, knowledge, checkpointing**, async execution, and **MCP/A2A support**
> for more capable production agents.

**MCP 是核心依赖**：官方 `lib/crewai/pyproject.toml` 的 `[project] dependencies`
里写死 `mcp~=1.28.1`。**A2A 才是可选 extra**（`a2a = ["a2a-sdk~=0.3.10", ...]`）。
这与 OpenAI Agents SDK 把 `mcp>=1.19.0` 放进 `dependencies` 一致，属核心能力。

MCP 的接入面：

- 传输三种：**stdio / SSE / Streamable HTTP**（各一页）
- DSL 字段 `mcps=`、多 server 聚合 `MCPServerAdapter`
- MCP security 专页
- 内置工具 `crewai-tools`（官方称 75+ OSS catalog，装 `crewai[tools]`）

**A2A（Agent-to-Agent）的规范与生态仍属外部协议**，本站只记
**「官方有 `a2a` extra 与一批 A2A 事件」**，协议规范不在本站研究范围。

另外有个有意思的细节：CrewAI 自己托管了一个文档 MCP server
（`docs.crewai.com/mcp`）。README「Build with AI」段提到有个 `ask-docs` 配置：
**「查询 CrewAI 的实时文档 MCP server 获取最新 API 细节」**
**它用自己的 MCP server 来喂 AI 编程助手。这属于 MCP 的一个真实自用案例。**

## 权限维度：guardrails 是「任务输出校验」，不是权限边界

本轮把这一维核实了，**结论与旧判断不同**。官方 `concepts/tasks` 页
「Task Guardrails」原文：

> validate and transform task outputs before they are passed to the next task

两类实现：**函数式**（传 `guardrail=` 回调，返回 `(bool, result)`）与
**LLM 式**（传字符串描述，自动建 `LLMGuardrail`，用该 task 的 agent 的 LLM 判）；
字段 `guardrail` / `guardrails` / `guardrail_max_retries`（**默认 3 次**）。
对照本站其它对象：

| 对象 | 机制 | 层次 |
|---|---|---|
| OpenAI Agents SDK | guardrails（input + output 双向校验） | 校验**内容** |
| Google ADK | Tool Confirmation | 拦**执行** |
| LangGraph | interrupts | 改**状态** |
| **CrewAI** | **guardrails（只校验 task 输出、失败重试）** | 校验**产物** |

**它只拦输出，不管输入**；OSS 也**没有进程 / 容器级沙箱**。
边界来自工具：文件工具默认限 `base_dir`（默认 cwd），
MCP 安全官方明说是「信任」问题、不提供内置防护。
**未知：网络访问控制官方无机制**。要企业级权限得走 AMP（RBAC / SSO / PII redaction）。

## 记忆：统一 Memory 系统，机制已核到（旧判断作废）

本轮核实官方 `concepts/memory` 页。**官方已把记忆统一成一个 `Memory` 类**。

> a single `Memory` class that replaces separate short-term, long-term,
> entity, and external memory types with one intelligent API

即**旧档案「官方不区分工作记忆 / 长期记忆」的说法已过时** ——
现在它是「统一成一个 API」，而不是「没有分型」。这与 [LangGraph](./langgraph.md)
的分型路线正好相反。

- **作用域**：分层 scope 树（`/agent/researcher` 等），Crew 级默认共享，
  agent 可用 `memory.scope()` 取私有子树。`slice()` 做跨分支只读或读写视图。

- **存储后端**：平台目录下的向量库（默认 ChromaDB，`CREWAI_STORAGE_DIR` 可改）。
- **不靠截断**：检索用 `semantic + recency + importance` 复合打分；
  写入走 LLM 抽取原子事实 + consolidation/dedup（过阈值时 LLM 决定 keep/update/delete）。

- **knowledge vs memory**：knowledge 是 RAG 事实库（独立 collection，agent/crew 两级），
  memory 是跨任务统一记录库；两者共用向量存储但用途不同。

## 商业线：Crew Control Plane（AMP）要分清

README 单列一节 Crew Control Plane Key Features，七项全是商业产品特征：

- Tracing & Observability（实时指标、日志、trace）
- Unified Control Plane（集中管控与扩缩）
- Seamless Integrations（企业系统集成）
- **Advanced Security**（官方原文："Built-in robust security and compliance measures"）
- 24/7 Support（专属企业支持）
- **On-premise and Cloud Deployment Options**（CrewAI AMP 两种部署形态）

**注意其中「Advanced Security」这一条** ——
如果你用 CrewAI 的理由之一是权限边界，**开源版并没有这一项**。

### AMP 档位：官方页只有两档，且这本身是个坑

2026-10-01 核验官方定价页，**只有两档**（报价按 D9 口径不存，见官方页）：

| 档位 | 执行次数 | 席位 |
|---|---|---|
| **Basic**（免费档） | **50 次/月，上限就是 50** | 1 |
| **Enterprise**（定制） | "Sized to workflow" + Flexible overage | 不限 |

**Basic 包含**：

- Visual editor + AI copilot、GitHub 集成、**Export as MCP server**、Export as UI component
- Guardrails、Human-in-the-loop input、Cron scheduling
- Tracing、OpenTelemetry、LLM testing、AI agent training
- Usage dashboard、Token count、自动扩缩、社区支持

**Enterprise 才解锁**：

- SSO（MS Entra / Okta）、RBAC、workload identity、PII redaction、policies
- 企业连接器、专属 VPC / NAT、专属支持
- Slack/Teams 支持、on-site 支持与培训、部署与 onboarding、每月开发工时

Enterprise 的 onboarding 是 **45 天**，forward deployed engineering 与培训**按需另购**。

**三个必须读出来的结论**：

**结论一：Basic 没有自助加购通道。**

Basic 的加购一栏写的是「—」。
官方对比表 Basic 行**「Maximum executions = 50」「Additional executions = —」**。
**超过 50 次/月的自助出路基本只有去找 Enterprise 谈。**

**结论二：部署形态在商业侧确实兑现了。**

Enterprise 明确写可部署在 CrewAI 云。它也支持你自己的 VPC / 你自己的基础设施。
这也兑现了 README 那句原文：

    > On-premise and Cloud Deployment Options
**官方页也没有任何强制联网授权的表述。**

**结论三：第三方报价站不可信。**

核验时多个第三方来源给出的档位与报价，**官方定价页上根本没有这些档位**
（有来源自己都标注「那一档来自第三方聚合站，不在官方页上」）。
**本站只采官方页面读得到的事实**——按 D9 口径，本站连官方报价也不存，只给官方页链接。

## 适合与不适合

**适合**三类场景：

- 任务能被表述成「一支有角色分工的团队」
- 需要业务逻辑留在普通 Python 里、并显式控制执行路径
- 想在本地模型上跑；需要 MCP 与 A2A 接入

**不适合**三类场景：

- 需要进程 / 容器级沙箱或网络访问控制（官方无此机制）
- 需要把工作记忆与长期记忆分开管理（CrewAI 已统一成一个 Memory 类）
- 需要厂商托管的真后台（纯库，要自己部署）

## 核验说明

`confidence: partial` 的依据：

**为什么仍是 partial（A6.2 本轮后）**：八维已全部从「未核验」改为结论，
但仍有三处**官方确实没写**、只能记「官方未说明」的项 ——
换 provider 后 tool calling / structured output 的可靠性、容器部署时的默认权限、
OSS 是否有网络访问控制的官方机制。

此外 A2A 规范属外部协议、AMP Enterprise 官方仅标 Custom。
这些不是「没查到」，是官方文档本身没给，故仍不足以升到 verified。

**A6.2 本轮补齐的官方源**：

- `concepts/checkpointing`（落盘粒度 / 后端 / 恢复 / fork）
- `concepts/flows`（`@persist` 与 `SQLiteFlowPersistence`）
- `learn/llm-connections`（provider 清单与默认模型 `gpt-4o-mini`）
- `concepts/memory`（统一 Memory、scope、存储与 consolidation）
- `concepts/tasks`（Task Guardrails 机制）
- `concepts/knowledge`（存储与 memory 关系）
- `mcp/security`（MCP 安全无内置防护）
- `FileReadTool` 页（`base_dir` 路径沙箱）
- `lib/crewai/pyproject.toml`（`mcp~=1.28.1` 在核心依赖、`a2a` 为可选 extra）

已核验（存量）：仓库存在与星数（59,246）、许可（MIT，经 license API）、
最近推送（2026-10-01，仍活跃）、最新版 **1.15.23**（releases @ 2026-09-28）、
README 关键段落（双抽象、七项 Key Features、模型接入、Crews/Flows FAQ、
MarketState 结构化状态示例、Telemetry 与 License 段）。

**本轮（2026-10-01）补上的**：CrewAI AMP 档位结构。官方页两档，已写进正文表格。
Enterprise 的部署形态（客户自有 VPC / 自有基础设施）。无强制联网授权表述。

**核验方法**：先试渲染抓取 `crewai.com/pricing` 超时，
改用 WebFetch 直接取官方页正文。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按编排框架 + 角色抽象维度定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 同一需求用 Crew 实现 vs 用 Flow 实现，代码量与可读性差多少 | 验证双抽象是否真的各有用处 |
| 2 | 用 Ollama 接本地量化模型跑完一个 Crew | 官方点名支持，值得验证真实可行性 |
| 3 | **guardrails 实战强度**：LLM 式误判率、重试 3 次够不够 | 机制已知（输出校验），误判率需实测 |
| 4 | checkpointing 实测：中断后 resume 是否真跳过已完成 task | 官方文档已述机制，需验证真实表现 |
| 5 | Crew 之间传递信息的开销（角色扮演的 token 成本） | 角色协作通常吃 token，要量 |
| 6 | Flow 的 state 在崩溃后跨进程恢复的真实成功率 | 与 LangGraph 的 superstep 落盘对比 |

## 未知项清单

- 换 provider 后 tool calling / structured output 的可靠性（官方未说明）
- 容器部署时的默认权限（官方未说明，已查 Files 页与 FileReadTool 页）
- OSS 是否有网络访问控制的官方机制（官方未说明）
- A2A（Agent-to-Agent）规范与生态现状（外部协议，不在本站研究范围）
- AMP Enterprise 的档位内容（官方仅标 Custom）
- Basic 档 50 次/月上限之后，除 Enterprise 洽谈外是否有自助加购路径（官方对比表该栏为「—」）
- MCP / A2A 接入的实际使用门槛

## 相关条目

- [Google ADK](./google-adk.md) — **编排家族对照**：同为图/流程编排，ADK 用 Workflow Runtime 的节点与路由，CrewAI 用 Crew（角色协作）+ Flow（事件驱动）两套抽象。CrewAI 另给了 MCP/A2A 支持。
- [LangGraph](./langgraph.md) — **状态持久化路线对照**：LangGraph 每 superstep 落盘；CrewAI 事件驱动、默认每 task 完成落盘，后端 Json/Sqlite，可 resume/fork。两条路线现在都有官方明确机制。
- [Deep Agents](./deepagents.md) — 同属「快速起步」一侧，但抽象不同：Deep Agents 是 batteries-included harness，CrewAI 是 Crew/Flow 双抽象的编排框架。
- [OpenAI Agents SDK](./openai-agents-sdk.md) — 反面对照：那个是单 agent 原语 + input/output 双向 guardrail；CrewAI 的 guardrail 只校验 task 输出（且无沙箱）。
