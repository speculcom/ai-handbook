---
id: qoder
form: ide
name: Qoder
nameEn: Qoder
vendor: 阿里云
homepage: https://qoder.com

axes:
  model_access: >-
    官方模型选择器页给出三种用法。可选自动路由，Auto 智能路由约 0.5 倍消耗。也可选档位，Ultimate 约 2.0 倍做深度推理，Fast 低耗快速。或直接指定模型。发送前显示 Credit 率。

    Lite 档只支持 Auto/Efficient 与精选模型清单。官方明示可自带 API Key。在 Settings → Models 添加自定义模型后即可使用。

    task/Agent/自动化选择器都能用（Custom Models 页）。另有两条 release notes：「模型消耗参考系数调整公告」与「Lite 模型档退役公告」。系数与档位会变。

    以客户端为准。
  runtime: >-
    官方家族页（What is Qoder）给出产品矩阵。Qoder 是一体化 agentic 工作空间。

    Qoder IDE 用 Editor 视窗做 AI 辅助编码与多文件改动。

    JetBrains 插件提供补全、Ask、Agent、MCP 与项目规则。

    Qoder CLI 是终端编码 agent，可接脚本与自动化。

    Cloud Agents 是全托管云沙箱：API 定义 Agent 与 Environment，起 Session，流式回传。

    另有 QoderWork、QoderWake 与 Agent SDK。

    官方定位是「agentic platform for real work」。它跑理解任务与上下文、规划、用工具执行、验证、迭代的端到端闭环。
  local_files: >-
    IDE、插件与 CLI 形态处理本机代码与工程。

    **依据：** CLI 官方口径「understand your entire codebase, write and modify code, run commands」。

    Cloud Agents 跑在厂商托管云沙箱。官方 Overview 说：不用自建 agent loop，也不管工具执行沙箱与长连接。

    Cloud Agents 可把自有阿里云 OSS bucket 挂到 /mnt/buckets/<name>。Beta 版最多 8 个，读写可选，见官方 Storage Buckets 页。

    Session 另有 archive/delete API。固定保留天数不在官方文档承诺。
  background: >-
    Cloud Agents 是官方托管面。全托管运行时，Session 在云端跑，结果实时流回。

    Qoder IDE 的 Quest 视窗（异步任务工作流）已于 2026-10-15 23:59 UTC+8 正式退役。

    官方公告给了时间线与迁移建议：迁往 Qoder，或继续用 Editor 视窗。

    CLI 自带 scheduled tasks。标准 5 段 cron，按 CLI 本机时区解释。

    任务定义、执行上限与自动过期，见官方 Scheduled Task Reference 页。

    会话日志默认落 ~/.qoder/projects/<project>/<session-id>.jsonl。
  tools: >-
    官方扩展面成页。

    Connectors 提供连接器市场，也可接自定义 MCP 服务器。

    Skills 用来查找、安装、创建可复用的任务能力。

    Subagents 是扩展提供的专家 Agent。

    Plugins 与自定义扩展发布指南覆盖个人 Skill、Plugin，以及自定义 MCP。

    官方市场还把 Cloud Agents 反向发布为 Plugin、Skill 或 MCP connector，供别的 AI 工具接入。
  context: >-
    记忆机制官方成页。Memory 让 Qoder 在后续任务复用稳定偏好与项目上下文。

    Repo Wiki 生成仓库知识。另有规则与项目设置。

    Experts Mode 官方成页并有客户案例叙事。一个需求会自动拆解，多专家 Agent 并行开发。

    CLI 会话日志默认落 ~/.qoder/projects/<project>/<session-id>.jsonl。state.json 存状态。

    可用 QODER_CONFIG_DIR 改根目录，--delete-session 删除会话。见官方 CLI Sessions 页。
  permissions: >-
    官方「Access Permissions」页。任务发送前与执行中都可选权限模式。默认 Ask for approval，关键操作请求批准。覆盖文件、终端、网络与已启用工具。

    改权限模式不改任务工作区与执行模式。

    账号体系走 qoder.com 账号。

    企业面官方文档给 Teams/Enterprise：SAML 2.0/OIDC SSO，四类角色（Admin、Config Admin、Member、Directory Member）。

    Admin-only 审计日志记录管理操作元数据，不记业务内容。见 SSO、Members and Roles、Audit Log 页。
  fit: >-
    适合：要「IDE + 插件 + CLI + 云端」一个账号全家的 agentic 编码闭环。

    也适合要 Repo Wiki、记忆与 Skills 组成的上下文体系。要 BYOK 补自己模型、要 Cloud Agents 托管跑长任务，也归这一类。

    不适合：找国内合规叙事。国际线走 qoder.com 账号与海外端点。国内线是 Qoder CN，见 qoder-cn 档案。

    也不适合依赖旧 Quest 视窗工作流，因为它已退役。
  name_history: >-
    与 Qoder CN（原通义灵码）同挂 Qoder 品牌，但两条产品线。国内线 qoder.com.cn，档案 qoder-cn；国际线 qoder.com，即本档案。

    docs.qoder.com 客户案例页出现「Alibaba Qoder」「Alibaba Cloud 办的 Qoder workshop」表述。指向同一阿里体系。

    官方文档将两线分别记录。本档按两条产品线分别记录，不做功能等价推断。
