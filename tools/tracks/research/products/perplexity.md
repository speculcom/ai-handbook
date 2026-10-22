---
id: perplexity
form: web
name: Perplexity
nameEn: Perplexity
vendor: Perplexity AI
homepage: https://www.perplexity.ai
license: 免费+Pro 订阅。按官方 ToS 管辖（perplexity.ai/hub/legal/terms-of-service 直抓被 CF 拦截 403，
  2026-10-22——本方法无法核验条款内容，不代表条款不存在）。
licenseEn: Free + Pro subscription. Governed by the official ToS (perplexity.ai/hub/legal/terms-of-service
  returned a CF challenge 403 on direct fetch, 2026-10-22 — this method cannot verify the terms' content,
  which does not mean they do not exist).

axes:
  model_access: >-
    多模型路由+自研线：界面可选多家前沿模型（官方产品面），另有自研模型线（官方叙事）；
    具体当前清单未逐条核验。API 平台（perplexity.ai/api）存在，细节未逐条核验。
  runtime: >-
    网页+移动 App 主入口；Comet 浏览器（官方产品线：AI 浏览器，检索+agent 浏览）；
    检索与生成在厂商云端。
  local_files: >-
    线程/收藏历史存账户侧云端；未见官方声明的本机数据面或离线模式（未逐条核验）。
  background: >-
    问答即时；Deep Research 线（多步检索报告，官方产品面）；无「关机续跑」概念。
  tools: >-
    答案带来源角标（产品招牌）、聚焦模式（Focus：学术/社交等检索域切换）、Spaces（知识集合）、
    Pages（发布）、文件上传问答；Comet 把检索延伸到浏览操作面。
  context: >-
    以线程/Spaces 组织，历史可回看；跨会话记忆面存在（官方叙事），细节未逐条核验。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关在账户设置（官方叙事），默认态未逐条核验；
    出版方合作/分成叙事（官方公告线）——内容授权是它的行业角色之一。
  fit: >-
    适合：带来源的事实问答、快速研究入口、英文向检索质量优先。
    不适合：大陆直连（实测 000）、把答案当无源结论（必须点角标核原文）、中文深度检索主打。

pitfalls:
  - 「带来源」≠「来源可靠」——角标要点开核原文，聚合搜索也会聚合到差源
  - Comet 是浏览器不是搜索附属——agent 浏览能力意味着它可能代你操作网页，权限面比搜索大
  - perplexity.ai 大陆直连 000（2026-10-22，代理可达）；官网对 curl 常 403（CF）——核验方法受限如实标注

tags: [免费+订阅, 带来源问答, Comet浏览器, 多模型路由, 需网络环境]
related: [chatgpt, kagi, metaso]

sources:
  - label: Perplexity · 官网（产品与能力叙事）
    url: https://www.perplexity.ai
    kind: official
  - label: Perplexity · ToS（官方条款，直抓 CF 403，2026-10-22）
    url: https://www.perplexity.ai/hub/legal/terms-of-service
    kind: official
  - label: Perplexity · Blog（官方更新线，changelog；直抓 CF 403）
    url: https://www.perplexity.ai/hub/blog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Perplexity AI（美国旧金山）。
  origin_note_en: Perplexity AI (San Francisco, US).
  direct: no
  direct_note: perplexity.ai 大陆直连实测 000（2026-10-22，代理下可达）——直连不可达，需网络环境。
  direct_note_en: perplexity.ai measured 000 direct from mainland (2026-10-22; reachable via proxy) —
    unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Perplexity 是「答案带来源角标」的 AI 搜索旗舰**：多模型路由+自研线，Comet 浏览器把检索延伸成
agent 浏览；「带来源」是招牌，但角标背后的原文仍要自己核。

## 适合与不适合

适合：带来源事实问答、快速研究入口、英文向检索。
不适合：大陆直连（000）、不核原文就引用、中文深度检索主打。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **来源角标与正文论断的对应准确度**（抽样核对）
- **Comet 的 agent 操作权限边界**（它会替你点什么）
- **Deep Research 报告与手动多轮搜索的质量差**

## 未知项清单

- 当前可选模型清单（未逐条核验）
- ToS 条款细节（CF 403 未能直抓——不代表不存在）
- 训练开关默认态（未逐条核验）
- 出版方分成的具体机制（官方叙事，细节未逐条核验）

## 相关条目

- [ChatGPT](../chat/products/chatgpt.md) — 同为带搜索问答：ChatGPT 是对话产品带搜索模式，Perplexity 是搜索产品带对话面。
- [Kagi](./kagi.md) — 同为付费无广告搜索：Kagi 自建索引+无追踪叙事，Perplexity 聚合+答案引擎叙事。
- [秘塔 AI 搜索](./metaso.md) — 中文向对照：秘塔自研 MetaLLM+国内直连，Perplexity 需网络环境。
