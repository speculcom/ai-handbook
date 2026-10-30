---
id: gpt4all
form: local-app
name: GPT4All
vendor: Nomic AI
homepage: https://www.nomic.ai/gpt4all
license: MIT（GitHub API 核验 2026-10-30；官方描述「open-source and available for commercial use」直抓所见）。
licenseEn: MIT (GitHub API verified 2026-10-21; official description "open-source and available for commercial use", direct-fetched).

axes:
  model_access: >-
    官方模型目录（GPT4All 格式 .ggjt/.gguf 线）+ 本地导入；模型目录可用性随维护节奏变化——
    未逐条清点。
  runtime: >-
    桌面应用（Windows/macOS/Linux）；基于 llama.cpp 系。GitHub 77,349★，
    最近推送 2025-05-27（GitHub API 核验 2026-10-30——发版放缓是事实，如实记）。
  local_files: >-
    模型与对话默认落本机；官方口径是本地运行，未见官方云线（与 Ollama 的云端线不同）。
  background: >-
    内置本地 API server 线可供外部客户端连接；该线当前状态与默认开关未逐条核验。
  tools: >-
    应用内聊天为主轴；agent/工具调用生态未见官方主线，第三方扩展面也未逐条核验。
  context: >-
    会话上下文管理在应用内；跨会话记忆与长期记忆能力未见官方声明（未核验到≠没有）。
  permissions: >-
    桌面应用权限随操作系统授权；无账号体系、无云同步权限面（未见官方云线声明）。
  fit: >-
    适合：低配机器（CPU 优先）跑小模型、要 MIT 无附加条件的桌面方案。
    不适合：要新模型开箱（维护节奏放缓——看仓库最近推送）；要服务化部署。

pitfalls:
  - 把 77k★ 的热度当现行维护度——最近推送 2025-05-27（API 快照），选型前看仓库节奏
  - 把「commercial use」承诺延伸到模型权重——权重许可跟着模型走
  - 期待新模型跟进——放缓节奏下新架构支持不保证

tags: [开源, MIT, 桌面应用, CPU优先, llama.cpp系]
related: [openai-agents-sdk]

sources:
  - label: nomic-ai/gpt4all · 仓库（MIT；77,349★，最近推送 2025-05-27，GitHub API 核验 2026-10-30）
    url: https://github.com/nomic-ai/gpt4all
    kind: repo
  - label: GPT4All · 官网产品页
    url: https://www.nomic.ai/gpt4all
    kind: docs
  - label: GPT4All · 官方文档
    url: https://docs.gpt4all.io
    kind: docs
  - label: nomic-ai/gpt4all · Releases（changelog）
    url: https://github.com/nomic-ai/gpt4all/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: Nomic AI（美国）。
  origin_note_en: Nomic AI (US).
  direct: yes
  direct_note: nomic.ai 直连实测 200（2026-10-21）。
  direct_note_en: nomic.ai measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**GPT4All 是「人人设备上跑本地模型」的初代旗手**（Nomic AI，MIT）：CPU 优先、桌面开箱、商用无附加条件。
诚实标注：仓库最近推送 2025-05-27（API 快照）——热度在历史里，维护节奏要看当下。

## 适合与不适合

适合：无独显/低配机器跑小模型、要 MIT 干净许可的桌面方案。
不适合：要最新模型开箱支持；要服务化或多模型调度。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（本地端点与凭据边界一节可借用；运行器专用协议本站未立）。

## 未知项清单

- 官方模型目录当前可用清单（未逐条清点）
- 维护放缓的官方说明（未见——只记仓库事实，不猜原因）
- 内置 API server 的当前状态（未逐条核验）

## 相关条目

- [Jan](./jan.md) — 同为开源桌面 GUI：Jan 维护活跃，GPT4All 胜在 CPU 低配友好与 MIT 干净。
- [Ollama](./ollama.md) — 现役主流入口；GPT4All 的历史位置在「最早让普通人跑起来」。
