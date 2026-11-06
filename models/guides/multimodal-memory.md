---
id: multimodal-memory
title: 多模态模型的显存账怎么算
titleEn: Counting memory for a multimodal model
summary: 把多模态的占用分成编码器、投影件与解码器缓存三笔账，写清每笔的来源、单位（GiB）与算法边界；KV 算式只管同层标准全注意力解码器，不能外推到编码器与 MLA、混合、滑动窗口。
summaryEn: Split multimodal occupancy into three bills — encoder, projector files and decoder cache — with the source, unit (GiB) and scope stated for each. The KV formula covers only a standard same-layer full-attention decoder; it does not extend to encoders or to MLA, hybrid and sliding-window designs.
sources:
  - label: llama.cpp · 多模态文档（libmtmd、--mmproj 与投影件默认 GPU 卸载说明，2026-11-06 直抓）
    url: https://raw.githubusercontent.com/ggml-org/llama.cpp/master/docs/multimodal.md
    kind: docs
  - label: llama.cpp · quantize 工具文档（多模态编码器与投影件需单独转换与量化，2026-11-06 直抓）
    url: https://raw.githubusercontent.com/ggml-org/llama.cpp/master/tools/quantize/README.md
    kind: docs
  - label: vLLM · 内存控制文档（limit_mm_per_prompt 与按 GiB 配置缓存空间，2026-11-06 直抓）
    url: https://docs.vllm.ai/en/latest/configuration/conserving_memory/
    kind: docs
  - label: vLLM · PagedAttention 设计文档（按块存放每头固定 token 数的缓存，2026-11-06 直抓）
    url: https://docs.vllm.ai/en/latest/design/paged_attention.html
    kind: docs
  - label: NVIDIA GeForce RTX 4090 官方规格页（显存容量口径，2026-11-06 直抓）
    url: https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/
    kind: docs
last_verified: 2026-11-06
confidence: partial
---

## [这一篇算的是三笔账|This guide counts three bills]

多模态的显存账是三笔账的合计，不是一个数字。

三笔是：视觉或音频编码器的占用、投影件与接入层的占用、解码器侧的权重与缓存。

本站不跑模型、不读硬件，也不给某个多模态模型的占用结论。页面能给的只有分法、单位和边界。

## [先把三笔账分开列|List the three bills separately]

只问「要多大显存」问不出答案，先按层拆开，每笔单独记来源。

- 文本权重：解码器主干驻留的体积。它是驻留估计，不等于下载文件字节数。
- 编码器与投影件：图像、音频通路自己的权重，运行器把它们作为单独文件加载。
- 运行时与临时张量：预处理、批调度、CUDA Graph 一类开销，官方未列明时留空。
- 解码器缓存：图像变成 token 进入上下文之后才产生的那一笔 KV。

三笔里任何一笔用错单位，合计就没有意义。本页一律按 GiB 记账，十进制 GB 先换算。

## [编码器与投影件是独立一层|The encoder and projector are their own layer]

多模态不是一句「模型支持图片」，它有自己的文件与开关。

- 运行器侧要同时给出文本文件与投影件：官方文档写的是 `-m model.gguf` 配 `--mmproj file.gguf`，各指一端。出处见 [docs/multimodal.md](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/docs/multimodal.md)。
- 投影件默认卸载到 GPU，官方文档给了关掉它的开关 `--no-mmproj-offload`。这直接影响它算在显存还是内存里。
- 投影件不止投影：官方 quantize 文档说明这个文件里可能包含视觉或音频编码器等多个部件。
- 转换与量化要分别做：官方文档写明支持图像或音频输入的模型，其编码器与投影件需要单独转换和量化。
- OCR 一类模型对提示与输入结构有自己要求，官方文档提醒按模型说明处理，不能只按聊天用法喂图。

官方 quantize 文档另有一句精度口径：这些部件通常用较高精度保存。用更小的量化档，对速度与内存影响不明显，但可能影响整体质量。它是官方口径，不是本站实测。

## [一张图值多少 token：先问官方配置|How many tokens an image costs: read the configuration]

图像进入解码器时变成多少 token，由模型与它的预处理决定。这不是能从体积推出来的数。

