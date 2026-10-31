---
id: shopify-mcp
form: mcp
name: Shopify Dev MCP Server
vendor: Shopify
homepage: https://shopify.dev/docs/apps/build/ai-toolkit
license: npm 包 ISC（npm registry 元数据核验 2026-10-31）；配套 AI Toolkit 插件仓 MIT（GitHub API 核验）。
licenseEn: The npm package is ISC (npm registry metadata verified 2026-10-31); the companion AI Toolkit plugin repo is MIT (GitHub API verified).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的本地 server（stdio）。它把 shopify.dev 文档检索、
    Admin GraphQL schema introspection 等「Shopify 平台上下文」喂给你的编码 agent。
  runtime: >-
    **本地 npx 线**（npx -y @shopify/dev-mcp@latest，Node 18+）；官方明写「server 本地跑、
    不需要鉴权」。发版线在 npm（1.18.0，2026-10-27，143 个版本）；**GitHub 无独立 dev-mcp 仓**
    （Shopify/dev-mcp 404）——代码随 npm 包发布，插件/skills 线在 Shopify/Shopify-AI-Toolkit 仓
    （MIT 621★，推送 2026-10-27）。官方另有 instrumentation 遥测（OPT_OUT_INSTRUMENTATION 可退出）。
  local_files: >-
    不读写本机文件——输出文档检索结果与 schema 结构；它服务的是「你写 Shopify 代码」的场景，
    代码文件由你的 agent/编辑器落盘，不由它落盘。
  background: >-
    无常驻后台——stdio server 随 MCP 客户端拉起，进程生命周期跟客户端走。
  tools: >-
    核心四工具（官方文档口径）：**search_dev_docs**（搜 shopify.dev 文档）/
    **introspect_admin_schema**（访问与搜索 Admin GraphQL schema）/
    **fetch_docs_by_path**（按路径取文档页）/ **get_started**（API 入门引导）；
    内置 prompt：shopify_admin_graphql（帮你写 Admin API GraphQL 操作）。
    Polaris Web Components 支持经 POLARIS_UNIFIED 环境变量 opt-in（实验性）。
  context: >-
    无 server 侧跨会话记忆；上下文由 MCP 客户端会话承载。schema 按 API 版本可查
    （含字段级文档与弃用标注——官方文档线口径）。
  permissions: >-
    **不需要鉴权**（官方明写 server 本地跑无 auth）——它只读公开文档与 schema，
    不碰你的店铺数据；要店铺操作（建 app/主题/跑 CLI）走 Shopify CLI 的认证上下文，
    那是 AI Toolkit 的另一条线，不是这个 MCP server 的能力。
    instrumentation 遥测默认开，OPT_OUT_INSTRUMENTATION=true 退出。
  fit: >-
    适合：Shopify 开发者给编码 agent 补「平台上下文」——文档检索+schema 探查免模型瞎猜 API 字段；
    零鉴权零配置起步。
    不适合：要 agent 直接操作店铺（它不碰店铺数据）；非 Shopify 生态（单厂商专用）。

pitfalls:
  - 把 inventory 旧 URL（shopify.dev/docs/agents-of-change）当文档线——2026-10-31 实测 404；现役文档页是 docs/apps/build/ai-toolkit（Dev MCP 是 AI Toolkit 三形态之一）
  - 找 GitHub 源码仓——Shopify/dev-mcp 不存在（404），代码随 npm 发布；插件/skills 在 Shopify/Shopify-AI-Toolkit 仓，别混
  - 把它当「能操作店铺的 MCP」——它只读文档与 schema、无鉴权无店铺面；店铺操作走 Shopify CLI 线
  - 忽略 instrumentation——默认有遥测，介意设 OPT_OUT_INSTRUMENTATION=true
  - 把早期「每面一个 skill」（shopify-admin/shopify-liquid 等 23 个）当现役——官方已弃用改单一 shopify skill（npx skills add Shopify/shopify-ai-toolkit）

