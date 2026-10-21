---
id: kiro
track: ide
tasks: ["write-code"]
name: Kiro
vendor: AWS
homepage: https://kiro.dev
mark: K

axes:
  model_access: >-
    **模型由 Amazon Bedrock 提供，可选多家，但要看你买哪档。**

    免费档只能用开放权重模型和 Claude Sonnet 4.5。
    付费档才有 premium 模型（含 Auto、Sonnet 5、Opus 5）。

    官方 models 页列出的清单：

    - **Auto** —— 自动路由
    - **OpenAI** —— GPT-5.6（Sol / Terra / Luna）
    - **Anthropic Claude** —— Opus 5.5 / 5 / 4.8 / 4.7 / 4.6 / 4.5；
      Sonnet 5.5 / 5 / 4.6 / 4.5 / 4.0；Haiku 4.5

    - **开放权重** —— DeepSeek 3.2、MiniMax M2.5 / M2.1、GLM-5、Qwen3 Coder Next

    计费按 credit 倍数：Auto 是 1.0x 基准，GPT-5.6 Sol 最高 4.4x。

    区域上，GPT-5.6 一律从美国服务。其余跟随你的 profile 区域（US / EU）。
    Claude Fable 5.1 是 Enterprise 预览。

    **能不能自带 API Key（BYOK）：官方未说明。**
    （已查 models 与 pricing 两页。）
  runtime: >-
    **独立桌面 IDE，官方原文明说「a desktop development environment built on a VS Code foundation」**，
    不是装进别人编辑器的扩展。但官方把它定位为「one agent, every surface」：
    IDE / CLI / Web / Mobile 都是同一个 unified agent harness 的前端，本地客户端经 stdio 走
    **Agent Client Protocol（ACP）**，Web / Mobile 经 WebSocket 连云端沙箱。
    **IDE 与 CLI 默认在本机运行 harness**。工具操作本地文件与 shell。
    两者也可创建并接入云端 sandbox 里的 Cloud Session。
    因为边界是标准 ACP。官方称 JetBrains IDE 与 Zed 也能把 Kiro 当 agent 用。
  local_files: >-
    它通过 IDE 访问你的工作区文件。

    **代码理解分两层。** 第一层是内置的 Tree-sitter，覆盖 18 种语言，
    提供符号模糊搜索、文档大纲、AST 结构搜索与改写、代码库概览。
    这些能力跨 surface 都能用。
    第二层是 **LSP（可选）**，能做查引用、跳定义、重命名、诊断、悬停文档 ——
    但只在 IDE 与 CLI 里，而且要自己装语言服务器。

    **索引有专页说明**：打开项目就自动索引源码、文档、配置与依赖；
    文件变更或外部改动会增量重索引。也可以手动 Force Re-Index / Rebuild。
    想让 agent 别碰某些文件，用 `.kiroignore`（gitignore 风格）排除。

    **索引会不会上传到云端：官方未说明。**
    （已查 codebase indexing 与 how-kiro-works 两页。）
  background: >-
    **关掉笔记本，任务还在跑 —— 这是它最特别的一点。**

    会话跑在厂商托管的云端 sandbox 里，属于**账号**而不是某个 app。
    所以 IDE / CLI / Web / Mobile 都能接入同一个会话，
    你合上电脑、改用手机或终端回来接着看都行。

    官方给出的硬数字：

    - 最多 **10 个**并发 Cloud Session
    - 云端算力**不额外收费**（含在现有套餐里）
    - 从 IDE 创建需 IDE v1.0.293+；从 CLI 需 CLI v2.17+

    不过，跑在**本机**的那套 harness 仍然依赖你自己的机器，退出就停。

    **官方 Cloud sessions 页原文**：「The agent keeps working in the sandbox whether
    or not you're connected」
  tools: >-
    内置四类工具：文件、shell、web、code。

    **扩展机制成体系**，一共六种：

    - **MCP** —— 本地 stdio 与远程 HTTP/SSE；支持 server 提供的 prompts / resources
      与 elicitation；有 `kiro://` 一键安装链接

    - **Powers** —— 打包了知识的 MCP server，按需加载
    - **Skills** —— 开放标准的可移植指令包
    - **Custom agents 与 sub-agents**
    - **Specs**
    - **Hooks**

    Hook 的触发点官方列全了：Prompt Submit、Agent Stop、Session Start、
    Session End（CLI V3）、Agent Spawn、Pre / Post Tool Use、
    File Create / Save / Delete、Pre / Post Task Execution、Manual。

    CLI 另有 headless 模式（`--no-interactive`，配 API key），可以放进 CI/CD。

    **⚠ Mobile 端不支持 MCP 与本地文件工具。**
  context: >-
    **Specs 是它的招牌。** 每个 spec 生成三份文件，走「需求 → 设计 → 任务」：

    - `requirements.md`（或 `bugfix.md`）
    - `design.md`
    - `tasks.md` —— 支持按依赖图分波并行执行

    **Steering 提供持久的项目上下文**。它放在两个位置：工作区 `.kiro/steering/`、
    全局 `~/.kiro/steering/`。内置 product / tech / structure 三份基础文件。
    支持 always / fileMatch / manual / auto 四种 inclusion 模式，并兼容 `AGENTS.md`。

    其它上下文相关能力：subagents（各自独立上下文窗口）。
    另有 compaction。
    （自动摘要旧历史，**单向不可回滚**）· checkpoints / rewind ·
    `/sessions` 做会话管理。CLI 里另有实验性的 knowledge 库（语义检索）。

    **上下文窗口的具体数值，官方 docs 没有单列。**
    （已查 compaction 与 models 两页。）
  permissions: >-
    **它是能力制权限，不是「信任 / 不信任」两档。** 规则写 YAML，
    按 capability 配 match / exclude，effect 取 `deny` / `ask` / `allow`，
    优先级 **deny > ask > allow**。

    官方列出的 capability：

    - 文件：`fs_read` / `fs_write`
    - 执行：`shell` / `sandbox_network`
    - 联网：`web_fetch` / `web_search`
    - 扩展：`mcp` / `subagent` / `skill` / `power`
    - 其它：`context` / `diagnostics`

    作用域共六个：Kiro 硬编码、administration、user、workspace、agent、session。

    IDE 另有 Agent Autonomy 的 Autopilot / Supervised 两档。
    **工作区默认不被信任**。信任之前不加载仓库内的 agents、steering、MCP、Skills。
    **headless 模式下，每个 `ask` 都按 `deny` 处理。**

    **官方 permissions 页原文**：capability-based，"replacing older binary trust models"
  fit: >-
    适合三类人：

    - 在 AWS 生态里做正式工程交付、要「先出 spec 再实现」的团队
    - **需要云端会话在关机后继续跑的人**（Cloud sessions，最多 10 并发）
    - 想把 steering 与权限规则**随仓库分发**的团队（`.kiro/` 可提交，跨 surface 一致）

    想低量试用的话，Free 档够用。每月 50 credits，限开放权重模型与 Sonnet 4.5。

    **不适合**两类人。一是想接自有 API Key 或跑本地模型的。官方 models 与 pricing
    两页都没有 BYOK 说明。二是要求额度口径透明的重度用户。credit 按模型倍数消耗，
    官方没给「固定请求数」的换算。
