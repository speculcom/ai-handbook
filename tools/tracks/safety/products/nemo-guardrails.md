---
id: nemo-guardrails
form: local-app
name: NeMo Guardrails
nameEn: NeMo Guardrails
vendor: NVIDIA
homepage: https://docs.nvidia.com/nemo/guardrails/
license: Apache-2.0（PyPI 项目页与 GitHub 仓库页 2026-11-06 直抓在册）；开源工具本体，
  不含对用户内容的使用限制条款——内容归属由你接的模型端点条款决定。
licenseEn: Apache-2.0 (on the PyPI project page and the GitHub repository page, direct-fetched 2026-11-06);
  the open-source toolkit itself puts no claim on your content — content terms follow whichever model endpoint you configure.

axes:
  model_access: >-
    守的是你应用里接的那个模型，模型本身不由它提供。官方 Supported LLMs 页在册：NVIDIA NIM、
    OpenAI、Azure、Anthropic、Hugging Face、Ollama、LangChain，可同机服务也可远端端点。
    护栏判定可用应用模型自检（LLM self-checking）、NemoGuard / Nemotron 专用安全模型，
    也可挂第三方（目录在册 LlamaGuard、ActiveFence、Cisco AI Defense 等）。
  runtime: >-
    开源 Python 库，官方 About 页在册两种交付：PyPI 包与容器镜像。装在你自己的进程或容器里跑，
    installation 页在册 pip 安装、Python 3.10–3.13、uv 起 server、Docker 可用。
    检测逻辑在本地引擎执行，模型调用按你配置的端点出去。
  local_files: >-
    配置目录（config.yml + flows / actions）在你本机文件系统，CLI 与 server 直接读该目录。
    官方页未声明它读写你的工作区业务文件；评测用公开数据集（evaluate 页在册 chit-chat、MSMARCO）。
    更大范围的本地文件面本次未逐条核验，记为未知。
  background: >-
    没有托管侧的「关机后续跑」任务面：它是随你的应用一起起来的库或服务进程。
    官方 CLI 页在册 chat / server / convert / find_providers 等子命令，
    evaluate 页在册离线批跑评测；异步队列与断点续跑不在产品口径里。
  tools: >-
    五类 rail 在册：input / dialog / retrieval / execution / output，execution rail 管工具调用，
    自定义 action 可挂自己的校验函数。LangChain / LangGraph 走 passthrough mode 集成。
    config.yml 顶层键（models / instructions / rails / prompts / knowledge_base / tracing）
    未见 MCP server 配置项，MCP 接入方式记为未知。
  context: >-
    会话消息由调用方带入，rail 在处理 user / assistant 消息时逐条判定；
    retrieval rail 可读 knowledge_base 做检索过滤。跨会话记忆与持久化策略本次未核验到官方声明，
    记为未知；上下文长度实际上限由你所选模型决定。
  permissions: >-
    数据流向取决于你选的端点：本地 / 自托管端点内容不出你的环境；
    catalog 页在册第三方 guardrail 服务会把送检内容交给该方。许可证 Apache-2.0（当日在册）。
    观测面有 logging / tracing 专页在册。合规认证（SOC 2 / ISO 等）与训练用途承诺本次未核验，记为未知。
  fit: >-
    适合：要在自己的进程或容器里加可编程护栏——话题控制、PII、越狱检测、工具调用管控，
    并且要能换模型与端点。不适合：只想要一个托管控制台带审核工作流、要把评测平台当主轴、
    或不能接受「护栏质量取决于所选模型」这件事。

pitfalls:
  - 把它当托管安全服务：本体是本地库 / 容器，数据流向由你配的端点决定
  - 以为工具调用自动被拦：官方工具集成页写明 tool 消息绕过 input 校验，建议补 output rail
  - 把 catalog 里的第三方 rail 当免费内置能力：接第三方即把送检内容送出你的环境

tags: [本地, 开源, guardrails, 多后端, 自托管, API]
related: [azure-ai-content-safety, bedrock-guardrails, litellm]

