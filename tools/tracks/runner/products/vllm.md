---
id: vllm
form: cli
name: vLLM
vendor: vLLM 项目（PyTorch 基金会）
homepage: https://docs.vllm.ai
license: Apache-2.0（GitHub API 核验 2026-10-30）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

axes:
  model_access: >-
    safetensors/HF 系权重为主（GGUF 支持有限——models 站口径：量化服务化首选仍是 llama.cpp 路线）；
    支持模型清单以官方 docs 为准，未逐条清点。
  runtime: >-
    服务化推理引擎：PagedAttention 显存管理是官方招牌（自报数字在 models 站 guides
    serving-deep-dive.md 已核验快照，出处同源）；GitHub 95,878★（API 核验 2026-10-21）。
  local_files: >-
    自托管部署，数据在自有环境；无官方托管云线（第三方云托管不算官方）。
  background: >-
    产品形态就是常驻服务（OpenAI 兼容 server）；并发/批处理调度是主轴。
  tools: >-
    OpenAI 兼容 API 含 tool calling；MCP 支持状态未逐条核验。
  context: >-
    长上下文按模型与显存配置；前缀缓存等优化在官方文档线，细节未逐条核验。
  permissions: >-
    自托管无账号体系；API 鉴权由部署方自配；多租户隔离与配额面未逐条核验。
  fit: >-
    适合：多模型/多请求的服务化部署、要吞吐与显存效率、生产环境 OpenAI 兼容端点。
    不适合：单机开箱跑量化档（llama.cpp/Ollama 更省事）；GGUF 深度依赖场景。

pitfalls:
  - 把「跑开源模型」都当等价——vLLM 强在服务化调度，单机单模型开箱它不是最省事
  - 把 PagedAttention 自报数字当本站实测——那是官方口径快照，本站不实测
  - 指望 GGUF 一等公民支持——量化服务化首选 llama.cpp 路线（models 站口径）

tags: [开源, Apache2.0, 服务化推理, PagedAttention, OpenAI兼容]
related: [openai-agents-sdk, llamaindex]

sources:
  - label: vllm-project/vllm · 仓库（Apache-2.0；95,878★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/vllm-project/vllm
    kind: repo
  - label: vLLM · 官方文档
    url: https://docs.vllm.ai
    kind: docs
  - label: vllm-project/vllm · Releases（changelog）
    url: https://github.com/vllm-project/vllm/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: vLLM 项目（UC Berkeley 起源，现归 PyTorch 基金会生态）。
  origin_note_en: vLLM project (UC Berkeley origin, now under the PyTorch Foundation umbrella).
  direct: yes
  direct_note: docs.vllm.ai 直连实测 200（2026-10-21）。
  direct_note_en: docs.vllm.ai measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**vLLM 是开源模型「服务化」的标杆**：PagedAttention 把显存管理做成核心竞争力，OpenAI 兼容 server 直接对接现有客户端。
Apache-2.0、PyTorch 基金会生态。数字口径：官方自报性能数字在 models 站 guides 已核验快照，本站不实测。

## 适合与不适合

适合：生产部署多模型/高并发推理服务、GPU 集群吞吐优先。
不适合：个人单机开箱（Ollama 更省事）、GGUF 量化档深度依赖（llama.cpp 路线）。

## 实测记录

本站尚未完成实测。models 站 guides `serving-deep-dive.md` 已核验过 vLLM 官方口径（PagedAttention 自报数字），
本档案复用同一快照出处，不重复抓取。运行器专用实测协议本站未立。

## 未知项清单

- 支持模型全清单（未逐条清点）
- MCP 支持状态（未逐条核验）
- 前缀缓存/chunked prefill 等优化的当前默认开关（未逐条核验）

## 相关条目

- [SGLang](./sglang.md) — 同为服务化推理引擎：SGLang 主打 RadixAttention 与 agent 工作流前缀复用。
- [llama.cpp](./llama-cpp.md) — 单机 GGUF 路线的根；两条路线在 models 站 guides 有对照。
