> 量化者说明文档的英文（2026-10-04）。
> 键 = `_data/models/data/quantizers/` 下的**文件名**（不含 .md）。
> 结构与中文版一一对应：`定位 / 特点 / 怎么选 / 适合谁 / 不适合谁 / 注意 / 发布页`。
>
> 翻译原则：
> 1) **保留「我们的口径，不是实测结论」这类立场标记** —— 它是本站的诚实边界，不能在英文里被磨平。
> 2) 技术术语用业界通用说法（GGUF / imatrix / MoE / 投机采样 / tensor split / n_gpu_layers）。
> 3) 型号原样保留（`UD-Q4_K_XL`、`Q4_K_M`、`IQ2_XXS`、`MTP`）。
> 4) 「适合谁 / 不适合谁」是**选型判断**，语气要保持明确，不要软化成 might。

## bartowski

**Position**: A long-standing quantiser with the most complete tier naming and documentation.

**Characteristics**:
- Every tier states what scenario it suits, rather than just dumping files
- Naming follows the llama.cpp convention — `Q4_K_M` is the community's `Q4_K_M`
- The same model often ships both static and imatrix directories

**How to choose their builds**: read the tier-by-tier README in the repo — it is one of the few places that actually explains *why* one tier loses little quality and another loses more.

**Note**: repo names often carry a `Qwen_` or `Meta-Llama_` prefix (Hugging Face repo names must be unique, so quantisers prefix the organisation name to disambiguate) — do not miss the prefix when searching.

**Release page**: https://huggingface.co/bartowski

## ggml-org

**Position**: The official quantisation release channel of llama.cpp itself.

**Why it matters**: ggml is llama.cpp's underlying tensor library, and ggml-org's GGUFs are vetted by the project's core authors. When a new architecture appears (a new sparse MoE, say), **ggml-org is usually the first to support it and publish a usable GGUF**.

**Characteristics**:
- Tiers lean conservative, prioritising correct loading and inference that does not break
- Coverage is not necessarily complete (limited authorial bandwidth — they track only models they care about)
- Serves as the authoritative reference for "can this architecture run on llama.cpp at all"

**Who it suits**: people who want to try a new architecture first-hand, or need to confirm whether llama.cpp supports a given model.

**Release page**: https://huggingface.co/ggml-org

## lmstudio-community

**Position**: The official community organisation behind the LM Studio desktop client, supplying packages for its GUI.

**Characteristics**:
- Tiers lean conservative and pragmatic, selected for "runs smoothly inside LM Studio"
- File naming lines up with LM Studio's model library index, so downloads are recognised by the client directly
- Also ships special builds related to MTP / speculative sampling

**Who it suits**: if you use LM Studio rather than driving llama-server yourself, packages from this organisation save the most fuss.

**Who it does not suit**: if you need fine control over load parameters (tensor split, n_gpu_layers, context allocation) — community packages are usually not tuned to your hardware, so you still tune them yourself.

**Release page**: https://huggingface.co/lmstudio-community

## mradermacher

**Position**: Author of the Mirostat sampling algorithm, long-running low-bit experimental quantisations.

**Characteristics**:
- Willing to publish very low-bit tiers others dare not (IQ2_XXS, Q2_K and the like)
- Focused on the quantisation method itself — tries different imatrix files and different sources for the importance matrix
- File names carry suffixes like `i1` or `h2`, marking which version of the importance matrix was used

**Who it suits**: experiments along the lines of "fit the largest possible model into the smallest possible VRAM", or comparisons of how different importance matrices affect quality.

**Who it does not suit**: everyday use. Quality loss at those very low bits is usually already noticeable — unless you genuinely have no alternative, do not make it your primary build.

**Release page**: https://huggingface.co/mradermacher

## official

**Representative**: `openbmb` (OpenBMB), `google`, `Qwen`, and the `Qwen/Qwen3-30B-A3B-GGUF` that `unsloth` mirrors.

**Why it ranks highest**:
- Only the model author knows exactly which layers matter most for quality

**Note**: this is our reading, not a measurement.

**Release page**: see each repository

## unsloth

**Position**: The broadest quantisation coverage and the highest downloads among third-party quantisers.

**What it is good at**: publishes GGUF for almost every mainstream base model first, with the most complete tier range — from extreme compression to near lossless. Offers both static and dynamic (the `UD-` prefix) quantisation.

**Why choose the unsloth build**:
- Broad coverage → the tier you want is usually there
- Naming discipline → `Q4_K_M` means `Q4_K_M`, with no different name for the same tier
- Ships an importance matrix (imatrix) → quality is steadier than plain RTN
- The smoothest path to official tutorials and LM Studio / llama.cpp integration

**Note**: unsloth's dynamic quantisation (`UD-Q4_K_XL` and similar) is slightly larger and slightly slower at the same tier, in exchange for usually better quality. Whether that trade is worth it depends on whether your bottleneck is VRAM or speed — **this is our reading, not a measurement**.

**Release page**: https://huggingface.co/unsloth
