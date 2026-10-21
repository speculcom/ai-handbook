---
id: hermes-agent
track: harness
tasks: ["long-task"]
family: general-harness
name: Hermes Agent
vendor: Nous Research
homepage: https://hermes-agent.nousresearch.com/
mark: HA
accent: "#FFD700"
stars: 250401
license: MIT
latest_version: v2026.9.24
language: Python

# 支持哪些模型 provider（本站第一决策点）
providers:
  - Nous Portal 是自家入口，README 说它可跳过 API key 收集
  - 另有 OpenRouter、OpenAI、自建 endpoint（README 明示）
  - 完整清单见官方 `docs/integrations/providers`（本轮未取到正文）

layer_position: >-
  **它不是一个编程助手，而是一个常驻的个人助手。**

  它也是本站收录对象里星数最高的一个。

  官方自述原文：

  > "**The self-improving AI agent** built by Nous Research.
  > It's the only agent with a **built-in learning loop** — it creates skills from experience,
  > improves them during use, **nudges itself to persist knowledge**, searches its own past
  > conversations, and builds a deepening model of who you are across sessions."

  ⚠ **「the only agent with a built-in learning loop」是官方自我宣传语。**

  本站**没有做过跨产品对比测试来验证 "only" 是否成立**。
  这条只记为官方声明，不是本站结论。

  **形态上，它属于本站第 3 类「自带完整运行时」，而且是最彻底的一个。**
  官方原话说：

  > "Run it on a $5 VPS, a GPU cluster, or serverless infrastructure...
  > **It's not tied to your laptop** — talk to it from Telegram while it works on a cloud VM."

  ⚠ **重要提醒：它和本站其它 harness 不是同一层的东西。**

  本站其它 general-harness 成员（Deep Agents）面向编程任务。
  Hermes 的官方定位是**跨平台常驻的个人助手**，入口包括
  Telegram / Discord / Slack / WhatsApp / Signal / Email，
  以及 Home Assistant。
  编程只是它能做的事之一。

  **它有一个前身。** README 有独立的 "Migrating from OpenClaw" 章节，
  提供 `hermes claw migrate` 命令，可从 `~/.openclaw` 自动导入
  设置、记忆、技能与 API keys。
  该命令另有 `--dry-run` 预览，以及 `--preset user-data` 这个不导入密钥的选项。

  ⚠ **OpenClaw 与 Hermes 的关系本站未核验** —— 是否同一团队、是否改名、
  迁移路径是否完整，都不清楚。**本站只记录 README 的一手事实。**

