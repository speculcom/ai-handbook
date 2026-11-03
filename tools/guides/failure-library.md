---
id: failure-library
topic: planning
title: 失败库：十个真实误判与证据
titleEn: Failure library: ten real misreads with evidence
summary: 从 225 份档案的 pitfalls 汇总十个高频误判：现象、为什么会踩、怎么避免，每条附档案链接与核验日。
summaryEn: Ten recurring misreads compiled from the pitfalls across 225 profiles — symptom, cause, avoidance, with a profile link and verification date for each.
sources:
  - label: n8n · 官方文档与许可（fair-code / Sustainable Use License；2026-10 快照）
    url: https://docs.n8n.io
    kind: docs
  - label: Microsoft Support · Deep Research in Microsoft Copilot（C 端 2026-08-18 退役）
    url: https://support.microsoft.com/en-us/microsoft-copilot/deep-research-in-microsoft-copilot
    kind: docs
  - label: 本站 · 225 份工具档案的 pitfalls 字段（2026-10-30 至 2026-11-03 核验）
    url: https://tools.specul.com/
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [怎么用这页|How to use]

十个误判都来自站内档案的 `pitfalls` 字段，不是二手传闻。每条给：现象、为什么会踩、怎么避免、证据链接。遇到新产品，先按同样四问自查。

## [1. 把 n8n 当 OSI 开源|Mistaking n8n for OSI open source]

- **现象**：把源码公开当成 OSI 开源，直接用于闭源商业分发。
- **为什么会踩**：仓库公开可见，许可证却是 fair-code（Sustainable Use License）。
- **怎么避免**：读 LICENSE 原文，确认是否属于 OSI 认可许可；商用分发前问法务。
- **证据**：[n8n 档案](https://tools.specul.com/automation/n8n.html)（2026-10-30 核验）。

## [2. 把「源码可见」当「开源」|Mistaking source-visible for open source]

- **现象**：看到 GitHub 仓库就以为可自由修改与再分发。
- **为什么会踩**：仓库公开 ≠ 许可证允许；Claude Code CLI 的许可证是 All rights reserved。
- **怎么避免**：先看 LICENSE 与 README 的许可段，再看是否有再分发限制。
- **证据**：[Claude Code CLI 档案](https://tools.specul.com/coding/claude-code-cli.html)（2026-10 核验）。

## [3. 把「不训练原库」当「对话不训练」|Reading the wrong training scope]

- **现象**：以为 Gemini 不会用对话训练，因为官方说「不直接拿 Gmail/Drive 原库训练」。
- **为什么会踩**：回答过程中产生的摘要、摘录与推断仍会被用于训练。
- **怎么避免**：读隐私声明全文；要关就关 Keep Activity，敏感内容按官方提醒不要输入。
- **证据**：[Gemini 档案](https://tools.specul.com/chat/gemini-chat.html)（2026-10-21 核验）。

## [4. 把 C 端 Copilot 与 M365 Copilot 混用|Confusing two Copilot products]

- **现象**：在 C 端找 Deep Research，或拿消费档条款套企业数据。
- **为什么会踩**：两个产品面、两套条款与权限；C 端 Deep Research 已于 2026-08-18 退役。
- **怎么避免**：先确认入口是 copilot.microsoft.com 还是 M365；深度研究改用 Researcher。
- **证据**：[Microsoft Copilot 档案](https://tools.specul.com/chat/microsoft-copilot.html)（2026-10-22 核验）。

## [5. 以为 Atlas 浏览器还在|Assuming Atlas is still live]

- **现象**：按旧教程找 Atlas 的浏览器操作入口。
- **为什么会踩**：产品页与新闻页仍有残留；官方 release notes 写明 2026-08-09 停运。
- **怎么避免**：以最新 release notes 为准；能力已并入 ChatGPT / Codex，换入口。
- **证据**：[ChatGPT 档案](https://tools.specul.com/chat/chatgpt.html)（2026-11-03 核验）。

## [6. 把订阅当商用许可|Treating a subscription as a commercial licence]

- **现象**：买了会员就以为生成的视频可任意商用。
- **为什么会踩**：所有权与商用是两层；Kling 官方条款把商用与会员线绑定。
- **怎么避免**：读许可分层；保留条款页与订阅档位截图。
- **证据**：[Kling 档案](https://tools.specul.com/video/kling.html)（2026-10 核验）。

## [7. 忽略「训练许可不可撤销」|Ignoring an irrevocable training licence]

- **现象**：上传客户素材到视频平台，事后想撤回训练授权。
- **为什么会踩**：Runway 条款写明训练许可不可撤销、无退出开关。
- **怎么避免**：敏感素材先脱敏或不上传；把条款页存档后再开工。
- **证据**：[Runway 档案](https://tools.specul.com/video/runway.html)（2026-10 核验）。

## [8. 把开放权重当免费商用|Treating open weights as free commercial use]

- **现象**：下载 Ideogram 4.0 权重直接商用。
- **为什么会踩**：4.0 权重非商用免费，商用自托管需单独许可。
- **怎么避免**：分开读「权重许可」与「托管服务条款」；商用前取得许可。
- **证据**：[Ideogram 档案](https://tools.specul.com/image/ideogram.html)（2026-10 核验）。

## [9. 把「闭源应用」当「条款可忽略」|Skipping terms because the app is closed]

- **现象**：LM Studio 本地跑模型，默认以为数据完全不出本机。
- **为什么会踩**：应用闭源，条款页动态加载；本站未能直抓全文，商用前必须自己读。
- **怎么避免**：以官网条款为准；离线场景先断网验证。
- **证据**：[LM Studio 档案](https://tools.specul.com/runner/lm-studio.html)（2026-10 核验）。

## [10. 忽略已修复的安全问题|Ignoring a fixed security issue]

- **现象**：继续按旧版本配置 Windsurf 的 Restricted Mode。
- **为什么会踩**：产品已改称 Devin Desktop，且有 CVE 修复记录；旧教程仍流传。
- **怎么避免**：看官方发布说明与安全公告；升级后再按新配置。
- **证据**：[Windsurf 档案](https://tools.specul.com/coding/windsurf.html)（2026-10 核验）。

## [四问自查|Four questions]

1. **产品还在吗**：官方 release notes 最新一条是什么日期？
2. **许可证是哪一份**：工具许可、权重许可、服务条款分开看。
3. **数据去了哪**：训练、留存、跨境三项逐条确认。
4. **证据在哪**：条款页 URL 与核验日是否存档？

四问有一问答不上来，就先别上线。
