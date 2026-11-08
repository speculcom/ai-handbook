---
id: prompt-guide-context
topic: prompts
kind: prompt-guide
title: 上下文是预算不是仓库
titleEn: Context is a budget, not a warehouse
summary: 窗口再大注意力也会稀释：静态前置、按需检索、压缩与笔记，把每个 token 花在高信号处。
summaryEn: Bigger windows still dilute attention — static content up front, just-in-time retrieval, compaction and notes spend tokens where signal is highest.
sources:
  - label: Anthropic Engineering · Effective context engineering for AI agents（2026-11-07 直抓 200）
    url: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
    kind: engineering
  - label: OpenAI Cookbook · Prompt Caching 101（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Prompt_Caching101.ipynb
    kind: docs
  - label: Lost in the Middle 论文（arXiv 2307.03172，2026-11-07 直抓摘要页）
    url: https://arxiv.org/abs/2307.03172
    kind: paper
last_verified: 2026-11-07
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**上下文工程管的是：每次推理时，窗口里该放哪些 token。**
Anthropic 官方定义：提示词工程写指令，上下文工程在推理过程中
策划并维护最优的 token 集合——系统指令、工具、外部数据、消息历史都算。
窗口是预算，不是仓库：塞得越多，不等于用得越好。
效果未实测；以下机制均出自官方文档与论文。

## [注意力预算与位置效应|Attention budget and position effects]

Anthropic 把这种现象叫 context rot：
上下文 token 越多，模型从中准确召回信息的能力越差。
根源在 transformer 架构：n 个 token 有 n² 对注意关系，
序列越长，捕捉这些关系的能力被摊得越薄。
训练数据里短序列更多，模型对长程依赖的经验也更少。

Lost in the Middle 论文在多文档问答与键值检索两个任务上发现：
相关信息在开头或结尾时表现最好，落在长上下文中段时显著变差。
显式支持长上下文的模型也一样。
结论：关键信息别埋在中段，窗口大不等于处处好使。

## [静态前置，动态后置|Static first, dynamic last]

OpenAI 的提示词缓存按前缀匹配：
请求先查提示词开头部分是否已缓存，命中就复用，未命中则全量处理并缓存前缀。
超过 1024 token 自动启用，不用改请求。
由此推出摆法：指令、示例、工具定义放前面，用户相关的变化内容放最后。

三个细节决定命中率：
工具定义与顺序必须逐次完全一致；
多轮历史只在 messages 数组末尾追加，不重排；
响应里的 `cached_tokens` 字段可查命中量，长期不用的前缀会被逐出。
缓存按组织隔离；官方说明缓存过程不存储数据，符合零数据保留条件。

## [按需检索与渐进披露|Just-in-time retrieval and progressive disclosure]

另一种省预算的方式：不预载数据，只保留轻量标识符。
文件路径、存储的查询、链接，运行时用工具按需加载。
Anthropic 以 [Claude Code](../../coding/products/claude-code.md) 为例：
写定向查询、用 head/tail 看片段，大数据对象从不整体进窗口。
标识符的元数据自带信号：目录、命名、时间戳暗示用途与相关性。
agent 由此逐层探索，工作记忆只留当前需要的部分。

取舍官方也写明了：运行时探索比预检索慢；
缺引导时 agent 会滥用工具、追死胡同、漏掉关键信息。
混合策略常见：一部分数据预载求快，其余留给自主探索。

## [长任务的三种手法|Three techniques for long tasks]

任务超过窗口时，Anthropic 给了三条路：

1. 压缩（compaction）：接近上限时摘要历史、重开窗口。先调召回再调精度；清理旧工具结果是最轻的一档。
2. 结构化笔记：agent 定期把笔记写到窗口外，之后再读回。进度与依赖不因窗口重置而丢。
3. 子代理：各子代理用干净窗口做深度探索，只回传蒸馏后的摘要，主代理管综合。

选择按任务特征：压缩保对话连贯，笔记适合有里程碑的迭代开发，
子代理适合并行探索有收益的研究分析。

## [失败模式|Failure modes]

1. 边缘情况清单：把每条规则都塞进提示词。官方建议改用多样、典型的示例。
2. 工具集膨胀：功能重叠、选择模糊。人都分不清该用哪个工具，agent 更分不清。
3. 压缩过狠：丢掉当时不起眼、后来才关键的细节。压缩提示要在复杂轨迹上调。
4. 等更大窗口：官方判断是窗口再大也有相关性问题，策展省不掉。

系统提示本身也有两个极端：硬编码 if-else 太脆，空泛指引太虚。
官方建议从最小提示起步，按失败模式逐步加指令和示例。

## [出处|Sources]

- [Anthropic Engineering · Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [OpenAI Cookbook · Prompt Caching 101](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Prompt_Caching101.ipynb)
- [Lost in the Middle（arXiv 2307.03172）](https://arxiv.org/abs/2307.03172)

核验日 2026-11-07，三条均直抓成功。
OpenAI 文档主站本次网络不可达，官方内容取自其官方仓库 raw 文件。