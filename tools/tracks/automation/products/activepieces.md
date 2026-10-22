---
id: activepieces
form: web
name: Activepieces
vendor: Activepieces Inc.
homepage: https://www.activepieces.com
license: 混合许可（官方 LICENSE 直抓核验 2026-10-21）：ee 目录归商业许可；其余内容 MIT Expat；第三方组件保留原许可。
licenseEn: Mixed license (official LICENSE, direct-fetched 2026-10-21): content under ee/ directories falls under the commercial license; everything else is MIT Expat; third-party components keep their original licenses.

axes:
  model_access: >-
    AI pieces 经凭据接各家模型（OpenAI 等）；具体清单未逐条核验。自托管时凭据在你实例上。
  runtime: >-
    开源自托管（Docker）+ 官方云两条线；GitHub 25,150★、最近推送 2026-10-21（API 核验，活跃）。
  local_files: >-
    自托管实例数据落自有环境；pieces 生态的凭据与执行数据在实例内。
  background: >-
    自托管实例常开即承载定时/webhook；官方给 queue worker 模式（细节未逐条核验）。
  tools: >-
    pieces（集成）生态 + 社区贡献机制是核心；MCP 支持状态未逐条核验。
  context: >-
    flow 内步骤间的数据传递与变量引用是官方上下文主轴；跨流程的共享记忆机制未逐条核验
    （未知就说未知）。实例内的执行历史按 flow 持久保存。
  permissions: >-
    社区版基础角色；SSO/项目等属 ee 目录（商业许可区）——功能分界即许可分界。
  fit: >-
    适合：要 MIT 主体许可的自托管自动化、要可魔改的低代码。
    不适合：要企业功能开箱（在 ee 商业线）；要连接器生态与 Zapier 同量级（体量小得多）。

pitfalls:
  - 把「MIT 主体」读成全仓 MIT——ee/ 目录是商业许可区
  - 与 Zapier/Make 比连接器数量——体量差距大，先核自己要的集成有没有
  - 把云版与自托管版功能混同——SSO 等在 ee 线

tags: [开源, MIT混合, 自托管, 低代码, 工作流]
related: [openai-agents-sdk]

sources:
  - label: Activepieces/Activepieces · LICENSE（MIT Expat + ee 商业区，2026-10-21 直抓核验）
    url: https://github.com/Activepieces/Activepieces/blob/main/LICENSE
    kind: docs
  - label: Activepieces/Activepieces · 仓库（25,150★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/Activepieces/Activepieces
    kind: repo
  - label: Activepieces · 官方文档
    url: https://www.activepieces.com/docs
    kind: docs
  - label: Activepieces/Activepieces · Releases（changelog）
    url: https://github.com/Activepieces/Activepieces/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Activepieces Inc.（美国）。
  origin_note_en: Activepieces Inc. (US).
  direct: yes
  direct_note: activepieces.com/docs 直连实测 200（2026-10-21）。
  direct_note_en: activepieces.com/docs measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Activepieces 是开源低代码自动化的「许可最干净」一档**：主体 MIT Expat，只有 ee/ 目录是商业许可区——
比 n8n 的 SUL 宽松，代价是连接器体量小得多。自托管 + 官方云两条线。

## 适合与不适合

适合：要 MIT 级许可自由度、要自托管、要能读源码魔改。
不适合：要海量现成连接器（先核你要的 piece 存不存在）；要企业功能开箱（SSO 在 ee 线）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（工具调用与凭据边界一节可借用；工作流平台专用协议本站未立）。

## 未知项清单

- pieces 生态的确切数量（未逐条核验）
- MCP 支持状态（未核验到官方文档）
- queue worker 模式在社区版的完整边界

## 相关条目

- [n8n](./n8n.md) — 许可对照：同为自托管自动化，SUL（fair-code）vs MIT+ee 混合是核心分野。
