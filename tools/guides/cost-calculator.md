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

单价从你使用的具体产品、档位和合同填写，页面不预置报价。订阅席位与 API 是两种计费口径，不能把订阅月费当成 token 单价。上方各组独立计算，混合方案按实际使用组合，避免重复计入同一费用。

- 输入、缓存输入与输出分开统计；缓存输入不能再次计入非缓存输入。
- 单价单位统一为“金额 / 百万 tokens”；工具单价则按实际计费单位换算。
- 所有金额使用同一种币种；换汇、税费和折扣按你的合同另行处理。
- 预算余量由任务失败率、返工和复核要求决定，不预设通用百分比。
- 只读资料不足以推断成本更低；需要你自己的调用量、硬件分摊与维护假设。

## [1. 云端对话|Cloud chat]

```text
模型费用 = Σ 每次调用的 (非缓存输入 tokens × 输入单价
         + 缓存输入 tokens × 缓存单价 + 输出 tokens × 输出单价) / 1,000,000
```

每次调用可能重新携带历史、系统指令和检索片段，不能只统计用户最后一句话。计算器使用“每次平均量 × 调用次数”的简化口径；不同模型或不同价格档位请分组计算。

控制点：保留必要上下文和证据，移除无关重复内容；调整后仍要验证答案。

## [2. Agent 任务|Agent tasks]

```text
模型调用数 = 任务数 × (每任务首次调用数 + 每任务额外重试调用数)
工具费用 = 任务数 × 每任务工具调用总数（含工具重试）× 每次工具费用
期间费用 = 模型费用 + 工具费用 + 席位与复核等费用
```

模型调用和工具调用分别计数，不把全部工具调用再次乘以模型调用数。若一次工具触发多种收费服务，拆开计算。失败请求是否收费以对应服务的规则为准；重试也可能携带不同长度的上下文。

控制点：设定重试与预算上限，记录失败原因；审批耗时按实际流程加入复核组。

## [3. 本地模型|Local model]

```text
月预算 = 分摊硬件费用 / 分摊月数 + 电费 + 月维护与评估费用
电费 = 平均功耗 kW × 每日运行小时 × 当月运行天数 × 电价 / kWh
```

分摊是预算方法，不等于当月现金支出。已拥有硬件时，可分别计算新增现金支出与含硬件分摊的方案。功耗填整机或所选范围的平均值，并记录范围；不要把额定峰值当成持续平均值。

控制点：先确认模型、上下文缓存、并发和运行器开销能装下，再比较成本。

## [4. 视频生成|Video generation]

```text
视频预算 = 镜头数 × 每镜头计费秒数 × 每镜头总尝试次数 × 每秒费用
         + 剪辑与素材许可费用
```

总尝试次数包含第一次。上方适用于按秒计费且每次长度相同的估算；按积分、请求、分辨率或套餐收费时，先换算对应单位，不能直接套每秒单价。不同镜头长度和尝试次数应逐镜头求和。

控制点：记录每个镜头的验收条件，尝试次数用自己的预算假设或历史记录，不预设“通常 2–3 次”。

## [四个判断|Four decisions]

1. 调用量少不自动意味着云端更省；把订阅、已有设备与维护成本按同一期间比较。
2. 数据不能出网时，先确认整条处理链是否符合要求，再估算本地运维费用。
3. 长任务逐项记录模型调用、工具调用、失败重试与审批时间，找出费用来源。
4. 视频预算同时保留一次成功和多次返工两种假设，说明差额来自哪里。

## [常见误判|Common misreads]

- 缓存输入重复计入，或漏掉每次携带的历史。
- 将“每百万 tokens”单价按每 token 使用，导致百万倍单位错误。
- 重试次数已经包含首次调用，却又额外加一次。
- 把按秒、按积分和按请求的不同收费混算。
- 将不同币种、税前税后或不同期间的金额直接比较。
- 把示例计算结果当成产品报价或节省承诺。
