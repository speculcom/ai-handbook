---
zh: "Phaser"
en: "Phaser"
engine: phaser
script: "TypeScript / JavaScript"
scriptEn: "TypeScript / JavaScript"
tier: "Web 2D"
tierEn: "web 2D"
aiFriendly: high
aiScore: 4
what: "面向网页的 2D 游戏框架，包含场景、物理与资源加载等功能。"
whatEn: "A 2D web-game framework with scenes, physics and asset loading."
decision: "需要框架功能时查看 Phaser；仅需渲染层时再比较 Pixi 等方案。"
decisionEn: "Assess Phaser for framework features; compare rendering libraries such as Pixi when that is all you need."
bestFor: "2D 网页游戏（平台跳跃、射击、拼图等需要物理与场景流转的）"
bestForEn: "2D web games that need physics and scene flow — platformers, shooters, puzzle games"
install: "官方推荐脚手架：`npm create @phaserjs/game@latest`（交互式选官方模板，支持 Vite/Rollup/Webpack 等，多数模板有 JS 与 TS 两版）；已有工程里直接 `npm install phaser`。"
installEn: "The official scaffold: `npm create @phaserjs/game@latest` (interactive picker of official templates; Vite/Rollup/Webpack and more, most in both JS and TS); in an existing project just `npm install phaser`."
installSrc: "https://github.com/phaserjs/phaser#create-phaser-game-app"
installVerified: "2026-10-30"
difficulty: low
difficultyWhy: "核对模板、依赖与 API 版本；场景、物理和输入仍需分别验证。"
difficultyWhyEn: "Check templates, dependencies and API version; validate scenes, physics and input separately."
confidence: our-judgement
verified: "2026-10-30 · GitHub API 快照"
verifiedEn: "2026-10-30 · GitHub API snapshot"
---

# Phaser

**一句话**：Pixi 给你一块画布，Phaser 给你一台装好的机器：循环、物理、场景、资源加载都在里面。

<!-- EN -->
> **In one line**: Pixi hands you a canvas; Phaser hands you a fitted-out machine — loop, physics, scenes and asset loading are already inside.

## 使用条件与检查

| 原因 | 说明 |
|---|---|
| TypeScript / JavaScript | 可使用类型检查和浏览器调试工具；仍需验证生成代码 |
| **官方脚手架** | `create-phaser-game` 交互式选模板：AI 不用自己拼构建配置 |
| **内置系统全** | 物理、输入、tween、场景、资源加载都是现成的：AI 要发明的代码少 |
| **文档与示例量大** | 官方教程 + 海量社区示例，AI 的「记忆」里素材多 |
| **官方明说 AI 友好** | 官方 README 专设「AI-Assisted Game Development」一节：称其 API 被主流大模型深度理解，仓库还自带 `skills/` 目录给 AI agent 用（官方说法，非本站实测） |
| **MIT 许可** | 商用无阻碍 |

<!-- EN -->
> ## Usage conditions and checks
>
> | Reason | Explanation |
> |---|---|
> | TypeScript / JavaScript | One of the most-trained game languages — AI gets it right first try more often |
> | Official scaffolding | `create-phaser-game` interactively picks an official template — AI never assembles a build setup |
> |  | Physics, input, tweens, scenes, asset loading are ready — less for AI to invent |
> | Docs & examples volume | Official tutorials plus a huge example base — lots of material in AI's "memory" |
> | Officially AI-friendly | The README has an "AI-Assisted Game Development" section: it claims mainstream LLMs understand the Phaser API deeply, and the repo ships a `skills/` folder for AI agents (their claim, not our measurement) |
> | **MIT licence** | No obstacle to commercial use |

## 它的代价

- ⚠ **API 面大**：概念比 Pixi 多（Scene / config / game object 模型），读文档的时间要留够
- **框架不小**：官方 README：完整 min 构建 gzip 后约 345 KB（比多数贴图还小，但不是零成本）
- **2D only**：做 3D 得换 Three.js
- **Web only**：发桌面/手机原生要另套壳（Electron/Capacitor 等）

<!-- EN -->
> ## What it costs
>
> - ⚠  — more concepts than Pixi (Scene / config / game-object model); budget reading time
> - Not a small framework — official README: the full minified build is ~345 KB gzipped (smaller than most textures, but not free)
> - **2D only** — for 3D switch to Three.js
> - **Web only** — desktop or native mobile needs another wrapper (Electron/Capacitor etc.)

## 什么时候选它 / 不选

**选**：2D 网页游戏，需要物理、场景流转、资源加载这些「引擎件」；想让 AI 少发明轮子

**不选**：只要一层渲染（选 Pixi 更薄）；要 3D；要发原生平台为主

<!-- EN -->
> ## When to pick it, and when not to
>
> **Pick it for**: 2D web games that need the engine parts — physics, scene flow, asset loading — and for letting AI invent fewer wheels
>
> **Do not pick it if**: you only need a rendering layer (Pixi is thinner); you need 3D; native platforms are the primary target

## 最小 starter

一个最小 Scene，只画一个矩形，用来确认渲染与场景启动正常。

```
const game = new Phaser.Game({
  type: Phaser.AUTO, width: 800, height: 600,
  scene: { create() { this.add.rectangle(400, 300, 64, 64, 0x44aaff); } }
});
```

官方文档：https://phaser.io/

<!-- EN -->
> ## Minimal starter
>
> A minimal Scene that draws one rectangle to confirm rendering and scene boot.
>
> ```
> const game = new Phaser.Game({
>   type: Phaser.AUTO, width: 800, height: 600,
>   scene: { create() { this.add.rectangle(400, 300, 64, 64, 0x44aaff); } }
> });
> ```
>
> Official docs: https://phaser.io/

## 可核验事实

| 项 | 值 | 核验源 |
|---|---|---|
| 仓库 | `phaserjs/phaser` | GitHub API |
| 许可 | **MIT** | 同上 |
| 主语言 | JavaScript | 同上 |
| ★ | 40,603 | 同上 |
| 最后提交 | 2026-08-21 | 同上（**活跃**）|
| 官方定位 | "a fun, free and fast 2D game **framework**" | 官方 README |

<!-- EN -->
> ## Verifiable facts
>
> | Item | Value | Source |
> |---|---|---|
> | Repository | `phaserjs/phaser` | GitHub API |
> | Licence | **MIT** | same |
> | Main language | JavaScript | same |
> | Stars | 40,603 | same |
> | Last push | 2026-08-21 | same (**active**) |
> | Official description | "a fun, free and fast 2D game **framework**" | official README |

---

<!-- 层：第一层 · 选对工具 · 2D 网页游戏里「引擎件」最全的一档。 -->
