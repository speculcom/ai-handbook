---
id: cosyvoice
form: local-app
name: CosyVoice
nameEn: CosyVoice
vendor: 阿里 FunAudioLLM（开源）
homepage: https://github.com/FunAudioLLM/CosyVoice
license: Apache-2.0（官方仓 GitHub API 当日核验 license=Apache-2.0）；权重经 ModelScope/Hugging Face 分发，
  各代权重页许可未逐张核验。

axes:
  model_access: >-
    本体是开源模型族：v1（CosyVoice-300M）→ v2（CosyVoice2-0.5B）→ Fun-CosyVoice 3.0
    （Fun-CosyVoice3-0.5B-2512，README 当日在册三代线）；下载权重本地推理，不接托管 API。
  runtime: >-
    本机 Python 运行时（README 给 conda 安装+推理/训练/部署全栈，官方描述 inference, training and
    deployment full-stack ability）；仓已迁至 QwenAudio org（FunAudioLLM/CosyVoice 301→QwenAudio/CosyVoice，
    当日核验）；README 克隆命令仍写旧 org 名。
  local_files: >-
    权重、代码、合成输出全在本机——开源模型仓没有账户侧数据面（这是它与托管 TTS 产品的结构性差别）。
  background: >-
    本机批处理/流式推理：README 在册 Bi-Streaming（text-in/audio-out 双流，官方称延迟低至 150ms）；
    无云端任务面。
  tools: >-
    发音控制面在册（README：中文拼音/英文 CMU 音素 pronunciation inpainting、文本正则化免传统前端、
    Instruct 支持情感/语速/音量指令）；MCP 不适用（模型仓不是 agent 宿主）。
  context: >-
    不适用对话上下文维度——TTS 模型按单次合成请求工作；zero-shot 克隆以参考音频为条件（README 在册
    多语/跨语 zero-shot 克隆）。
  permissions: >-
    Apache-2.0 代码许可（GitHub API 当日核验）；声音克隆涉人格权——官方 README 未给使用授权条款，
    「官方未声明」按查过 README/仓根文件口径标注；9 语+18 中方言覆盖在 README 在册。
  fit: >-
    适合：本机/私有部署中文+方言 TTS、要 zero-shot 克隆与训练微调全栈、要 Apache-2.0 可商用底座。
    不适合：要托管 API 开箱即用（官方不卖托管线）、要零运维。

pitfalls:
  - 官方 org 已从 FunAudioLLM 更名 QwenAudio（当日 301 核验）——旧链接仍可达但新仓主在 QwenAudio；README 克隆命令仍写 FunAudioLLM 旧名，以 301 后地址为准
  - 它是模型不是产品——没有账号、没有控制台、没有 SLA；「CosyVoice 服务」在官方口径里不存在（百炼语音合成是另一条托管线，别混）
  - 官方 demo 页（funaudiollm.github.io/cosyvoice3）当日 404、新址 qwenaudio.github.io/cosyvoice3 直抓 200——README 内链仍指旧域，按新域核

tags: [开源, Apache-2.0, 模型非产品, 中文TTS, 声音克隆, 自托管, 多语言]
related: [whisper, fish-audio, elevenlabs, ollama]

