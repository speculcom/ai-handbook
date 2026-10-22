---
id: pixverse
form: web
name: PixVerse
nameEn: PixVerse
vendor: 爱诗科技
homepage: https://pixverse.ai
license: 免费+订阅。按官方条款页管辖（pixverse.ai/en/terms-of-service 直抓核验 2026-10-22）；
  商用权按档位区分，细节未逐条核验。
licenseEn: Free + subscription. Governed by the official terms page (pixverse.ai/en/terms-of-service,
  direct-fetched 2026-10-22); commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    自研模型线（官方发布叙事：V5/C1 视频模型、R1/R2 通用实时世界模型——R 系列主打实时交互生成）；
    用户不选裸模型。开放权重线未核验到官方声明。
  runtime: >-
    网页（pixverse.ai）+ App（官网导航所见）；生成在厂商云端。R 系列的「实时」是云端流式生成，不是本地跑。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见；下载归本地。
    未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；R 系列实时线是差异点（官方叙事：边生成边交互）；
    无「关机续跑」任务面（未核验到声明）。
  tools: >-
    文生视频、图生视频、视频风格化/特效模板线（官网导航所见）；R 系列实时世界模型面向互动影游/
    数字人场景（官方发布叙事）；特效玩法模板是它的社区向抓手。
  context: >-
    以账户作品组织；跨会话记忆未核验到官方声明。R 系列的「状态延续」是模型内能力，不是产品记忆。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验。
    备案：爱诗多模态 Beijing-AiShiDuoMoTai-202507250115 + 爱诗通用实时 Beijing-AiShiTongYongShiShi-202608010283
    （阿里云百炼官方公示页 + 北京市政府官网动态页交叉核验，2026-10-22）——主语是模型层。
  fit: >-
    适合：特效模板/玩法向短视频、社交传播素材、实时交互场景试水（R 系列）、国产直连。
    不适合：要模型自选、要开放权重、严肃影视级长镜头主打。

pitfalls:
  - 「实时世界模型」（R 系列）≠「本地实时」——生成仍在云端，卖点是延迟与交互性
  - 备案主语是模型（爱诗多模态/爱诗通用实时）——不等于 pixverse.ai 海外站产品入口自身的备案状态
  - 特效模板向是它的社区抓手——按「严肃影视工具」理解会错判它的产品重心

tags: [免费+订阅, 国产直连, 特效模板, 实时世界模型, 社交向]
related: [kling, vidu, jimeng]

sources:
  - label: PixVerse · 官网（产品与能力叙事）
    url: https://pixverse.ai
    kind: official
  - label: PixVerse · Terms（官方条款，2026-10-22 直抓核验）
    url: https://pixverse.ai/en/terms-of-service
    kind: official
  - label: PixVerse · Blog（官方更新线，changelog）
    url: https://pixverse.ai/en/blog
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
  origin_note: 北京爱诗科技有限公司（中国）。
  origin_note_en: Beijing Aishi Technology Co., Ltd. (China).
  direct: yes
  direct_note: pixverse.ai 大陆直连实测 200（2026-10-22）。
  direct_note_en: pixverse.ai measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_no: Beijing-AiShiDuoMoTai-202507250115
  filing_note: 爱诗多模态备案号（阿里云百炼官方公示页核验，2026-10-22）；R 系列另有
    Beijing-AiShiTongYongShiShi-202608010283（北京市政府官网动态页交叉）。主语是模型层。
  filing_note_en: Aishi multimodal filing number (verified on Alibaba Cloud Bailian's official disclosure page,
    2026-10-22); the R-series line has its own number Beijing-AiShiTongYongShiShi-202608010283 (cross-checked
    on the Beijing municipal government site). The subject is the model layer.
  verified: 2026-10-22
---

## 一句话定位

**PixVerse 是爱诗科技的视频生成入口**：特效模板/玩法向是社区抓手，R 系列「通用实时世界模型」
押注实时交互生成；国产阵营里产品迭代节奏最快的一档。

## 适合与不适合

适合：特效玩法短视频、社交素材、实时交互场景试水、国产直连。
不适合：模型自选、开放权重、严肃影视长镜头主打。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **R 系列实时交互的实际延迟与一致性**（官方叙事 vs 真实体验）
- **特效模板的商用授权面**（模板素材的版权链）
- **免费档与付费档的时长/水印差异**（D9：价格不采；行为实测）

## 未知项清单

- 开放权重线（未核验到官方声明）
- R 系列对第三方开发者的开放面（未核验到官方声明）
- 训练用途开关（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [可灵](./kling.md) — 同为国产视频头部：可灵生态与真实感向，PixVerse 玩法与实时向。
- [Vidu](./vidu.md) — 同为国产自研：Vidu 主打一致性控制，PixVerse 主打模板玩法与实时。
- [即梦](../image/products/jimeng.md) — 同为国产玩法向创作台：即梦图视频一体嵌剪映生态，PixVerse 是独立视频站。
