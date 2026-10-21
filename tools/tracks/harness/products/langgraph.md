---
id: langgraph
track: harness
tasks: ["build-agent"]
family: orchestration
name: LangGraph
vendor: LangChain Inc
homepage: https://docs.langchain.com/oss/python/langgraph/
mark: LG
accent: "#1C3C3C"
stars: 42538
license: MIT
latest_version: 1.2.12
language: Python（主）/ TypeScript（langgraphjs 独立仓）

# 支持哪些模型 provider（本站第一决策点）
providers:
  - 模型无关：图执行引擎不绑定模型（本站判断，README 未列 provider 清单）
  - 官方生态位是 LangChain 全家桶，接法通常经 LangChain 的模型集成层
  - LangGraph 自身不提供 provider 层：模型接入走 LangChain 集成（官方文档 2026-10-08 核验）

layer_position: >-
  **本站收录对象里对「状态」这个概念最认真回答的一个，也是 durable execution 的定义者。**

  官方自述一句话："**Low-level orchestration framework for building stateful agents**"
  （低层编排框架，注意 low-level 这个词—— 它自认不是开箱即用的高层封装）。

  与 [Google ADK](google-adk.md) 同属 orchestration 家族，但两者的答案不同：
  ADK 用 Workflow Runtime 的图执行引擎 + state management；
  LangGraph 用**每 superstep 落盘的 checkpoint 机制**（见 axes.context 的官方原文）。

  ⚠ **同厂关系必须记清，否则会重复计数**：
  **LangGraph 与本站已收录的 Deep Agents 是同一家公司的两层产品。**
  README 明确推荐关系："If you're looking to quickly build agents, check out **Deep Agents** —
  a **higher-level package built on LangGraph** for agents that can plan, use subagents,
  and leverage file systems for complex tasks."

  **即：Deep Agents 是建在 LangGraph 上的高层包。**

  两者的关系是「底座 vs 上层封装」，不是「两个可选竞品」——
  ⚠ 但本站同时收录两者，因为 Deep Agents 的 batteries-included 抽象
  与 LangGraph 的显式图抽象在选型上确实是两个不同的入口。

  另有 JS/TS 版 `langchain-ai/langgraphjs` 独立仓，本档只收录 Python 主体。

