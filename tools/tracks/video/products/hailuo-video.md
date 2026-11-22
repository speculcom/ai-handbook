---
id: hailuo-video
form: web
name: 海螺视频
nameEn: Hailuo Video
vendor: MiniMax（稀宇科技）
homepage: https://hailuoai.video
license: 免费档（带水印、个人使用）+ 付费订阅（去水印、商用权，按《海螺AI付费服务协议》）。开源 H3-Base 按 MiniMax H3 Community License。站点基础使用条款与付费协议分别管辖，商用按付费协议与开源许可执行（2026-11-21）。
licenseEn: Free tier (watermarked, personal use) plus paid subscriptions (watermark-free, commercial rights under the Hailuo AI Paid Service Agreement). Open H3-Base follows the MiniMax H3 Community License; the site’s base terms and the paid agreement govern separately, with commercial use following the paid agreement and the open licence (2026-11-21).

axes:
  model_access: >-
    海螺视频已从单一自研模型入口扩成多模型工作室。

    官方账号页列 Hailuo 2.3/2.0/1.0 家族、MiniMax H3（海螺 3.0），并同场接入 Veo 3.1、Sora 2、Seedance 2.0、MiniMax H3 等 12+ 视频模型。

    H3 官方规格为 768p/2K、4–15 秒、24fps、32kHz 原生立体声。支持文生、首尾帧与 Omni Reference（2026-11-21）。
  runtime: >-
    网页 hailuoai.video + 移动 App + MiniMax 开放平台异步 API（`/v2/video_generation`，Bearer 鉴权）。

    H3 于 2026-08-03 开源 H3-Base 权重。可在本地用 SGLang/vLLM/diffusers/ComfyUI 跑 768p。2K 重生成仍走官方 API（2026-11-21）。
  local_files: >-
    产品端素材与成片存账户云端，免费档下载带水印。开源 H3-Base 权重、推理与 768p 输出可全在本机。2K 重生成模块不随开源发布，需调官方接口。

    两条线的数据边界不同（2026-11-21）。
  background: >-
    云端异步任务。`POST /v2/video_generation` 返回 `task_id`，轮询 Query Task 取状态。成功读 `content.url`。

    可 List/Cancel/Delete，只保留最近 7 天任务记录。控制台生成按队列优先级排队，付费档优先（2026-11-21）。
  tools: >-
    H3 支持文生视频与首帧、首尾帧。Omni Reference 可带不超过 9 图、3 视频与 3 音频，合计不超过 12 文件。

    指令式视频编辑可替换或增删人物物体，改背景光线，改台词与音色。另有原生立体声、最长 15 秒、2K 与 21:9 至 9:16 六种画幅。

    Hailuo 2.3。文生/图生视频，768p/1080p、6/10 秒。2.3-Fast 只做图生（2026-11-21）。
  context: >-
    以生成任务与作品历史组织。一次生成把文本、图、视频、音频放进同一多模态上下文。Omni Reference 用参考文件保持角色/动作/镜头/声音一致。

    跨会话不继承对话上下文，复用靠显式参考素材（2026-11-21）。
  permissions: >-
    账号 + 免费档 + 付费订阅（Standard/Pro/Master/Ultra/Max）+ 积分（贝壳）。免费档带水印、个人使用，付费档去水印并保留商用权。

    H3 开源权重按 MiniMax H3 Community License。商用须遵守该许可的收入门槛与署名条款。API 另有按量计费（2026-11-21）。
  fit: >-
    适合：一条入口横评多模型。H3 的原生音画与参考生视频。广告/电商/短剧镜头。需要本地 768p 开源部署。不适合：要免费商用。要单一模型极致低价。要全离线 2K（2026-11-21）。
pitfalls:
  - 「海螺」是产品名、「MiniMax」是公司/模型名。媒体报道常混用，转述时按官方页主语（L5）
  - 备案号 Shanghai-MiniMax-202505230046 是模型层备案（官方公示页主语是 MiniMax）。
    不等于「海螺视频产品入口已备案」，两者主语不同
  - hailuoai.video（海外入口）与国内入口的账号与内容政策分别成页。别按同一账号体系理解

tags: [免费+订阅, 国产直连, 文生视频, 图生视频, 自研模型]
related: [kling, jimeng, veo]

