---
id: agentforce
form: web
name: Salesforce Agentforce
vendor: Salesforce
homepage: https://www.salesforce.com/agentforce/
license: 商业 SaaS，随 Salesforce 条款体系（官方 legal 入口直抓 404——现行条款经 help/salesforce.com 文档线读，2026-10-21）；无自托管形态。

axes:
  model_access: >-
    经 Atlas 推理引擎接模型（OpenAI 等经 Salesforce 托管接入；官方口径未逐条核验）；
    模型选择对用户不透明是 CRM 嵌入式产品的常态——本站如实记「未逐条核验」。
  runtime: >-
    纯云托管，深度绑定 Salesforce Data Cloud/CRM 对象模型；无自托管形态。
  local_files: >-
    数据面是 CRM 对象与 Data Cloud；不承载本机文件运行时。
  background: >-
    云托管常驻；与 Flow/自动化平台衔接（官方产品页导航含 Agentforce Builder/Voice，2026-10-21 直抓）。
  tools: >-
    Actions/Topics 体系 + MuleSoft 连接器生态；MCP 支持状态未逐条核验。
  context: >-
    CRM 记录与 Data Cloud 是天然上下文源——这是它相对通用平台的最大结构性优势。
  permissions: >-
    权限随 Salesforce 共享模型/权限集体系——企业治理是 Salesforce 原生强项。
  fit: >-
    适合：Salesforce 存量企业（客服/销售场景）、要 CRM 上下文开箱即用。
    不适合：不在 Salesforce 生态（价值锚点消失）；要自托管。

pitfalls:
  - 把它当通用 agent 平台——它的价值锚在 CRM 上下文与 Salesforce 流程里
  - 官网 legal 旧路径 404——条款走 help.salesforce.com 文档线读
  - 按「每对话」类计量计费——本站按 D9 不采价格数字，看官方 pricing 页

tags: [企业agent, 云托管, CRM, Salesforce, 客服销售]
related: [openai-agents-sdk]

sources:
  - label: Salesforce · Agentforce 产品页（2026-10-21 直抓 200）
    url: https://www.salesforce.com/agentforce/
    kind: docs
  - label: Salesforce Help · Agentforce 文档（2026-10-21 直抓 200）
    url: https://help.salesforce.com/s/articleView?id=sf.gpt_agentforce_agents_about.htm
    kind: docs
  - label: Salesforce Help · Release Notes（changelog 入口）
    url: https://help.salesforce.com/s/articleView?id=sf.release_notes.htm
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Salesforce, Inc.（美国）。
  origin_note_en: Salesforce, Inc. (US).
  direct: yes
  direct_note: salesforce.com / help.salesforce.com 直连实测 200（2026-10-21）。
  direct_note_en: salesforce.com / help.salesforce.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Agentforce 是 Salesforce 生态内的企业 agent 平台**——价值锚点是 CRM 记录与 Data Cloud 天然上下文：
客服/销售场景里「agent 知道客户的一切」是通用平台给不了的结构性优势。出了 Salesforce 生态，锚点消失。

## 适合与不适合

适合：Salesforce 存量企业的客服/销售自动化、要 CRM 上下文开箱即用、要 Salesforce 权限体系现成。
不适合：不在 Salesforce 生态；要自托管；要模型透明可选。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- Atlas 引擎下模型选择与透明度（未逐条核验）
- MCP 支持状态（未核验到官方文档）
- Agentforce Builder/Voice 的功能边界（产品页导航在案，细节未逐条核验）

## 相关条目

- [Microsoft Copilot Studio](./copilot-studio.md) — 套件内嵌 agent 对照：微软绑 M365/Power Platform，Salesforce 绑 CRM/Data Cloud——生态绑定是共同主轴。
