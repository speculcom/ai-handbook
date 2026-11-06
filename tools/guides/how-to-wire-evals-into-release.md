---
id: how-to-wire-evals-into-release
topic: evaluation
title: 怎么把评测接进发布
titleEn: How to wire evaluations into release
summary: 评测跑通不等于会挡住坏版本；本篇写卡点位置、失败判定、放行例外与回滚，让分数进入发布决策。
summaryEn: A passing pipeline does not by itself stop a bad release. This guide covers where to gate, how to fail, which exceptions get signed off, and how to roll back.
sources:
  - label: promptfoo 官方文档 · CI/CD 集成（2026-11-06 直抓 200）
    url: https://www.promptfoo.dev/docs/integrations/ci-cd/
    kind: docs
  - label: LangSmith 官方文档 · Evaluation（2026-11-06 直抓 200）
    url: https://docs.langchain.com/langsmith/evaluation
    kind: docs
  - label: MLflow 官方文档 · 评测（2026-11-06 直抓 200）
    url: https://mlflow.org/docs/latest/ml/evaluation/
    kind: docs
  - label: Microsoft Learn · Planning red teaming for LLMs（2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/red-teaming
    kind: docs
  - label: Anthropic 工程博客 · Building effective agents（2026-11-06 直抓 200）
    url: https://www.anthropic.com/engineering/building-effective-agents
    kind: engineering
last_verified: 2026-11-06
confidence: partial
---

## [这一篇讲什么|What this guide covers]

**把评测接进发布，就是让分数有权阻止一次上线。**
评测流程本身不产生约束力，卡点与判定规则才产生。
本篇写三件事：卡在哪一步、什么算失败、谁可以放行例外。
接不进决策的评测，只是仪表盘上的装饰。

## [适用对象|Who this is for]

- 已有一条能重复跑的评测流程，改动仍靠人工 review 把关。
- 发布节奏按周或更快，回滚成本比你愿意承担的更高。
- 团队对「能不能上」有分歧，需要一个共同判据。
- 需要留下证据：某版本上线前测过什么、结果如何。

不适合：还没有可重复跑的评测。先把流程搭起来，再来接卡点。

## [前置条件|Prerequisites]

1. 一个稳定跑通的评测集，含版本号与判据版本。
2. 明确的关键子集：不能退化的那几条，例如权限、赔付、隐私。
3. 发布流水线里能插入一个步骤，且失败能让流程停下。
4. 一次运行的耗时与预算已知，否则卡点会被「太慢」否决。
5. 例外放行的责任人写进流程文档，不是口头约定。

## [三个卡点|Three gates]

| 卡点 | 目的 | 判据形态 | 失败时 |
|---|---|---|---|
| 合并前 | 拦住明显退化 | 关键子集全过 + 总体不低于基线 | 阻断合并，附失败样本 |
| 预发 | 用接近真实的配置再跑一次 | 全量集 + 环境一致性检查 | 阻断发布，回到改动 |
| 发布后 | 对真实交互持续评分 | 抽样在线判据 + 告警阈值 | 触发回滚或降级评估 |

promptfoo 的 CI/CD 文档把这套作用说成两件事：
在改动进入生产前发现退化，以及质量阈值未达标时让构建失败。
**官方原文**（英文）："Fail the build when quality thresholds aren't met."

LangSmith 文档把评测按运行时机分成两类：开发期在整理好的数据集上跑，
生产里对真实交互实时评分。
**官方原文**（英文）："Run evaluations on curated datasets during development."
两个卡点用同一份判据，才能把差异归因到环境而不是判据本身。

## [接入步骤|Six steps]

