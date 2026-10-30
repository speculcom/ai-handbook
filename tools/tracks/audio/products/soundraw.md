---
id: soundraw
form: web
name: Soundraw
nameEn: SOUNDRAW
vendor: SOUNDRAW Inc.
homepage: https://soundraw.io
license: 按官方 Terms of Service 管辖（soundraw.io/terms 直抓核验 2026-10-30，更新日期 2025-06-12，主体 SOUNDRAW Inc.）；
  具体档位授权差异未逐条核验。
licenseEn: Governed by the official Terms of Service (soundraw.io/terms direct-fetched 2026-10-30, updated 2025-06-12,
  entity SOUNDRAW Inc.); tier-bound licensing details not verified item by item.

axes:
  model_access: >-
    自有生成线：官网当日招牌口径「trained only on music we create in-house」（100% Copyright-Safe 叙事）——
    训练数据自述为自建曲库；不开放选第三方模型。
  runtime: >-
    网页产品（soundraw.io）；生成在 SOUNDRAW 云端；Mixer 面（切乐器轨/调强度/改时长）当日在册；
    API/本机面未核验到官方声明。
  local_files: >-
    下载导出的音频归本机，生成与曲库在 SOUNDRAW 侧；未见官方声明的本机数据面。
  background: >-
    生成即时返回叙事（in seconds）；队列/续跑细节未逐条核验。
  tools: >-
    编辑面在册（Mixer 逐轨开关/强度/时长、风格混合 Blend Genres）；MCP/API 支持未核验到官方声明。
  context: >-
    作品按账户曲库组织、可回访再编辑；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（免费+订阅）；「免版税」是主打叙事——每曲「legally yours to use, monetize, and share」
    官网当日在册；具体档位授权边界按 ToS，未逐条核验。
  fit: >-
    适合：视频/播客免版税配乐、按情绪/风格/时长快速选曲改曲、要「训练数据自述干净」的版权叙事。
    不适合：要大陆直连备案入口、要人声带词整曲（主打器乐 beat）、要本机跑模型。

pitfalls:
  - 「100% Copyright-Safe / 只用自建音乐训练」是官方自述叙事（官网当日在册）——第三方审计未在册，商用尽调时按自述口径对待
  - 主打器乐 beat 不是带人声整曲——与 Suno/AIVA 的「song」定位不同，找带词歌曲时它是错工具
  - 无独立 changelog 页（/changelog 与 /updates 当日 404）——更新面只有 blog 一条线，产品变更追踪粒度弱

tags: [云端, 音乐生成, 免版税, 免费+订阅, 商业]
related: [suno, aiva, runway]

sources:
  - label: SOUNDRAW · 官网（in-house 训练叙事/Mixer/Blend Genres，2026-10-30 直抓 200）
    url: https://soundraw.io
    kind: official
  - label: SOUNDRAW · Terms of Service（更新日期 2025-06-12，主体 SOUNDRAW Inc.，2026-10-30 直抓 200）
    url: https://soundraw.io/terms
    kind: official
  - label: SOUNDRAW · Pricing（档位面，2026-10-30 直抓 200）
    url: https://soundraw.io/pricing
    kind: official
  - label: SOUNDRAW · Blog（官方更新线，changelog 代位——无独立 changelog 页，2026-10-30 直抓 200）
    url: https://soundraw.io/blog
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: SOUNDRAW Inc.（条款页当日在册主体；日本背景未逐条核验，按条款页在册口径写 foreign）。
  origin_note_en: SOUNDRAW Inc. (entity on record in the terms page same day; Japan background not verified item by item,
    recorded as foreign per the terms-page evidence).
  direct: yes
  direct_note: soundraw.io 与 /pricing、/terms 大陆直连实测 200（2026-10-30）。
  direct_note_en: soundraw.io and /pricing, /terms measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页，未见 Soundraw 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page searched 2026-10-30; no Soundraw entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**SOUNDRAW 是「只用自建曲库训练」叙事主打的免版税 AI beat 生成器**（SOUNDRAW Inc.，条款当日在册）：
按情绪/风格/时长快速出器乐配乐，Mixer 逐轨可改，主打视频创作者场景。

## 适合与不适合

适合：视频/播客免版税配乐、按情绪/风格/时长快速选曲改曲、要「训练数据自述干净」的版权叙事。
不适合：要大陆直连备案入口、要人声带词整曲（主打器乐 beat）、要本机跑模型。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（音频产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **「in-house 训练」叙事的第三方验证面**（官网自述在册，审计/曲库来源未在册——这是它区别于同类产品的核心卖点，值得单独尽调）
- **Mixer 逐轨编辑的实际粒度**（乐器轨开关/强度/时长的工程面效果未核验）
- **订阅档位下架后已下载曲目的授权存续**（ToS 未逐条核验）

## 未知项清单

- 自建曲库的规模与来源（官网叙事未给数字）
- 档位价格具体数字与授权差异（pricing 页 JS 渲染，未逐条抓取）
- 是否有 API 面（未核验到官方声明）
- 下架订阅后已导出曲目授权是否存续（ToS 未逐条核验）

## 相关条目

- [Suno](./suno.md) — 同为整曲生成但路线相反：Suno 带人声主打流行曲，SOUNDRAW 器乐 beat 主打免版税配乐。
- [AIVA](./aiva.md) — 同为配乐向生成：AIVA 走 MIDI 可编辑+档位版权分层，SOUNDRAW 走 Mixer 逐轨+免版税叙事。
- [Runway](../../video/products/runway.md) — 视频创作者常搭伙：Runway 出画面，SOUNDRAW 出免版税配乐轨。
