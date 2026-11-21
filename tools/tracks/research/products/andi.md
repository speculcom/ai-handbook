---
id: andi
form: web
name: Andi Search
nameEn: Andi Search
vendor: Andi
homepage: https://andisearch.com
license: 免费（消费端）+ API 按结果计费。按官方条款/隐私页管辖（andisearch.com/terms 与 andiai.com/legal/privacy-policy，2026-11-21）；API 用量与价格按官方文档（2026-11-21）。
licenseEn: Free. Governed by the official terms/privacy pages (andisearch.com/terms and /privacy,
  direct-fetched 2026-10-22); details not verified line by line.

axes:
  model_access: >-
    自研检索+生成架构：Trantora AI index 覆盖 25B+ 页面，按语义与可信度排序，垃圾在入库时过滤；生成侧用 ensemble of models，API 按 `searchMode` 分 low-cost、fast、balanced、deep、exhaustive 五档自动/手动选择（2026-11-21）。
  runtime: >-
    网页 andisearch.com + PWA + Chrome 扩展 + REST API（`https://api.andiai.com`）+ 远程 MCP（`https://api.andiai.com/mcp`）+ CLI；检索与生成在厂商云端，CLI 在本地（2026-11-21）。
  local_files: >-
    匿名使用时不建账户：设置与历史只存浏览器本地；API 返回结构化 JSON 或 LLM-ready Markdown，`format=context` 直接喂 RAG，不在本地落文件；CLI 读 `ANDI_API_KEY` 环境变量（2026-11-21）。
  background: >-
    请求-响应式：fast 模式亚秒返回，deep 约 2–3 秒，exhaustive 覆盖最大；无托管任务队列或关机续跑形态，长任务由调用方自己拆（2026-11-21）。
  tools: >-
    直接答案+来源标注、Reader Mode 去广告阅读、Summarize、News/Images/Videos 标签；API 有 `/api/v1/search`、`/api/v1/fetch`、多查询（最多 5 条合并去重）、OpenSearch 兼容端点、`format=context` 与 MCP 搜索/抓页工具（2026-11-21）。
  context: >-
    匿名搜索不记录、不存画像，跨会话没有记忆；登录账户只存提供功能所需的信息；浏览器本地保存设置与历史，MCP/API 每次调用独立（2026-11-21）。
  permissions: >-
    消费端免费、无广告、无追踪、默认匿名；API 按结果计费（官方标 <1¢/query，响应里给 `metrics.cost_dollars`），用 `x-api-key` 鉴权；隐私政策承诺不出售数据、不记录搜索（2026-11-21）。
  fit: >-
    适合：要直接答案+可核来源的轻量研究、隐私敏感、免费无广告、给 agent/RAG 接搜索 API。不适合：深度学术垂直检索、中文向主打、要完全可审计的检索日志（2026-11-21）。

pitfalls:
  - 「直接生成答案」路线意味着检索过程对用户半透明——要核来源时看它的引用面，别只看答案文本
  - 小团队产品——功能节奏与长期性与大厂不同，选型把「持续性」列风险项（按官方产品公告核对）
  - andisearch.com 大陆直连实测 200（2026-10-22）——可达，但账号/支付面简单（免费为主）

tags: [免费, 直接答案, 无广告, 隐私叙事, 自研架构]
related: [kagi, perplexity, metaso, chatgpt]

sources:
  - label: Andi · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://andisearch.com
    kind: official
  - label: Andi · Terms（官方条款，2026-10-22 直抓核验）
    url: https://andisearch.com/terms
    kind: official
  - label: Andi · Privacy（官方隐私页，2026-11-21 抓取 200）
    url: https://andiai.com/legal/privacy-policy
    kind: official
  - label: Andi · 官方博客（andiai.com/blogs，2026-10-22 搜索快照核验）
    url: https://andiai.com/blogs
    kind: changelog
  - label: Andi · About（87% 准确率、无追踪与 Reader Mode，2026-11-21 抓取 200）
    url: https://andisearch.com/about/
    kind: official
  - label: Andi · FAQ（Y Combinator、25B 页面索引与 API，2026-11-21 抓取 200）
    url: https://andiai.com/faq
    kind: docs
  - label: Andi · Search API（25B+ 页面、五档 searchMode、MCP 与按结果计费，2026-11-21 抓取 200）
    url: https://andiai.com/api
    kind: docs
  - label: Andi · API Docs（base URL、x-api-key 与 search/fetch 端点，2026-11-21 抓取 200）
    url: https://docs.andiai.com
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Andi 走「直接生成答案」的 AI 原生搜索路线**：它直接用自研架构生成答案并标注来源，不包装传统检索结果，
免费无广告+不追踪隐私叙事；小团队产品的持续性要列风险项。

## 适合与不适合

适合：轻量研究要直接答案、隐私敏感、免费无广告。
不适合：学术垂直检索、中文主打、要可审计检索过程。

## 实测记录

本档核对官网、About、FAQ、隐私政策与 API 文档；答案质量、来源覆盖率与不追踪叙事的实际行为需按同一问题集与网络请求观察。
## 未知项清单

- 自研架构的技术细节：官方给 Trantora 索引与 ensemble 口径，模型清单按 API 文档核对。
- 产品长期性与融资状态：官方 FAQ 称 Y Combinator 支持。
- 训练用途开关：按隐私政策与账户设置核对。
- 中文查询质量：按同一问题集中英对比实测。
## 相关条目

- [Kagi](./kagi.md) — 同为隐私向搜索：Kagi 自建索引订阅制，Andi 自研答案架构免费。
- [Perplexity](./perplexity.md) — 路线对照：Perplexity 检索+引用聚合，Andi 直接生成答案。
- [秘塔 AI 搜索](./metaso.md) — 中文对照：秘塔中文纵深，Andi 英文向轻量。
