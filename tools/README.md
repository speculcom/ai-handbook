# ai-agent-guide

> English version: [README.en.md](./README.en.md)

**AI agent 地图集** · 纯 Markdown · 开源

记录 **AI coding agent / agent runtime / MCP server** 的能力边界、运行位置与官方证据，
用一套固定坐标系组织，让选型变成可回溯的判断而不是感觉。

这个仓库**只存数据，不出结论页面**。结论层由一站三分区消费（2026-10-04 起 v4 架构，
旧的 ide / cli / mcp / harness 四个独立子域已合并）：

| 分区 | 主题 | 收录对象 |
|---|---|---|
| `agent.specul.com/` | 成品 agent（含 IDE / CLI / 厂商云三种形态） | Cursor · Claude Code · Copilot · Windsurf · Zed · Cline · Aider · Codex · OpenCode · Crush · Gemini CLI · Kiro · Goose · Warp · Jules · Dot · Muse · Grok Bot 等 27 份 |
| `agent.specul.com/harness/` | Agent 运行时 / 编排框架 / SDK | Claude Agent SDK · Codex SDK · OpenAI Agents SDK · Pydantic AI · smolagents · CrewAI · Google ADK · LangGraph · LlamaIndex · Microsoft Agent Framework · AG2 · Mastra · Deep Agents · Hermes Agent · OpenHands |
| `agent.specul.com/tools/` | MCP 服务器 / 工具生态 | filesystem · git · memory · sequential-thinking · fetch · time · playwright · context7 · everything · github-mcp |

**为什么叫 atlas**：不是给你一堆工具名，是给你一张能给 52 个对象定位的地图。

**harness 分区为什么单列**：成品 agent 是「用户直接用的产品」，harness 是「你拿来自己搭 agent 的底座」。
两者的选型问题完全不同——前者问「哪个好用」，后者问「状态存哪、上下文怎么压、权限给到哪一档」。

---

## 这不是又一份 awesome list

同类项目通常是一串链接。本仓库走的是另一条路：

| 常见做法 | 本仓库 |
|---|---|
| 按 star / 流行度排序 | **不给总分排名** |
| 抄官网宣传语 | 只记官方源可核验的能力边界 |
| 没查到就留空 | **「未知」是合法答案**，并说明为什么 |
| 一份名单 | **固定 8 维度 × 52 个对象**，可横向对比 |
| 链接失效无人知 | 每条判断挂官方源，附核验日期 |

**核验快照，不冒充实时实测。**

---

## 我该怎么读

这个仓有 52 份档案，但大多数人不需要全看。按你手里那个具体问题走：

| 你要解决什么 | 走哪条路 |
|---|---|
| 「我该用哪个成品工具」 | 先分清是 IDE / CLI / 厂商云，再看 [`tracks/agents/`](./tracks/agents/) |
| 「我要自己搭一个 agent」 | 直接去 [`tracks/harness/`](./tracks/harness/)，看状态怎么存、上下文怎么压、权限给到哪一档 |
| 「我的 agent 需要连外部东西」 | [`tracks/tools/`](./tracks/tools/)，MCP 服务器生态 |
| 「我想比较两个东西到底差在哪」 | 先读 [`axes/`](./axes/) 里那 8 个维度分别问什么，再横向对着看 |

有个坑值得先说：成品 agent 和 harness 不是一回事。
前者问「哪个好用」，后者问「底座怎么搭」。混在一起比，比出来的结论没有意义。

站上的版本：<https://agent.specul.com/>

---

## 这个仓库的方法论

一句话：**不让没有实测的东西看起来像有结论。**

四条核心规则：

| 规则 | 做法 |
|---|---|
| **放弃总分** | 没有统一输入、预算、环境下的复现实测，就不给总分排名 |
| **固定坐标系** | 所有对象在同一组 8 个维度下被描述，不允许自定义维度 |
| **未知是合法答案** | 查不到就写「未知」+ 原因，绝不推测填充 |
| **每条判断挂证据** | 判断能回到官方一手源，区分发布 / 核验 / 生效三种时间语义 |

完整方法论见 [METHODOLOGY.md](./METHODOLOGY.md)。

---

## 快速上手

### 我想查一个工具的能力边界

