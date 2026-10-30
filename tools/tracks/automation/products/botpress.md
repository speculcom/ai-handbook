---
id: botpress
form: web
name: Botpress
nameEn: Botpress
vendor: Botpress
homepage: https://botpress.com
license: 产品按官方 ToS 管辖（当日直抓在册：加拿大客户对 Technologies Botpress Inc.（加拿大公司）、
  其余对 Botpress, Inc.（特拉华公司）——按客户所在地分流）；GitHub 主仓 MIT、on-prem v12 仓 AGPL-3.0（GitHub API 当日核验）。
licenseEn: The product is governed by the official ToS (direct-fetched same day: Canadian customers contract with
  Technologies Botpress Inc. (a Canadian Corporation), everyone else with Botpress, Inc. (a Delaware company) —
  routed by customer location); the GitHub main repo is MIT, the on-prem v12 repo AGPL-3.0 (GitHub API verified same day).

axes:
  model_access: >-
    平台不带自有模型——README 官方口径 powered by OpenAI，模型经平台接入各家；
    现役 Cloud 线的模型清单未逐条核验。
  runtime: >-
    云托管形态（app.botpress.cloud / studio.botpress.cloud 当日直连 200）；GitHub 主仓当日在册
    「This Repository」= integrations/devtools/bots/plugins（集成与开发工具面，非产品本体）；
    自托管走 v12 旧代仓（botpress/v12，AGPL-3.0）。
  local_files: >-
    Cloud 线数据在 Botpress 云端（Knowledge Bases/Tables 组件当日在册）；v12 on-prem 形态数据在本机——
    两代形态的数据面不同。
  background: >-
    agent 常驻在线是官方主打形态（首页当日口径：处理退款/账户更新/多步工作流的真实动作）；
    排队与续跑细节未逐条核验。
  tools: >-
    Hub 集成生态当日在册（Intercom/Zendesk/Hubspot/Salesforce）；渠道面在册（Webchat/WhatsApp/Slack 等）；
    开发面在册（@botpress/sdk、@botpress/cli、bots-as-code 示例）。MCP 支持未核验到官方声明。
  context: >-
    Knowledge Bases/Tables 是持久知识面（当日在册）；跨会话记忆机制细节未逐条核验。
  permissions: >-
    企业向（首页当日在册 SOC 2 compliant）；ToS 按客户所在地双主体分流（当日在册）；
    条款明言面向企业经营用途（not for personal or household purposes）；训练用途开关路径未逐条核验。
  fit: >-
    适合：客服/支持场景的 agent 平台（工单分流、升级交接、AI 动作）、要现成集成生态（CRM/帮助台）。
    不适合：要产品本体开源（主仓只是集成/工具面）、要大陆直连备案入口、要个人用途（ToS 明言企业向）。

pitfalls:
  - 「GitHub 主仓 MIT」≠「Botpress 产品开源」——主仓在册内容是 integrations/devtools/plugins，Cloud 本体闭源（README This Repository 节当日在册）
  - 自托管只有 v12 旧代（AGPL-3.0，2025-04 后推送放缓）——现役产品是 Cloud 线，别按 v12 评估现役形态
  - 旧文档域 docs.botpress.cloud 当日直连 000——现行文档在 botpress.com/docs（changelog 在 /docs/changelog），别按旧域判死链

tags: [低代码, agent平台, 客服销售, 云托管, 集成生态, 商业]
related: [dify, coze, langchain]

sources:
  - label: Botpress · 官网（客服 agent 平台定位与组件/集成/渠道面，2026-10-30 直抓 200）
    url: https://botpress.com
    kind: official
  - label: Botpress · Terms of Service（双主体分流+企业用途条款，2026-10-30 直抓 200）
    url: https://botpress.com/legal/terms-of-service
    kind: official
  - label: botpress/botpress · 官方主仓（MIT，GitHub API 当日核验 ★14,975/pushed 2026-10-29）
    url: https://github.com/botpress/botpress
    kind: repo
  - label: botpress/v12 · on-prem 旧代仓（AGPL-3.0，GitHub API 当日核验 ★156/pushed 2025-04-10）
    url: https://github.com/botpress/v12
    kind: repo
  - label: Botpress · Docs changelog（变更记录，2026-10-30 直抓 200）
    url: https://botpress.com/docs/changelog/
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Technologies Botpress Inc.（加拿大）/ Botpress, Inc.（美国特拉华）双主体按客户所在地分流
    （ToS 当日直抓在册）；未见于网信办公示名单。
  origin_note_en: dual entity by customer location — Technologies Botpress Inc. (Canada) / Botpress, Inc. (Delaware, US),
    on record in the ToS direct-fetched same day; not in the CAC public registry.
  direct: yes
  direct_note: botpress.com、app.botpress.cloud、botpress.com/docs 大陆直连实测 200（2026-10-30）；
    GitHub 两仓直连 000（代理 200）——代码获取需网络环境。
  direct_note_en: botpress.com, app.botpress.cloud and botpress.com/docs measured 200 direct from mainland (2026-10-30);
    the two GitHub repos measured 000 direct (200 via proxy) — code acquisition needs a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与批次 PDF 镜像，未见 Botpress 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and batch PDF mirrors searched 2026-10-30; no Botpress entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Botpress 是企业向客服场景的 AI agent 平台**（首页当日招牌：enterprise-grade AI agent platform for customer
support，「会执行退款/账户更新等真实动作」）：云托管现役线 + Hub 集成生态；GitHub 主仓是集成/开发工具面（MIT），
产品本体闭源——「开源 Botpress」的说法要按仓内容拆开看。

## 适合与不适合

适合：客服/支持 agent（工单分流、升级交接、AI 动作）、现成集成生态（Intercom/Zendesk/Salesforce）。
不适合：要产品本体开源、要大陆直连备案入口、要个人用途（ToS 明言企业向）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（agent 平台不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Cloud 线现役模型清单与切换面**（README 只说 powered by OpenAI，现役界面未逐条核验）
- **v12 on-prem 与 Cloud 的能力差**（两代形态并存在册，差距未在册）
- **Knowledge Bases/Tables 的数据隔离与留存口径**（ToS/隐私页未逐条核验）

## 未知项清单

- Cloud 线现役模型清单（未逐条核验）
- MCP 支持（未核验到官方声明）
- 训练用途开关路径与默认态（未逐条核验）
- 跨会话记忆机制细节（未逐条核验）

## 相关条目

- [Dify](./dify.md) — 同为 agent 搭建平台：Dify 开源可自托管、通用向；Botpress 云托管、客服场景纵深。
- [扣子 / Coze](./coze.md) — 同为低代码 agent 平台：Coze 绑国内分发渠道，Botpress 绑客服集成生态。
- [LangChain](../../framework/products/langchain.md) — 代码优先对照：要源码级控制归 framework，要平台托管归本类。
