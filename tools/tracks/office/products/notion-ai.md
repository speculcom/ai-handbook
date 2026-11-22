---
id: notion-ai
form: web
name: Notion AI
nameEn: Notion AI
vendor: Notion
homepage: https://www.notion.com/product/ai
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由第三方生成式模型能力驱动。Notion 未在产品页逐项公开模型供应商与路由细节。具体能力随套餐与功能开关变化。
  runtime: >-
    运行在 Notion 云端，网页、桌面和移动端都是入口。本地不跑模型，离线时只能编辑已有内容。
  local_files: >-
    可读取当前 workspace 内的页面、数据库与上传附件。本地文件需先上传到 Notion，不能直接扫描本机目录。
  background: >-
    写作、总结、数据库填充在页面内触发。没有通用后台代理，长任务仍以当前会话为边界。
  tools: >-
    与 Notion 页面、数据库、评论、日历和连接器集成。可通过 Notion MCP 把 workspace 内容接到外部 agent。
  context: >-
    上下文来自当前 workspace 与用户有权限的页面。跨团队、跨 workspace 的检索受共享设置限制。
  permissions: >-
    workspace 管理员可控制成员、访客、连接器与数据保留。商业使用取决于套餐与官方条款，客户内容不应默认用于训练。
  fit: >-
    适合已经在 Notion 里做知识库、项目文档和轻量数据库的团队。不适合把它当通用聊天入口或重型表格计算工具。
pitfalls:
  - 把 Notion AI 的回答当 workspace 全量检索——它只看到你有权限的页面与连接器内容。
  - 以为所有套餐都含同样的 AI 功能——功能与额度随套餐和管理员设置变化。
  - 把 AI 生成的数据库属性直接写回生产表——先抽样核对再批量写入。

tags: [文档, 知识库, 写作, 协作]
related: [notion-mcp, chatgpt, gemini-chat]

sources:
  - label: Notion AI · 官方产品页
    url: https://www.notion.com/product/ai
    kind: official
  - label: Notion AI · 官方更新 / 发布记录
    url: https://www.notion.com/releases
    kind: changelog
  - label: Notion AI · 官方帮助 / 文档
    url: https://www.notion.com/help
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: foreign
  origin_note: Notion Labs（美国）。
  origin_note_en: Notion Labs (US).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

Notion AI 是面向办公与写作场景的 AI 产品。
核心是把文档、知识库、写作这类任务放进现有工作流。
它不替代最终审校与责任判断。

## 适合与不适合

适合：适合已经在 Notion 里做知识库、项目文档和轻量数据库的团队。
不适合把它当通用聊天入口或重型表格计算工具。

不适合：需要完全离线、跨组织统一检索、或把生成结果直接作为法律/财务定稿的场景。
这些要另配本地工具或专业审阅流程。

## 实测记录

**依据：** 2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（本档不做运行验证）
- 具体价格与合同条款（按 D9 口径不落价格数字）

## 相关条目

- [notion-mcp](../mcp/products/notion-mcp.md) — 相邻场景，按任务与权限边界对照。
- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
- [gemini-chat](../chat/products/gemini-chat.md) — 相邻场景，按任务与权限边界对照。
