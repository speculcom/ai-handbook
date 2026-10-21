---
zh: 怎么给 AI 工具配权限
en: How to Set Permissions for AI Tools
kind: guide
station: 3
ord: 4
span: 7
lead: "AI 工具的危险程度，多半由你给它的权限决定。这份指南讲怎么给得刚好够用、又不过头。"
points: ["先想它要干什么，再给权限：写代码给代码目录，别顺手给整个家目录。", "读和写分开给：能只读完成任务的，就不给写。", "划出禁区：密钥文件、账户配置、系统目录，明确不给。", "开确认模式：删除、覆盖、对外发送这类操作，让工具先问再动。", "定期收权：项目结束、任务换了，把之前开的权限收回来。", "用受限模式跑实验：不信任的用法先关在沙箱里试。"]
terms: ["权限", "工具调用", "MCP"]
refs:
  - ["FileSystem server 为什么强制声明目录（本站档案）", "https://tools.specul.com/tools/filesystem.html", "Why Filesystem requires declared dirs"]
  - ["OpenHands 的受限模式（本站档案）", "https://tools.specul.com/harness/openhands.html", "OpenHands Restricted Mode"]
  - ["CLI 的权限询问机制（本站档案）", "https://tools.specul.com/opencode.html", "CLI permission prompts"]
---

# 怎么给 AI 工具配权限（How to Set Permissions for AI Tools）

**这份指南解决什么**：AI 工具的危险程度，多半由你给它的权限决定。这份指南讲怎么给得刚好够用、又不过头。

**怎么做**：
1. 先想它要干什么，再给权限：写代码给代码目录，别顺手给整个家目录。
2. 读和写分开给：能只读完成任务的，就不给写。
3. 划出禁区：密钥文件、账户配置、系统目录，明确不给。
4. 开确认模式：删除、覆盖、对外发送这类操作，让工具先问再动。
5. 定期收权：项目结束、任务换了，把之前开的权限收回来。
6. 用受限模式跑实验：不信任的用法先关在沙箱里试。

**出处**：本站档案里记录了三种现成做法——文件工具强制声明目录、OpenHands 的受限模式、CLI 的权限询问（见下）。

- [FileSystem server 为什么强制声明目录（本站档案）](https://tools.specul.com/tools/filesystem.html)
- [OpenHands 的受限模式（本站档案）](https://tools.specul.com/harness/openhands.html)
- [CLI 的权限询问机制（本站档案）](https://tools.specul.com/opencode.html)

---
<!-- 微型指南 · 第三站（用深） · 约 7 分钟 -->
