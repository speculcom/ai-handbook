---
id: ollama
form: cli
name: Ollama
vendor: Ollama Inc.
homepage: https://ollama.com
license: MIT（官方仓 LICENSE 直抓核验 2026-10-21）。模型权重各自带自己的许可，下载什么模型受什么约束。
licenseEn: MIT (official repo LICENSE, direct-fetched 2026-10-21); model weights carry their own licenses — whatever you download is bound by its own terms.

axes:
  model_access: >-
    官方模型库（ollama.com/search 直抓 200）一键拉取开源模型。GGUF 与 safetensors 可导入 （docs.ollama.com/import 直抓核验）。

    模型库目录随上架变化，以 ollama.com/search 当日列表为准。
  runtime: >-
    本地进程（CLI + API server，默认 11434 端口）。

    官方 README 声明「locally or in the cloud」。 云端线（Ollama Cloud）存在：官方 Cloud 文档给 API key、用量与套餐。

    Cloud FAQ 明确零数据留存（ZDR）。GitHub 185,274★（API 核验 2026-10-21）。
  local_files: >-
    模型权重与对话数据默认落本机。云端模型的提示与响应按 ZDR 瞬时处理、不存储不记日志、不用于训练。账号只保留基础信息与不含内容的用量元数据（Cloud FAQ）。
  background: >-
    API server 常驻即承载后台推理。keep_alive 与并发队列行为见官方本地 FAQ（OLLAMA_KEEP_ALIVE、并行请求与显存排队）。
  tools: >-
    官方工具面是 function calling / tool calling API（docs.ollama.com 有 Tool calling 页）。文档目录不列 MCP 接入，MCP 需外部桥接。

    本档不把外部桥当官方能力。
  context: >-
    上下文默认按显存分档。<24GiB 4k、24–48GiB 32k、≥48GiB 256k。Cloud 模型默认用最大上下文（官方 Context length 页）。

    跨会话记忆不在官方文档叙事内。
  permissions: >-
    本机运行无账号即可用（API server 默认本机监听）。云端线用 Ollama 账号/API key 登录。API key 在设置页管理。数据面按 Cloud FAQ 的 ZDR 与账号删除条款。
  fit: >-
    适合：一条命令把开源模型跑起来。要 OpenAI 兼容本地 API。桌面与服务器通吃。不适合：要极致吞吐/服务化调度（那是 vLLM/SGLang 的活）。

    对云端数据边界有硬要求（先读 Cloud FAQ 的 ZDR 条款）。
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
  - label: ollama/ollama · 仓库（185,274★，最近推送 2026-10-30，GitHub API 核验）
    url: https://github.com/ollama/ollama
    kind: repo
  - label: Ollama · 官方文档（import/Modelfile/tool calling 页在导航内）
    url: https://docs.ollama.com
    kind: docs
  - label: ollama/ollama · Releases（changelog）
    url: https://github.com/ollama/ollama/releases
    kind: changelog
  - label: Ollama 文档 · Cloud（云端模型/API key/用量与套餐，2026-11-21 直抓）
    url: https://docs.ollama.com/cloud.md
    kind: docs
  - label: Ollama 文档 · Cloud FAQ（零数据留存 ZDR、不训练、账号删除）
    url: https://docs.ollama.com/cloud/faq.md
    kind: docs
  - label: Ollama 文档 · Context length（按显存档位默认上下文，2026-11-21 直抓）
    url: https://docs.ollama.com/context-length.md
    kind: docs
  - label: Ollama 文档 · 本地 FAQ（keep_alive 与并发处理）
    url: https://docs.ollama.com/faq.md
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: Ollama Inc.（美国，YC 系）。
  origin_note_en: Ollama Inc. (US, YC-backed).
  direct: yes
  direct_note: ollama.com 与 docs.ollama.com 直连实测 200（2026-10-21）。
  direct_note_en: ollama.com and docs.ollama.com measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）。该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-11-21
---

## 一句话定位

**Ollama 是「本地跑开源模型」的事实标准入口**：一条命令装完。
从官方模型库一键拉模型
本机起一个 OpenAI 兼容 API。
诚实标注：工具 MIT，但权重许可跟着模型走。
官方 README 明写还有云端线。

## 适合与不适合

适合：快速把 DeepSeek/Qwen/Llama 这类开源模型跑起来。给本地应用接 OpenAI 兼容端点。桌面与服务器同一套命令。不适合：高并发服务化调度（vLLM/SGLang 更合适）。

对云端线数据边界有硬要求但没逐条核验过。

## 实测记录

本档未跑吞吐与显存实测；结论只覆盖运行时能力与许可。
models 站的 GGUF 索引口径（llama.cpp 格式源头）与本档案 model_access 维衔接。

## 未知项清单

- 模型库完整目录与各家权重许可（随上架与权重页变化，以模型页为准）
- MCP 接入（官方文档目录不列 MCP，本档只记 tool calling API，不推断外部桥）

## 相关条目

- [vLLM](./vllm.md) — 同为开源模型运行器：vLLM 主打服务化高吞吐，Ollama 主打单机开箱。
- [llama.cpp](./llama-cpp.md) — Ollama 底层依赖的 GGUF 生态根。要细粒度控制直接用 llama.cpp。

## 第一次怎么用

1. 安装后先跑 `ollama --version`，确认服务已启动。
2. 从官方模型库拉一个模型；权重许可跟着模型走，商用前单独查。
3. 本机默认起 OpenAI 兼容端点，客户端把 base URL 指过来即可。
4. 显存不够时先降量化档，再考虑 CPU 卸载；不要直接换卡。
5. 官方 README 另写有云端线；本地与云端是两条计费与数据路径。

```text
ollama pull <model>
ollama run <model>
# OpenAI 兼容端点默认在本机；客户端 base_url 指向它
```
