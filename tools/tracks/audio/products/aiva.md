---
id: aiva
form: web
name: AIVA
nameEn: AIVA
vendor: AIVA Limited
homepage: https://www.aiva.ai
license: 按官方 Terms of Service 管辖（aiva.ai/terms-of-service 直抓核验 2026-10-30，主体 AIVA Limited）；
  版权按档位分层——免费档生成曲版权归 AIVA Limited、仅限四平台变现，Pro 订阅档「永久拥有完整版权」（条款页当日在册）。
licenseEn: Governed by the official Terms of Service (aiva.ai/terms-of-service direct-fetched 2026-10-30, entity AIVA Limited);
  copyright is tier-split — free-tier compositions stay owned by AIVA Limited with monetization limited to four platforms,
  Pro subscription grants "full copyright … forever" (on record in the terms page same day).

axes:
  model_access: >-
    自有音乐生成模型线（250+ 风格叙事当日在册）；不开放选第三方模型；
    可上传音频/MIDI 影响源、自建风格模型（官网 Ultimate customizability 段当日在册）。
  runtime: >-
    网页产品（aiva.ai）+ 桌面端（官网导航 Download 在册）；生成在 AIVA 云端；
    导出面「any file format」叙事在册（MP3/MIDI 在定价页点名）。
  local_files: >-
    下载导出的工程/音频归本机，生成过程与曲库在 AIVA 侧；未见官方声明的本机模型面。
  background: >-
    生成即时返回叙事（in seconds）；长任务队列/续跑细节未逐条核验。
  tools: >-
    编辑面在册（Edit your generated tracks、MIDI 导出对接 DAW 工作流）；MCP/API 支持未核验到官方声明。
  context: >-
    作品按账户曲库组织；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（免费+订阅，€0 免费档当日在册）；变现权限按档位分层是核心差异——
    免费档仅 YouTube/Twitch/TikTok/Instagram 四平台可变现且版权归 AIVA Limited（条款页当日在册）。
  fit: >-
    适合：非 DAW 用户的整曲生成、要 MIDI 可编辑进 DAW、Pro 档要完整版权的商用配乐。
    不适合：要大陆直连备案入口、要选第三方模型、要本机跑模型、免费档全平台变现。

pitfalls:
  - 版权按档位分层不是「生成即归你」——免费档版权归 AIVA Limited、变现限四平台，Pro 才「永久完整版权」（条款页当日在册）；配乐商用前必按档位核对
  - 「250+ 风格」是产品叙事不是可核验的模型清单——风格模型自建面（上传影响源）与预置风格的关系未逐条核验
  - 训练数据构成与版权来源未核验到官方声明——AI 配乐商用尽调时这是关键未知项

tags: [云端, 音乐生成, 免费+订阅, 付费商用, 商业]
related: [suno, udio, runway]

sources:
  - label: AIVA · 官网（250+ 风格/自建风格模型/版权叙事，2026-10-30 直抓 200）
    url: https://www.aiva.ai
    kind: official
  - label: AIVA · Terms of Service（主体 AIVA Limited+档位版权条款，2026-10-30 直抓 200）
    url: https://www.aiva.ai/terms-of-service
    kind: official
  - label: AIVA · Pricing（免费档 €0/Pro 档权益面，2026-10-30 直抓 200）
    url: https://www.aiva.ai/pricing
    kind: official
  - label: AIVA · Changelog（官方更新日志，2026-10-30 直抓 200）
    url: https://www.aiva.ai/changelog
    kind: changelog
  - label: AIVA · Blog（官方博客，2026-10-30 直抓 200）
    url: https://www.aiva.ai/blog
    kind: official

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: AIVA Limited（条款页当日在册主体；卢森堡背景未逐条核验，按条款页在册口径写 foreign）。
  origin_note_en: AIVA Limited (entity on record in the terms page same day; Luxembourg background not verified item by item,
    recorded as foreign per the terms-page evidence).
  direct: yes
  direct_note: aiva.ai 与 /pricing、/terms-of-service、/changelog 大陆直连实测 200（2026-10-30）。
  direct_note_en: aiva.ai and /pricing, /terms-of-service, /changelog measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页，未见 AIVA 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page searched 2026-10-30; no AIVA entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**AIVA 是「整曲生成 + MIDI 可编辑」的网页配乐助手**（AIVA Limited，当日直抓在册）：
250+ 风格叙事主打，版权按档位分层——免费档版权归平台限四平台变现，Pro 才永久完整版权。

## 适合与不适合

适合：非 DAW 用户的整曲生成、要 MIDI 导出进 DAW、Pro 档要完整版权的商用配乐。
不适合：要大陆直连备案入口、要选第三方模型、要本机跑模型、免费档全平台变现。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（音频产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **免费档四平台变现限制的实际执行面**（条款在册，平台侧如何判定/拦截未核验）
- **自建风格模型（上传影响源）与预置 250+ 风格的交互**（官网叙事在册，机制未核验）
- **生成曲与既有曲库的相似度风险**（训练数据构成未在册，商用尽调关键项）

## 未知项清单

- 训练数据构成与版权来源（未核验到官方声明）
- 桌面端与网页端功能面差异（Download 在册，差异未逐条核验）
- 档位价格具体数字（pricing 页 JS 渲染，未逐条抓取）
- 免费档「15 downloads/月」与时长 5 分钟限制的工程面细节（定价页在册，执行面未核验）

## 相关条目

- [Suno](./suno.md) — 同为整曲生成：Suno 主打带人声流行曲与托管生态，AIVA 主打器乐配乐与 MIDI 可编辑工作流。
- [Udio](./udio.md) — 同为带版权争议的整曲生成线：Udio 有大唱片公司版权和解叙事，AIVA 走自有档位版权条款。
- [Runway](../../video/products/runway.md) — 配乐常与视频生成搭伙：Runway 出画面，AIVA 出可编辑配乐轨。
