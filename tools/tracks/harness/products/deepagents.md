---
id: deepagents
track: harness
tasks: ["long-task"]
family: general-harness
name: Deep Agents
vendor: LangChain
homepage: https://github.com/langchain-ai/deepagents
mark: DA
accent: "#10A37F"
stars: 29862
license: MIT
latest_version: 0.7.20
language: Python

# 支持哪些模型 provider（本站第一决策点）
providers:
  - LangChain chat model 接口下的全部 provider
  - frontier API（OpenAI / Anthropic / Google）
  - 开源权重托管（Baseten / Fireworks 等）
  - 自托管（Ollama / vLLM / llama.cpp）

layer_position: >-
  LangChain 生态三层中的**最上层通用 harness**。

  官方 FAQ 原文给出的栈关系：

  **LangGraph = graph runtime**（最底层）→ **LangChain `create_agent` = 最小 agent harness** →
  **Deep Agents = 在 `create_agent` 之上预置了 filesystem / sub-agents / context management / skills 的 opinionated harness**。

  **官方原文**：
  same building blocks, but with filesystem, sub-agents, context management, and skills bundled in

  **可组合性**：官方明确 any LangGraph `CompiledStateGraph` 都能作为 sub-agent 传给 Deep Agent。

axes:
  model_access: >-
    **官方自述 model-agnostic**，README 列为四条原则之一。

    **官方原文**：
    "Model-agnostic — works with any LLM that supports tool calling: frontier, open-weight, or local"

    FAQ 进一步说明：任何支持 tool calling 的模型都行。包括：

    - frontier API（OpenAI / Anthropic / Google）
    - provider 托管的开源权重（Baseten / Fireworks）
    - 通过 **Ollama / vLLM / llama.cpp 自托管**的模型

    接入方式是任一 LangChain chat model。**换 provider 不需要改 agent 代码。**

  runtime: >-
    **它是库，不是服务 —— 进程由你自己运营。**

    README 明确 built on LangGraph（streaming, persistence, checkpointing）。
    另可配 LangSmith 做 tracing/evaluation/deployment。

    **agent loop 的责任分布**：

    - 模型决策与工具调用在 LangGraph runtime 上
    - Deep Agents 预置了规划、上下文管理、子代理委派

  local_files: >-
    **Filesystem 能力是核心卖点**：read / write / edit / search。

    它的后端**可插拔**（pluggable local, sandboxed, or remote backends）。
    官方另设独立 Sandboxes 页，讲隔离执行环境与 `execute` 工具
    （`SandboxBackendProtocolV2`，仅 sandbox 后端暴露 shell）。

    **重要边界**：官方安全声明原文说
    「**Enforce boundaries at the tool/sandbox level, not by expecting the model to self-police**」。

    即官方明确不提供一层权限护栏，边界要靠你自己在 tool/sandbox 层实现。

    **官方未说明**：多 agent 并发写同一文件的冲突处理（已查 overview / backends 页）。

  background: >-
    自托管 = **关了就停**，没有托管执行选项（README 无相关承诺）。

    **但断点续跑有官方支撑**：

    - built on LangGraph 的 persistence + checkpointing
    - persistent memory（pluggable state and store backends for cross-session recall）

    官方另有 LangSmith 提供 deployment。

  tools: >-
    **工具链是 "batteries-included" 定位。** 官方列出的能力：

    - Sub-agents —— 隔离子上下文的委派
    - Filesystem
    - Shell access（run commands in your sandbox of choice）
    - Skills —— 按需加载的可复用行为
    - Tools —— 自带函数或**任意 MCP server**

    **MCP 支持明确**：官方列「bring your own functions or any MCP server」。

    human-in-the-loop：可 approve / edit / reject 工具调用，发生在**执行前**。

  context: >-
    **本分区"状态 ≠ 上下文"分野的教科书案例。**

    - Context management = summarize long threads and **offload tool outputs to disk**（卸载，不是丢）
    - Persistent memory = pluggable state and store backends，**支持跨会话召回**

    官方描述 defaults are tuned for **long-horizon, multi-step work**。

    两种做法并存：压缩历史 + 把大工具输出落盘 + 跨会话记忆。

  permissions: >-
    **官方明确不设防模型越界。** Security 章节原文：

    **官方原文**："Deep Agents follows a "trust the LLM" model. The agent can do anything its tools allow. Enforce boundaries at the tool/sandbox level, not by expecting the model to self-police."

    翻译：采用「信任 LLM」模型，Agent 能做任何它的工具允许的事。
    边界要在**工具/沙箱层**强制，不要指望模型自我约束。

    **唯一的内建人工干预点**是这个。

    human-in-the-loop 的工具调用审批（approve/edit/reject）。

    这意味着：装了 Deep Agents 之后，权限模型是**你的责任**。

  fit: >-
    **适合**三类场景。

    要一个开箱即用、默认调优好、面向长任务多步流程的通用 Agent。
    不想自己拼 filesystem / 记忆 / 子代理。已经在 LangChain 生态里。

    **不适合**三类场景。

    需要细粒度权限护栏 —— 官方明说不提供，必须自建沙箱。
    要严格控制 agent loop 形状 —— 该用 LangGraph 自定义图。
    想要轻量 harness —— 该用 LangChain `create_agent`。

