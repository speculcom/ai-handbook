---
id: windsurf
track: ide
tasks: ["write-code"]
name: Windsurf / Devin Desktop
vendor: Cognition
homepage: https://windsurf.com
mark: W
accent: "#0B9D8C"

axes:
  model_access: >-
    **Pro 档明确列出供应商**：OpenAI、Claude、Gemini、**SpaceXAI**
    以及领先开源模型。

    **自有模型 SWE-2 官方标注「Free use of SWE-2」**，
    定价页顶部另标注**「SWE-2, our latest model, is now available」**。

    **Free 档标注「有限模型可用性」（Limited model availability）。**

  runtime: >-
    **重要变更：Windsurf 已改称 Devin Desktop**——

    官方文档标题为「agent-native editor」的稳定版本发布说明，
    下载页同时提供 macOS（Apple Silicon / Intel）、
    Windows（arm64 / x64）与 Linux x64 for Debian。

    **支持 SSH 或 WSL 主机上的文件夹选择**。

  local_files: >-
    本地编辑器，直接读写工作区。**官方 context-awareness 页原文**：
    "The entire local codebase is then indexed (including files that are
    not open)"——**整个本地代码库会被 RAG 上下文引擎索引**，检索时按需取片段。

    Pro 档有更大索引上限与上下文长度；**Teams / Enterprise 可索引远端仓库**。

    `.gitignore` 内文件默认不对 Cascade 开放（Cascade Gitignore Access
    默认关闭）；`.codeiumignore` 可排除路径。

    **Fast Context 是专门检索子代理**
    （SWE-grep / SWE-grep-mini 模型，仅用 grep / read / glob，
    最多 4 轮、每轮至多 8 个并行工具调用）。亦可拖文件到面板或把选区发到聊天。

  background: >-
    **真后台来自 Devin Cloud**：官方 `windsurf/devin` 页原文
    "Each Devin session runs on its own VM with a desktop, browser,
    and computer use, so it can keep working after you close your laptop"——

    每个 Devin 会话跑在自己的云端 VM，**关掉笔记本仍继续**。
    可在本地用 Cascade 制定计划后一键交给 Devin 云端实现，
    会话出现在 Agent Command Center。

    本地 Cascade 与 Devin Local
    则在你机器上运行（Devin Local **"operates on your machine"**），需客户端常驻。

    注意 Devin Cloud 访问在逐步放开（rolling out），Enterprise 需管理员开启。

  tools: >-
    **支持 Agent Client Protocol（ACP）**——
    文档站有**「Agent Client Protocol (preview)」**与
    **「Building a custom ACP agent」**两个专页，说明 ACP 处于 preview 阶段。

    **MCP 支持有一个重要细节**：

    changelog 记录 ACP 客户端传入的 MCP server
    现在可被智能体使用并列出，
    **包括 HTTP 与 SSE 类型的 MCP server**。

  context: >-
    **Memories 机制已核到**（官方 `cascade/memories` 页）：Cascade
    在对话中自动生成并存储 memory，也可让它「create a memory」；

    memory 与工作区绑定、存本地 `~/.codeium/windsurf/memories/`、
    不提交仓库、**不消耗 credits**，Cascade 认为相关时自动检索。

    跨会话持久化官方推荐用 Rules（global / workspace / system 三级，
    `.windsurf/rules/*.md`）或 `AGENTS.md`。**另有会话历史**：

    changelog 记录切回最近查看过的 10 个会话之一时，会立即显示其 transcript。

    底层上下文引擎为 RAG（官方 M-Query 检索）。

  permissions: >-
    **有明确的安全机制与 CVE 修复记录**：
    changelog 记录修复了 Restricted Mode 的一个绕过
    （CVE-2026-81376）——
    原本只检查点号形式的受限工作区设置，
    现在也检查嵌套对象形式。

    **这条值得注意：受限模式曾可被嵌套对象绕过。**

  fit: >-
    需要多模型供应商可选（不想被单一模型绑定）的人；
    需要 ACP 以接入自定义 agent 的人（注意是 preview）；
    需要远程主机（SSH / WSL）支持的人。
    Free 档适合只需要无限 inline edits 与无限 Tab 补全的人。

pitfalls:
  - 不知道产品已改称 Devin Desktop，搜 Windsurf 可能找不到对应文档
  - 以为 Teams 是单一按席位计费，实际是「方案月费 + 席位费」两层
  - 以为加购用量有折扣，官方说明按 API 价格计

tags: [编程, IDE, 混合, 云端]
related: [playwright]

sources:
  - label: Windsurf · 官方定价页（Free / Pro / Teams 结构与能力）
    url: https://windsurf.com/pricing
    kind: pricing

  - label: Windsurf · 官方 Changelog（Devin Desktop 发布说明 + CVE 修复）
    url: https://windsurf.com/changelog
    kind: changelog

  - label: Windsurf · 官方文档
    url: https://docs.windsurf.com
    kind: docs

  - label: Windsurf · ACP 文档（preview）
    url: https://docs.windsurf.com
    kind: docs

  - label: Windsurf · 官方文档 · Context Awareness（RAG 索引、Fast Context、远端仓库索引）
    url: https://docs.windsurf.com/context-awareness/overview
    kind: docs

  - label: Windsurf · 官方文档 · Memories & Rules（memory 自动生成、本地存储、Rules 三级）
    url: https://docs.windsurf.com/windsurf/cascade/memories
    kind: docs

  - label: Windsurf · 官方文档 · Devin（云端 agent 独立 VM、关笔记本仍跑、委托流程）
    url: https://docs.windsurf.com/windsurf/devin
    kind: docs

  - label: Windsurf · 官方文档 · Devin Local Agent（本地 harness、子代理、沙箱、权限）
    url: https://docs.windsurf.com/windsurf/devin-local
    kind: docs

