---
id: smolagents
track: harness
tasks: ["build-agent"]
family: coding-base
name: smolagents
vendor: Hugging Face
homepage: https://huggingface.co/docs/smolagents
mark: SM
accent: "#FFD21E"
stars: 29693
license: Apache-2.0
latest_version: 1.26.0
language: Python 3.10+

# 支持哪些模型 provider（本站第一决策点）
providers:
  - Hugging Face Inference Providers（InferenceClientModel：Cerebras / Cohere / Together / Replicate / SambaNova 等）
  - LiteLLM（LiteLLMModel，官方称 100+ 模型，含 OpenAI / Anthropic）
  - OpenAI 及兼容端点（OpenAIModel，示例给 Together / OpenRouter）
  - Azure OpenAI（AzureOpenAIModel）
  - Amazon Bedrock（AmazonBedrockModel）
  - 本地：Transformers / mlx-lm / Ollama / vLLM

layer_position: >-
  **它和 OpenAI Agents SDK 同属「原语型 / primitives-only」一档，分野在「动作的表示形式」。**

  OpenAI Agents SDK 的动作是函数调用（function tools + handoffs + agents-as-tools）。

  smolagents 的**核心差异是 code-as-action**：默认的 `CodeAgent` 让 LLM 直接写并执行 Python
  代码片段来当作动作。官方称这样「uses 30% fewer steps」，且在难 benchmark 上拿更高分
  （README 引 arXiv 2402.01030 / 2411.01747）。

  它同时提供写 JSON 的 `ToolCallingAgent`。官方给它的定位是「更重可靠性与结构化校验」的场景，两者任选。

  **与 CrewAI / LangGraph 的差别**：那两个是编排层（Crew/Flow、状态图）。
  smolagents 是更薄的一层 agent 库 + 多 agent 委派（`managed_agents`），不做状态机式编排。

