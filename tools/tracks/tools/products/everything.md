---
id: everything
track: mcp
tasks: ["extend"]
name: Everything MCP Server
vendor: Model Context Protocol
homepage: https://github.com/modelcontextprotocol/servers/tree/main/src/everything
mark: E
accent: "#A29BFE"

axes:
  model_access: >-
    本身不调用模型。**官方明说本 server 不打算成为有用的 server**，
    而是给 MCP 客户端开发者做功能测试用。

    实现了 prompts、tools、resources、sampling 等协议特性以展示 MCP 能力。

  runtime: >-
    本地 Node.js 进程，通过 stdio 通信。
    2026-09-22 修复了会话断开时的订阅清理问题。

  local_files: >-
    测试用途，不提供实际文件访问能力。
    详细的资源与工具清单见仓库 docs/features.md。

  background: >-
    不支持。随客户端进程结束。

  tools: >-
    共 19 个工具，**本站已按仓库 docs/features.md 逐条核对**（2026-10-08）：

    - echo、get-annotated-message、get-env、get-resource-links、

    - get-resource-reference、get-roots-list、gzip-file-as-resource、

    - get-structured-content、get-sum、get-tiny-image、

    - trigger-long-running-operation、toggle-simulated-logging、

    - toggle-subscriber-updates、trigger-elicitation-request、

    - trigger-url-elicitation、trigger-sampling-request、

    - simulate-research-query，以及 sampling / elicitation 的两个 async 变体。

    另有 4 个 prompt 与一批 resource 模板（同见 features.md）。
    输出结构按演示目标设计，**不适合直接消费**。

  context: >-
    无跨会话记忆。测试 server，不提供实用记忆能力。

  permissions: >-
    **不适用于生产环境**，权限边界不是设计目标。
    官方定位是测试工具，未针对生产环境的权限收敛设计。

  fit: >-
    **仅适合一件事：测试你的 MCP 客户端是否正确实现了协议。**
    不适合任何实际任务场景。

pitfalls:
  - 以为是可用的综合工具 server，官方明确说是测试 server
  - 在生产环境启用，官方定位就不是生产就绪
  - 以为工具越多越实用，这里的工具是为演示协议特性而非实用

mcp:
  transport: >-
    支持 stdio（默认，npx 启动）。

    **仓库 README 另文档了两种远程形态**（2026-10-08 核验）：

    Streamable HTTP（`npx @modelcontextprotocol/server-everything streamableHttp`）

    与 SSE（`sse` 子命令；官方标注自 2025-03-26 规范起已弃用）。

  auth: >-
    无独立认证层。**不适用于生产环境**——
    权限设计不是本 server 的目标。
    本条目不记录具体的认证机制，
    因为官方定位就是协议测试工具，生产环境的防护由使用者自行实现。

  scope: >-
    **不适用于生产环境**。
    作为测试工具，其权限范围与实际操作能力均未针对生产场景收敛。
    启用前请确认你的环境不会因此暴露风险。

tags: [本地, 只读]
related: [zed]

sources:
  - label: MCP · Everything Server（官方声明为测试 server）
    url: https://github.com/modelcontextprotocol/servers/tree/main/src/everything
    kind: docs

  - label: MCP · Everything Server Features（19 个工具逐条清单，2026-10-08 核对）
    url: https://github.com/modelcontextprotocol/servers/blob/main/src/everything/docs/features.md
    kind: docs

  - label: MCP · Everything 目录变更历史
    url: https://github.com/modelcontextprotocol/servers/commits/main/src/everything
    kind: changelog

  - label: MCP · Servers Releases
    url: https://github.com/modelcontextprotocol/servers/releases
    kind: changelog

  - label: MCP · Servers 仓库 README（生产环境免责声明）
    url: https://github.com/modelcontextprotocol/servers
    kind: repo

link:
  url: https://github.com/modelcontextprotocol/servers/tree/main/src/everything
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

**不是可用工具**——官方明说这是给 MCP 客户端开发者做功能测试的 server，唯一用途是验证客户端协议实现是否正确。

## 官方定位（原文）

> This MCP server attempts to exercise all the features of the MCP protocol.
> **It is not intended to be a useful server**, but rather a test server for builders of MCP clients.
> It implements prompts, tools, resources, sampling, and more to showcase MCP capabilities.

**翻译**：本 server 试图覆盖 MCP 协议的所有特性。
**它不打算成为有用的 server**，而是给 MCP 客户端构建者的测试 server。
它实现了 prompts、tools、resources、sampling 等，以展示 MCP 能力。

## 为什么仍然收录

一个对比站如果只收录「好用」的工具，会漏掉一件重要的事：
**生态里有哪些东西是为了别的目的存在的。**

收录它的价值：

| 读者 | 得到什么 |
|---|---|
| MCP 客户端开发者 | 一个协议覆盖最全的测试靶子 |
| MCP server 开发者 | 参考实现，看协议特性怎么用 |
| 普通读者 | 学会区分「reference server」和「可用 server」 |

**但它绝不该被当实用工具推荐。**

## 变更记录说明

| 日期 | 内容 |
|---|---|
| 2026-09-22 | 会话断开时清理订阅 |
| 2026-08-28 | 移除 template URI 校验与订阅清理里的死代码 |

**09-22 那条是实质修复**：订阅没在会话断开时清理会导致资源泄漏。

## 与其他 reference server 的区别

| server | 定位 | 能用于实际任务 |
|---|---|:---:|
| `filesystem` | 参考实现 | ✅ |
| `git` | 参考实现 | ✅ |
| `memory` | 参考实现 | ✅ |
| `sequential-thinking` | 参考实现 | ✅ |
| `fetch` | 参考实现 | △ 需评估安全 |
| `time` | 参考实现 | ✅ |
| **`everything`** | **测试工具** | ❌ |

**这一列对比本身就是本站的价值**：光看「都是官方 servers 仓库里的」，
会以为它们性质相同。实际完全不同。

## 适合与不适合

**仅适合一件事**：测试你的 MCP 客户端是否正确实现了协议。

**不适合任何实际任务场景。**
官方定位就是测试工具，工具清单长是为覆盖协议特性，不是为实用。

## 实测记录

本站尚未完成实测。

**这个 server 的「实测」含义不同**：要测的不是它能不能干活，
而是你的 MCP 客户端能否正确处理它暴露的全部协议特性。
测试清单见仓库 `docs/features.md`。

## 未知项清单

> 2026-10-08 A6.2：工具清单已按仓库 `docs/features.md` 逐条核对（19 个工具 + 4 个 prompt），
> transport 也已核到 README 的 Streamable HTTP / SSE 启动文档 ——
> 原降级原因消失，`confidence` 升回 `verified`。

- 协议特性覆盖的完整范围（features.md 已读；其余细节随 SDK 版本演进，以仓库为准）
- SSE 子命令在新版规范下的维护状态（官方已标注弃用，未见移除计划）

## 相关条目

- [Filesystem MCP Server](./filesystem.md) — 真正的可用 reference 实现
- [Time MCP Server](./time.md) — 同为低风险简单实现
