# 十大类定义（categories）

> English one-liners are given under each category; the full English narrative lives in `README.en.md`.

**这份文件回答一个问题：一个对象该进哪个大类。**

v8 起（2026-10-21 用户定案 D1），**目录 = 大类 = 读者面**。旧的三分区
`agents / harness / tools` 退役，目录按下面十个大类重排。大类回答「**它是什么**」；
frontmatter 的 `form:` 字段回答「**它以什么形态使用**」（ide / cli / cloud / harness /
mcp / web / app / local-app）。两个维度正交：Cursor 是 `coding` 大类、`ide` 形态；
Claude Code 同一个大类、`cli` 形态。

三层文件各司其职，不要混：

| 文件 | 回答 |
|---|---|
| `categories.md`（本文件） | 每个大类**是什么**、收什么、不收什么 |
| `inventory/<category>.md` | 每个大类**该收谁**——候选全集，每条有去向（已有/待建/只进nav/不收+理由） |
| `<category>/<id>.md` | 每个对象**长什么样**——八维档案 |

---

## 三族分组（首页卡片分组，不是目录层）

| 族 | 大类 | 读者的问题 |
|---|---|---|
| 找现成的 | coding · chat · image · video · audio · research | 「有没有能直接用的？」 |
| 自己搭 | automation · framework | 「我想自己搭一个？」 |
| 接上与跑起来 | mcp · runner | 「怎么给它接工具 / 在自己机器上跑模型？」 |

---

## 1 · AI 编程 `coding`

**定义**：面向代码库工作的 AI agent——AI 能改多文件、能跑命令、能自主完成编码任务。
编辑器里的、终端里的、厂商云上的都算。

**收录标准**（三条全满足）：
1. AI 参与编码且是 agent 式（不只是补全单行）；
2. 面向代码库/工程工作，不是纯问答或代码片段生成器；
3. 有可访问的官方文档或 changelog。

**边界裁决**：
- ChatGPT 能写代码 → 仍归 `chat`（写代码不是它的定位主轴，官方首页自我定位是通用助手）；
- Cursor 有聊天面板 → 仍归 `coding`（官方自我定位是 AI 编辑器）；
- Dify 里也能生成代码 → 归 `automation`（产物是搭出来的应用，不是代码库交付）。

**不收示例**：纯补全工具（补全单行、不能自主完成任务——不满足标准 1）；
在线判题/编程学习平台（不是编码 agent）；代码托管平台本身（那是 git 生态，不是 agent）。

**EN**: AI coding agents — editors, terminals, and vendor clouds where the AI works on a codebase autonomously. Not chat assistants that can code, not single-line completions.

## 2 · AI 对话助手 `chat`

**定义**：通用聊天助手——网页/应用/API 形态的通用对话产品，含国产。
「通用」是关键词：官方定位是「什么都能问」，而不是某个垂直场景。

**收录标准**：
1. 面向普通用户的通用对话产品（含其官方 API 入口）；
2. 官方披露了可用的模型信息或产品能力页（八维至少 model_access / runtime 可答）；
3. 有官方文档或帮助中心可核验。

**边界裁决**：
- 编程向的对话产品（如编码 agent 的聊天界面）→ 归 `coding`；
- 搜索向的对话产品（主打「带引用的答案」）→ 归 `research`；
- 对话产品带代码能力（ChatGPT 能写代码）→ 仍归 `chat`（官方自我定位是通用助手）；
- **云端常驻的任务型 agent**（OpenAI Dot / Meta Muse / xAI Grok Bot）→ 归 `coding`（`form: cloud`）——
  它们的主轴是「替你干活」（含建站、修代码、跑任务），不是「跟你聊天」；聊天只是入口。

**不收示例**：客服机器人、垂直问答（医疗/法律/招聘等单一场景）——不满足「通用」；
角色扮演陪伴类应用——不收（内容合规风险高，且非通用助手）。

**EN**: General-purpose chat assistants (web/app/API), including Chinese products. Vertical bots and companion apps are out.

## 3 · AI 图像创作 `image`

**定义**：文生图与图像编辑产品——输入文字/图，输出图。

**收录标准**：
1. 图像生成或图像编辑是产品的**主功能**（不是通用软件里的 AI 滤镜）；
2. 有官方产品页与能力文档；
3. 能回答「产物归谁/能否商用」至少一条官方条款（permissions 维可答）。

