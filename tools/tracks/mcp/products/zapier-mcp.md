---
id: zapier-mcp
form: mcp
name: Zapier MCP
vendor: Zapier
homepage: https://actions.zapier.com/docs/platform/mcp/
license: 闭源官方托管服务（Zapier ToS 约束）；无开源仓——官方文档直抓核验 2026-10-21。
licenseEn: Closed-source official hosted service (under Zapier's ToS); no open-source repo — official docs direct-fetched 2026-10-21.

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它是「千余应用的入口」：
    用户在 Zapier 侧挑选哪些 action 暴露给 agent，server 把这些 action 包装成 MCP 工具。
  runtime: >-
    官方托管远程 server（actions.zapier.com 文档线直抓 200）；每用户按配置生成专属端点。
  local_files: >-
    不碰本机文件系统——它代执行的是 Zapier 平台侧的 action（读写各 SaaS 应用）。
  background: >-
    服务在 Zapier 侧；请求-响应语义。注意：Zapier 平台的 Zap（自动化线）是常驻自动化——
    那是 automation 大类的另一产品面，不算 MCP server 本体。
  tools: >-
    **动态工具面**：暴露哪些工具=用户在 Zapier MCP 配置里勾选了哪些应用的哪些 action
    （Gmail/Sheets/Notion/Slack…千余应用）。工具清单因人而异，无法逐条清点——这是它与
    其他厂商 server 最大的结构差异。
  context: >-
    无 server 侧跨会话记忆——状态在各目标应用里。
  permissions: >-
    **两层权限叠加**：Zapier 侧「勾选哪些 action」是第一层白名单；各目标应用的
    OAuth 授权是第二层。写能力跟着勾选走——没勾的 action 不存在，这是它相对
    「单应用全权限 server」的结构性收紧优势。
  fit: >-
    适合：一个 server 接多应用（agent 要同时碰 Gmail+Sheets+CRM 时）、按 action 白名单收紧。
    不适合：要单应用深度工具面（官方单厂商 server 更深）；要免费（Zapier 套餐线约束）。

pitfalls:
  - 把「千余应用」当「千余工具都开着」——工具面=你勾选的 action 白名单
  - 与 Zapier 平台的 Zap 自动化混谈——MCP server 是会话内代执行，Zap 是常驻自动化（automation 大类）
  - 工具因人而异——对照测试别人配置时别假设工具集相同

tags: [MCP, 多应用, 聚合入口, 远程托管, action白名单]
related: [cursor, claude-code]

mcp:
  transport: >-
    **Streamable HTTP 远程托管**（每用户专属端点 URL）；核验：actions.zapier.com 文档 200（2026-10-21）。
  auth: >-
    端点 URL 本身带鉴权语义（专属密钥端点）+ 各目标应用 OAuth；
    端点泄露=权限泄露——保管口径按凭据级。
  scope: >-
    作用域=勾选的 action 集合；读写都有（跟着 action 性质）。
    白名单是第一层收紧；无逐操作审批机制的官方说明。

sources:
  - label: Zapier · 官方 MCP 文档（配置与端点口径，2026-10-21 直抓核验）
    url: https://actions.zapier.com/docs/platform/mcp/
    kind: docs
  - label: Zapier · 官方更新日志（changelog）
    url: https://zapier.com/blog/updates/
    kind: changelog
  - label: Zapier · 官方 MCP 产品页
    url: https://zapier.com/mcp
    kind: docs

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Zapier, Inc.（美国）。
  origin_note_en: Zapier, Inc. (US).
  direct: yes
  direct_note: actions.zapier.com 直连实测 200（2026-10-21）。
  direct_note_en: actions.zapier.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Zapier MCP 是「千余应用的入口」**：你在 Zapier 侧勾选哪些 action，agent 就有哪些工具——
工具面是白名单生成的，不是厂商预置全量。这个结构本身就是收紧手段：没勾的不存在。

## 适合与不适合

适合：agent 要跨多应用干活、要按 action 粒度控权限。
不适合：要单应用最深工具面（用官方单厂商 server）；免费假设。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 套餐对 MCP 的约束细则（未逐条核验；D9 不采价格数字）
- 专属端点的轮换/吊销机制（未逐条核验）
- 支持应用×action 的完整矩阵（千余应用，未逐条清点）

## 相关条目

- Make / n8n（automation 大类，产物页 T30 后上线）— 跨大类对照：Zap 自动化线在 automation 大类；本条是它的「会话内代执行」面。
