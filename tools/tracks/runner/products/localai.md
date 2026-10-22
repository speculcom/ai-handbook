---
id: localai
form: cli
name: LocalAI
vendor: Mudler T.（mudler）
homepage: https://localai.io
license: MIT（官网直抓所见「Open source · MIT · v4.8.0」+ GitHub API 核验 2026-10-21）。
licenseEn: MIT (official site states "Open source · MIT · v4.8.0", GitHub API verified 2026-10-21).

axes:
  model_access: >-
    多引擎（engines）架构接各家后端；官网口径「Run text, voice, vision, image, video, 3D and agent
    workloads through one open runtime」（直抓所见）；模型/引擎矩阵未逐条清点。
  runtime: >-
    单二进制 OpenAI 兼容 API 前置多后端；官网称亦兼容 Anthropic/Ollama/ElevenLabs API（直抓所见）；
    GitHub 49,830★（API 核验 2026-10-21）。
  local_files: >-
    官网口径「keep your data on your hardware」（直抓所见）；全自托管。
  background: >-
    常驻服务形态（单二进制 API server）；CPU-only 模式官网点名（直抓所见），并发细节未逐条核验。
  tools: >-
    agent 负载在官方多模态叙事内；工具调用面与 MCP 支持未逐条核验。
  context: >-
    上下文长度按后端引擎与部署配置变化；跨请求缓存与记忆线未逐条核验。
  permissions: >-
    自托管无账号体系；API 鉴权由部署方自配；多引擎后端的凭据面（如接云 API）未逐条核验。
  fit: >-
    适合：一个二进制换 URL 就把现有 OpenAI 客户端转本地、要文本之外（语音/图像）多模态负载同一运行时。
    不适合：只要单一 LLM 极致性能（专用引擎更精）；要大厂官方背书（个人主导项目）。

pitfalls:
  - 把「兼容多家 API」当「性能对齐各家官方」——兼容是接口面，性能跟后端引擎走
  - 个人主导项目的维护面——看仓库节奏与贡献者面（GitHub API 快照口径）
  - 引擎矩阵复杂——具体模型跑不跑得动先查官方 engines 文档

tags: [开源, MIT, OpenAI兼容, 多模态, 单二进制]
related: [openai-agents-sdk, llamaindex]

sources:
  - label: LocalAI · 官网（MIT/v4.8.0/多 API 兼容口径，2026-10-21 直抓核验）
    url: https://localai.io
    kind: docs
  - label: mudler/LocalAI · 仓库（MIT；49,830★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/mudler/LocalAI
    kind: repo
  - label: LocalAI · 官方文档
    url: https://localai.io/docs
    kind: docs
  - label: mudler/LocalAI · Releases（changelog）
    url: https://github.com/mudler/LocalAI/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Mudler T.（意大利，个人主导开源项目）。
  origin_note_en: Mudler T. (Italy, individual-led open-source project).
  direct: yes
  direct_note: localai.io 直连实测 200（2026-10-21）。
  direct_note_en: localai.io measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**LocalAI 是「换 URL 就转本地」的多模态运行时**：单二进制 OpenAI 兼容前置，底下接多引擎，
文本/语音/视觉/agent 负载同一栈。MIT、活跃维护（v4.8.0 官网直抓口径）。

## 适合与不适合

适合：现有 OpenAI 客户端最小改动转本地、CPU-only 机器、要多模态负载同一运行时。
不适合：单一 LLM 极致吞吐（专用引擎更精）；要机构级背书（个人主导）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（本地端点与凭据边界一节可借用；运行器专用协议本站未立）。

## 未知项清单

- engines 全矩阵与各引擎的模型支持面（未逐条清点）
- Anthropic/ElevenLabs 兼容面的完成度（官网口径直抓，细节未逐条核验）
- MCP 支持状态（未逐条核验）

## 相关条目

- [Ollama](./ollama.md) — 同为 OpenAI 兼容本地栈：Ollama 模型库开箱顺滑，LocalAI 多模态与多 API 兼容更宽。
- [vLLM](./vllm.md) — 单一 LLM 服务化吞吐 vLLM 更精；LocalAI 的价值在「一个运行时多种负载」。