axes:
  model_access: >-
    **官方自述 model-agnostic："supports any LLM"**（README 原文）。

    实现是多套 Model 类，各管一端：

    - HF 侧 `InferenceClientModel` 走 Hub 的 Inference Providers。官方点名这些：
      Cerebras、Cohere、Fal、Fireworks、HF-Inference、Hyperbolic、Nebius、
      Novita、Replicate、SambaNova、Together

    - 其余走 `LiteLLMModel`（官方称 "100+ different models"）、`OpenAIModel`（OpenAI 及兼容端点，
      示例给 Together / OpenRouter）、`AzureOpenAIModel`、`AmazonBedrockModel`

    - 本地侧有 `TransformersModel`、`MLXModel`、`Ollama`

    **换 provider 的改动量 = 换一个 Model 类**。也可加 `provider=` 参数。代码结构不变。

    **未知：换 provider 后 tool calling / 结构化输出的可靠性对齐，官方未说明。**
    （已查 guided_tour 与 models 参考页。）
  runtime: >-
    **纯 Python 库。agent loop 由你自己在本地进程里跑。官方无托管执行服务。**

    官方定位原话（README）：

    **官方原文**："run powerful agents in a few lines of code"

    安装 `pip install smolagents`（Python ≥3.10）。
    自带两个 CLI：`smolagent`（通用多步 CodeAgent，可交互式向导）与 `webagent`（基于 helium 的网页浏览 agent）。

    分层多 agent 用 `managed_agents=` 表达委派。

    它也可以把整包 agent 用 `agent.push_to_hub()` 作为 Gradio Space 分享到 HF Hub
    （README 原文 "share your agent to the Hub, as a Space repository"）。

    但那只是**分享 / 加载形态**，**不是厂商托管的常驻运行时** —— 进程仍在你自己手里。
  local_files: >-
    **框架本身不预置文件系统工具。**

    官方 default toolbox（`smolagents[toolkit]`）只有三项：DuckDuckGo/WebSearch、
    Python 代码解释器、Whisper 转写 —— **没有专门的文件读写工具**。

    CodeAgent 要读写文件。它靠的是**自己生成的 Python 代码**（如 `open()`）或你提供的自定义工具。

    所以**文件边界不是框架给的，而是执行环境给的**。本地跑则受 `LocalPythonExecutor` 的
    import 白名单约束。远程沙箱跑则限在沙箱容器内。两种沙箱模式见 secure_code_execution 页。

    **未知：CodeAgent 默认允许的文件访问范围，官方未说明。**
    （已查 secure_code_execution 与 guided_tour 两页，无文件权限章节。）
  background: >-
    **自托管 = 进程关了就停，无托管后台选项。**

    README 的运行方式全是本地代码调用。形式是 Python API / CLI / 沙箱。它没有云端常驻或定时执行形态。

    **唯一与「长任务 / 断点」相关的官方机制是单步执行**。`agent.step(memory_step)` 可一次只走一步。
    memory 存在进程内的 `agent.memory`。tutorials/memory 页举的用例正是：

    **官方原文**："tool calls that take days"

    **未知：官方未提供把这些 memory 落盘并在新进程恢复的内建方案**（已查 tutorials/memory 与
    guided_tour 两页）。

    所以断点续跑要自己序列化 steps。
  tools: >-
    **工具面很宽，而且 MCP 是一等接入。** README 自述 "Tool-agnostic"，工具共四个来源：

    - ① 自定义工具 —— `@tool` 装饰器或继承 `Tool` 类
    - ② **MCP** —— `ToolCollection.from_mcp(...)` 可读任意 MCP server（装 `smolagents[mcp]`）
    - ③ LangChain 工具 —— `Tool.from_langchain`
    - ④ **把 HF Hub Space 当工具** —— `Tool.from_space`

    default toolbox（`smolagents[toolkit]`）= DuckDuckGo/WebSearch、Python 代码解释器、Whisper 转写。

    多 agent 则用 `managed_agents=` 把子 agent 当作可调用单元。
    此外有 `final_answer_checks` 自定义终止校验。
  context: >-
    **上下文 = 步历史（AgentMemory），没有跨会话持久化。**

    官方 tutorials/memory 页的说法是：

    agent "has a memory of past steps"

    步类型分 `TaskStep` / `ActionStep` / `PlanningStep` / `FinalAnswerStep`。

    可操作手段官方给了三样：

    - `agent.replay()` 回放
    - 直接读写 `agent.memory.steps`（示例甚至在两个 agent 间搬 steps）
    - `step_callbacks`（官方示例：删掉旧截图以省 token）

    另有 `planning_interval=N` 每 N 步插一次规划步。

    **官方把这一轴定位成「检查 / 改写记忆」，不是压缩。**

    **未知：把大工具输出落盘这类深上下文管理，官方未说明。**
    （已查 tutorials/memory 与 guided_tour 两页。）
  permissions: >-
    **官方对执行安全说得非常直白。默认的 `LocalPythonExecutor` 不是安全沙箱。**

    README 原文：

    "The built-in `LocalPythonExecutor` is **not** a security sandbox. It applies some restrictions but can be bypassed and must not be used as a security boundary."

    本地解释器给的机制：

    - AST 逐步执行
    - **import 默认禁止**（用 `additional_authorized_imports` 开白名单）
    - **子模块默认禁止**（`numpy.*` 才放行全部子包）
    - 循环迭代次数上限
    - 未定义操作直接报错

    **要真正隔离必须用远程沙箱**：`executor_type="blaxel" / "e2b" / "modal" / "docker"`。

    官方区分两种模式。一是只沙箱化代码片段。二是整包 agent 进沙箱（后者多 agent 才可用）。

    官方另有 Human-in-the-Loop 示例（examples/plan_customization），但**不是内建审批机制**。

    **未知：网络访问控制，官方未说明。**
  fit: >-
    **适合这四类场景。**

    - 认同 code-as-action（官方称比 JSON 工具调用少 30% 步数），并愿意给 LLM 生成代码上沙箱
    - 要 model-agnostic、能接本地模型（transformers / Ollama / mlx-lm）
    - 要薄而可 hack 的库；Python 栈
    - 要 MCP / LangChain / Hub Space 工具生态

    **不适合这三类场景。**

    - 需要厂商托管的常驻后台或断点续跑（纯库，memory 不落盘）
    - 既不想承担任意代码执行风险、又不想上远程沙箱
    - 要 batteries-included 的预置文件系统 / 记忆 / 子代理编排

pitfalls:
  - 把 LocalPythonExecutor 当安全沙箱——官方明文它 is not a security boundary，可被绕过
  - 以为它是「写代码专用」工具——官方定位是 barebones library for agents，CodeAgent 只是「用代码表达动作」
  - 以为接上就有托管后台或断点续跑——纯库，进程关了就停，memory 不落盘

tags: [Python, 开源, Apache-2.0, 编程底座, 沙箱, MCP, 多Agent, 子代理, 本地模型, Ollama]
related: [filesystem]

