---
id: jules
track: cloud
tasks: ["long-task"]
name: Jules
vendor: Google
homepage: https://jules.google
mark: JL

axes:
  model_access: >-
    **模型由厂商指定，你选不了。**

    官方可读页里唯一点名模型的地方，是 GA 发布页。它说 Jules 用 Gemini 2.5 Pro 的
    进阶推理能力。Google One 套餐页在 Ultra 档写 Jules「access to latest
    models」，意思是**更高档位能用更新的模型**。

    哪一档对应哪个模型，官方没写。

    （已查 developers.google.com/jules/api 与 Google One AI 套餐页。）

    **官方原文**：「Jules now uses the advanced thinking capabilities of Gemini 2.5 Pro」

    这跟 IDE / CLI 那两类正好相反。它们通常有 `/model` 之类的选择面，
    而**厂商云形态把「选模型」这件事整个收走了**。
  runtime: >-
    **任务跑在 Google 的云虚拟机上，本机不装任何东西。**

    每个任务一台**全新的**云 VM：在里面 clone 你的仓库、装依赖、改代码。

    **官方 FAQ 原文**：「Each task runs in a fresh virtual machine where Jules
    clones your repo, installs dependencies, and makes changes based on your
    prompt」
    **官方 GA 发布页把这条列为卖点**：「Tasks run inside a cloud VM, enabling
    concurrent execution」

    除了网页（jules.google），还有两个入口：Jules REST API
    （`jules.googleapis.com/v1alpha`）和 Jules Tools CLI。
    **但执行永远在厂商云上，客户端只负责下达和查看。**
  local_files: >-
    **默认跟你本机完全隔离。**

    Jules 只在云 VM 里 clone 仓库干活，不碰你本机的文件。
    这个 VM **有联网能力** —— 这既是它的能力，也是它的风险面。

    **官方 FAQ**：该 VM「executed in a secure, cloud-based virtual machine (VM)
    with internet access」，并要求用户「treat the environment with the same
    security precautions you would for any public or shared compute surface」
    **官方同时提醒**：不要把密钥、token 之类提交进仓库。

    哪些仓库对 Jules 可见，由 Jules GitHub app 的授权范围决定
    （FAQ 指引到 GitHub 的 applications 设置里逐项调整）。
  background: >-
    **这是它最厚的一维，官方全程按「异步」定义它。**

    Jules operates asynchronously, allowing you to focus on other tasks
    while it works in the background

    You can leave the app after submitting a task

    只需打开通知。**任务失败会自动重试。**

    Jules will retry automatically

    2025-12-10 的官方更新再补两项主动能力：

    - **Suggested Tasks** —— 在最多五个仓库上主动扫描代码、提出改进，先支持 `#todos`
    - **Scheduled Tasks** —— 按你设定的节奏自动执行，如依赖检查、每周例行

    Scheduled Tasks ... you can now define the cadence and Jules will
    perform the task at that time

    **并发任务数随订阅档位变化**（具体数字见官方套餐页，本站按 D9 口径不存）。
  tools: >-
    **工具面集中在云 VM 内的执行能力 + GitHub 集成。**

    官方 FAQ 与 GA 页确认了 VM 内的执行能力。包括装依赖、跑测试、按 setup 脚本构建。
    支持的语言是 JavaScript/TypeScript、Python、Go、Java、Rust。

    language agnostic but works best with

    （实际取决于 VM 里装了什么。）

    **不支持长驻进程** —— `npm run dev` 之类跑不起来。

    Long-running processes like dev servers or watch scripts aren't
    currently supported in setup scripts

    另有前端验证能力：在 VM 内跑脚本、回传截图。见官方发布页的 web-app 测试说明。

    **Jules 是否支持接入 MCP server：官方未说明。**
    （已查 developers.google.com/jules/api 与官方 FAQ 页。）
  context: >-
    **以 Session / Activity 为上下文单位。**

    Session — A continuous unit of work within a specific context, similar to a
    chat session. A session is initiated with a prompt and a source

    Activity — A single unit of work within a Session

    一个 Session 含用户与 agent 双方的多条 activity。比如生成计划、发消息、更新进度。

    也就是说**面向程序化调用时，上下文是「会话 + 活动」这条可轮询的状态流**，
    而不是一次性的对话。跨任务层面，官方提供**环境快照**复用：

    reusing previous setups so new tasks run faster

    **上下文窗口大小与长期记忆的具体实现，官方可读页未给数字 —— 官方未说明。**
    （已查 Jules API 页与官方 FAQ 页。）
  permissions: >-
    **审批的核心是「计划审批」，且 API 与网页默认值不同。**

    By default, sessions created through the API will have their plans
    automatically approved. If you want to create a session that requires
    explicit plan approval, set the `requirePlanApproval` field to `true`

    网页端则默认：

    **官方原文**："Prompt a task and approve Jules' plan"

    **即程序化入口默认跳过人工审批，需显式打开。**

    代码落地方式由创建 session 时的 `automationMode` 决定 —— 设 `AUTO_CREATE_PR`
    才会自动开 PR。

    The `automationMode` field is optional. By default, no PR will be
    automatically created

    仓库访问走 Jules GitHub app 的授权范围。

    **隐私口径：官方 FAQ 明确它不用私有仓库内容训练。**

    Jules does not train on private repository content

    **额度边界**：免费层与 Pro / Ultra 的具体任务数，官方可读页未列
    （见官方套餐页）。但**「额度按任务计、不按 token 计」**这一点，
    从官方 API 概念（session 即任务单位）可以读出来。
  fit: >-
    官方给自己划的活是具体的：把任务描述交进 GitHub 仓库后，它做这些事：

    - **官方原文**："fix bugs, update dependencies, migrate code, and add new features"
    - 交付方式 **官方原文**："test verified patches"、"Open PRs with runnable code and test results"

    因此**适合自包含、可验证的活**：修一个明确的 bug、升依赖版本、补测试、
    迁移代码片段、小范围新功能。
    **不适合**：需要实时 shell、边跑边改的高频交互。这类活本分区 CLI / IDE 形态更合适。
    也不适合需求模糊、需要大量澄清的架构级任务。官方 FAQ 自己把「vague prompts」列为
    任务失败的常见原因之一。

