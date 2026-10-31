---
id: 1password-mcp
form: mcp
name: 1Password Environments MCP Server
vendor: 1Password
homepage: https://developer.1password.com/docs/environments/mcp-server
license: 核心 server 闭源（随 1Password 桌面应用分发）；官方配套插件仓 MIT（1Password/1password-claude-plugin、1password-codex-plugin、1password-kiro-plugin，GitHub API 核验 2026-10-31）。
licenseEn: The core server is closed-source (shipped inside the 1Password desktop app); official companion plugin repos are MIT (1Password/1password-claude-plugin, 1password-codex-plugin, 1password-kiro-plugin, GitHub API verified 2026-10-31).

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的本地 server（stdio，随 1Password 桌面应用跑）。
    它的独特设计是**安全边界在 server 侧**：agent 管理 Environments（密钥托管容器），
    但 server 按设计**永远不会把密钥值返回给客户端**——agent 只见变量名与环境名。
  runtime: >-
    **本地 stdio server，寄生在 1Password 桌面应用内**（官方文档：runs locally as part of the
    1Password desktop app）；启动命令 `1password-mcp`（客户端配置）或经官方插件注册
    （Claude Code /plugin install、Cursor 插件市场、Codex/Kiro 各自线）。
    **要求 MCP 客户端支持 stdio——remote-only 客户端不支持**（官方明写）。
    配套插件仓活跃（codex-plugin 推送 2026-10-29、claude-plugin 推送 2026-10-29）。
  local_files: >-
    能创建**本机挂载的 .env 文件**（locally mounted .env）——密钥按需对进程可用但不写盘
    （官方口径：without writing them to disk）；这是它唯一的「本机面」，且是受控挂载不是自由读写。
  background: >-
    无独立后台——server 进程随 1Password 桌面应用与 MCP 客户端会话；1Password 锁定时
    授权窗口关闭（批准一次后「until 1Password locks」前不再弹授权）。
  tools: >-
    能力清单（官方文档口径）：创建/列出/重命名 Environments；列出 Environment 里的**变量名**
    （不含值）；向 Environment 添加变量；创建本机挂载 .env；列挂载。**没有「读取密钥值」工具**
    ——by design 拿不到值，这是它与一切「凭据读取型」社区 server 的本质分界。
  context: >-
    无 server 侧跨会话记忆；状态在 1Password 云端 Environments（跨设备同步是 1Password 账户能力，
    不是 MCP server 的记忆）。授权按 Environment 粒度批准。
  permissions: >-
    **权限模型是本档案核心**：每次敏感操作触发 1Password 桌面应用的**安全授权弹窗**（per-Environment
    approval）；Enterprise 管理员可在 Policies > Agentic permissions 整体开关 Local MCP server。
    要 1Password 账户 + 桌面应用 + 已建 Environment。beta 阶段（官方标注）。
  fit: >-
    适合：让编码 agent（Claude Code/Codex/Cursor/Kiro）管理开发密钥的「环境侧」——建环境、
    加变量、挂 .env——而 agent 永远接触不到密钥明文；企业可治理（策略开关+审计）。
    不适合：要 agent 运行时直接读密钥值（by design 不行）；remote-only MCP 客户端（要 stdio）；
    不用 1Password 生态的场景。

pitfalls:
  - 把它当「给 agent 读 1Password 密码的 MCP」——by design 密钥值永不回传 agent；它是 Environments（开发密钥容器）管理面，不是密码库读取面
  - 用 remote-only MCP 客户端——官方明写要 stdio 支持，server 在你机器上随桌面应用跑
  - 混淆 Environments 与个人密码库（Vault）——它管的是 Developer Environments（.env 场景），不是浏览器自动填充那个库
  - 企业环境默认以为可用——Enterprise 管理员策略（Agentic permissions > Local MCP server）可整体关掉
  - 把社区「1Password MCP」（读 secret 值那批）当官方——官方只有这一条 Environments 线；读值类全是社区实现，安全模型完全不同

