---
id: gumloop
form: web
name: Gumloop
nameEn: Gumloop
vendor: Gumloop
homepage: https://www.gumloop.com
license: 闭源商业产品，按官方 ToS 管辖（当日直抓在册：主体 AgentHub Inc. (doing business as Gumloop)，
  ToS 更新日 2026-10-07）；GitHub 上 gumloop org 只有 gumloop-py/gumloop-js 等 Apache-2.0 SDK 仓，
  产品本体未见开源发行。
licenseEn: Closed commercial product governed by the official ToS (direct-fetched same day: entity AgentHub Inc.
  (doing business as Gumloop), ToS last updated 2026-10-07); on GitHub the gumloop org only hosts Apache-2.0 SDK repos
  (gumloop-py/gumloop-js) — no open-source release of the product itself.

axes:
  model_access: >-
    多模型选择器是产品显性面（首页当日在册：Agent Settings 的 Model 项「Smartest (Claude 5.5 Opus)」；
    用量面板列 GPT-6.1 Sol / Claude Opus 5.5 / Grok 4.7 / Kimi K3 / DeepSeek V4.1 Flash 各家消耗）——
    模型按 credits 消耗计费，各家可用清单以界面为准。
  runtime: >-
    云托管形态（www.gumloop.com 直连 200）；未见官方自托管发行声明（社区有 open-gumloop 复刻仓，
    非官方）；agent 运行在 Gumloop 云端，按 credits 计量。
  local_files: >-
    工作流与 agent 数据在 Gumloop 云端；本地文件概念不适用——产物经连接器（Slack/HubSpot/Gong/Gmail/
    Salesforce）落在第三方系统；SDK（gumloop-py/js）提供代码侧接入面但运行时仍在云端。
  background: >-
    agent 常驻与定时运行在册（首页当日用例面板：Renewal Watch / Ticket Triage 等值守型 agent）；
    排队与失败重试细节未逐条核验。
  tools: >-
    Connectors 生态当日在册（Slack/HubSpot/Gong/Gmail/Salesforce，View all 入口）；Skills 面在册
    （Account Research/Outbound Email/Call Summary/CRM Hygiene）；guMCP_template 仓在册（MCP 方向官方模板）。
  context: >-
    agent 指令（Add instructions）与 Skills 是持久配置面；跨会话记忆机制未核验到官方声明，按未知处理——
    知识面主要靠连接器拉取的外部数据（CRM/Gong 记录）。
  permissions: >-
    企业向（导航 Enterprise 栏目在册）；ToS 主体 AgentHub Inc. dba Gumloop（当日在册）；
    credits 计费模式在册；训练用途开关路径未逐条核验。
  fit: >-
    适合：GTM/客服场景的多模型 agent（画布+连接器）、要按 credits 统一用量治理（Model Providers 面板）。
    不适合：要自托管、要大陆直连备案入口、要免费无限量（credits 制）。

pitfalls:
  - 条款主体是 **AgentHub Inc. (doing business as Gumloop)**——品牌名与法律主体不同名，引用主体按 ToS 原文
  - 条款路径是 /tos（/terms、/legal/terms 均 404）——按惯例路径探测会误判「无条款页」
  - 多模型面板显示的是**用量归因**（各家 token 消耗）不是「可任意指定任意模型」——具体可选清单以界面为准

tags: [低代码, agent平台, 多模型选择, MCP, 集成生态, 云托管, credits计费, 商业]
related: [lindy, n8n, langchain]

sources:
  - label: Gumloop · 官网（Build AI agents for work、Model/Connectors/Skills 面板，2026-10-30 直抓 200）
    url: https://www.gumloop.com
    kind: official
  - label: Gumloop · Terms of Service（主体 AgentHub Inc. dba Gumloop，更新 2026-10-07，2026-10-30 直抓 200）
    url: https://www.gumloop.com/tos
    kind: official
  - label: Gumloop · Privacy Policy（2026-10-30 直抓 200）
    url: https://www.gumloop.com/privacy-policy
    kind: official
  - label: Gumloop · Changelog（最新条目 2026-10-28，2026-10-30 直抓 200）
    url: https://www.gumloop.com/changelog
    kind: changelog
  - label: gumloop/gumloop-py · 官方 Python SDK（Apache-2.0，GitHub API 当日核验）
    url: https://github.com/gumloop/gumloop-py
    kind: repo

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: AgentHub Inc. (doing business as Gumloop)（ToS 当日直抓在册）。
  origin_note_en: AgentHub Inc. (doing business as Gumloop), on record in the ToS direct-fetched same day.
  direct: yes
  direct_note: www.gumloop.com、/tos、/privacy-policy、/changelog 大陆直连实测 200（2026-10-30）。
  direct_note_en: www.gumloop.com, /tos, /privacy-policy and /changelog measured 200 direct from mainland (2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与第十六批批次清单，未见 Gumloop/AgentHub 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and the 16th batch list searched 2026-10-30; no Gumloop/AgentHub entry); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Gumloop 是画布+连接器形态的企业向 AI agent 平台，多模型选择器是显性卖点**（首页当日招牌：Build AI agents
for work；Agent Settings 里 Model 可选「Smartest (Claude 5.5 Opus)」，用量面板按 GPT-6.1 Sol / Claude Opus 5.5 /
Grok 4.7 / Kimi K3 / DeepSeek V4.1 Flash 归因 credits 消耗）：GTM/客服场景用例为主轴，法律主体是 AgentHub Inc.。

## 适合与不适合

适合：GTM/客服多模型 agent（画布+连接器+Skills）、要按 credits 统一治理各家模型用量。
不适合：要自托管（社区复刻≠官方）、要大陆直连备案入口、要免费无限量（credits 制）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（agent 平台不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **各家模型的实时可选清单与路由规则**（「Smartest」自动路由的判定逻辑未在册）
- **credits 单价与各家模型的消耗率**（面板显示消耗量，换算率未在册）
- **连接器授权的数据权限边界**（Salesforce/Gong 级连接的读写面未逐条核验）

## 未知项清单

- 「Smartest」模型路由的判定逻辑（未核验到官方说明）
- 自托管/私有部署形态（未核验到官方声明；open-gumloop 是社区复刻）
- 跨会话记忆机制（未核验到官方声明）
- 训练用途开关路径与默认态（未逐条核验）

## 相关条目

- [Lindy](./lindy.md) — 同为工作 agent 平台：Lindy 是雇佣式「AI 员工」，Gumloop 是画布+连接器的自建 agent。
- [n8n](./n8n.md) — 集成自动化对照：n8n fair-code 可自托管；Gumloop 全托管、agent 与多模型治理为主轴。
- [LangChain](../../framework/products/langchain.md) — 代码优先对照：要源码级控制归 framework，要托管画布归本类。
