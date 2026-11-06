---
id: lakera-ai
form: cloud
name: Lakera
vendor: Lakera
homepage: https://www.lakera.ai/
mark: L
accent: "#F26D6D"
license: >-
  商业 SaaS，不开源：官网与文档均未给出仓库或许可字段，本批次未抓到任何自托管发行物。
  账号与数据条款的可读入口当日实测为跳转——lakera.ai/privacy-policy 301 到 checkpoint.com/privacy，
  页脚署 Check Point；合规证书（SOC 2 / ISO 27001 等）在当日抓到的页面里未点名，属「未披露」而非「没有」。
licenseEn: >-
  Commercial SaaS, not open source: neither the site nor the docs expose a repository or licence field, and no self-hosted
  artefact was captured in this pass. The readable terms entry is a redirect measured the same day —
  lakera.ai/privacy-policy 301s to checkpoint.com/privacy, and the site footer credits Check Point; compliance certificates
  (SOC 2 / ISO 27001 and the like) are not named on the pages captured, which is "not disclosed", not "absent".

axes:
  model_access: >-
    它守与评的不是某一家模型，而是你的应用链路：文档把 Amazon Bedrock、Google Cloud、Microsoft Copilot Studio、
    Salesforce Agentforce、n8n、Relevance AI 与 MCP servers 列为集成面。Guard API 收下的是文本（POST 带 messages 与
    project_id），不是权重；底层检测模型能否替换、能否自选档位：官方未披露，API Reference 只在响应的 developer 信息里
    给 git_revision 与 model_version 两个字段。
  runtime: >-
    云侧交付：注册与配置在 platform.lakera.ai，检测走 api.lakera.ai 的托管 API，鉴权形式是
    「Authorization: Bearer $LAKERA_GUARD_API_KEY」，官方 quickstart 的调用是 POST https://api.lakera.ai/v2/guard。
    官网自我定位「The AI-Native Security Platform」，产品面写作 Workforce AI Security、AI Agent Security、AI Red Teaming。
    本机或私有化形态：本批次未取到官方口径，记未知。
  local_files: >-
    本机不落地：prompt 与响应由你的应用发出与收回，判定结果可在控制台的 Guard 结果面回看（文档列 /guard 与
    /guard/results 两个端点）。命中记录的导出格式、保留时长与删除方式：官方在册页未逐条给出，进 unknowns。
  background: >-
    两类异步要分开读：Guard 是同步 API 调用，官方口径是实时筛查；Red 是一次托管评估项目，文档写四步流程
    （enumeration、attack development、impact testing、reporting），交付「detailed findings with remediation guidance」。
    项目时长、并发上限与结果通知机制：官方未说明。
  tools: >-
    API 面两个端点在册（/guard 与 /guard/results），响应含 flagged 布尔判定。集成面见 model_access 维那份清单，
    其中「MCP servers」被官方列进受保护对象面——也就是说它既可作为 MCP 侧的防护，也把 MCP server 当被检对象。
    具体传输方式与工具审批语义：本批次未逐条核验。
  context: >-
    判定按单次文本请求组织，策略按 project 分档（Project mode 决定「block the interaction or logging for investigation」），
    因此它的「记忆」面就是项目与策略配置，不是跨会话上下文。跨会话记忆或历史串联：官方未说明，记未知。
  permissions: >-
    按官方条款逐条读：隐私入口当日 301 到 checkpoint.com/privacy，主体写作「Check Point Software Technologies Ltd.」；
    留存原文是「We will retain your information for as long as necessary to achieve the purposes described in this
    Privacy Policy.」；出境原文是「We may collect and transfer Personal Data on a global basis」并说明 EEA/UK 之外的
    传输依 adequacy 等机制之一；用途原文含「We may use telemetry, threat indicators … including capabilities powered by
    artificial intelligence (AI)」。⚠ 这些句子说的是个人信息与遥测，**没有逐条区分客户 prompt 内容的留存期与训练用途**，
    该项进 unknowns，不做推断。商业档位：pricing 入口当日跳转 platform.lakera.ai/pricing，未渲染出档位正文，报价本站不采。
  fit: >-
    适合：要在请求链路里实时管住 prompt injection / jailbreak / PII 泄露 / 违规内容，并且接受检测跑在厂商侧；
    策略要能在「阻断」与「只留档」之间按项目切换；栈里已经有 Bedrock、Copilot Studio、Agentforce、n8n 或 MCP server。
    不适合：必须离线或私有化部署（未取到该口径）；要换掉/自选底层检测模型；只想自己跑一轮可复现扫描留工程证据
    （那是 garak 与 PyRIT 的方向）；Red 评估还要联系团队、非自助开通。

