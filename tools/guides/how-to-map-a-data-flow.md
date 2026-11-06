---
id: how-to-map-a-data-flow
topic: guardrails
title: 怎么做一次数据流梳理
titleEn: How to map a data flow
summary: 一次梳理要画出字段从哪来、经谁处理、存到哪里、多久删；把「数据不出域」这类说法落成可核对的图与表。
summaryEn: One pass should show where each field originates, who processes it, where it is stored and when it is deleted — turning "data stays in our domain" into a checkable diagram and table.
sources:
  - label: NIST Privacy Framework 官方页（2026-11-06 直抓 200）
    url: https://www.nist.gov/privacy-framework
    kind: docs
  - label: Microsoft Purview Data Map 官方文档（2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/purview/data-map
    kind: docs
  - label: Anthropic 官方隐私政策（2026-11-06 直抓 200）
    url: https://www.anthropic.com/legal/privacy
    kind: docs
  - label: AWS 合规与数据隐私常见问题官方页（2026-11-06 直抓 200）
    url: https://aws.amazon.com/compliance/data-privacy-faq/
    kind: docs
  - label: Google Cloud · Gemini Enterprise 使用与审计日志文档（站内既有来源，2026-11-03 复核）
    url: https://docs.cloud.google.com/gemini/enterprise/docs/set-up-usage-audit-logs
    kind: docs
last_verified: 2026-11-06
confidence: partial
---

## [这一篇讲什么|What this guide covers]

**数据流梳理是把一条链路上的字段走向画成能核对的图。**
它的价值在把「我们不看客户数据」这类说法变成可检查的条目。
本篇按一次梳理的粒度写：源头、传输、处理、存储、删除。
模型与工具只是链路上的一类节点，不要单独跳过。

## [适用对象|Who this is for]

- 要接一个 AI 服务，但不清楚数据在哪一步离开自己的边界。
- 需要回答法务或客户的尽调问题：哪些字段被存、存多久。
- 上线材料里要写「是否用于训练」「是否跨境」「谁可访问」。
- 已有多个系统与 agent 混合编排，没人画得出全图。

不适合：纯粹的性能或成本估算。那张图要画的不是数据，是调用量。

## [前置条件|Prerequisites]

1. 一个具体场景，而不是「整个系统」。选一条日常在跑的链路。
2. 能问到三方的联系人：模型服务、托管平台、外包标注（如有）。
3. 字段清单的来源：表结构、日志样例或接口文档，至少一种。
4. 记录口径：同一张表里写清「谁写的、依据哪个页面、核验日期」。

框架层面对照可以用自愿文件搭结构。
NIST Privacy Framework 官方页说明它供组织自愿使用，帮助管理隐私风险。
本站不判断你是否必须采用某一框架，那是辖区与业务的问题。

## [五段结构|Five segments]

| 段 | 要回答的问题 | 常见漏项 |
|---|---|---|
| 源头 | 字段来自哪张表、哪个用户动作 | 把派生字段当成新数据 |
| 传输 | 离开边界前经过哪些服务、加密与端点 | 只记主链路，漏掉遥测与日志上报 |
| 处理 | 谁读、是否落盘、是否进入提示词或检索 | 把检索上下文与用户原话混为一谈 |
| 存储 | 存哪里、多久、谁可访问、是否可删 | 只写保留期，不写备份与导出副本 |
| 删除 | 触发条件、耗时、验证方式 | 没有验证手段，只有承诺 |

第三方条款里能直接抄进表的，是「用途」与「保留」两类句子。
AWS 数据隐私常见问题页写明，
**官方原文**（英文）："We do not access or use your content for any purpose without your agreement."
Anthropic 隐私政策在训练用途上有一句可直接引用：
**官方原文**（英文）："We disassociate Inputs and Outputs from your user ID to use them for training and improving our models."

这句只描述政策里的做法，不覆盖你签约的具体档位；
消费端与企业端的差别要按当期条款另查，本页未逐项核对。

## [梳理步骤|Six steps]

