---
id: higgsfield
form: web
name: Higgsfield
nameEn: Higgsfield
vendor: Higgsfield AI
homepage: https://www.higgsfield.ai
license: 免费+订阅。按官方条款页管辖（higgsfield.ai/terms-of-use-agreement 直抓核验 2026-10-22）；
  商用权按档位区分，细节未逐条核验。
licenseEn: Free + subscription. Governed by the official terms page (higgsfield.ai/terms-of-use-agreement,
  direct-fetched 2026-10-22); commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    聚合+自研混合：平台内提供多家模型生成入口（官网导航所见）+ 自研线（公司名即模型品牌叙事）。
    具体聚合清单未逐条清点。
  runtime: >-
    网页（higgsfield.ai）；生成在厂商云端。未见官方离线权重线。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见；下载归本地。
    未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）。
  tools: >-
    **镜头控制（Camera Control / Move 系列）是它的招牌差异**（官网主打叙事：预设运镜——dolly/
    crash zoom/crane 等一键套用）；图生视频、特效模板线（官网导航所见）。
  context: >-
    以账户作品组织；跨会话记忆未核验到官方声明。运镜预设是它的「一致性」机制——可复用不是记忆。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验；
    免费档输出的商用与水印限制按条款（未逐条核验）。
  fit: >-
    适合：运镜可控的短片（预设镜头语言）、把「导演感」外包给预设的创作者、社交向动感素材。
    不适合：要开放权重、大陆直连敏感场景（直连 200 可用但产品面向海外）、长叙事一致性主打。

pitfalls:
  - 「镜头控制」是预设套用不是自由导演——运镜模板库的边界决定上限，别按专业摄影理解
  - 聚合面里的模型与自研线并存——「这个效果是谁的模型」按官网逐项看
  - 大陆直连实测 200（2026-10-22）——它是少数直连可用的海外视频站，但账号/支付面按海外口径

tags: [免费+订阅, 镜头控制, 运镜预设, 图生视频, 直连可用]
related: [runway, luma, kling, krea]

sources:
  - label: Higgsfield · 官网（产品与能力叙事）
    url: https://www.higgsfield.ai
    kind: official
  - label: Higgsfield · Terms of Use（官方条款，2026-10-22 直抓核验）
    url: https://www.higgsfield.ai/terms-of-use-agreement
    kind: official
  - label: Higgsfield · Blog（官方更新线，changelog）
    url: https://www.higgsfield.ai/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Higgsfield AI（叙事为海外团队；具体注册主体未核验到官方声明）。
  origin_note_en: Higgsfield AI (overseas-team narrative; the exact registered entity was not verified).
  direct: yes
  direct_note: higgsfield.ai 大陆直连实测 200（2026-10-22）。
  direct_note_en: higgsfield.ai measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Higgsfield 把「运镜」做成产品**：预设镜头语言（dolly/crash zoom/crane 等）一键套用到生成视频——
它卖的是「导演感」，不是通用生成器。

## 适合与不适合

适合：镜头语言可控的短片、动感社交素材、把运镜外包给预设的创作者。
不适合：自由导演式控制、开放权重、长叙事一致性主打。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **运镜预设对复杂主体（多人/快速动作）的跟随质量**
- **聚合模型清单里各家输出的风格差异**
- **预设运镜与自定义提示的组合冲突行为**

## 未知项清单

- 注册主体与团队背景（未核验到官方声明）
- 自研模型与聚合模型的边界清单（未逐条清点）
- 训练用途开关（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [Runway](./runway.md) — 同为镜头向：Runway 给专业工具链自己调，Higgsfield 给预设一键套。
- [Luma](./luma.md) — 同为运镜叙事向：Luma 首尾帧插值，Higgsfield 预设运镜库。
- [可灵](./kling.md) — 可灵也有运镜控制线：可灵是综合大台内的一项，Higgsfield 全站围绕它。
- [Krea](../image/products/krea.md) — 图生视频上游：Higgsfield 的输入帧常在 Krea/Flux 类图像台先出图再生成。
