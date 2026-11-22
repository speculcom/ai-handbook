---
id: clipdrop
form: web
name: Clipdrop
nameEn: Clipdrop
vendor: Jasper（原 InitML，2023 并入 Stability AI，2024-02 售予 Jasper）
homepage: https://clipdrop.co
license: 免费（各工具有每日次数上限）+订阅+API。按官方条款页与 Jasper 法律页管辖（clipdrop.co/terms，2026-10-22 取得；Jasper privacy 2026-11-21）；输出归属与训练口径按条款（2026-11-21）。
licenseEn: Free (per-tool daily caps) + subscription. Governed by the official terms page (clipdrop.co/terms,
  direct-fetched 2026-10-22); output ownership and training details not verified line by line.

axes:
  model_access: >-
    工具集形态：官方 API 文档逐个列 Uncrop、Remove Background、Image Upscaling（最高 x16）、Cleanup、Remove Text、Text to Image、Replace Background（beta）。

    文生图与背景替换基于 Stable Diffusion 实现。其余为各工具专用模型。用户选工具，不选裸模型（2026-11-21）。
  runtime: >-
    **依据：** 网页 clipdrop.co + API（`https://clipdrop-api.co/...`）；处理在厂商云端。API 以 multipart/form-data 上传单图，直接返回处理后的图片二进制（2026-11-21）。
  local_files: >-
    上传走 multipart。结果以 PNG/JPG 二进制回传，落盘由调用方完成。官方 API 文档按单次请求-响应组织，不提供项目或历史接口。

    网页端作品与历史以账户界面为准（2026-11-21）。
  background: >-
    单图原子操作、同步返回。一次请求处理一张图，批量与并发由调用方编排（官方 API 文档给单图端点与文件大小/分辨率约束）。没有托管队列或关机续跑任务面（2026-11-21）。
  tools: >-
    Remove Background、Cleanup、Replace Background、Uncrop、Image Upscaler（最高 x16）、Relight（重打光，网页端特色）、Text Remover、Universal Resizer、Text to Image。

    API 覆盖其中七条端点线（2026-11-21）。
  context: >-
    无项目/记忆概念。单图进、单图出的工具流。上下文完全由调用方（人或 API 集成方）维护。输出不带跨请求状态（2026-11-21）。
  permissions: >-
    免费档各工具有每日次数上限，付费档提升额度。API 用 API Key 鉴权。归属按 Jasper/Clipdrop 条款。客户内容不被主张所有权，上传素材须自有或已获授权（含肖像与商标）。

    训练口径按条款与 Jasper 隐私政策（2026-11-21）。
  fit: >-
    适合：电商产品图批量处理、抠图/去物/重打光/放大等原子操作、API 集成进自有产品。不适合：创作向生成（文生图只是配角）、风格一致性、项目化管理（2026-11-21）。
pitfalls:
  - 归属三跳：InitML（2020 创立）→ Stability AI（2023-02 收购）→ Jasper（2024-02 售出）——
    「Stability 旗下」是旧认知，API 条款现在走 Jasper 口径（官网 FAQ 自述）
  - 「Relight 重打光」是它区别于同类工具集的招牌——按普通抠图工具理解会低估
  - 免费档按工具分别限次（每日）——不是全站共享一个额度

tags: [免费+订阅, 图像编辑工具集, Relight, API向, 归属变更]
related: [stability-ai, adobe-firefly, recraft, zapier]

sources:
  - label: Clipdrop · 官网（工具面与 FAQ，含归属史自述，2026-11-21 抓取 200）
    url: https://clipdrop.co
    kind: official
  - label: Clipdrop · Terms（官方条款，2026-10-22 直抓核验）
    url: https://clipdrop.co/terms
    kind: official
  - label: Jasper · Blog（现归属方动态线，changelog，2026-11-21 抓取 200）
    url: https://www.jasper.ai/blog
    kind: changelog
  - label: Clipdrop · API 文档总览（七条端点线与 Stable Diffusion 实现，2026-11-21 抓取 200）
    url: https://clipdrop.co/apis
    kind: docs
  - label: Clipdrop · Remove Background API（multipart 上传与二进制返回，2026-11-21 抓取 200）
    url: https://clipdrop.co/apis/docs/remove-background
    kind: docs
  - label: Jasper · Privacy Policy（客户内容与数据处理口径，2026-11-21 抓取 200）
    url: https://www.jasper.ai/legal/privacy
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Clipdrop 是「单图原子操作」的图像编辑工具集**：抠图/去物/重打光（招牌 Relight）/放大/扩图各成一工具；
归属三跳（InitML→Stability→Jasper），API 现在走 Jasper 口径。

## 适合与不适合

适合：电商产品图批量处理、抠图/重打光等原子操作、API 集成。
不适合：创作向生成、风格一致性、项目管理流。

## 实测记录

本档核对官方 API 文档、工具页与 Jasper 法律页。
Relight 效果边界、免费档超限行为与 API 迁移后的兼容性需按账号实测。
## 未知项清单

- 各工具背后的具体模型档位：按各 API 文档的端点参数与模型说明核对。
- 训练用途开关：按 Jasper 隐私政策与 Clipdrop 条款核对。
- 账户侧处理历史：以网页端账户界面为准。
- Jasper 对 Clipdrop 产品线的长期投入：按官方产品公告核对。
## 相关条目

- [Stability AI](./stability-ai.md) — 前归属方：Clipdrop 曾在 Stability 旗下，现 API 走 Jasper——Stability 档案看其开源模型主线。
- [Adobe Firefly](./adobe-firefly.md) — 同为编辑向：Firefly 嵌专业设计套件，Clipdrop 是独立原子工具集。
- [Recraft](./recraft.md) — 编辑面有重叠（inpainting/背景替换）：Recraft 是创作台内含编辑，Clipdrop 是纯工具集。
- [Zapier](../../automation/products/zapier.md) — API 下游：Clipdrop 各工具 API 常经 Zapier 类自动化平台接进批量流程，自动化侧才是规模化的地方。
