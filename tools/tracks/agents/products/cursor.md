---
id: cursor
track: ide
tasks: ["write-code"]
name: Cursor
vendor: Anysphere
homepage: https://cursor.com
mark: C
accent: "#111111"

axes:
  model_access: >-
    **可选多家厂商的模型；个人三档的差别是额度倍数，不是模型能不能用。**

    **官方首页列出的可选范围**：

    - OpenAI / Anthropic / Gemini / SpaceXAI / Cursor 自研

    供应方已明确不止一家：导航含 Grok / Grok Bot，各档另列「Grok 使用额度」。

    Auto 模式的候选（2026-10-01 官网示例）：

    - Grok 4.7
    - GPT-5.6 Sol
    - Fable 5.1
    - Max Opus 5.5
    - Gemini 3.1 Pro
    - Composer 2.5

    **额度按档递增，官方原文**：

    - Pro = extended
    - Pro+ = "3x Pro limits on Agent"
    - Ultra = "20x Pro limits on Agent"

    三档都写 **"Access to frontier models"**。
    所以差别在额度倍数，不在能不能用前沿模型。
    **这一条与常见误解相反，值得单独记。**

    Hobby 档**仅可用 Auto 模型**。

    **Cursor Router 按 cost / balance / intelligence 三档在多模型间路由。**
    官方说明按被路由到的模型标价计费。
    Router 先在 Teams / Enterprise 推出，个人档「数月后」跟进。

  runtime: >-
    **两种运行形态：云端，或自托管在你自己的机器上。**

    这是本分区最独特的架构。

    2026-09-02 官方推出自托管支持：

    - 代码库、构建产物与密钥都留在你自有基础设施内运行的机器上
    - 由智能体在本地处理工具调用

    另有 **My Machines** 形态：
    把单台笔记本或 VM 连到账户，用于个人工作流。

    **Cursor Router 的可用面更宽。**
    官方文档说明它可以在编辑器 / CLI / Cursor SDK / iOS 应用中使用。

  local_files: >-
    **编辑器形态读工作区文件；自托管形态下代码与产物不离开你的基础设施。**

    它由 VS Code 衍生而来，所以文件访问方式与编辑器一致。

    **索引策略官方写了（2026-10-03 补，取自官方 Search 文档页）。**

    检索用自研的 **Instant Grep**。
    官方称它在大型代码库上优于 `ripgrep`，无需配置。

    **官方原文**："runs automatically; no configuration needed"。

    **一条值得单独记的数据边界：**

    **官方原文**："Instant Grep **builds and queries its index on your machine**. Cursor does not upload file paths or code to build a search index, and it **does not store embeddings of your codebase for search**"。

    也就是说：检索索引完全在本机，官方明说不为检索存 embedding。

    ⚠ 但同一页紧接着补了一句：

    **官方原文**："When Agent opens a match, **that file content can still be included in the model request**"。

    所以**「建索引不出本机」≠「文件内容不出本机」**。
    命中之后，内容照样进模型请求。

    **Explore 子智能体是官方给的上下文控制手段**：

    - 跑在独立上下文窗口
    - 用更快的模型
    - 执行并行搜索后**只回传相关发现**

    **官方原文**："returning only the relevant findings"。
    官方明说这是为了避免把原始文件内容整段倒进主对话。

    ⚠ **大仓库的索引性能与规模上限，官方文档未给数字。**

  background: >-
    **云端 Agent 可以脱离你的电脑继续跑，而且官方有明确表述。**

    「项目」跑在云端的独立计算机上，**合上笔记本电脑也不会中断**。

    需要本机测试时，协调智能体会启动本地智能体。

    **官方另称协调智能体还能主动行动**：

    - 监听 Slack 频道
    - 按计划运行
    - 跟踪所有 PR

    也就是**无需等待提示**就会动手。

  tools: >-
    **MCP、技能（Skills）与钩子（Hooks）从 Pro+ 起可用。**

    官方在 Pro+ 及以上档列出这三项，另有云端智能体与按用量计费的 Bugbot。
    **Bugbot 是智能体驱动的代码审查。**

    Teams 档另有团队应用市场，面向内部规则、技能与插件。

    **MCP 接入细节（2026-10-03 补，取自官方 MCP 文档页）。**

    **三种传输方式**：

    - `stdio`：本地，由 Cursor 启动；可用 shell 命令启动；手动认证
    - `SSE`：可本地或远程部署为服务器；多用户；OAuth 认证
    - `Streamable HTTP`：与 `SSE` 相同，可本地或远程部署为服务器；多用户；OAuth 认证

    **协议能力六项全支持**：

    - Tools / Prompts / Resources / Roots / Elicitation / Apps

    **配置分两层**：

    - 项目级 `.cursor/mcp.json`，可用 `${workspaceFolder}`
    - 全局 `~/.cursor/mjsson`，可用 `${userHome}`

    **变量插值支持四种**：

    - `${env:NAME}`
    - `${userHome}`
    - `${workspaceFolder}`
    - `${pathSeparator}`

    还支持 `envFile` 从 `.env` 读密钥（仅 stdio）。

    ⚠ 注意 `~` 是 home 目录，与「Pro+」无关。

    **工具审批默认开启。**

    **官方原文**："Cursor asks for approval before using MCP tools by default"。

    工具级 allowlist 可以限制某个服务器上哪些工具能自动运行。

    **每个 MCP 服务器有独立网络模式**：

    - Allow all / Allowlist / Deny all / **No sandbox**

    **Hooks 事件清单（2026-10-03 补，取自官方 Hooks 与插件参考页）。**

    agent 钩子 18 个：

    - `sessionStart` `sessionEnd` `preToolUse` `postToolUse`
    - `postToolUseFailure` `subagentStart` `subagentStop`
    - `beforeShellExecution` `afterShellExecution`
    - `beforeMCPExecution` `afterMCPExecution`
    - `beforeReadFile` `afterFileEdit`
    - `beforeSubmitPrompt` `preCompact` `stop`
    - `afterAgentResponse` `afterAgentThought`

    另有 Tab 钩子：

    - `beforeTabFileRead`
    - `afterTabFileEdit`

    应用生命周期钩子：

    - `workspaceOpen`

    钩子是**命令型**，可带 `matcher` 过滤。

    **官方原文**：`{"command": "./hooks/audit.sh"}`

    官方还给了 TypeScript 变体（由 Bun 驱动），可做结构化 I/O 与 HTTP。

  context: >-
    **「项目」的核心设计是长期上下文维持。**

    官方原文说它能做三件事：

    - 在长达数月的工作中持续保持上下文
    - 把任务委派给成千上万个子智能体
    - 无需提示就自动执行周期性工作

    共享上下文会在多个云端与本地机器间同步。
    一个智能体摸清某服务怎么测之后，后续智能体可以直接复用。

  permissions: >-
    **安全审查是一个 bot，而且分成两个职责。**

    **Security Review 管可利用的缺陷**：

    - 结合全库上下文读每个 PR
    - 报告可被利用的缺陷
    - 每项标明严重级别、攻击路径与修复建议

    检查项包括注入、认证绕过、密钥提交、SSRF、不安全反序列化，
    以及引入已知漏洞的依赖变更。

    **代码风格与质量问题仍由 Bugbot 负责。**

    还可以为仓库添加规则，Security Review 会在每个 PR 强制执行。
    例如外部调用必须走哪个客户端、哪些表不能在请求处理程序里查。

    **草稿 PR 会被跳过。**

  fit: >-
    适合三类人：

    - 需要云端 Agent、希望合上笔记本任务继续跑的人
    - 需要长周期（数月级）上下文维持与大规模子智能体编排的人
    - **代码不能离开自有基础设施的企业**（自托管形态）

    Free 档适合想低成本试智能体的人：有限额度 + Composer 访问。

