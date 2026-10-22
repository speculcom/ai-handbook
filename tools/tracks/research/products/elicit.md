---
id: elicit
form: web
name: Elicit
nameEn: Elicit
vendor: Elicit
homepage: https://elicit.com
license: 免费额度+订阅（Elicit Pro/Team）。按官方条款管辖（elicit.com/terms 直抓被 CF 拦截 403，
  2026-10-22——本方法无法核验条款内容，不代表条款不存在）。
licenseEn: Free credits + subscription (Elicit Pro/Team). Governed by official terms (elicit.com/terms
  returned a CF challenge 403 on direct fetch, 2026-10-22 — this method cannot verify the terms' content,
  which does not mean they do not exist).

axes:
  model_access: >-
    学术检索系统+LLM 抽取管线：自建论文索引（Semantic Scholar 系学术库为底层之一，官方叙事）
    +多家 LLM 做抽取/综合（官方叙事，未逐条清点）。
  runtime: >-
    网页（elicit.com）为主入口；文献检索与抽取生成都在厂商云端完成，未见官方声明的本地形态。
  local_files: >-
    项目/文献库存账户侧云端；导出（CSV/综述文档）归本地。未见官方声明的本机数据面。
  background: >-
    检索即时；系统性综述类任务（多轮筛选/抽取表）是任务线；无「关机续跑」概念。
  tools: >-
    **文献检索+结构化抽取是主轴**：按研究问题检索论文、筛选（纳入/排除标准面）、
    抽取表（样本/方法/结论列）、综述综合（带引用）；「找相似论文」线（官方产品面）。
  context: >-
    以项目（project）组织文献工作；跨会话记忆未核验到官方声明。
  permissions: >-
    账号+订阅体系（D9：价格不采）；免费档检索/抽取额度限制（未逐条核验）；
    训练用途开关未逐条核验。
  fit: >-
    适合：系统性综述/文献调研（医学/社科/ML 等英文文献池）、要「抽取表」而非「读摘要」的研究者。
    不适合：中文文献主打（学术库英文向）、非学术检索、要全文获取（它锚定摘要与可得全文片段）。

pitfalls:
  - 「AI 帮你读文献」≠「AI 结论可信」——抽取表的每个单元格要回原文核，尤其数值类
  - 检索覆盖取决于底层学术库——不在库里的论文检索不到，系统性综述要多库交叉
  - elicit.com 对 curl 返回 CF 403——本站核验方法受限如实标注，不是站点问题

tags: [免费+订阅, 学术检索, 结构化抽取, 系统性综述, 英文向]
related: [notebooklm, consensus, metaso, manus]

sources:
  - label: Elicit · 官网（产品与能力叙事）
    url: https://elicit.com
    kind: official
  - label: Elicit · Terms（官方条款，直抓 CF 403，2026-10-22）
    url: https://elicit.com/terms
    kind: official
  - label: Elicit · Blog（官方更新线，changelog）
    url: https://elicit.com/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Elicit（美国）。
  origin_note_en: Elicit (US).
  direct: yes
  direct_note: elicit.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: elicit.com measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Elicit 是学术文献的「检索+结构化抽取」工作台**：研究问题→论文筛选→抽取表→带引用综述——
系统性综述流程的 AI 化；每个单元格仍要回原文核。

## 适合与不适合

适合：系统性综述/文献调研（英文文献池）、抽取表工作流。
不适合：中文文献主打、非学术检索、要全文获取。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **抽取表数值类字段的准确率**（对照原文抽样）
- **检索召回 vs 手工 PubMed 检索的差集**
- **免费档额度边界**（检索/抽取次数）

## 未知项清单

- 底层学术库清单与覆盖（官方叙事 Semantic Scholar 系，未逐条核验）
- 当前使用的 LLM 清单（未逐条清点）
- ToS 细节（CF 403 未能直抓）
- 训练用途开关（未逐条核验）

## 相关条目

- [NotebookLM](./notebooklm.md) — 源锚定对照：Elicit 帮你找源再锚定，NotebookLM 只锚定你给的源。
- [Consensus](./consensus.md) — 同为科学文献向：Consensus 主打「结论极性」检索，Elicit 主打综述抽取。
- [秘塔 AI 搜索](./metaso.md) — 中文学术检索对照：秘塔有中文库/学术档，Elicit 英文池深。