tags: [MCP, Shopify, 电商开发, schema, 文档检索, 本地stdio, 无鉴权]
related: [cursor, claude-code]

mcp:
  transport: >-
    **stdio**（npx -y @shopify/dev-mcp@latest；claude mcp add --transport stdio 官方示例）。
    核验：shopify.dev AI Toolkit 页与 Polaris using-mcp 页（2026-10-31 直连 200）。
  auth: >-
    无鉴权（官方明写本地 server 不需要 auth）。instrumentation 遥测默认开，
    OPT_OUT_INSTRUMENTATION 环境变量退出；Polaris 支持 POLARIS_UNIFIED opt-in。
  scope: >-
    纯读面（公开文档+schema），无店铺数据面、无本机写面——权限面在 MCP server 里属最轻一档。

sources:
  - label: shopify.dev · AI Toolkit 官方页（Dev MCP 安装与定位；旧 agents-of-change 路径 404 后现役；直连 200）
    url: https://shopify.dev/docs/apps/build/ai-toolkit
    kind: docs
  - label: shopify.dev · changelog「Dev MCP now supports POS UI extensions」（变更记录线；直连 200）
    url: https://shopify.dev/changelog/dev-mcp-now-supports-pos-ui-extensions
    kind: changelog
  - label: npm · @shopify/dev-mcp（发版线：1.18.0，2026-10-27，143 版本；ISC；repo 字段空=代码不独立开源）
    url: https://www.npmjs.com/package/@shopify/dev-mcp
    kind: changelog
  - label: Shopify/Shopify-AI-Toolkit · 插件/skills 仓（MIT；621★，推送 2026-10-27，GitHub API 核验）
    url: https://github.com/Shopify/Shopify-AI-Toolkit
    kind: repo

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Shopify Inc.（加拿大，上市电商 SaaS）。
  origin_note_en: Shopify Inc. (Canada, publicly listed e-commerce SaaS).
  direct: yes
  direct_note: shopify.dev 文档与 changelog 直连 200（www.shopify.dev 变体偶发 000，去 www 稳定）；npm registry 直连可达（2026-10-31）。
  direct_note_en: shopify.dev docs and changelog returned 200 direct (the www.shopify.dev variant hit an occasional 000; dropping www is stable); the npm registry was reachable direct (2026-10-31).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**Shopify 官方 Dev MCP server**（npm ISC，本地 stdio，无鉴权）：给编码 agent 补 Shopify 平台上下文——
文档检索（search_dev_docs/fetch_docs_by_path）+ Admin GraphQL schema 探查（introspect_admin_schema）。
它是 **Shopify AI Toolkit 三形态之一**（插件 / agent skills / Dev MCP）；
**GitHub 无独立 dev-mcp 仓**（代码随 npm 发布），inventory 旧 URL agents-of-change 已 404。
纯读面、不碰店铺数据——店铺操作走 Shopify CLI 线，别混。

## 适合与不适合

适合：Shopify 开发者要 agent 写对 API 字段/schema/CLI；零鉴权零配置起步。
不适合：要 agent 直接操作店铺（无店铺面）；非 Shopify 生态。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- dev-mcp 源码是否随 npm 包附带可读（repo 字段空；未拆包核验）
- introspect_admin_schema 覆盖的 API 版本范围与更新节奏（changelog 有 POS UI extensions 条目，全量未清点）
- AI Toolkit 插件形态与 Dev MCP 形态的能力差集（官方说插件「bundles everything」，未逐项对照）

## 相关条目

- [Firecrawl MCP Server](./firecrawl-mcp.md) — 「领域专用文档+schema MCP」vs「通用 web 上下文 MCP」：Shopify 单厂商极窄极深，Firecrawl 全网极宽。
- [Context7](./context7.md) — 同类「给 agent 喂库/平台文档」路线：Context7 跨库通用，Shopify Dev MCP 单厂商官方一手。
