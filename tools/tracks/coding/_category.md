# coding 大类收录声明

**主题**：AI 编程——装在编辑器 / 终端 / 厂商云上，面向代码库自主干活的编码 agent。
定义与边界裁决见 [../../categories.md](../../categories.md) §1。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **AI 参与编码**，不只是补全（AI 能改多文件、能跑命令、能自主完成任务） |
| 2 | **面向代码库工作**，不是纯问答或纯代码生成片段 |
| 3 | **有可访问的官方文档或 changelog** |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号——audit.mjs 把「反引号小写词开头的 ≥3 列表格行」当档案声明）：

| 形态 | 判据 |
|:--|:--|
| ide | 主要交互在图形界面：独立 IDE、编辑器扩展、桌面客户端 |
| cli | 主要交互是**终端**，能脚本化 / 进 CI |
| cloud | 本机不装任何东西，工作在厂商云端机器上（Dot / Muse / Grok Bot 这类任务型 agent） |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 纯补全插件（无 agent 能力） | 不收，超出大类定义 |
| 纯 shell 补全（如 fig） | 不收，无编码能力 |
| VS Code 插件形态但能力等同独立 IDE | 收 `ide`，在 `runtime` 里注明形态 |
| 有 IDE 但主要形态是终端 | 收 `cli`，正文对照那份 IDE 档案 |
| 终端 UI 库（如 Crush 用 Bubble Tea） | 收 `cli`，只要 AI 参与编码 |
| 通用对话产品带代码能力 | 归 `chat`（官方自我定位是通用助手） |
| 可视化搭 AI 应用的平台（Dify 类） | 归 `automation`（交付物是搭出来的应用） |

## 收录对象（27 份）

| id | 名称 | 厂商 |
|---|---|---|
| `aider-cli` | Aider | Aider-AI |
| `aider` | Aider Watch 模式 | Aider-AI |
| `amp` | Amp | Sourcegraph |
| `claude-code-cli` | Claude Code CLI | Anthropic |
| `claude-code` | Claude Code IDE 扩展 | Anthropic |
| `cline` | Cline | Cline Bot |
| `codex-cli` | Codex CLI | OpenAI |
| `codex-ide` | Codex IDE 扩展 | OpenAI |
| `continue` | Continue | Continue |
| `copilot-cli` | GitHub Copilot CLI | GitHub |
| `copilot` | GitHub Copilot | GitHub / Microsoft |
| `crush` | Crush | Charm |
| `cursor-cli` | Cursor CLI | Anysphere |
| `cursor` | Cursor | Anysphere |
| `factory-droid` | Droid | Factory AI |
| `gemini-cli` | Gemini CLI | Google |
| `goose` | Goose | Agentic AI Foundation |
| `grok-bot` | xAI Grok Bot | xAI |
| `jules` | Jules | Google |
| `junie` | Junie | JetBrains |
| `kiro` | Kiro | AWS |
| `meta-muse` | Meta Muse | Meta |
| `openai-dot` | OpenAI Dot | OpenAI |
| `opencode` | OpenCode | OpenCode |
| `warp` | Warp | Warp |
| `windsurf` | Windsurf / Devin Desktop | Cognition |
| `zed` | Zed | Zed Industries |

> 候选全集与去向见 `inventory/coding.md`（T9 盘点后建立）。
