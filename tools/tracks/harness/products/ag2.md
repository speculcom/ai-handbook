---
id: ag2
track: harness
tasks: ["build-agent"]
family: orchestration
name: AG2
vendor: ag2ai
homepage: https://ag2.ai
mark: AG
stars: 4983
license: Apache-2.0
latest_version: 1.1.2
language: Python

# 支持哪些模型 provider（本站第一决策点）
providers:
  - OpenAI（OpenAIConfig）与 OpenAI Responses（OpenAIResponsesConfig）
  - Anthropic Claude（AnthropicConfig）
  - Google Gemini（GeminiConfig）与 Vertex AI（VertexAIConfig）
  - Amazon Bedrock（BedrockConfig，v1.1.1 起改用 aiobotocore 原生异步）
  - Ollama 本地模型（OllamaConfig）
  - DashScope / 阿里 Qwen（DashScopeConfig）
  - xAI Grok（XAIConfig）与 Z.AI GLM（ZAIConfig）
  - OpenAI 兼容自托管（vLLM / LM Studio 等，走 OpenAIConfig）

layer_position: >-
  **本站编排家族里「社区续作 vs 官方继任」这条分界线的社区一端。**

  这条分界线就是 AutoGen 原仓库停更后出现的两条路：

  - 一条是社区转向 **AG2**（`ag2ai/ag2`）
  - 另一条是微软官方把 AutoGen 与 Semantic Kernel 合并成 [Microsoft Agent Framework](./microsoft-agent-framework.md)

  README 自述：

  > "AG2 (formerly AutoGen)"

  > "maintained by a **dynamic group of volunteers** from several organizations"

  **一个必须讲清的版本断层：AG2 v1.0 起把经典框架整体搬到了独立仓。**

  - 经典框架：独立仓 [`ag2ai/ag2-classic`](https://github.com/ag2ai/ag2-classic)，`import autogen`
  - 顶层包：改为协议驱动的 `import ag2`

  官方对老代码出路的原文：

  > "AG2 v1.0 is **not** a drop-in upgrade from Classic. The agent model, orchestration, and imports all changed."

  即老代码靠 `pip install ag2-classic` 续命。

  **与 [CrewAI](./crewai.md) 的分野在抽象口味上。**

  CrewAI 用 Crew（角色/目标/任务）与 Flow 的业务比喻。

  AG2 v1.0 用 **Network（Hub + 类型化 channel）** 这套协议化抽象。
  官方 channel 分 conversation / consulting / discussion / workflow 四种适配器。

  一个偏「团队角色」，一个偏「消息协议与治理」。

axes:
  model_access: >-
    **provider 清单是显式的、类型安全的配置类，覆盖云端与本地两条路。**

    官方 `beta/model_configuration` 页原文：

    "The AG2 framework provides an explicit, predictable, and **type-safe** way to configure Large Language Models"

    每家 provider 一个 Config 类 + 一个 extra：

    - `OpenAIConfig` / `OpenAIResponsesConfig`（`ag2[openai]`）
    - `AnthropicConfig`（`ag2[anthropic]`）
    - `GeminiConfig` / `VertexAIConfig`（`ag2[gemini]`）
    - `BedrockConfig`（`ag2[bedrock]`）
    - `OllamaConfig`（`ag2[ollama]`）
    - `DashScopeConfig`（`ag2[dashscope]`）
    - `XAIConfig`（`ag2[xai]`）
    - `ZAIConfig`（`ag2[zai]`）

    **本地 / 自托管明确支持。**

    官方专列一节 "Self-Hosted and OpenAI-Compatible Models（vLLM, LM Studio, etc.）"，
    走 `OpenAIConfig` 的 base_url。README 亦列出 `ag2[ollama]`。

    **Bedrock 于 v1.1.1 改为原生异步客户端** aiobotocore。官方 release 明示为 breaking。

    **未知** —— 换 provider 后 tool calling / structured output 的可靠性对比，官方未说明
    （已查 `beta/model_configuration` 与 Grok 兼容页）。
  runtime: >-
    **纯 Python 库，异步贯穿，不提供托管服务。**

    README 原文：

    "AG2 requires **Python version >= 3.10**"

    "AG2 is **async throughout**. `Agent.ask(...)` starts a turn and returns an `AgentReply`"

    安装是 `pip install ag2[openai]`。

    **多 agent 的调度形态官方给了两种链路**（`network/overview` 页）：

    - 默认 **`LocalLink`** —— 官方描述：

      "same-process duplex queues"

      即同进程内 hub + agents。

    - 换成 **`WsLink`** —— 官方描述：

      "the hub and each agent as separate OS processes connected over WebSocket"

      即 hub 与每个 agent 分处不同操作系统进程。

    换链路时 `HubClient` API 不变、无需改业务代码。

    **它不运营 agent loop。**

    库里的一切跑在你自己的进程 / 主机上，官方无 any 托管 offer。
  local_files: >-
    **框架不内置通用文件工具。文件能力来自 KnowledgeStore 与沙箱 shell 工具。**

    后者的边界写得比多数同类清楚，这是本对象最值得记的一处。

    **① 磁盘知识库。**

    官方 harness 示例用 `DiskKnowledgeStore(Path("./knowledge_demo"))`，官方注释：

    "Disk-backed, so anything the agent remembers **survives the process exiting**"

    即知识落盘位置由你指定的目录决定。

    **② 受限 shell**（已核到，见官方 release v1.1.1）。

    受限模式 "runs commands **without a shell**"。

    `SandboxShellTool` / `ShellAdapter` 传 `allowed=[...]` 或 `readonly=True` 时，
    会把命令切分成 argv。然后**只检查 argv 再原样执行**：

    **官方原文**："Nothing can expand after the check"

    管道 / 重定向 / 通配符 / 变量在受限模式下被拒。

    - `readonly=True` 只放行不可写文件、不启动其它程序的命令
    - `blocked=[...]` 官方明说：

      "remains **best-effort**. It is **not** a security boundary."

    **未知** —— 框架级的默认文件访问边界与容器级隔离，官方未说明
    （已查 `network/overview`、`agent_harness` 与 release 页）。
  background: >-
    **「关机后还能跑」在本站是纯库形态 —— 没有托管后台。**

    但 durable messaging 机制官方给了明确实现。`network/overview` 页列出的 Network 能力包含：

    "**Durable messaging** with replayable channel transcripts (**write-ahead log**)"

    "**Distributed / cross-process deployment**: replace `LocalLink` with **`WsLink`**"

    hub 持有权威状态：registry、audit log、channel table、write-ahead logs。客户端是：

    "thin frontends"

    官方另有 **Distributed Deployment** 专页。

    它涵盖 WsLink、serve_ws、auth、**at-least-once delivery**、reconnect 与 **task durability**。

    **长期记忆可跨进程存活。** DiskKnowledgeStore 落盘，见 local_files 轴。

    **但没有任何厂商托管 offer。**

    进程必须跑在你自己的服务器上；要真后台得自己上容器 / K8s。

    **未知** —— 托管选项与断点续跑在崩溃场景下的具体语义，官方未说明
    （已查 `network/overview` 页）。
  tools: >-
    **工具、MCP、AG-UI 三项都能在官方源核到；A2A 仅见仓库 topics。**

    **① 原生工具。**

    普通 Python 函数加 `@tool` 装饰器即成为工具。官方原文：

    "AG2 runs the **full tool-calling loop**: the model decides when to call it, AG2 executes it, and the result is fed back"

    agent 还可 `Agent.as_tool()` 被别的 agent 当工具用。

    **② MCP。**

    官方 release 记录持续维护 `MCPToolkit` 与 `MCPServerTool`：

    - v1.1.1 "send exactly one `Authorization` header on every provider"
    - v1.1.2 "fix(mcp): derive model output schemas from serialization"

    **③ AG-UI。**

    - v1.1.2 "feat(ag-ui)!: **serve AG-UI 1.0**"
    - v1.1.1 支持 "**Human input over AG-UI**"（工具内 `context.input()` 的问题经 AG-UI 客户端以 interrupt 抛出）

    **④ Skills。**

    官方 release 有 skill 相关修复：

    - "check local skill ownership before validating arguments"
    - "execute nested scripts from declared paths"

    **A2A 目前只能在官方仓库 topics 里看到（含 `a2a`）。**

    本轮未取到 v1.0 的 A2A 专页正文，故不展开。

    子任务委派另有 `run_subtask` / `run_subtasks` 自动注入工具（见 context 轴）。
  context: >-
    **这是 AG2 最贴合本站「状态 ≠ 上下文」主张的设计。**

    它把 harness 显式拆成三组 opt-in 原语。

    官方 `agent_harness` 页原文：

    "A bare `Agent` is just a model loop. The **harness** is the set of **opt-in primitives** you compose onto it"

    三个关键参数：

    - **`assembly=`（上下文策略）** —— 官方示例含 `WorkingMemoryPolicy`（把 `memory/working.md`
      注入 system prompt）、`SlidingWindowPolicy(max_events=50)`（限制历史占用）、`AlertPolicy`

    - **`knowledge=`** —— `KnowledgeConfig(store=..., compact=..., compact_trigger=..., aggregate=...)`，
      配 `SummarizeCompact` / `TailWindowCompact` 做**上下文压缩**（README 示例 "18 -> 3 events"）；
      `write_event_log` 会把流历史落到 `/log/{stream_id}.jsonl`

    - **`tasks=`（默认关闭）** —— 开启后自动注入子任务工具；子 Agent 默认继承父工具，
      且**子任务自身 `tasks=False`**，官方原文：

      **官方原文**："recursive delegation is structurally impossible"

    **分野很清楚**：`compact=` 管窗口压缩。

    `KnowledgeStore` 管跨进程持久记忆 —— 两者官方分开描述。
  permissions: >-
    **官方机制分两层：HITL 人审 + 受限 shell 工具。两层都不等于容器沙箱。**

    **① HITL。**

    README 原文如下：

    - 在工具里调 `context.input(...)` 暂停本次 run 向人提问
    - 由 `hitl_hook` 决定答案来源（CLI / web UI / 队列）

    **② 工具审批。**

    release v1.1.1 明说：

    "**Approval grants are keyed by tool implementation**"

    且同名工具每轮只暴露一个。

    MCP 发现的工具排在代码声明的工具之下，不能覆盖本地工具。

    **③ 受限 shell。**

    `SandboxShellTool` 的 `allowed` / `readonly` / `blocked` 见 local_files 轴。
    官方自己声明 `blocked=[...]` **不是安全边界**。

    v1.1.2 还修了一个 shell 命令过滤绕过漏洞（**GHSA-42mf-vpmr-gw5r**）。

    **④ 数据接口安全提示。**

    官方文档警告 Redis 的 `Serializer.PICKLE` 会把代码执行能力交给任何能写该 stream 的人。
    建议只用完全可信的 Redis，JSON 为默认。

    **未知** —— 框架级的进程 / 容器沙箱默认值，官方未说明
    （已查 `agent_harness` 与 release 页）。
  fit: >-
    **适合。**

    - 要用 Python 编排**多 agent 会话 / 协议化网络**（Hub + channel，含咨询、讨论、工作流适配器）
    - 需要可审计的 durable messaging（write-ahead log、audit trail）与跨进程部署（WsLink）
    - 要在本地模型上跑（Ollama / vLLM / LM Studio）
    - 要 HITL 与受限 shell 工具
    - 需要 MCP 与 AG-UI 对接
    - 偏好 opt-in、可组合的 harness 原语

    **不适合。**

    - 期待 `pip install ag2` 仍是老 AutoGen API（v1.0 起经典类已移入 `ag2-classic`）
    - 需要厂商托管后台（纯库，进程自负）
    - 需要开箱即用的容器级沙箱隔离（官方给的是受限 shell 白名单，非容器）
    - 非 Python 技术栈（无官方非 Python 端口）

pitfalls:
  - 以为 pip install ag2 还是老 AutoGen —— v1.0 起 ConversableAgent / GroupChat / import autogen 都搬到 ag2-classic 包
  - 以为 ag2 与 autogen 可平滑升级 —— 官方明说 v1.0 不是 drop-in upgrade，agent 模型、编排与 import 全变了
  - 以为它是微软官方项目 —— 社区志愿者维护（ag2ai），与微软的 Microsoft Agent Framework 是两条线
  - 以为 blocked=[...] 是安全边界 —— 官方原文说它只是 best-effort，受限 shell 的隔离靠 allowed 白名单与 readonly

tags: [编排框架, Python, 开源, Apache-2.0, 多Agent, 角色分工, 子代理, HITL, human-in-the-loop, 沙箱, 事件驱动, 工作流, 持久化, 长期记忆, 上下文压缩, MCP, A2A, 本地模型, Ollama, 多后端]
related: [filesystem]

sources:
  - label: ag2ai/ag2 · 仓库（4,983★，Apache-2.0，pushed_at 2026-10-08，topics 含 mcp/a2a/ag2，核验 2026-10-08）
    url: https://github.com/ag2ai/ag2
    kind: repo

  - label: 主 README（AG2 v1.0 与 AG2 Classic 拆分、Agent/tools/HITL/Network/harness 概念、Apache-2.0 声明）
    url: https://github.com/ag2ai/ag2/blob/main/README.md
    kind: docs

  - label: 官方文档 · Network Overview（Hub + channel、四种适配器、LocalLink/WsLink、write-ahead log、audit trail、HumanClient）
    url: https://docs.ag2.ai/docs/user-guide/network/overview/
    kind: docs

  - label: 官方文档 · Agent Harness（assembly= / knowledge= / tasks= 三组原语、compaction、子任务不可能递归、turn lifecycle）
    url: https://docs.ag2.ai/docs/user-guide/agent_harness/
    kind: docs

  - label: 官方文档 · Model Configuration（provider Config 类与 extra 清单、自托管 OpenAI 兼容、Vertex/Z.AI/Bedrock 认证）
    url: https://docs.ag2.ai/latest/docs/beta/model_configuration/
    kind: docs

  - label: 官方文档 · Grok & OpenAI-API-Compatible（xAI 走 OpenAI 客户端、function calling 与结构化输出）
    url: https://docs.ag2.ai/latest/docs/user-guide/models/grok-and-oai-compatible-models/
    kind: docs

  - label: AG2 Classic 文档 · LLM Configuration（经典线的 provider 清单：OpenAI/Anthropic/Gemini/Bedrock/Mistral/Cerebras/Together/Groq + 本地 Ollama/LiteLLM/LM Studio）
    url: https://classic.docs.ag2.ai/latest/docs/user-guide/basic-concepts/llm-configuration/
    kind: docs

  - label: Releases（最新 v1.1.2 @ 2026-10-03；v1.1.1 含受限 shell 与工具审批变更、GHSA-42mf-vpmr-gw5r 修复、Bedrock 转 aiobotocore）
    url: https://github.com/ag2ai/ag2/releases
    kind: changelog

  - label: ag2ai/ag2-classic · 经典框架独立仓（pip install ag2-classic，import autogen，仍维护）
    url: https://github.com/ag2ai/ag2-classic
    kind: repo

link:
  url: https://ag2.ai
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

**AG2 是 AutoGen 停更后由社区接棒的续作。** 仓库描述直接写着 "AG2 (formerly AutoGen)"。

README 也自述维护方：

> "a dynamic group of volunteers from several organizations"

**理解它必须先分清两条线**：

| | AG2（本条目） | Microsoft Agent Framework |
|---|---|---|
| 维护方 | 社区（ag2ai） | 微软官方 |
| 与 AutoGen 关系 | 社区延续 / fork 后的独立演进 | 官方把 AutoGen + Semantic Kernel 合并继任 |
| 顶层 import | `import ag2` | `agent_framework` / `Microsoft.Agents.AI` |

这也是本项目的 harness 分区当初的取舍依据。

它把 AutoGen 原仓库列为「明确不收对象」。

原仓 `pushed_at` 停在 2026-04-15，社区已转向 AG2。

收 AG2 而非 AutoGen，正是「跟着仍在更新的那支血脉走」。

## 一个必须讲清的版本断层：AG2 v1.0 把 Classic 拆出去了

README 顶部用醒目提示说明：

> **Looking for `ConversableAgent`, `GroupChat`, or `import autogen`? That's now AG2 Classic.**

自 v1.0 起，经典框架整体搬到独立仓 `ag2ai/ag2-classic`。

- 经典线：`pip install ag2-classic`、`import autogen`、文档 `classic.docs.ag2.ai`
- 新顶层包：`pip install ag2` 改为协议驱动的新框架

**经典线仍在维护、现有代码不停止工作。**

**新顶层包不再附带 `autogen` 这个 import 名与经典 agent 类。**

官方对升级路径的措辞很直接：

> AG2 v1.0 (`pip install ag2`) is **not** a drop-in upgrade from Classic.
> The agent model, orchestration, and imports all changed.

**所以「AG2 是不是 AutoGen 新版」这个问题，答案是：同一血脉。**

**但 v1.0 不是平移升级。**

## 多 agent 编排：Network（Hub + channel）

v1.0 用 **Network** 取代经典的 `GroupChat` / swarm / nested chat：

> a `Hub` that owns the registry, the **write-ahead log**, and the **audit trail**,
> with agents talking over typed **channels**.

官方原文明确：

> "**This replaces the classic `GroupChat` / swarm / nested-chat patterns.**"

四种内置 channel 适配器：

| 适配器 | 参与者 | 发言顺序 | 终止 |
|---|---|---|---|
| `conversation` | 恰好 2 | 自由（任意时刻任一方） | 显式 close 或 TTL |
| `consulting` | 恰好 2 | 严格一问一答 | 答复后自动关闭 |
| `discussion` | 2+ | 轮转（round_robin） | 显式 close 或 TTL |
| `workflow` | 2+ | 声明式 `TransitionGraph` | 图终止 |

其中 `workflow` 官方称**「最接近经典 GroupChat 的对应物」**。

部署上默认 `LocalLink`（同进程）。换 `WsLink` 即跨进程 / 跨主机，业务代码不变。

## harness：三组 opt-in 原语，正好落在「状态 ≠ 上下文」上

官方 `agent_harness` 页原文：

> A bare `Agent` is just a model loop. The **harness** is the set of **opt-in primitives**
> you compose onto it.

| 参数 | 作用 | 对应本站维度 |
|---|---|---|
| `assembly=` | 上下文策略：`WorkingMemoryPolicy` / `SlidingWindowPolicy` / `AlertPolicy` | **上下文** |
| `knowledge=` | `KnowledgeStore` + `SummarizeCompact` / `TailWindowCompact` 压缩 + 聚合 | **长期记忆 + 上下文压缩** |
| `tasks=` | 子任务委派（默认关闭），子 Agent `tasks=False`，无法递归 | **子代理** |

**这条分野很干净**：压缩（`compact=`）管的是窗口占用。

知识库（`KnowledgeStore`）管的是跨进程持久记忆。

## 权限：HITL + 受限 shell，但不是容器沙箱

- **HITL**：工具里 `context.input(...)` 暂停 run 向人提问，`hitl_hook` 决定答案来源。
- **工具审批**：官方 v1.1.1 明说审批按「工具实现」为键，同名工具每轮只暴露一个。
- **受限 shell**：`SandboxShellTool` 的 `allowed=[...]` / `readonly=True` 会把命令切成 argv
  后**只检查 argv 再原样执行**。

  官方原话：

  > "Nothing can expand after the check"

  官方同时声明 `blocked=[...]` ：

  > "best-effort. It is **not** a security boundary."

- v1.1.2 修了一个 shell 命令过滤绕过漏洞（**GHSA-42mf-vpmr-gw5r**），
  说明这类工具的安全面需要盯 release。

**注意：这不是容器隔离** —— 官方给的是白名单与只读模式。

**另一条数据接口提示。**

用 `Serializer.PICKLE` 时，任何能写该 Redis stream 的人都会有代码执行能力。

官方建议只用完全可信的 Redis，JSON 为默认。

## 适合与不适合

**适合**：

- 用 Python 编排多 agent 会话 / 协议化网络
- 需要可审计的 durable messaging 与跨进程部署
- 要在本地模型上跑（Ollama / vLLM / LM Studio）
- 要 HITL 与受限 shell
- 需要 MCP 与 AG-UI
- 偏好 opt-in、可组合的 harness 原语

**不适合**：

- 期待 `pip install ag2` 仍是老 AutoGen
- 需要厂商托管后台
- 需要开箱即用的容器级沙箱
- 非 Python 技术栈

## 核验说明

`confidence: partial` 的依据：

**为什么不是 verified**：本轮已核到 v1.0 与 Classic 的拆分、Network 的 Hub/channel 抽象、
harness 三组原语、provider 清单（含本地模型）。

受限 shell 与工具审批机制也已核到。发布节奏（v1.1.1 / v1.1.2）同样在本轮核到。

但仍有多处**官方确实没给**的项：

- 框架级默认文件访问边界与容器级隔离
- 托管选项与崩溃续跑语义
- 换 provider 后 tool calling / structured output 的可靠性
- A2A 在 v1.0 的实现细节（仅见仓库 topics）

加上版本迭代快（数日内连发两版），故不足以升到 verified。

**本轮核到的官方页**：仓库与 README、`network/overview`、`agent_harness`、
`beta/model_configuration`、Grok 兼容页、经典线 LLM Configuration 页、releases 页、
`ag2ai/ag2-classic` 仓。

**已核验元数据**：仓库存在、★4,983、许可 Apache-2.0（经 license API）、
最近推送 2026-10-08（仍活跃）、最新版 **v1.1.2**（releases @ 2026-10-03）。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按编排框架 + 多 agent 会话维度定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 用 `WorkflowAdapter` 复刻一段经典 GroupChat 代码的改动量 | 验证官方「最接近 GroupChat」的说法 |
| 2 | 从 `LocalLink` 切到 `WsLink` 跨进程部署，业务代码是否真不用改 | 官方承诺 HubClient API 不变 |
| 3 | 受限 shell（`allowed`/`readonly`）在真实命令集下的可用性 | 安全变强往往牺牲可用性，需量边界 |
| 4 | 接 Ollama 跑一个多 agent 网络，观察 token 与延迟开销 | 本地模型 + 多 agent 的真实成本 |
| 5 | DiskKnowledgeStore + 压缩两次运行，验证跨进程记忆是否真生效 | README 示例宣称重启仍记得 |
| 6 | v1.1.x 连续两版的破坏性变更面 | 迭代快，选型需量化升级风险 |

## 未知项清单

- 框架级默认文件访问边界与容器级隔离（官方未说明）
- 托管选项与崩溃场景下的断点续跑语义（官方未说明）
- 换 provider 后 tool calling / structured output 的可靠性对比（官方未说明）
- A2A 在 AG2 v1.0 的实现细节（官方仓库 topics 含 a2a，本轮未取到专页正文）
- 受限 shell 的完整命令白名单语义边界（官方给的是 allowed/readonly/blocked 三档，细节需实测）
- Classic 线与 v1.0 的长期并行维护策略（官方仅称 Classic "remains maintained"）

**各条的核验出处：**

- 文件访问边界与容器隔离、托管选项：已查 `network/overview` 与 `agent_harness` 两页
- 换 provider 后可靠性：已查 `beta/model_configuration` 与 Grok 兼容页

## 相关条目

- [Microsoft Agent Framework](./microsoft-agent-framework.md) — **同源分野**：AG2 是 AutoGen 的社区延续，MAF 是微软官方把 AutoGen 与 Semantic Kernel 合并的继任线。
  本站 harness 分区记下的 AutoGen 停更，是这两条支线被分别收录的原因。

- [CrewAI](./crewai.md) — **抽象层次对照**：CrewAI 用 Crew（角色/目标/任务）/ Flow 的业务比喻。
  AG2 v1.0 用 Network（Hub + 类型化 channel）的协议化抽象。
  一个偏团队角色，一个偏消息协议与治理。

- [Google ADK](./google-adk.md) — **编排与 HITL 对照**：ADK 是图执行引擎 + 工具级确认。
  AG2 是 Hub/channel 网络 + `context.input()` 人审。
  两者都提供状态持久化，但落盘粒度与语义不同。
