---
id: tongyi-wanxiang
form: web
name: 通义万相
nameEn: Tongyi Wanxiang (Wan)
vendor: 阿里巴巴
homepage: https://tongyi.aliyun.com/wanxiang
license: 产品免费+积分。开源侧：Wan 系列权重在 GitHub/HF 发布（Wan2.1/Wan2.2 仓库 GitHub API 核验 Apache-2.0）——
  权重与代码的许可以各仓 LICENSE 为准；产品线条款按阿里站内协议管辖，细节未逐条核验。
licenseEn: Product free + credits. Open side: Wan weights are published on GitHub/HF (Wan2.1/Wan2.2 repos
  verified Apache-2.0 via GitHub API) — weights and code are governed by each repo's LICENSE; the product line
  follows Alibaba's in-site agreements, details not verified line by line.

axes:
  model_access: >-
    万相（Wan）系列模型双轨：产品端（tongyi.aliyun.com/wanxiang）+ 开源权重（Wan-Video 组织 GitHub、
    Wan-AI 组织 HF——两组织直抓 200 核验）。产品端模型档位以站内展示为准；
    开源权重可经 runner/ComfyUI 生态本地跑（Apache-2.0 代码核验）。
  runtime: >-
    网页产品 + App；生成在阿里云端处理。开源线是它的独特面：同一模型族可在云端产品与本地部署间选。
  local_files: >-
    产品端作品与素材存云端账户；开源线权重与生成物全在你侧——两条线数据边界完全不同。
  background: >-
    产品端生成任务云端排队；开源线本地跑则完全由你的进程决定。无「关机续跑」的托管任务面（未核验到声明）。
  tools: >-
    产品内含文生图、图生图、图像编辑、文生视频/图生视频（Wan 视频线）等能力线；
    阿里云百炼（Model Studio）提供 API 线。MCP 支持未核验到官方声明。
  context: >-
    产品端以作品组织；跨会话记忆未核验到官方声明。开源线无记忆面（模型本体无状态）。
  permissions: >-
    产品端账号体系（阿里账号）；开源线无账号。训练用途开关未逐条核验。
    万相模型备案号见 cn 块（阿里云官方公示）。
  fit: >-
    适合：要「云端产品 + 开源权重」双轨（合规敏感场景可本地跑）、图+视频同族、中文语义。
    不适合：要完全托管长任务、要脱离阿里账号的产品端体验。

pitfalls:
  - 产品端与开源线是两套数据边界——「万相开源」不等于「你在产品端的作品开源」，反之亦然
  - Wan 权重 Apache-2.0 是代码仓核验——具体权重文件的许可以 HF 各仓 model card 为准，逐仓核对
  - 「通义千问/通义万相/阿里云百炼」同厂商三条线——对话、图像视频、API 平台各归各档

tags: [国产, 免费+积分, 开源权重, 图视频一体, Apache-2.0, 已备案]
related: [tongyi-qianwen, kling, flux, ollama]

sources:
  - label: 通义万相 · 官网（产品入口与能力叙事）
    url: https://tongyi.aliyun.com/wanxiang
    kind: official
  - label: Wan-Video/Wan2.2 · GitHub（开源权重线，Apache-2.0 API 核验）
    url: https://github.com/Wan-Video/Wan2.2
    kind: repo
  - label: Wan-Video/Wan2.2 · Releases（changelog）
    url: https://github.com/Wan-Video/Wan2.2/releases
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（通义万相大模型 备案号官方公示）
    url: https://help.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 阿里巴巴（通义实验室系）。
  origin_note_en: Alibaba (Tongyi Lab lineage).
  direct: yes
  direct_note: tongyi.aliyun.com/wanxiang 大陆直连实测 200（2026-10-22）。
  direct_note_en: tongyi.aliyun.com/wanxiang measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 通义万相大模型
  filing_no: Shanghai-TongYiWanXiang-202410090024
  filing_note: 备案号经阿里云百炼官方公示页核验（属地上海，2024-10 批次）；该号同时出现在手机终端进网许可等第三方引用中。
  filing_note_en: filing no. verified on Alibaba Cloud Model Studio official disclosure page (Shanghai, 2024-10 batch);
    the same no. also appears in third-party references such as handset network-access filings.
  verified: 2026-10-22
---

## 一句话定位

**通义万相是「云端产品 + Apache-2.0 开源权重」双轨的国产图视频创作台**（Wan 系列）：
合规敏感场景可本地跑，备案号经阿里云官方公示核验；产品端与开源线数据边界完全不同。

## 适合与不适合

适合：双轨可选（云端/本地）、图视频同族、中文语义。
不适合：要完全托管长任务、要产品端脱离账号。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **产品端当前模型档位与开源 Wan 版本的对应关系**（版本叙事有时差）
- **产品端训练用途开关路径**
- **开源 Wan2.2 在消费级显卡上的实际可用档**（归 models/runner 侧实测）

## 未知项清单

- 产品端模型档位完整清单（以站内展示为准）
- 各 HF 权重仓的具体许可差异（逐仓 model card 未逐条核验）
- 产品端训练用途开关（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [即梦](./jimeng.md) — 同为国产图视频一体创作台：万相有开源权重线，即梦没有。
- [FLUX](./flux.md) — 同为开源权重图生成族：FLUX 权重族与 Wan 权重族都能在本地生态跑。
