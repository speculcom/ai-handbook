# 来源索引

所有条目引用的官方源集中在这里。**每条数据都必须能回到其中之一。**

---

## 收录标准

一个源要进这个索引，必须满足：

| # | 标准 |
|:--:|---|
| 1 | 是**官方**域名（厂商自有域名或官方 GitHub 组织） |
| 2 | 是**一手**内容（官网、官方文档、官方 changelog） |
| 3 | **可公开访问**，不需要登录或付费订阅 |
| 4 | 有明确的**日期或版本标识** |

**不收**：
- 第三方评测、聚合站、榜单
- 媒体转述、新闻稿转载
- 论坛讨论、社交媒体帖
- 需要登录才能看到的页面

**为什么**：第三方数据可以参考但不能作为证据。收录了就会变成「互相抄」的死循环。

---

## IDE 赛道

### Cursor

| kind | 源 |
|---|---|
| changelog | https://cursor.com/changelog |
| docs | https://cursor.com/docs |
| pricing | https://cursor.com/pricing |

### Claude Code

| kind | 源 |
|---|---|
| changelog | https://docs.anthropic.com/en/release-notes/claude-code |
| docs | https://docs.anthropic.com/en/docs/claude-code/overview |
| pricing | https://claude.com/pricing |

### GitHub Copilot

| kind | 源 |
|---|---|
| changelog | https://github.blog/changelog/label/copilot/ |
| docs | https://docs.github.com/en/copilot |
| pricing | https://github.com/features/copilot/plans |

### Windsurf

| kind | 源 |
|---|---|
| changelog | https://windsurf.com/changelog |
| docs | https://docs.windsurf.com |
| pricing | https://windsurf.com/pricing |

### Zed

| kind | 源 |
|---|---|
| changelog | https://zed.dev/releases |
| docs | https://zed.dev/docs |
| repo | https://github.com/zed-industries/zed |

### Cline

| kind | 源 |
|---|---|
| changelog | https://github.com/cline/cline/releases |
| docs | https://docs.cline.bot |
| repo | https://github.com/cline/cline |

### Aider

| kind | 源 |
|---|---|
| changelog | https://aider.chat/docs/ |
| repo | https://github.com/Aider-AI/aider |

### Codex CLI

| kind | 源 |
|---|---|
| changelog | https://developers.openai.com/codex/changelog |
| docs | https://developers.openai.com/codex/cli |
| pricing | https://openai.com/chatgpt/pricing |

---

## CLI 赛道

### Claude Code CLI

| kind | 源 |
|---|---|
| changelog | https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md |
| docs | https://docs.anthropic.com/en/docs/claude-code/cli-reference |
| repo | https://github.com/anthropics/claude-code |

### Codex CLI

| kind | 源 |
|---|---|
| changelog | https://developers.openai.com/codex/changelog |
| docs | https://developers.openai.com/codex/cli |
| repo | https://github.com/openai/codex |

### Gemini CLI

| kind | 源 |
|---|---|
| changelog | https://github.com/google-gemini/gemini-cli/blob/main/docs/changelog.md |
| docs | https://google-gemini.github.io/gemini-cli/ |
| repo | https://github.com/google-gemini/gemini-cli |

### OpenCode

| kind | 源 |
|---|---|
| changelog | https://opencode.ai/changelog |
| docs | https://opencode.ai/docs |
| repo | https://github.com/sst/opencode |

### Aider

| kind | 源 |
|---|---|
| changelog | https://aider.chat/docs/ |
| repo | https://github.com/Aider-AI/aider |

### Crush

| kind | 源 |
|---|---|
| changelog | https://github.com/charmbracelet/crush/releases |
| repo | https://github.com/charmbracelet/crush |

---

## MCP 赛道

MCP 赛道的源以**仓库 README + releases/commits** 为主。

### 官方规范与仓库

| kind | 源 | 备注 |
|---|---|---|
| docs | https://modelcontextprotocol.io/specification | 协议规范 |
| docs | https://modelcontextprotocol.io/docs/learn/client-concepts | 客户端概念（含 Roots） |
| repo | https://github.com/modelcontextprotocol/servers | **活跃 reference server 仓库（7 个）** |
| changelog | https://github.com/modelcontextprotocol/servers/releases | 仓库 releases |
| repo | https://github.com/modelcontextprotocol/servers-archived | **归档仓库（14 个，已停止更新）** |
| docs | https://registry.modelcontextprotocol.io | 官方 server 注册表 |

### 活跃的官方 reference server

| id | 源 |
|---|---|
| `filesystem` | https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem |
| `git` | https://github.com/modelcontextprotocol/servers/tree/main/src/git |
| `memory` | https://github.com/modelcontextprotocol/servers/tree/main/src/memory |
| `sequential-thinking` | https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking |
| `fetch` | https://github.com/modelcontextprotocol/servers/tree/main/src/fetch |
| `time` | https://github.com/modelcontextprotocol/servers/tree/main/src/time |
| `everything` | https://github.com/modelcontextprotocol/servers/tree/main/src/everything |

**变更历史**（无独立 changelog 页，用目录 commits）：
`https://github.com/modelcontextprotocol/servers/commits/main/src/<name>`

### 社区维护的 server

| id | 源 |
|---|---|
| `playwright` | https://github.com/microsoft/playwright-mcp |
| `context7` | https://github.com/upstash/context7 |

### 厂商官方 server

| id | 源 |
|---|---|
| `github-mcp` | https://github.com/github/github-mcp-server |

> ⚠ 下表已归档里的 `github` 指 **MCP 组织的旧参考 server**；
> GitHub 官方自己的 server（上表）是另一条活跃产品线，**不要混淆**（2026-10-08 修正）。

### 已归档（收录时须标注归档状态）

| 原 id | 归档位置 |
|---|---|
| `github`（旧参考 server） | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/github |
| `postgres` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/postgres |
| `puppeteer` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer |
| `slack` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/slack |
| `sqlite` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/sqlite |
| `redis` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/redis |
| `gitlab` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/gitlab |
| `brave-search` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/brave-search |
| `gdrive` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/gdrive |
| `sentry` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/sentry |
| `google-maps` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/google-maps |
| `everart` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/everart |
| `aws-kb-retrieval-server` | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/aws-kb-retrieval-server |
| `git`（旧） | https://github.com/modelcontextprotocol/servers-archived/tree/main/src/git |

---

## 待补充

以下源在 Phase 2 采集时需要逐个核验可用性，本文当前的 URL 是**待核验清单**，不是已验证清单。

**核验状态**：见各条目的 `last_verified` 与 `confidence` 字段。

---

## 新增源的规则

1. 先确认它符合上面 4 条收录标准
2. 在对应赛道的表格里加一行
3. 在条目里引用它
4. 如果是新的 `kind` 类型，先在 [SCHEMA.md](./SCHEMA.md) 里注册

**不允许**：把第三方评测当 `sources`。如果一个判断只能靠第三方来源支撑，那个判断应该标为「未知」，或者在 `pitfalls` 里说明"官方未公开，社区说法为 X（未核验）"。
