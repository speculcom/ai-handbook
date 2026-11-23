---
zh: "Looped Transformer（循环 Transformer）"
en: "Looped Transformer"
purpose: "同一组 Transformer 层被反复调用多次，用循环深度换推理能力，而不是继续堆参数。"
def: ["标准 Transformer 每一层只过一遍；循环 Transformer 把中间一段层重复执行多次，再回到后续层。", "层数 × 循环次数 = 实际展开的层应用数，但权重数量不变；增加的是计算、激活与 KV 缓存。", "它和 MoE 不是一回事：MoE 增加的是专家参数与路由，循环增加的是同一组权重的重复计算。", "Inkling 2 Mini 是 24 层，6–17 层循环 3 次，共 48 次层应用；26.4B 总参、3.4B 每 token 激活，循环后约 5.4B 有效激活。"]
why: "2026 年的 Inkling 2 Mini / Small 把循环层用作「不增加参数、但增加推理步骤」的手段；看到「有效激活」这个词时，要知道它把循环计算折算进去了，不是又一个参数口径。循环能加深推理，但不会让模型多记住知识；延迟与 KV 缓存仍随上下文增长。"
refs:
  - ["Universal Transformers（论文）", "https://arxiv.org/abs/1807.01774", "Universal Transformers (paper)"]
  - ["Inkling 2 Mini 官方模型卡", "https://huggingface.co/thinkingmachines/Inkling-2-Mini", "Inkling 2 Mini official model card"]
  - ["Unsloth Inkling 2 Mini 指南", "https://unsloth.ai/docs/models/inkling-2-mini", "Unsloth Inkling 2 Mini guide"]
domain: "model"
purposeTag: "learn"
level: 4
layer: "四"
ord: 61
last_verified: "2026-11-23"
verified_scope: "refs"
---

# Looped Transformer（循环 Transformer）（Looped Transformer）

**解决什么问题**：同一组 Transformer 层被反复调用多次，用循环深度换推理能力，而不是继续堆参数。

标准 Transformer 每一层只过一遍；循环 Transformer 把中间一段层重复执行多次，再回到后续层。

层数 × 循环次数 = 实际展开的层应用数，但权重数量不变；增加的是计算、激活与 KV 缓存。

它和 MoE 不是一回事：MoE 增加的是专家参数与路由，循环增加的是同一组权重的重复计算。

Inkling 2 Mini 是 24 层，6–17 层循环 3 次，共 48 次层应用；26.4B 总参、3.4B 每 token 激活，循环后约 5.4B 有效激活。

**为什么需要知道**：2026 年的 Inkling 2 Mini / Small 把循环层用作「不增加参数、但增加推理步骤」的手段；看到「有效激活」这个词时，要知道它把循环计算折算进去了，不是又一个参数口径。循环能加深推理，但不会让模型多记住知识；延迟与 KV 缓存仍随上下文增长。

---

<!-- 站：第四站 · 看懂 · 理解为什么会有这些表现。看不懂这一站，前面的词你都只能背。 -->
