---
id: langflow
form: web
name: Langflow
vendor: DataStax（原 Langflow AI）
homepage: https://www.langflow.org
license: MIT（GitHub API license 字段核验 2026-10-21：MIT）——十份里许可最干净的一档。
licenseEn: MIT (GitHub API license field verified 2026-10-21) — the cleanest license among this batch.

axes:
  model_access: >-
    组件接各家 LLM/embedding/向量库；DataStax 收购后与其向量数据库（AstraDB）线深度整合，
    其余 provider 覆盖以官方 docs 为准，未逐条核验。
  runtime: >-
    开源自托管（pip/uv/Docker）+ DataStax 托管线；GitHub 155,885★、最近推送 2026-10-21（API 核验，非常活跃）。
  local_files: >-
    自托管实例的数据、flow 定义与凭据全部落在自有环境；官方文档给导出/导入 flow 的机制
    （细节未逐条核验）。Cloud 托管线数据在 DataStax 云端。
  background: >-
    自托管实例常开即承载 API 服务与后台执行；官方给部署文档（细节未逐条核验）。
    「电脑关了还能跑」取决于你把实例跑在哪——平台不替你保管关机后的执行。
  tools: >-
    组件市场（marketplace）+ 自定义组件是官方扩展面；MCP 支持状态未逐条核验。
  context: >-
    flow 内状态与记忆组件是官方上下文面；跨 flow 记忆未逐条核验。
  permissions: >-
    开源版基础鉴权；企业治理随 DataStax 托管线——开/商分界未逐条核验。
  fit: >-
    适合：要 MIT 许可的 LLM 画布、要 Python 自定义组件、DataStax 栈。
    不适合：要开箱企业治理（在托管线）。

pitfalls:
  - 把它当「LangChain 官方产品」——它是独立项目（现归 DataStax），与 LangChain/LangGraph 是近亲不是同门
  - 只看到星数不看归属——DataStax 收购后产品叙事向企业数据栈倾斜（按官方口径建档）

tags: [开源, MIT, 画布, LLM应用, DataStax, 自托管, 组件市场]
related: [langgraph]

sources:
  - label: langflow-ai/langflow · 仓库（155,885★，MIT，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/langflow-ai/langflow
    kind: repo
  - label: Langflow · 官方文档
    url: https://docs.langflow.org
    kind: docs
  - label: Langflow · 官方首页
    url: https://www.langflow.org
    kind: docs
  - label: langflow-ai/langflow · Releases（changelog）
    url: https://github.com/langflow-ai/langflow/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Langflow AI 创立，现归 DataStax（美国）。
  origin_note_en: Founded as Langflow AI, now under DataStax (US).
  direct: yes
  direct_note: docs.langflow.org / langflow.org 直连实测 200（2026-10-21）。
  direct_note_en: docs.langflow.org / langflow.org measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Langflow 是 LLM 画布里体量最大、许可最干净（MIT 全仓）的一档**，现归 DataStax——
产品叙事向企业数据栈（AstraDB 向量线）倾斜。Python 自定义组件是它的扩展主轴。

## 适合与不适合

适合：要 MIT 自由度、要 Python 写自定义组件、DataStax/向量库栈用户。
不适合：要开箱企业治理（在 DataStax 托管线）；要「LangChain 官方」血统（它是独立近亲）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- provider 全清单（未逐条核验）
- MCP 支持状态（未核验到官方文档）
- 开源版与 DataStax 托管线的功能分界（未逐条核验）

## 相关条目

- [Flowise](./flowise.md) — 同为 LLM 画布：MIT 全仓 vs Apache+ee 混合、DataStax 企业线 vs 独立公司——许可与归属是分野。
