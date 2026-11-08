---
id: prompt-guide-anatomy
topic: prompts
kind: prompt-guide
title: 提示词的解剖结构
titleEn: Anatomy of a prompt
summary: 把提示词拆成角色、指令、分隔符、示例、推理五种块，讲清各块的作用、摆法与常见失效。
summaryEn: Break a prompt into roles, instructions, delimiters, examples, and reasoning — what each block does, where it goes, and how it fails.
sources:
  - label: OpenAI Cookbook · GPT-4.1 Prompting Guide（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb
    kind: docs
  - label: Anthropic 官方教程 · Basic Prompt Structure（官方仓库 raw 文件，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/01_Basic_Prompt_Structure.ipynb
    kind: docs
  - label: The Prompt Report 论文（arXiv 2406.06608，2026-11-07 直抓摘要页）
    url: https://arxiv.org/abs/2406.06608
    kind: paper
last_verified: 2026-11-07
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**提示词解剖，就是把一条提示词拆成职责明确的块。**
角色、指令、分隔符、示例、推理，各块解决不同的问题。
The Prompt Report 综述整理了 58 种提示技术与 33 个术语（论文口径）。
技术名目虽多，骨架大同小异。这篇讲骨架怎么搭、块怎么摆。
这些技术的效果未实测；机制与结论均出自官方文档和论文。

## [消息角色：对话的骨架|Message roles: the conversation skeleton]

API 收到的不是一整段文本，而是带角色的消息序列。
Anthropic 官方教程以 Messages API 为例：
`messages` 是 `user` 与 `assistant` 交替的数组，首条必须是 `user`。
`system` 是独立参数，放任务背景、规则与指引，不与对话混排。
`max_tokens` 是硬上限：到了就停，可能停在半句话。

OpenAI 的 GPT-4.1 指南同样按角色组织：
系统提示放行为规则，工具走 API 的 `tools` 字段。
官方不建议把工具描述手工塞进提示词，再自写解析器。
角色分错，后面所有块都摆不稳。

## [指令块与分隔符|Instruction blocks and delimiters]

OpenAI 给出的起点骨架，按需增删：
角色与目标 → 指令（可分子类）→ 推理步骤 → 输出格式 → 示例 → 上下文 → 收尾指令。

分隔符决定模型能否分清各块。
GPT-4.1 指南的建议：从 Markdown 标题起步；
XML 适合精确包裹、嵌套和挂元数据；JSON 更啰嗦、要转义。
长上下文喂大量文档时，OpenAI 自测 XML 表现好、JSON 明显差。
这是厂商自述的测试结论，换模型要重新验证。

## [示例与推理块|Examples and reasoning blocks]

示例块用「示范」代替「描述」。
The Prompt Report 把这类技术归为 few-shot：给若干输入输出对，让模型照着做。
不给示例叫 zero-shot，给一个例子叫 one-shot。
GPT-4.1 指南提醒：示例里展示的关键行为，规则里也要写明，两处对齐。

推理块让模型先想后答。
GPT-4.1 不是推理模型，但可以用提示诱导它逐步规划。
代价写在官方指南里：更多输出 token，更高延迟。
从简单的「逐步思考」起步，再按失败案例补充具体策略。

## [位置与顺序|Placement and order]

块的内容重要，摆的位置也重要。
GPT-4.1 指南的长上下文实验结论：
指令放在上下文首尾两端，好于只放一端；
只放一处时，放上下文上方好于下方。
指令互相冲突时，GPT-4.1 倾向服从靠近结尾的那条。
收尾指令不是客套，是最后一道纠偏。

## [失败模式|Failure modes]

1. 字面服从：要求「回答前必须调工具」，信息不足时模型可能编造参数。官方建议补一句：信息不够就向用户要。
2. 示例复读：给了示范短语，模型可能逐字照搬。要明确要求按情况变化。
3. 自由发挥：没约束时，模型爱加解释和多余格式。用指令和示例收住。
4. 迁移失效：换模型后，旧提示词里靠模型脑补的隐含规则会失效，要显式写清。

官方自己的告诫：没有放之四海皆准的建议。
提示词工程是经验学科，要配评测持续迭代。

## [出处|Sources]

- [OpenAI Cookbook · GPT-4.1 Prompting Guide](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt4-1_prompting_guide.ipynb)
- [Anthropic 官方教程 · Basic Prompt Structure](https://raw.githubusercontent.com/anthropics/courses/master/prompt_engineering_interactive_tutorial/Anthropic%201P/01_Basic_Prompt_Structure.ipynb)
- [The Prompt Report（arXiv 2406.06608）](https://arxiv.org/abs/2406.06608)

核验日 2026-11-07，三条均直抓成功。
OpenAI 与 Anthropic 的文档主站本次网络不可达，官方内容取自两家官方仓库的 raw 文件。