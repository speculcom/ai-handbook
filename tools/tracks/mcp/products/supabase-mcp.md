---
id: supabase-mcp
form: mcp
name: Supabase MCP
vendor: Supabase
homepage: https://github.com/supabase/mcp
license: Apache-2.0（GitHub API 核验 2026-10-30；旧仓名 mcp-server-supabase redirect 到 supabase/mcp）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21; the old repo name mcp-server-supabase redirects to supabase/mcp).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Supabase 平台能力
    （项目、数据库查询、迁移、日志、文档检索）包装成工具给编码 agent 用。
  runtime: >-
    双形态：本地 npx 进程（stdio）+ 官方托管远程线；GitHub 2,983★，
    最近推送 2026-10-29（GitHub API 核验）。
  local_files: >-
    本地形态不直接读写你本机项目文件（那是 filesystem server 的活）——
    它操作的是 Supabase 云端项目：表、迁移、日志。
  background: >-
    本地 stdio 随客户端生死；远程托管形态在 Supabase 侧。无后台任务语义。
  tools: >-
    数据库查询/迁移、项目管理、日志与诊断、docs 检索等；
    工具可按需裁剪（官方支持选择性启用工具组）；完整清单以仓 README 为准。
  context: >-
    无 server 侧跨会话记忆——状态在 Supabase 项目本身（schema、数据）。
  permissions: >-
    **凭据=Supabase 访问令牌，权限面大**：能连项目级 API（含 SQL 执行面）。
    官方提供工具裁剪与只读类工具区分，但 SQL 写/DDL 能力真实存在——
    接 agent 前按「给它一个能改库的凭据」这个最坏假设设防。
  fit: >-
    适合：编码 agent 直接管自家 Supabase 项目（查 schema、跑迁移、看日志）。
    不适合：要「只读保险」的硬边界（裁剪能收窄但不是沙箱）；非 Supabase 栈项目。

pitfalls:
  - 把工具裁剪当安全沙箱——SQL 执行面真实存在，凭据权限才是边界
  - 用旧仓名 mcp-server-supabase——现 redirect 到 supabase/mcp（2026-10-21 直抓）
  - 把它当本地数据库工具——它连的是 Supabase 云端项目，本地库不在作用域

tags: [MCP, 数据库, BaaS, Apache2.0, 双形态]
related: [cursor, claude-code]

mcp:
  transport: >-
    本地 **stdio**（npx 起进程）为主；官方另有托管远程端点线（细节以官方文档为准，未逐条核验）。
    核验：仓 README 与 GitHub API（2026-10-21）。
  auth: >-
    Supabase 访问令牌（scope 可选配）；本地形态环境变量/参数传 token。
    令牌轮换与最小权限实践官方文档有指引——未逐条核验细节。
  scope: >-
    项目级：读 schema、执行 SQL（含写/DDL）、管迁移、看日志。
    工具组裁剪可缩小暴露面；无工具级人工审批机制的官方说明。

sources:
  - label: supabase/mcp · 仓库（Apache-2.0；2,983★，最近推送 2026-10-29，GitHub API 核验）
    url: https://github.com/supabase/mcp
    kind: repo
  - label: supabase/mcp · Releases（changelog）
    url: https://github.com/supabase/mcp/releases
    kind: changelog
  - label: Supabase · 官方文档 MCP 线
    url: https://supabase.com/docs/guides/getting-started/mcp
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Supabase Inc.（美国）。
  origin_note_en: Supabase Inc. (US).
  direct: no
  direct_note: github.com 直连实测 000（波动，同日代理可达 200）；supabase.com 直连未单独测。
  direct_note_en: github.com measured 000 direct (fluctuating; 200 via proxy the same day); supabase.com not individually measured.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Supabase 官方 MCP server**（Apache-2.0，仓现名 supabase/mcp）：编码 agent 直接查 schema、
跑迁移、看日志。安全口径一句话：**它的 SQL 执行面是真的——按「能改库的凭据」设防，裁剪不是沙箱**。

## 适合与不适合

适合：Supabase 栈项目的 agent 开发流（schema/迁移/日志一条龙）。
不适合：要硬只读边界；非 Supabase 项目（它不是通用数据库 server）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 托管远程端点的当前状态与差异（未逐条核验）
- 工具组裁剪的完整矩阵（未逐条清点）
- 令牌 scope 粒度细节（未逐条核验）

## 相关条目

- [GitHub MCP Server](./github-mcp.md) — 同为「双形态+工具裁剪」设计对照：GitHub 有强制 read-only 开关，Supabase 无同级开关。