axes:
  model_access: >-
    **官方给了四种路径，并且强调没有锁定。**

    这是本站收录对象里，对模型自由度表述最直白的一个。

    **README 原文**：

    "Use any model you want — **Nous Portal**, **OpenRouter, OpenAI, your own endpoint**,
    and many others. **Switch with `hermes model` — no code changes, no lock-in.**"

    **「your own endpoint」这一条对本站读者最有用。**
    自建网关、自托管推理都能直接接。

    **换模型不改代码，用一条运行时命令**：`/model [provider:model]`。
    这条命令 CLI 与消息平台共用。
    （见站点上的 CLI vs Messaging 对照表）

    **完整 provider 清单已核验**，来源是官方 `docs/integrations/providers`。
    官方一共列出 40+ 家：

    - Nous Portal —— 官方称 "300+ frontier agentic models"
    - OpenRouter、Anthropic、GitHub Copilot
    - xAI Grok、Google Gemini / Vertex AI
    - AWS Bedrock、Azure AI Foundry
    - DeepSeek、Hugging Face、NVIDIA Build
    - 本地 / 自托管：Ollama、LM Studio，以及 **Custom Endpoint**

    Custom Endpoint 的配置官方说：

    "saved in `config.yaml`"

    **官方对那一页的定位原文**：

    "from cloud APIs ... to self-hosted endpoints like **Ollama and vLLM**,
    to advanced routing and fallback configurations."

    ⚠ **未知：换模型后的能力对齐度、本地量化模型在多后端下的行为差异，官方未给结论。**

    本站也没有实测。

    **核验**：已查 providers 页与 configuration 页。
  runtime: >-
    **这是它最强的一维：七种终端后端，加两个入口。**

    **README 原文列举**：

    "**Seven terminal backends** — **local, Docker, SSH, Singularity, Modal, Daytona,
    and Vercel Sandbox**."

    官方还特别点出这两个后端：Daytona 与 Modal。
    它们带来 serverless persistence。

    "your agent's environment **hibernates when idle and wakes on demand**, costing nearly
    nothing between sessions"

    **入口有两个。** README 有一张专门的 CLI vs Messaging 对照表：

    - 终端 TUI：启动 `hermes`
    - 消息平台：先跑 gateway，再从 Telegram / Discord / Slack / WhatsApp /
      Signal / Email，以及 Home Assistant 聊天

    ⚠ **这是本站最有价值的一格。** 它是唯一明确说「agent 可以跑在云 VM 上、
    你从 Telegram 指挥它」的收录对象。

    这和 OpenHands 的「关掉笔记本后 agent 仍在跑」是同一类诉求。
    区别是：OpenHands 把它做成可选部署项，Hermes 把它做成了默认形态。
  local_files: >-
    **本地文件能力是间接获得的：它靠终端后端，而不是框架自己。**

    隔离机制见 permissions 维度。

    **工作区由所选后端决定。** 官方 `terminal.backend` **默认是 `local`**。

    **官方给的标注原文**："Run on your machine (default)"

    `terminal.backend` 决定工作区。
    工作目录由 `cwd` 决定。

    这些后端各自提供一层隔离：

    - Docker / SSH
    - Singularity
    - Modal / Daytona / Vercel

    **Context Files 是官方的一等概念，格式与优先级已核验。**
    （文档 `features/context-files`）
    支持的文件名如下：

    - `.hermes.md` / `HERMES.md`
    - `AGENTS.md`、`AGENTS.override.md`
    - `CLAUDE.md`
    - `SOUL.md`
    - `.cursorrules`、`.cursor/rules/*.mdc`

    **优先级是 first match wins。** 顺序原文如下：

    `.hermes.md` → `AGENTS.override.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`。
    `SOUL.md` 是身份文件，始终单独加载。

    在 git 仓库里，整条 `AGENTS.md` 链按 **git root → 工作目录** 合并。
    会话中还会渐进发现子目录 context。
    每个文件的字数上限是 floor 20,000 / ceiling 500,000。

    **文件访问有边界。** 安全页第 8 层管的是 terminal 后端的工作目录参数：

    **官方原文**："validated against an allowlist to prevent shell injection"

    安全页第 3 层说，`write_file` 与 `patch` 有 denylist。
    另有可选 write sandbox。
  background: >-
    **这一维它的机制最厚，官方给了三重机制。**

    **① 内建 cron 调度器。** 官方特性表原文：

    "Built-in **cron scheduler** with delivery to
    any platform. Daily reports, nightly backups, weekly audits — all in natural language,
    **running unattended**."

    （文档 `features/cron`）

    **② serverless 休眠后唤醒。** Daytona / Modal / Vercel 后端空闲时休眠、需唤醒，
    官方原话是这两个词：
    **官方原文**："hibernates when idle and wakes on demand"

    **③ 常驻网关进程。** gateway 一旦运行，就能从多个消息平台随时触发。

    **补偿与补跑机制官方已写明**（`features/cron`）：

    - 有 **misfire catch-up** 扫描
    - `resume` 之后 "the next tick fires one **catch-up run**"
    - 补跑可关：`cron.catch_up_missed: false`
    - 全局 `hermes pause` 期间，托管 cron 的 fire webhook 返 `503 Retry-After: 60`，
      让调度器重投

    - 官方称 "nothing is lost: due work catches up on the first tick"
    - 运行中的任务 "never killed"

    网关侧还有 **event-loop liveness watchdog**。
    它连续 3 次探针无响应就以 code 75 退出，由 supervisor 重启。
    另有 60s 心跳。

    ⚠ **未知：跨休眠 / 唤醒的状态一致性，官方未说明。**

    **核验**：已查 `features/cron`、`features/tools`、`user-guide/messaging` 三页。
  tools: >-
    **官方说它有 40+ 工具，并且明确支持 MCP。**

    文档目录里有独立的 "**Tools & Toolsets**" 页，副标题原文：

    "**40+ tools**, toolset system, **terminal backends**"

    （文档 `features/tools`）

    **MCP Integration 也是独立文档页**，原文：

    "Connect **any MCP server** for extended capabilities"

    （文档 `features/mcp`）

    **还有一项很特别的能力：子代理 RPC。** 官方原文：

    "Spawn **isolated subagents** for parallel workstreams.
    **Write Python scripts that call tools via RPC**, collapsing multi-step pipelines
    into **zero-context-cost turns**."

    ⚠ **「zero-context-cost」本站这样理解：**
    把多步管线移到上下文之外执行。
    也就是产物只回传结果。
    ⚠ **官方没有给出具体的上下文节省量，本站标记为推断。**

    社区还维护了一个 MCP server，用途是控制 Linux 桌面。
    名字是 `computer-use-linux`。
    它用 AT-SPI 无障碍树 + Wayland/X11 输入 + 截图。

    README 明确说它是给 **"Hermes and other MCP hosts"** 用的。
  context: >-
    **⚠ 这一维是本站最看重的，也恰好是本对象宣传力度最大的，必须分开核实。**

    先看官方声明。
    
    README 特性表 "A closed learning loop" 一行原文：

    "Agent-curated memory with **periodic nudges**. Autonomous skill creation after complex
    tasks. **Skills self-improve during use.** **FTS5 session search with LLM summarization
    for cross-session recall.** Honcho dialectic user modeling.
    Compatible with the agentskills.io open standard."

    **但把官方给的机制逐个归位，会发现它不是一个维度，而是三个。**

    | 官方说法 | 本站归类 | 说明 |
    |---|---|---|
    | periodic nudges（自我提示） | 状态面 | 机制触发器，不是压缩算法 |
    | FTS5 session search + LLM summarization | **上下文面 ✅** | 检索 + 摘要，**这是真正的上下文管理** |
    | Skills（自主创建 + 使用中自我改进） | 独立一层 | 程序性记忆，与对话上下文不同 |
    | Honcho dialectic user modeling | 独立一层 | 对用户的长期建模 |

    **关键区分点：压缩是用户显式触发的。**
    它有明确的 `/compress` 命令，
    CLI 与消息平台都有，对照表里与 `/usage`、`/insights` 并列。
    也就是说：**不触发就不会压缩**，它不是自动的。

    **还有一组能落到文件名的证据。** 来自 "Migrating from OpenClaw" 章节，
    这是少见的官方一手清单：

    - `SOUL.md` —— persona
    - `MEMORY.md` 与 `USER.md` —— 记忆条目
    - `AGENTS.md` —— 工作区指令
    - `~/.hermes/skills/openclaw-imports/` —— 技能目录

    **这说明记忆是明文的 markdown 文件，可读、可迁移。**
    对本站读者来说这是重要优点。
  permissions: >-
    **官方文档里有一节独立的 "Security"，把权限面拆成了八层。**

    **八层原文列的是**：

    - user authorization（allowlists、DM pairing）
    - dangerous command approval
    - file write safety
    - container isolation
    - MCP credential filtering
    - context file scanning
    - cross-session isolation
    - input sanitization

    逐项核验（官方 `user-guide/security`）：

    **① Command approval（默认值已核验）。** `approvals.mode` 有三档，**默认 `smart`**。

    - `smart` —— 用辅助 LLM 评风险；低危命令自动批准，真正危险自动拒绝，
      不确定的升级为手动

    - `manual` —— 每次都问
    - `off` —— 等于 `--yolo`

    超时默认 `300` 秒，**未回复即 fail-closed**。

    另有始终生效的 hardline blocklist。它包含：

    - `rm -rf /`
    - fork bomb
    - `dd` 写块设备等

    `--yolo` 或 `approvals.mode: off` 都不能越过它。

    还有**用户可编辑的 deny 规则**：`approvals.deny`。
    它用 fnmatch glob、大小写不敏感。
    可以写成 "yolo 但除这些之外"。

    **② DM pairing（默认拒绝）。** 授权检查按这个顺序走：

    - 平台 allow-all
    - **DM pairing 已批准名单**
    - 平台 allowlist（`TELEGRAM_ALLOWED_USERS` 等）
    - 全局 allowlist
    - 全局 allow-all
    - **Default: deny**

    配对流程是 8 位码：

    `hermes pairing approve <platform> <code>`
    `unauthorized_dm_behavior` 默认 `pair`。
    另可设 `ignore` / `decline`。
    配对码 1 小时过期、限速，5 次失败锁 1 小时。

    **③ Container isolation（默认关）。** `terminal.backend` 默认 `local`。
    容器隔离只在改用特定后端时才启用：

    - docker / ssh / singularity
    - modal / daytona / vercel

    启用后，官方列出一整套 Docker 加固 flag：

    - `--cap-drop ALL`
    - `--security-opt no-new-privileges`
    - `--pids-limit 256`
    - noexec tmpfs 等

    **迁移脚本会碰密钥。** `hermes claw migrate` 会导入五家 API keys：

    - Telegram
    - OpenRouter / OpenAI
    - Anthropic
    - ElevenLabs

    官方给了 `--dry-run` 预览。

    ⚠ **未知：gateway 端口安全，官方未单列一节。**

    dashboard 侧有 OAuth / 自托管 OIDC 鉴权。
  fit: >-
    **适合这六类场景。**

    - 想要一个**常驻的跨平台个人助手**
      （六个平台：Telegram / Discord / Slack /
      WhatsApp / Signal / Email）

    - 想把它放在云 VM 或 serverless 上，不绑在自己的笔记本
    - 需要定时任务无人值守地跑
    - 需要跨会话记忆与技能自积累
    - 想用自建 endpoint 或 OpenRouter 等多 provider
    - 需要命令级审批与 DM 配对做安全边界

    **不适合这三类场景。**

    - 只做编程任务 —— 它是通用助手，编程只是其一
    - 需要拿它当嵌入式 SDK —— 它是完整运行时，不是库
    - 需要详细的「状态 vs 上下文」分层保证 —— 它机制多，
      但官方没按这两层分

    ⚠ **企业级多用户与审计，官方未单独提供文档。**

    **已查 security 与 messaging 两页**：二者只讲单 owner 的
    allowlist / DM pairing 授权，未讲多租户审计。

