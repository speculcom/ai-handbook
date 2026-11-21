---
id: minimax-audio
form: web
name: MiniMax Audio（海螺语音）
nameEn: MiniMax Audio (Hailuo Voice)
vendor: MiniMax（稀宇科技）
homepage: https://www.minimax.io
license: 免费+订阅+API。按 MiniMax 开放平台用户协议管辖（platform.minimaxi.com/docs/guides/terms-of-service，2026-11-21 取得）；声音克隆需实名/企业认证（2026-11-21）。
licenseEn: Free, subscription and API tiers. Governed by the MiniMax open-platform user agreement (platform.minimaxi.com/docs/guides/terms-of-service, fetched 2026-11-21); voice cloning requires real-name or enterprise verification (2026-11-21).

axes:
  model_access: >-
    MiniMax 自研语音模型线：speech-2.8-hd / 2.8-turbo、speech-2.6-hd / 2.6-turbo、speech-02-hd / 02-turbo；官方 API 概览给 40 种语言、300+ 系统音色，并有音色复刻与音色设计两条资产生成线；音乐生成付费接口自 2026-08-20 起对新用户关闭，Music 3 开源权重在 Hugging Face/ModelScope（2026-11-21）。
  runtime: >-
    网页 MiniMax Audio（hailuoai.com/audio 与 minimax.io/audio）+ 开放平台 API（platform.minimaxi.com）；云端合成，同步 HTTP/WebSocket 与异步长文本两条通道，语音接口为无状态设计（2026-11-21）。
  local_files: >-
    不碰本机模型：复刻音频先上传拿 `file_id`，异步长文本产出 `task_id`→`file_id`，下载 URL 自返回起 9 小时内有效；网页端作品与音色存账户侧。音乐模型另有开源权重可本地跑（2026-11-21）。
  background: >-
    同步 T2A 单次最长 10,000 字符，实时流式；异步 T2A 单次最长 100 万字符，创建任务拿 `task_id`，查询后用 `file_id` 走文件接口下载，支持句级时间戳；两条通道都不依赖本机在线（2026-11-21）。
  tools: >-
    TTS（40 语言、300+ 音色、音量/语调/语速、按比例混音、mp3/pcm/flac/wav）、音色快速复刻（单人/双声道，可加示例音频增强）、音色设计（prompt 生成 voice_id）、异步长文本（字幕时间戳）、官方 MCP（语音合成/克隆/视频/音乐）（2026-11-21）。
  context: >-
    接口无状态：官方明确单次调用只处理传入内容、不存储用户数据、不涉及业务逻辑状态；音色资产（voice_id）是跨请求一致性机制，不是会话记忆。复刻/设计音色 7 天内未用于合成会被删除（2026-11-21）。
  permissions: >-
    账号+API Key；声音克隆须先完成个人实名或企业认证（官方 FAQ 与接口文档一致）；客户内容须拥有知识产权或合法授权，输出责任由用户承担；协议允许在去标识化、不可重识别前提下用输入/输出做服务优化与安全风控（2026-11-21）。
  fit: >-
    适合：中文/多语言高质量 TTS、自有声音克隆、长文本有声书（异步+字幕）、API 集成与国产直连。不适合：克隆他人声音（授权红线）、要开放权重音频模型、离线跑 TTS（2026-11-21）。

pitfalls:
  - 声音克隆的「授权」是条款红线——克隆他人声音需可证明的授权，别按功能可用性理解边界
  - 网页入口（hailuo/minimax.io）与 API 平台是两套配额与条款面——别互相推断
  - 备案号主语是 MiniMax 模型层——不等于每个产品入口单独备案

tags: [免费+订阅, 中文TTS, 声音克隆, API向, 国产直连]
related: [elevenlabs, fish-audio, hailuo-video]

sources:
  - label: MiniMax · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://www.minimax.io
    kind: official
  - label: MiniMax Audio · 音频产品页（2026-10-22 直抓核验）
    url: https://www.minimax.io/audio
    kind: official
  - label: MiniMax · News（官方更新线，changelog，2026-10-22 直抓核验）
    url: https://www.minimax.io/news
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（备案号交叉核验源，2026-10-22 直抓）
    url: https://docs.bailian.console.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: docs
  - label: MiniMax 开放平台 · 接口概览（模型、40 语言、无状态与 9 小时下载，2026-11-21 抓取 200）
    url: https://platform.minimaxi.com/docs/api-reference/api-overview
    kind: docs
  - label: MiniMax 开放平台 · 快速复刻（实名/企业认证与 7 天临时音色，2026-11-21 抓取 200）
    url: https://platform.minimaxi.com/document/Voice%20Cloning?key=66719032a427f0c8a570165b
    kind: docs
  - label: MiniMax 开放平台 · 用户协议（客户内容授权与去标识化使用，2026-11-21 抓取 200）
    url: https://platform.minimaxi.com/docs/guides/terms-of-service.md
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: MiniMax（上海稀宇极智科技有限公司，中国）。
  origin_note_en: MiniMax (Shanghai Xiyu Jizhi Technology Co., Ltd., China).
  direct: yes
  direct_note: minimax.io 大陆直连实测 200（2026-10-22）。
  direct_note_en: minimax.io measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_no: Shanghai-MiniMax-202505230046
  filing_note: MiniMax 模型备案号（百炼与百度智能云官方公示页交叉核验，2026-10-22）；
    主语是模型层——各产品入口的备案状态未逐一核验。
  filing_note_en: MiniMax model-level filing number (cross-verified on Alibaba Cloud Bailian and Baidu
    Intelligent Cloud disclosure pages, 2026-10-22); the subject is the model layer — per-entry filing status
    was not verified one by one.
  verified: 2026-11-21
---

## 一句话定位

**MiniMax Audio 是国产 TTS/声音克隆/API 三合一的音频线**：中文语音质量口碑 + 音色克隆 +
音乐模型经 API 供给；网页与 API 两套入口两套条款。

## 适合与不适合

适合：中文 TTS、自有声音克隆工作流、API 集成、国产直连。
不适合：克隆他人（授权红线）、开放权重、离线。

## 实测记录

本档核对官方接口概览、语音合成与声音复刻文档以及用户协议；克隆相似度、长文本稳定性与网页/API 模型同步需按账号实测。
## 未知项清单

- 音频模型开放权重：官方文档以 API 供给为主，权重状态按官方仓库核对。
- 各产品入口自身的备案状态：按各入口公示页核对。
- 训练用途开关：接口默认无状态，训练/优化口径按用户协议 6.3 与隐私页。
- 音乐与语音计费是否同池：按按量计费页核对。
## 相关条目

- [ElevenLabs](./elevenlabs.md) — 同为 TTS+克隆双能力：ElevenLabs 多语言面宽，MiniMax 中文向强。
- [fish audio](./fish-audio.md) — 同为克隆向：fish audio 社区音色库重，MiniMax 官方音库+API 重。
- [海螺视频](../video/products/hailuo-video.md) — 同厂不同产品线：海螺视频是视频线，本档案是音频线。
