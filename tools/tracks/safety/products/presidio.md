---
id: presidio
form: local-app
name: Presidio
vendor: Data Privacy Stack
homepage: https://presidio.dataprivacystack.org/
mark: PS
accent: "#2F855A"
license: >-
  MIT——依据强度写清楚：PyPI 项目页的许可字段为 MIT、摘要为「Python based service for detecting PII entities in text.」，
  主页指认 github.com/data-privacy-stack/presidio。仓库 LICENSE 正文本批次多次直抓失败（github 仓库页与 raw 路径均超时），
  故此处按官方包索引元数据记 MIT，LICENSE 正文未逐字读到的事实进 unknowns。
licenseEn: >-
  MIT — with the evidence strength stated: the PyPI project page carries license field MIT and the summary
  "Python based service for detecting PII entities in text.", with Home pointing at github.com/data-privacy-stack/presidio.
  Direct fetches of the repository LICENSE page failed repeatedly in this pass (the GitHub repo page and the raw path both
  timed out), so MIT is recorded from the official package-index metadata, and the unread LICENSE text goes to unknowns.

axes:
  model_access: >-
    它本身不带生成模型：analyzer 页写明「Predefined recognizers leverage regex, Named Entity Recognition and other types
    of logic to detect PII in unstructured text.」，识别面由正则、NLP（spaCy / Transformers 类）、规则与校验和组合，
    上下文词用来加权 score，自定义 recognizer 有官方 tutorial。可选 NLP 引擎与模型档位的完整清单：本批次未逐条清点。
  runtime: >-
    全部跑在你自己的边界内：文档首页的安装口径是 pip 包或 Docker REST API，并写明支持离线使用、数据留在你自己的部署里。
    官方未提供托管服务面（未取到该口径）。镜像标签与版本对应关系本批次未逐字核验。
  local_files: >-
    它不读你的工作区，只处理你显式交给它的文本与图像，结果在你的进程或你的服务里返回。recognizer 依赖的语言模型文件的
    下载位置、缓存路径与离线打包方式：本批次未取到逐字官方说明，记未知。
  background: >-
    没有托管后台任务：一次 analyze / anonymize 是一次调用或你自己服务里的一次处理，批量与重试由你的编排层负责。
    官方文档目录（Getting Started / Analyzer / Anonymizer / Image Redactor / Samples / API Docs）未出现队列或续跑概念。
  tools: >-
    三面 API：AnalyzerEngine（识别）、AnonymizerEngine（变换）、Image Redactor（图像遮挡）。变换算子按文档 anonymizer 页
    在册：replace、redact、hash、mask、encrypt、keep、custom，经 OperatorConfig 的 type 与 params 配置，多个算子可组合。
    MCP 接入方式：官方文档未说明，记未知。
  context: >-
    这里的「上下文」是字面机制：recognizer 用上下文词对候选实体加权，因此同一段文本里邻近词会改变结果；文档首页把项目
    表述为面向 text and images 的「fast identification and anonymization modules」。它是无状态的一次处理，不存在跨会话记忆，
    批量场景的上下文窗口管理属于你自己的调用方。
  permissions: >-
    许可见 license 字段（MIT，依 PyPI 元数据；LICENSE 正文未直读到）。归属要记两条实测事实：旧址
    microsoft.github.io/presidio 当日显示「This page has moved」，中间站 data-privacy-stack.github.io 再 301 到
    presidio.dataprivacystack.org，文档首页指认项目由 Data Privacy Stack 治理。**数据流向**：识别与脱敏在你自己的部署内完成、
    支持离线，即文本不必发给第三方。**红线口径**：analyzer 页原文在册「Scores are not probabilities」，所以 score 阈值
    不是检出概率，本站不写检出率、漏检率，也不做任何产品排名；它是否满足某法域的匿名化义务，官方不作法律结论。
  fit: >-
    适合：把个人数据识别与变换插进自己的管线（RAG 入库前、日志落盘前、发给云端模型前）、需要算子级定制与自定义
    recognizer、要求文本不出自己的网络边界、要把整套东西离线跑。不适合：要托管控制台与合规交付物；要文本与图像之外的
    模态（官方在册面止于这两类）；把 score 阈值当合规证明的团队。

