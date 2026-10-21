---
id: aider
track: ide
tasks: ["write-code"]
name: Aider Watch 模式
nameEn: Aider (Watch mode)
vendor: Aider-AI
homepage: https://aider.chat/docs/usage/watch.html
mark: A
accent: "#D4A27F"

axes:
  model_access: >-
    **与 CLI 形态同一套模型入口：支持云端与本地 LLM，可连接几乎任何模型。**

    **README 当前推荐列表停留在上一代模型**
    （Claude 3.7 Sonnet / DeepSeek R1 / OpenAI o1 等）。

    该 README 的状态与该项目的 release 状态一致。

    **这个项目 13 个月未发 release。**

    所以参考这份列表时要自行核对。
  runtime: >-
    **它不是编辑器插件，而是一种使用模式。**

    Aider 在后台 watch 你的文件。

    你在任意 IDE 或文本编辑器里加 AI 注释，它就响应。

    官方文档标题即为「Aider in your IDE」。

    但实现上跑的是 **Aider 自己的浏览器 UI**。

    **这与 Cline / Codex 的「编辑器扩展」是不同的形态。**
  local_files: >-
    watch 模式监听 **git 仓库内所有文件**的变化并响应 AI 注释。

    **官方原文**："watch all files in your repo"

    （出自官方 `docs/usage/watch.html` 的 `--watch-files`。）

    范围受 `.gitignore` / `.aiderignore` 约束。

    - `--aiderignore` 指定忽略文件，默认 git 根目录的 `.aiderignore`
    - `--subtree-only` 只考虑当前子树

    仓库须是 git 仓库。官方 `docs/git.html` 写：无 git 时会先问你是否新建。

    **核心的 Repo Map 能力与 CLI 形态完全相同**——同一项目的同一机制，
    官方文档见 `docs/repomap.md`。

    它用「一份简洁的整个 git 仓库的地图」提供上下文。

    这份地图含最重要的类与函数及其类型与调用签名。

    每次改动请求都随附该 map。

    **它的第二个作用在 watch 模式下尤其有用**：
    帮助写新代码时复用代码库里已有的库、模块与抽象。

    支持 100+ 编程语言。

    **map 的 token 预算由 `--map-tokens` 控制。**

    **刷新频率由 `--map-refresh` 控制**，取值为 auto/always/files/manual。

    大仓库的实际耗时与 token 开销，**官方未给数字，本站未实测**。
  background: >-
    **需要 Aider 进程常驻**才能响应注释——这与「后台云端任务」不是一回事。

    **进程关闭后 watch 即失效。**

    也不存在客户端关闭后继续运行的云端形态。
  tools: >-
    两大核心能力是文件编辑与 Git 自动提交，与 CLI 形态是同一机制。

    **可配置 lint / 测试命令自动运行**。

    官方文档见 `docs/usage/lint-test.html`。

    - `--lint-cmd` / `--auto-lint`：默认对编辑过的文件跑 lint
    - `--test-cmd` / `--auto-test`
    - `/run`：跑 shell 命令
    - `/web`：抓网页转 markdown
    - `/paste`：贴图

    watch 模式下，可从编辑器直接拖文件到智能体面板，或把编辑器选区发送到对话。

    在文件里加 `# AI` 注释，即可把该文件加入 chat。

    **无内置 MCP 支持**——官方选项表与文档站导航都没有任何 MCP 条目
    （已查 `config/options.html` 与 docs 目录）。

    所以不能接 MCP server。
  context: >-
    Repo Map 提供全库结构视图，每次请求随附，见 local_files。

    **上下文超限用「摘要压缩」而非简单截断。**

    官方选项 `--max-chat-history-tokens` 的描述是：

    **官方原文**："Soft limit on tokens for chat history, after which summarization begins"

    也就是说，超过软上限即开始摘要；摘要由 `--weak-model` 生成。

    `--map-tokens` 控 repo map 的 token 预算。

    每个模型的上下文窗口与费用，由 `--model-metadata-file` 提供。

    会话内可用 `/tokens` 查看用量。

    腾空间还有 `/drop`、`/clear`、`/reset`。

    **默认不跨启动恢复**（`--restore-chat-history` 默认 False）。

    chat 历史默认写 `.aider.chat.history.md`。
  permissions: >-
    **默认自动提交。**

    官方 `--auto-commits` 默认 True：每次编辑都用合理的 commit message 提交。

    `--dirty-commits` 默认 True：会先把已有的未提交改动也提交，
    让你的改动与 AI 的改动分开。

    撤销路径是 **git 本身**（`/undo`）。

    **存在确认环节。**

    官方提供 `--yes-always`（别名 `--yes`）。

    **官方原文**："Always say yes to every confirmation"

    含义是：默认会对某些操作询问，加此开关才全自动。

    `--dry-run` 可不改文件地预演。

    提交时默认跳过 pre-commit hook（`--git-commit-verify` 默认 False，即用 `--no-verify`）。

    **无沙箱机制**（官方选项表无任何沙箱项）。

    watch 模式复用同一 coder。

    官方 watch 页写它用 `/undo` 撤销、用 `/tokens` 管上下文。

    所以上述自动提交与确认机制同样适用。

    **常驻进程 + 自动提交 + 需显式开关才不询问，三者叠加风险高。**
  fit: >-
    **适合**两类人：

    - 习惯在任意编辑器里工作，不愿切换到专门的 Agent 界面的人
    - 需要「加注释 → 自动响应」这种轻量交互的人

