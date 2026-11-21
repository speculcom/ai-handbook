---
id: activepieces
form: web
name: Activepieces
vendor: Activepieces Inc.
homepage: https://www.activepieces.com
license: 混合许可（官方 LICENSE 直抓核验 2026-10-21）：ee 目录归商业许可；其余内容 MIT Expat；第三方组件保留原许可（2026-11-21 复核）。
licenseEn: Mixed license (official LICENSE, direct-fetched 2026-10-21): content under ee/ directories falls under the commercial license; everything else is MIT Expat; third-party components keep their original licenses.

axes:
  model_access: >-
    不内置模型权重：AI pieces 经凭据接各家模型（OpenAI 等），另提供 AI SDK 在 flow 内搭 agent；自托管时凭据留在自己实例上（2026-11-21）。
  runtime: >-
    开源自托管 + 官方云两条线：生产自托管用 Docker Compose + PostgreSQL + Redis；单机 hobby 容器用 PGLite + 内存队列（不可扩到企业版）；仓库 25,150★、最近推送 2026-10-21（2026-11-21）。
  local_files: >-
    自托管数据落自有环境：hobby 容器写 `~/.activepieces`，生产写自己的 PostgreSQL/Redis；pieces 凭据与执行数据都在实例内，云版则归厂商托管（2026-11-21）。
  background: >-
    自托管实例常开承载定时与 webhook 触发；生产用 Redis 队列 worker 跑多实例，human-in-the-loop 支持延时等待与审批，flow 自带自动重试与版本化（2026-11-21）。
  tools: >-
    pieces（集成）生态是核心：官方 MCP 页称一个 server URL 覆盖 770+ 应用，仓库 README 标 280+ pieces 可作 MCP（两个口径随版本增长）；builder 含 loops、branches、自动重试、HTTP、Code with NPM、ASK AI、版本化与模板（2026-11-21）。
  context: >-
    flow 内步骤间的数据传递与变量引用是上下文主轴；每次执行的历史按 flow 持久保存，跨 flow 共享靠显式存储/队列 piece，不靠隐式记忆（2026-11-21）。
  permissions: >-
    社区版 MIT Expat，企业功能在 `packages/ee` 商业许可区；SSO/项目/权限等企业能力按 ee 线。MCP 连接走 OAuth2 限定 scope、凭据 256-bit 加密且不提供读回 API（2026-11-21）。
  fit: >-
    适合：要 MIT 主体许可的自托管自动化、要可魔改的低代码、要把 pieces 直接暴露给 MCP 客户端。不适合：要 Zapier 同量级连接器生态、要企业功能开箱（在 ee 商业线）（2026-11-21）。

pitfalls:
  - 把「MIT 主体」读成全仓 MIT——ee/ 目录是商业许可区
  - 与 Zapier/Make 比连接器数量——体量差距大，先核自己要的集成有没有
  - 把云版与自托管版功能混同——SSO 等在 ee 线

tags: [开源, MIT混合, 自托管, 低代码, 工作流]
related: [openai-agents-sdk]

sources:
  - label: Activepieces/Activepieces · LICENSE（MIT Expat + ee 商业区，2026-10-21 直抓核验）
    url: https://github.com/Activepieces/Activepieces/blob/main/LICENSE
    kind: docs
  - label: Activepieces/Activepieces · 仓库（25,150★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/Activepieces/Activepieces
    kind: repo
  - label: Activepieces · 官方文档（2026-11-21 抓取 200）
    url: https://www.activepieces.com/docs
    kind: docs
  - label: Activepieces/Activepieces · Releases（changelog，2026-11-21 抓取 200）
    url: https://github.com/Activepieces/Activepieces/releases
    kind: changelog
  - label: Activepieces · Install Options（Docker Compose + PostgreSQL + Redis，2026-11-21 抓取 200）
    url: https://www.activepieces.com/docs/install/overview
    kind: docs
  - label: Activepieces · Hobbyist Installation（PGLite + 内存队列边界，2026-11-21 抓取 200）
    url: https://www.activepieces.com/docs/install/options/docker
    kind: docs
  - label: Activepieces/Activepieces · README（280+ pieces、60% 社区贡献与 MCP，2026-11-21 抓取 200）
    url: https://raw.githubusercontent.com/activepieces/activepieces/main/README.md
    kind: docs
  - label: Activepieces · MCP 页（一个 server URL 覆盖 770+ 应用与 OAuth 鉴权，2026-11-21 抓取 200）
    url: https://www.activepieces.com/mcp/cometapi
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Activepieces Inc.（美国）。
  origin_note_en: Activepieces Inc. (US).
  direct: yes
  direct_note: activepieces.com/docs 直连实测 200（2026-10-21）。
  direct_note_en: activepieces.com/docs measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**Activepieces 是开源低代码自动化平台**：主体 MIT Expat，只有 ee/ 目录是商业许可区——
比 n8n 的 SUL 宽松，代价是连接器体量小得多。自托管 + 官方云两条线。

## 适合与不适合

适合：要 MIT 级许可自由度、要自托管、要能读源码魔改。
不适合：要海量现成连接器（先核你要的 piece 存不存在）；要企业功能开箱（SSO 在 ee 线）。

## 实测记录

本档核对官方安装文档、仓库 README 与 MCP 页；队列吞吐、社区版边界与具体 piece 可用性需按自己实例实测。
## 未知项清单

- pieces 生态数量：官方 MCP 页 770+、README 280+，按版本页核对。
- MCP 客户端兼容：官方称 Claude、Cursor 与任意 MCP 客户端。
- queue worker 在社区版的完整边界：按 self-host 文档与 Redis 配置核对。
## 相关条目

- [n8n](./n8n.md) — 许可对照：同为自托管自动化，SUL（fair-code）vs MIT+ee 混合是核心分野。
