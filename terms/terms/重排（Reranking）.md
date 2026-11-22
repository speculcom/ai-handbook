---
zh: "重排（Reranking）"
en: "Reranking"
alias: ["重排序", "rerank", "交叉编码器重排"]
purpose: "在初步召回的一批候选里，用更精细的模型重新排序。把真正相关的几条排到最前面。"
def: ["检索系统通常先做召回（向量或关键词），再用交叉编码器逐对打分。", "重排模型同时读查询和候选文本。它算得慢但更准，所以一般只用在几十到两百条候选的小集合上。"]
why: "只靠向量相似度，顺序常常不理想。加一层重排通常能明显提升引用质量，代价是延迟和算力。"
refs:
  - ["Nogueira 与 Cho · Passage Re-ranking with BERT（arXiv 1901.04085）", "https://arxiv.org/abs/1901.04085", "Nogueira and Cho, Passage Re-ranking with BERT"]
  - ["Sentence Transformers · 官方仓库", "https://github.com/huggingface/sentence-transformers", "Sentence Transformers repository"]
domain: "data"
purposeTag: "apply"
level: 3
layer: "三"
ord: 48
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-rerank.svg"
figure_caption: "两阶段检索。召回先取一批候选，重排再逐对精读。把最相关的排到顶部。"
figure_caption_en: "Two-stage retrieval: recall collects candidates, reranking reads each pair and moves the most relevant to the top."
---

# 重排（Reranking）（Reranking）

**解决什么问题**

在初步召回的一批候选里，用更精细的模型重新排序。把真正相关的几条排到最前面。

检索系统通常先做召回（向量或关键词），再用交叉编码器逐对打分。

重排模型同时读查询和候选文本。它算得慢但更准，所以一般只用在几十到两百条候选的小集合上。

**别名**：重排序、rerank、交叉编码器重排

**为什么需要知道**

只靠向量相似度，顺序常常不理想。加一层重排通常能明显提升引用质量，代价是延迟和算力。

**看具体例子**：
- [Nogueira 与 Cho · Passage Re-ranking with BERT（arXiv 1901.04085）](https://arxiv.org/abs/1901.04085)
- [Sentence Transformers · 官方仓库](https://github.com/huggingface/sentence-transformers)

---

<!-- 站：第三站 · 由 2026-11-17 内容补齐批次新增。 -->
