---
id: google-antigravity
form: ide
name: Google Antigravity
vendor: Google
homepage: https://antigravity.google

axes:
  model_access: >-
    官方 overview 页的界面截图直接列出模型选择器：Gemini 系与 Claude 系、GPT-OSS 等并列可选
    （截图所示清单，未逐条核验为完整列表）；CLI 会话头显示当前模型（如 Gemini 3.8 Flash High）。
    模型面由 Google 侧上架决定，第三方模型可用性随官方调整。
  runtime: >-
    四个官方面（overview 页原文口径）：Antigravity App（桌面端，v2.5+，从 Agent Manager 演进的
    独立指挥中心）、Antigravity CLI（终端客户端，本地 shell/远程云环境/SSH 都能跑）、
    Editor extensions（5 个 IDE 的扩展）、Antigravity SDK（Python 编程运行时）。
    App/CLI/IDE 扩展的执行都在你本机环境；SDK 是「几行 Python 跑 agent harness」。
  local_files: >-
    官方 settings 文档明示边界：默认 agent 只能访问活动项目文件夹与 ~/.gemini/antigravity-ide/
    （产物、知识项、配置都在这个本地目录）；「非工作区文件访问」是显式开关，默认关。
  background: >-
    官方叙事同时覆盖同步 pair-programming 与异步后台 agent：App 支持按项目归档对话、
    定时任务（scheduled messages/tasks）自动处理日常工作；CLI 可调度后台子 agent。
  tools: >-
    产物机制（Artifacts：实现计划/验证报告/提议变更）是核心面；浏览器在环（browser-in-the-loop）
    做前端自动化验证；MCP 支持状态未逐条核验（官方文档导航未见独立 MCP 页，本次未逐页读）。
  context: >-
    知识项（knowledge items）落 ~/.gemini/antigravity-ide/ 本地目录（settings 文档口径）；
    跨会话记忆的产品化程度未逐条核验。
  permissions: >-
    官方 settings 文档给出三层控制面：终端命令自动执行（请求审查 vs 始终继续+可配白/黑名单）、
    非工作区文件访问开关（默认关）、严格模式（限制外部资源与敏感操作）。账号走 Google 体系。
  fit: >-
    适合：要 Google 系模型+多面协同（桌面指挥中心/终端/IDE 扩展/SDK 同一 harness）、
    要定时任务与后台子 agent、要「命令执行策略」显式可调的团队。
    不适合：大陆直连场景（主域直连不稳）、要把产物放非 Google 账号体系的。

pitfalls:
  - 四个面（App/CLI/IDE 扩展/SDK）是同一 harness 的不同入口，不是四个独立产品——别按 Gemini Code Assist
    或 Firebase Studio 的旧认知套它（官方文档有 Firebase Studio 迁移页，那条线并入本平台叙事）
  - 「始终继续」模式=agent 自动执行 shell 命令（官方原文标注自主性高、风险高）——默认是请求审查，别顺手改完就忘
  - 模型选择器截图里的清单是界面快照，不是承诺——第三方模型可用性随官方上架变化

tags: [免费, 桌面指挥中心, CLI, IDE扩展, SDK, 定时任务, 严格模式]
related: [gemini-cli, jules, chrome-devtools-mcp]

sources:
  - label: Google Antigravity · 官网（四产品面叙事）
    url: https://antigravity.google
    kind: official
  - label: Antigravity Docs · Choose your Antigravity（四面对照/模型选择器界面）
    url: https://antigravity.google/docs/overview
    kind: official
  - label: Antigravity Docs · 设置（命令执行/工作区边界/严格模式）
    url: https://antigravity.google/docs/settings
    kind: official
  - label: Antigravity Docs · Release Notes（changelog）
    url: https://antigravity.google/docs/release-notes
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Google（美国）。
  origin_note_en: Google (US).
  direct: no
  direct_note: antigravity.google 大陆直连实测 000（2026-10-21，代理下 200）——直连不可达，需网络环境。
  direct_note_en: antigravity.google measured 000 direct from mainland (2026-10-21; 200 via proxy) —
    unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Google Antigravity 是 Google 的 agent-first 开发平台**：桌面指挥中心/CLI/IDE 扩展/Python SDK
四面共用一套 harness，命令执行策略与工作区边界是官方显式给的三档控制面。

## 适合与不适合

适合：Google 系模型+多面协同、定时任务与后台子 agent、执行策略显式可调。
不适合：大陆直连场景（主域直连 000）、要产物脱离 Google 账号。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **模型选择器实际完整清单**（overview 页截图非承诺清单）
- **定时任务在 App 关闭后是否继续跑**（官方叙事有 scheduled tasks，执行位置未逐页读）
- **严格模式各子开关的实际拦截行为**

## 未知项清单

- MCP 支持状态（未逐页读官方文档导航）
- 免费/付费边界与配额细节（D9：价格数字不采；能力边界未逐条核验）
- 跨会话记忆产品化程度（知识项机制细节未逐条核验）
- 定时任务的执行位置（本机 vs 云，未核验到官方声明）

## 相关条目

- [Gemini CLI](./gemini-cli.md) — 同厂终端 agent 前代线：Antigravity CLI 与它的关系官方未逐页声明。
- [Jules](./jules.md) — 同厂云异步线：Jules 在云 VM 跑，Antigravity 四面都在你本机。
