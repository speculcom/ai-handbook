---
id: flowise
form: web
name: Flowise
vendor: FlowiseAI, Inc.
homepage: https://flowiseai.com
license: 混合许可（官方 LICENSE.md 直抓核验 2026-10-21）：enterprise 目录与带特定版权声明的文件归商业许可；其余 Apache 2.0；第三方组件保留原许可。
licenseEn: Mixed license (official LICENSE.md, direct-fetched 2026-10-21): the enterprise directory and files carrying explicit commercial copyright notices fall under the commercial license; everything else is Apache 2.0; third-party components keep their original licenses.

axes:
  model_access: >-
    画布节点接各家 LLM/嵌入/向量库（LangChain 组件族为底）；provider 覆盖面以官方 docs 为准，未逐条核验。
  runtime: >-
    开源自托管（npm/Docker）+ 官方云两条线；GitHub 55,513★（API 核验 2026-10-21；最近推送 2026-08-13——
    节奏放缓是事实，如实记）。
  local_files: >-
    自托管实例数据落自有环境；chatflow 上传文件处理在实例内。
  background: >-
    自托管实例常开即承载 API 服务与队列；官方给 queue 模式（细节未逐条核验）。
  tools: >-
    节点生态含工具/检索/agent 流；MCP 支持状态未逐条核验。
  context: >-
    chatflow 的记忆节点（buffer/窗口等 LangChain 记忆组件）是官方上下文面；跨应用记忆未逐条核验。
  permissions: >-
    社区版基础鉴权；SSO/工作区隔离等在 enterprise 目录（商业许可区）。
  fit: >-
    适合：画布搭 LLM 应用（RAG/agent 流）起步快、要自托管。
    不适合：要企业功能开箱；要活跃发版节奏（2026-08 后推送放缓——建档快照口径）。

pitfalls:
  - 把「Apache 2.0 主体」读成全仓——enterprise 目录是商业区
  - 与 2024 年的星数/热度印象对齐——发版节奏已放缓，看仓库最近推送
  - 把画布原型当生产级运行时——原型快是它的强项，生产化要自己补

tags: [开源, Apache2.0混合, 画布, LLM应用, RAG, 自托管]
related: [langgraph]

sources:
  - label: FlowiseAI/Flowise · LICENSE.md（Apache 2.0 + enterprise 商业区，2026-10-21 直抓核验）
    url: https://github.com/FlowiseAI/Flowise/blob/main/LICENSE.md
    kind: docs
  - label: FlowiseAI/Flowise · 仓库（55,513★，最近推送 2026-08-13，GitHub API 核验 2026-10-21）
    url: https://github.com/FlowiseAI/Flowise
    kind: repo
  - label: Flowise · 官方文档
    url: https://docs.flowiseai.com
    kind: docs
  - label: FlowiseAI/Flowise · Releases（changelog）
    url: https://github.com/FlowiseAI/Flowise/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: FlowiseAI, Inc.（美国）。
  origin_note_en: FlowiseAI, Inc. (US).
  direct: yes
  direct_note: docs.flowiseai.com 直连实测 200（2026-10-21）。
  direct_note_en: docs.flowiseai.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Flowise 是「画布搭 LLM 应用」的开山一代**（LangChain 组件族的可视化封装）：RAG/agent 流原型极快。
两个诚实标注：许可是 Apache 2.0 + enterprise 商业区混合；2026-08 后仓库推送放缓——热度与维护节奏要看快照。

## 适合与不适合

适合：LLM 应用（RAG、agent 流）快速原型、要自托管、要读源码。
不适合：要企业功能开箱（SSO 等在商业区）；要长期活跃发版承诺（按快照口径）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- provider/节点全清单（未逐条核验）
- MCP 支持状态（未核验到官方文档）
- 发版节奏放缓的官方说明（未见——只记仓库事实，不猜原因）

## 相关条目

- [Langflow](./langflow.md) — 同为 LLM 画布：Langflow 归 DataStax、MIT 全仓、体量更大；Flowise 更早、混合许可。
