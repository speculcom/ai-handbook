---
zh: "HBM（高带宽显存）"
en: "HBM (High Bandwidth Memory)"
alias: ["高带宽显存", "HBM3e", "HBM 显存"]
purpose: "堆叠在 GPU 旁边的高带宽显存，决定大模型能不能装下、跑多快。"
def: ["HBM 用硅通孔把多层 DRAM 垂直堆叠，再通过宽接口与 GPU 相连。", "以 NVIDIA DGX B200 为例：8 张 GPU 共 1,440 GB HBM3e、合计 64 TB/s 带宽，折合单卡约 180 GB 与 8 TB/s。"]
why: "显存容量决定能装多少参数和 KV cache，带宽决定解码速度；两者常是比算力更紧的瓶颈。"
refs:
  - ["NVIDIA · DGX B200 规格", "https://www.nvidia.com/en-us/data-center/dgx-b200/", "NVIDIA DGX B200 specifications"]
  - ["NVIDIA · H100 规格", "https://www.nvidia.com/en-us/data-center/h100/", "NVIDIA H100 specifications"]
domain: "infra"
purposeTag: "learn"
level: 5
layer: "五"
ord: 39
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-hbm.svg"
figure_caption: "HBM 与 GPU 同封装：多层 DRAM 堆叠、超宽接口，换来远高于 GDDR 的带宽，但容量受封装限制。"
figure_caption_en: "HBM sits in the GPU package: stacked DRAM layers and a very wide interface deliver far more bandwidth than GDDR, but capacity is capped by the package."
---

# HBM（高带宽显存）（HBM (High Bandwidth Memory)）

**解决什么问题**：堆叠在 GPU 旁边的高带宽显存，决定大模型能不能装下、跑多快。

HBM 用硅通孔把多层 DRAM 垂直堆叠，再通过宽接口与 GPU 相连。

以 NVIDIA DGX B200 为例：8 张 GPU 共 1,440 GB HBM3e、合计 64 TB/s 带宽，折合单卡约 180 GB 与 8 TB/s。

**别名**：高带宽显存、HBM3e、HBM 显存

**为什么需要知道**：显存容量决定能装多少参数和 KV cache，带宽决定解码速度；两者常是比算力更紧的瓶颈。

**看具体例子**：
- [NVIDIA · DGX B200 规格](https://www.nvidia.com/en-us/data-center/dgx-b200/)
- [NVIDIA · H100 规格](https://www.nvidia.com/en-us/data-center/h100/)

---

<!-- 站：第五站 · 由 2026-11-17 内容补齐批次新增。 -->
