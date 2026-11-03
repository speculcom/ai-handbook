---
id: checklist-procurement-access
topic: guardrails
title: 采购与权限审计清单：问厂商的 18 个问题
titleEn: Procurement and access audit checklist
summary: 一份可直接发给厂商的采购问卷，覆盖身份、数据、日志、模型、合同与退出六组；附权限矩阵模板与 6 项季度审计，问题都对应官方文档可查项。
summaryEn: A vendor questionnaire you can send as-is, covering identity, data, logs, model, contract and exit in six groups, with a permission-matrix template and six quarterly audit items, each answerable from official docs.
sources:
  - label: OpenAI Help Center · 租户与审计日志（管理员角色与安全设置）
    url: https://help.openai.com/zh-hans-cn/articles/12289294
    kind: docs
  - label: Claude · Enterprise Administrator Guide（角色、保留、审计）
    url: https://claude.com/resources/tutorials/claude-enterprise-administrator-guide
    kind: docs
  - label: Cursor · Admin API（审计日志导出与限流）
    url: https://cursor.com/docs/account/teams/admin-api
    kind: docs
  - label: Google Cloud · Gemini Enterprise audit logs
    url: https://docs.cloud.google.com/gemini/enterprise/docs/set-up-usage-audit-logs
    kind: docs
  - label: Microsoft Learn · Copilot data protection architecture
    url: https://learn.microsoft.com/en-us/microsoft-365/copilot/architecture-data-protection-auditing
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [怎么用|How to use]

把下面 18 个问题原样发给候选厂商，要求**书面回答 + 文档链接**。口头承诺不算。

- 答「有」但给不出文档的，按「unknown」记。
- 答「没有」的，写明替代方案。
- 六组问题按采购阶段排序：先身份与数据，再日志与模型，最后合同与退出。

## [第一组：身份与账号|Identity and accounts]

1. 支持哪些 SSO 协议（SAML / OIDC）？是否支持 SCIM 自动开通与停用？
2. 离职停用的最长生效时间是多久？是否支持强制会话失效？
3. 管理员分几层角色？谁有权改组织策略与计费？
4. 是否支持按团队/项目隔离数据，而不是全组织一个空间？

## [第二组：数据与训练|Data and training]

5. 默认是否用客户数据训练模型？关闭训练的开关在哪里、是否可按组织统一关闭？
6. 数据存在哪个区域？是否支持指定区域或数据驻留承诺？
7. 数据保留多久？能否自定义保留期并支持导出后删除？
8. 上传的文件、对话、生成内容分别保留在哪，是否可分别清理？

## [第三组：日志与审计|Logs and audit]

9. 审计日志覆盖哪些事件（登录、权限变更、策略变更、数据导出）？
10. 能否导出到 SIEM / S3 / webhook？导出延迟多久？
11. 审计日志保留多久？管理员能否查看历史？
12. 是否有 API 拉取审计日志？限流是多少？

## [第四组：模型与能力|Model and capability]

13. 用的是哪些模型、版本如何标识？模型下线或替换的提前通知期是多久？
14. 是否允许自带模型或自带密钥？支持哪些 provider？
15. 预览版功能能否在组织级禁用？生产环境如何锁定版本？

## [第五组：合同与许可|Contract and licensing]

16. 输出的知识产权归谁？商用范围是否覆盖团队产出？
17. 是否提供数据处理协议（DPA）与子处理者清单？安全认证有哪些（如 SOC 2 / ISO 27001）？

## [第六组：退出|Exit]

18. 合同结束时如何导出全部数据？导出格式与耗时是什么？账号与集成多久内停用？

## [权限矩阵模板|Permission matrix template]

复制到表格里，按你的组织改角色名：

| 能力 | 成员 | 团队管理员 | 组织管理员 | 安全/审计 |
|---|---|---|---|---|
| 日常使用 | 可 | 可 | 可 | 可 |
| 邀请/停用成员 | 不可 | 可 | 可 | 只读 |
| 改组织策略 | 不可 | 不可 | 可 | 只读 |
| 查看审计日志 | 不可 | 本团队 | 全组织 | 可 |
| 导出审计日志 | 不可 | 不可 | 可 | 可 |
| 改计费/席位 | 不可 | 不可 | 可 | 只读 |

原则：管理员数量最小化；安全/审计角色只读；计费权限与策略权限分开。

## [季度审计 6 项|Six quarterly audit items]

- [ ] 账号：离职名单与停用记录逐条对上
- [ ] 席位：付费席位 = 活跃账号，休眠席位已回收
- [ ] 策略：训练开关、保留期、外发限制有变更记录
- [ ] 日志：能导出最近 90 天事件
- [ ] 集成：第三方应用与 MCP server 列表可查，未用已撤
- [ ] 事故：本季度有无数据外发或误操作，有复盘、无记录

## [官方依据|Official evidence]

| 问题组 | 可核对的官方入口 |
|---|---|
| 身份/角色 | Claude Enterprise Administrator Guide；OpenAI Help Center 租户管理；Cursor Enterprise 文档 |
| 审计日志 | OpenAI 安全设置 → 审核日志；Claude Compliance API；Cursor `GET /teams/audit-logs` |
| 数据区域/保留 | 各厂商隐私政策与 DPA；Google Cloud 审计日志配置；Microsoft Purview |
| 模型版本 | 各厂商模型页与 release notes；预览版策略写在官方文档 |
| 退出 | 各厂商数据导出文档与合同条款 |

## [核验事实|Dated facts]

1. Cursor Admin API 的审计日志接口为 `GET /teams/audit-logs`，限每团队每分钟 20 次请求（官方文档，2026-11-03 复核）。
2. Claude Enterprise 的角色为 Primary Owner / Owner / Member，审计与保留由 Compliance API 提供（官方管理员指南，2026-11-03 复核）。
3. OpenAI 租户审计日志位于「全局设置 → 安全性 → 审核日志」，工作空间审计日志按角色显示（Help Center，2026-11-03 复核）。
4. Google Gemini Enterprise 的提示与响应日志默认关闭，数据访问审计需在 Cloud Logging 开启（官方文档，2026-11-03 复核）。
5. Microsoft 365 Copilot 的交互进入统一审计日志，Purview 负责 eDiscovery 与保留（Microsoft Learn，2026-11-03 复核）。
6. 安全认证与合同条款因厂商与档位而异，必须以签约主体提供的当期文档为准；本站不替厂商背书。
