---
id: fish-audio
form: web
name: fish audio
nameEn: fish audio
vendor: fish.audio
homepage: https://fish.audio
license: 免费+订阅+API。按官方条款页管辖（fish.audio/en/terms 直抓核验 2026-10-22）；
  声音克隆授权条款是关键页，细节未逐条核验。
licenseEn: Free + subscription + API. Governed by the official terms page (fish.audio/en/terms,
  direct-fetched 2026-10-22); voice-clone consent clauses are the key page, details not verified line by line.

axes:
  model_access: >-
    自研语音合成模型线（fish speech 系列模型叙事，官方站点）；社区音色库（zero-shot 克隆+
    用户共享音色市场）是产品主轴之一。开放权重线：fish audio 前身项目有开源先例，
    当前产品线的权重开放状态未逐条核验。
  runtime: >-
    网页（fish.audio）+ API（官方文档线）；生成在厂商云端。
  local_files: >-
    生成产物下载归本地；音色库在账户/社区侧。未见官方声明的本机数据面。
  background: >-
    生成即时/任务制（API 调用即产即回）；无「关机续跑」形态声明——
    云端服务不依赖本机在线。
  tools: >-
    TTS（多语言）、zero-shot 声音克隆（上传样本即克隆——产品招牌）、音色市场（社区共享音色线）、
    情感/风格控制（官方站点叙事）；API 面文档化。
  context: >-
    工具型无对话记忆；音色资产是「一致性」机制——克隆音色可复用，不是产品记忆。
  permissions: >-
    账号+订阅+API 体系（D9：价格不采）；**zero-shot 克隆的授权与滥用防线是必答项**——
    官方条款有授权口径（terms 页直抓在案），执行机制细节未逐条核验（收录标准 3）。
  fit: >-
    适合：零样本音色克隆工作流（自有声音快速复刻）、社区音色寻宝、开发者 API 集成。
    不适合：克隆他人声音（授权红线）、企业级合规叙事优先、大陆直连（实测 000）。

pitfalls:
  - zero-shot 克隆「能用」≠「合规」——上传他人声音样本在条款上是红线，授权责任在使用者
  - 社区音色库的商用权利逐音色看标注——别按「平台可用=可商用」理解
  - fish.audio 大陆直连 000（2026-10-22，代理 200）——可达性问题不是站点死亡

tags: [免费+订阅, zero-shot克隆, 音色市场, API向, 需网络环境]
related: [elevenlabs, minimax-audio, heygen]

sources:
  - label: fish audio · 官网（产品与能力叙事）
    url: https://fish.audio
    kind: official
  - label: fish audio · Terms（官方条款，2026-10-22 直抓核验）
    url: https://fish.audio/en/terms/
    kind: official
  - label: fish audio · Blog（官方更新线，changelog）
    url: https://fish.audio/blog/
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

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
  verified: 2026-10-22
---

## 一句话定位

**fish audio 是 zero-shot 音色克隆向的 TTS 台**：上传样本即复刻音色 + 社区音色市场；
「能用」与「合规」之间隔着授权红线。

## 适合与不适合

适合：自有声音零样本复刻、社区音色寻宝、API 集成。
不适合：克隆他人（红线）、企业合规优先、大陆直连（000）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **zero-shot 克隆对 10 秒级样本的保真度**
- **克隆滥用防线的实际执行**（名人声音测试——仅验证防线存在）
- **社区音色市场的商用标注一致性**

## 未知项清单

- 注册主体与团队构成（未核验到官方声明）
- 当前产品线权重开放状态（未逐条核验）
- 训练用途开关与音色库的默认训练态（未逐条核验）
- 备案状态（见 cn 块——主体未清）

## 相关条目

- [ElevenLabs](./elevenlabs.md) — 同为克隆向双雄：ElevenLabs 企业合规叙事重，fish audio 社区音色生态重。
- [MiniMax Audio](./minimax-audio.md) — 同为国产背景克隆线：MiniMax 直连可用+API 重，fish audio 需网络环境+社区重。
- [HeyGen](../../video/products/heygen.md) — 克隆音色下游：fish audio 复刻的音色常喂给 HeyGen 类数字人台做口播（建档后互链）。
- [Whisper](./whisper.md) — 音频管线上下游：Whisper 转写进、fish audio 合成出，常在同一语音管线两端。
