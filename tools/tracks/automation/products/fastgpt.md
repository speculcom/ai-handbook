---
id: fastgpt
form: web
name: FastGPT
nameEn: FastGPT
vendor: labring（环际云，国产）
homepage: https://fastgpt.io
license: FastGPT Open Source License——GitHub API 当日核验 license=NOASSERTION，LICENSE 在册为 Apache 2.0
  加附加条件：未经书面许可不得用其源码运营多租户 SaaS 服务（对标 FastGPT.AI 形态）；使用其前端不得移除/修改
  LOGO 与版权信息（与 Dify 同款两条件口径）。
licenseEn: FastGPT Open Source License — GitHub API verified same day: license=NOASSERTION; the LICENSE on record is
  Apache 2.0 with additional conditions: no multi-tenant SaaS operation (FastGPT.AI-style) from the source code without
  written permission; the frontend LOGO/copyright may not be removed or modified (same two-condition pattern as Dify).

axes:
  model_access: >-
    平台不带自有模型——对接各家大模型（OpenAI 兼容接口为主轴）；托管版（fastgpt.io/fastgpt.cn）内置模型
    清单未逐条核验；自托管版可接本地模型（配合 runner 类工具）。
  runtime: >-
    双形态：开源仓自托管（labring/FastGPT，GitHub 直连 200，当日推送 2026-10-30）+ 官方托管版
    （fastgpt.io 国际版直连 200；fastgpt.cn 大陆版直连 200，页脚主体广州环际云计算有限公司+ICP备2023048773号在册）。
  local_files: >-
    自托管形态数据在本机数据库（MongoDB/向量库——部署文档在册）；托管版数据在官方云端。
    知识库文件上传后入库向量化，原始文件留存面未逐条核验。
  background: >-
    产品主轴是 RAG 知识库问答与应用编排（doc.fastgpt.io 文档在册）；agent/工作流编排能力在册；
    定时与后台执行细节未逐条核验。
  tools: >-
    工作流节点生态在文档在册（知识库检索/HTTP 请求/代码执行等节点）；插件与工具扩展面文档在册；
    MCP 支持未逐条核验到官方声明，按未知处理。
  context: >-
    知识库（RAG）是核心持久知识面（产品主轴）；多轮对话上下文与变量存储在册；
    跨应用记忆机制细节未逐条核验。
  permissions: >-
    开源可审计（GPL 家族之外的 Apache+附加条件，见 license）；托管版按官方云端条款；大陆版 fastgpt.cn
    有 ICP 备案在册；训练用途开关路径未逐条核验。
  fit: >-
    适合：中文知识库问答/RAG 应用（自托管可控）、要大陆直连的托管入口（fastgpt.cn）。
    不适合：要纯 Apache 2.0 无附加条件（多租户 SaaS 受限）、要代码级 agent 框架（画布/配置为主轴）。

pitfalls:
  - **两版两主体两入口**：fastgpt.io（国际托管）与 fastgpt.cn（大陆托管，页脚广州环际云计算有限公司+ICP备2023048773号）——ICP 网站备案≠生成式 AI 服务备案，别混
  - license=NOASSERTION 不是「无许可」——LICENSE 实为 Apache 2.0+两条附加条件（多租户 SaaS 限制+LOGO 保留），与 Dify 同款
  - 文档域是 doc.fastgpt.io（直连 307→200）——主站路径 /en/introduction 404，别按主站路径判文档缺失

tags: [国产, 低代码, RAG, 知识库, 自托管, 开源, Apache2.0附加条款, agentic工作流]
related: [dify, maxkb, ollama]

sources:
  - label: FastGPT · 国际版官网（2026-10-30 直抓 200）
    url: https://fastgpt.io
    kind: official
  - label: FastGPT · 大陆版（页脚主体+ICP 备案号在册，2026-10-30 直抓 200）
    url: https://fastgpt.cn
    kind: official
  - label: FastGPT · 官方文档（doc.fastgpt.io，2026-10-30 直抓 307→200）
    url: https://doc.fastgpt.io/docs/introduction/
    kind: docs
  - label: labring/FastGPT · 官方仓（GitHub API 当日核验 ★29,949/pushed 2026-10-30；releases v4.17.2 2026-10-09）
    url: https://github.com/labring/FastGPT
    kind: repo

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: labring 开源项目；大陆托管版页脚主体广州环际云计算有限公司（fastgpt.cn 当日直抓在册）。
  origin_note_en: labring open-source project; the mainland hosted version's footer entity is Guangzhou Huanji Cloud Computing Co., Ltd. (fastgpt.cn direct-fetched same day).
  direct: yes
  direct_note: fastgpt.io、fastgpt.cn、doc.fastgpt.io（307→200）、GitHub 仓大陆直连实测 200（2026-10-30）——开源+大陆托管版双获取路径。
  direct_note_en: fastgpt.io, fastgpt.cn, doc.fastgpt.io (307→200) and the GitHub repo all measured 200 direct from mainland (2026-10-30) — open source plus a mainland hosted entry.
  filing: not-filed
  filing_note: 未见于生成式 AI 服务/深度合成算法备案公示名单（2026-10-30 检索百炼公示页与第十六批批次清单，未见 FastGPT 条目）；
    fastgpt.cn 页脚 ICP备2023048773号 是网站 ICP 备案，与生成式 AI 服务备案是不同类别，不混记。
  filing_note_en: not in the generative-AI / deep-synthesis filing registries (Bailian disclosure page and the 16th batch list searched 2026-10-30; no FastGPT entry); the ICP number on fastgpt.cn's footer (ICP备2023048773号) is a website ICP registration, a different category from generative-AI service filing — not conflated.
  verified: 2026-10-30
---

## 一句话定位

**FastGPT 是国产开源的 RAG 知识库问答与应用构建平台**（文档主轴：知识库问答+agent/工作流编排）：
开源仓自托管（★29,949 当日核验）+ 官方托管双入口——fastgpt.io 国际版、fastgpt.cn 大陆版（页脚主体
广州环际云计算有限公司，ICP 备案在册）；许可是 Apache 2.0 加两条附加条件（与 Dify 同款）。

## 适合与不适合

适合：中文知识库问答/RAG 应用（自托管可控）、要大陆直连托管入口。
不适合：要纯 Apache 2.0 无附加条件（多租户 SaaS 受限）、要代码级 agent 框架。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（agent 平台不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **托管版与自托管版的能力差**（两形态并行，功能面差异未在册）
- **知识库检索质量与分块策略默认值**（RAG 主轴产品的核心质量面，文档有参数但效果未实测）
- **MCP/工具调用的现役支持面**（未逐条核验到官方声明）

## 未知项清单

- 托管版内置模型清单（未逐条核验）
- MCP 支持（未核验到官方声明）
- 训练用途开关路径与默认态（未逐条核验）
- 大陆托管版是否走生成式 AI 服务备案（公示名单未见条目，按未备案口径写）

## 相关条目

- [Dify](./dify.md) — 同为国产开源 agent 搭建平台：Dify 通用 agent 画布；FastGPT 以 RAG 知识库问答为主轴。
- [MaxKB](./maxkb.md) — 同为国产开源企业知识库问答：MaxKB GPL-3.0、飞致云企业交付向；FastGPT Apache+附加条件、社区生态大。
- [Ollama](../../runner/products/ollama.md) — 本地模型层对照：FastGPT 自托管版可接本地模型，模型运行器归 runner 类。
