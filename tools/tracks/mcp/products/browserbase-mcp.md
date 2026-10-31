---
id: browserbase-mcp
form: mcp
name: Browserbase MCP Server
vendor: Browserbase
homepage: https://docs.browserbase.com/integrations/mcp/introduction
license: 自托管仓 Apache-2.0（GitHub API 核验 2026-10-31）；托管线闭源服务（Browserbase ToS 约束）。
licenseEn: Self-hosted repo Apache-2.0 (GitHub API verified 2026-10-31); the hosted line is a closed service (Browserbase ToS).

axes:
  model_access: >-
    **它自己需要外部模型跑 Stagehand**——托管线由 Browserbase 侧提供 Gemini 的 LLM 成本
    （官方 README 明写 hosted 版「provide the LLM costs for Gemini」）；自托管线要自备
    GEMINI_API_KEY（可 --modelName 换其他模型并配对应 key）。它是「浏览器自动化 + 模型」的混合体，
    不是纯接口包装。
  runtime: >-
    现役主推**官方托管远程 server**（https://mcp.browserbase.com/mcp，streamable-http）；
    自托管线走 npm（@browserbasehq/mcp 3.0.0，2026-03-31）或克隆 GitHub 仓。
    **GitHub 仓 browserbase/mcp-server-browserbase 已 archived**（API 核验 archived=true，
    3,397★，推送停 2026-07-20）——README 顶部明写「不再维护、仅存档、不代表现役生产实现」；
    底座 Stagehand 仓仍活跃（MIT 25,883★，推送 2026-10-30）。
  local_files: >-
    不读写本机文件——产物是云端浏览器会话里的页面状态与抽取结果（文本/结构化数据）。
    自托管线跑在你自己的机器上，但浏览器本身仍是 Browserbase 云端会话（要 BROWSERBASE_API_KEY）。
  background: >-
    浏览器会话活在 Browserbase 云端（start 创建/复用会话、end 关闭）；无本机后台进程。
    会话生命周期由工具调用显式管理，不是常驻。
  tools: >-
    **6 个工具**（README 口径，托管与自托管同工具集）：start（创建/复用会话）/ end（关闭会话）/
    navigate（导航到 URL）/ act（按自然语言指令对页面动手）/ observe（观察可操作元素）/
    extract（按指令抽取页面数据）。act/observe/extract 三件套由 Stagehand 的
    act-and-observe 范式驱动。
  context: >-
    无 server 侧跨会话记忆；上下文=当前 Browserbase 浏览器会话（start 可复用既有会话）。
    会话内页面状态自然连续，跨会话不保。
  permissions: >-
    托管线要 Browserbase 账户（API key + project id，配在客户端）；自托管线要
    BROWSERBASE_API_KEY/BROWSERBASE_PROJECT_ID/GEMINI_API_KEY 三个环境变量。
    **act 能在真实网页上动手**（点击/填表）——授权边界按目标站点把关；云端会话内容在
    Browserbase 侧留存，敏感流程要自己评估。
  fit: >-
    适合：要「云端浏览器 + 自然语言驱动网页」的 agent（无需本地起浏览器）；要托管起步、
    LLM 成本由厂商包的省事路线。
    不适合：要开源可审计的完整实现（GitHub 仓已 archived，现役实现闭源在托管侧）；
    只要本地浏览器自动化的场景（Playwright MCP 更直接）。

pitfalls:
  - 把 GitHub 仓当现役实现——仓已 archived（README 顶部明写），官方推荐托管线 mcp.browserbase.com/mcp；「仓 archived ≠ 产品停运」是本档案的核心两口径
  - 以为自托管不需要 Browserbase 账户——自托管只是 server 进程在你机器上，浏览器会话仍在 Browserbase 云端，API key 照要
  - 以为它完全不需要模型 key——自托管线要自备 GEMINI_API_KEY（或换模型配对应 key），托管线才由厂商包 Gemini 成本
  - 把 act 当安全动作——它能在真实网页点击填表，登录态与写操作风险按目标站点把关

tags: [MCP, 浏览器自动化, 云端浏览器, Stagehand, 远程托管, 仓已归档]
related: [cursor, claude-code]

