# agents 分区定义（成品 agent）

**主题**：装在编辑器 / 终端里自己跑的 AI 编码 agent

> **2026-10-02 重构**：原`ide` + `cli` 两个分区合并为一个 `agents` 分区。
> **档案一份没少**（合并当时 14 份：IDE 形态 8 + CLI 形态 6；2026-10-08 A6.1 扩至 27 份），`track:` 字段仍是
> `ide` / `cli` 两种取值 —— 它是**内容分类**，脚本依赖它，不要改成 `agents`。
> 合并的只有**站点层**：以前两个站各一张表，现在合成一个站的两个分区。
>
> **为什么不合并档案**：见下方「同一产品两种形态」。

---

## 为什么两个分区合成一个

2026 年 8 月起，Claude Code、GitHub Copilot、Cursor **三者全部**有 CLI、
全部 agent 式执行代码、全部支持 MCP。第三方评价的原话是「这个比较维度已经塌了」。

所以「IDE vs CLI」不再是**产品类别**之分，而是**同一个产品的两种形态**之分。
按形态分成两个站，会让「Cursor 和 Cursor CLI 哪个好」这种问题看起来像
「两个产品在竞争」，而它们其实是同一个东西的两种装法。

**这正是「不同层不硬排」的意思**：形态是维度，不是类别。

---

## 收录标准

一个对象要进这个分区，必须满足全部三条：

| # | 标准 |
|:--:|---|
| 1 | **AI 参与编码**，不只是补全（AI 能改多文件、能跑命令、能自主完成任务） |
| 2 | **面向代码库工作**，不是纯问答或纯代码生成片段 |
| 3 | **有可访问的官方文档或 changelog** |

**形态归属**（决定 `track:` 写 `ide` 还是 `cli`）：

| 形态 | 判据 |
|:--|:--|
| IDE | 主要交互在图形界面：独立 IDE、编辑器扩展、桌面客户端 |
| CLI | 主要交互是**终端**，能脚本化 / 进 CI |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 纯补全插件（无 agent 能力） | 不收，已超出分区定义 |
| 纯 shell 补全（如 fig） | 不收，无编码能力 |
| VS Code 插件形态但能力等同独立 IDE | 收 `ide`，在 `runtime` 里注明形态 |
| 有 IDE 但主要形态是终端 | 收 `cli`，用 `related` 引用那份 IDE 档案 |
| 终端 UI 库（如 Crush 用 Bubble Tea） | 收 `cli`，只要 AI 参与编码 |

---

## 收录对象

### IDE 形态（`track: ide`，11 份）

| id | 名称 | 厂商 |
|---|---|---|
| `aider` | Aider Watch 模式 | Aider-AI |
| `claude-code` | Claude Code IDE 扩展 | Anthropic |
| `cline` | Cline | Cline |
| `codex-ide` | Codex IDE 扩展 | OpenAI |
| `continue` | Continue（已归档：被 Cursor 收购，仓库 read-only） | Continue |
| `copilot` | GitHub Copilot | GitHub |
| `cursor` | Cursor | Anysphere |
| `junie` | Junie | JetBrains |
| `kiro` | Kiro | AWS |
| `windsurf` | Windsurf / Devin Desktop | Cognition |
| `zed` | Zed | Zed Industries |

### CLI 形态（`track: cli`，12 份）

| id | 名称 | 厂商 |
|---|---|---|
| `aider-cli` | Aider | Aider-AI |
| `amp` | Amp | Sourcegraph |
| `claude-code-cli` | Claude Code CLI | Anthropic |
| `codex-cli` | Codex CLI | OpenAI |
| `copilot-cli` | GitHub Copilot CLI | GitHub |
| `crush` | Crush | Charm |
| `cursor-cli` | Cursor CLI | Anysphere |
| `factory-droid` | Droid | Factory AI |
| `gemini-cli` | Gemini CLI | Google |
| `goose` | Goose | Agentic AI Foundation |
| `opencode` | OpenCode | OpenCode |
| `warp` | Warp | Warp |

### 厂商云形态（v4 新增）

本机不装任何东西、在厂商云上持续工作的成品 agent。前三份 2026-10-03 补齐；Jules 2026-10-08 补入。

| id | 名称 | 厂商 | 形态要点 |
|---|---|---|---|
| `openai-dot` | OpenAI Dot | OpenAI | 沙盒内跑代码 · 运行期监控可真拦下来 · 授权本机后能读桌面表格 |
| `meta-muse` | Meta Muse | Meta | 后台常驻 · 每个写操作都要批准 · 记忆存成可查文件 |
| `grok-bot` | xAI Grok Bot | xAI | 按次付费 · 每个动作都要单独批准 · 审批不外溢到下一次 |
| `jules` | Jules | Google | 云 VM 异步执行 · 批准计划后走开 · 产出是 PR（API 可自动批准） |

---

## 同一产品两种形态：**不合并档案**

五组产品各有两份档案。**它们不是重复记录**，名字已经区分了形态：

