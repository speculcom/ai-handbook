---
id: inspect-ai
form: cli
name: Inspect
vendor: UK AI Security Institute
homepage: https://inspect.aisi.org.uk/
mark: I
license: MIT（仓库 LICENSE 原文直读，首行 "MIT License"、"Copyright (c) 2024 UK AI Security Institute"，2026-11-06）。框架本身不需订阅，但要自备模型接入（云 API key 或本机推理）。
licenseEn: MIT (repository LICENSE read directly: "MIT License", "Copyright (c) 2024 UK AI Security Institute", 2026-11-06). The framework needs no subscription but requires your own model access (a cloud API key or local inference).

axes:
  model_access: >-
    官方文档首页：「Built-in support for over 20 model providers」，并写明本地推理支持 HuggingFace、vLLM、SGLang。
    快速上手示例逐个给 `pip install openai` + `export OPENAI_API_KEY`、Anthropic、Google、`hf/...` + `HF_TOKEN` 四组，
    再以 `--model openai/...` 一类形式指定。全 provider 清单与逐家能力差异：未逐条清点。
  runtime: >-
    `pip install inspect-ai` 装进自己的 Python 环境，主入口是终端命令 `inspect eval`（文档首页示例 `inspect eval simpleqa.py --model ...`）；
    官方文档首页另列网页版 Inspect View 做监控与可视化、VS Code 扩展辅助编写与调试。
    执行发生在你的机器与你选的沙箱里；官方托管云线：官方未说明。
  local_files: >-
    评测是写进 `.py` 的 Task（Dataset + Solver + Scorer），数据集可直接用 `hf_dataset()` 从 HuggingFace 载入；
    官方文档首页把「over 200 pre-built evaluations ready to run on any model」列为自带内容，文档目录另有 Log Files / Inspect View / Task Views 条目。
    默认日志目录名与文件归置规则本批次未逐字核验。
  background: >-
    本机批量执行：官方文档目录列出 Running Eval Sets、Parallelism、Handling Errors、Setting Limits、Checkpointing 与 Intervention，
    即并行跑评测集、断点与人工介入是文档内的既有概念。关机后任务在别处续跑：官方未说明——它不是托管服务。
  tools: >-
    官方文档首页列内置 bash、python、文本编辑、网页搜索、computer 工具，并写明支持自定义工具与 MCP 工具；
    文档目录另有 Tool Approval、Tool Result Review、Agent Bridge、Extensions 等条目。
    首页还称可运行外部 agent 作为被测对象，举例 Claude Code、Codex CLI、Gemini CLI。
  context: >-
    文档目录列出 Compaction（上下文压缩）、Caching、Fallbacks、Multimodal、Structured Output，
    以及 Multiple Scorers、Scoring Policy、Model Grading 等评分侧概念。跨会话记忆不是它的模型：一次评测一份日志。
    压缩策略与默认阈值：本批次未取到官方正文。
  permissions: >-
    MIT 许可（LICENSE 原文，版权方为 UK AI Security Institute）。运行在你自己的环境，模型调用走你配置的 provider 与 key；
    官方文档首页把沙箱系统说成支持在 Docker、Kubernetes、Modal、Proxmox、Vagrant 等「running untrusted model code」，并有扩展 API；
    文档目录另有 Sandboxing、Approvers、Hooks、Filesystems 条目。遥测与数据上传条款：本批次未取到官方说明。
  fit: >-
    适合：自己写评测与 agent 任务、要把不受信模型代码关进沙箱、要工具审批与本地日志复核、要跨 20 余家 provider 跑同一份任务。
    不适合：只想点托管控制台、只要一个指标库而不想维护 Python 评测、把跑分榜单当交付物。

pitfalls:
  - 把它当云端评测服务——沙箱是你自己提供的 Docker / K8s / Modal 等环境
  - 以为评测靠 YAML 配就行——Inspect 的 Task 是写在 Python 里的
  - 把「200+ 预置评测」当成现成结论——官方口径是可直接运行的实现，结果仍要你自己跑

tags: [开源, MIT, Python, eval, 沙箱, MCP, 多模型, 自托管]
related: [openai-evals, ragas, langfuse]

