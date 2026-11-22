# coding 大类收录声明

**主题**：AI 编程。装在编辑器 / 终端 / 厂商云上，面向代码库自主干活的编码 agent。
定义与边界裁决见 [../../categories.md](../../categories.md) §1。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **AI 参与编码**，不只是补全（AI 能改多文件、能跑命令、能自主完成任务） |
| 2 | **面向代码库工作**，不是纯问答或纯代码生成片段 |
| 3 | **有可访问的官方文档或 changelog** |

**形态归属**

决定 `form:` 取值。⚠ 下表第一列不加反引号。audit.mjs 会把「反引号小写词开头的 ≥3 列表格行」当成档案声明。

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
| VS Code 插件形态但能力等同独立 IDE | 收 `ide`。在 `runtime` 里注明形态 |
| 有 IDE 但主要形态是终端 | 收 `cli`，正文对照那份 IDE 档案 |
| 终端 UI 库（如 Crush 用 Bubble Tea） | 收 `cli`，只要 AI 参与编码 |
| 通用对话产品带代码能力 | 归 `chat`（官方自我定位是通用助手） |
| 可视化搭 AI 应用的平台（Dify 类） | 归 `automation`（交付物是搭出来的应用） |

## 收录对象（41 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `baidu-comate` | 文心快码（Baidu Comate） | 百度 | IDE / 编辑器 | 8 项已核 · 活跃 |
| `amp` | Amp | Amp Frontier Corporation（原 Sourcegraph，2025-12 分拆独立） | CLI | 8 项已核 · 活跃 |
| `augment-code` | Augment Code | Augment Code | 厂商云 | 8 项已核 · 活跃 |
| `bolt-new` | Bolt.new | StackBlitz | 厂商云 | 8 项已核 · 活跃 |
| `claude-code-cli` | Claude Code CLI | Anthropic | CLI | 8 项已核 · 活跃 |
| `claude-code` | Claude Code IDE 扩展 | Anthropic | IDE / 编辑器 | 8 项已核 · 活跃 |
| `cline` | Cline | Cline Bot | IDE / 编辑器 | 8 项已核 · 活跃 |
| `codebuddy` | CodeBuddy | 腾讯云 | IDE / 编辑器 | 8 项已核 · 活跃 |
| `codex-cli` | Codex CLI | OpenAI | CLI | 8 项已核 · 活跃 |
| `codex-ide` | Codex IDE 扩展 | OpenAI | IDE / 编辑器 | 8 项已核 · 活跃 |
| `crush` | Crush | Charm | CLI | 8 项已核 · 活跃 |
| `cursor` | Cursor | Anysphere | IDE / 编辑器 | 8 项已核 · 活跃 |
| `cursor-cli` | Cursor CLI | Anysphere | CLI | 8 项已核 · 活跃 |
| `devin` | Devin | Cognition | 厂商云 | 8 项已核 · 活跃 |
| `factory-droid` | Droid | Factory AI | CLI | 8 项已核 · 活跃 |
| `gemini-cli` | Gemini CLI | Google | CLI | 8 项已核 · 活跃 |
| `copilot` | GitHub Copilot | GitHub / Microsoft | IDE / 编辑器 | 8 项已核 · 活跃 |
| `copilot-cli` | GitHub Copilot CLI | GitHub | CLI | 8 项已核 · 活跃 |
| `google-antigravity` | Google Antigravity | Google | IDE / 编辑器 | 8 项已核 · 活跃 |
| `goose` | Goose | Agentic AI Foundation | CLI | 8 项已核 · 活跃 |
| `jules` | Jules | Google | 厂商云 | 8 项已核 · 活跃 |
| `junie` | Junie | JetBrains | IDE / 编辑器 | 8 项已核 · 活跃 |
| `kilocode` | Kilo Code | Kilo-Org | IDE / 编辑器 | 8 项已核 · 活跃 |
| `kiro` | Kiro | AWS | IDE / 编辑器 | 8 项已核 · 活跃 |
| `lovable` | Lovable | Lovable | 厂商云 | 8 项已核 · 活跃 |
| `meta-muse` | Meta Muse | Meta | 厂商云 | 8 项已核 · 活跃 |
| `openai-dot` | OpenAI Dot | OpenAI | 厂商云 | 8 项已核 · 活跃 |
| `opencode` | OpenCode | OpenCode | CLI | 8 项已核 · 活跃 |
| `qoder` | Qoder | 阿里云 | IDE / 编辑器 | 8 项已核 · 活跃 |
| `qoder-cn` | Qoder CN（原通义灵码） | 阿里云 | IDE / 编辑器 | 8 项已核 · 活跃 |
| `replit-agent` | Replit Agent | Replit | 厂商云 | 8 项已核 · 活跃 |
| `trae` | Trae | 字节跳动 | IDE / 编辑器 | 8 项已核 · 活跃 |
| `v0` | v0 | Vercel | 厂商云 | 8 项已核 · 活跃 |
| `warp` | Warp | Warp | CLI | 8 项已核 · 活跃 |
| `windsurf` | Windsurf / Devin Desktop | Cognition | IDE / 编辑器 | 8 项已核 · 活跃 |
| `grok-bot` | xAI Grok Bot | xAI | 厂商云 | 8 项已核 · 活跃 |
| `zed` | Zed | Zed Industries | IDE / 编辑器 | 8 项已核 · 活跃 |
| `aider-cli` | Aider | Aider-AI | CLI | 8 项已核 · 更新放缓 |
| `aider` | Aider Watch 模式 | Aider-AI | IDE / 编辑器 | 8 项已核 · 更新放缓 |
| `amazon-q-developer` | Amazon Q Developer | AWS | IDE / 编辑器 | 有未核项 · 更新放缓 |
| `continue` | Continue | Continue | IDE / 编辑器 | 8 项已核 · 已归档 |

> 共 **41** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成。改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
