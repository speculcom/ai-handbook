---
id: canary-scan
form: cli
name: CanaryScan
nameEn: CanaryScan
vendor: PSA Intelligence
homepage: https://github.com/psaintelligence/canary-scan
mark: CS
accent: "#4F8FD9"
license: Apache-2.0（官方 README 的 License 节与 LICENSE 文件；PyPI 分类器同为 Apache Software License）。README 同时声明内置的第三方脚本
  pdfid、pdf-parser、rtfdump 为 BSD 2-Clause，出处记录在 `src/canary_scan/bundled/VERSIONS.txt`。开源且无需任何模型或 API 密钥。
licenseEn: Apache-2.0 (per the README License section, the LICENSE file and the PyPI classifier). The README also states the bundled
  third-party scripts pdfid, pdf-parser and rtfdump are BSD 2-Clause, with provenance recorded in `src/canary_scan/bundled/VERSIONS.txt`.
  Open source, with no model or API key required.

axes:
  model_access: >-
    当日抓到的 README 与文档索引都没有把「调用谁的模型」作为配置项：检测被描述为对文件原始结构、元数据、
    嵌入对象与近似重复指纹的静态解析。文档索引当日口径为离线运行、不涉及 LLM 与 API 密钥。
    是否在某个阶段引入过模型判定，官方正文未说明。
  runtime: >-
    本机命令行工具，两种官方装法：`pipx install canary-scan`（README 要求自备 exiftool、qpdf、poppler-utils、
    mupdf-tools、ripgrep、unzip、p7zip 等系统依赖）与容器 `ghcr.io/psaintelligence/canary-scan:latest`
    （官方推荐，理由是镜像已打齐系统工具）。PyPI 元数据当日要求 Python 3.10 及以上。
  local_files: >-
    核心动作就是读你提供的文件集：官方 Docker 示例把数据源目录以只读方式挂载（`-v /mnt/datasource:/data:ro`），
    结果写入独立输出目录。README 明确「不以外来文件的原生查看器打开它」即可完成检测，
    即刻意避免触发文档里可能存在的远程引用。逐阶段产物写在 `.canary-scan/`。
  background: >-
    按次运行的批处理命令，不是常驻服务。官方未说明守护进程、任务队列或增量监控模式；
    要做周期性复检只能自己排班。
  tools: >-
    官方文档索引当日列出的命令面是 `scan`、`stage`、`report`、`deps`，另有 `--guide` 输出速查表；
    报告为 JSON（示例用 jq 过滤 `severity=="critical"`），可直接进脚本与流水线。
    七阶段管道为 inventory、metadata、remote-refs、embedded、stego、uniqueness、report，每阶段落一份 JSONL。
    MCP 与其他扩展接入方式官方未说明。
  context: >-
    单次扫描自成一体，不存在会话记忆。跨文件的关联靠 uniqueness 阶段的近似重复指纹与阶段产物文件，
    官方未说明历史基线、跨次运行的比对库或结果留存策略。
  permissions: >-
    许可 Apache-2.0，内置脚本另有 BSD 2-Clause（见 license 字段）。数据流向：当日抓到的 README 与文档索引
    未声明任何遥测、上报或外部服务调用，「离线」是文档索引给出的口径；网络隔离级别的正式条款官方未逐条说明。
    供应链侧官方口径是用 `uv` 的 `exclude-newer` 把第三方依赖钉到不超过 14 天的版本，
    内置脚本在构建期以 `make vendor` 固定并记录出处。
  fit: >-
    适合在接触外部交付的文档集（泄露件、法律披露、调查材料）之前先做一轮静态体检，看有没有能反向暴露「你在读它」的
    追踪像素、远程模板、信标、按收件人区分的指纹。不适合需要判定自然语言指令是否被篡改、
    或需要在运行时拦住模型输入输出的场景——官方正文把它定位为交付前的文档侧检测，不是模型 I/O 护栏。

pitfalls:
  - 把它当提示注入文本分类器：官方正文列的是 canary、追踪器、信标与指纹四类静态信号
  - 以为 pipx 装完就能跑：解析依赖 apt 层的 exiftool、qpdf、poppler 等系统工具
  - 以为扫描会打开文件确认效果：官方设计恰恰是不用原生查看器打开，以免触发远程引用

tags: [开源, 本地]
related: [llm-guard, rebuff, garak]

sources:
  - label: CanaryScan · Releases（v0.2.0，2026-07-20；v0.1.1 至 v0.1.4 均在 2026-06-26）
    url: https://github.com/psaintelligence/canary-scan/releases
    kind: changelog

  - label: CanaryScan · 官方文档站（命令面与七阶段管道）
    url: https://psaintelligence.github.io/canary-scan/
    kind: docs

  - label: CanaryScan · 仓库 README（Docker / pipx 用法与供应链口径）
    url: https://github.com/psaintelligence/canary-scan
    kind: repo

  - label: CanaryScan · 官方 LICENSE（Apache-2.0，内置脚本另有 BSD 2-Clause）
    url: https://github.com/psaintelligence/canary-scan/blob/main/LICENSE
    kind: docs

  - label: PyPI · canary-scan（0.2.0；requires_python 3.10 及以上）
    url: https://pypi.org/project/canary-scan/
    kind: docs

