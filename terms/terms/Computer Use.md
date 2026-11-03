---
zh: "Computer Use"
en: "Computer Use"
purpose: "让 AI 直接操作电脑界面：看屏幕、点按钮、输入文字，而不是只调用 API。"
def: ["Computer Use 指模型通过截图/无障碍树观察屏幕，并执行鼠标、键盘操作来完成 GUI 任务。", "它与「浏览网页」不同：粒度更细、权限更大，风险也更高。"]
why: "很多旧系统没有 API，只能靠界面操作；这也是 agent 从「聊天」走向「替你干活」的关键一步，但需要沙箱与审批。"
refs:
  - ["Anthropic · Computer Use 官方文档", "https://docs.anthropic.com/en/docs/agents-and-tools/computer-use", "Anthropic · Computer Use"]
  - ["OpenAI · Computer use 指南", "https://platform.openai.com/docs/guides/computer-use", "OpenAI · Computer use guide"]
domain: "agent"
purposeTag: "guard"
level: 3
layer: "三"
ord: 37
last_verified: "2026-11-03"
verified_scope: "refs"
---

# Computer Use（Computer Use）

**解决什么问题**：让 AI 直接操作电脑界面：看屏幕、点按钮、输入文字，而不是只调用 API。

Computer Use 指模型通过截图/无障碍树观察屏幕，并执行鼠标、键盘操作来完成 GUI 任务。
它与「浏览网页」不同：粒度更细、权限更大，风险也更高。

**为什么需要知道**：很多旧系统没有 API，只能靠界面操作；这也是 agent 从「聊天」走向「替你干活」的关键一步，但需要沙箱与审批。

---
<!-- 站：第三站 · 用深 · 决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。 -->
