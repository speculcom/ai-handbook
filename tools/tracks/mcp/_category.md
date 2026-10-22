# mcp 大类收录声明

**主题**：给 AI 装的工具——MCP server 与工具接口，给 agent 接上文件、浏览器、GitHub 这些能力。
定义与边界裁决见 [../../categories.md](../../categories.md) §9。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | 是一个**可运行的 MCP server**（或官方工具接口，协议在档案里注明） |
| 2 | 有官方仓库/文档，`transport / auth / scope` 三维至少两维可答 |
| 3 | **能力边界可核验**（它能读写什么、要不要密钥） |

**形态归属**：本大类对象 `form: mcp`，额外必填 `mcp.transport` / `mcp.auth` / `mcp.scope`
三个特有维度（定义见 [taxonomy/](./taxonomy/)）。

**边界情况**：

| 情况 | 处理 |
|---|---|
| 开发 MCP server 用的 SDK | 不收（那是开发工具，不是 server 本体） |
| 非 MCP 的插件协议生态 | 只进 nav（本类以 MCP 为主干，其他协议诚实标注） |
| 模型本地服务（Ollama 也暴露接口） | 归 `runner`（主轴是跑模型不是接工具） |
| MCP 客户端 | 不收（那是 agent 侧的事） |
| awesome-mcp 类索引仓库 | 不收（那是 nav 的活） |

## 收录对象（10 份）

| id | 名称 | 厂商 |
|---|---|---|
| `context7` | Context7 | Upstash |
| `everything` | Everything MCP Server | Model Context Protocol |
| `fetch` | Fetch MCP Server | Model Context Protocol |
| `filesystem` | Filesystem MCP Server | Model Context Protocol |
| `git` | Git MCP Server | Model Context Protocol |
| `github-mcp` | GitHub MCP Server | GitHub |
| `memory` | Knowledge Graph Memory Server | Model Context Protocol |
| `playwright` | Playwright MCP Server | Microsoft |
| `sequential-thinking` | Sequential Thinking MCP Server | Model Context Protocol |
| `time` | Time MCP Server | Model Context Protocol |

> 候选全集与去向见 `inventory/mcp.md`（T9 盘点后建立）。
