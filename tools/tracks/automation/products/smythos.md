---
id: smythos
form: web
name: SmythOS
nameEn: SmythOS
vendor: SmythOS
homepage: https://smythos.com
license: SRE 运行时仓 MIT（GitHub API 当日核验 license=MIT）；smythos-studio 仓 MIT；
  smyth-docs 仓 license=NOASSERTION；商业托管服务条款未逐条核验。
licenseEn: The SRE runtime repo is MIT (GitHub API verified same day); smythos-studio is MIT; smyth-docs is
  NOASSERTION; commercial hosted-service terms not verified item by item.

axes:
  model_access: >-
    SRE 运行时对接各家模型（仓描述当日在册：cloud-native runtime for agentic AI）；
    sre-models-pub 仓在册（模型配置发布面）；现役可用模型清单未逐条核验。
  runtime: >-
    开源自托管是现役主形态：官网 smythos.com 当日 302 重定向到 github.com/smythos/sre（官网让位于仓）；
    SRE 仓描述明言 local/cloud/edge 三态运行；托管 Studio 服务面未逐条核验。
  local_files: >-
    自托管运行时数据在本机/自有部署（local 态在仓描述在册）；托管形态数据面未逐条核验。
  background: >-
    agent 运行时（build/run/manage）是仓描述主轴；后台常驻与调度机制细节未逐条核验——
    且仓推送停在 2026-04-03（GitHub API 当日核验），现役维护强度存疑。
  tools: >-
    smyth-docker-mcp 仓在册（MCP 方向）；skills 仓在册；具体工具/连接器清单未逐条核验。
  context: >-
    运行时的 agent 状态管理在仓描述在册（manage intelligent agents）；跨会话记忆机制细节未逐条核验。
  permissions: >-
    MIT 运行时（许可宽松）；商业服务条款未逐条核验；训练用途开关路径未逐条核验。
  fit: >-
    适合：要 MIT 许可的 agent 运行时自托管（local/cloud/edge）、读源码评估 agent 编排设计。
    不适合：要活跃产品与托管服务（官网已让位于仓、推送停 2026-04）、要企业支持叙事、
    要大陆直连备案入口。

pitfalls:
  - **官网让位于仓**：smythos.com 当日 302→github.com/smythos/sre——按「有官网=有活跃产品」的直觉建档会错位；现役真相面是 GitHub org
  - **收缩信号在册**：SRE/studio/docs 三仓推送都停在 2026-04-03（GitHub API 当日核验，未 archived）——按「活跃项目」评估维护/安全响应有风险，本档案按 maintenance 口径写
  - 早期 SmythOS 主打「无代码 agent 构建平台+托管服务」——现官网重定向后该定位不再自证，历史定位≠现役形态

tags: [agent平台, 开源MIT, 自托管, 运行时, 收缩中]
related: [langgraph, crewai, dify]

sources:
  - label: SmythOS · 官网（当日 302 重定向至 GitHub SRE 仓，重定向链当日核验）
    url: https://smythos.com
    kind: official
  - label: SmythOS/sre · 运行时仓（MIT，GitHub API 当日核验 ★1,304/pushed 2026-04-03，未 archived）
    url: https://github.com/smythos/sre
    kind: repo
  - label: SmythOS org · 仓库列表（smythos-studio MIT ★656/smyth-docs NOASSERTION/smyth-docker-mcp MIT，推送集中于 2026-04 停摆，GitHub API 当日核验）
    url: https://github.com/orgs/smythos/repositories
    kind: repo
  - label: SmythOS/sre · commits 页（最后推送 2026-04-03，作变更记录——仓无正式 releases）
    url: https://github.com/smythos/sre/commits
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: SmythOS（美国公司背景；官网重定向后主体信息未在册，按 GitHub org 为真相面）。
  origin_note_en: SmythOS (US company background; with the site redirecting, entity info is not on record — the GitHub org is the truth surface).
  direct: unknown
  direct_note: smythos.com 直连实测为 302→GitHub（GitHub 仓直连 200）——重定向目标可达但产品官网已不存在，不下「直连可用」结论。
  direct_note_en: smythos.com measured a 302→GitHub direct (the GitHub repo measures 200 direct) — the redirect target is reachable but the product site no longer exists; no "direct access works" conclusion is drawn.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与第十六批批次清单，未见 SmythOS 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and the 16th batch list searched 2026-10-30; no SmythOS entry); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**SmythOS 现役真相面是 GitHub 上的开源 agent 运行时 SRE**（仓描述当日在册：cloud-native runtime for agentic AI，
local/cloud/edge 三态）：官网 smythos.com 已 302 重定向到 SRE 仓——早期「无代码 agent 平台+托管服务」的定位
不再自证；SRE/studio/docs 三仓推送停在 2026-04-03（未 archived），本站按 maintenance 口径写。

## 适合与不适合

适合：要 MIT 许可的 agent 运行时自托管、读源码评估 agent 编排设计。
不适合：要活跃产品与托管服务、要企业支持叙事、要大陆直连备案入口。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（agent 平台不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **SRE 在停更窗口后能否随新版依赖构建**（推送停 2026-04，依赖漂移风险未核验）
- **托管 Studio 服务是否仍在运营**（studio 仓 MIT 但服务面未在册）
- **local/cloud/edge 三态的实际差异与文档完整度**（仓描述在册，细节未核验）

## 未知项清单

- 托管服务现役状态（未核验）
- 商业主体与条款（官网重定向后未在册）
- 停更原因（收缩/转型/被收购均未在册——不下结论）
- 现役可用模型清单（未逐条核验）

## 相关条目

- [LangGraph](../../framework/products/langgraph.md) — 代码优先 agent 运行时对照：LangGraph 活跃维护；SmythOS 同类定位但收缩中。
- [CrewAI](../../framework/products/crewai.md) — 多 agent 编排对照：CrewAI 框架活跃；SmythOS 运行时形态停摆风险在册。
- [Dify](./dify.md) — 平台形态对照：Dify 活跃开源平台；SmythOS 的无代码平台定位已让位于运行时仓。
