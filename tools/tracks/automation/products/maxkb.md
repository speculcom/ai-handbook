---
id: maxkb
form: web
name: MaxKB
nameEn: MaxKB
vendor: 飞致云（国产）
homepage: https://maxkb.cn
license: GPL-3.0（GitHub API 当日核验 license=GPL-3.0；1Panel-dev/MaxKB 仓）；官方另有专业版/企业版
  商业发行（飞致云博客当日在册：专业版+企业版用户超 1,000 家）。
licenseEn: GPL-3.0 (GitHub API verified same day: license=GPL-3.0, 1Panel-dev/MaxKB); Fit2Cloud also sells commercial
  Professional/Enterprise editions (same-day official blog: 1,000+ paying Professional/Enterprise users).

axes:
  model_access: >-
    平台不带自有模型——对接各种主流大语言模型（官方博客当日在册口径）；自托管形态可接本地模型
    （配合 runner 类工具）；托管/商业发行的内置模型清单未逐条核验。
  runtime: >-
    开源自托管为主形态（1Panel-dev/MaxKB 仓直连 200，当日推送 2026-10-30；releases v2.10.8-lts 2026-10-22）；
    1Panel 应用商店一键部署路径在册（飞致云生态）；官方文档在 docs.fit2cloud.com/maxkb（直连 200）。
  local_files: >-
    自托管形态数据在本机（部署文档在册）——这是与托管类产品的核心差异：知识库文件、对话记录全部落在自有部署内；
    商业发行的数据面按合同形态未逐条核验。
  background: >-
    产品主轴是企业知识库问答（RAG）+工作流编排+技能（Skills）+MCP 工具调用（官方博客当日在册四能力）；
    定时与后台执行细节未逐条核验。
  tools: >-
    MCP 工具调用是官方明言能力（博客当日在册「支持 RAG、工作流编排、技能(Skills) 和 MCP 工具调用」）；
    工作流编排节点面在 docs 在册；具体连接器清单未逐条核验。
  context: >-
    知识库（RAG）是核心持久知识面；多轮对话上下文在册；跨应用记忆机制细节未逐条核验。
  permissions: >-
    GPL-3.0 强 copyleft——衍生分发义务与 Apache 家族不同（商用集成要评估传染面）；深度合成服务算法备案
    双条目在册（见 cn 块：服务提供者+服务技术支持者两个角色都备了）；训练用途开关路径未逐条核验。
  fit: >-
    适合：企业内网自托管知识库问答（数据不出域）、要 MCP 工具调用与工作流编排的国产开源方案、
    要已备案的合规叙事（算法备案双条目在册）。
    不适合：要宽松许可（GPL-3.0 copyleft）、要个人轻量上手（企业交付向）。

pitfalls:
  - **备案类别要分清**：MaxKB 通过的是**深度合成服务算法备案**（第十六批，2026-03-12 公示，服务提供者+技术支持者双条目）——不是生成式 AI 服务备案，两者是不同类别
  - maxkb.cn 大陆直连 403（CF 类拦截非死链，代理可达）——判可达性别只看官网入口，仓与文档域（GitHub/docs.fit2cloud.com）直连 200
  - GPL-3.0 ≠ Apache 家族——把 MaxKB 嵌进闭源产品前必须评估 copyleft 分发义务，与 Dify/FastGPT 的 Apache+附加条件是完全不同的合规路径

tags: [国产, 低代码, RAG, 知识库, 自托管, 开源, GPL-3.0, MCP, 企业向]
related: [fastgpt, dify, ollama]

