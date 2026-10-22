---
id: augment-code
form: cloud
name: Augment Code
nameEn: Augment Code
vendor: Augment Code
homepage: https://www.augmentcode.com

axes:
  model_access: >-
    官方 Available Models 页列全清单：Anthropic Claude 系（Fable 5.1/5、Opus 5/4.8/4.7/4.6、Sonnet 5.5/5、Haiku 4.5）、
    Google Gemini（3.8/3.7 Flash、3.1 Pro）、OpenAI GPT（6.1 Sol、6 Astra、5.6 Sol/Terra/Luna、5.5）、
    xAI Grok 4.6/4.5、智谱 GLM 5.3 Flash/5.2 与 Moonshot Kimi K3/K2.7 Code（托管在 Fireworks/Baseten）、
    自研 Prism（组合 Claude 与 GPT 的模型集成，Prism 选项按策展模型族路由）。
    计费走 token 制（Token-Based Pricing 页：LLM token + Cosmos 算力 + 服务费三段）。
  runtime: >-
    主线是 Cosmos 平台（官方 Introduction：Environments/Experts/Sessions/Capabilities/Triggers 五积木）：
    把规划-实现-评审-反馈连成可重复的 Software Factory 工作流（Requirements→Ticket、Ticket→PR、
    PR→Merge、Signal→Ticket 四条官方 loop）。Environments 三选一：Augment 托管云沙箱、你自己的 VM/物理机
    （self-hosted daemon）、甚至本机笔记本。另有 Auggie CLI（终端 agent：仓库实现/代码探索/跑测试/CI 自动化）
    与 VS Code / JetBrains 的 IDE 扩展面。
  local_files: >-
    IDE 扩展与 Auggie CLI 处理本机代码库；Cosmos 的 Environments 决定代码在哪——托管云沙箱、
    self-hosted daemon（跑在你自己基础设施上，daemon-config.json 配工作区与隔离）或本机。
    self-hosted 面是官方一等公民（官方页明示 own virtual or physical infrastructure）。
  background: >-
    Cosmos 主打长时多步交付：durable environments、scheduled automations（定时自动化）、
    跨仓库跨工具协调（官方 llms.txt 使用指引原文）；Triggers 把事件接进 loop。
    官方叙事「always-on software delivery system」——从 spec 到验证常跑。
  tools: >-
    MCP 面官方成页多处：Cosmos Experts 接 MCP servers（MCP Registry）、CLI/IDE 侧 MCP 配置、
    Context Engine MCP（把上下文引擎以 MCP 插进任何 agent）、Code Review 的 MCP context 接入；
    官方还提供 Docs MCP server（Streamable HTTP）给外部 agent 查 Augment 文档。
  context: >-
    招牌是 Code Context Engine：官方口径 world-class context engine，跨代码库的结构化理解；
    以 MCP 形式输出给别的 agent 用（Context Engine MCP 页）。
    Wisdom 类上下文（PR 历史、业务需求）在 Software Factory 各 loop 页有展开。
  permissions: >-
    企业定位（enterprise-grade 口径贯穿官方文档）：Trust Center、Status Page 官方入口在导航；
    Analytics API 用 scoped OAuth token 或 service-account bearer token，写权限按需申请（官方 llms.txt 口径）。
    个人侧权限模型未逐条核验。
  fit: >-
    适合：企业级「软件工厂」叙事——要跨 SDLC 的 agent 流水线（ticket→PR→merge→monitor）、
    self-hosted 环境把 agent 跑在自己基础设施、多前沿模型清单（含自研 Prism 路由）。
    不适合：找个人免费档入门（主线是企业交付与 token 计费）；
    要产品归属稳定的读者——2026-10 起 Cosmos/Auggie CLI/Context Engine 资产已并入 Harness。

pitfalls:
  - 2026-10-08 官方博客「Augment Code's next chapter」：Cosmos、Auggie CLI、Code Context Engine 及相关技术
    加入 Harness，团队并入——产品连续性走 Harness 体系，检索时 Augment/Harness 两个名字都要认
  - 官网与 docs 仍活跃在售 Cosmos（2026-10-22 实测 200）——「被收购」不等于「下线」，
    但后续归属与品牌走向官方未给完整说明
  - 计费是 token 制三段（LLM token + Cosmos 算力 + 服务费）——与按 credit 包月的同类工具口径不同，
    对比成本前先核 Token-Based Pricing 页

