---
id: udio
form: web
name: Udio
nameEn: Udio
vendor: Udio
homepage: https://www.udio.com
license: 免费+订阅（过渡期）。按官方 ToS 管辖（2026-10-22 取得）；2025-11-12 起执行过渡版 ToS（官方 FAQ 自述）——新授权平台上线前，现行输出权利按过渡 ToS。
licenseEn: Free plus subscription during the transition. Governed by the official ToS (fetched 2026-10-22); a transition ToS took effect on 2025-11-12 (per the official FAQ) — output rights follow the transition ToS until the new licensed platform launches.

axes:
  model_access: >-
    自研模型线（v1/v1.5/v1.5 Allegro，官方 FAQ 点名当前可用模型）；新平台将用授权与许可音乐训练新模型（UMG 公告叙事）。开放权重线官方页未列，模型与平台绑定（2026-11-21）。
  runtime: >-
    网页（udio.com），生成在厂商云端；官方 Guide 以 prompt→Create 的网页流程描述，订阅档可同时生成 2/4/10 首。Discord 内测入口是社区史，当前产品面以网页为准（2026-11-21）。
  local_files: >-
    作品存账户侧云端；新平台走向 walled garden，官方公告明说 AI 生成音乐不可下载/分发到平台外（UMG 公告叙事）；过渡期下载面按现行 ToS（2026-11-21）。
  background: >-
    任务制：提交→云端排队→进账户库，官方 Guide 说明 prompt 框在 Create 后不清空，便于连续排队多次生成；生成不依赖本机在线。官方页未给暂停/续跑/队列控制面板（2026-11-21）。
  tools: >-
    生成、extend、remix、inpainting、Styles 与 seed 等创作工具（官方 Guide 与 FAQ 点名）；新平台方向是 remix/covers/参与艺人声音风格的新创作体验（WMG 公告叙事）（2026-11-21）。
  context: >-
    任务制无对话记忆；风格延续靠 Styles、remix、extend 与 seed 等显式机制，官方 Guide 把 remix/inpainting/seed 列为编辑工具。跨会话偏好与用户画像官方页未列（2026-11-21）。
  permissions: >-
    版权和解是理解 Udio 的关键背景：2025-10-29 UMG 和解+授权协议、2025-11-19 WMG 和解（官方公告）；Merlin/Kobalt 等后续跟进按行业媒体报道。Sony 诉讼仍在进行。输出权利随过渡 ToS 与新平台条款变化，商用前查当前版 ToS（2026-11-21）。
  fit: >-
    适合：音乐生成双雄之一的创作体验（复杂曲风向口碑）、跟踪授权平台新形态。不适合：需要「下载带走」的商用管线（walled garden 方向）、要确定性条款（过渡期）（2026-11-21）。

pitfalls:
  - Udio 处于「版权被告→授权平台」转型期——任何「Udio 输出可商用」的旧教程都可能过时，用前查现行 ToS
  - walled garden 是新平台方向（UMG 公告原文叙事）——按「生成即拥有可下载」理解会误判未来形态
  - 与 Suno 的诉讼与和解线各自独立——两家条款走向不同，别互相推断

tags: [免费+订阅, 音乐生成, 版权和解, walled-garden, 过渡期]
related: [suno, elevenlabs, runway]

sources:
  - label: Udio · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://www.udio.com
    kind: official
  - label: Udio · Terms of Service（官方条款，2026-10-22 直抓核验）
    url: https://www.udio.com/terms-of-service
    kind: official
  - label: Udio · FAQ（过渡 ToS 与当前模型口径，2026-10-22 直抓核验）
    url: https://www.udio.com/faq
    kind: official
  - label: Udio · Blog（官方更新线，changelog；含 WMG 合作公告，2026-11-21 抓取 200）
    url: https://www.udio.com/blog
    kind: changelog
  - label: UMG · 和解与授权公告（2025-10-29，对方官方公告）
    url: https://www.universalmusic.com/universal-music-group-and-udio-announce-udios-first-strategic-agreements-for-new-licensed-ai-music-creation-platform/
    kind: official

  - label: Udio · Guide（创作、排队、extend/remix/inpainting，2026-11-21 抓取 200）
    url: https://www.udio.com/guide
    kind: docs
  - label: Udio · Pricing（档位与并发生成上限，2026-11-21 抓取 200）
    url: https://www.udio.com/pricing
    kind: official

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Udio 是音乐生成双雄的另一半**（v1.5 Allegro 线，复杂曲风口碑），
现在正处「版权被告→授权平台」的转型期——UMG/WMG 已和解，新平台走 walled garden 路线。

## 适合与不适合

适合：音乐创作体验、跟踪授权平台新形态。
不适合：要下载带走的商用管线（walled garden 方向）、要确定性条款（过渡期）。

## 实测记录

本档核对官网、Guide、FAQ 与和解公告的能力和法律边界；生成质量、排队行为与过渡期下载权需按账号与当前 ToS 实测。
## 未知项清单

- 新授权平台的上线时间与正式条款：官方尚未给出确定日期，按公告与 ToS 更新跟进。
- 过渡期下载与分发权的边界：按现行过渡 ToS 原文核对。
- 免费/订阅档的并发生成与积分细则：官方 pricing 页给出档位框架，具体消耗按账号页。
## 相关条目

- [Suno](./suno.md) — 音乐生成双雄的另一半：两家诉讼/和解线独立，条款走向不同。
- [MiniMax Audio](./minimax-audio.md) — 同为音频生成：MiniMax 语音/音乐双线，Udio 专注音乐。
- [Runway](../../video/products/runway.md) — 音画上下游：Udio 生成的配乐常喂给 Runway 类视频台做配乐短片（建档后互链）。
