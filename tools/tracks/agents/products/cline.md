---
id: cline
track: ide
tasks: ["write-code"]
name: Cline
vendor: Cline Bot
homepage: https://github.com/cline/cline
mark: C
accent: "#3EA3FF"

axes:
  model_access: >-
    **provider 由你自选。官方给出 30+ 家清单，以自带 API key（BYOK）为主。**

    官方 Model Selection Guide 的 provider 表列出：

    - **Cline** —— 免 API key，登录即用
    - **OpenRouter** / **Anthropic** / **OpenAI**
    - **OpenAI Codex** —— 直接用 ChatGPT 订阅，无需 API key
    - **Google Gemini** / **DeepSeek** / **Alibaba Qwen** / **Moonshot** / **Cerebras**
    - **AWS Bedrock**
    - **Ollama** —— 本地模型

    官方另有「all 30+ supported providers」页，还含 xAI Grok、Mistral、Groq、
    Together、Hugging Face、Baseten、SambaNova、Nebius 等。

    两种接入方式：

    - CLI 命令 —— `cline auth --provider anthropic --apikey sk-... --modelid ...`
    - 官方 SDK 支持 OpenAI-compatible 端点 ——
      `providerId: "openai-compatible"` + `baseUrl` + `apiKey`

    ⚠ **换 provider 之后的 tool calling 与 structured output 质量，官方没给对比。**
  runtime: >-
    **这是本站里唯一「三种形态全覆盖」的对象。**

    | 形态 | 怎么用 |
    |---|---|
    | **CLI** | `npm i -g cline`；支持交互式与完全 headless 两种模式，headless 用于 CI/CD 与脚本；可用 `--workspace /path/to/repo` 指定目录 |
    | **Desktop App** | macOS 与 Windows 原生应用；可在任意文件夹运行 agent session；支持定时任务 |
    | **VS Code 扩展** | 另有 JetBrains 插件 |

    `.clinerules` 会被 **CLI / VS Code 扩展 / JetBrains 插件三方共同读取**。
    三套形态共享同一开源核心。
  local_files: >-
    **两个特点：跨项目协调改动，以及可回滚的检查点。**

    README 的**「Edits Code Across Your Project」**说的是：读取项目结构、理解文件间关系，
    然后在代码库里做协调改动。

    **改动过程中它会盯着 linter 与编译器的报错**，主动修掉缺失的 import、
    类型不匹配、语法错误 —— 那些「用户看不到就会出问题」的东西。

    - 在 VS Code 与 JetBrains 里，**每次编辑都以 diff 形式呈现**，可审查、可修改、可回滚
    - 所有改动都有 checkpoint 记录，可以整体撤销
    - 官方 Checkpoints 页说明它用 **shadow Git repository** 跟踪改动，
      **与你的主 Git 工作流互不干扰**，每次工具调用后建一个检查点

    **读取范围分两档**：默认「Read project files」（工作区内）；
    「Read all files」（工作区外）需要先打开基础开关才生效。
    项目级忽略用 `.clineignore` 控制（官方还给了用 hook 强制的做法）。

    ⚠ **它没有「全量语义索引」这个环节。** 内置 `search` 工具是
    「Ripgrep-powered codebase search」；官方对大仓库的建议是
    「用搜索代替大量读文件」，并把任务拆小。
    （已查 Tools 页与 Context Window Guide。）

    **官方对大仓库的建议**：Use search instead of reading many files
  background: >-
    **长进程与定时任务都支持。**

    命令在终端直接执行，输出实时可见 —— 装包、跑构建、跑测试、部署、管数据库。
    对 dev server 这类长进程，**Cline 会在后台继续工作并对新输出做出反应**：
    编译错误、测试失败、服务崩溃都在发生时被捕捉。

    **Desktop App 形态另有定时任务（schedule routines）**：

    - 可用 cron 调度做周期性自动化
    - 例子：每日 PR 摘要、每周依赖检查、代码库健康报告
    - **schedule 在重启后仍保留，且独立于任何终端会话运行**

    CLI 的 headless 模式则面向 CI/CD。
  tools: >-
    **内置工具清单已核到**（官方 Tools 参考，ClineCore 运行时）：

    - `bash` —— 执行命令
    - `editor` —— 查看/编辑文件
    - `read_files` —— 批量读
    - `apply_patch` —— 打 unified diff
    - `search` —— ripgrep 代码搜索
    - `fetch_web` —— HTTP + HTML 转 markdown
    - `ask_question` —— 问用户

    **MCP 是它的核心扩展面。** 官方有 **MCP Marketplace**，
    配置文件是 `.cline/mcp.json`：

    - 工具经 `use_mcp_tool` 调用，资源经 `access_mcp_resource` 访问
    - 传输支持 **stdio 与 HTTP**
    - 可在 `.clinerules` 里用「MCP Rules」按触发词分组调度

    其它扩展机制：**Hooks**（PreToolUse / PostToolUse）· Skills · Workflows ·
    plugins（可注册自定义工具，当前限 SDK / CLI / Kanban）。

    **官方对 MCP Marketplace 的说法**：one-click installation experience for hundreds of MCP servers
  context: >-
    **项目级规则文件是 `.clinerules`。**

    它用来定义项目专属规则：编码标准、架构约定、部署流程、测试要求。
    **规则会被 CLI、VS Code 扩展与 JetBrains 插件自动读取。**
    另可用 skills 让模型按需加载特定规则。

    Desktop 形态提到**「run agent sessions in any folder」**，也就是有跨文件夹的会话管理。

    **上下文机制已核到**：接近上限时 **Auto Compact 自动摘要**。
    窗口大小**由所选模型决定** —— 官方列的 Claude Sonnet 4.5 为 1M、
    GPT-5 为 400K、Gemini 2.5 Pro 为 1M+。

    **跨会话记忆靠 Memory Bank**：一套结构化 markdown 文件
    （`projectbrief.md` / `productContext.md` / `activeContext.md` / `progress.md` 等），
    放进仓库、以 `.clinerules` 指令驱动读写。

    官方另有 Focus Chain（todo 注入）与 `/newtask`、`/smol` 做上下文交接。

    **官方对 Auto Compact 的原文**：Creates a comprehensive summary...
    Replaces the conversation history with the summary
  permissions: >-
    **两级审批设计，是本站里最细的一套。**

    **第一级是 Plan / Act 双模式。** Plan 模式下 Cline 探索代码库、提出澄清问题、
    列出策略；对齐之后切到 Act 模式执行计划。

    **第二级是「每次文件编辑与终端命令都需要批准」**，也可以切到 auto-approve
    让它自主运行。VS Code 扩展形态的表述是**「human-in-the-loop approval」**。

    ⚠ **但 CLI / headless 的默认行为是相反的。这点必须知道**
    （已核官方 CLI Overview 与 CLI Reference）：

    - `--auto-approve <boolean>` **默认 true** —— 即默认放行工具
    - `--auto-approve false` 时，每个工具调用前都需批准
    - `--yolo` 跳过全部审批
    - **ACP（编辑器集成）模式默认相反**，为 false

    另：**CLI 没有 shell 命令的允许/拒绝清单**。官方建议用 PreToolUse hook 拦截。

    **CLI 提示语原文**：Default to start in act mode with auto-approve enabled
    **VS Code 扩展表述**：use tools with human-in-the-loop approval
  fit: >-
    **适合四类人：**

    - 需要同一工具覆盖**编辑器、终端、桌面**三种工作形态
    - 需要**模型自选**（不想绑定单一厂商）
    - 需要 **CI/CD 集成**（CLI headless）
    - 需要「改动可审查、可回滚」的保证 —— diff 呈现 + checkpoint 整体撤销

