---
id: koboldcpp
form: local-app
name: KoboldCpp
vendor: LostRuins（KoboldAI 社区）
homepage: https://github.com/LostRuins/koboldcpp
license: AGPL-3.0（GitHub API 核验 2026-10-21；官方仓 LICENSE 直抓 200）。
licenseEn: AGPL-3.0 (GitHub API verified 2026-10-21; official repo LICENSE direct-fetched 200).

axes:
  model_access: >-
    GGUF 为主（仓库描述「Run GGUF AI models locally」直抓所见）+ transformers 转换线；
    支持量化档看 models 站 GGUF 索引口径。
  runtime: >-
    单文件可执行程序（「One File. Zero Install.」官方描述）；基于 llama.cpp 系；
    GitHub 12,042★（API 核验 2026-10-21）。
  local_files: >-
    全本地运行：模型、对话与生成记录都在自有环境；未见官方云线或遥测声明。
  background: >-
    内置 KoboldAI 兼容 API server 常驻；细节未逐条核验。
  tools: >-
    以角色扮演/创意写作负载为主轴；工具调用/function calling 支持面未逐条核验。
  context: >-
    上下文与内存（memory/smart context）管理是 Kobold 系传统强项；细节未逐条核验。
  permissions: >-
    本地进程无账号体系；API server 监听与鉴权由用户自配（默认口径未逐条核验）。
  fit: >-
    适合：角色扮演/长上下文创意写作、要单文件免安装、要 KoboldAI 生态兼容。
    不适合：要 OpenAI 兼容主叙事（有但非主轴）；要 AGPL 商用闭源分发（copyleft 约束）。

pitfalls:
  - AGPL 的 copyleft——基于它分发服务要开源义务，商用闭源集成前先读条款
  - 找错仓库——官方仓在 LostRuins 名下，koboldai/koboldcpp 已 404（2026-10-21 直抓核验）
  - 把「单文件」当「功能少」——上下文管理线是它的看家特色

tags: [开源, AGPL3.0, 单文件, GGUF, 角色扮演, 长上下文]
related: [openai-agents-sdk]

sources:
  - label: LostRuins/koboldcpp · 仓库（AGPL-3.0；12,042★，最近推送 2026-10-21，GitHub API 核验）
    url: https://github.com/LostRuins/koboldcpp
    kind: repo
  - label: LostRuins/koboldcpp · LICENSE（2026-10-21 直抓核验）
    url: https://github.com/LostRuins/koboldcpp/blob/master/LICENSE
    kind: docs
  - label: LostRuins/koboldcpp · Releases（changelog）
    url: https://github.com/LostRuins/koboldcpp/releases
    kind: changelog
  - label: KoboldCpp · 官方 Wiki
    url: https://github.com/LostRuins/koboldcpp/wiki
    kind: docs

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: LostRuins（个人维护者，KoboldAI 社区线）。
  origin_note_en: LostRuins (individual maintainer, KoboldAI community line).
  direct: yes
  direct_note: github.com/LostRuins/koboldcpp 直连实测 200（2026-10-21）。
  direct_note_en: github.com/LostRuins/koboldcpp measured 200 direct (2026-10-21).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-21 检索）；开源项目未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-21); the open-source project does not serve the mainland public, so filing does not apply.
  verified: 2026-10-21
---

## 一句话定位

**KoboldCpp 是角色扮演/创意写作圈的本地推理老兵**：单文件免安装、GGUF、Kobold 系上下文管理传统。
AGPL-3.0——商用集成前先读 copyleft 义务。诚实标注：官方仓在 LostRuins 名下（koboldai 名下旧仓 404）。

## 适合与不适合

适合：长上下文角色扮演与创意写作、要零安装单文件、KoboldAI 前端生态用户。
不适合：要 AGPL 之外的宽松许可做闭源集成；要 OpenAI 兼容作主工作流（能用但非主轴）。

## 实测记录

本站尚未完成实测。最接近的实测协议是代码侧的 [protocols/framework/_protocol.md](../../../protocols/framework/_protocol.md)（本地端点与凭据边界一节可借用；运行器专用协议本站未立）。

## 未知项清单

- 上下文管理特性全清单（smart context/memory 线未逐条核验）
- 工具调用支持状态（未逐条核验）
- 个人维护者的长期维护承诺（未见官方声明——单点维护风险如实标注）

## 相关条目

- [llama.cpp](./llama-cpp.md) — 底层同源（llama.cpp 系）；KoboldCpp 在其上加 GUI 与上下文管理。
- [text-generation-webui](./text-generation-webui.md) — 同为社区 GUI 路线：TGW 重扩展生态，KoboldCpp 重单文件与角色扮演。
