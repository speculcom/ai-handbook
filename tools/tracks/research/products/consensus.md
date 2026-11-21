---
id: consensus
form: web
name: Consensus
nameEn: Consensus
vendor: Consensus
homepage: https://consensus.app
license: 免费额度+订阅（Pro/Deep/Teams/Enterprise）+ API 按调用池。按官方条款/隐私页管辖（consensus.app/home/terms-of-service 与 /home/privacy-policy，2026-11-21）；API/MCP 配额按官方帮助中心（2026-11-21）。
licenseEn: Free credits + subscription (Consensus Pro). Governed by official terms (consensus.app/terms
  returned a CF challenge 403 on direct fetch, 2026-10-22 — this method cannot verify the terms' content,
  which does not mean they do not exist).

axes:
  model_access: >-
    自建 4 亿+ 篇同行评审论文索引，来源包括 Semantic Scholar、OpenAlex、PubMed 与出版商 feed。
    检索用向量与词法混合排序，再按研究设计、样本量、引用与时效加权。
    生成侧用 LLM 做摘要与综合。Consensus Meter 把二值问题的前 20 条结果分成支持、反驳与混合（2026-11-21）。
  runtime: >-
    网页 consensus.app、iOS/Android App、REST API（`docs.consensus.app`）、远程 MCP（`https://mcp.consensus.app/mcp`），
    另有 ChatGPT 与 Claude 集成。检索与生成都在厂商云端（2026-11-21）。
  local_files: >-
    My Library、Collections、上传文档与 Threads 存账户侧云端，上传文件私有于账户。
    引用可导出 BibTeX、RIS、EndNote、CSV，PDF 归本地。API 返回结构化 JSON 与引用元数据（2026-11-21）。
  background: >-
    Research Agent 会规划检索、串联工具并套学术过滤。Deep Review 一次综合 50–100 篇，属平台侧多步任务，
    网页端按任务进度返回。API 与 MCP 每次调用独立，批量筛选由调用方编排（2026-11-21）。
  tools: >-
    产品包括论文检索、逐句回链的 AI 综合答案、Consensus Meter，以及按研究类型、年份、期刊、开放获取与学科过滤。
    另有 Study Snapshot（方法/样本/结局）、Chat with Full Text、My Library/Collections、Threads、Citation Graph、
    Deep Reviews、REST API 与 MCP（2026-11-21）。
  context: >-
    Threads 在同一会话内保留追问上下文。Library 与 Collections 持久保存论文和上传文档。
    跨会话不建用户画像。清空 thread history 会删搜索与关联对话；删账户会撤销集成访问（2026-11-21）。
  permissions: >-
    账号体系，分 Free、Pro、Deep、Teams 与 Enterprise 订阅。REST 用 Bearer API Key，MCP 走 OAuth 2.1，
    含 PKCE 与动态注册，另有低配额匿名档。API 与 MCP 共享每月调用池：Free 30，Pro/Team/Enterprise 500（可加到 1,000），
    Deep 2,000（可加到 10,000），超出 $0.05/次（2026-11-21）。
  fit: >-
    适合：「科学界怎么说」类实证问题、文献初筛与极性统计、给 agent 接有引用的学术检索、需要导出引用。
    不适合：把 Meter 当定论、系统性综述的全文筛选、以中文文献为主打的场景（2026-11-21）。

pitfalls:
  - Consensus Meter 是「论文计数的极性统计」不是「科学定论」——论文质量不等权，读 Meter 要看底层论文
  - 检索覆盖偏英文实证文献——人文/中文/非期刊来源覆盖有限，如实按领域评估
  - consensus.app 对 curl 返回 CF 403——浏览器可达，核验以浏览器抓取为准

tags: [免费+订阅, 结论极性, ConsensusMeter, 科学文献, 英文向]
related: [elicit, notebooklm, metaso, chatgpt]

sources:
  - label: Consensus · 官网（产品与能力叙事，2026-11-21 抓取 200）
    url: https://consensus.app
    kind: official
  - label: Consensus · Terms（官方条款，2026-11-21 抓取 200）
    url: https://consensus.app/home/terms-of-service/
    kind: official
  - label: Consensus · Blog（官方更新线，changelog，2026-11-21 抓取 200）
    url: https://consensus.app/blog/
    kind: changelog
  - label: Consensus Help · How Consensus Works（400M+ 论文与功能面，2026-11-21 抓取 200）
    url: https://help.consensus.app/en/articles/9922673-how-consensus-works
    kind: docs
  - label: Consensus Help · FAQs（Deep Reviews、Meter、Library、Threads 与 API/MCP，2026-11-21 抓取 200）
    url: https://help.consensus.app/en/articles/10073509-faqs
    kind: docs
  - label: Consensus Help · API（每月调用池与 $0.05/次超额，2026-11-21 抓取 200）
    url: https://help.consensus.app/en/articles/16516328-the-consensus-api
    kind: docs
  - label: Consensus · llms-full（REST/MCP 端点、OAuth 与配额表，2026-11-21 抓取 200）
    url: https://consensus.app/llms-full.txt
    kind: docs
  - label: Consensus · Privacy Policy（不卖数据、不用于训练与上传文件私有，2026-11-21 抓取 200）
    url: https://consensus.app/home/privacy-policy/
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**Consensus 回答「科学界怎么说」**：Consensus Meter 把多篇研究的结论极性统计成摘要——
快速判断实证领域共识方向；但计数不等权，Meter 不是定论。

## 适合与不适合

适合：实证领域共识速查、文献初筛、结论极性判断。
不适合：深度综述（抽取轻于 Elicit）、中文文献、把 Meter 当答案终点。

## 实测记录

本档核对官方 llms-full、帮助中心、API 页与隐私政策；Meter 偏差、筛选后统计变化与免费/Pro 边界需按同一问题集实测。
## 未知项清单

- 索引规模与来源构成：官方 llms-full 标 400M+，来源含 Semantic Scholar、OpenAlex、PubMed 与出版商 feed。
- ToS 细节：按官方 terms 页核对。
- 训练用途开关：隐私政策明确不用于训练，条款授权限于服务处理。
- 中文文献覆盖：按同一问题集中英对比实测。
## 相关条目

- [Elicit](./elicit.md) — 同为科学文献向：Consensus 速查极性，Elicit 深度抽取综述。
- [NotebookLM](./notebooklm.md) — 互补：Consensus 找文献给极性，NotebookLM 在选定文献内深挖。
- [秘塔 AI 搜索](./metaso.md) — 中文学术对照：秘塔学术档检索中文库，Consensus 英文实证池。
