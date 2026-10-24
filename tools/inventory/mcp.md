# mcp 大类收录清单（inventory）

> 去向枚举：`已有`（档案在 `tracks/mcp/products/`）/ `待建`（P1>P2>P3）/ `只进nav` / `不收`（必须带理由）。
> 收录标准见 [categories.md §9](../categories.md)：**给 AI 装的工具**——MCP 服务器。优先收官方自营（厂商自己维护的 server）与官方 reference server；社区 server 只在头部流量时收。
> 候选来源交叉（≥2）：modelcontextprotocol 官方 servers 仓 + servers registry + 各厂商官方公告 + v8 计划候选名单。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| Context7 | Upstash | https://context7.com | 已有 | context7 | |
| everything（参考示例） | modelcontextprotocol | https://github.com/modelcontextprotocol/servers | 已有 | everything | 官方 reference |
| fetch | modelcontextprotocol | https://github.com/modelcontextprotocol/servers | 已有 | fetch | 官方 reference |
| filesystem | modelcontextprotocol | https://github.com/modelcontextprotocol/servers | 已有 | filesystem | 官方 reference |
| git | modelcontextprotocol | https://github.com/modelcontextprotocol/servers | 已有 | git | 官方 reference |
| GitHub MCP Server | GitHub | https://github.com/github/github-mcp-server | 已有 | github-mcp | 厂商官方 |
| memory（知识图谱参考） | modelcontextprotocol | https://github.com/modelcontextprotocol/servers | 已有 | memory | 官方 reference |
| Playwright MCP | Microsoft | https://github.com/microsoft/playwright-mcp | 已有 | playwright | 官方团队维护 |
| sequential-thinking | modelcontextprotocol | https://github.com/modelcontextprotocol/servers | 已有 | sequential-thinking | 官方 reference |
| time | modelcontextprotocol | https://github.com/modelcontextprotocol/servers | 已有 | time | 官方 reference |
| Sentry MCP | Sentry | https://github.com/getsentry/toolkit | 已有 | sentry-mcp | P1 · 厂商官方（2026-10-21 直抓：sentry-mcp 仓现 redirect 到 getsentry/toolkit「Agentic tooling for Sentry」，FSL-1.1-Apache-2.0） |
| Notion MCP | Notion | https://developers.notion.com/docs/mcp | 已有 | notion-mcp | P1 · 官方 remote server（notion.mcp.run 直抓 000 网络受限；官方文档页 200，端点 mcp.notion.com/mcp 直抓 401=存在需鉴权） |
| Slack MCP | Slack（Salesforce） | https://docs.slack.dev/ai/slack-mcp-server | 已有 | slack-mcp | P1 · 官方 remote（2026-10-21 直抓：slackapi/slack-mcp-server 仓 404——现役是 Slack 官方托管 mcp.slack.com/mcp，docs.slack.dev 文档线 200） |
| Supabase MCP | Supabase | https://github.com/supabase/mcp | 已有 | supabase-mcp | P1 · 厂商官方（2026-10-21 直抓：旧仓名 redirect 到 supabase/mcp，Apache-2.0） |
| Stripe Agent Toolkit / MCP | Stripe | https://docs.stripe.com/agentic-commerce | 已有 | stripe-mcp | P1 · 厂商官方（建档时按官方现状定名） |
| Chrome DevTools MCP | Google | https://github.com/ChromeDevTools/chrome-devtools-mcp | 已有 | chrome-devtools-mcp | P1 · ChromeDevTools 官方仓 |
| Figma Dev Mode MCP | Figma | https://developers.figma.com/docs/figma-mcp-server/ | 已有 | figma-mcp | P1 · 官方 remote+desktop 双形态（旧 help 文章 404；developers.figma.com 文档线 200，端点 mcp.figma.com/mcp 直抓 405=存在） |
| Linear MCP | Linear | https://linear.app/mcp | 已有 | linear-mcp | P1 · 官方 remote |
| MongoDB MCP | MongoDB | https://github.com/mongodb-js/mongodb-mcp-server | 已有 | mongodb-mcp | P1 · 厂商官方（mongodb.com/docs/mcp 直抓 404；官方仓 mongodb-js/mongodb-mcp-server 200，Apache-2.0） |
| Cloudflare MCP | Cloudflare | https://github.com/cloudflare/mcp-server-cloudflare | 已有 | cloudflare-mcp | P2 · 厂商官方 |
| Atlassian MCP（Jira/Confluence） | Atlassian | https://www.atlassian.com/platform/remote-mcp-server | 已有 | atlassian-mcp | P2 · 官方 remote |
| Zapier MCP | Zapier | https://actions.zapier.com/docs/platform/mcp/ | 已有 | zapier-mcp | P2 · 官方（千余应用入口） |
| Brave Search MCP | Brave | https://github.com/brave/brave-search-mcp-server | 已有 | brave-search-mcp | P2 · 厂商官方（补 reference 归档后的搜索位） |
| Neon MCP | Neon | https://github.com/neondatabase/mcp-server-neon | 已有 | neon-mcp | P2 · 厂商官方（旧 docs 路径 404；官方仓 200，MIT） |
| Grafana MCP | Grafana Labs | https://grafana.com/docs/grafana-cloud/machine-learning/mcp/ | 已有 | grafana-mcp | P2 |
| Datadog MCP | Datadog | https://www.datadoghq.com/about/partners/mcp/ | 已有 | datadog-mcp | P2 |
| Exa MCP | Exa | https://github.com/exa-labs/exa-mcp-server | 已有 | exa-mcp | P2 |
| Firecrawl MCP | Firecrawl | https://github.com/mendableai/firecrawl-mcp-server | 已有 | firecrawl-mcp | P2 |
| Browserbase MCP | Browserbase | https://github.com/browserbase/mcp-server-browserbase | 待建 | browserbase-mcp | P3 |
| Shopify MCP（MCP 化 Storefront） | Shopify | https://shopify.dev/docs/agents-of-change | 待建 | shopify-mcp | P3 · 建档前核官方现状 |
| 1Password MCP | 1Password | https://developer.1password.com/docs/mcp/ | 待建 | 1password-mcp | P3 · 凭据类，建档时权限维度重点 |
| Intercom MCP | Intercom | https://www.intercom.com/mcp | 待建 | intercom-mcp | P3 |
| Postgres MCP（community） | crystaldba 等社区 | https://github.com/crystaldba/postgres-mcp | 只进nav | | 无厂商官方 server，社区实现分散——八维核验价值低 |
| Puppeteer MCP | modelcontextprotocol（已归档） | https://github.com/modelcontextprotocol/servers | 不收 | | 官方 servers 仓已把它移入 **archived**（不再维护），官方推荐 Playwright MCP——已有档案 |
| Slack MCP（旧 reference） | modelcontextprotocol（已归档） | https://github.com/modelcontextprotocol/servers | 不收 | | reference 版已归档，现役是 slackapi 官方仓（进待建 P1），不重复收 |
| Google Drive MCP | 社区 | https://github.com/gogapi/mcp-server | 只进nav | | 无 Google 官方 server，社区实现 |
| Apple Books / Finder 类社区 server | 各类社区 | https://github.com/modelcontextprotocol/servers | 只进nav | | 社区长尾不逐个建档（收录标准：官方自营或头部） |

