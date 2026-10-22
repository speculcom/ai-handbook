---
id: dify
form: web
name: Dify
vendor: LangGenius（国产出海）
homepage: https://dify.ai
license: Dify Open Source License——本质 Apache 2.0 加两条附加条件：未经书面许可不得用源码运营多租户环境（一 workspace 即一租户）；使用其前端不得移除/修改控制台 LOGO 与版权信息（纯后端使用不受此限）。
licenseEn: Dify Open Source License — essentially Apache 2.0 with two additional conditions: no multi-tenant operation from the source code without written authorization (one workspace = one tenant); the console LOGO/copyright may not be removed or modified when using its frontend (backend-only use is exempt).

axes:
  model_access: >-
    平台经「模型供应商」插件接各家 LLM（OpenAI/Anthropic/Gemini/本地 Ollama 等，
    Marketplace 统一装）；官方称模型可自由切换。具体供应商全清单未逐条核验。
  runtime: >-
    社区版源码开放、Docker 自托管（官方首页口径：单条命令部署、完整 Agent runtime 与
    Workflow 编辑器）；另有 Dify 官方云服务。自托管数据在你自己的环境。
  local_files: >-
    知识库线官方描述为「为文件、网站、在线文档与云盘建数据管道」（抽取/清洗/分块/索引/检索测试）；
    自托管时文件与索引落在自有实例。
  background: >-
    应用发布为托管应用/API/嵌入组件/MCP 兼容工具后由平台运行时承载；
    自托管实例常开即可持续服务。定时/后台任务形态未逐条核验。
  tools: >-
    Marketplace 装模型供应商、工具、数据源与 MCP 集成（官方首页口径）；
    应用可发布为 MCP 兼容工具——既消费 MCP 也产出 MCP。
  context: >-
    Agent 官方描述含「记住上下文」；知识库检索是官方主打的上下文供给线。
    跨会话记忆的具体机制未逐条核验。
  permissions: >-
    企业线官方列 SSO/SAML、RBAC、审计日志、SOC 2 Type II + ISO 27001（首页口径）；
    社区版权限模型未逐条核验。许可边界（多租户限制）见 license 字段。
  fit: >-
    适合：要「提示词逻辑变成可见执行路径」的团队、要自托管的国产出海栈、知识库+agent 一体。
    不适合：要源码做多租户 SaaS（需商业授权）；要纯代码框架（归 framework）。

pitfalls:
  - 把「Apache 2.0 本质」读成无限制——多租户与 LOGO 两条附加条件是硬线
  - 把云服务与自托管社区版的能力混同——企业项（SSO/RBAC/审计）在商业线
  - 只把它当聊天机器人搭建器——官方定位是 agentic 工作流平台（Workflow/Chatflow 双形态）

tags: [国产, 低代码, agentic工作流, 知识库, MCP, 自托管, Apache2.0附加条款]
related: [langgraph]

sources:
  - label: langgenius/dify · LICENSE（官方仓，附加条件全文，2026-10-21 直抓核验）
    url: https://github.com/langgenius/dify/blob/main/LICENSE
    kind: docs
  - label: Dify · 官方首页（Workflow/Agent/知识流水线/Marketplace/发布线；社区版 148K+ Star 口径）
    url: https://dify.ai/zh
    kind: docs
  - label: langgenius/dify · 仓库（159,137★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/langgenius/dify
    kind: repo
  - label: Dify · 官方文档站
    url: https://docs.dify.ai
    kind: docs
  - label: langgenius/dify · Releases（版本迭代记录）
    url: https://github.com/langgenius/dify/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: LangGenius（国产团队出海；GitHub 主体 langgenius）。
  origin_note_en: LangGenius (Chinese-origin team, global-facing; GitHub org langgenius).
  direct: yes
  direct_note: dify.ai / docs.dify.ai 直连实测 200（2026-10-21）。
  direct_note_en: dify.ai / docs.dify.ai measured 200 direct (2026-10-21).
  filing: unknown
  filing_note: 未核验到 Dify 在网信办公示名单的对应备案主体（2026-10-21 检索）；其境内是否以备案形态服务未核验，标 unknown。
  filing_note_en: no matching filing entity found in the CAC registry (searched 2026-10-21); whether it serves domestically under a filing is unverified — marked unknown.
  verified: 2026-10-21
---

## 一句话定位

**Dify 是国产出海的 agentic 工作流平台**：把提示词逻辑做成可见、可测、可交接的 Workflow/Chatflow 执行路径，
知识库管道与 Marketplace 集成是一等公民。许可是「Apache 2.0 + 两条附加条件」，多租户限制最该先读。

## 许可的两条附加条件

官方 LICENSE 原文要点（转述）：**未经 Dify 书面许可，不得用源码运营多租户环境**（一个 workspace 即一个租户）；
**使用其前端不得移除或修改控制台/应用的 LOGO 与版权信息**（不用前端则不受此限）。
其余按 Apache 2.0。交互设计另受外观专利保护。

## 适合与不适合

适合：要自托管、要「产品/法务/工程在同一画布上对齐」的团队；知识库+agent 一体交付。
不适合：拿源码做多租户 SaaS 售卖（商业授权线）；纯代码编排（去 [LangGraph](../../framework/products/langgraph.md) 等 framework 大类）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- 模型供应商插件的全清单（Marketplace 未逐条核验）
- 社区版权限模型细节（RBAC 是否部分下沉社区版未核验）
- 定时/后台任务形态的官方边界
- 境内备案形态（标 unknown 的原因见 cn 块）

## 相关条目

- [LangGraph](../../framework/products/langgraph.md) — 画布 vs 代码对照：同一件事（可控的 agent 执行路径），一边拖节点一边写图。