pitfalls:
  - 以为是单一形态的 VS Code 插件，实际有 CLI / Desktop / 扩展三套
  - 忽略 headless 模式，CLI 形态本身就支持 CI/CD 集成
  - 以为审批机制一致，扩展形态是 human-in-the-loop，CLI 默认却是 auto-approve 全程放行
  - 以为自动提交是设计意图，实际默认每次编辑都要批准，可开 auto-approve 自主运行

tags: [编程, 终端, 本地, 开源]
related: [filesystem]

sources:
  - label: Cline · 仓库 README（三形态说明）
    url: https://github.com/cline/cline
    kind: repo

  - label: Cline · Releases（v4.1.21 / desktop-v0.0.37）
    url: https://github.com/cline/cline/releases
    kind: changelog

  - label: Cline · 官方文档
    url: https://docs.cline.bot
    kind: docs

  - label: Cline · CLI 子项目 README
    url: https://github.com/cline/cline/blob/main/apps/cli/README.md
    kind: docs

  - label: Cline · Model Selection Guide（30+ provider 清单、BYOK / Ollama 本地模型）
    url: https://docs.cline.bot/core-features/model-selection-guide
    kind: docs

  - label: Cline · Auto Approve & YOLO（分类审批、工作区内外、命令 safe / 需批准）
    url: https://docs.cline.bot/features/auto-approve
    kind: docs

  - label: Cline · Checkpoints（shadow Git 仓库、按步快照、三类恢复）
    url: https://docs.cline.bot/core-workflows/checkpoints
    kind: docs

  - label: Cline · Auto Compact（接近上限自动摘要，替代旧截断）
    url: https://docs.cline.bot/features/auto-compact
    kind: docs

  - label: Cline · Memory Bank（跨会话结构化 markdown 记忆文件）
    url: https://docs.cline.bot/best-practices/memory-bank
    kind: docs

  - label: Cline · Tools 参考（内置工具清单与工具名）
    url: https://docs.cline.bot/tools-reference/all-cline-tools
    kind: docs

  - label: Cline · MCP Marketplace（一键安装数百 MCP server）
    url: https://docs.cline.bot/mcp/mcp-marketplace
    kind: docs

  - label: Cline · CLI Overview（headless 触发、--auto-approve 默认 true）
    url: https://docs.cline.bot/usage/cli-overview
    kind: docs

  - label: Cline · CLI Reference（--auto-approve 默认 true、ACP 模式默认 false）
    url: https://docs.cline.bot/cli/cli-reference
    kind: docs

