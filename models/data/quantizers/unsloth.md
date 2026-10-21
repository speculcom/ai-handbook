# unsloth（Unsloth）

**定位**：量化覆盖面最广、下载量最高的第三方量化者。

**擅长什么**：几乎每个主流基础模型都第一时间跟 GGUF，且档位最全——从极限压缩到近似无损一应俱全。提供静态（static）与动态（dynamic，用 `UD-` 前缀）两套量化。

**为什么要认 unsloth 版**：
- 覆盖率高 → 你想要的档位通常都有
- 命名规范 → `Q4_K_M` 就是 `Q4_K_M`，不会同档不同名
- 带 importance matrix（imatrix）→ 量化质量比纯 RTN 更稳
- 官方教程与 LM Studio / llama.cpp 集成路径最顺

**注意**：unsloth 的动态量化（`UD-Q4_K_XL` 等）在同档位下体积略大、速度略慢，换来的是质量通常更好。是否值得取决于你的瓶颈是显存还是速度——**这是我们的口径，不是实测结论**。

**官方发布页**：https://huggingface.co/unsloth
