---
id: filesystem
track: mcp
tasks: ["read-files"]
name: Filesystem MCP Server
vendor: Model Context Protocol
homepage: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
mark: FS
accent: "#4A90D9"

axes:
  model_access: >-
    本身不调用模型，是被客户端调用的接口实现。

    依赖 @modelcontextprotocol/sdk（npm 2026.8.31 实测 ^1.30.0）；
    协议版本在 initialize 握手时由 SDK 与客户端协商，不绑定单一版本。

  runtime: >-
    本地 Node.js 子进程，通过 stdio 与客户端通信。
    生命周期绑定客户端进程，客户端退出即停止。

  local_files: >-
    核心能力。**默认不支持无限制访问**：
    必须通过命令行参数指定允许目录，或客户端支持 Roots 协议动态下发。
    **若无参数启动且客户端不支持 roots，server 在初始化阶段直接报错。**

  background: >-
    不支持。本地 stdio 进程随客户端生死，
    无独立守护或云端执行形态。

  tools: >-
    提供 11 个工具：read_text_file、read_media_file、read_multiple_files、

    write_file、edit_file、create_directory、list_directory、

    list_directory_with_sizes、move_file、search_files、directory_tree。

    输出为结构化内容，可直接消费。

  context: >-
    无状态。每次调用独立，不保留会话记忆。
    list_allowed_directories 可查询当前生效目录。

  permissions: >-
    **无独立审批机制**，权限边界完全由允许目录决定。
    全部文件操作限制在允许目录内，越界会被拒绝。

    **注意：提供 write_file / edit_file / move_file / create_directory，
    属可写但无删除工具的组合。**

  fit: >-
    让 Agent 安全读写指定目录内的文本与媒体文件。
    不适合需要删除操作或需要跨目录聚合的场景。

pitfalls:
  - 以为官方仓库的 server 可以直接上生产，README 明确声明仅供参考实现
  - 不传目录参数就启动，会在初始化阶段报错而不是静默访问全盘
  - 以为没给 write 类工具就不能改文件，write_file / edit_file 确实可写

mcp:
  transport: >-
    仅 stdio。本地 Node.js 进程，通过标准输入输出通信。

    官方 README（2026-10-08 全文核验）只给两种本地启动方式。
    即 npx 与 Docker。它没有远程传输的官方配置。
    目录控制走命令行参数或 MCP Roots（可动态更新）。

  auth: >-
    无独立认证层。stdio 形态继承启动它的客户端用户的全部文件权限。
    权限边界不是认证机制，而是目录白名单。

  scope: >-
    **默认范围窄且强制显式**：必须通过命令行参数指定允许目录，
    或客户端支持 Roots 协议动态下发。
    无参数且客户端不支持 roots 时，server 初始化即报错。

    **不提供删除工具**；提供写入、编辑、移动、建目录。
    可用 list_allowed_directories 查询当前生效目录。

tags: [文件, 本地, 只读, 读写]
related: [claude-code-cli]

sources:
  - label: MCP · Servers Releases（2026.8.31 / 2026.8.18 / 2026.7.10）
    url: https://github.com/modelcontextprotocol/servers/releases
    kind: changelog

  - label: MCP · Filesystem 目录变更历史
    url: https://github.com/modelcontextprotocol/servers/commits/main/src/filesystem
    kind: changelog

  - label: MCP · Filesystem Server
    url: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
    kind: docs

  - label: MCP · Servers 仓库 README（含生产环境免责声明）
    url: https://github.com/modelcontextprotocol/servers
    kind: repo

  - label: MCP · 规范
    url: https://modelcontextprotocol.io/specification
    kind: docs

link:
  url: https://www.npmjs.com/package/@modelcontextprotocol/server-filesystem
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

MCP 官方 reference server 里的文件操作实现。**它是「白名单目录」式访问：必须显式声明允许目录，不允许静默访问全盘**。

## 变更记录说明

**本对象无独立 changelog 页**。变更记录看 MCP servers 仓库的 releases 页。目录级改动看该目录的 commit 历史：

| 日期 | 类型 | 内容 |
|---|---|---|
| 2026-09-03 | fix | 声明 zod 运行时依赖 |
| 2026-08-30 | fix | 拒绝 POSIX 下的 Windows 路径 |
| 2026-08-28 | fix | `create_directory` 不创建父目录 |

仓库整体 releases：2026.8.31 / 2026.8.18 / 2026.7.10。

**注意 08-30 那个修复**。它说明 filesystem server 在不同平台路径语义上出过问题。这是实测时值得关注的点。

## 适合与不适合

让 Agent 在明确指定的目录内读写文本与媒体文件。需要目录边界清晰、
且不需要删除操作时。

**不适合**需要删除操作、需要跨目录聚合，
或需要任意路径访问的场景——本 server 的设计目标就是收紧这个边界。

## ⚠ 生产环境免责声明（适用于全部官方 reference server）

MCP servers 仓库 README 原文：

> The servers in this repository are intended as **reference implementations**
> to demonstrate MCP features and SDK usage. They are meant to serve as
> educational examples for developers building their own MCP servers,
> **not as production-ready solutions**. Developers should evaluate their own
> security requirements and implement appropriate safeguards based on their
> specific threat model and use case.

**翻译**：本仓库的 server 是**参考实现**，用于演示 MCP 特性与 SDK 用法。
它面向正在构建自己 MCP server 的开发者，**不是生产就绪方案**。
使用者需自行评估安全需求并按自身威胁模型实现防护。

> **注意**：这句话适用于本分区所有官方 reference server，
> 每个条目的正文都应保留这一提示。

## 权限设计实测记录

这是本 server 最有价值的设计细节。

| 场景 | 行为 |
|---|---|
| 启动时传目录参数 | 以参数为允许目录 |
| 启动时不传参数 + 客户端支持 Roots | 客户端 roots **完全替换**服务端目录 |
| 启动时不传参数 + 客户端不支持 Roots | **初始化阶段报错** |
| 运行时客户端 roots 变更 | 通过 `roots/list_changed` 通知更新，无需重启 |

**"无参数 + 不支持 roots = 启动失败"这个设计值得肯定**——
它把一个潜在的权限失控（无限制文件访问）变成了显式的失败。

## 工具清单

| 类别 | 工具 |
|---|---|
| 读 | `read_text_file` `read_media_file` `read_multiple_files` |
| 写 | `write_file` `edit_file` |
| 目录 | `create_directory` `list_directory` `list_directory_with_sizes` `move_file` `directory_tree` |
| 检索 | `search_files` |

**注意**：**没有删除工具**。这是有意的权限收敛设计。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

## 未知项清单

- 最低协议版本要求（仓库未声明）
- 是否支持 Streamable HTTP（仓库未声明）
- 输出结构的具体 schema（需读源码或实测）
- 各工具在路径不存在时的错误信息质量

## 相关条目

- [Git MCP Server](./git.md) — 版本控制方向
- [Memory MCP Server](./memory.md) — 跨会话记忆方向
