# 数据格式规范（v2 · v8 改版）

> 这份文档定义每个条目**必须怎么写**。构建脚本会按这里的约束校验，不通过就不出站。
>
> **v8（2026-10-21）改了什么**：目录 = 大类（10 个，见 `categories.md`）；
> frontmatter `track:` 改名 `form:` 并扩枚举（8 值）；`tasks:` 字段退役（D2）；
> light 层退役、全部升八维（D3），`license` 字段进八维 frontmatter；
> 新增法律引述纪律（§十一）；`raw/` 全文快照移出公开仓（L1）。
> **过渡状态（T5–T7 迁移批）**：旧 `tracks/{agents,harness,tools}/` 通道暂存存量档案，
> 迁移完成后删除——新旧通道并存期间 validate 双规则路由，见 §一。

---

## 一、文件位置与命名

**v8 目标结构**（T5–T7 迁移完成后唯一结构）：

```
tracks/<category>/
  _category.md          大类收录声明（替代旧 _track.md）
  products/<id>.md      八维档案
```

| 规则 | 说明 |
|---|---|
| `<category>`（**目录名 = 大类**）| 十个之一：`coding` / `chat` / `image` / `video` / `audio` / `research` / `automation` / `framework` / `mcp` / `runner`。定义、收录标准、边界裁决见 [categories.md](./categories.md)。⚠ 这里是**大类**，不是 frontmatter 的 `form`（**形态**）——两级命名见 §2.5.1 |
| `<id>` | 小写字母 + 连字符，全仓库唯一。例：`claude-code`、`sequential-thinking` |

**过渡结构**（T5–T7 期间）：旧 `tracks/{agents,harness,tools}/products/` 仍可被 validate
以旧规则（`track:` 五值枚举）校验；`tracks/<大类>/` 一律走新规则（`form:` 八值枚举、
`track:`/`tasks:` 出现即硬失败）。`tracks/` 下出现两边都不是的一级目录 → 硬失败（防拼错目录名静默漏检）。

---

## 二、完整字段表

### 2.1 标识

| 字段 | 类型 | 必填 | 约束 |
|---|---|:---:|---|
| `id` | string | ✓ | `^[a-z0-9]+(-[a-z0-9]+)*$`，全仓库唯一 |
| `form` | enum | ✓ | **形态**分类（不是大类）：`ide` / `cli` / `cloud` / `harness` / `mcp` / `web` / `app` / `local-app`（v8 改名自 `track:` 并扩后三值，见 §2.5.1） |
| `name` | string | ✓ | 产品官方名；本站为区分同一产品的不同形态而加的中文后缀也写在这里（如「Claude Code IDE 扩展」） |
| `nameEn` | string | | `name` 含中文时的英文名（2026-10-08 起）。英文态渲染 `nameEn`，缺失则回落中文并在英文页露出中文 —— 有中文后缀的条目**必须**填 |
| `vendor` | string | ✓ | 厂商；个人项目填作者或组织名 |
| `homepage` | url | ✓ | 官方主页 |
| `mark` | string | | 1-2 字符标识符，用于 UI 展示（字母标记，**不用第三方 logo**，L8） |
| `accent` | string | | `#rrggbb`，品牌主色，无则省略（自定色，非取色于对方品牌，L8） |
| `license` / `licenseEn` | string | 消费级五类 ✓ | **v8（D3）**：输出物归属与商用许可，逐条挂官方条款。`chat` / `image` / `video` / `audio` / `research` 五类必填（原 S47 创作类规则的八维迁移版）；许可稳定、不是价格，D9 明确保留 |

### 2.2 商业信息（已随 D9 退役）

**没有 `pricing` / `pricing_pitfalls` 字段族（D9 定案，2026-10-20）**：价格与档位报价高频变动、本站不采不存。frontmatter 出现 `pricing` 或 `pricing_pitfalls` → 校验硬失败。

**没有 `tasks:` 字段（v8 D2 定案，2026-10-21）**：任务入口取消，大类页承担「我要做 X」的导航职责。新通道档案出现 `tasks:` → 校验硬失败（旧通道过渡期仍按 S43 对账，T7 后整体删除）。

商业事实的去处：
- **定性口径**（免费 / 开源 / 按量 / 随订阅）与**额度配额事实**（每日轮数、次数上限、席位规则）写在 axes 与正文——它们不随价格变动失效；
- 「多少钱」一律由 `sources` 里 `kind: pricing` 的官方定价页链接承担（label 不写数字）。

### 2.3 八个维度

