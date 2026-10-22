---
id: luma
form: web
name: Luma（Dream Machine）
nameEn: Luma (Dream Machine)
vendor: Luma AI
homepage: https://lumalabs.ai
license: 免费+订阅。按官方条款页管辖（lumalabs.ai/terms-of-service 直抓核验 2026-10-22）；
  商用权按档位区分，细节未逐条核验。
licenseEn: Free + subscription. Governed by the official terms page (lumalabs.ai/terms-of-service, direct-fetched
  2026-10-22); commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    自研 Dream Machine 视频模型线（官网叙事）；另有 Ray 系模型线（官网所见）。用户不选裸模型。
    开放权重线未核验到官方声明。
  runtime: >-
    网页（lumalabs.ai）+ API（官网有 API 入口，细节未逐条核验）；生成在厂商云端。
    公司起家于 NeRF/3D 捕捉（Luma 原名叙事），视频生成是后来的主产品线。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见；下载归本地。
    未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）。
  tools: >-
    文生视频、图生视频、关键帧插值（首尾帧，官网叙事所见）、Modify/延展编辑线（官网所见）；
    3D/NeRF 捕捉线仍是官网可见的产品面（与视频线并列）。
  context: >-
    以账户作品页组织（生成历史可回看）；跨会话记忆未核验到官方声明。
    首尾帧控制是任务内约束，不是跨任务记忆。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验；免费档商用与水印限制按条款（未逐条核验）。
  fit: >-
    适合：镜头运动感强的短片生成（官方叙事主打）、首尾帧控制、3D 捕捉与视频混合工作流。
    不适合：大陆直连（实测 000）、角色一致性长叙事主打、要开放权重。

pitfalls:
  - Luma 的产品面不止视频——3D/NeRF 捕捉线仍在官网；「Luma=视频站」是窄化
  - 大陆直连实测 000（2026-10-22，代理 200 可达）——可达性问题不是站点死亡
  - Dream Machine 是产品/模型线名，Luma AI 是公司名——转述时主语别混

tags: [免费+订阅, 镜头运动向, 首尾帧, 3D捕捉, 需网络环境]
related: [runway, veo, pika, midjourney]

sources:
  - label: Luma · 官网（产品与能力叙事）
    url: https://lumalabs.ai
    kind: official
  - label: Luma · Terms（官方条款，2026-10-22 直抓核验）
    url: https://lumalabs.ai/terms-of-service
    kind: official
  - label: Luma · Changelog（官方更新线）
    url: https://lumalabs.ai/changelog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Luma AI（美国旧金山）。
  origin_note_en: Luma AI (San Francisco, US).
  direct: no
  direct_note: lumalabs.ai 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: lumalabs.ai measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Luma 的 Dream Machine 主打镜头运动感短片**：首尾帧插值与运镜叙事是招牌，公司还有 3D/NeRF 捕捉线；
大陆直连不可达（000）。

## 适合与不适合

适合：运镜感短片、首尾帧控制、3D 捕捉混合工作流。
不适合：大陆直连、长叙事一致性、开放权重。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **首尾帧插值的运动合理性**（复杂动作会不会穿帮）
- **API 与网页档的能力差异**
- **3D 捕捉线与视频线的联动面**

## 未知项清单

- 开放权重线（未核验到官方声明）
- API 计费与配额面（D9：价格不采；未逐条核验）
- 训练用途开关（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [Runway](./runway.md) — 同为海外专业向视频台：Runway 编辑工作流深，Luma 生成叙事强。
- [Veo](./veo.md) — 同为镜头叙事向：Veo 挂 Google 生态，Luma 独立站。
- [Pika](./pika.md) — 同为海外轻量入口：Pika 玩法特效向，Luma 运镜叙事向。
- [Midjourney](../image/products/midjourney.md) — 图生视频上游：Luma 的首帧工作流常从 Midjourney 出图起步。
