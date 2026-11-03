---
id: changes-2026-q3-q4
topic: planning
title: 2026 Q3–Q4 变更速记：10 条带日期的官方变更
titleEn: Q3–Q4 2026 change digest: 10 dated official changes
summary: 把「刚上手就过时」做成可回看的季度页：10 条官方发布、停运与迁移，每条带日期、影响与来源；已宣布未生效的单独标注。
summaryEn: A quarterly page you can revisit instead of guessing what changed: 10 official launches, retirements and migrations, each with a date, impact and source, with announced-but-not-yet-effective items marked separately.
sources:
  - label: Google · Gemini release notes
    url: https://gemini.google/release-notes
    kind: changelog
  - label: Anthropic · Claude Help Center release notes（2026-10-21 直抓核验）
    url: https://support.claude.com/en/articles/12138966-release-notes
    kind: changelog
  - label: OpenAI · ChatGPT release notes（Atlas 停运 2026-08-09）
    url: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
    kind: changelog
  - label: Microsoft Support · Deep Research in Microsoft Copilot（C 端 2026-08-18 退役）
    url: https://support.microsoft.com/en-us/microsoft-copilot/deep-research-in-microsoft-copilot
    kind: docs
  - label: Cursor · 官方文档（自托管 2026-09-02）
    url: https://cursor.com/docs
    kind: docs
  - label: Microsoft · Playwright MCP Releases（v0.0.83 2026-09-28）
    url: https://github.com/microsoft/playwright-mcp/releases
    kind: changelog
  - label: ChromeDevTools · chrome-devtools-mcp Releases（v1.12.0 2026-10-22）
    url: https://github.com/ChromeDevTools/chrome-devtools-mcp/releases
    kind: changelog
  - label: PyPI · exllamav3（1.6.5，2026-10-25）
    url: https://pypi.org/project/exllamav3/
    kind: changelog
  - label: Google · Opal（宣布 2026-11-17 从 Labs 毕业）
    url: https://opal.google/
    kind: changelog
  - label: Anthropic · OneLogin SSO setup（2026-08-07）
    url: https://support.claude.com/en/articles/13917899-onelogin-sso-setup
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [怎么用这页|How to use this page]

每季度回看一次，只收录**有官方日期**的发布、停运与迁移。

- 先看日期：超过一个季度就当历史，不要当现状。
- 再看影响：写的是读者要改什么，不是厂商的宣传语。
- 最后看来源：每条都能点回官方页。
- 已宣布但未生效的单独列在下一节，不当成已发生。

## [10 条变更|Ten changes]

| 日期 | 变更 | 对读者的影响 | 来源 |
|---|---|---|---|
| 2026-08-07 | Claude 发布 OneLogin SSO/SCIM 配置指南，覆盖 Team、Enterprise 与 Console 组织 | 用 OneLogin 的团队可按官方步骤配单点登录与自动开停账号 | Claude Help Center |
| 2026-08-09 | ChatGPT Atlas 浏览器停运，能力并入 ChatGPT/Codex | 还把 Atlas 当独立浏览入口的流程要迁移 | ChatGPT release notes |
| 2026-08-18 | 微软 C 端 Copilot 的 Deep Research 退役，改由 M365 Copilot 的 Researcher 承接 | 个人账号的深度研究入口消失；企业线走 M365 | Microsoft Support |
| 2026-09-02 | Cursor 官方加入自托管，代码库与密钥可留在自有基础设施 | 数据不出网从「做不到」变成「可配置」 | Cursor Docs |
| 2026-09-28 | Playwright MCP v0.0.83 发布（v0.0.82 于 09-18，v0.0.81 于 09-14） | 工具名与参数仍会变；固定脚本要锁版本 | Playwright MCP Releases |
| 2026-10-13 | Gemini 4 Argon 面向 AI Pro/Ultra 推出 | 订阅档位决定可用模型；不要把预览档当通用能力 | Gemini release notes |
| 2026-10-21 | Claude release notes 记录记忆与 Cowork 更新 | 跨会话记忆与关机续跑进入主产品叙事 | Claude Help Center |
| 2026-10-22 | chrome-devtools-mcp v1.12.0 发布，新增导航历史保留上限等开关 | 编码 Agent 的浏览器调试面继续扩张；配置文件可热加载 | chrome-devtools-mcp Releases |
| 2026-10-25 | ExLlamaV3 1.6.5 发布（PyPI） | 本地推理版本号更新；量化与并行推理能力随版本走 | PyPI |
| 2026-11-17 | Google 宣布 Opal 从 Labs 毕业，工作流迁移到 Gemini skills | 已宣布、未生效；11-17 前仍按 Labs 用法 | Opal |

## [已宣布、未生效|Announced, not yet effective]

- **Opal 2026-11-17 毕业**：官方公告写明日期，但截至 2026-11-03 尚未生效。到期后要复核入口与迁移路径。
- 其余条目均为已发生事件，按日期从旧到新排列。

## [为什么只有 10 条|Why only ten]

这页不是 changelog 镜像。收录标准：

1. 有官方发布日期，不是传闻或社区转述。
2. 会改变读者的选择、迁移或权限配置，不是纯界面改版。
3. 能在一条来源里直接核到，不靠二手总结。

版本号连续的小版本（如 Playwright 的 0.0.81/82）合并成一条，不按发布次数灌水。

## [核验事实|Dated facts]

1. Atlas 浏览器停运日期为 2026-08-09，能力并入 ChatGPT/Codex（ChatGPT release notes，2026-11-03 复核）。
2. 微软 C 端 Copilot Deep Research 退役日期为 2026-08-18（Microsoft Support，2026-11-03 复核）。
3. Cursor 自托管上线日期为 2026-09-02（Cursor Docs，2026-11-03 复核）。
4. chrome-devtools-mcp v1.12.0 发布日为 2026-10-22（GitHub Releases，2026-11-03 直抓）。
5. ExLlamaV3 最新版为 1.6.5，发布日 2026-10-25（PyPI，2026-11-03 直抓）。
6. Opal 毕业日期为官方宣布的 2026-11-17，尚未生效（Opal，2026-11-03 复核）。
