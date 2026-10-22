---
id: assemblyai
form: cloud
name: AssemblyAI
nameEn: AssemblyAI
vendor: AssemblyAI
homepage: https://www.assemblyai.com
license: 免费额度+按量（API 平台姿态）。按官方条款页管辖（assemblyai.com/terms 直抓核验 2026-10-22）；
  数据留存与训练口径细节未逐条核验。
licenseEn: Free credits + usage-based (API-platform posture). Governed by the official terms page
  (assemblyai.com/terms, direct-fetched 2026-10-22); data retention and training practices not verified
  line by line.

axes:
  model_access: >-
    自研统一语音理解模型线（best-seller 叙事：一个模型转写+理解，官方站点）；
    托管 API 形态，开发者不选裸模型权重。
  runtime: >-
    API/SDK 为主入口（REST + WebSocket + SDK，官方文档面）；预录文件转写是传统强项，
    实时流端点并存（官方文档）。
  local_files: >-
    云端 API——音频经 API 上传；数据留存策略按条款（未逐条核验）；
    官方有「不用于训练」类承诺叙事（站点所见），条款级细节未逐条核验。
  background: >-
    批处理（文件→结果轮询/webhook）+ 实时流双形态；无「关机续跑」概念（API 服务）。
  tools: >-
    转写+说话人分离+摘要+主题/实体/情感等理解层参数（官方文档列面全）；
    LeMUR 线（转写后 LLM 问答/抽取，官方文档叙事）——「转写+理解」一体化是它的差异叙事。
  context: >-
    API 无记忆概念；LeMUR 对既有转写做问答是「转写产物上的 LLM」，不是产品记忆。
  permissions: >-
    API key+用量计费（D9：价格不采）；企业合规叙事（SOC2/HIPAA 类认证线官网所见，细节未逐条核验）；
    数据留存/训练开关按条款（未逐条核验）。
  fit: >-
    适合：开发者做「转写+理解」管线（摘要/抽取/问答一步到位）、英文向高准确率、
    文档化体验优先的团队。
    不适合：非开发者直接使用、隐私敏感音频（云端）、中文向主打。

pitfalls:
  - 与 Deepgram 同是 API 平台不是终端产品——差异在 AssemblyAI 把「理解层」（摘要/实体/问答）做进 API
  - 「不用于训练」类承诺要落到条款与 DPA 才算数——站点叙事≠条款原文（未逐条核验）
  - 转写质量按语言/口音波动——官方基准英文向，中文场景要自测

tags: [API平台, 转写+理解, LeMUR, 开发者向, 英文向]
related: [deepgram, whisper, chatgpt]

sources:
  - label: AssemblyAI · 官网（产品与能力叙事）
    url: https://www.assemblyai.com
    kind: official
  - label: AssemblyAI · Terms（官方条款，2026-10-22 直抓核验）
    url: https://www.assemblyai.com/terms
    kind: official
  - label: AssemblyAI · Changelog（文档更新线）
    url: https://www.assemblyai.com/changelog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: AssemblyAI（美国旧金山/丹佛双线叙事）。
  origin_note_en: AssemblyAI (San Francisco / Denver dual-line narrative, US).
  direct: yes
  direct_note: assemblyai.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: assemblyai.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**AssemblyAI 是「转写+理解」一体化的语音 API**：转写之上做摘要/实体/问答（LeMUR 线），
文档化体验是它的开发者口碑；与 Deepgram 的实时性能叙事错位竞争。

## 适合与不适合

适合：转写后理解管线（摘要/抽取/问答）、英文向、文档体验优先团队。
不适合：非开发者直接使用、隐私敏感音频、中文向主打。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **LeMUR 问答对长会议转写的召回质量**
- **说话人分离在中文会议的实际表现**
- **「不用于训练」承诺的条款落点**（DPA 原文）

## 未知项清单

- 数据留存与训练条款细节（未逐条核验）
- 中文模型档位状态（未逐条核验）
- 企业合规认证清单细节（未逐条核验）

## 相关条目

- [Deepgram](./deepgram.md) — 转写 API 双雄：Deepgram 实时流强，AssemblyAI 理解层强。
- [Whisper](./whisper.md) — 开源基座对照：AssemblyAI 的转写底座与 Whisper 类开源模型的准确率差要自测。
- [Otter](./otter.md) — 终端产品对照：Otter 直接给用户用，AssemblyAI 给造产品的人用。
- [ChatGPT](../../chat/products/chatgpt.md) — 理解层对照：AssemblyAI 的 LeMUR 与「转写丢给 ChatGPT 做摘要」是同一需求的两条路。
