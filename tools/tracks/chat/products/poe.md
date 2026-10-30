---
id: poe
form: web
name: Poe
nameEn: Poe
vendor: Quora
homepage: https://poe.com
license: 免费+订阅（积分/点数制）。官方 Terms（poe.com/terms 代理抓核验 2026-10-30）；
  输出内容归属按该条款管辖，具体条款细节未逐条核验。
licenseEn: Free + subscription (points system). Governed by the official Terms (poe.com/terms, proxy-fetched
  2026-10-30); clause details not verified item by item.

axes:
  model_access: >-
    多模型聚合是它的本体形态：官方页当日可见「Chat with the best AI… Explore GPT-5, Claude-Sonnet-5,
    DeepSeek-R1, Veo-3.1, and thousands of others」——用户直接选模型对话，
    模型经 Poe 侧接入各家 API（各模型计费点数不同）。
  runtime: >-
    网页（poe.com）+ iOS/Android App；对话经 Poe 服务器转发到各模型 API，本机不跑模型。
    当日 poe.com 对无头抓取 307→login 403（登录墙+CF，非死链）。
  local_files: >-
    对话历史存于账户侧、登录同步；未见官方声明的本机数据面——所有模型调用都经 Poe 服务器中转，
    对话内容必然过 Poe 侧（这是聚合中转产品的结构性前提，不是可关掉的选项）。
  background: >-
    对话即时返回；异步任务形态未核验到官方声明。点数制对高频/长上下文模型有用量限制。
  tools: >-
    官方页当日可见群聊（group chat）、Leaderboard、bot 创建面（自建 bot 挂模型+人设）；
    图像/视频模型（Veo-3.1 在册）也在聚合清单内。MCP 支持未核验到官方声明。
  context: >-
    会话按对话组织、登录同步，bot 人设（自建 bot 挂模型+人设）是跨会话复用的持久配置面；
    模型侧的上下文窗口长度按各家模型各异，Poe 产品层的跨会话记忆机制未核验到官方声明。
  permissions: >-
    账号体系（注册登录）；点数制是用量权限面；训练用途开关路径未逐条核验——
    Poe 曾以「用户对话用于训练」条款引发争议，要按官方 Terms/Privacy 现行文本逐项看。
  fit: >-
    适合：一个账号横向用多家模型（含国产 DeepSeek 系）、要自建 bot 人设。
    不适合：要免费无限量用旗舰模型（点数制）、要大陆直连（未备案）、要数据不经 Poe 中转。

pitfalls:
  - Poe 是中转聚合层——你的对话经 Poe 服务器转发到各家模型 API，敏感数据要按「多一方经手」评估
  - 点数制不是「免费无限」——旗舰模型与长上下文消耗快，免费档边界要实测
  - 模型名带后缀（如 Claude-Sonnet-5）是 Poe 侧接入的具体版本——别把它等同于该厂最新能力面

tags: [多模型聚合, 点数制, bot创建, 海外, 未备案]
related: [chatgpt, claude-chat, ollama]

sources:
  - label: Poe · 官网（产品定位与模型聚合叙事，2026-10-30 代理抓 307→login 403=登录墙非死链）
    url: https://poe.com
    kind: official
  - label: Poe · Terms（官方条款，2026-10-30 代理抓 200）
    url: https://poe.com/terms
    kind: official
  - label: Poe · Privacy（官方隐私页，2026-10-30 代理抓 200）
    url: https://poe.com/privacy-policy
    kind: official
  - label: Poe · Changelog（官方更新线，changelog，2026-10-30 代理抓 200）
    url: https://poe.com/changelog
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（Quora/Poe，美国；网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (Quora/Poe, USA; no matching filing entity in the CAC registry).
  direct: no
  direct_note: poe.com 大陆直连 000（网络不可达，2026-10-30）。
  direct_note_en: poe.com measured 000 direct from mainland (network unreachable, 2026-10-30).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索百炼公示页与批次 PDF 镜像，未见 Poe/Quora 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (Bailian disclosure page and batch PDF mirrors searched 2026-10-30; no Poe/Quora entry);
    the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**Poe 是「一个账号用多家模型」的聚合对话产品**（Quora 出品）：GPT/Claude/DeepSeek/Veo 等经 Poe 侧接入、
用户直接选模型，点数制计费，自建 bot 面在册；数据全部经 Poe 服务器中转。

## 适合与不适合

适合：横向对比多家模型、自建 bot 人设、含国产模型接入。
不适合：要免费无限量旗舰模型、要大陆直连、要数据不经第三方中转。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **各模型的点数消耗与免费档边界**（点数制的具体汇率官方页不直白）
- **训练用途开关路径与默认态**（Terms/Privacy 现行文本逐项看）
- **聚合层的上下文截断策略**（经中转后各模型上下文是否打折）

## 未知项清单

- 点数汇率与免费档边界（未逐条核验）
- 训练用途开关路径与默认态（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 聚合层对各模型上下文的处理（未核验）

## 相关条目

- [ChatGPT](./chatgpt.md) — 同为对话入口：ChatGPT 只有自家模型，Poe 卖的是聚合选择权。
- [Claude（对话应用）](./claude-chat.md) — 同为海外对话产品：Claude 单厂纵深，Poe 多厂横排。
- [Ollama](../../runner/products/ollama.md) — 另一条「多模型」路线：Ollama 本机跑开源权重，Poe 云端聚合各家 API。
