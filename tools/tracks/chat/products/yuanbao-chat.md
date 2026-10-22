---
id: yuanbao-chat
form: web
name: 腾讯元宝
nameEn: Tencent Yuanbao
vendor: 腾讯
homepage: https://yuanbao.tencent.com
license: 免费+登录。官方用户协议页（yuanbao.tencent.com/agreement 直抓核验 2026-10-22）；
  输出内容归属与训练口径按该协议管辖，具体条款细节未逐条核验。
licenseEn: Free with login. Governed by the official user agreement page (direct-fetched 2026-10-22);
  output ownership and training terms follow that agreement — clause details not verified line by line.

axes:
  model_access: >-
    主力是腾讯自研混元（Hy）系列——腾讯官方新闻页有模型迭代记录（Hy3 preview 2026-04-24 发布等）；
    元宝早期以「混元 + DeepSeek 双模型切换」出名，当前对外宣传已收敛到 Hy 系列，
    模型选择器需登录后可见，本站未登录核实——以登录后界面实际展示为准。
  runtime: >-
    网页（yuanbao.tencent.com）+ iOS/Android App + PC/Mac 客户端多端；生成在腾讯云端处理，本机不跑模型。
    与腾讯 ima（知识库工作台）同属腾讯、都基于混元，但定位不同——元宝是通用助手，ima 是个人知识库 RAG。
  local_files: >-
    对话历史与收藏存于账户侧；文档精读支持多格式、单文档可处理超长文本（官方叙事），上传内容存云端账户。
    本机不跑模型——客户端只是入口。
  background: >-
    对话即时返回，无「关机续跑」形态的官方声明；深度思考是会话内推理档位，不是异步任务。
  tools: >-
    联网搜索（独家微信公众号/视频号信源是它的差异点）、文档精读、AI 作图、智能体创建、AI 编程（多语言运行即时验证）
    等产品内能力线；联动腾讯文档/微信读书。MCP 支持未核验到官方声明。
  context: >-
    对话历史登录同步多端；有「无痕临时对话」（聊完不入历史）；跨会话长期记忆机制未逐条核验。
  permissions: >-
    账号体系（微信/QQ/手机号登录）；训练用途开关路径未逐条核验。混元模型备案号见 cn 块（官方公示）。
  fit: >-
    适合：泡微信生态的人（搜公众号/视频号、评论区 @ 解读、联动腾讯文档与微信读书）、长文档精读、免费额度。
    不适合：要本机跑模型、要脱离腾讯账号体系。

pitfalls:
  - 把「元宝」与「混元」混为一谈——混元是模型（hunyuan.tencent.com 是模型/研究站，不能聊天），元宝是搭在其上的 C 端入口
  - 把「双模型自由切换」当现状——当前官方宣传已收敛到 Hy 系列，DeepSeek 是否仍可选需登录后界面确认（本站未登录核实）
  - 把元宝与腾讯 ima 当同一产品——同基于混元但一个是通用助手、一个是个人知识库工作台

tags: [国产, 免费+登录, 微信生态, 公众号信源, 文档精读, 已备案]
related: [codebuddy, kimi-chat, doubao-chat]

sources:
  - label: 腾讯元宝 · 官网（产品与能力叙事）
    url: https://yuanbao.tencent.com
    kind: official
  - label: 腾讯元宝 · 用户协议（官方页，2026-10-22 直抓核验）
    url: https://yuanbao.tencent.com/agreement
    kind: official
  - label: 腾讯元宝 · News（产品更新入口，changelog）
    url: https://yuanbao.tencent.com/news
    kind: changelog
  - label: 腾讯云 · AI 工作台备案信息（混元大模型备案号交叉核验）
    url: https://cloud.tencent.com/document/api/213/2257
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 腾讯（深圳市腾讯计算机系统有限公司）。
  origin_note_en: Tencent (Shenzhen Tencent Computer Systems Company Limited).
  direct: yes
  direct_note: yuanbao.tencent.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: yuanbao.tencent.com measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 腾讯混元助手大模型（元宝所用模型）
  filing_no: Guangdong-TencentHunyuan-20230901
  filing_note: 元宝所用混元模型备案号经腾讯云官方文档交叉核验（Guangdong-TencentHunyuan-20230901）；
    元宝作为 C 端入口承载该已备案模型。
  filing_note_en: the Hunyuan model behind Yuanbao is filed (Guangdong-TencentHunyuan-20230901, cross-verified via
    Tencent Cloud official docs); Yuanbao is the consumer entry carrying that filed model.
  verified: 2026-10-22
---

## 一句话定位

**腾讯元宝是泡在微信生态里的通用 AI 助手**：搜公众号/视频号、评论区 @ 解读、联动腾讯文档与微信读书，
长文档精读是强项；模型主力是腾讯自研混元（Hy 系列）。

## 适合与不适合

适合：微信生态用户、长文档精读、免费额度。
不适合：要本机跑模型、要脱离腾讯账号。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **登录后模型选择器是否仍含 DeepSeek**（官方宣传已收敛到 Hy，本站未登录核实）
- **训练用途开关的路径与默认态**
- **文档精读的格式与单文档长度上限**（官方叙事有「约 1000 万字」口径，未实测）

## 未知项清单

- 当前可选模型清单（登录后可见，未登录核实）
- 训练用途开关路径与默认态（未逐条核验）
- 跨会话长期记忆机制（未逐条核验）
- 文档精读格式/长度上限（未实测）

## 相关条目

- [豆包](./doubao-chat.md) — 同为国产大厂 C 端助手：豆包胜抖音登录与免费额度，元宝胜微信生态信源。
- [CodeBuddy](../../coding/products/codebuddy.md) — 同厂不同线：CodeBuddy 是编码助手，元宝是通用对话。
