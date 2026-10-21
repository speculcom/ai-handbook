---
id: claude-code
track: ide
tasks: ["write-code"]
name: Claude Code IDE 扩展
nameEn: Claude Code (IDE extension)
vendor: Anthropic
homepage: https://code.claude.com/docs/en/overview
mark: CC
accent: "#D97757"

axes:
  model_access: >-
    与 CLI 形态相同：Anthropic 自家 Claude 系列。

    **v2.1.284（2026-09-28）新增 Claude Sonnet 5.5（`claude-sonnet-5-5`），
    1M 上下文。**（API 报价见官方定价页，本站不存。）

    这条模型更新来自 CHANGELOG，是本次采集中唯一从 changelog 核实到默认模型规格的对象。

  runtime: >-
    **一个进程、三种用法**（README 原文）：

    "Use it in your terminal, **IDE**, or tag @claude on Github."

    即终端、IDE、以及在 GitHub 上用 `@claude` 提及触发。
    **这三种是同一个工具的不同入口，不是三套实现**——
    这点与 [Cline 的三形态](../../agents/products/cline.md)（三套独立形态）不同。

  local_files: >-
    **权限模型与工作目录强绑定**（官方 security 页「Working directory boundary」）：
    Manual 模式下，文件工具读/写启动目录及其子目录之外的内容前会先询问。

    要免询问读某目录可把它加为 additional directory
    （`--add-dir` / `/add-dir` / `additionalDirectories`）。

    **可按路径精确放行或拒绝读**：

    - settings 的 `permissions.deny` 官方示例即 `"Read(./.env)"`、`"Read(./.env.*)"`
    - `permissions.allow` 示例 `"Bash(npm run test *)"`

    **Bash 另有 OS 级沙箱**（官方 sandboxing 页，默认关闭）：

    `sandbox.enabled` 开启后，写入默认限工作目录 + 临时目录 + 已添加目录，
    读取默认放开整机（含 `~/.ssh` 等凭据文件，可 `denyRead` 收紧）。

    1M 上下文。**这三套机制在 VS Code / JetBrains 扩展与终端读同一批
    settings 文件**（官方 settings 页），故 IDE 形态适用同一套边界。

  background: >-
    **IDE 扩展本身是本地进程**，退出即停（本地会话可用 Remote Control
    从手机/浏览器远程操控，但执行仍在你的机器上）。

    **但同一工具提供「真后台」**：云会话（`claude --cloud` / claude.ai/code）
    跑在 Anthropic 托管的云基础设施上。

    **官方原文**："The session keeps running after you close your laptop"

    可从浏览器、手机、桌面端或终端启动与查看；另有 GitHub Actions
    （`@claude`、`prompt` 自动化、`schedule` 定时）
    与 Routines 定时/触发运行，每次执行都算一个云会话。

    **云会话可用不代表本地 IDE 会话能后台跑**——两者执行环境不同。

  tools: >-
    **内置工具 + MCP + 扩展机制都齐**。

    内置文件与网络工具（Read / Edit / Write / WebFetch / WebSearch）、
    Bash、LSP 等（官方 tools-reference）。

    **MCP 支持完整**（官方 mcp 页）：

    传输含 **HTTP / SSE / stdio / WebSocket** 四种。
    安装 scope 分 local / project（`.mcp.json`）/ user 三级，
    用 `claude mcp add` 配置，支持 `mcpServers` JSON 导入与 OAuth 认证。

    v2.1.284 另新增 `/mcp reconnect all`，并修复恢复会话时
    MCP 工具报 "No such tool available" 的竞态（**现等待最多 10 秒**）。

    **扩展机制**：

    - Hooks（ConfigChange / PreToolUse 等）
    - Subagents（各自独立上下文与可选持久记忆）
    - Plugins
    - Skills
    - `.claude/rules/` 规则

    三入口（终端 / IDE / GitHub）共用同一套。

  context: >-
    **跨会话记忆有明确层级**（官方 memory 页）：

    CLAUDE.md 按 托管策略 / 用户（`~/.claude/CLAUDE.md`）/
    项目（`./CLAUDE.md` 或 `./.claude/CLAUDE.md`）/ 本地
    （`CLAUDE.local.md`）四级，从宽到窄依次加载并拼接。

    子目录里的 CLAUDE.md 在读到该目录文件时才按需载入。

    另有 **auto memory**（Claude 自己写的笔记，每会话载入前 200 行 / 25KB）
    与 `.claude/rules/`（可按 `paths:` 限定文件类型）。

    **压缩自动进行**：接近上限即自动 `/compact`，
    官方 context-window 页给出压缩后各机制的保留规则
    （项目根 CLAUDE.md、auto memory 会从磁盘重新注入）。

    v2.1.284 修复过「压缩后仍超长」的持久报错（会再压一次）。

    支持 1M 上下文的模型另有 `[1m]` 变体。

    **三入口读同一批 CLAUDE.md、用同一压缩策略，故 IDE 与 CLI 一致。**

  permissions: >-
    **本分区里权限设计最细的一个**，且多态共用：

    settings 用 `allow` / `ask` / `deny` 三类规则按工具与内容放行，
    官方示例 `"allow": ["Bash(npm run lint)"]`、`"deny": ["Read(./.env)"]`。

    规则来自四级 settings 文件（用户 / 项目 / 项目本地 / 托管），
    托管设置优先级最高。

    权限模式含：

    - auto（分类器模型审）
    - manual（只读起步、逐个问）
    - acceptEdits
    - plan
    - bypassPermissions
    - dontAsk

    另提供「允许这一次但保持询问」的第三态。

    托管策略支持 `availableModels` 与 `enforceAvailableModels`，
    不匹配时启动即警告；`/usage` 显示具体金额而非百分比。

    **Bash 另有 OS 级沙箱**（官方 sandboxing 页，默认关闭）：

    开启后文件系统与网络双隔离（网络默认无出口，走本地代理按域名白名单）。
    macOS / Linux / WSL2 支持，原生 Windows 不支持。
    凭据存储：macOS 走 Keychain，Linux 用 0600 文件。

    **VS Code 与 JetBrains 扩展读同一批 settings 文件**（官方 settings 页），
    故上述权限机制在 IDE 形态适用。

  fit: >-
    已在用 IDE 且希望不切换工具就能用 Claude 的人。
    需要在终端、IDE、GitHub 三处用同一工具的人。
    重视权限可控性与 MCP 生态的人。

