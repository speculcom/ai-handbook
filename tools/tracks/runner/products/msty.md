---
id: msty
form: local-app
name: Msty
vendor: Msty（CloudStack, LLC）
homepage: https://msty.ai
license: 闭源（专有许可；官网未公开开源许可）
licenseEn: Proprietary (closed-source; no open-source license published on the site)

axes:
  model_access: >-
    **混合面**——本地模型（GGUF 下载/管理，llama.cpp 系底座）+ 云端模型接入（OpenAI/Anthropic 等
    API key 接入）；产品矩阵四线：Studio（桌面主应用）/Go（移动端）/Nexus（企业私有 LLM 平台）/Stack（云端托管）。
  runtime: >-
    **桌面 GUI 应用**（Windows/macOS）+ 移动端 Go；本地推理走内置 llama.cpp 系底座。
    现役官网 msty.ai（msty.app 301→msty.ai，www.msty.app 直连 000——2026-10-31 三通道核验）；
    厂商实体 CloudStack, LLC（官网口径）。
  local_files: >-
    读写本机文件——本地模型文件、对话历史（本地存储是它主打的隐私口径）。
  background: >-
    桌面应用常驻；云端线（Stack/Nexus）涉云账户。混合架构：本地推理不依赖云，云模型接入需账户/key。
  tools: >-
    应用内 RAG/知识库（文档问答）、MCP 接入面（官网产品线口径）；不是给 agent 挂工具的面，是消费级/企业桌面应用。
  context: >-
    应用内对话历史持久化（本机存储）；知识库（RAG 文档库）跨会话复用。
    上下文长度随所选模型与配置变化（本地模型受 llama.cpp 系底座参数约束）。
  permissions: >-
    桌面应用权限=本机文件+网络；云线要账户与订阅。闭源——代码审计面不可得，隐私口径按官网自述。
  fit: >-
    适合：要「本地+云端一个桌面应用」的混合使用；企业私有 LLM（Nexus 线）。
    不适合：要开源可审计栈（闭源）；只要纯 CLI 服务化（vLLM/TGI 那条线）。

pitfalls:
  - 用旧域 msty.app——301→msty.ai（www.msty.app 直连 000）；现役域是 msty.ai（2026-10-31 核验）
  - 把四产品线混为一谈——Studio（桌面）/Go（移动）/Nexus（企业私有）/Stack（云托管）是不同产品，能力与计费面不同
  - 闭源当开源用——无公开源码许可；隐私/遥测口径只能按官网自述，不可代码核验

tags: [本地推理, 桌面应用, 混合, 闭源, RAG, 私有化]
related: [lm-studio, jan, ollama, chatgpt]

sources:
  - label: Msty · 官网（现役域 msty.ai 直连 200；产品矩阵 Studio/Go/Nexus/Stack；CloudStack, LLC）
    url: https://msty.ai
    kind: homepage
  - label: Msty · 文档站 changelog（docs.msty.app/getting-started/changelog；docs.msty.app 307→onboarding）
    url: https://docs.msty.app/getting-started/changelog
    kind: changelog
  - label: Msty · 文档站（onboarding/产品口径）
    url: https://docs.msty.app/getting-started/onboarding
    kind: docs

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Msty（CloudStack, LLC，美国厂商，官网口径）。
  origin_note_en: Msty (CloudStack, LLC, a US vendor per the official site).
  direct: yes
  direct_note: msty.ai 直连 200；旧域 msty.app 301→msty.ai、www.msty.app 直连 000（2026-10-31）。
  direct_note_en: msty.ai returned 200 direct; the legacy msty.app 301-redirects to msty.ai and www.msty.app measured 000 direct (2026-10-31).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）。
  filing_note_en: not in the CAC public registry (searched 2026-10-31).
  verified: 2026-10-31
---

## 一句话定位

**Msty：本地+云端混合的桌面 LLM 应用**（闭源，CloudStack, LLC）——
Studio 桌面应用跑本地 GGUF（llama.cpp 系底座）也接云端 API，产品线四线 Studio/Go/Nexus/Stack。
口径要点：**现役域 msty.ai（旧域 msty.app 301、www.msty.app 直连 000）**；
闭源——隐私与能力口径按官网自述，不可代码核验。

## 适合与不适合

适合：本地+云端一个应用混合使用；企业私有 LLM（Nexus）。
不适合：要开源可审计栈；纯 CLI 服务化路线。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/runner/_protocol.md](../../../protocols/runner/_protocol.md)。

## 未知项清单

- 各产品线免费/付费边界与配额（官网定价页未逐条核验）
- 内置 llama.cpp 底座版本与量化档支持面（闭源，版本随应用捆绑）
- MCP 接入面的具体能力与配置方式（官网产品线口径提及，未实测）

## 相关条目

- [LM Studio](./lm-studio.md) — 同类：桌面 GUI 本地模型应用；LM Studio 免费闭源、Msty 混合云端+企业线更重。
- [Jan](./jan.md) — 同类：开源桌面 GUI 对照 Msty 闭源桌面 GUI。
- [Ollama](./ollama.md) — 底座对照：桌面 GUI 类应用多挂 llama.cpp/Ollama 式本地推理底座。
- [ChatGPT](../../chat/products/chatgpt.md) — 混合面对照：Msty 一个应用同时接本地与云端模型；ChatGPT 只有云端线——混合架构的取舍（一个入口两种数据边界）正是它的产品主张。
