---
id: grok-chat
form: web
name: Grok
nameEn: Grok
vendor: xAI
homepage: https://grok.com/
license: 免费 + SuperGrok 订阅。按 xAI Consumer Terms 与 Consumer FAQ：用户拥有 Inputs/Outputs，可商用但须按 Brand Guidelines 署名；平台保留广泛使用许可；训练可在 Data Controls 关闭，Private Chat 不训练，未登录部分地区无退出选项；X 内使用另按 X 条款（2026-11-21）。
licenseEn: Free plus SuperGrok subscription. Per the xAI Consumer Terms and Consumer FAQ: users own Inputs/Outputs and may use them commercially with attribution under the Brand Guidelines; the platform retains a broad use licence; training can be turned off in Data Controls, Private Chat is not trained, unauthenticated use in some regions has no opt-out, and use inside X follows X’s terms (2026-11-21).

axes:
  model_access: >-
    Grok 消费端由 xAI 官方模型线驱动：Grok 4.7 已作为 Expert 模式上 grok.com、并为付费订阅提供 Fast 模式，API 侧 `grok-4.7` 为 500K 上下文、文本+图像输入、无文本输出上限；Grok 4.6/4.5 仍在列。多模态侧 Imagine Image 2.0 已 GA 为 Quality Mode，Imagine Video 1.5 支持文本/图像/声音参考，产品页标图像视频最高 2K、15 秒（2026-11-21）。
  runtime: >-
    网页 grok.com + iOS/Android App + X 内嵌 Grok；生成在 xAI 云端。xAI 同时提供独立 API（文本、视觉、语音、图像、视频），与消费产品同模型族、不同条款（2026-11-21）。
  local_files: >-
    支持文件/PDF 上传、图像与视频生成、Projects 文件树；上传与生成物存账户侧。删除单条对话、全部对话或账号后，xAI 在 30 天内从系统移除；Private Chat 同样 30 天内删除（2026-11-21）。
  background: >-
    多 agent 模式在单次回答内并行拆解子问题、各自展示推理并合并为带引用答案；跨轮长任务由 Projects 承接，云端任务型 Grok Bot 是另一档。对话本身流式返回，不形成离线队列（2026-11-21）。
  tools: >-
    实时网页搜索 + X 帖子检索（带引用）、多 agent 并行、Imagine 文生图/文生视频与编辑、Voice 语音对话、文件/PDF 分析、视觉理解、代码生成、Canvas 长文编辑、自定义指令、Projects、记忆、分享对话；付费档另有 Grok Bot 入口（2026-11-21）。
  context: >-
    官方产品页明确「Memory across chats」：记住偏好与过往对话，作为后续会话背景；Threads 保持上下文，Projects 把对话与文件组织到项目内。Private Chat 不保存、不可回看；可在 Data Controls 关闭个性化/训练、删除单条或全部对话，删号后 30 天内清除（2026-11-21）。
  permissions: >-
    免费档可试用，SuperGrok 提供更高限额、优先访问与多 agent；X 内使用适用 X 条款与 X 隐私政策。xAI Consumer FAQ：用户拥有 Inputs/Outputs，可商用，但须按 Brand Guidelines 署名；登录用户可在 Settings → Data → Improve the Model 关闭训练，Private Chat 不训练；未登录场景在部分地区（EU/UK 除外）没有退出训练选项（2026-11-21）。
  fit: >-
    适合：要 X/网页实时信息、多 agent 深答、图像视频一体创作、跨会话记忆与 Projects、可商用输出。不适合：要合同级数据条款（走 API/企业线）、要完全离线、要避开 X 生态绑定（2026-11-21）。

pitfalls:
  - 把 X 内 Grok 与 grok.com 当成同一套条款——X 内适用 X 隐私政策
  - 以为所有人都能退出训练——官方明写部分地区（EU/UK 除外）未登录场景没有该选项
  - 把 Grok 对话应用与 Grok Bot 混为一谈——后者是云端任务型 agent，另一份档案（coding）

tags: [云端, 实时搜索, X生态, 商业]

related: [grok-bot]

sources:
  - label: xAI · Grok 产品页（Memory across chats、Projects、多 agent、Imagine 2K/15s，2026-11-21 抓取 200）
    url: https://x.ai/grok
    kind: official
  - label: xAI · Consumer FAQ（输出所有权/商用、训练开关、Private Chat、30 天删除，2026-11-21 抓取 200）
    url: https://x.ai/legal/faq
    kind: docs
  - label: xAI · Consumer Terms（Inputs/Outputs 权属、平台许可与付费订阅，2026-11-21 抓取 200）
    url: https://x.ai/legal/terms-of-service
    kind: docs
  - label: Grok · 更新日志（Grok 4.7 Expert/Fast、Projects、Imagine Agent Mode，2026-11-21 核验）
    url: https://grok.com/release-notes
    kind: changelog
  - label: xAI · News（Grok 4.7、Imagine Image 2.0、Imagine Video 1.5 References，2026-11-21 核验）
    url: https://x.ai/news
    kind: changelog
  - label: xAI · Imagine Image 2.0 发布（Quality Mode 与编辑能力，2026-11-21 抓取 200）
    url: https://x.ai/news/grok-imagine-image-2
    kind: docs
  - label: xAI API · Release Notes（grok-4.7 500K 上下文、Imagine 模型线，2026-11-21 抓取 200）
    url: https://docs.x.ai/developers/release-notes
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单无对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: no
  direct_note: grok.com 大陆直连稳定超时（2026-10-20 同日两次 000）。
  direct_note_en: grok.com times out consistently from mainland (000 twice).
  filing: not-filed
  filing_note: 网信办公示名单无对应主体（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品面向境外提供服务，备案不适用。
  filing_note_en: no corresponding subject in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product serves users outside the mainland, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

接 X 实时信息的通用对话助手：搜索与公开帖子检索是核心差异点，
「未登录可能没有退出训练的选项」与「X 内是另一套条款」是两处必须先看边界。

## 适合与不适合

适合要接 X 实时信息、接受云端处理的人。在意训练用途就用 Private Chat 或关数据开关
（登录态下自助）；在意条款一致性就别在未登录状态用。要合同级数据条款走 API/企业线。

## 实测记录

本档核对 xAI 产品页、Consumer FAQ、消费条款、Grok 更新日志与 Imagine 发布页；各档模型可用度、记忆地区差异与视频生成上限需按账号实测。
## 未知项清单

- 记忆的地区可用性：官方产品页确认跨会话记忆，地区差异按账号实际设置核对。
- 各订阅档的模型与额度：以 x.ai/grok 与订阅页实时展示为准。
- X 内 Grok 与 grok.com 的条款边界：X 内适用 X 条款，独立站适用 xAI 消费条款。
## 相关条目

- [ChatGPT](./chatgpt.md) — 同为通用对话，训练开关与反馈口径不同
- [Claude（对话应用）](./claude-chat.md) — 训练 opt-out 有「安全审查例外」，对照读
- [豆包](./doubao-chat.md) — 中文场景对照：App 训练开关自助、API 默认不训练
