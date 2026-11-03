---
id: microsoft-copilot
form: web
name: Microsoft Copilot
nameEn: Microsoft Copilot
vendor: 微软
homepage: https://copilot.microsoft.com
license: 免费+微软账号（部分能力需 Microsoft 365 订阅）。按微软服务协议管辖
  （microsoft.com/en-us/servicesagreement 直抓核验 2026-10-22）；输出归属与训练口径细节未逐条核验。
licenseEn: Free with a Microsoft account (some capabilities require a Microsoft 365 subscription).
  Governed by the Microsoft Services Agreement (direct-fetched 2026-10-22); output ownership and training
  details not verified line by line.

axes:
  model_access: >-
    模型由微软侧路由，用户选择面有限：官方叙事里 Copilot 用 OpenAI 系模型（GPT 系）+ 自家 MAI 系；
    具体当前档位未逐条核验。「选择器是否存在、能选什么」以登录后界面为准。
  runtime: >-
    网页（copilot.microsoft.com）+ Windows 内嵌 + iOS/Android App + Edge 内嵌；生成在微软云端处理。
    与 Microsoft 365 Copilot（办公套件内嵌）是相邻但不同的产品面——本档案覆盖 C 端 Copilot。
  local_files: >-
    对话历史存于微软账户侧；与 Bing 搜索历史、Edge 数据存在账户联动面（微软隐私面板管辖），
    细节未逐条核验。
  background: >-
    对话即时返回；产品含「Copilot Vision/Actions」类主动能力线（官方叙事），异步任务队列未核验到官方声明。
    C 端 Deep Research 已于 2026-08-18 退役（官方支持页）；深度研究体验改由 Microsoft 365 Copilot 的
    Researcher 智能体承接，面向 M365 Premium / 商业版 / 企业版加购许可用户。
  tools: >-
    联网检索（Bing 底座）、图像生成（Designer / DALL·E 线）、图像理解等能力线内建；
    深度研究：C 端 Deep Research 于 2026-08-18 退役，Researcher 智能体在 Microsoft 365 Copilot 中提供
    多步研究（官方 FAQ 与支持页）；与 Microsoft 365 应用联动属另一产品面。MCP 支持未逐条核验。
  context: >-
    对话历史登录同步；跨会话记忆机制未逐条核验（官方有「Copilot Memory」类叙事，实现细节未核验）。
  permissions: >-
    微软账号体系（企业/个人两条账户线）；训练用途开关在微软隐私面板（账户隐私设置），
    具体路径与默认态未逐条核验。
  fit: >-
    适合：Windows/Edge/Bing 生态用户、要免费联网问答、企业已在微软生态。
    不适合：要模型自选、要脱离微软账号、大陆直连场景（见 cn 块）。

pitfalls:
  - 把 C 端 Copilot 与 Microsoft 365 Copilot 混为一谈——免费网页版与办公套件内嵌是两个产品面，条款与能力不同
  - 与 GitHub Copilot 也不是一个产品——编码向归 coding 大类（copilot 档案），本档案是通用对话
  - 模型「由微软路由」不等于「固定某模型」——路由随官方调整，别把某次界面快照当承诺
  - 还在 C 端找 Deep Research——官方已于 2026-08-18 退役，深度研究改用 M365 Copilot 的 Researcher

tags: [免费+账号, 联网搜索, Windows生态, Bing底座]
related: [chatgpt, gemini-chat, copilot]

sources:
  - label: Microsoft Copilot · 官网（产品入口与能力叙事）
    url: https://copilot.microsoft.com
    kind: official
  - label: Microsoft · Services Agreement（官方条款，2026-10-22 直抓核验）
    url: https://www.microsoft.com/en-us/servicesagreement/
    kind: official
  - label: Microsoft 365 Copilot · Release Notes（相邻产品面更新线，changelog）
    url: https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes
    kind: changelog
  - label: Microsoft Support · Deep Research in Microsoft Copilot（C 端 2026-08-18 退役说明）
    url: https://support.microsoft.com/en-us/microsoft-copilot/deep-research-in-microsoft-copilot
    kind: docs
  - label: Microsoft Learn · Researcher agent FAQ（M365 Copilot 的深度研究智能体）
    url: https://learn.microsoft.com/en-gb/microsoft-365/copilot/faq-researcher
    kind: docs

last_verified: 2026-10-22
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 微软（Microsoft，美国）。
  origin_note_en: Microsoft (US).
  direct: no
  direct_note: copilot.microsoft.com 大陆直连实测 000（2026-10-22，代理下 200）——直连不可达，需网络环境。
  direct_note_en: copilot.microsoft.com measured 000 direct from mainland (2026-10-22; 200 via proxy) —
    unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Microsoft Copilot 是 Windows/Edge/Bing 生态的免费对话入口**：联网检索是底座能力，
模型由微软侧路由；与 Microsoft 365 Copilot、GitHub Copilot 是三个不同产品面，别混。

## 适合与不适合

适合：微软生态用户、免费联网问答、企业已在微软体系。
不适合：要模型自选、大陆直连场景（直连 000）。

## 实测记录

本档未跑对话任务集；能力结论来自官方文档，不评价回答质量。

**实测建议**（四条，都指向官方可读页没给的东西）：

- **模型选择器是否存在及可选项**（登录后界面核实）
- **账户隐私面板里训练开关的路径与默认态**
- **Copilot Vision/Actions 的实际触发边界**
- **Researcher 智能体在 M365 中的许可与可用范围**（官方写 Premium/商业/企业加购；具体租户配置待核）

## 未知项清单

- 当前路由的模型清单（随官方调整，未逐条核验）
- 训练开关路径与默认态（未逐条核验）
- Copilot Memory 类叙事的实现细节（未逐条核验）
- 免费与 M365 订阅的能力分界（D9：价格不采；能力边界未逐条核验）

## 相关条目

- [ChatGPT](./chatgpt.md) — 通用对话对照：ChatGPT 模型线更单一清晰，Copilot 走微软路由。
- [Gemini（对话应用）](./gemini-chat.md) — 同为大厂生态对话入口：Google 系 vs 微软系。

## 第一次怎么用

1. 用微软账号登录 copilot.microsoft.com，先确认当前是 C 端还是 M365 入口。
2. 在账户隐私面板检查训练用途开关；具体路径与默认态官方未逐条说明，以界面为准。
3. 联网问答要求它给出处；Bing 底座是它的检索线。
4. 深度研究不要在 C 端找：官方已于 2026-08-18 退役，改由 M365 Copilot 的 Researcher 承接。
5. 企业数据走 M365 线，权限与审计与消费档不同。

```text
查一下【主题】的最新官方说法，列出 3 条，每条带来源与日期；
找不到官方来源就写「未找到」，不要用二手转述。
```