pitfalls:
  - 把 score 当「检出概率」：官方 analyzer 页原文是「Scores are not probabilities」
  - 把「算子有七类」当成脱敏覆盖率：算子是可组合动作，官方不给任何命中比例
  - 以为仓库还在 microsoft/presidio：旧址已显示 moved、文档首页指认 Data Privacy Stack 治理

tags: [开源, MIT, Python, 本地, 自托管, API]
related: [nightfall, gitguardian, microsoft-agent-framework]

sources:
  - label: Presidio · 文档首页（新址定位句、pip/Docker REST 与离线口径、Data Privacy Stack 治理、目录与 CHANGELOG 链接；直读 200，2026-11-06）
    url: https://presidio.dataprivacystack.org/
    kind: docs
  - label: Presidio · 旧文档址（「This page has moved」迁移事实；直读 200，2026-11-06）
    url: https://microsoft.github.io/presidio/
    kind: migration
  - label: Presidio · 文档 Analyzer（recognizer 逻辑原文、「Scores are not probabilities」、上下文词加权与自定义 recognizer；直读 200，2026-11-06）
    url: https://presidio.dataprivacystack.org/analyzer/
    kind: docs
  - label: Presidio · 文档 Anonymizer（算子 replace/redact/hash/mask/encrypt/keep/custom 与 OperatorConfig；直读 200，2026-11-06）
    url: https://presidio.dataprivacystack.org/anonymizer/
    kind: docs
  - label: presidio-analyzer · PyPI 项目页（2.2.366、许可字段 MIT、摘要与 Home 指认的仓库地址；直读 200，2026-11-06）
    url: https://pypi.org/project/presidio-analyzer/
    kind: docs
  - label: presidio-analyzer · PyPI 发布历史（2.2.366 至 2.2.361 的日期序列；直读 200，2026-11-06）
    url: https://pypi.org/project/presidio-analyzer/#history
    kind: changelog
  - label: data-privacy-stack/presidio · 仓库页（文档首页指认的仓库位置；本批次直抓失败，未取到正文，仅登记链接关系，2026-11-06）
    url: https://github.com/data-privacy-stack/presidio
    kind: repo
  - label: data-privacy-stack/presidio · CHANGELOG（文档首页指认的变更文件；本批次直抓失败，未取到正文，2026-11-06）
    url: https://github.com/data-privacy-stack/presidio/blob/main/CHANGELOG.md
    kind: changelog

link:
  url: https://presidio.dataprivacystack.org/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 治理方为社区组织 Data Privacy Stack（文档首页在册），项目源自 Microsoft；本批次未取到面向中国大陆的服务条款或中文文档。
  origin_note_en: Governed by the community organisation Data Privacy Stack (on record on the docs home page), with the project originating at Microsoft; no mainland-facing terms page or Chinese documentation was captured in this pass.
  direct: unknown
  direct_note: 文档站与 PyPI 当日从当前网络取到 200，但仓库页与 raw 路径抓取超时；大陆网络下的可达性与语言模型下载均未实测，故记未知。
  direct_note_en: The docs site and PyPI returned 200 from the current network on the verification date, but the repository page and raw path timed out; mainland-network reachability and language-model download were not measured, so it is recorded as unknown.
  filing: unknown
  filing_note: 无官方依据，本批次未检索生成式 AI 备案公示，不下「未备案」结论。
  filing_note_en: No official basis; the generative-AI filing registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**Presidio 是「自己部署的那一层脱敏 SDK」**：文档首页把它写成面向 text 与 images 的快速识别与匿名化模块，
三面 API 是 AnalyzerEngine、AnonymizerEngine、Image Redactor，变换算子官方在册 replace / redact / hash / mask /
encrypt / keep / custom。它和本大类托管那几份的区别只有一条：**文本要不要出你的边界**——Presidio 官方口径是在你自己的
部署里完成、支持离线；也因此它的输出没有任何「拦住了多少」的比例含义，官方 analyzer 页甚至专门写着
「Scores are not probabilities」。

## 适合与不适合

