---
id: cost-calculator
topic: cost
title: 成本算式：云端、Agent、本地与视频四条线
titleEn: Cost formulas: cloud, agents, local and video
summary: 不给价格数字，只给四条可复算的算式与口径：token、席位、显存电费、视频秒数；每条附官方定价页指针。
summaryEn: No price figures, only four reproducible formulas and conventions — tokens, seats, local power, video seconds — each with an official pricing pointer.
sources:
  - label: OpenAI · ChatGPT Pricing（官方定价页指针，D9：本站不采价格数字）
    url: https://openai.com/chatgpt/pricing/
    kind: pricing
  - label: Anthropic · Claude Pricing（官方定价页指针）
    url: https://www.anthropic.com/pricing
    kind: pricing
  - label: Google · Google AI plans（Gemini 订阅档位指针）
    url: https://one.google.com/about/google-ai-plans
    kind: pricing
  - label: 本站 · 成本控制指南（口径与陷阱）
    url: https://tools.specul.com/mcp/guides/cost-control.html
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [口径先说清|Conventions first]

- 所有单价查官方定价页当日价，不写死在文档里。
- token 数按输入与输出分开；缓存命中与批量折扣单独列。
- 汇率写当日中间价；电费写当地阶梯价。
- 估算留 20% 余量；返工与人工复核必须计入。

## [1. 云端对话|Cloud chat]

```text
月成本 = 会话数 × 平均轮次 × (输入 tokens × 输入单价 + 输出 tokens × 输出单价)
输入 tokens ≈ 系统提示 + 历史 + 检索资料 + 用户输入
输出 tokens ≈ 平均回答长度
```

控制点：限制历史轮次、压缩检索资料、把长任务拆会话。

## [2. Agent 任务|Agent tasks]

```text
单任务成本 = 规划轮 × 模型单价 + 工具调用次数 × 单次工具成本 + 重试次数 × 单次成本
月成本 = 任务数 × 单任务成本 + 人工审批时间 × 时薪
```

控制点：工具白名单、失败重试上限、审批点前移。

## [3. 本地模型|Local model]

```text
一次性 = 硬件 + 下载流量 + 调试时间
月成本 = 电费 + 维护 + 评估复跑
电费 = 功耗 kW × 每日小时 × 30 × 电价
```

控制点：量化档、上下文长度、并发数；调用量小时云端通常更省。

## [4. 视频生成|Video generation]

```text
单条成本 = 单段秒数 × 单价 × 尝试次数
总成本 = 单条成本 × 镜头数 + 剪辑人力 + 音乐/字体许可
尝试次数按 2–3 倍估
```

控制点：分镜一次写清、单段只放一个主体、失败片段及时停。

## [四个判断|Four decisions]

1. **调用量小**：云端按量更省，本地先不算。
2. **数据不能出网**：本地成本要加上运维与评估。
3. **长任务多**：Agent 的重试与审批比模型单价更影响总成本。
4. **视频返工高**：把尝试次数写进预算，不要按一次过估。

## [常见误判|Common misreads]

- 只算 token：检索、工具、人工与返工常占大头。
- 只算单价：配额与限流会改变实际可用量。
- 只算硬件：电费、维护与升级周期没进表。
- 只算一次：视频与 Agent 都要按尝试次数估。
