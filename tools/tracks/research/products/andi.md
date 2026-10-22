---
id: andi
form: web
name: Andi Search
nameEn: Andi Search
vendor: Andi
homepage: https://andisearch.com
license: 免费。按官方条款/隐私页管辖（andisearch.com/terms 与 /privacy 直抓核验 2026-10-22）；
  细节未逐条核验。
licenseEn: Free. Governed by the official terms/privacy pages (andisearch.com/terms and /privacy,
  direct-fetched 2026-10-22); details not verified line by line.

axes:
  model_access: >-
    自研检索+生成架构（官方叙事：直接生成答案而非「检索后包装」——「direct answer」路线）；
    自研模型线（官方叙事），不路由第三方大模型（官方口径，未逐条核验）。
  runtime: >-
    网页（andisearch.com）为主入口；检索与生成都在厂商云端完成，未见官方声明的本地/离线形态。
  local_files: >-
    隐私叙事：不追踪不存画像（官方隐私页叙事）；未见官方声明的其他本机数据面。
  background: >-
    搜索问答即时返回；未见官方任务队列或「关机续跑」类后台任务面（未逐条核验）。
  tools: >-
    AI 原生搜索（答案直接生成+来源标注）、对话追问线、**「像朋友一样解释」的通俗化答案风格**
    （官方叙事）；无广告（产品姿态）。
  context: >-
    对话式追问在同一会话内成立；跨会话记忆与个性化画像未核验到官方声明（隐私叙事反而强调不存画像）。
  permissions: >-
    免费产品（D9：价格不采——免费为主）；隐私承诺（不追踪叙事）条款级落点未逐条核验；
    训练用途开关未逐条核验。
  fit: >-
    适合：要直接答案+解释风格的轻量研究、对追踪敏感、免费无广告需求。
    不适合：深度学术检索（无学术垂直）、中文向主打、要可审计检索过程。

pitfalls:
  - 「直接生成答案」路线意味着检索过程对用户半透明——要核来源时看它的引用面，别只看答案文本
  - 小团队产品——功能节奏与长期性与大厂不同，选型把「持续性」列风险项（未核验到官方路线图）
  - andisearch.com 大陆直连实测 200（2026-10-22）——可达，但账号/支付面简单（免费为主）

tags: [免费, 直接答案, 无广告, 隐私叙事, 自研架构]
related: [kagi, perplexity, metaso, chatgpt]

sources:
  - label: Andi · 官网（产品与能力叙事）
    url: https://andisearch.com
    kind: official
  - label: Andi · Terms（官方条款，2026-10-22 直抓核验）
    url: https://andisearch.com/terms
    kind: official
  - label: Andi · Privacy（官方隐私页，2026-10-22 直抓核验）
    url: https://andisearch.com/privacy
    kind: official
  - label: Andi · 官方博客（andisearch.com 站内链向 andiai.com/blogs；页面 JS 渲染，正文经 2026-10-22 搜索快照核验——含带日期的功能公告条目）
    url: https://andiai.com/blogs
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Andi（美国，小团队叙事）。
  origin_note_en: Andi (US, small-team narrative).
  direct: yes
  direct_note: andisearch.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: andisearch.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Andi 走「直接生成答案」的 AI 原生搜索路线**：不是「检索后包装」而是自研架构直接答+来源标注，
免费无广告+不追踪隐私叙事；小团队产品的持续性要列风险项。

## 适合与不适合

适合：轻量研究要直接答案、隐私敏感、免费无广告。
不适合：学术垂直检索、中文主打、要可审计检索过程。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **「直接答案」与 Perplexity「检索+引用」的答案质量对比**（同一问题集）
- **来源标注的覆盖率**（多少答案带可核引用）
- **不追踪叙事的实际验证**（网络请求观察）

## 未知项清单

- 自研架构的技术细节（官方叙事，未逐条核验）
- 产品长期性/融资状态（未核验到官方声明——风险项）
- 训练用途开关（未逐条核验）
- 中文查询质量（未实测）

## 相关条目

- [Kagi](./kagi.md) — 同为隐私向搜索：Kagi 自建索引订阅制，Andi 自研答案架构免费。
- [Perplexity](./perplexity.md) — 路线对照：Perplexity 检索+引用聚合，Andi 直接生成答案。
- [秘塔 AI 搜索](./metaso.md) — 中文对照：秘塔中文纵深，Andi 英文向轻量。
