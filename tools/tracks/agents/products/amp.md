---
id: amp
track: cli
tasks: ["write-code"]
name: Amp
vendor: Sourcegraph
homepage: https://ampcode.com
mark: A

axes:
  model_access: >-
    **多模型前沿路由，按任务分档而非锁死单模型。**

    官方 Why Amp 原文：

    **"Multi-Model**: GPT-5.6, Claude Fable 5, fast models—Amp uses them all, for what each model is best at."

    **四个 Agent Modes 是能力预设、不是固定模型选择器**：
    `low` / `medium` / `high` / `ultra`。

    **官方原文**："Modes are capability presets, not fixed model selectors"

    路由可以自定义。它看已连接的 provider 订阅、workspace 限制与模型可用性，
    来决定主 agent 与 Oracle 怎么走。

    **Oracle 是「第二意见」模型。**

    `high` 档主 agent 用 GPT-6 Astra（medium），Oracle 用 Claude Fable 5.1。
    低 / 中 / ultra 档 Oracle 默认 GPT-6 Astra。

    **BYOK 已全线开放**（官方 news 注明 2026-09-30 起对所有档）。

    支持 OpenRouter、Bedrock、Google Cloud Agent Platform、
    Azure Foundry、Vercel / Cloudflare AI Gateway、Ollama Cloud、OpenCode Go 与自定义端点 URL，
    并可用 ChatGPT 订阅。

    ⚠ **官方源之间存在不一致。** 安全参考页仍写：

    **官方原文**："Amp doesn't support Bring Your Own Key or self-hosted deployments"

    这与定价页/news 的 BYOK 口径相反，引用时以定价页为准。
  runtime: >-
    **混合：本地 Client + 云端 Server。** 线程还可跑在三种执行面。

    官方安全参考把 Amp 拆为两个组件。

    **Amp Client** 在本地：管代码与上下文管理、本地设置、本地线程历史。

    **Amp Server** 是 ampcode.com 上的多租户云服务，GCP 托管。
    它做认证、线程同步与 LLM 代理。

    **线程执行面三分**：本地、**orb**（Amp 在云端为你创建的机器）、
    **runner**（你自己的机器，`amp --no-tui --runner-id <id>`）。

    CLI 用 `--executor local|orb|runner:<id>` 选执行位置。

    另有 Web 与 macOS / iOS 应用。同一 agent、同一线程到处可用。
  local_files: >-
    **Client 只带局部上下文，官方明确不索引整库。**

    官方安全参考原文：

    "The Amp Client and Amp Server do not **see, store, clone, or index the entire codebase**"

    它只把「被选作上下文的代码片段 / 整文件」
    （partial code data）发给 Server。

    工具侧有 `Read` / `create_file` / `edit_file` / `glob` / `Grep` / `Bash` 等。

    **IDE 集成**（VS Code、Cursor、Windsurf、Zed、Neovim）：
    连上后 Amp 能看到当前打开文件与选区。
    它还能**通过你的 IDE 编辑文件、支持完整 undo**。
  background: >-
    **有真后台形态——orbs。**

    官方首页原文：

    "Run agents anywhere and they **keep working after you close your laptop**"

    每个线程一台 orb（已含你的代码、工具与插件），可关机续跑、可从手机继续。

    **runners 在你自己机器上**：`--share` 可把 runner 共享给 workspace，
    别人也能从 ampcode.com 在它上面起线程（机器需开机）。

    **定时与自唤醒**：官方 manual 有 Schedules。

    官方演示视频显示 agent：

    **官方原文**："uses automations to wake itself up"

    也就是按计划醒来查生产。
  tools: >-
    **内置工具 + 子代理 + 插件 + MCP，四层都有官方页。**

    **内置工具**：`amp tools list` 可见的有 `Bash`、`Read`、`create_file`、`edit_file`。
    另有 `glob`、`Grep`、`web_search`、`read_web_page`、`Task`、`todo_*`、`undo_edit`。

    **子代理 / 工具**：`oracle`（复杂推理第二意见）、
    **Librarian**（跨仓库检索。可读全部公开 GitHub 代码，也可读你的私有仓库）、
    **Painter**（GPT Image 生成与编辑）、Search、Read Thread。

    **插件系统**：可写自定义 policy plugin（含 permissions 插件示例）。
    也可自定义 agent mode 与 subagent。

    **MCP**：本地（`amp.mcpServers`，command / args / env，stdio）与
    远程定义（存 ampcode.com，url / headers）。

    传输含 SSE 与 Streamable。

    认证含自动 **OAuth**、bearer、**Amp ID token**、Workload Identity。

    官方建议把 MCP server 打包进 **skills**（`mcp.json`）。这样能保持工具列表精简。
  context: >-
    **threads 是核心单位，可保存、检索、分享。**

    官方 Why Amp 原文：

    **"Threads**: You can save and share your interactions with Amp."

    可 @ 引用别的 thread（URL 或 `@T-...`）。
    也可按关键词 / 文件 / 仓库 / 作者 / 日期检索历史 thread。
    workspace 支持 **thread sharing 与 multiplayer**。

    **AGENTS.md 分层**：官方列 cwd / 父目录 / 子树、`$HOME/.config/amp/AGENTS.md`、
    系统级 `/etc/ampcode/AGENTS.md` 等层级。
    子树 AGENTS.md 在读到该子树文件时纳入。

    它还支持 @-mention、globs 条件加载，并给出从 CLAUDE.md / .cursorrules 的迁移方式。

    **压缩**：官方 Models 页把 Compaction 列为「Context summarization for long threads」。
  permissions: >-
    **默认不审批——这是最需要点出的一条。**

    官方 Tools 页原文：

    "By default, Amp **does not ask for approval** before running tools."

    官方给出的替代是**自定义 policy plugin**
    （可分发为 workspace 级 plugin）。

    **workspace 的 MCP server 需要显式批准。**
    `.amp/settings.json` 里的 server 首次检测时提示 `awaiting approval`，需 `amp mcp approve`。

    全局设置与 `--mcp-config` 传的不需要。

    **数据面较硬**：官方**自动检测并脱敏**常见密钥。
    （AWS / GCP / Azure、GitHub / GitLab、OpenAI / Anthropic、Stripe / Slack / npm 等，
    替换为 `[REDACTED:amp]`），但承认是 best-effort。

    线程数据存于 ampcode.com（GCP）。**默认不用你的数据训练**（企业档永不可开）。
    删除线程后数据 30 天内移除；Enterprise 提供零数据保留（ZDR）。

    **订阅与 BYOK 额度是两回事**。自带 Key 或订阅时，无 Amp token 费用。
  fit: >-
    适合四类用法：

    - 想让 agent **在自己的云端机器（orb）里长跑、合上笔记本仍继续**的人
    - 需要**多模型前沿路由 + Oracle 第二意见**的团队
    - 已在终端或 VS Code 系编辑器里工作、想顺带接 IDE 的人
    - 需要企业级管控（SSO、审计日志、MCP allowlist、零数据保留）的组织

