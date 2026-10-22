---
id: pipedream
form: web
name: Pipedream（Connect / Workflows）
vendor: Pipedream
homepage: https://pipedream.com
license: 商业源码可用（source-available）模型：Connect/Workflows 平台条款见官方；核心仓许可逐仓核验口径未做全量。

axes:
  model_access: >-
    工作流步骤可接各家 LLM（官方 AI 集成文档线）；具体清单未逐条核验。
    特色是「代码优先的自动化」：步骤可写 Node/Python/Bash，界面主轴仍是搭流程。
  runtime: >-
    云托管运行时（官方托管执行）；另有本地 CLI/SDK 开发面。无完整自托管形态的官方声明。
  local_files: >-
    执行在 Pipedream 云端；本机经 CLI/SDK 开发部署。
  background: >-
    云托管常驻是默认形态：定时调度、webhook、队列与重试由平台承载，本机只负责开发部署；
    「电脑关了还能跑」在托管形态下天然成立。
  tools: >-
    官方组件生态（apps/components）+ Connect 嵌入式集成（把你的应用接进别人工作流）；
    MCP 支持状态未逐条核验。
  context: >-
    工作流状态与 store 键值是官方持久面；跨流程记忆未逐条核验。
  permissions: >-
    OAuth 凭据由平台托管（Connect 线是其商业主轴）；企业合规声明未逐条核验。
  fit: >-
    适合：开发者向自动化（代码+界面混合）、要做「被集成」的 SaaS（Connect 线）。
    不适合：完全不想碰代码的团队（那是 Zapier/Make 的地盘）。

pitfalls:
  - 把它归「纯低代码」——它是开发者向：代码步骤是一等公民，界面是搭流程的壳
  - Connect 与 Workflows 是两条产品线（被集成 vs 自己自动化），档案合并写但读官方要分开

tags: [开发者自动化, 云托管, 代码优先, Connect, 集成]
related: [openai-agents-sdk]

sources:
  - label: Pipedream · 官方文档
    url: https://docs.pipedream.com
    kind: docs
  - label: Pipedream · 官方首页（2026-10-21 直抓 200）
    url: https://pipedream.com
    kind: docs
  - label: Pipedream · 官方社区（更新与答疑入口）
    url: https://pipedream.com/community
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Pipedream, Inc.（美国）。
  origin_note_en: Pipedream, Inc. (US).
  direct: yes
  direct_note: pipedream.com / docs.pipedream.com 直连实测 200（2026-10-21）。
  direct_note_en: pipedream.com / docs.pipedream.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Pipedream 是「开发者向」的自动化平台**：代码步骤（Node/Python/Bash）是一等公民，界面是搭流程的壳；
Connect 线让「你的应用」成为别人工作流里的节点——被集成是它的商业主轴。

## 适合与不适合

适合：工程师做自动化、要代码级控制又想要托管运行时与 OAuth 托管；SaaS 要做集成面（Connect）。
不适合：完全不想碰代码（去 Zapier/Make）；要完整自托管（官方无此形态声明）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- 各仓开源许可的全量口径（source-available 细节未逐仓核验）
- MCP 支持状态（未核验到官方文档）
- 自托管形态（官方无声明——按未知处理）

## 相关条目

- [Zapier](./zapier.md) — 表单派 vs 代码派对照：同为连接器自动化，Pipedream 把代码当一等公民。
