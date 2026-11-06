---
id: garak
form: cli
name: garak
vendor: NVIDIA · Leon Derczynski
homepage: https://garak.ai/
mark: G
accent: "#76B900"
license: >-
  Apache-2.0（仓库 LICENSE 正文直读，2026-11-06：「License-Apache_2.0」，版权行署名
  Leon Derczynski 与 NVIDIA CORPORATION & AFFILIATES（2023））。PyPI 项目页的许可字段同为 Apache-2.0，两处一致。
licenseEn: >-
  Apache-2.0 (repository LICENSE read directly on 2026-11-06: "License-Apache_2.0", copyright lines naming
  Leon Derczynski and NVIDIA CORPORATION & AFFILIATES (2023)). The PyPI project page carries the same Apache-2.0
  license field, so the two agree.

axes:
  model_access: >-
    它自己不带模型，被测面是别人的模型或应用：仓库首页把 generators 定义成「plugins for LLMs to be probed」，
    点名的接入有 hugging face hub generative models、replicate text models、openai api chat & continuation models、
    aws bedrock foundation models、litellm，并补一句「pretty much anything accessible via REST」。
    文档首扫示例是 `--model_type huggingface --model_name gpt2`。全部 generator 类型与各家参数差异：未逐条清点。
  runtime: >-
    本机 Python 进程、终端交互：README 的安装命令是 `python -m pip install -U garak`，PyPI 记 `pip install garak`、
    requires-python 为 >=3.11；文档「Setting up」页同样把它描述成命令行工具。扫描请求按你选的 target 发往云端 API
    或本机推理端点。是否存在托管执行面与 Docker 镜像口径：本批次未取到官方正文，记未知。
  local_files: >-
    读的是随包安装的探针数据集与本机配置，写的是本地结果文件：README 记结果落 JSONL、garak.log 与 hit log；
    文档「Our Features」列四类输出 Screen output、Report log、Hit log、Debug log。默认目录名、文件保留与清理规则：
    本批次未逐字核验。
  background: >-
    没有「关机后续跑」的托管任务：一次扫描是一个本机进程，跑完写日志。文档目录列出 Setting up、Your first scan、
    Getting help 等条目，未出现断点续跑或队列语义。批量任务的并行与限流方式：本批次未取到官方正文。
  tools: >-
    四类插件面（README 原文短语）：probes「classes for generating interactions with LLMs」、
    detectors「classes for detecting an LLM is exhibiting a given failure mode」、harnesses「classes for structuring testing」、
    generators 负责接模型。点选形式见文档示例 `--probes lmrc.Profanity`，`--list_probes` 可列探针。
    MCP 接入方式：官方文档未说明，记未知。
  context: >-
    这里的「上下文」是 harness 如何把多轮交互拼成一次探测，不是跨会话记忆。README 对 harnesses 的表述止于
    「classes for structuring testing」，具体会话构造与长度策略本批次未取到逐条官方正文，记未知。
  permissions: >-
    许可面清楚：Apache-2.0（LICENSE 正文直读，见 license 字段）。数据流向只有一条官方可读口径——探针 prompt 与响应
    发往你配置的 target 端点，失败样本逐条写进本地日志（README：「If any of the prompt attempts yielded an undesirable
    behavior, the response will be marked as FAIL」）。是否有默认遥测、是否上传探针结果：未取到官方声明，进 unknowns。
    它不阻断线上流量，因此不存在「拦截比例」这类结论；本站也不引用任何成功率或漏检率数字。
  fit: >-
    适合：上线前对自己可控的 endpoint 批量跑一轮探针、要求留下可复核的 prompt/响应证据文件、要在 HuggingFace、
    OpenAI、Bedrock、litellm 等 target 之间复用同一套探针。不适合：当运行时护栏拦用户请求；把「探针全 PASS」读成
    「模型安全」（官方口径只记录失败样本，不出安全证明）；要托管报告平台或合规证书。

