---
id: junie
track: ide
tasks: ["write-code"]
name: Junie
vendor: JetBrains
homepage: https://www.jetbrains.com/junie/
mark: J

axes:
  model_access: >-
    **结论：不锁模型，能自带 API Key，也能接本地模型。**

    官方把自己定位成 LLM-agnostic。
    Junie CLI 的发布博客把这句话写得很直白：

    **官方原文**："Junie supports all the top-performing models from OpenAI, Anthropic, Google, and Grok"

    官方把 **BYOK**（自带 API Key）算进了定价模型里。
    官网与定价页另列两条路：

    - 本地模型 —— via OpenAI-compatible APIs，含 Ollama 与 LM Studio
    - 第三方云模型 —— OpenAI / Anthropic / Google / xAI

    **IDE 侧的默认模型换过。**
    帮助页 Models（2025-10-14 修订）写 Default 是 OpenAI 的 GPT-5。
    2026-08-17 官方博客又称默认改成了 Gemini 3.7 Flash。

    **本地推理的说法前后变过。**
    帮助页当时写「暂不能在离线模式用本地模型」。
    2026-08 的 Junie Local 又支持在本机跑 Qwen3.6-27B。

    **具体的模型清单与各档可得性，官方未在一页内给全。**
    （已查 help Models 页与 AI 定价页。）
  runtime: >-
    **它是插件，不是独立编辑器；另有独立的 Junie CLI。**

    官方 Install 页的原话：

    **官方原文**："The Junie plugin is not bundled and not enabled in JetBrains IDEs by default"

    宿主覆盖 JetBrains 全家桶与 Android Studio：

    - CLion、GoLand、IntelliJ IDEA、PhpStorm、PyCharm Pro
    - Rider、RubyMine、RustRover、WebStorm 与 Android Studio

    官方还给了各 IDE 的最低版本。
    例如 IDEA Ultimate / PyCharm Pro / WebStorm / GoLand 需 2024.3.2+。

    **第二条腿是 Junie CLI**（2026-03 进入 Beta）。
    终端、任意 IDE、CI/CD 与 GitHub / GitLab 都能跑。
    ReSharper 2026.2 把它带进 Visual Studio（Preview）。
    2026-08 起另有本机推理的 Junie Local。
  local_files: >-
    **它只动你当前项目的文件；出项目要单独批准。**

    每轮执行后，Junie 会列出本次新增与修改的文件。
    每个文件都有 diff 查看链接。
    在 Done 面板里，你能**逐文件选择性回滚**。
    然后再决定接受还是拒绝整次执行。
    它执行的命令输出，可以在 Junie 的终端里看。

    **「项目外」是一条显式边界。**
    Action Allowlist 里有两条独立规则，默认都需要批准：

    - 「Read outside project」
    - 「Write outside project」

    想限定它处理哪些文件与目录，用 `.aiignore`。
    它的语法和 gitignore 同款。
    官方提醒：**它只保护内容，文件名与目录名仍然可见。**

    **IDE 语义索引的实现细节，官方未单列。**
    （已查 aiignore 与 diffs-and-review 两页。）
  background: >-
    **没有厂商托管的后台：任务跑在你打开的那个环境里。**

    IDE 形态依赖 IDE 进程常驻。
    本形态下，官方没有描述「厂商托管、关机续跑」的后台环境。
    它在 Code mode 下能自主跑多步任务、测试与构建。
    但这些动作都在你打开的 IDE 与本机上进行。

    **Junie CLI 把运行面扩展到终端、CI/CD 与 GitHub / GitLab。**
    那里是「你自己的运行环境」，不是厂商沙箱。

    官方博客另称 Junie 能：

    **官方原文**："run long tasks while you focus on other things"

    但官方未给出后台并发或时长额度。

    **厂商托管的后台执行环境，官方未说明。**
    （已查 modes、licensing 与 CLI 发布博客三处。）
  tools: >-
    **能力按模式分层，招牌是用真调试器。**

    四种模式：

    - **Code mode** —— 拆出多步计划并自主执行：跑命令、建文件、改代码、跑测试
    - **Ask mode** —— 只读探索与分析
    - **Plan mode** —— 先产出可编辑的结构化计划，再实现
    - **Auto** —— 由它自选

    **调试不是加日志，是真的接管调试会话。**
    GA 版起，Junie 能启动或接管调试会话。
    它在项目码、库码乃至反编译的 `.class` 文件里下断点。
    它还能查看栈帧与线程状态，并求值表达式。

    **官方原话**："uses the debugger, not println"

    另有 PR 审查与 git 工作流。
    还有 `/demo`：跑一遍功能，产出视频 / 截图 / HTML 报告。

    **MCP 官方支持，但目前只有 stdio 传输。**
    `mcp.json` 分两级：全局 `~/.junie/mcp.json`，项目 `.junie/mcp`。
    它能自动推荐相关的 server。

    **官方原文**："Only MCP servers that use the Standard Input/Output (stdio) transport type are currently supported"
  context: >-
    **计划是可提交的工件，Guidelines 是持久上下文。**

    Plan mode 的计划不是一次性对话。
    计划文档存在 `.junie/plans`，可以提交进版本库。
    它按产品需求、技术设计、交付阶段（可选测试策略）分页。
    需求含糊时，Junie 会先反问，确认之后才实现。

    `.junie/guidelines.md` 是持久层。
    它会被加进每一个任务，可以版本控制、可以复用。
    官方另有一个 junie-guidelines 目录。

    官方还称 Junie 能 **context-aware by default**，并说它做得到 next-task prediction。
    连上 JetBrains IDE 后，还有语义重构与智能搜索。

    **上下文窗口与压缩策略，官方未给数字。**
    （已查 customize-guidelines 与 out-of-beta 博客两处。）
  permissions: >-
    **默认每个动作都要审批。**
    **Brave Mode 能一次放开，但官方不建议。**

    官方把动作分成 safe 与 sensitive 两类。

    **官方原文**："Most terminal commands, code execution, and execution of MCP tools are considered to be sensitive actions, and Junie by default requires explicit approval from the user"

    Brave Mode 可以一次性放开所有敏感动作。

    **官方原话**："using brave mode is not recommended"

    Action Allowlist 按类型加白：

    - Terminal（支持正则）、RunTest、Build、Preview
    - MCP、Read outside project、Write outside project
    - Edit build scripts —— 它可能触发代码执行，所以单独设闸

    `ls` / `cd` / `pwd` 默认免确认。

    `.aiignore` 保护文件内容。
    但官方提示：Brave Mode，或命中白名单的命令，可以绕过。
  fit: >-
    **适合三类人，不适合另外三类。**

    适合：

    - 已经在用 JetBrains IDE（IntelliJ IDEA / PyCharm / WebStorm / GoLand 等）的人
    - 看重「先出计划再写代码」与多模型 / BYOK 的团队
    - 需要在终端或 CI/CD 里复用同一个 agent 的人（Junie CLI）

    不适合：

    - 中国大陆用户
    - AI Enterprise 档用户（官方写明该档暂不含 Junie）
    - 需要厂商托管云后台的人

    中国大陆这条是官方许可页的硬规定：

    **官方原文**："Junie coding agent is not available to users in Mainland China due to regional restrictions"

    本形态也没有「关机续跑」的官方说法。
