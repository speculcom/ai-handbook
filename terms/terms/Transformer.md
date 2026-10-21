---
zh: "Transformer"
en: "Transformer"
purpose: "当前所有主流大模型共用的底层架构。"
def: ["一种神经网络结构，核心是「注意力机制」，用来处理一整段文本之间的关系。", "它能并行处理整句话，而不是一个词一个词往后读——这是它能训练出万亿参数规模的原因。"]
why: "它是大模型的「根」。理解它，你才能理解上下文窗口、幻觉、KV 缓存这些概念从哪来。"
refs:
  - ["Attention Is All You Need（论文）", "https://arxiv.org/abs/1706.03762", "Attention Is All You Need (paper)"]
  - ["Hugging Face 课程（Transformer）", "https://huggingface.co/learn/nlp-course/chapter1/4", "How do Transformers work? (Hugging Face NLP course)"]
domain: "concept"
purposeTag: "learn"
level: 4
layer: "四"
ord: 1
---

# Transformer（Transformer）

**解决什么问题**：当前所有主流大模型共用的底层架构。

一种神经网络结构，核心是「注意力机制」，用来处理一整段文本之间的关系。

它能并行处理整句话，而不是一个词一个词往后读——这是它能训练出万亿参数规模的原因。

**为什么需要知道**：它是大模型的「根」。理解它，你才能理解上下文窗口、幻觉、KV 缓存这些概念从哪来。

---

<!-- 站：第四站 · 看懂 · 理解为什么会有这些表现。看不懂这一站，前面的词你都只能背。 -->