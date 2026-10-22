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
    桌面端快捷聊天/截屏功能也只是入口，处理仍在云端。
  local_files: >-
    可上传文件、图像与音频（音频上传见 release notes 2026-10-06：转写、摘要、问答）；
    上传内容存于 OpenAI 账户，归谁与留存见 permissions 维。
  background: >-
    对话即时返回；Codex Cloud 线明确「任务可在你电脑休眠时继续」（release notes 2026-09-29）。
    对话产品本体没有关机续跑形态。
  tools: >-
    官方连接器（Gmail/Calendar 等）与合作 Apps；Slides/Sites/Finances 等内建功能线；
    另有独立 API 线。插件（plugins）在 Codex 线披露，消费对话端扩展面以官方连接器为主。
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

tags: [云端, 多模态, 记忆, 商业]

related: [openai-dot, codex-cli]

sources:
  - label: OpenAI Help · ChatGPT release notes（官方更新日志，2026-10-21 经搜索快照取到正文；直连 403 为反爬拦截）
    url: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
    kind: changelog
  - label: OpenAI · How your data is used to improve model performance（官方政策页，2026-10-20 快照核验）
    url: https://openai.com/policies/how-your-data-is-used-to-improve-model-performance
    kind: docs
  - label: OpenAI Help · 你的数据如何用于提升模型性能（5722486，含设置路径与临时聊天口径）
    url: https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance
    kind: docs
  - label: OpenAI · Terms of Use（内容所有权与转让条款，2026-10-21 经搜索快照核验）
    url: https://openai.com/policies/row-terms-of-use/
    kind: docs
  - label: OpenAI · ChatGPT Pricing（定价页指针，D9：本站不采价格数字）
    url: https://openai.com/chatgpt/pricing/
    kind: pricing

last_verified: 2026-10-21
last_updated: 2026-10-21
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

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

## 未知项清单

- 跨会话记忆功能的完整边界（以官方帮助页为准，本站未逐条核验）

## 相关条目

- [Claude（对话应用）](./claude-chat.md) — 同为通用对话，训练 opt-out 机制与「安全审查例外」不同
- [Gemini（对话应用）](./gemini-chat.md) — 生态联动路线：Google 系用户的对照选择
- [豆包](./doubao-chat.md) — 中文场景对照：App 训练开关自助、API 默认不训练