pitfalls:
  - 把 Deep Agents / LangChain / LangGraph 当成同一个东西 —— 官方自己明确是三层，职责不同（见 `layer_position`）
  - 以为 "trust the LLM" 是产品特性而不是风险声明 —— 官方原文是让你在工具/沙箱层自行设边界
  - 以为开源就零成本 —— 模型推理 + LangSmith（官方推荐的 tracing/eval）都要付费
  - 以为最新版是 0.7.0 —— 竞品站的快照记的是 0.7.0，**实际已 0.7.20**（核验 2026-09-30）

tags: [Python, 开源, MIT, 通用harness, 长任务, 子代理]
related: [amp]

sources:
  - label: LangChain · Deep Agents 仓库
    url: https://github.com/langchain-ai/deepagents
    kind: repo

  - label: Deep Agents 官方文档（overview）
    url: https://docs.langchain.com/oss/python/deepagents/overview
    kind: docs

  - label: Deep Agents · Going to production
    url: https://docs.langchain.com/oss/python/deepagents/going-to-production
    kind: docs

  - label: Deep Agents · Security policy（trust the LLM 声明原文）
    url: https://github.com/langchain-ai/deepagents?tab=security-ov-file
    kind: docs

  - label: LangChain 生态关系说明（三层如何配合）
    url: https://docs.langchain.com/oss/python/concepts/products
    kind: docs

  - label: Deep Agents Releases（0.7.20 @ 2026-09-29）
    url: https://github.com/langchain-ai/deepagents/releases
    kind: changelog

  - label: Deep Agents · Backends（可插拔文件系统后端、permission 规则与边界，核验 2026-10-08）
    url: https://docs.langchain.com/oss/python/deepagents/backends
    kind: docs

  - label: Deep Agents · Sandboxes（隔离执行环境、`execute` 工具）
    url: https://docs.langchain.com/oss/python/deepagents/sandboxes
    kind: docs

link:
  url: https://github.com/langchain-ai/deepagents
  kind: official

last_verified: 2026-09-30
last_updated: 2026-09-30
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官网仓库在 GitHub，大陆直连波动（同日实测 200/000 混合）；npm / PyPI 安装源实测稳定可达。
  direct_note_en: Hosted on GitHub — direct reachability from mainland fluctuates (200/000 mixed on the same day); npm / PyPI install routes measured stable.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**Deep Agents 是 LangChain 出的通用 agent harness。**

它把 filesystem、子代理、上下文管理、skills 都预置好了。

开箱即跑。

官方自述：

> **官方原文**：
> "batteries-included agent harness"

它的设计目标是长任务、多步流程。凡是预置的那一层，**都不改代码就能替换**。

## 三层定位（本分区最需要讲清的一件事）

这事最容易被搞混：Deep Agents、LangChain、LangGraph 是**三层**。

三层职责不同。

官方 FAQ 直接回答了一个问题：这三者有什么区别？

问的是 LangGraph 与 LangChain，官方把关系拆得很清楚。

| 层 | 是什么 | 何时用 |
|---|---|---|
| **LangGraph** | graph runtime（最底层编排） | agent loop 的形状不合适、你要自定义图 |
| **LangChain `create_agent`** | 最小 agent harness | 想要更轻的 harness，不要预置中间件 |
| **Deep Agents** | 在 `create_agent` 之上预置 filesystem / 子代理 / 上下文管理 / skills | 想要完整 harness，开箱即用 |

三层关系，官方原话是：

> LangGraph is the graph runtime. LangChain's `create_agent` is a minimal agent harness on top of it. Deep Agents is a more opinionated harness on top of `create_agent` — same building blocks, but with filesystem, sub-agents, context management, and skills bundled in.

**官方还给了选择规则**（这直接就是本站的选型答案）：

