---
id: minimax-audio
form: web
name: MiniMax Audio（海螺语音）
nameEn: MiniMax Audio (Hailuo Voice)
vendor: MiniMax（稀宇科技）
homepage: https://www.minimax.io
license: 免费+订阅+API。按官方条款管辖（minimax.io 站点条款线，2026-10-22 直抓核验站点可达）；
  声音克隆的授权条款是关键页，细节未逐条核验。
licenseEn: Free + subscription + API. Governed by the official terms on minimax.io (site reachability
  direct-fetched 2026-10-22); voice-clone consent clauses are the key page, details not verified line by line.

axes:
  model_access: >-
    MiniMax 自研语音/音频模型线（speech-02 系列等模型经 API 提供，官方文档叙事）；
    网页入口（hailuoai.com/audio 与 minimax.io/audio）+ API 平台（platform.minimaxi.com 线）双入口。
  runtime: >-
    网页 + API；生成在厂商云端。未见官方开放权重的音频模型声明（语言模型有开放权重先例，音频线未见）。
  local_files: >-
    生成产物下载归本地；账户侧留存面未逐条核验。未见官方声明的本机数据面。
  background: >-
    生成即时/任务制（API 调用即产即回）；无「关机续跑」形态声明——
    云端服务不依赖本机在线。
  tools: >-
    TTS（多语言/多风格）、**声音克隆/音色设计**（官方产品面）、音乐生成线（音乐模型经 API 提供，
    官方文档叙事）；API 参数面（速度/音量/情绪控制）文档化。
  context: >-
    工具型产品无对话记忆概念；音色资产是它的「一致性」机制——克隆音色可复用不是记忆。
  permissions: >-
    账号+订阅+API 计费体系（D9：价格不采）；**声音克隆涉人格权——官方有授权口径页，
    细节未逐条核验**（收录标准 3：克隆授权线必答）。
    备案：MiniMax 模型备案号 Shanghai-MiniMax-202505230046（百炼/百度云公示页交叉，2026-10-22）——模型层主语。
  fit: >-
    适合：中文 TTS 高质量向、声音克隆工作流（自有声音授权场景）、API 集成语音、国产直连。
    不适合：克隆他人声音（授权红线）、要开放权重、离线跑。

pitfalls:
  - 声音克隆的「授权」是条款红线——克隆他人声音需可证明的授权，别按功能可用性理解边界
  - 网页入口（hailuo/minimax.io）与 API 平台是两套配额与条款面——别互相推断
  - 备案号主语是 MiniMax 模型层——不等于每个产品入口单独备案

tags: [免费+订阅, 中文TTS, 声音克隆, API向, 国产直连]
related: [elevenlabs, fish-audio, hailuo-video]

sources:
  - label: MiniMax · 官网（产品与能力叙事）
    url: https://www.minimax.io
    kind: official
  - label: MiniMax Audio · 音频产品页（2026-10-22 直抓核验）
    url: https://www.minimax.io/audio
    kind: official
  - label: MiniMax · News（官方更新线，changelog，2026-10-22 直抓核验）
    url: https://www.minimax.io/news
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（备案号交叉核验源）
    url: https://docs.bailian.console.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: docs

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

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
  verified: 2026-10-22
---

## 一句话定位

**MiniMax Audio 是国产 TTS/声音克隆/API 三合一的音频线**：中文语音质量口碑 + 音色克隆 +
音乐模型经 API 供给；网页与 API 两套入口两套条款。

## 适合与不适合

适合：中文 TTS、自有声音克隆工作流、API 集成、国产直连。
不适合：克隆他人（授权红线）、开放权重、离线。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **克隆音色与官方音库的情绪表现差距**
- **API 与网页入口的模型版本是否同步**
- **声音克隆授权验证流程的实际严格度**

## 未知项清单

- 音频模型开放权重（未核验到官方声明）
- 各产品入口自身的备案状态（未逐一核验）
- 训练用途开关（未逐条核验）
- 音乐模型与语音模型的计费是否同池（未逐条核验）

## 相关条目

- [ElevenLabs](./elevenlabs.md) — 同为 TTS+克隆双能力：ElevenLabs 多语言面宽，MiniMax 中文向强。
- [fish audio](./fish-audio.md) — 同为克隆向：fish audio 社区音色库重，MiniMax 官方音库+API 重。
- [海螺视频](../video/products/hailuo-video.md) — 同厂不同产品线：海螺视频是视频线，本档案是音频线。
