---
id: genspark
form: web
name: Genspark
nameEn: Genspark
vendor: Genspark
homepage: https://www.genspark.ai
license: 免费额度+订阅。按官方条款页管辖（genspark.ai/terms 直抓核验 2026-10-22）；
  细节未逐条核验。
licenseEn: Free credits + subscription. Governed by the official terms page (genspark.ai/terms,
  direct-fetched 2026-10-22); details not verified line by line.

axes:
  model_access: >-
    多模型编排（agent 工作流内调用多家模型，官方叙事）；用户不选裸模型。
    自研线（Super Agent 叙事）与第三方模型混用，清单未逐条清点。
  runtime: >-
    网页（genspark.ai）+ App（官网导航所见）；生成在厂商云端。
  local_files: >-
    产物（报告/页面/表格/PPT）存账户侧云端；下载归本地。未见官方声明的本机数据面。
  background: >-
    任务制：提交任务→云端多步执行→产物进账户库（agent 形态）；任务在云端跑不依赖本机在线。
  tools: >-
    **搜索+报告 agent 是主轴**：Sparkpage（检索结果重组成结构化页面）、AI Slides/Sheets/网站生成
    （官网产品面）、浏览器扩展（官网所见）；多步工具调用（检索/代码/图像）在 agent 内。
  context: >-
    以任务/项目组织产物与历史；跨会话记忆未核验到官方声明（agent 任务线内的上下文延续未逐条核验）。
  permissions: >-
    账号+积分/订阅体系（D9：价格不采）；agent 有联网与代码执行面——上传敏感数据前要想清楚
    它会带什么上网（条款细节未逐条核验）。
  fit: >-
    适合：「搜索→报告→幻灯片」一条龙、要现成产物的研究交付、轻量 agent 任务外包。
    不适合：要过程可控可审计（agent 黑箱度）、企业合规优先、大陆直连敏感（直连 403=CF 拦截）。

pitfalls:
  - Genspark 与 Manus 同属「任务 agent」阵营——主轴是研究/内容产物，不是代码库（coding 大类对照）
  - Sparkpage 重组的是检索结果——重组质量不改变源质量，差源进差页出
  - genspark.ai 直连 403（CF 拦截，2026-10-22）——可达性按代理口径，不是站点死亡

tags: [免费+积分, 搜索agent, 报告生成, Sparkpage, 任务制]
related: [manus, perplexity, tiangong]

sources:
  - label: Genspark · 官网（产品与能力叙事）
    url: https://www.genspark.ai
    kind: official
  - label: Genspark · Terms（官方条款，2026-10-22 直抓核验）
    url: https://www.genspark.ai/terms
    kind: official
  - label: Genspark · Privacy（官方隐私页，2026-10-22 直抓核验）
    url: https://www.genspark.ai/privacy
    kind: official
  - label: Genspark · Blog（官方更新线，changelog，2026-10-22 直抓核验——Gen-1 Slides/Workspace 6.0 等条目在列）
    url: https://www.genspark.ai/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Genspark（叙事为海外注册；团队含中国背景成员——注册主体细节未核验到官方声明）。
  origin_note_en: Genspark (overseas-registration narrative; team includes China-background members —
    entity details not verified).
  direct: unknown
  direct_note: genspark.ai 大陆直连实测 403（2026-10-22）——CF 拦截无法判定可达性（代理下 200）。
  direct_note_en: genspark.ai returns 403 direct from the mainland (2026-10-22) — a CF challenge; reachability
    cannot be judged by this method (200 via proxy).
  filing: unknown
  filing_note: 未核验到对应生成式 AI 服务备案（2026-10-22 检索）；主体归属未核验清楚——
    「未核验到」≠「未备案」。
  filing_note_en: no matching generative-AI service filing found (searched 2026-10-22); entity affiliation not
    verified — "not found" ≠ "not filed".
  verified: 2026-10-22
---

## 一句话定位

**Genspark 是「搜索→报告→幻灯片」一条龙的研究 agent**：Sparkpage 重组检索结果、
Slides/Sheets/网站直接出产物；agent 形态意味着过程黑箱度要心里有数。

## 适合与不适合

适合：研究交付一条龙（报告/幻灯片/表格）、要现成产物的用户。
不适合：过程要可审计、企业合规优先、直连敏感场景。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **同一研究问题 vs Manus/ChatGPT Deep Research 的产物质量三角对比**
- **Sparkpage 的来源保留度**（重组后还能不能追到原文）
- **积分消耗与任务复杂度的关系**（D9：价格不采；消耗行为实测）

## 未知项清单

- 注册主体与团队构成（未核验到官方声明）
- agent 内调用的模型清单（未逐条清点）
- 训练用途开关（未逐条核验）
- 备案状态（见 cn 块——主体未清）

## 相关条目

- [Manus](../chat/products/manus.md) — 同属任务 agent：Manus 通用任务云沙箱，Genspark 研究内容产物向。
- [Perplexity](./perplexity.md) — 同为搜索向：Perplexity 答案引擎，Genspark 产物工厂。
- [天工](./tiangong.md) — 同为国产背景超级智能体：天工文档/PPT/表格模式一条龙，Genspark Sparkpage 线。
