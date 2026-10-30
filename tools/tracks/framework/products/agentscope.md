---
id: agentscope
form: harness
name: AgentScope
vendor: 阿里巴巴（魔搭社区）
homepage: https://agentscope.io
license: Apache-2.0（GitHub API 核验 2026-10-30）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

family: orchestration
providers:
  - 模型经 wrapper 接入：通义/DashScope 系为主，兼 OpenAI 兼容面与本地模型（官方文档为准，未逐条清点）
  - 核心抽象是多智能体消息传递（Msg 对象），provider 层可插拔
axes:
  model_access: >-
    各家模型经 wrapper 接入（通义/DashScope 系为主，兼 OpenAI 兼容面与本地模型——
    以官方文档为准，未逐条清点）；多智能体消息传递是它的核心抽象（Msg 对象在 agent 间流转）。
  runtime: >-
    Python 库（pip 装进你的进程）；GitHub 34,871★，最近推送 2026-10-30（API 核验）。
    官方叙事是「面向多智能体的生产框架」——含可视化工作台（Studio）与分布式执行线。
  local_files: >-
    库形态跑在你进程里；数据落点由你决定。官方 Studio 工作台是本地起的可视化面。
  background: >-
    库无常驻语义；多智能体应用常驻与否取决于你的部署。分布式执行线细节未逐条核验。
  tools: >-
    工具调用与工具包在官方模块族内；MCP 支持状态未逐条核验（官方文档有相关线，细节未核）。
  context: >-
    记忆模块（短期/长期记忆组件）是它的显式面——长期记忆要接外部存储；跨会话记忆给模式不给托管。
  permissions: >-
    无账号体系（库形态）；权限面=你接的各家 key 与工具能力。DashScope 系接入走阿里云账号线——
    那是模型服务的账号，不是框架的账号。
  fit: >-
    适合：多智能体协作应用（消息传递模型清晰）、通义系栈、要可视化调试工作台。
    不适合：单 agent 薄应用（多智能体抽象是成本）；要全网最大集成生态（LangChain 面更宽）。

pitfalls:
  - 把「多智能体框架」当「多智能体一定更好」——单任务单 agent 更简单，多 agent 是显式成本
  - 把 AgentScope 与通义千问模型混谈——框架开源 Apache2.0，模型服务是另一条账号线
  - 分布式执行与 Studio 工作台的能力边界——按官方文档现状用，未核验部分别假设

tags: [开源, Apache2.0, 多智能体, 国产, 消息传递]
related: [cursor, claude-code]

sources:
  - label: agentscope-ai/agentscope · 仓库（Apache-2.0；34,871★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/agentscope-ai/agentscope
    kind: repo
  - label: AgentScope · 官方文档站
    url: https://agentscope.io
    kind: docs
  - label: agentscope-ai/agentscope · Releases（changelog）
    url: https://github.com/agentscope-ai/agentscope/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 阿里巴巴集团 / 魔搭社区（ModelScope）线开源项目（官方口径：AgentScope 由阿里团队发起）。
  origin_note_en: Alibaba Group / ModelScope-line open-source project (official positioning: initiated by an Alibaba team).
  direct: yes
  direct_note: agentscope.io 直连实测 200（2026-10-21）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: agentscope.io measured 200 direct (2026-10-21); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: unknown
  filing_note: 框架本体是开源库不面向公众提供服务，备案不适用；其关联模型服务（通义系）的备案状态属另一主体——本站未逐条核验，不下断言。
  filing_note_en: the framework itself is an open-source library not serving the public, so filing does not apply; filing status of the associated model service (Tongyi line) belongs to another entity — not individually verified, no assertion made.
  verified: 2026-10-21
---

## 一句话定位

**AgentScope 是国产多智能体框架的主力线**（Apache-2.0，阿里/魔搭系）：Msg 消息传递抽象清晰，
带可视化工作台与分布式执行线。33k★、活跃维护。L5 口径：能力描述全部转述官方文档。

## 适合与不适合

适合：多智能体协作应用、通义系栈、要 Studio 可视化调试。
不适合：单 agent 薄应用；要最大集成生态。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- 模型 wrapper 全目录（未逐条清点）
- MCP 支持状态（官方文档有相关线，细节未逐条核验）
- 分布式执行线当前完成度（未逐条核验）

## 相关条目

- [CrewAI](./crewai.md) — 多智能体对照：CrewAI 用「角色+任务」编排叙事，AgentScope 用消息传递模型。
- [AG2](./ag2.md) — 同为多智能体对话式框架：AG2 承 AutoGen 社区线，AgentScope 是阿里系独立设计。
