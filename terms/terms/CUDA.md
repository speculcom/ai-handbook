---
zh: "CUDA"
en: "CUDA"
alias: ["统一计算架构", "NVIDIA CUDA"]
purpose: "NVIDIA GPU 的并行计算平台，也是多数训练框架默认的底层执行环境。"
def: ["CUDA 提供编程模型、编译器与库。让开发者把计算任务交给 GPU 的数千个核心。", "PyTorch 等框架的 GPU 加速建立在 CUDA 及其库之上。这些库包括 cuBLAS、cuDNN。"]
why: "它解释了为什么「有 GPU」不等于「能跑」。驱动、运行时、框架版本要匹配。也是 CUDA 生态锁定讨论的起点。"
refs:
  - ["NVIDIA · CUDA Toolkit", "https://developer.nvidia.com/cuda/toolkit", "NVIDIA CUDA Toolkit"]
  - ["PyTorch · CUDA 语义说明", "https://docs.pytorch.org/docs/stable/notes/cuda.html", "PyTorch CUDA semantics"]
domain: "infra"
purposeTag: "learn"
level: 5
layer: "五"
ord: 38
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-cuda.svg"
figure_caption: "CUDA 是 GPU 上的并行执行层。框架把算子交给 CUDA 运行时，再由驱动调度到数千个核心。"
figure_caption_en: "CUDA is the parallel execution layer on NVIDIA GPUs: frameworks hand operators to the CUDA runtime, and the driver schedules them across thousands of cores."
---

# CUDA（CUDA）

**解决什么问题**

NVIDIA GPU 的并行计算平台，也是多数训练框架默认的底层执行环境。

CUDA 提供编程模型、编译器与库，让开发者把计算任务交给 GPU 的数千个核心。

PyTorch 等框架的 GPU 加速建立在 CUDA 及其库之上。这些库包括 cuBLAS、cuDNN。

**别名**：统一计算架构、NVIDIA CUDA

**为什么需要知道**

它解释了为什么「有 GPU」不等于「能跑」：驱动、运行时、框架版本要匹配。也是 CUDA 生态锁定讨论的起点。

**看具体例子**：
- [NVIDIA · CUDA Toolkit](https://developer.nvidia.com/cuda/toolkit)
- [PyTorch · CUDA 语义说明](https://docs.pytorch.org/docs/stable/notes/cuda.html)

---

<!-- 站：第五站 · 由 2026-11-17 内容补齐批次新增。 -->
