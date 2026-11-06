---
id: how-to-vet-an-ai-vendor-questionnaire
topic: guardrails
title: 怎么审 AI 供应商问卷
titleEn: How to vet an AI vendor questionnaire
summary: 问卷的答案要能被文档指认：六组问题、三档判定、例外写进合同附录，口头承诺一律按未知记。
summaryEn: Every answer must be pointable to a document: six question groups, a three-way verdict, exceptions moved into the contract annex. Verbal promises count as unknown.
sources:
  - label: Anthropic 官方隐私政策（2026-11-06 直抓 200）
    url: https://www.anthropic.com/legal/privacy
    kind: docs
  - label: AWS 合规与数据隐私常见问题官方页（2026-11-06 直抓 200）
    url: https://aws.amazon.com/compliance/data-privacy-faq/
    kind: docs
  - label: NIST AI Risk Management Framework 官方页（2026-11-06 直抓 200）
    url: https://www.nist.gov/itl/ai-risk-management-framework
    kind: docs
  - label: Claude · Enterprise Administrator Guide（站内既有来源，2026-11-03 复核）
    url: https://claude.com/resources/tutorials/claude-enterprise-administrator-guide
    kind: docs
  - label: Cursor · Admin API 官方文档（审计日志导出）（站内既有来源，2026-11-03 复核）
    url: https://cursor.com/docs/account/teams/admin-api
    kind: docs
  - label: Microsoft Learn · Copilot 数据保护与审计架构（站内既有来源，2026-11-03 复核）
    url: https://learn.microsoft.com/en-us/microsoft-365/copilot/architecture-data-protection-auditing
    kind: docs
last_verified: 2026-11-06
confidence: partial
---

## [这一篇讲什么|What this guide covers]

**审问卷就是要求每个答案都能被一份文档指认。**
厂商说「支持」不算答案，说清在哪一版、哪个界面、什么权限才算。
本篇给六组问题、三档判定与例外处理。
答不上来的项按未知记，不进对比表，只进合同附录的追问清单。

## [适用对象|Who this is for]

- 采购或续约，需要把 AI 服务当供应商纳入尽调。
- 安全或合规团队收到销售递来的能力清单，需要判断能否采信。
- 已有站内那份 18 问清单（见「采购与权限审计清单」），要一套判答规则。
- 要把结论交给签字的人，他需要知道哪些是查证的、哪些是没查的。

不适合：只想比功能名。功能名对比不看权限与留痕，会得出无法执行的答案。

## [前置条件|Prerequisites]

1. 你的场景清单：数据类别、用户群体、必须可审计的动作。
2. 问题清单与判答口径先定好，别在评审会上临时发明标准。
3. 要求书面回答并附文档链接；口头说明要有会议纪要才算数。
4. 一个记录表：问题、答案、依据页面、核验日期、判定档位。
5. 明确谁有权签例外放行，以及例外的有效期。

## [六组问题|Six question groups]

| 组 | 问什么 | 可核对的证据形态 |
|---|---|---|
| 身份 | SSO 协议、SCIM、会话失效、角色分层 | 管理员文档里的角色与设置页 |
| 数据 | 训练用途、区域、保留期、可分粒度清理 | 隐私政策与数据处理条款的具体句子 |
| 日志 | 事件覆盖范围、导出方式、保留时长、接口 | 审计日志文档与 API 参考 |
| 模型 | 版本标识、下线通知期、是否可自带模型与密钥 | 模型页与发布说明 |
| 合同 | 输出归属、DPA 与子处理者、认证范围 | 条款正文与证书适用性说明 |
| 退出 | 导出格式、耗时、账号与集成停用时间 | 导出文档与终止条款 |

证据句子要抄进记录表，不是只写「有」。
举两个已复核的例子（站内既有来源，2026-11-03 复核）：

- [Cursor](../../coding/products/cursor.md) 的审计日志走 Admin API 导出。官方文档同时写明调用频率限制。
- [Microsoft 365 Copilot](../../chat/products/microsoft-copilot.md) 的交互进入统一审计日志体系。保留与 eDiscovery 归 Purview 侧管。

这两条的价值不在结论，而在形态——答案能落到接口与页面，就可复核。

## [三档判定|Three verdicts]

- **已证实**：给出当期文档页面或条款段落，且适用档位与你签约主体一致。
- **部分成立**：能力存在但范围受限，例如只对某一档、某一区域或某一界面生效。
- **未知**：只给口头承诺、销售材料，或链接指向与你的场景无关的页面。