pitfalls:
  - 把 beta 旧文档的「2 并发 / 每天 5 次」当成现行免费额度
  - 以为 API 建的任务都会等你批准计划，官方默认自动批准
  - 把 Jules 当成本地 / IDE 里的实时 agent——它是异步云 agent

tags: [编程, 编码agent, 云端, 厂商云, 常驻, 审批, 订阅制, 免费档, 并行]
related: [github-mcp]

sources:
  - label: Google · Jules 官方变更记录（2026-10-08 核验，官方 changelog 入口）
    url: https://jules.google/docs/changelog/
    kind: changelog

  - label: Google · Jules API（alpha，Sources / Sessions / Activities、X-Goog-Api-Key、计划审批与 AUTO_CREATE_PR）
    url: https://developers.google.com/jules/api
    kind: docs

  - label: Google · Jules REST 参考（approvePlan / create / list / sendMessage 等方法）
    url: https://developers.google.com/jules/api/reference/rest
    kind: docs

  - label: Google · Jules 官方文档 FAQ / 用量限制（云 VM、联网、失败重试、不训练私有仓库）
    url: https://jules-documentation.web.app/faq
    kind: docs

  - label: Google · Google AI 套餐页（Pro 列 Jules 扩展额度、Ultra 列任务与并发扩展，2026-10-08 取）
    url: https://one.google.com/intl/en_us/about/google-ai-plans/
    kind: pricing

  - label: Google · Jules 正式可用（2025-08-06 GA：免费入口与 Pro 5x / Ultra 20x 额度）
    url: https://blog.google/technology/google-labs/jules-now-available/
    kind: engineering

  - label: Google · Jules 主动能力更新（Suggested Tasks / Scheduled Tasks / Render 集成，2025-12-10）
    url: https://blog.google/technology/developers/jules-proactive-updates/
    kind: engineering

