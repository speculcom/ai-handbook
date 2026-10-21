---
zh: "CPU 推理"
en: "CPU Inference"
purpose: "没有显卡也能跑模型。"
def: ["llama.cpp 官方称其目标。概括是「以最少配置、在广泛硬件上实现 LLM（与 VLM）推理」。", "官方列出 BLAS、ZenDNN、OpenVINO 等面向 CPU 的后端。"]
why: "决定「没有显卡能不能玩」。能不能跑、跑多快，取决于后端与硬件。"
refs:
  - ["llama.cpp 官方仓库", "https://github.com/ggml-org/llama.cpp", "llama.cpp repository"]
domain: "infra"
purposeTag: "judge"
level: 5
layer: "五"
ord: 25
---

# CPU 推理（CPU Inference）

**解决什么问题**：没有显卡也能跑模型。

llama.cpp 官方称其目标。概括是「以最少配置、在广泛硬件上实现 LLM（与 VLM）推理」。

官方列出 BLAS、ZenDNN、OpenVINO 等面向 CPU 的后端。

**为什么需要知道**：决定「没有显卡能不能玩」。能不能跑、跑多快，取决于后端与硬件。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->
