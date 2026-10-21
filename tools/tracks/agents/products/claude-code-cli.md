---
id: claude-code-cli
track: cli
tasks: ["write-code"]
name: Claude Code CLI
vendor: Anthropic
homepage: https://github.com/anthropics/claude-code
mark: CC
accent: "#D97757"

axes:
  model_access: >-
    Anthropic 自家 Claude 系列。

    **v2.1.284（2026-09-28）新增 Claude Sonnet 5.5（`claude-sonnet-5-5`）。
    官方标注它是 Anthropic API 上的默认 Sonnet 模型。**
    规格为 1M 上下文（API 报价见官方定价页，本站不存）。

  runtime: >-
    本地进程，在终端运行。生命周期绑定终端会话。
    仓库含 `.devcontainer`，说明支持容器化开发环境。

  local_files: >-
    **权限模型与工作目录强绑定**——

    CHANGELOG 记录 auto 模式在「读取工作目录之外的文件前」会询问。
    它还新增了「Yes, but ask again next time」选项。
    含义是允许这一次读取，之后仍继续询问。

    1M 上下文档位（见 model_access）。

  background: >-
    **终端形态需客户端常驻，但官方有云端形态可关机续跑。**

    官方 `claude-code-on-the-web` 原文：
    "A cloud session is a Claude Code session that runs on cloud
    infrastructure instead of on your machine... The session keeps
    running after you close your laptop."

    CLI 用 `claude --cloud` 创建云会话（旧 `--remote` 为别名），
    `claude --teleport` 把云会话拉回终端继续；

    Routines（在 CLI 里用 `/schedule` 创建）跑在 Anthropic 托管云上，
    **官方原文**："they keep working when your laptop is closed"。

    云会话与 routines 需 Pro / Max / Team 或 Enterprise 付费席位。

    额度与限额跟随套餐。官方 routines 页单列了 Usage and limits。

  tools: >-
    **MCP 支持完整且在持续加强**——

    v2.1.284 新增 `/mcp reconnect all`。它能一次性重试所有连接失败或待认证的 MCP server。

    同版本修复了一个问题。恢复会话时 MCP 工具调用会报 No such tool available，
    但 server 其实仍在连接。现在会**等待最多 10 秒**。

  context: >-
    **上下文压缩机制有明确的边界处理**——

    v2.1.284 修复了一个持久报错问题。压缩后仍超长时，
    会持续报 Prompt is too long。现在会**再压缩一次，并保留更少的近期对话**。

    这说明它确实有多轮压缩能力，且边界情况在持续修补。

  permissions: >-
    **权限设计的颗粒度在本分区里最细**：

    - auto 模式按路径询问（工作目录外读取需确认），且提供「允许这一次」的中间选项；

    - 托管策略支持 `availableModels` 与 `enforceAvailableModels` 控制可用模型，
      并在策略不匹配时**启动即警告**；

    - `/usage` 显示额度消耗与上限。

  fit: >-
    重视权限可控性、需要 MCP 生态、希望用 Anthropic 官方模型的用户。
    **不适合需要开源许可或自托管的场景**（许可明确 proprietary）。

pitfalls:
  - 以为 GitHub 有仓库就是开源，LICENSE.md 是 All rights reserved + 商用条款
  - 忽略「工作目录外读取需询问」这个默认值，第一次用可能被打断
  - 误以为压缩能解决所有超长问题，官方仍在修「压缩后仍超长」的边界

tags: [编程, 终端, 本地]
related: [claude-agent-sdk, filesystem]

sources:
  - label: Anthropic · Claude Code 仓库
    url: https://github.com/anthropics/claude-code
    kind: repo

  - label: Anthropic · Claude Code CHANGELOG
    url: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
    kind: changelog

  - label: Anthropic · Claude Code Releases（v2.1.284 @ 2026-09-28）
    url: https://github.com/anthropics/claude-code/releases
    kind: changelog

  - label: Anthropic · Claude Code Atom feed（可直接订阅更新）
    url: https://github.com/anthropics/claude-code/blob/main/feed.xml
    kind: changelog

  - label: Anthropic · 官方文档
    url: https://code.claude.com/docs/en/overview
    kind: docs

  - label: Anthropic · Commercial Terms of Service
    url: https://www.anthropic.com/legal/commercial-terms
    kind: docs

  - label: Anthropic · Claude Code on the web（云会话，关机后仍续跑）
    url: https://code.claude.com/docs/en/claude-code-on-the-web
    kind: docs

  - label: Anthropic · Routines（云端定时 / API / GitHub 触发任务）
    url: https://code.claude.com/docs/en/routines
    kind: docs

link:
  url: https://code.claude.com/docs/en/overview
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官网仓库在 GitHub，大陆直连波动（同日实测 200/000 混合）；npm / PyPI 安装源实测稳定可达。
  direct_note_en: Hosted on GitHub — direct reachability from mainland fluctuates (200/000 mixed on the same day); npm / PyPI install routes measured stable.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**本分区数据质量最高、发布最频繁的条目**。它自带 CHANGELOG 与 Atom feed。
它的权限设计颗粒度最细。

## ⚠ 许可状态（最重要的前提）

`LICENSE.md` 原文：

> © Anthropic PBC. **All rights reserved.**
> Use is subject to Anthropic's Commercial Terms of Service.

**这不是开源许可。** GitHub API 的 license 字段返回 `NONE` 也是因为这个。

| 问题 | 答案 |
|---|---|
| 能看源码吗 | 能（仓库公开） |
| 能商用吗 | 须遵守 Anthropic 商用条款 |
| 能闭源分发吗 | **不能**（All rights reserved） |
| 能自托管吗 | 不适用（proprietary + 订阅制） |

**这一点必须在选型前说清楚**——
「工具在 GitHub 上」不等于「你可以自由使用」。

