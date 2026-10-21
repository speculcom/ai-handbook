---
id: copilot
track: ide
tasks: ["write-code"]
name: GitHub Copilot
vendor: GitHub / Microsoft
homepage: https://github.com/features/copilot
mark: GH
accent: "#24292F"

axes:
  model_access: >-
    由 GitHub / Microsoft 统一托管，绑定 GitHub 账号体系。

    **官方有模型清单页**，覆盖多厂商：

    - OpenAI（GPT-5 / 5.3-Codex / 5.4 / 5.5 / 5.6 / 6.x）
    - Anthropic（Claude Fable / Opus / Sonnet）
    - Google（Gemini Flash）
    - Microsoft（MAI-Code）
    - Moonshot（Kimi）
    - xAI（Grok）

    **模型随套餐与客户端变化**：Pro / Pro+ / Max /
    Business / Enterprise 各不同，Free 与 Student **仅能经 Auto
    模型选择**使用；组织 / 企业可启用或限制具体模型。

    聊天框有模型切换器（另有 Auto），部分模型支持 1M token 上下文
    与可调 reasoning（VS Code 与 CLI）。

    **BYOK 已核验**：VS Code 可从 provider（Anthropic / Gemini /
    OpenAI 等）或 AI Toolkit 添加模型，可能需 API key 或 PAT。

    Business / Enterprise 需先启用「Bring Your Own Language Model
    Key in Select IDEs」策略。

    第三方 agent 委派（Claude / Codex）仍标 **Preview**。

  runtime: >-
    **形态最广的一个**：

    - GitHub 网站本身（含 github.com 与 GitHub Mobile）
    - Copilot app
    - Copilot CLI
    - 以及 VS Code / Visual Studio / JetBrains / Eclipse / Xcode 等编辑器

    另有 Codespaces 提供的即时开发环境。

  local_files: >-
    通过编辑器扩展或 GitHub 平台访问代码。

    **官方有语义代码索引（semantic code search）**：

    后台建立，大仓库首次索引最长约 60 秒，
    此后增量更新通常在新会话开始后数秒内完成。

    供 GitHub 网站与 VS Code 的 Copilot Chat、以及 cloud agent 使用。

    非 GitHub 仓库（GitLab、本地仓库）在 VS Code 也可语义索引，
    但**会把数据上传到 GitHub**，且默认关闭、需管理员启用
    **「Semantic indexing for non-GitHub repositories」**策略。

    **Content exclusion** 可让 Copilot 忽略指定文件。

    官方明说索引结果 **不用于模型训练**。

  background: >-
    **有明确的真后台 cloud agent（原 coding agent）**。

    **官方原文**：「GitHub Copilot can work independently in the background」

    在**由 GitHub Actions 驱动的临时开发环境**里独立跑任务——
    即**厂商托管，你的机器关闭后仍继续**。

    触发方式：派 GitHub issue、在 PR 评论 `@copilot`，或从 VS Code 入口；
    可产出分支 / PR（一次一分支、一任务一 PR）。

    Business / Enterprise 默认禁用，需管理员先启用。

    **限制**：cloud agent **不遵守 content exclusion**。

    用量：消耗 GitHub Actions 分钟 + Copilot premium requests。

  tools: >-
    **MCP 是官方平台级能力**——
    导航栏即有独立的**「MCP Registry / Integrate external tools」**条目。
    支持自定义指令与自定义 agent。
    **File diff reviews in code editors** 在更高档位提供。

  context: >-
    **上下文窗口有上限说明**：部分模型支持 **1M token 上下文**
    （仅 VS Code 与 Copilot CLI 可用），并有可调 reasoning
    （VS Code、CLI 与 cloud agent）。

    **跨会话记忆已核验为官方功能 Copilot Memory（public preview）**：
    存仓库级事实与用户级偏好，带引用并在当前分支校验，
    未使用的条目 **28 天后自动删除**，可在多个 feature 间共享；
    付费套餐可用，组织 / 企业需管理员先启用。

    另有 custom instructions 三类（个人 / 仓库 / 组织），优先级
    个人 > 仓库 > 组织：

    - 仓库级用 `.github/copilot-instructions.md`
    - 路径级用 `.github/instructions/**/*.instructions.md`
    - 以及 `AGENTS.md` 等 agent 指令

  permissions: >-
    **依赖 GitHub 权限体系**（仓库 / PR / 组织策略）。

    官方已核验的边界：

    - ① **Content exclusion**（Business / Enterprise）可让 Copilot 忽略
    指定文件；但不覆盖 symlink 与远程文件系统、在 VS Code 的
    Edit / Agent 模式不支持，且 **cloud agent 不适用内容排除**。
    - ② **cloud agent 默认受防火墙限制联网**：官方称按域名 / URL
    允许清单放行，可在组织与仓库级配置；但防火墙只作用于 agent
    经 Bash 工具启动的进程、不覆盖 MCP，且官方承认可能被绕过。
    - ③ Business / Enterprise 需管理员先启用 agent、模型切换与
    BYOK 策略；仓库可 opt out。索引不用于模型训练。

  fit: >-
    已在 GitHub 生态内（用 PR / Issue / Actions 工作）的人；
    需要最广编辑器覆盖的人（VS Code / JetBrains / Eclipse / Xcode 都能用）；
    企业采购需要额度池治理与管理员支出控制的人。

    只想试 AI 补全的人可用 Copilot Free（有限额度）。

