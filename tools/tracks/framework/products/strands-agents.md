---
id: strands-agents
form: harness
name: Strands Agents SDK
vendor: AWS
homepage: https://strandsagents.com
license: Apache-2.0（GitHub API 核验 2026-10-21；仓现名 strands-agents/harness-sdk——
旧引用 sdk-python 路径 redirect，直抓核验）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21; the repo now lives at strands-agents/harness-sdk —
the older sdk-python reference redirects, direct-fetched).

family: general-harness
providers:
  - Bedrock 系为主（AWS 官方叙事），兼 Anthropic/OpenAI/LiteLLM 线（官方文档为准，未逐条清点）
  - agent 循环 model-driven：调哪些工具由接入的模型自己决定
axes:
  model_access: >-
    多 provider 接入（Bedrock 系为主，兼 Anthropic/OpenAI/LiteLLM 线——以官方文档为准，
    未逐条清点）；官方叙事是「model-driven」：agent 循环由模型决定调哪些工具。
  runtime: >-
    Python/TS SDK（装进你的进程）；GitHub 8,896★，最近推送 2026-10-21（API 核验）。
    AWS 开源线（官方出品，非托管服务——与 Bedrock Agents 托管线区分）。
  local_files: >-
    库形态跑在你进程里；数据落点由你决定。工具执行（shell/文件类）在你机器上发生——
    权限面跟着你给的工具走。
  background: >-
    库无常驻语义；agent 应用常驻与否取决于你的部署。观测线（agent 轨迹导出）在官方文档内。
  tools: >-
    工具定义极简（装饰器式）；**MCP 支持是官方显式面**（MCP 客户端集成在文档主线）——
    这是它与多数框架的差异点之一。
  context: >-
    会话记忆组件在官方模块族内（会话持久化线）；跨会话记忆给接口不给托管。
  permissions: >-
    无账号体系（库形态）；权限面=你接的各家 key + 你注册的工具能力（含 shell 类高危工具——
    官方文档有安全指引线，未逐条核验）。
  fit: >-
    适合：AWS 栈的 agent 开发（Bedrock 一等公民）、要显式 MCP 客户端能力、要轻量 SDK 不要重框架。
    不适合：非 AWS 栈的默认选型（生态面比 LangChain 窄）；要可视化编排（它是代码优先）。

pitfalls:
  - 与 Bedrock Agents 托管线混谈——Strands 是开源 SDK（Apache2.0），Bedrock Agents 是托管服务（automation 大类）
  - 用旧仓名 sdk-python 找仓库——现 redirect 到 harness-sdk（2026-10-21 直抓核验）
  - shell/文件类工具默认在你机器上真执行——注册高危工具前按「agent 能跑命令」设防

tags: [开源, Apache2.0, AWS, SDK, MCP支持, 代码优先]
related: [cursor, claude-code]

sources:
  - label: strands-agents/harness-sdk · 仓库（Apache-2.0；8,896★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/strands-agents/harness-sdk
    kind: repo
  - label: Strands Agents · 官方文档
    url: https://strandsagents.com
    kind: docs
  - label: strands-agents/harness-sdk · Releases（changelog）
    url: https://github.com/strands-agents/harness-sdk/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: AWS/Amazon（美国）开源线。
  origin_note_en: AWS/Amazon (US) open-source line.
  direct: yes
  direct_note: strandsagents.com 直连实测 200（2026-10-21）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: strandsagents.com measured 200 direct (2026-10-21); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**AWS 的开源 agent SDK**（Apache-2.0）：model-driven 循环、装饰器式工具、**MCP 客户端是官方主线**。
与 Bedrock Agents 托管线分清楚：Strands 是「拿来自己搭的底座」（本大类），托管线在 automation。
仓现名 harness-sdk（旧名 redirect——直抓核验）。

## 适合与不适合

适合：AWS/Bedrock 栈、要显式 MCP 能力、要轻量代码优先 SDK。
不适合：非 AWS 栈默认选型；要可视化编排。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- provider 全目录（未逐条清点）
- MCP 客户端集成的能力面细节（官方主线存在，未逐条核验）
- 观测/评估线当前完成度（未逐条核验）

## 相关条目

- [OpenAI Agents SDK](./openai-agents-sdk.md) — 同为轻量官方 SDK：OpenAI 版绑自家生态浅，Strands 与 Bedrock 绑得深。
- Bedrock Agents / AgentCore（automation 大类，待建档）— 同厂商两线对照：托管 vs 开源 SDK，选型时先分清；建档上线后在此互链。
