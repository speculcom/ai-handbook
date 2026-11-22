---
id: kagi
form: web
name: Kagi
nameEn: Kagi
vendor: Kagi
homepage: https://kagi.com
license: 订阅制（无广告、无免费档主打）。按官方条款/隐私页管辖（kagi.com/privacy 2026-11-21 取得）。商业使用仅限 API 产品，前端产品默认非商业。
licenseEn: Subscription-first (ad-free, not free-tier-led). Governed by the official terms and privacy page (kagi.com/privacy fetched 2026-11-21); commercial use is limited to API products, while front-end products are non-commercial by default.

axes:
  model_access: >-
    自建搜索索引是核心叙事，答案层由 FastGPT、Assistant、Universal Summarizer 等组成。

    官方隐私页把第三方 AI provider 描述为按请求调用、尽量不留存不训练。产品面未给逐模型清单。搜索是本体、AI 是附加，与多数 AI 搜索的顺序相反（2026-11-21）。
  runtime: >-
    网页 kagi.com、浏览器扩展与 Mini Bar 是入口。搜索索引自建，FastGPT、Assistant 与摘要请求在 Kagi 云端完成。

    官方文档未提供本地模型包、私有化部署或离线索引。客户端只承担界面与可选缓存（2026-11-21）。
  local_files: >-
    搜索本身不落地用户文件。

    官方隐私页列出的客户端存储只有 `kagi_session`、`_kagi_search_`、`kagi_previous_page`、 `kagi_precise_location` 等 cookie，以及 `kagi_sse_replay`。

    后者是 localStorage 的近期结果缓存，用来减少往返。官方未列账户级搜索历史库。Tor、Privacy Pass 与匿名邮箱是可选的匿名化路径（2026-11-21）。
  background: >-
    搜索与摘要请求即时返回。官方文档未列作业队列、定时任务或后台批处理 API。FastGPT 与 Assistant 的请求在云端完成。关闭页面不保留可恢复的长任务。

    需要批量任务应走 Kagi API 自行编排（2026-11-21）。
  tools: >-
    产品面包括无广告搜索、FastGPT/Assistant 答案线、Universal Summarizer（URL/视频/文档摘要）、Kagi Translate 与 API。

    官方隐私页把 Assistant、Summarizer、FastGPT、Translate 都列为 AI 工具，并给出线程保留规则（2026-11-21）。
  context: >-
    搜索按单次查询组织。官方隐私页明确不把查询关联到账户、不构建画像。Kagi Assistant 的会话线程默认 1 天后自动永久删除。用户也可立即删除，被举报线程保留 30 天。

    没有跨会话长期记忆入口（2026-11-21）。
  permissions: >-
    订阅账户与 API key 两级。官方条款写明只有 Kagi API 产品可用于商业用途。Universal Summarizer 等前端产品默认非商业，商用需另谈许可。

    账户可开匿名邮箱、加密货币、Tor 与 Privacy Pass。团队或企业管理面官方文档未单列（2026-11-21）。
  fit: >-
    适合：愿意付费换无广告。无追踪搜索体验，要「搜索+全文读」式答案。对追踪和画像敏感的用户。

    不适合：只找免费档。要中文检索为主打，或需要企业级审计与团队管理面的组织（2026-11-21）。
pitfalls:
  - Kagi 是「搜索引擎+AI 附加」不是「AI 搜索」——索引自建，答案层是附加。对比口径别错位
  - 订阅制是产品姿态。没有免费档兜底，「先试试」的成本结构与其他家不同（D9：价格不采）
  - kagi.com 大陆直连实测 200（2026-10-22）。可达，但账号/支付按海外口径

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

  - label: Kagi · 官方帮助文档（产品与隐私说明入口，2026-11-21 抓取 200）
    url: https://help.kagi.com/kagi/
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Kagi（美国，创始人团队叙事为前 Google/Uber 工程师）。
  origin_note_en: Kagi (US; founder-team narrative: ex-Google/ex-Uber engineers).
  direct: yes
  direct_note: kagi.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: kagi.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）。该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**Kagi 是「付费换隐私」的自建索引搜索引擎**：无广告无追踪是主轴。
AI 答案层（FastGPT/Teclis）
是附加——它与「AI 搜索」的顺序正好相反。

## 适合与不适合

适合：付费换无追踪体验、「搜索+全文读」答案、对追踪敏感用户。
不适合：免费用户、中文检索主打、依赖国内支付面。

## 实测记录

本档核对官方隐私页与帮助文档的能力边界。
检索质量、中文覆盖与零留存实际效果需按查询集自测。

## 未知项清单

- 自建索引规模与更新频率：官方未披露具体索引规模。
- 各答案线当前可切换模型清单：官方文档未列逐模型清单。
- 中文查询的实际检索质量：官方文档未列分语言评测。
- 零留存的实际生效：隐私页说明不关联账户，第三方审计报告未在文档中列出。
## 相关条目

- [Perplexity](./perplexity.md) — 顺序对照：Perplexity 是 AI 答案带搜索，Kagi 是搜索带 AI 答案。
- [Andi Search](./andi.md) — 同为隐私向 AI 搜索：Andi 免费+AI 直接答，Kagi 订阅+自建索引。
- [秘塔 AI 搜索](./metaso.md) — 同为「无广告直达结果」口号：秘塔中文向免费+会员，Kagi 英文向订阅制。
