---
id: open-interpreter
form: harness
name: Open Interpreter
vendor: Open Interpreter（开源社区）
homepage: https://www.openinterpreter.com
license: Apache-2.0（GitHub API 核验 2026-10-31）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-31).

family: coding-base
providers:
  - 主打开放权重模型（官方仓描述点名 Kimi K3、GLM 5.3 这类开放模型；闭源模型接入面未逐条清点）
axes:
  model_access: >-
    定位就是「给开放模型做编码 agent」（官方仓描述与站点标题同口径，点名 Kimi K3/GLM 5.3 一类开放模型）；
    开放权重模型本地跑 + 终端 agent 是它的组合叙事。
  runtime: >-
    **终端里跑的编码 agent**（CLI 形态）：agent 在你机器上执行代码/命令。GitHub openinterpreter/openinterpreter
    68,746★、最近推送 2026-10-11（API 核验）；releases 走 rust-v* 线（rust-v0.0.56，2026-10-07）——Rust 重写线在册。
  local_files: >-
    本地执行是产品本体：代码与命令直接落在你的机器上跑，工作目录即你的文件系统；
    没有「云端替你跑」的托管面（未见官方托管线）。
  background: >-
    常驻在你的终端会话里，按任务循环执行-观察-再执行；
    它不是库形态的底座，是拿来即用的终端 agent（与 SDK/框架类形态不同）。
  tools: >-
    代码执行/文件/命令类工具面是本体能力；MCP 支持状态未逐条核验（官方文档有终端指南，细节未核）。
  context: >-
    会话式上下文按任务推进（细节未逐条核验）；主打开放模型一侧的上下文窗取决于你所选的本地模型。
  permissions: >-
    **权限面是选型重点**：agent 在你机器上执行代码与命令——本地执行 agent 的权限边界要自己设防
    （沙箱/最小权限/审批流是运维责任，不是框架默认给的安全网）。
  fit: >-
    适合：开放权重模型 + 本地终端编码 agent、要代码执行落在自己机器上、Rust 重写线的跟进者。
    不适合：要云端托管执行、要企业管控面、把「本地执行」当默认安全的人。

pitfalls:
  - 两代形态别混：旧 Python 线（当年「让 LLM 在你电脑跑代码」出圈）与当前 Rust 重写线（releases rust-v*）是两代——按 releases 线看现状
  - 仓库已更名迁移：OpenInterpreter/open-interpreter → openinterpreter/openinterpreter（API 301 当日核验）——旧链接会跳
  - 条款面薄：站点只有 /privacy（200），/terms 404——商用前条款依据要再核
  - 本地执行=权限在你：agent 执行代码命令落在你的机器，边界不设防就是全开

tags: [开源, Apache2.0, 本地执行, 开放模型, 终端agent]
related: [claude-code-cli, aider-cli, ollama]

sources:
  - label: openinterpreter/openinterpreter · 仓库（Apache-2.0；68,746★，最近推送 2026-10-11，GitHub API 核验；自 OpenInterpreter/open-interpreter 301 迁移）
    url: https://github.com/openinterpreter/openinterpreter
    kind: repo
  - label: Open Interpreter · 官方文档（/docs/terminal）
    url: https://www.openinterpreter.com/docs/terminal
    kind: docs
  - label: Open Interpreter · Releases（rust-v0.0.56，2026-10-07）
    url: https://github.com/openinterpreter/openinterpreter/releases
    kind: changelog
  - label: Open Interpreter · 官方博客
    url: https://www.openinterpreter.com/blog
    kind: changelog

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Open Interpreter 开源社区（GitHub org「Open Interpreter」，8 个公开仓；站点主体名未在 privacy 页明文抓到，按社区项目记）。
  origin_note_en: Open Interpreter open-source community (GitHub org "Open Interpreter", 8 public repos; the site's signing entity is not plainly stated on the privacy page, recorded as a community project).
  direct: yes
  direct_note: openinterpreter.com 直连 308→www 200、/docs /blog /privacy 直连 200（2026-10-31）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: openinterpreter.com measured 308→www 200 direct, /docs /blog /privacy 200 direct (2026-10-31); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；开源本地工具不面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); an open-source local tool not serving the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**Open Interpreter 把「开放模型 + 本地终端执行」做成产品**（Apache-2.0）：
一个跑在你终端里的编码 agent，代码与命令直接落在你的机器上执行；当前走 Rust 重写线
（releases rust-v*），主打 Kimi K3/GLM 5.3 这类开放权重模型。

## 适合与不适合

适合：开放权重模型配本地终端 agent、要执行落在自己机器、跟进 Rust 重写线。
不适合：要云端托管执行、要企业管控面、把本地执行当默认安全。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- 站点签约主体（/privacy 页未在原始 HTML 明文抓到主体名；/terms 404）
- MCP 支持状态（官方文档有终端指南，细节未逐条核验）
- Rust 重写线与旧 Python 线的功能对照表（未逐条对照）

## 相关条目

- [Claude Code CLI](../../coding/products/claude-code-cli.md) — 跨大类对照：同为终端编码 agent，Claude Code 绑自家模型线，Open Interpreter 主打开放模型。
- [Aider CLI](../../coding/products/aider-cli.md) — 跨大类对照：同为开源终端编码 agent，Aider 主轴 git 内迭代，Open Interpreter 主轴本地执行。
- [Ollama](../../runner/products/ollama.md) — 跨大类对照：Ollama 把开放模型跑在本地，Open Interpreter 消费这类本地模型做终端 agent。
