---
zh: "FrugalGPT（级联推理）"
en: "FrugalGPT (LLM cascade)"
purpose: "先用便宜的小模型试，置信度不够再升级到更强更贵的模型。"
def: ["请求先进入第一级模型，同时给出一个置信度或评分。", "分数够高就直接返回；不够高才把同一请求转给下一级更大模型。", "多级串起来形成级联，用平均成本换接近大模型的质量。"]
why: "大多数请求其实不需要最贵的模型。级联能把成本压下来，但会引入延迟和路由判断错误。"
refs:
  - ["FrugalGPT 论文（arXiv）", "https://arxiv.org/abs/2305.05176", "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance (arXiv 2305.05176)"]
domain: "infra"
purposeTag: "apply"
level: 3
layer: "三"
ord: 61
last_verified: "2026-11-19"
---

# FrugalGPT（级联推理）（FrugalGPT (LLM cascade)）

**解决什么问题**：先用便宜的小模型试，置信度不够再升级到更强更贵的模型。

请求先进入第一级模型，同时给出一个置信度或评分。

分数够高就直接返回；不够高才把同一请求转给下一级更大模型。

多级串起来形成级联，用平均成本换接近大模型的质量。

**为什么需要知道**：大多数请求其实不需要最贵的模型。级联能把成本压下来，但会引入延迟和路由判断错误。

---

<!-- 站：第三站 · 用深 · 决定好不好用的具体做法。 -->
