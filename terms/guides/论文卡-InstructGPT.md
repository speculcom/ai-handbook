---
zh: 论文卡-InstructGPT
en: Paper Card - InstructGPT
kind: paper
station: 4
ord: 3
span: 8
lead: "「对齐」进入主流训练的标志性论文。这张卡列清它要解决什么、关键数字在哪、以及作者自己列的局限在哪一节。"
points: ["研究问题：摘要开篇原话 \"Making language models bigger does not inherently make them better at following a user's intent\"——模型变大不天然更听话，会生成不真实、有害或无用的输出。", "核心证据：1.3B 参数的 InstructGPT 输出被标注者偏好于 175B GPT-3（摘要原话 \"despite having 100x fewer parameters\"，参数量少 100 倍）——对齐质量与参数量解耦，这是全文最硬的一条。", "作者自陈局限：第 5 节（当日核对 HTML 版含 limitations 5.3 / open questions 5.4 / broader impacts 5.5 小节）；摘要还明说毒性只有小幅改善、偏见没有改善（\"small improvements in toxicity over GPT-3, but not bias\"）。", "对评测读者的关键一句（摘要）：\"Public NLP datasets are not reflective of how our language models are used\"——公开基准反映不了真实用法。这条直接支撑本站「榜单怎么读」的立场。", "它没有主张的：RLHF 解决了幻觉或偏见——论文自己说没有；「对齐=更安全」也不能从这篇直接推出，作者列的是开放问题。"]
terms: ["偏好对齐", "微调", "基准测试"]
refs:
  - ["Ouyang 等《Training language models to follow instructions with human feedback》（arXiv 2203.02155）", "https://arxiv.org/abs/2203.02155", "Ouyang et al., Training language models to follow instructions with human feedback (arXiv 2203.02155)"]
  - ["HTML 版 · 第 5 节（含 5.3 Limitations）", "https://arxiv.org/html/2203.02155#S5", "HTML version · Section 5 (incl. 5.3 Limitations)"]
---

# 论文卡：InstructGPT（How to Read It）

**这张卡解决什么**：「对齐」进入主流训练的标志性论文。这张卡列清它要解决什么、关键数字在哪、以及作者自己列的局限在哪一节。

**读这张论文要带走的**：
1. 研究问题：模型变大不天然更听话（摘要原话）。
2. 核心证据：1.3B InstructGPT 被标注者偏好于 175B GPT-3——对齐质量与参数量解耦。
3. 作者自陈局限在第 5 节；毒性小幅改善、偏见未改善是摘要自陈。
4. 「公开 NLP 数据集反映不了真实用法」是摘要原话，直接支撑读榜单要打折的立场。
5. 它没有主张 RLHF 解决了幻觉或偏见。

**出处**：以上原话与章节锚点均 2026-10-29 经 arXiv abs 页与 HTML 版当日核对。

- [Ouyang 等《Training language models to follow instructions with human feedback》（arXiv 2203.02155）](https://arxiv.org/abs/2203.02155)
- [HTML 版 · 第 5 节](https://arxiv.org/html/2203.02155#S5)

---
<!-- 论文卡 · 第四站 · 约 8 分钟 -->
