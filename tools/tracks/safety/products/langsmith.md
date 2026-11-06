---
id: langsmith
form: cloud
name: LangSmith
vendor: LangChain
homepage: https://www.langchain.com/langsmith
license: >-
  商业专有（平台本体不开源）；自托管按官方口径是 Enterprise 加购、需向厂商取 license key
  （self-hosted 文档当日直抓在册）。许可与数据条款正文本次未抓到，记为未知。
licenseEn: >-
  Proprietary commercial platform (the product itself is not open source); self-hosting is, per the official
  docs fetched today, an add-on to the Enterprise plan and requires a license key from sales. The license and
  data-terms text was not fetched today — recorded as unknown.

axes:
  model_access: >-
    被观测与被评测的模型都不由平台提供：官方产品页点名可接 OpenAI、Anthropic、Vercel AI SDK、LlamaIndex
    与自研实现（当日在册）。评测器面含人工、代码、LLM-as-judge、decision model 与成对比较
    （evaluation-concepts 当日在册）。**judge 是否必须自备模型凭据，该页未说明，记为未知。**
  runtime: >-
    主形态是厂商托管云（SaaS），另有 BYOC 与企业版自托管：官方写「Self-hosted LangSmith 是 Enterprise
    加购」「在你自己的 Kubernetes 集群里跑」，默认捆绑存储、生产建议改用外部存储服务
    （self-hosted 文档当日在册）。控制台在浏览器，SDK、CLI 与 API 是代码面。
  local_files: >-
    数据面默认在厂商侧，除非走 BYOC 或自托管；trace 由 SDK 或 OpenTelemetry 上报，
    OTLP 端点是 LANGSMITH_ENDPOINT 加 /otel（当日在册）。平台不读本机代码库；
    **导出与删除接口面本次未逐条核验。**
  background: >-
    在线评测跑在生产 trace 上（evaluation-concepts 当日在册），离线评测用带参考输出的数据集做回归对照；
    官方 changelog 当日在册条目提到在线评测器的细粒度权限与自定义视图。
    **评分队列的吞吐、延迟与抽样口径未在册，记为未知。**
  tools: >-
    OpenTelemetry 摄入并可用 collector 做多目的地 fanout（当日在册）；官方 CLI 可查询与管理
    traces、runs、datasets、evaluators、experiments、insights、threads（当日在册）；
    文档索引在册的 Terraform 面把评测器与规则当代码管。**MCP 接入方式未核验到官方声明，记为未知。**
  context: >-
    观测与评测对象按 workspace 与 project 组织，权限按 workspace 配内置或自定义角色
    （enterprise 文档当日在册）；数据集带参考输出，用于回归对照。
    **保留时长与 TTL 的具体口径未逐条在册，记为未知；「跨会话记忆」不是本类平台的功能面。**
  permissions: >-
    合规标记当日在册：SOC 2 Type II、HIPAA、GDPR（enterprise 文档直抓）；SAML 或 OIDC 单点登录与
    即时用户配置同页在册。档位与配额事实为 Developer 免费档、Plus 与按需 Enterprise（含自托管与 BYOC），
    价格数字按 D9 不采。**是否用客户 trace 训练模型、数据保留条款正文未抓到（privacy 页当日 404），记为未知。**
  fit: >-
    适合要「一个控制台管住 trace、数据集、评测器与告警」、又不想自运维观测栈的团队；
    已用 OpenTelemetry 的应用可先接进来再换后端。不适合把许可门槛当次要问题、
    或必须整机自托管却买不到企业档的团队；本站不测分也不排名。

pitfalls:
  - 把「支持任意框架」当成零成本兼容——接入面靠 SDK 与 OTel，字段口径要在 collector 侧对齐（当日在册）
  - 把自托管当成可自选部署形态——官方口径是 Enterprise 加购，默认捆绑存储、生产要换外部服务
  - 把在线评测当实时告警——异步评分与权限面在 changelog 在册，延迟与抽样口径未逐条核验

tags: [云端, 商业平台, 自托管, WebUI, eval, LangChain, 多模型]

related: [braintrust, promptfoo, adobe-content-credentials]

