---
zh: 什么时候不该用 RAG
en: When Not to Use RAG
kind: guide
station: 2
ord: 10
span: 7
lead: "RAG 不是默认选项。它适合「知识会变、要出处」的场景，不适合另一些场景，硬上反而更差。"
points: ["知识量小且稳定：直接放进上下文更简单，检索层是多余复杂度。", "要求精确算术或推理：检索帮不上，问题在模型本身。", "文档质量差：垃圾进垃圾出，先修文档再谈检索。", "延迟预算紧：检索加重排加生成，链路长，实时场景要掂量。", "需要严格一致性：同一问题两次检索结果可能不同，合规场景要评估。", "先试基线：不加检索直接问，效果够好就不用搭 RAG。"]
terms: ["联网 - 检索增强", "上下文窗口", "能力边界"]
refs:
  - ["RAG 综述论文（Gao 等，arXiv 2023）", "https://arxiv.org/abs/2312.10997", "Retrieval-Augmented Generation for Large Language Models: A Survey (arXiv 2312.10997)"]
  - ["Pinecone RAG 指南", "https://www.pinecone.io/learn/retrieval-augmented-generation/", "Retrieval-Augmented Generation (RAG) – Pinecone"]
---

# 什么时候不该用 RAG（When Not to Use RAG）

**这份指南解决什么**：RAG 不是默认选项。它适合「知识会变、要出处」的场景，不适合另一些场景，硬上反而更差。

**怎么做**：
1. 知识量小且稳定：直接放进上下文更简单，检索层是多余复杂度。
2. 要求精确算术或推理：检索帮不上，问题在模型本身。
3. 文档质量差：垃圾进垃圾出，先修文档再谈检索。
4. 延迟预算紧：检索加重排加生成，链路长，实时场景要掂量。
5. 需要严格一致性：同一问题两次检索结果可能不同，合规场景要评估。
6. 先试基线：不加检索直接问，效果够好就不用搭 RAG。

**出处**：RAG 的适用边界与失败模式在综述论文里有分类讨论（见下）。

- [RAG 综述论文（Gao 等，arXiv 2023）](https://arxiv.org/abs/2312.10997)
- [Pinecone RAG 指南](https://www.pinecone.io/learn/retrieval-augmented-generation/)

---
<!-- 微型指南 · 第二站（上手） · 约 7 分钟 -->
