---
id: promptfoo
form: cli
name: promptfoo
vendor: promptfoo
homepage: https://www.promptfoo.dev
license: >-
  MIT（官方仓库元数据经 GitHub API 当日在册，spdx 为 MIT；
  LICENSE 文件正文与官方 changelog 页本次抓取失败，逐字条款记为未知）。
licenseEn: >-
  MIT (per official repository metadata fetched through the GitHub API today, spdx MIT; the LICENSE file body
  and the official changelog page could not be fetched today, so clause wording is recorded as unknown).

axes:
  model_access: >-
    全靠自带凭据：官方 intro 当日在册支持 OpenAI、Anthropic、Azure、Google、HuggingFace
    与 Llama 这类开源模型，口径写明 BYOK 与 API keys。**本地模型走 OpenAI 兼容端点的具体配置面本次未逐条核验。**
    评测器不内置厂商模型，judge 调用落在你配置的账户上。
  runtime: >-
    终端为主：`npx promptfoo init` 起手、`eval` 跑评测、`view` 起本机结果页（当日在册），
    配置是 promptfooconfig.yaml，本地运行**不需要登录**（当日在册）。
    另有 promptfoo.app 托管查看入口，同页在册称分享链接对本组织私有；托管面细节未核验。
  local_files: >-
    读写都在本机：配置、用例与结果产物留在本地目录，viewer 读本地文件渲染（当日在册）；
    测试数据可来自 CSV 或 JSON 与自定义函数（当日在册）。平台不读本机代码库以外的隐式上下文。
  background: >-
    评测是本机进程内跑完的批任务，官方在册有缓存、并发与热重载；CI 里按阈值让构建失败
    （当日在册「Fail the build when quality thresholds aren't met」）。
    关机续跑不适用；**分布式执行与断点续跑面未在册，记为未知。**
  tools: >-
    作为被调用方，它的扩展面是 provider 配置、断言类型与自定义函数，文档索引当日在册含 CI 与
    代码扫描（GitHub Action）集成页；结果可发到 PR 评论（当日在册）。
    **promptfoo 自身是否提供 MCP server 未核验到官方声明，记为未知。**
  context: >-
    评测上下文完全由配置文件定义：多提示词 × 多模型 × 多用例的矩阵对照（当日在册 matrix views），
    期望值可用 CSV 的 __expected 列或自定义函数给（当日在册）。跨会话记忆不是这类工具的功能面。
  permissions: >-
    MIT 许可（当日在册元数据）；本机执行加自带 key，意味着模型调用费用与数据出口都在你自己账户
    （BYOK 口径当日在册）；官方 CI 页建议把 key 存成加密 secrets（当日在册）。
    **promptfoo.app 托管面的数据留存与训练条款正文本次未抓到，记为未知。**
  fit: >-
    适合把评测写进仓库、用一次命令跑多提示词与多模型对照、并在 CI 里按阈值挡住合并的团队。
    不适合要托管控制台做长期指标看板、要厂商侧代跑合规审计的场景；
    本站只记支持的断言类型与红队能力面，不记测出的分数，也不排名。

pitfalls:
  - 把「自带评测能力」当成自带模型——相似度与 rubric 类断言都调你配置的服务，key 与用量在你账上（当日在册）
  - 把红队页当成安全评分——官方在册的是攻击插件与漏洞类别面，本站不采通过率也不排名
  - 把本机 viewer 当成 SaaS——promptfoo.app 是可选面，评测与产物默认留在本机（当日在册）

tags: [开源, MIT, 终端, CI, eval, 本地, 多模型]

related: [arize-phoenix, adobe-content-credentials, openai-evals]

