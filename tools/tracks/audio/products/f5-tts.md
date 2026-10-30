---
id: f5-tts
form: local-app
name: F5-TTS
nameEn: F5-TTS
vendor: SWivid / 上交 X-LANCE 等（开源）
homepage: https://github.com/SWivid/F5-TTS
license: MIT（GitHub API 当日核验 spdx=MIT）；权重经 HF/ModelScope/Wisemodel 分发，
  各分发页权重许可细节未逐条核验。
licenseEn: MIT (GitHub API verified same day, spdx=MIT); weights distributed via HF/ModelScope/Wisemodel —
  per-distribution weight-license details not verified item by item.

axes:
  model_access: >-
    开源权重线：F5-TTS（Diffusion Transformer + ConvNeXt V2）与 E2 TTS 复现两模型在册（README 当日核验），
    v1 base 模型 2025-03-12 发布；下载权重本机推理，无官方托管服务。
  runtime: >-
    本机 Python 推理栈（conda + PyTorch，NVIDIA CUDA 与 AMD ROCm 安装路径 README 在册，ROCm 仅 Linux）；
    社区 Gradio Space（E2-F5-TTS）可试跑但非官方托管产品。
  local_files: >-
    权重、代码、生成音频全在本机；ModelScope 权重页大陆直连 200（2026-10-30）——获取路径大陆可用；
    无任何账户/云端数据面。
  background: >-
    本机批处理推理，无任务队列形态；推理耗时随硬件变化，官方未给统一延迟口径（未核验）。
  tools: >-
    命令行/库形态为主（README 用法示例）；zero-shot 克隆=给参考音频+文本即可合成（README 用法在册）；
    Sway Sampling 推理期采样策略在册。无托管 API。
  context: >-
    无会话概念——每次推理调用独立、互不携带状态；跨会话记忆不适用（本机模型形态，
    上下文管理完全由调用方代码自理）。
  permissions: >-
    MIT 许可商用基底（GitHub 当日在册）；克隆授权面模型本身不做 consent 校验——
    平台侧拦截不存在（本机形态无平台），使用方自担授权责任（法律提示不在官方 README 在册，如实标未核验）。
  fit: >-
    适合：本机/私有化中英文 TTS 与 zero-shot 克隆研究、MIT 商用基底、大陆经 ModelScope 获取权重。
    不适合：要托管 API 开箱即用、要零运维、要 SLA。

pitfalls:
  - 它是模型不是产品——没有账号、控制台、SLA；「F5-TTS 服务」在官方口径里不存在（HF Space 是社区演示不是官方托管）
  - 官方入口 github.com 大陆直连当日 000——权重经 ModelScope（AI-ModelScope/E2-F5-TTS studio 与 SWivid 权重页）直连 200，按获取路径判可达性而不是按仓库域
  - README 的实验室署名（X-LANCE 上交、SII、PCL）是研究归属不是公司主体——商用集成时 MIT 无担保条款照常适用

tags: [开源MIT, 模型非产品, 中文TTS, zero-shot克隆, 自托管, 多语言]
related: [cosyvoice, fish-audio, ollama]

sources:
  - label: F5-TTS · GitHub 仓（MIT/★15,487/最近推送 2026-10-23，GitHub API 当日核验）
    url: https://github.com/SWivid/F5-TTS
    kind: repo
  - label: F5-TTS · arXiv 论文（2410.06885，仓 homepage 在册）
    url: https://arxiv.org/abs/2410.06885
    kind: paper
  - label: F5-TTS · 官方 demo 页（swivid.github.io，2026-10-30 直连 200）
    url: https://swivid.github.io/F5-TTS/
    kind: official
  - label: F5-TTS · ModelScope 权重页（2026-10-30 大陆直连 200）
    url: https://www.modelscope.cn/models/SWivid/F5-TTS_Emilia-ZH-EN
    kind: official
  - label: F5-TTS · Releases（变更记录，2026-10-30 代理抓 200；直连 000）
    url: https://github.com/SWivid/F5-TTS/releases
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 中国学术团队开源项目——README 徽章当日在册 X-LANCE（上海交通大学）、SII、PCL 三实验室署名；
    作者 SWivid 个人维护（GitHub 主体口径）。
  origin_note_en: open-source project of Chinese academic teams — README badges on record same day list
    X-LANCE (Shanghai Jiao Tong University), SII and PCL labs; maintained by author SWivid (GitHub entity).
  direct: unknown
  direct_note: 官方入口 github.com 大陆直连当日实测 000（代理 200）——GitHub 大陆可达性长期波动，
    不下「被墙/区域限制」结论；权重经 ModelScope 分发当日直连 200，本机获取路径大陆可用。
  direct_note_en: the official entry github.com measured 000 direct from mainland (200 via proxy) — GitHub's mainland
    reachability fluctuates long-term, no "blocked vs region-limited" conclusion drawn; weights via ModelScope
    measured 200 direct same day, so the local acquisition path works from the mainland.
  filing: not-filed
  filing_note: 开源模型不适用服务备案（不面向公众提供服务，同 Whisper/CosyVoice 先例口径）。
  filing_note_en: an open-source model is not subject to service filing (it serves no public service, same wording as
    the Whisper/CosyVoice precedent).
  verified: 2026-10-30
---

## 一句话定位

**F5-TTS 是中国学术团队（上交 X-LANCE 等）的开源 flow-matching TTS 模型**（MIT，★15,487，
最近推送 2026-10-23 当日在册）：下载权重本机跑，中英文 zero-shot 克隆是主打用法，无官方托管服务。

## 适合与不适合

适合：本机/私有化中英文 TTS 与 zero-shot 克隆研究、MIT 商用基底、大陆经 ModelScope 获取权重。
不适合：要托管 API 开箱即用、要零运维、要 SLA。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（音频产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **中英文 zero-shot 克隆的说话人相似度与稳定性**（论文有基准，第三方未复核；与 CosyVoice 3.0 同场景对测最有信息量）
- **消费级显卡上的实时率**（README 只给安装路径不给延迟口径）
- **v1 base 与旧 base 的音质差**（2025-03-12 News 只说 better，未给对比表）

## 未知项清单

- 各分发页（HF/ModelScope/Wisemodel）权重许可细节是否一致（未逐条核验）
- 官方对克隆使用授权的具体法律提示（README 未在册，如实标未核验）
- 训练数据构成与许可（论文口径未逐条核验）
- Apple Silicon 路径的当前可用性（README 安装段当日只细读 NVIDIA/AMD 两节）

## 相关条目

- [CosyVoice](./cosyvoice.md) — 同为开源中英文 TTS：CosyVoice 是阿里产业团队三代线带训练栈，F5-TTS 是学术团队单仓 flow-matching 路线。
- [fish audio](./fish-audio.md) — fish 有托管线+音色市场，F5-TTS 纯开源权重无托管。
- [Ollama](../../runner/products/ollama.md) — 本机推理栈同形态参照：Ollama 管 LLM，F5-TTS 是 TTS 侧的手动等价物。
