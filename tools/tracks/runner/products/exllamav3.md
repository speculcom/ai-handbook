---
id: exllamav3
form: cli
name: ExLlamaV3
nameEn: ExLlamaV3
vendor: turboderp-org
homepage: https://github.com/turboderp-org/exllamav3
license: 以仓库 LICENSE 为准（本站未逐条核验）；商用前读官方许可原文。
licenseEn: Follow the repository LICENSE (not verified line by line here); read the official licence before commercial use.

axes:
  model_access: >-
    EXL3 量化格式（.exl3 checkpoint）与部分 HF safetensors；模型支持以官方仓与文档为准，
    本站未逐条清点。它是 ExLlamaV2 的接续线。
  runtime: >-
    CUDA 推理引擎，面向本地/单机多卡；PyPI 包 exllamav3（1.4.8，2026-10-25 发布）。
    需要 CUDA 环境，具体版本以官方仓为准。
  local_files: >-
    自托管，权重与 .exl3 checkpoint 在本地；没有官方托管云。
  background: >-
    本地推理进程，不是常驻服务；要服务化通常接 TabbyAPI 等外层。
  tools: >-
    以推理执行为主；工具调用与 MCP 不在核心面，未逐条核验，
    需要这些能力时通常在外层应用里补。
  context: >-
    长上下文按显存与配置；KV cache 细节在官方文档线，未逐条核验。
  permissions: >-
    本地进程无账号体系；权限由运行环境决定，对外提供服务时需要自己加鉴权与访问控制。
  fit: >-
    适合：NVIDIA 单机/多卡、追 EXL3 量化与低延迟推理、愿意自己配 CUDA 环境。
    不适合：AMD/CPU、想要开箱 GUI、想要 GGUF 生态。

pitfalls:
  - 把 ExLlamaV3 当成 llama.cpp 的替代——它走 EXL3/CUDA 路线，不是 GGUF
  - 以为装了包就能跑——还需要 CUDA 与对应模型 checkpoint
  - 把 TabbyAPI 当成 ExLlama 本体——TabbyAPI 是外层 API server

tags: [开源, CUDA, EXL3, 本地推理]
related: [tabbyapi, llama-cpp, llamaindex]

sources:
  - label: turboderp-org · ExLlamaV3 官方仓库（README / docs；2026-11-03 复核官方页）
    url: https://github.com/turboderp-org/exllamav3
    kind: repo
  - label: PyPI · exllamav3（1.4.8，2026-10-25）
    url: https://pypi.org/project/exllamav3/
    kind: docs
  - label: ExLlamaV3 · convert 文档（EXL3 checkpoint 转换）
    url: https://github.com/turboderp-org/exllamav3/blob/master/doc/convert.md
    kind: docs

  - label: ExLlamaV3 · Releases（官方 changelog）
    url: https://github.com/turboderp-org/exllamav3/releases
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: turboderp-org（开源社区项目）。
  origin_note_en: turboderp-org (open-source community project).
  direct: yes
  direct_note: github.com 大陆直连不稳定；PyPI 可经镜像获取。
  direct_note_en: github.com direct access from mainland is unstable; PyPI is available through mirrors.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

ExLlamaV3 是 ExLlamaV2 的接续线：用 EXL3 量化格式在 NVIDIA GPU 上做低延迟本地推理。
它是引擎本体，不是 GGUF 工具，也不是 API server。

跨大类对照：[LlamaIndex](../framework/llamaindex.html)。

## 适合与不适合

适合：NVIDIA 单机/多卡、追 EXL3 量化、愿意自己配 CUDA 环境。
不适合：AMD/CPU、想要开箱 GUI、依赖 GGUF 生态。

## 实测记录

本档未跑吞吐与显存实测；结论只覆盖运行时能力与许可。

## 未知项清单

- 当前支持的模型架构清单（官方仓为准，未逐条清点）
- 各版本 CUDA 要求与显存下限
- 与 TabbyAPI 的兼容矩阵

## 相关条目

- [TabbyAPI](./tabbyapi.md) — ExLlama 的外层 API server，二者常一起用
- [llama.cpp](./llama-cpp.md) — GGUF 路线，与 EXL3/CUDA 路线对照
