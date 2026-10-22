---
id: seaart
form: web
name: SeaArt
nameEn: SeaArt
vendor: 海艺（成都海艺互娱）
homepage: https://www.seaart.ai
license: 免费+订阅。按官方条款页管辖（seaart.ai/en/terms 直抓核验 2026-10-22）；
  商用权按档位与模型许可区分——社区模型页明示「转载模型权利归原作者」、生成图商用范围逐模型标注，
  细节未逐条核验。
licenseEn: Free + subscription. Governed by the official terms page (seaart.ai/en/terms, direct-fetched 2026-10-22);
  commercial rights vary by plan and per-model license — community model pages state reposted models' rights
  belong to original creators, and commercial scope of generated images is labeled per model; details not verified
  line by line.

axes:
  model_access: >-
    多模型聚合平台：官网列第三方模型清单（Seedance/Wan/GPT Image/Seedream/Flux/Qwen Image 等，
    官网导航与隐私页所见）+ 社区模型库（checkpoint/LoRA 托管，模型页标 Base Model 与许可范围）；
    自研模型线未核验到官方声明。
  runtime: >-
    网页（seaart.ai / seaart.me）+ App（官网有 APP 入口）；生成在厂商云端。
    社区模型可下载（模型页有 Download 面）——下载后本地跑走本地生态，不是 SeaArt 提供本地运行时。
  local_files: >-
    作品与模型存账户侧云端；社区模型可下载至本地（模型页 Download 面）。未见官方声明的
    本机数据面——下载后的模型文件归本地文件系统，与平台无关。
  background: >-
    生成即时/排队（高峰期排队是社区常见反馈，档位差异未逐条核验）；无「关机续跑」任务面
    （未核验到声明）；LoRA 训练提交后在云端跑。
  tools: >-
    在线 LoRA 训练（官方页：上传数据集选基础模型 FLUX/SDXL/Pony/Wan 等，可导出对接 ComfyUI）、
    ControlNet/inpainting、图像+视频双线（官网导航所见）、社区画廊（作品带提示词分享）、
    模型市场变现面（官方 FAQ 口径）。
  context: >-
    以作品/模型页组织；跨会话记忆未核验到官方声明。社区模型库是它的「一致性」机制——风格模型可复用不是记忆。
  permissions: >-
    账号+订阅体系（D9：价格不采）；商用权逐模型标注（模型页 License Scope 面所见）；
    训练用途开关未逐条核验。主体是中国团队出海产品（海外用户占比高，官网主站面向海外）。
  fit: >-
    适合：二次元/插画向社区生态、云端 LoRA 训练+导出 ComfyUI、一个平台聚合多家模型、下载社区模型。
    不适合：要官方自研前沿模型（它是聚合方）、要企业级合规叙事、对社区内容治理敏感的场景。

pitfalls:
  - 社区模型的商用许可**逐模型不同**——模型页的 License Scope 才是依据，别按「平台会员=全部可商用」理解
  - 「可下载模型」≠「SeaArt 在本地跑」——下载后走的是本地生态（ComfyUI 等），平台本身是云端服务
  - 中国团队出海产品：主站 seaart.ai 面向海外，大陆可达性与备案口径要分开看（见 cn 块）

tags: [免费+订阅, 社区模型库, LoRA训练, 二次元向, 模型聚合]
related: [flux, kling, stability-ai]

sources:
  - label: SeaArt · 官网（产品与能力叙事、模型清单）
    url: https://www.seaart.ai
    kind: official
  - label: SeaArt · Terms（官方条款，2026-10-22 直抓核验）
    url: https://seaart.ai/en/terms
    kind: official
  - label: SeaArt · Privacy（官方隐私页，2026-10-22 直抓核验）
    url: https://seaart.ai/en/privacy
    kind: official
  - label: SeaArt · Blog（产品更新线，changelog）
    url: https://seaart.ai/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 成都海艺互娱科技有限公司（中国）——主站面向海外的出海产品（官网口径：全球创作者社区）。
  origin_note_en: Chengdu Haiyi Huyu Technology Co., Ltd. (China) — a going-overseas product whose main site
    targets global creators (per official positioning).
  direct: yes
  direct_note: seaart.ai 大陆直连实测 200（2026-10-22）。
  direct_note_en: seaart.ai measured 200 direct from mainland (2026-10-22).
  filing: unknown
  filing_note: 未核验到 seaart.ai 主站对应的生成式 AI 服务备案（2026-10-22 检索）；
    主站面向海外，未核验到≠未备案——公司另有国内线产品，其备案情况不在本档案口径内。
  filing_note_en: no generative-AI service filing found for the seaart.ai main site (searched 2026-10-22);
    the main site targets overseas users — "not found" ≠ "not filed"; the company's domestic-line products
    are outside this profile's scope.
  verified: 2026-10-22
---

## 一句话定位

**SeaArt 是二次元/插画向的社区型聚合创作台**：云端 LoRA 训练+导出、社区模型库（许可逐模型标注）、
多家第三方模型聚合；中国团队（成都海艺互娱）的出海产品。

## 适合与不适合

适合：二次元插画生态、云端训练 LoRA 再导 ComfyUI、社区模型寻宝、一平台多模型。
不适合：要官方自研前沿模型、企业合规叙事优先、对社区内容治理敏感。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **在线 LoRA 训练产物导出 ComfyUI 的兼容性**（格式/触发词是否无损）
- **社区模型库的下载许可面与生成许可面是否一致**
- **聚合各家模型的排队与质量波动**

## 未知项清单

- 自研模型线（未核验到官方声明）
- 训练用途开关与默认态（未逐条核验）
- 主站与国内线（海艺 AI）账号/数据是否互通（未核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [FLUX](./flux.md) — 社区库与训练面都大量基于 FLUX 底座：Flux 档案看权重许可本身。
- [可灵](../video/products/kling.md) — 同为国产出海双线（图+视频）：可灵自研模型，SeaArt 是聚合方。
