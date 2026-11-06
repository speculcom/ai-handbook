---
id: failure-library
topic: planning
title: 失败库：按症状排查与十类资料误读
titleEn: Troubleshooting and ten evidence misreads
summary: 从鉴权、限流、容量、延迟、工具参数、JSON、检索与文件问题开始排查；另附十类资料误读、证据与记录模板。
summaryEn: Diagnose authentication, rate limits, memory, latency, tool inputs, JSON, retrieval and file issues, with ten evidence misreads and a troubleshooting record.
sources:
  - label: n8n · 官方文档与许可（fair-code / Sustainable Use License；2026-10 快照）
    url: https://docs.n8n.io
    kind: docs
  - label: Microsoft Support · Deep Research in Microsoft Copilot（C 端 2026-08-18 退役）
    url: https://support.microsoft.com/en-us/microsoft-copilot/deep-research-in-microsoft-copilot
    kind: docs
  - label: 本站 · 225 份工具档案的 pitfalls 字段（2026-10-30 至 2026-11-03 核验）
    url: https://tools.specul.com/
    kind: docs
  - label: RFC 9110 · HTTP 状态与请求语义（2026-11-04）
    url: https://www.rfc-editor.org/rfc/rfc9110.html
    kind: docs
  - label: RFC 6585 · 429 与 Retry-After（2026-11-04）
    url: https://www.rfc-editor.org/rfc/rfc6585.html
    kind: docs
  - label: vLLM · Conserving Memory（仅对应运行器与版本；2026-11-04）
    url: https://docs.vllm.ai/en/latest/configuration/conserving_memory/
    kind: docs
  - label: vLLM · Troubleshooting（排查与日志，不代表本站运行结果；2026-11-04）
    url: https://docs.vllm.ai/en/latest/usage/troubleshooting/
    kind: docs
  - label: JSON Schema · object（属性与必填字段；2026-11-04）
    url: https://json-schema.org/understanding-json-schema/reference/object
    kind: docs
  - label: 本站 · RAG 全链路：从文档到答案
    url: https://learn.specul.com/guide/RAG%20全链路：从文档到答案/
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [怎么用这页|How to use]

先按症状选一个分支，记录区分原因的证据，只改变一个条件后复查。技术分支于 2026-11-04 对照所列官方资料编写，未运行具体产品或模型；示例不是事故记录。后半部分十类误读来自既有档案，保留各自快照日期。

## [先按症状定位|Choose a symptom]

