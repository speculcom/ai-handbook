---
id: orchestration
topic: orchestration
title: 多 agent 编排
titleEn: Multi-agent orchestration
summary: 多个 agent 怎么分工、怎么交接、怎么收拢结果，以及什么时候根本不该上多 agent。
summaryEn: How multiple agents divide work, hand off, and merge results — and when not to go multi-agent at all.
sources:
  - label: LangGraph 官方文档 · Multi-agent（2026-10-20 直抓 200）
    url: https://docs.langchain.com/oss/python/langchain/multi-agent
    kind: docs
  - label: OpenAI Agents SDK 官方文档 · Handoffs（2026-10-20 直抓 200）
    url: https://openai.github.io/openai-agents-python/handoffs/
    kind: docs
  - label: Google ADK 官方文档 · Collaborative workflows（2026-10-20 直抓 200）
    url: https://adk.dev/workflows/collaboration/
    kind: docs
  - label: CrewAI 官方文档 · Processes（2026-10-20 直抓 200）
    url: https://docs.crewai.com/en/concepts/processes
    kind: docs
  - label: Anthropic 工程博客 · Building effective agents（2026-10-20 WebFetch 核验官方页）
    url: https://www.anthropic.com/engineering/building-effective-agents
    kind: docs
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**多 agent 编排就是让多个 agent 分工干同一件事。**
分工的理由通常有三个：上下文装不下、任务能并行、不同环节要不同专业知识。
编排的核心问题只有一个：**下一步交给谁，上下文跟着谁走。**

本站讲机制，不排名。文中提到的产品都链到各自的档案页——档案是事实源，这篇是视角。

## [先问一句：要不要多 agent|First, do you need multi-agent?]

多数「想上多 agent」的需求，单 agent 加对工具和提示词就能满足。
LangGraph 官方文档把这句话放在多 agent 篇的开头：

> "However, not every complex task requires this approach— a single agent with the right (sometimes dynamic) tools and prompt can often achieve similar results."

开发者想要多 agent，通常真实想要的是三种能力之一：
上下文管理、并行化、多人分头开发。
后两个是好理由；第一个要先确认「上下文真的装不下」，
因为拆错的代价比不拆大。

## [四种主流形态|Four common shapes]

LangGraph 把市面上的多 agent 实现归成四类模式。

**Subagents（子 agent 当工具）**：主 agent 把子 agent 当工具调用，
路由全部经过主 agent，由它决定何时调用哪个。
[LangGraph](../../harness/products/langgraph.md) 与 [Google ADK](../../harness/products/google-adk.md) 都属这一形态。

**ADK 官方原文**："ADK automatically generates weather_checker and flight_booker delegation tools"——
协调 agent 声明 SubAgents 后，委派工具以各子 agent 命名。
子 agent 干完活，控制权自动回到协调 agent。

**Handoffs（交接）**：当前 agent 把对话整个移交给下一个 agent。
[OpenAI Agents SDK](../../harness/products/openai-agents-sdk.md) 的官方定义是
**"Handoffs allow an agent to delegate tasks to another agent"**。
交接在模型眼里是一个工具：移交 refund agent 的工具就叫 `transfer_to_refund_agent`。

**CrewAI 官方原文**：hierarchical 进程下 "Tasks are not pre-assigned; the manager allocates tasks to agents based on their capabilities, reviews outputs, and assesses task completion"。
manager 动态分派、复核输出、判断是否完成，近似 Anthropic 的 orchestrator-workers。

**Router（路由）**：一步分类，把输入导给专门的 agent，再合成回答。
它和 Anthropic 写的 routing 模式同源：先分类，再走专门路径。

**自定义工作流**：把编排画成图，确定性和 agent 行为混排。
适合流程本身需要被代码约束的场景——哪步必须拦、哪步可并行，写死在图里。

四种形态对照：

| 形态 | 谁决定下一步 | 上下文 | 典型场景 |
|---|---|---|---|
| Subagents | 主 agent | 子 agent 只看分给它的部分 | 任务可枚举、要并行 |
| Handoffs | 模型自己选 | 整段历史默认跟走 | 客服分流、专业分工 |
| Router | 分类器 | 各走各的，最后合成 | 输入类别清晰 |
| 自定义工作流 | 代码 | 按图显式传递 | 流程要强约束 |

## [交接时，上下文跟着谁走|Whose context follows a handoff]

这是编排里最容易被忽略、出事最多的一点。

**OpenAI 官方原文**："the new agent takes over the conversation, and gets to see the entire previous conversation history"。
也就是说，交接发生时默认全量历史跟走。
要改，用 `input_filter` 过滤，或用运行配置控制交接历史的嵌套方式。

ADK 的协作模式还多一层选择，子 agent 可配成三种模式：

- chat（默认）：可与用户来回。
- task：可追问用户，做完自动还回控制权。
- single_turn：单轮执行，做完即回。

官方特意提醒：这个模式只给子 agent 用，根 agent 不要配。

CrewAI 的 sequential 进程则是另一极：任务按列表顺序跑，
上一个任务的输出作为下一个的上下文。
可控，但不够灵活。

## [失败模式|Failure modes]

**上下文逐级膨胀。** 每交接一次默认带上全量历史，
多跳之后提示词被历史撑爆，成本和延迟一起涨。
拆 agent 的初衷（省上下文）反而没了。

**职责重叠或留空。** 两个 agent 都以为某件事归对方，
或者某件事谁都不接。
Anthropic 的建议是从简单做起：先优化单次调用，不够再叠加多步系统。

**错误复合。** 单 agent 出错还能原地重试；
多 agent 一环错、环环错，且更难定位是哪一环开始的。
**Anthropic 官方原文**："The autonomous nature of agents means higher costs, and the potential for compounding errors."

## [怎么选|Choosing a shape]

一个够用的判断顺序：

1. 单 agent 加工具能解决吗？能，就停在这里。
2. 任务能被清楚切成固定几步？能，走顺序流程（CrewAI sequential、Anthropic 的 prompt chaining）。
3. 输入有明确类别、各类差异大？走 Router / routing。
4. 子任务无法预先枚举、要动态拆？走 orchestrator-workers 或 Subagents。
5. 需要人审关键节点？在自定义工作流里加人工检查点。

拆错比不拆贵。拆之前先想清楚：
每个 agent 各自的上下文里应该有什么、不应该有什么。
