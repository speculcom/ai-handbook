---
id: microsoft-365-copilot
form: cloud
name: Microsoft 365 Copilot
nameEn: Microsoft 365 Copilot
vendor: Microsoft
homepage: https://www.microsoft.com/microsoft-365/copilot
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由 Microsoft Copilot 生成式能力驱动，具体模型与档位随 Microsoft 365 版本、地区和企业合同变化；官方不在产品页公开到单一模型名。
  runtime: >-
    运行在 Microsoft 365 云端，入口分布在 Word、Excel、PowerPoint、Outlook、Teams 与 Copilot 应用；本机只负责界面与文档编辑。
  local_files: >-
    可读取 OneDrive / SharePoint 中的文档、邮件、会议与聊天上下文；本地未上传文件是否进入上下文，取决于客户端与租户策略。
  background: >-
    会议纪要、邮件摘要等任务可在对应应用内触发；没有“关机后继续跑”的通用后台，长任务仍以会话为边界。
  tools: >-
    与 Word / Excel / PowerPoint / Outlook / Teams / SharePoint 深度集成，也可通过 Copilot Studio 扩展自定义工具与连接器。
  context: >-
    上下文来自 Microsoft Graph 与当前租户内可访问内容；跨应用记忆受租户权限、保留策略与用户授权范围约束。
  permissions: >-
    企业租户由管理员控制可用范围、数据边界与日志；商业使用取决于 Microsoft 365 合同与 Copilot 许可，不能只看个人版说明。
  fit: >-
    适合已经在 Microsoft 365 里工作的团队，做文档起草、邮件摘要、会议跟进和表格辅助；不适合把它当成跨组织的通用搜索引擎。

pitfalls:
  - 把个人版 Copilot 的能力和企业版 Microsoft 365 Copilot 混为一谈——许可、数据边界和可用应用都不同。
  - 以为 Copilot 能读取租户内所有文件——它只在你已有权限的范围内工作。
  - 把会议纪要直接当正式记录——仍需核对发言人、行动项和决策。

tags: [文档, 表格, 演示, 会议, 企业]
related: [chatgpt, gemini-chat, copilot-studio]

sources:
  - label: Microsoft 365 Copilot · 官方产品页
    url: https://www.microsoft.com/microsoft-365/copilot
    kind: official
  - label: Microsoft 365 Copilot · 官方更新 / 发布记录
    url: https://www.microsoft.com/microsoft-365/roadmap
    kind: changelog
  - label: Microsoft 365 Copilot · 官方帮助 / 文档
    url: https://learn.microsoft.com/microsoft-365-copilot/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: Microsoft（美国）。
  origin_note_en: Microsoft (US).
  direct: unknown
  direct_note: 本次未做中国大陆网络探测；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次未检索备案名单，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

Microsoft 365 Copilot 是面向办公与写作场景的 AI 产品，核心是把文档、表格、演示这类任务放进现有工作流；它不替代最终审校与责任判断。

## 适合与不适合

适合：适合已经在 Microsoft 365 里工作的团队，做文档起草、邮件摘要、会议跟进和表格辅助；不适合把它当成跨组织的通用搜索引擎。

不适合：需要完全离线、跨组织统一检索、或把生成结果直接作为法律/财务定稿的场景；这些要另配本地工具或专业审阅流程。

## 实测记录

2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（未运行验证）
- 具体价格与合同条款（本站不采价格数字）

## 相关条目

- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
- [gemini-chat](../chat/products/gemini-chat.md) — 相邻场景，按任务与权限边界对照。
- [copilot-studio](../automation/products/copilot-studio.md) — 相邻场景，按任务与权限边界对照。
