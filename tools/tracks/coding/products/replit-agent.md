---
id: replit-agent
form: cloud
name: Replit Agent
vendor: Replit
homepage: https://replit.com

axes:
  model_access: >-
    按「模式」选而非按裸模型选：官方文档列 Free/Auto/Power/Max 四态——Free 是套餐额度内的免费档，
    Auto 自动路由，Power/Max 是付费档（Max 用最强前沿模型）；具体每档挂哪些模型官方按套餐页口径给，
    未逐条清点。企业工作区只有一个 Auto 模式，管理员可用 Enterprise model controls 管模型访问。
  runtime: >-
    云端 IDE 内建 agent：项目、依赖、数据库、部署全在 Replit 云上；官方文档明确 Agent 会
    「写代码、搭基础设施、测结果」并自动建 checkpoint 可回滚。桌面/手机是入口，执行在云上。
  local_files: >-
    代码与数据默认在 Replit 云项目里，不在你本机；产物可导出（官方有导出/迁移线，细节未逐条核验）。
    连接外部服务（BigQuery/Slack/Notion/Linear 等）经官方 connector 从聊天直接取数。
  background: >-
    有后台任务面：官方文档给 Core 1 个、Pro 10 个「Active background tasks」的配额行——
    后台跑任务是产品语义的一部分；Plan mode 先出任务清单供审批再动工。
  tools: >-
    agent 自带建项目/装依赖/测试/部署全链；connector 面（BigQuery/Slack/Notion/Linear 等）
    是官方列出的连接目录，未逐条清点。MCP 支持状态未核验到官方声明。
  context: >-
    项目内多产物共享同一后端与数据（web/mobile/slides/视频同项目）；checkpoint 提供状态回滚面。
    跨项目记忆未见官方声明。
  permissions: >-
    账号+套餐体系；付费动作需确认（官方 FAQ：paid actions require confirmation before they start，
    Free 不够时给 Allow once 单次放行）；企业版有模型访问管控。部署即 Replit 托管 URL。
  fit: >-
    适合：从自然语言直接到「能上线的应用」（含数据库/部署）、非工程师做原型、要 checkpoint 回滚兜底。
    不适合：要接你自己已有的代码库为主战场（它主轴是从想法到新项目）、要模型层完全自选。

pitfalls:
  - 把 Replit Agent 当「装进现有仓库的编码 agent」——官方定位是从想法到新项目（含基础设施），
    现有代码库协作不是它文档的主叙事
  - Free/Power/Max 是「模式」不是模型名——每档背后挂什么模型随官方调整，别把档位当固定模型清单
  - 产物与数据默认在 Replit 云上——导出与迁移线存在但边界要自己核（未逐条核验）

tags: [闭源, 云IDE, 自然语言建站, checkpoint, 后台任务]
related: [supabase-mcp, linear-mcp, notion-mcp]

sources:
  - label: Replit Docs · Replit Agent 总览（模式/Plan/后台任务/FAQ）
    url: https://docs.replit.com/features/agent/overview
    kind: official
  - label: Replit Docs · Updates（周更 changelog，最新 2026-10-16）
    url: https://docs.replit.com/updates
    kind: changelog
  - label: Replit · 官网
    url: https://replit.com
    kind: official

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Replit（美国）。
  origin_note_en: Replit (US).
  direct: yes
  direct_note: replit.com 与 docs.replit.com 大陆直连实测 200（2026-10-21）。
  direct_note_en: replit.com and docs.replit.com measured 200 direct from mainland (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Replit Agent 是「从自然语言到能上线的应用」的云 IDE agent**：建项目、装基础设施、测试、部署一条龙，
Free/Power/Max 模式选档不选裸模型，checkpoint 兜底回滚。

## 适合与不适合

适合：想法直达可部署应用、非工程师原型、多产物同后端。
不适合：以你现有代码库为主战场、要模型完全自选。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Free 档五小时重置额度的实际可用量**——官方只给「allowances reset every five hours」口径
- **Allow once 单次放行的确认交互细节**（何时弹、弹几次）
- **产物导出/迁出的完整路径**（官方有迁移线，边界未逐条核验）

## 未知项清单

- 各模式背后具体模型清单（官方按套餐页口径，未逐条清点）
- MCP 支持状态（未核验到官方声明）
- 产物导出与数据迁出的细节边界（未逐条核验）
- 跨项目记忆机制（未见官方声明）

## 相关条目

- [Devin](./devin.md) — 同为云形态：Devin 接你现有仓库提 PR，Replit 从想法建新项目。
- [Lovable](./lovable.md) / [Bolt.new](./bolt-new.md) / [v0](./v0.md) — 同为自然语言建站线，产物是可导出代码库；Replit 给完整云开发环境，三家把环境藏进提示词流。