link:
  url: https://jules.google
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: no
  direct_note: jules.google 大陆直连稳定超时（同日两次 000）。
  direct_note_en: jules.google times out consistently from mainland (000 twice).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**本机什么都不装，任务跑在 Google 的云机器上，做完给你一个 PR。**

它和你熟悉的 IDE / CLI 助手最大的差别不是功能多少，而是**交互不是实时的**：
你提交任务、批准计划，然后走开，回头收 PR。

**官方 GA 发布页原文**："clones your codebase into a secure Google Cloud virtual machine (VM)"，以及 "operates asynchronously"。

## 适合与不适合

**适合**自包含、可验证的活：修一个明确 bug、升级依赖、补测试、迁移代码片段、小范围新功能。

**它的产出是一个 PR，不是给你一个能对话的界面。**

**官方对交付形态的说法**："test verified patches" 与 "Open PRs with runnable code and test results"

**不适合**两类活。一是需要实时 shell、边跑边改的高频交互，那是 CLI / IDE 形态的强项。
二是需求模糊、需要反复澄清的架构级任务。官方 FAQ 自己就把「vague prompts」
列进了任务失败的常见原因。

## 异步流程与计划审批（本次核验重点）

官方 REST 文档把流程写得很清楚，其中有一处最容易被误读：

**官方原文**：By default, sessions created through the API will have their plans
**官方原文**：automatically approved. If you want to create a session that requires
**官方原文**：explicit plan approval, set the `requirePlanApproval` field to `true`.

**即：API 建的任务默认自动批准计划，要人工把关必须显式打开。** 网页端默认则是「Prompt a task and approve Jules' plan」。

PR 的生成同样要显式开关：

**官方原文**：The `automationMode` field is optional. By default, no PR will be
**官方原文**：automatically created.

设成 `AUTO_CREATE_PR` 才会自动开 PR。

进度以 activity 流的形式返回。相关 API 方法和事件名：

**方法**：`sessions/{id}:approvePlan`、`sessions`、`sessions/{id}:sendMessage`
**事件**：`planGenerated` / `progressUpdated` / `sessionCompleted`
**产物**：`bashOutput`、`changeSet`（gitPatch）

## 核验说明

`confidence: partial` 的依据：本轮核到了官方 GA 发布页、Google One 套餐页、
Jules API 与其 REST 参考、官方 FAQ 页、两份官方博客更新。

**缺口集中在两类，而且这两类在可读的官方页里确实没有：**

- 「数字」：逐档每日任务数与并发数（jules.google 定价页是 JS 渲染的，取不到）
- 「模型映射」：当前默认模型、各档位对应哪个模型
- 以及：是否支持 MCP

这些按本站铁律记为「官方未说明」，并列出所查页面 —— **不猜。**

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **计划审批开关的真实行为** —— API 默认自动批准，网页端要批准，两处默认值不一样
- **关掉浏览器后任务会不会继续**，完成时是否真的开出 PR
- **免费层与 Pro 档的实际任务数差多少** —— 这个数官方页没写，只能实测确认

## 未知项清单

- Jules 当前默认模型与各档位的模型映射——官方未说明（已查 developers.google.com/jules/api 与 Google One AI 套餐页）
- 逐档每日任务数与并发数——官方未说明（已查 jules.google 定价页、Google One AI 套餐页与 GA 发布页）
- Jules 是否支持接入 MCP server——官方未说明（已查 Jules API 页与官方 FAQ 页）
- 上下文窗口大小与长期记忆的实现
- 云 VM 的单任务时长与并发上限
- 是否支持 GitHub 之外的代码托管

## 相关条目

- [OpenAI Dot](./openai-dot.md) — 同为厂商云形态，「关机后继续跑」与权限层可逐条对照
- [Meta Muse](./meta-muse.md) — 同为后台常驻 agent，审批与记忆机制是主要差异点
- [xAI Grok Bot](./grok-bot.md) — 同为异步云 agent，差别在按次付费与逐动作审批
- [Codex CLI](./codex-cli.md) — 跨形态对照：Codex 另有云任务入口，但主形态在终端