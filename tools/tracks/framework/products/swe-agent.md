---
id: swe-agent
form: harness
name: SWE-agent
vendor: Princeton / Stanford（学术团队）
homepage: https://swe-agent.com
license: MIT（GitHub API 核验 2026-10-30）。
licenseEn: MIT (GitHub API verified 2026-10-21).

family: general-harness
providers:
  - 接口层接入：OpenAI/Anthropic/HF 等（官方文档为准，未逐条清点）
  - 研究向：官方示例配置含 OpenAI/Anthropic 模型线（未逐条清点），模型选择与基准复现绑定
axes:
  model_access: >-
    各家 LLM 经接口层接入（OpenAI/Anthropic/HF 等，以官方文档为准，未逐条清点）；
    它的核心贡献是 **ACI（agent-computer interface）**——为 agent 设计的文件编辑/命令交互界面。
  runtime: >-
    Python 库 + 命令行（pip 装）；GitHub 20,682★，最近推送 2026-10-26（API 核验）。
    学术出身（Princeton/Stanford 论文线）；SWE-bench 评测生态与它深度关联（同团队的基准线）。
  local_files: >-
    agent 在容器或本机环境里读写文件、跑命令——文件操作真实发生在你给的环境；
    官方推荐容器化跑（隔离口径）。
  background: >-
    任务型运行：给定 issue→跑修复→结束；无常驻语义。批量评测跑（SWE-bench 式）是它的主用法之一。
  tools: >-
    工具面就是它的 ACI 设计核心：文件查看/编辑、搜索、命令执行——
    「为 agent 设计的界面」是它的研究命题，不是通用工具生态。
  context: >-
    单任务上下文窗口管理是它的研究点（历史压缩/窗口策略）；跨会话记忆不是它的叙事。
  permissions: >-
    **命令执行=真实权限面**：agent 能跑 shell 命令，官方推荐容器隔离——
    裸机直跑的风险口径官方文档有提示（未逐条核验细节）。
  fit: >-
    适合：研究/评测「agent 修代码」能力（SWE-bench 线）、要 ACI 设计参考实现。
    不适合：生产编码助手开箱（它是研究向 harness）；要 GUI 产品形态。

pitfalls:
  - 把它当生产编码 agent——它是研究向 harness（论文与评测线），产品化要自己补
  - 裸机直跑命令执行面——官方推荐容器隔离，别省这层
  - 与 SWE-bench 基准混谈——SWE-bench 是评测集（同团队另一产物），SWE-agent 是跑评测的 agent 框架

tags: [开源, MIT, 研究向, 代码修复, ACI, SWE-bench]
related: [claude-code-cli, codex-cli]

sources:
  - label: SWE-agent/SWE-agent · 仓库（MIT；20,682★，最近推送 2026-10-26，GitHub API 核验）
    url: https://github.com/SWE-agent/SWE-agent
    kind: repo
  - label: SWE-agent · 官方文档站
    url: https://swe-agent.com
    kind: docs
  - label: SWE-agent/SWE-agent · Releases（changelog）
    url: https://github.com/SWE-agent/SWE-agent/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Princeton / Stanford 学术团队（美国）。
  origin_note_en: Princeton / Stanford academic teams (US).
  direct: yes
  direct_note: swe-agent.com 直连实测 200（2026-10-21）；GitHub 仓大陆直连波动（同日代理可达）。
  direct_note_en: swe-agent.com measured 200 direct (2026-10-21); the GitHub repo's mainland reachability fluctuates (200 via proxy the same day).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**SWE-agent 是「agent 修代码」研究线的标杆 harness**（MIT，Princeton/Stanford）：
ACI（为 agent 设计的计算机界面）是它的核心命题，与 SWE-bench 评测生态同源。
生产开箱不是它的定位——它是给研究与评测用的参考实现。

## 适合与不适合

适合：评测/研究编码 agent、ACI 设计参考、SWE-bench 跑分。
不适合：生产编码助手开箱；要产品形态。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)。

## 未知项清单

- 模型接口全目录（未逐条清点）
- 容器隔离的当前默认配置细节（未逐条核验）
- 与 mini-SWE-agent 轻量线的关系（官方有精简线，未逐条核验）

## 相关条目

- [OpenHands](./openhands.md) — 同为「agent 修代码」线：OpenHands 走产品化 harness，SWE-agent 走研究评测线。
- [Claude Code CLI](../../coding/products/claude-code-cli.md) — 跨大类对照：生产编码 agent 与评测 harness 的用途分野。
