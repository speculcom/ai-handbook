---
id: tensor-art
form: web
name: Tensor.Art
vendor: ECHO INTERNATIONAL HK LIMITED（Tensor.Art）
homepage: https://tensor.art
license: 免费+VIP 订阅（1/30/90 天档）。按官方条款页管辖（terms-of-service-new 经 WebFetch 当日核验 2026-10-31）；
  条款 3.1 明言平台对模型与生成图不做所有权/版权主张、创作内容用户可自由使用；转载模型须原作者书面同意（3.7）。
licenseEn: Free + VIP subscription (1/30/90-day passes). Governed by the official terms page (terms-of-service-new,
  WebFetch-verified 2026-10-31); clause 3.1 states the platform makes no ownership/copyright claims over models or
  generated images and created content may be freely used by the user; reposting a model requires the original
  author's written consent (3.7).

axes:
  model_access: >-
    社区模型托管与在线跑是本体：checkpoint/LoRA/ControlNet/Textual Inversion 上传、分享与在线生成
    （Civitai 式社区模型生态，条款 1.2「image generation and posting service」在册）；
    基础模型（SD1.5 一类）供直接生成；在线 LoRA 训练（隐私页 Model Training features 在册）；自研模型线未核验到官方声明。
  runtime: >-
    网页（tensor.art）+ 官方软件应用（条款多处提及 Tensor.Art software application，可下载）；
    生成在厂商云端按 credit 跑；平台不提供本地运行时——下载的应用是客户端不是本地推理引擎（细节未逐条核验）。
  local_files: >-
    作品与模型存账户侧云端；条款提及可下载的软件应用（本机安装面在册），但其本机数据面未核验；
    社区模型的下载面当日未核验到（全站 Cloudflare 反爬，curl 通道 403，仅部分官方页经 WebFetch 命中）。
  background: >-
    credit 制即时生成：VIP 会员每日 300 credit、当日刷新不结转（会员条款在册）；
    无常驻任务面（未核验到声明）；LoRA 训练提交后在云端跑（Model Training 功能在册，排队/时长细节未核验）。
  tools: >-
    在线 LoRA 训练（隐私页 Model Training features）、模型上传与社区分享（条款 3.7 转载须原作者书面同意）、
    社区画廊与发布（posting service）；news 页最新条目「Free Video Trial with Wan2.2」显示视频生成面试验（2026-10-31）；
    API 面未核验到官方口径（第三方评测称无 API，不作依据）。
  context: >-
    以模型页/作品页组织；跨会话记忆未核验到官方声明。社区模型库（风格模型可复用）是它的一致性机制，不是记忆。
  permissions: >-
    免费+VIP 订阅（1/30/90 天档、每日 300 credit；D9：价格不采）；条款 3.1 平台对模型与生成图不做所有权主张、
    内容可自由使用；3.7 转载模型须原作者书面同意；3.6 不鼓励 NSFW 内容（社区治理口径）；账号须 18+（2.2）。
  fit: >-
    适合：免费 credit 生图+社区模型寻宝（SD 生态）、在线 LoRA 训练、模型分享社区。
    不适合：要官方自研前沿模型（它是托管+基础模型平台）、企业合规叙事优先（条款面薄、无 DPA 面）、对社区内容治理敏感的场景。

pitfalls:
  - **全站 Cloudflare 反爬**（curl 直连 000/代理 403）——公共核验面极薄：条款/会员条款/隐私/news 四页经 WebFetch 当日命中，其余面（下载面、API）未核验到，档案按 partial 如实记
  - 主体是隐私页在册的 **ECHO INTERNATIONAL HK LIMITED（香港）**，联系邮箱挂 echo.tech 域——与大陆 echo.tech 的关系未核验，备案口径不能按大陆服务混断
  - 条款 3.1「平台不做所有权主张」≠「你拥有版权」——AI 生成图的可版权性取决于法域（与各生成产品同口径）

tags: [免费+订阅, 社区模型库, LoRA训练, SD生态, credit制]
related: [seaart, flux, huggingchat]