pitfalls:
  - 把 Flex allotment 当固定额度，官方明确说它会变
  - 忽略 Preview 状态的第三方 agent 委派（Claude / Codex）
  - 以为个人档也有额度池共享，Pooled usage 仅 Business / Enterprise
  - 以为 cloud agent 会遵守 content exclusion——官方明说它不遵守

tags: [编程, IDE, 混合, 云端, 协作]
related: [github-mcp, filesystem]

sources:
  - label: GitHub · Copilot 定价与 plans 页（功能逐项对照）
    url: https://github.com/features/copilot/plans
    kind: pricing

  - label: GitHub · Copilot 官方文档
    url: https://docs.github.com/en/copilot
    kind: docs

  - label: GitHub · Copilot 支持的 AI 模型（多厂商清单、按套餐与客户端）
    url: https://docs.github.com/en/copilot/reference/ai-models/supported-models
    kind: docs

  - label: GitHub · 切换模型与自带模型（BYOK / AI Toolkit）
    url: https://docs.github.com/en/copilot/how-tos/use-ai-models/change-the-chat-model
    kind: docs

  - label: GitHub · Copilot cloud agent（后台运行、GitHub Actions 环境、限额）
    url: https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent
    kind: docs

  - label: GitHub · 仓库语义索引（semantic code search）
    url: https://docs.github.com/en/copilot/concepts/context/repository-indexing
    kind: docs

  - label: GitHub · Content exclusion（内容排除与限制）
    url: https://docs.github.com/en/copilot/concepts/context/content-exclusion
    kind: docs

  - label: GitHub · Copilot Memory（跨会话记忆，public preview）
    url: https://docs.github.com/en/copilot/concepts/agents/copilot-memory
    kind: docs

  - label: GitHub · 自定义指令（个人 / 仓库 / 组织与优先级）
    url: https://docs.github.com/en/copilot/concepts/prompting/response-customization
    kind: docs

  - label: GitHub · cloud agent 防火墙（域名 / URL 允许清单与限制）
    url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall
    kind: docs

  - label: GitHub · Changelog（Copilot 标签）
    url: https://github.blog/changelog/label/copilot/
    kind: changelog

link:
  url: https://github.com/features/copilot
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

**形态最广、生态最依附 GitHub** 的一个——从网站到 CLI 到主流编辑器全覆盖，且能把任务委派给 Claude / Codex（Preview）。

## 本分区的形态覆盖之最

| 形态 | Copilot 是否覆盖 |
|---|---|
| GitHub 网站 / Mobile | ✅ |
| Copilot app | ✅ |
| Copilot CLI | ✅ |
| VS Code / Visual Studio / JetBrains / Eclipse / Xcode | ✅ |
| Codespaces 云端环境 | ✅ |
| 云端 agent | ✅ |

