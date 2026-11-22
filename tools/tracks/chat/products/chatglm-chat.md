---
id: chatglm-chat
form: web
name: 智谱清言
nameEn: ChatGLM (Zhipu Qingyan)
vendor: 智谱 AI
homepage: https://chatglm.cn
license: 免费+登录。官方服务条款页（chatglm.cn/terms 2026-10-22 取得）；输出内容归属与训练口径按该条款与隐私政策管辖（2026-11-21）。
licenseEn: Free with login. Official terms page (chatglm.cn/terms fetched 2026-10-22); output ownership and training terms follow those terms and the privacy policy (2026-11-21).

axes:
  model_access: >-
    主力是智谱自研 GLM 系列，智谱官网有模型发布线。GLM 开源权重线与云端对话同族，本地跑归 runner 档案。应用内模型档位以登录后界面为准。

    官方隐私政策把问答对话、内容生成与智能体交互列为基础功能（2026-11-21）。
  runtime: >-
    网页（chatglm.cn）+ iOS/Android App。生成在厂商云端处理，本机不跑模型。开发者入口是开放平台（open.bigmodel.cn），与对话产品同厂商两接口。

    插件在浏览器页面内运行但推理仍在云端（2026-11-21）。
  local_files: >-
    对话历史与知识库文件存于账户侧。官方隐私政策说明对话记录用于展示历史。注销/删除/超期后删除或匿名化。知识库上传文档在云端解析与检索。

    客户端不跑模型，下载成品归本机（2026-11-21）。
  background: >-
    对话即时返回。智能体与插件在云端执行。官方特定功能规则说明插件高级模式需授权截图并代表用户访问下级页面。官方页未给可暂停/续跑的任务队列。

    长任务按具体智能体入口实测（2026-11-21）。
  tools: >-
    产品内含数据分析（代码解释器类）、文生图、联网检索、PPT 生成等能力线。智能体创建面与插件入口在册。官方特定功能规则列出插件通用/高级模式与技能市场。

    MCP 支持官方页未列，接入需自行封装（2026-11-21）。
  context: >-
    会话历史登录同步。知识库是显式跨会话资料面。官方隐私政策把对话记录与知识库分列。更细的长期记忆/用户画像官方页未列，按产品内设置核对（2026-11-21）。
  permissions: >-
    账号以手机号注册。官方隐私政策说明对话记录保留以展示历史。注销/删除/超期后删除或匿名化。插件需浏览器页面信息与截图授权。训练用途开关按应用内隐私设置核对。

    GLM 备案号见 cn 块（2026-11-21）。
  fit: >-
    适合：中文长文档解析与检索问答、要 GLM 开源权重同族（云端不够就本地跑）、学生/职场文档场景。不适合：要办公/社交生态联动、要完全脱离账号体系（2026-11-21）。
pitfalls:
  - 把 chatglm.cn（对话产品）与 open.bigmodel.cn（开放平台 API）混为一谈——同厂商两接口，条款与配额各自成页
  - 把 GLM 开源权重当产品本体——权重本地跑归 runner 生态，与云端对话的数据边界完全不同
  - 「智谱清言」与「ChatGLM」与「GLM」是产品名/模型族名混用区——转述时主语按官方页走

tags: [国产, 免费+登录, 知识库, 开源权重同族, 文档解析, 已备案]
related: [deepseek-chat, kimi-chat, ollama]

sources:
  - label: 智谱清言 · 官网（产品与功能线，2026-11-21 抓取 200）
    url: https://chatglm.cn
    kind: official
  - label: 智谱清言 · 服务条款（官方页，2026-10-22 直抓核验）
    url: https://chatglm.cn/terms
    kind: official
  - label: 智谱清言 · Blog（产品更新入口，changelog，2026-11-21 抓取 200）
    url: https://chatglm.cn/blog
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（智谱清言(ChatGLM) 备案号交叉核验，2026-11-21 检索）
    url: https://help.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: official

  - label: 智谱清言 · 隐私政策（2026-08-05 版，对话记录与删除规则，2026-11-21 抓取 200）
    url: https://chatglm.cn/legal/privacyPolicySingle
    kind: docs
  - label: 智谱清言 · 特定功能使用规则（插件授权与技能市场，2026-11-21 抓取 200）
    url: https://chatglm.cn/legal/specificFunction
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 智谱 AI（北京智谱华章科技股份有限公司）。
  origin_note_en: Zhipu AI (Beijing Zhipu Huazhang Technology Co., Ltd.).
  direct: yes
  direct_note: chatglm.cn 大陆直连实测 200（2026-10-22）。
  direct_note_en: chatglm.cn measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 智谱清言(ChatGLM)
  filing_name_en: Zhipu Qingyan (ChatGLM)
  filing_no: Beijing-ChatGLM-20230821
  filing_date: 2023-08-31
  filing_note: 首批备案（备案时间 2023-08-31，属地北京）；备案号经阿里云百炼与火山方舟两页官方公示交叉核验。
  filing_note_en: first-batch filing (2023-08-31, Beijing); filing no. cross-verified on Alibaba Cloud Model Studio
    and Volcengine Ark official disclosure pages.
  verified: 2026-11-21
---

## 一句话定位

**智谱清言是「长文档解析 + 知识库检索」的国产对话产品**：GLM 开源权重同族可选本地跑，
首批备案（2023-08-31）。
产品名/模型名混用区，转述按官方页主语走。

## 适合与不适合

适合：中文长文档解析检索、GLM 权重云端+本地双选、文档密集场景。
不适合：要生态联动、要脱离账号。

## 实测记录

本档核对官网、隐私政策与特定功能规则的能力边界。
知识库检索、插件授权与智能体长任务需按账号实测。
## 未知项清单

- 智能体长任务的续跑与队列控制：官方页未列，按具体入口实测。
- 长期记忆与用户画像入口：官方页未列，按产品内设置核对。
- 知识库文件的大小与格式上限：官方功能页给出入口，具体边界按上传页提示。
## 相关条目

- [DeepSeek](./deepseek-chat.md) — 同为国产开源权重同族：GLM 与 DeepSeek 权重都能在 runner 本地跑。
- [Kimi](./kimi-chat.md) — 同为国产长文档向：Kimi 主打超长上下文，清言主打知识库检索。
