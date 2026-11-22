---
zh: "Agent Memory（智能体记忆）"
en: "Agent Memory"
alias: ["智能体记忆", "长期记忆", "Agent Memory"]
purpose: "让 agent 在跨会话、跨任务时保留有用的经历、事实和做法。需要时能检索、更新、遗忘，而不是每次从零开始。"
def: ["Agent Memory 通常分工作记忆、情景记忆、语义记忆与程序性记忆。分别对应当前上下文、过去交互、结构化事实和可复用技能。", "完整链路不止「存」，还包括写入筛选、索引与检索、冲突处理、巩固与遗忘。只加一个向量库不等于有记忆。"]
why: "长任务和多轮协作里，有三种情况会直接降低可用性。重复问同一件事。忘记上次的约束。把过期信息当事实。记忆是 agent 从「一次性问答」走向「持续协作」的关键一层。"
refs:
  - ["Memory for Autonomous LLM Agents · arXiv 2603.07670", "https://arxiv.org/abs/2603.07670", "Memory for Autonomous LLM Agents: Mechanisms, Evaluation, and Emerging Frontiers"]
  - ["A Survey of Agent Memory · arXiv 2602.06052", "https://arxiv.org/abs/2602.06052", "A Survey of Agent Memory in the Second Half"]
domain: "agent"
purposeTag: "learn"
level: 3
layer: "三"
ord: 74
last_verified: "2026-11-21"
verified_scope: "refs"
---

# Agent Memory（智能体记忆）（Agent Memory）

**解决什么问题**

让 agent 在跨会话、跨任务时保留有用的经历、事实和做法。需要时能检索、更新、遗忘，而不是每次从零开始。

Agent Memory 通常分工作记忆、情景记忆、语义记忆与程序性记忆。分别对应当前上下文、过去交互、结构化事实和可复用技能。

完整链路不止「存」，还包括写入筛选、索引与检索、冲突处理、巩固与遗忘。只加一个向量库不等于有记忆。

**为什么需要知道**

长任务和多轮协作里，有三种情况会直接降低可用性。重复问同一件事。忘记上次的约束。把过期信息当事实。记忆是 agent 从「一次性问答」走向「持续协作」的关键一层。

**边界**

记忆会带来隐私、污染与权限问题：谁能写、谁能读、什么时候该忘，必须有策略。检索相似不等于事实正确。旧记忆可能与新事实冲突。高敏感场景应默认不持久化，或做加密与作用域隔离。

**怎么判断用不用**

任务需要跨会话保持偏好、项目状态或反复使用的流程时，记忆有价值。一次性问答、强隐私场景或事实变化极快的领域。先把上下文和检索做好，比急着上长期记忆更稳。

---
<!-- 站：第三站 · 用深 · 决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。 -->
