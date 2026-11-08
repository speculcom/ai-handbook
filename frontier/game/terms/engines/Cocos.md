---
zh: "Cocos Creator"
en: "Cocos Creator"
engine: cocos
script: "TypeScript"
scriptEn: "TypeScript"
tier: "2D/3D 跨平台"
tierEn: "2D/3D cross-platform"
aiFriendly: medium
aiScore: 3
what: "包含编辑器、场景与脚本流程的游戏开发工具；小游戏发布需核对对应平台说明。"
whatEn: "A game-development tool with editor, scene and scripting workflows; check target mini-game platform documentation."
decision: "分别核对脚本、场景配置与发布平台；自动操作编辑器取决于工具和权限。"
decisionEn: "Check scripts, scene configuration and release platform separately; editor automation depends on tools and permissions."
bestFor: "微信小游戏 / 即时网页娱乐为主的 2D/3D 跨平台发布"
bestForEn: "2D/3D cross-platform releases targeting WeChat Mini Games / instant web entertainment"
install: "官网下载 **Dashboard**，经 Dashboard 安装各版本 Cocos Creator；工程在 Creator 编辑器里创建、构建、发布（不是 npm 脚手架工作流）。"
installEn: "Download the **Dashboard** from the official site and install Cocos Creator versions through it; projects are created, built and published inside the Creator editor (not an npm-scaffold workflow)."
installSrc: "https://www.cocos.com/creator-download"
installVerified: "2026-10-30"
difficulty: medium
difficultyWhy: "脚本、Dashboard、编辑器与场景配置都是项目的一部分，不能只检查代码。"
difficultyWhyEn: "Scripts, Dashboard, editor and scene configuration all form part of the project; code checks alone are insufficient."
confidence: our-judgement
verified: "2026-10-30 · GitHub API 快照"
verifiedEn: "2026-10-30 · GitHub API snapshot"
---

# Cocos Creator

」，件事它有官方文档，档案里的其他引擎没有。

<!-- EN -->
> " — and it has official docs for that while the other profiles here do not.

## 为什么它进档案

| 依据 | 说明 |
|---|---|
| **官方发布章节** | Cocos Creator 3.8 手册专设「发布到微信小游戏」，另有小游戏引擎插件、内存与性能优化指南（docs.cocos.com，2026-10-29 核对） |
| **官方定位** | 仓库描述自述 cross-platform + "instant web entertainment"（GitHub API，2026-10-29） |
| **活跃** | 最后提交 2026-10-28（GitHub API 当日快照） |

⚠ 本站不做实测，里核对的是「官方文档有没有这条路」，不是「用它做小游戏一定顺利」。

<!-- EN -->
> ## Why it is in the profiles
>
> | Basis | Note |
> |---|---|
> | Official publish chapter | The Cocos Creator 3.8 manual has a dedicated "Publish to WeChat Mini Game" chapter, plus a mini-game engine plugin and a memory/performance optimisation guide (docs.cocos.com, checked 2026-10-29) |
> | Official positioning | The repo description says cross-platform + "instant web entertainment" (GitHub API, 2026-10-29) |
> | **Active** | Last push 2026-10-28 (GitHub API snapshot that day) |
>
> ⚠ This site runs no measurements: what is checked here is "does the official doc have this path", not "shipping a mini game with it is guaranteed smooth".

## 使用 AI 时分开检查脚本和场景配置

| 面 | 情况 |
|---|---|
|  | AI 写游戏逻辑代码没问题，语言本身训练素材多 |
| ⚠ ，这是它和 Phaser/Godot 工作流最大的差别 |
| **文档中文为主** | 按所用语言与引擎版本选择手册，并核对示例 API；不推测模型训练资料的构成 |
| **许可有细节** | 见下面事实表：LICENSE.md 是 MIT，但 GitHub 许可字段显示 NOASSERTION |

脚本和编辑器操作是两类工作；检查现有工具是否覆盖所需步骤。

<!-- EN -->
> ## Check scripts and scene configuration separately
>
> | Aspect | Situation |
> |---|---|
> | TypeScript scripts | Check generated TypeScript with the compiler and the target engine APIs |
> | ⚠ Scenes and levels live in the editor | Check Creator scene/prefab formats against the editor version and the automation tools actually available |
> | Docs mostly in Chinese | Use the documentation matching your language and engine version; verify API examples against that version |
> | Licence has a detail | See the facts table: LICENSE.md is MIT, but GitHub's licence field shows NOASSERTION |
>
> Script generation and editor operations are separate tasks; check coverage for each.

## 最小 starter

一个最小 Component，在 update 里按帧推进节点位置。

```
import { _decorator, Component, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('Move')
export class Move extends Component {
    update(dt: number) {
        this.node.translate(new Vec3(100 * dt, 0, 0));
    }
}
```

官方文档：https://docs.cocos.com/

<!-- EN -->
> ## Minimal starter
>
> A minimal Component that moves the node per frame in update.
>
> ```
> import { _decorator, Component, Vec3 } from 'cc';
> const { ccclass } = _decorator;
> 
> @ccclass('Move')
> export class Move extends Component {
>     update(dt: number) {
>         this.node.translate(new Vec3(100 * dt, 0, 0));
>     }
> }
> ```
>
> Official docs: https://docs.cocos.com/

## 可核验事实

| 项 | 值 | 核验源 |
|---|---|---|
| 仓库 | `cocos/cocos-engine` | GitHub API |
| ★ | 9,894 | 同上 |
| 最后提交 | 2026-10-28 | 同上（**活跃**）|
| 仓库 LICENSE.md | **MIT** | 仓库 raw 文件当日核对 |
| GitHub 许可字段 | ⚠ **NOASSERTION**（与 LICENSE.md 不一致）| GitHub API：合规审查时以仓库 LICENSE.md 文本为准，但别只看 GitHub 徽章 |

<!-- EN -->
> ## Verifiable facts
>
> | Item | Value | Source |
> |---|---|---|
> | Repository | `cocos/cocos-engine` | GitHub API |
> | Stars | 9,894 | same |
> | Last push | 2026-10-28 | same (**active**) |
> | Repo LICENSE.md | **MIT** | raw file in the repo, checked that day |
> | GitHub licence field | ⚠ **NOASSERTION** (inconsistent with LICENSE.md) | GitHub API — for compliance, trust the LICENSE.md text in the repo, not the GitHub badge |

## 什么时候选它 / 不选

**选**：发布目标里有微信小游戏；要 2D/3D 一套跨平台出去。

**不选**：纯网页游戏（Phaser/Pixi 更轻、AI 接管面更大）；希望 AI 尽量端到端写代码（编辑器场景工作流是硬边界）；只发桌面/移动原生（Godot 路线更直）。

<!-- EN -->
> ## When to pick it, and when not to
>
> **Pick it if**: WeChat Mini Games is among your release targets; you want one 2D/3D codebase shipping cross-platform.
>
> **Do not pick it if**: it is a pure web game (Phaser/Pixi are lighter and give AI more surface); you want AI writing end-to-end (the editor scene workflow is a hard boundary); desktop/native mobile only (the Godot route is more direct).

---

<!-- 层：第一层 · 选对工具 · 档案里唯一以「发布渠道」立身的引擎：微信小游戏。 -->