1. 在 [axes/](./axes/) 看 8 个维度分别问什么
2. 在对应赛道的 `products/` 找条目
3. 点条目里的 `sources` 回官方原文

### 我想新增一个工具

1. 读 [SCHEMA.md](./SCHEMA.md) 了解字段格式
2. 复制同赛道任意条目作为模板
3. 按 [axes/](./axes/) 的判定标准填 8 个维度
4. 提 PR，附上你读过的官方源链接

### 我想修正一条数据

直接开 Issue，标明条目 id + 字段名 + 你的依据链接。
不接受无来源的修正。

### 我想跑一轮实测

读对应赛道的 `tasks/_protocol.md`，按协议跑，结果写进 `runs/`。

---

## 目录结构

```
ai-agent-guide/
├── METHODOLOGY.md              方法论总纲
├── SCHEMA.md                   数据格式规范
├── CONTRIBUTING.md             贡献指引
├── SOURCES.md                  来源索引
├── axes/                       8 个维度的定义与判定标准
│   ├── model-access.md         模型与开放条件
│   ├── runtime.md              运行位置
│   ├── local-files.md          本地文件
│   ├── background.md           关机后的任务
│   ├── tools.md                工具与扩展
│   ├── context.md              上下文与记忆
│   ├── permissions.md          权限与限制
│   └── fit.md                  适合什么任务
├── tracks/
│   ├── agents/                 成品 agent 赛道（v4：含原 ide / cli / cloud 三种形态）
│   │   ├── _track.md           赛道定义与收录标准
│   │   ├── products/           27 个对象
│   │   ├── tasks/              实测任务集
│   │   └── runs/               实测记录
│   ├── harness/                Agent 运行时 / 编排框架 / SDK 赛道
│   └── tools/                  MCP 生态赛道（多 3 个特有维度）
│       ├── _track.md           赛道定义与收录标准
│       ├── products/           10 个对象
│       └── tasks/              实测协议（未开跑）
├── scripts/                    校验脚本（validate / audit / quality）
├── CHANGELOG.md                数据层更新记录
└── raw/                        采集的原始素材（网页快照等，不入库）
```

### harness 赛道的 family 分组

harness 的 15 个对象按**抽象层**分三组，这是本站对该赛道最重要的一条判别依据：

| family | 含义 | 对象 |
|---|---|---|
| `coding-base` | 直接面向编程任务的底座 | Claude Agent SDK · Codex SDK · OpenAI Agents SDK · Pydantic AI · smolagents |
| `orchestration` | 编排 / 图执行框架 | CrewAI · Google ADK · LangGraph · LlamaIndex · Microsoft Agent Framework · AG2 · Mastra |
| `general-harness` | 通用助手型或自带完整运行时 | Deep Agents · Hermes Agent · OpenHands |

分组不是排名——同一层里不同框架解决的问题不同，不可直接比优劣。

---

## 数据可信度分级

每个条目有两个独立标记：

### `confidence` — 本站数据的可靠程度

| 值 | 含义 |
|---|---|
| `verified` | 8 维度均有官方来源支撑，且核验日在 90 天内 |
| `partial` | 部分维度标为未知，或核验日超过 90 天 |
| `stale` | 官方已发布重大变化，本站尚未核验 |

### `lifecycle` — 对象本身的状态

这一条比 `last_verified` 更决定「你的数据明天还有没有用」。

| 值 | 含义 |
|---|---|
| `active` | 上游近 30 天有提交或版本发布 |
| `maintenance` | 上游近 90 天有更新，但节奏明显放缓 |
| `archived` | 上游已归档、停止更新或转移维护方 |
| `unknown` | 无 changelog / 无仓库可判断 |

**组合约束**：`lifecycle` 为 `archived` 或 `unknown` 时，`confidence` 不得为 `verified`。

**为什么要单列**：一个对象即使今天刚核验过，
若上游已半年无更新，这条数据**明天就会失效**。

实例：某个开源 CLI 工具的仓库最后推送在 4 个月前——
这种信息必须显式记录，不能靠「核验日是新的」掩盖。

**引用本仓库数据时请同时带上 `confidence`、`lifecycle` 和 `last_verified`。**

---

## 已知边界

诚实地说明这个仓库**做不到**什么：

