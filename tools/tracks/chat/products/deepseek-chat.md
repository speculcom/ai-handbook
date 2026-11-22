---
id: deepseek-chat
form: web
name: DeepSeek
nameEn: DeepSeek Chat
vendor: 深度求索
homepage: https://chat.deepseek.com
license: 免费注册使用。API 按 token 峰谷计费（官方模型与价格页）。按官方 Terms of Use 与隐私政策管辖：Outputs 权利让渡给用户。对外传播须核实并标注 AI 生成。训练用途可在设置中退出（2026-11-21）。
licenseEn: Free with registration; API billed per token on peak/off-peak rates (official models and pricing page). Governed by the official Terms of Use and privacy policy: Output rights are assigned to the user, redistribution requires accuracy checks and AI labelling, and training use can be opted out in settings (2026-11-21).

axes:
  model_access: >-
    消费应用与 API 共用官方 V4 家族。

    API 模型页列 `deepseek-flash`（DeepSeek-V4.1-Flash-1017，文本+图像输入） 与 `deepseek-v4-pro`（DeepSeek-V4-Pro-0813，文本输入）。

    两者均为 1M 上下文、最大 384K 输出、默认思考模式。App 与网页可用「专家模式」切到 V4 Pro。开源权重是同一厂商的另一面。本地跑归 runner 档案（2026-11-21）。
  runtime: >-
    **依据：** 网页 chat.deepseek.com、iOS/Android App 与 API 都能用。API 地址是 `https://api.deepseek.com`， 兼容 OpenAI Chat Completions、Responses 与 Anthropic Messages。生成在厂商云端，本机不跑模型（2026-11-21）。
  local_files: >-
    对话历史、上传文件与图片存账户侧云端。隐私政策允许在设置中复制或删除聊天历史。API 侧输入随请求处理，文件能力由服务端解析后拼进上下文。

    产品本体不承载本地模型文件（2026-11-21）。
  background: >-
    对话流式返回，长回答在会话内生成。没有独立离线任务队列。深度思考是单次请求内的推理档位（low/high/max），不是异步任务。

    云端任务型 agent 属 DeepSeek Harness 另档（2026-11-21）。
  tools: >-
    App 与网页对话已支持联网搜索、文件输入（PDF/Office/图片）、阅读链接、语音交互与安全校验。同组能力已开放为 API 工具。

    `deepseek_web_search`、`deepseek_read_url`、文件解析、OCR、ASR、TTS。

    API 另有 JSON Output、Tool Calls、对话前缀续写，以及 Responses/Anthropic 兼容（2026-11-21）。
  context: >-
    上下文按会话与模型窗口计。V4 全系 1M 上下文、最大 384K 输出。会话历史按对话保存，登录后跨端同步，可在设置中复制或删除。官方功能面只列单会话上下文与历史管理。

    跨会话复用由用户手动带回（2026-11-21）。
  permissions: >-
    账号（邮箱、手机号或第三方登录）即可免费使用。API 按 token 计费，峰谷定价。北京时间工作日 9–12、14–18 为高峰，其余半价。

    隐私政策允许在设置中管理聊天历史，并提供训练用途退出权。条款把 Outputs 权利让渡给用户。对外传播须核实真实性并标注 AI 生成（2026-11-21）。
  fit: >-
    适合：中文推理与长文。1M 上下文。要官方模型文档与 OpenAI/Anthropic 双协议。API 与开源权重同族可选。

    不适合：要跨会话记忆。要后台长任务或工作流。要办公套件生态联动（2026-11-21）。
pitfalls:
  - 把对话产品与 API 平台混为一谈。chat.deepseek.com 与 platform.deepseek.com 同厂商两接口，条款与配额各自成页
  - 把开源权重当产品本体。权重本地跑归 Ollama/llama.cpp 等 runner，与云端对话产品的数据边界完全不同
  - 直抓 chat.deepseek.com 返回 429 是限流不是站点死亡（2026-10-22 实测）。浏览器可达

