---
zh: "作品库与最小可玩原型"
en: "Showcase and minimal prototypes"
what: "15 个有可核验 AI 参与痕迹的作品（只放外链），外加六个引擎各一份「能操作 / 有目标 / 有反馈」的最小骨架。"
whatEn: "15 works with verifiable AI involvement (links only), plus one minimal skeleton per engine covering operable / goal-directed / responsive."
decision: "先选一个骨架，保留最小玩法循环，再逐项修改参数。需要特定视觉风格时，可用少量示意素材验证，不必先完成全部美术。"
decisionEn: "Choose one skeleton, keep its minimal gameplay loop, then change parameters one at a time. Use small placeholder assets to check a required visual style without finishing all artwork first."
confidence: our-judgement
---

# 作品库与最小可玩原型

这一页分两部分：**15 个有可核验 AI 参与痕迹的作品**（只放站外链接，不展示截图、不镜像代码），以及**六个引擎的最小可玩骨架**。

作品库记录作者公开说明的 AI 参与环节与证据链接。下面的骨架**未经本站运行验证**；请按对应引擎版本检查，并结合官方文档使用。

## 作品库

> **2026-11-07 起，持续维护的策展目录在 [demos.specul.com](https://demos.specul.com/)**：含截图与沙箱嵌入的逐条许可台账、维度对照与模型发布轨。本页下表是 2026-11-03 的历史快照，只作留档；新收录与复核以新站为准。

收录规则：原址可访问、无需登录/付费；必须有一手 AI 痕迹（项目页 / README / 作者公开帖点名工具或模型），目录转述不算；只放外链，不截图、不镜像；不做排名。核验日 **2026-11-03**。仓库型条目只核验 README / 在线 demo / 最近提交，**未在本地 clone 构建**；页面不声称已实测。

| 作品（外链） | 类目 | AI 用在哪 | 授权 | 一手证据 / 备注 |
|---|---|---|---|---|
| [Fly](https://fly.pieter.com/) | 游戏 | 代码 / 资产 / 设计 | link-only | [首页原文](https://fly.pieter.com/)："by @levelsio + Cursor + ThreeJS"；免费可玩，无需账号。 |
| [Cowboy Shooter](https://cowboy.raymelon.com/) | 游戏 | 代码 / 资产 / 音频 | link-only | [首页原文](https://cowboy.raymelon.com/)："vibe coded by @pseudokid, Cursor AI, Anthropic's Claude 3.7 Sonnet"；填昵称即可开始。 |
| [Tower of Time](https://github.com/maciej-trebacz/tower-of-time-game) | 游戏 | 代码 | MIT | [README](https://github.com/maciej-trebacz/tower-of-time-game)："Claude Sonnet 4 - My LLM of choice for this project..."；约 95% 代码由 AI；最近提交 2025-07（约 16 个月未更新，线上仍可玩）。 |
| [Gothicvania Codex Demo](https://acatovic.github.io/gothicvania-codex-demo/) | 游戏 | 代码 | MIT | [Show HN](https://news.ycombinator.com/item?id=47034752)："zero-code approach... built the whole thing using OpenAI Codex CLI"；素材非 AI（ansimuz / Pascal Belisle 署名）。 |
| [TikZ Editor](https://tikz.dev/editor/) | Web 应用 | 代码 | MIT | [页面原文](https://tikz.dev/editor/)："The initial code base was written by Codex using gpt-5-3-codex..."；仓库 pushed 2026-10-28。 |
| [ASCII Tree Editor](https://asciitree.reorx.com/) | Web 应用 | 代码 | link-only | [Show HN](https://news.ycombinator.com/item?id=44936932)："I used Claude Code to \"vibe-code\" this project..."；源仓无 LICENSE。 |
| [Isometric NYC](https://isometric.nyc/) | 数据可视化 | 代码 / 资产 | link-only | [作者博客](https://cannoneyed.com/projects/isometric-nyc)："I switched back and forth a lot between Claude Code, Gemini CLI, and Cursor..."；瓦片由 nano banana 生成。 |
| [Spikelog](https://spikelog.com/) | 数据可视化 | 代码 | link-only | [Show HN](https://news.ycombinator.com/item?id=46068138)："I built it in about a day using Cursor."；免费 10 图。 |
| [Contrarian Signals](https://contrariansignals.com/) | 数据可视化 | 代码 / 设计 | link-only | [Show HN](https://news.ycombinator.com/item?id=46035340)："this was ~70% vibe coded using Cursor / Claude Code"；仪表盘免费。 |
| [Tech Cities Index](https://www.techcities.app/) | 数据可视化 | 代码 | link-only | [Show HN](https://news.ycombinator.com/item?id=42604840)："Built with Cursor and Next.js"；数据源 levels.fyi / Numbeo，未给数据许可（风险项）。 |
| [Pixelforge](https://fersab.github.io/pixelforge/) | 内容与媒体 | 代码 | link-only | [页面原文](https://fersab.github.io/pixelforge/)："A 3D Rendering Engine Built with Claude Code in Pure ES6+, Just Math and a Canvas"；无授权条款。 |
| [MyNextBook](https://mynextbook.ai) | 内容与媒体 | 代码 | link-only | [Show HN](https://news.ycombinator.com/item?id=46706848)："Built with Cursor + Claude Code, & AntiGravity"；无需注册可浏览。 |
| [Nano-Banana-Desktop](https://github.com/danielrosehill/Nano-Banana-Desktop) | 内容与媒体 | 代码 | link-only（LICENSE: TBD） | [README](https://github.com/danielrosehill/Nano-Banana-Desktop)："developed using AI-assisted coding (Claude Code)..."；无 LICENSE，最近提交 2025-11（约 12 个月）。 |
| [micasa](https://github.com/micasa-dev/micasa) | 自动化 | 代码 | Apache-2.0 | [README](https://github.com/micasa-dev/micasa)："Developed with AI coding agents (Claude, Claude Code)."；pushed 2026-11-02。 |
| [Context](https://github.com/indragiek/Context) | 自动化 | 代码 / 设计 | MIT | [作者博客](https://www.indragie.com/blog/i-shipped-a-macos-app-built-entirely-by-claude-code)："Context was almost 100% built by Claude Code"；2 万行中手写不足 1000 行。 |

<!-- EN -->
> This page has two parts: **15 works with verifiable AI involvement** (external links only, no screenshots or mirrored code), plus **minimal playable skeletons for six engines**.
>
> The showcase records authors’ public evidence of AI involvement. The skeletons below are **not run or verified by this site**; check the engine version and official documentation before using them.
>
> ## Showcase
>
> **From 2026-11-07 the maintained curated directory lives at [demos.specul.com](https://demos.specul.com/)**: per-entry licence ledger for screenshots and sandboxed embeds, dimension comparison and a model-release track. The table below is a historical snapshot checked 2026-11-03, kept for the record; new intake and re-checks happen on the new site.
>
> Acceptance rules: the original URL is reachable without login or paywall; there is first-party AI evidence (the project page, README or a public author post naming the tool or model) — directory descriptions do not count; links only, no screenshots or mirrors; no ranking. Verified **2026-11-03**. Repo-backed entries were checked via README / live demo / last commit, **not built locally**; the page does not claim they were measured.
>
> | Work (external link) | Category | AI scope | License | First-party evidence / note |
> |---|---|---|---|---|
> | [Fly](https://fly.pieter.com/) | Game | code / assets / design | link-only | [project page](https://fly.pieter.com/): "by @levelsio + Cursor + ThreeJS"; free to play, no account. |
> | [Cowboy Shooter](https://cowboy.raymelon.com/) | Game | code / assets / audio | link-only | [project page](https://cowboy.raymelon.com/): "vibe coded by @pseudokid, Cursor AI, Anthropic's Claude 3.7 Sonnet"; enter a nickname to play. |
> | [Tower of Time](https://github.com/maciej-trebacz/tower-of-time-game) | Game | code | MIT | [README](https://github.com/maciej-trebacz/tower-of-time-game): "Claude Sonnet 4 - My LLM of choice for this project..."; ~95% of code by AI; last commit 2025-07 (~16 months, still playable). |
> | [Gothicvania Codex Demo](https://acatovic.github.io/gothicvania-codex-demo/) | Game | code | MIT | [Show HN](https://news.ycombinator.com/item?id=47034752): "zero-code approach... built the whole thing using OpenAI Codex CLI"; art is not AI (ansimuz / Pascal Belisle). |
> | [TikZ Editor](https://tikz.dev/editor/) | Web app | code | MIT | [project page](https://tikz.dev/editor/): "The initial code base was written by Codex using gpt-5-3-codex..."; repo pushed 2026-10-28. |
> | [ASCII Tree Editor](https://asciitree.reorx.com/) | Web app | code | link-only | [Show HN](https://news.ycombinator.com/item?id=44936932): "I used Claude Code to \"vibe-code\" this project..."; source repo has no LICENSE. |
> | [Isometric NYC](https://isometric.nyc/) | Data visualisation | code / assets | link-only | [author blog](https://cannoneyed.com/projects/isometric-nyc): "I switched back and forth a lot between Claude Code, Gemini CLI, and Cursor..."; tiles generated with nano banana. |
> | [Spikelog](https://spikelog.com/) | Data visualisation | code | link-only | [Show HN](https://news.ycombinator.com/item?id=46068138): "I built it in about a day using Cursor."; free for 10 charts. |
> | [Contrarian Signals](https://contrariansignals.com/) | Data visualisation | code / design | link-only | [Show HN](https://news.ycombinator.com/item?id=46035340): "this was ~70% vibe coded using Cursor / Claude Code"; the dashboard is free. |
> | [Tech Cities Index](https://www.techcities.app/) | Data visualisation | code | link-only | [Show HN](https://news.ycombinator.com/item?id=42604840): "Built with Cursor and Next.js"; data sources levels.fyi / Numbeo, no data licence stated (risk note). |
> | [Pixelforge](https://fersab.github.io/pixelforge/) | Media | code | link-only | [project page](https://fersab.github.io/pixelforge/): "A 3D Rendering Engine Built with Claude Code in Pure ES6+, Just Math and a Canvas"; no licence page. |
> | [MyNextBook](https://mynextbook.ai) | Media | code | link-only | [Show HN](https://news.ycombinator.com/item?id=46706848): "Built with Cursor + Claude Code, & AntiGravity"; browsable without an account. |
> | [Nano-Banana-Desktop](https://github.com/danielrosehill/Nano-Banana-Desktop) | Media | code | link-only (LICENSE: TBD) | [README](https://github.com/danielrosehill/Nano-Banana-Desktop): "developed using AI-assisted coding (Claude Code)..."; no LICENSE, last commit 2025-11 (~12 months). |
> | [micasa](https://github.com/micasa-dev/micasa) | Automation | code | Apache-2.0 | [README](https://github.com/micasa-dev/micasa): "Developed with AI coding agents (Claude, Claude Code)."; pushed 2026-11-02. |
> | [Context](https://github.com/indragiek/Context) | Automation | code / design | MIT | [author blog](https://www.indragie.com/blog/i-shipped-a-macos-app-built-entirely-by-claude-code): "Context was almost 100% built by Claude Code"; fewer than 1,000 of 20,000 lines written by hand. |

## 共用清单

三条判据（来自 [最小可玩原型](./最小可玩原型.html)），骨架里逐条标注：

- [ ] **能操作** —— 玩家能让角色动起来
- [ ] **有目标** —— 玩家知道要做什么
- [ ] **有反馈** —— 操作有可见响应
- [ ] **粗糙的美术** —— 纯色方块就够，别在原型阶段美化
- [ ] **一次只改一个参数** —— 改完记下来

<!-- EN -->
> ## Shared checklist
>
> The three criteria (from [Minimal playable prototype](./最小可玩原型.html)), marked line by line in each skeleton:
>
> - [ ] **Operable** — the player can move the character
> - [ ] **Goal-directed** — the player knows what to do
> - [ ] **Responsive** — input has a visible result
> - [ ] **Crude art** — flat coloured boxes are enough; do not polish during prototyping
> - [ ] **One parameter at a time** — and write the change down

## Godot · GDScript

场景树：`Player(CharacterBody2D)` + `Ground(StaticBody2D)` + `Target(Area2D)` + `Camera2D`。
下面这段挂在 `Player` 上。

```gdscript
extends CharacterBody2D

const SPEED := 220.0
const JUMP_VELOCITY := -420.0
var score := 0

func _physics_process(delta: float) -> void:
	velocity.y += 980.0 * delta                                   # 反馈：重力一直在作用
	velocity.x = Input.get_axis("ui_left", "ui_right") * SPEED    # 能操作
	if is_on_floor() and Input.is_action_just_pressed("ui_accept"):
		velocity.y = JUMP_VELOCITY
	move_and_slide()

func _on_target_body_entered(_body: Node2D) -> void:
	score += 1                                                    # 有目标：碰到就得分
	$HUD.text = "得分 %d" % score                                  # 反馈：数字变了
```

出处：Godot 官方 *Your first 2D game*（`docs.godotengine.org`）。

<!-- EN -->
> ## Godot · GDScript
>
> Scene tree: `Player(CharacterBody2D)` + `Ground(StaticBody2D)` + `Target(Area2D)` + `Camera2D`.
> The script below goes on `Player`.
>
> ```gdscript
> extends CharacterBody2D
>
> const SPEED := 220.0
> const JUMP_VELOCITY := -420.0
> var score := 0
>
> func _physics_process(delta: float) -> void:
> 	velocity.y += 980.0 * delta                                   # responsive: gravity always acts
> 	velocity.x = Input.get_axis("ui_left", "ui_right") * SPEED    # operable
> 	if is_on_floor() and Input.is_action_just_pressed("ui_accept"):
> 		velocity.y = JUMP_VELOCITY
> 	move_and_slide()
>
> func _on_target_body_entered(_body: Node2D) -> void:
> 	score += 1                                                    # goal: touching the target scores
> 	$HUD.text = "score %d" % score                                 # responsive: the number changes
> ```
>
> Source: Godot's official *Your first 2D game* (`docs.godotengine.org`).

## three.js · JavaScript

three.js 是库不是引擎（见 [引擎档案](./engines.html)），所以循环与状态要自己写。

```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 6;

const player = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8),
  new THREE.MeshNormalMaterial());
scene.add(player);

const target = new THREE.Mesh(new THREE.SphereGeometry(0.35),
  new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
target.position.set(2.5, 1, 0);
scene.add(target);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const keys = new Set();
addEventListener('keydown', (e) => keys.add(e.code));
addEventListener('keyup', (e) => keys.delete(e.code));

renderer.setAnimationLoop(() => {
  const dir = (keys.has('ArrowRight') ? 1 : 0) - (keys.has('ArrowLeft') ? 1 : 0);
  player.position.x += dir * 0.05;                       // 能操作
  if (player.position.distanceTo(target.position) < 0.8) {
    target.visible = false;                              // 有目标
    player.material = new THREE.MeshBasicMaterial({ color: 0x4ade80 });  // 反馈
  }
  renderer.render(scene, camera);
});
```

出处：three.js 官方 *Installation* 与 *Creating a scene*（`threejs.org`）。

<!-- EN -->
> ## three.js · JavaScript
>
> three.js is a library, not an engine (see [engine profiles](./engines.html)), so the loop and the state are yours to write.
>
> ```js
> import * as THREE from 'three';
>
> const scene = new THREE.Scene();
> const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 100);
> camera.position.z = 6;
>
> const player = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8),
>   new THREE.MeshNormalMaterial());
> scene.add(player);
>
> const target = new THREE.Mesh(new THREE.SphereGeometry(0.35),
>   new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
> target.position.set(2.5, 1, 0);
> scene.add(target);
>
> const renderer = new THREE.WebGLRenderer({ antialias: true });
> renderer.setSize(innerWidth, innerHeight);
> document.body.appendChild(renderer.domElement);
>
> const keys = new Set();
> addEventListener('keydown', (e) => keys.add(e.code));
> addEventListener('keyup', (e) => keys.delete(e.code));
>
> renderer.setAnimationLoop(() => {
>   const dir = (keys.has('ArrowRight') ? 1 : 0) - (keys.has('ArrowLeft') ? 1 : 0);
>   player.position.x += dir * 0.05;                       // operable
>   if (player.position.distanceTo(target.position) < 0.8) {
>     target.visible = false;                              // goal
>     player.material = new THREE.MeshBasicMaterial({ color: 0x4ade80 });  // responsive
>   }
>   renderer.render(scene, camera);
> });
> ```
>
> Source: three.js official *Installation* and *Creating a scene* (`threejs.org`).

## Pixi · TypeScript

```ts
import { Application, Graphics } from 'pixi.js';

const app = new Application();
await app.init({ background: '#12161f', resizeTo: window });
document.body.appendChild(app.canvas);

const player = new Graphics().rect(0, 0, 40, 40).fill(0x4ade80);
player.position.set(80, 120);
const target = new Graphics().circle(0, 0, 16).fill(0xfacc15);
target.position.set(420, 120);
app.stage.addChild(player, target);

const keys = new Set<string>();
addEventListener('keydown', (e) => keys.add(e.key));
addEventListener('keyup', (e) => keys.delete(e.key));

app.ticker.add(({ deltaTime }) => {
  const dir = (keys.has('ArrowRight') ? 1 : 0) - (keys.has('ArrowLeft') ? 1 : 0);
  player.x += dir * 4 * deltaTime;                       // 能操作
  if (Math.abs(player.x - target.x) < 24) {
    target.visible = false;                              // 有目标
    player.tint = 0xfacc15;                              // 反馈
  }
});
```

出处：PixiJS 官方 *Quick Start*（`pixijs.com`）。

<!-- EN -->
> ## Pixi · TypeScript
>
> ```ts
> import { Application, Graphics } from 'pixi.js';
>
> const app = new Application();
> await app.init({ background: '#12161f', resizeTo: window });
> document.body.appendChild(app.canvas);
>
> const player = new Graphics().rect(0, 0, 40, 40).fill(0x4ade80);
> player.position.set(80, 120);
> const target = new Graphics().circle(0, 0, 16).fill(0xfacc15);
> target.position.set(420, 120);
> app.stage.addChild(player, target);
>
> const keys = new Set<string>();
> addEventListener('keydown', (e) => keys.add(e.key));
> addEventListener('keyup', (e) => keys.delete(e.key));
>
> app.ticker.add(({ deltaTime }) => {
>   const dir = (keys.has('ArrowRight') ? 1 : 0) - (keys.has('ArrowLeft') ? 1 : 0);
>   player.x += dir * 4 * deltaTime;                       // operable
>   if (Math.abs(player.x - target.x) < 24) {
>     target.visible = false;                              // goal
>     player.tint = 0xfacc15;                              // responsive
>   }
> });
> ```
>
> Source: PixiJS official *Quick Start* (`pixijs.com`).

## Phaser · TypeScript

```ts
import Phaser from 'phaser';

class Play extends Phaser.Scene {
  create() {
    this.player = this.add.rectangle(80, 120, 40, 40, 0x4ade80);
    this.target = this.add.circle(420, 120, 16, 0xfacc15);
    this.keys = this.input.keyboard!.addKeys('left,right');   // 能操作
  }
  update() {
    if (this.keys.left.isDown) this.player.x -= 4;            // 能操作
    if (this.keys.right.isDown) this.player.x += 4;
    if (Math.abs(this.player.x - this.target.x) < 24) {
      this.target.setVisible(false);                          // 有目标
      this.player.setFillStyle(0xfacc15);                     // 反馈
    }
  }
}

new Phaser.Game({ type: Phaser.AUTO, width: 800, height: 300, scene: Play });
```

出处：Phaser 官方 *Making your first Phaser Game* 与 examples 站（`phaser.io`）。

<!-- EN -->
> ## Phaser · TypeScript
>
> ```ts
> import Phaser from 'phaser';
>
> class Play extends Phaser.Scene {
>   create() {
>     this.player = this.add.rectangle(80, 120, 40, 40, 0x4ade80);
>     this.target = this.add.circle(420, 120, 16, 0xfacc15);
>     this.keys = this.input.keyboard!.addKeys('left,right');   // operable
>   }
>   update() {
>     if (this.keys.left.isDown) this.player.x -= 4;            // operable
>     if (this.keys.right.isDown) this.player.x += 4;
>     if (Math.abs(this.player.x - this.target.x) < 24) {
>       this.target.setVisible(false);                          // goal
>       this.player.setFillStyle(0xfacc15);                     // responsive
>     }
>   }
> }
>
> new Phaser.Game({ type: Phaser.AUTO, width: 800, height: 300, scene: Play });
> ```
>
> Source: Phaser's official *Making your first Phaser Game* and the examples site (`phaser.io`).

## libGDX · Java

用 gdx-liftoff 生成工程后，把 `core` 里那个 `ApplicationAdapter` 换成这段。

```java
import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.utils.ScreenUtils;

public class Prototype extends ApplicationAdapter {
    SpriteBatch batch;
    Texture player, target;
    float px = 100f;
    boolean hit;

    public void create() {
        batch = new SpriteBatch();
        player = new Texture("player.png");   // 先用 1x1 纯色图
        target = new Texture("target.png");
    }

    public void render() {
        float dx = 0f;
        if (Gdx.input.isKeyPressed(Input.Keys.LEFT))  dx -= 1f;   // 能操作
        if (Gdx.input.isKeyPressed(Input.Keys.RIGHT)) dx += 1f;
        px += dx * 240f * Gdx.graphics.getDeltaTime();

        if (Math.abs(px - 400f) < 24f) hit = true;                // 有目标

        ScreenUtils.clear(hit ? Color.GREEN : Color.DARK_GRAY);   // 反馈：整屏变色
        batch.begin();
        batch.draw(player, px, 100f);
        if (!hit) batch.draw(target, 400f, 100f);
        batch.end();
    }
}
```

出处：libGDX 官方 wiki *A simple game*（`libgdx.com`）+ gdx-liftoff 工程结构。

<!-- EN -->
> ## libGDX · Java
>
> After generating a project with gdx-liftoff, replace the `ApplicationAdapter` in `core` with this.
>
> ```java
> import com.badlogic.gdx.ApplicationAdapter;
> import com.badlogic.gdx.Gdx;
> import com.badlogic.gdx.Input;
> import com.badlogic.gdx.graphics.Color;
> import com.badlogic.gdx.graphics.Texture;
> import com.badlogic.gdx.graphics.g2d.SpriteBatch;
> import com.badlogic.gdx.utils.ScreenUtils;
>
> public class Prototype extends ApplicationAdapter {
>     SpriteBatch batch;
>     Texture player, target;
>     float px = 100f;
>     boolean hit;
>
>     public void create() {
>         batch = new SpriteBatch();
>         player = new Texture("player.png");   // use a 1x1 flat-colour image first
>         target = new Texture("target.png");
>     }
>
>     public void render() {
>         float dx = 0f;
>         if (Gdx.input.isKeyPressed(Input.Keys.LEFT))  dx -= 1f;   // operable
>         if (Gdx.input.isKeyPressed(Input.Keys.RIGHT)) dx += 1f;
>         px += dx * 240f * Gdx.graphics.getDeltaTime();
>
>         if (Math.abs(px - 400f) < 24f) hit = true;                // goal
>
>         ScreenUtils.clear(hit ? Color.GREEN : Color.DARK_GRAY);   // responsive: the screen changes colour
>         batch.begin();
>         batch.draw(player, px, 100f);
>         if (!hit) batch.draw(target, 400f, 100f);
>         batch.end();
>     }
> }
> ```
>
> Source: the official libGDX wiki *A simple game* (`libgdx.com`) plus the gdx-liftoff project layout.

## Bevy · Rust

⚠ Bevy 的 API 随版本变化较快。本站核验时，官方入门写的是 `0.19` 的写法。
跑不通时**先看官方那份**，不要照着改到能跑为止再回头怀疑本站。

```rust
use bevy::prelude::*;

#[derive(Component)] struct Player;
#[derive(Component)] struct Target;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(Update, (move_player, collect))
        .run();
}

fn setup(mut commands: Commands) {
    commands.spawn(Camera2d);
    commands.spawn((Player, Sprite {
        color: Color::srgb(0.3, 0.8, 0.4),
        custom_size: Some(Vec2::splat(40.0)),
        ..default()
    }, Transform::default()));
    commands.spawn((Target, Sprite {
        color: Color::srgb(0.95, 0.8, 0.2),
        custom_size: Some(Vec2::splat(24.0)),
        ..default()
    }, Transform::from_xyz(240.0, 120.0, 0.0)));
}

fn move_player(keys: Res<ButtonInput<KeyCode>>, time: Res<Time>,
               mut q: Query<&mut Transform, With<Player>>) {
    let dir = (keys.pressed(KeyCode::ArrowRight) as i32
             - keys.pressed(KeyCode::ArrowLeft) as i32) as f32;
    for mut t in &mut q {
        t.translation.x += dir * 300.0 * time.delta_secs();   // 能操作
    }
}

fn collect(mut commands: Commands,
           players: Query<&Transform, With<Player>>,
           targets: Query<(Entity, &Transform), With<Target>>) {
    for (e, tt) in &targets {
        for pt in &players {
            if pt.translation.distance(tt.translation) < 32.0 {
                commands.entity(e).despawn();   // 有目标 + 反馈：方块消失
            }
        }
    }
}
```

出处：Bevy 官方 *Quick Start · Setup* 与 *Apps*（`bevy.org`）。

<!-- EN -->
> ## Bevy · Rust
>
> ⚠ Bevy's API moves fast (the official quick start we checked documents the `0.19` style).
> When it does not compile, **go to the official guide first** — do not keep patching until it runs and then doubt this page.
>
> ```rust
> use bevy::prelude::*;
>
> #[derive(Component)] struct Player;
> #[derive(Component)] struct Target;
>
> fn main() {
>     App::new()
>         .add_plugins(DefaultPlugins)
>         .add_systems(Startup, setup)
>         .add_systems(Update, (move_player, collect))
>         .run();
> }
>
> fn setup(mut commands: Commands) {
>     commands.spawn(Camera2d);
>     commands.spawn((Player, Sprite {
>         color: Color::srgb(0.3, 0.8, 0.4),
>         custom_size: Some(Vec2::splat(40.0)),
>         ..default()
>     }, Transform::default()));
>     commands.spawn((Target, Sprite {
>         color: Color::srgb(0.95, 0.8, 0.2),
>         custom_size: Some(Vec2::splat(24.0)),
>         ..default()
>     }, Transform::from_xyz(240.0, 120.0, 0.0)));
> }
>
> fn move_player(keys: Res<ButtonInput<KeyCode>>, time: Res<Time>,
>                mut q: Query<&mut Transform, With<Player>>) {
>     let dir = (keys.pressed(KeyCode::ArrowRight) as i32
>              - keys.pressed(KeyCode::ArrowLeft) as i32) as f32;
>     for mut t in &mut q {
>         t.translation.x += dir * 300.0 * time.delta_secs();   // operable
>     }
> }
>
> fn collect(mut commands: Commands,
>            players: Query<&Transform, With<Player>>,
>            targets: Query<(Entity, &Transform), With<Target>>) {
>     for (e, tt) in &targets {
>         for pt in &players {
>             if pt.translation.distance(tt.translation) < 32.0 {
>                 commands.entity(e).despawn();   // goal + responsive: the box disappears
>             }
>         }
>     }
> }
> ```
>
> Source: Bevy official *Quick Start · Setup* and *Apps* (`bevy.org`).

## 怎么用这些骨架

1. **挑一个引擎**（依据见 [选引擎](./s1-选引擎.html) 与 [引擎档案](./engines.html)）
2. **把骨架跑起来**，然后**只改三个地方**：移动速度、目标位置、反馈方式
3. 三条判据都满足 → 原型完成，进 [手感调参](./s3-手感调参.html)
4. ⚠ **别在原型阶段加美术**（理由见 [最小可玩原型](./最小可玩原型.html)）

<!-- EN -->
> ## How to use these skeletons
>
> 1. **Pick one engine** (see [Picking an engine](./s1-选引擎.html) and the [engine profiles](./engines.html))
> 2. **Get the skeleton running**, then **change only three things**: movement speed, target position, feedback style
> 3. All three criteria met → the prototype is done; move on to [game feel](./s3-手感调参.html)
> 4. ⚠ **Do not add art during prototyping** (see [Minimal playable prototype](./最小可玩原型.html))

## 本站自己写的那一份

上面那张表收录的是**别人的作品**，规则是只放外链、不截图、不镜像代码。下面这一条不属于那张表，也不受它的收录规则约束。

**「三颗星，一扇门」是本站自己编写的浏览器样例**：同一个游戏分六个阶段逐步做完整（核心循环 → 暂停 → 版本化存档 → 触屏与键盘 → 尺寸适配 → 打包发布），页面上可以直接玩，也能下载成品包。

本页那三条判据在它身上是有记录的：能操作、有目标、有反馈都在浏览器里跑过，检查范围写在页面里。⚠ 它不证明任何引擎或 AI 产品的好坏，也不给通过率或正确率。

→ [三颗星，一扇门：把同一个游戏逐步做完整](./three-stars.html)

<!-- EN -->
> ## The one this site wrote itself
>
> The table above lists **other people's work**, under rules of external links only — no screenshots, no mirrored code. The item below is not part of that table and is not governed by those rules.
>
> **"Three stars, one door" is a browser sample written by this site**, built out over six stages (core loop → pause → versioned saves → touch and keyboard → resizing → packaging and release). You can play it on the page and download the package.
>
> The three criteria on this page are recorded for it: operable, goal-directed and responsive were all run in a browser, and the scope of the checks is stated on the page. ⚠ It proves nothing about an engine or an AI product, and it publishes no pass rate or accuracy figure.
>
> → [Three stars, one door: complete one game step by step](./three-stars.html)

---

<!-- 层：贯穿层 · 把「最小可玩原型」的三条判据落成可抄的骨架。 -->
