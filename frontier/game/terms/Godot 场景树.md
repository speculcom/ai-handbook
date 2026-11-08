---
zh: "Godot 的场景树"
en: "Godot's scene tree"
kind: "keyword"
ord: 110
what: "Godot 用 .tscn 文本文件存场景 —— 但它不该由人手写，也不该由 AI 写。"
whatEn: "Godot stores scenes in .tscn text files — but they should be written by neither humans nor AI."
decision: "让 AI 写 GDScript，场景在编辑器里搭。这条不清楚，你会浪费几个小时。"
decisionEn: "Let AI write the GDScript and build the scene in the editor. Without this rule you will waste hours."
confidence: our-judgement
---

# Godot's scene tree



<!-- EN -->
> 

## 为什么 AI 不该写 .tscn

`.tscn` 是**编辑器生成的格式**，它的字段顺序、`uid`、`ext_resource` id
都是编辑器在维护过程中逐渐形成的。AI 写出来的东西往往：

- 能打开，但**资源引用断了**（贴图变红、脚本丢失）
- ⚠ **更糟：能跑，但结构混乱**，你之后完全无法维护

⚠ **根本原因**，个格式是**工具的输出**，不是**人写的代码**。
让 AI 模仿工具的输出，就像让它模仿编译器的中间表示：偶尔能对，但不该这么干。

<!-- EN -->
> ## Why AI should not write .tscn
>
> `.tscn` is a . Its field order, `uid`s and `ext_resource` ids emerge from the editor's maintenance over time. What AI produces is usually:
>
> - Openable, but with broken resource references (red textures, missing scripts)
> - ⚠ Worse: it runs, but the structure is a mess and you will not be able to maintain it afterwards
>
> ⚠ : this format is an output of a tool, not code a person writes. Asking AI to imitate a tool's output is like asking it to imitate a compiler's intermediate representation — occasionally right, but never the right approach.

## 正确的分工

| 谁 | 做什么 |
|---|---|
| **AI** | 写 GDScript 逻辑代码 |
| **你** | 在编辑器里搭场景树、拖节点、连信号 |
| **编辑器** | 生成与维护 `.tscn` |

⚠ 这与 S2「给明确的边界」是同一条原则：
明确说出「不要做什么」，比说「要做什么」更重要。

<!-- EN -->
> ## The right division of labour
>
> | Who | Does what |
> |---|---|
> | **AI** | Writes the GDScript logic |
> | **You** | Build the scene tree, drag nodes, wire signals in the editor |
> | **The editor** | Generates and maintains `.tscn` |
>
> ⚠ This is the same rule as S2's "give explicit boundaries":
> saying what NOT to do matters more than saying what to do.

## 提示词该怎么写

✅ 好的写法：

```
写 Godot 的 GDScript：
- 一个 CharacterBody2D 脚本，处理左右移动与跳跃
- 不要创建场景文件（.tscn），我会自己在编辑器里挂
- 导出 jump_velocity 和 gravity 两个 @export 变量
```

❌ 常见的错误写法：

```
帮我做一个 Godot 平台跳跃游戏，包含场景文件和脚本
```

→ 你会得到一个能打开但资源全断的场景。

<!-- EN -->
> ## How to word the prompt
>
> ✅ A good prompt:
>
> ```
> Write Godot GDScript:
> - A CharacterBody2D script handling left/right movement and jumping
> - Do not create a scene file (.tscn) — I will wire it up in the editor myself
> - Export two @export variables: jump_velocity and gravity
> ```
>
> ❌ The common wrong prompt:
>
> ```
> Make me a Godot platformer, including the scene file and scripts
> ```
>
> → You get a scene that opens with every resource reference broken.

## 运行时改场景树会踩的坑

⚠ 如果你要**生成大量重复场景**（比如 50 个不同配置的敌人），
写脚本生成 `.tscn` 反而是对的：那属于工具用途，不是手写场景。

⚠ 判断标准：你要造的是「一个场景」还是「一批场景」？

<!-- EN -->
> ## Editing the scene tree at runtime
>
> ⚠ If you are generating many repeated scenes (say 50 enemies with different configurations), scripting the generation of `.tscn` is correct — that is tool usage, not hand-authoring scenes.
>
> ⚠ The test: are you building "one scene" or "a batch of scenes"?

---

<!-- 层：关键词 · 一个看起来能写、其实不该让 AI 写的东西。 -->