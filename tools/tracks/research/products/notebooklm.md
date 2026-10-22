---
id: notebooklm
form: web
name: NotebookLM
nameEn: NotebookLM
vendor: Google
homepage: https://notebooklm.google.com
license: 免费+Google AI 订阅档。按 Google 服务条款与 NotebookLM 附加条款管辖
  （notebooklm.google/terms 直抓核验 2026-10-22）；训练用途口径按官方 FAQ（「不使用 NotebookLM
  源做训练」类承诺叙事，条款级细节未逐条核验）。
licenseEn: Free + Google AI subscription tiers. Governed by Google ToS plus NotebookLM addenda
  (notebooklm.google/terms, direct-fetched 2026-10-22); training practice follows the official FAQ
  ("sources not used for training"-type narrative; terms-level details not verified line by line).

axes:
  model_access: >-
    Gemini 系模型驱动（官方叙事）；用户不选模型——产品形态是「源锚定问答」，模型是内部实现。
  runtime: >-
    网页（notebooklm.google.com）+ 移动 App；处理在 Google 云端。
  local_files: >-
    笔记本与源存账户侧云端；源可上传（PDF/Docs/网页链接/YouTube 等，官方产品面）。
  background: >-
    问答即时；Audio Overview（播客式音频概览）是生成任务线；无「关机续跑」概念。
  tools: >-
    **源锚定是产品主轴**：回答带源引用、可追问；Studio 线生成音频概览/简报/学习指南等
    衍生形态（官方产品面）；笔记本内源管理（添加/删除/摘要）。
  context: >-
    以笔记本（notebook）组织——每个笔记本是一组源+对话；跨笔记本记忆未核验到官方声明。
  permissions: >-
    Google 账号体系；免费档与订阅档的笔记本数/源量上限差异按官方页（未逐条核验，D9：价格不采）；
    训练用途：官方 FAQ 有「不用你的源训练」类承诺——引用前核 FAQ 原文（未逐条核验）。
  fit: >-
    适合：给定资料集内的问答与研究整理（论文组/尽调材料/课程资料）、把长材料转成音频概览、
    要「答案只从你的源里出」的场景。
    不适合：开放网络检索（它不做全网搜索——源是你给的）、大陆直连（实测 000）。

pitfalls:
  - NotebookLM 不是搜索引擎——它只在你给的源里回答；「查全网」要用 Perplexity 类产品
  - Audio Overview 的生成质量随源质量波动——垃圾进垃圾出在源锚定产品里同样成立
  - 「不用源做训练」是官方 FAQ 承诺——企业敏感材料仍要按条款与 Workspace 合规面核（未逐条核验）

tags: [免费+订阅, 源锚定, 音频概览, Google生态, 需网络环境]
related: [gemini-chat, elicit, metaso]

sources:
  - label: NotebookLM · 官网（产品与能力叙事）
    url: https://notebooklm.google.com
    kind: official
  - label: NotebookLM · Terms（官方条款，2026-10-22 直抓核验）
    url: https://notebooklm.google/terms
    kind: official
  - label: NotebookLM · Release Notes（官方更新线，changelog，2026-10-22 直抓核验）
    url: https://notebooklm.google/release-notes
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Google（美国）。
  origin_note_en: Google (US).
  direct: no
  direct_note: notebooklm.google.com 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: notebooklm.google.com measured 000 direct from mainland (2026-10-22; 200 via proxy) —
    unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**NotebookLM 是「源锚定」的研究工作台**：你给一组源，它只在这些源里回答+生成音频概览/学习指南；
它不是搜索引擎——是资料集上的问答引擎。

## 适合与不适合

适合：给定资料集内问答（论文组/尽调/课程）、长材料转音频、源引用可追溯。
不适合：开放网络检索、大陆直连（000）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **长 PDF（500+ 页）的源覆盖完整度**（会不会静默截断）
- **Audio Overview 对中文源的支持质量**
- **免费档笔记本/源上限的实际值**（D9：价格不采；额度实测）

## 未知项清单

- 各订阅档的笔记本/源量上限（未逐条核验）
- 训练承诺的条款级落点（FAQ 叙事，未逐条核验）
- 跨笔记本记忆（未核验到官方声明）
- 当前驱动模型档位（未逐条核验）

## 相关条目

- [Gemini](../chat/products/gemini-chat.md) — 同厂不同产品：Gemini 是开放对话+检索，NotebookLM 是封闭源集问答。
- [Elicit](./elicit.md) — 同为文献研究向：Elicit 检索学术库再锚定，NotebookLM 只锚定你上传的源。
- [秘塔 AI 搜索](./metaso.md) — 中文向对照：秘塔学术检索+全网，NotebookLM 源集内深挖。