axes:
  model_access: >-
    **LangGraph 完全不碰模型 —— 这是它作为低层框架的设计取向。**

    官方自述的五项能力是
    durable execution / HITL / memory / LangSmith 调试 / 生产部署。
    这五项全部与模型无关，没有一处列出 provider。
    官方 overview 把「models」归到 LangChain 那侧：

    **官方原文**："starting with models and tools"

    官方 overview 还写明：

    **官方原文**："LangGraph does not abstract prompts or architecture."

    接模型通常经 LangChain 集成层（`init_chat_model` 或任一 SDK）。
    但官方明说它

    **官方原文**："can be used without LangChain"

    这句在官方首页文末，**不是强绑定**。

    **官方未提供任何 provider 清单 —— 模型本就不在其职责内。**
    overview 与官方首页两处都没有列。

    ⚠ **本站判断**：它不绑模型，官方首页也没有 provider 清单。

  runtime: >-
    **OSS 形态是纯库，没有运行时服务。**

    安装就是 `pip install -U langgraph`。
    没有 CLI 启服务、没有容器编排、没有 Web UI（Web UI 在 Deep Agents / LangSmith 那侧）。

    **生产部署官方指向 LangSmith Deployment。**
    官方 overview 把**「Production-ready deployment」**链到 LangSmith Deployment。
    该页对它的定义是：

    **官方原文**："a workflow orchestration runtime purpose-built for agent workloads"

    它配 `langgraph deploy`。
    环境分四档：Cloud / Hybrid / 自托管 K8s / Standalone Agent Server。
    Cloud 需 **Plus 档及以上**。

    **即托管运行落在商业平台那一层；OSS 本身只负责「你自己把进程跑起来」。**

  local_files: >-
    **⚠ 文件系统不在 LangGraph 的职责范围内。**

    官方首页讲文件系统的唯一位置，是把 Deep Agents 作为高层包推荐：

    **官方原文**："leverage file systems for complex tasks"

    **即文件能力被归到上层封装，而不是底层图引擎。**

    LangGraph 本身给的是**状态容器** —— checkpoint 里存的是 graph state。
    至于 agent 要不要读写磁盘、用什么工具读写，不归它管。

    **本站判断（推断）**：想要文件系统，得自己接工具。
    或者走 Deep Agents 那一层。

  background: >-
    **这是它最强的一维，且有官方明文。**

    第一条特性 **Durable execution** 官方原文是：

    Build agents that **persist through failures** and can run for extended periods, **automatically resuming from exactly where they left off**.

    配套是独立子包 `langgraph-checkpoint`。
    查 `libs/checkpoint`，该子包首页第一段就是：

    Checkpointers provide a persistence layer for LangGraph: they
    **save graph state at every superstep**, enabling
    human-in-the-loop, memory between interactions,
    **durable execution**, and more.

    **落盘粒度就是 superstep（图的一个步进）**——

    不是「会话结束时」，也不是「每轮对话后」

    **落盘后端官方给三档**（persistence 页）：

    - `InMemorySaver` —— 存 RAM，原文说它
      "does not persist between restarts"

    - `SqliteSaver` —— 本地文件，开发用
    - `PostgresSaver` —— 生产，原文 "In production, use a checkpointer
      backed by a database"

    另有 `langgraph-checkpoint-*` 的 MongoDB / Redis / Oracle 实现。

    **跨进程恢复靠数据库 + 同一 `thread_id`。**
    官方 durable-execution 页说可以
    **官方原文**："resume workflows from the last successful checkpoint"

    `langgraph>=1.2` 还给了 SIGTERM 的 graceful shutdown
    （drain 后存下可续跑的 checkpoint）。

    **未知：多进程并发写同一 thread 的冲突语义官方未说明。**
    ⚠ persistence 与 checkpointers 两页都没有写这一点。

  tools: >-
    **LangGraph 核心不含工具系统，但官方生态有统一 MCP 接入包。**

    官方自述的五项能力里没有一项是工具系统。
    工具接入经 LangChain 生态，或你自己的函数 ——
    LangGraph 负责图与状态，工具由 LangChain 或你的函数提供。

    **MCP：官方提供 `langchain-mcp-adapters`**（langchain-ai 组织）。
    官方首页对它的说法是

    **官方原文**："makes MCP tools compatible with LangChain and LangGraph"

    以及 **官方原文**："Convert MCP tools into LangChain tools that can be used with LangGraph agents"

    可连接多个 MCP server。**这就是 LangChain 生态的统一 MCP 接入层。**

    注意它是独立包（`pip install langchain-mcp-adapters`），不在 langgraph 核心里。

  context: >-
    **LangGraph 把「状态」和「记忆」分成两套机制，两套都有官方原文。**

    第三条特性 **Comprehensive memory** 官方原文是：

    Create truly stateful agents with both **short-term working memory for ongoing reasoning** and **long-term persistent memory across sessions**.

    **短期记忆**：官方 add-memory 页给了三条裁剪手段 ——
    Trim messages / Delete messages / Summarize messages。
    这三条就是短上下文的管法：裁剪、删除、摘要。
    该页对它们的定位是：

    **官方原文**："techniques to manually remove or forget stale information"

    **长期记忆**：用 store 存 JSON 文档。
    官方称它**支持语义搜索与内容过滤**：

    **官方原文**："supports both semantic search and filtering by content"

    它可跨 thread 召回。

    **未知：「大工具输出落盘」官方未说明 LangGraph 提供。**
    ⚠ memory 与 add-memory 两页都没有 ——
    那是上层 Deep Agents 的 context management 能力。

  permissions: >-
    **官方给的是 human-in-the-loop。** 它是「检查并修改状态」级别，不只是确认。

    第二条特性 **Human-in-the-loop** 官方原文是：

    Seamlessly incorporate human oversight by **inspecting and modifying agent state at any point during execution**.

    文档在 `langgraph/interrupts`。

    **与其它对象对比，这一点有实质差别。**
    三者的介入层次递进，用行内列举是因为本解析器不支持嵌套块内的列表写法：

    - [OpenAI Agents SDK](openai-agents-sdk.md) 的 guardrail 是**校验内容**（输入/输出合不合规）
    - [Google ADK](google-adk.md) 的 Tool Confirmation 是**拦执行**（这个工具要不要跑）
    - **LangGraph 的 interrupts 是改状态**（在任意执行点检查并修改图的状态）

    ⚠ **但要说清：它明确给的不是沙箱或权限边界。**
    官方文档未提及文件系统权限模型、网络访问控制、工具级白名单。
    与本站收录的 OpenHands 对照。它有明确的 Docker 沙箱 + API key 机制。
    也与 Codex SDK（源码里三档 SandboxMode 枚举）对照。
    **LangGraph 在这一维度上目前查不到官方机制**。

  fit: >-
    **适合四类场景。**

    - agent 流程要跑很久，且必须能从中断处精确恢复
    - 需要人工在流程中间介入并修改状态
    - 要把「工作记忆」与「跨会话长期记忆」分开管理
    - 需要显式图结构（分支、循环、子图）；团队用 Python

    **不适合三类场景。**

    - 需要内建沙箱或文件级权限边界 —— 官方未提供此类机制（已查 README 与 interrupts 页）
    - 想要开箱即用的文件系统与子代理 —— 走 Deep Agents，它是 LangGraph 上的高层包
    - 不想额外依赖 LangChain 生态 —— 模型接入通常要经它