pitfalls:
  - 当成编程框架用 —— **它是通用个人助手**，编程只是它能做的事之一，形态与 LangGraph/CrewAI 完全不同
  - 相信「the only agent with a built-in learning loop」是本站结论—— **那是官方宣传语，本站未做跨产品对比验证**
  - 把七种终端后端理解成七种部署方式 —— 官方说的是 terminal backends（工具执行的后端），且其中 Modal/Daytona 提供的是**休眠**不是常驻
  - 以为 `/compress` 是自动的 —— **它是显式命令**，不触发就不会压缩
  - 忽略 DM pairing 的重要性 —— 一个能接六个消息平台、还能在文件系统动手的 agent，谁能指挥它就是最关键的安全问题
  - 跑 `hermes claw migrate` 前不看 dry-run —— 该命令会接触 API keys（README 列出五家）
  - 不确认就迁移 —— Hermes 与 OpenClaw 的关系本站未核验，只记录 README 的一手事实

tags: [Python, 开源, MIT, 通用harness, 通用助手, 常驻, 跨平台消息, 定时任务, MCP, 子代理, RPC, 技能系统, 记忆, 上下文压缩, 权限审批, 自托管]
related: [memory]

sources:
  - label: NousResearch/hermes-agent · 仓库（250,401★，MIT，核验 2026-10-01）
    url: https://github.com/NousResearch/hermes-agent
    kind: repo

  - label: 主 README（定位、六项特性表含七种终端后端与学习闭环、CLI vs Messaging 对照表、文档目录、安全与 MCP 页、OpenClaw 迁移清单）
    url: https://github.com/NousResearch/hermes-agent/blob/main/README.md
    kind: docs

  - label: 官方文档首页
    url: https://hermes-agent.nousresearch.com/docs/
    kind: docs

  - label: LLM and Model Providers（官方 provider 清单 40+ 家、Nous Portal 300+ models、Ollama / LM Studio / vLLM / Custom Endpoint）
    url: https://hermes-agent.nousresearch.com/docs/integrations/providers
    kind: docs

  - label: Tools & Toolsets（40+ tools、terminal backends 七种、container security、background 进程管理）
    url: https://hermes-agent.nousresearch.com/docs/user-guide/features/tools
    kind: docs

  - label: Security（Command approval / DM pairing / container isolation）
    url: https://hermes-agent.nousresearch.com/docs/user-guide/security
    kind: docs

  - label: Memory（Persistent memory、user profiles、best practices）
    url: https://hermes-agent.nousresearch.com/docs/user-guide/features/memory
    kind: docs

  - label: MCP Integration（Connect any MCP server）
    url: https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp
    kind: docs

  - label: Tools & Toolsets（40+ tools、toolset system、terminal backends）
    url: https://hermes-agent.nousresearch.com/docs/user-guide/features/tools
    kind: docs

  - label: Cron Scheduling（Scheduled tasks with platform delivery）
    url: https://hermes-agent.nousresearch.com/docs/user-guide/features/cron
    kind: docs

  - label: Context Files（Project context that shapes every conversation）
    url: https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files
    kind: docs

  - label: Skills System（Procedural memory、Skills Hub）
    url: https://hermes-agent.nousresearch.com/docs/user-guide/features/skills
    kind: docs

  - label: Nous Portal（可跳过 API key 收集）
    url: https://portal.nousresearch.com
    kind: docs

  - label: Nous Portal 首页（核验 2026-10-01：**只有定性描述、无任何价格数字**；原文含 "with free options and Portal-only discounts"；`/pricing` 路径返 404，故本站判定官方不公开定价）
    url: https://portal.nousresearch.com/
    kind: pricing

  - label: agentskills.io开放标准（官方称兼容）
    url: https://agentskills.io
    kind: docs

  - label: Releases（v2026.9.24 @ 2026-09-24）
    url: https://github.com/NousResearch/hermes-agent/releases
    kind: changelog

