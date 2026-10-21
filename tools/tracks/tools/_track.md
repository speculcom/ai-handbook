# MCP 分区定义

**主题**：MCP 服务器 / 工具生态

---

## 这个分区和另外两个分区的根本区别

| 分区 | 对象是什么 | 怎么变强 |
|---|---|---|
| ide / cli | **工具本身** | 模型更强、索引更快、审批更细 |
| **mcp** | **工具的实现** | 权限更小、输出更结构化、装起来更简单 |

**MCP 服务器是被 Agent 调用的接口实现。** 评价标准完全不同：

一个 IDE 好不好，看它能不能把活干完。
一个 MCP server 好不好，看它**会不会乱来**、**输出能不能用**。

---

## ⚠ 全分区通用声明：官方 reference server 不是生产就绪

MCP servers 仓库 README 的原文声明：

> The servers in this repository are intended as **reference implementations**
> to demonstrate MCP features and SDK usage. They are meant to serve as
> educational examples for developers building their own MCP servers,
> **not as production-ready solutions**. Developers should evaluate their own
> security requirements and implement appropriate safeguards based on their
> specific threat model and use case.

**翻译**：本仓库的 server 是**参考实现**，用于演示 MCP 特性与 SDK 用法。
它面向正在构建自己 MCP server 的开发者，**不是生产就绪方案**。
使用者需自行评估安全需求并按自身威胁模型实现防护。

**适用范围**：本分区全部 7 个官方 reference server
（`everything` `fetch` `filesystem` `git` `memory` `sequential-thinking` `time`）。

**社区维护的 2 个**（`playwright` `context7`）不适用此声明，
但它们各自的 README 有自己的注意事项。例如 playwright 声明来源限制不构成安全边界。

**为什么把这条放在分区文档而不是每个条目**：
重复 7 次会让读者疲劳。**分区文档声明一次，各条目在正文引用即可**。

---

## 收录标准

| # | 标准 |
|:--:|---|
| 1 | 是**可运行的 MCP server**（不是 SDK 文档、不是教程） |
| 2 | 有**可访问的仓库或文档**，含至少一个 tool 定义 |
| 3 | 形态明确（stdio 进程 / 远程 HTTP 服务 / 二进制） |

**边界情况**：

| 情况 | 处理 |
|---|---|
| MCP client（Cursor、Claude Desktop 等） | 不收，那是 IDE/客户端分区 |
| MCP SDK 库 | 不收，是开发工具不是 server |
| 只有教程没实现的仓库 | 不收 |
| 商业托管的 MCP 服务（如某云的托管 server） | 收，但要写清托管方与计费 |

---

## 收录对象

**活跃的官方 reference server（7 个）**：

| id | 名称 | 类别 | 来源 |
|---|---|---|---|
| `filesystem` | Filesystem | 文件 | 官方 servers repo |
| `git` | Git | 版本控制 | 官方 servers repo |
| `memory` | Memory | 记忆 | 官方 servers repo |
| `sequential-thinking` | Sequential Thinking | 推理 | 官方 servers repo |
| `fetch` | Fetch | 抓取 | 官方 servers repo |
| `time` | Time | 时间 | 官方 servers repo |
| `everything` | Everything | 参考测试 | 官方 servers repo |

**社区维护的 server（2 个）**：

| id | 名称 | 类别 | 来源 |
|---|---|---|---|
| `playwright` | Playwright MCP | 浏览器 | microsoft/playwright-mcp |
| `context7` | Context7 | 检索 | upstash/context7 |

**厂商官方 server（1 个）**：

| id | 名称 | 类别 | 来源 |
|---|---|---|---|
| `github-mcp` | GitHub MCP Server | 版本控制 / API | github/github-mcp-server（GitHub 官方维护） |

**已归档，不作为活跃对象收录（但可作历史条目）**：

