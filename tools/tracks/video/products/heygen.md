---
id: heygen
form: web
name: HeyGen
nameEn: HeyGen
vendor: HeyGen
homepage: https://www.heygen.com
license: 免费+订阅+企业档。按官方条款页管辖（2026-10-22 取得）；数字人克隆需本人身份验证，官方 FAQ 称用户数据不用于模型训练（2026-11-21）。
licenseEn: Free, subscription and enterprise tiers. Governed by the official terms page (fetched 2026-10-22); avatar cloning requires on-camera identity verification, and the official FAQ says user data is not used for model training (2026-11-21).

axes:
  model_access: >-
    数字人视频生成线。Avatar（数字人）+ Voice（配音/克隆）+ Translation（视频翻译/对口型）三条产品线。底层模型官方页未逐模型披露。

    按产品线能力表与 API 文档核对（2026-11-21）。
  runtime: >-
    网页（heygen.com）+ API（developers.heygen.com）。生成在厂商云端，API 以异步任务返回 video_id。客户端轮询状态或接 webhook。

    本机不跑模型（2026-11-21）。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见。API 返回的下载 URL 有效期 7 天，需在有效期内取回，下载后归本地。官方 FAQ 说明 100% 用户数据不用于模型训练（2026-11-21）。
  background: >-
    生成在云端异步排队。API 提交后返回 video_id。客户端轮询状态或接收 webhook，任务不依赖本机在线。官方未给用户可暂停/续跑的队列面板。

    批量生产按 API 状态机编排（2026-11-21）。
  tools: >-
    数字人形象库+真人克隆（需授权面）、声音克隆、视频翻译+对口型、交互数字人 Streaming API、Template API 与 webhook 事件。

    官方 API 文档把 Avatar、Photo Avatar、Video Translate、Streaming 与 Templates 分列（2026-11-21）。
  context: >-
    以项目/品牌空间组织，数字人资产是跨视频的一致性与上下文机制。官方 FAQ 与产品页未列对话式跨会话记忆。脚本与模板承载上下文（2026-11-21）。
  permissions: >-
    账号+订阅+企业体系。官方产品页写明每个定制数字人必须由本人出镜完成身份验证，未验证不能创建。HeyGen 配合移除请求。官方 FAQ 称严格执行同意、形象使用与内容准则。

    100% 用户数据不用于训练（2026-11-21）。
  fit: >-
    适合：企业培训/营销视频本地化（翻译+对口型）、真人出镜替代（授权克隆）、批量口播视频。

    不适合：创意叙事生成、要「一眼 AI 感」的娱乐向、无授权克隆他人（条款红线）（2026-11-21）。
pitfalls:
  - 克隆真人形象/声音有授权验证流程——「克隆任何人」在条款上走不通，别按演示视频理解产品边界
  - 数字人视频与生成式视频（Runway 类）是两个物种——HeyGen 主功能是「人说话」，不是「造世界」
  - 视频翻译的对口型质量随语言差异大——用前按目标语言实测

tags: [免费+订阅, 数字人, 视频翻译, 对口型, 企业向]
related: [synthesia, d-id, runway, zapier]

sources:
  - label: HeyGen · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://www.heygen.com
    kind: official
  - label: HeyGen · Terms（官方条款，2026-10-22 直抓核验）
    url: https://www.heygen.com/terms
    kind: official
  - label: HeyGen · Blog（官方更新线，changelog，2026-11-21 抓取 200）
    url: https://www.heygen.com/blog
    kind: changelog

  - label: HeyGen · FAQ（身份验证、同意与不用于训练，2026-11-21 抓取 200）
    url: https://www.heygen.com/faq
    kind: docs
  - label: HeyGen · API Documentation（异步任务、Streaming 与 Template，2026-11-21 抓取 200）
    url: https://docs.heygen.com/
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: HeyGen（美国洛杉矶，创始人 Josh Xu 等，公开叙事）。
  origin_note_en: HeyGen (Los Angeles, US; founders Josh Xu et al., public narrative).
  direct: no
  direct_note: heygen.com 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: heygen.com measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**HeyGen 是数字人视频台**：Avatar+Voice+Translation 三线。
主打企业视频本地化（翻译+对口型）
与授权克隆口播；「人说话」的生成，不是「造世界」的生成。

## 适合与不适合

适合：培训/营销视频多语言本地化、授权真人克隆、批量口播。
不适合：创意叙事、娱乐向 AI 感、无授权克隆（条款红线）。

## 实测记录

本档核对官网、FAQ 与 API 文档的能力和授权边界。
对口型质量、身份验证强度与批量渲染行为需按账号实测。
## 未知项清单

- 底层生成模型：官方页未逐模型披露，按产品线能力表核对。
- 交互数字人 Streaming API 的产品化范围：按官方 API 文档核对。
- 训练用途开关：官方 FAQ 称用户数据不用于模型训练，企业档的数据条款按合同核对。
- 大陆合规入口：官方未列面向大陆公众的服务入口。
## 相关条目

- [Synthesia](./synthesia.md) — 同为企业数字人双强：Synthesia 培训向更企业，HeyGen 克隆与翻译更灵活。
- [D-ID](./d-id.md) — 同为数字人口播：D-ID 照片驱动轻量，HeyGen 产品线更宽。
- [Runway](./runway.md) — 视频生成的另一物种：Runway 造画面，HeyGen 造「人说话」。
- [Zapier](../../automation/products/zapier.md) — API 下游：HeyGen API 常经 Zapier 类平台接进内容流水线，批量本地化才跑得起来。
