---
id: planning
topic: planning
title: agent 的规划
titleEn: Planning for agents
summary: 先想清楚步骤再动手，还是边做边定——规划模式怎么选，以及规划为什么会失效、失效了怎么救。
summaryEn: Plan first or decide as you go — how to choose a planning pattern, and why plans fail.
sources:
  - label: Anthropic 工程博客 · Building effective agents（2026-10-20 WebFetch 核验官方页）
    url: https://www.anthropic.com/engineering/building-effective-agents
    kind: docs
  - label: Reflexion 论文（arXiv 2303.11366，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2303.11366
    kind: paper
  - label: LangGraph 官方文档 · Persistence（2026-10-20 直抓 200）
    url: https://docs.langchain.com/oss/python/langgraph/persistence
    kind: docs
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**规划就是先决定步骤序列，再逐步执行。**
与之相对的是边做边定：模型每一轮只看当前局面决定下一步。
两种范式没有高下，只有适不适合——
判断依据是：**步骤数能不能预先说清。**

## [第一种：固定流程|Pattern one: fixed paths]

Anthropic 把「流程可预定义」的系统叫 workflow。
**Anthropic 官方原文**："Workflows are systems where LLMs and tools are orchestrated through predefined code paths."

**Anthropic 官方原文**：与之相对的 agent 是 "LLMs dynamically direct their own processes and tool usage"。
对应的三种规划模式：

**提示链（prompt chaining）**：把任务拆成固定子任务序列，上一步输出喂下一步。
**Anthropic 官方原文**："Prompt chaining decomposes a task into a sequence of steps, where each LLM call processes the output of the previous one."
代价是延迟，换来的是每一步变简单、更可控。
官方建议在中间步骤加程序化检查（gate），确认流程还在轨道上。

**路由（routing）**：先分类，再进不同分支。
适合「输入有明确类别、每类处理方式不同」的场景。

**编排者-工作者（orchestrator-workers）**：中央 LLM 动态拆任务、派给 worker、再合成结果。
适合**子任务无法预先枚举**的场合——比如改代码，
要动几个文件、每个文件怎么改，得看了任务才知道。
官方点出它和并行化的关键区别：
**Anthropic 官方原文**："the key difference from parallelization is its flexibility— subtasks aren't pre-defined, but determined by the orchestrator based on the specific input."

## [第二种：边做边定|Pattern two: decide as you go]

什么时候必须放弃固定流程？官方给了判据：

> "Agents can be used for open-ended problems where it's difficult or impossible to predict the required number of steps, and where you can't hardcode a fixed path."

步骤数说不清，就别画流程图。
但边做边定有三个老问题：跑偏、循环、半路而废。
对应的工程手段是给执行加**反馈环**。

Anthropic 的评估者-优化者（evaluator-optimizer）是一个 LLM 生成、
另一个 LLM 评估并反馈，循环打磨。
官方给的两个适配信号：
反馈能实质改善输出；模型自己给得出这个反馈。

Reflexion 论文（arXiv 2303.11366）把反馈做成了体系。
agent 用语言复盘任务反馈，把反思文本存进 episodic memory buffer，
下次试同类任务时先读教训再动手。
论文报告 HumanEval 编码基准上 91% pass@1，
超过当时 GPT-4 的 80%。
注意这是论文在特定基准上的结果，不是通用承诺。

## [人工检查点：规划的安全绳|Human checkpoints]

让流程可中断、可恢复，是规划里最实用的工程投资。
[LangGraph](../../harness/products/langgraph.md) 的官方文档把 human-in-the-loop
和 fault tolerance、time travel 并列为 checkpointer 的用途：
状态有快照，才能在某一步停下等人批，再从原点继续。

关键步骤交给流程，危险步骤还给人。
判断哪步危险：不可逆、要花钱、会发出去。

## [规划为什么会失效|Why plans fail]

1. 计划过期：环境变了，旧计划照跑到底。
2. 过度规划：为五分钟能做的小事先写五千字计划。
3. 假反馈：评估者只会说「很好」，优化循环原地打转。
4. 无恢复点：跑到一半崩了，只能从头再来。

**通用原则来自 Anthropic 官方原文**：
"Success in the LLM space isn't about building the most sophisticated system. It's about building the right system for your needs."
从最简单的提示词开始，配上扎实的评测，
简单方案不够用了，再加多步系统。