| 字段 | 必填 | 说明 |
|---|:---:|---|
| `axes.model_access` | ✓ | 见 [axes/model-access.md](./axes/model-access.md) |
| `axes.runtime` | ✓ | 见 [axes/runtime.md](./axes/runtime.md) |
| `axes.local_files` | ✓ | 见 [axes/local-files.md](./axes/local-files.md) |
| `axes.background` | ✓ | 见 [axes/background.md](./axes/background.md) |
| `axes.tools` | ✓ | 见 [axes/tools.md](./axes/tools.md) |
| `axes.context` | ✓ | 见 [axes/context.md](./axes/context.md) |
| `axes.permissions` | ✓ | 见 [axes/permissions.md](./axes/permissions.md) |
| `axes.fit` | ✓ | 见 [axes/fit.md](./axes/fit.md) |

**规则**：8 个字段全部必填。查不到写「未知」+ 原因，不允许省略字段。

**长度**：每个字段 30-300 字。太短说明没查清，太长说明混入了别的东西。

**消费级产品读法（v8 D3）**：八维不是只为编程工具设计的。`axes/*.md` 每维都补了
「消费级产品读法」一节——对话/图像/视频/音频/研究类产品按那一列回答，每维都有实质可答：

| 维度 | 编程工具读法 | 消费级读法 |
|---|---|---|
| model_access | 可选哪些模型/BYOK | 背后模型是否披露、能否选档 |
| runtime | 装在哪跑 | 网页/应用/API；处理在谁的机器 |
| local_files | 读不读你工作区 | 你能上传什么、文件归谁 |
| background | 关机后任务 | 异步任务（生成队列、后台渲染） |
| tools | 能否接 MCP/扩展 | API/插件/生态扩展面 |
| context | 上下文窗口与记忆 | 历史/项目记忆机制与上限 |
| permissions | 权限面 | 账户数据用途、训练开关、商用条款 |
| fit | 适合什么任务 | 适合谁、什么时候别用 |

**假八维防线**：「不适用+理由」合法，但整页 ≥5 维写「不适用」→ validate 警告
（防「一堆不适用」冒充档案）。注意「官方未声明」不算「不适用」——那是查过之后的诚实结论。

**引述纪律（v8 L2）**：axes 引「官方原文」只引事实性陈述，单条引述 ≤100 字符（或一句），
一律带出处链接与核验日；大段条款转述用自己的话概括。见 §十一。

### 2.4 MCP 形态特有维度

仅 `form: mcp` 必填：

| 字段 | 必填 | 说明 |
|---|:---:|---|
| `mcp.transport` | ✓ | 见 [taxonomy/transport.md](./tracks/mcp/taxonomy/transport.md)（迁移后为 `tracks/mcp/taxonomy/`） |
| `mcp.auth` | ✓ | 见 [taxonomy/auth.md](./tracks/mcp/taxonomy/auth.md) |
| `mcp.scope` | ✓ | 见 [tracks/mcp/taxonomy/scope.md](./tracks/mcp/taxonomy/scope.md) |

**非 MCP 形态的条目禁止使用 `mcp` 字段。**
IDE / CLI 工具不是 MCP server，不适用这三个维度。

### 2.4b MCP 支持（非 MCP 形态）

编码/框架/自动化类产品要回答「**这个工具能不能接 MCP**」，
但这是 `axes.tools` 里的一项内容，不是独立字段：

```yaml
axes:
  tools: >-
    内置文件读写与命令执行。
    **支持 MCP（stdio / SSE）**；也可通过扩展机制接入第三方 server。
```

**判定标准**：
- 明确支持并说明传输方式 → 写清楚
- 明确不支持 → 写「不支持 MCP」
- 文档未说明 → 写「MCP 接入方式本次未核验，记为未知」

### 2.5 判断与标签

| 字段 | 类型 | 必填 | 约束 |
|---|---|:---:|---|
| `pitfalls` | string[] | ✓ | 头号误解，1-3 条，每条 ≤60 字 |
| `tags` | string[] | | 能力标签，从赛道标签池取 |
| `related` | string[] | ✓ | **跨分区**条目 id，≥1 条（A6.3 起为硬要求；守卫见下方 2.5.1） |

**`pitfalls` 是本站最有价值的原创字段**，要求：
- 每条是一个**具体的误解**，不是泛泛的提醒
- 反例：`注意性能问题`（太空泛）
- 正例：`以为索引是实时的，大仓库首次打开需等`（具体）
- 正例：`把活动赠送额度当成永久套餐额度`（具体）

#### 2.5.1 两级命名：大类 vs 形态（v8 版，容易混，先读这条）

| 概念 | 取值 | 谁决定 | 用在哪 |
|---|---|---|---|
| **大类**（10 个） | `coding` / `chat` / `image` / `video` / `audio` / `research` / `automation` / `framework` / `mcp` / `runner` | **目录**：`tracks/<大类>/products/` | 站点落点、面包屑、`related` 的「跨大类」判定、license 五类硬失败 |
| **形态**（8 个） | `ide` / `cli` / `cloud` / `harness` / `mcp` / `web` / `app` / `local-app` | frontmatter `form:` | 首页分组、形态标签（`FORM_LABEL`） |

