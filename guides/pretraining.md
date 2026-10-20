---
id: pretraining
title: 预训练：模型怎么做到「什么都知道一点」
titleEn: Pre-training: how a model comes to know a bit of everything
summary: 预训练在优化什么、数据怎么攒到几万亿 token、算力与数据怎么配比、缩放律改过几次口径。从业者视角的深版；使用者视角的一页科普在学 AI 站，两站互链不重复。
summaryEn: What pre-training optimises, how corpora reach trillions of tokens, how compute and data are budgeted, and how the scaling-law story changed. The practitioner-depth version; the one-page explainer lives on the Learn site — cross-linked, not duplicated.
sources:
  - label: GPT-3 论文（arXiv 2005.14165，自回归目标与 3000 亿参数规模，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2005.14165
    kind: paper
  - label: Kaplan 缩放律论文（arXiv 2001.08361，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2001.08361
    kind: paper
  - label: Chinchilla 论文（arXiv 2203.15556，「每参数约 20 token」的算力最优结论，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2203.15556
    kind: paper
  - label: LLaMA 论文（arXiv 2302.13971，用公开数据训 7B–65B 的路线，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2302.13971
    kind: paper
  - label: LLaMA 2 论文（arXiv 2307.09288，7T/2T token 训练量与上下文扩展，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2307.09288
    kind: paper
  - label: Llama 3 官方模型卡（15T token、128K 上下文的官方口径，2026-10-20 直抓 200）
    url: https://huggingface.co/meta-llama/Llama-3.1-8B
    kind: model-card
  - label: C4 语料说明（T5 论文 arXiv 1910.10683 附录，网页语料的清洗规则，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/1910.10683
    kind: paper
  - label: FineWeb 技术报告（arXiv 2406.17557，Hugging Face 官方复现的 15T token 开放语料，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2406.17557
    kind: paper
  - label: DCLM 技术报告（arXiv 2406.11746，普林斯顿官方：数据筛选比规模更关键的实验系列，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2406.11746
    kind: paper
  - label: BPE 分词论文（arXiv 1508.07909，子词切分的原始方法，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/1508.07909
    kind: paper
  - label: OpenAI tiktoken 官方仓库（o200k_base 词表的官方实现与说明，2026-10-20 直抓 200）
    url: https://github.com/openai/tiktoken
    kind: docs
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**预训练就是让模型在海量文本上学会续写。**
学 AI 站有一页科普讲「它是什么」；这一篇讲从业者要做的决定：
语料怎么攒、算力怎么配、训练量怎么定、词表怎么切。

关键事实都有公开的论文或官方模型卡做出处，
出处列在文末；本站只转述与对照，不实测。

## [目标函数：预测下一个词|The objective: next-token prediction]

主流大模型的目标单一到乏味：给定前文，预测下一个 token 的概率分布。

GPT-3 论文（arXiv 2005.14165）把这条路线推到 1750 亿参数，
证明规模够大之后不用专门教，能力会自己长出来。
BERT 那条「完形填空」路线（双向掩码）在生成任务上输了。
此后开放权重家族几乎全是自回归解码器结构。

从业者视角的推论：模型「知道」的东西，全是续写统计的副产品。
它没有为任何任务专门学过。这解释了它为什么通用，
也解释了它为什么会一本正经地编。

## [数据：规模、清洗、去重|Data: scale, cleaning, deduplication]

网页语料（Common Crawl）是脏的：重复、垃圾页、机器生成文本混在里面。
T5 论文的 C4 附录给出了一套被广泛沿用的清洗规则：
去重、过滤低质量行、按语言筛。

LLaMA 论文明确说只用公开可得数据训练，把「数据配方」本身当成贡献。

清洗比规模更关键这件事，有官方对照实验。
普林斯顿的 DCLM 报告（arXiv 2406.11746）用同一套训练预算只换数据筛选方法，
模型表现差距巨大——多喂不如喂对。

Hugging Face 的 FineWeb（arXiv 2406.17557）把这套清洗做成 15T token 的开放语料，
每步清洗的消融都公开，可以直接复现。

去重是硬功夫：同一篇网文在 Common Crawl 里可能出现几十次。
重复数据不仅浪费算力，还会让模型把训练文本原样背下来。
这是评测污染的一大来源。

## [算力与数据怎么配：缩放律改过一次口径|Budgeting compute and data: the scaling-law plot twist]

2020 年 Kaplan 等人（arXiv 2001.08361）给出第一版缩放律：
损失随参数量、数据量、算力平滑下降，参数优先——钱该花在更大的模型上。

2022 年 Chinchilla（arXiv 2203.15556）用更细的实验推翻了这个配比：
算力固定时，参数和数据要一起长，最优大约是每参数 20 个 token。
按旧口径训的大模型，很多是「喂少了」的。

这个结论直接改了开放权重的路线。
LLaMA 系列（7B 喂 1.0T、70B 喂 1.4T token）走的就是「小模型 + 超量数据」。
Llama 3.1 官方模型卡写明 15T token——按 Chinchilla 口径这是远超最优的「过训练」。

为什么明知「过训练」还要过训练？因为缩放律优化的是训练成本，
而模型要反复推理。小模型多喂数据，训练稍贵、推理便宜得多。
开放权重模型要跑在千万用户的显卡上，这个账必须这么算。

## [训练过程：学习率与长上下文扩展|The run: learning rate and context extension]

一次预训练不是一根直线。学习率先升后降（常用余弦退火），
末期常在高质量数据上「退火」收尾。各家具体配方多数不公开，
本站只写官方公开过的部分，没公开的就不写。

上下文长度是训练后再拉长的，这是常见做法。
LLaMA 2 论文写明用位置插值把 4K 扩到 32K；Llama 3.1 官方模型卡标 128K。
拉长靠改 RoPE 位置编码的频率基数等手法。

代价要如实说：「训练时见过的长度」和「标称长度」能力不等。
标 128K 不等于 128K 处还能准确找针，评测要自己按长度分档看。

## [词表：tokenization 怎么定|The vocabulary: how tokenization is set]

模型看到的不是字，是 token。主流切法是 BPE（arXiv 1508.07909）：
从字符起步，把最常共现的片段逐步合并成子词。

词表大小是个权衡：表大，中文这类非英语文本更省 token；
表小，切得碎、序列变长。
Llama 用 128K 词表（官方模型卡），OpenAI 的 o200k_base 到 20 万（tiktoken 官方仓库）。

同一句话在不同词表下 token 数能差几倍。
比较「上下文长度」「单价」之前，先确认词表口径，不然数字没有可比性。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [预训练](https://learn.specul.com/term/预训练/) 与
[训练三阶段](https://learn.specul.com/term/训练三阶段/) 是使用者视角的一页科普；
这一篇是从业者视角的深版：讲决定、讲代价、讲口径变化。

同一个词在两处深度不同，互链不重复。
数据与算力的成本量级、开源训练栈见本站「数据与算力」篇（S56）。
