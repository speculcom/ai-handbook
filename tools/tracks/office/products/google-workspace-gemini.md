---
id: google-workspace-gemini
form: cloud
name: Google Workspace Gemini
nameEn: Google Workspace Gemini
vendor: Google
homepage: https://workspace.google.com/solutions/ai/
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由 Google Gemini 提供生成式能力，具体模型代次与可用功能随 Workspace 版本、地区和管理员设置变化。
  runtime: >-
    运行在 Google Workspace 云端，入口在 Gmail、Docs、Sheets、Slides、Meet 与 Gemini 应用；本机不跑模型。
  local_files: >-
    可基于 Drive 中的文档、邮件与会议内容工作；本地文件需先上传或由客户端授权，不能默认视为已进入上下文。
  background: >-
    会议摘要、邮件线程总结等在对应应用内生成；没有跨会话的持久后台代理，长任务仍要回到会话。
  tools: >-
    与 Gmail / Drive / Docs / Sheets / Slides / Meet 集成，可通过 Workspace 扩展与第三方连接器接入外部数据。
  context: >-
    上下文来自当前账号可访问的 Drive 与 Workspace 数据；跨会话记忆和组织范围由管理员策略控制。
  permissions: >-
    管理员可控制 Gemini 功能、数据访问与日志；商业使用取决于 Workspace 套餐与 Gemini 附加许可，数据条款按企业合同核对。
  fit: >-
    适合 Google Workspace 团队做邮件起草、文档总结、表格分析和会议跟进；不适合替代专业财务建模或法律审阅。

pitfalls:
  - 把 Gemini 应用与 Workspace 里的 Gemini 附加功能当成同一个产品——入口、许可和数据范围不同。
  - 以为 Drive 里所有内容都会被检索——仍受账号权限、共享设置和管理员开关限制。
  - 把生成摘要当会议原始记录——行动项和数字仍需回看原文。

tags: [文档, 表格, 演示, 会议, 企业]
related: [gemini-chat, notebooklm, chatgpt]

sources:
  - label: Google Workspace Gemini · 官方产品页
    url: https://workspace.google.com/solutions/ai/
    kind: official
  - label: Google Workspace Gemini · 官方更新 / 发布记录
    url: https://workspaceupdates.googleblog.com/
    kind: changelog
  - label: Google Workspace Gemini · 官方帮助 / 文档
    url: https://support.google.com/a/answer/13668344
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: foreign
  origin_note: Google（美国）。
  origin_note_en: Google (US).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

Google Workspace Gemini 是面向办公与写作场景的 AI 产品，核心是把文档、表格、演示这类任务放进现有工作流；它不替代最终审校与责任判断。

## 适合与不适合

适合：适合 Google Workspace 团队做邮件起草、文档总结、表格分析和会议跟进；不适合替代专业财务建模或法律审阅。

不适合：需要完全离线、跨组织统一检索、或把生成结果直接作为法律/财务定稿的场景；这些要另配本地工具或专业审阅流程。

## 实测记录

2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（本档不做运行验证）
- 具体价格与合同条款（按 D9 口径不落价格数字）

## 相关条目

- [gemini-chat](../chat/products/gemini-chat.md) — 相邻场景，按任务与权限边界对照。
- [notebooklm](../research/products/notebooklm.md) — 相邻场景，按任务与权限边界对照。
- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
