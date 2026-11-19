---
id: grammarly
form: web
name: Grammarly
nameEn: Grammarly
vendor: Grammarly
homepage: https://www.grammarly.com/
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由 Grammarly 的生成式写作能力驱动，官方未在产品页公开完整模型清单；功能随套餐变化。
  runtime: >-
    网页、浏览器扩展、桌面客户端和移动键盘都可使用；文本处理在云端完成。
  local_files: >-
    主要处理输入框、文档和上传文件中的文本；本地文件需通过客户端或上传进入。
  background: >-
    校对、改写和生成在输入时即时完成；没有关机后继续运行的长任务代理。
  tools: >-
    与浏览器、Word、Google Docs、邮件客户端和桌面应用集成；企业版提供风格指南与团队规则。
  context: >-
    上下文以当前文档、句子和团队风格指南为主；跨文档记忆有限。
  permissions: >-
    企业版可控制数据保留、团队规则与管理员策略；商业使用取决于套餐与官方条款。
  fit: >-
    适合英语写作校对、语气调整和邮件润色；不适合中文母语写作、深度事实核查或数据分析。

pitfalls:
  - 把语法正确当事实正确——它不校验数字、引用和论证。
  - 把英文写作建议直接套到中文——语言与语体规则不同。
  - 忽略企业版的数据保留设置——团队文档可能按管理员策略处理。

tags: [写作, 校对, 邮件, 英语]
related: [deepl-pro, chatgpt, notion-ai]

sources:
  - label: Grammarly · 官方产品页
    url: https://www.grammarly.com/
    kind: official
  - label: Grammarly · 官方更新 / 发布记录
    url: https://www.grammarly.com/blog/
    kind: changelog
  - label: Grammarly · 官方帮助 / 文档
    url: https://support.grammarly.com/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: Grammarly（美国）。
  origin_note_en: Grammarly (US).
  direct: unknown
  direct_note: 本次未做中国大陆网络探测；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次未检索备案名单，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

Grammarly 是面向办公与写作场景的 AI 产品，核心是把写作、校对、邮件这类任务放进现有工作流；它不替代最终审校与责任判断。

## 适合与不适合

适合：适合英语写作校对、语气调整和邮件润色；不适合中文母语写作、深度事实核查或数据分析。

不适合：需要完全离线、跨组织统一检索、或把生成结果直接作为法律/财务定稿的场景；这些要另配本地工具或专业审阅流程。

## 实测记录

2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（未运行验证）
- 具体价格与合同条款（本站不采价格数字）

## 相关条目

- [deepl-pro](../office/products/deepl-pro.md) — 相邻场景，按任务与权限边界对照。
- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
- [notion-ai](../office/products/notion-ai.md) — 相邻场景，按任务与权限边界对照。
