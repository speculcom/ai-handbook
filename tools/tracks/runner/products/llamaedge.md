---
id: llamaedge
form: cli
name: LlamaEdge
vendor: LlamaEdge 社区（WasmEdge / Second State 生态）
homepage: https://llamaedge.com
license: Apache-2.0（GitHub API 核验 2026-10-31）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-31).

axes:
  model_access: >-
    **GGUF 本地权重 + WASM 应用层**——模型走 GGML/AUTO 预加载（README 命令口径），
    推理逻辑编成 Wasm 应用（llama-chat.wasm 等）跑在 WasmEdge 运行时上；
    覆盖 LLM/embedding/语音转写/TTS/文生图/多模态六类模型线（README 分类链接）。
  runtime: >-
    **WasmEdge 运行时上的跨平台 Wasm 应用**——「cross-platform portable Wasm app that can run on many
    CPU and GPU devices」（README）；先装 WasmEdge，再下载 GGUF + .wasm 应用即跑。
    GitHub LlamaEdge/LlamaEdge Apache-2.0 1,663★ 推送停 2026-02-08（API 核验）；
    最新 release 0.29.0 同日（2026-02-08）发布。
  local_files: >-
    读写本机文件——GGUF 模型文件、.wasm 应用文件；wasmedge --dir .:. 挂载当前目录。
  background: >-
    CLI/本地服务进程（OpenAI 兼容 web 服务端点：/v1/chat/completions、/v1/embeddings、
    /v1/audio/transcriptions 等——README 端点列表）；无常驻云面。
  tools: >-
    OpenAI 兼容 API 端点面 + CLI chat 应用；不是 agent 工具宿主。
  context: >-
    无跨会话记忆（推理服务面）——上下文长度随 GGUF 模型与 WasmEdge 预加载参数配置；
    对话状态由客户端携带，服务端不存会话。
  permissions: >-
    本机运行；权限面=本机文件与 CPU/GPU。Wasm 沙箱是运行时层卖点（WasmEdge 口径）。
  fit: >-
    适合：要 WASM 可移植路线——一份 .wasm 应用跨 CPU/GPU 设备；边缘/嵌入式场景（WasmEdge 生态）。
    不适合：要活跃发版节奏（主仓推送停 2026-02-08）；要 llama.cpp 原生全特性面（WASM 层是转译路线）。

pitfalls:
  - 按旧 org 名找仓——现役主仓 LlamaEdge/LlamaEdge（README 内仍引 second-state/LlamaEdge 下载链接，两 org 同生态）
  - 把推送停 2026-02-08 当停运——llamaedge.com 文档线在线（直连 200）、release 0.29.0 同日发布；lifecycle 按 maintenance 口径
  - 忘装 WasmEdge 前置——它不是独立二进制 runner，是 WasmEdge 上跑 .wasm 应用；install_v2.sh 是第一步
  - 把六类模型线当同等成熟——LLM 线是主仓主线，embedding/语音/图像线在各自仓与文档页，成熟度不同

tags: [本地推理, 服务化推理, OpenAI兼容, WASM, WasmEdge, GGUF, Apache-2.0, 端侧]
related: [llama-cpp, ollama, localai, aider]

sources:
  - label: LlamaEdge/LlamaEdge · 仓库（Apache-2.0；1,663★，推送停 2026-02-08，GitHub API 核验；README 快速开始+端点列表）
    url: https://github.com/LlamaEdge/LlamaEdge
    kind: repo
  - label: GitHub releases · LlamaEdge（变更记录线：最新 release 0.29.0，2026-02-08 发布）
    url: https://github.com/LlamaEdge/LlamaEdge/releases
    kind: changelog
  - label: LlamaEdge · 官方文档站（llamaedge.com/docs 直连 200；六类模型分类页）
    url: https://llamaedge.com/docs
    kind: docs

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: LlamaEdge 社区（Second State / WasmEdge 生态，CNCF 毕业项目 WasmEdge 同系）。
  origin_note_en: LlamaEdge community (Second State / WasmEdge ecosystem, same lineage as the CNCF-graduated WasmEdge).
  direct: yes
  direct_note: llamaedge.com 直连 200；GitHub 仓直连 200（2026-10-31）。
  direct_note_en: llamaedge.com and the GitHub repo both returned 200 direct (2026-10-31).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); an open-source project not serving the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**LlamaEdge：WasmEdge 运行时上的 GGUF 推理 Wasm 应用集**（Apache-2.0，1,663★）——
「run LLM inference apps and create OpenAI-compatible API services locally」：
装 WasmEdge → 下载 GGUF + llama-chat.wasm → 即跑；.wasm 应用跨 CPU/GPU 设备可移植是核心卖点。
口径要点：**主仓推送停 2026-02-08、release 0.29.0 同日——lifecycle=maintenance**（文档站在线非停运）。

## 适合与不适合

适合：WASM 可移植路线、边缘/嵌入式设备；WasmEdge 生态用户。
不适合：要活跃发版节奏；要 llama.cpp 原生全特性面。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/runner/_protocol.md](../../../protocols/runner/_protocol.md)。

## 未知项清单

- 停更后是否有迁移/继任口径（org 内多数仓 2025 年起停更，未见官方声明）
- 各 GPU 后端（CUDA/Metal）在 WasmEdge 侧的支持矩阵（文档有页，未逐条核验）
- 六类模型线各自的发布仓与版本节奏（README 分类链接指向不同仓）

## 相关条目

- [llama.cpp](./llama-cpp.md) — 底座对照：LlamaEdge 把 llama.cpp 系推理编成 Wasm 跑在 WasmEdge 上，GGUF 同源。
- [Ollama](./ollama.md) — 对照：Ollama 是产品化封装；LlamaEdge 是可移植 Wasm 路线，端覆盖偏边缘设备。
- [LocalAI](./localai.md) — 同类：都是 OpenAI 兼容本地服务栈；LocalAI 走 Go 后端插件，LlamaEdge 走 Wasm 应用。
- [Aider](../../coding/products/aider.md) — 消费端对照：Aider 这类编码 agent 可指向任意 OpenAI 兼容端点——LlamaEdge 起本机端点后，agent 工作流即可跑在 WASM 推理栈上（端点兼容是两条线的接点）。
