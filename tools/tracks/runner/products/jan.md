---
id: jan
form: local-app
name: Jan
vendor: Menlo Research
homepage: https://www.jan.ai
license: Apache-2.0 主体 + 署名要求（官方 LICENSE 直抓核验 2026-10-21：Apache 2.0 文本 + 「Attribution is requested in user-facing documentation」附加声明；GitHub API 标 NOASSERTION 即因这段附加文本）。
licenseEn: Apache-2.0 core plus an attribution request (official LICENSE, direct-fetched 2026-10-21: Apache 2.0 text plus "Attribution is requested in user-facing documentation"; the GitHub API NOASSERTION flag comes from that extra text).

axes:
  model_access: >-
    官方定位「100% offline on your computer」（仓库描述直抓所见）；GGUF 本地模型为主，
    模型清单随版本滚动，未逐条清点。
  runtime: >-
    桌面应用（Jan 自研运行时 jan-core/jan-engine 线）；GitHub 45,028★（API 核验 2026-10-21）。
    仓库现归 Menlo Research 名下（janhq/jan；menloresearch/jan 为旧路径 301 跳转，直抓核验）。
  local_files: >-
    对话与模型全落本机（官方「100% offline on your computer」口径，仓库描述直抓所见）。
  background: >-
    应用内置本地 API server（OpenAI 兼容）可常开；细节未逐条核验。
  tools: >-
    插件/扩展生态在官方文档线内；MCP 支持状态未逐条核验，第三方扩展质量未清点。
  context: >-
    会话上下文管理在应用内；跨会话记忆与长期记忆未见官方声明（未核验到≠没有）。
  permissions: >-
    桌面应用权限随操作系统授权；无账号体系，离线定位下未见云同步权限面。
  fit: >-
    适合：要开源的桌面 GUI 跑离线模型（对比闭源的 LM Studio）。
    不适合：要服务化多模型部署；要开箱即用最新模型（模型获取体验弱于 Ollama）。

pitfalls:
  - 把 NOASSERTION 当「许可不明」——读 LICENSE 原文是 Apache2.0+署名请求，GitHub 标记只是机器判不了附加句
  - 用旧仓名 menloresearch/jan 找仓库——现路径 janhq/jan（旧路径 301 跳转仍可达）
  - 把「开源」与「模型免费」混谈——权重许可跟着模型走

tags: [开源, Apache2.0署名, 桌面应用, 离线, GGUF]
related: [openai-agents-sdk]

sources:
  - label: janhq/jan · LICENSE（Apache2.0+署名请求，2026-10-21 直抓核验）
    url: https://github.com/janhq/jan/blob/main/LICENSE
    kind: docs
  - label: janhq/jan · 仓库（45,028★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/janhq/jan
    kind: repo
  - label: Jan · 官网
    url: https://www.jan.ai
    kind: docs
  - label: janhq/jan · Releases（changelog）
    url: https://github.com/janhq/jan/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Menlo Research（美国/新加坡背景的研究机构）。
  origin_note_en: Menlo Research (US/Singapore-background research org).
  direct: no
  direct_note: www.jan.ai 直连实测 000（网络受限，非死亡判定；经代理可达 200）。
  direct_note_en: www.jan.ai measured 000 direct (network-limited, not a death verdict; 200 via proxy).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Jan 是「开源版 ChatGPT 桌面替代」的长期主义者**：100% 离线跑本地模型，Apache-2.0 主体加一句署名请求。
诚实标注：GitHub API 标 NOASSERTION 是机器判不了附加署名句——读 LICENSE 原文才准；官网直连 000（网络受限非死亡）。

## 适合与不适合

适合：要开源可审计的桌面离线聊天、要内置 OpenAI 兼容本地端点。
不适合：服务化部署；要最顺滑的模型获取体验。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（本地端点与凭据边界一节可借用；运行器专用协议本站未立）。

## 未知项清单

- jan-core/jan-engine 运行时的模型格式支持矩阵（未逐条核验）
- MCP 支持状态（未逐条核验）
- 署名要求的法律约束力边界（Apache 附加句是请求还是条件——本站不做法律判断）

## 相关条目

- [LM Studio](./lm-studio.md) — 同为桌面 GUI：LM Studio 闭源但 agent 叙事激进，Jan 开源但节奏更稳。
- [Ollama](./ollama.md) — 模型获取与 CLI 线 Ollama 更强；Jan 的价值在开源桌面壳。