大类回答「它是什么」，形态回答「它以什么形态使用」——两个维度正交：
Cursor 是 `coding` 大类、`ide` 形态；Claude Code 同大类、`cli` 形态；
ChatGPT 是 `chat` 大类、`web`/`app` 形态。

`claude-code.md`（`form: ide`）与 `claude-code-cli.md`（`form: cli`）
是**同一大类内的两个形态** —— 这类对照写在正文 `## 相关条目` 里，不写进 `related`。

> 旧口径（v4–v7）：分区 3 个（agents/harness/tools）× 形态 5 个（track 字段）。
> v8 D1 把分区层换成大类层，`track:` 改名 `form:` 并扩 `web` / `app` / `local-app`。

#### 2.5.2 `related` 与正文「相关条目」的分工

| | 正文 `## 相关条目` | frontmatter `related` |
|---|---|---|
| 谁写 | 人工，逐条写理由 | 只给 id，理由由构建器生成 |
| 格式 | `- [名](./x.md 或 ../../<大类>/products/x.md) — 哪一维不同` | `related: [id, id]` |
| 装什么 | 同大类对照（含同产品不同形态） | **只装跨大类** id |
| 页面呈现 | 理由原样显示 | 「另一类 · <大类名>」 |

三条纪律：
1. **`related` 不表示兼容性**。它回答的是「读完这页，另一类最该看什么」；
   兼容性（这个 agent 能不能装这个 server）由 `axes.tools` 里的 MCP 事实负责。
2. **按目标 id 去重**：正文已链到的对象，`related` 不重复列（构建器自动跳过）。
3. **两边都要真**：正文链接与 `related` 的 id 都会进产物；指向不存在的 id 由
   `sites/build.mjs` 构建期报出，`_audit/link-graph.mjs` 再复核一次。

**守卫**：`node _audit/link-graph.mjs`（`--self-test` 为阴性对照）双口径各要求 100% ——
数据层（`related` 含跨大类 id）与**渲染层**（产物「相关条目」面板里真有跨大类出链）。
只看数据层会漏掉本仓犯过两次的老毛病：字段采集了却从不渲染。

### 2.6 证据

| 字段 | 类型 | 必填 | 约束 |
|---|---|:---:|---|
| `sources` | array | ✓ | 至少 2 条，必须含 `kind: changelog` |
| `sources[].label` | string | ✓ | 显示文本 |
| `sources[].url` | url | ✓ | 官方一手源 |
| `sources[].kind` | enum | ✓ | 见下表 |

`kind` 取值：

| kind | 含义 | 必填条件 |
|---|---|---|
| `changelog` | 官方更新日志 / 版本发布页 | **所有条目必填**；无独立 changelog 页时可用官方 releases 或 commit 历史 |
| `docs` | 官方文档 | **所有条目必填** |
| `pricing` | 官方定价页 | 有商业档位的条目必填（D9：label 只写档位结构与核验日期，**不写价格数字**） |
| `migration` | 迁移 / 退役公告 | 有则填 |
| `engineering` | 厂商工程博客 | 有则填 |
| `repo` | 开源仓库 | 开源项目必填 |

**关于无 changelog 页的对象**：

部分开源项目（尤其 MCP server）没有维护独立 changelog，
变更记录体现在 GitHub releases 或 commit 历史里。

这种情况用 `kind: changelog` 指向 releases / commits 页面，并在正文说明：

```yaml
sources:
  - label: Servers · Releases
    url: https://github.com/modelcontextprotocol/servers/releases
    kind: changelog
  - label: Filesystem 目录变更历史
    url: https://github.com/modelcontextprotocol/servers/commits/main/src/filesystem
    kind: changelog
```

**不要因为没有 changelog 页就不填这个字段**——那会让证据链出现缺口。
用 releases 代替，并在条目正文写明「本对象无独立 changelog 页，变更记录见 releases」。

### 2.7 核验元信息

| 字段 | 类型 | 必填 | 约束 |
|---|---|:---:|---|
| `last_verified` | date | ✓ | `YYYY-MM-DD`，本站核验官方源之日 |
| `last_updated` | date | ✓ | `YYYY-MM-DD`，本站内容更新之日 |
| `lifecycle` | enum | ✓ | `active` / `maintenance` / `archived` / `unknown` |
| `confidence` | enum | ✓ | `verified` / `partial` / `stale` |

**约束**：
- `last_verified` 与 `last_updated` 不能混淆，前者是核验日，后者是更新日
- `confidence: verified` 要求核验日在 90 天内且 8 维度无「未知」
- **`lifecycle: archived` 时 `confidence` 最高只能 `partial`**

#### lifecycle 的判定

这一条容易被忽略，但它比核验日更决定「你的数据还有没有用」。

