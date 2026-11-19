---
zh: "RLAIF（AI 反馈强化学习）"
en: "RLAIF"
purpose: "用另一个 AI 模型代替人类标注偏好，降低 RLHF 的标注成本。"
def: ["让评审模型对多个候选回答做排序或打分。", "把 AI 偏好当作奖励信号，训练策略模型。", "通常要配合人类偏好校准，避免评审模型把自己的偏见传下去。"]
why: "RLHF 贵在人工排序。RLAIF 把标注变成可扩展的模型调用，但会引入评审模型的盲区。"
refs:
  - ["RLAIF 论文（arXiv）", "https://arxiv.org/abs/2309.00267", "RLAIF: Scaling Reinforcement Learning from Human Feedback with AI Feedback (arXiv 2309.00267)"]
domain: "concept"
purposeTag: "learn"
level: 3
layer: "三"
ord: 66
last_verified: "2026-11-19"
---

# RLAIF（AI 反馈强化学习）（RLAIF）

**解决什么问题**：用另一个 AI 模型代替人类标注偏好，降低 RLHF 的标注成本。

让评审模型对多个候选回答做排序或打分。

把 AI 偏好当作奖励信号，训练策略模型。

通常要配合人类偏好校准，避免评审模型把自己的偏见传下去。

**为什么需要知道**：RLHF 贵在人工排序。RLAIF 把标注变成可扩展的模型调用，但会引入评审模型的盲区。

---

<!-- 站：第三站 · 用深 · 决定好不好用的具体做法。 -->
