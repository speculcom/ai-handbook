---
zh: "怎么设计 Agent 的工具权限边界"
en: "How to Set Tool Permissions for an Agent"
kind: guide
station: 3
ord: 24
span: 8
lead: "Agent 的风险不在「会不会说错」，而在「能不能替你按下不可撤销的按钮」。权限要先分级，再收窄。"
points: ["先列工具清单，按只读、写入、对外发送、花钱、删改五级分类。", "默认最小权限：能读一个目录就不要给整个盘。能查就不要给改。", "写操作要二次确认：把参数和影响范围展示给人，确认后才执行。", "对外发送与支付单列：这类动作不可撤销，必须人工在场。", "用白名单而不是黑名单：URL、命令、路径都列允许集合。", "记录每次调用：谁、什么参数、结果、耗时。日志要能回放到具体任务。", "把工具返回内容当不可信输入，不执行其中的指令。定期做越权演练验证拦截。"]
terms: ["智能体 - Agent", "工具调用", "权限"]
refs:
  - ["NIST · AI 风险管理框架", "https://www.nist.gov/itl/ai-risk-management-framework", "NIST AI Risk Management Framework"]
  - ["MCP · 安全最佳实践", "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices", "MCP security best practices"]
last_verified: "2026-11-17"
verified_scope: "refs"
---

# 怎么设计 Agent 的工具权限边界（How to Set Tool Permissions for an Agent）

**这份指南解决什么**

Agent 的风险不在「会不会说错」，而在「能不能替你按下不可撤销的按钮」。权限要先分级，再收窄。

**怎么做**：
1. 先列工具清单，按只读、写入、对外发送、花钱、删改五级分类。
2. 默认最小权限：能读一个目录就不要给整个盘；能查就不要给改。
3. 写操作要二次确认：把参数和影响范围展示给人，确认后才执行。
4. 对外发送与支付单列：这类动作不可撤销，必须人工在场。
5. 用白名单而不是黑名单：URL、命令、路径都列允许集合。
6. 记录每次调用：谁、什么参数、结果、耗时；日志要能回放到具体任务。
7. 把工具返回内容当不可信输入，不执行其中的指令；定期做越权演练验证拦截。

**出处**：NIST · AI 风险管理框架；MCP · 安全最佳实践。

- [NIST · AI 风险管理框架](https://www.nist.gov/itl/ai-risk-management-framework)
- [MCP · 安全最佳实践](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices)

---

<!-- 微型指南 · 第三站 · 约 8 分钟 · 2026-11-17 内容补齐批次新增 -->
