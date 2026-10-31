---
id: elizaos
form: harness
name: ElizaOS（Eliza）
vendor: ElizaOS 社区（Eliza Research）
homepage: https://www.elizaos.ai
license: MIT（GitHub API 核验 2026-10-31）。
licenseEn: MIT (GitHub API verified 2026-10-31).

family: general-harness
providers:
  - 多模型接入（OpenAI/Anthropic/本地等插件式接入，未逐条清点）
axes:
  model_access: >-
    插件式多模型接入（各家 API 与本地线都有插件，未逐条清点）；
    它的本体不在模型，在「角色」抽象——一个 agent 配置文件定义人格+能力。
  runtime: >-
    TypeScript 运行时（官方仓描述「Open source agentic operating system」）：起一个常驻进程，
    agent 按角色配置对外接渠道。GitHub elizaOS/eliza 19,739★、最近推送 2026-10-30（API 核验，活跃）。
  local_files: >-
    自托管跑在你自己的进程/机器上；记忆与状态在本地存储层（细节未逐条核验）。
  background: >-
    常驻进程+多渠道接入是默认形态：agent 长期在线接消息、按角色行事——
    「角色 agent」是它的产品叙事核心。
  tools: >-
    插件生态是主轴（渠道插件/动作插件）；MCP 支持状态未逐条核验。
  context: >-
    角色文件（character 配置）定义人格与知识面，跨渠道共享（官方文档 Character Interface/Agent Configuration 在册）。
  permissions: >-
    插件与动作可触达外部账号/渠道——接什么渠道、给什么凭据是配置者责任；
    插件第三方代码面要自己审。
  fit: >-
    适合：要「有人格的常驻 agent」（社交/陪伴/社区 bot）、TS 生态、插件式扩展。
    不适合：要编程任务底座、要企业工作流编排、对第三方插件供应链敏感的场景。

pitfalls:
  - 品牌与域名散：elizaos.ai 301→elizaresearch.ai（新主体站「Eliza Research」）、文档在 docs.elizaos.ai、仓在 elizaOS/eliza——三处口径要一起看，别按单域名判断项目死活
  - 加密社区出身：项目与 token 生态关联深（ai16z 线）——选型时把技术框架与投机叙事分开，本站只记框架面
  - 插件=第三方代码：动作插件可持凭据触达外部渠道，供应链审查是配置者责任

tags: [开源, 角色agent, 多智能体, 插件生态, TypeScript]
related: [crewai, hermes-agent, chatgpt]

sources:
  - label: elizaOS/eliza · 仓库（MIT；19,739★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/elizaOS/eliza
    kind: repo
  - label: ElizaOS · 官方文档（Overview/Character Interface/Agent Configuration）
    url: https://docs.elizaos.ai/
    kind: docs
  - label: Eliza Research · 主体站（elizaos.ai 301 目标，当日核验）
    url: https://elizaresearch.ai/
    kind: docs
  - label: elizaOS/eliza · Releases（changelog）
    url: https://github.com/elizaOS/eliza/releases
    kind: changelog

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: ElizaOS 社区（GitHub org elizaOS，20 个公开仓）；主体站现挂「Eliza Research」（elizaresearch.ai，自述「builds products at the intersection of AI and people」）。
  origin_note_en: ElizaOS community (GitHub org elizaOS, 20 public repos); the entity site now runs as "Eliza Research" (elizaresearch.ai, self-described as building "products at the intersection of AI and people").
  direct: yes
  direct_note: elizaos.ai 直连 301→elizaresearch.ai 直连 200、docs.elizaos.ai 直连 200（2026-10-31）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: elizaos.ai measured 301→elizaresearch.ai 200 direct, docs.elizaos.ai 200 direct (2026-10-31); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；开源框架不面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); an open-source framework not serving the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**ElizaOS 把「角色」做成 agent 单元**（MIT，TypeScript）：一个 character 配置文件定义人格与能力，
常驻进程接多渠道（官方仓自称「agentic operating system」）。加密社区出身、插件生态大——
**框架面与投机叙事要分开看**。

## 适合与不适合

适合：有人格的常驻 agent（社交/社区 bot）、TS 生态、插件式扩展。
不适合：编程任务底座、企业工作流编排、对第三方插件供应链敏感的场景。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- MCP 支持状态（未逐条核验）
- 记忆/状态存储层细节（未逐条核验）
- Eliza Research 与 elizaOS 社区/token 生态的治理关系（未核验，不下断言）

## 相关条目

- [CrewAI](./crewai.md) — 同大类对照：CrewAI 按「角色分工」编排多 agent，ElizaOS 按「角色人格」常驻单 agent——两种「角色」语义。
- [Hermes Agent](./hermes-agent.md) — 同大类对照：同为常驻通用 agent 运行时，Hermes 走模型厂商线，ElizaOS 走社区插件线。
- [ChatGPT](../../chat/products/chatgpt.md) — 跨大类对照：ChatGPT 的「自定义 GPT」也是人格化角色但跑在官方托管里；ElizaOS 把角色跑在你自己的进程与渠道里。