pitfalls:
  - 把 Kiro 当成纯 IDE 工具，它另有 CLI / Web / Mobile 与 Crew，Cloud Session 还能关机后续跑
  - 以为 credits 按模型「包干」，官方是统一 credit、各模型按倍数（最高 4.4x）消耗
  - 把 Kiro Free 当长期可用的免费档，它每月仅 50 credits 且限特定模型

tags: [编程, IDE, 多模型, 混合]
related: [context7]

sources:
  - label: Kiro · Changelog（IDE 1.2 / CLI 2.27 / Workflows / Opus 5.5，2026-10-08 取到正文）
    url: https://kiro.dev/changelog/
    kind: changelog

  - label: Kiro · 官方定价页（Free / Pro / Pro+ / Pro Max / Power 五档 + credit 说明，2026-10-08 核）
    url: https://kiro.dev/pricing/
    kind: pricing

  - label: Kiro · 官方文档首页
    url: https://kiro.dev/docs/
    kind: docs

  - label: Kiro · How Kiro works（unified harness、ACP、各 surface 运行位置）
    url: https://kiro.dev/docs/how-kiro-works/
    kind: docs

  - label: Kiro · Specs（requirements / design / tasks 三段式与并行任务）
    url: https://kiro.dev/docs/specs/
    kind: docs

  - label: Kiro · Steering（工作区 / 全局 steering、四种 inclusion 模式、AGENTS.md）
    url: https://kiro.dev/docs/steering/
    kind: docs

  - label: Kiro · Hook triggers（Prompt Submit / Pre Tool Use / File Save 等完整触发点）
    url: https://kiro.dev/docs/hooks/types/
    kind: docs

  - label: Kiro · MCP（stdio / HTTP / SSE、`kiro://` 安装链接）
    url: https://kiro.dev/docs/mcp/
    kind: docs

  - label: Kiro · Models（多厂商模型清单与 credit 倍数）
    url: https://kiro.dev/docs/models/
    kind: docs

  - label: Kiro · Permissions（capability-based 规则与六作用域）
    url: https://kiro.dev/docs/permissions/
    kind: docs

  - label: Kiro · Cloud sessions（云端 sandbox、10 并发、跨 surface）
    url: https://kiro.dev/docs/cloud-sessions/
    kind: docs

  - label: Kiro · Code intelligence（Tree-sitter / LSP 两层）
    url: https://kiro.dev/docs/tools/code-intelligence/
    kind: docs

