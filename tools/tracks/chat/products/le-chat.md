---
id: le-chat
form: web
name: Le Chat
nameEn: Le Chat
vendor: Mistral AI
homepage: https://chat.mistral.ai
license: 免费+登录（部分能力需订阅）。按官方法务页管辖（mistral.ai 法务入口当日经 news 页可达，
  具体条款细节未逐条核验）。
licenseEn: Free with login (some features need a subscription). Governed by the official legal pages
  (reachable from mistral.ai; clause details not verified item by item).

axes:
  model_access: >-
    主力是 Mistral 自家模型（Mistral Large/Medium 等，官方 news 页当日可见 Medium 3.5 等版本叙事）；
    产品内是否混入第三方模型未逐条核验。开放权重线（同厂模型权重在 HF 开源）是另一接口。
  runtime: >-
    网页（chat.mistral.ai）+ iOS/Android App；生成在 Mistral 云端，本机不跑模型。
    当日页面对无头抓取返回 403（Cloudflare 拦截，非死链——浏览器可达性按既有口径处理）。
  local_files: >-
    对话历史存于账户侧（登录同步）；未见官方声明的本机数据面或导出面——
    开放权重线（模型权重在 HF）是另一回事，产品对话数据不随权重落在本机。
  background: >-
    对话即时返回；官方 news 页当日提及 Le Chat 的「Work mode」（复杂任务）与 Vibe 远程 agent——
    异步/agent 形态在官方叙事在册，执行细节未逐条核验。
  tools: >-
    联网搜索、代码执行（Le Chat 的 canvas/代码面）等能力在官方叙事在册；MCP 支持经 Studio 线在册
    （官方 news「built-in and custom MCPs in Studio」），Le Chat 产品内的 MCP 形态未逐条核验。
  context: >-
    会话历史登录同步；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系；训练用途开关路径未逐条核验。欧盟厂商，GDPR 管辖面（按官方隐私页口径，未逐条核验）。
  fit: >-
    适合：要 Mistral 系模型（欧洲厂商叙事、开放权重同厂联动）、要 Le Chat 的代码/Work 面。
    不适合：要大陆直连（未备案）、要选任意第三方模型（产品主轴是自家模型）。

pitfalls:
  - Le Chat（消费对话产品）、La Plateforme/Studio（开发者 API 平台）、开放权重（HF 下载自部署）是同厂商三条线——别混
  - chat.mistral.ai 对无头抓取 403 是 Cloudflare 反爬，不是产品下线——与 mistral.ai 主站（200）分开判
  - 官方 news 页产品名密集（Vibe/Work mode/Studio/Workflows）——写档案时按「Le Chat 产品内」与「同厂其他产品」分界，别把 Studio 能力记到 Le Chat 头上

tags: [欧洲厂商, 免费+登录, 开放权重联动, 代码面, 未备案]
related: [chatgpt, grok-chat, ollama]

sources:
  - label: Le Chat · 产品入口（2026-10-30 代理抓 403=Cloudflare 拦截非死链）
    url: https://chat.mistral.ai
    kind: official
  - label: Mistral AI · 主站（2026-10-30 代理抓 200）
    url: https://mistral.ai
    kind: official
  - label: Mistral AI · News（官方更新线，changelog，2026-10-30 代理抓 200；Le Chat Work mode/MCP in Studio 叙事当日在册）
    url: https://mistral.ai/news
    kind: changelog
  - label: Mistral AI · 文档站（2026-10-30 代理抓 200）
    url: https://docs.mistral.ai
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（Mistral AI，法国；网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (Mistral AI, France; no matching filing entity in the CAC registry).
  direct: unknown
  direct_note: chat.mistral.ai 大陆直连 000（网络不可达）——无法区分「被墙」与「官方区域限制」，不下结论。
  direct_note_en: chat.mistral.ai measured 000 direct from mainland (network unreachable) — cannot distinguish blocking from an official
    regional restriction; no conclusion drawn.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与批次 PDF 镜像，未见 Mistral 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and batch PDF mirrors searched 2026-10-30; no Mistral entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Le Chat 是 Mistral AI 的对话产品**（chat.mistral.ai）：主轴是自家 Mistral 模型，
官方更新线把代码面（Vibe）与复杂任务（Work mode）写进 Le Chat 叙事；欧洲厂商，未备案。

## 适合与不适合

适合：要 Mistral 系模型与欧洲厂商叙事、要代码/Work 面。
不适合：要大陆直连、要任意第三方模型聚合。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **产品内模型选择器的实际清单**（自家模型之外是否混第三方）
- **Work mode 的执行形态**（异步边界、离开页面是否续跑）
- **训练用途开关路径与默认态**（GDPR 侧设置面）

## 未知项清单

- 产品内是否混入第三方模型（未逐条核验）
- Work mode/Vibe 的执行位置与续跑行为（官方叙事在册，细节未核验）
- 跨会话记忆机制（未核验到官方声明）
- 大陆直连性质（000 无法区分墙/区域限制）

## 相关条目

- [ChatGPT](./chatgpt.md) — 同为海外旗舰对话产品：ChatGPT 生态最大，Le Chat 胜在欧洲主体与开放权重联动。
- [Grok](./grok-chat.md) — 同为模型厂自营对话入口：Grok 绑 X 生态，Le Chat 绑 Mistral 开发者线。
- [DeepSeek](./deepseek-chat.md) — 同为「模型厂+对话入口」结构：DeepSeek 开放权重生态更大。
