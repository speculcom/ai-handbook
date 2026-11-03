---
id: playbook-team-90days
topic: planning
title: 团队 90 天落地 playbook：从试点到权限收口
titleEn: A 90-day team rollout playbook
summary: 把团队引入 AI 拆成 0–30、31–60、61–90 三段，每段给目标、动作、验收点与负责人；权限矩阵与审计项按厂商官方 admin 文档落地，不写空泛口号。
summaryEn: A 0–30, 31–60, 61–90 rollout with goals, actions, acceptance points and owners per phase; the permission matrix and audit items follow vendor admin documentation rather than slogans.
sources:
  - label: OpenAI Help Center · 在管理控制台中管理你的租户（全局设置与审计日志，2026-11-03 直抓）
    url: https://help.openai.com/zh-hans-cn/articles/12289294
    kind: docs
  - label: Claude · Enterprise Administrator Guide（角色、审计、数据保留）
    url: https://claude.com/resources/tutorials/claude-enterprise-administrator-guide
    kind: docs
  - label: Claude Code · Set up for your organization（SSO、SCIM、席位）
    url: https://code.claude.com/docs/en/admin-setup
    kind: docs
  - label: Cursor · Compliance and Monitoring（审计日志与 Admin API）
    url: https://cursor.com/docs/enterprise/compliance-and-monitoring
    kind: docs
  - label: Google Cloud · Gemini Enterprise usage audit logs
    url: https://docs.cloud.google.com/gemini/enterprise/docs/set-up-usage-audit-logs
    kind: docs
  - label: Microsoft Learn · Microsoft Copilot data protection architecture（审计与 eDiscovery）
    url: https://learn.microsoft.com/en-us/microsoft-365/copilot/architecture-data-protection-auditing
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [适用前提|Preconditions]

这套流程适用于 10–200 人的团队，且满足三条：

1. 有一个能拍板预算与采购的人。
2. 有一个 IT/安全负责人能配 SSO、SCIM 与审计导出。
3. 团队愿意先选一个真实业务流做试点，而不是先全员开账号。

不满足就先补人，不要用「先买了再说」推进。

## [第 0–30 天：试点|Days 0–30: pilot]

**目标**：用一个小团队验证「工具有用、权限可控、成本可算」。

动作：

1. 选 5–8 人试点，覆盖一个真实流程（如客服周报、代码评审、合同摘要）。
2. 只开一个主工具 + 一个备份；不要同时上三个平台。
3. 建立账号基线：企业邮箱、SSO 登录、个人账号不许接公司数据。
4. 定义「红线任务」：生产密钥、客户个人信息、未公开财务数据，试点期一律不进 AI。
5. 每周记录三类数据：完成任务数、人工返工次数、权限申请次数。

验收点：

- [ ] 试点流程的产出能被非试点同事复用
- [ ] 所有账号走 SSO，无个人账号混用
- [ ] 三类数据连续记录 4 周
- [ ] 至少写出 3 条「这个工具不适合做的事」

负责人：业务负责人 + IT 安全。

## [第 31–60 天：扩面|Days 31–60: expand]

**目标**：从试点扩到相邻团队，同时把权限与审计接上。

动作：

1. 扩到 2–3 个团队，按角色开不同席位，不做全员同权。
2. 接 SCIM：入职自动开通、离职自动停用；停用当天生效。
3. 打开审计日志：确认管理员能看到登录、席位变更、策略变更三类事件。
4. 定「谁能改策略」：一般成员不能改组织级设置与数据保留。
5. 成本按席位 + 用量两条线记：席位是固定项，API/Agent 调用是变动项。

验收点：

- [ ] SCIM 离职停用在 24 小时内生效
- [ ] 审计日志能导出到 SIEM 或 CSV
- [ ] 权限变更全部有审批记录
- [ ] 月度成本能拆成席位与用量两行

负责人：IT 安全 + 财务。

## [第 61–90 天：收口|Days 61–90: closeout]

**目标**：把试点经验变成组织规则，留下可审计的证据。

动作：

