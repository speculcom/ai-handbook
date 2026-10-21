---
zh: "logits 与概率分布"
en: "Logits and Probability Distribution"
purpose: "模型每一步输出的不是词，而是整个词表的分数表。采样参数都作用在这上面。"
def: ["每一步，模型给词表里每个候选 token 打一个分数，即 logits。", "分数经 softmax 变成概率分布：所有候选的概率加起来为 1。", "温度、top-k、top-p 都是在这张分布上做手脚。"]
why: "理解了它，采样参数不再是玄学。它们改的是分布的形状，不是模型的「想法」。"
refs:
  - ["Jurafsky & Martin《Speech and Language Processing》第 3 章（语言模型输出词表上的概率分布）", "https://web.stanford.edu/~jurafsky/slp3/3.pdf", "Jurafsky & Martin, Speech and Language Processing, ch. 3"]
  - ["Holtzman 等《The Curious Case of Neural Text Degeneration》§3.3（温度采样的讨论）", "https://arxiv.org/abs/1904.09751", "Holtzman et al., The Curious Case of Neural Text Degeneration, §3.3"]
domain: "concept"
purposeTag: "learn"
level: 4
layer: "四"
ord: 22
---

# logits 与概率分布（Logits and Probability Distribution）

**解决什么问题**：模型每一步输出的不是词，而是整个词表的分数表。采样参数都作用在这上面。

每一步，模型给词表里每个候选 token 打一个分数，即 logits。

分数经 softmax 变成概率分布：所有候选的概率加起来为 1。

温度、top-k、top-p 都是在这张分布上做手脚。

**为什么需要知道**：理解了它，采样参数不再是玄学。它们改的是分布的形状，不是模型的「想法」。

---

<!-- 站：第四站 · 看懂 · 理解为什么会有这些表现。看不懂这一站，前面的词你都只能背。 -->
