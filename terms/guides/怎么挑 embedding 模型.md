---
zh: 怎么挑 embedding 模型
en: How to Choose an Embedding Model
kind: guide
station: 2
ord: 8
span: 8
lead: "embedding 模型决定「意思相近」怎么算。挑错模型，后面检索、重排、回答全跟着吃亏。"
points: ["先看语种支持：中文任务要在中文或多语基准上看分数，英文榜好看不等于中文好用。", "看维度与成本：维度高通常存储和计算更贵，按数据量估。", "用 MTEB 这类基准初筛，再用自己数据实测，榜单只是起点。", "查询与文档要同模型：混用不同模型算的向量，距离没有意义。", "注意归一化口径：有的模型输出要归一化才能用余弦相似度。", "换模型要重建索引：旧向量和新向量不兼容，迁移等于重算一遍。"]
terms: ["向量 - 嵌入", "向量数据库", "联网 - 检索增强"]
refs:
  - ["MTEB 基准论文（Muennighoff 等，arXiv 2022）", "https://arxiv.org/abs/2210.07316", "MTEB: Massive Text Embedding Benchmark (arXiv 2210.07316)"]
  - ["Qdrant 什么是向量数据库（官方）", "https://qdrant.tech/documentation/overview/what-is-qdrant/", "What is Qdrant? Vector databases"]
---

# 怎么挑 embedding 模型（How to Choose an Embedding Model）

**这份指南解决什么**：embedding 模型决定「意思相近」怎么算。挑错模型，后面检索、重排、回答全跟着吃亏。

**怎么做**：
1. 先看语种支持：中文任务要在中文或多语基准上看分数，英文榜好看不等于中文好用。
2. 看维度与成本：维度高通常存储和计算更贵，按数据量估。
3. 用 MTEB 这类基准初筛，再用自己数据实测，榜单只是起点。
4. 查询与文档要同模型：混用不同模型算的向量，距离没有意义。
5. 注意归一化口径：有的模型输出要归一化才能用余弦相似度。
6. 换模型要重建索引：旧向量和新向量不兼容，迁移等于重算一遍。

**出处**：embedding 横向比较可参考 MTEB 基准论文；向量存储的工程口径见 Qdrant 官方文档（见下）。

- [MTEB 基准论文（Muennighoff 等 2022）](https://arxiv.org/abs/2210.07316)
- [Qdrant 什么是向量数据库（官方）](https://qdrant.tech/documentation/overview/what-is-qdrant/)

---
<!-- 微型指南 · 第二站（上手） · 约 8 分钟 -->