link:
  url: https://hermes-agent.nousresearch.com/
  kind: official

last_verified: 2026-10-01
last_updated: 2026-10-01
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官网直连实测 200。
  direct_note_en: official site measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**Hermes Agent 是一个常驻的跨平台个人助手，会从经验里自己攒技能。**

它不绑在你的笔记本上。

> 官方 README 说：

> **The self-improving AI agent** built by Nous Research.
> It's the only agent with a **built-in learning loop** — it creates skills from experience,
> improves them during use, **nudges itself to persist knowledge**, searches its own past
> conversations, and builds a deepening model of who you are across sessions.
> Run it on a $5 VPS, a GPU cluster, or serverless infrastructure that costs nearly nothing when idle.
> **It's not tied to your laptop** — talk to it from Telegram while it works on a cloud VM.

⚠ **「the only agent」这句话，本站的态度是：** 这是**官方自我宣传语**。
本站**未做跨产品对比测试来验证 "only" 是否成立**。
记录为官方声明，不是本站结论。

## 选型第一提醒：它不是编程框架

这是本页最需要先说清的一件事。
**Hermes 与本站收录的其它 harness 不在同一层：**

| 对象 | 定位 | 入口 |
|---|---|---|
| LangGraph / Google ADK / CrewAI | 编程任务的编排框架 | Python 代码 |
| Deep Agents | 编程用 batteries-included harness | Python 代码 |
| OpenHands | 自托管 agent 控制中心 | Web UI |
| **Hermes Agent** | **跨平台常驻的个人助手** | **TUI + 六个消息平台** |

