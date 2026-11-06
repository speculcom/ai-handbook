---
id: ragas
form: local-app
name: Ragas
vendor: VibrantLabs
homepage: https://docs.ragas.io/
mark: R
license: Apache-2.0（仓库 LICENSE 原文直读，正文为 "Apache License / Version 2.0, January 2004"，2026-11-06）。库本身免费开源，但 LLM 评判指标需自备模型接入与 API key。
licenseEn: Apache-2.0 (repository LICENSE read directly; the text is "Apache License / Version 2.0, January 2004"; 2026-11-06). The library itself is open source, but LLM-judged metrics need your own model access and API key.

axes:
  model_access: >-
    README 的指标示例把评判模型直接写进代码：`AsyncOpenAI` + `llm_factory("gpt-4o", ...)`，并提示需设置 `OPENAI_API_KEY`。
    文档站的 LLM Providers 列 Amazon Bedrock、Google Gemini、OCI Gen AI，自定义面有 Customise models 与 LLM Adapters 页；
    另有不需要模型的 Traditional non LLM metrics。逐 provider 支持矩阵：未逐条清点。
  runtime: >-
    `pip install ragas` 的 Python 库，评测在你自己进程的 `evaluate()` / `aevaluate()` 调用里跑，文档也有 CLI 一节；
    README 另给 `ragas quickstart rag_eval -o ./my-project` 拉模板工程。是否存在官方托管服务面：本批次未取到官方正文
    （README 只给 Discord、博客与咨询邮箱）。
  local_files: >-
    输入是你自己的数据：文档把 Datasets、Evaluation Sample、Testset Generation（RAG / agents / persona / 单跳多跳查询）列为核心对象，
    并称内置 dataset 管理与结果跟踪（Easy to integrate）。结果、缓存与生成测试集的中间产物落在哪里、默认是否上传：官方未说明。
  background: >-
    执行控制在库内：文档目录列出 Run Config、Executor、Caching、Cancelling Tasks，README 示例用 asyncio 调 `metric.ascore(...)`；
    也就是说长跑靠你自己的进程与异步调用。关机后由谁接着跑、有无任务队列：官方未说明。
  tools: >-
    扩展面是代码级：官方文档首页称可用简单装饰器创建自定义指标；集成面在文档目录里分三块——
    Frameworks（LangChain、LangGraph、LlamaIndex、Haystack、AG-UI、Griptape、Swarm 等）、Observability（Arize、LangSmith）、LLM Providers。
    MCP 接入方式：本批次未核验。
  context: >-
    「上下文」在 Ragas 里是被评对象，不是它自己的记忆：RAG 指标族含 Context Precision、Context Recall、Context Entities Recall、
    Noise Sensitivity、Faithfulness、Response Relevancy（文档 Available Metrics 目录），另有 Evaluating Multi-turn Conversations 条目。
    跨会话记忆机制：官方未说明。
  permissions: >-
    Apache-2.0（LICENSE 原文直读）。README 单列 Open Analytics：称只收集最少量的匿名使用数据、采集代码在仓库内开源、汇总数据公开，
    并写明「To opt-out, set the `RAGAS_DO_NOT_TRACK` environment variable to `true`」。
    你的数据经模型 provider 后的留存与训练用途取决于所选 provider：本批次未取到官方条款。
  fit: >-
    适合：给 RAG 或 agent 应用配 LLM 评判指标、没有测试数据要先造测试集、要在自己代码与 CI 里建「改动—评测—观察—迭代」的循环。
    不适合：想要一条 CLI 批量跑公开基准登记册、要沙箱与工具审批这类运行时边界、不愿为评判模型付出 API 调用成本。

pitfalls:
  - 以为它能白拿分数：LLM 评判指标要自备模型与 key，调用有成本
  - 把 Context Precision / Recall 当模型名次：它评的是检索上下文质量
  - 以为仓库还在 explodinggradients 名下：官方路径已跳转至 vibrantlabsai/ragas

tags: [开源, Apache-2.0, Python, eval, RAG, 检索, 本地]
related: [openai-evals, inspect-ai, langfuse]

