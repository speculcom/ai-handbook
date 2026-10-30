---
id: brave-search-mcp
form: mcp
name: Brave Search MCP Server
vendor: Brave
homepage: https://github.com/brave/brave-search-mcp-server
license: MIT（GitHub API 核验 2026-10-30）。
licenseEn: MIT (GitHub API verified 2026-10-21).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Brave Search API
    （web 搜索、新闻、图像、local 地点）包装成工具给 agent 用。
  runtime: >-
    本地进程（npx stdio）+ 远程托管线（官方有 remote 端点说明）；GitHub 1,544★，
    最近推送 2026-10-27（API 核验）。
  local_files: >-
    不读写本机文件——它输出搜索结果文本/链接；抓取网页内容不在它范围（那是 fetch server 的活）。
  background: >-
    stdio 随客户端生死；无后台任务语义。
  tools: >-
    web_search / news_search / image_search / video_search / local_search 等按 API 族分组，
    可按配置裁剪启用；完整清单以仓 README 为准。
  context: >-
    无跨会话记忆——每次搜索独立。
  permissions: >-
    Brave Search API key（免费层/付费层按 Brave API 账户走）；纯读面——
    它不能写任何系统，风险面主要是查询内容外发与配额消耗。
  fit: >-
    适合：给 agent 补「现役搜索」能力（reference 的 Brave 版归档后，官方 @brave 包接替）、
    要独立于大模型内置搜索的检索源。
    不适合：要深度抓取正文（fetch/firecrawl 线）；无 API key 的零配置场景。

pitfalls:
  - 用 modelcontextprotocol 仓里的旧 Brave reference——已归档，现役是官方 @brave/brave-search-mcp-server（官方 README 明写接替关系）
  - 把「搜索」当「抓取」——它返回结果摘要与链接，不抓正文
  - API key 配额与计费层按 Brave 账户走——D9 口径：本站不记价格数字

tags: [MCP, 搜索, MIT, 本地stdio, 读面]
related: [cursor, claude-code]

mcp:
  transport: >-
    **stdio**（npx @brave/brave-search-mcp-server）为主；官方另有远程线说明——未逐条核验。
    核验：仓 README（2026-10-21 直抓）。
  auth: >-
    BRAVE_API_KEY 环境变量；key 的配额/套餐层按 Brave API 账户（D9 不采价格）。
  scope: >-
    纯读：搜索族工具（web/news/image/video/local）。无写面；无审批需求。

sources:
  - label: brave/brave-search-mcp-server · 仓库（MIT；1,544★，最近推送 2026-10-27，GitHub API 核验）
    url: https://github.com/brave/brave-search-mcp-server
    kind: repo
  - label: brave/brave-search-mcp-server · Releases（changelog）
    url: https://github.com/brave/brave-search-mcp-server/releases
    kind: changelog
  - label: modelcontextprotocol/servers · README（官方归档说明：Brave 由 @brave 包接替）
    url: https://github.com/modelcontextprotocol/servers
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Brave Software, Inc.（美国）。
  origin_note_en: Brave Software, Inc. (US).
  direct: no
  direct_note: github.com 直连实测 000（波动，同日代理可达 200）。
  direct_note_en: github.com measured 000 direct (fluctuating; 200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Brave 官方搜索 MCP server**（MIT）：给 agent 补一路独立检索源（web/新闻/图像/地点）。
一条归档事实：MCP 组织仓里的旧 Brave reference 已归档，官方 README 明写由 @brave 包接替——
本条目就是现役那条。

## 适合与不适合

适合：要独立于模型内置搜索的检索面、纯读低风险接入。
不适合：要抓正文（fetch 线）；零配置无 key 场景。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 远程托管线当前状态（未逐条核验）
- 各搜索族工具的完整参数面（未逐条清点）

## 相关条目

- [Fetch MCP Server](./fetch.md) — 检索↔抓取分工对照：Brave 给「找到哪页」，fetch 给「读这页正文」。
