---
id: genmo
form: web
name: Genmo
nameEn: Genmo
vendor: Genmo
homepage: https://www.genmo.ai
license: 产品免费+订阅（pricing 页 2026-10-30 直抓在册）；开放权重线 Mochi 仓为 Apache-2.0
  （genmoai/mochi LICENSE 当日经 GitHub API 核验）。产品输出的许可按条款页管辖，细节未逐条核验。
licenseEn: Product free + subscription (pricing page direct-fetched 2026-10-30); the open-weights line
  (genmoai/mochi) is Apache-2.0 (LICENSE verified via GitHub API the same day). Licensing of product
  output is governed by the terms page, details not verified line by line.

axes:
  model_access: >-
    自研模型线 + 开放权重：Mochi 1 开源文生视频模型（GitHub genmoai/mochi，Apache-2.0，
    ★3,757、推送 2026-10-22，当日 GitHub API 核验）；产品内模型选择面在登录墙后，未逐条核验。
  runtime: >-
    网页（genmo.ai，/playground 200）；产品生成在厂商云端。开放权重+训练/推理代码可本地自跑
    （仓内提供）——自跑是仓级事实，产品本身不提供离线客户端。
  local_files: >-
    产品作品存账户侧云端；开放权重与代码归本地（Apache-2.0）。未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）。
  tools: >-
    文生视频（Mochi 1 线）；首页主打「Open world models」叙事（当日直抓在册）；
    产品端编辑/交互面细节未逐条核验（/docs /api 均 307 进登录墙）。
  context: >-
    以账户作品组织；跨会话记忆未核验到官方声明。开放权重可复用是资产复用，不是产品记忆。
  permissions: >-
    账号+订阅体系（/pricing 200，D9：价格不采）；训练用途开关未逐条核验；
    开放权重仓的训练/商用自由度按 Apache-2.0 本身。
  fit: >-
    适合：要开放权重自跑的创作者与研究者（Apache-2.0 是同类里少见的宽松档）、
    世界模型叙事跟踪、创意实验。
    不适合：大陆合规场景（未备案、未面向大陆）、企业级 SLA 主打（未核验到声明）。

pitfalls:
  - 「Open world models」是定位叙事——Mochi 1 当前是文生视频模型，别把「世界模型」当成可交互环境理解
  - 开放权重线（Mochi 仓 Apache-2.0）与产品（playground）是两个面——仓宽松不等于产品输出宽松
  - /docs /api /changelog 全部 307 跳登录墙——公开文档面有限，blog 是公开更新线

tags: [免费+订阅, 开源权重, 自研模型, 直连可用, 世界模型]
related: [runway, luma, flux]

sources:
  - label: Genmo · 官网（「Open world models」定位，2026-10-30 直抓在册）
    url: https://www.genmo.ai
    kind: official
  - label: Genmo · Terms of Service（主体 Genmo, Inc. 在册，2026-10-30 直抓核验）
    url: https://www.genmo.ai/terms-of-service
    kind: official
  - label: Genmo · Blog（官方更新线，changelog；Mochi 1 SOTA 文在册）
    url: https://www.genmo.ai/blog
    kind: changelog
  - label: Mochi 1 · GitHub 仓（Apache-2.0，★3,757，推送 2026-10-22）
    url: https://github.com/genmoai/mochi
    kind: repo

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Genmo（美国；条款页在册「Genmo, Inc Attn: Legal Department」）。
  origin_note_en: Genmo (US; the terms page carries "Genmo, Inc Attn: Legal Department").
  direct: yes
  direct_note: genmo.ai 大陆直连实测 200（2026-10-30，代理同 200）。
  direct_note_en: genmo.ai measured 200 direct from mainland (2026-10-30; also 200 via proxy).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-30); the product does not serve the
    mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Genmo 把「开放权重」做成招牌**：Mochi 1 以 Apache-2.0 开源（同类海外视频台里少见的宽松档）——
它同时卖云端产品（playground）和可自跑的模型线，两个面要分开看。

## 适合与不适合

适合：开放权重自跑与微调、研究实验、世界模型叙事跟踪。
不适合：把「世界模型」当可交互环境、要产品级文档/API 公开面（登录墙后）、大陆合规场景。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Mochi 1 开放权重在消费级显存上的实际可用性与产物质量**
- **开放权重输出与产品端输出的质量差距**
- **「世界模型」叙事与当前可交互能力的实际边界**

## 未知项清单

- 产品 playground 内的模型清单与差异（登录墙后，未核验）
- API 商业化现状（/api 404，未核验到公开 API 页）
- 训练用途开关（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [Runway](./runway.md) — 同为海外视频台：Runway 闭源专业工具链，Genmo 带开放权重线。
- [Luma](./luma.md) — 同为叙事向海外视频台：Luma 权重不开源，Genmo 的 Mochi 开源可自跑。
- [Flux](../image/products/flux.md) — 同「开放权重+可自跑」生态逻辑的图像侧对照：宽松权重养出本地生态。
