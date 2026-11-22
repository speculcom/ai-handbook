---
zh: "Byteification（字节化）"
en: "Byteification"
alias: ["字节化", "字节级语言模型", "tokenizer-free"]
purpose: "把已经训练好的子词模型改造为直接读写 UTF-8 字节的模型，去掉固定分词器，同时尽量保留原模型的能力。"
def: ["Byteification 是一种特殊的 tokenizer transfer。用两阶段训练把子词模型改成字节级模型。先复制原模型行为，再端到端适配。", "它不等于从头训练 byte-level 模型。重点是复用原模型的参数与生态，降低改造成本。"]
why: "分词器会把代码、数学、生物序列等细粒度信息切碎，也会让新语言、新符号需要扩表。字节化让模型直接处理原始字节，对字符级任务和多语言扩展更灵活。"
refs:
  - ["Retrofitting language models to operate over bytes · Nature（2026）", "https://www.nature.com/articles/s41586-026-11111-4", "Retrofitting language models to operate over bytes, Nature 2026"]
  - ["Byte Language Models · arXiv 2610.05978", "https://arxiv.org/abs/2610.05978", "Byte Language Models: Scaling, Emergent Abstractions, and Information Allocation"]
domain: "model"
purposeTag: "learn"
level: 3
layer: "三"
ord: 75
last_verified: "2026-11-21"
verified_scope: "refs"
---

# Byteification（字节化）（Byteification）

**解决什么问题**

把已经训练好的子词模型改造为直接读写 UTF-8 字节的模型，去掉固定分词器，同时尽量保留原模型的能力。

Byteification 是一种特殊的 tokenizer transfer。用两阶段训练把子词模型改成字节级模型。先复制原模型行为，再端到端适配。

它不等于从头训练 byte-level 模型。重点是复用原模型的参数与生态，降低改造成本。

**为什么需要知道**

分词器会把代码、数学、生物序列等细粒度信息切碎，也会让新语言、新符号需要扩表。字节化让模型直接处理原始字节，对字符级任务和多语言扩展更灵活。

**边界**

字节序列比子词序列长，训练和推理成本更高。现有推理栈、KV 缓存和工具链未必适配。字节化也不会自动带来更强的语义理解，字符级鲁棒性与下游能力要分开评测。

**怎么判断用不用**

代码、字符级推理、多语言长尾是主要受益场景。普通对话与通用文本，成熟子词模型仍更便宜、生态更完整。

---
<!-- 站：第三站 · 用深 · 决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。 -->
