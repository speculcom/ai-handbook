---
id: tongyi-qianwen
form: web
name: 通义千问
nameEn: Tongyi Qianwen (Qwen Chat)
vendor: 阿里巴巴
homepage: https://tongyi.aliyun.com
license: 免费+登录。产品条款页未直抓到稳定 URL（tongyi.aliyun.com/terms 实测 404，2026-10-22）——
  输出归属与训练口径按官方站内条款管辖，本站未能直抓全文，如实标注。
licenseEn: Free with login. The product terms page has no stable directly-fetchable URL
  (tongyi.aliyun.com/terms measured 404, 2026-10-22) — output ownership and training terms are governed by
  the in-site official agreement, which this site could not fetch in full; noted honestly.

axes:
  model_access: >-
    主力是阿里通义千问（Qwen）系列——Qwen 官方博客（qwenlm.github.io/blog）有模型发布线，
    开源权重线（HF/ModelScope）与云端对话同族。应用内模型档位以登录后界面为准；
    阿里云百炼（Model Studio）是开发者 API 线，同厂商另一接口。
  runtime: >-
    网页（tongyi.aliyun.com）+ iOS/Android App + PC 客户端；生成在阿里云端处理，本机不跑模型。
    通义产品线还有通义万相（图像/视频生成）等相邻产品，别混入本档案。
  local_files: >-
    对话历史存于账户侧；文档/图片解析在云端进行。未见官方声明的本机数据面。
  background: >-
    对话即时返回；「效率/深度思考」类模式是会话内档位切换；异步任务队列形态未核验到官方声明。
  tools: >-
    产品内含文档解析、图像理解、联网检索等能力线（官网导航所见）；智能体/浏览器插件入口存在，
    细节未逐条核验。MCP 支持未核验到官方声明。
  context: >-
    会话历史登录同步多端；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（阿里/支付宝/手机号登录）；训练用途开关路径未逐条核验。Qwen 模型备案号见 cn 块（官方公示交叉核验）。
  fit: >-
    适合：中文问答+多模态理解、要 Qwen 开源权重同族（云端与本地双选）、阿里云生态（百炼 API）衔接。
    不适合：要办公/社交生态联动（钉钉线是另一产品面）、要完全脱离账号。

pitfalls:
  - 把「通义千问」（对话产品）、「通义万相」（图像/视频）、「阿里云百炼」（API 平台）混成一团——同厂商三条线
  - 把 Qwen 开源权重当产品本体——权重本地跑归 runner 生态，数据边界完全不同
  - 条款页无稳定直抓 URL（terms 404）——引用条款内容前先站内人工核对，别引用二手转载

tags: [国产, 免费+登录, 多模态, 开源权重同族, 已备案]
related: [deepseek-chat, chatglm-chat, ollama]

sources:
  - label: 通义千问 · 官网（产品入口与能力叙事）
    url: https://tongyi.aliyun.com
    kind: official
  - label: Qwen · 官方博客（模型发布线，changelog）
    url: https://qwenlm.github.io/blog/
    kind: changelog
  - label: 阿里云百炼 · 模型备案信息公示（通义千问大模型备案号官方公示）
    url: https://help.aliyun.com/zh/model-studio/model-filing-information-publicity
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 阿里巴巴（通义实验室；备案主体阿里巴巴达摩院（杭州）科技有限公司）。
  origin_note_en: Alibaba (Tongyi Lab; filing entity Alibaba DAMO Academy (Hangzhou) Technology Co., Ltd.).
  direct: yes
  direct_note: tongyi.aliyun.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: tongyi.aliyun.com measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 通义千问大模型
  filing_no: ZheJiang-TongYiQianWen-20230901
  filing_note: 备案号经阿里云百炼官方公示页核验（备案单位阿里巴巴达摩院（杭州）科技有限公司）；
    该备案号同时出现在手机终端进网许可公示等第三方引用中，交叉一致。
  filing_note_en: filing no. verified on Alibaba Cloud Model Studio official disclosure page (filing entity
    Alibaba DAMO Academy (Hangzhou)); the same no. appears consistently in third-party references such as
    handset network-access filings.
  verified: 2026-10-22
---

## 一句话定位

**通义千问是阿里 Qwen 系的 C 端对话入口**：多模态理解+文档解析，Qwen 开源权重同族可本地跑；
备案号经阿里云官方公示页核验。同厂商「千问/万相/百炼」三条线别混。

## 适合与不适合

适合：中文问答多模态、Qwen 权重云端+本地双选、阿里云生态衔接。
不适合：要社交生态联动（钉钉是另一面）、要脱离账号。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **应用内模型档位选择器实际形态**（登录后才可见）
- **训练用途开关路径与默认态**（条款页未能直抓全文，开关更要实测）
- **智能体/浏览器插件能力边界**

## 未知项清单

- 产品条款全文（terms 直抓 404，未直抓到）
- 训练用途开关路径与默认态（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 应用内模型档位分流（未登录核实）

## 相关条目

- [DeepSeek](./deepseek-chat.md) — 同为国产开源权重同族对话产品。
- [智谱清言](./chatglm-chat.md) — 同为国产大厂对话入口：清言重知识库，千问重多模态与权重生态。
