---
id: doubao-chat
form: web
name: 豆包
nameEn: Doubao
vendor: 字节跳动
homepage: https://www.doubao.com/
license: 免费 + 付费套餐。按官方《豆包用户服务协议》§9.1：公司不主张输出内容所有权，个人版授予用户免费使用权；API 侧按火山引擎《豆包模型服务协议》另线管辖（2026-11-21）。
licenseEn: Free plus paid plans. Per §9.1 of the official Doubao User Service Agreement, the company claims no ownership of output and grants personal-edition users a free right of use; the API line is separately governed by the Volcengine Doubao Model Service Agreement (2026-11-21).

axes:
  model_access: >-
    豆包消费端跑字节 Seed 家族。官方 Seed 2.1 发布页给出 Pro 与 Turbo 双档，标 1M 上下文和多模态理解。
    发布页还写明：在豆包电脑版或豆包 App 选择办公任务模式即可体验。
    火山方舟模型列表另列两个型号：`doubao-seed-2-1-pro-260915` 与 `doubao-seed-2-1-lite-260915`。
    两者都标 1024K 上下文、多模态、GUI 与工具调用。另有一个周级更新的 `doubao-seed-evolving`。
    App 内具体档位以登录界面为准（2026-11-21）。
  runtime: >-
    网页 doubao.com、iOS/Android App、PC 客户端与「豆包工作」桌面端都能用。
    生成在字节云端，本机不跑模型。企业级模型接口经火山方舟另线提供（2026-11-21）。
  local_files: >-
    上传的文档、图片、录音与生成文件都存账户侧。隐私政策写明：PPT、写作等生成文件自动存云盘。
    录音转写的纪要、原文与音频也自动存云盘。文档可在云盘查阅管理，下载才落到本地（2026-11-21）。
  background: >-
    对话流式返回。「办公任务」模式会在会话内多步规划，产出文档、表格、PPT 与网页。
    它属于前台任务，不形成关机后续跑的离线队列。录音转写与会议纪要在云端处理，结果落云盘（2026-11-21）。
  tools: >-
    对话侧支持文字、语音、图片与文件，也支持联网搜索和文档解析。
    产出侧覆盖 PPT、写作、表格、文生图与生视频。
    另有翻译与同声传译、录音转写、屏幕共享/视频通话、编程与应用发布，以及记忆功能。
    桌面端可操作虚拟桌面与浏览器，也能定点编辑文档、PPT 与网页（2026-11-21）。
  context: >-
    记忆功能默认开启。它会从对话里提炼兴趣、偏好与习惯，作为后续回复的背景。
    可在【设置-记忆】开关、逐条查阅或删除，也可一键删除全部。对话中还能直接要求记住或忘记。
    同一账号的记忆互通，不同账号与不同智能体之间隔离。
    关闭开关后不再更新或参考记忆，但旧记忆不会自动删除（2026-11-21）。
  permissions: >-
    账号体系，分免费档与付费套餐。个人版隐私政策 §1.10 写明：在加密、去标识化且不可重识别的前提下，
    输入、指令与回复可能用于分析与模型训练。可在 App 的「设置-隐私与权限-帮助模型改进效果」关闭。
    PC 与网页在「设置-帮助模型改进效果」关闭。记忆与云盘可分别管理；API 侧走火山引擎另一套协议（2026-11-21）。
  fit: >-
    适合：中文日常问答与办公产出，要记忆与云盘一体化，要 App、PC、网页多端同步，要录音转写与同传。
    不适合：要本机跑模型，要自由换模型，或要合同级 API 数据条款（后者走火山方舟）（2026-11-21）。

pitfalls:
  - 把 App 隐私政策套到火山方舟 API——两条线训练口径相反（App 默认可能训练、API 默认不训练）
  - 把「帮助模型改进效果」开关当成删除历史——它只管未来训练
  - 把豆包消费线与火山方舟当同一产品——主体与条款都不同

tags: [中文, 文生图, 语音, 境内存储]

related: [midjourney]

