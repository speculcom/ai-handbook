---
id: recraft
form: web
name: Recraft
nameEn: Recraft
vendor: Recraft
homepage: https://www.recraft.ai
license: 免费+订阅。官方条款页（recraft.ai/terms 直抓核验 2026-10-22）；
  官方文档口径：免费档作品公开且不可商用、付费档授予商用权——输出归属按该条款管辖，细节未逐条核验。
licenseEn: Free + subscription. Governed by the official terms page (recraft.ai/terms, direct-fetched 2026-10-22);
  per official docs, free-plan works are public and not licensed for commercial use while paid plans grant
  commercial rights — output ownership follows those terms, details not verified line by line.

axes:
  model_access: >-
    自家模型族（V3/V4 线）：官方 API 文档列模型值（recraftv3 / recraftv3_vector 等）；
    闭源无开放权重。差异点是**矢量原生**——可输出真 SVG 文件（官方文档明示 vector/SVG 输出线）。
  runtime: >-
    网页（recraft.ai）+ API（external.api.recraft.ai 官方文档端点）；生成在厂商云端。
    ComfyUI 官方节点是 API 桥接（需 key 联网），不是离线权重。
  local_files: >-
    作品存账户侧云端；SVG/PNG 下载归本地。未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按账号档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）；
    API 侧批量走调用方自己的并发。
  tools: >-
    产品内含风格库+自定义品牌风格（brand kit）、inpainting/outpainting、背景替换、mockup 生成、
    文字定位（官方文档：V3 线是唯一能在图内精确定位文字的线）；API 全操作面文档化。
  context: >-
    以项目组织；跨会话记忆未核验到官方声明。品牌风格是它的「一致性」机制——风格可复用不是记忆。
  permissions: >-
    账号+订阅体系；免费档作品默认公开且不可商用（官方文档口径）——这是它与多数同类最关键的档位差异；
    付费档含商用权（D9：价格不采）。
  fit: >-
    适合：设计向产出（logo/图标/插画要可编辑 SVG）、品牌一致性（brand kit）、图内文字精确排版。
    不适合：免费商用（免费档不可商用是硬线）、要照片级写实主打（它偏设计）。

pitfalls:
  - 免费档作品默认公开且不可商用——这是官方文档明示的档位差异，别按「免费=可商用」的惯性理解
  - ComfyUI 官方节点≠离线权重——它调的是 Recraft API（需 key），「本地跑 Recraft」不成立
  - 「矢量输出」是 V3 Vector 线专属（recraftv3_vector）——不是所有模型值都出 SVG

tags: [免费+订阅, 矢量SVG, 设计向, brand-kit, 图内文字定位]
related: [adobe-firefly, ideogram, flux, figma-mcp]

sources:
  - label: Recraft · 官网（产品与能力叙事）
    url: https://www.recraft.ai
    kind: official
  - label: Recraft · Terms（官方条款，2026-10-22 直抓核验）
    url: https://www.recraft.ai/terms
    kind: official
  - label: Recraft · API 文档（模型值/操作面/矢量线）
    url: https://recraft.mintlify.dev/docs/api-reference/models/recraft-v3
    kind: docs
  - label: Recraft · Blog（产品更新线，changelog）
    url: https://www.recraft.ai/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Recraft（伦敦）。
  origin_note_en: Recraft (London).
  direct: yes
  direct_note: recraft.ai 大陆直连实测 200（2026-10-22）。
  direct_note_en: recraft.ai measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Recraft 是设计向图像台里罕见的「矢量原生」**：真 SVG 输出、brand kit 品牌一致性、图内文字精确定位；
免费档作品公开且不可商用是它最关键的档位硬线。

## 适合与不适合

适合：logo/图标/插画可编辑 SVG、品牌一致性、图内排版。
不适合：免费商用、照片级写实主打。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **SVG 输出的可编辑质量**（路径结构是否真可编辑，还是位图描摹）
- **brand kit 风格一致性的实际稳定度**
- **免费档「公开」的具体含义**（作品是否进公开画廊）

## 未知项清单

- 免费档公开的展示范围与撤回机制（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 训练用途开关（未逐条核验）
- V4 线与 V3 线的能力差异细节（API 文档有列，未逐条核验）

## 相关条目

- [Adobe Firefly](./adobe-firefly.md) — 同为设计向：Firefly 嵌 Adobe 生态，Recraft 独立矢量原生。
- [Ideogram](./ideogram.md) — 同为图内文字强线：Ideogram 主打排版照片混合，Recraft 主打设计矢量。
- [Figma MCP](../../mcp/products/figma-mcp.md) — 设计资产下游：Recraft 出 SVG，Figma MCP 把设计稿接进 agent 工具链（建档后互链）。
