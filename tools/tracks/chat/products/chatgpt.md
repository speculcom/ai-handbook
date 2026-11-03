---
id: chatgpt
form: web
name: ChatGPT
nameEn: ChatGPT
vendor: OpenAI
homepage: https://chatgpt.com/
license: 官方 Terms of Use「Ownership of content」：在你与 OpenAI 之间，你保留输入的所有权、拥有输出——「We hereby assign to you all our right, title, and interest, if any, in and to Output」；同时声明输出可能不唯一（其他用户可获相似输出），转让不延及其他用户输出。商用无档位门槛，但须遵守 Usage Policies。
licenseEn: Official Terms of Use, 'Ownership of content': as between you and OpenAI you retain Input ownership and own the Output — 'We hereby assign to you all our right, title, and interest, if any, in and to Output.' Outputs may not be unique; the assignment does not extend to other users' outputs. No tier gate on commercial use, subject to the Usage Policies.

axes:
  model_access: >-
    模型家族官方披露并按档位分流：release notes（2026-10-07）写明 Plus/Pro/Business/Enterprise
    用 GPT-6 Sol、Free/Go 用 GPT-6 Luna，Pro 推理选项用 GPT-6 Astra；聊天内可选模型。
  runtime: >-
    网页、iOS/Android、macOS/Windows 桌面端；全部生成与检索在 OpenAI 云端处理，本机不跑模型。
    桌面端内置浏览器，浏览器智能体能力并入 ChatGPT 与 Codex（官方版本说明：Atlas 浏览器于 2026-08-09 停运）。
    桌面端快捷聊天/截屏功能也只是入口，处理仍在云端。
  local_files: >-
    可上传文件、图像与音频（音频上传见 release notes 2026-10-06：转写、摘要、问答）；
    上传内容存于 OpenAI 账户，归谁与留存见 permissions 维。
  background: >-
    对话即时返回。ChatGPT 工作（官方版本说明，2026-07）面向长任务：可跟踪进度、回答问题、调整方向、
    批准重要操作，并支持一次性或按计划/触发条件重复运行。Codex Cloud 线明确「任务可在你电脑休眠时继续」
    （release notes 2026-09-29）。对话产品本体没有关机续跑形态。
  tools: >-
    Deep Research（官方 2026-02-10 更新：可连接任意 MCP 或 app、把网页搜索限定到可信站点、实时进度并可中断补充）；
    ChatGPT 智能体 agent mode（公开网站、上传文件、已连接第三方来源，官方 2025-07-17 发布、2025-08-08 向 Enterprise/Edu 推出）；
    ChatGPT 图像 2.0（2026-04-21 上线；官方 DALL·E GPT 于 2026-08-30 停用）；
    官方连接器（Gmail/Calendar 等）与合作 Apps；Slides/Sites/Finances 等内建功能线；另有独立 API 线。
  context: >-
    有记忆功能与 Projects 组织历史；临时聊天不进历史、不建记忆。
    跨会话记忆的完整边界以官方帮助页为准。
  permissions: >-
    官方政策页：个人服务默认可能用对话训练模型，可在「设置 → 数据控制」关闭或在隐私门户选
    「请勿使用我的内容训练」；临时聊天不训练；Team/Enterprise/API 默认不训练（API 需显式 opt-in）；
    你提交的点赞/点踩反馈，其整段对话仍可能用于训练。
  fit: >-
    适合「什么都能问一点」、接受云端处理的通用问答与写作。敏感内容先关训练开关或用临时聊天；
    企业数据走 Team/Enterprise/API 线。要本机处理或可换模型，这类闭源云助手都不合适。

pitfalls:
  - 把「关闭训练开关」当成临时聊天——两套独立机制，开关只管未来对话
  - 以为反馈（点赞/点踩）不受训练开关约束——官方明说整段相关对话可能入训练
  - 把消费线条款套到 API/Enterprise——两条线数据条款不同
  - 还在找 ChatGPT Atlas 浏览器——官方已宣布 2026-08-09 停运，浏览器智能体能力并入 ChatGPT 与 Codex
  - 以为 DALL·E GPT 仍是现役图像入口——官方于 2026-08-30 停用，改用 ChatGPT 图像

