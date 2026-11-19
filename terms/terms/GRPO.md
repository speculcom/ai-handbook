---
zh: "GRPO"
en: "Group Relative Policy Optimization"
purpose: "用同一道题的一组回答互相比较，代替一个单独训练的价值网络来估优势。"
def: ["对同一个问题采样一组回答，用组内平均分作为基线，算每个回答的相对优势。", "它属于强化学习，但省掉了 PPO 里与策略同规模的价值网络（critic）。", "DeepSeekMath 提出，DeepSeek-R1 等推理模型把它带进了大规模后训练。"]
why: "大模型后训练最贵的是「判断一个回答比平均好多少」。GRPO 用组内比较把这件事变成可计算的相对值，显存和工程复杂度都降了一档；理解它，才能看懂「推理能力是训出来的」这句话到底在训什么。"
refs:
  - ["DeepSeekMath（论文 §4）", "https://arxiv.org/abs/2402.03300", "DeepSeekMath §4 (paper)"]
  - ["DeepSeek-R1（技术报告）", "https://arxiv.org/abs/2501.12948", "DeepSeek-R1 technical report (paper)"]
domain: "concept"
purposeTag: "learn"
level: 5
layer: "五"
ord: 40
last_verified: "2026-11-18"
verified_scope: "refs"
---

# GRPO（Group Relative Policy Optimization）

**解决什么问题**：强化学习需要一个「基线」来判断某个回答比平均好多少。PPO 用 critic 估基线，critic 和策略一样大，显存与训练成本翻倍。GRPO 改用同一道题的一组回答互相比较，把基线变成组内平均。

**怎么做**：对每个问题采样 G 个回答，分别打分；把每个回答的分数减去组内平均，得到相对优势；再用这个相对优势更新策略，并对「偏离旧策略太远」做裁剪。没有独立 critic，奖励模型仍然需要。

**为什么需要知道**：它解释了为什么「推理模型」可以在有限算力下做大规模 RL；也解释了为什么组大小、奖励设计、采样温度会直接影响训练稳定性。组太小，优势估计噪声大；组太大，采样成本高。

**边界**：GRPO 不是「无需奖励模型」；它仍依赖可打的奖励（规则、验证器或偏好模型）。它也不保证 reasoning 一定泛化到训练分布之外。组内比较假定同一道题的回答可比，开放式创作类任务并不天然满足。

---
<!-- 站：第五站 · 选型 · 训练方法决定「能力从哪来、成本花在哪」。 -->

