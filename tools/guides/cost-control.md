---
id: cost-control
topic: cost
title: agent 的成本控制
titleEn: Cost control for agents
summary: 钱花在哪、怎么省：token 记账、前缀缓存、上下文膨胀与步数上限——只讲机制，不报价格。
summaryEn: Where the money goes and how to curb it: token accounting, prefix caching, context bloat, and step caps — mechanisms only, no prices.
sources:
  - label: OpenAI 官方文档 · Prompt caching（2026-10-20 经官方页快照核验，直连被 Cloudflare 拦截）
    url: https://developers.openai.com/docs/guides/prompt-caching
    kind: docs
  - label: Anthropic 官方文档 · Prompt caching（2026-10-20 经官方页快照核验，直连被地区策略拦截）
    url: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
    kind: docs
  - label: OpenAI Agents SDK 官方文档 · Guardrails（2026-10-20 直抓 200）
    url: https://openai.github.io/openai-agents-python/guardrails/
    kind: docs
  - label: Anthropic 工程博客 · Building effective agents（2026-10-20 WebFetch 核验官方页）
    url: https://www.anthropic.com/engineering/building-effective-agents
    kind: docs
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**agent 的成本就是 token 乘以步数，再乘以每步带着的上下文。**
三个因子，三个抓手：砍无效 token、缩短上下文、限制步数。
本篇只讲机制与做法，不引任何价格数字——
具体价格以各厂商官方定价页为准。

## [先记账：钱花在哪|First, account for it]

不知道花在哪，就谈不上省。
OpenAI 的缓存文档示范了最小记账单位：
每次响应的 usage 里分开报输入、输出、缓存写入、缓存读取四类 token。
先按这四类建账，再谈优化——
否则你连「缓存到底命中了没有」都不知道。

典型的成本结构：

1. 输入 token：历史越长越贵，多轮对话里它常是大头。
2. 输出 token：通常比输入贵，但总量可控。
3. 步数：agent 每跑一步就是一次完整调用，循环十次付十次。
4. 工具往返：每次工具调用的定义和结果都进上下文。

## [抓手一：前缀缓存|Lever one: prefix caching]

同一段内容反复发给模型，是最大的浪费。
主流厂商的解法都是**前缀缓存**：把请求开头完全相同的部分缓存下来复用。

**OpenAI**：缓存对符合条件的请求自动生效，无需改代码。
命中要求前缀完全一致。
**OpenAI 官方原文**："Cache hits are only possible for exact prefix matches within a prompt."

官方建议把静态内容（指令、示例）放提示词开头，
变化内容（用户信息）放末尾。
GPT-5.6 及之后的模型上还支持显式缓存断点，
并可用 `prompt_cache_key` 把共享长前缀的请求路由到一起。
缓存按用量分桶记账在 `cached_tokens` 里。

**Anthropic**：用 `cache_control` 标记缓存断点，
可缓存的部分包括工具定义、system、对话消息。
内容有最小长度门槛，达不到就不缓存——静默跳过，不报错。
缓存有存活期，默认短时效，命中即续期。

缓存按 tools → system → messages 的层级组织，
改动哪一层会让该层及之后的缓存失效。
响应里的 `cache_creation_input_tokens` 与 `cache_read_input_tokens`
就是缓存效果的账本。

两条通用纪律：
**静态在前，变化在后**；
**先确认命中再庆祝**——创建很多、读取很少，说明前缀根本没稳住。

## [抓手二：上下文治理|Lever two: context hygiene]

上下文膨胀是 agent 成本的隐形推手。几个有据可查的手段：

**摘要续接**：长对话压成摘要再续，而不是全量续。
这是压缩，不是记忆——详见[记忆系统](agent-memory.md)一篇的边界讨论。

**按需召回**：不把知识库整篇塞进提示词，用时才检索——
RAG server 的做法，见 [context7](../../tools/products/context7.md) 档案。

**及时收尾**：任务完成就停，别让 agent「再检查一遍」地空转。
步数上限要在 harness 层设死，不能指望模型自觉。

**分级用模型**：简单的步（分类、抽取）用快而小的模型，难的步才上大模型。
**OpenAI 官方原文**：guardrails 文档的例子是用一个快而省的模型先做检查，
"saving time and money"，挡在贵模型前面。

## [抓手三：挡在门外|Lever three: block before you pay]

最便宜的调用是从未发生的调用。
OpenAI Agents SDK 的 guardrails 有两种执行方式，成本语义完全不同。

**并行执行**（默认）：护栏与 agent 同时跑，延迟最低。
但触发时 agent 可能已经烧过 token、执行过工具。

**阻塞执行**：护栏先跑完，agent 后启动。
触发即止，token 与工具副作用都不会发生。
**OpenAI 官方原文**：阻塞执行 "is ideal for cost optimization and when you want to avoid potential side effects from tool calls"。
对「恶意输入根本不该进贵模型」的场景，阻塞执行是明确更省的选择。

注意输出护栏不支持并行参数——它永远在 agent 完成后跑。

## [别忘了隐性成本|Hidden costs]

**Anthropic 官方原文**："Agentic systems often trade latency and cost for better task performance."

延迟也是成本——用户等不及会走。
以及错误复合的返工成本：一步错、步步错，
重跑十次的账单比一次大模型直接答完还贵。
先算总账，再决定省哪一段。
