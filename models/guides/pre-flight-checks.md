---
id: pre-flight-checks
title: 本地跑起来之前先确认的七件事
titleEn: Seven checks before a local run starts
summary: 从开机到第一次出字的七个核对点：可用容量、驻留体积、文件与运行器、缓存口径、许可、结果验收、日志落点。每件写清查什么、拿什么当证据、失败后下一步。
summaryEn: Seven checkpoints between power-on and the first token: available capacity, resident size, file and runner support, cache scope, licence, output acceptance and where logs go. Each states what to check, what counts as evidence and the next step on failure.
sources:
  - label: llama.cpp · 支持模型与下载方式文档（GGUF 是本地运行的格式前提，2026-11-06 直抓）
    url: https://raw.githubusercontent.com/ggml-org/llama.cpp/master/docs/models.md
    kind: docs
  - label: llama.cpp · 构建文档（编译器与 CUDA / Metal / Vulkan 后端开关，2026-11-06 直抓）
    url: https://raw.githubusercontent.com/ggml-org/llama.cpp/master/docs/build.md
    kind: docs
  - label: NVIDIA GeForce RTX 4090 官方规格页（显存容量口径，2026-11-06 直抓）
    url: https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/
    kind: docs
  - label: vLLM · 内存控制文档（缓存空间按 GiB 配置的示例，2026-11-06 直抓）
    url: https://docs.vllm.ai/en/latest/configuration/conserving_memory/
    kind: docs
last_verified: 2026-11-06
confidence: partial
---

## [七件事是核对清单|Seven checks, not an installer]

这七件事是本地跑的核对清单，不是安装教程。

清单是：可用容量、驻留体积、文件与运行器、缓存口径、许可、结果验收、日志落点。

顺序从「能不能装下」走到「结果算不算数」。某一条查不下去就先停，不要靠改配置碰运气。

本站不下载权重、不代跑模型，也不给某台机器能不能跑的结论。

## [逐条怎么查|How to check each one]

每条给三行内容：查什么、拿什么当证据、查不过去时下一步。证据一律回到官方页与本机读数。

- 可用容量：查当前任务真能用多少，不查设备标称总量。证据是系统占用与运行器分配。
- 驻留体积：查加载后实际占多少，不只看下载文件多大。证据是启动后的占用读数。
- 文件与运行器：查该架构、该任务、该版本有没有明确支持说明。缺说明就保留未知。
- 缓存口径：先确认架构是不是同层标准全注意力，再决定能不能套 KV 算式。
- 许可：查发布页给的许可标识与条款入口，本站不替读者判断某个用途。
- 结果验收：先写任务、输入、判定标准和失败处理，再跑第一次生成。
- 日志落点：查日志写到哪、谁有权限读、留多久，另见日志那一篇。

## [可用容量与驻留体积|Available capacity and resident size]

设备标称总量不等于任务可用量。驱动、系统界面、其他进程和运行器自己都在同一块内存里排队。

硬件规格页给的是型号口径，不是某个任务的可用读数。本站没有核对过任何具体机器。

十进制 GB 与 GiB 是两个单位。1 GiB 是 1,073,741,824 字节，同一条算式里不要混着写。

驻留体积是加载后的占用，不等于仓库文件体积。转换精度、张量布局和运行器分配都会改它。

- 查不过去时：先关掉同机的其他占用，再用短输入起一次，记录读数后才加上下文长度。

## [文件与运行器：格式存在不等于支持|The file and the runner: a format is not support]

本地跑的前提是运行器认得这个模型。格式要求、后端开关和支持清单都写在运行器文档里。

运行前提与下载方式见 llama.cpp 官方文档：[docs/models.md](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/docs/models.md)，后端编译开关见 [docs/build.md](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/docs/build.md)。

- 架构支持：查运行器有没有列出该架构，从哪个版本开始列。
- 任务接口：对话、嵌入、识别是不同入口，换个任务不等于换个文件。
- 多模态：图像与音频的接入件常是独立文件，缺它只会退回文字路径的行为。
- 版本差异：同一模型在不同运行器版本上的能力可能不同，未列出的保留未知。

## [缓存口径：公式只管同层全注意力|Cache scope: same-layer full attention only]

KV 缓存算式是 2 × L × Hkv × D × B × C × N。字节结果除以 1,073,741,824 才是 GiB。

它只在标准全注意力 MHA / GQA 解码器上成立。前提是各层结构相同，且每层都保留完整键值。

MLA、混合状态空间、滑动窗口和逐层结构不同的缓存都不在这个范围内，硬套会算错。

L、Hkv、D 从模型配置取，B 从运行器配置取。架构确认不了就选「未确认」，不要用参数量倒推。

字段与算式在容量工作台上逐项填写：[上下文与并发预算](https://models.specul.com/guides/gpu-cost-math.html#capacity-workbench)。

它给的是假设下的占用估计，不能据此承诺跑得起来、不超时，也不承诺输出质量。

## [许可与用途：以发布页为准|Licence and use: take the publishing page]

许可标识、条款入口和用途限制都写在发布页。本站逐条抄标识，不解读、不总结、不改写。

- 标识为非宽松类（`other`、`cc-by-*` 一类）时，先读条款再决定用途。
- 第三方量化仓通常注明继承基础模型的许可，产物本身的发布者另算。
- 官方未说明的用途问题保留未说明，不用社区说法补成一个答案。

## [结果验收与日志落点|Output acceptance and where logs go]

第一次生成之前先写下任务、输入、判定标准和失败处理。验收看预先写好的判定，不看单次观感。

结果检查从这几处进入：[本地运行完整流程](https://tools.specul.com/mcp/guides/playbook-local-model.html)、[20 项自测清单](https://tools.specul.com/mcp/guides/selftest-20.html)、[按症状排查](https://tools.specul.com/mcp/guides/failure-library.html#by-symptom)。

费用构成用这个入口记录：[成本计算器](https://tools.specul.com/mcp/guides/cost-calculator.html)。它算的是任务口径下的成本，不预测某台机器的表现。

日志落在哪、谁能读、留多久是另一件事，见「把日志留在本地到底意味着什么」。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [本地部署](https://learn.specul.com/term/%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2/)、[显存](https://learn.specul.com/term/%E6%98%BE%E5%AD%98/) 与 [GGUF](https://learn.specul.com/term/GGUF/) 是使用者视角的一页科普。

这一篇给的是开机前的核对顺序和每条的证据口径。同一个概念在两处深度不同，互链不重复。

容量与带宽的算法见「GPU 事实与成本数学」。多模态那笔账见「多模态模型的显存账怎么算」。
