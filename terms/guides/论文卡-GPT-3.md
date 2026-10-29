---
zh: 论文卡-GPT-3
en: Paper Card - GPT-3
kind: paper
station: 4
ord: 2
span: 8
lead: "「大模型」叙事的起点论文。这张卡列清它真正论证了什么、局限作者自己怎么写的、以及哪些流行说法不在论文里。"
points: ["研究问题：预训练+微调范式要求每个任务都有专门标注数据，而人类只靠少量例子或简单指令就能做新任务——能不能让模型也做到「不更新参数、从上下文例子学任务」（摘要原话）。", "核心证据：第 3 节按任务族铺开的大表（语言建模、闭卷问答、翻译、常识推理、SuperGLUE 等）——主张是「同一模型不加微调跨多任务可用」，读时要逐表看基线与设置。", "作者自陈局限（第 5 节 Limitations，当日核对）：原话 \"it still has notable weaknesses in text synthesis and several NLP tasks\"——生成文本与若干 NLP 任务仍有明显弱点。", "论文里没有「涌现能力」（emergent abilities/emergence）字样（当日全文核对）：「GPT-3 展现了涌现能力」是后续论文的提法，不是这篇的结论。", "它没有主张的：论文没有主张模型「理解」语言；「规模一定带来一切」也不是论文措辞——论文的主张严格限定在少样本任务表现。"]
terms: ["大模型 - 大语言模型", "预训练", "微调"]
refs:
  - ["Brown 等《Language Models are Few-Shot Learners》（arXiv 2005.14165）", "https://arxiv.org/abs/2005.14165", "Brown et al., Language Models are Few-Shot Learners (arXiv 2005.14165)"]
  - ["HTML 版 · 第 5 节 Limitations", "https://arxiv.org/html/2005.14165#S5", "HTML version · Section 5 Limitations"]
---

# 论文卡：GPT-3（How to Read It）

**这张卡解决什么**：「大模型」叙事的起点论文。这张卡列清它真正论证了什么、局限作者自己怎么写的、以及哪些流行说法不在论文里。

**读这张论文要带走的**：
1. 研究问题：预训练+微调要求每任务有标注数据，人类却只靠少量例子就能做新任务——能否让模型从上下文例子学任务而不更新参数。
2. 核心证据：第 3 节按任务族铺开的大表；主张是同一模型跨任务不加微调可用，逐表核对基线与设置。
3. 作者自陈局限（第 5 节）：生成文本与若干 NLP 任务仍有明显弱点（原话见上）。
4. 论文全文没有「涌现能力」字样——那是后续论文的提法。
5. 论文没有主张模型「理解」语言。

**出处**：以上原话与章节锚点均 2026-10-29 经 arXiv abs 页与 HTML 版当日核对。

- [Brown 等《Language Models are Few-Shot Learners》（arXiv 2005.14165）](https://arxiv.org/abs/2005.14165)
- [HTML 版 · 第 5 节 Limitations](https://arxiv.org/html/2005.14165#S5)

---
<!-- 论文卡 · 第四站 · 约 8 分钟 -->
