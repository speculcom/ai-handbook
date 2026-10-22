---
id: cloudflare-mcp
form: mcp
name: Cloudflare MCP Server
vendor: Cloudflare
homepage: https://github.com/cloudflare/mcp-server-cloudflare
license: Apache-2.0（GitHub API 核验 2026-10-21）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Cloudflare 平台
    （Workers、Pages、D1、R2、DNS、docs 检索等）包装成工具给 agent 用。
  runtime: >-
    官方托管远程 server 为主（docs 有远程端点线）+ 本地可跑；GitHub 4,399★，
    最近推送 2026-10-21（API 核验）。
  local_files: >-
    不读写本机项目文件——作用域是 Cloudflare 账户资源（部署 Workers、写 D1/R2 等）。
  background: >-
    远程形态在 Cloudflare 侧；无后台任务语义（部署动作即时完成）。
  tools: >-
    按产品分组（Workers/Pages/D1/R2/DNS/Docs…）可裁剪启用；写能力齐全
    （部署 Worker、建 KV/D1 库、改 DNS 记录）。完整分组以仓 README 为准。
  context: >-
    无跨会话记忆——状态在 Cloudflare 账户资源本身。
  permissions: >-
    **API token 权限=agent 权限**：Cloudflare token 可细粒度限定资源与操作面——
    官方推荐用受限 token 接 MCP。这是同类里凭据粒度做得最细的一条线，
    但「能部署代码到 Workers」意味着能跑任意代码——按此最坏面设防。
  fit: >-
    适合：Cloudflare 栈的 agent 部署流（写 Worker→部署→查日志）、docs 检索。
    不适合：要「只配置不部署」的硬边界（token 粒度能收窄但要仔细配）。

pitfalls:
  - 用全权限全局 API key 接 agent——官方推荐受限 token，粒度差别巨大
  - 把「部署 Worker」当配置操作——那是往边缘跑任意代码的写面
  - 工具分组裁剪当审批层——裁剪是收窄暴露面，不是逐操作确认

tags: [MCP, 云平台, Workers, Apache2.0, 远程托管, 受限token]
related: [cursor, claude-code]

mcp:
  transport: >-
    远程 **Streamable HTTP**（官方托管端点）+ 本地 stdio 两线；
    端点矩阵按产品分组（每产品一个远程 server URL）——以仓 README 为准。
    核验：仓与 developers.cloudflare.com/changelog（2026-10-21）。
  auth: >-
    Cloudflare API token（建议受限 token：限定账户/资源/操作）；
    OAuth 线支持状态未逐条核验。
  scope: >-
    读面：docs 检索、资源查询；写面：部署 Workers、建/改 D1/R2/KV、DNS 记录变更。
    token 粒度是主收紧手段；无工具级审批机制的官方说明。

sources:
  - label: cloudflare/mcp-server-cloudflare · 仓库（Apache-2.0；4,399★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/cloudflare/mcp-server-cloudflare
    kind: repo
  - label: cloudflare/mcp-server-cloudflare · Releases（changelog）
    url: https://github.com/cloudflare/mcp-server-cloudflare/releases
    kind: changelog
  - label: Cloudflare · 开发者 changelog（changelog）
    url: https://developers.cloudflare.com/changelog/
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Cloudflare, Inc.（美国）。
  origin_note_en: Cloudflare, Inc. (US).
  direct: no
  direct_note: github.com 直连实测 000（波动，同日代理可达 200）；developers.cloudflare.com 直连未单独测。
  direct_note_en: github.com measured 000 direct (fluctuating; 200 via proxy the same day); developers.cloudflare.com not individually measured.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Cloudflare 官方 MCP server**（Apache-2.0）：agent 写 Worker、部署、管 D1/R2/DNS、查官方 docs。
同类里**受限 token 粒度做得最细**——但记住「能部署=能跑任意代码」，token 要按最小面配。

## 适合与不适合

适合：Cloudflare 栈的部署-调试闭环接 agent。
不适合：要「只读配置」硬边界（能收窄但要仔细配 token）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 产品分组全表与远程端点矩阵（未逐条清点）
- OAuth 支持状态（未逐条核验）
- 各端点速率限制（未逐条核验）

## 相关条目

- [GitHub MCP Server](./github-mcp.md) — 同为「多工具集可裁剪」设计范本：GitHub 用 toolsets，Cloudflare 按产品分 server。
