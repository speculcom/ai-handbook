# research 大类收录声明

**主题**：AI 搜索与研究——联网搜索问答、学术检索、AI 笔记/研究工作台。
定义与边界裁决见 [../../categories.md](../../categories.md) §6。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **产品主轴是「检索/研究/笔记」**而非通用闲聊 |
| 2 | 官方说明了检索来源或索引机制（runtime / context 维可答） |
| 3 | 有官方文档可核验八维 |

**形态归属**

决定 `form:` 取值。⚠ 下表第一列不加反引号，audit.mjs 按这个判据检查。

| 形态 | 判据 |
|:--|:--|
| web | 主入口是网页应用（搜索/研究工作台形态） |

**边界情况**：

| 情况 | 处理 |
|---|---|
| ChatGPT 的搜索模式 | 对象本体归 `chat`，不单独立档（一个产品不拆两个档案） |
| 传统搜索引擎（无 AI 主轴） | 归 nav（Brave Search 先例） |
| 纯检索 API 基础设施 | 归 nav（Exa/博查先例——面向开发者不是面向用户的研究产品） |
| 文献管理软件（无 AI 主轴） | 归 nav |
| 开发者向 AI 搜索 | 主轴是搜索问答→收本类（Devv 先例）。主轴是改代码库→归 coding |

## 收录对象（11 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `metaso` | 秘塔 AI 搜索 | 秘塔科技（上海秘塔网络科技） | 网页服务 | 8 项已核 · 活跃 |
| `tiangong` | 天工 AI 搜索 | 昆仑万维 | 网页服务 | 8 项已核 · 活跃 |
| `andi` | Andi Search | Andi | 网页服务 | 8 项已核 · 活跃 |
| `consensus` | Consensus | Consensus | 网页服务 | 8 项已核 · 活跃 |
| `devv` | Devv | Devv AI | 网页服务 | 8 项已核 · 活跃 |
| `elicit` | Elicit | Elicit | 网页服务 | 8 项已核 · 活跃 |
| `genspark` | Genspark | Genspark | 网页服务 | 8 项已核 · 活跃 |
| `kagi` | Kagi | Kagi | 网页服务 | 8 项已核 · 活跃 |
| `notebooklm` | NotebookLM | Google | 网页服务 | 8 项已核 · 活跃 |
| `perplexity` | Perplexity | Perplexity AI | 网页服务 | 8 项已核 · 活跃 |
| `you-com` | You.com | You.com | 网页服务 | 8 项已核 · 活跃 |

> 共 **11** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成。改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