sources:
  - label: huggingface/smolagents · 仓库（29,693★，Apache-2.0，核验 2026-10-08）
    url: https://github.com/huggingface/smolagents
    kind: repo

  - label: 主 README（barebones library、code-as-action、四类工具、沙箱选项、ManagedAgent）
    url: https://github.com/huggingface/smolagents/blob/main/README.md
    kind: docs

  - label: 官方文档首页（六大特性、CodeAgent / ToolCallingAgent 定位）
    url: https://huggingface.co/docs/smolagents/index
    kind: docs

  - label: Installation options（extras 清单：openai/transformers/vllm/mlx-lm/litellm/bedrock/blaxel/e2b/docker/mcp 等）
    url: https://huggingface.co/docs/smolagents/installation
    kind: docs

  - label: Guided tour（两类 agent 对比、provider 与本地模型清单、CLI）
    url: https://huggingface.co/docs/smolagents/guided_tour
    kind: docs

  - label: Secure code execution（LocalPythonExecutor 非安全边界、E2B/Modal/Blaxel/Docker、两种沙箱模式）
    url: https://huggingface.co/docs/smolagents/tutorials/secure_code_execution
    kind: docs

  - label: Manage your agent's memory（AgentMemory、replay、step_callbacks、单步执行）
    url: https://huggingface.co/docs/smolagents/tutorials/memory
    kind: docs

  - label: Orchestrate a multi-agent system（managed_agents 委派示例）
    url: https://huggingface.co/docs/smolagents/examples/multiagents
    kind: docs

  - label: What are agents?（agency 谱系、code agents 论证）
    url: https://huggingface.co/docs/smolagents/conceptual_guides/intro_agents
    kind: docs

  - label: Releases（最新 1.26.0 @ 2026-05-29；1.25.0 @ 2026-05-14）
    url: https://github.com/huggingface/smolagents/releases
    kind: changelog

link:
  url: https://huggingface.co/docs/smolagents
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
  direct_note: 文档站在 huggingface.co，大陆直连稳定超时（同日两次 000）；pip 安装走 PyPI 实测可达。
  direct_note_en: docs live on huggingface.co, which times out consistently from mainland (000 twice); pip install via PyPI measured reachable.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**smolagents 是一个薄 agent 库 —— 它让 agent「用代码思考」。**

官方自述是 **"barebones library for agents that think in code"**（仓库 description 原文）。

它最核心的设计是 **code-as-action**。默认的 `CodeAgent` 让 LLM 把动作写成 Python 代码，
并执行它。它不输出 JSON 工具调用。

## 与 OpenAI Agents SDK 的分野：动作怎么表示

两者都属「原语型」，但表达动作的载体不同：

| 维度 | **smolagents** | **OpenAI Agents SDK** |
|---|---|---|
| 动作载体 | **Python 代码片段**（CodeAgent）或 JSON（ToolCallingAgent） | 函数调用（function tools / handoffs） |
| 官方效率说法 | "uses **30% fewer steps**"（引 arXiv 2402.01030） | 未给同类量化 |
| 执行风险 | LLM 代码要在**沙箱**里跑 | 工具调用，非任意代码 |
| 换 provider | 换 Model 类 | 换 `model` 字符串 / 适配器 |

**一句话**：想要「动作即代码」并能给代码上沙箱，选 smolagents。想要工具调用 +
内建 guardrails/human-in-the-loop，选 OpenAI Agents SDK。

## CodeAgent vs ToolCallingAgent（官方对比）

官方 guided_tour 把两者讲得很清楚：

| | **CodeAgent**（默认） | **ToolCallingAgent** |
|---|---|---|
| 动作格式 | Python 代码片段 | 结构化 JSON |
| 强项 | 高表达力、可组合/循环/转换、涌现推理 | 可靠、参数经校验、与外部 API 好映射 |
| 弱项 | 需处理语法/异常、需安全执行环境 | 表达力低、动作必须预先定义、无代码合成 |
| 适合 | 需要推理 / 链式 / 动态组合的问题解决者 | 原子工具、调度器 / 控制器类任务 |

## 沙箱：安全边界官方说得很清楚

README 直接写明默认解释器的定位：

> The built-in `LocalPythonExecutor` is **not a security sandbox**. It applies some restrictions
> but can be bypassed and must not be used as a security boundary.

本地解释器给的机制是：

- AST 逐步执行
- import 默认禁止（`additional_authorized_imports` 白名单）
- 子模块默认禁止（`numpy.*` 才放行全部子包）
- 循环迭代上限
- 未定义操作报错

要真正隔离，官方给两类沙箱：