pitfalls:
  - 把「支持哪些探针类别」读成「能拦住多少比例」——它只产出失败样本日志，不做阻断
  - 以为 garak 是运行时护栏：它是一次性扫描进程，不在请求链路里
  - 把 `--list_probes` 的数量当成覆盖面结论：探针名与官方合规映射的关系本批次未逐条核验

tags: [开源, Apache-2.0, Python, 终端, CI, eval, 本地, 多模型]
related: [pyrit, promptfoo, ollama]

sources:
  - label: NVIDIA/garak · 仓库首页（定位句、probes/detectors/harnesses/generators 四件套、target 接入清单、安装命令；直读 200，2026-11-06）
    url: https://github.com/NVIDIA/garak
    kind: repo
  - label: garak · LICENSE（Apache-2.0 正文与版权行署名；直读 200，2026-11-06）
    url: https://github.com/NVIDIA/garak/blob/main/LICENSE
    kind: docs
  - label: garak · 官网首页（「LLM vulnerability scanner」与 docs/reference 入口；直读 200，2026-11-06）
    url: https://garak.ai/
    kind: official
  - label: garak · 文档 What is garak?（「finds holes in LLM-based tech」「identifies how your LLM can fail」；直读 200，2026-11-06）
    url: https://docs.garak.ai/garak/overview/what-is-garak/
    kind: docs
  - label: garak · 文档 Our Features（四类输出 Screen/Report/Hit/Debug log；直读 200，2026-11-06）
    url: https://docs.garak.ai/garak/overview/our-features/
    kind: docs
  - label: garak · 文档 Your first scan（`python -m garak --list_probes` 等命令与 PASS/FAIL 输出；直读 200，2026-11-06）
    url: https://docs.garak.ai/garak/llm-scanning-basics/your-first-scan
    kind: docs
  - label: garak · Releases 最新条目（v0.17.1；直读 200，2026-11-06）
    url: https://github.com/NVIDIA/garak/releases/latest
    kind: changelog
  - label: garak · PyPI 项目页（0.17.1、`pip install garak`、requires-python >=3.11、Apache-2.0；直读 200，2026-11-06）
    url: https://pypi.org/project/garak/
    kind: changelog

link:
  url: https://github.com/NVIDIA/garak
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: NVIDIA（美国）与维护者 Leon Derczynski 的开源项目；本批次未取到面向中国大陆的服务条款或中文站点。
  origin_note_en: An open-source project of NVIDIA (US) and maintainer Leon Derczynski; no mainland-facing terms page or Chinese site was captured in this pass.
  direct: unknown
  direct_note: github.com、garak.ai 与 docs.garak.ai 本批次从当前网络取到 200，但未在大陆网络环境做直连实测，故记未知；PyPI 与 GitHub 需自备可达性。
  direct_note_en: github.com, garak.ai and docs.garak.ai returned 200 from the current network in this pass, but no mainland-network direct-connection measurement was made, so it is recorded as unknown; PyPI and GitHub reachability is on you.
  filing: unknown
  filing_note: 无官方依据，本批次未检索生成式 AI 备案公示，不下「未备案」结论。
  filing_note_en: No official basis; the generative-AI filing registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**garak 是跑在自己终端里的 LLM 探针扫描器**（NVIDIA 与维护者 Leon Derczynski，Apache-2.0）：它把「和模型对话」写成
probes，把「什么算失效」写成 detectors，用 harness 组织成一次扫描，然后逐条把失败的 prompt 与响应落成本地日志。
仓库首页的自我表述是 generative AI red-teaming & assessment kit，官网则写作 "LLM vulnerability scanner"——
两句话都是**评测语义**，不是运行时拦截语义。

## 适合与不适合

适合：上线前对着自己可控的 endpoint（HuggingFace、OpenAI、Bedrock、replicate、litellm，或任何 REST 接口）
批量跑一轮探针；需要可复核的证据文件（JSONL、hit log）而不是一个「通过/不通过」的口号；要在多个 target 上复用同一套探针。
不适合：想在请求链路里拦用户输入的（它不阻断）；把「全部探针 PASS」当成模型安全证明；要托管报告平台或合规证书的团队。

