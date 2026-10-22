---
id: bolt-new
form: cloud
name: Bolt.new
vendor: StackBlitz
homepage: https://bolt.new

axes:
  model_access: >-
    官方帮助中心有 Bolt Forge 页：Pro/Lite 计划可经 Forge 用开源模型并切换；
    参考页（Introduction to LLMs）讲模型/token 概念但未给完整可选清单——清单随版本变化，未逐条清点。
    构建 agent 分两档（官方「Choose an agent」页）：Standard 与 Max，按任务类型切换。
  runtime: >-
    浏览器内运行是官方明示的技术底座：Bolt 由 StackBlitz 开发，跑在 WebContainers 上
    （官方原文：在浏览器里直接跑 Node.js，装环境这一步被取消）。
    网页形态为主；官方文档未见桌面/移动客户端叙事。
  local_files: >-
    项目在 Bolt 平台内；GitHub 集成官方成页：连仓库备份代码、自动同步 commit、跨分支工作、
    两边保持同步。Bolt Cloud 提供内置托管+数据库+域名（官方 bolt-cloud 页），
    数据库有备份/恢复/版本历史页。代码出平台走 GitHub 同步线。
  background: >-
    版本历史与回滚官方成页（内置版本历史、恢复到早前版本）；Bolt Cloud 托管的应用常驻运行。
    构建任务关闭页面后是否续跑未核验到官方声明。
  tools: >-
    MCP 官方成页（连 MCP 服务器给 agent 用）；集成清单含 GitHub/Figma/Supabase/Stripe 等；
    Skills 页（可复用的规则与工作流）；Code view 直接读写项目文件；内置安全扫描页
    （发布前检查项目安全问题）。
  context: >-
    Plan Mode 先谈清应用再建（官方 prompting/plan-mode 页）；上下文管理官方成页
    （「让项目上下文随时间变小」——教读者管 token）；设计系统可接入（design-system 三页）。
    跨会话记忆机制未核验到官方声明。
  permissions: >-
    账号 + Teams 计划（成员角色/谁能发布/团队管理官方成页）；GitHub 组织访问可由组织管理员控制
    （github-org 页）；项目设置页管可见性与协作；数据库安全设置页（扫描问题）。
    token 计量官方成页（agent 工作量按 token 计）。
  fit: >-
    适合：免装环境浏览器内直接建全栈应用（WebContainers 底座）、要 GitHub 同步线、
    要内置托管+数据库一条龙（Bolt Cloud）、非技术者与开发者共用同一环境。
    不适合：要深度离线（平台内叙事）、要完全掌控构建模型（Forge 是计划绑定的开源模型线）。

pitfalls:
  - 计量单位是 token 不是「消息数」：官方 Tokens 页明示 agent 工作量按 token 计——
    长会话/大上下文直接烧额度，官方专门有「Maximize token efficiency」页
  - Bolt Cloud 数据库的认证/存储/secrets 是 Bolt 托管形态——与「连自己的 Supabase」是两条线
    （官方 integrations 页两者都有），数据边界别混
  - 移动端应用走 Expo 集成线（官方 intro 页）——不是所有 Web 栈能力在移动线上等价

tags: [海外, 免费+付费, Web, 全栈, WebContainers, MCP, GitHub同步, token计量]
related: [lovable, v0, replit-agent, supabase-mcp]

sources:
  - label: Bolt 帮助中心 · Intro to Bolt（定位/WebContainers/StackBlitz）
    url: https://support.bolt.new/get-started/intro-bolt
    kind: official
  - label: Bolt 帮助中心 · Choose an agent（Standard/Max 两档）
    url: https://support.bolt.new/building/agents
    kind: official
  - label: Bolt 帮助中心 · Bolt Cloud（内置托管/域名/数据库）
    url: https://support.bolt.new/bolt-cloud
    kind: official
  - label: Bolt 帮助中心 · GitHub for version control（同步线）
    url: https://support.bolt.new/integrations/git
    kind: official
  - label: Bolt 帮助中心 · Bolt Forge（开源模型线）
    url: https://support.bolt.new/account/bolt-forge
    kind: official
  - label: Bolt 帮助中心 · Connect to an MCP server
    url: https://support.bolt.new/integrations/mcp
    kind: official
  - label: Bolt 帮助中心 · Release Notes（changelog）
    url: https://support.bolt.new/release-notes
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: StackBlitz（美国；WebContainers 技术的开发方——官方帮助中心自述）。
  origin_note_en: StackBlitz (US; the team behind WebContainers — per the official help center).
  direct: yes
  direct_note: bolt.new / support.bolt.new 大陆直连实测 200（2026-10-22）。
  direct_note_en: bolt.new / support.bolt.new measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve
    the mainland public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Bolt.new 是 StackBlitz 的浏览器内全栈 AI 构建器**：跑在 WebContainers 上（浏览器里直接跑 Node.js，
免装环境），agent 分 Standard/Max 两档、按 token 计量，Bolt Cloud 给托管+数据库，GitHub 双向同步线在位。

## 适合与不适合

适合：免装环境直接建应用、GitHub 同步、内置托管一条龙、非技术者与开发者共用。
不适合：深度离线场景、要完全掌控构建模型（Forge 按计划绑定）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **WebContainers 对重后端栈（如原生依赖）的实际兼容边界**（官方讲浏览器内 Node.js，未给限制清单）
- **Standard 与 Max agent 在同一项目混用的上下文衔接**（官方页讲切换，未讲混用后果）
- **Bolt Cloud 数据库导出到自建 Postgres 的实际路径**（备份页在，导出迁移未逐步走通）

## 未知项清单

- 当前可选模型完整清单（Forge 线随版本变化，未逐条清点）
- 跨会话记忆机制（未核验到官方声明）
- 构建任务关闭页面后是否续跑（未核验到官方声明）
- 免费计划与付费计划的能力差完整表（官方有 plans 页，未逐条清点）

## 相关条目

- [Lovable](./lovable.md) — 同类产品：Lovable 云端托管后端（Supabase 底座），Bolt 浏览器内 WebContainers。
- [v0](./v0.md) — 同为 Vercel 系：v0 绑 Vercel 部署链，Bolt 自带 Bolt Cloud。
- [Replit Agent](./replit-agent.md) — 云 IDE+agent 对照：Replit 给完整云开发环境，Bolt 把环境压进浏览器。
