---
id: coze
form: web
name: 扣子 / Coze
vendor: 字节跳动
homepage: https://www.coze.com
nameEn: Coze

axes:
  model_access: >-
    国内版扣子官方首页点名「模型自由切换：Doubao-Seed / Kimi / GLM / Minimax，最新国产模型原生支持」；
    国际版 coze.com 的模型清单未逐条核验。平台不带自有模型，切换在应用配置里做。
  runtime: >-
    云托管形态：应用搭在扣子平台上、跑在字节云端；官方文档给发布渠道（飞书/微信/抖音/豆包/商店等）。
    无自托管形态的官方声明（未知就说未知）。
  local_files: >-
    知识库/数据库/对象存储由平台托管（官方文档：结构化与非结构化数据托管方案）；
    扣子编程线给云端沙箱（文件系统/终端/预览）。本机不承载运行时。
  background: >-
    官方首页口径：扣子 Agent「持续满配在线，拥有云手机/云电脑，长期记忆越用越懂你，持续自主推进任务」
    ——云端常驻是官方主打形态。
  tools: >-
    插件/工作流/技能是官方三件套；官方文档列外部集成（飞书消息、微信、火山方舟等）；
    国内版官方首页称可一键接入本地 Claude Code / Codex CLI / Openclaw。
  context: >-
    官方首页称长期记忆与项目资产沉淀（每项目独立存储空间）；记忆机制细节未逐条核验。
  permissions: >-
    空间/工作空间是官方组织边界（空间管理员配置外部集成）；企业版细节未逐条核验。
    数据在字节云端——境内版数据境内处理的官方声明未逐条核验。
  fit: >-
    适合：国内分发链路（微信/抖音/飞书）直达的 agent 搭建、国产模型自由切换、零部署。
    不适合：要自托管掌控数据；要源码级控制（归 framework）。

pitfalls:
  - 把 coze.com 与 coze.cn 当两个产品——同产品两入口，模型与渠道生态不同（本站一档案写清）
  - 把「云手机/云电脑」当本机控制——那是平台托管的执行环境
  - 以为能自托管——官方无自托管形态声明

tags: [国产, 低代码, agent平台, 云托管, 国产模型切换, 分发渠道]
related: [openai-agents-sdk]

sources:
  - label: 扣子 · 官方首页（coze.cn：模型切换清单、云手机/云电脑、接入本地 CLI 口径，2026-10-21 搜索快照）
    url: https://www.coze.cn
    kind: docs
  - label: 扣子 · 官方文档（智能体开发/多Agent模式/集成能力/发布渠道）
    url: https://docs.coze.cn
    kind: docs
  - label: 扣子 · 开放平台 API 文档（bot 创建/发布接口）
    url: https://docs.coze.cn/developer_guides_create_bot
    kind: docs
  - label: Coze · 国际站
    url: https://www.coze.com
    kind: docs
  - label: 扣子 · 官方发布记录（changelog，2026-10-21 直抓 200）
    url: https://docs.coze.cn/guides_release_note
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 字节跳动（北京）。
  origin_note_en: ByteDance (Beijing).
  direct: yes
  direct_note: coze.cn / docs.coze.cn / coze.com 直连实测 200（2026-10-21）。
  direct_note_en: coze.cn / docs.coze.cn / coze.com measured 200 direct (2026-10-21).
  filing: unknown
  filing_note: 未核验到「扣子」在网信办公示名单的独立备案条目（2026-10-21 检索）；字节系模型备案在豆包名下，扣子作为应用与其关系未核验，标 unknown。
  filing_note_en: no standalone 扣子 entry found in the CAC registry (searched 2026-10-21); ByteDance's model filing sits under Doubao, and Coze's relationship to it is unverified — marked unknown.
  verified: 2026-10-21
---

## 一句话定位

**扣子（Coze）是字节的云托管 agent 搭建平台**：国内版主打「模型自由切换 + 云手机/云电脑常驻 + 微信/抖音/飞书直达分发」，
国际版 coze.com 是同产品另一入口。没有自托管形态——数据与运行时都在云端。

## 适合与不适合

适合：要国内分发链路直达、要国产模型（Doubao-Seed/Kimi/GLM/Minimax）随切、零部署起步。
不适合：要自托管掌控数据（去看 [Dify](./dify.md) 或 n8n 自托管）；要源码级控制（归 framework 大类）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- 国际版 coze.com 的模型清单（未逐条核验）
- 长期记忆与「项目资产沉淀」的机制细节
- 自托管形态（官方无声明——按「未知」处理，不是「官方不允许」）
- 扣子与豆包备案条目的关系（cn 块标 unknown 的原因）

## 相关条目

- [Dify](./dify.md) — 同为国产 agent 搭建平台：Dify 可自托管、扣子是云托管——数据落点是核心分野。
