---
id: kagi
form: web
name: Kagi
nameEn: Kagi
vendor: Kagi
homepage: https://kagi.com
license: 订阅制（无广告、无免费档主打——产品姿态）。按官方条款/隐私页管辖
  （kagi.com/privacy 直抓核验 2026-10-22）；细节未逐条核验。
licenseEn: Subscription-first (ad-free, not free-tier-led — product posture). Governed by official
  terms/privacy pages (kagi.com/privacy, direct-fetched 2026-10-22); details not verified line by line.

axes:
  model_access: >-
    自建搜索索引（Kagi 自建索引是核心叙事）+ FastGPT 等 LLM 答案层（可切换多家模型，
    官方产品面）；「搜索是本体、AI 是附加」的顺序与多数 AI 搜索相反。
  runtime: >-
    网页（kagi.com）+ 浏览器扩展 + Mini Bar（官方产品线）；Kagi FastGPT/FastGPT 类问答在云端；
    搜索索引自建。
  local_files: >-
    搜索历史可选本地化/零留存模式（官方隐私叙事：不追踪不画像）；未见官方声明的其他本机数据面。
  background: >-
    搜索即时返回；未见官方任务队列或「关机续跑」类后台任务面（未逐条核验）。
  tools: >-
    无广告搜索（招牌）、Teclis/Exa 类「先搜后 LLM 读全文」答案线（官方产品面）、
    Universal Summarizer（URL/视频/文档摘要）、翻译；**隐私承诺是产品主轴之一**（无追踪叙事）。
  context: >-
    无对话记忆主打——搜索按会话制组织；跨会话记忆与画像未核验到官方声明（隐私姿态反而强调不追踪）。
  permissions: >-
    订阅制（D9：价格不采）；**「不追踪、不卖数据」是官方隐私叙事**——
    条款级落点未逐条核验；付费换隐私是它的产品逻辑。
  fit: >-
    适合：愿意付费换无广告/无追踪搜索体验、要「搜索+全文读」式答案（Teclis 线）、
    对追踪敏感的用户。
    不适合：免费用户（无免费档主打）、大陆直连敏感（直连 200 可达但支付面按海外口径）、
    要中文检索主打。

pitfalls:
  - Kagi 是「搜索引擎+AI 附加」不是「AI 搜索」——索引自建，答案层是附加；对比口径别错位
  - 订阅制是产品姿态——没有免费档兜底，「先试试」的成本结构与其他家不同（D9：价格不采）
  - kagi.com 大陆直连实测 200（2026-10-22）——可达，但账号/支付按海外口径

tags: [订阅制, 自建索引, 无广告无追踪, FastGPT, 隐私向]
related: [perplexity, andi, metaso, chatgpt]

sources:
  - label: Kagi · 官网（产品与能力叙事）
    url: https://kagi.com
    kind: official
  - label: Kagi · Privacy（官方隐私页，2026-10-22 直抓核验）
    url: https://kagi.com/privacy
    kind: official
  - label: Kagi · Blog（官方更新线，changelog）
    url: https://blog.kagi.com
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Kagi（美国，创始人团队叙事为前 Google/Uber 工程师）。
  origin_note_en: Kagi (US; founder-team narrative: ex-Google/ex-Uber engineers).
  direct: yes
  direct_note: kagi.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: kagi.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Kagi 是「付费换隐私」的自建索引搜索引擎**：无广告无追踪是主轴，AI 答案层（FastGPT/Teclis）
是附加——它与「AI 搜索」的顺序正好相反。

## 适合与不适合

适合：付费换无追踪体验、「搜索+全文读」答案、对追踪敏感用户。
不适合：免费用户、中文检索主打、依赖国内支付面。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **自建索引 vs Google/Bing 的长尾查询覆盖差**
- **Teclis「先搜后读全文」答案与 Perplexity 的质量对比**
- **零留存模式的实际生效验证**（历史行为观察）

## 未知项清单

- 自建索引规模与更新频率（未核验到官方声明）
- 各答案线当前可切换模型清单（未逐条清点）
- 隐私承诺的条款级落点（未逐条核验）
- 中文查询的实际检索质量（未实测）

## 相关条目

- [Perplexity](./perplexity.md) — 顺序对照：Perplexity 是 AI 答案带搜索，Kagi 是搜索带 AI 答案。
- [Andi Search](./andi.md) — 同为隐私向 AI 搜索：Andi 免费+AI 直接答，Kagi 订阅+自建索引。
- [秘塔 AI 搜索](./metaso.md) — 同为「无广告直达结果」口号：秘塔中文向免费+会员，Kagi 英文向订阅制。
