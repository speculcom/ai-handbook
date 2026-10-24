---
id: datadog-mcp
form: mcp
name: Datadog MCP Server
vendor: Datadog
homepage: https://docs.datadoghq.com/mcp_server/
license: 闭源官方托管服务（Datadog ToS 约束）；无开源仓——官方文档线直抓核验 2026-10-23。
licenseEn: Closed-source official hosted service (under Datadog's ToS); no open-source repo — official docs line direct-fetched 2026-10-23.

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Datadog 可观测数据
    （logs/metrics/traces/dashboards/monitors/incidents/security signals 等）包装成工具给 agent 用。
    官方文档口径：多数工具直查 Datadog 后端不经模型；少数语义检索/自然语言转查询类工具
    会用 Datadog 的 AI 供应商托管的模型，可整组织关闭。
  runtime: >-
    官方托管远程 server（mcp.datadoghq.com/v1/mcp——直抓 401=存在需鉴权）；
    另有本地二进制线（coterm.datadoghq.com 安装脚本装 datadog_mcp_cli，stdio 连远程工具）。
    官方文档明写 **not GovCloud compatible**；HIPAA-eligible。
  local_files: >-
    不碰本机文件系统——作用域是 Datadog 云端数据。
    例外：官方另有一条**独立的 Code Security MCP Server**（本地跑 SAST/SCA/IaC/secrets/SBOM 扫描），
    文档明说那是窄范围的另一条线，不是本条目的主体。
  background: >-
    服务在 Datadog 侧；会话请求-响应，无后台监听语义。
    官方声明会收集 MCP 使用信息（工具名/参数/错误/用户标识，不含 prompt 与模型推理），存 120 天。
  tools: >-
    按 **toolsets 分组**（URL 参数 ?toolsets= 选择，默认 core）：core（logs/metrics/traces/
    dashboards/monitors/incidents/hosts/services/events/notebooks）、alerting、apm（Preview）、
    cases、dbm、ddsql（Preview）、error-tracking、feature-flags、llmobs、product-analytics、
    networks、onboarding、security、software-delivery、synthetics、workflows；toolsets=all 开全部 GA 组。
  context: >-
    无 server 侧跨会话记忆——状态在 Datadog 平台本身；官方建议用 toolsets 裁剪工具省上下文窗口。
  permissions: >-
    **权限面是这条目的核心**：官方明写 server 把已认证用户自己的凭据转发给 Datadog API——
    **RBAC/Data Access Control/日志限制查询原样生效，server 不能给用户越权**。
    写动作要对应权限（如 monitors_write），每次工具调用都检查；只读用户调写工具会被拒。
    组织管理员可在 Organization Settings 管全局 MCP 访问与写能力，可开 IP allowlist。
  fit: >-
    适合：编码/运维 agent 排障时取生产实时上下文（日志/指标/trace/incident）、
    在 IDE 里对着真实数据调试。
    不适合：GovCloud 环境（官方明写不兼容）；要本地全离线（远程线要连 Datadog；
    本地二进制也只是本地鉴权壳，工具仍在远端）。

pitfalls:
  - 把 Datadog MCP 当「能越权的旁路」——官方明写凭据透传，用户看不到的数据 server 也拿不到
  - 把 Code Security MCP Server 与主体混为一谈——那是本地代码扫描的另一条窄线，官方文档专门区分
  - 全量 toolsets 一把开——官方建议按需裁剪，工具组太多吃上下文窗口
  - 在 GovCloud 里规划接入——官方明写 not GovCloud compatible

tags: [MCP, 可观测, Datadog, 远程托管, 闭源, toolsets]
related: [cursor, claude-code]

mcp:
  transport: >-
    **Streamable HTTP**（远程 https://mcp.datadoghq.com/v1/mcp）为主；
    本地二进制 datadog_mcp_cli 走 stdio（鉴权在本地完成，工具仍在远端）。
    核验：官方文档 setup 页（2026-10-23 直抓）。
  auth: >-
    OAuth 2.0（推荐，客户端自动走流程；自定义子域要加 ?subdomain= 参数）；
    或 PAT/SAT Bearer 头；或 DD_API_KEY + DD_APPLICATION_KEY 头（官方建议用带 scope 的
    服务账号 key）。端点直抓 401=存在需鉴权。
  scope: >-
    读面大（logs/metrics/traces/dashboards/monitors/incidents 等按 toolsets 分组）；
    写动作（建 monitor、改 case 等）要对应写权限、逐调用检查。
    官方口径：MCP 工具调用全部进 Audit Trail（工具名/参数/用户/客户端），
    另有 datadog.mcp.session.starts 与 datadog.mcp.tool.calls 两个标准指标。

sources:
  - label: Datadog · 官方 MCP Server 文档（定位、toolsets、权限与合规口径，2026-10-23 直抓核验）
    url: https://docs.datadoghq.com/mcp_server/
    kind: docs
  - label: Datadog · 官方 setup 文档（端点、OAuth/PAT/SAT 鉴权、本地二进制、速率限制）
    url: https://docs.datadoghq.com/mcp_server/setup/
    kind: docs
  - label: Datadog · 官方发布博客（remote MCP server 上线与工具清单）
    url: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
    kind: changelog

last_verified: 2026-10-23
last_updated: 2026-10-23
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Datadog, Inc.（美国）。
  origin_note_en: Datadog, Inc. (US).
  direct: yes
  direct_note: docs.datadoghq.com 直连实测 200（2026-10-23）；mcp.datadoghq.com 端点直连 401（存在需鉴权）——大陆可达性未逐条核验。
  direct_note_en: docs.datadoghq.com measured 200 direct (2026-10-23); the mcp.datadoghq.com endpoint measured 401 (exists, auth required) — mainland reachability not individually verified.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-23 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-23); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-23
---

## 一句话定位

**Datadog 自营的官方 MCP server**（mcp.datadoghq.com/v1/mcp）：agent 排障时直查生产日志、
指标、trace、incident。三条硬口径：**凭据透传——RBAC 原样生效，server 不越权**；
**工具按 toolsets 分组按需开**；**GovCloud 不兼容**（官方明写）。
诚实标注：无开源仓；另有一条独立的本地 Code Security MCP Server，别混。

## 适合与不适合

适合：编码/运维 agent 在 IDE 里对着真实生产数据排障、incident 响应取上下文。
不适合：GovCloud；要全离线（工具在远端）；把写权限当默认（写动作逐调用检查）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- 各 toolset 内工具的完整清单（官方文档列了组名与部分工具，未逐条清点）
- 速率限制的当前数值（官方文档给过口径且明写「可能调整」，按 D9 与快照纪律不记具体数字）
- 本地二进制线的 Windows 支持细节（官方给下载指引，未逐条核验）

## 相关条目

- [Grafana MCP](./grafana-mcp.md) — 同为可观测面：Grafana 开源可自托管，Datadog 闭源托管加凭据透传。
- [Sentry MCP](./sentry-mcp.md) — 同大类对照：Sentry 聚焦错误 issue，Datadog 是全栈可观测平台面。
