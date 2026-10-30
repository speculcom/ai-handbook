---
id: haystack
form: harness
name: Haystack
vendor: deepset
homepage: https://haystack.deepset.ai
license: Apache-2.0（GitHub API 核验 2026-10-30）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

family: orchestration
providers:
  - 生成/嵌入模型经集成接入：OpenAI/Anthropic/本地 HF 等（官方集成目录为准，未逐条清点）
  - RAG 检索栈（dense/sparse/hybrid）与模型 provider 解耦：检索组件不依赖特定厂商
axes:
  model_access: >-
    各家生成模型与嵌入模型经集成接入（OpenAI/Anthropic/本地 HF 等，以官方集成目录为准，
    未逐条清点）；RAG 检索栈（dense/sparse/hybrid）是它的看家面。
  runtime: >-
    Python 库（pip 装进你的进程）；GitHub 26,880★，最近推送 2026-10-30（API 核验）。
    管线（pipeline）抽象是主轴：组件连成图，跑批或跑服务都在你的进程里。
  local_files: >-
    文档索引与检索数据在你选的存储（文件/向量库/文档库）——数据不出你侧；
    deepset Cloud 托管线是另一产品面。
  background: >-
    库无常驻语义；索引管道可离线批跑，查询服务由你部署。
    2.x 把 1.x 的 node 体系重写成 component/pipeline 模型，升级是大改而非平滑迁移。
  tools: >-
    agent 层（2.x 起）含工具调用循环；MCP 支持状态未逐条核验。
  context: >-
    会话记忆组件存在（chat message store 线）；跨会话记忆要自己接存储——组件给模式不给托管。
  permissions: >-
    无账号体系（库形态）；权限面=你接的各家 key 与存储凭据。deepset Cloud 上传面是另一条线的口径。
  fit: >-
    适合：生产级 RAG 管线（检索质量工程：hybrid/reranker/评估环）、要可审计的组件图。
    不适合：只要一个薄聊天壳（过重）；agent 深度编排（LangGraph 线更专）。

pitfalls:
  - 把 Haystack 当「demo 级 RAG 脚本」——它的定位是生产管线（索引/查询分离、评估环）
  - 把 deepset Cloud 与开源库混谈——托管线的数据上传口径是另一产品条款
  - 1.x→2.x 的管线 API 大改——旧教程代码在新版跑不通，看版本标记

tags: [开源, Apache2.0, RAG, 检索管线, 生产级]
related: [cursor, claude-code]

sources:
  - label: deepset-ai/haystack · 仓库（Apache-2.0；26,880★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/deepset-ai/haystack
    kind: repo
  - label: Haystack · 官方文档
    url: https://haystack.deepset.ai
    kind: docs
  - label: deepset-ai/haystack · Releases（changelog）
    url: https://github.com/deepset-ai/haystack/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: deepset GmbH（德国柏林）。
  origin_note_en: deepset GmbH (Berlin, Germany).
  direct: yes
  direct_note: haystack.deepset.ai 直连实测 200（2026-10-21）。
  direct_note_en: haystack.deepset.ai measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Haystack 是「检索质量工程」那一派的 RAG 框架**（Apache-2.0，deepset）：索引/查询管线分离、
hybrid 检索与 reranker、评估环——生产味最浓的一条 RAG 线。2.x 管线 API 大改，旧教程要警惕。

## 适合与不适合

适合：生产 RAG（要检索质量与可审计组件图）、自建存储的数据主权场景。
不适合：薄聊天壳；深度 agent 编排（LangGraph 更专）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- 集成全目录（未逐条清点）
- agent 层当前完成度与 MCP 支持（未逐条核验）
- deepset Cloud 的数据处理条款细节（另一产品面，未逐条核验）

## 相关条目

- [LlamaIndex](./llamaindex.md) — RAG 双雄对照：LlamaIndex 从数据接入侧起手，Haystack 从管线工程侧起手。
- [LangChain](./langchain.md) — 组件生态对照：LangChain 集成面更宽，Haystack 检索管线更专。