编程只是 Hermes 能做的事之一。
官方对它的描述是：

> "runs anywhere, not just your laptop"

消息入口有六个：**Telegram、Discord、Slack**、
**WhatsApp、Signal、Email**。
它也能接 Home Assistant。

⚠ **另有一条本站必须记的前身信息。** README 有独立的
**"Migrating from OpenClaw"** 章节。
`hermes setup` 会自动检测 `~/.openclaw` 并提供迁移。

⚠ **未知：Hermes 与 OpenClaw 的关系（是否同一团队、是否改名）本站未核验。**
**本站只记录 README 的一手事实。**

## 两种形态都是一等公民

> README 有一张完整的 CLI vs Messaging 对照表。两个入口是：

| 操作 | CLI | 消息平台 |
|---|---|---|
| 开始 | `hermes` | `hermes gateway setup` + `gateway start`，然后给 bot 发消息 |
| 新会话 | `/new`、`/reset` | 同 |
| 换模型 | `/model [provider:model]` | 同 |
| 压缩上下文 | `/compress` | `/compress` |
| 用量与洞察 | `/usage`、`/insights [--days N]` | 同 |
| 技能 | `/skills` 或 `/<skill-name>` | `/<skill-name>` |
| 打断当前工作 | `Ctrl+C` 或发新消息 | `/stop` 或发新消息 |