link:
  url: https://kiro.dev/downloads/
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

**AWS 出的 agentic 工程环境**：一套 harness 同时撑起 IDE / CLI / Web / Mobile 四个端。

两个招牌：

- **Spec 驱动** —— 先出 requirements / design / tasks 三段式，再写代码
- **Cloud Session** —— 关掉笔记本，任务还在云上跑

## 四个 surface，一个 harness

官方把形态讲得很明确——「one agent, available everywhere you work」：

| surface | 官方定位 |
|---|---|
| **IDE** | 基于 VS Code 的独立桌面 IDE（built on a VS Code foundation） |
| **CLI** | 终端 TUI，另有 headless 模式进 CI/CD |
| **Web** | 浏览器里的云端 agent，跑在托管 sandbox |
| **Mobile** | 手机上启动与 steer 会话 |

**关键设计：IDE / CLI 默认在本机跑 harness，Web / Mobile 在云端 sandbox 跑。**
但四者是同一个 harness 的前端，靠开放协议 **ACP** 连接。
因此官方称 JetBrains IDE 与 Zed 也能把 Kiro 当 agent 用。

## 招牌：spec-driven development

官方首页原话：把 prompt 变成「requirements, architectural designs, and sequenced tasks」。每个 spec 落地为三份文件：

- `requirements.md`（或 `bugfix.md`）——用户故事与验收标准
- `design.md`——技术架构、时序图与实现考量
- `tasks.md`——离散可追踪任务，支持按依赖图分波并行执行

配套还有 **steering 文件**（`.kiro/steering/` 的持久项目上下文，四种 inclusion 模式）与 **agent hooks**（十余个触发点，从 File Save 到 Pre Task Execution）。

## 适合与不适合

在 AWS 生态里做正式工程交付、习惯「先出 spec 再实现」的团队。
需要云端会话在关机后继续跑的人（Cloud sessions，最多 10 并发）。
想把 steering 与权限规则随仓库分发的团队（`.kiro/` 可提交）。

**不适合**想接自有 API Key 或跑本地模型的人。官方 models 与 pricing 两页都没有 BYOK 说明。
也不适合要求额度口径透明的重度用户。credit 按模型倍数消耗，官方未给固定请求数换算。

## 核验说明

本条目 `confidence: partial` 的原因：

- ✅ 已核验：五档档位结构与 credit 规则、模型清单与倍数、specs / steering / hooks 结构、
  MCP 传输方式、capability-based 权限、Cloud sessions 并发数字、
  「built on a VS Code foundation」的形态表述

- ❌ 未取到：BYOK / 自有 Key 是否支持、IDE 索引是否上云、压缩触发阈值、Crew 的完整能力面

**核验页**：本轮核到的官方页：kiro.dev/pricing、/changelog、/docs、/docs/how-kiro-works、
/docs/specs、/docs/steering、/docs/hooks/types、/docs/mcp、/docs/models、
/docs/permissions、/docs/cloud-sessions、/docs/tools/code-intelligence。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测两点。

- **spec 三段式的实际产出质量**
- **Cloud Session 从 IDE 创建后，关掉本机、再从手机接回时的状态完整性**

这两点是官方最强的承诺。

## 未知项清单

- 是否支持自有 API Key（BYOK）与本地模型——官方未说明（已查 /docs/models 与 /pricing 两页）
- IDE 代码索引是否上传云端——官网未公开索引位置（已查 codebase indexing 与 how-kiro-works 两页）
- 各模型上下文自动压缩的触发阈值（官方未给数字）
- Crew 的完整能力边界（本轮只核到首页入口与 changelog 条目）

## 相关条目

- [Cursor](./cursor.md) — 同为 VS Code 衍生的独立 IDE，可对照「云端 Agent 关机续跑」与 Kiro 的 Cloud Session
- [Codex IDE 扩展](./codex-ide.md) — 对照点：Codex 是装进已有编辑器的扩展，Kiro 是自带 harness 的独立 IDE
- [Windsurf](./windsurf.md) — 同为独立 IDE 形态，可对照各自的云端与权限设计