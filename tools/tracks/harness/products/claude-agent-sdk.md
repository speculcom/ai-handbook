---
id: claude-agent-sdk
track: harness
tasks: ["build-agent"]
family: coding-base
name: Claude Agent SDK
vendor: Anthropic
homepage: https://platform.claude.com/docs/en/agent-sdk/python
mark: CA
accent: "#D97757"
stars: 8197
license: MIT
latest_version: 0.2.163
language: Python 3.10+

# 支持哪些模型 provider（本站第一决策点）
providers:
  - 仅 Claude（Anthropic 官方 API）

layer_position: >-
  **它不是独立的 agent 实现，而是 Claude Code CLI 的编程接口。**

  **agent 能力全部来自那个 CLI**：工具集、hooks、权限、会话，没有一样是 SDK 自带的。

  SDK 只负责一件事：「让Python 代码能驱动这个 CLI」。

  - `query()`：单向提问
  - `ClaudeSDKClient`：双向会话

  **与 OpenAI Agents SDK 的根本差别**：后者是自建 agent loop 的框架。
  本 SDK 是既有 CLI 的 SDK 化。

  官方 README 首行原文：

  > Python SDK for Claude Agent.
  > The Claude Code CLI is **automatically bundled with the package** - no separate installation required!

axes:
  model_access: >-
    **只支持 Claude，没有第二条路可走。**

    - `pyproject.toml` 里没有 litellm / any-llm 之类的可选依赖
    - 本站其他 harness 都能接自托管模型（Ollama / vLLM / llama.cpp），本 SDK 不能

    ⚠ **这是它与其他九个对象最本质的差别。**

    模型层（`models.specul.com`）推荐的本地量化路线，在这里走不通。

    **核验**：README 全文没有 provider-agnostic 的表述。

  runtime: >-
    **它是「你运营 Python 进程 + 它驱动一个 CLI 子进程」的双层结构。**

    **实际形态**：pip 包，内含 Claude Code CLI。

    CLI 再去连 Anthropic API。换句话说，它不是「库」，是「带 CLI 的库」。

    **CLI 默认用捆绑版，也可以指向系统安装**：

    - 换成本机已装的 CLI：`ClaudeAgentOptions(cli_path="/path/to/claude")`
    - 工作目录：`ClaudeAgentOptions(cwd="/path/to/project")`

    **核验**：README 明说 CLI 随 wheel 捆绑；`_cli_version.py` 里 `__cli_version__ = "2.1.286"`。

  local_files: >-
    **默认就是全套文件工具，而且是全权限起步。**

    **README 原文**：

    By default, Claude has access to the **full Claude Code toolset** (Read, Write, Edit, Bash, and others).

    - 工作目录：`ClaudeAgentOptions(cwd="/path/to/project")`

    ⚠ **这是与本站其他对象最大的风险差异**：默认就能读文件、改文件、跑 Bash。

  background: >-
    **进程关了就停 —— 真正的「关机也跑」不存在。**

    但会话有官方持久化与续跑语义。**存储位置已核验**：

    `~/.claude/projects/<encoded-cwd>/*.jsonl`；设 `CLAUDE_CONFIG_DIR` 则在其 `projects/` 下。

    **续跑有三档**：

    - `continue_conversation=True`：续最近会话
    - `resume=<session_id>`：续指定会话
    - `fork_session=True`：分叉

    **官方对 `resume` 的说明**："picks up with full context from wherever the session left off"

    **官方 sessions 页原文**：

    **官方原文**："A session is the conversation history the SDK accumulates... The SDK writes it to disk automatically"

    **一个会话等于一个 `claude` CLI 子进程**，进程停则 loop 停。

    跨主机续跑要把 transcript 镜像到共享存储。适配器是 `SessionStore`。

    ⚠ 官方提醒：session 持久化的是**对话**而非文件系统。

    文件回滚要用 file checkpointing。

    **官方原文**："Sessions persist the conversation, not the filesystem"

  tools: >-
    **两个入口，能力不同 —— 这是很关键的设计细节。**

    - `query()`：单向提问，只能用 CLI 自带工具集
    - `ClaudeSDKClient`：双向会话，**额外解锁 custom tools 与 hooks**

    **custom tools 是「进程内 MCP server」** —— 官方原话：

    "in-process MCP servers that run directly within your Python application"

    **官方列的收益有五条**：

    | 收益 | 说明 |
    |---|---|
    | No subprocess management | 与应用同进程，无需管理子进程 |
    | Better performance | 工具调用无 IPC 开销 |
    | Simpler deployment | 单进程而非多进程 |
    | Easier debugging | 全部代码同进程 |
    | Type safety | 带类型提示的直接 Python 函数调用 |

    **外部 MCP server 照样支持，两者可混用。**

    `mcp_servers` 字典里可以同时放：

    - `create_sdk_mcp_server(...)` 的产物
    - `{"type":"stdio", ...}` 外部 server

  context: >-
    **容易忽略的一个机制：system prompt 的 snapshot 语义。**

    **Claude Code 在会话首次请求时构建它，之后每次请求都复用。**

    **恢复会话之后也照样复用。**

    **改了自定义 prompt 不会立刻生效。**

    改了 `claude_code` preset 的 `append` 文本也一样。

    **要等会话被 compact，或者开一个新会话。**

    除非把 `snapshot` 设为 `False`（需要 CLI 2.1.257+）。

    **这实质上是「上下文快照不可变」的设计。**

    它保证了 prompt 的确定性，代价是改动生效有延迟。

    这与本站「状态 ≠ 上下文」的讨论直接相关。

  permissions: >-
    **结论先给：默认全开，权限要你自己收。**

    官方给的求值链是本站目前见到的最详细的一份。**README 原文**：

    `allowed_tools` is a permission allowlist: listed tools are auto-approved, and unlisted tools fall through to `permission_mode` and `can_use_tool` for a decision. **It does not remove tools from Claude's toolset.** To block specific tools, use `disallowed_tools`.

    翻译过来是四条：

    - `allowed_tools` 是**准入白名单**：列进去 = 自动批准
    - 未列的工具走 `permission_mode` 与 `can_use_tool` 判定
    - **它不会把工具从工具集里移除**
    - 要真正禁用某个工具，得用 `disallowed_tools`

    **hooks 提供确定性拦截**：

    - 它是「Python 函数，由 Claude Code *应用*（不是 Claude）调用」
    - 拦截点：`PreToolUse` 返回 `permissionDecision: "deny"` 加理由
    - 官方示例：拦 Bash 命令

    ⚠ **默认起步是全工具 + 无沙箱**，想收紧必须主动配置。

    **三个开关**：

    - `disallowed_tools`
    - hooks
    - `permission_mode`

  fit: >-
    **一句话：它是一个已经被打磨过的 coding agent。**

    **换模型和自定义 loop 形状，它做不到。**

    **适合**：

    - 想要一个**已经被打磨过的 coding agent** —— 工具集、权限链、hooks、session fork 都在
    - 团队用 Python
    - 愿意把推理完全交给 Claude

    **不适合**：

    - 需要换模型 / 接自托管权重 —— **直接排除**
    - 需要框架级的自定义 agent loop —— loop 形状由 Claude Code 决定
    - 需要多 agent 编排 —— 它没有 agents-as-tools 那种一等委派机制

