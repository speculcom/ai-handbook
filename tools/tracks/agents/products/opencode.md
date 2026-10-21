---
id: opencode
track: cli
tasks: ["write-code"]
name: OpenCode
vendor: OpenCode
homepage: https://github.com/sst/opencode
mark: OC
accent: "#E5705A"

axes:
  model_access: >-
    多 provider 接入的编程 harness。官方 `models` 与 `providers` 页原文：
    OpenCode 用 AI SDK 与 Models.dev，**支持 75+ LLM 提供商，
    也支持运行本地模型**。目录含：

    - 302.AI
    - Amazon Bedrock
    - Anthropic
    - Azure OpenAI
    - DeepSeek
    - Google Vertex AI
    - Groq
    - Hugging Face
    - llama.cpp
    - LM Studio
    - Ollama
    - OpenAI
    - OpenRouter
    - xAI
    - Z.AI
    - ZenMux 等。

    凭据经 `/connect` 存入 `~/.local/share/opencode/auth.json`；

    可用 `enabled_providers` / `disabled_providers` 白黑名单，
    也能自定义 provider（`npm` + `baseURL`，含 OpenAI 兼容）；
    另有官方精选清单 OpenCode Zen。**本地模型可接**——

    官方点名 llama.cpp、LM Studio、Ollama、Atomic Chat。

    注意：用 Claude Pro/Max 订阅接入时，**这不是 Anthropic 官方支持的用法**。

  runtime: >-
    本地进程，在终端运行。提供多平台安装方式（macOS Homebrew / Windows Scoop 等）。
    生命周期绑定终端会话。

  local_files: >-
    面向真实代码仓库的编程能力。`read`/`edit`/`write`/`grep`/`glob`
    直接读写工作区。`grep`/`glob` 底层用 ripgrep，**默认遵循 `.gitignore`**。

    **访问范围默认限定在启动时的工作目录**——越界路径须在 `permission`
    里用 `external_directory` 显式放行（如 `~/projects/personal/**`）。

    `read` 默认 allow，但 **`.env` / `.env.*` 默认 deny**（`.env.example` allow）。
    `@` 键可模糊搜索项目文件；文件变动有 `watcher`（可配 `ignore`）。

    符号能力来自 **LSP 工具（实验性）**：需 `OPENCODE_EXPERIMENTAL_LSP_TOOL=true`
    并自配 LSP 服务器，支持 goToDefinition / findReferences / hover 等。

    **官方未见代码库向量化索引的描述**（已查 tools / config / permissions 页）。

  background: >-
    终端形态，本地进程，生命周期绑定会话。

    官方另有 `opencode serve`（无头 HTTP 服务器）。
    还有 `opencode web` 与桌面应用。**它们都跑在你自己的机器上**。
    它们为客户提供会话 API，含 `prompt_async` 异步发送。执行环境归你自己，
    不是厂商托管云。

    **官方未见「客户端关闭后仍继续 / 关机续跑」的云端后台能力**
    （已查 server 页与 docs 概览）。

  tools: >-
    **内置工具官方逐项列出**：

    - bash
    - edit
    - write
    - read
    - grep
    - glob
    - lsp（实验性）
    - patch
    - skill
    - todowrite
    - webfetch
    - websearch（Exa，需 OpenCode 提供商或 `OPENCODE_ENABLE_EXA`）
    - question

    另有 `task` 派发子代理。

    内置代理含：

    - build
    - plan
    - general
    - explore
    - scout
    - compaction
    - title
    - summary

    **MCP 接入方式已核到**：
    本地 `type:"local"` 与远程 `type:"remote"` 两类，支持 OAuth
    动态客户端注册（RFC 7591）与 `opencode mcp auth` 等命令；
    还支持自定义工具与插件（hooks）。

  context: >-
    **ACP（Agent Client Protocol）载入能力是其差异化设计**——
    在恢复与分叉时保留模型、effort 与模式边界。

    会话机制已核到：`/session` API 支持创建、**fork（在某条消息处分叉）**、
    revert/unrevert 与 summarize。TUI 有 `/undo`、`/redo`、`/share`。

    **压缩策略官方给了配置**——`compaction` 项：

    - `auto`（默认 true，上下文满时自动压缩会话）
    - `prune`（删旧工具输出省 token，默认 false）
    - `reserved`（压缩缓冲）

    另有 compaction / title / summary 三个内置代理。

  permissions: >-
    **权限策略已核到**：`permission` 配置决定每个操作是自动运行、
    提示审批还是阻止，三档 `"allow"` / `"ask"` / `"deny"`。

    可按工具细粒度配置，支持通配符与对象语法（如 bash 的
    `git *` allow、`rm *` deny，**最后匹配的规则优先**）。

    可配权限键：

    - read
    - edit（涵盖 edit、write、patch）
    - glob
    - grep
    - bash
    - task
    - skill
    - lsp
    - webfetch
    - websearch
    - external_directory
    - doom_loop

    **默认值宽松**：多数 allow，
    `doom_loop` 与 `external_directory` 为 ask；`read` 为 allow 但
    `.env` / `.env.*` 默认 deny。

    官方 config 页亦称「默认允许所有操作，无需明确批准」。

    审批 UI 给 once / always / reject。它可对每个代理单独覆盖。

    v1.1.1 起旧版 `tools` 布尔配置并入 `permission`。

  fit: >-
    需要多 provider 可切换、且重视命令执行前确认的用户。
    ACP 生态参与者。

