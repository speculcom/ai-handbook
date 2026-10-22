---
id: d-id
form: web
name: D-ID
nameEn: D-ID
vendor: D-ID
homepage: https://www.d-id.com
license: 免费+订阅+企业档。按官方条款页管辖（d-id.com/terms-of-service 直抓核验 2026-10-22）；
  真人照片驱动的授权条款是关键页，细节未逐条核验。
licenseEn: Free + subscription + enterprise tiers. Governed by the official terms page (d-id.com/terms-of-service,
  direct-fetched 2026-10-22); real-photo-driven consent clauses are the key page, details not verified line
  by line.

axes:
  model_access: >-
    照片驱动数字人线（Talking Photo：单张照片+音频→口播视频，官方招牌叙事）+ 实时交互数字人线
    （Agents，官网导航所见）；底层模型未逐条核验到官方声明。
  runtime: >-
    网页（d-id.com）+ API（官网有 API 入口，开发者向是传统强项）；生成在厂商云端。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见；下载归本地。
    未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；实时 Agents 线是流式交互（官网叙事）；
    无「关机续跑」任务面（未核验到声明）。
  tools: >-
    Talking Photo（照片口播）、实时交互数字人（Agents 线：客服/导购场景叙事）、
    视频翻译线（官网所见）；API-first 的集成面是它的差异化产品姿态。
  context: >-
    Agents 线有会话状态（交互数字人的对话记忆面存在，细节未逐条核验）；创作面以项目组织。
  permissions: >-
    账号+订阅+企业体系（D9：价格不采）；**真人照片驱动的授权验证是关键合规面**
    （官方 consent 叙事，细节未逐条核验）。
  fit: >-
    适合：照片→口播的轻量批量（历史人物/插画角色开口说话）、API 集成数字人、实时交互客服试水。
    不适合：长视频叙事、高保真真人克隆（HeyGen 向）、要影视级画面生成。

pitfalls:
  - 「一张照片就能开口」是招牌也是风险面——真人照片的授权验证在条款上严格，别按演示理解边界
  - API-first 是产品姿态——它的开发者集成面比同类重，按「网页工具」理解会低估
  - 数字人视频与生成式视频是两个物种——D-ID 造「照片说话」，不造世界

tags: [免费+订阅, 照片驱动, 实时交互, API向, 数字人]
related: [heygen, synthesia, runway, elevenlabs]

sources:
  - label: D-ID · 官网（产品与能力叙事）
    url: https://www.d-id.com
    kind: official
  - label: D-ID · Terms of Service（官方条款，2026-10-22 直抓核验）
    url: https://www.d-id.com/terms-of-service/
    kind: official
  - label: D-ID · Blog（官方更新线，changelog）
    url: https://www.d-id.com/blog/
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: D-ID（以色列特拉维夫）。
  origin_note_en: D-ID (Tel Aviv, Israel).
  direct: yes
  direct_note: d-id.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: d-id.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**D-ID 是「照片开口说话」的数字人台**：Talking Photo 招牌 + 实时交互 Agents 线 + API-first 集成面；
轻量照片驱动向，不是高保真克隆向。

## 适合与不适合

适合：照片/插画角色口播批量、API 集成数字人、实时客服试水。
不适合：长叙事、高保真真人克隆、影视级画面。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Talking Photo 对非正面照/风格化插画的效果衰减**
- **实时 Agents 的延迟与打断行为**
- **API 渲染队列与网页档的能力差异**

## 未知项清单

- 底层生成模型（未核验到官方声明）
- Agents 线的会话记忆持久化（未逐条核验）
- 训练用途开关（未逐条核验）
- 大陆可达性之外的支付/账号面（未核验）

## 相关条目

- [HeyGen](./heygen.md) — 同为数字人：HeyGen 克隆/翻译线重，D-ID 照片驱动/API 向轻。
- [Synthesia](./synthesia.md) — 同为企业向：Synthesia 培训工作区重，D-ID 集成面重。
- [Runway](./runway.md) — 视频生成的另一物种：Runway 造画面，D-ID 让照片说话。
- [ElevenLabs](../audio/products/elevenlabs.md) — 口播轨上游：Talking Photo 的音频常由 ElevenLabs 类 TTS 供给，两条线常搭着用。
