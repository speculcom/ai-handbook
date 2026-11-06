---
id: nightfall
form: cloud
name: Nightfall
vendor: Nightfall AI
homepage: https://www.nightfall.ai/
mark: N
accent: "#8B5CF6"
license: >-
  商业 SaaS，不开源：官网与帮助中心均未给出仓库或许可证字段，本批次未取到自托管发行物（/trust 与 /changelog 两个入口
  当日返回 404）。合规口径可确认的只有一句——security 页在册「Nightfall is SOC 2 Type 2 certified」；
  ISO 27001、GDPR/DPA、subprocessor 清单在当日抓到的页面里未点名，属「未披露」而非「没有」。
licenseEn: >-
  Commercial SaaS, not open source: neither the site nor the help centre exposes a repository or licence field, and no
  self-hosted artefact was captured in this pass (the /trust and /changelog entries both returned 404 that day). The one
  compliance statement that can be confirmed is on record at the security page: "Nightfall is SOC 2 Type 2 certified";
  ISO 27001, GDPR/DPA and the subprocessor list are not named on the pages captured — "not disclosed", not "absent".

axes:
  model_access: >-
    不开放选模型：检测引擎是厂商自有的，官方页面未披露底层模型档位，也没有自带模型的入口。它守的是你的 agent 与 LLM
    链路——DLP API 收文本与文件，MCP Gateway 管「AI clients 与 remote MCP servers 之间」的流量，Inference Hooks 的官方
    文档页标题点名 Cursor、Claude Code 与 VS Code Copilot。能否替换或自选检测模型：未取到官方声明，记未知。
  runtime: >-
    托管交付：扫描走 api 侧的 /v3/scan 与 /v3/upload 系列端点，结果在控制台与 Violations 页回看（release notes 在册）。
    端点侧确有本地代理——macOS/Windows 的 endpoint agent 在文档与更新日志里在册（AirDrop 与 Bluetooth 外发控制、
    MDM 授权），但检测与判定按官方口径仍是服务侧能力。自托管或 air-gapped 形态：当日抓到的页面未列，记未知。
  local_files: >-
    你能交给它的东西（官方 FAQ 在册）：「plain text, structured and unstructured files, and even images」，格式点名
    JSON、XML、CSV 等；端点面则在你的机器上读文件以便在读取时刻阻断。**交给它的内容是否留存、留多久**：DLP API 文档与
    FAQ 均未声明，进 unknowns。图像与文件的能力限制见 supported file types 文档页（本批次未逐条读取）。
  background: >-
    异步任务面清楚：文件扫描是 /v3/upload（POST 发起）→ /v3/upload/{fileId}（PATCH 传分块）→ /finish → /scan 的多步流程，
    配套 webhooks 与异步通知文档页在册；事件在控制台聚合。**这层跑在厂商侧**，不存在「关机后续跑」的本机任务语义。
  tools: >-
    API 面（DLP 文档页在册）：请求字段 payload、policyUUIDs、detectionRules、redactionConfig、alertConfig，响应字段
    findings、redactedPayload、message。扩展面：Nightfall 官方 MCP server 文档在册（让 AI 助手直接查安全数据），
    Inference Hooks 接 IDE/agent，Premier 档另列 OpenTelemetry audit trail 与 MCP server discovery（pricing 页在册）。
    MCP 传输方式与工具审批细节：本批次未逐条核验。
  context: >-
    它的「上下文」是策略与规则集，不是会话记忆：一次扫描由 policyUUIDs 与 detectionRules 决定按哪些规则跑。
    可复核的历史面有明确边界——MCP Gateway 的审计记录写 user、server、tool、status 与 request payload，
    而 payload「capped at 8 KiB」；超出部分的处置方式官方未说明，记未知。
  permissions: >-
    逐条挂来源：SOC 2 Type 2 在 security 页在册；**数据出境、留存期、是否用于训练**这三问在本批次抓到的任何官方页面里
    都没有逐条答案（developer-api 文档与 FAQ 未声明，/trust 404），因此一律进 unknowns，不做「不训练」这类推断。
    档位与额度事实（pricing 页在册，不含价格）：Foundation Edition 覆盖「12 API-integrated SaaS apps」的
    Data Detection & Response，端点代理「covers every SaaS app, desktop app, and AI app」，每用户许可含「2 endpoint devices」，
    各档均含「150 GB of data-at-rest scanning」；Premier 另加 AI agent stack、MCP server discovery 与
    OpenTelemetry audit trail。红线口径：官方在册的是检测类别与动作（block、mask/redact、removeFinding、cryptoConfig），
    本站不写检出率、漏检率，也不把它与自部署方案排名——选型看的是「数据能不能出你的边界」这一条约束。
  fit: >-
    适合：SaaS、端点与 agent 三条面已经在用，要统一管控；需要在 MCP 与 IDE hooks 这一层加动作；愿意用托管 API 在发给
    模型之前把 PII 与凭据处理掉；需要事件面与审计面而不是自己搭一套。不适合：硬约束「文本不出自己的边界」或要求可审计
    的开源许可（那种约束下走自部署方案）；只需要凭据泄露监测与 incident 工作流的团队。

