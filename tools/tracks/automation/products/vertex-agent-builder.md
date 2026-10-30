---
id: vertex-agent-builder
form: web
name: Vertex AI Agent Builder（Gemini Enterprise 平台线）
nameEn: Vertex AI Agent Builder
vendor: Google
homepage: https://cloud.google.com/products/agent-builder
license: 商业云服务，随 Google Cloud 条款体系；无自托管形态。

axes:
  model_access: >-
    平台原生接 Gemini 系列模型，并可经 Model Garden 接第三方模型；官方页面（2026-10-21 直抓）
    显示产品线已并入「Gemini platform」叙事（Innovate, build, and deploy enterprise-ready agents）。
  runtime: >-
    云托管：agent 跑在 Google Cloud（Vertex/Agentspace 线）；无自托管形态。
  local_files: >-
    数据源接 BigQuery/Drive/SharePoint 等云内连接器；不承载本机文件运行时。
  background: >-
    云托管常驻是默认形态：agent 服务随 GCP 部署持续在线，触发与调度由平台承载；
    「电脑关了还能跑」在托管形态下天然成立。无自托管形态的官方声明。
  tools: >-
    官方组件/扩展库 + 函数调用 + 数据连接器；MCP 支持状态未逐条核验。
  context: >-
    会话与检索（RAG/grounding）是官方上下文主轴；跨会话记忆未逐条核验。
  permissions: >-
    IAM/组织策略随 Google Cloud 体系；数据驻留选项随 GCP 区域模型。
  fit: >-
    适合：GCP 存量企业、要 Gemini 原生栈、要企业治理现成。
    不适合：不在 GCP 生态；要自托管。

pitfalls:
  - 产品线改名频繁（Agent Builder→Gemini Enterprise→Gemini platform 叙事）——按官方现行页读，别按旧名搜
  - 与 ADK（framework 大类）混同——ADK 是代码框架，Agent Builder 是平台界面；Google 两条线都推

tags: [企业低代码, 云托管, GCP, Gemini, agent平台]
related: [google-adk]

sources:
  - label: Google Cloud · Agent Builder 产品页（2026-10-21 直抓 200，Gemini platform 叙事在案）
    url: https://cloud.google.com/products/agent-builder
    kind: docs
  - label: Google Cloud · Agent Builder 文档（overview）
    url: https://cloud.google.com/vertex-ai/generative-ai/docs/agent-builder/overview
    kind: docs
  - label: Google Cloud · Vertex AI Release Notes（changelog）
    url: https://cloud.google.com/vertex-ai/generative-ai/docs/release-notes
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Google（美国）。
  origin_note_en: Google (US).
  direct: no
  direct_note: cloud.google.com 大陆不可直连（常规网络事实）；国际站直连实测 200（经代理）。
  direct_note_en: cloud.google.com not directly reachable from the mainland (common network fact); measured 200 via proxy.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Vertex AI Agent Builder 是 Google 的企业 agent 平台线**——官方页已并入「Gemini platform」叙事
（enterprise-ready agents 的构建/部署/治理）。它与代码侧的 [Google ADK](../../framework/products/google-adk.md) 是同一战略的两条腿。

## 适合与不适合

适合：GCP 存量、要 Gemini 原生 + 企业治理现成。
不适合：不在 GCP 生态；要自托管（无此形态）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- 产品线命名现状（Agent Builder / Gemini Enterprise / Agentspace 的关系——官方页叙事在漂移，只记直抓所见）
- MCP 支持状态（未核验到官方文档）
- 第三方模型接入的完整清单

## 相关条目

- [Google ADK](../../framework/products/google-adk.md) — 同门两条腿：ADK 写代码，Agent Builder 拖界面，最终都落 Google Cloud 运行时。
