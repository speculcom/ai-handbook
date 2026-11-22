---
id: feishu-ai
form: cloud
name: 飞书智能伙伴
nameEn: Feishu AI
vendor: 飞书
homepage: https://www.feishu.cn/product/ai
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由飞书智能伙伴的生成式能力驱动。具体模型与可用功能随租户版本、地区和管理员设置变化。
  runtime: >-
    运行在飞书云端，入口在飞书消息、文档、会议、日历和知识库。本机只负责客户端交互。
  local_files: >-
    可读取租户内有权访问的文档、消息、会议与日历内容。本地文件需上传到飞书。
  background: >-
    会议纪要、消息摘要和文档任务在对应场景触发。没有跨租户的通用后台代理。
  tools: >-
    与飞书文档、表格、多维表格、会议、日历、审批和机器人集成，可通过开放平台扩展。
  context: >-
    上下文来自租户内可访问内容与当前会话。跨部门检索受权限和知识库范围限制。
  permissions: >-
    企业租户由管理员控制功能、数据范围与日志。商业使用与数据驻留按飞书合同核对。
  fit: >-
    适合已经用飞书办公的团队做会议纪要、文档协作和消息总结。不适合跨企业、跨平台的统一检索。
pitfalls:
  - 以为智能伙伴能读整个租户的知识——仍受文档权限与知识库范围限制。
  - 把会议纪要直接当决策记录——行动项和数字要回看原文。
  - 忽略租户的数据驻留与管理员开关——企业合同优先于产品页。

tags: [文档, 会议, 消息, 企业, 国产]
related: [dingtalk-ai, tencent-docs-ai, chatgpt]

sources:
  - label: 飞书智能伙伴 · 官方产品页
    url: https://www.feishu.cn/product/ai
    kind: official
  - label: 飞书智能伙伴 · 官方更新 / 发布记录
    url: https://www.feishu.cn/hc/zh-CN/
    kind: changelog
  - label: 飞书智能伙伴 · 官方帮助 / 文档
    url: https://www.feishu.cn/hc/zh-CN/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: domestic
  origin_note: 飞书（字节跳动，中国）。
  origin_note_en: Feishu (ByteDance, China).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

飞书智能伙伴 是面向办公与写作场景的 AI 产品。
核心是把文档、会议、消息这类任务放进现有工作流。
它不替代最终审校与责任判断。

## 适合与不适合

适合：适合已经用飞书办公的团队做会议纪要、文档协作和消息总结。
不适合跨企业、跨平台的统一检索。

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

- [dingtalk-ai](../office/products/dingtalk-ai.md) — 相邻场景，按任务与权限边界对照。
- [tencent-docs-ai](../office/products/tencent-docs-ai.md) — 相邻场景，按任务与权限边界对照。
- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