link:
  url: https://docs.cline.bot
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

**本分区唯一三形态全覆盖的对象**。CLI、Desktop App、VS Code 扩展共享同一开源核心。模型也是自选的。

## 三种形态（README 明确列出）

| 形态 | 关键能力 |
|---|---|
| **CLI** | `npm i -g cline`；交互式对话或**完全 headless**，用于 CI/CD 与脚本 |
| **Desktop App** | macOS 与 Windows 原生应用；**在任意文件夹运行 agent session**；**定时任务**；管理 models / plugins / **MCP servers** |
| **VS Code 扩展** | 创建文件、执行命令、浏览网页、使用工具，**human-in-the-loop approval** |

**这个三形态覆盖在本分区里是独一份**——
其他对象要么是 IDE + 扩展（Copilot），要么是编辑器单一形态（Zed）。Aider 则是 CLI 为主。

**对用户意味着**：可以在编辑器里用、可以在终端里跑、可以在桌面端定时跑，
同一套核心，同一份配置习惯。

## 变更记录：两条 release 线

| 版本 | 日期 |
|---|---|
| `desktop-v0.0.37` | 2026-09-26 |
| `desktop-v0.0.36` | 2026-09-25 |
| `v4.1.21` | 2026-09-24 |

**注意版本号是分开的两条线**：

- `v4.x` 是主版本（扩展与 CLI）
- `desktop-v0.0.x` 是桌面端，**还在 0.0.x**

