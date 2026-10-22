---
id: gemini-chat
form: web
name: Gemini（对话应用）
nameEn: Gemini (chat app)
vendor: Google
homepage: https://gemini.google.com/
license: 官方 Gemini API 附加条款「Use of Generated Content」口径：Google 不主张生成内容所有权（「Google won't claim ownership over that content」）；商用按适用法律合规使用，API 返回内容可能需向你的用户提供归属信息；官方同时声明输出可能与他人相似，并保留水印与 SynthID 溯源标记。
licenseEn: Official Gemini API Additional Terms, 'Use of Generated Content': Google does not claim ownership of generated content; commercial use must comply with applicable law, and API-returned content may require attribution to your users. Google notes outputs may be similar across users and reserves watermarking and SynthID provenance marks.

axes:
  model_access: >-
    模型家族官方 release notes 披露并按订阅档位分流：2026-10-13 条目写明 Gemini 4 Argon
    面向 Google AI Pro & Ultra 订阅用户在全球推出；免费档与付费档可用模型不同，以 release notes 为准。
  runtime: >-
    网页为主入口；桌面端有官方应用——Windows 应用（release notes 2026-09-10，Alt+Space 唤起）
    与 macOS 应用（2026-07-29 语音创作条目、2026-10-13 Antigravity 编码条目）；生成在 Google 云端处理。
  local_files: >-
    支持多模态输入与文件上传；官方隐私声明明确不直接拿 Gmail/Drive/Photos 原库训练，
    但回答过程中产生的摘要、摘录与推断会被用于训练（Connected Apps 个人化页）。
  background: >-
    对话即时返回；Skills 功能（release notes 2026-09-30）是可复用的指令集、可自动匹配触发，
    但没有「关机续跑」形态的官方声明。
  tools: >-
    Google 生态联动（搜索、Workspace、Chrome）是主卖点；Connected Apps 可接第三方工具
    （含 MCP server 工具，官方帮助页 16836988）；Gemini macOS 应用内置 Antigravity 编码 agent（2026-10-13）。
  context: >-
    有记忆与个性化功能；Gems（定制指令）将被 Skills 取代并自动迁移（release notes 2026-09-30）。
    跨会话记忆的完整边界以官方帮助页为准。
  permissions: >-
    官方 Gemini Apps 隐私声明（2026-10-13 更新）：Keep Activity 开启时提示、生成内容与反馈
    用于改进 Google 服务（含训练生成式模型）；关闭后未来对话不用于训练（除非提交反馈）；
    临时聊天与关闭活动记录时保留 72 小时、不用于训练；人工审核员会审阅部分数据——官方提醒勿输入机密信息。
  fit: >-
    已在 Google 生态里工作的人——联动是真优势。在意训练就关 Keep Activity；
    在意机密内容按官方提醒不要输入。要本机跑模型或自由换模型，这类闭源云助手都不合适。

pitfalls:
  - 把「不直接训练 Gmail/Drive 原库」读成「你的对话内容不训练」——回答中产生的摘要与推断仍会被训练（官方明写）
  - 把 Keep Activity 与临时聊天混为一谈——两套机制，前者管未来对话训练，后者管留存与历史
  - 把 API 条款套到消费应用——Gemini Apps 隐私声明与 Gemini API 附加条款是两份文件

tags: [云端, 多模态, 生态联动, 记忆, 商业]

related: [gemini-cli, google-adk]

sources:
  - label: Google · Gemini release notes（官方更新日志，2026-10-21 经代理直抓核验 4 Argon 档位分流/Skills/Windows 应用/Antigravity 条目）
    url: https://gemini.google/release-notes
    kind: changelog
  - label: Google · Gemini Apps Privacy Notice（官方声明，2026-10-20 经搜索快照取到正文；直连超时为网络受限）
    url: https://support.google.com/gemini/answer/13594961
    kind: docs
  - label: Google · About personalization with Connected Apps（16836988，Connected Apps 训练口径）
    url: https://support.google.com/gemini/answer/16836988
    kind: docs
  - label: Google · Gemini API Additional Terms of Service（内容所有权与免费/付费训练口径，2026-10-20 快照核验）
    url: https://ai.google.dev/gemini-api/terms
    kind: docs
  - label: Google AI plans（定价页指针，D9：本站不采价格数字）
    url: https://one.google.com/about/google-ai-plans
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
  direct_note: gemini.google.com 大陆直连稳定超时（2026-10-20 同日两次 000）。
  direct_note_en: gemini.google.com times out consistently from mainland (000 twice).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

Google 生态里的通用对话助手：网页/Windows/macOS 三端覆盖，模型按订阅档位分流，
「不训练你的邮箱原库，但训练回答过程里的摘要」是它最容易被误读的一行条款。

## 适合与不适合

适合已经在 Google 生态（搜索、Workspace、Chrome）里工作的人——联动是真实优势。
在意训练用途就关 Keep Activity（只影响未来对话）；在意机密内容按官方提醒不要输入。
要本机运行或自由换模型，它不合适——去看本地模型运行器与开源框架。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

## 未知项清单

- 跨会话记忆功能的完整边界（以官方帮助页为准，本站未逐条核验）
- 免费档当前可用模型清单（release notes 按条目披露档位，本站未逐档核验）

## 相关条目

- [ChatGPT](./chatgpt.md) — 同为通用对话，训练开关机制与档位分流不同
- [Claude（对话应用）](./claude-chat.md) — 训练 opt-out 有「安全审查例外」，对照读
- [豆包](./doubao-chat.md) — 中文场景对照：App 训练开关自助、API 默认不训练
