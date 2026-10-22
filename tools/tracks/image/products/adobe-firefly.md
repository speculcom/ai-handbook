---
id: adobe-firefly
form: web
name: Adobe Firefly
nameEn: Adobe Firefly
vendor: Adobe
homepage: https://firefly.adobe.com
license: 免费额度+Creative Cloud 订阅。Adobe 通用条款+Firefly 专项条款管辖
  （adobe.com/legal/terms.html 直抓核验 2026-10-22）；Adobe 官方长期口径：Firefly 训练数据含授权内容库，
  企业客户可获输出赔偿（indemnification）——具体条款细节未逐条核验。
licenseEn: Free allowance + Creative Cloud subscription. Governed by Adobe's general terms + Firefly-specific terms
  (adobe.com/legal/terms.html, direct-fetched 2026-10-22); Adobe's long-standing official position: Firefly is
  trained on licensed content and enterprise customers can receive output indemnification — clause details not
  verified line by line.

axes:
  model_access: >-
    Firefly 自家模型族（图像/视频/音效多模态线）+ 平台内可选第三方模型（官方叙事：Firefly 应用可调用
    第三方模型，未逐条清点）；模型由 Adobe 侧上架。
  runtime: >-
    网页（firefly.adobe.com）+ 嵌入 Photoshop/Premiere 等 CC 应用的生成能力（生成填充等）——
    本档案覆盖独立 Firefly 产品线；CC 内嵌线按边界裁决不单列（见 inventory 备注）。
  local_files: >-
    作品存 Adobe 云（Creative Cloud 存储面）；本机不跑模型。
  background: >-
    生成即时/排队（网页队列按账号档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）；
    CC 应用内嵌线随应用前台运行，不是后台代理。
  tools: >-
    产品内含文生图、生成填充/扩展、风格参考、结构参考、矢量重着色（设计向）、视频生成（Firefly 视频线）等；
    与 Adobe Stock/Express 生态联动是官方叙事的一部分。
  context: >-
    以项目/库组织（CC 生态：Firefly 作品与 CC 资产库联动面存在，细节未逐条核验）；
    跨会话记忆未核验到官方声明。
  permissions: >-
    Adobe 账号+CC 订阅体系；商用赔偿（indemnification）是企业向卖点（官方长期口径）；
    训练数据口径=授权内容库（官方长期口径）——这两点是它与多数同类最大的合规差异。
  fit: >-
    适合：企业合规采购（赔偿+授权训练叙事）、已在 Adobe 生态、设计到交付链路。
    不适合：脱离 Adobe 账号体系、要开放权重本地跑（Firefly 不开源）。

pitfalls:
  - 独立 Firefly 产品线 ≠ Photoshop 里的生成填充——同模型族两入口，条款与积分池按 Adobe 口径联动但产品面不同
  - 「商用赔偿」有适用条件（账号类型/使用面）——企业采购前按 Adobe 官方条款核赔偿范围，别把营销口径当无条件承诺
  - Firefly 不开源——「Adobe 模型本地跑」这条线不成立

tags: [免费额度+订阅, 企业赔偿, 授权训练数据, Adobe生态, 不开源]
related: [recraft, microsoft-designer, clipdrop, figma-mcp]

sources:
  - label: Adobe Firefly · 官网（产品与能力叙事）
    url: https://firefly.adobe.com
    kind: official
  - label: Adobe · Terms of Use（官方条款，2026-10-22 直抓核验）
    url: https://www.adobe.com/legal/terms.html
    kind: official
  - label: Adobe Firefly · What's New（产品更新线，changelog）
    url: https://helpx.adobe.com/firefly/whats-new.html
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Adobe（美国）。
  origin_note_en: Adobe (US).
  direct: yes
  direct_note: firefly.adobe.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: firefly.adobe.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Adobe Firefly 是「企业合规叙事」最重的图像生成线**：授权内容训练+输出赔偿是它的采购卖点，
嵌 Adobe 生态（独立线+CC 内嵌两入口）；不开源。

## 适合与不适合

适合：企业合规采购、Adobe 生态用户、设计到交付链路。
不适合：脱离 Adobe 账号、要开放权重。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **赔偿条款的实际适用档位与范围**（按 Adobe 条款核，别按营销口径）
- **免费额度与 CC 订阅积分池的联动规则**
- **第三方模型在 Firefly 里的当前清单**（官方叙事未逐条清点）

## 未知项清单

- 第三方模型清单（未逐条清点）
- 赔偿适用条件细节（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 训练数据「授权内容库」的具体构成（官方长期口径，构成未公开逐条核验）

## 相关条目

- [Recraft](./recraft.md) — 同为设计向：Recraft 矢量原生独立台，Firefly 嵌 Adobe 生态。
- [Microsoft Designer](./microsoft-designer.md) — 同为大厂免费设计入口：Designer 绑微软生态，Firefly 绑 Adobe 生态。
- [Figma MCP](../../mcp/products/figma-mcp.md) — 设计工作流衔接：Firefly 出图，Figma MCP 把设计稿接进 agent 工具链（建档后互链）。
