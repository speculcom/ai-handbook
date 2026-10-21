---
id: context7
track: mcp
tasks: ["read-files"]
name: Context7
vendor: Upstash
homepage: https://github.com/upstash/context7
mark: C7
accent: "#F97316"

axes:
  model_access: >-
    本身不调用模型，是被客户端调用的接口实现。
    为 Agent 提供**版本感知的库与 API 文档**，
    解决模型训练数据滞后导致的使用错误。
  runtime: >-
    **远程托管 HTTP 服务**（`https://mcp.context7.com/mcp`），

    由 Upstash 运营。**这是本分区唯一默认走远程的条目**，
    其余 reference server 均为本地 stdio 进程。

  local_files: >-
    **无任何本地文件访问能力**。纯文档检索服务。

  background: >-
    **作为远程托管服务始终可用**，与客户端进程生命周期无关——
    这是本分区唯一不受本机开关影响的条目。

    但**服务可用性取决于 Upstash 侧的服务状态**，
    本仓库的 releases 不能保证服务端可用性，两者需分开判断。

  tools: >-
    提供 MCP 工具用于检索库文档。

    README 强调正确用法：使用 Library Id、**指定版本**（Specify a Version）、
    以及通过 rule 声明「需要库文档时总是使用 Context7」。
    输出为结构化文档内容。

  context: >-
    无跨会话记忆，但**文档检索本身是"外部记忆"**——
    弥补模型训练数据滞后，这是它的核心定位。

  permissions: >-
    **权限风险与本地 server 完全不同**：
    不碰本地文件，但要**把查询内容发送到 Upstash 服务器**。

    传入 Library Id 与具体问题即产生网络请求。
    认证用 API Key（`Authorization: Bearer YOUR_API_KEY`）。
    无独立审批机制。

  fit: >-
    需要查当前版本库文档的场景：库升级后的 API 变更、
    新版本引入的配置项、模型不确定的第三方库用法。
    不适合查内部代码或私有库。

pitfalls:
  - 以为是纯本地工具，实际查询会发到 Upstash 的远程服务器
  - 不指定版本号会拿到不匹配的文档，README 专门强调Specify a Version
  - 以为开源就等于全部本地，代码 MIT 但核心是托管服务

mcp:
  transport: >-
    **远程 Streamable HTTP**，服务端点为 `https://mcp.context7.com/mcp`。

    **本分区唯一以远程服务为默认形态的条目**——
    其余官方 reference server 均为本地 stdio 进程。

  auth: >-
    **需 API Key**，通过 `Authorization: Bearer YOUR_API_KEY` 头传递。
    README 说明可经 OAuth 流程由安装器自动生成 key。

    **额度档位本轮已核验（2026-10-01，官方 plans 页）**：
    Free **1,000 次/月**（Search API + Context API 合计），

    Pro **2,000 次/席位/月**、超出**不阻塞**（超量单价按 D9 口径不存，见官方 plans 页）。

    另Free 档本身就用 OAuth 2.0（官方对比表把 OAuth 2.0 列为 Free 的能力）。
    ⚠ **Free 超出额度后的确切行为官方页面未给答案正文**，只列了问题标题。

  scope: >-
    **无本地权限风险，但有数据出境风险**：
    查询内容会发送到 Upstash 服务器。
    传入的库名与问题文本属于对外传输内容，
    涉密场景需评估。

    **本轮补一条官方对隐私的明确承诺**（官方 FAQ 标题即
    "How do you keep the privacy of my queries?"）：

    查询只发**文档问题与库名/ID**，
    不发完整 prompt、源代码与对话历史；
    且官方要求agent 不要在查询里带凭据、个人数据或专有代码。

    服务端自身的文档索引范围由 Upstash 掌握，客户端不可见。

tags: [检索, 网络, 远程]
related: [claude-code-cli]

sources:
  - label: Upstash · Context7 README（API Key 与远程端点说明、**「本仓只托管 MCP server 源码，API 后端/解析/爬虫为私有」的自述**）
    url: https://github.com/upstash/context7
    kind: docs

  - label: 官方 Pricing & Plans（核验 2026-10-01：Free 1,000 次每月、Pro 2,000 次每席位每月且超出不阻塞、Private Repo Parsing 是独立计费项、Enterprise Custom 含 SOC-2/SSO/Self-Hosted；报价按 D9 口径不存；**与第三方「Pro 5,000 次」冲突，按官方 2,000**）
    url: https://context7.com/docs/plans-pricing.md
    kind: pricing

  - label: Upstash · Context7 Releases（ctx7@0.5.12）
    url: https://github.com/upstash/context7/releases
    kind: changelog

  - label: Upstash · Context7 Commits
    url: https://github.com/upstash/context7/commits/main
    kind: changelog

  - label: Model Context Protocol · 规范
    url: https://modelcontextprotocol.io/specification
    kind: docs

link:
  url: https://github.com/upstash/context7
  kind: official

last_verified: 2026-10-01
last_updated: 2026-10-01
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

**工具分区里唯一的远程托管条目** —— 为 Agent 提供版本感知的库文档，MIT 开源但核心服务在 Upstash 侧。

## 为什么它和其他条目不一样

| 维度 | 其余 reference server | Context7 |
|---|---|---|
| 运行形态 | 本地进程（stdio） | **远程 HTTP 服务** |
| 数据流向 | 本机内 | **查询发到 Upstash** |
| 认证 | 无（靠进程权限） | **需 API Key** |
| 额度 | 无 | **有**（官方提"更高额度"） |
| 开源许可 | 参考实现，无商业形态 | MIT 代码 + 托管服务 |

