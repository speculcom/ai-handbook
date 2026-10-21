---
id: memory
track: mcp
tasks: ["read-files"]
name: Knowledge Graph Memory Server
vendor: Model Context Protocol
homepage: https://github.com/modelcontextprotocol/servers/tree/main/src/memory
mark: M
accent: "#7B61FF"

axes:
  model_access: >-
    本身不调用模型，是被客户端调用的接口实现。

    设计与 Claude 的持久记忆场景绑定（README 明言**「lets Claude remember information about the user across chats」**）。
  runtime: >-
    本地 Node.js 进程，通过 stdio 通信。

    数据持久化在本地 JSONL 文件，生命周期独立于客户端进程。
  local_files: >-
    **只访问自己的记忆文件**（默认在 memory 目录下），不提供任意文件读写工具。

    存储位置可通过参数指定，实际可访问范围取决于该路径的权限。
  background: >-
    server 进程随客户端生死，

    但**记忆数据持久存在磁盘上，重启后仍在**。

    2026-09-03 修复了图变更序列化以避免并发写竞争。
  tools: >-
    提供 9 个工具：

    - create_entities、create_relations、add_observations、delete_entities、delete_observations、delete_relations、read_graph、search_nodes、open_nodes。

    另暴露一个 resource：`memory://knowledge-graph`。

    **含 3 个删除工具**（delete_entities / delete_observations / delete_relations），
    输出为结构化 JSON，可直接消费。
  context: >-
    **这是本 server 的核心能力**：跨会话持久记忆。

    用知识图谱结构存储实体、关系与观察，
    支持检索（search_nodes）与按名读取（open_nodes）。
  permissions: >-
    **无独立审批机制**。

    记忆图谱是全局共享状态，**任何写入都会影响后续所有会话**。

    提供 3 个删除工具，可删除实体、观察与关系。

    2026-09-03 增加了 search_nodes 查询长度限制与去重修复。
  fit: >-
    让 Agent 跨会话记住用户偏好、项目背景等长期信息。

    不适合存放需要审计或追溯的场景（图谱会原地修改）。

pitfalls:
  - 以为记忆只存在于当前会话，实际是磁盘持久化的全局状态
  - 以为删除操作需要审批，实际没有，误删会影响后续所有会话
  - 以为它是简单的 key-value 存储，实际是知识图谱结构

mcp:
  transport: >-
    仅 stdio。本地 Node.js 进程，通过标准输入输出通信（npx 启动）。

    官方 README（2026-10-08 全文核验）没有远程传输的官方启动方式。
  auth: >-
    无独立认证层。stdio 形态继承客户端用户权限。

    记忆文件本身无加密，**任何能读该文件的进程都能获取全部记忆内容**。
  scope: >-
    **作用域最窄的一类**：只读写自己的记忆文件，不提供任意文件访问工具。

    权限风险不在文件范围，而在**内容敏感度**——

    记忆里可能有用户偏好、项目信息等隐私，
    且文件无加密、无独立访问控制。

tags: [记忆, 本地, 读写]
related: [hermes-agent]

sources:
  - label: MCP · Memory Server
    url: https://github.com/modelcontextprotocol/servers/tree/main/src/memory
    kind: docs

  - label: MCP · Memory 目录变更历史
    url: https://github.com/modelcontextprotocol/servers/commits/main/src/memory
    kind: changelog

  - label: MCP · Servers Releases
    url: https://github.com/modelcontextprotocol/servers/releases
    kind: changelog

  - label: MCP · Servers 仓库 README（生产环境免责声明）
    url: https://github.com/modelcontextprotocol/servers
    kind: repo

link:
  url: https://www.npmjs.com/package/@modelcontextprotocol/server-memory
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

用本地知识图谱做跨会话持久记忆的 reference server。**它记忆落盘、跨会话共享，但没有访问控制**。

## 变更记录说明

**本对象无独立 changelog 页**，变更记录在目录 commit 历史中：

| 日期 | 内容 |
|---|---|
| 2026-09-03 | 序列化图变更，避免并发写竞争 |
| 2026-09-03 | 单批次内跳过重复实体与关系 |
| 2026-09-03 | 限制 `search_nodes` 查询长度 |

**三条修复集中在同一天（09-03）**，说明这一版对稳定性做了集中处理。特别是「并发写竞争」——说明多会话同时读写记忆曾有数据损坏风险。

**如果你在多会话环境用它，这三条值得读原文。**

## 数据结构

| 概念 | 说明 | 示例 |
|---|---|---|
| **Entity** | 图谱节点，有唯一名称、类型、观察列表 | `{name: "X", entityType: "person", observations: [...]}` |
| **Relation** | 实体间的有向连接 | `{from: "A", to: "B", relationType: "works_at"}` |
| **Observation** | 挂在实体上的原子事实 | 建议一条观察只存一个事实 |

**关系用主动语态存储**，如 `works_at` 而非 `works at`。这是文档里的明确约定。

## 工具清单与读写属性

| 工具 | 属性 | 说明 |
|---|---|---|
| `read_graph` | 读 | 读取整张图 |
| `search_nodes` | 读 | 按条件检索节点 |
| `open_nodes` | 读 | 按名读取特定节点 |
| `create_entities` | **写** | 新建实体 |
| `create_relations` | **写** | 新建关系 |
| `add_observations` | **写** | 给实体追加观察 |
| `delete_entities` | **删除** | 删除实体及其关联 |
| `delete_observations` | **删除** | 删除观察 |
| `delete_relations` | **删除** | 删除关系 |

**6 读 3 写 3 删除**。删除能力给了三个工具，是本条目里最厚的一组。

## 权限风险的特点

和其他 MCP server 不同，memory 的风险**不在文件范围，在内容**：

| 维度 | 评价 |
|---|---|
| 文件访问范围 | **最窄** — 只碰自己的记忆文件 |
| 写入影响 | **全局** — 影响后续所有会话 |
| 内容敏感度 | **高** — 可能存有用户偏好、项目信息 |
| 访问控制 | **无** — 文件无加密，无独立鉴权 |

**任何能读到那个 JSONL 文件的进程，都能拿到全部记忆。**

如果你用它存敏感信息，这一点必须考虑。

## 与 filesystem 的对比

| 维度 | filesystem | memory |
|---|---|---|
| 访问范围 | 目录白名单（可很宽） | **仅自己的记忆文件（很窄）** |
| 删除能力 | 不提供 | **提供 3 个删除工具** |
| 持久化 | 无状态 | **图谱持久化到磁盘** |
| 跨会话 | 不支持 | **核心能力** |

**取舍很清楚**：memory 用「能力受限但内容敏感」换取「跨会话能力」。

## 适合与不适合

让 Agent 跨会话记住用户偏好、项目背景等长期信息。

**不适合存放需要审计或追溯的场景**（图谱会原地修改），
**也不适合存放高敏感信息**——记忆文件无加密、无独立访问控制，
任何能读该文件的进程都能拿到全部记忆。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

## 未知项清单

- 记忆文件的默认位置与命名
- 是否支持 Streamable HTTP（仓库未声明）
- 存储后端是否可替换（是否只支持 JSONL）
- 并发写的最终一致性保证程度

## 相关条目

- [Sequential Thinking MCP Server](./sequential-thinking.md) — 推理结构化方向
- [Filesystem MCP Server](./filesystem.md) — 若需自行管理记忆文件，可用它替代
