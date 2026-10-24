---
id: exa-mcp
form: mcp
name: Exa MCP Server
vendor: Exa
homepage: https://exa.ai/docs/reference/exa-mcp
license: MIT（GitHub API 核验 2026-10-23）。
licenseEn: MIT (GitHub API verified 2026-10-23).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Exa 的检索与抓取
    （web search、网页正文、多步研究 Agent）包装成工具给 agent 用。
  runtime: >-
    官方托管远程 server（https://mcp.exa.ai/mcp，streamable-http）为主；
    仓同时是 Agent Plugin（agent-plugins.org 生态）与 Claude/Codex 插件线。
    GitHub 5,162★，最近推送 2026-10-19（API 核验）；GitHub releases 为空，
    发版线在 npm（exa-mcp-server 3.4.2）。
  local_files: >-
    不读写本机文件——输出检索结果与网页正文（clean markdown）。
  background: >-
    服务在 Exa 侧；会话请求-响应，无后台监听语义。
  tools: >-
    默认两工具：web_search_exa（搜索取干净内容）、web_fetch_exa（按 URL 读全文 markdown）；
    可选工具经 URL 参数 ?tools= 开启：web_search_advanced_exa（过滤/域名/日期/子页爬取）、
    agent_run（Exa Agent 多步研究/列表构建/结构化输出）。
    仓内 skills/ 目录带 search 与 exa-agent 两个 Agent Skill（插件安装时装载）。
  context: >-
    无 server 侧跨会话记忆——每次检索独立；多步状态在 Exa Agent 任务内。
  permissions: >-
    **匿名可用**：托管端点匿名接入带速率限制（官方 README 口径）；
    提额与 Exa Agent 要 OAuth（推荐，客户端弹登录）或 API key
    （?exaApiKey= 参数 / Authorization Bearer / x-api-key 三种传法）。
    纯读面——不能写任何系统，风险面是查询内容外发与配额。
  fit: >-
    适合：给 agent 一路「搜索+读正文」二合一的检索面（默认两工具就覆盖）、
    零门槛接入（匿名可用）、要多步研究 Agent 的进阶面。
    不适合：要深度站点级爬取编排（crawl/map 这类面在 firecrawl 线）；
    要完全离线（托管线要连 Exa）。

pitfalls:
  - 只看到默认两工具——advanced search 与 agent_run 要经 ?tools= 参数显式开启，且会**替换**默认集（官方 README：include all you want）
  - 把 GitHub releases 当发版线——该仓 releases 为空，现役版本在 npm（exa-mcp-server）
  - 匿名档当正式档——匿名可用但限流；Exa Agent 必须鉴权（OAuth 或 key）
  - 把「搜索」与「整站爬取」混为一谈——它给检索与单页正文，站点级 crawl/map 不是它的形态

tags: [MCP, 搜索, 抓取, MIT, 远程托管, 匿名可用]
related: [cursor, claude-code]

mcp:
  transport: >-
    **streamable-http**（https://mcp.exa.ai/mcp）；经 Agent Plugin / Claude / Codex
    插件线安装时同一托管端点。核验：仓 README（2026-10-23 直抓）。
  auth: >-
    匿名可用（限流）；OAuth 优先（?login 或 /oauth 强制登录流）；
    API key 可走 ?exaApiKey= 查询参数、Authorization Bearer 或 x-api-key 头。
  scope: >-
    纯读：搜索族 + 网页读取 + 研究 Agent。无写面；无审批需求。

sources:
  - label: exa-labs/exa-mcp-server · 仓库（MIT；5,162★，最近推送 2026-10-19，GitHub API 核验）
    url: https://github.com/exa-labs/exa-mcp-server
    kind: repo
  - label: npm · exa-mcp-server（发版线：GitHub releases 为空，npm 3.4.2 为最新）
    url: https://www.npmjs.com/package/exa-mcp-server
    kind: changelog
  - label: Exa · 官方 MCP 文档（仓 homepage 字段指向；直抓 000 网络受限，未逐页核验）
    url: https://exa.ai/docs/reference/exa-mcp
    kind: docs

last_verified: 2026-10-23
last_updated: 2026-10-23
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Exa（前 Metaphor Systems，美国）。
  origin_note_en: Exa (formerly Metaphor Systems, US).
  direct: no
  direct_note: exa.ai 与 mcp.exa.ai 直连实测 000（网络受限，非死链）；GitHub 仓与 raw README 经代理 200（2026-10-23）。
  direct_note_en: exa.ai and mcp.exa.ai measured 000 direct (network restricted, not dead); the GitHub repo and raw README returned 200 via proxy (2026-10-23).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-23 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-23); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-23
---

## 一句话定位

**Exa 官方 MCP server**（MIT）：默认就两工具——web_search_exa 搜索、web_fetch_exa 读正文，
干净 markdown 直供 agent。**匿名就能连**（限流），OAuth/API key 提额并解锁 Exa Agent 多步研究。
诚实标注：GitHub releases 为空，发版线在 npm；advanced search 与 agent_run 要 ?tools= 显式开。

## 适合与不适合

适合：要「搜索+读正文」二合一的检索面、零门槛接入、多步研究 Agent 进阶面。
不适合：站点级爬取编排（firecrawl 线）；完全离线场景。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 匿名档与鉴权档的速率限制具体数值（官方 README 只说 rate limits，未逐条核验；按快照纪律不记数字）
- Exa Agent 的工具面与 Connect providers 细节（README 指向 docs.exa.ai，未逐页核验）
- Agent Plugin 生态的兼容客户端清单（README 引 agent-plugins.org，未逐条核验）

## 相关条目

- [Firecrawl MCP](./firecrawl-mcp.md) — 同为检索+抓取官方 server：Exa 默认极简两工具，Firecrawl 是 27 工具的全家桶面。
- [Fetch MCP Server](./fetch.md) — 检索↔抓取分工对照：fetch 是 reference 级单页读取，Exa 把搜索与读取打包成一路。