| 不做 | 原因 |
|---|---|
| 不给单一总分排名 | 缺少跨工具的统一实测，排名会误导 |
| 不推测未核验信息 | 「未知」比编造的数字有用 |
| 不做跨币种折算 | 汇率、区域、账户差异会被折算掩盖 |
| 不收录无官方文档的对象 | 无法核验的对象不进仓库 |
| 不做付费实测（当前） | 实测协议已就绪，未跑完前不发布结论 |
| 不保证覆盖完整 | 记录密度随各对象上游活跃度变化 |
| 数据可能过期 | 每条都带 `lifecycle` 与 `last_verified`，请一并核对 |

---

## 许可

内容采用 [CC BY 4.0](./LICENSE) 授权。

**使用要求**：署名「ai-coding-agent-atlas contributors」并链接回本仓库。
数据中的第三方商标与产品名归各自所有者，本仓库仅作索引与比较用途。

---

## 原始素材未入库

采集过程中抓取的网页正文快照（Cursor / Windsurf / Copilot 官网定价页与 changelog，
约 480KB）**未包含在本仓库**，原因是第三方网站内容的版权归属。

**这不影响可核验性**：每个条目都标注了对应的官方源 URL 与核验日期，
任何人都可以自行访问原文复核。

如需原始快照用于研究，请通过 Issue 联系。

---

## 关联项目

| 项目 | 说明 |
|---|---|
| **specul.com** | 品牌站（投机 · 推演） |
| **nav.specul.com** | 结论层：AI 站点导航 |
| **agent.specul.com** | 结论层：成品 agent / harness / MCP 工具三分区 |
| **learn.specul.com** | 结论层：AI 术语表 |
| **models.specul.com** | 结论层：本地部署量化模型索引 |
| **vg.specul.com** | 结论层：AI 做游戏 |

