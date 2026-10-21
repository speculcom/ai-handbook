---
zh: "MoE（混合专家）"
en: "Mixture of Experts (MoE)"
purpose: "一种模型结构：每层放很多「专家」，每个词只用到其中少数几个。"
def: ["MoE 层由多个专家子网络加一个可训练的门控（路由）网络组成。", "每个 token 只激活少数专家。", "参数总量大增，但每 token 的计算量近似不变。", "Switch Transformer 把路由简化成每 token 只选一个专家。"]
why: "DeepSeek、Mixtral 这类大模型用的就是它。「总参数」和「激活参数」是两个数，看模型别被前者吓到或骗到。"
refs:
  - ["Switch Transformer（论文）", "https://arxiv.org/abs/2101.03961", "Switch Transformers (paper)"]
  - ["Shazeer 等《Sparsely-Gated Mixture-of-Experts Layer》", "https://arxiv.org/abs/1701.06538", "Outrageously Large Neural Networks: The Sparsely-Gated MoE Layer (paper)"]
domain: "concept"
purposeTag: "learn"
level: 4
layer: "四"
ord: 18
---

# MoE（混合专家）（Mixture of Experts）

**解决什么问题**：一种模型结构：每层放很多「专家」，每个词只用到其中少数几个。

MoE 层由多个专家子网络加一个可训练的门控（路由）网络组成。

每个 token 只激活少数专家。参数总量大增，但每 token 的计算量近似不变。

Switch Transformer 把路由简化成每 token 只选一个专家。

**为什么需要知道**：DeepSeek、Mixtral 这类大模型用的就是它。「总参数」和「激活参数」是两个数，看模型别被前者吓到或骗到。

---

<!-- 站：第四站 · 看懂 · 理解为什么会有这些表现。看不懂这一站，前面的词你都只能背。 -->