适合：把个人数据识别与变换插进自己的管线（RAG 入库前、日志落盘前、发给云端模型前）、需要算子级组合与自定义
recognizer、要求文本不出网络边界、需要离线跑完整链路。不适合：要托管控制台与合规交付物；要 text/image 之外的模态
（官方在册面止于这两类）；把 score 阈值当合规证明的团队。

## 实测记录

**本站未做端到端实测**：没有安装并调用过 AnalyzerEngine/AnonymizerEngine，没有跑过任何语料来测命中效果，
不产出检出率、漏检率、精度或任何排名，也不清点官方 recognizer 数量。本档案只组织文档首页、Analyzer/Anonymizer 两个
文档页、PyPI 项目页与发布历史在册的说法。

**实测建议**（四条）：

- **自定义 recognizer 的接入成本**（官方 tutorial 在册，实际改动量要自己试）
- **离线部署时语言模型的获取路径**（官方文档未逐字说明下载与缓存位置）
- **算子组合的可逆性与审计留痕**（replace 与 encrypt 混用后的还原边界）
- **换非英语语言时的实体覆盖面差异**（本站不给出比例结论，只验证机制是否可用）

## 变更记录说明

本对象有可核验的变更记录，但不在仓库页上：**PyPI 发布历史在册**（presidio-analyzer 2.2.366 发布于 2026-10-27、
2.2.365 于 2026-10-25、2.2.364 于 2026-07-22、2.2.363 于 2026-06-28、2.2.362 于 2026-03-15、2.2.361 于 2026-02-12）。
文档首页另指认 CHANGELOG.md 位于 github.com/data-privacy-stack/presidio，本批次该仓库页与 raw 路径均抓取超时，
未取到正文——所以变更内容口径以包索引日期为准，逐条内容进 unknowns。按发布密度（近 30 天内有版本）判 lifecycle active。

## 能力边界

- 模态面：官方在册只有文本与图像两条（image redaction 是独立组件）。
- 判定面：输出是候选实体与 score，**官方明确 score 不是概率**；把它读成任何百分比都是越界。
- 变换面：算子是动作（遮、替、哈希、加密、保留、自定义），不承诺「脱敏后不可逆推」这类结论，那是你选算子与密钥管理的责任。
- 合规面：它不产出法律结论；GDPR/个保法意义上的匿名化是否成立，取决于你的整体处理方案，而不是这一个 SDK。

## 未知项清单

- 仓库 LICENSE 正文未直读到（MIT 依 PyPI 许可字段记录）
- CHANGELOG.md 逐条内容未取到正文
- 支持语言与实体类型的官方完整清单（文档 recognizers 页当日返回 404）
- presidio-anonymizer 与 presidio-image-redaction 各自的版本与发布日期
- Docker 镜像标签与版本的对应关系
- recognizer 语言模型的下载位置与离线打包方式
- 可选 NLP 引擎的完整档位与版本要求
- 遥测/上报是否存在（包索引与文档未声明，本批次未取到反证）
- 大陆网络直连可用性与备案情况（未实测、未检索）

## 相关条目

- [Nightfall](./nightfall.md) — 同是「进模型前处理个人数据」，差别在谁执行：那份是托管 API 与算子配置，本档案全部跑在你自己边界内。
- [GitGuardian](./gitguardian.md) — 管的是另一类敏感物：凭据与密钥；两者常在同一条管线上前后串起来，本站不排名。
- [Microsoft Agent Framework](../../framework/products/microsoft-agent-framework.md) — 编排侧：脱敏算子要接进 agent 的输入输出管道时，落点在编排框架那一层。

## 部署建议

1. 先定边界：如果「文本不出内网」是硬约束，本档案这条线是唯一可选项；否则才需要比较托管方案。
2. 装两个包（analyzer 与 anonymizer），先用官方 tutorial 跑一遍 replace 与 mask，再决定要不要自定义 recognizer。
3. 需要服务化时用官方 Docker REST 路径，但把镜像标签与版本钉住——本批次未取到标签对应关系。
4. 记录配置而非结果分数：把 recognizer 集、上下文词与算子参数进版本控制；把 score 阈值写进文档时要同时写明官方那句
   「Scores are not probabilities」。
