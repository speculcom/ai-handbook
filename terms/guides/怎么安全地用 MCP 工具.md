---
zh: 怎么安全地用 MCP 工具
en: How to Use MCP Tools Safely
kind: guide
station: 3
ord: 5
span: 7
lead: "MCP 让 AI 能碰你的文件和网页。工具本身不危险，危险的是它被喂了什么内容、被给了什么权限。"
points: ["只装需要的 server：每多一个工具，就多一条能出事的通道。", "读权限声明：文件类 server 该限定目录，网页类该有安全警告。", "把抓来的内容当数据：网页正文里可能藏着给 AI 的指令。", "敏感目录不接：接文件 server 前，先确认密钥和账户配置不在里面。", "看 server 是谁维护的：官方与第三方，可信度不同。", "出事先断链：怀疑被注入时，先停工具再排查会话。"]
terms: ["MCP", "提示注入", "权限", "工具定义"]
refs:
  - ["MCP 是什么·9 份 server 档案（本站）", "https://agent.specul.com/tools/index.html", "What MCP is · 9 server profiles"]
  - ["文件操作 server（本站档案）", "https://agent.specul.com/tools/filesystem.html", "Filesystem server"]
  - ["网页抓取 server 的安全警告（本站档案）", "https://agent.specul.com/tools/fetch.html", "Fetch server's security warning"]
---

# 怎么安全地用 MCP 工具（How to Use MCP Tools Safely）

**这份指南解决什么**：MCP 让 AI 能碰你的文件和网页。工具本身不危险，危险的是它被喂了什么内容、被给了什么权限。

**怎么做**：
1. 只装需要的 server：每多一个工具，就多一条能出事的通道。
2. 读权限声明：文件类 server 该限定目录，网页类该有安全警告。
3. 把抓来的内容当数据：网页正文里可能藏着给 AI 的指令。
4. 敏感目录不接：接文件 server 前，先确认密钥和账户配置不在里面。
5. 看 server 是谁维护的：官方与第三方，可信度不同。
6. 出事先断链：怀疑被注入时，先停工具再排查会话。

**出处**：本站 9 份 MCP server 档案逐份记录了权限声明与安全警告（见下）。

- [MCP 是什么·9 份 server 档案（本站）](https://agent.specul.com/tools/index.html)
- [文件操作 server（本站档案）](https://agent.specul.com/tools/filesystem.html)
- [网页抓取 server 的安全警告（本站档案）](https://agent.specul.com/tools/fetch.html)

---
<!-- 微型指南 · 第三站（用深） · 约 7 分钟 -->
