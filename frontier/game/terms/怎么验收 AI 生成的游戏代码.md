---
zh: "怎么验收 AI 生成的游戏代码"
en: "How to accept AI-generated game code"
stage: 2
ord: 24
what: "按固定流程检查 AI 写的代码：先写下它声称的行为，再逐条运行核对；能编译不等于验收通过。"
whatEn: "A fixed procedure for checking code written by AI: write down what it claims to do, then run each claim down. Compiling is not acceptance."
decision: "验收的对象是行为，不是代码的观感 —— 每一条通过，都要有你能复现的操作步骤。"
decisionEn: "You accept behaviour, not how the code looks — every pass needs a sequence of actions you can reproduce."
confidence: our-judgement
---

# 怎么验收 AI 生成的游戏代码

**这篇解决什么**：AI 写完一段游戏代码之后，在进入项目之前判断它到底能不能要。适用于单次改动在几十到几百行以内的模块；一次生成整个项目那种规模，先拆小再验收（拆分方法见 [提示词的结构](./提示词的结构.html)）。

<!-- EN -->
> **What this guide solves**: after AI writes a piece of game code, deciding — before it enters your project — whether it is actually acceptable. It fits single changes on the order of tens to a few hundred lines; for whole-project generations, split first and accept afterwards (splitting is covered in [Structuring the prompt](./提示词的结构.html)).

## 适用条件

先确认这篇对你有用：

- ✅ 你有一段 AI 新写或大改的代码，且能说清它**应该改变什么行为**
- ✅ 你的引擎版本是固定的，改完能在同一版本上重复运行（版本基线见 [怎么处理引擎版本差异](./怎么处理引擎版本差异.html)）
- ⚠ 不适用：判断「好不好玩」—— 那是玩法验证，见 [最小可玩原型](./最小可玩原型.html)
- ⚠ 不适用：改动大到读不完 —— 先让 AI 拆成多次小改动，回到上面那条

<!-- EN -->
> ## When this applies
>
> - ✅ You have code AI wrote or heavily changed, and you can state **which behaviour it should change**
> - ✅ Your engine version is pinned, so the change can be re-run on the same version (pinning: [Handling engine version differences](./怎么处理引擎版本差异.html))
> - ⚠ Not for judging "is it fun" — that is gameplay validation, see [Minimal playable prototype](./最小可玩原型.html)
> - ⚠ Not for diffs too large to read — ask AI to split into smaller changes first

## 步骤

1. **先写下声称的行为。** 在看代码之前，把需求改写成 3–5 条可操作的判断句，每条形如「做 X 操作，应看到 Y」。这张清单就是验收单。
2. **记录版本。** 写下引擎版本和运行环境（哪台机器、哪个浏览器）。行为核对离不开版本 —— 同一段代码在不同版本上的表现可能不同。
3. **跑起来。** 编译加载无报错只是入场券。如果要把运行步骤脚本化，部分引擎支持命令行操作：Godot 官方命令行文档写明支持从命令行导出项目（出处见文末核验表）。
4. **逐条走验收单。** 每一条都要你真的操作一遍；「看代码觉得对」不算通过。
5. **查边界。** 数值为 0、空、越界、连点、中途退出 —— 边界情况恰恰是 AI 最容易漏掉的（这是本站的归纳，不是测量数据）。
6. **回归旧功能。** 与本次改动相邻的既有功能各跑一条；「AI 修好 A、弄坏 B」是常见形态。
7. **记录结果。** 通过 / 失败 / 待确认三态写进项目记录；失败条目附复现步骤 —— 喂回给 AI 时要用。

<!-- EN -->
> ## The steps
>
> 1. **Write the claimed behaviour first.** Before opening the code, turn the request into 3–5 testable sentences of the form "do X, expect Y". That list is your acceptance sheet.
> 2. **Record the version.** Note the engine version and where you run it. Behaviour checks are meaningless without a version — the same code can behave differently across versions.
> 3. **Run it.** A clean compile is only the ticket to enter. To script the run: some engines support the command line — Godot's official command-line docs state that exporting the project from the command line is supported (see the table at the end).
> 4. **Walk the acceptance sheet line by line.** Each pass requires you to actually perform it; "the code looks right" is not a pass.
> 5. **Probe the edges.** Zero, empty, out of range, button-mashing, quitting mid-action — edge cases are what AI most often misses (our generalisation, not a measurement).
> 6. **Regression-test the neighbours.** Re-run one adjacent existing feature per area the change touches; "AI fixes A, breaks B" is a common shape.
> 7. **Log the result.** Pass / fail / unconfirmed — three states, written into the project record, each failure carrying its repro steps, because you will feed them back to AI.