pitfalls:
  - 以为它是「Anthropic 版的 OpenAI Agents SDK」—— **不是**。它是 Claude Code CLI 的 SDK，能力来自那个 CLI，不是框架自带
  - 以为 `allowed_tools` 能限制工具集 —— 官方明确「It does not remove tools from Claude's toolset」，禁用要用 `disallowed_tools`
  - 以为默认是安全的 —— 默认是 **full toolset（Read/Write/Edit/Bash）**，且没有沙箱层
  - 以为改了 system prompt 立刻生效 —— 会被 snapshot 冻结，要 compact 或新会话才生效（除非 snapshot=False）
  - 以为 MIT = 无附加条款 —— 受 Anthropic 商业条款约束（见正文）
  - 以为 TS 版授权与 Python 版一致 —— **核验发现 TS 版无 LICENSE 文件、license API 返回 null，授权状态不明**（核验 2026-09-30）

tags: [Python, 开源, MIT, 编程底座, CLI包装, hooks, 权限链, 仅Claude]
related: [claude-code-cli]

sources:
  - label: Claude Agent SDK for Python · 仓库
    url: https://github.com/anthropics/claude-agent-sdk-python
    kind: repo

  - label: 官方文档（Python）
    url: https://platform.claude.com/docs/en/agent-sdk/python
    kind: docs

  - label: 权限指南（求值顺序的权威说明）
    url: https://platform.claude.com/docs/en/agent-sdk/permissions
    kind: docs

  - label: Hooks（官方专章）
    url: https://platform.claude.com/docs/en/agent-sdk/hooks
    kind: docs

  - label: Claude Code 工具集清单（tools available to Claude）
    url: https://code.claude.com/docs/en/settings#tools-available-to-claude
    kind: docs

  - label: 修改 system prompts（snapshot 语义的权威说明）
    url: https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts
    kind: docs

  - label: Work with sessions（会话写盘位置、continue/resume/fork、跨主机 SessionStore，核验 2026-10-08）
    url: https://code.claude.com/docs/en/agent-sdk/sessions
    kind: docs

  - label: Hosting the Agent SDK（subprocess 模型、本地磁盘状态、跨主机持久化，核验 2026-10-08）
    url: https://code.claude.com/docs/en/agent-sdk/hosting
    kind: docs

  - label: Anthropic 商业条款（README 末节指向，授权关键）
    url: https://www.anthropic.com/legal/commercial-terms
    kind: docs

  - label: Releases（0.2.163 @ 2026-09-30）
    url: https://github.com/anthropics/claude-agent-sdk-python/releases
    kind: changelog

  - label: CHANGELOG（Claude Code SDK <0.1.0 的破坏性变更）
    url: https://github.com/anthropics/claude-agent-sdk-python/blob/main/CHANGELOG.md
    kind: changelog

