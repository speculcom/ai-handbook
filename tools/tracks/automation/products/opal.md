---
id: opal
form: web
name: Google Opal
nameEn: Google Opal
vendor: Google Labs
homepage: https://opal.google/
license: 官方条款页面未逐条核验；工具生成内容与上传素材的归属、商用范围以 Google 服务条款为准。本站不解读条款。
licenseEn: Official terms not verified line by line; ownership and commercial scope of generated content and uploaded assets follow Google's service terms. This site does not interpret the terms.

axes:
  model_access: >-
    不直接暴露模型选择：官方叙事是「用自然语言搭 AI mini-app」，2026 的 agent step 让工作流按目标
    自动选择工具与模型（如 Web Search、Veo）。具体模型清单未在官方页逐条列出。
  runtime: >-
    云端 Web 应用，在 Google Labs 的托管环境运行；工作流文件保存在 Google Drive 的
    My Drive > Opal 下（官方停运公告写明迁移方式）。
  local_files: >-
    工作流与素材存放在 Google 账号侧；本机不跑模型。导入导出与素材保留边界以官方页为准。
  background: >-
    以交互式搭积木为主；官方 agent step 可按目标触发工具与模型，但没有「关机后续跑」的官方声明。
  tools: >-
    内建 generate 步骤与 agent step；agent step 可调用 Web Search、Veo 等 Google 工具，
    并可把多步任务串成工作流。第三方工具接入面未逐条核验。
  context: >-
    单次工作流的上下文由步骤与模型决定；跨会话记忆与长期状态未在官方页逐条说明。
  permissions: >-
    Google 账号体系；工作流文件在 Drive 内，分享范围按 Drive 权限管理。
    数据训练用途与商用条款以 Google 服务条款为准，本站未逐条核验。
  fit: >-
    适合：不写代码、想把「生成 + 搜索 + 视频」串成小应用的人；需要快速做原型并分享。
    不适合：要自托管、要模型自选、要长期稳定生产（官方已宣布 2026-11-17 迁出 Labs）。

pitfalls:
  - 把 Opal 当成长期生产平台——官方公告写明 2026-11-17 从 Labs 毕业，工作流迁移到 Gemini skills，之后活跃工作流不再运行
  - 以为它能自选模型——官方叙事是 agent step 自动选工具与模型，不是让用户逐模型配置
  - 把「免费实验」当成「商用授权」——商用范围以 Google 服务条款为准

tags: [无代码, Google, 云端, 实验性]
related: [coze, dify, langgraph]

sources:
  - label: Google Opal · 官方落地页（无代码搭 AI mini-app；2026-11-03 取到停运公告）
    url: https://opal.google/
    kind: official
  - label: Google blog · Build dynamic agentic workflows in Opal（agent step 自动选工具/模型）
    url: https://blog.google/innovation-and-ai/models-and-research/google-labs/opal-agent/
    kind: docs
  - label: Google blog · Opal is now available in more than 160 countries（覆盖范围）
    url: https://blog.google/innovation-and-ai/models-and-research/google-labs/opal-expansion-160/
    kind: docs
  - label: Google Opal · Updates（官方状态与变更记录）
    url: https://opal.google/updates
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: Google（美国）。
  origin_note_en: Google (US).
  direct: no
  direct_note: opal.google 大陆直连未核验；Google 系服务在大陆通常需网络环境。
  direct_note_en: Direct reachability from mainland not verified; Google services generally need a network path there.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；该实验产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the experimental product does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

Opal 是 Google Labs 的无代码 AI mini-app 搭建器：用自然语言描述，就能把生成、搜索、视频等步骤串成可分享的小应用。
官方已宣布 2026-11-17 从 Labs 毕业，工作流迁移到 Gemini skills；之后活跃工作流不再运行。

跨大类对照：[LangGraph](../framework/langgraph.html)。

## 适合与不适合

适合：不写代码、想快速把「生成 + 搜索 + 视频」串成原型并分享的人。
不适合：要自托管、要模型自选、要长期稳定生产——官方已给出停运时间表。

## 实测记录

本档未跑工作流搭建实测；结论只覆盖平台能力与权限边界。

## 未知项清单

- 具体可调用的模型清单（官方页未逐条列出）
- 第三方工具接入面与配额
- 工作流迁移到 Gemini skills 的具体映射规则

## 相关条目

- [Coze](./coze.md) — 同为可视化搭 AI 应用；Coze 可发布到国内渠道，Opal 走 Google 生态
- [Dify](./dify.md) — 可自托管的工作流平台，与 Opal 的云端托管形成对照
