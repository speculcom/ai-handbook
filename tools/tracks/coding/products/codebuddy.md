---
id: codebuddy
form: ide
name: CodeBuddy
vendor: 腾讯云
homepage: https://www.codebuddy.cn

axes:
  model_access: >-
    官方文档明示：除腾讯自研混元大模型外，支持其它大模型接入与切换（官方产品概述页点名 DeepSeek 为例）；
    具体可选模型清单随版本，未逐条清点。国际版（codebuddy.ai）与国内版（codebuddy.cn）是两条线，
    模型面可能不同——以各自官方页为准。
  runtime: >-
    官方口径「插件、IDE、CLI 三端全开发场景覆盖」：IDE 插件（VS Code/JetBrains 系）、
    独立 AI IDE（codebuddy.cn/ide）、命令行形态各有官方文档页。执行在你本机（插件/IDE/CLI 形态的共性，
    本站判断；官方未逐页声明执行位置）。
  local_files: >-
    代码在你本机编辑器/工程里；IDE 形态的部署线（CloudStudio 一键部署沙盒环境生成分享链接）
    会把产物上传腾讯云侧——上传范围与保留策略未逐条核验。
  background: >-
    未见官方声明后台常驻/异步任务面；三端形态都以交互式会话为主叙事（已查官方文档导航未见
    background-agent 页，「未核验到」不等于「没有」）。
  tools: >-
    官方文档含 MCP 配置面（IDE 文档导航内）；企业侧管控文章提到 MCP 服务器白名单配置——
    转述官方，能力细节未逐条核验。设计到代码（Figma 导入生成页面）是官方主打场景之一。
  context: >-
    企业版有 RAG 知识库（官方产品概述页明示：团队专属知识库增强问答与编码）；
    个人版记忆面未逐条核验。
  permissions: >-
    账号体系（腾讯云账号）；企业版有管理控制台（审计日志、安全编码自定义指令等——腾讯云开发者官方文章转述）。
    数据面：官方主打「符合国内安全要求」的合规叙事（腾讯云官方 PDF 原文对比 ChatGPT 的表述）。
  fit: >-
    适合：国内团队要合规叙事（混元已备案）、腾讯云生态（CloudBase/CloudStudio）内建站到部署一条龙、
    插件+IDE+CLI 同账号三端切换。
    不适合：要全球模型清单自选（模型面以官方列出的为准）、深度依赖海外 SaaS 集成链。

pitfalls:
  - 国内版 codebuddy.cn 与国际版 codebuddy.ai 是两条线——功能与模型面别互相推断
  - 「已备案」的官方口径指混元模型（备案号 Guangdong-TencentHunyuan-20230901，官方文档公示）——
    不等于产品所有功能面都有独立备案，转述时主语别滑
  - CloudStudio 一键部署会把产物上到云侧沙盒——「代码在本机」不等于「产物不出本机」

tags: [国产, 免费+付费, 插件, AI-IDE, CLI, 混元, 已备案]
related: [supabase-mcp, copilot, figma-mcp]

sources:
  - label: CodeBuddy · 官网（三端覆盖/场景叙事）
    url: https://www.codebuddy.cn
    kind: official
  - label: CodeBuddy 文档 · 插件产品概述（模型信息/备案号公示/RAG 知识库）
    url: https://www.codebuddy.cn/docs/plugin/产品简介/产品概述
    kind: official
  - label: CodeBuddy IDE · Release Notes（changelog）
    url: https://www.codebuddy.cn/docs/ide/Release-notes
    kind: changelog
  - label: CodeBuddy 国际版
    url: https://www.codebuddy.ai
    kind: official

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 腾讯云（深圳市腾讯计算机系统有限公司）。
  origin_note_en: Tencent Cloud (Shenzhen Tencent Computer Systems Company Limited).
  direct: yes
  direct_note: codebuddy.cn 与 codebuddy.ai 大陆直连实测 200（2026-10-21）。
  direct_note_en: codebuddy.cn and codebuddy.ai measured 200 direct from mainland (2026-10-21).
  filing: filed
  filing_no: Guangdong-TencentHunyuan-20230901
  filing_note: 官方文档公示所用模型备案信息：腾讯混元助手大模型，备案单位深圳市腾讯计算机系统有限公司，
    备案号 Guangdong-TencentHunyuan-20230901（出处：CodeBuddy 插件产品概述页「模型信息」节）。
  filing_note_en: the official docs publish the model filing: Tencent Hunyuan assistant LLM, filed by
    Shenzhen Tencent Computer Systems Co., Ltd., filing no. Guangdong-TencentHunyuan-20230901
    (source: CodeBuddy plugin product-overview page, "model information" section).
  verified: 2026-10-21
---

## 一句话定位

**CodeBuddy 是腾讯云的三端编码助手**（插件/AI IDE/CLI）：混元为主、可接其它大模型，
Figma 到代码、CloudStudio 一键部署一条龙；所用混元模型备案号由官方文档公示。

## 适合与不适合

适合：国内团队合规叙事、腾讯云生态建站部署、三端同账号切换。
不适合：要全球模型清单自选、深度依赖海外 SaaS 链。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **国内版与国际版功能面差异清单**（官方各自成页，无对照表）
- **CLI 形态的实际能力边界**（官方三端叙事里 CLI 页最薄）
- **CloudStudio 部署产物的保留与访问控制**

## 未知项清单

- 当前可选模型完整清单（随版本变化，未逐条清点）
- CLI 形态细节能力面（官方文档较薄，未逐条核验）
- 个人版记忆/上下文机制细节（未逐条核验）
- 后台/异步任务面（未核验到官方声明）

## 相关条目

- [Qoder CN（原通义灵码）](./qoder-cn.md) — 同为国产大厂编码助手：阿里云系走「一方产品+全家桶 Credits」叙事，本站未核验到备案号；CodeBuddy 的混元备案号官方文档可查。
- [Trae](./trae.md) — 同为国产出海编码工具：字节系 IDE，SOLO 模式叙事。