**这意味着桌面端仍早期**，稳定性预期要与主版本分开。

## 权限设计：明确的人工审批

VS Code 扩展形态的 README 原文：

```
use tools with human-in-the-loop approval
```

**这是本分区里少见的明确表述**——
多数工具不会在 README 首屏就说明工具执行需要人工批准。

**CLI / headless 的审批口径已核到**（官方 CLI Overview 与 CLI Reference）：
提示语写 **"Default to start in act mode with auto-approve enabled"**，
`--auto-approve <boolean>` **默认 true**——headless 运行默认放行工具，
`--auto-approve false` 才改为每次工具调用前需批准。`--yolo` 跳过全部审批。
ACP（编辑器集成）模式默认相反，为 false。
另：CLI 无 shell 命令允许/拒绝清单。官方建议用 PreToolUse hook 拦截。

**所以「三形态审批一致」并不成立**：扩展形态默认要人工批准，
CLI 默认自主放行——跨形态使用时必须按 `--auto-approve` 显式对齐。

## 适合与不适合

需要同一工具覆盖编辑器、终端、桌面三种工作形态的用户。
需要模型自选（不绑定单一厂商）的人。
需要 CI/CD 集成（CLI headless）的人。
需要「改动可审查、可回滚」保证的人。每次编辑以 diff 呈现，checkpoint 可整体撤销。
需要周期性自动化的人（cron 调度，重启后仍生效）。

**不适合**要求「审批默认最严」的场景——
CLI / headless 默认 `--auto-approve true` 全程放行，
要收紧得显式传 `--auto-approve false`（或用 PreToolUse hook 拦命令）。

## 值得单独记的两处设计

### ① Plan / Act 双模式

Plan 模式下它只探索代码库、提问、列策略，**不执行**；
对齐后切到 Act 才动手。这是「先想清楚再改」的机制化实现。

### ② 监控 linter 与编译器错误

README 原文：

> It monitors linter and compiler errors as it works, fixing issues like
> missing imports, type mismatches, and syntax errors before you even see them.

**它会主动修「类型不匹配」「缺失 import」这类问题** ——
这恰好是本仓库实测任务集里最难判定的部分，值得单独验证。

## 权限定级说明

`confidence: partial`：

- ✅ **已核验（仓库与产品面）**：仓库、许可（Apache-2.0）、star 数（69,514）
- ✅ **已核验（能力面）**：三形态能力与各自的运行特征、两条 release 线及日期、Plan/Act 双模式
- ✅ **已核验（权限与工具面）**：每次编辑需批准 + auto-approve、diff 呈现与 checkpoint 回滚（shadow Git）、linter/编译器错误监控、`.clinerules` 项目规则、Desktop 的 cron 定时任务（重启后仍生效）、MCP 管理与 MCP Marketplace、**30+ provider 清单与 BYOK / 本地模型**、**内置工具清单**、**Auto Compact 与 Memory Bank**、**CLI / headless 审批默认值**
- ❌ 未核验：换 provider 后的 tool calling / structured output 质量对齐、Desktop 0.0.x 的稳定性预期

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：这个工具的实测重点应是**跨形态的一致性**——
同一个任务在三套形态下表现是否一致，审批行为是否一致。

## 未知项清单

- 换 provider 后的 tool calling / structured output 质量对齐（官方未给对比）
- Desktop 形态 0.0.x 的稳定性预期
- 大仓库在「无全量索引 + ripgrep 搜索」路线下的实际检索质量

> 原「provider 清单 / 工具清单 / 上下文窗口 / 跨会话记忆 / CLI headless 审批」五项已由官方
> docs.cline.bot（Model Selection Guide、Tools 参考、Auto Compact、Memory Bank、
> CLI Overview / Reference）核到，见上方 axes。

## 相关条目

- [Zed](./zed.md) — 同分区另一端：以编辑器性能与多 agent 编排为主
- [Aider](./aider.md) — 同为开源，Git 集成是其核心设计
