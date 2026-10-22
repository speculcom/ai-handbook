---
id: qoder-cn
form: ide
name: Qoder CN（原通义灵码）
nameEn: Qoder CN (formerly Lingma)
vendor: 阿里云
homepage: https://qoder.com.cn

axes:
  model_access: >-
    官方模型选择器页明示三档用法：Auto 智能路由、Fast 快速档位、直接指定模型；
    可指定清单含 Qwen3.8/3.7 系、DeepSeek-V4-Pro/Flash、GLM-5.3/Flash、Kimi-K3/K2.8-Preview、
    MiniMax-M3.1-Flash（各带 Credits 用量参考系数，清单与系数以客户端为准）；
    还可通过 API 密钥接入自己的模型（官方「自定义模型」页，CLI 侧称 BYOK 向导）。
    系列页官方口径「底层支持 GLM、DeepSeek、Kimi、MiniMax 等国内主流大模型」。
  runtime: >-
    Qoder CN 是产品系列（官方家族页）：一体化 AI 工作空间 Qoder CN（桌面应用）、
    Qoder CN IDE、Qoder CN JetBrains 插件、Qoder CN CLI、Agent SDK（TypeScript/Python）、
    Cloud Agents CN（云端全托管 Agent 平台）、QoderWake CN（数字员工）、移动端与网页版；
    Credits 跨产品共享（订阅口径见官方账号与订阅页）。编码主线是 IDE/插件/CLI 三形态；
    官方「什么是 Qoder CN IDE」页明示 VS Code 插件已停止维护。
  local_files: >-
    IDE/插件/CLI 形态处理你本机代码与工程（官方安全页：Qoder CN 可以处理本地代码、已安装扩展、
    远程连接和外部服务）；CLI 的记忆文件（AGENTS.md 与自动记忆）保存在本机、可在设置中查看与清空。
    模型推理发生在服务侧——系列页官方口径「全链路在国内云上部署」；
    Cloud Agents CN / QoderWake CN 线的数据边界未逐条核验。
  background: >-
    后台/异步面是官方叙事的一部分：Cloud Agents CN 全托管长时异步任务（官方原文：关闭客户端后任务继续运行）、
    批量并发执行；CLI 有定时任务、/loop 循环执行、Cloud Mode 与 Remote Control；
    移动端可查看智能体进展、审批关键操作（官网口径）。
    注意官方公告「Qoder CN IDE『Quest』视窗下线通知」——旧教程里的 Quest 面已过时。
  tools: >-
    官方文档给全扩展面：MCP（连接器市场或自定义 MCP 服务器，配置在 ~/.qoder/settings.json）、
    Skills、Plugins、Subagents（专家团：前后端/数据库/运维/测试领域智能体）、Hooks、自定义指令与命令；
    CLI 内置文件读写、Shell 执行、Grep/Glob、Web 搜索与网页抓取，支持非交互模式接入脚本与 CI/CD；
    另有 Repo Wiki（为代码仓库生成项目知识）与代码安全扫描（提交/推送前渐进式扫描）。
  context: >-
    记忆机制官方成页：全局记忆与项目记忆两类、可分别开关与清空，保存在本机记忆目录；
    官方把上下文来源分三层——记忆（跨任务偏好背景）、Repo Wiki（代码库生成的项目知识）、
    知识库（团队维护的结构化资料）；另有上下文压缩、代码库索引、规则设置、多模态输入（图片/PDF）。
  permissions: >-
    账号体系（阿里云账号）；CLI 有权限模式、规则配置与工具调用审批流（官方权限页）；
    终端与沙箱页明示在任务中运行项目命令并审查需要授权的操作；
    安全与授权页给账号/凭证/扩展/连接的核查清单。企业侧有企业标准版与企业专属版（VPC 部署）。
  fit: >-
    适合：要国内合规叙事（阿里云一方产品、国内主流大模型+国内云上部署，官方点名金融/政务客群）、
    IDE/JetBrains 插件/CLI 三形态同账号、全家桶 Credits 共享、企业 VPC 专属部署。
    不适合：要海外模型清单自选（主线模型面是国内主流大模型）、还在依赖 VS Code 插件（已停维护）。
  name_history: >-
    品牌改名史（档案要写清）：智能编码助手通义灵码（Lingma，2023 首发）→ Qoder CN 系列
    （2026-05-20 官方正式更名）；桌面应用曾用名 Lingma IDE、Qoder CN Desktop——
    同一产品不同时期多个名字，检索时通义灵码/Lingma/Qoder CN 都要认。

pitfalls:
  - 通义灵码（Lingma）已于 2026-05-20 正式更名为 Qoder CN 系列——「通义灵码」「Lingma IDE」「Qoder CN Desktop」
    这些名字都指同一条桌面应用线（官方明写「如您在其他渠道看到通义灵码相关内容，与本产品为同一产品」）
  - 国内线 qoder.com.cn（Qoder CN 系列）与国际版 qoder.com 是两条产品线——功能与模型面别互相推断，
    两者的官方关系说明未逐条核验
  - VS Code 插件已停止维护（官方「什么是 Qoder CN IDE」页明示）——JetBrains 插件继续提供，
    从旧灵码 VS Code 插件迁移的读者要换形态
  - Quest 视窗已下线（官方产品公告）——搜到的旧灵码教程里 Quest 工作流可能已失效

