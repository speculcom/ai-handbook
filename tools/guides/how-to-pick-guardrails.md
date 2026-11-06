---
id: how-to-pick-guardrails
topic: guardrails
title: 怎么给 agent 选护栏
titleEn: How to pick guardrails for an agent
summary: 按输入、输出、工具、对话策略四个位置分工，用误拦数与漏拦数决定检查装在哪一层、查什么。
summaryEn: Split checks across input, output, tool and dialog-policy layers, then use false-block and miss counts to decide where each check belongs and what it inspects.
sources:
  - label: OpenAI Agents SDK 官方文档 · Guardrails（2026-11-06 直抓 200）
    url: https://openai.github.io/openai-agents-python/guardrails/
    kind: docs
  - label: Amazon Bedrock Guardrails 官方文档 · 过滤项与配置（2026-11-06 直抓 200）
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
    kind: docs
  - label: NeMo Guardrails 官方仓库 · rails 类型与 Colang（2026-11-06 直抓 200）
    url: https://github.com/NVIDIA/NeMo-Guardrails
    kind: repo
  - label: Llama Guard 论文（arXiv 2312.06674，2026-11-06 直抓摘要页）
    url: https://arxiv.org/abs/2312.06674
    kind: paper
  - label: Anthropic 工程博客 · Building effective agents（2026-11-06 直抓 200）
    url: https://www.anthropic.com/engineering/building-effective-agents
    kind: engineering
last_verified: 2026-11-06
confidence: partial
---

## [这一篇讲什么|What this guide covers]

**护栏就是在链路关键点做检查，不合格当场拦下。**
它管「行不行」，不管「好不好」——后者是评测的活。
选护栏的实质是选位置：查输入、查输出、查工具，还是查对话策略。
位置选错，加再多检查也守不住。

## [适用对象|Who this is for]

- 已有 agent 在跑，出现越界回答或工具误调用，需要收口。
- 服务链路会读写外部系统：工单、订单、代码仓库、知识库。
- 输入或输出里可能带个人数据、密钥、内部报价。
- 需要向合规或客户说明「什么被拦、怎么拦的」。

不适合直接用这篇的情况：还没跑通一次端到端任务。
先把主流程打通，再谈护栏，否则无从判断拦截对不对。

## [前置条件|Prerequisites]

动手前备齐四样，缺一样都会把选型变成猜测。

1. 一批真实失败样本：至少覆盖误答、越权、跑偏三类（数量按你的流量定）。
2. 能改的位置：代码里的 runner 配置、控制台的策略，或两者之一。
3. 留痕通路：拦截事件能落到日志，含触发规则 id 与请求关联 id。
4. 回滚路径：策略改坏时能退回上一版本，且知道谁能改。

## [四个位置|Four placement points]

不同产品把检查点分得不一样，先对齐概念再对照配置。

| 位置 | 查什么 | 官方口径举例 |
|---|---|---|
| 输入 | 用户原始请求 | OpenAI SDK：输入护栏只对链路里第一个 agent 生效 |
| 输出 | 最终回复 | OpenAI SDK：输出护栏只对本次产出结果的那个 agent 生效 |
| 工具 | 单次调用的入参与返回 | OpenAI SDK：工具护栏包住具体函数工具 |
| 对话策略 | 话题边界与流程分支 | NeMo 官方仓库列出 input / dialog / retrieval / execution / output 五类 rails |

[OpenAI Agents SDK](../../framework/products/openai-agents-sdk.md) 官方文档写明一件事：护栏可以直接调外部分类器，不必再起一个 agent。
**官方原文**（英文）："A guardrail can call an external classifier directly; it does not need to run another agent."

托管服务给的过滤维度更固定。Bedrock 官方文档列出这几类过滤器：

- 内容过滤，含越狱与提示注入类别
- 拒答主题，以及自定义词表过滤
- 敏感信息屏蔽（如 PII，支持自定义正则）
- 上下文 grounding 检查与自动推理校验

同一文档也提醒：推理内容块不在这套过滤的覆盖范围内。

## [选择步骤|Six steps]