**`/compress` 是两边都有的显式命令** —— 详见下方 context 一节。

## 七种终端后端：这是它最独特的一格

> README 原文：

> **Seven terminal backends** — **local, Docker, SSH, Singularity, Modal, Daytona,
> and Vercel Sandbox**.
> Daytona and Modal offer **serverless persistence** — your agent's environment
> **hibernates when idle and wakes on demand**, costing nearly nothing between sessions.

⚠ **两点要说清。**

**① 这是 terminal backend，指的是「工具在哪执行」，不是七种部署方式。**
local 就是本机执行，Docker/Singularity 是容器，SSH 是远端机，
Modal/Daytona/Vercel 是 serverless。

**② 「空闲时休眠」不等于「常驻」。**
官方用词是 hibernate，唤醒有延迟。
休眠期间的状态一致性本站未核验。

对比 [OpenHands](./openhands.md)：它也主打「关掉笔记本后 agent 仍在跑」。
区别是那是**可选的部署形态**，而 Hermes 把它做成了**默认形态**。

## 记忆与上下文：机制最多，但官方没按本站关心的两层分

这是本对象宣传力度最大的维度，也是本站必须仔细拆的地方。

**官方声明**（特性表 "A closed learning loop" 一行原文）：

> Agent-curated memory with **periodic nudges**. Autonomous skill creation after complex tasks.
> **Skills self-improve during use.** **FTS5 session search with LLM summarization
> for cross-session recall.** Honcho dialectic user modeling.
> Compatible with the agentskills.io open standard.

**把官方给的机制逐个归位，会发现这是三个不同维度混在一句话里：**

| 官方说法 | 本站归类 | 说明 |
|---|---|---|
| periodic nudges（自我提示） | 状态面 | 机制触发器，不是压缩算法 |
| **FTS5 session search + LLM summarization** | **上下文面 ✅** | 检索 + 摘要，**这是真正的上下文管理** |
| Skills（自主创建 + 使用中自我改进） | 独立一层 | 程序性记忆，与对话上下文不同 |
| Honcho dialectic user modeling | 独立一层 | 对用户的长期建模 |

**关键区分点：压缩是显式触发的。**
`/compress` 在 CLI 与消息平台都有。
它与 `/usage`、`/insights` 并列。
**不触发就不会压缩。**

### 记忆是明文的 markdown 文件（这是重要优点）

来自 **"Migrating from OpenClaw"** 章节的迁移清单 ——
这是少见的官方一手文件级证据：

| 文件 / 目录 | 内容 |
|---|---|
| `SOUL.md` | persona 文件 |
| `MEMORY.md`、`USER.md` | 记忆条目 |
| `AGENTS.md` | 工作区指令 |
| `~/.hermes/skills/openclaw-imports/` | 用户创建的技能 |

**记忆是可读、可 diff、可手改的 markdown**，不像数据库里的黑盒。

另有一个独立的 **Context Files** 概念。
（文档 `features/context-files`）官方定义是：

> "Project context that shapes **every** conversation"

即项目上下文文件会影响每一次对话。

**它的格式与优先级已核验**：first match wins。
`.hermes.md` → `AGENTS.override.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`。
**`SOUL.md` 作为身份始终单独加载。**（见 axes.local_files）

## 权限：六个平台入口让「谁能指挥它」成为核心问题

README 的文档目录里有一节独立的 **Security**，副标题原文：

> **Command approval, DM pairing, container isolation**

**逐项解读。**

