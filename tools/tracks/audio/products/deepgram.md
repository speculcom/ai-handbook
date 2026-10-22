---
id: deepgram
form: cloud
name: Deepgram
nameEn: Deepgram
vendor: Deepgram
homepage: https://www.deepgram.com
license: 免费额度+按量/订阅（API 平台姿态）。按官方条款管辖（deepgram.com 站点条款线，
  2026-10-22 直抓核验站点可达）；输出数据留存与训练口径细节未逐条核验。
licenseEn: Free credits + usage-based/subscription (API-platform posture). Governed by official terms
  (deepgram.com site terms line, reachability direct-fetched 2026-10-22); data retention and training
  practices not verified line by line.

axes:
  model_access: >-
    自研语音模型族（Nova 系转写模型、Aura 系 TTS 模型——官方文档 models 页列线，
    developers.deepgram.com/docs/models 直抓核验 2026-10-22）；开发者选模型档位不训练自有模型
    （托管 API 形态）。
  runtime: >-
    API/SDK 为主入口（REST + WebSocket + 各语言 SDK，官方文档面）；**实时流式转写是主打**
    （WebSocket 流式端点官方文档化）；另有浏览器/预录文件端点。
  local_files: >-
    云端 API——音频经 API 上传处理；数据留存策略按官方条款（未逐条核验）。
  background: >-
    实时流式是核心形态（边说边转）；批处理端点并存；无「关机续跑」概念（API 服务）。
  tools: >-
    转写（多语言/关键词 boosts/标点/说话人分离参数面）、TTS（Aura 线）、语音理解参数面
    （官方文档所见）；开发者工具链（SDK/示例/延迟指标文档化）。
  context: >-
    API 无记忆概念——会话上下文完全由调用方（集成方）自己管理，多轮修正靠应用层拼。
  permissions: >-
    API key 体系+用量计费（D9：价格不采）；企业面有合规叙事（SOC2 类认证线官网所见，细节未逐条核验）；
    数据留存/训练开关按条款（未逐条核验）。
  fit: >-
    适合：开发者做实时语音应用（客服/会议/字幕流）、低延迟转写 API 集成、英文向高准确率。
    不适合：非开发者直接使用（它是 API 平台不是终端产品）、隐私敏感音频（云端处理）、中文向主打。

pitfalls:
  - Deepgram 是 API 平台不是终端产品——「用 Deepgram 转写会议」实际是「用 Deepgram 造一个转写产品」
  - 实时流式与批处理是不同端点不同计费面——按单一「转写服务」理解会错配
  - 转写质量按语言/口音/领域波动——官方基准是英文向叙事，中文场景要自测

tags: [API平台, 实时流式, 转写, TTS, 开发者向]
related: [assemblyai, whisper, zapier]

sources:
  - label: Deepgram · 官网（产品与能力叙事）
    url: https://www.deepgram.com
    kind: official
  - label: Deepgram · 开发者文档 models 页（模型线，2026-10-22 直抓核验）
    url: https://developers.deepgram.com/docs/models
    kind: docs
  - label: Deepgram · 文档 Changelog（更新线）
    url: https://developers.deepgram.com/changelog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Deepgram（美国旧金山）。
  origin_note_en: Deepgram (San Francisco, US).
  direct: yes
  direct_note: deepgram.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: deepgram.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Deepgram 是开发者向的语音 API 平台**：Nova 转写 + Aura TTS 双线，实时流式转写是主打；
它是「造语音产品」的底座，不是终端转写产品。

## 适合与不适合

适合：实时语音应用（客服/会议/字幕流）、低延迟 API 集成、英文向高准确率。
不适合：非开发者直接使用、隐私敏感音频、中文向主打。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **WebSocket 流式的端到端延迟实测**（官方延迟指标 vs 真实网络）
- **中文/中英混说转写准确率**（官方基准是英文向叙事）
- **数据留存开关的实际生效面**

## 未知项清单

- 数据留存与训练用途条款细节（未逐条核验）
- 中文模型档位的当前状态（未逐条核验）
- 企业合规认证清单细节（未逐条核验）

## 相关条目

- [AssemblyAI](./assemblyai.md) — 同为转写 API 双雄：AssemblyAI 产品化文档体验好，Deepgram 实时流性能叙事强。
- [Whisper](./whisper.md) — 开源基座对照：Whisper 本地免费隐私边界，Deepgram 托管实时性能。
- [Otter](./otter.md) — 终端产品对照：Otter 是会议转写产品，Deepgram 常是这类产品的上游 API。
- [Zapier](../../automation/products/zapier.md) — 管线下游：Deepgram 转写结果常经 Zapier 类平台接进工单/CRM 流程（建档后互链）。
