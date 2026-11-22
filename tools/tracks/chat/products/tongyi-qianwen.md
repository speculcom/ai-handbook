---
id: tongyi-qianwen
form: web
name: 通义千问
nameEn: Tongyi Qianwen (Qwen Chat)
vendor: 阿里巴巴
homepage: https://tongyi.aliyun.com
license: 免费+登录。产品条款以官方站内协议为准；模型与 API 服务按阿里云百炼条款管辖（百炼文件问答页 2026-11-21 取得）。
licenseEn: Free with login. Product terms follow the official in-site agreement; model and API services are governed by Alibaba Cloud Model Studio terms (file-Q&A page fetched 2026-11-21).

axes:
  model_access: >-
    主力是阿里通义千问（Qwen）系列。Qwen 官方博客有模型发布线。开源权重线与云端对话同族。应用内模型档位以登录后界面为准。阿里云百炼是开发者 API 线，同厂商另一接口。

    文件问答页给出全文引用、切片检索与自定义处理三种模式（2026-11-21）。
  runtime: >-
    网页（tongyi.aliyun.com）+ iOS/Android App + PC 客户端。生成在阿里云端处理，本机不跑模型。

    通义产品线还有通义万相（图像/视频生成）等相邻产品，别混入本档案。百炼负责 API、文件解析与智能体编排（2026-11-21）。
  local_files: >-
    对话历史存于阿里账号侧。文件上传后由百炼解析。官方文件问答页说明聊天窗口上传仅在当前会话有效，关闭、刷新或超时即失效。

    文件上传 API 的 session_file_ids 最长 7 天、不支持长期保存。客户端不跑模型，下载的生成内容归本机（2026-11-21）。
  background: >-
    对话即时返回。深度研究/智能体在云端多步执行。官方文件问答页把「自定义处理」描述为模型按任务调用插件或 MCP Server。官方文档未给用户可暂停、续跑或查看队列的后台任务面板。

    长任务状态按具体智能体入口核对（2026-11-21）。
  tools: >-
    产品内含文档解析、图像理解、联网检索与智能体。百炼文件问答页列全文引用、切片检索（RAG）、自定义处理三种模式，并明确自定义处理可调用插件或 MCP Server。

    对话产品侧的 MCP 入口以产品内配置为准（2026-11-21）。
  context: >-
    会话历史登录同步多端。官方文件问答页说明上传文件只在当前会话有效。会话关闭即过期，说明上下文按会话隔离。跨会话记忆与用户画像官方页未单列。

    需按产品内设置核对（2026-11-21）。
  permissions: >-
    账号支持阿里/支付宝/手机号登录。官方百炼文件页说明上传文件存于当前阿里云账号的百炼存储空间。训练用途开关与数据授权按站内隐私设置管理。

    Qwen 模型备案号见 cn 块（2026-11-21）。
  fit: >-
    适合：中文问答+多模态理解、要 Qwen 开源权重同族（云端与本地双选）、阿里云生态（百炼 API）衔接。

    不适合：要办公/社交生态联动（钉钉线是另一产品面）、要完全脱离账号（2026-11-21）。
pitfalls:
  - 把「通义千问」（对话产品）、「通义万相」（图像/视频）、「阿里云百炼」（API 平台）混成一团——同厂商三条线
  - 把 Qwen 开源权重当产品本体——权重本地跑归 runner 生态，数据边界完全不同
  - 条款页无稳定直抓 URL（terms 404）——引用条款内容前先站内人工核对，别引用二手转载

tags: [国产, 免费+登录, 多模态, 开源权重同族, 已备案]
related: [deepseek-chat, chatglm-chat, ollama]

sources:
  - label: 通义千问 · 官网（产品入口与能力叙事，2026-11-21 抓取 200）
    url: https://tongyi.aliyun.com
    kind: official
  - label: Qwen · 官方博客（模型发布线，changelog，2026-11-21 抓取 200）
    url: https://qwenlm.github.io/blog/
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（通义千问大模型备案号官方公示，2026-11-21 检索）
    url: https://help.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: official

  - label: 阿里云百炼 · 文件问答（会话文件有效期与三种处理模式，2026-11-21 抓取 200）
    url: https://help.aliyun.com/zh/model-studio/file-q-a
    kind: docs
  - label: 阿里云百炼 · Qwen-Doc 文件上传与存储（2026-11-21 抓取 200）
    url: https://help.aliyun.com/zh/model-studio/data-mining-qwen-doc
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 阿里巴巴（通义实验室；备案主体阿里巴巴达摩院（杭州）科技有限公司）。
  origin_note_en: Alibaba (Tongyi Lab; filing entity Alibaba DAMO Academy (Hangzhou) Technology Co., Ltd.).
  direct: yes
  direct_note: tongyi.aliyun.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: tongyi.aliyun.com measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 通义千问大模型
  filing_name_en: Tongyi Qianwen LLM
  filing_no: ZheJiang-TongYiQianWen-20230901
  filing_note: 备案号经阿里云百炼官方公示页核验（备案单位阿里巴巴达摩院（杭州）科技有限公司）；
    该备案号同时出现在手机终端进网许可公示等第三方引用中，交叉一致。
  filing_note_en: filing no. verified on Alibaba Cloud Model Studio official disclosure page (filing entity
    Alibaba DAMO Academy (Hangzhou)); the same no. appears consistently in third-party references such as
    handset network-access filings.
  verified: 2026-11-21
---

## 一句话定位

**通义千问是阿里 Qwen 系的 C 端对话入口**：多模态理解+文档解析。
Qwen 开源权重同族可本地跑
备案号经阿里云官方公示页核验。
同厂商「千问/万相/百炼」三条线别混。

## 适合与不适合

适合：中文问答多模态、Qwen 权重云端+本地双选、阿里云生态衔接。
不适合：要社交生态联动（钉钉是另一面）、要脱离账号。

## 实测记录

本档核对官网、Qwen 博客与百炼文件问答页的能力边界。
文件有效期、智能体长任务与跨会话记忆需按账号实测。
## 未知项清单

- 对话产品内模型档位的实际路由：以登录后界面为准。
- 深度研究/智能体的长任务续跑与队列控制：官方页未单列，按具体入口实测。
- 跨会话记忆与用户画像入口：官方页未单列，按产品内设置核对。
## 相关条目

- [DeepSeek](./deepseek-chat.md) — 同为国产开源权重同族对话产品。
- [智谱清言](./chatglm-chat.md) — 同为国产大厂对话入口：清言重知识库，千问重多模态与权重生态。
