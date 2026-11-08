---
zh: "Three.js"
en: "Three.js"
engine: three
script: "JavaScript"
scriptEn: "JavaScript"
tier: "Web 3D"
tierEn: "web 3D"
aiFriendly: high
aiScore: 4
what: "面向网页的 JavaScript 3D 库；具体游戏功能需要自行组合。"
whatEn: "A JavaScript 3D library for the web; compose game-specific features separately."
decision: "适合需要网页 3D 渲染、能自行安排玩法和资源流程的项目。"
decisionEn: "Assess it for web 3D rendering when you can organize gameplay and asset workflows."
bestFor: "网页 3D 展示、可以自己搭架构的项目"
bestForEn: "Web 3D showcases, and projects where you are willing to build the architecture"
install: "两条路。① npm + 构建工具：装 Node.js，然后 `npm install --save three` 与 `npm install --save-dev vite`，跑 `npx vite`。② 不用构建工具：在 index.html 里写 import map 指向 CDN，再用 `npx serve .` 起本地服务器。**官方没有脚手架**，工程结构（index.html + main.js + public/）要自己建；addons 不需另装、但要单独 import。"
installEn: "Two routes. (1) npm plus a build tool: install Node.js, then `npm install --save three` and `npm install --save-dev vite`, and run `npx vite`. (2) Without a build tool: add an import map in index.html pointing at a CDN, then start a local server with `npx serve .`. **There is no official scaffolding** — you create the project layout (index.html + main.js + public/) yourself; addons need no separate install but must be imported separately."
installSrc: "https://threejs.org/docs/#manual/en/introduction/Installation"
installVerified: "2026-10-30"
difficulty: medium
difficultyWhy: "场景、相机、渲染器及构建需要配置；依据对应版本的入门文档开始。"
difficultyWhyEn: "Configure scene, camera, renderer and build using the target version’s getting-started documentation."
confidence: our-judgement
verified: "2026-10-30 · GitHub API 快照"
verifiedEn: "2026-10-30 · GitHub API snapshot"
---

# Three.js

**一句话**：提供网页 3D 渲染；具体游戏功能需要自行组合。

<!-- EN -->
> **In one line**: a web 3D rendering library; assemble the game-specific features separately.

## Three.js 提供什么，项目还要安排什么

Three.js 提供场景图、加载器与加载管理等能力。它们能帮助显示与加载资源，但游戏的关卡规则、资源在各阶段何时创建和释放、物理与构建流程仍需要按项目组合。

不要把“不是完整游戏引擎”误写成“没有加载器或缓存相关工具”。具体 API 以 [官方加载管理文档](https://threejs.org/docs/pages/LoadingManager.html) 和目标版本为准。

<!-- EN -->
> ## Library features and project responsibilities
>
> Three.js provides a scene graph, loaders and loading management. These support rendering/loading, while level rules, asset creation/disposal policy, physics and builds still need project-specific composition.
>
> “Not a full game engine” does not mean “no loaders or cache-related tools.” Check the [official loading-manager documentation](https://threejs.org/docs/pages/LoadingManager.html) and the target version.

## 使用条件与检查

| 原因 | 说明 |
|---|---|
| JavaScript/TypeScript | 可以结合类型检查和浏览器开发工具核对代码；本站不知道各模型训练语料的完整构成 |
| **API 极其稳定** | Three.js 的 API 十多年没大改，AI 学到的是当前的知识 |
| **概念少** | 场景、相机、渲染器、光源、材质：五件事说完，没有引擎的复杂度 |
| **错误容易看出来** | 画不出来通常是相机位置或灯光问题，AI 能猜对 |

<!-- EN -->
> ## Usage conditions and checks
>
> | Reason | Explanation |
> |---|---|
> | JavaScript/TypeScript | Use type checking and browser tools to inspect code; this site does not know the full training-data composition of each model |
> | API version | Match examples and dependencies to the actual release; the same library name does not establish compatibility |
> |  | Scene, camera, renderer, lights, materials — five things, with none of an engine's complexity |
> | Failures are visible | If it renders wrong it is usually camera position or lighting, and AI can guess that |

## 它的代价

⚠ 代价是「你得自己搭引擎」：

| 你要自己解决的 | 意味着 |
|---|---|
| 关卡 / 资源管理 | 每次切换关卡要自己处理加载与资源释放 |
| 物理 | 得自己接一个物理库（ cannon-es / rapier） |
| 资产加载 | 得自己写加载器与进度条 |
| 后期 | 得自己做对象池、垃圾回收控制 |

<!-- EN -->
> ## What it costs
>
> ⚠ The cost is "you have to build the engine yourself":
>
> | What you must solve | What that means |
> |---|---|
> | Level / asset management | Every level switch means handling loading and asset disposal yourself |
> | Physics | You must attach a physics library (cannon-es / rapier) |
> | Asset loading | You write the loader and the progress bar |
> | Frame budget | You build object pooling and garbage-collection control |

**选**：网页 3D 展示、你愿意自己搭架构，或者你已经有一个引擎、只缺渲染层

**不选**：想要完整游戏功能（碰撞检测、关卡 / 资源管理开箱即用）

<!-- EN -->
> ## When to pick it, and when not to
>
> **Pick it if**: web 3D showcases, projects where you build the architecture, or you already have an engine and only need a rendering layer.
>
> **Do not pick it if**: you want complete game features out of the box (collision detection, level / asset management).

## 最小 starter

一个旋转立方体：scene / camera / renderer 三件套的最小闭环。

```
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
scene.add(cube); camera.position.z = 5;
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01; cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});
```

官方文档：https://threejs.org/docs/

<!-- EN -->
> ## Minimal starter
>
> A spinning cube: the minimal scene / camera / renderer loop.
>
> ```
> const scene = new THREE.Scene();
> const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
> const renderer = new THREE.WebGLRenderer();
> renderer.setSize(innerWidth, innerHeight);
> document.body.appendChild(renderer.domElement);
> const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
> scene.add(cube); camera.position.z = 5;
> renderer.setAnimationLoop(() => {
>   cube.rotation.x += 0.01; cube.rotation.y += 0.01;
>   renderer.render(scene, camera);
> });
> ```
>
> Official docs: https://threejs.org/docs/

## 可核验事实

| 项 | 值 | 核验源 |
|---|---|---|
| 仓库 | `mrdoob/three.js` | GitHub API |
| 许可 | **MIT** | 同上 |
| 主语言 | JavaScript | 同上 |
| ★ | 117,207 | 同上 |
| 最后提交 | 2026-10-04 | 同上（**活跃**）|

<!-- EN -->
> ## Verifiable facts
>
> | Item | Value | Source |
> |---|---|---|
> | Repository | `mrdoob/three.js` | GitHub API |
> | Licence | **MIT** | same |
> | Main language | JavaScript | same |
> | Stars | 117,207 | same |
> | Last push | 2026-10-04 | same (**active**) |

## 术语

⚠ 「场景图」「物理」这些词在 [Vibe Gaming 词条](../vibe-gaming.html) 里有解释。

<!-- EN -->
> ## Vocabulary
>
> ⚠ "Scene graph" and "physics" are explained in the [Vibe Gaming entry](../vibe-gaming.html).

---

<!-- 层：第一层 · 选对工具 · 3D 网页库，不是引擎。 -->