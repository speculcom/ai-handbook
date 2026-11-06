---
id: rebuff
form: local-app
name: Rebuff
nameEn: Rebuff
vendor: Protect AI
homepage: https://github.com/protectai/rebuff
mark: RB
accent: "#5FA86A"
license: Apache-2.0（官方 LICENSE 文件为 Apache License Version 2.0 全文；PyPI 分类器同为 Apache Software License）。开源，但官方用法要求自备外部凭据：
  SDK 初始化传 OpenAI 与 Pinecone 的密钥与索引名，自托管 server 还要 Supabase——即「库免费，运行所需的服务与密钥自理」。
licenseEn: Apache-2.0 (the official LICENSE file is the full Apache License Version 2.0 text; the PyPI classifier says the same).
  Open source, but the documented usage requires bring-your-own credentials: the SDK is initialised with an OpenAI key and a Pinecone
  key plus index name, and the self-hosted server additionally needs Supabase — the library is free, the services and keys are on you.

axes:
  model_access: >-
    官方 README 的四层里有一层就是「用一个专用 LLM 分析进来的 prompt」，因此模型是显式配置项：
    `RebuffSdk(openai_apikey, pinecone_apikey, pinecone_index, openai_model)`，其中 openai_model 可选、默认 gpt-3.5-turbo。
    向量侧官方给的是 Pinecone，自托管段落允许换成 Chroma。除 OpenAI 之外的 LLM 提供方官方未说明。
  runtime: >-
    两条路径都在你侧：`pip install rebuff` 的 SDK 跑在你自己的应用进程里；自托管 Playground/API server 是 Node 应用，
    按 README 在 `server/` 目录 `npm install` 后 `npm run dev`，起在 `http://localhost:3000`，
    并需要先把 SQL 库与向量库按 Supabase / Pinecone 搭起来。官方 hosted playground 域名当日未取到正文。
  local_files: >-
    官方正文的处理对象始终是 prompt 文本与 completion 文本，未声明读取工作区文件、目录或附件的能力。
    自托管时它需要的是数据库与向量库连接，而不是对你仓库的访问——文件级能力官方未说明。
  background: >-
    SDK 形态随宿主应用进程生死；自托管 server 形态是常驻服务（带 Supabase 与向量库）。
    官方未说明任务队列、定时复检或关机续跑类机制。
  tools: >-
    官方 README 声明的四层检测是 Heuristics、LLM-based detection、VectorDB、Canary tokens；
    SDK 面是 `detect_injection`、`add_canary_word`、`is_canaryword_leaked` 三个入口。
    官方路线图勾选了 JavaScript/TypeScript SDK，把「Python SDK 与 TS 对等」留在未完成项。MCP 或其他扩展接入方式官方未说明。
  context: >-
    它的「记忆」就是向量库：官方描述为把历史攻击的 embedding 存进 VectorDB 以识别相似攻击，
    并在 canary 泄漏时把该输入 prompt 的 embedding 写回，形成 attack signature learning。
    库容量、保留时长与清理策略官方未说明。
  permissions: >-
    许可 Apache-2.0（见 license 字段）。数据流向由配置决定：官方示例要求传入 OpenAI 与 Pinecone 凭据，
    即被检测文本会交给所配置的外部服务；官方正文当日未给出隐私或数据处理条款。
    自托管环境变量清单里另有 MASTER_API_KEY、MASTER_CREDIT_AMOUNT、BILLING_RATE_INT_10K，
    说明 server 侧自带额度与按请求扣减的概念（README 给出该整数的换算口径，本站不展开数字）。合规认证与训练用途官方未说明。
  fit: >-
    适合在自家应用里加一层提示注入告警与 canary 泄漏自检、并把攻击样本沉淀成向量的研究与工程试验。
    不适合需要维护承诺、需要明确数据处理条款、或需要完全离线运行的场景：
    仓库已归档，且「Local-only mode」在官方路线图里仍是未完成项。

pitfalls:
  - 把四层防御理解成保障承诺：README 的 Disclaimer 自述仍是原型，不能提供完全防护
  - 以为可以纯本地跑：Local-only mode 至今是官方路线图未勾选项，检测层默认要外部 LLM
  - 以为 Python SDK 与 TS SDK 对等：官方路线图把 Python 对等项列为未完成

tags: [开源, 混合]
related: [llm-guard, canary-scan, nemo-guardrails]

sources:
  - label: Rebuff · 仓库提交历史（最后提交 2024-01-25；无独立 changelog 页）
    url: https://github.com/protectai/rebuff/commits/main
    kind: changelog

  - label: PyPI · rebuff（0.1.1，2024-01-20 发布；发布记录充当变更记录）
    url: https://pypi.org/project/rebuff/
    kind: changelog

  - label: Rebuff · 仓库 README（四层检测、SDK 用法与自托管配置）
    url: https://github.com/protectai/rebuff
    kind: repo

  - label: Rebuff · 仓库 docs 目录（how-it-works / quickstart / self-hosting）
    url: https://github.com/protectai/rebuff/tree/main/docs
    kind: docs

  - label: Rebuff · 官方 LICENSE（Apache-2.0 全文）
    url: https://github.com/protectai/rebuff/blob/main/LICENSE
    kind: docs