pitfalls:
  - 把 Deep Agents 与 LangGraph 当两个竞品 —— **Deep Agents 是建在 LangGraph 上的高层包**（README 明确）
  - 用 releases/latest 判版本 —— **monorepo 的 latest 不可靠**：本条实测 latest 返回
    `cli==0.4.32.dev0`（子包 dev 版），主包版本需从 release 列表里挑（本次核验主包为 1.2.12）

  - 把 checkpoint 持久化读成「上下文管理」—— checkpoint 存的是 **graph state**，
    上下文压缩与记忆是 README 里另设的 memory 那一层

  - 以为它自带文件系统或工具系统 —— 这两样它都不管，要么自己接，要么走 Deep Agents
  - 以为 interrupts 是权限护栏 —— 它是「检查并修改状态」，不划文件/网络边界
  - 以为装完 LangGraph 就够了 —— 官方首屏就引导用 LangSmith 做调试与部署，那是商业产品

tags: [Python, 开源, MIT, 编排框架, 图执行, 持久化, 状态管理, checkpoint, superstep, durable-execution, HITL, interrupts, 长期记忆, LangChain]
related: [filesystem]

sources:
  - label: langchain-ai/langgraph · 仓库（42,538★，MIT，核验 2026-10-01）
    url: https://github.com/langchain-ai/langgraph
    kind: repo

  - label: 主 README（定位、Durable execution / HITL / memory 三项能力、Deep Agents 关系、Pregel 溯源）
    url: https://github.com/langchain-ai/langgraph/blob/main/README.md
    kind: docs

  - label: libs/checkpoint/README.md（"save graph state at every superstep" 原文）
    url: https://github.com/langchain-ai/langgraph/blob/main/libs/checkpoint/README.md
    kind: docs

  - label: 官方文档 · Durable execution
    url: https://docs.langchain.com/oss/python/langgraph/durable-execution
    kind: docs

  - label: 官方文档 · Interrupts（HITL）
    url: https://docs.langchain.com/oss/python/langgraph/interrupts
    kind: docs

  - label: 官方文档 · Memory（短期工作记忆 vs 跨会话长期记忆）
    url: https://docs.langchain.com/oss/python/langgraph/memory
    kind: docs

  - label: 官方文档首页
    url: https://docs.langchain.com/oss/python/langgraph/overview
    kind: docs

  - label: Deep Agents 文档（README 指向的「higher-level package built on LangGraph」）
    url: https://docs.langchain.com/oss/python/deepagents/overview
    kind: docs

  - label: langchain-ai/langgraphjs · JS/TS 版独立仓
    url: https://github.com/langchain-ai/langgraphjs
    kind: repo

  - label: Releases（主包 1.2.12 @ 2026-09-21；latest 为子包 cli==0.4.32.dev0）
    url: https://github.com/langchain-ai/langgraph/releases
    kind: changelog

  - label: 官方文档 · Persistence（checkpointer vs store、落盘后端、故障恢复，核验 2026-10-08）
    url: https://docs.langchain.com/oss/python/langgraph/persistence
    kind: docs

  - label: 官方文档 · Checkpointers（每 superstep 快照、durability modes、后端库清单）
    url: https://docs.langchain.com/oss/python/langgraph/checkpointers
    kind: docs

  - label: 官方文档 · Add memory（短期 Trim/Delete/Summarize、长期 store 语义搜索）
    url: https://docs.langchain.com/oss/python/langgraph/add-memory
    kind: docs

  - label: LangSmith Deployment（官方生产托管运行时，`langgraph deploy`）
    url: https://docs.langchain.com/langsmith/deployment
    kind: docs

  - label: langchain-ai/langchain-mcp-adapters · 官方 MCP 适配层
    url: https://github.com/langchain-ai/langchain-mcp-adapters
    kind: repo

