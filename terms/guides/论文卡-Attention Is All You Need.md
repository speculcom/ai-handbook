---
zh: 论文卡-Attention Is All You Need
en: Paper Card - Attention Is All You Need
kind: paper
station: 4
ord: 1
span: 7
lead: "Transformer 的源头论文。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。"
points: ["研究问题：只用注意力、不用循环和卷积，能不能做序列转换——摘要原话 \"dispensing with recurrence and convolutions entirely\"（完全弃用循环与卷积）。", "核心证据：第 4 节与 Table 1 对比三种架构量——最大路径长度、每层计算量、最少顺序操作数；实验是两个机器翻译任务，WMT 2014 英德翻译 28.4 BLEU（摘要原话）。", "作者自陈局限：这篇论文没有独立的 Limitations 节（当日核对 arXiv HTML 版）；最接近的是第 7 节注意力可视化——那是机制解读，不是局限声明。适用范围要读者自己补判断。", "它没有主张的：论文没有说这套架构能训出通用语言模型。「Transformer 是大模型的地基」是本站回顾性说法，不是论文结论。", "读法提示：Table 1 的三量对比才是论证核心；只看架构图会错过论文真正的主张。"]
terms: ["Transformer"]
refs:
  - ["Vaswani 等《Attention Is All You Need》（arXiv 1706.03762）", "https://arxiv.org/abs/1706.03762", "Vaswani et al., Attention Is All You Need (arXiv 1706.03762)"]
  - ["HTML 版 · 第 4 节 Table 1（架构复杂度对比）", "https://arxiv.org/html/1706.03762#S4", "HTML version · Section 4, Table 1 (complexity comparison)"]
  - ["HTML 版 · 第 7 节 Attention Visualizations", "https://arxiv.org/html/1706.03762#S7", "HTML version · Section 7 Attention Visualizations"]
---

# 论文卡：Attention Is All You Need（How to Read It）

**这张卡解决什么**：Transformer 的源头论文。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。

**读这张论文要带走的**：
1. 研究问题：只用注意力、不用循环和卷积，能不能做序列转换——摘要原话 "dispensing with recurrence and convolutions entirely"。
2. 核心证据：第 4 节与 Table 1 对比三种架构量（最大路径长度、每层计算量、最少顺序操作数）；实验是两个机器翻译任务，WMT 2014 英德 28.4 BLEU。
3. 作者自陈局限：无独立 Limitations 节（2026-10-29 核对 arXiv HTML 版）；第 7 节注意力可视化是机制解读，不是局限声明。
4. 它没有主张的：「Transformer 是大模型的地基」是本站回顾性说法，不是论文结论。
5. 读法提示：Table 1 的三量对比才是论证核心。

**出处**：以上原话与章节锚点均 2026-10-29 经 arXiv HTML 版当日核对。

- [Vaswani 等《Attention Is All You Need》（arXiv 1706.03762）](https://arxiv.org/abs/1706.03762)
- [HTML 版 · 第 4 节 Table 1](https://arxiv.org/html/1706.03762#S4)
- [HTML 版 · 第 7 节 Attention Visualizations](https://arxiv.org/html/1706.03762#S7)

---
<!-- 论文卡 · 第四站 · 约 7 分钟 -->
