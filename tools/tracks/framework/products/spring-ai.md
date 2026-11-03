---
id: spring-ai
form: harness
family: orchestration
# 支持哪些模型 provider（本站第一决策点）
providers:
  - 可移植 Model API 接多家模型供应商；官方文档列出 ChatClient 与模型 API
  - 向量库以 Spring Bean 方式注入，支持多家实现
  - provider 选择与应用配置分离，不绑定单一厂商
name: Spring AI
nameEn: Spring AI
vendor: Spring（VMware/Broadcom）
homepage: https://docs.spring.io/spring-ai/reference/
license: Apache-2.0（以仓库 LICENSE 为准，本站未逐条核验依赖许可）。
licenseEn: Apache-2.0 (follow the repository LICENSE; dependency licences not verified line by line here).

axes:
  model_access: >-
    可移植的 Model API：用统一接口接多家模型供应商；官方文档列出 ChatClient 与模型 API。
    当前支持列表以官方文档为准，本站未逐条清点。
  runtime: >-
    运行在 Spring Boot 应用内：官方提供 starters 与 auto-configuration，
    模型与向量库以 Spring Bean 方式注入。
  local_files: >-
    文档摄取（ETL）与向量库由应用配置；框架本身不托管数据，
    索引落盘位置与检索链路由所选向量库决定。
  background: >-
    库形态，不内建任务队列；异步与长任务由 Spring 侧自行编排。
  tools: >-
    支持工具调用与 MCP：官方文档写明可消费 MCP server，也可把 Spring 服务暴露给 AI 生态。
  context: >-
    对话记忆由 ChatClient 与 memory 配置管理；持久化需自己接存储。
  permissions: >-
    Spring Security 体系内运行；权限由应用配置，无内置多租户隔离。
  fit: >-
    适合：Spring Boot 团队、要把 AI 能力做成标准 Spring 组件、需要 MCP 与向量库集成。
    不适合：非 Java 团队、要成品 agent、要轻量脚本式调用。

pitfalls:
  - 把 Spring AI 当成 LangChain4j 的官方版——两者是不同项目，抽象与生态不同
  - 以为加了 starter 就自动配好模型——仍需 API key 与模型配置
  - 忽略 Spring 版本兼容——starters 与 Boot 版本要对齐

tags: [开源, Java, SpringBoot, MCP, 向量库]
related: [langchain4j, langchain, vllm]

sources:
  - label: Spring AI · 官方参考文档（Model API / ChatClient / MCP / ETL；2026-11-03 复核官方页）
    url: https://docs.spring.io/spring-ai/reference/
    kind: docs
  - label: Spring AI · 项目主页（Spring AI 2.0 定位）
    url: https://spring.io/projects/spring-ai/
    kind: official
  - label: Spring AI · GitHub 仓库
    url: https://github.com/spring-projects/spring-ai
    kind: repo

  - label: Spring AI · Releases（官方 changelog）
    url: https://github.com/spring-projects/spring-ai/releases
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Spring 项目（VMware/Broadcom 生态）。
  origin_note_en: Spring project (VMware/Broadcom ecosystem).
  direct: yes
  direct_note: docs.spring.io 大陆直连未核验；Maven Central 可经镜像获取。
  direct_note_en: Direct reachability from mainland not verified; Maven Central is available through mirrors.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；开源框架未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the open-source framework does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

Spring AI 把 AI 能力做成 Spring 组件：可移植 Model API、ChatClient、向量库与 MCP 集成，
用 Spring Boot 的 starter 和 auto-configuration 装配。

跨大类对照：[vLLM](../runner/vllm.html)。

## 适合与不适合

适合：Spring Boot 团队、要把 AI 做成标准 Bean、需要 MCP 与向量库集成。
不适合：非 Java 团队、要成品 agent、要轻量脚本调用。

## 实测记录

本档未跑集成与性能实测；结论只覆盖 API 与官方文档披露的能力面。

## 未知项清单

- 当前支持的模型与向量库完整清单（未逐条清点）
- MCP 双向集成的版本与限制
- Spring Boot 版本兼容矩阵

## 相关条目

- [LangChain4j](./langchain4j.md) — 另一条 Java 路线，抽象更偏 LangChain 风格
- [LangChain](./langchain.md) — Python 侧同类框架，对照读
