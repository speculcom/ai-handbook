---
id: copilot-studio
form: web
name: Microsoft Copilot Studio
vendor: Microsoft
homepage: https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio
license: 商业 SaaS，随 Microsoft 商业条款体系（产品条款/数据保护附录 DPA）；无自托管形态。

axes:
  model_access: >-
    官方文档线（learn.microsoft.com/microsoft-copilot-studio，2026-10-21 直抓 200）覆盖模型与生成式答案配置；
    具体可选模型清单未逐条核验。平台与 Microsoft 生态（Dataverse/Power Platform）深度绑定。
  runtime: >-
    纯云托管：agent 跑在 Microsoft 365 / Power Platform 云上；无自托管形态。
  local_files: >-
    知识源接 SharePoint/文件/Dataverse 等平台内数据；不承载本机文件运行时。
  background: >-
    云托管常驻是默认形态；触发与自动化经 Power Automate 衔接（官方文档线）。
  tools: >-
    官方文档列主题/动作/连接器体系（Power Platform 连接器生态）；MCP 支持状态未逐条核验。
  context: >-
    对话主题（topics）与变量是官方上下文组织方式；跨会话记忆机制未逐条核验。
  permissions: >-
    企业级身份/治理随 Microsoft 365 体系（Entra ID 等）；数据驻留与合规随 Microsoft 商业条款。
  fit: >-
    适合：Microsoft 365/Power Platform 存量企业、要企业治理现成、要 M365 生态内分发。
    不适合：不在 Microsoft 生态；要自托管。

pitfalls:
  - 把它当独立聊天机器人工具——它的价值绑定在 Power Platform/Dataverse 生态里
  - 计费按消息/容量计量——本站按 D9 不采价格数字，看官方 pricing 页
  - 官网产品页直抓 403（CF 拦截）——核验走 learn.microsoft.com 文档线

tags: [企业低代码, 云托管, PowerPlatform, M365, agent]
related: [microsoft-agent-framework]

sources:
  - label: Microsoft Copilot Studio · 官方文档入口（2026-10-21 直抓 200）
    url: https://learn.microsoft.com/en-us/microsoft-copilot-studio/
    kind: docs
  - label: Copilot Studio · 官方产品页（直抓 403=CF 拦截，浏览器可达）
    url: https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio
    kind: docs
  - label: Microsoft Learn · Copilot Studio 发布记录（changelog 入口）
    url: https://learn.microsoft.com/en-us/microsoft-copilot-studio/whats-new
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Microsoft（美国）。
  origin_note_en: Microsoft (US).
  direct: unknown
  direct_note: 产品页直抓 403（CF 拦截）、文档线 200——整体直连性标 unknown。
  direct_note_en: product page 403 (Cloudflare), docs 200 — overall directness marked unknown.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Copilot Studio 是 Microsoft 生态里的企业低代码 agent 平台**——它的「能不能用」很大程度取决于
你在不在 Power Platform/Dataverse 生态里。企业治理（身份、数据驻留）随 Microsoft 365 体系现成提供。

## 适合与不适合

适合：M365/Power Platform 存量企业、要现成企业治理、agent 要在 Teams/官网/M365 内分发。
不适合：不在 Microsoft 生态（生态外价值骤减）；要自托管（无此形态）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- 可选模型清单与切换粒度（未逐条核验）
- MCP 支持状态（未核验到官方文档）
- 跨会话记忆机制（未核验到官方文档）

## 相关条目

- [Bedrock Agents / AgentCore](./bedrock-agents.md) — 云巨头托管 agent 平台对照：AWS 偏开发者组件，微软偏业务用户+生态绑定。
