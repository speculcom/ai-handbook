---
zh: "vLLM"
en: "vLLM"
purpose: "在服务器上高并发跑模型的服务引擎。"
def: ["面向生产的高吞吐推理引擎，通过连续批处理等手段提升并发效率。"]
why: "个人本地部署用不上它。但如果你要给别人提供 API，就需要这一类工具。"
refs:
  - ["vLLM 官方文档", "https://docs.vllm.ai/en/latest/", "vLLM documentation"]
  - ["从业者深版：跑起来深水专题（AI 模型站）", "https://models.specul.com/guides/serving-deep-dive.html", "Practitioner deep-dive: serving deep dive guide (AI Models site)"]
domain: "infra"
purposeTag: "learn"
level: 5
layer: "五"
ord: 7
---

# vLLM（vLLM）

**解决什么问题**：在服务器上高并发跑模型的服务引擎。

面向生产的高吞吐推理引擎，通过连续批处理等手段提升并发效率。

**为什么需要知道**：个人本地部署用不上它。但如果你要给别人提供 API，就需要这一类工具。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->