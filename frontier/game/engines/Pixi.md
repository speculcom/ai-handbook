---
zh: "Pixi"
en: "Pixi"
engine: pixi
script: "TypeScript"
scriptEn: "TypeScript"
tier: "Web 2D"
tierEn: "web 2D"
aiFriendly: high
aiScore: 4
what: "面向网页的 2D 渲染库；游戏逻辑和其他系统按需求组合。"
whatEn: "A 2D web rendering library; compose gameplay and other systems as needed."
decision: "先明确是否只需要渲染层，再决定物理、场景与打包方案。"
decisionEn: "Establish whether a rendering layer is sufficient, then choose physics, scene and packaging tools."
bestFor: "2D 网页游戏、小游戏原型"
bestForEn: "2D web games and small prototypes"
install: "装 Node.js v20 或更高 → `npm create pixi.js@latest` 生成脚手架（官方推荐 Vite + PixiJS 模板）→ `npm install` → `npm run dev`。也可以只往已有工程里加：`npm install pixi.js`。"
installEn: "Install Node.js v20 or newer → `npm create pixi.js@latest` to scaffold (the docs recommend the Vite + PixiJS template) → `npm install` → `npm run dev`. Or add it to an existing project with `npm install pixi.js`."
installSrc: "https://pixijs.com/8.x/guides/getting-started/quick-start"
installVerified: "2026-10-30"
difficulty: low
difficultyWhy: "官方模板可帮助建立工程；依赖、构建与浏览器支持仍需按版本检查。"
difficultyWhyEn: "Official templates can establish a project; check dependencies, builds and browser support by version."
confidence: our-judgement
verified: "2026-10-30 · GitHub API 快照"
verifiedEn: "2026-10-30 · GitHub API snapshot"
---

# Pixi

**一句话**：适合需要 2D 渲染层的网页项目，不能仅凭语言判断 AI 生成代码的可靠性。

<!-- EN -->
> **In one line**: it supplies a 2D rendering layer for web projects; language choice alone does not establish generated-code reliability.

## 使用条件与检查

| 原因 | 说明 |
|---|---|
| **TypeScript** | 类型检查可帮助发现部分错误；本站没有跨语言生成正确率数据 |
| 浏览器分发 | 发布后的网页可通过链接打开；开发和构建仍需配置 |
| **概念少** | 学习 Sprite / Container / Texture，并单独安排玩法与其他系统 |
| **MIT 许可** | 商用无阻碍 |

<!-- EN -->
> ## Usage conditions and checks
>
> | Reason | Explanation |
> |---|---|
> | **TypeScript** | Type checking can expose some errors; this site has no cross-language generation-accuracy measurements |
> | Browser delivery | A deployed build can be opened by URL; development still has setup requirements |
> | Rendering concepts | Learn Sprite / Container / Texture and the systems your project adds |
> | **MIT licence** | No obstacle to commercial use |

## 它的代价

- ⚠ **没有内置物理系统**：得自己接（matter.js / planck.js）
- ：`Container` 是通用容器，场景树要自己组织
- **2D only**：做 3D 得换 Three.js

<!-- EN -->
> ## What it costs
>
> - ⚠ No built-in physics — you attach one yourself (matter.js / planck.js)
> - No level / scene-management layer — `Container` is a generic container; you organise the scene tree yourself
> - **2D only** — for 3D you would switch to Three.js

## 什么时候选它 / 不选

**选**：2D 网页游戏、快速原型、Game Jam

**不选**：需要完整引擎功能（碰撞、关卡 / 资源管理都现成）

<!-- EN -->
> ## When to pick it, and when not to
>
> **Pick it for**: 2D web games, quick prototypes, game jams
>
> **Do not pick it if**: you need complete engine features out of the box (collision, level management, asset management)

## 最小 starter

一个最小 Sprite，用 v8 的异步 init 启动 Application。

```
const app = new PIXI.Application();
await app.init({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.canvas);
const sprite = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
app.stage.addChild(sprite);
```

官方文档：https://pixijs.com/

<!-- EN -->
> ## Minimal starter
>
> A minimal Sprite using the v8 async init for Application.
>
> ```
> const app = new PIXI.Application();
> await app.init({ background: '#1099bb', resizeTo: window });
> document.body.appendChild(app.canvas);
> const sprite = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
> app.stage.addChild(sprite);
> ```
>
> Official docs: https://pixijs.com/

## 可核验事实

| 项 | 值 | 核验源 |
|---|---|---|
| 仓库 | `pixijs/pixijs` | GitHub API |
| 许可 | **MIT** | 同上 |
| 主语言 | TypeScript | 同上 |
| ★ | 48,594 | 同上 |
| 最后提交 | 2026-10-03 | 同上（**活跃**）|
| 官方定位 | “The HTML5 Creation Engine” | 官方 README |

<!-- EN -->
> ## Verifiable facts
>
> | Item | Value | Source |
> |---|---|---|
> | Repository | `pixijs/pixijs` | GitHub API |
> | Licence | **MIT** | same |
> | Main language | TypeScript | same |
> | Stars | 48,594 | same |
> | Last push | 2026-10-03 | same (**active**) |
> | Official description | "The HTML5 Creation Engine" | official README |

---

<!-- 层：第一层 · 选对工具 · 2D 网页游戏线：单文件示例可直接在浏览器跑。 -->