---
id: cartesia
form: web
name: Cartesia
nameEn: Cartesia
vendor: Cartesia AI, Inc.
homepage: https://cartesia.ai
license: 按官方 Terms of Service 管辖（cartesia.ai/legal/terms 2026-11-21 取得，主体 Cartesia AI, Inc.）；档位商用授权差异以 Terms 与 Order Form 为准。
licenseEn: Governed by the official Terms of Service (cartesia.ai/legal/terms fetched 2026-11-21, entity Cartesia AI, Inc.); tier-bound commercial rights follow the Terms and Order Form.

axes:
  model_access: >-
    自有模型线：Sonic（TTS，sonic-2 支持 15 种语言、90ms 模型延迟；sonic-turbo 低至 40ms）、Ink（STT，Ink-Whisper 流式转写）+ Managed Agents。

    不开放选第三方模型。官网另有 44 语言叙事，逐语言能力以 TTS Models 页的 15 语言表为准（2026-11-21）。
  runtime: >-
    云端 API + 托管 agent。Sonic/Ink 通过 Cartesia API 提供流式请求。官方 quickstart 以 API key 鉴权。

    Managed Agents 在云端托管电话/客服类语音 agent。本机不跑模型，官方文档未给本地推理包（2026-11-21）。
  local_files: >-
    不读写用户本机文件。合成音频由 API 流式返回，下载后归本机。音色与 agent 配置保存在 Cartesia 账户侧。官方文档未列本地模型缓存或离线工程文件（2026-11-21）。
  background: >-
    API 以流式和请求-响应为主。Managed Agents 是云端常驻托管。官方文档提供 agent 部署与电话集成。未列用户可暂停/续跑的作业队列。

    批量合成需客户端自行排队与重试（2026-11-21）。
  tools: >-
    官方 docs 列 Sonic TTS、Ink STT、Agents、API Reference、MCP、LiveKit、Pipecat、Rasa、Twilio 等集成。

    cartesia-mcp 是官方 MCP Server。可在 Cursor/Claude Desktop/OpenAI Agents 中列音色、跑 TTS（2026-11-21）。
  context: >-
    Voice Agents 在单次会话内维护对话状态与转写上下文。官方 Agents 文档把会话编排交给 agent 层。跨会话长期记忆、用户画像与持久知识库官方文档未列。

    需外部存储自行实现（2026-11-21）。
  permissions: >-
    账号分免费、订阅与企业（Contact Sales）。企业可配 SSO/组织。Terms 要求用户对上传的音色样本拥有授权，克隆音色不得冒充他人。API key 按项目签发，权限随账号角色。

    具体条款以 Terms 2026-11-21 版为准。
  fit: >-
    适合：低延迟实时 TTS（voice agent 底座）、15 语言覆盖、托管语音 agent 开箱。不适合：要大陆直连备案入口、要选第三方模型、要本机跑模型（2026-11-21）。
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

  - label: Cartesia · docs TTS Models（Sonic 15 语言与延迟，2026-11-21 抓取 200）
    url: https://docs.cartesia.ai/build-with-cartesia/tts-models
    kind: docs
  - label: Cartesia · docs MCP（官方 cartesia-mcp 服务器，2026-11-21 抓取 200）
    url: https://docs.cartesia.ai/integrations/mcp
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Cartesia AI, Inc.（条款页在册主体；卡内基梅隆背景不扩展推断，按条款页口径写 foreign）。
  origin_note_en: Cartesia AI, Inc. (entity on record in the terms page direct-fetched same day; CMU background not verified
    item by item, recorded as foreign per the terms-page evidence).
  direct: yes
  direct_note: cartesia.ai 与 /pricing、/legal/terms、docs.cartesia.ai 大陆直连实测 200（2026-10-30）。
  direct_note_en: cartesia.ai and /pricing, /legal/terms, docs.cartesia.ai measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页，未见 Cartesia 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page searched 2026-10-30; no Cartesia entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**Cartesia**：「实时低延迟 TTS（Sonic）+ 转录模型（Ink）+ 托管语音 agent」三线平台：（Cartesia AI, Inc.，条款当日在册）。44 语言语音面，voice agent 底座场景（客服/外呼/招聘筛选）主打。

## 适合与不适合

适合：低延迟实时 TTS（voice agent 底座）、44 语言覆盖、托管语音 agent 开箱。
不适合：要大陆直连备案入口、要选第三方模型、要本机跑模型。

## 实测记录

本档核对官方 docs 的模型、集成与权限面。
音频质量、端到端延迟与中文覆盖需按同一测试集自测。

## 未知项清单

- 档位价格具体数字：pricing 页未在本档抓取，按账号页与销售报价核对。
- 克隆音色授权校验流程：以 Terms 与 docs 的 voice cloning 条款为准。
- Sonic 模型架构细节：官方 Research 页未展开，按模型页能力表核对。
- MCP 支持：已由官方 cartesia-mcp 文档确认，覆盖范围按该页所列工具。
## 相关条目

- [ElevenLabs](./elevenlabs.md) — 同为商用 TTS 平台：ElevenLabs 音色市场与克隆生态更重，Cartesia 主打实时延迟与托管 agent。
- [Murf](./murf.md) — 同为 TTS+语音 agent 双线：Murf 有配音工作室面，Cartesia 纯 API/托管面无工作室。
- [Botpress](../../automation/products/botpress.md) — 语音 agent 栈的两层：Botpress 做客服 agent 编排平台，Cartesia 可做其语音底座（TTS/STT 层）。
