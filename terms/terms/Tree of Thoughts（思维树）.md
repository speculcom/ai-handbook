---
zh: "Tree of Thoughts（思维树）"
en: "Tree of Thoughts"
purpose: "把一条思维链拆成可分支、可回退的搜索树，让模型在解题时试错。"
def: ["每个节点是一段中间思路，模型可以生成多个候选分支。", "用评估函数给分支打分，保留有希望的、剪掉明显走不通的。", "允许回退到上层节点重新展开，而不是沿着一条错路走到黑。"]
why: "复杂规划、数学题和多步写作经常「一步错、步步错」。思维树把一次性生成变成可搜索的过程。"
refs:
  - ["Tree of Thoughts 论文（arXiv）", "https://arxiv.org/abs/2305.10601", "Tree of Thoughts: Deliberate Problem Solving with Large Language Models (arXiv 2305.10601)"]
domain: "agent"
purposeTag: "apply"
level: 3
layer: "三"
ord: 57
last_verified: "2026-11-19"
---

# Tree of Thoughts（思维树）（Tree of Thoughts）

**解决什么问题**：把一条思维链拆成可分支、可回退的搜索树，让模型在解题时试错。

每个节点是一段中间思路，模型可以生成多个候选分支。

用评估函数给分支打分，保留有希望的、剪掉明显走不通的。

允许回退到上层节点重新展开，而不是沿着一条错路走到黑。

**为什么需要知道**：复杂规划、数学题和多步写作经常「一步错、步步错」。思维树把一次性生成变成可搜索的过程。

---

<!-- 站：第三站 · 用深 · 决定好不好用的具体做法。 -->
