---
id: compare-agent-frameworks
topic: planning
title: Agent 框架：LangGraph / OpenAI Agents SDK / Google ADK / Claude Agent SDK 怎么选
titleEn: Agent frameworks: how to choose
summary: 按流程控制、会话状态、工具执行与部署边界对照四个 SDK；区分框架提供的机制与应用仍需配置的部分。
summaryEn: Compare workflow control, session state, tool execution and deployment boundaries; distinguish SDK mechanisms from application configuration.
sources:
  - label: LangGraph 官方概览（流程编排与持久化机制，2026-11-04）
    url: https://docs.langchain.com/oss/python/langgraph/
    kind: docs
  - label: OpenAI Agents SDK 官方概览（Sessions 与人在回路，2026-11-04）
    url: https://openai.github.io/openai-agents-python/
    kind: docs
  - label: Google ADK 官方文档（Agent、图工作流与 Runtime，2026-11-04）
    url: https://google.github.io/adk-docs/
    kind: docs
  - label: Claude Agent SDK Python 参考（进程内 MCP 工具与 CLI 子进程边界，2026-11-04）
    url: https://platform.claude.com/docs/en/agent-sdk/python
    kind: docs
last_verified: 2026-11-04
confidence: partial
---

## [先分清两类|Choose the level you need]

先写清需要控制的部分，再选 SDK。四个项目的抽象层不同，不宜把“低层”解释成能力少，也不能把某一种工具的执行方式推广到整个 SDK。

| 需求 | 对应检查点 |
|---|---|
| 流程步骤与分支由应用明确控制 | 图、状态、节点与中断恢复 |
| 多个 Agent 协作 | 工具、handoff、调度与职责边界 |
| 跨轮保留上下文 | Session 后端、保留范围与恢复方法 |
| 工具接触文件、命令或网络 | 执行进程、权限与隔离方式 |

## [四行对照|Four frameworks]

| 项目 | 官方文档提供的机制 | 应用仍需决定 |
|---|---|---|
| LangGraph | 有状态编排、持久执行、流式输出、人在回路 | 状态结构、存储配置、业务分支与工具权限 |
| OpenAI Agents SDK | Agent 循环、工具、handoff、Sessions、人在回路 | 会话后端、工具授权、业务审批与模型适配 |
| Google ADK | Agent、图工作流、顺序/循环/并行工作流、Runtime | 流程设计、状态数据与部署配置 |
| Claude Agent SDK | Claude Code 能力、自定义进程内 MCP 工具、外部 MCP 连接 | CLI 进程与工具的权限、部署隔离、会话生命周期 |

某机制存在不代表已为你的应用配置好；不同语言 SDK 和版本的覆盖也需分别检查。

## [逐个适用条件|When each fits]

**LangGraph**：当你需要明确控制图、状态与恢复过程时，对照其持久执行与中断机制。开始前先写一个失败后如何恢复的流程，不只画成功路径。

**OpenAI Agents SDK**：当你需要 Agent 循环、工具和 handoff 时，对照其运行机制；需要跨轮上下文时检查 Sessions，不能笼统写成“没有状态管理”。模型兼容性按实际工具调用与响应能力确认。

**Google ADK**：当任务需要图、顺序、循环或并行工作流时，对照对应机制；官方也提供 Agent Runtime，不能把它概括为“只管图、不跑 Agent”。

**Claude Agent SDK**：当你要将 Claude Code 能力接入应用并定义工具时，对照 Python/TypeScript 版本。`create_sdk_mcp_server()` 创建的工具服务在 Python 应用进程内；这不表示整个 SDK 没有 CLI 子进程，也不能据此承诺端到端“无 IPC 开销”。

## [核验事实|Verification scope]

2026-11-04 复核了四份官方文档中与本页机制对照有关的内容：LangGraph 概览、OpenAI Agents SDK 概览、Google ADK 文档入口与 Claude Agent SDK Python 参考。

重点修正三处边界：OpenAI Agents SDK 有 Sessions 与人在回路机制；ADK 有 Agent Runtime；Claude 的进程内 MCP 工具不等于整个 SDK 单进程。这里没有运行 SDK、做吞吐测试或核验所有版本的兼容性。

## [常见误判|Common misreads]

- 把框架提供持久化机制当成已经完成数据备份；需要核对后端、保留与恢复。
- 把支持多个模型当成无成本替换；提示词、工具 schema 和评估要重新检查。
- 把人在回路当成自动安全；审批点必须覆盖真正会产生影响的动作。
- 把进程内工具当成不用隔离；文件、命令与网络权限仍需明确。
- 只按功能名对照，不检查所用语言、版本与部署环境。
