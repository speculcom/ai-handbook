---
id: openai-evals
form: cli
name: OpenAI Evals
vendor: OpenAI
homepage: https://github.com/openai/evals
mark: E
license: MIT（仓库 LICENSE.md 原文直读，首行 "MIT License"、"Copyright (c) 2023 OpenAI"，2026-11-06）。开源框架需自备 OpenAI API key 或自行实现 CompletionFn；Snowflake 日志是可选外部服务。
licenseEn: MIT (LICENSE.md read directly: "MIT License", "Copyright (c) 2023 OpenAI", 2026-11-06). The open-source framework needs your own OpenAI API key or a self-implemented CompletionFn; Snowflake logging is an optional external service.

axes:
  model_access: >-
    要有自己的模型接入：README 写明运行评测需要先设置 `OPENAI_API_KEY`，官方提示按 API 计费。
    docs/run-evals.md：默认支持 OpenAI API 上的任意模型，任何实现 `CompletionFn` 协议的对象都可被 `oaieval` 调用，
    仓库 `evals/registry/completion_fns` 提供现成完成函数。OpenAI 之外托管服务的一等支持：官方未说明。
  runtime: >-
    本机 Python 进程，README 标 "Minimum Required Version: Python 3.9"；`pip install evals` 装运行环境，
    自建评测建议克隆仓库后 `pip install -e .`。主入口是终端命令 `oaieval`（单评测）与 `oaievalset`（评测集），可脚本化进 CI。
    README 首行另把托管用法指向 OpenAI Dashboard 的 Evals 文档；那条云线本批次未取到官方正文。
  local_files: >-
    评测定义是仓库内 YAML（`evals/registry/evals`、`evals/registry/eval_sets`），实现代码在 `evals/elsuite`；
    数据集走 Git-LFS 取到 `evals/registry/data`。默认日志写本机 `tmp/evallogs` 的 JSONL，`--record_path` 可改路径。
    按 README，用 JSON 数据 + YAML 模板即可写评测，不必写代码。
  background: >-
    本机长跑，不是托管队列。官方文档写明 `oaievalset` 把已完成的评测记在 `/tmp/oaievalset/{model}.{eval_set}.progress.txt`，
    中断或崩溃后重跑可接着来；单个 eval 不能从中间续，只能重头跑。并发靠 `EVALS_THREADS` / `EVALS_THREAD_TIMEOUT`（默认 10 线程、40 秒超时）。
    关机后由谁续跑：官方未说明。
  tools: >-
    扩展点是 `CompletionFn` 协议、eval 模板与 model-graded YAML，README 称高级场景（提示链、工具调用 agent）走 Completion Function Protocol。
    贡献面有限制：README 写明目前不接受带自定义代码的评测贡献，仍可提交 model-graded YAML。MCP 接入、护栏或拦截机制：官方未说明。
  context: >-
    没有跨会话记忆这一层——一次运行就是一轮，产物是本地 JSONL 日志与结尾报告。
    多轮/长文本类评测走仓库里的 eval 模板（README 的 FAQ 提到模板选择会影响同一段数据的表现）。
    上下文窗口截断规则与样本默认上限：本批次未取到官方正文。
  permissions: >-
    代码 MIT；运行用自己的 API key，README 提供 private evals 路径以在不公开数据的情况下评测。
    贡献条款要读原文：贡献进仓库的评测逻辑与数据按同 MIT 许可，且 "OpenAI reserves the right to use this data in future service improvements"，
    提交还受平台 Usage Policies 约束。数据在 OpenAI 服务端的留存与训练用途：官方未说明。
  fit: >-
    适合：把公开基准与自写 YAML 评测放在本机或 CI 里批量跑、要可读的 registry 与本地 JSONL 日志、愿意实现 CompletionFn 接自有系统。
    不适合：只要托管控制台与托管数据面（该走 Dashboard Evals）、强依赖非 OpenAI 模型且不想写适配层、要沙箱或工具审批这类运行时边界。

pitfalls:
  - 把它当成 Evals 的唯一入口——README 首行已把托管用法指向 OpenAI Dashboard
  - 以为不配 API key 也能跑：默认完成函数走 OpenAI API，成本与限速由官方提示
  - 把自定义代码评测直接提 PR——README 明写目前不接受这类贡献

tags: [开源, MIT, Python, eval, 终端, 多模型]
related: [inspect-ai, ragas, langfuse]

