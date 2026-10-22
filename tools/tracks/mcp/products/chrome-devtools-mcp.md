---
id: chrome-devtools-mcp
form: mcp
name: Chrome DevTools MCP
vendor: Google（Chrome DevTools 团队）
homepage: https://github.com/ChromeDevTools/chrome-devtools-mcp
license: Apache-2.0（GitHub API 核验 2026-10-21）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-21).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Chrome DevTools 协议（CDP）能力
    包装成工具：导航、点击、截图、性能 trace、网络与 console 日志。
  runtime: >-
    本地进程（npx 起 stdio，驱动本机 Chrome）；GitHub 53,940★，最近推送 2026-10-21（API 核验）——
    MCP 生态头部流量之一。
  local_files: >-
    操作的是浏览器运行时：页面、网络、console；截图/trace 可落本地路径（由参数指定）。
    它不读写你项目源码——那是 filesystem server 的活。
  background: >-
    随客户端生死（stdio 子进程）；Chrome 实例由它启动或连接。无后台任务语义。
  tools: >-
    导航/交互（click/type/upload）、截图、performance trace 与分析、网络与 console 读取、
    模拟（CPU/网络节流）等；完整清单以仓 README 为准。
  context: >-
    无跨会话记忆——页面状态在浏览器实例里，会话结束实例关闭。
  permissions: >-
    **它驱动一个真实浏览器**：能访问客户端让它去的任何 URL、以浏览器身份交互。
    官方口径是给编码 agent 做「看得到浏览器」的能力；隔离与白名单靠客户端/浏览器 profile 配置——
    server 本身无 URL 白名单机制的官方说明。
  fit: >-
    适合：编码 agent 调试真实页面、性能分析、E2E 验证闭环（改代码→看浏览器→再改）。
    不适合：要无头批量抓取（那是 fetch/firecrawl 线）；要 URL 级硬隔离（server 无此机制）。

pitfalls:
  - 把它当 Playwright MCP 的替代品混用——两者重叠但机制不同（CDP 直连 vs Playwright 驱动），官方 reference 归档后推荐 Playwright 是另一条线，两者现役都活跃
  - 忘了它驱动真实浏览器=真实网络出口——agent 让它访问什么就访问什么
  - 把 53k★ 当「安全默认」——星数是热度，权限面要按「浏览器身份」单独评估

tags: [MCP, 浏览器调试, CDP, Apache2.0, 本地stdio, 性能分析]
related: [cursor, claude-code]

mcp:
  transport: >-
    **stdio**（npx chrome-devtools-mcp@latest）；HTTP 模式支持状态未逐条核验。
    核验：仓 README（2026-10-21 直抓）。
  auth: >-
    无凭据层——它不需要账号 token，权限=浏览器实例能做的事。
    连接既有 Chrome 实例（--connect-to-existing-browser 一类）支持面未逐条核验。
  scope: >-
    作用域=浏览器运行时：任意导航、交互、读网络/console、跑 performance trace。
    无 URL 白名单/审批层的官方说明——收紧靠客户端侧工具审批与浏览器 profile 隔离。

sources:
  - label: ChromeDevTools/chrome-devtools-mcp · 仓库（Apache-2.0；53,940★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/ChromeDevTools/chrome-devtools-mcp
    kind: repo
  - label: ChromeDevTools/chrome-devtools-mcp · Releases（changelog）
    url: https://github.com/ChromeDevTools/chrome-devtools-mcp/releases
    kind: changelog
  - label: Chrome DevTools · 官方文档（CDP 能力背景）
    url: https://developer.chrome.com/docs/devtools
    kind: docs

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Google（Chrome DevTools 团队）。
  origin_note_en: Google (Chrome DevTools team).
  direct: no
  direct_note: github.com 直连实测 000（波动，同日代理可达 200）。
  direct_note_en: github.com measured 000 direct (fluctuating; 200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Chrome 官方团队做的「让 agent 看见浏览器」**：CDP 直连，导航、交互、截图、performance trace、
网络与 console 全暴露给编码 agent。Apache-2.0、53k★、活跃维护。
安全口径一句话：**它驱动真实浏览器=真实网络出口，server 本身没有 URL 白名单层**。

## 适合与不适合

适合：编码 agent 的「改代码→浏览器验证」闭环、性能诊断、E2E 调试。
不适合：批量抓取（fetch/firecrawl 更合适）；要 URL 级硬隔离的场景。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- HTTP 传输模式支持状态（未逐条核验）
- 连接既有浏览器实例的参数面（未逐条核验）
- 与 Playwright MCP 的能力差异矩阵（重叠区未逐条对照）

## 相关条目

- [Playwright MCP](./playwright.md) — 浏览器自动化双雄对照：Playwright MCP 走 Playwright 驱动线，本条走 CDP 直连+性能分析线。
