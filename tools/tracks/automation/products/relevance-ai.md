---
id: relevance-ai
form: web
name: Relevance AI
vendor: Relevance AI（悉尼）
homepage: https://relevanceai.com
license: 商业 SaaS（官方 terms 页直抓 404——现行条款经 docs.relevanceai.com 读，2026-10-21）；无自托管形态。

axes:
  model_access: >-
    平台接各家模型（OpenAI/Anthropic 等，官方文档线）；具体清单未逐条核验。
  runtime: >-
    纯云托管：agent 团队（"AI workforce"）跑在 Relevance 云端；无自托管形态。
  local_files: >-
    不承载本机文件运行时——数据、附件与工具产出都在平台内存储与流转；
    要「AI 读写本机文件」的形态在这里不存在（如实记，不是官方不允许）。
  background: >-
    云托管常驻；官方主打「无代码搭 AI 员工团队」——多 agent 协作是叙事主轴。
  tools: >-
    工具/集成 + MCP（官方文档线含 MCP 条目，未逐条核验细节）。
  context: >-
    agent 间任务传递与共享指令是官方协作面；跨会话记忆未逐条核验。
  permissions: >-
    团队/工作区权限面见官方文档线（角色与共享边界未逐条核验）；
    企业合规声明（SOC 2 类）未逐条核验——「未核验到」不等于「没有」。
  fit: >-
    适合：无代码搭「多 agent 协作」工作流、销售/运营自动化场景。
    不适合：要自托管；要代码级控制（归 framework）。

pitfalls:
  - 「AI workforce」叙事下把多 agent 当万能——先核任务是否真需要多角色分工
  - 官网 terms 旧路径 404——条款走 docs 线读（2026-10-21 直抓核验）

tags: [无代码, 多agent, 云托管, 销售运营自动化]
related: [crewai]

sources:
  - label: Relevance AI · 官方文档（2026-10-21 直抓 200）
    url: https://docs.relevanceai.com
    kind: docs
  - label: Relevance AI · 官方首页（2026-10-21 直抓 200）
    url: https://relevanceai.com
    kind: docs
  - label: Relevance AI · 文档更新记录（changelog 入口）
    url: https://docs.relevanceai.com/changelog
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Relevance AI（澳大利亚，悉尼）。
  origin_note_en: Relevance AI (Australia, Sydney).
  direct: yes
  direct_note: relevanceai.com / docs.relevanceai.com 直连实测 200（2026-10-21）。
  direct_note_en: relevanceai.com / docs.relevanceai.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Relevance AI 主打「无代码搭 AI 员工团队」**——多 agent 协作是它的叙事主轴，销售/运营自动化是主战场。
云托管、无自托管。

## 适合与不适合

适合：无代码多 agent 工作流、销售/运营场景自动化。
不适合：要自托管；要代码级控制；任务简单到不需要多角色分工（先问这一句）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- 模型清单与切换粒度（未逐条核验）
- MCP 支持细节（文档线有条目未逐条核验）
- 官方 changelog 页现值（docs 子路径未逐一核验）

## 相关条目

- [扣子 / Coze](./coze.md) — 同为「多 agent 协作」无代码平台：Relevance 偏销售运营英文市场，扣子偏国内分发链路。
