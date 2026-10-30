---
id: stepfun
form: web
name: 阶跃AI
nameEn: StepFun (Step Chat)
vendor: 阶跃星辰
homepage: https://chat.stepfun.com
license: 免费+登录（部分能力需订阅）。官方隐私页（www.stepfun.com/privacy 直抓核验 2026-10-30）；
  输出内容归属按官方协议管辖，具体条款细节未逐条核验。
licenseEn: Free with login (some features need a subscription). Governed by the official privacy/agreement pages
  (www.stepfun.com/privacy, direct-fetched 200 on 2026-10-30); clause details not verified item by item.

axes:
  model_access: >-
    阶跃星辰自研 Step 系列——开放权重线在 Hugging Face 有组织页（huggingface.co/stepfun-ai 当日 200，
    如 step 系列开源模型）；对话产品内选模型形态以登录后界面为准（未登录核实）。
  runtime: >-
    网页（chat.stepfun.com，页内品牌为「阶跃AI」）+ App；生成在阶跃云端。
    当日页内可见 StepClaw、Step Audio Studio（ASR）等产品线入口；本机不跑模型。
  local_files: >-
    对话历史登录同步（页内「Please log in to access your history」当日所见）；未见官方声明的本机数据面。
  background: >-
    对话即时返回；异步任务形态未核验到官方声明。StepClaw（agent 向）入口当日在册，其执行形态未逐条核验。
  tools: >-
    当日页内可见 Web Search Tool、知识库问答（Knowledge Base Q&A）、StepClaw、Step Audio Studio 等能力入口；
    MCP 支持未逐条核验。
  context: >-
    会话历史登录同步；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（登录使用）；训练用途开关路径未逐条核验。备案号见 cn 块（网信办公示 PDF 镜像交叉核验）。
  fit: >-
    适合：要国产对话+开放权重生态联动的用户（同厂商 HF 有权重可本地跑，见 models 站阶跃系列）、大陆直连可用。
    不适合：要脱离阶跃账号、要在对话产品里跑本地模型。

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

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

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
  verified: 2026-10-30
---

## 一句话定位

**阶跃AI 是阶跃星辰的国产对话产品**（chat.stepfun.com，页内品牌「阶跃AI」）：
自研 Step 系列、开放权重线在 HF 同厂组织页联动，首批附近备案（2023-11-24），大陆直连可用。

## 适合与不适合

适合：国产对话+开放权重生态联动（权重可本地跑）、大陆直连。
不适合：要脱离阶跃账号、要在对话产品里跑本地模型。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **登录后模型档位选择器实际形态**（当日未登录页只见「Tap @ to explore more」）
- **StepClaw 的执行形态**（agent 入口在册，跑在哪、能否续跑未核验）
- **训练用途开关路径与默认态**

## 未知项清单

- 对话产品内模型档位分流（未登录核实）
- StepClaw 执行位置与续跑行为（未核验）
- 跨会话记忆机制（未核验到官方声明）
- 对话产品对应的备案条目（备案号主语是「阶跃」大模型，多模态/端侧另有备案）

## 相关条目

- [DeepSeek](./deepseek-chat.md) — 同为国产对话+开放权重联动：DeepSeek 权重生态更大，阶跃产品面更宽（ASR/agent 入口）。
- [智谱清言](./chatglm-chat.md) — 同为国产模型厂对话入口：智谱绑学术/政企线，阶跃绑终端与多模态线。
- [Kimi](./kimi-chat.md) — 同为国产新势力对话入口：Kimi 主打长上下文，阶跃主打多产品线。
