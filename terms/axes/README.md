# 分区维度定义

这8 个维度是**跨站共享**的知识：agent 站比较 agent 产品时用它们，
learn 站的「维度对照表」也用它们。**本目录是唯一真相源。**

## 8 个维度（agent 八维）

| # | 文件 | 键 | 核心问题 |
|---|---|---|---|
| 1 | `model-access.md` | `model_access` | 它怎么访问模型 |
| 2 | `runtime.md` | `runtime` | 跑在哪、什么进程形态 |
| 3 | `local-files.md` | `local_files` | 能不能读写本地文件 |
| 4 | `background.md` | `background` | 能不能脱离人自己跑 |
| 5 | `tools.md` | `tools` | 内置工具与扩展机制 |
| 6 | `context.md` | `context` | 上下文怎么管、会不会压缩 |
| 7 | `permissions.md` | `permissions` | 权限边界与审批 |
| 8 | `fit.md` | `fit` | 适合谁、不适合谁 |

## 另一个坐标系：MCP 三维

MCP分区用的是**另一套三维**，块名不同，**不要与上面 8 维混用**：

| 文件位置 | 键 | 核心问题 |
|---|---|---|
| `tracks/mcp/taxonomy/transport.md` | `transport` | 怎么传（stdio / HTTP） |
| `tracks/mcp/taxonomy/auth.md` | `auth` | 怎么认证 |
| `tracks/mcp/taxonomy/scope.md` | `scope` | 能碰多大范围 |

## 两条铁律

1. **不同层不硬排。** IDE 扩展与 CLI 是同一产品的两种形态，
   各有各的 `model_access`，**不合并成一份**（见 `tracks/ide/products/aider.md`
   与 `tracks/cli/products/aider-cli.md` 的差别）。
2. **给判断依据不给虚假排名。** 维度文件里不写「谁更好」，只写「这个维度在问什么、
   怎么判断、容易误解在哪」。

## 改这个目录时

agent 仓有一份内联副本（迁移自 `ai-compare/axes/`）。**改这里，然后同步过去**，
不要只改一份 —— 两份漂移过一次了（层描述那件事，详见 `.workbuddy/memory/2026-10-02.md`）。