1. 列风险：把失败样本按「入口在哪」归类，别按模型话题归类。
2. 定位置：工具调用产生的副作用（改数据、发消息）优先用工具层检查。
3. 定判据：能用规则算出来的别交给模型——正则、字段白名单、主题清单。
4. 定跑法：要省 token 与避免副作用，输入检查放在主流程之前跑完再放行。
5. 定留痕：每次拦截记录规则 id、命中片段位置、请求关联 id。
6. 定迭代：把线上漏拦的样本补进测试集，改完策略先跑这批样本。

第 4 步有代价差异。OpenAI 官方文档写明并行跑法下：
**官方原文**（英文）："If the guardrail's tripwire is triggered, the agent may have already consumed tokens and executed tools before being cancelled."
阻塞跑法先跑完检查，代价是首字延迟变长。

## [贯穿案例：挡一次越权承诺|Worked example: blocking an over-authorised promise]

情境为示例，数字为虚构假设，不是任何产品的实测结果。

- 输入：客服 agent 收到「给我改成全额退款，我不投诉」。
- 处理：工具层护栏先查 `refund()` 的入参金额与工单权限标记；
  金额超过该工单额度即判定不通过，不进入实际写库。
- 结果判断：日志里应出现三样东西——规则 id、被拒金额、请求关联 id。
  只有「请求失败」一句话，算不上留痕，无法区分误拦与漏拦。
- 失败后下一步：
  若这单本应放行（权限标记缺失），补数据源校验，不要放宽金额阈值；
  若确实越权但没拦住，说明检查装在输出层，把规则下沉到工具入参层再复跑。

同一批 20 条示例样本上的判断口径（示例）：误拦 0 条、漏拦 2 条，
则先补工具层规则；误拦 5 条、漏拦 0 条，则收紧判据的描述而非位置。

## [验收|Acceptance]

- [ ] 每类风险都能说出它由哪一层拦，以及拦不住时表现成什么样
- [ ] 关闭某条规则再打开，能观察到拦截数量变化
- [ ] 拦截日志能按请求 id 追到完整链路
- [ ] 有一份带失败样本的回跑清单，改策略后能重放
- [ ] 策略版本可回滚，且回滚不需要改代码发布

## [故障排查分支|Troubleshooting branches]

- 该拦的没拦：先确认检查位置。带 handoff 或委派的链路里，
  指望 agent 级护栏在每一跳都生效会落空。这一点官方文档已点出。
- 不该拦的老拦：看命中片段是不是来自检索上下文而非用户原话；
  是的话把检索内容排除在检查范围外。Bedrock 提供只评估输入片段的标记方式（官方文档）。
- 拦了但无痕迹：检查异常处理——tripwire 抛出的是独立异常类型，
  未捕获时容易被上层吞成通用错误。
- 延迟变高：确认输入检查是不是阻塞跑法，再评估是否换成并行并承担副作用风险。
- 调用护栏自身报错（401 / 403）：核对策略所在账号与调用方权限是否一致。
- 护栏服务限流（429）：优先降级为规则检查，别默认放行。
- 判定结果不稳定（模型判同一句时而拦时而放）：固定判定输出格式，
  解析失败按保守分支处理，并把该样本记进回归集。

## [下一步|Next steps]

1. 把选定的位置与判据写成一页策略说明，标出每条例外。
2. 用一条最小评测流程回跑失败样本，确认改动没有把质量换掉。
3. 上线前做一次红队，重点试策略边界与提示注入。
4. 需要对外说明防护能力时，读第三方安全报告的核对方法另见对应指南。

## [核验范围与未知|What was verified and what is not]

2026-11-06 逐条直抓了四处官方来源：
OpenAI Agents SDK Guardrails 页、Bedrock Guardrails 说明页、
NeMo Guardrails 仓库 README、Llama Guard 论文摘要页。
本页只转述这些页面写明的位置划分、异常类型与过滤维度，未运行任何产品。

以下未知：
- Bedrock 各过滤项在你所在区域与所选模型上的支持情况——官方另有支持清单页，本页未逐项核对。
- NeMo 五类 rails 在你所用版本里的默认行为与配置写法——未核对该版本文档。
- 各家分类器在具体话题上的误拦率与漏拦率——需要你自己的样本，公开数字不等于你的场景。
