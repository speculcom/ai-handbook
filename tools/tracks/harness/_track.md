# Harness 分区定义

**主题**：Agent 运行时 / 编排框架 / Agent SDK

**建立时间**：2026-09-30
**依据**：`_plan/v3-roadmap.md`（现行计划）

---

## 这个分区在站点群里的位置

```
   产品层                        Harness 层                  模型层
   ide.specul.com                harness.specul.com          models.specul.com
   cli.specul.com                （本站）                    （挂起）
   你直接用的成品          ←→     你自己搭的底座      ←→      跑什么模型

   能力扩展（可叠加在产品层与 Harness 层之上）：mcp.specul.com
```

| 层 | 回答的问题 | 与 Harness 的关系 |
|---|---|---|
| 产品层（ide/cli） | 我在哪个界面干活？ | **消耗** Harness，或**内置**了某套 Harness |
| 组件层（mcp） | 给它加什么能力？ | **叠加**在两者之上，不替代 |
| **Harness 层（本站）** | **我要不要自己搭？** | **替代**成品，或给成品提供底座 |
| 模型层 | 跑什么模型？ | 供给前两层 |

**本站只回答一个问题：我要不要自己搭一个 Agent？自建的话从哪套开始。**

---

## 收录标准

| # | 标准 | 判定方式 |
|:--:|---|---|
| 1 | 提供 **Agent 运行时 / 编排层 / SDK**，即把模型变成能干活系统的软件 | 有 `agent loop` / `runtime` / `orchestrator` 概念，不只是 UI 组件库 |
| 2 | 有可访问的**官方仓库或文档**，能回溯到原文 | `sources` 至少 1 条官方 URL |
| 3 | **近 30 天内有实质更新** | `pushed_at` 距核验日 ≤ 30 天 |

**为什么第 3 条是硬标准**：Harness 领域半衰期极短。
收一个停更 5 个月的项目，会让「最小上手路径」与「最新版本」两栏失效。

---

## 收录对象（15 个 · 2026-10-08 扩至 15；初版 10 个于 2026-09-30 经 GitHub API 核验）

> 分组与数据里的 `family` 字段**逐条对齐**（`scripts/audit.mjs` 校验「声明 vs 实际文件」）。
> 2026-10-08 修正：原文档把 OpenHands 放在「编程底座」、把 ADK / CrewAI 放在「通用」——
> 那是 09-30 的旧分组；数据早已改为按**抽象层**分（coding-base / orchestration / general-harness）。

### 编程底座（5）

给你 agent loop 或把现成 CLI 包成编程接口的一层。

| id | 名称 | 厂商 | 仓库 | ★ | 许可 | 最新版本 |
|---|---|---|---|---|---|---|
| `openai-agents-sdk` | OpenAI Agents SDK | OpenAI | `openai/openai-agents-python` | 29.8k | MIT | v0.22.3 |
| `claude-agent-sdk` | Claude Agent SDK | Anthropic | `anthropics/claude-agent-sdk-python` | 8.2k | MIT | v0.2.163 |
| `codex-sdk` | Codex SDK | OpenAI | `openai/codex` | 127k | Apache-2.0 | rust-v0.159.2 |
| `pydantic-ai` | Pydantic AI | Pydantic | `pydantic/pydantic-ai` | 13.0k | MIT | 2.54.0（2026-10-02） |
| `smolagents` | smolagents | Hugging Face | `huggingface/smolagents` | 29.7k | Apache-2.0 | 1.26.0（2026-05-29） |

### 编排框架（7）

把多步骤、多 Agent、要中断恢复的流程显式建成图。

| id | 名称 | 厂商 | 仓库 | ★ | 许可 | 最新版本 |
|---|---|---|---|---|---|---|
| `langgraph` | LangGraph | LangChain | `langchain-ai/langgraph` | 42.5k | MIT | 1.2.12 |
| `google-adk` | Google ADK | Google | `google/adk-python` | 21.7k | Apache-2.0 | v2.10.0 |
| `crewai` | CrewAI | CrewAI Inc | `crewAIInc/crewAI` | 59.2k | MIT | 1.15.23 |
| `llamaindex` | LlamaIndex | LlamaIndex | `run-llama/llama_index` | 52.4k | MIT | v0.14.25 |
| `microsoft-agent-framework` | Microsoft Agent Framework | Microsoft | `microsoft/agent-framework` | 14.0k | MIT | python-1.20.0 |
| `ag2` | AG2 | ag2ai | `ag2ai/ag2` | 5.0k | Apache-2.0 | v1.1.2 |
| `mastra` | Mastra | Mastra AI | `mastra-ai/mastra` | 28.6k | Apache-2.0 核心 + `ee/` 企业许可 | 1.75.0（@mastra/core，2026-10-07） |