| 值 | 判定依据 |
|---|---|
| `active` | 上游仓库近 30 天有提交，或官方近 30 天有版本发布 |
| `maintenance` | 上游近 90 天有更新，但节奏明显放缓 |
| `archived` | 上游已归档、停止更新或转移维护方 |
| `unknown` | 无 changelog / 无仓库可判断 |

**为什么要单列这一条**：

一个对象即使你今天核验过（`last_verified` 很新），
如果它上游已经半年没更新，那条数据**明天就会失效**。

实测例子：某开源工具的仓库最后推送是 4 个月前，
说明维护状态存疑。这种信息必须显式记录，不能只靠 `last_verified` 掩盖。

#### confidence 与 lifecycle 的组合

| lifecycle | confidence 上限 | 说明 |
|---|---|---|
| `active` | `verified` | 正常情况 |
| `maintenance` | `verified` | 仍可用，但要在正文提示节奏放缓 |
| `archived` | `partial` | 必须同时写明归档事实与归档时间 |
| `unknown` | `partial` | 无法判断上游状态 |

**校验器会强制这条**：正文声明了「已归档」而 `confidence: verified` 的条目会报错。

### 2.8 链接

| 字段 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `link.url` | url | | 注册 / 下载入口 |
| `link.kind` | enum | | `official` / `invitation` |
| `link.incentive` | string | | 仅 `invitation` 时填，写明奖励 |

---

## 三、正文结构

frontmatter 之后的 Markdown 正文。

### 必备小节（顺序固定）

```markdown
## 一句话定位

一句话说清这东西是什么、跟同类比有什么不同。

## 适合与不适合

一到三句。具体到任务类型，不写"日常开发"这种空话。
**内容来自 frontmatter 的 `axes.fit`**，用读者能懂的话重述，
不要复制粘贴原文。

## 实测记录

列出本站已完成的实测批次与结论（无实测时写「本站尚未完成实测」）。

## 未知项清单

列出所有标为「未知」的内容。没有就写「无」。

## 相关条目

- [条目名](../products/xxx.md) — 一句话关系说明
```

**注意**：`pitfalls`（头号误解）在 frontmatter 里，不在正文重复。
它是数据字段，会被结构化消费；正文用「适合与不适合」承载判断。

### 可选小节

按内容需要添加，顺序不限：

| 小节 | 何时用 |
|---|---|
| `## 变更记录说明` | 有 releases / commit 历史时 |
| `## 工具清单` | 工具数量多，值得列表 |
| `## 权限设计` | 权限机制值得展开 |
| `## 与 X 的对比` | 与同赛道对象有显著差异时 |
| `## 能力边界` | 明确不支持什么时 |
| `## 部署建议` | 有环境前提要求时 |

### 禁止

- 正文里出现 frontmatter 已有的完整数据副本（会造成两处不一致）
- **省略必备小节**（构建时校验）
- 正文与 frontmatter 结论矛盾
- **在正文里使用 `---` 作章节分隔线** ——
  它与 frontmatter 的结束标记同形，会让解析器误判正文起点。
  需要视觉分隔时用 `**加粗小标题**` 或直接空行。

---

## 四、完整示例

> ⚠ **下面是虚构示例**，用于说明格式，**不是真实数据**。
> 请勿复制其中的产品名、价格或特性。
> 真实条目见 `tracks/*/products/`。

```markdown
---
id: example-tool
form: ide
name: Example Tool
vendor: Example Org
homepage: https://example.com
mark: E
accent: "#111111"

axes:
  model_access: >-
    支持第三方模型，可自定义模型路由；具体可用模型随订阅档位变化。
    统一默认模型与全套餐映射本次未核验，记为未知。
  runtime: >-
    本地 IDE 为主，代码索引在本机；
    远程控制本地电脑不等于云端执行。
  local_files: >-
    可读写工作区文件；未打开的大文件依赖索引策略，
    首次索引大仓库需等待。
  background: >-
    有后台任务入口；关机续跑的完整适用范围未知。
  tools: >-
    MCP · LSP · 自定义指令 · Hooks。
  context: >-
    跨文件索引 + 会话恢复；跨项目记忆的具体边界未知。
  permissions: >-
    沙箱与审批边界跟随运行环境；遥测可关闭。
  fit: >-
    已有仓库开发、改错、重构与工程交付。

pitfalls:
  - 把「最高档模型」当成任何任务的默认选择
  - 以为索引是实时的，大仓库首次打开需等

tags: [编程, 本地, 多模型]

sources:
  - label: Example Tool · Changelog
    url: https://example.com/changelog
    kind: changelog
  - label: Example Tool · Docs
    url: https://example.com/docs
    kind: docs
  - label: Example Tool · Pricing
    url: https://example.com/pricing
    kind: pricing

link:
  url: https://example.com
  kind: official

last_verified: 2026-09-28
last_updated: 2026-09-21
lifecycle: active
confidence: verified
---

## 一句话定位

从编辑器到 Agent 的一体化开发环境。

## 适合与不适合

已有仓库开发、改错、重构、测试与工程交付。纯问答场景性价比低。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

## 未知项清单

- 统一默认模型与全套餐模型映射
- 关机续跑的完整适用范围
- 跨项目记忆的具体边界
- 年付总额

## 相关条目

- [其他条目](../products/other-tool.md) — 一句话关系说明
```