- 该数值要从官方模型配置、预处理说明或运行器文档取。三处都取不到时，本站写官方未说明，不用张数猜测。
- 同一模型换分辨率、换缩放策略，token 数会变，缓存那一笔跟着变。
- 每次请求能带几个图像或几段视频，是可以限制的设置项。vLLM 的内存控制文档给了 `limit_mm_per_prompt` 这类参数，见 [conserving_memory](https://docs.vllm.ai/en/latest/configuration/conserving_memory/)。
- 官方文档也提醒某些模型需要更大的上下文窗口，例如把上下文设到 8192 的示例。上下文变大主要是缓存那一笔在涨。

## [进解码器之后才轮到 KV 算式|The KV formula only applies after tokens reach the decoder]

解码器缓存的标准算法是 2 × L × Hkv × D × B × C × N。字节结果除以 1,073,741,824 才是 GiB。

它成立的口径很窄。

适用对象是标准全注意力 MHA / GQA 解码器。前提还有两条：每层保留完整键值，各层结构相同。

MLA、混合状态空间、滑动窗口与逐层缓存不同的架构都不适用。编码器侧根本不产生这种缓存。

- C 要按「提示 token 加图像转出的 token 再加已生成内容」计，不是只算文字长度。
- N 假设各请求长度相同、缓存互不共享；分页复用与共享前缀会改变口径。
- vLLM 的 PagedAttention 设计文档描述的是按块存放每头固定 token 数的缓存，见 [paged_attention](https://docs.vllm.ai/en/latest/design/paged_attention.html)。
- 缓存精度是独立设置项，官方把缓存空间以 GiB 配置的例子见同一份内存控制文档。

字段与算式在容量工作台上逐项填写：[上下文与并发预算](https://models.specul.com/guides/gpu-cost-math.html#capacity-workbench)。

## [虚构练习：一次图像输入的预算|A fictional exercise: budgeting one image input]

本节数字全是虚构教学假设，不对应任何真实模型、官方页或本站运行结果。

设文本权重按 5 GiB 计，编码器与投影件合计按 1.5 GiB 计。运行时与预留按 1 GiB 计。

再假设每张图转 256 token，一次请求带 2 张图。提示与生成内容合计 1,500 token，因此 C 按 2,010 计。并发 N 取 1。

按同层标准全注意力 MHA / GQA、L 32、Hkv 8、D 128、B 为 2 字节练习：KV 约 0.2 GiB，合计约 7.7 GiB。

- 若架构确认不了（MLA、混合或滑动窗口），这条算式作废，只能回官方方法另算。
- 若任务可用内存按 8 GiB 计，假设下留 0.3 GiB 余量。这个数字不承诺跑得起来，也不承诺图像理解的质量。
- 想缩短结果，可减图像数量、降上下文长度或改并发，每一项都会改变上面那笔缓存。

## [核对与排查入口|Check and troubleshooting entry points]

- 载入失败先查运行器是否支持该架构与投影件组合，按症状进入 [故障库](https://tools.specul.com/mcp/guides/failure-library.html#files)。
- 占用超限的排查入口是 [容量不足排查](https://tools.specul.com/mcp/guides/failure-library.html#memory)，先确认单位与假设再改设置。
- 结果判定走 [20 项自测清单](https://tools.specul.com/mcp/guides/selftest-20.html)，图像任务要写清可核对的字段。
- 任务接口层面的差别（OCR、语音、嵌入、重排）见本站「任务模型」专题，那边不给解码器 KV 公式套编码器。
- 要按任务记录费用构成时用 [成本计算器](https://tools.specul.com/mcp/guides/cost-calculator.html)，本站不保存单价，也不预测某台机器的产出。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [多模态](https://learn.specul.com/term/%E5%A4%9A%E6%A8%A1%E6%80%81/)、[编码器与解码器](https://learn.specul.com/term/%E7%BC%96%E7%A0%81%E5%99%A8%E4%B8%8E%E8%A7%A3%E7%A0%81%E5%99%A8/) 与 [显存](https://learn.specul.com/term/%E6%98%BE%E5%AD%98/) 是给使用者的一页科普。

这一篇把占用拆成三笔账，并写明每笔的来源与算式适用范围。

同一个概念在两处深度不同，互链不重复。带宽与成本构成见「GPU 事实与成本数学」。
