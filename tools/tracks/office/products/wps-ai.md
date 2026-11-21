---
id: wps-ai
form: web
name: WPS AI
nameEn: WPS AI
vendor: 金山办公
homepage: https://ai.wps.cn/
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由 WPS AI 的生成式能力驱动，具体模型与可用功能随会员档位、版本和地区变化。
  runtime: >-
    运行在 WPS 云端与客户端，覆盖文字、表格、演示和 PDF；部分能力在本地客户端触发。
  local_files: >-
    可处理本地 WPS 文档与上传文件；云端功能需登录并同步，离线能力有限。
  background: >-
    写作、表格、PPT 和 PDF 任务在文档内触发；没有关机后继续运行的通用代理。
  tools: >-
    与 WPS 文字、表格、演示、PDF、云文档和模板库集成，支持中文办公格式。
  context: >-
    上下文以当前文档、模板和账号云文档为主；跨团队知识库能力有限。
    跨文档与跨会话记忆有限，复杂任务要人工补齐上下文并保留原文出处。
  permissions: >-
    商业使用与数据条款按 WPS 会员协议核对；本地文档上云前先确认敏感信息。
  fit: >-
    适合中文 Office 文档、表格公式、PPT 初稿和 PDF 摘要；不适合需要完全离线或跨平台深度集成的场景。

pitfalls:
  - 把会员功能当免费功能——导出、页数和 AI 次数可能受档位限制。
  - 本地文档自动同步到云端前没做脱敏。
  - 把 AI 排版结果直接交付——页眉页脚、目录和图表仍需人工检查。

tags: [文档, 表格, 演示, PDF, 国产]
related: [tencent-docs-ai, feishu-ai, chatgpt]

sources:
  - label: WPS AI · 官方产品页
    url: https://ai.wps.cn/
    kind: official
  - label: WPS AI · 官方更新 / 发布记录
    url: https://ai.wps.cn/
    kind: changelog
  - label: WPS AI · 官方帮助 / 文档
    url: https://help.wps.cn/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: domestic
  origin_note: 金山办公（中国）。
  origin_note_en: Kingsoft Office (China).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

WPS AI 是面向办公与写作场景的 AI 产品，核心是把文档、表格、演示这类任务放进现有工作流；它不替代最终审校与责任判断。

## 适合与不适合

适合：适合中文 Office 文档、表格公式、PPT 初稿和 PDF 摘要；不适合需要完全离线或跨平台深度集成的场景。

不适合：需要完全离线、跨组织统一检索、或把生成结果直接作为法律/财务定稿的场景；这些要另配本地工具或专业审阅流程。

## 实测记录

2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（本档不做运行验证）
- 具体价格与合同条款（按 D9 口径不落价格数字）

## 相关条目

- [tencent-docs-ai](../office/products/tencent-docs-ai.md) — 相邻场景，按任务与权限边界对照。
- [feishu-ai](../office/products/feishu-ai.md) — 相邻场景，按任务与权限边界对照。
- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
