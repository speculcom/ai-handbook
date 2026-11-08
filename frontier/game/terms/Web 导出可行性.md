---
zh: "Web 导出可行性"
en: "Web export feasibility"
stage: 1
ord: 11
what: "「能导出到网页」和「导出后能正常用」是两件事 —— 差别通常在存档与性能。"
whatEn: "\"Can export to the web\" and \"works after export\" are different claims — the gap usually shows up in saves and performance."
decision: "如果你需要长期存档、多人、或重度 3D，原生引擎；否则 Web 引擎迭代更快。"
decisionEn: "If you need long-term saves, multiplayer, or heavy 3D, use a native engine; otherwise a web engine iterates faster."
confidence: our-judgement
---

# Web export feasibility

**一句话**：所有主流引擎都说能导出到网页。但「能导出」和「能正常用」差得很远。

<!-- EN -->
> 

## 三个真正会出问题的地方

| 环节 | 常见问题 |
|---|---|
|  |
| **性能** | ⚠ Web 构建默认不带优化；着色器编译、资源加载策略都要自己调 |
| **加载** | 首屏加载量可能几十 MB：⚠ 手机网络下会很慢 |

⚠ 这三项**都需要改代码**，不是导出时打个勾就完事。

<!-- EN -->
> ## The three things that actually break
>
> | Area | The common problem |
> |---|---|
> |  |
> | **Performance** | ⚠ Web builds ship without optimisation by default; shader compilation and asset loading both need tuning |
> | **Loading** | First load can be tens of megabytes — ⚠ very slow on mobile networks |
>
> ⚠ All three require code changes. They are not a checkbox in the export dialog.

## 网页导出缺的是构建与存档层

原生引擎导出到 Web。本质上是把 C++/Rust 编译成 WebAssembly。

这带来两个后果：

1. **体积大**：Rust/C++ 编出的 wasm 通常比原生 JS 大一个量级
2. ⚠ **性能损耗**：WebAssembly 在浏览器里跑，但仍受 JS 主线程调度限制

⚠ 所以「用 Bevy 导出 Web」技术上可行，但**通常不是你该选它的理由**。

<!-- EN -->
> ## Web export lacks a build and save layer
>
> Exporting a native engine to the web is, underneath, compiling C++ or Rust to WebAssembly.
>
> Two consequences:
>
> 1. **It is large** — wasm produced from Rust or C++ is typically an order of magnitude larger than native JS
> 2. ⚠ It costs performance — WebAssembly runs in the browser but is still subject to JS main-thread scheduling
>
> ⚠ So "export Bevy to the web" is technically possible, but it is usually not the reason to choose Bevy.

## 判断标准

| 你的需求 | 建议 |
|---|---|
| 短体验、无存档 | ✅ Web 引擎最省事 |
| 需要长期存档 | ⚠ 原生引擎 + 自己接浏览器存储 |
| 重度 3D | ⚠ Web 引擎（Bevy/Unity 的 Web 导出损耗大） |
| ⚠ 要发到 Steam | **别考虑 Web**：Steam 有原生分发，没必要降级 |

<!-- EN -->
> ## How to decide
>
> | Your requirement | Advice |
> |---|---|
> | Short sessions, no saves | ✅ A web engine is least work |
> | Long-term saves | ⚠ Native engine + your own browser-storage layer |
> | Heavy 3D | ⚠ Web engines (Bevy/Unity lose a lot in their web exports) |
> | ⚠ Shipping on Steam | Do not consider web — Steam ships natively, so there is no reason to downgrade |

## 常见失败

- 相信「引擎支持 Web 导出」这句话：支持 ≠ 可用
- **没测首屏加载**：到线上才发现手机上要等 30 秒
- **忘了存档**：用户刷新页面进度没了

<!-- EN -->
> ## Common failures
>
> - Believing the phrase "the engine supports web export" — supported is not the same as usable
> - Not measuring first load — you find out in production that phones wait 30 seconds
> -  — the player refreshes and loses progress

---

<!-- 层：第一层 · 选对工具 · 导出目标的可行性要在选引擎时就确认。 -->