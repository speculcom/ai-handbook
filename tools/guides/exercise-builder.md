---
id: exercise-builder
topic: planning
title: 练习包 · Builder：用 10 篇站内文档搭一个带引用的问答
titleEn: Exercise: cited answers from 10 source pages
summary: 一个可独立完成的 RAG 练习：选 10 篇站内页面做语料，产出 10 题答案、引用表、评测表与失败记录；附评分标准与参考答案结构。
summaryEn: A self-contained RAG exercise: use 10 site pages as a corpus and produce 10 answers, a citation table, an evaluation sheet and a failure log, with a rubric and a model-answer outline.
sources:
  - label: 本站 · RAG 全链路：从文档到答案
    url: https://learn.specul.com/guide/RAG 全链路：从文档到答案/
    kind: docs
  - label: 本站 · 怎么给文档做分块
    url: https://learn.specul.com/guide/怎么给文档做分块/
    kind: docs
  - label: 本站 · 怎么评测 RAG 的效果
    url: https://learn.specul.com/guide/怎么评测 RAG 的效果/
    kind: docs
  - label: 本站 · 怎么验证 AI 的输出
    url: https://learn.specul.com/guide/怎么验证 AI 的输出/
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [任务|The task]

用 10 篇站内页面做唯一语料，搭一个能回答问题的问答流程。不允许接外部搜索，不允许凭记忆补充。

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
| `failures.md` | 失败记录与改法 | 至少 3 条，写清触发条件 |

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
问题：RAG 的分块为什么要按标题切？
答案：按标题切能保留段落主题，减少跨主题片段；固定长度切分容易把定义与例子分开。
引用：《怎么给文档做分块》第 2 节「按结构切」；原文句：「先按标题与段落切，再对超长段做二次切分。」
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
