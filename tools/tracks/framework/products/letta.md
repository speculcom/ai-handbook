---
id: letta
form: harness
name: Letta / MemGPT
vendor: Letta, Inc.
homepage: https://www.letta.com
license: Apache-2.0（GitHub API 核验 2026-10-30）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

family: general-harness
providers:
  - provider 层接入：OpenAI/Anthropic/Gemini/本地（服务器侧 vLLM/llama.cpp 等）（官方文档为准，未逐条清点）
  - 服务器形态：模型在服务端配置，客户端（SDK/API）不直连模型
axes:
  model_access: >-
    各家模型经 provider 层接入（OpenAI/Anthropic/Gemini/本地等，以官方文档为准，未逐条清点）；
    它的核心叙事是**有状态 agent**：记忆分层（core/archival）由 agent 自己编辑管理（MemGPT 论文线）。
  runtime: >-
    **agent 服务器形态**（区别于纯库）：起一个常驻服务（letta server），agent 与记忆在服务器里持久存在；
    SDK/CLI 连它。GitHub 25,290★，最近推送 2026-10-18（API 核验）。
  local_files: >-
    自托管服务器把 agent 状态与记忆存在你的数据库（默认 SQLite，可配 Postgres）——数据在你侧；
    Letta Cloud 托管线是另一产品面。
  background: >-
    **服务器形态自带常驻语义**——这是它与其它框架大类的结构差异：agent 是持久实体，
    会话可中断续接（官方核心叙事）。
  tools: >-
    工具/函数调用 + 文件读写类内置工具线；MCP 支持状态未逐条核验（官方文档有相关线，细节未核）。
  context: >-
    **记忆管理就是它的产品本体**：core memory（agent 自编辑）+ archival（外部检索存储）
    分层是 MemGPT 设计——跨会话记忆是它的默认面，不是附加组件。
  permissions: >-
    服务器有鉴权配置面（细节未逐条核验）；工具执行（文件/命令类）发生在服务器环境——
    自托管机器的权限面要自己设防。
  fit: >-
    适合：要「持久人格」的 agent（长期记忆+状态续接）、要自托管 agent 服务器、MemGPT 设计路线。
    不适合：无状态一次性调用（服务器形态是成本）；只要库不要服务（形态选择）。

pitfalls:
  - 把 Letta 当「又一个 agent 库」——它是 agent 服务器形态（常驻+持久状态），选型时形态先对上
  - 改名史混淆：MemGPT（论文/旧项目名）→ Letta（公司化现名）——同一线，别当两个项目
  - 记忆在服务器数据库里——自托管备份与访问控制是运维责任，别按「框架不管数据」的直觉

tags: [开源, Apache2.0, 有状态agent, 记忆分层, MemGPT, 服务器形态]
related: [cursor, claude-code]

sources:
  - label: letta-ai/letta · 仓库（Apache-2.0；25,290★，最近推送 2026-10-18，GitHub API 核验）
    url: https://github.com/letta-ai/letta
    kind: repo
  - label: Letta · 官方文档
    url: https://docs.letta.com
    kind: docs
  - label: Letta · 官方 changelog
    url: https://docs.letta.com/changelog
    kind: changelog
  - label: letta-ai/letta · Releases（changelog）
    url: https://github.com/letta-ai/letta/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Letta, Inc.（美国，MemGPT 论文团队公司化）。
  origin_note_en: Letta, Inc. (US; the MemGPT paper team incorporated).
  direct: yes
  direct_note: letta.com 与 docs.letta.com 直连实测 200（2026-10-21）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: letta.com and docs.letta.com measured 200 direct (2026-10-21); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Letta（原 MemGPT）把 agent 做成持久实体**（Apache-2.0）：agent 服务器常驻、记忆分层
（core 自编辑 + archival 检索）、会话可中断续接。形态是它与其它框架最大的差异——
**它是服务器，不是库**。

## 适合与不适合

适合：长期记忆/「持久人格」agent、自托管 agent 服务器、MemGPT 设计路线落地。
不适合：无状态一次性调用；只要库不要服务的架构。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- MCP 支持状态（官方文档有相关线，细节未逐条核验）
- 服务器鉴权配置面细节（未逐条核验）
- Letta Cloud 与自托管的能力差异表（未逐条对照）

## 相关条目

- [LangGraph](./langgraph.md) — 状态管理对照：LangGraph 给图与 checkpoint 机制，Letta 把「记忆」做成 agent 自编辑本体。
- [Memory MCP Server](../../mcp/products/memory.md) — 跨大类对照：memory server 给客户端侧知识图谱记忆，Letta 给服务器侧 agent 记忆。
