---
zh: 怎么验证 AI 的输出
en: How to Verify AI Output
kind: guide
station: 3
ord: 1
span: 7
lead: "AI 会一本正经地编造事实。这份指南讲怎么把「它说的」变成「你能核对的」。"
points: ["把输出里的事实拆成一条条可核对的断言：数字、日期、人名、引用。", "凡是引用（论文、法条、接口名），去原始出处核对，别信它给的链接标题。", "关键数字要求它给出处；给不出处的数字当假设处理。", "让它自查会漏掉大半错误，交叉核对（换来源、换工具）才可靠。", "越具体的领域（本地法规、自家数据）越要人来核，通用模型没有这些事实。"]
terms: ["幻觉", "幻觉的成因", "能力边界"]
refs:
  - ["Ji 等《Hallucination in Large Language Models: A Survey》（ACM Computing Surveys 2023）", "https://arxiv.org/abs/2202.03629", "Ji et al., Hallucination Survey (ACM Computing Surveys 2023)"]
  - ["Anthropic 官方研究页《Tracing the thoughts of a large language model》", "https://www.anthropic.com/research/tracing-thoughts-language-model", "Anthropic research: Tracing the thoughts of a large language model"]
---

# 怎么验证 AI 的输出（How to Verify AI Output）

**这份指南解决什么**：AI 会一本正经地编造事实。这份指南讲怎么把「它说的」变成「你能核对的」。

**怎么做**：
1. 把输出里的事实拆成一条条可核对的断言：数字、日期、人名、引用。
2. 凡是引用（论文、法条、接口名），去原始出处核对，别信它给的链接标题。
3. 关键数字要求它给出处；给不出处的数字当假设处理。
4. 让它自查会漏掉大半错误，交叉核对（换来源、换工具）才可靠。
5. 越具体的领域（本地法规、自家数据）越要人来核，通用模型没有这些事实。

**出处**：方法依据幻觉综述与模型行为研究（见下）。

- [Ji 等《Hallucination in Large Language Models: A Survey》](https://arxiv.org/abs/2202.03629)
- [Anthropic《Tracing the thoughts of a large language model》](https://www.anthropic.com/research/tracing-thoughts-language-model)

---
<!-- 微型指南 · 第三站（用深） · 约 7 分钟 -->
