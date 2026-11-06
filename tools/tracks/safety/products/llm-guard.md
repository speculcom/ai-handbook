---
id: llm-guard
form: local-app
name: LLM Guard
nameEn: LLM Guard
vendor: Protect AI
homepage: https://github.com/protectai/llm-guard
mark: LG
accent: "#D96C4F"
license: MIT（官方 LICENSE 原文首行「The MIT License (MIT)」，版权行「Copyright (c) Protect AI. All rights reserved.」）。开源；`pip install llm-guard` 即可使用库，官方 README 未要求厂商 API 密钥作为运行前提，高级扫描器所需依赖按需安装。
licenseEn: MIT (official LICENSE opens with "The MIT License (MIT)"; copyright line "Copyright (c) Protect AI. All rights reserved."). Open source; usable after `pip install llm-guard`, with no vendor API key stated as a runtime prerequisite; advanced scanners install dependencies on demand.

axes:
  model_access: >-
    它守的是「进模型前」与「模型回来后」的文本，不是某个厂商的模型本体。官方 README 的入门示例走
    ChatGPT / OpenAI API 路线（examples/openai_api.py），文档当日列出的交付形态是 Python 库与 API server。
    哪些扫描器需要下载本地权重、哪些需要外部推理服务，本次只抓到文档索引级口径，未逐条核验，记为未知。
  runtime: >-
    自托管：`pip install llm-guard` 在你自己的环境里跑，README 要求 Python 3.9 及以上（PyPI 包元数据当日给的约束是
    >=3.10 且 <3.13，两处口径不一致，已记入未知项）。文档当日另给 API server 部署路径，即把扫描器架在你侧服务里
    做前后置检查。不存在需要交给厂商的计算面——官方正文未描述云端代跑。
  local_files: >-
    官方 README 与文档索引当日都把处理对象描述为 prompt / completion 文本，未声明读取工作区文件或遍历目录的能力。
    扫描器对文件型输入（附件、目录）的支持范围与临时文件落盘行为，官方未说明。
  background: >-
    作为库时随你的进程生死；作为 API server 时是你自己常驻的服务，启停与扩缩由部署方掌握。
    官方未说明托管队列、关机续跑或异步任务能力。
  tools: >-
    官方 README 列出 15 个 Prompt scanners 与 21 个 Output scanners，覆盖 PromptInjection、InvisibleText、
    Secrets、Anonymize、Toxicity、BanTopics、Regex、TokenLimit 等输入通道，以及 Bias、MaliciousURLs、
    Sensitive、FactualConsistency、Relevance、JSON、LanguageSame 等输出通道。文档当日口径是可按阈值与
    mask / block / answer 类处置动作配置。MCP 接入方式官方未说明。
  context: >-
    检测以单次送入的文本为单位，官方未说明会话级记忆、跨轮上下文或历史攻击库机制。
    上下文长度上限由 TokenLimit 这类扫描器自行设定，具体默认值本次未核验，记为未知。
  permissions: >-
    许可为 MIT（见 license 字段，逐条以官方 LICENSE 原文为准），可商用与再分发，需保留版权声明。
    数据流向是本项目最需要留空的一维：官方 README 与当日抓到的文档索引未声明遥测、日志留存或把文本发给第三方的范围，
    记为未知。合规认证（SOC 2 类）在当日抓到的页面中未见陈述。仓库已归档，官方明示不再活跃维护。
  fit: >-
    适合：要把输入/输出检查写进自己链路、能自己接管依赖与模型下载、并接受「规则不再更新」这一事实的工程团队。
    不适合：指望持续的安全规则维护、指望托管 SLA，或需要以检测率/绕过率作为选型依据的场景（本站不跑实测，也不引官方数字）。

pitfalls:
  - 把 README 的扫描器清单当成检测能力承诺——官方只列通道，不列命中率
  - 以为上游仍在维护：仓库与关联 Hugging Face 模型均已宣布归档
  - Python 版本要求 README 与 PyPI 元数据不一致，装不上先看包元数据

tags: [开源, 本地, 混合]
related: [rebuff, canary-scan, nemo-guardrails]

sources:
  - label: LLM Guard · 文档站更新日志（2026-11-06 确认可达）
    url: https://protectai.github.io/llm-guard/changelog/
    kind: changelog

  - label: LLM Guard · 仓库提交历史（main 分支，最后推送 2026-07-08）
    url: https://github.com/protectai/llm-guard/commits/main
    kind: changelog

  - label: LLM Guard · 官方文档（部署形态与扫描器配置口径）
    url: https://protectai.github.io/llm-guard/
    kind: docs

  - label: LLM Guard · 仓库 README（含归档警告与扫描器清单）
    url: https://github.com/protectai/llm-guard
    kind: repo

  - label: LLM Guard · 官方 LICENSE（MIT 原文）
    url: https://github.com/protectai/llm-guard/blob/main/LICENSE
    kind: docs

  - label: PyPI · llm-guard（0.3.16，2025-05-19 发布；requires_python 约束）
    url: https://pypi.org/project/llm-guard/
    kind: docs

