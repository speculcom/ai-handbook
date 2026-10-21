---
id: time
track: mcp
tasks: ["extend"]
name: Time MCP Server
vendor: Model Context Protocol
homepage: https://github.com/modelcontextprotocol/servers/tree/main/src/time
mark: T
accent: "#95A5A6"

axes:
  model_access: >-
    本身不调用模型，是被客户端调用的接口实现。
    使用 IANA 时区名，支持系统时区自动检测。

  runtime: >-
    本地 **Python** 进程，通过 stdio 通信。

    依赖 Python MCP SDK 1.x（要求 mcp>=1.29.0,<2），SDK 2.0 重命名了该 server 使用的 API。

    2026-08-30 修复了容器 bind mount 在 Docker / Podman / SELinux 下的安全与兼容问题。

    推荐用 uvx 直接运行，无需预安装。

  local_files: >-
    **无任何文件访问能力**。不涉及文件读写。

  background: >-
    不支持。单次时间查询为同步操作，随客户端进程结束。

  tools: >-
    提供 2 个工具：`get_current_time`（按指定时区取当前时间）
    与 `convert_time`（时区间转换）。
    输出为结构化时间数据，可直接消费。

  context: >-
    无状态。每次调用独立，不保留历史。

  permissions: >-
    **无实质权限风险**：不访问文件、不访问网络、不写任何状态。
    全部权限是「能查询当前时间和做时区换算」。

  fit: >-
    给 Agent 提供可靠的时间与时区换算能力。
    适合需要避免模型猜时间的场景（如日程、跨时区协作）。

pitfalls:
  - 以为模型自己知道准确时间，需要它取系统时间而非猜
  - 以为能用它做定时任务，它只查询时间，不调度

mcp:
  transport: >-
    支持 stdio，**并提供容器部署方式（Docker / Podman）**。

    2026-08-30 修复 bind mount 安全与兼容问题（含 SELinux），与 fetch、git 属同一条修复 commit（#2205）。

    官方 README（2026-10-08 全文核验）只给本地进程接入（uvx / pip / Docker），没有远程传输的官方启动方式。

  auth: >-
    无独立认证层，但**本 server 无任何外部资源访问**，
    认证与否不影响安全。

  scope: >-
    **无文件与网络访问，不读不写任何外部资源**。
    与 sequential-thinking 同属权限风险最低的一类，可放心在敏感环境使用。

tags: [本地, 只读]
related: [cline]

sources:
  - label: MCP · Time Server
    url: https://github.com/modelcontextprotocol/servers/tree/main/src/time
    kind: docs

  - label: MCP · Time 目录变更历史
    url: https://github.com/modelcontextprotocol/servers/commits/main/src/time
    kind: changelog

  - label: MCP · Servers Releases
    url: https://github.com/modelcontextprotocol/servers/releases
    kind: changelog

  - label: MCP · Servers 仓库 README（生产环境免责声明）
    url: https://github.com/modelcontextprotocol/servers
    kind: repo

link:
  url: https://github.com/modelcontextprotocol/servers/tree/main/src/time
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

只做两件事：查当前时间、换时区。**无文件无网络，是权限风险最低的一类 server。**

## 变更记录说明

**本对象无独立 changelog 页**，变更记录在目录 commit 历史中：

| 日期 | 内容 |
|---|---|
| 2026-08-30 | 修复容器 bind mount 安全与兼容问题（与 fetch、git 同一条 commit #2205） |
| 2026-08-18 | 文档补充 Python MCP 1.x 版本要求 |

**注意**：SDK 2.0 重命名了该 server 使用的 API，官方锁在 `mcp>=1.29.0,<2`。
如果你的环境装了 SDK 2.x，这个 server 可能起不来。

## 工具清单

| 工具 | 参数 | 说明 |
|---|---|---|
| `get_current_time` | `timezone`（IANA 名） | 取指定时区的当前时间 |
| `convert_time` | `source_timezone` `time`（HH:MM） `target_timezone` | 时区换算 |

**用 IANA 时区名**（如 `America/New_York`），不是 UTC 偏移量。
这也是它比「让模型自己算时区」可靠的地方——IANA 名带夏令时规则。

## 权限评价

**MCP server 里权限风险最低的一类**：

| 检查项 | 结果 |
|---|---|
| 读文件 | ❌ 无 |
| 写文件 | ❌ 无 |
| 访问网络 | ❌ 无 |
| 持久化状态 | ❌ 无 |
| 删除能力 | ❌ 无 |

全部权限就是「能问系统现在几点」。这类 server 值得单独指出——
它说明 MCP 生态里也有零风险工具。

## 适合与不适合

| 场景 | 是否适合 |
|---|---|
| 日程安排需要准确时间 | ✅ |
| 跨时区协作 | ✅ |
| 避免模型编造时间 | ✅ |
| **做定时任务 / 调度** | ❌ 它只查询时间，不调度 |

**最后一条是常见误解**——名字叫 time，容易以为能做定时。
实际它只回答「现在几点」和「A 时区的 X 点是 B 时区几点」。

## 安装

官方推荐 `uvx` 直接运行，无需预安装：
```bash
uvx mcp-server-time
```
也支持 `pip install mcp-server-time`。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

## 未知项清单

- 是否支持 Streamable HTTP（仓库未声明）
- 容器形态下的认证配置
- 是否支持夏令时切换的边界情况处理

## 相关条目

- [Sequential Thinking MCP Server](./sequential-thinking.md) — 同属零风险一类
- [Everything MCP Server](./everything.md) — 测试用 server，不适合生产
