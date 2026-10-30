---
id: cartesia
form: web
name: Cartesia
nameEn: Cartesia
vendor: Cartesia AI, Inc.
homepage: https://cartesia.ai
license: 按官方 Terms of Service 管辖（cartesia.ai/legal/terms 直抓核验 2026-10-30，主体 Cartesia AI, Inc.）；
  具体条款细节与档位商用授权差异未逐条核验。
licenseEn: Governed by the official Terms of Service (cartesia.ai/legal/terms direct-fetched 2026-10-30,
  entity Cartesia AI, Inc.); clause details and tier-bound commercial rights not verified item by item.

axes:
  model_access: >-
    自有模型线当日在册：Sonic（TTS）、Ink（speech to text/转录模型）+ Managed Agents（语音 agent 托管）；
    44 语言语音面在册；不开放选第三方模型。
  runtime: >-
    云端 API + 托管 agent（docs.cartesia.ai 当日在册）；官网招牌 Realtime AI models and voice agents——
    低延迟实时合成是主打；本机不跑模型。
  local_files: >-
    未见官方声明的本机数据面；合成与转录结果在 Cartesia 云端账户侧，
    下载的音频文件归本机但会话记录与音色配置不落地。
  background: >-
    API 形态（流式合成为主打叙事）；Managed Agents 是常驻托管形态；排队/续跑细节未逐条核验。
  tools: >-
    产品面当日在册：Sonic TTS、Ink STT、Voice Agents（客服/预约/外呼/SDR/招聘筛选场景页在册）；
    docs 站完整（get-started/changelog 2026 在册）。MCP 支持未核验到官方声明。
  context: >-
    Voice Agents 线有会话状态面（客服场景）；具体记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（免费+订阅+企业 Contact Sales）；克隆音色授权面未逐条核验（docs 面未细读）。
  fit: >-
    适合：低延迟实时 TTS（voice agent 底座）、44 语言覆盖、托管语音 agent 开箱。
    不适合：要大陆直连备案入口、要选第三方模型、要本机跑模型。

pitfalls:
  - 主打是「实时低延迟」——官方 latency 数字是自家口径（docs/官网在册），第三方未复核；选型对比时按同条件自测
  - Ink 是语音转文本模型（不是 TTS 附属功能）——把它当「TTS 厂商的转写副线」会低估其独立模型线定位
  - 官网 changelog 页 404——现行 changelog 在 docs.cartesia.ai/changelog（2026 年在册），别按主域路径判更新面缺失

tags: [云端, TTS, 语音agent, 多语言, API平台, 免费+订阅, 商业]
related: [elevenlabs, murf, botpress]

sources:
  - label: Cartesia · 官网（Sonic/Ink/Managed Agents/44 语言产品线，2026-10-30 直抓 200）
    url: https://cartesia.ai
    kind: official
  - label: Cartesia · Terms of Service（主体 Cartesia AI, Inc.，2026-10-30 直抓 200）
    url: https://cartesia.ai/legal/terms
    kind: official
  - label: Cartesia · docs（get-started 概览，2026-10-30 直抓 200）
    url: https://docs.cartesia.ai
    kind: docs
  - label: Cartesia · docs changelog（2026 年更新线，2026-10-30 直抓 200）
    url: https://docs.cartesia.ai/changelog
    kind: changelog
  - label: Cartesia · Pricing（档位面，2026-10-30 直抓 200）
    url: https://cartesia.ai/pricing
    kind: official

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Cartesia AI, Inc.（条款页当日直抓在册主体；卡内基梅隆背景未逐条核验，按条款页在册口径写 foreign）。
  origin_note_en: Cartesia AI, Inc. (entity on record in the terms page direct-fetched same day; CMU background not verified
    item by item, recorded as foreign per the terms-page evidence).
  direct: yes
  direct_note: cartesia.ai 与 /pricing、/legal/terms、docs.cartesia.ai 大陆直连实测 200（2026-10-30）。
  direct_note_en: cartesia.ai and /pricing, /legal/terms, docs.cartesia.ai measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页，未见 Cartesia 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page searched 2026-10-30; no Cartesia entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Cartesia 是「实时低延迟 TTS（Sonic）+ 转录模型（Ink）+ 托管语音 agent」三线平台**
（Cartesia AI, Inc.，条款当日在册）：44 语言语音面，voice agent 底座场景（客服/外呼/招聘筛选）主打。

## 适合与不适合

适合：低延迟实时 TTS（voice agent 底座）、44 语言覆盖、托管语音 agent 开箱。
不适合：要大陆直连备案入口、要选第三方模型、要本机跑模型。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（音频产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **官方 latency 口径下的端到端首包延迟**（官方自称 realtime，第三方未复核；与 ElevenLabs/Murf 同条件对测最有信息量）
- **Ink 转录的中文覆盖与质量**（44 语言是语音面总口径，Ink 单独语言面未逐条核验）
- **Managed Agents 的通话成本结构**（分钟计费细节未逐条核验）

## 未知项清单

- 档位价格具体数字（pricing 页 JS 渲染，未逐条抓取）
- 克隆音色授权校验流程（docs 面未细读）
- Sonic 模型架构细节（官方有 Research/News 页，未逐条核验）
- MCP 支持（未核验到官方声明）

## 相关条目

- [ElevenLabs](./elevenlabs.md) — 同为商用 TTS 平台：ElevenLabs 音色市场与克隆生态更重，Cartesia 主打实时延迟与托管 agent。
- [Murf](./murf.md) — 同为 TTS+语音 agent 双线：Murf 有配音工作室面，Cartesia 纯 API/托管面无工作室。
- [Botpress](../../automation/products/botpress.md) — 语音 agent 栈的两层：Botpress 做客服 agent 编排平台，Cartesia 可做其语音底座（TTS/STT 层）。
