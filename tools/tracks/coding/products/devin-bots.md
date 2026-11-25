---
id: devin-bots
form: cloud
name: Devin Bots
vendor: Cognition
homepage: https://devin.ai/bots
license: 商业 SaaS，随 Cognition / Devin 服务条款。无自托管形态。
licenseEn: Commercial SaaS under Cognition / Devin terms; no self-hosted form.

family: autonomous-agent
axes:
  model_access: >-
    Devin Bots 跑在 Devin 既有模型栈上。官方没有把模型选择开放给用户，也没有点名底层模型。本档不推断具体型号。
  runtime: >-
    云端持久 agent。每个 Bot 有自己的名字、记忆和工具，可以并行领导多个 Devin 会话。入口在 Devin app、Slack、iMessage。Bot 负责调查、派活、评估结果，再决定下一步。
  local_files: >-
    不碰本机文件。工作在已授权的代码仓与集成里。代码 clone、修改、提 PR 仍在 Devin 的云工作区完成。仓库范围由 GitHub 等集成授权决定。
  background: >-
    常驻：Bot 跨会话保留上下文，会主动发报告、跟进卡住的会话。需要人判断的决定送到 Needs You inbox。多个 Bot 可以互相协调，把更新汇总给一个负责人。
  tools: >-
    继承 Devin 已有的集成与权限：Slack、GitHub、Linear/Jira 等。Bot 可开子 Devin 会话、跑测试、看 CI、提 PR。MCP 的逐项支持状态本档未核验，记为未知。
  context: >-
    每个 Bot 有自己的记忆，保留项目事实、决策与 review 偏好。不是把整段聊天塞进上下文，而是按目标与工作流沉淀。Bot 之间可以共享团队上下文。
  permissions: >-
    沿用组织/仓库授权。可规定 Bot 能访问哪些系统、能改什么、何时需要审批。花费与发布可设人工门。团队可共享 Bot，但最终决定仍回到人。
  fit: >-
    适合：有持续工程目标、需要有人端到端盯着的团队。比如保持 Android/iOS 同步、维护开源仓、管发布、优化推理服务。已经有测试、CI、benchmark 等验收信号的团队。
    不适合：一次性小任务（直接派 Devin 会话更便宜）。没有验收标准就想放权。要求自托管或指定模型。
pitfalls:
  - 把 Bot 当自动派单的 Devin：它own 的是结果，不是一张任务单
  - 以为有独立模型/独立计费：它复用 Devin 平台，官方未单列计费面
  - 没有验收信号就放权：官方明确要求先定义成功标准与反馈机制

tags: [闭源, 云持久agent, 工程目标, 多Devin协作, Slack, 审批]
related: [openai-agents-sdk, agentforce]

sources:
  - label: Devin · Introducing Devin Bots（官方发布，目标/记忆/多 Devin/Needs You）
    url: https://devin.ai/blog/introducing-devin-bots
    kind: official
  - label: Devin Bots · 产品入口
    url: https://devin.ai/bots
    kind: official
  - label: Devin Docs · Release Notes（平台变更入口）
    url: https://docs.devin.ai/release-notes/overview
    kind: changelog
  - label: Devin Docs · Introducing Devin（账号、工作区、集成与权限基线）
    url: https://docs.devin.ai/get-started/devin-intro
    kind: docs

last_verified: 2026-11-23
last_updated: 2026-11-23
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: Cognition（美国），与 Devin、Windsurf 同厂。
  origin_note_en: Cognition (US); same vendor as Devin and Windsurf.
  direct: unknown
  direct_note: docs.devin.ai 大陆直连实测 200。devin.ai 主域与官方 blog 当日实测超时 000（2026-11-23 复核），整体直连性标 unknown。
  direct_note_en: docs.devin.ai measured 200 direct from mainland; the devin.ai main domain and official blog timed out (000) on 2026-11-23 — overall directness marked unknown.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-23 检索）。该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-11-23); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-11-23
---

## 一句话定位

**Devin Bots 把「派任务」变成「给目标」**。每个 Bot 是一个持久工程 teammate，有自己的记忆和工具，能并行带多个 Devin 会话。它自己决定下一步，只在需要人判断时找你。

它和 Devin 的差别不是模型更强，而是责任边界更大。Devin 完成一张任务单，Bot 对一个持续结果负责。

## 适合与不适合

适合：有持续目标、能定义验收信号的工程团队。需要一个人盯多条工作流。已经在用 Devin 的团队。

不适合：一次性小任务。没有测试/CI/benchmark 就想放权。要自托管或指定模型。

## 实测记录

本档未跑 Devin Bots 端到端项目。结论只覆盖官方发布页、产品入口与 Devin 文档基线。官方给出的 Android、布局回归、游戏工作室案例是厂商自述，未独立复现。

## 未知项清单

- Bot 底层模型与版本（官方未点名）
- MCP 支持的逐项状态（本次未逐页核验）
- Bot 的独立计费与配额（官方未单列，按 Devin 平台条款走）

## 相关条目

- [Devin](./devin.md) — 同厂的基础会话形态：Devin 完成具体任务，Bots 对持续目标负责并调度多个 Devin。
- [OpenAI Agents SDK](../../framework/products/openai-agents-sdk.md) — 另一个「agent 编排」对照：SDK 给你代码级编排，Bots 给你一个托管好的工程 teammate。
- [Salesforce Agentforce](../../automation/products/agentforce.md) — 企业 agent 平台对照：Agentforce 锚在 CRM 上下文，Bots 锚在代码仓与工程结果。
