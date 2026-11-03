---
id: openvino
form: cli
name: OpenVINO
nameEn: OpenVINO
vendor: Intel
homepage: https://docs.openvino.ai/
license: Apache-2.0（以仓库 LICENSE 为准；Intel 发行版条款另读）。
licenseEn: Apache-2.0 (follow the repository LICENSE; Intel distribution terms are separate).

axes:
  model_access: >-
    把模型转换成 OpenVINO IR 后推理；支持 CPU、GPU、NPU 等 Intel 硬件。
    支持模型与算子清单以官方文档为准，本站未逐条清点。
  runtime: >-
    Runtime 库 + Model Server（OVMS）：OVMS 可暴露 OpenAI 兼容接口，
    也可用 Docker 部署；本地/边缘/服务器都能跑。
  local_files: >-
    自托管，模型与 IR 文件在本地；不依赖云端账号，转换与缓存目录由部署方管理，
    模型分发也由部署方负责。
  background: >-
    Runtime 是库，OVMS 是常驻服务；长任务与并发由部署方编排。
  tools: >-
    OVMS 提供 OpenAI 兼容端点；工具调用与 MCP 支持未逐条核验。
  context: >-
    长上下文按模型与内存配置；KV cache 与连续批处理在官方文档线。
  permissions: >-
    本地/自托管，无账号体系；鉴权、配额与多租户隔离都由部署方在 OVMS 外层配置，
    官方不提供内置租户模型。
  fit: >-
    适合：Intel CPU/GPU/NPU、边缘部署、要把模型压到本地运行。
    不适合：NVIDIA 独占优化场景（TensorRT-LLM/vLLM 更直接）；想要 GGUF 即下即跑。

pitfalls:
  - 把 OpenVINO 当成只支持 Intel CPU——官方也覆盖 GPU/NPU，但型号有矩阵
  - 以为模型拿来就能跑——通常要先转 IR
  - 把 OVMS 当成完整 agent 平台——它只是推理服务层

tags: [开源, Intel, 边缘推理, OVMS, 本地部署]
related: [lemonade, docker-model-runner, dify]

sources:
  - label: OpenVINO · 官方文档（Runtime / 推理流水线）
    url: https://docs.openvino.ai/
    kind: docs
  - label: OpenVINO · Model Server 文档（OVMS / OpenAI 兼容端点）
    url: https://docs.openvino.ai/2026/model-server/ovms_docs_quick_start_guide.html
    kind: docs
  - label: OpenVINO · GitHub 仓库
    url: https://github.com/openvinotoolkit/openvino
    kind: repo

  - label: OpenVINO · Releases（官方 changelog）
    url: https://github.com/openvinotoolkit/openvino/releases
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Intel（美国）。
  origin_note_en: Intel (US).
  direct: yes
  direct_note: docs.openvino.ai 大陆直连未核验；GitHub/PyPI 可经镜像获取。
  direct_note_en: Direct reachability from mainland not verified; GitHub/PyPI are available through mirrors.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；开源工具未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the open-source tool does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

OpenVINO 是 Intel 的推理运行时与模型服务器：先把模型转成 IR，再在 CPU/GPU/NPU 上跑；
OVMS 可暴露 OpenAI 兼容端点。

跨大类对照：[Dify](../automation/dify.html)。

## 适合与不适合

适合：Intel CPU/GPU/NPU、边缘部署、要把模型压到本地运行。
不适合：NVIDIA 独占优化场景、想要 GGUF 即下即跑。

## 实测记录

本档未跑吞吐与显存实测；结论只覆盖运行时能力与许可。

## 未知项清单

- 当前支持的模型与算子清单（未逐条清点）
- OVMS 工具调用与 MCP 支持状态
- 各硬件型号的加速矩阵

## 相关条目

- [Lemonade](./lemonade.md) — AMD 侧的本地推理服务器，与 Intel 路线对照
- [Docker Model Runner](./docker-model-runner.md) — 用容器分发与运行模型的另一条路线
