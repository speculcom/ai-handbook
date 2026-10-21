---
zh: "FlashAttention"
en: "FlashAttention"
purpose: "一种更省显存、更快的注意力算法，长上下文的基石。"
def: ["Dao 等人的定义：IO 感知的精确注意力算法。用分块减少显存与片上缓存之间的读写。", "原论文指出自注意力的时间与空间复杂度随序列长度二次增长，这是长序列慢的根源。"]
why: "「上下文开大就慢」的底层原因在这里；它也是各家推理库的标配内核。"
refs:
  - ["Dao 等《FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness》", "https://arxiv.org/abs/2205.14135", "FlashAttention paper"]
domain: "infra"
purposeTag: "learn"
level: 5
layer: "五"
ord: 20
---

# FlashAttention（FlashAttention）

**解决什么问题**：一种更省显存、更快的注意力算法，长上下文的基石。

Dao 等人的定义：IO 感知的精确注意力算法。用分块减少显存与片上缓存之间的读写。

原论文指出自注意力的时间与空间复杂度随序列长度二次增长，这是长序列慢的根源。

**为什么需要知道**：「上下文开大就慢」的底层原因在这里；它也是各家推理库的标配内核。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->
