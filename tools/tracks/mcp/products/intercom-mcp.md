---
id: intercom-mcp
form: mcp
name: Intercom MCP Server
vendor: Intercom
homepage: https://developers.intercom.com/docs/guides/mcp
license: 闭源官方托管服务（Intercom ToS 约束）；GitHub 上 intercom/intercom-mcp-server 只是文档仓（无 license 声明，推送停 2025-09-22，GitHub API 核验 2026-10-31）——server 本体不开源。
licenseEn: Closed-source official hosted service (Intercom ToS); intercom/intercom-mcp-server on GitHub is a documentation-only repo (no license declared, last push 2025-09-22, GitHub API verified 2026-10-31) — the server itself is not open source.

axes:
  model_access: >-
    **它自己不调模型**——官方托管远程 server，被 MCP 客户端调用。例外口径：**Fin Operator 工具族**
    会驱动 Intercom 自家 AI（Operator）干活——send_operator_message 消耗 Operator credits
    （与在 Intercom 里开一轮对话同口径计费），其余四个 Operator 工具免费。
  runtime: >-
    **官方托管 remote server**（无自托管线）：US 端点 https://mcp.intercom.com/mcp、
    EU 端点 https://mcp.eu.intercom.com/mcp（EU 请求在 EU 内处理，符合其 Regional Data Hosting 承诺）；
    **AU 托管工作区暂不支持**（官方明写）。端点直连实测 401（存在、需鉴权，非死链）。
  local_files: >-
    不读写本机文件——读写对象全在 Intercom 工作区侧（conversations/contacts/companies/
    Help Center articles）。
  background: >-
    无常驻本机后台；连接活在客户端与 Intercom 托管端点之间（官方：连接保持活跃以接收更新）。
  tools: >-
    官方文档现口径 **14 个工具**：通用族 **search**（query DSL：object_type:conversations/contacts、
    字段操作符 eq/neq/gt/contains、分页 starting_after）+ **fetch**（按前缀 ID 取全量详情）；
    直连 API 族 search_conversations / get_conversation / search_contacts / companies /
    Help Center articles（**list/search/get 读 + create/update 写**）；
    **Fin Operator 五工具**（send_operator_message / get_operator_response / get_proposal_details /
    apply_proposals / reject_proposals——apply 会改动工作区线上配置）。
  context: >-
    无 server 侧跨会话记忆；上下文=你的 Intercom 工作区数据本身（官方叙事：AI 助手保持
    对工作区的环境感知）。Operator 对话有服务端会话态（get_operator_response 稍后取答）。
  permissions: >-
    **两种鉴权**：OAuth（推荐；Dynamic Client Registration，但 redirect URI 过 allowlist——
    localhost/127.0.0.1 任意端口已放行，其他回调要先申请加白）或 Bearer token（Intercom API token，
    需 scopes：读 users/companies、读 conversations、读写 articles）。
    **Bearer 连接拿不到 Fin Operator 工具**（官方明写）；Operator 权限上线前建立的旧连接需重连。
    工具按「你本人在工作区的权限」授权——MCP 不扩权。
  fit: >-
    适合：客服/支持团队把 Intercom 数据接进 AI 工具（Claude/Cursor/VS Code 等官方在册客户端）——
    查会话、查联系人、读写帮助文档、驱动 Operator；EU 工作区有数据驻留线。
    不适合：AU 托管工作区（不支持）；要自托管/开源实现（无）；要 Bearer 简单接入还用 Operator（拿不到）。

pitfalls:
  - 把 inventory 旧 URL（intercom.com/mcp）当文档线——2026-10-31 实测 404；现役是 developers.intercom.com/docs/guides/mcp + 端点本身
  - 把 intercom/intercom-mcp-server 仓当源码——它是文档仓（无 license、推送停 2025-09）；server 闭源托管
  - 用 Bearer token 却期待 Operator 工具——官方明写 Bearer 连接不含 Fin Operator 工具，要 OAuth
  - 混 US/EU 端点——app.intercom.com=US 用 mcp.intercom.com，app.eu.intercom.com=EU 用 mcp.eu.intercom.com；AU 不支持
  - 旧连接（Operator 权限上线前建的）调 Operator 工具报错——重连即可（官方排障口径）
  - 自建 MCP 客户端 OAuth 回调不在 allowlist——注册与授权会失败，localhost 之外要先申请
  - apply_proposals 会真改工作区线上配置——Operator 提案不是预览玩具

