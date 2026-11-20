---
zh: "模型 API 怎么谈 SLA 与退出条款"
en: "How to Negotiate Model API SLAs and Exit Terms"
kind: guide
station: 6
ord: 16
span: 9
lead: "模型 API 的坑不在价格，在可用性、限流、数据权利和「想走时走不掉」。"
leadEn: "The trap in a model API is not price; it is availability, rate limits, data rights, and not being able to leave."
points: ["可用性：写清月度可用率、故障响应与赔付；不要接受「尽力而为」。", "限流与配额：RPM、TPM、并发、突发；超限是排队还是报错，要写进合同。", "数据权利：输入输出归谁、是否训练、留存多久、能否删除；与隐私政策对齐。", "模型变更：供应商换底座或改版本要提前通知；你有权做回归测试与终止。", "退出：数据导出格式、迁移协助、缓存与备份清理、最后计费日。", "价格：单价、阶梯、最低消费、涨价上限；不要只看首月折扣。", "责任：内容侵权、数据泄露、服务中断的责任边界与保险。"]
terms: ["供应商锁定", "退出成本", "服务中断风险"]
refs:
  - ["OpenAI · Business terms", "https://openai.com/policies/business-terms/", "OpenAI · Business terms"]
  - ["Anthropic · Commercial terms", "https://www.anthropic.com/legal/commercial-terms", "Anthropic · Commercial terms"]
  - ["学 AI · 怎么把安全要求写进采购条款", "https://learn.specul.com/", "Learn AI · Writing security requirements into procurement"]
last_verified: "2026-11-19"
verified_scope: "refs"
---

# 模型 API 怎么谈 SLA 与退出条款（How to Negotiate Model API SLAs and Exit Terms）

**这份指南解决什么**：模型 API 的坑不在价格，在可用性、限流、数据权利和「想走时走不掉」。

**怎么做**：
1. 可用性：写清月度可用率、故障响应与赔付；不要接受「尽力而为」。
2. 限流与配额：RPM、TPM、并发、突发；超限是排队还是报错，要写进合同。
3. 数据权利：输入输出归谁、是否训练、留存多久、能否删除；与隐私政策对齐。
4. 模型变更：供应商换底座或改版本要提前通知；你有权做回归测试与终止。
5. 退出：数据导出格式、迁移协助、缓存与备份清理、最后计费日。
6. 价格：单价、阶梯、最低消费、涨价上限；不要只看首月折扣。
7. 责任：内容侵权、数据泄露、服务中断的责任边界与保险。

---
<!-- 微型指南 · 第6站 · 约 9 分钟 -->
