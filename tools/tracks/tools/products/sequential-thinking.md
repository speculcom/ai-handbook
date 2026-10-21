---
id: sequential-thinking
track: mcp
tasks: ["extend"]
name: Sequential Thinking MCP Server
vendor: Model Context Protocol
homepage: https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking
mark: S
accent: "#4ECDC4"

axes:
  model_access: >-
    本身不调用模型，是被客户端调用的接口实现。
    **本 server 不产生智能，只提供结构**——
    它约束的是 Agent 调用它的方式（逐步思考并允许修订），
    真正的推理仍由客户端背后的模型完成。
  runtime: >-
    本地 Node.js 进程，通过 stdio 通信。无文件与网络访问需求。
  local_files: >-
    **无任何文件访问能力**。不提供读写工具，是本分区权限最窄的一类。
  background: >-
    不支持。纯计算型工具，无状态，无需后台。
  tools: >-
    **仅 1 个工具** `sequential_thinking`，

    参数包含：

    - thought
    - thoughtNumber
    - totalThoughts
    - nextThoughtNeeded

    以及修订（isRevision / revisesThought）与
    分支（branchFromThought / branchId）控制。

    输出为结构化对象。
  context: >-
    无跨会话记忆。每次调用接收完整的思考文本，
    修订与分支通过参数显式传递，不依赖服务端存储。
  permissions: >-
    **无任何权限风险**：不访问文件、不访问网络、不写任何状态。
    全部权限就是「能调用一个纯函数」。
  fit: >-
    让 Agent 用结构化、可修订、可分支的方式推进复杂问题的分析。
    不适合简单任务（增加调用轮次无收益）。

pitfalls:
  - 以为它能让模型变聪明，实际只约束输出结构，推理能力来自模型本身
  - 以为会记住之前的思考，实际每次调用要自己带上完整上下文
  - 以为工具越多越好，本 server 只有一个工具且是有意设计

mcp:
  transport: >-
    仅 stdio。npx / Docker 本地进程（2026-10-08 README 全文核验）；
    没有远程传输的官方启动方式。Docker 镜像为 mcp/sequentialthinking。
  auth: >-
    无独立认证层，但**这是本分区唯一无实质权限边界的 server**——
    无文件、无网络、无状态，认证与否不影响安全。
  scope: >-
    **无文件与网络访问，不读不写任何外部资源**。
    权限范围为空，是 MCP server 里权限风险最低的一类。
    可放心在敏感环境使用。

tags: [推理, 本地, 只读]
related: [langgraph]

sources:
  - label: MCP · Sequential Thinking Server
    url: https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking
    kind: docs

  - label: MCP · Sequentialthinking 目录变更历史
    url: https://github.com/modelcontextprotocol/servers/commits/main/src/sequentialthinking
    kind: changelog

  - label: MCP · Servers Releases
    url: https://github.com/modelcontextprotocol/servers/releases
    kind: changelog

  - label: MCP · Servers 仓库 README（生产环境免责声明）
    url: https://github.com/modelcontextprotocol/servers
    kind: repo

link:
  url: https://www.npmjs.com/package/@modelcontextprotocol/server-sequential-thinking
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: active
confidence: verified
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

提供单个 `sequential_thinking` 工具，让 Agent 以**可修订、可分支**的方式逐步推进复杂问题——**它不产生智能，只产生结构**。

## 变更记录说明

**本对象无独立 changelog 页**，变更记录在目录 commit 历史中：

| 日期 | 内容 |
|---|---|
| 2026-09-03 | 声明 zod 运行时依赖 |
| 2026-08-28 | 恢复 `nextThoughtNeeded` 在 inputSchema required 数组中的声明 |
| 2026-08-28 | 从 package.json 读取 server 版本（不再硬编码） |
| 2026-07-29 | 依赖批量更新 |

**08-28 那条 schema 修复值得注意**：`nextThoughtNeeded` 曾被错误地从 required 数组中移除。
如果你的客户端严格校验 schema，这会导致调用被拒。

## 工具设计

**只有一个工具**，参数分四组：

| 组 | 参数 | 作用 |
|---|---|---|
| **进度** | `thought` `thoughtNumber` `totalThoughts` `nextThoughtNeeded` | 当前这一步是什么、总共几步、是否还需继续 |
| **修订** | `isRevision` `revisesThought` | 承认要改前面的某一步 |
| **分支** | `branchFromThought` `branchId` | 从某一步分出另一条推理路径 |
| **追加** | `needsMoreThoughts` | 中途发现需要更多步骤 |

**「修订」和「分支」是这个 server 的核心价值**——
它让 Agent 在推理过程中回头改，而不是一条路走到底。

## 关键澄清：它不提升模型能力

这是最容易误解的一点。

```
本 server 不调用模型，不做任何推理。
它约束的是客户端的调用方式，推理仍由模型完成。
```

**它解决的是「结构」问题，不是「智力」问题**：

| 它做的 | 它不做的 |
|---|---|
| 让推理分步可见 | 让模型更聪明 |
| 允许中途修订 | 提高结论正确率 |
| 支持并行分支探索 | 减少 token 消耗（相反会增加） |
| 让调用方能观察过程 | 替代思考预算控制 |

**简单任务上用它会增加调用轮次而无收益。** README 自己列的适用场景也限定在：
分解复杂问题、可能需要修正的分析、初期范围不明确的任务、需要过滤无关信息的长任务。

## 权限评价

**MCP server 里权限风险最低的一类**，可以放心在敏感环境使用：

| 检查项 | 结果 |
|---|---|
| 读文件 | ❌ 无 |
| 写文件 | ❌ 无 |
| 访问网络 | ❌ 无 |
| 持久化状态 | ❌ 无 |
| 删除能力 | ❌ 无 |

全部权限就是「能调用一个纯函数」。这类 server 值得单独指出——
它说明 MCP 生态里也有零风险的工具，不全是权限敏感型。

## 适合与不适合

让 Agent 用结构化、可修订、可分支的方式推进复杂问题分析：
分解复杂问题、可能需要修正的分析、初期范围不明确的任务。

**不适合简单任务**——它不提升模型能力，只约束输出结构，
增加调用轮次而无收益。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：这类 server 的实测重点在**调用轮次与 token 成本**，
而不是能否完成任务。要对比「用 / 不用」在同一任务上的总 token 与轮次差异。

## 未知项清单

- 是否支持 Streamable HTTP（仓库未声明）
- 分支是否需要在调用方侧维护完整上下文树
- 与客户端内置推理能力的重叠程度

## 相关条目

- [Memory MCP Server](./memory.md) — 跨会话记忆方向（有持久化与删除能力）
- [Filesystem MCP Server](./filesystem.md) — 文件操作方向（权限敏感型）