link:
  url: https://platform.claude.com/docs/en/agent-sdk/python
  kind: official

last_verified: 2026-09-30
last_updated: 2026-09-30
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 文档站直连实测 200。
  direct_note_en: docs site measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**它是什么**：Claude Code 的编程接口（Python 版）。

它把一个成熟的 coding CLI 变成 Python 能驱动的对象。

它不是一个自建 agent 的框架。

**这也是本站十个对象里唯一不能换模型的编程底座** —— 后面所有取舍都由这条决定。

> 官方 README 首行："Python SDK for Claude Agent."

## ⚠ 先讲清最容易误解的一点：它是 CLI 的包装，不是框架

**README 首行就把这事说了**：

> Python SDK for Claude Agent.
> **The Claude Code CLI is automatically bundled with the package** —
> no separate installation required!

**捆绑的是哪个 CLI，有确切记录**：

> 核验 `_cli_version.py`：`__cli_version__ = "2.1.286"`（捆绑的确切 CLI 版本）。

**这意味着能力边界是固定的**：

| 你以为 | 实际 |
|---|---|
| 引入一个 agent 框架 | 引入一个**内含 CLI 的 wheel**，CLI 再去连 API |
| agent loop 由 SDK 定义 | **agent loop 由 Claude Code CLI 定义** |
| 可以改 agent 的形状 | 只能通过 options 配置它暴露出来的开关 |

**与 OpenAI Agents SDK 的根本差别**：

- 后者是自建 agent loop 的框架（primitives-only）
- 本 SDK 是既有 CLI 的 SDK 化

**这是本站最需要讲清的一组对照。**

## 十个对象里唯一不能换模型的编程底座

**换 provider 这条路，在这套 SDK 上是关着的。**

| | OpenAI Agents SDK | Claude Agent SDK |
|---|---|---|
| provider | provider-agnostic，100+ | **仅 Claude** |
| 换自托管权重 | 可（litellm / any-llm extra） | **不可** |
| agent loop | SDK 给出原语 | CLI 决定形状 |

⚠ **这直接关掉了本站的一条推荐路线。**

- 模型层（`models.specul.com`）主推的本地量化模型 + Ollama/vLLM 自托管
- **在这套 SDK 上走不通** —— 想用本地权重就得换方案

## 权限：官方给了完整求值链，但默认是全开的

**官方给了完整的权限求值链 —— 这是本站目前见到的最详细的一份。**

**README 这段是权威说明**：

> `allowed_tools` is a permission allowlist: listed tools are **auto-approved**,
> and unlisted tools fall through to `permission_mode` and `can_use_tool` for a decision.
> **It does not remove tools from Claude's toolset.**
> To block specific tools, use `disallowed_tools`.

翻译成一张表：

| 机制 | 作用 | 常被误解之处 |
|---|---|---|
| `allowed_tools` | **准入白名单**，列进去 = 自动批准 | ⚠ **不会把工具从工具集移除** |
| `permission_mode` | 未列入的工具走这里判定 | 例：`acceptEdits` 自动接受文件编辑 |
| `can_use_tool` | 自定义回调函数 | 官方给了完整求值顺序文档 |
| `disallowed_tools` | **真正禁用**某些工具 | 想真正拦就得用这个 |
| **hooks** | `PreToolUse` 返回 `deny` 加理由 | **确定性拦截，由应用层而非模型层执行** |

