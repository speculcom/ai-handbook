---
id: xinghuo-spark
form: web
name: 讯飞星火
nameEn: iFlytek Spark
vendor: 科大讯飞
homepage: https://xinghuo.xfyun.cn
license: 免费+登录（部分能力需订阅）。官方协议页（xinghuo.xfyun.cn/protocol 直抓核验 2026-10-22）；
  输出内容归属与训练口径按该协议管辖，具体条款细节未逐条核验。
licenseEn: Free with login (some capabilities need a subscription). Governed by the official agreement page
  (xinghuo.xfyun.cn/protocol, direct-fetched 2026-10-22); output ownership and training terms follow that
  agreement — clause details not verified line by line.

axes:
  model_access: >-
    主力是科大讯飞自研星火（Spark）系列——官方有版本迭代线（V 系列版本号在官方新闻页可查）；
    讯飞开放平台（xfyun.cn）是开发者 API 线，同厂商另一接口。应用内模型档位以登录后界面为准。
  runtime: >-
    网页（xinghuo.xfyun.cn）+ iOS/Android App + PC 客户端；生成在讯飞云端处理，本机不跑模型。
    星火主线不开源权重（与 DeepSeek/GLM/Qwen 不同）。
  local_files: >-
    对话历史存于账户侧；文档/图片解析在云端进行。未见官方声明的本机数据面。
  background: >-
    对话即时返回；异步任务队列形态未核验到官方声明。产品含「深度研究」类长任务能力线（官方新闻页叙事），
    执行是否可离开页面续跑未核验。
  tools: >-
    产品内含联网搜索、文档解析、AI 写作、解题答疑、深度研究等能力线（官网导航所见）；
    语音能力（识别/合成/同传）是讯飞的传统强项，在产品内是差异点。MCP 支持未逐条核验。
  context: >-
    会话历史登录同步；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（手机号注册）；训练用途开关路径未逐条核验。星火模型备案号见 cn 块（官方公示交叉核验）。
  fit: >-
    适合：语音交互密集场景（讯飞语音底座强）、中文问答+解题答疑、教育/办公文档场景。
    不适合：要本机跑模型（星火不开源权重）、要脱离讯飞账号。

pitfalls:
  - 把 xinghuo.xfyun.cn（对话产品）与讯飞开放平台 xfyun.cn（API/能力平台）混为一谈——同厂商两接口
  - 把星火当开源权重族——星火主线不开源，「本地跑星火」这条线不成立
  - 语音强项是讯飞底座——但「语音能力」在产品内的具体形态（实时同传/声音复刻）要按官方页逐项核，别整块照搬宣传

tags: [国产, 免费+登录, 语音强项, 教育向, 已备案]
related: [wenxin, doubao-chat, chatglm-chat, dify]

sources:
  - label: 讯飞星火 · 官网（产品入口与能力叙事）
    url: https://xinghuo.xfyun.cn
    kind: official
  - label: 讯飞星火 · 协议页（官方页，2026-10-22 直抓核验）
    url: https://xinghuo.xfyun.cn/protocol
    kind: official
  - label: 讯飞星火 · News（产品更新入口，changelog）
    url: https://xinghuo.xfyun.cn/news
    kind: changelog
  - label: 全国生成式人工智能服务已备案信息汇总表（星火认知大模型 备案号交叉核验）
    url: https://www.dg.gov.cn/attachment/0/356/356708/4423787.xlsx
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 科大讯飞（科大讯飞股份有限公司，合肥）。
  origin_note_en: iFlytek (iFlytek Co., Ltd., Hefei).
  direct: yes
  direct_note: xinghuo.xfyun.cn 大陆直连实测 200（2026-10-22）。
  direct_note_en: xinghuo.xfyun.cn measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 星火认知大模型
  filing_no: Anhui-XingHuoRenZhiDaMoXing-20230823
  filing_date: 2023-08-23
  filing_note: 首批备案（备案时间 2023-08-23，属地安徽）；备案号经全国已备案信息汇总表（东莞市政府镜像附件）交叉核验。
  filing_note_en: first-batch filing (2023-08-23, Anhui); filing no. cross-verified via the national filed-services
    summary table (mirrored as a Dongguan government attachment).
  verified: 2026-10-22
---

## 一句话定位

**讯飞星火是语音底座突出的国产对话产品**（讯飞自研星火系列，语音识别/合成/同传是传统强项）：
教育/办公场景友好，首批备案（2023-08-23）；星火主线不开源权重。

## 适合与不适合

适合：语音交互密集、中文问答解题、教育办公文档。
不适合：要本机跑模型、要脱离讯飞账号。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **应用内模型档位选择器实际形态**（登录后才可见）
- **训练用途开关路径与默认态**
- **「深度研究」长任务能否离开页面续跑**（异步边界未核验）

## 未知项清单

- 应用内模型档位分流（未登录核实）
- 训练用途开关路径与默认态（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 「深度研究」任务的执行位置与续跑行为（未核验）

## 相关条目

- [文心](./wenxin.md) — 同为国产大厂对话入口：文心泡百度生态，星火胜语音底座。
- [豆包](./doubao-chat.md) — 同为国产通用对话：豆包重文生图与抖音登录，星火重语音与教育向。
