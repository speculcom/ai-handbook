---
id: linear-mcp
form: mcp
name: Linear MCP
vendor: Linear
homepage: https://linear.app/docs/mcp
license: 闭源官方托管服务（Linear ToS 约束）；无开源仓——官方文档与端点直抓核验 2026-10-21。
licenseEn: Closed-source official hosted service (under Linear's ToS); no open-source repo — official docs and endpoint direct-fetched 2026-10-21.

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Linear 议题管理
    （搜 issue、建/改 issue、项目与团队查询）包装成工具给 agent 用。
  runtime: >-
    官方托管远程 server（mcp.linear.app/mcp——直抓 401=存在需鉴权；旧 /sse 端点 404——
    传输线已换代，直抓核验 2026-10-21）。
  local_files: >-
    不碰本机文件系统——作用域是 Linear 云端工作区（issues/projects/teams）。
  background: >-
    服务在 Linear 侧；请求-响应语义，无后台任务。
  tools: >-
    搜/读/建/改 issue、查项目与团队、评论等；写能力齐全（建 issue、改状态）。
    完整清单以官方文档为准，未逐条清点。
  context: >-
    无 server 侧跨会话记忆——状态在 Linear 工作区本身。
  permissions: >-
    OAuth 用户鉴权：agent 可见面=所连 Linear 账号权限；写操作直接生效，
    无工具级审批机制的官方说明——接 agent 前按「它能替你建改 issue」设防。
  fit: >-
    适合：编码 agent 干完活顺手建/更新 issue、从 Linear 拉「这个需求当时怎么说的」。
    不适合：要审批流的严格写管控；非 Linear 栈。

pitfalls:
  - 用旧 /sse 端点配置——已 404（2026-10-21 直抓），现役 /mcp（Streamable HTTP）
  - 把「连上」当「能看全部」——可见面跟着所连账号权限
  - 写操作无审批——agent 建 issue/改状态直接生效

tags: [MCP, 议题管理, 项目管理, 远程托管, OAuth]
related: [claude-code, cursor]

mcp:
  transport: >-
    **Streamable HTTP**（mcp.linear.app/mcp）；旧 SSE 端点已下线（直抓 404 核验）。
    核验：linear.app/docs/mcp 200、端点 401（2026-10-21）。
  auth: >-
    OAuth 浏览器授权流（首次连接登录 Linear 账号）；无 PAT 明文配置路线的官方说明。
    授权粒度与令牌吊销细节未逐条核验。
  scope: >-
    读面：issue 搜索/读取、项目与团队查询；写面：建/改 issue、评论。
    跟着账号权限走；无独立审批层。

sources:
  - label: Linear · 官方 MCP 文档（端点与鉴权口径，2026-10-21 直抓核验）
    url: https://linear.app/docs/mcp
    kind: docs
  - label: Linear · 官方 changelog（changelog）
    url: https://linear.app/changelog
    kind: changelog
  - label: Linear · MCP 入口页（直抓 200）
    url: https://linear.app/mcp
    kind: docs

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Linear Opus, Inc.（美国）。
  origin_note_en: Linear Opus, Inc. (US).
  direct: yes
  direct_note: linear.app 直连实测 200（2026-10-21）。
  direct_note_en: linear.app measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Linear 官方 MCP server**（mcp.linear.app/mcp）：agent 搜 issue、建 issue、改状态。
一条直抓事实：**旧 SSE 端点已下线**——配置里还写 /sse 的要先换 /mcp。

## 适合与不适合

适合：编码 agent 与议题流打通（完成→更新 issue）、需求上下文检索。
不适合：要写审批流；非 Linear 栈。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 工具全清单（未逐条清点）
- 速率限制细则（官方未给数字）
- 工作区级管控面（未逐条核验）

## 相关条目

- [GitHub MCP Server](./github-mcp.md) — 同为「编码 agent 的任务面」：GitHub 管 PR/issue 在代码侧，Linear 管产品议题侧。
