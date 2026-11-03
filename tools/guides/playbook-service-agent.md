---
id: playbook-service-agent
topic: planning
title: 任务：搭一个客服 Agent 并上线
titleEn: Playbook: building and shipping a customer-service agent
summary: 意图、知识库、工具、护栏、评估、上线六段；含生态锁定、许可、人工兜底、验收单与失败模式。
summaryEn: Six stages — intents, knowledge base, tools, guardrails, evaluation, launch — with ecosystem lock-in, licensing, human fallback, an acceptance list and failure modes.
sources:
  - label: Microsoft · Copilot Studio 官方页（企业低代码 agent、Power Platform / Dataverse 生态；2026-10 快照）
    url: https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio
    kind: official
  - label: n8n · 官方文档与许可（fair-code / Sustainable Use License；2026-10 快照）
    url: https://docs.n8n.io
    kind: docs
  - label: Dify · 官方文档（可视化工作流与知识库；2026-10 快照）
    url: https://docs.dify.ai
    kind: docs
  - label: LangGraph · 官方文档（有状态编排与中断；2026-10 快照）
    url: https://docs.langchain.com/oss/python/langgraph/
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [准备：先划不能答的问题|Prepare: list what it must not answer]

1. **意图清单**：退款、改地址、查物流、产品咨询、投诉，按频次排序。
2. **禁区清单**：价格承诺、法律责任、医疗建议、账号密码，一律转人工。
3. **渠道**：网页、App、微信、电话；渠道不同，上下文与身份不同。
4. **人工兜底**：什么条件下转人工、转到谁、等待多久。

**决策点**：禁区没有写清，后面所有护栏都是补丁。

## [知识库：只放可对外的话|Knowledge base: approved text only]

- 只收官方已发布的 FAQ、政策、产品文档；内部草稿不进库。
- 每条知识带版本与生效日期；过期条目自动下线。
- 分块按语义，不按固定字数；每块保留原文链接。
- 检索命中后要求引用原文句，答不出就说「没找到」。

**失败模式**：把旧政策留在库里，Agent 会自信地答错。

## [工具：读写分离|Tools: read and write separated]

| 工具 | 类型 | 权限 | 确认 |
|---|---|---|---|
| 查订单 | 读 | 只读、按用户身份过滤 | 不需要 |
| 查物流 | 读 | 只读 | 不需要 |
| 改地址 | 写 | 仅未发货订单 | 需要人工确认 |
| 退款 | 写 | 仅符合政策 | 需要人工确认 |

**红线**：写操作必须有人工确认或双人复核；Agent 不得直接动支付。

## [护栏：四层|Guardrails: four layers]

1. **输入层**：PII 识别、注入检测、超长输入截断。
2. **知识层**：只答库内内容，引用原文，冲突条目标红。
3. **工具层**：白名单工具、参数校验、写操作确认。
4. **输出层**：敏感承诺过滤、转人工触发、日志留痕。

**决策点**：每层都要有可观测指标，否则出事后无法定位。

## [评估：先离线再灰度|Evaluate offline first]

- **离线集**：100 条真实问题，覆盖高频与禁区；每条有标准答案与可接受变体。
- **指标**：解决率、转人工率、错误承诺率、平均轮次、引用准确率。
- **灰度**：先 5% 流量，持续一周；错误承诺率不达标就回滚。
- **回归**：知识库每次更新跑一遍离线集。

**失败模式**：只测「能答」，不测「该拒答」；上线后错误承诺最致命。

## [上线：可观测与回滚|Launch: observe and roll back]

- 每次会话存：意图、检索命中、工具调用、最终回答、是否转人工。
- 设三条告警：错误承诺、转人工率异常、检索空命中率异常。
- 回滚开关：一键切回人工或旧版本。
- 每周抽 20 条会话人工复核。

## [成本算式|Cost formula]

```
单次会话成本 ≈ 输入 tokens + 输出 tokens + 检索 + 工具调用
月成本 ≈ 会话数 × 单次成本 + 人工兜底人力 + 维护
```

不写单价；按官方定价页与人工时薪计算。

## [验收单|Acceptance checklist]

- [ ] 意图清单与禁区清单已评审
- [ ] 知识库只含已发布内容，每条带生效日期
- [ ] 写操作全部有人工确认
- [ ] 四层护栏各有一条可观测指标
- [ ] 离线集覆盖高频与禁区，指标达标
- [ ] 灰度流量与回滚开关就绪
- [ ] 转人工条件与责任人写清
- [ ] 日志保留周期符合合规要求

## [常见误判|Common misreads]

- 把「低代码平台」当成「零治理」：身份、数据驻留、审计仍要配。
- 把「fair-code」当成「OSI 开源」：n8n 的 Sustainable Use License 有使用限制。
- 把「知识库大」当成「答得准」：过期与冲突条目比数量更伤。
- 把「转人工」当成失败：该转不转才是失败。
