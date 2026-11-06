---
id: selftest-20
topic: planning
title: 20 题自测：AI 基础、评测与选型
titleEn: 20-question self-test: fundamentals and evaluation
summary: 20 道基础概念、评测与选型简答题，附参考要点与复习入口；分数仅用于本练习，不证明部署或带教能力。
summaryEn: Twenty questions on fundamentals, evaluation and selection, with answer points and review links. Exercise scores do not establish deployment or teaching competence.
sources:
  - label: 本站 · learn 词条与指南索引
    url: https://learn.specul.com/
    kind: docs
  - label: 本站 · 选型决策者路线
    url: https://learn.specul.com/path/for-managers/
    kind: docs
  - label: 本站 · 成本算式
    url: https://tools.specul.com/mcp/guides/cost-calculator.html
    kind: docs
  - label: 国家网信办 · 生成式人工智能服务管理暂行办法（第二、十七条；2026-11-04 局部复核）
    url: https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm
    kind: docs
  - label: 欧盟委员会 · AI Act（角色、风险与适用时间的核对入口；2026-11-04）
    url: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [怎么用|How to use]

先只读题目，把答案写下来；做完再对答案。每题 2 分，共 40 分。分数仅定位本练习中的复习需求，不能证明生产部署或带教能力。法规题用于练习识别适用前提，具体事项需回原文确认；对应官方入口于 2026-11-04 局部复核。

- 36–40：可开始综合练习，用交付物检验理解。
- 28–35：合格，回看错题对应的站内页。
- 27 及以下：先按错题主题补基础，再回来重做。

## [题目|Questions]

1. RAG 可按哪三个阶段理解？重排是否必需？
2. 什么情况下不该用 RAG，而应该直接调用模型或改流程？
3. 文档分块过大和过小各有什么代价？
4. 混合检索（关键词 + 向量）主要弥补什么缺口？
5. 重排（rerank）在 RAG 里起什么作用，代价是什么？
6. 挑 embedding 模型时，除维度外还要看哪三件事？
7. 「上下文窗口越大越好」为什么是误区？至少说两点。
8. 「量化会让模型能力减半」为什么是误区？正确说法是什么？
9. 显存不够就一定跑不了本地模型吗？说明两种可行做法。
10. 读模型许可证时，哪两个条款决定能不能商用与再分发？
11. 模型卡里最该先看哪四项？
12. 公共榜单分数能直接采信吗？说明两个打折理由。
13. 防提示注入的三条基本做法是什么？
14. 给 AI 工具配权限的四条原则是什么？
15. 列出三条常见的 AI 数据泄露路径。
16. 对照 EU AI Act 自查应记录哪些前提与依据？
17. 判断国内生成式 AI 备案义务，为什么不能只看注册地？
18. 换模型前必须核的五件事是什么？
19. 成本算式里除了 token 单价，还要算哪三类成本？
20. 验证 AI 输出的四个可操作动作是什么？

## [参考答案|Answer key]

1. 资料准备与索引、检索、基于资料生成并核对引用。重排是可选增强，不是每条 RAG 流程必需。
2. 知识不在文档里、需要实时查询、权限边界极复杂，或任务本身只需推理与格式转换时，RAG 会增加链路与失败点。
3. 过大：噪声多、命中不精、浪费上下文；过小：丢上下文、指代断裂、答案碎片化。
4. 专有名词、编号、错误码等精确匹配；向量检索可能漏掉对应项，关键词检索可补充，仍需评估召回。
5. 在召回后按相关性重新排序，提高 top-k 精度；代价是额外模型调用与延迟。
6. 语言覆盖、单位成本与吞吐、在你的领域数据上的自建评测。
7. 中间信息容易被忽略；长上下文成本更高；塞满不等于理解，检索质量仍决定答案。
8. 量化损失依任务与位宽而定，4-bit 在很多任务可用；必须自测，不是固定减半。
9. 不一定；可检查更小模型、更低位宽、CPU/内存 offload 或多设备方案。分别核对后端支持、容量、延迟、通信与任务质量；offload 本身不等于降低权重精度。
10. 商用范围与再分发/衍生作品条款；「开源」不等于「可商用」。
11. 训练数据与用途、评测方法与结果、已知限制、版本与日期。
12. 评测集可能被污染；提示词与任务分布不同；厂商自报口径不统一。
13. 把外部内容当不可信数据；指令与数据分离；最小权限 + 输出校验。
14. 最小权限、白名单、关键动作审批、权限可撤销。
15. 提示词里带敏感信息、检索语料越权、日志与导出、工具调用把数据发到外部。
16. 记录区域、角色、用途与风险判断，再核对义务、法规版本及适用日期；欧委会提供对应官方入口，不能把旧时间表当作当前规定。
17. 暂行办法第二条涉及是否向境内公众提供相关服务，第十七条另涉及舆论属性或社会动员能力。应据具体服务与原文判断；注册地、可直连或名单未匹配都不能单独裁定。
18. 自建评测、接口差异、提示词重测、许可与数据条款、回滚方案（再加线上指标收尾）。
19. 席位/固定成本、显存与电费、人工复核与返工；视频任务再加秒数与尝试次数。
20. 引用回原文、第二人复核、边界与拒答题、记录失败与改法。

## [评分标准|Scoring]

| 得分 | 判定 | 下一步 |
|---|---|---|
| 36–40 | 综合练习 | 用 `exercise-builder` 的交付物检验理解 |
| 28–35 | 合格 | 回看错题对应页面，重做错题 |
| 20–27 | 需补基础 | 先读「怎么评测 RAG 的效果」「怎么验证 AI 的输出」 |
| 0–19 | 基础缺口 | 从 [快速入门](https://learn.specul.com/path/quick-start/) 开始，按当前问题补基础 |

简答题按要点给分：答对核心 2 分；答对一半 1 分；答错或空白 0 分。评分线是练习约定，不是通用能力认证。

## [复习路线|Review path]

- 基础概念：[快速入门](https://learn.specul.com/path/quick-start/)。
- 评测与验证：[RAG 评测](https://learn.specul.com/guide/怎么评测%20RAG%20的效果/)、[输出验证](https://learn.specul.com/guide/怎么验证%20AI%20的输出/)。
- 选型与合规：[决策者路线](https://learn.specul.com/path/for-managers/)、[国内义务](https://learn.specul.com/guide/怎么查生成式%20AI%20合规义务/)、[EU AI Act 自查](https://learn.specul.com/guide/怎么对照%20EU%20AI%20Act%20自查/)。
- 动手：按任务选择 [问答练习](https://tools.specul.com/mcp/guides/exercise-builder.html)、[创作练习](https://tools.specul.com/mcp/guides/exercise-creator.html) 或 [决策练习](https://tools.specul.com/mcp/guides/exercise-manager.html)，无需全部按顺序完成。
