---
id: vercel-eve
form: harness
name: Vercel eve（1.0）
nameEn: Vercel eve (1.0)
vendor: Vercel
homepage: https://eve.dev
license: Apache-2.0（GitHub vercel/eve 仓核验 2026-11-23）。
licenseEn: Apache-2.0 (verified from the vercel/eve GitHub repository, 2026-11-23).
family: orchestration
providers:
  - 任意模型（经 AI SDK / AI Gateway 的模型字符串，含 Anthropic、OpenAI、Google 与 OpenAI 兼容端点）

axes:
  model_access: >-
    任意模型：eve 用 TypeScript 的 model 字符串接 AI SDK / AI Gateway，不锁厂商。官方口径是「works with any model」。默认脚手架给一个 OpenAI 模型，只是示例。
  runtime: >-
    TypeScript 框架，filesystem-first：agent 是一个目录，模型、instructions、tools、skills、channels 都是文件。

    官方提供 Vercel Workflows 的持久执行与 Vercel Sandbox 沙箱。也可用 Docker / microsandbox / just-bash 等适配器自托管运行时。
  local_files: >-
    工作对象就是仓库里的 agent 目录。工具可以读写文件，但生产执行在沙箱里。它不是桌面文件代理，也不替你同步本机目录。
  background: >-
    1.0 的核心是 durable execution。会话可跨崩溃恢复，子 agent 可并行，workflow 可等待审批后继续。

    官方把「durable session for every conversation」作为主卖点。定时/后台触发由 Workflows 与 channels 提供。
  tools: >-
    工具是一个 TypeScript 文件，skill 是一个 Markdown 文件。

    MCP server、OAuth/API key、Slack/GitHub/Discord/Notion/Linear 等通过 Vercel Connect 接入。写操作可设人工审批。模型不直接拿到连接 URL 或凭据。
  context: >-
    会话状态持久化在 Workflows。1.0 增加跨会话 memory，可保存用户偏好、项目事实与工作记录。上下文不是把整段聊天硬塞进窗口，而是按 session / thread 组织。
  permissions: >-
    审批门 + 沙箱 + 连接代理三层。Vercel Connect 负责 OAuth 同意与 token 刷新。自托管时鉴权、密钥与沙箱隔离由你自己负责。托管面的组织权限走 Vercel 团队体系。
  fit: >-
    适合：要上生产的 TypeScript agent。需要持久会话、沙箱、审批、评测和子 agent。已经在 Vercel / AI SDK 生态的团队。要把 agent 当代码库维护，而不是在 UI 里点点点。

    不适合：只要一个聊天壳。Python 优先的团队。完全不想用 Vercel Workflows / Sandbox 托管能力的离线部署。
pitfalls:
  - 把 eve 当成托管运行时：它是框架。Workflows、Sandbox、Connect 的托管能力是另一层
  - 以为 1.0 只是版本号：1.0 有 breaking changes，升级前先读 changelog
  - 把 GitHub 星数当生产成熟度：它是公开预览走到 1.0 的新框架，先跑自己的评测

tags: [开源, Apache2.0, TypeScript, durable execution, 沙箱, 审批, 子agent]
related: [claude-code]

sources:
  - label: vercel/eve · GitHub 仓库（Apache-2.0。官方 README 与目录结构，2026-11-23 核验）
    url: https://github.com/vercel/eve
    kind: repo
  - label: Vercel · Introducing eve（框架定位、durable execution、Sandbox、Connect）
    url: https://vercel.com/blog/introducing-eve
    kind: blog
  - label: Vercel Changelog · Introducing eve, an open-source agent framework
    url: https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework
    kind: changelog
  - label: eve · 官方文档入口
    url: https://eve.dev
    kind: docs

last_verified: 2026-11-23
last_updated: 2026-11-23
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: Vercel Inc.（美国）。
  origin_note_en: Vercel Inc. (US).
  direct: yes
  direct_note: vercel.com / github.com / eve.dev 大陆直连实测 200（2026-11-23）。
  direct_note_en: vercel.com, github.com and eve.dev measured 200 direct from mainland (2026-11-23).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-23 检索）。该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-11-23); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-11-23
---

## 一句话定位

**eve 是 Vercel 的「文件系统优先」agent 框架（1.0，Apache-2.0）**：一个 agent 就是一个目录，模型、instructions、tools、skills、channels 各是一个文件。

持久执行、沙箱、审批与评测是框架内建，不是事后拼装。

它更像「agent 的 Next.js」。它把生产所需的 durability、sandbox、approval 做成默认层，而不是让你每个项目重搭一遍。

## 适合与不适合

适合：TypeScript 团队要上生产 agent。已经在 Vercel / AI SDK 生态。要把 agent 当代码库维护、跑评测、接 MCP 与 Slack/GitHub。

不适合：只想要聊天界面。Python 优先。要求完全离线、不用 Vercel Workflows/Sandbox 的托管能力。

## 实测记录

本档未跑端到端 agent 部署。结论只覆盖官方文档与仓库结构。1.0 的 durable session、沙箱和审批语义按官方发布口径记录。未在本机复现。

## 未知项清单

下面几项官方没有展开，本站也不替它猜：

- 1.0 自带 memory 的具体存储后端与保留周期（官方文档未逐条展开）
- 自托管时各沙箱适配器的隔离强度（本档未逐项实测）
- 团队版/企业版的配额与价格（本站按 D9 不采价格数字，只看官方入口）

## 相关条目

- [Vercel AI SDK](./vercel-ai-sdk.md) — 同厂但不同层：AI SDK 是模型调用与流式 UI 库，eve 是 agent 运行时与部署框架。
- [Claude Agent SDK](./claude-agent-sdk.md) — 另一个「agent 框架」对照：Claude Agent SDK 以 Claude 工具循环为中心，eve 以文件系统与 Vercel 运行时为中心。
- [Claude Code](../../coding/products/claude-code.md) — 编码 agent 的产品面。eve 更像把它背后的 harness 产品化。
