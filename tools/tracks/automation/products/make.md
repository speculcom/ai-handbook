---
id: make
form: web
name: Make
nameEn: Make
vendor: Make（原 Integromat）
homepage: https://www.make.com
license: 商业 SaaS，条款见官方 Terms（直抓 403=CF 拦截，浏览器可达）；无自托管形态。

axes:
  model_access: >-
    AI 模块经平台接各家模型（OpenAI 等连接器）；具体清单未逐条核验。
    主轴仍是可视化场景（scenario）编排，AI 是模块之一。
  runtime: >-
    纯云托管：场景（scenario）跑在 Make 云端执行引擎上；无自托管形态的官方声明。
    执行历史与队列都在平台内。
  local_files: >-
    不承载本机文件运行时；数据经模块在各 SaaS 服务间流转、临时文件在云端处理。
    要「AI 读写本机文件」的形态在这里不存在（如实记）。
  background: >-
    云托管常驻是默认形态：定时排程、webhook 触发、错误重试队列都是官方原生能力，
    电脑关了场景照跑——这是托管形态与自托管的本质差别。
  tools: >-
    模块（apps）生态是核心资产（官方口径数千集成，未逐条核验）；MCP 支持状态未逐条核验。
  context: >-
    场景内数据路由与迭代器是官方上下文组织方式；跨场景记忆未逐条核验。
  permissions: >-
    团队/组织角色与凭据 vault 是官方权限面；企业合规声明未逐条核验。
  fit: >-
    适合：可视化流程图式自动化、复杂分支/迭代逻辑比 Zapier 表单更直白。
    不适合：要自托管；要 AI 是产品主轴（它是自动化主轴）。

pitfalls:
  - 用旧名 Integromat 搜现文档——2022 已更名 Make
  - 按操作（operation）计费模型下低估高频场景——看官方 pricing 页（D9 不采数字）
  - 官网部分页直抓 403（CF）——核验走浏览器可达口径

tags: [可视化自动化, 云托管, 场景编排, 连接器生态]
related: [openai-agents-sdk]

sources:
  - label: Make · 官方首页（2026-10-21 直抓 200）
    url: https://www.make.com
    kind: docs
  - label: Make · 官方 Terms（直抓 403=CF 拦截，浏览器可达）
    url: https://www.make.com/en/terms-and-conditions
    kind: docs
  - label: Make · What's new（changelog 入口，直抓 403=CF 拦截，浏览器可达）
    url: https://www.make.com/en/whats-new
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Make（原 Integromat，捷克）。
  origin_note_en: Make (formerly Integromat, Czechia).
  direct: unknown
  direct_note: 首页 200、terms/whats-new 403（CF）——整体直连性标 unknown。
  direct_note_en: homepage 200, terms/whats-new 403 (Cloudflare) — overall directness marked unknown.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Make（原 Integromat）是「流程图派」的可视化自动化平台**——分支、迭代、路由器在画布上比表单派更直白；
AI 是它众多模块之一，自动化才是身份。纯云托管，无自托管。

## 适合与不适合

适合：复杂分支/数据变换的可视化场景、跨 SaaS 自动化为主轴。
不适合：要自托管；要「AI 平台」定位（那是 [Dify](./dify.md)/[Coze](./coze.md) 的叙事）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- AI 模块接入的模型清单（未逐条核验）
- 官方集成数量的现值口径（未逐条核验）
- MCP 支持状态（未核验到官方文档）

## 相关条目

- [Zapier](./zapier.md) — 表单派 vs 流程图派对照：同为连接器生态自动化，画布表达力是分野。