pitfalls:
  - 把官网三条产品线当成可自托管组件：当日在册只有托管控制台 + Bearer API
  - 把 Project mode 的「block」读成拦截比例：官方在册的是策略开关，不给任何比例结论
  - 还按 Lakera 旧主体读数据条款：privacy 与 security 入口当日均 301 到 Check Point 侧

tags: [云端, 商业, guardrails, API, 多平台]
related: [azure-ai-content-safety, pyrit, n8n]

sources:
  - label: Lakera · 官网首页（「The AI-Native Security Platform」、三条产品线、docs 入口与 Check Point 署名；直读 200，2026-11-06）
    url: https://www.lakera.ai/
    kind: official
  - label: Lakera · /security 跳转事实（301 → checkpoint.com/ai-security/；当日实测，2026-11-06）
    url: https://www.lakera.ai/security
    kind: official
  - label: Check Point · AI Security 页（跳转目标在册产品线：Workforce / Application / Agent Runtime Security / AI Red Teaming；直读 200，2026-11-06）
    url: https://www.checkpoint.com/ai-security/
    kind: docs
  - label: Check Point · Privacy Policy（主体名、留存句、全球传输句、telemetry 与 AI 用途句；直读 200，2026-11-06）
    url: https://www.checkpoint.com/privacy/
    kind: docs
  - label: Lakera Docs · Developer quickstart（platform.lakera.ai 注册、LAKERA_GUARD_API_KEY、POST api.lakera.ai/v2/guard 与 messages/project_id；直读 200，2026-11-06）
    url: https://docs.lakera.ai/docs/quickstart
    kind: docs
  - label: Lakera Docs · API Reference（/guard 与 /guard/results、Bearer 鉴权、响应含 git_revision 与 model_version；直读 200，2026-11-06）
    url: https://docs.lakera.ai/api-reference
    kind: docs
  - label: Lakera Docs · AI Agent Security / Guard（防护类别、Project mode 的阻断或留档、集成清单含 MCP servers；直读 200，2026-11-06）
    url: https://docs.lakera.ai/guard
    kind: docs
  - label: Lakera Docs · AI Red Teaming（四步评估流程、覆盖的攻击类别、交付物、需联系团队；直读 200，2026-11-06）
    url: https://docs.lakera.ai/red
    kind: docs
  - label: Lakera Docs · Changelog 2026-10-26（Analytics 页给 Guard API 延迟 25/50/75/95 分位图；直读 200，2026-11-06）
    url: https://docs.lakera.ai/changelog/2026-10-26
    kind: changelog
  - label: Lakera · Pricing 入口（301 → platform.lakera.ai/pricing；当日抓取未渲染出档位正文，报价不采，2026-11-06）
    url: https://www.lakera.ai/pricing
    kind: pricing

link:
  url: https://platform.lakera.ai/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 当日在册的属地证据只有官网页脚与隐私条款跳转指向 Check Point 主体；Lakera 自身的注册主体与国籍背景本批次未逐条核验，故按 foreign 记录。
  origin_note_en: The only locality evidence on record the same day is the site footer and the privacy redirect pointing at the Check Point entity; Lakera's own registering entity and nationality background were not verified item by item, so it is recorded as foreign.
  direct: unknown
  direct_note: lakera.ai、docs.lakera.ai 与 checkpoint.com 当日从当前网络取到 200/301，但未在大陆网络环境做直连实测，故记未知。
  direct_note_en: lakera.ai, docs.lakera.ai and checkpoint.com returned 200/301 from the current network on the verification date, but no mainland-network direct-connection measurement was made, so it is recorded as unknown.
  filing: unknown
  filing_note: 无官方依据，本批次未检索生成式 AI 备案公示，不下「未备案」结论。
  filing_note_en: No official basis; the generative-AI filing registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**Lakera 是「托管在厂商侧」的那一层 AI 安全**：官网自我定位 "The AI-Native Security Platform"，产品面分
Workforce AI Security、AI Agent Security、AI Red Teaming 三条；工程侧能看到的是 platform.lakera.ai 的控制台加
api.lakera.ai 的 Bearer API。**和本大类另外两份红队档案的分工很直白**：garak 与 PyRIT 是「你自己跑、跑完留证据」，
Lakera 是「你的请求每次经过它、它给一个 flagged 判定并允许你选择阻断还是留档」。当日另一个必须记的事实是
**归属与条款入口已经统一到 Check Point**（privacy 与 security 都 301 过去）。