官方已将以下 server 移入 [servers-archived](https://github.com/modelcontextprotocol/servers-archived)：
`aws-kb-retrieval-server` · `brave-search` · `everart` · `gdrive` · `git`（旧） · `github`（旧参考 server） · `gitlab` · `google-maps` · `postgres` · `puppeteer` · `redis` · `sentry` · `slack` · `sqlite`

> **重要**：GitHub、Postgres、GitLab、Puppeteer 等曾 widely used 的 server
> **已不在官方活跃仓库**。引用它们时要注明归档状态。
> 归档仓库自 2025-05 后基本无更新。
>
> ⚠ **GitHub 要单独说明（2026-10-08 修正）**：上面归档的是 **MCP 组织维护的旧参考 server**；
> GitHub 官方自己的 server 是另一条**活跃**产品线 `github/github-mcp-server`
> （本地 Docker 与远程托管两种形态都在维护），已按活跃对象收录（见上方「厂商官方 server」表）。
> **不要把归档状态套到它头上** —— 这是本文件此前最容易引起误判的一处。

**收录判断**：已归档对象若仍有大量实际使用（如 github、postgres），
可作为「历史/归档」条目收录。但 `confidence` 最高只能给 `partial`。
正文首段还要标明归档事实与归档日期。

---

## 这个分区的坐标系

**通用 8 维度 + MCP 特有 3 维度。**

### 特有维度

| # | 维度 | 核心问题 | 定义 |
|:--:|---|---|---|
| A | 传输方式 | 怎么连？ | [transport.md](./taxonomy/transport.md) |
| B | 认证机制 | 怎么授权？ | [auth.md](./taxonomy/auth.md) |
| C | 权限范围 | 能碰多少？ | [scope.md](./taxonomy/scope.md) |

### 通用 8 维度在 MCP 语境的问法

| # | 维度 | MCP 语境的具体问题 |
|:--:|---|---|
| 1 | 模型与开放条件 | 本身不用模型；**但能否被任意客户端调用**？（协议兼容性） |
| 2 | 运行位置 | 本地进程 / 远程服务 / 容器 |
| 3 | 本地文件 | 能读写哪些路径？是否递归整个盘？ |
| 4 | 关机后的任务 | 远程 server 可持续运行；本地 stdio 进程随客户端生死 |
| 5 | 工具与扩展 | **提供几个 tool、每个做什么、输出是否结构化** |
| 6 | 上下文与记忆 | 是否有状态？跨会话保留吗？ |
| 7 | 权限与限制 | **核心维度** — 认证、权限范围、写操作风险 |
| 8 | 适合什么任务 | 具体场景，不是"开发辅助" |

---

## MCP 分区的评价重点

### ① 权限范围是第一位的

**对比两种 server：一个能读整个文件系统，一个只能读 `./data`。它们的风险差一个量级**。
前者能碰你的一切文件。后者只碰指定目录。

```
默认请求全文件系统访问权限；
如需收紧可配置目录白名单。
```

这一条必须写死在 `scope` 字段里，不能含糊。

### ② 输出结构化程度决定可用性

| 输出类型 | 例子 | 可用性 |
|---|---|---|
| 结构化 JSON | `{ "rows": [...] }` | 高，可直接消费 |
| 半结构化 | Markdown 表格 | 中，需解析 |
| 自由文本 | "查询到 3 条记录…" | 低，需再问一次 |

**10 个返回自由文本的 tool，不如 3 个返回结构化结果的 tool。**

### ③ 协议版本兼容性

MCP 规范本身在演进。老 server 可能只支持旧版传输方式。

**必须写清支持哪些传输**（见 transport.md）。

### ④ 安全声明

```
独立 Sentinel 检查外部动作；敏感操作需批准。
```

**有独立审批机制的 server 和没有的，是两种信任级别。**

---

## MCP 分区的常见误解来源

| 角度 | 本分区例子 |
|---|---|
| 权限范围 | 默认能读整盘，要手动收紧 |
| 认证 | "本地进程所以不用认证"——错了，文件权限就是边界 |
| 输出质量 | 能返回 ≠ 返回得可用 |
| 协议支持 | 支持 stdio ≠ 支持远程 |
| 依赖假设 | npm 依赖装不上就完全不能用 |
| 组合爆炸 | 单个 server 没问题，10 个叠加后权限过宽 |

---

## 组合风险

**MCP 生态特有的问题**：单个 server 权限合理，叠加后可能失控。

判定时要考虑：

| 组合类型 | 风险 |
|---|---|
| 多个只读 server | 低 |
| 读写 + 命令执行 | 高 |
| 涉及凭据的多个 server | 高（凭据分散） |
| 网络可达的 server | 中高 |

**如果能写清"建议与 X 搭配使用"，是有价值的信息。**

---

## 与其他分区的关系

```
ide.specul.com ──┐
cli.specul.com ──┴── 客户端侧：谁来调用这些 server

mcp.specul.com ────── 服务端侧：server 本身的能力与风险
```

**交叉引用**：IDE/CLI 分区的 `tools` 维度会提到「支持 MCP」。它指向本分区。

---

## 实测任务集

MCP 分区的实测和工具分区不同。**它不是测"能不能干完活"，而是测"接口是否可用、边界是否清楚"**。

见 [`tasks/`](../agents/tasks/)（协议共用，实测内容按分区替换）。

**MCP 分区的实测重点**：
1. 装得上吗（依赖是否满足）
2. tool 列表是否与文档一致
3. 输出是否能直接消费
4. 权限边界是否可收紧
5. 出错时的错误信息是否可诊断
