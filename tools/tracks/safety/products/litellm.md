---
id: litellm
form: local-app
name: LiteLLM 网关（Proxy / AI Gateway）
nameEn: LiteLLM Proxy (AI Gateway)
vendor: BerriAI · LiteLLM
homepage: https://docs.litellm.ai/
license: MIT（PyPI 项目页 2026-11-06 直抓在册）；文档另在册部分运维与治理能力属企业版，
  开源核心与企业边界的逐条清单本档不复制，以官方 enterprise 页为准。
licenseEn: MIT (on the PyPI project page, direct-fetched 2026-11-06). The docs record that some operational and
  governance capabilities belong to the Enterprise edition; the item-by-item boundary is not duplicated here —
  see the official enterprise pages.

axes:
  model_access: >-
    这是它的主轴之一：官方 providers 页在册「100+ LLM，一种 OpenAI 格式」，密钥自带（BYO key）；
    自托管端点也在这条线上（页内在册 Ollama、vLLM、Llamafile）。release notes 在册 provider 持续新增
    （2026-11 条目含 Microsoft 365 Copilot、Azure PTU 容量等）。护栏判定不内置，由挂进来的外部 rail 完成。
  runtime: >-
    自托管为主：simple-proxy 页在册 pip 安装后 `litellm --config config.yaml` 起服务，默认 4000 端口；
    deploy 页在册镜像 ghcr.io/berriai/litellm、Docker 运行示例、Helm / Terraform 与 Postgres 依赖、
    健康检查 /health/readiness。首页在册另有托管云用法。生产需数据库这点在 simple-proxy 页明写。
  local_files: >-
    读的是你本机的 config.yaml（模型清单、密钥引用、guardrail 配置），密钥与路由定义都在你自己的环境；
    花费与日志写进你自管的 Postgres。它不读你的业务代码工作区，文件面就是配置与数据落库两处。
  background: >-
    它是常驻网关进程，请求排队、重试与路由由服务侧处理；跨关机续跑取决于你怎么部署（Helm / VM）。
    批处理与异步作业面（如 videos / batches）只在 release notes 里出现过，官方专页本档未逐条核验，记为未知。
  tools: >-
    官方 MCP 页在册它是「MCP Gateway」，提供「governed access to tools」：server 走 config.yaml 或 UI 配置，
    传输支持 HTTP / SSE / stdio，鉴权含 OAuth、API key 与 AWS SigV4，访问按 key / team / organization 控制。
    另外有 A2A、Auto Router、logging 与 OpenTelemetry 页在文档导航在册。
  context: >-
    上下文由调用方透传，网关自身不做记忆或压缩。虚拟密钥、预算与团队是访问层的边界，不是上下文层；
    上下文窗口实际大小由你路由到的模型决定。
  permissions: >-
    访问控制是它的核心：virtual-keys 页在册密钥经 /key/generate 签发，可限模型、预算、速率与团队，
    主密钥用于管理，定时轮换属企业版。guardrails 页在册多数护栏在开源侧可用，
    动态参数与逐 key 护栏控制需企业版。数据流向取决于你接的 provider；SSO 与审计日志在企业版口径下（simple-proxy 页在册）。
    合规认证与第三方审计未核验到官方在册页，记为未知。
  fit: >-
    适合要把多家 provider 收成一个 OpenAI 兼容入口、同时按 key / team 做预算与访问治理、并坚持自托管的团队。
    不适合只要一个薄 SDK 的场景，也不适合把「厂商背书的托管护栏 + 合规承诺」当必需项的团队。

pitfalls:
  - 以为开源版就带 SSO 与审计日志：官方 simple-proxy 页把这些写在企业版口径里
  - 以为 MCP 工具接进来就安全：MCP 页在册的是按 key / team / org 的授权面，策略仍要自己配
  - 以为 100+ provider 等于都能挂护栏：护栏集成是另一份清单，逐 key 控制还要企业版

tags: [本地, 开源, 自托管, 云端, 权限链, webhook, MCP, guardrails]
related: [nemo-guardrails, azure-ai-content-safety, bedrock-guardrails]

