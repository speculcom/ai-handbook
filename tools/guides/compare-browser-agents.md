---
id: compare-browser-agents
topic: planning
title: 浏览器 Agent 三选一：Playwright MCP / Browserbase MCP / Chrome DevTools MCP
titleEn: Browser agents: Playwright, Browserbase, DevTools
summary: 三个浏览器 MCP 的适用条件、能力边界与价格档位；按「本地还是云端、要不要模型、要不要性能分析」给出一句选择，并写明什么情况下换另一个。
summaryEn: Applicability, capability limits and plan tiers for three browser MCP servers; a one-line choice based on local vs cloud, whether a model is needed and whether performance analysis is required, plus when to switch.
sources:
  - label: Microsoft · Playwright MCP 仓库（72 个工具、v0.0.83 2026-09-28）
    url: https://github.com/microsoft/playwright-mcp
    kind: repo
  - label: Browserbase · MCP 官方文档（托管端点与 6 个工具）
    url: https://docs.browserbase.com/integrations/mcp/introduction
    kind: docs
  - label: Browserbase · Pricing（档位名称与并发口径，2026-11-03 直抓）
    url: https://www.browserbase.com/pricing
    kind: pricing
  - label: ChromeDevTools · chrome-devtools-mcp 仓库（Apache-2.0、v1.12.0 2026-10-22）
    url: https://github.com/ChromeDevTools/chrome-devtools-mcp
    kind: repo
last_verified: 2026-11-03
confidence: partial
---

## [一句话选择|One-line choice]

- **本机浏览器 + 结构化页面快照 + 不需视觉模型**：选 Playwright MCP。
- **不想在本机起浏览器 + 要自然语言驱动网页**：选 Browserbase MCP。
- **给编码 Agent 看页面、抓性能与 console**：选 Chrome DevTools MCP。

## [适用条件|When each fits]

| 问题 | Playwright MCP | Browserbase MCP | Chrome DevTools MCP |
|---|---|---|---|
| 跑在哪 | 本机 Node.js 进程 | Browserbase 云端浏览器 | 本机进程，驱动本机 Chrome |
| 怎么连 | stdio；也提供 HTTP endpoint | 托管 `streamable-http` 端点 | stdio（`npx chrome-devtools-mcp@latest`） |
| 服务端模型依赖 | 无需视觉模型；客户端 Agent 仍可能使用 LLM | Stagehand 驱动 act/observe/extract | 包装 CDP；客户端 Agent 仍可能使用 LLM |
| 适合谁 | 写 E2E、表单与固定流程 | 云端跑批量网页任务、不想管浏览器 | 编码 Agent 的调试与性能分析 |
| 工具面 | 72 个（2026-10-08 核对） | 6 个（start / end / navigate / act / observe / extract） | 导航、交互、截图、trace、网络与 console |

## [能力边界|Capability limits]

**Playwright MCP**

- 默认有头模式，`--headless` 可切；headless 默认空闲 1 小时关闭，headed 默认不自动关闭。
- 用户 profile 默认落盘在 Playwright 缓存目录（按 workspace hash 隔离），`--isolated` 可改为仅存内存。
- 官方工具包括文件上传；可访问路径与客户端授权、工作区配置有关。不要据“核心是浏览器控制”推断不能读取或上传本地文件。
- 版本仍是 `0.0.x`（v0.0.83 于 2026-09-28），工具名可能继续变。

**Browserbase MCP**

- 托管线由 Browserbase 提供 Gemini 的 LLM 成本；自托管线要自备 `GEMINI_API_KEY`（可换模型并配对应 key）。
- 自托管只是 server 在你机器上，浏览器会话仍在 Browserbase 云端，`BROWSERBASE_API_KEY` 与 project id 照要。
- GitHub 仓 `browserbase/mcp-server-browserbase` 已归档（归档状态与 2026-07-20 停推已核验）；现役实现是托管线。
- `act` 能在真实网页点击填表，授权边界按目标站点把关。

**Chrome DevTools MCP**

- 驱动真实浏览器：客户端让它访问什么就访问什么，server 本身没有 URL 白名单的官方说明。
- 能力集中在运行时：页面、网络、console、performance trace、CPU/网络节流。
- 不读写项目源码；那是 filesystem server 的职责。
- 随客户端生死（stdio 子进程），无后台任务语义。

## [价格档位|Plan tiers]

只列档位名，不写价格数字（单价与额度查官方定价页当日值）：

| 产品 | 档位 |
|---|---|
| Playwright MCP | 开源仓库，无付费档位 |
| Browserbase MCP | Free / Developer / Startup / Scale（Scale 为定制） |
| Chrome DevTools MCP | 开源仓库（Apache-2.0），无付费档位 |

Browserbase 的免费档有并发浏览器的上限，付费档按并发与浏览器小时递增；具体数字以定价页为准。

## [什么情况选另一个|When to switch]

- 选 Playwright 后，如果不想在本机维护浏览器与依赖：换 Browserbase。
- 选 Browserbase 后，如果要开源可审计的完整实现：换 Playwright 或 Chrome DevTools（Browserbase 现役实现闭源在托管侧）。
- 选 Chrome DevTools 后，如果要脱离本机、批量跑多会话：换 Browserbase。
- 选 Chrome DevTools 后，如果只要稳定的固定流程、不要调试面：换 Playwright。
- 选 Playwright 后，如果目标是性能 trace 与 console 取证：换 Chrome DevTools。

## [核验事实|Dated facts]

本页仅局部复核了 Playwright MCP 的视觉模型依赖与文件上传说明（官方 README，2026-11-04）；下列其他数据保留原核验快照，不代表当日完整复核。

1. Playwright MCP 由 Microsoft 维护，本地 Node.js 18+、stdio 通信，工具数 72（2026-10-08 核对），最新记录版本 v0.0.83（2026-09-28）。
2. Browserbase MCP 托管端点为 `https://mcp.browserbase.com/mcp`（streamable-http），工具 6 个；GitHub 仓 archived（2026-07-20 停推）。
3. Browserbase 定价页档位为 Free / Developer / Startup / Scale（2026-11-03 直抓）；D9 口径不采价格数字。
4. Chrome DevTools MCP 为 Apache-2.0，v1.12.0 于 2026-10-22 发布；仓库 54,460★、最近推送 2026-10-29（GitHub API 核验）。
