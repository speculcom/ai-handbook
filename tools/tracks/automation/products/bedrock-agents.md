---
id: bedrock-agents
form: web
name: Bedrock Agents / AgentCore
vendor: AWS
homepage: https://aws.amazon.com/bedrock/agents/
license: 商业云服务，随 AWS 条款体系；无自托管形态。

axes:
  model_access: >-
    经 Bedrock 接各家模型（Anthropic Claude、Meta、Mistral、Amazon 自有等——Bedrock 模型目录口径）；
    具体清单未逐条核验。
  runtime: >-
    云托管：agent 跑在 AWS（Agents 编排 + AgentCore 运行时两条线）；无自托管形态。
    旧产品 URL bedrock/agent/ 已 404（2026-10-21 直抓核验），现行入口 bedrock/agents/ 与 bedrock/agentcore/。
  local_files: >-
    知识库接 S3、向量库等 AWS 内资源，文件面完全在云内；不承载本机文件运行时——
    要「AI 读写本机文件」的形态在这里不存在（如实记，不是官方不允许）。
  background: >-
    云托管常驻；AgentCore 主打「任意框架的托管运行时」（官方叙事，细节未逐条核验）。
  tools: >-
    官方 action groups/gateway + MCP 支持（Bedrock 文档线含 MCP 条目，未逐条核验细节）。
  context: >-
    会话状态与 Knowledge Bases 检索是官方上下文面；跨会话记忆未逐条核验。
  permissions: >-
    IAM/资源策略随 AWS 体系——企业治理是 AWS 原生强项。
  fit: >-
    适合：AWS 存量企业、要 IAM 级治理、要「框架无关的托管运行时」（AgentCore）。
    不适合：不在 AWS 生态；要自托管。

pitfalls:
  - 用旧 URL bedrock/agent/——已 404（直抓核验），现行是 agents/ 与 agentcore/
  - 把 Agents（托管编排）与 AgentCore（托管运行时）当同一个——两条线定位不同，按官方文档分开读
  - 与 framework 大类的 Strands Agents 混同——Strands 是开源 SDK，这里是托管平台

tags: [企业低代码, 云托管, AWS, agent平台, AgentCore]
related: [microsoft-agent-framework]

sources:
  - label: AWS · Bedrock Agents 产品页（旧 URL 404 核验在案，2026-10-21）
    url: https://aws.amazon.com/bedrock/agents/
    kind: docs
  - label: AWS · Bedrock AgentCore 产品页（2026-10-21 直抓 200）
    url: https://aws.amazon.com/bedrock/agentcore/
    kind: docs
  - label: AWS · Bedrock 用户指南 · Agents 章
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html
    kind: docs
  - label: AWS · Bedrock 文档更新历史（changelog）
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/doc-history.html
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Amazon Web Services（美国）。
  origin_note_en: Amazon Web Services (US).
  direct: yes
  direct_note: aws.amazon.com / docs.aws.amazon.com 直连实测 200（2026-10-21）。
  direct_note_en: aws.amazon.com / docs.aws.amazon.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Bedrock 的 agent 线是 AWS 的托管 agent 平台**：Agents（可视化编排）+ AgentCore（框架无关的托管运行时）两条线。
一个 URL 事实：旧入口 bedrock/agent/ 已 404（2026-10-21 直抓核验）——现行是 agents/ 与 agentcore/。

## 适合与不适合

适合：AWS 存量、要 IAM 级企业治理、要「用任何框架但运行时托管」。
不适合：不在 AWS 生态；要自托管（无此形态）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- Agents 与 AgentCore 的功能重叠与分工（官方叙事在演进，未逐条核验）
- MCP 支持细节（文档线有条目但未逐条核验）
- Bedrock 模型目录现值

## 相关条目

- [Microsoft Agent Framework](../../framework/products/microsoft-agent-framework.md) — 云巨头对照：微软把框架开源（MAF），AWS 主推托管平台——两条路线。