sources:
  - label: LiteLLM · 文档首页（开源 AI 网关定位、100+ 模型、quickstart、变更记录入口，2026-11-06 直抓 200）
    url: https://docs.litellm.ai/
    kind: docs
  - label: LiteLLM · Providers（一种 OpenAI 格式接 100+ 模型与自托管端点，2026-11-06 直抓 200）
    url: https://docs.litellm.ai/docs/providers
    kind: docs
  - label: LiteLLM · Run LiteLLM Proxy（pip 安装、--config、4000 端口、生产需数据库、企业版能力边界，2026-11-06 直抓 200）
    url: https://docs.litellm.ai/docs/simple_proxy
    kind: docs
  - label: LiteLLM · Deploy（镜像、Docker / Helm / Terraform、Postgres、健康检查，2026-11-06 直抓 200）
    url: https://docs.litellm.ai/docs/proxy/deploy
    kind: docs
  - label: LiteLLM · Virtual keys（/key/generate、预算/速率/团队、轮换属企业版，2026-11-06 直抓 200）
    url: https://docs.litellm.ai/docs/proxy/virtual_keys
    kind: docs
  - label: LiteLLM · Guardrails quick start（在册集成清单、config.yaml 字段、阻断与掩码、企业边界，2026-11-06 直抓 200）
    url: https://docs.litellm.ai/docs/proxy/guardrails/quick_start
    kind: docs
  - label: LiteLLM · MCP（网关定位、传输与鉴权、按 key/team/org 授权，2026-11-06 直抓 200）
    url: https://docs.litellm.ai/docs/mcp
    kind: docs
  - label: LiteLLM · Release notes（v1.108.0 等于 2026-11-04 的在册条目，2026-11-06 直抓 200）
    url: https://docs.litellm.ai/release_notes
    kind: changelog
  - label: LiteLLM · PyPI（MIT 许可、1.108.1 与 2026-11-05 发布日、Python 版本区间，2026-11-06 直抓 200）
    url: https://pypi.org/project/litellm/
    kind: changelog
  - label: LiteLLM · 官网（开源网关与自托管/云两种用法、企业特性口径，2026-11-06 直抓 200）
    url: https://www.litellm.ai/
    kind: docs

link:
  url: https://docs.litellm.ai/docs/simple_proxy
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: BerriAI / LiteLLM 主体（PyPI 与官网当日在册）；开源项目，无中国区特供版本的官方声明。
  origin_note_en: BerriAI / LiteLLM (on the PyPI page and official site the same day); an open-source project with
    no official statement about a China-specific edition.
  direct: yes
  direct_note: 同日实测 docs.litellm.ai、www.litellm.ai 与 pypi.org 返回 200，安装路由可用；
    自建服务不依赖厂商区域，故「可用」指自托管路由，不指任何合规承诺。
  direct_note_en: Same-day probes returned 200 for docs.litellm.ai, www.litellm.ai and pypi.org, so the install route works;
    self-hosting does not depend on vendor regions. "Usable" here means the self-hosted route, not any compliance claim.
  filing: unknown
  filing_note: 官方文档与官网未写中国大陆备案/登记信息；本次未检索监管公示名单，不做推断。
  filing_note_en: The docs and site say nothing about mainland filing/registration; the public registry was not searched.
  verified: 2026-11-06
---

## 一句话定位

它是自己部署的统一入口，治理面在密钥与预算上。

官方把它写成开源 AI 网关：一种 OpenAI 格式接住多家 provider，
再把「谁能调哪个模型、花多少钱、能碰哪些工具」变成可配置的对象。

## 适合与不适合

适合要把多模型接入收口、需要按 key / team / organization 分层授权，并坚持把密钥与日志留在自己环境里的团队。
不适合只要一个薄客户端 SDK 的场景，也不适合必须拿到厂商背书的托管护栏与合规承诺的团队——
护栏在这里是「你挂进来的外部服务」，不是厂商担保。

## 能力边界

在册的治理对象是：模型访问、预算与速率、团队归属、MCP 工具的可见范围、外部护栏的挂载点。
不在册的：它不做内容安全模型的训练承诺，也不给「拦得准不准」的数字。
按 key 的护栏控制与动态参数被写在企业版口径里，开源版与企业版的边界要按官方页逐条核对。

## 变更记录说明

变更记录有两条官方流水线：docs 站内 release_notes 页与 PyPI 发布记录。
当日在册：release notes 最新条目 v1.108.0（2026-11-04），PyPI 最新 1.108.1（2026-11-05）。
近期条目里能看到与安全相关的连续动作，例如 2026-10-24 更换镜像签名密钥并调整信任根，
以及多条修 spend logging 的记录——花费统计的正确性要靠实测确认，不能只看版本标题。

## 实测记录

本站尚未完成实测。本档不含路由成功率、延迟、护栏拦截率或统计误差数字。

**实测建议**（三条）：

- 逐 key 花费统计在失败请求、批处理与推理配置文件场景下是否准确
- 同一 MCP 工具在有 key / team / org 三层配置时的实际可见范围
- 挂外部护栏后 pre_call 与 post_call 的延迟与阻断行为差异

## 未知项清单

- 批处理 / 异步作业（videos、batches 等）的托管面细节与限制
- 开源版与企业版的完整特性分界清单（只取到文档点到为止的条目）
- 官方云托管版的数据驻留与留存政策
- 合规认证与第三方审计报告
- 数据库与缓存的最小部署要求（Helm / Terraform 之外的裸机口径）

## 相关条目

- [NeMo Guardrails](./nemo-guardrails.md) — 护栏本体在那边；这里决定在哪个入口、对哪些 key 调用它。
- [Amazon Bedrock Guardrails](./bedrock-guardrails.md) — 云内推理层的策略与数据保留模式，这里是可以把它当外部 rail 挂进来的入口层。
- [Azure AI Content Safety](./azure-ai-content-safety.md) — 判定能力在厂商侧，路由与预算治理在网关侧，两层互不替代。
