---
zh: "GPU 层卸载"
en: "-ngl / Offload"
purpose: "把模型一部分交给 GPU、一部分留在 CPU，显存不够时的妥协手段。"
def: ["按层分配计算位置：显存够的部分放 GPU，剩下的放 CPU 由内存承担。", "llama.cpp 里通常用 `-ngl` 参数控制。"]
why: "它让「显存差一点」的模型也能跑起来，代价是速度下降明显。这是权衡，不是免费午餐。"
refs:
  - ["按显存倒推选档位（千问 3.8）", "https://models.specul.com/series/qwen3-8/#b0", "Choosing by VRAM, backwards (Qwen3.8)"]
domain: "infra"
purposeTag: "apply"
level: 5
layer: "五"
ord: 8
---

# GPU 层卸载（-ngl / Offload）

**解决什么问题**：把模型一部分交给 GPU、一部分留在 CPU，显存不够时的妥协手段。

按层分配计算位置：显存够的部分放 GPU，剩下的放 CPU 由内存承担。

llama.cpp 里通常用 `-ngl` 参数控制。

**为什么需要知道**：它让「显存差一点」的模型也能跑起来，代价是速度下降明显。这是权衡，不是免费午餐。

**看具体例子**：
- [显存不够时的选型思路](https://models.specul.com/)

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->