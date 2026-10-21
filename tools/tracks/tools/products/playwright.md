---
id: playwright
track: mcp
tasks: ["web"]
name: Playwright MCP Server
vendor: Microsoft
homepage: https://github.com/microsoft/playwright-mcp
mark: P
accent: "#2D9CDB"

axes:
  model_access: >-
    本身不调用模型，是被客户端调用的接口实现。
    **用 Playwright 的无障碍树（accessibility tree）而非像素输入**，
    因此不需要视觉模型，输出为结构化快照。

  runtime: >-
    本地 Node.js 进程（需 Node.js 18+），通过 stdio 通信。
    它也提供 HTTP endpoint 模式。另有浏览器扩展模式（Edge / Chrome）。
    默认有头模式，可用 --headless 切换。

  local_files: >-
    **无本地文件访问能力**。核心能力是浏览器控制。
    用户 profile 默认落盘在 Playwright 缓存目录（按 workspace hash 隔离），
    用 --isolated 可改为仅存内存。

  background: >-
    浏览器进程可保持常驻。--idle-timeout 控制空闲关闭：
    **headless 默认 1 小时关闭，headed 模式默认永不关闭**；
    下次工具调用会重新拉起浏览器。

  tools: >-
    它提供完整的浏览器自动化工具集。**本站已按官方 README 逐条核对，共 72 个工具**
    （2026-10-08）：

    - 导航与标签页
    - 点击 / 拖放 / 悬停
    - 表单与键盘输入
    - 无障碍树快照（snapshot）
    - 截图与 PDF
    - 网络请求与路由（route / unroute）
    - Cookie 与 localStorage / sessionStorage 读写
    - 文件上传
    - 对话框处理
    - 视频录制与 tracing（start / stop）、以及 verify_* 断言组等

    输出以无障碍树结构为主，是结构化数据，可直接消费。

  context: >-
    **保持浏览器上下文是本 server 的核心价值**——
    README 明确指出 MCP 形态适合需要持久状态、
    丰富内省与迭代推理的 agentic loop，
    例如探索性自动化、自愈测试、长时自主工作流。

  permissions: >-
    **需要给浏览器授予权限，且官方明确说明限制手段不是安全边界。**

    --grant-permissions 可授予 geolocation、clipboard-read、clipboard-write 等权限。

    **--allowed-origins 与 --blocked-origins 的文档原文明确写着**：
    「does not serve as a security boundary」且不影响重定向。
    默认允许所有来源。

  fit: >-
    需要浏览器自动化且要保持会话状态的场景：
    探索性自动化、自愈测试、长时自主工作流。

    **不适合高吞吐编码 agent**——README 自己建议这类场景改用
    Playwright CLI + SKILLS，因为 token 效率更高。

pitfalls:
  - 以为 allowed-origins 能当访问白名单，官方明说不构成安全边界且不防重定向
  - 以为无头模式会常驻，实际 headless 默认 1 小时空闲即关，headed 默认永不关
  - 在高吞吐编码场景硬上 MCP，官方自己建议改用 CLI + SKILLS

mcp:
  transport: >-
    支持 **stdio**，另提供 **HTTP endpoint** 模式（--endpoint）
    与浏览器扩展连接模式（--extension，需装 Playwright 扩展，仅 Edge / Chrome）。

    --shared-browser-context 用于共享浏览器上下文。
    多个 HTTP 客户端可共用同一上下文。

  auth: >-
    stdio 形态无独立认证层，继承客户端用户权限。

    **HTTP 模式（2026-10-08 核验官方 README）**：选项表没有 token / auth
    相关参数。Docker 示例直接以 `--host 0.0.0.0` 裸监听。官方明确声明

    “Playwright MCP is **not** a security boundary”，要求按 MCP 安全最佳
    实践自行加固（反向代理 / 网络层）。**认证要自己加，别默认它有。**

  scope: >-
    **控制的是浏览器而非文件**，但风险面同样宽：
    默认允许访问所有来源（--allowed-origins 默认放行全部），
    且可被授予地理位置、剪贴板读写等浏览器权限。

    官方**明确声明来源限制不是安全边界**，
    需要真正隔离时应使用 --isolated 或容器化网络策略。

tags: [浏览器, 网络, 本地, 只读]
related: [openai-dot]

sources:
  - label: Microsoft · Playwright MCP README（含来源限制免责声明）
    url: https://github.com/microsoft/playwright-mcp
    kind: docs

  - label: Microsoft · Playwright MCP Releases（v0.0.83 / v0.0.82 / v0.0.81）
    url: https://github.com/microsoft/playwright-mcp/releases
    kind: changelog

  - label: Microsoft · Playwright MCP Commits
    url: https://github.com/microsoft/playwright-mcp/commits/main
    kind: changelog

  - label: Model Context Protocol · 规范
    url: https://modelcontextprotocol.io/specification
    kind: docs