## 实测记录

**本站未做端到端实测**：没有运行过 `python -m garak`，没有打开任何 JSONL/hit log，不产出分数、成功率或排名，
也不统计探针总数。本档案只组织官方仓库首页、LICENSE、官网、docs.garak.ai 与 PyPI 上在册的说法，逐条见 sources 与核验日。

**实测建议**（四条，都指向官方可读页没给的东西）：

- **换 target 后的可比性**：同一套 `--probes` 在 HuggingFace 本地端点与 OpenAPI 云端端点上的耗时与失败面差异
- **默认日志目录与保留行为**（官方文档未逐字说明，落盘位置要自己确认）
- **是否有默认遥测**（本批次未取到任何官方声明）
- **Docker / CI 集成里的可复现性**（官方文档未在本批次取到镜像口径）

## 变更记录说明

本对象有独立 releases 页：最新条目 v0.17.1（releases/latest 直读，标题「v0.17.1」，要点含 Python 3.14 支持
与 evaluators 侧新增 hit@k 指标口径）。**本站不引用这类指标的任何数值**，只记录「官方把评测指标写进了更新日志」这一事实。
PyPI 项目页记 0.17.1 的发布时间为 2026-10-16；GitHub releases 页当日抓取文本里的日期标注与 PyPI 不完全一致，
差异原因未核验，进 unknowns。仓库未被标记归档，故 lifecycle 记 active。

## 能力边界

按官方在册口径能确认的边界有三条：

- 它是**评测工具**，交付物是「失败样本 + 日志」，不是拦截动作；README 的判定表述是「the response will be marked as FAIL」。
- 它能接什么模型，等于 generators 插件面覆盖了什么；官方点名的接入见 model_access 维，其余接入方式要查 reference 文档。
- 探针名单（README 出现的 lmrc、promptinject、encoding、snowball、xss、gcg 等）说明的是**测试语义的种类**，
  与「挡住多少攻击比例」没有关系；本站不做这类换算，也不做产品排名。

## 未知项清单

- 全部 generator 类型清单与逐家参数差异（官方只点名数家）
- 默认日志目录名、文件保留与清理规则
- 是否存在默认遥测或结果上报（未取到官方声明）
- Docker 镜像与 CI 集成的官方口径（本批次未取到正文）
- harness 的会话构造与长度策略细节（README 只给一句定义）
- MCP 接入方式（官方文档未说明）
- releases 页与 PyPI 的 v0.17.1 日期标注差异原因
- 大陆网络环境下的直连可用性与备案情况（未实测、未检索）

## 相关条目

- [PyRIT](./pyrit.md) — 同为红队框架：那份的编排与攻击策略由 Python SDK 与 GUI 组织，本档案的默认入口是终端一次性扫描。
- [Promptfoo](./promptfoo.md) — 同是能在 CI 里跑的评测工具：那份主轴是 prompt/agent 的断言与回归，本档案主轴是攻击探针。
- [Ollama](../../runner/products/ollama.md) — 本机推理端点：作为 garak 的一个 target 形态时才与它发生关系。

## 第一次怎么用

1. 先确认被测端点属于哪一类 generator：官方首扫示例是 `--model_type huggingface --model_name gpt2`。
2. `python -m pip install -U garak`，然后用 `python -m garak --list_probes` 看探针名，不要凭印象写 `--probes`。
3. 点选具体探针跑第一次扫描（文档示例形式：`--probes lmrc.Profanity`），把输出文件路径记下来——默认目录未在官方文档逐字说明。
4. 复核只看失败样本与命中日志：这一步是它的价值所在，也是「评测」与「防护」的分界。
5. 要进 CI 就先解决 target 的凭据与限流，这两项官方文档在本批次没有给出可直接引用的口径。
