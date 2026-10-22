---
id: you-com
form: web
name: You.com
nameEn: You.com
vendor: You.com
homepage: https://you.com
license: 消费端免费+订阅；企业端按合同。按官方条款页管辖（you.com/legal/terms 直抓核验 2026-10-22）；
  细节未逐条核验。
licenseEn: Consumer free + subscription; enterprise by contract. Governed by the official terms page
  (you.com/legal/terms, direct-fetched 2026-10-22); details not verified line by line.

axes:
  model_access: >-
    多模型聚合（消费端 answer engine 可选多家模型，官方产品面）+ 企业端检索基础设施
    （ARI/Research API 线——官方现行主轴叙事）。
  runtime: >-
    网页（you.com）消费端 + API 企业端；检索与生成在厂商云端。
  local_files: >-
    对话历史存账户侧云端；未见官方声明的本机数据面或离线模式（未逐条核验）。
  background: >-
    问答即时；企业端 Research API 是服务面；无「关机续跑」概念。
  tools: >-
    消费端：answer engine+模型切换+apps 线（官网所见）；**企业端：Agentic Retrieval（ARI）/
    Research API 是现行主轴**（官方口径转向企业搜索基础设施——建档按官方现行口径写）。
  context: >-
    消费端以线程组织；企业端无记忆概念（API）；跨会话记忆未核验到官方声明。
  permissions: >-
    账号+订阅（消费端）/合同（企业端）（D9：价格不采）；训练用途开关未逐条核验；
    **产品重心已从消费端转向企业端**——消费端投入的不确定性要如实标注。
  fit: >-
    适合：企业检索基础设施采购评估（ARI/Research API）、消费端多模型切换体验。
    不适合：把消费端当长期承诺（重心已转企业端）、大陆直连（实测 000）。

pitfalls:
  - You.com 的「AI 搜索消费产品」旧认知已过时——官方现行主轴是企业搜索基础设施（ARI/Research API）
  - 消费端仍在运营但投入方向存疑——选型时把「消费端长期性」列为风险项
  - you.com 大陆直连 000（2026-10-22，代理 200）——可达性按代理口径

tags: [免费+订阅, 企业搜索API, ARI, 多模型切换, 重心转向]
related: [perplexity, genspark, kagi, chatgpt]

sources:
  - label: You.com · 官网（产品与能力叙事）
    url: https://you.com
    kind: official
  - label: You.com · Terms（官方条款，2026-10-22 直抓核验）
    url: https://you.com/legal/terms
    kind: official
  - label: You.com · Blog（官方更新线，changelog，2026-10-22 直抓核验）
    url: https://www.you.com/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

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
  verified: 2026-10-22
---

## 一句话定位

**You.com 的重心已经从消费端 AI 搜索转向企业检索基础设施**（ARI/Research API）：
消费端 answer engine 仍在运营，但选型要把「消费端长期性」列为风险项。

## 适合与不适合

适合：企业检索 API 采购评估、消费端多模型切换。
不适合：把消费端当长期承诺、大陆直连（000）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **ARI 检索质量 vs Exa/博查类检索 API 的对比**（企业端主轴实测）
- **消费端模型切换的当前可选清单**
- **消费端免费档的当前限制**（重心转移后的投入信号）

## 未知项清单

- 消费端产品线的长期投入（未核验到官方声明——风险项）
- 当前可选模型清单（未逐条清点）
- 训练用途开关（未逐条核验）
- blog.you.com 更新频率（changelog 线活跃度未逐条核验）

## 相关条目

- [Perplexity](./perplexity.md) — 同为消费端 AI 搜索：Perplexity 消费端仍是主轴，You.com 已转企业端。
- [Genspark](./genspark.md) — 同为搜索向：Genspark 做产物，You.com 企业端卖检索底座。
- [Kagi](./kagi.md) — 同为搜索向：Kagi 自建索引订阅制，You.com 企业 API 合同制。
