---
id: power-automate
form: web
name: Microsoft Power Automate
vendor: Microsoft
homepage: https://www.microsoft.com/en-us/power-platform/products/power-automate
license: 专有商业软件，按用户/容量订阅；Microsoft 365 计划含有限权益，premium 连接器、托管 RPA 与 AI Builder 容量需对应许可。具体档位以官方 licensing 页为准，本站不记价格。
licenseEn: Proprietary commercial software sold by user/capacity subscription; Microsoft 365 plans include limited entitlements, while premium connectors, hosted RPA and AI Builder capacity require the matching licence. See the official licensing page for tiers; this site records no prices.

axes:
  model_access: >-
    AI 能力来自 Microsoft Copilot 与 AI Builder（预置/自定义模型），底层模型未披露；
    也可通过 HTTP、自定义连接器或 Azure 服务调用外部模型 API。可选的模型档位与区域可用性未逐项核验。
  runtime: >-
    云端 SaaS：cloud flows 在 Microsoft 租户内运行；desktop flows 跑在用户 Windows 机器
    或 Microsoft 托管机器上；设计器为浏览器 + Windows 桌面应用，执行不在你的本地进程里。
  local_files: >-
    cloud flows 经 SharePoint、OneDrive、Dataverse 等连接器读写文件；desktop flows
    可直接操作本机文件、Excel 与 legacy 应用界面；托管机器形态下文件在 Microsoft 环境。
  background: >-
    cloud flows 可由定时、事件或 webhook 触发，用户关机不影响；desktop flows 分 attended
    （需登录会话）与 unattended（需机器或托管运行时），关机后无人值守能否跑取决于运行时。
  tools: >-
    连接器生态（官方称数百个，未逐条核验）、自定义连接器、Copilot、AI Builder、
    桌面 UI 自动化与 approvals；可调 Power Platform 其他服务与 Azure API。
  context: >-
    flow 级变量、run history 与 Dataverse 状态存储；没有跨 flow 的通用 Agent 记忆，
    长流程状态要靠显式变量/表设计，不是模型上下文。
  permissions: >-
    依托 Entra ID、环境（environment）与连接凭据；管理员用 Power Platform admin center
    配 DLP 策略、环境角色与连接权限；终端用户权限跟随租户与连接账户。
  fit: >-
    适合：Microsoft 生态内的审批、邮件、SharePoint/Dataverse 流程与 Windows RPA，
    以及需要企业治理与审计的自动化。不适合：非 Microsoft 为主的技术栈、纯代码编排、
    或要求自带任意模型的场景。

pitfalls:
  - 以为 M365 订阅就含无限 premium 连接器与桌面流——有配额与附加许可
  - 把 Copilot 当自动生成完整流程——生成结果仍需逐步校验与测试
  - 把桌面流当云函数——无人值守要机器或托管运行时，关机不等于还能跑

tags: [低代码, 工作流, RPA, 微软生态, 企业治理, Copilot]
related: [openai-agents-sdk, dify]

sources:
  - label: Microsoft Learn · Power Automate 文档首页（产品定位与能力入口）
    url: https://learn.microsoft.com/en-us/power-automate/
    kind: docs
  - label: Microsoft Learn · Explore the Power Automate home page（cloud/desktop/generative actions）
    url: https://learn.microsoft.com/en-us/power-automate/getting-started
    kind: docs
  - label: Microsoft Learn · Introduction to desktop flows（RPA、attended/unattended 与运行前提）
    url: https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction
    kind: docs
  - label: Microsoft Learn · What's new in Power Automate（发布与路线图入口）
    url: https://learn.microsoft.com/en-us/power-automate/whats-new
    kind: changelog

link:
  url: https://www.microsoft.com/en-us/power-platform/products/power-automate
  kind: official

last_verified: 2026-11-17
last_updated: 2026-11-17
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Microsoft（美国）。
  origin_note_en: Microsoft (US).
  direct: yes
  direct_note: learn.microsoft.com 直连实测 200（2026-11-17）；产品控制台需租户登录，未实测。
  direct_note_en: learn.microsoft.com measured 200 direct (2026-11-17); the product console requires a tenant login and was not tested.
  filing: unknown
  filing_note: 大陆由世纪互联运营的 Microsoft 365 是否包含本产品未核验；国际版备案状态未核验，记为 unknown。
  filing_note_en: whether the 21Vianet-operated Microsoft 365 in mainland China includes this product was not verified; the filing status of the international service was not verified and is recorded as unknown.
  verified: 2026-11-17
---

## 一句话定位

**Power Automate 是微软生态里的企业与桌面自动化平台**——
cloud flows 负责 SaaS 间编排，desktop flows 负责 Windows 桌面 RPA，
Copilot 与 AI Builder 把自然语言和模型能力嵌进流程，但它是低代码自动化，不是 Agent 框架。

## 适合与不适合

适合已经深度使用 Microsoft 365、SharePoint、Dataverse、Teams 的组织，
要把审批、通知、数据同步与 Windows 桌面操作串起来，并且需要环境、DLP 与审计治理。
不适合非微软为主的技术栈、需要代码级可控性的团队，
或想自带任意第三方模型、把平台当通用 Agent 运行时的场景。

## 两种 flow 别混为一谈

官方文档把能力拆成 cloud、desktop 与 generative actions（预览）：
cloud flows 在租户云端按定时/事件触发，用户关机不影响；
desktop flows 走 Windows 应用界面，分 attended（要登录会话）与 unattended（要机器或托管运行时）。
「桌面流能不能无人值守跑」不是产品默认能力，而是运行时与许可的问题。

## 许可与容量的边界

这是专有订阅软件：M365 计划含有限权益，premium 连接器、托管 RPA 与 AI Builder 容量
要对应许可。本站不记价格，采购前读官方 licensing 页；把「我们已经有 M365」当成
「所有连接器都能用」是最常见的预算误判。

## 实测记录

本站尚未完成 flow 搭建与桌面流实测；结论来自 Microsoft Learn 官方文档。

## 未知项清单

- Copilot 与 AI Builder 的底层模型、区域可用性与数据驻留
- 大陆世纪互联版本的包含范围与备案状态
- 官方「数百个连接器」的确切数量与 premium 标记清单

## 变更记录说明

本对象无独立 changelog 页，变更记录见官方 What's new 页与 Service Updates。

## 相关条目

- [OpenAI Agents SDK](../../framework/products/openai-agents-sdk.md) — 代码优先的 Agent 编排对照：一边是流程画布，一边是可版本化的代码。
