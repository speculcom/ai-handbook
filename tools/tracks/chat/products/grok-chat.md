---
id: grok-chat
form: web
name: Grok
nameEn: Grok
vendor: xAI
homepage: https://grok.com/
license: 官方条款口径：xAI 声明「you own the Output」（输出归用户）；同时条款保留平台对内容的广泛许可，且未登录使用等场景另有安排——细节以官方条款页为准（本站直抓被 Cloudflare 拦截，经搜索快照核验该句）。
licenseEn: Per official terms, xAI states 'you own the Output'; the terms also retain a broad platform license over content, with separate arrangements for unauthenticated use — details per the official terms page (direct fetch was blocked by Cloudflare; the quoted sentence was verified via search snapshot).

axes:
  model_access: >-
    模型家族由 xAI 官方发布页与新闻稿披露（Grok 系列迭代线）；grok.com 与 X 内 Grok 可用模型
    可能不同步。本站直抓 x.ai 全站被 Cloudflare 拦截，模型档位分流未逐条核验。
  runtime: >-
    网页（grok.com）、iOS/Android 应用；X 平台内嵌 Grok 入口；生成在 xAI 云端处理。
  local_files: >-
    支持图像生成与编辑、文件输入；上传内容存于 xAI 账户，留存与删除见 permissions 维
    （删除的数据 30 天内从系统移除，官方 Consumer FAQ）。
  background: >-
    对话即时返回，没有离线任务队列；没有「关机续跑」形态的官方声明——
    长任务形态在 xAI Grok Bot（云端任务型 agent，归 coding 大类另一份档案）。
  tools: >-
    实时网络搜索与公开 X 帖子检索是核心差异点；另有 xAI Grok Bot（云端任务型 agent，
    归 coding 大类单独档案）与独立 API 线。
  context: >-
    风格/persona 可调；跨会话记忆机制官方未逐条说明（本站未核验到独立记忆管理入口的官方文档）。
  permissions: >-
    官方 Consumer FAQ：默认可能用你的内容与 Grok 回复训练模型——App「Settings → Data Controls →
    Improve the model」或 grok.com「Settings → Data → Improve the Model」关闭；Private Chat 不用于训练；
    企业与 API 内容不用于训练。未登录使用时官方称可匿名保留内容，部分地区（EU/UK 除外）没有退出训练选项。
    在 X 内使用 Grok 适用 X 的隐私政策，是另一套条款。
  fit: >-
    要接 X 实时信息的人。两处硬边界先确认：未登录可能没有退出训练的选项；在 X 内用是 X 的条款不是 xAI 的。
    要合同级数据条款走 API/企业线。

pitfalls:
  - 把 X 内 Grok 与 grok.com 当成同一套条款——X 内适用 X 隐私政策
  - 以为所有人都能退出训练——官方明写部分地区（EU/UK 除外）未登录场景没有该选项
  - 把 Grok 对话应用与 Grok Bot 混为一谈——后者是云端任务型 agent，另一份档案（coding）

tags: [云端, 实时搜索, X生态, 商业]

related: [grok-bot]

sources:
  - label: xAI · Consumer FAQ（官方页，2026-10-20 经搜索快照取到正文；直连超时为网络受限）
    url: https://x.ai/legal/faq
    kind: docs
  - label: xAI · Terms of Service（「you own the Output」条款，2026-10-21 经搜索快照核验；x.ai 全站直连被 Cloudflare 403 拦截）
    url: https://x.ai/terms
    kind: docs
  - label: xAI · News（官方发布线入口，模型迭代记录指针）
    url: https://x.ai/news
    kind: changelog
  - label: xAI · Grok 产品页（定价页指针，D9：本站不采价格数字）
    url: https://x.ai/grok
    kind: pricing

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: no
  direct_note: grok.com 大陆直连稳定超时（2026-10-20 同日两次 000）。
  direct_note_en: grok.com times out consistently from mainland (000 twice).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

接 X 实时信息的通用对话助手：搜索与公开帖子检索是核心差异点，
「未登录可能没有退出训练的选项」与「X 内是另一套条款」是两处必须先看边界。

## 适合与不适合

适合要接 X 实时信息、接受云端处理的人。在意训练用途就用 Private Chat 或关数据开关
（登录态下自助）；在意条款一致性就别在未登录状态用。要合同级数据条款走 API/企业线。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

## 未知项清单

- 模型档位分流细节（x.ai 全站直抓被 Cloudflare 拦截，本站未能逐条核验）
- 跨会话记忆机制（未核验到独立记忆管理入口的官方文档）

## 相关条目

- [ChatGPT](./chatgpt.md) — 同为通用对话，训练开关与反馈口径不同
- [Claude（对话应用）](./claude-chat.md) — 训练 opt-out 有「安全审查例外」，对照读
- [豆包](./doubao-chat.md) — 中文场景对照：App 训练开关自助、API 默认不训练
