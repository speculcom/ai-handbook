---
zh: "Unreal Engine"
en: "Unreal Engine"
engine: unreal
script: "C++ / Blueprint"
scriptEn: "C++ / Blueprint"
tier: "高保真 3D"
tierEn: "high-fidelity 3D"
aiFriendly: low
aiScore: 1
what: "包含 C++、Blueprint 与编辑器资产流程的实时 3D 工具。"
whatEn: "A real-time 3D tool with C++, Blueprint and editor asset workflows."
decision: "按视觉目标、现有经验、工具链和发布条件评估。"
decisionEn: "Assess visual goals, experience, toolchain and release requirements."
bestFor: "高保真 3D、已有 Unreal 团队、愿意用 MCP 驱动编辑器"
bestForEn: "High-fidelity 3D, existing Unreal teams, and teams willing to drive the editor through MCP"
install: "用 Epic Games Launcher 安装 UE 5.8。5.8 提供 Experimental MCP 插件：在编辑器进程内嵌 MCP server，任何兼容 MCP 的客户端（Claude Code、Cursor、MCP Inspector 等）可通过本地 HTTP 连接，调用 spawn actor、配置灯光、创建材质实例、检查 Slate 控件、跑自动化测试等工具（官方 5.8 文档，2026-11-03）。"
installEn: "Install UE 5.8 through the Epic Games Launcher. 5.8 ships an Experimental MCP plugin: it embeds an MCP server inside the editor process, and any MCP-compatible client (Claude Code, Cursor, MCP Inspector and others) can connect over local HTTP to spawn actors, configure lighting, create material instances, inspect Slate widgets and run automation tests (official 5.8 docs, 2026-11-03)."
installSrc: "https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor"
installVerified: "2026-11-03"
difficulty: high
difficultyWhy: "需要维护编辑器、编译、蓝图和资产流程；代码能编译仍需检查行为与性能。"
difficultyWhyEn: "Maintain editor, compilation, Blueprint and asset workflows; compiling code still needs behavioral and performance checks."
confidence: partial
verified: "2026-11-03 · Epic UE 5.8 官方文档"
verifiedEn: "2026-11-03 · Epic UE 5.8 official docs"
---

# Unreal Engine

**一句话**：做高保真 3D 它很强，但对 AI 写作和单人小项目都很重。

<!-- EN -->
> **In one line**: it is strong for high-fidelity 3D, but heavy for both AI-written code and solo small projects.

## 使用条件与检查

| 原因 | 说明 |
|---|---|
| C++ 与 Blueprint 双栈 | AI 要同时理解编译型 C++ 与可视化 Blueprint，跨栈改动容易漏 |
| 引擎约定多 | 生命周期、垃圾回收、反射系统、模块依赖都有固定写法，偏离就编译或运行失败 |
| 资产与场景是二进制/序列化 | 直接改 `.uasset` / `.umap` 风险高，官方路线是通过编辑器工具 |
| **5.8 的 MCP 是补丁，不是替代** | 外部 agent 能驱动编辑器，但仍要理解引擎 API 与项目约定 |

<!-- EN -->
> ## Usage conditions and checks
>
> | Reason | Explanation |
> |---|---|
> | Two stacks: C++ and Blueprint | AI must understand both compiled C++ and visual Blueprints; cross-stack changes easily miss something |
> | Many engine conventions | Lifecycle, garbage collection, the reflection system and module dependencies have fixed patterns; deviating breaks the build or runtime |
> | Assets and levels are binary/serialized | Editing `.uasset` / `.umap` directly is risky; the official route is through editor tooling |
> | The 5.8 MCP plugin is a bridge, not a replacement | External agents can drive the editor, but still need to understand engine APIs and project conventions |

## 它的代价

