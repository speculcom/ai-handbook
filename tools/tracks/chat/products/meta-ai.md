---
id: meta-ai
form: web
name: Meta AI
nameEn: Meta AI
vendor: Meta
homepage: https://www.meta.ai
license: 免费+登录（Meta 账号体系）。按 Meta 官方条款管辖（ai.meta.com 法务入口当日可达，
  具体条款细节未逐条核验）。
licenseEn: Free with login (Meta account system). Governed by Meta's official terms (legal entry reachable via
  ai.meta.com; clause details not verified item by item).

axes:
  model_access: >-
    底座是 Meta 自研 Llama 系（开放权重族——权重下载自部署是另一条线，见 models 站 Llama 系列档案）；
    产品内模型版本与切换形态未逐条核验。
  runtime: >-
    网页（meta.ai）+ App，且深度嵌入 WhatsApp/Instagram/Facebook/Messenger 内的 AI 入口；
    生成在 Meta 云端，本机不跑模型。当日 www.meta.ai 对无头抓取 403（Cloudflare 拦截，非死链）。
  local_files: >-
    对话历史存于 Meta 账户侧、与社交图谱同账号体系；未见官方声明的本机数据面——
    权重开放可下载自部署是另一条线（见 models 站 Llama 系列档案），产品对话数据不随权重落在本机。
  background: >-
    对话即时返回；异步任务形态未核验到官方声明。嵌入 WhatsApp/IG 等应用内的入口与独立站
    （meta.ai）的会话是否互通、历史如何联动，未逐条核验。
  tools: >-
    图像生成（Imagine 线）、联网等能力在官方叙事在册；MCP 支持未核验到官方声明。
  context: >-
    会话按对话组织、跨 Meta 系应用的历史联动形态未逐条核验；跨会话记忆机制未核验到官方声明。
  permissions: >-
    Meta 账号体系（与社交图谱同账号是它的最大权限面）；训练用途开关路径未逐条核验——
    Meta 的数据使用口径历来敏感，要按官方隐私页逐项看。
  fit: >-
    适合：已在 Meta 系应用（WhatsApp/IG）内工作、要免费对话+图像生成的用户。
    不适合：要脱离 Meta 账号、要大陆直连（未备案）、要权重在产品内本地跑。

pitfalls:
  - Meta AI（www.meta.ai 对话助手）与 coding 大类的 meta-muse（编码云）是两条产品线——inventory 登记时已注明，别混
  - 「Llama 开放权重」不等于「Meta AI 可本地跑」——产品跑在 Meta 云上，权重线是下载自部署
  - Meta AI 嵌在 WhatsApp/IG 里=同一账号体系的数据联动——敏感使用要单独想清楚

tags: [海外大厂, 免费+登录, Llama底座, 社交生态嵌入, 未备案]
related: [grok-chat, chatgpt, meta-muse]

sources:
  - label: Meta AI · 产品入口（2026-10-30 代理抓 403=Cloudflare 拦截非死链）
    url: https://www.meta.ai
    kind: official
  - label: Meta AI · 厂商 AI 门户（2026-10-30 代理抓 200）
    url: https://ai.meta.com
    kind: official
  - label: Meta AI · Blog（官方更新线，changelog，2026-10-30 代理抓 200）
    url: https://ai.meta.com/blog/
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（Meta，美国；网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (Meta, USA; no matching filing entity in the CAC registry).
  direct: no
  direct_note: www.meta.ai 大陆直连 000（网络不可达，2026-10-30）；Meta 系服务在大陆整体不可用的既有口径一致。
  direct_note_en: www.meta.ai measured 000 direct from mainland (network unreachable, 2026-10-30); consistent with the long-standing
    unavailability of Meta services in the mainland.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与批次 PDF 镜像，未见 Meta 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and batch PDF mirrors searched 2026-10-30; no Meta entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Meta AI 是 Meta 的对话助手**（meta.ai + 嵌入 WhatsApp/IG/FB/Messenger）：
Llama 系底座、免费+Meta 账号、图像生成在册；社交生态嵌入是它区别于其他对话产品的最大特征与最大权限面。

## 适合与不适合

适合：已在 Meta 系应用内工作、要免费对话+图像生成。
不适合：要脱离 Meta 账号、要大陆直连、要权重在产品内本地跑。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **产品内模型版本与切换形态**（Llama 版本迭代在产品侧怎么呈现）
- **训练用途开关路径与默认态**（Meta 数据使用口径敏感，逐项看官方隐私页）
- **跨 WhatsApp/IG/meta.ai 的历史联动边界**

## 未知项清单

- 产品内模型版本分流（未逐条核验）
- 跨会话记忆机制与跨应用历史联动（未核验到官方声明）
- 训练用途开关路径与默认态（未逐条核验）
- MCP 支持（未核验到官方声明）

## 相关条目

- [Grok](./grok-chat.md) — 同为「社交生态嵌入的对话助手」：Grok 绑 X，Meta AI 绑 WhatsApp/IG。
- [ChatGPT](./chatgpt.md) — 同为海外大厂旗舰对话入口：ChatGPT 独立生态，Meta AI 寄生社交图谱。
- [Meta Muse](../../coding/products/meta-muse.md) — 同厂商另一产品线：Muse 是编码/构建云，Meta AI 是消费对话助手。