---


## 五、构建校验规则

构建脚本按以下顺序校验，**任一失败即中止构建**：

| # | 规则 | 失败级别 |
|:--:|---|---|
| 1 | 文件名 == `id` | 硬失败 |
| 2 | `id` 全仓库唯一 | 硬失败 |
| 3 | 必填字段齐全 | 硬失败（报文件路径 + 缺失字段） |
| 4 | `id` 格式合法 | 硬失败 |
| 5 | `form` 在枚举内（新通道）/ `track` 在旧枚举内（旧通道过渡期） | 硬失败 |
| 6 | 8 维度字段齐全且非空 | 硬失败 |
| 7 | `pitfalls` ≥1 条 | 硬失败 |
| 8 | `sources` ≥2 条且含 `changelog` | 硬失败 |
| 9 | 日期格式 `YYYY-MM-DD` | 硬失败 |
| 10 | `confidence` 在枚举内 | 硬失败 |
| 11 | 出现已退役的 `pricing` / `pricing_pitfalls` 字段（D9 反向守卫） | 硬失败 |
| 12 | `link.kind == invitation` 时 `incentive` 非空 | 硬失败 |
| 13 | `confidence == verified` 时无「未知」字样 | 硬失败 |
| 14 | `lifecycle` 在枚举内 | 硬失败 |
| 15 | `lifecycle` 为 `archived`/`unknown` 时 `confidence` ≠ `verified` | 硬失败 |
| 16 | 正文声明「已归档」而 `confidence == verified` | 硬失败 |
| 17 | 同 id 工具在三站的 `last_verified` 差异 >30 天 | **警告** |
| 18 | `last_verified` 距今 >90 天 | **警告**，降级为 `partial` |
| 19 | **v8**：新通道出现 `track:` / `tasks:` 字段（改名/退役反向守卫） | 硬失败 |
| 20 | **v8**：`tracks/` 下未知一级目录（既非旧分区也非大类） | 硬失败 |
| 21 | **v8**：大类目录存在但缺 `_category.md` 收录声明 | 硬失败 |
| 22 | **v8**：消费级五类（chat/image/video/audio/research）缺 `license` | 硬失败 |
| 23 | **v8**：整页 ≥5 维写「不适用」（假八维线；「官方未声明」不计） | **警告** |

**为什么大部分是硬失败**：数据有缺口就不该出站。宁可少几个工具，也不发半成品页面。

---

## 六、标签池

标签从固定池取，避免同义标签分裂。

### 通用

```
编程 · 办公 · 研究 · 本地 · 云端 · 混合 · 协作 · 开源 · 商业
```

### IDE / CLI

```
多模型 · 单模型 · IDE · 终端 · VSCode · 独立客户端 · 补全 · 全流程
类型安全 · 大仓库 · 重构 · CI · 自动化 · 中文
```

### 厂商云形态（v4 新增：OpenAI Dot / Meta Muse / xAI Grok Bot）

这三个装在厂商云上、本机不装任何东西，是与 IDE/CLI 并列的第三种形态。
原有池没有能描述它们的标签 —— 硬塞进「云端」会丢掉「常驻后台」「按次审批」这些关键差异。

```
编码agent · 厂商云 · 常驻 · 审批 · 记忆 · 支付 · 订阅制 · 免费档 · 岗位化 · 并行 · beta
```

### Harness

harness 赛道（自己搭的底座：编排框架 / Agent 运行时 / SDK）的维度**与前三个池都不同**：
前三个池描述「装在哪、连什么模型、权限多大」，而 harness 的选型第一问是
**「状态怎么存、能不能中途插手、抽象到哪一层」** —— 所以另立一池，
不把 `编排框架` / `checkpoint` / `HITL` 这些硬塞进 IDE/CLI 池（塞进去会让池失去区分力）。

**抽象层**（选型第一问：原语 / 编排 / 开箱）
```
编程底座 · 编排框架 · 平台型 · 通用harness
```

**语言与许可**
```
Python · TypeScript · Rust · MIT · Apache-2.0 · 开源 · 商业平台
```

**状态与持久化**（harness 的核心分野）
```
持久化 · checkpoint · superstep · durable-execution · interrupts · 长期记忆 · 状态管理
```

**人工介入**
```
HITL · human-in-the-loop · 工具确认 · 审批模式 · 权限审批 · 权限链
```

**执行形态**

