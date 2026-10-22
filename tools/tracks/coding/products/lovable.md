---
id: lovable
form: cloud
name: Lovable
vendor: Lovable
homepage: https://lovable.dev

axes:
  model_access: >-
    官方 FAQ 明示：构建侧模型由 Lovable 选并自动更新，用户不能为 Build/Plan/Chat 模式指定具体模型；
    你自己应用内的 AI 功能可从官方 AI features 页的支持清单选模型（聊天/图像/视频/语音等各有页）。
    企业版有 EU inference（模型请求留在欧洲端点）。
  runtime: >-
    网页端为主形态；官方另有桌面应用、iOS/Android 移动应用、Lovable API（发布项目/管理工作区）、
    Lovable MCP server（把 Lovable 接进 IDE 与外部 agent）。项目在 workspace 内建，
    一个项目对应一个可同步出代码库的应用（官方 welcome 页口径）。
  local_files: >-
    项目代码存在 Lovable 平台内；Git sync 与 GitHub/GitLab/Bitbucket 仓库自动双向同步（官方页明示），
    也可 Download codebase（付费计划）。内置后端（Cloud）由 Lovable 托管，基于 Supabase 开源底座
    （官方 cloud 页明示：数据库/认证/存储/edge functions，无需自建 Supabase）。
    官方「部署托管与所有权」页口径「you are never locked in」：可导出代码、迁移数据、自托管部分或全部栈。
  background: >-
    托管面是产品语义一部分：应用托管随流量自动扩、数据库实例可调（官方 cloud 页）；
    project monitoring 按计划检查应用抓 bug 与访客错误；Subagents 把复杂任务的调研/代码探索拆开并行。
    关闭浏览器后构建任务是否续跑未核验到官方声明。
  tools: >-
    连接器体系官方成页：app connectors（应用调外部服务）、app user connectors（终端用户连自己账号）、
    自定义 REST connector、chat connectors（MCP 服务器，含自定义 remote MCP 与 MCP registries）；
    内置安全扫描 + Aikido/Wiz 集成；Code mode 内置代码编辑器；可把已发布应用反向发布为 MCP server。
  context: >-
    项目会话三模式：Chat（讨论）/Plan（先写结构化计划再执行）/Build（直接实现并验证）；
    cross-project referencing 跨项目复用实现；可从 Replit/Bolt/v0 等导入项目；
    设计系统可接入。跨会话记忆机制未核验到官方声明。
  permissions: >-
    账号 + workspace 体系；企业面官方成页：SSO（Okta/Auth0/Entra/OIDC/SAML）、SCIM 用户开通、
    审计日志（可导出 SIEM/云存储）、Action center（审批发布请求）、workspace 安全中心与敏感数据扫描；
    项目可见性（私有/内部/公开）与 RLS 行级安全策略控制数据访问；个人 2FA。
  fit: >-
    适合：从想法到带数据库/认证/托管的全栈应用一条龙、要 Git 双向同步把代码放进自己仓库、
    企业治理叙事（SSO/SCIM/审计/EU inference）。
    不适合：要指定构建模型（官方明示不能）、要免费把代码下载回本地（Download codebase 是付费计划功能）。

pitfalls:
  - 构建侧模型不能指定（官方 FAQ：Lovable 为 Build/Plan/Chat 模式选模型并自动更新）——
    与 IDE 类工具的「模型选择器」体验完全不同；能选的是你应用内的 AI 功能模型
  - 训练政策按计划分层：官方 FAQ 明示 2026-09-09 起 Free/Pro 的客户数据默认可能用于训练（可在账户设置关闭），
    Business/Enterprise 默认排除——数据边界别按「一个产品一个答案」推断
  - 「代码可导出」不等于「后端可白拿」：内置后端是 Lovable 托管的 Supabase 开源底座，
    数据库迁移与外部托管要走官方迁移路径（deployment-hosting-ownership 页给路径与边界）

tags: [海外, 免费+付费, Web, 桌面, 移动, 全栈, Supabase底座, MCP, Git同步, 企业治理]
related: [bolt-new, v0, replit-agent, supabase-mcp]

sources:
  - label: Lovable 文档 · Welcome（全栈定位/workspace/代码库同步）
    url: https://docs.lovable.dev/introduction/welcome
    kind: official
  - label: Lovable 文档 · Built-in backend（Supabase 底座/托管边界）
    url: https://docs.lovable.dev/features/cloud
    kind: official
  - label: Lovable 文档 · Git sync 总览（GitHub/GitLab/Bitbucket 双向同步）
    url: https://docs.lovable.dev/integrations/git-sync-overview
    kind: official
  - label: Lovable 文档 · 部署托管与所有权（不锁定口径/导出与自托管路径）
    url: https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership
    kind: official
  - label: Lovable 文档 · FAQ（模型不可指定/训练数据政策）
    url: https://docs.lovable.dev/introduction/faq
    kind: official
  - label: Lovable 文档 · Chat connectors（MCP 接入面）
    url: https://docs.lovable.dev/integrations/chat-connectors
    kind: official
  - label: Lovable 文档 · Release Notes（changelog）
    url: https://docs.lovable.dev/changelog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Lovable（瑞典斯德哥尔摩，2023 年创立，前身 GPT Engineer——官方 FAQ 自述）。
  origin_note_en: Lovable (Stockholm, Sweden; founded 2023, formerly GPT Engineer — per the official FAQ).
  direct: yes
  direct_note: docs.lovable.dev 大陆直连实测 200；lovable.dev 首页对脚本请求返回 403（bot 防护），
    浏览器访问路径未由本站实测。
  direct_note_en: docs.lovable.dev measured 200 direct from mainland; the lovable.dev homepage returns
    403 to scripted requests (bot protection); the browser access path was not measured by this site.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve
    the mainland public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Lovable 是瑞典 Lovable 的全栈 AI 建站平台**：自然语言生成带前端/数据库/认证/托管的完整应用，
内置后端基于 Supabase 开源底座，Git 双向同步把代码放进你自己的仓库——
官方口径「never locked in」，但构建模型不能指定、训练数据政策按计划分层。

## 适合与不适合

适合：想法到上线一条龙、Git 同步进自己仓库、企业治理（SSO/SCIM/审计/EU inference）。
不适合：要指定构建模型、要免费把代码下载回本地。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Git 双向同步在两边同时改代码时的冲突实际行为**（官方页讲机制，未给冲突样例）
- **内置后端迁移到自建 Supabase 的实际步骤完整度**（官方有迁移页，未逐步走通）
- **Build 模式关闭浏览器后任务是否续跑**（未核验到官方声明）

## 未知项清单

- 跨会话记忆机制（未核验到官方声明）
- 构建任务离线续跑行为（未核验到官方声明）
- 内置后端的存储区域与数据驻留默认值（EU inference 是企业面，个人/普通计划的区域未逐条核验）
- 当前应用内 AI 功能的完整模型清单（官方页随版本变化，未逐条清点）

## 相关条目

- [Bolt.new](./bolt-new.md) — 同为提示词到全栈应用：Bolt 跑在浏览器内 WebContainers，Lovable 用云端托管后端。
- [v0](./v0.md) — 同为 Vercel 系：v0 绑 Vercel 部署链与 Next.js 栈，Lovable 自带后端与多 Git 平台同步。
- [Replit Agent](./replit-agent.md) — 云 IDE+agent 对照：Replit 给你完整云开发环境，Lovable 把环境藏进提示词流。
