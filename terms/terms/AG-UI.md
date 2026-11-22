---
zh: "AG-UI（Agent-User Interaction 协议）"
en: "AG-UI (Agent-User Interaction Protocol)"
alias: ["AG-UI", "Agent-User Interaction", "智能体前端交互协议"]
purpose: "把 agent 的一次运行变成一条结构化事件流。让前端能实时渲染文本、工具调用、共享状态和人工确认，而不是只等一个最终回答。"
def: ["AG-UI 是面向 agent 与前端的开放协议。客户端发起一次 run，agent 按顺序发事件。事件覆盖文本增量、工具调用、状态补丁、推理过程、中断与恢复。", "它补的是「agent 到用户界面」这一段。MCP 管 agent 接工具，A2A 管 agent 之间协作，三者可以同时用。"]
why: "聊天框只能显示文本，但真实 agent 会调工具、改状态、停下来等人确认。没有统一事件流，每个框架都要自己写一套前端适配，换框架就重做。"
refs:
  - ["AG-UI · 官方仓库与 1.0 规范", "https://github.com/ag-ui-protocol/ag-ui", "AG-UI official repository and 1.0 specification"]
  - ["AG-UI · 规范草案", "https://docs.ag-ui.com/spec/draft", "AG-UI specification draft"]
domain: "dev"
purposeTag: "apply"
level: 3
layer: "三"
ord: 70
last_verified: "2026-11-21"
verified_scope: "refs"
---

# AG-UI（Agent-User Interaction 协议）（AG-UI (Agent-User Interaction Protocol)）

**解决什么问题**

把 agent 的一次运行变成一条结构化事件流。让前端能实时渲染文本、工具调用、共享状态和人工确认，而不是只等一个最终回答。

AG-UI 是面向 agent 与前端的开放协议。客户端发起一次 run，agent 按顺序发事件。事件覆盖文本增量、工具调用、状态补丁、推理过程、中断与恢复。

它补的是「agent 到用户界面」这一段。MCP 管 agent 接工具，A2A 管 agent 之间协作，三者可以同时用。

**为什么需要知道**

聊天框只能显示文本，但真实 agent 会调工具、改状态、停下来等人确认。没有统一事件流，每个框架都要自己写一套前端适配，换框架就重做。

**边界**

AG-UI 不规定模型怎么选、工具怎么执行，也不保证前端一定安全渲染。它只统一事件形状与生命周期。事件流能不能回放、断线后能否续传，仍取决于实现。它也不是「让 agent 直接生成 UI」的万能协议。生成式 UI 只是事件的一种消费方式。

**怎么判断用不用**

如果 agent 只返回一段文本，不需要工具进度、共享状态或人工中断。用普通 HTTP 就够。前端如果要显示四件事：正在调哪个工具、参数是什么、哪一步失败了、用户要不要批准。这时 AG-UI 才值得引入。

---
<!-- 站：第三站 · 用深 · 决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。 -->
