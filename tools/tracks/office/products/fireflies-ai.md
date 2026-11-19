---
id: fireflies-ai
form: cloud
name: Fireflies.ai
nameEn: Fireflies.ai
vendor: Fireflies.ai
homepage: https://fireflies.ai/
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由第三方语音识别与生成式摘要模型驱动，官方未逐项公开模型清单；功能随套餐变化。
  runtime: >-
    云端会议机器人加入 Zoom / Google Meet / Teams 等会议，录音、转写和摘要都在服务端处理。
  local_files: >-
    可上传音频或接入会议；本地录音需上传，不能直接读取本机会议缓存。
    本地文件通常需上传或授权读取；处理前应确认存储位置、保留期限与删除方式。
  background: >-
    会议进行时机器人持续运行，会后生成摘要；不是通用关机后代理。
    按任务触发执行，结束后不保留常驻代理；长任务需拆分为多次可复核的步骤。
  tools: >-
    与 Zoom / Meet / Teams、CRM、Slack、Notion 等集成，可把行动项写回外部系统。
  context: >-
    上下文以单场会议、历史会议和团队知识为主；跨组织检索受权限限制。
    跨文档与跨会话记忆有限，复杂任务要人工补齐上下文并保留原文出处。
  permissions: >-
    会议录制与转写必须取得参会人同意；数据保留、区域与管理员控制按企业合同核对。
  fit: >-
    适合销售、招聘和项目会议的自动记录与行动项提取；不适合秘密会议、受监管谈话或需要完全离线处理的场景。

pitfalls:
  - 没有告知参会人就让机器人入会——录制与转写涉及同意和当地法律。
  - 把自动摘要当会议纪要定稿——决策、数字和责任人要回听原文。
  - 以为所有会议平台都支持同样的机器人权限——管理员可能禁用外挂。

tags: [会议, 转写, 摘要, CRM]
related: [tldv, otter, chatgpt]

sources:
  - label: Fireflies.ai · 官方产品页
    url: https://fireflies.ai/
    kind: official
  - label: Fireflies.ai · 官方更新 / 发布记录
    url: https://fireflies.ai/changelog
    kind: changelog
  - label: Fireflies.ai · 官方帮助 / 文档
    url: https://docs.fireflies.ai/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: Fireflies.ai（美国）。
  origin_note_en: Fireflies.ai (US).
  direct: unknown
  direct_note: 本次未做中国大陆网络探测；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次未检索备案名单，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

Fireflies.ai 是面向办公与写作场景的 AI 产品，核心是把会议、转写、摘要这类任务放进现有工作流；它不替代最终审校与责任判断。

## 适合与不适合

适合：适合销售、招聘和项目会议的自动记录与行动项提取；不适合秘密会议、受监管谈话或需要完全离线处理的场景。

不适合：需要完全离线、跨组织统一检索、或把生成结果直接作为法律/财务定稿的场景；这些要另配本地工具或专业审阅流程。

## 实测记录

2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（未运行验证）
- 具体价格与合同条款（本站不采价格数字）

## 相关条目

- [tldv](../office/products/tldv.md) — 相邻场景，按任务与权限边界对照。
- [otter](../audio/products/otter.md) — 相邻场景，按任务与权限边界对照。
- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
