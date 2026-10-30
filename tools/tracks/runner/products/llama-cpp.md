---
id: llama-cpp
form: cli
name: llama.cpp
vendor: ggml-org
homepage: https://github.com/ggml-org/llama.cpp
license: MIT（官方仓 README 徽章与 LICENSE 一致，2026-10-21 直抓核验）。
licenseEn: MIT (official repo README badge and LICENSE consistent, direct-fetched 2026-10-21).

axes:
  model_access: >-
    GGUF 格式的生态根——models 站量化索引就是按 llama.cpp 口径建的；safetensors 可转换；
    支持模型清单随合入滚动变化，未逐条清点。
  runtime: >-
    C/C++ 推理库 + llama-server（REST API）+ 各后端（CUDA/Metal/Vulkan/CPU 等，docs/build.md 口径）；
    官方安装入口已含 llama.app 脚本（README 直抓所见）。GitHub 132,794★（API 核验 2026-10-21）。
  local_files: >-
    全本地：模型文件、对话输出都在自有环境；未见官方云线——第三方云托管不算官方。
  background: >-
    llama-server 常驻即服务；并发/量化调度细节未逐条核验。
  tools: >-
    server 侧有 function calling 文档线；MCP 支持状态未核验到官方声明。
  context: >-
    上下文长度按运行参数配置（-c 等）；KV 缓存量化有官方文档（learn 站 KV 缓存词条 refs 回链先例）。
  permissions: >-
    本地进程无账号体系；llama-server 鉴权由部署方自配；未见云端权限面。
  fit: >-
    适合：要细粒度控制（量化档/后端/参数）、消费级硬件跑 GGUF、给下游工具做底座。
    不适合：要开箱 GUI（用 LM Studio/KoboldCpp）；要多模型高吞吐服务化（vLLM/SGLang）。

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
  - label: ggml-org/llama.cpp · Releases（changelog，含 nightly）
    url: https://github.com/ggml-org/llama.cpp/releases
    kind: changelog
  - label: llama.app · 官方安装入口（README 直抓所见）
    url: https://llama.app
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

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
  verified: 2026-10-21
---

## 一句话定位

**llama.cpp 是整个本地推理生态的地基**：GGUF 格式由它定义，models 站的量化索引按它的口径建，
Ollama/LM Studio/KoboldCpp 都在它上面盖楼。MIT、纯 C/C++、llama-server 提供官方 REST 线。

## 适合与不适合

适合：要控制量化档/后端/每个参数的用户、消费级 GPU 与 Apple 硅跑 GGUF、给自研工具做推理底座。
不适合：要开箱 GUI；要多模型高并发服务化（那是 vLLM/SGLang 的调度强项）。

## 实测记录

本站尚未完成实测。models 站 guides 的 `serving-deep-dive.md` 已核验过 llama.cpp 官方口径（与 vLLM/SGLang 对照），
档案的格式/量化维直接复用该快照出处。运行器专用实测协议本站未立。

## 未知项清单

- 支持模型全清单（随合入滚动，未逐条清点）
- MCP 支持状态（未核验到官方声明）
- llama.app 与 GitHub 仓的官方关系细节（README 直抓所见安装入口，站点归属未另核）

## 相关条目

- [Ollama](./ollama.md) — 在 llama.cpp 之上做开箱体验的一代；要底层控制回到本档案。
- [KoboldCpp](./koboldcpp.md) — 基于 llama.cpp 的单文件 GUI 路线。
