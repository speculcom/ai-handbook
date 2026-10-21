# 数据层更新记录

本文件记录 **ai-coding-agent-atlas 仓库**的数据变更。

**kind 分类**：`数据更新` / `规范更新` / `实测补充` / `仓库配置`

## 三种日期语义

| 日期 | 含义 |
|---|---|
| **提交日** | 本仓库 commit 日期 |
| **核验日** | 我们读官方源核验的日期（`last_verified`） |
| **官方发布日** | 官方宣布变更的日期 |

**只记录前两种。** 官方发布日属于条目内容，不属于本文件的记录范围。

---

## 2026-09-29 · 仓库配置 · 初始版本

**内容**：
- 建立 8 维度坐标系 + MCP 赛道特有 3 维度（transport / auth / scope）
- 采集三赛道共 **23 个条目**：IDE 8 / CLI 6 / MCP 9
- 建立三份实测协议（尚未执行）
- 建立四套校验脚本

**坐标系的两次调整**：
1. 新增 `lifecycle` 字段（active / maintenance / archived / unknown）
   —— 因为「核验日新」不等于「数据有效」，上游归档后数据会失效
2. 新增赛道维度优先级表
   —— 8 个维度等权是错的；MCP 赛道第一优先级是安全不是能力

**规范层的三次补漏**：
1. `sources` 允许用 releases / commits 充当 changelog
   （MCP reference server 无独立 changelog 页）
2. 正文必备小节从「适合 / 注意」合并为「适合与不适合」
   （注意已移入 frontmatter 的 `pitfalls`）
3. 禁止正文用 `---` 作分隔线（与 frontmatter 结束标记同形）

---

## 记录模板

```markdown
## YYYY-MM-DD · <kind> · <简述>

**涉及**：
- `tracks/<track>/products/<id>.md` — <改了什么>

**原因**：
<为什么改。引用具体的官方源或实测发现。>

**依据**：
- [<源标签>](<url>) — 核验日 YYYY-MM-DD

**影响**：
- 是否影响 `confidence`：是 / 否
- 是否影响 `lifecycle`：是 / 否
- 是否影响其他条目：否 / 是（说明哪些）
```

## 记录纪律

| # | 规则 |
|:--:|---|
| 1 | 每条记录都要有官方源链接 |
| 2 | 涉及数据变更要说明是否影响 `confidence` 与 `lifecycle` |
| 3 | 修正旧数据时注明原值与新值 |
| 4 | 实测补充要说明测试环境有无变化 |
| 5 | 规范更新要说明是否需要回溯修订历史数据 |

---

## 已知待办

| 项目 | 说明 |
|---|---|
| 实测任务尚未执行 | 三份协议已就绪（IDE / CLI / MCP），任务清单待写 |
| Zed 的 AI 侧能力未核验 | 文档站 `docs/src/ai` 需逐页读取 |
| Cursor / Windsurf 价格数字未取到 | JS 动态渲染，需专项采集 |
| Copilot 各档价格未逐档对应 | 月付/年付口径混在同一页面 |
| MCP 赛道实测未做 | 五项测试（安装/tool列表/传输兼容/输出可用性/权限边界） |

---

## 关联

- 方法论：[METHODOLOGY.md](./METHODOLOGY.md)
- 数据格式：[SCHEMA.md](./SCHEMA.md)
- 来源索引：[SOURCES.md](./SOURCES.md)