link:
  url: https://pypi.org/project/canary-scan/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: PSA Intelligence（GitHub 组织资料标注所在地为新加坡），非国产产品。
  origin_note_en: PSA Intelligence (the GitHub organisation profile lists Singapore as location); not a domestic product.
  direct: unknown
  direct_note: 当日只核验 GitHub / 文档站 / PyPI 在通用网络下的可达性，未做大陆直连实测。
  direct_note_en: Only general-network reachability of GitHub / docs site / PyPI was checked today; no mainland direct-access test was run.
  filing: unknown
  filing_note: 当日未检索网信办公示名单，无官方依据判定备案状态；该产品不面向大陆公众提供服务。
  filing_note_en: The CAC public registry was not searched on the verification day, so filing status has no official basis; the product does not serve the mainland public.
  verified: 2026-11-06
---

## 一句话定位

PSA Intelligence 的开源命令行体检器：在你（或你的 agent）真正打开外部交付的文档集之前，
先用静态解析把里面的 canary、追踪器、远程信标和按收件人区分的指纹找出来。
它不是模型 I/O 护栏，也不是提示注入分类器，而是「接触前的反跟踪筛查」。

## 适合与不适合

适合接手泄露件、法律披露、调查材料这类外部文档集时的第一道静态检查，也适合放进流水线做批量复检。
不适合需要理解自然语言指令是否被篡改的场景，也不适合需要实时拦截模型输入输出的链路——
官方正文（2026-11-06 抓取）把它的能力面描述为对文件结构、元数据、嵌入对象与近似重复指纹的分析。

## 实测记录

本站未做端到端实测：没有跑过 scan，没有核验过任何阶段的输出结构，也没有测过系统依赖缺失时的失败表现。
本页只组织官方 README、官方文档站索引与 LICENSE / PyPI 元数据（均于 2026-11-06 抓取）。

## 未知项清单

- 官方正文当日未把「提示注入文本检测」列为检测通道，它与间接注入攻击面的关系只有本站的读法，官方未说明
- 支持的文件格式全集（文档索引只给出「多种格式」级口径，未逐项清点）
- severity 分级（critical 至 info）的具体判据
- 遥测与网络隔离的正式条款（当日只到「离线」这一口径）
- 历史基线 / 跨次运行比对是否存在
- 与 agent 运行时的集成方式（MCP 或其他扩展）
- 大陆直连与备案状态（cn 块记为 unknown）

## 相关条目

- [LLM Guard](./llm-guard.md) — 同属「红队与注入检测」线：本档案只写自己在册的官方口径，对照请看那份。
- [Rebuff](./rebuff.md) — 同属「红队与注入检测」线：本档案只写自己在册的官方口径，对照请看那份。
- [garak](./garak.md) — 同属「红队与注入检测」线：本档案只写自己在册的官方口径，对照请看那份。

## 官方命令面与管道

README 与文档站索引（2026-11-06）给出的用法要点：

- 容器：`docker run --rm -v /mnt/datasource:/data:ro -v $(pwd)/canary-scan-out:/output ghcr.io/psaintelligence/canary-scan:latest scan /data -o /output`
- 本机：`pipx install canary-scan`，再装 `libimage-exiftool-perl qpdf poppler-utils mupdf-tools ripgrep unzip p7zip-full`，然后 `canary-scan scan /mnt/datasource`
- 子命令：`scan` / `stage` / `report` / `deps`，`--guide` 输出速查表
- 七阶段：inventory → metadata → remote-refs → embedded → stego → uniqueness → report，每阶段写一份 JSONL 到 `.canary-scan/`
- 报告：`canary-scan-out/canary-scan-report.json`，示例用 `jq` 过滤 `severity=="critical"`

**供应链口径**（官方 README 原文要点）：第三方 Python 依赖用 `uv` 的 `exclude-newer` 钉到不超过 14 天的发布；
Didier Stevens 的脚本在构建期用 `make vendor` 固定，commit SHA、版本与日期记在 `src/canary_scan/bundled/VERSIONS.txt`。

## 维护状态

仓库未归档；GitHub 显示最后推送与最新 release（v0.2.0）同为 2026-07-20，距本次核验已逾 90 天，
release 历史集中在 2026-06-26 至 2026-07-20 两周内。据此 lifecycle 记 `maintenance`，
confidence 上限 `partial`：节奏判断只是快照，不代表官方停维护的声明。