link:
  url: https://github.com/microsoft/playwright-mcp
  kind: official

last_verified: 2026-10-08
last_updated: 2026-10-08
lifecycle: active
confidence: verified
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

微软维护的浏览器自动化 server。**它用无障碍树而非截图驱动**，不需要视觉模型。输出是结构化快照。

## 适合与不适合

需要浏览器自动化**且要保持会话状态**的场景：
探索性自动化、自愈测试、长时自主工作流。

**不适合高吞吐编码 agent**——README 自己建议这类场景改用
Playwright CLI + SKILLS，因为 MCP 形态要加载大工具 schema 和无障碍树，
token 效率更低。

也不适合需要真正网络隔离的场景：官方明确声明来源限制不构成安全边界。

## 变更记录说明

本对象有独立 releases，可直接引用：

| 版本 | 日期 |
|---|---|
| v0.0.83 | 2026-09-28 |
| v0.0.82 | 2026-09-18 |
| v0.0.81 | 2026-09-14 |

**版本号仍在 0.0.x**，说明接口可能还会变。引用具体工具名时要注意。

## 核心设计：用无障碍树，不用像素

```
Fast and lightweight — Uses Playwright's accessibility tree, not pixel-based input.
LLM-friendly — No vision models needed, operates purely on structured data.
Deterministic tool application — Avoids ambiguity common with screenshot-based approaches.
```

**这三点是这个 server 与其他浏览器自动化方案的根本差异**：

| 方式 | 代价 | 确定性 |
|---|---|---|
| 截图 + 视觉模型 | token 消耗大，需要视觉能力 | 低（模型可能看错） |
| **无障碍树** | token 可控 | **高**（结构化数据） |

## ⚠ 官方对来源限制的自我限制（原文）

`--allowed-origins` 与 `--blocked-origins` 的文档里写着：

> Important: **does not serve as a security boundary** and **does not affect redirects**.

**翻译**：重要——**不构成安全边界**，且**不影响重定向**。

这意味着：

- 配了 allowed-origins，**重定向仍可绕过**
- 它是「减少意外」的工具，**不是「阻止访问」的机制**

**官方主动写出这句话，比我们自己推断更有价值。**
这正是本站想做的：把官方自己承认的边界记录下来。

## MCP 还是 CLI？官方给了明确建议

这是 README 里少见的、直接给出选型建议的一段：

| 形态 | 官方判断 | 理由 |
|---|---|---|
| **Playwright CLI + SKILLS** | **更适合高吞吐编码 agent** | CLI 调用 token 效率更高，不用加载大工具 schema 和冗长无障碍树 |
| **MCP** | 适合特定 agentic loop | 需要持久状态、丰富内省、对页面结构做迭代推理时 |

具体场景：探索性自动化、自愈测试、长时自主工作流。

**换句话说**：如果你是编码 agent 且要频繁操作浏览器，官方建议你**别用 MCP**。

## 配置项与安全相关性

| 参数 | 默认 | 安全影响 |
|---|---|---|
| `--allowed-origins` | **放行全部** | 官方声明不构成安全边界 |
| `--blocked-origins` | 未设置 | 黑名单在白名单前评估；单独使用时未匹配仍放行 |
| `--grant-permissions` | 无 | 可授予 geolocation / clipboard-read / clipboard-write |
| `--isolated` | 关 | 开启后 profile 仅存内存，不落盘 |
| `--headless` | 关（有头） | 影响 idle-timeout 行为 |

**`--isolated` 是这里最值得注意的安全选项**。它让浏览器 profile 不落盘。
它适合处理敏感登录态的场景。

## 浏览器生命周期

```
--idle-timeout：空闲多少毫秒后关闭浏览器，下次工具调用会重新拉起。
  headless 默认 1 小时
  headed    默认永不关闭
  0         禁用该行为
```

**这个默认值差异很重要**。headless 会自动关（省资源）。headed 常驻（保持登录态）。
如果你依赖登录状态，headed 模式反而更省事。

## 能力边界

- ✅ 浏览器自动化、无障碍树快照、结构化输出
- ✅ stdio / HTTP endpoint / 扩展三种连接方式
- ❌ **不提供文件访问**
- ⚠ 来源限制**不构成安全边界**

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：重点测 token 消耗——同一任务下 MCP 形态 vs 截图形态的
上下文占用差异，这是官方选型建议的核心依据，值得量化。

## 未知项清单

- 多客户端共用上下文（`--shared-browser-context`）时的状态隔离程度
- 重定向绕过来源限制的具体表现

## 相关条目

- [Fetch MCP Server](./fetch.md) — 同为网络访问方向，官方同样明确标注了安全警告
- [Everything MCP Server](./everything.md) — 测试用 server，不适合生产
