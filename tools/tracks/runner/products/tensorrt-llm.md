---
id: tensorrt-llm
form: cli
name: NVIDIA TensorRT-LLM
nameEn: NVIDIA TensorRT-LLM
vendor: NVIDIA
homepage: https://docs.nvidia.com/tensorrt-llm/
license: 以 NVIDIA 仓库 LICENSE 为准（本站未逐条核验）；商用前读官方许可与 NGC 条款。
licenseEn: Follow the LICENSE in NVIDIA's repository (not verified line by line here); read the official licence and NGC terms before commercial use.

axes:
  model_access: >-
    面向 NVIDIA GPU 的 LLM 推理工具包：Python API 定义模型，trtllm-serve 提供服务端点；
    支持模型清单以官方文档为准，本站未逐条清点。
  runtime: >-
    编译 + 服务化：把模型编译成 TensorRT 引擎，再通过 trtllm-serve 暴露 OpenAI 兼容接口；
    官方定位是数据中心/云端的大规模生产部署。
  local_files: >-
    自托管，权重与引擎在自有环境；NVIDIA GPU 限定，CPU/AMD 加速不在官方支持范围。
  background: >-
    常驻服务形态，适合批处理与高并发；没有「关机后续跑」的官方声明，
    任务队列与重试由部署方负责，进程退出后需重新加载引擎。
  tools: >-
    trtllm-serve 提供 API；工具调用与 MCP 支持状态未逐条核验。
  context: >-
    长上下文按模型与显存配置；KV cache 优化在官方文档线，细节未逐条核验。
  permissions: >-
    自托管无账号体系；鉴权、配额与多租户隔离由部署方自配，官方不提供内置租户模型，
    GPU 资源配额需外部调度。
  fit: >-
    适合：NVIDIA GPU 集群、要生产级吞吐与低延迟、已有容器/编译流水线。
    不适合：单机消费级显卡开箱、AMD/CPU 部署、想要 GGUF 即下即跑。

pitfalls:
  - 把 TensorRT-LLM 当成 llama.cpp 的替代——它需要编译引擎，部署链更重
  - 以为 AMD/CPU 也能跑——官方定位是 NVIDIA GPU
  - 把官方性能数字当本站实测——本站不跑吞吐基准

tags: [NVIDIA, 服务化推理, 编译引擎, 生产部署]
related: [vllm, sglang, langgraph]

sources:
  - label: NVIDIA · TensorRT-LLM 官方文档（Python API / trtllm-serve / 生产定位）
    url: https://docs.nvidia.com/tensorrt-llm/
    kind: docs
  - label: NVIDIA · TensorRT Product Family（LLM 推理工具包定位）
    url: https://docs.nvidia.com/tensorrt/index.html
    kind: docs
  - label: NVIDIA · TensorRT-LLM GitHub（代码与 release notes）
    url: https://github.com/NVIDIA/TensorRT-LLM
    kind: repo

  - label: TensorRT-LLM · Releases（官方 changelog）
    url: https://github.com/NVIDIA/TensorRT-LLM/releases
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: NVIDIA（美国）。
  origin_note_en: NVIDIA (US).
  direct: no
  direct_note: docs.nvidia.com 大陆直连未核验；NVIDIA 文档与 NGC 通常需网络环境。
  direct_note_en: Direct reachability from mainland not verified; NVIDIA docs and NGC usually need a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；开发工具未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the developer tool does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

TensorRT-LLM 是 NVIDIA 的生产级 LLM 推理栈：先把模型编译成 TensorRT 引擎，再用 trtllm-serve 提供 OpenAI 兼容端点。
它面向 NVIDIA GPU 集群，不是单机开箱工具。

跨大类对照：[LangGraph](../framework/langgraph.html)。

## 适合与不适合

适合：NVIDIA GPU 集群、要生产吞吐与低延迟、已有容器与编译流水线。
不适合：单卡消费级开箱、AMD/CPU 部署、想直接下 GGUF 就跑。

## 实测记录

本档未跑吞吐与显存实测；结论只覆盖运行时能力与许可。

## 未知项清单

- 当前支持模型清单（官方文档为准，未逐条清点）
- 工具调用与 MCP 支持状态
- 各版本编译时间与引擎体积

## 相关条目

- [vLLM](./vllm.md) — 同为服务化推理；vLLM 偏通用 GPU，TensorRT-LLM 偏 NVIDIA 编译优化
- [SGLang](./sglang.md) — 另一条高吞吐服务化路线，对照读
