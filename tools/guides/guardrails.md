---
id: guardrails
topic: guardrails
title: agent 的护栏
titleEn: Guardrails for agents
summary: 输入输出与工具三层防线、触发即止的 tripwire 机制，以及并行与阻塞的成本取舍。
summaryEn: Input, output, and tool-level defenses, tripwires that halt on trigger, and the cost trade-off between parallel and blocking checks.
sources:
  - label: OpenAI Agents SDK 官方文档 · Guardrails（2026-10-20 直抓 200）
    url: https://openai.github.io/openai-agents-python/guardrails/
    kind: docs
  - label: Llama Guard 论文（arXiv 2312.06674，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2312.06674
    kind: paper
  - label: Anthropic 工程博客 · Building effective agents（2026-10-20 WebFetch 核验官方页）
    url: https://www.anthropic.com/engineering/building-effective-agents
    kind: docs
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**护栏就是给 agent 的输入输出加检查，不合格就当场拦下。**
它和评测是两回事：评测测「好不好」，护栏管「行不行」。
模型会犯错、会被诱导，护栏是工程上的最后一道闸。

## [三层防线|Three lines of defense]

OpenAI Agents SDK 官方文档把 guardrails 定义为
**"Guardrails enable you to do checks and validations of user input and agent output."**
在实践中分成三类，各自守在不同位置。

**输入护栏**：检查用户原始输入，只对链路里的**第一个** agent 生效。
**输出护栏**：检查 agent 的最终输出，只对**最后一个** agent 生效。
**工具护栏**：包住具体函数工具，每次调用前后都过一遍。

官方特意点出一个常见误区：
如果流程里有 manager、handoff 或委派的专家 agent，
指望 agent 级输入/输出护栏在每一跳都生效是会落空的——
要那种「每次工具调用前都查」的效果，就得用工具护栏。

## [触发即止：tripwire|Tripwires: halt on trigger]

护栏的核心机制是 tripwire（触发线）。
检查不通过时，runner 立刻抛出对应异常并**中止执行**：

| 防线 | 触发的异常 |
|---|---|
| 输入护栏 | `InputGuardrailTripwireTriggered` |
| 输出护栏 | `OutputGuardrailTripwireTriggered` |
| 工具输入护栏 | `ToolInputGuardrailTripwireTriggered` |
| 工具输出护栏 | `ToolOutputGuardrailTripwireTriggered` |

异常里带着上下文：是哪个护栏触发的、触发前已完成的结果列表。
接入方 catch 到异常后自行决定怎么回应用户。

护栏也能直接调外部分类器，不必再起一个 agent。
官方给的示例场景很有代表性：
面向客服的贵模型前面挂一个快模型护栏，
遇到「帮我写数学作业」这类滥用直接挡掉。

## [并行还是阻塞：一笔成本账|Parallel or blocking]

输入护栏有两种跑法，官方文档写明了代价差异。

**并行执行**（默认）：护栏与 agent 同时跑，延迟最低。
但触发时 agent 可能已经烧过 token、执行过工具。

**阻塞执行**：护栏先跑完，agent 后启动。
触发即止，token 与工具副作用都不会发生。
**OpenAI 官方原文**：阻塞执行 "is ideal for cost optimization and when you want to avoid potential side effects from tool calls"。

注意输出护栏不支持并行参数——它永远在 agent 完成后跑。

## [拿什么当检查器|What runs the check]

文档层面是函数加判定输出；模型层面可以是用 LLM 当分类器。
Llama Guard 论文（arXiv 2312.06674）是这条路线的代表：
一个指令微调的安全分类模型，自带安全风险分类体系（taxonomy），
对 prompt 和 response 做多分类，输出二值判定。

**论文摘要原文**："matches or exceeds that of currently available content moderation tools"。
注意这是 2023 年底的论文结果，
换成今天的模型与场景需自行复验。

## [设计上的纪律|Design discipline]

1. 护栏管「行不行」，别顺手让它管「好不好」——那是评测的活。
2. 检查要快：挂在主流程前的护栏，本身不能成为延迟大头。
3. 失败要可见：拦了什么、为什么拦，要留痕，否则无法排查误杀。
4. 别只守门口：工具调用、交接、委派，每一跳都可能是入口。

最后一句官方提醒值得放在案头：
**Anthropic 官方原文**："The autonomous nature of agents means higher costs, and the potential for compounding errors."
护栏不是万能药，但它是把错误复合按在第一步的那只手。
