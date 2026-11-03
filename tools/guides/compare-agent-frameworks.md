---
id: compare-agent-frameworks
topic: planning
title: Agent 框架：LangGraph / OpenAI Agents SDK / Google ADK / Claude Agent SDK 怎么选
titleEn: Agent frameworks: how to choose
summary: 按状态与持久化、人在回路、模型绑定与部署形态四面选；低层编排与开箱 harness 是两类东西。
summaryEn: Choose by state and persistence, human-in-the-loop, model binding and deployment; low-level orchestration and batteries-included harnesses are different classes.
sources:
  - label: LangChain · LangGraph 官方文档（low-level、stateful agents；2026-10 快照）
    url: https://docs.langchain.com/oss/python/langgraph/
    kind: docs
  - label: OpenAI · Agents SDK 官方文档（lightweight、provider-agnostic、100+ LLMs；2026-10 快照）
    url: https://openai.github.io/openai-agents-python/
    kind: docs
  - label: Google · ADK 官方文档（graph-based execution engine、routing / fan-out / loops / retry / HITL；2026-10 快照）
    url: https://google.github.io/adk-docs/
    kind: docs
  - label: Anthropic · Claude Agent SDK 官方文档（进程内工具、类型提示、MCP；2026-10 快照）
    url: https://platform.claude.com/docs/en/agent-sdk/python
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [先分清两类|Two classes]

| 类别 | 代表 | 它替你做什么 | 不管什么 |
|---|---|---|---|
| 低层编排 | LangGraph | 状态、图、持久化钩子 | 文件系统、规划、记忆策略 |
| 多 agent harness | OpenAI Agents SDK | 多 agent 原语、handoff | 不替你做规划与记忆 |
| 图执行引擎 | Google ADK | 路由、扇出、循环、重试、状态、HITL | 不替你跑单个 agent |
| 进程内 SDK | Claude Agent SDK | 工具调用无 IPC、类型安全 | 不绑定某个模型家族外的能力 |

一句话：**要自己定流程，选低层；要少写胶水，选 harness；要图执行，选 ADK。**

## [四行对照|Four frameworks]

| 维度 | LangGraph | OpenAI Agents SDK | Google ADK | Claude Agent SDK |
|---|---|---|---|---|
| 官方定位 | 低层、有状态编排 | lightweight、provider-agnostic | code-first、图执行引擎 | 进程内工具与 MCP |
| 状态/持久化 | 显式状态与 checkpoint 钩子 | 由开发者管理 | state management 内建 | 由应用进程管理 |
| 人在回路 | 由开发者接 | 由开发者接 | 官方列 HITL | 由应用接 |
| 模型绑定 | 多 provider | OpenAI + 100+ LLMs | Gemini 为主 | Claude 模型线 |
| 部署 | 自托管 Python/JS | 自托管 | 自托管 | 同进程，无子进程 |

## [逐个适用条件|When each fits]

**LangGraph**：适合流程明确、要自己控制状态与中断恢复的团队；官方自述是 low-level orchestration，不替你做开箱封装。**什么情况下选另一个**：不想自己写状态机，选 OpenAI Agents SDK 或 ADK。

**OpenAI Agents SDK**：适合要多 agent 协作、又要 provider-agnostic 的团队；官方首段写明支持 OpenAI Responses / Chat Completions 与 100+ 其他 LLM。**什么情况下选另一个**：全栈在 Gemini 或 Claude，选对应 SDK 更少摩擦。

**Google ADK**：适合要图执行引擎、路由、扇出、循环、重试与 HITL 的团队；这些是官方 README 明列的第一项特性。**什么情况下选另一个**：只要轻量多 agent 原语，选 OpenAI Agents SDK。

**Claude Agent SDK**：适合要进程内工具、类型提示、少 IPC 开销的 Python 应用；外部 MCP server 照样支持，两者可混用。**什么情况下选另一个**：要跨模型供应商，选 LangGraph 或 OpenAI Agents SDK。

## [核验事实|Dated facts]

1. LangGraph 官方自述为 low-level orchestration framework for stateful agents（官方文档，2026-10 快照）。
2. OpenAI Agents SDK 官方首段写明 provider-agnostic，支持 100+ LLMs（官方文档，2026-10 快照）。
3. Google ADK 的图执行引擎支持 routing、fan-out/fan-in、loops、retry、state management 与 HITL（官方文档，2026-10 快照）。
4. Claude Agent SDK 的工具与应用同进程，无子进程管理，带类型提示；外部 MCP server 可混用（官方文档，2026-10 快照）。

## [常见误判|Common misreads]

- 把「低层编排」当成「功能少」：它把决定权留给你，代价是你要写状态与持久化。
- 把「provider-agnostic」当成「零成本换模型」：提示词、工具 schema 与评测都要重跑。
- 把「有 HITL」当成「自动安全」：审批点设计错，照样会放过危险操作。
- 把「SDK 同进程」当成「不用沙箱」：工具权限与文件边界仍要自己划。
