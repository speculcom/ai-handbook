---
id: pika
form: web
name: Pika
nameEn: Pika
vendor: Pika Labs
homepage: https://pika.art
license: 免费+订阅。按官方条款页管辖（pika.art/terms-of-service 直抓核验 2026-10-22）；
  商用权按档位区分，细节未逐条核验。
licenseEn: Free + subscription. Governed by the official terms page (pika.art/terms-of-service, direct-fetched
  2026-10-22); commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    自研模型线（官网叙事）；用户不选裸模型。开放权重线未核验到官方声明。
  runtime: >-
    网页（pika.art）；生成在厂商云端。曾有 Discord 入口线（社区史叙事，当前状态未逐条核验）。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见；下载归本地。
    未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）。
  tools: >-
    文生视频、图生视频、**Pikaffects 特效线**（官网点名的物理特效玩法：气球爆/压扁等夸张效果，
    官网导航所见）；风格化与编辑线（官网所见，细节未逐条核验）。
  context: >-
    以账户作品页组织（生成历史可回看）；跨会话记忆未核验到官方声明。
    特效模板可复用是资产复用，不是产品记忆。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验；免费档输出的商用与水印限制按条款
    （未逐条核验）。
  fit: >-
    适合：社交向短特效（Pikaffects 类玩法）、创意实验、轻量 meme 素材。
    不适合：影视级长镜头、角色一致性叙事、大陆直连（实测 000）。

pitfalls:
  - Pikaffects 特效线是它的记忆点——按「通用视频生成器」理解会错过产品重心
  - 大陆直连实测 000（2026-10-22，代理 200 可达）——不是死站，是可达性
  - Discord 时代的作品/账号迁移到 pika.art 的现状未核验——旧教程的入口路径可能过时

tags: [免费+订阅, 特效玩法, Pikaffects, 社交向, 需网络环境]
related: [pixverse, runway, jimeng]

sources:
  - label: Pika · 官网（产品与能力叙事）
    url: https://pika.art
    kind: official
  - label: Pika · Terms（官方条款，2026-10-22 直抓核验）
    url: https://pika.art/terms-of-service
    kind: official
  - label: Pika · Blog（官方更新线，changelog）
    url: https://pika.art/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Pika Labs（美国 Palo Alto）。
  origin_note_en: Pika Labs (Palo Alto, US).
  direct: no
  direct_note: pika.art 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: pika.art measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Pika 是社交特效向的视频入口**：Pikaffects 夸张物理特效是记忆点，产品重心在玩法而非影视级生成；
大陆直连不可达（000），需网络环境。

## 适合与不适合

适合：短特效玩法、meme/创意实验、社交素材。
不适合：影视级长镜头、一致性叙事、大陆直连使用。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Pikaffects 各特效模板的实际可用度与商用限制**
- **免费档水印与商用条款的实际边界**
- **图生视频对既有角色图的保持度**

## 未知项清单

- 开放权重线（未核验到官方声明）
- Discord 入口当前状态与作品迁移（未核验）
- 训练用途开关（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [PixVerse](./pixverse.md) — 同为玩法特效向：PixVerse 模板生态重且国产直连，Pika 特效线更单点。
- [Runway](./runway.md) — 同为海外视频台：Runway 偏专业影视工作流，Pika 偏社交玩法。
- [即梦](../image/products/jimeng.md) — 玩法向的国产替代：即梦特效玩法线 + 大陆直连可用。