pitfalls:
  - 把「有 MCP Gateway」当成「MCP 流量已全量脱敏」：官方在册审计 payload 上限 8 KiB，超出部分未说明
  - 把 endpoint agent 当成整套离线：检测与判定按官方口径仍是服务侧能力
  - 把「SOC 2 在册」读成「留存与训练用途已披露」：那三问本批次未取到条款答案

tags: [云端, 商业, API, 混合, 自动化]
related: [presidio, gitguardian, claude-code-cli]

sources:
  - label: Nightfall · 官网首页（「Security Platform for Agents, MCP and Data Movement」、MCP Gateway / Inference Hooks / endpoint DLP、检测物类别；直读 200，2026-11-06）
    url: https://www.nightfall.ai/
    kind: official
  - label: Nightfall · Security 页（SOC 2 Type 2 在册；当日未点名其他证书与留存条款；直读 200，2026-11-06）
    url: https://www.nightfall.ai/security
    kind: docs
  - label: Nightfall · Pricing 页（Foundation / Premier 两档的覆盖面与额度事实，不含价格；直读 200，2026-11-06）
    url: https://www.nightfall.ai/pricing
    kind: pricing
  - label: Nightfall · 帮助中心首页（在册类别句「PII, PCI, PHI, and API keys」与「filter sensitive data from your GenAI apps, models, and datasets」；产品线分区；直读 200，2026-11-06）
    url: https://help.nightfall.ai/
    kind: docs
  - label: Nightfall · DLP APIs（Firewall for AI 平台）（/v3/scan 与 /v3/upload 系列端点、请求/响应字段、mask/substitution/crypto/removeFinding 动作面；直读 200，2026-11-06）
    url: https://help.nightfall.ai/developer-api/nightfall_apis/dlp.md
    kind: docs
  - label: Nightfall · FAQ「What types of data can I scan with API?」（可扫文本/结构化/非结构化文件与图像；未声明留存；直读 200，2026-11-06）
    url: https://help.nightfall.ai/developer-api/faqs/data_scan.md
    kind: docs
  - label: Nightfall · MCP Gateway 文档（位于 AI 客户端与远端 MCP server 之间、凭据 broker、Block/Disable tool、审计字段与 payload 8 KiB 上限；直读 200，2026-11-06）
    url: https://help.nightfall.ai/data-exfiltration-prevention/ai-agent-security/ai-governance/mcp-gateway.md
    kind: docs
  - label: Nightfall · Release Notes 2025-2026（2026-10 与 2026-09 条目：Violations 加密状态筛选、Drive 补救失败原因、macOS MDM/AirDrop/Bluetooth 控制等；直读 200，2026-11-06）
    url: https://help.nightfall.ai/release_notes/nightfall_new_features.md
    kind: changelog
  - label: Nightfall · Data Exfiltration Prevention 分区页（在册连接器：Google Drive、Endpoint、Salesforce；直读 200，2026-11-06）
    url: https://help.nightfall.ai/data-exfiltration-prevention
    kind: docs

link:
  url: https://www.nightfall.ai/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Nightfall AI（美国厂商，官网与帮助中心均英文、无面向大陆的条款页）；本批次未逐条核验注册主体。
  origin_note_en: Nightfall AI (a US vendor; the site and help centre are English-only with no mainland-facing terms page); the registering entity was not verified item by item in this pass.
  direct: unknown
  direct_note: nightfall.ai 与 help.nightfall.ai 当日从当前网络取到 200，但未在大陆网络环境做直连实测，故记未知。
  direct_note_en: nightfall.ai and help.nightfall.ai returned 200 from the current network on the verification date, but no mainland-network direct-connection measurement was made, so it is recorded as unknown.
  filing: unknown
  filing_note: 无官方依据，本批次未检索生成式 AI 备案公示，不下「未备案」结论。
  filing_note_en: No official basis; the generative-AI filing registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**Nightfall 是「AI 时代那套托管 DLP」**：官网首页自我定位 "Security Platform for Agents, MCP and Data Movement"，
