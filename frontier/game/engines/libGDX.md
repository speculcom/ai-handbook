---
zh: "libGDX"
en: "libGDX"
engine: libgdx
script: "Java / Kotlin"
scriptEn: "Java / Kotlin"
tier: "Java 跨平台"
tierEn: "Java cross-platform"
aiFriendly: medium
aiScore: 3
what: "基于 Java 的跨平台游戏开发框架，项目需配置 JVM 构建与目标平台。"
whatEn: "A Java-based cross-platform game-development framework; configure JVM builds and target platforms."
decision: "已有 Java/Kotlin 经验时可按平台要求评估，并先跑通官方示例。"
decisionEn: "Assess target-platform requirements with Java/Kotlin experience and start from an official example."
bestFor: "⚠ 要发布到 Android、且团队用 Java/Kotlin"
bestForEn: "⚠ Shipping to Android with a Java/Kotlin team"
install: "先装 JDK 17 或更高，官方推荐**正好 21**（否则 Construo 桌面打包要额外改配置）。从 gdx-liftoff 的 releases 下那个**名字里不带操作系统的 .jar**（跨平台）→ `java -jar gdx-liftoff-VERSION.jar` → 在 GUI 里填工程名 / 目标平台 / 语言 → Generate。产出是 Gradle 多模块工程，再用 IDE 打开。当前默认对应 libGDX 1.14.2。"
installEn: "Install JDK 17 or newer; the docs recommend **exactly 21** (otherwise Construo desktop packaging needs extra configuration). Download the **.jar with no OS in its name** (cross-platform) from the gdx-liftoff releases → `java -jar gdx-liftoff-VERSION.jar` → set project name, target platforms and language in the GUI → Generate. It produces a multi-module Gradle project that you then open in an IDE. It currently targets libGDX 1.14.2."
installSrc: "https://github.com/libgdx/gdx-liftoff"
installVerified: "2026-10-30"
difficulty: high
difficultyWhy: "需要 JDK、项目生成与 Gradle 等构建步骤；按目标平台核对额外依赖。"
difficultyWhyEn: "Account for JDK, project generation and Gradle, plus target-platform dependencies."
confidence: our-judgement
verified: "2026-10-30 · GitHub API 快照"
verifiedEn: "2026-10-30 · GitHub API snapshot"
---

# libGDX



<!-- EN -->
> 

## 使用条件与检查

| 原因 | 说明 |
|---|---|
|  | 语法严格但模式固定，AI 的 Java 能力优于 Rust/C++ |
| **Kotlin 也很好写** | 协程与空安全降低了出错的可能 |
| **Apache-2.0** | 商用无阻碍 |
| **跨平台成熟** | 桌面 + Android + iOS + Web |

<!-- EN -->
> ## Usage conditions and checks
>
> | Reason | Explanation |
> |---|---|
> | Java toolchain | Compiler checks help locate some errors; no language-level AI accuracy ranking is asserted |
> | Kotlin is also easy to write | Coroutines and null safety remove a class of mistakes |
> | **Apache-2.0** | No obstacle to commercial use |
> | Mature cross-platform | Desktop + Android + iOS + Web |

## libGDX 的门槛在 Gradle 构建

构建是它的真正门槛：

- Gradle 依赖解析：版本冲突时的报错**极难读懂**
- Android 打包需要 Android SDK：环境配置本身就是一道坎
- ⚠ AI 会写出能编译逻辑但配不出环境的构建文件

⚠ 这一点与 S5「导出与发布」是同一类问题：

<!-- EN -->
> ## libGDX's barrier is the Gradle build
>
> These build steps still need to be configured and checked:
>
> - Gradle dependency resolution — the errors on a version conflict are extremely hard to read
> - Android packaging needs the Android SDK — the environment setup is its own hurdle
> - ⚠ AI can write build files whose logic compiles but whose environment never resolves
>
> ⚠ This is the same class of problem as S5's "ship it": deterministic engineering, where a model can only guess.

## 什么时候选它 / 不选

**选**：⚠ 需要 Android 发布。团队用 Java/Kotlin。跨平台是硬需求。

**不选**：只做桌面或网页（Godot 或 Pixi 都更省事）

<!-- EN -->
> ## When to pick it, and when not to
>
> **Pick it for**: ⚠ Android publishing, a Java/Kotlin team, and a genuine cross-platform requirement
>
> **Do not pick it if**: you are only targeting desktop or web (Godot or Pixi are both less work)

## 最小 starter

一个 ApplicationAdapter，create 里建 SpriteBatch 与 Texture，render 里画出来。

```
public class MyGame extends ApplicationAdapter {
    SpriteBatch batch; Texture tex;
    public void create() { batch = new SpriteBatch(); tex = new Texture("badlogic.jpg"); }
    public void render() {
        Gdx.gl.glClearColor(0, 0, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        batch.begin(); batch.draw(tex, 0, 0); batch.end();
    }
    public void dispose() { batch.dispose(); tex.dispose(); }
}
```

官方文档：https://libgdx.com/wiki/

<!-- EN -->
> ## Minimal starter
>
> An ApplicationAdapter that builds SpriteBatch and Texture in create and draws in render.
>
> ```
> public class MyGame extends ApplicationAdapter {
>     SpriteBatch batch; Texture tex;
>     public void create() { batch = new SpriteBatch(); tex = new Texture("badlogic.jpg"); }
>     public void render() {
>         Gdx.gl.glClearColor(0, 0, 0, 1);
>         Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
>         batch.begin(); batch.draw(tex, 0, 0); batch.end();
>     }
>     public void dispose() { batch.dispose(); tex.dispose(); }
> }
> ```
>
> Official docs: https://libgdx.com/wiki/

## 可核验事实

| 项 | 值 | 核验源 |
|---|---|---|
| 仓库 | `libgdx/libgdx` | GitHub API |
| 许可 | **Apache-2.0** | 同上 |
| 主语言 | Java | 同上 |
| ★ | 25,491 | 同上 |
| 最后提交 | 2026-09-24 | 同上（活跃）|
| 官方定位 | “Desktop/Android/HTML5/iOS Java game development framework” | 官方 README |

<!-- EN -->
> ## Verifiable facts
>
> | Item | Value | Source |
> |---|---|---|
> | Repository | `libgdx/libgdx` | GitHub API |
> | Licence | **Apache-2.0** | same |
> | Main language | Java | same |
> | Stars | 25,491 | same |
> | Last push | 2026-09-24 | same (active) |
> | Official description | "Desktop/Android/HTML5/iOS Java game development framework" | official README |

---

<!-- 层：第一层 · 选对工具 · 跨平台需求明确时才值得。 -->