link:
  url: https://windsurf.com
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
  direct_note: 官网 devin.ai 直连实测 200。
  direct_note_en: devin.ai measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**已改称 Devin Desktop**（被 Cognition 收购后）——有自研模型 SWE-2、支持 ACP preview、有过 Restricted Mode 的 CVE 修复记录。

## 最重要的一件事：产品已改名

**官方文档站的发布说明标题现在是「Devin Desktop」**，
描述为「agent-native editor」。

这意味着：

- 找 Windsurf 的最新文档可能找不到
- 品牌、版本号、定价体系都跟着 Cognition 走
- **Cognition 同时有 Devin（云端）与 Devin Desktop（编辑器）两条产品线**

**这一条对本站的方法论有验证意义**：
[Methodology 规则 3「不跨层级混排」](../METHODOLOGY.md) 说的正是这类问题——
改名后的产品如果还按旧名收录，会直接导致误导。

## 档位结构：两层计费要特别注意

（报价数字按 D9 口径不存，见官方定价页。）

| 档位 | 关键内容 |
|---|---|
| **Free** | Light quota、**有限模型可用性**、**无限 inline edits**、**无限 Tab 补全** |
| **Pro** | 更高额度含 **OpenAI / Claude / Gemini / SpaceXAI** 前沿模型 + 领先开源模型、完整模型可用性、**SWE-2 免费使用**、**Devin Desktop 与 CLI 有官方标注的限时免费期（2026-10-10 前）**、可访问 Devin Cloud、**加购用量按 API 价格计** |
| **Teams** | **两层计费：方案月费 + 按全职开发者席位计价**，最多 200 用户，协作与集中计费 |

**三个容易踩的点**：

| 误解 | 实际 |
|---|---|
| Teams 只是按席位计费 | **两层**：方案月费 + 席位费 |
| 加购用量有折扣 | **按 API 价格计**，即无折扣 |
| 免费期是长期的 | **2026-10-10 结束**（Devin Desktop 与 CLI） |

## 模型供应：多供应商 + 自研模型

**Pro 档明确列出四家供应商**：
OpenAI、Claude、Gemini、**SpaceXAI**（xAI）。

**自有模型 SWE-2**：

- 定价页顶部标注「SWE-2, our latest model, is now available」
- Pro 档标注「Free use of SWE-2」

**Free 档是「Limited model availability」**——
这是 Free 与 Pro 的核心差异，比额度更值得注意。

## ACP 支持（preview 阶段）

文档站有两个 ACP 专页：

- **Agent Client Protocol (preview)**
- **Building a custom ACP agent**

**这说明 ACP 处于 preview，不是稳定功能。**

**但 changelog 里有一个值得注意的进展**：

```
MCP servers passed by an ACP client ... are now usable by the agent
and listed in ..., including for HTTP and SSE MCP servers
```

**通过 ACP 客户端传入的 MCP server 现在可用了，
包括 HTTP 与 SSE 类型。**

这比官方 reference server 的能力更强 ——
本仓库工具分区里，官方 server 多数只支持 stdio。

## 安全：有过 Restricted Mode 的 CVE

changelog 记录了一处修复：

```
Restricted Mode blocks restricted workspace settings written in
nested object form, not just the dotted form (CVE-2026-81376).
```

**翻译**：受限模式原本只拦截点号形式（`a.b.c`）写入的受限工作区设置，
现在也拦截嵌套对象形式。

**这条值得单独记录**，因为它揭示了一个真实的权限绕过：
**受限模式曾可被嵌套对象形式绕过。**

对于一个 AI 编程工具，Restricted Mode 是重要的安全边界，
这类修复的存在提醒我们：这个边界曾经比看起来脆弱。

## 平台支持

从下载页可见的覆盖面很广：

| 平台 | 架构 |
|---|---|
| macOS | Apple Silicon / Intel |
| Windows | arm64 / x64 |
| Linux | x64 for Debian |

**并支持 SSH 或 WSL 主机上的文件夹选择**——
说明它能操作远程主机上的目录。

## 适合与不适合

需要多模型供应商可选（不想被单一模型绑定）的人。
需要 ACP 以接入自定义 agent 的人（注意是 preview）。
需要远程主机（SSH / WSL）支持的人。

**不适合**单纯为一个编辑功能付费的人——
Free 档已含无限 inline edits 与无限 Tab 补全。

## 采集限制

| 页面 | 状态 |
|---|---|
| 定价页 | ✅ 三档结构与能力差异已核实（报价数字按 D9 口径不存） |
| 文档站 | ✅ 取到 9772 字符文本 |
| Changelog | ✅ 取到 116K 字符，含多版本发布说明 |

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测两处
（1）**Restricted Mode 的实际约束力**——鉴于它有过 CVE 修复；
（2）ACP 传进来的 HTTP/SSE 类型 MCP server 是否真的可用。

## 未知项清单

以下各项本次未核验，confidence 因此是 partial 而非 verified：

- SWE-2 与第三方模型的优先级关系
- ACP preview 到稳定的时间表
- 索引算法的官方说明（官方只给行为边界，未公开实现）

## 相关条目

- [Cursor](./cursor.md) — 同分区同为「混合 + 云端」形态
- [Cline](./cline.md) — ACP 另一个实现方