**没有任何其他对象能覆盖这么多形态。**

## 三个值得单独记录的能力

### ① 可委派任务给第三方 agent（Preview）

官方 plans 页原文：

```
Delegate tasks to third-party coding agents like Claude by Anthropic
and OpenAI Codex (Preview)
```

**这是本分区里唯一明确写出「能把任务交给竞品 agent」的对象。**

含义：**Copilot 正在从「自己干活」转向「调度别人干活」**。
它把自己定位成任务分发层，而非模型的唯一提供方。

**注意标注是 Preview。**

### ② 额度机制有三层

从 plans 页可见的机制：

| 机制 | 说明 |
|---|---|
| **Base credits** | 各档位的基础额度 |
| **Flex allotment** | 变量额外用量，**官方明确标注「Flex allotments may change over time」** |
| **Purchase additional GitHub AI Credits** | 可额外购买额度 |
| **Pooled usage** | **组织内共享额度 + 管理员支出控制**（Business / Enterprise 专有） |

**Flex allotment 那句话值得单独记**：
官方主动声明它会变——这意味着它**不能被当作可依赖的固定额度**。

### ③ 企业侧的额度治理

```
Pooled usage
Included AI credits are shared org-wide with admin controls for spending.
```

**组织内共享 + 管理员支出控制**——
这在个人档完全不可用，是企业采购时的关键能力。

## 功能逐项对照（官方 plans 页结构）

从采集到的对照表可见，档位差异主要在这些项：

| 功能 | 覆盖情况 |
|---|---|
| Editors and IDEs | 多编辑器支持 |
| GitHub（github.com + Mobile） | 覆盖 |
| Agent mode | 多档位提供（VS Code / Visual Studio / JetBrains / Eclipse / Xcode） |
| Integrates with MCP servers | 覆盖 |
| Custom instructions and agents | 覆盖 |
| App modernization for Java and .NET | 部分档位 |
| Assign work and create a pull request | 部分档位 |
| Code review（PR 审查） | 覆盖 |
| **File diff reviews in code editors** | **仅更高档** |
| **Custom instructions with instructions.md** | **仅更高档** |
| **Cloud agent** | **部分档位** |
| 第三方 agent 委派（Claude / Codex） | **标注 Preview** |

## 官方生态位：MCP Registry 是平台级能力

值得注意的是，GitHub 把**「MCP Registry / Integrate external tools」**
放在**平台导航的显眼位置**，与 Copilot app 并列。

**这说明 MCP 在 GitHub 的战略里不只是「一个插件」，而是平台级基础设施。**

对本仓库的意义：
工具分区的条目如果哪天要选一个上游，
**GitHub 的 MCP Registry 是一个候选分发渠道**。

## 适合与不适合

已在 GitHub 生态内（用 PR / Issue / Actions 工作）的人。
需要最广编辑器覆盖的人（VS Code / JetBrains / Eclipse / Xcode 都能用）。
企业采购需要额度池治理与管理员支出控制的人。

**不适合**依赖第三方 agent 委派的场景（官方标注为 Preview）。
报价与档位见官方 plans 页（本站按 D9 口径不存价格数字）。

## 采集限制

| 页面 | 状态 |
|---|---|
| plans 页 | ✅ 取到 71K 字符，功能逐项对照完整 |
| docs.github.com | ✅ 2026-10-08 已取到模型、cloud agent、索引、内容排除、Memory、指令、防火墙等页 |
| Changelog | ✅ 取到 5838 字符 |

**confidence: partial 的依据**：第三方 agent 委派（Preview）的实际可用范围未核验。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测**第三方 agent 委派（Preview）**的实际可用性——
这是本分区唯一有这个能力的对象，值得先验证。

## 未知项清单

- 第三方 agent 委派（Claude / Codex）的实际可用范围（官方标注 Preview）
- 企业策略对可用能力的完整影响面
- cloud agent 防火墙被绕过的实际边界（官方自称可能被绕过）

## 相关条目

- [Cursor](./cursor.md) — 同分区，架构更激进（自托管 + 子智能体编排）
- [Windsurf](./windsurf.md) — 同分区，已改称 Devin Desktop