1. 选卡点：先在合并前加一道，不要一次改三道。
2. 定判定：把「失败」写成可执行条件，含关键子集与总体阈值（阈值由你的风险偏好定，本页不预设数字）。
3. 控时长：给评测设超时与并发上限，超时的处理方式要么放行并记录，要么阻断，二者选一。
4. 存产物：每次运行留下样本级结果，不只留一个百分比。
5. 定例外：写明谁能放行、放行需要附什么说明、有效期多久。
6. 接回滚：发布后卡点的告警要能直接连到回滚动作或降级开关。

判定条件要区分「测不过」与「没测成」。
评测服务返回 401 / 403 或 429 属于后者，按环境故障处理，不能当成质量结论。

## [贯穿案例：一次被挡住的合并|Worked example: a blocked merge]

情境与数字均为示例，是虚构假设，不是任何产品的实测阈值或结果。

- 输入：一次改动把检索条数从 4 提到 8，同时改了两条提示词。
- 处理：合并前卡点跑 60 条样本（示例规模），判定两条——
  关键子集 12 条须全过；总体通过率不低于基线减 2 个百分点（示例阈值）。
- 结果判断（示例）：关键子集 12 条里 1 条失败，该条属于「不得承诺赔付」；
  总体通过率高于基线。判定结果是阻断合并，因为关键子集不容豁免。
  失败样本的检索片段里出现了另一区域的条款，方向指向检索召回而非提示词。
- 失败后下一步：
  把改动拆成两次提交——先只改检索条数复跑，确认失败是否消失；
  若消失，说明召回片段变多引入了冲突证据，改回条数并给检索层加过滤；
  若仍在，则把该样本连同上一版结果一起交给判据复核，确认不是判据本身写偏。

这条流程同时给出两样东西：挡住的理由与可复现的样本。
只有理由没有样本，例外放行时无从判断。

## [验收|Acceptance]

- [ ] 一次故意写坏的改动能被合并前卡点阻断，并有可点击的失败记录
- [ ] 关键子集的选取与风险清单能对上，写明为什么是这几条
- [ ] 环境故障与质量失败的记录字段不同，报表不会混算
- [ ] 例外放行有留痕：谁、哪次、理由、有效期
- [ ] 发布后卡点的告警能连到回滚或降级开关，且演练过一次
- [ ] 评测产物含样本级结果，不只是汇总数字

## [故障排查分支|Troubleshooting branches]

- 卡点形同虚设：检查是否有人能一键跳过，且跳过不留痕。
- 每次都被挡住：先看是不是判据漂移，再看基线是否长期未更新。
- 运行太慢被关掉：把关键子集单独设为快速门，全量集放预发。
- 分数与线上表现相反：优先检查样本是否停留在旧场景，把线上失败回补进集。
- 判据互相矛盾：同一批样本给两个判据打出相反的结论时，人工复核并把结论写回判据说明。
- 想加更多卡点：Anthropic 的工程博客建议从简单方案与充分评测起步，
  **官方原文**（英文）："Start with simple prompts, optimize them with comprehensive evaluation"
  先确认现有卡点没有被绕过，再加下一道。

## [下一步|Next steps]

1. 把发布后卡点的线上失败样本回补成回归项。
2. 需要新的拦截点时，回到护栏的位置划分决定装在哪一层。
3. 给评审与合规留一份发布前评测记录，含版本、判据与未覆盖项。
4. 每季复核关键子集：它是否仍对应你担心出事的那几件事。

## [核验范围与未知|What was verified and what is not]

2026-11-06 直抓了五处官方来源：promptfoo 的 CI/CD 集成页与入门页材料、
LangSmith 评测文档、MLflow 评测文档、Microsoft Learn 红队规划文档、Anthropic 工程博客。
本篇只转述这些页面写明的用途与口径，未在任何产品中配置或运行流水线。

以下未知：
- 各家工具在你代码平台上的原生集成深度与所需权限——需按你的 CI 环境实测。
- 官方示例阈值能否作为你的放行标准——本页不预设数字，风险偏好由你与评审方决定。
- 评测运行时长在真实并发下的分布——官方页未给出可比口径。
