---
id: git
track: mcp
tasks: ["extend"]
name: Git MCP Server
vendor: Model Context Protocol
homepage: https://github.com/modelcontextprotocol/servers/tree/main/src/git
mark: G
accent: "#F14E32"

axes:
  model_access: >-
    本身不调用模型，是被客户端调用的接口实现。
    直接调用本机 git 命令行，继承本机 git 版本与配置。

  runtime: >-
    本地进程，通过 stdio 通信；
    也支持容器部署（Docker / Podman），但需显式挂载仓库目录。

    2026-08-30 修复了容器 bind mount 在 Docker / Podman / SELinux 下的安全与兼容问题。

  local_files: >-
    **通过 git 操作仓库，不需要任意文件读写**。
    每个工具都要求传入 repo_path，作用域限于该 git 仓库。
    仓库内文件内容通过 git show / git_log 等命令间接读取。

  background: >-
    不支持。本地进程随客户端生死；
    容器部署时取决于容器编排方式，不受本 server 自身控制。

  tools: >-
    提供 11 个工具，含：

    - git_status
    - git_diff_unstaged
    - git_diff_staged
    - git_diff
    - git_commit
    - git_add
    - git_reset
    - git_log
    - git_create_branch
    - git_checkout
    - git_show

    **含 4 个写操作**（commit / add / reset / checkout），
    输出为结构化文本或 diff，可直接消费。

  context: >-
    无跨会话记忆。状态完全由 git 仓库本身承载，
    会话断开不影响仓库状态。

  permissions: >-
    **无独立审批机制**。权限边界等于本机 git 用户的文件权限，
    且**具备完整写操作能力**，包括提交、重置暂存区与切换分支。

    git_reset 只取消暂存，不丢弃工作区改动；
    但 git_checkout 可切换到任意分支。

  fit: >-
    让 Agent 读取仓库状态、历史与 diff，并在受控前提下执行提交与分支操作。
    不适合需要 push / PR / 远程仓库管理的场景。本 server 不提供远程操作。

pitfalls:
  - 以为是只读工具，实际能 commit 和切换分支
  - 以为容器部署后能直接访问宿主仓库，不挂载就读不到
  - 以为它能 push 或创建 PR，本 server 只做本地操作

mcp:
  transport: >-
    支持 stdio。README 同时给出容器部署方式（Docker / Podman）

    与 uvx / pip 本地安装（2026-10-08 全文核验）；
    没有远程传输（SSE / Streamable HTTP）的官方启动方式。

  auth: >-
    无独立认证层。stdio 形态继承客户端用户的 git 权限；
    容器形态的认证取决于容器编排配置，仓库未说明。

  scope: >-
    **作用域限定在传入的 git 仓库**，比 filesystem server 更收敛。

    但**具备完整写操作能力**（commit / add / reset / checkout），
    无独立审批。切分支可改变工作区状态，需注意。

tags: [版本控制, 本地, 读写]
related: [aider-cli]

sources:
  - label: MCP · Git Server
    url: https://github.com/modelcontextprotocol/servers/tree/main/src/git
    kind: docs

  - label: MCP · Git 目录变更历史
    url: https://github.com/modelcontextprotocol/servers/commits/main/src/git
    kind: changelog

  - label: MCP · Servers Releases
    url: https://github.com/modelcontextprotocol/servers/releases
    kind: changelog

  - label: MCP · Servers 仓库 README（生产环境免责声明）
    url: https://github.com/modelcontextprotocol/servers
    kind: repo

link:
  url: https://github.com/modelcontextprotocol/servers/tree/main/src/git
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

MCP 官方 reference server 里的版本控制实现。**它作用域限定在指定 git 仓库，但具备完整的本地写操作能力**。

## 变更记录说明

**本对象无独立 changelog 页**，变更记录在目录 commit 历史中：

| 日期 | 内容 |
|---|---|
| 2026-09-02 | 统一 `git_log` 输出 schema，移除 `run` 中的 `raise_exceptions` |
| 2026-08-30 | 修复 Fetch / Git / Time 的容器 bind mount 安全与兼容问题（Docker / Podman / SELinux） |
| 2026-08-18 | 文档补充 fetch、git、time 的 Python MCP 1.x 版本要求 |

**两条值得注意**：

- **09-02 的输出 schema 统一**说明 `git_log` 返回结构变过。如果你在解析它的输出，需要核对版本。
- **08-30 的容器安全修复**说明这些 server 的容器部署路径存在过安全问题，且涉及 SELinux——如果你在企业环境用容器跑，值得读那条 commit。

## 工具清单与读写属性

| 工具 | 属性 | 说明 |
|---|---|---|
| `git_status` | 读 | 工作区与暂存区状态 |
| `git_diff_unstaged` | 读 | 未暂存的改动 |
| `git_diff_staged` | 读 | 已暂存的改动 |
| `git_diff` | 读 | 与目标分支/提交比较 |
| `git_log` | 读 | 提交历史，支持时间过滤 |
| `git_show` | 读 | 某次提交的内容 |
| `git_add` | **写** | 暂存指定文件 |
| `git_commit` | **写** | 提交并返回新 hash |
| `git_reset` | **写** | 取消全部暂存（不动工作区） |
| `git_create_branch` | **写** | 从当前或指定基点建分支 |
| `git_checkout` | **写** | 切换分支，会改变工作区状态 |

**6 读 5 写**。这不是只读工具。`git_checkout` 切分支会直接改变工作区。如果工作区有未提交改动，行为需要特别留意。

## 与 filesystem server 的对比

| 维度 | filesystem | git |
|---|---|---|
| 作用域 | 目录白名单 | 传入的 git 仓库 |
| 写操作 | 有（write / edit / move） | **有且更强**（commit / reset / checkout） |
| 删除 | 不提供 | 不提供 |
| 执行命令 | 不提供 | 内部调用 git 命令行 |
| 认证 | 无（靠进程权限） | 无（靠进程权限） |

**结论**：git server 的写能力更强。但它的作用域限定在 git 仓库内，风险面比 filesystem 小。

## 能力边界

**本 server 只做本地操作**，不提供：

- `git push`
- 创建 PR / Issue
- 远程仓库管理

需要远程操作要另找方案（旧的 github server 已归档，见下文）。

## 已归档的替代方案

原 `github` server 提供仓库管理、文件操作与 GitHub API 集成。它**已归档**至
[servers-archived](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/github)。归档仓库自 2025-05 后基本无更新。

## 适合与不适合

读取仓库状态、历史与 diff，并在受控前提下执行提交与分支操作。
需要明确作用域边界（限于传入的 git 仓库）的场景。

**不适合**需要 push / 创建 PR / 远程仓库管理的场景——
本 server 只做本地操作，原 github server 已归档。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

## 未知项清单

- 是否支持 SSE / Streamable HTTP（仓库未声明）
- 容器形态下的认证机制
- Python MCP 1.x 具体版本下限对功能的影响
- `git_log` 新 schema 的确切结构

## 相关条目

- [Filesystem MCP Server](./filesystem.md) — 同仓库，作用域设计更保守
- [Memory MCP Server](./memory.md) — 跨会话记忆方向