**① Command approval —— 命令级审批。**
**默认 `smart`**：辅助 LLM 评风险，低危自动批准、危险自动拒绝、不确定转手动。
超时 `300` 秒 fail-closed。
另有始终生效的 hardline blocklist，它不受这两个开关影响。

用户还能自己写 deny 规则：`approvals.deny`。
它用 fnmatch glob、大小写不敏感。

**这与别家的做法不在同一层。**

- OpenHands 用 API key 机制
- Codex SDK 有四种 `ApprovalMode`

**② DM pairing —— 私聊配对，即只有配对过的用户能指挥它。**
**默认拒绝**：授权检查顺序里，pairing 已批准名单排在平台 allowlist 之前。
全未命中即 deny。
配对流程是 8 位码：

- `hermes pairing approve <platform> <code>`

> **这一项在六个消息平台入口的前提下极其重要。**
> 一个能通过 Telegram / WhatsApp 接指令、还会在文件系统上动手的 agent，
> **「谁能给它下指令」就是最关键的安全问题** —— 这也是本站把它单独列出来的理由。

**③ Container isolation —— 容器隔离。默认关。**
`terminal.backend` 默认是 `local`。
改用下面这组后端时才会启用隔离：

- docker / ssh
- singularity
- modal / daytona / vercel

## 工具：40+ 且支持 MCP，还有一项很特别的能力

> README 文档目录（本次核验的原文副标题）：

| 文档节 | 官方副标题 |
|---|---|
| Tools & Toolsets | "**40+ tools**, toolset system, terminal backends" |
| MCP Integration | "Connect **any MCP server** for extended capabilities" |
| Cron Scheduling | "Scheduled tasks with platform delivery" |

**特别能力：子代理 RPC。**

> 官方原文：

> Spawn **isolated subagents** for parallel workstreams.
> **Write Python scripts that call tools via RPC**, collapsing multi-step pipelines
> into **zero-context-cost turns**.

⚠ **「zero-context-cost」本站读作「把多步管线移到上下文之外执行，产物只回传结果」**
（这是对它的合理解释）。
**但官方未给出具体的上下文节省量，标记为推断而非官方表述。**

社区还维护了一个 Linux 桌面控制 MCP server：`computer-use-linux`。
它的能力清单是：

- AT-SPI 无障碍树
- Wayland/X11 输入
- 截图
- 窗口定向

> README 明确说它是给 "Hermes and other MCP hosts" 用的 ——
> 这是 MCP 生态的一个真实案例。

## 定时任务：常驻形态的第三重保障

> README 特性表原文：

> Built-in **cron scheduler** with delivery to any platform.
> Daily reports, nightly backups, weekly audits — all in **natural language**,
> **running unattended**.

**常驻这件事官方给了三重机制**：

- ① 内建 cron
- ② serverless 休眠后唤醒
- ③ 常驻网关进程（多平台随时触发）

**cron 的补偿 / 补跑已核验。**

- 有 misfire catch-up 扫描
- 补跑可关：`cron.catch_up_missed`
- 全局 `hermes pause` 期间，托管 cron 的 fire webhook 重投 `503 Retry-After: 60`
- 运行中的任务 "never killed"

网关侧有 event-loop liveness watchdog 与 60s 心跳。

⚠ **未知：跨休眠 / 唤醒的状态一致性，官方未说明。**

## 迁移脚本会碰密钥：用 dry-run

`hermes claw migrate` 涉及的迁移清单里有：

> **API keys** — allowlisted secrets (**Telegram, OpenRouter, OpenAI, Anthropic, ElevenLabs**)

**也就是说，迁移脚本本身会接触五家服务的密钥。** 官方给的手段是：

```bash
hermes claw migrate --dry-run              # 预览会迁移什么
hermes claw migrate --preset user-data     # 不导入密钥
```

**跑之前先 dry-run —— 这是官方自己设计的用法。**

## 适合与不适合

**适合这六类场景。**

- 想要常驻的跨平台个人助手
- 放云 VM / serverless，不绑在自己的笔记本
- 需要定时任务无人值守
- 需要跨会话记忆与技能自积累
- 想用自建 endpoint 或多 provider
- 需要命令级审批 + DM 配对做安全边界

**不适合这四类场景。**

