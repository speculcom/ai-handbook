---
id: amazon-q-developer
form: ide
name: Amazon Q Developer
nameEn: Amazon Q Developer
vendor: AWS
homepage: https://aws.amazon.com/q/developer/

axes:
  model_access: >-
    官方 what-is 页明示 Powered by Amazon Bedrock：模型经 Bedrock 托管调用，
    模型本身经 Bedrock 增强 AWS 内容做问答；含自动滥用检测（Bedrock 侧安全机制）。
    用户不能自选底层模型（官方未给模型选择器）；BYOK 不适用——计费与账号走 AWS。
  runtime: >-
    两条形态线：IDE 插件（VS Code / JetBrains 内的对话、内联补全、生成新代码、安全漏洞扫描、
    语言升级/调试/优化等代码改造）与命令行（官方 CLI 页原文「The Q CLI has become the Kiro CLI」——
    CLI 线已迁 Kiro 品牌）。定位是「理解、构建、扩展、运维 AWS 应用」的生成式助手，
    AWS 架构/资源/最佳实践/文档问答是官方主线。
  local_files: >-
    IDE 插件在你本机 IDE 内处理代码（补全/生成/扫描在插件工作流内发生）；
    代码是否离开本机上传服务侧未逐条核验（Bedrock 推理在服务侧是确定事实）。
    问答面引用你的 AWS 资源上下文（官方口径：针对你的 AWS 资源与架构给带引用的回答）。
  background: >-
    无官方长时异步任务面（未核验到后台续跑声明）；Agentic 编码能力官方指向 Kiro
    （EOL 公告原文：For capabilities similar to Amazon Q Developer IDE plugins, explore Kiro…
    including agentic coding, chat and MCP support）。
  tools: >-
    IDE 插件内置能力官方列：代码对话、内联补全、生成新代码、安全漏洞扫描（security scans）、
    代码升级（Java 版本升级等 transformations）、调试与优化；
    MCP 支持在 Kiro 侧（EOL 公告点名 Kiro 有 MCP support），Amazon Q 插件侧 MCP 未核验到。
  context: >-
    上下文锚在 AWS 侧：你的 AWS 资源、架构、文档与支持内容（官方 what-is 页口径）；
    IDE 内跟随当前工程。跨会话记忆机制未核验到官方声明。
  permissions: >-
    账号与计费走 AWS（IAM/账户体系）；IDE 插件操作本机文件的审批细节未逐条核验。
    Bedrock 侧自动滥用检测是官方明示的安全机制。
  fit: >-
    适合：重度 AWS 用户——问架构/资源/最佳实践带引用、IDE 内做 Java 升级与安全扫描这类官方招牌改造任务。
    不适合：要 agentic 编码新能力（官方明确指向 Kiro）、要长期押注 IDE 插件线
    （2027-04-30 停止支持，见 pitfalls）。

pitfalls:
  - **官方 EOL 公告**：Amazon Q Developer IDE 插件 2027-04-30 停止支持（AWS 官方 End of support notice），
    官方点名替代是 Kiro（agentic coding/chat/MCP）——现在选型新项目的 IDE 面应直接看 Kiro 档案
  - **CLI 线已改名**：官方 CLI 页原文「The Q CLI has become the Kiro CLI」——搜到的旧 Q CLI 教程
    实际指向 Kiro CLI（kiro.dev/docs/cli）
  - 产品未停运（2026-10-22 官网与文档均 200，lifecycle 仍 active）——「有 EOL 公告」与「已死」是两回事，
    过渡期内插件仍可用

tags: [海外, AWS生态, IDE插件, 即将停支持, Bedrock, 代码升级, 安全扫描]
related: [kiro, cursor, github-mcp]

sources:
  - label: AWS 文档 · What is Amazon Q Developer（Bedrock 驱动/IDE 能力清单/EOL 公告横幅）
    url: https://docs.aws.amazon.com/en_en/amazonq/latest/qdeveloper-ug/what-is.html
    kind: official
  - label: AWS 文档 · Amazon Q Developer IDE plugins end of support（2027-04-30 停支持公告）
    url: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html
    kind: official
  - label: AWS 文档 · Using Amazon Q Developer on the command line（Q CLI 已变 Kiro CLI）
    url: https://docs.aws.amazon.com/en_en/amazonq/latest/qdeveloper-ug/command-line.html
    kind: official
  - label: AWS 文档 · Document history（changelog）
    url: https://docs.aws.amazon.com/en_en/amazonq/latest/qdeveloper-ug/doc-history.html
    kind: changelog
  - label: Amazon Q Developer 产品页（定价/形态入口）
    url: https://aws.amazon.com/q/developer/
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: AWS（亚马逊云科技）；中国区（光环新网/西云数据）另有独立运营口径，未逐条核验。
  origin_note_en: AWS (Amazon Web Services); the China regions (GDS/NNET) have separate operations,
    not verified dossier by dossier this pass.
  direct: yes
  direct_note: aws.amazon.com / docs.aws.amazon.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: aws.amazon.com / docs.aws.amazon.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve
    the mainland public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Amazon Q Developer 是 AWS 的编码与运维助手**（Bedrock 驱动）：IDE 插件做补全/生成/安全扫描/Java 升级，
问答面锚在你的 AWS 资源与架构——但**官方已给 EOL：IDE 插件 2027-04-30 停止支持、CLI 已变 Kiro CLI**，
AWS 把 agentic 编码未来押在 Kiro 上。

## 适合与不适合

适合：重度 AWS 用户做架构问答、资源排障、Java 升级与安全扫描这类官方招牌任务。
不适合：新项目押 IDE 插件线（有 EOL 日期）、要 agentic 编码新能力（官方指向 Kiro）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **EOL 后插件的实际可用窗口**（2027-04-30 前插件是否随 IDE 版本继续更新）
- **IDE 插件代码上传服务侧的具体边界**（补全/扫描哪些内容出本机）
- **中国区（光环新网/西云数据）是否有对应功能面**（未核验）

## 未知项清单

- IDE 插件侧是否支持 MCP（官方只在 Kiro 侧点名 MCP support）
- 跨会话记忆机制（未核验到官方声明）
- 插件操作本机文件的审批模型细节（未逐条核验）
- 中国区功能面（未核验）

## 相关条目

- [Kiro](./kiro.md) — 同厂接班线：AWS 官方 EOL 公告点名 Kiro 承接 agentic coding/chat/MCP，Q CLI 已变 Kiro CLI。
- [Cursor](./cursor.md) — 同为 IDE 形态对照：Cursor 独立 IDE 无 EOL 风险，Amazon Q 是装进现有编辑器的插件且已给定停支持日期。
- [GitHub MCP](../../mcp/products/github-mcp.md) — 跨大类对照：Amazon Q 插件无 MCP 面（官方未声明），GitHub 集成走自家插件体系。