tags: [海外, 企业, 云端Agent, CLI, IDE扩展, MCP, 自研模型路由, 被收购过渡]
related: [devin, cursor, claude-code-cli, context7]

sources:
  - label: Augment Code 文档 · Introduction（Cosmos 五积木/IDE 与 CLI 入口）
    url: https://docs.augmentcode.com/introduction
    kind: official
  - label: Augment Code 文档 · Available Models（全模型清单与 Prism 路由）
    url: https://docs.augmentcode.com/models/available-models
    kind: official
  - label: Augment Code 文档 · Token-Based Pricing（三段计费口径）
    url: https://docs.augmentcode.com/models/token-based-pricing
    kind: official
  - label: Augment Code 文档 · Self-Hosted Environments（自有基础设施跑 agent）
    url: https://docs.augmentcode.com/cosmos/environments/daemons
    kind: official
  - label: Augment Code 文档 · Software Factory Overview（四条官方 loop）
    url: https://docs.augmentcode.com/cosmos/software-factory/overview
    kind: official
  - label: Augment Code 博客 · Augment Code's next chapter（2026-10-08 资产加入 Harness 公告）
    url: https://www.augmentcode.com/blog/augment-codes-next-chapter
    kind: official
  - label: Augment Code · Changelog（changelog）
    url: https://www.augmentcode.com/changelog
    kind: changelog
  - label: Augment Code 官网（Cosmos/软件工厂叙事）
    url: https://www.augmentcode.com
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Augment Code（美国，企业级 AI 编码公司）；2026-10 起 Cosmos/Auggie CLI/Context Engine
    资产并入 Harness（同为美国企业软件公司）。
  origin_note_en: Augment Code (US enterprise AI-coding company); since 2026-10 its Cosmos, Auggie CLI
    and Context Engine assets are joining Harness (also a US enterprise software company).
  direct: yes
  direct_note: augmentcode.com / docs.augmentcode.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: augmentcode.com / docs.augmentcode.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve
    the mainland public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Augment Code 是企业级「软件工厂」平台**：Cosmos 把规划-实现-评审-反馈连成可重复的 agent 流水线，
Environments 可托管云/自有基础设施/本机三选一，Code Context Engine 招牌可经 MCP 插进别的 agent，
前沿模型清单最全之一（含自研 Prism 路由）——**2026-10-08 官方公告 Cosmos/Auggie CLI/Context Engine 资产加入 Harness**。

## 适合与不适合

适合：企业级跨 SDLC 的 agent 流水线、self-hosted 把 agent 跑在自己基础设施、要多前沿模型清单与 token 透明计费。
不适合：找个人免费档入门、要产品归属完全稳定（正处 Harness 并入过渡期）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Harness 并入后购买/续约路径的实际变化**（公告只说资产与团队并入，未给客户迁移细则）
- **self-hosted daemon 在真实 CI 里的隔离与审计行为**（官方有 daemon-config 页，未实测）
- **Prism 路由的实际模型选择透明度**（能否看到每次请求落到哪个模型）

## 未知项清单

- Harness 并入后的品牌与产品线走向（官方公告未给完整说明）
- 个人/小团队计划是否存在（导航以企业销售为主，未核验到个人档）
- 托管云沙箱的代码存储区域与保留策略（未逐条核验）
- 个人侧权限模型细节（未逐条核验）

## 相关条目

- [Devin](./devin.md) — 同为「异步交付 agent」叙事：Devin 主打云端自主工程师，Augment 主打企业 SDLC 流水线与 self-hosted。
- [Cursor](./cursor.md) — 同为多模型编码平台：Cursor 以编辑器为中心，Augment 以 Cosmos 流水线与 Context Engine 为中心。
- [Claude Code CLI](./claude-code-cli.md) — 同为终端 agent 对照：Auggie CLI 与 Claude Code 都进 CI/CD，可对照上下文引擎差异。