- 只做编程任务
- 需要当嵌入式 SDK
- 需要「状态 vs 上下文」分层保证
- 需要企业级多用户与审计

## 核验说明

`confidence: partial` 的依据：

**为什么不是 verified。**

- `model_access` 的换模型后能力对齐度未核验
- `background` 的休眠 / 唤醒延迟与跨休眠状态一致性官方未说明
- 「zero-context-cost」与 Honcho / skills 的实际效果未核验

> A6.2 已补：permissions 三机制默认值、local_files 的 context files 格式与优先级、
> cron 补偿语义均已核验，见上。

**已核验：**

- 仓库存在与星数（250,401，**本站收录对象里最高**）
- 许可（MIT，经 license API）、最近推送（2026-10-01，仍活跃）
- 最新版 **v2026.9.24**（releases @ 2026-09-24）
- README 全文 243 行。它含定位段、六项特性表与七种终端后端原文
- 它还有完整的 CLI vs Messaging 对照表
- 十四节文档目录、OpenClaw 迁移清单、社区与许可段
- 仓库有中文与西语等 README 分支、Nous Portal 入口

**未核验：**

- 换模型后的能力对齐度与本地模型可靠性
- 休眠唤醒延迟与跨休眠状态一致性
- 「zero-context-cost」的量化值
- Honcho 用户建模与 skills 自改进的实际效果
- Hermes 与 OpenClaw 的确切关系

**本轮（2026-10-01）补上的**：Nous Portal 计费的**官网状态**已核验 ——
**官网不公开定价**（首页只有定性描述、无一个数字；`/pricing` 返 404）。
第三方口径流传但**未获官方确认**——按 D9 口径本站不记录这些数字。

**这条的状态：** 从「完全未核验」变成「已核验到官网不公开」。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**（按通用助手 + 常驻形态定制）：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | **DM pairing 与 command approval 的默认状态** | 部署安全的前提，也是本站最大的缺口 |
| 2 | `/compress` 压缩后信息保留的实际效果 | 它是本站最看重的维度，但压缩是手动触发的 |
| 3 | Modal/Daytona 休眠后唤醒的延迟与状态一致性 | 官方强调省成本，但唤醒体验决定能否日用 |
| 4 | 用自建 endpoint 接本地量化模型跑一轮 | README 明确支持，本站读者关心的组合 |
| 5 | 子代理 RPC 的「zero context cost」实际省了多少 | 官方说法未量化 |
| 6 | cron 任务在网关重启后的行为 | 无人值守场景的核心可靠性问题 |
| 7 | 只用它做编程任务 vs 专用编程框架的体验差 | 它定位是通用助手，本站要给出诚实判断 |

## 未知项清单

- serverless 后端的唤醒延迟与跨休眠状态一致性
- 「zero-context-cost」的实际上下文节省量
- skills 自我改进的边界（会不会越学越歪）
- Honcho 用户建模的数据去向与隐私
- Hermes 与 OpenClaw 的确切关系（团队、是否改名、迁移完整性）
- Nous Portal 的**官方**档位与额度数值（官网不公开，第三方口径未获确认）
- Nous Portal 额度制的实际消耗速度（长 agent 循环能几天烧完一档，第三方说法未实证）
- Nous Portal 与 OpenRouter 的差异（同样走 credit，但模型目录与工具网关不同）
- 本地 / 自托管模型在各后端下的可靠性（完整 provider 清单已核验）

## 相关条目

- [OpenHands](./openhands.md) — **常驻诉求的同类，但形态不同**：两者都主打「关掉笔记本后 agent 仍在跑」。OpenHands 是带 Web UI 的控制中心 + 定时 / webhook 触发；本对象是 TUI + 六个消息平台 + 内建 cron，且定位是通用助手而非纯编程。
- [Deep Agents](./deepagents.md) — 同为 general-harness 家族，但 Deep Agents 面向编程任务（filesystem + 子代理是卖点），本对象面向跨平台常驻的个人助手。
- [LangGraph](./langgraph.md) — **记忆与状态的分野对照**：LangGraph 明确区分 working memory 与 persistent memory、checkpoint 每 superstep 落盘；本对象机制更丰富但官方未按这两层分，且记忆是明文 markdown 文件。
