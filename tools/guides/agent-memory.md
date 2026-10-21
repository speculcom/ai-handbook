---
id: agent-memory
topic: memory
title: agent 记忆系统
titleEn: Agent memory systems
summary: 会话内的状态、跨会话的持久事实、外部记忆库——三层记忆各自解决什么问题，以及共同的坑。
summaryEn: In-session state, cross-session facts, and external stores — what each memory layer solves, and the pitfalls they share.
sources:
  - label: LangGraph 官方文档 · Persistence（2026-10-20 直抓 200）
    url: https://docs.langchain.com/oss/python/langgraph/persistence
    kind: docs
  - label: OpenAI Agents SDK 官方文档 · Sessions（2026-10-20 直抓 200）
    url: https://openai.github.io/openai-agents-python/sessions/
    kind: docs
  - label: Mem0 官方文档 · How Mem0 Works（2026-10-20 直抓 200）
    url: https://docs.mem0.ai/core-concepts/how-it-works
    kind: docs
  - label: Letta 官方文档 · Memory & dreaming（2026-10-20 直抓 200）
    url: https://docs.letta.com/configuration/memory/
    kind: docs
  - label: MemGPT 论文（arXiv 2310.08560，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2310.08560
    kind: paper
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**agent 记忆就是让下一次调用知道这次发生过什么。**
没有记忆，每一轮都是初见；记忆太多，上下文又被撑爆。
工程上把它分成三层看：会话内状态、跨会话事实、外部记忆库。
三层的保存位置、存活时间、读写方式都不同，踩坑的方式也不同。

## [第一层：会话内状态|Layer one: in-session state]

最常见需求：多轮对话别断片。
**OpenAI 官方原文**：sessions 提供 "built-in session memory to automatically maintain conversation history across multiple agent runs"。

机制很直白：每轮开始前自动取回历史并拼到输入前，
每轮结束后把新产生的条目（用户输入、回复、工具调用）存回会话。
底层实现是 SQLite 等本地 session，开箱即用。

[LangGraph](../../harness/products/langgraph.md) 把这类能力叫做 checkpointer（检查点）。
官方按作用域分了两类：
checkpointer 管**单线程**的图状态快照，
store 管**跨线程**的应用自定义数据。
前者管「这通电话别断」，后者管「这个用户的所有电话都记得」。

**坑一：内存版不落地。** LangGraph 官方 troubleshooting 明说：
`MemorySaver` 和 `InMemorySaver` 把检查点存 RAM，进程一重启全丢。
生产要用 `PostgresSaver` / `SqliteSaver` 这类持久化后端。

**坑二：检查点无限增长。** 长对话里检查点越攒越多，
官方建议定期清理或设保留策略——否则延迟和存储一起涨。

## [第二层：跨会话事实|Layer two: cross-session facts]

会话会结束，事实要留下：用户偏好、项目决定、常用设置。
Mem0 把这条路拆成两半：**抽取**和**检索**。

调用 `add` 时，Mem0 从消息里抽出持久事实存起来。
默认存的是提炼后的事实，不是原始消息全文；要存原话得显式关掉推断。
下次模型调用前调 `search`，把最相关的几条塞进提示词。

官方强调两个纪律：
检索要按 `user_id` / `agent_id` 等维度过滤，防止不同用户的记忆混在一起；
事实过时了要用 update / delete 显式改——
自动抽取是只增不改的。

Letta 走的是另一条路：让 agent 直接管一套记忆文件。
现行的 MemFS 是 git 支撑的记忆文件系统，agent 自己可读可写可整理，
记忆在它的多个对话间共享。

还配了 dreaming：后台子 agent 定期回顾对话、
把有用的经验固化进记忆，全程不打断手头的活。
官方 CLI 里 `/remember` 显式教、`/memory` 查看、
`/doctor` 审计记忆结构和 token 占用。

**坑三：只增不改会攒出过期事实。** 用户早就搬家了，
记忆里还同时住着两座城市。抽取式记忆要配纠错流程。

## [第三层：外部记忆库|Layer three: external stores]

上下文装不下的，别硬塞——外接。
[MCP 官方 memory server](../../tools/products/memory.md) 用知识图谱存实体和关系，
按需查询；向量库、键值库也常被用来干这事。

这一层的关键不是「存了多少」，是「召回得准不准」：
相关性、时效、实体匹配，哪个信号主导检索，直接决定召回质量。

MemGPT 论文（arXiv 2310.08560）是这条路线的源头之一。
它提出 **virtual context management**：仿照操作系统的内存分级，
在有限的上下文窗口里换进换出，让模型看起来拥有超大记忆。
论文在文档分析和多会话聊天两个场景验证了效果。

Letta 的 memory blocks（human / persona 这类带标签的记忆块）
是这套思想的工程化：记忆分块、带标签、可编辑。
从论文到产品，记忆的形态从「内存分级」演化成了「agent 自己的文件系统」。

## [三层的边界|Where the layers end]

一个容易搞混的问题：summary 算记忆吗？
把长对话压成摘要续下去，是**压缩**，不是**记忆**——
它仍然只活在当前会话里，关掉就没了。

判断一件事归哪层，只问一句：**进程重启之后，它还在吗？**
还在 → 第二层或第三层；不在了 → 第一层。

## [共同的坑|Shared pitfalls]

1. 记忆泄漏：把敏感信息原样存进长期记忆，检索时又被带进上下文。
2. 串用户：不过滤 user_id，A 的记忆被 B 的会话召回。
3. 静默改写：自动更新覆盖了旧事实，却没人说得清改了什么。
4. token 静默膨胀：召回策略太松，每轮都塞一大堆「相关」记忆。

记忆系统的验收标准只有一条：
**该记得的找得回，不该记得的召不起。**
