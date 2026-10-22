---
id: ollama
form: cli
name: Ollama
vendor: Ollama Inc.
homepage: https://ollama.com
license: MIT（官方仓 LICENSE 直抓核验 2026-10-21）；模型权重各自带自己的许可，下载什么模型受什么约束。
licenseEn: MIT (official repo LICENSE, direct-fetched 2026-10-21); model weights carry their own licenses — whatever you download is bound by its own terms.

axes:
  model_access: >-
    官方模型库（ollama.com/search 直抓 200）一键拉取开源模型；GGUF 与 safetensors 可导入
    （docs.ollama.com/import 直抓核验）；模型库目录随上架变化，未逐条清点。
  runtime: >-
    本地进程（CLI + API server，默认 11434 端口）；官方 README 声明「locally or in the cloud」——
    云端线（Ollama Cloud）存在，细节未逐条核验。GitHub 184,165★（API 核验 2026-10-21）。
  local_files: >-
    模型权重与对话数据默认落本机；云端线（Ollama Cloud）的存储与处理边界未逐条核验。
  background: >-
    API server 常驻即承载后台推理；官方文档有 keep-alive/并发说明页，细节未逐条核验。
  tools: >-
    官方文档含 tool calling 页（docs.ollama.com 导航直抓所见）；MCP 支持状态未核验到官方声明。
  context: >-
    上下文长度按 Modelfile/参数配置（Modelfile Reference 在官方文档导航内）；跨会话记忆未见官方声明。
  permissions: >-
    本机运行无账号即可用（API server 默认本机监听）；云端线需登录，其权限面未逐条核验。
  fit: >-
    适合：一条命令把开源模型跑起来、要 OpenAI 兼容本地 API、桌面与服务器通吃。
    不适合：要极致吞吐/服务化调度（那是 vLLM/SGLang 的活）；要逐条核验云端线数据边界。

pitfalls:
  - 把「MIT 的 Ollama」当「模型免费商用」——权重许可跟着模型走，不跟工具走
  - 只看到本地线——官方 README 明写云端线，数据边界要单独查
  - 用默认上下文跑长文——上下文按 Modelfile/参数配置，默认值随模型变

tags: [开源, MIT, 本地推理, GGUF, OpenAI兼容, 模型库]
related: [llamaindex, openai-agents-sdk]

sources:
  - label: ollama/ollama · LICENSE（MIT，2026-10-21 直抓核验）
    url: https://github.com/ollama/ollama/blob/main/LICENSE
    kind: docs
  - label: ollama/ollama · 仓库（184,165★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/ollama/ollama
    kind: repo
  - label: Ollama · 官方文档（import/Modelfile/tool calling 页在导航内）
    url: https://docs.ollama.com
    kind: docs
  - label: ollama/ollama · Releases（changelog）
    url: https://github.com/ollama/ollama/releases
    kind: changelog

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Ollama Inc.（美国，YC 系）。
  origin_note_en: Ollama Inc. (US, YC-backed).
  direct: yes
  direct_note: ollama.com 与 docs.ollama.com 直连实测 200（2026-10-21）。
  direct_note_en: ollama.com and docs.ollama.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**Ollama 是「本地跑开源模型」的事实标准入口**：一条命令装完，从官方模型库一键拉模型，
本机起一个 OpenAI 兼容 API。诚实标注：工具 MIT，但权重许可跟着模型走；官方 README 明写还有云端线。

## 适合与不适合

适合：快速把 DeepSeek/Qwen/Llama 这类开源模型跑起来、给本地应用接 OpenAI 兼容端点、桌面与服务器同一套命令。
不适合：高并发服务化调度（vLLM/SGLang 更合适）；对云端线数据边界有硬要求但没逐条核验过。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（本地端点与凭据边界一节可借用；运行器专用协议本站未立）。
models 站的 GGUF 索引口径（llama.cpp 格式源头）与本档案 model_access 维衔接。

## 未知项清单

- Ollama Cloud 的数据存储与处理边界（未逐条核验）
- MCP 支持状态（未核验到官方声明）
- 模型库完整目录与各家权重的商用条款（未逐条清点）

## 相关条目

- [vLLM](./vllm.md) — 同为开源模型运行器：vLLM 主打服务化高吞吐，Ollama 主打单机开箱。
- [llama.cpp](./llama-cpp.md) — Ollama 底层依赖的 GGUF 生态根；要细粒度控制直接用 llama.cpp。
