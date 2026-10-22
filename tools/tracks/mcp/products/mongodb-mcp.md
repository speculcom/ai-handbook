---
id: mongodb-mcp
form: mcp
name: MongoDB MCP Server
vendor: MongoDB
homepage: https://github.com/mongodb-js/mongodb-mcp-server
license: Apache-2.0（GitHub API 核验 2026-10-21）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 MongoDB 数据库操作
    （连接、集合查询、聚合）与 Atlas 管理包装成工具给 agent 用。
  runtime: >-
    本地进程（npx stdio）；GitHub 1,146★，最近推送 2026-10-21（API 核验）。
    官方 docs/mcp 页直抓 404——现役官方线以仓为准（直抓核验 2026-10-21）。
  local_files: >-
    不读写本机项目文件——作用域是数据库实例（本地 mongod 或 Atlas 集群都算它的目标）。
  background: >-
    stdio 随客户端生死；无后台任务语义。
  tools: >-
    连接/列库列集合、find/aggregate/insert/update/delete、Atlas 集群管理等；
    写能力齐全。完整清单以仓 README 为准。
  context: >-
    无跨会话记忆——数据状态在数据库本身。
  permissions: >-
    **两条凭据路线**：连接串直连（能连什么库=能做什么，含写/删）或 Atlas API key（管 Atlas 面）。
    官方 README 明确提示高危操作确认机制存在（删除类工具带确认参数）——
    但边界仍是凭据：接 agent 前按「它能删集合」设防。
  fit: >-
    适合：MongoDB 项目的 agent 开发流（查 schema、跑聚合、试写操作）。
    不适合：要硬只读沙箱；非 MongoDB 栈。

pitfalls:
  - 找 mongodb.com/docs/mcp——该路径 404（2026-10-21 直抓），现役以 mongodb-js 仓为准
  - 把「删除类工具带确认」当安全边界——确认参数可被 agent 自己填，凭据才是边界
  - 连接串直连本地库与 Atlas 混配——两条凭据路线权限面不同

tags: [MCP, 数据库, MongoDB, Atlas, Apache2.0, 本地stdio]
related: [cursor, claude-code]

mcp:
  transport: >-
    **stdio**（npx 本地起进程）。核验：仓 README（2026-10-21 直抓）。
  auth: >-
    连接串（mongodb:// 直连实例）或 Atlas API 凭据两路线；
    只读连接选项支持面未逐条核验。
  scope: >-
    读面：列库/集合、find/aggregate；写面：insert/update/delete、Atlas 集群管理。
    删除类工具带确认参数（官方 README 口径）；无独立审批层。

sources:
  - label: mongodb-js/mongodb-mcp-server · 仓库（Apache-2.0；1,146★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/mongodb-js/mongodb-mcp-server
    kind: repo
  - label: mongodb-js/mongodb-mcp-server · Releases（changelog）
    url: https://github.com/mongodb-js/mongodb-mcp-server/releases
    kind: changelog
  - label: MongoDB · 官方文档首页（产品背景）
    url: https://www.mongodb.com/docs
    kind: docs

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: MongoDB, Inc.（美国）。
  origin_note_en: MongoDB, Inc. (US).
  direct: no
  direct_note: github.com 直连实测 000（波动，同日代理可达 200）；mongodb.com 直连 200（docs 首页）。
  direct_note_en: github.com measured 000 direct (fluctuating; 200 via proxy the same day); mongodb.com measured 200 direct (docs home).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**MongoDB 官方 MCP server**（mongodb-js 仓，Apache-2.0）：agent 连库查集合、跑聚合、
写数据、管 Atlas。诚实标注：docs/mcp 路径 404——现役官方线在 GitHub 仓。
安全口径：**删除类工具带确认参数，但确认不是沙箱——凭据才是边界**。

## 适合与不适合

适合：MongoDB 栈的 agent 开发流、Atlas 管理接 agent。
不适合：要硬只读边界；非 MongoDB 栈。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 只读连接选项支持面（未逐条核验）
- Atlas 工具完整清单（未逐条清点）
- docs/mcp 官方页是否会恢复（未见说明——只记 404 事实）

## 相关条目

- [Supabase MCP](./supabase-mcp.md) — 同为数据库类 server：Supabase 走自家 BaaS 项目面，MongoDB 走连接串直连实例面。
