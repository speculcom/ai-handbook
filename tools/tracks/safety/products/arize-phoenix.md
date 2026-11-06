---
id: arize-phoenix
form: local-app
name: Arize Phoenix
vendor: Arize AI
homepage: https://github.com/Arize-ai/phoenix
license: >-
  Elastic License 2.0（ELv2，官方仓库 LICENSE 当日直抓在册）；条款明文限制三件事——
  不得把软件作为托管或管理服务向第三方提供、不得绕过 license key 功能、不得移除许可与版权声明。
  官方 README 自称 open source，但 ELv2 不是 OSI 认可的开源许可。
licenseEn: >-
  Elastic License 2.0 (ELv2, per the repository LICENSE direct-fetched today). Three clauses are explicit:
  you may not provide the software to third parties as a hosted or managed service, may not circumvent the
  license-key functionality, and may not remove licensing or copyright notices. The README calls it open
  source, but ELv2 is not an OSI-approved license.

axes:
  model_access: >-
    平台不绑模型厂商，评测面分三层：LLM-as-judge、自定义 Python 与 TypeScript 评估器、
    确定性检查（server-evals 文档当日直抓在册）。内置确定性评估器 contains、exact_match、regex、
    levenshtein_distance、json_distance **不需要 LLM 与 API key**（同日直抓在册）。
    judge 侧支持的厂商适配器全清单本次未逐条核验，记为未知。
  runtime: >-
    本机起服务是主路线：`pip install arize-phoenix` 或 Docker（仓库 README 与 PyPI 当日在册，
    requires-python ≥3.11），界面是本机起的 Web UI；仓库另有 helm 与 kustomize 目录供自有集群部署。
    厂商侧托管线是 Arize AX，不是 Phoenix 本体（README 当日在册）。
  local_files: >-
    自托管时 trace 与评测数据留在自有环境，经 OpenTelemetry 上报；平台不读本机代码库或工作区文件。
    self-hosting 文档分区存在 deployment-options 与 configuration 两个子目录（当日目录结构在册），
    **但正文本次未抓到，外部数据库与对象存储的配置面记为未知。**
  background: >-
    服务端评估器可挂在数据集上，随实验自动运行、无需本地代码（server-evals 文档当日在册）；
    批量对照靠 experiments 跑数据集。关机续跑不是这类平台的功能面。
    评估任务的调度、抽样与重试口径未逐条在册，记为未知。
  tools: >-
    OpenTelemetry 追踪 + Python/JS SDK（Releases 当日在册含 @arizeai/phoenix-cli）；
    仓库文档分区含 tracing、prompt-engineering、datasets-and-experiments、evaluation（当日结构在册）。
    **MCP 接入方式与 API 面本次未核验到官方声明，记为未知。**
  context: >-
    观测对象是 trace 与 span，评测对象是数据集与实验的对照（datasets-and-experiments 分区含
    concepts、how-to、quickstart 文件，当日结构在册）。
    **数据集版本、split 与实验比对口径未读到正文，记为未知。**
  permissions: >-
    许可边界最要紧：ELv2 禁止把软件作为托管或管理服务对外提供，企业功能靠 license key
    （LICENSE 当日直抓在册）。自托管本体无账号体系。
    **官方文档站与产品页当日对本站抓取通道返回 403，商业条款、数据用途与训练开关未读到，记为未知。**
  fit: >-
    适合已把 OpenTelemetry 当观测底座、要在 notebook 或自有集群里跑评测、需要「评估器挂数据集」
    这种批量对照的团队。不适合只要托管控制台、打算把 Phoenix 包一层对外售卖（ELv2 限制这条），
    或要现成红队与合规审计面的场景；本站不测分也不排名。

pitfalls:
  - 把 README 的 open source 当成 OSI 开源许可——本体是 ELv2，对外提供托管服务是条款明文限制项（LICENSE 当日在册）
  - 把「内置评估器」当成一定要接模型——contains、exact_match、regex 等确定性评估器不接 LLM 也不要 API key（当日在册）
  - 把 arize.com 文档站当成可核验入口——当日对本站返回 403，能力面只能以 GitHub 仓内文档与 PyPI 在册

tags: [自托管, WebUI, eval, Python, 本地, 混合]

related: [langfuse, adobe-content-credentials, openai-evals]

