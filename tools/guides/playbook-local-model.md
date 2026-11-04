---
id: playbook-local-model
topic: planning
title: 任务：在自己的机器上跑一个模型
titleEn: Playbook: running a model on your own machine
summary: 显存、量化档、runtime、评估、监控五步；含体积算式、量化索引、失败模式与验收单。
summaryEn: Five steps — VRAM, quantization tier, runtime, evaluation, monitoring — with a size formula, the quantization index, failure modes and an acceptance list.
sources:
  - label: models.specul.com · 量化索引（129 量化仓 / 1,262 量化档 / 1,337 GGUF，2026-10-30 快照）
    url: https://models.specul.com/
    kind: dataset
  - label: llama.cpp · 官方仓库（GGUF 与 llama-server；2026-10 快照）
    url: https://github.com/ggml-org/llama.cpp
    kind: repo
  - label: vLLM · 官方文档（PagedAttention、OpenAI 兼容；2026-10 快照）
    url: https://docs.vllm.ai
    kind: docs
  - label: LM Studio · 官方站（MLX + llama.cpp 双运行时；2026-10 快照）
    url: https://lmstudio.ai
    kind: official
  - label: PyPI · exllamav3 1.6.5（2026-10-25；2026-11-03 复核）
    url: https://pypi.org/project/exllamav3/
    kind: package
last_verified: 2026-11-03
confidence: partial
---

## [显存：先算再下|VRAM: calculate before downloading]

```
权重体积 GB ≈ 参数量(B) × bpw / 8
KV 缓存 ≈ 2 × 层数 × 注意力头 × 头维度 × 上下文长度 × 字节数
总显存 ≈ 权重 + KV 缓存 + 运行时开销(约 10–20%)
```

- 7B 模型 Q4 约 3.5–4 GB 权重；上下文越长，KV 缓存越吃显存。
- 先定上下文长度，再定量化档；只按参数量算会低估。
- 留出 10–20% 余量给运行时与碎片。

## [量化档：按索引选|Quantization: use the index]

本站 models 站快照（2026-10-30）：**129 个量化仓、1,262 个量化档、1,337 个 GGUF 文件**。

1. 按显存选档位：Q4 附近通常是平衡点。
2. 按量化者选仓：同模型不同人做的档，质量差别很大。
3. 按文件核对：同档多文件时看 bpw 与体积。
4. 不确定就下两个档，实测后再删。

## [Runtime：按硬件选|Runtime: match the hardware]

| 硬件 | 首选 | 备选 |
|---|---|---|
| Apple 硅 | LM Studio（MLX）或 mlx-lm | llama.cpp |
| 单张 NVIDIA | LM Studio 或 llama.cpp | ExLlamaV3（EXL3） |
| 多卡 / 并发 | vLLM | TensorRT-LLM |
| CPU / 边缘 | llama.cpp | OpenVINO |

- 桌面自用优先图形化；服务化优先 vLLM。
- 注意工具许可证与权重许可证是两份文件。

## [评估：三类任务各 20 条|Evaluate: 20 cases per task]

1. **准备 60 条真实任务**：问答、摘要、代码各 20 条，带标准答案。
2. **跑三档**：Q4、Q5、Q8（或模型提供的相邻档），记录质量与速度。
3. **看四个指标**：正确率、幻觉率、首 token 延迟、tokens/s。
4. **选档结论**：写清「为什么这个档够用」，不要只写「感觉不错」。

**失败模式**：只测一个 prompt；真实任务一上就崩。

## [监控：上线后看什么|Monitor after launch]

- 显存峰值、tokens/s、首 token 延迟、错误率。
- 日志不要存原文输入；存哈希与长度，避免隐私风险。
- 模型或量化档更新时，重跑评估集再切换。

## [成本算式|Cost formula]

```
一次性：硬件 + 下载流量 + 调试时间
持续：电费 + 维护 + 评估复跑
对比云端：月调用量 × 云端单价
```

不写具体电价与单价；按本地电价与官方定价页计算。调用量小的时候，云端通常更省。

## [验收单|Acceptance checklist]

- [ ] 显存算式写清，含 KV 缓存与 10–20% 余量
- [ ] 量化档与量化仓有版本记录
- [ ] runtime 许可证与模型许可证分别核对
- [ ] 60 条评估集跑完，四指标有记录
- [ ] 选定档位写出理由
- [ ] 监控指标与告警阈值就绪
- [ ] 更新模型时的回滚方案就绪

## [常见失败模式|Failure modes]

- **只算权重**：忘了 KV 缓存，长上下文直接 OOM。
- **只看参数量**：没看激活参数与 MoE 结构，速度判断错。
- **许可混淆**：工具 MIT，权重却是非商用。
- **无评估集**：换档后质量下降没人发现。
- **无监控**：上线后显存峰值把机器拖死。

## [贯穿案例：先算内存，再尝试启动|Worked example: budget memory before starting]

以下数字是假设的容量练习，不对应某款模型，也不是性能测量。

设设备可用预算为 10 GiB，候选权重为 6 GiB。先预留 2 GiB 给上下文缓存、1 GiB 给运行时，其余 1 GiB 作为余量。合计 9 GiB 是初步预算，不是一定能启动的保证。

接下来核对文件来源、许可、运行器与架构支持。先用短输入检查能否加载、是否有不支持的算子，以及真实内存占用。再逐渐增加上下文；每一步记录错误和响应时间。

装不下时，先区分权重、缓存还是其他程序占用，再评估更小规格、不同量化或运行器支持的卸载。能启动但响应不满足任务要求，也应记录为未通过。

具体计算与单位见 [硬件预算示例](https://models.specul.com/guides/gpu-cost-math.html)。