**方法论原型**：本仓库的「放弃总分 / 未知合法化 / 每条挂证据」三条规则
借鉴自 [AgentClash](https://aiagentclash.com/)，但坐标系与赛道定义是本仓库独立设计。

<!-- INDEX:BEGIN generated, do not edit -->

## 内容索引

### 成品 agent —— 27 份

开箱能用的产品。IDE / CLI / 厂商云都是这一类。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [Aider](tracks/agents/products/aider-cli.md) | Aider-AI | cli | partial | maintenance |
| [Aider Watch 模式](tracks/agents/products/aider.md) | Aider-AI | ide | partial | maintenance |
| [Amp](tracks/agents/products/amp.md) | Sourcegraph | cli | partial | active |
| [Claude Code CLI](tracks/agents/products/claude-code-cli.md) | Anthropic | cli | partial | active |
| [Claude Code IDE 扩展](tracks/agents/products/claude-code.md) | Anthropic | ide | partial | active |
| [Cline](tracks/agents/products/cline.md) | Cline Bot | ide | partial | active |
| [Codex CLI](tracks/agents/products/codex-cli.md) | OpenAI | cli | partial | active |
| [Codex IDE 扩展](tracks/agents/products/codex-ide.md) | OpenAI | ide | partial | active |
| [Continue](tracks/agents/products/continue.md) | Continue | ide | partial | archived |
| [Crush](tracks/agents/products/crush.md) | Charm | cli | partial | active |
| [Cursor](tracks/agents/products/cursor.md) | Anysphere | ide | partial | active |
| [Cursor CLI](tracks/agents/products/cursor-cli.md) | Anysphere | cli | partial | active |
| [Droid](tracks/agents/products/factory-droid.md) | Factory AI | cli | partial | active |
| [Gemini CLI](tracks/agents/products/gemini-cli.md) | Google | cli | partial | active |
| [GitHub Copilot](tracks/agents/products/copilot.md) | GitHub / Microsoft | ide | partial | active |
| [GitHub Copilot CLI](tracks/agents/products/copilot-cli.md) | GitHub | cli | partial | active |
| [Goose](tracks/agents/products/goose.md) | Agentic AI Foundation | cli | partial | active |
| [Jules](tracks/agents/products/jules.md) | Google | cloud | partial | active |
| [Junie](tracks/agents/products/junie.md) | JetBrains | ide | partial | active |
| [Kiro](tracks/agents/products/kiro.md) | AWS | ide | partial | active |
| [Meta Muse](tracks/agents/products/meta-muse.md) | Meta | cloud | partial | active |
| [OpenAI Dot](tracks/agents/products/openai-dot.md) | OpenAI | cloud | partial | active |
| [OpenCode](tracks/agents/products/opencode.md) | OpenCode | cli | partial | active |
| [Warp](tracks/agents/products/warp.md) | Warp | cli | partial | active |
| [Windsurf / Devin Desktop](tracks/agents/products/windsurf.md) | Cognition | ide | partial | active |
| [xAI Grok Bot](tracks/agents/products/grok-bot.md) | xAI | cloud | partial | active |
| [Zed](tracks/agents/products/zed.md) | Zed Industries | ide | partial | active |

### 自己搭的底座 —— 15 份

拿它拼自己的 agent：状态存哪、上下文怎么压、权限给到哪一档。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [AG2](tracks/harness/products/ag2.md) | ag2ai | harness | partial | active |
| [Claude Agent SDK](tracks/harness/products/claude-agent-sdk.md) | Anthropic | harness | partial | active |
| [Codex SDK](tracks/harness/products/codex-sdk.md) | OpenAI | harness | partial | active |
| [CrewAI](tracks/harness/products/crewai.md) | CrewAI Inc | harness | partial | active |
| [Deep Agents](tracks/harness/products/deepagents.md) | LangChain | harness | partial | active |
| [Google ADK（Agent Development Kit）](tracks/harness/products/google-adk.md) | Google | harness | partial | active |
| [Hermes Agent](tracks/harness/products/hermes-agent.md) | Nous Research | harness | partial | active |
| [LangGraph](tracks/harness/products/langgraph.md) | LangChain Inc | harness | partial | active |
| [LlamaIndex Framework](tracks/harness/products/llamaindex.md) | LlamaIndex（run-llama） | harness | partial | active |
| [Mastra](tracks/harness/products/mastra.md) | Mastra AI | harness | partial | active |
| [Microsoft Agent Framework](tracks/harness/products/microsoft-agent-framework.md) | Microsoft | harness | partial | active |
| [OpenAI Agents SDK](tracks/harness/products/openai-agents-sdk.md) | OpenAI | harness | partial | active |
| [OpenHands Agent Canvas](tracks/harness/products/openhands.md) | OpenHands（All-Hands-AI） | harness | partial | active |
| [Pydantic AI](tracks/harness/products/pydantic-ai.md) | Pydantic | harness | partial | active |
| [smolagents](tracks/harness/products/smolagents.md) | Hugging Face | harness | partial | active |

### 给 agent 装的工具 —— 10 份

MCP 服务器与工具生态。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [Context7](tracks/tools/products/context7.md) | Upstash | mcp | partial | active |
| [Everything MCP Server](tracks/tools/products/everything.md) | Model Context Protocol | mcp | verified | active |
| [Fetch MCP Server](tracks/tools/products/fetch.md) | Model Context Protocol | mcp | verified | active |
| [Filesystem MCP Server](tracks/tools/products/filesystem.md) | Model Context Protocol | mcp | verified | active |
| [Git MCP Server](tracks/tools/products/git.md) | Model Context Protocol | mcp | verified | active |
| [GitHub MCP Server](tracks/tools/products/github-mcp.md) | GitHub | mcp | partial | active |
| [Knowledge Graph Memory Server](tracks/tools/products/memory.md) | Model Context Protocol | mcp | verified | active |
| [Playwright MCP Server](tracks/tools/products/playwright.md) | Microsoft | mcp | verified | active |
| [Sequential Thinking MCP Server](tracks/tools/products/sequential-thinking.md) | Model Context Protocol | mcp | verified | active |
| [Time MCP Server](tracks/tools/products/time.md) | Model Context Protocol | mcp | verified | active |


<!-- INDEX:END -->

## 实测规模（A8）

<!-- STATS:BEGIN generated, do not edit -->
| 项 | 实测值 |
|---|---|
| 档案总数 | 52 份 |
| 分区分布 | agents 27 · harness 15 · tools 10 |
| 形态分布（track） | harness 15 · cli 12 · ide 11 · mcp 10 · cloud 4 |
| 对比维度 | 8 维（工具分区另加传输 / 认证 / 范围 3 维） |
<!-- STATS:END -->