pitfalls:
  - 以为它是编辑器插件，实际是 Aider 常驻进程 + 浏览器 UI
  - 把 watch 模式当成云端后台任务，它需要本机进程一直运行
  - 没意识到自动提交在 watch 模式下同样生效，常驻进程下风险更高

tags: [编程, IDE, 本地, 开源]
related: [git]

sources:
  - label: Aider · Watch 模式官方文档（Aider in your IDE）
    url: https://aider.chat/docs/usage/watch.html
    kind: docs

  - label: Aider · 仓库
    url: https://github.com/Aider-AI/aider
    kind: repo

  - label: Aider · Releases（最新 v0.86.0 @ 2025-08-09）
    url: https://github.com/Aider-AI/aider/releases
    kind: changelog

  - label: Aider · 选项参考（--aiderignore/--auto-commits/--yes-always/--map-tokens/--max-chat-history-tokens）
    url: https://aider.chat/docs/config/options.html
    kind: docs

  - label: Aider · Git 集成（自动提交、dirty 提交、/undo、默认跳过 pre-commit hook）
    url: https://aider.chat/docs/git.html
    kind: docs

  - label: Aider · Linting and testing（--lint-cmd/--test-cmd/--auto-lint/--auto-test）
    url: https://aider.chat/docs/usage/lint-test.html
    kind: docs

  - label: Aider · Scripting（--yes/--auto-commits/--dry-run 官方帮助文本）
    url: https://aider.chat/docs/scripting.html
    kind: docs

link:
  url: https://aider.chat
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: maintenance
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官网 aider.chat 直连实测 200。
  direct_note_en: aider.chat measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**不是编辑器插件，是一种使用模式。**

Aider 常驻 watch 你的文件，你在任意编辑器里加 AI 注释，它就响应。

## 它在 IDE 形态里的位置

IDE 形态到目前为止有四种，本条目是第四种：

| 形态 | 代表 | 实质 |
|---|---|---|
| 独立编辑器 | Zed | 自带完整编辑器 |
| 原生桌面应用 | Cline Desktop | 不依附编辑器 |
| 编辑器扩展 | Codex IDE、Copilot、Cline 扩展 | 装进已有编辑器 |
| **常驻 watch 模式** | **Aider** | **在编辑器外运行，监听文件变化** |

**Aider 的特殊之处**：它不进入编辑器，而是监听你在任意编辑器里的改动。

### 官方文档的措辞

官方文档的标题是「Aider in your IDE」。

英文原文：

```
Aider can watch your files and respond to AI comments
you add in your favorite IDE or text editor.
```

**注意最后半句**：`or text editor`。

连纯文本编辑器都行，因为它监听的是文件变化，不是编辑器 API。

**但界面仍是 Aider 自己的浏览器 UI**，不是在编辑器内联显示。

## 与 CLI 形态的关系

| | [CLI](../../agents/products/aider-cli.md) | Watch 模式（本条目） |
|---|---|---|
| 交互 | 终端对话 | 加 AI 注释 |
| 界面 | 终端 | Aider 的浏览器 UI |
| 进程 | 随会话结束 | **需常驻** |
| Repo Map | 有 | 有（同一能力） |
| 自动提交 | 有 | 有（同一机制） |
| 维护状态 | maintenance | maintenance（同一项目） |

**同一个项目，两种用法**，不是两套实现。

## 关键风险：常驻 + 自动提交

本条目需要特别注意的组合有三个因素。

| 因素 | 状态 |
|---|---|
| 进程常驻 | 需要一直运行才能响应 |
| 自动提交 | AI 改动直接进 git 历史（`--auto-commits` 默认 True） |
| 每次询问 | 有确认开关 `--yes-always`（默认关） |
| | **默认会对某些操作询问** |

**三者叠加，风险高于手动启动的 CLI 用法。**

这三者是：常驻进程、默认自动提交、需显式 `--dry-run` 或关自动提交才可预演。

**建议**：第一次用 watch 模式时，在小仓库里试，并先确认 git 状态干净。

## 适合与不适合

适合两类人，与本条目的 `fit` 维度一致。

- 习惯在任意编辑器里工作，不愿切换到专门的 Agent 界面的人
- 需要「加注释 → 自动响应」这种轻量交互的人

**不适合**要求严格审批的场景。

watch 模式默认会对某些操作询问，但仍会自动提交。

常驻进程下，它更容易产生未经确认的改动。

也不适合需要云端后台运行的场景，它依赖本机进程。

## 采集限制

Aider 的文档站在本次采集环境 curl 可达。

watch 模式的官方描述已确认。

**A6.2（2026-10-08）本轮补齐**：

- watch 模式的文件范围与忽略规则
- 自动提交与 `--yes-always` 确认机制
- lint / 测试命令
- 上下文摘要压缩（`--max-chat-history-tokens`）
- **官方文档与选项表均无 MCP 条目**这一结论

以上均已从官方源核实并写进 axes。

**仍待实测**：大仓库 Repo Map 的实际耗时与 token 开销（官方未给数字）。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：这个工具的实测重点应是
**「常驻进程 + 自动提交」的风险是否可控**。

建议在一个测试仓库里跑，观察产生了多少次未经确认的提交。

## 未知项清单

- 大仓库 Repo Map 的实际耗时与 token 开销（官方未给数字，待实测）
- `--yes-always` 默认会就哪些具体操作询问（官方未逐项列举）

## 相关条目

- [Aider CLI](./aider-cli.md) — 同一项目的终端形态
- [Cline](./cline.md) — 三形态覆盖，但形态相互独立
