---
id: microsoft-copilot
form: web
name: Microsoft Copilot
nameEn: Microsoft Copilot
vendor: 微软
homepage: https://copilot.microsoft.com
license: 免费+微软账号（部分能力需 Microsoft 365 订阅）。按微软服务协议管辖（2026-10-22 取得）；官方隐私 FAQ 说明默认保存对话 18 个月，除退出用户外对话数据可用于 AI 训练（2026-11-21）。
licenseEn: Free with a Microsoft account (some capabilities require a Microsoft 365 subscription). Governed by the Microsoft Services Agreement (fetched 2026-10-22); the official privacy FAQ says conversations are saved for 18 months by default and, except for opted-out users, can be used for AI training (2026-11-21).

axes:
  model_access: >-
    模型由微软侧路由，官方叙事里 Copilot 用 OpenAI 系模型 + 自家 MAI 系。具体当前档位不公开逐模型清单。「选择器是否存在、能选什么」以登录后界面为准。

    路由随官方调整，不把某次界面快照当承诺（2026-11-21）。
  runtime: >-
    网页（copilot.microsoft.com）+ Windows 内嵌 + iOS/Android App + Edge 内嵌。生成在微软云端处理。

    与 Microsoft 365 Copilot（办公套件内嵌）是相邻但不同的产品面——本档案覆盖 C 端 Copilot（2026-11-21）。
  local_files: >-
    对话历史存于微软账户侧。官方隐私 FAQ 说明默认保存对话、可在 Copilot 应用对话历史查看。默认存储 18 个月，可删除单条或全部。Windows 版引用本机「最近项目」。

    但不会自动扫描或上传文件。浏览历史保存在设备上，按设置决定是否发送（2026-11-21）。
  background: >-
    对话即时返回。官方隐私 FAQ 未列可暂停/续跑的任务队列。C 端 Deep Research 已于 2026-08-18 退役。

    深度研究改由 Microsoft 365 Copilot 的 Researcher 智能体承接（官方支持页，2026-11-21）。
  tools: >-
    联网检索（Bing 底座）、图像生成（Designer / DALL·E 线）、图像理解等能力线内建。

    深度研究在 C 端已退役，Researcher 智能体在 Microsoft 365 Copilot 中提供多步研究。与 Microsoft 365 应用联动属另一产品面。

    MCP 支持官方页未列为 C 端能力（2026-11-21）。
  context: >-
    对话历史登录同步，默认保存 18 个月。官方隐私 FAQ 与个性化页说明 Copilot Memory 会用先前对话推断偏好并在后续对话使用。关闭个性化后停止记忆与个性化，但不会删除历史。

    Copilot Memory 有独立 saved memories 管理入口（2026-11-21）。
  permissions: >-
    微软账号体系（个人/企业两条线）。官方隐私 FAQ 说明除已选择退出的用户外。微软会用 Copilot 对话、上传图像/文件、语音等活动训练 AI。训练前移除姓名、账号标识等可识别信息。

    个性化开关在 Copilot 设置，路径按账户页核对（2026-11-21）。
  fit: >-
    适合：Windows/Edge/Bing 生态用户、要免费联网问答、企业已在微软生态。不适合：要模型自选、要脱离微软账号、大陆直连场景（见 cn 块）（2026-11-21）。
pitfalls:
  - 把 C 端 Copilot 与 Microsoft 365 Copilot 混为一谈——免费网页版与办公套件内嵌是两个产品面，条款与能力不同
  - 与 GitHub Copilot 也不是一个产品——编码向归 coding 大类（copilot 档案），本档案是通用对话
  - 模型「由微软路由」不等于「固定某模型」——路由随官方调整，别把某次界面快照当承诺
  - 还在 C 端找 Deep Research——官方已于 2026-08-18 退役，深度研究改用 M365 Copilot 的 Researcher

tags: [免费+账号, 联网搜索, Windows生态, Bing底座]
related: [chatgpt, gemini-chat, copilot]

sources:
  - label: Microsoft Copilot · 官网（产品入口与能力叙事，2026-11-21 抓取 200）
    url: https://copilot.microsoft.com
    kind: official
  - label: Microsoft · Services Agreement（官方条款，2026-10-22 直抓核验）
    url: https://www.microsoft.com/en-us/servicesagreement/
    kind: official
  - label: Microsoft 365 Copilot · Release Notes（相邻产品面更新线，changelog，2026-11-21 抓取 200）
    url: https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes
    kind: changelog
  - label: Microsoft Support · Deep Research in Microsoft Copilot（C 端 2026-08-18 退役说明，2026-11-21 抓取 200）
    url: https://support.microsoft.com/en-us/microsoft-copilot/deep-research-in-microsoft-copilot
    kind: docs
  - label: Microsoft Learn · Researcher agent FAQ（M365 Copilot 的深度研究智能体，2026-11-21 抓取 200）
    url: https://learn.microsoft.com/en-gb/microsoft-365/copilot/faq-researcher
    kind: docs

  - label: Microsoft Support · Copilot 隐私 FAQ（18 个月存储与训练口径，2026-11-21 抓取 200）
    url: https://support.microsoft.com/zh-cn/microsoft-copilot/privacy-faq-for-microsoft-copilot
    kind: docs
  - label: Microsoft Support · Personalize what Copilot remembers（Copilot Memory 与关闭路径，2026-11-21 抓取 200）
    url: https://support.microsoft.com/en-us/microsoft-365-copilot/personalize-what-microsoft-365-copilot-remembers
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Microsoft Copilot 是 Windows/Edge/Bing 生态的免费对话入口**：联网检索是底座能力，模型由微软侧路由。

与 Microsoft 365 Copilot、GitHub Copilot 是三个不同产品面。别混。

## 适合与不适合

适合：微软生态用户、免费联网问答、企业已在微软体系。
不适合：要模型自选、大陆直连场景（直连 000）。

## 实测记录

本档核对官方隐私 FAQ、个性化页与支持页的能力和权限边界。
模型路由、配额与大陆直连需按账号和网络环境实测。
## 未知项清单

- 当前模型路由的逐模型清单：官方未公开，按登录后界面核对。
- 个性化记忆的默认态与 saved memories 管理细节：按 Copilot 设置页核对。
- 免费档与 M365 档的能力差异：按账户页与订阅权益核对。
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