sources:
  - label: Arize-ai/phoenix · 仓库 README（自称 open-source AI observability platform，pip 与 Docker、OpenTelemetry、evals library、Arize AX 托管线，2026-11-06 直抓 200）
    url: https://github.com/Arize-ai/phoenix
    kind: repo
  - label: Arize-ai/phoenix · LICENSE（Elastic License 2.0 与三条限制，2026-11-06 直抓 200）
    url: https://github.com/Arize-ai/phoenix/blob/main/LICENSE
    kind: repo
  - label: Phoenix · server-side evals 概览（评估器分 LLM-as-judge、自定义 Python 与 TypeScript、Exact Match 与 Regex 等确定性检查，可挂数据集随实验运行，2026-11-06 直抓 200）
    url: https://github.com/Arize-ai/phoenix/blob/main/docs/phoenix/evaluation/server-evals/overview.mdx
    kind: docs
  - label: Phoenix · 内置评估器清单（contains、exact_match、regex、levenshtein_distance、json_distance，不需 LLM 与 API key，2026-11-06 直抓 200）
    url: https://github.com/Arize-ai/phoenix/blob/main/docs/phoenix/evaluation/server-evals/builtin-evaluators.mdx
    kind: docs
  - label: Phoenix · 仓内文档分区（evaluation 与 datasets-and-experiments 与 self-hosting 与 tracing 与 prompt-engineering，2026-11-06 直抓目录 200）
    url: https://github.com/Arize-ai/phoenix/tree/main/docs/phoenix
    kind: docs
  - label: arize-phoenix · PyPI 官方包页（v21.0.0 页面标 Oct 30 2026、Elastic-2.0、requires-python ≥3.11、evals extras，2026-11-06 直抓 200）
    url: https://pypi.org/project/arize-phoenix/
    kind: docs
  - label: Arize-ai/phoenix · Releases（当日直抓在册，最新 @arizeai/phoenix-cli@1.20.0 页面标 Nov 6）
    url: https://github.com/Arize-ai/phoenix/releases
    kind: changelog

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 按官方仓库自我归属 Arize 记 foreign；公司主体、注册地与「Arize AX 才是托管线」的关系未逐条核验。
  origin_note_en: recorded as foreign on the repository's own attribution to Arize; the legal entity, place of incorporation and the Phoenix-versus-Arize-AX relationship were not item-verified.
  direct: unknown
  direct_note: arize.com 的产品页与文档站当日对本站抓取通道返回 403；github.com 与 pypi.org 当日直抓 200，可达性混合故标 unknown。
  direct_note_en: arize.com's product and docs pages returned 403 to this site's fetch channel today, while github.com and pypi.org fetched 200 — mixed reachability, so marked unknown.
  filing: unknown
  filing_note: 本次未检索备案公示名单；自托管开源组件是否落入备案口径未核验，记入未知项清单。
  filing_note_en: the filing registry was not searched today; whether a self-hosted open-source component falls under filing scope is unverified — listed under unknowns.
  verified: 2026-11-06
---

## 一句话定位

**Phoenix 是开源许可下的观测与评测平台**，跑在你自己的机器或集群里。
它的评测面是「评估器挂在数据集上」，许可面是 Elastic License 2.0。

## 适合与不适合

适合已经把 OpenTelemetry 当地图、要在 notebook 里跑批量对照实验的团队：
trace 先进来，再沉淀成数据集，评估器随实验自动跑，分数与来源调用可回溯。
不适合两类需求——只要厂商托管控制台的，以及想把 Phoenix 包成服务对外卖的
（ELv2 明文禁止把软件作为托管或管理服务提供，当日 LICENSE 在册）。
本站只记它支持哪些评测类型，不记评测出来的分数。

## 实测记录

本站尚未完成实测，结论只覆盖能力面与许可面。

**实测建议**（三条，都指向仓内文档正文没抓全的东西）：

- 数据集版本与实验比对：同一数据集换 judge 模型，历史分数是否可对齐比较
- 确定性评估器与 LLM judge 的分工边界：哪些质量判断本质上只能用规则挡
- 自托管外部依赖成本：接自有 PostgreSQL 与对象存储后的运维负担与备份口径

## 变更记录说明

本对象无独立可抓取的 changelog 页（仓库有 CHANGELOG.md，当日抓到的是 GitHub 页面外壳而非正文）。
变更记录以官方 Releases 在册，最新条目为 @arizeai/phoenix-cli@1.20.0（页面标 Nov 6），
发版节奏密集，因此 lifecycle 记 active。

## 未知项清单

- 主体归属：按官方仓库自我归属记；注册地与主体细节未逐条核验

- judge 侧支持的模型厂商适配器全清单
- 数据集版本、split 与实验比对口径（文档正文未抓到）
- self-hosting 的外部数据库、对象存储与集群配置面（正文未抓到）
- 评估任务的调度、抽样与失败重试口径
- MCP 接入方式与对外 API 面
- 商业条款、数据用途与训练开关（产品页与文档站当日 403）
- 备案公示检索

## 相关条目

- [Langfuse](./langfuse.md) — 同为自托管观测加评测：Langfuse 核心是 MIT，Phoenix 是 ELv2，许可门槛不同。
- [DeepEval](./adobe-content-credentials.md) — 同为评测面：DeepEval 是跑在终端与 CI 里的评测框架，Phoenix 是带界面的观测平台。
- [Sentry MCP](../../mcp/products/sentry-mcp.md) — 跨大类：传统可观测厂商的 LLM 线在 mcp 大类另有 server 档案，与 Phoenix 的 trace 面互补。
