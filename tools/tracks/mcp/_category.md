# mcp 大类收录声明

**主题**：给 AI 装的工具——MCP server 与工具接口，给 agent 接上文件、浏览器、GitHub 这些能力。
定义与边界裁决见 [../../categories.md](../../categories.md) §10。

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
| 托管 MCP 聚合器（如 Composio） | 只进 nav，不建档：它把多个应用聚合成一个端点，权限与数据要经过第三方，和「单个 server」不是同一层 |

## 托管 MCP 聚合器 vs 单个 server

- **单个 server**：一个进程或端点只做一类能力（文件、Git、浏览器），权限面窄，装之前能逐项审。
- **托管聚合器**：一个 MCP endpoint 接数百个应用（Composio 是常见例子），省去逐个接入，但权限、OAuth 令牌与数据流都经过第三方；要单独评估信任边界。
- **选型判断**：要最小权限、自己审代码 → 单个 server；要快速接大量 SaaS、能接受第三方托管 → 聚合器。两者不能混为一谈。

## 收录对象（32 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `1password-mcp` | 1Password Environments MCP Server | 1Password | MCP | 8 项已核 · 活跃 |
| `atlassian-mcp` | Atlassian Remote MCP Server（Jira/Confluence） | Atlassian | MCP | 8 项已核 · 活跃 |
| `brave-search-mcp` | Brave Search MCP Server | Brave | MCP | 8 项已核 · 活跃 |
| `browserbase-mcp` | Browserbase MCP Server | Browserbase | MCP | 8 项已核 · 活跃 |
| `chrome-devtools-mcp` | Chrome DevTools MCP | Google（Chrome DevTools 团队） | MCP | 8 项已核 · 活跃 |
| `cloudflare-mcp` | Cloudflare MCP Server | Cloudflare | MCP | 8 项已核 · 活跃 |
| `context7` | Context7 | Upstash | MCP | 8 项已核 · 活跃 |
| `datadog-mcp` | Datadog MCP Server | Datadog | MCP | 8 项已核 · 活跃 |
| `everything` | Everything MCP Server | Model Context Protocol | MCP | 8 项已核 · 活跃 |
| `exa-mcp` | Exa MCP Server | Exa | MCP | 8 项已核 · 活跃 |
| `fetch` | Fetch MCP Server | Model Context Protocol | MCP | 8 项已核 · 活跃 |
| `figma-mcp` | Figma MCP Server | Figma | MCP | 8 项已核 · 活跃 |
| `filesystem` | Filesystem MCP Server | Model Context Protocol | MCP | 8 项已核 · 活跃 |
| `firecrawl-mcp` | Firecrawl MCP Server | Firecrawl | MCP | 8 项已核 · 活跃 |
| `git` | Git MCP Server | Model Context Protocol | MCP | 8 项已核 · 活跃 |
| `github-mcp` | GitHub MCP Server | GitHub | MCP | 8 项已核 · 活跃 |
| `grafana-mcp` | Grafana MCP Server | Grafana Labs | MCP | 8 项已核 · 活跃 |
| `intercom-mcp` | Intercom MCP Server | Intercom | MCP | 8 项已核 · 活跃 |
| `memory` | Knowledge Graph Memory Server | Model Context Protocol | MCP | 8 项已核 · 活跃 |
| `linear-mcp` | Linear MCP | Linear | MCP | 8 项已核 · 活跃 |
| `mongodb-mcp` | MongoDB MCP Server | MongoDB | MCP | 8 项已核 · 活跃 |
| `neon-mcp` | Neon MCP Server | Neon | MCP | 8 项已核 · 活跃 |
| `notion-mcp` | Notion MCP | Notion | MCP | 8 项已核 · 活跃 |
| `playwright` | Playwright MCP Server | Microsoft | MCP | 8 项已核 · 活跃 |
| `sentry-mcp` | Sentry MCP / Toolkit | Sentry | MCP | 8 项已核 · 活跃 |
| `sequential-thinking` | Sequential Thinking MCP Server | Model Context Protocol | MCP | 8 项已核 · 活跃 |
| `shopify-mcp` | Shopify Dev MCP Server | Shopify | MCP | 8 项已核 · 活跃 |
| `slack-mcp` | Slack MCP Server | Slack（Salesforce） | MCP | 8 项已核 · 活跃 |
| `stripe-mcp` | Stripe Agent Toolkit / MCP | Stripe | MCP | 8 项已核 · 活跃 |
| `supabase-mcp` | Supabase MCP | Supabase | MCP | 8 项已核 · 活跃 |
| `time` | Time MCP Server | Model Context Protocol | MCP | 8 项已核 · 活跃 |
| `zapier-mcp` | Zapier MCP | Zapier | MCP | 8 项已核 · 活跃 |

> 共 **32** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成；改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
