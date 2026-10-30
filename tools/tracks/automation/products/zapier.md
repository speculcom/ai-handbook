---
id: zapier
form: web
name: Zapier
vendor: Zapier
homepage: https://zapier.com
license: 商业 SaaS，条款见官方 Terms（2026-10-21 直抓 200）；无自托管形态。

axes:
  model_access: >-
    AI 能力（Zapier AI / Canvas / Agents）经平台接各家模型；具体模型清单未逐条核验。
    平台主轴是 6000+ 应用集成（官方口径数字未逐条核验）。
  runtime: >-
    纯云托管 SaaS：Zap/工作流跑在 Zapier 云端；无自托管形态。
  local_files: >-
    不承载本机文件；数据经连接器在各 SaaS 间流转，存于 Zapier 云端处理。
  background: >-
    云托管天然常驻：定时、webhook、延迟队列都是平台承载的官方能力。
  tools: >-
    连接器生态是核心资产；官方帮助中心与许可 FAQ 口径里 MCP/AI agent 是 Zapier 支持的接入面之一
    （Zapier 亦提供 MCP 侧集成，细节未逐条核验）。
  context: >-
    多步 Zap 之间的数据传递与路径（Paths）是官方上下文组织主轴；跨任务的持久记忆机制
    未核验到官方文档（未知就说未知）。
  permissions: >-
    企业线给 SSO/审计等（官方产品页口径）；连接器凭据由平台托管存储。
    数据合规线（SOC 2 等）官方声明未逐条核验。
  fit: >-
    适合：SaaS 生态自动化为主轴、要把 AI agent 挂到现成连接器上、完全不碰部署。
    不适合：要数据不出自有环境；要免费自托管。

pitfalls:
  - 把 Zapier 当「传统自动化+AI 附加」——官方已把 AI/agent 提为主轴叙事（Canvas/Agents）
  - 按任务量计费模型下低估长流程成本——本站按 D9 不采价格数字，看官方 pricing 页
  - 把连接器可用性当稳定承诺——第三方 SaaS 接口会变

tags: [SaaS自动化, 云托管, 连接器生态, agent, 无代码]
related: [openai-agents-sdk]

sources:
  - label: Zapier · 官方 Terms（2026-10-21 直抓 200）
    url: https://zapier.com/terms
    kind: docs
  - label: Zapier · 官方帮助中心
    url: https://help.zapier.com/hc/en-us
    kind: docs
  - label: Zapier · 官方首页（AI/Canvas/Agents 叙事入口）
    url: https://zapier.com
    kind: docs
  - label: Zapier · 官方 Updates 博客（changelog 入口，2026-10-21 直抓 200）
    url: https://zapier.com/blog/updates/
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Zapier Inc.（美国）。
  origin_note_en: Zapier Inc. (US).
  direct: yes
  direct_note: zapier.com / help.zapier.com 直连实测 200（2026-10-21）。
  direct_note_en: zapier.com / help.zapier.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Zapier 是「连接器生态」的代名词**——6000+ SaaS 集成的云托管自动化平台，
官方叙事已把 AI/agent（Canvas、Agents）提到主轴位置。没有自托管形态，一切在云端。

## 适合与不适合

适合：SaaS 间自动化是主轴、要把 AI agent 直接挂到现成连接器上、零部署。
不适合：数据不能出自有环境（去看 [n8n](./n8n.md) 自托管）；要免费无上限跑量（看官方 pricing 页）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- AI 功能接入的模型清单（未逐条核验）
- 「6000+ 应用」的官方口径现值（未逐条核验）
- 跨任务记忆机制（未核验到官方文档）

## 相关条目

- [Make](./make.md) — 同为连接器生态自动化：Make 画布形态更「流程图」，Zapier 更「表单+目录」。