**边界裁决**：
- 通用创意套件的 AI 功能（照片修图软件里的生成填充）→ 不收（AI 是次要功能）；
- 3D 生成 → 不收（本类只管 2D 图像；3D 资产另议）；
- 图像生成 API 平台（提供模型接口给开发者）→ 归 `image`，`form: cloud`（API 入口在档案里注明）。

**不收示例**：美图类修图 App（AI 滤镜是次要功能）；Blender 类建模软件（不是文生图）。

**EN**: Text-to-image and AI image editing where generation is the product's core, not a filter inside generalist software.

## 4 · AI 视频创作 `video`

**定义**：文生视频、图生视频与 AI 视频编辑产品。

**收录标准**：
1. 视频生成/AI 视频编辑是产品**主功能**；
2. 有官方产品页与能力文档；
3. 产物条款可核验（permissions 维可答）。

**边界裁决**：
- 剪辑软件里的 AI 功能（自动字幕、智能剪）→ 不收（AI 是次要功能）；
- 数字人/直播推流工具 → 只进 nav，除非生成视频是其主功能；
- 视频理解/分析产品 → 归 `research` 或 nav，不在本类。

**不收示例**：剪映类剪辑软件（AI 是辅助）；视频会议软件。

**EN**: Text/image-to-video generation and AI-native video editing. AI features inside editors are out.

## 5 · AI 音频与语音 `audio`

**定义**：语音合成（TTS）、音乐生成、语音转写产品。

**收录标准**：
1. 音频生成/转写是产品**主功能**；
2. 有官方文档可核验八维；
3. 产物/声音克隆的授权条款可核验（permissions 维必答——声音克隆涉及人格权，
   「官方未声明」要写明查过哪里）。

**边界裁决**：
- 会议软件的实时字幕 → 不收（AI 是次要功能）；
- 音频开发 SDK（给程序用的 TTS 引擎库）→ 归 `framework` 或 nav，看官方定位；
- 语音助手硬件 → 不收。

**不收示例**：Audition 类音频编辑软件（降噪是传统算法）；智能音箱。

**EN**: TTS, music generation, and transcription products. Voice features inside other software are out.

## 6 · AI 搜索与研究 `research`

**定义**：联网搜索问答、学术检索、AI 笔记/研究工作台——「帮你找答案、读文献、整理笔记」的产品。

**收录标准**：
1. 产品主轴是「检索/研究/笔记」而非通用闲聊；
2. 官方说明了检索来源或索引机制（runtime / context 维可答）；
3. 有官方文档可核验。

**边界裁决**：
- ChatGPT 的搜索模式 → 对象本体归 `chat`，不单独立档（一个产品不拆两个档案）；
- 传统搜索引擎（无 AI 主轴）→ 归 nav；
- 文献管理软件（无 AI 主轴）→ 归 nav；有 AI 研究主轴的笔记产品 → 收。

**不收示例**：Google 搜索本体（AI 是附加）；Zotero 本体（传统文献管理）。

**EN**: AI search engines, academic discovery, and AI-native research/notebook workbenches.

## 7 · AI 自动化与工作流 `automation`

**定义**：可视化/低代码搭 AI 工作流与 agent 的产品——n8n、Dify、Coze 这类。
交付物是「搭出来的应用/流程」，运行在平台的运行时上。

**收录标准**：
1. 提供**编排界面**（画布/表单/低代码），用户不写（或少写）代码就能搭 AI 应用；
2. 平台自带运行时（应用跑在平台上，或平台打包部署）；
3. 有官方文档可核验。

**边界裁决**：
- 给程序用的编排 SDK（LangGraph 这类，交付物是代码里的 agent）→ 归 `framework`；
- 传统 RPA/自动化（无 LLM 参与编排）→ 归 nav；
- 编码 agent 自动化跑 CI → 归 `coding`。

**不收示例**：UiPath 经典流程（无 LLM 主轴）；纯脚本调度工具。

**EN**: Visual/low-code platforms for building AI workflows and agents (n8n, Dify, Coze class). Code-first SDKs go to framework.

## 8 · Agent 框架与运行时 `framework`

**定义**：给**程序**用的 agent SDK / 编排框架——交付物是库/框架，你在代码里搭 agent。

**收录标准**：
1. 面向开发者，通过代码使用（SDK / 库 / 框架）；
2. 核心能力是 agent 编排（循环、工具调用、状态、多 agent）；
3. 有官方文档或仓库可核验八维。

**边界裁决**：
- 可视化编排平台 → 归 `automation`（判据：有没有「不写代码的界面」是主轴）；
- 纯 LLM 调用库（只做 API 封装，无 agent 循环）→ 归 nav；
- 模型训练/微调框架 → 归 models 站生态/nav，不在本类。

