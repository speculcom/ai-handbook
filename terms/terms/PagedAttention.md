---
zh: "PagedAttention"
en: "PagedAttention"
purpose: "借操作系统的分页思路管理 KV 缓存，让显存几乎不浪费。"
def: ["Kwon 等人的定义：受操作系统虚拟内存与分页技术启发的注意力算法。", "论文称基于它构建的 vLLM 在 KV 缓存上接近零浪费，吞吐提升 2–4 倍。"]
why: "vLLM 快的真正原因。理解了它，才明白显存要算的是缓存而不只是权重。"
refs:
  - ["Kwon 等《Efficient Memory Management for LLM Serving with PagedAttention》", "https://arxiv.org/abs/2309.06180", "PagedAttention paper (SOSP 2023)"]
  - ["从业者深版：跑起来深水专题（AI 模型站）", "https://models.specul.com/guides/serving-deep-dive.html", "Practitioner deep-dive: serving deep dive guide (AI Models site)"]
domain: "infra"
purposeTag: "learn"
level: 5
layer: "五"
ord: 21
---

# PagedAttention（PagedAttention）

**解决什么问题**：借操作系统的分页思路管理 KV 缓存，让显存几乎不浪费。

Kwon 等人的定义：受操作系统虚拟内存与分页技术启发的注意力算法。

论文称基于它构建的 vLLM 在 KV 缓存上接近零浪费，吞吐提升 2–4 倍。

**为什么需要知道**：vLLM 快的真正原因。理解了它，才明白显存要算的是缓存而不只是权重。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->
