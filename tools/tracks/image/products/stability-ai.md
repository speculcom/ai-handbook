---
id: stability-ai
form: web
name: Stability AI（Stable Image 平台）
nameEn: Stability AI (Stable Image platform)
vendor: Stability AI
homepage: https://stability.ai/
license: 官方 ToS §4(a)：「we assign to you all of our right, title, and interest (if any) in the Outputs」——输出物所有权归用户；§3(b) 限制：不得转售输出、不得用输出训练竞争模型、不得去除水印或来源标识。开源的 Stable Diffusion 权重按各自开源许可证发布——自托管商用看模型许可证，与平台条款是两套。
licenseEn: Official ToS §4(a): 'we assign to you all of our right, title, and interest (if any) in the Outputs' — output ownership is assigned to the user. §3(b) limits: no reselling outputs, no training competing models on outputs, no removing watermarks or provenance marks. The open-weight Stable Diffusion models carry their own open licenses — commercial self-hosting follows those model licenses, a separate regime from the platform terms.

axes:
  model_access: >-
    模型家族官方新闻页披露：Stable Image 系（平台）、Stable Audio 3.0（2026-05-20 发布、
    开源权重、官方称训练数据全授权）、Stable Diffusion 3.5 系（可自托管）等条目
    （2026-10-21 直抓 stability.ai/news 核验）。
  runtime: >-
    平台线：网页应用与 API，生成在云端；开源线：权重可下载、本机或自有云自托管——
    两条线是同一厂商的两种运行形态，档案主轴是平台。
  local_files: >-
    平台可上传图像作输入；开源线本机跑模型时数据不出本机（自托管形态的固有属性）。
  background: >-
    平台生成为请求-产出制：任务在云端跑完即取；没有「关机续跑」形态的官方声明。
    开源线自托管时任务完全由自己的机器承载，关机续跑取决于自己的部署方式。
  tools: >-
    平台含 Brand Studio（2026-04-08 条目：品牌向创作生产平台）；企业集成线（Amazon Bedrock
    2025-09-18 条目、NVIDIA NIM 2025-08-12 条目）；开源生态（ComfyUI 等第三方工具）不在本档案范围。
  context: >-
    生成为任务制，无跨会话记忆形态；每次生成独立，风格延续靠提示词与
    平台内的资产库（Brand Studio 素材），不是会话记忆。
  permissions: >-
    官方 ToS：用户可选择退出把内容用于训练（opt-out 机制在条款内写明）；平台对上传内容取得运营所需许可。
    开源权重模型的训练数据口径见官方模型卡与基准报告。
  fit: >-
    想要「平台服务 + 可自托管开源模型」两条线都摸得到的人。商用条款平台版与开源版不同，分开读；
    对训练数据合规敏感的场景可关注其「全授权数据训练」口径的音频线。

pitfalls:
  - 把平台 ToS 套到自托管开源模型——两套许可证体系，商用路径完全不同
  - 以为开源权重可以任意商用——各模型许可证不同（社区/企业许可线），逐模型核对
  - 把「可退出训练」记成 Midjourney 式无开关——Stability 的 opt-out 写在条款里

tags: [云端, 开源权重, 自托管, API, 商业]

related: [gemini-chat]

sources:
  - label: Stability AI · News & Updates（官方新闻页，2026-10-21 直抓核验 Stable Audio 3.0/Brand Studio/Bedrock 等条目）
    url: https://stability.ai/news
    kind: changelog
  - label: Stability AI · Terms of Service（官方条款，2026-10-20 直抓 200 核验 §4(a) 所有权转让与 §3(b) 限制）
    url: https://stability.ai/terms-of-service
    kind: docs
  - label: Stability AI · Membership（定价页指针，D9：本站不采价格数字）
    url: https://stability.ai/membership
    kind: pricing

last_verified: 2026-10-21
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

「平台 + 开源权重」双路线的图像厂商：平台输出所有权转让给用户，
训练退出写在条款里；开源线自托管商用要逐模型看许可证。

## 适合与不适合

适合既要托管平台、又要本机跑开源模型的人——两条线各得其所，但条款是两套。
对训练数据合规敏感的场景可关注其授权数据口径。要开箱即用的最强风格质量，
对照 Midjourney/FLUX 再选。

## 实测记录

本站尚未完成实测。图像生成不适用编码实测协议；能力口径以官方新闻页与模型卡为准。

## 未知项清单

- 平台当前可用的全部模型清单与档位分流（新闻页按条目披露，本站未逐档核验）
- 各开源权重模型许可证的具体商用边界（逐模型许可证本站未逐份核验）

## 相关条目

- [Midjourney](./midjourney.md) — 对照路线：闭源社区形态、默认公开可 Remix
- [FLUX（Black Forest Labs）](./flux.md) — 对照路线：API 平台 + 开源权重家族