link:
  url: https://github.com/protectai/rebuff
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: archived
confidence: partial

cn:
  origin: foreign
  origin_note: Protect AI（GitHub 组织 Protect AI，主体为美国公司），非国产产品。
  origin_note_en: Protect AI (GitHub organisation "Protect AI", a US-based company); not a domestic product.
  direct: unknown
  direct_note: 当日核验了 GitHub 与 PyPI 在通用网络下的可达性；docs 域名无响应，未做大陆直连实测。
  direct_note_en: GitHub and PyPI reachability were checked on the general network today; the docs domain returned no response. No mainland direct-access test was run.
  filing: unknown
  filing_note: 当日未检索网信办公示名单，无官方依据判定备案状态；该产品不面向大陆公众提供服务。
  filing_note_en: The CAC public registry was not searched on the verification day, so filing status has no official basis; the product does not serve the mainland public.
  verified: 2026-11-06
---

## 一句话定位

Protect AI 开源的「自硬化」提示注入检测器：启发式 + 专用 LLM 判定 + 历史攻击向量库 + canary 词泄漏回检四层叠在一起，
泄漏一次就把那次的 embedding 存下来用于下次识别。它是嵌在你应用里的 SDK 与可自托管的服务，不是替你运行模型的网关。

## 适合与不适合

适合给自己产品的输入加一层注入告警、并顺手做泄漏自检的团队，也适合把攻击样本累积成向量库做研究复现。
不适合需要维护承诺与合规条款的生产链路（仓库已归档），也不适合必须完全离线的部署——
官方路线图的 Local-only mode 至今未勾选，README 的 SDK 初始化就要 OpenAI 与 Pinecone 凭据。

## 实测记录

本站未做端到端实测：没有安装 SDK、没有起过自托管 server、也没有构造过 canary 泄漏样例。
本页结论只来自官方 README、LICENSE、仓库 docs 目录清单与 PyPI / GitHub 元数据（2026-11-06 抓取）；
官方文档站域名当日无响应，故 docs.rebuff.ai 的正文未纳入。

## 未知项清单

- 当日未取到官方正文：docs.rebuff.ai 与 playground.rebuff.ai 均无响应，只读到仓库内 docs 目录的文件名
- 除 OpenAI 之外的 LLM 提供方是否可用
- 启发式层的具体规则集与可定制范围（官方路线图把「User Defined Detection Strategies」留在未完成）
- 向量库容量、保留时长与清理机制
- 数据处理与隐私条款、是否有遥测
- Python SDK 与 TS SDK 的实际能力差距（README 与官方 tests 徽章显示两套测试，未逐条核验）
- 大陆直连与备案状态（cn 块记为 unknown）

## 相关条目

- [LLM Guard](./llm-guard.md) — 同属「护栏与内容过滤」线：本档案只写自己在册的官方口径，对照请看那份。
- [CanaryScan](./canary-scan.md) — 同属「护栏与内容过滤」线：本档案只写自己在册的官方口径，对照请看那份。
- [NeMo Guardrails](./nemo-guardrails.md) — 同属「护栏与内容过滤」线：本档案只写自己在册的官方口径，对照请看那份。

## 官方声明的能力面

README（2026-11-06 抓取）对四层的原样表述：Heuristics 在输入到达 LLM 前过滤可疑内容；
LLM-based detection 用专用 LLM 分析 prompt 并识别攻击；VectorDB 存历史攻击 embedding 以拦相似攻击；
Canary tokens 在 prompt 里加令牌以检测泄漏，并据此刻录本次输入的 embedding 防未来攻击。

Disclaimer 原文：

> Rebuff is still a prototype and **cannot provide 100% protection** against prompt injection attacks!

**这句话是选型的第一读项**：它是官方对自己能力边界的定性，本站不引任何检出或绕过数字。

## 部署前提（官方自托管口径）

README 的自托管一节要求先备齐 Supabase、OpenAI 与向量库（Pinecone，或按文档换 Chroma），
再在 `server/` 目录准备 `.env.local`，其中包含 OPENAI_API_KEY、MASTER_API_KEY、BILLING_RATE_INT_10K、
MASTER_CREDIT_AMOUNT、Supabase anon key 与 URL、Pinecone key / environment / index name、
SUPABASE_SERVICE_KEY 与 REBUFF_API，之后 `npm install` 与 `npm run dev`，服务落在 `http://localhost:3000`。
其中 BILLING_RATE_INT_10K 的官方解释是每请求扣减的额度单位，README 另行给出该整数的换算口径（本站不展开数字）。

## 归档状态

仓库 `archived` 标志为真；最后提交 2024-01-25，最后推送 2024-08-07，PyPI 版本停在 0.1.1（2024-01-20）。
据此 lifecycle 记 `archived`、confidence 上限 `partial`：本页描述的是它定格时的能力面，不代表当前可用状态。
