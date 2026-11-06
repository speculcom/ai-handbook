---
id: exercise-creator
topic: planning
title: 练习包 · Creator：把一份官方资料做成三件套并留下事实表
titleEn: Exercise: three assets from one official source
summary: 选一份官方产品页，产出短文、图像提示词与 30 秒口播稿，并附 5 条事实核对表与 2 条被拒的说法；评分标准看引用、边界与一致性。
summaryEn: Take one official product page and produce a short post, an image prompt and a 30-second script, plus a five-claim fact table and two rejected claims; the rubric checks citations, boundaries and consistency.
sources:
  - label: 本站 · 怎么验证 AI 的输出
    url: https://learn.specul.com/guide/怎么验证%20AI%20的输出/
    kind: docs
  - label: 本站 · 怎么控制 AI 的语气和风格
    url: https://learn.specul.com/guide/怎么控制%20AI%20的语气和风格/
    kind: docs
  - label: 本站 · 怎么读模型卡
    url: https://learn.specul.com/guide/怎么读模型卡/
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [任务|The task]

选一份**有发布日期**的官方产品页或 changelog，做一组可发布的三件套。只准用这一份来源，不补二手总结。篇幅和评分线是本练习约束；口播时长需实际朗读确认。

1. 短文：150–200 字，说清「变了什么、影响谁、要做什么」，标题不夸张。
2. 图像提示词：一段可复现的英文提示词，描述一个具体场景，不生成商标或真人肖像。
3. 30 秒口播稿：约 90–110 字，按「变化 → 影响 → 动作」三段写。

同时交一张事实表：5 条关键说法，每条写来源句子与日期；再列 2 条你决定不写的说法及原因。

## [交付物|Deliverables]

| 文件 | 内容 | 检查点 |
|---|---|---|
| `post.md` | 150–200 字短文 | 每条事实能在来源里找到 |
| `prompt.txt` | 英文图像提示词 | 无商标、无真人、主体单一 |
| `script.md` | 30 秒口播稿 | 90–110 字，三段清楚 |
| `facts.csv` | 5 条说法 / 来源句 / 日期 | 无空行，日期可核 |
| `rejected.md` | 2 条不写的说法及原因 | 原因指向证据缺口或边界 |

## [评分标准|Rubric]

每项 0–2 分，共 12 分：

| 维度 | 0 分 | 1 分 | 2 分 |
|---|---|---|---|
| 事实可核 | 无来源 | 有来源但找不到原句 | 5 条都能点回原句 |
| 日期 | 没写日期 | 写了但来源没有 | 日期与来源一致 |
| 边界 | 把预览当正式 | 提到限制但不具体 | 明确写「未生效/仅某档位」 |
| 三件套一致 | 三份说法互相矛盾 | 大体一致 | 同一事实在三份里口径一致 |
| 图像提示词 | 含商标或真人 | 主体模糊 | 具体场景、单一主体、可复现 |
| 拒绝说法 | 没有 | 有但没原因 | 原因指向证据缺口 |

9 分及格。

## [参考答案结构|Model answer outline]

事实表的合格行：

```text
说法：[来源中的具体版本] 于 [发布日期] 发布
来源句：[复制来源中的原句，不凭记忆补写]
日期：[来源标注的发布日期]
```

被拒说法的合格写法：

```text
不写：「这个版本让所有浏览器 Agent 都变快了」
原因：来源只列了配置与功能变更，没有性能对比数据；跨产品结论无证据。
```

口播稿的合格结构：

```text
变化：[具体版本新增或移除了什么，附来源]
影响：[哪些工作流受到影响，未确认的收益不写]
动作：[需要检查的配置或迁移步骤]
```

## [常见失分|Common misses]

- 把官方宣传句直接当事实：宣传语不是可核事实。
- 三件套各写一套数字：读者对不上。
- 图像提示词堆形容词：没有具体场景，生成结果不可控。
- 拒绝说法写成「感觉不对」：要指向证据缺口或适用边界。
