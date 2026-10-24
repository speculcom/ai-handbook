---
id: grafana-mcp
form: mcp
name: Grafana MCP Server
vendor: Grafana Labs
homepage: https://github.com/grafana/mcp-grafana
license: Apache-2.0（GitHub API 核验 2026-10-23）。
licenseEn: Apache-2.0 (GitHub API verified 2026-10-23).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Grafana 实例
    （仪表盘、数据源、告警、OnCall/IRM 等）包装成工具给 agent 用。
  runtime: >-
    本地进程（uvx mcp-grafana stdio；官方另给 Docker、二进制、Helm 部署线）；
    GitHub 3,593★，最近推送 2026-10-23，最新 release v2.1.1（2026-10-20，API 核验）。
    完整功能要求 Grafana 9.0 或更新（官方 README：更早版本缺 API 端点，数据源类操作可能不可用）。
  local_files: >-
    不读写本机文件——作用域是 Grafana 实例与其连接的数据源；
    统一 SQL 的凭据由数据源配置处理，官方 README 明写服务端看不到凭据。
  background: >-
    stdio 随客户端生死；无后台任务语义。
  tools: >-
    仪表盘族（搜索/读取/摘要/JSONPath 属性提取/更新/创建/patch）、数据源族、
    统一 SQL（ClickHouse/Snowflake/Athena/MySQL/PostgreSQL/MSSQL）、
    Prometheus/Loki/CloudWatch/Elasticsearch 等查询族、Cloud Logging、RBAC 与用户管理族；
    部分工具组（跑面板查询、查询示例、Graphite）**默认禁用**，要 --enabled-tools 开启。
    完整清单以仓 README 为准。
  context: >-
    无 server 侧跨会话记忆——状态在 Grafana 实例本身。
    官方 README 专门警告：整份仪表盘 JSON 很吃上下文窗口，
    优先用 summary/JSONPath/patch 这类省窗口的工具。
  permissions: >-
    **权限面是这条目的核心**：Grafana 服务账号 token + RBAC 细粒度 scopes
    （官方 README 逐工具列最小动作）；README 同时给了省事提示——内置 Editor 角色
    比手工 scopes 粗，只在「方便比最小权限重要」时用。
    SSE/streamable-http 线可另设调用方鉴权（--server-auth-token），stdio 不受影响。
  fit: >-
    适合：agent 在自托管或 Grafana Cloud 上查仪表盘/指标/告警、改仪表盘、
    跨数据源统一 SQL 查询。
    不适合：零配置无 token 场景（要服务账号 token）；Grafana 9.0 以下（部分功能缺）。

pitfalls:
  - 把「开源」当「零配置」——要 GRAFANA_URL 加服务账号 token，RBAC scopes 决定哪些工具真能用
  - 默认拉整份仪表盘 JSON——官方 README 明说吃上下文窗口，summary/JSONPath/patch 才是预期用法
  - 以为所有工具都在——跑面板查询、查询示例、Graphite 等默认禁用，要 --enabled-tools
  - 图省事直接给 Editor 角色——官方提示它比手工 scopes 粗，严格最小权限场景别用它

tags: [MCP, 可观测, Grafana, Apache-2.0, 本地stdio, 自托管]
related: [cursor, claude-code]

mcp:
  transport: >-
    **stdio**（uvx mcp-grafana）为主；官方另提供 SSE/streamable-http 服务模式
    （可加调用方鉴权）。核验：仓 README（2026-10-23 直抓）。
  auth: >-
    服务端用 GRAFANA_SERVICE_ACCOUNT_TOKEN 连 Grafana；客户端侧可选
    --server-auth-token Bearer（仅 SSE/streamable-http 生效）。
    官方 README：启用调用方鉴权时，验证过的 Authorization 头会在到达 Grafana 前被剥掉。
  scope: >-
    读写都有：仪表盘读 + 更新/创建/patch，告警与 IRM 线有写动作；
    每工具最小 RBAC 动作 README 有列表。SQL 凭据走数据源配置，server 不经手。

sources:
  - label: grafana/mcp-grafana · 仓库（Apache-2.0；3,593★，最近推送 2026-10-23，GitHub API 核验）
    url: https://github.com/grafana/mcp-grafana
    kind: repo
  - label: grafana/mcp-grafana · Releases（v2.1.1 @ 2026-10-20）
    url: https://github.com/grafana/mcp-grafana/releases
    kind: changelog
  - label: Grafana Cloud · MCP 文档页（官方文档线；直抓 000 网络受限，未逐页核验）
    url: https://grafana.com/docs/grafana-cloud/machine-learning/mcp/
    kind: docs

last_verified: 2026-10-23
last_updated: 2026-10-23
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Grafana Labs（美国）。
  origin_note_en: Grafana Labs (US).
  direct: no
  direct_note: grafana.com 直连实测 000（网络受限，非死链）；GitHub 仓与 raw README 经代理 200（2026-10-23）。
  direct_note_en: grafana.com measured 000 direct (network restricted, not dead); the GitHub repo and raw README returned 200 via proxy (2026-10-23).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-23 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-23); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-23
---

## 一句话定位

**Grafana 官方 MCP server**（Apache-2.0，Go 实现）：把 agent 接进你的 Grafana 实例——
仪表盘、数据源、统一 SQL、告警与 IRM。三条硬口径：**服务账号 token + RBAC scopes 是前置门**；
**部分工具组默认禁用**；**整份仪表盘 JSON 是上下文窗口黑洞，官方备了 summary/JSONPath/patch 三件套**。

## 适合与不适合

适合：agent 在自托管或 Grafana Cloud 上查仪表盘/指标/告警、改仪表盘、跨数据源统一 SQL。
不适合：零配置无 token 场景；Grafana 9.0 以下（部分功能因缺 API 端点不可用）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 工具全清单与逐工具 RBAC 动作映射（README 有列表，未逐条清点）
- SSE/streamable-http 服务模式的当前使用面（README 有模式说明；官方未提供托管端点）
- Docker/Helm 部署线的功能边界（未逐条核验）

## 相关条目

- [Sentry MCP](./sentry-mcp.md) — 同为可观测面：Sentry 聚焦错误 issue 分诊，Grafana 是仪表盘与数据源查询面。
- [Datadog MCP](./datadog-mcp.md) — 同大类对照：Grafana 开源可自托管，Datadog 闭源官方托管加凭据透传。