把三件事放在同一层——发给模型前的文本/文件扫描（DLP API）、IDE 与 agent 的 Inference Hooks、以及坐在 AI 客户端与远端
MCP server 之间的 Gateway。它和自部署那条线的分工不需要排名来表述：**能不能把数据交出去**就是分界线；能交出去，
这里给的是策略化、事件化、审计化的一套托管面；不能交出去，就该去看算子与 recognizer 都在自己机器上的方案。

## 适合与不适合

适合：SaaS、端点、agent 三条面已经在用且想统一管控；需要在 MCP 与 IDE hooks 这一层真的下动作（Block server、
Disable tool）；愿意用托管 API 在数据进模型前把 PII 与凭据处理掉；需要事件面与审计面而不是自己搭。不适合：
「文本不出自己边界」的硬约束，或要求公开许可与可自托管审计；只需要凭据泄露监测与 incident 工作流的团队。

## 实测记录

**本站未做端到端实测**：没有调用过 /v3/scan，没有部署过 MCP Gateway 或端点代理，不产出检出率、漏检率、延迟或任何
排名。本档案只组织官网、Security、Pricing、帮助中心首页、两个 developer-api 页、MCP Gateway 文档与 Release Notes
在册的说法。**实测建议**（四条）：

- **8 KiB 之外的 payload 怎么处置**（Gateway 审计边界在册，超限行为未在册）
- **redactionConfig 与 cryptoConfig 混用时的还原与审计语义**
- **交给 API 的内容在厂商侧是否留存、留多久**（条款未逐条在册，尽调必问）
- **端点代理与托管判定之间的延迟与离线可用性**（macOS 阻断动作在册，链路行为未核验）

## 变更记录说明

本对象没有站内 changelog 页（/changelog 与 /trust 当日返回 404），但帮助中心有独立 Release Notes：
最新在册条目为 2026-10（Violations 页新增加密状态筛选；Google Drive 补救动作给出失败原因）与 2026-09
（macOS 27 经 MDM 授予辅助功能权限；AirDrop 与 Bluetooth 外发控制；Windows 各外发通道的 branded block dialogs）。
这些是**产品变更事实**，不含任何效果指标；本档案的 changelog 链接即指向该 Release Notes 页。

## 能力边界

- 检测类别按官方在册表述是「secrets, source code and customer PII」（官网）与「PII, PCI, PHI, and API keys
  exposed in locations like Slack and GitHub」（帮助中心），后者另写「filter sensitive data from your GenAI apps,
  models, and datasets」——**是类别清单，不是覆盖率**。
- 动作面在册：阻断（Block/Disable）、掩码（maskConfig）、替换（substitutionConfig / infoTypeSubstitutionConfig）、
  加密（cryptoConfig）、删除（removeFinding）、返回 redactedPayload。
- 边界要说清：判定与扫描发生在厂商侧，端点代理只是把动作推到读取时刻；本批次未取到自托管或 air-gapped 口径。

## 未知项清单

- 数据出境路径、留存期与是否用于模型训练（当日抓到的任何官方页面均未逐条说明）
- ISO 27001、GDPR/DPA、subprocessor 清单与渗透测试报告入口（/trust 404）
- 自托管 / air-gapped 形态是否存在
- 底层检测模型能否替换或自选档位
- MCP Gateway 对超过 8 KiB payload 的处置方式
- 端点代理的离线可用性与延迟行为
- 各档位的速率/配额上限与超额处理（pricing 页只给覆盖面事实）
- 大陆网络直连可用性与备案情况（未实测、未检索）

## 相关条目

- [Presidio](./presidio.md) — 同一条约束的两侧：那份把识别与算子全留在你边界内，本档案把检测与判定交给托管 API。
- [GitGuardian](./gitguardian.md) — 管的对象不同：那份主轴是凭据泄露与事件闭环，本档案主轴是 PII/源码与 agent 数据流动。
- [Claude Code CLI](../../coding/products/claude-code-cli.md) — 官方为 IDE/agent 侧提供 Inference Hooks，文档页点名 Claude Code 这一类接入面。

## 部署建议

1. 先做一次「出境判断」：把准备交给 API 的内容分级，若任何一级明确不允许出边界，本档案这条线就直接排除，不必再比能力。
2. 若可出境，第一轮只跑 redaction 不跑阻断，把 redactedPayload 与你的原文做人工抽样核对——**注意本站不代为给出命中率结论**。
3. 上 MCP Gateway 前，先确认审计 payload 上限（官方在册 8 KiB）与你的取证需求是否匹配，并明确超限行为要向厂商确认。
4. 把 SOC 2 报告与 DPA 索取列为合同前置项：本批次抓到的公开页面只确认了认证存在，未确认留存与训练用途。
