---
id: cursor-cli
track: cli
tasks: ["write-code"]
name: Cursor CLI
vendor: Anysphere
homepage: https://cursor.com/cli
mark: C
accent: "#111111"

axes:
  model_access: >-
    **和 Cursor 编辑器同源：模型清单跟着账户走。**

    官方 CLI 落地页给出的可选模型示例：

    - **Auto**
    - **Composer 2**
    - **Opus 4.6**
    - **Codex 5.3 High Fast**
    - **Gemini 3 Pro**
    - **Grok**

    同一页还写它覆盖：

    - Anthropic、OpenAI、Gemini、Cursor 等提供的前沿模型

    以下是官方模型名的英文原文：

    **官方落地页原文**：
    **Auto、Composer 2、Opus 4.6、Codex 5.3 High Fast、Gemini 3 Pro、Grok**

    模型与价格页另列一批：Claude 4.6 Opus / Sonnet、Gemini 3.1 Pro、
    GPT-5.3 Codex、GPT-5.4、Grok 4.20 与 Composer 2。

    切换模型用 `--model <model>`、`--list-models`、`agent models`、`/model`。

    **企业可以用管理策略限制可用模型。** 被限制的模型传给 `--model`
    会带限制信息退出。官方 CLI changelog 的英文原文：

    **官方 CLI changelog 原文**：
    "Admin Team model restrictions apply in the CLI"

    v2026.09.28 修掉了一个坑。
    `--model` 此前可能静默运行较短的基础模型。

    **与 `./cursor.md` 的差异只在入口。** 模型目录不因形态而变。
  runtime: >-
    **本地终端进程，命令名是 `agent`。**

    官方安装脚本把它装到 `~/.local/bin`，Windows 原生用 PowerShell。
    默认自动更新，`agent update` 手动升级。

    生命周期主要绑定终端会话。但官方另给了几条「脱离终端」的路径（见 background）。

    **和 `./cursor.md` 的 IDE 形态相比，差异有三处。**
    一是交互面：这里是终端。
    二是可脚本化。
    三是接入方式：`agent acp` 能把 CLI 当作 ACP server，
    跑在 stdio 上供自定义客户端接入。
  local_files: >-
    **在仓库/工作区内操作，可用 Git worktree 隔离改动。**

    用 `--workspace <path>` 指定工作区。
    用 `-w/--worktree [name]` 在 `~/.cursor/worktrees/<reponame>/<name>`
    建新 worktree（与编辑器共用保留规则）。

    **写盘默认是收紧的。** 脚本里要落盘，得配 `--force`（或 `--yolo`）。
    官方 headless 页的英文原文：

    **官方 headless 页原文**：
    "Without `--force`, changes are only proposed, not applied"

    注意 parameters 页另有相反口径的表述，两页并存：

    **官方 parameters 页原文**：
    "Has access to all tools, including write and shell"

    规则读 `.cursor/rules` 与项目根的 `AGENTS.md`、`CLAUDE.md`。
    读写范围由 permissions 的 `Read(...)` / `Write(...)` 精确控制。
  background: >-
    **终端进程随会话结束，但官方提供三条「脱离终端」的路径。**

    一是 Cloud Agent handoff。
    在会话里给消息前加 `&`，就能在 web 或移动端 cursor.com/agents 取回。

    **官方原文**：
    "continue running while you're away"

    二是**持久会话**。
    用 `agent persist` 启动、`/detach` 脱离、`agent persist attach` 重连，
    用 `agent persist list` / `stop` 管理。
    这条能力来自 v2026.08.26，changelog 的英文原文：

    **v2026.08.26 changelog 原文**：
    "Keep agents running after you disconnect"

    三是 `agent worker`，官方称它启动的是一个私有云 worker：

    **官方原文**：
    "a private cloud worker that runs agents in your environment"

    **三条路径各自的执行环境归属与额度限制，官方页面未分别写明。**
  tools: >-
    **工具面分三层，三层都已核到。**

    **第一层是内置工具面。** 官方 using 页的英文原文：

    **官方 using 页原文**：
    "Agent has tools for file operations, searching, running shell commands, and
    web access"

    其中的 Shell Mode（`/shell`，`/sh`、`/run` 为别名）在登录 shell 里跑命令。

    **第二层是 MCP。** CLI 会自动读 `mcp.json`：

    **官方原文**：
    "automatically detect and respect your `mcp.json`"

    位置是 `.cursor/mcp.json` 或 `~/.cursor/mcp.json`，与编辑器共用同一批 server。
    另有 `agent mcp` 子命令（`login` / `list` / `list-tools` / `enable` / `disable`）
    与 `--approve-mcps`。

    **第三层是 ACP。** `agent acp` 以 stdio + JSON-RPC 对外提供 ACP server。

    扩展机制另有 plugins（`--plugin-dir`、`/plugin`）、
    skills（可粘成 custom mode）与 `.cursor/rules`。
  context: >-
    **会话可恢复、可分叉、有压缩。**

    继续会话用 `--resume [chatId]`、`--continue`、`agent resume`、`agent ls`、`/resume`。
    `/fork` 把当前会话分叉成新会话，`/rewind` 跳回先前消息。
    上下文压缩用 `/summarize`（`/compress` 为别名）。

    v2026.09.22 修掉了一个坑：此前的摘要会丢掉最新一条请求或整段会话。
    现在会保留最近一条用户消息，一字不改。
    摘要失败或被中止，则保留原会话。

    长期上下文靠 rules 与 skills。
    `.cursor/rules` 与 `AGENTS.md` / `CLAUDE.md` 自动加载。
    `/goal` 可以给长期目标，官方把它标为 "Rolling out"。

    **跨会话记忆的存储位置，官方未在此页说明。**
  permissions: >-
    **权限设计是本形态最细的一块，另有 sudo 凭据保护。**

    配置文件有两个：全局 `~/.cursor/cli-config.json`，项目级
    `<project>/.cursor/cli.json`。

    权限 token 分五类：

    - `Shell(cmd)`
    - `Read(path)`
    - `Write(path)`
    - `WebFetch(domain)`
    - `Mcp(server:tool)`

    用 `permissions.allow` / `permissions.deny` 控制，**deny 优先于 allow**。

    **默认下，每条终端命令都要批准。** 官方 using 页的英文原文：

    **官方 using 页原文**：
    "Before running terminal commands, CLI will ask you to approve (y) or reject (n)"

    `--force`（别名 `--yolo`）可以放行。
    沙箱由 `/sandbox` 或 `--sandbox enabled|disabled` 控制，
    官方写 disable 时「用 allowlist 模式」。

    需要 `sudo` 时弹掩码密码框。官方称密码经安全 IPC 直达 `sudo`：

    **官方原文**：
    "The AI model never sees it"

    CI 侧官方推荐 **受限自主 + permission-based restrictions**，
    并把指令写入 `permissions.json` 配 Auto-review。
  fit: >-
    适合三类人：

    - 在终端里做工程任务、写脚本、或进 CI/CD 的人（官方 GitHub Actions 文档与 cookbook）
    - 已用 Cursor，希望编辑器与终端共用账户 / 模型 / MCP 配置的人
    - 需要把会话交给 Cloud Agent 或持久会话继续跑的人

    **不适合**要求开源许可的场景。
    Cursor CLI 是闭源商业产品，需 Cursor 账户或 API key，且用量并入账户额度池。

