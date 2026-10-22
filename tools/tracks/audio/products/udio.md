---
id: udio
form: web
name: Udio
nameEn: Udio
vendor: Udio
homepage: https://www.udio.com
license: 免费+订阅（过渡期）。按官方 ToS 管辖（udio.com/terms-of-service 直抓核验 2026-10-22）；
  2025-11-12 起执行过渡版 ToS（官方 FAQ 自述）——新授权平台上线前，现行输出权利按过渡 ToS。
licenseEn: Free + subscription (transition period). Governed by the official ToS (udio.com/terms-of-service,
  direct-fetched 2026-10-22); a transition ToS took effect 2025-11-12 (per official FAQ) — output rights
  follow the transition ToS until the new licensed platform launches.

axes:
  model_access: >-
    自研模型线（v1/v1.5/v1.5 Allegro——官方 FAQ 点名当前可用模型）；新平台将用「授权与许可音乐」
    训练新模型（UMG 官方公告叙事）。开放权重线未核验到官方声明。
  runtime: >-
    网页（udio.com）；生成在厂商云端。曾有 Discord 内测入口（社区史叙事，当前状态未逐条核验）。
  local_files: >-
    作品存账户侧云端；**新平台走向「walled garden」——官方公告明说 AI 生成音乐不可下载/分发到平台外**
    （UMG 公告叙事）；过渡期下载面按现行 ToS（未逐条核验）。
  background: >-
    生成为任务制（提交→排队→进账户库）；无「关机续跑」形态声明——
    任务在云端跑，不依赖本机在线。
  tools: >-
    生成/extend/remix/Styles 等创作工具（官方 FAQ 点名）；新平台方向是 remix/covers/参与艺人
    声音风格的新创作体验（WMG 公告叙事）。
  context: >-
    任务制无对话记忆；风格延续靠 Styles 等机制——风格预设可复用不是记忆。
  permissions: >-
    **版权和解是理解 Udio 的关键背景**：2024-06 RIAA 代表 UMG/Sony/WMG 起诉；2025-10-29 UMG 和解+
    授权协议（官方公告直抓）、2025-11-19 WMG 和解（官方公告直抓）、Merlin/Kobalt 等后续跟进（第三方
    行业媒体报道，未逐条核验）；Sony 诉讼仍在进行（第三方叙事）。输出权利随过渡 ToS 与新平台条款变化——
    商用前必查当前版 ToS。
  fit: >-
    适合：音乐生成双雄之一的创作体验（复杂曲风向口碑）、跟踪授权平台新形态。
    不适合：需要「下载带走」的商用管线（walled garden 方向）、要确定性条款（过渡期）。

pitfalls:
  - Udio 处于「版权被告→授权平台」转型期——任何「Udio 输出可商用」的旧教程都可能过时，用前查现行 ToS
  - walled garden 是新平台方向（UMG 公告原文叙事）——按「生成即拥有可下载」理解会误判未来形态
  - 与 Suno 的诉讼与和解线各自独立——两家条款走向不同，别互相推断

tags: [免费+订阅, 音乐生成, 版权和解, walled-garden, 过渡期]
related: [suno, elevenlabs, runway]

sources:
  - label: Udio · 官网（产品与能力叙事）
    url: https://www.udio.com
    kind: official
  - label: Udio · Terms of Service（官方条款，2026-10-22 直抓核验）
    url: https://www.udio.com/terms-of-service
    kind: official
  - label: Udio · FAQ（过渡 ToS 与当前模型口径，2026-10-22 直抓核验）
    url: https://www.udio.com/faq
    kind: official
  - label: Udio · Blog（官方更新线，changelog；含 WMG 合作公告）
    url: https://www.udio.com/blog
    kind: changelog
  - label: UMG · 和解与授权公告（2025-10-29，对方官方公告）
    url: https://www.universalmusic.com/universal-music-group-and-udio-announce-udios-first-strategic-agreements-for-new-licensed-ai-music-creation-platform/
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Udio（美国纽约）。
  origin_note_en: Udio (New York, US).
  direct: yes
  direct_note: udio.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: udio.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Udio 是音乐生成双雄的另一半**（v1.5 Allegro 线，复杂曲风口碑），
现在正处「版权被告→授权平台」的转型期——UMG/WMG 已和解，新平台走 walled garden 路线。

## 适合与不适合

适合：音乐创作体验、跟踪授权平台新形态。
不适合：要下载带走的商用管线（walled garden 方向）、要确定性条款（过渡期）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **过渡 ToS 下现行下载的商用边界**（ToS 原文逐条读）
- **v1.5 Allegro 与 Suno v6 的同提示词对比**（曲风复杂度/人声自然度）
- **新平台（Starstruck 叙事）上线后的账号/作品迁移**

## 未知项清单

- 新平台上线时间与功能面（官方叙事 2026 内，具体未定）
- Sony 诉讼走向（第三方叙事，未核验到判决）
- 过渡期下载权利细节（未逐条核验 ToS）
- Discord 入口当前状态（未核验）

## 相关条目

- [Suno](./suno.md) — 音乐生成双雄的另一半：两家诉讼/和解线独立，条款走向不同。
- [MiniMax Audio](./minimax-audio.md) — 同为音频生成：MiniMax 语音/音乐双线，Udio 专注音乐。
- [Runway](../../video/products/runway.md) — 音画上下游：Udio 生成的配乐常喂给 Runway 类视频台做配乐短片（建档后互链）。