```
子代理 · 多Agent · 角色分工 · 长任务 · 非交互执行 · 沙箱 · sandbox · guardrails · hooks
图执行 · 工作流 · 事件驱动 · Flow · Crew · A2A · ACP · 定时任务 · 常驻
通用助手 · 通用harness
```

⚠ **池内的行不能带「编排能力：」这类文字前缀** —— `audit.mjs` 按 `·` 切分整行，
前缀会被算进第一个标签里（`编排能力：图执行`），于是标签永远匹配不上。
需要分组就在代码块外面另起一行做小标题。

**生态与依赖**
```
LangChain · MCP · Ollama · 本地模型 · 检索 · RAG · 数据接入 · 文档解析 · 集成生态
```

**形态与平台**
```
自托管 · 多后端 · WebUI · 跨平台消息 · RPC · webhook · 技能系统 · 调度层 · 上下文压缩
```

**特色标记**
```
CLI包装 · 仅Claude · 商业平台 · 战略转移 · eval · CloudRun · 开源
```

⚠ 收录时的取舍：**许可证（MIT / Apache-2.0）当作标签是有争议的**，
它描述的是项目元数据而非选型维度。保留是因为 harness 赛道选型时
「许可能否商用」确实是硬门槛，且平台页需要按它过滤 —— 但它不该被当成能力标签使用。

### MCP

```
文件 · 版本控制 · API · 数据库 · 浏览器 · 检索 · 记忆 · 推理 · 网络
只读 · 读写 · 远程 · 本地 · 多平台
```

**禁止**：新建池外标签。需要新标签时在 PR 里说明理由。

---

## 七、交叉引用规则

同一个产品的多种形态现在**同属一个大类**（v8 起 `ide` / `cli` / `cloud` 三形态都落在
`coding` 大类，用 frontmatter `form:` 区分形态 —— 见 §2.5.1）。但 **`id` 仍必须全仓库唯一**。

**约定**：

| 规则 | 说明 |
|---|---|
| **id 必须跨大类唯一** | 文件名不同，`id` 也不同；重复由 `sites/build.mjs` 构建期硬失败 |
| **命名加形态后缀** | `claude-code-cli` / `aider-cli` 等；同大类内的形态差异靠后缀，不靠目录 |
| **`name` 可相同或加形态说明** | 如「Claude Code CLI」/「Claude Code 扩展」 |
| **`related` 指向另一大类** | 10 大类中除自己所在类之外者，见 §2.5.2 |
| **共享数据不许复制** | 构建时若两个条目的 `vendor` 或底层仓库不一致会报错 |

### 实例

同一产品的两种形态（都在 `coding` 大类）：

```
tracks/coding/products/claude-code-cli.md   id: claude-code-cli   form: cli
tracks/coding/products/claude-code.md       id: claude-code       form: ide
```

跨大类互链写进 `related`（这里指向 `framework` 大类它自己的官方 SDK）：

```
tracks/coding/products/claude-code-cli.md
  id: claude-code-cli
  form: cli
  related: [claude-agent-sdk]      # framework 大类
```

**为什么 id 必须不同**：构建脚本把 `id` 当全局主键。
两个条目同 id 会导致：
- 跨大类引用指向错误对象
- 大类渲染时数据串位
- 贡献者 PR 冲突

**校验器会强制这条**：id 重复直接硬失败（`scripts/validate.mjs` + `sites/build.mjs` 双重）。

### 路径写法（A6.3 立 · v8 T8 换轨）

正文里引用另一个大类的档案，路径用**当前目录名**：

```
../../framework/products/codex-sdk.md      ✅
../../coding/products/aider.md             ✅
../../mcp/products/filesystem.md           ✅
../../harness/products/codex-sdk.md        ❌ 旧分区名，仓里没有这个路径
../../agents/products/aider.md             ❌ 同上
```

`rewriteInternal()`（`sites/build.mjs`）同时认旧名（`agents` / `harness` / `tools` / `ide` / `cli`）
以便存量正文仍可构建，但**新写一律用当前目录名** —— 旧名在站点上能跳、在内容仓里是死链，
两个方向都不对。

### 可复用的数据怎么写

**不要复制粘贴**。两种正确做法：

**做法 A · 引用 + 简述**
```yaml
runtime: >-
  本地进程，在终端运行（详见 [CLI 条目](../../coding/products/codex-cli.md)）。
  **本条目只记录 IDE 形态的差异点**：装进 VS Code / Cursor / Windsurf。
```

**做法 B · 只写差异**
```yaml
runtime: >-
  **IDE 形态是扩展，不是独立编辑器。**
  官方 README 列出的宿主：VS Code / Cursor / Windsurf。
```

**判断标准**：如果两形态的某个维度答案相同，一句话带过；
如果不同，只写不同的那个。

---

## 八、常见错误

