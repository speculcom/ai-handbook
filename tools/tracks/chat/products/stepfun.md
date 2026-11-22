---
id: stepfun
form: web
name: 阶跃AI
nameEn: StepFun (Step Chat)
vendor: 阶跃星辰
homepage: https://chat.stepfun.com
license: 免费+登录（部分能力需订阅）。官方隐私政策 2026-11-02 版与用户协议管辖；输出内容归属与训练口径按协议原文（2026-11-21）。
licenseEn: Free with login (some capabilities need a subscription). Governed by the official privacy policy dated 2026-11-02 and the user agreement; output ownership and training terms follow the original text (2026-11-21).

axes:
  model_access: >-
    阶跃星辰自研 Step 系列。开放权重线在 Hugging Face 有组织页（huggingface.co/stepfun-ai 当日 200）。对话产品内选模型形态以登录后界面为准。

    官方隐私政策把智能对话、语音、视频通话与任务执行列为同一产品服务面（2026-11-21）。
  runtime: >-
    网页（chat.stepfun.com，页内品牌为「阶跃AI」）+ App。生成在阶跃云端，本机不跑模型。

    当日页内可见 StepClaw、Step Audio Studio（ASR）等产品线入口。开放权重是另一条线，需自行部署（2026-11-21）。
  local_files: >-
    对话历史登录同步。上传的语音、视频、图片与文档在阶跃云端处理。官方隐私摘要列出麦克风、摄像头、相册权限及使用场景。客户端不跑模型，未见本机数据面。

    下载的生成内容归本机（2026-11-21）。
  background: >-
    对话即时返回。StepClaw 等 agent 入口在云端多步执行。官方隐私政策把「智能对话及任务执行」列为收集场景。官方页未给用户可暂停、续跑或查看队列的后台任务面板。

    长任务状态按具体入口核对（2026-11-21）。
  tools: >-
    页内可见 Web Search Tool、知识库问答、StepClaw、Step Audio Studio。官方隐私政策把智能对话与任务执行列为服务场景。

    MCP 支持官方页未列，接入需自行封装（2026-11-21）。
  context: >-
    会话历史登录同步，官方个人信息收集清单把「历史对话记录」列为提供查询与管理服务的数据。对话数据经加密、去标识化后可用于模型训练。

    跨会话长期记忆与画像入口官方页未单列（2026-11-21）。
  permissions: >-
    账号以阶跃号登录。官方隐私摘要列出麦克风、摄像头、相册权限及对应场景。对话数据在去标识化后可用于模型训练。用户可通过隐私设置与反馈渠道管理。

    具体开关路径按应用内页面核对（2026-11-21）。
  fit: >-
    适合：国产对话+开放权重生态联动。同厂商 HF 有权重可本地跑，大陆直连可用。不适合：要脱离阶跃账号、要在对话产品里跑本地模型（2026-11-21）。
pitfalls:
  - 「阶跃AI 对话产品」与「Step 开放权重」是两条线——对话产品不跑本地权重，权重线经 HF 组织页自部署（models 站有量化档案）
  - 备案号主语是「阶跃」大模型（Shanghai-JieYue-20231106，2023-11-24 备案）；后续另有「阶跃多模态」备案（2025-06-09）——多模态能力对应哪个备案要按公示批次看
  - 官网 www.stepfun.com 是厂商门户（当日纯 JS 壳，正文要经 /chat 看产品）——别把门户当对话入口

tags: [国产, 开放权重联动, 免费+登录, 已备案, 多产品线]
related: [deepseek-chat, kimi-chat, ollama]

