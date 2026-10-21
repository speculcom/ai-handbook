---
id: fetch
track: mcp
tasks: ["web"]
name: Fetch MCP Server
vendor: Model Context Protocol
homepage: https://github.com/modelcontextprotocol/servers/tree/main/src/fetch
mark: F
accent: "#FF6B6B"

axes:
  model_access: >-
    本身不调用模型，是被客户端调用的接口实现。
    核心是把网页 HTML 转换为 Markdown，便于 LLM 消费。

  runtime: >-
    本地 **Python** 进程，通过 stdio 通信。
    依赖 Python MCP SDK 1.x（要求 mcp>=1.29.0,<2），SDK 2.0 重命名了该 server 使用的 API。

    2026-08-30 修复了容器 bind mount 在 Docker / Podman / SELinux 下的安全与兼容问题。

  local_files: >-
    **无文件读写工具**。核心能力是网络抓取，不涉及本地文件。

  background: >-
    不支持。单次抓取为同步操作，随客户端进程结束。

  tools: >-
    提供 fetch 工具获取网页内容并转换为 Markdown。
    输出为转换后的文本，**结构化程度取决于目标页面本身**。

  context: >-
    无状态。每次调用独立，不保留历史抓取记录。

  permissions: >-
    **官方明确警告安全风险**：README 声明本 server
    **可访问本地与内网 IP 地址，可能构成安全风险**。
    需谨慎使用，确保不会暴露敏感数据。
    无独立审批机制，无法限制目标地址范围。

  fit: >-
    把公开网页内容转成 Markdown 供 Agent 读取。
    **不适合在能访问内网的环境中使用**，
    也不适合需要登录态的页面。

pitfalls:
  - 在内网可达的环境里直接启用，官方明确警告可访问本地与内网 IP
  - 以为它能抓需要登录的页面，它只是无状态抓取
  - 以为输出是干净的 Markdown，实际结构随目标页面变化

mcp:
  transport: >-
    支持 stdio，**并提供容器部署方式（Docker / Podman）**。
    2026-08-30 修复了 bind mount 的安全与兼容问题（含 SELinux）。

    官方 README（2026-10-08 全文核验）只给本地进程接入：
    uvx / pip / Docker；没有远程传输的官方启动方式。

  auth: >-
    无独立认证层。stdio 形态继承客户端用户权限。
    **容器形态的认证配置仓库未说明。**

  scope: >-
    **风险最高的一类**：文件范围无限制（不涉及文件），
    但**网络范围无法收敛**——
    官方警告它可访问本地与内网 IP。
    无地址白名单、无审批机制。
    在生产或含内网服务的环境中使用前必须评估。

tags: [检索, 网络, 只读]
related: [grok-bot]

sources:
  - label: MCP · Fetch Server（含官方安全警告）
    url: https://github.com/modelcontextprotocol/servers/tree/main/src/fetch
    kind: docs

  - label: MCP · Fetch 目录变更历史
    url: https://github.com/modelcontextprotocol/servers/commits/main/src/fetch
    kind: changelog

  - label: MCP · Servers Releases
    url: https://github.com/modelcontextprotocol/servers/releases
    kind: changelog

  - label: MCP · Servers 仓库 README（生产环境免责声明）
    url: https://github.com/modelcontextprotocol/servers
    kind: repo

link:
  url: https://github.com/modelcontextprotocol/servers/tree/main/src/fetch
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

把网页内容转成 Markdown 的 reference server，**官方在其 README 里明确标注了安全警告：它能访问本地与内网 IP**。

## ⚠ 官方安全警告（原文）

> **CAUTION**
> This server can access local/internal IP addresses and may represent a security risk.
> Exercise caution when using this MCP server to ensure this does not expose any sensitive data.

**翻译**：本 server 能访问本地与内网 IP 地址，可能构成安全风险。
使用时务必谨慎，确保不会暴露敏感数据。

**这是本分区里官方自己标注风险最明确的一个**，
也是本站认为最有价值的一条一手信息——因为这类警告极少见，
大多数同类工具只会写「使用前请注意安全」。

## 为什么这个风险值得单独说

| 场景 | 风险 |
|---|---|
| 内网有数据库管理面板（`10.x` / `192.168.x`） | Agent 可能抓到内网页面 |
| 云环境 metadata 服务（如 `169.254.169.254`） | 可能拿到实例元数据与凭据 |
| 本机有开发服务器 | 可能抓到本机服务的响应 |
| Agent 被诱导抓取恶意 URL | 可探测内网拓扑 |

**关键**：没有地址白名单，也没有审批机制。
一旦启用，Agent 就有了探测内网的通道。

## 变更记录说明

**本对象无独立 changelog 页**，变更记录在目录 commit 历史中：

| 日期 | 内容 |
|---|---|
| 2026-08-30 | 修复容器 bind mount 安全与兼容问题（Docker / Podman / SELinux） |
| 2026-08-18 | 文档补充 Python MCP 1.x 版本要求 |
| 2026-08-18 | 固定依赖 `mcp>=1.29.0,<2` |
| 2026-07-29 | uv 依赖批量更新 |

**两条值得注意**：

- **08-18 的版本固定**：SDK 2.0 重命名了本 server 使用的 API，官方明确锁在 1.x。
  如果你的环境装了 SDK 2.x，这个 server 可能起不来。

- **08-30 的容器修复**和 git / time 是同一条 commit（#2205），说明这三个 server 有共同的容器化问题。

## 输出质量评估

**输出结构取决于目标页面本身**，不是统一 schema：

| 目标页面类型 | 输出质量 |
|---|---|
| 文档站（结构规整） | 好 |
| 博客正文 | 中 |
| 单页应用（内容由 JS 渲染） | **差** — 抓不到正文 |
| 需要登录的页面 | **失败** |
| 纯图片 / PDF | 不可用 |

**这不是 server 的缺陷，但它决定了这个工具的适用边界。**

## 部署建议

如果确实要用，在以下条件下才考虑：

| 条件 | 说明 |
|---|---|
| 隔离网络环境 | 不与内网服务同网段 |
| 或容器化并限制出网 | 白名单出站，只允许目标域名 |
| 且不接受内网访问需求 | 因为它无法被限制 |

**注意**：容器化本身不解决这个风险——
容器内依然能访问宿主网络，除非配置网络策略。

## 适合与不适合

把公开网页内容转成 Markdown 供 Agent 读取。

**不适合在能访问内网的环境中使用**（官方明确警告）。
也不适合需要登录态的页面，或内容由 JS 渲染的单页应用。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：这个 server 的实测**不应在含内网敏感服务的环境中进行**。
建议在隔离容器或测试网络中验证抓取成功率与输出质量。

## 未知项清单

- 是否支持 Streamable HTTP（仓库未声明）
- 是否有超时与重试策略
- 大页面的截断行为
- 容器形态下的认证配置

## 相关条目

- [Sequential Thinking MCP Server](./sequential-thinking.md) — 权限风险最低的对照
- [Filesystem MCP Server](./filesystem.md) — 文件方向，权限设计更保守