| 错误 | 后果 | 正确做法 |
|---|---|---|
| `last_verified` 写成官方发布日 | 时间语义混乱 | 核验日与发布日分开 |
| 在 frontmatter 或 label 里写价格数字 | D9 定案：价格高频变动，采了养不起 | 只放官方定价页链接（kind: pricing） |
| 给 8 维度加第 9 个 | 破坏坐标系可比性 | 加进正文，不进 axes |
| `sources` 只给 1 条 | 无法交叉核验 | 至少 changelog + docs |
| 在正文里复制 frontmatter 数据 | 两处不一致 | 正文只写叙述 |
| 用"可能""也许"堆砌 | 等于没说 | 要么查清，要么写未知 |
| `pitfalls` 写成产品优点 | 栏目失去意义 | 只写误解 |

---

## 九、轻档案（`light/light.json` · v7 S45 · **v8 D3 已退役**）

> **v8（2026-10-21 用户定案 D3）：轻档案层退役，全部升八维。**
> 本节保留作迁移对照：`light/light.json` 的 14 条数据在 T6 迁入大类目录八维档案
> （chat/image/video/audio 各归其类），字段去处：`what`→fit、`data`→local_files+permissions、
> `who`→fit 的「适合谁」、`license/licenseEn`→八维 frontmatter `license`（消费级五类必填）、
> `pricing_url` 机制照旧。迁移完成后 `light/` 目录与本节一并删除。
> 假八维的缓解靠 §2.3 的「消费级读法」+ 规则 23 警告线，不靠降级分层。

（以下为 v7 历史口径，T6 前仍被 validate 旧通道消费）

对话问答类（ChatGPT 等）与创作工具类（Midjourney 等）**不走八维档案**——
八维是为「能接任务、能装、能连数据」的产品设计的坐标系，对话产品没有
「安装形态 / 工具清单」这些维度，硬套会产出一堆「不适用」。D4 定案改用
**三要素卡**（D9 修订：价格高频变动、本站不采不存，「多少钱」一律指向官方定价页），数据放 `light/light.json`（真相源，JSON 不是 md）。

### 9.1 字段表

| 字段 | 类型 | 必填 | 约束 |
|---|---|:---:|---|
| `id` | string | ✓ | 与档案 id 同一规则（小写 + 连字符），全仓唯一（含与档案 id 不撞） |
| `kind` | enum | ✓ | `chat`（对话问答）/ `creation`（创作工具）—— 决定落哪个区 |
| `name` / `nameEn` | string | ✓ / | 同档案规则 |
| `vendor` | string | ✓ | 同档案规则 |
| `homepage` | url | ✓ | 官方主页 |
| `what` / `whatEn` | string | ✓ / | 要素①「能做什么」：一到两句 |
| `data` / `dataEn` | string | ✓ / | 要素②「数据去哪」：训练用途 / 留存 / 出境，**每条挂官方出处** |
| `who` / `whoEn` | string | ✓ / | 要素③「适合谁」：给判断依据，不做排名 |

**没有 `cost` 字段（D9 定案）**：价格与档位报价不进数据层。可选 `pricing_url`（http(s) URL）——卡片渲染时「多少钱」一行只放这个链接（缺省回落 `homepage`），本站不写数字。出现 `cost` / `costEn` → 校验硬失败。
| `pricing_url` | url | | 可选：官方定价页指针（D9：只许 URL，不许文字报价） |
| `license` / `licenseEn` | string | 创作类 ✓ | **S47 商用许可主打列**（仅 `kind: creation` 必填）：输出物归属与商用许可，**逐条抄官方条款**（许可稳定、不是价格，D9 明确保留）。对话类不填（对话类没有「输出物商用」这回事） |
| `sources` | array | ✓ | ≥1 条官方 URL（R5：禁二手博客） |
| `last_verified` | date | ✓ | 核验快照语义同档案 |
| `confidence` | enum | ✓ | 同档案枚举 `verified / partial / stale` |

### 9.2 校验（`scripts/validate.mjs` 扩类）

- 三要素（what/data/who）任一为空 → 硬失败（缺一个要素就不是轻档案）；出现 `cost` 字段 → 硬失败（D9：价格字段已退役）；
- `kind: creation` 而 `license` 为空 → 硬失败（S47：商用许可是创作区的主打列，不许缺）；
- `sources` 为空或 `last_verified` 缺失 → 硬失败；
- `kind` 不在枚举 → 硬失败；id 与档案撞 → 硬失败；
- 英文字段缺失 → 警告（R2 要求补齐，同 nameEn 口径）。

### 9.3 渲染

- 版式走 brand.css 的 `.t-lightcard`（宪章 1，共享层定义一次）；
- 落点：AI 工具站「对话问答」区与「陪你创作」区（S46 / S47 填入条目后渲染）；
- 卡片上必须可见「这是轻档案，不上八维」的标注（防读者拿它和八维档案比）。

## 十、深水指南（`guides/*.md` · v7 S48 · 2026-10-20）

