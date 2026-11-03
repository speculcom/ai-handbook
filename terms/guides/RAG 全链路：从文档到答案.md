---
zh: RAG 全链路：从文档到答案
en: "RAG End to End: From Documents to Answers"
kind: guide
station: 2
ord: 15
span: 9
lead: "分块、嵌入、检索、重排、生成、引用——RAG 的每一步都会单独失败；这篇把它们串成一条可排障的链路。"
points: ["文档解析与分块：先处理版式、表格与扫描件，再按语义边界切、保留标题与来源；解析错，后面全错。", "嵌入与索引：记录模型版本与维度，换嵌入模型要重建索引。", "检索：先召回足够多的候选，再用重排模型或规则收窄；只看 top-1 容易漏。", "拼上下文：只放相关块，带来源标识；块之间去重，避免同一段重复占 token。", "生成与引用：要求答案逐条对应来源；没有来源的句子标为「推断」。", "Agentic RAG：让 agent 自己改 query、决定是否再检索、判断资料够不够；代价是步数与成本上升。", "评测：分开测召回率、答案正确率与引用正确率，不要只测最终回答。"]
terms: ["联网 - 检索增强", "分块", "向量 - 嵌入"]
refs:
  - ["Lewis 等 · Retrieval-Augmented Generation（arXiv 2005.11401）", "https://arxiv.org/abs/2005.11401", "Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"]
  - ["LlamaIndex · 官方文档", "https://docs.llamaindex.ai/", "LlamaIndex official docs"]
  - ["Anthropic · Contextual Retrieval", "https://www.anthropic.com/news/contextual-retrieval", "Anthropic · Contextual Retrieval"]
last_verified: "2026-11-03"
verified_scope: "refs"
---

# RAG 全链路：从文档到答案（RAG End to End: From Documents to Answers）

**这份指南解决什么**：分块、嵌入、检索、重排、生成、引用——RAG 的每一步都会单独失败；这篇把它们串成一条可排障的链路。

**怎么做**：
1. 文档解析：先处理版式、表格与扫描件；解析错，后面全错。
2. 分块：按语义边界切，保留标题与来源；块太大检索不准，太小丢上下文。
3. 嵌入与索引：记录模型版本与维度，换嵌入模型要重建索引。
4. 检索：先召回足够多的候选，再用重排模型或规则收窄；只看 top-1 容易漏。
5. 拼上下文：只放相关块，带来源标识；块之间去重，避免同一段重复占 token。
6. 生成与引用：要求答案逐条对应来源；没有来源的句子标为「推断」。
7. Agentic RAG：让 agent 自己改 query、决定是否再检索、判断资料够不够；代价是步数与成本上升。
8. 评测：分开测召回率、答案正确率与引用正确率，不要只测最终回答。

**出处**：RAG 原始论文与 LlamaIndex 官方文档；上下文检索与分块策略参考 Anthropic。

- [Lewis 等 · Retrieval-Augmented Generation（arXiv 2005.11401）](https://arxiv.org/abs/2005.11401)
- [LlamaIndex · 官方文档](https://docs.llamaindex.ai/)
- [Anthropic · Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)

---
<!-- 微型指南 · 第二站（上手） · 约 9 分钟 -->