sources:
  - label: promptfoo · 文档 intro（自述 open-source CLI and library for evaluating and red-teaming LLM apps；断言含 determinism 与 similarity 与 JSON validity 与 LLM-rubric；BYOK 与多厂商 provider，2026-11-06 直抓 200）
    url: https://www.promptfoo.dev/docs/intro/
    kind: docs
  - label: promptfoo · 断言与期望值文档（确定性类 equals 与 contains 与 regex 与 json 与 sql 与 latency 与 cost；judge 类 llm-rubric 与 factuality 与 similarity；CSV __expected 与自定义函数，2026-11-06 直抓 200）
    url: https://www.promptfoo.dev/docs/configuration/expected-outputs/
    kind: docs
  - label: promptfoo · 上手页（npx promptfoo init 与 eval 与 view、promptfooconfig.yaml、本地运行不需登录、OPENAI_API_KEY 配置，2026-11-06 直抓 200）
    url: https://www.promptfoo.dev/docs/getting-started/
    kind: docs
  - label: promptfoo · 本机结果页（viewer 命令与结果图表；另在册 promptfoo.app 分享链接对本组织私有，2026-11-06 直抓 200）
    url: https://www.promptfoo.dev/docs/usage/web-ui/
    kind: docs
  - label: promptfoo · CI 集成页（密钥存加密 secrets、阈值不达则构建失败、结果发 PR 评论，2026-11-06 直抓 200）
    url: https://www.promptfoo.dev/docs/integrations/ci-cd/
    kind: docs
  - label: promptfoo · 红队页（自动生成攻击与插件面、覆盖越狱类漏洞检查；不含本站口径的分数结论，2026-11-06 直抓 200）
    url: https://www.promptfoo.dev/docs/red-team/
    kind: docs
  - label: promptfoo · 文档索引（当日在册含 caching、red-team configuration、code scanning 与 GitHub Action 等条目）
    url: https://www.promptfoo.dev/llms.txt
    kind: docs
  - label: promptfoo/promptfoo · 仓库元数据（GitHub API 当日直抓在册：MIT、最近推送 2026-11-06、官方站 promptfoo.dev）
    url: https://api.github.com/repos/promptfoo/promptfoo
    kind: repo
  - label: promptfoo/promptfoo · Releases（经官方 GitHub API 当日在册，最新 0.125.1 发布于 2026-10-25；HTML releases 页正文本次抓取失败）
    url: https://api.github.com/repos/promptfoo/promptfoo/releases/latest
    kind: changelog

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 官方仓库与文档域名当日在册（promptfoo.dev 与 github.com/promptfoo）；项目主体与注册地未逐条核验，按 foreign 记。
  origin_note_en: the official repository and docs domains are on record today (promptfoo.dev and github.com/promptfoo); the entity and place of incorporation were not item-verified, recorded as foreign.
  direct: yes
  direct_note: www.promptfoo.dev 的 7 个文档页当日直抓均 200；github.com 的仓库与 releases HTML 页当日抓取失败（改由官方 GitHub API 在册），npmjs.com 返回 403。
  direct_note_en: seven docs pages on www.promptfoo.dev fetched 200 today; github.com repository and releases HTML pages failed to fetch (taken from the official GitHub API instead), and npmjs.com returned 403.
  filing: unknown
  filing_note: 本次未检索备案公示名单；开源 CLI 本体是否落入备案口径未核验，记入未知项清单。
  filing_note_en: the filing registry was not searched today; whether an open-source CLI falls under filing scope is unverified — listed under unknowns.
  verified: 2026-11-06
---

## 一句话定位

**promptfoo 是终端里的评测与红队工具**。
官方自我定位是「评测与红队 LLM 应用的开源 CLI 与库」，产物留在本机，模型自带 key。

## 适合与不适合

适合把评测当代码资产管理的团队：一份 YAML 定义多提示词、多模型、多用例，
一条命令跑出矩阵对照，再让不达阈值的构建在 CI 里失败。
不适合需要托管控制台做长期指标看板，或希望厂商代跑合规审计的场景。
它另有红队面，但本站只记支持的攻击插件与漏洞类别，不记测出来的分数与通过率。

## 实测记录

本站尚未完成实测，结论只覆盖能力面与许可面。

**实测建议**（三条，都是官方可读页给不出的东西）：

- 阈值门禁的稳定性：同一份配置连跑 20 次，judge 类断言的波动幅度有多大
- 本机产物体积与缓存命中：用例数上千时，缓存与并发参数的实际收益
- 托管面的边界：promptfoo.app 的数据留存、成员权限与导出方式

## 变更记录说明

本对象没有可直接抓到的 changelog 页（/changelog 与 /docs/changelog 当日均 404），
变更记录以官方仓库 Releases 为准；当日经 GitHub API 在册最新为 0.125.1（2026-10-25），
仓库最近推送日期为 2026-11-06，因此 lifecycle 记 active。

## 未知项清单

- 主体归属：官方仓库元数据当日在册自述站点为 promptfoo.dev；公司主体未逐条核验

- LICENSE 文件正文与逐字许可条款（当日抓取失败，仅有 API 元数据在册）
- 官方 changelog 页正文（两处路径当日均 404）
- 本地模型（OpenAI 兼容端点）接入的具体配置面
- 分布式执行与断点续跑能力
- promptfoo 自身是否提供 MCP server
- promptfoo.app 托管面的数据留存与训练条款
- 备案公示检索

## 相关条目

- [Langfuse](./langfuse.md) — 同做评测：Langfuse 把 trace 与数据集放在平台里长期留存的，promptfoo 把评测留在仓库与 CI。
- [Braintrust](./braintrust.md) — 同以评测挡回归：Braintrust 的 scorer 是平台资产，promptfoo 的断言是配置文件。
- [Ollama](../../runner/products/ollama.md) — 跨大类：本机跑的开源模型服务是它最常见的被测对象之一，形态归 runner。
