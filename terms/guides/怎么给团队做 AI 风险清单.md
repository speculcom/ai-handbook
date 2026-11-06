---
zh: 怎么给团队做 AI 风险清单
en: How to Build an AI Risk List for Your Team
kind: guide
station: 6
ord: 7
span: 8
lead: "风险清单不是把「安全」写成口号，而是按场景列清：可能出什么事、现在挡了什么、谁负责补剩下的。"
points: ["按用例拆，不按模型拆：同一个模型用来写周报和用来自动退款，风险面不一样，条目不能共用一行。", "每条风险填五格：场景、触发条件、后果、现有控制、剩余缺口。只填前两格的清单没法驱动任何动作。", "借现成分类打底再补自己的：NIST AI RMF 的 Govern / Map / Measure / Manage 与 OWASP 的 LLM 风险项可以当骨架，别从空白页开始想。", "法规类条目单列一栏，注明依据条文与生效条件（EU AI Act 按用途分层，国内办法按服务类型定性），不要和体验问题混在同一张表里。", "定更新触发线与负责人：接入新模型、接入新数据源、流程改动这三类事件要重跑一遍清单；没人认领的条目按没写处理。", "举个例子（虚构情境）：输入是用例「AI 起草客户回复」→ 处理是按五格填表，触发条件写「涉及退款期限、赔付、法务口径」→ 结果判断是核对现有控制，发现出口没有期限字段核对，缺口成立 → 下一步是把该缺口列成待办，挂上负责人与验证方式（例如按周抽检回复样本，抽检数按你自己的量级定，不照抄别人的阈值）。"]
terms: ["AI 安全", "护栏", "能力边界"]
refs:
  - ["NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework", "NIST AI Risk Management Framework"]
  - ["OWASP GenAI Security Project（LLM 应用风险类别）", "https://genai.owasp.org/", "OWASP GenAI Security Project"]
  - ["欧盟委员会 AI Act 官方页（风险分级与时间表）", "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", "European Commission, AI Act (risk tiers and timeline)"]
last_verified: "2026-11-06"
verified_scope: "refs"
---

# 怎么给团队做 AI 风险清单（How to Build an AI Risk List for Your Team）

**这份指南解决什么**：风险清单不是把「安全」写成口号，而是按场景列清：可能出什么事、现在挡了什么、谁负责补剩下的。

**怎么做**：
1. 按用例拆，不按模型拆：同一个模型用来写周报和用来自动退款，风险面不一样，条目不能共用一行。
2. 每条风险填五格：场景、触发条件、后果、现有控制、剩余缺口。只填前两格的清单没法驱动任何动作。
3. 借现成分类打底再补自己的：NIST AI RMF 的 Govern / Map / Measure / Manage 与 OWASP 的 LLM 风险项可以当骨架，别从空白页开始想。
4. 法规类条目单列一栏，注明依据条文与生效条件（EU AI Act 按用途分层，国内办法按服务类型定性），不要和体验问题混在同一张表里。
5. 定更新触发线与负责人：接入新模型、接入新数据源、流程改动这三类事件要重跑一遍清单；没人认领的条目按没写处理。
6. 举个例子（虚构情境）：输入是用例「AI 起草客户回复」→ 处理是按五格填表，触发条件写「涉及退款期限、赔付、法务口径」→ 结果判断是核对现有控制，发现出口没有期限字段核对，缺口成立 → 下一步是把该缺口列成待办，挂上负责人与验证方式（例如按周抽检回复样本，抽检数按你自己的量级定，不照抄别人的阈值）。

**出处**：清单结构参考 NIST AI RMF 的四类职能与 OWASP GenAI 的风险类别；监管分层看欧盟委员会 AI Act 官方页。例子里的用例与缺口是虚构情境。

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP GenAI Security Project（LLM 应用风险类别）](https://genai.owasp.org/)
- [欧盟委员会 AI Act 官方页（风险分级与时间表）](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)

---
<!-- 微型指南 · 第六站（选得对） · 约 8 分钟 -->
