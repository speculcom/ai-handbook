---
id: sentry-mcp
form: mcp
name: Sentry MCP / Toolkit
vendor: Sentry
homepage: https://github.com/getsentry/toolkit
license: FSL-1.1-Apache-2.0（官方仓 LICENSE.md 直抓核验 2026-10-21：Functional Source License 1.1，Apache 2.0 未来许可——生产用途受限期后转 Apache）。
licenseEn: FSL-1.1-Apache-2.0 (official repo LICENSE.md, direct-fetched 2026-10-21: Functional Source License 1.1 with an Apache 2.0 future license — production use restricted until the change date).

axes:
  model_access: >-
    **它自己不调模型**——它是被 MCP 客户端调用的接口实现，选模型是客户端的事。
    它把 Sentry 平台能力（issue、事件、release、告警）包装成 MCP 工具供 agent 查询与诊断。
  runtime: >-
    官方托管远程 server 为主（mcp.sentry.dev 直抓 200）；仓 getsentry/toolkit 是官方工具线
    （936★，最近推送 2026-10-21，GitHub API 核验）。旧仓名 getsentry/sentry-mcp 已 redirect（直抓所见）。
  local_files: >-
    不碰本机文件系统——它操作的是 Sentry 云端数据（issue/事件/release）。
    本地日志与源码不在它作用域内；要读本地文件得配 filesystem server。
  background: >-
    远程托管形态与客户端进程无关，服务在 Sentry 侧；无断点续跑语义——
    MCP 会话模式是请求-响应，官方未提供后台任务机制。
  tools: >-
    面向「agent 查崩溃/诊断线上问题」的工具集：whoami、找 issue、看 issue 详情、
    事件与堆栈、release 对比等；完整工具清单以官方文档为准，未逐条清点。
  context: >-
    无跨会话记忆——每次会话独立，状态在 Sentry 平台本身。
    官方未提供 server 侧记忆或检索层（未核验到≠没有，已查文档未见）。
  permissions: >-
    权限由 Sentry 账号鉴权决定（OAuth 登录流）；能读 issue 与事件数据，
    写操作面（如解决 issue）以官方工具清单为准——未逐条核验写能力边界。
  fit: >-
    适合：编码 agent 直接查「这个报错在 Sentry 里有没有」、线上事故诊断接 agent 工作流。
    不适合：要本地日志分析（不在作用域）；要 FSL 限制期内的闭源商用集成（先读许可条款）。

pitfalls:
  - 用旧仓名 sentry-mcp 找仓库——现 redirect 到 getsentry/toolkit（2026-10-21 直抓核验）
  - 把 FSL 当 Apache——FSL-1.1 有生产用途限制期，到期才转 Apache 2.0
  - 把「查 issue」当「能修 issue」——写能力边界未逐条核验，别按读能力推写能力

tags: [MCP, 监控诊断, Sentry, 远程托管, FSL]
related: [cursor, claude-code]

mcp:
  transport: >-
    官方主推 **Streamable HTTP 远程托管**（mcp.sentry.dev）；
    客户端配置以官方文档为准。SSE 老传输的支持状态未逐条核验。
    核验：官方文档页与 mcp.sentry.dev 直抓 200（2026-10-21）。
  auth: >-
    走 Sentry 账号 OAuth 登录流（浏览器授权）；无 PAT 明文配置路线的官方说明——
    未逐条核验。凭据存储与轮换细节官方未展开。
  scope: >-
    作用域 = Sentry 账号可见的 org/project 数据面；读 issue/事件为主。
    写操作与高危工具清单未逐条核验；无独立审批机制的官方说明。

sources:
  - label: getsentry/toolkit · 仓库（FSL-1.1-Apache-2.0；936★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/getsentry/toolkit
    kind: repo
  - label: getsentry/toolkit · LICENSE.md（FSL-1.1-Apache-2.0 原文，2026-10-21 直抓核验）
    url: https://github.com/getsentry/toolkit/blob/main/LICENSE.md
    kind: docs
  - label: Sentry MCP · 官方托管端点页（直抓 200）
    url: https://mcp.sentry.dev
    kind: docs
  - label: getsentry/toolkit · Releases（changelog）
    url: https://github.com/getsentry/toolkit/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Sentry（Functional Software, Inc.，美国）。
  origin_note_en: Sentry (Functional Software, Inc., US).
  direct: no
  direct_note: github.com 直连实测 000（波动，同日代理可达 200）；mcp.sentry.dev 直连未测——大陆可达性未逐条核验。
  direct_note_en: github.com measured 000 direct (fluctuating; 200 via proxy the same day); mcp.sentry.dev mainland reachability not individually verified.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Sentry 官方的 agent 工具线**：把「查崩溃、看事件、对 release」包成 MCP 工具，
编码 agent 能直接问「这个报错线上有没有」。诚实标注：旧仓 sentry-mcp 已 redirect 到 getsentry/toolkit；
许可是 FSL-1.1-Apache-2.0——不是纯 Apache，生产用途有限制期。

## 适合与不适合

适合：编码/运维 agent 接 Sentry 诊断流、线上事故时让 agent 拉 issue 上下文。
不适合：本地日志分析（不在作用域）；FSL 限制期内的闭源商用集成。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 完整工具清单与写操作边界（未逐条清点）
- SSE 传输支持状态（未逐条核验）
- FSL 各版本 change date（未逐条核验——用前查 LICENSE.md 当前条款）

## 相关条目

- [GitHub MCP Server](./github-mcp.md) — 同为厂商官方远程 server：GitHub 版工具面宽且写能力齐全，Sentry 版以读诊断为主。
