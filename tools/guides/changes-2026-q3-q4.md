---
id: changes-2026-q3-q4
topic: planning
title: 2026 Q3–Q4 变更与迁移记录
titleEn: Q3–Q4 2026 changes and migration notes
summary: 十条版本、入口与迁移记录，分别标注事件日、待核日期和计划停用；说明对原有选择的影响，不以链接可达冒充功能核验。
summaryEn: Ten version, entry-point and migration records, distinguishing event dates, unconfirmed dates and planned shutdowns, with implications for earlier choices.
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
  - label: Cursor · Cloud Agents（执行位置；首发日期未核）
    url: https://cursor.com/docs/cloud-agent
    kind: docs
  - label: Microsoft · Playwright MCP Releases（v0.0.83 2026-09-28）
    url: https://github.com/microsoft/playwright-mcp/releases
    kind: changelog
  - label: ChromeDevTools · chrome-devtools-mcp Releases（v1.12.0 2026-10-22）
    url: https://github.com/ChromeDevTools/chrome-devtools-mcp/releases
    kind: changelog
  - label: PyPI · exllamav3（1.6.5：2026-10-25；1.6.6：2026-10-31）
    url: https://pypi.org/project/exllamav3/
    kind: changelog
  - label: Google · Opal FAQ（2026-11-17 停用，不自动迁移）
    url: https://developers.google.com/opal/faq
    kind: changelog
  - label: Anthropic · OneLogin SSO setup（页面日期 2026-08-06）
    url: https://support.claude.com/en/articles/13917899-onelogin-sso-setup
    kind: docs
last_verified: 2026-11-04
confidence: partial
---

## [怎么用这页|How to use this page]

区分三种日期：事件发生或计划生效日、来源页面日期、本站核对日。十条记录不是所有产品的完整更新清单。

- 先核对自己使用的版本、地区与订阅是否受影响。
- 链接能打开只证明访问成功，不证明全部功能、条款或迁移已核验。
- 发布日期未核时明确标注，不把当前文档的能力说明反推成首发新闻。
- 对计划停用事项，先保留需要的数据，再核对目标入口的重建要求。

## [10 条变更|Ten records]

| 日期 / 状态 | 变化 | 对原有选择的影响 | 证据 |
|---|---|---|---|
| 2026-08-06 | OneLogin 配置指南的页面日期；Team、Enterprise 与 Console 的可用能力有区别 | 配置前核对账号角色；Team 不直接套用 Enterprise 的 SCIM 步骤 | [页面日期已核](https://support.claude.com/en/articles/13917899-onelogin-sso-setup) |
| 2026-08-09 | 官方给出的 Atlas 停用日期，浏览器智能体能力转向 ChatGPT / Codex | 旧浏览器资料不自动全部转移；按公告保存需保留的数据 | [官方时间表](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| 2026-08-18 | Copilot 消费应用 Deep Research 退役 | 符合条件的 Microsoft 365 Premium 订阅可用 Researcher；旧报告按订阅查找并保存 | [官方时间表](https://support.microsoft.com/en-us/microsoft-copilot/deep-research-in-microsoft-copilot) |
| 2026-09-28 | Playwright MCP v0.0.83 发布 | 固定所用版本，并按对应版本核对工具名与参数 | [版本日期已核](https://github.com/microsoft/playwright-mcp/releases) |
| 2026-10-13 | Gemini 4 Argon 开始面向 Google AI Pro / Ultra 推出 | 推出不等于所有账号立即可用；核对账号与地区 | [发布记录已核](https://gemini.google/release-notes/) |
| 2026-10-21 | Claude Duet 对 Pro / Max 开放研究预览 | 预览范围需单独核对；这一天不是 Cowork 远程续跑或记忆的首发日 | [发布记录已核](https://support.claude.com/en/articles/12138966-release-notes) |
| 2026-10-22 | chrome-devtools-mcp v1.12.0 发布 | 更新后按对应 release notes 复查配置；版本号不等于性能提升证据 | [版本日期已核](https://github.com/ChromeDevTools/chrome-devtools-mcp/releases) |
| 2026-10-25 / 10-31 | ExLlamaV3 1.6.5 / 1.6.6 的 PyPI 发布记录 | 1.6.5 已不是所见最新记录；升级前核对依赖与 checkpoint 兼容性 | [版本日期已核](https://pypi.org/project/exllamav3/) |
| 2026-11-17（计划） | Opal 实验服务与 Gems made by Labs 计划停用 | 现有工作流不自动迁移；保留提示与 Drive 文件，并按需求重新搭建 | [截至 11-04 未到期](https://developers.google.com/opal/faq) |
| 首发日期待核 | Cursor 当前文档区分云端 VM 与自托管机器执行 | 自托管执行不等于模型请求、日志或全部数据不出网；另查网络与条款 | [11-04 核对当前说明](https://cursor.com/docs/cloud-agent) |

## [已宣布、未生效|Announced, not yet effective]

**Opal：2026-11-17 计划停用。** 截至 2026-11-04 还未到期。官方 FAQ 明确现有工作流不会自动迁移到 skills；Drive 的 Opal 文件保留，但停用后不能继续交互运行。根据任务选择 Gemini skills 或 AI Studio，并重新验证所需输入、工具与输出，不把两者当成原工作流的等价复制。

Cursor 的首发日期仍待核；这与其当前文档确认的执行方式是两项不同事实。

## [为什么只有 10 条|Why ten records]

收录会影响任务入口、迁移、权限或版本选择的事项，给出官方来源。对已经确认的日期与尚未确认的日期分开表达；小版本可合并成一条历史记录，不把记录数量当成覆盖完整度。

## [核验事实|Verification scope]

2026-11-04 核对了表中所列官方页面的对应事件、页面日期或版本记录。修正了 OneLogin 的页面日期、Claude 10-21 的事件归属、ExLlamaV3 后续版本和 Opal 不自动迁移的说明；Cursor 首发日期没有确认。此页不包含实际安装、登录、运行或迁移测试，也不表示对应产品的全部档案已重核。