判定的关键是档位与主体。同一厂商的不同界面（消费端、团队版、API）常写在不同页面。
AWS 数据隐私常见问题页对内容用途有一句可直接引用的表述：
**官方原文**（英文）："We do not access or use your content for any purpose without your agreement."
Anthropic 隐私政策则直接写明训练用途的处理方式，
**官方原文**（英文）："We disassociate Inputs and Outputs from your user ID to use them for training and improving our models."
两句都要按你实际签约的那一档复核，别把政策页当合同读。

## [审问卷步骤|Six steps]

1. 发问：按六组发出，要求书面回答与链接，注明回复期限。
2. 逐条回源：打开链接确认页面存在、日期不旧、主体与档位对得上。
3. 判档：按三档判定，未证实的写清「差哪一份材料」。
4. 追问：把未知项集中成一轮追问，别在多条邮件里散着问。
5. 落附录：判定为「部分成立」且你仍能接受的，写进合同附录并设复核时间。
6. 定演练：签约前用试用账号做一次核对——导出审计日志、改一次策略、走一次停用。

第 6 步能抓出「文档有但界面没有」的差距。
若对方提到风险管理做法，可对照自愿框架的结构看它覆盖了哪些环节
（NIST AI RMF 官方页说明其供组织自愿使用，不规定实现方式）。

## [贯穿案例：一条「支持 SSO」的回答|Worked example: one "we support SSO" answer]

情境为示例，回复内容与判定过程是虚构假设，不是任何厂商的真实答复。

- 输入：问「支持哪些 SSO 协议与自动开通」，答「支持主流企业单点登录」。
- 处理：回源三步——要求指明协议（SAML 还是 OIDC）、是否有 SCIM 开通与停用、
  管理员角色分层写在哪个页面、该能力属于哪一档；对方补了一个链接。
- 结果判断（示例）：链接页面存在，但写的是团队版功能，而你要签企业版；
  且页面未提及离职停用的生效时限上限。判定为「部分成立 + 一项未知」，
  不能记成「已证实」，因为档位与你的场景不一致。
- 失败后下一步：
  追问两个具体问题：企业版是否包含同一开关、停用账号到会话失效的上限时长；
  在答复前，把这条从对比表移到「未知」列，评分不计入；
  若商务催签，把两条承诺写成合同附录并约定上线后 30 天内用试用账号演练验证（示例期限）。

判据一句话：**答案能不能变成一次可执行的核对动作。**
变成不了，它就还只是宣传口径。

## [验收|Acceptance]

- [ ] 每个已证实项都有当期页面链接、核验日期与适用档位
- [ ] 记录表里未知、部分成立、已证实三类数量分开统计
- [ ] 至少一组问题落到了可演练动作（导出日志或改策略）
- [ ] 例外项写进合同附录，含复核时间与责任人
- [ ] 销售材料与文档的表述差异被明确列出
- [ ] 退出路径的每一项都有格式与耗时说明，而不是「支持导出」

## [故障排查分支|Troubleshooting branches]

- 答复越来越长但仍不可判定：把问题拆成是否题，要求逐条链接。
- 链接打不开或已跳转：按未证实处理，要求提供等效页面或书面说明。
- 只给认证不给范围：认证说明流程存在，不说明能力覆盖你用的服务；要适用性与主体清单。
- 文档与试用账号不一致：以你能改的配置为准，把差异记成缺陷项而不是笔误。
- 审计接口调用受限（429）或权限不足（401 / 403）：这是集成条件，要单独问额度与角色要求。
- 对方拒答某组问题：写为未知并在评审会上说明缺口，不默认放行。
- 多家答案无法比较：统一判定口径与问题编号后再比，比排名更有用（本站不排名）。

## [下一步|Next steps]

1. 把未知项按「问供应商」和「自己演练」两类分开排期。
2. 上线前用数据流梳理核对一次：问卷答案与图上的节点是否一致。
3. 需要外部能力证据时，按读第三方安全报告的口径复核引用句。
4. 续约季重跑一次判答，核验日期与页面版本一起更新。

## [核验范围与未知|What was verified and what is not]

2026-11-06 直抓了三处官方来源：

- Anthropic 隐私政策
- AWS 合规与数据隐私常见问题页
- NIST AI RMF 页

另三条为站内既有来源，沿用 2026-11-03 的复核记录，本次未重抓。
本页未联系任何厂商，也未替厂商确认能力范围。

以下未知：
- 各厂商在你所在档位、区域与合同主体下的具体条款差异——必须按当期文档逐家核对。
- 认证证书覆盖的服务清单与有效范围——需要索取证书适用性说明，本次未核。
- 子处理者名单的更新频率与通知机制——各家做法不同，本页不概括。