## 适合与不适合

适合：要在链路里实时管住 prompt injection / jailbreak / PII 泄露 / 违规内容，并接受检测跑在厂商侧；策略需要按项目
在「block the interaction」与「logging for investigation」之间切换；栈里已经有 Amazon Bedrock、Google Cloud、
Microsoft Copilot Studio、Salesforce Agentforce、n8n、Relevance AI 或 MCP server。不适合：必须离线或私有化
（未取到该口径）、要替换或自选底层检测模型、只想跑一轮可复现扫描留工程证据、以及需要自助开通的红队评估
（Red 需联系团队）。

## 实测记录

**本站未做端到端实测**：没有发起过 /guard 调用，没有跑过 Red 评估项目，不产出延迟、准确率或任何比例结论，
也不做产品排名。本档案只组织官网、跳转事实、Check Point 隐私条款、四个 Docs 页面与 Changelog 在册的说法。
**实测建议**（四条）：

- **策略分档的实际语义**：Project mode 选「logging」时，你的应用拿到的是什么形态的响应（flagged 字段与后续处置）
- **响应里 model_version 的可追溯性**：能否用于变更审计，官方未说明
- **客户 prompt 内容的留存期与删除路径**（条款未逐条区分，见 unknowns）
- **私有化/自托管是否存在**（当日未取到任何官方口径）

## 变更记录说明

本对象有独立 changelog：docs.lakera.ai/changelog/ 下按日期分条，最新在册条目为 2026-10-26（Analytics 页新增
Guard API 请求延迟的 25/50/75/95 分位图），sitemap 可回溯到 2023-10-05，条目大致两周一条。
**这条变化对本档案的意义是运维面而不是防护面**：它给的是延迟观测，不是拦截效果指标；本站不把任何此类数值转写成
「拦得住多少」。仓库形态为闭源 SaaS，无 releases 可比。

## 能力边界

- 能确认的判定类别（官方 Guard 页在册）：prompt attacks / data leakage / content violations，含 jailbreak、PII、
  攻击性与违规内容，以及「dangerous actions outside the agent's trusted mandate」这类 agent 越权动作。
- 判定形式是**每次请求返回的布尔与分类**，不是覆盖率证明；类别名字说明的是测试语义，本站不做比例换算。
- 检测发生在 Lakera/Check Point 侧，这意味着数据出境与留存是选型的第一道问题——而当日条款文本只覆盖个人信息与遥测，
  **客户 prompt 内容的留存与训练用途未逐条在册**。

## 未知项清单

- 客户 prompt / 响应内容的留存期、删除路径与是否用于模型训练（条款未逐条区分）
- 合规证书与审计材料（SOC 2、ISO 27001、DPA、subprocessor 清单）：当日抓到的页面未点名
- 私有化 / 自托管形态是否存在
- 商业档位结构与额度（pricing 跳转页当日未渲染出正文）
- 底层检测模型能否替换或自选档位
- MCP 集成的具体传输形态与工具审批语义
- 红队评估项目的周期、并发与交付格式
- 大陆网络直连可用性与备案情况（未实测、未检索）

## 相关条目

- [Azure AI Content Safety](./azure-ai-content-safety.md) — 同为托管内容安全 API：那份挂在 Azure 账号与区域口径下，本档案挂在 Check Point 主体的 SaaS 条款下。
- [PyRIT](./pyrit.md) — 同一问题的两端：本档案是链路里的托管判定，那份是你自己编排、自己留记录的红队流程。
- [n8n](../../automation/products/n8n.md) — 官方在册的集成面之一：agent 工作流平台是它被防护的对象形态。

## 部署建议

1. 先解决尽调问题：客户 prompt 是否出境、留存多久、是否进训练——当日条款文本**没有**逐条回答这三问，要拿 DPA 再判。
2. 灰度时先让 Project mode 走「logging」，把 flagged 的处置权留在自己应用里，再决定何时切「block」。
3. 把响应里的 model_version / git_revision 记进你的变更日志，否则事后无法举证当时用的是哪一版检测。
4. 红队需求先分清：要工程可复现的探针记录走 PyRIT/garak，要一份带整改建议的托管评估再联系 Lakera Red。
