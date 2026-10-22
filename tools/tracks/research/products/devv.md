---
id: devv
form: web
name: Devv
nameEn: Devv
vendor: Devv AI
homepage: https://devv.ai
license: 免费+订阅。按官方条款管辖（devv.ai 站内协议线，2026-10-22 直抓核验站点可达；
  协议专页 URL 未能定位直抓——如实标注）；细节未逐条核验。
licenseEn: Free + subscription. Governed by the official in-site agreement (devv.ai reachability
  direct-fetched 2026-10-22; the dedicated agreement URL could not be located by direct fetch — honestly
  noted); details not verified line by line.

axes:
  model_access: >-
    多模型路由（界面可选多家前沿模型，官方产品面）+ 自建代码文档检索索引（产品差异点：
    实时抓官方文档）；具体模型清单未逐条清点。
  runtime: >-
    网页（devv.ai）+ 浏览器扩展（官网所见）；检索与生成在厂商云端。
  local_files: >-
    对话历史存账户侧云端；未见官方声明的本机数据面或离线模式（未逐条核验）。
  background: >-
    问答即时返回；未见官方任务队列或「关机续跑」类后台任务面（未逐条核验）。
  tools: >-
    **开发者向 AI 搜索是主轴**：代码问题→实时检索官方文档/代码示例→带链接答案；
    代码库理解问答（官网叙事）；与 coding agent 的区别：它答代码问题，不改你的代码库
    （边界裁决「搜索向对话归 research」）。
  context: >-
    以对话线程组织检索历史；跨会话记忆未核验到官方声明（未逐条核验）。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验——
    **开发者粘贴的代码片段可能含敏感信息，上传前要想清楚**。
  fit: >-
    适合：查 API 用法/报错/库文档（答案带官方文档链接）、中文开发者要直连可用的搜索问答。
    不适合：改代码库（那是 coding 大类）、粘贴敏感代码不假思索。

pitfalls:
  - Devv 是「代码问答搜索」不是 coding agent——它不改你的仓库，别按 Cursor 类预期用它
  - 答案带的文档链接质量取决于实时抓取——付费库/登录墙后的文档抓不到，链接可能到不了正文
  - devv.ai 大陆直连实测 000（2026-10-22，代理 200）——「国产团队但直连不可达」的组合要如实标注

tags: [免费+订阅, 开发者搜索, 官方文档检索, 代码问答, 需网络环境]
related: [metaso, perplexity, cursor]

sources:
  - label: Devv · 官网（产品与能力叙事）
    url: https://devv.ai
    kind: official
  - label: Devv · 官网中文入口（产品面直抓核验 2026-10-22）
    url: https://devv.ai/zh
    kind: official
  - label: Devv · 更新日志（官方更新线，changelog）
    url: https://devv.ai/zh/changelog
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: Devv AI（团队叙事为中国背景团队出海产品；注册主体未核验到官方声明——诚实标注）。
  origin_note_en: Devv AI (team narrative: a China-background team going overseas; the registered entity was
    not verified — honest labeling).
  direct: no
  direct_note: devv.ai 大陆直连实测 000（2026-10-22，代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: devv.ai measured 000 direct from mainland (2026-10-22; 200 via proxy) — unreachable without a network path.
  filing: unknown
  filing_note: 未核验到对应生成式 AI 服务备案（2026-10-22 检索）；主站面向海外，
    「未核验到」≠「未备案」——若国内线存在则口径另论。
  filing_note_en: no matching generative-AI service filing found (searched 2026-10-22); the main site targets
    overseas users — "not found" ≠ "not filed"; a domestic line, if any, is assessed separately.
  verified: 2026-10-22
---

## 一句话定位

**Devv 是开发者向的 AI 搜索问答**：代码问题→实时抓官方文档→带链接答案；
它答代码问题但不改代码库——与 coding 大类的边界就在这条线上。

## 适合与不适合

适合：API 用法/报错/库文档速查、带官方链接的答案、中文开发者。
不适合：改代码库（归 coding）、粘贴敏感代码不假思索。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **对新版框架文档（发布 <1 月）的索引新鲜度**
- **报错栈粘贴→答案的命中率**（对比直接搜 Stack Overflow）
- **免费档与订阅档的模型切换差异**

## 未知项清单

- 注册主体与备案状态（见 cn 块——主体未清）
- 当前可选模型清单（未逐条清点）
- 协议专页 URL（站内协议线未能定位直抓——如实标注）
- 训练用途开关（未逐条核验）

## 相关条目

- [秘塔 AI 搜索](./metaso.md) — 同为国产背景搜索：秘塔通用+学术，Devv 开发者垂直。
- [Perplexity](./perplexity.md) — 通用对照：Perplexity 也能答代码，Devv 的文档索引垂直度是差异。
- [Cursor](../coding/products/cursor.md) — 边界对照：Cursor 改你的代码库，Devv 只答代码问题——同是开发者 AI，主轴不同。
