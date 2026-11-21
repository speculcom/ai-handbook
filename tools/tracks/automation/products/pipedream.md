---
id: pipedream
form: web
name: Pipedream（Connect / Workflows）
vendor: Pipedream
homepage: https://pipedream.com
license: 商业源码可用（source-available）模型：Connect/Workflows 平台条款见官方；组件注册表为 source-available，核心仓许可未逐仓全量核验。

axes:
  model_access: >-
    工作流步骤可接各家 LLM（官方 AI 集成文档线）；Connect 让应用或 AI agent 直接调用任意 AI API / LLM。
    特色是代码优先：步骤可写 Node/Python/Bash，平台本身不是模型提供方。
  runtime: >-
    Pipedream 托管 serverless runtime 与 workflow service；Connect 的 API、SDK、MCP Servers 与 API Proxy 也在平台侧。
    本地 CLI 用于开发部署，官方没有完整自托管形态的声明。
  local_files: >-
    执行在 Pipedream 云端；本机经 CLI/SDK 开发。Connect 的 OAuth 凭据与 token 在平台侧 HTTPS 传输并加密存储；
    Workflows 结构可用官方导出工具下载为 JSON，平台本身不跑本地模型。
  background: >-
    托管 serverless runtime 承载定时调度、webhook、事件队列与重试，电脑关机后仍可运行。
    Workflows 自 2026 起进入维护模式、2027-03-31 关停；Connect 不受影响。
  tools: >-
    Connect 提供 Client SDK、2,500+ API 的托管授权、10k 预构建 tools/triggers、MCP Servers 与 API Proxy；
    工作流侧有代码步骤与 source-available 组件注册表。
  context: >-
    平台不做对话记忆：Connect 用 external_user_id 标识终端用户，每次调用取该用户的 token；跨调用对话历史与应用状态
    由调用方维护，平台持久面是 connected account 与 workflow 配置。
  permissions: >-
    Connect 可用官方 OAuth client 或自带 client 接受 OAuth/API key；凭据 HTTPS 传输、静态加密，官方可提供 SOC 2 Type 2
    报告与 HIPAA BAA。Workflows 的凭据与 OAuth token 将在 2027-04-30 前永久删除。
  fit: >-
    适合：给应用或 AI agent 加第三方集成的开发者（Connect 线）；要代码级控制又接受托管运行时的自动化团队。
    不适合：完全不碰代码的团队；要求完整自托管；仍把 Workflows 当长期生产平台、不准备 2027 迁移的用户。

pitfalls:
  - 把它归「纯低代码」——它是开发者向：代码步骤是一等公民，界面是搭流程的壳
  - Connect 与 Workflows 是两条产品线（被集成 vs 自己自动化），档案合并写但读官方要分开
  - 把 Workflows 当长期平台——官方已定 2027-03-31 关停，数据 2027-04-30 前删除
  - 把前端拿到的 OAuth token 直接下发——官方要求所有第三方调用走服务端

tags: [开发者自动化, 云托管, 代码优先, Connect, 集成]
related: [openai-agents-sdk]

sources:
  - label: Pipedream · Introduction（serverless runtime、workflow service、3,000+ API 托管授权；2026-11-21 直读 200）
    url: https://pipedream.com/docs/
    kind: docs
  - label: Pipedream · Workflows and String Shutting Down（2027-03-31 关停、2027-04-30 数据删除、Connect 不受影响；2026-11-21 直读 200）
    url: https://pipedream.com/docs/workflows.md
    kind: docs
  - label: Pipedream · Connect Overview（2,500+ API、managed auth、MCP、API Proxy、凭据加密与 SOC 2/HIPAA；2026-11-21 直读 200）
    url: https://pipedream.com/docs/connect/
    kind: docs
  - label: Pipedream · 官方首页（2026-10-21 直读 200）
    url: https://pipedream.com
    kind: docs
  - label: Pipedream · 官方社区（更新与答疑入口）
    url: https://pipedream.com/community
    kind: changelog

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Pipedream, Inc.（美国）。
  origin_note_en: Pipedream, Inc. (US).
  direct: yes
  direct_note: pipedream.com / docs.pipedream.com 直连实测 200（2026-10-21）；三份官方文档 2026-11-21 直读 200。
  direct_note_en: pipedream.com / docs.pipedream.com measured 200 direct (2026-10-21); three official docs pages returned 200 on 2026-11-21.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**Pipedream 是「开发者向」的托管自动化与集成平台**：代码步骤（Node/Python/Bash）是一等公民，Connect 线让「你的应用」
成为别人工作流里的节点。需要先记住一条硬边界：**Workflows 与 String 已进入维护模式，2027-03-31 关停，Connect 不受影响**。

## 适合与不适合

适合：工程师做自动化、要代码级控制又想要托管运行时与 OAuth 托管；SaaS 要做集成面（Connect）。
不适合：完全不想碰代码（去 Zapier/Make）；要完整自托管（官方无此形态声明）；把 Workflows 当长期平台、不做迁移的用户。

## 实测记录

未跑工作流搭建实测；结论只覆盖平台能力、授权边界与官方公布的关停时间线。Connect 的 2,500+ API、10k tools/triggers、
MCP、API Proxy 与凭据加密口径取自官方 Connect Overview；Workflows 的关停与数据删除取自官方 Workflows 文档。

## 未知项清单

- 各仓 source-available 许可的全量口径（未逐仓核验）
- Workflows 导出工具对复杂工作流与历史的覆盖边界（按官方 export 文档核对）
- 自托管形态（官方无声明）
- 2027-03-31 之后 Connect 之外的历史 Workflows 数据恢复可能性（官方明确将永久删除）

## 相关条目

- [Zapier](./zapier.md) — 表单派 vs 代码派对照：同为连接器自动化，Pipedream 把代码当一等公民。

## 第一次怎么用

1. 新项目先选 Connect，不要围绕 Workflows 设计：官方已停止 Workflows 新签购，2027-03-31 关停。
2. 用 Connect SDK 接授权，把外部用户 ID 映射到 `external_user_id`；token 只在服务端取用，绝不下发到前端。
3. 现有 Workflows 立即用官方导出工具把结构下载为 JSON，按项目逐个归档；2027-04-30 前平台会永久删除数据与凭据。
4. 迁到 Connect 后重做凭据轮换：旧 Workflows 的 OAuth token 会随关停删除，不能当作新链路的凭证。