sources:
  - label: Tensor.Art · Terms of Service（官方条款，2026-10-31 经 WebFetch 核验；curl 通道被 CF 拦）
    url: https://tensor.art/about/terms-of-service-new
    kind: official
  - label: Tensor.Art · VIP 会员条款（档位与 credit 规则，2026-10-31 经 WebFetch 核验）
    url: https://tensor.art/about/terms-of-vip-membership
    kind: official
  - label: Tensor.Art · Privacy Policy（ECHO INTERNATIONAL HK LIMITED 在册，2026-10-31 经 WebFetch 核验）
    url: https://tensor.art/about/privacy-policy
    kind: official
  - label: Tensor.Art · News（更新线：最新条目「Free Video Trial with Wan2.2」，2026-10-31 经 WebFetch 核验）
    url: https://tensor.art/about/news
    kind: changelog

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 隐私页在册主体 ECHO INTERNATIONAL HK LIMITED（香港铜锣湾希慎道 33 号利园一期 19 楼）；
    联系邮箱 Tensor.Art@echo.tech——与大陆 echo.tech 的关系未核验，按在册主体记。
  origin_note_en: The privacy policy lists ECHO INTERNATIONAL HK LIMITED (19/F Lee Garden One, Causeway Bay, Hong Kong)
    as the contact entity; the contact email sits on the echo.tech domain — the relationship to mainland echo.tech
    is unverified, recorded per the listed entity.
  direct: no
  direct_note: tensor.art 大陆直连实测 000（2026-10-31 两次）；代理下 curl 403（Cloudflare 反爬）——
    官方条款/隐私页经 WebFetch 命中，浏览器直连可达性未核验。
  direct_note_en: tensor.art measured 000 direct from mainland (2026-10-31, two retests); via proxy curl returns
    403 (Cloudflare anti-bot) — official terms/privacy pages were reached via WebFetch; browser reachability unverified.
  filing: unknown
  filing_note: 未检索到 Tensor.Art 对应的网信办深度合成/生成式 AI 备案条目（2026-10-31）；
    主体为香港公司，是否适用大陆备案口径不明——未核验到≠未备案，如实 unknown。
  filing_note_en: no Tensor.Art entry found in the CAC deep-synthesis / generative-AI registries (searched 2026-10-31);
    the entity is Hong Kong-based and whether mainland filing applies is unclear — "not found" ≠ "not filed", recorded as unknown.
  verified: 2026-10-31
---

## 一句话定位

**Tensor.Art 是 SD 生态的社区模型托管+在线生成台**：checkpoint/LoRA 上传分享与在线跑、在线 LoRA 训练、
免费 credit+VIP 订阅；主体是隐私页在册的香港公司（ECHO INTERNATIONAL HK LIMITED）。

## 适合与不适合

适合：免费 credit 生图、社区模型寻宝、在线 LoRA 训练、SD 生态分享社区。
不适合：要官方自研前沿模型、企业合规叙事优先、对社区内容治理敏感。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向反爬面下核验不到的东西）：

- **在线 LoRA 训练产物的归属与下载面**（训练出的模型能否下载、许可怎么标）
- **社区模型「在线跑」与「下载后本地跑」的许可一致性**
- **credit 制在高峰期的实际生成体验**

## 未知项清单

- 自研模型线（未核验到官方声明）
- news 页历史条目与日期（当日仅命中最新条目「Free Video Trial with Wan2.2」，列表未展开）
- 社区模型下载面与下载后许可标注规则（当日未核验到）
- API 面（第三方评测称无 API，未核验到官方口径）
- 与大陆 echo.tech 的实体关系（未核验）
- 大陆备案适用性（香港主体，未核验到条目）

## 相关条目

- [SeaArt](./seaart.md) — 同为社区模型库+LoRA 训练双面板：SeaArt 是聚合+出海叙事，Tensor.Art 是社区托管本体。
- [FLUX](./flux.md) — 社区库新风格模型大量基于 FLUX/SD 底座：Flux 档案看权重许可本身。
- [HuggingChat](../chat/products/huggingchat.md) — 跨大类对照：同为社区模型托管生态，一边是 HF Hub 侧对话前端，一边是生图社区本体。
