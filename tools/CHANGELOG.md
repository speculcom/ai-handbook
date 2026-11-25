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

## 2026-11-25 · 数据更新 · Opal 停用状态与 office 收录清单

**涉及**：
- `tracks/automation/products/opal.md` — 2026-11-17 已停用，lifecycle 改为 archived；更新迁移路径与核验说明
- `guides/changes-2026-q3-q4.md` — Opal 从“计划停用”改为“已生效”，补 Gems made by Labs 同日关闭与共享链接失效
- `inventory/office.md` — 新增 office 大类 15 份档案的收录清单
- `tracks/framework/products/{gazebo,genesis,isaac-lab,isaac-sim,drake,lerobot,moveit2,mujoco,nav2,pybullet,ros2,webots}.md` — 修掉“机器人软件栈对象”套话和被截断的加粗首句；补最小起步说明
- `tracks/office/products/*.md` — 15 份办公工具的一句话定位改成具体能力，去掉重复的“适合：适合”与空泛“不适合”段
- `scripts/status.mjs` / `scripts/quality.mjs` / `_audit/link-graph.mjs` — 把 office 与 safety 纳入全量扫描
- `i18n/bodies/opal.en.json`、`i18n/bodies/*.en.json`（12 个 robotics 页）、`i18n/_leads.en.json`、`i18n/_onelines.en.json`、`i18n/_fits.en.json`、`i18n/_pitfalls-a.en.json`、`i18n/guides/changes-2026-q3-q4.en.json` — 中英同步

**原因**：
Google 官方 FAQ 与 opal.google 均显示 2026-11-17 已停用；原页仍写“计划停用”，会让读者误以为还能运行。office 大类此前有 15 份档案但缺 inventory，导致 tools-coverage 与若干扫描器只覆盖 267/282。

**依据**：
- [Google Developers · Opal FAQ](https://developers.google.com/opal/faq) — 2026-11-25 复核
- [Google Opal · 官方落地页](https://opal.google/) — 2026-11-25 复核

**影响**：
- 是否影响 `confidence`：否（Opal 仍为 partial；未知项未消除）
- 是否影响 `lifecycle`：是（maintenance → archived）
- 是否影响其他条目：是（`changes-2026-q3-q4` 同一事件的状态与迁移说明；office inventory 覆盖范围）

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
