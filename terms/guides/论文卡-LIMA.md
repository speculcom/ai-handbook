---
zh: 论文卡-LIMA
en: Paper Card - LIMA
kind: paper
station: 4
ord: 6
span: 7
lead: "「少即是多」的对齐数据实验：只用 1000 条精选样本微调。这张卡列清它要测什么、证据在哪一节、以及它没有主张什么。"
points: ["研究问题：摘要原话——按两阶段训练 LIMA（65B 参数 LLaMa 模型），\"fine-tuned with the standard supervised loss on only 1,000 carefully curated prompts and responses\"（只用 1000 条精选问答做标准监督微调），\"without any reinforcement learning or human preference modeling\"（不做强化学习也不做人类偏好建模）——要测的就是两个训练阶段的相对重要性。", "核心证据：第 4 节人工评测（对照 GPT-4/Bard/DaVinci003）与第 5 节消融（数据多样性/质量/数量）——摘要给出受控人评数字：\"responses from LIMA are either equivalent or strictly preferred to GPT-4 in 43% of cases\"（43% 的情况下 LIMA 的回答与 GPT-4 相当或更好）；结论句是 \"almost all knowledge in large language models is learned during pretraining\"（几乎所有知识都在预训练阶段学到）。", "作者自陈局限：没有独立的 Limitations 节（2026-10-30 核对 arXiv HTML 版）；第 7 节 Discussion 开头明确自陈两条——构造样例的心智成本难以规模化、\"LIMA is not as robust as product-grade models\"（不如产品级模型稳健，解码 unlucky sample 或对抗性提示常出弱回答）。", "它没有主张的：43%/58%/65% 是「相当或更好」的受控人评占比，不是「整体达到 GPT-4 水平」；「1000 条足够」是对话风格层面的证据，论文没有主张安全、事实性、鲁棒性也能靠 1000 条解决——这三项恰恰是它自陈薄弱的地方。", "读法提示：这篇的价值是把「知识来自预训练、对齐数据管的是风格」这个假设做成了可检验的消融；引用它时先分清「少数据能对齐」与「少数据能对齐一切」是两个命题。"]
terms: ["微调", "偏好对齐", "训练三阶段"]
refs:
  - ["Zhou 等《LIMA: Less Is More for Alignment》（arXiv 2305.11206）", "https://arxiv.org/abs/2305.11206", "Zhou et al., LIMA: Less Is More for Alignment (arXiv 2305.11206)"]
  - ["HTML 版 · 第 4 节 Human Evaluation", "https://arxiv.org/html/2305.11206#S4", "HTML version · Section 4 Human Evaluation"]
  - ["HTML 版 · 第 5 节 Why is Less More?", "https://arxiv.org/html/2305.11206#S5", "HTML version · Section 5 Why is Less More?"]
  - ["HTML 版 · 第 7 节 Discussion", "https://arxiv.org/html/2305.11206#S7", "HTML version · Section 7 Discussion"]
---

# 论文卡：LIMA（How to Read It）

**这张卡解决什么**：「少即是多」的对齐数据实验——只用 1000 条精选样本做监督微调，不碰 RLHF。这张卡列清它要测什么、证据在哪一节、以及它没有主张什么。

**读这张论文要带走的**：
1. 研究问题：测预训练与对齐两阶段的相对重要性——65B 底座、1000 条精选问答、标准监督损失，无强化学习无偏好建模。
2. 核心证据：第 4 节受控人工评测（43% 情况下与 GPT-4 相当或更好）+ 第 5 节数据消融；结论句=几乎所有知识在预训练阶段学到。
3. 作者自陈局限：无独立 Limitations 节（2026-10-30 核对 arXiv HTML 版）；第 7 节 Discussion 自陈两条——样例构造成本难规模化、LIMA 不如产品级模型稳健。
4. 它没有主张的：「相当或更好」的人评占比≠整体达到 GPT-4；「1000 条足够」只覆盖对话风格，不覆盖安全/事实性/鲁棒性。
5. 读法提示：价值是把「知识来自预训练、对齐数据管风格」做成可检验的消融；引用时分清「少数据能对齐」与「少数据能对齐一切」。

**出处**：以上原话与章节锚点均 2026-10-30 经 arXiv abs 页与 HTML 版当日核对（摘要引自 abs 页 blockquote）。

- [Zhou 等《LIMA: Less Is More for Alignment》（arXiv 2305.11206）](https://arxiv.org/abs/2305.11206)
- [HTML 版 · 第 4 节 Human Evaluation](https://arxiv.org/html/2305.11206#S4)
- [HTML 版 · 第 5 节 Why is Less More?](https://arxiv.org/html/2305.11206#S5)
- [HTML 版 · 第 7 节 Discussion](https://arxiv.org/html/2305.11206#S7)

---
<!-- 论文卡 · 第四站 · 约 7 分钟 -->
