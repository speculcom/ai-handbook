---
id: pyrit
form: local-app
name: PyRIT
vendor: Microsoft
homepage: https://microsoft.github.io/PyRIT/
mark: P
accent: "#5B5BD6"
license: >-
  MIT（仓库 LICENSE 正文直读，2026-11-06：「MIT License」、版权行「Copyright (c) Microsoft Corporation.」）。
  PyPI 项目页许可字段同为 MIT，两处一致；原 Azure/PyRIT 仓库页显示的许可亦为 MIT。
licenseEn: >-
  MIT (repository LICENSE read directly on 2026-11-06: "MIT License", copyright line "Copyright (c) Microsoft Corporation.").
  The PyPI project page carries the same MIT field; the original Azure/PyRIT repository page also showed MIT.

axes:
  model_access: >-
    有两面都要模型：被红队的 target，和驱动攻击的那一面。仓库首页点名 target 覆盖「OpenAI, Anthropic, Azure OpenAI,
    Microsoft Foundry, Azure Machine Learning, Google Gemini, Google Vertex AI, AWS Bedrock, Hugging Face, Ollama,
    Groq, OpenRouter, Cohere, and GitHub Copilot」，接入协议写「HTTP, WebSockets, browser automation with Playwright,
    or custom targets」；文档 latest 把这一点概括为 Any Target。凭据侧官方原文：「PyRIT loads API credentials from
    environment variables or `.env` files」，示例变量是 OPENAI_CHAT_ENDPOINT / OPENAI_CHAT_KEY / OPENAI_CHAT_MODEL。
  runtime: >-
    装在自己的 Python 环境里跑：`pip install pyrit`（PyPI 记 requires-python >=3.10,<3.15，当日版本 1.1.0）。
    仓库首页给三种入口——「command-line scanner」、「graphical interface」（CoPyRIT）、以及「extensible Python framework」；
    文档 latest 把命令行写作 `pyrit_scan` 与 `pyrit_shell`，GUI 写作在浏览器里交互并复核结果。执行发生在你自己的机器；
    是否存在官方托管执行面：未取到官方声明。
  local_files: >-
    读本机配置与 `.env` 凭据，写的是扫描产物与状态。文档 latest 明确「Built-in Memory」有两个后端：SQLite 与 Azure SQL——
    前者落在你机器上的库文件，后者落在你自己的数据库。默认 SQLite 文件名与路径、清理与导出方式：本批次未逐字核验。
  background: >-
    长任务的本机语义齐全：自适应多轮攻击与 scenario 都在本地进程里推进，结果可在 CoPyRIT 界面复核（仓库首页
    「Explore AI systems interactively and review results in your browser」）。「关机后在别处续跑」这类托管队列语义：
    官方未说明——它不是托管服务。
  tools: >-
    组件面按文档 latest 在册的有：Automated Red Teaming（点名的策略含 Crescendo、TAP）、Scenario Framework、
    Any Target、Built-in Memory、Flexible Scoring，另有 targets/converters/scorers/memory/orchestrators 这一层模块划分。
    与同大类另一份档案的直接接口：文档专页写明 Garak scenario family「implements probes inspired by the Garak framework」，
    运行形式是 `pyrit_scan run garak.prompt_inject --target openai_chat`。MCP 接入：官方文档未说明，记未知。
  context: >-
    自适应多轮攻击靠的就是可回溯的会话状态，状态存在上述 memory 后端里；文档 latest 把「adaptive multi-turn attacks」
    与 scenario 目录并列在册。跨会话记忆的边界、上下文压缩或截断策略：本批次未取到逐条官方正文，记未知。
  permissions: >-
    许可面：MIT，版权方 Microsoft（LICENSE 正文直读）。归属面要记一条事实：原 Azure/PyRIT 仓库页写着
    「PyRIT has moved! Please see https://github.com/microsoft/PyRIT!」，本档案按迁移后仓库建档。
    数据流向：探针与攻击 prompt 发往你配置的 target 端点与攻击模型端点，凭据从环境变量或 `.env` 载入（官方原文见
    model_access 维），扫描记录落在你自己的 SQLite/Azure SQL。是否有默认遥测、留存期条款：未取到官方声明，进 unknowns。
    它是评测与取证工具，不做阻断，因此本站不写任何「拦下多少」的比例，也不引用 scenario 报告的数值。
  fit: >-
    适合：要把多轮自适应攻击编排成可重复的 assessment、需要 Python 侧自己组合 targets/converters/scorers、
    要让非工程同学也在本地 GUI 里复核结果、团队已经把 garak 风格探针纳入同一套扫描流程。不适合：只想一条命令扫一个
    端点就走（那是 garak 的默认形态）、要托管报告与合规交付物、指望它替人做红队判断。

