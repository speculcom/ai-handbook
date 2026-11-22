---
id: librechat
form: web
name: LibreChat
vendor: LibreChat AI
homepage: https://www.librechat.ai
license: MIT
licenseEn: MIT

axes:
  model_access: >-
    **依据：** 多 provider 聚合：Anthropic、AWS Bedrock、OpenAI、Azure OpenAI、Google/Vertex AI、 OpenAI Responses API，以及任何 OpenAI 兼容端点与 Ollama；模型与密钥由部署者配置。 模型选择在会话内可切换，具体 provider 清单以官方 Features 页为准。
  runtime: >-
    自托管 Web 应用。Docker Compose（自带 MongoDB、MeiliSearch、RAG API）或 npm 手动部署。也可一键部署到 Railway。

    数据与推理凭据留在你的服务器，不经 LibreChat 云端。
  local_files: >-
    支持附件上传、RAG API 文档检索与 Code Interpreter 沙箱。文件与向量索引存在自有 MongoDB/存储中。沙箱执行环境由你部署，隔离强度取决于运行配置。
  background: >-
    Scheduled Chats 可按周期让 Agent 新建会话并运行提示。Code Interpreter 与 Agent 任务在服务端执行。关机续跑取决于实例与沙箱是否常开。
  tools: >-
    **依据：** MCP server、OpenAPI Actions、Agents、Skills、Subagents、Agent Plugins 与 Code Interpreter；工具审批与 Tool Search 在 Agent 指令中配置。
  context: >-
    上下文窗口由所接模型决定。会话级历史、Message Search、User Memory 与 Agent 自有上下文分开管理。跨项目记忆的边界以官方 Memory 文档为准。
  permissions: >-
    **依据：** 多用户认证（OAuth2、LDAP、邮箱）、角色与用户组、Admin Panel、速率限制与 Automated Moderation、token 花费统计；企业 SSO 与细粒度权限按部署配置。
  fit: >-
    适合：要一个自托管、多模型、带 Agents/MCP/RAG 的团队聊天平台，并能接受 MongoDB、MeiliSearch 与沙箱的运维。不适合：只要单模型轻量前端，或不愿维护数据库。
pitfalls:
  - 以为装完就有模型——必须自己填 provider 密钥与端点
  - 把 Agents 当托管服务——运行时、沙箱与数据库都在你的服务器上
  - 把 MIT 许可当成模型与数据的合规许可——两者是分开的

tags: [自托管, 多模型, Agents, MCP, RAG, 开源]
related: [ollama, n8n]

sources:
  - label: LibreChat · Docs（Docker/npm/Railway 部署与 provider 连接）
    url: https://www.librechat.ai/docs
    kind: docs
  - label: LibreChat · Features（Agents、MCP、Artifacts、Code Interpreter、RAG）
    url: https://www.librechat.ai/docs/features
    kind: docs
  - label: LibreChat-AI/LibreChat · 仓库（47.2k★，MIT，2026-11-17 页面核验）
    url: https://github.com/danny-avila/LibreChat
    kind: repo
  - label: LibreChat · Changelog（版本变更入口）
    url: https://www.librechat.ai/changelog
    kind: changelog

link:
  url: https://www.librechat.ai
  kind: official

last_verified: 2026-11-17
last_updated: 2026-11-17
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: LibreChat AI（美国开源项目）。
  origin_note_en: LibreChat AI (US open-source project).
  direct: yes
  direct_note: www.librechat.ai 与 github.com 直连实测 200（2026-11-17）。
  direct_note_en: www.librechat.ai and github.com measured 200 direct (2026-11-17).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-17 检索）；自托管软件不由平台方面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-11-17); a self-hosted product is not offered to the mainland public by a platform operator, so filing does not apply.
  verified: 2026-11-17
---

## 一句话定位

**LibreChat 是「ChatGPT 式界面 + 多模型 + Agents」的自托管版本**：
**依据：** 一个界面接 Anthropic、OpenAI、Google、Bedrock、Ollama 与任意 OpenAI 兼容端点，
并把 MCP、RAG、代码沙箱和多用户权限收进同一套部署。

## 适合与不适合

适合要自建团队 AI 入口、需要跨 provider 切换、Agent 与 MCP 工具、以及对话检索的人；也适合想把模型密钥与聊天数据留在自己服务器上的组织。

不适合只要一个轻量单模型前端的人。MongoDB、MeiliSearch 与沙箱都要维护也不适合把 MIT 许可误当成模型权重或业务数据的合规许可。

## 与 Open WebUI 的差别

两者都是自托管多模型聊天界面，差别在重心：Open WebUI 更偏「模型聚合 + 知识库 + 权限」。LibreChat 更偏「Agents + MCP + 代码沙箱」。要 RAG 与多用户管理优先看 Open WebUI。

要 Agent 编排、Subagents 与 Code Interpreter，LibreChat 的面更完整。两者都能接 Ollama，不存在互斥。

## 实测记录

本站尚未完成部署与并发实测。
结论来自官方 Docs、Features 页与仓库元数据。

## 未知项清单

- Code Interpreter 在多租户下的隔离强度（官方称 sandboxed，未做渗透测试）
- Scheduled Chats 在实例重启后的补偿执行行为
- 各 provider 在 Agent 工具调用上的兼容差异

## 相关条目

- [Ollama](../../runner/products/ollama.md) — 本地模型运行时，LibreChat 可直接接。
- [n8n](../../automation/products/n8n.md) — 若要把对话接到跨系统自动化，n8n 是另一种编排层。
