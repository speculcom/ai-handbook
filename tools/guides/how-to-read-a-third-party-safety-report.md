---
id: how-to-read-a-third-party-safety-report
topic: guardrails
title: 怎么读一份第三方安全报告
titleEn: How to read a third-party safety report
summary: 按评估对象、版本、任务口径、结论边界四件事读别人出的安全报告，把「通过了」还原成「在什么条件下通过了什么」。
summaryEn: Read external safety reports along subject, version, task definition and claim boundary, turning "it passed" into "what passed, under which conditions".
sources:
  - label: Model Cards 论文（arXiv 1810.03993，2026-11-06 直抓摘要页）
    url: https://arxiv.org/abs/1810.03993
    kind: paper
  - label: International AI Safety Report 官方站（2026-11-06 直抓 200）
    url: https://internationalaisafetyreport.org
    kind: docs
  - label: 英国 AI Security Institute 政府组织页（2026-11-06 直抓 200）
    url: https://www.gov.uk/government/organisations/ai-security-institute
    kind: docs
  - label: Anthropic 官方透明度页 · 安全评估与 system card 索引（2026-11-06 直抓 200）
    url: https://www.anthropic.com/transparency
    kind: docs
  - label: NIST AI Risk Management Framework 官方页（2026-11-06 直抓 200）
    url: https://www.nist.gov/itl/ai-risk-management-framework
    kind: docs
last_verified: 2026-11-06
confidence: partial
---

## [这一篇讲什么|What this guide covers]

**第三方安全报告是别人替你的问题写的答案。**
它值多少信任，取决于你能不能还原它的条件。
本篇给一套读法：先定位评估对象与版本，再看任务口径，
最后判断结论被推到多远。读不出条件，这条结论对你起不了作用。

## [适用对象|Who this is for]

- 采购或评审时收到厂商递来的评估结果、认证或 system card。
- 你要在内部会上引用一份外部报告，需要说清它能撑住哪句话。
- 你自己的产品被第三方测过，你要判断结论是否被转述过头。
- 需要做上线判断，但手上只有别人的分数。

不适合：想要一份「谁更安全」的排序。
不同报告的任务口径不可比，硬排会得出没有依据的结论。

## [前置条件|Prerequisites]

1. 报告原文或可打开的完整版本，摘要转述不够。
2. 被评估的具体版本号与发布日期，写在你的记录里。
3. 你自己的场景清单：任务类型、语言、用户群体、工具权限。
4. 一句你能接受复述的结论边界，例如「它只覆盖聊天输出，不覆盖工具写入」。

## [四类来源|Four kinds of reports]

| 来源 | 常见内容 | 读时要盯住 |
|---|---|---|
| 厂商自述 | system card、透明度页、发布说明 | 自测与外测的区分，未披露项 |
| 政府或跨国评估机构 | 能力与风险综述、专项评测 | 抽样范围、时间点、局限声明 |
| 学术与规范提案 | 文档格式建议、评测方法 | 它主张什么、不主张什么 |
| 框架类文件 | 风险管理的结构与做法 | 它是自愿采用还是强制要求 |

厂商自述页通常给索引而非全量数据。
Anthropic 透明度页列出部分安全评估摘要与一份完整 system card。
条目按政治倾向、诚实性、agent 安全等分开。
**本页只描述其索引形态**：条目分得细，不代表每个条目都有同等深度的数据。

学术一侧，Model Cards 论文建议随模型发布一份简短的表现说明。
**论文摘要原文**（英文）把它定义为 "short documents accompanying trained machine learning models"。
这句话的含义是：报告的价值在「分条件的表现」，不在一个总分。

## [读报告的七个步骤|Seven reading steps]

1. 测的是哪个具体版本？版本对不上，结论不迁移。
2. 谁做的测试，用什么接口？API 端点与产品界面行为可能不同。
3. 任务口径怎么定义？「有害」「越狱成功」的定义不同，分数不可比。
4. 样本从哪来？公开集、合成集还是自建集，覆盖你关心的语言与场景吗。
5. 报告自己怎么陈述局限？把它自陈的限制原样抄进你的记录。
6. 有没有失败与未测项清单？只报成功项的报告要降低信任权重。
7. 结论被引用时加了什么？转述者常把「在 X 任务上未观察到」写成「不会发生」。

第 3 步与第 5 步通常省事。跨国评估类报告自身就强调缺口：
International AI Safety Report 官方站写明，
**原文**（英文）："significant gaps remain: sophisticated attackers can often bypass current defences"
同一页面还说明它的统筹方式：报告由 30 多个国家提名的国际专家咨询小组统筹。
撰写者与资助方公开可查。

## [贯穿案例：读一段抗注入结论|Worked example: reading an injection-resistance claim]

情境为示例，数字是虚构假设，用来演示读法，不是任何报告的实测值。

- 输入：一段转述——「某模型在提示注入测试中通过率为 98%」。
- 处理：按七个步骤逐条回到原文查：
  被测版本、测试接口、任务定义、样本来源、局限声明、未测项、引用差异。
- 结果判断（示例）：原文写的是「在两类公开注入模板、单轮对话设定下，
  拒绝率 98%」。转述把「拒绝率」写成「通过率」，把两类模板写成整体能力。
  结论可用范围因此缩小：你的多轮工具链路不在其覆盖内。
- 失败后下一步：
  把可引用句子改成「该报告在 X 设定下测得 Y，未覆盖我方 Z」；
  若决策依赖工具链的抗注入，安排一次自己的红队，别等别人的报告补空白。

判据一句话：**能不能把结论原样念给做实现的人听，他能不能照着安排工作。**
念不出来，这条结论就只是宣传材料。

## [验收|Acceptance]

- [ ] 记录里每个引用结论都带版本号、日期与来源页
- [ ] 能写出该报告「没有覆盖什么」，且不少于三条
- [ ] 引用句与原文的口径差异被明确标出
- [ ] 关键结论有第二来源，或标明只有单一来源
- [ ] 决策所需但报告未覆盖的部分，已安排自测

## [故障排查分支|Troubleshooting branches]

- 找不到原文：按「未核验」处理，不要写进决策材料。
- 报告有多个版本：以被测产品对应日期的版本为准，并记下你读的版本号。
- 分数与自测差很远：先比对任务定义与样本，再怀疑产品退化。
- 只给图表不给方法：把可引用范围缩到「作者声称」级别。
- 引用他人报告时对方已撤回或更新：更新你的记录，别沿用旧结论。
- 认证类材料与能力评估混用：管理体系认证说明流程存在，不说明模型更安全。

## [下一步|Next steps]

1. 把可引用的结论整理成一页，标注覆盖范围与缺口。
2. 针对缺口安排一次红队，或写进供应商问卷追问。
3. 需要把风险管理与组织流程对齐时，参考自愿框架的结构（NIST AI RMF 官方页说明其供组织自愿使用）。
4. 报告更新后重新核对引用句，核验日期跟着改。

## [核验范围与未知|What was verified and what is not]

2026-11-06 直抓了五处来源页面：Model Cards 论文摘要页、
International AI Safety Report 官方站、英国 AI Security Institute 政府组织页、
Anthropic 透明度页、NIST AI 风险管理框架页。
本篇只转述这些页面自身写明的内容，未读取任何完整报告的正文数据。

以下未知：
- 各报告内部的具体任务定义、样本量与统计口径——需要读全文，本次未逐份展开。
- 厂商透明度页中每条摘要的更新日期与方法细节——本次只确认索引结构存在。
- 你所在行业的监管是否把某类报告当作必需材料——取决于辖区与产品定位，本页不作判断。