sources:
  - label: Inspect · 官方文档首页（框架定位、模型 provider、沙箱、工具与 MCP、Inspect View；直读 200，2026-11-06）
    url: https://inspect.aisi.org.uk/
    kind: docs
  - label: Inspect · Changelog（文档首页导航给出的变更记录入口；本批次未逐条验读）
    url: https://inspect.aisi.org.uk/CHANGELOG.html
    kind: changelog
  - label: UKGovernmentBEIS/inspect_ai · 仓库 README（AI Security Institute 出品、200+ 预置评测、uv 开发流程；GitHub API 直读，2026-11-06）
    url: https://github.com/UKGovernmentBEIS/inspect_ai
    kind: repo
  - label: UKGovernmentBEIS/inspect_ai · LICENSE（MIT 原文与版权行，GitHub API 直读，2026-11-06）
    url: https://github.com/UKGovernmentBEIS/inspect_ai/blob/main/LICENSE
    kind: docs

link:
  url: https://inspect.aisi.org.uk/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 英国 AI 安全研究所（AI Security Institute）与 Meridian Labs 的开源项目；本批次未取到面向中国大陆的服务条款页。
  origin_note_en: An open-source project of the UK AI Security Institute and Meridian Labs; no mainland-facing terms page was captured in this pass.
  direct: unknown
  direct_note: 官方文档站本批次经 HTTP 200 取到正文，但未做大陆网络环境下的直连可用实测，故记未知。
  direct_note_en: The official docs returned HTTP 200 in this pass, but no mainland direct-connection availability measurement was made, so it is recorded as unknown.
  filing: unknown
  filing_note: 无官方依据，本批次未检索公示，不下「未备案」结论。
  filing_note_en: No official basis; the public registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**Inspect 是英国 AI 安全研究所（与 Meridian Labs）做的开源评测框架**：用 Python 把 Dataset、Solver、Scorer 拼成一个 Task，用 `inspect eval` 在你自己的环境里跑，靠沙箱、工具审批与本地日志把「不受信的模型代码」这件事管起来——官方文档首页同时把它定位成 frontier AI evaluations 的写作与复用工件，而不是托管打分服务。

## 适合与不适合

适合：要自己写评测与 agent 任务（含多 agent 与外部 agent）、要把模型生成的不受信代码放进 Docker / Kubernetes 一类沙箱、要在终端批量跑评测集并在本地日志里逐样本复核、要在多家 provider 之间复用同一份任务定义。
不适合：只想在网页控制台点几下就拿到结论、只需要几个打分指标不想维护 Python 工程、把别人跑出的分数当交付物（本站也不这样用）。

## 实测记录

**本站未做端到端实测**：本档案没有运行 `inspect eval`，没有打开 Inspect View 复核日志，不产出分数、准确率或任何排名，也没有清点官方文档列出的预置评测清单。
本节只组织官方文档首页与仓库 README 里出现过的说法（安装方式、模型 provider 与本地推理、沙箱后端、工具与 MCP、工具审批、日志与查看器、外部 agent 运行），逐条见 sources 与核验日。
官方文档首页另有 Tutorial 与 Options 页，本批次未取到其正文。

## 变更记录说明

本对象无独立读取的 changelog 正文：文档首页导航给出 CHANGELOG 入口（见 sources），本批次未逐条验读。
维护节奏按上游仓库元数据判断：最近推送 2026-11-06（GitHub API 核验当日），仓库未被标记为 archived，故 `lifecycle` 记 active；但版本内具体变更内容未清点，属未核项。

## 未知项清单

- 全模型 provider 清单与逐家能力差异（官方称 20 余家，未逐条清点）
- 默认日志目录名、日志文件保留与清理规则
- 遥测与数据上传条款（含是否有默认上报）：当日未取到官方正文
- 关机或断网后任务的续跑语义；是否存在托管执行面
- Compaction 的默认策略与阈值、Caching 的命中范围
- 工具审批（Approvers）的默认严格度与可配置档位
- CHANGELOG 与 releases 的逐条内容（本批次未验读）
- VS Code 扩展与 Inspect View 的能力边界（官方文档导航有 Log Viewer 页，本批次未取正文）

## 相关条目

- [OpenAI Evals](./openai-evals.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。
- [Ragas](./ragas.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。
- [Langfuse](./langfuse.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。

## 第一次怎么用

1. 先确定模型接入：官方快速上手示例是「装对应 SDK + 导出 API key」，本地推理走 HuggingFace / vLLM / SGLang。
2. `pip install inspect-ai`，用 `inspect eval <task.py> --model <provider/model>` 跑第一个任务。
3. 需要模型执行代码或操作文件时，先读官方 Sandboxing 口径，把任务放进 Docker 等沙箱后端，再考虑工具审批。
4. 想看逐样本结果，用官方列出的 Inspect View；要边写边调，官方推荐（但非必需）VS Code 扩展。
5. 批量跑多任务时查官方文档的 Eval Sets 与 Parallelism 条目，而不是自己写循环。