tags: [国产, 免费+付费, 桌面, 插件, CLI, 国产模型, MCP, Credits, 企业VPC]
related: [codebuddy, trae, claude-code-cli, claude-agent-sdk]

sources:
  - label: Qoder CN 文档 · 什么是 Qoder CN 系列（更名事实/家族矩阵/合规叙事）
    url: https://docs.qoder.cn/product-overview/introduction-of-qodercn
    kind: official
  - label: Qoder CN 文档 · 什么是 Qoder CN IDE（桌面应用/曾用名/VS Code 插件停维）
    url: https://docs.qoder.cn/user-guide/what-is-qoder-cn
    kind: official
  - label: Qoder CN 文档 · 模型选择器（可指定模型清单与 Credits 系数）
    url: https://docs.qoder.cn/qoder/model-selector
    kind: official
  - label: Qoder CN 文档 · Qoder CLI CN 概览（终端形态/内置工具/权限确认）
    url: https://docs.qoder.cn/cli/overview
    kind: official
  - label: Qoder CN 文档 · 记忆（全局/项目记忆与来源分层）
    url: https://docs.qoder.cn/qoder/memory
    kind: official
  - label: Qoder CN 文档 · 安全与授权（账号/凭证/扩展核查）
    url: https://docs.qoder.cn/qoder/security-and-authorization
    kind: official
  - label: Qoder CN 系列更新日志（changelog）
    url: https://docs.qoder.cn/product-overview/qoder-cn-update-log
    kind: changelog
  - label: Qoder CN 官网（产品家族/下载）
    url: https://qoder.com.cn
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 阿里云（阿里巴巴体系）——官方口径「阿里云一方产品，由阿里云统一研发与运维」。
  origin_note_en: Alibaba Cloud — the official docs call it a first-party Alibaba Cloud product,
    developed and operated by Alibaba Cloud itself.
  direct: yes
  direct_note: qoder.com.cn / lingma.aliyun.com / docs.qoder.cn 大陆直连实测 200（2026-10-22）。
  direct_note_en: qoder.com.cn / lingma.aliyun.com / docs.qoder.cn measured 200 direct from mainland (2026-10-22).
  filing: unknown
  filing_note: 官方系列页声称「全链路在国内云上部署，符合国内数据安全与合规要求」，
    但所用各模型（Qwen/DeepSeek/GLM/Kimi/MiniMax）的备案号公示位置未逐条核验到；「未核验到」不等于「未备案」。
  filing_note_en: the official series page claims full-chain domestic cloud deployment meeting domestic
    data-security and compliance requirements, but per-model filing numbers (Qwen/DeepSeek/GLM/Kimi/MiniMax)
    were not verified against an official disclosure page this pass; "not verified" does not mean "not filed".
  verified: 2026-10-22
---

## 一句话定位

**Qoder CN 是阿里云的 AI 编码产品线**（原通义灵码，2026-05-20 官方更名）：桌面 IDE + JetBrains 插件 + CLI
三形态，国内主流大模型可切换可 BYOK，记忆/Repo Wiki/知识库三层上下文，全家桶 Credits 共享——
「阿里云一方产品 + 国内部署」是它的官方合规叙事。

## 适合与不适合

适合：国内合规叙事（金融/政务客群是官方点名对象）、IDE/插件/CLI 三形态同账号、企业 VPC 专属部署。
不适合：要海外模型清单自选、还在依赖 VS Code 插件（已停维护）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **国际版 qoder.com 与国内版 qoder.com.cn 的功能面实际差异**（官方无对照表）
- **Quest 视窗下线后存量工作流的迁移路径**（公告只说下线，未给逐条迁移指引）
- **CLI 非交互模式在 CI/CD 里的权限审批实际行为**（headless 下审批流怎么阻塞）

## 未知项清单

- 所用各模型的备案号公示位置（官方声称国内部署合规，备案号未逐条核验）
- 国际版 qoder.com 与 CN 系列的产品关系（官方未给对照说明）
- Cloud Agents CN / QoderWake CN 线的存储与保留策略（未逐条核验）
- 企业标准版/专属版（VPC）管控台细节（未逐条核验）

## 相关条目

- [CodeBuddy](./codebuddy.md) — 同为国产大厂编码助手：腾讯云系混元已备案可查、走云生态一条龙；Qoder CN 走「一方产品+全家桶 Credits」叙事，备案口径本站未核验到号。
- [Trae](./trae.md) — 同为国产出海编码工具：字节系国内外两条线都活跃；Qoder CN 的国内线（qoder.com.cn）与国际版（qoder.com）关系官方未对照说明。
- [Qoder（国际版）](./qoder.md) — 同品牌两条线：国际线走 qoder.com 账号与海外端点、家族含 Cloud Agents/QoderWork；两线功能与模型面别互推（官方无对照页）。
