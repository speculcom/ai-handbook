---
id: deepseek-chat
form: web
name: DeepSeek
nameEn: DeepSeek Chat
vendor: 深度求索
homepage: https://chat.deepseek.com
license: 免费+注册。官方 Terms of Use（cdn.deepseek.com 直抓核验 2026-10-22）授予用户对 Outputs 的使用权，
  对外传播 AI 生成内容须自行核实真实性并标注生成来源；具体条款细节未逐条核验。
licenseEn: Free with registration. The official Terms of Use (direct-fetched 2026-10-22) grant users rights over
  Outputs; disseminating AI-generated content requires verifying accuracy and labeling its generated origin —
  clause details not verified line by line.

axes:
  model_access: >-
    消费应用与 API 线共用官方模型族：api-docs.deepseek.com 官方文档列模型名与版本记录（news 页有模型更新公告）；
    应用内模型档位以登录后界面展示为准。开源权重线（HF/ModelScope）是同一厂商的另一面——本地跑归 runner 档案。
  runtime: >-
    网页（chat.deepseek.com）+ iOS/Android App；生成在厂商云端处理，本机不跑模型。
    API 线（platform.deepseek.com）是开发者入口，与对话产品同厂商两接口。
  local_files: >-
    对话历史存于账户侧；上传文件解析在云端进行。未见官方声明的本机数据面——对话产品不承载本地文件。
  background: >-
    对话即时返回，无离线任务队列形态（官方未声明后台任务面）；「深度思考」模式是会话内的推理档位切换，
    不是异步任务。
  tools: >-
    联网搜索与文件解析是产品内能力线；无自建 agent/工作流面（官方未声明）。MCP 支持未核验到官方声明。
  context: >-
    会话历史按对话组织、登录同步；跨会话记忆机制未核验到官方声明（未知就说未知）。
    上下文长度按模型档决定，官方文档给模型参数页。
  permissions: >-
    账号体系（手机号注册）；训练用途口径见官方隐私政策与「Model Mechanism and Training Methods」专页
    （cdn.deepseek.com 直抓所见入口），具体开关路径未逐条核验。
  fit: >-
    适合：中文推理向问答、要官方模型文档可回溯（API 文档质量在国产里突出）、开源权重与云端同族可选。
    不适合：要后台长任务/工作流、要生态联动（办公/社交套件）。

pitfalls:
  - 把对话产品与 API 平台混为一谈——chat.deepseek.com 与 platform.deepseek.com 同厂商两接口，条款与配额各自成页
  - 把开源权重当产品本体——权重本地跑归 Ollama/llama.cpp 等 runner，与云端对话产品的数据边界完全不同
  - 直抓 chat.deepseek.com 返回 429 是限流不是站点死亡（2026-10-22 实测）——浏览器可达

tags: [国产, 免费+注册, 推理模式, 开源权重同族, 已备案]
related: [ollama, llama-cpp, kimi-chat]

sources:
  - label: DeepSeek API Docs · 官方文档（模型名/版本/news 更新线）
    url: https://api-docs.deepseek.com/
    kind: official
  - label: DeepSeek API Docs · News（模型更新公告，changelog）
    url: https://api-docs.deepseek.com/news/news250324
    kind: changelog
  - label: DeepSeek · Terms of Use（官方条款，2026-10-22 直抓核验）
    url: https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html
    kind: official
  - label: 阿里云百炼 · 模型备案信息公示（求索对话 DeepSeek Chat 备案号交叉核验）
    url: https://help.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 深度求索（杭州）。
  origin_note_en: DeepSeek (Hangzhou).
  direct: yes
  direct_note: chat.deepseek.com 大陆直连实测 429（2026-10-22）——限流但可达，非站点死亡。
  direct_note_en: chat.deepseek.com measured 429 direct from mainland (2026-10-22) — rate-limited but reachable, not dead.
  filing: filed
  filing_name: 求索对话 DeepSeek Chat
  filing_no: Beijing-DeepseekChat-202404280016
  filing_note: 备案号经阿里云百炼与火山方舟两页官方公示交叉核验；属地北京，2024 年新增批次。
  filing_note_en: filing no. cross-verified on Alibaba Cloud Model Studio and Volcengine Ark official disclosure pages;
    Beijing jurisdiction, added in a 2024 batch.
  verified: 2026-10-22
---

## 一句话定位

**DeepSeek 是「推理向问答 + 官方模型文档可回溯」的国产对话产品**：云端对话与 API 文档同族，
开源权重线在站外可选；备案号经两家云厂商官方公示页交叉核验。

## 适合与不适合

适合：中文推理问答、要模型文档可回溯、云端与本地权重同族可选。
不适合：要后台长任务、要办公/社交生态联动。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **应用内模型档位选择器的实际形态**（登录后才可见，本站未登录核实）
- **训练用途开关的路径与默认态**（隐私政策入口已见，开关未逐条核验）
- **文件解析的格式与大小上限**（产品页有叙事，边界未核验）

## 未知项清单

- 应用内模型档位分流细节（未登录核实）
- 训练用途开关路径与默认态（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 文件解析格式/大小上限（未核验）

## 相关条目

- [豆包](./doubao-chat.md) — 同为国产通用对话：豆包重生态联动与文生图，DeepSeek 重推理与文档可回溯。
- [智谱清言](./chatglm-chat.md) — 同为国产且开源权重同族：GLM 与 DeepSeek 权重都可在 runner 里本地跑。
