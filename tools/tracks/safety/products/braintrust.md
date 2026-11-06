---
id: braintrust
form: web
name: Braintrust
vendor: Braintrust AI
homepage: https://www.braintrust.dev
license: >-
  商业专有（平台本体不开源，许可条款正文本次未抓到，记为未知）；
  部署面是「厂商控制面 + 可选客户侧数据面」的混合形态，
  数据面版本线当日在官方 data-plane changelog 在册。
licenseEn: >-
  Proprietary (the platform itself is not open source; the license text was not fetched today — unknown).
  The deployment shape is hybrid — a vendor control plane plus an optional customer-side data plane,
  whose version line is on record in the official data-plane changelog today.

axes:
  model_access: >-
    评测用的模型由你接入：官方页面在册 OpenAI 与 Anthropic 凭据在 Settings 的 Models 里配（当日直抓）。
    scorer 面分代码、LLM judge 与 autoevals 三类（guides/evals 当日在册）。
    **judge 支持的厂商全清单、以及是否统一经网关转发未逐条核验，记为未知。**
  runtime: >-
    主要交互面是浏览器里的控制台（官方文档当日在册的定位是「active observability platform」）；
    评测也能在本机与 CI 用 bt CLI 跑（/cli 当日在册）。数据面可选部署进客户环境，
    控制面留在厂商侧管认证、用户与元数据（/self-hosting 当日在册）。
  local_files: >-
    默认数据在厂商侧；走客户侧数据面时 PostgreSQL、Redis、对象存储与 Brainstore 装在你自己的环境
    （当日在册），控制面只保存认证与元数据。平台不读本机代码库；
    bt CLI 在本地读写评测配置与数据同步（当日在册）。
  background: >-
    生产 trace 用在线打分异步评测（guides/evals 当日在册），实验（experiments）批量跑数据集做回归对照。
    **抽样比例、评分延迟与告警时序的口径在官方故障页有提及，但未逐条核验，记为未知。**
  tools: >-
    bt CLI 经 curl、npm、pnpm 或 mise 安装，可本地与 CI 跑评测、管理函数、查日志、同步数据
    （当日在册）；SDK 面覆盖 Python 与 TypeScript；文档索引在册含 OpenTelemetry 发送 trace 的集成页，
    目标页正文本次未抓。**MCP 接入方式未核验到官方声明，记为未知。**
  context: >-
    trace、实验与数据集在同一面板里对照；人工评审面支持一行填多个分数
    （官方页面当日在册）。**数据集版本与对照口径未读到正文，记为未知；
    「跨会话记忆」不是本类平台的功能面。**
  permissions: >-
    合规与加密当日在册：AES-256、SOC 2 Type II、HIPAA，另称推理输入输出不由模型宿主留存（/security）。
    档位与配额事实为免费至付费档、企业可自定义保留期，配额随 trace 量、数据量与每月分数条数变化
    （pricing 当日在册），价格数字按 D9 不采。**数据是否用于训练未读到条款正文，记为未知。**
  fit: >-
    适合把评测当发布闸门、要在 PR 与 CI 里跑实验对照，又不想自运维整套观测栈的团队。
    不适合要整机自托管（控制面仍在厂商侧）、或想把平台再分发对外提供的团队；
    本站只记支持的评测类型，不记分数也不排名。

pitfalls:
  - 把「自托管」当成整机自己跑——官方口径是数据面在客户环境、控制面管认证与元数据（当日在册）
  - 把在线评测当实时告警——异步打分与告警时序官方另有条目，抽样与延迟口径未逐条核验
  - 把评测成绩当可横向比较的指标——官方只在册支持的 scorer 类型，本站不采分数也不排名

tags: [云端, 商业平台, 自托管, WebUI, eval, 混合, CI]

related: [langsmith, langfuse, adobe-content-credentials]

