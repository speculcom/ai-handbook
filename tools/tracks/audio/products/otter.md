---
id: otter
form: web
name: Otter.ai
nameEn: Otter.ai
vendor: Otter.ai
homepage: https://otter.ai
license: 免费档+订阅。按官方条款页管辖（otter.ai/terms-of-service 直抓核验 2026-10-22）；
  会议数据留存与训练口径细节未逐条核验。
licenseEn: Free tier + subscription. Governed by the official terms page (otter.ai/terms-of-service,
  direct-fetched 2026-10-22); meeting-data retention and training practices not verified line by line.

axes:
  model_access: >-
    自研转写/纪要模型线（Otter 自述转写引擎）；用户不选模型。
    曾有「用客户音频训练」的隐私争议史（2021-2022 公开报道叙事）——当前训练口径按官方
    隐私页（未逐条核验）。
  runtime: >-
    网页+移动 App+会议平台机器人接入（Zoom/Meet/Teams 机器人入会实时转写，官方产品面）；
    处理在厂商云端。
  local_files: >-
    会议录音/转写/纪要存账户侧云端；导出（txt/csv/srt 等）归本地。未见官方声明的本机处理形态。
  background: >-
    实时入会转写是核心形态（机器人常驻会议）；批处理上传并存；无「关机续跑」概念（云服务）。
  tools: >-
    实时转写+说话人分离+自动纪要/行动项（官方产品面）、Otter Chat（对转写提问，官方产品面）、
    协作编辑与分享；企业面有管理控制台（官网所见）。
  context: >-
    跨会议知识库是产品叙事（历史会议可检索/问答）——这是它的「记忆」面，细节未逐条核验。
  permissions: >-
    账号+订阅+企业体系（D9：价格不采）；免费档有月度转写分钟上限（官方定价页叙事，具体额度未逐条核验）；
    **会议录音涉多方隐私——机器人入会的知情同意是使用方责任**（条款口径未逐条核验）。
  fit: >-
    适合：会议记录/访谈整理（英文向成熟）、个人与小团队的转写纪要流水线。
    不适合：中文会议主打（转写引擎英文向叙事）、隐私极敏感场景（云端+机器人入会）、
    把免费档当长期方案（分钟数限制）。

pitfalls:
  - 机器人入会模式=第三方机器人进你的会议——企业使用前要过 IT/合规审查，知情同意是使用方责任
  - 「用客户音频训练」争议史（2021-2022 公开报道）——当前口径以官方隐私页为准，敏感场景读条款原文
  - 转写引擎英文向成熟——中文会议准确率要实测，别按英文体验推断

tags: [免费+订阅, 会议转写, 机器人入会, 英文向, 纪要行动项]
related: [deepgram, assemblyai, zapier]

sources:
  - label: Otter · 官网（产品与能力叙事）
    url: https://otter.ai
    kind: official
  - label: Otter · Terms of Service（官方条款，2026-10-22 直抓核验）
    url: https://otter.ai/terms-of-service
    kind: official
  - label: Otter · Blog（官方更新线，changelog）
    url: https://otter.ai/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Otter.ai（美国旧金山，原 Blue Note 公司）。
  origin_note_en: Otter.ai (San Francisco, US; formerly Blue Note).
  direct: yes
  direct_note: otter.ai 大陆直连实测 200（2026-10-22）。
  direct_note_en: otter.ai measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Otter 是「机器人入会」的会议转写纪要产品**：实时转写+行动项+跨会议问答，英文向成熟；
机器人进你的会议这件事本身要过合规。

## 适合与不适合

适合：英文会议/访谈记录、小团队纪要流水线。
不适合：中文会议主打、隐私极敏感场景、免费档当长期方案。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **中文/中英混说会议的转写准确率**
- **Otter Chat 对多场历史会议跨检索的召回质量**
- **机器人入会在企业 Zoom 策略限制下的实际可达性**

## 未知项清单

- 当前训练口径（隐私页未逐条核验——争议史后的政策走向要读原文）
- 免费档分钟额度的当前值（未逐条核验）
- 中文转写模型线（未核验到官方声明）

## 相关条目

- [Deepgram](./deepgram.md) — 上游对照：Otter 类产品的转写底座可以是 Deepgram/Whisper 这类引擎。
- [AssemblyAI](./assemblyai.md) — 同为转写+纪要向：AssemblyAI 给开发者 API，Otter 直接给终端用户产品。
- [Whisper](./whisper.md) — 开源基座对照：不想让会议音频出本机，就用 Whisper 自建管线。
- [Zapier](../../automation/products/zapier.md) — 纪要下游：Otter 导出的纪要常经 Zapier 类平台分发到任务/日历（建档后互链）。