tags: [MCP, 客服, CRM, 远程托管, OAuth, 区域端点, Operator]
related: [cursor, claude-code]

mcp:
  transport: >-
    **streamable-http**（推荐：US https://mcp.intercom.com/mcp、EU https://mcp.eu.intercom.com/mcp）
    + **legacy SSE**（/sse，官方标 deprecated、仅为向后兼容保留）。核验：mcp.intercom.com 首页与
    developers.intercom.com/docs/guides/mcp（2026-10-31 直连 200；端点直连 401=存在需鉴权）。
  auth: >-
    OAuth（推荐；DCR+redirect URI allowlist）或 Bearer token（API token+scopes：读 users/companies、
    读 conversations、读写 articles）。工具授权=你本人工作区权限镜像，MCP 不扩权。
  scope: >-
    读面（conversations/contacts/companies/articles）+ **写面**（Help Center articles 创建/更新、
    Operator apply_proposals 改线上配置）；无本机面。写面按工作区权限与提案审批把关。

sources:
  - label: Intercom Developers · MCP 指南（14 工具清单/OAuth 与 Bearer/scopes/排障；直连 200）
    url: https://developers.intercom.com/docs/guides/mcp
    kind: docs
  - label: mcp.intercom.com · 官方 MCP 首页（区域端点 US/EU、工具与分页口径；直连可达）
    url: https://mcp.intercom.com/
    kind: docs
  - label: Intercom · 官方集成页「Intercom MCP Server integration」（OAuth 口径/US 托管可用面/客户端名单）
    url: https://www.intercom.com/integrations/connectors/intercom-mcp-server
    kind: docs
  - label: intercom/intercom-mcp-server · 文档仓（无 license；推送停 2025-09-22，GitHub API 核验；commits 作变更记录线）
    url: https://github.com/intercom/intercom-mcp-server
    kind: repo
  - label: GitHub commits · intercom-mcp-server（文档变更记录线）
    url: https://github.com/intercom/intercom-mcp-server/commits/main
    kind: changelog

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Intercom Inc.（美国/爱尔兰双总部，客户消息平台）。
  origin_note_en: Intercom Inc. (US/Ireland dual-headquartered customer messaging platform).
  direct: yes
  direct_note: developers.intercom.com 与 intercom.com 直连 200；mcp.intercom.com/mcp 与 mcp.eu.intercom.com/mcp 直连 401（端点存在需鉴权）；mcp.intercom.com 首页直连 200（2026-10-31）。
  direct_note_en: developers.intercom.com and intercom.com returned 200 direct; mcp.intercom.com/mcp and mcp.eu.intercom.com/mcp returned 401 direct (endpoints exist, auth required); the mcp.intercom.com landing page returned 200 direct (2026-10-31).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**Intercom 官方托管 MCP server**（闭源 remote，streamable-http）：客服数据接进 AI 工具——
14 工具：query-DSL search/fetch + conversations/contacts/companies 读 + Help Center articles 读写 +
**Fin Operator 五工具**（apply_proposals 会真改线上配置；**Bearer 连接拿不到 Operator 工具，要 OAuth**）。
区域两口径：US/EU 端点分开（EU 数据在 EU 内处理）、**AU 工作区不支持**；
旧 SSE 端点已 deprecated。GitHub 那个仓只是文档仓，别当源码。

## 适合与不适合

适合：支持团队把 Intercom 接进 Claude/Cursor/VS Code 等官方在册客户端；EU 数据驻留需求。
不适合：AU 托管工作区；要自托管/开源；要 Bearer 简单接入还用 Operator。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 14 工具的完整参数面与分页游标语义细节（文档详尽但未逐条清点）
- Operator credits 的计费数值与配额（按 D9 与快照纪律不记数字）
- AU 工作区支持时间表（官方只说 not yet supported）

## 相关条目

- [Zapier MCP](./zapier-mcp.md) — 客服垂直 vs 千应用枢纽：Intercom 官方单产品深集成，Zapier 是跨应用入口。
- [Atlassian MCP](./atlassian-mcp.md) — 同为 SaaS 官方 remote server：Atlassian 管工单/知识，Intercom 管客户会话与帮助中心读写。