sources:
  - label: CosyVoice · 官方仓（QwenAudio/CosyVoice，Apache-2.0，GitHub API 当日核验 ★24,192/pushed 2026-05-25）
    url: https://github.com/QwenAudio/CosyVoice
    kind: repo
  - label: CosyVoice · README（三代模型线/评测表/安装路径，2026-10-30 代理抓 200）
    url: https://github.com/FunAudioLLM/CosyVoice
    kind: docs
  - label: Fun-CosyVoice3-0.5B-2512 · ModelScope 权重页（2026-10-30 直抓 200）
    url: https://www.modelscope.cn/models/FunAudioLLM/Fun-CosyVoice3-0.5B-2512
    kind: docs
  - label: Fun-CosyVoice 3.0 · arXiv 论文（2505.17589，2026-10-30 直抓 200）
    url: https://arxiv.org/abs/2505.17589
    kind: paper
  - label: CosyVoice · commits（变更记录——仓无正式 releases，README Roadmap 节在册，2026-10-30 代理抓 200）
    url: https://github.com/QwenAudio/CosyVoice/commits/main/
    kind: changelog
  - label: QwenAudio · 官方 demo 页（cosyvoice3，2026-10-30 直抓 200；旧域 funaudiollm.github.io 当日 404）
    url: https://qwenaudio.github.io/cosyvoice3/
    kind: official

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 阿里系语音团队开源项目（GitHub org 描述当日在册「QwenAudio Team（千问语音团队）」，
    关联站 funasr.com 当日直抓在册「达摩院推出的语音识别模型」叙事）。
  origin_note_en: open-source project of the Alibaba speech team (GitHub org description on record same day:
    "QwenAudio Team (千问语音团队)"; the linked site funasr.com carries the "达摩院" narrative, direct-fetched 200 same day).
  direct: unknown
  direct_note: 官方入口 github.com 大陆直连当日实测 000（代理 200）——GitHub 大陆可达性长期波动，
    不下「被墙/区域限制」结论；权重经 ModelScope 分发当日直连 200，本机获取路径大陆可用。
  direct_note_en: the official entry github.com measured 000 direct from mainland (200 via proxy) — GitHub's mainland
    reachability fluctuates long-term, no "blocked vs region-limited" conclusion drawn; weights via ModelScope
    measured 200 direct same day, so the local acquisition path works from the mainland.
  filing: not-filed
  filing_note: 开源模型不适用服务备案（不面向公众提供服务，同 Whisper 先例口径）；其托管形态（阿里云百炼语音合成线）
    的备案主语是服务方而非本开源仓。
  filing_note_en: an open-source model is not subject to service filing (it serves no public service, same wording as
    the Whisper precedent); filing for its hosted form (Alibaba Cloud Bailian TTS line) is the service provider's, not this repo's.
  verified: 2026-10-30
---

## 一句话定位

**CosyVoice 是阿里语音团队（QwenAudio/原 FunAudioLLM）的开源 LLM-TTS 模型族**（Apache-2.0，
v1→v2→Fun-CosyVoice 3.0 三代线）：下载权重本机推理/训练/部署全栈，中文+方言覆盖与 zero-shot 克隆是主打——
它是模型不是产品，官方不卖托管线。

## 适合与不适合

适合：本机/私有部署中文+方言 TTS、zero-shot 克隆与微调全栈、Apache-2.0 商用底座。
不适合：要托管 API 开箱即用、要零运维。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（音频模型不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **官方评测表复现**（README 评测表是作者自测口径——CER/SS 数字第三方未复核）
- **消费级 GPU 上的实时流式延迟**（官方称 150ms 是特定硬件口径）
- **zero-shot 克隆的最低参考音频时长与质量门槛**（README 未给硬指标）

## 未知项清单

- 各代权重页的许可细节（仓 LICENSE=Apache-2.0 已核，ModelScope/HF 权重页未逐张核验）
- 平台侧克隆使用授权条款（README 未声明——按查过 README/仓根文件口径标注）
- 官方托管服务是否存在（百炼语音合成线是否即 CosyVoice 底座未核验到官方对应声明）

## 相关条目

- [Whisper](./whisper.md) — 同为开源语音模型收仓口径：Whisper 管转写（听），CosyVoice 管合成（说）。
- [fish audio](./fish-audio.md) — 同为 zero-shot 克隆路线：fish 是托管产品+音色市场，CosyVoice 是开源权重本机跑。
- [ElevenLabs](./elevenlabs.md) — 商用托管 TTS 对照：ElevenLabs 卖服务，CosyVoice 给权重与全栈代码。
