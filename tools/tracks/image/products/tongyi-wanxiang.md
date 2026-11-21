---
id: tongyi-wanxiang
form: web
name: 通义万相
nameEn: Tongyi Wanxiang (Wan)
vendor: 阿里巴巴
homepage: https://tongyi.aliyun.com/wanxiang
license: 产品免费+积分；开源侧 Wan2.2 仓库 Apache-2.0（GitHub API 核验 2026-11-21）；权重与代码以各仓 LICENSE 为准；产品线按阿里站内协议（2026-11-21）。
licenseEn: Product free + credits. Open side: Wan weights are published on GitHub/HF (Wan2.1/Wan2.2 repos
  verified Apache-2.0 via GitHub API) — weights and code are governed by each repo's LICENSE; the product line
  follows Alibaba's in-site agreements, details not verified line by line.

axes:
  model_access: >-
    万相（Wan）系列双轨：产品/API 端覆盖参考生视频、图生视频、文生视频、文件/网页生视频、视频编辑、文生图、图像编辑、组图生成；代次含 Wan2.5（原生多模态、音画同步、10 秒 1080p/24fps）与 Wan3.0（阿里云产品页标 30 秒、四模态参考）。开源侧 Wan2.2 在 GitHub/HF 以 Apache-2.0 发布，TI2V-5B 可在 4090 级消费卡跑 720p/24fps（2026-11-21）。
  runtime: >-
    网页 tongyi.aliyun.com/wanxiang + App + 阿里云百炼 API（HTTP/SDK，同步或异步任务）；开源线经 ComfyUI/Diffusers 在本地 GPU 跑同一模型族（2026-11-21）。
  local_files: >-
    产品端素材与作品存阿里云账户；开源线权重、推理与生成物全在本机。两条线数据边界完全不同：API 结果 URL 有效期 24 小时，需自行转存（2026-11-21）。
  background: >-
    云端异步任务制：创建任务拿 `task_id`（查询有效期 24 小时），状态 PENDING→RUNNING→SUCCEEDED/FAILED，轮询取结果，成功后图像/视频 URL 24 小时有效；开源线由本地进程决定，无托管续跑（2026-11-21）。
  tools: >-
    产品/API 面：参考生视频（视频/图像/音频/文本输入）、图生视频、文生视频、文件/网页生视频、通用视频编辑、文生图、图像编辑、组图生成、首尾帧、人声生视频；开源线含 Wan2.2 T2V/I2V/TI2V、Animate-14B、S2V-14B（2026-11-21）。
  context: >-
    产品端以作品/项目组织，跨会话不建对话记忆；开源线模型本体无状态，上下文由调用方按帧/提示词自行管理。角色一致性靠参考图/首尾帧，不是记忆（2026-11-21）。
  permissions: >-
    产品端阿里云账号 + 积分/配额 + 百炼 API Key（Bearer）；开源线无账号，Apache-2.0 允许商用但须保留许可与声明；产品端训练用途按阿里协议与隐私政策。备案：Shanghai-TongYiWanXiang-202410090024 在案（2026-11-21）。
  fit: >-
    适合：要「云端产品 + 开源权重」双轨、图+视频同族、中文语义、参考生视频/音频驱动、合规敏感场景本地跑。不适合：要完全托管长任务、要脱离阿里账号的产品端体验（2026-11-21）。

pitfalls:
  - 产品端与开源线是两套数据边界——「万相开源」不等于「你在产品端的作品开源」，反之亦然
  - Wan 权重 Apache-2.0 是代码仓核验——具体权重文件的许可以 HF 各仓 model card 为准，逐仓核对
  - 「通义千问/通义万相/阿里云百炼」同厂商三条线——对话、图像视频、API 平台各归各档

tags: [国产, 免费+积分, 开源权重, 图视频一体, Apache-2.0, 已备案]
related: [tongyi-qianwen, kling, flux, ollama]

sources:
  - label: 通义万相 · 官网（产品入口与能力叙事，2026-11-21 抓取 200）
    url: https://tongyi.aliyun.com/wanxiang
    kind: official
  - label: Wan-Video/Wan2.2 · GitHub（Apache-2.0，18,807★，2026-11-21 API 核验）
    url: https://github.com/Wan-Video/Wan2.2
    kind: repo
  - label: Wan-Video/Wan2.2 · Releases（changelog，2026-11-21 抓取 200）
    url: https://github.com/Wan-Video/Wan2.2/releases
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（通义万相大模型备案号，2026-11-21 抓取 200）
    url: https://help.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: official
  - label: 万相 API · 能力页（参考/图/文/文件生视频与图像编辑，2026-11-21 抓取 200）
    url: https://tongyi.aliyun.com/wan/api
    kind: docs
  - label: 通义万相 · Wan2.5 发布（原生多模态、音画同步、10 秒 1080p/24fps，2026-11-21 抓取 200）
    url: https://tongyi.aliyun.com/news?id=pxwhvf/suodqg/usofpg66drzae5s1
    kind: docs
  - label: 阿里云百炼 · 万相图像 API（异步 task_id、状态流转与 24 小时 URL，2026-11-21 抓取 200）
    url: https://help.aliyun.com/zh/model-studio/wan-image-generation-api-reference
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 阿里巴巴（通义实验室系）。
  origin_note_en: Alibaba (Tongyi Lab lineage).
  direct: yes
  direct_note: tongyi.aliyun.com/wanxiang 大陆直连实测 200（2026-10-22）。
  direct_note_en: tongyi.aliyun.com/wanxiang measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 通义万相大模型
  filing_name_en: Tongyi Wanxiang LLM
  filing_no: Shanghai-TongYiWanXiang-202410090024
  filing_note: 备案号经阿里云百炼官方公示页核验（属地上海，2024-10 批次）；该号同时出现在手机终端进网许可等第三方引用中。
  filing_note_en: filing no. verified on Alibaba Cloud Model Studio official disclosure page (Shanghai, 2024-10 batch);
    the same no. also appears in third-party references such as handset network-access filings.
  verified: 2026-11-21
---

## 一句话定位

**通义万相是「云端产品 + Apache-2.0 开源权重」双轨的国产图视频创作台**（Wan 系列）：
合规敏感场景可本地跑，备案号经阿里云官方公示核验；产品端与开源线数据边界完全不同。

## 适合与不适合

适合：双轨可选（云端/本地）、图视频同族、中文语义。
不适合：要完全托管长任务、要产品端脱离账号。

## 实测记录

本档核对万相 API 页、Wan2.5/2.6 官方发布、百炼异步接口与 Wan2.2 仓库；生成质量、产品档位与开源版本的对应、消费级显卡可用档需按账号与硬件实测。
## 未知项清单

- 产品端模型档位完整清单：以站内与百炼模型列表为准。
- 各 HF 权重仓的具体许可差异：逐仓 model card 核对（Wan2.2 仓为 Apache-2.0）。
- 产品端训练用途开关：按阿里协议与隐私政策核对。
- 跨会话记忆机制：产品按作品组织，开源模型无状态。
## 相关条目

- [即梦](./jimeng.md) — 同为国产图视频一体创作台：万相有开源权重线，即梦没有。
- [FLUX](./flux.md) — 同为开源权重图生成族：FLUX 权重族与 Wan 权重族都能在本地生态跑。