tags: [云端, 多模态, 记忆, 商业]

related: [openai-dot, codex-cli]

sources:
  - label: OpenAI Help · ChatGPT release notes（官方更新日志；2026-11-03 取到正文，含 Atlas 停运、ChatGPT 工作、DALL·E GPT 停用）
    url: https://help.openai.com/zh-hans-cn/articles/6825453-chatgpt-%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E
    kind: changelog
  - label: OpenAI Help · ChatGPT Atlas release notes（Atlas 版本记录，2026-03-10 最后一条）
    url: https://help.openai.com/zh-hans-cn/articles/12591856-chatgpt-atlas-release-notes
    kind: changelog
  - label: OpenAI Help · ChatGPT 智能体 release notes（2025-07-17 发布 / 2025-08-08 Enterprise+Edu）
    url: https://help.openai.com/zh-hans-cn/articles/11794368-chatgpt-agent-release-notes
    kind: changelog
  - label: OpenAI · Introducing deep research（2025-02-02 发布；2026-02-10 更新 MCP/app 连接与可信站点限制）
    url: https://openai.com/index/introducing-deep-research/
    kind: docs
  - label: OpenAI · ChatGPT 图像 2.0 现已上线（2026-04-21）
    url: https://openai.com/zh-Hans-CN/index/introducing-chatgpt-images-2-0/
    kind: docs
  - label: OpenAI · How your data is used to improve model performance（官方政策页，2026-10-20 快照核验）
    url: https://openai.com/policies/how-your-data-is-used-to-improve-model-performance
    kind: docs
  - label: OpenAI · Terms of Use（内容所有权与转让条款，2026-10-21 经搜索快照核验）
    url: https://openai.com/policies/row-terms-of-use/
    kind: docs
  - label: OpenAI · ChatGPT Pricing（定价页指针，D9：本站不采价格数字）
    url: https://openai.com/chatgpt/pricing/
    kind: pricing

last_verified: 2026-11-03
last_updated: 2026-11-03
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: no
  direct_note: chatgpt.com 大陆直连稳定超时（2026-10-20 同日两次 000）。
  direct_note_en: chatgpt.com times out consistently from mainland (000 twice).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

通用对话助手的行业定义者：网页/应用/桌面全端覆盖，模型家族按档位分流，
数据训练开关是它最常被误读的一行条款。

## 适合与不适合

适合什么都能问一点的通用问答、写作与文件分析，前提是接受云端处理。
在意「对话绝不进训练」就关数据控制开关或用临时聊天；企业数据走 Team/Enterprise/API。
要本机运行或自由换模型，它不合适——去看本地模型运行器与开源框架。

## 实测记录

本档未跑对话任务集；能力结论来自官方文档，不评价回答质量。

## 未知项清单

- 跨会话记忆功能的完整边界（以官方帮助页为准，本站未逐条核验）

## 相关条目

- [Claude（对话应用）](./claude-chat.md) — 同为通用对话，训练 opt-out 机制与「安全审查例外」不同
- [Gemini（对话应用）](./gemini-chat.md) — 生态联动路线：Google 系用户的对照选择
- [豆包](./doubao-chat.md) — 中文场景对照：App 训练开关自助、API 默认不训练

## 第一次怎么用

1. 登录后先开设置里的数据开关：把「用于改进服务」与「训练」分别看清楚，再决定是否关闭。
2. 上传一个真实文件（PDF 或表格），要求它先给目录与结论，再逐段引用原文。
3. 需要多步研究时，明确写「先列检索计划，再执行，最后给带日期的来源表」。
4. 要图像就直说尺寸、风格与用途；图像 2.0 已并入主产品，不需要另找入口。
5. 需要浏览器操作时注意：Atlas 已于 2026-08-09 停运，能力并入 ChatGPT / Codex，入口变了。

```text
请基于我上传的文件回答，规则：
1) 先列 3 条结论，每条后面标原文页码；
2) 再列文件里没有覆盖的问题，写「未找到」；
3. 不要引用文件之外的信息。
```
