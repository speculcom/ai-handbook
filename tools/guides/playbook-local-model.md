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
  - label: Hugging Face Transformers · 缓存张量形状（简化 KV 算式的推导依据；2026-11-04）
    url: https://huggingface.co/docs/transformers/cache_explanation
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [显存：先算再下|VRAM: calculate before downloading]

以下 KV 算式仅用于常规注意力缓存的简化预算，不适用于所有架构或缓存实现。GB 按十进制计，GiB = 字节 / 2^30。

```
权重体积 GB ≈ 参数量(B) × bpw / 8
KV 字节 ≈ 2 × 层数 × KV 头数 × 头维度 × 每请求缓存 tokens × 每元素字节数 × 并发请求数
总预算 ≈ 权重 + KV 缓存 + 运行器与系统开销 + 自定余量
```

- 7B 参数按纯 4-bit 算约为 3.5 GB；实际文件还含量化与其他数据，以文件字节数为准。
- 先定上下文长度，再定量化档；只按参数量算会低估。
- GQA/MQA 使用 KV 头数，不直接套查询头数。运行器开销与余量按配置记录，不预设通用百分比。

## [量化档：按索引选|Quantization: use the index]

本站 models 站快照（2026-10-30）：**129 个量化仓、1,262 个量化档、1,337 个 GGUF 文件**。

1. 按可用内存筛候选，同时预算缓存、并发与运行器。
2. 核对基座版本、量化方法、来源与发布说明，不能只按发布者名字判断质量。
3. 同档多文件时核对总体积、bpw、分片是否齐全与运行器兼容性。
4. 先验证一个条件清楚的候选，再按任务决定是否比较其他档。

## [Runtime：按硬件选|Runtime: match the hardware]

| 硬件 | 候选路线 | 需要核对 |
|---|---|---|
| Apple 硅 | LM Studio（MLX）或 llama.cpp | 模型架构、格式与统一内存预算 |
| 单张 NVIDIA | LM Studio、llama.cpp 或 ExLlamaV3 | GPU/驱动支持；GGUF 与 EXL3 不是同一格式 |
| 多卡 / 并发 | vLLM 等服务运行器 | 并行配置、架构与量化格式支持 |
| CPU / 边缘 | llama.cpp 等本地运行器 | 内存、架构支持与任务响应要求 |

- 按图形界面、脚本或服务化需求选择路线；这不是性能排序。
- 注意工具许可证与权重许可证是两份文件。

## [评估：三类任务各 20 条|Evaluate: 20 cases per task]

下面以三类各 20 条为教学安排，实际样本按业务任务、边界情况与风险设计，不是通用验收规模。

1. **准备 60 条真实任务**：问答、摘要、代码各 20 条，带标准答案。
2. **跑三档**：Q4、Q5、Q8（或模型提供的相邻档），记录质量与速度。
3. **看四个指标**：正确率、幻觉率、首 token 延迟、tokens/s。
4. **选档结论**：写清「为什么这个档够用」，不要只写「感觉不错」。

**失败模式**：只测一个 prompt；真实任务一上就崩。

## [监控：上线后看什么|Monitor after launch]

- 显存峰值、tokens/s、首 token 延迟、错误率。
- 优先记录必要的长度、耗时与错误；哈希也可能关联原文，不能当作自动匿名化。明确日志访问权限与保留范围。
- 模型或量化档更新时，重跑评估集再切换。

## [成本算式|Cost formula]

```
一次性：硬件 + 下载流量 + 调试时间
持续：电费 + 维护 + 评估复跑
对比云端：按同一期间分开计算输入/输出、缓存、工具与固定费用
```

不预置电价与报价。用 [成本计算器](https://tools.specul.com/mcp/guides/cost-calculator.html) 填写相同期间的假设；已有硬件、分摊与维护会改变结论，不能仅由调用量推断哪种更省。

## [验收单|Acceptance checklist]

- [ ] 容量预算包含权重、KV 缓存、并发、开销与自定余量，单位一致
- [ ] 量化档与量化仓有版本记录
- [ ] runtime 许可证与模型许可证分别核对
- [ ] 约定的评估集完成，四指标与未覆盖情况有记录
- [ ] 选定档位写出理由
- [ ] 监控指标与告警阈值就绪
- [ ] 更新模型时的回滚方案就绪

## [常见失败模式|Failure modes]

- **只算权重**：忘了 KV 缓存，长上下文直接 OOM。
- **混淆参数口径**：总参与激活参数不同，不能直接代替内存或速度结论。
- **许可混淆**：工具 MIT，权重却是非商用。
- **无评估集**：换档后质量下降没人发现。
- **无监控**：上线后显存峰值把机器拖死。

## [贯穿案例：先算内存，再尝试启动|Worked example: budget memory before starting]

以下数字是假设的容量练习，不对应某款模型，也不是性能测量。

设设备可用预算为 10 GiB，候选权重为 6 GiB。先预留 2 GiB 给上下文缓存、1 GiB 给运行时，其余 1 GiB 作为余量。合计 9 GiB 是初步预算，不是一定能启动的保证。

接下来核对文件来源、许可、运行器与架构支持。先用短输入检查能否加载、是否有不支持的算子，以及真实内存占用。再逐渐增加上下文；每一步记录错误和响应时间。

装不下时，先区分权重、缓存还是其他程序占用，再评估更小规格、不同量化或运行器支持的卸载。能启动但响应不满足任务要求，也应记录为未通过。

具体计算与单位见 [硬件预算示例](https://models.specul.com/guides/gpu-cost-math.html)。
