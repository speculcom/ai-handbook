---
id: jimeng
form: web
name: 即梦
nameEn: Jimeng AI
vendor: 字节跳动（剪映团队）
homepage: https://jimeng.jianying.com
license: 免费+积分+会员订阅。官方协议页（jimeng.jianying.com/agreement 直抓核验 2026-10-22）；
  生成作品的使用与水印规则按该协议与站内会员说明管辖，条款细节未逐条核验。
licenseEn: Free + credits + membership tiers. Governed by the official agreement page
  (jimeng.jianying.com/agreement, direct-fetched 2026-10-22); usage and watermark rules for generated works
  follow that agreement and the in-site membership notes — clause details not verified line by line.

axes:
  model_access: >-
    图片线主力是字节 Seedream 系列（站内版本叙事可见「图片 4.0」等档位），视频线是 Seedance 系列——
    即梦是这两族模型的 C 端产品入口。模型由字节侧上架，用户选档位不选裸模型；
    具体当前清单以登录后界面为准。
  runtime: >-
    网页（jimeng.jianying.com）+ iOS/Android App；生成在字节云端处理，本机不跑模型。
    与剪映生态深度联动（一键分享抖音等）是官方叙事的一部分。
  local_files: >-
    生成作品与上传素材存于账户侧云端；下载归本地。未见官方声明的本机数据面。
  background: >-
    生成任务在云端排队执行（积分制与「加速」通道是产品语义）；离开页面后任务继续——
    云端队列形态与通用对话产品的「即时返回」不同。
  tools: >-
    产品内含文生图、图片编辑（局部消除/重绘）、智能画布、文生视频/图生视频、视频对口型/补帧等能力线
    （官网与 App 说明所见）；社区「做同款」是它的传播面。
  context: >-
    以作品/会话组织；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（抖音登录为主）；免费积分每日赠送+充值+会员三档获取（D9：价格数字不采）；
    会员档位含「去除品牌水印」权益——水印规则按档位变化，用前看站内说明。
  fit: >-
    适合：中文语义出图、图+视频一站式、抖音生态发布链路。
    不适合：要模型自选、要无水印免费出图（水印与档位绑定）、要本机跑模型。

pitfalls:
  - 「ICP 备案」与「生成式 AI 服务备案」是两回事——即梦站点有 ICP 备案号（脸萌公司主体），
    其模型的生成式 AI 服务备案号本站未核验到官方公示，别把 ICP 号当 AI 备案号引用
  - 即梦同时是图片（Seedream）与视频（Seedance）入口——本档案覆盖其图片主轴，视频向与 video 大类档案对照
  - 「图片 4.0 限时免费」类站内促销有时效——引用档位权益前先核站内当前说明

tags: [国产, 免费+积分+会员, 中文语义, 图视频一体, 抖音生态]
related: [doubao-chat, kling, tongyi-wanxiang]

sources:
  - label: 即梦 · 官网（产品与档位叙事）
    url: https://jimeng.jianying.com
    kind: official
  - label: 即梦 · 协议页（官方页，2026-10-22 直抓核验）
    url: https://jimeng.jianying.com/agreement
    kind: official
  - label: 即梦 · 官网更新叙事（产品与模型迭代入口，changelog）
    url: https://jimeng.jianying.com/ai-tool/home
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 字节跳动（产品主体深圳市脸萌科技有限公司，剪映系）。
  origin_note_en: ByteDance (product entity Shenzhen Lianmeng Technology Co., Ltd.; CapCut lineage).
  direct: yes
  direct_note: jimeng.jianying.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: jimeng.jianying.com measured 200 direct from mainland (2026-10-22).
  filing: unknown
  filing_note: 站点有 ICP 备案（粤ICP备13065114号系列）；其图片/视频模型的生成式 AI 服务备案号
    未核验到官方公示页（2026-10-22 检索）——「未核验到」不等于「未备案」，且 ICP 号不是 AI 备案号。
  filing_note_en: the site carries an ICP filing (粤ICP备13065114 series); no generative-AI service filing no.
    verified on official disclosure pages for its image/video models (searched 2026-10-22) — "not verified"
    does not mean "not filed", and an ICP number is not an AI-service filing.
  verified: 2026-10-22
---

## 一句话定位

**即梦是字节剪映系的「中文出图+视频一站式」C 端入口**（Seedream 图片 / Seedance 视频）：
抖音生态发布链路是差异点；水印与会员档位绑定，ICP 备案≠生成式 AI 服务备案（后者未核验到）。

## 适合与不适合

适合：中文语义出图、图视频一体、抖音发布链路。
不适合：要模型自选、要免费无水印、要本机跑模型。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **免费积分的实际日额度与过期规则**（D9：价格不采；额度行为要实测）
- **图片 4.0 档位当前是否仍限免**（站内促销有时效）
- **生成式 AI 服务备案公示位置**（站内是否公示所用模型备案号）

## 未知项清单

- 生成式 AI 服务备案号（未核验到官方公示）
- 当前模型档位完整清单（以登录后界面为准）
- 跨会话记忆机制（未核验到官方声明）
- 训练用途开关路径与默认态（未逐条核验）

## 相关条目

- [豆包](../chat/products/doubao-chat.md) — 同厂不同入口：豆包是对话里的文生图，即梦是专职创作台。
- [通义万相](./tongyi-wanxiang.md) — 同为国产图视频一体创作台：万相有开源权重线，即梦没有。
