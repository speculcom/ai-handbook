---
zh: Agent 评估怎么做
en: How to Evaluate Agents
kind: guide
station: 3
ord: 13
span: 8
lead: "Agent 的成败不只在最终答案：工具选对没、参数对不对、走了多少步、花了多少钱，都要进评测。"
points: ["先定义任务成功条件：不是「回答像样」，而是「目标完成 + 工具调用正确 + 没有越权」。", "记录完整轨迹：消息、工具调用、参数、返回值、步数、耗时与 token；没有轨迹就无法归因。", "分开评四件事：最终答案、工具选择、参数正确性、过程效率（步数与成本）。", "多次运行时分别记录成功率与失败类型；pass@k 表示多次尝试中至少一次成功，不能用它代替每次都可靠。需要衡量重复可靠性时，应明确“全部 k 次成功”的统计口径。", "按每次调用分别计算输入、输出和工具费用，再对全部步骤与重试求和；不要将已经汇总的 Token 再乘步数。", "建回归集：把线上失败案例收进固定题集，每次换模型/改提示词后重跑。"]
terms: ["评估", "基准测试", "模型评测的局限"]
refs:
  - ["OpenAI Evals 官方指南", "https://platform.openai.com/docs/guides/evals", "OpenAI Working with Evals"]
  - ["LangSmith · Evaluation 文档", "https://docs.langchain.com/langsmith/evaluation", "LangSmith Evaluation"]
  - ["AgentBench 论文（arXiv 2308.03688）", "https://arxiv.org/abs/2308.03688", "AgentBench: Evaluating LLMs as Agents"]
  - ["τ-bench 论文（重复可靠性指标，2026-11-04 核对）", "https://arxiv.org/abs/2406.12045", "τ-bench paper (repeatability metrics, checked 2026-11-04)"]
last_verified: "2026-11-03"
verified_scope: "refs"
---

# Agent 评估怎么做（How to Evaluate Agents）

**这份指南解决什么**：Agent 的成败不只在最终答案：工具选对没、参数对不对、走了多少步、花了多少钱，都要进评测。

**怎么做**：
1. 先定义任务成功条件：不是「回答像样」，而是「目标完成 + 工具调用正确 + 没有越权」。
2. 记录完整轨迹：消息、工具调用、参数、返回值、步数、耗时与 token；没有轨迹就无法归因。
3. 分开评四件事：最终答案、工具选择、参数正确性、过程效率（步数与成本）。
4. 多次运行时分别记录成功率与失败类型；pass@k 表示多次尝试中至少一次成功，不能用它代替每次都可靠。需要衡量重复可靠性时，应明确“全部 k 次成功”的统计口径。
5. 按每次调用分别计算输入、输出和工具费用，再对全部步骤与重试求和；不要将已经汇总的 Token 再乘步数。
6. 建回归集：把线上失败案例收进固定题集，每次换模型/改提示词后重跑。

**出处**：评测框架参考 OpenAI Evals 与 LangSmith；Agent 任务集设计参考 AgentBench。

- [OpenAI Evals 官方指南](https://platform.openai.com/docs/guides/evals)
- [LangSmith · Evaluation 文档](https://docs.langchain.com/langsmith/evaluate)
- [AgentBench 论文（arXiv 2308.03688）](https://arxiv.org/abs/2308.03688)

---
<!-- 微型指南 · 第三站（用深） · 约 8 分钟 -->