link:
  url: https://docs.langchain.com/oss/python/langgraph/
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
  direct_note: docs.langchain.com 直连实测 200；PyPI 安装源实测可达。
  direct_note_en: docs.langchain.com measured 200 direct; PyPI install route measured reachable.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**LangGraph 是一个低层编排框架，专门用来构建有状态的 agent。**

官方自述很克制，注意那个 low-level：

> Low-level orchestration framework for building **stateful** agents.

它自认不是开箱即用的高层封装。
它打的是「长时间运行、有状态」这件事的地基。

## 它对「状态」的回答最认真

本站的核心主张是「**状态 ≠ 上下文**」。
LangGraph 是本站收录对象里唯一一个在官方首页就把这层区分讲明白的。

### Durable execution：落盘粒度是 superstep

第一条特性叫 **Durable execution**：

> Build agents that **persist through failures**
> and can run for extended periods, **automatically resuming
> from exactly where they left off**.

**「exactly where they left off」是关键。**
不是从头重跑，是从中断的那个步进继续。

落盘机制在独立子包 `langgraph-checkpoint`。
查 `libs/checkpoint`，该子包首页第一段就是：

> Checkpointers provide a persistence layer for LangGraph: they
> **save graph state at every superstep**, enabling
> human-in-the-loop, memory between interactions,
> **durable execution**, and more.

⚠ **这是本站见过对「状态持久化」最明确的官方定义。**
粒度是 **superstep（图的一个步进）**。不是「会话结束时」，也不是「每轮对话后」。
本站对这条粒度的记录：**落盘粒度是 superstep**（图的一个步进）。它不是「会话结束时」。也不是「每轮对话后」。

⚠ 但要诚实：**跨机器 / 多进程并发写同一 thread 的冲突语义官方未说明**。
persistence 文档只给数据库后端与 durability 模式（2026-10-08 核验）。

### 状态与记忆：它分成两套机制

第三条特性叫 **Comprehensive memory**：

> Create truly stateful agents with both
> **short-term working memory for ongoing reasoning**
> and **long-term persistent memory across sessions**.

**两个时间尺度的区分，正是本站主张的同构表达**：

- checkpoint → 存**流程状态**（状态面）
- memory → 另设一层，分**工作记忆**与**跨会话长期记忆**（记忆面）

⚠ **本站最想强调的一条**：**别把 checkpoint 持久化读成「上下文管理」。**
checkpoint 存的是 graph state。
长上下文怎么裁剪，是 memory 那一层的事。
两者在本页被严格分开记录 —— 这也是 v3 铁律「状态 ≠ 上下文」的落地方式。

⚠ 本站未核验三项：

- 短期记忆具体如何裁剪上下文（是否即压缩/摘要）
- 长期记忆的存储后端与检索方式
- 本站关心的「大工具输出落盘」是否属其能力

## HITL 的层次不一样：它能改状态，不只是拦一下

第二条特性 **Human-in-the-loop** 官方原文是：

> "Seamlessly incorporate human oversight by
> **inspecting and modifying agent state at any point during execution**."

把本站已收录的三种人工介入放在一起看，**层次是递进的**：

