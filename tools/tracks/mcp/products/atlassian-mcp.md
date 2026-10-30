---
id: atlassian-mcp
form: mcp
name: Atlassian Remote MCP Server（Jira/Confluence）
vendor: Atlassian
homepage: https://www.atlassian.com/platform/remote-mcp-server
license: 闭源官方托管服务（Atlassian ToS 约束）；无开源仓——官方产品页直抓核验 2026-10-21。
licenseEn: Closed-source official hosted service (under Atlassian's ToS); no open-source repo — official product page direct-fetched 2026-10-21.

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Jira/Confluence 能力
    （搜 issue、读写页面、查项目）包装成工具给 agent 用。
  runtime: >-
    官方托管远程 server（产品页直抓 200）；单端点覆盖 Jira+Confluence 两产品面。
  local_files: >-
    不碰本机文件系统——作用域是 Atlassian 云端站点（issues、pages）。
  background: >-
    服务在 Atlassian 侧；请求-响应语义，无后台任务。
  tools: >-
    Jira：搜/读/建/改 issue、查项目；Confluence：搜/读/建/改页面。
    完整清单以官方文档为准，未逐条清点。
  context: >-
    无 server 侧跨会话记忆——状态在站点本身。
  permissions: >-
    OAuth 3LO 用户鉴权：agent 可见面=所连账号在站点的权限（含项目级限制）；
    写能力（建 issue/改页面）直接生效——按「它能替你改 wiki」设防。
  fit: >-
    适合：企业研发流里 agent 取 Jira 需求上下文、写 Confluence 文档。
    不适合：要写审批流；Data Center 自建版支持状态未核验。

pitfalls:
  - 把「连上」当「能看全站点」——可见面跟着账号与项目权限
  - Data Center（自建版）支持状态未核验——别按 Cloud 口径推自建
  - 旧 developer.atlassian.com 概念页路径 404——现役入口在产品页与 changelog（直抓核验）

tags: [MCP, 项目管理, wiki, Jira, Confluence, 远程托管]
related: [claude-code, cursor]

mcp:
  transport: >-
    **Streamable HTTP 远程托管**（官方端点）；核验：产品页 200（2026-10-21）。
    具体端点 URL 以官方文档为准（未逐条核验）。
  auth: >-
    OAuth 3LO（用户登录授权）；scope 按产品分（Jira/Confluence 各自 scope 族）。
  scope: >-
    读面：issue/页面搜索读取；写面：建改 issue、建改页面。
    跟着账号权限走；无工具级审批层。

sources:
  - label: Atlassian · 官方 Remote MCP 产品页（2026-10-21 直抓核验）
    url: https://www.atlassian.com/platform/remote-mcp-server
    kind: docs
  - label: Atlassian · 开发者 changelog（changelog）
    url: https://developer.atlassian.com/changelog/
    kind: changelog
  - label: Atlassian · 官方 MCP 发布公告（2025-06 首发线）
    url: https://developer.atlassian.com/blog/2025/06/atlassian-remote-mcp-server/
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Atlassian Pty Ltd.（澳大利亚）。
  origin_note_en: Atlassian Pty Ltd. (Australia).
  direct: yes
  direct_note: atlassian.com 直连实测 200（2026-10-21）。
  direct_note_en: atlassian.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Atlassian 官方 Remote MCP server**：一个端点接 Jira+Confluence 两面——agent 搜需求、
建 issue、写 wiki。OAuth 3LO 用户鉴权，可见面跟着账号权限走。

## 适合与不适合

适合：企业研发流的「需求→代码→文档」agent 闭环。
不适合：要写审批流；自建 Data Center 版（支持状态未核验）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 端点 URL 与 scope 全表（未逐条核验）
- Data Center 支持状态（未见官方说明）
- 工具全清单（未逐条清点）

## 相关条目

- [Linear MCP](./linear-mcp.md) — 同为议题管理 server：Linear 轻量单产品，Atlassian 单端点双产品且企业权限面更重。
