---
id: tldv
form: cloud
name: tl;dv
nameEn: tl;dv
tagline: tl;dv 自动录制会议并生成转写、摘要与可回看的片段，偏客户通话、多语言会议和销售复盘。
vendor: tl;dv
homepage: https://tldv.io/
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由第三方语音识别与生成式摘要能力驱动。具体模型未在产品页逐项公开。功能随套餐变化。
  runtime: >-
    云端会议记录器加入主流视频会议。录音、转写与摘要都在服务端完成。可用端与套餐相关，离线和私有部署需另行确认。不能按网页版能力直接推断。
  local_files: >-
    可上传音视频或连接日历会议。本地文件需上传后处理。本地文件通常需上传或授权读取。处理前应确认存储位置、保留期限与删除方式。
  background: >-
    会议期间持续录制，会后生成笔记。没有关机后继续运行的通用代理。按任务触发执行，结束后不保留常驻代理。长任务需拆分为多次可复核的步骤。
  tools: >-
    与 Zoom / Meet / Teams、日历、Slack、Notion、HubSpot 等集成。可导出转写与片段。
  context: >-
    上下文以单场会议、历史会议和团队空间为主。跨 workspace 检索受权限控制。
  permissions: >-
    录制需参会人同意。数据保留、区域与团队权限按套餐和企业合同核对。权限以账号和组织设置为准。敏感材料先脱敏，并确认审计日志与导出范围。
  fit: >-
    适合多语言会议记录、片段回看和客户通话摘要。不适合需要完全本地部署或极高保密等级的会议。
pitfalls:
  - 把自动说话人识别当准确归属——多人重叠时仍需人工校正。
  - 忽略录制同意与数据区域——跨国团队要分别核对。
  - 把摘要里的行动项直接同步到任务系统——先确认负责人和截止日。

tags: [会议, 转写, 摘要, 多语言]
related: [fireflies-ai, otter, chatgpt]

sources:
  - label: tl;dv · 官方产品页
    url: https://tldv.io/
    kind: official
  - label: tl;dv · 官方更新 / 发布记录
    url: https://tldv.io/blog
    kind: changelog
  - label: tl;dv · 官方帮助 / 文档
    url: https://help.tldv.io/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: foreign
  origin_note: tl;dv（德国）。
  origin_note_en: tl;dv (Germany).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

tl;dv 是会议录制、转写与片段回看的工具，偏客户通话和多语言会议。

## 适合与不适合

适合：多语言会议记录、片段回看和客户通话摘要。

不适合：需要完全本地部署或极高保密等级的会议。

## 实测记录

**依据：** 2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（本档不做运行验证）
- 具体价格与合同条款（按 D9 口径不落价格数字）

## 相关条目

- [fireflies-ai](../office/products/fireflies-ai.md) — 相邻场景，按任务与权限边界对照。
- [otter](../audio/products/otter.md) — 相邻场景，按任务与权限边界对照。
- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