### 通用 Harness（3）

预置规划 / 文件系统 / 记忆等一整套，或自带完整运行时。

| id | 名称 | 厂商 | 仓库 | ★ | 许可 | 最新版本 |
|---|---|---|---|---|---|---|
| `openhands` | OpenHands | All-Hands-AI | `OpenHands/OpenHands` | 89.6k | MIT | v1.24.0 |
| `hermes-agent` | Hermes Agent | Nous Research | `NousResearch/hermes-agent` | 250k | MIT | v2026.9.24 |
| `deepagents` | Deep Agents | LangChain | `langchain-ai/deepagents` | 29.9k | MIT | 0.7.20 |

> ★ 数与版本为快照值，会变。以各条目页的 `last_verified` 为准。

### 编程底座的三种形态（本站核心区分点）

同为「在你自己的机器上跑」，编程底座内部的技术路线**根本不同**。它们不是同一层的不同实现：

| 形态 | 含义 | 代表 | 你能改什么 |
|---|---|---|---|
| **① 自建 loop 框架** | 框架给原语，agent loop 由你定义 | OpenAI Agents SDK（pydantic-ai、smolagents 同属这一路线） | loop 形状、要不要加层 |
| **② 包装既有 CLI** | 能力来自一个成熟 CLI，SDK 只是驱动它 | Claude Agent SDK | 只能配options，loop 由 CLI 定 |
| **③ 自带完整运行时** | 产品级运行时，多用户/服务化 | Codex SDK | 部署形态，能力已打包 |

**这个区分直接决定选型**：
选 ① 你得到控制权；选 ② 你得到成熟度；
选 ③ 你得到运维能力但要接受它的抽象。

⚠ **换模型是第二条分界线**：① 通常能换（provider-agnostic），
② 几乎必然锁死在厂商模型上。例如 Claude Agent SDK 只能跑 Claude。

---

## 已核验的关键事实（2026-09-30 现场核验，与计划快照有出入处）

| 事实 | 计划里写的 | 实际核验 | 影响 |
|---|---|---|---|
| Claude Agent SDK 版本 | v0.2.162 | **v0.2.163**（当天 19:47 发布） | 快照会过期，佐证必须现场核验 |
| Claude Agent SDK 的模型支持 | 未记录 | **仅 Claude，无 provider 旁路** | 关掉「本地模型 + 该 SDK」这条路 |
| Claude Agent SDK 捆绑CLI | 未记录 | CLI随 pip 包捆绑，实为 **2.1.286** | 它是 CLI 的 SDK，不是纯库 |
| OpenAI Agents SDK 的 MCP | 未记录 | `mcp>=1.19.0` 在**核心依赖**里 | MCP 是其一等能力 |
| Claude Agent SDK TS 版授权 | 未记录 | **无 LICENSE 文件、license API 返 null** | 授权状态不明，用前须确认 |

---

## 明确不收的对象与理由

**这部分本身就是有价值的信息** —— 用户会来问「为什么某某不在这里」。

| 对象 | 不收理由 |
|---|---|
| **Vercel AI SDK** | **不是 Agent 框架。** 它是 AI 应用 UI 组件库 + 模型调用抽象层，不提供 agent loop / 运行时。混进来会让「要不要自己搭」这个问题答错 |
| **OpenCode / Claude Code CLI / Codex CLI / Aider / Gemini CLI / Crush** | 已在 `cli.specul.com`。**OpenCode 官方没有独立 SDK**，本站用 `related` 引用，不重复收录 |
| **Cursor / Windsurf / Copilot / Zed / Cline** | 已在 `ide.specul.com` |
| **各 MCP server** | 已在 `mcp.specul.com`。MCP 是叠加层，不是 Harness |
| **Qoder Cloud Agents / Claude Managed Agents 等托管执行服务** | **v3 决定不收**：这类是**厂商托管服务**（不自建那一侧），属产品层/云服务。用户来本站是为了自建决策，收进来会让核心问题失焦 |
| **AutoGen（微软原仓库）** | **D2 已结案（2026-10-08）**：社区线以 `ag2` 收录；微软官方线（AutoGen + Semantic Kernel 合并）以 `microsoft-agent-framework` 收录。原仓库本身 `pushed_at` 停在 2026-04-15，不再单列 |
| **CAMEL / OWL** | 论文导向的研究框架，非产品选型对象 |

---

## 这个分区的坐标系

**沿用通用 8 维度**（ID 不变，便于跨站对照）。但每个维度在 harness 语境下问的问题不同。

