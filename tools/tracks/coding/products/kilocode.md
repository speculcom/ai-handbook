---
id: kilocode
form: ide
name: Kilo Code
nameEn: Kilo Code
vendor: Kilo-Org
homepage: https://kilo.ai

axes:
  model_access: >-
    官方口径 500+ 模型零加价（zero markup）：Kilo Gateway 一个 API 接数百模型（流式、BYOK、用量追踪）；
    Auto Model 自动路由分 Efficient/Frontier/Free 三档；BYOK 官方成页（自带 Key 直接用）；
    本地模型经 Ollama / LM Studio 官方成页。计费三段：Free 档用量另计（按供应商原价）、
    Kilo Pass、Teams 按席位订阅、Enterprise（官方 pricing 页，具体价格本站按 D9 不采）。
  runtime: >-
    开源（GitHub MIT，主仓 Kilo-Org/kilocode）：VS Code 扩展 + JetBrains 插件 + CLI + Kilo Desktop（beta）。
    官方文档明示 Kilo CLI 是 OpenCode 的 fork（支持同款配置）。
    Cloud Agents：每会话隔离 Linux 容器（预装 Node.js/git/gh/glab，可 apt 加装）、
    自动建分支持续推送、临时环境——官方口径「no local machine required」。
  local_files: >-
    IDE 扩展/CLI 在你本机处理代码库（开源可自审）；Cloud Agents 在厂商托管隔离容器内跑，
    仓库克隆进容器、自动分支管理。容器内代码的存储与保留策略未逐条核验。
  background: >-
    Cloud Agents 是托管面：从任意设备启动云端会话、自动 git 管理；另有 Automation（定时/事件自动化，
    docs 有 Automate 分区）、Code Reviewer（AI PR 评审）、Slack 集成（从 Slack 用 Kilo）。
    官方首页口径「5M+ developers」。
  tools: >-
    MCP 官方成页（Overview + Integrations）；Custom Rules（自定义规则文件）；Custom Modes；
    共享自定义 agents（Teams 面）；kilo-marketplace 扩展市场（fork 提交流程官方成页）。
  context: >-
    Sessions & Sharing（会话共享）、Session History and Search（会话历史检索）官方成页；
    Custom Rules 提供持久项目指令。跨会话自动记忆机制未核验到官方声明。
  permissions: >-
    官方设置页成体系：Auto-Approving Actions（自动批准动作配置）、Sandboxing（沙箱设置）、
    Cost Controls and Usage Safeguards（成本上限与用量护栏）。
    企业面：SSO/SAML、SCIM、审计日志、数据驻留（EU Sovereignty 官方页）、SLA、
    限制可用模型/供应商、Shared Private Gateway BYOK（官方 pricing/enterprise 页）。
  fit: >-
    适合：要开源可自审 + 500+ 模型零加价 + BYOK/本地模型全支持、VS Code/JetBrains/CLI/云端多形态、
    免费起步按量付费。
    不适合：要厂商背书强治理叙事（企业面有但主体是开源社区公司）、
    找「Roo Code 官方继任」（Roo 官方关停公告指 ZooCode/Cline，未提 Kilo——见 pitfalls）。
  name_history: >-
    域名迁移：kilocode.ai → kilo.ai（2026-10-22 实测 308 重定向）；产品名仍 Kilo Code。
    与 Roo Code/Cline 的血缘：社区普遍认知 Kilo 源自 Roo Code 分支，
    但官方文档未声明该血缘（官方只明示 CLI 是 OpenCode 的 fork）——本站按官方口径记录。

pitfalls:
  - 域名已迁 kilo.ai（旧 kilocode.ai 308 重定向）——旧教程/旧链接仍多指 kilocode.ai，
    文档站实际在 kilocode-docs.vercel.app 提供 raw markdown
  - 「Kilo 是 Roo Code 继任」是社区认知不是官方声明——Roo Code 官方关停公告（2026-05-15）
    给的替代是 ZooCode（社区 fork）与 Cline，未提 Kilo；检索血缘要分清口径来源
  - Free 档「免费」指不订阅，模型用量按供应商原价另计（官方 pricing 页明示 usage billed separately）——
    与「包月含额度」类产品口径不同

tags: [开源, 免费+付费, IDE, 插件, CLI, 云端Agent, MCP, BYOK, 本地模型]
related: [cline, cursor, opencode, context7]

sources:
  - label: Kilo 官网 · llms.txt（产品矩阵：VS Code/JetBrains/CLI/Cloud/Gateway/500+ 模型零加价）
    url: https://kilo.ai/llms.txt
    kind: official
  - label: Kilo 文档 · Getting Started（安装/认证/首任务）
    url: https://kilo.ai/docs
    kind: docs
  - label: Kilo · Pricing（Free/Teams/Enterprise 三档 + 三段计费口径）
    url: https://kilo.ai/pricing
    kind: pricing
  - label: Kilo · Cloud Agents（隔离容器/自动分支/任意设备）
    url: https://kilo.ai/cloud
    kind: official
  - label: Kilo GitHub 主仓（MIT 开源）
    url: https://github.com/Kilo-Org/kilocode
    kind: repo
  - label: Kilo GitHub Releases（changelog）
    url: https://github.com/Kilo-Org/kilocode/releases
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Kilo-Org（开源公司，产品 Kilo Code）。
  origin_note_en: Kilo-Org (open-source company behind Kilo Code).
  direct: yes
  direct_note: kilo.ai / kilocode.ai（308 跳转）/ kilo.ai/docs 大陆直连实测 200（2026-10-22）。
  direct_note_en: kilo.ai / kilocode.ai (308 redirect) / kilo.ai/docs measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve
    the mainland public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Kilo Code 是最流行的开源编码 agent 之一**（GitHub MIT）：VS Code/JetBrains/CLI/Desktop + Cloud Agents
隔离容器，500+ 模型零加价、BYOK 与本地模型（Ollama/LM Studio）全支持，免费起步按供应商原价计量——
官方叙事「all-in-one agentic engineering platform」，域名已迁 kilo.ai。

## 适合与不适合

适合：要开源可自审、模型面极宽（含零加价 Gateway 与本地模型）、多形态一个账号、免费起步按量付费。
不适合：要强厂商治理背书、找「Roo Code 官方继任」（官方关停公告指 ZooCode/Cline，未提 Kilo）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Gateway 零加价的实际账单口径**（与直接用供应商 API 对比 token 单价）
- **Cloud Agents 容器内代码的保留时长与计费边界**（官方页未写）
- **Auto Model 三档路由的实际落点透明度**（每次请求落到哪个模型）

## 未知项清单

- 与 Roo Code/Cline 的血缘（官方文档未声明；社区认知与官方口径分开记录）
- Cloud Agents 容器代码存储与保留策略（未逐条核验）
- 跨会话自动记忆机制（未核验到官方声明）
- Kilo Desktop（beta）的能力边界（官方仅入口级描述）

## 相关条目

- [Cline](./cline.md) — 同源代码谱系对照：Roo Code 官方关停公告指 Cline 为替代；Kilo 与 Cline 的社区血缘官方未声明，可对照两家 BYOK 与模型面。
- [Cursor](./cursor.md) — 同为 VS Code 系编码 agent：Cursor 闭源独立 IDE，Kilo 开源插件形态 + Gateway 零加价叙事相反。
- [OpenCode](./opencode.md) — 官方明示的 CLI 血缘：Kilo CLI 是 OpenCode 的 fork（官方文档原文）。
