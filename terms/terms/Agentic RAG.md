---
zh: "Agentic RAG"
en: "Agentic RAG"
purpose: "让 agent 自己决定要不要检索、检索几次、怎么改写 query，而不是一次检索就生成。"
def: ["Agentic RAG 把检索当成 agent 的工具：它可以多轮改写查询、选择不同索引、判断资料是否足够，再决定是否继续。", "与固定 RAG 链路相比，它更灵活，但步数、成本与不可控性也更高。"]
why: "复杂问题常常一次检索不够；理解这一层，才能判断「RAG 效果不好」到底是检索器的问题，还是流程设计的问题。"
refs:
  - ["Lewis 等 · Retrieval-Augmented Generation（arXiv 2005.11401）", "https://arxiv.org/abs/2005.11401", "Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"]
  - ["LlamaIndex · Agentic RAG 文档", "https://docs.llamaindex.ai/en/stable/optimizing/agentic_strategies/", "LlamaIndex · Agentic strategies"]
domain: "data"
purposeTag: "apply"
level: 3
layer: "三"
ord: 36
last_verified: "2026-11-03"
verified_scope: "refs"
---

# Agentic RAG（Agentic RAG）

**解决什么问题**：让 agent 自己决定要不要检索、检索几次、怎么改写 query，而不是一次检索就生成。

Agentic RAG 把检索当成 agent 的工具：它可以多轮改写查询、选择不同索引、判断资料是否足够，再决定是否继续。
与固定 RAG 链路相比，它更灵活，但步数、成本与不可控性也更高。

**为什么需要知道**：复杂问题常常一次检索不够；理解这一层，才能判断「RAG 效果不好」到底是检索器的问题，还是流程设计的问题。

---
<!-- 站：第三站 · 用深 · 决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。 -->