pitfalls:
  - 以为默认会在执行工具前请求批准——官方明确默认不审批
  - 以为有独立 VS Code 扩展——实际靠 CLI + ide connect 接入（VS Code/Cursor/Windsurf/Zed/Neovim）
  - 把订阅当成全部开销——orbs 按分钟、超量按 credits 另计

tags: [编程, 终端, 云端, 混合, 多模型]
related: [deepagents]

sources:
  - label: Amp · 官方首页（frontier agent / orbs，2026-10-08 取到）
    url: https://ampcode.com/
    kind: docs

  - label: Amp · 官方定价页（Hobby 免费 / Individual / Teams / Enterprise 四档；报价按 D9 口径不存）
    url: https://ampcode.com/pricing
    kind: pricing

  - label: Amp · Chronicle（官方更新日志，含 2026-09-24、2026-08-25 等条目）
    url: https://ampcode.com/chronicle
    kind: changelog

  - label: Amp · Owner's Manual（Agent Modes / AGENTS.md / Orbs / CLI / Pricing）
    url: https://ampcode.com/manual
    kind: docs

  - label: Amp Docs · CLI（安装、--executor、IDE 连接、Streaming JSON）
    url: https://ampcode.com/docs/cli
    kind: docs

  - label: Amp Docs · Tools（Oracle / Librarian / Painter、默认不审批）
    url: https://ampcode.com/docs/tools
    kind: docs

  - label: Amp Docs · MCP（本地/远程、OAuth、Amp ID token、workspace 审批）
    url: https://ampcode.com/docs/customize/mcp
    kind: docs

  - label: Amp · Security Reference（Client/Server 架构、密钥脱敏、数据保留、模型训练）
    url: https://ampcode.com/security
    kind: docs

