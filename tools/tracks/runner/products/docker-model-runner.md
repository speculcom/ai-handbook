---
id: docker-model-runner
form: local-app
name: Docker Model Runner
nameEn: Docker Model Runner
vendor: Docker
homepage: https://docs.docker.com/ai/model-runner/
license: 以 Docker 官方条款与组件 LICENSE 为准（本站未逐条核验）。
licenseEn: Follow Docker's official terms and component LICENSE files (not verified line by line here).

axes:
  model_access: >-
    从 Docker Hub、任意 OCI 兼容 registry 或 Hugging Face 拉取模型并运行；
    支持 LLM 与其他 AI 模型，具体模型清单以官方文档为准。
  runtime: >-
    集成在 Docker Desktop 与 Docker Engine：本地拉起模型，
    通过 OpenAI 与 Ollama 兼容 API 提供服务（官方文档）。
  local_files: >-
    模型作为 OCI 工件存储与分发；提示与数据在本机处理，不需要 API key。
  background: >-
    常驻本地服务，可被 Docker 生态内的应用调用；没有「关机后续跑」的官方声明。
  tools: >-
    OpenAI/Ollama 兼容端点；Docker Agent 可自动发现已拉取模型。
    工具调用与 MCP 支持未逐条核验。
  context: >-
    长上下文按模型与内存配置；官方提供低内存、长文档等配置预设，
    单次请求的上下文上限由所选模型决定。
  permissions: >-
    本地 Docker 环境内运行；权限由 Docker 与宿主系统决定。
  fit: >-
    适合：已用 Docker 的团队、想把模型分发纳入容器流水线、要本地 OpenAI 兼容端点。
    不适合：不想装 Docker、要 GPU 极限优化、要成品聊天界面。

pitfalls:
  - 把 DMR 当成云端模型服务——它在本机跑，数据不出本机
  - 以为所有镜像都能直接跑模型——模型要按 DMR 的 OCI 工件格式分发
  - 忽略 Docker Desktop 许可——商用前读 Docker 条款

tags: [Docker, 本地推理, OCI, OpenAI兼容]
related: [openvino, lemonade, openai-agents-sdk]

sources:
  - label: Docker · Model Runner 官方文档（OCI/HF 拉取、OpenAI/Ollama 兼容 API；2026-11-03 复核官方页）
    url: https://docs.docker.com/ai/model-runner/
    kind: docs
  - label: Docker · Get started with DMR（启用、拉取、运行、发布）
    url: https://docs.docker.com/ai/model-runner/get-started/
    kind: docs
  - label: Docker · DMR configuration（配置预设）
    url: https://docs.docker.com/ai/model-runner/configuration/
    kind: docs
  - label: Docker · model-runner GitHub Releases（官方 changelog）
    url: https://github.com/docker/model-runner/releases
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Docker（美国）。
  origin_note_en: Docker (US).
  direct: yes
  direct_note: docs.docker.com 大陆直连未核验；Docker Hub 可经镜像获取。
  direct_note_en: Direct reachability from mainland not verified; Docker Hub is available through mirrors.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；开发工具未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the developer tool does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

Docker Model Runner 把模型当成 OCI 工件：从 Docker Hub、OCI registry 或 Hugging Face 拉取，
在本机通过 OpenAI/Ollama 兼容 API 提供服务。

跨大类对照：[OpenAI Agents SDK](../framework/openai-agents-sdk.html)。

## 适合与不适合

适合：已用 Docker 的团队、想把模型分发纳入容器流水线、要本地 OpenAI 兼容端点。
不适合：不想装 Docker、要 GPU 极限优化、要成品聊天界面。

## 实测记录

本档未跑吞吐与显存实测；结论只覆盖运行时能力与许可。

## 未知项清单

- 当前支持的模型格式与完整清单
- 工具调用与 MCP 支持状态
- GPU 加速在各平台的支持矩阵

## 相关条目

- [OpenVINO](./openvino.md) — Intel 侧推理运行时，可与容器化部署组合
- [Lemonade](./lemonade.md) — AMD 侧本地服务器，对照读
