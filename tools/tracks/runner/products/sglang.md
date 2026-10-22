---
id: sglang
form: cli
name: SGLang
vendor: LMSYS / sgl-project
homepage: https://docs.sglang.ai
license: Apache-2.0（GitHub API 核验 2026-10-21）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

axes:
  model_access: >-
    safetensors/HF 系权重为主；支持模型清单以官方 docs 为准，未逐条清点。
    官方定位含「large language models and multimodal models」（仓库描述直抓所见）。
  runtime: >-
    服务化推理框架：RadixAttention 前缀缓存复用是官方招牌（自报数字在 models 站 guides
    serving-deep-dive.md 已核验快照，出处同源）；GitHub 37,571★（API 核验 2026-10-21）。
  local_files: >-
    自托管部署，数据在自有环境；未见官方托管云线——第三方云托管不算官方口径。
  background: >-
    产品形态就是常驻服务（OpenAI 兼容 server）；agent 多轮场景的前缀复用是叙事重点。
  tools: >-
    OpenAI 兼容 API 含 tool calling；结构化输出（官方语言特性线）在文档内；MCP 支持未逐条核验。
  context: >-
    RadixAttention 对多轮/共享前缀的上下文复用是主轴；细节未逐条核验。
  permissions: >-
    自托管无账号体系；API 鉴权由部署方自配；多租户/隔离面未逐条核验。
  fit: >-
    适合：agent 多轮调用/共享 system prompt 的服务化场景（前缀复用收益直接）、要结构化输出语言特性。
    不适合：单机开箱跑量化档；要最大生态兼容面（vLLM 生态更宽）。

pitfalls:
  - 把 RadixAttention 自报数字当本站实测——官方口径快照，本站不实测
  - 与 vLLM 二选一时只看吞吐——agent 多轮场景前缀复用才是 SGLang 的差异点
  - 把 LMSYS 项目当 LMSYS 产品——SGLang 是独立项目（sgl-project），Chatbot Arena 是另一条线

tags: [开源, Apache2.0, 服务化推理, RadixAttention, 多模态]
related: [openai-agents-sdk, langgraph]

sources:
  - label: sgl-project/sglang · 仓库（Apache-2.0；37,571★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/sgl-project/sglang
    kind: repo
  - label: SGLang · 官方文档
    url: https://docs.sglang.ai
    kind: docs
  - label: sgl-project/sglang · Releases（changelog）
    url: https://github.com/sgl-project/sglang/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: sgl-project（LMSYS 系学术开源项目）。
  origin_note_en: sgl-project (LMSYS-line academic open-source project).
  direct: yes
  direct_note: docs.sglang.ai 直连实测 200（2026-10-21）。
  direct_note_en: docs.sglang.ai measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**SGLang 是服务化推理的「前缀复用」一代**：RadixAttention 把多轮/共享前缀的 KV 缓存复用做成主轴，
agent 工作流场景收益直接。Apache-2.0，LMSYS 系学术开源。自报数字走 models 站 guides 快照口径。

## 适合与不适合

适合：agent 多轮调用、大量共享 system prompt/few-shot 的服务化部署、要官方结构化输出特性。
不适合：单机开箱（Ollama）；要最宽生态兼容面（vLLM 更成熟）。

## 实测记录

本站尚未完成实测。models 站 guides `serving-deep-dive.md` 已核验过 SGLang 官方口径（RadixAttention 自报数字），
本档案复用同一快照出处。运行器专用实测协议本站未立。

## 未知项清单

- 支持模型全清单（未逐条清点）
- MCP 支持状态（未逐条核验）
- 结构化输出语言（SGLang 官方 DSL）的当前稳定度（未逐条核验）

## 相关条目

- [vLLM](./vllm.md) — 服务化推理的另一极：vLLM 生态更宽，SGLang 前缀复用叙事更锐。
- [LangGraph](../../framework/products/langgraph.md) — 跨大类对照：agent 编排框架的多轮调用是 SGLang 前缀复用的典型受益负载。
