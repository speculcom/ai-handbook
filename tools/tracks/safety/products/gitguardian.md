---
id: gitguardian
form: web
name: GitGuardian
vendor: GitGuardian
homepage: https://www.gitguardian.com/
mark: GG
accent: "#FF6B6B"
license: >-
  商业 SaaS，不开源：官网与文档均未提供许可证字段或自托管源码发行物，本批次未抓到任何「可自部署的开源核心」口径
  （/trust 与 /security 两个入口当日返回 404）。可确认的合规线索只有官网在册的框架清单
  「PCI DSS, CIS, NIS2, SOC 2, DORA, ISO 27001, SOX, GDPR」——这是它写给自己的**对标语义**，
  不是本站核验过的认证证书；具体证书、DPA 与 subprocessor 清单未披露到公开页，进 unknowns。
licenseEn: >-
  Commercial SaaS, not open source: neither the site nor the docs expose a licence field or a self-deployable open core,
  and no such claim was captured in this pass (/trust and /security both returned 404 that day). The only compliance
  clue is the framework list on record at the site — "PCI DSS, CIS, NIS2, SOC 2, DORA, ISO 27001, SOX, GDPR" — which is
  **positioning language**, not a certificate verified by this site; the actual certificates, DPA and subprocessor list
  are not disclosed on public pages and go to unknowns.

axes:
  model_access: >-
    它不守模型，也不接模型档位：主轴是凭据（secrets）与身份。与被测模型的关系只有两条在册面——官方文档导航列出
    「GitGuardian MCP Server」，其页描述是把凭据安全能力带进 AI 编码助手；另一条是 ggshield 覆盖 IDE 与
    pre-commit/pre-push 这些「代码写出来的地方」。可换的检测模型：不适用（它做的是模式匹配 + 有效性校验，不是模型评测）。
  runtime: >-
    浏览器里的平台是主交互面（文档导航含 Platform / Secrets Detection / Internal Monitoring / Public Monitoring /
    NHI Governance / Endpoint Protection / Honeytoken，登录入口指向 dashboard.gitguardian.com），扫描与编排在 SaaS 侧；
    同时存在两类本机面：ggshield「Scans run locally」（官方文档在册），以及 Self-Hosting 文档口径
    「set up and run the GitGuardian platform on your infrastructure」，并明确列出 air-gapped 环境与 Kubernetes 两种安装形态。
  local_files: >-
    ggshield 在你机器上扫仓库、目录与 diff，输出格式文档在册（json / gitlab / sarif），命令面含 secret scan、diagnose、
    ignore-display；平台侧接的是你的仓库、CI/CD、容器镜像仓库与协作工具（内部监测文档口径
    「code repositories to container registries and collaboration tools」）。**扫过的代码内容在厂商侧留存多久**：
    公开条款未逐条说明，进 unknowns。
  background: >-
    后台面是它的强项之一，但归属不同：平台侧持续监测（含公开 GitHub 监测与 incident 生命周期），
    本机侧则是提交前/推送前的即时拦截。SaaS 更新的节奏可在文档的 SaaS Releases 逐日回看
    （当日在册最新为 2026-10-29 的团队同步条目）。
  tools: >-
    集成分布在文档导航里成体系：GitHub / GitLab / Bitbucket / Azure、CI（Azure Pipelines、Jenkins）、
    Jira / Slack / Confluence、容器镜像仓库（含 Harbor 条目）、Endpoint Protection、Honeytoken（诱饵凭据）、
    ggscout 与 GitGuardian API。**MCP 面官方在册**：MCP Server 文档页写明
    「Bring secrets security directly into your AI coding assistant」，并列出「read-only permissions,
    server-side scanning, and secret redaction」这三条安全约束。
  context: >-
    它的「记忆」是资产与事件台账，不是会话上下文：NHI Governance（非人身份治理）、incidents 生命周期、
    perimeter 监测范围这些对象长期驻留在平台里。跨会话记忆/上下文窗口不适用——它不生成内容。
    检测器的历史与版本另有一页 Detection Engine Releases（文档导航在册，本批次未逐条读取）。
  permissions: >-
    逐条挂来源：账号与数据条款的可读入口是官网隐私政策，其中留存原文是「Data collected when you request information or
    when you contact us is kept for two (2) years from our last contact.」，出境原文是
    「We may share your Personal Data with our US office, which is located outside of the EEA, in the US.」；
    **是否把客户代码或命中内容用于训练**：该政策未提及，也未声明客户代码存储范围，两项都进 unknowns。
    检测语义按官方 FAQ 在册：引擎分「Pre-Validation」「Matching」「Post-Validation」三步，且
    「GitGuardian will check the validity of the detected credentials」。红线：官方标称的「600+ types of hardcoded secrets」
    是**密钥类型计数**，本站绝不把它写成拦截率或覆盖率，也不与 PII 类工具排名——
    「Secrets never leave your perimeter」这类官网表述只在自托管/边界面语境下读。
  fit: >-
    适合：凭据与非人身份已成规模（多仓库 + CI + 容器 + 协作工具 + AI 编码助手），要的是持续监测与事件闭环，
    而不是扫一次；需要 pre-commit/pre-push 与 IDE 侧即时拦截；网络边界要求高时可以走 self-hosting 甚至 air-gapped。
    不适合：目标是「个人数据进模型前的脱敏算子在自己机器上跑」（那是 Presidio 那条约束）；只要一次性红队扫描留证据；
    期望用凭据扫描器替代模型评测。