| 现象 | 先看哪里 |
|---|---|
| 401 / 403 | [身份与权限](https://tools.specul.com/mcp/guides/failure-library.html#auth) |
| 429 / 请求堆积 | [限流与重试](https://tools.specul.com/mcp/guides/failure-library.html#rate-limit) |
| 模型装不下 / OOM | [容量](https://tools.specul.com/mcp/guides/failure-library.html#memory) |
| 等很久才出字 / 逐字很慢 | [分段看延迟](https://tools.specul.com/mcp/guides/failure-library.html#latency) |
| 工具调用失败 | [工具输入](https://tools.specul.com/mcp/guides/failure-library.html#tool-input) |
| JSON 无法解析或字段不对 | [结构化输出](https://tools.specul.com/mcp/guides/failure-library.html#json) |
| 查不到应有资料 | [检索](https://tools.specul.com/mcp/guides/failure-library.html#retrieval) |
| 有引用却不支持答案 | [引用核对](https://tools.specul.com/mcp/guides/failure-library.html#citations) |
| 文件无法上传或读出空白 | [文件与格式](https://tools.specul.com/mcp/guides/failure-library.html#files) |

## [401/403：身份与权限|401/403: authentication and permissions]

- **区分**：401 通常指缺少有效认证，403 指服务器拒绝执行；具体原因读响应正文。
- **动作**：核对目标端点、账号/项目、密钥加载位置与权限，不能仅反复发送同一个请求。
- **检查**：同一端点的最小请求成功后，再恢复原任务。记录错误码与请求 ID，凭据不放进排查记录。

## [429：限流与重试|429: rate limits and retries]

- **区分**：核对响应中的速率与配额说明，统计并发和实际调用数。
- **动作**：若有 `Retry-After`，按其指示等待；设置重试上限，降低发送速率，不用重试风暴放大问题。
- **检查**：观察等待队列是否回落。发送、扣费或创建类任务先确认已有任务状态与幂等机制，再决定是否重发。

## [OOM：先分清容量消耗|OOM: separate memory consumers]

- **区分**：记录失败发生在加载权重、建立上下文还是并发请求时；文件体积不等于运行总内存。
- **动作**：先减少上下文或并发，检查缓存与运行器开销，再考虑较小模型或其他量化文件。vLLM 文档中的 `max_model_len`、`max_num_seqs` 仅按对应版本使用，不套给其他运行器。
- **检查**：同一输入先单请求，再逐步增加负载；保留配置，不以“能加载”代替任务验收。

## [延迟：区分排队、首字与输出|Latency: queue, first token and output]

- **区分**：分别记录排队、加载、首字等待和持续输出；不要用一个总时长猜原因。
- **动作**：保持模型与输入不变，检查实际执行设备、进程负载与日志；先排除下载/加载卡住，再逐项改变输入长度或并发。调试选项按运行器文档使用。
- **检查**：比较同条件下各阶段的变化，确认没有因截短必要资料而让任务失去意义；这里不提供通用速度阈值。

## [工具失败：先验证输入|Tool failures: validate inputs first]

- **区分**：是参数不符合 schema、对象不存在、权限不足，还是服务端执行失败？把工具原始错误与模型解释分开。
- **动作**：用一个已知对象构造最小参数，核对必填字段、类型、枚举和工具版本；不要把字符串形式的数字默认为已通过校验。
- **检查**：先确认工具自身可用，再恢复模型调用。产生写入时核对已有结果，避免重复创建。

## [JSON：解析成功不等于字段正确|JSON: parsing is not schema validation]

- **区分**：先判断是否为合法 JSON，再核对字段与类型，最后核对内容是否有依据。
- **动作**：明确必填字段、可空值与是否允许额外属性。`properties` 不会自动让字段必填，`required` 也不保证值为所需类型；按 schema 验证。
- **检查**：保留缺字段、错误类型、额外字段与无依据值的失败样本。重试有上限，失败输出不直接送进执行工具。

## [检索：先查片段再调生成|Retrieval: inspect passages before generation]

- **区分**：原文是否已解析入库、是否有访问权限、检索候选是否含答案？先检查片段 ID 与原文。
- **动作**：若入库内容为空或表格已错位，先修解析；若候选缺少精确编号，检查关键词检索；若候选有答案但排序靠后，再检查重排与上下文选取。
- **检查**：用固定问题分别记召回、答案与引用，不把生成模型的流畅回答当作检索成功。

## [引用：逐条对应说法|Citations: match each claim to evidence]

- **区分**：链接能打开、页面主题相关与原句支持结论，是三项不同检查。
- **动作**：为每个具体说法定位原句、表格行或页码；核对版本、日期、单位和适用条件。找不到支持时删去、标未知或明确为推断。
- **检查**：用同一原文逐项复核答案；来源之间冲突时保留差异，不自动合成确定结论。

## [文件：核对格式与解析结果|Files: inspect format and extraction]

- **区分**：上传失败、服务不支持该格式、扫描件没有文字层、解析后内容错位，要分别处理。
- **动作**：核对文件类型、大小与页数限制；扫描件先做 OCR，表格核对行列。HTTP 415 涉及不支持的媒体格式，具体仍看服务响应。
- **检查**：用无敏感信息的一页样例确认内容可读，再处理原文件；不能只凭上传成功判断已正确读取。

## [排查记录模板|Troubleshooting record]

复制后填写；不要粘贴密钥、个人数据或完整敏感日志。

```text
任务与预期结果：
产品 / 模型 / 运行器与版本：
系统 / 硬件 / 网络与日期：
最小输入与失败步骤：
原始错误码 / 请求 ID / 阶段：
已排除的原因及证据：
本次只改变的条件：
复查结果与残留未知项：
下一步 / 回退办法：
```

仅示例：若检索候选没有目标编号，先查解析与索引，再比较原编号的关键词查询；不要一开始就更换生成模型。

## [1. 把 n8n 当 OSI 开源|Mistaking n8n for OSI open source]

- **现象**：把源码公开当成 OSI 开源，直接用于闭源商业分发。
- **为什么会踩**：仓库公开可见，许可证却是 fair-code（Sustainable Use License）。
- **怎么避免**：读 LICENSE 原文，确认是否属于 OSI 认可许可；商用分发前问法务。
- **证据**：[n8n 档案](https://tools.specul.com/automation/n8n.html)（2026-10-30 核验）。

## [2. 把「源码可见」当「开源」|Mistaking source-visible for open source]

- **现象**：看到 GitHub 仓库就以为可自由修改与再分发。
- **为什么会踩**：仓库公开 ≠ 许可证允许；Claude Code CLI 的许可证是 All rights reserved。
- **怎么避免**：先看 LICENSE 与 README 的许可段，再看是否有再分发限制。
- **证据**：[Claude Code CLI 档案](https://tools.specul.com/coding/claude-code-cli.html)（2026-10 核验）。

## [3. 把「不训练原库」当「对话不训练」|Reading the wrong training scope]

- **现象**：以为 Gemini 不会用对话训练，因为官方说「不直接拿 Gmail/Drive 原库训练」。
- **为什么会踩**：原始资料与生成摘要、摘录的条款范围不同，是否用于训练还需按对应设置和当期条款核对。
- **怎么避免**：读隐私声明全文；要关就关 Keep Activity，敏感内容按官方提醒不要输入。
- **证据**：[Gemini 档案](https://tools.specul.com/chat/gemini-chat.html)（2026-10-21 核验）。

## [4. 把 C 端 Copilot 与 M365 Copilot 混用|Confusing two Copilot products]

- **现象**：在 C 端找 Deep Research，或拿消费档条款套企业数据。
- **为什么会踩**：两个产品面、两套条款与权限；C 端 Deep Research 已于 2026-08-18 退役。
- **怎么避免**：先确认入口是 copilot.microsoft.com 还是 M365；深度研究改用 Researcher。
- **证据**：[Microsoft Copilot 档案](https://tools.specul.com/chat/microsoft-copilot.html)（2026-10-22 核验）。

## [5. 以为 Atlas 浏览器还在|Assuming Atlas is still live]

- **现象**：按旧教程找 Atlas 的浏览器操作入口。
- **为什么会踩**：产品页与新闻页仍有残留；官方 release notes 写明 2026-08-09 停运。
- **怎么避免**：以最新 release notes 为准；能力已并入 ChatGPT / Codex，换入口。
- **证据**：[ChatGPT 档案](https://tools.specul.com/chat/chatgpt.html)（2026-11-03 核验）。

## [6. 把订阅当商用许可|Treating a subscription as a commercial licence]

- **现象**：买了会员就以为生成的视频可任意商用。
- **为什么会踩**：所有权与商用是两层；Kling 官方条款把商用与会员线绑定。
- **怎么避免**：读许可分层；保留条款页与订阅档位截图。
- **证据**：[Kling 档案](https://tools.specul.com/video/kling.html)（2026-10 核验）。

## [7. 忽略「训练许可不可撤销」|Ignoring an irrevocable training licence]

- **现象**：上传客户素材到视频平台，事后想撤回训练授权。
- **为什么会踩**：Runway 条款写明训练许可不可撤销、无退出开关。
- **怎么避免**：敏感素材先脱敏或不上传；把条款页存档后再开工。
- **证据**：[Runway 档案](https://tools.specul.com/video/runway.html)（2026-10 核验）。

## [8. 把开放权重当免费商用|Treating open weights as free commercial use]

- **现象**：下载 Ideogram 4.0 权重直接商用。
- **为什么会踩**：4.0 权重非商用免费，商用自托管需单独许可。
- **怎么避免**：分开读「权重许可」与「托管服务条款」；商用前取得许可。
- **证据**：[Ideogram 档案](https://tools.specul.com/image/ideogram.html)（2026-10 核验）。

## [9. 把「闭源应用」当「条款可忽略」|Skipping terms because the app is closed]

- **现象**：LM Studio 本地跑模型，默认以为数据完全不出本机。
- **为什么会踩**：应用是否闭源、模型是否本地推理与全部数据是否出网是不同问题。既有快照未取得条款全文，数据路径不能据此推断。
- **怎么避免**：核对模型、运行器、联网设置与条款；记录连接行为。一次断网后仍可回答，不证明所有模式均不出网。
- **证据**：[LM Studio 档案](https://tools.specul.com/runner/lm-studio.html)（2026-10 核验）。

## [10. 忽略已修复的安全问题|Ignoring a fixed security issue]

- **现象**：继续按旧版本配置 Windsurf 的 Restricted Mode。
- **为什么会踩**：产品已改称 Devin Desktop，且有 CVE 修复记录；旧教程仍流传。
- **怎么避免**：看官方发布说明与安全公告；升级后再按新配置。
- **证据**：[Windsurf 档案](https://tools.specul.com/coding/windsurf.html)（2026-10 核验）。

## [四问自查|Four questions]

1. **产品还在吗**：官方 release notes 最新一条是什么日期？
2. **许可证是哪一份**：工具许可、权重许可、服务条款分开看。
3. **数据去了哪**：训练、留存、跨境三项逐条确认。
4. **证据在哪**：条款页 URL 与核验日是否存档？

将影响当前任务的关键未知项写进记录，先补证据，再决定是否继续；不要用猜测填成已满足。
