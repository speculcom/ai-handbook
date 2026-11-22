---
id: higgsfield
form: web
name: Higgsfield
nameEn: Higgsfield
vendor: Higgsfield AI
homepage: https://www.higgsfield.ai
license: 免费+订阅+API 预付。按官方条款页管辖（higgsfield.ai/terms，2026-11-21 取得）；消费级默认允许训练、企业协议除外；输出可商用且不主张所有权（2026-11-21）。
licenseEn: Free + subscription. Governed by the official terms page (higgsfield.ai/terms-of-use-agreement,
  direct-fetched 2026-10-22); commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    自研与聚合混合。自研线含 Soul 2.0（写实图像）与 Soul Cinema（电影感图像）。另有 Higgsfield DOP（电影感视频）。

    另有 Keyframes 负责分镜。Cinema Studio 提供 1,296 镜头与色彩工作台。自研 reasoning engine 编排内外模型。

    API 目录另列 Seedance、Kling、Wan、MiniMax、LTX、PixVerse、Grok、Recraft、Ideogram 与 Qwen（2026-11-21）。
  runtime: >-
    **入口：** 网页为 higgsfield.ai，异步 API（`https://api.higgsfield.ai`，有 Python/TypeScript SDK）。网页跑 Cinema Studio、Soul ID 等工作台。

    API 按模型端点提交，额度用预付美元余额。单 key 解锁 20 并发（2026-11-21）。
  local_files: >-
    不碰本机模型。输入图片或视频走 URL。提交后拿 `request_id` 与 `status_url`。轮询或 webhook 到 completed 再下载成片。作品在账户库，导出落本地由用户保存（2026-11-21）。
  background: >-
    异步请求有固定生命周期：submit、存 `request_id`、poll `status_url` 或 webhook、completed 后下载。模型各有超时上限；超时标记失败且不扣费，可重提。

    Cinema Studio 单条最长 30 秒，最多 50 张参考图（2026-11-21）。
  tools: >-
    Cinema Studio 4.0 提供 30+ 运镜预设、7 种 genre、相机与镜头控制、f/1.4–f/11 光圈、灯光预设、50+ 色板与 Emotion Wheel，最高 1080p/30s。

    Soul ID 管角色一致性。Soul HEX 管色彩控制，Keyframes 做分镜。另有音频/口型翻译与官方 MCP（2026-11-21）。
  context: >-
    以账户作品和 Elements 组织。Soul ID 把同一角色跨镜头锁定。Cinema Studio 把同一套相机逻辑复用到多条片段。这是资产生成的「一致性」机制，不是对话记忆（2026-11-21）。
  permissions: >-
    网页订阅加 API 预付余额。API key 为 ID:secret 两段，只显示一次，要求服务端使用。消费级条款允许商用输出，不主张输出所有权。默认可用输入/输出训练模型，企业协议除外。

    上传人物形象需本人授权。输出可能带 C2PA 水印（2026-11-21）。
  fit: >-
    适合要镜头语言可控的短片、角色跨镜头一致。也适合广告/时尚/叙事分镜与 API 批量出片。不适合要开放权重或离线、零成本无限试错、完全不想让内容进训练的场景。最后一种需企业协议（2026-11-21）。

pitfalls:
  - 「镜头控制」是预设套用不是自由导演——运镜模板库的边界决定上限，别按专业摄影理解
  - 聚合面里的模型与自研线并存——「这个效果是谁的模型」按官网逐项看
  - 大陆直连实测 200（2026-10-22）——它是少数直连可用的海外视频站，但账号/支付面按海外口径

tags: [免费+订阅, 镜头控制, 运镜预设, 图生视频, 直连可用]
related: [runway, luma, kling, krea]

sources:
  - label: Higgsfield · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://www.higgsfield.ai
    kind: official
  - label: Higgsfield · Terms of Use（官方条款，2026-11-21 直抓核验）
    url: https://www.higgsfield.ai/terms
    kind: official
  - label: Higgsfield · Blog（官方更新线，changelog，2026-11-21 抓取 200）
    url: https://www.higgsfield.ai/blog
    kind: changelog
  - label: Higgsfield · About（Soul 2.0/Soul Cinema/DOP/Keyframes/Cinema Studio 与 reasoning engine，2026-11-21 抓取 200）
    url: https://higgsfield.ai/about
    kind: official
  - label: Higgsfield · Cinema Studio 4.0 参数参考（30+ 运镜、镜头与 50 张参考，2026-11-21 抓取 200）
    url: https://higgsfield.ai/blog/ai-video-camera-control
    kind: docs
  - label: Higgsfield API · 文档首页（异步 API、request_id/status_url、轮询或 webhook，2026-11-21 抓取 200）
    url: https://docs.higgsfield.ai/docs/index
    kind: docs
  - label: Higgsfield · API 入门（单 key 20 并发、预付余额与模型目录，2026-11-21 抓取 200）
    url: https://higgsfield.ai/creator-hub/help-center/integrations/what-is-the-higgsfield-api
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Higgsfield AI（叙事为海外团队；注册主体按官方条款页署名核对）。
  origin_note_en: Higgsfield AI (overseas-team narrative; the registered entity follows the official terms-page imprint).
  direct: yes
  direct_note: higgsfield.ai 大陆直连实测 200（2026-10-22）。
  direct_note_en: higgsfield.ai measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**Higgsfield 把「运镜」做成产品**：预设镜头语言（dolly/crash zoom/crane 等）一键套用到生成视频。
它卖的是「导演感」，不是通用生成器。

## 适合与不适合

适合：镜头语言可控的短片、动感社交素材、把运镜外包给预设的创作者。
不适合：自由导演式控制、开放权重、长叙事一致性主打。

## 实测记录

本档核对官网 About、Cinema Studio 参数页、API 文档与用户协议。运镜跟随质量、聚合模型风格差异与超时边界需按账号实测。
## 未知项清单

- 注册主体与团队背景：按官方条款与 About 页署名核对。
- 自研与聚合模型的完整边界：按 API 目录与网页模型选择器逐项核对。
- 训练用途开关：消费级默认可用于训练，企业协议另行约定。
- 输出保留期：按 API 请求生命周期文档与账户存储页核对。
## 相关条目

- [Runway](./runway.md) — 同为镜头向：Runway 给专业工具链自己调，Higgsfield 给预设一键套。
- [Luma](./luma.md) — 同为运镜叙事向：Luma 首尾帧插值，Higgsfield 预设运镜库。
- [可灵](./kling.md) — 可灵也有运镜控制线：可灵是综合大台内的一项，Higgsfield 全站围绕它。
- [Krea](../image/products/krea.md) — 图生视频上游：Higgsfield 的输入帧常在 Krea/Flux 类图像台先出图再生成。

