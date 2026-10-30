---
id: slack-mcp
form: mcp
name: Slack MCP Server
vendor: Slack（Salesforce）
homepage: https://docs.slack.dev/ai/slack-mcp-server
license: 闭源官方托管服务（Slack ToS 约束）；无开源仓——官方文档线直抓核验 2026-10-21。
licenseEn: Closed-source official hosted service (under Slack's ToS); no open-source repo — official docs line direct-fetched 2026-10-21.

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Slack 工作区能力
    （搜索、读消息/线程、发消息、canvases、Lists）包装成工具给 agent 用。
  runtime: >-
    官方托管远程 server（mcp.slack.com/mcp——直抓 401=存在需鉴权）；
    Streamable HTTP + JSON-RPC 2.0（官方文档口径）。旧 slackapi/slack-mcp-server 仓已 404（2026-10-21 直抓）。
  local_files: >-
    不碰本机文件系统——作用域是 Slack 云端工作区（消息、文件、canvases、Lists）。
  background: >-
    服务在 Slack 侧；会话请求-响应，无后台监听语义——「agent 不监视 Slack，等你问」。
  tools: >-
    搜索（消息/文件/用户/频道）、读频道与线程、发消息、建会话、reaction、
    canvas 读写、用户档案、Lists 增删改查、文件上传（官方 changelog 2026-05 有新增工具记录）；
    完整清单以 docs.slack.dev 为准。
  context: >-
    无 server 侧跨会话记忆——状态在 Slack 工作区本身；搜索工具是它的「取上下文」主手段。
  permissions: >-
    **权限面是这条目的核心**：OAuth user-token scopes 逐工具映射（search:read、chat:write、
    canvases:write 等）+ **工作区管理员审批**（admin 决定哪些 MCP 客户端可连）——
    未发布 Marketplace/内部 app 连不上。写动作（发消息/建会话）跟着授权 scope 走。
  fit: >-
    适合：编码/研究 agent 取「团队在 Slack 里的决策与上下文」、总结频道、代拟消息。
    不适合：要事件触发自动化（MCP 不是触发器——要自动化走 Workflow/automation 线）；
    要 bot-token 无 OAuth 路线（官方走 user-token OAuth）。

pitfalls:
  - 把 MCP 当「agent 常驻 Slack」——它只在会话里响应，不监视不触发
  - 用旧仓 slackapi/slack-mcp-server 找官方实现——已 404，现役是官方托管 mcp.slack.com
  - 把 reference 版（已归档、转 Zencoder 维护）当官方——本条目是 Slack 自营托管线
  - 忽略 admin 审批面——企业工作区连不上多半是 admin 策略，不是客户端 bug

tags: [MCP, 协作, 消息, 远程托管, OAuth, admin审批]
related: [cursor, windsurf]

mcp:
  transport: >-
    **Streamable HTTP**（JSON-RPC 2.0），端点 mcp.slack.com/mcp。
    官方明写 **SSE 与 Dynamic Client Registration 暂不支持**（第三方核验页转述官方 docs）——
    客户端要走现行 remote MCP/OAuth 路径。核验：docs.slack.dev 200、端点 401（2026-10-21 直抓）。
  auth: >-
    OAuth 2.0 user-token 流（slack.com OAuth 端点授权）；工具逐一对应 scope。
    **管理员审批是前置门**：工作区 admin 批准 MCP 客户端集成才能连。
  scope: >-
    读面：搜索/历史/用户档案/canvas 读；写面：发消息、建会话、reaction、canvas 写、
    Lists 写、文件上传。全部跟着 OAuth scope 与 admin 策略走；无工具级独立审批机制的官方说明。

sources:
  - label: Slack · 官方 MCP 文档（端点、传输、鉴权口径，2026-10-21 直抓核验）
    url: https://docs.slack.dev/ai/slack-mcp-server
    kind: docs
  - label: Slack · 开发者 changelog（MCP 工具新增记录）
    url: https://docs.slack.dev/changelog
    kind: changelog
  - label: Slack · 官方帮助中心 MCP 指南
    url: https://slack.com/help/articles/48855576908307-Guide-to-the-Slack-MCP-server
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Slack Technologies（Salesforce 旗下，美国）。
  origin_note_en: Slack Technologies (a Salesforce company, US).
  direct: yes
  direct_note: docs.slack.dev 直连实测 200（2026-10-21）；mcp.slack.com 端点直连未单独测——大陆可达性未逐条核验。
  direct_note_en: docs.slack.dev measured 200 direct (2026-10-21); the mcp.slack.com endpoint was not individually measured for mainland reachability.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Slack 自营的官方 MCP server**（mcp.slack.com/mcp）：agent 能搜工作区、读线程、代拟消息、
管 canvas 与 Lists。两条硬口径：**admin 审批是前置门**；**它只在会话里响应，不监视不触发**。
诚实标注：旧 slackapi 仓已 404；reference 版已归档转第三方维护——本条目是 Slack 自营线。

## 适合与不适合

适合：让 agent 拿「团队真实讨论」作上下文、频道总结、代拟消息草稿。
不适合：事件触发自动化（那是 Workflow 线的活）；要 bot-token 直连的旧路线。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 工具全清单与逐工具 scope 映射表（未逐条清点——docs.slack.dev 有页未逐条核）
- admin 审批的粒度（按客户端/按 scope？未逐条核验）
- 速率限制细则（官方按 Web API 限流口径，数字未逐条核验）

## 相关条目

- [Notion MCP](./notion-mcp.md) — 同为协作 SaaS 官方 remote：Notion 写面直接，Slack 多一道 admin 审批门。
- [Zapier MCP](./zapier-mcp.md) — 跨大类对照：Slack 官方 server 只管 Slack；要「Slack 触发跨应用动作」走 Zapier 线。
