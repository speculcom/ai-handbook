---
zh: "RAG（检索增强生成）"
en: "RAG (Retrieval-Augmented Generation)"
alias: ["检索增强生成", "检索增强", "RAG 检索"]
purpose: "让模型在回答前先检索外部资料。把找到的原文片段放进上下文，再据此作答。"
def: ["RAG 把参数化记忆（模型权重）与非参数化记忆（外部文档索引）组合起来。先用检索器找相关片段。再让生成模型基于片段写答案。", "它的价值不只是多知道一些事实，还在于答案可以附出处、资料可以更新而不用重训模型。"]
why: "遇到私有资料、时效性强的问题，微调不是唯一答案。RAG 往往更快、更可追溯，但检索错、分块错会直接传导到答案。"
refs:
  - ["Lewis 等 · RAG 原始论文（arXiv 2005.11401）", "https://arxiv.org/abs/2005.11401", "Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"]
  - ["Gao 等 · RAG 综述（arXiv 2312.10997）", "https://arxiv.org/abs/2312.10997", "Gao et al., Retrieval-Augmented Generation for Large Language Models: A Survey"]
domain: "agent"
purposeTag: "apply"
level: 3
layer: "三"
ord: 47
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-rag.svg"
figure_caption: "一条 RAG 链路。文档先被切块并转成向量，检索召回候选，重排收窄，生成阶段带上引用。"
figure_caption_en: "A RAG pipeline: documents are chunked and embedded, candidates are retrieved and reranked, then the generator answers with citations."
---

# RAG（检索增强生成）（RAG (Retrieval-Augmented Generation)）

**解决什么问题**

**依据：** 让模型在回答前先检索外部资料。把找到的原文片段放进上下文，再据此作答。

**依据：** RAG 有两层记忆。参数化记忆是模型权重，非参数化记忆是外部文档索引。先用检索器找相关片段。再让生成模型基于片段写答案。

它的价值不只是多知道一些事实，还在于答案可以附出处、资料可以更新而不用重训模型。

**别名**：检索增强生成、检索增强、RAG 检索

**为什么需要知道**

遇到私有资料、时效性强的问题，微调不是唯一答案。RAG 往往更快、更可追溯，但检索错、分块错会直接传导到答案。

**看具体例子**：
- [Lewis 等 · RAG 原始论文（arXiv 2005.11401）](https://arxiv.org/abs/2005.11401)
- [Gao 等 · RAG 综述（arXiv 2312.10997）](https://arxiv.org/abs/2312.10997)

---

<!-- 站：第三站 · 由 2026-11-17 内容补齐批次新增。 -->
