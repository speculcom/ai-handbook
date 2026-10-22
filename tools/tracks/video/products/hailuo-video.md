---
id: hailuo-video
form: web
name: 海螺视频
nameEn: Hailuo Video
vendor: MiniMax（稀宇科技）
homepage: https://hailuoai.video
license: 免费+订阅。按官方条款页管辖（hailuoai.video/docs/terms-of-service 直抓核验 2026-10-22）；
  商用权按档位区分，细节未逐条核验。
licenseEn: Free + subscription. Governed by the official terms page (hailuoai.video/docs/terms-of-service,
  direct-fetched 2026-10-22); commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    MiniMax 自研视频模型线（海螺即其消费级视频入口，官方叙事）；用户不选裸模型。
    开放权重线：MiniMax 语言模型有开放权重先例，视频线未见官方开放声明。
  runtime: >-
    网页（hailuoai.video）+ App（官网导航所见）；生成在厂商云端。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见；下载归本地。
    未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）。
  tools: >-
    文生视频、图生视频为主功能（官网叙事）；镜头运动控制类能力线（官网文案所见，细节未逐条核验）。
  context: >-
    以账户作品页组织（生成历史可回看）；跨会话记忆未核验到官方声明。
    视频生成是一次性任务，没有「接着上次想」的概念。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验。
    备案：MiniMax 模型备案号 Shanghai-MiniMax-202505230046（阿里云百炼、百度智能云官方公示页交叉核验，
    2026-10-22）——这是模型层备案号；海螺视频产品入口的备案状态未单独核验。
  fit: >-
    适合：国产直连可用的文/图生视频、免费档起步试水、短视频素材产出。
    不适合：要模型自选、要开放权重、要企业级管理面。

pitfalls:
  - 「海螺」是产品名、「MiniMax」是公司/模型名——媒体报道常混用，转述时按官方页主语（L5）
  - 备案号 Shanghai-MiniMax-202505230046 是模型层备案（官方公示页主语是 MiniMax）——
    不等于「海螺视频产品入口已备案」，两者主语不同
  - hailuoai.video（海外入口）与国内入口的账号/内容政策是否一致，未核验——别按同一账号体系理解

tags: [免费+订阅, 国产直连, 文生视频, 图生视频, 自研模型]
related: [kling, jimeng, veo]

sources:
  - label: 海螺视频 · 官网（产品与能力叙事）
    url: https://hailuoai.video
    kind: official
  - label: 海螺视频 · Terms（官方条款，2026-10-22 直抓核验）
    url: https://hailuoai.video/docs/terms-of-service
    kind: official
  - label: 海螺视频 · Changelog（官方更新线）
    url: https://hailuoai.video/docs/changelog
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（备案号交叉核验源）
    url: https://docs.bailian.console.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: docs

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: MiniMax（上海稀宇极智科技有限公司，中国）。
  origin_note_en: MiniMax (Shanghai Xiyu Jizhi Technology Co., Ltd., China).
  direct: yes
  direct_note: hailuoai.video 大陆直连实测 200（2026-10-22）。
  direct_note_en: hailuoai.video measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_no: Shanghai-MiniMax-202505230046
  filing_note: MiniMax 模型备案号（阿里云百炼与百度智能云官方公示页交叉核验，2026-10-22）；
    主语是模型层——海螺视频产品入口的备案状态未单独核验。
  filing_note_en: MiniMax model-level filing number (cross-verified on Alibaba Cloud Bailian and Baidu
    Intelligent Cloud official disclosure pages, 2026-10-22); the subject is the model layer — the Hailuo
    video product entry's own filing status was not separately verified.
  verified: 2026-10-22
---

## 一句话定位

**海螺视频是 MiniMax 的消费级视频生成入口**（自研模型线，文/图生视频主功能）：
国产、大陆直连可用、免费档起步；备案号是模型层的，产品入口备案状态未单独核验。

## 适合与不适合

适合：国产直连的文/图生视频、免费试水、短视频素材。
不适合：模型自选、开放权重、企业级管理面。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **免费档与付费档的生成时长/分辨率差异**（D9：价格不采；配额行为实测）
- **镜头运动控制类能力的实际可控度**
- **海外入口与国内入口的作品/账号是否互通**

## 未知项清单

- 视频线开放权重（未核验到官方声明）
- 训练用途开关（未逐条核验）
- 产品入口自身的生成式 AI 服务备案状态（未单独核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [可灵](./kling.md) — 同为国产视频双强：可灵生态面（App/插件）更宽，海螺入口更轻。
- [即梦](../image/products/jimeng.md) — 同为国产图视频一体入口：即梦嵌剪映生态，海螺是独立视频站。