link:
  url: https://protectai.github.io/llm-guard/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: archived
confidence: partial

cn:
  origin: foreign
  origin_note: Protect AI（GitHub 组织 Protect AI，主体为美国公司），非国产产品。
  origin_note_en: Protect AI (GitHub organisation "Protect AI", a US-based company); not a domestic product.
  direct: unknown
  direct_note: 当日只核验了通用网络下的 GitHub / 文档站 / PyPI 可达性，未做大陆直连实测，故直连结论留空。
  direct_note_en: Only general-network reachability of GitHub / docs site / PyPI was checked today; no mainland direct-access test was run, so this stays unknown.
  filing: unknown
  filing_note: 当日未检索网信办公示名单，无官方依据判定备案状态；该产品本身不面向大陆公众提供服务。
  filing_note_en: The CAC public registry was not searched on the verification day, so filing status has no official basis; the product does not serve the mainland public.
  verified: 2026-11-06
---

## 一句话定位

Protect AI 开源的 LLM 输入/输出扫描工具箱：一侧拦 prompt（注入、隐形文本、密钥、毒性、话题禁用），
一侧拦 completion（偏见、恶意链接、敏感信息、事实一致性）。它是「你自己部署的扫描器集合」，不是托管护栏服务。

## 适合与不适合

适合把前后置检查嵌进自有链路、并且愿意自己承担依赖与模型下载的团队；文档当日给的两种用法是 Python 库与 API server。
不适合需要「上游持续更新」的场景——README 顶部警告块已宣布项目归档，关联 Hugging Face 模型同样不再维护。
也不适合想找检测率数字的读者：官方只声明支持哪些通道，本站不做端到端实测。

## 实测记录

本站未做端到端实测：没有跑过任何扫描器的检测样例，也没有测过阈值与处置动作的实际行为。
本页全部结论只组织自官方 README、官方文档索引与 LICENSE / PyPI 元数据（2026-11-06 抓取），
「检测通道清单」一节即 README 列表的照录，不代表任何命中或拦截表现。

## 未知项清单

- 各扫描器所需的具体模型权重与外部推理服务（当日只到文档索引级口径）
- 遥测、日志留存、文本外发范围等隐私条款
- 文件型输入（附件、目录）支持与临时文件落盘行为
- 阈值与各 on-fail 动作的默认值
- 是否存在托管服务档位（README 只留了 Production Support 联系方式）
- Python 版本口径冲突：README 说 3.9+，PyPI 元数据说 >=3.10 且 <3.13
- MCP 或其他扩展接入方式
- 大陆直连与备案状态（cn 块记为 unknown）

## 相关条目

- [Rebuff](./rebuff.md) — 同属「护栏与内容过滤」线：本档案只写自己在册的官方口径，对照请看那份。
- [CanaryScan](./canary-scan.md) — 同属「护栏与内容过滤」线：本档案只写自己在册的官方口径，对照请看那份。
- [NeMo Guardrails](./nemo-guardrails.md) — 同属「护栏与内容过滤」线：本档案只写自己在册的官方口径，对照请看那份。

## 检测通道清单（官方 README 照录）

Prompt scanners（15 项）：Anonymize、BanCode、BanCompetitors、BanSubstrings、BanTopics、Code、Gibberish、
InvisibleText、Language、PromptInjection、Regex、Secrets、Sentiment、TokenLimit、Toxicity。

Output scanners（21 项）：BanCode、BanCompetitors、BanSubstrings、BanTopics、Bias、Code、Deanonymize、JSON、
Language、LanguageSame、MaliciousURLs、NoRefusal、ReadingTime、FactualConsistency、Gibberish、Regex、Relevance、
Sensitive、Sentiment、Toxicity、URLReachability。

> 这张表只是官方声明的**能力面清单**。本站没有跑过其中任何一项，也不引官方或第三方的命中率数字。

## 归档状态与选型影响

README 顶部警告块原文（2026-11-06 抓取）：

> THIS PROJECT HAS BEEN ARCHIVED. This project and its associated models on Hugging Face are no longer under active development or maintained.

配套可核验事实：仓库 `archived` 标志为真、最后推送 2026-07-08、PyPI 最新版本 0.3.16 发布于 2025-05-19。
因此本条目 lifecycle 记 `archived`，confidence 上限为 `partial`。
选型含义是**维护责任转移**：规则集、依赖与安全修复都要自己接手。