pitfalls:
  - 以为 Junie 是独立 IDE，它其实是 JetBrains IDE 的插件（另有 CLI 形态）
  - 以为 Junie 可用在 AI Enterprise 档，官方明确写该档暂不含 Junie
  - 以为 MCP 支持远程服务器，官方写明目前只支持 stdio 传输

tags: [编程, IDE, 多模型, 本地]
related: [filesystem]

sources:
  - label: JetBrains · Junie 官方产品页（「smart coding agent」定位与支持的 IDE 列表）
    url: https://www.jetbrains.com/junie/
    kind: docs

  - label: JetBrains · Junie 帮助文档（Modes / Guidelines / Action Allowlist / .aiignore / MCP / Models）
    url: https://www.jetbrains.com/help/junie/get-started-with-junie.html
    kind: docs

  - label: JetBrains · AI in IDEs 定价页（AI Free / Pro / Ultimate 与 credits 配额，2026-10-08 核）
    url: https://www.jetbrains.com/ai-ides/buy/
    kind: pricing

  - label: JetBrains · 许可与订阅（配额周期、地区限制、AI Enterprise 档不含 Junie）
    url: https://www.jetbrains.com/help/junie/licensing-and-subscriptions.html
    kind: docs

  - label: JetBrains · MCP 文档（仅 stdio，全局与项目级 mcp.json）
    url: https://www.jetbrains.com/help/junie/model-context-protocol-mcp.html
    kind: docs

  - label: JetBrains · Action Allowlist 与 Brave Mode（敏感动作审批）
    url: https://www.jetbrains.com/help/junie/user-approval.html
    kind: docs

  - label: JetBrains · 官方博客：Junie 离开 Beta（2026-06-17，Plan mode / 真调试器）
    url: https://blog.jetbrains.com/junie/2026/06/junie-coding-agent-out-of-beta/
    kind: changelog

  - label: JetBrains · 官方博客：Junie CLI 进入 Beta（2026-03-09，LLM-agnostic / BYOK）
    url: https://blog.jetbrains.com/junie/2026/03/junie-cli-the-llm-agnostic-coding-agent-is-now-in-beta/
    kind: changelog

  - label: JetBrains · Junie 官方博客列表（变更源）
    url: https://blog.jetbrains.com/junie/
    kind: changelog