sources:
  - label: 豆包 · 官网（对话与工作入口，2026-11-21 抓取 200）
    url: https://www.doubao.com/
    kind: official
  - label: 豆包 · 隐私政策（记忆、云盘、录音转写与训练退出，2026-11-21 抓取 200）
    url: https://www.doubao.com/legal/privacy-policy
    kind: docs
  - label: 豆包 · 记忆功能 FAQ（开关、逐条删除、全部删除与账号内同步，2026-11-21 抓取 200）
    url: https://www.doubao.com/legal/memory_faq
    kind: docs
  - label: 豆包 · 用户协议（§9.1 输出所有权与免费使用权，2026-11-21 抓取 200）
    url: https://www.doubao.com/legal/terms
    kind: docs
  - label: 火山方舟 · 模型列表（Seed 2.1 Pro/Lite 1024K、多模态、GUI 与工具调用，2026-11-21 抓取 200）
    url: https://docs.volcengine.com/docs/ark/model-list?lang=zh
    kind: docs
  - label: 火山方舟 · Seed 2.1 模型页（Pro/Turbo/Evolving 与多模态边界，2026-11-21 抓取 200）
    url: https://www.volcengine.com/docs/82379/2549861?lang=zh
    kind: docs
  - label: 字节跳动 Seed · Seed 2.1 发布（豆包办公任务模式入口，2026-11-21 抓取 200）
    url: https://seed.bytedance.com/zh/blog/seed2-1-officially-released-advancing-ai-productivity
    kind: docs
  - label: 豆包 · 电脑版下载页（文档/表格/PPT/生图生视频与虚拟桌面，2026-11-21 抓取 200）
    url: https://www.doubao.com/download/desktop
    kind: official
  - label: 火山方舟 · 模型发布公告（Seed 2.1 / Evolving 更新记录，2026-11-21 抓取 200）
    url: https://ark.volcengine.com/region:cn-beijing/docs/model-release-announcement
    kind: changelog

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 字节跳动（北京）。
  origin_note_en: ByteDance (Beijing).
  direct: yes
  direct_note: doubao.com 大陆直连实测 200。
  direct_note_en: doubao.com measured 200 direct.
  filing: filed
  filing_note: 首批第 3 行；抖音官方备案公示页确认「豆包大模型」即此编号（2024-08 算法备案由云雀更名为豆包）。
  filing_note_en: Listed in the CAC registry as "Yunque LLM" (Doubao's predecessor; Beijing-YunQue-20230821, filed 2023-08-31).
  verified: 2026-11-21
  filing_name: 云雀大模型（豆包前身）
  filing_name_en: Yunque LLM (Doubao's predecessor)
  filing_no: Beijing-YunQue-20230821
  filing_date: 2023-08-31
---

## 一句话定位

中文日常问答与文生图的国产主力：App 训练开关自助可关，
「App 默认可能训练、API 默认不训练」是两条线相反口径、最容易被混的一组条款。

## 适合与不适合

适合中文日常问答、文生图与语音对话场景，境内直连可用、已备案。
在意训练用途就关「帮助模型改进效果」开关（只管未来对话）；企业数据走火山方舟 API 线。
要本机跑模型或自由换模型，它不合适——去看本地模型运行器与开源框架。

## 实测记录

本档核对豆包官网、隐私政策、记忆 FAQ、用户协议、Seed 2.1 发布与火山方舟模型列表；各端功能差异、记忆条数上限与办公任务产物质量需按账号实测。
## 未知项清单

- App 内模型档位与 Seed 2.1 Pro/Lite 的逐项映射：以登录后界面为准。
- 记忆条数上限与覆盖策略：记忆 FAQ 说明超上限时最近记忆覆盖最早记忆，具体上限以产品页为准。
- 办公任务模式的端侧差异：以各端实际开放功能为准。
## 相关条目

- [ChatGPT](./chatgpt.md) — 通用对话对照：训练开关与反馈口径不同
- [Kimi](./kimi-chat.md) — 同为国产通用对话：Kimi 退出训练走客服登记、豆包 App 开关自助
- [Gemini（对话应用）](./gemini-chat.md) — 生态联动路线对照
