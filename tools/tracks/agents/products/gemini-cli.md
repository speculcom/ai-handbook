---
id: gemini-cli
track: cli
tasks: ["write-code"]
name: Gemini CLI
vendor: Google
homepage: https://github.com/google-gemini/gemini-cli
mark: G
accent: "#4285F4"

axes:
  model_access: >-
    **用 Google 自家的 Gemini 系列**，模型可以换。
    上下文上限明确标了 1M token。

    **README 首屏原文**：「Powerful Gemini 3 models: Access to improved reasoning
    and 1M token context window」

    **换模型**：命令行用 `gemini -m gemini-2.5-flash` 指定。
    用 Gemini API Key 登录时，官方描述是：

    **"Model selection**: Choose specific Gemini models"

    **三种接入方式**（README「Authentication Options」）：

    - **Google 账号 OAuth 登录** —— 免费层用这个，60 请求/分、1,000 请求/日，不用管 key
    - **Gemini API Key** —— 在 AI Studio 取 key，按量计费
    - **Vertex AI** —— 企业用，需要项目和区域

    **模型路由**：Plan Mode 可用 `general.plan.modelRouting`。
    它在 Pro（规划）与 Flash（实现）之间自动切换。
    另有实验性的 Local Model Routing（Gemma）。

    **CLI 侧可切换模型的具体清单与版本映射：官方未给出完整列表。**
    （已查仓库文档与 reference/configuration 两页。）
  runtime: >-
    **本地进程，在终端里跑，靠 npx 免安装启动。**

    官方把「免安装」写成仓库首屏的卖点，这是它降低上手门槛的地方。

    **README 原文**：「Using npx (no installation required)」
  local_files: >-
    **内置文件工具默认以工作区为根，边界明确。**

    **官方「File system tools」页原文**：All file system tools operate within a
    `rootDirectory` (the current working directory or workspace root) for security

    工具集：

    - `list_directory`
    - `read_file` —— 支持文本 / 图片 / 音频 / PDF
    - `write_file`
    - `replace`
    - `glob`
    - `grep_search`

    哪些要你点头才能动：

    - `write_file` 与 `replace` —— 官方标注 "Requires manual user approval"

    **扩目录**：启动加参数
    `gemini --include-directories ../lib,../docs`。
    会话内用 `/directory add <path>`（受限沙箱配置下禁用）。

    **忽略边界**：遵守 `.gitignore`，也支持同语法的 `.geminiignore`。

    **改动可回退**：批准改文件的工具时，CLI 会提交一次快照。
    它落在 shadow Git 仓库里，不干扰你自己的项目仓库。
    可用 `/restore` 回退。

    **checkpointing 页记的仓库位置**：`~/.gemini/history/<project_hash>`
    
    **原文**：「It does **not** interfere with your own project's Git repository」

    **语义索引（Code Customization / RAG）的算法与大仓库耗时官方未说明。**
    （已查 file-system 与 configuration 两页，只有 `general.logRagSnippets`
    这类调试开关。）
  background: >-
    **本地 CLI，不支持关机续跑。**

    **非交互 / headless 是脚本化，不是后台。** 它仍跑在你自己的机器上。

    **官方「Headless mode」页原文**："Headless mode provides a programmatic
    interface to Gemini CLI... without an interactive terminal UI"

    触发方式是：

    - 非 TTY 环境
    - `-p/--prompt`

    输出可选 JSON 或 stream-json，供 CI 与自动化调用。

    **执行环境归你**：官方未提供厂商托管的常驻执行环境。
    仓库里的 GitHub Action 也跑在你仓库的 CI runner 上。

    **中断可恢复**：checkpointing 与 `/chat save` / `/resume`
    可以保存和恢复会话。
    开关是 `general.checkpointing.enabled`。
    `general.sessionRetention` 默认保留 30 天。
    超期自动清理。

    **额度**就是官方用量口径里的每日请求上限。
    官方未另设云端额度。
  tools: >-
    **明确支持 MCP，而且是它标注的核心特性。**

    **README 原文**：「🔌 Extensible: MCP (Model Context Protocol) support for
    custom capabilities」

    MCP 另有独立文档页：`/docs/tools/mcp-server`。
    它举的例子是把 MCP 用来接多模态生成：

    「Use MCP servers to connect new capabilities, including media generation
    with Imagen, Veo or Lyria」

    这条例子值得单独记：MCP 在这里不只是接工具，
    还能接 Google 的多模态生成能力（图像 / 视频 / 音频）。
    这个用法在其它 CLI 工具的仓库首屏里没被强调。

    内置工具清单：

    - **Google Search grounding**（搜索接地）
    - **shell**

    另有**非交互模式做脚本自动化**。官方有独立章节
    **「Non-interactive mode for scripts」**。
  context: >-
    **1M token 上下文 + GEMINI.md 分层上下文 + 自动历史压缩，三项都有官方专页。**

    **上下文窗口**：README 首屏写 Gemini 3 models with 1M token context window。

    **上下文层级**（官方「GEMINI.md」页）：

    - ① 全局 `~/.gemini/GEMINI.md`
    - ② 工作区目录及其父目录的 `GEMINI.md`
    - ③ JIT —— 工具访问某目录时，扫描它和祖先目录的 `GEMINI.md`（至 trusted root）

    文件名可由 `context.fileName` 改（如 AGENTS.md / CONTEXT.md）。

    **GEMINI.md 页**：支持用 `@file.md` 语法导入。
    `/memory show` 与 `/memory reload` 可查看与重载。

    **压缩策略已核到**（官方 core 页）：

    "When a conversation approaches the token limit... the core automatically
    compresses the conversation history"

    阈值由 `model.compressionThreshold` 控制。
    默认值是 0.5。
    也可以 `/compress` 手动把整个上下文替换为摘要。

    **跨会话记忆**：官方 Memory 工具把持久事实写进 `GEMINI.md`（项目 / 全局两级），
    随分层上下文注入后续会话。token caching 仅 API key / Vertex 用户可用。
  permissions: >-
    **沙箱、审批、信任目录三层官方都有专页，是本分区里权限面写得最细的一条。**

    **沙箱**：官方「Sandboxing」页给了这些方式。

    - macOS Seatbelt —— 默认档 `permissive-open`：默认拒绝、写限项目目录，但允许读与网络
    - Docker / Podman
    - Windows 原生
    - gVisor / runsc
    - LXC / LXD（实验）

    启用方式：

    - `-s/--sandbox`
    - `GEMINI_SANDBOX`
    - `tools.sandbox`

    工具级另有 `security.toolSandboxing`。

    **沙箱扩张**：命令因权限受限失败时，会弹
    **"Sandbox Expansion Request"**。逐次批准可临时放宽。
    越界目录可用 `SANDBOX_MOUNTS` 挂载。

    **审批模式**（configuration 页）：`general.defaultApprovalMode`
    有三个值：

    - `default` —— 逐次询问
    - `auto_edit`
    - `plan` —— 只读

    `--yolo`（全部自动批准）只能在命令行开。

    **策略引擎**（「Policy engine」页）：`~/.gemini/policies/*.toml`
    用规则定义 `allow` / `deny` / `ask_user`。
    匹配条件可按工具名、参数、审批模式与交互 / 非交互环境。
    规则分 Default / Extension / User / Admin 四级。
    Admin 可强制覆盖。

    **Trusted Folders**：**默认关闭**。
    开关是 `security.folderTrust.enabled`。
    未信任时进 safe mode —— 忽略工作区 `.gemini/settings.json` 与 `.env`、
    禁用工具自动接受、不连 MCP、不加载自定义命令。
    CI 想绕过的话，有两条路：

    - `--skip-trust`
    - `GEMINI_CLI_TRUST_WORKSPACE=true`

    configuration 页另有环境变量脱敏一节。
  fit: >-
    适合三类场景：

    - 想免安装快速试用（npx，不留安装痕迹）
    - 需要 MCP 扩展，尤其是把 Gemini 的多模态生成能力（Imagen / Veo / Lyria）接进 Agent 工作流
    - 需要脚本化非交互运行，比如接进 CI

    另外三类人也合适：

    - 需要大上下文窗口的人 —— 1M token，是本分区里明确写出上限的少数
    - 需要「改动可回退」保证的人 —— shadow Git 检查点加 `/restore`
    - 需要项目级长期指令文件的人 —— GEMINI.md

    **不适合**把额度当成无限用的场景。
    免费层有明确日额度，数字是 6,000 代码请求 + 240 对话/日。
    而且 CLI 与代理模式额度合并计算。