## 变更记录：三种订阅方式（本分区唯一）

本条目有**三条** changelog 入口：

| 入口 | 说明 |
|---|---|
| `CHANGELOG.md` | 主变更记录 |
| `releases` | 版本标签与时间 |
| **`feed.xml`** | **Atom feed，可直接订阅** |

```xml
<link rel="self" type="application/atom+xml"
      href="https://raw.githubusercontent.com/anthropics/claude-code/main/feed.xml"/>
```

**这是本分区唯一自带 Atom feed 的项目。**
如果你想订阅某个 CLI 工具的更新，直接指向这个 feed。

**注意**：本站 `mcp.specul.com` 曾评估过「加 RSS」这项改进，
本条目说明**至少 Claude Code 这一个对象已经提供了**，
其他对象仍需人工查看。

## 发布节奏

| 版本 | 日期 |
|---|---|
| `v2.1.284` | 2026-09-28 |
| `v2.1.283` | 2026-09-25 |
| `v2.1.282` | 2026-09-24 |
| `v2.1.281` | 2026-09-23 |
| `v2.1.280` | 2026-09-22 |

**5 天内 5 个版本**——本分区里可核实的最密节奏之一。

## 模型更新（v2.1.284 原文）

CHANGELOG 原文（节选，API 报价部分按 D9 口径不摘录）：

```
Added Claude Sonnet 5.5 (claude-sonnet-5-5), now the default Sonnet
model on the Anthropic API — 1M context…
```

| 项目 | 值 |
|---|---|
| 模型 id | `claude-sonnet-5-5` |
| 上下文 | **1M** |

**这是本分区唯一从 CHANGELOG 里核实到默认模型规格的对象**，
因为它写在了 CHANGELOG 里而不是别处。

## 权限设计：本分区最细

### ① 按路径询问，且能"只允许这一次"

v2.1.284 新增了一个选项：

```
Added a "Yes, but ask again next time" answer to auto mode's prompt
before a read outside the working directories, so you can allow that one
read and still be asked about later ones
```

**这个设计值得单独记录**。多数工具的审批只有「允许 / 拒绝」两态，
Claude Code 提供了第三态：**允许这一次，但保持询问**。

这解决了真实场景里的两难：

- 全局允许 → 失去保护
- 每次确认 → 流程被打断

### ② 托管策略控制可用模型

```
Added Claude apps gateway startup warnings when a managed policy's
availableModels is empty, or leaves out the model Claude Code starts on
without setting model or enforceAvailableModels
```

企业场景下：

- 可用模型由 `availableModels` 策略控制
- `enforceAvailableModels` 决定是否强制
- **策略不匹配时启动即警告**，不静默降级

### ③ 额度可见

```
Added dollar amounts to the Claude apps gateway spend limit in /usage
and the status line
```

`/usage` 与状态栏显示**具体花费数字**而非抽象百分比（原文示例含金额，按 D9 口径不摘录）。

## MCP 支持在持续加强

v2.1.284 两处改动都关于 MCP：

| 改动 | 内容 |
|---|---|
| 新增 | `/mcp reconnect all` —— 一次性重试所有失败或待认证的 server |
| 修复 | 恢复会话时 MCP 工具报 "No such tool available"（实际 server 还在连接），现在**等待最多 10 秒** |

**第二条修复的价值**：它揭示了一个真实场景——
**会话恢复与 MCP server 连接之间存在竞态**。
这类问题只有大量用户才会遇到。

## 上下文压缩的边界处理

```
Fixed "Prompt is too long" errors that persisted after compacting:
when the compacted request is still too long, Claude Code now compacts
once more, keeping less of the recent conversation
```

**这说明**：压缩后仍可能超长，此时会**再压缩一次**并**保留更少的近期对话**。

这是诚实的边界处理——不假装一次压缩就能解决。

## 权限定级说明

`confidence: partial` 的依据（2026-10-03 由 verified 降级）：

> **为什么降级**：下方 ❌ 项的主语是**本站的取证缺口**，不是「官方未提供」。
> 按 v3 铁律「未知就说未知」，这些条目存在时标 verified 属于虚高，故降为 partial。
> 主要缺口：完整工具清单、沙箱实现细节、是否支持本地模型、API 与订阅额度关系。

- ✅ 已核验：仓库、**许可状态原文**、最近 5 个版本与日期、star 数（148,488）、**模型规格原文**（报价按 D9 不存）、权限设计的三个具体机制、MCP 两处改动、上下文压缩策略、Atom feed 存在、**云端形态（`claude --cloud` / Routines / 关机后续跑）**
- ❌ 未核验：完整工具清单、沙箱实现细节、是否支持本地模型、API 与订阅额度关系

**这曾是 CLI 形态第一个达到 `verified` 的条目**。它把大量信息写在了 CHANGELOG 与 LICENSE 里。
**2026-10-03 因本站仍有取证缺口（见下）降为 `partial`**。

## 适合与不适合

重视权限可控性、需要 MCP 生态、希望用 Anthropic 官方模型的用户。
需要订阅更新通知的用户（本条目自带 Atom feed）。

**不适合**需要开源许可、自托管或闭源分发的场景——
许可明确为 proprietary，源码公开不等于可自由使用。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测**「允许这一次」审批选项在长任务中的实际打断频率**，
以及**恢复会话时的 MCP 重连行为**（官方刚修的地方最值得验证）。

## 未知项清单

- 完整工具清单
- 沙箱实现的具体方式
- 是否支持本地模型
- API 调用与订阅额度的关系
- 商业条款的具体限制内容

## 相关条目

- [Codex CLI](./codex-cli.md) — 同类 OpenAI 官方工具
- [OpenCode](./opencode.md) — 开源替代方案
