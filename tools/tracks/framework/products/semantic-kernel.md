---
id: semantic-kernel
form: harness
name: Semantic Kernel（SK）
vendor: Microsoft
homepage: https://learn.microsoft.com/en-us/semantic-kernel/
license: MIT（GitHub API 核验 2026-10-31）。
licenseEn: MIT (GitHub API verified 2026-10-31).

family: orchestration
providers:
  - 多模型接入（OpenAI/Azure OpenAI/Anthropic 等 connector 线，未逐条清点）
axes:
  model_access: >-
    connector 式多模型接入（OpenAI/Azure OpenAI/Anthropic 等，未逐条清点）；
    定位是把 LLM 能力嵌进企业应用（官方仓描述「Integrate cutting-edge LLM technology quickly and easily into your apps」）。
  runtime: >-
    **多语言 SDK 形态**（C#/.NET 与 Python 双线发版——dotnet-1.81.0 与 python-1.46.0 均在 2026-10 发版，
    GitHub API 核验）：库嵌进你的应用进程，不是独立运行时。GitHub microsoft/semantic-kernel
    28,724★、最近推送 2026-10-30（API 核验，仍活跃发版）。
  local_files: >-
    库形态嵌在你应用里，数据面随你的应用；Azure 侧服务（Azure OpenAI 等）数据在云侧——按你接的 connector 分。
  background: >-
    进程内调用为主（库形态）；常驻语义随宿主应用，SK 本身不提供平面。
  tools: >-
    skills/plugins 函数调用线是老牌卖点（SK 早期以「kernel + skills」抽象出名）；MCP 支持状态未逐条核验。
  context: >-
    企业应用嵌入场景的上下文管理（planner/agent 线细节未逐条核验）。
  permissions: >-
    企业选型面是主轴（Azure 生态鉴权/合规线随微软云体系）；
    库本身权限面随宿主应用。
  fit: >-
    适合：.NET/企业栈要把 AI 嵌进现有应用、Azure 生态、要双语言（C#/Python）SDK。
    不适合：新项目起步——官方已指明 Microsoft Agent Framework 为其后继（见 pitfalls）。

pitfalls:
  - **后继关系要写清**：官方文档称 Microsoft Agent Framework（MAF）为 SK+AutoGen 的指定后继——SK 仍发版维护（1.x 线 2026-10 仍在出）但新投资重心在 MAF；新项目选型先看 MAF 档案
  - 同厂三件别混：SK（现役企业 SDK）/ AutoGen（研究线，不收）/ MAF（后继）——微软 agent 框架线三段，本站收 SK 与 MAF 两份
  - 双语言发版线独立：python-1.46.0 与 dotnet-1.81.0 版本号不同步——按语言线分别看版本

tags: [开源, MIT, 企业向, 多语言, 微软生态]
related: [microsoft-agent-framework, agno, microsoft-copilot]

sources:
  - label: microsoft/semantic-kernel · 仓库（MIT；28,724★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/microsoft/semantic-kernel
    kind: repo
  - label: Semantic Kernel · 官方文档
    url: https://learn.microsoft.com/en-us/semantic-kernel/
    kind: docs
  - label: microsoft/semantic-kernel · Releases（python-1.46.0 2026-10-28 / dotnet-1.81.0 2026-10-06）
    url: https://github.com/microsoft/semantic-kernel/releases
    kind: changelog
  - label: Microsoft Agent Framework · 官方文档（SK 的官方指定后继，迁移参照）
    url: https://learn.microsoft.com/en-us/agent-framework/
    kind: docs

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Microsoft（美国）；learn.microsoft.com 大陆可达性良好。
  origin_note_en: Microsoft (US); learn.microsoft.com reaches well from the mainland.
  direct: yes
  direct_note: learn.microsoft.com/en-us/semantic-kernel 直连实测 200（2026-10-31）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: learn.microsoft.com/en-us/semantic-kernel measured 200 direct (2026-10-31); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；开源 SDK 不面向大陆公众提供服务，备案不适用（Azure 中国区服务属另一主体线，未核验不下断言）。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); an open-source SDK not serving the mainland public, so filing does not apply (Azure China services belong to another entity line — not verified, no assertion made).
  verified: 2026-10-31
---

## 一句话定位

**Semantic Kernel 是微软的企业级 AI 嵌入 SDK**（MIT，C#/.NET + Python 双线）：
connector 接模型、skills/plugins 挂函数，把 LLM 嵌进现有应用进程。1.x 线仍在发版
（python-1.46.0，2026-10-28）；**但官方已指明 Microsoft Agent Framework 为其指定后继**——
现役维护与新投资重心是两条线。

## 适合与不适合

适合：.NET/企业栈嵌入 AI、Azure 生态、要双语言 SDK。
不适合：新项目起步（先看 MAF）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- MCP 支持状态（未逐条核验）
- SK → MAF 的官方迁移指南覆盖度（未逐条核对）
- planner/agent 线各组件的维护状态细分（未逐条核验）

## 相关条目

- [Microsoft Agent Framework](./microsoft-agent-framework.md) — 同大类对照：同厂指定后继（SK+AutoGen 合流线）——SK 现役维护，MAF 承接新投资，选型按项目阶段分。
- [Agno](./agno.md) — 同大类对照：Agno 自带控制平面（AgentOS），SK 只做库嵌你应用——「给平面」与「给库」两种企业形态。
- [Microsoft Copilot](../../chat/products/microsoft-copilot.md) — 跨大类对照：同为微软 AI 线，Copilot 是成品助手，SK 是让你把 AI 嵌进自己应用的底座——成品与底座两面。
