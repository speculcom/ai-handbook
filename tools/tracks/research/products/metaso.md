---
id: metaso
form: web
name: 秘塔 AI 搜索
nameEn: Metaso AI Search
vendor: 秘塔科技（上海秘塔网络科技）
homepage: https://metaso.cn
license: 免费+会员/积分体系（购买页登录后展示，D9：价格不采）。按官网页脚与站内协议管辖
  （官网直抓核验 2026-10-22；协议专页 URL 未能定位直抓——如实标注）。
licenseEn: Free + membership/credits (purchase page shown after login; D9: no pricing relayed). Governed by
  the site footer and in-site agreement (homepage direct-fetched 2026-10-22; the dedicated agreement URL
  could not be located by direct fetch — honestly noted).

axes:
  model_access: >-
    自研 MetaLLM 大语言模型（官网 about-us 明确自研叙事）——AI 搜索产品里少见的自研路线；
    各功能调用的模型版本官网未逐项披露（不推测）。
  runtime: >-
    网页（metaso.cn）+ App/小程序（官网所见）；检索与生成在厂商云端；国内直连可用。
  local_files: >-
    历史/书架存账户侧云端；导出（word/PDF）归本地。未见官方声明的其他本机数据面。
  background: >-
    三档强度（简洁/深入/深度研究，官网产品面）；深度研究是多线追搜任务线；无「关机续跑」概念。
  tools: >-
    六路检索（全网/文库/学术/图片/视频/播客，官网产品面）、答案分节+来源角标、
    大纲/脑图生成、学术档细分（中文库/英文库/PubMed/分区筛选，官网所见）、
    幻灯片/互动网页生成、事实核验入口、API 开放。
  context: >-
    以历史/书架组织检索记录；跨会话记忆未核验到官方声明（未逐条核验）。
  permissions: >-
    账号+会员/积分体系（D9：价格不采）；训练用途开关未逐条核验。
    备案：MetaLLM 备案号 Shanghai-MetaLLM-20231106（网信办 2024-04 备案汇总附件直抓核验，
    2026-10-22）；算法备案「MetaLLM大语言模型文本生成算法」覆盖秘塔AI搜索多端
    （网信办 2023-08 算法清单直抓）——两套编号别混引。
  fit: >-
    适合：中文资料深度检索（无广告直达结果）、学术中文库检索、要大纲/脑图结构化输出、国内直连。
    不适合：英文向全球检索主打、把 AI 答案当无源结论（角标要核原文）。

pitfalls:
  - 「没有广告，直达结果」是产品口号——「直达的结果」仍是 AI 综合，来源角标要点开核原文
  - 自研 MetaLLM 意味着能力曲线跟秘塔自己走——与调 GPT/Claude 系的产品对比时别假设同源能力
  - 会员/积分购买页要登录才展示——本站不采价格数字（D9），额度面以登录后页面为准

tags: [免费+会员, 中文AI搜索, 自研MetaLLM, 学术检索, 国产直连]
related: [perplexity, notebooklm, devv, kimi-chat]

sources:
  - label: 秘塔 AI 搜索 · 官网（产品与能力叙事、备案号页脚、MiniMax H3 接入公告横幅）
    url: https://metaso.cn
    kind: official
  - label: 秘塔 AI 搜索 · 官网首页（产品更新公告横幅入口，changelog——首页直抓所见 H3 接入横幅）
    url: https://metaso.cn
    kind: changelog
  - label: 网信办 · 生成式人工智能服务已备案信息（2024-04 公告，附件汇总表直抓核验——MetaLLM 条目 Shanghai-MetaLLM-20231106 所见，2026-10-22）
    url: https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm
    kind: docs
  - label: 网信办 · 境内深度合成服务算法备案清单（2023-08 批次，MetaLLM 算法条目直抓）
    url: https://www.cac.gov.cn/cms/pub/interact/downloadfile.jsp?fText=%E5%A2%83%E5%86%85%E6%B7%B1%E5%BA%A6%E5%90%88%E6%88%90%E6%9C%8D%E5%8A%A1%E7%AE%97%E6%B3%95%E5%A4%87%E6%A1%88%E6%B8%85%E5%8D%95%EF%BC%882023%E5%B9%B48%E6%9C%88%EF%BC%89&filepath=NUtqEIwGiCjGm2Bhl20cvMl3O6cRrdmvwKACW6Gg5zgI1MtuxXVthi1ipH4LQnB4nVO~ptGxSrYZoGdFmo~iOjZS2%2FBjnic3oqu3HpPj8kk%3D
    kind: docs
  - label: 秘塔 · 关于页（自研 MetaLLM 叙事）
    url: https://metaso.cn/about-us
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 上海秘塔网络科技有限公司（中国，2018 年成立，官网 about-us 叙事）。
  origin_note_en: Shanghai Metaso Network Technology Co., Ltd. (China, founded 2018 per the official about-us page).
  direct: yes
  direct_note: metaso.cn 大陆直连实测 200（2026-10-22）。
  direct_note_en: metaso.cn measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_no: Shanghai-MetaLLM-20231106
  filing_note: MetaLLM 生成式 AI 服务备案号（网信办 2024-04 公告附件汇总表直抓核验，2026-10-22，
    主体上海秘塔网络科技有限公司）；算法备案（2023-08 批次清单直抓）覆盖秘塔AI搜索多端——两套编号别混引。
  filing_note_en: MetaLLM generative-AI service filing number (CAC April-2024 announcement attachment,
    direct-fetched and verified 2026-10-22, filer Shanghai Metaso Network Technology Co., Ltd.); the
    algorithm filing (August 2023 batch) covers Metaso AI Search across surfaces — two numbering systems, don't cross-quote.
  verified: 2026-10-22
---

## 一句话定位

**秘塔 AI 搜索是「没有广告，直达结果」的中文 AI 搜索**：自研 MetaLLM（少见的自研路线）、
六路检索、学术中文库细分、大纲/脑图结构化输出；国内直连可用。

## 适合与不适合

适合：中文深度检索、学术中文库、结构化输出（大纲/脑图/幻灯片）、国内直连。
不适合：英文全球检索主打、不核原文就引用。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **深度研究档的多线追搜与 Perplexity Deep Research 的质量对比**
- **学术档 PubMed/分区筛选的召回完整度**
- **事实核验入口的判定逻辑透明度**

## 未知项清单

- 各功能调用的 MetaLLM 版本（官网未逐项披露——不推测）
- 会员/积分额度边界（购买页登录后才展示，D9）
- 训练用途开关（未逐条核验）

## 相关条目

- [Perplexity](./perplexity.md) — 英文向对照：Perplexity 需网络环境，秘塔国内直连+中文库深。
- [NotebookLM](./notebooklm.md) — 互补形态：秘塔帮你找源，NotebookLM 在你给的源里深挖。
- [Devv](./devv.md) — 同为国产 AI 搜索：Devv 开发者向（代码文档），秘塔通用+学术向。
