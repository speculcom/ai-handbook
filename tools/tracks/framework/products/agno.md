---
id: agno
form: harness
name: Agno（原 Phidata）
nameEn: Agno (formerly Phidata)
vendor: Agno Inc.
homepage: https://www.agno.com
license: Apache-2.0（GitHub API 核验 2026-10-31）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-31).

family: orchestration
providers:
  - 多模型接入（各家 API 与本地线，未逐条清点）
axes:
  model_access: >-
    多模型接入（各家 API 与本地线，未逐条清点）；定位语「The self-driving agent platform」
    （官方仓描述）——框架库 + 控制平面（AgentOS）两层。
  runtime: >-
    Python 框架 + AgentOS 运行时：库侧定义 agent/team/workflow，控制平面侧跑与观测。
    GitHub agno-agi/agno 42,981★、最近推送 2026-10-30（API 核验，高活跃）；
    releases 高频（v3.1.12，2026-10-29）；官网 changelog 最新条目 2026-10-30。
  local_files: >-
    库与 AgentOS 可自托管（「runs in your cloud」官方口径）；托管控制平面是另一产品面（os.agno.com）。
  background: >-
    AgentOS 控制平面自带常驻运行与观测语义（agent 跑在平面里、任务可调度）；
    纯库用法则是普通进程内调用。
  tools: >-
    工具/知识库/记忆组件线内置（框架自带 memory+knowledge 组件是卖点）；MCP 支持状态未逐条核验。
  context: >-
    内置记忆与知识组件（agent memory、knowledge/RAG 面）是产品叙事一部分；细节未逐条核验。
  permissions: >-
    控制平面持凭据跑 agent 与工具——自托管平面的鉴权与隔离是运维责任；
    托管面（os.agno.com）数据在厂商侧。
  fit: >-
    适合：要「框架+控制平面」一体（跑起来+观测+调度）、Python 生态、要高频发版的活跃选型。
    不适合：只要薄库不要平面、TS 生态（Python 为主）。

pitfalls:
  - 改名史两段：Phidata → Agno（2025 年初改名）——旧教程/旧包名 phidata 与现 agno 是同一线，检索时两词都要查
  - 条款挂在 os.agno.com/legal/（tos+privacy 200 在册），主站 /terms /privacy 404——条款面在控制平面子域，不在营销主域
  - 库/平面两分：Apache-2.0 是库仓许可；托管控制平面（os.agno.com）是商业服务面——许可与商用条款按面分开看

tags: [开源, Apache2.0, agent平台, 控制平面, 记忆组件, 改名史]
related: [langgraph, letta, dify]

sources:
  - label: agno-agi/agno · 仓库（Apache-2.0；42,981★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/agno-agi/agno
    kind: repo
  - label: Agno · 官方文档（docs.agno.com，主站 /docs 308 目标）
    url: https://docs.agno.com/
    kind: docs
  - label: Agno · 官方 changelog（最新条目 2026-10-30）
    url: https://www.agno.com/changelog
    kind: changelog
  - label: Agno · 条款（os.agno.com/legal/tos，主体 Agno Inc.）
    url: https://os.agno.com/legal/tos
    kind: terms

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Agno Inc.（页脚「Agno Inc. All rights reserved」在册；条款页挂 os.agno.com/legal/）。
  origin_note_en: Agno Inc. (footer "Agno Inc. All rights reserved" on record; terms hosted at os.agno.com/legal/).
  direct: yes
  direct_note: agno.com / docs.agno.com / os.agno.com/legal/tos 直连实测均 200（2026-10-31）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: agno.com, docs.agno.com and os.agno.com/legal/tos all measured 200 direct (2026-10-31); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**Agno（原 Phidata）把「框架 + 控制平面」做成一体**（Apache-2.0）：库侧定义 agent/team/workflow，
AgentOS 控制平面侧跑起来、观测、调度（「self-driving agent platform」）。发版高频
（v3.1.12，2026-10-29）、changelog 当日有条目——活跃线。

## 适合与不适合

适合：框架+控制平面一体选型、Python 生态、要活跃维护。
不适合：只要薄库、TS 生态。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- MCP 支持状态（未逐条核验）
- 托管控制平面（os.agno.com）与自托管 AgentOS 的能力差异表（未逐条对照）
- 条款页主体行未在抓到的 HTML 明文解析出（页脚 Agno Inc. 在册；签约主体细节未逐字核）

## 相关条目

- [LangGraph](./langgraph.md) — 同大类对照：LangGraph 给图与状态机制让你搭平面，Agno 把平面（AgentOS）直接给你——搭与给的分野。
- [Letta](./letta.md) — 同大类对照：Letta 的记忆是 agent 自编辑本体（服务器形态），Agno 的记忆是框架内置组件（平面观测形态）。
- [Dify](../../automation/products/dify.md) — 跨大类对照：Dify 低代码可视化搭 agent 应用，Agno 代码定义 agent 再交给平面跑——automation 与 framework 的边界样本。
