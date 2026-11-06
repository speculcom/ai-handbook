---
id: langfuse
form: local-app
name: Langfuse
vendor: Langfuse
homepage: https://langfuse.com
license: >-
  核心 MIT（官方仓库 LICENSE 当日直抓在册为「MIT Expat」）；
  /ee 企业目录另按 ee/LICENSE 管辖，该文件正文本次未抓到，记为未知。
licenseEn: >-
  Core under MIT (the repository LICENSE page, direct-fetched today, reads "MIT Expat");
  the /ee enterprise directory is covered by ee/LICENSE, whose text could not be fetched today — unknown.

axes:
  model_access: >-
    平台自己不产内容，评测量靠你配的模型——LLM-as-a-Judge 走「LLM Connection」，
    凭据由用户自配（judge 文档当日直抓在册）；被观测的应用可接任意框架与模型，
    自托管另有「Bring your own LLM API」口径（self-hosting 页当日在册）。
    **judge 可用模型全清单与版本映射本次未逐条清点，记为未知。**
  runtime: >-
    开源可自部署（Docker Compose 起测试、Kubernetes/Helm 起生产，self-hosting 页当日在册），
    另有官方云（AWS 美/欧/日三区，security 页当日在册）；交互面是 Web 控制台加 SDK 与 API。
    **本机跑的是平台服务与界面，不在本机跑被评测的模型。**
  local_files: >-
    自托管时 trace、score、prompt、数据集都落在自有 PostgreSQL、ClickHouse、Redis 与对象存储
    （当日在册）；数据靠 SDK、OpenTelemetry、API 上报，平台不读本机代码库；
    导出与删除接口面本次未逐条清点。
  background: >-
    在线评测在生产 trace 上异步打分（evaluation overview 与 judge 文档当日在册），
    实验（Experiments）批量跑数据集；关机续跑不是这类平台的功能面。
    **抽样比例、评分延迟与失败重试口径未逐条核验，记为未知。**
  tools: >-
    Python 与 JS SDK、REST API、OpenTelemetry 摄入；官方文档 MCP server 当日直抓在册，
    它只把文档暴露给 agent，能否读 trace 与 score 的鉴权 MCP 面未核验；
    CI/CD 用于「回归时挡住部署」（evaluation overview 当日在册）。
  context: >-
    观测对象按项目组织，trace 与 score 带来源关联；分数类型 NUMERIC、CATEGORICAL、BOOLEAN、TEXT
    四类当日在册；从 trace 沉淀数据集、prompt 版本管理在产品面在册。
    跨项目记忆不是平台功能面，官方未声明。
  permissions: >-
    自托管可 air-gapped，数据留在自有环境；云版 SOC 2 Type II、项目级 RBAC 与 SSO
    （security 页当日在册）；档位与配额事实（Hobby 与 Core、Pro、Enterprise 四档，
    用量单位与数据访问时长随档位变化）当日在 pricing 页在册，价格数字按 D9 不采。
    **是否用客户数据训练模型未读到条款正文，记为未知。**
  fit: >-
    适合要把数据留在自有环境（自托管或气隙部署）、观测与评测共用同一套 trace、
    把线上样本沉淀成数据集再在 CI 挡回归的团队。不适合只想用厂商侧托管红队或合规审计、
    不愿自备 judge 模型密钥的场景；本站不测分也不排名。

pitfalls:
  - 把「平台自带评测」当成自带模型——judge 分数来自你配置的 LLM Connection，密钥与用量都在你账上
  - 把开源当成全功能——核心 MIT、/ee 企业目录另有许可，企业功能边界本次未抓到正文
  - 把在线评测当实时告警——异步打分有延迟与抽样口径，官方可读页未逐条在册

tags: [开源, 自托管, 云端, WebUI, eval, Python, 混合]

related: [promptfoo, adobe-content-credentials, openai-evals]

