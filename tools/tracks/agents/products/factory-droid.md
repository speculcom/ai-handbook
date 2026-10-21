---
id: factory-droid
track: cli
tasks: ["write-code"]
name: Droid
vendor: Factory AI
homepage: https://factory.ai
mark: D

axes:
  model_access: >-
    **模型无关是它的卖点：官方托管模型、BYOK、本地模型三路并存。**

    官方托管的模型覆盖四家厂商，另有一个开放权重池。

    - Anthropic：Claude Opus / Sonnet / Fable / Haiku
    - OpenAI：GPT-6 / GPT-5.5 / GPT-5.3-Codex
    - Google：Gemini
    - xAI：Grok
    - Droid Core 开放权重：GLM、Kimi、Qwen、DeepSeek、MiniMax、Nemotron 等

    每个模型都标了消耗倍率与支持的 `reasoningEffort`。

    倍率举例：`gpt-5.5` 是 2×，`claude-sonnet-5` 是 0.8×。

    **BYOK 可以接自家 key，也可以接任意 OpenAI 兼容端点。**

    **官方原文**："Use your own OpenAI or Anthropic keys, connect to any open source model providers, or run models locally"

    配置写在 `~/.factory/settings.json` 的 `customModels` 里，共三个字段。

    - `baseUrl`
    - `apiKey`
    - `provider`（三选一：`anthropic`、`openai`、`generic-chat-completion-api`）

    值可以用 `${VAR}` 引用环境变量。

    能接 OpenRouter / Fireworks / Together / Ollama / vLLM 等任意 OpenAI 兼容端点。

    **API key 只留在本地，不上传。**

    **官方原文**："Your API keys remain local and are not uploaded to Factory servers"

    换模型用 `/model`。

    **自定义模型只在 CLI 可用，不出现在 Web / 移动端。**

    另有官方 **Factory Router** 自动跨 provider 路由。
  runtime: >-
    **CLI 优先，但官方定位是「一种 agent、多平台」。**

    主力是终端进程 `droid`，也就是交互式 REPL。

    它的生命周期绑定终端会话，终端关掉就结束。

    安装三选一：

    - macOS / Linux：官方脚本 `curl -fsSL https://app.factory.ai/cli | sh`
    - Windows：`irm https://app.factory.ai/cli/windows | iex`
    - 或用 npm：`npm install -g droid`

    **同一个 agent 还有另外两个入口。**

    - **Factory App** —— 桌面客户端
    - **Droid SDK** —— TypeScript 的 `@factory/droid-sdk`，Python 的 `droid-sdk`

    官方定价页把这三者并列为 Pro 档内容。

    **官方原文**："Factory App / Droid CLI / Droid SDK"

    企业侧还有 **Droid Computers**，那是 Factory 托管的远端云环境，Plus 起。

    **本条目只记录 CLI 形态**，桌面与 SDK 的差异以官方页面为准。
  local_files: >-
    **它在你自己的工作目录里读写，官方另给了两个隔离手段。**

    一是 `--cwd <path>`，指定工作目录。

    二是 `-w, --worktree [name]`，在独立 git worktree 上跑。

    **官方原文**："fanning out parallel `droid exec` jobs against the same repo without file conflicts"

    官方说明：clean worktree 退出时自动删除，dirty 的保留待评审。

    **非交互的 `droid exec` 默认只读。**

    DEFAULT 档列出的读命令包括：

    - `cat` / `ls` / `git status` / `git log`
    - `find`，但不带 `-delete` / `-exec`

    官方在 DEFAULT 档写明：

    **官方原文**："No modifications to files or system"

    要改文件，得显式开到 `--auto low` 以上。

    **代码库是否做向量索引、大仓库首次建索引要多久，官方未说明**
    （已查 CLI Reference 与 Quickstart 两页）。
  background: >-
    **CLI 本体绑定会话，但官方有明确的云端后台形态。**

    终端进程退出即结束。

    官方定价页 Pro 档写有：

    **官方原文**："Cloud & local background agents"

    Plus 档解锁 **Droid Computers**。

    **官方原文**："Factory-managed Droid Computers (remote cloud environments)"

    企业页亦称 Droid 可跑在下列环境上：

    - CI runners、VMs、Kubernetes clusters

    **Missions** 是多 agent 编排形态：orchestrator 协调 worker 与 validator。

    发起方式二选一：`/missions` 或 `droid exec --mission`。

    官方要求 High 自主级别，或用 `--skip-permissions-unsafe`。

    **云端并发的具体数值与配额官方未给**
    （已查 Plans & Pricing 与 Missions 概览两页）。
  tools: >-
    **内置工具面很宽，MCP 支持完整，还带一个交互式管理器。**

    内置能力包括：

    - 命令执行、文件读写、git 操作
    - 代码评审（`/review`）
    - 图像生成、PDF 读取

    扩展面另有五类：

    - **Skills** —— `/skills`、`/create-skill`
    - **Hooks** —— PreToolUse / PostToolUse / PreCompact 等九类事件
    - **Custom Droids 子代理** —— `/droids`
    - **Plugins** —— `/plugins`，经 marketplace 分发
    - 自定义斜杠命令与 **AGENTS.md**

    **MCP 支持两种传输。**

    **官方原文**："Droid supports two types of servers: http (remote endpoints) and stdio (local processes)"

    添加方式是 `droid mcp add <name> <url> --type http` 或 `droid mcp add <name> "<command>"`。

    `/mcp` 打开交互式管理器，可以浏览、查看工具、启停、做 OAuth 认证。

    它还能从注册表添加 40+ server。

    配置分两层：用户级 `~/.factory/mcp.json` 与项目级 `.factory/mcp.json`。

    另有 `disabledTools` 可以按工具禁用，OAuth token 存系统 keyring。

    **非交互模式官方也支持。**

    `droid exec` 的输出格式有 `text` / `json` 两种。

    并有 `--input-format stream-jsonrpc` 的长期 JSON-RPC 控制面。
  context: >-
    **会话可以按 id 续接，也可以分叉；压缩与控制面都是公开的。**

    非交互侧用 `droid exec --session-id <id>` 续接。

    分叉用 `--fork <id>`。

    交互侧退出时会提示 resume，CLI 参考里有 `-r, --resume`。

    stream-jsonrpc 控制面暴露 `droid.load_session`、fork 会话与 compact history。

    **官方原文**："interrupt work, update settings, manage MCP servers/tools, inspect context, fork sessions, or compact history"

    压缩另有 `PreCompact` hook 事件。

    changelog 里也有这一条：

    **官方原文**："in-place compression"

    **记忆方面**，官方企业形态提到跨仓库的「organizational knowledge」。

    另有 issue 跟踪上下文。

    Enterprise 档另有：

    **官方原文**："Cross-harness agent memory"

    **CLI 侧记忆的持久化边界与保留策略，官方未在 CLI 页说明**
    （已查 CLI Overview 与 Droid Exec 两页）。
  permissions: >-
    **权限是两级设计：分级自主（Autonomy Level）加命令黑白名单。**

    企业还能给这两级设上限。

    官方 Autonomy 页把执行风险分成四档。

    - **Off** —— 只读工具 + 白名单命令
    - **Low** —— 文件编辑 + 低风险命令 / MCP
    - **Medium** —— 加上可逆的工作区改动，如 `npm install`、`git commit`
    - **High** —— 高风险操作，如 `git push`、迁移

    切换用 `Ctrl+L` 循环，`Shift+Tab` 切 Auto / Spec。

    命令策略是三张表。

    - `commandAllowlist` —— 视为低风险
    - `commandDenylist` —— 即使放宽也需批准
    - `commandBlocklist` —— **任何级别都拒绝、没有审批提示**，能识破 `bash -c` 包裹绕过

    官方称 `commandBlocklist` 是：

    **官方原文**："the strongest control available"

    非交互的 `droid exec` 默认只读。

    放开用 `--auto low|medium|high` 逐级提升。

    `--skip-permissions-unsafe` 是全放开，官方标注 DANGEROUS，仅限隔离环境。

    越级即停：返回非零码，不做部分改动（fail-fast）。

    企业可以设 Default / Maximum Autonomy Level 封顶。
  fit: >-
    **适合在终端里跑端到端软件工程、且需要企业级治理的团队。**

    三类团队最对得上：

    - 已有仓库，想跑完规划 → 实现 → 测试的完整流程（`/missions` 多 agent 编排）
    - 要做 CI/CD 自动化：`droid exec` 单次执行、JSON 输出、失败返回非零码
    - 需要 BYOK / 本地模型 / 气隙部署，以此摆脱单一厂商锁定

    **不适合只想找一个免费轻量终端助手的个人**——官方没有免费档，最低是付费档 Pro。

