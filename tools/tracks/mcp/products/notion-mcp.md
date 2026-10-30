---
id: notion-mcp
form: mcp
name: Notion MCP
vendor: Notion
homepage: https://developers.notion.com/docs/mcp
license: 闭源官方托管服务（Notion ToS 约束）；无开源仓——官方文档页直抓核验 2026-10-21。
licenseEn: Closed-source official hosted service (under Notion's ToS); no open-source repo — official docs page direct-fetched 2026-10-21.

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Notion 工作区能力
    （搜索、页面读写、数据库查询）包装成工具给 agent 用。
  runtime: >-
    官方托管远程 server（端点 mcp.notion.com/mcp——直抓 401=存在需鉴权，非死链）；
    无本地形态的官方说明。notion.mcp.run 直抓 000（网络受限标注）。
  local_files: >-
    不碰本机文件系统——作用域是 Notion 云端工作区（页面、数据库、评论）。
  background: >-
    服务在 Notion 侧常驻；MCP 会话是请求-响应，无后台任务语义。
  tools: >-
    搜索、取页面、建/改页面与数据库条目等；完整工具清单以官方文档为准，未逐条清点。
    写能力存在（建页/改块），边界按工作区共享与权限走。
  context: >-
    无 server 侧跨会话记忆——状态在 Notion 工作区本身；Notion AI 的记忆线是另一产品，不算它。
  permissions: >-
    OAuth 用户鉴权 + 工作区权限模型：agent 能看到/改什么，跟着连接的那个 Notion 账号的
    页面共享权限走——这是选型要点：连谁的账号=谁的可见面。
  fit: >-
    适合：agent 读写团队知识库、把会议记录/任务写进 Notion 数据库、从 wiki 检索上下文。
    不适合：要离线/自托管（无本地形态）；要细于账号权限的工具级隔离。

pitfalls:
  - 把「连上 Notion MCP」当「agent 能看全工作区」——可见面=所连账号的页面权限
  - 把 notion.mcp.run 000 当服务死了——现役端点是 mcp.notion.com/mcp（401=需鉴权）
  - 写操作无独立审批——agent 建页改块直接生效，接 agent 前先想清楚写面

tags: [MCP, 知识库, 协作, 远程托管, OAuth]
related: [cursor, windsurf]

mcp:
  transport: >-
    **Streamable HTTP 远程托管**（mcp.notion.com/mcp）；无本地 stdio 形态的官方说明。
    核验：官方文档页 200、端点 401（2026-10-21 直抓）。
  auth: >-
    OAuth 浏览器授权流（首次连接登录 Notion 账号）；无 token 明文配置路线的官方说明。
    工作区管理员可管控连接（admin 审批面细节未逐条核验）。
  scope: >-
    作用域=所连账号的工作区可见面；读写都有（搜索/取页/建页/改块）。
    工具级审批机制未见官方说明——写面收紧靠账号权限与客户端侧确认。

sources:
  - label: Notion · 官方 MCP 文档（端点与鉴权口径，2026-10-21 直抓核验）
    url: https://developers.notion.com/docs/mcp
    kind: docs
  - label: Notion · 官方更新日志（changelog）
    url: https://www.notion.com/releases
    kind: changelog
  - label: Notion · 开发者文档首页
    url: https://developers.notion.com
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Notion Labs, Inc.（美国）。
  origin_note_en: Notion Labs, Inc. (US).
  direct: yes
  direct_note: developers.notion.com 直连实测 200（2026-10-21）；notion.mcp.run 直连 000（网络受限，非死亡判定）。
  direct_note_en: developers.notion.com measured 200 direct (2026-10-21); notion.mcp.run measured 000 direct (network-limited, not a death verdict).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Notion 官方自己的 MCP server**：纯远程托管（mcp.notion.com/mcp），agent 能搜工作区、
读写页面与数据库。要点一句话：**agent 的可见面 = 你连的那个账号的页面权限**。

## 适合与不适合

适合：知识库检索进 agent 上下文、会议记录/任务自动写进 Notion。
不适合：要自托管或离线（无本地形态）；要工具级细粒度审批（未见官方机制）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 完整工具清单（未逐条清点）
- 工作区管理员对 MCP 连接的管控粒度（未逐条核验）
- 速率限制细则（官方文档未给数字）

## 相关条目

- [Slack MCP](./slack-mcp.md) — 同为协作 SaaS 官方 remote server：Slack 版 admin 审批面更重，Notion 版写面更直接。
