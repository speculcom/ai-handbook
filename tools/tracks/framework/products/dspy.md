---
id: dspy
form: harness
name: DSPy
vendor: Stanford NLP / Databricks
homepage: https://dspy.ai
license: MIT（GitHub API 核验 2026-10-30）。
licenseEn: MIT (GitHub API verified 2026-10-21).

family: orchestration
providers:
  - dspy.LM 统一接入：OpenAI/Anthropic/Gemini/本地 vLLM 等（官方 docs 列举，未逐条清点）
  - 官方叙事里 LM 层依托 LiteLLM 的支持面——provider 面大体随 LiteLLM（本轮未逐条核验）
axes:
  model_access: >-
    各家 LM 通过 dspy.LM 统一接入（OpenAI/Anthropic/Gemini/本地 vLLM 等，
    以官方 docs 的 LM 集成线为准，未逐条清点）；它的差异点是**把提示词当可编程参数**——
    签名（signature）声明输入输出，优化器自动调提示与权重示例。
  runtime: >-
    Python 库（pip 装进你的进程）；GitHub 38,850★，最近推送 2026-10-29（API 核验）。
    学术出身（Stanford NLP），工业侧 Databricks 投入（官方叙事口径）。
  local_files: >-
    库形态跑在你进程里；优化产物（program 状态/示例）落你指定路径——数据不出你侧。
  background: >-
    库无常驻语义；优化（teleprompting）是离线批任务，跑完即止。
  tools: >-
    ReAct 类 agent 模块与工具调用在官方模块族内；MCP 支持状态未核验到官方主线声明。
  context: >-
    状态管理跟着你的 program 走；跨会话记忆不是它的叙事——它的「记忆」是优化出来的示例与权重。
  permissions: >-
    无账号体系；权限面=你接的各家 API key。优化过程会大量调模型（token 成本面），
    预算控制参数在官方文档线，细节未逐条核验。
  fit: >-
    适合：把「调提示词」变成可复现的优化流程（有指标、有训练集）、多模型可换的管线。
    不适合：要开箱 agent 运行时；小样本没指标时（优化器吃指标，没指标没意义）。

pitfalls:
  - 把 DSPy 当「又一个 prompt 模板库」——它的核心是优化器（把提示当参数训练），不用优化器等于白用
  - 没有评估指标就上优化器——优化器需要 metric，没指标时它无从优化
  - 优化期 token 成本不设上限——先设预算参数再跑（官方文档有控制面）

tags: [开源, MIT, 提示优化, 编程式LM, 学术出身]
related: [cursor, claude-code]

sources:
  - label: stanfordnlp/dspy · 仓库（MIT；38,850★，最近推送 2026-10-29，GitHub API 核验）
    url: https://github.com/stanfordnlp/dspy
    kind: repo
  - label: DSPy · 官方文档
    url: https://dspy.ai
    kind: docs
  - label: stanfordnlp/dspy · Releases（changelog）
    url: https://github.com/stanfordnlp/dspy/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Stanford NLP 起源，现与 Databricks 有官方投入线。
  origin_note_en: Stanford NLP origin, with official Databricks investment lines.
  direct: yes
  direct_note: dspy.ai 直连实测 200（2026-10-21）。
  direct_note_en: dspy.ai measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**DSPy 把「调提示词」变成编程问题**（MIT，Stanford NLP/Databricks）：签名声明输入输出，
优化器把提示当参数训练。用它的分水岭一句话：**有没有评估指标**——有指标它是杠杆，没指标它无从下手。

## 适合与不适合

适合：可复现的提示优化流程、多模型可换管线、有 metric 的成熟任务。
不适合：开箱 agent 运行时；无指标的探索期任务。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- LM 集成全目录（未逐条清点）
- MCP 支持状态（未核验到官方主线声明）
- 各优化器的样本量经验值（官方有指引，未逐条核验）

## 相关条目

- [LangChain](./langchain.md) — 同层对照：LangChain 编排组件，DSPy 优化提示——一个管接线一个管调教。
- [Pydantic AI](./pydantic-ai.md) — 同为「类型/结构优先」路线：Pydantic 管输出结构，DSPy 管提示质量。
