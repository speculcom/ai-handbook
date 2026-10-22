# AI 工具（ai-handbook / tools）

> English version: [README.en.md](./README.en.md)

**AI 工具图谱** · 纯 Markdown · 开源

记录 **AI 工具**（编码 agent、对话助手、图像/视频/音频创作、agent 框架、MCP 工具……）
的能力边界、运行位置与官方证据，用一套固定坐标系组织，让选型变成可回溯的判断而不是感觉。

这个仓库**只存数据，不出结论页面**。结论层由 tools.specul.com 站点消费（v8 · 2026-10-21 起
内容按 **10 大类**重排，旧三分区 agents / harness / tools 已退役）：

| 大类 | 主题 |
|---|---|
| `coding` | AI 编程——装在编辑器 / 终端 / 厂商云上，面向代码库自主干活的编码 agent |
| `chat` | AI 对话助手——通用聊天产品，含国产 |
| `image` · `video` · `audio` | AI 创作——图像、视频、音频与语音 |
| `research` · `automation` | AI 搜索与研究、自动化与工作流 |
| `framework` | Agent 框架与运行时——你拿来自己搭 agent 的底座 |
| `mcp` | 给 AI 装的工具——MCP 服务器 |
| `runner` | 本地模型运行器 |

**为什么叫 atlas**：不是给你一堆工具名，是给你一张能给 171 个对象定位的地图。

**三族分组**（首页卡片分组，不是目录层）：找现成的（coding / chat / image / video / audio /
research / automation）· 自己搭（framework / runner）· 接上与跑起来（mcp）。三族坐标系不同，不做横向排名。

大类定义与边界裁决见 [categories.md](./categories.md)。

---

## 这不是又一份 awesome list

同类项目通常是一串链接。本仓库走的是另一条路：

| 常见做法 | 本仓库 |
|---|---|
| 按 star / 流行度排序 | **不给总分排名** |
| 抄官网宣传语 | 只记官方源可核验的能力边界 |
| 没查到就留空 | **「未知」是合法答案**，并说明为什么 |
| 一份名单 | **固定 8 维度 × 171 个对象**，可横向对比 |
| 链接失效无人知 | 每条判断挂官方源，附核验日期 |

**核验快照，不冒充实时实测。**

---

## 我该怎么读

这个仓有 171 份档案，但大多数人不需要全看。按你手里那个具体问题走：

| 你要解决什么 | 走哪条路 |
|---|---|
| 「我该用哪个编码 agent」 | [`tracks/coding/`](./tracks/coding/)，先分清 IDE / CLI / 厂商云三种形态 |
| 「我想找个对话助手 / 创作工具」 | [`tracks/chat/`](./tracks/chat/) · [`tracks/image/`](./tracks/image/) · [`tracks/video/`](./tracks/video/) · [`tracks/audio/`](./tracks/audio/)，每份档案的「商用许可」一行先看 |
| 「我要自己搭一个 agent」 | 直接去 [`tracks/framework/`](./tracks/framework/)，看状态怎么存、上下文怎么压、权限给到哪一档 |
| 「我的 agent 需要连外部东西」 | [`tracks/mcp/`](./tracks/mcp/)，MCP 服务器生态 |
| 「我想比较两个东西到底差在哪」 | 先读 [`axes/`](./axes/) 里那 8 个维度分别问什么，再横向对着看 |

有个坑值得先说：现成工具和自己搭的底座不是一回事。
前者问「哪个好用」，后者问「底座怎么搭」。混在一起比，比出来的结论没有意义。

站上的版本：<https://tools.specul.com/>

---

## 这个仓库的方法论

一句话：**不让没有实测的东西看起来像有结论。**

四条核心规则：

| 规则 | 做法 |
|---|---|
| **放弃总分** | 没有统一输入、预算、环境下的复现实测，就不给总分排名 |
| **固定坐标系** | 所有对象在同一组 8 个维度下被描述，不允许自定义维度 |
| **未知是合法答案** | 查不到就写「未知」+ 原因，绝不推测填充 |
| **每条判断挂证据** | 判断能回到官方一手源，区分发布 / 核验 / 生效三种时间语义 |

