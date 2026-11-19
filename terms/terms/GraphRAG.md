---
zh: "GraphRAG"
en: "GraphRAG"
purpose: "从文档里抽实体和关系，建成图，再用图结构回答「跨文档、全局性」的问题。"
def: ["索引阶段用模型抽取实体、关系与社区摘要，形成知识图谱。", "查询阶段先定位相关实体/社区，再沿边扩展上下文。", "它补的是向量 RAG 不擅长的「多跳关系」和「整个语料在讲什么」。"]
why: "当问题不是找某一段原文，而是「这些文档之间谁和谁有关」时，纯向量检索会漏。"
refs:
  - ["GraphRAG 论文（arXiv）", "https://arxiv.org/abs/2404.16130", "From Local to Global: A Graph RAG Approach to Query-Focused Summarization (arXiv 2404.16130)"]
domain: "data"
purposeTag: "apply"
level: 3
layer: "三"
ord: 62
last_verified: "2026-11-19"
---

# GraphRAG（GraphRAG）

**解决什么问题**：从文档里抽实体和关系，建成图，再用图结构回答「跨文档、全局性」的问题。

索引阶段用模型抽取实体、关系与社区摘要，形成知识图谱。

查询阶段先定位相关实体/社区，再沿边扩展上下文。

它补的是向量 RAG 不擅长的「多跳关系」和「整个语料在讲什么」。

**为什么需要知道**：当问题不是找某一段原文，而是「这些文档之间谁和谁有关」时，纯向量检索会漏。

---

<!-- 站：第三站 · 用深 · 决定好不好用的具体做法。 -->
