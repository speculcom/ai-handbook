# runner 大类收录清单（inventory）

> 去向枚举：`已有` / `待建`（P1>P2>P3）/ `只进nav` / `不收`（必须带理由）。
> 收录标准见 [categories.md §10](../categories.md)：核心是**加载并运行**模型（本地应用或推理服务）；模型格式/量化支持可核验（与 models 站口径衔接）。**训练/微调工具不收；模型权重与量化索引是 models 站的活。**
> 候选来源交叉（≥2）：models 站 guides（serving-deep-dive / gpu-cost-math 已核验过 vLLM/SGLang/llama.cpp 官方口径）+ nav + 2026-10-21 官方核验补漏。
> 本类现有档案 0 份——全部候选首次盘点。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| Ollama | Ollama (YC) | https://ollama.com | 已有 | ollama | P1 · 本地运行事实标准 |
| LM Studio | Element Labs | https://lmstudio.ai | 已有 | lm-studio | P1 · 桌面 GUI 主流 |
| llama.cpp | ggml-org | https://github.com/ggml-org/llama.cpp | 已有 | llama-cpp | P1 · GGUF 生态根（models 站口径源头；llama.cpp 顶级域直抓 000 网络受限，官方仓 URL 直抓 200） |
| vLLM | vLLM 项目（PyTorch 基金会） | https://docs.vllm.ai | 已有 | vllm | P1 · 服务化推理（models guides 已核验官方口径） |
| SGLang | LMSYS / SGLang 项目 | https://docs.sglang.ai | 已有 | sglang | P1 · 服务化推理（同上） |
| Jan | Jan Labs | https://www.jan.ai | 已有 | jan | P2 · 桌面 GUI |
| GPT4All | Nomic AI | https://www.nomic.ai/gpt4all | 已有 | gpt4all | P2 |
| MLX（mlx-lm / MLX LM Server） | Apple | https://ml-explore.github.io/mlx/build/html/index.html | 已有 | mlx | P2 · Apple 硅官方栈 |
| KoboldCpp | LostRuins（KoboldAI 社区） | https://github.com/LostRuins/koboldcpp | 已有 | koboldcpp | P2 · 2026-10-21 直抓核验：旧传 koboldai/koboldcpp 仓 404，官方仓在 LostRuins 名下 |
| text-generation-webui | oobabooga | https://github.com/oobabooga/text-generation-webui | 已有 | text-generation-webui | P2 |
| TGI（Text Generation Inference） | Hugging Face | https://huggingface.co/docs/text-generation-inference | 已有 | tgi | P2 · 服务化推理 |
| LocalAI | Mudler | https://localai.io | 已有 | localai | P3 · OpenAI 兼容本地栈 |
| MLC LLM | MLCEngine（CMU 系） | https://llm.mlc.ai | 待建 | mlc-llm | P3 · 多平台编译栈 |
| TabbyAPI | Royal Lab（theroyallab） | https://github.com/theroyallab/tabbyAPI | 待建 | tabbyapi | P3 · ExLlama 官方 API server；README 声明本仓是唯一官方信息源（tabbyapi.com 反而非官方） |
| Msty | Msty | https://www.msty.app | 待建 | msty | P3 |
| LlamaEdge | LlamaEdge 社区 | https://llamaedge.com | 待建 | llamaedge | P3 · WASM 路线 |
| SillyTavern | SillyTavern 社区 | https://docs.sillytavern.app | 只进nav | | 前端/UI 壳，本身不加载模型（连后端跑）——不满足标准 1 |
| Candle | Hugging Face | https://huggingface.co/docs/candle | 只进nav | | Rust 张量库（写代码跑模型），不是「运行器」产品 |
| LLaMA-Factory | hiyouga | https://github.com/hiyouga/LLaMA-Factory | 不收 | | 训练/微调工具——categories.md 边界点名不收（归 nav） |
| Axolotl | Axolotl 社区 | https://github.com/axolotl-ai-cloud/axolotl | 不收 | | 同上：微调框架 |
| GPT-Frontend | LMSYS | https://github.com/lm-sys/gpt-frontend | 不收 | | 官方仓 URL 已 404（2026-10-21 直抓核验：仓库不存在或已删）——官方入口消失，不收 |

## 备注

- T21 建档批已落地 12 份（P1 5 + P2 6 + P3 补位 1：LocalAI）；P3 层其余（MLC LLM/TabbyAPI/Msty/LlamaEdge）留后续批次。
- **与 models 站的口径衔接**：档案的 model_access / runtime 维要写「支持哪些格式（GGUF/safetensors/MLX…）× 哪些量化档」，与 models 站 GGUF 索引互链（learn 站 llama.cpp/KV 缓存词条已有 refs 回链先例）。
- vLLM/SGLang 的官方口径（PagedAttention/RadixAttention 自报数字）在 models guides `serving-deep-dive.md` 已核验过——建档直接复用该快照并挂同一出处，不重复抓取。
