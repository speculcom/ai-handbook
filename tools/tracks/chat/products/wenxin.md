---
id: wenxin
form: web
name: 文心
nameEn: Wenxin
vendor: 百度
homepage: https://yiyan.baidu.com
license: 免费+登录。官方协议页（yiyan.baidu.com/protocol 直抓核验 2026-10-22）；
  输出内容归属与训练口径按该协议管辖，具体条款细节未逐条核验。
licenseEn: Free with login. Governed by the official agreement page (yiyan.baidu.com/protocol, direct-fetched 2026-10-22);
  output ownership and training terms follow that agreement — clause details not verified line by line.

axes:
  model_access: >-
    主力是百度自研文心大模型（ERNIE）系列；百度智能云千帆是开发者 API 线，同厂商另一接口。
    应用内模型档位以登录后界面为准，未登录核实。
  runtime: >-
    网页（yiyan.baidu.com）+ iOS/Android App + PC 客户端；生成在百度云端处理，本机不跑模型。
  local_files: >-
    对话历史存于账户侧；文档/图片解析在云端进行。未见官方声明的本机数据面。
  background: >-
    对话即时返回；异步任务队列形态未核验到官方声明。产品含「深度搜索/智能体」类能力线（官网导航所见）。
  tools: >-
    产品内含联网搜索（百度搜索生态是它的信源差异点）、文档解析、图像生成、智能体创建等能力线；
    与百度文库/网盘联动是官方叙事的一部分。MCP 支持未逐条核验。
  context: >-
    会话历史登录同步；跨会话记忆机制未核验到官方声明（未知就说未知）。
  permissions: >-
    账号体系（百度账号登录）；训练用途开关路径未逐条核验。文心大模型备案号见 cn 块（官方公示交叉核验）。
  fit: >-
    适合：泡百度生态（搜索/文库/网盘）的人、中文问答+联网检索、要文心系模型官方文档可回溯。
    不适合：要本机跑模型（文心主线不开源权重）、要脱离百度账号。
  name_history: >-
    品牌改名史（档案要写清）：文心一言（2023 首发）→ 文小言（2024-09 App 端改名）→
    「文心」统一（2025-11-02 官方口径）——同一产品不同时期三个名字，检索时三个都要认。

pitfalls:
  - 改名史陷阱——「文心一言」「文小言」「文心」是同一产品的不同时期名字，别当三个产品
  - 把 yiyan.baidu.com（对话产品）与百度智能云千帆（API 平台）混为一谈——同厂商两接口
  - 把文心当开源权重族——与 DeepSeek/GLM/Qwen 不同，文心主线不开源权重，本地跑这条线不成立

tags: [国产, 免费+登录, 百度生态, 联网搜索, 改名史, 已备案]
related: [doubao-chat, yuanbao-chat, chatglm-chat, dify]

sources:
  - label: 文心 · 官网（产品入口与能力叙事）
    url: https://yiyan.baidu.com
    kind: official
  - label: 文心 · 协议页（官方页，2026-10-22 直抓核验）
    url: https://yiyan.baidu.com/protocol
    kind: official
  - label: 文心 · Blog（产品更新入口，changelog）
    url: https://yiyan.baidu.com/blog
    kind: changelog
  - label: 百度智能云 · 模型备案信息公示（文心一言 备案号官方公示）
    url: https://cloud.baidu.cn/doc/MIAODA/s/gmuln6uw5
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 百度（北京百度网讯科技有限公司）。
  origin_note_en: Baidu (Beijing Baidu Netcom Science and Technology Co., Ltd.).
  direct: yes
  direct_note: yiyan.baidu.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: yiyan.baidu.com measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_name: 文心一言
  filing_no: Beijing-WenXinYiYan-20230821
  filing_date: 2023-08-31
  filing_note: 首批备案（备案时间 2023-08-31，属地北京）；备案号经百度智能云官方公示页核验——
    公示名仍用旧品牌「文心一言」，与产品现名「文心」并存，转述时两个都提。
  filing_note_en: first-batch filing (2023-08-31, Beijing); filing no. verified on Baidu Intelligent Cloud official
    disclosure page — the registry name still uses the old brand "Wenxin Yiyan" alongside the current product
    name "Wenxin"; mention both when relaying.
  verified: 2026-10-22
---

## 一句话定位

**文心是百度生态里的对话入口**（搜索/文库/网盘联动+联网检索）：文心系模型主线不开源权重，
首批备案（2023-08-31）；改名史「文心一言→文小言→文心」是检索时最容易踩的坑。

## 适合与不适合

适合：泡百度生态、中文问答联网检索、文心官方文档可回溯。
不适合：要本机跑模型、要脱离百度账号。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **应用内模型档位选择器实际形态**（登录后才可见）
- **训练用途开关路径与默认态**
- **与百度文库/网盘联动的数据边界**（联动是卖点，边界要实测）

## 未知项清单

- 应用内模型档位分流（未登录核实）
- 训练用途开关路径与默认态（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 文库/网盘联动的数据边界（未逐条核验）

## 相关条目

- [豆包](./doubao-chat.md) — 同为国产大厂 C 端助手：豆包泡抖音，文心泡百度。
- [腾讯元宝](./yuanbao-chat.md) — 同为生态联动型：元宝泡微信，文心泡百度。
