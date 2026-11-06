---
id: notebooklm
form: web
name: NotebookLM
nameEn: NotebookLM
vendor: Google
homepage: https://notebooklm.google.com
license: 2026-10-22 旧快照记录免费与订阅形态；本次未复核当前收费、许可或组织合同，使用前回官方条款核对。
licenseEn: The 2026-10-22 snapshot recorded free and subscription offerings; current charges, licences and organization contracts were not reviewed here. Check official terms.
axes:
  model_access: >-
    官方帮助称由 Gemini 提供能力；本次未确认各账号可选的模型档位。
  runtime: >-
    网页与移动端有分别的官方帮助；2026-11-04 只核对浏览器使用条件，未安装或登录验证。
  local_files: >-
    官方帮助列 PDF、网页、YouTube、音频、Google Docs/Slides 等来源；具体限制按当前帮助和账号范围核对。
  background: >-
    官方列音频概览等生成形态；本次未核对排队、后台持续时间或任务恢复。
  tools: >-
    可围绕来源问答、整理笔记，也有发现新来源的入口。源内回答与资料发现应分别核对，不能再简单写成“只读你上传的资料、不会找新源”。
  context: >-
    以 notebook 组织来源与笔记；跨笔记本状态、记忆和具体上限本次未核对。
  permissions: >-
    需登录 Google 账号；组织账号可能需管理员启用，地区与年龄有条件。数据用途应按账号与反馈情形核对，不能将旧 FAQ 概括成“任何资料永不用于训练”。
  fit: >-
    用于有来源的问答、笔记与资料整理。把检索覆盖、回答证据和生成内容分别验证；不把本地连接失败推成全国不可达，也不把引用角标当正确性保证。
pitfalls:
  - 源内回答与资料发现是两个环节；不能因前者带引用就断言资料搜全或结论正确。
  - 旧帮助地址已转到 Gemini Notebook 帮助；实际账号的名称、地区与功能范围仍需确认。
  - 笔记导出为新的 Google Doc，后续在 Docs 的修改不会同步回原笔记；不把一次导出当双向同步。
tags: [源锚定, 音频概览, Google生态, 需网络环境]
related: [gemini-chat, elicit, metaso]
sources:
  - label: NotebookLM · 官网（原产品入口）
    url: https://notebooklm.google.com
    kind: official
  - label: NotebookLM · Terms（2026-10-22 旧快照，未在本次重审）
    url: https://notebooklm.google/terms
    kind: official
  - label: NotebookLM · Release Notes（2026-10-22 旧快照）
    url: https://notebooklm.google/release-notes
    kind: changelog
  - label: Gemini Notebook · 使用条件（2026-11-04 单项核对）
    url: https://support.google.com/gemininotebook/answer/16164461?hl=en
    kind: docs
  - label: Gemini Notebook · 笔记导出（2026-11-04 单项核对）
    url: https://support.google.com/gemininotebook/answer/16262519?hl=en
    kind: docs
last_verified: 2026-11-04
last_updated: 2026-11-04
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: Google（美国）。
  origin_note_en: Google (US).
  direct: unknown
  direct_note: 旧条目记录 2026-10-22 连接返回 000，不构成全国可达性证据；本次未作网络探测。
  direct_note_en: The older entry recorded a 000 connection result on 2026-10-22; that does not establish nationwide reachability. No new network probe was run.
  filing: unknown
  filing_note: 原条目记录 2026-10-22 检索未见公示，本次未复核；不能据此裁定备案义务。
  filing_note_en: The older entry recorded no listing found in a 2026-10-22 search; this was not rechecked and does not determine filing obligations.
  verified: 2026-10-22
---

## 一句话定位

NotebookLM 条目保留原名供识别；2026-11-04 官方帮助已使用 Gemini Notebook 名称。这里记录来源问答与笔记流程，不据帮助名称推断所有账号已迁移。

## 适合与不适合

适合：围绕有出处的资料问答与整理笔记。
先核对：账号、地区、来源限制、导出与数据用途；资料发现和源内回答分开验证。

## 实测记录

2026-11-04 单项文档核对：官方帮助名称、浏览器账号条件、来源问答/资料发现、笔记 Export to Docs；新增两条帮助来源。没有登录、安装或运行检索/音频质量测试；未复核旧价格、全部合同或全国网络可达性。原 2026-10-22 条款与更新链接保留历史日期。

## 未知项清单

- 各账号的实际迁移状态、模型选择与额度
- 移动端在指定地区/设备的可用范围
- 组织合同、反馈情形下的数据用途与完整留存条款
- 检索覆盖、长文处理、音频质量与后台任务恢复（未运行验证）

## 相关条目

- [Gemini](../chat/products/gemini-chat.md) — 同厂入口；按实际任务与账号条件核对，不以名称判断资料覆盖。
- [Elicit](./elicit.md) — 论文任务可看学术检索流程；来源覆盖与抽取结果分别查。
- [秘塔 AI 搜索](./metaso.md) — 查看另一种检索入口；语言、来源、地区和权限需分别核对。