| IDE 形态 | CLI 形态 | 差别在哪 |
|---|---|---|
| `Aider Watch 模式`<br>homepage = aider.chat/docs/usage/watch.html | `Aider`<br>homepage = github.com/Aider-AI/aider | 一个是常驻看diff 的模式，一个是交互式编码工具 |
| `Claude Code IDE 扩展`<br>homepage = code.claude.com/docs/en/overview | `Claude Code CLI`<br>homepage = github.com/anthropics/claude-code | 扩展装在编辑器里，CLI 在终端跑，权限模型不同 |
| `Codex IDE 扩展`<br>homepage = developers.openai.com/codex/ide | `Codex CLI`<br>homepage = github.com/openai/codex | 同上 |
| `GitHub Copilot`（全形态主条）<br>homepage = github.com/features/copilot | `GitHub Copilot CLI`<br>homepage = docs.github.com 的 CLI 文档 | 主条覆盖网站/编辑器/CLI 全生态，CLI 条目只写终端形态差异 |
| `Cursor`<br>homepage = cursor.com | `Cursor CLI`<br>homepage = cursor.com/cli | 编辑器与终端两种运行面，共用账户、模型目录与 mcp.json |

**为什么不合并**：两者��� `model_access` / `runtime` / `permissions` 三个维度上**取值不同**。
合并成一份会丢掉这些差异，而这三个维度正是本站比较的依据。
站上呈现时用 `related` 互链，让读者看到「这是同一个产品的两种装法」。

---

## 坐标系细化：运行环境责任

很多工具明确区分四种运行责任，**这个区分必须写进 `runtime` 维度**：

| 形态 | 谁运行 | 谁付费 |
|---|---|---|
| CLI | 用户终端 | 订阅 |
| Client SDK | 你的客户端 | 你的进程 + API |
| Agent SDK | 你的应用 | 你的进程 + API |
| Managed Agents | 厂商托管 | 开发者方案 |

## 八个维度在agent 语境下问什么

| # | 维度 | 本分区语境的具体问题 |
|:--:|---|---|
| 1 | 模型与开放条件 | 默认模型？能不能接任意 API（含本地模型）？多 provider 支持？ |
| 2 | 运行位置 | 本地进程还是托管？有 SDK 模式吗？ |
| 3 | 本地文件 | Git 友好度？diff 输出质量？能否非交互运行？索引策略？ |
| 4 | 关机后的任务 | 能不能脱离人自己跑？有没有云端选项？ |
| 5 | 工具与扩展 | 内置工具清单？MCP？自定义指令？Hooks？非交互模式（`-p` 之类）？ |
| 6 | 上下文与记忆 | 会话恢复方式？压缩策略？是否有 `--continue` 类功能？ |
| 7 | 权限与限制 | 沙箱默认值？非交互模式下的审批怎么处理？ |
| 8 | 适合什么任务 | CI 集成？批量脚本？人机协作强度？ |

---

## 本分区的关键区分点

### 非交互模式（CLI 形态特有）

能不能一条命令跑完并返回结果？这决定它能不能进 CI。判定看三样：
- 单次执行模式（`--print` / `-p` / `run` 之类）
- 输出格式控制（JSON / 纯文本）
- 退出码语义（成功/失败如何表达）

### Git 集成深度（CLI 形态特有）

| 级别 | 说明 |
|---|---|
| 无 | 纯文件操作 |
| 只读 | 能看 diff，不能提交 |
| 完整 | 自动 commit / 分支 / PR |

**完整 Git 集成是 Aider 和 OpenCode 的重要差异点。**

### 索引策略（IDE 形态特有）

闭源产品的索引策略官方通常不公开。这一项经常是「未知」——
**不猜测，写「未获官方确认」**。

### Provider 兼容性（两种形态都要看）

能接多少家模型 API？这直接影响「会不会被单一厂商锁定」。

```
MCP 与多provider 接入；与单个模型能力不是一回事。
```

---

## 常见误解来源

| 角度 | 本分区例子 |
|---|---|
| 同一产品两种形态 | CLI 版和 IDE 版能力不同（见上文三组） |
| provider 兼容性 | 支持列表 ≠ 有额度 |
| 安装方式 | 看似装上了，实际要单独装 provider |
| 沙箱默认值 | 非交互模式下审批怎么处理 |
| 形态 ≠ 类别 | 「CLI 版更强」这类比较没有意义，取决于你装在哪 |

---

## 实测任务集

见 [`tasks/`](./tasks/)。IDE 形态 3 份 + CLI 形态 10 份。

**CLI 形态特有的测试维度**：
- 非交互模式能否完成完整任务
- 在 CI 环境（无 TTY）下是否正常
- 退出码与输出格式是否可用于脚本编排

---

## 与其他分区的关系

```
本分区（agents）  ──┬── claude-code ↔ claude-code-cli
                     ├── codex-ide ↔ codex-cli
                     └── aider ↔ aider-cli

harness/   自建底座：Agent 运行时 / 编排框架 / SDK（15 份）
tools/     工具层：MCP server（10 份，按「缺什么装什么」查表）
```

**关键分界**：本分区是**装来就能用的成品**，harness 是**自己搭底座**，
tools 是**给成品装工具**。三者关心的维度取值范围不同，所以站上分三个分区。
