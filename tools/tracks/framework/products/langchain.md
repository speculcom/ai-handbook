---
id: langchain
form: harness
name: LangChain
vendor: LangChain, Inc.
homepage: https://www.langchain.com
license: MIT（GitHub API 核验 2026-10-21）。
licenseEn: MIT (GitHub API verified 2026-10-21).

family: orchestration
providers:
  - 模型无关：抽象层的卖点就是「换 provider 不改代码」，
    集成面以官方 integrations 目录为准（未逐条清点）
  - 它本身不调模型：模型接入经它的 provider 集成层（官方文档 2026-10-21 核验）
axes:
  model_access: >-
    模型接入层是它的看家能力：各家 LLM/嵌入/工具的统一接口族（provider 集成面巨大，
    以官方 integrations 目录为准，未逐条清点）；它本身不调模型，是「换模型不改代码」的抽象层。
  runtime: >-
    Python/JS 库（pip/npm 装进你的进程）；GitHub 148,205★（API 核验 2026-10-21）——
    LLM 应用框架生态的主体。配套 LangGraph（编排）/LangSmith（观测）是同一厂商的相邻产品线。
  local_files: >-
    库形态跑在你自己的代码与进程里；数据落点由你的集成决定（向量库/文件都在你侧）。
  background: >-
    库本体无常驻语义；常驻与否取决于你用它写出的应用。官方托管线（LangSmith 平台）是另一产品面。
  tools: >-
    工具定义与调用抽象是核心面；MCP 适配器线存在（langchain-mcp-adapters），支持细节未逐条核验。
  context: >-
    记忆/检索组件族（buffer/window/entity 等）是它的传统叙事；跨会话记忆要自己接存储——组件给模式不给托管。
  permissions: >-
    无账号体系（库形态）；权限面=你接的各家 API key 与工具能力。观测线（LangSmith）有数据上传面——默认行为未逐条核验。
  fit: >-
    适合：要最大集成生态、要「换 provider 不改代码」的抽象层、RAG/工具流起步。
    不适合：要轻量直连单家 API（抽象层是成本）；要开箱 agent 运行时（那是 LangGraph/Deep Agents 的线）。

pitfalls:
  - 把 LangChain/LangGraph/Deep Agents 混成一团——同厂商三条线：组件抽象层、图编排、预制深 agent
  - 把 148k★ 的生态当「每个集成都一等公民」——第三方集成质量参差，看官方维护标记
  - 用观测线不查数据上传面——LangSmith 上传 trace 是产品语义，接前先核默认行为

tags: [开源, MIT, 框架, 集成生态, RAG, Python, JS]
related: [cursor, claude-code]

sources:
  - label: langchain-ai/langchain · 仓库（MIT；148,205★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/langchain-ai/langchain
    kind: repo
  - label: LangChain · 官方文档
    url: https://python.langchain.com
    kind: docs
  - label: LangChain · 官方 changelog
    url: https://changelog.langchain.com
    kind: changelog
  - label: langchain-ai/langchain · Releases（changelog）
    url: https://github.com/langchain-ai/langchain/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: LangChain, Inc.（美国）。
  origin_note_en: LangChain, Inc. (US).
  direct: yes
  direct_note: langchain.com 与 python.langchain.com 直连实测 200（2026-10-21）。
  direct_note_en: langchain.com and python.langchain.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**LangChain 是 LLM 应用框架生态的主体**（MIT，148k★）：模型/工具/检索的统一抽象层，
集成面全网最大。同厂商三条线要分清：LangChain（组件抽象）、LangGraph（图编排）、Deep Agents（预制深 agent）。

## 适合与不适合

适合：要最大 provider/工具生态、要换模型不改代码、RAG 起步。
不适合：轻量直连单家 API；要开箱 agent 运行时。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- integrations 全目录与官方维护标记（未逐条清点）
- MCP 适配器当前能力面（未逐条核验）
- LangSmith 数据上传默认行为细节（未逐条核验）

## 相关条目

- [LangGraph](./langgraph.md) — 同厂商编排线：LangChain 给组件，LangGraph 给图与运行时。
- [Deep Agents](./deepagents.md) — 同厂商预制线：不想手搭全套循环时用它的深 agent 骨架。