| 对象 | 机制 | 介入点 |
|---|---|---|
| OpenAI Agents SDK | guardrails | 校验**内容**（输入/输出合不合规） |
| Google ADK | Tool Confirmation | 拦**执行**（这个工具要不要跑） |
| **LangGraph** | **interrupts** | **改状态**（在任意执行点检查并修改图的状态） |

⚠ **但必须说清它明确不给什么。**
官方文档未提及文件系统权限模型、网络访问控制、工具级白名单。

对比本站收录的 OpenHands（明确的 Docker 沙箱 + API key 机制）、
Codex SDK（源码里三档 `SandboxMode` 枚举）——
**LangGraph 在权限边界这一维度上目前查不到官方机制。**

## 选型必读：它和 Deep Agents 是上下层，不是两个选项

这是本站必须替用户理清的一个关系，否则会重复计数。

官方首页首屏就放了一句 TIP，指向 Deep Agents：

> If you're looking to quickly build agents, check out **Deep Agents**
> — a **higher-level package built on LangGraph** for agents that can
> plan, use subagents, and leverage file systems for complex tasks.

**即：Deep Agents 是建在 LangGraph 上的高层包。**

| | LangGraph（本条） | Deep Agents（本站已收录） |
|---|---|---|
| 定位 | low-level 编排框架 | batteries-included harness |
| 抽象 | 显式的图、superstep | agent + 预置工具 |
| 文件系统 | **不管**（README 归到上层） | 核心卖点 |
| 子代理 | 自己用图表达 | 预置 |
| 记忆 | checkpoint + memory 两套 | persistent memory + summarize |
| 适合 | 长流程、要精确恢复、要人工改状态 | 想快、想要功能齐全 |

**一句口诀**：想自己画流程、要精确恢复 → LangGraph。
想少写接线、要现成能力 → Deep Agents（它跑在 LangGraph 上）。

## 工具与文件系统：它明确不管

- **文件系统**：官方首页里唯一相关的一句，是把 Deep Agents 作为上层包推荐
  （"leverage file systems for complex tasks"）—— **文件能力归上层，不归图引擎**。
  LangGraph 给的是**状态容器**（checkpoint 里存的是 graph state）。

- **工具系统**：五项能力里没有工具系统。工具接入经 LangChain 生态。

⚠ 本站**不把它与本站 MCP 站的 9 个 server 关联**。没有证据表明 LangGraph 自带 MCP 客户端。

## 溯源与生态：它借鉴了谁

官方首页末尾的 Acknowledgements 有价值：

