---
id: compare-local-runners
topic: planning
title: 本地跑模型：Ollama / LM Studio / llama.cpp / vLLM 怎么选
titleEn: Local runners: Ollama vs LM Studio vs llama.cpp vs vLLM
summary: 按硬件、量化格式、并发与服务化四面选 runtime；桌面图形、单机脚本、生产服务是三条不同路线。
summaryEn: Choose by hardware, quantization format, concurrency and serving needs; desktop GUI, single-machine scripting and production serving are three different routes.
sources:
  - label: Ollama · 官方站与文档（一条命令、OpenAI 兼容 API；工具 MIT，权重许可随模型；2026-10 快照）
    url: https://ollama.com
    kind: official
  - label: LM Studio · 官方站（MLX + llama.cpp 双运行时、内置本地服务器、应用闭源；2026-10 快照）
    url: https://lmstudio.ai
    kind: official
  - label: llama.cpp · 官方仓库（定义 GGUF、MIT、llama-server REST；2026-10 快照）
    url: https://github.com/ggml-org/llama.cpp
    kind: repo
  - label: vLLM · 官方文档（PagedAttention、OpenAI 兼容 server、Apache-2.0；2026-10 快照）
    url: https://docs.vllm.ai
    kind: docs
  - label: models.specul.com · 量化索引（129 量化仓 / 1,262 量化档 / 1,337 GGUF，2026-10-30 快照）
    url: https://models.specul.com/
    kind: dataset
last_verified: 2026-11-03
confidence: partial
---

## [先问三件事|Three questions first]

1. **你在什么硬件上跑**：Mac 统一内存、单张 NVIDIA、多卡服务器，路线不同。
2. **你要图形界面还是脚本**：桌面应用与 CLI / server 是两种使用方式。
3. **你要一个人用，还是多人并发**：并发一上来，桌面 runtime 就不够。

## [四行对照|Four runners]

| 维度 | Ollama | LM Studio | llama.cpp | vLLM |
|---|---|---|---|---|
| 形态 | CLI + 本地 server | 桌面图形应用 | C/C++ 库 + llama-server | Python 服务 |
| 量化 | GGUF 为主 | GGUF（llama.cpp）与 MLX | GGUF 定义者 | 以 Hugging Face 权重与自量化为主 |
| 硬件 | macOS / Linux / Windows | macOS / Windows / Linux | 几乎全平台，CPU 也能跑 | NVIDIA GPU 为主 |
| 并发 | 单机轻量 | 单机 | 单机 | 面向多并发服务 |
| 许可 | 工具 MIT；权重许可随模型 | 应用闭源；条款全文未直抓 | MIT | Apache-2.0 |
| 强项 | 一条命令拉起、OpenAI 兼容 | 图形下载与双运行时 | 生态地基、可控性最高 | PagedAttention、生产服务 |

## [逐个适用条件|When each fits]

**Ollama**：适合快速把开源模型跑起来、给本地应用接 OpenAI 兼容端点。能力边界：工具是 MIT，但权重许可跟着模型走，商用前要单独查模型许可。**什么情况下选另一个**：要图形界面与 MLX 加速，选 LM Studio。

**LM Studio**：适合不写代码、要在应用内下载并起本地服务器的人；MLX + llama.cpp 双运行时是它的差异点。能力边界：应用闭源，条款全文未能直抓，商用前要读官网条款。**什么情况下选另一个**：要脚本化与可嵌入，选 Ollama 或 llama.cpp。

**llama.cpp**：适合要最高可控性、CPU 也能跑、或要自己调量化与上下文的场景；GGUF 格式由它定义，models 站的量化索引按它的口径建。**什么情况下选另一个**：要图形化或一条命令，选 Ollama / LM Studio。

**vLLM**：适合要把模型做成多人并发服务的人；PagedAttention 管显存，OpenAI 兼容 server 直接对接现有客户端。能力边界：以 NVIDIA GPU 为主，不是单机开箱工具。**什么情况下选另一个**：只是本机自用，Ollama 足够。

## [量化档怎么选|Picking a quantization tier]

本站 models 站的快照（2026-10-30）是：**129 个量化仓、1,262 个量化档、1,337 个 GGUF 文件**。选档顺序：

1. 先按显存定档位（Q4 附近通常是吞吐与质量的平衡点，具体看模型）。
2. 再看量化者：同一个模型不同人做的档，质量差别很大。
3. 最后看文件：同档可能有多个 GGUF 文件，按 bpw 与体积核对。

不写「某档一定最好」；模型、任务与硬件三者一起决定。

## [核验事实|Dated facts]

1. llama.cpp 定义 GGUF，许可证 MIT，llama-server 提供官方 REST 端点（仓库，2026-10 快照）。
2. vLLM 使用 PagedAttention，提供 OpenAI 兼容 server，Apache-2.0（官方文档，2026-10 快照）。
3. LM Studio 应用内下载模型，MLX + llama.cpp 双运行时，内置本地服务器；应用闭源（官方站，2026-10 快照）。
4. Ollama 工具 MIT，但权重许可随模型；官方 README 另写有云端线（官方仓库，2026-10 快照）。
5. 本站量化索引为 129 仓 / 1,262 档 / 1,337 文件（models 站，2026-10-30 快照）。

## [常见误判|Common misreads]

- 把「工具开源」当成「模型可商用」：许可证是两份文件。
- 把「能跑」当成「跑得快」：显存、量化与并发三者一起决定吞吐。
- 把「桌面应用」当成「生产服务」：并发与稳定性不是同一目标。
- 把「GGUF 通用」当成「所有 runtime 都支持」：不同 runtime 的算子覆盖不同。
