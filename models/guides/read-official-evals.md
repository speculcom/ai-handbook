---
id: read-official-evals
title: 怎么按官方口径读一个模型的评测说明
titleEn: How to read a model's evaluation write-up on its official terms
summary: 读一份官方评测说明要补齐的四件事：任务集范围、指标口径、对照与版本、声明出处。哪些话有依据、哪些话只能留空，以及自报数字与你的任务之间隔着什么。
summaryEn: The four things to fill in when reading an official evaluation write-up: task-set scope, metric definition, comparison and version, and where the claim comes from. What can be stated, what must stay blank, and what separates a self-reported number from your task.
sources:
  - label: MMLU 论文摘要页（arXiv 2009.03300，自述覆盖 57 项任务的 multitask accuracy 测试，2026-11-06 直抓）
    url: https://arxiv.org/abs/2009.03300
    kind: paper
  - label: Codex 论文摘要页（arXiv 2107.03374，自述 HumanEval 以功能正确性衡量由注释生成程序，2026-11-06 直抓）
    url: https://arxiv.org/abs/2107.03374
    kind: paper
  - label: QLoRA 论文摘要页（arXiv 2305.14314，自述 NF4 数据类型与单卡 48GB 微调 65B 的条件，2026-11-06 直抓）
    url: https://arxiv.org/abs/2305.14314
    kind: paper
  - label: Llama 3 论文摘要页（arXiv 2407.21783，声明公开的制品范围与安全模型，未逐项列分数，2026-11-06 直抓）
    url: https://arxiv.org/abs/2407.21783
    kind: paper
last_verified: 2026-11-06
confidence: partial
---

## [这一篇解决什么|What this guide settles]

这一篇讲的是怎么读别人写的评测说明，不是怎么替它下结论。

评测说明是一份条件句：谁在什么任务集上、用什么指标、和哪个版本比。四个成分齐全才算读到位。

本站不跑评测、不复现分数，也不在任何档位之间做优劣排名。家族卡上的能力声明一律逐条挂出处，出处之外留空。

## [先定位四件事|Locate the four parts first]

拿到一段评测说法，先找这四个成分，找不到就先记下缺口。

- 任务集范围：题目来自哪里、有多少类、训练与测试是否隔离。
- 指标口径：算的是通过率、精确匹配还是评分量表，分母是什么。
- 对照与版本：和什么比、对方用哪个版本、谁跑的评测。
- 声明出处：这句话出现在论文、模型卡还是发布公告，页面上是否仍可核对。

四个成分里只要有一个缺，这段说法就只能作为「未定口径」记录，不能升级成结论。

## [任务集给的是范围，不是能力标签|A task set bounds scope, it is not a capability label]

任务集本身定义了它能说明什么，也定义了它不能说明什么。