1. 定边界：画出「自己管的」与「别人管的」两块，边界线要能指着说。
2. 列字段：只列敏感或有业务含义的字段，避免整表照抄。
3. 标去向：每个字段标出它在链路上被谁读过、写进过哪里。
4. 查留痕：确认是否真有日志。审计日志默认开关各处不同——
   Google 该文档记载提示与响应日志默认关闭，数据访问审计需在日志服务里开启（站内既有来源，2026-11-03 复核）。
5. 定保留：写出保留期与删除触发方式，注明来源页面。
6. 做核对：拿一条真实请求的样本，把它的字段沿图走一遍。

第 6 步能抓出大部分错图。第 4 步能抓出「以为有日志，其实没开」。

## [贯穿案例：报表助手的一次梳理|Worked example: mapping a reporting assistant]

情境为示例，字段与数字是虚构假设，用来说明画法。

- 输入：一条指令「把上月退款金额按区域汇总」，来自分析师账号。
- 处理：链路上有四个节点——内部数仓、检索层、模型 API、结果邮件服务。
  梳理表逐字段记录：客户邮箱（进入检索层与提示词）、订单号（进入模型 API 请求体）、
  汇总结果（写进邮件正文与工单系统）。
- 结果判断：图上有一处对不上——遥测上报把查询文本带出去了，原图漏画这一段。
  同时发现「删除」段为空：邮件服务里的结果没有保留期说明。
- 失败后下一步：
  补上遥测节点并把查询文本改写字段名后再上报；
  向邮件服务管理员确认保留策略并写回表格，标注依据页面与核验日期；
  在图上加一条「未知」标记，而不是留空——留空会被读成已确认无风险。

判据一句话：**图上每一条边，都能指出它依据哪个页面或哪次实测。**
指不出来的边，就画成虚线并标未知。

## [验收|Acceptance]

- [ ] 一张图覆盖源头到删除五段，没有空白段
- [ ] 字段表每个敏感字段都有去向、保留期与依据来源
- [ ] 至少一条真实请求沿图走通，差异被记录
- [ ] 未确认项以「未知」显式标注，而不是留空
- [ ] 谁在什么时间可以访问，与角色表能对上
- [ ] 复核日期写在图上，过期后有人负责重画

## [故障排查分支|Troubleshooting branches]

- 图画得比实际粗：多半是把「服务」当节点，改成以字段的一次读写为节点。
- 说法与配置对不上：以能改的配置为准，把条款措辞与开关状态分列记录。
- 日志找不到：确认审计开关与保留设置；限流类错误（429）与权限类错误（401 / 403）要分开归因。
- 元数据工具里的血缘缺失：Microsoft Purview 文档指出，血缘抽取可关闭，
  扫描范围与频率需要按计划设置——工具里的图不等于你手工梳理的图。
- 供应商改口：条款页更新后要重画，核验日期跟着更新。
- 一张图想覆盖所有场景：拆成多张，每张只讲一条链路。

## [下一步|Next steps]

1. 把梳理表里的「未知」条目转成对供应商的书面追问。
2. 需要估合规投入时，用梳理表的工作量项作为基数（见对应指南）。
3. 上线前检查：图上每个外发节点是否都有拦截或脱敏策略。
4. 建立周期性重画机制，频率按业务变更速度定，不套用通用周期。

## [核验范围与未知|What was verified and what is not]

2026-11-06 直抓了四处官方来源：NIST Privacy Framework 页、
Microsoft Purview Data Map 文档、Anthropic 隐私政策、AWS 合规与数据隐私常见问题页。
第五条为站内既有来源，沿用 2026-11-03 的复核记录，本次未重抓。

以下未知：
- 你所在辖区要求保留哪些记录、保留多久——本页不作法律判断，需按当期法规与合同核对。
- 各条款页对不同产品档位（消费端、企业端、API）的差异化表述——本次只记录抓到的句子。
- Purview 或其他元数据工具在你环境里的血缘覆盖度——依赖扫描配置与实际数据源，未实测。