**这带来的是完全不同的一类风险**：
其他 server 的风险是「能碰你的什么」，
Context7 的风险是「你的查询会发到哪里去」。

## 变更记录说明

本对象有独立 releases：

| 版本 | 日期 |
|---|---|
| `ctx7@0.5.12` | 2026-09-22 |
| `@upstash/context7-sdk@0.5.0` | 2026-09-22 |
| `@upstash/context7-tools-ai-sdk@1.0.2` | 2026-09-22 |

**一个仓库发多个包**，版本号不同步，引用时要注意包名。

## 正确用法（README 强调的三点）

这是最有操作价值的信息：

| 要点 | 说明 |
|---|---|
| **Use Library Id** | 用库 ID 而非模糊名字查询 |
| **Specify a Version** | **指定版本** —— 不指定会拿到不匹配的文档 |
| **Add a Rule** | 声明规则：需要库文档时总是使用 Context7 |

**「Specify a Version」这一条尤其重要**——
模型训练数据滞后是这类工具要解决的核心问题，
如果不指定版本，很可能拿到的是新版本文档，行为却按老版本写。

## 认证方式与额度：三档，两处容易看错

```
手动配置：使用服务端点 https://mcp.context7.com/mcp
并通过 Authorization: Bearer YOUR_API_KEY 头传递 key
```

安装器支持 OAuth 流程自动生成 key。Free 档本身即支持 **OAuth 2.0**。

**官方原话**：API Key Recommended —— 获取免费 key 以获得更高额度。

### 额度档位（2026-10-01 核验官方 plans 页）

（报价按 D9 口径不存，一律看官方 plans 页；额度是能力边界，照录。）

| 档 | 含额度 | 超出后 |
|---|---|---|
| **Free** | **1,000 次/月** | 阻塞（具体行为官方未明示） |
| **Pro** | **2,000 次 / 席位** | **不阻塞**（超量按用量另计，单价见官方页） |
| **Enterprise** | Custom | Custom |

**两处最容易看错的地方**：

**① Pro 的「Unlimited API Calls」不是「不限量免费」，是「不阻塞」。**
官方对比表把 Pro 的 Additional API Calls 一栏写成
"Unlimited（超量按用量计费）" —— 前半句是不阻塞，后半句意味着超量要另付钱。

**② Private Repo Parsing 是完全独立的计费项。**
它与 API 调用额度是**两个钱包**，Pro 的席位价并不包含它。
要把私有库文档接进来，这笔钱要单独算（单价见官方页）。

### 第三方数字与官方不一致（已按官方为准）

多个第三方站（2026-09 前后）称 Pro 是「**5,000 次/席位**」——
**官方页面是 2,000**。本档案采官方，第三方数字视为旧制或臆测。

### 开源的边界要划清

官方 README 自己说明：**这个仓只托管 MCP server 的源码，
API 后端、解析引擎、爬取引擎都是私有的。**
所以「MIT」指的是那部分客户端代码，不是整个服务。

## 风险评估

| 风险类型 | 评价 |
|---|---|
| 本地文件泄露 | **无** — 不碰本地文件 |
| 内网探测 | **无** — 不访问任意 URL |
| **数据出境** | **有，但范围窄** — 只发**文档问题 + 库名/ID**；不发完整 prompt、源代码、对话历史（官方声明，见下方说明） |
| 凭据风险 | 低 — 只用一个 API Key，无文件权限；官方还要求 agent 不要在查询里带凭据 |
| 服务可用性 | 依赖 Upstash 服务，本仓库无 releases 可保证服务状态 |
| **预算失控** | **有** — Free 超 1,000 次/月后行为不明；Pro 超出不阻塞、按用量另计；私有库解析是独立计费项（单价见官方页） |

**涉密场景要评估的部分**：如果你查的库名、报错信息、代码片段本身敏感，
这些会离开本机。

**但本轮补到一条官方对隐私的明确承诺**（官方 FAQ 设了专题
"How do you keep the privacy of my queries?"）：

查询只发送**文档问题与库名/ID**，
**不发送完整 prompt、源代码与对话历史**；
官方并要求 agent 不要在查询里携带凭据、个人数据或专有代码。

⚠ 这条声明是**官方自述**，本站未实测验证 —— 即没有抓包确认发出去的内容真如所述。

## 适合与不适合

需要查当前版本库文档的场景：库升级后的 API 变更、
新版本引入的配置项、模型不确定的第三方库用法。

**不适合涉密场景**——查询内容会发送到 Upstash 服务器，需先评估数据出境。
也不适合查内部代码或私有库。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：这个 server 的实测重点与其他条目不同——
要测的是**文档准确度**（给定库与版本，返回的文档是否匹配当前 API），
而非能否调用成功。

## 未知项清单

- **Free 档超出 1,000 次/月后的确切行为**（官方页面只列了问题标题，未给答案正文；不做推测）
- Enterprise 档的具体内容（报价按 D9 口径本站不采）
- 文档索引的覆盖范围与更新频率（官方有「Keeping Libraries Fresh」专题，本轮未取正文）
- 服务端 SLA
- 官方隐私声明（只发查询与库名、不发源码与对话历史）**未实测验证**

## 相关条目

- [Playwright MCP Server](./playwright.md) — 同为社区维护，权限设计更透明
- [Fetch MCP Server](./fetch.md) — 同为网络访问方向
