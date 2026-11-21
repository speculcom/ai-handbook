---
id: fish-audio
form: web
name: fish audio
nameEn: fish audio
vendor: fish.audio
homepage: https://fish.audio
license: 免费+订阅+API。按官方条款页管辖（fish.audio/en/terms，2026-10-22 取得）；声音克隆授权与 Professional Voice Clone 验证见官方 Voice Cloning 页（2026-11-21）。
licenseEn: Free, subscription and API tiers. Governed by the official terms page (fish.audio/en/terms, fetched 2026-10-22); clone consent and Professional Voice Clone verification follow the official Voice Cloning page (2026-11-21).

axes:
  model_access: >-
    自研语音模型线：官方文档列 s2.1-pro（生产推荐）、s2-pro、s2.1-pro-free（零成本测试档）与 drama-3（自然语言导演、带音效/停顿/标签），s1 已标注 2026-12-31 退役；自托管线基于 fish_speech 仓库（2026-11-21）。
  runtime: >-
    云端 API `https://api.fish.audio/v1/tts`（另有 `/model` 建音色）+ 网页 fish.audio；官方自托管文档给出本地 GPU 推理服务（`localhost:8080/v1/tts`），一条请求同时支持云端与自建（2026-11-21）。
  local_files: >-
    自托管路径把模型权重与音频都落在本机：官方文档给出从语义 token 到 DAC 解码的本地推理步骤，产物写本地文件；云端路径的产出以 bytes/流式分块返回，音色模型存账户侧（2026-11-21）。
  background: >-
    合成是同步/流式：`tts.convert()` 返回完整音频，`tts.stream()` 分块吐，WebSocket 接实时文本；音色训练是异步状态机，新建模型 `state` 从 created 到 trained（fast 模式多数即时可用），失败可重试（2026-11-21）。
  tools: >-
    TTS（多语言、mp3/wav/pcm/opus、speed 0.5–2.0）、即时克隆（直接传参考音频+转写）、持久音色模型（`POST /model`，private/unlist/public）、音色市场、Drama 3 导演式标签；官方 Voice Cloning 页另列 Professional Voice Clone（需验证，网页版）（2026-11-21）。
  context: >-
    无对话记忆：每次 TTS 请求独立，音色靠 `reference_id` 复用；即时克隆把参考样本随请求带入，持久克隆训练成 voice id，资产是跨请求一致性机制而非会话上下文（2026-11-21）。
  permissions: >-
    API Key（`FISH_API_KEY`）+ 账户/订阅；克隆样本须为本人或已获授权的声音，Professional Voice Clone 在官方页单列为 Verified 档；公开音色进 Voice Library 由用户选择 private/unlist/public（2026-11-21）。
  fit: >-
    适合：自有声音快速复刻、品牌统一音色、实时语音助手（约 300ms 首包，balanced 档）、自托管离线合成。不适合：克隆他人声音（授权红线）、要企业级合规审计链、大陆直连（实测 000）（2026-11-21）。

pitfalls:
  - zero-shot 克隆「能用」≠「合规」——上传他人声音样本在条款上是红线，授权责任在使用者
  - 社区音色库的商用权利逐音色看标注——别按「平台可用=可商用」理解
  - fish.audio 大陆直连 000（2026-10-22，代理 200）——可达性问题不是站点死亡

tags: [免费+订阅, zero-shot克隆, 音色市场, API向, 需网络环境]
related: [elevenlabs, minimax-audio, heygen]

sources:
  - label: fish audio · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://fish.audio
    kind: official
  - label: fish audio · Terms（官方条款，2026-10-22 直抓核验）
    url: https://fish.audio/en/terms/
    kind: official
  - label: fish audio · Blog（官方更新线，changelog，2026-11-21 抓取 200）
    url: https://fish.audio/blog/
    kind: changelog
  - label: Fish Audio Docs · Text to Speech（模型、端点、延迟与语言，2026-11-21 抓取 200）
    url: https://docs.fish.audio/features/text-to-speech
    kind: docs
  - label: Fish Audio Docs · Voice Cloning（即时/持久克隆与 visibility，2026-11-21 抓取 200）
    url: https://docs.fish.audio/features/voice-cloning
    kind: docs
  - label: Fish Audio Docs · Self-hosting inference（本地 GPU 推理路径，2026-11-21 检索收录）
    url: https://docs.fish.audio/developer-guide/self-hosting/running-inference
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: fish.audio（团队叙事含中国背景成员，注册主体未核验到官方声明——诚实标注）。
  origin_note_en: fish.audio (team narrative includes China-background members; the registered entity was
    not verified — honest labeling).
  direct: no
  direct_note: fish.audio 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: fish.audio measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: unknown
  filing_note: 未核验到对应生成式 AI 服务备案（2026-10-22 检索）；主体归属未核验清楚，
    「未核验到」≠「未备案」——若主体为国内团队则备案口径另论。
  filing_note_en: no matching generative-AI service filing found (searched 2026-10-22); the entity's
    affiliation was not verified — "not found" ≠ "not filed"; if the entity is a domestic team the filing
    question is assessed separately.
  verified: 2026-11-21
---

## 一句话定位

**fish audio 是 zero-shot 音色克隆向的 TTS 台**：上传样本即复刻音色 + 社区音色市场；
「能用」与「合规」之间隔着授权红线。

## 适合与不适合

适合：自有声音零样本复刻、社区音色寻宝、API 集成。
不适合：克隆他人（红线）、企业合规优先、大陆直连（000）。

## 实测记录

本档核对官方 TTS、Voice Cloning 与自托管文档；音质、克隆保真度与自托管显存占用需按硬件实测。
## 未知项清单

- 注册主体与团队构成：按官方条款页与站点署名核对。
- 自托管权重许可：按 fish_speech 仓库 LICENSE 核对。
- 训练用途开关：按官方条款与隐私页核对。
- 备案状态：按网信办公示查询（主体确认后再判定口径）。
## 相关条目

- [ElevenLabs](./elevenlabs.md) — 同为克隆向双雄：ElevenLabs 企业合规叙事重，fish audio 社区音色生态重。
- [MiniMax Audio](./minimax-audio.md) — 同为国产背景克隆线：MiniMax 直连可用+API 重，fish audio 需网络环境+社区重。
- [HeyGen](../../video/products/heygen.md) — 克隆音色下游：fish audio 复刻的音色常喂给 HeyGen 类数字人台做口播（建档后互链）。
- [Whisper](./whisper.md) — 音频管线上下游：Whisper 转写进、fish audio 合成出，常在同一语音管线两端。
