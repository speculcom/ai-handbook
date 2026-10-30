---
id: mlx
form: cli
name: MLX（mlx-lm）
vendor: Apple
homepage: https://ml-explore.github.io/mlx/build/html/index.html
license: MIT（GitHub API 核验 2026-10-30；mlx 与 mlx-lm 两仓皆 MIT）。
licenseEn: MIT (GitHub API verified 2026-10-21; both mlx and mlx-lm repos are MIT).

axes:
  model_access: >-
    MLX 原生格式 + HF 转换（mlx-community 生态）；GGUF 可转换（mlx-community 有转换线）；
    模型清单随社区滚动，未逐条清点。
  runtime: >-
    Apple 硅（M 系）统一内存架构的原生张量框架；mlx-lm 是官方 LLM 运行线
    （「Run LLMs with MLX」仓库描述直抓所见）。GitHub mlx 28,975★ / mlx-lm 7,506★（API 核验 2026-10-21）。
  local_files: >-
    全本地：模型与输出都在自有环境；未见官方云线——Apple 未提供配套云端推理线（未见声明）。
  background: >-
    mlx_lm.server 提供 OpenAI 兼容服务线；细节未逐条核验。
  tools: >-
    mlx-lm 含 tool calling 线；MCP 支持未逐条核验。
  context: >-
    上下文按参数配置；KV 缓存量化在 mlx-lm 文档线，细节未逐条核验。
  permissions: >-
    本地进程无账号体系；命令行/服务线鉴权由使用者自配（mlx_lm.server 细节未逐条核验）。
  fit: >-
    适合：Apple 硅机器要原生性能（统一内存红利）、要在 Mac 上微调（mlx-lm 带微调线）。
    不适合：非 Apple 硬件；要跨平台同一栈（llama.cpp 覆盖面更宽）。

pitfalls:
  - 把 MLX 当通用推理引擎——Apple 硅专属，x86/NVIDIA 不是它的场
  - 只记 mlx 框架——跑 LLM 要用 mlx-lm 这层
  - 把 mlx-community 模型当官方出品——社区转换生态，质量随贡献者

tags: [开源, MIT, Apple硅, 统一内存, mlx-lm]
related: [openai-agents-sdk]

sources:
  - label: ml-explore/mlx · 仓库（MIT；28,975★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/ml-explore/mlx
    kind: repo
  - label: ml-explore/mlx-lm · 仓库（MIT；7,506★，最近推送 2026-10-29，GitHub API 核验）
    url: https://github.com/ml-explore/mlx-lm
    kind: repo
  - label: MLX · 官方文档
    url: https://ml-explore.github.io/mlx/build/html/index.html
    kind: docs
  - label: ml-explore/mlx · Releases（changelog）
    url: https://github.com/ml-explore/mlx/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Apple（美国）。
  origin_note_en: Apple (US).
  direct: yes
  direct_note: ml-explore.github.io 直连实测 200（2026-10-21）。
  direct_note_en: ml-explore.github.io measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**MLX 是 Apple 硅的官方本地推理栈**：统一内存架构的原生框架（mlx）+ 官方 LLM 运行线（mlx-lm），
MIT、活跃维护。Mac 用户跑本地模型的「亲儿子」路线——连微调都在同一栈里。

## 适合与不适合

适合：M 系 Mac 要原生性能与统一内存红利、要在 Mac 上做 LoRA 微调、mlx-community 模型生态。
不适合：非 Apple 硬件（框架专属）；要跨平台单一技术栈。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（本地端点与凭据边界一节可借用；运行器专用协议本站未立）。

## 未知项清单

- mlx-community 模型全清单与转换质量（社区生态，未逐条清点）
- mlx_lm.server 的 OpenAI 兼容面细节（未逐条核验）
- MCP 支持状态（未核验到官方声明）

## 相关条目

- [llama.cpp](./llama-cpp.md) — 跨平台 GGUF 路线的根；LM Studio 把两条线都包进一个应用。
- [Ollama](./ollama.md) — Mac 上开箱模型获取 Ollama 更顺滑；MLX 的价值在 Apple 硅原生性能与同栈微调。
