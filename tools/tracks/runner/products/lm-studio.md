---
id: lm-studio
form: local-app
name: LM Studio
vendor: Element Labs
homepage: https://lmstudio.ai
license: 闭源免费桌面应用（官方站点口径）；底层运行时 llama.cpp/MLX 为开源。条款页为动态加载，未能直抓全文（2026-10-21）。
licenseEn: Closed-source free desktop app (official site positioning); the underlying runtimes llama.cpp/MLX are open source. The terms page loads dynamically and its full text could not be direct-fetched (2026-10-21).

axes:
  model_access: >-
    应用内直接下载最新本地 LLM（官网直抓所见）；GGUF 为主，MLX 与 llama.cpp 双运行时
    （官网原文「Powered by the LM Studio runtime, with MLX and llama.cpp under the hood」）。
  runtime: >-
    桌面应用（macOS/Windows/Linux）；官网现主推「Bionic」agent（本地 agent for work and code）——
    产品叙事已从纯聊天扩到 agent，建档快照口径。
  local_files: >-
    模型与对话落本机；官网明写语音转写「processed locally and never leaves your device」（直抓所见）。
  background: >-
    内置本地服务器（OpenAI 兼容端点）可常开供外部客户端用；默认开关与鉴权细节未逐条核验。
  tools: >-
    Bionic agent 线含文档编辑/自动化/计算机控制（官网直抓所见）；MCP 支持状态未逐条核验。
  context: >-
    聊天与 agent 会话的上下文管理在应用内；跨会话记忆与长期记忆未见官方声明。
  permissions: >-
    桌面应用权限随系统；agent 的计算机控制面权限边界未逐条核验。
  fit: >-
    适合：要图形界面跑本地模型、想在同一应用里试 agent（Bionic）。
    不适合：要无头服务器部署（用 llama.cpp/vLLM）；要读全许可条款（条款页动态加载，本站未能直抓）。

pitfalls:
  - 把「免费」读成「开源」——应用闭源，开源的是底层运行时
  - 只记得它是聊天壳——官网现主推 Bionic agent，产品面已扩
  - 把「语音不出设备」推广到全部功能——官网只对语音转写做了这个承诺

tags: [闭源免费, 桌面应用, GGUF, MLX, llama.cpp, 本地agent]
related: [openai-agents-sdk, langgraph]

sources:
  - label: LM Studio · 官网（Bionic 叙事与本地承诺，2026-10-21 直抓核验）
    url: https://lmstudio.ai
    kind: docs
  - label: LM Studio · 官方文档
    url: https://lmstudio.ai/docs
    kind: docs
  - label: LM Studio · 官方博客
    url: https://lmstudio.ai/blog
    kind: changelog
  - label: LM Studio · GitHub 组织（llama.cpp/MLX 集成侧仓库）
    url: https://github.com/lmstudio-ai
    kind: repo

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Element Labs（美国）。
  origin_note_en: Element Labs (US).
  direct: yes
  direct_note: lmstudio.ai 直连实测 200（2026-10-21）。
  direct_note_en: lmstudio.ai measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**LM Studio 是桌面跑本地模型的主流图形入口**：应用内下载模型、双运行时（MLX + llama.cpp）、内置本地服务器。
2026-10 快照：官网主推 Bionic——本地 agent 叙事已盖过纯聊天。诚实标注：应用闭源；条款页动态加载未能直抓全文。

## 适合与不适合

适合：不想碰命令行的本地模型用户、要在同一应用试 agent 与语音转写。
不适合：服务器无头部署；对许可条款有硬合规要求（本站未能直抓全文，只挂官网口径）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（本地端点与凭据边界一节可借用；运行器专用协议本站未立）。

## 未知项清单

- 条款页全文（动态加载，直抓为空——不猜内容）
- Bionic agent 的计算机控制权限模型（未逐条核验）
- 跨会话记忆能力（未见官方声明）

## 相关条目

- [Ollama](./ollama.md) — 同为开箱跑模型：Ollama 命令行为主轴，LM Studio 图形界面与 agent 叙事更重。
- [Jan](./jan.md) — 同为开源之外的桌面 GUI 路线：Jan 开源（Apache2.0 主体+署名），LM Studio 闭源。
