---
id: leonardo-ai
form: web
name: Leonardo AI
nameEn: Leonardo AI
vendor: Leonardo（2024-07 被 Canva 收购）
homepage: https://leonardo.ai
license: 免费+订阅。按官方条款页管辖（leonardo.ai/legal 直抓被 CF 拦截 403，2026-10-22——
  本方法无法核验条款内容，不代表条款不存在）。
licenseEn: Free + subscription. Governed by the official terms page (leonardo.ai/legal returned a CF challenge 403
  on direct fetch, 2026-10-22 — this method cannot verify the terms' content, which does not mean they do not exist).

axes:
  model_access: >-
    自研模型线（Phoenix/Lucid 前沿图像模型，官网叙事）+ model hub 聚合第三方模型（官网导航所见）；
    无开放权重线（未见官方发布）。
  runtime: >-
    网页（leonardo.ai）+ API（官网有 API 入口，细节未逐条核验）；生成在厂商云端。
  local_files: >-
    作品与训练产物（Element）存账户侧云端；未见官方声明的本机数据面或导出面——
    训练产物能否带走，官方页未见明确说法（未核验）。
  background: >-
    生成即时/排队（按账号档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）；
    训练任务提交后在云端跑，可离开页面等完成（官网 FAQ 叙事，细节未逐条核验）。
  tools: >-
    Element 训练（官方命名的小样本微调线，风格/角色一致性）、实时画布、model hub 模型市场、
    游戏资产向工作流（官网叙事：概念图/贴图/资产批量）；Motion 视频线（官网导航所见）。
  context: >-
    以项目组织；跨会话记忆未核验到官方声明。Element 训练是它的「一致性」机制——训练产物可复用不是记忆。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验。
    2024-07 被 Canva 收购（Canva 官方新闻室公告）——收购后数据政策是否随 Canva 统一，未核验。
  fit: >-
    适合：游戏资产/概念图工作流、Element 训练做风格与角色一致性、聚合平台内选模型。
    不适合：要开放权重离线跑、要脱离账号、要单模型深度参数控制。

pitfalls:
  - 「model hub 聚合第三方模型」≠「能在本地跑这些模型」——聚合的是云端生成服务，不是权重下载
  - 归属已变：2024-07 被 Canva 收购——「Leonardo 独立公司」的旧认知过时；收购后条款/数据政策走向未逐条核验
  - leonardo.ai 对 curl 返回 CF 403——本站核验方法下「读不到」≠「站点失效」

tags: [免费+订阅, 游戏资产向, Element训练, 模型聚合, Canva旗下]
related: [flux, midjourney, runway]

sources:
  - label: Leonardo · 官网（产品与能力叙事）
    url: https://leonardo.ai
    kind: official
  - label: Leonardo · News（产品更新线，changelog；直抓 CF 403）
    url: https://leonardo.ai/news
    kind: changelog
  - label: Canva Newsroom · 收购公告（2024-07，官方；直抓 CF 403）
    url: https://www.canva.com/newsroom/news/canva-acquires-leonardo/
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Leonardo（悉尼创立，2024-07 起归 Canva，双方均为澳洲主体叙事）。
  origin_note_en: Leonardo (founded in Sydney; under Canva since July 2024 — both Australian-entity narratives).
  direct: no
  direct_note: leonardo.ai 大陆直连实测 000（2026-10-22，代理下 403=CF 拦截可达）——直连不可达，需网络环境。
  direct_note_en: leonardo.ai measured 000 direct from mainland (2026-10-22; 403 via proxy = CF challenge, reachable)
    — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Leonardo 是游戏资产向的图像创作台**：自研 Phoenix/Lucid 线 + Element 小样本训练做风格一致性 +
model hub 聚合选模型；2024-07 起归 Canva 旗下。

## 适合与不适合

适合：游戏概念图/贴图批量、Element 训练锁风格角色、聚合平台内换模型试。
不适合：开放权重离线、脱离账号、单模型深度调参。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Element 训练的实际样本量与一致性稳定度**（对比本地 LoRA 训练）
- **model hub 里第三方模型的生成质量差异**
- **Canva 收购后账号/作品数据的迁移与政策走向**

## 未知项清单

- 收购后条款与数据政策是否随 Canva 统一（未核验）
- API 的计费与配额面（D9：价格不采；配额行为未逐条核验）
- 训练用途开关路径（未逐条核验）
- Phoenix/Lucid 各档的能力差异（未逐条核验）

## 相关条目

- [FLUX](./flux.md) — 同为聚合入口里的开放权重族：FLUX 权重可下载本地跑，Leonardo 只在云端提供生成。
- [Midjourney](./midjourney.md) — 同为「自研模型+订阅创作台」：MJ 无模型市场，Leonardo 有 model hub。
- [Runway](../video/products/runway.md) — 同为图像台延伸视频线：Leonardo 的 Motion 与 Runway 的专职视频线深度不同。