sources:
  - label: Braintrust · 官方文档首页（自述 active observability platform；trace 采集、人工反馈、实验对照与生产监控的工作流，2026-11-06 直抓 200）
    url: https://docs.braintrust.dev/
    kind: docs
  - label: Braintrust · Evals 指南（scorer 分代码与 LLM judge 与 autoevals；数据集喂实验做 CI 回归；生产走在线打分，2026-11-06 直抓 200）
    url: https://docs.braintrust.dev/guides/evals
    kind: docs
  - label: Braintrust · Changelog（官方更新日志，当日直抓在册，最新条目为 11 月的 bt CLI v0.29.0）
    url: https://docs.braintrust.dev/changelog
    kind: changelog
  - label: Braintrust · Self-hosting（客户环境跑数据面存敏感数据，含 PostgreSQL 与 Redis 与对象存储与 Brainstore，控制面留认证与元数据，AWS 用 Terraform、GCP 与 Azure 用容器，2026-11-06 直抓 200）
    url: https://docs.braintrust.dev/self-hosting
    kind: docs
  - label: Braintrust · Data plane changelog（数据面最新版本 v2.21.0 页面标 11 月，Terraform 与 Helm 覆盖 AWS 与 GCP 与 Azure，2026-11-06 直抓 200）
    url: https://docs.braintrust.dev/data-plane-changelog.md
    kind: changelog
  - label: Braintrust · Security（AES-256、SOC 2 Type II、HIPAA，称推理输入输出不由模型宿主留存，2026-11-06 直抓 200）
    url: https://docs.braintrust.dev/security
    kind: docs
  - label: Braintrust · CLI（bt CLI 经 curl 与 npm 与 pnpm 与 mise 安装，本地与 CI 跑评测、管理函数、查日志、同步数据，2026-11-06 直抓 200）
    url: https://docs.braintrust.dev/cli
    kind: docs
  - label: Braintrust · 模型凭据与网关故障条目（在册 OpenAI 与 Anthropic 凭据在 Settings 的 Models 配置，2026-11-06 直抓 200）
    url: https://docs.braintrust.dev/kb/playground-gateway-error-despite-valid-api-keys.md
    kind: docs
  - label: Braintrust · 人工评审条目（一行支持多个分数写入，2026-11-06 直抓 200）
    url: https://docs.braintrust.dev/kb/human-review-with-multiple-scores-in.md
    kind: docs
  - label: Braintrust · Pricing（免费至付费档、企业可自定义保留期，配额随 trace 量与数据量与每月分数条数变化；价格数字不采，2026-11-06 直抓 200）
    url: https://www.braintrust.dev/pricing
    kind: pricing

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 官方域名 braintrust.dev 与 docs.braintrust.dev 当日在册；公司主体与注册地未逐条核验，按 foreign 记。
  origin_note_en: the official braintrust.dev and docs.braintrust.dev domains are on record today; the legal entity and place of incorporation were not item-verified, so recorded as foreign.
  direct: yes
  direct_note: 本档 10 个在册源页面当日直抓均 200（www.braintrust.dev/docs 与 /changelog 经 308 跳 docs.braintrust.dev 后取到正文）。
  direct_note_en: all ten on-record source pages fetched 200 today (www.braintrust.dev/docs and /changelog 308-redirected to docs.braintrust.dev before the body was retrieved).
  filing: unknown
  filing_note: 本次未检索备案公示名单；托管型开发者平台是否落入备案口径未核验，记入未知项清单。
  filing_note_en: the filing registry was not searched today; whether a hosted developer platform falls under filing scope is unverified — listed under unknowns.
  verified: 2026-11-06
---

## 一句话定位

**Braintrust 是把评测当发布闸门的观测平台**。
当日在册的官方自我定位是「主动式观测平台」，评测、人工反馈与生产打分在同一个面板里。

## 适合与不适合

适合要在 PR 和 CI 里跑实验对照、又想把观测栈托管出去的团队：
数据集喂实验、代码与 judge 与 autoevals 三类 scorer 并行、生产 trace 走在线打分。
数据必须留在自己环境时，它提供「客户侧数据面 + 厂商侧控制面」的混合部署，
但控制面仍在厂商侧，整机自托管不是它的口径。
本站只写它支持什么评测，不写分数，也不做同类排名。

## 实测记录

本站尚未完成实测，结论只覆盖能力面与部署与合规面。

**实测建议**（三条，都指向官方可读页没给全的东西）：

- 在线打分的端到端延迟与抽样漏评：同一条生产 trace 多久出分、抽样规则怎么定
- 混合部署的升级成本：数据面从 v2.21.0 线跟进时，Brainstore 与对象存储的迁移风险
- judge 凭据归属：经网关调用模型时，费用与配额落在谁的账户上

## 变更记录说明

官方 changelog 当日直抓在册，最新条目是 11 月的 bt CLI v0.29.0，10 月条目为 Trace Muse Code。
数据面另有独立版本线，当日在册最新为 v2.21.0（页面标 11 月）。
两条线都在近 30 天内更新，因此 lifecycle 记 active。

## 未知项清单

- 主体归属：主体细节本次未逐条核验，按官方文档域名在册口径记

- judge 支持的模型厂商全清单与是否统一经网关转发
- 在线打分的抽样比例、延迟与告警时序口径
- 数据集版本与实验对照口径（正文未抓到）
- 许可条款正文与数据是否用于训练
- MCP 接入方式与对外集成面
- OpenTelemetry 集成页正文（仅在册文档索引条目）
- 备案公示检索

## 相关条目

- [Promptfoo](./promptfoo.md) — 同做评测与红队：Promptfoo 的主战场在终端与 CI 配置文件，Braintrust 在控制台。
- [DeepEval](./adobe-content-credentials.md) — 同做评测：DeepEval 把指标定义写在测试代码里，Braintrust 把 scorer 当平台资产管理。
- [Arize Phoenix](./arize-phoenix.md) — 同为 trace 加评测：Phoenix 可整机跑在你机器上，Braintrust 的控制面始终在厂商侧。
