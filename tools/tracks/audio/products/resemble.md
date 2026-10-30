---
id: resemble
form: web
name: Resemble AI
nameEn: Resemble AI
vendor: Resemble AI
homepage: https://www.resemble.ai
license: 按官方 Terms of Service 管辖（resemble.ai/terms-of-service 直抓核验 2026-10-30）；
  主体名条款页以 "Resemble AI" 出现（当日抓取未见 Inc. 后缀在册）；具体条款细节未逐条核验。
licenseEn: Governed by the official Terms of Service (resemble.ai/terms-of-service direct-fetched 2026-10-30);
  the entity appears as "Resemble AI" in the fetched text (no "Inc." suffix on record in the same-day fetch);
  clause details not verified item by item.

axes:
  model_access: >-
    自有检测模型线当日在册：RAD-S1（官方口径 first System One model for AI agent detection）、
    DETECT-World（world model architecture for detection）、PerTh（多模态水印）；
    生成侧 Chatterbox 等语音模型转入 Research Archive（开源保留、不再作商用付费产品，docs 当日在册）。
  runtime: >-
    云端 API 平台（docs.resemble.ai 当日在册：Detect/Watermark/Identity/Meetings 等端点）+
    即用面（Meetings 机器人入 Zoom/Teams/Google Meet、Chrome 扩展）；本机不跑模型。
  local_files: >-
    未见官方声明的本机数据面；检测提交与结果在 Resemble 云端。Chatterbox 开源权重可本机跑（Research Archive 线）。
  background: >-
    API 任务形态（提交检测作业/轮询结果，docs 在册）；Meetings 是实时入会检测形态。
  tools: >-
    产品面当日在册：Deepfake Detection（音视频图）、Watermarking（C2PA provenance）、Identity（声纹注册比对）、
    Intelligence（可读结论）、Agent Detection、Audio Source Tracing；docs 提供 MCP server（docs.resemble.ai/_mcp/server 在册）。
  context: >-
    无会话概念——API 作业与注册身份（声纹/肖像）是持久面，作业间不共享上下文；
    跨会话记忆不适用（检测平台形态）。
  permissions: >-
    企业向（Contact Sales 主打）；身份注册面（Enroll and authenticate a voice）涉生物特征——
    授权与合规面（EU AI Act Article 50 合规清单资源页在册）是重点维度。
  fit: >-
    适合：企业反深伪（会议防护/客服欺诈/KYC/媒体水印）、AI agent 检测、C2PA 溯源合规。
    不适合：找 TTS/声音克隆托管服务（商用语音线已撤，见 pitfalls）、个人免费使用、大陆直连备案入口。

pitfalls:
  - **定位已整体转向**——官网当日招牌是「Multimodal Deepfake Detection and Watermarking」，不是声音克隆厂商；docs 的 Voice Archive 页明言 Chatterbox 等生成模型「remain open and free…no longer offered as commercial paid products」——按旧印象把它当 TTS/克隆平台建档会整体错位
  - Voice Archive 文档保留但官方明言「do not imply continued availability of commercial voice services」——历史 API 文档在册≠服务仍在售
  - 条款页当日抓取未见 Inc. 主体后缀——主体全称未核验清，如实按在册文本写（未知就说未知）

tags: [云端, 深度伪造检测, 声音水印, API平台, 企业向]
related: [elevenlabs, assemblyai, heygen]

sources:
  - label: Resemble AI · 官网（检测/水印/身份产品线与 RAD-S1/DETECT-World/PerTh 模型线，2026-10-30 直抓 200）
    url: https://www.resemble.ai
    kind: official
  - label: Resemble AI · Voice Archive（生成语音线转研究归档的官方声明，2026-10-30 直抓 200）
    url: https://docs.resemble.ai/voice-archive
    kind: official
  - label: Resemble AI · Terms of Service（2026-10-30 直抓 200）
    url: https://www.resemble.ai/terms-of-service
    kind: official
  - label: Resemble AI · Product Changelog（官方更新日志，2026-10-30 直抓 200）
    url: https://www.resemble.ai/changelog
    kind: changelog
  - label: Resemble AI · docs（API 平台文档含 MCP server 入口，2026-10-30 直抓 200）
    url: https://docs.resemble.ai/welcome
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（条款页当日在册文本为 "Resemble AI"，全称后缀未在册；未见于网信办公示名单）。
  origin_note_en: foreign entity (terms-page text same day reads "Resemble AI"; full legal suffix not on record;
    not in the CAC public registry).
  direct: yes
  direct_note: resemble.ai 与 /changelog、/terms-of-service、docs.resemble.ai 大陆直连实测 200（2026-10-30）。
  direct_note_en: resemble.ai and /changelog, /terms-of-service, docs.resemble.ai measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页，未见 Resemble 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page searched 2026-10-30; no Resemble entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Resemble AI 已从「声音克隆厂商」整体转向「多模态深伪检测与水印」企业平台**（官网当日招牌在册）：
检测（RAD-S1/DETECT-World）、水印（PerTh/C2PA）、身份注册三线；生成语音线转入开源研究归档、不再商用售卖。

## 适合与不适合

适合：企业反深伪（会议防护/客服欺诈/KYC/媒体水印）、AI agent 检测、C2PA 溯源合规。
不适合：找 TTS/声音克隆托管服务（商用语音线已撤）、个人免费使用、大陆直连备案入口。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（音频产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **深伪检测的假阳性率**（官方有 Benchmarks 页自称可比，第三方未复核——检测类产品的生死线指标）
- **Meetings 机器人入会的实际延迟与覆盖**（Zoom/Teams/Google Meet 三平台在册，实测面未核验）
- **Chatterbox 开源权重与已撤商用托管线的功能差**（归档声明在册，差异未逐条核验）

## 未知项清单

- 主体全称（条款页当日抓取未见 Inc. 后缀在册）
- 商用语音线下架的具体时间与存量客户迁移安排（归档声明在册，细节未在册）
- 检测 API 档位与价格（企业向 Contact Sales，未逐条核验）
- 身份注册面（声纹生物特征）的数据留存与删除政策（privacy-policy 页未逐条核验）

## 相关条目

- [ElevenLabs](./elevenlabs.md) — 镜像对照：ElevenLabs 卖语音生成+克隆并附带 AI 检测面，Resemble 反过来把检测做成主业、生成线退归档。
- [AssemblyAI](./assemblyai.md) — 同为音频 API 平台：AssemblyAI 做转写理解，Resemble 做真伪鉴别。
- [HeyGen](../../video/products/heygen.md) — 检测面覆盖合成视频：HeyGen 这类数字人视频正是深伪检测要鉴别的对象形态之一。
