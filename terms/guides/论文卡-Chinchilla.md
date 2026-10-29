---
zh: 论文卡-Chinchilla
en: Paper Card - Chinchilla
kind: paper
station: 4
ord: 4
span: 7
lead: "「模型该多大、数据该多少」的定标论文。这张卡列清它的结论原话、证据规模、以及作者自己提醒的外推边界。"
points: ["研究问题：摘要原话——给定算力预算下，最优的模型大小与训练 token 数各是多少；结论是「当前大模型普遍训练不足」（\"significantly undertrained\"），因为业界只顾加大模型、不增加数据。", "核心结论原话：\"for compute-optimal training, the model size and the number of training tokens should be scaled equally: for every doubling of model size the number of training tokens should also be doubled\"——模型与数据要等比例扩。", "证据规模：训练 400 多个模型（70M 到 16B+ 参数、5 到 500B token）做定标拟合，再用 70B 的 Chinchilla 验证——它「超过 Gopher 及其他大模型」（第 4.2 节，当日核对）。", "作者自陈的边界（当日核对）：Chinchilla 比 Gopher 多训 4 倍数据，作者自己提醒「训练/测试集泄漏可能人为抬高结果」，因此更看重其他任务——连定标论文都在防数据污染。", "它没有主张的：结论来自 ≤16B 模型的拟合再外推——「70B 之后规律不变」是外推不是实测；「参数量不重要」也不是论文说法，是等比例扩。"]
terms: ["预训练", "大模型 - 大语言模型", "数据污染"]
refs:
  - ["Hoffmann 等《Training Compute-Optimal Large Language Models》（arXiv 2203.15556）", "https://arxiv.org/abs/2203.15556", "Hoffmann et al., Training Compute-Optimal Large Language Models (arXiv 2203.15556)"]
  - ["HTML 版 · 第 4 节（Chinchilla 结果）", "https://arxiv.org/html/2203.15556#S4", "HTML version · Section 4 (Chinchilla results)"]
---

# 论文卡：Chinchilla（How to Read It）

**这张卡解决什么**：「模型该多大、数据该多少」的定标论文。这张卡列清它的结论原话、证据规模、以及作者自己提醒的外推边界。

**读这张论文要带走的**：
1. 研究问题：给定算力预算，最优模型大小与 token 数——当前大模型普遍训练不足。
2. 核心结论：模型与 token 数等比例扩（原话见上）。
3. 证据规模：400+ 模型定标 + 70B Chinchilla 验证（第 4.2 节超过 Gopher）。
4. 作者自陈：多训 4 倍数据可能带来训练/测试泄漏、人为抬高结果——定标论文自己也在防数据污染。
5. 结论来自 ≤16B 拟合的外推，别当无限成立的定律。

**出处**：以上原话与章节锚点均 2026-10-29 经 arXiv HTML 版当日核对。

- [Hoffmann 等《Training Compute-Optimal Large Language Models》（arXiv 2203.15556）](https://arxiv.org/abs/2203.15556)
- [HTML 版 · 第 4 节](https://arxiv.org/html/2203.15556#S4)

---
<!-- 论文卡 · 第四站 · 约 7 分钟 -->
