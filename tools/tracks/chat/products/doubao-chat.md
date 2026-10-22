---
id: doubao-chat
form: web
name: 豆包
nameEn: Doubao
vendor: 字节跳动
homepage: https://www.doubao.com/
license: 官方豆包用户服务协议 §9.1 口径：公司不主张输出内容的所有权；个人版按条款授予用户免费使用权。API 侧（火山引擎《豆包模型服务协议》）是另一套条款，输出内容的使用按该协议管辖——两条线分开读。
licenseEn: Per the official Doubao User Service Agreement §9.1, the company does not claim ownership of output content; the personal edition grants users a free right of use per the terms. The API line (Volcengine Doubao Model Service Agreement) is governed by separate terms — read the two lines separately.

axes:
  model_access: >-
    豆包系列模型由字节跳动官方发布线披露（官网新闻页有模型迭代记录）；消费应用内具体模型
    档位分流未逐条核验；企业级模型接口经火山引擎「火山方舟」另线提供。
  runtime: >-
    网页（doubao.com）、移动端 App、PC 客户端三线覆盖；生成在字节云端处理，
    本机不跑模型。三线功能基本对齐，语音对话在移动端最顺手。
  local_files: >-
    支持文档解析、文生图、语音对话；上传内容存于账户，训练开关路径见 permissions 维。
  background: >-
    对话即时返回，没有离线任务队列；没有「关机续跑」形态的官方声明——
    对话产品本体不承载长任务，长文档处理也是会话内完成。
  tools: >-
    产品内含文生图、语音对话、文档解析等能力线；企业级能力经火山方舟 API 另线提供。
  context: >-
    有对话历史按会话组织，登录同步多端；跨会话记忆机制未逐条核验
    （未核验到独立记忆管理入口的官方文档，未知就说未知）。
  permissions: >-
    官方隐私政策 §1.10：在「经安全加密技术处理、严格去标识化且无法重新识别特定个人」前提下，
    输入数据、指令与生成回复可能用于模型训练；可在「设置 → 隐私与权限 → 帮助模型改进效果」（移动端）
    或「设置 → 帮助模型改进效果」（PC/网页端）关闭。API 侧另一口径：火山引擎《豆包模型服务协议》§4.1
    ——除非你单独同意，不使用你提交或输出的内容训练基础模型。
  fit: >-
    中文日常问答与文生图。App 训练开关是自助的，API 默认不训练——两条线的条款不同，别混着理解。
    要本机跑模型或自由换模型，它不合适。

pitfalls:
  - 把 App 隐私政策套到火山方舟 API——两条线训练口径相反（App 默认可能训练、API 默认不训练）
  - 把「帮助模型改进效果」开关当成删除历史——它只管未来训练
  - 把豆包消费线与火山方舟当同一产品——主体与条款都不同

tags: [中文, 文生图, 语音, 境内存储]

related: [midjourney]

sources:
  - label: 豆包 · 隐私政策（官方页，2026-10-20 直抓核验 §1.10：训练前提与关闭路径）
    url: https://doubao.com/legal/privacy
    kind: docs
  - label: 火山引擎 · 豆包模型服务协议（§4.1：除非单独同意，不训练）
    url: https://www.volcengine.com/docs/82379/1142195
    kind: docs
  - label: 豆包 · 官网新闻页（产品与模型迭代记录入口）
    url: https://www.doubao.com/news
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 字节跳动（北京）。
  origin_note_en: ByteDance (Beijing).
  direct: yes
  direct_note: doubao.com 大陆直连实测 200。
  direct_note_en: doubao.com measured 200 direct.
  filing: filed
  filing_note: 首批第 3 行；抖音官方备案公示页确认「豆包大模型」即此编号（2024-08 算法备案由云雀更名为豆包）。
  filing_note_en: Listed in the CAC registry as 云雀大模型（豆包前身） (Beijing-YunQue-20230821, filed 2023-08-31).
  verified: 2026-10-20
  filing_name: 云雀大模型（豆包前身）
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

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

## 未知项清单

- 消费应用内模型档位分流细节（官网新闻页有迭代记录，本站未逐档核验）
- 跨会话记忆机制（未核验到独立记忆管理入口的官方文档）

## 相关条目

- [ChatGPT](./chatgpt.md) — 通用对话对照：训练开关与反馈口径不同
- [Kimi](./kimi-chat.md) — 同为国产通用对话：Kimi 退出训练走客服登记、豆包 App 开关自助
- [Gemini（对话应用）](./gemini-chat.md) — 生态联动路线对照
