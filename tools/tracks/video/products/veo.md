---
id: veo
form: cloud
name: Veo（Google）
nameEn: Veo (Google)
vendor: Google
homepage: https://deepmind.google/technologies/veo/
license: 官方 Gemini API 附加条款「Use of Generated Content」：「Google won't claim ownership over that content」——Google 不主张生成内容所有权；商用按适用法律合规使用（API 返回时可能需向你的用户提供归属信息）。官方同时声明输出可能与他人相似、并保留水印与 SynthID 溯源标记。
licenseEn: Official Gemini API Additional Terms, 'Use of Generated Content': 'Google won't claim ownership over that content.' Commercial use must comply with applicable law, and API-returned content may require attribution to your users. Google notes outputs may be similar across users and reserves watermarking and SynthID marks.

axes:
  model_access: >-
    模型版本经 Google 官方发布线披露：Vertex AI release notes 记录 Veo 3.1 GA（2025-11-17 条目）、
    Veo 3.1 reference-to-video 与 video extension 预览、Veo 3.1 Lite（2026-04-02 条目，
    官方称 Vertex AI 上最具成本效益的 Veo）——2026-10-21 经代理直抓核验。
  runtime: >-
    经 Gemini API / Vertex AI 云 API 与 Google AI 订阅计划（Flow 等产品入口）提供；
    生成在 Google 云端处理，本机不跑模型。
  local_files: >-
    支持参考图输入（reference-to-video 能力见 Vertex release notes 条目）；输入内容留存见 permissions 维。
  background: >-
    API 为请求-轮询制（生成任务提交后取回）；没有「关机续跑」形态的官方声明。
  tools: >-
    主形态是模型接口（Gemini API / Vertex AI），被 Flow、第三方剪辑与代理工作流集成；
    输出带水印与 SynthID 溯源标记。
  context: >-
    生成为任务制，无跨会话记忆形态；上下文由调用方组织——
    reference-to-video 与 video extension 是请求内/任务间衔接能力（见 Vertex release notes 条目），不是会话记忆。
  permissions: >-
    官方 Gemini API 附加条款（2026-03-23 生效）：非付费服务（AI Studio、免费配额）提交的内容与
    生成回答会被用于「提供、改进与开发 Google 产品与机器学习技术」，且人工审核员可能阅读；
    付费服务不用于改进产品，按数据处理附加条款处理。EEA/瑞士/英国用户即使免费配额也按付费口径。
  fit: >-
    已在 Google 云/Workspace 生态、需要企业级数据条款（付费不训练）的视频生成用户与团队。
    免费配额线会被训练，别混；在意溯源标记（SynthID）的场景这条是加分项。

pitfalls:
  - 把「付费不训练」套到免费配额——免费线内容与回答会被用于改进模型（EEA/瑞士/英国例外）
  - 把 Gemini Apps 隐私声明套到 API——两份文件、两套口径
  - 以为输出完全独占——官方明说不同用户可能得到相似输出

tags: [云端, API, 溯源标记, 企业条款, 商业]

related: [gemini-chat, gemini-cli]

sources:
  - label: Google Cloud · Vertex AI Generative AI release notes（官方日志，2026-10-21 经代理直抓核验 Veo 3.1 GA/Lite/reference-to-video 条目）
    url: https://cloud.google.com/vertex-ai/generative-ai/docs/release-notes
    kind: changelog
  - label: Google · Gemini API Additional Terms of Service（官方条款，2026-10-20 经搜索快照取到全文；直连超时为网络受限）
    url: https://ai.google.dev/gemini-api/terms
    kind: docs
  - label: Google DeepMind · Veo 产品页（官方页，2026-10-20 直抓 200）
    url: https://deepmind.google/technologies/veo/
    kind: docs
  - label: Google Cloud Vertex AI 定价（定价页指针，D9：本站不采价格数字）
    url: https://cloud.google.com/vertex-ai/generative/pricing
    kind: pricing

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 介绍页 deepmind.google 直连实测 200；产品入口 gemini.google.com 大陆直连不可达（实测 000）——能不能用取决于产品入口。
  direct_note_en: the intro page deepmind.google measured 200 direct; the product entry gemini.google.com is unreachable direct (measured 000) — actual availability hinges on the product entry.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

Google 的视频生成模型家族：经 Gemini API / Vertex AI 与 Google AI 计划交付，
带 SynthID 溯源；「免费配额会被训练、付费不训练」是数据条款的分水岭。

## 适合与不适合

适合已在 Google 云生态、要企业级数据条款（付费不训练）的视频生成场景。
免费配额线会被训练且可能人工审核——按这条线自查。要开箱即用的创作工作室界面，
它本体是模型接口，工作室形态在 Flow 等入口产品里。

## 实测记录

本站尚未完成实测。视频生成不适用编码实测协议；能力口径以官方 release notes 与模型文档为准。

## 未知项清单

- Flow 等入口产品的档位分流与能力差异（本站未逐产品核验）
- Veo 各版本当前可用性矩阵（GA/预览/Lite 状态随 release notes 滚动）

## 相关条目

- [Runway](./runway.md) — 对照路线：创作平台形态、训练许可无退出选项
- [可灵 Kling AI](./kling.md) — 对照路线：国产视频生成、商用需过会员线
