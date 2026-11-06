---
id: quant-tier-precision
title: 量化档位与精度损失：能说什么、不能说什么
titleEn: Quantisation tiers and accuracy loss: what can be said, and what cannot
summary: 把档位名、每权重比特数与精度损失分成三层：哪些是发布页事实、哪些是本站按命名标准的推导、哪些必须留空；顺带写清换档后容量账里哪一笔会变。
summaryEn: Split tier names, bits per weight and accuracy loss into three layers: publishing-page facts, this site's derivation from the public naming standard, and what must stay blank. It also states which line in the memory bill actually moves when a tier changes.
sources:
  - label: llama.cpp · quantize 工具文档（精度损失通常以 ppl 或 KL 散度衡量、imatrix 与 requantize 说明，2026-11-06 直抓）
    url: https://raw.githubusercontent.com/ggml-org/llama.cpp/master/tools/quantize/README.md
    kind: docs
  - label: llama.cpp 官方 README（列出的整数位宽范围，2026-11-06 直抓）
    url: https://raw.githubusercontent.com/ggml-org/llama.cpp/master/README.md
    kind: docs
  - label: vLLM 量化文档（量化 KV 缓存单列为一项，2026-11-06 直抓）
    url: https://docs.vllm.ai/en/latest/features/quantization/
    kind: docs
  - label: vLLM · 内存控制文档（缓存空间以 GiB 配置，2026-11-06 直抓）
    url: https://docs.vllm.ai/en/latest/configuration/conserving_memory/
    kind: docs
  - label: QLoRA 论文摘要页（arXiv 2305.14314，自述 4-bit NormalFloat 数据类型，2026-11-06 直抓）
    url: https://arxiv.org/abs/2305.14314
    kind: paper
last_verified: 2026-11-06
confidence: partial
---

## [这一篇划的是说法边界|What this guide bounds]

量化档位名说的是权重怎么存，不是模型得了多少分。

这一篇只划一条线：哪些话有依据可以说，哪些话必须留空。

本站不下载权重、不跑评测，也不写「某档够用」这类建议。能给的是体积、命名口径和算式边界。

## [能说什么：三句有依据的话|What you can say: three supported statements]

这三句的证据来自发布页文件清单与公开的命名标准。

- 体积：某个量化文件的字节数写在发布页文件清单里，可以直接核对。
- 每权重比特数：由档名按公开命名标准推算，本站标为推导，不冒充实测。
- 档位覆盖：某家量化仓提供哪些档、是否带 importance matrix，同样是清单事实。

方法之间的差别，官方 quantize 文档只说体现在磁盘体积与推理速度上，数值绑定它自己的示例：[tools/quantize/README.md](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/tools/quantize/README.md)

## [不能说什么：四条边界|What you cannot say: four boundaries]

同一句结论换个模型就得重新取得，所以下面四类话本站不写。

- 不写「这一档质量够用」：够不够取决于任务与判定标准，不是档名。
- 不写「降一档快多少」：官方文档不给跨模型可复用的比例。
- 不写「某家量化更稳」：各家档位与实现细节不同，没有可比的公开口径。
- 不做跨档位排名，也不把档位与「适合谁」画等号。

需要速度或质量结论时，在自己的授权环境按固定任务记录；那是你的读数，不是本站的。

## [档位名说的是体积，不是质量|A tier name describes size, not quality]

档名描述的是权重的存储方式与大致体积。它不携带任何任务层面的质量含义。

同名档在不同模型上的真实比特数略有差异，这是本站把比特数标为推导的原因。

