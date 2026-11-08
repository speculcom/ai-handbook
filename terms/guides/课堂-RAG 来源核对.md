---
zh: 课堂-RAG 来源核对
en: Lesson - Checking Sources in RAG Answers
kind: lesson
station: 3
ord: 1
span: 15
lead: "学员把一次 RAG 回答拆成检索、片段、生成三段责任，用三列核对表定位问题出在哪一段，并给出可验证的改进动作。"
objectives: ["能把一次回答拆成三段责任：检索是否命中、片段是否够用、生成是否超出片段。", "能为每个断言找到对应片段与位置，找不到就标为无依据。", "能说明分块会切断上下文，重排只改候选顺序、不新增事实。", "能提出一个改进动作，并说明用什么口径验证它有没有效。"]
materials: ["Anthropic 官方工程博客《Introducing Contextual Retrieval》：传统 RAG 编码时丢上下文会让检索失败。", "Cohere 官方 Rerank 文档：给定查询与文档列表，按语义相关度排序。", "LlamaIndex 官方 CitationQueryEngine 示例：答案带来源节点引用的写法。", "三份虚构内部文档片段（其中一份条款被切断上下文）＋一张三列核对表。"]
steps: ["3 分钟建参考答案：各组读问题与文档，先人工标出应当命中的片段。", "4 分钟查检索：对照系统给出的片段，分成命中、漏检、片段缺上下文三类。", "4 分钟查生成：逐句核对答案与片段，标出超出片段的断言与引用错位。", "4 分钟提改进：每组给一个动作与验证口径，全班按「改的是哪一段责任」归类。"]
misconceptions: ["以为答案带了引用就可信；引用可能指向不支持该句的片段。", "把检索不到归因为模型笨；也可能是分块切断上下文或用词不一致。", "以为重排能补出缺失事实；它只调整候选顺序。", "把厂商博客里的提升幅度直接搬到自己的库；那是特定数据与设置下的结果。"]
assessment: ["三列核对表填完：每个断言有片段位置，或明确标为无依据。", "能把本组失败归因到三段中的一段，并指出支撑该判断的证据。", "改进动作带验证口径，例如同一组问题重跑后比较无依据断言的数量。"]
terms: ["分块", "向量 - 嵌入", "引用与可追溯", "检索质量度量", "幻觉"]
refs:
  - ["Anthropic：Contextual Retrieval（官方工程博客）", "https://www.anthropic.com/engineering/contextual-retrieval", "Anthropic: Introducing Contextual Retrieval"]
  - ["Cohere：Rerank 模型总览（官方文档）", "https://docs.cohere.com/docs/rerank-overview", "Cohere: An Overview of Cohere's Rerank Model"]
  - ["LlamaIndex：CitationQueryEngine 官方示例", "https://docs.llamaindex.ai/en/stable/examples/query_engine/citation_query_engine/", "LlamaIndex: CitationQueryEngine example"]
last_verified: "2026-11-07"
verified_scope: "refs"
---

# 课堂教案：RAG 来源核对（Lesson - Checking Sources in RAG Answers）

**这份教案解决什么**：学员把一次 RAG 回答拆成检索、片段、生成三段责任，用三列核对表定位问题出在哪一段，并给出可验证的改进动作。

**课时目标**：
- 能把一次回答拆成三段责任：检索是否命中、片段是否够用、生成是否超出片段。
- 能为每个断言找到对应片段与位置，找不到就标为无依据。
- 能说明分块会切断上下文，重排只改候选顺序、不新增事实。
- 能提出一个改进动作，并说明用什么口径验证它有没有效。

**材料**：
- Anthropic 官方工程博客《Introducing Contextual Retrieval》：传统 RAG 编码时丢上下文会让检索失败。
- Cohere 官方 Rerank 文档：给定查询与文档列表，按语义相关度排序。
- LlamaIndex 官方 CitationQueryEngine 示例：答案带来源节点引用的写法。
- 三份虚构内部文档片段（其中一份条款被切断上下文）＋一张三列核对表。

**步骤**（15 分钟微课）：
1. 3 分钟建参考答案：各组读问题与文档，先人工标出应当命中的片段。
2. 4 分钟查检索：对照系统给出的片段，分成命中、漏检、片段缺上下文三类。
3. 4 分钟查生成：逐句核对答案与片段，标出超出片段的断言与引用错位。
4. 4 分钟提改进：每组给一个动作与验证口径，全班按「改的是哪一段责任」归类。

**常见误解**：
- 以为答案带了引用就可信；引用可能指向不支持该句的片段。
- 把检索不到归因为模型笨；也可能是分块切断上下文或用词不一致。
- 以为重排能补出缺失事实；它只调整候选顺序。
- 把厂商博客里的提升幅度直接搬到自己的库；那是特定数据与设置下的结果。

**评分核对**：
- 三列核对表填完：每个断言有片段位置，或明确标为无依据。
- 能把本组失败归因到三段中的一段，并指出支撑该判断的证据。
- 改进动作带验证口径，例如同一组问题重跑后比较无依据断言的数量。

**出处**：检索失败的成因与补上下文的做法取自 Anthropic 官方工程博客。它提出 Contextual Embeddings 与 Contextual BM25 两个子技术，并配合重排。

重排「按语义相关度排序」的口径取自 Cohere 官方文档。引用回链的写法取自 LlamaIndex 官方示例。课堂不把博客里的提升幅度当作本地库的预期。

- [Anthropic：Contextual Retrieval（官方工程博客）](https://www.anthropic.com/engineering/contextual-retrieval)
- [Cohere：Rerank 模型总览（官方文档）](https://docs.cohere.com/docs/rerank-overview)
- [LlamaIndex：CitationQueryEngine 官方示例](https://docs.llamaindex.ai/en/stable/examples/query_engine/citation_query_engine/)

---
<!-- 课堂教案 · 第三站（用深） · 约 15 分钟 -->