| # | 维度 ID | 三站共用 | **harness 语境的具体问题** |
|:--:|---|---|---|
| 1 | `model_access` | 模型与开放条件 | 支持哪些 provider？**能不能接本地模型**？换模型要不要改代码？是否绑定单一厂商模型？ |
| 2 | `runtime` | 运行位置 | **谁运营这个 agent loop**？SDK/框架 vs 托管服务，责任边界在哪？多 agent 并发谁调度？ |
| 3 | `local_files` | 本地文件 | 能访问多大范围？工作目录外要不要批准？**多 agent 并发时文件锁怎么处理**？ |
| 4 | `background` | 关机后的任务 | 自托管 = 关了就停。有没有托管选项？**断点续跑**怎么实现（状态存哪）？ |
| 5 | `tools` | 工具与扩展 | **MCP 支持到什么程度**？自定义工具怎么注册？Hooks 能力？子代理？ |
| 6 | `context` | 上下文与记忆 | **状态持久化 vs 上下文压缩**（本站核心分野，见下节） |
| 7 | `permissions` | 权限与限制 | 沙箱隔离、审批粒度、凭据管理、代码执行边界 |
| 8 | `fit` | 适合什么任务 | **什么形态的自建适合它**？最小上手路径是什么？ |

---

## ⚠ 本分区最需要讲清的一件事：状态 ≠ 上下文

这是 Harness 领域最容易被误解的一点。**它必须放在分区文档**里，各条目引用即可，不必重复 10 次。

| 概念 | 做法 | 失败模式 |
|---|---|---|
| **上下文压缩** | 把历史对话压短以塞进窗口 | 压缩会丢信息。长任务后 Agent「忘了」做过什么 |
| **状态持久化** | 计划/进度/检查点落盘，新会话能接上 | 才是可靠长期运行的前提 |

**这是判断一个 Harness 成不成熟的第一指标。**

> 依据需回官方原文核验（Anthropic 长任务工程博客、Claude Managed Agents 的「会话为追加日志」设计），
> 不能只引竞品站。v3 铁律：竞品研究只作方法论参考，**不作数据来源**。

---

## ⚠ 第二件要讲清的事：同生态的两个项目不是同一个东西

以 LangChain 生态为例：

```
LangGraph     ← 低层编排 runtime（状态图、中断恢复、重试控制）
    ↑
Deep Agents   ← 在 LangGraph 上预置了文件系统/记忆/子代理的通用 Harness
```

用户最常踩的坑就是把这两个当成同一个东西。

**规则**：**每对同生态对象必须在详情页显式互相引用，并说明层级差异。**
本分区同生态对：`langgraph` ↔ `deepagents`。

---

## 「我要不要自己搭」决策树（站首页必答）

```
用现成产品就够（ide / cli 站能解决）
   → 不需要 Harness，结束

要把 Agent 嵌进自己的产品里
   → 需要 SDK           → 编程底座 4 选 1

流程复杂 / 多 agent 协作 / 要能中断恢复
   → 需要编排框架        → 编排框架 2 选 1

要做长期助手（跨会话记忆、周期任务）
   → 通用 Harness       → 通用 Harness 4 选 1
```

---

## 与其他分区的关系

```
ide.specul.com ──┐
cli.specul.com ──┤──→  各产品内部用的 harness（相关引用，不重复收录）
                 │
mcp.specul.com ──┘

harness.specul.com ──→  models.specul.com（接什么模型）
```

---

## 实测任务集

见 [`tasks/`](./tasks/)。

**Harness 分区特有的测试维度**（本站不跑 benchmark，仅列协议）：

| # | 测试项 | 为什么重要 |
|:--:|---|---|
| 1 | 最小 hello agent 需要几个文件、多少行配置 | 反映真实上手成本 |
| 2 | 中断后能否恢复，状态存在哪 | 验证「状态持久化」是否真落地 |
| 3 | 工具调用失败时的重试与降级行为 | 边界处理的成熟度 |
| 4 | 并发多个 agent 时的资源与文件冲突 | 多 agent 场景的真实成本 |
| 5 | 换一个模型 provider 要改多少代码 | 厂商锁定程度 |

---

## 数据约定

- 档案格式与 ide/cli/mcp 三站一致（frontmatter + 正文 + `sources` + `pitfalls` + `confidence`）
- 校验：`node scripts/validate.mjs --strict`
- **每个对象至少 1 条 `pitfalls`**：针对该对象最常见误解的精确打击，不是泛泛免责声明
- 许可为 `NOASSERTION` 的一律显式标注「非标准许可」，不当作开源