pitfalls:
  - 以为 Cursor CLI 是独立免费工具，实际需 Cursor 账户或 API key，用量并入账户额度池
  - 以为 print 模式会自动落盘，headless 页写不加 --force / --yolo 时只提议不写
  - 以为 Shell Mode 能跑长任务，官方限 30 秒超时且不可配置

tags: [编程, 终端, 多模型, CI, 云端]
related: [filesystem]

sources:
  - label: Cursor · CLI 官方落地页（安装、模型示例、headless 入口）
    url: https://cursor.com/cli
    kind: docs

  - label: Cursor · CLI changelog（v2026.09.28 / 09.22 / 08.26 持久会话，2026-10-08 取到）
    url: https://cursor.com/docs/cli/changelog
    kind: changelog

  - label: Cursor Docs · Cursor CLI 总览（模式、非交互、Cloud Agent handoff、沙箱、sudo）
    url: https://cursor.com/docs/cli/overview
    kind: docs

  - label: Cursor Docs · Headless CLI（print 模式、--force、输出格式、CI 脚本）
    url: https://cursor.com/docs/cli/headless
    kind: docs

  - label: Cursor Docs · GitHub Actions 集成（CURSOR_API_KEY、自主级别、权限限制）
    url: https://cursor.com/docs/cli/github-actions
    kind: docs

  - label: Cursor Docs · CLI Permissions（Shell / Read / Write / WebFetch / Mcp）
    url: https://cursor.com/docs/cli/reference/permissions
    kind: docs

  - label: Cursor Docs · CLI Parameters（全局选项与子命令清单）
    url: https://cursor.com/docs/cli/reference/parameters
    kind: docs

  - label: Cursor Docs · Models & pricing（双用量池与各档含额）
    url: https://cursor.com/docs/models-and-pricing
    kind: docs

  - label: Cursor · 官方定价页
    url: https://cursor.com/pricing
    kind: pricing

  - label: Cursor · 产品 changelog（Projects / 自托管 / Rollouts 等）
    url: https://cursor.com/changelog
    kind: changelog

