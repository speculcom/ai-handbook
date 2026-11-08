---
zh: "实战流程"
en: "The build order"
what: "五个阶段连成一条线：每一步的产出物是下一步的输入，线断在哪，返工就发生在哪。"
whatEn: "The five stages as one line: each step's output feeds the next, and wherever the line breaks is where you redo work."
decision: "单步做错只贵一次；顺序错了，每一步都在为前一步的错误付账。"
decisionEn: "One wrong step costs you once; a wrong order makes every later step pay for the earlier mistake."
confidence: our-judgement
---

# 实战流程

**五个阶段不是五篇文章，是一条线。** 每个阶段页各自讲清了「做什么」，
但**阶段之间的交接**没人讲 —— 而返工几乎都发生在交接处。

⚠ 本页是**本站的口径**（方法论），不是实测数据。

<!-- EN -->
> **The five stages are not five articles — they are one line.** Each stage page explains what to do,
> but **the handoff between stages** is what nobody covers — and that is where rework happens.
>
> ⚠ This page is **the site's own method**, not measured data.

## 流程总览

| # | 步骤 | 产出物 | 交接检查（过了才准往下走） | 最常见的崩法 |
|---|---|---|---|---|
| 1 | 选引擎 | 一个选型决定 | 你能说出「为什么不是另一个」 | 先定美术风格再挑引擎 —— 顺序倒置 |
| 2 | 核心循环 | 一个能跑的原型 | 「能操作 / 有目标 / 有反馈」三条都是「是」 | 跳过原型直接堆内容 |
| 3 | 手感调参 | 可玩的手感 | 一次只改一个参数，且改动有记录 | 把 AI 第一次给的数值当最终值 |
| 4 | 资产合规 | 一份资产台账 | 每条资产的来源与授权都能当场指出 | 先用起来，发布前才查授权 |
| 5 | 导出发布 | 一个可分享的包 | 在**别人的机器**上能打开 | 最后一刻才发现目标平台导出受限 |

<!-- EN -->
> ## The line at a glance
>
> | # | Step | Output | Handoff check (pass it before moving on) | The usual way it breaks |
> |---|---|---|---|---|
> | 1 | Pick an engine | One selection decision | You can say why it is not the other one | Settling the art style first, then looking for an engine — the order is inverted |
> | 2 | The core loop | A prototype that runs | All three of "operable / goal-directed / responsive" are yes | Skipping the prototype and piling on content |
> | 3 | Game feel | Feel that is playable | One parameter changed at a time, and the change is written down | Treating the AI's first numbers as final |
> | 4 | Asset licensing | An asset ledger | Every asset's origin and licence can be stated on the spot | Using assets first, checking licences before release |
> | 5 | Export and ship | A package you can share | It opens on **someone else's machine** | Discovering at the last minute that the target platform's export is limited |

## 每一步的失败点

⚠ 下面这些**不是单个阶段的失败**，而是**交接处的失败** —— 所以它们在阶段页里看不到。

<!-- EN -->
> ## Where each step breaks
>
> ⚠ These are not failures inside a single stage — they are failures **at the handoff**, which is why the stage pages cannot show them.

### 1 · 选引擎

- ⚠ **顺序倒置**：先定了美术风格或玩法体量，再回头找引擎 —— 于是引擎的导出与性能限制变成硬伤。
  → 先按 [选引擎](./s1-选引擎.html) 的判据定工具，再谈风格。
- ⚠ **把「AI 友好」当成「引擎好不好」**：本站只整理语言、文档与工具链的适用条件，没有测量 AI 写错代码的概率，也不据此给引擎排强弱。
- ⚠ **没看导出**：网页与移动端导出各有硬限制，见 [Web 导出可行性](./web-导出可行性.html)。

<!-- EN -->
> ### 1 · Picking an engine
>
> - ⚠ **Inverted order**: settling the art style or the scope first, then hunting for an engine — and its export and performance limits become hard blockers.
>   → Pick the tool by the criteria in [Picking an engine](./s1-选引擎.html) first, then talk about style.
> - ⚠ **Reading "AI-friendly" as "a better engine"**: this site describes language, documentation and toolchain constraints. It does not measure AI error rates or rank engine quality from them.
> - ⚠ **Ignoring export**: web and mobile exports each have hard limits — see [Web export feasibility](./web-导出可行性.html).

### 2 · 核心循环

- ⚠ **没有目标感**：角色能动，但玩家不知道该干嘛 —— 这不算原型。
- ⚠ **一次让 AI 写太多**：提示词里塞进敌人、UI、存档，结果拿到一堆半成品。
  → 见 [提示词的结构](./提示词的结构.html)。
- ⚠ **把长会话当版本控制**：关键决定散在对话里，改到后面自己也不知道哪一版是对的。

<!-- EN -->
> ### 2 · The core loop
>
> - ⚠ **No sense of goal**: the character moves, but the player does not know what to do — that is not a prototype.
> - ⚠ **Asking AI for too much at once**: stuffing enemies, UI and saves into one prompt returns a pile of half-finished features.
>   → See [Structuring the prompt](./提示词的结构.html).
> - ⚠ **Using a long chat as version control**: key decisions scatter across the conversation, and later you cannot tell which version was right.

### 3 · 手感调参

- ⚠ **一次改三个参数**：改完不知道是哪个起的作用，下次遇到同类问题还是不会调。
- ⚠ **把 AI 给的数值当结论**：AI 能给一个起点，但「好不好玩」没有测试能自动判定。
- ⚠ **在错误的地方调**：先确认是手感问题还是代码问题，见 [手感问题清单](./手感问题清单.html)。

