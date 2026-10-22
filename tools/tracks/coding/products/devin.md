---
id: devin
form: cloud
name: Devin
vendor: Cognition
homepage: https://devin.ai

axes:
  model_access: >-
    官方可读页（docs intro 与 release notes）未列「用户选模型」的面——模型与版本由厂商侧决定，
    这是厂商云形态的共性（本站判断，依据是「已查 intro 页未见 model 选择文档」，不是「官方声明不可选」）。
  runtime: >-
    会话跑在 Devin 的云工作区：网页端（app.devin.ai）内嵌三件套——Shell（看命令执行）、
    嵌入式 IDE（可实时接管改代码）、Browser（看它查文档/测应用）。另有 Devin for Terminal
    （cli.devin.ai 安装）在你本机跑，长任务用 /handoff 交给云端 Devin；还有 Devin API。
  local_files: >-
    云端会话不碰你本机文件——它在你授权的仓库上 clone、改、提 PR；仓库可见范围由集成授权决定。
    Terminal 形态是例外：它直接在你本机环境跑，接管的是本地代码库。
  background: >-
    主轴就是异步：官方按「自主 AI 软件工程师」定义它，适合并行处理多个任务——Linear/Jira 工单、
    整段新功能、bug 复现修复、迁移重构。官方经验法则原文：「if you can do it in three hours,
    Devin can most likely do it」（可验证性高的任务成功率高）。
  tools: >-
    工作区自带 shell/浏览器/IDE 三类工具；与 Slack/Teams 线程直接 @Devin 派单，Linear/Jira 工单线集成。
    MCP 支持状态未逐条核验（docs 有 integrations 分区，本次未逐页读）。
  context: >-
    以会话为单位组织工作；知识沉淀/记忆面未逐条核验。官方建议把任务写清完成标准、拆成可验证步骤——
    上下文给多少由你在派单时决定。
  permissions: >-
    账号+组织体系：企业管理员分配权限；仓库访问经集成授权（GitHub 等）划定范围；API 访问单独配。
    云端环境有联网能力（Browser 工具是产品语义的一部分），官方要求按对待公共计算面的标准看待它。
  fit: >-
    适合：把积压工单批量委派出去、并行跑多个任务、在 Slack 里随手 @ 派单、要「先给个草稿 PR 再接管」。
    不适合：要选模型、要全程本机执行（Terminal 只覆盖轻任务）、要把密钥放进被 clone 的仓库。

pitfalls:
  - Devin 与 Windsurf 同属 Cognition，但是两条产品线——云异步工程师 vs IDE（Windsurf 档案另列），别混成一个
  - 「三小时法则」是官方经验法则不是保证——官方自己强调任务要「容易验证」（CI 能过/能自动部署验证）
  - Terminal 在本机跑、/handoff 把任务送去云端——同一工具里数据边界会切换，交接前先想清楚代码去哪

tags: [闭源, 云异步, 工单委派, Slack集成, API]
related: [linear-mcp, github-mcp, sentry-mcp]

sources:
  - label: Devin Docs · Introducing Devin（产品定义/工作区三件套/接入方式）
    url: https://docs.devin.ai/get-started/devin-intro
    kind: official
  - label: Devin Docs · Release Notes（changelog）
    url: https://docs.devin.ai/release-notes/overview
    kind: changelog
  - label: Cognition · Devin GA 博客
    url: https://cognition.com/blog/devin-generally-available
    kind: official
  - label: Devin for Terminal · 安装入口
    url: https://cli.devin.ai
    kind: official

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Cognition（美国）；与 Windsurf 同厂。
  origin_note_en: Cognition (US); same vendor as Windsurf.
  direct: yes
  direct_note: devin.ai 与 docs.devin.ai 大陆直连实测 200（2026-10-21）。
  direct_note_en: devin.ai and docs.devin.ai measured 200 direct from mainland (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Devin 是「工单进、草稿 PR 出」的云异步软件工程师**（Cognition）：会话在厂商云工作区跑，
自带 shell/IDE/浏览器，Slack/Linear/Jira 直接派单，并行处理积压任务。

## 适合与不适合

适合：批量委派工单、并行多任务、草稿 PR 再接管。
不适合：要选模型、要全程本机执行、仓库里带密钥。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **模型面到底有没有选择**——官方文档未见 model 选择页，实测登录后可确认
- **Slack 派单到 PR 开出的完整链路时长与失败重试行为**
- **Terminal 与 /handoff 交接时，本地未提交改动怎么处理**

## 未知项清单

- 模型选择面是否存在（官方文档未见，未实测）
- MCP 支持状态（docs integrations 分区未逐页读）
- 知识/记忆沉淀机制细节（未逐条核验）
- 云端工作区的网络出口与持久化策略细节（未逐条核验）

## 相关条目

- [Windsurf](./windsurf.md) — 同厂另一条线：IDE 形态的人机同侧编辑，与云异步工程师互补。
- [Jules](./jules.md) — 同为云异步 agent：Google 的按任务开新 VM vs Devin 的会话工作区。