pitfalls:
  - 以为 BYOK 就完全不受额度限制，官方写明 Individual 档 BYOK 也有免费额度上限
  - 把 Droid 当成纯 CLI，其实官方主推 CLI + 桌面 App + SDK 三入口
  - 以为 droid exec 会直接改文件，它默认是只读模式

tags: [编程, 终端, 多模型, 本地]
related: [filesystem]

sources:
  - label: Factory AI · 官方定价页（Pro / Plus / Max 三档；报价按 D9 口径不存；2026-10-08 核验）
    url: https://factory.ai/pricing
    kind: pricing

  - label: Factory AI · 官方文档 · Plans & Pricing（滚动 Rate Limits、Droid Core、Extra Usage、BYOK）
    url: https://docs.factory.ai/pricing
    kind: pricing

  - label: Factory AI · 官方文档 · Full Changelog（CLI / App / API / Web / Enterprise 分面维护）
    url: https://docs.factory.ai/changelog/release-notes
    kind: changelog

  - label: Factory AI · 官方文档 · CLI Updates
    url: https://docs.factory.ai/changelog/cli-updates
    kind: changelog

  - label: Factory AI · 官方文档 · CLI Overview（安装三选一、Key capabilities）
    url: https://docs.factory.ai/cli/getting-started/overview
    kind: docs

  - label: Factory AI · 官方文档 · Quickstart（安装脚本、审批流程）
    url: https://docs.factory.ai/cli/getting-started/quickstart
    kind: docs

  - label: Factory AI · 官方文档 · Droid Exec（headless、自主级别、输出格式）
    url: https://docs.factory.ai/cli/droid-exec/overview
    kind: docs

  - label: Factory AI · 官方文档 · Autonomy Level（四档、命令名单、企业上限）
    url: https://docs.factory.ai/cli/user-guides/auto-run
    kind: docs

  - label: Factory AI · 官方文档 · Model Context Protocol (MCP)（http / stdio、注册表、分层配置）
    url: https://docs.factory.ai/cli/configuration/mcp
    kind: docs

  - label: Factory AI · 官方文档 · Bring Your Own Key (BYOK)（三 provider 类型、本地模型、key 不外传）
    url: https://docs.factory.ai/cli/byok/overview
    kind: docs

  - label: Factory AI · 官方文档 · Available Models（托管模型清单与倍率、Droid Core）
    url: https://docs.factory.ai/models
    kind: docs

  - label: Factory AI · 官方文档 · Enterprise Overview（云 / 混合 / 气隙部署、SOC 2 / ISO）
    url: https://docs.factory.ai/enterprise
    kind: docs

  - label: Factory AI · 官方文档 · Droid CLI Reference（--cwd / --worktree / 安装与更新）
    url: https://docs.factory.ai/reference/cli-reference
    kind: docs

  - label: Factory AI · 官方仓库 · Droid TypeScript SDK
    url: https://github.com/Factory-AI/droid-sdk-typescript
    kind: repo