pitfalls:
  - 把「600+ 密钥类型」读成拦截率：官方口径是类型计数，本站不换算成任何比例
  - 以为只有 SaaS 一条路：官方文档明确列出 self-hosting 与 air-gapped 两种安装形态
  - 拿它当模型评测或脱敏工具：对象是凭据与身份，既不评模型行为也不提供脱敏算子

tags: [云端, 商业, 自托管, 终端, CI, API]
related: [nightfall, presidio, pyrit]

sources:
  - label: GitGuardian · 官网首页（「Credential Layer Security Platform」、ggshield/ggscout 产品名、合规框架清单、pre-commit/pre-push/IDE 覆盖面；直读 200，2026-11-06）
    url: https://www.gitguardian.com/
    kind: official
  - label: GitGuardian · 文档首页导航（Platform / Secrets Detection / Internal & Public Monitoring / NHI Governance / Endpoint Protection / Honeytoken / Self-Hosting / ggshield / MCP Server / API / 两类 Releases 页；直读 200，2026-11-06）
    url: https://docs.gitguardian.com/
    kind: docs
  - label: GitGuardian · ggshield 文档首页（「Detect and prevent 600+ types of hardcoded secrets」、secret scan/diagnose 命令、json/gitlab/sarif 输出、Scans run locally；直读 200，2026-11-06）
    url: https://docs.gitguardian.com/ggshield-docs/home
    kind: docs
  - label: GitGuardian · Self-Hosting 文档（「set up and run the GitGuardian platform on your infrastructure」、Kubernetes 安装与 air-gapped 环境；直读 200，2026-11-06）
    url: https://docs.gitguardian.com/self-hosting/home
    kind: docs
  - label: GitGuardian · Internal Monitoring 文档（监测面对象：代码仓库到容器镜像仓库与协作工具；直读 200，2026-11-06）
    url: https://docs.gitguardian.com/internal-monitoring/home
    kind: docs
  - label: GitGuardian · MCP Server 文档（带进 AI 编码助手、read-only permissions / server-side scanning / secret redaction 三条约束；直读 200，2026-11-06）
    url: https://docs.gitguardian.com/ggmcp-docs/home
    kind: docs
  - label: GitGuardian · 检测引擎 FAQ（Pre-Validation / Matching / Post-Validation 三步、凭据有效性校验句、false positive 定义；直读 200，2026-11-06）
    url: https://docs.gitguardian.com/secrets-detection/secrets-detection-engine/frequently_asked_questions
    kind: docs
  - label: GitGuardian · SaaS Releases（2026-10-29 / 10-27 / 10-21 / 10-15 / 10-09 逐日条目；直读 200，2026-11-06）
    url: https://docs.gitguardian.com/releases/saas
    kind: changelog
  - label: GitGuardian · 隐私政策（联系方式数据两年留存句、向美国办公室传输句；未涉及客户代码存储与训练用途；直读 200，2026-11-06）
    url: https://www.gitguardian.com/legal/privacy-policy
    kind: docs
  - label: GitGuardian · Pricing 页（Starter / Growth / Enterprise 三档额度事实：25 devs、1M calls/month、self-hosted 仅顶档；报价不采，2026-11-06）
    url: https://www.gitguardian.com/pricing
    kind: pricing

link:
  url: https://dashboard.gitguardian.com/auth/login
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: GitGuardian（法国厂商，文档提供 English/Français 两语；官网与隐私政策均写明向美国办公室传输数据）；本批次未逐条核验注册主体。
  origin_note_en: GitGuardian (a French vendor; the docs offer English/Français and both the site and privacy policy state transfers to the US office); the registering entity was not verified item by item in this pass.
  direct: unknown
  direct_note: www.gitguardian.com 与 docs.gitguardian.com 当日从当前网络取到 200，但未在大陆网络环境做直连实测；dashboard 与 API 可达性同样未测，故记未知。
  direct_note_en: www.gitguardian.com and docs.gitguardian.com returned 200 from the current network on the verification date, but no mainland-network measurement was made; dashboard and API reachability were likewise untested, so it is recorded as unknown.
  filing: unknown
  filing_note: 无官方依据，本批次未检索生成式 AI 备案公示，不下「未备案」结论。
  filing_note_en: No official basis; the generative-AI filing registry was not searched in this pass, so no "not filed" conclusion is drawn.
  verified: 2026-11-06
---

## 一句话定位