pitfalls:
  - 以为 IDE 形态是独立产品，它与 CLI 是同一个进程的三种入口
  - 套用 CLI 的权限设计到 IDE 形态 —— 官方 settings 页明确 VS Code / JetBrains 扩展读同一批 settings 文件，两者一致
  - 以为开源可自由使用，许可是 proprietary

tags: [编程, IDE, 本地]
related: [claude-agent-sdk]

sources:
  - label: Anthropic · Claude Code 官方文档
    url: https://code.claude.com/docs/en/overview
    kind: docs

  - label: Anthropic · Claude Code 仓库 README（三种用法原文）
    url: https://github.com/anthropics/claude-code
    kind: repo

  - label: Anthropic · Claude Code CHANGELOG
    url: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
    kind: changelog

  - label: Anthropic · Claude Code Atom feed
    url: https://github.com/anthropics/claude-code/blob/main/feed.xml
    kind: changelog

  - label: Anthropic · Commercial Terms of Service
    url: https://www.anthropic.com/legal/commercial-terms
    kind: docs

  - label: Anthropic · Claude Code Settings（四级 settings 文件、allow/ask/deny 示例）
    url: https://code.claude.com/docs/en/settings
    kind: docs

  - label: Anthropic · Claude Code Security（权限架构、工作目录边界、云会话隔离）
    url: https://code.claude.com/docs/en/security
    kind: docs

  - label: Anthropic · Claude Code Sandboxing（Bash 沙箱、文件系统与网络隔离、默认值）
    url: https://code.claude.com/docs/en/sandboxing
    kind: docs

  - label: Anthropic · Claude Code Memory（CLAUDE.md 层级、auto memory、/compact 保留规则）
    url: https://code.claude.com/docs/en/memory
    kind: docs

  - label: Anthropic · Claude Code MCP（HTTP/SSE/stdio/WebSocket 传输、scope 层级）
    url: https://code.claude.com/docs/en/mcp
    kind: docs

  - label: Anthropic · Claude Code on the web（云会话，关机后续跑）
    url: https://code.claude.com/docs/en/claude-code-on-the-web
    kind: docs

  - label: Anthropic · Claude Code GitHub Actions（@claude、自动化与 schedule 定时）
    url: https://code.claude.com/docs/en/github-actions
    kind: docs

  - label: Anthropic · Claude Code Context window（压缩后续留机制清单）
    url: https://code.claude.com/docs/en/context-window
    kind: docs

link:
  url: https://code.claude.com/docs/en/overview
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
  direct_note: 文档站 code.claude.com 直连实测 200。
  direct_note_en: docs site code.claude.com measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**一个进程、三种入口**——终端、IDE、GitHub `@claude` 提及共用同一套权限与上下文机制。

