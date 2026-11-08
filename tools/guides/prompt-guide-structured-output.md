---
id: prompt-guide-structured-output
topic: prompts
kind: prompt-guide
title: 结构化输出的三道闸
titleEn: Three gates of structured output
summary: 提示词请求格式、API 层 schema 约束、协议侧校验各管一段；格式合法从来不等于内容正确。
summaryEn: Prompt-level requests, API-level schema constraints, and protocol-side validation each cover one stretch — valid format never means correct content.
sources:
  - label: OpenAI Cookbook · Introduction to Structured Outputs（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb
    kind: docs
  - label: Anthropic 官方教程 · Formatting Output and Speaking for Claude（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/05_Formatting_Output_and_Speaking_for_Claude.ipynb
    kind: docs
  - label: MCP 规范 · Tools（2026-11-07 直抓 200）
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    kind: spec
  - label: Grammar-Constrained Decoding 论文（arXiv 2305.13971，2026-11-07 直抓摘要页）
    url: https://arxiv.org/abs/2305.13971
    kind: paper
last_verified: 2026-11-07
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**「请输出 JSON」是请求，不是保证。**
让输出可被程序消费，有三道闸：提示词层请求格式，
API 层用 schema 约束生成，协议层对结果做校验。
三道闸管的事不同，失效方式也不同。
效果未实测；以下机制均出自官方文档、规范与论文。

## [提示词层：标签与预填|Prompt level: tags and prefill]

Anthropic 官方教程教了两招。
第一招：让模型把答案包进 XML 标签，程序取标签之间的内容即可。
第二招叫预填（prefill）：把开场标签或 `{` 放进 assistant 轮，
模型会从这个位置接着写。官方措辞很克制：
强制 JSON 输出「不是确定性的，但接近」（原文 "not deterministically, but close to it"）。
配套技巧：把闭合标签设为 `stop_sequences`，答案一出就停，省掉收尾废话。

提示词层成本低、随模型可用，但它只是引导。
模型仍可能跑偏，下游必须容错。

## [API 层：schema 约束|API level: schema constraints]

OpenAI 的 Structured Outputs 把约束下沉到生成过程。
官方原文：它 "guarantees the model will always generate responses that adhere to your supplied JSON Schema"。
开启方式是 `strict: true`，可用于响应格式或函数定义。

与 JSON mode 的区别要分清：
JSON mode 只保证输出是合法 JSON；Structured Outputs 连形状一起约束。
官方列的典型用途：UI 按结构渲染、从文档抽取填库、抽实体调工具。

两个工程细节：
模型出于安全拒绝回答时，拒绝内容不符合你的 schema——
API 用单独的 `refusal` 字段标示，反序列化前要分开处理。
SDK 提供 `parse` 助手，可直接传 Pydantic 模型代替手写 schema。

## [解码层：语法约束生成|Decoding level: grammar-constrained generation]

API 层的保证从哪来？语法约束解码（GCD）是背后的机制之一。
论文的做法：用形式语法描述输出空间，生成时只允许符合语法的 token。
结构由此得到保证，而不是靠模型自觉。
论文还提出输入相关语法：不同输入可以对应不同输出结构。
这条路线不需要微调，适合训练数据少、微调贵的结构化任务。

## [协议层：MCP 的两个 schema|Protocol level: MCP's two schemas]

工具协议把校验写进了规范。MCP 的 tool 定义里：
`inputSchema` 约束入参，`outputSchema` 可选地约束结果结构。
规范要求：提供 outputSchema 时，server 必须返回符合的结果，
client 应当对照 schema 校验。

一个容易混的概念，规范专门澄清：
"structuredContent is server-produced result data and is unrelated to LLM 'structured outputs'"。
也就是说，MCP 的结构化结果是 server 产出的数据，
与模型侧的 schema 约束生成是两回事。两道闸各管各的。

## [失败模式|Failure modes]

1. 合法不等于正确：JSON 解析成功，字段值仍可能是错的。语义对错要靠评测。
2. 拒绝击穿 schema：安全拒绝不走你的格式，硬反序列化会报错。先查 refusal。
3. 预填不是保证：它把模型推向格式，不锁死格式。下游仍要校验。
4. 混淆两道闸：把 server 返回的结构化数据当成模型生成的保证，或反过来。

约束越强，灵活性越低：schema 写得太死，模型遇到边缘输入没有退路。
schema 设计要留合理的可选字段与拒绝通道。

## [出处|Sources]

- [OpenAI Cookbook · Introduction to Structured Outputs](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Structured_Outputs_Intro.ipynb)
- [Anthropic 官方教程 · Formatting Output and Speaking for Claude](https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/05_Formatting_Output_and_Speaking_for_Claude.ipynb)
- [MCP 规范 · Tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [Grammar-Constrained Decoding（arXiv 2305.13971）](https://arxiv.org/abs/2305.13971)

核验日 2026-11-07，四条均直抓成功。
OpenAI 与 Anthropic 的文档主站本次网络不可达，官方内容取自两家官方仓库的 raw 文件。