**GitGuardian 是「凭据层」的持续监测平台**：官网把它写成 Credential Layer Security Platform，产品面同时给出
SaaS 平台、ggshield 与 ggscout，覆盖面从代码仓库、CI/CD、容器镜像仓库一直排到 Slack/Jira/Confluence 与 AI 编码助手。
放在本大类里，它回答的问题跟脱敏与红队那几份都不一样——**不是「模型会不会出错」，而是「已经流出去的密钥，你现在知不知道」**。
对本大类最关键的一条边界是：它评的不是模型行为，所以任何「护住模型」的说法都不该写在这份档案里。

## 适合与不适合

适合：凭据与非人身份已经成规模（多仓库 + CI + 容器 + 协作工具 + AI 助手），需要的是持续监测与事件闭环而不是扫一次；
需要 pre-commit/pre-push 与 IDE 侧的即时拦截；网络边界要求高时可以走 self-hosting 甚至 air-gapped 形态。
不适合：目标是「个人数据进模型前的算子必须跑在自己机器上」（那是 Presidio 那条约束）；只要一次性红队扫描留工程证据；
期望用密钥扫描器替代模型评测。

## 实测记录

**本站未做端到端实测**：没有接入过任何仓库或 CI，没有触发过 incident，没有运行 ggshield 扫描，
不产出检出比例、误报率或任何排名。本档案只组织官网、文档首页导航、四个文档分区页、检测引擎 FAQ、
SaaS Releases、隐私政策与 Pricing 在册的说法。

**实测建议**（四条）：

- **有效性校验的实际行为**（官方 FAQ 说会 check validity，具体调用形式与失败面未在册）
- **自托管与 air-gapped 部署下的功能差集**（哪些集成与 Honeytoken 在离线模式仍可用）
- **MCP Server 的 read-only 约束在真实 agent 里怎么落地**（三条安全约束在册，权限模型未逐条核验）
- **扫过的代码片段在厂商侧留存多久**（公开条款未逐条说明，尽调必问）

## 变更记录说明

本对象没有 /changelog 页（当日返回 404），但文档体系里有**三条独立变更记录线**，均按日期成条：
SaaS Releases（当日在册最新 2026-10-29「Sync your GitHub teams, members, and perimeters automatically」，
其后 10-27 端点扫描降噪、10-21 公共 Docker Hub 镜像、10-15 vaulted secrets 有效性检查、10-09 Harbor 镜像仓库扫描）、
Detection Engine Releases 与 Self-Hosted Releases（两条均在文档导航在册，本批次未逐条读取正文）。
发布密度为周级，仓库形态为闭源，故 lifecycle 按 SaaS 更新节奏判 active。

## 能力边界

- 对象边界：凭据、密钥、非人身份与它们的流动面；**不含模型行为评测、不含个人数据脱敏算子**。
- 检测语义边界：官方 FAQ 把引擎写成「Pre-Validation → Matching → Post-Validation」三段，并对命中的凭据做有效性校验；
  官网标称的「600+ types of hardcoded secrets」是**类型计数**，本站不把它换算成拦截率、也不与别的工具排名。
- 误报语义：官方 FAQ 自己给的定义是「a false positive occurs when our detection engine raises an alert for a secret
  that is not one and has never been one」——**这是定义，不是指标**。
- 边界面：ggshield 的扫描在本机跑（官方在册），平台侧扫描在厂商侧跑；「Secrets never leave your perimeter」这类表述
  只在自托管/边界面语境下读，本档案不把它当条款引用。

## 未知项清单

- 合规证书与审计材料本体（SOC 2 / ISO 27001 报告、DPA、subprocessor 清单）：/trust 与 /security 当日 404，公开页未披露
- 客户代码与命中片段在厂商侧的存储范围与留存期
- 是否使用客户数据训练模型（隐私政策未提及）
- Detection Engine Releases 与 Self-Hosted Releases 的逐条内容
- Honeytoken 的具体类型与检测链路（导航在册，正文未读）
- 数据驻留区域是否可选（隐私政策只写明向美国办公室传输）
- MCP Server 的权限模型与工具面清单
- 大陆网络直连可用性与备案情况（未实测、未检索）

## 相关条目

- [Nightfall](./nightfall.md) — 同为托管平台但对象不同：那份管 PII/源码与 agent 数据流动，本档案管凭据与事件闭环。
- [Presidio](./presidio.md) — 约束相反：那份的算子必须在你自己边界内跑，本档案默认在厂商侧扫、另有自托管面。
- [Cursor](../../coding/products/cursor.md) — 凭据泄漏新增的书写面：官方把「wherever code is written」的 IDE/pre-commit 面列为主覆盖场景之一。

## 部署建议

1. 先分清约束：能接受托管扫描 → 走 SaaS；不能 → 读 Self-Hosting 文档（Kubernetes 与 air-gapped 两种口径在册）再评估人力。
2. 接入顺序建议「先只读后阻断」：先做仓库与 CI 的监测与事件分诊，再把 ggshield 的 pre-commit/pre-push 开成阻断。
3. 有效性校验会向 issuing 服务发起调用（官方 FAQ 口径），接入前确认出网白名单与限流。
4. AI 编码助手那面如果要接官方 MCP Server，先把 read-only 与 secret redaction 这两条约束验证一遍再给权限。
