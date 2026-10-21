---
zh: "KV 缓存"
en: "KV Cache"
purpose: "让模型逐字生成时不用每一步都重算整段话，生成速度才可用。"
def: ["把已经算过的注意力中间结果缓存起来，只为新 token 计算增量。", "代价是它**持续占用显存**——这直接决定了你的显存能撑多长的上下文。"]
why: "这是本地部署时最常见的 OOM（显存不够）原因。上下文开大就先撞它。"
refs:
  - ["vLLM 前缀缓存设计", "https://docs.vllm.ai/en/stable/design/prefix_caching/", "Automatic Prefix Caching – vLLM design docs"]
  - ["vLLM KV 缓存管理", "https://docs.vllm.ai/en/latest/design/hybrid_kv_cache_manager/", "Hybrid KV Cache Manager – vLLM design docs"]
  - ["从业者深版：跑起来深水专题（AI 模型站）", "https://models.specul.com/guides/serving-deep-dive.html", "Practitioner deep-dive: serving deep dive guide (AI Models site)"]
domain: "infra"
purposeTag: "learn"
level: 4
layer: "四"
ord: 5
---

# KV 缓存（KV Cache）

**解决什么问题**：让模型逐字生成时不用每一步都重算整段话，生成速度才可用。

把已经算过的注意力中间结果缓存起来，只为新 token 计算增量。

代价是它**持续占用显存**——这直接决定了你的显存能撑多长的上下文。

**为什么需要知道**：这是本地部署时最常见的 OOM（显存不够）原因。上下文开大就先撞它。

**看具体例子**：
- [显存与上下文的关系](https://models.specul.com/)

---

<!-- 站：第四站 · 看懂 · 理解为什么会有这些表现。看不懂这一站，前面的词你都只能背。 -->