pitfalls:
  - Qoder（qoder.com 国际线）与 Qoder CN（qoder.com.cn，原通义灵码）是两条产品线——功能、模型清单、
    账号与端点都别互相推断；官方没有两线对照说明页
  - Qoder IDE 的 Quest 视窗已于 2026-10-15 退役（官方公告）——存量用户按公告迁 Qoder 或 Editor 视窗，
    旧教程里的 Quest 工作流已失效
  - 模型档位与 Credit 系数会调（官方有「参考系数调整公告」「Lite 模型档退役公告」）——
    搜到的系数数字要核公告日期

tags: [国产出海, 免费+付费, IDE, 插件, CLI, 云端Agent, MCP, Skills, BYOK, Credits]
related: [qoder-cn, trae, codebuddy, claude-agent-sdk]

sources:
  - label: Qoder 文档 · What is Qoder（家族矩阵/端到端闭环定位）
    url: https://docs.qoder.com/product-series/what-is-qoder
    kind: official
  - label: Qoder 文档 · Quick Start（IDE/插件/CLI/Cloud Agents 四路线）
    url: https://docs.qoder.com/product-series/quick-start
    kind: official
  - label: Qoder 文档 · Model Selector（档位/Credit 率/BYOK 自定义模型）
    url: https://docs.qoder.com/qoder/model-selector
    kind: official
  - label: Qoder 文档 · Qoder CLI Overview（终端形态/自主读写执行/权限确认）
    url: https://docs.qoder.com/cli/overview
    kind: official
  - label: Qoder 文档 · Cloud Agents Overview（全托管云沙箱/Plugin-Skill-MCP 三种接法）
    url: https://docs.qoder.com/cloud-agents/overview
    kind: official
  - label: Qoder 文档 · Access Permissions（Ask for approval 默认/文件终端网络权限）
    url: https://docs.qoder.com/qoder/approval-and-sandbox
    kind: official
  - label: Qoder 文档 · Quest window retirement notice（2026-10-15 退役时间线）
    url: https://docs.qoder.com/release-notes/quest-retirement-notice
    kind: official
  - label: Qoder 文档 · JetBrains Plugin Release Notes（changelog）
    url: https://docs.qoder.com/release-notes/jetbrains-plugin
    kind: changelog
  - label: Qoder 官网（产品家族/下载）
    url: https://qoder.com
    kind: official
  - label: Qoder 文档 · SSO（SAML 2.0/OIDC，Teams 与 Enterprise，2026-11-21 直抓）
    url: https://docs.qoder.com/account/teams/sso
    kind: official
  - label: Qoder 文档 · Members and Roles（Admin/Config Admin/Member/Directory Member 四类角色）
    url: https://docs.qoder.com/account/teams/members-and-roles
    kind: official
  - label: Qoder 文档 · Audit Log（Admin-only，记录管理操作元数据，不记业务内容）
    url: https://docs.qoder.com/account/enterprise/audit-log
    kind: official
  - label: Qoder 文档 · Scheduled Task Reference（cron/存储位置/执行上限/自动过期）
    url: https://docs.qoder.com/cli/scheduled-reference
    kind: official
  - label: Qoder 文档 · Storage Buckets Beta（自有阿里云 OSS 挂载，最多 8 个）
    url: https://docs.qoder.com/cloud-agents/api/environments/storage-buckets
    kind: official
  - label: Qoder 文档 · CLI Sessions（会话日志路径/QODER_CONFIG_DIR/--delete-session）
    url: https://docs.qoder.com/cli/sessions
    kind: official

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 阿里体系（docs.qoder.com 客户案例页有「Alibaba Qoder」「Alibaba Cloud 办 Qoder workshop」表述）；
    国际线面向海外市场，与国内线 Qoder CN（qoder.com.cn）分线运营。
  origin_note_en: Alibaba-affiliated (docs.qoder.com customer-case pages say "Alibaba Qoder" and an
    Alibaba Cloud-hosted Qoder workshop); the international line targets overseas markets,
    separate from the domestic Qoder CN line (qoder.com.cn).
  direct: yes
  direct_note: qoder.com / docs.qoder.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: qoder.com / docs.qoder.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；国际线未面向大陆公众提供服务，备案不适用
    （国内合规叙事在 Qoder CN 线，见 qoder-cn 档案）。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the international line does not
    serve the mainland public, so filing does not apply (the domestic compliance line is Qoder CN — see the qoder-cn dossier).
  verified: 2026-11-21