link:
  url: https://ampcode.com/
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
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

Amp 是 Sourcegraph 出的前沿编码 agent，**CLI + 云端 orb + runner 三执行面**。

发一句提示就能合上笔记本继续跑。

它多模型前沿路由，Oracle 提供「第二意见」模型。

## 适合与不适合

- 想让 agent 在云端机器（orb）里长跑、合上笔记本仍继续的人
- 需要多模型前沿路由与 Oracle 第二意见的团队
- 已在终端或 VS Code 系编辑器里工作、想顺带接 IDE 的人
- 需要企业级管控（SSO、审计日志、MCP allowlist、零数据保留）的组织

**不适合**假定「执行动作前一定会先问」的场景。

官方原文明确：

**官方原文**："By default, Amp does not ask for approval before running tools"

审批要靠自定义 policy plugin 自己加。

## 核验说明

`confidence: partial` 的原因：大部分维度都已从官方页核到。

具体是运行面、执行面、provider / 模式、MCP 接入、权限与数据面。

没核到的是两处。**一是 Individual 档 Megawatt / Gigawatt 两级的具体额度差**，
二是官方定价页「Questions & Answers」问答正文。

前者官方以切换形式呈现、未页面并列给出；后者本次抓取未展开。故不给 `verified`。

**两处需标注的官方源不一致**：

- ① 安全参考页仍写「不支持 BYOK 与自托管」，与定价页 / news 的 BYOK 口径相反（以定价页与新近 news 为准）
- ② 任务给的 npm 包名是 `@sourcegraph/amp`，而官方安装文档当前给的是 **`@ampcode/cli`（官方标注 not recommended）**，两者以官方文档为准

本轮核到的官方页：首页、定价页、Chronicle、Owner's Manual、docs/cli、docs/tools、docs/customize/mcp、Security Reference。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点验三处。

- ① 无审批默认下跑工具的越权边界（是否只靠 policy plugin 兜底）
- ② orb 的「合上笔记本继续跑」与暂停计费规则（官方称 5 / 20 分钟阈值）
- ③ `amp --execute ... --stream-json` 在脚本 / CI 里的可用性（官方称尽量兼容 Claude Code 格式）

## 未知项清单

- Individual 档 Megawatt 与 Gigawatt 的**具体额度差**：官方定价页以切换形式呈现，未并列给出（orb 时长额度见官方页；报价按 D9 口径不存）
- 官方定价页 FAQ 的**问答正文**：本页只抓到问题标题，具体答复内容未展开
- orb 的并发上限与单次最长时长：官方未说明（已查 docs/orbs 与定价页）
- 自托管部署：官方安全参考称为空（明确不支持），未提供任何自托管路径

## 相关条目

- [Goose](./goose.md) — 同为 CLI 形态，对照「纯本地进程」与「云端 orb 长跑」两种运行面
- [Codex CLI](./codex-cli.md) — 同为多 provider 终端 agent，对照权限默认与 MCP 传输
- [Claude Code CLI](./claude-code-cli.md) — 同为前沿编码 agent，对照审批机制与数据策略