sources:
  - label: 阶跃AI · 对话入口 chat.stepfun.com（2026-10-30 直抓 200）
    url: https://chat.stepfun.com
    kind: official
  - label: 阶跃星辰 · 厂商门户（2026-10-30 直抓 200）
    url: https://www.stepfun.com
    kind: official
  - label: 阶跃星辰 · News（官方更新线，changelog，2026-10-30 直抓 200）
    url: https://www.stepfun.com/news
    kind: changelog
  - label: 阶跃星辰 · 隐私页（2026-10-30 直抓 200）
    url: https://www.stepfun.com/privacy
    kind: official
  - label: StepFun · Hugging Face 组织页（开放权重线，2026-10-30 代理抓 200）
    url: https://huggingface.co/stepfun-ai
    kind: repo
  - label: 生成式人工智能服务已备案信息（2024年4月批 PDF 镜像：阶跃 / 上海阶跃星辰智能科技有限公司 / Shanghai-JieYue-20231106 / 2023-11-24）
    url: https://www.tjcac.gov.cn/wxdt/qg/202511/W020251112373334243305.pdf
    kind: official

  - label: 阶跃AI · 隐私政策（2026-11-02 版，2026-11-21 抓取 200）
    url: https://chat.stepfun.com/legal/privacy
    kind: docs
  - label: 阶跃AI · 个人信息收集清单（历史对话与训练用途，2026-11-21 抓取 200）
    url: https://chat.stepfun.com/legal/personal-information
    kind: docs
  - label: 阶跃AI · 算法与模型备案说明（Shanghai-JieYue-20231106，2026-11-21 抓取 200）
    url: https://chat.stepfun.com/legal/registration
    kind: official

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 上海阶跃星辰智能科技有限公司（中国）。
  origin_note_en: Shanghai Jieyue Xingchen Intelligent Technology Co., Ltd. (China).
  direct: yes
  direct_note: chat.stepfun.com 与 www.stepfun.com 大陆直连实测 200（2026-10-30）。
  direct_note_en: chat.stepfun.com and www.stepfun.com measured 200 direct from mainland (2026-10-30).
  filing: filed
  filing_no: Shanghai-JieYue-20231106
  filing_date: 2023-11-24
  filing_note: 「阶跃」备案号经网信办公示批次 PDF 镜像交叉核验（2024-04 批第 35 行：上海阶跃星辰智能科技有限公司，
    备案时间 2023-11-24）；另有「阶跃多模态」Shanghai-JieYueDuoMoTai-202505230047（2025-06-09 批）与端侧「阶跃终端AI」
    （2026-09 批，媒体报道口径）——对话产品对应哪个备案未单独核验。
  filing_note_en: The JieYue filing number cross-verified via the CAC batch PDF mirror (2024-04 batch row 35: Shanghai Jieyue Xingchen
    Intelligent Technology Co., Ltd., filed 2023-11-24); separate filings exist for JieYue multimodal (Shanghai-JieYueDuoMoTai-202505230047,
    2025-06-09 batch) and on-device JieYue terminal AI (2026-09 batch, per media reports) — which filing covers the chat product was not separately verified.
  verified: 2026-11-21
---

## 一句话定位

**阶跃AI 是阶跃星辰的国产对话产品**（chat.stepfun.com，页内品牌「阶跃AI」）：
自研 Step 系列、开放权重线在 HF 同厂组织页联动。
首批附近备案（2023-11-24），大陆直连可用。

## 适合与不适合

适合：国产对话+开放权重生态联动（权重可本地跑）、大陆直连。
不适合：要脱离阶跃账号、要在对话产品里跑本地模型。

## 实测记录

本档核对对话入口、隐私政策与个人信息收集清单的能力边界。
StepClaw 长任务、训练开关与开放权重部署需分别实测。
## 未知项清单

- StepClaw 等 agent 长任务的续跑与队列控制：官方页未列，按具体入口实测。
- 跨会话长期记忆与用户画像入口：官方页未单列，按产品内设置核对。
- 对话产品内模型档位的实际路由：以登录后界面为准。
## 相关条目

- [DeepSeek](./deepseek-chat.md) — 同为国产对话+开放权重联动：DeepSeek 权重生态更大，阶跃产品面更宽（ASR/agent 入口）。
- [智谱清言](./chatglm-chat.md) — 同为国产模型厂对话入口：智谱绑学术/政企线，阶跃绑终端与多模态线。
- [Kimi](./kimi-chat.md) — 同为国产新势力对话入口：Kimi 主打长上下文，阶跃主打多产品线。