---

## 一句话定位

**Qoder**：阿里体系的 AI 编码产品国际线。站点是 qoder.com，与国内线 Qoder CN（原通义灵码）分线。

一个家族覆盖 Qoder IDE、JetBrains 插件、CLI 与 Cloud Agents 全托管云沙箱。档位或指定模型可切，也可 BYOK。上下文靠 Repo Wiki、记忆与 Skills 撑起。

Experts Mode 做多专家并行。官方叙事是「agentic platform for real work」。

## 适合与不适合

适合：要一个账号撑起 IDE、插件、CLI 与云端全家桶。托管跑长任务（Cloud Agents）、上下文完整、可自带模型，也都合适。

不适合：找国内合规叙事，那是 Qoder CN 线。还在依赖 Quest 视窗的团队也不适合，它 2026-10-15 已退役。

## 实测记录

本档未跑端到端编码任务。能力结论来自官方文档，编码向测量协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **国际版 qoder.com 与国内版 qoder.com.cn 的功能面实际差异**（两线分别记录，需按各自控制台核对）
- **Quest 视窗退役后存量工作流迁到 Qoder/Editor 的实际工作量**（公告给时间线，迁移成本需实测）
- **Cloud Agents 用自有 OSS bucket 挂载时的权限边界与吞吐**（Beta 能力，需在环境配置里实测）

## 未知项清单

- 国际线与 Qoder CN 的功能差异（官方文档按两线分别记录，本档不做等价推断）
- Cloud Agents 的固定保留天数（官方给 archive/delete API 与自有 OSS 挂载，不承诺统一保留期）

## 相关条目

- [Qoder CN（原通义灵码）](./qoder-cn.md) — 同品牌两条线：CN 线走国内模型与国内部署合规叙事，国际线走 qoder.com 账号与海外端点；官方无两线对照说明。
- [Trae](./trae.md) — 同为国产出海编码工具双线案例：字节国内外两线都活跃，可对照阿里系 Qoder/Qoder CN 的分线方式。
- [CodeBuddy](./codebuddy.md) — 同为大厂编码助手家族（腾讯云系），可对照各自的国内合规叙事与全家桶形态。