## 一个可走查的例子

⚠ 本例的需求文本、行数与现象都是**虚构示例**，不是实测记录。

- **输入**：「给玩家冲刺：按 Shift 向前冲一段，之后进入冷却。」AI 交回一个约 40 行的脚本片段（行数虚构）。
- **处理**：验收单三条 —— ① 冷却就绪时按 Shift 触发冲刺；② 冲刺期间按住方向键不改变速度；③ 冷却中按 Shift 无反应且无报错。逐条在固定版本的引擎里操作。
- **结果判断**：① 通过（冲刺触发了）；② 失败 —— 现象：冲刺中按住右方向键时角色明显变快，判为两处速度叠加；③ 通过。
- **失败后下一步**：把 ② 的复现步骤原样喂回 AI（按键、按住、现象），要求只改速度合成这一处，并重新给出验收单；改完从第 4 步重走，并把「冲刺 + 任意移动输入」列为常设回归项。

<!-- EN -->
> ## A walk-through example
>
> ⚠ The requirement text, the line counts and the symptoms below are a **fictitious example**, not a measured log.
>
> - **Input**: "give the player a dash — press Shift to burst forward, then a cooldown." AI returns a script of about 40 lines (count invented).
> - **Processing**: three acceptance lines — ① Shift with the cooldown ready triggers the dash; ② holding a direction key during the dash does not change speed; ③ Shift during cooldown does nothing and throws no error. Each is performed in the pinned engine.
> - **Result**: ① pass; ② fail — observed: holding right during the dash visibly speeds the character up, read as two velocity contributions stacking; ③ pass.
> - **After the failure**: feed the repro of ② straight back to AI (keys, hold, symptom), ask it to change only the velocity composition and return a fresh acceptance sheet; rewalk from step 4, and keep "dash + any movement input" as a standing regression case.

## 失败分支

| 失败形态 | 下一步 |
|---|---|
| 跑不起来，报错读不懂 | 把**完整报错原文**和目标版本一起给 AI，要求先解释再改 |
| 能跑，但说不清为什么对 | 该行标「待确认」，要求 AI 指出对应逻辑的位置；指不出就重做该模块 |
| 修复引入了新失败 | 回滚到上一个通过版本再修；没有通过版本就整段重做 |
| 同一条失败修了两次还在 | 停止逐条修补：把该模块的声称行为重写一遍，整模块重来 |

<!-- EN -->
> ## Failure branches
>
> | Shape of failure | Next step |
> |---|---|
> | Will not run; the error is unreadable | Give AI the **full error text** plus the target version; explanation before changes |
> | Runs, but nobody can say why it is correct | Mark the line "unconfirmed"; ask AI to point at the logic — if it cannot, redo the module |
> | The fix introduced a new break | Roll back to the last passing version; if there is none, redo the module |
> | The same failure survives two fixes | Stop patching line by line; rewrite the claimed behaviour and regenerate the module |

## 下一步

- 验收通过的代码回到玩法验证：[S2 · 核心循环](./s2-核心循环.html)
- 感觉不对但不是代码错误：[手感问题清单](./手感问题清单.html)
- 要对外发布之前的整体检查：[怎么做一次发布前检查](./怎么做一次发布前检查.html)

<!-- EN -->
> ## Next steps
>
> - Accepted code goes back to gameplay validation: [S2 · The core loop](./s2-核心循环.html)
> - It feels wrong but is not a code bug: [The game-feel checklist](./手感问题清单.html)
> - The full pass before anyone else opens it: [How to run a pre-release check](./怎么做一次发布前检查.html)

## 来源与核验日

- Godot 支持从命令行导出项目 — [Godot 官方命令行教程](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html) · 2026-11-06
> Godot can export projects from the command line — [Godot docs: command line tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html) · 2026-11-06
- 「AI 容易漏边界情况」「修 A 坏 B 常见」 — 本站的归纳判断，无实测数据 · —
> That AI misses edge cases, and that fixing A breaks B, are our summed-up observations, not measured data — our generalisation, no measurements · —

---

<!-- 层：阶段词条 · 一段 AI 代码从「能跑」到「能要」之间的那道闸。 -->
