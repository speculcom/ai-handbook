---
zh: "LLM-as-a-Judge（模型评审）"
en: "LLM-as-a-Judge"
alias: ["模型评审", "LLM judge", "AI 评审"]
purpose: "让一个强模型按评分标准给另一个模型的回答打分或比较。"
def: ["常见做法是给评审模型题目、参考答案和评分维度，让它输出分数或选择。", "MT-Bench 与 Chatbot Arena 的论文系统检验了位置偏差、冗长偏差和自我偏好等问题。"]
why: "人工评测贵且慢；模型评审能扩大规模，但必须校准偏差、抽样人工复核，不能把分数当 ground truth。"
refs:
  - ["Zheng 等 · Judging LLM-as-a-Judge（arXiv 2306.05685）", "https://arxiv.org/abs/2306.05685", "Zheng et al., Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"]
  - ["FastChat · 官方仓库", "https://github.com/lm-sys/FastChat", "FastChat repository"]
domain: "choice"
purposeTag: "judge"
level: 3
layer: "三"
ord: 52
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-judge.svg"
figure_caption: "评审模型读题目、参考答案和评分标准，输出分数或偏好；它的偏差需要抽样人工复核。"
figure_caption_en: "A judge reads the question, reference answer and rubric, then outputs a score or preference; its biases need human spot checks."
---

# LLM-as-a-Judge（模型评审）（LLM-as-a-Judge）

**解决什么问题**：让一个强模型按评分标准给另一个模型的回答打分或比较。

常见做法是给评审模型题目、参考答案和评分维度，让它输出分数或选择。

MT-Bench 与 Chatbot Arena 的论文系统检验了位置偏差、冗长偏差和自我偏好等问题。

**别名**：模型评审、LLM judge、AI 评审

**为什么需要知道**：人工评测贵且慢；模型评审能扩大规模，但必须校准偏差、抽样人工复核，不能把分数当 ground truth。

**看具体例子**：
- [Zheng 等 · Judging LLM-as-a-Judge（arXiv 2306.05685）](https://arxiv.org/abs/2306.05685)
- [FastChat · 官方仓库](https://github.com/lm-sys/FastChat)

---

<!-- 站：第三站 · 由 2026-11-17 内容补齐批次新增。 -->
