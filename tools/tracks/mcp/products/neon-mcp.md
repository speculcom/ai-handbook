---
id: neon-mcp
form: mcp
name: Neon MCP Server
vendor: Neon
homepage: https://github.com/neondatabase/mcp-server-neon
license: MIT（GitHub API 核验 2026-10-30）。
licenseEn: MIT (GitHub API verified 2026-10-21).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Neon（serverless Postgres）
    的管理 API 与数据库操作包装成工具给 agent 用。
  runtime: >-
    本地进程（npx stdio）+ 官方托管远程线；GitHub 659★，最近推送 2026-10-29（API 核验）。
    旧 docs 路径（neon.com/docs/ai-and-mcp/mcp-server）直抓 404——现役以仓为准。
  local_files: >-
    不读写本机项目文件——作用域是 Neon 云端项目/分支与数据库。
  background: >-
    stdio 随客户端生死；Neon 的分支（branch）能力是它特色——agent 可建库分支做隔离试验。
  tools: >-
    项目管理、分支创建/删除、数据库查询执行、schema 查看等；写能力齐全
    （建分支、执行 SQL）。完整清单以仓 README 为准。
  context: >-
    无跨会话记忆——状态在 Neon 项目本身。
  permissions: >-
    **两条凭据**：Neon API key（管理面：项目/分支）+ Postgres 连接串（数据面：SQL）。
    Neon 的分支模型给了「agent 在副本上试」的隔离玩法——但默认连主分支时写面照旧，
    按「它能执行 SQL」设防。
  fit: >-
    适合：Neon 栈的 agent 开发流（建分支→试改→合并）、serverless Postgres 管理接 agent。
    不适合：非 Neon 的 Postgres（它管自家平台）；要硬只读边界。

pitfalls:
  - 找 neon.com/docs/ai-and-mcp/mcp-server——该路径 404（2026-10-21 直抓），现役以 neondatabase 仓为准
  - 把「分支隔离」当默认安全——默认操作面跟着连接配置走，主分支照写不误
  - 管理 key 与数据连接串两权限面混配——管理面能删项目，数据面能改数据

tags: [MCP, 数据库, Postgres, serverless, MIT, 分支模型]
related: [cursor, claude-code]

mcp:
  transport: >-
    **stdio**（npx）为主 + 官方托管远程线（细节以仓 README 为准，未逐条核验）。
    核验：仓与 GitHub API（2026-10-21）。
  auth: >-
    Neon API key（管理面）+ Postgres 连接串（数据面）两路线。
  scope: >-
    管理面：项目/分支增删查；数据面：SQL 执行（含写/DDL）。
    无工具级审批机制的官方说明；分支模型是结构性隔离手段而非审批层。

sources:
  - label: neondatabase/mcp-server-neon · 仓库（MIT；659★，最近推送 2026-10-29，GitHub API 核验）
    url: https://github.com/neondatabase/mcp-server-neon
    kind: repo
  - label: neondatabase/mcp-server-neon · Releases（changelog）
    url: https://github.com/neondatabase/mcp-server-neon/releases
    kind: changelog
  - label: Neon · 官方文档首页（产品背景）
    url: https://neon.com/docs
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Neon, Inc.（美国，现归 Databricks——vendor 口径按官方现行主体写 Neon）。
  origin_note_en: Neon, Inc. (US; now under Databricks — the vendor line follows Neon as the current official product owner).
  direct: no
  direct_note: github.com 直连实测 000（波动，同日代理可达 200）；neon.com 直连未单独测。
  direct_note_en: github.com measured 000 direct (fluctuating; 200 via proxy the same day); neon.com not individually measured.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Neon 官方 MCP server**（MIT）：agent 管 Neon 项目、建分支、跑 SQL。
特色是**分支模型**——agent 可以在库副本上试改动；但默认连接面照旧，
按「它能执行 SQL、管理 key 能删项目」设防。诚实标注：旧 docs 路径 404，现役以仓为准。

## 适合与不适合

适合：Neon/serverless Postgres 栈的 agent 开发流、分支隔离试验。
不适合：非 Neon 的 Postgres；要硬只读边界。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 远程托管端点状态（未逐条核验）
- 工具全清单（未逐条清点）
- Databricks 收购后产品口径变化细节（未逐条核验——vendor 按现行官方主体写）

## 相关条目

- [Supabase MCP](./supabase-mcp.md) — 同为 BaaS 数据库 server：Supabase 项目面更宽，Neon 的分支隔离是结构差异点。
