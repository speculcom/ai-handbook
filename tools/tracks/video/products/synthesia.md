---
id: synthesia
form: web
name: Synthesia
nameEn: Synthesia
vendor: Synthesia
homepage: https://www.synthesia.io
license: 订阅为主（免费档受限）。按官方法务页管辖（synthesia.io/legal 直抓核验 2026-10-22）；
  企业条款与数字人授权面是关键页，细节未逐条核验。
licenseEn: Subscription-first (limited free tier). Governed by the official legal pages (synthesia.io/legal,
  direct-fetched 2026-10-22); enterprise terms and avatar-consent clauses are the key pages, details not
  verified line by line.

axes:
  model_access: >-
    数字人视频生成线：官方形象库+个人/企业定制数字人（授权克隆）+配音线（官网导航所见）；
    底层模型未逐条核验到官方声明。
  runtime: >-
    网页（synthesia.io）+ API（企业向，官网所见）；生成在厂商云端。
  local_files: >-
    作品存账户侧云端（企业面有工作区）；下载归本地。未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）。
  tools: >-
    **企业培训视频是主打场景**（官网叙事：L&D/合规培训/本地化）；PPT/文档转视频线（官网所见）、
    多语言配音+对口型、SCORM 等企业学习生态对接（官网所见）。
  context: >-
    以团队工作区组织（企业协作面是产品主轴之一）；跨会话记忆未核验到官方声明。
  permissions: >-
    订阅+企业体系（D9：价格不采）；定制数字人的授权验证是关键合规面（官方 consent 叙事，
    细节未逐条核验）；免费档功能与导出限制按条款（未逐条核验）。
  fit: >-
    适合：企业 L&D/合规培训视频、多语言本地化批量、无真人出镜的标准化口播。
    不适合：创意叙事、社交娱乐向、个人免费重度使用（订阅为主的产品姿态）。

pitfalls:
  - 「订阅为主」是产品姿态——免费档是试用入口不是长期免费方案，按企业采购理解定价面
  - 培训场景的合规叙事（形象授权/内容审核）是它对企业客户的核心卖点——按个人工具理解会低估
  - 数字人视频与生成式视频是两个物种——Synthesia 主功能是「人说话」，不是「造世界」

tags: [订阅为主, 数字人, 企业培训, 多语言配音, SCORM对接]
related: [heygen, d-id, elevenlabs]

sources:
  - label: Synthesia · 官网（产品与能力叙事）
    url: https://www.synthesia.io
    kind: official
  - label: Synthesia · Legal（官方条款/法务页，2026-10-22 直抓核验）
    url: https://www.synthesia.io/legal
    kind: official
  - label: Synthesia · Updates（官方更新线，changelog）
    url: https://www.synthesia.io/updates
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Synthesia（英国伦敦）。
  origin_note_en: Synthesia (London, UK).
  direct: yes
  direct_note: synthesia.io 大陆直连实测 200（2026-10-22）。
  direct_note_en: synthesia.io measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Synthesia 是企业培训向的数字人视频台**：L&D/合规培训/多语言本地化是主打场景，
SCORM 等企业学习生态对接是它的护城河；订阅为主的产品姿态。

## 适合与不适合

适合：企业 L&D、合规培训批量、多语言口播本地化。
不适合：创意叙事、社交娱乐、个人免费重度使用。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **PPT→视频的转换质量**（版式还原度）
- **SCORM 导出对接主流 LMS 的实际兼容性**
- **定制数字人的授权验证与交付周期**

## 未知项清单

- 底层生成模型（未核验到官方声明）
- 免费档的具体限制边界（未逐条核验）
- 训练用途开关（未逐条核验）
- 大陆企业客户的合规入口（未核验）

## 相关条目

- [HeyGen](./heygen.md) — 同为企业数字人双强：HeyGen 克隆/翻译更灵活，Synthesia 培训生态更深。
- [D-ID](./d-id.md) — 同为数字人口播：D-ID 轻量照片驱动，Synthesia 企业工作区重。
- [ElevenLabs](../audio/products/elevenlabs.md) — 配音上下游：数字人视频的口播轨常由 ElevenLabs 类 TTS 供给，Synthesia 内置配音线是另一条路。
