---
zh: "编码 Agent"
en: "Coding Agent"
alias: ["coding agent", "编码智能体", "代码智能体"]
purpose: "能读代码库、改多个文件、跑测试并根据报错继续修的 AI 工具。"
def: ["与代码补全不同，编码 Agent 接受一个任务目标，自主规划并执行编辑、命令和验证。", "SWE-bench 用真实 GitHub issue 检验这类系统能否产出通过测试的补丁。"]
why: "它改变的是工程流程而不是单行输入速度；审查、权限和测试仍是必需，不能把「通过率」当成交付质量。"
refs:
  - ["Jimenez 等 · SWE-bench（arXiv 2310.06770）", "https://arxiv.org/abs/2310.06770", "Jimenez et al., SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"]
  - ["SWE-bench · 官方榜单", "https://www.swebench.com/", "SWE-bench leaderboard"]
domain: "agent"
purposeTag: "apply"
level: 3
layer: "三"
ord: 54
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-coding-agent.svg"
figure_caption: "编码 Agent 的循环：读 issue 与代码库，定位并修改多个文件，跑测试，读报错再修。"
figure_caption_en: "The coding-agent loop: read the issue and repository, edit across files, run tests, read failures and iterate."
---

# 编码 Agent（Coding Agent）

**解决什么问题**：能读代码库、改多个文件、跑测试并根据报错继续修的 AI 工具。

与代码补全不同，编码 Agent 接受一个任务目标，自主规划并执行编辑、命令和验证。

SWE-bench 用真实 GitHub issue 检验这类系统能否产出通过测试的补丁。

**别名**：coding agent、编码智能体、代码智能体

**为什么需要知道**：它改变的是工程流程而不是单行输入速度；审查、权限和测试仍是必需，不能把「通过率」当成交付质量。

**看具体例子**：
- [Jimenez 等 · SWE-bench（arXiv 2310.06770）](https://arxiv.org/abs/2310.06770)
- [SWE-bench · 官方榜单](https://www.swebench.com/)

---

<!-- 站：第三站 · 由 2026-11-17 内容补齐批次新增。 -->
