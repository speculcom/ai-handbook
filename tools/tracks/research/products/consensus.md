---
id: consensus
form: web
name: Consensus
nameEn: Consensus
vendor: Consensus
homepage: https://consensus.app
license: 免费额度+订阅（Consensus Pro）。按官方条款管辖（consensus.app/terms 直抓被 CF 拦截 403，
  2026-10-22——本方法无法核验条款内容，不代表条款不存在）。
licenseEn: Free credits + subscription (Consensus Pro). Governed by official terms (consensus.app/terms
  returned a CF challenge 403 on direct fetch, 2026-10-22 — this method cannot verify the terms' content,
  which does not mean they do not exist).

axes:
  model_access: >-
    科学文献检索引擎+结论抽取：自建论文索引（2 亿+ 篇叙事，官方站点口径——未逐条核验）
    +Consensus Meter（多篇研究的结论极性统计，产品招牌）。
  runtime: >-
    网页（consensus.app）为主入口；文献检索与结论生成都在厂商云端完成，未见官方声明的本地形态。
  local_files: >-
    搜索历史与高亮标注存账户侧云端；PDF/引用导出归本地。未见官方声明的其他本机数据面。
  background: >-
    检索与 Meter 统计即时返回；未见官方任务队列或「关机续跑」类后台任务面（未逐条核验）。
  tools: >-
    **Consensus Meter 是招牌**：对「科学界对 X 的共识方向」给统计式摘要（支持/反对/混合计数）；
    按研究类型/样本量筛选；AI 综合答案带引用；PDF 高亮问答（Pro 线，官方产品面）。
  context: >-
    以搜索历史与文件夹组织研究项目；跨会话记忆与用户画像未核验到官方声明（未逐条核验）。
  permissions: >-
    账号+订阅体系（D9：价格不采）；免费档功能限制（未逐条核验）；训练用途开关未逐条核验。
  fit: >-
    适合：「科学界怎么说」类问题（医学/营养/气候等实证领域）、快速结论极性判断、
    文献初筛。
    不适合：深度系统性综述（抽取面比 Elicit 轻）、中文文献主打、把 Meter 当定论。

pitfalls:
  - Consensus Meter 是「论文计数的极性统计」不是「科学定论」——论文质量不等权，读 Meter 要看底层论文
  - 检索覆盖偏英文实证文献——人文/中文/非期刊来源覆盖有限，如实按领域评估
  - consensus.app 对 curl 返回 CF 403——本站核验方法受限如实标注，不是站点问题

tags: [免费+订阅, 结论极性, ConsensusMeter, 科学文献, 英文向]
related: [elicit, notebooklm, metaso, chatgpt]

sources:
  - label: Consensus · 官网（产品与能力叙事）
    url: https://consensus.app
    kind: official
  - label: Consensus · Terms（官方条款，直抓 CF 403，2026-10-22）
    url: https://consensus.app/terms/
    kind: official
  - label: Consensus · Blog（官方更新线，changelog；直抓 CF 403）
    url: https://consensus.app/blog/
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Consensus（美国）。
  origin_note_en: Consensus (US).
  direct: yes
  direct_note: consensus.app 大陆直连实测 200（2026-10-22）。
  direct_note_en: consensus.app measured 200 direct from mainland (2026-10-22).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Consensus 回答「科学界怎么说」**：Consensus Meter 把多篇研究的结论极性统计成摘要——
快速判断实证领域共识方向；但计数不等权，Meter 不是定论。

## 适合与不适合

适合：实证领域共识速查、文献初筛、结论极性判断。
不适合：深度综述（抽取轻于 Elicit）、中文文献、把 Meter 当答案终点。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Meter 对争议话题的极性统计与人工综述的偏差**
- **按样本量/研究类型筛选后的统计变化**
- **免费档与 Pro 的功能边界**

## 未知项清单

- 索引规模与来源构成（官方叙事未逐条核验）
- ToS 细节（CF 403 未能直抓）
- 训练用途开关（未逐条核验）
- 中文文献覆盖（未核验到官方声明）

## 相关条目

- [Elicit](./elicit.md) — 同为科学文献向：Consensus 速查极性，Elicit 深度抽取综述。
- [NotebookLM](./notebooklm.md) — 互补：Consensus 找文献给极性，NotebookLM 在选定文献内深挖。
- [秘塔 AI 搜索](./metaso.md) — 中文学术对照：秘塔学术档检索中文库，Consensus 英文实证池。
