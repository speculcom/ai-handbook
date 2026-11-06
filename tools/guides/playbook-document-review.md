---
id: playbook-document-review
topic: planning
title: 任务：审阅长文与版本变化，保留原文位置
titleEn: Playbook: review document changes with evidence
summary: 用两版虚构制度练习单位变化、否定条件和内部冲突；先给审阅问题，不把模型改写当已批准的新规则。
summaryEn: Use two fictional policy versions to check unit changes, negated conditions and internal conflicts; deliver located questions rather than an assumed approved rewrite.
sources:
  - label: W3C · Web Annotation 文本定位模型
    url: https://www.w3.org/TR/annotation-model/
    kind: docs
last_verified: 2026-11-04
confidence: partial
---

## [下载与范围|Downloads and scope]

这组短材料是长文审阅的缩小练习，CC BY 4.0；不是公司真实制度，不是法律建议，也不代表已审阅真实合同。先使用两版原文，再看参考问题表。

- [policy-v1.md](https://tools.specul.com/samples/review/policy-v1.md)
- [policy-v2.md](https://tools.specul.com/samples/review/policy-v2.md)
- [reference-findings.csv](https://tools.specul.com/samples/review/reference-findings.csv)
- [reference-summary.md](https://tools.specul.com/samples/review/reference-summary.md)

把方法扩展到长文时仍需保留完整版本、目录和跨段引用；不能凭这个短例子认定某工具能处理任意长度文件。

## [先定审阅问题和输出|Define questions and output]

只问四件事：哪些条款变了；数字和单位是否一致；条件/否定是否改变责任；新版内部是否冲突。交付问题矩阵：finding_id、两版位置、原句/释义、变化类别、影响范围、待确认问题、处理状态。摘要中的每条结论要对应矩阵 ID。

定位使用版本名 + P1–P6 小节号，必要时补短引文和上下文。W3C 的文本定位模型说明了用文本与上下文定位片段的方式；本练习采用易读的版本和段落号，不宣称实现了该协议。

## [分段阅读，再查跨段关系|Read sections, then cross-check]

1. 固定文件版本和审阅日期。列出 P1–P6，对齐同主题条款；不要只按页码配对。
2. 先做变更表。P1/P4 未变，也要保留“未变”结论，避免只展示戏剧性变化。
3. 对数字保留单位：14 calendar days 与 10 business days 不能直接按 14 和 10 比大小。缺节假日日历时暂不换算。
4. 单独读 P3 的否定与例外，把条件拆成到期前、到期后两种情况；不替作者选择解释。
5. 汇总所有涉及同一主题的段落。新版 P5 与 P6 的保存天数不一致，不能因为 P6 是摘要就忽略冲突。
6. 输出待确认问题和可追溯摘要。未获确认的问题保留开放，改写稿另标草稿。

## [可复制的任务说明|Reusable task instruction]

```text
审阅两版虚构设备借用规则，不提供法律结论。
按小节对齐，列出变化、未变内容和新版内部冲突。
每条发现给版本、小节、支持原句或准确释义。
保留数字单位、否定和例外；不补作者意图。
先输出问题矩阵，再输出带 finding_id 的摘要。
不修改原文件，不把未确认条款标成已批准。
```

真实长文可先建立全篇索引，再分段审阅，最后专门查跨段关系；分段后的摘要不能替代原文。

## [验收与参考结果|Acceptance and reference]

- F01：指出 P2 单位变化，保留 P6“two weeks”的歧义；不武断判断期限缩短了。
- F02：定位 P3 的审批条件变化，提出谁在何时审批的问题；不把双重否定丢掉。
- F03：新版 P5 为 60 days，P6 为 30 days，记录内部冲突，不自行选一个。
- P1 范围与 P4 免费未变；摘要没有虚构收费变化。
- 每条发现能打开对应版本并定位；摘要引用正确 finding_id，未确认事项仍未确认。

参考表是预先设计的审阅要点，不是产品得分表。可以拆分问题，但证据、范围和处理状态必须保留。

## [失败后查哪里|When it fails]

- 只得到泛泛摘要：要求逐条 finding_id 与出处，先缩到一对小节。
- 引文找不到：检查版本、遗漏的附件、OCR 或检索分段；看 [引用排查](https://tools.specul.com/mcp/guides/failure-library.html#citations)。
- 单段都对、合起来冲突：建立同主题索引后再跨段查；看 [检索排查](https://tools.specul.com/mcp/guides/failure-library.html#retrieval)。
- 被正文中的指令带走：把文档当待审数据，权限限制为读取，不执行其内嵌命令。

## [下一步与核验范围|Next step and verification scope]

把确认后的发现整理成 [带来源的研究简报](https://tools.specul.com/mcp/guides/playbook-research-brief.html)；缺证据的结论先保留在问题表。

2026-11-04 核对了 W3C 文本定位说明。示例原文与参考审阅由本站编写；未宣称完成真实合同审查或运行任何长文产品。
