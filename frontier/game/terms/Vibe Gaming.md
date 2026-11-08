---
zh: "Vibe Gaming"
en: "Vibe Gaming"
kind: "keyword"
ord: 0
what: "借助 AI 编写游戏代码、制作素材并迭代原型的做法。"
whatEn: "Using AI to help write game code, create assets and iterate on prototypes."
decision: "分别检查代码、玩法和素材；某一部分能生成，不代表整个游戏已经可发布。"
decisionEn: "Check code, gameplay and assets separately; generating one part does not establish a releasable game."
confidence: our-judgement
---

# Vibe Gaming

## 先分清在做什么

AI 可以参与代码、图像、声音和关卡草案。不同环节的验收方式不一样。
本站按这些环节组织资料，不把它们合成一个成熟度或效率排名。

| 环节 | 可以请求的产出 | 还需要检查 |
|---|---|---|
| 代码 | 一个角色的移动、碰撞或计分逻辑 | 引擎版本、报错、状态与边界 |
| 素材 | 单张图、短音效、界面草案 | 风格、尺寸、来源与授权 |
| 玩法 | 规则、关卡布局或数值起点 | 目标是否清楚，反馈是否及时，是否有可玩的选择 |
| 发布 | 导出步骤与检查清单 | 别的设备能否打开、输入是否可用、存档是否保留 |

<!-- EN -->
> ## Separate the tasks
>
> AI can contribute code, images, sound and level drafts. Each needs a different kind of acceptance check. This site organizes resources by stage without turning them into one maturity or efficiency ranking.
>
> | Area | Possible output | Checks still needed |
> |---|---|---|
> | Code | Movement, collision or scoring | Engine version, errors, state and boundaries |
> | Assets | An image, short sound or UI draft | Consistency, dimensions, provenance and rights |
> | Gameplay | Rules, layouts or initial values | Clear goals, timely feedback and meaningful choices |
> | Release | Export steps and checklists | Other devices, input and saved progress |

## 对话之后还要留下什么

把当前引擎版本、文件结构和这次只改的功能交代清楚。每次得到代码或素材后，保存到实际工程，再检查它与现有内容能否配合。

例如，只做一个“接住下落方块”的原型：先让方块下落、玩家能移动、接住后加分。然后分别检查漏接、重复计分与重新开始。图像和声音可以之后加入，也可以先用简单素材验证风格需求。

<!-- EN -->
> ## Keep an actual project behind the conversation
>
> State the engine version, file structure and the single feature being changed. Save generated code/assets into the project and check their interaction with existing content.
>
> For a falling-block catcher, start with falling blocks, player movement and scoring. Then check missed blocks, duplicate scores and restart. Add art and sound later, or use small assets early to test a required style.

## 不把生成速度当成完成度

本站没有测量各环节能节省多少时间。对具体项目，应记录生成、修改、检查和返工的时间，才能比较工作量。

风格一致性、关卡是否有趣和发布是否顺利，都需要单独检查。不能从一段代码能运行，推断整套素材或整个游戏都已可用。

<!-- EN -->
> ## Generation speed is not completion
>
> This site has not measured time saved at each stage. Record generation, editing, checking and rework for a project before comparing effort.
>
> Asset consistency, engaging levels and successful release need separate checks. Working code does not establish usable assets or a finished game.

## 从哪里继续

想开始一个项目，先看 [选引擎](./s1-选引擎.html)，再按 [五步流程](./method.html) 做到可以分享。只想看小段代码，可以从 [最小原型](./demos.html) 选一个骨架；它们未经本站运行验证，请检查对应版本和官方文档。

<!-- EN -->
> ## Continue from here
>
> Start with [engine selection](./s1-选引擎.html), then follow the [five-stage process](./method.html) toward a shareable build. For code, pick a [minimal skeleton](./demos.html). These skeletons have not been run by this site; check versions and official documentation.