- **托管云沙箱**：Blaxel、E2B、Modal（`pip install 'smolagents[blaxel|e2b|modal]'`）
- **自托管容器**：Docker（`executor_type="docker"`）

**两种模式要分清**：只把代码片段送进沙箱（简单，但多 agent 不可用）；
或把整个 agent（含模型、工具）搬进沙箱（隔离更强，但要传凭据、要手动搭）。

## 与 HF Hub 的关系：分享，不是托管

README 里 agents 和 tools 都是 Hub 对象：

- `agent.push_to_hub("user/agent")` 把 agent 发成 **Gradio Space**
- `agent.from_hub(...)` 加载社区 agent；工具同理

多 agent 则用 `managed_agents=`（官方另有 `ManagedAgent` 包装类）做分层委派。

> ⚠ **这不是「厂商托管运行」**：Space 是分享/加载形态，agent loop 仍跑在你自己那边，
> 也没有「关机后继续跑」的语义。选型时别把它当托管服务。

## 适合与不适合

**适合**：认同 code-as-action 并愿意给 LLM 生成的代码上沙箱。
要 model-agnostic 与本地模型（transformers / Ollama / mlx-lm）。
要薄、可 hack、约千行的库。
要 MCP / LangChain / Hub Space 工具生态。

**不适合**：需要厂商托管的常驻后台或断点续跑。它是纯库，进程关了就停、memory 不落盘。
既不愿承担任意代码执行风险又不想上远程沙箱。
想要开箱即用的文件系统 / 记忆 / 子代理编排。

## 核验说明

`confidence: partial` 的依据（2026-10-08）：

本条目八维已全部给出结论。但仍有**官方确实没写**、只能落「官方未说明」的项：

- 换 provider 后 tool calling / 结构化输出的可靠性对齐
- CodeAgent 默认的文件访问范围
- 深上下文管理（大工具输出落盘）
- 内建网络访问控制

这些不是「没查到」，是官方文档本身没提供，故不足以升到 verified。

**本轮核到的官方页**：

- README（含 barebones 定位、code-as-action、四类工具、沙箱、ManagedAgent）
- docs index
- installation（extras 全清单）
- guided_tour（两类 agent 对比与 provider 清单）
- tutorials/secure_code_execution（解释器限制与沙箱模式）
- tutorials/memory（AgentMemory 与单步执行）
- examples/multiagents
- conceptual_guides/intro_agents

仓库元数据经 GitHub API 核验（29,693★、Apache-2.0、最近推送 2026-09-30、最新版 1.26.0）。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按编程底座 + code-as-action 维度定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 最小 hello CodeAgent 要几个文件、多少行 | 验证官方「barebones / ~1000 行」的薄到什么程度 |
| 2 | `LocalPythonExecutor` 能拦住几类经典逃逸 | 官方说它不是安全边界，实测边界在哪 |
| 3 | `executor_type="docker"` 跑通多 agent 的成本 | 官方说明代码片段模式不支持多 agent |
| 4 | 换成 LiteLLM 接本地 Ollama 要改多少行 | 验证 model-agnostic 的真实改动量 |
| 5 | 单步 `agent.step()` 跨进程恢复 memory 的可行性 | 官方无内建落盘，验证自建断点的代价 |

## 未知项清单

- 换 provider 后 tool calling / 结构化输出的可靠性对齐（官方未说明，已查 guided_tour 与 models 参考页）
- CodeAgent 默认允许的文件访问范围（官方未说明，已查 secure_code_execution 与 guided_tour 两页）
- 把大工具输出落盘的深上下文管理（官方未说明）
- 内建网络访问控制机制（官方未说明）
- 进程间持久化 / 断点续跑的内建方案（官方未提供，得自己序列化 steps）
- hosted 沙箱（Blaxel / E2B / Modal）的配额与计费口径（各由服务商页决定；报价按 D9 口径本站不存）

## 相关条目

- [OpenAI Agents SDK](./openai-agents-sdk.md) — **最该对照的一对**：同为「原语型」，分野在动作表示（code-as-action vs 函数调用）。一个有内建 guardrails/HITL，一个要自己上沙箱。
- [Claude Agent SDK](./claude-agent-sdk.md) — 另一个出自模型厂商的编程底座；但那个包装既有 CLI，smolagents 是自己写 loop 的库。
- [CrewAI](./crewai.md) — 反面对照：CrewAI 是 Crew/Flow 双抽象的编排层，smolagents 更薄，只有 agent 库 + `managed_agents` 委派，不做状态机编排。
