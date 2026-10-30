---
id: lindy
form: web
name: Lindy
nameEn: Lindy
vendor: Lindy
homepage: https://www.lindy.ai
license: 闭源商业产品，按官方 Legal Terms 管辖（当日直抓在册：主体自称 Lindy，「a company registered in
  Oregon」——条款未给出 Inc./LLC 全称，按在册原文写）。
licenseEn: Closed commercial product governed by the official Legal Terms (direct-fetched same day: the entity calls itself
  Lindy, "a company registered in Oregon" — no Inc./LLC full name given in the terms, recorded as written).

axes:
  model_access: >-
    平台不带自有模型——按场景接入各家模型；首页未主打模型选择器，模型清单未逐条核验。
    产品按「AI 员工」形态包装：Skills 40+ 内置、可教自定义技能（首页当日在册）。
  runtime: >-
    云托管形态（www.lindy.ai 直连 200；Chrome Extension 集成 Gmail 在册）；
    未见官方自托管发行声明，按未知处理。
  local_files: >-
    数据在 Lindy 云端（Memory「Remembers you. Yours to edit」是云端持久面）；本地文件概念不适用——
    工作产物（邮件、文档、通话记录）经集成落在第三方工具（Gmail/日历/CRM）而非本机。
  background: >-
    「Routines：Work that runs on schedule」是官方主打形态（首页当日在册）——定时自动跑是产品主轴；
    Watch and Learn（演示一次即接手）在册；排队与失败重试细节未逐条核验。
  tools: >-
    集成面当日在册：1,500+ integrations + MCP（首页明言 MCP）；Lindy Phone（电话通话）与 Lindy Apps
    为新增产品线（条款与 changelog 均在册）；电话合规条款段落当日在册。
  context: >-
    Memory 是显式持久面（首页当日：Remembers you. Yours to edit——用户可编辑记忆）；
    Meetings 共享库在册；记忆的作用域与留存细节未逐条核验。
  permissions: >-
    条款含电话合规专段（Lindy Phone 录音/同意义务归用户，当日在册）；条款为通用商业模板（Company 泛称）；
    训练用途开关路径未逐条核验。
  fit: >-
    适合：邮件/日历/通话/CRM 的「AI 员工」自动化（定时例程、演示即学）、要 1,500+ 集成与 MCP。
    不适合：要自托管、要大陆直连备案入口、要代码级控制（产品形态是雇佣式 agent 而非画布/代码）。

pitfalls:
  - 条款主体只自称「Lindy（a company registered in Oregon）」——没有 Inc./LLC 全称在册，引用主体时别自行补全
  - 「AI 员工」是产品包装不是能力承诺：电话（Lindy Phone）线条款把录音/同意合规义务划给用户——涉电话场景先读条款电话段
  - changelog 活跃（最新 2026-10-28）且产品线扩张快（Phone/Apps 均为近期新增）——按旧评测印象判断功能面会滞后

tags: [agent平台, AI员工, 邮件日历, 语音电话, MCP, 集成生态, 云托管, 免费+订阅, 商业]
related: [gumloop, n8n, chatgpt]

sources:
  - label: Lindy · 官网（AI 员工定位、Skills/Memory/Routines/Watch-and-Learn、1,500+ integrations + MCP，2026-10-30 直抓 200）
    url: https://www.lindy.ai
    kind: official
  - label: Lindy · Legal Terms（主体自称 Lindy/Oregon 注册+电话合规段，2026-10-30 直抓 200）
    url: https://www.lindy.ai/terms
    kind: official
  - label: Lindy · Changelog（最新条目 2026-10-28，2026-10-30 直抓 200）
    url: https://www.lindy.ai/changelog
    kind: changelog
  - label: Lindy · Pricing（2026-10-30 直抓 200）
    url: https://www.lindy.ai/pricing
    kind: official

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Lindy（条款自称 Oregon 注册公司，全称未在册）。
  origin_note_en: Lindy (self-described Oregon-registered company in the terms; full legal name not on record).
  direct: yes
  direct_note: www.lindy.ai、/terms、/changelog、/pricing 大陆直连实测 200（2026-10-30）。
  direct_note_en: www.lindy.ai, /terms, /changelog and /pricing measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与第十六批批次清单，未见 Lindy 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and the 16th batch list searched 2026-10-30; no Lindy entry); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Lindy 是「雇一个 AI 员工」形态的云端自动化平台**（首页当日招牌：Hire an AI Employee That Gets Work Done——
Skills 40+ 内置、Memory 可编辑、Routines 定时跑、Watch and Learn 演示一次即接手）：邮件/日历/通话/CRM 场景为主轴，
1,500+ 集成 + MCP；不是画布也不是代码框架，是雇佣式 agent 产品。

## 适合与不适合

适合：邮件/日历/通话/CRM 的例行自动化（定时例程、演示即学）、要现成集成与 MCP。
不适合：要自托管、要大陆直连备案入口、要代码级控制。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（agent 平台不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）:

- **Routines 的失败处理与审计面**（定时自动执行出错时谁看到、怎么回滚未在册）
- **Memory 的作用域边界**（跨 agent 共享还是每 agent 独立、留存期未在册）
- **Lindy Phone 的接通率与合规拦截面**（条款把义务划给用户，实际通话质量与拦截未核验）

## 未知项清单

- 现役接入的模型清单（未逐条核验）
- 自托管/私有部署形态（未核验到官方声明）
- 训练用途开关路径与默认态（未逐条核验）
- 主体法律全称（条款仅自称 Lindy/Oregon，无 Inc./LLC）

## 相关条目

- [Gumloop](./gumloop.md) — 同为工作流 agent 平台：Gumloop 是画布+连接器形态，Lindy 是雇佣式 AI 员工形态。
- [n8n](./n8n.md) — 集成自动化对照：n8n 节点画布自托管可选、fair-code；Lindy 全托管、产品语言是「员工」。
- [ChatGPT](../../chat/products/chatgpt.md) — 委托形态对照：ChatGPT 是你驱动的通用对话入口，Lindy 是常驻自走的「员工」——同为自然语言下达，运行模型不同。
