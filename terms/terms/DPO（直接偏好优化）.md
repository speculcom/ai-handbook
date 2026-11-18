---
zh: "DPO（直接偏好优化）"
en: "DPO (Direct Preference Optimization)"
alias: ["直接偏好优化", "direct preference optimization"]
purpose: "用成对的「更好 / 更差」回答直接微调模型，省掉奖励模型和强化学习。"
def: ["DPO 把 RLHF 的目标改写成分类损失：提高优选回答的概率、降低劣选回答的概率。", "它不需要在训练中从模型采样，也不需要单独训练奖励模型。"]
why: "想让模型更符合偏好但不想搭 PPO 那一套时，DPO 是更轻的选择；偏好数据的覆盖面仍然决定效果上限。"
refs:
  - ["Rafailov 等 · DPO（arXiv 2305.18290）", "https://arxiv.org/abs/2305.18290", "Rafailov et al., Direct Preference Optimization"]
  - ["Ouyang 等 · InstructGPT（arXiv 2203.02155）", "https://arxiv.org/abs/2203.02155", "Ouyang et al., Training language models to follow instructions with human feedback"]
domain: "model"
purposeTag: "apply"
level: 3
layer: "三"
ord: 51
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-dpo.svg"
figure_caption: "DPO 跳过奖励模型：直接拿「优选 / 劣选」成对数据，用一个分类损失把两者的概率拉开。"
figure_caption_en: "DPO skips the reward model: paired preferred and rejected answers are used directly in a classification-style loss."
---

# DPO（直接偏好优化）（DPO (Direct Preference Optimization)）

**解决什么问题**：用成对的「更好 / 更差」回答直接微调模型，省掉奖励模型和强化学习。

DPO 把 RLHF 的目标改写成分类损失：提高优选回答的概率、降低劣选回答的概率。

它不需要在训练中从模型采样，也不需要单独训练奖励模型。

**别名**：直接偏好优化、direct preference optimization

**为什么需要知道**：想让模型更符合偏好但不想搭 PPO 那一套时，DPO 是更轻的选择；偏好数据的覆盖面仍然决定效果上限。

**看具体例子**：
- [Rafailov 等 · DPO（arXiv 2305.18290）](https://arxiv.org/abs/2305.18290)
- [Ouyang 等 · InstructGPT（arXiv 2203.02155）](https://arxiv.org/abs/2203.02155)

---

<!-- 站：第三站 · 由 2026-11-17 内容补齐批次新增。 -->