pitfalls:
  - 把 Cursor 当成纯本地编辑器，2026-09-02 起已有自托管形态，代码可以不离开你的基础设施
  - 把云端能力当成「有入口就行」，官方明确说合上笔记本不会中断
  - 混淆 Security Review 与 Bugbot，一个管可利用缺陷，一个管风格与质量问题

tags: [编程, IDE, 混合, 云端]
related: [context7]

sources:
  - label: Cursor · Changelog（Projects / 自托管 / Rollouts + Security Review）
    url: https://cursor.com/changelog
    kind: changelog

  - label: Cursor · 官方定价页（5 档结构）
    url: https://cursor.com/pricing
    kind: pricing

  - label: Cursor · 官方文档
    url: https://cursor.com/docs
    kind: docs

  - label: Cursor Docs · Model Context Protocol (MCP)（传输方式/协议能力/配置位置/变量插值/工具审批/网络模式，2026-10-03 取到正文）
    url: https://cursor.com/docs/context/mcp
    kind: docs

  - label: Cursor Docs · Search · Instant Grep（本机索引 / 不存embedding 的官方声明 / Explore 子智能体）
    url: https://cursor.com/docs/agent/tools/search
    kind: docs

  - label: Cursor Docs · 插件参考（Hooks 事件清单与 hooks.json 格式）
    url: https://cursor.com/docs/reference/plugins
    kind: docs