- 官方 README 列出的整数位宽覆盖 1.5、2、3、4、5、6、8 位，出处见 [llama.cpp README](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/README.md)。
- 官方 quantize 文档给了一张示例表，按档位列出 bits/weight 与体积（GiB）。表头写明它测的是某个具体 8B 模型，换个模型不会正好是同一串数。
- 微调路线里的 4-bit 也是数据类型选择：论文摘要自述 NF4 是对正态分布权重信息论上最优的 4-bit 类型，出处见 [arXiv 2305.14314](https://arxiv.org/abs/2305.14314)。它说的是训练时加载精度，和推理用的 GGUF 档名不是同一层。

本站的档位归属只按推算出的每权重比特数落档，规则写在数据规范里，任何人可以复算。

## [精度损失的说法从哪来|Where accuracy-loss statements come from]

官方 quantize 文档写明：量化可能引入精度损失。损失通常用困惑度（ppl）或 KL 散度（kld）衡量。官方文档说，合适的 importance matrix 数据可以减小它。

这句话里有三层可用信息，也到此为止。

- 指标是语言建模口径的代理量，不等于任何具体任务的表现。
- 官方给出的数值绑定它自己的模型、语料与设置，换模型不能照抄。
- 未公布这些数字时，本站只记录缺口，不用别的模型的数字补上。

「下降多少算能接受」取决于下游任务与验收标准。本站没有跑过评测，也不设默认阈值。

## [换了档位，容量账哪一笔会变|Which line of the memory bill moves with a tier]

档位改变的是权重那一笔。缓存不会自动跟着变小，除非运行器明确支持量化缓存。

vLLM 的量化文档把「量化 KV 缓存」单独列为一项，说明权重精度与缓存精度是两条设置：[features/quantization](https://docs.vllm.ai/en/latest/features/quantization/)。同一站点的内存控制文档把缓存空间按 GiB 配置，见 [conserving_memory](https://docs.vllm.ai/en/latest/configuration/conserving_memory/)。

填写与核对这两笔账的入口是容量工作台：[上下文与并发预算](https://models.specul.com/guides/gpu-cost-math.html#capacity-workbench)。

- 适用前提：各层结构相同、每层保留完整键值的标准全注意力 MHA / GQA 解码器。
- 不适用：MLA、混合状态空间、滑动窗口与逐层缓存不同的架构，需要另算。
- 单位：权重、缓存、运行时预留统一写成 GiB；十进制 GB 先换算再相加。
- 无法据此承诺：能否启动、是否超时、输出是否合格，都不在这条算式的范围内。

## [虚构练习：同一模型两个档位|A fictional exercise: two tiers of one model]

本节的数字全是虚构教学假设，不对应任何真实模型、发布页或本站运行结果。

设某密集模型的高精度权重按 30 GiB 计，练习假设换成 5 GiB 档。上下文与并发不变，缓存按 2 GiB、运行时预留按 1 GiB 计。

两种假设下的合计分别是 33 GiB 与 8 GiB。差值只说明权重那一笔的变化量。

再假设任务可用内存是 10 GiB。按这些假设，5 GiB 档留有 2 GiB 余量，30 GiB 档超出预算。这是练习算式，不是运行结果。

- 查不过去时的下一步不是换档重试，而是回查驻留假设、缓存字段与架构适用范围。
- 体积对照请回到本站系列页 B 区：它按发布体积 × 1.15 初筛候选，不判断优劣，也不保证能跑。

## [与本站系列页、学 AI 站的关系|How this fits the series pages and the Learn site]

系列页给的是「你的体积预算下有哪些文件」。这一篇给的是「关于这些文件你能说到哪一步」。

- 容量与缓存字段用工作台分开列：[上下文与并发预算](https://models.specul.com/guides/gpu-cost-math.html#capacity-workbench)。
- 费用构成用 [成本计算器](https://tools.specul.com/mcp/guides/cost-calculator.html) 记录，本站不保存单价。
- 结果判定先按 [20 项自测清单](https://tools.specul.com/mcp/guides/selftest-20.html) 写清条件，再决定要不要换档。

学 AI 站的 [量化](https://learn.specul.com/term/%E9%87%8F%E5%8C%96/)、[量化方法](https://learn.specul.com/term/%E9%87%8F%E5%8C%96%E6%96%B9%E6%B3%95/)、[bpw](https://learn.specul.com/term/bpw/) 与 [困惑度](https://learn.specul.com/term/%E5%9B%B0%E6%83%91%E5%BA%A6/) 是给使用者的一页科普。

这一篇给的是说法边界与容量口径。同一个概念在两处深度不同，互链不重复。