完整方法论见 [METHODOLOGY.md](./METHODOLOGY.md)。

---

## 快速上手

### 我想查一个工具的能力边界

1. 在 [axes/](./axes/) 看 8 个维度分别问什么
2. 在对应大类的 `products/` 找条目（大类定义见 [categories.md](./categories.md)）
3. 点条目里的 `sources` 回官方原文

### 我想新增一个工具

1. 读 [SCHEMA.md](./SCHEMA.md) 了解字段格式（v2：目录=大类、`form:` 8 值）
2. 复制同大类任意条目作为模板
3. 按 [axes/](./axes/) 的判定标准填 8 个维度
4. 提 PR，附上你读过的官方源链接

### 我想修正一条数据

直接开 Issue，标明条目 id + 字段名 + 你的依据链接。
不接受无来源的修正。

### 我想跑一轮实测

读对应大类的 `protocols/_protocol.md`（编码向 / 框架向 / MCP 向三套协议），按协议跑。

---

## 目录结构

```
tools/（ai-handbook 子树）
├── METHODOLOGY.md              方法论总纲
├── SCHEMA.md                   数据格式规范（v2）
├── categories.md               10 大类定义与边界裁决
├── CONTRIBUTING.md             贡献指引
├── SOURCES.md                  来源索引
├── axes/                       8 个维度的定义与判定标准（含消费级读法）
│   ├── model-access.md         模型与开放条件
│   ├── runtime.md              运行位置
│   ├── local-files.md          本地文件
│   ├── background.md           关机后的任务
│   ├── tools.md                工具与扩展
│   ├── context.md              上下文与记忆
│   ├── permissions.md          权限与限制
│   └── fit.md                  适合什么任务
├── tracks/
│   ├── coding/                 AI 编程大类
│   │   ├── _category.md        大类收录声明（标准 + 形态判据 + 对象表）
│   │   └── products/           39 个对象
│   ├── chat/                   AI 对话助手（14 个对象）
│   ├── image/ · video/ · audio/  AI 创作三大类（13 + 12 + 10 个对象）
│   ├── framework/              Agent 框架与运行时（22 个对象）
│   ├── mcp/                    MCP 生态（多 3 个特有维度，24 个对象）
│   └── research/ · automation/ · runner/  AI 搜索与研究、自动化、本地运行器（11 + 14 + 12 个对象）
├── protocols/                  实测协议（coding / framework / mcp 三套）
├── scripts/                    校验脚本（validate / audit / quality）
└── CHANGELOG.md                数据层更新记录
```

### framework 大类的 family 分组

framework 的 22 个对象按**抽象层**分三组，这是本站对该大类最重要的一条判别依据：

| family | 含义 | 对象 |
|---|---|---|
| `coding-base` | 直接面向编程任务的底座 | Claude Agent SDK · Codex SDK · OpenAI Agents SDK · Pydantic AI · smolagents |
| `orchestration` | 编排 / 图执行框架 | CrewAI · Google ADK · LangGraph · LlamaIndex · Microsoft Agent Framework · AG2 · Mastra |
| `general-harness` | 通用助手型或自带完整运行时 | Deep Agents · Hermes Agent · OpenHands |

分组不是排名——同一层里不同框架解决的问题不同，不可直接比优劣。

---

## 数据可信度分级

每个条目有两个独立标记：

### `confidence` — 本站数据的可靠程度

| 值 | 含义 |
|---|---|
| `verified` | 8 维度均有官方来源支撑，且核验日在 90 天内 |
| `partial` | 部分维度标为未知，或核验日超过 90 天 |
| `stale` | 官方已发布重大变化，本站尚未核验 |

### `lifecycle` — 对象本身的状态

这一条比 `last_verified` 更决定「你的数据明天还有没有用」。

