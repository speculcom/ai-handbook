---
id: voiceflow
form: web
name: Voiceflow
nameEn: Voiceflow
vendor: Voiceflow
homepage: https://www.voiceflow.com
license: 闭源商业产品，按官方 ToS 管辖（当日直抓在册：主体 Voiceflow, Inc.）。
licenseEn: Closed commercial product governed by the official ToS (direct-fetched same day: entity Voiceflow, Inc.).

axes:
  model_access: >-
    平台不带自有模型——模型经平台接入各家；现役界面的模型清单与切换面未逐条核验。
    首页当日招牌为 CX（客户体验）向 AI agent 平台，语音与文本对话双线在册。
  runtime: >-
    云托管形态（www.voiceflow.com 直连 200；登录入口 Login/Get started 在册）；
    未见官方自托管发行声明——「Voiceflow 能不能自己部署」未核验到官方口径，按未知处理。
  local_files: >-
    会话与 agent 数据在 Voiceflow 云端（平台形态决定数据面）；本地文件概念不适用——
    构建产物（agent 定义）托管在平台工作区内，导出与迁移面未逐条核验。
  background: >-
    对话 agent 常驻在线响应是主打形态（首页当日在册「10K+ live agents」运行量级）；
    排队、定时与断线续跑细节未逐条核验。
  tools: >-
    集成与渠道面在册（首页当日：Customer stories、Integrations 导航）；
    MCP 支持未核验到官方声明，按未知处理。
  context: >-
    对话 agent 的会话记忆与知识库面是产品组件（docs 在册）；跨会话持久记忆的机制细节
    未逐条核验——画布类平台的知识面通常挂在 agent 配置上，具体边界以实测为准。
  permissions: >-
    企业向（首页当日招牌 Enterprise Conversational AI Platform；G2 2026 Best Software Award 在册）；
    ToS 主体 Voiceflow, Inc.（当日直抓在册）；训练用途开关路径未逐条核验。
  fit: >-
    适合：客服/CX 场景的对话与语音 agent（画布编排、企业交付）、要现成客户案例与合规叙事。
    不适合：要自托管（未见官方发行）、要大陆直连备案入口、要代码级运行时控制（画布为主轴）。

pitfalls:
  - changelog 在 voiceflow.com/docs/changelog（docs 子路径）——主域导航的 Changelog 链接也指向 docs 区，别按「主域/changelog」判缺失
  - 产品定位已从早期「语音流原型工具」走到企业 CX agent 平台（首页当日招牌）——按旧印象只当语音原型工具会错位，文本对话 agent 是现役主轴之一

tags: [低代码, agent平台, 对话agent, 语音agent, 客服销售, 企业向, 云托管, 商业]
related: [botpress, elevenlabs, langchain]

sources:
  - label: Voiceflow · 官网（Enterprise CX/语音 agent 定位、3,000+ customers/10K+ live agents，2026-10-30 直抓 200）
    url: https://www.voiceflow.com
    kind: official
  - label: Voiceflow · Terms of Service（主体 Voiceflow, Inc.，2026-10-30 直抓 200）
    url: https://www.voiceflow.com/legal/terms
    kind: official
  - label: Voiceflow · Docs changelog（变更记录，最新条目 2026-09-25，2026-10-30 直抓 200）
    url: https://www.voiceflow.com/docs/changelog
    kind: changelog
  - label: Voiceflow · Pricing（2026-10-30 直抓 200）
    url: https://www.voiceflow.com/pricing
    kind: official

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Voiceflow, Inc.（ToS 当日直抓在册）。
  origin_note_en: Voiceflow, Inc. (on record in the ToS direct-fetched same day).
  direct: yes
  direct_note: www.voiceflow.com、/legal/terms、/docs/changelog、/pricing 大陆直连实测 200（2026-10-30）。
  direct_note_en: www.voiceflow.com, /legal/terms, /docs/changelog and /pricing measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与第十六批批次清单，未见 Voiceflow 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and the 16th batch list searched 2026-10-30; no Voiceflow entry); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Voiceflow 是企业向客服/CX 场景的对话与语音 agent 画布平台**（首页当日招牌：Enterprise Conversational AI
Platform & Voice AI，「AI agents customers love. ROI you can prove」，3,000+ customers / 10K+ live agents）：
云托管、画布编排为主轴；早期「语音流原型工具」的旧印象已被现役企业 CX 定位覆盖。

## 适合与不适合

适合：客服/CX 对话与语音 agent（画布编排、企业交付、客户案例背书）。
不适合：要自托管（未见官方发行声明）、要大陆直连备案入口、要代码级运行时控制。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（agent 平台不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **现役界面的模型清单与切换面**（平台接入各家模型，具体清单未在册）
- **自托管/私有部署是否存在**（未见官方声明——企业向产品常有但未公开）
- **agent 定义导出与跨环境迁移面**（画布工作区的资产可移植性未在册）

## 未知项清单

- 自托管/私有部署形态（未核验到官方声明）
- MCP 支持（未核验到官方声明）
- 现役模型清单与切换面（未逐条核验）
- 训练用途开关路径与默认态（未逐条核验）

## 相关条目

- [Botpress](./botpress.md) — 同为客服向 agent 平台：Botpress 绑集成生态（CRM/帮助台），Voiceflow 绑画布编排与企业 CX 交付。
- [ElevenLabs](../../audio/products/elevenlabs.md) — 语音层对照：Voiceflow 管对话流程，语音合成质量层要看 audio 类工具。
- [LangChain](../../framework/products/langchain.md) — 代码优先对照：要源码级控制归 framework，要画布托管归本类。
