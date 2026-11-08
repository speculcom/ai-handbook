---
zh: "上下文窗口与 AI 写游戏"
en: "Context window and AI-written games"
kind: "keyword"
ord: 130
what: "游戏代码天然是大文件、多文件、强耦合 —— 这正好是上下文窗口最弱的场景。"
whatEn: "Game code is naturally large, multi-file and tightly coupled — exactly where the context window is weakest."
decision: "单文件控制在几百行内；每次只让 AI 处理一个模块。"
decisionEn: "Keep single files to a few hundred lines, and let AI work on one module at a time."
confidence: our-judgement
---

# Context window and AI-written games

**一句话**：游戏代码的形态（长期运行、多文件、强耦合）会直接撞上 AI 上下文的上限。

<!-- EN -->
> **In one line**: the shape of game code (long-lived, multi-file, coupled) runs directly into the limits of AI context.

## 文件一多，上下文就不够用

| 游戏代码的特点 | 对上下文窗口的影响 |
|---|---|
| **单个文件很大** | 玩家控制器、敌人 AI、关卡逻辑都几百行起 |
| **跨文件耦合** | 改一个参数要看三个文件才知道影响 |
| ⚠ **长程一致性** | ⚠ 游戏逻辑要前后一致（这个变量在第 3 章出现过） |

⚠ 模型**一次只能看到一部分代码**，它会：
- 重复定义已经存在的函数
- 用不同的命名做同一件事
- ⚠ 忘记自己在第 200 行时约定过什么

<!-- EN -->
> ## Once the file count grows, context runs out
>
> | Property of game code | Effect on the context window |
> |---|---|
> | Large single files | Player controllers, enemy AI and level logic run to hundreds of lines |
> | Cross-file coupling | Changing one parameter means reading three files to see the effect |
> | ⚠ Long-range consistency | ⚠ Game logic must stay consistent (this variable appeared in chapter 3) |
>
> A model sees only part of the code at a time — so it will:
> - redefine functions that already exist
> - use different names for the same thing
> - ⚠ forget what it agreed at line 200

## 实操建议



⚠ 超了就拆。⚠ 这不只对 AI 有好处：人类也受益。



✅ 好：「把敌人 AI 从 80 行扩到 200 行，保持现有的状态机结构」
❌ 差：「加上敌人 AI、关卡、UI」



AI 看不到「上次的约定」，但它**能读注释**：

```python
# 约定：所有伤害计算走 damage() 函数，不要直接改 hp
# 这个约定是项目级的，不要在单个函数里临时改
```

4. ⚠ 定期让 AI 总结当前状态

⚠ 让它写一份「这个项目现在有什么」的文档，
然后。这比硬塞代码进上下文有效得多。

<!-- EN -->
> ## Practical advice
>
> 1. Keep single files to a few hundred lines
>
> ⚠ Split them when they grow past that. ⚠ This helps humans too, not only AI.
>
> 2. Let AI work on one module at a time
>
> ✅ Good: "expand the enemy AI from 80 to 200 lines, keeping the existing state-machine structure"
> ❌ Bad: "add enemy AI, levels and UI"
>
> 3. ⚠ Put key conventions in comments or a document
>
> AI cannot see "what we agreed last time", but it :
>
> ```python
> # Convention: all damage goes through damage(); do not modify hp directly
> # This convention is project-level — do not break it inside a single function
> ```
>
> 4. ⚠ Have AI summarise the project state regularly
>
> ⚠ Ask it to write a document listing "what this project currently has", then have it read that document at the start of every new session. That works far better than stuffing code into the context.

## 本站没有实测长项目上下文

本站**没有实测**不同模型在不同上下文长度下的表现。
以上是基于「上下文窗口是硬约束」这个事实的推断。

⚠ 具体某个模型会怎么退化，请自己测，恰好也符合
本站的精神：**说「未知」比猜好**。

<!-- EN -->
> ## This site has not tested long-project context
>
> This site has  how different models degrade at different context lengths.
> What follows is an inference from the one hard fact: the context window is bounded.
>
> ⚠ Test how your model of choice actually degrades — which is itself in the spirit of this site: saying "unknown" beats guessing.

---

<!-- 层：关键词 · AI 写代码的根本约束之一，值得单独讲。 -->