pitfalls:
  - 以为跑 Garak scenario 要先装 garak——官方口径是把探针实现搬进 `pyrit_scan`
  - 只配被测端点的 key：驱动攻击的模型端点与凭据同样要配（env/`.env` 口径在册）
  - 把 scenario 报告当成防护结论：它不做阻断，本站也不把它的数值当拦截率

tags: [开源, MIT, Python, 本地, 终端, WebUI, eval, 自托管]
related: [garak, lakera-ai, ollama]

sources:
  - label: Azure/PyRIT · 原仓库页（迁移公告「PyRIT has moved!」与 MIT 标注；直读 200，2026-11-06）
    url: https://github.com/Azure/PyRIT
    kind: migration
  - label: microsoft/PyRIT · 仓库首页（自我定位句、三种入口、target 与协议清单、24 个 releases；直读 200，2026-11-06）
    url: https://github.com/microsoft/PyRIT
    kind: repo
  - label: microsoft/PyRIT · LICENSE（MIT 正文与 Microsoft 版权行；直读 200，2026-11-06）
    url: https://github.com/microsoft/PyRIT/blob/main/LICENSE
    kind: docs
  - label: PyRIT · 官方文档 latest（定义句、`pip install pyrit`、Automated Red Teaming/Scenario Framework/Any Target/Built-in Memory/Flexible Scoring、`pyrit_scan`/`pyrit_shell`/CoPyRIT；直读 200，2026-11-06）
    url: https://microsoft.github.io/PyRIT/latest/
    kind: docs
  - label: PyRIT · 文档 Garak scenarios（probes inspired by Garak、`pyrit_scan run garak.prompt_inject --target openai_chat`；直读 200，2026-11-06）
    url: https://microsoft.github.io/PyRIT/latest/scanner/garak
    kind: docs
  - label: PyRIT · 文档 Populating secrets（OPENAI_CHAT_ENDPOINT/KEY/MODEL 与「loads API credentials from environment variables or `.env` files」；直读 200，2026-11-06）
    url: https://microsoft.github.io/PyRIT/latest/getting-started/populating-secrets
    kind: docs
  - label: microsoft/PyRIT · Releases（v1.1.0 / v1.0.1 / v1.0.0 / v0.14.0 / v0.13.0 序列；直读 200，2026-11-06）
    url: https://github.com/microsoft/PyRIT/releases
    kind: changelog
  - label: PyRIT · PyPI 项目页（1.1.0、`pip install pyrit`、requires-python >=3.10,<3.15、MIT；直读 200，2026-11-06）
    url: https://pypi.org/project/pyrit/
    kind: changelog

link:
  url: https://github.com/microsoft/PyRIT
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Microsoft 的开源项目（仓库与 PyPI 均署名 Microsoft）；本批次未取到面向中国大陆的服务条款或中文文档。
  origin_note_en: An open-source project of Microsoft (the repository and PyPI both credit Microsoft); no mainland-facing terms page or Chinese docs were captured in this pass.
  direct: unknown
  direct_note: github.com、microsoft.github.io 与 PyPI 在当日从当前网络取到 200，但未在大陆网络环境做直连实测，故记未知。
  direct_note_en: github.com, microsoft.github.io and PyPI returned 200 from the current network on the verification date, but no mainland-network direct-connection measurement was made, so it is recorded as unknown.
  filing: unknown
  filing_note: 无官方依据，本批次未检索生成式 AI 备案公示，不下「未备案」结论。
  filing_note_en: No official basis; the generative-AI filing registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**PyRIT 是微软那份「自己搭红队流程」的本机工具箱**（MIT，已从 Azure/PyRIT 迁到 microsoft/PyRIT）：
仓库首页把它写成 automated scans + adaptive multi-turn attacks + a web UI，官方文档 latest 的定义句落在
「assessing the security and safety of generative AI systems at scale」。和同大类另一份 garak 档案的分野很干脆——
**garak 的默认形态是一条命令扫一个端点，PyRIT 的默认形态是你用 Python 把 targets、converters、scorers、
memory 与 attack 策略编排成一份可复跑的 assessment**。

