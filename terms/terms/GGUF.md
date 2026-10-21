---
zh: "GGUF"
en: "GGUF"
purpose: "本地跑模型的事实标准文件格式。llama.cpp 生态几乎只认它。"
def: ["llama.cpp 项目定义的模型文件格式，把模型结构与量化参数打包在一起。", "目前社区量化版本绝大多数产出这个格式。"]
why: "如果你要本地跑模型，下载到的基本就是它。非 GGUF 格式往往需要额外转换步骤。"
refs:
  - ["GGUF 格式规范", "https://github.com/ggml-org/ggml/blob/master/docs/gguf.md", "GGUF format specification"]
domain: "infra"
purposeTag: "apply"
level: 5
layer: "五"
ord: 5
---

# GGUF（GGUF）

**解决什么问题**：本地跑模型的事实标准文件格式。llama.cpp 生态几乎只认它。

llama.cpp 项目定义的模型文件格式，把模型结构与量化参数打包在一起。

目前社区量化版本绝大多数产出这个格式。

**为什么需要知道**：如果你要本地跑模型，下载到的基本就是它。非 GGUF 格式往往需要额外转换步骤。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->