pitfalls:
  - 把 provider 支持列表当成有额度，连接器可用不等于有模型订阅权限
  - 以为默认全权执行命令，README 提到 bash 命令前会询问
  - 以为可以用某个 provider 就免费，模型费用仍需自付

tags: [编程, 终端, 本地, 开源]
related: [filesystem]

sources:
  - label: OpenCode · 仓库 README
    url: https://github.com/sst/opencode
    kind: repo

  - label: OpenCode · Releases（v1.18.33 @ 2026-09-28）
    url: https://github.com/sst/opencode/releases
    kind: changelog

  - label: OpenCode · 官方站 Changelog
    url: https://opencode.ai/changelog
    kind: changelog

  - label: OpenCode · 官方文档
    url: https://opencode.ai/docs
    kind: docs

  - label: OpenCode · 官方文档 · 提供商（75+ provider、目录、自定义 provider、凭据存储）
    url: https://opencode.ai/docs/providers
    kind: docs

  - label: OpenCode · 官方文档 · 模型（75+ provider、本地模型、默认模型与变体）
    url: https://opencode.ai/docs/models
    kind: docs

  - label: OpenCode · 官方文档 · 权限（allow/ask/deny、细粒度规则、external_directory、默认值）
    url: https://opencode.ai/docs/permissions
    kind: docs

  - label: OpenCode · 官方文档 · 工具（内置工具清单、子代理、MCP、自定义工具）
    url: https://opencode.ai/docs/tools
    kind: docs

  - label: OpenCode · 官方文档 · MCP 服务器（本地/远程、OAuth、管理）
    url: https://opencode.ai/docs/mcp-servers
    kind: docs

  - label: OpenCode · 官方文档 · 配置（compaction、watcher、permission、server）
    url: https://opencode.ai/docs/config
    kind: docs

  - label: OpenCode · 官方文档 · 服务器（opencode serve、会话 API、fork/summarize）
    url: https://opencode.ai/docs/server
    kind: docs

link:
  url: https://opencode.ai
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
  direct_note: 官网仓库在 GitHub，大陆直连波动（同日实测 200/000 混合）；npm / PyPI 安装源实测稳定可达。
  direct_note_en: Hosted on GitHub — direct reachability from mainland fluctuates (200/000 mixed on the same day); npm / PyPI install routes measured stable.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

MIT 许可的多 provider 编程 harness。**它运行 bash 命令前会询问权限**，并支持 ACP 载入。

## 变更记录说明

| 版本 | 日期 |
|---|---|
| `v1.18.33` | 2026-09-28 |

**更新频率很高**（release 与 changelog 都在 09-28）。

## 权限设计：执行前询问

这是本条目最值得注意的一条，来自 README：

```
Asks permission before running bash commands
```

**多数终端 agent 默认自动执行命令，OpenCode 默认会问。**

这降低了「模型误删文件 / 误跑危险命令」的风险，
代价是打断流程。README 另有 **YOLO** 相关内容，
推测是可选的免询问模式，**但具体开关方式本次未核验，记为未知**。

## 子代理能力

```
Also included is a general subagent for complex searches and multistep tasks.
```

内置一个**通用子代理**，用于复杂搜索与多步任务。
这让它能处理「先调研再动手」这类需要多轮的任务。

**子代理的具体调度方式与 token 开销本次未核验。**

## ACP：Agent Client Protocol

这是它的架构亮点：

```
ACP 载入、恢复、分叉时保留模型、effort 和模式边界
```

**「分叉时保留模型与 effort」这个细节值得注意**——
很多工具分叉后会丢失设置，导致每次都要重设。

## 稳定性修复是重要信号

参考 AgentClash 对 OpenCode v1.18.33 的核验记录（09-28），
该版本包含四项修复：

1. Cloudflare 超时控制
2. MCP 浏览器启动失败反馈
3. **调试凭据脱敏**
4. Gemini 推理参数修正

**四项里两项与权限/可靠性相关**（凭据脱敏、MCP 启动失败反馈）。
这说明项目的可靠性投入在权限与可诊断性上，
但也说明**这些方面曾经出过问题**。

## 权限定级说明

`confidence: partial` 的原因：

- ✅ 已核验：仓库、许可（MIT）、最新版本与日期、star 数（210,642，本分区最高）、权限策略（allow/ask/deny 细粒度）、ACP、安装方式；**A6.2 本轮补**：75+ provider 与本地模型、内置工具清单与 MCP 接入方式、`compaction` 上下文策略
- ❌ 未核验：YOLO 模式的具体开关方式、子代理的调度细节与 token 开销

## 适合与不适合

需要多 provider 可切换、重视 bash 命令执行前确认的用户。
ACP 生态参与者。

**不适合**需要完全免打扰的自动化场景——
执行命令前询问会打断流程，需确认 YOLO 模式的具体开关方式。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：这个工具的实测重点应放在
**「命令执行前的询问」这个设计在长任务中的实际打断成本**——
这是它与全权执行类工具的核心工作流差异。

## 未知项清单

- YOLO 模式的具体开关与风险
- 子代理的调度方式与 token 开销
- 大仓库在「无向量化索引（靠 ripgrep / LSP）」路线下的实际表现

## 相关条目

- [Aider](./aider-cli.md) — 同类工具但已放缓维护
- [Codex CLI](./codex-cli.md) — 同类工具，架构侧重点不同
