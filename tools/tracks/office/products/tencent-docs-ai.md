---
id: tencent-docs-ai
form: web
name: 腾讯文档 AI
nameEn: Tencent Docs AI
vendor: 腾讯
homepage: https://docs.qq.com/ai
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由腾讯文档的生成式能力驱动。具体模型与可用功能随账号、版本和地区变化。
  runtime: >-
    运行在腾讯文档云端，网页、客户端和小程序都是入口。生成在服务端完成。
  local_files: >-
    可读取当前文档、表格、演示和上传附件。本地文件需先上传。本地文件通常需上传或授权读取。处理前应确认存储位置、保留期限与删除方式。
  background: >-
    写作、表格公式和演示生成在文档内触发。没有关机后继续运行的通用代理。
  tools: >-
    与腾讯文档文档、表格、演示、收集表、评论和分享流程集成。可与腾讯生态账号协作。
  context: >-
    上下文以当前文档和账号可访问的协作文档为主。跨团队知识库能力有限。
  permissions: >-
    商业使用与数据条款按腾讯文档协议核对。共享文档的权限与导出范围由所有者控制。
  fit: >-
    适合中文文档写作、表格公式和演示初稿。不适合复杂数据建模或跨企业知识检索。
pitfalls:
  - 把 AI 公式建议直接套到生产表——先在小范围验证引用范围。
  - 忽略共享文档的权限——AI 可能读到协作者上传的内容。
  - 把生成演示当最终排版——导出后检查字体与图表。

tags: [文档, 表格, 演示, 国产]
related: [wps-ai, feishu-ai, dingtalk-ai, llamaindex]

sources:
  - label: 腾讯文档 AI · 官方产品页
    url: https://docs.qq.com/ai
    kind: official
  - label: 腾讯文档 AI · 官方更新 / 发布记录
    url: https://docs.qq.com/
    kind: changelog
  - label: 腾讯文档 AI · 官方帮助 / 文档
    url: https://docs.qq.com/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: domestic
  origin_note: 腾讯（中国）。
  origin_note_en: Tencent (China).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

腾讯文档 AI 是在线文档、表格与演示的中文办公助手。

## 适合与不适合

适合：中文文档写作、表格公式和演示初稿。

不适合：复杂数据建模或跨企业知识检索。

## 实测记录

**依据：** 2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（本档不做运行验证）
- 具体价格与合同条款（按 D9 口径不落价格数字）

## 相关条目

- [wps-ai](../office/products/wps-ai.md) — 相邻场景，按任务与权限边界对照。
- [feishu-ai](../office/products/feishu-ai.md) — 相邻场景，按任务与权限边界对照。
- [dingtalk-ai](../office/products/dingtalk-ai.md) — 相邻场景，按任务与权限边界对照。