link:
  url: https://app.factory.ai
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

**Droid 是 Factory AI 的终端编码 agent**。

它模型无关——官方托管、BYOK、本地模型三路并存。

它以**滚动 Rate Limits + 分级自主**面向企业治理。

## 变更记录在官方文档站，不在 GitHub releases 页

Droid 的版本号是**分面维护**的：CLI 与 Desktop 是两套号。

| 面 | 代表版本 | 日期 |
|---|---|---|
| CLI | `v0.229.0` | 2026-09-29 |
| Desktop | `v0.186.0` | 2026-09-29 |

官方 Full Changelog 是**分面累积列表**，按 CLI / App / API / Web / Enterprise 多个面维护，并自称累计上百个 releases。

另有单独的「CLI Updates」页。

**引用版本号时要注明是哪个面。**

官方 changelog 页头的「latest」摘要，与下方条目列表在核验当日不同步。

页头写 `v0.228.0`，条目里已出现 `v0.229.0`。

引用前以页面实时为准。

## 安装与三种入口

三种装法都可以：

```
curl -fsSL https://app.factory.ai/cli | sh      # macOS / Linux
irm https://app.factory.ai/cli/windows | iex    # Windows
npm install -g droid
```

**它不是「一个 CLI 工具」，而是「一个 agent 的三个入口」。**

