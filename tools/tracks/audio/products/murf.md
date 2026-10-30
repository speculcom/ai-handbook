---
id: murf
form: web
name: Murf
nameEn: Murf
vendor: Murf AI
homepage: https://murf.ai
license: 按官方 Terms of Service 管辖（murf.ai/legal/terms-of-service 直抓核验 2026-10-30，主体 Murf Inc.）；
  具体条款细节与档位商用授权差异未逐条核验。
licenseEn: Governed by the official Terms of Service (murf.ai/legal/terms-of-service direct-fetched 2026-10-30,
  entity Murf Inc.); clause details and tier-bound commercial rights not verified item by item.

axes:
  model_access: >-
    自有语音模型线：官网导航当日分「Models（TTS API，官方口径 purpose built for voice agents）」与
    Creators（200+ 预置音色）两面；不开放选第三方模型。
  runtime: >-
    网页工作室（murf.ai）+ API（murf.ai/api，API 文档在 murf.ai/api/docs，当日直抓 200）；
    生成在 Murf 云端，本机不跑模型。集成面在册 Canva/Google Slides/PowerPoint 等。
  local_files: >-
    工作室工程与音频资产存于账户侧（官网导航有资产/工作室面）；未见官方声明的本机数据面——
    下载导出的音频文件归你本机，但工程与音色库在 Murf 云端。
  background: >-
    工作室渲染与 API 合成为任务形态；排队/续跑细节未逐条核验。
    Agents 线（AI Receptionist/Call Center 等）是实时对话形态，与工作室批处理不同轨。
  tools: >-
    三条产品线当日在册：Agents（语音 agent）、API（TTS/Voice Changer/Dubbing/Translation）、
    Creators（配音工作室+Voice Cloning）。MCP 支持未核验到官方声明。
  context: >-
    工作室按项目/工程组织；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（免费+订阅）；声音克隆授权线在官方 FAQ 在册——克隆页明言「未经同意的声音复制可能违法」
    「克隆名人声音不道德」（2026-10-30 直抓）；Instant 与 Professional 两档克隆形态在册。
  fit: >-
    适合：配音工作室+TTS API+语音 agent 一体的商用语音平台、要 200+ 预置音色不走克隆。
    不适合：要大陆直连备案入口、要选第三方模型、要本机跑模型。

pitfalls:
  - Murf 官网导航当日主打已转向 Agents（语音 agent 平台）——把它当「纯配音工具」会低估其 API/agent 线
  - 克隆官方 FAQ 只给法律风险提示、未给平台侧强制授权校验流程——「官方说了什么」与「平台拦了什么」是两回事（未逐条核验拦截面）
  - 旧文档域 docs.murf.ai 当日直连 000——现行 API 文档在 murf.ai/api/docs，别按旧域判死链

tags: [云端, TTS, 声音克隆, API, 语音agent, 免费+订阅, 商业]
related: [elevenlabs, fish-audio, heygen]

sources:
  - label: Murf · 官网（三产品线导航与 200+ 音色叙事，2026-10-30 直抓 200）
    url: https://murf.ai
    kind: official
  - label: Murf · Voice Cloning 页（Instant/Professional 两档+授权 FAQ，2026-10-30 直抓 200）
    url: https://murf.ai/voice-cloning
    kind: official
  - label: Murf · Terms of Service（主体 Murf Inc.，2026-10-30 直抓 200）
    url: https://murf.ai/legal/terms-of-service
    kind: official
  - label: Murf · API 文档（2026-10-30 直抓 200→/introduction/overview）
    url: https://murf.ai/api/docs
    kind: docs
  - label: Murf · API changelog（变更记录，2026-10-30 直抓 200）
    url: https://murf.ai/api/docs/changelog
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Murf Inc.（美国，Terms of Service 当日直抓在册）；未见于网信办公示名单。
  origin_note_en: Murf Inc. (US, on record in the Terms of Service direct-fetched same day); not in the CAC public registry.
  direct: yes
  direct_note: murf.ai 与 /pricing、/voice-cloning、/api/docs 大陆直连实测 200（2026-10-30）。
  direct_note_en: murf.ai and /pricing, /voice-cloning, /api/docs measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与批次 PDF 镜像，未见 Murf 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and batch PDF mirrors searched 2026-10-30; no Murf entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Murf 是「配音工作室 + TTS API + 语音 agent」三线一体的商用语音平台**（官网当日招牌已转向
AI Voice & Conversational Agent Platform）：200+ 预置音色主打，克隆是辅线，API 文档与 changelog 公开可核。

## 适合与不适合

适合：商用配音工作室、TTS API 接入、语音 agent（接待/客服/外呼）、200+ 预置音色。
不适合：要大陆直连备案入口、要选第三方模型、要本机跑模型。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（音频产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Instant 与 Professional 克隆的质量差与授权校验流程**（官方 FAQ 只给法律提示，平台侧拦截面未在册）
- **TTS API 的延迟与并发档位**（官方有 TTS Benchmarks 页自称可比 latency，第三方未复核）
- **免费/订阅档位的商用授权边界**（ToS 未逐条核验）

## 未知项清单

- 档位与商用授权的具体绑定（ToS 未逐条核验）
- 平台侧克隆授权校验流程（FAQ 只给法律提示）
- 训练用途开关路径与默认态（未核验到官方声明）
- Agents 线的模型底座（官方 Models 页自称自有语音模型，细节未在册）

## 相关条目

- [ElevenLabs](./elevenlabs.md) — 同为商用 TTS 双产品线：ElevenLabs 克隆与音色市场更重，Murf 工作室与 agent 线更重。
- [fish audio](./fish-audio.md) — 同为 TTS+克隆：fish 主打 zero-shot 与音色市场，Murf 主打预置音色与商用配音。
- [HeyGen](../../video/products/heygen.md) — 语音+形象合成常搭伙：HeyGen 出数字人视频，Murf 出配音轨。
