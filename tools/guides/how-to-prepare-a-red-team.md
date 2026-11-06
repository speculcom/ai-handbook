---
id: how-to-prepare-a-red-team
topic: guardrails
title: 怎么准备一次红队
titleEn: How to prepare a red-team session
summary: 先定范围、名单与记录格式，再让一组人分头试攻，把发现变成可测量的风险项，别把一次演练读成安全证明。
summaryEn: Fix scope, harm list and record format first, let a team probe separately, then turn findings into measurable risk items instead of reading one session as proof of safety.
sources:
  - label: Microsoft Learn · Planning red teaming for LLMs（2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/red-teaming
    kind: docs
  - label: Anthropic 官方博客 · Challenges in red teaming AI systems（2026-11-06 直抓 200）
    url: https://anthropic.com/news/challenges-in-red-teaming-ai-systems
    kind: engineering
  - label: 红队方法论文（arXiv 2209.07858，2026-11-06 直抓摘要页）
    url: https://arxiv.org/abs/2209.07858
    kind: paper
  - label: OWASP Top 10 for LLM Applications 官方仓库（2026-11-06 直抓 200）
    url: https://github.com/OWASP/www-project-top-10-for-large-language-model-applications
    kind: repo
  - label: OpenAI Agents SDK 官方文档 · Guardrails（2026-11-06 直抓 200）
    url: https://openai.github.io/openai-agents-python/guardrails/
    kind: docs
last_verified: 2026-11-06
confidence: partial
---

## [这一篇讲什么|What this guide covers]

**红队是一次有组织的试攻，用来找风险面。**
它证明不了安全，只能证明某些攻击还没试出来。
Microsoft 官方文档把这条边界写得很清楚：
**官方原文**（英文）："red teaming is not a replacement for systematic measurement"
本篇讲怎么把它办成一次能产出可测量项的工作。

## [适用对象|Who this is for]

- 产品将要面向外部用户，或即将拿到写权限的工具。
- 已有护栏与过滤，但不知道它们在真实话术下漏什么。
- 需要向评审或监管说明「我们主动试过哪些攻击路径」。
- 团队里只有开发者自测，缺少非开发视角。

不适合：还没有可运行的端到端链路。
没有可测对象时，红队只会变成一场聊天比赛。

## [前置条件|Prerequisites]

1. 范围声明：测哪个版本、哪个入口（API 还是产品界面）、哪些工具允许被触发。
2. 人员构成：官方文档建议按经验与学科多样化组队，
   同时包含对抗视角与「普通用户视角」的测试者。
3. 分工方式：把风险条目分配到人，并决定多轮之间是否轮换。
4. 记录位置：一份共享表，含输入、输出、唯一标识、发现时间、测试者。
5. 边界与授权：测试用的数据账号、可能被写坏的东西、谁负责善后。
6. 内容预警机制：结果里可能出现有害样本，报告与查看权限要先定。

Microsoft 官方文档建议记录「输入 / 输出对的可复现标识」，
理由是后续复测要能回到同一条样例。

## [七个步骤|Seven steps]

1. 定目的：这一轮要摸风险面，还是要验证某条缓解措施有效。
2. 开放式先跑：先不设条目清单，让测试者自由试，目的是发现盲区。
3. 汇总成风险清单：把发现归并成条目，每条写定义与示例。
4. 引导式再跑：按清单逐条攻，同时继续记录新出现的条目。
5. 对照缓解措施：带护栏与不带护栏各跑一遍，才能看出措施的作用。
6. 分级与派工：按严重度与发生条件排优先级，指派修复负责人。
7. 输出短报告：官方文档给出的结构是——前列问题、原始数据链接、下一轮计划、致谢测试者。

第 5 步常被省掉。没有对照组，护栏的作用只是感觉。

## [贯穿案例：给工单助手做一次|Worked example: one session for a ticket assistant]

情境与数字均为示例，是虚构假设，不是任何产品的实测结果。

- 输入：一个内部工单助手，能读客户邮件、能改工单状态。
- 处理：4 人 × 90 分钟（示例安排），两人带安全背景、两人是客服业务人员；
  第一轮开放式，第二轮按 6 条风险清单引导；对照组关掉输出护栏再跑同一批攻击话术。
- 结果判断（示例）：共 23 条发现，其中 5 条能让助手承诺未在政策内的赔偿；
  这 5 条里 3 条在关闭输出护栏后仍被工具层拦住，说明当前拦截来自工具层而非输出层。
  按官方文档的提醒，这仍是「识别」，不能读成「发生率低」。
- 失败后下一步：
  把 5 条赔偿承诺写进评测样本集，作为回归项长期跑；
  对「身份伪装成主管」这一条目，补一条工具入参护栏并在下一轮复测；
  记录未覆盖项——这次没有测多语言输入与附件解析路径。

判据一句话：**一轮红队结束时，能不能拿出「新增可测条目数」和「下一轮计划」。**
只有故事没有条目，这次演练没有收尾。

## [验收|Acceptance]

- [ ] 每条发现都有可复现输入与当轮环境说明
- [ ] 风险清单里的条目带定义与至少一个示例
- [ ] 带缓解与不带缓解的对照结果都留在记录里
- [ ] 明确写出这次未覆盖的入口、语言与数据类型
- [ ] 修复项进入评测或护栏配置，并有复测日期
- [ ] 报告分发范围受控，有害样本不进入公开渠道

## [故障排查分支|Troubleshooting branches]

- 发现集中在少数人手里：轮换分工，或让业务视角的人先出清单。
- 全是老问题：说明攻击面被固定了，换入口测（产品界面而非 API）。
- 测试者被自己环境拦住（401 / 403）：这是权限问题，不算攻击成功，先修访问。
- 会话中途被限流（429）：降低并发与重复密度，别把限流当拦截效果记录。
- 复现不了上轮的样例：检查模型版本与工具权限是否变过，把版本号写进记录。
- 报告把单条样例读成比例：官方文档明确要求区分「识别」与「测量」，措辞要改。
- 修复后仍然易被绕过：OWASP 该项目的价值在于提供风险条目清单，
  逐条比对你补的是哪一类，缺口在哪一类。

## [下一步|Next steps]

1. 把可复现样例交给评测流程，变成回归集的一部分。
2. 需要新增拦截点时，按护栏选型的四个位置判断装在哪里。
3. 下一轮开始前，把这次未覆盖项写进目的清单。
4. 面向采购场景时，把红队发现的类型转成对供应商的追问。

## [核验范围与未知|What was verified and what is not]

2026-11-06 直抓了四处官方来源：Microsoft Learn 的红队规划文档、
Anthropic 关于红队挑战的官方博客页、arXiv 红队方法论文摘要页、
OWASP LLM 应用风险清单项目仓库；护栏一处同页复核。
本篇只转述这些页面写明的做法与边界，未组织或运行任何红队活动。

以下未知：
- 官方文档中的组队规模、时长与人员构成对不同体量产品的适用性——文档本身说明建议并非处处适用。
- Anthropic 博客所载自动化与众测方式的当前实践细节——本次未读到具体执行数据。
- arXiv 论文结论（模型规模越大越难红队，**论文摘要原文**（英文）："RLHF models are increasingly difficult to red team as they scale"）
  能否迁移到你所用的具体模型与安全训练方式——无法据公开结论判断。
- OWASP 清单在你所在版本中的具体条目编号——本次未逐条核对页面表格。
