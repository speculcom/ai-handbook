---
id: tabbyapi
form: cli
name: TabbyAPI
vendor: Royal Lab（theroyallab）
homepage: https://github.com/theroyallab/tabbyAPI
license: AGPL-3.0（GitHub API 核验 2026-10-31）。
licenseEn: AGPL-3.0 (GitHub API verified 2026-10-31).

axes:
  model_access: >-
    **ExLlamaV3 官方 API 后端**——README 自述「TabbyAPI is also the official API backend server for
    ExllamaV3」：跑 GPTQ/GGUF 等 ExLlamaV3 支持的本地权重（exllamav3 后端），不是调外部模型的服务。
    模型文件放本机目录挂载进进程（Docker 口径：models 目录挂进容器）。
  runtime: >-
    **FastAPI 本地服务**（Python 3.10–3.14）；官方 CUDA 镜像在 GHCR（ghcr.io/theroyallab/tabbyapi），
    标签 latest（CUDA 12.8）/cu13/latest-rocm（AMD RX 7900 系）/latest-extras（含可选 embeddings 栈）。
    GitHub theroyallab/tabbyAPI AGPL-3.0 1,502★ 推送 2026-10-30（API 核验）；
    **GitHub releases 为 0——发版走 rolling release（README 自述），变更记录线看 commits**。
  local_files: >-
    读写本机文件——模型权重目录、config.yml 配置；API 默认 localhost:5000。
  background: >-
    常驻本机进程（FastAPI server）；无常驻云面。README 免责声明自述「hobby project…not meant to run
    on production servers」——生产负载官方建议另寻方案。
  tools: >-
    OpenAI 兼容 API 面（chat/completions 等端点）+ 管理面（admin UI/status 页，commits 可见 admin 功能演进）；
    不是 agent 工具宿主，是给前端（SillyTavern 类）或客户端供推理 API 的服务端。
  context: >-
    无跨会话记忆（推理服务面）——上下文长度随 ExLlamaV3 后端配置（max_context 类参数）变化；
    对话状态由前端客户端（SillyTavern 类）携带，服务端不存会话历史。
  permissions: >-
    本机运行；可配 API key（config.yml）；权限面=本机文件与 GPU。Docker 口径要 --shm-size 调大
    （ExLlamaV3 用 POSIX 共享内存做张量并行/CPU MoE 卸载，默认 64MiB 不够——README 明写）。
  fit: >-
    适合：ExLlamaV3 生态（GPTQ 系量化）要 OpenAI 兼容 API 的标准答案；要 Docker 一键起 CUDA/ROCm 推理服务。
    不适合：要生产级服务化（官方自述非生产向，vLLM/TGI 那条线）；要 GGUF 全量化档广覆盖（llama.cpp 根）。

pitfalls:
  - 把 tabbyapi.com 当官网——README 官方警告「The ONLY official source for TabbyAPI information is this repository」，其他声称代表 TabbyAPI 的站点/下载/服务均非官方（tabbyapi.com 直连为 Cloudflare 验证页）
  - 等 GitHub releases——releases 为 0，它是 rolling release，看 commits 与 Wiki
  - 当生产服务器用——README 免责声明明写 hobby project、非生产向
  - Docker 忘调 --shm-size——ExLlamaV3 张量并行/MoE 卸载走共享内存，默认 64MiB 会出问题（README 明写保留该 flag）

tags: [本地推理, 服务化推理, OpenAI兼容, ExLlama, Docker, AGPL-3.0, rolling-release]
related: [llama-cpp, ollama, text-generation-webui, chatgpt]

sources:
  - label: theroyallab/tabbyAPI · 仓库（AGPL-3.0；1,502★，推送 2026-10-30，GitHub API 核验；README 官方唯一性警告+Exllamav3 后端+Docker 口径）
    url: https://github.com/theroyallab/tabbyAPI
    kind: repo
  - label: GitHub commits · tabbyAPI（变更记录线：rolling release，无 releases）
    url: https://github.com/theroyallab/tabbyAPI/commits/main
    kind: changelog
  - label: TabbyAPI · 官方文档（theroyallab.github.io/tabbyAPI，README 挂链的 API 文档徽章指向）
    url: https://theroyallab.github.io/tabbyAPI
    kind: docs

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Royal Lab（theroyallab）——GitHub 组织名义的开源社区项目。
  origin_note_en: Royal Lab (theroyallab) — an open-source community project under a GitHub org name.
  direct: yes
  direct_note: GitHub 仓/raw README 直连 200；tabbyapi.com 直连为 Cloudflare 验证页（且按官方警告非官方站点）（2026-10-31）。
  direct_note_en: The GitHub repo and raw README returned 200 direct; tabbyapi.com serves a Cloudflare verification page (and per the official warning is not an official site) (2026-10-31).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-31); an open-source project not serving the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**TabbyAPI：ExLlamaV3 的官方 API 后端服务器**（AGPL-3.0，1,502★ 推送 2026-10-30）——
FastAPI 本地推理服务，OpenAI 兼容端点，官方 GHCR 镜像覆盖 CUDA 12.8/13 与 AMD ROCm。
两条硬口径：**README 官方警告「本仓是唯一官方信息源」——tabbyapi.com 反而非官方**；
**rolling release、GitHub releases 为 0——变更记录线看 commits**。

## 适合与不适合

适合：ExLlamaV3（GPTQ 系）要 OpenAI 兼容 API；Docker 一键起本地推理服务。
不适合：生产级服务化（官方自述非生产向）；GGUF 全量化档广覆盖路线（llama.cpp 根）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/runner/_protocol.md](../../../protocols/runner/_protocol.md)。

## 未知项清单

- 支持的量化格式完整矩阵（GPTQ/GGUF 各档支持面，Wiki 有口径未逐条核验）
- config.yml 全部配置项（API key、管理面开关等，未逐条清点）
- embeddings 栈（latest-extras）的具体能力面（README 提及，未核验）

## 相关条目

- [llama.cpp](./llama-cpp.md) — 对照：llama.cpp 是 GGUF 推理根；TabbyAPI 站 ExLlamaV3 后端（GPTQ 系见长）。
- [Ollama](./ollama.md) — 对照：Ollama 是 pull 即跑的产品化封装；TabbyAPI 是给前端供 API 的服务端，配置面更工程化。
- [text-generation-webui](./text-generation-webui.md) — 同类：都是本地推理服务+Web 管理面生态；TabbyAPI 无 UI 壳、纯 API 服务端。
- [ChatGPT](../../chat/products/chatgpt.md) — 边界对照：云端对话入口 vs 本机 ExLlamaV3 推理 API——同为 OpenAI 兼容端点，数据边界与模型归属完全不同。
