---
zh: 怎么评测 RAG 的效果
en: How to Evaluate a RAG System
kind: guide
station: 2
ord: 9
span: 8
lead: "RAG 出问题可能出在检索，也可能出在生成。评测要分开量，不然修错地方。"
points: ["先备评测集：真实问题加标准答案，几十条就够起步。", "检索侧量召回：该找到的块有没有进候选，这是第一道关。", "生成侧量忠实度：回答里的每句话能不能被检索到的块支撑。", "答案相关性单独量：答得对题但依据错，也是问题。", "用 RAGAS 这类框架自动评，人工抽查校准它的判分。", "分场景看分数：不同问题类型分开统计，平均分掩盖短板。"]
terms: ["联网 - 检索增强", "模型评测的局限", "基准测试"]
refs:
  - ["RAGAS 论文（Es 等，arXiv 2023）", "https://arxiv.org/abs/2309.15217", "Ragas: Automated Evaluation of Retrieval Augmented Generation (arXiv 2309.15217)"]
  - ["RAGAS 官方文档", "https://docs.ragas.io/en/stable/", "RAGAS official documentation"]
  - ["BEIR 零样本检索基准论文（Thakur 等，arXiv 2021）", "https://arxiv.org/abs/2104.08663", "BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models (arXiv 2104.08663)"]
---

# 怎么评测 RAG 的效果（How to Evaluate a RAG System）

**这份指南解决什么**：RAG 出问题可能出在检索，也可能出在生成。评测要分开量，不然修错地方。

**怎么做**：
1. 先备评测集：真实问题加标准答案，几十条就够起步。
2. 检索侧量召回：该找到的块有没有进候选，这是第一道关。
3. 生成侧量忠实度：回答里的每句话能不能被检索到的块支撑。
4. 答案相关性单独量：答得对题但依据错，也是问题。
5. 用 RAGAS 这类框架自动评，人工抽查校准它的判分。
6. 分场景看分数：不同问题类型分开统计，平均分掩盖短板。

**出处**：检索侧零样本评测可参考 BEIR 基准；生成侧自动评测指标见 RAGAS 论文与官方文档（见下）。

- [RAGAS 论文（Es 等，arXiv 2023）](https://arxiv.org/abs/2309.15217)
- [RAGAS 官方文档](https://docs.ragas.io/en/stable/)
- [BEIR 零样本检索基准论文（Thakur 等，arXiv 2021）](https://arxiv.org/abs/2104.08663)

---
<!-- 微型指南 · 第二站（上手） · 约 8 分钟 -->
