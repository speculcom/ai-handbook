---
id: autogpt
form: web
name: AutoGPT（现 Experts AI 团队平台）
nameEn: AutoGPT (now the Experts AI-team platform)
vendor: AutoGPT（Determinist Ltd 运营）
homepage: https://agpt.co
license: 双许可分区（LICENSE 当日直抓在册）：autogpt_platform 目录内 = Polyform Shield License；
  目录外（classic 自主 agent 线/Forge/AG Benchmark 等）= MIT。GitHub API 当日核验 license=NOASSERTION
  （正因双许可分区）。
licenseEn: Two-zone licensing (LICENSE direct-fetched same day): everything inside autogpt_platform = Polyform Shield
  License; everything outside (the classic autonomous-agent line, Forge, AG Benchmark, etc.) = MIT. GitHub API verified
  same day: license=NOASSERTION (precisely because of the split).

axes:
  model_access: >-
    平台按任务接入各家模型（现役 Experts 线的模型选择面未逐条核验）；classic 自主 agent 线
    历史上以 OpenAI 系为主，现役默认未核验。
  runtime: >-
    双形态：托管平台（隐私政策当日在册：「The AutoGPT Platform at platform.agpt.co」）+
    开源自托管（导航 GitHub「Explore the code and self-host」在册；仓当日推送 2026-10-30）。
  local_files: >-
    自托管形态数据在本机（代码与部署自管）；托管版数据在 Determinist Ltd 云端
    （隐私政策自任 data controller，当日在册）。
  background: >-
    现役产品是「AI 专家团队」：按职位分工的 Experts（AI SDR/SEO writer/LinkedIn posts/执行助理）
    由 Otto 协调（首页当日在册）——多步异步执行是产品主轴；排队与失败恢复细节未逐条核验。
  tools: >-
    Integrations 页在册（Apps and tools your experts can use）；平台 blocks/工作流面在文档与仓在册；
    具体连接器清单未逐条核验。
  context: >-
    Experts 的任务上下文与协调面（Otto）是产品核心；跨会话持久记忆机制未核验到官方声明，按未知处理。
  permissions: >-
    托管版主体 Determinist Ltd trading as "AutoGPT"（英格兰及威尔士注册，条款与隐私政策当日在册）；
    subprocessors 页在册；训练用途开关路径未逐条核验。
  fit: >-
    适合：多步异步的「AI 团队」委托式工作（内容/销售/研究）、要开源自托管（平台 Polyform Shield+
    classic MIT 分区）。
    不适合：要确定性画布工作流（自主 agent 血统）、要大陆直连备案入口、要宽松无限制的平台许可
    （平台区是 Polyform Shield 非 MIT）。

pitfalls:
  - **条款主体是 Determinist Ltd trading as "AutoGPT"（英格兰及威尔士）**——GitHub org 名 Significant-Gravitas 不是签约主体，引用主体按条款原文
  - **许可按目录分区**：autogpt_platform 内 Polyform Shield、外 MIT——「AutoGPT 是 MIT」只对 classic 线成立；仓 license=NOASSERTION 正是双许可的结果
  - **产品线已两度转向**：自主 agent 实验（classic）→低代码平台→现役 Experts AI 团队（首页当日招牌）——按任一旧印象建档都会整体错位；classic 线仍在仓（classic/ 目录）但已非主打

tags: [agent平台, 自主agent, AI团队, 低代码, 开源, MIT, 自托管, 商业]
related: [dify, relevance-ai, langchain]

sources:
  - label: AutoGPT · 官网（Your team of AI Experts/Experts 分工/Otto 协调，2026-10-30 直抓 200）
    url: https://agpt.co
    kind: official
  - label: AutoGPT · Platform Terms of Use（主体 Determinist Ltd，2026-10-30 直抓 200）
    url: https://agpt.co/legal/platform-terms-of-use/
    kind: official
  - label: AutoGPT · Platform Privacy Policy（platform.agpt.co/Determinist Ltd 自任 controller，版本 2025-04-18，2026-10-30 直抓 200）
    url: https://agpt.co/legal/platform-privacy-policy/
    kind: official
  - label: Significant-Gravitas/AutoGPT · 官方仓（GitHub API 当日核验 ★187,826/pushed 2026-10-30；LICENSE 双许可分区当日直抓）
    url: https://github.com/Significant-Gravitas/AutoGPT
    kind: repo
  - label: AutoGPT · GitHub Releases（autogpt-platform-beta-v0.10.0 2026-10-27，作变更记录）
    url: https://github.com/Significant-Gravitas/AutoGPT/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Determinist Ltd（英格兰及威尔士注册，trading as "AutoGPT"；条款与隐私政策当日直抓在册）。
  origin_note_en: Determinist Ltd (registered in England and Wales, trading as "AutoGPT"; on record in the terms and privacy policy direct-fetched same day).
  direct: yes
  direct_note: agpt.co、/legal/* 条款页与 GitHub 仓大陆直连实测 200（2026-10-30）；platform.agpt.co 托管入口未单独实测。
  direct_note_en: agpt.co, the /legal/* terms pages and the GitHub repo measured 200 direct from mainland (2026-10-30); the platform.agpt.co hosted entry was not separately measured.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与第十六批批次清单，未见 AutoGPT/Determinist 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and the 16th batch list searched 2026-10-30; no AutoGPT/Determinist entry); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**AutoGPT 现役形态是「你的 AI 专家团队」**（首页当日招牌：Your team of AI Experts——按职位分工的
AI SDR/SEO writer/LinkedIn 写手/执行助理，由 Otto 协调）：托管平台 platform.agpt.co + 开源自托管双路径，
仓 ★187,826 当日核验；从 2023 自主 agent 实验到低代码平台再到 Experts，产品线两度转向，
classic 线仍在仓但已非主打——按任何一代旧印象建档都会错位。

## 适合与不适合

适合：多步异步的委托式「AI 团队」工作（内容/销售/研究）、要开源自托管。
不适合：要确定性画布工作流、要大陆直连备案入口、要平台区宽松许可（Polyform Shield）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（agent 平台不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Experts 的任务成功率与人工接管面**（委托式 agent 的可靠性核心面，未在册）
- **自托管平台与托管版的功能差**（自托管路径在册，两形态差异未在册）
- **Otto 协调层的失败恢复与成本上限控制**（多 agent 协作的失控风险面，未在册）

## 未知项清单

- 现役 Experts 线接入的模型清单（未逐条核验）
- 跨会话持久记忆机制（未核验到官方声明）
- 训练用途开关路径与默认态（未逐条核验）
- platform.agpt.co 大陆直连可达性（未单独实测）

## 相关条目

- [Dify](./dify.md) — 画布式 agent 平台对照：Dify 确定性编排；AutoGPT 自主/委托式血统。
- [Relevance AI](./relevance-ai.md) — 同为「AI 团队/员工」包装：Relevance 无代码工具集向；AutoGPT 开源+自主 agent 血统。
- [LangChain](../../framework/products/langchain.md) — 代码优先对照：要源码级控制归 framework，要托管团队归本类。
