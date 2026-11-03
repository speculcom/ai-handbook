---
id: academic-research-tools
topic: planning
title: 学术研究工具地图
titleEn: A map of academic research tools
summary: 按「找论文 / 读论文 / 查引用态度 / 做综述」四件事分组，给出 Semantic Scholar、Scite、SciSpace 等工具的边界与官方入口。
summaryEn: Grouped by four jobs — find papers, read papers, check citation stance, build a review — with the boundaries and official links for Semantic Scholar, Scite, SciSpace and others.
sources:
  - label: Semantic Scholar · Academic Graph API 官方页
    url: https://www.semanticscholar.org/product/api
    kind: docs
  - label: Scite · 官方站（Smart Citations）
    url: https://scite.ai/
    kind: official
  - label: SciSpace · 官方站（AI 研究助手与写作）
    url: https://scispace.com/
    kind: official
  - label: Elicit · 官方站（文献综述与数据抽取）
    url: https://elicit.com/
    kind: official
  - label: Connected Papers · 官方站（引文图谱）
    url: https://www.connectedpapers.com/
    kind: official
last_verified: 2026-11-03
confidence: partial
---

## [这一篇讲什么|What this guide covers]

学术工具不是「一个更聪明的搜索框」，而是四件不同的事：**找论文、读论文、查引用态度、做综述**。
先定你要做哪件事，再选工具；本节不排名、不报价格。

<!-- EN -->
> Academic tools are not "a smarter search box"; they serve four different jobs: **find papers, read papers, check citation stance, build a review**.
> Decide which job you have first, then pick the tool. This guide ranks nothing and quotes no prices.

## [找论文：Semantic Scholar / Google Scholar / arXiv|Finding papers: Semantic Scholar / Google Scholar / arXiv]

- **Semantic Scholar**：提供 Academic Graph API，可查作者、论文、引用与参考文献，并有 Recommendations API；适合做程序化检索与引文网络。
- **Google Scholar**：覆盖面广，但无官方 API，批量抓取受条款限制。
- **arXiv**：预印本主库，按分类与日期浏览最直接；未经同行评审的版本要单独标注。

<!-- EN -->
> - **Semantic Scholar**: offers the Academic Graph API for authors, papers, citations and references, plus a Recommendations API; suited to programmatic search and citation networks.
> - **Google Scholar**: broad coverage, but no official API; bulk scraping is limited by its terms.
> - **arXiv**: the main preprint repository, easiest to browse by category and date; mark non-peer-reviewed versions explicitly.

## [读论文：SciSpace / Elicit / 通用聊天助手|Reading papers: SciSpace / Elicit / general chat assistants]

- **SciSpace**：面向论文的问答、解释与写作辅助，提供 PDF 对话与引用管理；适合逐篇精读与写作。
- **Elicit**：把研究问题拆成检索与数据抽取表格，适合做文献综述的初筛。
- **通用聊天助手**：上传 PDF 也能读，但引用与页码常错；关键句要回原文核对。

<!-- EN -->
> - **SciSpace**: paper-oriented Q&A, explanation and writing help with PDF chat and reference management; suited to close reading and writing.
> - **Elicit**: turns a research question into search plus extraction tables, suited to first-pass literature reviews.
> - **General chat assistants**: can read uploaded PDFs, but citations and page numbers are often wrong; verify key sentences against the original.

## [查引用态度：Scite|Checking citation stance: Scite]

Scite 的 Smart Citations 把引用分成**支持 / 反对 / 仅提及**，用来判断一篇论文是被验证还是被质疑。
它不能替代你读原文：分类由模型与规则生成，边界情况仍要人工核对。

<!-- EN -->
> Scite's Smart Citations classify citations as **supporting / contrasting / mentioning**, which helps tell whether a paper has been replicated or challenged.
> It cannot replace reading the paper: classifications come from models and rules, and edge cases still need human checks.

## [做综述：Connected Papers / Elicit|Building a review: Connected Papers / Elicit]

- **Connected Papers**：按引文关系生成论文图谱，适合找一篇种子论文的上下游。
- **Elicit**：把多篇论文的样本、方法、结论抽成表，适合系统综述的初筛。
- **人工步骤不能省**：去重、纳入/排除标准、质量评估与冲突处理仍要人做。

<!-- EN -->
> - **Connected Papers**: builds a citation graph around a seed paper, useful for finding upstream and downstream work.
> - **Elicit**: extracts samples, methods and conclusions across papers into tables, useful for first-pass systematic reviews.
> - **Human steps remain**: deduplication, inclusion/exclusion criteria, quality appraisal and conflict handling are still yours.

## [常见误判|Common misreads]

- **把 AI 摘要当原文**：摘要会漏掉限制条件与反例，引用前回原文。
- **把引用次数当质量**：高引用也可能是争议或错误论文；看引用态度与复现。
- **把预印本当同行评审**：arXiv 版本要标注，正式发表版可能已修改。
- **忽略数据库覆盖**：不同工具覆盖的期刊、专利与会议不同，综述要说明检索范围。

<!-- EN -->
> - **Mistaking an AI summary for the paper**: summaries drop limitations and counterexamples; go back to the source before citing.
> - **Mistaking citation count for quality**: highly cited papers can be contested or wrong; check citation stance and replication.
> - **Mistaking a preprint for peer review**: mark arXiv versions; the published version may have changed.
> - **Ignoring database coverage**: tools cover different journals, patents and conferences; state your search scope in a review.
