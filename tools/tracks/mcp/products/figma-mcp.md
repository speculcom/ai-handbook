---
id: figma-mcp
form: mcp
name: Figma MCP Server
vendor: Figma
homepage: https://developers.figma.com/docs/figma-mcp-server/
license: 闭源官方服务（Figma ToS+套餐约束）；无开源仓——官方开发者文档直抓核验 2026-10-21。
licenseEn: Closed-source official service (Figma ToS + plan gating); no open-source repo — official developer docs direct-fetched 2026-10-21.

axes:
  model_access: >-
    **它自己不调模型**——被 MCP 客户端调用的接口实现。它把 Figma 设计上下文
    （组件、变量、布局数据、Code Connect 映射）喂给编码 agent，让生成代码贴合真实设计系统。
  runtime: >-
    **双形态**：官方托管远程（mcp.figma.com/mcp——直抓 405=存在需鉴权，官方推荐）+
    桌面本地 server（127.0.0.1:3845/mcp，需桌面 app+Dev/Full 席位）。
    官方明写「strongly recommend the remote server」。
  local_files: >-
    桌面形态可把图片资产下载到项目（Download assets 设置项，官方文档直抓所见）；
    远程形态返回资产链接。设计数据在 Figma 云端。
  background: >-
    远程形态在 Figma 侧；桌面形态随桌面 app 生死。无后台任务语义。
  tools: >-
    取设计上下文与代码、FigJam/Make 内容读取、Code Connect 映射、写画布
    （create/update 组件与变量——「write to canvas」，专业及以上套餐）；
    完整清单以开发者文档为准。
  context: >-
    无 server 侧跨会话记忆——设计状态在 Figma 文件本身；Code Connect 是「设计↔代码」映射层不是记忆。
  permissions: >-
    **套餐与席位是硬门槛**：远程 server 各套餐可用但写画布要 Professional+ 且改非草稿文件要 Full 席位；
    桌面 server 要 Dev/Full 席位；**只有 Figma MCP catalog 里的客户端能连**（VS Code/Cursor/Claude Code 等）。
    beta 期免费、将来转用量计费（官方帮助页直抓所见）。
  fit: >-
    适合：设计系统驱动的编码流（agent 按真实组件/变量生成代码）、代码↔画布双向流。
    不适合：不在 MCP catalog 的客户端（要开发者候补名单）；要免费写画布的团队（套餐门槛）。

pitfalls:
  - 把「beta 免费」当永久免费——官方明写将转 usage-based 付费
  - 用 catalog 外的客户端硬连——官方只认 MCP catalog 名单
  - 把桌面 server 当推荐路线——官方 strong recommendation 是远程 server；桌面线是给企业/政府场景的
  - 旧 help.figma.com 文章 URL 已 404——现役文档线在 developers.figma.com（2026-10-21 直抓）

tags: [MCP, 设计系统, 设计转代码, 远程托管, 双形态, 套餐门槛]
related: [cursor, windsurf]

mcp:
  transport: >-
    **Streamable HTTP** 双入口：远程 mcp.figma.com/mcp（推荐）+ 桌面本地 http://127.0.0.1:3845/mcp。
    核验：developers.figma.com 文档直抓（2026-10-21）；端点 405（存在，GET 不接受）。
  auth: >-
    首次连接走 Figma 账号登录（OAuth 语义）；无 token 明文配置路线的官方说明。
    席位类型（Dev/Full）决定能力面。
  scope: >-
    读面：设计上下文、FigJam/Make、Code Connect；写面：画布 create/update（套餐+席位门槛）。
    客户端白名单（catalog）是 Figma 侧的接入闸门——这是它与多数 MCP server 最大的不同。

sources:
  - label: Figma · 官方 MCP 开发者文档（双形态、端点、席位门槛，2026-10-21 直抓核验）
    url: https://developers.figma.com/docs/figma-mcp-server/
    kind: docs
  - label: Figma · 官方帮助中心 MCP 入门（套餐与 beta 计费口径）
    url: https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server
    kind: docs
  - label: Figma · 官方 release notes（changelog）
    url: https://www.figma.com/release-notes/
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Figma, Inc.（美国）。
  origin_note_en: Figma, Inc. (US).
  direct: yes
  direct_note: developers.figma.com 直连实测 200（2026-10-21）；mcp.figma.com 端点直连未单独测。
  direct_note_en: developers.figma.com measured 200 direct (2026-10-21); the mcp.figma.com endpoint not individually measured.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Figma 官方 MCP server**：把设计系统上下文（组件/变量/Code Connect）喂给编码 agent，
还能写画布。三条硬口径：**远程 server 是官方推荐形态**；**只有 MCP catalog 里的客户端能连**；
**beta 免费是暂时的，将来转用量计费**。

## 适合与不适合

适合：设计系统驱动的前端生成流、设计↔代码双向同步团队。
不适合：catalog 外客户端；要永久免费写画布的预算假设。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/mcp/_protocol.md](../../../protocols/mcp/_protocol.md)。

## 未知项清单

- MCP catalog 完整客户端名单（未逐条清点）
- usage-based 计费的定价细则（官方未给数字——D9 口径不采价格）
- 远程与桌面形态的工具差异全表（未逐条对照）

## 相关条目

- [Chrome DevTools MCP](./chrome-devtools-mcp.md) — 同为「agent 接设计/运行时」：DevTools 管浏览器运行时，Figma 管设计系统上下文。
