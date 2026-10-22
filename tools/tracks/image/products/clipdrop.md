---
id: clipdrop
form: web
name: Clipdrop
nameEn: Clipdrop
vendor: Jasper（原 InitML，2023 并入 Stability AI，2024-02 售予 Jasper）
homepage: https://clipdrop.co
license: 免费（各工具有每日次数上限）+订阅。按官方条款页管辖
  （clipdrop.co/terms 直抓核验 2026-10-22）；输出归属与训练口径细节未逐条核验。
licenseEn: Free (per-tool daily caps) + subscription. Governed by the official terms page (clipdrop.co/terms,
  direct-fetched 2026-10-22); output ownership and training details not verified line by line.

axes:
  model_access: >-
    工具集形态：每个工具背后是专门能力（背景移除/清理/重打光/放大/扩图等，官网逐项列出）；
    文生图工具用 SD 系模型（官网 FAQ 叙事）。用户选工具不选模型。
  runtime: >-
    网页（clipdrop.co）+ API（官网 FAQ：API 经 Jasper API 提供）；处理在厂商云端。
  local_files: >-
    处理结果下载归本地；未见官方声明的账户侧作品库或本机数据面——上传的图片处理后是否留存，
    条款原文未逐条核验。
  background: >-
    处理即时（单图原子操作，无队列概念）；无「关机续跑」任务面（未核验到声明）；
    API 侧批量走调用方自己的并发，平台不提供托管批处理。
  tools: >-
    官网列的工具面：Remove Background、Cleanup、Replace Background、Uncrop、Image Upscaler、
    Relight（重打光——官网特色工具）、Text Remover、Universal Resizer、Text to image；
    编辑工具集是主功能（收录标准 1 满足，见 inventory）。
  context: >-
    无项目/记忆概念——单张图片进、单张图片出的工具流；上下文完全由调用方（人或 API 集成方）自己管理。
  permissions: >-
    免费档各工具有每日次数上限（官网 FAQ 口径）；付费档提升上限（D9：价格不采）；
    训练用途开关未逐条核验。
  fit: >-
    适合：单图原子操作（抠图/去物/重打光/放大）批量处理、电商产品图工作流、API 集成进自有产品。
    不适合：创作向生成（文生图只是配角）、风格一致性、项目化管理。

pitfalls:
  - 归属三跳：InitML（2020 创立）→ Stability AI（2023-02 收购）→ Jasper（2024-02 售出）——
    「Stability 旗下」是旧认知，API 条款现在走 Jasper 口径（官网 FAQ 自述）
  - 「Relight 重打光」是它区别于同类工具集的招牌——按普通抠图工具理解会低估
  - 免费档按工具分别限次（每日）——不是全站共享一个额度

tags: [免费+订阅, 图像编辑工具集, Relight, API向, 归属变更]
related: [stability-ai, adobe-firefly, recraft, zapier]

sources:
  - label: Clipdrop · 官网（工具面与 FAQ，含归属史自述）
    url: https://clipdrop.co
    kind: official
  - label: Clipdrop · Terms（官方条款，2026-10-22 直抓核验）
    url: https://clipdrop.co/terms
    kind: official
  - label: Jasper · Blog（现归属方动态线，changelog）
    url: https://www.jasper.ai/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: InitML（巴黎）创立，现归 Jasper（美国）。
  origin_note_en: Founded by InitML (Paris); now under Jasper (US).
  direct: no
  direct_note: clipdrop.co 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: clipdrop.co measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Clipdrop 是「单图原子操作」的图像编辑工具集**：抠图/去物/重打光（招牌 Relight）/放大/扩图各成一工具；
归属三跳（InitML→Stability→Jasper），API 现在走 Jasper 口径。

## 适合与不适合

适合：电商产品图批量处理、抠图/重打光等原子操作、API 集成。
不适合：创作向生成、风格一致性、项目管理流。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Relight 对非产品图（人像/场景）的实际效果边界**
- **免费档各工具限次的实际体验**（超限后的行为）
- **API 迁移到 Jasper 后的端点与旧 Clipdrop API 的兼容情况**

## 未知项清单

- 各工具背后的具体模型档位（未核验到官方声明）
- 训练用途开关（未逐条核验）
- 账户侧是否保留处理历史（未核验到官方声明）
- Jasper 对 Clipdrop 产品线的长期投入（未核验到官方声明）

## 相关条目

- [Stability AI](./stability-ai.md) — 前归属方：Clipdrop 曾在 Stability 旗下，现 API 走 Jasper——Stability 档案看其开源模型主线。
- [Adobe Firefly](./adobe-firefly.md) — 同为编辑向：Firefly 嵌专业设计套件，Clipdrop 是独立原子工具集。
- [Recraft](./recraft.md) — 编辑面有重叠（inpainting/背景替换）：Recraft 是创作台内含编辑，Clipdrop 是纯工具集。
- [Zapier](../../automation/products/zapier.md) — API 下游：Clipdrop 各工具 API 常经 Zapier 类自动化平台接进批量流程，自动化侧才是规模化的地方。
