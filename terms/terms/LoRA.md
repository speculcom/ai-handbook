---
zh: "LoRA"
en: "LoRA (Low-Rank Adaptation)"
purpose: "省钱的微调法：冻住原权重，只训练一小块「补丁」。"
def: ["LoRA 冻结预训练权重，往每层注入可训练的低秩分解矩阵。", "对比 GPT-3 175B 全量微调：可训练参数约少一万倍，显存需求约降三倍。", "训练完可把低秩矩阵并入原权重，不增加推理延迟。", "社区里大量消费级显卡上跑出来的微调模型用的就是它。"]
why: "「在自家显卡上微调」从科幻变成日常，LoRA 是分水岭。选微调方案时它是默认起点。"
refs:
  - ["Hu 等《LoRA: Low-Rank Adaptation of Large Language Models》（2021）", "https://arxiv.org/abs/2106.09685", "Hu et al., LoRA: Low-Rank Adaptation of Large Language Models (2021)"]
domain: "model"
purposeTag: "apply"
level: 2
layer: "二"
ord: 28
---

# LoRA（低秩适配）

**解决什么问题**：省钱的微调法：冻住原权重，只训练一小块「补丁」。

LoRA 冻结预训练权重，往每层注入可训练的低秩分解矩阵。

对比 GPT-3 175B 全量微调：可训练参数约少一万倍，显存需求约降三倍。

训练完可把低秩矩阵并入原权重，不增加推理延迟。

社区里大量消费级显卡上跑出来的微调模型用的就是它。

**为什么需要知道**：「在自家显卡上微调」从科幻变成日常，LoRA 是分水岭。选微调方案时它是默认起点。

---

<!-- 站：第二站 · 上手 · 认清 AI 的能力与边界。知道它什么时候会出错，比知道它多强更重要。 -->