- **上手重**：编辑器、C++ 编译、Blueprint、资产管线都要学
- **单人项目成本高**：编译与迭代慢，小项目容易被工程复杂度拖住
- **MCP 仍标记 Experimental**：官方 5.8 文档如此标注，生产流程不要把它当稳定 API
- **PCG + LLM 有成本**：官方文档提示部分 PCG 操作通过 MCP 会消耗较多时间与上下文

<!-- EN -->
> ## What it costs
>
> - A heavy learning curve: editor, C++ builds, Blueprints and the asset pipeline
> - High cost for solo projects: slow compiles and iteration; small projects get dragged down by engineering complexity
> - MCP is still marked Experimental: the official 5.8 docs say so; do not treat it as a stable production API
> - PCG + LLM has a cost: the official docs note that some PCG operations through MCP consume significant time and context

## 什么时候选它 / 不选

**选**：高保真 3D、已有 Unreal 团队、愿意用 MCP 把编辑器能力接给外部 agent。

**不选**：单人 + 用 AI 做小项目（这是本站的首选建议）；纯 2D 或网页小游戏；不想维护 C++ 构建链。

<!-- EN -->
> ## When to pick it, and when not to
>
> **Pick it if**: you need high-fidelity 3D, already have an Unreal team, and are willing to expose editor capabilities to external agents through MCP.
>
> **Do not pick it if**: you are solo and using AI on a small project (this is the site's strongest recommendation); you make 2D or small web games; you do not want to maintain a C++ build chain.

## 最小 starter

一个 Actor Tick，按秒推进位移。片段只做最小验证，不替代教程。

```
// MyActor.h
virtual void Tick(float DeltaSeconds) override;

// MyActor.cpp
void AMyActor::Tick(float DeltaSeconds) {
    Super::Tick(DeltaSeconds);
    AddActorLocalOffset(FVector(100.f * DeltaSeconds, 0.f, 0.f));
}
```

官方文档：https://dev.epicgames.com/documentation/en-us/unreal-engine

<!-- EN -->
> ## Minimal starter
>
> An Actor Tick that advances position per second. A minimal check only.
>
> ```
> // MyActor.h
> virtual void Tick(float DeltaSeconds) override;
> 
> // MyActor.cpp
> void AMyActor::Tick(float DeltaSeconds) {
>     Super::Tick(DeltaSeconds);
>     AddActorLocalOffset(FVector(100.f * DeltaSeconds, 0.f, 0.f));
> }
> ```
>
> Official docs: https://dev.epicgames.com/documentation/en-us/unreal-engine

## 可核验事实

| 项 | 值 | 核验源 |
|---|---|---|
| 当前文档版本 | Unreal Engine 5.8 | Epic 官方文档 |
| MCP 状态 | Experimental（5.8） | Epic 官方文档 |
| MCP 传输 | 编辑器进程内 server + 本地 HTTP | Epic 官方文档 |
| 可调用能力 | spawn actor、灯光、材质实例、Slate 检查、自动化测试 | Epic 官方文档 |
| 许可 | 专有（按官方许可与分成条款） | Epic 官方许可页 |

<!-- EN -->
> ## Verifiable facts
>
> | Item | Value | Source |
> |---|---|---|
> | Current docs version | Unreal Engine 5.8 | Epic official docs |
> | MCP status | Experimental (5.8) | Epic official docs |
> | MCP transport | in-editor server + local HTTP | Epic official docs |
> | Callable capabilities | spawn actors, lighting, material instances, Slate inspection, automation tests | Epic official docs |
> | Licence | proprietary (official licence and royalty terms) | Epic official licence page |

## 术语

「Blueprint」「PCG」「Slate」这些词在 [Vibe Gaming 词条](../vibe-gaming.html) 里有解释。

<!-- EN -->
> ## Vocabulary
>
> "Blueprint", "PCG" and "Slate" are explained in the [Vibe Gaming entry](../vibe-gaming.html).

---

<!-- 层：第一层 · 选对工具 · 高保真 3D 与已有团队的选择；单人 AI 小项目不建议。 -->
