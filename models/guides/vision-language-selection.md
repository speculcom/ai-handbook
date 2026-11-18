---
id: vision-language-selection
stage: 9
title: 视觉语言模型选型：分辨率、定位与读字
titleEn: Choosing a vision-language model: resolution, grounding and text reading
summary: VLM 的能力被三类任务拉开差距：描述、定位、读字。选型要按任务拆开测，并把图像 token 的成本算进去。
summaryEn: VLMs differ most across three task families: description, grounding and text reading. Selection should test them separately and include the cost of image tokens.
sources:
  - label: CLIP（arXiv 2103.00020，4 亿图文对对比学习与零样本迁移，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2103.00020
    kind: paper
  - label: LLaVA（arXiv 2304.08485，视觉编码器 + LLM 的端到端多模态模型，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2304.08485
    kind: paper
  - label: Qwen2-VL（arXiv 2409.12191，动态分辨率与 M-RoPE，2B/8B/72B 三档，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2409.12191
    kind: paper
last_verified: 2026-11-17
confidence: verified
---

## [先按任务拆|Split by task first]

把「看图」拆成五类：描述、信息抽取、计数、定位坐标、读小字。
VLM 通常在描述与抽取上表现好，在计数、精确定位和小字读取上明显弱。
如果业务主要是票据与表单读字，OCR 加文本模型往往比纯 VLM 更稳、更便宜。

## [分辨率就是信息量|Resolution is information]

Qwen2-VL 用动态分辨率把不同尺寸的图片映射成不同数量的视觉 token；
这比固定切图更贴近人类感知，但也意味着大图会消耗更多 token。
选型时先确认：输入图会被缩到多大、切几块、每块多少 token。
一张 A4 扫描件缩到 1024 长边后，小字可能已经不可读，这时换更大的模型也救不回来。

## [定位与坐标|Grounding and coordinates]

普通 VLM 输出文字描述，不输出框或点。
需要「指出在哪里」时，要选支持 grounding 的模型或额外的检测模块；
同时确认坐标口径：原图像素、归一化到 0–1，还是模型内部的网格坐标。
坐标口径弄错，比模型选错更常见。

## [读字与表格|Text and tables]

VLM 的 OCR 能力不等于文档理解。
表格需要行列结构，票据需要字段对齐，这些都要单独的版面分析与后处理。
验收时不要只看「识别出了几个字」，要看「字段值是否正确、表格行列是否还原」。

## [评测与成本|Evaluation and cost]

用 30–50 张真实业务图做盲测，分「答对 / 部分对 / 编造」三档；
编造要单列，因为它在业务里最贵。
成本按「图像 token × 单价 + 输出 token」估算；高分辨率与多图输入会把成本抬得很快。
Qwen2-VL 论文报告 72B 在多模态基准上接近当时的 GPT-4o 与 Claude 3.5 Sonnet，这是论文口径，不等于你的票据任务也同样接近。

**边界**：论文里的基准分数与具体业务图分布不同；上线前必须用自有样本复测。

**先补概念**：[视觉语言模型](https://learn.specul.com/term/%E8%A7%86%E8%A7%89%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B/) 是学 AI 站的相关科普。
