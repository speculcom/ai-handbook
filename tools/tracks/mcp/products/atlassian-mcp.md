---
id: atlassian-mcp
form: mcp
name: Atlassian Remote MCP Server（Jira/Confluence）
vendor: Atlassian
homepage: https://www.atlassian.com/platform/remote-mcp-server
license: 闭源官方托管服务（Atlassian ToS 约束）；无开源仓——官方产品页 2026-10-21 取得。
licenseEn: Closed-source official hosted service under Atlassian’s ToS; no open-source repo — official product page fetched 2026-10-21.

axes:
  model_access: >-
    它自己不调模型，是被 MCP 客户端调用的接口实现。它把 Jira、Confluence、Bitbucket 与 Teamwork Graph 的搜索、 读写能力包装成工具。

    供 Claude、Cursor、VS Code、ChatGPT 等 agent 使用（2026-11-21）。
  runtime: >-
    官方云托管远程 MCP server。单端点覆盖 Jira、Confluence 与更多 Atlassian 产品。

    官方支持页说明客户端可一键安装到 Cursor、VS Code、ChatGPT、Claude。服务在 Atlassian 云端。不在本地起进程（2026-11-21）。
  local_files: >-
    不碰本机文件系统。作用域是 Atlassian 云端站点的 issue、page、Bitbucket 仓库与项目元数据。客户端只持有连接配置与工具调用记录。

    站点内容不落本地缓存（2026-11-21）。
  background: >-
    请求-响应语义。MCP 工具调用随客户端请求执行。服务在 Atlassian 侧。它没有独立后台任务队列或延时作业。长操作由客户端自身的超时与重试控制（2026-11-21）。
  tools: >-
    官方产品页列 Jira 搜索/创建 issue、Confluence 搜索/创建页面，以及 Cursor、VS Code、ChatGPT、Claude 等客户端接入。

    官方支持页另列 Rovo search/fetch、Teamwork Graph 上下文与审计日志能力。完整工具清单按官方文档与客户端工具列表核对（2026-11-21）。
  context: >-
    无 server 侧跨会话记忆。每次工具调用按当前 OAuth 2.1 授权与站点状态取数。状态在 Jira/Confluence 本身。

    不在 MCP server 里保留对话上下文（2026-11-21）。
  permissions: >-
    OAuth 2.1 用户鉴权。agent 可见面等于所连账号在站点的权限，含项目级限制。官方文档说明站点或组织管理员可管理、审查或撤销 MCP 应用访问。支持域名与 IP 允许列表。

    每次工具调用写入审计日志。写能力直接生效，按「它能替你改 wiki」设防（2026-11-21）。
  fit: >-
    适合：企业研发流里 agent 取 Jira 需求上下文、写 Confluence 文档、跨 Bitbucket 与 Teamwork Graph 检索。不适合：要写审批流。

    Data Center 自建版支持状态以官方文档为准（2026-11-21）。
pitfalls:
  - 把「连上」当「能看全站点」——可见面跟着账号与项目权限
  - Data Center（自建版）支持状态以官方文档为准——别按 Cloud 口径推自建
  - 旧 developer.atlassian.com 概念页路径 404——现役入口在产品页与 changelog（直抓核验）

tags: [MCP, 项目管理, wiki, Jira, Confluence, 远程托管]
related: [claude-code, cursor]

mcp:
  transport: >-
    **Streamable HTTP 远程托管**（官方端点）。核验：产品页 200（2026-10-21）。具体端点 URL 以官方文档为准（未逐条核验）。
  auth: >-
    OAuth 3LO（用户登录授权）。scope 按产品分（Jira/Confluence 各自 scope 族）。
  scope: >-
    读面：issue/页面搜索读取。写面：建改 issue、建改页面。跟着账号权限走。无工具级审批层。
sources:
  - label: Atlassian · 官方 Remote MCP 产品页（2026-10-21 直抓核验）
    url: https://www.atlassian.com/platform/remote-mcp-server
    kind: docs
  - label: Atlassian · 开发者 changelog（changelog，2026-11-21 抓取 200）
    url: https://developer.atlassian.com/changelog/
    kind: changelog
  - label: Atlassian · 官方 MCP 发布公告（2025-06 首发线，2026-11-21 抓取 200）
    url: https://developer.atlassian.com/blog/2025/06/atlassian-remote-mcp-server/
    kind: docs

  - label: Atlassian Support · Use Rovo MCP Server（云托管、OAuth 2.1 与审计，2026-11-21 抓取 200）
    url: https://support.atlassian.com/atlassian-ai-gateway/docs/use-atlassian-rovo-mcp-server/
    kind: docs
  - label: Atlassian Developer · Getting started with Rovo MCP（客户端与工具面，2026-11-21 抓取 200）
    url: https://developer.atlassian.com/cloud/rovo-mcp/guides/getting-started/
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Atlassian 官方 Remote MCP server**：一个端点接 Jira+Confluence 两面——agent 搜需求、
建 issue、写 wiki。
OAuth 3LO 用户鉴权，可见面跟着账号权限走。

## 适合与不适合

适合：企业研发流的「需求→代码→文档」agent 闭环。
不适合：要写审批流。
自建 Data Center 版（支持状态以官方文档为准）。

## 实测记录

本档核对官方产品页、支持页与开发者指南。
工具调用、写操作与项目级权限需在测试站点逐项验证。
## 未知项清单

- 端点 URL 与 scope 全表：按官方文档与客户端配置核对。
- Data Center 自建版支持状态：官方产品页以 Cloud 为主，自建版按官方文档核对。
- 工具全清单：按官方文档与客户端工具列表核对。
## 相关条目

- [Linear MCP](./linear-mcp.md) — 同为议题管理 server：Linear 轻量单产品，Atlassian 单端点双产品且企业权限面更重。
