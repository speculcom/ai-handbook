---
id: llama-cpp
form: cli
name: llama.cpp
vendor: ggml-org
homepage: https://github.com/ggml-org/llama.cpp
license: MIT（官方仓 README 徽章与 LICENSE 一致，2026-10-21 直抓核验；2026-11-21 复核）。
licenseEn: MIT (official repo README badge and LICENSE consistent, direct-fetched 2026-10-21).

axes:
  model_access: >-
    GGUF 生态根。官方 server 支持 F16 与量化模型在 GPU/CPU 推理。模型可从 Hugging Face 取 GGUF，也可自转 safetensors。支持模型族随合入滚动，量化档由社区量化者产出（2026-11-21）。
  runtime: >-
    C/C++ 推理库，另有 `llama-server`。OpenAI 兼容 `/v1/chat/completions`、`/v1/completions`、embeddings 与 responses，另有 Anthropic 兼容 `/v1/messages`。

    构建后端覆盖 CPU、Metal、SYCL、CUDA、HIP 与 Vulkan，自带 Web UI（2026-11-21）。
  local_files: >-
    全本地。模型权重、KV cache、对话与生成物都在自有机器。`--kv-offload` 可把 KV cache 放 GPU，`--no-kv-offload` 留 CPU。官方无云托管线（2026-11-21）。
  background: >-
    `llama-server` 常驻即服务。连续批处理默认开启。`-np/--parallel` 配多 slot，`--ctx-checkpoints` 保留上下文检查点。适合常开进程，托管队列由部署方自建（2026-11-21）。
  tools: >-
    工具面强。`--jinja` 开 OpenAI 风格 function calling 与 tool use。它含原生格式与通用回退，覆盖任意模型。

    实验性 `--mcp-servers-json` 接 Cursor 兼容 MCP server。`--agent` 开内置工具与 CORS 代理。

    另有 schema 约束 JSON、多模态、reranking 与监控端点（2026-11-21）。
  context: >-
    上下文按运行参数控制。`-c/--ctx-size` 设 prompt 窗口，`--kv-unified-per-slot` 给每个并行 slot 限额。

    `-ctk/-ctv` 可把 KV cache 压到 q8/q4 等类型，`--ctx-checkpoints` 最多留 32 个检查点（2026-11-21）。
  permissions: >-
    MIT 许可，本地进程无账号体系。`llama-server` 用 `--api-key` 或 `--api-key-file` 做 Bearer 鉴权。

    MCP/agent 默认关闭。开启时出于安全默认把 CORS 限到 localhost。官方明确提示勿在不可信环境启用（2026-11-21）。
  fit: >-
    适合要细粒度控制的人，包括量化档、后端、上下文与 KV cache。也适合消费级硬件跑 GGUF。

    还适合给下游工具做本地推理底座，在 server 层接 MCP 或工具调用。不适合要开箱 GUI。也不适合要多模型高吞吐服务化，后者 vLLM/SGLang 更强（2026-11-21）。

pitfalls:
  - 把 GGUF 支持面当「所有模型都有量化档」——量化档由第三方量化者产出，看 models 站索引
  - 只认命令行——llama-server 是官方 REST 服务线，很多工具在它上面跑
  - 用旧域名印象找官网——README 现推 llama.app 安装脚本（2026-10-21 直抓所见）

tags: [开源, MIT, GGUF, C++ , 本地推理, llama-server]
related: [openai-agents-sdk, llamaindex]

sources:
  - label: ggml-org/llama.cpp · 仓库（MIT；132,794★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/ggml-org/llama.cpp
    kind: repo
  - label: ggml-org/llama.cpp · Releases（changelog，含 nightly，2026-11-21 抓取 200）
    url: https://github.com/ggml-org/llama.cpp/releases
    kind: changelog
  - label: llama.app · 官方安装入口（API server 与工具调用，2026-11-21 抓取 200）
    url: https://llama.app/docs/api
    kind: docs
  - label: llama.cpp · server README（并行 slot、MCP/agent、api-key 与 KV cache 参数，2026-11-21 GitHub API 直取）
    url: https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md
    kind: docs
  - label: llama.cpp · Function Calling 文档（--jinja 与原生/通用工具格式，2026-11-21 GitHub API 直取）
    url: https://github.com/ggml-org/llama.cpp/blob/master/docs/function-calling.md
    kind: docs
  - label: llama.cpp · Build 文档（CPU/Metal/SYCL/CUDA/HIP/Vulkan 后端，2026-11-21 GitHub API 直取）
    url: https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: ggml-org（Georgi Gerganov 主导的开源组织）。
  origin_note_en: ggml-org (open-source org led by Georgi Gerganov).
  direct: yes
  direct_note: github.com/ggml-org/llama.cpp 与 llama.app 直连实测 200（2026-10-21）；llama.cpp 顶级域直抓 000（网络受限，非死亡判定）。
  direct_note_en: github.com/ggml-org/llama.cpp and llama.app measured 200 direct (2026-10-21); the llama.cpp apex domain measured 000 (network-limited, not a death verdict).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**llama.cpp 是整个本地推理生态的地基**：GGUF 格式由它定义，models 站的量化索引按它的口径建。Ollama/LM Studio/KoboldCpp 都在它上面盖楼。

MIT、纯 C/C++、llama-server 提供官方 REST 线。

## 适合与不适合

适合：要控制量化档、后端与每个参数的用户。也适合消费级 GPU 与 Apple 硅跑 GGUF，给自研工具做推理底座。
不适合要开箱 GUI。也不适合要多模型高并发服务化，那是 vLLM/SGLang 的调度强项。

## 实测记录

本档核对官方 server/function-calling/build 文档与仓库许可。吞吐、显存与 MCP 工具链稳定性需按具体硬件与模型实测。

## 未知项清单

- 支持模型全清单：官方按合入滚动，按仓库模型页核对。
- MCP 支持边界：`--mcp-servers-json` 为实验性，按 server README 当前参数核对。
- llama.app 与 GitHub 仓的官方关系：README 直连安装入口，归属按站点说明核对。
## 相关条目

- [Ollama](./ollama.md) — 在 llama.cpp 之上做开箱体验的一代；要底层控制回到本档案。
- [KoboldCpp](./koboldcpp.md) — 基于 llama.cpp 的单文件 GUI 路线。