**不收示例**：transformers 本体（模型库不是 agent 框架）；LangChain 的纯 LLM 封装层
（若某库只做 API 转发无编排，不满足标准 2）。

**EN**: Code-first agent SDKs and orchestration frameworks. Visual builders go to automation.

## 9 · 给 AI 装的工具 `mcp`

**定义**：MCP server 与工具接口——给 agent 接上文件、浏览器、GitHub 这些能力的服务端。

**收录标准**：
1. 是一个可运行的 MCP server（或官方工具接口，协议在档案里注明）；
2. 有官方仓库/文档，transport / auth / scope 三维至少两维可答；
3. 能力边界可核验（它能读写什么、要不要密钥）。

**边界裁决**：
- 开发 MCP server 用的 SDK → 不收（那是开发工具，不是 server 本体）；
- 非 MCP 的插件协议生态 → 只进 nav（本类以 MCP 为主干，其他协议诚实标注）；
- 模型本地服务（Ollama 也暴露接口）→ 归 `runner`。

**不收示例**：MCP 客户端（那是 agent 侧的事）；awesome-mcp 类索引仓库（那是 nav 的活）。

**EN**: MCP servers and tool endpoints that plug capabilities into agents. Client SDKs and index lists are out.

## 10 · 本地模型运行器 `runner`

**定义**：在自己机器上跑开源模型的工具——Ollama、LM Studio、llama.cpp、vLLM 这类。

**收录标准**：
1. 核心功能是**加载并运行**模型（推理服务或本地应用）；
2. 有官方文档/仓库可核验八维（runtime / model-access 维必答）；
3. 支持哪些模型格式/量化可核验（与 models 站口径衔接）。

**边界裁决**：
- 模型训练/微调工具（LLaMA-Factory 这类）→ 不收（训练不是运行；归 nav）；
- 推理云 API 平台 → 不收本体（归 nav；其开源运行时部分收）；
- 模型仓库/权重本身 → 那是 models 站的活。

**不收示例**：训练框架；模型数据集工具。

**EN**: Tools that load and run open models on your own hardware (Ollama, LM Studio, llama.cpp, vLLM class). Training tools are out.

---

## 多栖产品裁决规则

一个产品横跨多个大类时，按这个顺序定：

1. **官方自我定位**（首页/文档怎么介绍自己）优先；
2. 官方定位模糊时，按**主轴功能**（用户用它主要干什么）；
3. **一个对象只立一份档案**——ChatGPT 有代码、搜索、图像功能，档案只在 `chat` 立一份，
   其他能力写在档案的 axes 里，不复制对象。

## 现有 66 个对象的归属（迁移映射，0 悬空）

| 大类 | 现有对象（52 全档案 + 14 轻档案升维后） | 现数 | 目标 |
|---|---|:--:|:--:|
| `coding` | aider · aider-cli · amp · claude-code · claude-code-cli · cline · codex-cli · codex-ide · continue · copilot · copilot-cli · crush · cursor · cursor-cli · factory-droid · gemini-cli · goose · grok-bot · jules · junie · kiro · meta-muse · openai-dot · opencode · warp · windsurf · zed | 27 | 32 |
| `chat` | chatgpt · claude-chat · gemini-chat · grok-chat · kimi-chat · doubao-chat（轻档案升维） | 6 | 14 |
| `image` | midjourney · stability-ai · flux | 3 | 14 |
| `video` | veo · runway · kling | 3 | 12 |
| `audio` | suno · elevenlabs | 2 | 10 |
| `research` | — | 0 | 12 |
| `automation` | — | 0 | 14 |
| `framework` | ag2 · claude-agent-sdk · codex-sdk · crewai · deepagents · google-adk · hermes-agent · langgraph · llamaindex · mastra · microsoft-agent-framework · openai-agents-sdk · openhands · pydantic-ai · smolagents | 15 | 22 |
| `mcp` | context7 · everything · fetch · filesystem · git · github-mcp · memory · playwright · sequential-thinking · time | 10 | 24 |
| `runner` | — | 0 | 12 |
| **合计** | | **66** | **166**（预估，最终由 inventory 定） |

> 目标数是 v8 计划 §2.1 的预估；T9–T19 的 inventory 盘点后以清单实际数为准。
> 数字面（README/GUIDE/llms/站点文案）在 T31 统一按 inventory 实数刷新（R4：数字从数据算）。