sources:
  - label: 1Panel-dev/MaxKB · 官方仓（GPL-3.0，GitHub API 当日核验 ★23,081/pushed 2026-10-30；releases v2.10.8-lts 2026-10-22）
    url: https://github.com/1Panel-dev/MaxKB
    kind: repo
  - label: 网信办 · 境内深度合成服务算法备案清单（2026年3月/第十六批，当日下载解析：MaxKB 服务提供者条目 605 网信算备330106491701101260019号、技术支持者条目 750 网信算备330106491701101260027号，主体杭州飞致云信息科技有限公司；公告入口 beian.cac.gov.cn）
    url: https://www.cac.gov.cn/cms/pub/interact/downloadfile.jsp?filepath=NUtqEIwGiCjGm2Bhl20cvBy2HA04djr0wEW/PdA55oAbv1GA808enWaX/u3kfDU0BMF2l/f0eo8c5GOkAvXc~jZS2/Bjnic3oqu3HpPj8kk=&fText=%E5%A2%83%E5%86%85%E6%B7%B1%E5%BA%A6%E5%90%88%E6%88%90%E6%9C%8D%E5%8A%A1%E7%AE%97%E6%B3%95%E5%A4%87%E6%A1%88%E6%B8%85%E5%8D%95%EF%BC%882026%E5%B9%B43%E6%9C%88%EF%BC%89
    kind: filing
  - label: 飞致云官方博客 · MaxKB 通过深度合成服务算法备案（2026-03-12 批次口径+四能力定位，2026-10-30 检索在册）
    url: https://blog.fit2cloud.com?p=019d00c3-6400-7681-a025-e75e0318ee45/
    kind: official
  - label: MaxKB · 官方文档（docs.fit2cloud.com/maxkb，2026-10-30 直抓 200）
    url: https://docs.fit2cloud.com/maxkb/
    kind: docs

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 杭州飞致云信息科技有限公司（备案清单当日解析在册）；开源项目 1Panel-dev/MaxKB。
  origin_note_en: Hangzhou Fit2Cloud Information Technology Co., Ltd. (on record in the filing list parsed same day); open-source project 1Panel-dev/MaxKB.
  direct: yes
  direct_note: GitHub 仓与 docs.fit2cloud.com/maxkb 大陆直连实测 200（2026-10-30）；maxkb.cn 官网直连 403（CF 类拦截非死链，代理可达）——获取路径以仓与文档域为准。
  direct_note_en: the GitHub repo and docs.fit2cloud.com/maxkb measured 200 direct from mainland (2026-10-30); maxkb.cn measured 403 direct (Cloudflare-style block, not a dead link; reachable via proxy) — acquisition paths go by the repo and docs domains.
  filing: filed
  filing_no: 网信算备330106491701101260019号 / 网信算备330106491701101260027号
  filing_date: 2026-03-12
  filing_note: 第十六批《境内深度合成服务算法备案清单》（2026-03-12 公示）当日下载官方文件解析双条目在册：
    条目 605「MaxKB多模态生成合成算法-1」服务提供者=杭州飞致云信息科技有限公司（MaxKB智能体平台网站/其他，
    网信算备330106491701101260019号）；条目 750「MaxKB多模态生成合成算法」服务技术支持者（网信算备
    330106491701101260027号）；与飞致云官方博客公告交叉一致。属深度合成算法备案类别，非生成式 AI 服务备案。
  filing_note_en: the 16th "Domestic Deep-Synthesis Service Algorithm Filing List" (publicized 2026-03-12) was downloaded and parsed
    same day, two entries on record: row 605 "MaxKB multimodal generative synthesis algorithm-1" as service provider = Hangzhou
    Fit2Cloud Information Technology Co., Ltd. (MaxKB agent platform, website/other, filing no. 网信算备330106491701101260019号);
    row 750 as service technology supporter (filing no. 网信算备330106491701101260027号); consistent with Fit2Cloud's official blog
    announcement. This is the deep-synthesis algorithm filing category, not generative-AI service filing.
  verified: 2026-10-30
---

## 一句话定位

**MaxKB 是飞致云出品的国产开源企业级智能体平台**（官方博客当日口径：RAG 检索增强生成+工作流编排+技能
Skills+MCP 工具调用四能力）：GPL-3.0 开源自托管为主形态（★23,081 当日核验），**深度合成服务算法备案双条目
在册**（服务提供者+技术支持者，第十六批 2026-03-12）——企业内网「数据不出域」场景的国产合规叙事样本。

## 适合与不适合

适合：企业内网自托管知识库问答（数据不出域）、要 MCP+工作流的国产开源方案、要已备案合规叙事。
不适合：要宽松许可（GPL-3.0 copyleft）、要个人轻量上手（企业交付向）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（agent 平台不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **工作流编排节点与 Dify/FastGPT 的能力差**（三家国产同类，差异面未横向在册）
- **Skills/MCP 调用的现役边界**（官方明言能力，具体清单与稳定性未逐条核验）
- **社区版与专业版/企业版的功能切分**（商业发行存在，切分面未在册）

## 未知项清单

- 社区版与专业版/企业版功能切分（未在册）
- 连接器/插件清单（未逐条核验）
- 训练用途开关路径与默认态（未逐条核验）
- 托管 SaaS 形态是否存在（以自托管为主形态，托管面未核验）

## 相关条目

- [FastGPT](./fastgpt.md) — 同为国产开源 RAG 问答平台：FastGPT Apache+附加条件、社区生态大；MaxKB GPL-3.0、企业交付+备案叙事。
- [Dify](./dify.md) — 国产开源 agent 平台对照：Dify 通用画布出海向；MaxKB 企业内网交付向。
- [Ollama](../../runner/products/ollama.md) — 本地模型层对照：MaxKB 自托管可接本地模型，模型运行器归 runner 类。
