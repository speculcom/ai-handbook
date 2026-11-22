---
id: xinghuo-spark
form: web
name: 讯飞星火
nameEn: iFlytek Spark
vendor: 科大讯飞
homepage: https://xinghuo.xfyun.cn
license: 免费+登录（部分能力需订阅）。输出内容归属与训练口径按官方协议与隐私政策管辖；个性化记忆可跨会话引用历史对话（2026-11-21）。
licenseEn: Free with login (some capabilities need a subscription). Output ownership and training terms follow the official agreement and privacy policy; personalised memory can reference history across sessions (2026-11-21).

axes:
  model_access: >-
    主力是科大讯飞自研星火（Spark）系列，官方有版本迭代线。V 系列版本号在官方新闻页可查。讯飞开放平台是开发者 API 线，同厂商另一接口。应用内模型档位以登录后界面为准。

    对话产品不开放第三方模型选择（2026-11-21）。
  runtime: >-
    网页（xinghuo.xfyun.cn）+ iOS/Android App + PC 客户端。生成在讯飞云端处理，本机不跑模型。

    星火主线不开源权重，与 DeepSeek/GLM/Qwen 的“权重同族”路线不同。同厂商星火 MaaS 平台另列模型精调与托管推理（2026-11-21）。
  local_files: >-
    对话历史存于讯飞账号侧。文档、图片、音频、视频的上传与解析都在讯飞云端进行。官方个人信息收集清单把文档知识问答列为云端识别。客户端只承担输入与展示，不提供本地模型或离线索引。

    下载的生成内容归本机（2026-11-21）。
  background: >-
    对话即时返回，官方页未单列异步任务队列。深度研究、录音纪要等长任务在云端执行。关闭页面后是否续跑需按具体入口实测。

    产品没有用户可暂停、续跑或导出作业状态的队列面板（2026-11-21）。
  tools: >-
    产品内可见联网搜索、文档问答、AI 写作、解题答疑、深度研究、录音纪要与星火智能体。官网智能体页列出私域知识库、Web 应用与智能体 API 发布。官方文档未列 MCP 服务器。

    MCP 接入需自行封装（2026-11-21）。
  context: >-
    会话按对话组织并登录同步。官方个人信息收集清单把「问答历史」列为连续性体验数据，并把「个性化内容生成」描述为记忆提取与召回、可跨会话跨时间参考历史对话。

    跨会话记忆有产品层开关与粒度。具体默认态以应用内设置为准（2026-11-21）。
  permissions: >-
    账号以手机号注册。官方个人信息收集清单逐项列出对话、图片、音视频、文档、历史与设备信息的收集目的。训练用途与个性化记忆开关在应用内隐私设置管理。

    默认态与关闭路径按应用内页面核对（2026-11-21）。
  fit: >-
    适合：语音交互密集场景（讯飞语音底座强）、中文问答与解题答疑、教育/办公文档场景。

    不适合：要本机跑模型（星火主线不开源权重）、要脱离讯飞账号，或需要可审计的跨会话记忆默认关闭能力（2026-11-21）。
pitfalls:
  - 把 xinghuo.xfyun.cn（对话产品）与讯飞开放平台 xfyun.cn（API/能力平台）混为一谈——同厂商两接口
  - 把星火当开源权重族——星火主线不开源，「本地跑星火」这条线不成立
  - 语音强项是讯飞底座——但「语音能力」在产品内的具体形态（实时同传/声音复刻）要按官方页逐项核，别整块照搬宣传

tags: [国产, 免费+登录, 语音强项, 教育向, 已备案]
related: [wenxin, doubao-chat, chatglm-chat, dify]

sources:
  - label: 讯飞星火 · 官网（产品入口与能力叙事，2026-11-21 抓取 200）
    url: https://xinghuo.xfyun.cn
    kind: official
  - label: 讯飞星火 · 协议页（官方页，2026-10-22 直抓核验）
    url: https://xinghuo.xfyun.cn/protocol
    kind: official
  - label: 讯飞星火 · News（产品更新入口，changelog，2026-11-21 抓取 200）
    url: https://xinghuo.xfyun.cn/news
    kind: changelog
  - label: 全国生成式人工智能服务已备案信息汇总表（星火认知大模型 备案号交叉核验，2026-11-21 检索）
    url: https://www.dg.gov.cn/attachment/0/356/356708/4423787.xlsx
    kind: official

  - label: 讯飞星火 · SparkDesk 隐私政策（对话、图片、音视频信息范围，2026-11-21 抓取 200）
    url: https://www.xfyun.cn/doc/spark/PrivacyPolicy.html
    kind: docs
  - label: 讯飞星火 · 个人信息收集清单（问答历史与个性化记忆，2026-11-21 抓取 200）
    url: https://xinghuo.xfyun.cn/policy/%E8%AE%AF%E9%A3%9E%E6%98%9F%E7%81%AB%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF%E6%94%B6%E9%9B%86%E6%B8%85%E5%8D%95v2
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 科大讯飞（科大讯飞股份有限公司，合肥）。
  origin_note_en: iFlytek (iFlytek Co., Ltd., Hefei).
  direct: yes
  direct_note: xinghuo.xfyun.cn 大陆直连实测 200（2026-10-22）。
  direct_note_en: xinghuo.xfyun.cn measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 星火认知大模型
  filing_name_en: Xinghuo Cognitive LLM
  filing_no: Anhui-XingHuoRenZhiDaMoXing-20230823
  filing_date: 2023-08-23
  filing_note: 首批备案（备案时间 2023-08-23，属地安徽）；备案号经全国已备案信息汇总表（东莞市政府镜像附件）交叉核验。
  filing_note_en: first-batch filing (2023-08-23, Anhui); filing no. cross-verified via the national filed-services
    summary table (mirrored as a Dongguan government attachment).
  verified: 2026-11-21
---

## 一句话定位

**讯飞星火是语音底座突出的国产对话产品**（讯飞自研星火系列，语音识别/合成/同传是传统强项）：
教育/办公场景友好，首批备案（2023-08-23）。
星火主线不开源权重。

## 适合与不适合

适合：语音交互密集、中文问答解题、教育办公文档。
不适合：要本机跑模型、要脱离讯飞账号。

## 实测记录

本档核对官网、协议页与个人信息收集清单的能力和权限边界。
语音质量、深度研究续跑与记忆默认态需按账号实测。
## 未知项清单

- 深度研究、录音纪要等长任务关闭页面后的续跑行为：官方页未单列，按具体入口实测。
- 星火各版本在对话产品内的实际路由：版本号在官方新闻可见，应用内档位以登录后界面为准。
- 个性化记忆的默认态与关闭路径：官方清单说明能力存在，开关位置按应用内隐私设置核对。
## 相关条目

- [文心](./wenxin.md) — 同为国产大厂对话入口：文心泡百度生态，星火胜语音底座。
- [豆包](./doubao-chat.md) — 同为国产通用对话：豆包重文生图与抖音登录，星火重语音与教育向。