| 值 | 含义 |
|---|---|
| `active` | 上游近 30 天有提交或版本发布 |
| `maintenance` | 上游近 90 天有更新，但节奏明显放缓 |
| `archived` | 上游已归档、停止更新或转移维护方 |
| `unknown` | 无 changelog / 无仓库可判断 |

**组合约束**：`lifecycle` 为 `archived` 或 `unknown` 时，`confidence` 不得为 `verified`。

**为什么要单列**：一个对象即使今天刚核验过，
若上游已半年无更新，这条数据**明天就会失效**。

实例：某个开源 CLI 工具的仓库最后推送在 4 个月前——
这种信息必须显式记录，不能靠「核验日是新的」掩盖。

**引用本仓库数据时请同时带上 `confidence`、`lifecycle` 和 `last_verified`。**

---

## 已知边界

诚实地说明这个仓库**做不到**什么：

| 不做 | 原因 |
|---|---|
| 不给单一总分排名 | 缺少跨工具的统一实测，排名会误导 |
| 不推测未核验信息 | 「未知」比编造的数字有用 |
| 不做跨币种折算 | 汇率、区域、账户差异会被折算掩盖 |
| 不收录无官方文档的对象 | 无法核验的对象不进仓库 |
| 不做付费实测（当前） | 实测协议已就绪，未跑完前不发布结论 |
| 不保证覆盖完整 | 记录密度随各对象上游活跃度变化 |
| 数据可能过期 | 每条都带 `lifecycle` 与 `last_verified`，请一并核对 |

---

## 许可

内容采用 [CC BY 4.0](./LICENSE) 授权。

**使用要求**：署名「ai-coding-agent-atlas contributors」并链接回本仓库。
**产品名与商标归各权利方所有，本仓库与站点仅作识别与评论之用**（L3 声明，与全站页脚同一句口径）。

---

## 原始素材未入库

采集过程中抓取的网页正文快照（Cursor / Windsurf / Copilot 官网定价页与 changelog，
约 480KB）**未包含在本仓库**，原因是第三方网站内容的版权归属。

**这不影响可核验性**：每个条目都标注了对应的官方源 URL 与核验日期，
任何人都可以自行访问原文复核。

如需原始快照用于研究，请通过 Issue 联系。

---

## 关联项目

| 项目 | 说明 |
|---|---|
| **specul.com** | 品牌站（投机 · 推演） |
| **nav.specul.com** | 结论层：AI 站点导航 |
| **tools.specul.com** | 结论层：AI 工具 10 大类 |
| **learn.specul.com** | 结论层：AI 术语表 |
| **models.specul.com** | 结论层：本地部署量化模型索引 |
| **vg.specul.com** | 结论层：AI 做游戏 |

