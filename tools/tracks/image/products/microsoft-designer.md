---
id: microsoft-designer
form: web
name: Microsoft Designer
nameEn: Microsoft Designer
vendor: 微软
homepage: https://designer.microsoft.com
license: 免费（微软账号；部分能力随 Microsoft 365 订阅）。按微软服务协议管辖（2026-10-22 取得）；官方 FAQ 写明 Designer 仅供个人非商业用途，项目与上传图像计入微软云存储/OneDrive 配额（2026-11-21）。
licenseEn: Free with a Microsoft account (some capabilities ride on Microsoft 365 subscriptions). Governed by the Microsoft Services Agreement (fetched 2026-10-22); the official FAQ licenses Designer for personal, non-commercial use, with projects and uploads counting against Microsoft cloud/OneDrive quota (2026-11-21).

axes:
  model_access: >-
    模型由微软侧路由，官方 FAQ 只把能力描述为生成式 AI 文生图与编辑，不公开逐模型版本；用户选功能不选裸模型。Designer 与 Copilot/Bing 图像线共享生态与配额口径（2026-11-21）。
  runtime: >-
    网页（designer.microsoft.com）+ 嵌入 Bing/Copilot/Office 应用的图像能力；生成在微软云端处理，本机不跑模型。官方 FAQ 说明 Designer 集成在 Web 与 Microsoft 应用和工具中（2026-11-21）。
  local_files: >-
    作品自动保存到微软云端，可在「我的项目」找回，并计入通用 Microsoft 存储配额；上传的个人图像保存到 OneDrive，删除需到 OneDrive 操作。本机不跑模型，导出下载的成品归本机（2026-11-21）。
  background: >-
    生成即时返回；官方 FAQ 未列异步任务队列或关机续跑面，嵌入 Office 的图像能力随宿主应用前台调用。长任务状态按具体入口实测（2026-11-21）。
  tools: >-
    产品内含文生图、图像编辑（背景移除等）、设计模板（社交图/海报）、图像生成视频类能力线；官方 FAQ 把 Designer 描述为生成式 AI 图形设计工具。与 Canva 类模板设计面重叠，但 AI 生成是主轴（2026-11-21）。
  context: >-
    以项目组织，项目在云端「我的项目」中持久保存，并与 OneDrive/Office 生态联动；官方 FAQ 未列跨会话对话记忆或用户画像，项目上下文按设计文件而非对话线程承载（2026-11-21）。
  permissions: >-
    微软账号体系；官方 FAQ 明确 Designer 仅授权个人非商业用途，商用需按订阅档位与微软条款另行核对；训练用途开关在微软隐私面板。上传图像存 OneDrive，删除与配额由账户管理（2026-11-21）。
  fit: >-
    适合：微软生态用户的轻量设计产出（社交图/海报模板+AI 生成）、免费起步。不适合：要模型自选、要开放权重、要脱离微软账号（2026-11-21）。

pitfalls:
  - Designer 与 Copilot 里的图像生成同生态不同入口——积分/配额按微软口径联动，别按两个独立产品理解
  - 模板设计面像 Canva 但收录边界不同——本站收 Designer（AI 生成是主轴）、不收 Canva（AI 是次要功能）
  - 商用权随订阅档位变化——用前按微软条款核当前档位

tags: [免费+账号, 微软生态, 模板设计, 模型路由]
related: [microsoft-copilot, adobe-firefly, recraft]

sources:
  - label: Microsoft Designer · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://designer.microsoft.com
    kind: official
  - label: Microsoft · Services Agreement（官方条款，2026-10-22 直抓核验）
    url: https://www.microsoft.com/en-us/servicesagreement/
    kind: official
  - label: Windows App · What's New（Designer 随生态更新线，changelog，2026-11-21 抓取 200）
    url: https://learn.microsoft.com/en-us/windows-app/whats-new
    kind: changelog

  - label: Microsoft Support · Designer FAQ（云存储、OneDrive 与个人非商业许可，2026-11-21 抓取 200）
    url: https://support.microsoft.com/zh-cn/designer/frequently-asked-questions-about-microsoft-designer
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Microsoft Designer 是微软生态的免费 AI 设计入口**（模板+生成一体，模型由微软路由）：
与 Copilot 图像线同生态不同入口；商用权随订阅档位变化。

## 适合与不适合

适合：微软生态轻量设计产出、免费起步、模板+AI 混合。
不适合：要模型自选、要开放权重、要脱离微软账号。

## 实测记录

本档核对官方 FAQ 与微软条款的能力、存储与许可边界；生成质量、免费/订阅配额与商用权需按账号实测。
## 未知项清单

- 当前图像模型的具体版本：官方 FAQ 未逐模型披露，按产品界面核对。
- 免费与 M365 档的生成配额差异：官方 FAQ 只说更频繁使用可能需要订阅，具体配额按账号页。
- 商用授权的档位边界：官方 FAQ 写明个人非商业许可，商用须另按微软条款核对。
## 相关条目

- [Microsoft Copilot](../chat/products/microsoft-copilot.md) — 同生态对话入口：Designer 是设计面，Copilot 是对话面。
- [Adobe Firefly](./adobe-firefly.md) — 同为大厂设计 AI 线：Firefly 企业合规叙事重，Designer 免费轻量。
