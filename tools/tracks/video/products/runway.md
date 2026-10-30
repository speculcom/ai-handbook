---
id: runway
form: web
name: Runway
nameEn: Runway
vendor: Runway AI, Inc.
homepage: https://runwayml.com/
license: 官方 ToU §4.4「User Inputs and Outputs」：「The Company does not claim ownership of any of your Inputs or Outputs.」+「Subject to your compliance with the Agreement, the Company does not restrict your commercial use of your Outputs.」——不主张所有权、商用不设限（以遵守条款为前提）；§10.1(a) 声明输出可能不唯一。§5(viii) 禁止用输出开发竞争产品。API 嵌入自有应用须按品牌指引标注 Powered by Runway。
licenseEn: Official Terms of Use §4.4 'User Inputs and Outputs': 'The Company does not claim ownership of any of your Inputs or Outputs.' + 'Subject to your compliance with the Agreement, the Company does not restrict your commercial use of your Outputs.' §10.1(a) warns outputs may not be unique. §5(viii) bars using outputs to develop competing products. API embedding requires 'Powered by Runway' branding per guidelines.

axes:
  model_access: >-
    自家 Gen 系模型 + 第三方模型聚合双形态：changelog 显示平台内可调用 Seedance 2.5、Kling 3.0/O3、
    Ideogram 4.5、Seedream 5.0 Flash、ElevenLabs V4 等第三方模型（2026-09~10 条目，2026-10-21 直抓核验）；
    档位分流按 Free/Standard/Pro/Enterprise 线（以定价页为准）。
  runtime: >-
    网页应用为主，另有 DaVinci Resolve 插件（2026-09-23）、Premiere Pro/After Effects 插件（2026-09-08 条目）
    等宿主内入口；生成在 Runway 云端处理。
  local_files: >-
    支持上传素材（图像/视频/音频）作输入；Brand Kits 资产库组织素材；上传内容训练口径见 permissions 维。
  background: >-
    生成为任务制；Agent 形态可多步规划生成（Seedance Draft Mode 条目 2026-10-02）；
    没有「关机续跑」形态的官方声明。
  tools: >-
    Runway MCP 是官方扩展面：Cursor Marketplace（2026-09-23）、Grok Bot 插件（2026-09-17）、
    OpenAI Dots 集成（2026-10-01）均见 changelog；平台内亦聚合第三方生成模型供调用。
  context: >-
    Brand Kits 提供品牌资产复用（Agent 可创建/编辑，2026-09-10 条目）；无跨会话对话记忆形态。
  permissions: >-
    官方 ToU §4.4：输入与输出可能被用于训练与改进其模型——条款写明用户授予
    「non-exclusive, irrevocable, perpetual」训练许可；§4.2 平台不主张 Your Content 所有权，
    但公开区内容会授予大范围许可。未见训练退出开关。
  fit: >-
    重视频生成工作流、要 API/MCP 集成的团队。在意「素材绝不进训练」的先确认——
    条款层面没有退出选项；企业 credit 管控（Project Credit Caps 2026-10-09）是团队向加分项。

pitfalls:
  - 在意训练用途的人以为能退出——条款授予不可撤销的永久训练许可，无退出开关
  - 把「商用不设限」读成无条件——以遵守条款为前提，且 §5(viii) 禁开发竞争产品
  - 把平台内第三方模型（Kling/Seedance 等）的条款当成 Runway 一套——生成能力来自多家，产物条款以 Runway 平台协议为界面，但模型来源方各有口径

tags: [云端, MCP, 插件生态, 模型聚合, 商业]

related: [gemini-chat]

sources:
  - label: Runway · Product Updates & Changelog（官方日志，2026-10-21 直抓核验 MCP/插件/第三方模型聚合条目）
    url: https://runwayml.com/changelog
    kind: changelog
  - label: Runway · Terms of Use（官方条款，Last Updated 2026-09-15，2026-10-20 直抓 200 核验 §4.4 全文）
    url: https://runwayml.com/terms-of-use
    kind: docs
  - label: Runway · Pricing（定价页指针，D9：本站不采价格数字）
    url: https://runwayml.com/pricing
    kind: pricing

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官网直连实测 200。
  direct_note_en: official site measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

视频生成创作平台的头部：Gen 系自家模型 + 第三方模型聚合，MCP/剪辑软件插件全线铺开；
「训练许可不可撤销、无退出开关」是数据条款里最硬的一条。

## 适合与不适合

适合重视频工作流、要 API/MCP 集成与团队管控的创作者和团队。
在意「素材绝不进训练」——条款层面没有退出选项，这一点要先接受。
要模型接口直连（不经平台），对照 Veo/可灵的 API 线。

## 实测记录

本站尚未完成实测。视频生成不适用编码实测协议；能力口径以官方 changelog 为准。

## 未知项清单

- 平台内第三方模型的产物条款分层（模型来源方与平台协议的责任界面，本站未逐条核验）
- 当前全部可用模型与档位分流矩阵（changelog 滚动披露，本站未逐档核验）

## 相关条目

- [Veo（Google）](./veo.md) — 对照路线：模型接口形态、付费不训练
- [可灵 Kling AI](./kling.md) — 对照路线：国产视频生成、商用需过会员线
