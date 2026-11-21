---
id: moyin
form: web
name: 魔音工坊
nameEn: Moyin Workshop
vendor: 出门问问
homepage: https://www.moyin.com
license: 免费试用+订阅。按官方用户协议页管辖（moyin.com/protocol，2026-11-21 取得）；声音复刻需会员并遵守授权条款（2026-11-21）。
licenseEn: Free trial plus subscription. Governed by the official user agreement (moyin.com/protocol, fetched 2026-11-21); voice cloning requires membership and compliance with consent terms (2026-11-21).

axes:
  model_access: >-
    出门问问自研 TTS 线：官方教程页标「第五代 TTS 引擎」、48k 超高清；声音克隆分高效版（在线录音 20 句，数小时）、品质版（100+ 句音频与文本，2–3 个工作日）、定制版（专业录制 500 句，5–7 个工作日），并开放 API 调用（2026-11-21）。
  runtime: >-
    网页 moyin.com 为主入口，另有 App、小程序与「序列猴子」开放平台 API；合成在厂商云端。编辑器内逐句试听、滑选试听与全文合成都在浏览器完成（2026-11-21）。
  local_files: >-
    专辑与文章存账户侧云端，专辑之间数据不互通；成品点「保存并生成音频文件」后下载 mp3 到本地。移动端与小程序共用账号体系（2026-11-21）。
  background: >-
    交互式编辑+合成：长文合成等待时间随文章长度增加，失败后联系客服或重新提交；工作流以逐句编辑、试听、再合成为主，没有可暂停的云端任务队列（2026-11-21）。
  tools: >-
    文本配音（多音色/情感/语速）、逐句试听、多音字/韵律/数字符号纠错、停顿与静音插入（默认段间 600ms）、多人配音（按段指派发音人）、声音转换、「捏声音」、视频云剪辑与一键解析视频（2026-11-21）。
  context: >-
    以「专辑」为项目上下文：每专辑有管理员/主编/编辑三类角色，数据与操作只属当前专辑，可实时切换；这是团队工作区隔离，不是对话记忆，音色资产负责跨文章一致性（2026-11-21）。
  permissions: >-
    账号+专辑管理员余额扣款；合成费用从当前专辑管理员账户扣除，余额不足则无法合成。声音克隆需搭配会员并在编辑器使用，克隆与商用授权按官方协议；协议禁止非法克隆 TTS 数据、侵犯他人声音权益（2026-11-21）。
  fit: >-
    适合：中文配音流水线（有声书/短视频/课件）、多人协作专辑、自有声音复刻、国内直连。不适合：克隆他人声音（授权红线）、要开放权重/离线部署、英文向主打（2026-11-21）。

pitfalls:
  - 算法备案（网信算备…号）≠生成式 AI 服务备案号——两套编号两套口径，引用别混
  - 声音复刻的授权验证与商用边界按官方协议——「功能可用」不等于「随便克隆」
  - 出门问问产品线多（魔音工坊/奇妙元等）——本档案只管魔音工坊，关联产品不在口径内

tags: [免费+订阅, 中文配音, 声音复刻, 国产直连, 算法备案]
related: [minimax-audio, fish-audio, hailuo-video]

sources:
  - label: 魔音工坊 · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://www.moyin.com
    kind: official
  - label: 魔音工坊 · 用户协议（官方条款，2026-11-21 直抓核验）
    url: https://www.moyin.com/protocol
    kind: official
  - label: 魔音工坊 · 官方动态页（更新线，changelog，2026-10-22 直抓核验）
    url: https://www.moyin.com/news
    kind: changelog
  - label: 网信办 · 算法备案查询平台（算法备案核验入口，2026-10-22 直抓核验可达）
    url: https://beian.cac.gov.cn/#/home
    kind: docs
  - label: 魔音工坊 · 使用帮助（逐句试听、多人配音与专辑隔离，2026-11-21 抓取 200）
    url: https://www.moyin.com/help?id=1
    kind: docs
  - label: 序列猴子开放平台 · 声音克隆（高效/品质/定制三档与 API 价格，2026-11-21 抓取 200）
    url: https://openapi.moyin.com/pages/voiceclone-introduce
    kind: docs
  - label: 魔音工坊 · 教程总览（第五代 TTS、48k 与功能教程，2026-11-21 抓取 200）
    url: https://www.moyin.com/overview/tutorial-guide
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 出门问问信息科技有限公司（中国）。
  origin_note_en: Mobvoi Information Technology Co., Ltd. (China).
  direct: yes
  direct_note: moyin.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: moyin.com measured 200 direct from mainland (2026-10-22).
  filing: unknown
  filing_note: 出门问问语音合成类算法在深度合成算法备案清单内（批次清单经第三方镜像转述，
    原始附件未直抓到——编号以 beian.cac.gov.cn 官方查询为准）；生成式 AI 服务备案号未核验到
    （2026-10-22 检索）——「未核验到」≠「未备案」。
  filing_note_en: Mobvoi's speech-synthesis algorithm appears in the deep-synthesis algorithm-filing list
    (the batch list was relayed via a third-party mirror; the original attachment was not directly fetched —
    the number should be confirmed on the official beian.cac.gov.cn portal); no generative-AI service filing
    number was found (searched 2026-10-22) — "not found" ≠ "not filed".
  verified: 2026-11-21
---

## 一句话定位

**魔音工坊是出门问问的中文配音工作台**：多音色文本配音+声音复刻+视频配音工作流，
算法备案在案；国内直连、中文客服面是它对国产用户的便利面。

## 适合与不适合

适合：中文配音流水线（有声书/短视频/课件）、自有声音复刻、国内直连。
不适合：克隆他人（红线）、开放权重、英文向主打。

## 实测记录

本档核对官网、帮助中心、声音克隆产品页与用户协议；克隆授权严格度、多人协作效率与情感粒度需按账号实测。
## 未知项清单

- 生成式 AI 服务备案号：按 beian.cac.gov.cn 查询（算法备案与服务备案分属两套编号）。
- 训练用途开关：按官方协议与隐私页核对。
- 商用授权的档位边界：按会员协议原文核对。
- 跨会话记忆：产品按专辑隔离，跨专辑不互通，对话式记忆不在产品面。
## 相关条目

- [MiniMax Audio](./minimax-audio.md) — 同为国产 TTS/克隆线：MiniMax API 向强，魔音工坊配音工作流向强。
- [fish audio](./fish-audio.md) — 同为复刻向：fish audio 社区音色生态，魔音工坊官方音色库+工作流。
- [ElevenLabs](./elevenlabs.md) — 国际对照：ElevenLabs 多语言面宽，魔音工坊中文配音工作流细。
- [海螺视频](../../video/products/hailuo-video.md) — 配音下游：配音成品常与 AI 视频素材拼成成片，两条线在短视频工作流里相遇（建档后互链）。