sources:
  - label: 海螺视频 · 官网（多模型入口与 H3 工作室，2026-11-21 核验）
    url: https://hailuoai.video
    kind: official
  - label: 海螺视频 · MiniMax H3 模型页（5–15s、2K、原生立体声、12 参考文件与编辑，2026-11-21 抓取 200）
    url: https://hailuoai.video/tools/minimax-h3
    kind: docs
  - label: 海螺视频 · AI 视频生成器（12+ 模型、Veo/Sora/Seedance/H3 同场，2026-11-21 抓取 200）
    url: https://hailuoai.video/tools/ai-video-generator
    kind: docs
  - label: 海螺视频 · Hailuo 2.3 模型页（文生/图生、768p/1080p、6/10s，2026-11-21 抓取 200）
    url: https://hailuoai.video/tools/hailuo-2-3-model
    kind: docs
  - label: 海螺AI · 付费服务协议（订阅、积分与付费内容商用权，2026-11-21 核验）
    url: https://hailuoai.video/doc/payment-policy.html
    kind: docs
  - label: 海螺AI · 使用条款（个人非商用基础许可，2026-11-21 核验）
    url: https://hailuoai.video/doc/terms-of-service.html
    kind: docs
  - label: MiniMax API · 概览（H3/H3-Highspeed/H3-Lite/H3-Max、异步任务与查询，2026-11-21 抓取 200）
    url: https://platform.minimax.io/docs/api-reference/api-overview
    kind: docs
  - label: MiniMax · H3 开源公告（H3-Base 权重、Context-IR 与 2K 重生成边界、Community License，2026-11-21 抓取 200）
    url: https://www.minimax.io/news/minimax-h3-open-source
    kind: docs
  - label: 海螺视频 · 产品更新（Hailuo 2.3/2.3-Fast 发布与模型线，2026-11-21 核验）
    url: https://hailuoai.video/pages/blog/introducing-hailuo-2-3-ai-video-generator
    kind: changelog

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: MiniMax（上海稀宇极智科技有限公司，中国）。
  origin_note_en: MiniMax (Shanghai Xiyu Jizhi Technology Co., Ltd., China).
  direct: yes
  direct_note: hailuoai.video 大陆直连实测 200（2026-10-22）。
  direct_note_en: hailuoai.video measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_no: Shanghai-MiniMax-202505230046
  filing_note: MiniMax 模型备案号（阿里云百炼与百度智能云官方公示页交叉核验，2026-10-22）。
    主语是模型层——海螺视频产品入口按监管公示与站点条款分别理解。
  filing_note_en: MiniMax model-level filing number (cross-verified on Alibaba Cloud Bailian and Baidu
    Intelligent Cloud official disclosure pages, 2026-10-22); the subject is the model layer — the Hailuo
    video product entry's own filing status was not separately verified.
  verified: 2026-11-21
---

## 一句话定位

**海螺视频是 MiniMax 的消费级视频生成入口**：它用 H3 自研音画模型，另有 12+ 多模型工作室。
国产、大陆直连可用、免费档起步。
模型层备案号见下方，产品入口按监管公示与站点条款分别理解。

## 适合与不适合

适合：国产直连的文/图/参考生视频与原生音画。一条入口横评多模型。免费试水。短视频与广告素材。
不适合：免费商用、完全离线 2K、把模型层备案号当作产品入口备案。

## 实测记录

本档核对海螺官网模型页、H3 开源公告、MiniMax API 概览与付费/使用条款。
各模型实际可用档位、积分消耗与 2K 生成稳定性需按账号实测。
## 未知项清单

- H3 各变体的公开权重范围。H3-Base FL2VA/Ref2VA 已开源，H3-Context-IR 与 H3-Regenerate-2K 仍由官方托管。
- 商业许可的收入门槛与署名细则。按 MiniMax H3 Community License 原文执行。
- 各模型档位积分价：以生成面板与订阅页实时展示为准。
## 相关条目

- [可灵](./kling.md) — 同为国产视频双强：可灵生态面（App/插件）更宽，海螺入口更轻。
- [即梦](../image/products/jimeng.md) — 同为国产图视频一体入口：即梦嵌剪映生态，海螺是独立视频站。