**方法论原型**：本仓库的「放弃总分 / 未知合法化 / 每条挂证据」三条规则
借鉴自 [AgentClash](https://aiagentclash.com/)，但坐标系与大类定义是本仓库独立设计。

<!-- INDEX:BEGIN generated, do not edit -->

## 内容索引

### AI 编程 —— 39 份

装在编辑器 / 终端 / 厂商云上，面向代码库自主干活的编码 agent。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [Aider](tracks/coding/products/aider-cli.md) | Aider-AI | cli | partial | maintenance |
| [Aider Watch 模式](tracks/coding/products/aider.md) | Aider-AI | ide | partial | maintenance |
| [Amazon Q Developer](tracks/coding/products/amazon-q-developer.md) | AWS | ide | partial | maintenance |
| [Amp](tracks/coding/products/amp.md) | Amp Frontier Corporation（原 Sourcegraph，2025-12 分拆独立） | cli | partial | active |
| [Augment Code](tracks/coding/products/augment-code.md) | Augment Code | cloud | partial | active |
| [Bolt.new](tracks/coding/products/bolt-new.md) | StackBlitz | cloud | partial | active |
| [Claude Code CLI](tracks/coding/products/claude-code-cli.md) | Anthropic | cli | partial | active |
| [Claude Code IDE 扩展](tracks/coding/products/claude-code.md) | Anthropic | ide | partial | active |
| [Cline](tracks/coding/products/cline.md) | Cline Bot | ide | partial | active |
| [CodeBuddy](tracks/coding/products/codebuddy.md) | 腾讯云 | ide | partial | active |
| [Codex CLI](tracks/coding/products/codex-cli.md) | OpenAI | cli | partial | active |
| [Codex IDE 扩展](tracks/coding/products/codex-ide.md) | OpenAI | ide | partial | active |
| [Continue](tracks/coding/products/continue.md) | Continue | ide | partial | archived |
| [Crush](tracks/coding/products/crush.md) | Charm | cli | partial | active |
| [Cursor](tracks/coding/products/cursor.md) | Anysphere | ide | partial | active |
| [Cursor CLI](tracks/coding/products/cursor-cli.md) | Anysphere | cli | partial | active |
| [Devin](tracks/coding/products/devin.md) | Cognition | cloud | partial | active |
| [Droid](tracks/coding/products/factory-droid.md) | Factory AI | cli | partial | active |
| [Gemini CLI](tracks/coding/products/gemini-cli.md) | Google | cli | partial | active |
| [GitHub Copilot](tracks/coding/products/copilot.md) | GitHub / Microsoft | ide | partial | active |
| [GitHub Copilot CLI](tracks/coding/products/copilot-cli.md) | GitHub | cli | partial | active |
| [Google Antigravity](tracks/coding/products/google-antigravity.md) | Google | ide | partial | active |
| [Goose](tracks/coding/products/goose.md) | Agentic AI Foundation | cli | partial | active |
| [Jules](tracks/coding/products/jules.md) | Google | cloud | partial | active |
| [Junie](tracks/coding/products/junie.md) | JetBrains | ide | partial | active |
| [Kiro](tracks/coding/products/kiro.md) | AWS | ide | partial | active |
| [Lovable](tracks/coding/products/lovable.md) | Lovable | cloud | partial | active |
| [Meta Muse](tracks/coding/products/meta-muse.md) | Meta | cloud | partial | active |
| [OpenAI Dot](tracks/coding/products/openai-dot.md) | OpenAI | cloud | partial | active |
| [OpenCode](tracks/coding/products/opencode.md) | OpenCode | cli | partial | active |
| [Qoder](tracks/coding/products/qoder.md) | 阿里云 | ide | partial | active |
| [Qoder CN（原通义灵码）](tracks/coding/products/qoder-cn.md) | 阿里云 | ide | partial | active |
| [Replit Agent](tracks/coding/products/replit-agent.md) | Replit | cloud | partial | active |
| [Trae](tracks/coding/products/trae.md) | 字节跳动 | ide | partial | active |
| [v0](tracks/coding/products/v0.md) | Vercel | cloud | partial | active |
| [Warp](tracks/coding/products/warp.md) | Warp | cli | partial | active |
| [Windsurf / Devin Desktop](tracks/coding/products/windsurf.md) | Cognition | ide | partial | active |
| [xAI Grok Bot](tracks/coding/products/grok-bot.md) | xAI | cloud | partial | active |
| [Zed](tracks/coding/products/zed.md) | Zed Industries | ide | partial | active |

### AI 对话助手 —— 14 份

通用聊天助手——网页 / 应用形态，含国产。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [豆包](tracks/chat/products/doubao-chat.md) | 字节跳动 | web | partial | active |
| [腾讯元宝](tracks/chat/products/yuanbao-chat.md) | 腾讯 | web | partial | active |
| [通义千问](tracks/chat/products/tongyi-qianwen.md) | 阿里巴巴 | web | partial | active |
| [文心](tracks/chat/products/wenxin.md) | 百度 | web | partial | active |
| [讯飞星火](tracks/chat/products/xinghuo-spark.md) | 科大讯飞 | web | partial | active |
| [智谱清言](tracks/chat/products/chatglm-chat.md) | 智谱 AI | web | partial | active |
| [ChatGPT](tracks/chat/products/chatgpt.md) | OpenAI | web | partial | active |
| [Claude（对话应用）](tracks/chat/products/claude-chat.md) | Anthropic | web | verified | active |
| [DeepSeek](tracks/chat/products/deepseek-chat.md) | 深度求索 | web | partial | active |
| [Gemini（对话应用）](tracks/chat/products/gemini-chat.md) | Google | web | partial | active |
| [Grok](tracks/chat/products/grok-chat.md) | xAI | web | partial | active |
| [Kimi](tracks/chat/products/kimi-chat.md) | 月之暗面 Moonshot AI | web | partial | active |
| [Manus](tracks/chat/products/manus.md) | Manus AI（Monica 团队） | web | partial | active |
| [Microsoft Copilot](tracks/chat/products/microsoft-copilot.md) | 微软 | web | partial | active |

### AI 图像创作 —— 13 份

文生图与图像编辑产品。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [即梦](tracks/image/products/jimeng.md) | 字节跳动（剪映团队） | web | partial | active |
| [通义万相](tracks/image/products/tongyi-wanxiang.md) | 阿里巴巴 | web | partial | active |
| [Adobe Firefly](tracks/image/products/adobe-firefly.md) | Adobe | web | partial | active |
| [Clipdrop](tracks/image/products/clipdrop.md) | Jasper（原 InitML，2023 并入 Stability AI，2024-02 售予 Jasper） | web | partial | active |
| [FLUX（Black Forest Labs）](tracks/image/products/flux.md) | Black Forest Labs | cloud | partial | active |
| [Ideogram](tracks/image/products/ideogram.md) | Ideogram | web | partial | active |
| [Krea](tracks/image/products/krea.md) | Krea | web | partial | active |
| [Leonardo AI](tracks/image/products/leonardo-ai.md) | Leonardo（2024-07 被 Canva 收购） | web | partial | active |
| [Microsoft Designer](tracks/image/products/microsoft-designer.md) | 微软 | web | partial | active |
| [Midjourney](tracks/image/products/midjourney.md) | Midjourney, Inc. | web | partial | active |
| [Recraft](tracks/image/products/recraft.md) | Recraft | web | partial | active |
| [SeaArt](tracks/image/products/seaart.md) | 海艺（成都海艺互娱） | web | partial | active |
| [Stability AI（Stable Image 平台）](tracks/image/products/stability-ai.md) | Stability AI | web | partial | active |

### AI 视频创作 —— 12 份

文生视频、图生视频与 AI 视频编辑产品。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [海螺视频](tracks/video/products/hailuo-video.md) | MiniMax（稀宇科技） | web | partial | active |
| [可灵 Kling AI](tracks/video/products/kling.md) | Kling AI Pte. Ltd.（快手） | web | partial | active |
| [D-ID](tracks/video/products/d-id.md) | D-ID | web | partial | active |
| [HeyGen](tracks/video/products/heygen.md) | HeyGen | web | partial | active |
| [Higgsfield](tracks/video/products/higgsfield.md) | Higgsfield AI | web | partial | active |
| [Luma（Dream Machine）](tracks/video/products/luma.md) | Luma AI | web | partial | active |
| [Pika](tracks/video/products/pika.md) | Pika Labs | web | partial | active |
| [PixVerse](tracks/video/products/pixverse.md) | 爱诗科技 | web | partial | active |
| [Runway](tracks/video/products/runway.md) | Runway AI, Inc. | web | partial | active |
| [Synthesia](tracks/video/products/synthesia.md) | Synthesia | web | partial | active |
| [Veo（Google）](tracks/video/products/veo.md) | Google | cloud | partial | active |
| [Vidu](tracks/video/products/vidu.md) | 生数科技（清华系） | web | partial | active |

### AI 音频与语音 —— 10 份

语音合成（TTS）、音乐生成、语音转写产品。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [魔音工坊](tracks/audio/products/moyin.md) | 出门问问 | web | partial | active |
| [AssemblyAI](tracks/audio/products/assemblyai.md) | AssemblyAI | cloud | partial | active |
| [Deepgram](tracks/audio/products/deepgram.md) | Deepgram | cloud | partial | active |
| [ElevenLabs](tracks/audio/products/elevenlabs.md) | ElevenLabs | web | partial | active |
| [fish audio](tracks/audio/products/fish-audio.md) | fish.audio | web | partial | active |
| [MiniMax Audio（海螺语音）](tracks/audio/products/minimax-audio.md) | MiniMax（稀宇科技） | web | partial | active |
| [Otter.ai](tracks/audio/products/otter.md) | Otter.ai | web | partial | active |
| [Suno](tracks/audio/products/suno.md) | Suno Inc. | web | partial | active |
| [Udio](tracks/audio/products/udio.md) | Udio | web | partial | active |
| [Whisper](tracks/audio/products/whisper.md) | OpenAI（开源） | local-app | partial | active |

### AI 搜索与研究 —— 11 份

主打「带引用的答案」的搜索与研究产品。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [秘塔 AI 搜索](tracks/research/products/metaso.md) | 秘塔科技（上海秘塔网络科技） | web | partial | active |
| [天工 AI 搜索](tracks/research/products/tiangong.md) | 昆仑万维 | web | partial | active |
| [Andi Search](tracks/research/products/andi.md) | Andi | web | partial | active |
| [Consensus](tracks/research/products/consensus.md) | Consensus | web | partial | active |
| [Devv](tracks/research/products/devv.md) | Devv AI | web | partial | active |
| [Elicit](tracks/research/products/elicit.md) | Elicit | web | partial | active |
| [Genspark](tracks/research/products/genspark.md) | Genspark | web | partial | active |
| [Kagi](tracks/research/products/kagi.md) | Kagi | web | partial | active |
| [NotebookLM](tracks/research/products/notebooklm.md) | Google | web | partial | active |
| [Perplexity](tracks/research/products/perplexity.md) | Perplexity AI | web | partial | active |
| [You.com](tracks/research/products/you-com.md) | You.com | web | partial | active |

### AI 自动化与工作流 —— 14 份

可视化搭 AI 应用 / 跑自动化工作流的平台。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [扣子 / Coze](tracks/automation/products/coze.md) | 字节跳动 | web | partial | active |
| [Activepieces](tracks/automation/products/activepieces.md) | Activepieces Inc. | web | partial | active |
| [Bedrock Agents / AgentCore](tracks/automation/products/bedrock-agents.md) | AWS | web | partial | active |
| [Dify](tracks/automation/products/dify.md) | LangGenius（国产出海） | web | partial | active |
| [Flowise](tracks/automation/products/flowise.md) | FlowiseAI, Inc. | web | partial | active |
| [Langflow](tracks/automation/products/langflow.md) | DataStax（原 Langflow AI） | web | partial | active |
| [Make](tracks/automation/products/make.md) | Make（原 Integromat） | web | partial | active |
| [Microsoft Copilot Studio](tracks/automation/products/copilot-studio.md) | Microsoft | web | partial | active |
| [n8n](tracks/automation/products/n8n.md) | n8n GmbH | web | partial | active |
| [Pipedream（Connect / Workflows）](tracks/automation/products/pipedream.md) | Pipedream | web | partial | active |
| [Relevance AI](tracks/automation/products/relevance-ai.md) | Relevance AI（悉尼） | web | partial | active |
| [Salesforce Agentforce](tracks/automation/products/agentforce.md) | Salesforce | web | partial | active |
| [Vertex AI Agent Builder（Gemini Enterprise 平台线）](tracks/automation/products/vertex-agent-builder.md) | Google | web | partial | active |
| [Zapier](tracks/automation/products/zapier.md) | Zapier | web | partial | active |

### Agent 框架与运行时 —— 22 份

拿它拼自己的 agent：状态存哪、上下文怎么压、权限给到哪一档。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [AG2](tracks/framework/products/ag2.md) | ag2ai | harness | partial | active |
| [AgentScope](tracks/framework/products/agentscope.md) | 阿里巴巴（魔搭社区） | harness | partial | active |
| [Claude Agent SDK](tracks/framework/products/claude-agent-sdk.md) | Anthropic | harness | partial | active |
| [Codex SDK](tracks/framework/products/codex-sdk.md) | OpenAI | harness | partial | active |
| [CrewAI](tracks/framework/products/crewai.md) | CrewAI Inc | harness | partial | active |
| [Deep Agents](tracks/framework/products/deepagents.md) | LangChain | harness | partial | active |
| [DSPy](tracks/framework/products/dspy.md) | Stanford NLP / Databricks | harness | partial | active |
| [Google ADK（Agent Development Kit）](tracks/framework/products/google-adk.md) | Google | harness | partial | active |
| [Haystack](tracks/framework/products/haystack.md) | deepset | harness | partial | active |
| [Hermes Agent](tracks/framework/products/hermes-agent.md) | Nous Research | harness | partial | active |
| [LangChain](tracks/framework/products/langchain.md) | LangChain, Inc. | harness | partial | active |
| [LangGraph](tracks/framework/products/langgraph.md) | LangChain Inc | harness | partial | active |
| [Letta / MemGPT](tracks/framework/products/letta.md) | Letta, Inc. | harness | partial | active |
| [LlamaIndex Framework](tracks/framework/products/llamaindex.md) | LlamaIndex（run-llama） | harness | partial | active |
| [Mastra](tracks/framework/products/mastra.md) | Mastra AI | harness | partial | active |
| [Microsoft Agent Framework](tracks/framework/products/microsoft-agent-framework.md) | Microsoft | harness | partial | active |
| [OpenAI Agents SDK](tracks/framework/products/openai-agents-sdk.md) | OpenAI | harness | partial | active |
| [OpenHands Agent Canvas](tracks/framework/products/openhands.md) | OpenHands（All-Hands-AI） | harness | partial | active |
| [Pydantic AI](tracks/framework/products/pydantic-ai.md) | Pydantic | harness | partial | active |
| [smolagents](tracks/framework/products/smolagents.md) | Hugging Face | harness | partial | active |
| [Strands Agents SDK](tracks/framework/products/strands-agents.md) | AWS | harness | partial | active |
| [SWE-agent](tracks/framework/products/swe-agent.md) | Princeton / Stanford（学术团队） | harness | partial | active |

### 给 AI 装的工具 —— 24 份

MCP 服务器与工具生态。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [Atlassian Remote MCP Server（Jira/Confluence）](tracks/mcp/products/atlassian-mcp.md) | Atlassian | mcp | partial | active |
| [Brave Search MCP Server](tracks/mcp/products/brave-search-mcp.md) | Brave | mcp | partial | active |
| [Chrome DevTools MCP](tracks/mcp/products/chrome-devtools-mcp.md) | Google（Chrome DevTools 团队） | mcp | partial | active |
| [Cloudflare MCP Server](tracks/mcp/products/cloudflare-mcp.md) | Cloudflare | mcp | partial | active |
| [Context7](tracks/mcp/products/context7.md) | Upstash | mcp | partial | active |
| [Everything MCP Server](tracks/mcp/products/everything.md) | Model Context Protocol | mcp | verified | active |
| [Fetch MCP Server](tracks/mcp/products/fetch.md) | Model Context Protocol | mcp | verified | active |
| [Figma MCP Server](tracks/mcp/products/figma-mcp.md) | Figma | mcp | partial | active |
| [Filesystem MCP Server](tracks/mcp/products/filesystem.md) | Model Context Protocol | mcp | verified | active |
| [Git MCP Server](tracks/mcp/products/git.md) | Model Context Protocol | mcp | verified | active |
| [GitHub MCP Server](tracks/mcp/products/github-mcp.md) | GitHub | mcp | partial | active |
| [Knowledge Graph Memory Server](tracks/mcp/products/memory.md) | Model Context Protocol | mcp | verified | active |
| [Linear MCP](tracks/mcp/products/linear-mcp.md) | Linear | mcp | partial | active |
| [MongoDB MCP Server](tracks/mcp/products/mongodb-mcp.md) | MongoDB | mcp | partial | active |
| [Neon MCP Server](tracks/mcp/products/neon-mcp.md) | Neon | mcp | partial | active |
| [Notion MCP](tracks/mcp/products/notion-mcp.md) | Notion | mcp | partial | active |
| [Playwright MCP Server](tracks/mcp/products/playwright.md) | Microsoft | mcp | verified | active |
| [Sentry MCP / Toolkit](tracks/mcp/products/sentry-mcp.md) | Sentry | mcp | partial | active |
| [Sequential Thinking MCP Server](tracks/mcp/products/sequential-thinking.md) | Model Context Protocol | mcp | verified | active |
| [Slack MCP Server](tracks/mcp/products/slack-mcp.md) | Slack（Salesforce） | mcp | partial | active |
| [Stripe Agent Toolkit / MCP](tracks/mcp/products/stripe-mcp.md) | Stripe | mcp | partial | active |
| [Supabase MCP](tracks/mcp/products/supabase-mcp.md) | Supabase | mcp | partial | active |
| [Time MCP Server](tracks/mcp/products/time.md) | Model Context Protocol | mcp | verified | active |
| [Zapier MCP](tracks/mcp/products/zapier-mcp.md) | Zapier | mcp | partial | active |

### 本地模型运行器 —— 12 份

在自己机器上跑开源模型的桌面应用。

| 名字 | 厂商 | 形态 | 数据可信度 | 上游状态 |
|---|---|---|---|---|
| [GPT4All](tracks/runner/products/gpt4all.md) | Nomic AI | local-app | partial | maintenance |
| [Jan](tracks/runner/products/jan.md) | Menlo Research | local-app | partial | active |
| [KoboldCpp](tracks/runner/products/koboldcpp.md) | LostRuins（KoboldAI 社区） | local-app | partial | active |
| [llama.cpp](tracks/runner/products/llama-cpp.md) | ggml-org | cli | partial | active |
| [LM Studio](tracks/runner/products/lm-studio.md) | Element Labs | local-app | partial | active |
| [LocalAI](tracks/runner/products/localai.md) | Mudler T.（mudler） | cli | partial | active |
| [MLX（mlx-lm）](tracks/runner/products/mlx.md) | Apple | cli | partial | active |
| [Ollama](tracks/runner/products/ollama.md) | Ollama Inc. | cli | partial | active |
| [SGLang](tracks/runner/products/sglang.md) | LMSYS / sgl-project | cli | partial | active |
| [Text Generation Inference（TGI）](tracks/runner/products/tgi.md) | Hugging Face | cli | partial | maintenance |
| [text-generation-webui / textgen](tracks/runner/products/text-generation-webui.md) | oobabooga | local-app | partial | maintenance |
| [vLLM](tracks/runner/products/vllm.md) | vLLM 项目（PyTorch 基金会） | cli | partial | active |


<!-- INDEX:END -->

## 实测规模（A8）

<!-- STATS:BEGIN generated, do not edit -->
| 项 | 实测值 |
|---|---|
| 档案总数 | 171 份 |
| 大类分布 | coding 39 · chat 14 · image 13 · video 12 · audio 10 · research 11 · automation 14 · framework 22 · mcp 24 · runner 12 |
| 形态分布（form） | web 69 · mcp 24 · harness 22 · cli 19 · ide 17 · cloud 14 · local-app 6 |
| 对比维度 | 8 维（mcp 大类另加传输 / 认证 / 范围 3 维） |
<!-- STATS:END -->