> LangGraph is inspired by **[Pregel](https://research.google.com/pubs/pub37252/)**
> and **[Apache Beam](https://beam.apache.org/)**.
> The public interface draws inspiration from
> **[NetworkX](https://networkx.org/)**.
> LangGraph is built by LangChain Inc, the creators of LangChain,
> but **can be used without LangChain**.

**「can be used without LangChain」。** 这句是本站判断它不是强绑定的关键依据。
模型接入通常经 LangChain，但不装也行。

（Pregel 是 Google 的图计算论文。它是 Bulkhead/Beam 那套大图计算思路的来源。）

## 版本号：踩过一个坑，请注意

⚠ **本站实测：`releases/latest` 对这个 monorepo 不可靠。**

`gh api repos/langchain-ai/langgraph/releases/latest` 返回的是
**`cli==0.4.32.dev0`（子包 dev 版）**，不是主包版本。

正确做法是列最近几个 release 自己挑主包。
本次核验（2026-10-01）的结果：

| tag | 发布日| 说明 |
|---|---|---|
| `cli==0.4.32.dev0` | 2026-09-23 | 子包 dev 版，**不是主包** |
| `cli==0.4.32` | 2026-09-23 | 子包 |
| **`1.2.12`** | **2026-09-21** | **← 主包，本条采用** |
| `sdk==0.4.5` | 2026-09-21 | 子包 |

monorepo 的子包命名是 `<子包>==<版本>`，无前缀那个才是主包。

## 适合与不适合

**适合**：agent 流程要跑很久且必须能从中断处精确恢复；要人工在流程中间介入并改状态；
要分开管理工作记忆与跨会话记忆；需要显式图结构（分支、循环、子图）。

**不适合**：需要内建沙箱或文件级权限边界（官方未提供此类机制，2026-10-08 核验）；
想要开箱即用的文件系统与子代理（走 Deep Agents）；不想额外依赖 LangChain 生态。

## 核验说明

`confidence: partial` 的依据（2026-10-03 由 verified 降级）：

> **为什么降级**：正文「未知项清单」里仍有主语是**本站**的取证缺口
> （如「多进程并发写同一 thread 的冲突语义」「interrupts 重入边界」
> 「LangSmith 配套的商业条款」），已不是「官方未提供」那一类。
> 按 v3 铁律「未知就说未知」，标 verified 属于虚高 —— 降为 partial。
> **2026-10-08 补核验**：短期记忆裁剪（Trim / Delete / Summarize）、
> 长期记忆（store 语义搜索 + 内容过滤）、`langchain-mcp-adapters`、
> 「可不用 LangChain」四项已从缺口移出。

- ✅ 已核验：仓库存在与星数（42,538）、许可（MIT，经 license API）、
  > 最近推送（2026-10-01，仍活跃）、官方首页全文（定位、三项核心能力、
  > Deep Agents 上下层关系、Pregel/Beam/NetworkX 溯源、can be used without LangChain）、
  > `libs/checkpoint/README.md` 的 "save graph state at every superstep" 原文、
  > `libs/` 下 9 个子包清单（`checkpoint`、`checkpoint-sqlite`、`checkpoint-postgres`、
  > `prebuilt`、`cli`、`sdk-py`、`sdk-js`、`checkpoint-conformance` 等）、
  > releases 列表 6 条（含 latest 不可靠的实测记录）
- ⚠ 未核验且**属于官方未提供**（不属于本站缺口）：工具系统、文件系统、
  > 模型 provider 清单 —— 本站已如实记为
  > 「不在其职责范围内」而非「未查到」
- ⚠ 未核验且**是本站缺口**（构成降为 partial 的直接依据）：
  > superstep 落盘性能代价、interrupts 重入边界、
  > 多进程并发写同一 thread 的冲突语义（官方未说明）、
  > 长期记忆的具体存储后端、LangSmith 配套的商业条款、Python 与 JS/TS 版的能力对齐度

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按编排框架 + 持久化维度定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | 长流程跑到一半 kill 进程，恢复后是否真的从中断点继续 | 「exactly where they left off」是官方明文承诺，必须验证 |
| 2 | **superstep 粒度落盘在长任务下的写入开销** | 官方说每个 superstep 都存，step 多时 I/O 成本未知 |
| 3 | Postgres checkpointer 在多进程并发下的冲突行为 | 本站最担心的点，未核验 |
| 4 | interrupts 中途修改状态后，图的重入行为 | 官方说可 modify agent state，边界未核验 |
| 5 | 短期记忆裁剪（Trim / Delete / Summarize）在长会话下的实际成本 | 官方给了手段，成本未核验 |
| 6 | 用 LangGraph 最小示例 vs Deep Agents 同等需求的代码量差 | 量化「低层」这个自评到底多低层 |

## 未知项清单

- checkpoint 在跨机器 / 多进程并发下的写冲突与恢复语义
- superstep 级落盘的性能与写入量代价
- 长期记忆的具体存储后端（官方只给 store 抽象，未指明后端）
- interrupts 修改状态后的重入边界
- LangSmith 配套的免费额度与商业条款（报价按 D9 口径本站不采），以及不用它时 LangGraph 是否完整可用
- Python 与 JS/TS 版的能力对齐度

## 相关条目

- [Deep Agents](./deepagents.md) — **同公司、上下层关系，不是竞品**：README 明示 Deep Agents 是 built on LangGraph 的高层包（带规划、子代理、文件系统）。要开箱还是要底座，这是本站最该给用户看的一张对照表。
- [Google ADK](./google-adk.md) — **编排家族内的对照**：同为图执行编排框架，ADK 给 Workflow Runtime + state management，LangGraph 给每 superstep 落盘的 checkpoint。
- [CrewAI](./crewai.md) — 同为编排框架，抽象中心不同（角色/任务 vs 图节点）。
- [OpenAI Agents SDK](./openai-agents-sdk.md) — 形态相反：那个是单 agent 原语 + 内建 guardrail；本条是低层图引擎 + 状态持久化，不提供工具系统。
