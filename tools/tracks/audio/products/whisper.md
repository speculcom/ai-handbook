---
id: whisper
form: local-app
name: Whisper
nameEn: Whisper
vendor: OpenAI（开源）
homepage: https://github.com/openai/whisper
license: MIT（模型权重与代码，官方仓 LICENSE 直抓核验 2026-10-22）——
  权重与代码均宽松开源，本地使用无账号无配额。
licenseEn: MIT (weights and code, official repo LICENSE direct-fetched 2026-10-22) — permissively open,
  local use requires no account and has no quotas.

axes:
  model_access: >-
    开源转写模型族（tiny→large-v3 多档，官方 README 列模型尺寸与语言覆盖）；权重经 Hugging Face
    分发（官方 README 链接）。衍生生态庞大：whisper.cpp、faster-whisper、WhisperX 等
    （官方 README 提及部分——生态全貌未逐条清点）。
  runtime: >-
    本地运行（Python + PyTorch，官方 README 安装面）；GPU/CPU 皆可，档位换速度/质量。
    托管线：OpenAI API 的 whisper 转写端点（platform.openai.com 文档线）是同一模型的云形态。
  local_files: >-
    完全本地：音频、转写结果都在本机——这是它与所有云端转写产品最根本的数据边界差异。
  background: >-
    批处理任务制（文件进、文本出，本机跑完即退）；无后台常驻/记忆概念。
  tools: >-
    CLI 与 Python API（官方仓）；时间戳/翻译（译到英文）能力内置（官方 README）；
    VAD/说话人分离不在官方仓——靠 WhisperX 等衍生件（衍生面未逐条核验）。
  context: >-
    无上下文概念——逐段转写；长音频靠分段策略（官方仓有长音频处理说明）。
  permissions: >-
    本地跑无账号无上传——隐私敏感音频（医疗/法务/私人）走本地是它的不可替代场景；
    云端 API 形态则按 OpenAI 平台条款（未逐条核验）。
  fit: >-
    适合：隐私敏感的转写（音频不出本机）、离线环境、开发者集成（MIT 无许可负担）、多语言转写。
    不适合：开箱即用会议记录产品体验（它是模型不是产品）、说话人分离开箱（要衍生件）、
    无 GPU 重度使用（大档位 CPU 慢）。

pitfalls:
  - Whisper 是模型不是产品——「会议转写工具」体验（Otter 类）要自己搭壳或用衍生产品
  - 说话人分离/实时流不在官方仓——看到「Whisper 实时字幕」类产品都是衍生件，质量与许可各自核
  - 官方仓与 OpenAI API 的 whisper 端点是「同模型两形态」——本地 MIT vs 平台条款，数据边界完全不同

tags: [开源MIT, 本地转写, 多语言, 模型非产品, 隐私向]
related: [deepgram, otter, ollama]

sources:
  - label: Whisper · 官方仓（README/模型清单/LICENSE）
    url: https://github.com/openai/whisper
    kind: official
  - label: Whisper · 官方仓 Releases（changelog）
    url: https://github.com/openai/whisper/releases
    kind: changelog
  - label: OpenAI · Whisper 发布页（模型叙事）
    url: https://openai.com/index/whisper/
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: OpenAI（美国）开源项目。
  origin_note_en: OpenAI (US) open-source project.
  direct: yes
  direct_note: github.com/openai/whisper 大陆直连实测 200（2026-10-22）；权重经 Hugging Face 分发，
    HF 大陆可达性未在本档案实测。
  direct_note_en: github.com/openai/whisper measured 200 direct from mainland (2026-10-22); weights are
    distributed via Hugging Face, whose mainland reachability was not measured in this profile.
  filing: not-filed
  filing_note: 开源模型不适用服务备案（不面向公众提供服务）；OpenAI 未见于网信办公示名单（2026-10-22 检索）。
  filing_note_en: an open-source model is not subject to service filing (it serves no public service);
    OpenAI is not in the CAC public registry (searched 2026-10-22).
  verified: 2026-10-22
---

## 一句话定位

**Whisper 是转写领域的「开源基座」**：MIT 权重多档位本地跑，隐私敏感音频不出本机；
它是模型不是产品——会议记录体验要壳件，说话人分离靠衍生生态。

## 适合与不适合

适合：隐私敏感转写、离线环境、开发者集成、多语言。
不适合：开箱会议产品、实时字幕开箱、无 GPU 重度使用。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **中文转写在中/英混说场景的档位选择**（large-v3 vs 衍生微调件）
- **whisper.cpp 在消费级 GPU 的实时率**
- **与 Deepgram/AssemblyAI 云端 API 的中文准确率对比**

## 未知项清单

- 衍生生态全貌（whisper.cpp/faster-whisper/WhisperX 等未逐条核验质量与许可）
- OpenAI API 端点当前模型版本与本地仓版本是否同步（未核验）
- 官方后续模型线走向（未核验到声明）

## 相关条目

- [Deepgram](./deepgram.md) — 云端转写 API 对照：Deepgram 实时流与托管便利，Whisper 本地与隐私边界。
- [Otter](./otter.md) — 产品壳对照：Otter 是会议转写产品，Whisper 是这类产品底下的模型基座之一。
- [Ollama](../runner/products/ollama.md) — 本地运行器生态：Whisper 类本地模型与 Ollama 同属「数据不出本机」阵营。
