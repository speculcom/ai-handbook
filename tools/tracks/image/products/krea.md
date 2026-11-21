---
id: krea
form: web
name: Krea
nameEn: Krea
vendor: Krea
homepage: https://www.krea.ai
license: 免费+订阅。按官方 Terms（2024-05-20 版，2026-11-21 取到正文）与 Privacy 管辖；
  商用权按档位区分，训练条款以隐私页原文为准。
licenseEn: Free + subscription. Governed by the official privacy/terms pages (krea.ai/privacy, direct-fetched
  2026-10-22); commercial rights vary by plan, training clauses not verified line by line.

axes:
  model_access: >-
    多模型聚合 + 自研混合：官网列 64+ 模型（Veo/Ideogram/Runway/Luma/Flux/Gemini 等）；
    自研 Krea 2 线；实时生成线。模型清单随订阅与上线变化，以站内清单为准。
  runtime: >-
    网页 krea.ai；生成在 Krea 云端，实时画布在浏览器内交互；没有官方离线客户端或本地权重下载；
    低延迟是卖点，具体 SLA 与并发未在公开页列出。
  local_files: >-
    作品与项目存账户云端，下载导出归本地；LoRA 训练产物能否导出到本地，公开页未单列；
    产品面没有本机推理或离线生成入口。
  background: >-
    实时生成是卖点（边输入/边画边出图）；批量或长任务在云端排队，
    产品面没有暂停、续跑或任务位置控制，关机不改变云端作业。
  tools: >-
    实时画布、LoRA 微调、放大线、视频模型聚合（Veo/Runway 等）；
    API 面存在但公开文档有限，MCP 不在已列产品面。
  context: >-
    项目/画板组织；产品面没有跨会话记忆入口。
    实时画布的「当前画面」是会话内状态，不是持久记忆。
  permissions: >-
    账号+订阅体系；Terms（2024-05-20 版）对 User Submissions 授予 Krea 广泛许可，商用权按档位。
    营销称「Do not train」，约束以隐私页原文为准。
  fit: >-
    适合：实时交互创作（边画边看）、一个平台切换多家模型、LoRA 训练免本地环境。
    不适合：要开放权重、要离线、要单模型深度参数控制。

pitfalls:
  - Krea 是「聚合+自研」混合——「这个功能背后是谁的模型」要按官网模型清单逐项看，别按单一模型理解全站
  - 实时线与前沿线是不同模型——实时档的速度换质量，别把两者质量预期混在一起
  - 「Do not train」是营销文案——训练与数据用途最终以隐私页原文条款为准

tags: [免费+订阅, 实时生成, 模型聚合, LoRA训练, 自研线]
related: [ideogram, flux, veo]

sources:
  - label: Krea · 官网（产品与能力叙事、模型清单）
    url: https://www.krea.ai
    kind: official
  - label: Krea · Changelog（产品更新线）
    url: https://www.krea.ai/changelog
    kind: changelog
  - label: Krea · Privacy（官方隐私页，2026-10-22 直抓核验）
    url: https://www.krea.ai/privacy
    kind: official
  - label: Krea · Terms of Use（2024-05-20 版，主体 KREA.AI, INC.；2026-11-21 取到正文）
    url: https://www.krea.ai/terms
    kind: official

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Krea（伦敦）。
  origin_note_en: Krea (London).
  direct: no
  direct_note: krea.ai 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: krea.ai measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**Krea 是「实时生成 + 多模型聚合」的创作台**：边画边出的实时线是招牌，官网聚合 64+ 家模型
（Veo/Ideogram/Flux 等）+ 自研 Krea 2 线；「Do not train」是官方营销口径。

## 适合与不适合

适合：实时交互创作、一平台切换多模型、云端 LoRA 训练。
不适合：开放权重离线、单模型深度调参、把聚合当「全都最强」。

## 实测记录

本档未跑生成质量与速度测试；结论只覆盖能力面与许可面。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **实时线与前沿线的质量-延迟实际曲线**（同一提示词对比）
- **聚合模型的输出是否被 Krea 后处理**（放大/滤镜链）
- **LoRA 训练产物的导出与复用面**

## 未知项清单

- 放大上限（官网文案提及 22K，具体以官网当前模型清单为准）
- 训练条款原文与「Do not train」的条款级对应（以隐私页原文为准）
- API 的模型覆盖与配额（以官方 API 文档为准）
- 跨会话记忆机制（官方未列）

## 相关条目

- [Ideogram](./ideogram.md) — 聚合面里就有它：Krea 提供 Ideogram 生成入口，Ideogram 自营台功能面更全。
- [FLUX](./flux.md) — 聚合面里就有它：Krea 云端跑 Flux，Flux 权重可下载本地跑。
- [Veo](../video/products/veo.md) — 同为聚合关系：Krea 的视频线聚合了 Veo，Veo 档案看模型本体的能力边界。
