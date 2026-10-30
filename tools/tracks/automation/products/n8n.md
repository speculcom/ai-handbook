---
id: n8n
form: web
name: n8n
vendor: n8n GmbH
homepage: https://n8n.io
license: Sustainable Use License（fair-code，非 OSI 开源）：自用/内部业务用途免费可改可分发（分发须免费且非商业）；把 n8n 提供给他人搭建或托管收费需商业协议；文件名含 .ee. 的部分归 n8n Enterprise License。
licenseEn: Sustainable Use License (fair-code, not OSI open source): free to use, modify and redistribute for internal business or non-commercial purposes; distribution must be free of charge and non-commercial; offering n8n for others to build on, or hosting it for pay, requires a commercial agreement; files containing .ee. fall under the n8n Enterprise License.

axes:
  model_access: >-
    平台本身不带模型，AI 节点经各厂商凭据接外部 LLM（OpenAI、Anthropic、Google 等经
    LangChain 节点族与专用节点）；具体节点覆盖清单未逐条核验，以官方 nodes 文档为准。
    自托管时模型凭据在你自己的实例上。
  runtime: >-
    两条官方形态：自托管（Docker/npm，Community 版免费无执行上限）与 n8n Cloud 托管订阅。
    自托管队列模式（worker 扩展）包含在 Community 内，multi-main 高可用属付费档
    （官方 choose-n8n 口径，2026-10 第三方转述+官方 docs 对照）。
  local_files: >-
    自托管实例跑在你自己的机器/服务器上，工作流数据、凭据、执行日志都落在自有环境；
    二进制数据外部存储（S3 等）属付费档。Cloud 形态数据在 n8n 云端。
  background: >-
    工作流由实例执行：自托管实例常开即可承载定时与 webhook 触发；官方给 Cron/队列机制。
    「电脑关了还能跑」取决于你把实例跑在哪——平台不替你保管关机后的执行。
  tools: >-
    核心是集成节点生态（官方称数百种集成，未逐条核验）；MCP 在官方许可 FAQ 里被点名
    （「通过 n8n 编辑器、你的界面、n8n API、MCP 或 AI agent 配置工作流」需商业授权场景之一）
    ——MCP 是官方支持的使用面。
  context: >-
    工作流内的数据变换与子流程传递是主轴；跨工作流的持久记忆机制未逐条核验
    （未知就说未知）。凭据与执行数据按实例持久保存。
  permissions: >-
    自托管权限边界=你的实例边界；Community 版工作流/凭据仅创建者与实例所有者可访问
    （共享属付费档）。企业 SSO/RBAC 属 Business/Enterprise  licence key 解锁。
    许可边界比权限边界更关键：SUL 三条限制见 license 字段。
  fit: >-
    适合：跨系统自动化为主轴、要把 AI 节点嵌进既有流程、要自托管掌控数据。
    不适合：要把 n8n 包进自己产品卖给客户（需商业协议）；要纯代码编排（去看 framework）；
    要开箱多租户 SaaS（Community 无共享）。

pitfalls:
  - 把「源码可得」当「开源」——SUL 是 fair-code，内部业务用途之外有硬限制
  - 把 n8n 托管给客户收费——SUL 明确不允许，需 n8n Embed 商业协议
  - 以为 Community 能团队协作共享工作流——共享/项目/SSO 属付费档
  - 把 AI 能力当独立产品——n8n 主轴是自动化，AI 是节点之一

tags: [低代码, 工作流, fair-code, 自托管, MCP, 集成生态]
related: [openai-agents-sdk]

sources:
  - label: n8n · Community license 官方页（SUL 三条限制、.ee. 文件例外、与旧 Apache+Commons Clause 沿革）
    url: https://docs.n8n.io/n8n-community-license
    kind: docs
  - label: n8n 帮助中心 · Which license do I need（内部业务用途判例、MCP 被点名、客户不能开编辑器）
    url: https://support.n8n.io/article/can-i-use-your-license-for-my-use-case
    kind: docs
  - label: n8n-io/n8n · 仓库（208,219★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/n8n-io/n8n
    kind: repo
  - label: n8n · Release notes（版本迭代记录入口）
    url: https://docs.n8n.io/release-notes/
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: n8n GmbH（柏林）。
  origin_note_en: n8n GmbH (Berlin).
  direct: yes
  direct_note: docs.n8n.io / support.n8n.io 直连实测 200（2026-10-21）。
  direct_note_en: docs.n8n.io / support.n8n.io measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**n8n 是「自动化优先」的低代码工作流平台**——AI 是它众多节点里的一类，不是它的身份。
它最容易被误读的地方是许可：源码公开，但它是 **fair-code（Sustainable Use License）**，不是 OSI 开源。

## 许可是它最该先读的一页

官方 Community license 页给 SUL 三条限制（要点转述）：只能用于**自有内部业务或非商业个人用途**；
分发必须**免费且非商业**；不得移除许可与版权声明。文件名含 `.ee.` 的部分归 Enterprise License。

官方帮助中心进一步给了判例式口径：你在自己实例上替客户跑工作流、客户只拿结果——允许；
客户能进编辑器或经你的界面/API/MCP/AI agent 配置工作流——需要商业协议（n8n Embed）。

## 适合与不适合

适合：跨系统自动化是主轴、要把 AI 嵌进既有流程、要自托管掌控数据与凭据。
不适合：把 n8n 包进产品卖给客户（商业协议线）；纯代码编排（去 [OpenAI Agents SDK](../../framework/products/openai-agents-sdk.md) 等 framework 大类）；
开箱团队共享（Community 版工作流仅创建者可见）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- AI 节点覆盖的 LLM provider 全清单（官方 nodes 文档未逐条核验）
- 跨工作流的持久记忆机制（未核验到官方文档）
- 官方「数百种集成」的确切数量（未逐条核验）

## 相关条目

- [OpenAI Agents SDK](../../framework/products/openai-agents-sdk.md) — 代码优先 vs 画布优先对照：同一个「让 AI 调工具干活」，一边写代码一边拖节点。
