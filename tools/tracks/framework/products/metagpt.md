---
id: metagpt
form: harness
name: MetaGPT
vendor: DeepWisdom（深度赋智，国产）
homepage: https://docs.deepwisdom.ai
license: MIT（GitHub API 核验 2026-10-31）。
licenseEn: MIT (GitHub API verified 2026-10-31).

family: orchestration
providers:
  - 多模型接入（OpenAI/各家 API/本地线，未逐条清点）
axes:
  model_access: >-
    多模型接入（各家 API 与本地线，未逐条清点）；它的叙事不在模型，
    在「把软件公司流程写进多 agent 协作」（官方仓描述「The Multi-Agent Framework: First AI Software Company」）。
  runtime: >-
    Python 多智能体框架：按「产品经理→架构师→工程师→QA」的角色流水线协作产出软件工件。
    GitHub FoundationAgents/MetaGPT 71,097★（API 核验）；**最近推送 2026-01-21、最新 release v0.8.2（2025-03-09）**——
    仓侧主线更新明显放缓（组织侧其他仓仍活跃，见 pitfalls）。
  local_files: >-
    本地跑：pip 安装后在你自己的机器上执行，生成的代码、文档与临时产物都落在你的工作目录；
    没有「云端替你跑」的托管执行线（官方未提供托管面）。
  background: >-
    批式流水线为主（一次任务跑完一条软件生产流程），不是常驻接消息的形态；
    研究线活跃（组织仓 CEO-Arena 等 2026-10 仍在推送）。
  tools: >-
    角色动作/代码执行/文档产出工具线内置；MCP 支持状态未逐条核验。
  context: >-
    SOP（标准作业流程）编码进角色交互是它的核心设计——上下文按角色间消息传递组织（官方文档口径）。
  permissions: >-
    代码执行发生在你机器上；多 agent 自动流水线的中间产物要人审再落地——
    全自动「软件公司」的产出质量与责任面在用户侧。
  fit: >-
    适合：多智能体协作研究、SOP 流水线实验、软件生成流程的学术复现（论文引用量大）。
    不适合：要活跃维护的生产选型（推送/发版放缓）、要精细单 agent 控制。

pitfalls:
  - **活跃度两口径**：MetaGPT 仓最近推送 2026-01-21、release 停在 v0.8.2（2025-03）——但 FoundationAgents 组织侧其他仓（CEO-Arena 2026-10-29、OpenManus 58,830★）仍活跃：团队重心在移，选型按仓侧现状写
  - 星数高≠维护活跃：71,097★ 是论文热度存量——生产选型看 pushed_at 与 releases，不看星数
  - 组织更名线：GitHub org 从 geekan/MetaGPT 迁到 FoundationAgents（深度赋智团队线）——旧链接会跳

tags: [国产, 开源, 多智能体, 软件公司模拟, MIT]
related: [crewai, agentscope, devin]

sources:
  - label: FoundationAgents/MetaGPT · 仓库（MIT；71,097★，最近推送 2026-01-21，GitHub API 核验）
    url: https://github.com/FoundationAgents/MetaGPT
    kind: repo
  - label: MetaGPT · 官方文档（docs.deepwisdom.ai，「The Multi-Agent Framework」）
    url: https://docs.deepwisdom.ai/
    kind: docs
  - label: FoundationAgents/MetaGPT · Releases（v0.8.2，2025-03-09）
    url: https://github.com/FoundationAgents/MetaGPT/releases
    kind: changelog
  - label: FoundationAgents · 组织页（OpenManus/CEO-Arena 等关联仓活跃度对照）
    url: https://github.com/orgs/FoundationAgents/repositories
    kind: repo

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: maintenance
confidence: partial

cn:
  origin: domestic
  origin_note: 北京深度赋智（DeepWisdom）团队线开源项目（GitHub org FoundationAgents；文档站挂 deepwisdom.ai）。
  origin_note_en: Open-source project of Beijing DeepWisdom (GitHub org FoundationAgents; docs site on deepwisdom.ai).
  direct: yes
  direct_note: docs.deepwisdom.ai 直连实测 200（2026-10-31）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: docs.deepwisdom.ai measured 200 direct (2026-10-31); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: unknown
  filing_note: 框架本体是开源库不面向公众提供服务，备案不适用；其关联产品（DeepWisdom 系应用）的备案状态属另一主体——本站未逐条核验，不下断言。
  filing_note_en: the framework itself is an open-source library not serving the public, so filing does not apply; filing status of associated DeepWisdom products belongs to another entity — not individually verified, no assertion made.
  verified: 2026-10-31
---

## 一句话定位

**MetaGPT 把「软件公司」写进多 agent 协作**（MIT）：产品经理→架构师→工程师→QA 的角色流水线，
SOP 编码进 agent 交互。学术热度大（71,097★）；**但仓侧主线推送停在 2026-01、release 停在 2025-03**——
团队重心在组织内其他项目上移，生产选型按仓侧现状判断。

## 适合与不适合

适合：多智能体协作研究、SOP 流水线实验、论文线复现。
不适合：要活跃维护的生产选型、要精细单 agent 控制。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- MCP 支持状态（未逐条核验）
- 主线是否转入「仅研究维护」状态（官方未声明；按推送/发版事实记 maintenance，不下断言）
- DeepWisdom 商业产品线与框架的关系（未核验）

## 相关条目

- [CrewAI](./crewai.md) — 同大类对照：同为多角色协作框架，CrewAI 面向生产编排且活跃发版，MetaGPT 偏研究流水线且仓侧放缓——活跃度是选型差。
- [AgentScope](./agentscope.md) — 同大类对照：同为国产多智能体框架，AgentScope（阿里系）仍在活跃推送，MetaGPT 仓侧放缓——国产线内部也分活跃/放缓。
- [Devin](../../coding/products/devin.md) — 跨大类对照：Devin 是替你干活的成品（coding 大类），MetaGPT 是让你搭「软件公司流水线」的底座（framework 大类）——§7 收录标准的正反两面。