## 备注

- 「已有」28 行 = `tracks/mcp/products/` 现有档案全集（孤儿检查守）。
- MCP 特有三维（transport/auth/scope）见 `tracks/mcp/taxonomy/`——建档时逐条挂官方文档。
- 官方 servers 仓的 **archived 区**（2026-10-21 直抓 README 核验）：AWS KB Retrieval / Brave Search（已由官方 `@brave/brave-search-mcp-server` 接替）/ EverArt / GitHub（旧参考版）/ GitLab / Google Drive / Google Maps / **PostgreSQL** / **Puppeteer** / Redis / **Sentry（参考版）** / **Slack（参考版，转 Zencoder 维护）** / SQLite——官方自己不再维护，收进来会误导选型，全部「不收」或转收厂商官方版。现役 reference 只有 7 个（Everything/Fetch/Filesystem/Git/Memory/Sequential Thinking/Time）= 已有档案的官方来源。
- 官方 README 明示：reference server 是**教学示例不是生产方案**；找服务器去 **MCP Registry**（registry 是候选池，收录仍按「官方自营或头部」标准）。
- T22 建档批已落地 14 份（P1 9 + P2 5：Sentry/Notion/Slack/Supabase/Stripe/Chrome DevTools/Figma/Linear/MongoDB + Cloudflare/Atlassian/Zapier/Brave/Neon）；P2 四份 Grafana/Datadog/Exa/Firecrawl 已于 2026-10-24 补齐；P3 清单留后续批次。2026-10-21 建档时 URL 重核：Sentry 仓 redirect 到 getsentry/toolkit（FSL-1.1-Apache-2.0）、Slack 旧仓 404（现役官方托管 mcp.slack.com）、Supabase 仓现名 supabase/mcp、Figma 旧 help 文章 404（现役 developers.figma.com）、MongoDB docs/mcp 404（现役 mongodb-js 仓）、Neon 旧 docs 路径 404（现役 neondatabase 仓）、Linear 旧 /sse 端点 404（现役 /mcp）。
