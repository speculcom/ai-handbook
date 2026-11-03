---
id: lemonade
form: local-app
name: Lemonade
nameEn: Lemonade
vendor: AMD / Lemonade 社区
homepage: https://lemonade-server.ai/
license: 以官方仓库 LICENSE 为准（本站未逐条核验）；AMD Ryzen AI 组件另有许可。
licenseEn: Follow the official repository LICENSE (not verified line by line here); AMD Ryzen AI components have separate terms.

axes:
  model_access: >-
    本地模型服务器：从 Hugging Face 拉取模型并在本机运行；支持 llama.cpp 后端，
    AMD Ryzen AI MAX+ 上另有实验性 vLLM ROCm 后端（官方 FAQ）。
  runtime: >-
    本地常驻服务：Windows 安装器或完整 SDK；提供 OpenAI 兼容 API，
    也可与 Ryzen AI 工具链配合。
  local_files: >-
    模型与数据在本地；不依赖云端账号，适合离线/隐私场景，
    模型缓存目录与更新由本地服务管理。
  background: >-
    常驻服务形态，可被其他应用调用；没有「关机后续跑」的官方声明，
    长任务的重试与恢复由调用方负责。
  tools: >-
    以推理服务为主：暴露 OpenAI 兼容端点，适合被其他应用调用；工具调用与 MCP 未逐条核验，
    复杂编排需要外层框架（如 agent SDK 或工作流平台）。
  context: >-
    长上下文按模型与显存/内存配置；具体限制以官方 FAQ 为准，本站未逐条测量各模型的上下文上限，
    KV cache 由 llama.cpp 或实验性 vLLM 后端决定。
  permissions: >-
    本地进程无账号体系；权限由宿主环境与调用方决定，多用户隔离需要自己加一层服务包装与鉴权。
  fit: >-
    适合：AMD Ryzen AI / NPU 用户、想要本地 OpenAI 兼容端点、离线或隐私场景。
    不适合：NVIDIA 独占优化、想要开箱 GUI 聊天（看 LM Studio 等）。

pitfalls:
  - 把 Lemonade 当成 Windows 专属——官方也有 SDK 与 Linux 后端，但硬件支持有矩阵
  - 以为所有模型都能 NPU 加速——NPU 支持按型号与模型而定
  - 把实验性 vLLM ROCm 当稳定后端——官方自己标注 experimental

tags: [开源, AMD, NPU, 本地推理, OpenAI兼容]
related: [openvino, docker-model-runner, openhands]

sources:
  - label: Lemonade · 官方 FAQ（后端与硬件支持；2026-11-03 复核官方页）
    url: https://lemonade-server.ai/docs/guide/faq/
    kind: docs
  - label: Lemonade · vLLM ROCm 公告（实验性后端）
    url: https://lemonade-server.ai/news/vllm-rocm.html
    kind: docs
  - label: AMD Ryzen AI · Lemonade Server 文档
    url: https://ryzenai.docs.amd.com/en/latest/llm/server_interface.html
    kind: docs

  - label: Lemonade · GitHub Releases（官方 changelog）
    url: https://github.com/lemonade-sdk/lemonade/releases
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: AMD 生态 / Lemonade 社区（美国）。
  origin_note_en: AMD ecosystem / Lemonade community (US).
  direct: yes
  direct_note: lemonade-server.ai 大陆直连未核验；GitHub/安装包可经镜像获取。
  direct_note_en: Direct reachability from mainland not verified; GitHub and installers are available through mirrors.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；开源工具未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the open-source tool does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

Lemonade 是 AMD 生态的本地模型服务器：在本机跑模型，提供 OpenAI 兼容 API，
支持 llama.cpp 后端，Ryzen AI MAX+ 上另有实验性 vLLM ROCm 后端。

跨大类对照：[OpenHands](../framework/openhands.html)。

## 适合与不适合

适合：AMD Ryzen AI / NPU 用户、想要本地 OpenAI 兼容端点、离线或隐私场景。
不适合：NVIDIA 独占优化、想要开箱 GUI 聊天。

## 实测记录

本档未跑吞吐与显存实测；结论只覆盖运行时能力与许可。

## 未知项清单

- 各 Ryzen 型号的 NPU/GPU 加速矩阵
- 工具调用与 MCP 支持状态
- 实验性 vLLM ROCm 后端的稳定边界

## 相关条目

- [OpenVINO](./openvino.md) — Intel 侧本地推理，与 AMD 路线对照
- [Docker Model Runner](./docker-model-runner.md) — 用容器运行本地模型的另一条路线
