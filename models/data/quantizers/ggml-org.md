# ggml-org（llama.cpp 所属组织）

**定位**：llama.cpp 自己的官方量化发布渠道。

**为什么重要**：ggml 是 llama.cpp 的底层张量库，ggml-org 发的 GGUF 由项目核心作者把关。遇到新架构（比如新出的 MoE 稀疏模型），**ggml-org 通常是第一个支持并发布可用 GGUF 的**。

**特点**：
- 档位偏保守，优先保证能正确加载与推理不出错
- 覆盖不一定全（作者精力有限，只跟进自己关心的模型）
- 适合作为「该架构能不能在 llama.cpp 上跑」的权威参考

**适合谁**：想第一时间在新架构上尝鲜、或者需要确认某个模型是否已被 llama.cpp 支持。

**发布页**：https://huggingface.co/ggml-org
