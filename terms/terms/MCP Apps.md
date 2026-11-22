---
zh: "MCP Apps"
en: "MCP Apps"
alias: ["MCP 应用", "MCP UI 扩展", "ui:// 资源"]
purpose: "让 MCP 工具不只会返回一段文字。它还能把一个可交互的 HTML 界面渲染在宿主对话里。例如表单、图表、看板和分步流程。"
def: ["MCP Apps 是 MCP 的官方扩展。工具在元数据里声明一个 ui:// 资源，宿主预取并在沙箱 iframe 中渲染。界面与宿主通过 JSON-RPC / postMessage 双向通信。", "工具结果仍按 MCP 返回，UI 只是同一结果的可视化层。不支持该扩展的宿主会退化为纯文本工具。"]
why: "很多任务用文字说不清，用户需要在对话里填表、选参数、看图表。MCP Apps 把这层界面标准化，避免每个工具厂商各做一套私有 UI 协议。"
refs:
  - ["MCP Apps · 官方概览", "https://modelcontextprotocol.io/extensions/apps/overview", "MCP Apps official overview"]
  - ["MCP Apps · 发布公告（2026-01-26）", "https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/", "MCP Apps launch announcement, 26 January 2026"]
domain: "dev"
purposeTag: "apply"
level: 3
layer: "三"
ord: 71
last_verified: "2026-11-21"
verified_scope: "refs"
---

# MCP Apps（MCP Apps）

**解决什么问题**

让 MCP 工具不只会返回一段文字。它还能把一个可交互的 HTML 界面渲染在宿主对话里。例如表单、图表、看板和分步流程。

MCP Apps 是 MCP 的官方扩展。工具在元数据里声明一个 ui:// 资源，宿主预取并在沙箱 iframe 中渲染。界面与宿主通过 JSON-RPC / postMessage 双向通信。

工具结果仍按 MCP 返回，UI 只是同一结果的可视化层。不支持该扩展的宿主会退化为纯文本工具。

**为什么需要知道**

很多任务用文字说不清，用户需要在对话里填表、选参数、看图表。MCP Apps 把这层界面标准化，避免每个工具厂商各做一套私有 UI 协议。

**边界**

UI 运行在沙箱 iframe 里，宿主必须执行 CSP、来源校验与权限控制。工具能读什么、能写什么，仍由 MCP 服务端和宿主授权决定。不是「有界面就自动安全」。它也不替代 MCP 的工具协议，只是多了一个可选的展示层。

**怎么判断用不用**

如果工具的结果天然是表格、图表、地图或多步表单，MCP Apps 比纯文本更清楚。如果结果只是一段摘要或一个链接，做 UI 只会增加维护成本。

---
<!-- 站：第三站 · 用深 · 决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。 -->
