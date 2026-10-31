---
id: mlc-llm
form: cli
name: MLC LLM
vendor: MLCEngine（CMU 系，mlc-ai）
homepage: https://llm.mlc.ai/docs/
license: Apache-2.0（GitHub API 核验 2026-10-31）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-31).

axes:
  model_access: >-
    **自带编译式推理引擎（MLCEngine）**——不是调外部模型的服务，是把模型编译成目标平台的原生执行码
    （「Universal LLM Deployment Engine with ML Compilation」官方定位）。模型侧吃 safetensors 系
    （HF 权重编译路线），与 llama.cpp 的 GGUF 预量化路线是两条根。
  runtime: >-
    **编译-部署型 CLI/库**（pip mlc-llm / mlc_llm 命令）；覆盖平台矩阵是它的主打面：
    NVIDIA/AMD/Intel GPU（CUDA/Vulkan/ROCm/OpenCL）、Apple Metal（含 iOS/iPadOS）、
    Web 浏览器（WebGPU+WASM，姊妹项目 WebLLM）、Android（OpenCL）——README 平台表逐格标注。
    GitHub mlc-ai/mlc-llm Apache-2.0 23,284★ 推送 2026-10-30（API 核验）；
    **GitHub releases 名义停 v0.20.0（dev 标签 v0.26.dev0）——发版线在 PyPI（mlc-llm 包）**。
  local_files: >-
    读写本机文件——模型权重（编译产物缓存在本地）、编译配置 JSON；REST server 跑在本机端口。
    编译步骤本身产出平台特定产物（这是它与「下载即跑」型 runner 的操作差）。
  background: >-
    REST server 是常驻本机进程（OpenAI 兼容 API）；无常驻云面——纯本地/自托管。
  tools: >-
    不是 agent 工具面——它的「工具」是命令行与 API：mlc_llm generate/generate-config/compile
    子命令 + MLCEngine 的 **OpenAI 兼容 REST API**（REST server/python/javascript/iOS/Android
    同一引擎同一编译器背书——README 口径）。
  context: >-
    无跨会话记忆（推理服务面）——上下文长度按编译时模型配置与运行时参数决定；
    对话状态由客户端携带，服务端不存会话。
  permissions: >-
    本机运行无鉴权默认（REST server 本地端口）；权限面=本机文件与 GPU 访问。无云账户、无遥测声明面。
  fit: >-
    适合：要「一套引擎多平台部署」——尤其移动端（iOS/Android 原生 Metal/OpenCL）与浏览器（WebLLM）
    这类 llama.cpp/Ollama 不覆盖的端；要编译期优化换运行性能的工程路线。
    不适合：要 GGUF 即下即跑的省事路线（llama.cpp/Ollama）；不想碰编译步骤的用户。

pitfalls:
  - 把 GitHub releases 当发版线——releases 名义停 v0.20.0（标签有 v0.26.dev0），实际发版在 PyPI；看 PyPI
  - 把它当 GGUF 生态——MLC 走 safetensors 编译路线，GGUF 预量化是 llama.cpp 根；模型准备步骤不同
  - 把 llm.mlc.ai 直连 000 当死站——网络受限非停运（GitHub 仓与文档线经代理可达）
  - 忽略编译步骤——「编译-部署」是它的操作模型，第一次跑要先编译/取编译产物，不是 pull 即跑

tags: [本地推理, 推理引擎, 编译, 跨平台, OpenAI兼容, Apache-2.0, 移动]
related: [ollama, llama-cpp, chatgpt]

sources:
  - label: mlc-ai/mlc-llm · 仓库（Apache-2.0；23,284★，推送 2026-10-30，GitHub API 核验；README 平台矩阵+MLCEngine 口径）
    url: https://github.com/mlc-ai/mlc-llm
    kind: repo
  - label: GitHub releases/tags · mlc-llm（变更记录线：releases 名义 v0.20.0、标签 v0.26.dev0——发版线在 PyPI）
    url: https://github.com/mlc-ai/mlc-llm/releases
    kind: changelog
  - label: MLC LLM · 官方文档站（安装/quick start/引擎口径；llm.mlc.ai 直连 000 网络受限，经代理 200）
    url: https://llm.mlc.ai/docs/
    kind: docs

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: MLCEngine / mlc-ai（CMU 系开源社区，LMSYS/MLC 生态）。
  origin_note_en: MLCEngine / mlc-ai (CMU-lineage open-source community, LMSYS/MLC ecosystem).
  direct: no
  direct_note: llm.mlc.ai 直连 000（网络受限，非死链）；GitHub 仓与 raw README 直连 200（2026-10-31）。
  direct_note_en: llm.mlc.ai measured 000 direct (network restricted, not dead); the GitHub repo and raw README returned 200 direct (2026-10-31).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); an open-source project not serving the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**MLC LLM：编译式跨平台推理引擎**（Apache-2.0，23,284★ 推送 2026-10-30）——
「Universal LLM Deployment Engine with ML Compilation」：把模型编译成目标平台原生码，
一套 MLCEngine 覆盖 NVIDIA/AMD/Intel GPU、Apple Metal（含 iOS）、浏览器 WebGPU/WASM（WebLLM）、
Android OpenCL，全部走 OpenAI 兼容 API。两条根口径：**safetensors 编译路线 ≠ GGUF 预量化路线**；
**发版线在 PyPI 不在 GitHub releases**（名义 v0.20.0/dev 标签 v0.26.dev0）。

## 适合与不适合

适合：一套引擎多平台部署（尤其移动端与浏览器端）；编译期优化换性能的工程路线。
不适合：GGUF 即下即跑的省事路线（llama.cpp/Ollama）；不想碰编译步骤的用户。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/runner/_protocol.md](../../../protocols/runner/_protocol.md)。

## 未知项清单

- PyPI 当前版本号与上传日期（pypi.org 直连 000 未达，按快照纪律不记未核验数字）
- 支持模型清单的完整面（文档有列表，未逐条清点）
- 编译产物在各端的分发方式（预编译 vs 用户自编译的边界，文档口径未逐条核验）

## 相关条目

- [Ollama](./ollama.md) — 对照：Ollama 是 GGUF pull 即跑的产品化封装；MLC 是编译-部署引擎，端覆盖（手机/浏览器）是 Ollama 没有的。
- [llama.cpp](./llama-cpp.md) — 两条根对照：llama.cpp 预量化 GGUF 直接跑；MLC 编译 safetensors 出平台原生码。
- [ChatGPT](../../chat/products/chatgpt.md) — 边界对照：云端对话入口（数据在对方侧）vs 本机编译部署引擎（数据不出本机）——OpenAI 兼容 API 让两者对客户端可互换，数据边界完全不同。