- MMLU 论文摘要写它是衡量文本模型 multitask accuracy 的测试，覆盖 57 项任务，出处见 [arXiv 2009.03300](https://arxiv.org/abs/2009.03300)。范围声明止于此，分数不外推到别的任务。
- Codex 论文摘要把 HumanEval 描述为衡量「由 docstring 生成程序」的功能正确性，出处见 [arXiv 2107.03374](https://arxiv.org/abs/2107.03374)。它测的是通过给定测试的能力，不是代码是否可维护。
- 同一个数字换分母就换含义：单题通过率、按任务宏平均、按样本数加权平均是三种口径。
- 任务集会被训练语料覆盖。是否隔离、怎么处理，要看该评测自己的说明。

## [分数之外必须补齐的条件|The conditions that sit outside the score]

同一份权重在不同设置下会给出不同数字。下面这些项缺一项，可比性就缺一块。

- 提示模板与 few-shot 数量：模板不同，同一任务的得分可以不同。
- 上下文长度与截断规则：长输入被截时，得分测的是截断后的行为。
- 采样设置：贪心解码、温度、样本数与是否多次取样后取通过结果，都会改变得分。
- 评测脚本与版本：题目解析、判分实现和容错规则都随版本变。
- 对照组的算力与配置：对照模型是否用同一套设置跑，需要页面自己说明。

官方页没写这些项时，只有一条处理办法：**官方未说明**就按未说明记录，不替它补齐。

## [自报、复现与第三方口径|Self-reported, replicated and third-party numbers]

三种口径的可信来源不同，读法也不同。

- 自报：作者自己跑并公布，通常最完整，也最需要看它公开的脚本与设置。
- 复现：第三方按公布方法重跑。差异要同时核对版本、设置与判分实现。
- 榜单：聚合口径常常统一了提示模板，也就统一不了你的任务。
- 厂商自评基准：本站在家族卡上会点名它是厂商自评，不当作横向裁决。

一句话口径：本站只说这句话有没有出处、出处覆盖了什么，不说它证明了模型有多好。

## [硬件与规模声明也是条件句|Hardware and scale claims are conditional too]

评测说明常带一句「在某种硬件上跑得动」，它同样只是条件句。

- QLoRA 论文摘要自述用 4-bit NormalFloat（NF4）这一数据类型，并自述在该方法下可在单张 48GB 显卡上微调 65B 参数模型，出处见 [arXiv 2305.14314](https://arxiv.org/abs/2305.14314)。这句话绑定的是论文里的方法与设置，不是任意机器的保证。
- Llama 3 论文摘要自述公开了 405B 参数的预训练与后训练版本，以及用于输入输出安全的 Llama Guard 3，出处见 [arXiv 2407.21783](https://arxiv.org/abs/2407.21783)。摘要本身不逐项列评测分数，分数要回到论文对应章节。
- 「单卡可跑」的口径要拆到精度、上下文长度、并发和运行时预留；这四个数不同，结论就不同。
- 参数量与体积都不能替你算出你这台机器的可用量，容量口径见「GPU 事实与成本数学」。

## [虚构例子：一段评测说明怎么读|A fictional example: reading one write-up]

下面的文字与数字都是虚构教学假设，不对应任何真实模型、官方页或本站运行结果。

假设某官方页写了一行数字：任务 A 得分 61.2，任务 B 得分 47.5。同一行还写着比上一版高 6.1。

- 先问分母：任务 A 有多少题、按什么判分；61.2 是通过率还是量表分。
- 再问设置：提示模板、few-shot 数量、上下文长度、采样与重复次数是否写明。
- 再问对照：上一版是否同脚本同硬件同配置，还是引用了旧页面里的数字。
- 最后问范围：这两个任务集是否覆盖你要做的事；不覆盖时这句话只说明它自己的范围。

如果四项都问不到答案，正确做法是把这行数字按原样记录，标记为口径未定。它不能被读成「这个模型更适合某任务」。

## [把说明转成你的检查|Turning the write-up into your own checks]

评测说明的价值在于给你一条可执行的检查路径，不是一个可以直接引用的结论。

- 先按自己的任务定判定标准，再决定要看哪些分数；判定标准可参考 [怎么搭评测](https://tools.specul.com/mcp/guides/evaluation.html)。
- 用固定输入跑一次结果检查，入口是 [20 项自测清单](https://tools.specul.com/mcp/guides/selftest-20.html)。
- 需要记录假设与容量时，用 [上下文与并发预算](https://models.specul.com/guides/gpu-cost-math.html#capacity-workbench)；它的算式只适用于同层标准全注意力 MHA / GQA，MLA、混合与滑动窗口要另算。
- 涉及费用构成时用 [成本计算器](https://tools.specul.com/mcp/guides/cost-calculator.html)，本站不保存任何单价。

学 AI 站的 [模型评测的局限](https://learn.specul.com/term/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90/)、[基准测试](https://learn.specul.com/term/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95/) 与 [模型卡](https://learn.specul.com/term/%E6%A8%A1%E5%9E%8B%E5%8D%A1/) 是给使用者的一页科普。

这一篇给的是读官方评测说明时要补哪些条件。同一个概念在两处深度不同，互链不重复。
