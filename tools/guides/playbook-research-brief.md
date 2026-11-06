---
id: playbook-research-brief
topic: planning
title: 任务：做一份可核查的研究简报
titleEn: Playbook: producing a checkable research brief
summary: 问题、检索、来源、综合、复核五步；每个结论挂来源与日期，含工具分工、失败模式与验收单。
summaryEn: Five steps — question, search, sources, synthesis, review — with a source and date on every claim, plus tool roles, failure modes and an acceptance list.
sources:
  - label: NotebookLM · 官方站（源锚定回答、音频概览；2026-10 快照）
    url: https://notebooklm.google.com
    kind: official
  - label: Elicit · 官方站（文献检索与结构化抽取；2026-10 快照）
    url: https://elicit.com
    kind: official
  - label: Perplexity · 官方站（答案带来源角标；2026-10 快照）
    url: https://www.perplexity.ai
    kind: official
  - label: Kagi · 官方站（自建索引、付费换隐私；2026-10 快照）
    url: https://kagi.com
    kind: official
  - label: NotebookLM · 官方帮助中心（源锚定与音频概览说明）
    url: https://support.google.com/notebooklm
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [准备：把问题写成可回答的句子|Prepare: an answerable question]

1. **一句话问题**：对象、时间范围、地区、口径四项写全。
2. **交付形态**：一页简报、五页 memo、还是带表格的对比。
3. **截止条件**：资料够了就停，不要无限检索。
4. **先列已知与未知**：有多少列多少，检索围绕未知展开，不为凑数补写。

**决策点**：问题里出现「最好」「最强」就改写；本站不排名，排名式问题会逼你编结论。

## [检索：三种工具分工|Search roles]

| 工具 | 用途 | 产出 |
|---|---|---|
| Perplexity | 从零找线索、英文检索 | 带角标的候选答案 |
| Kagi | 补充检索、隐私敏感查询 | 原始结果页 |
| NotebookLM | 读自己收集的一组源 | 源内问答与摘要 |
| Elicit | 学术文献筛选与抽取 | 抽取表 |

顺序：先用 Perplexity / Kagi 找源，把原文存进 NotebookLM，再用 Elicit 做文献表。**不要拿搜索答案直接当结论。**

## [来源：每条结论三件套|Sources: claim, URL, date]

- **原文 URL**：不是搜索页，不是二手转述。
- **访问日期**：YYYY-MM-DD。
- **原文定位**：记录支持结论的必要句子、页码或表格行；长材料以定位与释义为主，并核对引用与许可要求。

做一张来源表：

| # | 结论 | 来源 | 日期 | 原文句 |
|---|---|---|---|---|
| 1 | … | 官方文档 | 2026-10-21 | … |
| 2 | … | 官方博客 | 2026-04-21 | … |

**决策点**：同一个结论只有一个来源，标「单一来源」；两个来源冲突，两个都列，不裁决。

## [综合：先写反方|Synthesise: write the counter-case]

1. 每条结论先写「支持证据」，再写「反例或边界」。
2. 数字只写能从来源复算的；不能复算就写「未核验」。
3. 不用「普遍认为」「业内公认」这类无主语句。
4. 证据状态分为已核验、待核验与未知；来源数量另列，单一来源不自动等于不可信。

**失败模式**：把搜索摘要改写成自己的话，来源却只挂搜索页；读者无法回原文。

## [复核：交叉与反向|Review: cross and reverse]

- **交叉**：可先抽 3 条练习，关键信息逐条回原文；不同工具可能引用同一来源，答案一致不等于独立证据。
- **反向**：主动搜「反对该结论」的证据，找不到再写「未找到反例」。
- **日期**：检查每条来源日期，过期事实要标「截至日期」。
- **口径**：同一数字在不同段落是否一致。

## [成本算式|Cost formula]

```
检索成本 ≈ 查询次数 × 单次检索成本
模型阅读/抽取费用 = Σ 每次调用的 (输入 tokens × 输入单价 + 输出 tokens × 输出单价) / 1,000,000
复核费用 = 实际复核小时 × 对应时薪
期间费用 = 检索 + 模型 + 工具 + 席位与复核等费用（避免重复计入）
```

单价单位为每百万 tokens；缓存另列，重试计入实际调用。复核时间按任务与实际记录估，不预设 30%。用 [成本计算器](https://tools.specul.com/mcp/guides/cost-calculator.html) 保留假设。

## [验收单|Acceptance checklist]

- [ ] 问题含对象、时间、地区、口径
- [ ] 每条结论有 URL、访问日期、原文句
- [ ] 单一来源与冲突来源已标注
- [ ] 关键信息已回原文，交叉来源的独立性已检查
- [ ] 每条结论有反例或边界说明
- [ ] 数字可复算，不能复算的标「未核验」
- [ ] 全文无「普遍认为」类无主语句
- [ ] 来源日期与「截至」口径写在页首

## [常见失败模式|Failure modes]

- **角标当核实**：引了来源，但来源本身错。
- **摘要当原文**：没打开原文，结论层层转述。
- **单一来源**：全篇只靠一个博客。
- **日期漂移**：把 2026-04 的事实写成 2026-11 的现状。

## [贯穿案例：给三条公告写一页摘要|Worked example: summarize three announcements]

假设输入是三条公开公告，任务是给同事写一页变化摘要。以下仅演示记录方式。

1. 给原文标 A、B、C，分别记录发布日、适用对象、功能或条款变化。相同功能的不同档位不要合并。
2. 每个结论后记录具体出处；原文写“开始推出”，摘要不能改成“所有用户已可用”。
3. 一条说已经上线，另一条仍写预览时，先对照日期、地区、档位和版本；无法解释的差异列为未确认项。
4. 输出一页：变化、对本任务的影响、暂不能确认的部分。不要为凑完整而补写价格或时间。

交付前，用原文逐条核对摘要，并保留出处表。找不到支持某句的材料，就删除该句或明确限定。
