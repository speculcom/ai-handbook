---
zh: "长任务 Agent 怎么做检查点"
en: "How to Add Checkpoints to Long-Running Agents"
kind: guide
station: 3
ord: 36
span: 8
lead: "长任务不怕慢，怕的是一步错、全盘重来；检查点是把「可恢复」设计进流程。"
points: ["把任务切成可验证的阶段，每阶段有明确产物与成功条件；不要用「继续做」当阶段。", "每阶段结束写结构化状态：目标、已完成、未完成、关键决策、外部 ID、花费。", "副作用操作（发消息、下单、改文件）前先落检查点；失败时知道做过什么、没做什么。", "恢复时先读状态再行动；不要凭对话历史猜进度。", "设最大步数、预算与时限，超限暂停并请求人工；不要无限重试。", "记录「不可逆操作」清单；恢复时默认不重放，先核对外部状态。"]
terms: ["长时任务", "子代理隔离", "人工复核队列"]
refs:
  - ["Anthropic · Building effective agents", "https://www.anthropic.com/engineering/building-effective-agents", "Anthropic · Building effective agents"]
  - ["LangGraph · Persistence concepts", "https://langchain-ai.github.io/langgraph/concepts/persistence/", "LangGraph · Persistence concepts"]
  - ["学 AI · 长时任务", "https://learn.specul.com/", "Learn AI · Long-running tasks"]
last_verified: "2026-11-19"
verified_scope: "refs"
---

# 长任务 Agent 怎么做检查点（How to Add Checkpoints to Long-Running Agents）

**这份指南解决什么**：长任务不怕慢，怕的是一步错、全盘重来；检查点是把「可恢复」设计进流程。

**怎么做**：
1. 把任务切成可验证的阶段，每阶段有明确产物与成功条件；不要用「继续做」当阶段。
2. 每阶段结束写结构化状态：目标、已完成、未完成、关键决策、外部 ID、花费。
3. 副作用操作（发消息、下单、改文件）前先落检查点；失败时知道做过什么、没做什么。
4. 恢复时先读状态再行动；不要凭对话历史猜进度。
5. 设最大步数、预算与时限，超限暂停并请求人工；不要无限重试。
6. 记录「不可逆操作」清单；恢复时默认不重放，先核对外部状态。

---
<!-- 微型指南 · 第3站 · 约 8 分钟 -->