tags: [MCP, 凭据管理, 密钥, 本地stdio, 授权弹窗, 安全边界, beta]
related: [cursor, claude-code]

mcp:
  transport: >-
    **stdio**（command: 1password-mcp；随 1Password 桌面应用）；官方插件线（Claude Code 插件/MCPB、
    Cursor 插件、Kiro Power）替你注册配置。核验：developer.1password.com/docs/environments/mcp-server
    （2026-10-31 直连 200，301→www.1password.dev 同页）。
  auth: >-
    1Password 账户 + 桌面应用登录；敏感操作按 Environment 粒度弹授权窗（批准一次有效到 1Password 锁定）；
    Enterprise 策略开关（Policies > Agentic permissions）。无 API token 概念。
  scope: >-
    Environments 管理面（建/列/改名/加变量/挂 .env）；**无密钥值读取面**（by design）；
    本机面仅受控 .env 挂载。凭据类 MCP 里权限面最保守的一档。

sources:
  - label: 1Password Developer · Environments MCP Server 官方文档（能力清单/授权模型/stdio 要求/企业策略；直连 200）
    url: https://developer.1password.com/docs/environments/mcp-server
    kind: docs
  - label: 1Password · 官方博客「Securing MCP servers with 1Password」（op run 注入模式与 MCP 安全叙事）
    url: https://www.1password.com/blog/securing-mcp-servers-with-1password-stop-credential-exposure-in-your-agent
    kind: changelog
  - label: 1Password/1password-codex-plugin · 官方 Codex 插件仓（MIT；推送 2026-10-29，GitHub API 核验；commits 作变更记录线）
    url: https://github.com/1Password/1password-codex-plugin
    kind: repo
  - label: 1Password/1password-claude-plugin · 官方 Claude 插件仓（MIT；推送 2026-10-29，GitHub API 核验）
    url: https://github.com/1Password/1password-claude-plugin
    kind: repo

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 1Password（加拿大，独立密码管理厂商；官方站点自述品牌）。
  origin_note_en: 1Password (Canada, independent password-manager vendor; per its own official site).
  direct: yes
  direct_note: developer.1password.com 直连 200（301→www.1password.dev 同页 200）；1password.com 直连 200；GitHub 官方仓直连可达（2026-10-31）。
  direct_note_en: developer.1password.com returned 200 direct (301 to www.1password.dev, same page 200); 1password.com returned 200 direct; the official GitHub repos were reachable direct (2026-10-31).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**1Password 官方 Environments MCP server**（本地 stdio，随桌面应用）：凭据类 MCP 的**安全边界判例**——
agent 能建环境、列变量名、加变量、挂本机 .env，但 **by design 密钥值永不回传给 agent**；
敏感操作按 Environment 粒度弹桌面授权窗，企业可策略级开关。beta 阶段；
配套插件仓（Claude/Codex/Kiro）活跃（推送 2026-10-29）。
与社区「读 secret 值」那批 1Password MCP 是本质不同的两回事。

## 适合与不适合

适合：让编码 agent 管开发密钥的环境侧（建/加/挂）而永远不接触明文；企业治理场景。
不适合：要 agent 运行时读密钥值；remote-only MCP 客户端；不用 1Password 生态。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- beta→GA 的时间线与能力变化（官方标 beta，无公开路线图）
- Environments 与 1Password SDK/服务账户/Credential Broker 的能力分工细节（开发者站多线并存，未逐条对照）
- 授权弹窗的审计日志导出面（企业叙事提审计，具体导出格式未核验）

## 相关条目

- [Playwright MCP](./playwright.md) — 权限面两极对照：Playwright 给浏览器全权，1Password 连密钥值都刻意不给——「agent 能碰什么」的两种官方答案。
- [Claude Code](../coding/products/claude-code.md) — 官方插件线宿主之一（/plugin install 1password@1password 注册 MCP 配置）。
