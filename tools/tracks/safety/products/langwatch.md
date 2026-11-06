---
id: langwatch
form: cloud
name: LangWatch
vendor: LangWatch
homepage: https://langwatch.ai/docs/
license: Apache-2.0（官方文档页 2026-11-06 自陈「You can self-host the Apache 2.0 core」；托管版许可范围未逐条核验）。
licenseEn: Apache-2.0 for the self-hostable core, per the docs page checked 2026-11-06; licence scope of the hosted product not verified item by item.

axes:
  model_access: >-
    官方文档把它定位为 LLMOps 平台，追踪「每一次模型调用、工具使用与用户交互」；被测模型由你接入，平台不自带模型。具体兼容清单当日未逐条核到。
  runtime: >-
    两条运行位置：官方托管，或自托管开源核心（文档明写 Apache-2.0 core 可自托管）。托管版与自托管版的功能差异当日未逐条核到。
  local_files: >-
    自托管时数据在你自己的存储里；用托管版时追踪数据离开本机——留存位置与删除方式需按当日条款另行确认，本档案未核到具体政策。
  background: >-
    追踪与评测以在线服务形式持续运行；离线批处理与定时任务的能力面未逐条核验。
  tools: >-
    官方列出的能力包含 tracing、evaluations、agent testing、prompt management；能否接入自定义评判器与外部工具，当日正文未逐条说明。
  context: >-
    上下文由被测应用决定；平台侧对 trace 长度、采样与保留窗口的限制未逐条核验。
  permissions: >-
    托管版有账号与团队权限体系（具体分级未核到）；自托管版权限等同你所部署环境的访问控制。
  fit: >-
    适合：要把线上调用、评测与提示版本放在一处看，且希望保留自托管退路。
    不适合：只想要一次性基准分数；或不能接受追踪数据离开自己环境的场景（那需要走自托管并自行核实功能边界）。

pitfalls:
  - 把「能追踪」当成「能判定质量」——评测判法与样本仍要你自己定义
  - 只看开源核心可自托管，就假设托管版与自托管版功能一致
  - 允许平台记录完整输入输出前，没先确认里面是否含客户数据与密钥

tags: [LLMOps, 追踪, 评测, 提示管理, 可自托管, 开源核心]
related: [helicone, openai-evals, inspect-ai]

sources:
  - label: LangWatch · 官方文档（tracing / evaluations / agent testing / prompt management，自托管说明）
    url: https://langwatch.ai/docs/
    kind: docs
  - label: LangWatch · 更新记录
    url: https://langwatch.ai/changelog
    kind: changelog

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 官方文档与更新记录为境外站点，当日直抓可达（docs 由 docs.langwatch.ai 跳转至 langwatch.ai/docs/）。
  origin_note_en: Docs and changelog are hosted outside the mainland; both were reachable on the check date (docs.langwatch.ai redirects to langwatch.ai/docs/).
  direct: yes
  direct_note: langwatch.ai/docs/ 与 langwatch.ai/changelog 直抓 200（2026-11-06）。
  direct_note_en: langwatch.ai/docs/ and langwatch.ai/changelog returned 200 direct on 2026-11-06.
  filing: unknown
  filing_note: 备案与境内服务口径当日未核到；页面可达不等于境内可用。
  filing_note_en: Filing and in-country availability not verified on the check date; reachability is not availability.
  verified: 2026-11-06
---

## 一句话定位

**LangWatch 是把线上调用、评测与提示版本收在一处的 LLMOps 平台**：官方列出的能力是追踪每一次模型调用、工具使用与用户交互，并在其上跑评测与代理测试。开源核心可自托管（文档写为 Apache-2.0），另提供托管版。

## 适合与不适合

适合：需要把 trace、评测与提示变更放在一起复盘，同时希望保留自托管退路的团队。
不适合：只想要一个现成基准分数；或对「调用记录是否离开自己环境」有硬性限制却打算用托管版的场景。

## 实测记录

本档未做拦截率、评测一致性或性能测试；能力描述取自当日可达的官方文档与更新记录原文，本站不重复其数字，也不据此评价同类产品。

## 未知项清单

- 托管版与自托管版的功能差异清单
- 托管版的留存位置、删除时限与训练用途条款
- 支持的模型与框架接入全清单
- 自定义评判器、外部工具接入的确切边界
- trace 的长度上限、采样策略与保留窗口
- 托管版账号与团队权限分级

## 相关条目

- [Helicone](./helicone.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。
- [OpenAI Evals](./openai-evals.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。
- [Inspect](./inspect-ai.md) — 同属「评测与观测」线：本档案只写自己在册的官方口径，对照请看那份。

## 第一次怎么用

1. 先决定运行位置：能接受托管版就核对留存与删除条款；不能接受就按文档自托管开源核心，并逐项确认你需要的是否在核心内。
2. 接入时只送必要字段：把客户姓名、订单号、密钥这类内容在进入 trace 前处理掉，事后清理比事前控制难。
3. 评测从你自己的样本集开始：先写判法（哪些能机器判、哪些必须人判），再挂到线上 trace 上，别用平台默认指标替代验收标准。
4. 每次改动记录三件东西：提示版本、模型标识、评测样本集版本；缺一件，下一轮的对比就失去解释力。