- 定价页把 Pro 档内容写成「Factory App / Droid CLI / Droid SDK」
- 官方文档另有「IDE Integrations」与 JetBrains / Zed 集成

采购时要看清你要的是哪个入口：三者的运行面与额度口径不完全相同。

## 额度不是「每月一个总量」

官方额度是**三窗口滚动 Rate Limit**：

```
5-hour / 7-day / 30-day 三个窗口独立，都需有余额才能发请求
```

**这解释了「为什么刚充值还是被限」**——你可能撞的是 5 小时窗口。

撞限后可以切 **Droid Core** 继续干：它是开放权重模型池，有独立的免费额度。

也可以用 **Extra Usage**：预付制、不过期（起充额见官方页，本站按 D9 口径不存）。

这是本站见到的最细的额度口径之一。

## 企业形态

官方 Enterprise 页把部署面写成：

> 「cloud, hybrid, and fully airgapped environments」

Droid 可以跑在：

> 「developer laptops、CI runners、VMs、Kubernetes clusters、airgapped networks」

合规程序表列 **SOC 2 Type II / ISO 27001 / ISO 42001**。

官方还提供 Droid Shield、命令策略、hooks、沙箱与 OpenTelemetry 遥测。

**这是本分区里企业治理表述最完整的一份**，但均为官方自述。

## 核验说明

`confidence: partial` 的原因：

- ✅ 已核验：五档档位结构与三窗口 Rate Limit 机制、Droid Core / Extra Usage / BYOK
- ✅ 已核验：安装三选一、CLI + Desktop + SDK 三入口
- ✅ 已核验：四档 Autonomy 与命令名单、MCP 两种传输与分层配置
- ✅ 已核验：headless `droid exec` 与自主级别、企业部署与合规自述
- ❌ 官方未说明：代码库索引策略与大仓库耗时、云端并发与配额数值、CLI 侧记忆的持久化边界（见「未知项清单」）

**引用本条目时请只使用已核验部分。**

## 适合与不适合

在终端里完成端到端软件工程任务，且需要企业级治理的团队。

三个重点场景：

- 已有仓库的规划 → 实现 → 测试（`/missions` 多 agent 编排）
- CI/CD 自动化：`droid exec` 单次执行 + JSON 输出 + 失败非零码
- 需要 BYOK / 本地模型 / 气隙部署，以摆脱单一厂商锁定

**不适合**只想找一个免费轻量终端助手的个人：官方没有免费档，最低是付费档 Pro。

`droid exec` 默认只读，想让它自动改文件要显式提级。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测三窗口 Rate Limit 的实际打断频率。

这是它与「按月给一个总量」类工具最不同的工作流摩擦点。

## 未知项清单

- 代码库向量索引是否存在、大仓库首次建索引耗时（官方未说明，已查 CLI Reference 与 Quickstart）
- 云端背景 agent 与 Droid Computers 的并发数值与配额（官方只说随套餐，未给数字）
- CLI 侧跨会话记忆的持久化边界与保留策略（官方未在 CLI 页说明，已查 CLI Overview 与 Droid Exec）
- Business / Enterprise 的档位内容（官方页只写「联系销售」）

## 相关条目

- [Codex CLI](./codex-cli.md) — 同为多 provider 终端 agent，架构侧重 app server
- [OpenCode](./opencode.md) — 同为 BYOK 多 provider，可对照开放许可一侧
- [Claude Code CLI](./claude-code-cli.md) — 同为终端编码 agent，权限模型与生态不同
