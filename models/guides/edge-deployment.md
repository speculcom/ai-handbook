---
id: edge-deployment
stage: 8
title: 端侧部署：带宽、量化与功耗的三重约束
titleEn: Edge deployment: bandwidth, quantisation and power
summary: 端侧不是「小一号的服务器」：内存带宽、功耗和散热先于算力成为上限。选型要按 token/s、内存峰值和持续功耗验收。
summaryEn: An edge device is not a small server: memory bandwidth, power and cooling become the ceiling before compute does. Accept on tokens per second, peak memory and sustained power.
sources:
  - label: NVIDIA Jetson Thor（128GB LPDDR5X、273 GB/s、40–130W、2070 FP4 TFLOPS，2026-11-17 直抓官方规格页）
    url: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-thor/
    kind: docs
  - label: ONNX Runtime 文档（跨平台推理引擎与执行提供器，2026-11-17 直抓官方文档）
    url: https://onnxruntime.ai/docs/
    kind: docs
  - label: LLM in a Flash（arXiv 2312.11514，有限 DRAM 下从闪存按需加载权重，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2312.11514
    kind: paper
last_verified: 2026-11-17
confidence: verified
---

## [带宽先撞墙|Bandwidth hits first]

解码每生成一个 token 都要把激活的权重读一遍，端侧常见的瓶颈是内存带宽，而不是峰值算力。
以 Jetson AGX Thor 为例：128GB LPDDR5X、273 GB/s、40–130W。
粗算：7B 模型 4-bit 约 3.5GB 权重，理想情况下每 token 至少读一遍，273 GB/s 给出一个很粗的上界；
实际还要加上 KV cache、采样与框架开销，达不到纸面上限。

## [量化档位决定能不能装|Quantisation decides fit]

端侧优先看 4-bit 与混合精度：Q4 通常比 FP16 小 3–4 倍，质量损失要在自己的任务上测。
低于 4-bit 时，质量下降与算子支持问题都会变多；不是所有推理框架都支持同一套量化格式。
先确认框架支持的格式（GGUF、ONNX、MLX 等），再谈模型。

## [统一内存 vs 独立显存|Unified vs discrete memory]

统一内存（CPU/GPU 共享）能把更大的模型装进同一池，但带宽通常低于独立显存；
独立显存快，但容量固定，装不下就要卸载到内存或闪存。
LLM in a Flash 的思路是把权重放在闪存、按需换入 DRAM，能跑约两倍于 DRAM 的模型，但速度取决于闪存带宽与读取连续性。

## [功耗与散热|Power and cooling]

端侧设备常有 40–130W 的功耗窗口，持续推理会触发降频。
验收要测「连续跑 30 分钟后的 token/s」，而不是开机第一分钟。
风扇与外壳设计会改变可持续功耗，进而改变真实吞吐。

## [验收清单|Acceptance checklist]

1. 目标模型 + 目标量化格式，能否在设备上加载并跑满上下文。
2. batch=1 的首字延迟与 decode token/s；连续 30 分钟后的衰减。
3. 内存峰值与是否触发交换/卸载。
4. 断电重启后的冷启动时间。
5. 真实任务的答案质量，不只看困惑度。

**边界**：端侧数字高度依赖具体设备、量化格式与推理框架；本文只给估算方法，不给跨设备排名。

**先补概念**：[量化](https://learn.specul.com/term/%E9%87%8F%E5%8C%96/) 是学 AI 站的相关科普。
