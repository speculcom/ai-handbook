---
zh: "A2A（Agent2Agent 协议）"
en: "A2A (Agent2Agent Protocol)"
alias: ["Agent2Agent", "智能体互操作协议", "A2A 协议"]
purpose: "让不同厂商、不同框架的智能体互相发现能力、委派任务并回传结果。"
def: ["A2A 是开放协议，核心是 Agent Card（能力描述）与任务生命周期消息。", "它补的是 agent 之间的协作层。它不替代 MCP 这类「agent 接工具」的协议。"]
why: "多智能体落地时，最大的摩擦往往不是模型而是互通。A2A 试图把发现、鉴权、长任务状态统一。"
refs:
  - ["A2A · 官方仓库与规范", "https://github.com/a2aproject/A2A", "A2A official repository and specification"]
  - ["MCP · 官方文档", "https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro", "Model Context Protocol documentation"]
domain: "agent"
purposeTag: "apply"
level: 3
layer: "三"
ord: 53
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-a2a.svg"
figure_caption: "A2A 管「智能体之间」。先读 Agent Card 发现能力，再委派任务并跟踪状态。MCP 管「智能体接工具」。"
figure_caption_en: "A2A covers agent-to-agent work: discover capabilities via an Agent Card, delegate a task and track its state. MCP covers agent-to-tool access."
---

# A2A（Agent2Agent 协议）（A2A (Agent2Agent Protocol)）

**解决什么问题**：让不同厂商、不同框架的智能体互相发现能力、委派任务并回传结果。

A2A 是开放协议，核心是 Agent Card（能力描述）与任务生命周期消息。

它补的是 agent 之间的协作层。它不替代 MCP 这类「agent 接工具」的协议。

**别名**：Agent2Agent、智能体互操作协议、A2A 协议

**为什么需要知道**

多智能体落地时，最大的摩擦往往不是模型而是互通。A2A 试图把发现、鉴权、长任务状态统一。

**看具体例子**：
- [A2A · 官方仓库与规范](https://github.com/a2aproject/A2A)
- [MCP · 官方文档](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro)

---

<!-- 站：第三站 · 由 2026-11-17 内容补齐批次新增。 -->