mcp:
  transport: >-
    **streamable-http**（托管 https://mcp.browserbase.com/mcp，官方推荐）+ **stdio**
    （npx @browserbasehq/mcp 自托管）；README 明写支持 STDIO 与 SHTTP 两种传输，推荐 SHTTP 走托管线。
    核验：仓 README（2026-10-31 经 GitHub API raw 直抓）+ docs.browserbase.com MCP 页（直连 200）。
  auth: >-
    Browserbase 账户凭据（BROWSERBASE_API_KEY + BROWSERBASE_PROJECT_ID）；自托管线另加模型 key
    （默认 GEMINI_API_KEY）。托管端点直连实测 400（存在、需正确 MCP 握手与鉴权，非死链）。
  scope: >-
    读面（navigate/observe/extract）+ **网页写面（act 点击填表）**；无本机文件写面。
    云端浏览器会话可带登录态——「在网页上动手」的边界按目标站点授权把关。

sources:
  - label: Browserbase · 官方文档 MCP 集成页（托管端点与配置线；直连 200）
    url: https://docs.browserbase.com/integrations/mcp/introduction
    kind: docs
  - label: browserbase/mcp-server-browserbase · 仓库（archived=true；Apache-2.0；3,397★，推送停 2026-07-20，GitHub API 核验；README 顶部归档声明+6 工具表+托管推荐）
    url: https://github.com/browserbase/mcp-server-browserbase
    kind: repo
  - label: GitHub commits · mcp-server-browserbase（仓归档前的变更记录线）
    url: https://github.com/browserbase/mcp-server-browserbase/commits/main
    kind: changelog
  - label: npm · @browserbasehq/mcp（自托管发版线：3.0.0，2026-03-31）
    url: https://www.npmjs.com/package/@browserbasehq/mcp
    kind: changelog

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Browserbase, Inc.（美国，云端浏览器基础设施厂商）。
  origin_note_en: Browserbase, Inc. (US, cloud browser infrastructure vendor).
  direct: yes
  direct_note: browserbase.com 与 docs.browserbase.com 直连 200；mcp.browserbase.com/mcp 直连 400（端点存在需鉴权）；GitHub 仓与 raw README 直连可达（2026-10-31）。
  direct_note_en: browserbase.com and docs.browserbase.com returned 200 direct; mcp.browserbase.com/mcp returned 400 direct (endpoint exists, auth required); the GitHub repo and raw README were reachable direct (2026-10-31).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**Browserbase 官方 MCP server**：云端浏览器 + Stagehand 自然语言网页驱动，6 工具
（start/end/navigate/act/observe/extract）。本档案的核心两口径：**GitHub 自托管仓已 archived**
（README 顶部明写「仅存档、不代表现役实现」）——**现役是托管线 mcp.browserbase.com/mcp**，
产品本身活跃（docs 在册、npm 3.0.0、底座 Stagehand 25,883★ 推送 2026-10-30）。
自托管线只是「server 进程在你机器上」，浏览器会话仍在 Browserbase 云端、API key 照要。

## 适合与不适合

适合：要云端浏览器免本地环境、自然语言 act/observe/extract 三件套、托管省事（厂商包 Gemini 成本）。
不适合：要开源可审计完整实现（现役实现闭源在托管侧）；只要本地浏览器自动化（Playwright MCP 更直接）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 托管线的速率/会话时长/并发配额（docs 有账户档位口径，未逐条清点；按 D9 与快照纪律不记数字）
- 自托管线换模型（--modelName）支持的模型清单与各家 key 要求（README 只给机制）
- 云端会话内容在 Browserbase 侧的留存时长与合规边界（ToS 面未逐条核验）

## 相关条目

- [Playwright MCP](./playwright.md) — 浏览器自动化对照：Playwright 驱动本地浏览器、纯接口无模型；Browserbase 是云端会话 + Stagehand 模型驱动。
- [Firecrawl MCP Server](./firecrawl-mcp.md) — 同为网页面官方 server：Firecrawl 重「读」（搜索/抓取/crawl/monitor），Browserbase 重「在网页上动手」。
