---
zh: "MLA"
en: "Multi-head Latent Attention"
purpose: "把长上下文里最占显存的 KV 缓存压成低秩潜向量，再在推理时展开。"
def: ["每个头的 Key / Value 先投影到一个低秩潜空间，缓存只存这个潜向量。", "推理时再把潜向量投影回各头的 Key / Value，省的是显存，不是计算。", "DeepSeek-V2 提出，后续 V3 / V4 系列沿用并继续调整。"]
why: "长上下文的第一道墙不是算力，是 KV 缓存。MLA 让「1M 上下文」在单卡或多卡上变得可行，也改变了推理框架的缓存布局；不理解它，就看不懂为什么同样参数量的模型，长上下文成本会差一个数量级。"
refs:
  - ["DeepSeek-V2（论文 §2）", "https://arxiv.org/abs/2405.04434", "DeepSeek-V2 §2 (paper)"]
  - ["DeepSeek-V3（技术报告）", "https://arxiv.org/abs/2412.19437", "DeepSeek-V3 technical report (paper)"]
domain: "infra"
purposeTag: "learn"
level: 5
layer: "五"
ord: 41
last_verified: "2026-11-18"
verified_scope: "refs"
---

# MLA（Multi-head Latent Attention）

**解决什么问题**：标准多头注意力要为每个 token、每个头缓存完整的 Key 和 Value；上下文一长，KV 缓存就比模型权重还大。MLA 把 K/V 先压成一个低秩潜向量，缓存只存潜向量，推理时再投影回各头。

**省在哪**：省的是 HBM 占用与带宽，不是 FLOPs。投影本身有计算，但相比「把整段 KV 反复读写」，显存与带宽的收益更大。它常与 RoPE 解耦、吸收矩阵等实现细节一起出现，具体版本差异要看论文与推理框架。

**为什么需要知道**：它解释了「同样 1M 上下文，为什么有些模型单卡能跑、有些要八卡」。也解释了为什么推理框架要专门为 MLA 写 kernel，不能拿标准 attention 直接套。

**边界**：MLA 不是「无限上下文」；压缩会损失信息，低秩维度是超参数。它也不是所有模型都适用：训练时没用 MLA 的模型，推理时不能靠改缓存格式获得同等收益。不同实现的「等效 KV 缓存」数字不能直接横比。

---
<!-- 站：第五站 · 选型 · 长上下文成本先看缓存，不只看参数量。 -->

