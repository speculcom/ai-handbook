---
id: pika
form: web
name: Pika
nameEn: Pika
vendor: Pika Labs
homepage: https://pika.art
license: 免费+订阅（Starter/Creator/Fancy）+ API 单独计费。按官方条款页管辖（pika.art/terms-of-service，2026-10-22 直抓；FAQ 2026-11-21）；商用权仅付费档（2026-11-21）。
licenseEn: Free + subscription. Governed by the official terms page (pika.art/terms-of-service, direct-fetched
  2026-10-22); commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    平台自营 + 聚合：产品内可用 Pika 2.5（图生/文生视频，480p/720p/1080p，5/10 秒）与 Seedance 2.5、MiniMax H3、GPT Image 2.5、Nano Banana 2.1、Seedream、ElevenLabs/Pika Music/Speech/SFX 等合作模型；Pika API Club 称一个 API 接入 100+ 视频/图像/音频模型（2026-11-21）。
  runtime: >-
    网页/App（pika.art）+ 异步 API（`https://api.dev.pika.art`，`X-API-Key` 鉴权）；生成在厂商云端，API 计费与产品积分两套体系（2026-11-21）。
  local_files: >-
    不碰本机模型：参考素材走公网 URL，或先 `POST /v1/media/uploads` 拿 5 分钟预签名上传链接，再传 permanent Pika CDN URL；成片在 `output.video.url`，可 `DELETE /v1/media/jobs/{id}` 连媒体与提交时的 prompt/参数一起抹掉（2026-11-21）。
  background: >-
    异步 job：提交返回 `id` 与 `status=queued`，轮询 `GET /v1/media/jobs/{id}` 到 completed/failed/cancelled，completed 取下载 URL；也可用 webhook；429 有 `Retry-After`，503 退避重试（2026-11-21）。
  tools: >-
    Pikaffects（23+ 种物理特效：cake-ify、melt、levitate、crystalize 等）、Pikaframes（2–5 张静帧间插值）、Pikadditions、Pikaswaps、Pikastream 实时会话、Video/Image/Music/Speech/SFX Studio、Camera Director、Motion Transfer、Extend Video、Relight、Color Grade、Character Studio（2026-11-21）。
  context: >-
    以 Library/Projects 组织作品，角色与元素存 Library 后可跨生成复用（Character Studio 出角色表）；PikaStream 是会话式实时互动；跨会话对话记忆不在产品面，复用靠显式保存的资产（2026-11-21）。
  permissions: >-
    Free/Starter/Creator/Fancy 订阅 + 积分；付费档含商用权，Free 档不含商用，所有当前档下载无水印；Pika 可能用上传与作品改进服务/模型，第三方模型另按其条款；API 单独计费、不消耗 Pika 积分（2026-11-21）。
  fit: >-
    适合：社交向短特效（Pikaffects 类玩法）、图生视频、多镜头短片、角色/产品一致性复用、API 批量出片。不适合：影视级长镜头、完全离线、把 Free 档商用（2026-11-21）。

pitfalls:
  - Pikaffects 特效线是它的记忆点——按「通用视频生成器」理解会错过产品重心
  - 大陆直连实测 000（2026-10-22，代理 200 可达）——不是死站，是可达性
  - Discord 时代的作品/账号迁移到 pika.art 的现状以官方 FAQ 迁移说明为准——旧教程的入口路径可能过时

tags: [免费+订阅, 特效玩法, Pikaffects, 社交向, 需网络环境]
related: [pixverse, runway, jimeng]

sources:
  - label: Pika · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://pika.art
    kind: official
  - label: Pika · Terms（官方条款，2026-10-22 直抓核验）
    url: https://pika.art/terms-of-service
    kind: official
  - label: Pika · Blog（官方更新线，changelog，2026-11-21 抓取 200）
    url: https://pika.art/blog
    kind: changelog
  - label: Pika · FAQ（计划/商用、API Club、Library 与 Pikaffects，2026-11-21 抓取 200）
    url: https://pika.art/faq
    kind: docs
  - label: Pika API · Pika 2.5 参考（X-API-Key、异步 job、轮询与删除媒体，2026-11-21 抓取 200）
    url: https://dev.pika.art/models/pika/pika-2.5/image-to-video
    kind: docs
  - label: Pika API · Pikaffects 定价页（Pikaffects 与 Pika 2.5 按秒/按次价，2026-11-21 抓取 200）
    url: https://dev.pika.art/models/pika/pikaffects/image-to-video/playground
    kind: docs
  - label: Pika · AI Powers（23+ 特效与 Agent API，2026-11-21 抓取 200）
    url: https://pikaslabs.com/ai-powers/
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Pika 是社交特效向的视频入口**：Pikaffects 夸张物理特效是记忆点，产品重心在玩法而非影视级生成；
大陆直连不可达（000），需网络环境。

## 适合与不适合

适合：短特效玩法、meme/创意实验、社交素材。
不适合：影视级长镜头、一致性叙事、大陆直连使用。

## 实测记录

本档核对官方 FAQ、Pika 2.5 API 参考与 API Club 页面；各特效可用度、免费档边界与角色保持度需按账号实测。
## 未知项清单

- 开放权重线：Pika 以闭源产品与 API 供给为主，权重状态按官方仓库核对。
- Discord 入口当前状态与作品迁移：官方 FAQ 称旧站已退役、付费作品迁到 OG Pika project。
- 训练用途开关：官方隐私政策与条款为最终口径。
- 跨会话记忆机制：产品以 Library/Projects 与显式资产复用为主。
## 相关条目

- [PixVerse](./pixverse.md) — 同为玩法特效向：PixVerse 模板生态重且国产直连，Pika 特效线更单点。
- [Runway](./runway.md) — 同为海外视频台：Runway 偏专业影视工作流，Pika 偏社交玩法。
- [即梦](../image/products/jimeng.md) — 玩法向的国产替代：即梦特效玩法线 + 大陆直连可用。