sources:
  - label: LangSmith · 产品页（自述 Agent 与 LLM Observability Platform；tracing 与 monitoring 与 evaluation；可接任意 LLM 框架；managed cloud 与 BYOC 与 self-hosted，2026-11-06 直抓 200）
    url: https://www.langchain.com/langsmith
    kind: docs
  - label: LangSmith · Evaluation concepts（人工与代码与 LLM-as-judge 与 decision model 与成对评测；离线数据集回归与在线 trace 评测；标注队列，2026-11-06 直抓 200）
    url: https://docs.langchain.com/langsmith/evaluation-concepts
    kind: docs
  - label: LangSmith · Changelog（当日直抓在册，最新条目日期 2026-11-02，覆盖评测、数据集、队列与在线评测器）
    url: https://docs.langchain.com/langsmith/changelog
    kind: changelog
  - label: LangSmith · Self-hosted（Enterprise 加购、自有 Kubernetes 集群、默认捆绑存储与生产用外部存储、license key 走销售，2026-11-06 直抓 200）
    url: https://docs.langchain.com/langsmith/self-hosted
    kind: docs
  - label: LangSmith · Enterprise（自有基础设施托管、SAML 与 OIDC 与即时配置、按 workspace 的角色、SOC 2 Type II 与 HIPAA 与 GDPR，2026-11-06 直抓 200）
    url: https://docs.langchain.com/langsmith/enterprise.md
    kind: docs
  - label: LangSmith · Trace with OpenTelemetry（支持 OTel 追踪、OTLP 端点为 API 地址加 /otel、LANGSMITH_OTEL_ENABLED、collector 多目的地 fanout，2026-11-06 直抓 200）
    url: https://docs.langchain.com/langsmith/trace-with-opentelemetry.md
    kind: docs
  - label: LangSmith · CLI（查询与管理 traces、runs、datasets、evaluators、experiments、insights、threads；curl 安装；OAuth 或 API key 登录，2026-11-06 直抓 200）
    url: https://docs.langchain.com/langsmith/langsmith-cli.md
    kind: docs
  - label: LangSmith · 文档索引（在册含 Terraform 管理评测器与规则即代码等条目，索引页正文 2026-11-06 直抓 200，目标页未逐条抓取）
    url: https://docs.langchain.com/_llms/products-and-setup/lang-smith-setup.txt
    kind: docs
  - label: LangSmith · Pricing（Developer 免费档、Plus、按需 Enterprise 含自托管与 BYOC；价格数字不采，2026-11-06 直抓 200）
    url: https://www.langchain.com/pricing
    kind: pricing

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 官方产品与文档域名归 LangChain（www.langchain.com 与 docs.langchain.com），按当日在册口径记 foreign；公司注册地未逐条核验。
  origin_note_en: the official product and docs domains belong to LangChain (www.langchain.com and docs.langchain.com); recorded as foreign on today's evidence; place of incorporation not item-verified.
  direct: yes
  direct_note: 本档 9 个在册源页面当日直抓均 200（旧域名 docs.smith.langchain.com 当日 308 跳新域名）；docs 站的 security 与 otlp 路径当日 404，数据条款面因此记未知。
  direct_note_en: all nine on-record source pages fetched 200 today (the old docs.smith.langchain.com domain 308-redirected to the new one); the docs site's security and otlp paths returned 404 today, which is why the data-terms surface is recorded as unknown.
  filing: unknown
  filing_note: 本次未检索备案公示名单；托管型开发者平台是否落入备案口径未核验，记入未知项清单。
  filing_note_en: the filing registry was not searched today; whether a hosted developer platform falls under filing scope is unverified — listed under unknowns.
  verified: 2026-11-06
---

## 一句话定位

**LangSmith 是托管型的观测与评测平台**。
当日在册的官方自我定位是「agent 与 LLM 观测平台」，评测是其中一个面板。

## 适合与不适合

适合想要一个控制台同时管 trace、数据集、评测器和告警，又不想自运维观测栈的团队。
已有 OpenTelemetry 的应用可以先接进来，之后再决定要不要同时发往别的后端。
不适合把许可门槛当次要问题的团队：自托管按官方口径是企业版加购，还要自备集群与外部存储。
本站只写它支持哪些评测类型，不写它测出来的分数，也不做同类排名。

## 实测记录

本站尚未完成实测，结论只覆盖能力面与许可面。

**实测建议**（三条，都指向官方可读页没给的东西）：

- judge 凭据归谁：评测器调用产生的模型费用落在厂商侧还是客户账户
- 在线评测的端到端延迟与漏评率：同一条 trace 从产生到出分要多久
- 自托管的真实运维量：Kubernetes 集群、外部存储与 license key 轮换的组合成本

## 变更记录说明

官方 changelog 当日直抓在册，最新条目日期 2026-11-02，条目覆盖评测、数据集、
标注队列与在线评测器的权限面。旧域名 docs.smith.langchain.com 当日 308 跳转新域名，
档案一律按新域名挂源。

## 未知项清单

- 主体归属：LangChain, Inc. 生态；主体细节本次未逐条核验

- LLM-as-judge 与 decision model 评测器是否必须自备模型凭据
- 评分队列的吞吐、延迟与抽样口径
- 数据保留时长与 TTL 的具体数值口径
- 是否使用客户 trace 训练模型（privacy 页当日 404）
- MCP 接入方式与对外集成面
- 导出与删除接口清单
- 备案公示检索

## 相关条目

- [Langfuse](./langfuse.md) — 同是 trace 加评测一体：Langfuse 核心开源可气隙自托管，LangSmith 自托管是企业加购。
- [Arize Phoenix](./arize-phoenix.md) — 同以 OpenTelemetry 为摄入面：Phoenix 跑在你机器上且许可是 ELv2，LangSmith 主体是 SaaS。
- [DeepEval](./adobe-content-credentials.md) — 同做评测：DeepEval 是本地跑的评测框架，评测结果的托管报表面才对应 LangSmith 这类平台。
