---
id: hailuo-chat
form: web
name: 海螺AI
nameEn: Hailuo AI
vendor: MiniMax（稀宇科技）
homepage: https://hailuoai.com
license: 免费+登录（部分能力需会员）。官方协议页（hailuoai.com/protocol 直抓核验 2026-10-30）；
  输出内容归属按该协议管辖，具体条款细节未逐条核验。
licenseEn: Free with login (some features need a membership). Governed by the official agreement page
  (hailuoai.com/protocol, direct-fetched 200 on 2026-10-30); clause details not verified item by item.

axes:
  model_access: >-
    MiniMax 自研 H 系列——官网当日页可见「MiniMax H3 正式上线」「海螺Agent H3 正式上线」的版本叙事；
    对话产品内不开放选模型，具体档位以登录后界面为准（未登录核实）。
  runtime: >-
    网页（hailuoai.com，对话入口在 /chat）+ App；生成在 MiniMax 云端，本机不跑模型。
    同厂商另有开发者 API 线（minimax.io，见 MiniMax Audio 档案）与视频独立域（hailuoai.video，见海螺视频档案）。
  local_files: >-
    对话与创作资产存于账户侧（官网导航有「资产」面）；未见官方声明的本机数据面。
  background: >-
    对话即时返回；异步任务形态未核验到官方声明。视频/图片生成线的排队与续跑行为未逐条核验。
  tools: >-
    官网导航当日可见 Design/资产/工具/视频/图片/音频多模态创作面；联网搜索等对话内工具未逐条核验。
    MCP 支持未核验到官方声明。
  context: >-
    会话按对话组织，创作资产（视频/图片/音频）在账户侧「资产」面集中管理、可与对话创作流衔接；
    单会话上下文窗口长度与跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（登录使用）；训练用途开关路径未逐条核验。模型层备案号见 cn 块（百炼公示页当日交叉核验）。
  fit: >-
    适合：视频+图片+音频+对话一体的国产多模态创作入口（MiniMax 生态）、要大陆直连可用。
    不适合：要选模型、要本机跑模型、要脱离 MiniMax 账号。

pitfalls:
  - 海螺AI（hailuoai.com 消费创作入口）、MiniMax 开发者线（minimax.io）、海螺视频（hailuoai.video）是同厂商三个入口——别混成一个对象
  - 备案号主语是模型层（Shanghai-MiniMax-202505230046）——对话产品入口自身的备案状态未单独核验
  - 官网主打是视频创作（「每个想法都是一部大片」）——对话线能力边界以登录后实测为准，别按视频招牌推断

tags: [国产, 多模态创作, MiniMax生态, 免费+登录, 已备案]
related: [doubao-chat, yuanbao-chat, minimax-audio]

sources:
  - label: 海螺AI · 官网（产品入口与能力叙事，2026-10-30 直抓 200）
    url: https://hailuoai.com
    kind: official
  - label: 海螺AI · 对话入口 /chat（2026-10-30 直抓 200）
    url: https://hailuoai.com/chat
    kind: official
  - label: 海螺AI · 协议页（2026-10-30 直抓 200）
    url: https://hailuoai.com/protocol
    kind: official
  - label: MiniMax · News（官方更新线，changelog，2026-10-30 代理抓 200）
    url: https://www.minimax.io/news
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（备案号交叉核验源，2026-10-30 代理抓 200）
    url: https://docs.bailian.console.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: MiniMax（上海稀宇极智科技有限公司，中国）——与 MiniMax Audio、海螺视频档案同主体。
  origin_note_en: MiniMax (Shanghai Xiyu Jizhi Technology Co., Ltd., China) — same entity as the MiniMax Audio and Hailuo Video entries.
  direct: yes
  direct_note: hailuoai.com 与 /chat 大陆直连实测 200（2026-10-30）。
  direct_note_en: hailuoai.com and /chat measured 200 direct from mainland (2026-10-30).
  filing: filed
  filing_no: Shanghai-MiniMax-202505230046
  filing_note: MiniMax 模型层备案号（阿里云百炼备案公示页当日抓取交叉核验，2026-10-30；与 MiniMax Audio 档案同源同口径）；
    主语是模型层——海螺对话产品入口自身的备案状态未单独核验。
  filing_note_en: MiniMax model-level filing number (cross-verified on the Alibaba Cloud Bailian filing disclosure page fetched 2026-10-30;
    same source and wording as the MiniMax Audio entry); the subject is the model layer — the Hailuo chat product entry's own filing
    status was not separately verified.
  verified: 2026-10-30
---

## 一句话定位

**海螺AI 是 MiniMax 的多模态创作消费入口**（对话在 /chat，官网主打视频/图片/音频创作线）：
自研 H 系列由产品侧路由不开放选模型，大陆直连可用，模型层已备案。

## 适合与不适合

适合：视频+图片+音频+对话一体的国产多模态创作、大陆直连。
不适合：要选模型、要本机跑模型、要脱离 MiniMax 账号。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **登录后对话线的模型档位与多模态输入形态**（官网叙事与产品内实际能力常有距离）
- **创作资产的商用授权边界**（生成视频/图片的会员/免费档授权差异）
- **训练用途开关路径与默认态**

## 未知项清单

- 对话产品内的模型档位分流（未登录核实）
- 跨会话记忆机制（未核验到官方声明）
- 训练用途开关路径与默认态（未逐条核验）
- 对话产品入口自身的备案状态（备案号主语是模型层）

## 相关条目

- [豆包](./doubao-chat.md) — 同为国产多模态对话入口：豆包绑抖音生态，海螺绑 MiniMax 创作生态。
- [腾讯元宝](./yuanbao-chat.md) — 同为国产大厂对话入口：元宝重微信生态，海螺重创作资产面。
- [MiniMax Audio](../../audio/products/minimax-audio.md) — 同厂商开发者线：minimax.io 是 API/能力平台，海螺是消费入口。
