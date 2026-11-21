---
id: zapier
form: web
name: Zapier
vendor: Zapier
homepage: https://zapier.com
license: 商业 SaaS，条款见官方 Terms（2026-10-21 直抓 200）；无自托管形态。

axes:
  model_access: >-
    AI 能力（Zapier AI / Canvas / Agents）由平台接入多家模型，官方帮助中心把 AI 作为 Zap 步骤与 agent 能力描述，不公开逐模型版本清单；平台主轴仍是 6,000+ 应用集成（官方首页口径，2026-11-21）。
  runtime: >-
    纯云托管 SaaS：Zap、Next Gen Zaps 与 Agents 都在 Zapier 云端执行，官方未提供自托管镜像或本地运行器；账号、版本与运行历史由平台托管（2026-11-21）。
  local_files: >-
    不读写用户本机文件；Zap 的输入输出经连接器在各 SaaS 之间流转，运行数据存于 Zapier 云端。官方帮助中心说明 Zap 历史最多保证 60 天、最多显示 10,000 次运行；Enterprise 可把保留期设为 7–30 天，删除不可恢复（2026-11-21）。
  background: >-
    云端常驻：定时触发、webhook、延迟步骤由平台调度；Next Gen Zaps 支持最长一年的 durable wait，并可在运行中取消。任务执行不依赖用户设备在线，关闭浏览器不影响已部署 Zap（官方帮助中心，2026-11-21）。
  tools: >-
    连接器生态是核心资产：官方帮助中心把 Zapier MCP 作为让 MCP 客户端调用应用动作的接入面，Next Gen Zaps 通过 MCP 构建并部署工作流；同时提供 REST API、Webhooks 与 6,000+ 应用连接器（2026-11-21）。
  context: >-
    多步 Zap 通过字段映射、Paths 与 Code 步骤传递单次运行的数据；运行历史按 Zap 版本保存，供排障与重放。官方帮助中心未列跨任务的持久记忆或用户画像层，跨会话状态需由外部数据库/存储步骤自行维护（2026-11-21）。
  permissions: >-
    企业线提供 SAML SSO、SCIM 用户 provisioning、Super Admin、应用访问控制与自定义数据保留（官方帮助中心，2026-11-21）；连接器凭据由平台托管，成员按角色与共享连接权限使用。SOC 2 等合规声明按官方 security 页核对。
  fit: >-
    适合：SaaS 生态自动化为主轴、要把 AI agent 挂到现成连接器上、完全不碰部署。不适合：要数据不出自有环境、要免费自托管、或要把长流程成本压到固定预算（按任务量计费，数字看官方 pricing 页）。

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

  - label: Zapier · Help: View and manage your Zap history（60 天/10,000 次上限，2026-11-21 抓取 200）
    url: https://help.zapier.com/hc/en-us/articles/8496291148685
    kind: docs
  - label: Zapier · Help: Customize data retention（Enterprise 7–30 天，2026-11-21 抓取 200）
    url: https://help.zapier.com/hc/en-us/articles/8496327478413
    kind: docs
  - label: Zapier · Help: Get started with Next Gen Zaps（MCP 与 durable wait，2026-11-21 抓取 200）
    url: https://help.zapier.com/hc/en-us/articles/48391476448141-Get-started-with-Next-Gen-Zaps
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Zapier 是「连接器生态」的代名词**——6000+ SaaS 集成的云托管自动化平台，
官方叙事已把 AI/agent（Canvas、Agents）提到主轴位置。没有自托管形态，一切在云端。

## 适合与不适合

适合：SaaS 间自动化是主轴、要把 AI agent 直接挂到现成连接器上、零部署。
不适合：数据不能出自有环境（去看 [n8n](./n8n.md) 自托管）；要免费无上限跑量（看官方 pricing 页）。

## 实测记录

本档核对官方帮助中心的能力与权限边界；工作流搭建、连接器限流与计费需按账号实测。

## 未知项清单

- AI 功能接入的具体模型版本清单：官方帮助中心未逐模型披露。
- 6,000+ 应用口径的实时计数：官方首页给出总数，未提供可审计清单。
- 跨任务持久记忆：官方帮助中心未列该能力，需外部存储步骤实现。
## 相关条目

- [Make](./make.md) — 同为连接器生态自动化：Make 画布形态更「流程图」，Zapier 更「表单+目录」。
