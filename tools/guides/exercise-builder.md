---
id: exercise-builder
topic: planning
title: 练习包 · Builder：用 10 篇站内文档搭一个带引用的问答
titleEn: Exercise: cited answers from 10 source pages
summary: 一个可独立完成的 RAG 练习：选 10 篇站内页面做语料，产出 10 题答案、引用表、评测表与失败记录；附评分标准与参考答案结构。
summaryEn: A self-contained RAG exercise: use 10 site pages as a corpus and produce 10 answers, a citation table, an evaluation sheet and a failure log, with a rubric and a model-answer outline.
sources:
  - label: 本站 · RAG 全链路：从文档到答案
    url: https://learn.specul.com/guide/RAG%20全链路：从文档到答案/
    kind: docs
  - label: 本站 · 怎么给文档做分块
    url: https://learn.specul.com/guide/怎么给文档做分块/
    kind: docs
  - label: 本站 · 怎么评测 RAG 的效果
    url: https://learn.specul.com/guide/怎么评测%20RAG%20的效果/
    kind: docs
  - label: 本站 · 怎么验证 AI 的输出
    url: https://learn.specul.com/guide/怎么验证%20AI%20的输出/
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [任务|The task]

用 10 篇站内页面做唯一语料，搭一个能回答问题的问答流程。不允许接外部搜索，不允许凭记忆补充。题数和评分线是本练习的教学约束，不是生产系统的通用标准。

1. 从 learn 站任选 10 个词条页，主题集中在一个领域（如 RAG 或本地部署）。
2. 把它们切成可检索的片段，记录切分规则（按段、按标题、固定长度）。
3. 写 10 个问题，其中 3 个的答案不在语料里，用来测拒答。
4. 每次回答必须带引用：页面标题 + 链接 + 命中的原文句子。
5. 记录每次失败：答错、答偏、编造、引用错页。

## [交付物|Deliverables]

| 文件 | 内容 | 检查点 |
|---|---|---|
| `answers.md` | 10 题答案，逐题带引用 | 每条引用能点回原文并找到该句 |
| `citations.csv` | 题目 / 引用页 / 原文句 / 是否命中 | 10 行，无空行 |
| `eval.csv` | 题目 / 判定（对/错/拒答）/ 原因 | 判定可被第二人复核 |
| `failures.md` | 失败记录与改法 | 按实际情况记录并写清触发条件；人为构造的失败输入须标注 |

## [评分标准|Rubric]

每项 0–2 分，共 10 分：

| 维度 | 0 分 | 1 分 | 2 分 |
|---|---|---|---|
| 引用准确 | 引用页与答案无关 | 引用页相关但句子对不上 | 每条都能点回并找到原句 |
| 拒答 | 不会的题也硬答 | 拒答了但没说缺什么 | 3 道无答案题全部拒答并说明缺口 |
| 评测可复核 | 只有「感觉对」 | 有判定但无原因 | 每题有判定与可复核原因 |
| 失败记录 | 没记录 | 记了现象 | 记了触发条件与改法 |
| 可复现 | 别人跑不出同样结果 | 步骤缺一环 | 切分、检索、提示词三步可照做 |

8 分及格；6 分以下回到「怎么评测 RAG 的效果」重做。

## [参考答案结构|Model answer outline]

不提供逐题答案（语料由你选），提供合格答案的结构：

```text
问题：分块时为什么要保留标题和页码？
答案：它们可作为元数据，让检索时按结构信息过滤。
引用：《怎么给文档做分块》「怎么做」第 6 项；原文句：「保留结构信息：标题、章节、页码存进元数据，检索时能过滤。」
判定：对；原因：引用句直接支持答案。
```

拒答题的合格写法：

```text
问题：这个模型在 2026-11-01 的准确率是多少？
答案：语料里没有该日期的评测数据，无法回答。需要补充官方评测页或自建评测。
判定：拒答；原因：语料中无对应事实。
```

## [常见失分|Common misses]

- 引用整页而不是句子：读者无法核对。
- 把「语义相近」当「原文支持」：答案超出引用句。
- 无答案题也答：宁可拒答，不要补记忆。
- 只测正常输入会漏掉边界问题；补充无答案、缺字段和不符合格式的样本。