link:
  url: https://cursor.com
  kind: official

last_verified: 2026-10-03
last_updated: 2026-09-29
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

**本分区架构最激进的三个之一**：
云端 Agent 合上笔记本不中断、自托管代码不出网、代码审查拆成两个 bot 分工。

## 三个近期的架构级变化

### ① 自托管（2026-09-02）

**官方原文**："支持 [自托管]，让工具执行完全留在你自己的网络内。你的代码库、构建产物和密钥都保留在你基础设施中运行的内部机器上，由智能体在本地处理工具调用。"

**这一条改变了这个工具的根本定位**：

- 在此之前，AI 编程工具默认要把代码交出去
- Cursor 现在提供了不交的路径

配套还有 **My Machines** 形态：

- 把单台笔记本或 VM 连到账户
- 用于个人工作流

### ② 项目（2026-09-10）

**官方原文**（能力描述）："「项目」让你能够承接更大规模的工作，比如一项功能、一次迁移，或是一个完整的应用。它能在**长达数月**的工作中持续保持上下文，将任务委派给**成千上万个**子智能体，还能**无需提示**自动执行周期性工作。"

**三个关键设计**：

| 设计 | 含义 |
|---|---|
| **协调智能体不写代码** | 它只规划工作、委派给实现智能体、把成果交回给你检查 |
| **云端独立计算机运行** | **合上笔记本电脑也不会中断**；需本机测试时才启动本地智能体 |
| **上下文跨机器同步** | 一个智能体摸清某服务的测试方法，后续智能体直接复用 |

**「共享上下文会随项目一同积累，让协调智能体越用越高效」**——
这是本分区里对长期上下文最明确的设计承诺。

配套的订阅机制：

- 让协调智能体监听 Slack 频道
- 按计划运行
- 跟踪所有 PR

**主动行动而无需等待提示**。

**官方标注：「项目目前处于 beta 阶段」。**

### ③ Rollouts + Security Review（2026-09-23）

**两个 bot，仅团队版与企业版可用**。

**Rollouts** —— 部署变更监控：

- 为每个 PR 附加监控项，读取 diff 与涉及的系统
- **在 PR 里写一份监控规划**（列出风险、预期效果、要检查的信号、埋点缺口）
- **规划可人工编辑**，Rollouts 会采用修改后的版本
- 部署触发时被唤醒，按日志、指标、链路追踪数据执行
- **分别跟踪每个环境**——同一变更可能在预发布验证通过却在生产被标记
- 检测到回归时指出疑似变更并通知作者
- 可创建回滚 PR 供审查，或交给云端智能体修复
- **目前不会自行合并或回滚**

**Security Review** —— 可利用缺陷审查：

- 结合全库上下文读每个 PR，发布一条审查评论
- 检查项包括：SQL/命令/模板注入、认证与授权绕过、
  **因重构而不再执行的检查**、提交到源码的密钥与凭证、
  SSRF 与未经验证的重定向、不安全反序列化、
  引入已知漏洞的依赖变更