1. 写一页《AI 使用规则》：可用工具、禁止数据、审批路径、事故上报。
2. 建季度复核：账号、席位、策略、审计各查一次。
3. 做一次退出演练：导出数据、迁到备选工具、确认旧账号停用。
4. 把采购问题清单（见 `checklist-procurement-access`）发给候选厂商。
5. 给新员工一条 30 分钟的入门路径，不要求读完所有文档。

验收点：

- [ ] 规则页已发布，且全员确认
- [ ] 季度复核有日历与负责人
- [ ] 退出演练留下记录与耗时
- [ ] 新员工能在 30 分钟内完成首次合规使用

负责人：业务负责人 + 法务/合规。

## [权限矩阵|Permission matrix]

按「角色 × 能力」定，不按人头拍脑袋。厂商侧的角色名不同，映射如下：

| 能力 | 成员 | 团队管理员 | 组织管理员 | 安全/审计 |
|---|---|---|---|---|
| 日常使用 | 可 | 可 | 可 | 可 |
| 邀请/停用成员 | 不可 | 可 | 可 | 只读 |
| 改组织策略 | 不可 | 不可 | 可 | 只读 |
| 查看审计日志 | 不可 | 可（本团队） | 可（全组织） | 可 |
| 导出审计日志 | 不可 | 不可 | 可 | 可 |
| 改计费/席位 | 不可 | 不可 | 可 | 只读 |

依据：

- Claude 的组织角色为 Primary Owner / Owner / Member，审计与数据保留由 Compliance API 与 Audit Logs 提供。
- OpenAI 租户有全局管理员与工作空间管理员两层，审计日志在安全设置下，按角色与功能可用性显示。
- Cursor 的审计日志需要 Enterprise 计划与管理员权限，可用 Admin API `GET /teams/audit-logs` 拉取。
- Google Gemini Enterprise 的审计走 Cloud Logging，数据访问审计需在 IAM 管理里开启。
- Microsoft 365 Copilot 的交互进入统一审计日志，eDiscovery 与保留走 Purview。

## [审计清单|Audit checklist]

每季度按这 6 项查一次，留记录：

1. **账号**：离职名单与停用名单逐条对上；无个人账号接公司数据。
2. **席位**：付费席位与活跃账号一致；休眠席位当月回收。
3. **策略**：数据保留、训练开关、外发限制三项有变更记录。
4. **日志**：能导出最近 90 天的登录、权限与策略事件。
5. **集成**：已授权的第三方应用与 MCP server 列表可查，未用的是否已撤。
6. **事故**：过去一季度有无数据外发或误操作；有就写复盘，没有就写「无」。

## [常见失败|Common failures]

- **先买后试**：没有试点流程，续费时无法证明价值。
- **全员同权**：管理员太多，策略与审计形同虚设。
- **只开不关**：离职账号与休眠席位长期留着。
- **审计不看**：日志开了但没人读，出事时才发现没导出。
- **把预览版当生产**：预览功能随时变，关键流程要有备选。

## [核验事实与限额|Dated facts]

1. OpenAI 租户审计日志在「全局设置 → 安全性 → 审核日志」，工作空间审计日志面向符合条件的工作空间所有者或管理员（Help Center，2026-11-03 复核）。
2. Claude Enterprise 的角色为 Primary Owner / Owner / Member；审计日志与数据保留由 Compliance API 提供（官方管理员指南，2026-11-03 复核）。
3. Cursor 审计日志为 Enterprise 专属，Admin API `GET /teams/audit-logs` 限每团队每分钟 20 次请求（官方文档，2026-11-03 复核）。
4. Google Gemini Enterprise 的提示与响应日志默认关闭，需管理员开启；数据访问审计在 Cloud Logging 配置（官方文档，2026-11-03 复核）。
5. Microsoft 365 Copilot 的每次交互生成审计条目，可用 Purview 做 eDiscovery 与保留（Microsoft Learn，2026-11-03 复核）。
6. 各家席位价格与限额随档位变化，以官方定价页当日为准；本站不采价格数字。
