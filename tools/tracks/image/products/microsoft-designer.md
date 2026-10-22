---
id: microsoft-designer
form: web
name: Microsoft Designer
nameEn: Microsoft Designer
vendor: 微软
homepage: https://designer.microsoft.com
license: 免费（微软账号；部分能力随 Microsoft 365 订阅）。按微软服务协议管辖
  （microsoft.com/en-us/servicesagreement 直抓核验 2026-10-22）；输出归属与训练口径细节未逐条核验。
licenseEn: Free with a Microsoft account (some capabilities ride on Microsoft 365 subscriptions). Governed by
  the Microsoft Services Agreement (direct-fetched 2026-10-22); output ownership and training details not
  verified line by line.

axes:
  model_access: >-
    模型由微软侧路由（DALL·E 系图像线并入 Bing/Copilot 生态的叙事；当前具体模型档位未逐条核验）；
    用户选功能不选裸模型。
  runtime: >-
    网页（designer.microsoft.com）+ 嵌入 Bing/Copilot/Office 应用的图像能力；生成在微软云端处理。
  local_files: >-
    作品存微软账户侧（与 OneDrive/Office 生态联动面）；本机不跑模型。
  background: >-
    生成即时；无「关机续跑」任务面（未核验到声明）；嵌入 Office 的图像能力随宿主应用前台调用。
  tools: >-
    产品内含文生图、图像编辑（背景移除等）、设计模板（社交图/海报）、图像生成视频类能力线（官网导航所见）；
    与 Canva 类模板设计面重叠但 AI 生成是主轴（本类收录，Canva 不收——见 inventory）。
  context: >-
    以项目组织（与 OneDrive/Office 生态联动面存在，细节未逐条核验）；跨会话记忆未核验到官方声明。
  permissions: >-
    微软账号体系；训练用途开关在微软隐私面板（与 Copilot 同面板线），路径与默认态未逐条核验；
    商用权按订阅档位区分（D9：价格不采）。
  fit: >-
    适合：微软生态用户的轻量设计产出（社交图/海报模板+AI 生成）、免费起步。
    不适合：要模型自选、要开放权重、要脱离微软账号。

pitfalls:
  - Designer 与 Copilot 里的图像生成同生态不同入口——积分/配额按微软口径联动，别按两个独立产品理解
  - 模板设计面像 Canva 但收录边界不同——本站收 Designer（AI 生成是主轴）、不收 Canva（AI 是次要功能）
  - 商用权随订阅档位变化——用前按微软条款核当前档位

tags: [免费+账号, 微软生态, 模板设计, 模型路由]
related: [microsoft-copilot, adobe-firefly, recraft]

sources:
  - label: Microsoft Designer · 官网（产品与能力叙事）
    url: https://designer.microsoft.com
    kind: official
  - label: Microsoft · Services Agreement（官方条款，2026-10-22 直抓核验）
    url: https://www.microsoft.com/en-us/servicesagreement/
    kind: official
  - label: Windows App · What's New（Designer 随生态更新线，changelog）
    url: https://learn.microsoft.com/en-us/windows-app/whats-new
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 微软（Microsoft，美国）。
  origin_note_en: Microsoft (US).
  direct: yes
  direct_note: designer.microsoft.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: designer.microsoft.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Microsoft Designer 是微软生态的免费 AI 设计入口**（模板+生成一体，模型由微软路由）：
与 Copilot 图像线同生态不同入口；商用权随订阅档位变化。

## 适合与不适合

适合：微软生态轻量设计产出、免费起步、模板+AI 混合。
不适合：要模型自选、要开放权重、要脱离微软账号。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **免费与 M365 档的生成配额差异**（D9：价格不采；配额行为实测）
- **当前路由的图像模型档位**
- **训练开关与 Copilot 是否同一面板**

## 未知项清单

- 当前模型路由清单（未逐条核验）
- 免费/订阅配额差异（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 训练用途开关路径（未逐条核验）

## 相关条目

- [Microsoft Copilot](../chat/products/microsoft-copilot.md) — 同生态对话入口：Designer 是设计面，Copilot 是对话面。
- [Adobe Firefly](./adobe-firefly.md) — 同为大厂设计 AI 线：Firefly 企业合规叙事重，Designer 免费轻量。
