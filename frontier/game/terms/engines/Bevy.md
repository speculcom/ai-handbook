---
zh: "Bevy"
en: "Bevy"
engine: bevy
script: "Rust"
scriptEn: "Rust"
tier: "原生 3D"
tierEn: "native 3D"
aiFriendly: low
aiScore: 1
what: "使用 Rust 与 ECS 架构的游戏引擎；项目需处理构建、依赖与系统调度。"
whatEn: "A Rust/ECS game engine; account for builds, dependencies and system scheduling."
decision: "熟悉 Rust 或愿意维护其工具链时可评估；先验证一个小场景。"
decisionEn: "Assess it with Rust experience or capacity to maintain the toolchain; validate a small scene first."
bestFor: "熟悉 Rust、愿意维护其构建与依赖的项目"
bestForEn: "Projects with Rust experience and capacity to maintain builds and dependencies"
install: "先装 Rust 工具链（rustup）；**Windows 还要装 Visual Studio C++ Build Tools**，勾选 Desktop development with C++。然后 `cargo new my_bevy_game` → `cargo add bevy` → `cargo run`。首次会**从源码编译整个引擎**，耗时明显；官方建议在 Cargo.toml 里给 dev profile 加 opt-level。"
installEn: "Install the Rust toolchain (rustup); **on Windows you also need the Visual Studio C++ Build Tools** with the Desktop development with C++ workload. Then `cargo new my_bevy_game` → `cargo add bevy` → `cargo run`. The first build **compiles the whole engine from source** and takes a while; the docs recommend dev-profile opt-level settings in Cargo.toml."
installSrc: "https://bevy.org/learn/quick-start/getting-started/setup/"
installVerified: "2026-10-30"
difficulty: high
difficultyWhy: "需要 Rust 及平台构建依赖；ECS 的数据与系统组织也应纳入学习成本。"
difficultyWhyEn: "Budget for Rust, platform build dependencies and learning ECS data/system organization."
confidence: our-judgement
verified: "2026-10-30 · GitHub API 快照"
verifiedEn: "2026-10-30 · GitHub API snapshot"
---

# Bevy

**一句话**：使用 Rust 与 ECS 架构，接入 AI 生成代码时要核对版本、借用规则和系统调度。

<!-- EN -->
> **In one line**: Rust and ECS require version, borrowing and scheduling checks.

## 检查 Rust 错误与版本

生成代码仍要符合 Rust 的借用规则。遇到“同一值已经被不可变借用，不能再可变借用”这类错误时，保留错误位置、最小代码和版本信息，检查借用是否重叠；不要把重复生成当成已经修复。

这类错误本身不提供不同语言或引擎的 AI 正确率比较。规则说明见 [Rust 官方书：引用与借用](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)。

<!-- EN -->
> ## Check Rust errors and versions
>
> Generated code must satisfy Rust's borrowing rules. For an overlapping immutable/mutable borrow error, keep the location, minimal code and versions, then inspect the overlapping borrows. Repeated regeneration does not establish a fix.
>
> This error does not measure AI accuracy across languages or engines. See [the Rust Book: references and borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html).

## 它值得的地方

⚠ 本站判断它**技术方向是对的**：

- **数据驱动**：组件 + 系统，逻辑与数据分离
- **ECS 架构清晰**：比继承体系更好维护
- **开源彻底**（Apache-2.0）：官方写「free and open-source forever」

<!-- EN -->
> ## Where it deserves credit
>
> ⚠ This site's judgement is that the technical direction is right:
>
> - **Data-driven** — components plus systems, separating logic from data
> - A clean ECS architecture — easier to maintain than an inheritance hierarchy
> -  (Apache-2.0) — the official line is "free and open-source forever"

## 如果你还是要用

⚠ 三个降低痛苦的做法：

1. ，别让它写大的架构
2. **每次只改一处**：借用错误会连锁，改一处好定位
3. ⚠ 

<!-- EN -->
> ## If you still want to use it
>
> ⚠ Three ways to reduce the pain:
>
> 1. Have AI write small, throwaway systems rather than large architectural pieces
> 2. Change one place at a time — borrow errors cascade, and one change is easy to locate
> 3. ⚠ Budget more time for compile errors

## 什么时候选它 / 不选

**选**：你熟悉 Rust，且项目愿意采用 ECS 的组织方式

**不选**：单人 + 用 AI 做游戏，是本站的首选建议

<!-- EN -->
> ## When to pick it, and when not to
>
> **Pick it if**: ⚠ you are a Rust developer yourself (in which case you do not need AI to write it)
>
> **Do not pick it if**: you are solo and using AI — this is the site's strongest recommendation

## 可核验事实

| 项 | 值 | 核验源 |
|---|---|---|
| 仓库 | `bevyengine/bevy` | GitHub API |
| 许可 | **Apache-2.0** | 同上 |
| 主语言 | Rust | 同上 |
| ★ | 49,380 | 同上 |
| 最后提交 | 2026-10-04 | 同上（**活跃**）|
| 官方定位 | “A refreshingly simple data-driven game engine built in Rust” | 官方 README |

<!-- EN -->
> ## Verifiable facts
>
> | Item | Value | Source |
> |---|---|---|
> | Repository | `bevyengine/bevy` | GitHub API |
> | Licence | **Apache-2.0** | same |
> | Main language | Rust | same |
> | Stars | 49,380 | same |
> | Last push | 2026-10-04 | same (**active**) |
> | Official description | "A refreshingly simple data-driven game engine built in Rust" | official README |

## 术语

⚠ 「ECS」「数据驱动」这些词在 [Vibe Gaming 词条](../vibe-gaming.html) 里有解释。

<!-- EN -->
> ## Vocabulary
>
> ⚠ "ECS" and "data-driven" are explained in the [Vibe Gaming entry](../vibe-gaming.html).

---

<!-- 层：第一层 · 选对工具 · 技术优雅但 AI 最难写的一个。 -->