<!-- EN -->
> ### 3 · Game feel
>
> - ⚠ **Changing three parameters at once**: afterwards you cannot tell which one mattered, and the next similar problem is just as hard.
> - ⚠ **Treating the AI's numbers as a conclusion**: AI can give you a starting point, but no test can decide whether it feels good.
> - ⚠ **Tuning in the wrong place**: establish whether it is a feel problem or a code problem first — see [The game-feel checklist](./手感问题清单.html).

### 4 · 资产合规

- ⚠ **先用后查**：到发布前才发现字体或音乐不能商用 —— 这是返工成本最高的一种。
- ⚠ **没有台账**：素材来源散在下载目录里，谁也说不清哪一条能用。
  → 见 [AI 资产台账](./ai-资产台账.html) 与 [字体的授权陷阱](./字体的授权陷阱.html)。

<!-- EN -->
> ### 4 · Asset licensing
>
> - ⚠ **Use first, check later**: discovering before release that a font or a track cannot be used commercially — the most expensive kind of rework.
> - ⚠ **No ledger**: sources are scattered across download folders, and nobody can say which asset is usable.
>   → See [The AI asset ledger](./ai-资产台账.html) and [The font licensing trap](./字体的授权陷阱.html).

### 5 · 导出发布

- ⚠ **在开发机上能跑就以为能发布**：目标平台可能不支持你用到的特性。
- ⚠ **首版做太大**：见 [先发极简版](./先发极简版.html)。

<!-- EN -->
> ### 5 · Export and ship
>
> - ⚠ **"It runs on my machine" taken as "it can ship"**: the target platform may not support what you used.
> - ⚠ **A first release that is too big**: see [Ship the smallest version first](./先发极简版.html).

## 三条贯穿全流程的原则

| 原则 | 为什么 |
|---|---|
| **一次只改一个变量** | 同时改多个就无法归因 —— 调参、修 bug、换引擎都适用 |
| **先能跑，再好看** | 粗糙原型逼你先验证玩法，而不是被「看起来还行」误导 |
| **台账从第一天开始记** | 合规成本随资产数量增长，事后补台账等于把资产重查一遍 |

<!-- EN -->
> ## Three rules that run through everything
>
> | Rule | Why |
> |---|---|
> | **Change one variable at a time** | Change several and you cannot attribute the result — true for tuning, bug fixing and swapping engines alike |
> | **Runnable first, pretty later** | Crude prototypes force you to validate the gameplay instead of being seduced by "it already looks decent" |
> | **Keep the ledger from day one** | Licensing cost grows with the number of assets; rebuilding the ledger later means re-checking every asset |

## 想直接抄代码

六个引擎的**最小骨架**（能操作 / 有目标 / 有反馈）见 [作品库与最小可玩原型](./demos.html)。
⚠ 那些骨架**未经本站实测**，是起点模板，每个都附了官方入门出处。

<!-- EN -->
> ## If you just want code to copy
>
> Minimal skeletons for the six engines (operable / goal-directed / responsive) are in [The minimal prototype code list](./demos.html).
> ⚠ Those skeletons are **not tested by this site** — they are starting templates, each with a link to the official tutorial.

---

## 完整例子：接住下落的方块

下面是假设项目的实施与验收记录，不是本站已运行的游戏。目标是在网页里，用键盘或触屏接住方块，每接住一次加一分。

1. **选工具**：记录目标浏览器、语言经验和候选版本。先检查输入与网页导出；不根据“AI 友好度”直接定胜负。
2. **做循环**：先用矩形占位，包含下落、左右移动、碰撞和计分。记录三种输入：接住、漏接、重新开始。接住后重复加分时，先修状态或碰撞处理，不加更多关卡。
3. **调手感**：固定方块速度，只改玩家移动速度；用同样的一组操作比较。再单独改下落速度。记录主观感受与具体改动，避免把感觉写成性能数据。
4. **登记素材**：即使只用简单图形，也记录生成或取得方式。加入字体、音乐时分别补来源、许可和署名位置；不沿用其他素材的许可判断。
5. **导出检查**：在目标浏览器检查加载、输入、暂停、失败与重开；换一个窗口尺寸检查遮挡。分享后，记录其他设备是否出现问题，再决定下一步。

这份记录完成后，得到的是可以复查的最小项目过程。它不证明游戏有趣，也不保证所有设备都支持；未检查的浏览器或功能应继续留在未确认项中。

<!-- EN -->
> ## Worked example: catch falling blocks
>
> This hypothetical implementation/acceptance record is not a game executed by this site. The goal is a browser game with keyboard/touch input and one point per catch.
>
> 1. **Choose tools**: record target browser, language experience and candidate versions. Check input/export rather than declaring a winner from supposed AI friendliness.
> 2. **Build the loop**: use rectangles for falling, movement, collision and score. Check catches, misses and restart. Fix repeated-scoring/state errors before adding levels.
> 3. **Tune feel**: keep fall speed fixed while changing movement speed and repeating the same actions. Change fall speed separately afterwards. Record subjective impressions and values without treating them as performance data.
> 4. **Record assets**: document even simple shapes. Track font/music sources, licenses and attribution separately; one asset's permission does not establish another's.
> 5. **Check the export**: inspect loading, input, pause, failure and restart in the target browser; check another window size for obstruction. Record issues on other devices after sharing.
>
> The result is a reviewable minimal-project process. It does not establish engaging gameplay or support for every device. Keep unchecked browsers and features unresolved.

<!-- 层：贯穿层 · 五个阶段的交接与具体例子。 -->
