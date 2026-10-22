---
id: heygen
form: web
name: HeyGen
nameEn: HeyGen
vendor: HeyGen
homepage: https://www.heygen.com
license: 免费+订阅+企业档。按官方条款页管辖（heygen.com/terms 直抓核验 2026-10-22）；
  数字人克隆/声音克隆的授权条款是关键页，细节未逐条核验。
licenseEn: Free + subscription + enterprise tiers. Governed by the official terms page (heygen.com/terms,
  direct-fetched 2026-10-22); avatar/voice-clone consent clauses are the key page, details not verified
  line by line.

axes:
  model_access: >-
    数字人视频生成线：Avatar（数字人形象）+ Voice（配音/克隆）+ Translation（视频翻译/对口型）
    三条产品线（官网导航所见）；底层模型未逐条核验到官方声明。
  runtime: >-
    网页（heygen.com）+ API（官网有 API 入口，企业向）；生成在厂商云端。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见；下载归本地。
    未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）。
  tools: >-
    数字人形象库+真人克隆（需授权面）、声音克隆、**视频翻译+对口型**（多语言本地化是主打场景）、
    交互数字人线（官网所见）；模板/脚本驱动工作流。
  context: >-
    以项目/品牌空间组织（企业面）；跨会话记忆未核验到官方声明。数字人资产是它的「一致性」机制。
  permissions: >-
    账号+订阅+企业体系（D9：价格不采）；**克隆真人形象/声音的授权与验证机制是关键合规面**
    （官方有 consent 流程叙事，细节未逐条核验）。
  fit: >-
    适合：企业培训/营销视频本地化（翻译+对口型）、真人出镜替代（授权克隆）、批量口播视频。
    不适合：创意叙事生成、要「一眼 AI 感」的娱乐向、无授权克隆他人（条款红线）。

pitfalls:
  - 克隆真人形象/声音有授权验证流程——「克隆任何人」在条款上走不通，别按演示视频理解产品边界
  - 数字人视频与生成式视频（Runway 类）是两个物种——HeyGen 主功能是「人说话」，不是「造世界」
  - 视频翻译的对口型质量随语言差异大——用前按目标语言实测

tags: [免费+订阅, 数字人, 视频翻译, 对口型, 企业向]
related: [synthesia, d-id, runway, zapier]

sources:
  - label: HeyGen · 官网（产品与能力叙事）
    url: https://www.heygen.com
    kind: official
  - label: HeyGen · Terms（官方条款，2026-10-22 直抓核验）
    url: https://www.heygen.com/terms
    kind: official
  - label: HeyGen · Blog（官方更新线，changelog）
    url: https://www.heygen.com/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: HeyGen（美国洛杉矶，创始人 Josh Xu 等，公开叙事）。
  origin_note_en: HeyGen (Los Angeles, US; founders Josh Xu et al., public narrative).
  direct: no
  direct_note: heygen.com 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: heygen.com measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**HeyGen 是数字人视频台**：Avatar+Voice+Translation 三线，主打企业视频本地化（翻译+对口型）
与授权克隆口播；「人说话」的生成，不是「造世界」的生成。

## 适合与不适合

适合：培训/营销视频多语言本地化、授权真人克隆、批量口播。
不适合：创意叙事、娱乐向 AI 感、无授权克隆（条款红线）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **视频翻译对口型在中文↔小语种的实际质量**
- **克隆形象验证流程的实际严格度**
- **API 批量生产的渲染队列行为**

## 未知项清单

- 底层生成模型（未核验到官方声明）
- 交互数字人线的产品化状态（未逐条核验）
- 训练用途开关（未逐条核验）
- 大陆市场是否有合规入口（未核验）

## 相关条目

- [Synthesia](./synthesia.md) — 同为企业数字人双强：Synthesia 培训向更企业，HeyGen 克隆与翻译更灵活。
- [D-ID](./d-id.md) — 同为数字人口播：D-ID 照片驱动轻量，HeyGen 产品线更宽。
- [Runway](./runway.md) — 视频生成的另一物种：Runway 造画面，HeyGen 造「人说话」。
- [Zapier](../../automation/products/zapier.md) — API 下游：HeyGen API 常经 Zapier 类平台接进内容流水线，批量本地化才跑得起来。
