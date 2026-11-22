---
id: hailuo-chat
form: web
name: 海螺AI
nameEn: Hailuo AI
vendor: MiniMax（稀宇科技）
homepage: https://hailuoai.com
license: 免费+登录（部分能力需会员）。输出内容归属按官方用户协议与付费服务协议管辖；具体条款细节以协议原文为准（2026-11-21）。
licenseEn: Free with login (some features need a membership). Output ownership follows the official user agreement and paid-service agreement; clause details are governed by the original text (2026-11-21).

axes:
  model_access: >-
    MiniMax 自研 H 系列。官网可见「MiniMax H3 正式上线」「海螺 Agent H3 正式上线」的版本叙事。对话产品内不开放选模型，具体档位以登录后界面为准。

    同厂商开发者 API 线另在海螺视频与 MiniMax Audio 档案中分列（2026-11-21）。
  runtime: >-
    网页（hailuoai.com，对话入口在 /chat）+ App。生成在 MiniMax 云端，本机不跑模型。同厂商另有开发者 API 线与视频独立域。

    三个入口共用 MiniMax 账号体系但产品面不同（2026-11-21）。
  local_files: >-
    对话与创作资产存于 MiniMax 账号侧。官网导航有「资产」面集中管理视频/图片/音频。官方隐私政策说明对话输入与反馈会用于模型训练并做去标识化。未列本机模型或离线工程文件。

    下载的成品归本机（2026-11-21）。
  background: >-
    对话即时返回。视频/图片/音频生成在云端排队。官方产品页把生成放在创作流内。未给用户可暂停、续跑或导出队列状态的面板。

    关闭页面后任务是否继续按具体生成入口实测（2026-11-21）。
  tools: >-
    官网导航可见 Design、资产、工具、视频、图片、音频多模态创作面。对话内联网搜索与工具调用未在官方隐私政策中逐项列出。

    MCP 支持官方页未列，接入需自行封装（2026-11-21）。
  context: >-
    会话按对话组织，创作资产在账户侧「资产」面集中管理，可与对话创作流衔接。官方隐私政策只说明按上下语境生成回复。未列跨会话长期记忆或用户画像入口（2026-11-21）。
  permissions: >-
    账号登录使用，免费+会员分层。官方用户协议许可个人、可撤销、非商业使用。商业复制/分发需书面授权。隐私政策说明对话数据用于训练并去标识化。

    训练开关与会员权益按应用内页面核对（2026-11-21）。
  fit: >-
    适合：视频+图片+音频+对话一体的国产多模态创作入口（MiniMax 生态）、要大陆直连可用。不适合：要选模型、要本机跑模型、要脱离 MiniMax 账号（2026-11-21）。
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

  - label: 海螺AI · 隐私政策（对话数据用于训练与去标识化，2026-11-17 更新）
    url: https://hailuoai.com/doc/zh/privacy-policy.html
    kind: docs
  - label: 海螺AI · 用户协议（个人非商业许可，2026-11-13 更新）
    url: https://hailuoai.com/doc/zh/user-agreement.html
    kind: docs
  - label: 海螺AI · 付费服务协议（输入内容权利与商业授权，2026-11-21 抓取 200）
    url: https://hailuoai.com/doc/zh/payment-policy.html
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

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
  verified: 2026-11-21
---

## 一句话定位

**海螺AI 是 MiniMax 的多模态创作消费入口**（对话在 /chat，官网主打视频/图片/音频创作线）：
自研 H 系列由产品侧路由不开放选模型，大陆直连可用，模型层已备案。

## 适合与不适合

适合：视频+图片+音频+对话一体的国产多模态创作、大陆直连。
不适合：要选模型、要本机跑模型、要脱离 MiniMax 账号。

## 实测记录

本档核对官网、用户协议与隐私政策的能力边界。
视频生成排队、训练开关与资产导出需按账号实测。
## 未知项清单

- 视频/图片/音频生成关闭页面后的续跑行为：官方页未列，按具体生成入口实测。
- 对话内联网搜索与工具调用的完整清单：官方隐私政策未逐项列出。
- 训练用途开关的默认态与关闭路径：按应用内隐私设置核对。
## 相关条目

- [豆包](./doubao-chat.md) — 同为国产多模态对话入口：豆包绑抖音生态，海螺绑 MiniMax 创作生态。
- [腾讯元宝](./yuanbao-chat.md) — 同为国产大厂对话入口：元宝重微信生态，海螺重创作资产面。
- [MiniMax Audio](../../audio/products/minimax-audio.md) — 同厂商开发者线：minimax.io 是 API/能力平台，海螺是消费入口。
