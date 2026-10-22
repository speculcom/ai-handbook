---
id: chatglm-chat
form: web
name: 智谱清言
nameEn: ChatGLM (Zhipu Qingyan)
vendor: 智谱 AI
homepage: https://chatglm.cn
license: 免费+登录。官方服务条款页（chatglm.cn/terms 直抓核验 2026-10-22）；
  输出内容归属与训练口径按该条款管辖，具体条款细节未逐条核验。
licenseEn: Free with login. Governed by the official terms page (chatglm.cn/terms, direct-fetched 2026-10-22);
  output ownership and training terms follow those terms — clause details not verified line by line.

axes:
  model_access: >-
    主力是智谱自研 GLM 系列（智谱官网 zhipuai.cn 有模型发布线）；GLM 开源权重线（HF/ModelScope）
    与云端对话同族——本地跑归 runner 档案。应用内模型档位以登录后界面为准。
  runtime: >-
    网页（chatglm.cn）+ iOS/Android App；生成在厂商云端处理，本机不跑模型。
    开发者入口是开放平台（open.bigmodel.cn），与对话产品同厂商两接口。
  local_files: >-
    对话历史与知识库文件存于账户侧；产品有「知识库」面（上传文档做检索问答），数据在云端账户。
  background: >-
    对话即时返回；产品含智能体与浏览器插件入口（官方导航所见），「关机续跑」形态未核验到官方声明。
  tools: >-
    产品内含数据分析（代码解释器类）、文生图、联网检索、PPT 生成等能力线（官方功能页导航所见）；
    智能体创建面存在。MCP 支持未逐条核验。
  context: >-
    会话历史登录同步；知识库是显式的跨会话资料面；更细的记忆机制未逐条核验。
  permissions: >-
    账号体系（手机号注册）；训练用途开关路径未逐条核验。GLM 模型备案号见 cn 块（官方公示交叉核验）。
  fit: >-
    适合：中文长文档解析与检索问答、要 GLM 开源权重同族（云端不够就本地跑）、学生/职场文档场景。
    不适合：要办公/社交生态联动、要完全脱离账号体系。

pitfalls:
  - 把 chatglm.cn（对话产品）与 open.bigmodel.cn（开放平台 API）混为一谈——同厂商两接口，条款与配额各自成页
  - 把 GLM 开源权重当产品本体——权重本地跑归 runner 生态，与云端对话的数据边界完全不同
  - 「智谱清言」与「ChatGLM」与「GLM」是产品名/模型族名混用区——转述时主语按官方页走

tags: [国产, 免费+登录, 知识库, 开源权重同族, 文档解析, 已备案]
related: [deepseek-chat, kimi-chat, ollama]

sources:
  - label: 智谱清言 · 官网（产品与功能线）
    url: https://chatglm.cn
    kind: official
  - label: 智谱清言 · 服务条款（官方页，2026-10-22 直抓核验）
    url: https://chatglm.cn/terms
    kind: official
  - label: 智谱清言 · Blog（产品更新入口，changelog）
    url: https://chatglm.cn/blog
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（智谱清言(ChatGLM) 备案号交叉核验）
    url: https://help.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 智谱 AI（北京智谱华章科技股份有限公司）。
  origin_note_en: Zhipu AI (Beijing Zhipu Huazhang Technology Co., Ltd.).
  direct: yes
  direct_note: chatglm.cn 大陆直连实测 200（2026-10-22）。
  direct_note_en: chatglm.cn measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 智谱清言(ChatGLM)
  filing_no: Beijing-ChatGLM-20230821
  filing_date: 2023-08-31
  filing_note: 首批备案（备案时间 2023-08-31，属地北京）；备案号经阿里云百炼与火山方舟两页官方公示交叉核验。
  filing_note_en: first-batch filing (2023-08-31, Beijing); filing no. cross-verified on Alibaba Cloud Model Studio
    and Volcengine Ark official disclosure pages.
  verified: 2026-10-22
---

## 一句话定位

**智谱清言是「长文档解析 + 知识库检索」的国产对话产品**：GLM 开源权重同族可选本地跑，
首批备案（2023-08-31）；产品名/模型名混用区，转述按官方页主语走。

## 适合与不适合

适合：中文长文档解析检索、GLM 权重云端+本地双选、文档密集场景。
不适合：要生态联动、要脱离账号。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **知识库容量上限与检索质量边界**（官方有入口，上限未核验）
- **训练用途开关路径与默认态**
- **应用内模型档位选择器实际形态**

## 未知项清单

- 知识库容量/检索细节（未逐条核验）
- 训练用途开关路径与默认态（未逐条核验）
- 应用内模型档位分流（未登录核实）
- 智能体与浏览器插件能力边界（未逐条核验）

## 相关条目

- [DeepSeek](./deepseek-chat.md) — 同为国产开源权重同族：GLM 与 DeepSeek 权重都能在 runner 本地跑。
- [Kimi](./kimi-chat.md) — 同为国产长文档向：Kimi 主打超长上下文，清言主打知识库检索。