## 形态澄清（与 Cline 的关键区别）

README 原文：

```
Use it in your terminal, IDE, or tag @claude on Github.
```

**注意这里的措辞**：是「use it in」（在……里使用它），
**不是「install」（安装）**。

### 与 Cline 三形态的本质区别

| | Claude Code | Cline |
|---|---|---|
| 三种用法 | 终端 / IDE / GitHub | CLI / Desktop / VS Code 扩展 |
| 实现 | **同一个进程** | **三套独立形态** |
| release 线 | 一条（v2.1.x） | 两条（v4.x + desktop-v0.0.x） |
| 权限机制 | 多态共用 | 各形态独立 |

**这个区别对用户很重要**：
Claude Code 的权限与会话在三种入口之间是一致的，
Cline 的三个形态则可能各自演进。

## 权限设计（本分区最细，且多态共用）

这是 Claude Code 最有价值的部分，**且因为多态共用，一处理解处处适用**：

### ① 按路径询问 + 第三态选项

v2.1.284 新增：

```
Added a "Yes, but ask again next time" answer to auto mode's prompt
before a read outside the working directories
```

多数工具的审批只有「允许 / 拒绝」两态，
这里提供了第三态：**允许这一次，但保持询问**。

### ② 托管策略控制可用模型

企业场景下 `availableModels` 控制可用模型，
`enforceAvailableModels` 决定是否强制，
**不匹配时启动即警告**，不静默降级。

### ③ 额度显示具体金额

CHANGELOG 原文（节选，金额示例按 D9 口径不摘录）：

```
Added dollar amounts to the Claude apps gateway spend limit in /usage
and the status line
```

`/usage` 与状态栏显示金额而非抽象百分比。

## 上下文压缩的边界处理

```
Fixed "Prompt is too long" errors that persisted after compacting:
now compacts once more, keeping less of the recent conversation
```

**压缩后仍可能超长**，此时会再压缩一次并保留更少近期对话。
这是诚实的边界处理，不假装一次压缩就能解决。

## MCP 支持与一个值得注意的修复

v2.1.284 两处改动：

| 类型 | 内容 |
|---|---|
| 新增 | `/mcp reconnect all` |
| 修复 | 恢复会话时 MCP 工具报 "No such tool available"（server 仍在连接），现在**等待最多 10 秒** |

**第二条揭示了一个真实场景**：会话恢复与 MCP 连接之间存在竞态。
这类问题只有大量用户才会遇到。

## 适合与不适合

已在用 IDE 且希望不切换工具就能用 Claude 的人。
需要在终端、IDE、GitHub 三处用同一工具的人。
重视权限可控性与 MCP 生态的人。

**不适合**需要开源许可或自托管的场景——
许可明确为 proprietary。

## 权限定级说明

`confidence: partial`：

- ✅ 已核验：许可状态原文、三种用法的官方表述、模型规格原文（报价按 D9 不存）、权限设计三个机制、上下文压缩策略、MCP 两处改动、release 频率（5 天 5 版）、Atom feed 存在
- ✅ A6.2 本轮新核（2026-10-08）：**VS Code / JetBrains 扩展与终端读同一批 settings 文件**；
  allow/ask/deny 规则语法与四级 settings；权限模式枚举；OS 级 Bash 沙箱（文件系统 + 网络隔离）；
  工作目录边界与凭据存储；CLAUDE.md 四级记忆层级与 auto memory；MCP 四种传输与三级 scope；
  云会话（关机后续跑）、GitHub Actions、Routines 定时

**仍属 partial 的原因**：部分官方只给机制、不给逐平台细节
（如沙箱在 macOS/Linux/WSL2 的实现差异、云会话的具体并发上限）。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测**跨形态的会话连续性**——
在 IDE 开会话、切到终端继续，看权限状态和上下文是否完整保留。
因为官方声称多态共用，这一条必须验证。

## 未知项清单

- 沙箱在 macOS / Linux / WSL2 的逐平台实现差异（官方只说 OS 级强制）
- 云会话的并发数与时长上限（官方未给具体数字）
- GitHub `@claude` 提及的完整触发条件（官方给写权限 + 非 bot 两项检查）
- 商业条款的具体限制内容

## 相关条目

- [Claude Code CLI](./claude-code-cli.md) — 同一工具的终端形态
- [Codex IDE 扩展](./codex-ide.md) — 同为「扩展 + CLI」架构
- [Cline](./cline.md) — 三形态的另一实现，但形态独立
