---
id: vercel-ai-sdk
form: harness
family: orchestration
# 支持哪些模型 provider（本站第一决策点）
providers:
  - 通过 provider 包接多家模型供应商；官方文档列出主流商业与开源模型
  - AI SDK 7 的 harness adapters 可驱动 Claude Code、Codex、Pi、Cline 等既有 agent 运行时
  - provider 与 harness 是两层：模型接入由 provider 决定，运行时由 harness 决定
name: Vercel AI SDK 7
nameEn: Vercel AI SDK 7
vendor: Vercel
homepage: https://vercel.com/blog/ai-sdk-7
license: Apache-2.0（AI SDK 仓库许可；以仓库 LICENSE 为准，本站未逐条核验依赖许可）。
licenseEn: Apache-2.0 (AI SDK repository licence; the repo LICENSE is authoritative; dependency licences not verified line by line).

axes:
  model_access: >-
    通过 provider 包接多家模型供应商；模型切换在应用代码里完成。
    AI SDK 7 新增 HarnessAgent，可把既有 agent harness 当成可切换运行时（官方 changelog）。
  runtime: >-
    TypeScript/JavaScript 库，运行在你的 Node/边缘/浏览器应用里；harness adapters 负责驱动
    Claude Code、Codex、Pi 等外部 agent 运行时，sandbox 由适配器提供（官方示例用 Vercel Sandbox）。
  local_files: >-
    文件访问取决于 harness 与 sandbox：官方示例通过 createVercelSandbox 提供隔离文件系统；
    本地文件访问能力未逐条核验。
  background: >-
    库本身不提供任务队列；长任务是否能在后台继续，取决于所选 harness 与 sandbox 的运行时。
  tools: >-
    工具调用是核心抽象；官方 changelog 展示 HarnessAgent 与 sandbox 组合。
    MCP 接入未逐条核验。
  context: >-
    消息历史由应用管理；库本身不内建持久化，需要自己接数据库或会话存储。
  permissions: >-
    BYOK 为主，密钥在应用侧；sandbox 边界由 harness 适配器决定，
    官方示例把 Vercel Sandbox 作为隔离层。多租户隔离需自行设计。
  fit: >-
    适合：TypeScript/JS 团队自建 agent 应用，想在不改业务代码的前提下切换模型或 harness。
    不适合：要开箱即用的成品 agent（看 coding/chat 类产品）；要 Python 生态（看 LangGraph/Agno）。

pitfalls:
  - 把 HarnessAgent 当成「内置 Claude Code」——它是适配层，仍需相应 harness 与运行环境
  - 以为换 harness 不用改权限模型——不同 harness 的工具面与沙箱边界不同
  - 把库当成托管服务——AI SDK 不替你跑任务队列

tags: [开源, TypeScript, Agent框架, 多模型, Harness]
related: [openai-agents-sdk, claude-agent-sdk, cursor]

sources:
  - label: Vercel · AI SDK 7 is now available（2026 changelog，HarnessAgent 与 harness adapters）
    url: https://vercel.com/changelog/ai-sdk-7
    kind: changelog
  - label: Vercel · Program Claude Code, Codex, Pi and other agent harnesses with AI SDK（2026-06-12）
    url: https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk
    kind: docs
  - label: Vercel · Cline is now available in the AI SDK harness layer（2026-08-18）
    url: https://vercel.com/changelog/cline-harness-adapter
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Vercel（美国）。
  origin_note_en: Vercel (US).
  direct: yes
  direct_note: vercel.com 大陆直连未核验；官方文档与 npm 包通常可经镜像获取。
  direct_note_en: Direct reachability from mainland not verified; official docs and npm packages are usually available through mirrors.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；开源库未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the open-source library does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

AI SDK 7 是 TypeScript/JS 的 agent 应用工具箱：统一的模型调用、工具调用与流式输出，
新增 HarnessAgent 后还能把 Claude Code、Codex、Pi 等既有 agent 运行时当成可切换后端。

跨大类对照：[Cursor](../coding/cursor.html)。

## 适合与不适合

适合：TypeScript/JS 团队自建 agent 应用，想保留业务代码、只切换模型或 harness。
不适合：要成品 agent（看 coding/chat 类产品）；要 Python 生态（看 LangGraph、Agno）。

## 实测记录

本档未跑集成与性能实测；结论只覆盖 API 与官方文档披露的能力面。

## 未知项清单

- MCP 接入的官方支持状态（未逐条核验）
- 各 harness 适配器的权限与沙箱差异（未逐条核验）
- 本地文件访问能力与 Vercel Sandbox 之外的适配器

## 相关条目

- [OpenAI Agents SDK](./openai-agents-sdk.md) — 同为 agent 应用框架；AI SDK 偏 TS/JS 与多 harness
- [Claude Agent SDK](./claude-agent-sdk.md) — 单一 harness 的编程接口，与 AI SDK 的多 harness 路线对照