sources:
  - label: vibrantlabsai/ragas · 仓库 README（定位、安装、ragas quickstart、Open Analytics 与关闭开关；jsDelivr 镜像直读官方仓库原文，2026-11-06）
    url: https://github.com/vibrantlabsai/ragas
    kind: repo
  - label: Ragas · 官方文档站首页（指标族、provider / 框架 / 观测集成、CLI 与自定义化目录；直读 200，2026-11-06）
    url: https://docs.ragas.io/en/stable/
    kind: docs
  - label: vibrantlabsai/ragas · LICENSE（Apache-2.0 原文；jsDelivr 镜像直读，2026-11-06）
    url: https://github.com/vibrantlabsai/ragas/blob/main/LICENSE
    kind: docs
  - label: vibrantlabsai/ragas · Releases（本对象无独立 changelog 页，变更以 releases 为准；本批次未逐条验读）
    url: https://github.com/vibrantlabsai/ragas/releases
    kind: changelog

link:
  url: https://docs.ragas.io/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: VibrantLabs 维护的开源库；本批次未取到面向中国大陆的服务或数据合规条款页。
  origin_note_en: An open-source library maintained by VibrantLabs; no mainland-facing service or data-compliance terms page was captured in this pass.
  direct: unknown
  direct_note: 文档站本批次经 HTTP 200 取到正文，仓库原文经镜像 CDN 取到，未做大陆直连可用实测，故记未知。
  direct_note_en: The docs returned HTTP 200 and the repository text came via a mirror CDN in this pass; no mainland direct-connection measurement was made, so it is recorded as unknown.
  filing: unknown
  filing_note: 无官方依据，本批次未检索公示，不下「未备案」结论。
  filing_note_en: No official basis; the public registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**Ragas 是一个装在你自己项目里的评测库**：它的产品主轴是把「凭感觉看一下输出」换成有名字、可复跑的指标——LLM 评判指标加传统非 LLM 指标，再配上测试数据生成；与同大类的两份相比，它交付的不是基准登记册也不是任务运行时，而是指标与数据集这两件工件。

## 适合与不适合

适合：已经有 RAG 或 agent 应用、想在代码里对每次改动打分并留住结果、手上没有评测数据要先造测试集、需要把指标接进 LangChain / LlamaIndex 一类现有栈或接观测工具。
不适合：指望一条命令跑完公开基准并把结果当结论、需要沙箱与工具审批来约束模型行为、不愿为 LLM 评判付出额外的 API 调用与时间。

## 实测记录

**本站未做端到端实测**：本档案没有安装并运行 `evaluate()` / `aevaluate()`，没有跑过测试集生成，也不给出任何指标分值、准确率或名次；本站不排名。
本节只组织官方 README 与文档站首页里出现过的说法（安装方式、quickstart 模板、指标族与目录、provider 与集成面、Open Analytics 遥测与关闭开关），逐条见 sources 与核验日。
文档站的 Get Started / Core Concepts / CLI 各页正文本批次未取到，结论只停在首页与 README 口径。

## 变更记录说明

本对象无独立 changelog 页可读，变更记录以 releases 为准（见 sources），本批次未逐条清点版本内容。
两条与时效有关的事实：上游仓库最近推送 2026-02-24（GitHub API 核验 2026-11-06），距核验日超 90 天，故 `lifecycle` 记 maintenance；
旧路径 `explodinggradients/ragas` 现以 HTTP 跳转指向 `vibrantlabsai/ragas`（同 API 当日核验），文档站页面页脚显示 December 9, 2025。

## 未知项清单

- 托管服务面是否存在（README 与文档首页只给库、CLI 脚手架与社区/咨询入口）
- 结果、测试集与缓存的本地落盘位置与默认保留策略；默认是否上传任何数据
- 关机或断网后的任务续跑语义
- MCP 接入方式：当日未取到官方正文
- 各 provider 的模型支持矩阵与嵌入模型要求（未逐条清点）
- 遥测数据的具体字段与保存期（README 只给匿名化与开源代码的说法）
- releases 逐条内容与迁移页细节（本批次未验读）

## 相关条目

- [OpenAI Evals](./openai-evals.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。
- [Inspect](./inspect-ai.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。
- [Langfuse](./langfuse.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。

## 第一次怎么用

1. 先确认评判模型：README 示例要 `OPENAI_API_KEY`，换 provider 前先看文档的 LLM Providers 与 Customise models 页。
2. `pip install ragas`；想从模板起步，用 `ragas quickstart rag_eval -o ./my-project`。
3. 没有评测数据时先做测试集生成，再谈指标；有数据就直接按文档的 RAG 指标族（Context Precision / Recall、Faithfulness、Response Relevancy 等）配第一轮。
4. 不想要匿名使用数据，就把 `RAGAS_DO_NOT_TRACK` 设为 `true`（README 口径）。
5. 把评测放进改动流程里复跑，比较的是同一份数据集上指标的变动，而不是别人给出的名次。
