---
id: stripe-mcp
form: mcp
name: Stripe Agent Toolkit / MCP
vendor: Stripe
homepage: https://docs.stripe.com/agentic-commerce
license: MIT（stripe/ai 仓 GitHub API 核验 2026-10-21——Stripe 官方 AI 工具仓，含 MCP 工具线）。
licenseEn: MIT (stripe/ai repo, GitHub API verified 2026-10-21 — Stripe's official AI tooling repo including the MCP tool line).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Stripe 后台能力
    （产品/价格/客户/支付查询、文档检索）包装成工具给 agent 用。
  runtime: >-
    本地进程（Python/TS 包起 stdio）为主；GitHub stripe/ai 1,965★，
    最近推送 2026-10-21（API 核验）。Stripe 另有 agentic commerce 产品线（ACP 等）——
    那是「agent 直接收款」的另一层，不算这个 server 本体。
  local_files: >-
    不碰本机文件系统——作用域是 Stripe 云端账户数据（customers/products/invoices 等）。
  background: >-
    stdio 随客户端生死；无后台任务语义。
  tools: >-
    Stripe API 检索、账户数据查询、docs 搜索等；写能力（建产品/价格）存在——
    完整清单以仓 README 为准，未逐条清点。
  context: >-
    无 server 侧跨会话记忆——状态在 Stripe 账户本身。
  permissions: >-
    **凭据=Stripe API key，按 key 权限走**：测试/正式 key 差别巨大。
    官方工具支持按 key 类型与工具白名单裁剪；支付写操作（退款/发送发票）真实存在——
    接 agent 前按 key 权限最坏面设防。
  fit: >-
    适合：Stripe 集成开发时让 agent 查 API 用法、查账户对象、试测试模式操作。
    不适合：要「只读保险」硬边界；非 Stripe 栈。

pitfalls:
  - 把 Agent Toolkit 与 agentic commerce（ACP 收款线）混谈——一个是开发工具一个是商业产品线
  - 用正式 key 接 agent 试写操作——先测试模式，写面（退款等）按最坏假设设防
  - 找 stripe/agent-toolkit 旧仓名——现役官方线在 stripe/ai 仓（2026-10-21 API 核验）

tags: [MCP, 支付, 开发工具, MIT, 本地stdio]
related: [cursor, claude-code]

mcp:
  transport: >-
    **stdio**（Python/TS 包本地起进程）为主；官方文档另有远程线说明——未逐条核验。
    核验：docs.stripe.com/agentic-commerce 200、stripe/ai 仓（2026-10-21 直抓）。
  auth: >-
    Stripe API key（测试/正式两态）；key 权限=工具权限上界。
    受限 key（restricted keys）支持面未逐条核验。
  scope: >-
    读面：账户对象查询、API 参考检索；写面：建产品/价格、发票、退款类工具存在。
    工具白名单裁剪可收窄；无工具级人工审批机制的官方说明。

sources:
  - label: Stripe · 官方 agentic commerce 文档（工具线口径，2026-10-21 直抓核验）
    url: https://docs.stripe.com/agentic-commerce
    kind: docs
  - label: stripe/ai · 仓库（MIT；1,965★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/stripe/ai
    kind: repo
  - label: Stripe · 官方 changelog（changelog）
    url: https://docs.stripe.com/changelog
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Stripe, Inc.（美国）。
  origin_note_en: Stripe, Inc. (US).
  direct: yes
  direct_note: docs.stripe.com 直连实测 200（2026-10-21）；stripe.com 主域直连 000（波动标注）。
  direct_note_en: docs.stripe.com measured 200 direct (2026-10-21); the stripe.com apex measured 000 (fluctuating, noted).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Stripe 官方给 agent 的开发工具线**（stripe/ai，MIT）：查 API 用法、查账户对象、
测试模式试操作。两条澄清：它与「agent 直接收款」的 agentic commerce 产品线不是一回事；
**写操作（退款/发票）真实存在——按 key 权限最坏面设防**。

## 适合与不适合

适合：Stripe 集成开发流、测试模式下的 agent 操作演练。
不适合：要硬只读边界；非 Stripe 栈。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 工具全清单与写工具明细（未逐条清点）
- restricted keys 的支持粒度（未逐条核验）
- 远程托管线当前状态（未逐条核验）

## 相关条目

- [Supabase MCP](./supabase-mcp.md) — 同为「开发工具型 server」：两者都把「凭据权限=安全边界」写在了明处。
