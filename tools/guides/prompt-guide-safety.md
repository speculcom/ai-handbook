---
id: prompt-guide-safety
topic: prompts
kind: prompt-guide
title: 提示词安全的边界
titleEn: Boundaries of prompt safety
summary: 注入攻击钻的是数据与指令的模糊边界：分隔、护栏、最小权限各挡一层，也各有代价与失效方式。
summaryEn: Injection attacks exploit the blurred boundary between data and instructions — separation, guardrails, and least privilege each block a layer, each with costs and failure modes.
sources:
  - label: OpenAI Cookbook · How to use guardrails（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/How_to_use_guardrails.ipynb
    kind: docs
  - label: Anthropic 官方教程 · Separating Data and Instructions（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/04_Separating_Data_and_Instructions.ipynb
    kind: docs
  - label: Indirect Prompt Injection 论文（arXiv 2302.12173，2026-11-07 直抓摘要页）
    url: https://arxiv.org/abs/2302.12173
    kind: paper
  - label: MCP 规范 · Security Best Practices（2026-11-07 直抓 200）
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices
    kind: spec
last_verified: 2026-11-07
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**提示词安全的核心问题：模型分不清指令和数据。**
论文的一句话概括：LLM 集成应用 "blur the line between data and instructions"。
攻击者把指令藏进数据，模型就可能照办。
防御分三层：提示词层分隔、应用层护栏、协议层最小权限。
效果未实测；以下机制均出自官方文档、规范与论文。

## [注入：数据里藏着指令|Injection: instructions hidden in data]

间接提示注入的攻击路径（论文定义）：
攻击者不直接接触模型，而是把提示词埋进可能被检索的数据里——
网页、文档、邮件，等应用自己取回来喂给模型。
论文演示的后果包括数据窃取、蠕虫式传播、污染信息生态；
处理被检索的提示词，效果可类比任意代码执行：
操纵应用行为，决定其他 API 调不调、怎么调。
论文发表时的判断：有效的缓解手段仍然缺乏。

## [提示词层：分开数据与指令|Prompt level: separate data from instructions]

Anthropic 官方教程的做法：提示词模板加变量替换，
变量内容用 XML 标签包起来，让模型知道数据从哪开始、到哪结束。
教程的反例：不包标签时，用户输入里的「Yo Claude」被当成任务的一部分。
分隔让注入文本更难越过数据的边界。

两个清醒剂：
官方说 Claude 被训练识别 XML 标签，但没有必用的「魔法标签」；
分隔是缓解，不是保证——论文指出的攻击面并没有因此消失。

## [护栏：输入与输出|Guardrails: input and output]

OpenAI 教程把护栏定义为检测性控制，分两侧：
输入侧在内容进模型前拦截——离题、越狱、提示注入；
输出侧在结果给用户前校验——幻觉、违规内容、语法损坏。
护栏可与主调用并行跑，触发才拦截，压低延迟。

阈值是取舍，不是玄学：官方建议建评测集、用混淆矩阵定容忍度。
误报多，正常请求被拒，体验碎裂；
漏报多，危险内容放行，业务承担后果。
不同场景容忍度不同：越狱风险高的场景阈值要更严。

## [护栏的局限|Limits of guardrails]

官方教程列了三条，条条要紧：
用 LLM 当护栏，它和主调用有同样的漏洞——一次注入可能同时骗过两者；
对话越长，指令被稀释，越狱越容易；
护栏过严会过度拒绝，把正常请求误判成攻击。

官方给的缓解：与规则式检测或传统模型组合；
有的护栏只看最新一条消息，避免长对话干扰；
灰度上线并监控，把新攻击样本回灌进护栏。

## [协议层：最小权限与同意|Protocol level: least privilege and consent]

提示词挡不住的，协议层接着挡。MCP 安全规范的要求：
权限最小化——起步只给低风险的基础权限集，
特权操作首次触发时再增量提权，避免通配符与一揽子权限。
宽权限的代价规范写得很全：令牌泄露波及面大、撤销牵动全部流程、审计看不清意图。

代理服务器必须逐客户端取得用户同意，防 confused deputy 攻击；
token passthrough（把客户端令牌原样转给下游）被明确列为禁止的反模式。
工具侧的权限设计，决定了注入成功后攻击者能走多远。

## [失败模式|Failure modes]

1. 信任检索内容：把取回来的网页、文档当成可信指令源，注入直接进上下文。
2. 单层幻觉：以为一道护栏就够，忘了护栏与主调用共享漏洞。
3. 过度拒绝：为防注入把护栏调得太严，正常请求大面积被拒。
4. 权限一次给满：泄露一个令牌等于交出全部能力，撤销还要重新同意一遍。
5. 长对话麻痹：轮次越多指令越稀释，监控要跟着轮次走。

三层防御的共同逻辑：承认模型会受骗，把损失控制在每一层的边界内。

## [出处|Sources]

- [OpenAI Cookbook · How to use guardrails](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/How_to_use_guardrails.ipynb)
- [Anthropic 官方教程 · Separating Data and Instructions](https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/04_Separating_Data_and_Instructions.ipynb)
- [Indirect Prompt Injection（arXiv 2302.12173）](https://arxiv.org/abs/2302.12173)
- [MCP 规范 · Security Best Practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)

核验日 2026-11-07，四条均直抓成功。
OpenAI 与 Anthropic 的文档主站本次网络不可达，官方内容取自两家官方仓库的 raw 文件。