---
zh: "Agent Payments（智能体支付）"
en: "Agent Payments"
alias: ["智能体支付", "Agent 支付", "代理支付"]
purpose: "让 agent 代表用户完成付款。同时把「谁授权、买了什么、金额多少、出了事谁负责」变成可验证、可审计的凭证。"
def: ["Agent Payments 不是单一协议，而是一族做法。AP2 用 Intent / Cart / Payment Mandate 表达授权，ACP 面向商户与 agent 的结账流程，Visa TAP、Mastercard Agent Pay 与 x402 覆盖卡组织、链上支付等不同轨道。", "共同点是：用户先给出有边界的授权。agent 在边界内执行。商户与支付方验证凭证。事后可追溯。"]
why: "Agent 能自主购物、订票、调用付费 API 后，传统「人点确认」的假设失效。没有授权凭证与责任链，商户不敢收，用户不敢放，支付网络也无法处理争议。"
refs:
  - ["AP2 · 官方文档", "https://ap2-protocol.org/", "Agent Payments Protocol official documentation"]
  - ["x402 · 官方文档", "https://docs.x402.org/", "x402 official documentation"]
domain: "agent"
purposeTag: "learn"
level: 3
layer: "三"
ord: 76
last_verified: "2026-11-21"
verified_scope: "refs"
---

# Agent Payments（智能体支付）（Agent Payments）

**解决什么问题**

让 agent 代表用户完成付款。同时把「谁授权、买了什么、金额多少、出了事谁负责」变成可验证、可审计的凭证。

Agent Payments 不是单一协议，而是一族做法。

AP2 用 Intent / Cart / Payment Mandate 表达授权，ACP 面向商户与 agent 的结账流程，Visa TAP、Mastercard Agent Pay 与 x402 覆盖卡组织、链上支付等不同轨道。

共同点是：用户先给出有边界的授权。agent 在边界内执行。商户与支付方验证凭证。事后可追溯。

**为什么需要知道**

Agent 能自主购物、订票、调用付费 API 后，传统「人点确认」的假设失效。没有授权凭证与责任链，商户不敢收，用户不敢放，支付网络也无法处理争议。

**边界**

授权凭证不能替代风控、退款、税务与消费者保护。不同轨道的争议处理与责任分配差异很大。Agent 也可能被提示注入诱导超预算支付。所以金额上限、商户白名单、人工复核与撤销机制仍不可少。

**怎么判断用不用**

高频、低金额、服务方明确的 API 调用适合 x402 这类按次支付。需要卡组织保护与商户结账的，走 AP2 / ACP / TAP 等轨道。高金额或不可逆交易，应强制人工确认。

---
<!-- 站：第三站 · 用深 · 决定 AI 好不好用的那些具体做法。看完看判断一个方案靠不靠谱。 -->