> Use **Deep Agents** when you want the full harness — planning, context management, delegation — out of the box. Use [**LangChain's `create_agent`**] when you want a lighter harness without the bundled middleware. Drop to [**LangGraph**] when the agent loop itself isn't the right shape and you need a custom graph.

**可组合性**：官方明确 any LangGraph `CompiledStateGraph` 都能作为 sub-agent 传给 Deep Agent。

所以不是二选一。**可以用 Deep Agents 打底、LangGraph 图做子代理**。

## ⚠ 最需要注意的一条：官方把安全责任交给你

Security 章节原文：

> Deep Agents follows a "trust the LLM" model. The agent can do anything its tools allow. Enforce boundaries at the tool/sandbox level, not by expecting the model to self-police.

**这不是营销话术，是风险声明。** 装完之后：

| 官方提供 | 官方不提供 |
|---|---|
| human-in-the-loop 工具调用审批（执行前可 approve / edit / reject） | 沙箱边界之外的任何权限护栏 |
| 可插拔的 sandbox backend（**但边界由你划**） | 模型自约束 |

**实操结论**：想用它又担心越权，**必须自己把 sandbox 收紧**。

不能因为**「它支持 human-in-the-loop」**就以为安全到位了。

## "状态 ≠ 上下文"：它同时用了三种手段

| 手段 | 官方原文 | 作用 |
|---|---|---|
| summarize long threads | Context management | 压缩长对话 |
| **offload tool outputs to disk** | Context management | **把大工具输出落盘而不是塞进上下文** |
| persistent memory | pluggable state and store backends | **跨会话召回** |

第二条尤其值得注意。

把工具输出**卸载到磁盘**，而不是压缩掉。

这比单纯「压缩历史」更接近本站主张的可靠长期运行。

官方定位是 `defaults tuned for long-horizon, multi-step work`。默认就是为长任务调的。

## 模型支持：真的可以接本地模型

FAQ 原文：

> Yes. Any model that supports tool calling works — frontier APIs (OpenAI, Anthropic, Google), open-weight models hosted on providers like Baseten or Fireworks, and **self-hosted models via Ollama, vLLM, or llama.cpp**.

**这条对本站很关键**：模型层（models.specul.com）推荐的本地量化版，也能接进来。

见该站系列的 provider 兼容性说明。

## 附：还有一个终端版

README 提到 **Deep Agents Code** —— 预构建的终端 coding agent。

官方定位：

> **官方原文**：
> "similar to Claude Code or Cursor, powered by any LLM"

> ⚠ **本站不把它作为独立对象收录**：它是终端形态的产品，应属 `cli.specul.com` 分区。
> 此处记录是因为它说明 Deep Agents 的能力可直接用于编程场景。

## 适合与不适合

**适合**三类场景。

要一个开箱即用、默认调优好、面向长任务多步流程的通用 Agent。
不想自己拼 filesystem / 记忆 / 子代理。已经在 LangChain 生态里。

**不适合**三类场景。

需要细粒度权限护栏 —— 官方明说不提供。
要严格控制 agent loop 形状 —— 该用 LangGraph。
想要轻量 harness —— 该用 `create_agent`。

## 核验说明

`confidence: partial` 的依据（2026-10-03 由 verified 降级）：

> **为什么降级**：下方 ❌ 项的主语是**本站的取证缺口**，不是 "官方未提供"。
> 按 v3 铁律「未知就说未知」，这些条目存在时标 verified 属于虚高，故降为 partial。
> 主要缺口：LangSmith 配套的商业条款、LangGraph interrupt 细节、多 agent 并发文件冲突。

- ✅ 已核验：
  - 仓库存在与星数（29,862）
  - **许可原文（MIT，经 license API）**
  - 最新版本 **0.7.20**（2026-09-29 releases）
  - 仓库描述原文、README 全文四条原则与九条特性清单
  - FAQ 三层关系原文、Security 声明原文、provider 支持范围原文、Quickstart 代码示例
- ❌ 未核验：
  - LangSmith 配套的商业条款（报价按 D9 口径本站不采）
  - LangGraph interrupt 的细节
  - sandbox backend 的具体实现与可选项清单
  - `CompiledStateGraph` 作为 sub-agent 的具体 API 形态
  - Deep Agents Code 的许可（它可能是另一个仓）

**特别记录一处二手资料偏差**：竞品站（aiagentclash.com）2026-09-28 快照记 Deep Agents 为 **0.7.0**，
而 GitHub releases 实际为 **0.7.20**（2026-09-29）。

**这印证了 v3 计划 "竞品研究只作方法论参考、不作数据来源" 这条规矩是必要的。**

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按本站 harness 分区特有的 5 个测试维度）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 最小 hello agent 要几个文件、多少行 | 官方称 "batteries-included"，要看预置层实际带来多少 |
| 2 | 中断后能否恢复、状态存在哪 | 官方承诺 persistence + checkpointing + persistent memory，需验证落点 |
| 3 | **把 sandbox 收到最紧，看工具还能做什么** | 官方把边界责任交给用户，这条最该实测 |
| 4 | 两个 agent 并发读写同一目录 | 文件冲突策略官方未说明 |
| 5 | 换成 Ollama 本地模型要改多少 | 官方说 model-agnostic，验证是否真的零改动 |

## 未知项清单

- LangSmith 配套（README 推荐搭配，但商业条款未核验；报价按 D9 口径本站不采）
- sandbox backend 的具体可选项与隔离强度
- interrupt / 补充询问机制在 Deep Agents 上的暴露方式
- Deep Agents Code 是否与本仓同许可
- 多 agent 并发时的文件锁策略

## 相关条目

- [LangGraph](./langgraph.md) — 同生态下层。LangGraph 是 Deep Agents 依赖的 graph runtime，官方 FAQ 明确区分两者层级。
- [LlamaIndex](./llamaindex.md) — 同为编排层。但 LlamaIndex 重心在 RAG / 数据连接，Deep Agents 重心在通用 agent harness。
