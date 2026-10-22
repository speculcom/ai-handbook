---
id: tiangong
form: web
name: 天工 AI 搜索
nameEn: Tiangong AI Search
vendor: 昆仑万维
homepage: https://www.tiangong.cn
license: 免费+订阅。按官方协议页管辖（tiangong.cn/agreement 直抓核验 2026-10-22）；
  细节未逐条核验。
licenseEn: Free + subscription. Governed by the official agreement page (tiangong.cn/agreement,
  direct-fetched 2026-10-22); details not verified line by line.

axes:
  model_access: >-
    自研「天工」大模型线（备案号 Beijing-TianGong-20231016，网信办 2024-04 备案汇总附件直抓核验）；
    产品现定位「超级智能体」（官网标题叙事）——搜索+文档/PPT/表格/网页多模式生成。
  runtime: >-
    网页（tiangong.cn）+ App（官网所见）；检索与生成在厂商云端；国内直连可用。
  local_files: >-
    生成的文档/PPT/表格与历史存账户侧云端；下载归本地。未见官方声明的其他本机数据面。
  background: >-
    搜索即时；文档/PPT/表格/网页模式是生成任务线（官网产品面）；无「关机续跑」概念。
  tools: >-
    AI 搜索（起家功能）+ 超级智能体多模式（极速/文档/PPT/表格/网页，官网产品面）、
    做同款（模板复用线，官网所见）；昆仑万维产品线多（Skywork 开源模型线/Mureka 音乐等——
    不在本档案口径）。
  context: >-
    以任务/历史组织智能体产物；站内直抓所见「记忆」功能文案（跨会话记忆的产品边界未逐条核验）。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验。
    备案：天工大模型 Beijing-TianGong-20231016（网信办批次汇总表镜像直抓，2026-10-22）；
    算法备案「天工大语言模型算法」覆盖天工 AI 搜索多端（公示叙事）。
  fit: >-
    适合：中文搜索+办公产物一条龙（PPT/表格/文档直接生成）、国内直连、模板复用工作流。
    不适合：英文向检索主打、把生成产物当免审成品（PPT/表格要人工复核）。

pitfalls:
  - 天工从「AI 搜索」转向「超级智能体」是产品定位变化——旧评测口径（纯搜索对比）已过时
  - 昆仑万维产品线多（开源 Skywork/Mureka/SkyReels 等）——本档案只管 tiangong.cn 消费端
  - 生成 PPT/表格的「一条龙」质量随主题波动——产物要人工复核再交付

tags: [免费+订阅, 超级智能体, 中文搜索, PPT生成, 国产直连]
related: [metaso, genspark, perplexity, manus]

sources:
  - label: 天工 · 官网（产品与能力叙事）
    url: https://www.tiangong.cn
    kind: official
  - label: 天工 · 协议页（官方条款，2026-10-22 直抓核验）
    url: https://www.tiangong.cn/agreement
    kind: official
  - label: 天工 · 官网首页（产品更新公告入口，changelog——首页直抓所见「Skywork OfficeSpace 1.0 正式上线」「数字人视频智能体正式上线」等公告文案，2026-10-22）
    url: https://www.tiangong.cn
    kind: changelog
  - label: 网信办 · 生成式人工智能服务已备案信息（2024-04 公告，附件汇总表直抓核验——「天工」大模型条目 Beijing-TianGong-20231016 所见，2026-10-22）
    url: https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm
    kind: docs

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 昆仑万维科技股份有限公司（中国，A 股 300418）。
  origin_note_en: Kunlun Tech Co., Ltd. (China; A-share 300418).
  direct: yes
  direct_note: tiangong.cn 大陆直连实测 200（2026-10-22）。
  direct_note_en: tiangong.cn measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_no: Beijing-TianGong-20231016
  filing_note: 天工大模型备案号（网信办 2024-04 公告附件汇总表直抓核验，2026-10-22，
    主体昆仑万维科技股份有限公司，条目日期 2023/11/3）；
    算法备案「天工大语言模型算法」另见深度合成清单（两套编号别混引）。
  filing_note_en: Tiangong model filing number (CAC April-2024 announcement attachment, direct-fetched and
    verified 2026-10-22, filer Kunlun Tech Co., Ltd., entry dated 2023-11-03); the algorithm filing
    "Tiangong LLM algorithm" is a separate number — don't cross-quote the two systems.
  verified: 2026-10-22
---

## 一句话定位

**天工从「AI 搜索」长成了「超级智能体」**：搜索打底，文档/PPT/表格/网页多模式直接出产物，
「做同款」模板复用；国产直连可用。

## 适合与不适合

适合：中文搜索+办公产物一条龙、模板复用、国内直连。
不适合：英文检索主打、产物免审直接交付。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **PPT 模式对中文排版/字体的还原质量**
- **表格模式的数据抽取准确率**（上传表格→结构化）
- **「做同款」模板的实际复用边界**

## 未知项清单

- 当前驱动模型版本（天工 4.0 等版本叙事未逐项核验）
- 订阅档的功能边界（未逐条核验）
- 训练用途开关（未逐条核验）
- 各模式的产物商用授权面（未逐条核验协议原文）

## 相关条目

- [秘塔 AI 搜索](./metaso.md) — 同为国产 AI 搜索：秘塔守检索+学术纵深，天工转向多模式产物生成。
- [Genspark](./genspark.md) — 同为「搜索→产物」一条龙：Genspark 海外叙事，天工国产直连。
- [Perplexity](./perplexity.md) — 对照口径：Perplexity 答案引擎为主，天工已超搜索形态。