**⚠ 默认起步状态必须知道**：

> By default, Claude has access to the **full Claude Code toolset**
> (Read, Write, Edit, Bash, and others).

**默认就有 Read / Write / Edit / Bash，而且没有沙箱层。**

想收紧必须主动配置，三个开关：

- `disallowed_tools`
- hooks
- `permission_mode`

**hooks 的定位值得单独记**：

- 它是「Python 函数，由 Claude Code *应用*（**not** Claude）调用」
- 拦截发生在确定性代码里，不是靠模型自我约束

**对照 Deep Agents**：

- 那个的立场是「trust the LLM，不要指望模型自我约束」
- **Anthropic 的答案**：把拦截放在应用层

## custom tools = 进程内 MCP server（一个省心的设计）

**custom tools 不是普通函数调用，而是「进程内 MCP server」。**

**官方原话**：

> "**in-process MCP servers** that run directly within your Python application"

**官方列的收益有五条**：

| 收益 | 说明 |
|---|---|
| No subprocess management | 与应用同进程，无需管理子进程 |
| Better performance | 工具调用无 IPC 开销 |
| Simpler deployment | 单进程而非多进程 |
| Easier debugging | 全部代码同进程 |
| Type safety | 带类型提示的直接 Python 函数调用 |

**外部 MCP server 照样支持，两者可混用。**

`mcp_servers` 字典里可以同时放：

- `create_sdk_mcp_server(...)` 的产物
- `{"type":"stdio", ...}` 外部 server

⚠ **注意能力边界**：

- custom tools 与 hooks 只在 `ClaudeSDKClient` 下可用
- `query()` 用不了

## 「状态 ≠ 上下文」：这里有个反直觉的 snapshot 设计

**system prompt 有「快照」语义。**

会话中途改 prompt 不会立刻生效。

**README 原文**：

> Claude Code builds the system prompt on a session's **first** request, **records it**,
> and reuses it on every later request, **including after you resume the session**.
> A changed custom prompt, or changed `append` text... then has no effect
> **until the session is compacted or you start a new session**.
> To rebuild the prompt on every request instead... set `snapshot` to `False`.

**想每次重建，要显式设 `snapshot: False`。**

这需要 CLI 2.1.257+。

**README 还记了一个历史 bug**：

> "Before 2.1.265, a session with an `append` or custom prompt recorded it only when `snapshot` was True"

**这实质是「上下文快照不可变」**：保证了 prompt 的确定性，代价是修改有延迟。

**与本站主张的关系**：

- 其他 harness 讲的是「如何压缩/持久化上下文」
- 这里讲的是「**如何冻结上下文**」

**它保证同一会话内 prompt 恒定**，避免 prompt 漂移导致行为不可预测。

这是一个**第三种思路，本站首次记录**（标注为本站观察，非官方表述）。

## 许可条款的真相：MIT 但不是「无附加条件」

**结论：仓库是 MIT，用起来却还受 Anthropic 商业条款约束。**

**README 末节原文**：

> Use of this SDK is governed by Anthropic's
> **Commercial Terms of Service**, including when you use it to power products and services
> that you make available to your own customers and end users,
> **except to the extent a specific component or dependency is covered by a different license**.

**仓库许可证标记是 MIT。**

> license API 确认 `spdx_id: MIT`。

**但使用受 Anthropic 商业条款约束。**

尤其「用它给你自己的客户提供产品/服务」这一条。

⚠ **本站标注**：这不是「非开源」，也不是「不能商用」。

但**做产品前必须读那份商业条款**，MIT 标记本身不构成完整授权判断。

**附一处核验发现**：

- TypeScript 版仓库：`anthropics/claude-agent-sdk-typescript`
- 1,780★，活跃
- **没有 LICENSE 文件，license API 返回 `null`**

授权状态与 Python 版是否一致**未核实**。

Python 版是 MIT + 商业条款；TS 版**无文件可查**。

选型时若要用 TS 版，**授权需另行确认**。

## 附：仓库描述字段为空

**两条元数据是空的，如实记下来。**

> 核验：`description` 为 `null`（GitHub API），`homepage` 也为 null。
> 文档入口在 README 首行的 `platform.claude.com/docs/en/agent-sdk/python`。