## 适合与不适合

适合：要把多轮自适应攻击（文档点名的 Crescendo、TAP）编排成可重复 assessment；需要本地 memory 后端把过程落进
你自己的 SQLite 或 Azure SQL；团队想让复核人员在 CoPyRIT 界面里逐条看结果；已经把 garak 风格探针纳入同一套扫描流程
（官方 scenario 页直接给 `pyrit_scan run garak.prompt_inject` 这种形式）。不适合：只想一条命令扫完就走；
要托管报告平台或合规交付物；指望工具替代红队人员的判断。

## 实测记录

**本站未做端到端实测**：没有执行过 `pyrit_scan` 或 CoPyRIT 会话，不产出攻击成功率、通过率或任何排名，
也不清点 scenario 总数。本档案只组织仓库首页、LICENSE、官方文档 latest、两个文档专页、releases 与 PyPI 在册的说法。

**实测建议**（四条）：

- **只配 target 不配攻击模型时会发生什么**（凭据口径在册，缺省行为未在册）
- **SQLite 与 Azure SQL 两个 memory 后端的可复核差异**（默认文件位置与清理方式未逐字核验）
- **Garak scenario 家族与原生 garak 探针输出的可比性**（官方说明是移植实现，不是调用 garak）
- **CoPyRIT 界面与 `pyrit_scan` 的能力差集**（GUI scenario catalog 在 v1.1.0 更新日志在册，覆盖面未清点）

## 变更记录说明

本对象有独立 releases 页：当日在册序列为 v1.1.0（CoPyRIT 功能、Best-of-N scanners、GUI scenario catalog）、
v1.0.1、v1.0.0（新 registry 与组件构造、identity models）、v0.14.0（迁移到 Pydantic v2、流式支持）、
v0.13.0（TargetConfiguration 重构）。PyPI 记 1.1.0 发布于 2026-09-04，与 releases 页标注同日。
v1.0.0 的大版本改动意味着 0.x 的写法不必然继续可用——迁移面本批次未逐条清点，进 unknowns。
仓库未标记归档，故 lifecycle 记 active。

## 能力边界

- 它是**红队与取证**工具：产出是攻击过程与可复核记录，不做运行时阻断，因此「拦住多少比例」这个问题对它不成立。
- 它需要两类端点（被测 target + 驱动攻击的模型），两类都要你自己给凭据；官方只给配置口径，不给托管端点。
- scenario 与探针家族的名字（含 garak 移植家族）说明的是**测试语义**，不是覆盖面证明，本站不做任何换算或排名。

## 未知项清单

- 是否存在官方托管执行面（与托管报告服务）：未取到官方声明
- 默认 SQLite 库文件名与路径、清理与导出命令
- 跨会话记忆的边界与上下文压缩/截断策略
- MCP 接入方式（官方文档未说明）
- 是否有默认遥测、扫描记录的留存期条款
- 0.x 到 v1.0.0 的逐条迁移面（只读到 release notes 要点）
- CoPyRIT GUI 的 scenario catalog 与 CLI scanner 的能力差集
- 攻击模型（identity/attack model）缺省配置时的具体行为
- 大陆网络直连可用性与备案情况（未实测、未检索）

## 相关条目

- [garak](./garak.md) — 同为红队框架：那份是终端单命令扫描器，本档案是 SDK/GUI/CLI 三入口的编排框架，且官方把 garak 探针移植进了本框架。
- [Lakera](./lakera-ai.md) — 红队的另一面：本档案交付你自己跑的评估流程，那份交付托管的防护 API 与红队服务。
- [Ollama](../../runner/products/ollama.md) — 本机端点：官方 target 清单里出现 Ollama，红队全程可以不出本机网络边界。

## 第一次怎么用

1. `pip install pyrit`（注意 PyPI 的 Python 区间 >=3.10,<3.15）。
2. 按官方 secrets 页把凭据放进环境变量或 `.env`：至少要有能驱动攻击的模型端点三件套，再加被测 target。
3. 选一个 scenario 家族跑第一轮（`pyrit_scan run garak.prompt_inject --target openai_chat` 是官方在册示例形式），
   先确认 memory 后端把过程写到了哪里。
4. 需要人工复核时再起 CoPyRIT；要把流程固化进发布门禁，就把这轮 run 的参数与记录一起版本化。
5. 从 0.x 升上来的项目，先读 v1.0.0 的 release notes 再改代码。
