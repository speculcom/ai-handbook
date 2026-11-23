---
zh: "怎么用 AI 清洗数据"
en: "How to clean data with AI"
kind: "guide"
station: 3
ord: 32
span: 7
lead: "让 AI 帮你发现脏数据、提出清洗规则，但每一步改动都要可回放、可审计。"
points: ["先做数据剖面：行数、列类型、空值率、重复率、异常值分布；不要直接让模型「清洗一下」。", "把清洗规则写成清单：去重键、缺失值策略、日期格式、单位统一、异常值处理。", "让 AI 生成可执行的 pandas/SQL 脚本，而不是手改结果表；脚本进版本控制。", "每一步保留 before/after 行数与样例，清洗后能回答「删了哪些、为什么删」。", "敏感字段先脱敏再给模型看；不要把完整客户表贴进聊天框。", "清洗完重跑一遍原始统计，确认没有把信号当噪声删掉。"]
terms: ["数据污染", "训练集与测试集", "数据授权"]
refs:
  - ["pandas 用户指南", "https://pandas.pydata.org/docs/user_guide/10min.html", "pandas 10 minutes to pandas"]
  - ["OpenAI 数据分析", "https://platform.openai.com/docs/guides/text", "OpenAI text and data analysis guide"]
last_verified: "2026-11-19"
verified_scope: "refs"
---

# 怎么用 AI 清洗数据（How to clean data with AI）

**这份指南解决什么**：让 AI 帮你发现脏数据、提出清洗规则，但每一步改动都要可回放、可审计。

**怎么做**：
1. 先做数据剖面：行数、列类型、空值率、重复率、异常值分布；不要直接让模型「清洗一下」。
2. 把清洗规则写成清单：去重键、缺失值策略、日期格式、单位统一、异常值处理。
3. 让 AI 生成可执行的 pandas/SQL 脚本，而不是手改结果表；脚本进版本控制。
4. 每一步保留 before/after 行数与样例，清洗后能回答「删了哪些、为什么删」。
5. 敏感字段先脱敏再给模型看；不要把完整客户表贴进聊天框。
6. 清洗完重跑一遍原始统计，确认没有把信号当噪声删掉。

**出处**：
- [pandas 用户指南](https://pandas.pydata.org/docs/user_guide/10min.html)
- [OpenAI 数据分析](https://platform.openai.com/docs/guides/text)

---

<!-- 微型指南 · 第3站 · 约7分钟 -->
