---
id: flux
form: cloud
name: FLUX（Black Forest Labs）
nameEn: FLUX (Black Forest Labs)
vendor: Black Forest Labs
homepage: https://bfl.ai/
license: 官方 ToS 1.2(a)：平台不主张输出物所有权；1.3(e)：商用权限于用户自己的 Output；1.3(n)：禁止用 Output 训练其他模型。开源 FLUX 权重按各自开源许可证发布——自托管商用看模型许可证，与平台条款是两套。
licenseEn: Official ToS 1.2(a): the platform does not claim ownership of Outputs. 1.3(e): commercial use is limited to your own Outputs. 1.3(n): training other models on Outputs is prohibited. Open FLUX weights are released under their respective open licenses; commercial self-hosting follows those model licenses — a separate regime from the platform terms.

axes:
  model_access: >-
    模型家族官方博客披露迭代线：FLUX 3（2026-07-23「Real World Models」多模态流模型条目）、
    FLUX 3 Video Part 1（2026-08-04）、FLUX Video Upscale 2K/4K（2026-08-20）、
    FLUX 3 Action（2026-09-23）、FLUX 3 Image Klein（2026-10-15，5.6B 开源权重条目）
    ——2026-10-21 直抓 bfl.ai/blog 核验；部分权重开源可自托管。
  runtime: >-
    托管线：官方 API 与 playground，生成在云端；开源线：权重可下载自托管，
    官方另有端侧条目（FLUX.2 Klein 进 ASUS ProArt 笔记本，2026-06-04）。
  local_files: >-
    API/playground 可上传图像作输入；自托管线本机跑模型时数据不出本机。
  background: >-
    API 为请求-产出制：任务在云端跑，客户端可断开后轮询取回；
    没有「关机续跑」形态的官方声明——模型接口本身不承载跨会话任务。
  tools: >-
    主形态是模型接口（API/playground），被第三方应用与平台集成（如 Runway、各类图像工作流）；
    官方不做终端创作套件。
  context: >-
    模型接口无状态：每次请求独立，不带跨请求记忆；上下文延续由调用方的应用层
    自行组织（多参考图输入是请求内能力，不是会话记忆）。
  permissions: >-
    官方 ToS：默认可能用输入与输出改进模型，退出走 legal@blackforestlabs.ai 邮件申请；
    条款对「用输出训练其他模型」有明确限制（1.3(n)）。
  fit: >-
    要接 FLUX 官方 API、或想自托管开源 FLUX 权重的人/团队。托管与自托管许可路径不同，
    商用前先确认走哪条；做模型训练的人注意 1.3(n) 的输出训练禁令。

pitfalls:
  - 把「不主张所有权」读成「随便商用」——商用限于你自己的 Output，且 1.3(n) 禁训练其他模型
  - 把托管 API 条款套到自托管开源权重——两套许可证体系
  - 训练退出不是自助开关——要发邮件到 legal@ 申请

tags: [API, 开源权重, 自托管, 端侧, 商业]

related: [veo]

sources:
  - label: Black Forest Labs · Blog（官方博客，2026-10-21 直抓核验 FLUX 3/Klein/Video Upscale 等条目与日期）
    url: https://bfl.ai/blog
    kind: changelog
  - label: Black Forest Labs · Terms of Service（官方条款，2026-10-20 直抓 200 核验 1.2(a)/1.3(e)/1.3(n) 与 legal@ 退出路径）
    url: https://blackforestlabs.ai/terms-of-service/
    kind: docs
  - label: Black Forest Labs · Pricing（定价页指针，D9：本站不采价格数字）
    url: https://bfl.ai/pricing
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
  direct_note: 官网 bfl.ai 直连实测 200。
  direct_note_en: bfl.ai measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

图像模型家族的双路线供应商：官方 API/playground 托管生成，部分权重开源可自托管甚至进端侧；
「不主张所有权、但禁训练其他模型」是条款里最锋利的一刀。

## 适合与不适合

适合要接 FLUX API 做集成、或要自托管开源权重的团队。做模型训练的人先读 1.3(n)——
用 FLUX 输出训练其他模型被条款禁止。要开箱即用的创作社区形态，对照 Midjourney 再选。

## 实测记录

本站尚未完成实测。图像生成不适用编码实测协议；能力口径以官方博客与模型卡为准。

## 未知项清单

- 托管 API 当前全部模型与档位分流（博客按条目披露，本站未逐档核验）
- 各开源权重许可证的具体商用边界（逐模型许可证本站未逐份核验）

## 相关条目

- [Midjourney](./midjourney.md) — 对照路线：闭源社区形态、默认公开可 Remix
- [Stability AI（Stable Image 平台）](./stability-ai.md) — 对照路线：平台 + 开源权重双线