sources:
  - label: NeMo Guardrails · Docs Overview（开源 Python 库定位与导航，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/
    kind: docs
  - label: NeMo Guardrails · About the library（两种交付形态与防护对象，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/latest/about-nemo-guardrails-library/overview.md
    kind: docs
  - label: NeMo Guardrails · Supported LLMs（provider 清单与本地/远端端点表述，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/latest/about-nemo-guardrails-library/supported-llms.md
    kind: docs
  - label: NeMo Guardrails · Guardrail Types（五类 rail 各自职责，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/rail-types
    kind: docs
  - label: NeMo Guardrails · Installation guide（pip / Python 版本 / server / Docker，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/get-started/installation-guide
    kind: docs
  - label: NeMo Guardrails · CLI（子命令清单，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/latest/guardrails-python-sdk/nemoguardrails/cli.md
    kind: docs
  - label: NeMo Guardrails · Guardrail catalog（内容安全 / 越狱 / PII / 工具调用等家族，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/latest/configure-guardrails/guardrail-catalog.md
    kind: docs
  - label: NeMo Guardrails · Content safety rails（本地 Nemotron 与第三方 API 之分，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/latest/configure-guardrails/guardrail-catalog/content-safety.md
    kind: docs
  - label: NeMo Guardrails · Tools integration（passthrough mode 与 tool 消息校验边界，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/integration-with-third-party-libraries/tools-integration
    kind: docs
  - label: NeMo Guardrails · config.yml schema（顶层键清单，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/latest/configure-guardrails/yaml-schema.md
    kind: docs
  - label: NeMo Guardrails · Evaluate guardrails（可离线批跑的评测面，2026-11-06 直抓 200）
    url: https://docs.nvidia.com/nemo/guardrails/latest/evaluation/evaluate-guardrails.md
    kind: docs
  - label: NeMo Guardrails · Releases（变更记录；v0.24.1 及各版要点，2026-11-06 直抓 200）
    url: https://github.com/NVIDIA/NeMo-Guardrails/releases
    kind: changelog
  - label: NeMo Guardrails · PyPI（版本 0.24.1 与 2026-09-16 发布日、Apache-2.0，2026-11-06 直抓 200）
    url: https://pypi.org/project/nemoguardrails/
    kind: changelog
  - label: NeMo Guardrails · 仓库（Apache 2.0、最新 release 与未归档状态，2026-11-06 直抓 200）
    url: https://github.com/NVIDIA/NeMo-Guardrails
    kind: repo

link:
  url: https://docs.nvidia.com/nemo/guardrails/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: NVIDIA 主体（文档站与仓库页当日在册）；未见面向中国大陆的本地化版本。
  origin_note_en: NVIDIA entity (on the docs site and repository page same day); no mainland-localised edition found.
  direct: yes
  direct_note: 同日实测 docs.nvidia.com 与 pypi.org 返回 200，github.com 返回 000（本机网络受限）；
    安装路由走 PyPI 可达，文档可达不等于任何合规承诺。
  direct_note_en: Same-day probes: docs.nvidia.com and pypi.org returned 200, github.com returned 000 (local network restriction);
    the install route via PyPI is reachable. Page reachability is not a compliance claim.
  filing: unknown
  filing_note: 官方文档与仓库页当日在册内容未写中国大陆备案/登记信息；本次未检索监管公示名单，不做推断。
  filing_note_en: Nothing on the mainland filing/registration appears in the official pages fetched same day;
    the regulator's public registry was not searched, so no inference is made.
  verified: 2026-11-06
---

## 一句话定位

它是本地跑的护栏库，不是托管的安全服务。

NVIDIA 把它写成「给 LLM 应用加可编程护栏的开源 Python 库」（About 页当日在册）：
rail 的类型、判定用的模型、数据往哪走，都由你 config.yml 里的选择决定。

## 适合与不适合

适合在自有进程或容器里加护栏的团队：话题控制、越狱检测、PII、工具调用管控都能写进 rail。
不适合想要托管控制台与审核工作流的人，也不适合把「护栏质量」当厂商承诺的团队——
判定用的是你选的模型，模型换了结论就跟着换。

## 能力边界

官方 catalog 页在册的家族是：内容安全、越狱防护、话题控制、PII 检测、agentic 安全与工具调用、
幻觉与自检、第三方 rail API。它拦的是消息与动作；「人工审核外包」与跨厂商模型打分
都不在官方口径里（本站观点，按在册页面范围判断）。
评测面（evaluate）在开源包内，用公开数据集跑 dialog / fact-checking / moderation / hallucination
四类指标——这是「你自己的 rail 配置有多准」，不是跨厂商的跑分。

## 变更记录说明

变更记录走 GitHub releases（无独立 changelog 页）。当日直抓在册的版本线：
v0.24.1（09-16）、v0.24.0（IORails 扩充内建 rail、F5 集成）、v0.23.0（Polygraf PII、HF 分类器）、
v0.22.0（与 LangChain 解耦、流式与 OpenTelemetry）、v0.21.0（IORails 并行引擎、OpenAI 兼容服务）。
最近一次官方发布距核验日约 51 天，故 lifecycle 记 maintenance，不记 active。

## 实测记录

本站尚未完成实测。本档只覆盖能力面与配置面，不含命中率、误拦率或延迟数字。

**实测建议**（三条）：

- 同一套 rail 在不同 provider 上的判定差异（本地端点 vs 第三方 API）
- tool 消息绕过 input 校验的实际后果，与补 output rail 的成本差
- 接第三方 guardrail 服务时的数据外送范围与留存条款

## 未知项清单

- MCP server 作为工具的接入方式：config.yml 顶层键未见对应配置项
- 跨会话记忆与 rail 状态的持久化策略
- 除配置目录外的本机文件读写面
- 合规认证与遥测/日志留存承诺
- 各 rail 在不同语言下的准确率（官方未公布，本站不测）

## 相关条目

- [Azure AI Content Safety](./azure-ai-content-safety.md) — 同为护栏，运行位置相反：那边检测在厂商侧，这里在你进程里。
- [Amazon Bedrock Guardrails](./bedrock-guardrails.md) — 策略面相似（内容/越狱/PII），差别在能不能换模型端点。
- [LiteLLM](./litellm.md) — 网关侧也能挂 rail；这里是应用内库，那里是入口治理。
