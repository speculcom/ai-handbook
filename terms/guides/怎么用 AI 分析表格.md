---
zh: "怎么用 AI 分析表格"
en: "How to analyse a spreadsheet with AI"
kind: "guide"
station: 3
ord: 28
span: 7
lead: "先让 AI 理解字段和口径，再让它写公式或查询，最后用原始表复核关键数字。"
points: ["先贴表头和 5 行样例，说明每列含义、单位、空值规则；不要让模型猜字段。", "把问题拆成「口径 → 计算 → 呈现」：同比还是环比、含不含税、去不去重，先写清楚。", "优先让模型生成可检查的公式/SQL，而不是直接给一个结论数字。", "关键数字用第二条路径复算（例如透视表 vs 公式），两条路径不一致就以原始表为准。", "图表只保留能支持结论的维度；AI 很容易把相关性画成因果。"]
terms: ["结构化输出", "数据污染", "人工复核队列"]
refs:
  - ["Microsoft Copilot for Excel", "https://www.microsoft.com/en-us/microsoft-365/copilot", "Microsoft 365 Copilot"]
  - ["Google Workspace Gemini", "https://workspace.google.com/solutions/ai/", "Google Workspace AI"]
last_verified: "2026-11-19"
verified_scope: "refs"
---

# 怎么用 AI 分析表格（How to analyse a spreadsheet with AI）

**这份指南解决什么**：先让 AI 理解字段和口径，再让它写公式或查询，最后用原始表复核关键数字。

**怎么做**：
1. 先贴表头和 5 行样例，说明每列含义、单位、空值规则；不要让模型猜字段。
2. 把问题拆成「口径 → 计算 → 呈现」：同比还是环比、含不含税、去不去重，先写清楚。
3. 优先让模型生成可检查的公式/SQL，而不是直接给一个结论数字。
4. 关键数字用第二条路径复算（例如透视表 vs 公式），两条路径不一致就以原始表为准。
5. 图表只保留能支持结论的维度；AI 很容易把相关性画成因果。

**出处**：
- [Microsoft Copilot for Excel](https://www.microsoft.com/en-us/microsoft-365/copilot)
- [Google Workspace Gemini](https://workspace.google.com/solutions/ai/)

---

<!-- 微型指南 · 第3站 · 约7分钟 -->
