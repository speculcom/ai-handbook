---
zh: few-shot 示例怎么选
en: How to Pick Few-Shot Examples
kind: guide
station: 2
ord: 12
span: 6
lead: "在提示里放几个「输入→输出」例子能明显改变表现，但例子选得不好反而带偏。这篇讲选例子的五条标准。"
points: ["例子覆盖你要的边界情况，而不是只放最简单的：模型会模仿例子的分布。", "格式与真实输入完全一致：示例里的字段名、标点、换行都会被照抄。", "数量从两三个起步，边际收益递减快；塞太多还挤占上下文、拉高成本。", "示例之间要有差异：三个几乎一样的例子等于一个，还让模型以为只会这一种。", "遇到输出跑偏，先检查是不是某个示例在带节奏——错误示例比没有示例更糟。"]
terms: ["上下文学习", "提示词", "小语言模型"]
refs:
  - ["Brown 等《Language Models are Few-Shot Learners》（GPT-3 论文）", "https://arxiv.org/abs/2005.14165", "Brown et al., Language Models are Few-Shot Learners (GPT-3)"]
  - ["Wei 等《Finetuned Language Models Are Zero-Shot Learners》（FLAN）", "https://arxiv.org/abs/2109.01652", "Wei et al., Finetuned Language Models Are Zero-Shot Learners (FLAN)"]
  - ["Wang 等《Self-Instruct: Aligning Language Models with Self-Generated Instructions》", "https://arxiv.org/abs/2212.10560", "Wang et al., Self-Instruct"]
---

# few-shot 示例怎么选（How to Pick Few-Shot Examples）

**这份指南解决什么**：在提示里放几个「输入→输出」例子能明显改变表现，但例子选得不好反而带偏。这篇讲选例子的五条标准。

**怎么做**：
1. 例子覆盖你要的边界情况，而不是只放最简单的：模型会模仿例子的分布。
2. 格式与真实输入完全一致：示例里的字段名、标点、换行都会被照抄。
3. 数量从两三个起步，边际收益递减快；塞太多还挤占上下文、拉高成本。
4. 示例之间要有差异：三个几乎一样的例子等于一个，还让模型以为只会这一种。
5. 遇到输出跑偏，先检查是不是某个示例在带节奏——错误示例比没有示例更糟。

**出处**：few-shot 效果的原始证据见 GPT-3、FLAN 与 Self-Instruct 论文（见下）。

- [Brown 等《Language Models are Few-Shot Learners》（GPT-3 论文）](https://arxiv.org/abs/2005.14165)
- [Wei 等《Finetuned Language Models Are Zero-Shot Learners》（FLAN）](https://arxiv.org/abs/2109.01652)
- [Wang 等《Self-Instruct: Aligning Language Models with Self-Generated Instructions》](https://arxiv.org/abs/2212.10560)

---
<!-- 微型指南 · 第二站（上手） · 约 6 分钟 -->
