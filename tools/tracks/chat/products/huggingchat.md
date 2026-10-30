---
id: huggingchat
form: web
name: HuggingChat
nameEn: HuggingChat
vendor: Hugging Face
homepage: https://huggingface.co/chat
license: 产品免费（HF 账号可选）；前端代码 Apache-2.0（官方仓 huggingface/chat-ui，GitHub API 当日核验）；
  各模型按其自身权重许可使用。
licenseEn: Product free (HF account optional); frontend code Apache-2.0 (official repo huggingface/chat-ui,
  GitHub API verified same day); each model used under its own weights license.

axes:
  model_access: >-
    开源模型聚合是它的本体形态：当日页内可见「Models 137」清单与 Omni 自动路由
    （官方文案「Omni automatically picks the best AI model… You can also choose from any available open source models」）——
    用户直接选开源模型，全部托管在 HF 推理侧。
  runtime: >-
    网页（huggingface.co/chat）；前端开源（chat-ui 仓 Apache-2.0，当日 ★11,004/pushed 2026-10-30）——
    可自部署（runner 类的 text-generation-webui 等是另一条本机路线）。托管版生成在 HF 侧。
  local_files: >-
    托管版对话历史存于账户/浏览器侧；自部署版数据完全在自己机器上（这是它与托管对话产品的结构性差别）。
  background: >-
    对话即时返回；异步任务形态未核验到官方声明。当日页内新增「ML Intern」入口（papers/training/spaces 向）。
  tools: >-
    开源前端的 MCP 工具接入在官方 README 在册（经 OpenAI function calling 调用 MCP server 暴露的工具、
    可经 env 预配置受信 server、用户也能在界面自行添加并做健康检查，预配置示例含 Web Search (Exa)）；
    托管版按同一代码库运行，具体开关形态未逐条核验。
  context: >-
    会话按对话组织、托管版历史存于账户/浏览器侧；跨会话记忆机制未核验到官方声明——
    开源前端的数据层完全归自部署者管辖，这是它与托管对话产品的结构性差别。
  permissions: >-
    HF 账号可选（不登录也能用，功能受限）；数据口径按 HF 隐私页与所选模型许可双重管辖，未逐条核验。
  fit: >-
    适合：只用开源模型、要一个账号横排 137 个开源档、要参考/自部署开源 chat 前端。
    不适合：要用闭源旗舰模型（GPT/Claude 不在列）、要大陆直连（未备案）。

pitfalls:
  - HuggingChat 只有开源模型——它与 Poe 同为聚合但模型池完全不同（Poe 含闭源 API）
  - 「前端开源可自部署」与「托管版跑 HF 推理」是两件事——自部署要自己接推理后端（挂 runner 类工具）
  - 各模型许可不同（有的商用限制）——聚合界面不改变每个权重自身的许可条款

tags: [开源聚合, 前端开源, Apache-2.0, 免费, 未备案]
related: [poe, ollama, deepseek-chat]

sources:
  - label: HuggingChat · 产品入口（2026-10-30 代理抓 308→200；Models 137/Omni/ML Intern 当日在册）
    url: https://huggingface.co/chat
    kind: official
  - label: HuggingChat · Terms（产品条款，2026-10-30 代理抓 200）
    url: https://huggingface.co/chat/terms
    kind: official
  - label: HuggingChat · Privacy（产品隐私页，2026-10-30 代理抓 200）
    url: https://huggingface.co/chat/privacy
    kind: official
  - label: chat-ui · 官方仓（前端代码，Apache-2.0，2026-10-30 GitHub API 核验 ★11,004/pushed 2026-10-30）
    url: https://github.com/huggingface/chat-ui
    kind: repo
  - label: chat-ui · Releases（变更记录，2026-10-30 代理抓 200）
    url: https://github.com/huggingface/chat-ui/releases
    kind: changelog
  - label: chat-ui · 文档（2026-10-30 代理抓 200）
    url: https://huggingface.co/docs/chat-ui/main/index
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（Hugging Face，美国；网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (Hugging Face, USA; no matching filing entity in the CAC registry).
  direct: no
  direct_note: huggingface.co 大陆直连 000（网络不可达，2026-10-30；既有口径：HF 主域在大陆长期不可达，镜像站是另一话题）。
  direct_note_en: huggingface.co measured 000 direct from mainland (network unreachable, 2026-10-30; long-standing HF unavailability;
    mirror sites are a separate topic).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与批次 PDF 镜像，未见 Hugging Face 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and batch PDF mirrors searched 2026-10-30; no Hugging Face entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**HuggingChat 是「只用开源模型」的聚合对话产品**（HF 出品，当日 137 个模型+Omni 自动路由）：
前端 chat-ui 开源（Apache-2.0）可自部署——它同时是产品，也是开源 chat 前端的参考实现。

## 适合与不适合

适合：只用开源模型、横排对比开源档、参考/自部署开源前端。
不适合：要用闭源旗舰模型、要大陆直连。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **Omni 自动路由的选择逻辑与可解释性**（官方只说 picks the best）
- **托管版对话数据的留存与训练口径**（HF 隐私页逐项看）
- **自部署 chat-ui 的推理后端接入成本**（官方文档有路径，实操未测）

## 未知项清单

- Omni 路由逻辑细节（未核验）
- 托管版数据留存与训练口径（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 托管版 MCP server 开关的具体形态（README 在册，托管界面未逐条核验）

## 相关条目

- [Poe](./poe.md) — 同为多模型聚合：Poe 含闭源 API 池，HuggingChat 只有开源模型池。
- [Ollama](../../runner/products/ollama.md) — 同为开源模型路线：Ollama 本机跑，HuggingChat 托管用（前端也可自部署配本机后端）。
- [DeepSeek](./deepseek-chat.md) — 开源模型也可用厂自营入口：DeepSeek 官方入口单厂纵深，HuggingChat 多厂横排。
