---
id: open-webui
form: web
name: Open WebUI
vendor: Open WebUI 社区
homepage: https://openwebui.com
license: BSD-3-Clause 为基础，自 v0.6.6 起附加品牌条款：不得移除、修改或遮挡 Open WebUI 名称、Logo 与界面标识；例外为 30 天内 50 名及以下用户、贡献者获书面许可、或持有允许改品牌的企业许可。v0.6.5 及更早代码仍为纯 BSD-3。
licenseEn: BSD-3-Clause based, with a branding clause from v0.6.6: you may not remove, alter or obscure the Open WebUI name, logo or UI marks, except with 50 or fewer users in a 30-day period, written permission as a contributor, or an enterprise licence that explicitly allows rebranding. Code up to and including v0.6.5 remains pure BSD-3.

axes:
  model_access: >-
    不自带模型，接 Ollama 与本机/云端任何 OpenAI 兼容 API，也可接 Anthropic 等provider；
    模型凭据保存在你自己的实例上。具体 provider 覆盖与版本差异以官方 Connect a Provider 文档为准。
  runtime: >-
    自托管 Web 应用：Docker、Python、Kubernetes 或桌面应用；前端在浏览器，
    推理与数据默认留在你部署的机器/服务器，不经过 Open WebUI 云端。
  local_files: >-
    可上传文档、图片与代码，知识库与向量库落在自有实例；Open Terminal 给 Agent
    一个受控的 shell 与文件系统，可读写、运行脚本并把产物放回对话。
  background: >-
    支持按计划自动运行提示词（Automations），长任务由实例后台执行；
    关机后能否继续取决于实例部署在哪里，平台本身不托管你的执行环境。
  tools: >-
    Python Tools/Functions、Skills、OpenAPI 与 MCP（官方提供 mcpo 把 MCP server
    转成 OpenAPI）；内置代码执行、Web 搜索与图像生成插件面。
  context: >-
    上下文窗口由所接模型决定；实例提供对话历史、Memory、知识库检索与
    「全文注入」开关，跨项目的长期记忆边界未逐项核验。
  permissions: >-
    多用户 RBAC：角色、用户组、按模型/资源授权，SSO/OIDC/LDAP、SCIM、MFA 与 API Key；
    数据与日志在自有基础设施，管理员可关闭遥测与外部服务。
  fit: >-
    适合：团队要在本地与云端模型之上统一一个私有聊天入口，并要 RAG、工具调用、
    多用户权限与自托管数据边界。不适合：零运维 SaaS、或需要厂商 SLA 才能合规的采购。

pitfalls:
  - 把 Open WebUI 当模型本身——它只是前端，模型要另接 Ollama 或 API
  - 以为 BSD-3 就能白标——v0.6.6 起品牌不能删，超过 50 人要企业许可
  - 把自托管当零运维——升级、备份、密钥与向量库都要自己管

tags: [自托管, 多模型, RAG, MCP, RBAC, 开源]
related: [ollama, dify]

sources:
  - label: Open WebUI · Docs 首页（定位、Ollama/OpenAI 兼容、离线运行、部署方式）
    url: https://docs.openwebui.com/
    kind: docs
  - label: Open WebUI · Features（多模型、RAG、Agents、RBAC、Open Terminal）
    url: https://docs.openwebui.com/features
    kind: docs
  - label: Open WebUI · License（v0.6.6 品牌条款与三类例外）
    url: https://docs.openwebui.com/license
    kind: docs
  - label: open-webui/open-webui · 仓库（158,922★，最近推送 2026-11-17，GitHub API 核验）
    url: https://github.com/open-webui/open-webui
    kind: repo
  - label: open-webui/open-webui · Releases（变更记录入口）
    url: https://github.com/open-webui/open-webui/releases
    kind: changelog

link:
  url: https://openwebui.com
  kind: official

last_verified: 2026-11-17
last_updated: 2026-11-17
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Open WebUI 开源社区项目（无单一公司主体）。
  origin_note_en: Open WebUI open-source community project (no single corporate entity).
  direct: yes
  direct_note: docs.openwebui.com 与 api.github.com 直连实测 200（2026-11-17）。
  direct_note_en: docs.openwebui.com and api.github.com measured 200 direct (2026-11-17).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-17 检索）；自托管软件不由平台方面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-11-17); a self-hosted product is not offered to the mainland public by a platform operator, so filing does not apply.
  verified: 2026-11-17
---

## 一句话定位

**Open WebUI 是「把本地与云端模型收进一个私有聊天界面」的自托管平台**——
它不是模型，也不是云服务；你接什么模型、数据放哪台机器，由你决定。

## 适合与不适合

适合团队在 Ollama 与 OpenAI 兼容 API 之上统一入口，需要知识库、工具调用、
多用户 RBAC 与数据不出内网。不适合想开箱即用、不愿维护容器与升级的人；
也不适合把「BSD-3」误解成可以随意白标的商业分发。

## 许可先读这一页

官方 License 页写得很清楚：v0.6.6（2025-04-19）起，许可证是 **BSD-3-Clause 加一条品牌限制**——
不得移除、修改或遮挡 Open WebUI 的品牌；30 天内 50 名及以下用户、贡献者书面许可、
或企业许可三种情况例外。v0.6.5 及更早的代码仍是纯 BSD-3。
如果要做白标产品，先看企业许可，不要按「开源=随便改」处理。

## 实测记录

本站尚未完成实例部署与并发实测；能力结论来自官方 Docs 与仓库元数据。

## 未知项清单

- 不同向量库后端在超大知识库下的检索延迟
- Open Terminal 在多租户下的隔离强度（官方称 sandboxed，未做渗透测试）
- 各 provider 在具体版本中的工具调用兼容差异

## 相关条目

- [Ollama](../../runner/products/ollama.md) — 本地模型运行时；Open WebUI 是最常见的它的前端。
- [Dify](../../automation/products/dify.md) — 同样自托管，但 Dify 主轴是编排应用与 Agent 工作流，不是聊天界面。
