---
zh: 论文卡-Self-Instruct
en: Paper Card - Self-Instruct
kind: paper
station: 4
ord: 7
span: 7
lead: "合成指令数据的开山框架：让模型自己生成指令来训练自己。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。"
points: ["研究问题：摘要原话——指令微调模型 \"depend heavily on human-written instruction data that is often limited in quantity, diversity, and creativity\"（重度依赖人类写的指令数据，而这类数据在数量/多样性/创造力上有限）；解法是 Self-Instruct——\"improving the instruction-following capabilities of pretrained language models by bootstrapping off their own generations\"（用模型自己的生成来-bootstrapping 提升指令跟随）。", "核心证据：第 2 节方法（生成指令+输入+输出、过滤无效与相似样本再微调原模型；种子为 175 个人工标注任务）与第 4 节结果——把方法套在原版 GPT3 上，\"a 33% absolute improvement over the original model on Super-NaturalInstructions\"（Super-NaturalInstructions 上绝对提升 33 个百分点），\"on par with the performance of InstructGPT-001\"（与用私有用户数据和人工标注训练的 InstructGPT-001 相当）。", "作者自陈局限：有独立的第 8 节 Limitations（2026-10-30 核对 arXiv HTML 版），三条：长尾现象（收益偏向预训练语料高频任务，对罕见/创造性指令可能脆弱）、依赖大模型（小模型上未必有效，可能抬高门槛）、强化模型自身偏差（迭代算法可能放大不良社会偏见）。", "它没有主张的：摘要口径是 on par（相当）且人评 \"leaving only a 5% absolute gap behind InstructGPT-001\"（还差 5 个百分点）——没有主张超越 InstructGPT；\"almost annotation-free\"（几乎免标注）也不等于零标注：175 个种子任务和过滤规则仍是人工设计。", "读法提示：这篇是「合成数据训练自己」路线的源头——后来大量指令数据集与自改进方法都走它的生成+过滤骨架；读它时把「方法可复用」与「GPT3 上的具体数字」分开，数字随底座模型能力变化很大。"]
terms: ["合成数据", "微调", "偏好对齐"]
refs:
  - ["Wang 等《Self-Instruct: Aligning Language Models with Self-Generated Instructions》（arXiv 2212.10560）", "https://arxiv.org/abs/2212.10560", "Wang et al., Self-Instruct: Aligning Language Models with Self-Generated Instructions (arXiv 2212.10560)"]
  - ["HTML 版 · 第 2 节 Method", "https://arxiv.org/html/2212.10560#S2", "HTML version · Section 2 Method"]
  - ["HTML 版 · 第 4 节 Experimental Results", "https://arxiv.org/html/2212.10560#S4", "HTML version · Section 4 Experimental Results"]
  - ["HTML 版 · 第 8 节 Limitations", "https://arxiv.org/html/2212.10560#S8", "HTML version · Section 8 Limitations"]
---

# 论文卡：Self-Instruct（How to Read It）

**这张卡解决什么**：合成指令数据的开山框架——让模型自己生成指令来训练自己。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。

**读这张论文要带走的**：
1. 研究问题：指令微调重度依赖人类写的指令数据（数量/多样性/创造力有限）→ 用模型自身生成+过滤来 bootstrapping。
2. 核心证据：第 2 节方法（175 个种子任务起步，生成→过滤→微调）+ 第 4 节结果（原版 GPT3 绝对提升 33 个百分点，与 InstructGPT-001 相当）。
3. 作者自陈局限：有独立第 8 节 Limitations（2026-10-30 核对）——长尾现象、依赖大模型、可能放大模型自身偏差。
4. 它没有主张的：on par 且人评还差 5 个百分点，没有主张超越 InstructGPT；almost annotation-free ≠ 零标注（种子任务与过滤规则是人工设计）。
5. 读法提示：「合成数据训练自己」路线的源头；把方法可复用与 GPT3 上的具体数字分开，数字随底座能力变化很大。

**出处**：以上原话与章节锚点均 2026-10-30 经 arXiv abs 页与 HTML 版当日核对（摘要引自 abs 页 blockquote）。

- [Wang 等《Self-Instruct: Aligning Language Models with Self-Generated Instructions》（arXiv 2212.10560）](https://arxiv.org/abs/2212.10560)
- [HTML 版 · 第 2 节 Method](https://arxiv.org/html/2212.10560#S2)
- [HTML 版 · 第 4 节 Experimental Results](https://arxiv.org/html/2212.10560#S4)
- [HTML 版 · 第 8 节 Limitations](https://arxiv.org/html/2212.10560#S8)

---
<!-- 论文卡 · 第四站 · 约 7 分钟 -->