**这样记，是为了避免读者以为信息缺失是我们没查。**

## 适合与不适合

**适合三类情况**：

- 想要一个**已经被打磨过的 coding agent** —— 工具集、权限链、hooks、session fork 都在
- 团队用 Python
- 愿意把推理完全交给 Claude

**不适合三类情况**：

- 需要换模型，或接自托管权重 —— **直接排除**
- 需要框架级的自定义 agent loop —— 形状由 Claude Code 决定（备选 OpenAI Agents SDK 或 LangGraph）
- 需要多 agent 编排 —— 它没有 agents-as-tools 那种一等委派机制

## 核验说明

`confidence: partial` 的依据如下。

**降级时间**：2026-10-03，由 verified 降为 partial。

> **为什么降级**：下方 ❌ 项的主语是**本站的取证缺口**，不是「官方未提供」。
> 按 v3 铁律「未知就说未知」，这些条目存在时标 verified 属于虚高，故降为 partial。

**主要缺口有三处**：

- Anthropic 商业条款的具体条款内容
- TS 版许可状态
- hooks 生命周期边界

**已核验**：

- ✅ 仓库存在与星数（8,197）
- ✅ 许可（license API 返回 MIT）
- ✅ 最近推送（2026-09-30 22:29）
- ✅ 最新版本 **0.2.163**（**2026-09-30 19:47 发布**）
- ✅ 捆绑 CLI 版本 **2.1.286**（`_cli_version.py` 原文）
- ✅ README 全文 —— 权限求值链、hooks 定位、错误类型清单、default full toolset 表述
- ✅ README 全文 —— custom tools 为进程内 MCP server、system prompt snapshot 语义
- ✅ 许可条款末节原文
- ✅ v3 计划记录的 **0.2.162** 已被超越（今天发布 0.2.163）

**⚠ 异常发现**：

- 仓库 `description` 与 `homepage` 均为 `null`
- TS 版无 LICENSE 文件，license API 返回 `null`

**❌ 未核验**：

- Anthropic 商业条款的具体条款内容（未读原文，属法务范畴）
- 会话的多进程并发语义
- session forking 的具体形态与限制
- `can_use_tool` 与 `permission_mode` 的完整优先级链（README 只给了概述，细节在 permissions 专章）

**一处计划数据修正**：

v3 计划 §2.2 记的是 v0.2.162。

实际核验时已发布 **v0.2.163**，晚于计划编写。

**这再次印证「快照会过期、必须现场核验」。**

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：

| # | 测什么 | 为什么值得测 |
|:--:|---|---|
| 1 | pip 装完到底拉了多少东西（含捆绑 CLI 的体积） | CLI 随包捆绑，部署体积影响未知 |
| 2 | 默认配置下 agent 实际能碰到哪些目录 | 默认 full toolset 且无沙箱，边界要实测 |
| 3 | `disallowed_tools` 与 hooks 哪条先生效 | README 只说求值顺序概述，实测才知道 |
| 4 | resume 会话后状态恢复到什么粒度 | 本站最关心的「可靠长期运行」 |
| 5 | 改 system prompt 后多久生效（测 compact 触发条件） | snapshot 语义的边界 |

## 未知项清单

- Anthropic 商业条款的具体约束（尤其面向客户的场景）
- TypeScript 版的授权状态
- 会话持久化的多进程并发语义
- session forking 的具体形态与限制
- `permission_mode` 全部取值与 `can_use_tool` 的优先级细节
- 捆绑 CLI 版本与系统安装版本的兼容差异

## 相关条目

- [OpenAI Agents SDK](./openai-agents-sdk.md) — **本站最该对照的一对**：同为模型厂商出品、同为「编程底座」档。OpenAI 侧是自建 loop 的框架 + provider-agnostic；Anthropic 侧是 CLI 的 SDK + 仅 Claude。
- [Codex SDK](./codex-sdk.md) — 第三家厂商的同档选择。**三家是同一个问题的三种答案**：自建框架 / 包装 CLI / 包装 CLI。
- [Deep Agents](./deepagents.md) — 权限哲学的对照：「信任 LLM」vs「应用层确定性拦截」
- [Hermes Agent](./hermes-agent.md) — 路线相反、厂商不同（本站前者 Anthropic、后者 Nous Research）：那个是自托管优先的通用 harness，本条只包 Anthropic 自家的 CLI。
