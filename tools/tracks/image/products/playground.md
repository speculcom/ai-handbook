---
id: playground
form: web
name: Playground
vendor: AI Playground, Inc.
homepage: https://playground.com
license: 免费+订阅。按官方条款页管辖（playgroundai.com/terms 当日直抓核验 2026-10-31）；
  用户保留 Inputs/Outputs 权利但以法律允许为限、平台明示不保证输出可版权化且输出不保证唯一；
  用户授予平台免补偿宽泛许可、公开资产默认可被他人 remix（条款在册）。
licenseEn: Free + subscription. Governed by the official terms page (playgroundai.com/terms, direct-fetched 2026-10-31);
  users retain rights to Inputs/Outputs to the extent permitted by law, the platform expressly disclaims
  copyrightability and uniqueness of outputs; users grant a broad royalty-free license and public assets are
  viewable/remixable by default (per terms).

axes:
  model_access: >-
    第三方模型聚合是现状：首页点名 GPT Image 2、Nano Banana Pro、Nano Banana、Seedream（当日直抓在册）；
    自研模型线（Playground v2/v2.5/v3）已停更——2025-01 官方砍掉 legacy 产品线（第三方评测口径），
    现售的主要是别家模型的存取权（credits 按模型消耗）。
  runtime: >-
    网页（playground.com→playgroundai.com）+ iOS App（App Store 链接在册，4.9/5·5,400+ 评分）；
    生成与设计编辑在厂商云端；无本地运行时面。
  local_files: >-
    设计稿与素材存账户侧云端；印刷周边（T 恤/贴纸等）走平台下单面；
    未见官方声明的本机数据面或导出后本地编辑线（细节未逐条核验）。
  background: >-
    即时生成+编辑器（Smart Layers 非破坏性编辑、Extract Text 转可编辑图层，首页在册）；
    无常驻任务/关机续跑面（未核验到声明）；模板 24 类（首页在册）。
  tools: >-
    设计工作台是本体：模板定制、Smart Layers、换风格/移除物体/加 mockup 工具（首页在册）、周边印刷商店；
    不是纯生图器——官方定位「The AI design studio for everyone」（首页在册），对标 Canva 一类设计台。
  context: >-
    以项目/设计稿组织；跨会话记忆未核验到官方声明。模板与图层体系是它的一致性机制，不是记忆。
  permissions: >-
    免费+订阅（D9：价格不采）；条款明示输出不保证可版权、不保证唯一、商用需自行清权；
    公开资产默认他人可 remix、许可协议终止后仍存续（条款在册）；DMCA 代理为第三方 JACO Product Development, LLC（条款在册）。
  fit: >-
    适合：贴纸/T 恤/海报/logo 一类成品设计流、模板+图层编辑工作流、一个界面用多家生图模型。
    不适合：要自研模型线（已转向第三方聚合）、要输出版权确定性（条款明确不保证）、企业合规叙事优先。

pitfalls:
  - **产品史三段要分清**：自研模型时代（2022–2024，v2/v2.5/v3）→砍线转向（2025-01 legacy 下线退款）→售出后新团队运营（2026-06 创始人确认售出、官方博客确认新团队）——「Playground 收摊了」与「Playground 没变」都不对，现役是设计台+第三方模型聚合
  - 条款主体 **AI Playground, Inc.**（Dover, Delaware 通知地址、加州法域）≠ 同名商标纠纷方 Playground AI LLC（另一家公司，2023 年起诉讼史）——引用主体按条款页在册名
  - 公开资产**默认**可被他人查看与 remix（条款在册）——商用向用户要主动检查可见性设置

tags: [免费+订阅, 设计工作台, 模型聚合, 模板+图层, 周边印刷]
related: [microsoft-designer, chatgpt]

sources:
  - label: Playground · 官网（定位语/模型清单/工具面，2026-10-31 经 WebFetch 核验）
    url: https://playgroundai.com
    kind: official
  - label: Playground · Terms（AI Playground, Inc. 在册，2026-10-31 经 WebFetch 核验）
    url: https://playgroundai.com/terms
    kind: official
  - label: Playground · Privacy（2026-10-31 curl 代理核验 200）
    url: https://playgroundai.com/privacy
    kind: official
  - label: Playground · 官方博客「Playground's Next Chapter」（新团队确认收购，2026-10-31 经 WebFetch 核验）
    url: https://playgroundai.com/blog/playgrounds-next-chapter
    kind: changelog

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: AI Playground, Inc.（条款页在册：Dover, Delaware 通知地址、加州法域）；创始人 Suhail Doshi（前 Mixpanel CEO，Mighty Computing 之后创办本产品）。
  origin_note_en: AI Playground, Inc. (per terms: Dover, Delaware notice address; California law); founder Suhail Doshi
    (ex-Mixpanel CEO, started after Mighty Computing).
  direct: no
  direct_note: playground.com 大陆直连实测 403（2026-10-31 两次）；代理下 301→playgroundai.com 200——直连不可达，需网络环境。
  direct_note_en: playground.com measured 403 direct from mainland (2026-10-31, two retests); via proxy 301→playgroundai.com 200 — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**Playground 是「设计成品」向的 AI 设计台**：模板+Smart Layers 图层编辑把点子变成贴纸/T 恤/海报/logo，
生图用第三方模型（GPT Image 2/Nano Banana/Seedream）；自研模型时代已结束，公司 2026-06 售出后由新团队运营。

## 适合与不适合

适合：成品设计流（周边/海报/logo）、模板+非破坏性图层编辑、一界面多家模型对比。
不适合：要自研模型线、要输出版权确定性、企业合规叙事优先。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向转型后官方页没给的东西）：

- **credits 在不同模型（GPT Image 2 vs Nano Banana vs Seedream）间的实际消耗差**
- **Smart Layers 导出物的可编辑性**（导出 PSD/SVG 还是仅位图）
- **公开资产可见性设置的实际默认态**（条款说默认公开可 remix）

## 未知项清单

- 收购方身份（创始人 2026-06 确认售出但未公开买家，第三方资料口径）
- 自研模型权重去向（v2/v2.5 曾按社区许可开放，现状未核验）
- 官方博客「Next Chapter」发布日期（当日未核验到具体日期）
- 跨会话记忆机制（未核验到官方声明）
- 旧免费档与新免费档的额度差异（第三方评测称 2025-01 旧付费档自动退款，未核验官方原文）

## 相关条目

- [Microsoft Designer](./microsoft-designer.md) — 同是大厂/聚合向「模板+生成」设计台：Designer 绑微软生态，Playground 绑第三方模型+印刷周边。
- [ChatGPT](../chat/products/chatgpt.md) — 跨大类对照：Playground 首页招牌模型 GPT Image 2 的母产品线。
