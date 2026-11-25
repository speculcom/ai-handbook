---
id: adobe-acrobat-ai
form: app
name: Adobe Acrobat AI Assistant
nameEn: Adobe Acrobat AI Assistant
vendor: Adobe
homepage: https://www.adobe.com/acrobat/ai-assistant.html
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由 Adobe 的生成式文档能力驱动。官方未在商品页公开完整模型清单。功能随 Acrobat 套餐变化。
  runtime: >-
    在 Acrobat 网页、桌面和移动端运行。文档解析与生成在 Adobe 云端完成。
  local_files: >-
    可读取上传的 PDF 与文档，生成摘要、问答和引用。本地文件需在 Acrobat 中打开或上传。
  background: >-
    单文档问答与摘要即时完成。没有关机后继续运行的长任务代理。按任务触发执行，结束后不保留常驻代理。长任务需拆分为多次可复核的步骤。
  tools: >-
    **依据：** 与 Acrobat PDF 编辑、签名、导出和分享流程集成，可把回答定位到原文页码。
  context: >-
    **依据：** 上下文以当前 PDF 和会话为主。跨文档知识库能力有限。 跨文档与跨会话记忆有限。复杂任务要人工补齐上下文并保留原文出处。
  permissions: >-
    文档可能含敏感信息，处理前确认云端存储与保留条款。商业使用按 Adobe 合同核对。
  fit: >-
    适合长 PDF 摘要、合同条款定位和文档问答。不适合替代法律意见、财务审计或复杂表格计算。
pitfalls:
  - 把引用页码当条款结论——仍需读原文和上下文。
  - 上传含个人数据的 PDF 前没确认保留策略——先脱敏或走企业合同。
  - 以为扫描件都能准确识别——低质量 OCR 会带来错字与错页。

tags: [PDF, 文档, 摘要, 合同]
related: [chatgpt, notion-ai, deepl-pro]

sources:
  - label: Adobe Acrobat AI Assistant · 官方产品页
    url: https://www.adobe.com/acrobat/ai-assistant.html
    kind: official
  - label: Adobe Acrobat AI Assistant · 官方更新 / 发布记录
    url: https://helpx.adobe.com/acrobat/release-note.html
    kind: changelog
  - label: Adobe Acrobat AI Assistant · 官方帮助 / 文档
    url: https://helpx.adobe.com/acrobat.html
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: foreign
  origin_note: Adobe（美国）。
  origin_note_en: Adobe (US).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

Adobe Acrobat AI Assistant 是 PDF 文档的问答、摘要与条款定位工具，重点在长文档里快速找依据。

## 适合与不适合

适合：长 PDF 摘要、合同条款定位和文档问答。

不适合：替代法律意见、财务审计或复杂表格计算。

## 实测记录

**依据：** 2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（本档不做运行验证）
- 具体价格与合同条款（按 D9 口径不落价格数字）

## 相关条目

- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
- [notion-ai](../office/products/notion-ai.md) — 相邻场景，按任务与权限边界对照。
- [deepl-pro](../office/products/deepl-pro.md) — 相邻场景，按任务与权限边界对照。