link:
  url: https://www.jetbrains.com/junie/
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: unknown
  direct_note: junie.jetbrains.com 对 curl 直连与代理都返回 403（反爬拦截），本方法无法判定可达性。
  direct_note_en: junie.jetbrains.com returns 403 to curl both direct and proxied (anti-bot) — reachability cannot be judged by this method.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**Junie 是 JetBrains 官方的 AI coding agent。**
它的形态是插件加 CLI：插件装进 JetBrains IDE，CLI 跑在终端与 CI/CD 里。

三个招牌：先出计划再写代码、用真调试器排障、不锁模型。
Plan mode 产出结构化计划文档，确认后才实现。
排障时它接管调试会话、下断点，而不是加 `println`。
模型上支持 BYOK，也能接本地模型。

## 形态：插件 + CLI 两条腿

**先说结论：它是插件，不是独立编辑器。**

官方 Install 页的原话是：

> The Junie plugin is not bundled and not enabled in JetBrains IDEs by default.

宿主覆盖 JetBrains 全家桶与 Android Studio：

- CLion、GoLand、IntelliJ IDEA、PhpStorm
- PyCharm Pro、Rider、RubyMine、RustRover、WebStorm

**2026-03 起多了 Junie CLI 这条腿。**
官方博客称 Junie 由此从「IDE 原生 AI」走向「ecosystem-level AI」。
终端、任意 IDE、CI/CD 与 GitHub / GitLab 都能用。
ReSharper 2026.2 又把 Junie 带进 Visual Studio（Preview）。

## 关键设计：Plan mode 与真调试器

**Plan mode 把「计划」做成一等工件**（GA 版新增）。
产出是结构化文档，含产品需求、技术设计、交付阶段（可选测试策略）。
文档存在 `.junie/plans`，可以提交。
需求含糊时它先反问，确认后才实现。
官方给的用法建议很具体：计划用强模型，实现用便宜模型。

**Agentic debugging**：官方原话是 Junie「opens the debugger」，而不是加 `println`。
它能启动 / 接管调试会话，在项目码、库码乃至反编译的 `.class` 文件里下断点。
还能查看栈帧、线程状态，并求值表达式。

## 适合与不适合

适合三类人。
一是在用 JetBrains IDE、希望在同一环境里用 agent 的人。
二是看重「先出计划再写代码」与多模型 / BYOK 的团队。
三是需要在终端或 CI/CD 里复用同一个 agent 的人（Junie CLI）。

**不适合**中国大陆用户——官方许可页写明 Junie：

**官方原文**："not available to users in Mainland China due to regional restrictions"

**也不适合** AI Enterprise 档用户（官方写明该档暂不含 Junie）。
**也不适合**需要厂商托管云后台的人（本形态没有「关机续跑」的官方说法）。

## 核验说明

本条目 `confidence: partial`，原因如下。

**已核验**

- 支持的 IDE 宿主与最低版本
- Plan mode、真调试器与 `/demo` 等能力
- Action Allowlist 与 Brave Mode 的权限机制
- MCP 仅 stdio
- `.aiignore` 的边界
- AI Free / Pro / Ultimate 的 credits 配额
- 「AI Enterprise 档不含 Junie」

**未取到**

- 上下文窗口与压缩参数
- Junie Local 的完整适用范围

本轮核到的官方页：

> jetbrains.com/junie/、/help/junie/（get-started、install、modes、
> customize-guidelines、user-approval、aiignore、model-context-protocol-mcp、
> models、licensing-and-subscriptions、diffs-and-review）、/ai-ides/buy/、
> blog.jetbrains.com/junie/。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测两件事。

一是 Plan mode 的计划文档能否作为可提交工件复用。
二是 agentic debugging 在真实失败用例上，能否快过「加日志」。

## 未知项清单

- 美元口径的订阅价（官方页本次以人民币年付呈现，本站不折算）
- 上下文窗口大小与压缩策略的具体参数（官方未给数字）
- Junie Local 支持的机型与模型范围
- 各 JetBrains AI 档位对 Junie 的可用性勾选细节（官方未说明，本轮只取到许可页对 Enterprise 档的排除）

## 相关条目

- [GitHub Copilot](./copilot.md) — 同为可装进多家 IDE 的插件，可对照权限与 MCP（Copilot 支持远程 MCP，Junie 仅 stdio）
- [Claude Code](./claude-code.md) — 同为「IDE 扩展 + CLI」双形态，可对照两者的权限与上下文设计
- [Cursor](./cursor.md) — 对照点：Cursor 是 VS Code 衍生的独立 IDE，Junie 是 JetBrains IDE 的插件
