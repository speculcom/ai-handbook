---
zh: "怎么用 AI 搭 RAG 语料"
en: "How to build a RAG corpus with AI"
kind: "guide"
station: 3
ord: 34
span: 8
lead: "RAG 的效果八成取决于语料，而不是模型；先把「收什么、怎么切、怎么测」定下来。"
points: ["先定问题域和拒答边界：哪些问题必须答、哪些必须说不知道；语料只收能支撑这些问题的内容。", "文档先去噪（页眉页脚、广告、导航），保留标题层级和来源 URL；扫描件先 OCR。", "按语义结构切块，不按固定字数硬切；每块带文档标题、章节路径和来源链接。", "给每块生成「可检索的问题/摘要」并保留原文，向量检索用问题、生成答案用原文。", "建一个小评测集：真实问题 + 标准答案 + 必须引用的文档；每次换切法/模型都重跑。", "定期清过期文档，保留版本与删除记录；不要让旧政策和新政策同时被检索到。"]
terms: ["分块", "混合检索", "检索质量度量"]
refs:
  - ["LlamaIndex 文档", "https://docs.llamaindex.ai/en/stable/", "LlamaIndex documentation"]
  - ["OpenAI File Search", "https://platform.openai.com/docs/assistants/tools/file-search", "OpenAI File Search"]
last_verified: "2026-11-19"
verified_scope: "refs"
---

# 怎么用 AI 搭 RAG 语料（How to build a RAG corpus with AI）

**这份指南解决什么**：RAG 的效果八成取决于语料，而不是模型；先把「收什么、怎么切、怎么测」定下来。

**怎么做**：
1. 先定问题域和拒答边界：哪些问题必须答、哪些必须说不知道；语料只收能支撑这些问题的内容。
2. 文档先去噪（页眉页脚、广告、导航），保留标题层级和来源 URL；扫描件先 OCR。
3. 按语义结构切块，不按固定字数硬切；每块带文档标题、章节路径和来源链接。
4. 给每块生成「可检索的问题/摘要」并保留原文，向量检索用问题、生成答案用原文。
5. 建一个小评测集：真实问题 + 标准答案 + 必须引用的文档；每次换切法/模型都重跑。
6. 定期清过期文档，保留版本与删除记录；不要让旧政策和新政策同时被检索到。

**出处**：
- [LlamaIndex 文档](https://docs.llamaindex.ai/en/stable/)
- [OpenAI File Search](https://platform.openai.com/docs/assistants/tools/file-search)

---

<!-- 微型指南 · 第3站 · 约8分钟 -->
