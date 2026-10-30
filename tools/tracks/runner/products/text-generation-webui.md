---
id: text-generation-webui
form: local-app
name: text-generation-webui / textgen
vendor: oobabooga
homepage: https://github.com/oobabooga/textgen
license: AGPL-3.0（GitHub API 核验 2026-10-30；官方仓 LICENSE 直抓核验）。
licenseEn: AGPL-3.0 (GitHub API verified 2026-10-21; official repo LICENSE direct-fetched).

axes:
  model_access: >-
    GGUF/safetensors 多后端（llama.cpp/exllama 系等 loader 生态）；模型与 loader 矩阵未逐条清点。
  runtime: >-
    本地 WebUI（Gradio 线）+ 命令行；GitHub 47,728★，最近推送 2026-08-17（GitHub API 核验 2026-10-30）。
    仓库现名 oobabooga/textgen（旧名 text-generation-webui 301 跳转，直抓核验）。
  local_files: >-
    全本地：模型、对话与扩展数据都在自有环境；未见官方云线或遥测声明。
  background: >-
    内置 OpenAI 兼容 API server 扩展线；细节未逐条核验。
  tools: >-
    扩展（extensions）生态是主轴之一；MCP 支持未逐条核验。
  context: >-
    上下文长度与聊天模板管理是核心面；长上下文裁剪策略细节未逐条核验。
  permissions: >-
    本地进程无账号体系；WebUI 默认本机监听，共享/公网暴露需使用者自行配置。
  fit: >-
    适合：要扩展生态与多 loader 灵活度、社区玩法（角色卡/微调衔接）。
    不适合：要开箱极简（界面信息密度高）；要 AGPL 之外的许可做闭源分发。

pitfalls:
  - 用旧仓名找仓库——现名 oobabooga/textgen（旧名 301 仍可达，引用以现名为准）
  - AGPL copyleft——闭源分发集成前先读义务
  - 把扩展生态当官方维护——第三方扩展质量参差，装前看来源

tags: [开源, AGPL3.0, WebUI, 多loader, 扩展生态]
related: [openai-agents-sdk]

sources:
  - label: oobabooga/textgen · 仓库（AGPL-3.0；47,728★，最近推送 2026-08-17，GitHub API 核验 2026-10-30）
    url: https://github.com/oobabooga/textgen
    kind: repo
  - label: oobabooga/textgen · LICENSE（2026-10-21 直抓核验）
    url: https://github.com/oobabooga/textgen/blob/main/LICENSE
    kind: docs
  - label: oobabooga/textgen · Releases（changelog）
    url: https://github.com/oobabooga/textgen/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: oobabooga（个人维护者）。
  origin_note_en: oobabooga (individual maintainer).
  direct: yes
  direct_note: github.com/oobabooga/textgen 直连实测 200（2026-10-21）。
  direct_note_en: github.com/oobabooga/textgen measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**text-generation-webui（现名 textgen）是本地 LLM 的「瑞士军刀」一代**：多 loader、扩展生态、社区玩法最全。
诚实标注：仓库改名 oobabooga/textgen；最近推送 2026-08-17（API 快照）——维护节奏介于活跃与放缓之间。

## 适合与不适合

适合：要 loader/扩展灵活度的进阶用户、角色卡与微调衔接的社区玩法。
不适合：开箱极简诉求；AGPL 之外的闭源分发集成。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（本地端点与凭据边界一节可借用；运行器专用协议本站未立）。

## 未知项清单

- loader 全矩阵（llama.cpp/exllama 等版本对应关系未逐条核验）
- 扩展生态当前活跃度（第三方生态，未逐条清点）
- 改名（textgen）的官方说明（未见公告直抓——只记仓库名事实）

## 相关条目

- [KoboldCpp](./koboldcpp.md) — 同为 AGPL 社区 GUI：KoboldCpp 单文件轻装，TGW 扩展重装。
- [llama.cpp](./llama-cpp.md) — 多 loader 之一的底层；TGW 的价值在 loader 之上的界面与扩展。
