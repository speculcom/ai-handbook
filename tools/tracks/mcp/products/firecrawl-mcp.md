---
id: firecrawl-mcp
form: mcp
name: Firecrawl MCP Server
vendor: Firecrawl
homepage: https://firecrawl.dev
license: MIT（GitHub API 核验 2026-10-23）。
licenseEn: MIT (GitHub API verified 2026-10-23).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Firecrawl（「AI agent 的
    context API」）的搜索/抓取/解析/浏览器交互包装成工具给 agent 用。
  runtime: >-
    官方托管远程 server（https://mcp.firecrawl.dev/v2/mcp）+ 本地 npx（firecrawl-mcp）双线；
    官方 README 明写支持 cloud 与 self-hosted。GitHub 7,673★，最近推送 2026-10-23（API 核验）；
    发版线在 npm（firecrawl-mcp 3.34.1），GitHub releases 停在 v3.2.1（2025-09-26）——落后于 npm。
  local_files: >-
    不读写本机文件——输出网页正文（markdown/结构化 JSON）与解析产物（PDF 等文档）。
  background: >-
    托管线在 Firecrawl 侧；monitor 工具族可在 Firecrawl 侧按日程盯页面变更并出 diff/告警——
    这是「服务端任务」不是本机后台。
  tools: >-
    完整 profile 默认注册 **27 个工具**（README 口径，含 feedback 工具；
    FIRECRAWL_NO_SEARCH_FEEDBACK/NO_ENDPOINT_FEEDBACK 环境变量可减）：
    scrape / search / parse / crawl / map / interact（真实浏览器点击·填表·导航）/
    monitor 族 / credit_usage / agent 任务 / developer·gov·research 垂直搜索索引族。
    托管 keyless 端点只暴露 3 个（scrape/search/parse）；search-only 端点固定 9 个。
  context: >-
    无 server 侧跨会话记忆；interact 会话可经 scrapeId 跨调用续接（官方 README：
    不能从客户端单调用内逐步驱动，每调用跑完一个 prompt/code 回合即交还控制权）。
  permissions: >-
    **keyless 免费档可用**（scrape/search/parse 三工具，限流）；其余工具要 API key。
    官方 README 三条硬口径：key 绝不进 server URL、绝不进 agent 聊天、
    只配在客户端或 secret manager。OAuth 端点（/v2/mcp-oauth）走交互式账户连接。
  fit: >-
    适合：要「搜索→抓正文→结构化 JSON→浏览器交互→站点级 crawl/map→页面监控」全链一面包齐的 agent；
    要 keyless 起步再升 key 的渐进接入。
    不适合：要长期持有浏览器会话逐步驱动（README 明写这不是它的交互模型）；
    只要单页读取的极简场景（fetch reference 更轻）。

pitfalls:
  - 把 GitHub releases 当发版线——releases 停在 v3.2.1（2025-09），npm 已到 3.34.x，看 npm
  - 把 keyless 档当全功能——托管 keyless 只有 3 工具，crawl/map/agent 等要 key
  - 把 API key 塞进 server URL 或 agent 聊天——官方 README 明令禁止，只进客户端/secret manager
  - 把 interact 当可逐步驱动的浏览器会话——每调用跑完一个回合交还控制权，跨调用靠 scrapeId 续
  - 旧仓名 mendableai/firecrawl-mcp-server——已迁移到 firecrawl/ org（301 坐实），引用要换

tags: [MCP, 抓取, 搜索, MIT, 远程托管, keyless, 浏览器交互]
related: [cursor, claude-code]

mcp:
  transport: >-
    **streamable-http**（托管 https://mcp.firecrawl.dev/v2/mcp；另有 /v2/mcp-oauth
    与 /v2/mcp-search 两端点）+ **stdio**（npx -y firecrawl-mcp）双线；README 另提 SSE 支持。
    核验：仓 README（2026-10-23 直抓）。
  auth: >-
    keyless 免费档（限流）→ API key（Authorization Bearer，配客户端/secret manager）
    → OAuth 交互式连接（/v2/mcp-oauth）。本地 npx 线用 FIRECRAWL_API_KEY 环境变量。
  scope: >-
    读面为主（搜索/抓取/解析/监控）；interact 能在真实浏览器里点击填表——
    「读」与「在网页上动手」的分界要按目标站点的授权边界自己把关。无本机写面。

sources:
  - label: firecrawl/firecrawl-mcp-server · 仓库（MIT；7,673★，最近推送 2026-10-23，GitHub API 核验；旧名 mendableai/ 301 迁移坐实）
    url: https://github.com/firecrawl/firecrawl-mcp-server
    kind: repo
  - label: npm · firecrawl-mcp（发版线：3.34.1；GitHub releases 停在 v3.2.1）
    url: https://www.npmjs.com/package/firecrawl-mcp
    kind: changelog
  - label: Firecrawl · 官方文档 MCP 页（hosted 端点与客户端配置线）
    url: https://docs.firecrawl.dev/mcp-server
    kind: docs

last_verified: 2026-10-23
last_updated: 2026-10-23
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Firecrawl（mendable inc.，美国）。
  origin_note_en: Firecrawl (mendable inc., US).
  direct: no
  direct_note: firecrawl.dev 与 mcp.firecrawl.dev 直连实测 000（网络受限，非死链）；GitHub 仓与 raw README 经代理 200（2026-10-23）。
  direct_note_en: firecrawl.dev and mcp.firecrawl.dev measured 000 direct (network restricted, not dead); the GitHub repo and raw README returned 200 via proxy (2026-10-23).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-23 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-23); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-23
---

## 一句话定位

**Firecrawl 官方 MCP server**（MIT）：web 上下文全家桶——搜索、抓正文、解析 PDF、
站点级 crawl/map、真实浏览器 interact、页面 monitor。三条硬口径：**keyless 免费档只有 3 工具**；
**发版线在 npm 不在 GitHub releases**；**API key 绝不进 URL 也不进 agent 聊天**（官方 README 明令）。
仓已从 mendableai/ 迁到 firecrawl/ org（301 坐实）。

## 适合与不适合

适合：要「搜索→抓取→结构化→浏览器交互→监控」全链一面包齐；keyless 起步再升 key。
不适合：要逐步驱动的长浏览器会话（README 明写不是它的模型）；只要单页读取的极简场景。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 27 工具的完整参数面与 feedback 工具行为（README 有清单与裁剪口径，未逐条清点）
- keyless 档与 key 档的速率/配额数值（README 只说 rate-limited；按 D9 与快照纪律不记数字）
- self-hosted 部署线的功能边界（README 声明支持，未逐条核验）

## 相关条目

- [Exa MCP](./exa-mcp.md) — 同为检索+抓取官方 server：Exa 默认极简两工具，Firecrawl 是 27 工具全家桶。
- [Fetch MCP Server](./fetch.md) — 轻重对照：fetch 是 reference 级单页读取，Firecrawl 带 crawl/map/interact 的重面。
