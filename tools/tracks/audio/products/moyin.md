---
id: moyin
form: web
name: 魔音工坊
nameEn: Moyin Workshop
vendor: 出门问问
homepage: https://www.moyin.com
license: 免费试用+订阅。按官方服务协议页管辖（moyin.com/agreement/service 直抓核验 2026-10-22）；
  声音复刻授权条款是关键页，细节未逐条核验。
licenseEn: Free trial + subscription. Governed by the official service agreement page
  (moyin.com/agreement/service, direct-fetched 2026-10-22); voice-cloning consent clauses are the key page,
  details not verified line by line.

axes:
  model_access: >-
    出门问问自研语音合成线（官方算法备案「出门问问语音合成类算法」覆盖魔音工坊——网信办公示叙事）；
    平台内多音色/多情感配音线；用户选音色不选裸模型。
  runtime: >-
    网页（moyin.com）为主入口；配音在厂商云端。未见官方离线权重线。
  local_files: >-
    工程与成品存账户侧云端（工程可回看编辑）；下载归本地。未见官方声明的本机数据面。
  background: >-
    编辑+合成是交互形态（文字编辑实时试听，改一句重听一句）；无「关机续跑」概念。
  tools: >-
    文本配音（多音色/情感/语速控制）、**声音复刻**（官方产品面）、视频配音工作流
    （字幕对齐/多角色配音线，官网所见）；出海线（奇妙元等关联产品叙事——不在本档案口径）。
  context: >-
    以工程（项目）组织；跨会话记忆未核验到官方声明。音色资产是「一致性」机制。
  permissions: >-
    账号+订阅体系（D9：价格不采）；**声音复刻授权线是必答项**——官方协议有授权口径
    （agreement 页直抓在案），细节未逐条核验（收录标准 3）。
    算法备案：出门问问语音合成类算法（服务面含魔音工坊）在深度合成算法备案清单内——
    编号以官方查询平台 beian.cac.gov.cn 为准（清单批次经第三方镜像转述，未直抓到原始附件）；
    算法备案与服务备案是两套编号。
  fit: >-
    适合：中文配音工作流（有声书/短视频/课件）、自有声音复刻、国内直连与中文客服面。
    不适合：克隆他人声音（授权红线）、要开放权重、英文向主打。

pitfalls:
  - 算法备案（网信算备…号）≠生成式 AI 服务备案号——两套编号两套口径，引用别混
  - 声音复刻的授权验证与商用边界按官方协议——「功能可用」不等于「随便克隆」
  - 出门问问产品线多（魔音工坊/奇妙元等）——本档案只管魔音工坊，关联产品不在口径内

tags: [免费+订阅, 中文配音, 声音复刻, 国产直连, 算法备案]
related: [minimax-audio, fish-audio, hailuo-video]

sources:
  - label: 魔音工坊 · 官网（产品与能力叙事）
    url: https://www.moyin.com
    kind: official
  - label: 魔音工坊 · 服务协议（官方条款，2026-10-22 直抓核验）
    url: https://www.moyin.com/agreement/service
    kind: official
  - label: 魔音工坊 · 官方动态页（更新线，changelog，2026-10-22 直抓核验）
    url: https://www.moyin.com/news
    kind: changelog
  - label: 网信办 · 算法备案查询平台（算法备案核验入口，2026-10-22 直抓核验可达）
    url: https://beian.cac.gov.cn/#/home
    kind: docs

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

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
  verified: 2026-10-22
---

## 一句话定位

**魔音工坊是出门问问的中文配音工作台**：多音色文本配音+声音复刻+视频配音工作流，
算法备案在案；国内直连、中文客服面是它对国产用户的便利面。

## 适合与不适合

适合：中文配音流水线（有声书/短视频/课件）、自有声音复刻、国内直连。
不适合：克隆他人（红线）、开放权重、英文向主打。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **声音复刻的授权验证流程实际严格度**
- **多角色配音工作流的效率**（对比 ElevenLabs/studio 类）
- **情感控制的粒度与稳定性**

## 未知项清单

- 生成式 AI 服务备案号（未核验到——见 cn 块）
- 训练用途开关（未逐条核验）
- 商用授权的档位边界（未逐条核验协议原文）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [MiniMax Audio](./minimax-audio.md) — 同为国产 TTS/克隆线：MiniMax API 向强，魔音工坊配音工作流向强。
- [fish audio](./fish-audio.md) — 同为复刻向：fish audio 社区音色生态，魔音工坊官方音色库+工作流。
- [ElevenLabs](./elevenlabs.md) — 国际对照：ElevenLabs 多语言面宽，魔音工坊中文配音工作流细。
- [海螺视频](../../video/products/hailuo-video.md) — 配音下游：配音成品常与 AI 视频素材拼成成片，两条线在短视频工作流里相遇（建档后互链）。
