---
zh: "SFT（监督微调）"
en: "SFT (Supervised Fine-Tuning)"
alias: ["监督微调", "指令微调", "supervised fine-tuning"]
purpose: "用人工写好的示范答案继续训练模型，让它学会按指令回答。"
def: ["SFT 在预训练模型上做有监督学习，数据是「指令 + 期望回答」。", "InstructGPT 先用标注员示范做 SFT，再用人类偏好排序做强化学习。"]
why: "它是把基座模型变成可用助手的第一步。SFT 数据质量比数量更重要，也会把标注者的风格带进模型。"
refs:
  - ["Ouyang 等 · InstructGPT（arXiv 2203.02155）", "https://arxiv.org/abs/2203.02155", "Ouyang et al., Training language models to follow instructions with human feedback"]
  - ["Rafailov 等 · DPO（arXiv 2305.18290）", "https://arxiv.org/abs/2305.18290", "Rafailov et al., Direct Preference Optimization"]
domain: "model"
purposeTag: "apply"
level: 3
layer: "三"
ord: 50
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-training-stages.svg"
figure_caption: "常见的三步。预训练学语言与知识，SFT 学按指令作答，偏好优化让回答更符合人类选择。"
figure_caption_en: "A common three-stage path: pretraining learns language and knowledge, SFT learns instruction following, preference optimization aligns answers with human choices."
---

# SFT（监督微调）（SFT (Supervised Fine-Tuning)）

**解决什么问题**：用人工写好的示范答案继续训练模型，让它学会按指令回答。

SFT 在预训练模型上做有监督学习，数据是「指令 + 期望回答」。

InstructGPT 先用标注员示范做 SFT，再用人类偏好排序做强化学习。

**别名**：监督微调、指令微调、supervised fine-tuning

**为什么需要知道**：它是把基座模型变成可用助手的第一步。SFT 数据质量比数量更重要，也会把标注者的风格带进模型。

**看具体例子**：
- [Ouyang 等 · InstructGPT（arXiv 2203.02155）](https://arxiv.org/abs/2203.02155)
- [Rafailov 等 · DPO（arXiv 2305.18290）](https://arxiv.org/abs/2305.18290)

---

<!-- 站：第三站 · 由 2026-11-17 内容补齐批次新增。 -->
