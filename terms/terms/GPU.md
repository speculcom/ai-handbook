---
zh: "GPU"
en: "Graphics Processing Unit"
alias: ["显卡", "图形处理器"]
purpose: "真正做矩阵运算的芯片。跑大模型靠它，CPU 很慢。"
def: ["擅长大规模并行计算的处理器，最初为图形渲染设计，现在是大模型训练与推理的主力。"]
why: "决定你「能不能跑、跑多快」。同一张卡，显存大小比算力型号更卡脖子。"
refs:
  - ["NVIDIA CUDA 工具包文档", "https://docs.nvidia.com/cuda/", "CUDA Toolkit documentation"]
  - ["CUDA C++ 编程指南", "https://docs.nvidia.com/cuda/cuda-programming-guide/index.html", "CUDA C++ Programming Guide"]
domain: "infra"
purposeTag: "learn"
level: 5
layer: "五"
ord: 1
---

# GPU（Graphics Processing Unit）

**解决什么问题**：真正做矩阵运算的芯片。跑大模型靠它，CPU 很慢。

擅长大规模并行计算的处理器，最初为图形渲染设计，现在是大模型训练与推理的主力。

**别名**：显卡、图形处理器

**为什么需要知道**：决定你「能不能跑、跑多快」。同一张卡，显存大小比算力型号更卡脖子。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->