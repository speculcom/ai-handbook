---
zh: "ReAct"
en: "ReAct"
purpose: "让模型交替「想一步、做一步、看结果」，把推理和工具调用编成循环。"
def: ["模型先输出一段推理（Thought），再选择一个动作（Action），例如搜索或调用 API。", "执行动作后观察结果（Observation），把结果写回上下文，再决定下一步。", "循环直到给出最终答案；推理不是一次性写完，而是被工具结果不断修正。"]
why: "它是大多数 agent 框架的默认骨架。理解 ReAct，才能看懂工具调用、轨迹评测和长时任务为什么容易跑偏。"
refs:
  - ["ReAct 论文（arXiv）", "https://arxiv.org/abs/2210.03629", "ReAct: Synergizing Reasoning and Acting in Language Models (arXiv 2210.03629)"]
domain: "agent"
purposeTag: "apply"
level: 3
layer: "三"
ord: 58
last_verified: "2026-11-19"
---

# ReAct（ReAct）

**解决什么问题**：让模型交替「想一步、做一步、看结果」，把推理和工具调用编成循环。

模型先输出一段推理（Thought），再选择一个动作（Action），例如搜索或调用 API。

执行动作后观察结果（Observation），把结果写回上下文，再决定下一步。

循环直到给出最终答案；推理不是一次性写完，而是被工具结果不断修正。

**为什么需要知道**：它是大多数 agent 框架的默认骨架。理解 ReAct，才能看懂工具调用、轨迹评测和长时任务为什么容易跑偏。

---

<!-- 站：第三站 · 用深 · 决定好不好用的具体做法。 -->
