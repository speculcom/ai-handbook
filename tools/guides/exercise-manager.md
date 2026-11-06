---
id: exercise-manager
topic: planning
title: 练习包 · Manager：写一页供应商决策备忘录
titleEn: Exercise: a one-page vendor decision memo
summary: 用三个成本维度对比「调 API」与「自己部署」，交一页决策备忘录、评分表、5 个尽职调查问题与退出计划；评分标准看口径、可复核与退出路径。
summaryEn: Compare API usage with self-hosting on three cost dimensions and deliver a one-page decision memo, a score sheet, five due-diligence questions and an exit plan; the rubric checks conventions, reproducibility and exit paths.
sources:
  - label: 本站 · 成本算式：云端、Agent、本地与视频四条线
    url: https://tools.specul.com/mcp/guides/cost-calculator.html
    kind: docs
  - label: 本站 · 选型决策者路线
    url: https://learn.specul.com/path/for-managers/
    kind: docs
  - label: 本站 · 团队 90 天落地 playbook
    url: https://tools.specul.com/mcp/guides/playbook-team-90days.html
    kind: docs
  - label: 本站 · 采购与权限审计清单
    url: https://tools.specul.com/mcp/guides/checklist-procurement-access.html
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [任务|The task]

为一个真实业务流写一页决策备忘录：继续调 API，还是把模型放到自有基础设施。不做技术教程，只做决策。评分与篇幅仅用于练习，不形成本站产品排名；下方数字示例是假设，不能代替实际迁移估算。

必须包含：

1. 三个成本维度：调用量、固定成本、返工与人工。
2. 一张 5 行评分表：成本、锁定、合规、运维、扩展，各 1–5 分。
3. 5 个尽职调查问题，问厂商或内部安全团队。
4. 退出计划：换供应商要导出什么、多久、谁负责。
5. 明确结论：选哪个，以及什么条件下推翻。

## [交付物|Deliverables]

| 文件 | 内容 | 检查点 |
|---|---|---|
| `memo.md` | 一页决策备忘录 | 结论在第一段；含三个成本维度 |
| `score.csv` | 5 行 × 5 列评分 | 每格有理由，不是只填数字 |
| `ddq.md` | 5 个尽职调查问题 | 每个都能指向官方文档可答项 |
| `exit.md` | 退出计划 | 含数据导出格式、耗时、负责人 |

## [评分标准|Rubric]

每项 0–2 分，共 12 分：

| 维度 | 0 分 | 1 分 | 2 分 |
|---|---|---|---|
| 成本口径 | 只算单价 | 算了调用量但漏固定成本 | 调用量、固定成本、返工与人工三线齐 |
| 结论 | 没有结论 | 有结论但无条件 | 结论 + 推翻条件 |
| 可复核 | 数字来路不明 | 部分有来源 | 每个数字有假设或来源 |
| 尽职调查 | 泛泛而谈 | 有 5 问但不可答 | 每问对应官方文档可查项 |
| 退出 | 没写 | 只写「可导出」 | 格式、耗时、负责人齐 |
| 锁定评估 | 只看价格 | 提到迁移成本 | 写清迁移成本与备选 |

9 分及格。

## [参考答案结构|Model answer outline]

备忘录的合格开头：

```text
结论：本季度继续调 API；当月的调用量超过 X 或数据分类升到「不可出网」时，转自托管。
```

评分表的合格行：

```text
维度：合规
分数：3/5
理由：当前区域可用，但数据驻留条款只在企业档提供；升档前不能算满分。
```

退出计划的合格写法：

```text
导出：对话与文件用官方导出接口，格式 JSON/CSV；
耗时：按 10 万条估算，预留 2 个工作日；
负责人：IT 安全负责人；验证：抽样 20 条比对。
```

## [常见失分|Common misses]

- 只比 token 单价：漏掉席位、运维与返工。
- 结论写成「看情况」：决策者要的是一句可执行的话。
- 尽职调查问题问不出答案：如「你们安全吗」，应问「审计日志覆盖哪些事件、保留多久」。
- 退出计划没有验证步骤：导出不等于可用。