tags: [国产, 免费+注册, 推理模式, 开源权重同族, 已备案]
related: [ollama, llama-cpp, kimi-chat]

sources:
  - label: DeepSeek · 官网（产品入口与 V4.1 Flash 更新，2026-11-21 抓取 200）
    url: https://www.deepseek.com/
    kind: official
  - label: DeepSeek API · 模型与价格（V4.1-Flash-1017 / V4-Pro-0813、1M 上下文、384K 输出，2026-11-21 抓取 200）
    url: https://api-docs.deepseek.com/zh-cn/quick_start/pricing/
    kind: docs
  - label: DeepSeek API · V4 发布（1M 上下文、专家模式与开源，2026-11-21 抓取 200）
    url: https://api-docs.deepseek.com/zh-cn/news/news260424/
    kind: changelog
  - label: DeepSeek API · 更新日志（联网搜索、文件、链接、语音开放为 API 工具，2026-11-21 抓取 200）
    url: https://api-docs.deepseek.com/zh-cn/updates/
    kind: changelog
  - label: DeepSeek API · 获取模型列表（上下文/输出/模态/effort 元数据，2026-11-21 抓取 200）
    url: https://api-docs.deepseek.com/zh-cn/api/list-models/
    kind: docs
  - label: DeepSeek · 隐私政策（输入、上传文件、聊天历史、训练退出与删除，2026-11-21 抓取 200）
    url: https://cdn.deepseek.com/policies/en-UK/deepseek-privacy-policy.html
    kind: docs
  - label: DeepSeek · Terms of Use（Outputs 权利让渡、AI 标注与训练退出，2026-11-21 抓取 200）
    url: https://cdn.deepseek.com/policies/en-UK/deepseek-terms-of-use.html
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 深度求索（杭州）。
  origin_note_en: DeepSeek (Hangzhou).
  direct: yes
  direct_note: chat.deepseek.com 大陆直连实测 429（2026-10-22）。限流但可达，非站点死亡。
  direct_note_en: chat.deepseek.com measured 429 direct from mainland (2026-10-22) — rate-limited but reachable, not dead.
  filing: filed
  filing_name: 求索对话 DeepSeek Chat
  filing_name_en: Qiusuo Chat (DeepSeek Chat)
  filing_no: Beijing-DeepseekChat-202404280016
  filing_note: 备案号经阿里云百炼与火山方舟两页官方公示交叉核验。属地北京，2024 年新增批次。
  filing_note_en: filing no. cross-verified on Alibaba Cloud Model Studio and Volcengine Ark official disclosure pages;
    Beijing jurisdiction, added in a 2024 batch.
  verified: 2026-11-21
---

## 一句话定位

**DeepSeek 是「推理向问答 + 官方模型文档可回溯」的国产对话产品**：云端对话与 API 文档同族，
开源权重线在站外可选；备案号经两家云厂商官方公示页交叉核验。

## 适合与不适合

适合：中文推理问答、要模型文档可回溯、云端与本地权重同族可选。
不适合：要后台长任务、要办公/社交生态联动。

## 实测记录

本档核对 DeepSeek 官网、V4 发布与 API 文档、隐私政策与使用条款。
App 各端功能差异、长上下文实际可用度与峰谷计费需按账号实测。
## 未知项清单

- App 内模型档位与 API 模型名的逐项映射：以登录后模型选择器为准。
- 跨会话记忆：官方功能面列单会话上下文与历史管理，跨会话复用由用户手动带回。
- 文件与对话的云端保留期限：隐私政策按提供服务所必需期间保留，删除后按流程处理。
## 相关条目

- [豆包](./doubao-chat.md) — 同为国产通用对话：豆包重生态联动与文生图，DeepSeek 重推理与文档可回溯。
- [智谱清言](./chatglm-chat.md) — 同为国产且开源权重同族：GLM 与 DeepSeek 权重都可在 runner 里本地跑。