link:
  url: https://cursor.com/cli
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

**Cursor 的终端形态：和编辑器共用同一账户、同一批模型、同一份 `mcp.json`。**

命令名是 `agent`。
官方称它支持：

**官方原文**："print automation for scripts and CI pipelines"

也就是把 agent 写进脚本。

相对 IDE 形态，它多出两条路径。
一条是 headless 与非交互。
另一条是把会话交给 Cloud Agent 或持久会话。

## 与 IDE 形态的差异（本条目只写差异）

| 维度 | Cursor（IDE 形态） | Cursor CLI（本条目） |
|---|---|---|
| 交互面 | 图形编辑器 | 终端进程，命令 `agent` |
| 脚本化 | 无原生非交互入口 | `-p / --print` + `--output-format text\|json\|stream-json` |
| CI | — | 官方 GitHub Actions 文档与 cookbook |
| 接入编辑器 | 就是编辑器 | `agent acp` 以 ACP server（stdio + JSON-RPC）对外 |
| 共用项 | 账户、模型、`mcp.json`、`.cursor/rules`、额度池 | 同 |

**这是同一产品的两种装法。** 模型目录与额度池不因形态而变，
差别在交互面与可脚本化程度。详见 [Cursor](./cursor.md)（IDE 形态）。

## headless / 非交互（本分区的关键点）

官方 headless 页把脚本口径写全了：

- 单次执行：`agent -p "..."`。官方原文 "Use print mode (`-p, --print`) for
  non-interactive scripting and automation"

- 落盘：批量改文件需 `--force`（别名 `--yolo`）。官方原文
  "Without `--force`, changes are only proposed, not applied"

- 输出：`--output-format text | json | stream-json`，配 `--stream-partial-output`
  做增量流；示例脚本用 `jq` 解析 `tool_call` 事件

- 鉴权：`export CURSOR_API_KEY=...`（CI 里存为仓库/组织 secret）
- 信任：`--trust` 在 headless 下免交互信任工作区

CI 侧，官方区分两种自主级别，并**推荐生产用「受限自主」**：
把提交、推送、评论交给确定性的 CI 步骤，agent 只改文件。
再用 `permissions.allow` / `deny` 在 CLI 层强约束。

## 权限与沙箱

权限 token 五类，写在 `~/.cursor/cli-config.json`（全局）
或 `<project>/.cursor/cli.json`（项目级）。**deny 优先于 allow**。

| token | 例子 |
|---|---|
| `Shell(cmd)` | `Shell(git)` 允许、`Shell(rm)` 拒绝 |
| `Read(path)` | `Read(**/*.md)`，`Read(.env*)` 拒绝 |
| `Write(path)` | `Write(src/**)`，`Write(**/*.key)` 拒绝 |
| `WebFetch(domain)` | 未列入 allow 的每次抓取都要批准 |
| `Mcp(server:tool)` | `Mcp(datadog:*)`、`Mcp(*:*)` |

