---
zh: "多 Agent 协作"
en: "Multi-Agent"
purpose: "把一件复杂的事拆给多个各有所长的角色来分工完成。"
def: ["让多个各自带不同工具和提示的 Agent 分工协作。典型模式是「规划者 + 执行者 + 审查者」。", "代价是 token 消耗和延迟都会成倍上升。"]
why: "不是所有事都该多 Agent。任务简单时，一个 Agent 加工具更快也更可靠。"
refs:
  - ["CrewAI 的角色分工模式", "https://agent.specul.com/harness/crewai.html", "CrewAI role division"]
  - ["LangGraph 低层编排", "https://agent.specul.com/harness/langgraph.html", "LangGraph low-level orchestration"]
domain: "agent"
purposeTag: "apply"
level: 3
layer: "三"
ord: 4
---

# 多 Agent 协作（Multi-Agent）

**解决什么问题**：把一件复杂的事拆给多个各有所长的角色来分工完成。

让多个各自带不同工具和提示的 Agent 分工协作。典型模式是「规划者 + 执行者 + 审查者」。

代价是 token 消耗和延迟都会成倍上升。

**为什么需要知道**：不是所有事都该多 Agent。任务简单时，一个 Agent 加工具更快也更可靠。

**看具体例子**：
- [CrewAI 的角色分工模式](https://agent.specul.com/harness/crewai.html)
- [LangGraph 低层编排](https://agent.specul.com/harness/langgraph.html)

---

<!-- 站：第三站 · 用深 · 决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。 -->