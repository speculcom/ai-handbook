---
zh: "JEPA"
en: "Joint-Embedding Predictive Architecture"
purpose: "让模型在表示空间里预测「被遮住的部分」，而不是在像素或 token 上逐字重建。"
def: ["输入和目标都先编码成表示，预测器在表示空间里预测目标表示。", "它不要求重建原始像素 / 原始 token，因此可以把注意力放在可预测的语义结构上。", "LeCun 2022 提出；2026 年的 JEPA-PRH 论文用它检验「跨模态表征收敛」假说。"]
why: "生成模型的主流是「重建下一个 token / 下一个像素」，JEPA 提供另一条路：先学世界如何变化，再决定要不要生成。理解它，才能读懂 2026 年关于「表征对齐」与「世界模型」的讨论，不会把「预测表示」误当成「生成质量」。"
refs:
  - ["A Path Towards Autonomous Machine Intelligence（LeCun 2022）", "https://openreview.net/forum?id=BZ5a1r-kVsf", "A Path Towards Autonomous Machine Intelligence (2022)"]
  - ["JEPA-PRH（2026）", "https://arxiv.org/abs/2610.39302", "Proving and Improving the Platonic Representation Hypothesis with JEPAs (2026)"]
domain: "concept"
purposeTag: "learn"
level: 6
layer: "六"
ord: 36
last_verified: "2026-11-18"
verified_scope: "refs"
---

# JEPA（Joint-Embedding Predictive Architecture）

**解决什么问题**：逐像素 / 逐 token 重建会把大量算力花在不可预测的细节上（纹理、噪声、措辞）。JEPA 把输入和目标都编码成表示，让预测器在表示空间里预测「被遮住的部分」，不要求还原原始信号。

**和生成模型差在哪**：生成模型的目标是「把东西生成出来」；JEPA 的目标是「学一个可预测的表示」。前者可以直接产出图像 / 文本，后者通常作为表征学习或世界模型的骨干；两者不是同一条排行榜上的对手。

**为什么需要知道**：2026 年的 JEPA-PRH 论文报告，一个 109M 参数的文本 JEPA 在跨模态对齐上优于作者评测过的最大 72B 语言模型，并给出「好视角比 next-token 少 42 倍样本」的结论。这个结果说的是表征对齐与样本效率，不是生成质量。

**边界**：JEPA 不是「不需要解码器」的万能架构；下游任务仍要接预测头或生成器。表示空间的可视化与评估本身很难，对齐分数高不等于语义理解全面。JEPA-PRH 是预印本，规模与任务覆盖都有限。

---
<!-- 站：第六站 · 前沿 · 表征学习是生成之外的另一条主线。 -->
