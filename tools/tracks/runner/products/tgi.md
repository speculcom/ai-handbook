---
id: tgi
form: cli
name: Text Generation Inference（TGI）
vendor: Hugging Face
homepage: https://huggingface.co/docs/text-generation-inference/index
license: Apache-2.0（GitHub API 核验 2026-10-30）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

axes:
  model_access: >-
    HF Hub 权重原生对接（Hugging Face 自家产品线）；safetensors 为主；
    支持模型/架构矩阵以官方 docs 为准，未逐条清点。
  runtime: >-
    服务化推理服务器（Rust+Python 混合线）；GitHub 10,880★，最近推送 2026-03-21；
    仓库已于 2026-03-21 由官方归档为只读（GitHub API 核验 2026-10-30：archived=true，
    页面横幅「archived by the owner on Mar 21, 2026. It is now read-only」）。
  local_files: >-
    自托管部署，数据在自有环境；HF Hub 拉取权重走网络，推理数据不出部署环境。
  background: >-
    产品形态就是常驻服务；连续批处理与流式输出是官方文档主轴，队列细节未逐条核验。
  tools: >-
    text-generation 客户端线含工具调用；MCP 支持未逐条核验。
  context: >-
    上下文长度按模型与部署配置设定；前缀缓存、chunked prefill 等优化的当前默认开关未逐条核验。
  permissions: >-
    自托管无账号体系；API 鉴权由部署方自配；与 HF Hub 交互的 token 权限面未逐条核验。
  fit: >-
    适合：HF 生态内既有 TGI 部署的延续（权重/客户端/文档同一门）、要官方 Docker 线。
    不适合：新项目选型——官方公告点名推荐 vLLM/SGLang 与 llama.cpp/MLX；仓库已归档只读。

pitfalls:
  - 把 HF 出品当「默认推荐」——官方 README 公告已明确推荐改用 vLLM/SGLang（及 llama.cpp/MLX 这类互操作本地引擎）
  - 仓库已归档只读（2026-03-21）——不再有安全补丁与新模型支持，存量部署选型要评估维护风险
  - 把 GGUF 当一等公民——TGI 主路线是 safetensors

tags: [开源, Apache2.0, 服务化推理, HuggingFace生态]
related: [openai-agents-sdk]

sources:
  - label: huggingface/text-generation-inference · 仓库（Apache-2.0；10,880★，最近推送 2026-03-21；2026-03-21 官方归档只读，GitHub API 核验 2026-10-30 archived=true）
    url: https://github.com/huggingface/text-generation-inference
    kind: repo
  - label: TGI · 官方文档
    url: https://huggingface.co/docs/text-generation-inference/index
    kind: docs
  - label: huggingface/text-generation-inference · Releases（changelog）
    url: https://github.com/huggingface/text-generation-inference/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: archived
confidence: partial

cn:
  origin: foreign
  origin_note: Hugging Face（美国）。
  origin_note_en: Hugging Face (US).
  direct: no
  direct_note: huggingface.co 直连实测 000（网络受限，非死亡判定；经代理可达 200）。
  direct_note_en: huggingface.co measured 000 direct (network-limited, not a death verdict; 200 via proxy).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**TGI 是 Hugging Face 官方的服务化推理服务器**：权重、客户端、文档同一门生态，Apache-2.0。
诚实标注：仓库已于 2026-03-21 归档只读（GitHub API 核验 2026-10-30）；官方 README 公告自陈进入 maintenance mode——只收小修小补，并点名推荐改用 vLLM、SGLang 与 llama.cpp/MLX。存量部署可用，新项目按官方推荐选型。

## 适合与不适合

适合：HF Hub 重度用户的既有 TGI 部署延续、要官方 Docker/客户端配套。
不适合：新项目默认选型——官方公告点名推荐 vLLM/SGLang（服务化）与 llama.cpp/MLX（本地）；单机开箱走 Ollama。

## 实测记录

本站尚未完成实测。models 站 guides `serving-deep-dive.md` 覆盖过服务化推理对照口径；
运行器专用实测协议本站未立。

## 未知项清单

- 支持架构矩阵现状（未逐条清点）
- 归档后是否仍有安全补丁渠道（未见官方说明——仓库只读，按无补丁评估）
- MCP 支持状态（未核验到官方声明）

## 相关条目

- [vLLM](./vllm.md) / [SGLang](./sglang.md) — 服务化推理的现役两极；TGI 是 HF 生态内的官方选项。
- [llama.cpp](./llama-cpp.md) — GGUF 单机路线的根；TGI 主路线是 safetensors 服务化。