sources:
  - label: Langfuse · 官方文档（自述 open-source AI engineering platform，tracing 与 prompt 与 evaluations 能力面，2026-11-06 直抓 200）
    url: https://langfuse.com/docs
    kind: docs
  - label: Langfuse · Evaluation overview（judge 与人工标注与自定义评测流程、生产 trace 在线评分、CI 挡回归，2026-11-06 直抓 200）
    url: https://langfuse.com/docs/evaluation/overview
    kind: docs
  - label: Langfuse · Evaluation core concepts（分数四类 NUMERIC 与 CATEGORICAL 与 BOOLEAN 与 TEXT、标注队列，2026-11-06 直抓 200）
    url: https://langfuse.com/docs/evaluation/core-concepts
    kind: docs
  - label: Langfuse · LLM-as-a-Judge（judge 走 LLM Connection 并自配凭据、在线与实验两种触发，2026-11-06 直抓 200）
    url: https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge
    kind: docs
  - label: Langfuse · Self-hosting（Docker Compose 与 Helm、PostgreSQL 与 ClickHouse 与 Redis 与对象存储、自带 LLM API，2026-11-06 直抓 200）
    url: https://langfuse.com/self-hosting
    kind: docs
  - label: Langfuse · Security（AWS 美欧日三区、SOC 2 Type II、项目 RBAC 与 SSO、可气隙部署，2026-11-06 直抓 200）
    url: https://langfuse.com/security
    kind: docs
  - label: Langfuse · MCP（官方文档 MCP server 只暴露文档面，2026-11-06 直抓 200）
    url: https://langfuse.com/docs/docs-mcp
    kind: docs
  - label: Langfuse · Pricing（Hobby 与 Core 与 Pro 与 Enterprise 档位结构与配额事实，价格数字不采，2026-11-06 直抓 200）
    url: https://langfuse.com/pricing
    kind: pricing
  - label: langfuse/langfuse · LICENSE（核心 MIT Expat、/ee 另按 ee/LICENSE，2026-11-06 直抓 200）
    url: https://github.com/langfuse/langfuse/blob/main/LICENSE
    kind: repo
  - label: langfuse/langfuse · Releases（当日直抓在册，最新 v4.76.0 页面标 Nov 05，变更记录以本页为准）
    url: https://github.com/langfuse/langfuse/releases
    kind: changelog

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 官方 /terms 当日 307 跳转 clickhouse.com 通用条款页，按该在册口径记 foreign；注册地与收购关系未逐条核验。
  origin_note_en: langfuse.com/terms 307-redirected to clickhouse.com's general terms page today; recorded as foreign on that evidence; incorporation and acquisition relationship not item-verified.
  direct: yes
  direct_note: langfuse.com 的 docs、evaluation、self-hosting、security、pricing 与 github.com 的 LICENSE、Releases 当日直抓均 200。
  direct_note_en: langfuse.com docs, evaluation, self-hosting, security and pricing plus github.com LICENSE and Releases all returned 200 to direct fetch today.
  filing: unknown
  filing_note: 本次未检索网信办公示名单；开发者向自托管平台是否落入备案口径未核验，记入未知项清单。
  filing_note_en: the CAC public registry was not searched today; whether a developer-facing self-hosted platform falls under filing scope is not verified — listed under unknowns.
  verified: 2026-11-06
---

## 一句话定位

**Langfuse 是开源的观测与评测平台**。
它的核心差异是自托管：trace、评分、提示词和数据集都能留在自己的环境里。

## 适合与不适合

适合数据不能出域、又要「线上看得见的东西变成发布前挡得住的回归」的团队。
它把观测与评测接在同一套 trace 上：先看、再沉淀成数据集、再在 CI 里挡住退化。
不适合只想用厂商侧托管红队或合规审计的场景，也不适合不愿自备 judge 模型密钥的团队。
本站只记它支持哪些评测面，不记它测出来的分数。

## 实测记录

本站尚未完成实测，结论只覆盖能力面与许可面。

**实测建议**（三条，都指向官方可读页没给全的东西）：

- 在线评测的延迟与漏评：同一批生产 trace 下，异步 judge 多久出分、抽样口径怎么定
- 自托管升级路径：从 Docker Compose 换到 Helm 时，ClickHouse 与对象存储的迁移成本
- /ee 边界：核心 MIT 之外，哪些治理与评测能力只存在于企业目录

## 变更记录说明

官方 changelog 页本次直抓返回 404，变更记录以官方仓库 Releases 在册：
最新 v4.76.0（页面标 Nov 05），其前有 v4.75.0、v4.74.0、v4.73.0。
发版节奏接近每日一次，因此 lifecycle 记 active。

## 未知项清单

- judge 可用模型的全清单与版本映射
- 在线评测的抽样比例、评分延迟与失败重试口径
- /ee 企业目录许可正文与对应的企业功能边界
- 是否使用客户数据训练模型（条款正文未读到）
- 官方 changelog 页正文（404，只能以 Releases 代替）
- 备案公示检索与导出、删除接口面清点

## 相关条目

- [Arize Phoenix](./arize-phoenix.md) — 同为可自部署的开源观测加评测；Phoenix 以 OpenTelemetry 与批量实验为中心，许可是 ELv2。
- [Braintrust](./braintrust.md) — 同为评测平台；Braintrust 把评测当发布闸门，托管面更重，自托管只到客户侧数据面。
- [LangSmith](./langsmith.md) — 同为 trace 与评测一体；LangSmith 本体是 SaaS，自托管是企业版加购。
