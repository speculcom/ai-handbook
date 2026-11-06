---
id: compare-research-tools
topic: planning
title: 研究工具：Perplexity / Kagi / NotebookLM / Elicit 怎么选
titleEn: Research tools compared
summary: 按检索深度、来源透明度、资料锚定与引用管理四面选；搜索引擎、资料集问答与文献抽取是三件事。
summaryEn: Choose by search depth, source transparency, source grounding and citation management; search engines, source-set Q&A and literature extraction are three different jobs.
sources:
  - label: Perplexity · 官方站（答案带来源角标、多模型路由、Comet 浏览器；2026-10 快照）
    url: https://www.perplexity.ai
    kind: official
  - label: Kagi · 官方站（自建索引、付费、无广告无追踪、AI 答案层；2026-10 快照）
    url: https://kagi.com
    kind: official
  - label: NotebookLM · 官方站（源锚定回答、音频概览与学习指南；2026-10 快照）
    url: https://notebooklm.google.com
    kind: official
  - label: Elicit · 官方站（文献检索、结构化抽取表、带引用综述；2026-10 快照）
    url: https://elicit.com
    kind: official
  - label: NotebookLM · 官方帮助中心（源锚定与音频概览说明）
    url: https://support.google.com/notebooklm
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [三件事别混|Three different jobs]

| 任务 | 要的能力 | 候选 |
|---|---|---|
| 找资料 | 检索覆盖、来源角标 | Perplexity、Kagi |
| 读自己的一组资料 | 源锚定、可追溯 | NotebookLM |
| 做文献综述 | 筛选、抽取表、引用 | Elicit |

**先问资料是从零找，还是已经有一组。** 已有资料时先明确是否需要补充外部来源，避免无关材料混入。

## [四行对照|Four tools]

| 维度 | Perplexity | Kagi | NotebookLM | Elicit |
|---|---|---|---|---|
| 索引来源 | 多模型路由 + 自研线 | 自建索引 | 用户提供的源 | 学术文献库 |
| 输出 | 带来源角标的答案 | 搜索结果 + AI 答案层 | 源内回答、音频概览、学习指南 | 抽取表、带引用综述 |
| 透明度 | 角标可点回原文 | 无广告无追踪、付费换隐私 | 围绕所选资料给出引用，仍需逐条核对 | 每个单元格可回原文 |
| 边界 | 角标背后的原文仍要自己核 | 不是免费产品 | 不是搜索引擎 | 不替你判断论文质量 |

## [逐个适用条件|When each fits]

**Perplexity**：适合带来源的事实问答与快速研究入口，检索结果仍需回原文核对；Comet 浏览器把检索延伸成 agent 浏览。**什么情况下选另一个**：想逐条筛选搜索结果并重视隐私条款，可对照 Kagi；要读自己上传的一批 PDF，选 NotebookLM。

**Kagi**：适合要无广告、无追踪与自建索引的人；付费换隐私是主轴，AI 答案层是附加。**什么情况下选另一个**：要免费、要社交化答案页，选 Perplexity。

**NotebookLM**：适合把一组文档、网页或笔记变成可问答资料集，并生成音频概览与学习指南。**什么情况下选另一个**：要从零找资料，选 Perplexity 或 Kagi。

**Elicit**：适合系统性文献综述：研究问题 → 论文筛选 → 抽取表 → 带引用综述。**什么情况下选另一个**：只是日常事实问答，NotebookLM 或 Perplexity 更轻。

## [核验事实|Dated facts]

1. Perplexity 的答案带来源角标，并有多模型路由与 Comet 浏览器线（官方站，2026-10 档案核验）。
2. Kagi 使用自建索引，付费、无广告、无追踪；AI 答案层为 FastGPT / Teclis（官方站，2026-10 档案核验）。
3. NotebookLM 围绕用户提供的资料集问答，并可生成音频概览与学习指南（官方站，2026-10 档案核验）。
4. Elicit 输出结构化抽取表与带引用综述，每个单元格仍需回原文核对（官方站，2026-10 档案核验）。

以上日期为本站档案核验快照日；具体额度与档位以官方页面当日为准。

## [组合用法|A workable combination]

1. **从零找**：Perplexity 做第一轮，Kagi 做补充检索。
2. **建资料集**：把关键原文丢进 NotebookLM，问题只在源内问。
3. **做综述**：Elicit 建抽取表，再回原文逐格核对。
4. **留痕**：保存检索日期、查询词、来源 URL 与版本。

## [常见误判|Common misreads]

- 把「有角标」当成「已核实」：角标只证明它引了，没证明引对。
- 把「源内回答」当成「不会编」：源本身错，答案也可能出错；来源正确也不保证模型引用正确。
- 把「抽取表」当成「结论」：表格是中间产物，判断仍要人做。
- 把「付费搜索」当成「更准」：付费买的是隐私与索引控制，不是事实正确。