**交互模式下，默认每条终端命令都要批准。**
沙箱用 `/sandbox` 或 `--sandbox enabled|disabled` 切换，disable 时退化为 allowlist 模式。

需要 `sudo` 时，官方称密码经安全 IPC 直达 `sudo`，**模型看不到明文**。

## 变更记录要点（官方 CLI changelog）

| 版本 | 关键改动 |
|---|---|
| `v2026.09.28` | `--model` / `/model` 现在运行你所选的精确模型（此前可能静默跑较短基础模型） |
| `v2026.09.22` | Auto-review：按 `permissions.json` 里的指令判断 MCP 调用该放行还是拦；修复摘要丢请求 |
| `v2026.08.26` | **持久会话**：`agent persist` 让 agent 在断开后继续跑；团队模型限制在 CLI 生效 |

官方明确有独立的 **Cursor CLI changelog** 页，与 IDE / Agents Window / SDK 分栏。
`agent --version` 查版本，`agent update` 原地升级。

## 核验说明

本条目标为 `confidence: partial`，原因如下。

已核到的：能力与权限面证据充分。
官方 CLI 文档、独立 changelog 页、定价与模型页都已取到正文。

仍缺的：两处结构性缺口（见下面的未知项清单），所以不标 `verified`。

本轮核到的官方页：

- 官方落地页 —— https://cursor.com/cli
- 官方 CLI changelog —— https://cursor.com/docs/cli/changelog
- CLI Overview —— https://cursor.com/docs/cli/overview
- CLI Headless —— https://cursor.com/docs/cli/headless
- CLI GitHub Actions —— https://cursor.com/docs/cli/github-actions
- CLI Permissions —— https://cursor.com/docs/cli/reference/permissions
- CLI Parameters —— https://cursor.com/docs/cli/reference/parameters
- Models & pricing —— https://cursor.com/docs/models-and-pricing
- 官方定价页 —— https://cursor.com/pricing
- 产品 changelog —— https://cursor.com/changelog

## 适合与不适合

在终端里做工程任务、写脚本、进 CI/CD 的人。
官方给了 GitHub Actions 与 cookbook。

已用 Cursor、希望编辑器与终端共用同一份账户、模型与 MCP 配置的人。
需要把会话交给 Cloud Agent 或持久会话继续跑的人。

**不适合**要求开源许可或完全自托管的场景。
Cursor CLI 是闭源商业产品，需 Cursor 账户或 API key，用量并入账户额度池。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测**非交互模式下「不落盘 / 落盘」的实际行为**。
官方两页说法不一致。
headless 页写：不加 `--force` 不落盘。
parameters 页写：CLI 对所有工具都有访问权，其中包含写盘与 shell。

这是最值得用一条真实 CI 流程验证的地方。

其次测**持久会话 `agent persist` 在断开网络后的续跑一致性**。

## 未知项清单

- 三条「脱离终端」路径（`&` Cloud Agent handoff / `agent persist` / `agent worker`）各自执行环境归属与额度限制 —— 官方未说明（已查 CLI Overview、CLI changelog 与 About 页）
- 沙箱在 Windows 原生下的底层实现（容器还是进程级）—— 官方未说明（已查 CLI Overview 与 Permissions 两页）
- CLI 与编辑器是否共用同一额度池 —— 官方页面按账户整体说明额度，未按形态拆分
- 各档额度倍数（1x / 3x / 20x 之类）对应的具体请求数或 token 量

## 相关条目

- [Cursor](./cursor.md) — 同一产品的 IDE 形态；账户、模型目录、`mcp.json` 与规则共用，差异在运行面与审批默认值
- [Claude Code CLI](./claude-code-cli.md) — 同为终端编码 agent，权限颗粒度与云端会话机制值得对照
- [Codex CLI](./codex-cli.md) — 同为厂商官方 CLI，非交互模式与沙箱档位可并排比较
