---
zh: "OpenAI 兼容接口"
en: "OpenAI-compatible API"
alias: ["OpenAI 兼容 API"]
purpose: "本地跑的模型，用现成的 OpenAI 客户端就能连。"
def: ["vLLM 官方提供兼容 OpenAI Completions、Chat Completions、Embeddings 等接口的 HTTP 服务。", "llama.cpp 的服务端同样以 OpenAI 兼容 API 方式启动。"]
why: "换后端不用改代码，这是本地与云端之间最省事的切换方式。"
refs:
  - ["vLLM OpenAI 兼容服务文档", "https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html", "vLLM OpenAI-compatible server"]
  - ["llama.cpp 官方仓库", "https://github.com/ggml-org/llama.cpp", "llama.cpp repository"]
domain: "infra"
purposeTag: "apply"
level: 5
layer: "五"
ord: 24
---

# OpenAI 兼容接口（OpenAI-compatible API）

**解决什么问题**：本地跑的模型，用现成的 OpenAI 客户端就能连。

vLLM 官方提供兼容 OpenAI Completions、Chat Completions、Embeddings 等接口的 HTTP 服务。

llama.cpp 的服务端同样以 OpenAI 兼容 API 方式启动。

**为什么需要知道**：换后端不用改代码，这是本地与云端之间最省事的切换方式。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->
