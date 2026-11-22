---
id: helicone
form: cloud
name: Helicone
vendor: Helicone
homepage: https://docs.helicone.ai
license: Apache-2.0——官方开源页在 2026-11-21 直读明确写「licensed under the Apache License 2.0」；GitHub 仓库 README 同日标注 Apache-2.0。
licenseEn: Apache-2.0 — the official open-source page read on 2026-11-21 states "licensed under the Apache License 2.0"; the GitHub repository README also marks Apache-2.0 on the same date.

axes:
  model_access: >-
    官方 AI Gateway 文档写明它是开源 Rust 路由。用单一 OpenAI 兼容接口接 100+ 语言模型。provider 密钥由网关集中保管。云端与自托管两种形态都列在册。

    它不是模型提供方。
  runtime: >-
    云端托管版由平台执行。官方列 99.9% SLA 与全球边缘网络。自托管版是单个 Rust 二进制。可跑 Docker / Kubernetes / bare-metal / sidecar。

    完整观测栈另可用 Docker Compose 或 Helm 部署。
  local_files: >-
    **依据：** 云端形态下请求与日志落在 Helicone 侧；自托管形态把 Web、Jawn、Supabase、ClickHouse、Minio 跑在你自己的基础设施里， 日志与对象存储由你控制。网关本身不跑本地模型。
  background: >-
    网关位于请求路径，逐次转发与回退。官方没有把持久任务队列列为产品面，后台作业需由调用方编排。观测日志写入是平台或自托管栈的一部分。
  tools: >-
    **依据：** 官方列 OpenAI SDK、Anthropic、LangChain、Gemini、Vercel AI SDK 等接入；网关提供统一 OpenAI 语法、缓存、限流、 fallback 与内置 tracing。MCP 服务端不在 AI Gateway 文档的已列能力面。
  context: >-
    网关不维护对话记忆。上下文就是每次请求体，长度由上游模型决定。观测面保存 trace/session 供排查。但文档没有把历史 trace 回注为模型上下文。
  permissions: >-
    云端用账户内集中密钥与花费控制。自托管把密钥与数据权限交给你的部署环境。团队分级、审计日志与导出细项官方文档未逐条单列。
  fit: >-
    适合：多家模型统一接入、需要 fallback / 缓存 / 限流 / 观测，或数据必须留在自有基础设施而选择自托管网关的团队。不适合：想要托管模型能力本身。

    或不愿维护 ClickHouse / Minio / Supabase 等自托管依赖的团队。
pitfalls:
  - 把「统一入口」当成「统一能力」——各家模型的参数与行为差异不会因网关消失
  - 只看观测面板方便，没确认请求体里带了什么敏感内容就送出去
  - 把平台侧托管密钥当成自己不需要做密钥轮换与最小权限
  - 选自托管只看到「一个二进制」，忽略完整观测栈还要维护数据库与对象存储

tags: [AI 网关, 观测, 日志, 用量, 多家模型]
related: [langwatch, litellm]

sources:
  - label: Helicone · Open Source（Apache License 2.0、自托管与仓库入口；2026-11-21 直读 200）
    url: https://docs.helicone.ai/references/open-source
    kind: docs
  - label: Helicone · AI Gateway Introduction（Rust 路由、100+ 模型、云端/自托管、Docker/Kubernetes/bare-metal；2026-11-21 直读 200）
    url: https://docs.helicone.ai/ai-gateway/introduction
    kind: docs
  - label: Helicone · 官方文档（AI Gateway · automatic logging, observability and fallbacks；100+ models；2026-11-06 直读 200）
    url: https://docs.helicone.ai
    kind: docs
  - label: Helicone · 更新记录（2026-11-06 直读 200）
    url: https://www.helicone.ai/changelog
    kind: changelog

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: 文档与更新记录均为境外站点，2026-11-06 与 2026-11-21 两次直读可达。
  origin_note_en: Docs and changelog are hosted outside the mainland; both were reachable on the 2026-11-06 and 2026-11-21 checks.
  direct: yes
  direct_note: docs.helicone.ai 与 www.helicone.ai/changelog 直抓 200（2026-11-06）；Open Source 与 AI Gateway Introduction 两页 2026-11-21 直读 200。
  direct_note_en: docs.helicone.ai and www.helicone.ai/changelog returned 200 direct on 2026-11-06; the Open Source and AI Gateway Introduction pages returned 200 on 2026-11-21.
  filing: unknown
  filing_note: 备案与境内服务口径未核到；页面可达不等于境内可用。
  filing_note_en: Filing and in-country availability not verified; reachability is not availability.
  verified: 2026-11-21
---

## 一句话定位

**Helicone 是开源的 AI Gateway 与 LLM 观测平台**：官方把它写成 Rust 路由。

单一 OpenAI 兼容接口接 100+ 模型带缓存、限流、fallback 与 tracing。可选云端托管，也可把网关二进制或整套观测栈部署在自己的基础设施里。

它解决的是「调用集中管理 + 观测」，不是「模型质量判断」。

## 适合与不适合

适合：需要一家以上模型接入、想把日志/用量/失败回退收在一处，且接受云端形态。

或数据必须留在自有环境、愿意维护ClickHouse / Minio / Supabase 而选自托管。不适合：把网关当成模型能力本身。不愿承担自托管依赖运维的团队。

## 实测记录

**依据：** 未做延迟、可用性或回退生效条件的实测；「100+ 模型」「99.9% SLA」「数秒内出现」等表述是官方页原文，本站不重复其数字作为评价依据，也不据此评价同类产品。

许可与自托管口径取自官方 Open Source 页与 AI Gateway Introduction 页。

## 未知项清单

- 云端请求/响应日志的具体留存时长与删除界面（官方文档未逐条展开）
- 数据是否用于训练或产品改进
- 团队权限分级、审计日志与导出细项
- 计费口径与限额（价格数字不进档案）
- 自托管栈的容量规划与升级路径（按部署文档自行核对）

## 相关条目

- [LangWatch](./langwatch.md) — 同属「网关与访问控制」线：本档案只写自己在册的官方口径，对照请看那份。
- [LiteLLM 网关（Proxy / AI Gateway）](./litellm.md) — 同属「网关与访问控制」线：本档案只写自己在册的官方口径，对照请看那份。

## 第一次怎么用

1. 先过一遍你要送出去的数据：客户姓名、订单号、密钥、源码片段。任一项不能离开自己环境，就选自托管而不是云端。
2. 接入时把「谁在调用哪个模型、失败会怎样」写清楚：网关只保证集中，不保证行为一致；回退条件与超时阈值要显式设定并演练一次。
3. 密钥仍在你的账上：平台代管不等于免轮换，按你的离职与泄露预案设定轮换周期。
4. 选自托管时先按官方 Docker Compose / Helm 文档核对 ClickHouse、Minio、Supabase 的备份与升级路径，再上线。
5. 上线后核对日志范围：确认记录里没混进不该长期留存的内容，再决定保留多久、怎么导出。
