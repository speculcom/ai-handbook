---
id: dingtalk-ai
form: cloud
name: 钉钉 AI 助理
nameEn: DingTalk AI Assistant
vendor: 钉钉
homepage: https://www.dingtalk.com/
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由钉钉 AI 助理的生成式能力驱动。具体模型、档位与可用范围随企业版本和地区变化。
  runtime: >-
    运行在钉钉云端，入口在消息、文档、会议、日程与工作台。本机只负责客户端。
  local_files: >-
    可读取组织内有权访问的文档、消息、会议与审批内容。本地文件需上传。
  background: >-
    会议纪要、消息摘要与工作流任务在对应场景触发。没有跨组织的持久后台代理。
  tools: >-
    与钉钉消息、文档、日历、审批、低代码和机器人集成，可通过开放平台扩展。
  context: >-
    **依据：** 上下文来自组织内可访问内容与当前会话。跨组织检索受权限限制。 跨文档与跨会话记忆有限。复杂任务要人工补齐上下文并保留原文出处。
  permissions: >-
    企业管理员控制功能、数据范围与日志。商业使用与数据驻留按钉钉合同核对。
  fit: >-
    适合钉钉深度用户的会议纪要、消息总结和流程辅助。不适合跨平台统一知识库。
pitfalls:
  - 把组织内 AI 当互联网搜索——它主要看组织内授权内容。
  - 忽略管理员对会议录制与数据保留的开关。
  - 把自动生成的审批意见直接提交——责任仍在审批人。

tags: [文档, 会议, 消息, 企业, 国产]
related: [feishu-ai, tencent-docs-ai, wps-ai, coze]

sources:
  - label: 钉钉 AI 助理 · 官方产品页
    url: https://www.dingtalk.com/
    kind: official
  - label: 钉钉 AI 助理 · 官方更新 / 发布记录
    url: https://www.dingtalk.com/
    kind: changelog
  - label: 钉钉 AI 助理 · 官方帮助 / 文档
    url: https://open.dingtalk.com/document/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: domestic
  origin_note: 钉钉（阿里巴巴，中国）。
  origin_note_en: DingTalk (Alibaba, China).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

钉钉 AI 助理是钉钉内的会议纪要、消息总结与流程助手，价值主要在钉钉生态内。

## 适合与不适合

适合：钉钉深度用户的会议纪要、消息总结和流程辅助。

不适合：跨平台统一知识库。

## 实测记录

**依据：** 2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（本档不做运行验证）
- 具体价格与合同条款（按 D9 口径不落价格数字）

## 相关条目

- [feishu-ai](../office/products/feishu-ai.md) — 相邻场景，按任务与权限边界对照。
- [tencent-docs-ai](../office/products/tencent-docs-ai.md) — 相邻场景，按任务与权限边界对照。
- [wps-ai](../office/products/wps-ai.md) — 相邻场景，按任务与权限边界对照。
