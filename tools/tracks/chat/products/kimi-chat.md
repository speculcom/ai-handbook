---
id: kimi-chat
form: web
name: Kimi
nameEn: Kimi
vendor: 月之暗面 Moonshot AI
homepage: https://www.kimi.com/
license: 官方用户协议 v2 §5.2：用户拥有输入与输出内容的知识产权；同时协议授予平台运营所需许可。注意历史版本协议（modelUse 旧版）曾写「仅非商业使用」——现行以 v2 为准，旧版条款并存可查，本站按现行版本记录。
licenseEn: Official User Agreement v2 §5.2: users own the IP rights in their inputs and outputs; the agreement also grants the platform its operational license. Note the legacy modelUse agreement stated 'non-commercial use only' — v2 is current; both versions remain retrievable, and this site records the current one.

axes:
  model_access: >-
    模型家族官方产品线披露：官网导航列 Kimi K3 / K2.7 Code / K2.6 / K2.5（2026-10-21 直抓核验），
    首页标题「K3 上线，专为智能体编程与知识工作打造」；开放平台 API 另线提供模型接口。
  runtime: >-
    网页为主入口，另有桌面端与移动应用；生成在云端处理，数据存储于中国境内服务器（官方数据使用与共享说明）。
  local_files: >-
    长文档解析与检索是主打能力；支持 PPT/深度研究/文档/表格/构建应用等产品线入口（官网导航直抓核验）；
    上传内容存于账户。
  background: >-
    官网导航有「定时任务」入口（2026-10-21 直抓核验）；Agent 任务形态官方有产品线
    （「尽管问，或做个 Agent 任务」）；关机续跑细节未逐条核验。
  tools: >-
    官方产品线含 PPT、深度研究、文档、表格、设计、构建应用与插件生态；另有开放平台 API（Moonshot 开放平台）。
  context: >-
    有项目空间与历史会话组织（登录同步多端）；跨会话记忆机制未逐条核验
    ——官网有「灵感库」等入口，但独立记忆管理界面的官方文档本站未核验到。
  permissions: >-
    官方数据使用与共享说明：在「经安全加密技术处理、严格去标识化且无法重新识别特定个人」前提下，
    输入、指令与生成回复可能用于模型训练；退出须联系客服登记（验证身份后 5-7 个工作日），
    账号级统一退出、不支持按对话退出，退出后历史与新增数据都不再进训练集。
    Kimi Business 企业版承诺企业数据不进入模型训练流程，个人与企业空间完全隔离。
  fit: >-
    中文长文档场景的主力。退出训练要走客服登记、不是自助开关——在意这一点要先确认；
    企业数据走 Kimi Business。要本机跑模型，它不合适。

pitfalls:
  - 以为训练退出是自助开关——官方流程是客服登记、账号级统一退出
  - 把新旧两版协议混着读——旧版「仅非商业」与现行 v2「拥有输入输出 IP」并存，按现行版本走
  - 把消费线与开放平台 API 混为一谈——两条线条款不同

tags: [中文, 长文档, Agent任务, 境内存储]

related: [grok-bot]

sources:
  - label: Kimi · 数据使用与共享说明（官方帮助页，2026-10-20 直抓核验：训练前提、退出流程、境内存储、Business 不训练）
    url: https://www.kimi.com/en/help/others/data-usage
    kind: docs
  - label: Kimi · 隐私政策（NOVASCENT PRIVATE LIMITED / Moonshot AI，2026-08-13 更新）
    url: https://www.kimi.ai/user/agreement/userPrivacy?version=v2
    kind: docs
  - label: Kimi 官网（K3 上线标题与模型产品线导航，2026-10-21 直抓核验）
    url: https://www.kimi.com/
    kind: changelog
  - label: Kimi · 会员页（定价页指针，D9：本站不采价格数字）
    url: https://www.kimi.com/membership
    kind: pricing

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 月之暗面（北京）。
  origin_note_en: Moonshot AI (Beijing).
  direct: yes
  direct_note: kimi.com 大陆直连实测 200。
  direct_note_en: kimi.com measured 200 direct.
  filing: filed
  filing_note: 首批公告第 16 行。
  filing_note_en: Listed in the CAC registry as Moonshot（月之暗面） (Beijing-MoonShot-20231016, filed 2023-11-03).
  verified: 2026-10-20
  filing_name: Moonshot（月之暗面）
  filing_no: Beijing-MoonShot-20231016
  filing_date: 2023-11-03
---

## 一句话定位

中文长文档对话的主力：K3/K2.7 Code/K2.6/K2.5 模型家族官方产品线清晰，
「退出训练要走客服登记、账号级统一」是最需要提前确认的一条流程。

## 适合与不适合

适合中文长文档解析、检索与 Agent 任务场景，境内存储对合规敏感场景是加分项。
在意「对话绝不进训练」要先接受客服登记流程（5-7 个工作日）；企业数据走 Kimi Business。
要本机跑模型或自由换模型，它不合适——去看本地模型运行器与开源框架。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

## 未知项清单

- 跨会话记忆机制与定时任务的完整边界（官网有入口，本站未逐条核验）
- 开放平台 API 与消费应用的训练条款差异细节（API 线条款本站未逐条核验）

## 相关条目

- [ChatGPT](./chatgpt.md) — 通用对话对照：训练开关自助、反馈口径不同
- [豆包](./doubao-chat.md) — 同为国产通用对话：豆包 App 开关自助、Kimi 走客服登记
- [Gemini（对话应用）](./gemini-chat.md) — 生态联动路线对照
