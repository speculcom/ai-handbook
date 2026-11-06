---
zh: 论文卡-Constitutional AI
en: Paper Card - Constitutional AI
kind: paper
station: 4
ord: 8
span: 9
lead: "把「一份人写的原则清单」当成监督来源的训练方法。这张卡列清它要解决什么、摘要给了哪些结论、以及它没有主张什么。"
points: ["研究问题（摘要开篇原话）：\"we would like to enlist their help to supervise other AIs\"——目标是 \"training a harmless AI assistant through self-improvement\"，且 \"without any human labels identifying harmful outputs\"；人工监督只剩一份规则或原则清单（\"The only human oversight is provided through a list of rules or principles\"），作者据此命名 Constitutional AI。", "方法证据位置（摘要自述两阶段）：监督阶段的做法是 \"generate self-critiques and revisions\" 再 \"finetune the original model on revised responses\"；强化学习阶段用模型比较两个样本、从 AI 偏好数据训出偏好模型并把它当奖励信号，摘要称之为 \"RL from AI Feedback\"（RLAIF）。正文里的实验数值与设置摘要一条都没给。", "作者自陈的结论口径：训出的是 \"a harmless but non-evasive AI assistant that engages with harmful queries by explaining its objections to them\"；两阶段都可借思维链式推理改善人评表现与决策透明度。摘要末句 \"with far fewer human labels\" 说的是人工标签的数量与可控性，不是安全性保证。摘要没有独立的局限清单，局限要看正文——本次核验只覆盖 arXiv abs 页摘要。", "它没有主张的：没有主张这套方法消除有害输出，也没有主张「用了 Constitutional AI 就等于安全」；原则清单由人来写，写哪些、漏哪些仍是人的判断，这一步在摘要层面没有被验证。", "读法提示（虚构需求）：把它当「监督来源换成规则文本」的做法来读，而不是当成安全证书。输入是你的场景里有一批必须拒绝且要说明理由的请求 → 处理是逐条问「这条能否写成一条可执行原则，还是要靠运行时拦截」→ 结果判断是凡是只能靠运行时拦的条目，就判定这篇方法覆盖不到 → 下一步是把这些条目写进自己的复核与事件流程，别在文档里写「已用 Constitutional AI」当作结论依据。"]
terms: ["偏好对齐", "训练三阶段", "护栏"]
refs:
  - ["Bai 等《Constitutional AI: Harmlessness from AI Feedback》（arXiv 2212.08073）", "https://arxiv.org/abs/2212.08073", "Bai et al., Constitutional AI: Harmlessness from AI Feedback (arXiv 2212.08073)"]
  - ["Ouyang 等《Training language models to follow instructions with human feedback》（arXiv 2203.02155，用于对照人工反馈路线）", "https://arxiv.org/abs/2203.02155", "Ouyang et al., InstructGPT (arXiv 2203.02155), for contrast with the human-feedback route"]
last_verified: "2026-11-06"
verified_scope: "refs"
---

# 论文卡：Constitutional AI（How to Read It）

**这张卡解决什么**：把「一份人写的原则清单」当成监督来源的训练方法。这张卡列清它要解决什么、摘要给了哪些结论、以及它没有主张什么。

**读这张论文要带走的**：
1. 研究问题：能力上来之后想让 AI 参与监督其他 AI；训练无害助手时不使用人工标注的有害输出，人工监督只剩一份原则清单。
2. 方法证据位置：摘要自述两阶段——自我批评与改写后微调（SL），再用 AI 偏好数据训偏好模型并作为奖励信号（RLAIF）；数值与实验设置要看正文。
3. 作者自陈的边界：结论口径是 harmless but non-evasive、会解释拒绝理由；「far fewer human labels」说的是标签量与可控性，不是安全保证。摘要没有独立局限清单。
4. 它没有主张的：没有主张消除有害输出，也没有主张用了这套方法就等于安全；原则清单写什么、漏什么由人决定。
5. 读法提示（虚构需求）：按「哪些要求能写成原则、哪些只能靠运行时拦截」去读，覆盖不到的部分落到自己的复核与事件流程。

**出处**：以上英文原话均引自 2026-11-06 当日核对的 arXiv abs 页摘要；正文的章节结构、实验数字与局限讨论不在本次核验范围内，因此这张卡不复述。例子里的场景判断为虚构需求。

- [Bai 等《Constitutional AI: Harmlessness from AI Feedback》（arXiv 2212.08073）](https://arxiv.org/abs/2212.08073)
- [Ouyang 等《Training language models to follow instructions with human feedback》（arXiv 2203.02155）](https://arxiv.org/abs/2203.02155)

---
<!-- 论文卡 · 第四站 · 约 9 分钟 -->
