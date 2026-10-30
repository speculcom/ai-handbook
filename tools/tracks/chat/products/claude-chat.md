---
id: claude-chat
form: web
name: Claude（对话应用）
nameEn: Claude (chat app)
vendor: Anthropic
homepage: https://claude.ai/
license: 官方 Consumer Terms of Service：「As between you and Anthropic, and to the extent permitted by applicable law, you retain any right, title, and interest that you have in the Inputs… we assign to you all of our right, title, and interest—if any—in Outputs」——输入保留、输出转让给用户（以遵守条款为前提）；条款同时声明输出可能不唯一。
licenseEn: Official Consumer Terms of Service: as between you and Anthropic you retain rights in Inputs, and 'we assign to you all of our right, title, and interest—if any—in Outputs' (subject to compliance). The terms also state Outputs may not be unique.

axes:
  model_access: >-
    模型家族官方 release notes 披露并按档位分流（2026 年线：Claude Fable 5.1 / Mythos 5.1 /
    Opus 5 / Sonnet 5 / Haiku 5.5 等发布记录）；聊天内可选模型，Enterprise 管理员可控制成员可用模型。
  runtime: >-
    网页、桌面（macOS/Windows）、移动应用；对话生成在 Anthropic 云端处理。
    Cowork 线有本地会话形态（跑在你的电脑上），与云端会话并列——本条目主轴是对话应用。
  local_files: >-
    可上传文档做长文分析；上传内容存于 Claude 账户。删除的对话前端立即消失、后端 30 天内删除（官方隐私政策）。
  background: >-
    Cowork 远程会话（beta）官方明说「Work continues when you close your laptop, and scheduled
    tasks run with no device online」（release notes 2026-07-07）——关机续跑与定时任务有官方出处。
  tools: >-
    连接器生态（Microsoft 365 含写工具、Salesforce 插件等官方条目）；Artifacts 产出代码与内容；
    Skills/插件安全扫描（Enterprise beta）。
  context: >-
    记忆功能为分类条目制：Settings > Memory 可查看全部 Topics、逐条编辑或删除；敏感话题默认不入记忆；
    Free/Pro/Max 默认开、Team/Enterprise 默认关（release notes 2026-08-25）。
  permissions: >-
    官方隐私政策（2026-09-10 生效）：消费者对话默认可能用于训练，账户设置里可 opt out；
    即使退出，被安全审查标记的对话仍会被用；API/Enterprise 数据由客户协议管辖，不适用本政策。
  fit: >-
    重长文阅读与写作质量的人。要「对话绝不进训练」就在设置里 opt out（注意安全审查例外）；
    要合同级数据条款走 API/Enterprise。与 Claude Code 是两条产品线，别混。

pitfalls:
  - 把对话应用与 Claude Code 当成一条产品线——两条线、两份档案
  - 以为训练 opt-out 覆盖一切——被安全审查标记的对话是官方明写的例外
  - 把记忆当成不可控黑箱——官方提供逐条查看/编辑/删除入口

tags: [云端, 长文档, 记忆, 商业]

related: [claude-code-cli, claude-agent-sdk]

sources:
  - label: Claude Help Center · Release notes（官方更新日志，2026-10-21 直抓 200 核验记忆/Cowork/模型发布条目）
    url: https://support.claude.com/en/articles/12138966-release-notes
    kind: changelog
  - label: Anthropic · Privacy Policy（2026-10-20 直抓核验：训练 opt-out、安全审查例外、30 天删除）
    url: https://www.anthropic.com/legal/privacy
    kind: docs
  - label: Anthropic · Consumer Terms of Service（输出物转让条款，2026-10-21 经搜索快照核验）
    url: https://www.anthropic.com/legal/consumer-terms
    kind: docs
  - label: Anthropic · Pricing（定价页指针，D9：本站不采价格数字）
    url: https://www.anthropic.com/pricing
    kind: pricing

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: verified

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: no
  direct_note: claude.ai 直连 302 到官方「本地区域不可用」页（app-unavailable-in-region）——官方明确不可用。
  direct_note_en: claude.ai redirects to the official "app unavailable in region" page — the vendor itself states unavailability.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

重长文与写作质量的通用对话应用：记忆做成可逐条编辑的清单，
Cowork 线把「关机续跑、定时任务」写进了官方 release notes。

## 适合与不适合

适合长文档分析、写作与内容产出。在意训练就在设置里 opt out（安全审查例外是官方明写的）；
企业数据走 API/Enterprise 线。编码 agent 是另一条产品线（Claude Code），别拿这页当它。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

## 未知项清单

- 无

## 相关条目

- [ChatGPT](./chatgpt.md) — 同为通用对话，训练开关机制不同（反馈例外 vs 安全审查例外）
- [Gemini（对话应用）](./gemini-chat.md) — 生态联动路线对照