- **追踪用户输入从哪进入、流经哪些环节**（taint 追踪）
- 每项标明严重级别、攻击路径、修复建议
- 支持为仓库添加规则并在每个 PR 强制执行
- **草稿 PR 会被跳过**

**职责边界很清楚**：代码风格和质量问题仍由 Bugbot 负责。

## 档位结构（6 档，能力差异 2026-10-01 核实）

官方定价页 + 帮助页逐档核实（报价数字按 D9 口径不存，见官方定价页）：

| 档位 | 关键能力 |
|---|---|
| **Hobby** | 免费档：无需信用卡、有限的智能体请求、Composer 访问权限。**仅可用 Auto 模型** |
| **Pro** | 扩展的 Agent 额度、Generous limits for Grok、前沿模型访问、Grok Bot 访问、**MCP + 技能 + 钩子**、云端智能体、按用量计费的 Bugbot |
| **Pro+** | **3x Pro limits on Agent**，其余同 Pro，**Grok Bot 用量更高** |
| **Ultra** | **20x Pro limits on Agent**，Grok Bot 用量最高，**新功能优先访问** |
| **Teams** | 集中计费、**团队应用市场**（内部规则/技能/插件）、**共享团队上下文的云端智能体与自动化**、Bugbot 代码审查、**用量分析**、团队级隐私模式、SAML/OIDC 单点登录 |
| **Enterprise** | 洽谈：汇总用量、发票/采购订单结算、SCIM 管理席位 |

**三个值得注意的设计**：

- **Teams 档的「用量分析」**——「帮助您了解团队行为」，这类需求通常只有企业级工具才有
- **Teams 档的「团队级隐私模式」**——与自托管能力呼应
- **Pro / Pro+ / Ultra 的差别是额度倍数，不是模型可得性**

三档都写 **"Access to frontier models"**。

## 一个值得留意的商业信号

2026-09-22 起 Cursor 官网出现 **Grok / Grok Bot** 品牌元素，各档另列「Grok 使用额度」。

**这说明模型供应方已不止一家。**

官方列出的可选范围是 **OpenAI / Anthropic / Gemini / SpaceXAI / Cursor 自研**。

Auto 模式的候选含：

- Grok 4.7
- GPT-5.6 Sol
- Fable 5.1
- Max Opus 5.5
- Gemini 3.1 Pro
- Composer 2.5

Cursor Router 按 cost / balance / intelligence 三档路由，
**按被路由到的模型标价计费**。

## 适合与不适合

需要云端 Agent 且希望合上笔记本任务继续跑的人。

需要长周期（数月级）上下文维持与大规模子智能体编排的人。

**代码不能离开自有基础设施的企业**（自托管形态）。

**不适合**要求额度透明到可直接比较的人——
各档额度倍数（1x / 3x / 20x）官方未给出具体请求数或 token 量，
只有倍数表述。

## 采集状态（2026-10-01 更新 · D9 修订）

| 页面 | 状态 |
|---|---|
| 定价页 | ✅ 6 档结构与能力清单已核实（报价数字按 D9 口径不存） |
| 帮助页（account-and-billing/pricing） | ✅ 档位切换机制与额度口径已核 |
| 文档页 | ✅ 取到文本 |
| Changelog | ✅ 取到三条完整条目（09-23 / 09-10 / 09-02） |

**因此本条目标 `confidence: partial`**：

- 能力侧证据充分
- 但额度倍数（1x / 3x / 20x）无具体数值
- 自托管部署细节未核

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：这个工具的实测重点应是
**「项目」的上下文维持是否真的能撑数月**——
这是官方最强的承诺，也是最难验证的一点。

## 未知项清单

- 各档额度倍数（1x / 3x / 20x）对应的具体请求数或 token 量
- 自托管形态的具体部署方式与前置条件
- 大仓库的索引性能与规模上限（官方未给数字）
- 「项目」beta 的功能边界

## 相关条目

- [Codex IDE 扩展](./codex-ide.md) — 同为多形态但自托管未确认
- [Claude Code IDE 扩展](./claude-code.md) — 同分区，权限设计更细
