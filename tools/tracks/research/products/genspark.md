---
id: genspark
form: web
name: Genspark
nameEn: Genspark
vendor: Genspark
homepage: https://www.genspark.ai
license: 免费额度+订阅。按官方条款页管辖（2026-10-22 取得）。企业版宣称 Zero model training，数据保留按隐私页（2026-11-21）。
licenseEn: Free credits plus subscription. Governed by the official terms page (fetched 2026-10-22); business plans claim zero model training, with retention governed by the privacy page (2026-11-21).

axes:
  model_access: >-
    多模型编排。官方 AI Chat 帮助页列出按厂商分组的模型选择器，也列出 Mixture-of-Agents。Super Agent 在 agent 工作流内调用模型与工具。

    用户不选裸模型（2026-11-21）。
  runtime: >-
    网页（genspark.ai）+ App。官方帮助中心说明 Super Agent 在云端计算机上规划并执行步骤。New 模式每个项目分配一台全新云电脑。

    Classic 模式无云电脑（2026-11-21）。
  local_files: >-
    产物（报告/页面/表格/PPT）存账户侧云端与项目工作区。官方帮助中心说明每个项目有自己的聊天、文件与云电脑，产物可下载归本地。未见官方本机模型面（2026-11-21）。
  background: >-
    任务制：提交任务→云端多步执行→产物进项目库。官方帮助中心说明长任务最长运行 2 小时。关闭标签页后仍继续。Super Agent 不支持定时任务，2026-11-21 核验。
  tools: >-
    搜索+报告 agent 是主轴。Sparkpage 把检索结果重组成结构化页面。AI Slides/Sheets/网站生成与浏览器扩展在册。

    官方帮助中心把报告、幻灯片、表格、网页与图片列为可交付产物，2026-11-21 核验。
  context: >-
    以项目组织：每个项目包含聊天、文件与云电脑，任务上下文在项目内延续。官方帮助中心未列跨项目长期记忆。GenTeam 明确私聊内容不会带入群聊（2026-11-21）。
  permissions: >-
    账号+积分/订阅体系。官方帮助中心说明云端 agent 消耗创建者的积分。个人电脑上的 agent 使用本机模型访问。

    企业版宣称 SOC 2 Type II、ISO 27001、Zero model training。数据保留与删除按隐私页（2026-11-21）。
  fit: >-
    适合：「搜索→报告→幻灯片」一条龙。要现成产物的研究交付。轻量 agent 任务外包。

    不适合：要过程可控可审计（agent 黑箱度）。企业合规优先。大陆直连敏感（直连 403=CF 拦截）（2026-11-21）。
pitfalls:
  - Genspark 与 Manus 同属「任务 agent」阵营。主轴是研究/内容产物，不是代码库（coding 大类对照）
  - Sparkpage 重组的是检索结果——重组质量不改变源质量，差源进差页出
  - genspark.ai 直连 403（CF 拦截，2026-10-22）。可达性按代理口径，不是站点死亡

tags: [免费+积分, 搜索agent, 报告生成, Sparkpage, 任务制]
related: [manus, perplexity, tiangong]

sources:
  - label: Genspark · 官网（产品与能力叙事，2026-11-21 抓取 200）
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

  - label: Genspark Help · Super Agent（云电脑、2 小时长任务与关闭标签续跑，2026-11-21 抓取 200）
    url: https://genspark.space/helpcenter/super-agent
    kind: docs
  - label: Genspark Help · AI Chat（模型选择器、Mixture-of-Agents 与数据保留，2026-11-21 抓取 200）
    url: https://www.genspark.ai/helpcenter/ai-chat
    kind: docs
  - label: Genspark for Business · Pricing（SOC 2/ISO 与 Zero model training，2026-11-21 抓取 200）
    url: https://www.genspark.ai/business/pricing
    kind: official

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Genspark（叙事为海外注册；团队含中国背景成员——注册主体细节未核验到官方声明）。
  origin_note_en: Genspark (overseas-registration narrative; team includes China-background members —
    entity details not verified).
  direct: unknown
  direct_note: genspark.ai 大陆直连实测 403（2026-10-22）。CF 拦截无法判定可达性（代理下 200）。
  direct_note_en: genspark.ai returns 403 direct from the mainland (2026-10-22) — a CF challenge; reachability
    cannot be judged by this method (200 via proxy).
  filing: unknown
  filing_note: 未核验到对应生成式 AI 服务备案（2026-10-22 检索）。主体归属未核验清楚——
    「未核验到」≠「未备案」。
  filing_note_en: no matching generative-AI service filing found (searched 2026-10-22); entity affiliation not
    verified — "not found" ≠ "not filed".
  verified: 2026-11-21
---

## 一句话定位

**Genspark 是「搜索→报告→幻灯片」一条龙的研究 agent**：Sparkpage 会重组检索结果。
Slides/Sheets/网站直接出产物。
agent 形态意味着过程黑箱度要心里有数。

## 适合与不适合

适合：研究交付一条龙（报告/幻灯片/表格）、要现成产物的用户。
不适合：过程要可审计、企业合规优先、直连敏感场景。

## 实测记录

本档核对官网、帮助中心与隐私页的能力边界。
检索质量、产物溯源与积分消耗需按账号实测。
## 未知项清单

- Sparkpage 的来源保留度：官方帮助页未给逐条溯源说明，按产物实测。
- 积分消耗与任务复杂度的关系：官方帮助页给出积分体系，具体消耗按账号页。
- 企业合规认证的适用范围。官方 business 页给出 SOC 2/ISO 声明，审计报告按销售渠道索取。
## 相关条目

- [Manus](../chat/products/manus.md) — 同属任务 agent：Manus 通用任务云沙箱，Genspark 研究内容产物向。
- [Perplexity](./perplexity.md) — 同为搜索向：Perplexity 答案引擎，Genspark 产物工厂。
- [天工](./tiangong.md) — 同为国产背景超级智能体：天工文档/PPT/表格模式一条龙，Genspark Sparkpage 线。
