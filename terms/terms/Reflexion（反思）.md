---
zh: "Reflexion（反思）"
en: "Reflexion"
purpose: "让 agent 在失败后写一份「复盘」，把教训存进记忆，下一轮避免同样的错。"
def: ["一次任务失败后，模型根据轨迹和反馈生成一段自我反思。", "反思被写入长期记忆，下一次尝试时作为额外上下文读回来。", "它不改模型参数，只改下一轮的提示与策略。"]
why: "agent 最常见的问题是重复犯错。反思把一次失败变成可复用的经验，而不是重新从零试。"
refs:
  - ["Reflexion 论文（arXiv）", "https://arxiv.org/abs/2303.11366", "Reflexion: Language Agents with Verbal Reinforcement Learning (arXiv 2303.11366)"]
domain: "agent"
purposeTag: "apply"
level: 3
layer: "三"
ord: 59
last_verified: "2026-11-19"
---

# Reflexion（反思）（Reflexion）

**解决什么问题**：让 agent 在失败后写一份「复盘」，把教训存进记忆，下一轮避免同样的错。

一次任务失败后，模型根据轨迹和反馈生成一段自我反思。

反思被写入长期记忆，下一次尝试时作为额外上下文读回来。

它不改模型参数，只改下一轮的提示与策略。

**为什么需要知道**：agent 最常见的问题是重复犯错。反思把一次失败变成可复用的经验，而不是重新从零试。

---

<!-- 站：第三站 · 用深 · 决定好不好用的具体做法。 -->
