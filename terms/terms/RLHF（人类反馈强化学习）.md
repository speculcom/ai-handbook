---
zh: "RLHF（人类反馈强化学习）"
en: "RLHF"
purpose: "先训练一个奖励模型学人类偏好，再用强化学习把语言模型往高分方向推。"
def: ["收集人类对多个回答的排序，训练奖励模型。", "用 PPO 等算法优化策略模型，让奖励模型给高分。", "同时加 KL 惩罚，防止模型为了高分偏离原模型太远。"]
why: "它是「会说话」到「听话」的关键一步。理解 RLHF，才能理解偏好对齐、奖励黑客和拒答行为。"
refs:
  - ["InstructGPT 论文（arXiv）", "https://arxiv.org/abs/2203.02155", "Training language models to follow instructions with human feedback (arXiv 2203.02155)"]
domain: "concept"
purposeTag: "learn"
level: 3
layer: "三"
ord: 65
last_verified: "2026-11-19"
---

# RLHF（人类反馈强化学习）（RLHF）

**解决什么问题**：先训练一个奖励模型学人类偏好，再用强化学习把语言模型往高分方向推。

收集人类对多个回答的排序，训练奖励模型。

用 PPO 等算法优化策略模型，让奖励模型给高分。

同时加 KL 惩罚，防止模型为了高分偏离原模型太远。

**为什么需要知道**：它是「会说话」到「听话」的关键一步。理解 RLHF，才能理解偏好对齐、奖励黑客和拒答行为。

---

<!-- 站：第三站 · 用深 · 决定好不好用的具体做法。 -->