「Agent 工程深水区」是方法论内容，不是产品档案——它不描述某个产品，
而是讲清一类工程问题（编排 / 记忆 / 规划 / 评测 / 成本 / 护栏）。
放 `guides/`（与 `light/` 平行、**不在 `tracks/` 下**——validate 与 build 的
档案扫描都只认 `tracks/**/products/`，guides 混进 tracks 会被当八维档案误检）。

### 10.1 frontmatter 字段表

| 字段 | 类型 | 必填 | 约束 |
|---|---|:---:|---|
| `id` | string | ✓ | 同档案规则（小写 + 连字符）；文件名 = id；不与档案/轻档案 id 撞 |
| `topic` | enum | ✓ | `orchestration / memory / planning / evaluation / cost / guardrails`（六主题枚举） |
| `title` / `titleEn` | string | ✓ / | 中文标题（plain-language：≤ 20 字、说清讲什么） |
| `summary` / `summaryEn` | string | ✓ / | 一句话定位（plain-language 开场判据适用） |
| `sources` | array | ✓ | ≥1 条官方 URL（R5：禁二手博客；label 如实标注取法） |
| `last_verified` | date | ✓ | 核验快照语义同档案 |
| `confidence` | enum | ✓ | 同档案枚举 `verified / partial / stale` |

### 10.2 正文纪律

- 正文是**方法论**：讲机制、讲取舍、讲失败模式——不写「推荐用哪个框架」的排名（本站不排名宪章）；
- 每个关键事实句挂出处（正文内联官方 URL 或文末「出处」清单）；官方没写的就写「官方未说明」；
- **D9 适用**：成本主题只讲机制（缓存命中、步数上限、上下文膨胀），不采不存价格数字；
- 与八维档案互链：正文引用具体产品时链到该产品的档案页（档案是事实源，guide 是视角）；
- plain-language 门禁适用（句 P90 ≤ 40、开场判据、列表项 ≤ 80 字）。

### 10.3 校验（`scripts/validate.mjs` 扩类）

- guides 目录缺失 → 警告（允许先建格式后灌内容）；
- frontmatter 缺 `id / topic / title / summary` 任一 → 硬失败；`topic` 越枚举 → 硬失败；
- `sources` 空 / `last_verified` 缺 / `confidence` 越枚举 → 硬失败（与轻档案同口径）；
- 文件名 ≠ id → 硬失败；id 与档案或轻档案撞 → 硬失败；
- 英文槽位（titleEn / summaryEn）缺 → 警告（R2）。

### 10.4 渲染

- 落点：AI 工具站 tools 分区「深水指南」区（guideSection 之后的独立区）；
- 版式走 brand.css 共享类（宪章 1：新组件先落共享层一次）；
- guides 为空时整区不渲染（不造空壳）。

---

## 十一、法律引述纪律（v8 新增硬条款，L1–L8）

> 总原则：本站是**评论与索引，不是产品方**；自有内容 CC BY 4.0；对第三方只作
> 事实转述 + 简短引述 + 出处链接。计划全文见 `_plan/v8-工具站分类重整-计划.md` §3。

| # | 条款 | 在数据层的落点 |
|---|---|---|
| **L1** | **不公开托管第三方网页全文**。本仓是公开仓——官网全文快照（旧 `raw/web-*.txt`）一律不许进仓。核验证据只存**短摘录（单条 ≤100 字符）+ URL + 核验日**。存量快照已于 T4 移出（`_archive/v8-evidence/`，本地留存不推送） | 仓内出现 `raw/web-*` 类文件 = 违规；T34 复查 |
| **L2** | **引述长度纪律**：axes 引官方原文只引事实性陈述，单条 ≤100 字符（或一句），带出处与核验日；大段条款转述用自己的话 | 规则 23 之外由 `_content-audit` 超长引述启发式扫描（T34） |
| **L3** | **商标声明**：README（中英）+ 页脚固定一句「产品名与商标归各权利方所有，本站仅作识别与评论之用」 | T8 落 README |
| **L4** | **负面判断挂源**：fit/permissions/pitfalls 的每个负面事实挂出处；挂不了源的观点显式标「本站观点」；「官方未声明」≠「官方不允许」——措辞不许越过证据 | R5 既有纪律，v8 升级为逐条核对 |
| **L5** | **国产产品口径**：备案/登记只转述官方来源（cn 块机制）；内容合规只转述官方条款，不评价监管本身 | cn 块（S52）已承载 |
| **L6** | **停运产品**：不收 + inventory 附官方停运公告链接 | inventory 去向枚举「不收+理由」 |
| **L7** | **D9 重申**：定性口径与额度事实可写，具体价格数字一律不采 | §2.2 不变 |
| **L8** | **不引入第三方图形资产**：不下载 logo、不截图官网进仓；mark 用字母、accent 用自定色 | 既有红线 |
