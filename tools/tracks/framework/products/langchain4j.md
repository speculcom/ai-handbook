---
id: langchain4j
form: harness
family: orchestration
# 支持哪些模型 provider（本站第一决策点）
providers:
  - Java 侧统一接口接多家 LLM；官方文档列出主流商业与开源模型
  - 向量库为独立依赖，不绑定单一供应商
  - 模型接入与向量库选择都是应用侧配置，框架不替用户选
name: LangChain4j
nameEn: LangChain4j
vendor: LangChain4j 社区
homepage: https://docs.langchain4j.dev/
license: Apache-2.0（以仓库 LICENSE 为准，本站未逐条核验依赖许可）。
licenseEn: Apache-2.0 (follow the repository LICENSE; dependency licences not verified line by line here).

axes:
  model_access: >-
    Java 侧统一接口接多家 LLM 与向量库；官方文档列出主流商业与开源模型。
    具体当前支持列表以官方文档为准，本站未逐条清点。
  runtime: >-
    运行在你的 JVM 应用里；官方提供 Quarkus、Spring Boot 与 Helidon 集成，
    可把 LLM 调用嵌进既有 Java 服务。
  local_files: >-
    文件与向量库由应用侧管理；框架本身不托管数据，索引落盘位置由所选向量库决定，
    检索链路不内置。
  background: >-
    库形态，不内建任务队列；长任务由应用自己的线程池或消息队列实现，
    中断后的恢复语义也由应用负责。
  tools: >-
    支持工具调用（让 LLM 调 Java 方法）与 MCP 接入；细节以官方文档为准。
  context: >-
    对话记忆与上下文由应用配置；框架提供 memory 抽象，持久化需自己接存储。
  permissions: >-
    JVM 进程内运行，权限由应用与部署环境决定；无内置多租户隔离，
    鉴权、配额与数据访问边界需应用层自己实现。
  fit: >-
    适合：Java/Kotlin 团队、已有 Spring/Quarkus 服务、要把 LLM 与向量检索接进业务代码。
    不适合：Python/TS 团队、要成品 agent、要开箱可视化编排。

pitfalls:
  - 把 LangChain4j 当成 Python LangChain 的端口——它是 Java 生态的独立实现
  - 以为框架自带向量库——向量库是独立依赖，要自己选
  - 忽略 JVM 内存与线程模型——本地大模型不适合塞进同一个 JVM

tags: [开源, Java, JVM, LLM框架, 工具调用]
related: [spring-ai, langchain, vllm]

sources:
  - label: LangChain4j · 官方文档（Java 集成、Quarkus/Spring Boot/Helidon）
    url: https://docs.langchain4j.dev/
    kind: docs
  - label: LangChain4j · GitHub 仓库
    url: https://github.com/langchain4j/langchain4j
    kind: repo

  - label: LangChain4j · Releases（官方 changelog）
    url: https://github.com/langchain4j/langchain4j/releases
    kind: changelog

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: LangChain4j 社区（开源）。
  origin_note_en: LangChain4j community (open source).
  direct: yes
  direct_note: docs.langchain4j.dev 大陆直连未核验；Maven Central 可经镜像获取。
  direct_note_en: Direct reachability from mainland not verified; Maven Central is available through mirrors.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-11-03 检索）；开源库未面向大陆公众提供服务，备案不适用。
  filing_note_en: Not in the CAC public registry (searched 2026-11-03); the open-source library does not serve the mainland public, so filing does not apply.
  verified: 2026-11-03
---

## 一句话定位

LangChain4j 是 Java 生态的 LLM 应用框架：统一模型与向量库接口，支持工具调用与 MCP，
可嵌进 Quarkus、Spring Boot、Helidon 服务。

跨大类对照：[vLLM](../runner/vllm.html)。

## 适合与不适合

适合：Java/Kotlin 团队、已有 Spring/Quarkus 服务、要把 LLM 与检索接进业务代码。
不适合：Python/TS 团队、要成品 agent、要可视化编排。

## 实测记录

本档未跑集成与性能实测；结论只覆盖 API 与官方文档披露的能力面。

## 未知项清单

- 当前支持的模型与向量库完整清单（未逐条清点）
- MCP 接入的官方支持细节
- 各版本与 Spring Boot/Quarkus 的兼容矩阵

## 相关条目

- [Spring AI](./spring-ai.md) — Spring 官方路线，与 LangChain4j 的框架路线对照
- [LangChain](./langchain.md) — Python 侧同类框架，接口与抽象不同
