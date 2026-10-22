# runner 大类收录声明

**主题**：本地模型运行器——在自己机器上加载并运行开源模型的工具（推理服务或本地应用）。
定义与边界裁决见 [../../categories.md](../../categories.md) §10。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | 核心功能是**加载并运行**模型（推理服务或本地应用），不是训练/微调 |
| 2 | 有官方文档/仓库可核验八维（runtime / model-access 维必答） |
| 3 | 支持哪些模型格式/量化可核验（与 models 站 GGUF 索引口径衔接） |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号——audit.mjs 把「反引号小写词开头的 ≥3 列表格行」当档案声明）：

| 形态 | 判据 |
|:--|:--|
| local-app | 主入口是桌面应用/单文件程序，核心体验在端上（LM Studio、Jan、KoboldCpp、GPT4All、text-generation-webui） |
| cli | 主入口是命令行/服务端进程（Ollama、llama.cpp、vLLM、SGLang、TGI、MLX、LocalAI） |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 训练/微调工具（LLaMA-Factory、Axolotl） | 不收（归 nav） |
| 不加载模型的前端壳（SillyTavern 连后端跑） | 只进 nav——不满足标准 1 |
| Rust 张量库（Candle——写代码跑模型） | 只进 nav——不是「运行器」产品 |
| 模型权重与量化索引 | models 站的活 |
| 推理云 API 平台本体 | 不收（归 nav；其开源运行时收） |

## 收录对象（12 份）

| id | 名称 | 厂商 |
|---|---|---|
| `ollama` | Ollama | Ollama Inc. |
| `lm-studio` | LM Studio | Element Labs |
| `llama-cpp` | llama.cpp | ggml-org |
| `vllm` | vLLM | vLLM 项目（PyTorch 基金会） |
| `sglang` | SGLang | LMSYS / sgl-project |
| `jan` | Jan | Menlo Research |
| `gpt4all` | GPT4All | Nomic AI |
| `mlx` | MLX（mlx-lm） | Apple |
| `koboldcpp` | KoboldCpp | LostRuins |
| `text-generation-webui` | text-generation-webui（现名 textgen） | oobabooga |
| `tgi` | Text Generation Inference | Hugging Face |
| `localai` | LocalAI | Mudler T.（mudler） |