pitfalls:
  - 以为开源就无限用 —— 免费层有明确日额度（6,000 代码请求 + 240 对话/日）
  - 以为 npx 形态会污染本地环境，实际是免安装的临时运行
  - 忽略 MCP 能力，README 明确把它列为可扩展特性

tags: [编程, 终端, 本地, 开源]
related: [google-adk]

sources:
  - label: Google · Gemini CLI 仓库 README
    url: https://github.com/google-gemini/gemini-cli
    kind: repo

  - label: Google · Gemini CLI Releases
    url: https://github.com/google-gemini/gemini-cli/releases
    kind: changelog

  - label: Google · Gemini CLI 官方文档
    url: https://google-gemini.github.io/gemini-cli/
    kind: docs

  - label: 官方文档 · Sandboxing（-s/GEMINI_SANDBOX、Seatbelt 默认档 permissive-open、
      Docker/Podman/Windows/gVisor/LXC、toolSandboxing、Sandbox Expansion）
    url: https://www.geminicli.com/docs/cli/sandbox
    kind: docs

  - label: 官方文档 · Trusted Folders（默认关闭、safe mode 禁项、--skip-trust、
      GEMINI_CLI_TRUST_WORKSPACE）
    url: https://www.geminicli.com/docs/cli/trusted-folders
    kind: docs

  - label: 官方文档 · Policy Engine（~/.gemini/policies/*.toml、
      allow/deny/ask_user 层级）
    url: https://www.geminicli.com/docs/reference/policy-engine
    kind: docs

  - label: 官方文档 · GEMINI.md（三层上下文层级、@file.md 导入、context.fileName、/memory）
    url: https://www.geminicli.com/docs/cli/gemini-md
    kind: docs

  - label: 官方文档 · Core（Chat history compression：自动压缩、model.compressionThreshold）
    url: https://www.geminicli.com/docs/core
    kind: docs

  - label: 官方文档 · Headless mode（-p/--prompt、JSON / stream-json、退出码）
    url: https://www.geminicli.com/docs/cli/headless
    kind: docs

  - label: 官方文档 · Checkpointing（改文件工具批准时 shadow Git 快照、/restore、默认关闭）
    url: https://www.geminicli.com/docs/cli/checkpointing
    kind: docs

  - label: 官方文档 · File system tools（工具集、rootDirectory 边界、write/replace 需批准）
    url: https://www.geminicli.com/docs/tools/file-system
    kind: docs

  - label: 官方文档 · Memory files（持久事实写入 GEMINI.md 分项目/全局两级）
    url: https://www.geminicli.com/docs/tools/memory
    kind: docs

  - label: 官方文档 · Ignoring files（.geminiignore）
    url: https://www.geminicli.com/docs/cli/gemini-ignore
    kind: docs

  - label: 官方文档 · Token caching（仅 API key / Vertex 用户可用）
    url: https://www.geminicli.com/docs/cli/token-caching
    kind: docs

  - label: 官方文档 · Configuration（approval mode、sandbox、checkpointing、
      sessionRetention、context.fileName、RAG 日志开关）
    url: https://www.geminicli.com/docs/reference/configuration
    kind: docs

  - label: Google · Gemini CLI MCP Server 文档
    url: https://www.geminicli.com/docs/tools/mcp-server
    kind: docs

link:
  url: https://github.com/google-gemini/gemini-cli
  kind: official

last_verified: 2026-09-29
last_updated: 2026-09-29
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官网仓库在 GitHub，大陆直连波动（同日实测 200/000 混合）；npm / PyPI 安装源实测稳定可达。
  direct_note_en: Hosted on GitHub — direct reachability from mainland fluctuates (200/000 mixed on the same day); npm / PyPI install routes measured stable.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**Google 官方的开源终端 agent**，npx 免安装启动。
明确支持 MCP，另有非交互脚本模式。

## 变更记录说明

| 版本 | 日期 |
|---|---|
| `v0.63.0-nightly.20260929.gfe6350238` | 2026-09-29 |

**注意版本形态**：它发布的是 `nightly` 标签，版本号里带 commit hash。
说明它走 nightly 滚动发布。
引用版本号时要完整写，不要简写成 `v0.63.0`。
nightly 的补丁内容每天不同。

## 三个明确的工程化能力

### ① npx 免安装

> README 原文：「Using npx (no installation required)」

这是降低使用门槛的设计，适合快速试用或临时使用，不会在本地留下安装痕迹。

### ② MCP 支持是官方标注的核心特性

**MCP 被它标成核心特性**，标记就是那个插头图标：

> 「🔌 Extensible: MCP (Model Context Protocol) support for custom capabilities」

**它还用 MCP 接多模态生成**：

> 「Use MCP servers to connect new capabilities, including media generation with Imagen, Veo or Lyria」

**这条例子值得单独记**：MCP 在这里不只是接工具，
还能接 Google 的多模态生成能力（图像 / 视频 / 音频）。
这是其它 CLI 工具没在仓库首屏里强调的用法。

官方文档另有独立页：`/docs/tools/mcp-server`

### ③ 非交互模式

README 有独立章节 **「Non-interactive mode for scripts」**，定位是 workflow automation。

**这是三个 CLI 工具里唯一在仓库首屏就明确标出非交互能力的** —— CI 集成友好度的信号。

## 权限定级说明

`confidence: partial` 的原因：

- ✅ **已核验**：仓库、许可（Apache-2.0）、版本形态与日期、star 数（107,180）、
  MCP 支持及文档页、非交互模式、npx 安装方式、MCP 接入多模态生成的官方举例

- ✅ **A6.2 本轮补**：额度政策（Code Assist individuals 6,000/240 等）、
  三种接入方式与 `-m` 换模型、GEMINI.md 三层上下文与自动历史压缩、
  沙箱 / 审批 / 信任目录 / 策略引擎权限机制

- ❌ **未核验**：CLI 侧可切换模型的完整清单与版本映射（官方未列全）、
  语义索引（RAG）算法与大仓库耗时（官方未说明）

## 适合与不适合

它适合这些场景：

- 需要 npx 免安装快速试用
- 需要 MCP 扩展
- 需要脚本化非交互运行（CI）
- 想把 Gemini 多模态生成（Imagen / Veo / Lyria）接进工作流

也适合这些人：

- 需要大上下文窗口的人 —— 1M token，本分区里明确写出上限的少数
- 需要「改动可回退」保证的人 —— shadow Git 检查点加 `/restore`
- 需要项目级长期指令文件的人 —— GEMINI.md

**不适合**把额度当成无限用的场景：
免费层有明确日额度（6,000 代码请求 + 240 对话）。
而且 CLI 与代理模式额度合并计算。

## 值得单独记的两处

### ① 检查点用 shadow Git，不污染你的仓库

批准一个改文件的工具（`write_file` / `replace`）时，CLI 会提交一次快照。

- 快照仓库在 `~/.gemini/history/<project_hash>`
- 它是**独立的 Git 仓库**，不会动你的项目仓库
- 要回退就 `/restore`

出处是 checkpointing 那份文档：

> 原文：「It does **not** interfere with your own project's Git repository」

这是本分区里把「安全网」做进机制的少数 ——
多数工具靠「自动提交到你的仓库」，或者「让你自己 undo」。

### ② GEMINI.md 是项目级长期指令

它相当于把「这个项目怎么做事」写进一个文件，
多形态（CLI / VS Code / JetBrains）都会读它。
这与 Cline 的 `.clinerules`、Claude Code 的 CLAUDE.md 是同一类机制，**值得横向对照**。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点放在三处（官方明确宣传、但还没验证过的能力）：

1. **npx 免安装的实际启动速度**
2. **非交互模式在 CI（无 TTY）环境下是否真的可用**
3. **shadow Git 检查点在 Windows 上的行为** ——
   文档说路径是 `~/.gemini/history/`，Windows 上是否有兼容问题待验

## 未知项清单

- 具体可用模型清单与版本映射 —— 官方 README 未列全（已查 configuration 页）
- 语义索引（RAG）算法与大仓库表现 —— 官方未说明

## 相关条目

- [Codex CLI](./codex-cli.md) — 同类 OpenAI 官方工具
- [Crush](./crush.md) — 同类工具，MCP 传输方式标注更细
