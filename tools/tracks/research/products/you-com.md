---
id: you-com
form: web
name: You.com
nameEn: You.com
vendor: You.com
homepage: https://you.com
license: 消费端免费+订阅；企业端按合同。按官方条款页管辖（2026-10-22 取得）；API 鉴权与数据保留按官方文档（2026-11-21）。
licenseEn: Consumer free plus subscription; enterprise by contract. Governed by the official terms page (fetched 2026-10-22); API auth and retention follow the official docs (2026-11-21).

axes:
  model_access: >-
    多模型聚合（消费端可选多家模型）+ 企业端检索基础设施：官方 API 文档列 Search、Contents、Answer、Research、Finance Research 与 Inference Router（OpenAI/Anthropic 兼容）六条线（2026-11-21）。
  runtime: >-
    网页（you.com）消费端 + API 企业端；检索与生成在厂商云端。官方 API 文档列 Web Search、Contents、Answer、Research、Finance Research 与 Inference Router 六个端点，分别走 ydc-index.io 与 api.you.com（2026-11-21）。
  local_files: >-
    对话历史存账户侧云端；官方 API 是请求-响应式，不落地本机索引或离线缓存，返回结构化 JSON/Markdown；未见官方本机数据面（2026-11-21）。
  background: >-
    问答即时返回；Research API 在单次请求内完成多轮搜索、交叉引用与综合，属同步 API 而非可暂停作业队列；企业批量任务由调用方自行排队（2026-11-21）。
  tools: >-
    消费端 answer engine+模型切换+apps 线；企业端 Search API、Contents/Extract API、Answer API、Research API、Finance Research API 与 Inference Router 是现行主轴，官方文档给出端点与鉴权方式（2026-11-21）。
  context: >-
    消费端以线程组织；企业端 API 无跨请求记忆，每次请求独立，上下文需由调用方在 prompt 中携带；跨会话记忆官方页未列（2026-11-21）。
  permissions: >-
    账号+订阅（消费端）/合同与 API key（企业端）；官方文档要求 X-API-Key 或 Bearer，训练用途开关与数据保留按官方条款与隐私页核对（2026-11-21）。
  fit: >-
    适合：企业检索基础设施采购评估（Search/Research/Answer API）、消费端多模型切换体验。不适合：把消费端当长期承诺（重心已转企业端）、大陆直连（实测 000）（2026-11-21）。

pitfalls:
  - You.com 的「AI 搜索消费产品」旧认知已过时——官方现行主轴是企业搜索基础设施（ARI/Research API）
  - 消费端仍在运营但投入方向存疑——选型时把「消费端长期性」列为风险项
  - you.com 大陆直连 000（2026-10-22，代理 200）——可达性按代理口径

tags: [免费+订阅, 企业搜索API, ARI, 多模型切换, 重心转向]
related: [perplexity, genspark, kagi, chatgpt]

sources:
  - label: You.com · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://you.com
    kind: official
  - label: You.com · Terms（官方条款，2026-10-22 直抓核验）
    url: https://you.com/legal/terms
    kind: official
  - label: You.com · Blog（官方更新线，changelog，2026-10-22 直抓核验）
    url: https://www.you.com/blog
    kind: changelog

  - label: You.com · API Guides（Search/Contents/Answer/Research 端点与鉴权，2026-11-21 抓取 200）
    url: https://you.com/docs/guides/search.md
    kind: docs
  - label: You.com · Research API 产品页（多步检索与引用报告，2026-11-21 抓取 200）
    url: https://about.you.com/product/research-api
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: You.com（美国旧金山，创始人 Richard Socher——前 Salesforce 首席科学家叙事）。
  origin_note_en: You.com (San Francisco, US; founder Richard Socher — ex-Salesforce Chief Scientist narrative).
  direct: no
  direct_note: you.com 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: you.com measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**You.com 的重心已经从消费端 AI 搜索转向企业检索基础设施**（ARI/Research API）：
消费端 answer engine 仍在运营，但选型要把「消费端长期性」列为风险项。

## 适合与不适合

适合：企业检索 API 采购评估、消费端多模型切换。
不适合：把消费端当长期承诺、大陆直连（000）。

## 实测记录

本档核对官网、条款与 API 文档的能力边界；ARI/Research 检索质量、消费端模型清单与免费档限制需按账号实测。
## 未知项清单

- 消费端产品线的长期投入：官方页未给承诺，列为选型风险项。
- 当前可选模型清单：官方 API 文档列 Inference Router 的兼容面，消费端具体清单按登录后界面。
- 训练用途开关：按官方条款与隐私页核对。
- 博客更新频率：按官方 changelog 页核对。
## 相关条目

- [Perplexity](./perplexity.md) — 同为消费端 AI 搜索：Perplexity 消费端仍是主轴，You.com 已转企业端。
- [Genspark](./genspark.md) — 同为搜索向：Genspark 做产物，You.com 企业端卖检索底座。
- [Kagi](./kagi.md) — 同为搜索向：Kagi 自建索引订阅制，You.com 企业 API 合同制。