sources:
  - label: openai/evals · 仓库 README（定位、API key、Git-LFS、pip 安装、Dashboard 指引；jsDelivr 镜像直读官方仓库原文，2026-11-06）
    url: https://github.com/openai/evals
    kind: repo
  - label: openai/evals · docs/run-evals.md（oaieval / oaievalset、并发、日志与续跑；jsDelivr 镜像直读，2026-11-06）
    url: https://github.com/openai/evals/blob/main/docs/run-evals.md
    kind: docs
  - label: openai/evals · LICENSE.md（MIT 原文与版权行，jsDelivr 镜像直读，2026-11-06）
    url: https://github.com/openai/evals/blob/main/LICENSE.md
    kind: docs
  - label: openai/evals · 提交历史（本对象无独立 changelog 页，变更以 commits 为准；本批次未逐条验读）
    url: https://github.com/openai/evals/commits/main
    kind: changelog

link:
  url: https://github.com/openai/evals
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: OpenAI 维护的开源仓库；本批次未取到面向中国大陆的服务条款页。
  origin_note_en: An open-source repository maintained by OpenAI; no mainland-facing terms page was captured in this pass.
  direct: unknown
  direct_note: 本批次未做 github.com / raw 域名的直连可用实测（正文经镜像 CDN 取到），故可用性记为未知。
  direct_note_en: No direct-connection measurement of github.com / raw hosts was made in this pass (the text came through a mirror CDN), so availability is recorded as unknown.
  filing: unknown
  filing_note: 无官方依据，本批次未检索公示，不下「未备案」结论。
  filing_note_en: No official basis; the public registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**OpenAI Evals 是"你自己机器上跑的评测框架 + 公开评测登记册"**：评测用 YAML 描述、用 `oaieval` / `oaievalset` 在终端批量执行，结果落成可自查的本地 JSONL 日志；它同时是 README 首行让位给托管 Dashboard Evals 的那一份开源代码——两条线本站分开看，本档案只覆盖开源框架本体。

## 适合与不适合

适合：要把公开基准和自写 YAML 评测塞进本机脚本或 CI、想读日志文件而不是打开一个控制台、愿意为自有系统实现 CompletionFn。
不适合：只想要托管界面与托管数据面（那是 Dashboard 那条线）、强依赖非 OpenAI 模型却不想写适配层、需要沙箱与工具审批这类运行时边界。

## 实测记录

**本站未做端到端实测**：本档案没有运行过 `oaieval` / `oaievalset`，不产出任何分数、准确率或排名，也不核对登记册里各评测的结论。
本节只组织官方 README 与 docs/run-evals.md 里出现过的说法（安装方式、CLI、日志路径、并发与续跑、贡献限制），逐条见 sources 与核验日。
本站的评测类实测协议尚未覆盖"跑开源 registry 基准"这一用法，如需实测要先立协议。

## 变更记录说明

上游仓库未被 GitHub 标记为 archived，但仓库元数据显示最近推送 2026-04-14（GitHub API 核验 2026-11-06），距核验日已超 90 天，故 `lifecycle` 记 maintenance、节奏放缓在此显式提示。
本对象无独立 changelog 页，变更记录以提交历史为准；本批次未逐条清点提交内容，也未读 Dashboard 那条云线的更新页——当日未取到官方正文。

## 未知项清单

- OpenAI 之外的托管模型服务是否有一等支持（官方只写 OpenAI API 与自定义 CompletionFn）
- Dashboard 上托管 Evals 的功能面与数据条款：当日未取到官方正文
- 上下文窗口截断规则、单个评测的样本默认上限
- 关机或断网后任务的续跑边界（官方只写 `oaievalset` 的 progress 文件续跑）
- MCP 接入、护栏/拦截类扩展机制
- 运行数据在 OpenAI 服务端的留存与训练用途
- 提交历史逐条清点（本批次未验读）

## 相关条目

- [Inspect](./inspect-ai.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。
- [Ragas](./ragas.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。
- [Langfuse](./langfuse.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。

## 第一次怎么用

1. 先决定是走开源框架还是走 Dashboard 的托管 Evals——README 首行指的是后者，本档案讲的是前者。
2. 设置 `OPENAI_API_KEY`（README：运行评测必需），并知道官方提醒这会按 API 计费。
3. 只想跑现成评测：`pip install evals`；评测数据在 Git-LFS 里，按 README 的 `git lfs fetch` / `git lfs pull` 取。
4. 终端跑 `oaieval <模型或完成函数> <eval 名>`；评测名取自 `evals/registry/evals` 下的 YAML，批量用 `oaievalset`。
5. 结果先在 `tmp/evallogs` 的 JSONL 里自查，再考虑是否配 Snowflake 日志。
6. 想接自己的系统就实现 CompletionFn，但别把自定义代码直接提进 registry——README 目前不收。
